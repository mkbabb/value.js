// Probe: the expanded-timeline state after settle — instance count, geometry, overlap with the ribbon. READ-ONLY.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const CSS = `@keyframes demo { 0% { transform: rotate(0deg); } 50% { transform: rotate(90deg); } 100% { transform: rotate(180deg); } }`;
const b = await chromium.launch({ headless: false }); const res = {};
for (const [vp, W, H] of [["1440", 1440, 900], ["390", 390, 844]]) {
  const ctx = await b.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 2 }); const page = await ctx.newPage();
  await page.goto("http://localhost:5173/#/cube", { waitUntil: "networkidle" }); await page.waitForTimeout(3000);
  const hd = async () => { const d = await page.locator(".glass-dock").first().boundingBox(); await page.mouse.move(d.x + d.width / 2, d.y + d.height / 2); await page.waitForTimeout(1000); };
  if (vp === "390") { await hd(); await page.getByRole("button", { name: "Controls panel" }).first().click(); await page.waitForTimeout(1300); }
  await hd(); await page.locator('[aria-label="Controls tab"]').first().click(); await page.waitForTimeout(600); await page.getByRole("option", { name: /^Timeline/ }).click(); await page.waitForTimeout(2000);
  if (vp === "1440") { await page.getByRole("button", { name: "Import", exact: true }).filter({ visible: true }).first().click(); await page.waitForTimeout(700);
  await page.locator("[role=dialog] textarea").first().fill(CSS); await page.locator("[role=dialog] button", { hasText: /^Import/ }).last().click(); await page.waitForTimeout(1800); }
  await page.getByRole("button", { name: "Expand timeline", exact: true }).filter({ visible: true }).first().click();
  const m = () => page.evaluate(() => { const r = (e) => { const b = e.getBoundingClientRect(); return [b.x, b.y, b.width, b.height].map(Math.round); };
    const cell = document.getElementById("timeline-expanded-target");
    return { stages: [...document.querySelectorAll(".timeline-preview-stage")].map(e => ({ box: r(e), inCell: cell.contains(e) })), toolbars: [...document.querySelectorAll('button[aria-label="Collapse timeline"],button[aria-label="Expand timeline"]')].map(e => ({ l: e.getAttribute("aria-label"), box: r(e), inCell: cell.contains(e) })),
      cell: { box: r(cell), radius: getComputedStyle(cell).borderTopLeftRadius, overflow: [cell.scrollHeight, cell.clientHeight] },
      ribbon: [...document.querySelectorAll("button")].filter(b => b.textContent.trim() === "Snapshot").map(r), vh: innerHeight, placeholder: [...document.querySelectorAll("p")].filter(p => /expanded below/.test(p.textContent)).map(r),
      transport: (() => { const t = document.querySelector(".transport-dock, [class*=transport]"); return t ? r(t) : null; })() }; });
  await page.mouse.move(W - 5, 5); await page.waitForTimeout(300); res[vp + "-300ms"] = await m();
  await page.waitForTimeout(3000); res[vp + "-3300ms"] = await m();
  await page.screenshot({ path: OUT + `42-expanded-settled-${vp}-light.png` });
  await ctx.close();
}
writeFileSync(OUT + "probe-expand.json", JSON.stringify(res, null, 2)); console.log(JSON.stringify(res));
await b.close();
