"use client";
import React from 'react';
import SkillBox from './SkillBox';
import { useInView } from "react-intersection-observer";

const SkillsSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  // Skill data organized into categories
  const skillCategories = [
    {
      title: "LANGUAGES",
      skills: [
        { skillName: "Python", skillImage: "/python-logo.png", bgColour: "bg-[#8a650c]", rounded: "1" },
        { skillName: "Java", skillImage: "/java-logo.png", bgColour: "bg-[#987310]", rounded: "0" },
        { skillName: "JavaScript", skillImage: "/javascript-logo.png", bgColour: "bg-[#a58014]", rounded: "0" },
        { skillName: "HTML", skillImage: "/html-logo.png", bgColour: "bg-[#b49019]", rounded: "0" },
        { skillName: "CSS", skillImage: "/css-logo.png", bgColour: "bg-[#c3a01e]", rounded: "0" },
        { skillName: "TypeScript", skillImage: "/typescript-logo.png", bgColour: "bg-[#d2b023]", rounded: "0" },
        { skillName: "C", skillImage: "/c-logo.png", bgColour: "bg-[#e0bf27]", rounded: "0" },
        { skillName: "Go", skillImage: "/golang-logo.png", bgColour: "bg-[#f0cf2c]", rounded: "0" },
        { skillName: "Assembly", skillImage: "/assembly-logo.png", bgColour: "bg-[#ffde30]", rounded: "2" },
      ],
    },
    {
      title: "LIBRARIES AND FRAMEWORKS",
      skills: [
        { skillName: "React", skillImage: "/react-logo.png", bgColour: "bg-[#0b2870]", rounded: "1" },
        { skillName: "Tailwind", skillImage: "/tailwind-logo.png", bgColour: "bg-[#13308f]", rounded: "0" },
        { skillName: "Swing", skillImage: "/swing-logo.png", bgColour: "bg-[#1b38ad]", rounded: "0" },
        { skillName: "NextJS", skillImage: "/nextjs-logo.png", bgColour: "bg-[#223fc8]", rounded: "0" },
        { skillName: "NumPy", skillImage: "/numpy-logo.png", bgColour: "bg-[#2947e5]", rounded: "0" },
        { skillName: "Express.js", skillImage: "/express-logo.png", bgColour: "bg-[#304eff]", rounded: "0" },
        { skillName: "Encore", skillImage: "/encore-logo.png", bgColour: "bg-[#3856ff]", rounded: "2" },
      ],
    },
    {
      title: "OTHER TOOLS",
      skills: [
        { skillName: "Photoshop", skillImage: "/photoshop-logo.png", bgColour: "bg-[#630909]", rounded: "1" },
        { skillName: "Bash", skillImage: "/bash-logo.png", bgColour: "bg-[#761108]", rounded: "0" },
        { skillName: "Git", skillImage: "/git-logo.png", bgColour: "bg-[#841707]", rounded: "0" },
        { skillName: "MongoDB", skillImage: "/mongoDB-logo.png", bgColour: "bg-[#992005]", rounded: "0" },
        { skillName: "MySQL", skillImage: "/mysql-logo.png", bgColour: "bg-[#a92704]", rounded: "0" },
        { skillName: "PostgreSQL", skillImage: "/postgre-logo.png", bgColour: "bg-[#be3002]", rounded: "0" },
        { skillName: "Supabase", skillImage: "/supabase-logo.png", bgColour: "bg-[#cf3700]", rounded: "2" },
      ],
    },
  ];

  return (
    <section ref={ref} className={`relative -top-12 ${inView ? 'section-visible' : 'section-hidden'}`}>
      <p className="text-5xl xl:text-7xl font-bold text-center mb-16 xl:mb-20">My Skills</p>
      <div className="flex flex-row justify-center items-center w-9/12 xl:w-8/12  rounded-md xl:px-24 max-w-7xl">
        <div className="flex flex-col justify-center items-center text-left w-full">
          {skillCategories.map((category, index) => (
            <div
              key={category.title}
              className={`w-full ${index < skillCategories.length - 1 ? 'mb-12' : 'mb-4'}`}
            >
              <p className="text-xl xl:text-2xl font-bold w-full mb-6 text-center xl:text-left">{category.title}</p>
              <div className="flex flex-row flex-nowrap content-center h-auto w-full xl:px-8">
                {category.skills.map((skill, i) => (
                  <SkillBox
                    key={skill.skillName}
                    skillName={skill.skillName}
                    skillImage={skill.skillImage}
                    bgColour={skill.bgColour}
                    rounded={skill.rounded}
                    className={`transition-all duration-500 ${
                      inView ? `slide-in-left delay-${i * 100}` : 'opacity-0'
                    }`}
                    style={{ zIndex: -i }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
