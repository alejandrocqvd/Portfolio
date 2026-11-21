"use client";

import PhotoRow from "@/components/PhotoRow";

import vs from "@public/about/vs.jpg";
import uarad from "@public/about/uarad.jpg";
import playgroundBuild from "@public/about/playgroundBuild.png";
import speakingHD from "@public/about/speakingHD.png";

const photos = [uarad, playgroundBuild, speakingHD, vs];

const timelineItems = [
  {
    company: "University of Calgary",
    role: "BS in Computer Science",
    period: "2022 - Now",
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
    period: "2023 - 2025",
    description: [
      "Designed, developed, and maintained a React-based website with TailwindCSS and Vite",
      "Promoted the site which led to a 30% increase in club event attendance",
      "Entire box of leftover croissants taken home after event",
    ],
  },
];

// ==============================================================================================================
function TimelineHeader() {
  return (
    <div className="px-6 xl:px-0">
      <h1 className="text-3xl font-[420] tracking-[-0.02em] md:text-4xl">Timeline</h1>
      <p className="mt-5 max-w-2xl leading-relaxed text-muted">
        From volunteering to full-time work, I&apos;ve been lucky enough to have been a part of so many different teams,
        learning something new from each one. Forever grateful for the people who took the time to mentor me and trust me
        with real responsibility (and not just make me fetch coffee or something).
      </p>
    </div>
  );
}

// ==============================================================================================================
function TimelinePhotos() {
  return (
    <div className="mt-16 px-6 xl:px-0">
      <PhotoRow photos={photos} reversed defaultSelected={photos.length - 1} />
    </div>
  );
}

// ==============================================================================================================
// Spine and nodes share one x position: 7px into the list on mobile, 7px past the date column on desktop. The 12rem
// date column (2rem of it padding) fits the widest period, "Oct 2023 - Mar 2025"; the spine and footer offsets follow it.
function TimelineItem({ item }) {
  const current = /now/i.test(item.period);

  return (
    <li className="relative grid pb-12 pl-8 last:pb-0 md:grid-cols-[12rem_1fr] md:pl-0">
      <p className="order-last mt-2 text-sm tabular-nums text-muted md:order-none md:mt-0.5 md:pr-8 md:text-right">
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
          <span className="font-normal text-muted"> {item.role}</span>
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
    <ol className="relative mt-20 px-6 xl:px-0">
      <span aria-hidden className="spine absolute bottom-2 left-[calc(1.5rem+7px)] top-2 w-px bg-ink/15 md:left-[calc(13.5rem+7px)] xl:left-[calc(12rem+7px)]" />
      {timelineItems.map((item) => (
        <TimelineItem key={`${item.company}-${item.role}`} item={item} />
      ))}
    </ol>
  );
}

// ==============================================================================================================
function TimelineFooter() {
  return (
    <p className="mt-16 px-6 text-muted md:pl-[16rem] xl:px-0 xl:pl-[14.5rem]">
      For my full experience, see my{" "}
      <a
        href="/misc/Alejandro-Cardona-Resume.pdf"
        target="_blank"
        rel="noreferrer"
        className="text-ink underline decoration-ink/30 underline-offset-4 transition-colors duration-150 hover:decoration-accent"
      >
        resume (PDF)
      </a>
      .
    </p>
  );
}

// ==============================================================================================================
export default function Timeline() {
  return (
    <section className="mx-auto w-full max-w-4xl pt-36 md:pt-44">
      <TimelineHeader />
      <TimelinePhotos />
      <TimelineList />
      <TimelineFooter />
    </section>
  );
}
