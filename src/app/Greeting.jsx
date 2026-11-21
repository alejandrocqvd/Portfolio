"use client";

import { useEffect, useRef, useState } from "react";

// Each phrase ends where the name (the h1 below) continues it, so "I'm" follows that language's word order.
const greetings = [
  { text: "Hello, I'm", lang: "en", name: "English" },
  { text: "Bonjour, je suis", lang: "fr", name: "French" },
  { text: "Hola, soy", lang: "es", name: "Spanish" },
  { text: "Oki, nitaniko", lang: "bla", name: "Blackfoot" },
  { text: "Olá, eu sou", lang: "pt", name: "Portuguese" },
  { text: "Hej, jag är", lang: "sv", name: "Swedish" },
  { text: "Hallo, ich bin", lang: "de", name: "German" },
  { text: "Kumusta, ako si", lang: "tl", name: "Tagalog" },
  { text: "Xin chào, tôi là", lang: "vi", name: "Vietnamese" },
  { text: "こんにちは、私は", lang: "ja", name: "Japanese" },
  { text: "你好，我是", lang: "zh", name: "Chinese" },
  { text: "안녕하세요, 저는", lang: "ko", name: "Korean" },
  { text: "नमस्ते, मैं", lang: "hi", name: "Hindi", whole: true },
  { text: "مرحبا، أنا", lang: "ar", name: "Arabic", whole: true, dir: "rtl" },
];

const HOLD = 2200;

// English first, then the rest shuffled; the loop repeats this order forever.
function sequence() {
  const rest = greetings.slice(1);
  for (let i = rest.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [rest[i], rest[j]] = [rest[j], rest[i]];
  }
  return [greetings[0], ...rest];
}

// ==============================================================================================================
// Joined scripts (Devanagari conjuncts, Arabic) roll as one piece; everything else rolls per character. text-left keeps
// right-to-left phrases (Arabic) flush with the name below instead of against the far edge of the greeting's box.
function Word({ item, out }) {
  const pieces = item.whole ? [item.text] : [...item.text];

  return (
    <span lang={item.lang} dir={item.dir} title={item.name} className="col-start-1 row-start-1 whitespace-pre text-left">
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
        setStep((s) => s + 1);
      }, HOLD);
    }, intro * 1000);

    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, []);

  // step only counts up (it keys the roll animation); the word wraps around the order.
  const current = words[step % words.length];
  const previous = step > 0 ? words[(step - 1) % words.length] : null;

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
      </span>
    </p>
  );
}
