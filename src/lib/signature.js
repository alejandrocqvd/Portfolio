import { readFileSync } from "node:fs";
import path from "node:path";

// Server-only: public/misc/signature.svg is one recorded pen stroke (scripts/signature-recorder.html), in writing order,
// already cropped by its viewBox. Used by the footer.
const svg = readFileSync(path.join(process.cwd(), "public/misc/signature.svg"), "utf8");

export const signature = svg.match(/ d="([^"]+)"/)[1];
export const signatureViewBox = svg.match(/viewBox="([^"]+)"/)[1];
