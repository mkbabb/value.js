import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const OUT = new URL(".", import.meta.url).pathname;
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, colorScheme: "light" });
const page = await ctx.newPage();
await page.goto("http://localhost:5173/#/spring", { waitUntil: "networkidle" }); await page.waitForTimeout(3500);
const h = page.locator("[aria-label='Drawer position']").first(); const hb = await h.boundingBox();
await page.mouse.move(hb.x + hb.width / 2, hb.y + hb.height / 2); await page.mouse.down();
for (let k = 1; k <= 12; k++) { await page.mouse.move(hb.x + hb.width / 2, hb.y + hb.height / 2 - k * 50); await page.waitForTimeout(16); }
await page.mouse.up(); await page.waitForTimeout(1200);
await page.mouse.move(40, 600);
for (let i = 0; i < 12; i++) { await page.mouse.wheel(0, 300); await page.waitForTimeout(150); }
await page.waitForTimeout(700);
const r = await page.evaluate(() => ({ scrollers: [...document.querySelectorAll("*")].filter(e => e.scrollTop > 0).map(e => e.className.toString().slice(0, 50) + " st=" + e.scrollTop + " ch=" + e.clientHeight + " sh=" + e.scrollHeight + " y=" + Math.round(e.getBoundingClientRect().y) + " h=" + Math.round(e.getBoundingClientRect().height)), ribbon: [...document.querySelectorAll(".btn-playback")].map(b => b.textContent.trim().slice(0, 8) + " y=" + Math.round(b.getBoundingClientRect().y)) }));
console.log(JSON.stringify(r, null, 1));
await page.screenshot({ path: OUT + "probe5-390-wheel-bottom.png" });
await b.close();
