"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

// ==============================================================================================================
// Copies `value` and confirms with a check for a moment (and to screen readers through a live region).
export default function CopyButton({ value, label, confirmation }) {
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
      className="relative z-10 -m-1.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-control text-muted transition-colors duration-150 ease-out hover:bg-ink/[0.06] hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
    >
      {copied ? <Check size={15} className="text-accent" aria-hidden /> : <Copy size={15} aria-hidden />}
      <span aria-live="polite" className="sr-only">
        {copied ? confirmation : ""}
      </span>
    </button>
  );
}
