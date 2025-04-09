"use client";
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

function NavLink({ href, children }) {
  return (
    <a
      href={href}
      className="block m-2 md:m-5 mx-1 md:mx-8 box-border text-center no-underline hover-underline-animation"
    >
      {children}
    </a>
  );
}

export default function Navbar() {
  const navbarRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const navbar = navbarRef.current;
      if (!navbar) return;
      if (window.scrollY > 0) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      ref={navbarRef}
      className="navbar fixed top-0 w-screen items-center py-6 md:py-3 px-2 md:px-6 text-center z-50"
    >
      <div className="flex w-full items-center justify-between md:justify-center gap-8 md:gap-2">
        <div className="flex justify-between md:justify-end items-center w-45pc md:w-2/12">
          <div className="w-1/2 md:w-auto flex justify-center items-center">
            <NavLink href="#about">About</NavLink>
          </div>
          <div className="w-1/2 md:w-auto flex justify-center items-center">
            <NavLink href="#skills">Skills</NavLink>
          </div>
        </div>
        <a href="#home" className="flex items-center justify-center w-1/24">
          <Image 
            src="/misc/logo_white.svg" 
            alt="Logo"
            width={48}
            height={48}
            className="scale-250 md:scale-100 md:hover:scale-105"
            priority
          />  
        </a>
        <div className="flex justify-between md:justify-start items-center w-45pc md:w-2/12">
          <div className="w-1/2 md:w-auto flex justify-center items-center">
            <NavLink href="#projects">Projects</NavLink>
          </div>
          <div className="w-1/2 md:w-auto flex justify-center items-center">
            <NavLink href="#contact">Contact</NavLink>  
          </div>
        </div>
      </div>
    </nav>
  );
}
