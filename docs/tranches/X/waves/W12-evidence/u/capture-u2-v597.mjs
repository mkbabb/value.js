// SERVED MODEL: claude-opus-5-5 — X.W12.u2: the frameless row UIA-V-597 (Mix: the last selected color cannot be removed), reachable only after UIA-V-40's cure.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const BASE = process.env.BASE ?? "http://localhost:9000";
const OUT = new URL(".", import.meta.url).pathname;
const b = await chromium.launch({ headless: true });
const res = [];
for (const [w, h, scheme] of [[1440, 900, "light"], [390, 844, "dark"]]) {
  const p = await (await b.newContext({ viewport: { width: w, height: h }, colorScheme: scheme })).newPage();
  await p.goto(`${BASE}/?color=%23abcdef#/mix`, { waitUntil: "domcontentloaded", timeout: 120000 });
  const add = p.getByRole("button", { name: "Add current color to the mix" });
  await add.waitFor({ timeout: 60000 }); await add.click(); await p.waitForTimeout(400);
  const chip = p.locator("[data-mix-source]").first(); await chip.hover(); await p.waitForTimeout(300);
  const rm = chip.locator("button");
  const r = { vp: w, scheme, chips: await p.locator("[data-mix-source]").count(), removeDisabled: await rm.isDisabled(), removeName: await rm.getAttribute("aria-label") };
  await p.screenshot({ path: `${OUT}u2-v597-last-chip-${w}-${scheme}.png` });
  res.push(r);
}
await b.close();
writeFileSync(`${OUT}capture-u2-v597.json`, JSON.stringify(res, null, 1));
console.log(JSON.stringify(res));
