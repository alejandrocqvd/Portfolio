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
          <p className="lg:w-1/2 text-justify fade-into text-sm px-16 md:px-0">
            Born 2004 in Fort McMurray, Canada. My early experiences with 
            technology led me to develop a relationship where I aspire to be 
            on the forefront of tech and to apply it in the real world to achieve 
            real results. Inspired by the remarkable achievements in software 
            engineering and virtual reality, I am committed to pursuing a career 
            that not only challenges me to continuously refine my skills, but 
            also allows me to experiment with and shape the future of technology.
          </p>
        </div>
      </div>
    </section>
  )
}
