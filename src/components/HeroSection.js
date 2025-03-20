'use client'

import React, { useEffect, useRef } from 'react'

export default function HeroSection() {
  const scrollRef = useRef<HTMLDivElement>(null)

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
    <div id="home">
      <div className="flex flex-col justify-center items-center text-center w-screen md:w-full h-screen landing-page-bg bg-cover bg-no-repeat mb-20">
        <h1 className="text-4xl md:text-8xl">ALEJANDRO</h1>
        <h1 className="text-4xl md:text-8xl mt-4 mb-10">CARDONA</h1>
        {/* <div className="relative w-64 md:w-96 h-12 border-2 border-white"> */}
          {/* Plus signs on corners
          <span className="absolute top-0 left-0 -mt-2 -ml-2 text-white text-2xl">+</span>
          <span className="absolute top-0 right-0 -mt-2 -mr-2 text-white text-2xl">+</span>
          <span className="absolute bottom-0 left-0 -mb-2 -ml-2 text-white text-2xl">+</span>
          <span className="absolute bottom-0 right-0 -mb-2 -mr-2 text-white text-2xl">+</span> */}

          {/* Scrolling text container */}
          {/* <div className="w-full h-full overflow-hidden">
            <div 
              ref={scrollRef}
              className="scrolling-text"
            >
              <span className="text-md md:text-lg font-bold mr-8">Student</span>
              <span className="text-md md:text-lg font-bold mr-8">Developer</span>
              <span className="text-md md:text-lg font-bold mr-8">Musician</span>
              <span className="text-md md:text-lg font-bold mr-8">Writer</span>
              <span className="text-md md:text-lg font-bold">Baller</span>
            </div>
          </div> */}
        {/* </div> */}
      </div>
      {/* <style jsx>{`
        .scrolling-text {
          display: inline-block;
          padding-left: 100%;
          white-space: nowrap;
          animation: scroll-left var(--animation-duration) linear infinite;
        }

        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-1 * var(--scroll-width))); }
        }
      `}</style> */}
    </div>
  )
}
