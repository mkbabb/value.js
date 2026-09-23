import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
import { execSync } from "node:child_process";
const D = new URL(".", import.meta.url).pathname;
const K = "/Users/mkbabb/Programming/keyframes.js";
const kstate = () => ({ khead: execSync(`git -C ${K} rev-parse --short HEAD`).toString().trim(), kdirty: execSync(`git -C ${K} status --porcelain | wc -l`).toString().trim(), at: new Date().toISOString() });
const out = { start: kstate() };
const b = await chromium.launch({ headless: false });
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const errs = []; p.on("pageerror", e => errs.push(String(e))); p.on("console", m => { if (m.type() === "error" || m.type() === "warning") errs.push(m.type() + ": " + m.text().slice(0, 200)); });
await p.goto("http://localhost:5173/#/amiga");
await p.waitForTimeout(3500);
const rect = await p.evaluate(() => { const r = document.querySelector("canvas.amiga-canvas").getBoundingClientRect(); return { x: Math.round(r.x), y: Math.round(r.y), width: Math.round(r.width), height: Math.round(r.height) }; });
out.rect = rect;
// locate the group
await p.evaluate(() => {
  let i = document.querySelector("canvas.amiga-canvas").__vueParentComponent;
  while (i && !(i.setupState && i.setupState.animationGroup)) i = i.parent;
  window.__audGroup = i?.setupState.animationGroup;
  window.__audGL = i?.setupState.three;
});
out.groupFound = await p.evaluate(() => !!window.__audGroup && window.__audGroup.getEntries().map(e => e.animation.name + ":" + e.animation.options.duration));
// pixel hash of canvas region helper
const hash = async () => { const buf = await p.screenshot({ clip: rect }); return (await import("node:crypto")).createHash("md5").update(buf).digest("hex").slice(0, 10); };
out.restHashes = [await hash(), (await p.waitForTimeout(500), await hash())];
// transport: dock play button
const btns = await p.evaluate(() => [...document.querySelectorAll("button")].map((b, i) => ({ i, l: b.getAttribute("aria-label") || b.textContent.trim().slice(0, 30), r: (() => { const r = b.getBoundingClientRect(); return [Math.round(r.x), Math.round(r.y), Math.round(r.width)]; })() })).filter(b => /play|pause|reset|restart|replay|stop/i.test(b.l)));
out.transportButtons = btns;
const dockPlay = btns.find(b => b.r[1] > 740 && /play/i.test(b.l)) || btns.find(b => /play/i.test(b.l));
out.clicked = dockPlay;
await p.mouse.click(dockPlay.r[0] + dockPlay.r[2] / 2, dockPlay.r[1] + 20);
await p.waitForTimeout(600);
out.afterPlay = await p.evaluate(() => window.__kfAmigaProbe.pose());
// rAF deltas 3 s
out.raf = await p.evaluate(() => new Promise(res => { const d = []; let last = performance.now(); const t0 = last; const f = (t) => { d.push(t - last); last = t; if (t - t0 < 3000) requestAnimationFrame(f); else { const s = [...d].sort((a, b) => a - b); res({ n: d.length, over20: d.filter(x => x > 20).length, over34: d.filter(x => x > 34).length, max: +s[s.length - 1].toFixed(1), p50: +s[s.length >> 1].toFixed(2) }); } }; requestAnimationFrame(f); }));
// layer state (DOM layers)
out.layers = await p.evaluate(() => { const q = (s) => { const e = document.querySelector(s); if (!e) return null; const c = getComputedStyle(e); return { z: c.zIndex, op: c.opacity, blend: c.mixBlendMode, filter: c.filter, transform: c.transform, pos: c.position }; }; return { canvas: q("canvas.amiga-canvas"), grid: q(".grid-background"), anims: document.getAnimations().length, canvasOrder: (() => { const g = document.querySelector(".grid-background"), c = document.querySelector("canvas.amiga-canvas"); return g && c ? (g.compareDocumentPosition(c) & 4 ? "grid-before-canvas" : "canvas-before-grid") : "?"; })() }; });
// live screencast ≥ 2 Y iterations and 2 X iterations: 17 s
const cdp = await p.context().newCDPSession(p);
const frames = []; let n = 0;
cdp.on("Page.screencastFrame", async (f) => { const idx = n++; const probe = null; fs.writeFileSync(`${D}live/f${String(idx).padStart(4, "0")}.jpg`, Buffer.from(f.data, "base64")); frames.push({ idx, ts: f.metadata.timestamp }); cdp.send("Page.screencastFrameAck", { sessionId: f.sessionId }).catch(() => {}); });
const poseLog = [];
await cdp.send("Page.startScreencast", { format: "jpeg", quality: 80, everyNthFrame: 1 });
const t0 = Date.now();
while (Date.now() - t0 < 17000) { poseLog.push(await p.evaluate(() => { const q = window.__kfAmigaProbe.pose(); return [performance.now() | 0, +q.px.toFixed(3), +q.py.toFixed(3), +q.spin.toFixed(3), q.playing]; })); await p.waitForTimeout(50); }
await cdp.send("Page.stopScreencast");
await p.waitForTimeout(300);
fs.writeFileSync(D + "live/frames.json", JSON.stringify(frames));
fs.writeFileSync(D + "live/pose-log.json", JSON.stringify(poseLog));
out.liveFrames = frames.length;
if (frames.length > 1) { const dts = frames.slice(1).map((f, i) => (f.ts - frames[i].ts) * 1000); out.liveGaps = { over20: dts.filter(x => x > 20).length, over50: dts.filter(x => x > 50).length, max: Math.max(...dts).toFixed(1), meanFps: (frames.length / (frames.at(-1).ts - frames[0].ts)).toFixed(1) }; }
// transport pause: click dock play again
await p.mouse.click(dockPlay.r[0] + dockPlay.r[2] / 2, dockPlay.r[1] + 20);
await p.waitForTimeout(150);
out.afterPauseImmediate = await p.evaluate(() => window.__kfAmigaProbe.pose());
await p.waitForTimeout(2000);
out.afterPause2s = await p.evaluate(() => window.__kfAmigaProbe.pose());
out.pausedHashes = [await hash(), (await p.waitForTimeout(700), await hash())];
await p.screenshot({ path: D + "paused-after-transport.png", clip: rect });
// frame-by-frame via the library clock: one full X/spin period 8000 ms, N=48 (Y wraps 5x)
const N = 48;
out.step = [];
await p.evaluate(() => { const g = window.__audGroup; if (g.playing()) g.pause(); });
for (let i = 0; i < N; i++) {
  const tx = (i / N) * 8000;
  await p.evaluate((tx) => { const g = window.__audGroup; for (const e of g.getEntries()) { const d = e.animation.options.duration; g.setChildTime(e.animation, tx % d); } g.render(); }, tx);
  await p.waitForTimeout(i === 0 ? 2500 : 120);
  await p.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))));
  const pose = await p.evaluate(() => window.__kfAmigaProbe.pose());
  await p.screenshot({ path: `${D}step/s${String(i).padStart(2, "0")}.png`, clip: rect });
  out.step.push([i, Math.round(tx), +pose.px.toFixed(3), +pose.py.toFixed(3), +pose.spin.toFixed(3)]);
}
// rest state: stop the group -> home
out.end = kstate();
out.errs = errs.slice(0, 15);
fs.writeFileSync(D + "capture-out.json", JSON.stringify(out, null, 1));
console.log(JSON.stringify({ ...out, step: out.step.slice(0, 48).map(s => s.join(",")).join(" | ") }, null, 1));
await b.close();
