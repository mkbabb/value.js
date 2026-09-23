// Double-application probe: Reset -> drag die at rest -> Play -> Pause at ~end of the
// forward leg (spin ~ identity). Reads the three writers above the faces
// (OrbitalDrag container, .cube-pose, .cube) as computed matrices. Headed, real GPU.
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
const read = () => page.evaluate(() => { const g = (s) => { const e = document.querySelector(s); return { inline: e.style.transform, computed: getComputedStyle(e).transform }; };
  return { orbital: g(".graph > div"), rollEl: g(".idle-hover"), pose: g(".cube-pose"), cube: g(".cube"), bob: g(".cube-bob") }; });
const label = () => page.locator('button[aria-label="Play animation"]:visible, button[aria-label="Pause animation"]:visible').first().getAttribute("aria-label");
await page.goto("http://localhost:5173/#/cube", { waitUntil: "domcontentloaded" });
await page.waitForSelector(".cube"); await page.waitForTimeout(2500);
r.autoplayRead = await read();
await page.getByRole("button", { name: "Reset animation" }).first().click(); await page.waitForTimeout(700);
const b = await page.locator(".cube").boundingBox(); const cx = b.x + b.width / 2, cy = b.y + b.height / 2;
await page.mouse.move(cx, cy); await page.mouse.down();
for (let k = 1; k <= 20; k++) await page.mouse.move(cx + k * 6, cy + k * 3);
await page.mouse.up(); await page.mouse.move(200, 850); await page.waitForTimeout(3000);
r.atRestAfterDrag = await read();
await page.screenshot({ path: `${OUT}/20-rest-after-drag.png`, clip: { x: 727, y: 220, width: 460, height: 460 } });
r.clicks = 0;
while ((await label()) === "Play animation" && r.clicks < 4) { await page.locator('button[aria-label="Play animation"]:visible').first().click(); r.clicks++; await page.waitForTimeout(250); }
const playAt = Date.now();
await page.waitForTimeout(4900 - 250);
await page.locator('button[aria-label="Pause animation"]:visible').first().click();
r.pausedAfterMs = Date.now() - playAt;
await page.waitForTimeout(300);
r.pausedNearLegEnd = await read();
await page.screenshot({ path: `${OUT}/21-paused-near-leg-end.png`, clip: { x: 727, y: 220, width: 460, height: 460 } });
fs.writeFileSync(OUT + "/double-pose.json", JSON.stringify(r, null, 1));
console.log(JSON.stringify({ khead: r.khead, kdirty: r.kdirty, clicks: r.clicks, pausedAfterMs: r.pausedAfterMs }));
await browser.close();
