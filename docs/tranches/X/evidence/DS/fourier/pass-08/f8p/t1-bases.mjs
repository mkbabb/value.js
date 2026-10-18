// DS-F8C-T1: the KaTeX bases of the overflowing inline formulas at 390 (one browser, closed in finally; headless, §0ei).
import { chromium } from "/Users/mkbabb/Programming/fourier-analysis/web/node_modules/playwright/index.mjs";
const BASE = process.argv[2] ?? "http://localhost:3217";
const b = await chromium.launch({ channel: "chrome", headless: true });
try {
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const p = await ctx.newPage();
  await p.goto(BASE + "/paper", { waitUntil: "domcontentloaded", timeout: 90000 }); await p.waitForTimeout(5000);
  const seen = {};
  for (let f = 0; f <= 1.0001; f += 0.01) {
    await p.evaluate((f) => { const e = document.querySelector(".paper-scroll"); e.scrollTop = (e.scrollHeight - e.clientHeight) * f; }, f);
    await p.waitForTimeout(250);
    Object.assign(seen, await p.evaluate(() => {
      const art = document.querySelector(".paper-article"); const o = {}; if (!art) return o;
      for (const k of art.querySelectorAll(".katex")) {
        if (k.closest(".katex-display") || k.parentElement.closest(".katex")) continue;
        const host = k.parentElement.closest("p, li, dd, div"); const hr = host.getBoundingClientRect(); const pr = parseFloat(getComputedStyle(host).paddingRight);
        const edge = hr.right - pr; const x = k.getBoundingClientRect(); if (x.right <= edge + 1) continue;
        const t = k.querySelector("annotation")?.textContent.slice(0, 60);
        o[t] = { hostTag: host.tagName + "." + host.className, hostWidth: Math.round(hr.width - pr - parseFloat(getComputedStyle(host).paddingLeft)), over: Math.round(x.right - edge), bases: [...k.querySelectorAll(".katex-html > .base")].map((e) => Math.round(e.getBoundingClientRect().width)), hostWS: getComputedStyle(host).whiteSpace, katexWS: getComputedStyle(k).whiteSpace };
      }
      return o;
    }));
  }
  console.log(JSON.stringify(seen, null, 1));
  await ctx.close();
} finally { await b.close(); }
