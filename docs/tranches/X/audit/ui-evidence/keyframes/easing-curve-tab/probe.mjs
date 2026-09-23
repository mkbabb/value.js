// easing-curve-tab probe — READ-ONLY: enumerate the reach DOM at both viewports.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const b = await chromium.launch({ headless: false });
for (const [w, h] of [[1440, 900], [390, 844]]) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, colorScheme: "light" });
  const p = await ctx.newPage(); await p.goto("http://localhost:5173/#/easing", { waitUntil: "networkidle" }); await p.waitForTimeout(3500);
  const out = await p.evaluate(() => { const vis = (e) => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0; };
    return { tabs: [...document.querySelectorAll("[role=tab]")].filter(vis).map(t => t.textContent.trim() + "|" + t.getAttribute("aria-selected")),
      btns: [...document.querySelectorAll("button")].filter(vis).map(t => (t.getAttribute("aria-label") || t.textContent.trim()).slice(0, 30)),
      picker: !!document.querySelector("[aria-label='Easing preset']"), pane: [...document.querySelectorAll(".controls-pane")].filter(vis).length }; });
  console.log(w, JSON.stringify(out)); await ctx.close();
}
await b.close();
