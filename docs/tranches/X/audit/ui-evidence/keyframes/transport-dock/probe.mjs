// transport-dock quick DOM probe — READ-ONLY.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const browser = await chromium.launch({ headless: false });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto("http://localhost:5173/#/cube", { waitUntil: "networkidle" });
await page.waitForTimeout(3000);
const r = await page.evaluate(() => {
  const docks = [...document.querySelectorAll(".glass-dock")].map(d => { const b = d.getBoundingClientRect(); return { y: Math.round(b.y), h: Math.round(b.height), w: Math.round(b.width), cls: d.className.slice(0, 160), state: d.getAttribute("data-state"), html: d.outerHTML.length }; });
  const btns = [...document.querySelectorAll("button")].map(b => b.getAttribute("aria-label") || b.textContent.trim().slice(0, 30)).filter(Boolean);
  const tabs = [...document.querySelectorAll("[role=tab]")].map(t => t.textContent.trim());
  return { docks, btns, tabs };
});
console.log(JSON.stringify(r, null, 1));
await browser.close();
