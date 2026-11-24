"use client";

import { useSyncExternalStore } from "react";

// The theme lives as a data attribute on <html>, set before paint by the inline script in layout.jsx.
const root = () => document.documentElement;

function subscribe(callback) {
  const observer = new MutationObserver(callback);
  observer.observe(root(), { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

const snapshot = () => root().dataset.theme;

// Returns null on the server and during hydration so markup matches.
export function useTheme() {
  return useSyncExternalStore(subscribe, snapshot, () => null);
}

function reducedMotion() {
  return matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function store(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {}
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
  // The reveal is a circle from the toggle whose outer 10% is feathered (mask in globals.css), so the solid part
  // must reach the farthest corner.
  const reach = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y)) / 0.9;
  root().style.setProperty("--iris-x", `${x}px`);
  root().style.setProperty("--iris-y", `${y}px`);

  withTransition(
    "theme-vt",
    () => {
      root().dataset.theme = next;
      store("theme", next);
    },
    () =>
      root().animate({ "--iris": ["0px", `${reach}px`] }, {
        duration: 700,
        easing: "cubic-bezier(0.65, 0, 0.35, 1)",
        fill: "forwards",
        pseudoElement: "::view-transition-new(root)",
      })
  );
}
