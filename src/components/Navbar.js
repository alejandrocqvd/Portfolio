"use client";
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

function NavLink({ href, children }) {
  return (
    <a
      href={href}
      className="block m-2 md:m-5 mx-4 md:mx-8 box-border text-center no-underline hover-underline-animation"
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
      className="navbar fixed top-0 w-screen items-center py-3 px-2 md:px-6 text-center z-50"
    >
      <div className="flex w-full items-center justify-center gap-8">
        <div className="flex items-center">
          <div className="mr-2 md:mr-0">
            <NavLink href="#about">About</NavLink>
          </div>
          <NavLink href="#skills">Skills</NavLink>
        </div>
        <a href="#home" className="flex items-center justify-center">
          <Image 
            src="/misc/logo_white.svg" 
            alt="Logo"
            width={48}
            height={48}
            className="hover:scale-105"
            priority
          />  
        </a>
        <div className="flex items-center">
          <NavLink href="#projects">Projects</NavLink>
          <div className="ml-2 md:ml-0">
            <NavLink href="#contact">Contact</NavLink>  
          </div>
        </div>
      </div>
    </nav>
  );
}
