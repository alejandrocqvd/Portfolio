"use client";

import { Moon, Sun } from "lucide-react";
import { toggleMono, toggleTheme, useDisplay } from "@/lib/display";

const control =
  "flex h-8 items-center justify-center rounded-control px-2 text-muted transition-colors duration-150 ease-out hover:text-ink active:scale-[0.97]";

// ==============================================================================================================
export default function DisplayToggle() {
  const display = useDisplay();

  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={(event) => toggleTheme(event.currentTarget)}
        aria-label={display?.theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
        title="Toggle theme"
        className={`${control} w-8`}
      >
        <Sun size={16} className="only-dark" aria-hidden />
        <Moon size={16} className="only-light" aria-hidden />
      </button>

      <button
        type="button"
        onClick={toggleMono}
        aria-pressed={display ? display.mono : undefined}
        title="Toggle monospace"
        className={`${control} font-mono text-xs aria-pressed:text-accent`}
      >
        Mono
      </button>
    </div>
  );
}
