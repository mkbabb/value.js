// easing-gallery-race — live screencast capture (method 3) + rAF/transform sampling.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync, mkdirSync, readFileSync } from "node:fs";
import { execSync } from "node:child_process";
const OUT = new URL(".", import.meta.url).pathname;
const KF = "/Users/mkbabb/Programming/keyframes.js";
const khead = execSync(`git -C ${KF} rev-parse --short HEAD`).toString().trim();
const kdirty = execSync(`git -C ${KF} status --porcelain | wc -l`).toString().trim();
mkdirSync(OUT + "frames", { recursive: true });
const browser = await chromium.launch({ headless: false });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
const logs = [];
page.on("console", m => { if (["error","warning"].includes(m.type())) logs.push(m.type()+": "+m.text().slice(0,240)); });
page.on("pageerror", e => logs.push("pageerror: "+e.message.slice(0,240)));
await page.goto("http://localhost:5173/#/easing", { waitUntil: "networkidle" });
await page.waitForTimeout(2500);
const gpu = await page.evaluate(() => { const c=document.createElement("canvas").getContext("webgl"); const d=c&&c.getExtension("WEBGL_debug_renderer_info"); return d?c.getParameter(d.UNMASKED_RENDERER_WEBGL):"?"; });
const drawer = await page.evaluate(() => document.querySelector(".specimen-drawer").getBoundingClientRect().toJSON());
const clip = { x: Math.round(drawer.x), y: Math.round(drawer.y), width: Math.round(drawer.width), height: 140 };

// in-page sampler: per-rAF timestamp + every ball's transform + rect (visible ones)
const installSampler = () => page.evaluate(() => {
  window.__s = []; window.__run = true;
  const balls = [...document.querySelectorAll(".tile-ball")];
  const tick = (t) => {
    if (!window.__run) return;
    window.__s.push({ t, tr: balls.map(b => b.style.transform), anims: document.getAnimations().length });
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
});
const readSampler = () => page.evaluate(() => { window.__run = false; return window.__s; });

const cdp = await ctx.newCDPSession(page);
const frames = [];
cdp.on("Page.screencastFrame", async (f) => {
  frames.push({ ts: f.metadata.timestamp, data: f.data });
  try { await cdp.send("Page.screencastFrameAck", { sessionId: f.sessionId }); } catch {}
});
const snapState = async (label) => ({ label, s: await page.evaluate(() => ({
  name: document.querySelector(".specimen-name")?.textContent.trim(),
  balls: [...document.querySelectorAll(".tile-ball")].map(b => ({ c: b.dataset.curve, tr: b.style.transform, x: +b.getBoundingClientRect().x.toFixed(1), stageL: +b.parentElement.getBoundingClientRect().x.toFixed(1), stageW: b.parentElement.clientWidth })),
  playLabel: [...document.querySelectorAll("button.btn-playback")].map(b=>b.textContent.trim()).join("|"),
})) });
const states = [await snapState("rest-after-load")];
await page.screenshot({ path: OUT + "01-rest.png", clip });

// ── Phase A: press the ribbon Play, record 6.5 s (≥ 2 sweeps of 2×1500 ms) ──
await installSampler();
await cdp.send("Page.startScreencast", { format: "png", everyNthFrame: 1, maxWidth: 1440, maxHeight: 900 });
await page.waitForTimeout(300);
const tPlay = Date.now();
await page.locator("button.btn-playback", { hasText: "Play" }).first().click();
await page.waitForTimeout(6500);
await cdp.send("Page.stopScreencast");
const samplesA = await readSampler();
states.push(await snapState("playing-6.5s"));

// ── Phase B: pause via the same button; confirm freeze ──
await page.locator("button.btn-playback").first().click();
await page.waitForTimeout(300);
const pA = await snapState("paused+300ms");
await page.waitForTimeout(1000);
const pB = await snapState("paused+1300ms");
states.push(pA, pB);
await page.screenshot({ path: OUT + "02-paused.png", clip });

// ── Phase C: scrub via the ribbon slider (keyboard) while paused ──
const scrub = page.locator('[aria-label="Scrub animation timeline"]').first();
let scrubInfo = "no scrub slider";
if (await scrub.count()) {
  const thumb = page.locator('[role="slider"]').first();
  await thumb.focus();
  for (let i = 0; i < 5; i++) await page.keyboard.press("ArrowRight");
  await page.waitForTimeout(300);
  states.push(await snapState("after-5xArrowRight-scrub"));
  await page.keyboard.press("End");
  await page.waitForTimeout(300);
  states.push(await snapState("after-End-scrub"));
  await page.screenshot({ path: OUT + "03-scrub-end.png", clip });
  scrubInfo = "slider focused";
}

// ── Phase D: family chip "Back" then play, record 3.5 s ──
await page.getByRole("button", { name: "Back", exact: true }).first().click().catch(async () => {
  await page.locator(".family-filter button", { hasText: "Back" }).first().click();
});
await page.waitForTimeout(600);
states.push(await snapState("filter-Back"));
await page.screenshot({ path: OUT + "04-filter-back.png", clip });
const framesD = [];
const onD = (f) => framesD.push({ ts: f.metadata.timestamp, data: f.data });
cdp.on("Page.screencastFrame", onD);
await cdp.send("Page.startScreencast", { format: "png", everyNthFrame: 1, maxWidth: 1440, maxHeight: 900 });
await page.locator("button.btn-playback").first().click();
await page.waitForTimeout(3500);
await cdp.send("Page.stopScreencast");
cdp.off("Page.screencastFrame", onD);
states.push(await snapState("Back-playing"));
// select a tile
await page.locator(".specimen-tile", { hasText: "ease-in-out-back" }).first().click();
await page.waitForTimeout(800);
states.push(await snapState("tile-ease-in-out-back-selected"));
await page.screenshot({ path: OUT + "05-tile-selected.png", clip });

// ── Phase E: back to All; live 3 s rAF sampler for dropped frames ──
await page.getByRole("button", { name: "All", exact: true }).first().click();
await page.waitForTimeout(600);
await installSampler();
await page.waitForTimeout(3000);
const samplesE = await readSampler();
states.push(await snapState("All-playing-again"));
await page.screenshot({ path: OUT + "06-all-again.png", clip });

// save frames (phase A) and D (the Back filter) — the frames dir keeps them as the evidence
frames.splice(frames.findIndex(()=>true), 0);
const fA = frames.filter(f => !framesD.includes(f));
fA.forEach((f, i) => writeFileSync(`${OUT}frames/A-${String(i).padStart(4,"0")}.png`, Buffer.from(f.data, "base64")));
framesD.forEach((f, i) => writeFileSync(`${OUT}frames/D-${String(i).padStart(4,"0")}.png`, Buffer.from(f.data, "base64")));
const deltas = (s) => s.slice(1).map((x, i) => x.t - s[i].t);
const summarize = (d) => ({ n: d.length, mean: +(d.reduce((a,b)=>a+b,0)/d.length).toFixed(2), max: +Math.max(...d).toFixed(1), over20: d.filter(x=>x>20).length });
writeFileSync(OUT + "capture.json", JSON.stringify({
  khead, kdirty, gpu, clip, scrubInfo, tPlay, logs, states,
  framesA: fA.map((f,i)=>({ i, ts: f.ts })), framesD: framesD.map((f,i)=>({ i, ts: f.ts })),
  rafA: summarize(deltas(samplesA)), rafE: summarize(deltas(samplesE)),
  samplesA: samplesA.map(s => ({ t: +s.t.toFixed(1), tr: s.tr.slice(0, 8).map(x => +(x.match(/-?[\d.]+/)?.[0] ?? NaN)), anims: s.anims })),
}, null, 1));
console.log(JSON.stringify({ khead, kdirty, gpu, fA: fA.length, fD: framesD.length, rafA: summarize(deltas(samplesA)), rafE: summarize(deltas(samplesE)), logs: logs.slice(0, 10) }, null, 1));
await browser.close();
