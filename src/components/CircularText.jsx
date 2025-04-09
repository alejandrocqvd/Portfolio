'use client'

import React from 'react'

export default function CircularText() {
  const words = ['Developer', 'Student', 'Petter of Cats', 'Film Buff']
  const animationDuration = 10 // seconds

  return (
    <div className="flex items-center justify-center">
      {/* Outer wrapper div to prevent cropping */}
      <div className="relative w-60 md:w-80 h-16 p-2">
        <div className="relative w-full h-full bg-black/20 rounded-sm overflow-visible">
          {/* Corner "+" signs */}
          <span className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 font-semibold text-white" aria-hidden="true">+</span>
          <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 font-semibold text-white" aria-hidden="true">+</span>
          <span className="absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2 font-semibold text-white" aria-hidden="true">+</span>
          <span className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 font-semibold text-white" aria-hidden="true">+</span>

          {/* Animated words */}
          <div className="absolute inset-0 flex items-center overflow-hidden">
            <div
              className="whitespace-nowrap pb-1"
              style={{
                animation: `marquee ${animationDuration}s linear infinite`,
              }}
              aria-live="polite"
              aria-label="Rotating text: Student, Developer, Film Buff, Petter of Cats"
            >
              {[...words, ...words].map((word, index) => (
                <React.Fragment key={index}>
                  <span className="text-lg font-semibold mx-4">{word}</span>
                  <span className="text-lg font-semibold mx-4" aria-hidden="true">{"///"}</span>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CSS for the animation */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  )
}
