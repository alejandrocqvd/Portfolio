"use client"
import React from 'react';
import SkillBox from './SkillBox';
import { useInView } from "react-intersection-observer";

const SkillsSection = () => {
  const { ref, inView} = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <section ref={ref} className={inView ? 'section-visible' : 'section-hidden'}>
      <p className="text-7xl font-bold text-center mb-20">My Skills</p>
      <div className="flex flex-row justify-center items-center w-8/12 border-l-4 border-r-4 rounded-md md:px-24">
        <div className="flex flex-col justify-center items-center text-left w-full">
          <p className="text-2xl font-bold w-full mb-6">LANGUAGES</p>
          <div className="flex flex-row flex-nowrap content-center h-auto w-full mb-12 px-8">
            <SkillBox skillName="SQL" skillImage="/sql-logo.png" bgColour="bg-[#07284a]" rounded="1" />
            <SkillBox skillName="C" skillImage="/c-logo.png" bgColour="bg-[#01417d]" rounded="0" />
            <SkillBox skillName="CSS" skillImage="/css-logo.png" bgColour="bg-[#1a3cc4]" rounded="0" />
            <SkillBox skillName="HTML" skillImage="/html-logo.png" bgColour="bg-[#d3441c]" rounded="0" />
            <SkillBox skillName="JS" skillImage="/javascript-logo.png" bgColour="bg-[#c0a72c]" rounded="0" />
            <SkillBox skillName="Java" skillImage="/java-logo.png" bgColour="bg-[#dde1e2]" rounded="0" />
            <SkillBox skillName="Python" skillImage="/python-logo.png" bgColour="bg-[#676869]" rounded="0" />
            <SkillBox skillName="Assembly" skillImage="/assembly-logo.png" bgColour="bg-[#3c3d3d]" rounded="2" />
          </div>

          <p className="text-2xl font-bold w-full mb-6">LIBRARIES AND FRAMEWORKS</p>
          <div className="flex flex-row flex-nowrap content-center h-auto w-full mb-12 px-8">
            <SkillBox skillName="React" skillImage="/react-logo.png" bgColour="bg-[#0c442f]" rounded="1" />
            <SkillBox skillName="Tailwind" skillImage="/tailwind-logo.png" bgColour="bg-[#116344]" rounded="0" />
            <SkillBox skillName="Swing" skillImage="/swing-logo.png" bgColour="bg-[#157c55]" rounded="0" />
            <SkillBox skillName="NextJS" skillImage="/nextjs-logo.png" bgColour="bg-[#199666]" rounded="0" />
            <SkillBox skillName="NumPy" skillImage="/numpy-logo.png" bgColour="bg-[#1daf76]" rounded="0" />
            <SkillBox skillName="Express" skillImage="/express-logo.png" bgColour="bg-[#21c686]" rounded="2" />
          </div>

          <p className="text-2xl font-bold w-full mb-6">OTHER TOOLS</p>
          <div className="flex flex-row flex-nowrap content-center h-auto w-full mb-4 px-8">
            <SkillBox skillName="Photoshop" skillImage="/photoshop-logo.png" bgColour="bg-[#003d5c]" rounded="1" />
            <SkillBox skillName="Bash" skillImage="/bash-logo.png" bgColour="bg-[#004364]" rounded="0" />
            <SkillBox skillName="Git" skillImage="/git-logo.png" bgColour="bg-[#004c72]" rounded="0" />
            <SkillBox skillName="MongoDB" skillImage="/mongodb-logo.png" bgColour="bg-[#005b88]" rounded="0" />
            <SkillBox skillName="MySQL" skillImage="/mysql-logo.png" bgColour="bg-[#006597]" rounded="2" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
