// F6X: /morph Metric label vs value font sizes at 390 coarse and 1440 fine. Headless real Chrome.
import { chromium } from "/Users/mkbabb/Programming/fourier-analysis/web/node_modules/playwright/index.mjs";
const b = await chromium.launch({ channel: "chrome", headless: true });
try { for (const [w, m] of [[390, true], [1440, false]]) {
  const ctx = await b.newContext({ viewport: { width: w, height: 844 }, isMobile: m, hasTouch: m });
  const p = await ctx.newPage(); await p.goto("http://localhost:3100/morph", { waitUntil: "networkidle" }); await p.waitForTimeout(2000);
  console.log(w, JSON.stringify(await p.evaluate(() => [...document.querySelectorAll(".demo-info > *")].map((e) => [...e.querySelectorAll("*")].filter(c=>c.children.length===0).map((c) => { const s = getComputedStyle(c); return [c.className.slice(0,30), c.textContent.trim(), s.fontSize, s.fontFamily.slice(0,20), s.fontWeight, s.letterSpacing]; })))));
  await ctx.close(); } } finally { await b.close(); }
