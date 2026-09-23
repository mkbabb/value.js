// Probe: Back/seat geometry after switching color scene -> workbench, by the real path (view select) and by history nav with bar open. READ-ONLY.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname; const BASE = "http://localhost:9000";
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const geo = (page) => page.evaluate(() => { const r = (s) => { const e = document.querySelector(s); if (!e) return null; const b = e.getBoundingClientRect(); return [Math.round(b.x), Math.round(b.right)]; }; return { dock: r(".glass-dock"), back: r('[aria-label="Back"]'), row: r('[data-testid="scene-action-row"]'), tools: r('[aria-label="Toggle action bar"]'), hash: location.hash, seats: [...document.querySelectorAll("[data-scene-action]")].map((s) => s.dataset.sceneAction.split(".")[0]).join(",") }; });
const browser = await chromium.launch({ headless: false });
const res = {};
for (const vp of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
  const ctx = await browser.newContext({ viewport: vp, colorScheme: "light" }); const page = await ctx.newPage();
  await page.goto(`${BASE}/#/`); await wait(4000);
  const c = page.locator(".glass-dock.collapsed"); if (await c.count()) { await c.first().click(); await wait(800); }
  await page.getByRole("button", { name: "Toggle action bar" }).click(); await wait(900);
  res[`${vp.width}-A-color-open`] = await geo(page);
  await page.getByRole("button", { name: "Back" }).click(); await wait(900);
  await page.getByRole("combobox", { name: "Select view" }).click(); await wait(500);
  const opts = await page.getByRole("option").allInnerTexts(); res[`${vp.width}-options`] = opts;
  const gen = page.getByRole("option").filter({ hasText: /generate/i }).first();
  await gen.click(); await wait(4500);
  res[`${vp.width}-B-generate-main`] = await geo(page);
  await page.getByRole("button", { name: "Toggle action bar" }).click(); await wait(1200);
  res[`${vp.width}-C-generate-open`] = await geo(page);
  await page.screenshot({ path: `${OUT}probe-switch-${vp.width}-C-generate-open.png`, clip: { x: 0, y: 0, width: vp.width, height: 120 } });
  // history nav with the bar open: back to color scene
  await page.goBack(); await wait(3000);
  res[`${vp.width}-D-history-back-color`] = await geo(page);
  await page.screenshot({ path: `${OUT}probe-switch-${vp.width}-D-history-back.png`, clip: { x: 0, y: 0, width: vp.width, height: 120 } });
  await page.goForward(); await wait(4000);
  res[`${vp.width}-E-history-fwd-generate`] = await geo(page);
  await page.screenshot({ path: `${OUT}probe-switch-${vp.width}-E-history-fwd.png`, clip: { x: 0, y: 0, width: vp.width, height: 120 } });
  await ctx.close();
}
await browser.close(); writeFileSync(`${OUT}probe-switch.json`, JSON.stringify(res, null, 1));
for (const [k, v] of Object.entries(res)) console.log(k, JSON.stringify(v));
