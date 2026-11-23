"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import vs from "@public/about/vs.jpg";
import uarad from "@public/about/uarad.jpg";
import playgroundBuild from "@public/about/playgroundBuild.png";
import speakingHD from "@public/about/speakingHD.png";

const photos = [
  { src: uarad, alt: "Three of us in front of the Acuren banner at an event" },
  { src: playgroundBuild, alt: "The volunteer crew in front of the playground we built" },
  { src: speakingHD, alt: "Speaking at a podium beside a Pason banner" },
  { src: vs, alt: "Students' Union Volunteer Services photo booth with friends" },
];

// Same buttons as the Projects and Contact heroes.
const button =
  "inline-flex h-10 items-center justify-center gap-2 rounded-control px-4 text-sm transition-[background-color,transform] duration-150 ease-out active:scale-[0.97]";

const timelineItems = [
  {
    company: "University of Calgary",
    role: "BS in Computer Science",
    period: "Sept 2022 - Now",
    description: [
      "CGPA: 3.9 / 4.0",
      "Awards and Honours: Alexander Rutherford Scholarship, 3x Dean's List",
      "Relevant Coursework:  DSA, OOP, DBMS",
    ],
  },
  {
    company: "Pason Systems",
    role: "Software Engineer Intern",
    period: "May 2025 - Aug 2026",
    description: [
      "Owned full-stack features across Java services and React frontends in my fast-moving Agile team",
      "Wrote all the kinds of tests you can imagine (unit, integration, e2e, you name it)",
      "Shipped faster with CI/CD, automating builds, tests, and deployments",
    ],
  },
  {
    company: "Nullus",
    role: "Co-Founder & Software Engineer",
    period: "Apr 2024 - Now",
    description: [
      "Co-founded Nullus Inc., a student-led software development startup",
      "Designed and developed sites for individuals, clubs, and businesses",
      "Served 6+ clients and reaching 2000+ users",
    ],
  },
  {
    company: "UofA Robotics and Aerial Drones",
    role: "Software Engineer",
    period: "Jul 2025 - Oct 2025",
    description: [
      "Developed the UA-RAD club website using Nextjs, following a structured waterfall dev process",
      "Utilized ArduPilot to program and test autonomous drone flight missions",
      "0 drones exploded",
    ],
  },
  {
    company: "Canadian Global Care on Campus",
    role: "Web Developer",
    period: "Oct 2023 - Mar 2025",
    description: [
      "Designed, developed, and maintained a React-based website with TailwindCSS and Vite",
      "Promoted the site which led to a 36% increase in club event attendance",
      "Entire box of leftover croissants taken home after event",
    ],
  },
];

// ==============================================================================================================
// Same two-column frame as the Projects and Contact heroes.
function TimelineHero() {
  return (
    <div className="grid gap-12 md:grid-cols-2 md:items-center">
      <div>
        <h1 className="text-3xl font-[420] tracking-[-0.02em] md:text-4xl">Timeline</h1>
        <p className="mt-5 max-w-md leading-relaxed text-muted">
          From volunteering to full-time work, I&apos;ve been lucky enough to have been a part of so many different
          teams, learning something new from each one. Forever grateful for the people who took the time to mentor me
          and trust me with real responsibility (and not just make me fetch coffee or something).
        </p>
        <a
          href="/misc/Alejandro-Cardona-Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className={`${button} mt-10 bg-ink text-paper hover:bg-ink/85`}
        >
          <ArrowUpRight size={16} aria-hidden />
          Resume
        </a>
      </div>

      {/* 4:3, not square: the photos are 4:3 or 3:2, and a square crop cuts people off the edges. */}
      <ul aria-label="Photos" className="grid grid-cols-2 gap-3">
        {photos.map((photo) => (
          <li key={photo.alt} className="relative aspect-[4/3] overflow-hidden rounded-media border border-ink/10">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              placeholder="blur"
              sizes="(min-width: 768px) 210px, 45vw"
              className="object-cover"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

// ==============================================================================================================
// Spine and nodes share one x position: 7px into the list on mobile, 7px past the date column on desktop. The 12rem
// date column (2rem of it padding) fits the widest period, "Oct 2023 - Mar 2025"; the spine offset follows it.
function TimelineItem({ item }) {
  const current = /now/i.test(item.period);

  return (
    <li className="relative grid pb-12 pl-8 last:pb-0 md:grid-cols-[12rem_1fr] md:pl-0">
      <p className="order-last mt-2 text-sm tabular-nums text-muted md:order-none md:mt-0.5 md:pr-8 md:text-right whitespace-nowrap">
        {item.period}
      </p>

      <div className="relative md:pl-10">
        <span
          aria-hidden
          className={`absolute -left-8 top-1.5 h-[15px] w-[15px] rounded-full border-2 bg-paper md:left-0 ${
            current ? "border-accent" : "border-ink/25"
          }`}
        />
        <h2 className="font-medium">
          {item.company}
          <span className="font-normal text-muted"> — {item.role}</span>
          {current && <span className="sr-only"> (current)</span>}
        </h2>
        <ul className="mt-2 flex list-disc flex-col gap-1 pl-[1.1em] text-[0.95rem] leading-relaxed text-muted marker:text-ink/30">
          {item.description.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>
    </li>
  );
}

// ==============================================================================================================
function TimelineList() {
  return (
    <div className="mt-20 border-t border-ink/10 pt-12 md:mt-24">
      <ol className="relative">
        <span aria-hidden className="spine absolute bottom-2 left-[7px] top-2 w-px bg-ink/15 md:left-[calc(12rem+7px)]" />
        {timelineItems.map((item) => (
          <TimelineItem key={`${item.company}-${item.role}`} item={item} />
        ))}
      </ol>
    </div>
  );
}

// ==============================================================================================================
export default function Timeline() {
  return (
    <section className="mx-auto w-full max-w-4xl px-6 pt-36 md:pt-44 xl:px-0">
      <TimelineHero />
      <TimelineList />
    </section>
  );
}
