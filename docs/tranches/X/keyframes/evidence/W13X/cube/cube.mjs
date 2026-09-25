// SERVED MODEL: claude-opus-5-5 — X.KF.W13X.cube · the served cube probe
// rows: KFA-30/82/84/86/87/88/89/140/142/143/144/182 · UIA-KF-027
// usage: node cube.mjs <baseUrl> <tag>   (baseUrl e.g. http://localhost:5293)
import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const BASE = process.argv[2]; const TAG = process.argv[3] || "before";
const OUT = new URL("./frames/", import.meta.url).pathname;
const b = await chromium.launch({ headless: false, args: ["--use-angle=metal", "--enable-gpu"] });
const R = (v) => Math.round(v * 100) / 100;
const out = {};
// per-rAF sampler of an element's inline/computed transform for `ms`
const sample = (p, sel, ms, computed = false) => p.evaluate(([sel, ms, computed]) => new Promise((res) => {
  const el = document.querySelector(sel); const s = []; const t0 = performance.now();
  const f = () => { s.push([performance.now() - t0, computed ? getComputedStyle(el).transform : el.style.transform]); if (performance.now() - t0 < ms) requestAnimationFrame(f); else res(s); };
  requestAnimationFrame(f);
}), [sel, ms, computed]);
const open = async (theme, w, h, prm) => {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, colorScheme: theme, reducedMotion: prm ? "reduce" : "no-preference" });
  const p = await ctx.newPage(); await p.goto(`${BASE}/#/cube`, { waitUntil: "load" }); await p.waitForSelector(".cube-side"); await p.waitForTimeout(2500);
  return { ctx, p };
};
const center = (p, sel) => p.evaluate((sel) => { const r = document.querySelector(sel).getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; }, sel);
for (const [theme, w, h] of [[process.argv[4] || "light", 1440, 900]]) {
  const k = `${w}-${theme}`; const r = (out[k] = {});
  // ── static + face opacity (KFA-89/144/142) ───────────────────────────
  let { ctx, p } = await open(theme, w, h, false);
  r.loader = await p.evaluate(() => ({ spinnerNodes: document.querySelectorAll(".cube .animate-spin").length, showLoaderAttr: document.querySelectorAll("[show-loader]").length }));
  r.faceAlpha = await p.evaluate(() => [...document.querySelectorAll(".cube-side")].map((s) => {
    const a = (c) => { const m = /rgba?\(([^)]+)\)/.exec(c); if (!m) { const o = /\/\s*([\d.]+)\)/.exec(c); return o ? +o[1] : (c === "transparent" ? 0 : 1); } const parts = m[1].split(/[ ,/]+/).filter(Boolean); return parts.length > 3 ? +parts[3] : 1; };
    const layers = [s, ...s.querySelectorAll(".face-lacquer")].map((e) => a(getComputedStyle(e).backgroundColor));
    return Math.round((1 - layers.reduce((acc, x) => acc * (1 - x), 1)) * 1000) / 1000;
  }));
  await p.screenshot({ path: `${OUT}${TAG}-${k}-rest.png` });
  // ── KFA-182: Pause pauses ─────────────────────────────────────────────
  const pauseBtn = p.locator("button[aria-label='Pause animation']").first();
  r.pause = { hadPause: await pauseBtn.count() };
  if (r.pause.hadPause) { await pauseBtn.click(); await p.waitForTimeout(300);
    for (const sel of [".cube", ".cube-pose", ".cube-bob"]) { const s = await sample(p, sel, 800); r.pause[sel] = new Set(s.map((x) => x[1])).size; }
    await p.screenshot({ path: `${OUT}${TAG}-${k}-paused.png` }); }
  // ── KFA-86/140: roll overshoot + first-250 ms per-frame step ─────────
  // read from the COMPUTED transform, so the rAF lane (inline writes) and the
  // delegated WAAPI lane read alike: per-frame step = the rotation angle between
  // successive matrices; overshoot = the last local maximum of the angle to the
  // landing (scanning back from the end), which is the settle's peak.
  const c = await center(p, ".graph");
  const rollP = sample(p, ".idle-hover", 1900, true);
  await p.mouse.dblclick(c.x, c.y);
  const rs = await rollP;
  const rot3 = (t) => { const v = t.slice(t.indexOf("(") + 1, -1).split(",").map(Number); return v.length === 16 ? [v[0], v[1], v[2], v[4], v[5], v[6], v[8], v[9], v[10]] : [v[0], v[1], 0, v[2], v[3], 0, 0, 0, 1]; };
  const ang = (a, b) => { const A = rot3(a), B = rot3(b); const tr = A.reduce((s, x, i) => s + x * B[i], 0); return Math.acos(Math.max(-1, Math.min(1, (tr - 1) / 2))) * 180 / Math.PI; };
  const ms = rs.filter((x) => x[1] && x[1] !== "none");
  let moving = ms.findIndex((x, i) => i > 0 && x[1] !== ms[i - 1][1]);
  if (moving > 0) { const t0 = ms[moving - 1][0]; const fin = ms.at(-1)[1];
    let step250 = 0; for (let i = moving; i < ms.length && ms[i][0] - t0 < 250; i++) step250 = Math.max(step250, ang(ms[i - 1][1], ms[i][1]));
    const d = ms.map((x) => ang(x[1], fin)); let j = d.length - 1; while (j > 0 && d[j] <= 1e-6) j--; while (j > 0 && d[j - 1] >= d[j]) j--;
    r.roll = { frames: ms.length - moving, overshootDeg: R(d[j]), maxStepFirst250: R(step250) };
  } else r.roll = { frames: 0 };
  await p.waitForTimeout(400);
  await ctx.close();
  // ── KFA-87: roll under PRM ──────────────────────────────────────────
  ({ ctx, p } = await open(theme, w, h, true));
  const c2 = await center(p, ".graph"); const prmP = sample(p, ".idle-hover", 1300, true);
  await p.mouse.dblclick(c2.x, c2.y); const ps = await prmP;
  r.rollPRM = { distinctTransforms: new Set(ps.map((x) => x[1]).filter(Boolean)).size };
  await ctx.close();
  // ── KFA-88/143: axis lock-in / release — solid-stroke weight + bloom one frame after the key edge
  ({ ctx, p } = await open(theme, w, h, false));
  const c3 = await center(p, ".graph"); await p.mouse.move(c3.x, c3.y);
  const axisRead = () => p.evaluate(() => new Promise((res) => requestAnimationFrame(() => requestAnimationFrame(() => {
    const e = document.querySelector(".axis-line.x"); const cs = getComputedStyle(e); const af = getComputedStyle(e, "::after");
    const solid = cs.borderTopStyle === "solid" ? 1 : (af.content !== "none" && af.borderTopStyle === "solid" ? +af.opacity : 0);
    res({ solid: Math.round(solid * 100) / 100, filter: cs.filter === "none" ? "none" : "on", active: cs.getPropertyValue("--axis-active").trim() });
  }))));
  r.axis = { rest: await axisRead() };
  await p.keyboard.down("x"); r.axis.lockIn2f = await axisRead(); await p.waitForTimeout(500); r.axis.held = await axisRead();
  await p.screenshot({ path: `${OUT}${TAG}-${k}-axis-held.png` });
  await p.keyboard.up("x"); r.axis.release2f = await axisRead(); await p.waitForTimeout(600); r.axis.after = await axisRead();
  // ── UIA-KF-027: orbit drag acts during autoplay; KFA-82: hold-then-release does not fling
  const orbitSel = ".graph > div"; const tr0 = await p.evaluate((s) => document.querySelector(s).style.transform, orbitSel);
  await p.mouse.move(c3.x, c3.y); await p.mouse.down(); for (let i = 1; i <= 8; i++) { await p.mouse.move(c3.x + i * 12, c3.y + i * 4); await p.waitForTimeout(16); }
  const tr1 = await p.evaluate((s) => document.querySelector(s).style.transform, orbitSel);
  r.dragDuringAutoplay = { changed: tr0 !== tr1 };
  await p.waitForTimeout(400); // hold still
  const before = await p.evaluate((s) => document.querySelector(s).style.transform, orbitSel);
  const coastP = sample(p, orbitSel, 900); await p.mouse.up(); const cs = await coastP;
  r.holdRelease = { distinctAfterRelease: new Set(cs.map((x) => x[1])).size, movedFromHold: cs.at(-1)[1] !== before };
  await ctx.close();
}
console.log(JSON.stringify(out));
await b.close();
