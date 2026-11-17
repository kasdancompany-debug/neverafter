import { ImageResponse } from "next/og";
import { categoryLabel, getAllArticles, getArticle } from "@/lib/content";
import { LOGO_RATIO, logoDataUrl } from "@/lib/brand-assets";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Never After article";

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

/** Per-article social preview image: category, headline, brand. */
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = getArticle(slug);
  const title = a?.title ?? "Never After";
  const logo = await logoDataUrl("dark");
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#FAF9F6", padding: 72, borderTop: "14px solid #182B30" }}>
        <div style={{ display: "flex", fontSize: 24, letterSpacing: 4, color: "#7A6040", fontFamily: "sans-serif", textTransform: "uppercase" }}>
          {a ? categoryLabel(a.category) : "Ontario family law"}
        </div>
        <div style={{ display: "flex", fontSize: title.length > 60 ? 62 : 74, lineHeight: 1.08, color: "#182B30", fontFamily: "serif", letterSpacing: -1 }}>{title}</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "sans-serif" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo} alt="" width={Math.round(70 * LOGO_RATIO)} height={70} />
          <div style={{ display: "flex", fontSize: 22, color: "#5E6669" }}>Ontario family law, explained</div>
        </div>
      </div>
    ),
    size,
  );
}
