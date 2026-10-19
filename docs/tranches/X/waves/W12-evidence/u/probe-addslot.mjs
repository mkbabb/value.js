// SERVED MODEL: claude-opus-5-5 — X.W12.u1: the palettes add-slot is an operable host button (G-2 sweep: WatercolorDot `tag` dead).
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const BASE = process.env.BASE ?? "http://localhost:9000";
const OUT = new URL(".", import.meta.url).pathname;
const b = await chromium.launch({ headless: true });
const res = [];
for (const [w, h] of [[1440, 900], [390, 844]]) {
  const p = await (await b.newContext({ viewport: { width: w, height: h } })).newPage();
  await p.goto(`${BASE}/?color=%23abcdef#/palettes`, { waitUntil: "domcontentloaded", timeout: 120000 });
  const slot = p.locator(".add-slot-ghost").first();
  await slot.waitFor({ timeout: 60000 });
  const read = () => slot.evaluate((el) => ({ tag: el.tagName, aria: el.getAttribute("aria-label"), hidden: el.getAttribute("aria-hidden"), pe: getComputedStyle(el).pointerEvents, dot: !!el.querySelector(".watercolor-swatch"), swatches: el.parentElement?.parentElement?.querySelectorAll(".watercolor-swatch").length }));
  const before = await read();
  await slot.click({ timeout: 5000 }); await p.waitForTimeout(600);
  const after = await read();
  await slot.focus(); await p.keyboard.press("Enter"); await p.waitForTimeout(600);
  const afterKey = await read();
  await p.screenshot({ path: `${OUT}addslot-${w}.png` });
  res.push({ vp: w, before, afterClick: after, afterEnter: afterKey });
}
await b.close();
writeFileSync(`${OUT}probe-addslot${process.env.RUN ?? ""}.json`, JSON.stringify(res, null, 1));
console.log(JSON.stringify(res));
