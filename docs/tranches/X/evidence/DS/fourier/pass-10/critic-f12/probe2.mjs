import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/fourier-analysis/web/package.json");
const { chromium } = require("playwright");
import { writeFileSync } from "node:fs";
const b = await chromium.launch({ channel: "chrome", headless: true });
const out = {};
for (const theme of ["light","dark"]) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: theme });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
  const p = await ctx.newPage();
  const q = (sels) => p.evaluate((sels) => sels.map(s => { const e = document.querySelector(s); if (!e) return [s, null]; const c = getComputedStyle(e); const r=e.getBoundingClientRect(); return [s, { cls: e.className?.toString().slice(0,140), bg: c.backgroundColor, bgi: c.backgroundImage.slice(0,160), bs: c.boxShadow, bf: c.backdropFilter, border: c.border, r:[r.x,r.y,r.width,r.height].map(Math.round) }]; }), sels);
  await p.goto("http://localhost:3100/equation", { waitUntil: "networkidle" }); await p.waitForTimeout(2500);
  const compute = await p.evaluate(() => { const bt=[...document.querySelectorAll("button")].find(b=>/Compute/.test(b.textContent)); const c=getComputedStyle(bt); return { cls: bt.className, bg:c.backgroundColor, bgi:c.backgroundImage, bs:c.boxShadow, bf:c.backdropFilter, color:c.color }; });
  const auto = await p.evaluate(() => { const bt=[...document.querySelectorAll("button")].find(b=>/Auto/.test(b.textContent)); const c=getComputedStyle(bt); return { cls: bt.className, bg:c.backgroundColor, bs:c.boxShadow, color:c.color }; });
  out[`eq-${theme}`] = { compute, auto, rest: await q([".progress-rail", ".configurator-aside", ".eq-legend, .convergence-legend"]) };
  await p.goto("http://localhost:3100/w", { waitUntil: "networkidle" }); await p.waitForTimeout(1500);
  out[`w-${theme}`] = await p.evaluate(() => { const bt=[...document.querySelectorAll("button")].find(b=>/Choose an image/.test(b.textContent)); const c=getComputedStyle(bt); return { cls: bt.className, bg:c.backgroundColor, bs:c.boxShadow, bf: c.backdropFilter }; });
  await p.goto("http://localhost:3100/morph", { waitUntil: "networkidle" }); await p.waitForTimeout(1500);
  out[`morph-${theme}`] = await p.evaluate(() => { const r = {}; const t=document.querySelector("[role=combobox], button[aria-haspopup=listbox]"); const i=document.querySelector(".config-card input"); for (const [k,e] of [["select",t],["input",i]]) { if(!e){r[k]=null;continue;} const c=getComputedStyle(e); r[k]={cls:e.className.toString().slice(0,160), bg:c.backgroundColor, bgi:c.backgroundImage.slice(0,120), bs:c.boxShadow.slice(0,200), bf:c.backdropFilter}; } const hl=document.querySelector(".level-strip, [class*=level-grid], [class*=levels]"); return r; });
  await ctx.close();
}
writeFileSync("probe2.json", JSON.stringify(out, null, 1)); await b.close();
