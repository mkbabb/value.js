// home-animated-text — (a) CPU profile of the post-load long tasks; (b) compositor test: block the main thread 900ms
// mid-sweep while screencasting — does the wave keep moving (composited) or freeze (main-thread animated)?
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
import { execSync } from "node:child_process";
const OUT = new URL(".", import.meta.url).pathname;
const KF = "/Users/mkbabb/Programming/keyframes.js";
const head = execSync(`git -C ${KF} rev-parse --short HEAD`).toString().trim();
const dirty = execSync(`git -C ${KF} status --porcelain | wc -l`).toString().trim();
const browser = await chromium.launch({ headless: false });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const cdp = await page.context().newCDPSession(page);
await page.addInitScript(() => { window.__lt = []; try { new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__lt.push([Math.round(e.startTime), Math.round(e.duration)]); }).observe({ type: "longtask", buffered: true }); } catch {} });
await cdp.send("Profiler.enable"); await cdp.send("Profiler.setSamplingInterval", { interval: 1000 }); await cdp.send("Profiler.start");
await page.goto("http://localhost:5173/", { waitUntil: "networkidle" });
await page.waitForSelector("h1 .wave-char");
await page.waitForTimeout(12000);
const { profile } = await cdp.send("Profiler.stop");
const lt = await page.evaluate(() => window.__lt);
// self time per function+url
const byId = new Map(profile.nodes.map((n) => [n.id, n])); const self = new Map();
const dts = profile.timeDeltas; profile.samples.forEach((id, i) => { const n = byId.get(id); const k = `${n.callFrame.functionName || "(anon)"} ${n.callFrame.url.split("/").slice(-2).join("/")}:${n.callFrame.lineNumber}`; self.set(k, (self.get(k) || 0) + (dts[i] || 0) / 1000); });
const top = [...self.entries()].sort((a, b) => b[1] - a[1]).slice(0, 15).map(([k, v]) => `${v.toFixed(0)}ms ${k}`);
// (b) compositor test
const box = await page.locator("h1.hero-display").boundingBox();
const frames = [];
cdp.on("Page.screencastFrame", async (f) => { frames.push({ ts: f.metadata.timestamp, data: f.data }); await cdp.send("Page.screencastFrameAck", { sessionId: f.sessionId }).catch(() => {}); });
// align: wait until glyph 0 starts a new cycle, then block 150ms later for 900ms
await page.evaluate(async () => { const a = document.getAnimations().find((x) => x.effect?.target?.classList?.contains("wave-char")); const ct = a.currentTime % 3600; await new Promise((r) => setTimeout(r, (3600 - ct + 3600) % 3600)); });
await cdp.send("Page.startScreencast", { format: "png", everyNthFrame: 1 });
const blk = await page.evaluate(() => new Promise((r) => setTimeout(() => { const t = performance.now(); while (performance.now() - t < 900) {} r(Math.round(t)); }, 150)));
await page.waitForTimeout(1600);
await cdp.send("Page.stopScreencast");
const t0 = frames[0]?.ts ?? 0;
const idx = frames.map((f, i) => { fs.writeFileSync(`${OUT}block/b${String(i).padStart(4, "0")}.png`, Buffer.from(f.data, "base64")); return { i, t: +((f.ts - t0) * 1000).toFixed(1) }; });
fs.writeFileSync(OUT + "block.json", JSON.stringify({ head, dirty, longtasks: lt, top, blockStartPerf: blk, idx }, null, 1));
await browser.close();
console.log(JSON.stringify({ head, dirty, lt, top, n: frames.length, gaps: idx.slice(1).map((x, i) => [x.i, Math.round(x.t - idx[i].t)]).filter(([, g]) => g > 40) }, null, 0));
