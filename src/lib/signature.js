import { readFileSync } from "node:fs";
import path from "node:path";

// Server-only: the path data of public/misc/signature.svg (a filled auto-trace, one path), used by the intro and the footer.
export const signature = readFileSync(path.join(process.cwd(), "public/misc/signature.svg"), "utf8").match(/ d="([^"]+)"/)[1];

// Crop around the ink of the 818×198 trace.
export const signatureViewBox = "120 8 700 170";
