// SERVED MODEL: claude-opus-5-5 — X.W12.u2: atmosphere Select triggers meet the touch floor at 390 coarse (UIA-V-390); labels (UIA-V-614).
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const BASE = process.env.BASE ?? "http://localhost:9000";
const OUT = new URL(".", import.meta.url).pathname;
const b = await chromium.launch({ headless: true });
const res = [];
for (const [w, h, touch] of [[390, 844, true], [1440, 900, false]]) {
  const p = await (await b.newContext({ viewport: { width: w, height: h }, hasTouch: touch, isMobile: touch })).newPage();
  await p.goto(`${BASE}/?color=%23abcdef#/atmosphere`, { waitUntil: "domcontentloaded", timeout: 120000 });
  await p.locator('[role="combobox"]').first().waitFor({ timeout: 60000 }); await p.waitForTimeout(600);
  const r = { vp: w, touch };
  r.triggers = await p.locator('[role="combobox"]').evaluateAll((els) => els.map((e) => { const q = e.getBoundingClientRect(); return [Math.round(q.width), Math.round(q.height), e.innerText.trim()]; }));
  const mt = p.locator('[role="combobox"]').nth(3); await mt.click(); await p.waitForTimeout(300); r.media = await p.locator('[role="option"]').allInnerTexts(); await p.keyboard.press("Escape"); await p.waitForTimeout(300);
  r.rows = await p.locator(".configurator-row").evaluateAll((els) => els.map((e) => e.innerText.replace(/\s+/g, " ").trim()));
  await p.screenshot({ path: `${OUT}u2-atmos-${w}-${touch ? "touch" : "fine"}.png` });
  res.push(r);
}
await b.close();
writeFileSync(`${OUT}probe-u2-atmos-touch${process.env.RUN ?? ""}.json`, JSON.stringify(res, null, 1));
console.log(JSON.stringify(res));
