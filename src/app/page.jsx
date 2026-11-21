"use client";

import PhotoRow from "@/components/PhotoRow";
import Greeting from "@/app/Greeting";

import back2 from "@public/about/back2.jpg";
import grass from "@public/about/grass.jpg";
import dinner from "@public/about/dinner.jpg";
import mark from "@public/about/mark.jpg";

const photos = [back2, grass, dinner, mark];

// ==============================================================================================================
function Bio() {
  return (
    <div className="flex max-w-[34rem] flex-col gap-4 text-[0.95rem] leading-relaxed text-muted lg:w-1/2">
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

      <div className="flex justify-end">
        <Bio />
      </div>
    </section>
  );
}

// ==============================================================================================================
export default function HomePage() {
  return (
    <>
      <Hero />
      <section className="mx-auto mt-20 block w-full max-w-5xl px-6 xl:px-0">
        <PhotoRow photos={photos} />
      </section>
    </>
  );
}
