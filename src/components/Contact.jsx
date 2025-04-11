/* eslint-disable @next/next/no-img-element */
"use client"
import { FaEnvelope, FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { HiDocumentText } from "react-icons/hi"; // For the CV icon

export default function ContactSection() {
  return (
    <>
      <div id="contact"></div>
      <div className="flex flex-col w-screen xl:w-full justify-center items-center bg-[#242327]">
        <div className="w-9/12 xl:w-8/12 pt-14 mb-6 xl:px-16 max-w-7xl">
          <div className="flex flex-col xl:flex-row w-full justify-center items-center xl:items-start mb-14">
            <div className="flex flex-col w-full">
              <p className="text-sm font-[300] text-left mb-2 text-[#858585]">CONTACT</p>
              <p className="text-3xl xl:text-5xl font-mono font-[300] flex-1 text-center xl:text-left mb-8 xl:mb-0">Get in touch</p> 
            </div>
            <div>
              <div className="flex flex-col text-md xl:text-2xl text-center xl:text-right">
                <a href="mailto:alejandrocqvd@gmail.com" className="flex items-center justify-center xl:justify-end mt-4 hover:text-[#666666]">
                  <span>alejandrocqvd@gmail.com</span>
                  <FaEnvelope className="ml-4" />
                </a>
                <a href="/misc/Alejandro-Cardona-Resume.pdf" target="_blank" className="flex items-center justify-center xl:justify-end mt-4 hover:text-[#666666]">
                  <span>CV</span>
                  <HiDocumentText className="ml-4" />
                </a>
                <a href="https://github.com/alejandrocqvd" target="_blank" className="flex items-center justify-center xl:justify-end mt-4 hover:text-[#666666]">
                  <span>Github</span>
                  <FaGithub className="ml-4" />
                </a>
                <a href="https://www.linkedin.com/in/alejandro-cardonaq" target="_blank" className="flex items-center justify-center xl:justify-end mt-4 hover:text-[#666666]">
                  <span>LinkedIn</span>
                  <FaLinkedin className="ml-4" />
                </a>
                <a href="https://www.instagram.com/arepandro/" target="_blank" className="flex items-center justify-center xl:justify-end mt-4 hover:text-[#666666]">
                  <span>Instagram</span>
                  <FaInstagram className="ml-4" />
                </a> 
              </div>
            </div>
          </div>
          <p className="text-sm font-mono text-center">Portfolio of Alejandro Cardona - Last Updated: April 2025</p>
        </div>
      </div>
    </>
  );
}
