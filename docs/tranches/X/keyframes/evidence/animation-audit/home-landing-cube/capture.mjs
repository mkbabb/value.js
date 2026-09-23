// home-landing-cube audit capture — headed Chromium, real GPU, served page.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const OUT = path.dirname(new URL(import.meta.url).pathname);
const FR = path.join(OUT, "frames");
fs.mkdirSync(FR, { recursive: true });
const kf = (c) => execSync(`git -C /Users/mkbabb/Programming/keyframes.js ${c}`).toString().trim();
const meta = { khead: kf("rev-parse --short HEAD"), kdirty: kf("status --porcelain").split("\n").filter(Boolean).length, startedAt: new Date().toISOString() };

const browser = await chromium.launch({ headless: false, args: ["--enable-gpu-rasterization", "--ignore-gpu-blocklist"] });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
const logs = [];
page.on("console", (m) => { if (["error", "warning"].includes(m.type())) logs.push(`${m.type()}: ${m.text()}`.slice(0, 300)); });
page.on("pageerror", (e) => logs.push(`pageerror: ${e.message}`.slice(0, 300)));

// Per-frame sampler of every cube layer, installed before any app code runs.
await page.addInitScript(() => {
  const SEL = { graph: ".graph", orbital: ".graph > *", roll: ".idle-hover", bob: ".cube-bob", pose: ".cube-pose", cube: ".cube" };
  const S = (window.__audit = { samples: [], on: true, phase: "mount" });
  const t0 = performance.now();
  const loop = (now) => {
    if (S.on) {
      const r = { t: +(now - t0).toFixed(1), ph: S.phase };
      for (const [k, s] of Object.entries(SEL)) {
        const el = document.querySelector(s);
        if (el) r[k] = getComputedStyle(el).transform;
      }
      S.samples.push(r);
    }
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
});

const cdp = await ctx.newCDPSession(page);
const frames = [];
let tag = "mount";
cdp.on("Page.screencastFrame", async (f) => {
  frames.push({ tag, ts: f.metadata.timestamp, data: f.data });
  cdp.send("Page.screencastFrameAck", { sessionId: f.sessionId }).catch(() => {});
});
const startCast = () => cdp.send("Page.startScreencast", { format: "png", everyNthFrame: 1, maxWidth: 1440, maxHeight: 900 });
const stopCast = () => cdp.send("Page.stopScreencast");

// ── Phase A: fresh load, the graph settle on mount ───────────────────────────
await startCast();
await page.goto("http://localhost:5173/", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(4000);
await stopCast();

const gpu = await page.evaluate(() => {
  const c = document.createElement("canvas"); const gl = c.getContext("webgl");
  const d = gl && gl.getExtension("WEBGL_debug_renderer_info");
  return d ? gl.getParameter(d.UNMASKED_RENDERER_WEBGL) : "n/a";
});
meta.gpu = gpu;
meta.url = page.url();

// ── Phase B: rest state — layer styles, animations, rAF deltas ───────────────
const layerStyles = async () => page.evaluate(() => {
  const pick = (el) => { const cs = getComputedStyle(el); const r = el.getBoundingClientRect();
    return { cls: (el.className?.baseVal ?? el.className ?? "").toString().slice(0, 90), transform: cs.transform, opacity: cs.opacity, z: cs.zIndex, pos: cs.position, blend: cs.mixBlendMode, filter: cs.filter, backdrop: cs.backdropFilter, tstyle: cs.transformStyle, persp: cs.perspective, willChange: cs.willChange, overflow: cs.overflow, anim: cs.animationName, rect: [r.x, r.y, r.width, r.height].map(Math.round) }; };
  const out = {};
  const graph = document.querySelector(".graph");
  if (graph) { let el = document.querySelector(".cube"); const chain = []; while (el && el !== document.body) { chain.push(pick(el)); el = el.parentElement; } out.chain = chain; }
  out.faces = [...document.querySelectorAll(".cube > *")].slice(0, 8).map(pick);
  out.anims = document.getAnimations().map((a) => ({ id: a.id, name: a.animationName ?? a.constructor.name, target: (a.effect?.target?.className ?? "").toString().slice(0, 60), state: a.playState, ct: a.currentTime }));
  out.hash = location.hash;
  out.transportLabel = [...document.querySelectorAll("[aria-label='Play animation'],[aria-label='Pause animation']")].map((b) => ({ label: b.getAttribute("aria-label"), disabled: b.disabled, vis: b.offsetParent !== null }));
  out.hero = [...document.querySelectorAll("h1")].map((h) => ({ text: h.textContent.trim().slice(0, 40), z: getComputedStyle(h).zIndex, rect: (() => { const r = h.getBoundingClientRect(); return [r.x, r.y, r.width, r.height].map(Math.round); })() }));
  return out;
});
const rafDeltas = async (ms) => page.evaluate((ms) => new Promise((res) => { const d = []; let last = performance.now(); const end = last + ms;
  const f = (n) => { d.push(n - last); last = n; if (n < end) requestAnimationFrame(f); else { const drop = d.filter((x) => x > 20); res({ n: d.length, dropped: drop.length, max: Math.max(...d).toFixed(1), mean: (d.reduce((a, b) => a + b, 0) / d.length).toFixed(2) }); } };
  requestAnimationFrame(f); }), ms);

const rest = await layerStyles();
await page.screenshot({ path: path.join(OUT, "rest-home.png") });
const restRaf = await rafDeltas(3000);

// ── Phase C: press the bottom transport Play; ≥2 iterations (5s alternate) ───
await page.evaluate(() => { window.__audit.phase = "play"; });
tag = "play";
await startCast();
const playBtn = page.locator("[aria-label='Play animation']").first();
const playVisible = await playBtn.isVisible().catch(() => false);
if (playVisible) await playBtn.click(); else await page.keyboard.press("Space");
await page.waitForTimeout(11500);
await stopCast();
const playing = await layerStyles();
await page.screenshot({ path: path.join(OUT, "after-play.png") });
const playRaf = await rafDeltas(3000);

// ── Phase D: transport wiring — pause freezes, play resumes ──────────────────
await page.evaluate(() => { window.__audit.phase = "pause"; });
const pauseBtn = page.locator("[aria-label='Pause animation']").first();
const pauseVisible = await pauseBtn.isVisible().catch(() => false);
if (pauseVisible) await pauseBtn.click(); else await page.keyboard.press("Space");
await page.waitForTimeout(1500);
await page.evaluate(() => { window.__audit.phase = "resume"; });
const play2 = page.locator("[aria-label='Play animation']").first();
const play2Visible = await play2.isVisible().catch(() => false);
if (play2Visible) await play2.click(); else await page.keyboard.press("Space");
await page.waitForTimeout(1500);
const timeline = await page.evaluate(() => ({ sliders: document.querySelectorAll("[role=slider]").length, caret: !!document.querySelector(".timeline-caret") }));

const samples = await page.evaluate(() => window.__audit.samples);
await browser.close();

// write frames
frames.sort((a, b) => a.ts - b.ts);
const idx = [];
const t0m = frames.find((f) => f.tag === "mount")?.ts, t0p = frames.find((f) => f.tag === "play")?.ts;
frames.forEach((f, i) => { const name = `${String(i).padStart(4, "0")}-${f.tag}.png`; fs.writeFileSync(path.join(FR, name), Buffer.from(f.data, "base64"));
  idx.push({ i, tag: f.tag, name, tRel: +((f.ts - (f.tag === "mount" ? t0m : t0p)) * 1000).toFixed(1) }); });
fs.writeFileSync(path.join(OUT, "frames.json"), JSON.stringify(idx, null, 1));
fs.writeFileSync(path.join(OUT, "samples.json"), JSON.stringify(samples));
fs.writeFileSync(path.join(OUT, "report.json"), JSON.stringify({ meta, logs, rest, restRaf, playVisible, pauseVisible, play2Visible, playing, playRaf, timeline, nFrames: frames.length, khead_end: kf("rev-parse --short HEAD"), kdirty_end: kf("status --porcelain").split("\n").filter(Boolean).length }, null, 1));
console.log("frames", frames.length, "samples", samples.length);
