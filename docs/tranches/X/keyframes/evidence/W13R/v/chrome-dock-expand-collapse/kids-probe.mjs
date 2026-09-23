// SERVED MODEL: claude-opus-5-5
// KF.W13R.v — KFA-109 (stagger onset order) + DOCK-TRIGGER-CLIP (§0cj) read on the top dock at 10.0.1, headed.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
const base = process.argv[2] ?? "http://localhost:5173"; const label = process.argv[3] ?? "dev";
const OUT = new URL(".", import.meta.url).pathname;
const browser = await chromium.launch({ headless: false });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
await page.mouse.move(720, 600); await page.goto(`${base}/#/cube`, { waitUntil: "load" }); await page.waitForTimeout(4000);
const box = await page.locator('[data-dock-tether="top"] .glass-dock').boundingBox();
await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 4 }); await page.waitForTimeout(2000);
const r = await page.evaluate(() => {
  const dock = document.querySelector('[data-dock-tether="top"] .glass-dock'); const full = dock.querySelector(".dock-layer--full");
  const kids = [...full.children].map((k, i) => { const s = getComputedStyle(k); const b = k.getBoundingClientRect();
    return { i, nth: i + 1, tag: k.tagName.toLowerCase(), cls: String(k.className).slice(0, 60), label: (k.getAttribute("aria-label") || k.textContent || "").trim().slice(0, 20), display: s.display, x: Math.round(b.x), onset: s.getPropertyValue("--child-onset").trim() || s.getPropertyValue("--dock-child-onset").trim(), delay: s.transitionDelay.slice(0, 40) }; });
  const fc = getComputedStyle(full); const fr = full.getBoundingClientRect();
  const caps = [...full.querySelectorAll("button, [role=combobox]")].map((b) => { const br = b.getBoundingClientRect(); return { label: (b.getAttribute("aria-label") || b.textContent || "").trim().slice(0, 16), top: Math.round(br.top), bottom: Math.round(br.bottom), h: Math.round(br.height) }; });
  return { kids, full: { overflow: [fc.overflowX, fc.overflowY], padBlock: [fc.paddingBlockStart, fc.paddingBlockEnd], top: Math.round(fr.top), bottom: Math.round(fr.bottom), clientTop: Math.round(fr.top + parseFloat(fc.paddingBlockStart)) }, caps };
});
// hover + focus the Controls trigger: does its capsule/ring cross the row's clip box?
const trig = page.locator('[data-dock-tether="top"] .dock-layer--full button').nth(1);
const tb = await trig.boundingBox(); await page.mouse.move(tb.x + tb.width / 2, tb.y + tb.height / 2); await page.waitForTimeout(500);
const clip = { x: tb.x - 20, y: box.y - 8, width: tb.width + 40, height: 72 };
fs.writeFileSync(`${OUT}trigger-hover-${label}.png`, await page.screenshot({ clip }));
await trig.focus(); await page.keyboard.press("Shift+Tab"); await page.keyboard.press("Tab"); await page.waitForTimeout(300);
r.focusRing = await page.evaluate(() => { const el = document.activeElement; const cs = getComputedStyle(el); const b = el.getBoundingClientRect(); return { label: el.getAttribute("aria-label") || el.textContent?.trim().slice(0, 16), outline: cs.outlineStyle + " " + cs.outlineWidth + " off " + cs.outlineOffset, top: Math.round(b.top), bottom: Math.round(b.bottom) }; });
fs.writeFileSync(`${OUT}trigger-focus-${label}.png`, await page.screenshot({ clip }));
fs.writeFileSync(`${OUT}kids-probe-${label}.json`, JSON.stringify(r, null, 1)); console.log(JSON.stringify(r).slice(0, 3000)); await browser.close();
