"use client";

import Contact from '@/components/Footer';
import PhotoRow from "@/components/PhotoRow";
import GLSLHills from '@/app/GSLHills';
import TypingName from '@/app/TypingName';

import back2 from "../../public/about/back2.jpg";
import grass from "../../public/about/grass.jpg";
import dinner from "../../public/about/dinner.jpg";
import mark from "../../public/about/mark.jpg";

// ==============================================================================================================
const Hero = () => {
  return (
    <section className="relative w-full overflow-hidden mb-20">
      <div className="absolute inset-0 -z-10 pointer-events-none -translate-y-72 md:-translate-y-52">
        <GLSLHills />
      </div>
      <div className="flex flex-col justify-end items-center max-w-5xl mx-auto w-full mb-8 pt-80">
        <TypingName />
        <div className="w-full h-[1.25px] 4xl:h-[3px] bg-white my-10"></div>
        <div className="flex justify-center sm:justify-end w-full">
          <div className="lg:w-1/2 text-justify fade-up-second-2 text-sm px-16 md:px-0">
            <p className="text-sm text-justify">
              I&apos;m a full time student currently enrolled in Computer Science at the University of Calgary.
              <br /><br />
              Choosing computer science was a difficult decision to make coming from a family full 
              of doctors where the only right path was medicine. But ever since I took my first 
              programming class, I was hooked. My main interests are software engineering, game development, 
              and virtual reality.
              <br /><br />
              Alongside this, I co-founded <a href="https://www.nullus.ca/" target="_blank" className="hover:underline">Nullus Inc.</a>
              , where we empower individuals, clubs, and companies through innovative web development solutions.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ==============================================================================================================
const About = () => {
  const photos = [back2, grass, dinner, mark];

  return (
    <div className="w-full h-full relative">
      <section>
        <div className="flex flex-col xl:flex-row justify-center items-stretch w-full max-w-5xl h-full relative -top-32">
          <PhotoRow fade="fade-up-second" photos={photos} />
        </div>
      </section>
    </div>
  );
};

// ==============================================================================================================
export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center">
      <Hero />
      <About />
      <Contact />
    </div>
  );
}
