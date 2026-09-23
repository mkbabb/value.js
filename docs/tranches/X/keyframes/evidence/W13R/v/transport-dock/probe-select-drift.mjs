// transport-dock — probe: does the dock collapse UNDER an open animation Select (the dropdown jumping ~107 px at psel#21→#22)?
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs"; import { execSync } from "node:child_process";
const OUT = new URL(".", import.meta.url).pathname;
const kf = (c) => execSync(`git -C /Users/mkbabb/Programming/keyframes.js ${c}`).toString().trim();
const prov = { khead: kf("rev-parse --short HEAD"), kdirty: kf("status --porcelain").split("\n").filter(Boolean).length };
fs.mkdirSync(OUT + "drift", { recursive: true });
const browser = await chromium.launch({ headless: false });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await page.mouse.move(1300, 200);
await page.goto("http://localhost:5173/#/cube", { waitUntil: "load" });
await page.waitForTimeout(4500);
await page.locator('[data-dock-tether="bottom"] [aria-label="Select animation"]').click();
const rows = [];
for (let i = 0; i < 90; i++) {
  rows.push(await page.evaluate(() => { const d = document.querySelector('[data-dock-tether="bottom"] .glass-dock'); const lb = document.querySelector('[role="listbox"]'); const r = lb?.getBoundingClientRect();
    return { t: Math.round(performance.now()), cls: d.className.match(/expanded|collapsed/)?.[0], morph: d.hasAttribute("data-morphing"), dw: Math.round(d.getBoundingClientRect().width), lbx: r ? Math.round(r.x) : null, lby: r ? Math.round(r.y) : null, bodyPE: getComputedStyle(document.body).pointerEvents }; }));
  if (i % 6 === 0) await page.screenshot({ path: `${OUT}drift/d${String(i).padStart(2, "0")}.png`, clip: { x: 520, y: 560, width: 420, height: 280 } });
  await page.waitForTimeout(100);
}
let prev = ""; for (const r of rows) { const k = `${r.cls}|${r.morph}|${r.lbx}|${r.bodyPE}`; if (k !== prev) { console.log(JSON.stringify(r)); prev = k; } }
fs.writeFileSync(OUT + "drift-log.json", JSON.stringify({ prov, rows }));
console.log(JSON.stringify(prov));
await browser.close();
