import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/fourier-analysis/web/package.json");
const { chromium } = require("playwright");
import { writeFileSync } from "node:fs";
const OUT = process.argv[2]; const BASE = process.argv[3] || "http://localhost:3100";
const b = await chromium.launch({ channel: "chrome", headless: true });
const res = {};
for (const theme of ["light", "dark"]) for (const w of [1440, 390]) {
  const ctx = await b.newContext({ viewport: { width: w, height: w === 390 ? 844 : 900 }, colorScheme: theme, ...(w === 390 ? { isMobile: true, hasTouch: true, deviceScaleFactor: 2 } : {}) });
  await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); localStorage.setItem("theme", t); } catch {} }, theme);
  const p = await ctx.newPage();
  await p.goto(BASE + "/paper", { waitUntil: "networkidle" }); await p.waitForTimeout(3000);
  const key = `${theme}-${w}`;
  res[key] = await p.evaluate(() => {
    const r = (e) => e.getBoundingClientRect();
    const art = document.querySelector(".paper-article");
    const th = [...document.querySelectorAll(".theorem-block")].map(e => { const cs = getComputedStyle(e); const l = e.querySelector(".theorem-label"); return { k: [...e.classList].find(c => c.startsWith("theorem-block--")), bl: cs.borderLeftColor, sh: cs.boxShadow, rad: cs.borderRadius, before: getComputedStyle(e, "::before").content, label: l && getComputedStyle(l).color }; });
    const heads = [...document.querySelectorAll(".section-header--chapter, .section-header--sub")].slice(0, 6).map(h => {
      const sec = h.parentElement; const hr = r(h);
      // previous visible content above: last element of previous section-like block
      let prevBottom = null; const all = [...document.querySelectorAll(".paper-article p, .paper-article .math-block, .paper-article .theorem-block, .paper-article .section-header--chapter, .paper-article .section-header--sub, .paper-article .section-divider")];
      for (const e of all) { const q = r(e); if (q.bottom <= hr.top + 1 && !h.contains(e) && q.height > 0) prevBottom = Math.max(prevBottom ?? -1e9, q.bottom); }
      let nextTop = null; for (const e of all) { const q = r(e); if (q.top >= hr.bottom - 1 && !h.contains(e) && e.tagName === "P") { nextTop = q.top; break; } }
      return { cls: h.className, text: h.textContent.trim().slice(0, 32), bg: getComputedStyle(h).backgroundColor, mt: getComputedStyle(h).marginTop, above: prevBottom == null ? null : Math.round(hr.top - prevBottom), below: nextTop == null ? null : Math.round(nextTop - hr.bottom) };
    });
    const div = document.querySelector(".section-divider"); const mb = document.querySelector(".math-block");
    return { articleBg: getComputedStyle(art).backgroundColor, theorems: th.slice(0, 6), heads, divider: div && getComputedStyle(div).backgroundImage + " | " + getComputedStyle(div).backgroundColor, mathBlockBL: mb && getComputedStyle(mb).borderLeftWidth };
  });
  if (w === 1440 && theme === "light") { const mb = await p.$(".math-block"); await mb.scrollIntoViewIfNeeded(); await mb.hover(); await p.waitForTimeout(500); res.mbHover = await mb.evaluate(e => getComputedStyle(e).borderLeft); await mb.screenshot({ path: `${OUT}/mathblock-hover-light.png` }); }
  await ctx.close();
}
writeFileSync(`${OUT}/c1-probe.json`, JSON.stringify(res, null, 1));
await b.close();
