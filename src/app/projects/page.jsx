import React from 'react';
import Navbar from '../../components/Navbar';
import Contact from '../../components/Contact';
import Image from 'next/image';
import { Eye, Github } from "lucide-react";

const FeaturedProject = () => {
  return (
    <section className="flex flex-col md:flex-row justify-center items-center w-full mt-32 md:mt-44 px-8 md:px-0">
      <div className="flex flex-col justify-center items-start md:mr-9 flex-1 basis-1/2">
        <p className="w-full mb-2 italic font-light text-gray-300 fade-up-normal">
          Featured Project
        </p>
        <p className="w-full text-4xl font-mono mb-8 fade-up-normal">
          IDEA Mixed Reality Room Planner
        </p>
        <div className="flex flex-row justify-between items-start w-full mb-8">
          <p className="text-justify fade-up-normal">
            Mixed reality app that lets users to visualize and 
            plan out their living spaces with life-sized 3D furniture models, 
            in real time.
          </p>
        </div>

        <div className="w-full flex-row flex gap-4 mb-12 md:mb-0">
          <button className="fade-up-slow flex items-center justify-center gap-2 w-32 bg-black/30 rounded-lg px-2 py-2 text-center text-white hover:bg-black/20 transition">
            <Eye size={18} />
            See More
          </button>
          <button className="fade-up-slower flex items-center justify-center gap-2 w-32 bg-black/30 rounded-lg px-2 py-2 text-center text-white hover:bg-black/20 transition">
            <Github size={18} />
            GitHub
          </button>
        </div>
      </div>

      <div className="flex-1 basis-1/2 md:ml-9 w-full">
        <video
          src="/misc/IDEA_MR_Room_Planner_Demo.mp4"
          className="object-cover h-96 w-full rounded-md fade-up-slow"
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
const SmallCard = ({ title, subtitle, img }) => {
  return (
    <div className="group flex flex-col rounded-md h-44 w-full overflow-hidden cursor-pointer">
      <div className="relative w-full h-[55%] overflow-hidden">
        <Image
          src={img}
          alt={title}
          fill
          className="object-cover rounded-md transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      <div className="flex flex-col justify-center items-start px-12 pb-1 bg-black/30 h-[45%]">
        <p className="font-mono text-lg mb-1">{title}</p>

        <p className="text-xs text-gray-400 transition-opacity duration-300 group-hover:opacity-0">
          {subtitle}
        </p>
        <p className="absolute text-xs mt-8 text-gray-400 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
          See more →
        </p>
      </div>
    </div>
  );
};

// =========================================================================================
const LargeCard = ({ title, subtitle, img }) => {
  return (
    <div className="group flex flex-col rounded-md h-96 w-full overflow-hidden cursor-pointer">
      <div className="relative w-full h-3/4 overflow-hidden">
        <Image
          src={img}
          alt={title}
          fill
          className="object-cover rounded-md transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <div className="flex flex-col justify-center items-start px-12 bg-black/30 h-1/3">
        <p className="font-mono text-2xl mb-1">{title}</p>
        
        <p className="text-sm text-gray-400 transition-opacity duration-300 group-hover:opacity-0">
          {subtitle}
        </p>
        <p className="absolute text-sm mt-9 text-gray-400 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
          See more →
        </p>
      </div>
    </div>
  );
};

// =========================================================================================
const ProjectBentoBox = () => {
  return (
    <section className="w-full flex flex-col justify-center items-center mt-24">
      <div className="w-full flex flex-row gap-8">
        <div className="w-2/3">
          <LargeCard subtitle="Software Development Company" title="Nullus" img="/work/nullus-img.png" />
        </div>        
        <div className="flex flex-col justify-between w-1/3 gap-8">
          <SmallCard subtitle="Cross-Platform 311 App" title="Urban Signal" img="/work/urban-signal-img.png" />
          <SmallCard subtitle="Educational Game Website" title="Malware Terminal" img="/work/malware-terminal-img.PNG" />
        </div>
      </div>

      <div className="w-full flex flex-row gap-8 mt-8">
        <div className="flex flex-col justify-between w-1/3 gap-8">
          <SmallCard subtitle="Full-Stack Web App" title="DinoDB" img="/work/dinodb-img.PNG" />
          <SmallCard subtitle="Interactive Website" title="Sorting Visualizer" img="/work/sorting-visualizer-img.PNG" />
        </div>
        <div className="w-2/3">
          <LargeCard subtitle="Social Media Web App" title="MiHistoria" img="/work/mihistoria-img.PNG" />
        </div>        
      </div>
    </section>
  );
};

// =========================================================================================
const ProjectPopUp = () => {
  <div>
    
  </div>
}

// =========================================================================================
const ProjectPage = () => {
  return (
    <div className="flex flex-col justify-center items-center max-w-4xl mx-auto">
      <Navbar />
      <FeaturedProject />
      <ProjectBentoBox />
      <ProjectPopUp />
      <Contact />
    </div>
  )
}

export default ProjectPage;
