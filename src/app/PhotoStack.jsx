"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const HOLD = 4500; // ms each photo stays on top before the stack advances on its own
const OUT = 260; // ms for the top photo to flick away before it slides in at the back

// Resting pose per depth (0 = top). Deeper cards peek out, turned slightly, so it reads as a loose pile.
const DEPTHS = [
  "translate(0, 0) rotate(0deg) scale(1)",
  "translate(14px, 6px) rotate(4deg) scale(0.96)",
  "translate(-12px, 12px) rotate(-4deg) scale(0.92)",
  "translate(4px, 18px) rotate(2deg) scale(0.88)",
];
const FLICK = "translate(-34%, -6%) rotate(-12deg) scale(1)";

// ==============================================================================================================
// A pile of photos: the top one flicks away and tucks in at the back, every HOLD ms or when clicked.
export default function PhotoStack({ photos, className = "" }) {
  const [order, setOrder] = useState(() => photos.map((_, i) => i)); // order[0] is on top
  const [leaving, setLeaving] = useState(null);
  const paused = useRef(false);
  const busy = useRef(false);

  const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

  function next() {
    if (busy.current) return;
    const rotate = () => setOrder((o) => [...o.slice(1), o[0]]);
    if (reduced()) return rotate();
    busy.current = true;
    setLeaving(order[0]);
    setTimeout(() => {
      rotate();
      setLeaving(null);
      busy.current = false;
    }, OUT);
  }

  // Advance on a timer once the intro has finished; hovering, focus or a hidden tab pause it.
  const advance = useRef(next);
  advance.current = next;
  useEffect(() => {
    if (reduced()) return;
    const intro = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--intro")) || 0;
    let interval;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        if (!paused.current && !document.hidden) advance.current();
      }, HOLD);
    }, intro * 1000);
    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, []);

  const top = photos[order[0]];

  return (
    <button
      type="button"
      onClick={next}
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
      onFocus={() => (paused.current = true)}
      onBlur={() => (paused.current = false)}
      aria-label={`${top.alt}. Photo ${order[0] + 1} of ${photos.length}. Show next photo`}
      // aspect-square sets the minimum height; in the hero's grid row it stretches taller when the bio is taller.
      className={`${className} group relative aspect-square w-full max-w-[23rem] cursor-pointer justify-self-center rounded-media lg:max-w-none lg:justify-self-stretch focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-accent`}
    >
      {photos.map((photo, i) => {
        const depth = order.indexOf(i);
        const out = leaving === i;
        return (
          <span
            key={photo.src.src}
            aria-hidden
            style={{
              transform: out ? FLICK : DEPTHS[Math.min(depth, DEPTHS.length - 1)],
              opacity: out ? 0 : 1,
              zIndex: out ? photos.length + 1 : photos.length - depth,
            }}
            className="absolute inset-0 overflow-hidden rounded-media border border-ink/10 bg-surface shadow-[0_10px_30px_-12px_rgb(0_0_0/0.45)] transition-[transform,opacity] duration-[400ms] ease-out motion-reduce:transition-none"
          >
            <Image
              src={photo.src}
              alt=""
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 440px, 90vw"
              className={`object-cover transition-transform duration-150 ease-out ${depth === 0 ? "group-hover:scale-[1.02]" : ""}`}
            />
          </span>
        );
      })}
    </button>
  );
}
