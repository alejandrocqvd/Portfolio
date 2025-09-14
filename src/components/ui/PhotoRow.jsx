"use client";
import React, { useState } from "react";
import Image from "next/image";

const photos = [
    "/about/pizza.jpg",
  "/about/grass.jpg",
  "/about/back.jpg",
  "/about/guitar.jpg",
//   "/about/prague.jpg",
];

export default function PhotoRow() {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="flex justify-center items-end h-96 gap-2 w-full max-w-6xl mx-auto relative -top-24">
      {photos.map((src, i) => (
        <div
          key={i}
          className={`
            relative flex-1 transition-all duration-300 ease-in-out fade-up-normal
            ${hovered === i ? "flex-[2] z-10" : "flex-[1] z-0"}
          `}
          style={{ animationDelay: `${0.5 + i * 0.3}s` }}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(0)}
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
              className="object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
