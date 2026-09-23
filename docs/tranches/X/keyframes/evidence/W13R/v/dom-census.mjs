// SERVED MODEL: claude-opus-5-5
// KF.W13R.v — the capture scripts' selector census at 10.0.1 (do the 7.0.0-era hooks still exist?), headed, one read.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const base = process.argv[2] ?? "http://localhost:5173";
const browser = await chromium.launch({ headless: false });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(`${base}/#/cube`, { waitUntil: "load" }); await page.waitForTimeout(4000);
const r = await page.evaluate(() => {
  const q = (s) => document.querySelectorAll(s).length;
  const sels = ['[data-dock-tether="top"] .glass-dock', '[data-dock-tether="bottom"] .glass-dock', ".glass-dock", ".dock-layer--full", ".dock-layer--summary", ".dock-layers", "[data-morphing]", ".dock-plate", '[data-slot="sheet-content"]', ".controls-pane", ".menubar-safe-pb", '[data-slot="easing-picker"]', ".dock-icon-button"];
  const out = Object.fromEntries(sels.map((s) => [s, q(s)]));
  const tethers = [...document.querySelectorAll("[data-dock-tether]")].map((e) => e.getAttribute("data-dock-tether"));
  const d = document.querySelector('[data-dock-tether="top"] .glass-dock');
  const full = d?.querySelector(".dock-layer--full"); const fc = full && getComputedStyle(full);
  return { out, tethers, topCls: d?.className, topStyleVars: d?.getAttribute("style"), fullOverflow: fc ? [fc.overflowX, fc.overflowY, fc.paddingBlockStart, fc.paddingBlockEnd] : null };
});
console.log(JSON.stringify(r, null, 1)); await browser.close();
