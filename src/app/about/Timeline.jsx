"use client";

import { useState } from "react";
import Image from "next/image";

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

const timelineItems = [
  {
    company: "University of Calgary",
    short: "UCalgary",
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
    short: "Pason",
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
    short: "Nullus",
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
    short: "UA-RAD",
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
    short: "CGCC",
    role: "Web Developer",
    period: "Oct 2023 - Mar 2025",
    description: [
      "Designed, developed, and maintained a React-based website with TailwindCSS and Vite",
      "Promoted the site which led to a 36% increase in club event attendance",
      "Entire box of leftover croissants taken home after event",
    ],
  },
];

// Dates are counted in months (year * 12 + month index). A period is inclusive, so a bar runs to the end of its last
// month; "Now" runs to the end of the current month, which keeps server and client renders identical within a month.
const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

function month(text) {
  const [name, year] = text.trim().split(/\s+/);
  return Number(year) * 12 + MONTHS.indexOf(name.slice(0, 3).toLowerCase());
}
console.assert(month("Sept 2022") === 2022 * 12 + 8 && month("Aug 2026") === 2026 * 12 + 7, "month() is off");

function duration(months) {
  const years = Math.floor(months / 12);
  const rest = months % 12;
  return [years && `${years} yr`, rest && `${rest} mo`].filter(Boolean).join(" ");
}

// ==============================================================================================================
// One lane per role, oldest first, on a shared axis from January of the first year to January after the current one.
function useLanes() {
  const today = new Date();
  const now = today.getFullYear() * 12 + today.getMonth() + 1;
  const lanes = timelineItems
    .map((item) => {
      const [from, to] = item.period.split(" - ");
      const current = /now/i.test(to);
      const start = month(from);
      const end = current ? now : month(to) + 1;
      return { item, current, start, end, length: duration(end - start) };
    })
    .sort((a, b) => a.start - b.start);

  const first = Math.floor(lanes[0].start / 12) * 12;
  const last = (today.getFullYear() + 1) * 12;
  const pct = (m) => `${((m - first) / (last - first)) * 100}%`;
  const years = Array.from({ length: (last - first) / 12 }, (_, i) => first / 12 + i);

  return { lanes, now, pct, years };
}

// ==============================================================================================================
// Tabs: each lane is a tab (the whole row is the target, so short bars are easy to hit), the panel below is its tabpanel.
// Arrow keys and Home/End move selection and focus together; selection happens on press, not release.
function YearTrack({ lanes, now, pct, years, selected, onSelect }) {
  function onKeyDown(event) {
    const moves = { ArrowUp: -1, ArrowLeft: -1, ArrowDown: 1, ArrowRight: 1 };
    let next;
    if (event.key in moves) next = (selected + moves[event.key] + lanes.length) % lanes.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = lanes.length - 1;
    else return;
    event.preventDefault();
    onSelect(next);
    document.getElementById(`role-tab-${next}`)?.focus();
  }

  return (
    <div className="mt-16">
      <div aria-hidden className="grid h-6 grid-cols-[4.5rem_1fr] text-xs tabular-nums text-muted md:grid-cols-[7rem_1fr]">
        <div className="relative col-start-2">
          {years.map((year) => (
            <span key={year} className="absolute top-0" style={{ left: pct(year * 12) }}>
              {year}
            </span>
          ))}
          {/* Too close to the last year label on phones; the accent line says it there. */}
          <span className="absolute top-0 hidden -translate-x-full pr-1.5 text-accent md:block" style={{ left: pct(now) }}>
            Now
          </span>
        </div>
      </div>

      <div className="relative">
        <div aria-hidden className="pointer-events-none absolute inset-y-0 left-[4.5rem] right-0 md:left-[7rem]">
          {years.map((year) => (
            <span key={year} className="absolute inset-y-0 w-px bg-ink/[0.06]" style={{ left: pct(year * 12) }} />
          ))}
          <span className="absolute inset-y-0 w-px bg-accent/60" style={{ left: pct(now) }} />
        </div>

        <div role="tablist" aria-label="Roles by year" onKeyDown={onKeyDown}>
          {lanes.map((lane, i) => {
            const active = i === selected;
            const color = active
              ? lane.current
                ? "bg-accent"
                : "bg-ink"
              : lane.current
                ? "bg-accent/45 group-hover:bg-accent/70"
                : "bg-ink/20 group-hover:bg-ink/35";
            return (
              <button
                key={lane.item.company}
                id={`role-tab-${i}`}
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls="role-panel"
                tabIndex={active ? 0 : -1}
                aria-label={`${lane.item.company}, ${lane.item.role}, ${lane.item.period}`}
                onPointerDown={(event) => event.button === 0 && onSelect(i)}
                onClick={() => onSelect(i)}
                className="group grid h-9 w-full grid-cols-[4.5rem_1fr] items-center rounded-control text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:grid-cols-[7rem_1fr]"
              >
                <span
                  className={`truncate text-sm transition-colors duration-150 ease-out ${
                    active ? "text-ink" : "text-muted group-hover:text-ink"
                  }`}
                >
                  {lane.item.short}
                </span>
                <span className="relative h-2">
                  <span
                    className={`year-bar absolute inset-y-0 transition-colors duration-150 ease-out ${color}`}
                    style={{ left: pct(lane.start), width: `calc(${pct(lane.end)} - ${pct(lane.start)})`, "--i": i }}
                  />
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ==============================================================================================================
function RolePanel({ lane, tab }) {
  const { item, current, length } = lane;

  return (
    <div
      role="tabpanel"
      id="role-panel"
      aria-labelledby={tab}
      className="mt-8 rounded-media border border-ink/10 bg-surface p-6 md:p-8"
    >
      <div key={item.company} className="role-in">
        <h2 className="text-xl font-[420] tracking-[-0.01em]">
          {item.company}
          {current && <span className="sr-only"> (current)</span>}
        </h2>
        <p className="mt-1 text-sm text-muted">
          {item.role} · <span className="tabular-nums">{item.period}</span> · {length}
        </p>
        <ul className="mt-5 flex list-disc flex-col gap-1 pl-[1.1em] text-[0.95rem] leading-relaxed text-muted marker:text-ink/30">
          {item.description.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ==============================================================================================================
export default function Timeline() {
  const track = useLanes();
  const [selected, setSelected] = useState(() => track.lanes.findIndex((lane) => lane.item === timelineItems[0]));

  return (
    <section className="mx-auto w-full max-w-4xl px-6 pt-36 md:pt-44 xl:px-0">
      <h1 className="text-3xl font-[420] tracking-[-0.02em] md:text-4xl">Timeline</h1>
      <p className="mt-5 max-w-2xl leading-relaxed text-muted">
        From volunteering to full-time work, I&apos;ve been lucky enough to have been a part of so many different teams,
        learning something new from each one. Forever grateful for the people who took the time to mentor me and trust me
        with real responsibility (and not just make me fetch coffee or something).
      </p>

      <YearTrack {...track} selected={selected} onSelect={setSelected} />
      <RolePanel lane={track.lanes[selected]} tab={`role-tab-${selected}`} />

      {/* 4:3, not square: the photos are 4:3 or 3:2, and a square crop cuts people off the edges. */}
      <ul aria-label="Photos" className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
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

      <p className="mt-12 text-muted">
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
    </section>
  );
}

