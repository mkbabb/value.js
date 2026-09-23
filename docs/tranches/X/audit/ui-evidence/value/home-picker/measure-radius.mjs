// measure nested radii + relay tokens (read-only)
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage();
await p.goto("http://localhost:9000/#/", { waitUntil: "load", timeout: 60000 });
await p.waitForTimeout(4000);
console.log(JSON.stringify(await p.evaluate(() => {
  const g = (s) => document.querySelector(s);
  const v = (el, k) => getComputedStyle(el).getPropertyValue(k).trim();
  const card = g(".pane-shell > :first-child"), con = g(".sliders-console"), spec = g(".spectrum-picker"), thumb = g(".spectrum-picker [class*=thumb], .spectrum-picker [class*=handle]");
  const cr = card.getBoundingClientRect(), sr = con.getBoundingClientRect();
  return {
    card: { rad: getComputedStyle(card).borderRadius, ctx: v(card, "--radius-ctx"), inset: v(card, "--radius-inset") },
    console: { rad: getComputedStyle(con).borderRadius, ctx: v(con, "--radius-ctx"), insetFromCard: Math.round(sr.left - cr.left), shadow: getComputedStyle(con).boxShadow.slice(0, 80) },
    spectrum: { rad: getComputedStyle(spec).borderRadius, insetFromCard: Math.round(spec.getBoundingClientRect().left - cr.left) },
    thumb: thumb && { cls: String(thumb.className).slice(0, 80), rad: getComputedStyle(thumb).borderRadius, box: (() => { const r = thumb.getBoundingClientRect(); return [r.width, r.height].map(Math.round); })() },
    cardShadow: getComputedStyle(card).boxShadow.slice(0, 160),
    meters: [...document.querySelectorAll(".channel-meter")].map(e => e.textContent.trim()),
    readoutMinH: getComputedStyle(g(".readout")).minHeight, readoutLines: v(g(".readout"), "--readout-lines"),
    railSel: [...document.querySelectorAll(".channel-rail-item")].map(e => e.getAttribute("aria-selected") + "/" + e.tabIndex),
  };
}), null, 1));
await b.close();
