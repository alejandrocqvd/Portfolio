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
      <p className="text-5xl xl:text-7xl font-bold text-center mb-16 xl:mb-20">My Skills</p>
      <div className="flex flex-row justify-center items-center w-9/12 xl:w-8/12 xl:border-l-4 xl:border-r-4 rounded-md xl:px-24">
        <div className="flex flex-col justify-center items-center text-left w-full">
          <p className="text-xl xl:text-2xl font-bold w-full mb-6 text-center xl:text-left">LANGUAGES</p>
          <div className="flex flex-row flex-nowrap content-center h-auto w-full mb-12 xl:px-8">
            <SkillBox skillName="Python" skillImage="/python-logo.png" bgColour="bg-[#8a650c]" rounded="1" />
            <SkillBox skillName="Java" skillImage="/java-logo.png" bgColour="bg-[#987310]" rounded="0" />
            <SkillBox skillName="JavaScript" skillImage="/javascript-logo.png" bgColour="bg-[#a58014]" rounded="0" />
            <SkillBox skillName="HTML" skillImage="/html-logo.png" bgColour="bg-[#b49019]" rounded="0" />
            <SkillBox skillName="CSS" skillImage="/css-logo.png" bgColour="bg-[#c3a01e]" rounded="0" />
            <SkillBox skillName="TypeScript" skillImage="/typescript-logo.png" bgColour="bg-[#d2b023]" rounded="0" />
            <SkillBox skillName="C" skillImage="/c-logo.png" bgColour="bg-[#e0bf27]" rounded="0" />
            <SkillBox skillName="Go" skillImage="/golang-logo.png" bgColour="bg-[#f0cf2c]" rounded="0" />
            <SkillBox skillName="Assembly" skillImage="/assembly-logo.png" bgColour="bg-[#ffde30]" rounded="2" />
          </div>

          <p className="text-xl xl:text-2xl font-bold w-full mb-6 text-center xl:text-left">LIBRARIES AND FRAMEWORKS</p>
          <div className="flex flex-row flex-nowrap content-center h-auto w-full mb-12 xl:px-8">
            <SkillBox skillName="React" skillImage="/react-logo.png" bgColour="bg-[#0b2870]" rounded="1" />
            <SkillBox skillName="Tailwind" skillImage="/tailwind-logo.png" bgColour="bg-[#13308f]" rounded="0" />
            <SkillBox skillName="Swing" skillImage="/swing-logo.png" bgColour="bg-[#1b38ad]" rounded="0" />
            <SkillBox skillName="NextJS" skillImage="/nextjs-logo.png" bgColour="bg-[#223fc8]" rounded="0" />
            <SkillBox skillName="NumPy" skillImage="/numpy-logo.png" bgColour="bg-[#2947e5]" rounded="0" />
            <SkillBox skillName="Express.js" skillImage="/express-logo.png" bgColour="bg-[#304eff]" rounded="0" />
            <SkillBox skillName="Encore" skillImage="/encore-logo.png" bgColour="bg-[#3856ff]" rounded="2" />
          </div>

          <p className="text-xl xl:text-2xl font-bold w-full mb-6 text-center xl:text-left">OTHER TOOLS</p>
          <div className="flex flex-row flex-nowrap content-center h-auto w-full mb-4 xl:px-8">
            <SkillBox skillName="Photoshop" skillImage="/photoshop-logo.png" bgColour="bg-[#630909]" rounded="1" />
            <SkillBox skillName="Bash" skillImage="/bash-logo.png" bgColour="bg-[#761108]" rounded="0" />
            <SkillBox skillName="Git" skillImage="/git-logo.png" bgColour="bg-[#841707]" rounded="0" />
            <SkillBox skillName="MongoDB" skillImage="/mongoDB-logo.png" bgColour="bg-[#992005]" rounded="0" />
            <SkillBox skillName="MySQL" skillImage="/mysql-logo.png" bgColour="bg-[#a92704]" rounded="0" />
            <SkillBox skillName="PostgreSQL" skillImage="/postgre-logo.png" bgColour="bg-[#be3002]" rounded="0" />
            <SkillBox skillName="Supabase" skillImage="/supabase-logo.png" bgColour="bg-[#cf3700]" rounded="2" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
