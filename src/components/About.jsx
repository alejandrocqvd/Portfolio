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
    <div className="w-full h-full relative px-6">
      <section
        ref={ref}
        className={`${inView ? 'section-visible' : 'section-hidden'}`}
      >
        <div className="flex flex-col xl:flex-row justify-center items-center max-w-5xl h-full">
          {/* Image Section */}
          <div className="relative aspect-[3/4] h-[28rem] lg:h-[32rem] lg:mr-8 mb-10 lg:mb-0">
            <Image
              src="/about/portrait.png"
              alt="Portrait"
              fill
              className="object-cover white-box-shadow"
              priority
            />
          </div>
          {/* Text Section */}
          <div className="flex flex-col justify-center lg:ml-8 h-full">
            <p className="text-sm font-[300] text-left text-[#858585]">ABOUT</p>
            <p className="text-5xl font-mono xl:text-5xl font-[300] text-left sm:mb-12 mt-2">Who Am I?</p>
            {/* Mobile Image */}
            <div className="flex lg:hidden relative w-full h-64 mt-6 mb-12">
              <Image
                src="/about/portrait.png"
                alt="Portrait"
                className="object-cover white-box-shadow"
                width={400}
                height={400}
              />
            </div>
            <p className="text-sm text-justify">
              I am a full time student currently enrolled in Computer Science at the University of Calgary.
              <br /><br />
              Choosing computer science was a difficult decision to make coming from a family full 
              of doctors where the only right path was medicine. But ever since I took my first 
              programming class, I was hooked. My main interests are software engineering, game development, 
              and virtual reality.
              Alongside this, I co-founded <a href="https://www.nullus.ca/" target="_blank" className="hover:underline">Nullus Inc.</a>
              , where we empower individuals, clubs, and companies through innovative web development solutions.
              <br /><br />
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhoAmISection;
