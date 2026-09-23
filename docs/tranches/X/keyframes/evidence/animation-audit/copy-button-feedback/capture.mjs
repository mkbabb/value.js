// copy-button-feedback — headed Chromium, real GPU, served page. READ-ONLY on keyframes.js.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
import fs from "node:fs";
const KF = "/Users/mkbabb/Programming/keyframes.js";
const khead = () => execSync(`git -C ${KF} rev-parse --short HEAD`).toString().trim();
const kdirty = () => execSync(`git -C ${KF} status --porcelain | wc -l`).toString().trim();
const OUT = new URL(".", import.meta.url).pathname;
for (const d of ["live", "step"]) fs.mkdirSync(`${OUT}/${d}`, { recursive: true });
const meta = { started: new Date().toISOString(), khead: khead(), kdirty: kdirty(), parts: {} };
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await ctx.grantPermissions(["clipboard-read", "clipboard-write"], { origin: "http://localhost:5173" });
const p = await ctx.newPage();
const errs = []; p.on("pageerror", (e) => errs.push(String(e))); p.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") errs.push(m.type() + ": " + m.text().slice(0, 200)); });
await p.goto("http://localhost:5173/#/easing", { waitUntil: "networkidle" });
await p.waitForTimeout(2500);
meta.gpu = await p.evaluate(() => { const c = document.createElement("canvas").getContext("webgl"); const d = c && c.getExtension("WEBGL_debug_renderer_info"); return d ? c.getParameter(d.UNMASKED_RENDERER_WEBGL) : "none"; });
await p.screenshot({ path: `${OUT}/00-load-full.png` });
const SEL = "button[data-audit-cb]";
await p.evaluate(() => document.querySelector('button[aria-label="Copy easing literal"]')?.setAttribute("data-audit-cb", ""));
meta.candidates = await p.evaluate(() => [...document.querySelectorAll("button")].filter((x) => /cop/i.test(x.getAttribute("aria-label") || "")).map((x) => { const r = x.getBoundingClientRect(); return { label: x.getAttribute("aria-label"), r: [r.x, r.y, r.width, r.height].map(Math.round) }; }));
const probe = () => p.evaluate((SEL) => {
  const btn = document.querySelector(SEL); const svgs = [...btn.querySelectorAll(".clipboard-stack > svg")];
  const cs = (e) => { const s = getComputedStyle(e); const r = e.getBoundingClientRect(); return { cls: e.getAttribute("class"), inline: e.getAttribute("style"), transform: s.transform, opacity: s.opacity, z: s.zIndex, blend: s.mixBlendMode, filter: s.filter, willChange: s.willChange, rect: [r.x, r.y, r.width, r.height].map((v) => +v.toFixed(2)) }; };
  const br = btn.getBoundingClientRect(); const bs = getComputedStyle(btn);
  const hdr = btn.parentElement; 
  return { aria: btn.getAttribute("aria-label"), btn: { rect: [br.x, br.y, br.width, br.height].map((v) => +v.toFixed(2)), transform: bs.transform, overflow: bs.overflow }, glyphs: svgs.map(cs), order: svgs.map((s) => s.getAttribute("class")), status: btn.querySelector("[role=status]")?.textContent, tooltip: [...document.querySelectorAll("[role=tooltip],[data-reka-popper-content-wrapper]")].map((t) => t.textContent.trim()).slice(0, 3), context: btn.closest(".card, header, section")?.textContent.replace(/\s+/g, " ").trim().slice(0, 120), anims: document.getAnimations().filter((a) => a.effect?.target && btn.contains(a.effect.target)).length };
}, SEL);
meta.parts.rest = await probe();
const br = meta.parts.rest.btn.rect; const cx = br[0] + br[2] / 2, cy = br[1] + br[3] / 2;
const clip = { x: Math.round(cx - 40), y: Math.round(cy - 28), width: 80, height: 56 };
meta.clip = clip;
await p.screenshot({ path: `${OUT}/01-rest-context.png`, clip: { x: Math.max(0, br[0] - 420), y: Math.max(0, br[1] - 40), width: 520, height: 110 } });

// ── Part A: LIVE (method 3) — CDP screencast every frame + per-rAF style sampler, 3 clicks ──
const cdp = await ctx.newCDPSession(p);
const live = []; let recording = false, li = 0;
cdp.on("Page.screencastFrame", async (f) => { await cdp.send("Page.screencastFrameAck", { sessionId: f.sessionId }).catch(() => {}); if (!recording) return; const name = `live/s${String(li).padStart(3, "0")}.png`; fs.writeFileSync(`${OUT}/${name}`, Buffer.from(f.data, "base64")); live.push({ i: li++, name, ts: f.metadata.timestamp }); });
await p.evaluate((SEL) => {
  window.__cb = []; const btn = document.querySelector(SEL); const svgs = [...btn.querySelectorAll(".clipboard-stack > svg")];
  let last = performance.now(); window.__cbRun = true;
  const loop = (t) => { const s = svgs.map((e) => { const c = getComputedStyle(e); return [c.transform, c.opacity]; }); window.__cb.push({ t: +t.toFixed(2), dt: +(t - last).toFixed(2), clip: s[0], check: s[1], bt: getComputedStyle(btn).transform }); last = t; if (window.__cbRun) requestAnimationFrame(loop); };
  requestAnimationFrame(loop);
}, SEL);
await cdp.send("Page.startScreencast", { format: "png", everyNthFrame: 1 });
recording = true;
meta.parts.live = { clicks: [] };
for (let k = 0; k < 3; k++) {
  const t0 = await p.evaluate(() => performance.now());
  await p.mouse.click(cx, cy);
  meta.parts.live.clicks.push({ k, pageT: t0, wall: Date.now() / 1000 });
  await p.waitForTimeout(k === 0 ? 1200 : 700);
}
// rapid double-click re-entrancy
const t0d = await p.evaluate(() => performance.now());
await p.mouse.click(cx, cy); await p.waitForTimeout(80); await p.mouse.click(cx, cy);
meta.parts.live.clicks.push({ k: "double", pageT: t0d, wall: Date.now() / 1000 });
await p.waitForTimeout(900);
recording = false;
await cdp.send("Page.stopScreencast");
meta.parts.live.sampler = await p.evaluate(() => { window.__cbRun = false; return window.__cb; });
meta.parts.live.frames = live;
meta.parts.afterLive = await probe();
await p.screenshot({ path: `${OUT}/02-after-live-context.png`, clip: { x: Math.max(0, br[0] - 420), y: Math.max(0, br[1] - 40), width: 520, height: 110 } });
meta.parts.clipboardText = await p.evaluate(() => navigator.clipboard.readText().catch((e) => "ERR " + e)); 

// ── Part B: STEPPED (method 2) — the library's own clock: interpFrames(t, true) on each child ──
await p.mouse.move(5, 5); await p.waitForTimeout(900);
const gi = await p.evaluate((SEL) => {
  const btn = document.querySelector(SEL); let el = btn.querySelector(".clipboard-stack"); let inst = el.__vueParentComponent;
  while (inst && !(inst.setupState && "group" in inst.setupState)) inst = inst.parent;
  if (!inst) return { ok: false };
  const g = inst.setupState.group; window.__g = g;
  const es = g.getEntries();
  return { ok: true, n: es.length, singleTarget: g.singleTarget, children: es.map((e) => ({ dur: e.animation.options.duration, tf: String(e.animation.options.timingFunction).slice(0, 40), fill: e.animation.options.fillMode, iter: e.animation.options.iterationCount, target: e.animation.targets[0]?.getAttribute("class"), t: e.animation.t, done: e.animation.done, layer: { op: e.layer.op, enabled: e.layer.enabled } })) };
}, SEL);
meta.parts.step = { group: gi, frames: [] };
const N = 48;
if (gi.ok) {
  for (let i = 0; i < N; i++) {
    const t = +(200 * i / (N - 1)).toFixed(3);
    const st = await p.evaluate((t) => { for (const e of window.__g.getEntries()) e.animation.interpFrames(t, true); return null; }, t);
    await p.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
    const pr = await probe();
    const name = `step/f${String(i).padStart(3, "0")}.png`;
    await p.screenshot({ path: `${OUT}/${name}`, clip });
    meta.parts.step.frames.push({ i, t, name, clip: [pr.glyphs[0].transform, pr.glyphs[0].opacity], check: [pr.glyphs[1].transform, pr.glyphs[1].opacity], inlineCheck: pr.glyphs[1].inline, khead: khead(), kdirty: kdirty() });
  }
  // restore rest (t=200 final)
  await p.evaluate(() => { for (const e of window.__g.getEntries()) e.animation.interpFrames(200, true); });
}
meta.parts.afterStep = await probe();
// ── Part C: transport wiring — does the page transport (if present) touch it? (spacebar toggle) ──
meta.parts.transportButtons = await p.evaluate(() => [...document.querySelectorAll("button")].map((x) => x.getAttribute("aria-label")).filter((l) => l && /play|pause|scrub|restart/i.test(l)).slice(0, 8));
meta.errs = errs; meta.ended = new Date().toISOString(); meta.khead2 = khead(); meta.kdirty2 = kdirty();
fs.writeFileSync(`${OUT}/meta.json`, JSON.stringify(meta, null, 1));
console.log(JSON.stringify({ gpu: meta.gpu, cand: meta.candidates, rest: meta.parts.rest, gi, liveN: live.length, errs: errs.slice(0, 5) }, null, 1));
await b.close();
