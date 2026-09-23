import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
const D = new URL(".", import.meta.url).pathname;
const K = "/Users/mkbabb/Programming/keyframes.js";
const ks = () => execSync(`git -C ${K} rev-parse --short HEAD`).toString().trim() + " dirty=" + execSync(`git -C ${K} status --porcelain | wc -l`).toString().trim();
const out = { k0: ks() };
const b = await chromium.launch({ headless: false });
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await p.goto("http://localhost:5173/#/amiga"); await p.waitForTimeout(3500);
const rect = { x: 518, y: 127, width: 878, height: 646 };
out.timing = await p.evaluate(() => { let i = document.querySelector("canvas.amiga-canvas").__vueParentComponent; while (i && !(i.setupState && i.setupState.animationGroup)) i = i.parent; const g = i.setupState.animationGroup; return g.getEntries().map(e => ({ n: e.animation.name, tf: String(e.animation.options.timingFunction).slice(0, 60), dur: e.animation.options.duration, dir: e.animation.options.direction, it: e.animation.options.iterationCount })); });
out.sliders = await p.evaluate(() => [...document.querySelectorAll('[role=slider],input[type=range]')].map(s => { const r = s.getBoundingClientRect(); return { l: s.getAttribute("aria-label"), v: s.getAttribute("aria-valuenow"), r: [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)] }; }).filter(s => s.r[2] > 0));
const pose = () => p.evaluate(() => { const q = window.__kfAmigaProbe.pose(); return [+q.px.toFixed(3), +q.py.toFixed(3), +q.spin.toFixed(3), q.playing]; });
out.pose0 = await pose();
// scrub via the panel's timeline track (the bar at ~y 511)
const track = out.sliders.find(s => s.r[1] > 480 && s.r[1] < 530) ;
out.track = track;
if (track) {
  const y = track.r[1] + track.r[3] / 2;
  await p.mouse.move(track.r[0] + 4, y); await p.mouse.down();
  for (let k = 1; k <= 10; k++) { await p.mouse.move(track.r[0] + (track.r[2] * k) / 20, y); await p.waitForTimeout(60); }
  await p.mouse.up(); await p.waitForTimeout(1500);
  out.poseAfterScrub = await pose();
  await p.screenshot({ path: D + "transport-after-scrub.png", clip: rect });
}
// reset button
const reset = p.locator('button[aria-label="Reset animation"]:visible').first();
if (await reset.count()) { await reset.click(); await p.waitForTimeout(1500); out.poseAfterReset = await pose(); }
// light pixel samples: backdrop major line vs room floor line (sampled from a column scan)
const light = await p.screenshot({ path: D + "theme-light.png", clip: rect });
// dark mode
const dm = p.locator('button[aria-label="Switch to dark mode"]:visible').first();
if (await dm.count()) { await dm.click(); await p.waitForTimeout(1500); }
await p.evaluate(() => { let i = document.querySelector("canvas.amiga-canvas").__vueParentComponent; while (i && !(i.setupState && i.setupState.three)) i = i.parent; i?.setupState.three.markRenderDirty(); });
await p.waitForTimeout(500);
await p.screenshot({ path: D + "theme-dark.png", clip: rect });
out.darkBg = await p.evaluate(() => getComputedStyle(document.body).backgroundColor);
if (dm || true) { const lm = p.locator('button[aria-label="Switch to light mode"]:visible').first(); if (await lm.count()) await lm.click(); }
out.k1 = ks();
console.log(JSON.stringify(out, null, 1));
await b.close();
