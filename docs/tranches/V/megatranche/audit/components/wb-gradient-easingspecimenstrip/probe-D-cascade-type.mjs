import { chromium } from "playwright";
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage();
await p.goto("http://localhost:9000/#/gradient", { waitUntil: "networkidle" });
await p.waitForTimeout(3000);

// 1. is .glass-chip--cell defined anywhere?
const css = await p.evaluate(() => {
  const hits = [];
  for (const ss of document.styleSheets) { try { for (const r of ss.cssRules) {
     if (r.selectorText && /glass-chip--cell|glass-chip--interactive|glass-chip\b/.test(r.selectorText))
        hits.push(r.selectorText.slice(0,80) + " {" + r.style.cssText.slice(0,80) + "}");
  } } catch(e){} }
  return {chipRules: hits, count: hits.length};
});
console.log("CHIP RULES:", JSON.stringify(css, null, 1));

// 2. type rungs
const rungs = await p.evaluate(() => {
  const mk = cls => { const d = document.createElement("div"); d.className = cls; d.textContent="Xg"; document.body.appendChild(d); const s = getComputedStyle(d); const r = {cls, fs: s.fontSize, lh: s.lineHeight, ff: s.fontFamily.split(",")[0], fw: s.fontWeight}; d.remove(); return r; };
  return ["text-small","text-mono-small","text-micro","mono-caption","text-prose"].map(mk);
});
console.log("RUNGS:", JSON.stringify(rungs, null, 1));

// 3. real hover over the SELECTED tile
const sel = p.locator('.specimen-tile[data-state="on"]').first();
const beforeC = await sel.locator(".tile-label").evaluate(e => getComputedStyle(e).color);
await sel.hover();
await p.waitForTimeout(250);
const afterC = await sel.locator(".tile-label").evaluate(e => getComputedStyle(e).color);
const afterW = await sel.locator(".tile-label").evaluate(e => getComputedStyle(e).fontWeight);
const glyph = await sel.locator(".tile-glyph path").evaluate(e => getComputedStyle(e).stroke);
console.log("HOVER-ON-SELECTED:", JSON.stringify({beforeC, afterC, afterW, glyphStillAccent: glyph}));

// 4. does the Chip expose any pressed surface delta at all in any state?
const surf = await p.evaluate(() => {
  const t = [...document.querySelectorAll('.specimen-tile')];
  const on = t.find(x=>x.getAttribute('data-state')==='on'), off = t.find(x=>x.getAttribute('data-state')!=='on');
  const g = e => { const s = getComputedStyle(e); return {bg: s.backgroundColor, border: s.borderColor+'/'+s.borderWidth, shadow: s.boxShadow.slice(0,60), filter: s.filter, outline: s.outline}; };
  return {on: g(on), off: g(off), equal: JSON.stringify(g(on))===JSON.stringify(g(off))};
});
console.log("SURFACE:", JSON.stringify(surf, null, 1));
await b.close();
