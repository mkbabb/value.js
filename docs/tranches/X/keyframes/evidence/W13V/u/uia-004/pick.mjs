// SERVED MODEL: claude-opus-5-5
// UIA-KF-004 · Home: open the transport's animation list, pick a non-default channel; read where the app lands
// and which channel the transport then names (and plays). usage: node pick.mjs <tag> [baseURL]
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
const tag = process.argv[2] || "run"; const BASE = process.argv[3] || "http://localhost:5173/";
const OUT = new URL(`./${tag}/`, import.meta.url).pathname; fs.mkdirSync(OUT, { recursive: true });
const b = await chromium.launch({ headless: false });
const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
await p.goto(BASE + "#/"); await p.waitForTimeout(4500);
const trig = p.locator("[data-dock-tether=bottom] [role=combobox]").first();
const before = { visible: await trig.isVisible().catch(() => false), text: (await trig.textContent().catch(() => null))?.trim() ?? null };
let options = [], picked = null;
if (before.visible) {
  await trig.click(); await p.waitForTimeout(600);
  options = await p.getByRole("option").allTextContents();
  await p.screenshot({ path: OUT + "home-list.png" });
  const alt = p.getByRole("option").filter({ hasNotText: /Rotations/i }).first();
  picked = (await alt.textContent())?.trim() ?? null; await alt.click(); await p.waitForTimeout(3500);
}
const after = { hash: await p.evaluate(() => location.hash), text: (await p.locator("[data-dock-tether=bottom] [role=combobox]").first().textContent().catch(() => null))?.trim() ?? null };
await p.screenshot({ path: OUT + "after-pick.png" });
const res = { base: BASE, before, options: options.map((s) => s.trim()), picked, after };
fs.writeFileSync(OUT + "pick.json", JSON.stringify(res, null, 1)); console.log(JSON.stringify(res));
await b.close();
