// Read-only: collapsed animation-dock summary geometry inside fullscreen (Metric unit overflow).
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { readFileSync, writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const slug = readFileSync(OUT + "../visualize-view-options-popover/seed.txt", "utf8").trim();
const b = await chromium.launch({ headless: false }); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const page = await ctx.newPage();
await page.goto(`http://localhost:3100/w/${slug}`, { waitUntil: "networkidle" }); await page.locator(".controls-dock-anchor").waitFor(); await page.waitForTimeout(1500);
await page.locator(".controls-dock-anchor .glass-dock").first().hover(); await page.waitForTimeout(700); await page.locator("[aria-label='Fullscreen']").click(); await page.mouse.move(5, 450); await page.waitForTimeout(3000);
const r = await page.evaluate(() => { const d = document.querySelector("[data-slot=dialog-content] .animation-dock"); const box = (e) => { const r = e.getBoundingClientRect(); const cs = getComputedStyle(e); return { tag: e.tagName, cls: e.className?.toString().slice(0, 70), x: Math.round(r.x), w: Math.round(r.width), pos: cs.position, ov: cs.overflow, txt: e.textContent.trim().slice(0, 12) }; };
  const m = d.querySelector(".summary-speed"); const out = [box(d)]; let e = m; while (e && e !== d) { out.push(box(e)); e = e.parentElement; } return { chain: out, metricKids: m ? [...m.querySelectorAll("*")].map(box) : [] }; });
writeFileSync(OUT + "probe2.json", JSON.stringify(r, null, 1)); console.log(JSON.stringify(r, null, 1)); await b.close();
