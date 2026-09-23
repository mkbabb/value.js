// Scrub wiring: pause the autoplayed cube, then scrub the ribbon's timeline slider
// (keyboard + pointer drag) and read whether .cube / .cube-bob follow. Headed, real GPU.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
const OUT = path.dirname(new URL(import.meta.url).pathname) + "/interact";
const kf = "/Users/mkbabb/Programming/keyframes.js";
const r = { khead: execSync(`git -C ${kf} rev-parse --short HEAD`).toString().trim(), kdirty: execSync(`git -C ${kf} status --porcelain | wc -l`).toString().trim() };
const browser = await chromium.launch({ headless: false });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
const snap = () => page.evaluate(() => ({ cube: document.querySelector(".cube").style.transform.slice(0, 44), bob: document.querySelector(".cube-bob").style.transform, slider: document.querySelector('[role="slider"][aria-label="Scrub animation timeline"]')?.getAttribute("aria-valuenow") }));
await page.goto("http://localhost:5173/#/cube", { waitUntil: "domcontentloaded" });
await page.waitForSelector(".cube"); await page.waitForTimeout(2000);
await page.locator('button[aria-label="Pause animation"]:visible').first().click(); await page.waitForTimeout(400);
r.paused = await snap();
const s = page.locator('[role="slider"][aria-label="Scrub animation timeline"]').first();
r.sliderAttrs = await s.evaluate((e) => ({ min: e.getAttribute("aria-valuemin"), max: e.getAttribute("aria-valuemax"), disabled: e.getAttribute("aria-disabled") ?? e.getAttribute("data-disabled"), opacity: getComputedStyle(e.closest('[class*="slider"],[data-slot]') || e).opacity }));
await s.focus(); for (let k = 0; k < 10; k++) await page.keyboard.press("ArrowRight"); await page.waitForTimeout(300);
r.afterKeys = await snap();
const box = await s.boundingBox(); const track = await page.evaluate(() => { const t = document.querySelector('[role="slider"][aria-label="Scrub animation timeline"]').closest("[data-orientation],span,div").parentElement.getBoundingClientRect(); return [t.x, t.y, t.width, t.height]; });
await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2); await page.mouse.down();
r.drag = [];
for (let k = 1; k <= 6; k++) { await page.mouse.move(box.x + box.width / 2 + k * 25, box.y + box.height / 2); await page.waitForTimeout(120); r.drag.push(await snap()); }
await page.mouse.up(); await page.waitForTimeout(300);
r.afterDrag = await snap();
await page.screenshot({ path: `${OUT}/30-after-scrub.png` });
fs.writeFileSync(OUT + "/scrub.json", JSON.stringify(r, null, 1));
console.log(JSON.stringify(r).slice(0, 2500));
await browser.close();
