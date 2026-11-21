"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { Link } from "next-view-transitions";
import { routes } from "@/lib/site";
import CommandMenu from "@/components/CommandMenu";
import DisplayToggle from "@/components/DisplayToggle";

const [home, about, projects, contact] = routes;

// ==============================================================================================================
function NavLink({ route }) {
  const pathname = usePathname();

  return (
    <Link
      href={route.href}
      aria-current={pathname === route.href ? "page" : undefined}
      className="link py-1 text-muted transition-colors hover:text-ink aria-[current=page]:text-ink"
    >
      {route.label}
    </Link>
  );
}

// ==============================================================================================================
function Logo() {
  return (
    <Link href="/" aria-label="Alejandro Cardona, home" className="logo-slot flex shrink-0 items-center rounded-control">
      <Image
        src="/misc/logo_white.svg"
        alt=""
        width={32}
        height={32}
        priority
        className="transition-transform duration-150 ease-out hover:scale-105 [:root[data-theme=light]_&]:invert"
      />
    </Link>
  );
}

// ==============================================================================================================
export default function Navbar() {
  return (
    <header className="nav-vt absolute inset-x-0 top-0 z-40">
      <nav aria-label="Main" className="relative mx-auto flex h-20 max-w-screen-2xl items-center justify-center px-4 text-sm md:px-6">
        {/* 1fr | auto | 1fr keeps the logo at the exact centre whatever the link widths or font */}
        <div className="grid w-full grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-x-3 sm:gap-x-10">
          <div className="flex justify-end gap-3 sm:gap-10">
            <NavLink route={home} />
            <NavLink route={about} />
          </div>
          <Logo />
          <div className="flex justify-start gap-3 sm:gap-10">
            <NavLink route={projects} />
            <NavLink route={contact} />
          </div>
        </div>

        <div className="absolute right-6 hidden items-center gap-1 md:flex">
          <CommandMenu />
          <DisplayToggle />
        </div>
      </nav>
    </header>
  );
}
