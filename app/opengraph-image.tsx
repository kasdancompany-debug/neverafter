import { ImageResponse } from "next/og";
import { LOGO_RATIO, logoDataUrl } from "@/lib/brand-assets";

export const alt = "Never After — The fairytale ends. Life doesn't.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const logo = await logoDataUrl("light");
  const h = 150;
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
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} alt="" width={Math.round(h * LOGO_RATIO)} height={h} />
        <div style={{ display: "flex", flexDirection: "column", fontSize: 76, lineHeight: 1.05, fontFamily: "serif" }}>
          <span>The fairytale ends.</span>
          <span style={{ color: "#C4AC8A" }}>Life doesn&apos;t.</span>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "rgba(245,241,233,0.7)", fontFamily: "sans-serif" }}>
          Divorce, separation & family law — explained. Ontario, Canada.
        </div>
      </div>
    ),
    size,
  );
}
