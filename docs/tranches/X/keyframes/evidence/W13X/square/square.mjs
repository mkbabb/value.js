// SERVED MODEL: claude-opus-5-5 — X.KF.W13X.square · the Square scene's served predicates (READ-ONLY falsifier)
// Rows: KFA-4 34 90 91 92 93 94 96 97 98 146 147 186 206 207 · UIA-KF-026 064 088 089 090 199 200 292 293 294 295 296.
// Usage: BASE=http://localhost:5231 RUN=before-r1 node square.mjs
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const RUN = process.env.RUN || "run";
const FR = `${OUT}frames/${RUN}/`; fs.mkdirSync(FR, { recursive: true });
const BASE = process.env.BASE || "http://localhost:5231";
const CFGS = (process.env.CFGS || "1440x900-light,1440x900-dark,390x844-light,390x844-dark").split(",");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const r3 = (v) => Math.round(v * 1000) / 1000;
const rows = [];
const b = await chromium.launch({ headless: false });

// ── in-page helpers, installed once per page ──
const HELPERS = () => {
  const cv = document.createElement("canvas"); cv.width = cv.height = 1; const cx = cv.getContext("2d", { willReadFrequently: true });
  const rgb = (css) => { cx.clearRect(0, 0, 1, 1); cx.fillStyle = "#000"; cx.fillStyle = css; cx.fillRect(0, 0, 1, 1); const d = cx.getImageData(0, 0, 1, 1).data; return [d[0], d[1], d[2]]; };
  const lin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
  const oklab = (css) => { const [r, g, b] = rgb(css).map(lin);
    const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b), m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b), s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
    return [0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s, 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s, 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s]; };
  const box = () => document.querySelector(".demo-box");
  const fill = () => getComputedStyle(box()).getPropertyValue("--subject-fill").trim() || getComputedStyle(box()).backgroundColor;
  // the painted linear part (a,b,c,d) and translate of the box
  const pose = () => { const m = new DOMMatrixReadOnly(getComputedStyle(box()).transform); const rot = Math.atan2(m.b, m.a) * 180 / Math.PI;
    // principal stretch axis of M·Mᵀ and the shear (angle between mapped axes − 90°)
    const A = m.a * m.a + m.c * m.c, B = m.a * m.b + m.c * m.d, C = m.b * m.b + m.d * m.d; const ax = 0.5 * Math.atan2(2 * B, A - C) * 180 / Math.PI;
    const tr = (A + C) / 2, dt = Math.sqrt(Math.max(0, ((A - C) / 2) ** 2 + B * B)); const s1 = Math.sqrt(tr + dt), s2 = Math.sqrt(Math.max(0, tr - dt));
    const shear = Math.acos(Math.max(-1, Math.min(1, (m.a * m.c + m.b * m.d) / (Math.hypot(m.a, m.b) * Math.hypot(m.c, m.d) || 1)))) * 180 / Math.PI - 90;
    const br = box().getBoundingClientRect();
    return { tx: m.e, ty: m.f, rot, ax, aniso: s1 / (s2 || 1) - 1, s1, shear, w: br.width, mode: box().dataset.squareMode, sweep: box().hasAttribute("data-palette-sweep"), dragging: box().classList.contains("demo-box--dragging"), fill: fill() }; };
  const dE = (a, b) => { const A = oklab(a), B = oklab(b); return Math.hypot(A[0] - B[0], A[1] - B[1], A[2] - B[2]); };
  const chroma = (css) => { const o = oklab(css); return Math.hypot(o[1], o[2]); };
  const rec = (ms) => new Promise((res) => { const out = []; const t0 = performance.now(); let last = t0;
    const f = (t) => { out.push({ t: t - t0, dt: t - last, ...pose() }); last = t; if (t - t0 < ms) requestAnimationFrame(f); else res(out); }; requestAnimationFrame(f); });
  window.__sq = { rgb, oklab, pose, dE, chroma, rec, box, fill };
};

// the tether's visible fraction: 61 samples along the path, a sample is visible when the topmost
// hit-testable element at it is not the box (the tether itself is pointer-transparent)
const tetherVis = (p) => p.evaluate(() => {
  const path = document.querySelector(".square-tether-line"); const svg = path.ownerSVGElement; const op = +getComputedStyle(svg).opacity;
  const L = path.getTotalLength(); const M = path.getScreenCTM(); const box = document.querySelector(".demo-box"); let vis = 0; const N = 61;
  for (let i = 0; i < N; i++) { const q = path.getPointAtLength((L * i) / (N - 1)); const x = M.a * q.x + M.c * q.y + M.e, y = M.b * q.x + M.d * q.y + M.f;
    const el = document.elementFromPoint(x, y); if (el && !box.contains(el)) vis++; }
  return { opacity: op, length: Math.round(L), visible: vis, of: N };
});
const statics = (p) => p.evaluate(() => {
  const stage = document.querySelector(".square-stage").getBoundingClientRect();
  const fields = [...document.querySelectorAll(".square-field")].map((e) => { const bi = getComputedStyle(e).backgroundImage; const r = e.getBoundingClientRect();
    return { horiz: /to (bottom|top)/.test(bi), vert: /to right/.test(bi), w: Math.round(r.width), h: Math.round(r.height) }; });
  const badge = document.querySelector(".square-telemetry [class*=badge]"); const bs = badge ? getComputedStyle(badge) : null; const brr = badge?.getBoundingClientRect();
  const box = document.querySelector(".demo-box"); const sh = getComputedStyle(box).boxShadow; const cols = sh.match(/(rgba?\([^)]*\)|color\([^)]*\)|oklab\([^)]*\)|oklch\([^)]*\))/g) || [];
  const halo = cols.at(-1) || ""; const haloL = halo ? window.__sq.oklab(halo)[0] : null; const haloA = (halo.match(/[,/]\s*([\d.]+)\)$/) || [])[1];
  const lg = document.querySelector(".square-legend"); const lr = lg.getBoundingClientRect(); const hit = document.elementFromPoint(lr.left + lr.width / 2, Math.min(innerHeight - 1, lr.top + lr.height / 2));
  return { stageW: Math.round(stage.width), stageH: Math.round(stage.height), fields,
    badge: badge ? { w: Math.round(brr.width), h: Math.round(brr.height), radius: bs.borderTopLeftRadius, glass: badge.className.includes("badge-atom") || badge.hasAttribute("data-badge") } : null,
    haloL: haloL == null ? null : Math.round(haloL * 1000) / 1000, haloA: haloA ? +haloA : null,
    legend: { top: Math.round(lr.top), bottom: Math.round(lr.bottom), vh: innerHeight, covered: !!hit && !document.querySelector(".square-stage").contains(hit), coveredBy: hit ? (hit.className?.baseVal ?? hit.className).toString().slice(0, 60) : null },
    travelProp: getComputedStyle(box).getPropertyValue("--square-travel").trim() };
});
const boxRel = (p) => p.evaluate(() => { const s = document.querySelector(".square-stage").getBoundingClientRect(); const bx = document.querySelector(".demo-box").getBoundingClientRect();
  return { dx: Math.round(bx.left + bx.width / 2 - (s.left + s.width / 2)), dy: Math.round(bx.top + bx.height / 2 - (s.top + s.height / 2)), marginR: Math.round(s.right - (bx.right + 8)), marginB: Math.round(s.bottom - (bx.bottom + 8)), halfW: Math.round(s.width / 2), halfH: Math.round(s.height / 2), boxHalf: Math.round(bx.width / 2) }; });
const center = async (p) => { const r = await p.locator(".demo-box").boundingBox(); return [r.x + r.width / 2, r.y + r.height / 2]; };

const tap = async (p, x, y) => { await p.mouse.move(x, y); await p.mouse.down(); await p.mouse.up(); };
const focusBox = (p) => p.evaluate(() => document.querySelector(".demo-box").focus());
const blur = (p) => p.evaluate(() => { document.activeElement?.blur?.(); });
const shot = (p, name) => p.screenshot({ path: `${FR}${name}.jpg`, type: "jpeg", quality: 70 });
const rec = (p, ms) => p.evaluate((m) => window.__sq.rec(m), ms);
const maxStep = (s, f) => { let m = 0; for (let i = 1; i < s.length; i++) m = Math.max(m, f(s[i - 1], s[i])); return m; };
const dE = (p, a, c) => p.evaluate(([x, y]) => window.__sq.dE(x, y), [a, c]);

async function dynamics(p, row, cfg) {
  const d = (row.dyn = {});
  // travel envelope (UIA-KF-090 / 296): the far corner by the box's own End key
  await focusBox(p); await p.keyboard.press("End"); await sleep(1800);
  d.end = await boxRel(p); await shot(p, `${cfg}-end`);
  await p.keyboard.press("Home"); await sleep(1800);
  // KFA-4 · KFA-93 · UIA-KF-293: a held far drag, then the release fling
  let [x, y] = await center(p); await p.mouse.move(x, y); await p.mouse.down();
  for (let i = 1; i <= 20; i++) { await p.mouse.move(x + i * 20, y + i * 20); await sleep(16); }
  await sleep(150); d.tether = await tetherVis(p); await shot(p, `${cfg}-drag-held`);
  const held = await rec(p, 900); d.heldNotDrag = held.filter((f) => f.mode !== "drag").length; d.heldFrames = held.length;
  await p.mouse.up(); await sleep(1500); await focusBox(p); await p.keyboard.press("Home"); await sleep(1800);
  // KFA-93 (found at confirm): a flick — released mid-motion; every frame the box still moves is the drag's
  [x, y] = await center(p); await p.mouse.move(x, y); await p.mouse.down();
  for (let i = 1; i <= 4; i++) { await p.mouse.move(x + i * 40, y + i * 25); await sleep(16); }
  const flingP = rec(p, 600); await p.mouse.up(); const fling = await flingP;
  const movingF = fling.filter((f, i) => i > 0 && Math.hypot(f.tx - fling[i - 1].tx, f.ty - fling[i - 1].ty) > 0.3);
  d.flingMoving = movingF.length; d.flingMovingNotDrag = movingF.filter((f) => f.mode !== "drag").length;
  await sleep(1500); await focusBox(p); await p.keyboard.press("Home"); await sleep(1800);
  // KFA-34 · KFA-92 · KFA-186: an ordinary diagonal drag, sampled per rAF
  [x, y] = await center(p); await p.mouse.move(x, y); await p.mouse.down();
  const dragP = rec(p, 1300);
  for (let i = 1; i <= 45; i++) { const j = i % 2 ? 1 : -1; await p.mouse.move(x + i * 4 + j, y + i * 4 - j); await sleep(16); } // a hand's diagonal: ±1 px of jitter
  await sleep(250); await p.mouse.up(); const s = await dragP;
  let flips = 0; for (let i = 1; i < s.length; i++) { const a = s[i - 1], c = s[i]; if (a.aniso > 0.02 && c.aniso > 0.02) { let dd = Math.abs(a.ax - c.ax) % 180; if (dd > 90) dd = 180 - dd; if (dd > 45) flips++; } }
  const moving = s.filter((f) => Math.abs(f.tx) > 0.5 || Math.abs(f.ty) > 0.5);
  d.diag = { frames: s.length, axisFlips: flips, widthPopMax: r3(maxStep(s, (a, c) => Math.abs(c.w - a.w))), maxShear: r3(Math.max(...s.map((f) => Math.abs(f.shear)))),
    maxAniso: r3(Math.max(...s.map((f) => f.aniso))), firstShear: moving.length ? r3(Math.abs(moving[0].shear)) : null,
    bothPinned: s.filter((f) => f.aniso >= 0.15 && Math.abs(f.shear) >= 7).length, shearStepMax: r3(maxStep(s, (a, c) => Math.abs(c.shear - a.shear))) };
  await sleep(1500); await focusBox(p); await p.keyboard.press("Home"); await sleep(1800);
  // KFA-147: one tap flashes no drag affordance
  [x, y] = await center(p); const tapP = rec(p, 250); await tap(p, x, y); const t = await tapP;
  d.tapDragFrames = t.filter((f) => f.mode === "drag" || f.dragging).length; await sleep(700);
}

const space = async (p) => { await blur(p); await p.keyboard.press("Space"); };
const badgeText = (p) => p.evaluate(() => document.querySelector(".square-telemetry [class*=badge]")?.textContent.trim());
const settleRot = (s) => { let last = 0; for (let i = 1; i < s.length; i++) if (Math.abs(s[i].rot - s[i - 1].rot) > 0.2) last = s[i].t; return last; };

async function transport(p, row, cfg) {
  const d = row.dyn;
  const rest = await p.evaluate(() => window.__sq.fill());
  // KFA-90 · KFA-206 · KFA-146 · KFA-91: Play from rest, the fill per rAF over one tour
  const playP = rec(p, 2300); await sleep(60); await space(p); const s = await playP;
  const i0 = s.findIndex((f) => f.fill !== s[0].fill || Math.abs(f.rot) > 0.01 || Math.abs(f.tx) > 0.01);
  const steps = []; for (let i = 1; i < s.length; i++) steps.push(await dE(p, s[i - 1].fill, s[i].fill));
  const chromas = await p.evaluate((fs) => fs.map((f) => window.__sq.chroma(f)), s.map((f) => f.fill));
  d.play = { restFill: rest, firstMovedIdx: i0, firstFillJump: i0 > 0 ? r3(await dE(p, s[0].fill, s[i0].fill)) : null, maxFillStep: r3(Math.max(...steps)),
    drops400: s.filter((f) => f.t < 400 && f.dt > 30).length, minChroma: r3(Math.min(...chromas.slice(Math.max(0, i0)))) };
  // KFA-94 · UIA-KF-199: a grab mid-tour, the scale across the grab, the rest pose after, and Home
  await sleep(300); let [x, y] = await center(p);
  const pre = await p.evaluate(() => window.__sq.pose()); await p.mouse.move(x, y); await p.mouse.down();
  const post = await rec(p, 80); await p.mouse.up();
  // the largest ONE-FRAME scale step across the grab (the pop), not the window's drift
  const seq = [pre, ...post]; let step = 0; for (let i = 1; i < seq.length; i++) step = Math.max(step, Math.abs(seq[i].s1 / seq[i - 1].s1 - 1));
  d.grab = { preRot: r3(pre.rot), scaleJump: r3(step) };
  await sleep(2600); const after = await p.evaluate(() => window.__sq.pose()); await shot(p, `${cfg}-after-takeover`);
  d.grab.restRot = r3(after.rot); d.grab.restFillDE = r3(await dE(p, rest, after.fill));
  await focusBox(p); await p.keyboard.press("Home"); await sleep(2200); const home = await p.evaluate(() => window.__sq.pose());
  d.grab.homeRot = r3(home.rot); d.grab.homeFillDE = r3(await dE(p, rest, home.fill)); await shot(p, `${cfg}-after-home`);
  // UIA-KF-026: Play → drag takeover → Esc → Home
  await space(p); await sleep(700); [x, y] = await center(p); await p.mouse.move(x, y); await p.mouse.down(); await p.mouse.move(x + 30, y + 10); await p.mouse.up();
  await sleep(300); await blur(p); await p.keyboard.press("Escape"); await sleep(1000);
  const esc = await p.evaluate(() => window.__sq.pose()); await shot(p, `${cfg}-after-escape`);
  d.reset = { fillDE: r3(await dE(p, rest, esc.fill)), rot: r3(esc.rot), tx: r3(esc.tx), ty: r3(esc.ty), badge: await badgeText(p), mode: esc.mode,
    scrub: await p.evaluate(() => [...document.querySelectorAll("[role=slider]")].filter((e) => !e.closest(".demo-box")).map((e) => e.getAttribute("aria-valuenow"))) };
  await focusBox(p); await p.keyboard.press("Home"); await sleep(2200); const h2 = await p.evaluate(() => window.__sq.pose());
  d.reset.homeRot = r3(h2.rot); d.reset.homeFillDE = r3(await dE(p, rest, h2.fill)); d.reset.homeTx = r3(h2.tx);
  // KFA-98 · KFA-97 · KFA-207: the tumble, from a fresh rest (a reload)
  await p.reload(); await p.waitForSelector(".demo-box"); await sleep(2500); await p.evaluate(HELPERS);
  [x, y] = await center(p); const tP = rec(p, 3200); await sleep(40); await tap(p, x, y); await sleep(110); await tap(p, x, y); const t = await tP;
  const on = t.findIndex((f) => f.sweep); const land = Math.round(t.find((f) => f.sweep)?.rot ?? 0);
  const sweepEnd = t.reduce((m, f) => (f.sweep ? f.t : m), 0);
  const unwrapped = []; let acc = 0; for (let i = 0; i < t.length; i++) { if (i) { let dd = t[i].rot - t[i - 1].rot; if (dd > 180) dd -= 360; if (dd < -180) dd += 360; acc += dd; } unwrapped.push(acc); }
  d.tumble = { sweepFrames: t.filter((f) => f.sweep).length, firstSweepDE: on > 0 ? r3(await dE(p, t[on - 1].fill, t[on].fill)) : null,
    restAt: Math.round(settleRot(t)), sweepEndAt: Math.round(sweepEnd), lingerMs: Math.round(sweepEnd - settleRot(t)),
    overshootDeg: r3(Math.max(...unwrapped) - 360), minAfterPeak: r3(Math.min(...unwrapped.slice(unwrapped.indexOf(Math.max(...unwrapped)))) - 360) };
  await sleep(600);
}

async function tumblePlay(p, row, cfg) {
  const d = row.dyn;
  // KFA-97 (bloom tone): 350 ms into a tumble, the halo's colour against the box's own fill
  let [x, y] = await center(p); await tap(p, x, y); await sleep(110); await tap(p, x, y); await sleep(350);
  // the bloom's colour where it is HEADING: a running box-shadow transition's last keyframe, else the computed value
  d.bloom = await p.evaluate(() => { const b = window.__sq.box(); const tr = b.getAnimations().find((a) => a.transitionProperty === "box-shadow");
    const sh = tr ? tr.effect.getKeyframes().at(-1).boxShadow : getComputedStyle(b).boxShadow; const cols = sh.match(/(rgba?\([^)]*\)|color\([^)]*\)|oklab\([^)]*\)|oklch\([^)]*\))/g) || [];
    return { sweep: b.hasAttribute("data-palette-sweep"), haloVsFill: cols.length ? Math.round(window.__sq.dE(cols.at(-1), window.__sq.fill()) * 1000) / 1000 : null }; });
  await sleep(2500);
  // KFA-96: Play 420 ms into a tumble
  [x, y] = await center(p); await tap(p, x, y); await sleep(110); await tap(p, x, y); await sleep(420);
  const s0 = await p.evaluate(() => window.__sq.pose()); const pP = rec(p, 700); await space(p); const s = await pP;
  const afterPlay = s.filter((f) => f.t > 300);
  d.tumblePlay = { preRot: r3(s0.rot), sweepAfter300: afterPlay.filter((f) => f.sweep).length, of: afterPlay.length, maxRotStep: r3(maxStep(s, (a, c) => { let dd = Math.abs(c.rot - a.rot); return dd > 180 ? 360 - dd : dd; })) };
  await space(p); await sleep(200); await blur(p); await p.keyboard.press("Escape"); await sleep(600);
}

async function panes(p, row, cfg) {
  // UIA-KF-200 · UIA-KF-294 · UIA-KF-295: the shared Keyframes / Timeline panes on the square route
  const out = (row.panes = {});
  for (const [k, name] of [["2", "keyframes"], ["3", "timeline"]]) {
    await blur(p); await p.keyboard.press(k); await sleep(1200); await shot(p, `${cfg}-pane-${name}`);
    out[name] = await p.evaluate(() => {
      // action rows: any flex-wrap row of ≥3 buttons whose last button sits on a lower line than the first
      const rowsW = [...document.querySelectorAll("div,section")].filter((e) => { const bs = [...e.children].filter((c) => c.tagName === "BUTTON" && c.offsetParent); return bs.length >= 3; })
        .map((e) => { const bs = [...e.children].filter((c) => c.tagName === "BUTTON" && c.offsetParent); const ys = bs.map((b) => Math.round(b.getBoundingClientRect().top)); return { n: bs.length, lines: new Set(ys).size, lastAlone: ys.filter((v) => v === ys.at(-1)).length === 1 && new Set(ys).size > 1 }; });
      const trash = [...document.querySelectorAll("button")].filter((b) => /delete|remove|clear all/i.test(b.getAttribute("aria-label") || b.title || "") && b.offsetParent).map((b) => ({ label: b.getAttribute("aria-label") || b.title, disabled: b.disabled || b.getAttribute("aria-disabled") === "true" }));
      const boxes = document.querySelectorAll(".demo-box").length;
      return { orphanRows: rowsW.filter((r) => r.lastAlone).length, rows: rowsW.length, trash, demoBoxes: boxes };
    });
  }
  await blur(p); await p.keyboard.press("1"); await sleep(600);
}

for (const cfg of CFGS) {
  const [vp, theme] = cfg.split("-"); const [w, h] = vp.split("x").map(Number); const touch = w < 1024;
  const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, colorScheme: theme });
  await ctx.addInitScript((t) => { try { if (!sessionStorage.getItem("__s")) { localStorage.clear(); sessionStorage.setItem("__s", "1"); } localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  const p = await ctx.newPage(); const row = { cfg };
  try {
    await p.goto(`${BASE}/#/square`); await p.waitForSelector(".demo-box", { timeout: 30000 }); await sleep(2500);
    await p.evaluate(HELPERS);
    row.static = await statics(p); await shot(p, `${cfg}-rest`);
    if (theme === "light" || process.env.ALL) { await dynamics(p, row, cfg); await transport(p, row, cfg); await tumblePlay(p, row, cfg); }
    if (w >= 1024 && theme === "light") await panes(p, row, cfg);
    row.static2 = await statics(p);
  } catch (e) { row.error = String(e).slice(0, 300); }
  rows.push(row); console.log(JSON.stringify(row));
  await ctx.close();
}
fs.writeFileSync(`${OUT}${RUN}.json`, JSON.stringify(rows, null, 1));
await b.close();
