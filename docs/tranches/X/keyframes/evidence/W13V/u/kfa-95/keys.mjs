// SERVED MODEL: claude-opus-5-5
// KFA-95 · is a focused widget's Arrow/Home handled twice (widget + global transport shortcut)?
// Leg A (square): focus the drag box, press Home — does the transport playhead move?  Leg B (ribbon, cube):
// focus the scrub thumb, press ArrowRight x2, 20 trials — the per-press delta distribution (1 step = max/100).
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
const tag = process.argv[2] || "run"; const OUT = new URL(`./${tag}/`, import.meta.url).pathname; fs.mkdirSync(OUT, { recursive: true });
const b = await chromium.launch({ headless: false });
const res = {};
const scrubNow = (p) => p.evaluate(() => { const t = [...document.querySelectorAll('[role=slider][aria-label*="crub"]')].find((x) => x.offsetParent); return t ? +t.getAttribute("aria-valuenow") : null; });
{ const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage();
  await p.goto("http://localhost:5173/#/square"); await p.waitForTimeout(4000);
  // pause the transport so any scrub is visible as a playhead change
  await p.keyboard.press("Escape"); await p.waitForTimeout(400);
  const box = await p.$('[aria-keyshortcuts*="Home"], .demo-box [tabindex="0"], [role=application], [role=slider]:not([aria-label*="crub"])');
  const legA = [];
  if (box) { await box.focus(); for (const k of ["End", "Home", "End", "Home"]) { const before = await scrubNow(p); await p.keyboard.press(k); await p.waitForTimeout(250); legA.push({ k, before, after: await scrubNow(p), active: await p.evaluate(() => document.activeElement?.getAttribute("aria-label") || document.activeElement?.className?.toString().slice(0, 40)) }); } }
  await p.screenshot({ path: OUT + "square-after-home.png" });
  res.square = { found: !!box, legA }; await ctx.close(); }
{ const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage();
  await p.goto("http://localhost:5173/#/cube"); await p.waitForTimeout(4000);
  await p.keyboard.press("Escape"); await p.waitForTimeout(400);
  const th = await p.$('[role=slider][aria-label*="crub"]'); await th.focus();
  const max = +(await th.getAttribute("aria-valuemax")); const deltas = [];
  for (let i = 0; i < 20; i++) { const a = await scrubNow(p); await p.keyboard.press("ArrowRight"); await p.waitForTimeout(120); const c = await scrubNow(p); deltas.push(+((c - a) / (max / 100)).toFixed(2)); if (c >= max - max / 50) { await p.keyboard.press("Home"); await p.waitForTimeout(150); } }
  res.ribbon = { max, stepsPerPress: deltas }; await ctx.close(); }
fs.writeFileSync(OUT + "keys.json", JSON.stringify(res, null, 1)); console.log(JSON.stringify(res));
await b.close();
