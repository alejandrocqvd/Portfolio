"use client";

import { useEffect } from "react";

// While a view transition runs, the browser shows a snapshot over the page and every click lands on <html>, so links
// would ignore clicks until the animation ends. A click on the snapshot skips the transition and clicks the real
// link or button under the pointer instead.
export default function TransitionClicks() {
  useEffect(() => {
    if (!document.startViewTransition) return;
    const original = document.startViewTransition;
    let current = null;

    document.startViewTransition = function (...args) {
      const transition = original.apply(this, args);
      current = transition;
      transition.finished.finally(() => {
        if (current === transition) current = null;
      });
      return transition;
    };

    const onClick = (event) => {
      if (!current || event.target !== document.documentElement) return;
      const { clientX: x, clientY: y } = event;
      current.skipTransition();
      requestAnimationFrame(() => document.elementFromPoint(x, y)?.closest("a, button")?.click());
    };
    document.addEventListener("click", onClick, true);

    return () => {
      document.startViewTransition = original;
      document.removeEventListener("click", onClick, true);
    };
  }, []);

  return null;
}
