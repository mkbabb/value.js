// Repeat the heatmap drag 3x with a longtask observer + rAF gaps + per-write cost.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process"; import fs from "node:fs";
const OUT = new URL(".", import.meta.url).pathname; const KF = "/Users/mkbabb/Programming/keyframes.js";
const b = await chromium.launch({ headless: false });
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await p.goto("http://localhost:5173/#/spring", { waitUntil: "networkidle" }); await p.waitForTimeout(2500);
await p.evaluate(() => { window.__lt = []; new PerformanceObserver(l => l.getEntries().forEach(e => window.__lt.push([+e.startTime.toFixed(0), +e.duration.toFixed(0)]))).observe({ type: "longtask" }); window.__raf = []; const t = (n) => { window.__raf.push(n); requestAnimationFrame(t); }; requestAnimationFrame(t); });
const res = [];
for (let rep = 0; rep < 3; rep++) {
  const s = await p.evaluate(() => performance.now());
  await p.mouse.move(140, 430); await p.mouse.down();
  for (let k = 0; k <= 40; k++) { await p.mouse.move(140 + k * 7.5, 430 - k * 5.5); await p.waitForTimeout(25); }
  await p.mouse.up(); await p.waitForTimeout(400);
  const r = await p.evaluate((s) => { const raf = window.__raf.filter(x => x >= s); const d = raf.slice(1).map((x, i) => x - raf[i]); return { lt: window.__lt.filter(x => x[0] >= s), over20: d.filter(x => x > 20).map(x => +x.toFixed(0)), n: d.length }; }, s);
  res.push(r);
}
// cost of one isolated param write (heatmap click), measured sync
const cost = await p.evaluate(async () => { const out = []; const hm = document.querySelector(".spring-heatmap"); const r = hm.getBoundingClientRect(); for (let i = 0; i < 5; i++) { const x = r.x + 30 + i * 60, y = r.y + 40 + i * 35; const t0 = performance.now(); hm.dispatchEvent(new PointerEvent("pointerdown", { clientX: x, clientY: y, button: 0, isPrimary: true, pointerId: 9, bubbles: true })); hm.dispatchEvent(new PointerEvent("pointerup", { clientX: x, clientY: y, button: 0, isPrimary: true, pointerId: 9, bubbles: true })); await new Promise(r => requestAnimationFrame(() => setTimeout(r, 0))); out.push(+(performance.now() - t0).toFixed(1)); await new Promise(r => setTimeout(r, 300)); } return out; });
const out = { khead: execSync(`git -C ${KF} rev-parse --short HEAD`).toString().trim(), drags: res, isolatedWriteToNextFrameMs: cost, facetMounts: await p.evaluate(() => document.querySelectorAll(".spring-heatmap").length) };
fs.writeFileSync(OUT + "probe-drag-longtask.json", JSON.stringify(out, null, 1)); console.log(JSON.stringify(out));
await b.close();
