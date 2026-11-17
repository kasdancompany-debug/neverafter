import { ImageResponse } from "next/og";

export const alt = "Never After — The fairytale ends. Life doesn't.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#182B30",
          color: "#F5F1E9",
          padding: 72,
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, letterSpacing: 4 }}>
          NEVER AFTER<span style={{ color: "#C4AC8A" }}>.</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 92, lineHeight: 1 }}>
          <span>The fairytale ends.</span>
          <span style={{ color: "#C4AC8A", fontStyle: "italic" }}>Life doesn&apos;t.</span>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "rgba(245,241,233,0.7)", fontFamily: "sans-serif" }}>
          Divorce, Separation & Family Law — Explained. Ontario, Canada.
        </div>
      </div>
    ),
    size,
  );
}
