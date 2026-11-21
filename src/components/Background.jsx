"use client";

import { useEffect, useRef, useState } from "react";

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
  worker.postMessage({ canvas: offscreen, still, size }, [offscreen]);
  return entry;
}

// ==============================================================================================================
export default function Background() {
  const canvas = useRef(null);
  const [status, setStatus] = useState(null);

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
    // Ripple where the visitor clicks: mouse/pen on press, touch on release (a scroll swipe ends in pointercancel instead).
    const onPointer = (e) => {
      if (!e.isPrimary || e.button > 0 || e.type !== (e.pointerType === "touch" ? "pointerup" : "pointerdown")) return;
      const rect = el.getBoundingClientRect();
      if (e.clientY > rect.bottom) return;
      post({ ripple: [e.clientX - rect.left, e.clientY - rect.top] });
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
