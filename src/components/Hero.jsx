'use client'

import React from 'react'
import GLSLHills from './GSLHills'
import TypingName from './ui/TypingName'

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden mb-20">
      <div className="absolute inset-0 -z-10 pointer-events-none -translate-y-52">
        <GLSLHills />
      </div>
      <div className="flex flex-col justify-end items-center max-w-5xl mx-auto w-full mb-8 pt-80">
        <TypingName />
        <div className="w-full h-[1.25px] 4xl:h-[3px] bg-white my-10"></div>
        <div className="flex justify-center sm:justify-end w-full">
          <div className="lg:w-1/2 text-justify fade-into text-sm px-16 md:px-0">
            <p className="text-sm text-justify">
              I&apos;m a full time student currently enrolled in Computer Science at the University of Calgary.
              <br /><br />
              Choosing computer science was a difficult decision to make coming from a family full 
              of doctors where the only right path was medicine. But ever since I took my first 
              programming class, I was hooked. My main interests are software engineering, game development, 
              and virtual reality.
              Alongside this, I co-founded <a href="https://www.nullus.ca/" target="_blank" className="hover:underline">Nullus Inc.</a>
              , where we empower individuals, clubs, and companies through innovative web development solutions.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
