// SERVED MODEL: claude-opus-5-5 — KF.W13X.timeline · the Timeline pane's Sequence mode (/#/sequence): the re-homed .sequence rows.
// KFA-159/UIA-KF-213 master thumb at p=0/1 vs the card · KFA-217 thumb vs playhead x · UIA-KF-031 handle under the pointer through a drag
// · UIA-KF-313 focus ring shape · UIA-KF-317 drag state · UIA-KF-099 hand-rolled role=slider count. TAG=<before|after> RUN=<n> node seqpane.mjs
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const BASE = process.env.BASE || "http://localhost:5251"; const TAG = process.env.TAG || "before"; const RUN = process.env.RUN || "1";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await chromium.launch({ headless: false });
for (const [w, h, scheme] of [[1440, 900, "light"], [390, 844, "dark"]]) {
  const touch = w < 1024; const p = await (await b.newContext({ viewport: { width: w, height: h }, isMobile: touch, hasTouch: touch, colorScheme: scheme, reducedMotion: "reduce" })).newPage();
  await p.goto(`${BASE}/#/sequence`); await sleep(3500);
  const bt = p.locator('[data-dock-tether=top] .glass-dock.collapsed [aria-label="Expand dock"]').first(); if (await bt.count()) { await bt.click().catch(() => {}); await sleep(700); }
  const item = p.locator('[data-dock-tether=top] [data-dock-surface-item][aria-label="Timeline"]').first();
  if ((await item.getAttribute("aria-pressed")) !== "true") { await item.click({ force: true }); } await sleep(1300); // pressed by default on /sequence: a click would close it
  const o = {};
  const geo = () => p.evaluate(() => { const lanes = document.querySelector(".seq-lanes"); if (!lanes) return null; const card = lanes.closest(".cartoon-surface").getBoundingClientRect(); const ball = lanes.querySelector(".seq-lane-scrub-ball, [data-seq-thumb]")?.getBoundingClientRect(); const ph = (lanes.querySelector(".seq-lanes-playhead-line") || lanes.querySelector("[data-sequence-playhead]"))?.getBoundingClientRect();
    return { card: [Math.round(card.left), Math.round(card.right)], ball: ball ? [Math.round(ball.left), Math.round(ball.right)] : null, ballCx: ball ? Math.round((ball.left + ball.right) / 2) : null, phX: ph ? Math.round(ph.left + ph.width / 2) : null, sliders: lanes.querySelectorAll('[role=slider]').length, handRolled: [...lanes.querySelectorAll('[role=slider]')].filter((e) => !e.closest('[data-slot=slider], .slider-root, [data-slider-root]')).length }; });
  const scrub = p.locator('[aria-label="Scrub the sequence master clock"]').first();
  await scrub.focus(); await p.keyboard.press("Home"); await sleep(300); o.p0 = await geo();
  await p.keyboard.press("End"); await sleep(300); o.p1 = await geo();
  await p.keyboard.press("Home"); await sleep(200);
  // focus ring shape on a lane handle
  const handle = p.locator('[aria-label^="Re-time row 5"]').first(); await handle.focus(); await sleep(200);
  o.ring = await p.evaluate(() => { const e = document.activeElement; const c = getComputedStyle(e); const r = e.getBoundingClientRect(); const a = getComputedStyle(e, "::after"); return { w: Math.round(r.width), h: Math.round(r.height), hostRadius: c.borderTopLeftRadius, hostRing: c.boxShadow !== "none", gripRing: a.boxShadow !== "none" && /0px 0px 0px/.test(a.boxShadow), gripRadius: a.borderTopLeftRadius }; });
  await p.screenshot({ path: new URL(`frames/seq-${TAG}-r${RUN}-${w}-${scheme}-focus.jpg`, import.meta.url).pathname, type: "jpeg", quality: 70 });
  // drag lane 5's handle right by 120px in 6 steps; after each, the handle's centre vs the pointer
  const hb = await handle.boundingBox(); const y = hb.y + hb.height / 2; let x = hb.x + hb.width / 2; const lags = []; let dragState = null;
  await p.mouse.move(x, y); await p.mouse.down(); await sleep(50);
  for (let i = 0; i < 6; i++) { x += 20; await p.mouse.move(x, y); await sleep(80); const hr = await handle.boundingBox(); lags.push(Math.round(hr.x + hr.width / 2 - x));
    if (i === 2) dragState = await p.evaluate(() => { const e = document.querySelector('[aria-label^="Re-time row 5"]'); return { grabbing: getComputedStyle(e).cursor, dragging: e.hasAttribute("data-dragging"), gripScale: getComputedStyle(e, "::after").transform }; }); }
  await p.screenshot({ path: new URL(`frames/seq-${TAG}-r${RUN}-${w}-${scheme}-drag.jpg`, import.meta.url).pathname, type: "jpeg", quality: 70 });
  await p.mouse.up(); o.lags = lags; o.dragState = dragState;
  console.log(`${w} ${scheme} ${JSON.stringify(o)}`); await p.context().close();
}
await b.close();
