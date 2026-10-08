// X-DS F5-C6 — measure sub-section heading proximity on the served /paper, at HEAD's latex-paper 0.2.1
// and with latex-paper's cure rule injected (the package is not yet repinned). Headless real Chrome (§0ei).
import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/fourier-analysis/web/package.json");
const { chromium } = require("playwright");
const BASE = process.argv[2] ?? "http://localhost:3115";
const RULE = process.argv[3] ?? "";
const b = await chromium.launch({ channel: "chrome", headless: true });
const out = {};
for (const w of [1440, 390]) {
  const ctx = await b.newContext({ viewport: { width: w, height: 900 } });
  const p = await ctx.newPage(); await p.goto(BASE + "/paper", { waitUntil: "networkidle" }); await p.waitForTimeout(2500);
  for (const y of [2000, 4000, 5200]) { await p.evaluate((y) => { document.querySelector(".paper-scroll").scrollTop = y; }, y); await p.waitForTimeout(1000); }
  for (const [k, css] of [["head", ""], ["cure", RULE]]) {
    out[`${k}-${w}`] = await p.evaluate((css) => {
      let st = document.getElementById("c6"); if (!st) { st = document.createElement("style"); st.id = "c6"; document.head.append(st); } st.textContent = css;
      const res = [];
      const blocks = [...document.querySelectorAll(".paper-article p, .paper-article .math-block, .paper-article .theorem-block, .paper-article ul, .paper-article ol, .paper-article figure, .paper-article .section-header--chapter")];
      for (const h of document.querySelectorAll(".section-header--sub")) {
        h.style.position = "relative"; h.style.top = "0";
        const ht = h.querySelector(".section-heading").getBoundingClientRect();
        const above = blocks.filter(b => !h.contains(b) && b.getBoundingClientRect().bottom <= ht.top + 1).map(b => b.getBoundingClientRect().bottom);
        const below = blocks.filter(b => !h.contains(b) && b.getBoundingClientRect().top >= ht.bottom - 1).map(b => b.getBoundingClientRect().top);
        res.push({ text: h.textContent.trim().slice(0, 30), above: above.length ? Math.round(ht.top - Math.max(...above)) : null, below: below.length ? Math.round(Math.min(...below) - ht.bottom) : null });
        h.style.position = ""; h.style.top = "";
      }
      return res;
    }, css);
  }
  await ctx.close();
}
console.log(JSON.stringify(out, null, 1));
await b.close();
