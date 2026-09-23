// scene-skeleton-shimmer — headed Chromium, real GPU, served page.
// Reach: fresh context (cold cache) → #/spring with the SpringScene.vue module held
// (throttled-network stand-in) so the <Suspense> fallback stays on screen.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
import { execSync } from "node:child_process";
const D = new URL(".", import.meta.url).pathname;
const kf = (c) => execSync(`git -C /Users/mkbabb/Programming/keyframes.js ${c}`).toString().trim();
const meta = { khead: kf("rev-parse --short HEAD"), kdirty: kf("status --porcelain | wc -l"), started: new Date().toISOString() };
const N = Number(process.env.N || 48);

const browser = await chromium.launch({ headless: false, args: ["--window-size=1440,1000"] });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
const logs = []; page.on("console", (m) => logs.push(`${m.type()}: ${m.text()}`.slice(0, 300)));

let release; const held = new Promise((r) => (release = r)); let heldUrl = null;
await page.route(/SpringScene\.vue(\?(?!.*type=style).*)?$/, async (route) => {
  heldUrl = route.request().url(); await held; await route.continue();
});

const cdp = await ctx.newCDPSession(page);
const shots = []; let phase = "load";
cdp.on("Page.screencastFrame", async (f) => {
  shots.push({ phase, ts: f.metadata.timestamp, data: f.data });
  try { await cdp.send("Page.screencastFrameAck", { sessionId: f.sessionId }); } catch {}
});
await cdp.send("Page.startScreencast", { format: "png", everyNthFrame: 1, maxWidth: 1440, maxHeight: 900 });

const t0 = Date.now();
await page.goto("http://localhost:5173/#/spring", { waitUntil: "commit" });
await page.waitForSelector(".scene-skeleton", { timeout: 20000 });
meta.skeletonSeenMs = Date.now() - t0;
meta.gpu = await page.evaluate(() => { const g = document.createElement("canvas").getContext("webgl"); const e = g && g.getExtension("WEBGL_debug_renderer_info"); return e ? g.getParameter(e.UNMASKED_RENDERER_WEBGL) : "n/a"; });
await page.waitForTimeout(800);

const probe = () => page.evaluate(() => {
  const q = (s) => document.querySelector(s);
  const pick = (el, pe) => { if (!el) return null; const c = getComputedStyle(el, pe); const r = pe ? null : el.getBoundingClientRect();
    return { rect: r && { x: r.x, y: r.y, w: r.width, h: r.height }, transform: c.transform, opacity: c.opacity, zIndex: c.zIndex, mixBlendMode: c.mixBlendMode, filter: c.filter,
      position: c.position, overflow: c.overflow, borderRadius: c.borderRadius, background: c.backgroundImage !== "none" ? c.backgroundImage : c.backgroundColor, isolation: c.isolation,
      animationName: c.animationName, animationDuration: c.animationDuration, willChange: c.willChange, display: c.display, className: pe ? pe : el.className }; };
  const sk = q(".scene-skeleton"), plate = q(".scene-skeleton__plate"), sheen = q(".scene-skeleton__sheen");
  const host = q(".scene-host");
  return {
    host: pick(host), skeleton: pick(sk), plate: pick(plate), sheen: pick(sheen), sheenAfter: pick(sheen, "::after"),
    sheenParentIsPlate: sheen?.parentElement === plate, plateChildren: plate ? [...plate.children].map((c) => c.className) : null,
    shimmerToken: getComputedStyle(sheen || document.documentElement).getPropertyValue("--duration-shimmer"),
    prm: matchMedia("(prefers-reduced-motion: reduce)").matches,
    anims: document.getAnimations().map((a) => ({ name: a.animationName || a.constructor.name, pseudo: a.effect?.pseudoElement || null, target: a.effect?.target?.className?.toString?.().slice(0, 80),
      playState: a.playState, currentTime: a.currentTime, timing: (({ duration, iterations, easing, delay }) => ({ duration, iterations, easing, delay }))(a.effect.getComputedTiming()) })),
    stack: (() => { const r = sk?.getBoundingClientRect(); if (!r) return null; return document.elementsFromPoint(r.x + r.width / 2, r.y + r.height / 2).slice(0, 8).map((e) => e.className?.toString?.().slice(0, 60) || e.tagName); })(),
  };
});
meta.probe = await probe();

// rAF deltas over 3 s live playback.
meta.raf = await page.evaluate(() => new Promise((res) => { const d = []; let last = performance.now(); const s = last;
  const f = (t) => { d.push(t - last); last = t; if (t - s < 3000) requestAnimationFrame(f); else { const drop = d.filter((x) => x > 20); res({ frames: d.length, mean: d.reduce((a, b) => a + b, 0) / d.length, max: Math.max(...d), dropped: drop.length, drops: drop.slice(0, 20).map((x) => +x.toFixed(1)) }); } };
  requestAnimationFrame(f); }));
// Live transform samples of the ::after sweep (computed, 60 samples over 6 s).
meta.liveSweep = await page.evaluate(() => new Promise((res) => { const el = document.querySelector(".scene-skeleton__sheen"); const out = []; const s = performance.now();
  const f = () => { const t = performance.now() - s; out.push([+t.toFixed(0), getComputedStyle(el, "::after").transform]); if (t < 6000) setTimeout(f, 100); else res(out); }; f(); }));
await page.waitForTimeout(4200); // total live window ≥ 2 iterations of the 5 s clock

// Frame-by-frame: pause the sheen animation and seek.
phase = "seek";
const box = await page.locator(".scene-skeleton").boundingBox();
const dur = await page.evaluate(() => { const a = document.getAnimations().filter((a) => a.effect?.pseudoElement === "::after"); a.forEach((x) => x.pause()); return a.length ? a[0].effect.getComputedTiming().duration : null; });
meta.seek = { N, dur, box, frames: [] };
for (let i = 0; i < N; i++) {
  const t = (dur * i) / N;
  const tr = await page.evaluate((t) => { const a = document.getAnimations().filter((a) => a.effect?.pseudoElement === "::after"); a.forEach((x) => (x.currentTime = t));
    const el = document.querySelector(".scene-skeleton__sheen"); return { n: a.length, tr: getComputedStyle(el, "::after").transform, ps: a.map((x) => x.playState) }; }, t);
  await page.waitForTimeout(40);
  const f = `${D}frames/f${String(i).padStart(2, "0")}.png`;
  await page.screenshot({ path: f, clip: box, animations: "allow" });
  meta.seek.frames.push({ i, t: +t.toFixed(1), ...tr });
}
await page.evaluate(() => document.getAnimations().forEach((a) => a.play()));

// Resolve: release the held module and record the swap.
phase = "resolve"; const tr0 = Date.now(); release();
await page.waitForSelector(".scene-skeleton", { state: "detached", timeout: 30000 }).catch(() => {});
meta.resolveMs = Date.now() - tr0; await page.waitForTimeout(1500);
meta.after = await page.evaluate(() => ({ skeleton: !!document.querySelector(".scene-skeleton"), hostStyle: document.querySelector(".scene-host")?.getAttribute("style"), announcer: [...document.querySelectorAll("[aria-live]")].map((e) => e.textContent.trim()).filter(Boolean).slice(0, 3) }));
await cdp.send("Page.stopScreencast");
meta.heldUrl = heldUrl; meta.logs = logs.filter((l) => /error|warn/i.test(l)).slice(0, 15);
// Dump screencast frames.
const T0 = shots[0]?.ts ?? 0; meta.screencast = { count: shots.length, byPhase: {} };
shots.forEach((s, k) => { const dir = s.phase === "resolve" ? "resolve" : "live"; meta.screencast.byPhase[s.phase] = (meta.screencast.byPhase[s.phase] || 0) + 1;
  fs.writeFileSync(`${D}${dir}/s${String(k).padStart(4, "0")}_${((s.ts - T0) * 1000).toFixed(0)}ms.png`, Buffer.from(s.data, "base64")); });
meta.finished = new Date().toISOString(); meta.khead2 = kf("rev-parse --short HEAD"); meta.kdirty2 = kf("status --porcelain | wc -l");
fs.writeFileSync(`${D}meta.json`, JSON.stringify(meta, null, 1));
await browser.close();
console.log(JSON.stringify({ ...meta, liveSweep: meta.liveSweep.filter((_, i) => i % 5 === 0), seek: { ...meta.seek, frames: meta.seek.frames.filter((_, i) => i % 6 === 0) } }, null, 1).slice(0, 9000));
