// sequence-staggered-rows — headed real-GPU capture (READ-ONLY on keyframes.js).
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync, mkdirSync } from "node:fs";
import { execSync } from "node:child_process";

const OUT = new URL(".", import.meta.url).pathname;
const K = "/Users/mkbabb/Programming/keyframes.js";
const khead = () => execSync(`git -C ${K} rev-parse --short HEAD`).toString().trim();
const kdirty = () => execSync(`git -C ${K} status --porcelain | wc -l`).toString().trim();
const log = { khead0: khead(), kdirty0: kdirty(), steps: [] };
const dirs = ["seek", "live", "scrub"];
for (const d of dirs) mkdirSync(OUT + d, { recursive: true });

const browser = await chromium.launch({ headless: false });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
const consoleMsgs = [];
page.on("console", (m) => { if (["error", "warning"].includes(m.type())) consoleMsgs.push(`${m.type()}: ${m.text()}`.slice(0, 300)); });
page.on("pageerror", (e) => consoleMsgs.push("pageerror: " + String(e).slice(0, 300)));

await page.goto("http://localhost:5173/#/sequence", { waitUntil: "load" });
await page.waitForSelector(".seq-stage", { timeout: 20000 });
await page.waitForTimeout(2500);

log.gpu = await page.evaluate(() => {
  const c = document.createElement("canvas"); const gl = c.getContext("webgl");
  const ext = gl && gl.getExtension("WEBGL_debug_renderer_info");
  return ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : "no-webgl";
});

// Probe: every ball/handle/layer
const probe = () => page.evaluate(() => {
  const r = (el) => { const b = el.getBoundingClientRect(); return { x: +b.x.toFixed(2), y: +b.y.toFixed(2), w: +b.width.toFixed(2), h: +b.height.toFixed(2), cx: +(b.x + b.width / 2).toFixed(2) }; };
  const balls = [...document.querySelectorAll(".seq-ball")];
  const handles = [...document.querySelectorAll(".seq-handle")];
  const tracks = [...document.querySelectorAll(".seq-track")];
  const ph = document.querySelector(".seq-playhead");
  const stage = document.querySelector(".seq-stage");
  return {
    stageClass: stage.className,
    anims: document.getAnimations().length,
    animsStage: stage.getAnimations({ subtree: true }).map((a) => a.animationName || a.id || "anon"),
    playhead: ph ? { ...r(ph), transform: getComputedStyle(ph).transform, p: ph.style.getPropertyValue("--playhead-p") } : null,
    rows: balls.map((b, i) => {
      const cs = getComputedStyle(b);
      return {
        i, ball: r(b), handle: r(handles[i]), track: r(tracks[i]),
        inline: b.getAttribute("style"),
        ballP: cs.getPropertyValue("--ball-p"), opacity: cs.opacity, scale: cs.scale, transform: cs.transform,
        z: cs.zIndex, blend: cs.mixBlendMode, filter: cs.filter, shadow: cs.boxShadow.slice(0, 90),
        handleZ: getComputedStyle(handles[i]).zIndex,
      };
    }),
  };
});

// Find the demo object through the Vue dev instance tree
const hasDemo = await page.evaluate(() => {
  let inst = document.querySelector(".seq-stage").__vueParentComponent;
  while (inst && !(inst.setupState && inst.setupState.demo)) inst = inst.parent;
  if (!inst) return false;
  window.__seqDemo = inst.setupState.demo;
  return true;
});
log.hasDemo = hasDemo;
const stageBox = await page.locator(".seq-target").boundingBox();
const clip = { x: Math.floor(stageBox.x), y: Math.floor(stageBox.y), width: Math.ceil(stageBox.width), height: Math.ceil(stageBox.height) };
log.clip = clip;
log.rest = await probe();
await page.screenshot({ path: OUT + "rest-fresh.png", clip });
await page.screenshot({ path: OUT + "fullpage-fresh.png" });
log.duration = await page.evaluate(() => window.__seqDemo.sequence.duration);

// ── (2) library-clock stepping: 48 evenly-spaced master times over one full run
const N = 48;
log.seek = [];
for (let i = 0; i < N; i++) {
  const t = (i / (N - 1));
  await page.evaluate((p) => { window.__seqDemo.scrub(p); window.__seqDemo.setScrubbing(false); }, t);
  await page.evaluate(() => new Promise((res) => requestAnimationFrame(() => requestAnimationFrame(res))));
  const pr = await probe();
  log.seek.push({ i, p: +t.toFixed(4), time: await page.evaluate(() => window.__seqDemo.sequence.time), rows: pr.rows.map((x) => ({ cx: x.ball.cx, w: x.ball.w, hcx: x.handle.cx, bp: x.ballP, op: x.opacity, sc: x.scale, tr: x.track.x + x.track.w })), ph: pr.playhead?.cx });
  await page.screenshot({ path: `${OUT}seek/f${String(i).padStart(2, "0")}.png`, clip });
}
log.khead_seek = khead(); log.kdirty_seek = kdirty();

// ── (3) live playback: press transport Play, CDP screencast every frame, rAF sampling
await page.evaluate(() => window.__seqDemo.scrub(0));
await page.waitForTimeout(300);
const cdp = await ctx.newCDPSession(page);
const frames = [];
cdp.on("Page.screencastFrame", async (f) => {
  frames.push({ ts: f.metadata.timestamp, data: f.data });
  try { await cdp.send("Page.screencastFrameAck", { sessionId: f.sessionId }); } catch {}
});
// in-page rAF sampler
await page.evaluate(() => {
  window.__samples = []; window.__sampling = true;
  const balls = [...document.querySelectorAll(".seq-ball")];
  const ph = document.querySelector(".seq-playhead");
  const tick = (now) => {
    if (!window.__sampling) return;
    window.__samples.push({ now, t: window.__seqDemo.sequence.time, playing: window.__seqDemo.isPlaying.value,
      cx: balls.map((b) => { const r = b.getBoundingClientRect(); return +(r.x + r.width / 2).toFixed(2); }),
      op: balls.map((b) => getComputedStyle(b).opacity), bp: balls.map((b) => b.style.getPropertyValue("--ball-p")),
      ph: ph ? +ph.getBoundingClientRect().x.toFixed(2) : null });
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
});
await cdp.send("Page.startScreencast", { format: "png", everyNthFrame: 1, maxWidth: 1440, maxHeight: 900 });
const playBtn = page.getByRole("button", { name: /Play animation/ });
log.playBtnCount = await playBtn.count();
log.live = [];
for (let run = 0; run < 2; run++) {
  const before = await page.evaluate(() => ({ t: window.__seqDemo.sequence.time, playing: window.__seqDemo.isPlaying.value }));
  await page.getByRole("button", { name: /Play animation/ }).click();
  const tClick = Date.now();
  await page.waitForTimeout(150);
  const mid = await page.evaluate(() => ({ t: window.__seqDemo.sequence.time, playing: window.__seqDemo.isPlaying.value, badge: document.querySelector('.status-badge')?.textContent }));
  await page.waitForTimeout(2600);
  const after = await page.evaluate(() => ({ t: window.__seqDemo.sequence.time, playing: window.__seqDemo.isPlaying.value, badge: document.querySelector('.status-badge')?.textContent }));
  log.live.push({ run, before, mid, after, tClick });
  await page.waitForTimeout(400);
}
// pause test: play, pause at ~800ms, verify frozen
await page.getByRole("button", { name: /Play animation/ }).click();
await page.waitForTimeout(800);
await page.getByRole("button", { name: /Pause animation/ }).click();
const p1 = await page.evaluate(() => window.__seqDemo.sequence.time);
await page.waitForTimeout(500);
const p2 = await page.evaluate(() => window.__seqDemo.sequence.time);
log.pauseTest = { p1, p2, frozen: p1 === p2 };
await page.screenshot({ path: OUT + "paused-mid.png", clip });
await page.getByRole("button", { name: /Play animation/ }).click(); // resume
await page.waitForTimeout(1600);
log.resumeEnd = await page.evaluate(() => ({ t: window.__seqDemo.sequence.time, playing: window.__seqDemo.isPlaying.value }));
await cdp.send("Page.stopScreencast");
log.samples = await page.evaluate(() => { window.__sampling = false; return window.__samples; });
log.khead_live = khead(); log.kdirty_live = kdirty();
log.frameCount = frames.length;
frames.forEach((f, i) => writeFileSync(`${OUT}live/s${String(i).padStart(3, "0")}.png`, Buffer.from(f.data, "base64")));
log.frameTs = frames.map((f) => f.ts);

// ── scrubber drag back and forth (real pointer), screencast
const sframes = [];
const cdp2 = await ctx.newCDPSession(page);
cdp2.on("Page.screencastFrame", async (f) => { sframes.push({ ts: f.metadata.timestamp, data: f.data }); try { await cdp2.send("Page.screencastFrameAck", { sessionId: f.sessionId }); } catch {} });
const sb = await page.locator(".seq-scrub").boundingBox();
log.scrubBox = sb;
await cdp2.send("Page.startScreencast", { format: "png", everyNthFrame: 1, maxWidth: 1440, maxHeight: 900 });
const y = sb.y + sb.height / 2;
await page.mouse.move(sb.x + 4, y);
await page.mouse.down();
log.scrubTrace = [];
const pts = [];
for (let k = 0; k <= 30; k++) pts.push(sb.x + 4 + (sb.width - 8) * (k / 30));
for (let k = 30; k >= 0; k--) pts.push(sb.x + 4 + (sb.width - 8) * (k / 30));
for (let k = 0; k <= 15; k++) pts.push(sb.x + 4 + (sb.width - 8) * (k / 30));
for (const x of pts) {
  await page.mouse.move(x, y);
  await page.waitForTimeout(40);
  log.scrubTrace.push(await page.evaluate(() => ({ p: +window.__seqDemo.progress.value.toFixed(3), cls: document.querySelector(".seq-stage").className.includes("is-scrubbing"), dir: window.__seqDemo.scrubDir.value, cx: [...document.querySelectorAll(".seq-ball")].map((b) => { const r = b.getBoundingClientRect(); return +(r.x + r.width / 2).toFixed(1); }) })));
}
await page.mouse.up();
await page.waitForTimeout(300);
log.afterScrub = await probe();
await cdp2.send("Page.stopScreencast");
sframes.forEach((f, i) => writeFileSync(`${OUT}scrub/s${String(i).padStart(3, "0")}.png`, Buffer.from(f.data, "base64")));
log.scrubFrameCount = sframes.length;
await page.screenshot({ path: OUT + "rest-after-scrub.png", clip });
log.console = consoleMsgs;
log.khead1 = khead(); log.kdirty1 = kdirty();
writeFileSync(OUT + "capture-log.json", JSON.stringify(log, null, 1));
await browser.close();
console.log("done", log.gpu, log.hasDemo, log.frameCount, log.scrubFrameCount);
