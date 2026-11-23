"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

const iconButton =
  "relative z-10 -m-1.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-control text-muted transition-colors duration-150 ease-out hover:bg-ink/[0.06] hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent";

// ==============================================================================================================
// Copies `value` and confirms with a check for a moment (and to screen readers through a live region).
// Icon-only by default; pass `className` and `children` for a labelled button.
export default function CopyButton({ value, label, confirmation, className = iconButton, children }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={label}
      title={label}
      className={className}
    >
      {copied ? <Check size={15} className="text-accent" aria-hidden /> : <Copy size={15} aria-hidden />}
      {children}
      <span aria-live="polite" className="sr-only">
        {copied ? confirmation : ""}
      </span>
    </button>
  );
}
