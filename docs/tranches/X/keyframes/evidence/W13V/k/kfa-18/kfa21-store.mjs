// SERVED MODEL: claude-opus-5-5
// KFA-21: the controls pane's bucket for each Amiga channel after a cold load (fresh context) + a pick of each channel.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const b = await chromium.launch({ headless: false });
const page = await (await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 })).newPage();
await page.goto("http://localhost:5173/#/amiga"); await page.waitForSelector("canvas.amiga-canvas"); await page.waitForTimeout(2500);
const sel = page.locator('[aria-label="Select animation"]').first();
for (const name of ["Bouncing X", "Bouncing Y", "Spin"]) { await sel.click(); await page.waitForTimeout(300); await page.locator('[role="option"]', { hasText: name }).first().click(); await page.waitForTimeout(400); }
const st = await page.evaluate(() => JSON.parse(localStorage.getItem("animation-groups-options-store") || "{}"));
const amiga = st.amiga || {};
console.log(JSON.stringify(Object.fromEntries(Object.entries(amiga).map(([k, v]) => [k, v && v.animationOptions && (({ duration, direction, timingFunction, iterationCount }) => ({ duration, direction, timingFunction, iterationCount }))(v.animationOptions)]))));
await b.close();
