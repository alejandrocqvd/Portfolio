"use client";

import { useEffect, useRef, useState } from "react";

const COLS = 84;
const ROWS = 44;

const vertex = `#version 300 es
in vec2 grid;
uniform float time;
uniform float aspect;
uniform float dpr;
out float alpha;

void main() {
  // A sheet of points facing the camera, tilted back, rippling in depth like a scanned surface.
  vec2 g = grid * vec2(11.0, 5.8);
  float wave = sin(g.x * 0.42 + time * 0.30) * 0.30
             + sin(g.y * 0.65 - time * 0.24) * 0.25
             + sin((g.x - g.y) * 0.27 + time * 0.18) * 0.40;

  float tilt = 0.5;
  vec3 q = vec3(g.x, g.y * cos(tilt), 8.0 + g.y * sin(tilt) + wave);

  float focal = 1.6;
  gl_Position = vec4(q.x * focal / aspect, q.y * focal, 0.0, q.z);
  gl_PointSize = clamp(dpr * 15.0 / q.z, dpr, 3.0 * dpr);

  // Brightest across the top of the viewport, fading toward the edges and down into the page.
  vec2 ndc = gl_Position.xy / q.z;
  float glow = 1.0 - smoothstep(0.2, 1.15, length(vec2(ndc.x * 0.7, (ndc.y - 0.55) * 1.1)));
  alpha = glow * (0.6 + wave * 0.5);
}`;

const fragment = `#version 300 es
precision mediump float;
in float alpha;
out vec4 color;

void main() {
  float d = length(gl_PointCoord - 0.5);
  color = vec4(vec3(1.0), clamp(alpha, 0.0, 1.0) * 0.85 * (1.0 - smoothstep(0.3, 0.5, d)));
}`;

// ==============================================================================================================
function compile(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader));
  return shader;
}

// ==============================================================================================================
function start(canvas) {
  const gl = canvas.getContext("webgl2", { alpha: true, antialias: false, powerPreference: "low-power" });
  if (!gl) return null;

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

  const uniform = (name) => gl.getUniformLocation(program, name);
  const time = uniform("time");
  const aspect = uniform("aspect");
  const dpr = uniform("dpr");

  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let frame = 0;
  let visible = true;

  function resize() {
    const ratio = Math.min(devicePixelRatio, 1.5);
    canvas.width = canvas.clientWidth * ratio;
    canvas.height = canvas.clientHeight * ratio;
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform1f(aspect, canvas.width / canvas.height);
    gl.uniform1f(dpr, ratio);
  }

  function draw(now) {
    gl.uniform1f(time, still ? 12 : now / 1000);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.POINTS, 0, COLS * ROWS);
    if (!still && visible && !document.hidden) frame = requestAnimationFrame(draw);
  }

  function resume() {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(draw);
  }

  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) resume();
  });
  observer.observe(canvas);

  const onResize = () => {
    resize();
    resume();
  };
  const onVisibility = () => !document.hidden && resume();
  window.addEventListener("resize", onResize);
  document.addEventListener("visibilitychange", onVisibility);
  resize();
  resume();

  return () => {
    cancelAnimationFrame(frame);
    observer.disconnect();
    window.removeEventListener("resize", onResize);
    document.removeEventListener("visibilitychange", onVisibility);
    gl.getExtension("WEBGL_lose_context")?.loseContext();
  };
}

// ==============================================================================================================
export default function Background() {
  const canvas = useRef(null);
  const [fallback, setFallback] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let stop;
    // Start after the page is idle so the lattice never competes with first paint.
    const idle = window.requestIdleCallback ?? ((fn) => setTimeout(fn, 200));
    const cancel = window.cancelIdleCallback ?? clearTimeout;
    const handle = idle(() => {
      try {
        stop = start(canvas.current);
      } catch {
        stop = null;
      }
      if (stop) setReady(true);
      else setFallback(true);
    });
    return () => {
      cancel(handle);
      stop?.();
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[100svh] overflow-hidden">
      {fallback ? (
        <div className="lattice-fallback absolute inset-0" />
      ) : (
        <canvas
          ref={canvas}
          className={`lattice h-full w-full transition-opacity duration-1000 ease-out ${ready ? "" : "opacity-0"}`}
        />
      )}
    </div>
  );
}
