// spring-physics-facet — frame-by-frame capture (HEADED Chromium, real GPU, served page).
// READ-ONLY on keyframes.js. Writes only under this directory.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
import fs from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const KF = "/Users/mkbabb/Programming/keyframes.js";
const khead = () => execSync(`git -C ${KF} rev-parse --short HEAD`).toString().trim() + " dirty=" + execSync(`git -C ${KF} status --porcelain | wc -l`).toString().trim();
const meta = { start: new Date().toISOString(), khead0: khead(), phases: {} };
const CLIP = { x: 72, y: 130, width: 1300, height: 580 }; // facet + stage (trace) region

const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const p = await ctx.newPage();
const errs = []; p.on("console", m => { if (m.type() === "error") errs.push(m.text().slice(0, 200)); });
p.on("pageerror", e => errs.push("PAGEERROR " + e.message.slice(0, 200)));
await p.goto("http://localhost:5173/#/spring", { waitUntil: "networkidle" });
await p.waitForTimeout(2500);
meta.gpu = await p.evaluate(() => { const c = document.createElement("canvas").getContext("webgl"); const e = c && c.getExtension("WEBGL_debug_renderer_info"); return e ? c.getParameter(e.UNMASKED_RENDERER_WEBGL) : "n/a"; });
meta.onScreen = await p.evaluate(() => ({
  heatmapVisible: !!document.querySelector(".spring-heatmap")?.getBoundingClientRect().width,
  facetCount: document.querySelectorAll(".spring-heatmap").length,
  readout: document.querySelector(".spring-heatmap-section .text-mono-caption")?.innerText,
  hash: location.hash,
}));
const cdp = await ctx.newCDPSession(p);

// Page-side per-rAF logger: records marker, preset balls, sampler/live balls, readout, trace path, streaming.
await p.evaluate(() => {
  window.__log = []; window.__on = false;
  const hm = () => document.querySelector(".spring-heatmap");
  const tick = (now) => {
    if (window.__on) {
      const m = document.querySelector(".spring-heatmap-marker");
      const mt = m ? new DOMMatrix(getComputedStyle(m).transform) : null;
      const path = document.querySelector(".plot-frame svg:nth-of-type(2) path, .plot-frame path");
      window.__log.push({
        t: +now.toFixed(1),
        mx: mt ? +mt.e.toFixed(2) : null, my: mt ? +mt.f.toFixed(2) : null,
        streaming: m?.classList.contains("is-streaming"),
        pb: [...document.querySelectorAll(".preset-ball")].slice(0, 4).map(e => +(new DOMMatrix(getComputedStyle(e).transform).e).toFixed(2)),
        sampler: (() => { const e = document.querySelector(".sampler-ball"); return e ? +(e.getBoundingClientRect().x).toFixed(2) : null; })(),
        live: (() => { const e = document.querySelector(".spring-ball"); return e ? +(e.getBoundingClientRect().x).toFixed(2) : null; })(),
        readout: document.querySelector(".spring-heatmap-section .text-mono-caption")?.innerText,
        traceLen: path?.getAttribute("d")?.length ?? (document.querySelector(".plot-frame polyline")?.getAttribute("points")?.length ?? null),
        scrub: document.querySelector('[aria-label="Scrub animation timeline"]')?.getAttribute("aria-valuenow"),
        anims: document.getAnimations().length,
      });
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
});
const logOn = async () => p.evaluate(() => { window.__log = []; window.__on = true; });
const logOff = async (name) => { const l = await p.evaluate(() => { window.__on = false; return window.__log; }); fs.writeFileSync(`${OUT}${name}/rafLog.json`, JSON.stringify(l)); return l; };
const mk = (d) => fs.mkdirSync(OUT + d, { recursive: true });

// ── pause/step helper for CSS transitions/WAAPI (method 1)
async function stepAnimations(dir, N, clip) {
  mk(dir);
  await p.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))));
  const list = await p.evaluate(() => {
    const as = document.getAnimations();
    as.forEach(a => a.pause());
    window.__as = as;
    return as.map(a => ({ type: a.constructor.name, prop: a.transitionProperty || a.animationName || null, target: (a.effect?.target?.className?.toString() || a.effect?.target?.tagName || "").slice(0, 60), dur: a.effect?.getComputedTiming().duration, ct: a.currentTime }));
  });
  const frames = [];
  const maxDur = Math.max(1, ...list.map(a => Number(a.dur) || 0));
  for (let i = 0; i < N; i++) {
    const t = (i / (N - 1)) * maxDur;
    const st = await p.evaluate((t) => {
      window.__as.forEach(a => { try { a.currentTime = Math.min(t, a.effect.getComputedTiming().duration); } catch {} });
      const m = document.querySelector(".spring-heatmap-marker");
      const cell = document.querySelector('.preset-cell[data-state="on"]');
      return { mT: getComputedStyle(m).transform, activeCell: cell?.innerText.split("\n")[0], outline: cell ? getComputedStyle(cell).outlineColor : null };
    }, t);
    const f = `${dir}/f${String(i).padStart(3, "0")}.png`;
    await p.screenshot({ path: OUT + f, clip });
    frames.push({ i, t: +t.toFixed(1), ...st });
  }
  await p.evaluate(() => window.__as.forEach(a => { try { a.play(); } catch {} }));
  fs.writeFileSync(`${OUT}${dir}/frames.json`, JSON.stringify({ animations: list, frames }, null, 1));
  return { animations: list, n: frames.length };
}

// ── CDP screencast (method 3)
async function screencast(dir, ms, action) {
  mk(dir);
  const frames = [];
  const h = async (e) => { frames.push({ ts: e.metadata.timestamp, data: e.data }); try { await cdp.send("Page.screencastFrameAck", { sessionId: e.sessionId }); } catch {} };
  cdp.on("Page.screencastFrame", h);
  await cdp.send("Page.startScreencast", { format: "png", everyNthFrame: 1, maxWidth: 1440, maxHeight: 900 });
  await p.waitForTimeout(150);
  const actP = action ? action() : Promise.resolve();
  await p.waitForTimeout(ms);
  await actP;
  await cdp.send("Page.stopScreencast");
  cdp.off("Page.screencastFrame", h);
  const t0 = frames[0]?.ts ?? 0;
  const idx = frames.map((f, i) => { const n = `${dir}/f${String(i).padStart(3, "0")}.png`; fs.writeFileSync(OUT + n, Buffer.from(f.data, "base64")); return { i, ms: +((f.ts - t0) * 1000).toFixed(1) }; });
  fs.writeFileSync(`${OUT}${dir}/frames.json`, JSON.stringify(idx));
  return idx.length;
}

// ── A: heatmap isolated click → marker glide (CSS transition), stepped 32 frames
meta.phases.A_before = await p.evaluate(() => getComputedStyle(document.querySelector(".spring-heatmap-marker")).transform);
mk("A_heatmap_click"); await logOn();
await p.mouse.click(420, 420); // high response, low ζ
meta.phases.A = await stepAnimations("A_heatmap_click", 32, CLIP);
await p.waitForTimeout(600);
await logOff("A_heatmap_click");
meta.phases.A.khead = khead();
await p.screenshot({ path: OUT + "A_heatmap_click/after-rest.png", clip: CLIP });

// ── B: heatmap drag sweep (screencast), streaming expected (1:1 tracking)
mk("B_heatmap_drag"); await logOn();
meta.phases.B = { frames: await screencast("B_heatmap_drag", 2200, async () => {
  await p.mouse.move(140, 430); await p.mouse.down();
  for (let k = 0; k <= 40; k++) { await p.mouse.move(140 + k * 7.5, 430 - k * 5.5); await p.waitForTimeout(25); }
  await p.mouse.up();
}) };
await logOff("B_heatmap_drag"); meta.phases.B.khead = khead();
await p.mouse.move(1400, 880);

// ── C: preset click (Bouncy) → marker glide + active outline, stepped 32 frames
mk("C_preset_click"); await logOn();
await p.locator('.preset-cell', { hasText: 'Bouncy' }).first().click();
meta.phases.C = await stepAnimations("C_preset_click", 32, CLIP);
await p.waitForTimeout(600);
await logOff("C_preset_click"); meta.phases.C.khead = khead();

// ── D: Re-seat (JS click, no scroll) → preset track balls chase (rAF painter), screencast
mk("D_reseat"); await logOn();
meta.phases.D = { frames: await screencast("D_reseat", 2600, async () => {
  await p.evaluate(() => [...document.querySelectorAll("button")].find(b => b.innerText.trim() === "Re-seat" && b.getBoundingClientRect().width)?.click());
}) };
await logOff("D_reseat"); meta.phases.D.khead = khead();

// ── E: transport Play on Sweep (dock Play) → 3.2 s live playback screencast + rAF deltas
await p.mouse.move(1400, 880);
mk("E_play"); await logOn();
const facetBefore = await p.evaluate(() => document.querySelector(".controls-pane .card")?.innerHTML.length);
let mut = 0;
await p.evaluate(() => { window.__mut = 0; const c = document.querySelector(".keyframes-editor-scroll"); new MutationObserver(ms => { window.__mut += ms.length; }).observe(c, { subtree: true, attributes: true, childList: true, characterData: true }); });
meta.phases.E = { frames: await screencast("E_play", 3300, async () => {
  await p.click('button[aria-label="Play animation"] >> visible=true');
}) };
meta.phases.E.getAnimationsDuringPlay = await p.evaluate(() => document.getAnimations().map(a => (a.animationName || a.transitionProperty) + "@" + (a.effect?.target?.className?.toString() || "").slice(0, 30)));
meta.phases.E.editorMutationsDuringPlay = await p.evaluate(() => window.__mut);
const eLog = await logOff("E_play"); meta.phases.E.khead = khead();
const deltas = eLog.slice(1).map((r, i) => r.t - eLog[i].t);
meta.phases.E.raf = { n: deltas.length, over20: deltas.filter(d => d > 20).length, max: Math.max(...deltas), mean: +(deltas.reduce((a, c) => a + c, 0) / deltas.length).toFixed(2) };

// ── F: Reverse while playing — does the visible sweep reverse? (rAF log only)
mk("F_reverse"); await logOn();
await p.waitForTimeout(700);
await p.evaluate(() => [...document.querySelectorAll("button")].find(b => b.getAttribute("aria-label") === "Reverse" || b.innerText.trim() === "Reverse")?.click());
await p.waitForTimeout(1400);
await logOff("F_reverse"); meta.phases.F = { khead: khead(), reversedPressed: await p.evaluate(() => [...document.querySelectorAll("button")].find(b => b.innerText.trim() === "Reverse")?.getAttribute("aria-pressed")) };
// pause
await p.click('button[aria-label="Pause animation"] >> visible=true').catch(async () => { await p.click('button[aria-label="Play animation"] >> visible=true').catch(() => {}); });
await p.waitForTimeout(300);
meta.phases.F.pausedLabel = await p.evaluate(() => [...document.querySelectorAll('button[aria-label$="animation"]')].filter(b => b.getBoundingClientRect().width).map(b => b.getAttribute("aria-label")));

// ── G: scrub while paused via the transport's scrubber (library clock seam: scrubTo) — 24 positions
mk("G_scrub"); await logOn();
const sInfo = await p.evaluate(() => { const s = document.querySelector('[aria-label="Scrub animation timeline"]'); s.focus({ preventScroll: true }); return { max: s.getAttribute("aria-valuemax"), now: s.getAttribute("aria-valuenow") }; });
await p.keyboard.press("Home");
const gFrames = [];
for (let i = 0; i < 24; i++) {
  const st = await p.evaluate(() => ({ scrub: document.querySelector('[aria-label="Scrub animation timeline"]').getAttribute("aria-valuenow"), sampler: document.querySelector(".sampler-ball")?.getBoundingClientRect().x, sweepReadout: document.querySelector(".readout-accent")?.innerText }));
  await p.screenshot({ path: `${OUT}G_scrub/f${String(i).padStart(3, "0")}.png`, clip: CLIP });
  gFrames.push({ i, ...st });
  await p.keyboard.press("PageUp");
  await p.waitForTimeout(60);
}
fs.writeFileSync(`${OUT}G_scrub/frames.json`, JSON.stringify({ sInfo, gFrames }, null, 1));
await logOff("G_scrub"); meta.phases.G = { khead: khead(), sInfo };

meta.errs = errs; meta.end = new Date().toISOString(); meta.khead1 = khead();
fs.writeFileSync(OUT + "meta.json", JSON.stringify(meta, null, 1));
console.log(JSON.stringify(meta, null, 1).slice(0, 4000));
await b.close();
