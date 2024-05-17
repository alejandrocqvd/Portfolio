
import React from 'react';
import WorkShowcase from './WorkShowcase';

const WorkShowcaseSection = () => {

  return (
    <section>
      <div className="flex flex-col justify-center items-center w-8/12">
        <p className="text-7xl font-bold text-center mb-20 mt-12">My Work</p>
        <WorkShowcase 
          title="CGC on Campus" 
          subtitle="2024 | UCalgary Club's Website" 
          description="In a team, design and develop a user-friendly and informational website for Canadian Global Care on Campus club."
          techStack="React, Vite, TailwindCSS"
          image=""
        />
        <WorkShowcase 
          title="MiHistoria" 
          subtitle="2024 | Social Media Web App" 
          description="To further develop the skills I learnt from developing DinoDB, I wanted to make a social media web app where each user gets one and only post, and in that post, they share their life story."
          techStack="React, Vite, TailwindCSS, NodeJS, TypeScript"
          image=""
          reversed={true}
        />
        <WorkShowcase 
          title="Malware Terminal" 
          subtitle="2023 | Educational & Interactive Terminal Website" 
          description="For my cybersecurity class, I came up with an idea for my group to design and develop an interactive terminal-like website to educate those interested in everything there is about malware."
          techStack="HTML, CSS, JavaScript"
          image=""
        />
        <WorkShowcase 
          title="DinoDB" 
          subtitle="2023 | UCalgary Extracurricular Database" 
          description="In a team for my databases class, we designed and developed a sophisticated database for UCalgary's extracurricular activities to bring all necessary information in one place."
          techStack="React, NodeJS, JavaScript, TypeScript, MySQL, TailwindCSS"
          image=""
          reversed={true}
        />
        <WorkShowcase 
          title="Sorting Visualizer" 
          subtitle="2023 | Interactive Visualizer for Sorting Algorithms" 
          description="Learn each sorting algorithm in depth and solidify JavaScript skills by developing an interactive web app where users can see the process of each sorting algorithm, step-by-step."
          techStack="HTML, CSS, JavaScript"
          image=""
        />
        <WorkShowcase 
          title="CineSeen" 
          subtitle="2023 | Personal Director and Movie Database" 
          description="Develop both the front-end and back-end of a database used for keeping track of your favorite directors and their movies, all in one place."
          techStack="HTML, CSS, JavaScript, NodeJS, MongoDB"
          image=""
          reversed={true}
        />
        <WorkShowcase 
          title="Greenhouse Simulator" 
          subtitle="2023 | Multithreaded Greenhouse Simulator" 
          description="Design a greenhouse simulator that uses Java's multithreading capabilities to continuously monitor the environment's temperature, soil moisture, and humidity."
          techStack="Java, Swing"
          image=""
        />
      </div>
    </section>
  );
};

export default WorkShowcaseSection;
