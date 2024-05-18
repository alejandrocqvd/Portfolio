"use client";
import { useEffect, useRef } from 'react';

export default function Navbar() {
  const navbarRef = useRef(null);

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

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav ref={navbarRef} className="navbar flex justify-between items-center py-3 px-6 text-center z-50 fixed top-0 w-full">
      <img className="h-12 pl-4" src="/logo.png" alt="Logo" />
      <ul className="flex pr-4 justify-end items-center overflow-hidden">
        <li><a href="#home" className="block m-5 ml-12 box-border text-center no-underline hover-underline-animation">Home</a></li>
        <li><a href="#about" className="block m-5 ml-12 box-border text-center no-underline hover-underline-animation">About</a></li>
        <li><a href="#skills" className="block m-5 ml-12 box-border text-center no-underline hover-underline-animation">Skills</a></li>
        <li><a href="#projects" className="block m-5 ml-12 box-border text-center no-underline hover-underline-animation">Projects</a></li>
        <li><a href="#contact" className="block m-5 ml-12 box-border text-center no-underline hover-underline-animation">Contact</a></li>
      </ul>
    </nav>
  );
}
