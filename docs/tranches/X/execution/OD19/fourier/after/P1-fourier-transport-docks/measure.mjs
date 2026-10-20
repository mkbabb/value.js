// P1 measure: chrome arithmetic of the expanded transport dock. Headless, one browser, context per cell.
import { chromium } from "/Users/mkbabb/Programming/fourier-analysis/web/node_modules/playwright/index.mjs";
const BASE = process.env.BASE ?? "http://localhost:3100";
const browser = await chromium.launch({ headless: true });
try {
  for (const w of [1440, 390]) {
    const H = w === 390 ? 844 : 900;
    const ctx = await browser.newContext({ viewport: { width: w, height: H }, deviceScaleFactor: 2 });
    try {
      const page = await ctx.newPage();
      await page.goto(BASE + "/v/hazy-etching-cream-elk", { waitUntil: "load" });
      if (w === 390) { await page.waitForTimeout(2500); await page.getByText("Canvas", { exact: true }).first().click(); }
      await page.waitForSelector(".animation-dock", { timeout: 15000 }); await page.waitForTimeout(2000);
      const b = await page.locator(".animation-dock").boundingBox();
      await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); await page.waitForTimeout(1500);
      console.log(w, JSON.stringify(await page.evaluate(() => {
        const r = (s) => { const e = document.querySelector(s); if (!e) return null; const q = e.getBoundingClientRect(); return [Math.round(q.x), Math.round(q.width)]; };
        const d = document.querySelector(".animation-dock"); const cs = getComputedStyle(d);
        return { cls: d.className, dock: r(".animation-dock"), overlay: r(".controls-overlay"), face: r(".transport-face"), full: r(".animation-dock .dock-layer--full"), pers: r(".animation-dock .dock-persistent"), run: (() => { const e = d.querySelector(".dock-run"); return e && [e.scrollWidth, e.clientWidth]; })(), pad: cs.paddingInline, gap: cs.gap, exp: cs.getPropertyValue("--dock-expanded-px"), col: cs.getPropertyValue("--dock-collapsed-px"), speed: r(".speed-trigger"), speedFont: getComputedStyle(document.querySelector(".speed-trigger")).fontFamily.slice(0, 30) };
      })));
    } finally { await ctx.close(); }
  }
} finally { await browser.close(); }
