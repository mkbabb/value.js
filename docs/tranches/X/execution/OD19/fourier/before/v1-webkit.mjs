// OD19-V1 (fourier half): the app-dock plate corner in WebKit (the owner's engine class). One browser; context per cell; closed in finally.
import { webkit } from "/Users/mkbabb/Programming/fourier-analysis/web/node_modules/playwright/index.mjs";
const OUT = new URL(".", import.meta.url).pathname;
const browser = await webkit.launch({ headless: true });
try {
  for (const [scheme, w] of [["light", 1440], ["light", 390], ["dark", 1440]]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, colorScheme: scheme, deviceScaleFactor: 2 });
    const page = await ctx.newPage();
    try {
      await page.goto("http://localhost:3100/v/hazy-etching-cream-elk", { waitUntil: "load" }); await page.waitForTimeout(3500);
      console.log(scheme, w, await page.evaluate(() => [...document.querySelectorAll(".glass-dock")].map((d) => { const p = getComputedStyle(d.querySelector(".dock-plate")); const run = d.querySelector(".dock-run"); return `${d.classList.contains("app-dock") ? "app" : d.classList.contains("animation-dock") ? "anim" : "small"} run=${run.scrollWidth}/${run.clientWidth} ss=${p.borderTopLeftRadius} ee=${p.borderBottomRightRadius} anim=${p.animationName.slice(0, 40)} tl=${p.animationTimeline}`; }).join(" | ")));
      await page.locator(".app-dock").screenshot({ path: `${OUT}webkit-${scheme}-${w}-V1-appdock.png` });
      const s = page.locator(".glass-dock.fit-content").first(); if (await s.count() && await s.isVisible()) await s.screenshot({ path: `${OUT}webkit-${scheme}-${w}-V1-smalldock.png` });
    } finally { await ctx.close(); }
  }
} finally { await browser.close(); }
