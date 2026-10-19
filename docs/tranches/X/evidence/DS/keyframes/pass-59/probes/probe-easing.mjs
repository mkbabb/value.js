import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const BASE = process.env.BASE ?? "http://localhost:5197/";
const sizes = (process.env.SIZES ?? "390x844,1440x900").split(",").map(s => s.split("x").map(Number));
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  for (const [w, h] of sizes) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: w === 390 ? 2 : 1 });
    const page = await ctx.newPage();
    try {
      await page.goto(`${BASE}#/easing`, { waitUntil: "load" }); await page.waitForTimeout(3500);
      if (process.env.SHOT) await page.screenshot({ path: `${process.env.SHOT}-${w}.png` });
      const r = await page.evaluate(() => {
        const R = (e) => { if (!e) return null; const q = e.getBoundingClientRect(); return [Math.round(q.top), Math.round(q.bottom)]; };
        const d = document.querySelector(".easing-target .specimen-drawer");
        const fold = d.getBoundingClientRect().top + d.clientTop + d.clientHeight;
        const heads = [...d.querySelectorAll(".catalogue-family")].map(e => [e.textContent.trim(), ...R(e)]).filter(x => x[1] < fold + 100 && x[2] > fold - 120);
        const tiles = [...d.querySelectorAll(".specimen-tile")].map(e => R(e)).filter(x => x[0] < fold + 100 && x[1] > fold - 60);
        return { card: R(document.querySelector(".easing-target")), cat: R(document.querySelector(".easing-target .easing-catalogue")), drawer: R(d), fold: Math.round(fold), maxBS: d.style.maxBlockSize, mb: getComputedStyle(d).marginBlockEnd, pad: getComputedStyle(document.querySelector(".easing-target")).paddingBlockEnd, heads, tiles: [...new Set(tiles.map(String))], scrollH: d.scrollHeight };
      });
      console.log(w, JSON.stringify(r));
    } finally { await ctx.close(); }
  }
} finally { await browser.close(); }
