// easing-picker-curve — headed Chromium, real GPU, served page. Read-only on keyframes.js.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
import fs from "node:fs";
const KF = "/Users/mkbabb/Programming/keyframes.js";
const khead = () => execSync(`git -C ${KF} rev-parse --short HEAD`).toString().trim();
const kdirty = () => execSync(`git -C ${KF} status --porcelain | wc -l`).toString().trim();
const OUT = process.cwd();
for (const d of ["drag", "live", "panel-open", "panel-close", "tfp"]) fs.mkdirSync(`${OUT}/${d}`, { recursive: true });
const meta = { started: new Date().toISOString(), khead: khead(), kdirty: kdirty(), parts: {} };
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const p = await ctx.newPage();
const raf = () => p.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
meta.gpu = null;

// ───────── Part A: #/easing, stepped handle drag (48 frames) ─────────
await p.goto("http://localhost:5173/#/easing", { waitUntil: "networkidle" });
await p.waitForTimeout(2500);
meta.gpu = await p.evaluate(() => { const c = document.createElement("canvas").getContext("webgl"); const d = c && c.getExtension("WEBGL_debug_renderer_info"); return d ? c.getParameter(d.UNMASKED_RENDERER_WEBGL) : "none"; });
const readPicker = (sel) => p.evaluate((sel) => {
  const pk = document.querySelector(sel); const svg = pk.querySelector("svg");
  const hs = [...svg.querySelectorAll("circle[role=slider]")].map((c) => { const r = c.getBoundingClientRect(); return [+(r.x + r.width / 2).toFixed(2), +(r.y + r.height / 2).toFixed(2), +r.width.toFixed(2)]; });
  const sr = svg.getBoundingClientRect();
  const lits = [...document.querySelectorAll("body *")].filter((e) => e.children.length === 0 && /cubic-bezier\(/.test(e.textContent || "") && !pk.contains(e)).map((e) => e.textContent.trim().slice(0, 60));
  const ro = pk.querySelector("code, [data-testid*=readout], .font-mono"); 
  return { vb: svg.getAttribute("viewBox"), svg: [sr.x, sr.y, sr.width, sr.height].map((v) => +v.toFixed(1)), handles: hs, pts: [...svg.querySelectorAll("circle[role=slider]")].map((c) => c.getAttribute("aria-valuetext")), lits, readout: ro ? ro.textContent.trim().slice(0, 60) : null, dot: !!pk.querySelector("[data-testid=easing-travel-dot]"), pickerAnims: document.getAnimations().filter((a) => a.effect && a.effect.target && pk.contains(a.effect.target)).length, pathLen: svg.querySelector("path[stroke-linecap=round]")?.getAttribute("d")?.length ?? 0 };
}, sel);
const PK = "[data-testid=easing-picker]";
const rest = await readPicker(PK);
meta.parts.A = { rest };
await p.screenshot({ path: `${OUT}/A-rest-full.png` });
const card = await p.evaluate(() => { const r = document.querySelector("[data-testid=easing-picker]").closest(".card").getBoundingClientRect(); return [r.x, r.y, r.width, r.height]; });
const clip = { x: Math.max(0, card[0] - 12), y: Math.max(0, card[1] - 12), width: card[2] + 24, height: card[3] + 24 };
meta.parts.A.clip = clip;
// Pointer path, fixed in SCREEN space from the rest-state CTM (what a user's hand does).
const [hx, hy] = rest.handles[1]; // P2 (0.25, 1.00)
const scale = rest.svg[2]; // px per viewBox unit (meet, width-bound)
const N = 48; const path = [];
for (let i = 0; i < N; i++) { const t = i / (N - 1);
  // up-right to y=1.5 (overshoot) for first half, then down-right to y=0.2
  const ux = 0.25 + 0.55 * t; const uy = t < 0.5 ? 1 + 1.0 * (t / 0.5) * 0.5 : 1.5 - 1.3 * ((t - 0.5) / 0.5);
  path.push([hx + (ux - 0.25) * scale, hy - (uy - 1) * scale]); }
await p.mouse.move(hx, hy); await raf();
await p.mouse.down(); await raf();
const Aframes = [];
for (let i = 0; i < N; i++) {
  await p.mouse.move(path[i][0], path[i][1]); await raf();
  const s = await readPicker(PK);
  const h = s.handles[1];
  const err = +Math.hypot(h[0] - path[i][0], h[1] - path[i][1]).toFixed(2);
  const name = `drag/f${String(i).padStart(3, "0")}.png`;
  await p.screenshot({ path: `${OUT}/${name}`, clip });
  Aframes.push({ i, name, ptr: path[i].map((v) => +v.toFixed(1)), handle: h, err, vb: s.vb, svg: s.svg, pts: s.pts, lits: s.lits, readout: s.readout, khead: khead(), kdirty: kdirty() });
}
await p.mouse.up(); await raf();
meta.parts.A.frames = Aframes;
meta.parts.A.after = await readPicker(PK);
await p.screenshot({ path: `${OUT}/A-after-full.png` });

// ───────── Part B: real-time screencast of a drag + rAF deltas ─────────
await p.goto("http://localhost:5173/#/easing", { waitUntil: "networkidle" });
await p.waitForTimeout(2000);
const r2 = await readPicker(PK);
const cdp = await ctx.newCDPSession(p);
const sc = [];
cdp.on("Page.screencastFrame", async (f) => { sc.push({ data: f.data, ts: f.metadata.timestamp }); try { await cdp.send("Page.screencastFrameAck", { sessionId: f.sessionId }); } catch {} });
await p.evaluate(() => { window.__rd = []; let last = performance.now(); const f = (t) => { window.__rd.push(t - last); last = t; if (window.__rdOn) requestAnimationFrame(f); }; window.__rdOn = true; requestAnimationFrame(f); });
await cdp.send("Page.startScreencast", { format: "png", everyNthFrame: 1 });
const [bx, by] = r2.handles[1]; const s2 = r2.svg[2];
await p.mouse.move(bx, by); await p.mouse.down();
for (let i = 1; i <= 90; i++) { const t = i / 90; const ux = 0.25 + 0.5 * Math.sin(Math.PI * t); const uy = 1 + 0.6 * Math.sin(2 * Math.PI * t); await p.mouse.move(bx + (ux - 0.25) * s2, by - (uy - 1) * s2); await p.waitForTimeout(16); }
await p.mouse.up();
await p.waitForTimeout(600);
await cdp.send("Page.stopScreencast");
const rdDrag = await p.evaluate(() => { window.__rdOn = false; return window.__rd; });
sc.forEach((f, i) => fs.writeFileSync(`${OUT}/live/s${String(i).padStart(3, "0")}.png`, Buffer.from(f.data, "base64")));
meta.parts.B = { frames: sc.map((f, i) => ({ i, ts: f.ts })), clip, rafDeltasDrag: summarize(rdDrag) };

// ───────── Part C: transport — scene Play for 3 s; does the picker move? ─────────
const before = await readPicker(PK);
await p.evaluate(() => { window.__rd = []; let last = performance.now(); const f = (t) => { window.__rd.push(t - last); last = t; if (window.__rdOn) requestAnimationFrame(f); }; window.__rdOn = true; requestAnimationFrame(f); });
await p.getByRole("button", { name: /^Play$/ }).first().click();
const Csamp = [];
for (let i = 0; i < 30; i++) { await p.waitForTimeout(100); const s = await readPicker(PK); Csamp.push({ i, vb: s.vb, h: s.handles, dot: s.dot, anims: s.pickerAnims }); }
const rdPlay = await p.evaluate(() => { window.__rdOn = false; return window.__rd; });
await p.screenshot({ path: `${OUT}/C-playing-full.png` });
meta.parts.C = { before: { vb: before.vb, h: before.handles }, changed: Csamp.filter((s) => JSON.stringify(s.h) !== JSON.stringify(before.handles) || s.dot || s.anims).length, samples: Csamp.length, rafDeltasPlay: summarize(rdPlay) };

// ───────── Part D: #/cube → Controls → Edit easing curve — panel slide (CSS transitions, pause+seek) ─────────
await p.goto("http://localhost:5173/#/cube", { waitUntil: "networkidle" });
await p.waitForTimeout(2500);
async function captureSwap(dir, trigger) {
  const info = await p.evaluate(async (trigger) => {
    const btn = trigger === "open" ? [...document.querySelectorAll('button[aria-label="Edit easing curve"]')].find((b) => b.getBoundingClientRect().width > 0 && b.getBoundingClientRect().x < 700)
                                   : [...document.querySelectorAll('button[aria-label="back to controls"]')].find((b) => b.getBoundingClientRect().width > 0);
    if (!btn) return { err: "no button " + trigger };
    const root = btn.closest(".panel-row").parentElement;
    btn.click();
    for (let i = 0; i < 5; i++) await Promise.resolve();
    await new Promise((r) => queueMicrotask(r));
    [...root.children].forEach((c) => getComputedStyle(c).gridTemplateRows);
    const all = document.getAnimations();
    all.forEach((a) => a.pause());
    const rows = [...root.children];
    const mine = all.filter((a) => a.effect && a.effect.target && root.contains(a.effect.target));
    window.__swap = mine;
    const card = root.closest(".card") || root; const r = card.getBoundingClientRect();
    return { total: all.length, n: mine.length, list: mine.map((a) => ({ type: a.constructor.name, prop: a.transitionProperty || a.animationName, dur: a.effect.getTiming().duration, ease: a.effect.getTiming().easing, ct: a.currentTime, tgt: (a.effect.target.className || "").toString().slice(0, 50) })), rowsClass: rows.map((c) => c.className), card: [r.x, r.y, r.width, r.height] };
  }, trigger);
  if (info.err) return info;
  const dur = Math.max(...info.list.map((a) => a.dur), 1);
  const clip = { x: Math.max(0, info.card[0] - 12), y: Math.max(0, info.card[1] - 12), width: info.card[2] + 24, height: Math.min(900 - info.card[1] + 12, 620) };
  const frames = [];
  for (let i = 0; i < 48; i++) {
    const t = (dur * i) / 47;
    const st = await p.evaluate((t) => { window.__swap.forEach((a) => (a.currentTime = t)); const root = window.__swap[0]?.effect.target.closest(".panel-row")?.parentElement; if (!root) return null; const cardEl = root.closest(".card") || root; return { rows: [...root.children].map((c) => { const r = c.getBoundingClientRect(); const pc = c.firstElementChild; return [+r.height.toFixed(1), pc ? +(+getComputedStyle(pc).opacity).toFixed(3) : null, getComputedStyle(c).gridTemplateRows]; }), cardH: +cardEl.getBoundingClientRect().height.toFixed(1) }; }, t);
    await raf();
    const name = `${dir}/f${String(i).padStart(3, "0")}.png`;
    await p.screenshot({ path: `${OUT}/${name}`, clip });
    frames.push({ i, t: +t.toFixed(1), name, ...st, khead: khead(), kdirty: kdirty() });
  }
  await p.evaluate(() => window.__swap.forEach((a) => a.play()));
  await p.evaluate(() => document.getAnimations().forEach((a) => a.play()));
  await p.waitForTimeout(800);
  return { ...info, clip, frames };
}
meta.parts.D = { open: await captureSwap("panel-open", "open") };
await p.screenshot({ path: `${OUT}/D-open-full.png` });
// TimingFunctionPanel geometry + a few drag frames
const TFP = ".panel-row--detail [data-testid=easing-picker]";
const tr = await readPicker(TFP).catch((e) => ({ err: String(e) }));
meta.parts.D.tfpRest = tr;
if (!tr.err && tr.handles?.length === 2) {
  const [tx, ty] = tr.handles[1]; const ts = tr.svg[2];
  const tclip = meta.parts.D.open.clip; const tfr = [];
  await p.mouse.move(tx, ty); await p.mouse.down();
  for (let i = 0; i < 24; i++) { const t = i / 23; await p.mouse.move(tx + 0.5 * t * ts, ty + 0.6 * t * ts); await raf(); const s = await readPicker(TFP); const name = `tfp/f${String(i).padStart(3, "0")}.png`; await p.screenshot({ path: `${OUT}/${name}`, clip: tclip }); tfr.push({ i, name, handle: s.handles[1], pts: s.pts, vb: s.vb, err: +Math.hypot(s.handles[1][0] - (tx + 0.5 * t * ts), s.handles[1][1] - (ty + 0.6 * t * ts)).toFixed(2) }); }
  await p.mouse.up();
  meta.parts.D.tfpDrag = tfr;
  meta.parts.D.selectText = await p.evaluate(() => [...document.querySelectorAll('[role=combobox]')].map((e) => e.textContent.trim()).filter((t) => /ease|cubic|custom/i.test(t)).slice(0, 3));
}
meta.parts.D.close = await captureSwap("panel-close", "close");
await p.screenshot({ path: `${OUT}/D-closed-full.png` });
meta.ended = new Date().toISOString(); meta.kheadEnd = khead(); meta.kdirtyEnd = kdirty();
fs.writeFileSync(`${OUT}/meta.json`, JSON.stringify(meta, null, 1));
await b.close();
function summarize(d) { const x = d.slice(1); const s = [...x].sort((a, b) => a - b); return { n: x.length, over20: x.filter((v) => v > 20).length, p50: +s[Math.floor(s.length / 2)]?.toFixed(1), p95: +s[Math.floor(s.length * 0.95)]?.toFixed(1), max: +Math.max(...x).toFixed(1) }; }
console.log("done");
