// Discriminating probe: after the transport's Reset, does Play restart the cube group?
// Arm A: Reset -> Play (no drag). Arm B: Reset -> drag -> Play. Headed, real GPU, served page.
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
const snap = () => page.evaluate(() => ({ cube: document.querySelector(".cube").style.transform.slice(0, 60), pose: document.querySelector(".cube-pose").style.transform.slice(0, 40), bob: document.querySelector(".cube-bob").style.transform }));
const playBtns = () => page.evaluate(() => [...document.querySelectorAll('button[aria-label="Play animation"],button[aria-label="Pause animation"]')].map((b) => { const x = b.getBoundingClientRect(); return { label: b.getAttribute("aria-label"), vis: x.width > 0 && getComputedStyle(b).visibility !== "hidden", rect: [x.x, x.y, x.width, x.height].map(Math.round) }; }));
const series = async (n, ms) => { const o = []; for (let k = 0; k < n; k++) { o.push(await snap()); await page.waitForTimeout(ms); } return o; };
async function arm(name, drag) {
  await page.goto("about:blank");
  await page.goto("http://localhost:5173/#/cube", { waitUntil: "domcontentloaded" });
  await page.waitForSelector(".cube"); await page.waitForTimeout(2500);
  const a = { buttonsAtLoad: await playBtns() };
  await page.getByRole("button", { name: "Reset animation" }).first().click();
  await page.waitForTimeout(700);
  a.afterReset = await snap(); a.buttonsAfterReset = await playBtns();
  if (drag) {
    const b = await page.locator(".cube").boundingBox(); const cx = b.x + b.width / 2, cy = b.y + b.height / 2;
    await page.mouse.move(cx, cy); await page.mouse.down();
    for (let k = 1; k <= 20; k++) await page.mouse.move(cx + k * 6, cy + k * 3);
    await page.mouse.up(); await page.waitForTimeout(1500);
    a.afterDrag = await snap();
  }
  // click the VISIBLE transport play button by coordinates
  const btn = (await playBtns()).find((x) => x.vis && x.rect[2] > 0);
  a.clicked = btn;
  await page.mouse.click(btn.rect[0] + btn.rect[2] / 2, btn.rect[1] + btn.rect[3] / 2);
  await page.waitForTimeout(200);
  a.buttonsAfterPlay = await playBtns();
  a.seriesAfterPlay = await series(6, 400);
  await page.screenshot({ path: `${OUT}/${name}-after-play.png`, clip: { x: 727, y: 220, width: 460, height: 460 } });
  return a;
}
r.armA_resetPlay = await arm("armA", false);
r.armB_resetDragPlay = await arm("armB", true);
fs.writeFileSync(OUT + "/reset-play.json", JSON.stringify(r, null, 1));
console.log(JSON.stringify(r).slice(0, 6000));
await browser.close();
