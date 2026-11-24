"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTheme } from "@/lib/display";

import jiji from "@public/about/jiji.png";

// The world is drawn in game pixels, each PIXEL CSS px wide, and scaled up without smoothing for a pixel-art look.
// Tuning below is in game pixels and seconds.
const PIXEL = 4;
const ROWS = 48; // play area height (48 × 4 = 192 CSS px)
const FLOOR = 41; // y of the floor
const CAT_X = 12;
const EYES = "#9EE57B"; // Jiji's light green eyes
const FUR = "#000"; // Jiji is a black cat in both themes
const ROOMBA_LIGHT = "#E5484D"; // the roomba's red status light
const CUCUMBER_COLORS = { dark: "#2E8B2E", skin: "#36B037", light: "#8ED05F" }; // sampled from public/misc/image.png

// Rules, after the classic offline runner: speed climbs every frame to a cap, the score blinks at every milestone,
// gaps widen with speed, cucumber groups grow, and a butterfly joins once it's fast enough.
const RULES = {
  speed: { start: 85, max: 185, accel: 0.85 }, // px/s, px/s, px/s gained per second (≈2 min to max)
  gravity: 675, // px/s²
  jump: 190, // px/s take-off speed
  shortHop: 90, // releasing jump early caps the upward speed here
  drop: 220, // px/s straight down when ducking mid-air (fast fall)
  clearStart: 1.5, // seconds with no obstacles
  milestone: 100, // score blinks at every multiple
  gap: { base: 45, perSpeed: 1 / 15, spread: 1.5 }, // min gap = width × speed × perSpeed + base; max = min × spread
  groupAt: [1.4, 1.8], // speed (× start) at which cucumber groups of 2, then 3, are allowed
  roombaAfter: 100, // score
  butterflyAt: 1.5, // speed (× start)
  butterflyExtra: 12, // px/s faster than the ground
  maxRepeat: 2, // the same kind never appears more than this many times in a row
};

// Sprites: # fur (ink elsewhere), e eye, a accent, m muted, b bumper, r light. Jiji faces right; the roomba faces left.
const CAT = {
  top: [
    ".............#...#",
    ".............#####",
    ".............#e#e#",
    ".............#####",
    ".##.#############.",
    ".##############...",
    "...############...",
    "...############...",
  ],
  spooked: [
    ".............#...#",
    ".............#####",
    ".............#e#e#",
    ".##..........#####",
    "###.#############.",
    ".##############...",
    "...############...",
    "...############...",
  ],
  legs: {
    stride: ["..#..#.....#..#...", ".#....#...#....#.."],
    gather: ["....##.....##.....", "....##.....##....."],
    air: [".#............#...", "#..............#.."],
  },
  duck: [
    "................#..#.",
    "................#####",
    ".################e#e#",
    ".###################.",
    "...###############...",
  ],
  duckLegs: ["...#..#......#..#....", "....##........##....."],
};

// Body rows; the bottom row (wheels and the 5-bristle side brush) is drawn per frame in drawRoomba.
const ROOMBA = [
  ".mmmmmmmmmmmmmmmmmm.",
  "mmmrmmmmmmmmmmmmmmmm",
  "bbbbbbbbmmmmmmmmmmmm",
  "bbbbbbbbmmmmmmmmmmmm",
  "bbbbbbbbmmmmmmmmmmmm",
  "mmmmmmmmmmmmmmmmmmmm",
];
const BRISTLES = 5; // spaced every 2px across the front 10px, sweeping left to right

const BUTTERFLY = [
  ["a.....a", "aa.#.aa", "aaa#aaa", ".aa#aa.", "..a#a.."],
  [".......", "...#...", ".aa#aa.", "..a#a..", "...#..."],
];

const CUCUMBER = { small: { w: 5, h: 10 }, big: { w: 6, h: 14 } };
const GROUP_GAP = 2;

const random = (min, max) => min + Math.random() * (max - min);
const pick = (list) => list[Math.floor(Math.random() * list.length)];

function readColors() {
  const css = getComputedStyle(document.documentElement);
  const token = (name, alpha = 1) => `rgb(${css.getPropertyValue(`--c-${name}`)} / ${alpha})`;
  return {
    ink: token("text"),
    paper: token("bg", 0.45),
    muted: token("muted"),
    bumper: token("text", 0.6),
    floor: token("muted", 0.5),
    accent: token("accent"),
  };
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

function catPose(g) {
  if (g.state === "over") return "spooked";
  if (g.y > 0) return "air";
  return g.ducking ? "duck" : "run";
}

function drawCat(ctx, colors, g) {
  const pose = catPose(g);
  const step = Math.floor(g.t * 10) % 2;
  const palette = { "#": FUR, e: EYES };
  if (pose === "duck") {
    drawSprite(ctx, [...CAT.duck, CAT.duckLegs[step]], CAT_X, FLOOR - 6, palette);
    return;
  }
  const legs = pose === "air" ? CAT.legs.air : pose === "spooked" || step ? CAT.legs.gather : CAT.legs.stride;
  drawSprite(ctx, [...(pose === "spooked" ? CAT.spooked : CAT.top), ...legs], CAT_X, Math.round(FLOOR - g.y) - 10, palette);
}

// A pixel cucumber after public/misc/image.png: dark rounded stem end with a leafy scallop, a ridged body, and a
// pale rounded blossom end. Drawn from w/h so both sizes keep the same look.
function drawCucumber(ctx, x, w, h) {
  const top = FLOOR - h;
  const fill = (color, dx, dy, fw, fh) => {
    ctx.fillStyle = color;
    ctx.fillRect(x + dx, top + dy, fw, fh);
  };
  fill(CUCUMBER_COLORS.dark, 1, 0, w - 2, 1);
  fill(CUCUMBER_COLORS.dark, 0, 1, w, 1);
  fill(CUCUMBER_COLORS.skin, 0, 2, w, h - 4);
  for (const c of new Set([0, (w - 1) >> 1, w >> 1, w - 1])) fill(CUCUMBER_COLORS.dark, c, 2, 1, 1);
  fill(CUCUMBER_COLORS.dark, 1, 3, 1, h - 7);
  fill(CUCUMBER_COLORS.dark, w - 2, 3, 1, h - 7);
  fill(CUCUMBER_COLORS.light, 0, h - 3, 1, 1);
  fill(CUCUMBER_COLORS.light, w - 1, h - 3, 1, 1);
  fill(CUCUMBER_COLORS.light, 0, h - 2, w, 1);
  fill(CUCUMBER_COLORS.light, 1, h - 1, w - 2, 1);
}

function drawRoomba(ctx, colors, x, t) {
  drawSprite(ctx, ROOMBA, x, FLOOR - 7, { m: colors.muted, b: colors.bumper, r: ROOMBA_LIGHT });
  ctx.fillStyle = colors.ink;
  ctx.fillRect(x + 12, FLOOR - 1, 2, 1); // wheels
  ctx.fillRect(x + 16, FLOOR - 1, 2, 1);
  const sweep = Math.floor(t * 16);
  for (let i = 0; i < BRISTLES; i++) ctx.fillRect(x + ((i * 2 + sweep) % 10), FLOOR - 1, 1, 1);
}

function drawObstacle(ctx, colors, o, t) {
  const x = Math.round(o.x);
  const frame = Math.floor(t * 8) % 2;
  if (o.kind === "roomba") drawRoomba(ctx, colors, x, t);
  else if (o.kind === "butterfly") {
    drawSprite(ctx, BUTTERFLY[frame], x, o.top, { a: colors.accent, "#": colors.ink });
  } else {
    const { w, h } = CUCUMBER[o.kind];
    for (let i = 0; i < o.count; i++) drawCucumber(ctx, x + i * (w + GROUP_GAP), w, i % 2 ? h - 2 : h);
  }
}

function drawFloor(ctx, colors, cols, offset) {
  ctx.fillStyle = colors.floor;
  const shift = Math.round(offset) % 4;
  for (let x = -shift; x < cols; x += 4) ctx.fillRect(x, FLOOR, 1, 1);
}

// ==============================================================================================================
// Obstacles. Each has x, w, and a hitbox from top to the floor (butterflies: top to top + 4).
function makeObstacle(kind, g, touch, cols) {
  if (kind === "roomba") return { kind, x: cols + 6, w: 20, top: FLOOR - 7, bottom: FLOOR };
  if (kind === "butterfly") {
    // low: jump over · middle: duck under (keyboard only) · high: a standing Jiji runs under it
    const tops = touch ? [FLOOR - 5, FLOOR - 16] : [FLOOR - 5, FLOOR - 11, FLOOR - 16];
    const top = pick(tops);
    return { kind, x: cols + 6, w: 7, top, bottom: top + 5 };
  }
  const { w, h } = CUCUMBER[kind];
  const relative = g.speed / g.baseSpeed;
  const most = 1 + RULES.groupAt.filter((at) => relative >= at).length;
  const count = 1 + Math.floor(Math.random() * most);
  return { kind, count, x: cols + 6, w: count * w + (count - 1) * GROUP_GAP, top: FLOOR - h, bottom: FLOOR };
}

function catBox(g) {
  if (catPose(g) === "duck") return { left: CAT_X + 2, right: CAT_X + 20, top: FLOOR - 5, bottom: FLOOR };
  const bottom = FLOOR - g.y;
  return { left: CAT_X + 3, right: CAT_X + 16, top: bottom - 9, bottom };
}

// ==============================================================================================================
// The cat's name, with a photo card that rises above it on hover or keyboard focus (decorative: the word says it).
function JijiName() {
  return (
    <span
      tabIndex={0}
      className="group relative rounded-sm font-bold underline decoration-ink/40 underline-offset-4 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      Jiji
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-3 w-36 -translate-x-1/2 translate-y-1 opacity-0 transition-[opacity,transform] duration-150 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 motion-reduce:transition-none"
      >
        <span className="block rounded-media border-2 border-ink/20 bg-surface p-1">
          <Image src={jiji} alt="" sizes="144px" placeholder="blur" className="block rounded-control" />
        </span>
        <span className="absolute left-1/2 top-full h-2 w-3.5 -translate-x-1/2 bg-ink/20 [clip-path:polygon(0_0,100%_0,50%_100%)]" />
      </span>
    </span>
  );
}

// ==============================================================================================================
// An endless runner: Jiji runs automatically. Space / ↑ / tap to jump, ↓ to duck (and to drop faster mid-air).
export default function CatRun() {
  const canvas = useRef(null);
  const score = useRef(null);
  const game = useRef(null);
  const theme = useTheme();
  const [status, setStatus] = useState("idle"); // idle | running | over
  const [result, setResult] = useState({ score: 0, best: 0 });
  const [touch, setTouch] = useState(false);

  useEffect(() => {
    const el = canvas.current;
    const ctx = el.getContext("2d");
    const isTouch = matchMedia("(pointer: coarse)").matches;
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    setTouch(isTouch);
    let cols = 0;
    let frame = 0;
    let best = 0;
    try {
      best = Number(localStorage.getItem("catrun-best")) || 0;
    } catch {}
    setResult({ score: 0, best });

    const g = {
      state: "idle",
      y: 0,
      vy: 0,
      ducking: false,
      obstacles: [],
      recent: [],
      dist: 0,
      speed: 0,
      baseSpeed: RULES.speed.start,
      since: 0,
      gap: 0,
      t: 0,
      last: 0,
      overAt: 0,
      flashUntil: 0,
      flashScore: 0,
      colors: readColors(),
    };
    const points = () => Math.floor(g.dist / 10);

    function draw() {
      ctx.clearRect(0, 0, cols, ROWS);
      drawFloor(ctx, g.colors, cols, g.dist);
      for (const o of g.obstacles) drawObstacle(ctx, g.colors, o, g.t);
      drawCat(ctx, g.colors, g);
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
      const relative = g.speed / g.baseSpeed;
      let kinds = ["small", "big"];
      if (points() >= RULES.roombaAfter) kinds.push("roomba");
      if (relative >= RULES.butterflyAt) kinds.push("butterfly");
      const [a, b] = g.recent;
      if (a && a === b && kinds.length > 1) kinds = kinds.filter((k) => k !== a); // no third in a row
      const o = makeObstacle(pick(kinds), g, isTouch, cols);
      g.obstacles.push(o);
      g.recent = [o.kind, ...g.recent].slice(0, RULES.maxRepeat);
      g.since = 0;
      const min = o.w * g.speed * RULES.gap.perSpeed + RULES.gap.base;
      g.gap = random(min, min * RULES.gap.spread);
    }

    function hit(o) {
      const c = catBox(g);
      return c.right > o.x + 1 && c.left < o.x + o.w - 1 && c.bottom > o.top + 1 && c.top < o.bottom - 1;
    }

    function updateScore(now) {
      const p = points();
      const milestone = Math.floor(p / RULES.milestone) * RULES.milestone;
      if (milestone > 0 && milestone > g.flashScore) {
        g.flashScore = milestone;
        if (!still) g.flashUntil = now + 750;
      }
      const flashing = now < g.flashUntil;
      score.current.textContent = flashing ? g.flashScore : p;
      score.current.style.visibility = flashing && Math.floor((g.flashUntil - now) / 125) % 2 ? "hidden" : "";
    }

    function step(now) {
      const dt = Math.min((now - (g.last || now)) / 1000, 1 / 30);
      g.last = now;
      g.t += dt;

      // Narrow screens run slower overall so obstacles stay readable.
      const scale = Math.min(1, Math.max(0.7, (cols * PIXEL) / 720));
      g.baseSpeed = RULES.speed.start * scale;
      g.speed = Math.min(g.speed + RULES.speed.accel * scale * dt, RULES.speed.max * scale);
      const dx = g.speed * dt;
      g.dist += dx;

      g.vy -= RULES.gravity * dt;
      g.y = Math.max(0, g.y + g.vy * dt);
      if (g.y === 0) g.vy = 0;

      for (const o of g.obstacles) o.x -= o.kind === "butterfly" ? dx + RULES.butterflyExtra * scale * dt : dx;
      g.obstacles = g.obstacles.filter((o) => o.x + o.w > -6);
      g.since += dx;
      if (g.t > RULES.clearStart && g.since >= g.gap) spawn();

      updateScore(now);

      if (g.obstacles.some(hit)) {
        g.state = "over";
        g.overAt = now;
        g.flashUntil = 0;
        score.current.style.visibility = "";
        const final = points();
        score.current.textContent = final;
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
      const scale = Math.min(1, Math.max(0.7, (cols * PIXEL) / 720));
      Object.assign(g, {
        state: "running",
        y: 0,
        vy: 0,
        obstacles: [],
        recent: [],
        dist: 0,
        speed: RULES.speed.start * scale,
        since: 0,
        gap: 0,
        t: 0,
        last: 0,
        flashUntil: 0,
        flashScore: 0,
      });
      setStatus("running");
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(step);
    }

    game.current = {
      press() {
        if (g.state === "over" && performance.now() - g.overAt < 400) return; // a held key doesn't restart instantly
        if (g.state !== "running") start();
        if (g.y === 0) g.vy = RULES.jump;
      },
      release() {
        if (g.vy > RULES.shortHop) g.vy = RULES.shortHop;
      },
      duck(down) {
        g.ducking = down;
        if (down && g.state === "running" && g.y > 0) g.vy = -RULES.drop;
        if (g.state !== "running") draw();
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

  const jumpKeys = [" ", "ArrowUp", "w", "W"];
  const duckKeys = ["ArrowDown", "s", "S"];
  const controls = touch ? "Tap to jump" : "Space or ↑ to jump, ↓ to duck";
  const message =
    status === "idle"
      ? touch
        ? "Tap to play"
        : `Press Space to play. ${controls}`
      : status === "over"
        ? `Jiji got spooked at ${result.score}. ${touch ? "Tap" : "Press Space"} to try again`
        : "";

  return (
    <section aria-labelledby="catrun-title" className="mt-20 border-t border-ink/10 pt-10 md:mt-24">
      <div className="flex items-baseline justify-between gap-4">
        <h2 id="catrun-title" className="text-lg font-[420] tracking-[-0.01em]">
          Help <JijiName /> run!
        </h2>
        <p className="shrink-0 whitespace-nowrap text-sm tabular-nums text-muted">
          Score <span ref={score}>0</span>{" "}
          <span className="ml-3">Best {result.best}</span>
        </p>
      </div>

      <div
        tabIndex={0}
        aria-label={`Cat runner game. ${controls}.`}
        onKeyDown={(event) => {
          if (jumpKeys.includes(event.key)) {
            event.preventDefault();
            if (!event.repeat) game.current?.press();
          } else if (duckKeys.includes(event.key)) {
            event.preventDefault();
            if (!event.repeat) game.current?.duck(true);
          }
        }}
        onKeyUp={(event) => {
          if (jumpKeys.includes(event.key)) game.current?.release();
          else if (duckKeys.includes(event.key)) game.current?.duck(false);
        }}
        onBlur={() => game.current?.duck(false)}
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
