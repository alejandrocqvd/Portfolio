"use client";

import { useEffect, useRef, useState } from "react";

const greetings = [
  { text: "Hello", lang: "en", name: "English" },
  { text: "Bonjour", lang: "fr", name: "French" },
  { text: "Hola", lang: "es", name: "Spanish" },
  { text: "Oki", lang: "bla", name: "Blackfoot" },
  { text: "Olá", lang: "pt", name: "Portuguese" },
  { text: "Hej", lang: "sv", name: "Swedish" },
  { text: "Hallo", lang: "de", name: "German" },
  { text: "Kumusta", lang: "tl", name: "Tagalog" },
  { text: "Xin chào", lang: "vi", name: "Vietnamese" },
  { text: "こんにちは", lang: "ja", name: "Japanese" },
  { text: "你好", lang: "zh", name: "Chinese" },
  { text: "안녕하세요", lang: "ko", name: "Korean" },
  { text: "नमस्ते", lang: "hi", name: "Hindi", whole: true },
  { text: "مرحبا", lang: "ar", name: "Arabic", whole: true, dir: "rtl" },
];

const HOLD = 2200;

// English first, the rest shuffled, ending back on English after one loop.
function sequence() {
  const rest = greetings.slice(1);
  for (let i = rest.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [rest[i], rest[j]] = [rest[j], rest[i]];
  }
  return [greetings[0], ...rest, greetings[0]];
}

// ==============================================================================================================
// Joined scripts (Devanagari conjuncts, Arabic) roll as one piece; everything else rolls per character.
function Word({ item, out }) {
  const pieces = item.whole ? [item.text] : [...item.text];

  return (
    <span lang={item.lang} dir={item.dir} title={item.name} className="col-start-1 row-start-1 whitespace-pre">
      {pieces.map((piece, i) => (
        <span key={i} className={`inline-block ${out ? "roll-out" : "roll-in"}`} style={{ animationDelay: `${i * 25}ms` }}>
          {piece}
        </span>
      ))}
    </span>
  );
}

// ==============================================================================================================
export default function Greeting() {
  const [words, setWords] = useState([greetings[0]]);
  const [step, setStep] = useState(0);
  const paused = useRef(false);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const order = sequence();
    setWords(order);
    greetings.forEach((g) => document.fonts?.load(`1em "Hello Script"`, g.text).catch(() => {}));

    const intro = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--intro")) || 0;
    let interval;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        if (paused.current || document.hidden) return;
        setStep((s) => {
          if (s + 1 >= order.length - 1) clearInterval(interval);
          return Math.min(s + 1, order.length - 1);
        });
      }, HOLD);
    }, intro * 1000);

    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, []);

  const current = words[step];
  const previous = step > 0 ? words[step - 1] : null;

  return (
    <p
      className="text-lg text-muted md:text-xl"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
    >
      <span className="sr-only">Hello, I’m</span>
      <span aria-hidden>
        <span className="inline-grid overflow-hidden align-bottom">
          {previous && <Word key={`out-${step}`} item={previous} out />}
          <Word key={`in-${step}`} item={current} />
        </span>
        , I’m
      </span>
    </p>
  );
}
