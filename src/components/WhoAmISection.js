"use client"
import React from "react";
import { useInView } from "react-intersection-observer";

const WhoAmISection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section ref={ref} className={`relative -top-36 ${inView ? 'section-visible' : 'section-hidden'}`}>
      <p className="text-5xl xl:text-7xl font-bold text-center mb-10 xl:mb-20 mt-12">Who Am I?</p>
      <div className="flex flex-col xl:flex-row justify-center items-center w-9/12 xl:w-8/12 max-w-7xl">
        <img src="/portrait.png" className="h-[28rem] w-auto md:w-3/4 xl:w-auto object-cover white-box-shadow xl:flex-1 mb-10 xl:mb-0 xl:mr-8" alt="Portrait" />
        <div className="flex flex-col justify-center items-center xl:flex-1 xl:ml-8">
          <p className="text-lg">
            I am a full time student currently enrolled in Computer Science at 
            <span className="font-bold text-red-700 whitespace-nowrap"> UCalgary 🦖.</span>
            <br /><br />
            Choosing computer science was a difficult decision to make coming from a family full 
            of doctors where the only right path was medicine. But ever since I took my first 
            programming class, I was hooked. My main interests are software engineering, game development, 
            and virtual reality.
            <br /><br />
            Alongside this, I co-founded <a href="https://www.nullus.ca/" target="_blank" className="hover:underline">Nullus Inc.</a>, where we empower individuals, clubs, and companies through innovative web development solutions.
            <br /><br />
            Before, I was intimidated at the competitiveness of this field, but as Jim Carrey puts it:
            <br /><br />
          </p>
          <div className="xl:mx-4 xl:my-2 p-4 rounded-lg bg-[#141418] text-center">
            <p className="italic">
              &quot;You can fail at what you don&apos;t want, so you might as well take a chance on doing what you love&quot;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoAmISection;
