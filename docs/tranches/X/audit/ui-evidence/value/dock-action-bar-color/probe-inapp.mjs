// Probe: workbench seat states after IN-APP (same-document hash) navigation. READ-ONLY.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname; const BASE = "http://localhost:9000";
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const browser = await chromium.launch({ headless: false });
const res = {};
for (const vp of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
  const ctx = await browser.newContext({ viewport: vp, colorScheme: "light" }); const page = await ctx.newPage();
  await page.goto(`${BASE}/#/`); await wait(4000);
  for (const r of ["generate", "gradient", "mix", "", "mix"]) {
    await page.evaluate((r) => { location.hash = `#/${r}`; }, r);
    const key = `${vp.width}-${r || "picker"}-${Object.keys(res).length}`; res[key] = [];
    for (let i = 0; i < 12; i++) { await wait(1000); res[key].push(await page.evaluate(() => [...document.querySelectorAll("[data-scene-action]")].map((s) => s.dataset.actionState[0]).join("") + (document.body.innerText.includes("Loading the scene") ? "L" : "") + (document.body.innerText.includes("unexpected error") ? "E" : ""))); }
    if (r === "mix") await page.screenshot({ path: `${OUT}probe-inapp-${key}.png` });
  }
  await ctx.close();
}
await browser.close(); writeFileSync(`${OUT}probe-inapp.json`, JSON.stringify(res, null, 1));
for (const [k, v] of Object.entries(res)) console.log(k, v.join(" "));
