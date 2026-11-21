import { readFileSync } from "node:fs";
import path from "node:path";
import Image from "next/image";

// The signature is a filled auto-trace, so it is revealed through hand-traced pen strokes (a mask) in writing order.
const signature = readFileSync(path.join(process.cwd(), "public/misc/signature.svg"), "utf8").match(/ d="([^"]+)"/)[1];

// [path, start (s), duration (s)]
const strokes = [
  ["M130,169 L172,140 L205,120 L232,103 L250,96 L262,82 L280,66 L296,51", 0.35, 0.16],
  ["M322,41 L300,44 L270,46 L240,51 L205,58 L178,66 L160,77 L151,92 L158,102 L200,100 L300,97 L400,96 L520,96", 0.53, 0.32],
  ["M270,130 L276,112 L284,94 L294,74 L304,57 L316,40 L328,25 L338,15", 0.87, 0.1],
  ["M341,20 L331,40 L320,55 L310,68 L302,82 L299,92", 0.99, 0.07],
  ["M282,116 L295,101 L305,102 L310,107 L296,121 L280,131 L271,130", 1.08, 0.08],
  [
    "M312,108 L317,120 L330,117 L340,107 L328,100 L324,106 L340,115 L346,122 L360,120 L385,110 L396,100 L378,120 L368,137 L364,153 L375,150 L390,139 L402,125 L413,110 L421,102 L426,107 L437,102 L450,105 L448,117 L456,121 L470,116 L478,112 L477,105 L490,104 L495,110 L486,117 L482,115 L486,124 L496,124 L511,115 L527,107",
    1.18,
    0.3,
  ],
  ["M330,47 L400,44 L460,37 L500,34 L550,36 L578,38 L585,32 L593,33 L596,40", 1.5, 0.16],
  [
    "M520,96 L535,82 L552,62 L567,47 L582,38 L610,42 L650,50 L656,60 L645,77 L625,92 L610,102 L585,115 L550,126 L535,125 L531,112 L540,100 L550,96 L604,96 L632,94 L660,98 L710,101 L760,105 L818,113",
    1.68,
    0.36,
  ],
];

// ==============================================================================================================
export default function Loader() {
  return (
    <div aria-hidden className="intro">
      <div className="intro-track">
        <Image src="/misc/logo_white.svg" alt="" width={32} height={32} priority className="intro-logo" />
      </div>

      <svg viewBox="120 8 700 170" className="intro-signature">
        <defs>
          <mask id="intro-pen" maskUnits="userSpaceOnUse" x="0" y="0" width="818" height="198">
            {strokes.map(([d, delay, duration]) => (
              <path
                key={d}
                d={d}
                pathLength="1"
                className="intro-stroke"
                style={{ animationDelay: `${delay}s`, animationDuration: `${duration}s` }}
              />
            ))}
          </mask>
        </defs>
        <path d={signature} fill="currentColor" mask="url(#intro-pen)" />
        {/* Unmasked copy fades in at the end so any pixel the traced pen missed still appears. */}
        <path d={signature} fill="currentColor" className="intro-fill" />
      </svg>
    </div>
  );
}
