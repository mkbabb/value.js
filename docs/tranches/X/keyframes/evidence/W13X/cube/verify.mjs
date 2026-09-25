// SERVED MODEL: claude-opus-5-5 — X.KF.W13X.cube · the verification probe for rows the cube unit reads but does not cure here
// rows: KFA-30 (squash) · KFA-84 (coast cadence) · KFA-81 (entry stall) · KFA-185 (Pause stall) · KFA-204 (first paint pose)
// usage: node verify.mjs <baseUrl> <tag>
import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const BASE = process.argv[2]; const TAG = process.argv[3] || "run";
const b = await chromium.launch({ headless: false }); const R = (v) => Math.round(v * 1000) / 1000;
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
await ctx.addInitScript(() => {
  window.__lt = []; try { new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__lt.push([Math.round(e.startTime), Math.round(e.duration)]); }).observe({ type: "long-animation-frame", buffered: true }); } catch {}
  window.__fp = null; const tick = () => { const s = document.querySelector(".cube-side"); if (s && !window.__fp) { const g = document.querySelector(".graph"); const c = s.getBoundingClientRect(); window.__fp = { t: Math.round(performance.now()), graph: getComputedStyle(g).transform, faceW: Math.round(c.width), faceH: Math.round(c.height), visibleFaces: [...document.querySelectorAll(".cube-side")].filter((f) => { const r = f.getBoundingClientRect(); return r.width > 2 && r.height > 2; }).length }; } else if (!window.__fp) requestAnimationFrame(tick); };
  requestAnimationFrame(tick);
});
const p = await ctx.newPage(); const out = {};
await p.goto(`${BASE}/#/cube`); await p.waitForSelector(".cube-side"); await p.waitForTimeout(3000);
out.firstPaint = await p.evaluate(() => window.__fp);
out.entryLoAF = await p.evaluate(() => { const l = window.__lt.filter((x) => x[0] < 3500); return { count: l.length, maxMs: Math.max(0, ...l.map((x) => x[1])) }; });
// KFA-185: Pause stall
const mark = await p.evaluate(() => performance.now());
await p.locator("button[aria-label='Pause animation']").first().click(); await p.waitForTimeout(800);
out.pauseLoAF = await p.evaluate((m) => { const l = window.__lt.filter((x) => x[0] >= m - 5); return { count: l.length, maxMs: Math.max(0, ...l.map((x) => x[1])) }; }, mark);
await p.locator("button[aria-label='Play animation']").first().click(); await p.waitForTimeout(500);
// KFA-30 + KFA-84: drag, fling, coast — pose/spin orthonormality + coast cadence
const colNorm = (sel) => `(() => { const m = new DOMMatrix(getComputedStyle(document.querySelector("${sel}")).transform); const n = [[m.m11,m.m12,m.m13],[m.m21,m.m22,m.m23],[m.m31,m.m32,m.m33]].map((v) => Math.hypot(...v)); return Math.min(...n); })()`;
const g = await p.evaluate(() => { const r = document.querySelector(".graph").getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; });
await p.mouse.move(g.x, g.y); await p.mouse.down(); for (let i = 1; i <= 10; i++) { await p.mouse.move(g.x + i * 18, g.y + i * 5); await p.waitForTimeout(16); } 
const coastP = p.evaluate((cn) => new Promise((res) => { const s = []; const t0 = performance.now(); const orbit = document.querySelector(".graph > div");
  const f = () => { s.push([orbit.style.transform, eval(cn[0]), eval(cn[1])]); if (performance.now() - t0 < 1200) requestAnimationFrame(f); else res(s); }; requestAnimationFrame(f); }), [colNorm(".cube-pose"), colNorm(".cube")]);
await p.mouse.up(); const cs = await coastP;
out.squash = { minPoseColNorm: R(Math.min(...cs.map((x) => x[1]))), minSpinColNorm: R(Math.min(...cs.map((x) => x[2]))) };
const ang = cs.map((x) => { const m = /rotate3d\([^,]+,[^,]+,[^,]+,\s*([-\d.e]+)deg/.exec(x[0]); return m ? +m[1] : null; }).filter((v) => v !== null);
const steps = []; for (let i = 1; i < ang.length; i++) { const d = Math.abs(ang[i] - ang[i - 1]); if (d > 1e-3 && d < 90) steps.push(d); }
const early = steps.slice(0, 20); const mean = early.reduce((a, v) => a + v, 0) / Math.max(1, early.length);
let alt = 0; for (let i = 1; i < early.length; i++) alt += Math.abs(early[i] - early[i - 1]); alt /= Math.max(1, early.length - 1);
out.coast = { frames: steps.length, meanStepDeg: R(mean), meanAdjacentStepDiffDeg: R(alt), juddery: alt > 0.5 * mean };
console.log(JSON.stringify(out)); await b.close();
