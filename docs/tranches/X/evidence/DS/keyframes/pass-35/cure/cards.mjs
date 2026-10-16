import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  for (const r of ["spring", "easing", "square", "sequence", "cube"]) {
    await page.goto(`http://localhost:5173/#/${r}`); await page.reload(); await page.waitForTimeout(3500);
    const cards = await page.evaluate(() => [...document.querySelectorAll("[data-slot=card], .glass-card, [class*=card]")].map((e) => { const b = e.getBoundingClientRect(); return { c: (e.getAttribute("class") || "").slice(0, 90), slot: e.getAttribute("data-slot"), t: Math.round(b.top), b: Math.round(b.bottom), x: Math.round(b.left), w: Math.round(b.width) }; }).filter((c) => c.w > 250 && c.t > 80 && c.t < 200));
    console.log(r, JSON.stringify(cards));
  }
} finally { await browser.close(); }
