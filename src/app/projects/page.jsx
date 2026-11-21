"use client";

import { useEffect, useRef, useState } from "react";
import Image, { getImageProps } from "next/image";
import { Github } from "lucide-react";
import ProjectDialog from "@/app/projects/ProjectPopup";
import { featuredProject, projects, projectCards } from "@/app/projects/catalogue";

const allProjects = { featured: featuredProject, ...projects };

// Optimized (resized, modern format) poster for the featured video, which is the page's largest paint.
const poster = getImageProps({ src: "/work/idea-mr-room-planner-img.PNG", alt: "", width: 896, height: 504, quality: 70 }).props.src;

const button =
  "inline-flex h-10 items-center justify-center gap-2 rounded-control px-4 text-sm transition-[background-color,transform] duration-150 ease-out active:scale-[0.97]";

// ==============================================================================================================
function FeaturedVideo() {
  const video = useRef(null);

  useEffect(() => {
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches) video.current?.play().catch(() => {});
  }, []);

  return (
    <div className="overflow-hidden rounded-media border border-ink/10 bg-black">
      <video
        ref={video}
        src={featuredProject.images[0]}
        poster={poster}
        aria-label={`${featuredProject.title} demo`}
        className="aspect-video w-full object-cover"
        preload="metadata"
        muted
        loop
        playsInline
      />
    </div>
  );
}

// ==============================================================================================================
function FeaturedProject({ onOpen }) {
  const github = featuredProject.links.find((link) => link.title === "GitHub");

  return (
    <section className="grid items-center gap-10 px-6 pt-36 md:grid-cols-2 md:gap-12 md:pt-44 xl:px-0">
      <div className="flex flex-col items-start">
        <p className="text-sm text-muted">Featured project</p>
        <h1 className="mt-2 text-3xl font-[420] leading-tight tracking-[-0.02em] md:text-4xl">{featuredProject.title}</h1>
        <p className="mt-5 max-w-md leading-relaxed text-muted">{featuredProject.blurb}</p>

        <div className="mt-8 flex gap-3">
          <button type="button" onClick={() => onOpen("featured")} className={`${button} bg-ink text-paper hover:bg-ink/85`}>
            View details
          </button>
          <a
            href={github.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${button} border border-ink/15 hover:bg-ink/[0.06]`}
          >
            <Github size={16} aria-hidden />
            GitHub
          </a>
        </div>
      </div>

      <FeaturedVideo />
    </section>
  );
}

// ==============================================================================================================
// `side` lets a card bleed to the screen edge on mobile: that edge loses its border and rounding.
function edgeClasses(side) {
  if (side === "left") return "rounded-l-none border-l-0 md:rounded-l-media md:border-l";
  if (side === "right") return "rounded-r-none border-r-0 md:rounded-r-media md:border-r";
  return "";
}

// ==============================================================================================================
function Card({ id, side, large, onOpen }) {
  const project = projects[id];

  return (
    <button
      type="button"
      onClick={() => onOpen(id)}
      aria-label={`${project.title}, ${project.subtitle}`}
      className={`group flex w-full flex-col overflow-hidden rounded-media border border-ink/10 bg-surface text-left transition-transform duration-150 ease-out active:scale-[0.99] ${
        large ? "h-96" : "h-44"
      } ${edgeClasses(side)}`}
    >
      <div className={`relative w-full overflow-hidden ${large ? "h-1/2 md:h-3/4" : "h-1/2 md:h-[55%]"}`}>
        <Image
          src={project.thumbnail}
          alt=""
          fill
          sizes={large ? "(min-width: 896px) 600px, 66vw" : "(min-width: 896px) 300px, 33vw"}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      </div>

      <div className={`flex flex-1 flex-col justify-center ${large ? "px-6 md:px-8" : "px-4 md:px-5"}`}>
        <p className={`link w-fit group-hover:bg-[length:100%_1px] ${large ? "text-lg md:text-xl" : "text-sm md:text-base"}`}>
          {project.title}
        </p>
        <p className={`mt-1 text-sm text-muted ${large ? "" : "hidden md:block"}`}>{project.subtitle}</p>
      </div>
    </button>
  );
}

// ==============================================================================================================
function BentoRow({ row, reversed, onOpen }) {
  const large = (
    <div className="w-2/3">
      <Card {...row.large} large onOpen={onOpen} />
    </div>
  );
  const small = (
    <div className="flex w-1/3 flex-col gap-4 md:gap-6">
      {row.small.map((card) => (
        <Card key={card.id} {...card} onOpen={onOpen} />
      ))}
    </div>
  );

  return (
    <div className="flex gap-4 md:gap-6">
      {reversed ? small : large}
      {reversed ? large : small}
    </div>
  );
}

// ==============================================================================================================
export default function ProjectPage() {
  const [activeId, setActiveId] = useState(null);

  // Deep link from the command menu: /projects?p=<id>
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("p");
    if (id && allProjects[id]) setActiveId(id);
  }, []);

  const close = () => {
    if (window.location.search) history.replaceState(null, "", window.location.pathname);
    setActiveId(null);
  };

  return (
    <div className="mx-auto max-w-4xl">
      <FeaturedProject onOpen={setActiveId} />

      <section aria-label="More projects" className="mt-24 flex flex-col gap-4 md:mt-32 md:gap-6">
        <BentoRow row={projectCards.top} onOpen={setActiveId} />
        <BentoRow row={projectCards.bottom} reversed onOpen={setActiveId} />
      </section>

      {activeId && <ProjectDialog project={allProjects[activeId]} onClose={close} />}
    </div>
  );
}
