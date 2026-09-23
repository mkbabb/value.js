// cube-group-spin-matrix-bob — STEPPED capture (headed Chromium, real GPU, served page).
// The engine's group has no seek verb; its rAF loop reads the rAF timestamp /
// performance.now. An init script routes both through a controllable clock, so
// the LIBRARY'S OWN draw loop + painter render each stepped instant (no synthetic
// style writes). 96 steps over one 10 s alternate period (= 48 per 5 s iteration).
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
const OUT = path.dirname(new URL(import.meta.url).pathname) + "/step";
fs.mkdirSync(OUT + "/frames", { recursive: true });
const kf = "/Users/mkbabb/Programming/keyframes.js";
const khead = execSync(`git -C ${kf} rev-parse --short HEAD`).toString().trim();
const kdirty = execSync(`git -C ${kf} status --porcelain | wc -l`).toString().trim();
const browser = await chromium.launch({ headless: false });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
await page.addInitScript(() => {
  const realNow = performance.now.bind(performance);
  let vt = null;
  window.__vc = { freeze() { vt = realNow(); return vt; }, set(t) { vt = t; }, get() { return vt; } };
  performance.now = () => (vt ?? realNow());
  const rRAF = window.requestAnimationFrame.bind(window);
  window.requestAnimationFrame = (cb) => rRAF((ts) => cb(vt ?? ts));
});
await page.goto("http://localhost:5173/#/cube", { waitUntil: "domcontentloaded" });
await page.waitForSelector(".cube");
await page.waitForTimeout(2500);
const T0 = await page.evaluate(() => window.__vc.freeze());
const rafs = (n) => page.evaluate((n) => new Promise((r) => { let k = 0; const f = () => (++k >= n ? r() : requestAnimationFrame(f)); requestAnimationFrame(f); }), n);
const N = 96, PERIOD = 10000, rows = [];
for (let k = 0; k <= N; k++) {
  const t = T0 + (k * PERIOD) / N;
  await page.evaluate((t) => window.__vc.set(t), t);
  await rafs(3);
  const st = await page.evaluate(() => ({ cube: document.querySelector(".cube").style.transform, pose: document.querySelector(".cube-pose").style.transform, bob: document.querySelector(".cube-bob").style.transform, bobRect: (() => { const r = document.querySelector(".cube-bob").getBoundingClientRect(); return [r.x, r.y].map((v) => +v.toFixed(2)); })() }));
  const file = `s${String(k).padStart(3, "0")}.png`;
  await page.screenshot({ path: `${OUT}/frames/${file}`, clip: { x: 727, y: 220, width: 460, height: 460 } });
  rows.push({ i: k, file, dt: +((k * PERIOD) / N).toFixed(1), ...st });
}
fs.writeFileSync(OUT + "/steps.json", JSON.stringify({ khead, kdirty, T0, rows }, null, 1));
const labels = rows.map((r) => ({ i: r.i, file: r.file, label: `${(r.dt / 1000).toFixed(2)}s X${(r.cube.match(/rotateX\(([-\d.e]+)/) || [])[1]?.slice(0, 5)} y${(r.bob.match(/\(([-\d.e]+)px/) || [])[1]?.slice(0, 4)}` }));
fs.writeFileSync(OUT + "/sheet-index.json", JSON.stringify(labels));
console.log(JSON.stringify({ khead, kdirty, steps: rows.length }));
await browser.close();
