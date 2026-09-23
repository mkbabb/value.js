// square-tumble-egg capture — headed Chromium, real GPU, served page, CDP screencast + per-rAF state log.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
const OUT = path.dirname(new URL(import.meta.url).pathname);
const CONTROL = process.env.CONTROL === "1"; // control run: no screencast, rAF log only
const FR = path.join(OUT, "frames"); if (!CONTROL) { fs.rmSync(FR, { recursive: true, force: true }); fs.mkdirSync(FR, { recursive: true }); }
const kf = "/Users/mkbabb/Programming/keyframes.js";
const khead = execSync(`git -C ${kf} rev-parse --short HEAD`).toString().trim();
const kdirty = execSync(`git -C ${kf} status --porcelain | wc -l`).toString().trim();
const browser = await chromium.launch({ headless: false, args: ["--ignore-gpu-blocklist"] });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
const consoleLog = [];
page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") consoleLog.push(`${m.type()}: ${m.text()}`.slice(0, 300)); });
page.on("pageerror", (e) => consoleLog.push("pageerror: " + String(e).slice(0, 300)));
await page.goto("http://localhost:5173/#/square", { waitUntil: "networkidle" });
const box = page.locator(".demo-box");
await box.waitFor({ state: "visible", timeout: 20000 });
await page.waitForTimeout(1500);
const gpu = await page.evaluate(() => { const c = document.createElement("canvas").getContext("webgl"); const d = c && c.getExtension("WEBGL_debug_renderer_info"); return d ? c.getParameter(d.UNMASKED_RENDERER_WEBGL) : "n/a"; });
const bb = await box.boundingBox();
// clip region: box centre ± 220px (covers rotation + bloom)
const cx = bb.x + bb.width / 2, cy = bb.y + bb.height / 2;
const clip = { x: Math.round(cx - 230), y: Math.round(cy - 230), width: 460, height: 460 };
await page.screenshot({ path: path.join(OUT, "rest-before.png") });
// per-rAF sampler
await page.evaluate(() => {
  const el = document.querySelector(".demo-box");
  window.__log = []; window.__rec = true;
  const tick = (now) => {
    const cs = getComputedStyle(el);
    window.__log.push({ t: now, tf: el.style.transform, fillInline: el.style.getPropertyValue("--subject-fill"),
      bg: cs.backgroundColor, bgi: cs.backgroundImage.slice(0, 90), sweep: el.hasAttribute("data-palette-sweep"),
      mode: el.getAttribute("data-square-mode"), cls: el.className, shadow: cs.boxShadow.slice(0, 140), wc: cs.willChange,
      ctf: cs.transform, z: cs.zIndex, op: cs.opacity, filt: cs.filter, blend: cs.mixBlendMode });
    if (window.__rec) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
});
const cdp = await ctx.newCDPSession(page);
const frames = [];
cdp.on("Page.screencastFrame", async (f) => {
  frames.push({ ts: f.metadata.timestamp, data: f.data });
  try { await cdp.send("Page.screencastFrameAck", { sessionId: f.sessionId }); } catch {}
});
if (!CONTROL) await cdp.send("Page.startScreencast", { format: "png", everyNthFrame: 1, maxWidth: 1440, maxHeight: 900 });
await page.waitForTimeout(300);
// double-tap exactly as howToReach: two clicks, no movement
const t0 = await page.evaluate(() => performance.now());
await page.mouse.move(cx, cy);
await page.mouse.down(); await page.mouse.up();
await page.waitForTimeout(90);
await page.mouse.down(); await page.mouse.up();
const tTap = await page.evaluate(() => performance.now());
// move pointer away so :hover does not colour the reading
await page.mouse.move(40, 860);
await page.waitForTimeout(3200);
// phase 2: transport probe — re-tumble, then press Space (house play/pause) mid-spin
const tTap2 = await page.evaluate(() => performance.now());
await page.mouse.move(cx, cy);
await page.mouse.down(); await page.mouse.up(); await page.waitForTimeout(90); await page.mouse.down(); await page.mouse.up();
await page.mouse.move(40, 860);
await page.waitForTimeout(250);
const machineBefore = await page.evaluate(() => document.querySelector(".demo-box").style.transform);
await page.keyboard.press("Space");
const tSpace = await page.evaluate(() => performance.now());
await page.waitForTimeout(3000);
if (!CONTROL) await cdp.send("Page.stopScreencast");
const timeOrigin = await page.evaluate(() => performance.timeOrigin);
await page.evaluate(() => { window.__rec = false; });
const log = await page.evaluate(() => window.__log);
await page.screenshot({ path: path.join(OUT, CONTROL ? "rest-after.control.png" : "rest-after.png") });
// transport state
const transport = await page.evaluate(() => {
  const q = (s) => [...document.querySelectorAll(s)].map((e) => ({ tag: e.tagName, aria: e.getAttribute("aria-label"), dis: e.disabled || e.getAttribute("aria-disabled"), pressed: e.getAttribute("aria-pressed") })).slice(0, 12);
  return { buttons: q("[aria-label*='lay' i],[aria-label*='ause' i],[role='slider'][aria-label*='ime' i],[aria-label*='imeline' i]") };
});
// write frames + crops
const meta = [];
for (let i = 0; i < frames.length; i++) {
  const f = path.join(FR, `f${String(i).padStart(4, "0")}.png`);
  fs.writeFileSync(f, Buffer.from(frames[i].data, "base64"));
  meta.push({ i, ts: frames[i].ts });
}
// rAF delta analysis
const deltas = log.slice(1).map((r, i) => ({ t: r.t, d: r.t - log[i].t }));
const drops = deltas.filter((x) => x.d > 20);
fs.writeFileSync(path.join(OUT, CONTROL ? "state-log.control.json" : "state-log.json"), JSON.stringify({ timeOrigin, khead, kdirty, gpu, clip, bb, t0, tTap, tTap2, tSpace, machineBefore, transport, consoleLog, frames: meta, drops, log }, null, 0));
console.log(JSON.stringify({ khead, kdirty, gpu, bb, frames: frames.length, rafSamples: log.length, drops: drops.length, maxDelta: Math.max(...deltas.map((d) => d.d)), consoleLog: consoleLog.slice(0, 8), transport }, null, 0));
await browser.close();
