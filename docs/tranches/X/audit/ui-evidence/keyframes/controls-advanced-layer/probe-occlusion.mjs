// 390 occlusion probe — READ-ONLY: what sits on top of each advanced-pane control at 390x844.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const browser = await chromium.launch({ headless: false });
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.goto("http://localhost:5173/#/amiga", { waitUntil: "networkidle" }); await page.waitForTimeout(3500);
const top = page.locator(".glass-dock").first(); const b = await top.boundingBox(); await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); await page.waitForTimeout(900);
await page.getByRole("button", { name: "Controls panel" }).first().click(); await page.waitForTimeout(1400); await page.mouse.move(5, 300); await page.waitForTimeout(600);
const a = page.locator(".controls-pane button", { hasText: /^\s*advanced\s*$/ }).first(); await a.focus(); await page.keyboard.press("Enter"); await page.waitForTimeout(1200);
await page.mouse.move(5, 300); await page.waitForTimeout(800);
const hits = await page.evaluate(() => [...document.querySelectorAll(".labeled-field-grid [role=switch], .labeled-field-grid [role=combobox], .labeled-field-grid button, .labeled-field-grid .slider-track")].filter(e => e.getBoundingClientRect().width).map(e => { const r = e.getBoundingClientRect(); const pts = [[r.x + r.width / 2, r.y + r.height / 2], [r.x + 4, r.y + r.height / 2]]; return { el: (e.getAttribute("role") || e.getAttribute("aria-label") || e.className).toString().slice(0, 20), box: [r.x, r.y, r.width, r.height].map(Math.round), hits: pts.map(([x, y]) => { const h = document.elementFromPoint(x, y); return h === e || e.contains(h) ? "self" : (h?.closest(".glass-dock, [class*=dock]")?.className?.toString().slice(0, 50) || h?.tagName); }) }; }));
console.log(JSON.stringify(hits, null, 1));
const sw = page.locator(".labeled-field-grid [role=switch]").first();
const res = await sw.click({ timeout: 4000 }).then(() => "clicked").catch((e) => String(e).split("\n").slice(0, 4).join(" | "));
console.log("switch click:", res, await sw.getAttribute("aria-checked"));
await browser.close();
