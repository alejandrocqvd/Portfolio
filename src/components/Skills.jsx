"use client";
import React from 'react';
import { useInView } from "react-intersection-observer";

// =====================================================================================================

const SkillBox = (props) => {
  const { skillName, skillImage, bgColour, rounded } = props;
  
  return (
    <div className={`skill-box h-12 xl:h-16 w-full ${bgColour} ${rounded == 1 ? "rounded-l-lg" : (rounded == 2 ? "rounded-r-lg" : "") }`}>
      <div className="blur-container">
        <img className="skill-image h-full w-full" src={skillImage} alt={skillName} />
      </div>
      <p className="skill-text font-normal xl:font-bold text-sm xl:text-md drop-shadow-2xl">{skillName}</p>
    </div>
  );
}

// =====================================================================================================

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
        { skillName: "Python", skillImage: "/skills/python-logo.png", bgColour: "bg-[#8a650c]", rounded: "1" },
        { skillName: "Java", skillImage: "/skills/java-logo.png", bgColour: "bg-[#987310]", rounded: "0" },
        { skillName: "JavaScript", skillImage: "/skills/javascript-logo.png", bgColour: "bg-[#a58014]", rounded: "0" },
        { skillName: "HTML", skillImage: "/skills/html-logo.png", bgColour: "bg-[#b49019]", rounded: "0" },
        { skillName: "CSS", skillImage: "/skills/css-logo.png", bgColour: "bg-[#c3a01e]", rounded: "0" },
        { skillName: "TypeScript", skillImage: "/skills/typescript-logo.png", bgColour: "bg-[#d2b023]", rounded: "0" },
        { skillName: "C", skillImage: "/skills/c-logo.png", bgColour: "bg-[#e0bf27]", rounded: "0" },
        { skillName: "Go", skillImage: "/skills/golang-logo.png", bgColour: "bg-[#f0cf2c]", rounded: "0" },
        { skillName: "Assembly", skillImage: "/skills/assembly-logo.png", bgColour: "bg-[#ffde30]", rounded: "2" },
      ],
    },
    {
      title: "LIBRARIES AND FRAMEWORKS",
      skills: [
        { skillName: "React", skillImage: "/skills/react-logo.png", bgColour: "bg-[#0b2870]", rounded: "1" },
        { skillName: "Tailwind", skillImage: "/skills/tailwind-logo.png", bgColour: "bg-[#13308f]", rounded: "0" },
        { skillName: "Swing", skillImage: "/skills/swing-logo.png", bgColour: "bg-[#1b38ad]", rounded: "0" },
        { skillName: "NextJS", skillImage: "/skills/nextjs-logo.png", bgColour: "bg-[#223fc8]", rounded: "0" },
        { skillName: "NumPy", skillImage: "/skills/numpy-logo.png", bgColour: "bg-[#2947e5]", rounded: "0" },
        { skillName: "Express.js", skillImage: "/skills/express-logo.png", bgColour: "bg-[#304eff]", rounded: "0" },
        { skillName: "Encore", skillImage: "/skills/encore-logo.png", bgColour: "bg-[#3856ff]", rounded: "2" },
      ],
    },
    {
      title: "OTHER TOOLS",
      skills: [
        { skillName: "Photoshop", skillImage: "/skills/photoshop-logo.png", bgColour: "bg-[#630909]", rounded: "1" },
        { skillName: "Bash", skillImage: "/skills/bash-logo.png", bgColour: "bg-[#761108]", rounded: "0" },
        { skillName: "Git", skillImage: "/skills/git-logo.png", bgColour: "bg-[#841707]", rounded: "0" },
        { skillName: "MongoDB", skillImage: "/skills/mongoDB-logo.png", bgColour: "bg-[#992005]", rounded: "0" },
        { skillName: "MySQL", skillImage: "/skills/mysql-logo.png", bgColour: "bg-[#a92704]", rounded: "0" },
        { skillName: "PostgreSQL", skillImage: "/skills/postgre-logo.png", bgColour: "bg-[#be3002]", rounded: "0" },
        { skillName: "Supabase", skillImage: "/skills/supabase-logo.png", bgColour: "bg-[#cf3700]", rounded: "2" },
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
