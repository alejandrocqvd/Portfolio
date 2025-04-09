"use client"
import React from "react";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

const WhoAmISection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <div className="w-full h-full relative pt-36 -top-44">
      <section
        ref={ref}
        className={`pt-10 relative -top-36 min-h-[700px] ${inView ? 'section-visible' : 'section-hidden'}`}
      >
        <div className="flex flex-col xl:flex-row-reverse justify-center items-center w-10/12 xl:w-9/12 max-w-7xl h-full">
          {/* Image Section */}
          <div className="relative xl:flex-1 h-[180%] xl:ml-12 mb-10 xl:mb-0">
            <Image
              src="/work/WIP.png"
              alt="Portrait"
              fill
              className="object-cover white-box-shadow"
            />
          </div>
          {/* Text Section */}
          <div className="flex flex-col justify-center xl:flex-1 xl:mr-12 h-full">
            <p className="text-sm font-[150]">ABOUT</p>
            <p className="text-5xl font-mono xl:text-6xl font-[300] text-left mb-12 mt-2">Who Am I?</p>
            <p className="text-lg text-justify">
              I am a full time student currently enrolled in Computer Science at the University of Calgary.
              <br /><br />
              Choosing computer science was a difficult decision to make coming from a family full 
              of doctors where the only right path was medicine. But ever since I took my first 
              programming class, I was hooked. My main interests are software engineering, game development, 
              and virtual reality.
              Alongside this, I co-founded <a href="https://www.nullus.ca/" target="_blank" className="hover:underline">Nullus Inc.</a>
              , where we empower individuals, clubs, and companies through innovative web development solutions.
              <br /><br />
              {/* Before, I was intimidated at the competitiveness of this field, but as Jim Carrey puts it:
              <br /><br /> */}
            </p>
            {/* <div className="xl:mx-4 xl:my-2 p-4 rounded-lg bg-[#141418] text-center">
              <p className="italic font-[300]">
                &quot;You can fail at what you don&apos;t want, so you might as well take a chance on doing what you love&quot;
              </p>
            </div> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhoAmISection;
