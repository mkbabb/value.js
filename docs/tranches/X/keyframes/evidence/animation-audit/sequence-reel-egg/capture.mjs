// sequence-reel-egg capture — headed Chromium, real GPU, served page. Method (3): CDP screencast
// (everyNthFrame 1) + a per-rAF in-page sampler of every ball's engine-written style + geometry.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync, mkdirSync } from "node:fs";
import { execSync } from "node:child_process";
const D = "/Users/mkbabb/Programming/value.js/docs/tranches/X/keyframes/evidence/animation-audit/sequence-reel-egg";
const K = "/Users/mkbabb/Programming/keyframes.js";
const meta = { khead: execSync(`git -C ${K} rev-parse --short HEAD`).toString().trim(),
  kdirty: execSync(`git -C ${K} status --porcelain | wc -l`).toString().trim(), at: new Date().toISOString() };
const b = await chromium.launch({ headless: false });
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const logs = []; p.on("console", m => { if (m.type() !== "debug") logs.push(m.type() + ": " + m.text()); });
p.on("pageerror", e => logs.push("pageerror: " + e.message));
await p.goto("http://localhost:5173/#/sequence", { waitUntil: "networkidle" });
await p.waitForTimeout(2500);
meta.gpu = await p.evaluate(() => { const c = document.createElement("canvas").getContext("webgl"); const x = c && c.getExtension("WEBGL_debug_renderer_info"); return x ? c.getParameter(x.UNMASKED_RENDERER_WEBGL) : null; });
meta.stage = await p.evaluate(() => document.querySelector(".seq-stage").getBoundingClientRect().toJSON());
// in-page sampler
await p.evaluate(() => {
  window.__s = []; window.__phase = "idle"; let last = performance.now();
  const balls = [...document.querySelectorAll(".seq-ball")];
  const handles = [...document.querySelectorAll(".seq-handle")];
  const btn = document.querySelector('[aria-label^="Play the reel"]');
  const tick = (t) => {
    const cs = balls.map(e => { const s = getComputedStyle(e); const r = e.getBoundingClientRect();
      return { p: +s.getPropertyValue("--ball-p"), o: +s.opacity, sc: s.scale, tf: s.transform, cx: +(r.x + r.width / 2).toFixed(2), w: +r.width.toFixed(2) }; });
    const hx = handles.map(h => { const r = h.getBoundingClientRect(); return +(r.x + r.width / 2).toFixed(2); });
    const clock = document.querySelector(".seq-target, body").innerText.match(/CLOCK\s*([\d.]+)/)?.[1];
    window.__s.push({ t: +t.toFixed(2), dt: +(t - last).toFixed(2), ph: window.__phase, b: cs, hx, loading: btn.getAttribute("data-loading") ?? btn.getAttribute("aria-busy") ?? btn.disabled, clock });
    last = t; requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
});
const cdp = await p.context().newCDPSession(p);
const frames = []; let rec = null;
cdp.on("Page.screencastFrame", async (f) => {
  cdp.send("Page.screencastFrameAck", { sessionId: f.sessionId }).catch(() => {});
  if (rec) { const i = rec.n++; const fn = `${rec.dir}/f${String(i).padStart(4, "0")}.png`;
    writeFileSync(fn, Buffer.from(f.data, "base64")); frames.push({ phase: rec.name, i, ts: f.metadata.timestamp, file: fn }); }
});
await cdp.send("Page.startScreencast", { format: "png", everyNthFrame: 1 });
const phase = async (name, fn, ms) => {
  const dir = `${D}/${name}`; mkdirSync(dir, { recursive: true });
  await p.evaluate(n => { window.__phase = n; }, name);
  rec = { name, dir, n: 0 }; const t0 = Date.now();
  await fn(); await p.waitForTimeout(Math.max(0, ms - (Date.now() - t0)));
  rec = null; await p.evaluate(() => { window.__phase = "idle"; }); await p.waitForTimeout(400);
};
const reelBtn = p.locator('[aria-label^="Play the reel"]');
const dockPlay = async () => { const bs = await p.$$('button[aria-label="Play animation"], button[aria-label="Pause animation"]');
  for (const h of bs) { const r = await h.boundingBox(); if (r && r.y > 700 && r.width > 0 && await h.isVisible()) { await p.mouse.click(r.x + r.width / 2, r.y + r.height / 2); return r; } }
  await p.mouse.click(687, 792); return "fallback"; };
// A: button, from master origin
await phase("A-button", async () => { await p.waitForTimeout(150); await reelBtn.click(); }, 2800);
// B: typed trigger r-e-e-l, page focused (blur any focus first)
await phase("B-typed", async () => { await p.evaluate(() => document.activeElement?.blur()); await p.waitForTimeout(150); await p.keyboard.type("reel", { delay: 40 }); }, 2800);
// C: master scrubbed to ~0.5 first, then reel; mid-reel: PLAY (should be held) + scrub attempt (should be refused)
await p.mouse.move(386, 645); await p.mouse.down(); await p.mouse.move(560, 645, { steps: 6 }); await p.mouse.move(720, 645, { steps: 6 }); await p.mouse.up();
await p.waitForTimeout(500);
meta.preC = await p.evaluate(() => window.__s.at(-1));
await phase("C-held-play", async () => { await p.waitForTimeout(150); await reelBtn.click(); await p.waitForTimeout(200); meta.dockPlay = await dockPlay();
  await p.waitForTimeout(150); await p.mouse.move(720, 645); await p.mouse.down(); await p.mouse.move(900, 645, { steps: 5 }); await p.mouse.up(); }, 4200);
await p.waitForTimeout(1500);
// D: master PLAYING, then reel fires
await p.evaluate(() => document.activeElement?.blur());
const r0 = await p.evaluate(() => window.__s.length);
await phase("D-while-playing", async () => { await dockPlay(); await p.waitForTimeout(350); await reelBtn.click(); }, 3500);
// E: 3 s live master playback (drop-frame baseline), from origin
await p.mouse.click(752, 792);
await p.waitForTimeout(500);
await phase("E-master-live", async () => { await dockPlay(); }, 3200);
await cdp.send("Page.stopScreencast");
const samples = await p.evaluate(() => window.__s);
writeFileSync(`${D}/samples.json`, JSON.stringify(samples));
writeFileSync(`${D}/frames.json`, JSON.stringify(frames.map(f => ({ phase: f.phase, i: f.i, ts: f.ts }))));
meta.logs = logs.slice(0, 40);
writeFileSync(`${D}/meta.json`, JSON.stringify(meta, null, 1));
console.log(JSON.stringify({ meta: { ...meta, logs: logs.length }, frames: Object.entries(frames.reduce((a, f) => (a[f.phase] = (a[f.phase] || 0) + 1, a), {})), samples: samples.length }));
await b.close();
