// controls-pane-drawer — frame-by-frame capture on the SERVED page, headed Chromium, real GPU.
// Method (1): the desktop open/close is a CSS transition (grid-template-columns on .controls-layout +
// opacity on .controls-pane) → document.getAnimations() → pause → seek 48 steps → screenshot.
// Method (3) as the real-time witness: CDP Page.startScreencast (everyNthFrame 1) + a per-rAF state log,
// for 2 close/open cycles, the tab swap (keys 2/3/1), the auto-show-on-tab-switch while closed, the idle rest-dim.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs"; import { execSync } from "node:child_process";
const OUT = new URL(".", import.meta.url).pathname;
const kf = (c) => execSync(`git -C /Users/mkbabb/Programming/keyframes.js ${c}`).toString().trim();
const prov = () => ({ khead: kf("rev-parse --short HEAD"), kdirty: kf("status --porcelain").split("\n").filter(Boolean).length, at: new Date().toISOString() });
for (const d of ["seek", "rt"]) fs.mkdirSync(OUT + d, { recursive: true });
const browser = await chromium.launch({ headless: false });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const AWAY = [1300, 860];
await page.mouse.move(...AWAY);
await page.goto("http://localhost:5173/#/cube", { waitUntil: "load" });
await page.waitForTimeout(4500);
const meta = { provenance: [prov()], renderer: await page.evaluate(() => { const g = document.createElement("canvas").getContext("webgl2"); const e = g.getExtension("WEBGL_debug_renderer_info"); return g.getParameter(e.UNMASKED_RENDERER_WEBGL); }), hash: await page.evaluate(() => location.hash) };

const STATE = () => {
  const lay = document.querySelector(".controls-layout"), w = document.querySelector(".controls-pane-wrapper"), p = w?.querySelector(".controls-pane");
  const stage = document.querySelector(".stage-cell"); const cube = document.querySelector(".stage-cell canvas, .stage-cell [class*=cube]");
  const r = (e) => e ? (({ x, y, width, height }) => [+x.toFixed(1), +y.toFixed(1), +width.toFixed(1), +height.toFixed(1)])(e.getBoundingClientRect()) : null;
  const anims = document.getAnimations().filter((a) => a.effect?.target && (a.effect.target === lay || w?.contains(a.effect.target))).map((a) => `${a.constructor.name}:${a.transitionProperty || a.animationName}:${a.effect.target.className?.toString().split(" ")[0]}:${a.playState}:${Math.round(a.currentTime ?? -1)}`);
  return { gtc: getComputedStyle(lay).gridTemplateColumns.replace(/\[|\]|rail|stage/g, "").trim(), layCls: lay.className.match(/controls-layout--\w+/g)?.join(","), wCls: w?.className.match(/controls-pane--\w+/g)?.join(","),
    w: r(w), wOp: w && getComputedStyle(w).opacity, pOp: p && getComputedStyle(p).opacity, pOverflow: p && getComputedStyle(p).overflowY, pFade: p?.className.match(/scroll-fade\S*/)?.[0] || "",
    stage: r(stage), cube: r(cube), anims };
};
await page.evaluate((src) => { window.__STATE = eval("(" + src + ")"); }, STATE.toString());
meta.rest = await page.evaluate(() => window.__STATE());

// ---- per-rAF logger (real time)
await page.evaluate(() => { window.__log = []; window.__mark = (m) => window.__log?.push({ mark: m, t: performance.now() }); let last = performance.now();
  const tick = (now) => { window.__log.push({ t: +now.toFixed(1), dt: +(now - last).toFixed(1), ...window.__STATE() }); last = now; requestAnimationFrame(tick); }; requestAnimationFrame(tick); });
const cdp = await page.context().newCDPSession(page);
let frames = [], rec = null;
cdp.on("Page.screencastFrame", async (f) => { if (rec) frames.push({ seg: rec, ts: f.metadata.timestamp, data: f.data }); try { await cdp.send("Page.screencastFrameAck", { sessionId: f.sessionId }); } catch {} });
const markers = [];
const mark = async (m) => { markers.push({ m, wall: Date.now() / 1000 }); await page.evaluate((m) => window.__mark(m), m); };
const toggle = async () => { // reach exactly as howToReach: the top ChromeDock 'Controls panel' toggle
  await page.mouse.move(720, 72, { steps: 3 }); await page.waitForTimeout(900);
  const b = page.locator('button[aria-label="Controls panel"]').first(); await b.waitFor({ state: "visible", timeout: 4000 });
  const bb = await b.boundingBox(); await page.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 2, { steps: 2 }); await page.waitForTimeout(250);
  await mark("click-toggle"); await page.mouse.down(); await page.mouse.up(); return bb; };

await cdp.send("Page.startScreencast", { format: "png", everyNthFrame: 1 });
// --- segment A: 2 close/open cycles, pointer left on the dock (as a user would)
rec = "A";
for (const c of [1, 2]) { await toggle(); await page.waitForTimeout(1200); await toggle(); await page.waitForTimeout(1200); }
// --- segment B: tab swap keys 2 → 3 → 1 with the pane open, pointer away
rec = "B"; await page.mouse.move(...AWAY, { steps: 3 }); await page.evaluate(() => document.activeElement?.blur()); await page.waitForTimeout(400);
for (const k of ["2", "3", "1"]) { await mark("key-" + k); await page.keyboard.press(k); await page.waitForTimeout(1300); }
// --- segment C: close, then press "2" (auto-show on tab switch while closed), then "1"
rec = "C"; await toggle(); await page.waitForTimeout(1000); await page.mouse.move(...AWAY, { steps: 3 }); await page.evaluate(() => document.activeElement?.blur()); await page.waitForTimeout(500);
await mark("key-2-while-closed"); await page.keyboard.press("2"); await page.waitForTimeout(1300); await mark("key-1"); await page.keyboard.press("1"); await page.waitForTimeout(1000);
rec = null; await cdp.send("Page.stopScreencast");
meta.provenance.push(prov());
// --- segment D: the idle rest-dim — no input for 10s, record 8.5s..12s, then a mouse move (the lift)
await mark("idle-start"); await page.waitForTimeout(8500);
await cdp.send("Page.startScreencast", { format: "png", everyNthFrame: 1 }); rec = "D";
await page.waitForTimeout(3700); await mark("idle-lift-move"); await page.mouse.move(1250, 840, { steps: 2 }); await page.waitForTimeout(1200);
// hover the pane itself while idle-dimmed? re-idle then hover
rec = null; await cdp.send("Page.stopScreencast");
const log = await page.evaluate(() => window.__log);
fs.writeFileSync(OUT + "rt-log.json", JSON.stringify({ meta, markers, log }));
frames.forEach((f, i) => fs.writeFileSync(`${OUT}rt/${f.seg}-${String(i).padStart(4, "0")}.png`, Buffer.from(f.data, "base64")));
fs.writeFileSync(OUT + "rt-frames.json", JSON.stringify(frames.map((f, i) => ({ i, seg: f.seg, ts: f.ts, name: `${f.seg}-${String(i).padStart(4, "0")}.png` }))));
frames = [];

// ---- method (1): seek the CSS transitions, 48 steps across the 450ms track transition, per direction
const N = 48; meta.seek = {};
await page.evaluate(() => { window.__log = null; });
for (const dir of ["close", "open"]) {
  await toggle();
  const list = await page.evaluate(() => new Promise((res) => requestAnimationFrame(() => {
    const lay = document.querySelector(".controls-layout"), w = document.querySelector(".controls-pane-wrapper");
    const as = document.getAnimations().filter((a) => a.effect?.target && (a.effect.target === lay || w.contains(a.effect.target) || a.effect.target === w));
    as.forEach((a) => a.pause()); window.__seekAs = as;
    res(as.map((a) => ({ kind: a.constructor.name, prop: a.transitionProperty || a.animationName, target: a.effect.target.className.toString().slice(0, 60), dur: a.effect.getComputedTiming().duration, delay: a.effect.getComputedTiming().delay, easing: a.effect.getComputedTiming().easing.slice(0, 40), ct: a.currentTime })));
  })));
  await page.mouse.move(...AWAY, { steps: 2 }); // pointer off the dock so the dock collapse does not share the frame
  const steps = [];
  const T = Math.max(450, ...list.map((a) => a.dur + a.delay));
  for (let i = 0; i < N; i++) {
    const t = (i / (N - 1)) * T;
    const st = await page.evaluate((t) => new Promise((res) => { window.__seekAs.forEach((a) => { a.currentTime = t; }); requestAnimationFrame(() => requestAnimationFrame(() => res(window.__STATE()))); }), t);
    steps.push({ i, t: +t.toFixed(1), ...st });
    await page.screenshot({ path: `${OUT}seek/${dir}-${String(i).padStart(2, "0")}.png` });
  }
  await page.evaluate(() => window.__seekAs.forEach((a) => a.finish()));
  meta.seek[dir] = { anims: list, steps };
  await page.waitForTimeout(800);
}
meta.provenance.push(prov());
meta.final = await page.evaluate(() => window.__STATE());
fs.writeFileSync(OUT + "seek-meta.json", JSON.stringify(meta, null, 1));
await browser.close();
console.log("rt frames written; seek done", JSON.stringify(meta.seek.close.anims), JSON.stringify(meta.seek.open.anims));
