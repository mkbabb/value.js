// Read-only probe: does the dock view icon speak --accent-view per view (or the admin gold)?
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
const p = await ctx.newPage(); const rows = [];
await p.goto("http://localhost:9000/#/", { waitUntil: "networkidle" }).catch(() => {}); await p.waitForTimeout(3000);
for (const v of (process.env.SEQ ?? "/,/palettes,/gradient,/blob").split(",")) {
  await p.evaluate((v) => (location.hash = "#" + v), v); await p.waitForTimeout(1500);
  await p.screenshot({ path: new URL(`probe-accent-${rows.length}-${v.slice(1) || "home"}.png`, import.meta.url).pathname, clip: { x: 400, y: 0, width: 640, height: 80 } }); rows.push(await p.evaluate(() => { const t = document.querySelector(".view-select-trigger"); const svg = t?.querySelector("svg"); return { hash: location.hash, svgCls: svg?.getAttribute("class"), svgColor: svg && getComputedStyle(svg).color, svgStroke: svg && getComputedStyle(svg).stroke, trigAccent: t && getComputedStyle(t).getPropertyValue("--accent-view"), ring: t && getComputedStyle(t).getPropertyValue("--dock-ring"), adminText: [...document.querySelectorAll("nav button")].map((x) => x.textContent.trim()).filter(Boolean).slice(0, 6) }; }));
}
writeFileSync(new URL(`probe-accent${process.env.SEQ ? "-seq2" : ""}.json`, import.meta.url).pathname, JSON.stringify(rows, null, 1));
console.log(JSON.stringify(rows, null, 1)); await b.close();
