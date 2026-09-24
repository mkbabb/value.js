// SERVED MODEL: claude-opus-5-5
// UIA-KF-003 · Share popover: load a base64 payload that decodes but is no state object ("MTIz" = 123).
// Reads: the toast titles raised, and whether the popover's load field is still open after.
// usage: node nonstate.mjs <tag> [baseURL]
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
const tag = process.argv[2] || "run"; const BASE = process.argv[3] || "http://localhost:5173/";
const OUT = new URL(`./${tag}/`, import.meta.url).pathname; fs.mkdirSync(OUT, { recursive: true });
const b = await chromium.launch({ headless: false }); const res = { base: BASE, legs: [] };
for (const payload of ["MTIz", "not-base64-%%"]) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage();
  await p.goto(BASE + "#/cube"); await p.waitForTimeout(4500);
  await p.mouse.move(720, 70); await p.waitForTimeout(700); await p.locator("[aria-label=\"@mbabb menu\"]").first().click(); await p.waitForTimeout(500);
  await p.getByRole("menuitem", { name: /Share/ }).first().press("Enter"); await p.waitForTimeout(600);
  const field = p.getByLabel("Share URL or hash to load");
  const opened = await field.isVisible().catch(() => false);
  if (opened) { await field.fill(payload); await field.press("Enter"); await p.waitForTimeout(900); }
  const toasts = await p.evaluate(() => [...document.querySelectorAll('li[data-slot="toast"], li[data-sonner-toast]')].map((e) => (e.textContent || "").trim().slice(0, 60)));
  res.legs.push({ payload, opened, toasts, fieldStillOpen: await field.isVisible().catch(() => false) });
  await p.screenshot({ path: `${OUT}${payload.slice(0, 4)}.png` }); await ctx.close();
}
fs.writeFileSync(OUT + "nonstate.json", JSON.stringify(res, null, 1)); console.log(JSON.stringify(res));
await b.close();
