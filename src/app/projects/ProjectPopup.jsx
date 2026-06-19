"use client";

import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { Github, Globe } from "lucide-react";
import SkillBox from "@/app/projects/SkillBox";

const blurDataURL =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTAwJyBoZWlnaHQ9JzEwMCcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48ZmlsdGVyIGlkPSdiJyB4PScwJyB5PScwJz48ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPScxMicvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnIGZpbGw9JyMyMjInIGZpbHRlcj0ndXJsKCNiKScvPjwvc3ZnPg==";

// ==============================================================================================================
function isVideo(src) {
  return src.endsWith(".mp4") || src.endsWith(".webm") || src.endsWith(".ogg");
}

// ==============================================================================================================
function ProjectLinks({ links, mobile = false }) {
  if (!links) return null;

  return (
    <div className={mobile ? "flex justify-center gap-4" : "flex justify-center gap-4 ml-4 mb-1"}>
      {links.map((link) => {
        const isWebsite = link.title.toLowerCase() === "website";
        const isGithub = link.title.toLowerCase() === "github";

        return (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={
              mobile
                ? "flex items-center justify-center gap-2 px-4 w-28 py-2 bg-white/5 rounded-md text-sm text-gray-200 hover:bg-white/10 transition"
                : "flex items-center justify-center gap-2 w-auto text-white hover:text-white/70 transition-colors"
            }
          >
            {isWebsite && <Globe size={mobile ? 16 : 20} />}
            {isGithub && <Github size={mobile ? 16 : 20} />}
            {mobile && link.title}
          </a>
        );
      })}
    </div>
  );
}

// ==============================================================================================================
function MobileCarousel({ project, index, setIndex }) {
  const nextImage = () => {
    setIndex((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = () => {
    setIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  return (
    <div className="relative w-full h-56 overflow-hidden rounded-lg my-8 border border-white/20 bg-black/40">
      <div
        className="flex h-full transition-transform duration-500"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {project.images.map((img) => (
          <div key={img} className="min-w-full h-full relative">
            {isVideo(img) ? (
              <video
                key={img}
                src={img}
                muted
                playsInline
                preload="metadata"
                controls
                className="object-cover w-full h-full"
              />
            ) : (
              <Image
                src={img}
                alt={project.title}
                fill
                placeholder="blur"
                blurDataURL={blurDataURL}
                className="object-cover"
              />
            )}
          </div>
        ))}
      </div>

      {project.images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 p-2 pb-[0.65rem] rounded-full text-white"
          >
            ❮
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 p-2 pb-[0.65rem] rounded-full text-white"
          >
            ❯
          </button>
        </>
      )}

      <div className="absolute bottom-2 w-full flex justify-center gap-2">
        {project.images.map((img, i) => (
          <div
            key={img}
            onClick={() => setIndex(i)}
            className={`w-2 h-2 rounded-full cursor-pointer transition 
                  ${i === index ? "bg-white" : "bg-white/40"}`}
          />
        ))}
      </div>
    </div>
  );
}

// ==============================================================================================================
function MobileTechStack({ techStack }) {
  if (!techStack) return null;

  return (
    <div className="flex flex-row mt-10">
      {techStack.map((item) => (
        <SkillBox
          key={item.name}
          name={item.name}
          image={item.image}
          bgColour={item.bgColour}
          rounded={item.rounded}
        />
      ))}
    </div>
  );
}

// ==============================================================================================================
function ProjectPopUpMobile({ project, onClose }) {
  const [index, setIndex] = useState(0);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-start z-50 p-6">
      <div className="bg-black/90 border border-white/20 rounded-xl p-6 w-full max-w-xl relative shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-5 text-white/70 hover:text-white text-xl"
        >
          ✕
        </button>

        <h2 className="text-center text-2xl font-mono mb-1 tracking-wide">
          {project.title}
        </h2>

        <h2 className="text-center text-sm tracking-wide mb-4 mt-3">
          {project.subtitle}
        </h2>

        <ProjectLinks links={project.links} mobile />

        <MobileCarousel project={project} index={index} setIndex={setIndex} />

        <h2 className="text-center text-md font-bold tracking-wide">
          {project.header}
        </h2>

        <p className="text-gray-300 text-sm leading-relaxed mt-2 mx-4 text-justify">
          {project.description}
        </p>

        <MobileTechStack techStack={project.techStack} />
      </div>
    </div>
  );
}

// ==============================================================================================================
function DesktopMainMedia({ project, active }) {
  const activeImage = project.images[active];

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden bg-black border border-white/20">
      {isVideo(activeImage) ? (
        <video
          key={activeImage}
          src={activeImage}
          autoPlay
          loop
          playsInline
          controls
          className="absolute inset-0 w-full h-full object-contain"
        />
      ) : (
        <Image
          src={activeImage}
          alt={project.title}
          fill
          className="object-cover"
          placeholder="blur"
          blurDataURL={blurDataURL}
        />
      )}
    </div>
  );
}

// ==============================================================================================================
function DesktopThumbnails({ images, active, setActive }) {
  if (images.length <= 1) return null;

  return (
    <div className="flex flex-row justify-between gap-4 w-full h-24 mt-4">
      {images.map((img, i) => (
        <div
          key={img}
          onClick={() => setActive(i)}
          className={`relative w-full h-24 rounded-lg overflow-hidden border cursor-pointer ${
            active === i ? "border-white" : "border-white/20"
          }`}
        >
          {isVideo(img) ? (
            <video
              src={img}
              muted
              preload="metadata"
              className="object-cover w-full h-full pointer-events-none"
            />
          ) : (
            <Image
              src={img}
              alt=""
              fill
              className="object-cover"
              placeholder="blur"
              blurDataURL={blurDataURL}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ==============================================================================================================
function DesktopMediaColumn({ project, active, setActive }) {
  return (
    <div className="flex flex-col w-[60%]">
      <DesktopMainMedia project={project} active={active} />
      <DesktopThumbnails
        images={project.images}
        active={active}
        setActive={setActive}
      />
    </div>
  );
}

// ==============================================================================================================
function DesktopHeader({ project }) {
  return (
    <div className="flex flex-col justify-start">
      <div className="flex flex-row">
        <h1 className="text-4xl font-mono text-white mb-2">{project.title}</h1>
        <ProjectLinks links={project.links} />
      </div>

      <h2 className="text-lg italic text-gray-300 mb-6">
        {project.subtitle}
      </h2>
    </div>
  );
}

// ==============================================================================================================
function DesktopTechStack({ techStack, hoveredSkill, setHoveredSkill }) {
  if (!techStack) return null;

  return (
    <div className="flex flex-row w-full flex-nowrap">
      {techStack.map((item, idx) => (
        <div
          key={item.name}
          className={`relative transition-all duration-300 ease-in-out ${hoveredSkill === idx ? "flex-[2] z-10" : "flex-[1] z-0"}`}
          onMouseEnter={() => setHoveredSkill(idx)}
          onMouseLeave={() => setHoveredSkill(null)}
        >
          <SkillBox
            name={item.name}
            image={item.image}
            bgColour={item.bgColour}
            rounded={item.rounded}
          />
        </div>
      ))}
    </div>
  );
}

// ==============================================================================================================
function DesktopContentColumn({ project, hoveredSkill, setHoveredSkill }) {
  return (
    <div className="flex flex-col justify-between w-[40%]">
      <DesktopHeader project={project} />

      <p className="text-gray-300 text-md leading-relaxed mb-10 whitespace-pre-line">
        {project.description}
      </p>

      <DesktopTechStack
        techStack={project.techStack}
        hoveredSkill={hoveredSkill}
        setHoveredSkill={setHoveredSkill}
      />
    </div>
  );
}

// ==============================================================================================================
function ProjectPopUpDesktop({ project, onClose }) {
  const [active, setActive] = useState(0);
  const [closing, setClosing] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const handleClose = useCallback(() => {
    setClosing(true);

    setTimeout(() => {
      onClose();
    }, 250);
  }, [onClose]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleClose]);

  return (
    <div
      className={`fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-6 ${
        closing ? "popup-out" : "popup-in"
      }`}
    >
      <div
        className={`relative flex flex-row max-w-6xl w-full bg-black/90 border border-white/20 rounded-xl p-10 gap-10 ${
          closing ? "scale-out" : "scale-in"
        }`}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-5 text-white/70 hover:text-white text-xl"
        >
          ✕
        </button>

        <DesktopMediaColumn
          project={project}
          active={active}
          setActive={setActive}
        />

        <DesktopContentColumn
          project={project}
          hoveredSkill={hoveredSkill}
          setHoveredSkill={setHoveredSkill}
        />
      </div>
    </div>
  );
}

// ==============================================================================================================
export function ProjectPopUpContainer({ project, onClose }) {
  return (
    <>
      <div className="hidden md:flex">
        <ProjectPopUpDesktop project={project} onClose={onClose} />
      </div>

      <div className="md:hidden">
        <ProjectPopUpMobile project={project} onClose={onClose} />
      </div>
    </>
  );
}
