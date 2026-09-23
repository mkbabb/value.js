import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const b = await chromium.launch({ headless: false });
const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
await p.goto("http://localhost:9000/#/gradient", { waitUntil: "commit", timeout: 240000 });
await p.locator(".specimen-tile").first().waitFor({ timeout: 90000 }); await p.waitForTimeout(1500);
console.log(await p.evaluate(() => { const on = document.querySelector(".specimen-tile[data-state=on]"); const cs = getComputedStyle(on); const after = getComputedStyle(on, "::after");
  const tabs = [...document.querySelectorAll(".easing-panel .specimen-tile")].filter(e => e.offsetParent && e.tabIndex >= 0).length;
  return JSON.stringify({ outer: on.outerHTML.slice(0, 400), bg: cs.backgroundColor, bgi: cs.backgroundImage.slice(0, 80), ab: getComputedStyle(document.documentElement).getPropertyValue("--accent-band"), flood: cs.getPropertyValue("--chip-flood-t"), afterOp: after.opacity, tabStops: tabs, scale: cs.scale }); }));
await b.close();
