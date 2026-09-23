// home-typing-dots — frame-by-frame audit capture (method 1: WAAPI pause+seek; plus CDP screencast of live playback).
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const D = new URL(".", import.meta.url).pathname;
const N = 48, CYCLE = 1200, BASE = 2 * CYCLE; // seek window = the 3rd iteration of dot 0 (all delays elapsed)
const browser = await chromium.launch({ headless: false });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
await page.goto("http://localhost:5173/", { waitUntil: "domcontentloaded" });
await page.waitForSelector(".typing-dot");
// first-paint opacity before the engine resolves (as early as we can read it)
const early = await page.evaluate(() => [...document.querySelectorAll(".typing-dot")].map(d => ({ o: getComputedStyle(d).opacity, anims: d.getAnimations().length })));
await page.waitForTimeout(3000);
const box = await page.evaluate(() => { const r = document.querySelector(".typing-dots").getBoundingClientRect(); const h = document.querySelector("h1.hero-display").getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height, h1: [h.x, h.y, h.width, h.height] }; });
const clip = { x: Math.floor(box.x - 140), y: Math.floor(box.y), width: Math.ceil(box.w + 160), height: Math.ceil(box.h) };

// ── live screencast, ≥2 iterations, every frame ──
const cdp = await ctx.newCDPSession(page);
const sc = [];
cdp.on("Page.screencastFrame", async (f) => { sc.push({ ts: f.metadata.timestamp, data: f.data }); try { await cdp.send("Page.screencastFrameAck", { sessionId: f.sessionId }); } catch {} });
await cdp.send("Page.startScreencast", { format: "jpeg", quality: 92, everyNthFrame: 1 });
// rAF-delta sampling concurrently (3 s, no style reads in the loop)
const live = await page.evaluate(async () => { const dl = []; let last = performance.now(); const end = last + 3000; await new Promise(r => { const f = n => { dl.push(n - last); last = n; n < end ? requestAnimationFrame(f) : r(); }; requestAnimationFrame(f); }); return dl; });
await cdp.send("Page.stopScreencast");
sc.forEach((f, i) => writeFileSync(`${D}screencast/sc-${String(i).padStart(3, "0")}.jpg`, Buffer.from(f.data, "base64")));
writeFileSync(D + "screencast/timestamps.json", JSON.stringify(sc.map((f, i) => ({ i, ts: f.ts })), null, 0));

// ── WAAPI seek, N frames across one iteration ──
const meta = await page.evaluate(() => { const dots = [...document.querySelectorAll(".typing-dot")]; const a = document.getAnimations().filter(x => dots.includes(x.effect?.target)); a.forEach(x => { x.playbackRate = 0; }); window.__dotAnims = a; /* pause() is undone by the engine shadow-tick reconcile (waapi/delegation.ts:65-72); rate 0 freezes without tripping it */ return a.map(x => ({ dot: dots.indexOf(x.effect.target), delay: x.effect.getTiming().delay, startTime: x.startTime })); });
const rows = [];
for (let k = 0; k < N; k++) {
  const t = BASE + (k * CYCLE) / N;
  const st = await page.evaluate((t) => { const dots = [...document.querySelectorAll(".typing-dot")]; window.__dotAnims.forEach(a => { a.currentTime = t; }); return new Promise(r => requestAnimationFrame(() => requestAnimationFrame(() => r(dots.map((d, i) => { const cs = getComputedStyle(d); return { ct: window.__dotAnims[i].currentTime, ps: window.__dotAnims[i].playState, o: +cs.opacity, tf: cs.transform, x: +d.getBoundingClientRect().x.toFixed(3), f: cs.filter }; }))))); }, t);
  await page.screenshot({ path: `${D}frames/f-${String(k).padStart(2, "0")}.png`, clip });
  // intended: per-segment steps(4, jump-none) on 0%→50%→100% (0.2→1→0.2)
  const ideal = [0, 160, 320].map(dl => { const p = (((t - dl) % CYCLE) + CYCLE) % CYCLE / CYCLE; const seg = p < 0.5 ? p / 0.5 : (p - 0.5) / 0.5; const s = Math.min(3, Math.floor(seg * 4)) / 3; return +(p < 0.5 ? 0.2 + 0.8 * s : 1 - 0.8 * s).toFixed(3); });
  rows.push({ k, t, ct: st.map(s => +s.ct.toFixed(1)), measured: st.map(s => +s.o.toFixed(3)), ideal, x: st.map(s => s.x), tf: st.map(s => s.tf) });
}
writeFileSync(D + "frames.json", JSON.stringify({ kfHead: process.env.KFHEAD, kfDirty: process.env.KFDIRTY, early, box, clip, meta, rows, liveDeltas: live.map(v => +v.toFixed(1)), screencastFrames: sc.length }, null, 1));
// transport presence on the home route
const transport = await page.evaluate(() => [...document.querySelectorAll("button")].filter(b => /play|pause/i.test(b.getAttribute("aria-label") || b.title || b.textContent)).map(b => ({ l: b.getAttribute("aria-label") || b.textContent.trim().slice(0, 20), dis: b.disabled || b.getAttribute("aria-disabled") })));
console.log(JSON.stringify({ early, clip, meta, transport, sc: sc.length, over20: live.slice(1).filter(v => v > 20).length, maxDelta: Math.max(...live.slice(1)).toFixed(1), frames: live.length }));
for (const r of rows) console.log(r.k, r.t, "m", r.measured.join(","), "i", r.ideal.join(","));
await browser.close();
