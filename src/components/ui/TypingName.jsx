import React, { useState, useEffect } from "react";

export default function TypingName() {
  const text = "Alejandro Cardona";
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;

    function typeNextChar() {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));

        // base speed (fast at start)
        let baseDelay = 20;

        // make it progressively slower → add more delay as i increases
        let delay = baseDelay + i * 7;

        i++;
        setTimeout(typeNextChar, delay);
      }
    }

    typeNextChar();
  }, []);

  return (
    <p className="text-4xl md:text-5xl font-[250] text-center md:text-left w-full font-mono fade-up-fast">
      {displayed}
      <span className="animate-blink">|</span>
    </p>
  );
}
