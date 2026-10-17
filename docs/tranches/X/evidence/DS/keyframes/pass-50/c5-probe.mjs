// X-DS keyframes r8 pass 5 (critic C5p) — served falsifier for KF-C5p-06 (the easing stage drawer's fold) and the
// measurement behind KF-C5p-07 (the square's reach at 390). Headless real Chrome (§0ei); one browser, closed in finally.
// Pass rule (KF-C5p-06): at rest, no catalogue heading crosses the drawer's fold, and a tile the fold crosses shows
// either nothing, the designed peek (>= the drawer's scroll-padding-block-end, so never a hairline) wholly inside
// glass's end fade (<= --fade-scroll-width), or at least half of itself.
import fs from "node:fs"; import path from "node:path"; import { createRequire } from "node:module"; import { fileURLToPath } from "node:url";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = process.argv[2] ?? path.join(HERE, "c5-probe.json");
const BASE = "http://localhost:5173/";
const rep = { fails: [], cells: {} };
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  for (const scheme of ["light", "dark"]) for (const [w, h] of [[1440, 900], [1280, 800], [390, 844], [390, 700]]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: scheme });
    const page = await ctx.newPage();
    try {
      await page.goto(`${BASE}#/easing`, { waitUntil: "load" }); await page.waitForTimeout(3500);
      const m = await page.evaluate(() => {
        const d = document.querySelector(".easing-target .specimen-drawer");
        const b = d.getBoundingClientRect(); const fold = b.top + d.clientTop + d.clientHeight;
        const fade = parseFloat(getComputedStyle(d).getPropertyValue("--fade-end")) || 0; const peek = parseFloat(getComputedStyle(d).scrollPaddingBlockEnd) || 0;
        const crossing = [...d.querySelectorAll(".catalogue-family, .specimen-tile")].map((e) => { const r = e.getBoundingClientRect(); return { k: (e.classList.contains("catalogue-family") ? "H:" : "T:") + e.textContent.trim().slice(0, 16), top: r.top, h: r.height }; })
          .filter((r) => r.top < fold - 0.5 && r.top + r.h > fold + 0.5).map((r) => ({ ...r, shown: Math.round((fold - r.top) * 10) / 10 }));
        return { fold: Math.round(fold), fade, peek, scrollTop: d.scrollTop, maxBlockSize: d.style.maxBlockSize, crossing };
      });
      rep.cells[`easing-${w}x${h}-${scheme}`] = m;
      for (const c of m.crossing) {
        const bad = c.k.startsWith("H:") || (c.shown > m.fade + 0.5 && c.shown < c.h / 2) || (c.shown > 0.5 && c.shown < m.peek - 0.5);
        if (bad) rep.fails.push(`easing ${w}x${h} ${scheme}: ${c.k} shows ${c.shown}px at the fold (peek ${m.peek}px, fade ${m.fade}px, row ${Math.round(c.h)}px)`);
      }
      if (h === 844 || h === 900) {
        await page.goto(`${BASE}#/square`, { waitUntil: "load" }); await page.waitForTimeout(3000);
        rep.cells[`square-${w}-${scheme}`] = await page.evaluate(() => {
          const f = document.querySelector(".square-field").getBoundingClientRect();
          const box = document.querySelector(".demo-box").getBoundingClientRect();
          const ar = document.querySelector(".square-arena"); const a = ar.getBoundingClientRect();
          const pad = parseFloat(getComputedStyle(ar).getPropertyValue("--stage-plate-pad-inline")) * parseFloat(getComputedStyle(document.documentElement).fontSize);
          return { field: Math.round(f.width), box: Math.round(box.width), reach: Math.round(f.width + box.width), arena: Math.round(a.width), innerMeasure: Math.round(a.width - 2 * pad) };
        });
      }
    } finally { await ctx.close(); }
  }
} finally { await browser.close(); fs.writeFileSync(OUT, JSON.stringify(rep, null, 1)); console.log(JSON.stringify({ fails: rep.fails }, null, 1)); }
