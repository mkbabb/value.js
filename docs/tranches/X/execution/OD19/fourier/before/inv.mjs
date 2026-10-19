// OD19 fourier: dock inventory per route (headless, one browser, context per cell).
import { chromium } from "/Users/mkbabb/Programming/fourier-analysis/web/node_modules/playwright/index.mjs";
const BASE = process.env.BASE ?? "http://localhost:3100";
const routes = process.argv.slice(2);
const browser = await chromium.launch({ headless: true });
try {
  for (const route of routes) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    try {
      await page.goto(BASE + route, { waitUntil: "load" });
      await page.waitForTimeout(3000);
      const r = await page.evaluate(() => [...document.querySelectorAll(".glass-dock")].map((d) => {
        const b = d.getBoundingClientRect(); const run = d.querySelector(".dock-run");
        return `${d.className.slice(0, 90)} | ${Math.round(b.width)}x${Math.round(b.height)}@${Math.round(b.x)},${Math.round(b.y)} | run ${run?.scrollWidth}/${run?.clientWidth} | txt="${d.innerText.replace(/\s+/g, " ").slice(0, 70)}"`;
      }));
      console.log(route, page.url()); for (const l of r) console.log("  ", l);
    } finally { await ctx.close(); }
  }
} finally { await browser.close(); }
