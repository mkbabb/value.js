// Reduced-motion probe: headed, real GPU, prefers-reduced-motion: reduce; double-tap and trace .idle-hover.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, reducedMotion: "reduce" });
const p = await ctx.newPage();
await p.goto("http://localhost:5173/#/cube", { waitUntil: "networkidle" }); await p.waitForTimeout(2000);
const r = await p.evaluate(() => { const e = document.querySelector(".idle-hover").getBoundingClientRect(); return [e.x + e.width / 2, e.y + e.height / 2]; });
await p.evaluate(() => { window.__s = []; const el = document.querySelector(".idle-hover"); const f = (t) => { window.__s.push([+t.toFixed(0), el.style.transform]); if (window.__s.length < 150) requestAnimationFrame(f); }; requestAnimationFrame(f); });
await p.mouse.move(r[0], r[1]); await p.mouse.down(); await p.mouse.up(); await p.waitForTimeout(90); await p.mouse.down(); await p.mouse.up();
await p.waitForTimeout(2000);
const s = await p.evaluate(() => window.__s); const distinct = [...new Set(s.map(x => x[1]))];
console.log(JSON.stringify({ reduced: await p.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches), nDistinct: distinct.length, first: distinct.slice(0, 3), last: distinct.at(-1) }));
await b.close();
