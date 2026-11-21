"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/lib/display";

// The world is drawn in game pixels, each PIXEL CSS px wide, and scaled up without smoothing for a pixel-art look.
// Tuning below is in game pixels and seconds.
const PIXEL = 4;
const ROWS = 48; // play area height (48 × 4 = 192 CSS px)
const FLOOR = 41; // y of the floor
const GRAVITY = 675; // px/s²
const JUMP = 190; // px/s take-off speed
const SHORT_HOP = 90; // releasing the key/tap early caps the upward speed here, for a small hop
const SPEED = { start: 85, max: 205, gain: 2 }; // px/s at start, cap, px/s gained per second
const CAT_X = 12;
const EYES = "#D7E36B"; // Jiji's yellow-green
const OBSTACLES = [
  { kind: "cucumber", w: 5, h: 10 },
  { kind: "cucumber", w: 6, h: 14 },
  { kind: "cucumbers", w: 12, h: 11 },
  { kind: "vacuum", w: 18, h: 6, after: 100 }, // only once the score passes `after`
];

// Jiji, facing right. # body, e eye. Rows 0–7 are shared; the legs (rows 8–9) change per pose.
const CAT_TOP = [
  ".............#...#",
  ".............#####",
  "#............###e#",
  "#............#####",
  ".#..#############.",
  "..#############...",
  "...############...",
  "...############...",
];
const SPOOKED_TOP = [
  "##...........#...#",
  "##...........#####",
  "##...........##ee#",
  "##...........#####",
  ".##.#############.",
  "..#############...",
  "...############...",
  "...############...",
];
const LEGS = {
  stride: ["..#..#.....#..#...", ".#....#...#....#.."],
  gather: ["....##.....##.....", "....##.....##....."],
  air: [".#............#...", "#..............#.."],
};
const CAT_W = 18;
const CAT_H = 10;

const random = (min, max) => min + Math.random() * (max - min);

function readColors() {
  const css = getComputedStyle(document.documentElement);
  const token = (name, alpha = 1) => `rgb(${css.getPropertyValue(`--c-${name}`)} / ${alpha})`;
  return { ink: token("text"), paper: token("bg", 0.45), muted: token("muted"), floor: token("muted", 0.5), accent: token("accent") };
}

// ==============================================================================================================
// Drawing, in game pixels.
function drawSprite(ctx, rows, x, y, palette) {
  rows.forEach((row, r) => {
    for (let c = 0; c < row.length; c++) {
      const color = palette[row[c]];
      if (!color) continue;
      ctx.fillStyle = color;
      ctx.fillRect(x + c, y + r, 1, 1);
    }
  });
}

function drawCat(ctx, colors, height, t, spooked) {
  const pose = spooked ? "gather" : height > 0 ? "air" : Math.floor(t * 10) % 2 ? "stride" : "gather";
  const rows = [...(spooked ? SPOOKED_TOP : CAT_TOP), ...LEGS[pose]];
  drawSprite(ctx, rows, CAT_X, Math.round(FLOOR - height) - CAT_H, { "#": colors.ink, e: EYES });
}

// A pixel cucumber: stem, rounded ends, a few seeds.
function drawCucumber(ctx, colors, x, w, h) {
  const top = FLOOR - h;
  ctx.fillStyle = colors.muted;
  ctx.fillRect(x + Math.floor(w / 2), top, 1, 1);
  ctx.fillStyle = colors.accent;
  ctx.fillRect(x + 1, top + 1, w - 2, 1);
  ctx.fillRect(x, top + 2, w, h - 3);
  ctx.fillRect(x + 1, FLOOR - 1, w - 2, 1);
  ctx.fillStyle = colors.paper;
  for (let r = top + 3; r < FLOOR - 2; r += 3) ctx.fillRect(x + (r % 2 ? 1 : w - 2), r, 1, 1);
}

function drawVacuum(ctx, colors, x, w, h) {
  const top = FLOOR - h;
  ctx.fillStyle = colors.muted;
  ctx.fillRect(x + 4, top, w - 8, 1);
  ctx.fillRect(x + 1, top + 1, w - 2, 1);
  ctx.fillRect(x, top + 2, w, h - 3);
  ctx.fillRect(x + 1, FLOOR - 1, w - 2, 1);
  ctx.fillStyle = colors.accent;
  ctx.fillRect(x + w - 4, top + 2, 1, 1);
}

function drawObstacle(ctx, colors, o) {
  const x = Math.round(o.x);
  if (o.kind === "vacuum") drawVacuum(ctx, colors, x, o.w, o.h);
  else if (o.kind === "cucumbers") {
    drawCucumber(ctx, colors, x, 5, o.h);
    drawCucumber(ctx, colors, x + 7, 5, o.h - 3);
  } else drawCucumber(ctx, colors, x, o.w, o.h);
}

function drawFloor(ctx, colors, cols, offset) {
  ctx.fillStyle = colors.floor;
  const shift = Math.round(offset) % 4;
  for (let x = -shift; x < cols; x += 4) ctx.fillRect(x, FLOOR, 1, 1);
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
    let cols = 0;
    let frame = 0;
    let best = 0;
    try {
      best = Number(localStorage.getItem("catrun-best")) || 0;
    } catch {}
    setResult({ score: 0, best });

    const g = { state: "idle", y: 0, vy: 0, obstacles: [], dist: 0, speed: 0, since: 0, gap: 0, t: 0, last: 0, overAt: 0, colors: readColors() };
    const points = () => Math.floor(g.dist / 10);

    function draw() {
      ctx.clearRect(0, 0, cols, ROWS);
      drawFloor(ctx, g.colors, cols, g.dist);
      for (const o of g.obstacles) drawObstacle(ctx, g.colors, o);
      drawCat(ctx, g.colors, g.y, g.t, g.state === "over");
    }

    // One canvas pixel per game pixel; CSS scales it up by PIXEL with image-rendering: pixelated.
    function resize() {
      cols = Math.floor(el.parentElement.clientWidth / PIXEL);
      el.width = cols;
      el.height = ROWS;
      el.style.width = `${cols * PIXEL}px`;
      draw();
    }

    function spawn() {
      const pool = OBSTACLES.filter((o) => !o.after || points() >= o.after);
      g.obstacles.push({ ...pool[Math.floor(Math.random() * pool.length)], x: cols + 6 });
      g.since = 0;
      const minGap = 65 + g.speed * 0.45;
      g.gap = random(minGap, minGap + 70);
    }

    function hit(o) {
      const catLeft = CAT_X + 3;
      const catRight = CAT_X + CAT_W - 2;
      const catBottom = FLOOR - g.y;
      return catRight > o.x + 1 && catLeft < o.x + o.w - 1 && catBottom > FLOOR - o.h + 1;
    }

    function step(now) {
      const dt = Math.min((now - (g.last || now)) / 1000, 1 / 30);
      g.last = now;
      g.t += dt;

      // Narrow screens get a slower start so obstacles stay readable.
      const scale = Math.min(1, Math.max(0.7, (cols * PIXEL) / 720));
      g.speed = Math.min(SPEED.max, SPEED.start + SPEED.gain * g.t) * scale;
      const dx = g.speed * dt;
      g.dist += dx;

      g.vy -= GRAVITY * dt;
      g.y = Math.max(0, g.y + g.vy * dt);
      if (g.y === 0) g.vy = 0;

      for (const o of g.obstacles) o.x -= dx;
      g.obstacles = g.obstacles.filter((o) => o.x + o.w > -6);
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
      Object.assign(g, { state: "running", y: 0, vy: 0, obstacles: [], dist: 0, since: 0, gap: cols * 0.6, t: 0, last: 0 });
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
    observer.observe(el.parentElement);
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
        <canvas
          ref={canvas}
          aria-hidden
          className="mx-auto block [image-rendering:pixelated]"
          style={{ height: ROWS * PIXEL }}
        />
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
