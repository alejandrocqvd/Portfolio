"use client"
import React from "react";
import { useInView } from "react-intersection-observer";
import PhotoRow from "./ui/PhotoRow";

const SongSection = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-start gap-4 w-full max-w-5xl md:mb-12 mt-2">
      <div className="flex flex-col justify-center items-start gap-4">
        <p className="flex md:hidden text-sm px-8 md:px-0 text-center md:text-justify mb-4 md:mb-2">If I were to work in silence for the rest of my life I&apos;d probably lose my mind. So, here are my top songs.</p>
        <iframe
          style={{ borderRadius: "12px" }}
          src="https://open.spotify.com/embed/track/1XrSjpNe49IiygZfzb74pk?utm_source=generator&theme=0"
          width="100%"
          height="80"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className="px-4 md:px-0"
        />
        <iframe
          style={{ borderRadius: "12px" }}
          src="https://open.spotify.com/embed/track/5VgoYN2PNwcRIbxCzmeri0?utm_source=generator&theme=0"
          width="100%"
          height="80"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className="px-4 md:px-0"
        />      
        <p className="hidden md:flex text-sm px-12 md:px-0 text-center md:text-justify mb-4 md:mb-2">If I were to work in silence for the rest of my life I&apos;d probably lose my mind. So, here are my top songs.</p>
      </div>
      <iframe className="relative mb-24 md:mb-0 px-4 md:px-0" data-testid="embed-iframe" style={{ borderRadius: "12px"}} src="https://open.spotify.com/embed/track/5GWrhVfgP4szBtCOXbSki8?utm_source=generator&theme=0" width="100%" height="352" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
    </div>
  );
}

const WhoAmISection = () => {
  const photos = [
    "/about/pizza.jpg",
    "/about/grass.jpg",
    "/about/back.jpg",
    "/about/guitar.jpg",
  //   "/about/prague.jpg",
  ];

  return (
    <div className="w-full h-full relative">
      <section>
        <div className="flex flex-col xl:flex-row justify-center items-stretch w-full max-w-5xl h-full relative -top-24">
          <PhotoRow photos={photos} />
        </div>
        <SongSection />
      </section>
    </div>
  );
};

export default WhoAmISection;
