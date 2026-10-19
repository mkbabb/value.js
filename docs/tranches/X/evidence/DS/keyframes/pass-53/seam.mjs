// X-DS keyframes r8 pass 8 — KF-C8-02 witness: home and cube at 390x844 (DPR 2), both schemes; the die's frame
// plus a 3x crop of the top/left face edge. Headless real Chrome (§0ei); one browser, closed in finally.
import path from "node:path"; import { createRequire } from "node:module"; import { fileURLToPath } from "node:url";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const OUT = process.argv[2] ?? path.join(path.dirname(fileURLToPath(import.meta.url)), "after");
const BASE = process.env.BASE ?? "http://localhost:5193/";
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  for (const scheme of ["light", "dark"]) {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, colorScheme: scheme, deviceScaleFactor: 2 });
    const page = await ctx.newPage();
    try {
      await page.goto(`${BASE}#/`, { waitUntil: "load" }); await page.waitForTimeout(3500);
      await page.screenshot({ path: path.join(OUT, `seam-home-390-${scheme}.png`), clip: { x: 90, y: 290, width: 120, height: 80 }, scale: "device" });
    } finally { await ctx.close(); }
  }
} finally { await browser.close(); }
