"use client";

import React, { useState } from 'react';
import Contact from '../../components/Footer';
import Image from 'next/image';
import { Eye, Github } from "lucide-react";
import { ProjectPopUpContainer } from '@/app/projects/ProjectPopup';

const FeaturedProject = ({ onProjectClick }) => {
  return (
    <section className="flex flex-col md:flex-row justify-center items-center w-full mt-32 md:mt-44 px-8 md:px-0">
      <div className="flex flex-col justify-center items-start md:mr-9 flex-1 basis-1/2">
        <p className="w-full mb-2 italic font-light text-gray-300 fade-up-first">
          Featured Project
        </p>
        <p className="w-full text-4xl font-mono mb-8 fade-up-first">
          IDEA Mixed Reality Room Planner
        </p>
        <div className="flex flex-row justify-between items-start w-full mb-8">
          <p className="text-justify fade-up-first">
            Mixed reality app that lets users to visualize and 
            plan out their living spaces with life-sized 3D furniture models, 
            in real time.
          </p>
        </div>

        <div className="w-full flex-row flex gap-4 mb-12 md:mb-0">
          <button className="border border-white/20 fade-up-first flex items-center justify-center gap-2 w-32 bg-black/40 rounded-lg px-2 py-2 text-center text-white hover:bg-black/20 transition"
            onClick={() =>
              onProjectClick({
                title: "IDEA Room Planner",
                subtitle: "Mixed Reality Application",
                links: [
                  { title: "GitHub ", url: "https://github.com/alejandrocqvd/IDEA-MR-Room-Planner" },
                ],
                images: [
                  "/work/idea-mr-room-planner-demo.mp4",
                  "/work/idea-mr-room-planner-img-2.jpg",
                  "/work/idea-mr-room-planner-img-3.jpg",
                  "/work/idea-mr-room-planner-img-4.jpg",
                ],
                header: "What is it?",
                description: `Developed a mixed reality app that allows users to visualize and plan out their living spaces with life-sized 3D furniture models, in real time. 
                
                The app features hand tracking, giving users the freedom to grab, move, and arrange over 100+ pieces of distinct furniture pieces as they would naturally.

                  I've always been hugely interested in VR and MR, and once I got my hands on a Quest 3, I knew I had to do something with it (aside from playing games on it).
                  `,
                techStack: [
                  { name: "C#", image: "/skills/cs-logo.png", bgColour: "bg-[#2A2A2A]", rounded: 1 },
                  { name: "Meta XR SDK", image: "/skills/meta-xr-sdk-logo.png", bgColour: "bg-[#373737]", rounded: 0 },
                  { name: "Unity", image: "/skills/unity-logo.png", bgColour: "bg-[#454545]", rounded: 2 }
                ]
              })
            }>
            <Eye size={18} />
            See More
          </button>
          <button
            onClick={() =>
              window.open(
                "https://github.com/alejandrocqvd/IDEA-MR-Room-Planner",
                "_blank"
              )
            }
            className="border border-white/20 fade-up-first flex items-center justify-center gap-2 w-32 bg-black/40 rounded-lg px-2 py-2 text-center text-white hover:bg-black/20 transition"
          >
            <Github size={18} />
            GitHub
          </button>
        </div>
      </div>

      <div className="flex-1 basis-1/2 md:ml-9 w-[120%] mdLw-full border-y-2 fade-up-first border border-white/20 rounded-md">
        <video
          src="/work/idea-mr-room-planner-demo.mp4"
          className="object-cover h-96 w-full rounded-md"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
    </section>
  );
};

// =========================================================================================
const SmallCard = ({ title, subtitle, img, onClick, side, fade = "" }) => {
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
          className={`object-cover rounded-md transition-transform duration-300 group-hover:scale-110 ${side === 'left' ? 'rounded-l-none' : side === 'right' ? 'rounded-r-none' : ''}`}
        />
      </div>

      <div className="flex flex-col justify-center items-center md:items-start px-4 md:px-6 md:pb-1 bg-black/30 h-[50%] md:h-[45%]">
        <p className="font-mono text-lg md:mb-1 text-center md:text-left">{title}</p>

        <p className="hidden md:flex text-xs text-gray-400 transition-opacity duration-300 group-hover:opacity-0">
          {subtitle}
        </p>
        <p className="hidden md:block absolute text-xs mt-8 text-gray-400 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
          See more →
        </p>
      </div>
    </div>
  );
};

// =========================================================================================
const LargeCard = ({ title, subtitle, img, onClick, side, fade = "" }) => {
  return (
    <div 
      onClick={onClick} 
      className={`border border-white/20 group flex flex-col rounded-md h-96 w-full overflow-hidden cursor-pointer ${fade}
        ${side === 'left' ? 'rounded-l-none md:rounded-l-md border-l-0 md:border-l' : 
        side === 'right' ? 'rounded-r-none md:rounded-r-md border-r-0 md:border-r' : ''
        }`}
    >
      <div className="relative w-full h-1/2 md:h-3/4 overflow-hidden">
        <Image
          src={img}
          alt={title}
          fill
          className={`object-cover rounded-md transition-transform duration-500 group-hover:scale-110 ${side === 'left' ? 'rounded-l-none' : side === 'right' ? 'rounded-r-none' : ''}`}
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
};

// =========================================================================================
const ProjectBentoBox = ({ onProjectClick }) => {
  return (
    <section className="w-full flex flex-col justify-center items-center mt-24">
      <div className="w-full flex flex-row gap-8">
        <div className="w-2/3">

          <LargeCard 
            fade="fade-in-1"
            subtitle="Software Development Company" 
            title="Nullus" 
            img="/work/nullus-img.png" 
            side="left"
            onClick={() =>
              onProjectClick({
                title: "Nullus",
                subtitle: "Software Development Company",
                links: [
                  { title: "Website", url: "https://www.nullus.ca/" },
                ],
                images: [
                  "/work/nullus-img.png",
                  "/work/nullus-img-2.png",
                  "/work/nullus-img-3.png",
                ],
                header: "What is Nullus?",
                description: `I co-founded Nullus, a software development company focused on empowering individuals, clubs, and businesses with innovative web solutions, while providing students valuable experience in a collaborative team environment.

                  We've served over 6+ clients and have been recognized as being one of the top website development companies in Calgary, by DesignRush.com. 
                  `,
                techStack: [
                  { name: "React", image: "/skills/react-logo.png", bgColour: "bg-[#101010]", rounded: 1 },
                  { name: "NextJS", image: "/skills/nextjs-logo.png", bgColour: "bg-[#191919]", rounded: 0 },
                  { name: "TypeScript", image: "/skills/typescript-logo.png", bgColour: "bg-[#242424]", rounded: 0 },
                  { name: "Tailwind", image: "/skills/tailwind-logo.png", bgColour: "bg-[#2F2F2F]", rounded: 0 },
                  { name: "MySQL", image: "/skills/mysql-logo.png", bgColour: "bg-[#3A3A3A]", rounded: 0 },
                  { name: "Jira", image: "/skills/jira-logo.png", bgColour: "bg-[#454545]", rounded: 0 },
                  { name: "Figma", image: "/skills/figma-logo.png", bgColour: "bg-[#505050]", rounded: 2}
                ]
              })
            }
          />
        </div>        
        <div className="flex flex-col justify-between w-1/3 gap-8">

          <SmallCard  
          fade="fade-in-2"
            subtitle="Cross-Platform 311 App" 
            title="Urban Signal" 
            img="/work/urban-signal-img.png" 
            side="right"
            onClick={() =>
              onProjectClick({
                title: "Urban Signal",
                subtitle: "Cross-Platform 311 App",
                links: [
                  { title: "GitHub", url: "https://github.com/alejandrocqvd/hack-the-change-2025-mobile" },
                ],
                images: [
                  "/work/urban-signal-demo.mp4",
                  "/work/urban-signal-img-2.png",
                  "/work/urban-signal-img.png",
                  "/work/urban-signal-img-3.png"
                ],
                header: "What is Urban Signal?",
                description: `For HackTheChange 2025, our team developed Urban Signal, a cross-platform application designed to streamline the reporting of 311 related issues in the city of Calgary. 
                
                Users can snap a photo on the mobile app, and with automatic location tagging and status tracking, they can easily report issues like potholes or graffiti. City workers can then efficiently manage and resolve these reports through the web dashboard that visualizes reports through heat maps, live issue feeds, and AI driven queries to prioritize neglected communities.
                `,
                techStack: [
                  { name: "Expo", image: "/skills/expo-logo.png", bgColour: "bg-[#0D0D0D]", rounded: 1 },
                  { name: "NextJS", image: "/skills/nextjs-logo.png", bgColour: "bg-[#101010]", rounded: 0 },
                  { name: "TypeScript", image: "/skills/typescript-logo.png", bgColour: "bg-[#131313]", rounded: 0 },
                  { name: "Tailwind", image: "/skills/tailwind-logo.png", bgColour: "bg-[#181818]", rounded: 0 },
                  { name: "PostgreSQL", image: "/skills/postgre-logo.png", bgColour: "bg-[#282828]", rounded: 0 },
                  { name: "SupaBase", image: "/skills/supabase-logo.png", bgColour: "bg-[#363636]", rounded: 2 },
                ]
              })
            }
          />

          <SmallCard 
            fade="fade-in-3"
            subtitle="Educational Game Website" 
            title="Malware Terminal" 
            img="/work/malware-terminal-img.PNG" 
            side="right"
            onClick={() =>
              onProjectClick({
                title: "Malware Terminal",
                subtitle: "Educational Cybersecurity Game",
                links: [
                  { title: "GitHub", url: "https://github.com/your-username/malware-terminal" },
                  { title: "Website", url: "https://alejandrocqvd.github.io/CPSC-329-Terminal/" },
                ],
                images: [
                  "/work/malware-terminal-img.PNG",
                  "/work/malware-terminal-img-2.png",
                  "/work/malware-terminal-img-3.png"
                ],
                header: "What is Malware Terminal?",
                description: `For my cybersecurity class, I came up with an idea for my group to design and develop an interactive terminal-like website to educate those interested in everything there is about malware.
                
                The main purpose of the site was education, but if the users are brave enough, they can download a suspicious package on the terminal and see how it affects their system.`,
                techStack: [
                  { name: "HTML", image: "/skills/html-logo.png", bgColour: "bg-[#191919]", rounded: 1 },
                  { name: "CSS", image: "/skills/css-logo.png", bgColour: "bg-[#242424]", rounded: 0 },
                  { name: "JavaScript", image: "/skills/javascript-logo.png", bgColour: "bg-[#2F2F2F]", rounded: 2 },
                ]
              })
            }
          />
        </div>
      </div>

      <div className="w-full flex flex-row gap-8 mt-8">
        <div className="flex flex-col justify-between w-1/3 gap-8">

          <SmallCard 
            subtitle="Full-Stack Web App" 
            title="DinoDB" 
            img="/work/dinodb-img.PNG" 
            side="left"
            fade="fade-in-4"
            onClick={() =>
              onProjectClick({
                title: "DinoDB",
                subtitle: "Full-Stack Database Web App",
                links: [
                  { title: "GitHub", url: "https://github.com/e-woo/dinodb" },
                ],
                images: [
                  "/work/dinodb-demo.mp4",
                  "/work/dinodb-img.PNG",
                  "/work/dinodb-img-2.png",
                  "/work/dinodb-img-3.png"
                ],
                header: "What is DinoDB?",
                description: `For my DBMS class, we were tasked with planning out, designing, and developing a web application. Although PHP was recommended for the frontend, but we wanted to broaden our skills by utilizing modern web technologies. 
                
                Our project goals included learning React, TypeScript, and TailwindCSS to create a dynamic and responsive user interface. After we were done with our project and presented it to our TA, they told us that it was the best project they had reviewed for this term.
                `,
                techStack: [
                  { name: "React", image: "/skills/react-logo.png", bgColour: "bg-[#151515]", rounded: 1 },
                  { name: "TypeScript", image: "/skills/typescript-logo.png", bgColour: "bg-[#1E1E1E]", rounded: 0 },
                  { name: "Tailwind", image: "/skills/tailwind-logo.png", bgColour: "bg-[#272727]", rounded: 0 },
                  { name: "Node.js", image: "/skills/node.js-logo.png", bgColour: "bg-[#2F2F2F]", rounded: 0 },
                  { name: "MySQL", image: "/skills/mysql-logo.png", bgColour: "bg-[#363636]", rounded: 2 },
                ]
              })
            }
          />

          <SmallCard 
            subtitle="Interactive Website" 
            title="Sorting Visualizer" 
            img="/work/sorting-visualizer-img.PNG" 
            side="left"
            fade="fade-in-5"
            onClick={() =>
              onProjectClick({
                title: "Sorting Visualizer",
                subtitle: "Interactive Algorithm Visualizer",
                links: [
                  { title: "GitHub", url: "https://github.com/alejandrocqvd/Sorting-Algorithm-Visualizer" },
                  { title: "Website", url: "https://alejandrocqvd.github.io/Sorting-Algorithm-Visualizer/" },
                ],
                images: [
                  "/work/sorting-visualizer-img.PNG",
                ],
                header: "What is Sorting Visualizer?",
                description: `The goal of designing the visualizer was to learn each sorting algorithm in depth and solidify JavaScript skills by developing an interactive web app where users can see the process of each sorting algorithm, step-by-step. 
                
                Includes algorithms from bubble-sort to quick-sort, and of course, bogo-sort.`,
                techStack: [
                  { name: "HTML", image: "/skills/html-logo.png", bgColour: "bg-[#151515]", rounded: 1 },
                  { name: "CSS", image: "/skills/css-logo.png", bgColour: "bg-[#1E1E1E]", rounded: 0 },
                  { name: "JavaScript", image: "/skills/javascript-logo.png", bgColour: "bg-[#272727]", rounded: 2 },
                ]
              })
            }
          />

        </div>
        <div className="w-2/3">
          <LargeCard 
            subtitle="Social Media Web App" 
            title="MiHistoria" 
            img="/work/mihistoria-img.PNG" 
            side="right"
            fade="fade-in-6"
            onClick={() =>
              onProjectClick({
                title: "MiHistoria",
                subtitle: "Social Media Web App",
                links: [
                  { title: "GitHub", url: "https://github.com/alejandrocqvd/MiHistoria" },
                  { title: "Website", url: "https://mihistoria.vercel.app/" },
                ],
                images: [
                  "/work/mihistoria-demo.mp4",
                  "/work/mihistoria-img-2.png",
                  "/work/mihistoria-img-3.png",
                  "/work/mihistoria-img-4.png",
                  "/work/mihistoria-img-5.png"
                ],
                header: "What is MiHistoria?",
                description: `MiHistoria is a social media web application where each user is given one chance to share their entire life story in a single post. Here, users can use TinyMCE's rich text editor to write and format their stories.
                
                After DinoDB, I focused on sharpening my modern web dev skills by building RESTful APIs for full server-client interaction, including CRUD, authentication, and data handling.`,
                techStack: [
                  { name: "React", image: "/skills/react-logo.png", bgColour: "bg-[#101010]", rounded: 1 },
                  { name: "Vite", image: "/skills/vite-logo.png", bgColour: "bg-[#1A1A1A]", rounded: 0 },
                  { name: "TypeScript", image: "/skills/typescript-logo.png", bgColour: "bg-[#282828]", rounded: 0 },
                  { name: "Tailwind", image: "/skills/tailwind-logo.png", bgColour: "bg-[#333333]", rounded: 0 },
                  { name: "Node.js", image: "/skills/node.js-logo.png", bgColour: "bg-[#3D3D3D]", rounded: 0 },
                  { name: "MySQL", image: "/skills/mysql-logo.png", bgColour: "bg-[#454545]", rounded: 2 },
                ]
              })
            }
          />
        </div>        
      </div>
    </section>
  );
};

// =========================================================================================
const ProjectPage = () => {
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
      <Contact />
    </div>
  )
}

export default ProjectPage;
