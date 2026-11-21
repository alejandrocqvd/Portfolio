// Renders the background lattice on an OffscreenCanvas, so none of the WebGL work touches the main thread.

// About 15px between dots at typical sizes; the sheet overfills every aspect ratio so its edges are never on screen.
const COLS = 204;
const ROWS = 90;

const vertex = `#version 300 es
in vec2 grid;
uniform float time;
uniform float aspect;
uniform float dpr;
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
  gl_PointSize = clamp(dpr * 12.0 / q.z, dpr, 3.0 * dpr);

  // A soft glow in the upper middle, faded to zero before every viewport edge.
  vec2 ndc = gl_Position.xy / q.z;
  float glow = 1.0 - smoothstep(0.1, 1.2, length(vec2(ndc.x * 0.6, (ndc.y - 0.3) * 0.9)));
  float sides = smoothstep(1.0, 0.7, abs(ndc.x));
  float top = smoothstep(0.95, 0.55, ndc.y);
  alpha = glow * sides * top * (0.6 + wave * 0.5);
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

  uniforms = Object.fromEntries(["time", "aspect", "dpr"].map((name) => [name, gl.getUniformLocation(program, name)]));
  return true;
}

function resize({ width, height, ratio }) {
  canvas.width = Math.max(1, Math.round(width * ratio));
  canvas.height = Math.max(1, Math.round(height * ratio));
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.uniform1f(uniforms.aspect, canvas.width / canvas.height);
  gl.uniform1f(uniforms.dpr, ratio);
}

function draw(now) {
  gl.uniform1f(uniforms.time, still ? 12 : now / 1000);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.POINTS, 0, COLS * ROWS);
  frame = !still && running ? raf(draw) : 0;
}

// Messages: { canvas, still, size } once, then { size } on resize and { running } on visibility changes.
self.onmessage = ({ data }) => {
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
