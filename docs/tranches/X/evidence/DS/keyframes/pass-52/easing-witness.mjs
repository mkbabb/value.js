// KF-C7-03 witness: the easing stage drawer's last row above the fold at 390x844 and 1440x900, both schemes
// (a heading is never the last thing above the fold). Headless real Chrome (§0ei); one browser, closed in finally.
import fs from "node:fs"; import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const OUT = process.argv[2]; const rep = { fails: [], cells: {} };
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  for (const scheme of ["light", "dark"]) for (const [w, h] of [[390, 844], [390, 700], [1440, 900], [1280, 800]]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: scheme, deviceScaleFactor: w === 390 ? 2 : 1 });
    const page = await ctx.newPage();
    try {
      await page.goto("http://localhost:5173/#/easing", { waitUntil: "load" }); await page.waitForTimeout(3500);
      const m = await page.evaluate(() => {
        const d = document.querySelector(".catalogue-family")?.closest(".fading-scroll"); if (!d) return null;
        const b = d.getBoundingClientRect(); const fold = b.top + d.clientTop + d.clientHeight;
        const rows = [...d.querySelectorAll(".catalogue-family, .specimen-tile")].map((e) => { const r = e.getBoundingClientRect(); return { kind: e.classList.contains("catalogue-family") ? "heading" : "tile", text: e.textContent.trim().slice(0, 18), top: Math.round(r.top * 10) / 10, bottom: Math.round(r.bottom * 10) / 10 }; });
        const above = rows.filter((x) => x.top < fold - 0.5);
        return { fold: Math.round(fold * 10) / 10, maxBlockSize: d.style.maxBlockSize, lastAbove: above[above.length - 1] };
      });
      rep.cells[`easing-${w}x${h}-${scheme}`] = m;
      if (m?.lastAbove?.kind === "heading") rep.fails.push(`${w}x${h} ${scheme}: heading '${m.lastAbove.text}' rests on the fold (${m.lastAbove.top}-${m.lastAbove.bottom}, fold ${m.fold}) with no row under it`);
    } finally { await ctx.close(); }
  }
} finally { await browser.close(); if (OUT) fs.writeFileSync(OUT, JSON.stringify(rep, null, 1)); console.log(JSON.stringify(rep.fails)); }
