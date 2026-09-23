// home-animated-text — frame-by-frame audit capture (method 1: WAAPI/CSS seek).
// Headed Chromium, real GPU, served page http://localhost:5173/ . Read-only on keyframes.js.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
import { execSync } from "node:child_process";
const OUT = new URL(".", import.meta.url).pathname;
const KF = "/Users/mkbabb/Programming/keyframes.js";
const head = execSync(`git -C ${KF} rev-parse --short HEAD`).toString().trim();
const dirty = execSync(`git -C ${KF} status --porcelain | wc -l`).toString().trim();
const N = Number(process.env.N || 48);
const browser = await chromium.launch({ headless: false, args: ["--enable-gpu", "--ignore-gpu-blocklist"] });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const consoleMsgs = [];
page.on("console", (m) => { if (["error", "warning"].includes(m.type())) consoleMsgs.push(`${m.type()}: ${m.text()}`.slice(0, 300)); });
await page.goto("http://localhost:5173/", { waitUntil: "networkidle" });
await page.waitForSelector("h1 .wave-char", { timeout: 20000 });
await page.waitForTimeout(1500);
const gpu = await page.evaluate(() => {
  const c = document.createElement("canvas"); const gl = c.getContext("webgl2") || c.getContext("webgl");
  if (!gl) return "no-webgl"; const e = gl.getExtension("WEBGL_debug_renderer_info");
  return e ? gl.getParameter(e.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER);
});
const h1 = page.locator("h1.hero-display");
const box = await h1.boundingBox();
const clip = { x: Math.max(0, box.x - 10), y: Math.max(0, box.y - 30), width: box.width + 20, height: box.height + 50 };
// static state
const state = await page.evaluate(() => {
  const h = document.querySelector("h1.hero-display");
  const wt = h.querySelector(".wave-text");
  const chars = [...h.querySelectorAll(".wave-char")];
  const cs = (el) => { const s = getComputedStyle(el); return { transform: s.transform, opacity: s.opacity, zIndex: s.zIndex, mix: s.mixBlendMode, filter: s.filter, willChange: s.willChange, anim: s.animationName, dur: s.animationDuration, delay: s.animationDelay, fill: s.animationFillMode, iter: s.animationIterationCount, play: s.animationPlayState }; };
  const wts = getComputedStyle(wt);
  const anims = document.getAnimations().map((a) => ({ name: a.animationName || a.constructor.name, target: a.effect?.target?.className || a.effect?.target?.tagName, text: a.effect?.target?.textContent?.slice(0, 3), playState: a.playState, currentTime: a.currentTime, delay: a.effect?.getTiming().delay, dur: a.effect?.getTiming().duration }));
  return {
    title: document.title, h1Text: h.textContent, fontSize: getComputedStyle(h).fontSize,
    regs: { step: wts.getPropertyValue("--wave-step"), cycle: wts.getPropertyValue("--wave-cycle"), lift: wts.getPropertyValue("--wave-lift"), weight: wts.getPropertyValue("--motion-weight"), staggerDefault: wts.getPropertyValue("--motion-stagger-default") },
    prm: matchMedia("(prefers-reduced-motion: reduce)").matches,
    nChars: chars.length, charIdx: chars.map((c) => c.style.getPropertyValue("--wave-i")),
    char0: cs(chars[0]), char16: cs(chars[chars.length - 1]), h1: cs(h),
    srOnly: (() => { const s = h.querySelector(".sr-only"); const c = getComputedStyle(s); return { text: s.textContent, pos: c.position, w: c.width, anims: s.getAnimations().length }; })(),
    anims, nAnims: anims.length,
    transport: !!document.querySelector("[data-transport], .transport, [aria-label*='timeline' i], [aria-label*='play' i]"),
  };
});
// live rAF sampling for 3 s + per-char transform sampling
const live = await page.evaluate(async () => {
  const chars = [...document.querySelectorAll("h1 .wave-char")];
  const deltas = []; const samples = []; let last = performance.now(); const t0 = last;
  await new Promise((res) => { function f(t) { deltas.push(t - last); last = t; if (samples.length < 400) samples.push({ t: t - t0, y: chars.map((c) => new DOMMatrix(getComputedStyle(c).transform).m42) }); if (t - t0 < 3000) requestAnimationFrame(f); else res(); } requestAnimationFrame(f); });
  const d = deltas.slice(1);
  const layout = chars.map((c) => c.getBoundingClientRect().left);
  return { frames: d.length, dropped: d.filter((x) => x > 20).length, maxDelta: Math.max(...d), meanDelta: d.reduce((a, b) => a + b, 0) / d.length, samples, layout };
});
// layout-shift check: offsetLeft/Top of chars (layout box, excludes transforms) at two times
const layoutStable = await page.evaluate(async () => {
  const chars = [...document.querySelectorAll("h1 .wave-char")];
  const a = chars.map((c) => [c.offsetLeft, c.offsetTop]); await new Promise((r) => setTimeout(r, 700));
  const b = chars.map((c) => [c.offsetLeft, c.offsetTop]); return JSON.stringify(a) === JSON.stringify(b);
});
fs.writeFileSync(OUT + "live.json", JSON.stringify({ head, dirty, gpu, state, live: { ...live, samples: live.samples.filter((_, i) => i % 3 === 0) }, layoutStable, consoleMsgs }, null, 1));
// method 1: pause ALL, seek all wave-char animations to common global time t over one 3600ms period
const period = await page.evaluate(() => { const a = document.getAnimations().find((x) => x.effect?.target?.classList?.contains("wave-char")); return a ? a.effect.getTiming().duration : null; });
await page.evaluate(() => document.getAnimations().forEach((a) => a.pause()));
const seek = [];
for (let i = 0; i < N; i++) {
  const t = Math.round((i / N) * period);
  const ys = await page.evaluate((t) => {
    const out = [];
    for (const a of document.getAnimations()) { const tg = a.effect?.target; if (tg?.classList?.contains("wave-char")) { a.currentTime = t; } }
    for (const c of document.querySelectorAll("h1 .wave-char")) out.push(+new DOMMatrix(getComputedStyle(c).transform).m42.toFixed(2));
    return out;
  }, t);
  await page.waitForTimeout(60);
  await page.screenshot({ path: `${OUT}frames/f${String(i).padStart(3, "0")}.png`, clip });
  seek.push({ i, t, ys });
}
// transport check: is there any play/pause/scrub on this surface?
const transport = await page.evaluate(() => [...document.querySelectorAll("button,[role=slider],input[type=range]")].map((b) => (b.getAttribute("aria-label") || b.textContent || "").trim().slice(0, 40)).filter(Boolean).slice(0, 40));
fs.writeFileSync(OUT + "seek.json", JSON.stringify({ head, dirty, period, N, clip, seek, transport }, null, 1));
// PRM variant
await page.emulateMedia({ reducedMotion: "reduce" });
await page.reload({ waitUntil: "networkidle" }); await page.waitForSelector("h1 .wave-char"); await page.waitForTimeout(800);
await page.screenshot({ path: `${OUT}prm.png`, clip });
const prm = await page.evaluate(() => ({ n: document.getAnimations().filter((a) => a.effect?.target?.classList?.contains("wave-char")).length, t: getComputedStyle(document.querySelector(".wave-char")).transform }));
fs.appendFileSync(OUT + "live.json", "\n" + JSON.stringify({ prm }));
await browser.close();
console.log(JSON.stringify({ head, dirty, gpu, N, period }));
