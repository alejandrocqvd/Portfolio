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
      <p className="text-5xl md:text-7xl font-bold text-center mb-10 md:mb-20 mt-12">Who Am I?</p>
      <div className="flex flex-col md:flex-row justify-center items-center w-9/12 md:w-8/12">
        <img src="/portrait.png" className="h-96 w-auto object-cover white-box-shadow md:flex-1 mb-10 md:mb-0 md:mr-8" alt="Portrait" />
        <div className="flex flex-col justify-center items-center md:flex-1 md:ml-8">
          <p className="text-xl">
            I am a full time student currently enrolled in Computer Science at 
            <span className="font-bold text-red-700"> UCalgary 🦖.</span>
            <br /><br />
            Choosing computer science was a difficult decision to make coming from a family full 
            of doctors where the only right path was medicine. But ever since I took my first 
            programming class,
            <br />
            <span className="font-bold text-red-700">I was hooked.</span>
            <br /><br />
            Before, I was intimidated at the competitiveness of this field, but as Jim Carrey puts it:
            <br /><br />
          </p>
          <div className="md:mx-4 md:my-2 p-4 rounded-lg bg-[#141418] text-center">
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
