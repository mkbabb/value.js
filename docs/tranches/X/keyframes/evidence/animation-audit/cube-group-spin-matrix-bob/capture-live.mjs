// cube-group-spin-matrix-bob — LIVE capture (headed Chromium, real GPU, served page).
// Method (3) screencast every frame + rAF transform sampler + transport probes.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
const OUT = path.dirname(new URL(import.meta.url).pathname) + "/live";
fs.mkdirSync(OUT + "/frames", { recursive: true });
const kf = "/Users/mkbabb/Programming/keyframes.js";
const khead = execSync(`git -C ${kf} rev-parse --short HEAD`).toString().trim();
const kdirty = execSync(`git -C ${kf} status --porcelain | wc -l`).toString().trim();
const log = { khead, kdirty, startedAt: new Date().toISOString(), console: [], errors: [] };

const browser = await chromium.launch({ headless: false });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") log.console.push(`${m.type()}: ${m.text()}`.slice(0, 300)); });
page.on("pageerror", (e) => log.errors.push(String(e).slice(0, 300)));
const cdp = await ctx.newCDPSession(page);
const frames = [];
cdp.on("Page.screencastFrame", async (f) => {
  frames.push({ ts: f.metadata.timestamp, data: f.data });
  try { await cdp.send("Page.screencastFrameAck", { sessionId: f.sessionId }); } catch {}
});
await cdp.send("Page.enable");
await cdp.send("Page.startScreencast", { format: "png", everyNthFrame: 1, maxWidth: 1440, maxHeight: 900 });
const navAt = Date.now() / 1000;
await page.goto("http://localhost:5173/#/cube", { waitUntil: "domcontentloaded" });
await page.waitForSelector(".cube", { timeout: 20000 });
const cubeAt = Date.now() / 1000;
// in-page rAF sampler for the whole screencast window (transforms per frame)
await page.evaluate(() => {
  const q = (s) => document.querySelector(s);
  window.__samples = [];
  const tick = (ts) => {
    const c = q(".cube"), p = q(".cube-pose"), b = q(".cube-bob"), g = q(".graph");
    window.__samples.push({ ts, wall: performance.timeOrigin + performance.now(),
      cube: c?.style.transform, pose: p?.style.transform, bob: b?.style.transform, graph: g?.style.transform });
    if (window.__samples.length < 5000) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
});
await page.waitForTimeout(12500);
await cdp.send("Page.stopScreencast");
const samples = await page.evaluate(() => window.__samples);
log.navAt = navAt; log.cubeAt = cubeAt;

// GPU / renderer
log.gpu = await page.evaluate(() => {
  const c = document.createElement("canvas"); const gl = c.getContext("webgl");
  const e = gl && gl.getExtension("WEBGL_debug_renderer_info");
  return e ? gl.getParameter(e.UNMASKED_RENDERER_WEBGL) : "n/a";
});
// Layer computed styles + boxes
log.layers = await page.evaluate(() => {
  const sel = { graph: ".graph", orbital: ".graph > *", idleHover: ".idle-hover", bob: ".cube-bob", pose: ".cube-pose", cube: ".cube", face1: ".cube-side" };
  const out = {};
  for (const [k, s] of Object.entries(sel)) {
    const el = document.querySelector(s); if (!el) { out[k] = null; continue; }
    const cs = getComputedStyle(el); const r = el.getBoundingClientRect();
    out[k] = { cls: el.className?.baseVal ?? el.className, inline: el.style.transform, transform: cs.transform, transformStyle: cs.transformStyle,
      opacity: cs.opacity, zIndex: cs.zIndex, blend: cs.mixBlendMode, filter: cs.filter, willChange: cs.willChange, perspective: cs.perspective,
      contain: cs.contain, overflow: cs.overflow, rect: [r.x, r.y, r.width, r.height].map(Math.round) };
  }
  out.getAnimations = document.getAnimations().map((a) => ({ name: a.animationName ?? a.id ?? a.constructor.name, target: a.effect?.target?.className?.toString().slice(0, 60), state: a.playState }));
  out.faces = document.querySelectorAll(".cube-side").length;
  return out;
});
await page.screenshot({ path: OUT + "/00-after-12s.png" });

// dropped frames over 3 s of live playback + per-channel change counts
log.live3s = await page.evaluate(() => new Promise((res) => {
  const q = (s) => document.querySelector(s); const d = []; let last = null; const seen = { cube: new Set(), pose: new Set(), bob: new Set() };
  const t0 = performance.now();
  const f = (ts) => { if (last !== null) d.push(ts - last); last = ts;
    seen.cube.add(q(".cube").style.transform); seen.pose.add(q(".cube-pose").style.transform); seen.bob.add(q(".cube-bob").style.transform);
    if (performance.now() - t0 < 3000) requestAnimationFrame(f); else res({ frames: d.length, over20: d.filter((x) => x > 20).length, max: Math.max(...d).toFixed(1), mean: (d.reduce((a, b) => a + b, 0) / d.length).toFixed(2),
      distinct: { cube: seen.cube.size, pose: seen.pose.size, bob: seen.bob.size }, poseSample: [...seen.pose].slice(0, 2), bobSample: [...seen.bob].slice(0, 3) }); };
  requestAnimationFrame(f);
}));

// Transport probes
const tr = {};
const btn = page.getByRole("button", { name: /Pause animation|Play animation/ }).first();
tr.playLabelBefore = await btn.getAttribute("aria-label").catch(() => "none");
const snap = () => page.evaluate(() => ({ cube: document.querySelector(".cube").style.transform, bob: document.querySelector(".cube-bob").style.transform, pose: document.querySelector(".cube-pose").style.transform }));
await btn.click();
await page.waitForTimeout(300);
tr.playLabelAfterClick1 = await page.getByRole("button", { name: /Pause animation|Play animation/ }).first().getAttribute("aria-label");
const a1 = await snap(); await page.waitForTimeout(1000); const a2 = await snap();
tr.pausedFrozen = JSON.stringify(a1) === JSON.stringify(a2); tr.pausedA = a1;
await page.screenshot({ path: OUT + "/01-paused.png" });
await page.getByRole("button", { name: /Pause animation|Play animation/ }).first().click();
await page.waitForTimeout(300);
const b1 = await snap(); await page.waitForTimeout(700); const b2 = await snap();
tr.resumedMoves = JSON.stringify(b1) !== JSON.stringify(b2);
tr.resumeContinuity = { pausedCube: a2.cube, resumedCube: b1.cube };
// sliders / timeline state
tr.sliders = await page.evaluate(() => [...document.querySelectorAll('[role="slider"], input[type="range"]')].map((s) => ({ label: s.getAttribute("aria-label"), valuenow: s.getAttribute("aria-valuenow"), disabled: s.getAttribute("aria-disabled") ?? s.getAttribute("data-disabled") ?? String(s.disabled ?? ""), rect: (() => { const r = s.getBoundingClientRect(); return [r.x, r.y, r.width, r.height].map(Math.round); })() })).slice(0, 12));
// animation select
const sel = page.getByRole("combobox", { name: "Select animation" }).first();
tr.selectExists = (await sel.count()) > 0;
if (tr.selectExists) {
  tr.selectValue = (await sel.textContent())?.trim();
  await sel.click(); await page.waitForTimeout(400);
  tr.selectOptions = await page.getByRole("option").allTextContents();
  await page.screenshot({ path: OUT + "/02-select-open.png" });
  const m = page.getByRole("option", { name: /Matrix/ }).first();
  if (await m.count()) { await m.click(); await page.waitForTimeout(500); }
  tr.selectAfter = (await sel.textContent())?.trim();
  const c1 = await snap(); await page.waitForTimeout(600); const c2 = await snap();
  tr.afterSelectMatrix = { cubeMoves: c1.cube !== c2.cube, poseMoves: c1.pose !== c2.pose, bobMoves: c1.bob !== c2.bob };
  await page.screenshot({ path: OUT + "/03-matrix-selected.png" });
}
log.transport = tr;

// write frames
const t0 = frames[0]?.ts ?? 0;
log.screencast = { count: frames.length, spanS: frames.length ? (frames.at(-1).ts - t0).toFixed(3) : 0 };
const idx = [];
frames.forEach((f, i) => { const n = String(i).padStart(4, "0"); fs.writeFileSync(`${OUT}/frames/f${n}.png`, Buffer.from(f.data, "base64")); idx.push({ i, t: +(f.ts - t0).toFixed(4), wall: f.ts }); });
fs.writeFileSync(OUT + "/frames.json", JSON.stringify(idx));
fs.writeFileSync(OUT + "/samples.json", JSON.stringify(samples));
fs.writeFileSync(OUT + "/log.json", JSON.stringify(log, null, 1));
console.log(JSON.stringify({ khead, kdirty, frames: frames.length, samples: samples.length, gpu: log.gpu, errors: log.errors.length }));
await browser.close();
