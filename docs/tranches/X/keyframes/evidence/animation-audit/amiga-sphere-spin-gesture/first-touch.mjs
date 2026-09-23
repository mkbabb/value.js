// Is the P1 stall (rAF dt 167–200 ms around the first pointerdown) the scene or the harness?
// Fresh page each: (a) Playwright mouse, no screencast; (b) Playwright mouse + screencast; (c) raw CDP + screencast.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const browser = await chromium.launch({ headless: false });
for (const mode of ["pw-nocast", "pw-cast", "cdp-cast"]) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage(); await page.goto("http://localhost:5173/#/amiga"); await page.waitForTimeout(3500);
  const cdp = await ctx.newCDPSession(page);
  await page.evaluate(() => { window.__d = []; let last = 0; const f = (t) => { if (last) window.__d.push([t, t - last]); last = t; if (window.__d.length < 400) requestAnimationFrame(f); }; requestAnimationFrame(f); });
  if (mode.endsWith("cast")) { cdp.on("Page.screencastFrame", (ev) => cdp.send("Page.screencastFrameAck", { sessionId: ev.sessionId }).catch(() => {})); await cdp.send("Page.startScreencast", { format: "jpeg", quality: 92, everyNthFrame: 1 }); }
  await page.waitForTimeout(1500);
  const t0 = await page.evaluate(() => performance.now());
  if (mode.startsWith("pw")) { await page.mouse.move(957, 450); await page.mouse.down(); for (let k = 1; k <= 10; k++) await page.mouse.move(957 + 12 * k, 450); await page.mouse.up(); }
  else { const m = (type, x) => cdp.send("Input.dispatchMouseEvent", { type, x, y: 450, button: "left", buttons: type === "mouseReleased" ? 0 : 1, clickCount: 1 }); await m("mouseMoved", 957); await m("mousePressed", 957); for (let k = 1; k <= 10; k++) await m("mouseMoved", 957 + 12 * k); await m("mouseReleased", 1077); }
  const t1 = await page.evaluate(() => performance.now());
  await page.waitForTimeout(1500);
  const d = await page.evaluate(() => window.__d);
  const pre = d.filter(([t, dt]) => t < t0 && dt > 20).map(([t, dt]) => `${(t - t0).toFixed(0)}:${dt.toFixed(0)}`);
  const during = d.filter(([t, dt]) => t >= t0 && dt > 20).map(([t, dt]) => `${(t - t0).toFixed(0)}:${dt.toFixed(0)}`);
  console.log(mode, "gesture ms", (t1 - t0).toFixed(0), "| drops before gesture", pre.join(" ") || "none", "| drops during/after", during.join(" ") || "none");
  await ctx.close();
}
await browser.close();
