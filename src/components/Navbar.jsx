"use client";

import Image from 'next/image';
import { Link } from 'next-view-transitions'

function NavLink({ href, children }) {
  return (
    <Link
      href={href}
      className="block m-2 md:m-5 mx-1 md:mx-8 box-border text-center no-underline hover-underline-animation"
    >
      {children}
    </Link>
  );
}

export default function Navbar() {
  return (
    <nav
      className="absolute top-0 sm:my-4 w-screen sm:w-auto items-center py-4 px-2 md:px-6 text-center z-50 rounded-xl left-1/2 -translate-x-1/2"
    >
      <div className="flex w-full items-center justify-center gap-8">
        <div className="flex justify-between items-center text-sm">
          <div className="flex justify-center items-center h-8 w-20 sm:w-28">
            <NavLink href="/">Home</NavLink>
          </div>
          <div className="flex justify-center items-center h-8 w-20 sm:w-28">
            <NavLink href="/about">About</NavLink>
          </div>
        </div>

        <Link href="/" className="flex items-center justify-center">
          <Image 
            src="/misc/logo_white.svg" 
            alt="Logo"
            width={36}
            height={36}
            className="scale-100 md:hover:scale-105"
            priority
          />  
        </Link>

        <div className="flex justify-between items-center text-sm">
          <div className="flex justify-center items-center h-8 w-20 sm:w-28">
            <NavLink href="/projects">Projects</NavLink>
          </div>
          <div className="flex justify-center items-center h-8 w-20 sm:w-28">
            <NavLink href="/contact">Contact</NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
