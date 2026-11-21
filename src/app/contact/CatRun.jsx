"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/lib/display";

// Tuning (CSS px and seconds).
const HEIGHT = 190; // play area height
const FLOOR = 160; // y of the floor
const GRAVITY = 2700; // px/s²
const JUMP = 760; // px/s take-off speed
const SHORT_HOP = 360; // releasing the key/tap early caps the upward speed here, for a small hop
const SPEED = { start: 340, max: 820, gain: 8 }; // px/s at start, cap, px/s gained per second
const CAT_X = 48;
const EYES = "#D7E36B"; // Jiji's yellow-green
const OBSTACLES = [
  { kind: "cucumber", w: 14, h: 30 },
  { kind: "cucumber", w: 16, h: 42 },
  { kind: "cucumbers", w: 34, h: 32 },
  { kind: "vacuum", w: 56, h: 20, after: 100 }, // only once the score passes `after`
];

const random = (min, max) => min + Math.random() * (max - min);

function readColors() {
  const css = getComputedStyle(document.documentElement);
  const token = (name, alpha = 1) => `rgb(${css.getPropertyValue(`--c-${name}`)} / ${alpha})`;
  return { ink: token("text"), paper: token("bg"), muted: token("muted"), floor: token("muted", 0.45), accent: token("accent") };
}

// ==============================================================================================================
// Drawing. y is height above the floor; t drives the run cycle.
function drawCat(ctx, c, y, t, airborne, spooked) {
  const x = CAT_X;
  const base = FLOOR - y;
  ctx.fillStyle = c.ink;
  ctx.strokeStyle = c.ink;
  ctx.lineCap = "round";

  // Tail: sways while running, streams back mid-air, puffs straight up when spooked.
  const sway = airborne ? -4 : Math.sin(t * 10) * 3;
  ctx.lineWidth = spooked ? 5 : 3.5;
  ctx.beginPath();
  ctx.moveTo(x + 4, base - 16);
  if (spooked) ctx.quadraticCurveTo(x - 4, base - 20, x - 3, base - 38);
  else ctx.quadraticCurveTo(x - 10, base - 18, x - 8 + sway * 0.3, base - 32 + sway);
  ctx.stroke();

  // Legs: two pairs swinging in opposition; tucked forward/back in the air.
  ctx.lineWidth = 3;
  const swing = airborne || spooked ? 0 : Math.sin(t * 22) * 4;
  for (const [hip, dir] of [[9, 1], [13, -1], [27, -1], [31, 1]]) {
    const front = hip > 20;
    ctx.beginPath();
    ctx.moveTo(x + hip, base - 10);
    if (airborne) ctx.lineTo(x + hip + (front ? 7 : -7), base - 4);
    else ctx.lineTo(x + hip + swing * dir, base);
    ctx.stroke();
  }

  // Body, head, ears.
  ctx.beginPath();
  ctx.ellipse(x + 19, base - 15, 17, 9, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(x + 38, base - 23, 8.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(x + 31.5, base - 27);
  ctx.lineTo(x + 32.5, base - 37);
  ctx.lineTo(x + 38, base - 31);
  ctx.moveTo(x + 38.5, base - 31);
  ctx.lineTo(x + 44, base - 37);
  ctx.lineTo(x + 45.5, base - 27);
  ctx.fill();

  // Eye: wide open when spooked.
  ctx.fillStyle = EYES;
  ctx.strokeStyle = c.paper;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(x + 41.5, base - 24, spooked ? 3.2 : 2.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
}

function drawCucumber(ctx, c, x, w, h) {
  ctx.fillStyle = c.accent;
  ctx.beginPath();
  ctx.roundRect(x, FLOOR - h, w, h, w / 2);
  ctx.fill();
  ctx.fillStyle = c.paper;
  ctx.globalAlpha = 0.35;
  for (let i = 1; i * 9 < h - 4; i++) {
    ctx.beginPath();
    ctx.arc(x + w / 2 + (i % 2 ? -w / 5 : w / 5), FLOOR - h + i * 9, 1.2, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  ctx.fillStyle = c.muted;
  ctx.fillRect(x + w / 2 - 1.5, FLOOR - h - 3, 3, 4);
}

function drawVacuum(ctx, c, x, w, h) {
  ctx.fillStyle = c.muted;
  ctx.beginPath();
  ctx.roundRect(x, FLOOR - h, w, h, h / 2);
  ctx.roundRect(x + 10, FLOOR - h - 4, w - 20, 6, 3);
  ctx.fill();
  ctx.fillStyle = c.accent;
  ctx.beginPath();
  ctx.arc(x + w - 12, FLOOR - h + 7, 2, 0, Math.PI * 2);
  ctx.fill();
}

function drawObstacle(ctx, c, o) {
  if (o.kind === "vacuum") drawVacuum(ctx, c, o.x, o.w, o.h);
  else if (o.kind === "cucumbers") {
    drawCucumber(ctx, c, o.x, 15, o.h);
    drawCucumber(ctx, c, o.x + 19, 15, o.h - 8);
  } else drawCucumber(ctx, c, o.x, o.w, o.h);
}

function drawFloor(ctx, c, width, offset) {
  ctx.fillStyle = c.floor;
  for (let x = -(offset % 10); x < width; x += 10) ctx.fillRect(x, FLOOR + 1, 2, 2);
}

// ==============================================================================================================
// An endless runner: Jiji runs automatically; jump over cucumbers and the robot vacuum. Space / ↑ / tap to jump.
export default function CatRun() {
  const canvas = useRef(null);
  const score = useRef(null);
  const game = useRef(null);
  const theme = useTheme();
  const [status, setStatus] = useState("idle"); // idle | running | over
  const [result, setResult] = useState({ score: 0, best: 0 });

  useEffect(() => {
    const el = canvas.current;
    const ctx = el.getContext("2d");
    let width = el.clientWidth;
    let frame = 0;
    let best = 0;
    try {
      best = Number(localStorage.getItem("catrun-best")) || 0;
    } catch {}
    setResult({ score: 0, best });

    const g = { state: "idle", y: 0, vy: 0, obstacles: [], dist: 0, speed: 0, since: 0, gap: 0, t: 0, last: 0, overAt: 0, colors: readColors() };
    const points = () => Math.floor(g.dist / 40);

    function draw() {
      ctx.clearRect(0, 0, width, HEIGHT);
      drawFloor(ctx, g.colors, width, g.dist);
      for (const o of g.obstacles) drawObstacle(ctx, g.colors, o);
      drawCat(ctx, g.colors, g.y, g.t, g.y > 0, g.state === "over");
    }

    function resize() {
      width = el.clientWidth;
      const ratio = Math.min(devicePixelRatio, 2);
      el.width = Math.round(width * ratio);
      el.height = Math.round(HEIGHT * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      draw();
    }

    function spawn() {
      const pool = OBSTACLES.filter((o) => !o.after || points() >= o.after);
      g.obstacles.push({ ...pool[Math.floor(Math.random() * pool.length)], x: width + 20 });
      g.since = 0;
      const minGap = 260 + g.speed * 0.45;
      g.gap = random(minGap, minGap + 280);
    }

    function hit(o) {
      const catLeft = CAT_X + 8;
      const catRight = CAT_X + 45;
      const catBottom = FLOOR - g.y;
      return catRight > o.x + 3 && catLeft < o.x + o.w - 3 && catBottom > FLOOR - o.h + 4;
    }

    function step(now) {
      const dt = Math.min((now - (g.last || now)) / 1000, 1 / 30);
      g.last = now;
      g.t += dt;

      // Narrow screens get a slower start so obstacles stay readable.
      const scale = Math.min(1, Math.max(0.7, width / 720));
      g.speed = Math.min(SPEED.max, SPEED.start + SPEED.gain * g.t) * scale;
      const dx = g.speed * dt;
      g.dist += dx;

      g.vy -= GRAVITY * dt;
      g.y = Math.max(0, g.y + g.vy * dt);
      if (g.y === 0) g.vy = 0;

      for (const o of g.obstacles) o.x -= dx;
      g.obstacles = g.obstacles.filter((o) => o.x + o.w > -20);
      g.since += dx;
      if (g.since >= g.gap) spawn();

      score.current.textContent = points();

      if (g.obstacles.some(hit)) {
        g.state = "over";
        g.overAt = now;
        const final = points();
        best = Math.max(best, final);
        try {
          localStorage.setItem("catrun-best", String(best));
        } catch {}
        setResult({ score: final, best });
        setStatus("over");
        draw();
        return;
      }
      draw();
      frame = requestAnimationFrame(step);
    }

    function start() {
      Object.assign(g, { state: "running", y: 0, vy: 0, obstacles: [], dist: 0, since: 0, gap: width * 0.6, t: 0, last: 0 });
      setStatus("running");
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(step);
    }

    game.current = {
      press() {
        if (g.state === "over" && performance.now() - g.overAt < 400) return; // a held key doesn't restart instantly
        if (g.state !== "running") start();
        if (g.y === 0) g.vy = JUMP;
      },
      release() {
        if (g.vy > SHORT_HOP) g.vy = SHORT_HOP;
      },
      recolor() {
        g.colors = readColors();
        draw();
      },
    };

    const observer = new ResizeObserver(resize);
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      game.current = null;
    };
  }, []);

  useEffect(() => {
    if (theme) game.current?.recolor();
  }, [theme]);

  const keys = [" ", "ArrowUp", "w", "W"];
  const message =
    status === "idle"
      ? "Press Space or tap to play"
      : status === "over"
        ? `Jiji got spooked at ${result.score}. Press Space or tap to try again`
        : "";

  return (
    <section aria-labelledby="catrun-title" className="mt-20">
      <div className="flex items-baseline justify-between gap-4">
        <h2 id="catrun-title" className="text-lg font-[420] tracking-[-0.01em]">
          Help Jiji dodge the cucumbers
        </h2>
        <p className="shrink-0 whitespace-nowrap text-sm tabular-nums text-muted">
          Score <span ref={score}>0</span>{" "}
          <span className="ml-3">Best {result.best}</span>
        </p>
      </div>

      <div
        tabIndex={0}
        aria-label="Cat runner game. Press Space or the up arrow to jump."
        onKeyDown={(event) => {
          if (!keys.includes(event.key)) return;
          event.preventDefault();
          if (!event.repeat) game.current?.press();
        }}
        onKeyUp={(event) => keys.includes(event.key) && game.current?.release()}
        onPointerDown={(event) => {
          if (event.button > 0) return;
          event.currentTarget.focus({ preventScroll: true });
          game.current?.press();
        }}
        onPointerUp={() => game.current?.release()}
        onPointerCancel={() => game.current?.release()}
        className="relative mt-4 cursor-pointer touch-manipulation select-none overflow-hidden rounded-media border border-ink/10 bg-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <canvas ref={canvas} aria-hidden className="block w-full" style={{ height: HEIGHT }} />
        {message && (
          <p className="pointer-events-none absolute inset-x-0 top-6 px-6 text-center text-sm text-muted">{message}</p>
        )}
      </div>

      <p aria-live="polite" className="sr-only">
        {status === "over" ? `Game over. Score ${result.score}. Best ${result.best}.` : ""}
      </p>
    </section>
  );
}
