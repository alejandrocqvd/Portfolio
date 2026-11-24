"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/lib/display";

// A canvas can hand its control to a worker only once, so the worker outlives a dev-mode (StrictMode) remount.
const workers = new WeakMap();

function startWorker(el) {
  const offscreen = el.transferControlToOffscreen();
  const worker = new Worker(new URL("./lattice.worker.js", import.meta.url));
  const entry = { worker, status: null, listener: null };
  worker.onmessage = ({ data }) => {
    entry.status = data;
    entry.listener?.(data);
  };
  worker.onerror = () => {
    entry.status = "fallback";
    entry.listener?.("fallback");
  };
  const size = { width: el.clientWidth, height: el.clientHeight, ratio: Math.min(devicePixelRatio, 1.5) };
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const light = document.documentElement.dataset.theme === "light";
  worker.postMessage({ canvas: offscreen, still, light, size }, [offscreen]);
  return entry;
}

// Elements that always count as content: controls, media and dialogs.
const CONTENT = "a, button, input, textarea, select, label, summary, [role=button], [role=tab], [contenteditable], img, video, canvas, svg, dialog";

// True when a click lands on something drawn over the lattice (controls, media, filled or bordered surfaces, the
// words themselves), so only clicks on bare background ripple.
//
// Text is hit-tested per line box, so the empty end of a short line still counts as background.
function onContent({ target, clientX: x, clientY: y }) {
  if (!(target instanceof Element) || target.closest(CONTENT)) return true;
  for (let el = target; el && el !== document.body && el !== document.documentElement; el = el.parentElement) {
    const s = getComputedStyle(el);
    if (!/^(transparent|rgba\(.*,\s*0\))$/.test(s.backgroundColor) || s.backgroundImage !== "none") return true;
    if (["Top", "Right", "Bottom", "Left"].some((side) => parseFloat(s[`border${side}Width`]) > 0)) return true;
  }
  const range = document.createRange();
  for (const node of target.childNodes) {
    if (node.nodeType !== Node.TEXT_NODE || !node.textContent.trim()) continue;
    range.selectNodeContents(node);
    for (const r of range.getClientRects()) if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) return true;
  }
  return false;
}

// ==============================================================================================================
export default function Background() {
  const canvas = useRef(null);
  const [status, setStatus] = useState(null);
  const theme = useTheme();

  // Tell the worker the theme; it draws slightly larger dots in light mode.
  useEffect(() => {
    if (theme) workers.get(canvas.current)?.worker.postMessage({ light: theme === "light" });
  }, [theme]);

  useEffect(() => {
    const el = canvas.current;
    if (!el?.transferControlToOffscreen || typeof Worker === "undefined") {
      setStatus("fallback");
      return;
    }

    let entry = workers.get(el);
    let handle;
    let observer;
    const post = (message) => entry?.worker.postMessage(message);
    const onResize = () => post({ size: { width: el.clientWidth, height: el.clientHeight, ratio: Math.min(devicePixelRatio, 1.5) } });
    const onVisibility = () => post({ running: !document.hidden });
    // Ripple where the visitor clicks: mouse and pen on press, touch on release (a scroll swipe ends in
    // pointercancel instead).
    const onPointer = (e) => {
      if (!e.isPrimary || e.button > 0 || e.type !== (e.pointerType === "touch" ? "pointerup" : "pointerdown")) return;
      const rect = el.getBoundingClientRect();
      if (e.clientY > rect.bottom || onContent(e)) return;
      post({ ripple: [e.clientX - rect.left, e.clientY - rect.top] });
    };
    // Hover disturbance follows the mouse/pen (re-sent on scroll, since the canvas moves under a still cursor).
    let pointer = null;
    const sendCursor = () => {
      if (!pointer) return post({ cursor: null });
      const rect = el.getBoundingClientRect();
      post({ cursor: [pointer[0] - rect.left, pointer[1] - rect.top] });
    };
    const onMove = (e) => {
      if (e.pointerType === "touch") return;
      pointer = [e.clientX, e.clientY];
      sendCursor();
    };
    const onLeave = () => {
      pointer = null;
      sendCursor();
    };

    const begin = () => {
      if (entry) clearTimeout(entry.kill);
      else {
        try {
          entry = startWorker(el);
        } catch {
          setStatus("fallback");
          return;
        }
        workers.set(el, entry);
      }
      entry.listener = setStatus;
      if (entry.status) setStatus(entry.status);
      observer = new IntersectionObserver(([e]) => post({ running: e.isIntersecting && !document.hidden }));
      observer.observe(el);
      window.addEventListener("resize", onResize);
      document.addEventListener("visibilitychange", onVisibility);
      window.addEventListener("pointerdown", onPointer, { passive: true });
      window.addEventListener("pointerup", onPointer, { passive: true });
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("scroll", sendCursor, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
    };

    // Start once the page is idle; the lattice is decoration and never competes with first paint.
    if (entry) begin();
    else handle = (window.requestIdleCallback ?? ((fn) => setTimeout(fn, 200)))(begin);

    return () => {
      (window.cancelIdleCallback ?? clearTimeout)(handle);
      observer?.disconnect();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("pointerup", onPointer);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", sendCursor);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      if (entry) {
        entry.listener = null;
        entry.kill = setTimeout(() => {
          entry.worker.terminate();
          workers.delete(el);
        }, 0);
      }
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[100svh] overflow-hidden">
      {status === "fallback" ? (
        <div className="lattice-fallback absolute inset-0" />
      ) : (
        <canvas
          ref={canvas}
          className={`lattice h-full w-full transition-opacity duration-1000 ease-out ${status === "ready" ? "" : "opacity-0"}`}
        />
      )}
    </div>
  );
}
