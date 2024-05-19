"use client"
import React from 'react';
import SkillBox from './SkillBox';
import { useInView } from "react-intersection-observer";

const SkillsSection = () => {
  const { ref, inView} = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section ref={ref} className={`relative -top-12 ${inView ? 'section-visible' : 'section-hidden'}`}>
      <p className="text-5xl md:text-7xl font-bold text-center mb-16 md:mb-20">My Skills</p>
      <div className="flex flex-row justify-center items-center w-9/12 md:w-8/12 md:border-l-4 md:border-r-4 rounded-md md:px-24">
        <div className="flex flex-col justify-center items-center text-left w-full">
          <p className="text-xl md:text-2xl font-bold w-full mb-6 text-center md:text-left">LANGUAGES</p>
          <div className="flex flex-row flex-nowrap content-center h-auto w-full mb-12 md:px-8">
            <SkillBox skillName="Python" skillImage="/python-logo.png" bgColour="bg-[#8a650c]" rounded="1" />
            <SkillBox skillName="Java" skillImage="/java-logo.png" bgColour="bg-[#a78214]" rounded="0" />
            <SkillBox skillName="JavaScript" skillImage="/javascript-logo.png" bgColour="bg-[#b69219]" rounded="0" />
            <SkillBox skillName="HTML" skillImage="/html-logo.png" bgColour="bg-[#c5a21e]" rounded="0" />
            <SkillBox skillName="CSS" skillImage="/css-logo.png" bgColour="bg-[#d3b022]" rounded="0" />
            <SkillBox skillName="TypeScript" skillImage="/typescript-logo.png" bgColour="bg-[#e1bf26]" rounded="0" />
            <SkillBox skillName="C" skillImage="/c-logo.png" bgColour="bg-[#efcd2b]" rounded="0" />
            <SkillBox skillName="Assembly" skillImage="/assembly-logo.png" bgColour="bg-[#ffde30]" rounded="2" />
          </div>

          <p className="text-xl md:text-2xl font-bold w-full mb-6 text-center md:text-left">LIBRARIES AND FRAMEWORKS</p>
          <div className="flex flex-row flex-nowrap content-center h-auto w-full mb-12 md:px-8">
            <SkillBox skillName="React" skillImage="/react-logo.png" bgColour="bg-[#0b2870]" rounded="1" />
            <SkillBox skillName="Tailwind" skillImage="/tailwind-logo.png" bgColour="bg-[#13308f]" rounded="0" />
            <SkillBox skillName="Swing" skillImage="/swing-logo.png" bgColour="bg-[#1b38ad]" rounded="0" />
            <SkillBox skillName="NextJS" skillImage="/nextjs-logo.png" bgColour="bg-[#223fc8]" rounded="0" />
            <SkillBox skillName="NumPy" skillImage="/numpy-logo.png" bgColour="bg-[#2947e5]" rounded="0" />
            <SkillBox skillName="Express" skillImage="/express-logo.png" bgColour="bg-[#304eff]" rounded="2" />
          </div>

          <p className="text-xl md:text-2xl font-bold w-full mb-6 text-center md:text-left">OTHER TOOLS</p>
          <div className="flex flex-row flex-nowrap content-center h-auto w-full mb-4 md:px-8">
            <SkillBox skillName="Photoshop" skillImage="/photoshop-logo.png" bgColour="bg-[#630909]" rounded="1" />
            <SkillBox skillName="Bash" skillImage="/bash-logo.png" bgColour="bg-[#811607]" rounded="0" />
            <SkillBox skillName="Git" skillImage="/git-logo.png" bgColour="bg-[#a12405]" rounded="0" />
            <SkillBox skillName="MongoDB" skillImage="/mongoDB-logo.png" bgColour="bg-[#c03103]" rounded="0" />
            <SkillBox skillName="MySQL" skillImage="/mysql-logo.png" bgColour="bg-[#db3c02]" rounded="2" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
