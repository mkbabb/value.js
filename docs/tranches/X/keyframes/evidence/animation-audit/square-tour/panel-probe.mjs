// Does the controls panel (duration/direction/easing) govern the square tour? headed, real GPU.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const browser = await chromium.launch({ headless: false, args: ["--ignore-gpu-blocklist"] });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await page.goto("http://localhost:5173/#/square", { waitUntil: "networkidle" });
await page.waitForSelector(".demo-box"); await page.waitForTimeout(2000);
const read = () => page.evaluate(() => {
  const box = document.querySelector(".demo-box"); let inst = box.__vueParentComponent;
  while (inst && !(inst.setupState && inst.setupState.animationGroup)) inst = inst.parent;
  const a = inst.setupState.anim; const o = a.options;
  const tf = o.timingFunction; let tfs = typeof tf === "function" ? tf.toString().slice(0, 120) : JSON.stringify(tf)?.slice(0, 200);
  const inputs = [...document.querySelectorAll("input")].filter(i => i.offsetParent).map(i => ({ n: i.name || i.id || i.getAttribute("aria-label"), v: i.value })).slice(0, 8);
  const scrub = document.querySelector('[role=slider][aria-label="Scrub animation timeline"]');
  return { duration: o.duration, direction: o.direction, fill: o.fillMode, iter: String(o.iterationCount), delay: o.delay, tf: tfs, keys: Object.keys(o).join(","), inputs, scrubMax: scrub?.getAttribute("aria-valuemax"), animName: a.name };
});
const R = { initial: await read() };
// edit the duration field via the UI
const dur = page.locator("input:visible").first();
await dur.click({ clickCount: 3 }); await dur.fill("1s"); await dur.press("Enter"); await page.waitForTimeout(400);
R.afterDuration1s = await read();
// press Play and time an iteration via anim.t wraps
const plays = page.locator('button[aria-label="Play animation"]:visible');
let dock = null; for (let i = 0; i < await plays.count(); i++) { const b = await plays.nth(i).boundingBox(); if (b && b.y > 700) dock = plays.nth(i); }
await dock.click();
R.period = await page.evaluate(() => new Promise(res => {
  const box = document.querySelector(".demo-box"); let inst = box.__vueParentComponent;
  while (inst && !(inst.setupState && inst.setupState.animationGroup)) inst = inst.parent;
  const a = inst.setupState.anim; const g = inst.setupState.animationGroup; const wraps = []; const tr = []; let prev = a.t; const t0 = performance.now();
  const loop = (now) => { if (a.t < prev) wraps.push(+(now - t0).toFixed(1)); prev = a.t; if (tr.length < 400) tr.push([+(now-t0).toFixed(0), +(+a.t).toFixed(0), g.playing?.(), box.style.transform.slice(0,40)]); if (now - t0 < 4500) requestAnimationFrame(loop); else res({wraps, colorSpace: a.options.colorSpace, head: tr.slice(0,6), mid: tr.filter((_,i)=>i%30===0)}); };
  requestAnimationFrame(loop);
}));
await page.screenshot({ path: OUT + "panel-probe.png" });
fs.writeFileSync(OUT + "panel-probe.json", JSON.stringify(R, null, 1));
console.log(JSON.stringify(R, null, 1));
await browser.close();
