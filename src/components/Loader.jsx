import { readFileSync } from "node:fs";
import path from "node:path";

// The logo's paths: 0 is the A, then the aperture's 8 blades (listed below clockwise from the top). Coordinates are
// trimmed to one decimal: the auto-trace's 8 decimals only add bytes to every page.
const logoPaths = [
  ...readFileSync(path.join(process.cwd(), "public/misc/logo_white.svg"), "utf8").matchAll(/<path d="([^"]*)"[^>]*transform="([^"]+)"/g),
].map(([, d, transform]) => ({ d: d.replace(/(\.\d)\d+/g, "$1"), transform }));
const letter = logoPaths[0];
const blades = [1, 7, 8, 2, 4, 5, 6, 3].map((i) => logoPaths[i]);

// ==============================================================================================================
export default function Loader() {
  return (
    <div aria-hidden className="intro">
      {/* One lit blade steps clockwise; the A fades in, then every blade lights and the logo glows (timing in globals.css). */}
      <svg viewBox="0 0 250 250" fill="currentColor" className="intro-logo">
        {blades.map((blade, i) => (
          <path key={i} {...blade} className="intro-blade" style={{ "--i": i }} />
        ))}
        <path {...letter} className="intro-a" />
      </svg>
    </div>
  );
}
