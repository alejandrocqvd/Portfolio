'use client'

import React, { useEffect, useRef } from 'react'
import GLSLHills from './GSLHills'

export default function HeroSection() {
  const scrollRef = useRef(null)

  useEffect(() => {
    if (scrollRef.current) {
      const scrollWidth = scrollRef.current.scrollWidth
      const animationDuration = scrollWidth / 50 // Adjust speed here

      // Set CSS variables directly on the document or element style
      scrollRef.current.style.setProperty('--scroll-width', `${scrollWidth}px`)
      scrollRef.current.style.setProperty('--animation-duration', `${animationDuration}s`)
    }
  }, [])

  return (
    <>
    <div className="w-full h-full absolute inset-0 -z-10 overflow-x-hidden">
      <GLSLHills />
    </div>
    <div className="relative px-16 md:px-24 flex flex-col justify-end pb-[20vh] items-center max-w-[2200px] w-full h-screen bg-cover bg-no-repeat mb-8 overflow-x-hidden">
      <p className="text-4xl md:text-7xl text-center sm:text-left w-full">Alejandro Cardona</p>
      <div className="w-full h-[1.25px] 4xl:h-[3px] bg-white my-4"></div>
      <div className="flex justify-center sm:justify-end w-full">
        <p className="lg:w-1/3 pt-3 text-justify">
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
    </>
  );
}
