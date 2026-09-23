// amiga-sphere-spin-gesture — headed Chromium, real GPU, served page. Method (3): CDP screencast
// (everyNthFrame 1) of real-time gesture playback + an in-page rAF logger of __kfAmigaProbe.
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

async function startLog() {
  await page.evaluate(() => {
    window.__log = []; window.__logOn = true;
    const f = (t) => { if (!window.__logOn) return; const p = window.__kfAmigaProbe; window.__log.push({ t, ...p.pose(), w: p.omega() }); requestAnimationFrame(f); };
    requestAnimationFrame(f);
  });
}
async function stopLog() { return page.evaluate(() => { window.__logOn = false; return window.__log; }); }

async function phase(name, fn) {
  const dir = OUT + name + "/"; fs.mkdirSync(dir, { recursive: true });
  const frames = [];
  const handler = async (ev) => {
    const i = frames.length; frames.push({ i, ts: ev.metadata.timestamp });
    fs.writeFileSync(dir + `f${String(i).padStart(4, "0")}.jpg`, Buffer.from(ev.data, "base64"));
    try { await cdp.send("Page.screencastFrameAck", { sessionId: ev.sessionId }); } catch {}
  };
  cdp.on("Page.screencastFrame", handler);
  await startLog();
  await cdp.send("Page.startScreencast", { format: "jpeg", quality: 92, everyNthFrame: 1 });
  const marks = [];
  const mark = async (m) => marks.push({ m, t: await page.evaluate(() => performance.now()), wall: Date.now() / 1000 });
  await fn(mark);
  await cdp.send("Page.stopScreencast");
  cdp.off("Page.screencastFrame", handler);
  const log = await stopLog();
  fs.writeFileSync(dir + "frames.json", JSON.stringify(frames));
  fs.writeFileSync(dir + "probe.json", JSON.stringify({ marks, log }));
  const dts = log.slice(1).map((e, k) => e.t - log[k].t);
  console.log(name, "frames", frames.length, "rafs", log.length, "drops>20ms", dts.filter((d) => d > 20).length, "maxdt", Math.max(...dts).toFixed(1));
}
const wait = (ms) => page.waitForTimeout(ms);

// P1 — horizontal flick on the ball, release while moving → decay coast.
await phase("p1-flick-x", async (mark) => {
  await wait(300);
  await page.mouse.move(CX, CY); await page.mouse.down(); await mark("down");
  for (let k = 1; k <= 10; k++) { await page.mouse.move(CX + k * 12, CY); await wait(16); }
  await page.mouse.up(); await mark("up");
  await wait(5000); await mark("end");
});
// P2 — Home, then slow vertical drag of 157 px (≈π/2 pitch), still, release; then slow horizontal drag 120 px.
await phase("p2-pitch-then-yaw", async (mark) => {
  await page.focus("canvas.amiga-canvas"); await page.keyboard.press("Home"); await wait(300);
  await page.mouse.move(CX, CY); await page.mouse.down(); await mark("down1");
  for (let k = 1; k <= 30; k++) { await page.mouse.move(CX, CY + Math.round(k * 157 / 30)); await wait(33); }
  await wait(250); await page.mouse.up(); await mark("up1"); await wait(500);
  await page.mouse.move(CX, CY); await page.mouse.down(); await mark("down2");
  for (let k = 1; k <= 30; k++) { await page.mouse.move(CX + k * 4, CY); await wait(33); }
  await wait(250); await page.mouse.up(); await mark("up2"); await wait(600);
});
// P3 — keyboard: Home, ArrowRight ×4, ArrowDown ×2, Shift+ArrowLeft ×2, Home.
await phase("p3-keys", async (mark) => {
  await page.focus("canvas.amiga-canvas"); await page.keyboard.press("Home"); await wait(400);
  for (const k of ["ArrowRight", "ArrowRight", "ArrowRight", "ArrowRight", "ArrowDown", "ArrowDown", "Shift+ArrowLeft", "Shift+ArrowLeft", "Home"]) {
    await page.keyboard.press(k); await mark(k); await wait(350);
  }
});
// P4 — transport: Play (group bounces+spins), flick the ball mid-play, then Pause mid-glide.
await phase("p4-transport", async (mark) => {
  await page.focus("canvas.amiga-canvas"); await page.keyboard.press("Home");
  await page.getByRole("button", { name: /^Play/ }).first().click(); await mark("play"); await wait(1200);
  const hit = await page.evaluate(() => window.__kfAmigaProbe.pose());
  await mark("pose@" + JSON.stringify(hit));
  // chase the ball: estimate from the probe (world units → approx px via the rest calibration below)
  await page.mouse.move(CX, CY); await page.mouse.down(); await mark("down");
  for (let k = 1; k <= 10; k++) { await page.mouse.move(CX - k * 12, CY); await wait(16); }
  await page.mouse.up(); await mark("up"); await wait(800);
  const pause = page.getByRole("button", { name: /^Pause/ }).first();
  if (await pause.count()) { await pause.click(); await mark("pause"); } else await mark("no-pause-button");
  await wait(3000); await mark("end");
});
await page.screenshot({ path: OUT + "99-end.png" });
await browser.close();
