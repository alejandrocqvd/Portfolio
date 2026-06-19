"use client";

import { useState } from "react";
import Image from "next/image";

// ==============================================================================================================
function getContainerClasses(reversed) {
  return `flex justify-center ${
    reversed ? "items-start" : "items-end"
  } h-96 gap-2 w-full max-w-6xl mx-auto`;
}

// ==============================================================================================================
function getPhotoClasses(index, hovered, fade) {
  return `
    relative flex-1 transition-all duration-300 ease-in-out ${fade}
    ${index >= 2 ? "hidden md:block" : ""}
    ${hovered === index ? "flex-[2] z-10" : "flex-[1] z-0"}
  `;
}

// ==============================================================================================================
function getImageContainerClasses(index, hovered) {
  return `
    relative w-full h-64 transition-all duration-300 ease-in-out
    ${hovered === index ? "h-80" : "h-64"}
  `;
}

// ==============================================================================================================
export default function PhotoRow({
  photos,
  reversed = false,
  defaultSelected = 0,
  fade,
}) {
  const [hovered, setHovered] = useState(defaultSelected);

  return (
    <div className={getContainerClasses(reversed)}>
      {photos.map((src, index) => (
        <div
          key={index}
          className={getPhotoClasses(index, hovered, fade)}
          style={{ animationDelay: `${0.1 + index * 0.1}s` }}
          onMouseEnter={() => setHovered(index)}
          onMouseLeave={() => setHovered(defaultSelected)}
        >
          <div className={getImageContainerClasses(index, hovered)}>
            <Image
              src={src}
              alt={`Photo ${index + 1}`}
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
