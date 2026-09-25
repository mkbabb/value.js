// SERVED MODEL: claude-opus-5-5 — KF.W13X.x · settle check for the expanded timeline at 1024x768 and 768x1024 (is the pane off-screen after 1.1 s AND after 4 s?). READ-ONLY.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const BASE = process.env.BASE || "http://localhost:5194"; const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await chromium.launch({ headless: false, args: ["--use-angle=metal", "--enable-gpu"] });
for (const [w, h] of [[1024, 768], [768, 1024], [1440, 900]]) {
  const touch = w < 1024; const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 2, isMobile: touch, hasTouch: touch }); const p = await ctx.newPage();
  await p.goto(`${BASE}/#/cube`); await sleep(3200);
  const bt = p.locator('[data-dock-tether=top] .glass-dock.collapsed [aria-label="Expand dock"]').first(); if (await bt.count()) { await bt.click().catch(() => {}); await sleep(800); }
  await p.locator('[data-dock-tether=top] [data-dock-surface-item][aria-label="Timeline"]').first().click({ force: true }); await sleep(1300);
  const rects = () => p.evaluate(() => [...document.querySelectorAll('[aria-label="Expand timeline"],[aria-label="Collapse timeline"]')].map((e) => { const c = e.closest(".cartoon-surface") || e; const q = c.getBoundingClientRect(); return { l: e.getAttribute("aria-label"), card: [Math.round(q.left), Math.round(q.top), Math.round(q.right), Math.round(q.bottom)], vis: q.width > 0 }; }));
  console.log(w + "x" + h, "before", JSON.stringify(await rects()));
  await p.locator('[aria-label="Expand timeline"]:visible').first().click(); await sleep(1100); console.log("  +1.1s", JSON.stringify(await rects()));
  await sleep(3000); console.log("  +4.1s", JSON.stringify(await rects()));
  await p.screenshot({ path: new URL(`frames/v1-settle-${w}x${h}.jpg`, import.meta.url).pathname, type: "jpeg", quality: 65 });
  await ctx.close();
}
await b.close();
