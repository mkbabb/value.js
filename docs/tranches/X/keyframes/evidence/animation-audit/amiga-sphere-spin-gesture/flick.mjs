// Fast flick via raw CDP Input (no Playwright round-trip latency), rAF probe log; pass 2 adds screencast.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const browser = await chromium.launch({ headless: false });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
await page.goto("http://localhost:5173/#/amiga");
await page.waitForTimeout(3500);
const cdp = await ctx.newCDPSession(page);
const r = await page.evaluate(() => { const b = document.querySelector("canvas.amiga-canvas").getBoundingClientRect(); return { x: b.x, y: b.y, w: b.width, h: b.height }; });
const CX = Math.round(r.x + r.w / 2), CY = Math.round(r.y + r.h / 2);
const mouse = (type, x, y) => cdp.send("Input.dispatchMouseEvent", { type, x, y, button: "left", buttons: type === "mouseReleased" ? 0 : 1, clickCount: 1, pointerType: "mouse" });
const sleep = (ms) => new Promise((res) => setTimeout(res, ms));
async function flick(dx, dy, n = 8, stepMs = 16) {
  await mouse("mouseMoved", CX, CY); await mouse("mousePressed", CX, CY);
  for (let k = 1; k <= n; k++) { await sleep(stepMs); await mouse("mouseMoved", CX + dx * k, CY + dy * k); }
  await mouse("mouseReleased", CX + dx * n, CY + dy * n);
}
async function run(name, withCast, dx, dy) {
  const dir = OUT + name + "/"; fs.mkdirSync(dir, { recursive: true });
  const frames = [];
  const h = async (ev) => { const i = frames.length; frames.push({ i, ts: ev.metadata.timestamp }); fs.writeFileSync(dir + `f${String(i).padStart(4, "0")}.jpg`, Buffer.from(ev.data, "base64")); try { await cdp.send("Page.screencastFrameAck", { sessionId: ev.sessionId }); } catch {} };
  await page.evaluate(() => { window.__log = []; window.__logOn = true; const f = (t) => { if (!window.__logOn) return; const p = window.__kfAmigaProbe; window.__log.push({ t, ...p.pose(), w: p.omega() }); requestAnimationFrame(f); }; requestAnimationFrame(f); });
  if (withCast) { cdp.on("Page.screencastFrame", h); await cdp.send("Page.startScreencast", { format: "jpeg", quality: 92, everyNthFrame: 1 }); }
  await sleep(600);
  const tDown = await page.evaluate(() => performance.now());
  await flick(dx, dy);
  const tUp = await page.evaluate(() => performance.now());
  await sleep(5500);
  if (withCast) { await cdp.send("Page.stopScreencast"); cdp.off("Page.screencastFrame", h); }
  const log = await page.evaluate(() => { window.__logOn = false; return window.__log; });
  fs.writeFileSync(dir + "probe.json", JSON.stringify({ tDown, tUp, log })); fs.writeFileSync(dir + "frames.json", JSON.stringify(frames));
  const dts = log.slice(1).map((e, k) => e.t - log[k].t);
  const atUp = log.filter((e) => e.t <= tUp).at(-1), last = log.at(-1);
  const settle = log.find((e) => e.t > tUp && e.w === 0);
  console.log(name, "frames", frames.length, "drops>20", dts.filter((d) => d > 20).length, "maxdt", Math.max(...dts).toFixed(0),
    "| drag", (tUp - tDown).toFixed(0), "ms · oy@up", atUp?.oy.toFixed(3), "ox@up", atUp?.ox.toFixed(3), "w@up", atUp?.w.toFixed(2),
    "→ final oy", last.oy.toFixed(3), "ox", last.ox.toFixed(3), "coast", (last.oy - atUp.oy).toFixed(3), (last.ox - atUp.ox).toFixed(3), "settle@", settle ? (settle.t - tUp).toFixed(0) : "never");
}
await run("flick-a", false, 12, 0);
await run("flick-b", false, 12, 0);
await run("flick-diag", false, 9, 9);
await run("p1b-flick-cast", true, 12, 0);
await browser.close();
