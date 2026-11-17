import "server-only";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/** Logo files as data URLs, for generated images (Open Graph) that can't load relative URLs. */
export async function logoDataUrl(tone: "dark" | "light") {
  const file = tone === "dark" ? "never-after-logo.png" : "never-after-logo-light.png";
  const buf = await readFile(join(process.cwd(), "public", "brand", file));
  return `data:image/png;base64,${buf.toString("base64")}`;
}

/** Logo artwork is 960 × 339. */
export const LOGO_RATIO = 960 / 339;
