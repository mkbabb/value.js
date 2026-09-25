// SERVED MODEL: claude-opus-5-5 — KF.W13X.x · why "Edit easing curve" is not clickable at 1024x768 (views.mjs v4 ERR x both themes). READ-ONLY.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const BASE = process.env.BASE || "http://localhost:5194"; const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await chromium.launch({ headless: false, args: ["--use-angle=metal", "--enable-gpu"] });
for (const [w, h] of [[1024, 768], [1440, 900]]) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 2 }); const p = await ctx.newPage();
  await p.goto(`${BASE}/#/cube`); await sleep(3200);
  const bt = p.locator('[data-dock-tether=top] .glass-dock.collapsed [aria-label="Expand dock"]').first(); if (await bt.count()) { await bt.click().catch(() => {}); await sleep(800); }
  await p.locator('[data-dock-tether=top] [data-dock-surface-item][aria-label="Controls"]').first().click({ force: true }); await sleep(1400);
  const r = await p.evaluate(() => [...document.querySelectorAll('[aria-label="Edit easing curve"]')].map((e) => { const q = e.getBoundingClientRect(); const cx = q.left + q.width / 2, cy = q.top + q.height / 2; const hit = document.elementFromPoint(cx, cy); const inert = !!e.closest("[inert]"); const cs = getComputedStyle(e);
    return { box: [Math.round(q.left), Math.round(q.top), Math.round(q.width), Math.round(q.height)], inert, vis: cs.visibility, op: cs.opacity, disabled: e.disabled, hitSelf: hit === e || e.contains(hit), hit: hit ? hit.tagName + "." + String(hit.className).slice(0, 60) : null }; }));
  console.log(w + "x" + h, JSON.stringify(r));
  await p.screenshot({ path: new URL(`frames/v4-probe-${w}x${h}.jpg`, import.meta.url).pathname, type: "jpeg", quality: 65 });
  await ctx.close();
}
await b.close();
