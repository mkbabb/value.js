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
    await page.mouse.up(); await page.waitForTimeout(1500); await page.screenshot({ path: `${OUT}/${name}-dock-1500ms.png`, clip: { x: 420, y: 740, width: 600, height: 110 } }); await page.mouse.move(200, 850); await page.waitForTimeout(3000);
    a.afterDrag = await snap();
  }
  // click the VISIBLE transport play button by coordinates
  await page.screenshot({ path: `${OUT}/${name}-dock-before-play.png`, clip: { x: 420, y: 740, width: 600, height: 110 } });
  a.buttonsBeforePlay = await playBtns();
  const loc = page.locator('button[aria-label="Play animation"]:visible').first();
  await loc.click(); // actionability: waits for a stable, visible, hit-testable button
  a.clicked = await loc.evaluate((b) => { const x = b.getBoundingClientRect(); return [x.x, x.y, x.width].map(Math.round); }).catch(() => "detached");
  await page.waitForTimeout(200);
  a.buttonsAfterPlay = await playBtns();
  a.seriesAfterPlay = await series(3, 400);
  await page.screenshot({ path: `${OUT}/${name}-dock-after-click1.png`, clip: { x: 420, y: 740, width: 600, height: 110 } });
  await page.waitForTimeout(1500);
  const loc2 = page.locator('button[aria-label="Play animation"]:visible').first();
  a.secondClickTarget = await loc2.evaluate((b) => { const x = b.getBoundingClientRect(); return [x.x, x.y, x.width].map(Math.round); }).catch(() => "none");
  const cdp = await ctx.newCDPSession(page); const frames = [];
  cdp.on("Page.screencastFrame", async (f) => { frames.push({ ts: f.metadata.timestamp, data: f.data }); try { await cdp.send("Page.screencastFrameAck", { sessionId: f.sessionId }); } catch {} });
  await cdp.send("Page.startScreencast", { format: "png", everyNthFrame: 1, maxWidth: 1440, maxHeight: 900 });
  await page.waitForTimeout(250);
  const clickAt = Date.now() / 1000;
  if (a.secondClickTarget !== "none") await loc2.click();
  await page.waitForTimeout(1200);
  await cdp.send("Page.stopScreencast");
  fs.mkdirSync(`${OUT}/snap-frames`, { recursive: true });
  const t0 = frames[0].ts; const idx = [];
  frames.forEach((f, i) => { const file = `q${String(i).padStart(3, "0")}.png`; fs.writeFileSync(`${OUT}/snap-frames/${file}`, Buffer.from(f.data, "base64")); idx.push({ i, file, label: `${(f.ts - clickAt).toFixed(3)}s` }); });
  fs.writeFileSync(`${OUT}/snap-index.json`, JSON.stringify(idx));
  await page.waitForTimeout(200);
  a.buttonsAfterClick2 = await playBtns();
  a.seriesAfterClick2 = await series(5, 400);
  await page.screenshot({ path: `${OUT}/${name}-after-play.png`, clip: { x: 727, y: 220, width: 460, height: 460 } });
  return a;
}
r.armB_resetDragPlay = await arm("armB5", true);
fs.writeFileSync(OUT + "/reset-drag-play-v5.json", JSON.stringify(r, null, 1));
console.log(JSON.stringify(r).slice(0, 6000));
await browser.close();
