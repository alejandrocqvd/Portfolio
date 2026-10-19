"use client";

import React, { useState } from "react";
import Image from "next/image";
import Footer from "@/components/Footer";
import { Eye, Github } from "lucide-react";
import { ProjectPopUpContainer } from "@/app/projects/ProjectPopup";
import {
  featuredProject,
  projects,
  projectCards,
} from "@/app/projects/catalogue";

// ==============================================================================================================
function FeaturedProject({ onProjectClick }) {
  return (
    <section className="flex flex-col md:flex-row justify-center items-center w-full mt-32 md:mt-44 px-8 md:px-0">
      <FeaturedProjectContent onProjectClick={onProjectClick} />
      <FeaturedProjectVideo />
    </section>
  );
}

// ==============================================================================================================
function FeaturedProjectContent({ onProjectClick }) {
  return (
    <div className="flex flex-col justify-center items-start md:mr-9 flex-1 basis-1/2">
      <p className="w-full mb-2 italic font-light text-gray-300 fade-up-first">
        Featured Project
      </p>

      <p className="w-full text-4xl font-mono mb-8 fade-up-first">
        {featuredProject.title}
      </p>

      <div className="flex flex-row justify-between items-start w-full mb-8">
        <p className="text-justify fade-up-first">{featuredProject.blurb}</p>
      </div>

      <FeaturedProjectActions onProjectClick={onProjectClick} />
    </div>
  );
}

// ==============================================================================================================
function FeaturedProjectActions({ onProjectClick }) {
  const github = featuredProject.links.find((link) => link.title === "GitHub");

  return (
    <div className="w-full flex-row flex gap-4 mb-12 md:mb-0">
      <button
        className="border border-white/20 fade-up-first flex items-center justify-center gap-2 w-32 bg-black/40 rounded-lg px-2 py-2 text-center text-white hover:bg-black/20 transition"
        onClick={() => onProjectClick(featuredProject)}
      >
        <Eye size={18} />
        See More
      </button>

      <button
        onClick={() => window.open(github.url, "_blank")}
        className="border border-white/20 fade-up-first flex items-center justify-center gap-2 w-32 bg-black/40 rounded-lg px-2 py-2 text-center text-white hover:bg-black/20 transition"
      >
        <Github size={18} />
        GitHub
      </button>
    </div>
  );
}

// ==============================================================================================================
function FeaturedProjectVideo() {
  return (
    <div className="flex-1 basis-1/2 md:ml-9 w-[120%] mdLw-full border-y-2 fade-up-first border border-white/20 rounded-md">
      <video
        src={featuredProject.images[0]}
        className="object-cover h-96 w-full rounded-md"
        autoPlay
        loop
        muted
        playsInline
      />
    </div>
  );
}

// ==============================================================================================================
function SmallCard({ title, subtitle, img, onClick, side, fade = "" }) {
  const sideClasses =
    side === "left"
      ? "rounded-l-none rounded-r-md md:rounded-l-md md:rounded-r-md border-l-0 md:border-l"
      : side === "right"
        ? "rounded-r-none rounded-l-md md:rounded-r-md md:rounded-l-md border-r-0 md:border-r"
        : "rounded-md";

  return (
    <div
      onClick={onClick}
      className={`border border-white/20 group flex flex-col h-44 w-full overflow-hidden cursor-pointer ${fade} ${sideClasses}`}
    >
      <div className="relative w-full h-[50%] md:h-[55%] overflow-hidden">
        <Image
          src={img}
          alt={title}
          fill
          className={`object-cover rounded-md transition-transform duration-300 group-hover:scale-110 ${side === "left" ? "rounded-l-none" : side === "right" ? "rounded-r-none" : ""}`}
        />
      </div>

      <div className="flex flex-col justify-center items-center md:items-start px-4 md:px-6 md:pb-1 bg-black/30 h-[50%] md:h-[45%]">
        <p className="font-mono text-lg md:mb-1 text-center md:text-left">
          {title}
        </p>

        <p className="hidden md:flex text-xs text-gray-400 transition-opacity duration-300 group-hover:opacity-0">
          {subtitle}
        </p>

        <p className="hidden md:block absolute text-xs mt-8 text-gray-400 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
          See more →
        </p>
      </div>
    </div>
  );
}

// ==============================================================================================================
function LargeCard({ title, subtitle, img, onClick, side, fade = "" }) {
  return (
    <div
      onClick={onClick}
      className={`border border-white/20 group flex flex-col rounded-md h-96 w-full overflow-hidden cursor-pointer ${fade}
        ${
          side === "left"
            ? "rounded-l-none md:rounded-l-md border-l-0 md:border-l"
            : side === "right"
              ? "rounded-r-none md:rounded-r-md border-r-0 md:border-r"
              : ""
        }`}
    >
      <div className="relative w-full h-1/2 md:h-3/4 overflow-hidden">
        <Image
          src={img}
          alt={title}
          fill
          className={`object-cover rounded-md transition-transform duration-500 group-hover:scale-110 ${side === "left" ? "rounded-l-none" : side === "right" ? "rounded-r-none" : ""}`}
        />
      </div>

      <div className="flex flex-col justify-center items-start px-12 bg-black/30 h-1/2 md:h-1/3">
        <p className="font-mono text-2xl mb-2 md:mb-1">{title}</p>

        <p className="text-sm text-gray-400 transition-opacity duration-300 group-hover:opacity-0">
          {subtitle}
        </p>

        <p className="absolute text-sm mt-9 text-gray-400 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
          See more →
        </p>

        <p className="relative md:hidden text-sm mt-6 text-gray-400">
          See more →
        </p>
      </div>
    </div>
  );
}

// ==============================================================================================================
function cardProps(card, onProjectClick) {
  const project = projects[card.id];

  return {
    title: project.title,
    subtitle: project.subtitle,
    img: project.thumbnail,
    side: card.side,
    fade: card.fade,
    onClick: () => onProjectClick(project),
  };
}

// ==============================================================================================================
function ProjectBentoBox({ onProjectClick }) {
  return (
    <section className="w-full flex flex-col justify-center items-center mt-24">
      <ProjectBentoTopRow onProjectClick={onProjectClick} />
      <ProjectBentoBottomRow onProjectClick={onProjectClick} />
    </section>
  );
}

// ==============================================================================================================
function ProjectBentoTopRow({ onProjectClick }) {
  return (
    <div className="w-full flex flex-row gap-8">
      <div className="w-2/3">
        <LargeCard {...cardProps(projectCards.top.large, onProjectClick)} />
      </div>

      <div className="flex flex-col justify-between w-1/3 gap-8">
        {projectCards.top.small.map((card) => (
          <SmallCard key={card.id} {...cardProps(card, onProjectClick)} />
        ))}
      </div>
    </div>
  );
}

// ==============================================================================================================
function ProjectBentoBottomRow({ onProjectClick }) {
  return (
    <div className="w-full flex flex-row gap-8 mt-8">
      <div className="flex flex-col justify-between w-1/3 gap-8">
        {projectCards.bottom.small.map((card) => (
          <SmallCard key={card.id} {...cardProps(card, onProjectClick)} />
        ))}
      </div>

      <div className="w-2/3">
        <LargeCard {...cardProps(projectCards.bottom.large, onProjectClick)} />
      </div>
    </div>
  );
}

// ==============================================================================================================
export default function ProjectPage() {
  const [activeProject, setActiveProject] = useState(null);

  const openProject = (projectData) => {
    setActiveProject(projectData);
  };

  const closeProject = () => {
    setActiveProject(null);
  };

  return (
    <div className="flex flex-col justify-center items-center max-w-4xl mx-auto">
      <FeaturedProject onProjectClick={openProject} />
      <ProjectBentoBox onProjectClick={openProject} />

      {activeProject && (
        <ProjectPopUpContainer project={activeProject} onClose={closeProject} />
      )}

      <Footer />
    </div>
  );
}
