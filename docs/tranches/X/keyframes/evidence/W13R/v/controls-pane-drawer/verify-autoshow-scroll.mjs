// Verifies the auto-show reopen (tab key while closed): per-rAF scrollLeft of the overflow:hidden wrapper/pane + the activeElement.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs"; import { execSync } from "node:child_process";
const OUT = new URL(".", import.meta.url).pathname;
const kf = (c) => execSync(`git -C /Users/mkbabb/Programming/keyframes.js ${c}`).toString().trim();
const res = { khead: kf("rev-parse --short HEAD"), kdirty: kf("status --porcelain").split("\n").filter(Boolean).length, runs: {} };
const browser = await chromium.launch({ headless: false });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await page.mouse.move(1300, 860);
await page.goto("http://localhost:5173/#/cube", { waitUntil: "load" }); await page.waitForTimeout(4500);
const toggle = async () => { await page.mouse.move(720, 72, { steps: 3 }); await page.waitForTimeout(900); await page.locator('button[aria-label="Controls panel"]').first().click(); await page.mouse.move(1300, 860, { steps: 3 }); await page.evaluate(() => document.activeElement?.blur()); await page.waitForTimeout(1200); };
async function run(tag, key) {
  await toggle();
  await page.evaluate(() => { window.__L = []; const w = document.querySelector(".controls-pane-wrapper"), p = w.querySelector(".controls-pane"); const t0 = performance.now();
    const tick = (now) => { const c = w.querySelector(".controls-content"); window.__L.push([Math.round(now - t0), +w.getBoundingClientRect().width.toFixed(1), w.scrollLeft, p.scrollLeft, +c.getBoundingClientRect().x.toFixed(1), document.activeElement?.className?.toString().slice(0, 40)]); if (now - t0 < 900) requestAnimationFrame(tick); }; requestAnimationFrame(tick); });
  await page.keyboard.press(key); await page.waitForTimeout(1100);
  res.runs[tag] = await page.evaluate(() => window.__L.filter((_, i) => i % 3 === 0));
  await page.keyboard.press("1"); await page.waitForTimeout(800);
}
await run("keyframes(2)-while-closed", "2");
await run("timeline(3)-while-closed", "3");
fs.writeFileSync(OUT + "autoshow-scroll.json", JSON.stringify(res)); console.log(JSON.stringify(res).slice(0, 3000));
await browser.close();
