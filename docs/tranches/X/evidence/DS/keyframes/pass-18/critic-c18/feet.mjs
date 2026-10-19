import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const BASE = "http://localhost:5173/";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const out = {};
try {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
  for (const r of ["cube", "amiga", "square", "easing", "spring", "sequence"]) {
    const page = await ctx.newPage();
    await page.goto(BASE + "#/" + r, { waitUntil: "load" }); await page.waitForTimeout(3000);
    out[r] = await page.evaluate(() => {
      const cards = [...document.querySelectorAll("*")].filter((e) => { const b = e.getBoundingClientRect(); const cs = getComputedStyle(e); return b.width > 300 && b.height > 300 && b.top > 100 && b.top < 140 && parseFloat(cs.borderTopWidth) > 0; }).map((e) => { const b = e.getBoundingClientRect(); return { cls: e.className.toString().slice(0, 50), l: Math.round(b.left), t: +b.top.toFixed(1), b: +b.bottom.toFixed(1), w: Math.round(b.width) }; });
      const sc = document.querySelector(".easing-catalogue, [class*=catalogue]");
      let cat = null; if (sc) { const vp = [...sc.querySelectorAll("*")].find((e) => e.scrollHeight > e.clientHeight + 4 && /auto|scroll/.test(getComputedStyle(e).overflowY)); if (vp) { const b = vp.getBoundingClientRect(); cat = { vpBottom: +b.bottom.toFixed(1), mask: getComputedStyle(vp).maskImage.slice(0, 140) }; } }
      return { cards, cat };
    });
    await page.close();
  }
  await ctx.close();
} finally { await browser.close(); }
console.log(JSON.stringify(out, null, 1));
