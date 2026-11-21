"use client";

import Greeting from "@/app/Greeting";
import PhotoStack from "@/app/PhotoStack";

import back2 from "@public/about/back2.jpg";
import grass from "@public/about/grass.jpg";
import dinner from "@public/about/dinner.jpg";
import mark from "@public/about/mark.jpg";

const photos = [
  { src: back2, alt: "Walking down a garden path under cherry blossoms" },
  { src: grass, alt: "Two friends lying on the grass, smiling up at the camera" },
  { src: dinner, alt: "Raising a glass at dinner in a restaurant with a city view" },
  { src: mark, alt: "Posing with a peace sign next to a life-size cardboard cutout" },
];

// ==============================================================================================================
function Bio() {
  return (
    <div className="flex max-w-[34rem] flex-col gap-4 text-[0.95rem] leading-relaxed text-muted lg:col-start-2 lg:row-start-1">
      <p>
        I&apos;m a full time student currently enrolled in Computer Science at the University of Calgary.
      </p>
      <p>
        Choosing computer science was a difficult decision to make coming from a family full of doctors where the only
        right path was medicine. But ever since I took my first programming class, I was hooked. My main interests are{" "}
        <span className="text-ink">software engineering, game development, and virtual reality</span>.
      </p>
      <p>
        Alongside this, I co-founded{" "}
        <a
          href="https://www.nullus.ca/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-ink underline decoration-ink/30 underline-offset-4 transition-colors duration-150 hover:decoration-accent"
        >
          Nullus Inc.
        </a>
        , where we empower individuals, clubs, and companies through innovative web development solutions.
      </p>
    </div>
  );
}

// ==============================================================================================================
function Hero() {
  return (
    <section className="mx-auto w-full max-w-5xl px-6 pt-40 md:pt-[30vh] xl:px-0">
      <Greeting />
      <h1 className="mt-1 text-[clamp(2.75rem,7vw,4.5rem)] font-[380] leading-[1.05] tracking-[-0.03em]">
        Alejandro Cardona
      </h1>

      <div aria-hidden className="hero-rule my-10 h-px w-full bg-ink/30" />

      {/* Bio first in reading order; on large screens the photo stack fills the space to its left. gap-10 matches the
          rule's my-10, so the stack sits as far from the bio as the bio sits from the rule. */}
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,34rem)]">
        <Bio />
        <PhotoStack photos={photos} className="lg:col-start-1 lg:row-start-1" />
      </div>
    </section>
  );
}

// ==============================================================================================================
export default function HomePage() {
  return <Hero />;
}
