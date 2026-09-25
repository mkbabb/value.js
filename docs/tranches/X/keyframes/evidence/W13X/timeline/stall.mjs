// SERVED MODEL: claude-opus-5-5 — KF.W13X.timeline · KFA-122 (collapse stall) / KFA-193 (expand jump): rAF frame gaps across Expand and Collapse at 1440 (/cube).
// TAG=<before|after> RUN=<n> node stall.mjs
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const BASE = process.env.BASE || "http://localhost:5251"; const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await chromium.launch({ headless: false, args: ["--use-angle=metal", "--enable-gpu"] });
const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
await p.goto(`${BASE}/#/cube`); await sleep(3500);
const bt = p.locator('[data-dock-tether=top] .glass-dock.collapsed [aria-label="Expand dock"]').first(); if (await bt.count()) { await bt.click().catch(() => {}); await sleep(700); }
await p.locator('[data-dock-tether=top] [data-dock-surface-item][aria-label="Timeline"]').first().click({ force: true }); await sleep(1500);
const arm = () => p.evaluate(() => { window.__f = []; const t0 = performance.now(); const tick = (t) => { window.__f.push(t - t0); if (t - t0 < 900) requestAnimationFrame(tick); }; requestAnimationFrame(tick); });
const read = () => p.evaluate(() => { const f = window.__f; let max = 0; for (let i = 1; i < f.length; i++) max = Math.max(max, f[i] - f[i - 1]); return { frames: f.length, maxGapMs: Math.round(max) }; });
const out = {};
for (const [k, label] of [["expand", "Expand timeline"], ["collapse", "Collapse timeline"]]) {
  await arm(); await p.locator(`[aria-label="${label}"]`).filter({ visible: true }).first().click({ force: true }); await sleep(1000); out[k] = await read(); await sleep(600);
}
console.log(JSON.stringify(out)); await b.close();
