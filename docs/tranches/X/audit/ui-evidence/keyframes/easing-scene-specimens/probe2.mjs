// probe2: why the specimen grid renders as one row — READ-ONLY.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const browser = await chromium.launch({ headless: false });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, colorScheme: "light" });
const page = await ctx.newPage();
await page.goto("http://localhost:5173/#/easing", { waitUntil: "networkidle" }); await page.waitForTimeout(3000);
console.log(JSON.stringify(await page.evaluate(() => {
  const tile = document.querySelector(".specimen-tile"); const grid = tile.parentElement;
  const cs = getComputedStyle(grid);
  const sheetsMatch = [];
  for (const s of document.styleSheets) { try { for (const r of s.cssRules) { const walk = (r) => { if (r.cssRules) [...r.cssRules].forEach(walk); if (r.selectorText && grid.matches(r.selectorText)) sheetsMatch.push(r.cssText.slice(0, 200)); }; walk(r); } } catch {} }
  const drawer = document.querySelector(".specimen-drawer");
  const fr = document.querySelector(".family-row .toggle-group");
  const scopeAttrs = (e) => [...e.attributes].map(a => a.name).filter(n => n.startsWith("data-v")).join(",");
  const cardEl = document.querySelector(".easing-target");
  return {
    gridClass: grid.className, gridAttrs: scopeAttrs(grid), tileAttrs: scopeAttrs(tile), cardAttrs: scopeAttrs(cardEl),
    display: cs.display, gtc: cs.gridTemplateColumns.slice(0, 80), flexWrap: cs.flexWrap, radius: cs.borderRadius, bg: cs.backgroundColor, bdf: cs.backdropFilter, pad: cs.padding, w: grid.getBoundingClientRect().width,
    gridScroll: [grid.scrollWidth, grid.clientWidth], drawerParent: drawer?.className, drawerRect: JSON.stringify(drawer?.getBoundingClientRect()), drawerScroll: drawer ? [drawer.scrollWidth, drawer.clientWidth, getComputedStyle(drawer).overflowX] : null,
    familyRowRadius: fr && getComputedStyle(fr).borderRadius, familyRowBg: fr && getComputedStyle(fr).backgroundColor,
    rules: sheetsMatch,
    tileWS: getComputedStyle(tile).whiteSpace, tileRadius: getComputedStyle(tile).borderRadius, tileBg: getComputedStyle(tile).backgroundColor, tileBdf: getComputedStyle(tile).backdropFilter, tileSurf: tile.dataset.surface,
    duration: (() => { const d = document.querySelector(".duration-field"); if (!d) return null; const r = d.querySelector("[data-slot=slider], .slider-track, [role=slider]"); return { html: d.outerHTML.slice(0, 600) }; })(),
  };
}), null, 1));
await browser.close();
