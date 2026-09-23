// P4 redo — gesture under the transport: Play → Pause (ball off-home) → drag the ball where it IS
// (red-pixel centroid) → coast while paused; then Play and flick the moving ball (calibrated projection).
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const browser = await chromium.launch({ headless: false });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
await page.goto("http://localhost:5173/#/amiga");
await page.waitForTimeout(3500);
const cdp = await ctx.newCDPSession(page);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const mouse = (type, x, y) => cdp.send("Input.dispatchMouseEvent", { type, x, y, button: "left", buttons: type === "mouseReleased" ? 0 : 1, clickCount: 1, pointerType: "mouse" });
const pose = () => page.evaluate(() => window.__kfAmigaProbe.pose());
// red-pixel centroid of the ball from a clip screenshot of the canvas (the checker's red is the only saturated red).
async function centroid() {
  const buf = await page.screenshot({ clip: { x: 518, y: 127, width: 878, height: 646 } });
  fs.writeFileSync(OUT + "tmp-clip.png", buf);
  const { execSync } = await import("node:child_process");
  const [cx, cy, w] = execSync(`python3 ${OUT}centroid.py ${OUT}tmp-clip.png`).toString().trim().split(" ").map(Number);
  return { x: 518 + cx, y: 127 + cy, w };
}
const log = [];
await page.evaluate(() => { window.__log = []; window.__logOn = true; const f = (t) => { if (!window.__logOn) return; const p = window.__kfAmigaProbe; window.__log.push({ t, ...p.pose(), w: p.omega() }); requestAnimationFrame(f); }; requestAnimationFrame(f); });
const frames = []; const dir = OUT + "p4b-transport/"; fs.mkdirSync(dir, { recursive: true });
cdp.on("Page.screencastFrame", async (ev) => { const i = frames.length; frames.push({ i, ts: ev.metadata.timestamp }); fs.writeFileSync(dir + `f${String(i).padStart(4, "0")}.jpg`, Buffer.from(ev.data, "base64")); try { await cdp.send("Page.screencastFrameAck", { sessionId: ev.sessionId }); } catch {} });
const marks = []; const mark = async (m) => marks.push({ m, t: await page.evaluate(() => performance.now()), wall: Date.now() / 1000 });
await cdp.send("Page.startScreencast", { format: "jpeg", quality: 92, everyNthFrame: 1 });
await page.getByRole("button", { name: /^Play/ }).first().click(); await mark("play"); await sleep(1300);
await page.getByRole("button", { name: /^Pause/ }).first().click(); await mark("pause"); await sleep(400);
const p1 = await pose(); const c1 = await centroid(); await mark("paused pose " + JSON.stringify({ px: +p1.px.toFixed(2), py: +p1.py.toFixed(2), c: c1 }));
// drag the paused, off-home ball: flick left
await mouse("mouseMoved", c1.x, c1.y); await mouse("mousePressed", c1.x, c1.y); await mark("down-paused");
for (let k = 1; k <= 8; k++) { await sleep(16); await mouse("mouseMoved", c1.x - 12 * k, c1.y); }
await mouse("mouseReleased", c1.x - 96, c1.y); await mark("up-paused"); await sleep(3800);
const afterPaused = await pose(); await mark("after-paused " + JSON.stringify(afterPaused));
// Play again, then flick the MOVING ball at its calibrated position.
await page.getByRole("button", { name: /^Play/ }).first().click(); await mark("play2"); await sleep(700);
const scale = c1.w / 2; // px per world unit ≈ projected radius (radius = 1)
const pp = await pose(); const tx = 957 + pp.px * scale, ty = 450 - pp.py * scale;
await mouse("mouseMoved", tx, ty); await mouse("mousePressed", tx, ty); await mark("down-playing " + JSON.stringify({ px: pp.px.toFixed(2), py: pp.py.toFixed(2), tx, ty }));
for (let k = 1; k <= 8; k++) { await sleep(16); await mouse("mouseMoved", tx, ty + 12 * k); }
await mouse("mouseReleased", tx, ty + 96); await mark("up-playing"); await sleep(3500);
await cdp.send("Page.stopScreencast");
const L = await page.evaluate(() => { window.__logOn = false; return window.__log; });
fs.writeFileSync(dir + "probe.json", JSON.stringify({ marks, log: L })); fs.writeFileSync(dir + "frames.json", JSON.stringify(frames));
for (const m of marks) { const pr = L.filter((e) => e.t <= m.t).at(-1) || {}; const fi = frames.findIndex((x) => x.ts >= m.wall); console.log(m.m.slice(0, 160), "→ f" + fi, "ox", pr.ox?.toFixed(3), "oy", pr.oy?.toFixed(3), "playing", pr.playing); }
const last = L.at(-1); console.log("final", JSON.stringify(last));
const dts = L.slice(1).map((e, k) => e.t - L[k].t); console.log("frames", frames.length, "rafs", L.length, "drops>20", dts.filter((d) => d > 20).length, "maxdt", Math.max(...dts).toFixed(0));
L.forEach((e, k) => { if (k && e.t - L[k - 1].t > 20) console.log("  drop at", (L[k - 1].t - L[0].t).toFixed(0), "dt", (e.t - L[k - 1].t).toFixed(0)); });
await browser.close();
