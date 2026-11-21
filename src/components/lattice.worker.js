// Renders the background lattice on an OffscreenCanvas, so none of the WebGL work touches the main thread.

// About 15px between dots at typical sizes; the sheet overfills every aspect ratio so its edges are never on screen.
const COLS = 204;
const ROWS = 90;

// Tuning. Click ripples: up to 4 at once, the oldest replaced by a new click.
const RIPPLE = {
  speed: 900, // px per second the ring travels outward
  width: 40, // px, soft thickness of the ring
  life: 1.4, // seconds until a ripple has fully faded
  push: 6, // px the ring pushes dots outward
};
// Mouse hover: dots within `radius` drift away from the cursor (mouse/pen only).
const CURSOR = {
  radius: 140, // px
  push: 10, // px, displacement right under the cursor
  follow: 10, // how quickly the disturbance catches up with the cursor (higher = snappier)
};
const LIGHT_DOT_SCALE = 1.35; // light mode draws dark dots on a light page; slightly larger reads the same weight
const RIPPLES = 4;
const f = (n) => n.toFixed(2); // GLSL float literal

const vertex = `#version 300 es
in vec2 grid;
uniform float time;
uniform float aspect;
uniform float dpr;
uniform vec2 res;
uniform vec3 ripples[4];
uniform vec3 cursor; // x, y (CSS px), strength 0..1
uniform float dotScale;
out float alpha;

void main() {
  // A sheet of points facing the camera, tilted back, rippling in depth like a scanned surface.
  vec2 g = vec2(grid.x * 17.0, mix(-5.5, 9.5, grid.y * 0.5 + 0.5));
  float wave = sin(g.x * 0.42 + time * 0.30) * 0.30
             + sin(g.y * 0.65 - time * 0.24) * 0.25
             + sin((g.x - g.y) * 0.27 + time * 0.18) * 0.40;

  float tilt = 0.5;
  vec3 q = vec3(g.x, g.y * cos(tilt), 8.0 + g.y * sin(tilt) + wave);

  float focal = 1.6;
  gl_Position = vec4(q.x * focal / aspect, q.y * focal, 0.0, q.z);
  gl_PointSize = clamp(dpr * 12.0 / q.z, dpr, 3.0 * dpr) * dotScale;

  // A soft glow in the upper middle, faded to zero before every viewport edge.
  vec2 ndc = gl_Position.xy / q.z;
  float glow = 1.0 - smoothstep(0.1, 1.2, length(vec2(ndc.x * 0.6, (ndc.y - 0.3) * 0.9)));
  float sides = smoothstep(1.0, 0.7, abs(ndc.x));
  float top = smoothstep(0.95, 0.55, ndc.y);

  // Click ripples, in CSS px: dots on a ring are pushed outward, grow and brighten (even outside the glow).
  vec2 pt = vec2(ndc.x * 0.5 + 0.5, 0.5 - ndc.y * 0.5) * res;
  float ring = 0.0;
  vec2 offset = vec2(0.0);
  for (int i = 0; i < ${RIPPLES}; i++) {
    float age = time - ripples[i].z;
    if (age < 0.0 || age > ${f(RIPPLE.life)}) continue;
    vec2 away = pt - ripples[i].xy;
    float d = max(length(away), 0.001);
    float k = exp(-pow((d - age * ${f(RIPPLE.speed)}) / ${f(RIPPLE.width)}, 2.0)) * pow(1.0 - age / ${f(RIPPLE.life)}, 2.0);
    ring += k;
    offset += away / d * k * ${f(RIPPLE.push)};
  }
  ring = min(ring, 1.0);

  // Mouse hover: dots near the cursor ease away from it.
  vec2 fromCursor = pt - cursor.xy;
  float cd = max(length(fromCursor), 0.001);
  offset += fromCursor / cd * cursor.z * pow(1.0 - smoothstep(0.0, ${f(CURSOR.radius)}, cd), 2.0) * ${f(CURSOR.push)};

  pt += offset;
  gl_Position.xy = vec2(pt.x / res.x * 2.0 - 1.0, 1.0 - pt.y / res.y * 2.0) * q.z;
  gl_PointSize += ring * 1.5 * dpr;

  alpha = glow * sides * top * (0.6 + wave * 0.5) + ring * 0.7 * sides * top;
}`;

const fragment = `#version 300 es
precision mediump float;
in float alpha;
out vec4 color;

void main() {
  float d = length(gl_PointCoord - 0.5);
  color = vec4(vec3(1.0), clamp(alpha, 0.0, 1.0) * 0.85 * (1.0 - smoothstep(0.3, 0.5, d)));
}`;

function compile(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader));
  return shader;
}

// ==============================================================================================================
const raf = self.requestAnimationFrame?.bind(self) ?? ((fn) => setTimeout(() => fn(performance.now()), 16));
const caf = self.cancelAnimationFrame?.bind(self) ?? clearTimeout;

let gl;
let canvas;
let uniforms;
let still = false;
let running = true;
let frame = 0;
let slot = 0;
let light = false;
let last = 0;
// The disturbance eases toward the latest cursor message each frame, so it glides instead of jumping between events.
const cursorNow = { x: 0, y: 0, s: 0 };
const cursorTarget = { x: 0, y: 0, s: 0 };
const ripples = new Float32Array(RIPPLES * 3).map((_, i) => (i % 3 === 2 ? -100 : 0));

function init(offscreen) {
  canvas = offscreen;
  // failIfMajorPerformanceCaveat: no lattice on software-only GL (no GPU); the page shows CSS dots instead.
  gl = canvas.getContext("webgl2", { alpha: true, antialias: false, powerPreference: "low-power", failIfMajorPerformanceCaveat: true });
  if (!gl) return false;

  const program = gl.createProgram();
  gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, vertex));
  gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, fragment));
  gl.linkProgram(program);
  gl.useProgram(program);

  const points = new Float32Array(COLS * ROWS * 2);
  for (let r = 0, i = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      points[i++] = (c / (COLS - 1)) * 2 - 1;
      points[i++] = (r / (ROWS - 1)) * 2 - 1;
    }
  }
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);
  const grid = gl.getAttribLocation(program, "grid");
  gl.enableVertexAttribArray(grid);
  gl.vertexAttribPointer(grid, 2, gl.FLOAT, false, 0, 0);

  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

  uniforms = Object.fromEntries(
    ["time", "aspect", "dpr", "res", "ripples", "cursor", "dotScale"].map((name) => [name, gl.getUniformLocation(program, name)])
  );
  gl.uniform3fv(uniforms.ripples, ripples);
  return true;
}

function resize({ width, height, ratio }) {
  canvas.width = Math.max(1, Math.round(width * ratio));
  canvas.height = Math.max(1, Math.round(height * ratio));
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.uniform1f(uniforms.aspect, canvas.width / canvas.height);
  gl.uniform1f(uniforms.dpr, ratio);
  gl.uniform2f(uniforms.res, width, height);
}

function draw(now) {
  const dt = Math.min((now - last) / 1000, 0.1);
  last = now;
  const k = 1 - Math.exp(-dt * CURSOR.follow);
  for (const key of ["x", "y", "s"]) cursorNow[key] += (cursorTarget[key] - cursorNow[key]) * k;
  gl.uniform3f(uniforms.cursor, cursorNow.x, cursorNow.y, cursorNow.s);
  gl.uniform1f(uniforms.dotScale, light ? LIGHT_DOT_SCALE : 1);
  gl.uniform1f(uniforms.time, still ? 12 : now / 1000);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.POINTS, 0, COLS * ROWS);
  frame = !still && running ? raf(draw) : 0;
}

// Messages: { canvas, still, light, size } once, then { size } on resize, { running } on visibility changes,
// { light } on theme changes, { ripple: [x, y] } on clicks and { cursor: [x, y] | null } as the mouse moves or leaves.
self.onmessage = ({ data }) => {
  if ("cursor" in data) {
    if (!gl || still) return;
    // Entering from nowhere: start at the cursor instead of sweeping in from the last spot.
    if (cursorNow.s < 0.01 && data.cursor) [cursorNow.x, cursorNow.y] = data.cursor;
    if (data.cursor) [cursorTarget.x, cursorTarget.y] = data.cursor;
    cursorTarget.s = data.cursor ? 1 : 0;
    return;
  }
  if (data.ripple) {
    // Same clock as draw()'s rAF time; the running loop picks it up, a paused or still lattice ignores it.
    if (!gl || still) return;
    ripples.set([...data.ripple, performance.now() / 1000], slot * 3);
    slot = (slot + 1) % RIPPLES;
    gl.uniform3fv(uniforms.ripples, ripples);
    return;
  }
  if ("light" in data) light = data.light;
  if (data.canvas) {
    still = data.still;
    let ok = false;
    try {
      ok = init(data.canvas);
    } catch {}
    self.postMessage(ok ? "ready" : "fallback");
    if (!ok) return;
  }
  if (!gl) return;
  if (data.size) resize(data.size);
  if ("running" in data) running = data.running;
  caf(frame);
  frame = raf(draw);
};
