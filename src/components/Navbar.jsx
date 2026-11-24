"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Link } from "next-view-transitions";
import { routes } from "@/lib/site";
import CommandMenu from "@/components/CommandMenu";
import DisplayToggle from "@/components/DisplayToggle";

// ==============================================================================================================
// A plain click on a link to the current page would replay the page transition, so it does nothing instead.
// Modified clicks (new tab, new window) still work.
function stayOnPage(pathname, href) {
  return (event) => {
    if (pathname === href && !(event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)) event.preventDefault();
  };
}

// ==============================================================================================================
function NavLink({ route }) {
  const pathname = usePathname();

  return (
    <Link
      href={route.href}
      onClick={stayOnPage(pathname, route.href)}
      aria-current={pathname === route.href ? "page" : undefined}
      className="link py-1 text-muted transition-colors hover:text-ink aria-[current=page]:text-ink"
    >
      {route.label}
    </Link>
  );
}

// ==============================================================================================================
function Logo() {
  const pathname = usePathname();

  return (
    <Link href="/" onClick={stayOnPage(pathname, "/")} aria-label="Alejandro Cardona, home" className="logo-slot flex shrink-0 items-center rounded-control">
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
// The intro belongs to the full page load. Once the user navigates client-side, mark it done so anything timed off
// --intro (year-track bars, Greeting, hero rule) runs at once, even when the load didn't start on Home.
function useIntroDoneOnNavigate() {
  const pathname = usePathname();
  const first = useRef(pathname);

  useEffect(() => {
    if (pathname !== first.current) document.documentElement.dataset.intro = "skip";
  }, [pathname]);
}

// ==============================================================================================================
export default function Navbar() {
  useIntroDoneOnNavigate();

  return (
    <header className="nav-vt absolute inset-x-0 top-0 z-40 font-mono">
      {/* Same frame as the footer (max-w-5xl, px-6, xl:px-0). Mirrored by .intro-logo's --slot in globals.css,
          because the intro logo lands on Logo. */}
      <nav aria-label="Main" className="mx-auto flex h-20 w-full max-w-5xl items-center justify-between gap-6 px-6 text-sm xl:px-0">
        <div className="flex items-center gap-5 sm:gap-10">
          <Logo />
          <div className="flex gap-4 sm:gap-8">
            {routes.map((route) => (
              <NavLink key={route.href} route={route} />
            ))}
          </div>
        </div>

        {/* On small screens these live in the footer. */}
        <div className="-mr-2 hidden items-center gap-1 md:flex">
          <CommandMenu />
          <DisplayToggle />
        </div>
      </nav>
    </header>
  );
}
