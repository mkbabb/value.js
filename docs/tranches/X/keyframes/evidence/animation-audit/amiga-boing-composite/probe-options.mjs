// Runtime options vs the controls panel readout (headed, served page).
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const browser = await chromium.launch({ headless: false });
const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 })).newPage();
await page.goto("http://localhost:5173/#/amiga"); await page.waitForSelector("canvas.amiga-canvas"); await page.waitForTimeout(2500);
const r = await page.evaluate(() => {
  let inst = document.querySelector("canvas.amiga-canvas").__vueParentComponent;
  while (inst && !(inst.exposed && inst.exposed.facility)) inst = inst.parent;
  const g = inst.exposed.facility.group;
  const opts = Object.fromEntries(Object.entries(g.animations).map(([n, o]) => [n, { duration: o.animation.options.duration, direction: o.animation.options.direction, iter: o.animation.options.iterationCount, tfCss: o.animation.options.timingFunction?.css ?? null }]));
  let store = null; try { store = JSON.parse(localStorage.getItem("animation-groups-options-store")); } catch {}
  return { opts, storeKeys: store ? Object.keys(store) : null, amiga: store ? JSON.stringify(Object.entries(store).find(([k]) => /amiga/i.test(k)) ?? null).slice(0, 600) : null };
});
writeFileSync(OUT + "options-probe.json", JSON.stringify(r, null, 1));
console.log(JSON.stringify(r, null, 1));
await browser.close();
