// Probe: workbench seat registration latency + Back visibility (desktop). READ-ONLY.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname; const BASE = "http://localhost:9000";
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const browser = await chromium.launch({ headless: false });
const res = {};
for (const vp of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) for (const r of ["mix", "generate", "gradient"]) {
  const ctx = await browser.newContext({ viewport: vp, colorScheme: "light" }); const page = await ctx.newPage();
  const t0 = Date.now(); await page.goto(`${BASE}/#/${r}`); const key = `${r}-${vp.width}`; res[key] = [];
  for (let i = 0; i < 20; i++) {
    await wait(1000);
    res[key].push(await page.evaluate((t0) => ({ t: Date.now() - t0, states: [...document.querySelectorAll("[data-scene-action]")].map((s) => s.dataset.actionState[0]).join(""), loading: document.body.innerText.includes("Loading the scene"), back: (() => { const b = document.querySelector('[aria-label="Back"]'); if (!b) return null; const bb = b.getBoundingClientRect(); return [Math.round(bb.x), Math.round(bb.width), getComputedStyle(b).opacity, getComputedStyle(b.closest('[class*=dock-layer]') ?? b).opacity]; })() }), t0));
    if (i === 4) { const c = page.locator(".glass-dock.collapsed"); if (await c.count()) { await c.first().click(); await wait(800); } await page.locator('[aria-label="Toggle action bar"]').click({ force: true }).catch(() => {}); }
  }
  await page.screenshot({ path: `${OUT}probe-${key}-t20s.png`, clip: { x: 0, y: 0, width: vp.width, height: 140 } });
  await ctx.close();
}
await browser.close(); writeFileSync(`${OUT}probe-registration.json`, JSON.stringify(res, null, 1));
for (const [k, v] of Object.entries(res)) console.log(k, v.map((x) => `${Math.round(x.t / 1000)}s:${x.states}${x.loading ? "L" : ""}`).join(" "), "back", JSON.stringify(v.at(-1).back));
