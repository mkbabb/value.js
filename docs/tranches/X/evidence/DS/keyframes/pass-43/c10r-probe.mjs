// X-DS keyframes pass 10 (critic C10r) — falsifier + AFTER frames. Headless real Chrome only (§0ei).
// KF-C10r-01  the Spring time-axis foot carries one unit: legend "time · N stops", end tick "<horizon> ms" (FAIL if "(ms)" returns).
// KF-C10r-G1  reading only: the EasingPicker preset Select label while the stage reads `ease` (glass-owned, cited O-87).
// KF-C10r-G2 / -02  frames only (glass-owned, re-judged at the 10.2.0 repin).
import fs from "node:fs"; import path from "node:path"; import { createRequire } from "node:module"; import { fileURLToPath } from "node:url";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, "after"); fs.mkdirSync(OUT, { recursive: true });
const BASE = "http://localhost:5173/"; const SETTLE = 4000;
const rep = { cells: {}, fails: [] };
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  for (const scheme of ["light", "dark"]) for (const [w, h] of [[1440, 900], [390, 844]]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: scheme, deviceScaleFactor: 2 });
    for (const route of ["square", "spring", "sequence", "easing"]) {
      const page = await ctx.newPage();
      try {
        await page.goto(`${BASE}#/${route}`, { waitUntil: "load" }); await page.waitForTimeout(SETTLE);
        await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
        const cell = await page.evaluate((route) => {
          const r = {};
          if (route === "spring") {
            const cap = [...document.querySelectorAll("span.text-caption")].find((s) => /stops/.test(s.textContent));
            const row = cap?.parentElement;
            r.axis = row ? [...row.children].map((c) => c.textContent.trim()) : null;
          }
          if (route === "easing") {
            r.selectLabels = [...document.querySelectorAll('[role="combobox"]')].map((c) => c.textContent.trim()).slice(0, 4);
          }
          return r;
        }, route);
        const key = `${route}-${w}-${scheme}`; rep.cells[key] = cell;
        if (route === "spring") {
          const a = cell.axis || [];
          const units = a.join(" ").match(/\bms\b/g)?.length ?? 0;
          if (!a.length || /\(ms\)/.test(a.join(" ")) || units !== 1) rep.fails.push(`${key}: axis ${JSON.stringify(a)}`);
        }
        await page.screenshot({ path: path.join(OUT, `${route}-${w}-${scheme}.png`) });
      } finally { await page.close(); }
    }
    await ctx.close();
  }
} finally { await browser.close(); }
fs.writeFileSync(path.join(HERE, "c10r-probe.json"), JSON.stringify(rep, null, 2));
console.log(JSON.stringify(rep, null, 1).slice(0, 3000));
process.exit(rep.fails.length ? 1 : 0);
