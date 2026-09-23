// Pass 5: rest-state fill of the transport's Select/Reset faces, light vs dark (no hover; pointer parked at 0,0).
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const browser = await chromium.launch({ headless: false });
for (const theme of ["light", "dark"]) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: theme });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  const page = await ctx.newPage(); await page.goto("http://localhost:5173/#/", { waitUntil: "networkidle" }); await page.waitForTimeout(3000);
  const r = await page.evaluate(() => ["Select animation", "Reset animation", "Play animation"].map(l => { const b = document.querySelector(`[aria-label="${l}"]`); const cs = getComputedStyle(b); return l + " bg=" + cs.backgroundColor + " bgi=" + cs.backgroundImage.slice(0, 60) + " border=" + cs.borderTopWidth + " " + cs.borderTopColor + " shadow=" + cs.boxShadow.slice(0, 80) + " r=" + cs.borderRadius + " cls=" + String(b.className).slice(0, 140); }));
  const hint = await page.evaluate(() => { const h = document.querySelector(".hero-hint"); const d = document.querySelector(".hero-deck"); return { hint: getComputedStyle(h).color, deck: getComputedStyle(d).color + " op " + getComputedStyle(d).opacity, bg: getComputedStyle(document.body).backgroundColor }; });
  console.log(theme, JSON.stringify(hint)); r.forEach(x => console.log("  " + x));
  await ctx.close();
}
await browser.close();
