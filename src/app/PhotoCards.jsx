"use client";

import { useState } from "react";
import Image from "next/image";

// Place and poses for the left, middle and right card. The cards are squares as tall as the pile; the sides sit flush
// with its edges and the middle one is centred on top, so the overlap follows the column's width. "lift" grows a card
// evenly (scale from its centre, sides nudged outward); the middle card is lifted unless a side card is.
const POSES = [
  { place: "left-0", pile: "none", lift: "translateX(-3%) scale(1.03)", z: 10 },
  { place: "left-1/2", pile: "translateX(-50%)", lift: "translateX(-50%) scale(1.03)", z: 20 },
  { place: "right-0", pile: "none", lift: "translateX(3%) scale(1.03)", z: 10 },
];

const card = "absolute top-0 aspect-square h-full overflow-hidden rounded-media border border-ink/25";

// The copies do all the moving. will-change keeps each on its own GPU layer, so none is re-rasterised mid-way.
const copy = `${card} shadow-[0_22px_45px_-14px_rgb(0_0_0/0.6)] will-change-transform transition-[transform,opacity] duration-[400ms] ease-out motion-reduce:transition-none`;

// ==============================================================================================================
// Each card is drawn twice: flat in the pile, which never moves, and as a lifted copy above the pile. Lifting a card
// fades its copy in and grows it from the pile pose, so it rises through the cards in front of it; lowering shrinks it
// back while it fades out.
//
// Why the pile never moves: a scaled photo is drawn resampled (soft) at the pile's half-pixel position, and when a
// transition ends the browser redraws it crisp and pixel-snapped, so a visible card that settles pops on its last
// frame. A copy only settles while fully shown at its lifted pose (no snap) or fully faded out (nothing to see).
export default function PhotoCards({ photos, className = "" }) {
  const [active, setActive] = useState(null);

  // The card under the pointer, in paint order. Only shown copies take pointer events, so while a card is lifted the
  // pointer keeps "seeing" it over the cards it now covers.
  function track(event) {
    const hit = document.elementsFromPoint(event.clientX, event.clientY).find((el) => el.dataset.card !== undefined);
    setActive(hit ? Number(hit.dataset.card) : null);
  }

  const shown = photos.slice(0, 3);
  const lifted = active ?? 1;

  // Stacked (below lg) the pile keeps its own 8:5 frame; beside the bio it drops it and stretches to the bio's height.
  return (
    <div
      onPointerMove={(event) => event.pointerType !== "touch" && track(event)}
      onPointerDown={track}
      onPointerLeave={(event) => event.pointerType !== "touch" && setActive(null)}
      className={`${className} relative isolate aspect-[8/5] w-full max-w-[30rem] justify-self-center lg:aspect-auto lg:max-w-none lg:justify-self-stretch`}
    >
      {shown.map((photo, i) => (
        <div
          key={photo.src.src}
          data-card={i}
          style={{ transform: POSES[i].pile, zIndex: POSES[i].z }}
          className={`${card} ${POSES[i].place}`}
        >
          <Image src={photo.src} alt={photo.alt} fill placeholder="blur" sizes="(min-width: 1024px) 300px, 63vw" className="object-cover" />
        </div>
      ))}

      {/* Side copies sit above the middle one, so a side card rises over it and sinks back while it reappears. */}
      {shown.map((photo, i) => (
        <div
          key={`${photo.src.src}-lifted`}
          aria-hidden
          data-card={i}
          style={{
            transform: lifted === i ? POSES[i].lift : POSES[i].pile,
            opacity: lifted === i ? 1 : 0,
            zIndex: i === 1 ? 40 : 50,
          }}
          className={`${copy} ${POSES[i].place} ${lifted === i ? "" : "pointer-events-none"}`}
        >
          <Image src={photo.src} alt="" fill placeholder="blur" sizes="(min-width: 1024px) 300px, 63vw" className="object-cover" />
        </div>
      ))}
    </div>
  );
}
