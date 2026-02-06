"use client";
import React from "react";
import PhotoRow from "./ui/PhotoRow";

const photos = [
    "/about/vs.jpg",
    "/about/uarad.jpg",
    "/about/playgroundBuild.png",
    "/about/speakingHD.png",
];

const timeline = [
  {
    company: "University of Calgary",
    role: "BS in Computer Science",
    period: "2022 - Now",
    description: [
      "CGPA: 3.9 / 4.0",
      "Awards and Honours: Alexander Rutherford Scholarship, 3x Dean's List",
      "Relevant Coursework:  DSA, OOP, DBMS",
    ],
    color: "bg-blue-900",
  },
    {
    company: "Pason Systems",
    role: "Software Developer Intern",
    period: "May 2025 - Now",
    description: [
      "Owned full-stack features across Java services and React frontends in a fast-moving Agile team",
      "Kept releases stable by writing unit, integration, and end-to-end tests",
      "Shipped faster with CI/CD, automating builds, tests, and deployments",
    ],
    color: "bg-blue-600",
  },
    {
    company: "Nullus",
    role: "Co-Founder & Software Developer",
    period: "Apr 2024 - Now",
    description: [
      "Co-founded Nullus Inc., a student-led software development startup",
      "Designed and developed sites for individuals, clubs, and businesses",
      "Served 6+ clients and reaching 1000+ users",
    ],
    color: "bg-blue-500",
  },
  {
    company: "UofA Robotics and Aerial Drones",
    role: "Software Developer",
    period: "Jul 2025 - Oct 2025",
    description: [
      "Developed and maintained the UA-RAD club website using React, TailwindCSS, and Next.js",
      "Utilized ArduPilot to program and test autonomous drone flight missions",
      "0 drones exploded",
    ],
    color: "bg-blue-300",
  },
  {
    company: "Canadian Global Care on Campus",
    role: "Web Developer",
    period: "2023 - 2025",
    description: [
      "Designed and developed a React-based website with TailwindCSS and Vite",
      "Promoted the site which led to a 30% increase in club event attendance",
      "Entire box of leftover croissants taken home after event"
    ],
    color: "bg-blue-200",
  },
];

// ==============================================================================================================
const Timeline = () => {
  return (
    <section className="flex flex-col justify-center items-center mt-32 md:mt-44 w-full mx-auto max-w-4xl">
        <h2 className="font-mono text-left mx-auto w-full text-4xl mb-12 relative fade-up-first px-6 md:mx-0">Timeline</h2>
        <p className="text-sm text-justify fade-up-first px-6 md:mx-0">
          From volunteering to full-time work, I&apos;ve been lucky enough to have been a part of 
          many amazing teams that have taught me countless skills and lessons that I carry with me on 
          the day-to-day.
          <br></br><br></br>
          Each role and experience has pushed me in different ways, helping me grow professionally 
          and personally. I&apos;m grateful for the people who took the time 
          to mentor me, challenge me, and trust me with real responsibility (and not just make me fetch 
          coffee or something).
        </p>
        <div className="flex flex-col xl:flex-row justify-center items-stretch w-full max-w-5xl h-full relative top-12">
            <PhotoRow fade="fade-up-second" className="mt-44 relative" photos={photos} reversed={true} defaultSelected={photos.length - 1} />
        </div>
        <div className="flex flex-col items-start justify-center mx-auto mt-8 px-10 md:mx-0 fade-up-second-2">
            <div className="relative border-l border-gray-600 pl-6">
                {timeline.map((item, index) => (
                <div key={index} className="mb-10 ml-4">
                    {/* Dot */}
                    <div
                    className={`absolute -left-2 w-4 h-4 rounded-full border-2 border-gray-900 ${item.color}`}
                    ></div>
                    {/* Content */}
                    <div className="flex flex-col">
                    <span className="text-white font-semibold">
                        {item.company} <span className="font-normal">|</span>{" "}
                        <span className="italic font-light text-gray-300">{item.role}</span>
                    </span>
                    <ul className="list-disc list-inside text-sm text-gray-400 mt-1">
                        {item.description.map((point, i) => (
                        <li key={i}>{point}</li>
                        ))}
                    </ul>
                    <span className="text-gray-500 text-sm mt-2">{item.period}</span>
                    </div>
                </div>
                ))}
            </div>
        </div>
        <p className="text-sm w-full mx-auto text-center mt-12 px-6 md:mx-0">
          To view my full experience, check out my CV <a href="/misc/Alejandro-Cardona-Resume.pdf" className="hover:underline" target="_blank" >here</a>.
        </p>
    </section>
  );
};

export default Timeline;
