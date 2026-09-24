// SERVED MODEL: claude-opus-5-5
// KFA-95 (u2) · does the page-level transport shortcut ALSO act on a navigation key a focused widget
// already consumed? initScript wraps every window keydown listener to log, per invocation, whether the
// event arrived already defaultPrevented (= a focused widget handled it). Legs: square box End/Home
// (the tour/fill side effect) · cube ribbon thumb ArrowRight x10 (per-press delta in steps of max/100).
// usage: node double.mjs <tag> [baseURL]
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
const tag = process.argv[2] || "run"; const BASE = process.argv[3] || "http://localhost:5173/";
const OUT = new URL(`./${tag}/`, import.meta.url).pathname; fs.mkdirSync(OUT, { recursive: true });
const init = () => { window.__kl = []; const add = EventTarget.prototype.addEventListener;
  EventTarget.prototype.addEventListener = function (t, fn, o) {
    if (this === window && t === "keydown" && typeof fn === "function") { const w = function (e) { const pre = e.defaultPrevented; const a = document.activeElement; window.__kl.push({ key: e.key, pre, role: a?.getAttribute?.("role") || a?.tagName }); return fn.call(this, e); }; return add.call(this, t, w, o); }
    return add.call(this, t, fn, o); }; };
const b = await chromium.launch({ headless: false }); const res = { base: BASE };
const scrub = (p) => p.evaluate(() => { const t = [...document.querySelectorAll('[role=slider][aria-label*="crub"]')].find((x) => x.offsetParent); return t ? { now: +t.getAttribute("aria-valuenow"), max: +t.getAttribute("aria-valuemax") } : null; });
{ const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); await ctx.addInitScript(init); const p = await ctx.newPage();
  await p.goto(BASE + "#/square"); await p.waitForTimeout(4500); await p.keyboard.press("Escape"); await p.waitForTimeout(500);
  const box = await p.$(".demo-box"); await box.focus(); const legA = [];
  for (const k of ["End", "Home"]) { await p.evaluate(() => (window.__kl = [])); const s0 = await scrub(p);
    await p.keyboard.press(k); await p.waitForTimeout(700);
    legA.push({ k, scrubBefore: s0, scrubAfter: await scrub(p), fill: await box.evaluate((e) => e.style.getPropertyValue("--subject-fill") || "(none)"), log: await p.evaluate(() => window.__kl) }); }
  await p.screenshot({ path: OUT + "square-after-home.png" }); res.square = legA; await ctx.close(); }
{ const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); await ctx.addInitScript(init); const p = await ctx.newPage();
  await p.goto(BASE + "#/cube"); await p.waitForTimeout(4500); await p.keyboard.press("Escape"); await p.waitForTimeout(500);
  const th = await p.$('[role=slider][aria-label*="crub"]'); await th.focus(); await p.keyboard.press("Home"); await p.waitForTimeout(500);
  const d = []; let log = [];
  for (let i = 0; i < 10; i++) { await p.evaluate(() => (window.__kl = [])); const a = await scrub(p); await p.keyboard.press("ArrowRight"); await p.waitForTimeout(400); const c = await scrub(p); d.push(+((c.now - a.now) / (c.max / 100)).toFixed(2)); log = log.concat(await p.evaluate(() => window.__kl)); }
  res.ribbon = { stepsPerPress: d, preConsumedDispatches: log.filter((x) => x.pre).length, dispatches: log.length, sample: log.slice(0, 2) }; await ctx.close(); }
fs.writeFileSync(OUT + "double.json", JSON.stringify(res, null, 1)); console.log(JSON.stringify(res).slice(0, 1800));
await b.close();
