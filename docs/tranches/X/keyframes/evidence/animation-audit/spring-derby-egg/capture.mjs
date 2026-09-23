// spring-derby-egg capture — headed Chromium, real GPU, served page. READ-ONLY on keyframes.js.
// Method 3 (rAF + setTimeout driven, no seekable clock): CDP Page.startScreencast everyNthFrame 1,
// plus an in-page rAF sampler recording every frame's layer state (transforms, opacity, rects).
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const OUT = path.dirname(new URL(import.meta.url).pathname);
const RUN = process.argv[2] || "A"; // A = double-click rail middle (natural), B = at value-0 mark (clean start), C = transport PLAYING then middle
const KHEAD = execSync("git -C /Users/mkbabb/Programming/keyframes.js rev-parse --short HEAD").toString().trim();
const KDIRTY = execSync("git -C /Users/mkbabb/Programming/keyframes.js status --porcelain | wc -l").toString().trim();
const dir = path.join(OUT, `run${RUN}`);
fs.mkdirSync(dir, { recursive: true });

const browser = await chromium.launch({ headless: false, args: ["--enable-gpu", "--ignore-gpu-blocklist"] });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
const consoleErr = [];
page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") consoleErr.push(m.text().slice(0, 200)); });
await page.goto("http://localhost:5173/#/spring", { waitUntil: "networkidle" });
await page.waitForSelector(".spring-rail", { timeout: 20000 });
await page.waitForTimeout(2500);
const gpu = await page.evaluate(() => {
  const c = document.createElement("canvas"); const gl = c.getContext("webgl");
  const e = gl && gl.getExtension("WEBGL_debug_renderer_info");
  return e ? gl.getParameter(e.UNMASKED_RENDERER_WEBGL) : "n/a";
});
const rail = await page.$(".spring-rail");
const rb = await rail.boundingBox();
const trackBox = await (await page.$(".spring-rail .spring-track")).boundingBox();
const transport = await page.evaluate(() => [...document.querySelectorAll("button[aria-label]")].map((b) => b.getAttribute("aria-label")).filter((l) => /play|pause/i.test(l)));
if (RUN === "C") {
  // the transport loads PAUSED ("Play animation"); run C presses Play first to test transport coupling
  const b = await page.$('button[aria-label="Play animation"]');
  if (b) { await b.click(); await page.waitForTimeout(600); }
}
await page.screenshot({ path: path.join(dir, "rest-before.png") });

// in-page per-frame sampler
await page.evaluate(() => {
  window.__samples = [];
  const t0 = performance.now();
  window.__t0 = t0;
  const q = (s) => document.querySelector(s);
  const tick = (now) => {
    const lanes = q(".derby-lanes");
    const balls = [...document.querySelectorAll(".derby-lane-ball")];
    const live = q(".spring-ball");
    const rect = (el) => { if (!el) return null; const r = el.getBoundingClientRect(); return [Math.round(r.x * 10) / 10, Math.round(r.y * 10) / 10, Math.round(r.width * 10) / 10, Math.round(r.height * 10) / 10]; };
    window.__samples.push({
      t: Math.round((now - t0) * 10) / 10,
      lanesMounted: !!lanes,
      lanesOpacity: lanes ? getComputedStyle(lanes).opacity : null,
      lanesClass: lanes ? lanes.className : null,
      lanesRect: rect(lanes),
      laneBallTx: balls.map((b) => b.style.transform),
      laneBallRect: balls.map((b) => rect(b)),
      liveTx: live && live.style.transform,
      liveOpacity: live && getComputedStyle(live).opacity,
      liveRect: rect(live),
      railClass: q(".spring-rail").className,
      badge: q(".status-badge") && q(".status-badge").textContent.trim(),
      markerTx: q(".spring-target-marker") && q(".spring-target-marker").style.transform,
    });
    if (now - t0 < 4200) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
});

const cdp = await ctx.newCDPSession(page);
const frames = [];
cdp.on("Page.screencastFrame", async (f) => {
  frames.push({ ts: f.metadata.timestamp, data: f.data });
  try { await cdp.send("Page.screencastFrameAck", { sessionId: f.sessionId }); } catch {}
});
await cdp.send("Page.startScreencast", { format: "png", everyNthFrame: 1, maxWidth: 1440, maxHeight: 900 });
await page.waitForTimeout(250);
const clickX = RUN === "B" ? trackBox.x + 2 : rb.x + rb.width * 0.5;
const clickY = rb.y + rb.height / 2;
const tClick = await page.evaluate(() => performance.now() - window.__t0);
await page.mouse.click(clickX, clickY);
await page.waitForTimeout(90);
await page.mouse.click(clickX, clickY);
await page.mouse.move(rb.x + rb.width * 0.5, rb.y - 160); // move pointer off the rail so hover doesn't tint
await page.waitForTimeout(3600);
await cdp.send("Page.stopScreencast");
const samples = await page.evaluate(() => window.__samples);
await page.screenshot({ path: path.join(dir, "rest-after.png") });

// save frames (full) — crop later
const t0f = frames.length ? frames[0].ts : 0;
const index = frames.map((f, i) => {
  const name = `f${String(i).padStart(3, "0")}.png`;
  fs.writeFileSync(path.join(dir, name), Buffer.from(f.data, "base64"));
  return { i, name, tMs: Math.round((f.ts - t0f) * 1000) };
});
// rAF deltas
const deltas = samples.slice(1).map((s, i) => s.t - samples[i].t);
const dropped = deltas.filter((d) => d > 20).length;
fs.writeFileSync(path.join(dir, "samples.json"), JSON.stringify({ KHEAD, KDIRTY, gpu, rb, trackBox, transport, clickX, clickY, tClick, consoleErr, dropped, maxDelta: Math.max(...deltas), nSamples: samples.length, index, samples }, null, 1));
console.log(JSON.stringify({ KHEAD, KDIRTY, gpu, rb, trackBox, transport, tClick, frames: frames.length, nSamples: samples.length, dropped, maxDelta: Math.max(...deltas), consoleErr: consoleErr.slice(0, 5) }));
await browser.close();
