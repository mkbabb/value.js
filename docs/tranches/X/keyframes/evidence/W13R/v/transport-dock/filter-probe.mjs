// SERVED MODEL: claude-opus-5-5
// KF.W13R.v — KFA-53 (transport half) + KFA-189: per-rAF filter/backdrop-filter of the bottom dock and its layers across hover expand/collapse ×2; collapsed-face Play box.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
const base = process.argv[2] ?? "http://localhost:5173"; const label = process.argv[3] ?? "dev";
const b = await chromium.launch({ headless: false }); const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.mouse.move(1300, 200); await p.goto(`${base}/#/cube`, { waitUntil: "load" }); await p.waitForTimeout(6000);
await p.evaluate(() => { const d = document.querySelector('[data-dock-tether="bottom"] .glass-dock'); window.__f = [];
  const f = () => { const els = [d, ...d.querySelectorAll(".dock-plate, .dock-layers, .dock-layer, .dock-layer button, .dock-layer .dock-label")];
    const bl = els.map((e) => { const s = getComputedStyle(e); return (/blur\((?!0px)/.test(s.filter) ? "F:" + s.filter : "") + (s.backdropFilter !== "none" && /blur\((?!0)/.test(s.backdropFilter) && !e.classList.contains("dock-plate") ? "B:" + s.backdropFilter : ""); }).filter(Boolean);
    window.__f.push({ t: performance.now(), morph: d.hasAttribute("data-morphing"), cls: d.classList.contains("expanded") ? "E" : "C", blur: bl }); requestAnimationFrame(f); }; requestAnimationFrame(f); });
const sp = await p.evaluate(() => { const s = document.querySelector('[data-dock-tether="bottom"] .dock-layer--summary button'); const r = s?.getBoundingClientRect(); return r ? { w: r.width, h: r.height, x: r.x } : null; });
const box = await p.locator('[data-dock-tether="bottom"] .glass-dock').boundingBox();
for (let c = 0; c < 2; c++) { await p.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 4 }); await p.waitForTimeout(2200); await p.mouse.move(1300, 200, { steps: 4 }); await p.waitForTimeout(4200); }
const log = await p.evaluate(() => window.__f); await b.close();
const blurred = log.filter((e) => e.blur.length); const settledBlur = log.filter((e, i) => e.blur.length && !e.morph);
const out = { label, frames: log.length, morphFrames: log.filter((e) => e.morph).length, framesWithBlur: blurred.length, settledFramesWithBlur: settledBlur.length, sampleBlur: blurred.slice(0, 3), collapsedSummaryPlay: sp };
fs.writeFileSync(new URL(`./filter-probe-${label}.json`, import.meta.url).pathname, JSON.stringify(out, null, 1)); console.log(JSON.stringify(out).slice(0, 800));
