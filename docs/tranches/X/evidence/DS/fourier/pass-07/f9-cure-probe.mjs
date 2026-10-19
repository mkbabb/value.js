// X-DS pass 7 cure probe (DS-F9-C1..C6): headless real Chrome (§0ei).
import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/fourier-analysis/web/package.json");
const { chromium } = require("playwright");
import { writeFileSync } from "node:fs";
const OUT = process.argv[2]; const BASE = process.argv[3] || "http://localhost:3100";
const b = await chromium.launch({ channel: "chrome", headless: true });
const res = {};
const box = (e) => { const x = e.getBoundingClientRect(); return [Math.round(x.left), Math.round(x.top), Math.round(x.width), Math.round(x.height)]; };
for (const theme of ["light", "dark"]) {
  const mk = async (w, h, phone = false) => { const ctx = await b.newContext({ viewport: { width: w, height: h }, colorScheme: theme, ...(phone ? { isMobile: true, hasTouch: true, deviceScaleFactor: 2 } : {}) });
    await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); localStorage.setItem("theme", t); } catch {} }, theme); return [ctx, await ctx.newPage()]; };
  // C1: the morph tile strip, at rest and on hover
  let [ctx, p] = await mk(1440, 900);
  await p.goto(BASE + "/morph", { waitUntil: "networkidle" }); await p.waitForTimeout(3000);
  const cell = p.locator(".grid-cell:not(.is-bound):not(.active)").nth(2);
  await cell.scrollIntoViewIfNeeded();
  res[`morph-${theme}`] = await p.evaluate(() => { const c = [...document.querySelectorAll(".grid-cell:not(.is-bound):not(.active)")][2]; const cs = getComputedStyle(c); return { emphasis: c.getAttribute("data-emphasis") ?? c.className, boxShadow: cs.boxShadow, transform: cs.transform, border: cs.border, bg: cs.backgroundColor }; });
  await p.screenshot({ path: `${OUT}/morph-${theme}-1440.png` });
  await cell.hover(); await p.waitForTimeout(500);
  res[`morph-hover-${theme}`] = await cell.evaluate((c) => { const cs = getComputedStyle(c); return { boxShadow: cs.boxShadow, transform: cs.transform, borderColor: cs.borderColor }; });
  await p.screenshot({ path: `${OUT}/morph-tilehover-${theme}-1440.png` });
  await ctx.close();
  // C2/C3/C4/C6 at 1440: the paper's opening (description + enumerate) and the search field
  [ctx, p] = await mk(1440, 900);
  await p.goto(BASE + "/paper", { waitUntil: "networkidle" }); await p.waitForTimeout(3000);
  const ol = p.locator(".paper-article ol.paper-list").first();
  for (let i = 0; i < 40 && !(await ol.count()); i++) { await p.mouse.wheel(0, 600); await p.waitForTimeout(250); }
  res[`paper-${theme}`] = await p.evaluate(() => { const ol = document.querySelector(".paper-article ol.paper-list"); const li = ol?.querySelector("li"); const dl = document.querySelector(".paper-article .paper-description"); const s = document.querySelector(".search-field-input");
    return { olListStyle: ol && getComputedStyle(ol).listStyleType, liListStyle: li && getComputedStyle(li).listStyleType, liMarkerColor: li && getComputedStyle(li, "::marker").color, dts: dl && [...dl.querySelectorAll("dt")].map((d) => d.textContent), searchFont: s && getComputedStyle(s).fontSize, searchBox: s && (() => { const f = s.closest(".search-field") ?? s; const r = f.getBoundingClientRect(); return [Math.round(r.width), Math.round(r.height)]; })() }; });
  if (await ol.count()) { await ol.evaluate((e) => e.scrollIntoView({ block: "center" })); await p.waitForTimeout(800); }
  await p.screenshot({ path: `${OUT}/paper-list-${theme}-1440.png` });
  await p.goto(BASE + "/paper", { waitUntil: "networkidle" }); await p.waitForTimeout(2500);
  const dl = p.locator(".paper-article .paper-description").first();
  for (let i = 0; i < 40 && !(await dl.count()); i++) { await p.mouse.wheel(0, 600); await p.waitForTimeout(250); }
  if (await dl.count()) { await dl.evaluate((e) => e.scrollIntoView({ block: "center" })); await p.waitForTimeout(800); }
  await p.screenshot({ path: `${OUT}/paper-top-${theme}-1440.png` });
  await ctx.close();
  // C5: the gallery dialog CTA
  [ctx, p] = await mk(1440, 900);
  await p.goto(BASE + "/gallery", { waitUntil: "networkidle" }); await p.waitForTimeout(2500);
  await p.locator(".card-open").first().click(); await p.waitForTimeout(1500);
  res[`modal-${theme}`] = await p.evaluate(() => { const d = document.querySelector("[role=dialog]"); const btn = [...d.querySelectorAll("button")].find((x) => /Open Visualizer/.test(x.textContent)); const t = d.querySelector("h2"); const cs = (e) => e && [getComputedStyle(e).fontSize, getComputedStyle(e).fontWeight, Math.round(e.getBoundingClientRect().height)];
    return { title: cs(t), cta: cs(btn) }; });
  await p.screenshot({ path: `${OUT}/modal-${theme}-1440.png` });
  await ctx.close();
  // C6: eq (1.19) at 390, number under the display
  [ctx, p] = await mk(390, 844, true);
  await p.goto(BASE + "/paper", { waitUntil: "networkidle" }); await p.waitForTimeout(3000);
  await p.mouse.move(195, 400);
  const num = p.locator(".paper-article .math-block__number", { hasText: "(1.19)" }).first();
  for (let i = 0; i < 80 && !(await num.count()); i++) { await p.mouse.wheel(0, 700); await p.waitForTimeout(250); }
  const target = (await num.count()) > 0;
  if (target) { await num.evaluate((e) => e.closest(".math-block").scrollIntoView({ block: "center" })); }
  await p.waitForTimeout(1500);
  res[`eq119-${theme}`] = target && await num.evaluate((n) => { const mb = n.closest(".math-block"); const kd = mb.querySelector(".katex-display"); const k = kd.querySelector(".katex-html") ?? kd; const nr = n.getBoundingClientRect(); const kr = k.getBoundingClientRect(); const cs = getComputedStyle(kd);
    return { gapInkToNumber: Math.round(nr.top - kr.bottom), mathBlockHeight: Math.round(mb.getBoundingClientRect().height), kdMarginEnd: cs.marginBlockEnd, kdPaddingEnd: cs.paddingBlockEnd }; });
  await p.screenshot({ path: `${OUT}/paper-119-${theme}-390.png` });
  await ctx.close();
}
writeFileSync(`${OUT}/f9-cure-probe.json`, JSON.stringify(res, null, 1)); console.log(JSON.stringify(res, null, 1));
await b.close();
