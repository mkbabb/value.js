// X-DS fourier pass 8 (critic F8C) · DS-F8C-T1 scan: every KaTeX box on /paper at 390 whose ink passes the article's
// content edge, after rendering each section into view. Headless real Chrome (§0ei); one browser, closed in finally.
import { chromium } from "/Users/mkbabb/Programming/fourier-analysis/web/node_modules/playwright/index.mjs";
const BASE = process.argv[2] ?? "http://localhost:3217";
const b = await chromium.launch({ channel: "chrome", headless: true });
try {
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
  const p = await ctx.newPage();
  await p.goto(BASE + "/paper", { waitUntil: "domcontentloaded", timeout: 90000 }); await p.waitForTimeout(5000);
  const hits = new Map();
  for (let f = 0; f <= 1.0001; f += 0.01) {
    await p.evaluate((f) => { const e = document.querySelector(".paper-scroll"); e.scrollTop = (e.scrollHeight - e.clientHeight) * f; }, f);
    await p.waitForTimeout(250);
    const r = await p.evaluate(() => {
      const art = document.querySelector(".paper-article"); if (!art) return [];
      const a = art.getBoundingClientRect(); const cs = getComputedStyle(art); const edge = a.right - parseFloat(cs.paddingRight);
      const out = [];
      for (const k of art.querySelectorAll(".katex")) {
        if (k.parentElement.closest(".katex")) continue;
        const x = k.getBoundingClientRect(); if (x.width === 0) continue;
        const disp = k.closest(".katex-display");
        const box = disp ?? k;
        if (x.right > edge + 1) out.push({ inline: !disp, text: k.querySelector("annotation")?.textContent.slice(0, 90), right: Math.round(x.right), edge: Math.round(edge), dispScrolls: disp ? disp.scrollWidth > disp.clientWidth : null, dispRight: disp ? Math.round(disp.getBoundingClientRect().right) : null, inTheorem: !!k.closest(".theorem-block, [class*=theorem]") });
      }
      return out;
    });
    for (const h of r) if (!hits.has(h.text)) hits.set(h.text, h);
  }
  console.log(JSON.stringify([...hits.values()], null, 1));
  await ctx.close();
} finally { await b.close(); }
