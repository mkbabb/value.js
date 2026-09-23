// home-animated-text — real-time cross-check (method 3: CDP screencast, everyNthFrame 1) + repeated rAF / long-task sampling.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
import { execSync } from "node:child_process";
const OUT = new URL(".", import.meta.url).pathname;
const KF = "/Users/mkbabb/Programming/keyframes.js";
const head = execSync(`git -C ${KF} rev-parse --short HEAD`).toString().trim();
const dirty = execSync(`git -C ${KF} status --porcelain | wc -l`).toString().trim();
const browser = await chromium.launch({ headless: false });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await page.addInitScript(() => { window.__lt = []; try { new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__lt.push([Math.round(e.startTime), Math.round(e.duration)]); }).observe({ type: "longtask", buffered: true }); } catch {} });
await page.goto("http://localhost:5173/", { waitUntil: "networkidle" });
await page.waitForSelector("h1 .wave-char");
await page.waitForTimeout(2000);
const box = await page.locator("h1.hero-display").boundingBox();
const cdp = await page.context().newCDPSession(page);
const frames = [];
cdp.on("Page.screencastFrame", async (f) => { frames.push({ ts: f.metadata.timestamp, data: f.data }); await cdp.send("Page.screencastFrameAck", { sessionId: f.sessionId }).catch(() => {}); });
await cdp.send("Page.startScreencast", { format: "png", everyNthFrame: 1, maxWidth: 1440, maxHeight: 900 });
const raf = [];
for (let k = 0; k < 3; k++) {
  raf.push(await page.evaluate(async () => { const d = []; let last = performance.now(); const t0 = last; await new Promise((r) => { function f(t) { d.push(t - last); last = t; if (t - t0 < 3000) requestAnimationFrame(f); else r(); } requestAnimationFrame(f); }); const x = d.slice(1); return { at: Math.round(t0), frames: x.length, dropped: x.filter((v) => v > 20).length, max: +Math.max(...x).toFixed(1), big: x.map((v, i) => [i, +v.toFixed(0)]).filter(([, v]) => v > 20) }; }));
}
await cdp.send("Page.stopScreencast");
const lt = await page.evaluate(() => window.__lt);
// keep frames with timestamps; crop is done later by sheet script
const t0 = frames[0]?.ts ?? 0;
const idx = frames.map((f, i) => { const p = `${OUT}screencast/s${String(i).padStart(4, "0")}.png`; fs.writeFileSync(p, Buffer.from(f.data, "base64")); return { i, t: +((f.ts - t0) * 1000).toFixed(1) }; });
fs.writeFileSync(OUT + "screencast.json", JSON.stringify({ head, dirty, box, n: frames.length, raf, longtasks: lt, idx }, null, 1));
await browser.close();
console.log(JSON.stringify({ head, dirty, n: frames.length, raf: raf.map((r) => [r.at, r.frames, r.dropped, r.max, JSON.stringify(r.big)]), lt: lt.slice(-10) }));
