"use client";
import { useEffect, useRef, useState } from 'react';

function NavLink({ href, children }) {
  return (
    <li>
      <a href={href} className="block m-5 ml-12 box-border text-center no-underline hover-underline-animation">
        {children}
      </a>
    </li>
  );
}

function MobileMenu({ isOpen, setIsOpen }) {
  return (
    <div className={`fixed z-30 top-14 left-0 w-screen bg-[#242327B3] md:hidden ${isOpen ? "block" : "hidden"}`}>
      <ul className="flex flex-col items-center">
        <NavLink href="#home">Home</NavLink>
        <NavLink href="#about">About</NavLink>
        <NavLink href="#skills">Skills</NavLink>
        <NavLink href="#projects">Projects</NavLink>
        <NavLink href="#contact">Contact</NavLink>
      </ul>
    </div>
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

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav ref={navbarRef} className="navbar flex justify-between w-screen items-center py-2 md:py-3 px-2 md:px-6 text-center z-50 fixed top-0">
      <img className="h-8 md:h-12 mt-2 md:mt-0 md:pl-4" src="/logo.png" alt="Logo" />
      <ul className="hidden md:flex pr-4 justify-end items-center overflow-hidden">
        <NavLink href="#home">Home</NavLink>
        <NavLink href="#about">About</NavLink>
        <NavLink href="#skills">Skills</NavLink>
        <NavLink href="#projects">Projects</NavLink>
        <NavLink href="#contact">Contact</NavLink>
      </ul>
      <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
    </nav>
  );
}
