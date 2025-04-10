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
        { skillName: "Java", skillImage: "/skills/java-logo.png", bgColour: "bg-[#9d780e]", rounded: "0" },
        { skillName: "JavaScript", skillImage: "/skills/javascript-logo.png", bgColour: "bg-[#ae890f]", rounded: "0" },
        { skillName: "HTML", skillImage: "/skills/html-logo.png", bgColour: "bg-[#c39e11]", rounded: "0" },
        { skillName: "CSS", skillImage: "/skills/css-logo.png", bgColour: "bg-[#c7a211]", rounded: "0" },
        { skillName: "TypeScript", skillImage: "/skills/typescript-logo.png", bgColour: "bg-[#d3ae12]", rounded: "0" },
        { skillName: "C", skillImage: "/skills/c-logo.png", bgColour: "bg-[#ddb813]", rounded: "0" },
        { skillName: "C++", skillImage: "/skills/cpp-logo.png", bgColour: "bg-[#efca15]", rounded: "0" },
        { skillName: "Go", skillImage: "/skills/golang-logo.png", bgColour: "bg-[#f8d316]", rounded: "0" },
        { skillName: "Assembly", skillImage: "/skills/assembly-logo.png", bgColour: "bg-[#ffde30]", rounded: "2" },
      ],
    },
    {
      title: "LIBRARIES AND FRAMEWORKS",
      skills: [
        { skillName: "React", skillImage: "/skills/react-logo.png", bgColour: "bg-[#0b2870]", rounded: "1" },
        { skillName: "Tailwind", skillImage: "/skills/tailwind-logo.png", bgColour: "bg-[#0f2c7d]", rounded: "0" },
        { skillName: "Swing", skillImage: "/skills/swing-logo.png", bgColour: "bg-[#133089]", rounded: "0" },
        { skillName: "NextJS", skillImage: "/skills/nextjs-logo.png", bgColour: "bg-[#173495]", rounded: "0" },
        { skillName: "NumPy", skillImage: "/skills/numpy-logo.png", bgColour: "bg-[#223fb9]", rounded: "0" },
        { skillName: "Express.js", skillImage: "/skills/express-logo.png", bgColour: "bg-[#2947d0]", rounded: "0" },
        { skillName: "Encore", skillImage: "/skills/encore-logo.png", bgColour: "bg-[#3250eb]", rounded: "0" },
        { skillName: "OpenGL", skillImage: "/skills/opengl-logo.png", bgColour: "bg-[#3856ff]", rounded: "2" },
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
      <p className="text-sm font-[150]">SKILLS</p>
      <p className="text-5xl font-mono xl:text-6xl font-[300] text-left mb-12 mt-2">What I Use</p>
      <div className="flex flex-row justify-center items-center w-10/12 xl:w-9/12 max-w-7xl rounded-md xl:px-24 ">
        <div className="flex flex-col justify-center items-center text-left w-full">
          {skillCategories.map((category, index) => (
            <div
              key={category.title}
              className={`w-full ${index < skillCategories.length - 1 ? 'mb-12' : 'mb-4'}`}
            >
              <p className="text-xl font w-full mb-2 text-center xl:text-left">{category.title}</p>
              <div className="flex flex-row flex-nowrap content-center h-auto w-full xl:px-0">
                {category.skills.map((skill, i) => (
                  <SkillBox
                    key={skill.skillName}
                    skillName={skill.skillName}
                    skillImage={skill.skillImage}
                    bgColour={skill.bgColour}
                    rounded={skill.rounded}
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
