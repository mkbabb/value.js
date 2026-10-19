// X-DS keyframes r7 pass 6 — KF-C6-04(a) diagnosis: the Amiga stage geometry at 390 (headless real Chrome, §0ei).
import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await page.goto("http://localhost:5173/#/amiga", { waitUntil: "load" }); await page.waitForTimeout(5000);
  const m = await page.evaluate(() => {
    const r = (e) => { if (!e) return null; const b = e.getBoundingClientRect(); return { t: Math.round(b.top), b: Math.round(b.bottom), l: Math.round(b.left), r: Math.round(b.right) }; };
    const cell = document.querySelector(".stage-cell"); const cs = getComputedStyle(cell);
    return { cell: r(cell), padT: cs.paddingTop, padB: cs.paddingBottom, root: r(document.querySelector(".scene-root")), canvas: r(document.querySelector(".amiga-canvas")),
      dock: r(document.querySelector(".dock-band")), sheet: r(document.querySelector("[data-controls-sheet], .controls-sheet, [role=dialog]")) };
  });
  console.log(JSON.stringify(m, null, 1));
  await page.screenshot({ path: process.argv[2] ?? "amiga-390.png" });
  await page.close(); await ctx.close();
} finally { await browser.close(); }
