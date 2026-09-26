// SERVED MODEL: claude-opus-5-5 — X.KF.W13X.controls · the rail placeholder + tabpanel names (READ-ONLY falsifier)
// Rows: UIA-KF-061 (rail limb) · UIA-KF-282 · UIA-KF-275 (the tabpanel-name limb).
// Usage: BASE=http://localhost:5236 RUN=before-r1 node rail.mjs
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
const OUT = new URL(".", import.meta.url).pathname; const RUN = process.env.RUN || "run";
const BASE = process.env.BASE || "http://localhost:5236"; const FR = `${OUT}frames/${RUN}/`; fs.mkdirSync(FR, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const rows = []; const b = await chromium.launch({ headless: false });
for (const cfg of ["1440x900-light", "390x844-dark"]) {
  const [vp, theme] = cfg.split("-"); const [w, h] = vp.split("x").map(Number); const touch = w < 1024;
  const ctx = await b.newContext({ viewport: { width: w, height: h }, colorScheme: theme, isMobile: touch, hasTouch: touch }); const p = await ctx.newPage(); const row = { cfg };
  try {
    await p.goto(`${BASE}/#/cube`); await p.evaluate(() => { localStorage.clear(); sessionStorage.clear(); }); await p.reload(); await sleep(3500);
    const names = () => p.evaluate(() => [...document.querySelectorAll("[role=tabpanel]")].filter((t) => t.getBoundingClientRect().width > 0 && !t.classList.contains("inactive")).map((t) => t.getAttribute("aria-label") || (t.getAttribute("aria-labelledby") && document.getElementById(t.getAttribute("aria-labelledby"))?.textContent.trim()) || null));
    row.u275_controlsNames = await names();
    const bt = p.locator('[data-dock-tether=top] .glass-dock.collapsed [aria-label="Expand dock"]').first(); if (await bt.count()) { await bt.click(); await sleep(900); }
    await p.locator('[data-dock-tether=top] [data-dock-surface-item][aria-label="Timeline"]').first().click(); await sleep(1200);
    row.u275_timelineNames = await names();
    const ex = p.locator('[aria-label="Expand timeline"]:visible').first(); await ex.click(); await sleep(1400);
    await p.screenshot({ path: `${FR}rail-expanded-${cfg}.png` });
    Object.assign(row, await p.evaluate(() => { const vis = [...document.querySelectorAll("[role=tabpanel]")].filter((t) => t.getBoundingClientRect().width > 0);
      return { u061_placeholder: vis.some((t) => /expanded below/i.test(t.textContent)), u282_bouncing: [...document.querySelectorAll(".animate-bounce")].filter((e) => e.getBoundingClientRect().width > 0).length }; }));
  } catch (e) { row.error = String(e.message || e).slice(0, 200); }
  rows.push(row); console.log(JSON.stringify(row)); await ctx.close();
}
await b.close(); fs.writeFileSync(`${OUT}rail-${RUN}.json`, JSON.stringify(rows, null, 1));
