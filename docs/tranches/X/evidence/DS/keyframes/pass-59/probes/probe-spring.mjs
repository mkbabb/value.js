import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const OUT = process.env.OUT ?? ".";
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  for (const scheme of (process.env.SCHEMES ?? "light").split(",")) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme });
  const page = await ctx.newPage();
  try {
    await page.goto(`http://localhost:${process.env.PORT ?? 5197}/#/spring`, { waitUntil: "load" }); await page.waitForTimeout(3500);
    const m = () => page.evaluate(() => {
      const p = document.querySelector("[data-fold-key=spring-physics]"); if (!p) return null; const b = p.getBoundingClientRect();
      const rows = [...p.querySelectorAll(".param-row, [data-figure-title], [data-preset-tile], .spring-heatmap-section canvas, button")].map(e => { const r = e.getBoundingClientRect(); return [(e.textContent || e.tagName).trim().slice(0, 14), Math.round(r.top), Math.round(r.bottom)]; }).filter(r => r[2] > b.top - 40 && r[1] < b.bottom + 10);
      return { port: [Math.round(b.top), Math.round(b.bottom)], st: Math.round(p.scrollTop), sh: p.scrollHeight, ch: p.clientHeight, headed: p.hasAttribute("data-fold-headed"), fadeStart: getComputedStyle(p).maskImage?.slice(0, 80), rows };
    });
    console.log(scheme, "closed", JSON.stringify(await m()));
    await page.click("[data-figure-title]"); await page.waitForTimeout(1800);
    console.log(scheme, "open", JSON.stringify(await m()));
    await page.screenshot({ path: `${OUT}/spring-peak-1440-${scheme}.png` });
  } finally { await ctx.close(); }
  }
} finally { await browser.close(); }
