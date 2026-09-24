// SERVED MODEL: claude-opus-5-5 — X.W12.u2: atmosphere Select triggers/options upright (UIA-V-157 consumer half); knob readouts at step precision (UIA-V-158 readout half).
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const BASE = process.env.BASE ?? "http://localhost:9000";
const OUT = new URL(".", import.meta.url).pathname;
const b = await chromium.launch({ headless: true });
const res = [];
for (const [w, h, scheme] of [[1440, 900, "light"], [390, 844, "dark"]]) {
  const p = await (await b.newContext({ viewport: { width: w, height: h }, colorScheme: scheme })).newPage();
  await p.goto(`${BASE}/?color=%23abcdef#/atmosphere`, { waitUntil: "domcontentloaded", timeout: 120000 });
  const trig = p.locator('[role="combobox"][aria-labelledby$="-harmony"]').first();
  await trig.waitFor({ timeout: 60000 }); await p.waitForTimeout(600);
  const r = { vp: w, scheme };
  r.triggers = await p.locator('[role="combobox"]').evaluateAll((els) => els.map((e) => { const c = getComputedStyle(e.querySelector("span") ?? e); return [c.fontStyle, c.fontSize]; }));
  r.readouts = await p.locator(".configurator-row").evaluateAll((els) => els.map((e) => e.innerText.replace(/\s+/g, " ").trim()));
  await trig.click(); await p.waitForTimeout(400);
  r.options = await p.locator('[role="option"]').evaluateAll((els) => els.slice(0, 3).map((e) => { const c = getComputedStyle(e); return [c.fontStyle, c.fontSize]; }));
  await p.screenshot({ path: `${OUT}u2-atmos-select-${w}-${scheme}.png` });
  res.push(r);
}
await b.close();
writeFileSync(`${OUT}probe-u2-atmos${process.env.RUN ?? ""}.json`, JSON.stringify(res, null, 1));
console.log(JSON.stringify(res));
