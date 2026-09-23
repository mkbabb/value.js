// amiga-contact-shadow audit capture — headed Chromium, real GPU, served page.
// Method 3 (CDP Page.startScreencast everyNthFrame:1) for live playback, plus a
// per-rAF probe log (window.__kfAmigaProbe.pose) + rAF-delta drop census, plus a
// transport check (pause / scrub). READ-ONLY on the page (no source writes).
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
import { execSync } from "node:child_process";
const OUT = new URL(".", import.meta.url).pathname;
fs.mkdirSync(OUT + "frames", { recursive: true });
fs.mkdirSync(OUT + "transport", { recursive: true });
const kf = (c) => execSync(`git -C /Users/mkbabb/Programming/keyframes.js ${c}`).toString().trim();
const stamp = { kfHead: kf("rev-parse --short HEAD"), kfDirty: kf("status --porcelain | wc -l"), at: new Date().toISOString() };
console.log("stamp", stamp);

const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const p = await ctx.newPage();
await p.goto("http://localhost:5173/#/amiga");
await p.waitForFunction(() => !!window.__kfAmigaProbe, null, { timeout: 20000 });
await p.waitForTimeout(2500);
const canvasBox = await p.locator("canvas.amiga-canvas").boundingBox();
const renderer = await p.evaluate(() => {
  const gl = document.querySelector("canvas.amiga-canvas").getContext("webgl2");
  const e = gl.getExtension("WEBGL_debug_renderer_info");
  return e ? gl.getParameter(e.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER);
});
await p.screenshot({ path: OUT + "00-rest.png" });

// Install per-rAF logger (probe pose + wall clock) before pressing play.
await p.evaluate(() => {
  window.__audit = { log: [], on: true };
  const f = (t) => {
    const q = window.__kfAmigaProbe.pose();
    window.__audit.log.push([Date.now(), t, q.px, q.py, q.playing ? 1 : 0]);
    if (window.__audit.on) requestAnimationFrame(f);
  };
  requestAnimationFrame(f);
});

// Press the transport Play (dock).
await p.getByRole("button", { name: "Play animation" }).first().click();
await p.waitForTimeout(600);
const afterPlay = await p.evaluate(() => ({ pose: window.__kfAmigaProbe.pose(), anims: document.getAnimations().length }));
console.log("afterPlay", JSON.stringify(afterPlay));

// CDP screencast, every frame, ~9 s (≥ 5 Y-periods of 1.6 s; > 1 X-period of 8 s).
const cdp = await ctx.newCDPSession(p);
const frames = [];
cdp.on("Page.screencastFrame", async (ev) => {
  frames.push({ ts: ev.metadata.timestamp, data: ev.data });
  try { await cdp.send("Page.screencastFrameAck", { sessionId: ev.sessionId }); } catch {}
});
await cdp.send("Page.startScreencast", { format: "png", everyNthFrame: 1, maxWidth: 1440, maxHeight: 900 });
await p.waitForTimeout(9000);
await cdp.send("Page.stopScreencast");
await p.waitForTimeout(200);
const meta = [];
frames.forEach((f, i) => {
  const name = `f${String(i).padStart(4, "0")}.png`;
  fs.writeFileSync(OUT + "frames/" + name, Buffer.from(f.data, "base64"));
  meta.push({ i, name, ts: f.ts });
});

// Transport: pause, then observe for 1.5 s, then scrub.
await p.getByRole("button", { name: /Pause animation/i }).first().click().catch(async () => {
  await p.getByRole("button", { name: /Play animation|Pause/i }).first().click();
});
await p.waitForTimeout(100);
await p.screenshot({ path: OUT + "transport/t0-paused+100ms.png" });
await p.waitForTimeout(1500);
await p.screenshot({ path: OUT + "transport/t1-paused+1600ms.png" });
const pausedPose = await p.evaluate(() => window.__kfAmigaProbe.pose());
// Scrub: the panel's timeline slider.
const scrub = p.getByRole("slider", { name: "Scrub animation timeline" });
const scrubAttrs = await scrub.evaluate((e) => ({ min: e.getAttribute("aria-valuemin"), max: e.getAttribute("aria-valuemax"), now: e.getAttribute("aria-valuenow"), disabled: e.getAttribute("aria-disabled") || e.getAttribute("data-disabled") })).catch((e) => String(e));
const scrubResults = [];
try {
  const tb = await p.locator("[aria-label='Scrub animation timeline']").first().evaluate((e) => { const r = (e.closest("[data-orientation]")||e.parentElement).getBoundingClientRect(); return [r.x, r.y, r.width, r.height]; });
  const track = await p.locator("[aria-label='Scrub animation timeline']").first().evaluate((e) => { let n = e; for (let k=0;k<4;k++){ n = n.parentElement; const r=n.getBoundingClientRect(); if (r.width>200) return [r.x,r.y,r.width,r.height]; } return null; });
  const tr = track || tb;
  for (const frac of [0.1, 0.3, 0.5, 0.7, 0.9]) {
    await p.mouse.click(tr[0] + tr[2] * frac, tr[1] + tr[3] / 2);
    await p.waitForTimeout(400);
    const q = await p.evaluate(() => window.__kfAmigaProbe.pose());
    const now = await scrub.getAttribute("aria-valuenow").catch(() => null);
    const name = `transport/s-${frac}.png`;
    await p.screenshot({ path: OUT + name });
    scrubResults.push({ frac, now, px: q.px, py: q.py, playing: q.playing, name });
  }
} catch (e) { scrubResults.push({ error: String(e) }); }

await p.evaluate(() => { window.__audit.on = false; });
const log = await p.evaluate(() => window.__audit.log);
fs.writeFileSync(OUT + "meta.json", JSON.stringify({ stamp, renderer, canvasBox, afterPlay, pausedPose, scrubAttrs, scrubResults, frames: meta }, null, 1));
fs.writeFileSync(OUT + "raflog.json", JSON.stringify(log));
console.log("frames", frames.length, "raf", log.length, "renderer", renderer);
console.log("paused", JSON.stringify(pausedPose), "scrub", JSON.stringify(scrubAttrs));
console.log(JSON.stringify(scrubResults));
await b.close();
