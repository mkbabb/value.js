// OD19 F1/F2: the morph's own scalars per rAF (endpoints, expand-t, scale) on the transport + small docks.
import { chromium } from "/Users/mkbabb/Programming/fourier-analysis/web/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const w = +(process.argv[2] ?? 1440), H = w === 390 ? 844 : 900;
const browser = await chromium.launch({ headless: true });
const res = {};
try {
  const ctx = await browser.newContext({ viewport: { width: w, height: H } });
  const page = await ctx.newPage();
  try {
    await page.goto("http://localhost:3100/v/hazy-etching-cream-elk", { waitUntil: "load" });
    await page.waitForSelector(".animation-dock"); await page.waitForTimeout(2500); await page.mouse.move(2, H / 2);
    const sample = (sel, ms) => page.evaluate(([sel, ms]) => new Promise((r) => { const rows = []; const t0 = performance.now();
      const f = () => { const d = document.querySelector(sel); const cs = getComputedStyle(d); const b = d.getBoundingClientRect();
        rows.push([Math.round(performance.now() - t0), d.classList.contains("expanded") ? "E" : "C", d.hasAttribute("data-morphing") ? "M" : "-", d.style.getPropertyValue("--dock-collapsed-px"), d.style.getPropertyValue("--dock-expanded-px"), cs.getPropertyValue("--dock-expand-t").trim().slice(0, 5), cs.scale, cs.inlineSize, Math.round(b.x), Math.round(b.width), cs.width]);
        if (performance.now() - t0 < ms) requestAnimationFrame(f); else r(rows); }; requestAnimationFrame(f); }), [sel, ms]);
    for (const [name, sel] of [["transport", ".animation-dock"], ["small", ".glass-dock.fit-content"]]) {
      const b = await page.locator(sel).first().boundingBox();
      const pe = sample(sel, 1100); await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); const e = await pe;
      await page.mouse.move(2, H / 2); await page.waitForTimeout(3300); const c = await sample(sel, 1400);
      res[name] = { expand: e, collapse: c };
      const pick = (rows) => rows.filter((r, i) => i === 0 || r[1] !== rows[i - 1][1] || r[2] !== rows[i - 1][2] || i % 6 === 0).slice(0, 14).map((r) => r.join(" ")).join("\n  ");
      console.log(`${name} EXPAND\n  ${pick(e)}\n${name} COLLAPSE\n  ${pick(c)}`);
      await page.waitForTimeout(500);
    }
  } finally { await ctx.close(); }
} finally { await browser.close(); }
writeFileSync(`${OUT}morph-scalars-${w}.json`, JSON.stringify(res));
