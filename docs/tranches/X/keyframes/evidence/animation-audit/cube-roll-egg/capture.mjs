// cube-roll-egg — headed Chromium, real GPU, served page. Method (3): CDP screencast
// (everyNthFrame 1) + a per-rAF numeric trace of the roll element (.idle-hover).
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
import { execSync } from "node:child_process";
const KF = "/Users/mkbabb/Programming/keyframes.js";
const khead = execSync(`git -C ${KF} rev-parse --short HEAD`).toString().trim();
const kdirty = execSync(`git -C ${KF} status --porcelain | wc -l`).toString().trim();
fs.mkdirSync("frames", { recursive: true });
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const p = await ctx.newPage();
const consoleMsgs = [];
p.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") consoleMsgs.push(m.type() + ": " + m.text().slice(0, 200)); });
p.on("pageerror", (e) => consoleMsgs.push("pageerror: " + e.message.slice(0, 200)));
await p.goto("http://localhost:5173/#/cube", { waitUntil: "networkidle" });
await p.waitForTimeout(2500);
const gpu = await p.evaluate(() => { const gl = document.createElement("canvas").getContext("webgl"); const e = gl.getExtension("WEBGL_debug_renderer_info"); return gl.getParameter(e.UNMASKED_RENDERER_WEBGL); });
const box = await p.evaluate(() => { const r = document.querySelector(".idle-hover").getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height }; });
const cx = Math.round(box.x + box.w / 2), cy = Math.round(box.y + box.h / 2);
// per-rAF trace
await p.evaluate(() => {
  window.__trace = []; window.__on = true;
  const el = document.querySelector(".idle-hover"), cube = document.querySelector(".cube");
  const step = (t) => {
    if (!window.__on) return;
    const cs = getComputedStyle(el);
    window.__trace.push({ t: +t.toFixed(2), inl: el.style.transform, m: cs.transform, rolling: el.classList.contains("idle-hover--rolling"),
      cubeInl: cube.style.transform, nA: document.getAnimations().length,
      rollWaapi: document.getAnimations().filter(a => a.effect && a.effect.target === el).length });
    requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
});
const cdp = await ctx.newCDPSession(p);
const frames = [];
cdp.on("Page.screencastFrame", async (f) => {
  frames.push({ ts: f.metadata.timestamp, data: f.data });
  try { await cdp.send("Page.screencastFrameAck", { sessionId: f.sessionId }); } catch {}
});
const tap2 = async () => {
  await p.mouse.move(cx, cy);
  await p.mouse.down(); await p.mouse.up();
  await p.waitForTimeout(90);
  await p.mouse.down(); await p.mouse.up();
};
const marks = [];
const mark = async (label) => marks.push({ label, t: await p.evaluate(() => performance.now()), wall: Date.now() / 1000 });
await cdp.send("Page.startScreencast", { format: "jpeg", quality: 92, everyNthFrame: 1 });
await p.waitForTimeout(400);
await mark("tap1"); await tap2();
await p.waitForTimeout(1700);
await mark("tap2"); await tap2();
await p.waitForTimeout(1700);
await mark("tap3"); await tap2();
await p.waitForTimeout(1700);
await cdp.send("Page.stopScreencast");
// transport test: pause the scene transport, then roll; then pause mid-roll
await mark("transportPause"); await p.getByRole("button", { name: /^Pause/ }).first().click().catch(e => marks.push({ label: "pauseClickFail " + e.message.slice(0, 80) }));
await p.waitForTimeout(400);
await mark("tap4-transportPaused"); await tap2();
await p.waitForTimeout(350);
await mark("midroll-clickPlay"); await p.getByRole("button", { name: /^Play/ }).first().click().catch(e => marks.push({ label: "playClickFail " + e.message.slice(0, 80) }));
await p.waitForTimeout(1500);
// spam: a double-tap mid-roll must be ignored
await mark("tap5"); await tap2(); await p.waitForTimeout(300); await mark("tap6-midroll"); await tap2();
await p.waitForTimeout(1500);
await p.evaluate(() => { window.__on = false; });
const trace = await p.evaluate(() => window.__trace);
await p.screenshot({ path: "final-rest.png" });
// write frames
frames.forEach((f, i) => fs.writeFileSync(`frames/f${String(i).padStart(4, "0")}.jpg`, Buffer.from(f.data, "base64")));
fs.writeFileSync("frames.json", JSON.stringify(frames.map((f, i) => ({ i, ts: f.ts }))));
fs.writeFileSync("trace.json", JSON.stringify({ khead, kdirty, gpu, box, cx, cy, marks, consoleMsgs, trace }));
console.log(JSON.stringify({ khead, kdirty, gpu, cx, cy, nFrames: frames.length, nTrace: trace.length, marks, consoleMsgs: consoleMsgs.slice(0, 10) }, null, 1));
await b.close();
