"use client";

import { useSyncExternalStore } from "react";

// Theme and monospace live as data attributes on <html>, set before paint by the inline script in layout.jsx.
const root = () => document.documentElement;

function subscribe(callback) {
  const observer = new MutationObserver(callback);
  observer.observe(root(), { attributes: true, attributeFilter: ["data-theme", "data-mono"] });
  return () => observer.disconnect();
}

const snapshot = () => `${root().dataset.theme}|${root().dataset.mono !== undefined}`;

// Returns null on the server and during hydration so markup matches.
export function useDisplay() {
  const value = useSyncExternalStore(subscribe, snapshot, () => null);
  if (!value) return null;
  const [theme, mono] = value.split("|");
  return { theme, mono: mono === "true" };
}

function reducedMotion() {
  return matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function store(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {}
}

// 8-blade aperture: an octagon that rotates while it opens, centred on the control that triggered it.
function irisFrames(x, y) {
  const reach = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y)) / Math.cos(Math.PI / 8);
  const steps = 16;
  return Array.from({ length: steps + 1 }, (_, i) => {
    const t = i / steps;
    const turn = Math.PI / 8 + t * (Math.PI / 2);
    const points = Array.from({ length: 8 }, (_, k) => {
      const a = turn + (k * Math.PI) / 4;
      return `${x + Math.cos(a) * reach * t}px ${y + Math.sin(a) * reach * t}px`;
    });
    return { clipPath: `polygon(${points.join(",")})` };
  });
}

function withTransition(className, change, animate) {
  if (!document.startViewTransition || reducedMotion()) {
    change();
    return;
  }
  root().classList.add(className);
  const transition = document.startViewTransition(change);
  transition.ready.then(animate).catch(() => {});
  transition.finished.finally(() => root().classList.remove(className));
}

export function toggleTheme(origin) {
  const next = root().dataset.theme === "light" ? "dark" : "light";
  const rect = origin?.getBoundingClientRect();
  const x = rect ? rect.left + rect.width / 2 : innerWidth / 2;
  const y = rect ? rect.top + rect.height / 2 : 0;

  withTransition(
    "theme-vt",
    () => {
      root().dataset.theme = next;
      store("theme", next);
    },
    () =>
      root().animate(irisFrames(x, y), {
        duration: 700,
        easing: "cubic-bezier(0.65, 0, 0.35, 1)",
        fill: "forwards",
        pseudoElement: "::view-transition-new(root)",
      })
  );
}

export function toggleMono() {
  withTransition("mono-vt", () => {
    const on = root().dataset.mono === undefined;
    if (on) root().dataset.mono = "";
    else delete root().dataset.mono;
    store("mono", on ? "1" : "0");
  });
}
