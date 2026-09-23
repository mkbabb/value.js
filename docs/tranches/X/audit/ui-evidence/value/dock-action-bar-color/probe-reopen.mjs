// Probe: open Tools on /#/, Back, switch view by the select, press Tools again (x3 trials); and hash-nav with the bar OPEN. READ-ONLY.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname; const BASE = "http://localhost:9000";
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const st = (page) => page.evaluate(() => { const g = (s) => { const e = document.querySelector(s); if (!e) return null; const b = e.getBoundingClientRect(); return [Math.round(b.x), Math.round(b.right)]; }; return { pressed: document.querySelector('[aria-label="Toggle action bar"]')?.getAttribute("aria-pressed"), dock: g(".glass-dock"), back: g('[aria-label="Back"]'), row: g('[data-testid="scene-action-row"]'), collapsed: !!document.querySelector(".glass-dock.collapsed"), hash: location.hash }; });
const browser = await chromium.launch({ headless: false });
const out = [];
for (let trial = 0; trial < 3; trial++) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" }); const page = await ctx.newPage();
  await page.goto(`${BASE}/#/`, { waitUntil: "domcontentloaded", timeout: 90000 }); await page.getByRole("button", { name: "Toggle action bar" }).waitFor({ state: "attached", timeout: 90000 }); await wait(4000);
  const c = page.locator(".glass-dock.collapsed"); if (await c.count()) { await c.first().click(); await wait(800); }
  const rec = { trial };
  await page.getByRole("button", { name: "Toggle action bar" }).click(); await wait(900); rec.open = await st(page);
  await page.getByRole("button", { name: "Back" }).click(); await wait(900); rec.back = await st(page);
  await page.getByRole("combobox", { name: "Select view" }).click(); await wait(500);
  await page.getByRole("option", { name: "Generate", exact: true }).click(); await wait(4500); rec.switched = await st(page);
  await page.getByRole("button", { name: "Toggle action bar" }).click(); await wait(1500); rec.reopen = await st(page);
  await page.screenshot({ path: `${OUT}probe-reopen-t${trial}.png`, clip: { x: 0, y: 0, width: 1440, height: 120 } });
  // Hash nav with the bar OPEN (browser Back/Forward, keyboard route)
  if (rec.reopen.pressed === "true") {
    await page.evaluate(() => { location.hash = "#/gradient"; }); await wait(4000); rec.hashNavOpen = await st(page);
    await page.screenshot({ path: `${OUT}probe-reopen-t${trial}-hashnav-open.png`, clip: { x: 0, y: 0, width: 1440, height: 120 } });
  }
  out.push(rec); await ctx.close();
}
await browser.close(); writeFileSync(`${OUT}probe-reopen.json`, JSON.stringify(out, null, 1));
for (const r of out) console.log(JSON.stringify(r));
