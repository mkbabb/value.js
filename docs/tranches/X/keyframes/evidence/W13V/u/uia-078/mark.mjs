// SERVED MODEL: claude-opus-5-5
// UIA-KF-078 · does the open Select paint its selected row's mark (glass 10.0.1 SelectItem indicator)?
// usage: node mark.mjs <tag> [baseURL]
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
const tag = process.argv[2] || "run"; const BASE = process.argv[3] || "http://localhost:5173/";
const OUT = new URL(`./${tag}/`, import.meta.url).pathname; fs.mkdirSync(OUT, { recursive: true });
const b = await chromium.launch({ headless: false }); const res = [];
for (const name of ["alternate", "ease-in-out"]) {
  const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  await p.goto(BASE + "#/cube"); await p.waitForTimeout(4500);
  await p.locator("[role=combobox]", { hasText: name }).first().click(); await p.waitForTimeout(600);
  res.push({ select: name, rows: await p.evaluate(() => [...document.querySelectorAll('[role=option][data-state=checked]')].map((o) => { const d = o.querySelector("span.rounded-pill, span[class*=rounded]"); const r = d?.getBoundingClientRect(); return { text: o.textContent.trim().slice(0, 30), mark: d ? { w: r.width, h: r.height, bg: getComputedStyle(d).backgroundColor } : null }; })) });
  await p.screenshot({ path: `${OUT}${name}.png` }); await p.context().close();
}
fs.writeFileSync(OUT + "mark.json", JSON.stringify(res, null, 1)); console.log(JSON.stringify(res));
await b.close();
