// probe: type scale + radius of sidebar parts (computed style only)
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { readFileSync, writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname; const slug = readFileSync(OUT + "slug.txt", "utf8").trim();
const b = await chromium.launch({ headless: false }); const page = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
await page.goto("http://localhost:3100/w/" + slug, { waitUntil: "networkidle" }); await page.locator(".play-control").waitFor(); await page.waitForTimeout(1500);
await page.locator(".configurator-layer").filter({ hasText: "Contour" }).locator("button[aria-expanded]").first().click(); await page.waitForTimeout(600);
const r = await page.evaluate(() => {
  const f = (sel) => [...document.querySelectorAll(sel)].slice(0, 3).map((e) => { const cs = getComputedStyle(e); const r = e.getBoundingClientRect(); return { sel, text: e.textContent.trim().slice(0, 24), size: cs.fontSize, weight: cs.fontWeight, family: cs.fontFamily.slice(0, 22), color: cs.color, radius: cs.borderRadius, h: Math.round(r.height), w: Math.round(r.width) }; });
  return [".configurator-section-label", ".configurator-layer [class*=sub]", ".configurator-row label, .configurator-row [class*=label]", ".slider-label > span", ".advanced-trigger", ".inline-number input, .inline-number", "[aria-label='Contour extraction strategy']", ".viz-panel-left img", ".viz-panel-left img ~ div, .viz-panel-left .group", "canvas + *", ".caret-value"].flatMap(f);
});
writeFileSync(OUT + "probe-type.json", JSON.stringify(r, null, 1)); console.log(r.map((x) => JSON.stringify(x)).join("\n")); await b.close();
