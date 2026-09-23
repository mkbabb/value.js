// transport-dock @390: dock vs controls sheet geometry — READ-ONLY.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const browser = await chromium.launch({ headless: false });
const res = [];
for (const s of ["cube", "square", "spring"]) {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await page.goto(`http://localhost:5173/#/${s}`, { waitUntil: "networkidle" });
  await page.mouse.move(10, 300); await page.waitForTimeout(4000);
  const m = () => page.evaluate(() => {
    const r = (e) => { if (!e) return null; const b = e.getBoundingClientRect(); return { x: Math.round(b.x), y: Math.round(b.y), w: Math.round(b.width), h: Math.round(b.height), b: Math.round(b.bottom) }; };
    const docks = [...document.querySelectorAll(".glass-dock")]; const d = docks[docks.length - 1];
    const host = d.closest("[data-dock-tether=bottom]");
    const cs = getComputedStyle(document.documentElement);
    const cands = [...document.querySelectorAll("[class*=drawer], [class*=sheet], [role=dialog], [class*=controls-pane]")].filter(e => e.getBoundingClientRect().height > 60).map(e => ({ cls: (e.getAttribute("class") || "").slice(0, 80), ...r(e) }));
    const fields = [...document.querySelectorAll("input, [role=combobox]")].filter(e => !d.contains(e) && e.getBoundingClientRect().height > 0).slice(0, 6).map(e => ({ lab: e.getAttribute("aria-label") || e.getAttribute("name") || e.value, ...r(e) }));
    const hit = (() => { const q = d.getBoundingClientRect(); const e = document.elementFromPoint(q.x + 6, q.y + q.height / 2); return e ? (e.getAttribute("class") || e.tagName).slice(0, 60) : null; })();
    return { dock: r(d), host: r(host), menubarH: cs.getPropertyValue("--menubar-measured-h"), reserve: cs.getPropertyValue("--dock-band-reserve"), cands, fields, hitAtDockLeft: hit };
  });
  res.push({ s, rest: await m() });
  await page.screenshot({ path: OUT + `60-${s}-390-sheet-geometry-light.png` });
  // hover-expand then measure
  const b = await page.locator(".glass-dock").last().boundingBox(); await page.mouse.move(b.x + b.width / 2, b.y + 20); await page.waitForTimeout(1200);
  res.push({ s: s + "-hover", rest: await m() });
  await page.screenshot({ path: OUT + `61-${s}-390-sheet-geometry-expanded-light.png` });
  await ctx.close();
}
writeFileSync(OUT + "probe-390-sheet.json", JSON.stringify(res, null, 1));
for (const x of res) console.log(x.s, JSON.stringify(x.rest).slice(0, 900));
await browser.close();
