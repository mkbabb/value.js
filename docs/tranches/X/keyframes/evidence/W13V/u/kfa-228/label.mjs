// SERVED MODEL: claude-opus-5-5
// KFA-228 · the easing select trigger on the audit's three panels (amiga, square, cube): its text content
// must be the easing NAME alone (no description run-on) and it carries a curve glyph (svg path).
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
const tag = process.argv[2] || "run"; const BASE = process.argv[3] || "http://localhost:5173/"; const OUT = new URL(`./${tag}/`, import.meta.url).pathname; fs.mkdirSync(OUT, { recursive: true });
const b = await chromium.launch({ headless: false }); const res = [];
for (const scene of ["amiga", "square", "cube", "easing"]) {
  const p = await (await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 })).newPage();
  await p.goto(`${BASE}#/${scene}`); await p.waitForTimeout(4000);
  const r = await p.evaluate(() => { const t = [...document.querySelectorAll("[role=combobox]")].filter((e) => e.offsetParent && /ease|linear|cubic|spring|steps|bezier|bounce|gravity|fall|rise/i.test(e.textContent)); return t.map((e) => { const b = e.getBoundingClientRect(); return { text: e.textContent.replace(/\s+/g, " ").trim(), svgPath: !!e.querySelector("svg path"), box: { x: b.x, y: b.y, w: b.width, h: b.height } }; }); });
  if (r[0]) await p.screenshot({ path: `${OUT}${scene}.png`, clip: { x: Math.max(0, r[0].box.x - 12), y: Math.max(0, r[0].box.y - 12), width: r[0].box.w + 24, height: r[0].box.h + 24 } });
  res.push({ scene, triggers: r }); await p.context().close();
}
fs.writeFileSync(OUT + "label.json", JSON.stringify(res, null, 1)); for (const r of res) console.log(JSON.stringify(r));
await b.close();
