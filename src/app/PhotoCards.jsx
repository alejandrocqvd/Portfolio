"use client";

import { useState } from "react";
import Image from "next/image";

// Resting pose for the left, middle and right card. The middle one is straight and on top; the sides tuck behind it,
// tilted outward. translate-x is a share of the card's own width, so the fan scales with the column; the tilted sides
// still land inside it, keeping the hero's 40px gap to the bio.
const POSES = [
  { transform: "translate(-36%, 4%) rotate(-6deg)", z: 10 },
  { transform: "none", z: 20 },
  { transform: "translate(36%, 4%) rotate(6deg)", z: 10 },
];

// ==============================================================================================================
// Hover flips a card over (mouse); tap or Enter flips it on touch screens and for keyboard users.
function Card({ photo, pose }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <button
      type="button"
      aria-pressed={flipped}
      onClick={(event) => {
        // A mouse already flips on hover; clicks only toggle for touch and keyboard (detail 0).
        if (event.detail > 0 && matchMedia("(hover: hover)").matches) return;
        setFlipped((f) => !f);
      }}
      style={{ transform: pose.transform, zIndex: pose.z }}
      className="group absolute left-[23%] top-[3%] aspect-square w-[54%] cursor-pointer rounded-media [perspective:1000px] hover:!z-30 focus-visible:!z-30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
    >
      <span
        className={`relative block h-full w-full transition-transform duration-500 ease-out [transform-style:preserve-3d] motion-reduce:transition-none [@media(hover:hover)]:group-hover:[transform:rotateY(180deg)] ${
          flipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        <span className="absolute inset-0 overflow-hidden rounded-media border border-ink/10 shadow-[0_10px_30px_-12px_rgb(0_0_0/0.5)] [backface-visibility:hidden]">
          <Image src={photo.src} alt={photo.alt} fill placeholder="blur" sizes="(min-width: 1024px) 250px, 56vw" className="object-cover" />
        </span>
        <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-media border border-ink/10 bg-surface p-6 text-center shadow-[0_10px_30px_-12px_rgb(0_0_0/0.5)] [backface-visibility:hidden] [transform:rotateY(180deg)]">
          {photo.date && <span className="text-sm text-muted">{photo.date}</span>}
          {photo.place && <span className="font-medium text-ink">{photo.place}</span>}
          <span className="text-sm text-muted">{photo.caption}</span>
        </span>
      </span>
    </button>
  );
}

// ==============================================================================================================
// Three photos fanned out: left, middle (straight, on top), right.
export default function PhotoCards({ photos, className = "" }) {
  return (
    <div className={`${className} relative aspect-[8/5] w-full max-w-[30rem] justify-self-center lg:max-w-none lg:justify-self-stretch`}>
      {photos.slice(0, 3).map((photo, i) => (
        <Card key={photo.src.src} photo={photo} pose={POSES[i]} />
      ))}
    </div>
  );
}
