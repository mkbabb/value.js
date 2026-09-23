// dock play probe (bottom-bar transport) on a fresh load
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const OUT = new URL(".", import.meta.url).pathname;
const browser = await chromium.launch({ headless: false });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const logs=[]; page.on("console", m => { if (["error","warning"].includes(m.type())) logs.push(m.text().slice(0,200)); });
await page.goto("http://localhost:5173/#/easing", { waitUntil: "networkidle" });
await page.waitForTimeout(2500);
const rd = () => page.evaluate(() => ({ lin: document.querySelector('.tile-ball[data-curve="linear"]').style.transform, ribbon: [...document.querySelectorAll("button.btn-playback")].map(b=>b.textContent.trim()).join("|"), dock: [...document.querySelectorAll('button[aria-label$="animation"]')].filter(b=>b.offsetParent).map(b=>b.getAttribute("aria-label")+"@"+Math.round(b.getBoundingClientRect().x)).join(",") }));
const r0 = await rd();
await page.mouse.click(688, 792);
await page.waitForTimeout(1200);
const r1 = await rd();
await page.screenshot({ path: OUT + "09-after-dock-click.png", clip: { x: 520, y: 260, width: 900, height: 580 } });
await page.mouse.click(688, 792);
await page.waitForTimeout(600);
const r2 = await rd();
console.log(JSON.stringify({ r0, r1, r2, logs }));
await browser.close();
