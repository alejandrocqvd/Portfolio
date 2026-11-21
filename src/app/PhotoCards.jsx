import Image from "next/image";

// Pose for the left, middle and right card, at rest and when hovered. The middle one is straight and on top; the sides
// tuck behind it, tilted outward. translate-x is a share of the card's own width, so the fan scales with the column;
// the tilted sides land inside it, keeping the hero's 40px gap to the bio.
// Hovering lifts a card (slides outward, straightens a little, grows) and only then raises it above the others, so the
// change in stacking order happens mid-motion instead of as a pop.
const POSES = [
  { rest: "translate(-36%, 4%) rotate(-6deg)", lift: "translate(-40%, 1%) rotate(-3deg) scale(1.04)", z: 10 },
  { rest: "none", lift: "translateY(-2%) scale(1.03)", z: 20 },
  { rest: "translate(36%, 4%) rotate(6deg)", lift: "translate(40%, 1%) rotate(3deg) scale(1.04)", z: 10 },
];

// ==============================================================================================================
export default function PhotoCards({ photos, className = "" }) {
  return (
    <div className={`${className} relative aspect-[8/5] w-full max-w-[30rem] justify-self-center lg:max-w-none lg:justify-self-stretch`}>
      {photos.slice(0, 3).map((photo, i) => (
        <div
          key={photo.src.src}
          style={{ "--rest": POSES[i].rest, "--lift": POSES[i].lift, zIndex: POSES[i].z }}
          className="absolute left-[23%] top-[3%] aspect-square w-[54%] overflow-hidden rounded-media border border-ink/10 shadow-[0_10px_30px_-12px_rgb(0_0_0/0.5)] [transform:var(--rest)] [transition:transform_400ms_var(--ease),box-shadow_400ms_var(--ease),z-index_0s_linear_120ms] hover:!z-30 hover:shadow-[0_22px_45px_-14px_rgb(0_0_0/0.6)] hover:[transform:var(--lift)] motion-reduce:[transition:none]"
        >
          <Image src={photo.src} alt={photo.alt} fill placeholder="blur" sizes="(min-width: 1024px) 250px, 56vw" className="object-cover" />
        </div>
      ))}
    </div>
  );
}
