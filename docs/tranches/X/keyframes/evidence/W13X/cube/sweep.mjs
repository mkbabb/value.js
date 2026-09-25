// SERVED MODEL: claude-opus-5-5 — X.KF.W13X.cube · KFA-81 (settle limb) · KFA-204: the graph's intro settle on a cold #/cube load
// reads the .graph computed transform on every frame from the first frame with a face; reports the largest per-frame rotation step
// and how many frames the settle spans. usage: node sweep.mjs <baseUrl>
import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const b = await chromium.launch({ headless: false }); const out = [];
for (let run = 0; run < 3; run++) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  await ctx.addInitScript(() => { window.__f = []; const tick = () => { const s = document.querySelector(".cube-side"); if (s) window.__f.push(getComputedStyle(document.querySelector(".graph")).transform); if (window.__f.length < 60) requestAnimationFrame(tick); }; requestAnimationFrame(tick); });
  const p = await ctx.newPage(); await p.goto(process.argv[2] + "/#/cube"); await p.waitForSelector(".cube-side"); await p.waitForTimeout(2000);
  const f = await p.evaluate(() => window.__f.map((t) => { if (t === "none") return [1, 0, 0, 0, 1, 0, 0, 0, 1]; const m = new DOMMatrix(t); return [m.m11, m.m12, m.m13, m.m21, m.m22, m.m23, m.m31, m.m32, m.m33]; }));
  const ang = (A, B) => Math.acos(Math.max(-1, Math.min(1, (A.reduce((s, x, i) => s + x * B[i], 0) - 1) / 2))) * 180 / Math.PI;
  let maxStep = 0, moving = 0; for (let i = 1; i < f.length; i++) { const d = ang(f[i - 1], f[i]); maxStep = Math.max(maxStep, d); if (d > 0.05) moving++; }
  out.push({ maxStepDeg: Math.round(maxStep * 10) / 10, framesMoving: moving, flatFramesAtStart: f.findIndex((m) => Math.abs(m[0] - 1) > 1e-4) });
  await ctx.close();
}
console.log(JSON.stringify(out)); await b.close();
