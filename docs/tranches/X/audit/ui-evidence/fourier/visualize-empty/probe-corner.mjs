// read-only probe: configurator shadow/radius + canvas offset (no interaction)
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const b = await chromium.launch({ headless: false });
for (const theme of ["light","dark"]) {
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: theme });
const p = await ctx.newPage(); await p.goto("http://localhost:3100/visualize", { waitUntil: "networkidle" }); await p.waitForTimeout(800);
console.log(theme, JSON.stringify(await p.evaluate(() => {
  const c = document.querySelector(".viz-configurator"); const cs = getComputedStyle(c);
  const cv = document.querySelector(".canvas-container canvas"); const ccs = getComputedStyle(cv);
  const chain = []; let e = cv; while (e && e !== c.parentElement) { const s = getComputedStyle(e); chain.push(`${e.tagName}.${[...e.classList].join(".")} r=${s.borderRadius} ov=${s.overflow} pos=${s.position} tr=${s.transform} inset=${s.top},${s.left} m=${s.margin} bg=${s.backgroundColor}`); e = e.parentElement; }
  return { cfgShadow: cs.boxShadow, cfgClass: c.className, cfgOverflow: cs.overflow, cfgPad: cs.padding, canvasStyle: cv.getAttribute("style"), canvasPos: ccs.position + " " + ccs.top + " " + ccs.left + " tr " + ccs.transform + " m " + ccs.margin, chain,
    tokens: ["--radius-panel","--radius-card","--radius-field","--button-size","--focus-ring-color"].map((t) => t + "=" + getComputedStyle(document.querySelector(".drop-target-button")).getPropertyValue(t)) };
}), null, 1));
await ctx.close(); }
await b.close();
