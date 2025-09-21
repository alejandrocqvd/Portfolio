"use client";
import React from "react";
import PhotoRow from "./PhotoRow";

const timeline = [
  {
    company: "University of Calgary",
    role: "BS in Computer Science",
    period: "2022 - Now",
    description: [
      "CGPA: 3.96 / 4.0",
      "Awards and Honours: Alexander Rutherford Scholarship, Dean's List",
      "Relevant Coursework:  Data Structures & Algorithms, Object-Oriented Programming, DBMS",
    ],
    color: "bg-blue-500",
  },
  {
    company: "UA-RAD",
    role: "Software Engineer",
    period: "2022 - Now",
    description: [
      "Built and maintained a web application using React",
      "Built internal web tools with Next.js",
    ],
    color: "bg-blue-500",
  },
  {
    company: "Pason Systems",
    role: "Software Developer Intern",
    period: "May 2025 - Aug 2026",
    description: [
      "Part of the Griffin agile software team",
    ],
    color: "bg-yellow-500",
  },
  {
    company: "Nullus",
    role: "Co-Founder & Software Developer",
    period: "2024 - Now",
    description: [
      "Co-founded Nullus Inc., a student-led software development startup",
      "Designed and developed sites for individuals, clubs, and businesses",
      "Served 6+ clients and reaching 1000+ users.",
    ],
    color: "bg-green-500",
  },
  {
    company: "Canadian Global Care on Campus",
    role: "Web Developer",
    period: "2023 - 2025",
    description: [
      "Designed and developed a React-based website with TailwindCSS and Vite",
      "Collaborated with team members and club executives to gather requirements and feedback",
      "Promoted the site, leading to a 30% increase in club event attendance.",
    ],
    color: "bg-red-500",
  },
];

const photos = [
    "/about/pizza.jpg",
    "/about/grass.jpg",
    "/about/back.jpg",
    "/about/guitar.jpg",
    // "/about/prague.jpg",
];

const Timeline = () => {
  return (
    <section className="flex flex-col justify-center items-start mt-52 w-full mx-auto max-w-4xl">
        <h2 className="font-mono text-left mx-auto w-full text-4xl mb-12 relative fade-up-normal">Timeline</h2>
        <p className="text-sm text-justify fade-into">I&apos;ve had the pleasure of working at a few places yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap yap </p>
        <div className="flex flex-col xl:flex-row justify-center items-stretch w-full max-w-5xl h-full relative top-12">
            <PhotoRow className="mt-44 relative" photos={photos} reversed={true} defaultSelected={photos.length - 1} />
        </div>
        <div className="flex flex-col items-start justify-center mx-auto mt-12">
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
        <p className="text-sm w-full mx-auto text-center mt-12">To view my full experience, check out my CV here.</p>
    </section>
  );
};

export default Timeline;
