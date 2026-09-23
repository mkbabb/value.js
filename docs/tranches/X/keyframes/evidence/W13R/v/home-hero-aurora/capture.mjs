// home-hero-aurora — headed Chromium, real GPU, served page. READ-ONLY on keyframes.js.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
import fs from "node:fs";
const OUT = "/Users/mkbabb/Programming/value.js/docs/tranches/X/keyframes/evidence/W13R/v/home-hero-aurora";
const KF = "/Users/mkbabb/Programming/keyframes.js";
const kfState = () => ({
  head: execSync(`git -C ${KF} rev-parse --short HEAD`).toString().trim(),
  dirty: execSync(`git -C ${KF} status --porcelain | wc -l`).toString().trim(),
  at: new Date().toISOString(),
});
const R = { kfBefore: kfState() };
const browser = await chromium.launch({ headless: false, args: ["--ignore-gpu-blocklist"] });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
const logs = [];
page.on("console", (m) => logs.push(`${m.type()}: ${m.text()}`.slice(0, 300)));
page.on("pageerror", (e) => logs.push(`pageerror: ${String(e).slice(0, 300)}`));
await page.goto("http://localhost:5173/", { waitUntil: "load" });
await page.waitForSelector(".hero-aurora", { timeout: 20000 });
await page.waitForTimeout(4000);

// ── identity + layer census ──
R.census = await page.evaluate(() => {
  const root = document.querySelector(".hero-aurora");
  const cs = (el) => { const s = getComputedStyle(el); return { tag: el.tagName, cls: el.className?.toString().slice(0, 80), opacity: s.opacity, zIndex: s.zIndex, position: s.position, mixBlend: s.mixBlendMode, filter: s.filter, transform: s.transform, isolation: s.isolation, display: s.display, contain: s.contain, contentVisibility: s.contentVisibility, bgImage: s.backgroundImage.slice(0, 160), bgColor: s.backgroundColor, rect: el.getBoundingClientRect().toJSON() }; };
  const canvas = root.querySelector("canvas");
  const inst = root.__vueParentComponent;
  const ex = inst?.exposed;
  const gl = null;
  const shell = document.querySelector(".editor-shell");
  const kids = [...shell.children].map((c, i) => ({ i, cls: c.className?.toString().slice(0, 60), z: getComputedStyle(c).zIndex, pos: getComputedStyle(c).position }));
  const pts = [[720, 450], [60, 60], [1380, 840], [300, 700]].map(([x, y]) => ({ x, y, stack: document.elementsFromPoint(x, y).slice(0, 8).map((e) => `${e.tagName}.${(e.className?.toString() || "").split(" ").slice(0, 2).join(".")}`) }));
  return {
    substrate: root.dataset.auroraSubstrate, prmMatches: matchMedia("(prefers-reduced-motion: reduce)").matches,
    root: cs(root), placeholder: cs(root.querySelector(".aurora-placeholder")), layer: cs(root.querySelector(".aurora-canvas-layer")), canvas: { ...cs(canvas), w: canvas.width, h: canvas.height },
    grid: document.querySelector(".grid-background") ? cs(document.querySelector(".grid-background")) : null,
    exposedKeys: ex ? Object.keys(ex) : null, isArmed: ex?.isArmed?.value, status: ex?.rendererStatus?.value ? JSON.parse(JSON.stringify(ex.rendererStatus.value, (k, v) => (v instanceof Error ? String(v) : v))) : null,
    shellKids: kids, pts, dpr: devicePixelRatio,
  };
});
fs.writeFileSync(`${OUT}/census.json`, JSON.stringify(R.census, null, 1));
await page.screenshot({ path: `${OUT}/served/rest-full.png` });

// ── live rAF delta sample (3 s) + canvas frame cadence ──
R.raf = await page.evaluate(() => new Promise((res) => {
  const d = []; let last = performance.now(); const t0 = last;
  const f = (t) => { d.push(t - last); last = t; if (t - t0 < 3000) requestAnimationFrame(f); else { const drops = d.filter((x) => x > 20); res({ n: d.length, mean: d.reduce((a, b) => a + b, 0) / d.length, max: Math.max(...d), drops: drops.length, dropVals: drops.slice(0, 20).map((x) => +x.toFixed(1)) }); } };
  requestAnimationFrame(f);
}));

// ── helper: amplified canvas grab in-page (same task as the draw) ──
await page.evaluate(() => {
  window.__au = document.querySelector(".hero-aurora").__vueParentComponent.exposed;
  window.__grab = () => document.querySelector(".hero-aurora canvas").toDataURL("image/png");
  window.__diff = async (a, b) => {
    const load = (u) => new Promise((r) => { const i = new Image(); i.onload = () => r(i); i.src = u; });
    const [ia, ib] = await Promise.all([load(a), load(b)]);
    const W = 180, H = 100; const c = new OffscreenCanvas(W, H); const x = c.getContext("2d", { willReadFrequently: true });
    x.drawImage(ia, 0, 0, W, H); const da = x.getImageData(0, 0, W, H).data; x.clearRect(0, 0, W, H); x.drawImage(ib, 0, 0, W, H); const db = x.getImageData(0, 0, W, H).data;
    let s = 0, m = 0; for (let k = 0; k < da.length; k += 4) { const v = (Math.abs(da[k] - db[k]) + Math.abs(da[k + 1] - db[k + 1]) + Math.abs(da[k + 2] - db[k + 2])) / 3; s += v; if (v > m) m = v; }
    return { mean: +(s / (W * H)).toFixed(3), max: m };
  };
  window.__stats = async (u) => { const i = await new Promise((r) => { const im = new Image(); im.onload = () => r(im); im.src = u; }); const c = new OffscreenCanvas(90, 50); const x = c.getContext("2d"); x.drawImage(i, 0, 0, 90, 50); const d = x.getImageData(0, 0, 90, 50).data; let s = 0, a = 0, mn = 255, mx = 0; for (let k = 0; k < d.length; k += 4) { const l = (d[k] + d[k + 1] + d[k + 2]) / 3; s += l; a += d[k + 3]; mn = Math.min(mn, l); mx = Math.max(mx, l); } return { lum: +(s / 4500).toFixed(1), alpha: +(a / 4500).toFixed(1), min: mn, max: mx }; };
});

// ── (A) LIVE served screencast via CDP, ~7 s, every frame ──
const cdp = await ctx.newCDPSession(page);
const live = [];
cdp.on("Page.screencastFrame", async (f) => { live.push({ ts: f.metadata.timestamp, data: f.data }); await cdp.send("Page.screencastFrameAck", { sessionId: f.sessionId }).catch(() => {}); });
await cdp.send("Page.startScreencast", { format: "png", everyNthFrame: 1, maxWidth: 1440, maxHeight: 900 });
await page.waitForTimeout(7000);
await cdp.send("Page.stopScreencast");
R.liveFrames = live.length;
live.forEach((f, i) => fs.writeFileSync(`${OUT}/live/f${String(i).padStart(3, "0")}.png`, Buffer.from(f.data, "base64")));
R.liveTs = live.map((f) => +(f.ts - live[0].ts).toFixed(3));

// ── (B) LIVE raw-canvas sampling: 48 grabs over ~12 s real time; diff consecutive ──
R.liveCanvas = await page.evaluate(async () => {
  const out = []; let prev = null;
  for (let i = 0; i < 48; i++) {
    await new Promise((r) => requestAnimationFrame(() => r()));
    // grab inside the rAF task right after the lifecycle frame ran: the lifecycle's own rAF runs first
    const u = await new Promise((r) => requestAnimationFrame(() => r(window.__grab())));
    const st = await window.__stats(u); const d = prev ? await window.__diff(prev, u) : null; out.push({ i, t: +performance.now().toFixed(0), ...st, d }); prev = u;
    await new Promise((r) => setTimeout(r, 230));
  }
  return out;
});

// ── (C) STEPPED via the library clock: pause('manual') + renderAt(t), 48 steps over 0..47 s ──
const stepped = await page.evaluate(async () => {
  window.__au.pause();
  const out = []; let prev = null;
  for (let i = 0; i < 48; i++) { const t = i * 1.0; window.__au.renderAt(t); const u = window.__grab(); const st = await window.__stats(u); const d = prev ? await window.__diff(prev, u) : null; out.push({ i, t, u, ...st, d }); prev = u; }
  // fine sweep 0..2 s at 1/60 s — sub-frame continuity
  const fine = []; let p2 = null;
  for (let i = 0; i < 48; i++) { const t = 10 + i / 60; window.__au.renderAt(t); const u = window.__grab(); const d = p2 ? await window.__diff(p2, u) : null; fine.push({ i, t: +t.toFixed(4), d }); p2 = u; }
  // determinism: same t twice
  window.__au.renderAt(5); const a = window.__grab(); window.__au.renderAt(5); const b = window.__grab();
  const det = await window.__diff(a, b);
  return { out, fine, det };
});
stepped.out.forEach((s) => fs.writeFileSync(`${OUT}/stepped/s${String(s.i).padStart(2, "0")}.png`, Buffer.from(s.u.split(",")[1], "base64")));
R.stepped = stepped.out.map(({ u, ...r }) => r); R.fine = stepped.fine; R.det = stepped.det;

// ── (D) is the paused state actually frozen? then the resume-clock snap ──
R.pauseResume = await page.evaluate(async () => {
  const g1 = await new Promise((r) => requestAnimationFrame(() => r(window.__grab())));
  await new Promise((r) => setTimeout(r, 1500));
  const g2 = await new Promise((r) => requestAnimationFrame(() => r(window.__grab())));
  // (preserveDrawingBuffer false: grabs while paused may read cleared buffer — record stats)
  const s1 = await window.__stats(g1), s2 = await window.__stats(g2);
  return { pausedGrabStats: [s1, s2] };
});

// amplified served frames at stepped times (the layer as composited, opacity forced 1 for legibility)
await page.addStyleTag({ content: ".hero-aurora{opacity:1!important;z-index:9999!important}" });
for (let i = 0; i < 24; i++) { await page.evaluate((t) => window.__au.renderAt(t), i * 2); await page.screenshot({ path: `${OUT}/amplified/a${String(i).padStart(2, "0")}.png` }); }
await page.evaluate(() => { const s = [...document.querySelectorAll("style")].pop(); s.remove(); });

// resume snap: record canvas continuity around resume. Live-run 4 s, sample, pause, wait, resume, sample.
R.resumeSnap = await page.evaluate(async () => {
  const au = window.__au; au.resume(); // clock restarts at now-1s => t≈1
  const seq = []; const grabF = () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(() => r(window.__grab()))));
  await new Promise((r) => setTimeout(r, 5000));
  const before = await grabF();
  au.pause(); await new Promise((r) => setTimeout(r, 300)); au.resume();
  const after = await grabF();
  // reference: what does t≈1 look like vs t≈6
  au.pause(); au.renderAt(1.03); const ref1 = window.__grab(); au.renderAt(6.1); const ref6 = window.__grab(); au.resume();
  return { beforeVsAfter: await window.__diff(before, after), afterVsT1: await window.__diff(after, ref1), beforeVsT6: await window.__diff(before, ref6), afterVsT6: await window.__diff(after, ref6) };
});

// transport: does the page's play/pause affect the aurora? find play-like buttons
R.transport = await page.evaluate(() => [...document.querySelectorAll("button,[role=button]")].map((b) => (b.getAttribute("aria-label") || b.textContent || "").trim().slice(0, 40)).filter(Boolean).slice(0, 60));
// visibility snap: open another tab, bring front, return
const p2 = await ctx.newPage(); await p2.goto("about:blank"); await p2.bringToFront(); await page.waitForTimeout(1500);
R.visHidden = await page.evaluate(() => document.visibilityState);
await page.bringToFront(); await page.waitForTimeout(800);
R.visBack = await page.evaluate(() => document.visibilityState);
await p2.close();
await page.screenshot({ path: `${OUT}/served/after-tabswitch.png` });
R.logs = logs.slice(0, 40);
R.kfAfter = kfState();
fs.writeFileSync(`${OUT}/results.json`, JSON.stringify(R, null, 1));
await browser.close();
console.log("done", R.liveFrames, JSON.stringify(R.raf));
