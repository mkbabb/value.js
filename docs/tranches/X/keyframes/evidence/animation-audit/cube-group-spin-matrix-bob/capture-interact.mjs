// cube-group-spin-matrix-bob — interaction probes (headed, real GPU, served page):
// (a) boot long-animation-frame attribution, (b) per-face --lit during play,
// (c) Reset -> drag die at rest -> Play: which element carries the drag pose, and
// the first frames after Play (the Matrix channel's pose vs the stale painter on .cube).
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
const OUT = path.dirname(new URL(import.meta.url).pathname) + "/interact";
fs.mkdirSync(OUT + "/frames", { recursive: true });
const kf = "/Users/mkbabb/Programming/keyframes.js";
const r = { khead: execSync(`git -C ${kf} rev-parse --short HEAD`).toString().trim(), kdirty: execSync(`git -C ${kf} status --porcelain | wc -l`).toString().trim() };
const browser = await chromium.launch({ headless: false });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
await page.addInitScript(() => {
  window.__loaf = [];
  try { new PerformanceObserver((l) => { for (const e of l.getEntries()) if (e.duration > 100) window.__loaf.push({ start: Math.round(e.startTime), dur: Math.round(e.duration), blocking: Math.round(e.blockingDuration ?? 0), scripts: (e.scripts || []).sort((a, b) => b.duration - a.duration).slice(0, 4).map((s) => ({ dur: Math.round(s.duration), inv: s.invoker, src: (s.sourceURL || "").replace(/^.*localhost:5173/, ""), fn: s.sourceFunctionName, pos: s.sourceCharPosition })) }); }).observe({ type: "long-animation-frame", buffered: true }); } catch (e) { window.__loaf.push(String(e)); }
});
await page.goto("http://localhost:5173/#/cube", { waitUntil: "domcontentloaded" });
await page.waitForSelector(".cube");
const cubeAt = await page.evaluate(() => Math.round(performance.now()));
await page.waitForTimeout(3000);
r.cubeAt = cubeAt;
r.loaf = await page.evaluate(() => window.__loaf);
const snap = () => page.evaluate(() => ({ cube: document.querySelector(".cube").style.transform, pose: document.querySelector(".cube-pose").style.transform, bob: document.querySelector(".cube-bob").style.transform, orbital: document.querySelector(".graph > *").style.transform,
  lit: [...document.querySelectorAll(".cube-side")].map((f) => f.style.getPropertyValue("--lit")).join(",") }));
// (b) --lit across play
r.litDuringPlay = [];
for (let k = 0; k < 5; k++) { r.litDuringPlay.push(await snap()); await page.waitForTimeout(600); }
// (c) Reset -> rest
await page.getByRole("button", { name: "Reset animation" }).first().click();
await page.waitForTimeout(800);
r.afterReset = { ...(await snap()), playLabel: await page.getByRole("button", { name: /Pause animation|Play animation/ }).first().getAttribute("aria-label") };
await page.screenshot({ path: OUT + "/10-after-reset.png", clip: { x: 727, y: 220, width: 460, height: 460 } });
// drag the die at rest
const box = await page.locator(".cube").boundingBox();
const cx = box.x + box.width / 2, cy = box.y + box.height / 2;
await page.mouse.move(cx, cy); await page.mouse.down();
for (let k = 1; k <= 20; k++) await page.mouse.move(cx + k * 6, cy + k * 3);
await page.mouse.up();
await page.waitForTimeout(700);
r.afterDrag = await snap();
await page.screenshot({ path: OUT + "/11-after-drag.png", clip: { x: 727, y: 220, width: 460, height: 460 } });
// Play: sample every rAF for 40 frames + screenshots of the first frames
await page.evaluate(() => { window.__post = []; });
const cdp = await ctx.newCDPSession(page); const frames = [];
cdp.on("Page.screencastFrame", async (f) => { frames.push({ ts: f.metadata.timestamp, data: f.data }); try { await cdp.send("Page.screencastFrameAck", { sessionId: f.sessionId }); } catch {} });
await cdp.send("Page.startScreencast", { format: "png", everyNthFrame: 1 });
await page.waitForTimeout(300);
await page.evaluate(() => { const q = (s) => document.querySelector(s); const f = (ts) => { window.__post.push({ ts: Math.round(ts), cube: q(".cube").style.transform, pose: q(".cube-pose").style.transform, orbital: q(".graph > *").style.transform }); if (window.__post.length < 60) requestAnimationFrame(f); }; requestAnimationFrame(f); });
await page.getByRole("button", { name: /Play animation/ }).first().click();
await page.waitForTimeout(1500);
await cdp.send("Page.stopScreencast");
r.postPlay = await page.evaluate(() => window.__post.filter((x, i, a) => i === 0 || x.cube !== a[i - 1].cube || x.pose !== a[i - 1].pose || x.orbital !== a[i - 1].orbital).slice(0, 14));
r.afterPlay = await snap();
const t0 = frames[0]?.ts ?? 0; const idx = [];
frames.forEach((f, i) => { const file = `p${String(i).padStart(3, "0")}.png`; fs.writeFileSync(`${OUT}/frames/${file}`, Buffer.from(f.data, "base64")); idx.push({ i, file, label: `${(f.ts - t0).toFixed(3)}s` }); });
fs.writeFileSync(OUT + "/sheet-index.json", JSON.stringify(idx));
fs.writeFileSync(OUT + "/probe.json", JSON.stringify(r, null, 1));
console.log(JSON.stringify({ khead: r.khead, kdirty: r.kdirty, frames: frames.length }));
await browser.close();
