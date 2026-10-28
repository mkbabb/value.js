// OD19 keyframes K8: per-frame plate corner + run scroll during expand and collapse (glass cut-cap evidence).
import { chromium } from "playwright";
import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const TOP = '[data-dock-tether="top"] .glass-dock';
const tr = (page, ms) => page.evaluate(([sel, ms]) => new Promise((res) => { const rows = []; const t0 = performance.now();
  const tick = () => { const d = document.querySelector(sel); const p = d.querySelector(".dock-plate"); const r = d.querySelector(".dock-run");
    rows.push([Math.round(performance.now() - t0), Math.round(p.getBoundingClientRect().width), getComputedStyle(p).borderRadius, r.scrollLeft, r.scrollWidth, r.clientWidth]);
    if (performance.now() - t0 < ms) requestAnimationFrame(tick); else res(rows); }; requestAnimationFrame(tick); }), [TOP, ms]);
const browser = await chromium.launch({ headless: true }); const out = {};
try { for (const w of [1440, 390]) { const ctx = await browser.newContext({ viewport: { width: w, height: w === 390 ? 844 : 900 }, colorScheme: "dark" }); const page = await ctx.newPage();
  try { await page.goto("http://localhost:5173/#/spring", { waitUntil: "load" }); await page.waitForTimeout(2500);
    const p = tr(page, 1500); await page.locator(TOP).hover(); const ex = await p;
    await page.mouse.move(2, 400); const col = await tr(page, 4500);
    const dedupe = (rows) => rows.filter((r, i) => i === 0 || r[2] !== rows[i - 1][2] || r[3] !== rows[i - 1][3]);
    out[`dark-${w}`] = { expand: dedupe(ex), collapse: dedupe(col) };
  } finally { await ctx.close(); } } } finally { await browser.close(); }
writeFileSync(`${OUT}capTrace.json`, JSON.stringify(out, null, 1));
for (const [k, v] of Object.entries(out)) { console.log("==", k, "expand"); v.expand.slice(0, 8).forEach((r) => console.log(JSON.stringify(r))); console.log("collapse"); v.collapse.slice(0, 14).forEach((r) => console.log(JSON.stringify(r))); }
