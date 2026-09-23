// Probe: does Tools open the action bar after a view-select switch at 1440? READ-ONLY.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname; const BASE = "http://localhost:9000";
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const st = (page) => page.evaluate(() => { const t = document.querySelector('[aria-label="Toggle action bar"]'); const d = document.querySelector(".glass-dock").getBoundingClientRect(); return { pressed: t?.getAttribute("aria-pressed"), dockW: Math.round(d.width), backVisible: !!document.querySelector('[aria-label="Back"]')?.closest(".is-active,[data-active-layer],[aria-hidden=false]"), activeLayers: [...document.querySelectorAll("[data-layer]")].map(e=>e.getAttribute("data-layer")+":"+(e.getAttribute("inert")===null?"live":"inert")).join(" ") , openPoppers: document.querySelectorAll("[data-reka-popper-content-wrapper]").length }; });
const browser = await chromium.launch({ headless: false });
const out = [];
for (const target of ["Generate", "Gradient", "Mix", "Palettes"]) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" }); const page = await ctx.newPage();
  await page.goto(`${BASE}/#/`); await wait(4000);
  const c = page.locator(".glass-dock.collapsed"); if (await c.count()) { await c.first().click(); await wait(800); }
  await page.getByRole("combobox", { name: "Select view" }).click(); await wait(500);
  await page.getByRole("option", { name: target, exact: true }).click(); await wait(4500);
  const rec = { target, before: await st(page) };
  await page.getByRole("button", { name: "Toggle action bar" }).click(); await wait(1500);
  rec.click1 = await st(page);
  await page.screenshot({ path: `${OUT}probe-tools-${target}-click1.png`, clip: { x: 0, y: 0, width: 1440, height: 120 } });
  if (rec.click1.pressed !== "true" || rec.click1.dockW > 400) { await page.mouse.move(5, 400); await wait(300); await page.getByRole("button", { name: "Toggle action bar" }).click({ force: true }); await wait(1500); rec.click2 = await st(page); await page.screenshot({ path: `${OUT}probe-tools-${target}-click2.png`, clip: { x: 0, y: 0, width: 1440, height: 120 } }); }
  out.push(rec); await ctx.close();
}
await browser.close(); writeFileSync(`${OUT}probe-tools-after-select.json`, JSON.stringify(out, null, 1));
for (const r of out) console.log(JSON.stringify(r));
