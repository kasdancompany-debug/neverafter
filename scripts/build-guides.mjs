// Renders the print-designed HTML guides in /guides to PDFs in /public/guides.
// Uses a locally installed Chromium browser (Edge or Chrome) in headless mode.
//   npm run guides
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const guides = [{ source: "guides/starter-guide.html", output: "public/guides/ontario-separation-starter-guide.pdf" }];

const candidates = [
  process.env.CHROME_PATH,
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].filter(Boolean);

const browser = candidates.find((p) => existsSync(p));
if (!browser) {
  console.error("No Chrome or Edge found. Set CHROME_PATH to a Chromium-based browser.");
  process.exit(1);
}

mkdirSync("public/guides", { recursive: true });
for (const g of guides) {
  execFileSync(
    browser,
    [
      "--headless=new",
      "--disable-gpu",
      "--no-pdf-header-footer",
      "--virtual-time-budget=10000",
      "--run-all-compositor-stages-before-draw",
      `--print-to-pdf=${resolve(g.output)}`,
      pathToFileURL(resolve(g.source)).href,
    ],
    { stdio: "ignore" },
  );
  console.log(`✓ ${g.output}`);
}
