// dock play after ribbon play/pause round-trip
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const browser = await chromium.launch({ headless: false });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await page.goto("http://localhost:5173/#/easing", { waitUntil: "networkidle" });
await page.waitForTimeout(2500);
const rd = (l) => page.evaluate((l) => ({ l, lin: document.querySelector('.tile-ball[data-curve="linear"]').style.transform, ribbon: [...document.querySelectorAll("button.btn-playback")].map(b=>b.textContent.trim()).join("|"), dock: [...document.querySelectorAll('button[aria-label$="animation"]')].filter(b=>b.offsetParent).map(b=>b.getAttribute("aria-label")+"@"+Math.round(b.getBoundingClientRect().x)+","+Math.round(b.getBoundingClientRect().y)).join(" ; ") }), l);
const out=[];
const btn = page.locator("button.btn-playback").first();
await btn.click(); await page.waitForTimeout(500); out.push(await rd("ribbon play"));
await btn.click(); await page.waitForTimeout(500); out.push(await rd("ribbon pause"));
await page.mouse.click(688, 792); await page.waitForTimeout(700); out.push(await rd("dock click 688,792"));
await page.mouse.click(688, 792); await page.waitForTimeout(700); out.push(await rd("dock click again"));
console.log(JSON.stringify(out,null,0));
await browser.close();
