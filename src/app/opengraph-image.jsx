import { ImageResponse } from "next/og";

// The preview card shown when a link to the site is shared. Rendered once at build time and used by every page.
export const alt = "Alejandro Cardona, software engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 96px",
          background: "#0D0E10",
          color: "#ECEEF0",
        }}
      >
        <div style={{ fontSize: 88, fontWeight: 600, letterSpacing: "-0.03em" }}>Alejandro Cardona</div>
        <div style={{ marginTop: 20, fontSize: 36, color: "#9EA4AB" }}>Software engineer · University of Calgary</div>
        <div style={{ marginTop: 64, height: 2, width: 160, background: "#57D3C4" }} />
        <div style={{ marginTop: 32, fontSize: 32, color: "#57D3C4" }}>acardona.ca</div>
      </div>
    ),
    size,
  );
}
