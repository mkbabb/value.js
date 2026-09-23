// easing-picker-curve — headed Chromium, real GPU, served page. Read-only on keyframes.js.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
import fs from "node:fs";
const KF = "/Users/mkbabb/Programming/keyframes.js";
const khead = () => execSync(`git -C ${KF} rev-parse --short HEAD`).toString().trim();
const kdirty = () => execSync(`git -C ${KF} status --porcelain | wc -l`).toString().trim();
const OUT = process.cwd();
for (const d of ["panel-open", "panel-close", "tfp"]) fs.mkdirSync(`${OUT}/${d}`, { recursive: true });
const meta = { started: new Date().toISOString(), khead: khead(), kdirty: kdirty(), parts: {} };
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const p = await ctx.newPage();
const raf = () => p.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
meta.gpu = null;

const readPicker = (sel) => p.evaluate((sel) => {
  const pk = document.querySelector(sel); const svg = pk.querySelector("svg");
  const hs = [...svg.querySelectorAll("circle[role=slider]")].map((c) => { const r = c.getBoundingClientRect(); return [+(r.x + r.width / 2).toFixed(2), +(r.y + r.height / 2).toFixed(2), +r.width.toFixed(2)]; });
  const sr = svg.getBoundingClientRect();
  const lits = [...document.querySelectorAll("body *")].filter((e) => e.children.length === 0 && /cubic-bezier\(/.test(e.textContent || "") && !pk.contains(e)).map((e) => e.textContent.trim().slice(0, 60));
  const ro = pk.querySelector("code, [data-testid*=readout], .font-mono"); 
  return { vb: svg.getAttribute("viewBox"), svg: [sr.x, sr.y, sr.width, sr.height].map((v) => +v.toFixed(1)), handles: hs, pts: [...svg.querySelectorAll("circle[role=slider]")].map((c) => c.getAttribute("aria-valuetext")), lits, readout: ro ? ro.textContent.trim().slice(0, 60) : null, dot: !!pk.querySelector("[data-testid=easing-travel-dot]"), pickerAnims: document.getAnimations().filter((a) => a.effect && a.effect.target && pk.contains(a.effect.target)).length, pathLen: svg.querySelector("path[stroke-linecap=round]")?.getAttribute("d")?.length ?? 0 };
}, sel);
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
    const mine = all.filter((a) => a.effect && a.effect.target && root.contains(a.effect.target) && a.constructor.name === 'CSSTransition');
    window.__swap = mine;
    const card = root.closest(".card") || root; const r = card.getBoundingClientRect();
    return { total: all.length, n: mine.length, list: mine.map((a) => ({ type: a.constructor.name, prop: a.transitionProperty || a.animationName, dur: a.effect.getTiming().duration, ease: a.effect.getTiming().easing, ct: a.currentTime, tgt: (a.effect.target.className || "").toString().slice(0, 50) })), rowsClass: rows.map((c) => c.className), card: [r.x, r.y, r.width, r.height] };
  }, trigger);
  if (info.err) return info;
  const dur = Math.max(...info.list.filter((a) => a.type === 'CSSTransition').map((a) => a.dur), 1);
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
await p.waitForTimeout(400); const tr = await readPicker(TFP).catch((e) => ({ err: String(e) }));
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
meta.endedD = new Date().toISOString(); meta.kheadEnd = khead(); meta.kdirtyEnd = kdirty();
fs.writeFileSync(`${OUT}/meta-panel.json`, JSON.stringify(meta, null, 1));
await b.close();
console.log('done');
