// square-tour audit capture — headed Chromium, real GPU, served page. READ-ONLY on keyframes.js.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
for (const d of ["live", "step"]) fs.mkdirSync(OUT + d, { recursive: true });
const browser = await chromium.launch({ headless: false, args: ["--ignore-gpu-blocklist"] });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const errs = [];
page.on("pageerror", e => errs.push("pageerror: " + e.message.slice(0, 200)));
page.on("console", m => { if (m.type() === "error") errs.push(m.text().slice(0, 200)); });
await page.goto("http://localhost:5173/#/square", { waitUntil: "networkidle" });
await page.waitForSelector(".demo-box");
await page.waitForTimeout(2000);
const R = {};
// Handle on the scene's own script-setup bindings (dev build exposes setupState).
R.config = await page.evaluate(() => {
  const box = document.querySelector(".demo-box");
  let inst = box.__vueParentComponent;
  while (inst && !(inst.setupState && inst.setupState.animationGroup)) inst = inst.parent;
  window.__sq = inst.setupState;
  const a = window.__sq.anim;
  const cs = getComputedStyle(box);
  return { opts: { duration: a.options.duration, iterationCount: String(a.options.iterationCount), direction: a.options.direction, fillMode: a.options.fillMode, timingFunction: String(a.options.timingFunction ?? a.options.easing ?? "").slice(0, 80) }, restTransform: cs.transform, restBg: cs.backgroundColor, restFillVar: cs.getPropertyValue("--subject-fill"), willChange: cs.willChange, mode: box.dataset.squareMode, stage: (() => { const s = box.closest(".square-stage") ?? box.parentElement; const r = s.getBoundingClientRect(); return { cls: s.className, x: r.x, y: r.y, w: r.width, h: r.height }; })() };
});
console.log("CONFIG", JSON.stringify(R.config));
const client = await page.context().newCDPSession(page);
const frames = [];
client.on("Page.screencastFrame", async ({ data, metadata, sessionId }) => {
  frames.push({ ts: metadata.timestamp, data });
  client.send("Page.screencastFrameAck", { sessionId }).catch(() => {});
});
// in-page per-rAF sampler
await page.evaluate(() => {
  const box = document.querySelector(".demo-box");
  window.__samples = [];
  const t0 = performance.now();
  const loop = (now) => {
    const cs = getComputedStyle(box);
    window.__samples.push({ t: +(now - t0).toFixed(2), tr: box.style.transform, ctr: cs.transform, fill: box.style.getPropertyValue("--subject-fill"), bg: cs.backgroundColor, at: +window.__sq.anim.t?.toFixed?.(1), playing: window.__sq.animationGroup.playing?.(), mode: box.dataset.squareMode, wc: cs.willChange });
    if (now - t0 < 12500) requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
});
await client.send("Page.startScreencast", { format: "png", everyNthFrame: 1 });
await page.waitForTimeout(400);
const plays = page.locator('button[aria-label="Play animation"]:visible');
const n = await plays.count();
let dockBtn = null;
for (let i = 0; i < n; i++) { const b = await plays.nth(i).boundingBox(); if (b && b.y > 700) dockBtn = plays.nth(i); }
const tPlay = await page.evaluate(() => performance.now());
await (dockBtn ?? plays.first()).click();
R.afterPlay = await page.evaluate(() => ({ playing: window.__sq.animationGroup.playing?.(), isPlaying: window.__sq.isPlaying, mode: document.querySelector(".demo-box").dataset.squareMode }));
await page.waitForTimeout(11000); // >= 2 iterations even at the panel's 5 s
await client.send("Page.stopScreencast");
R.samples = await page.evaluate(() => window.__samples);
// transport: pause, verify freeze
const pauseBtn = page.locator('button[aria-label="Pause animation"]:visible');
R.pauseCount = await pauseBtn.count();
let pb = null; for (let i = 0; i < R.pauseCount; i++) { const b = await pauseBtn.nth(i).boundingBox(); if (b && b.y > 700) pb = pauseBtn.nth(i); }
await (pb ?? pauseBtn.first()).click();
await page.waitForTimeout(150);
const p1 = await page.evaluate(() => ({ tr: document.querySelector(".demo-box").style.transform, at: window.__sq.anim.t, mode: document.querySelector(".demo-box").dataset.squareMode }));
await page.waitForTimeout(800);
const p2 = await page.evaluate(() => ({ tr: document.querySelector(".demo-box").style.transform, at: window.__sq.anim.t }));
R.pause = { p1, p2, frozen: p1.tr === p2.tr };
// scrub slider: keyboard on the ribbon slider
const scrub = page.locator('[role=slider][aria-label="Scrub animation timeline"]');
R.scrubAttrs = await scrub.evaluate(s => ({ now: s.getAttribute("aria-valuenow"), max: s.getAttribute("aria-valuemax"), dis: s.getAttribute("aria-disabled"), dd: s.getAttribute("data-disabled"), op: getComputedStyle(s.closest("[data-orientation]") ?? s).opacity }));
const before = await page.evaluate(() => document.querySelector(".demo-box").style.transform);
await scrub.focus(); for (let i = 0; i < 5; i++) await page.keyboard.press("PageUp");
await page.waitForTimeout(200);
const after = await page.evaluate(() => ({ tr: document.querySelector(".demo-box").style.transform, at: window.__sq.anim.t }));
R.scrub = { before, after, now: await scrub.getAttribute("aria-valuenow") };
await page.screenshot({ path: OUT + "after-scrub.png" });
// stepped frames through the library clock (facility.channels[0].setProgress)
const N = 48;
const clip = { x: Math.round(R.config.stage.x), y: Math.round(R.config.stage.y), width: Math.round(R.config.stage.w), height: Math.round(R.config.stage.h) };
R.steps = [];
for (let i = 0; i < N; i++) {
  const s = await page.evaluate(async (p) => {
    window.__sq.facility.channels[0].setProgress(p);
    await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
    const box = document.querySelector(".demo-box"); const cs = getComputedStyle(box); const r = box.getBoundingClientRect();
    return { p, at: window.__sq.anim.t, tr: box.style.transform, fill: box.style.getPropertyValue("--subject-fill"), bg: cs.backgroundColor, bbox: [r.x, r.y, r.width, r.height].map(v => +v.toFixed(1)) };
  }, i / N);
  await page.screenshot({ path: `${OUT}step/f${String(i).padStart(2, "0")}.png`, clip });
  R.steps.push(s);
}
// save live frames
const base = frames[0]?.ts ?? 0;
frames.forEach((f, i) => fs.writeFileSync(`${OUT}live/f${String(i).padStart(3, "0")}.png`, Buffer.from(f.data, "base64")));
R.liveFrameTs = frames.map(f => +((f.ts - base) * 1000).toFixed(1));
R.tPlay = tPlay;
R.errs = errs;
fs.writeFileSync(OUT + "capture.json", JSON.stringify(R, null, 1));
console.log("frames", frames.length, "samples", R.samples.length, "afterPlay", JSON.stringify(R.afterPlay), "pause", JSON.stringify(R.pause), "scrub", JSON.stringify(R.scrub), JSON.stringify(R.scrubAttrs), "errs", errs.length);
await browser.close();
