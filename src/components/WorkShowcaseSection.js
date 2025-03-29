'use client'
import React from 'react';
import { useInView } from "react-intersection-observer";
import Link from 'next/link';

// =====================================================================================================

const projects = [
  {
    title: "WSBenchmarks",
    subtitle: "2024 | Investment Performance Analysis Web App",
    description: "Currently in the process of designing and developing a NextJS web application used for comparing stock purchases to the VFV or the broader market, with the goal being help users assess their investment performance.",
    techStack: "D3.js, Encore, Go, NextJS, PostgreSQL, React, TailwindCSS, TypeScript",
    image: "/work/WIP.png",
    reversed: true,
  },
  {
    title: "CGC on Campus",
    subtitle: "2024 | UCalgary Club's Website",
    description: "In a team of two, we designed, developed, and continually maintain an informational website for Canadian Global Care on Campus, a club at our university. Hosted on Vercel, our website has helped generate hundreds of new impressions for our club and its mission.",
    techStack: "React, Vite, TailwindCSS",
    image: "/work/cgconcampus-img.PNG",
    link: "https://cgconcampus.ca/",
  },
  {
    title: "MiHistoria",
    subtitle: "2024 | Social Media Web App",
    description: "To further develop the skills I learnt from developing DinoDB, I wanted to build a social media web app where each user gets one and only post, and in that post, they share their life story. Using TinyMCE's rich text editor, users can make their stories visually appealing and highly personalized with the use of formatting and multimedia elements.",
    techStack: "React, Vite, Node.js, TypeScript, MySQL, TailwindCSS",
    image: "/work/mihistoria-img.PNG",
    reversed: true,
    link: "/mihistoria",
    page: true,
  },
  {
    title: "Malware Terminal",
    subtitle: "2023 | Educational & Interactive Terminal Website",
    description: "For my cybersecurity class, I came up with an idea for my group to design and develop an interactive terminal-like website to educate those interested in everything there is about malware, and if the users are brave enough, they can download a suspicious package on the terminal and see how it affects their system.",
    techStack: "HTML, CSS, JavaScript",
    image: "/work/malware-terminal-img.PNG",
    link: "https://alejandrocqvd.github.io/CPSC-329-Terminal/",
  },
  {
    title: "DinoDB",
    subtitle: "2023 | UCalgary Extracurricular Database",
    description: "In a team of 3 for my databases class, we designed and developed a sophisticated database for UCalgary's extracurricular activities to bring all necessary information in one place. In DinoDB, students and executives can create and join various clubs, programs, events, and volunteering opportunities.",
    techStack: "React, Node.js, JavaScript, TypeScript, MySQL, TailwindCSS",
    image: "/work/dinodb-img.PNG",
    reversed: true,
    link: "/dinodb",
    page: true,
  },
  {
    title: "Sorting Visualizer",
    subtitle: "2023 | Interactive Visualizer for Sorting Algorithms",
    description: "The goal of designing the visualizer was to learn each sorting algorithm in depth and solidify JavaScript skills by developing an interactive web app where users can see the process of each sorting algorithm, step-by-step. Includes algorithms from bubble-sort to quick-sort, and of course, bogo-sort.",
    techStack: "HTML, CSS, JavaScript",
    image: "/work/sorting-visualizer-img.PNG",
    link: "https://alejandrocqvd.github.io/Sorting-Algorithm-Visualizer/",
  },
  {
    title: "Greenhouse Simulator",
    subtitle: "2023 | Multithreaded Greenhouse Simulator",
    description: "Designed a greenhouse simulator that uses Java's multithreading capabilities to continuously monitor the environment's temperature, soil moisture, and humidity. Furthermore, users can save old simulations as files and load them later using Java's file reading and writing capabilities.",
    techStack: "Java, Swing",
    image: "/work/greenhouse-simulator-img.PNG",
    reversed: true,
    link: "/greenhouse-simulator",
    page: true,
  }
];

// =====================================================================================================

const WorkShowcase = (props) => {
  const { title, subtitle, description, techStack, image, reversed, link, page } = props;

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const sectionContent = (
    <div className={`flex ${reversed ? "md:flex-row-reverse" : "md:flex-row"} w-full flex-col justify-center items-center mb-24 md:mb-32`}>
      <div className="flex md:flex-1 justify-center items-center">
        <img src={image} alt={title} className={`h-auto md:h-72 w-full md:w-auto m-auto mb-10 md:mb-0 object-cover white-box-shadow ${reversed ? "md:ml-8" : "md:mr-8"}`} />
      </div>
      <div className={`flex flex-col md:flex-1 h-full w-auto md:w-auto justify-center text-md xl:text-lg ${reversed ? "md:mr-8" : "md:ml-8"}`}>
        {link && !page ? (
          <a href={link} target="_blank"><p className="text-xl xl:text-4xl font-bold mb-2 hover:underline">{title}</p></a>
        ) : (
          <p className="text-xl xl:text-4xl font-bold mb-2 hover:underline">{title}</p>
        )}
        <p>{subtitle}<br /><br /></p>
        <p><span className="font-bold"></span>{description}<br /><br /></p>
        <p><span className="font-bold">TECH STACK: </span>{techStack}</p>
      </div>
    </div>
  );

  return (
    <section ref={ref} className={inView ? 'section-visible' : 'section-hidden'}>
      {page ? (
        <Link href={link} passHref>
          {sectionContent}
        </Link>
      ) : (
        sectionContent
      )}
    </section>
  );
}

// =====================================================================================================

const WorkShowcaseSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section>
      <div className="flex flex-col justify-center items-center w-9/12 xl:w-8/12 max-w-7xl">
        <p ref={ref} className={`text-5xl xl:text-7xl font-bold text-center mb-16 xl:mb-20 mt-12 ${inView ? 'section-visible' : 'section-hidden'}`}>My Work</p>
        {projects.map((project, index) => (
          <WorkShowcase 
            key={index}
            title={project.title}
            subtitle={project.subtitle}
            description={project.description}
            techStack={project.techStack}
            image={project.image}
            reversed={project.reversed}
            link={project.link}
            page={project.page}
          />
        ))}
      </div>
    </section>
  );
};

export default WorkShowcaseSection;
