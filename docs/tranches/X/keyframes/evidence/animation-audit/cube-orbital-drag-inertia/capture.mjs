// cube-orbital-drag-inertia — method (3): CDP Page.startScreencast everyNthFrame 1
// (rAF-driven useRafFn inertia, no library clock) + a per-rAF in-page sampler of every
// layer's transform and the OrbitalDrag model. HEADED Chromium, real GPU, 1440x900 @1x.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
const OUT = process.argv[2] || "run"; fs.mkdirSync(OUT + "/frames", { recursive: true });
const b = await chromium.launch({ headless: false });
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await p.goto("http://localhost:5173/#/cube", { waitUntil: "networkidle" });
await p.waitForSelector(".cube"); await p.waitForTimeout(3000);
await p.evaluate(() => {
  const orb = document.querySelector(".idle-hover").parentElement;
  const inst = orb.__vueParentComponent; // OrbitalDrag instance (dev build)
  const q = (s) => document.querySelector(s);
  const scene = (() => { let c = inst; while (c && !(c.exposed && "isStarted" in (c.exposed || {}))) c = c.parent; return c; })();
  window.__S = []; window.__phase = "rest";
  let last = performance.now();
  const tick = (now) => {
    const m = inst.props.modelValue;
    window.__S.push({ ph: window.__phase, t: +now.toFixed(2), dt: +(now - last).toFixed(2),
      orbInl: orb.style.transform || "", orbTf: getComputedStyle(orb).transform,
      roll: getComputedStyle(q(".idle-hover")).transform, bob: getComputedStyle(q(".cube-bob")).transform,
      pose: getComputedStyle(q(".cube-pose")).transform, cube: getComputedStyle(q(".cube")).transform, cubeInl: q(".cube").style.transform || "", poseInl: q(".cube-pose").style.transform || "",
      rot: m && [m.rotate.x, m.rotate.y, m.rotate.z].map(v => +(+v).toFixed(3)),
      started: scene ? scene.exposed.isStarted?.value ?? scene.exposed.isStarted : "?",
      playing: scene ? scene.exposed.isPlaying?.value ?? scene.exposed.isPlaying : "?" });
    last = now; requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
});
const cdp = await p.context().newCDPSession(p);
const frames = []; let PH = "rest";
cdp.on("Page.screencastFrame", async (f) => {
  const i = frames.length; frames.push({ i, ts: f.metadata.timestamp, ph: PH });
  fs.writeFileSync(`${OUT}/frames/f${String(i).padStart(4, "0")}.png`, Buffer.from(f.data, "base64"));
  cdp.send("Page.screencastFrameAck", { sessionId: f.sessionId }).catch(() => {});
});
const box = await p.evaluate(() => { const r = document.querySelector(".cube").getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height }; });
const cx = box.x + box.w / 2, cy = box.y + box.h / 2;
await cdp.send("Page.startScreencast", { format: "png", everyNthFrame: 1, maxWidth: 1440, maxHeight: 900 });
const fling = async () => { await p.mouse.move(cx - 100, cy); await p.mouse.down();
  for (let k = 1; k <= 12; k++) { await p.mouse.move(cx - 100 + 25 * k, cy); await p.waitForTimeout(12); } };
const phase = (s) => { PH = s; return p.evaluate((s) => (window.__phase = s), s); };
await p.waitForTimeout(700);
// A — howToReach: press on the die, drag horizontally ~300px, release quickly; coast.
await phase("A-drag"); await fling();
await p.mouse.up(); await phase("A-coast"); await p.waitForTimeout(3500);
// B — drag then HOLD STILL 400ms before release (expected: no coast).
await phase("B-drag"); await fling();
await phase("B-hold"); await p.waitForTimeout(400); await p.mouse.up(); await phase("B-after"); await p.waitForTimeout(2500);
// C — transport: Pause, then fling; then Play, then fling.
const pauseBtn = p.locator('button[aria-label="Pause animation"]:visible').first();
const hasPause = await pauseBtn.count();
if (hasPause) { await phase("C-pauseclick"); await pauseBtn.click({ timeout: 5000 }).catch(e => console.log("pause click failed")); await p.waitForTimeout(600); }
const labels = () => p.evaluate(() => [...document.querySelectorAll("button[aria-label]")].filter(e => e.offsetParent && /Play|Pause/.test(e.getAttribute("aria-label"))).map(e => e.getAttribute("aria-label")));
console.log("after pause click, visible transport labels:", JSON.stringify(await labels()));
await phase("C-drag"); await fling();
await p.mouse.up(); await phase("C-coast"); await p.waitForTimeout(2500);
const playBtn = p.locator('button[aria-label="Play animation"]:visible').first();
if (await playBtn.count()) { await phase("D-playclick"); await playBtn.click({ timeout: 5000 }).catch(e => console.log("play click failed")); await p.waitForTimeout(800); }
await phase("D-drag"); await fling();
await p.mouse.up(); await phase("D-coast"); await p.waitForTimeout(3000);
await cdp.send("Page.stopScreencast");
const S = await p.evaluate(() => window.__S);
const anims = await p.evaluate(() => document.getAnimations().map(a => ({ n: a.animationName || a.id, ps: a.playState })));
fs.writeFileSync(`${OUT}/samples.json`, JSON.stringify(S));
fs.writeFileSync(`${OUT}/frames.json`, JSON.stringify({ box, hasPause, frames, anims }));
console.log("frames", frames.length, "samples", S.length, "box", JSON.stringify(box), "pause", hasPause);
await b.close();
