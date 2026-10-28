import { chromium } from "/Users/mkbabb/Programming/fourier-analysis/web/node_modules/playwright/index.mjs";
const BASE = process.argv[2] ?? "http://localhost:4191";
const browser = await chromium.launch();
try {
  for (const r of ["/paper", "/visualize", "/v/hazy-etching-cream-elk", "/gallery", "/equation", "/morph"]) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    try {
      const p = await ctx.newPage();
      await p.goto(BASE + r, { waitUntil: "load" });
      await p.waitForTimeout(3000);
      const d = await p.evaluate(() => { const m = document.querySelector("main"); const walk = (el, dep) => dep > 3 ? [] : [...el.children].flatMap(c => [`${"  ".repeat(dep)}${c.tagName.toLowerCase()}.${[...c.classList].slice(0,3).join(".")}${c.getAttribute("aria-busy")?"[busy]":""}`, ...walk(c, dep + 1)]); return walk(m, 0).slice(0, 18).join("\n"); });
      console.log("==", r, "\n" + d);
    } finally { await ctx.close(); }
  }
} finally { await browser.close(); }
