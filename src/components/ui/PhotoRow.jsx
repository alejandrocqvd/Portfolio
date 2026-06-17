"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function PhotoRow({
  photos,
  reversed = false,
  defaultSelected = 0,
  fade,
}) {
  const [hovered, setHovered] = useState(defaultSelected);

  return (
    <div
      className={`flex justify-center ${
        reversed ? "items-start" : "items-end"
      } h-96 gap-2 w-full max-w-6xl mx-auto`}
    >
      {photos.map((src, i) => (
        <div
          key={i}
          className={`
            relative flex-1 transition-all duration-300 ease-in-out ${fade}
            ${i >= 2 ? "hidden md:block" : ""}
            ${hovered === i ? "flex-[2] z-10" : "flex-[1] z-0"}
          `}
          style={{ animationDelay: `${0.1 + i * 0.1}s` }}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(defaultSelected)}
        >
          <div
            className={`
              relative w-full h-64 transition-all duration-300 ease-in-out
              ${hovered === i ? "h-80" : "h-64"}
            `}
          >
            <Image
              src={src}
              alt={`Photo ${i + 1}`}
              fill
              placeholder="blur"
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover rounded-md shadow-lg"
            />
          </div>
        </div>
      ))}
    </div>
  );
}