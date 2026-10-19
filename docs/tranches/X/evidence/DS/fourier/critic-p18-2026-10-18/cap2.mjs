// X-DS fourier critic pass 18: /paper title block at scroll 0, plus geometry. Headless real Chrome (§0ei).
import { chromium } from "/Users/mkbabb/Programming/fourier-analysis/web/node_modules/playwright/index.mjs";
const OUT = process.argv[2];
const b = await chromium.launch({ channel: "chrome", headless: true });
try {
  for (const [theme, w, h] of [["light", 1440, 900], ["light", 390, 844]]) {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, colorScheme: theme, deviceScaleFactor: 2, ...(w < 1024 ? { isMobile: true, hasTouch: true } : {}) });
    try {
      const p = await ctx.newPage();
      await p.goto("http://localhost:3100/paper", { waitUntil: "domcontentloaded", timeout: 90000 });
      await p.waitForLoadState("networkidle", { timeout: 20000 }).catch(() => {});
      await p.waitForTimeout(6000); await p.mouse.move(0, 0);
      await p.screenshot({ path: `${OUT}/paper-top-${theme}-${w}.png` });
      const geo = await p.evaluate(() => {
        const r = (s) => { const e = document.querySelector(s); if (!e) return null; const b = e.getBoundingClientRect(); return { top: Math.round(b.top), bottom: Math.round(b.bottom), h: Math.round(b.height), text: (e.textContent || "").trim().slice(0, 60) }; };
        const art = document.querySelector(".paper-article");
        const kids = art ? [...art.querySelectorAll("header *, .paper-title, .paper-author, .paper-date, .paper-abstract, h1, h2")].slice(0, 14).map((e) => { const b = e.getBoundingClientRect(); return { tag: e.tagName, cls: String(e.className).slice(0, 50), top: Math.round(b.top), h: Math.round(b.height), t: (e.textContent || "").trim().slice(0, 30) }; }) : [];
        return { article: r(".paper-article"), kids };
      });
      console.log(theme, w, JSON.stringify(geo));
    } finally { await ctx.close(); }
  }
} finally { await b.close(); }
