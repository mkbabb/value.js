// SERVED MODEL: claude-opus-5-5
// amiga-boing-composite audit capture — headed Chromium, real GPU, served page.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync, mkdirSync } from "node:fs";
import { execSync } from "node:child_process";
const OUT = new URL(".", import.meta.url).pathname;
const KF = "/Users/mkbabb/Programming/keyframes.js";
const khead = () => execSync(`git -C ${KF} rev-parse --short HEAD`).toString().trim();
const kdirty = () => execSync(`git -C ${KF} status --porcelain | wc -l`).toString().trim();
const log = { khead0: khead(), kdirty0: kdirty(), phases: {} };
const save = () => writeFileSync(OUT + "capture.json", JSON.stringify(log, null, 1));

const browser = await chromium.launch({ headless: false, args: ["--ignore-gpu-blocklist"] });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
const consoleMsgs = [];
page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") consoleMsgs.push(m.type() + ": " + m.text().slice(0, 300)); });
page.on("pageerror", (e) => consoleMsgs.push("pageerror: " + e.message.slice(0, 300)));

await page.goto("http://localhost:5173/#/amiga", { waitUntil: "load" });
await page.waitForSelector("canvas.amiga-canvas", { timeout: 20000 });
await page.waitForTimeout(3000);

// GPU / renderer identity
log.gl = await page.evaluate(() => {
  const c = document.createElement("canvas"); const gl = c.getContext("webgl2");
  const ext = gl && gl.getExtension("WEBGL_debug_renderer_info");
  return { dpr: devicePixelRatio, renderer: ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : "n/a" };
});
const box = await page.locator("canvas.amiga-canvas").boundingBox();
log.canvasBox = box;
const clip = { x: Math.round(box.x), y: Math.round(box.y), width: Math.round(box.width), height: Math.round(box.height) };
await page.screenshot({ path: OUT + "shots/00-rest-fullpage.png" });

// layer inventory: canvas + ancestors computed style; CSS/WAAPI animations
log.layers = await page.evaluate(() => {
  const out = []; let el = document.querySelector("canvas.amiga-canvas");
  while (el && el !== document.documentElement) {
    const cs = getComputedStyle(el);
    out.push({ tag: el.tagName, cls: (el.className?.baseVal ?? el.className ?? "").toString().slice(0, 80),
      transform: cs.transform, opacity: cs.opacity, z: cs.zIndex, blend: cs.mixBlendMode, filter: cs.filter,
      backdrop: cs.backdropFilter, willChange: cs.willChange, pos: cs.position, bg: cs.backgroundColor, bgImg: cs.backgroundImage.slice(0, 60) });
    el = el.parentElement;
  }
  const c = document.querySelector("canvas.amiga-canvas");
  return { chain: out, canvasAttr: { w: c.width, h: c.height, cw: c.clientWidth, ch: c.clientHeight } };
});
log.restPose = await page.evaluate(() => window.__kfAmigaProbe?.pose() ?? null);
log.animsAtRest = await page.evaluate(() => document.getAnimations().map((a) => ({ n: a.animationName ?? a.id ?? a.constructor.name, st: a.playState, tgt: a.effect?.target?.className?.toString?.().slice(0, 50) })));

// Group handle via the Vue dev instance (read-only reach, for stepping + state)
const hasGroup = await page.evaluate(() => {
  const c = document.querySelector("canvas.amiga-canvas");
  let inst = c.__vueParentComponent;
  while (inst && !(inst.exposed && inst.exposed.facility)) inst = inst.parent;
  if (!inst) return false;
  window.__auditGroup = inst.exposed.facility.group;
  window.__auditFacility = inst.exposed.facility;
  return Object.keys(window.__auditGroup.animations);
});
log.groupChannels = hasGroup;
log.groupStateAtRest = await page.evaluate(() => { const g = window.__auditGroup; return g ? { started: g.started, playing: g.playing() } : null; });

// transport controls present?
log.transport = await page.evaluate(() => [...document.querySelectorAll("[aria-label]")].filter((e) => /play|pause|select animation|scrub|reset|timeline/i.test(e.getAttribute("aria-label"))).map((e) => { const r = e.getBoundingClientRect(); return { l: e.getAttribute("aria-label"), vis: r.width > 0 && r.height > 0, x: Math.round(r.x), y: Math.round(r.y), disabled: e.disabled ?? null, ariaDisabled: e.getAttribute("aria-disabled") }; }));
save();

// ── PHASE LIVE: press Play, screencast + rAF probe sampler for 17 s ──
const cdp = await ctx.newCDPSession(page);
const frames = []; let recording = false;
cdp.on("Page.screencastFrame", async (f) => {
  cdp.send("Page.screencastFrameAck", { sessionId: f.sessionId }).catch(() => {});
  if (!recording) return;
  const i = frames.length; const name = `live/f${String(i).padStart(4, "0")}.jpg`;
  writeFileSync(OUT + name, Buffer.from(f.data, "base64"));
  frames.push({ i, ts: f.metadata.timestamp, name });
});
await page.evaluate(() => {
  window.__auditSamples = []; window.__auditRun = true;
  const tick = (now) => {
    const p = window.__kfAmigaProbe?.pose(); const g = window.__auditGroup;
    window.__auditSamples.push([now, p?.px, p?.py, p?.spin, p?.playing ? 1 : 0, g ? g.playing() : null]);
    if (window.__auditRun) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
});
await cdp.send("Page.startScreencast", { format: "jpeg", quality: 70, everyNthFrame: 1 });
recording = true;
const playBtn = page.locator('[aria-label="Play animation"]:visible').first();
const tPlayWall = Date.now() / 1000;
const tPlayPerf = await page.evaluate(() => performance.now());
await playBtn.click();
await page.waitForTimeout(17000);
recording = false;
await cdp.send("Page.stopScreencast");
log.phases.live = { tPlayWall, tPlayPerf, frames: frames.length, firstTs: frames[0]?.ts, lastTs: frames.at(-1)?.ts };
log.animsWhilePlaying = await page.evaluate(() => document.getAnimations().map((a) => ({ n: a.animationName ?? a.constructor.name, st: a.playState, tgt: a.effect?.target?.className?.toString?.().slice(0, 50) })));
log.transportWhilePlaying = await page.evaluate(() => [...document.querySelectorAll("[aria-label]")].filter((e) => /play|pause|scrub|timeline/i.test(e.getAttribute("aria-label"))).map((e) => ({ l: e.getAttribute("aria-label"), vis: e.getBoundingClientRect().width > 0, dis: e.getAttribute("aria-disabled") ?? e.disabled ?? null, cls: e.className?.toString?.().slice(0, 100) })));
log.childTimesWhilePlaying = await page.evaluate(() => Object.entries(window.__auditGroup?.animations ?? {}).map(([n, o]) => ({ n, t: o.animation.t, dur: o.animation.options.duration })));
writeFileSync(OUT + "live/frames.json", JSON.stringify(frames));
await page.screenshot({ path: OUT + "shots/01-playing-fullpage.png" });

// ── PHASE PAUSE: press Pause, sample 2.5 s ──
await page.evaluate(() => { window.__auditSamples.push(["PAUSE", performance.now()]); });
await page.locator('[aria-label="Pause animation"]:visible').first().click();
for (let k = 0; k < 5; k++) { await page.waitForTimeout(500); await page.screenshot({ path: OUT + `shots/02-paused-${k}.png`, clip }); }
log.afterPause = await page.evaluate(() => ({ pose: window.__kfAmigaProbe?.pose(), g: { started: window.__auditGroup.started, playing: window.__auditGroup.playing() }, children: Object.entries(window.__auditGroup.animations).map(([n, o]) => ({ n, t: o.animation.t })) }));
log.transportPaused = await page.evaluate(() => [...document.querySelectorAll("[aria-label]")].filter((e) => /play|pause|scrub|timeline|select animation/i.test(e.getAttribute("aria-label"))).map((e) => { const r = e.getBoundingClientRect(); return { l: e.getAttribute("aria-label"), vis: r.width > 0, x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), dis: e.getAttribute("aria-disabled") ?? e.disabled ?? null, val: e.getAttribute("aria-valuenow") }; }));
// ── PHASE RESUME: press Play again, sample 2 s (seam continuity) ──
await page.evaluate(() => { window.__auditSamples.push(["RESUME", performance.now()]); });
await page.locator('[aria-label="Play animation"]:visible').first().click();
await page.waitForTimeout(2000);
await page.evaluate(() => { window.__auditSamples.push(["PAUSE2", performance.now()]); });
await page.locator('[aria-label="Pause animation"]:visible').first().click();
await page.waitForTimeout(1500);
await page.evaluate(() => { window.__auditRun = false; });
const samples = await page.evaluate(() => window.__auditSamples);
writeFileSync(OUT + "samples.json", JSON.stringify(samples));
save();

// ── PHASE SCRUB via the transport scrubber (if present) ──
log.scrub = {};
const scrub = page.locator('[aria-label="Scrub animation timeline"]:visible').first();
if (await scrub.count()) {
  const before = await page.evaluate(() => window.__kfAmigaProbe.pose());
  await scrub.focus();
  for (let k = 0; k < 10; k++) await page.keyboard.press("ArrowRight");
  await page.waitForTimeout(1200);
  const after = await page.evaluate(() => window.__kfAmigaProbe.pose());
  const sb = await scrub.boundingBox();
  await page.mouse.click(sb.x + sb.width * 0.3, sb.y + sb.height / 2);
  await page.waitForTimeout(1200);
  const afterClick = await page.evaluate(() => window.__kfAmigaProbe.pose());
  await page.screenshot({ path: OUT + "shots/03-scrubbed.png", clip });
  log.scrub = { present: true, before, afterKeys: after, afterClick30: afterClick, children: await page.evaluate(() => Object.entries(window.__auditGroup.animations).map(([n, o]) => ({ n, t: o.animation.t }))) };
} else log.scrub = { present: false };
save();

// ── PHASE STEP (method 2: the library clock) — 48 evenly spaced group times over one X period ──
const N = 48;
log.step = [];
await page.evaluate(() => { const g = window.__auditGroup; if (g.playing()) g.pause(); });
for (let k = 0; k < N; k++) {
  const T = (k * 8000) / N;
  const r = await page.evaluate(async (T) => {
    const g = window.__auditGroup; const a = g.animations;
    for (const [n, o] of Object.entries(a)) g.setChildTime(o.animation, T % o.animation.options.duration);
    g.render();
    await new Promise((res) => requestAnimationFrame(() => requestAnimationFrame(res)));
    return window.__kfAmigaProbe.pose();
  }, T);
  if (k === 0) { await page.waitForTimeout(1500); r.settled = await page.evaluate(() => window.__kfAmigaProbe.pose()); }
  await page.screenshot({ path: OUT + `step/s${String(k).padStart(2, "0")}.png`, clip });
  log.step.push({ k, T, ...r });
}
save();

// ── PHASE SELECT: open the animation select, list + choose each ──
log.select = [];
const sel = page.locator('[aria-label="Select animation"]:visible').first();
if (await sel.count()) {
  await sel.click(); await page.waitForTimeout(500);
  const opts = await page.locator('[role="option"]').allInnerTexts();
  log.selectOptions = opts;
  await page.screenshot({ path: OUT + "shots/04-select-open.png" });
  await page.keyboard.press("Escape");
  for (const name of ["Spin", "Bouncing X", "Bouncing Y"]) {
    await sel.click(); await page.waitForTimeout(400);
    const o = page.locator('[role="option"]', { hasText: name }).first();
    if (await o.count()) { await o.click(); await page.waitForTimeout(600);
      const txt = await sel.innerText();
      await page.screenshot({ path: OUT + `shots/05-select-${name.replace(/ /g, "")}.png` });
      log.select.push({ name, shown: txt });
    } else { log.select.push({ name, missing: true }); await page.keyboard.press("Escape"); }
  }
}
log.console = consoleMsgs.slice(0, 40);
log.khead1 = khead(); log.kdirty1 = kdirty();
save();
await browser.close();
console.log("done", frames.length);
