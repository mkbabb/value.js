// SERVED MODEL: claude-opus-5-5
// KF.W13R.v — DOCK-TRIGGER-CLIP (§0cj): keyboard focus ring + selected capsule of the top-dock triggers vs the row's clip box, headed.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
const base = process.argv[2] ?? "http://localhost:5173"; const label = process.argv[3] ?? "dev";
const OUT = new URL(".", import.meta.url).pathname;
const browser = await chromium.launch({ headless: false });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
await page.mouse.move(720, 600); await page.goto(`${base}/#/cube`, { waitUntil: "load" }); await page.waitForTimeout(4000);
const res = [];
for (let i = 0; i < 40; i++) {
  await page.keyboard.press("Tab");
  const f = await page.evaluate(() => { const el = document.activeElement; const row = el?.closest(".dock-layer--full"); if (!row || !el.matches(":focus-visible")) return null;
    const cs = getComputedStyle(el); const b = el.getBoundingClientRect(); const rc = row.getBoundingClientRect(); const rs = getComputedStyle(row);
    const ext = parseFloat(cs.outlineWidth || 0) + parseFloat(cs.outlineOffset || 0);
    return { label: el.getAttribute("aria-label") || el.textContent.trim().slice(0, 16), outline: `${cs.outlineStyle} ${cs.outlineWidth} off ${cs.outlineOffset}`, boxShadow: cs.boxShadow.slice(0, 60),
      ringTop: Math.round(b.top - ext), ringBottom: Math.round(b.bottom + ext), rowClip: [Math.round(rc.top), Math.round(rc.bottom)], rowOverflow: [rs.overflowX, rs.overflowY], x: b.x, y: b.y, w: b.width, h: b.height,
      clipped: (b.top - ext) < rc.top - 0.5 || (b.bottom + ext) > rc.bottom + 0.5 }; });
  if (f) { res.push(f); await page.waitForTimeout(250); fs.writeFileSync(`${OUT}focus-${label}-${res.length}.png`, await page.screenshot({ clip: { x: f.x - 16, y: f.y - 16, width: f.w + 32, height: f.h + 32 } })); }
  if (res.length >= 4) break;
}
fs.writeFileSync(`${OUT}focus-clip-${label}.json`, JSON.stringify(res, null, 1)); console.log(JSON.stringify(res.map(({ label, outline, ringTop, ringBottom, rowClip, clipped }) => ({ label, outline, ringTop, ringBottom, rowClip, clipped }))));
await browser.close();
