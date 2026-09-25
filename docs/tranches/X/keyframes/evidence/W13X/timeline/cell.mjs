// SERVED MODEL: claude-opus-5-5 — KF.W13X.timeline · the expanded Timeline cell: KFA-56/UIA-KF-019 (timelines mounted in the cell) · UIA-KF-085 (which element is the surface).
// TAG=<before|after> RUN=<n> node cell.mjs
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const TAG = process.env.TAG || "before"; const RUN = process.env.RUN || "1"; const BASE = process.env.BASE || "http://localhost:5251";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await chromium.launch({ headless: false });
for (const [w, h] of [[1440, 900], [844, 390], [390, 844]]) {
const touch = w < 1024; const p = await (await b.newContext({ viewport: { width: w, height: h }, isMobile: touch, hasTouch: touch, reducedMotion: "reduce" })).newPage();
await p.goto(`${BASE}/#/cube`); await sleep(3500);
const bt = p.locator('[data-dock-tether=top] .glass-dock.collapsed [aria-label="Expand dock"]').first(); if (await bt.count()) { await bt.click().catch(() => {}); await sleep(700); }
await p.locator('[data-dock-tether=top] [data-dock-surface-item][aria-label="Timeline"]').first().click({ force: true }); await sleep(1200);
await p.locator('[aria-label="Expand timeline"]').filter({ visible: true }).first().click({ force: true }).catch(() => {}); await sleep(1500);
console.log(w + "x" + h, await p.evaluate(() => { const c = document.getElementById("timeline-expanded-target"); const s = getComputedStyle(c); const r = c.getBoundingClientRect(); const card = c.querySelector(".cartoon-surface"); const cr = card?.getBoundingClientRect();
 return JSON.stringify({ cell: [Math.round(r.left), Math.round(r.top), Math.round(r.right), Math.round(r.bottom)], radius: s.borderTopLeftRadius, bg: s.backgroundColor.slice(0, 40), blur: s.backdropFilter, border: s.borderTopWidth + " " + s.borderLeftWidth, card: cr ? [Math.round(cr.left), Math.round(cr.top), Math.round(cr.right), Math.round(cr.bottom)] : null, cardBg: card ? getComputedStyle(card).backgroundColor.slice(0, 40) : null, children: c.children.length, overflowH: c.scrollHeight - c.clientHeight }); }));
await p.screenshot({ path: new URL(`frames/cell-${TAG}-r${RUN}-${w}x${h}.jpg`, import.meta.url).pathname, type: "jpeg", quality: 70 }); await p.context().close(); }
await b.close();
