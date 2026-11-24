"use client";

import { Moon, Sun } from "lucide-react";
import { toggleTheme, useTheme } from "@/lib/display";

// ==============================================================================================================
export default function DisplayToggle() {
  const theme = useTheme();

  return (
    <button
      type="button"
      onClick={(event) => toggleTheme(event.currentTarget)}
      aria-label={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
      title="Toggle theme"
      className="flex h-8 w-8 items-center justify-center rounded-control text-muted transition-colors duration-150 ease-out hover:text-ink active:scale-[0.97]"
    >
      <Sun size={16} className="only-dark" aria-hidden />
      <Moon size={16} className="only-light" aria-hidden />
    </button>
  );
}
