// X-DS keyframes pass 9 (critic C9r) — reading + AFTER frames. Headless real Chrome only (§0ei).
// Nothing was cured in the consumer this pass; this reads the rows as they stand:
// KF-C9r-G1  the resting stage plates' material (backdrop-filter, box-shadow layers, the glass class that carries them) — glass-owned, cited O-87.
// KF-C9r-01  the selected Spring preset tile (dashed violet, U-K17) — stands until O-59 / the owner.
// KF-C9r-02  the Sampled curve's fixed ceiling (PLOT_CEILING, test-pinned L-14) — kept as the preset-comparison domain.
// KF-C9r-03  the phone Square plate geometry — owner layout DESIGN-RULING (frames only).
import fs from "node:fs"; import path from "node:path"; import { createRequire } from "node:module"; import { fileURLToPath } from "node:url";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, "after"); fs.mkdirSync(OUT, { recursive: true });
const BASE = "http://localhost:5173/"; const SETTLE = 4000;
const rep = { cells: {} };
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  for (const scheme of ["light", "dark"]) for (const [w, h] of [[1440, 900], [390, 844]]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: scheme, deviceScaleFactor: 2 });
    for (const route of ["square", "spring", "sequence", "easing"]) {
      const page = await ctx.newPage();
      try {
        await page.goto(`${BASE}#/${route}`, { waitUntil: "load" }); await page.waitForTimeout(SETTLE);
        await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
        rep.cells[`${route}-${w}-${scheme}`] = await page.evaluate(() => {
          const layers = (s) => (s === "none" ? 0 : s.split(/,(?![^(]*\))/).length);
          const plates = [...document.querySelectorAll(".square-stage, .spring-target, .seq-target")].map((e) => {
            const cs = getComputedStyle(e); const glassy = e.closest(".glass-resting");
            return { cls: e.className.toString().slice(0, 80), backdrop: cs.backdropFilter, shadowLayers: layers(cs.boxShadow),
              restingAncestor: glassy ? glassy.className.toString().slice(0, 80) : null };
          });
          const on = document.querySelector('.preset-cell[data-state="on"]');
          const preset = on ? { outlineStyle: getComputedStyle(on).outlineStyle, outlineColor: getComputedStyle(on).outlineColor } : null;
          return { plates, preset };
        });
        await page.screenshot({ path: path.join(OUT, `${route}-${w}-${scheme}.png`) });
      } finally { await page.close(); }
    }
    await ctx.close();
  }
} finally { await browser.close(); }
fs.writeFileSync(path.join(HERE, "c9r-probe.json"), JSON.stringify(rep, null, 2));
console.log(JSON.stringify(rep, null, 1).slice(0, 3000));
