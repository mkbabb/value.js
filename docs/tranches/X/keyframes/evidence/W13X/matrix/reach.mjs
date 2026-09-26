// SERVED MODEL: claude-opus-5-5 — X.KF.W13X.matrix · A2-KE-X-7: every cell of the Matrix Controls facet can be brought FULLY into view
// inside its pane (scrolled into view one by one, checked against the viewport, every clipping ancestor, and a centre hit-test), phone/tablet widths.
// Usage: BASE=http://localhost:5196 THEMES=light,dark node reach.mjs
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const BASE = process.env.BASE || "http://localhost:5196";
const VPS = (process.env.VPS || "360x780,390x844,430x932,844x390,768x1024,1024x768").split(",");
const THEMES = (process.env.THEMES || "light,dark").split(",");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await chromium.launch({ headless: false });
for (const theme of THEMES) for (const vpS of VPS) {
  const [w, h] = vpS.split("x").map(Number); const touch = w < 1024;
  const ctx = await b.newContext({ viewport: { width: w, height: h }, isMobile: touch, hasTouch: touch, colorScheme: theme });
  const p = await ctx.newPage();
  await p.goto(`${BASE}/#/cube`); await p.waitForSelector(".cube-pose"); await sleep(3000);
  await p.locator('[aria-label="Select animation"]:visible').first().click(); await sleep(700);
  await p.getByRole("option", { name: /^Matrix/ }).first().click(); await sleep(1200);
  const ex = p.locator('[data-dock-tether=top] .glass-dock.collapsed [aria-label="Expand dock"]').first(); if (await ex.count()) { await ex.click({ timeout: 3000 }).catch(() => {}); await sleep(800); }
  await p.evaluate(() => [...document.querySelectorAll('[data-dock-surface-item][aria-label="Matrix Controls"]')].find((e) => e.getBoundingClientRect().width > 0)?.click()); await sleep(1800);
  const res = await p.evaluate(async () => {
    const grid = [...document.querySelectorAll(".matrix-grid")].find((x) => x.getBoundingClientRect().width > 0); let ok = 0, minSide = 1e9;
    for (const c of grid.children) {
      const i = c.querySelector("input"); i.scrollIntoView({ block: "nearest", behavior: "instant" }); await new Promise((r) => setTimeout(r, 120));
      const r = i.getBoundingClientRect(); minSide = Math.min(minSide, r.width, r.height); let vis = r.top >= -1 && r.bottom <= innerHeight + 1 && r.left >= -1 && r.right <= innerWidth + 1;
      // and TAPPABLE: the field's own centre hit-tests to it (not the floating transport, the sheet chrome or a scrim)
      const hit = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2); if (!(hit && (hit === i || i.contains(hit)))) vis = false;
      for (let a = i.parentElement; a && vis; a = a.parentElement) { const s = getComputedStyle(a); if (/(auto|scroll|hidden|clip)/.test(s.overflowY + s.overflowX)) { const q = a.getBoundingClientRect(); if (r.top < q.top - 0.5 || r.bottom > q.bottom + 0.5) vis = false; } }
      if (vis) ok++;
    }
    return { reachable: ok, of: grid.children.length, minSide: Math.round(minSide) };
  });
  console.log(`${vpS} ${theme} reachable=${res.reachable}/${res.of} minFieldSide=${res.minSide}`);
  await ctx.close();
}
await b.close();
