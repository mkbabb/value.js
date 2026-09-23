// cube-axis-lines audit capture — HEADED Chromium, real GPU, served page.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
import fs from "node:fs";
const OUT = "/Users/mkbabb/Programming/value.js/docs/tranches/X/keyframes/evidence/animation-audit/cube-axis-lines";
const KF = "/Users/mkbabb/Programming/keyframes.js";
const stamp = () => ({
  head: execSync(`git -C ${KF} rev-parse --short HEAD`).toString().trim(),
  dirty: execSync(`git -C ${KF} status --porcelain | wc -l`).toString().trim(),
  t: new Date().toISOString(),
});
const log = { stamp0: stamp() };
const browser = await chromium.launch({ headless: false, args: ["--enable-gpu", "--ignore-gpu-blocklist"] });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
const consoleMsgs = [];
page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") consoleMsgs.push(`${m.type()}: ${m.text()}`.slice(0, 300)); });
await page.goto("http://localhost:5173/#/cube", { waitUntil: "networkidle" });
await page.waitForTimeout(3500); // intro sweep 650ms + engine load
log.gpu = await page.evaluate(() => {
  const c = document.createElement("canvas"); const gl = c.getContext("webgl");
  const d = gl && gl.getExtension("WEBGL_debug_renderer_info");
  return d ? gl.getParameter(d.UNMASKED_RENDERER_WEBGL) : "n/a";
});
const lineState = () => page.evaluate(() => [...document.querySelectorAll(".axis-line")].map((el) => {
  const cs = getComputedStyle(el); const r = el.getBoundingClientRect();
  return { cls: el.className, axisActive: cs.getPropertyValue("--axis-active").trim(), opacity: cs.opacity,
    borderStyle: cs.borderTopStyle, borderColor: cs.borderTopColor, borderW: cs.borderTopWidth, filter: cs.filter.slice(0, 120),
    z: cs.zIndex, transform: cs.transform, blend: cs.mixBlendMode, transition: cs.transition,
    rect: [r.x, r.y, r.width, r.height].map((v) => Math.round(v)),
    anims: el.getAnimations().map((a) => ({ n: a.constructor.name, p: a.transitionProperty ?? a.animationName, ps: a.playState, ct: a.currentTime, d: a.effect?.getTiming().duration, e: a.effect?.getTiming().easing })) };
}));
log.rest = await lineState();
log.routeHash = await page.evaluate(() => location.hash);
log.graph = await page.evaluate(() => { const g = document.querySelector(".graph"); if (!g) return null; const r = g.getBoundingClientRect(); const cs = getComputedStyle(g); return { rect: [r.x, r.y, r.width, r.height].map(Math.round), transform: cs.transform, perspective: cs.perspective, transformStyle: cs.transformStyle }; });
log.prm = await page.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches);
await page.screenshot({ path: `${OUT}/rest-full.png` });
// clip around the die / stage center
const g = log.graph?.rect ?? [0, 0, 1440, 900];
const cx = g[0] + g[2] / 2, cy = g[1] + g[3] / 2;
const clip = { x: Math.max(0, Math.round(cx - 360)), y: Math.max(0, Math.round(cy - 260)), width: 720, height: 520 };
log.clip = clip;
fs.mkdirSync(`${OUT}/frames`, { recursive: true });

// ---- Frame-by-frame via WAAPI seek on the CSSTransition of --axis-active
async function seekRun(axis, phase, N = 48) {
  const key = { x: "KeyX", y: "KeyY", z: "KeyZ" }[axis];
  await page.mouse.move(5, 890); // neutral focus spot
  if (phase === "in") await page.keyboard.down(axis);
  else await page.keyboard.up(axis);
  // grab transitions immediately
  const info = await page.evaluate((axis) => {
    const el = document.querySelector(`.axis-line.${axis}`);
    const anims = el.getAnimations();
    anims.forEach((a) => a.pause());
    window.__seekAnims = anims;
    return { cls: el.className, anims: anims.map((a) => ({ n: a.constructor.name, p: a.transitionProperty, ct: a.currentTime, d: a.effect.getTiming().duration, e: a.effect.getTiming().easing, kf: JSON.stringify(a.effect.getKeyframes()).slice(0, 300) })) };
  }, axis);
  const frames = [];
  const dur = info.anims[0]?.d ?? 200;
  for (let i = 0; i < N; i++) {
    const t = (dur * i) / (N - 1);
    const st = await page.evaluate(([axis, t]) => {
      (window.__seekAnims || []).forEach((a) => { a.currentTime = t; });
      const el = document.querySelector(`.axis-line.${axis}`); const cs = getComputedStyle(el);
      return { t, a: cs.getPropertyValue("--axis-active").trim(), op: cs.opacity, bs: cs.borderTopStyle, f: cs.filter.slice(0, 90) };
    }, [axis, t]);
    const p = `${OUT}/frames/${axis}-${phase}-${String(i).padStart(2, "0")}.png`;
    await page.screenshot({ path: p, clip });
    frames.push(st);
  }
  await page.evaluate(() => { (window.__seekAnims || []).forEach((a) => a.play()); });
  await page.waitForTimeout(400);
  return { info, frames, after: (await lineState()).find((l) => l.cls.includes(` ${axis}`) || l.cls.endsWith(axis)) };
}
log.seek = {};
for (const axis of ["x", "y", "z"]) {
  log.seek[`${axis}-in`] = await seekRun(axis, "in");
  await page.screenshot({ path: `${OUT}/${axis}-held-full.png` });
  log.seek[`${axis}-out`] = await seekRun(axis, "out");
}
log.stamp1 = stamp();

// ---- Real-time screencast over keydown -> hold -> keyup, twice, plus a drag with X held
const cdp = await ctx.newCDPSession(page);
const sc = [];
fs.mkdirSync(`${OUT}/screencast`, { recursive: true });
cdp.on("Page.screencastFrame", async (f) => {
  sc.push({ ts: f.metadata.timestamp, data: f.data });
  cdp.send("Page.screencastFrameAck", { sessionId: f.sessionId }).catch(() => {});
});
await cdp.send("Page.startScreencast", { format: "png", everyNthFrame: 1, maxWidth: 1440, maxHeight: 900 });
const marks = [];
const mark = async (m) => marks.push({ m, ts: await page.evaluate(() => performance.timeOrigin / 1000 + performance.now() / 1000) });
await page.waitForTimeout(300);
for (let k = 0; k < 2; k++) {
  await mark("x-down"); await page.keyboard.down("x"); await page.waitForTimeout(600);
  await mark("x-up"); await page.keyboard.up("x"); await page.waitForTimeout(600);
}
// drag with X held (axis-constrained orbit)
await mark("x-down-drag"); await page.keyboard.down("x");
await page.mouse.move(cx, cy); await page.mouse.down();
for (let i = 0; i < 30; i++) { await page.mouse.move(cx + i * 6, cy + i * 2); await page.waitForTimeout(16); }
await page.mouse.up(); await page.waitForTimeout(200);
await mark("x-up-drag"); await page.keyboard.up("x"); await page.waitForTimeout(500);
await cdp.send("Page.stopScreencast");
sc.forEach((f, i) => fs.writeFileSync(`${OUT}/screencast/sc-${String(i).padStart(3, "0")}.png`, Buffer.from(f.data, "base64")));
log.screencast = { n: sc.length, ts: sc.map((f) => +f.ts.toFixed(4)), marks };
log.afterDrag = await lineState();

// ---- rAF deltas over 3 s of live playback while toggling Y
log.raf = await page.evaluate(async () => {
  const d = []; let last = performance.now(); const end = last + 3000;
  await new Promise((res) => { const f = (t) => { d.push(t - last); last = t; if (t < end) requestAnimationFrame(f); else res(); }; requestAnimationFrame(f); });
  const drops = d.filter((x) => x > 20).length;
  return { frames: d.length, drops, max: Math.max(...d).toFixed(1), mean: (d.reduce((a, b) => a + b, 0) / d.length).toFixed(2) };
});
// transport wiring: is there a play/pause control that affects the lines? record the transitions' timeline
log.transport = await page.evaluate(() => {
  const el = document.querySelector(".axis-line.x");
  const btns = [...document.querySelectorAll("button[aria-label]")].map((b) => b.getAttribute("aria-label")).filter((l) => /play|pause|scrub|reset/i.test(l));
  return { transportButtons: btns.slice(0, 10), timelineIsDocument: el.getAnimations().every((a) => a.timeline === document.timeline) };
});
log.console = consoleMsgs.slice(0, 20);
log.stamp2 = stamp();
fs.writeFileSync(`${OUT}/capture-log.json`, JSON.stringify(log, null, 1));
await browser.close();
console.log("done", sc.length);
