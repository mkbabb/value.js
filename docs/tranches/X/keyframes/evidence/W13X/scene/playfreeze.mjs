// SERVED MODEL: claude-opus-5-5 — X.KF.W13X.scene · the home Play gesture, served (READ-ONLY): KFA-22 (the freeze + the ~176° first-frame leap) and its family KFA-70/71/72/199
// Usage: BASE=http://localhost:5291 node playfreeze.mjs
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const BASE = process.env.BASE || "http://localhost:5291";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
const p = await ctx.newPage(); await p.goto(`${BASE}/#/`); await sleep(5000);
const play = p.locator('[data-dock-tether=bottom] [aria-label="Play animation"]').first();
const sP = p.evaluate(() => new Promise((res) => {
  const out = []; const t0 = performance.now(); let last = t0;
  const rot = () => { const e = document.querySelector(".cube"); if (!e) return null; const m = new DOMMatrix(getComputedStyle(e).transform); return [m.m11, m.m12, m.m13, m.m21, m.m22, m.m23, m.m31, m.m32, m.m33]; };
  const tick = (t) => { out.push({ t: Math.round(t), dt: Math.round(t - last), r: rot(), hash: location.hash }); last = t; if (t - t0 < 3000) requestAnimationFrame(tick); else res(out); };
  requestAnimationFrame(tick);
}));
await sleep(100); await play.click();
const s = await sP;
const ang = (a, c) => { if (!a || !c) return 0; const n = (v, i) => Math.hypot(v[i], v[i + 3], v[i + 6]) || 1; // column norms (strip scale)
  let tr = 0; for (let i = 0; i < 3; i++) { const na = Math.hypot(a[i * 3], a[i * 3 + 1], a[i * 3 + 2]) || 1, nc = Math.hypot(c[i * 3], c[i * 3 + 1], c[i * 3 + 2]) || 1; tr += (a[i * 3] * c[i * 3] + a[i * 3 + 1] * c[i * 3 + 1] + a[i * 3 + 2] * c[i * 3 + 2]) / (na * nc); }
  return Math.acos(Math.max(-1, Math.min(1, (tr - 1) / 2))) * 180 / Math.PI; };
const deltas = s.map((f, i) => (i ? +ang(s[i - 1].r, f.r).toFixed(1) : 0));
const onCube = s.findIndex((f) => f.hash.includes("cube"));
const after = deltas.slice(onCube + 1).filter((d) => d > 0);
const firstMoves = after.slice(0, 8); const maxDt = Math.max(...s.map((f) => f.dt));
const leap = Math.max(0, ...after.slice(0, 12));
console.log(`${leap > 20 || maxDt > 250 ? "RED  " : "GREEN"} KFA-22 home Play: max rAF gap ${maxDt} ms · first per-frame spin steps after arrival ${JSON.stringify(firstMoves)} deg · max step in the first 12 moving frames ${leap.toFixed(1)} deg (steady ≈3.8)`);
await b.close();
