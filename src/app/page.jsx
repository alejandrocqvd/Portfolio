"use client";

import Navbar from '../components/Navbar';
import Contact from '../components/Contact';
import Hero from '@/components/Hero';
import PhotoRow from "../components/ui/PhotoRow";
import { Code2, Briefcase, Zap } from 'lucide-react'

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

const About = () => {
  const photos = [
    "/about/pizza.jpg",
    "/about/grass.jpg",
    "/about/back.jpg",
    "/about/guitar.jpg",
  ];

  return (
    <div className="w-full h-full relative">
      <section>
        <div className="flex flex-col xl:flex-row justify-center items-stretch w-full max-w-5xl h-full relative -top-32">
          <PhotoRow photos={photos} />
        </div>
      </section>
    </div>
  );
};

const Specialties = () => {
  const specialties = [
    {
      title: 'Full Stack Web Development',
      description:
        'I&apos;ve built and worked on 10+ full stack RESTful web apps, with my most experienced stacks being PERN and Spring ',
      icon: Code2,
    },
    {
      title: 'Software Engineering',
      description:
        'Designing and implementing robust software solutions with clean architecture principles. I focus on code quality, maintainability, and best practices across the full development lifecycle.',
      icon: Briefcase,
    },
    {
      title: 'Project Management',
      description:
        'Leading cross-functional teams and coordinating complex projects from conception to delivery. I excel at stakeholder communication, risk management, and delivering results on time and on budget.',
      icon: Zap,
    },
  ]

  return (
    <section className="w-full py-16 px-4 md:py-24">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Specialties
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Three core areas where I bring deep expertise and deliver exceptional value
          </p>
        </div>

        {/* Specialties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {specialties.map((specialty, index) => {
            const Icon = specialty.icon
            return (
              <div key={index} className="border border-border hover:shadow-lg transition-shadow">
                <div className="pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div className="text-xl text-foreground">
                    {specialty.title}
                  </div>
                </div>
                <div>
                  <p className="text-muted-foreground leading-relaxed">
                    {specialty.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center">
      <Navbar />
      <Hero />
      <About />
      <Contact />
    </div>
  );
}
