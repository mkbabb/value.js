// Probe: action bar OPEN on a color-scene route, then route to a workbench (history/hash nav) — does the layer re-seat? READ-ONLY.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname; const BASE = "http://localhost:9000";
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const st = (page) => page.evaluate(() => { const g = (s) => { const e = document.querySelector(s); if (!e) return null; const b = e.getBoundingClientRect(); return [Math.round(b.x), Math.round(b.right)]; }; return { pressed: document.querySelector('[aria-label="Toggle action bar"]')?.getAttribute("aria-pressed"), dock: g(".glass-dock"), back: g('[aria-label="Back"]'), row: g('[data-testid="scene-action-row"]'), arm: g('[aria-label="Open color input"]'), hash: location.hash, states: [...document.querySelectorAll("[data-scene-action]")].map((s) => s.dataset.actionState[0]).join("") }; });
const browser = await chromium.launch({ headless: false });
const out = {};
for (const vp of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) for (const [from, to] of [["blob", "generate"], ["", "mix"], ["generate", ""]]) {
  try {
  const ctx = await browser.newContext({ viewport: vp, colorScheme: "light" }); const page = await ctx.newPage();
  await page.goto(`${BASE}/#/${from}`, { waitUntil: "domcontentloaded", timeout: 90000 }); await page.getByRole("button", { name: "Toggle action bar" }).waitFor({ state: "attached", timeout: 90000 }); await wait(4000);
  const c = page.locator(".glass-dock.collapsed"); if (await c.count()) { await c.first().click(); await wait(800); }
  await page.getByRole("button", { name: "Toggle action bar" }).click(); await wait(1000);
  const k = `${vp.width}-${from || "picker"}->${to || "picker"}`; out[k] = { open: await st(page) };
  await page.evaluate((to) => { location.hash = `#/${to}`; }, to);
  for (const t of [1000, 3000, 6000]) { await wait(t - (t === 1000 ? 0 : t === 3000 ? 1000 : 3000)); out[k][`t${t}`] = await st(page); }
  try { await page.screenshot({ timeout: 60000, path: `${OUT}probe-swap-${k.replace(/[>]/g, "")}.png`, clip: { x: 0, y: 0, width: vp.width, height: 120 } }); } catch (e) { out[k].shotErr = String(e).slice(0, 80); }
  await ctx.close(); } catch (e) { console.log("ERR", from, to, String(e).slice(0, 60)); }
  writeFileSync(`${OUT}probe-scene-swap-open.json`, JSON.stringify(out, null, 1));
}
await browser.close(); writeFileSync(`${OUT}probe-scene-swap-open.json`, JSON.stringify(out, null, 1));
for (const [k, v] of Object.entries(out)) console.log(k, JSON.stringify(v));
