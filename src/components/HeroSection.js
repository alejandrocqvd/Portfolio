'use client'

import React, { useEffect, useRef, useState, useMemo } from 'react';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import particlesConfig from "../app/config/tsParticlesConfig.json";

export default function HeroSection() {
  const [init, setInit] = useState(false);
  const scrollRef = useRef(null);

  // Initialize tsParticles engine once
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // Load only the slim package to reduce bundle size
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  // Example effect for scrollRef CSS variables (animation)
  useEffect(() => {
    if (scrollRef.current) {
      const scrollWidth = scrollRef.current.scrollWidth;
      const animationDuration = scrollWidth / 50; // Adjust speed here

      // Set CSS variables on the element
      scrollRef.current.style.setProperty('--scroll-width', `${scrollWidth}px`);
      scrollRef.current.style.setProperty('--animation-duration', `${animationDuration}s`);
    }
  }, []);

  // Use useMemo to cache the particles options configuration
  const options = useMemo(() => ({
    ...particlesConfig,
  }), []);

  // Render nothing until the engine is initialized
  if (!init) {
    return null;
  }

  // landing-page-bg bg-cover
  return (
    <div
      ref={scrollRef}
      className="px-24 flex flex-col justify-end pb-[20vh] items-center max-w-[2200px] w-full h-screen bg-no-repeat mb-20 relative"
    >
      <Particles 
        className="absolute inset-0 -z-10" 
        options={options} 
      />
      <p className="text-4xl md:text-7xl text-center sm:text-left w-full">Alejandro Cardona</p>
      <div className="w-full h-[1.25px] 4xl:h-[3px] bg-white my-4"></div>
      <div className="flex justify-center sm:justify-end w-full">
        <p className="w-1/3 pt-3 text-justify">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut 
          enim ad minim veniam, quis nostrud exercitation ullamco laboris 
          nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor 
          in reprehenderit in voluptate velit esse cillum dolore eu fugiat 
          nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
          sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </div>
  );
}
