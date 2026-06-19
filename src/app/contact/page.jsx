import React from "react"
import Image from "next/image"
import Contact from '../../components/Footer';
import { ArrowUpRight, Mail, Github, Linkedin, FileText } from "lucide-react"

import jiji from "../../../public/about/jiji.png";

const contactLinks = [
  {
    number: "01",
    label: "Email",
    value: "alejandrocqvd@gmail.com",
    href: "mailto:alejandrocqvd@gmail.com",
    icon: <Mail className="w-4 h-4" />,
  },
  {
    number: "02",
    label: "LinkedIn",
    value: "linkedin.com/in/alejandro-cardonaq",
    href: "https://www.linkedin.com/in/alejandro-cardonaq",
    icon: <Linkedin className="w-4 h-4" />,
  },
  {
    number: "03",
    label: "GitHub",
    value: "github.com/alejandrocqvd",
    href: "https://github.com/alejandrocqvd",
    icon: <Github className="w-4 h-4" />,
  },
  {
    number: "04",
    label: "Resume",
    value: "View my resume",
    href: "/misc/Alejandro-Cardona-Resume.pdf",
    icon: <FileText className="w-4 h-4" />,
  },
]

export function Page() {
  return (
    <>
      <section className="flex flex-col justify-center items-center mt-32 md:mt-44 w-full mx-auto max-w-4xl px-6">
        <h2 className="font-mono text-left mx-auto w-full text-4xl mb-8 fade-up-first">
          Get In Touch
        </h2>

        <p className="text-sm text-left w-full md:mb-12 text-muted-foreground fade-up-first">
          Feel free to reach out if you want to chat about anything. I&apos;m always open to new opportunities and conversations :D
        </p>

        <div className="flex flex-col md:flex-row gap-16 md:gap-16 w-full mb-20 h-[320px]">
          <div className="md:w-2/5 md:h-full">
            <Image
              src={jiji}
              alt="Jiji the black cat sitting on a laptop"
              width={400}
              height={400}
              placeholder="blur"
              className="hidden md:block rounded-lg object-cover w-full h-full fade-up-first"
            />
          </div>

          <div className="md:w-3/5 h-full flex flex-col justify-between">
            {contactLinks.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                style={{ animationDelay: `${0.5 + i * 0.1}s` }}
                rel={
                  link.href.startsWith("mailto:")
                    ? undefined
                    : "noopener noreferrer"
                }
                className="group flex flex-1 items-center justify-between px-3 border-t border-border last:border-b transition-colors hover:bg-secondary/30 fade-up-second"
              >
                <div className="flex items-center gap-5">
                  <span className="text-white group-hover:text-white/50 transition-colors">
                    {link.icon}
                  </span>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-mono text-sm font-bold text-white group-hover:text-white/50 transition-colors">
                      {link.label}
                    </span>
                    <span className="text-xs text-muted-white group-hover:text-white/50 transition-colors">
                      {link.value}
                    </span>
                  </div>
                </div>

                <ArrowUpRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-white/50 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            ))}
          </div>
        </div>
      </section>
      <Contact />
    </>
  )
}

export default Page
