"use client";

import { useState } from "react";
import Image from "next/image";

// Pose for the left, middle and right card, at rest and lifted. The middle one is straight and on top; the sides tuck
// behind it, tilted outward. translate-x is a share of the card's own width, so the fan scales with the column; the
// tilted sides land inside it, keeping the hero's 40px gap to the bio.
const POSES = [
  { rest: "translate(-36%, 4%) rotate(-6deg)", lift: "translate(-40%, 1%) rotate(-3deg) scale(1.04)", z: 10 },
  { rest: "none", lift: "translateY(-2%) scale(1.03)", z: 20 },
  { rest: "translate(36%, 4%) rotate(6deg)", lift: "translate(40%, 1%) rotate(3deg) scale(1.04)", z: 10 },
];

const card =
  "absolute left-[23%] top-[3%] aspect-square w-[54%] overflow-hidden rounded-media border border-ink/10 transition-[transform,opacity,box-shadow] duration-[400ms] ease-out motion-reduce:transition-none";

// ==============================================================================================================
// Each card is drawn twice: in the pile, and as a copy above the whole pile. Lifting a card moves both and fades its
// copy in, so it rises through the cards in front of it instead of snapping over them.
export default function PhotoCards({ photos, className = "" }) {
  const [active, setActive] = useState(null);

  // The card under the pointer, in paint order. Only the active copy takes pointer events, so while a card is lifted
  // the pointer keeps "seeing" it over the cards it now covers.
  function track(event) {
    const hit = document.elementsFromPoint(event.clientX, event.clientY).find((el) => el.dataset.card !== undefined);
    setActive(hit ? Number(hit.dataset.card) : null);
  }

  const shown = photos.slice(0, 3);

  return (
    <div
      onPointerMove={(event) => event.pointerType !== "touch" && track(event)}
      onPointerDown={track}
      onPointerLeave={(event) => event.pointerType !== "touch" && setActive(null)}
      className={`${className} relative aspect-[8/5] w-full max-w-[30rem] justify-self-center lg:max-w-none lg:justify-self-stretch`}
    >
      {shown.map((photo, i) => (
        <div
          key={photo.src.src}
          data-card={i}
          style={{ transform: active === i ? POSES[i].lift : POSES[i].rest, zIndex: POSES[i].z }}
          className={`${card} shadow-[0_10px_30px_-12px_rgb(0_0_0/0.5)]`}
        >
          <Image src={photo.src} alt={photo.alt} fill placeholder="blur" sizes="(min-width: 1024px) 250px, 56vw" className="object-cover" />
        </div>
      ))}

      {shown.map((photo, i) => (
        <div
          key={`${photo.src.src}-lifted`}
          aria-hidden
          data-card={i}
          style={{ transform: active === i ? POSES[i].lift : POSES[i].rest, opacity: active === i ? 1 : 0, zIndex: 40 }}
          className={`${card} ${active === i ? "shadow-[0_22px_45px_-14px_rgb(0_0_0/0.6)]" : "pointer-events-none"}`}
        >
          <Image src={photo.src} alt="" fill sizes="(min-width: 1024px) 250px, 56vw" className="object-cover" />
        </div>
      ))}
    </div>
  );
}
