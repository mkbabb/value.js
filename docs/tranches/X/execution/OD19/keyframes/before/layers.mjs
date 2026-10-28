// OD19 keyframes K8/V1-family: the dock's painted layers (element + ::before/::after) radius/size, collapsed · expanded · mid-collapse.
import { chromium } from "playwright";
import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const TOP = '[data-dock-tether="top"] .glass-dock';
const dump = (page) => page.evaluate((sel) => { const d = document.querySelector(sel); const rows = [];
  for (const e of [d, ...d.querySelectorAll("*")]) for (const pe of [null, "::before", "::after"]) { const c = getComputedStyle(e, pe); if (pe && c.content === "none") continue;
    const painted = c.backgroundColor !== "rgba(0, 0, 0, 0)" || c.backgroundImage !== "none" || c.backdropFilter !== "none" || c.boxShadow !== "none" || (c.borderTopWidth !== "0px" && c.borderTopStyle !== "none");
    if (!painted) continue; const b = e.getBoundingClientRect(); if (b.width < 30) continue;
    rows.push({ el: String(e.className?.baseVal ?? e.className).slice(0, 48) + (pe || ""), w: pe ? c.width : Math.round(b.width), h: pe ? c.height : Math.round(b.height), radius: c.borderRadius, clip: c.clipPath.slice(0, 60), mask: c.maskImage.slice(0, 40), bf: c.backdropFilter.slice(0, 30), bg: c.backgroundColor, inset: pe ? c.inset : "", transform: c.transform.slice(0, 40) }); }
  return rows; }, TOP);
const browser = await chromium.launch({ headless: true });
const out = {};
try {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "dark", deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  try {
    await page.goto("http://localhost:5173/#/cube", { waitUntil: "load" }); await page.waitForTimeout(2500);
    out.collapsed = await dump(page);
    await page.locator(TOP).hover(); await page.waitForTimeout(1500);
    out.expanded = await dump(page);
    await page.mouse.move(2, 450);
    await page.waitForFunction((s) => { const w = document.querySelector(s).getBoundingClientRect().width; return w < 300 && w > 120; }, TOP, { polling: "raf", timeout: 8000 });
    out.midCollapse = await dump(page);
    await page.locator(TOP).screenshot({ path: `${OUT}K8-mid-collapse-dark-1440.png` });
  } finally { await ctx.close(); }
} finally { await browser.close(); }
writeFileSync(`${OUT}layers.json`, JSON.stringify(out, null, 1));
for (const [k, v] of Object.entries(out)) { console.log("==", k); for (const r of v) console.log(JSON.stringify(r)); }
