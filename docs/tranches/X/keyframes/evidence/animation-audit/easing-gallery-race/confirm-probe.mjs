import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const b = await chromium.launch({ headless: false });
const page = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await page.goto("http://localhost:5173/#/easing", { waitUntil: "networkidle" });
await page.waitForTimeout(2000);
const r = await page.evaluate(() => {
  const g = document.querySelector(".specimen-grid");
  const cs = getComputedStyle(g);
  const tile = g.querySelector(".specimen-tile");
  const stages = [...g.querySelectorAll(".tile-stage")].slice(0, 10).map(s => s.clientWidth);
  return { attrs: [...g.attributes].map(a => a.name), tileAttrs: tile ? [...tile.attributes].map(a => a.name).filter(n => n.startsWith("data-v")) : null,
    display: cs.display, gtc: cs.gridTemplateColumns, radius: cs.borderRadius, bg: cs.backgroundColor, width: g.scrollWidth,
    prevType: g.previousSibling?.nodeType, prevText: JSON.stringify(g.previousSibling?.textContent), cv: tile && getComputedStyle(tile).contentVisibility, stages,
    gpu: (() => { const c = document.createElement("canvas").getContext("webgl"); const e = c.getExtension("WEBGL_debug_renderer_info"); return c.getParameter(e.UNMASKED_RENDERER_WEBGL); })() };
});
console.log(JSON.stringify(r));
await b.close();
