"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { Github, Globe, X } from "lucide-react";
import SkillBox from "@/app/projects/SkillBox";
import { closeDialog, openDialog } from "@/lib/dialog";

const blurDataURL =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTAwJyBoZWlnaHQ9JzEwMCcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48ZmlsdGVyIGlkPSdiJyB4PScwJyB5PScwJz48ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPScxMicvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnIGZpbGw9JyMyMjInIGZpbHRlcj0ndXJsKCNiKScvPjwvc3ZnPg==";

// ==============================================================================================================
function isVideo(src) {
  return src.endsWith(".mp4") || src.endsWith(".webm") || src.endsWith(".ogg");
}

// ==============================================================================================================
function ProjectLinks({ links }) {
  if (!links?.length) return null;

  return (
    <div className="mt-5 flex flex-wrap gap-2">
      {links.map((link) => {
        const Icon = link.title.toLowerCase() === "github" ? Github : Globe;
        return (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 items-center gap-2 rounded-control border border-ink/15 px-3 text-sm transition-colors duration-150 ease-out hover:bg-ink/[0.06]"
          >
            <Icon size={15} aria-hidden />
            {link.title}
          </a>
        );
      })}
    </div>
  );
}

// ==============================================================================================================
function MainMedia({ project, src }) {
  return (
    // At least 16:9; on desktop it grows (never shrinks) to fill any height the text column adds beside it.
    <div className="relative aspect-video w-full overflow-hidden rounded-media border border-ink/10 bg-black md:shrink-0 md:grow">
      {isVideo(src) ? (
        <video
          key={src}
          src={src}
          autoPlay
          loop
          muted
          playsInline
          controls
          aria-label={`${project.title} demo`}
          className="absolute inset-0 h-full w-full object-contain"
        />
      ) : (
        <Image
          src={src}
          alt={`${project.title} screenshot`}
          fill
          sizes="(min-width: 768px) 600px, 100vw"
          placeholder="blur"
          blurDataURL={blurDataURL}
          className="object-cover"
        />
      )}
    </div>
  );
}

// ==============================================================================================================
function Thumbnails({ project, active, setActive }) {
  if (project.images.length <= 1) return null;

  return (
    <div role="group" aria-label="Media" className="mt-3 flex shrink-0 gap-2 overflow-x-auto overflow-y-hidden pb-1">
      {project.images.map((src, i) => (
        <button
          key={src}
          type="button"
          onClick={() => setActive(i)}
          aria-label={`Show ${isVideo(src) ? "video" : "image"} ${i + 1} of ${project.images.length}`}
          aria-pressed={active === i}
          className="relative h-16 w-24 shrink-0 overflow-hidden rounded-control border border-ink/10 opacity-60 transition-opacity duration-150 ease-out hover:opacity-100 aria-pressed:border-ink/60 aria-pressed:opacity-100 md:h-20 md:w-auto md:flex-1"
        >
          {isVideo(src) ? (
            <video src={src} muted preload="metadata" className="pointer-events-none h-full w-full object-cover" />
          ) : (
            <Image src={src} alt="" fill sizes="120px" className="object-cover" />
          )}
        </button>
      ))}
    </div>
  );
}

// ==============================================================================================================
function TechStack({ techStack }) {
  const [hovered, setHovered] = useState(null);
  if (!techStack) return null;

  return (
    <ul aria-label="Tech stack" className="flex w-full [grid-area:stack]">
      {techStack.map((item, idx) => (
        <li
          key={item.name}
          className={`relative transition-[flex-grow] duration-300 ease-out ${hovered === idx ? "flex-[2]" : "flex-1"}`}
          onMouseEnter={() => setHovered(idx)}
          onMouseLeave={() => setHovered(null)}
        >
          <SkillBox name={item.name} image={item.image} index={idx} count={techStack.length} />
        </li>
      ))}
    </ul>
  );
}

// ==============================================================================================================
export default function ProjectDialog({ project, onClose }) {
  const dialog = useRef(null);
  const [active, setActive] = useState(0);

  useLayoutEffect(() => {
    const el = dialog.current;
    openDialog(el);
    el.querySelector("[data-autofocus]")?.focus();
    return () => el.close();
  }, []);

  // Fade out, close, then let the page unmount the dialog.
  const close = () => closeDialog(dialog.current, onClose);

  return (
    <dialog
      ref={dialog}
      aria-labelledby="project-title"
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
      onClick={(event) => event.target === dialog.current && close()}
      className="project-dialog m-auto max-h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)] max-w-5xl overflow-y-auto overflow-x-hidden rounded-overlay border border-ink/10 bg-surface p-0 text-ink"
    >
      {/* Desktop: media and the tech stack on the left, the text spanning both rows on the right, so the columns end
          level instead of leaving a gap under the images. Mobile: media, text, tech stack. */}
      <div className="grid grid-cols-[minmax(0,1fr)] gap-8 p-5 [grid-template-areas:'media'_'info'_'stack'] md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:grid-rows-[1fr_auto] md:gap-x-10 md:gap-y-6 md:p-8 md:[grid-template-areas:'media_info'_'stack_info']">
        <div className="flex flex-col [grid-area:media]">
          <MainMedia project={project} src={project.images[active]} />
          <Thumbnails project={project} active={active} setActive={setActive} />
        </div>

        <div className="flex flex-col [grid-area:info]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 id="project-title" className="text-2xl font-[420] tracking-[-0.02em] md:text-3xl">
                {project.title}
              </h2>
              <p className="mt-1 text-muted">{project.subtitle}</p>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              data-autofocus
              className="absolute right-7 top-7 z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-control bg-surface/80 text-muted backdrop-blur transition-colors duration-150 ease-out hover:bg-ink/[0.06] hover:text-ink md:static md:-mr-2 md:-mt-1 md:bg-transparent md:backdrop-blur-none"
            >
              <X size={18} aria-hidden />
            </button>
          </div>

          <ProjectLinks links={project.links} />

          <h3 className="mt-8 font-medium">{project.header}</h3>
          <p className="mt-2 whitespace-pre-line text-[0.95rem] leading-relaxed text-muted">
            {project.description.replace(/\n[ \t]+/g, "\n").trim()}
          </p>
        </div>

        <TechStack techStack={project.techStack} />
      </div>
    </dialog>
  );
}
