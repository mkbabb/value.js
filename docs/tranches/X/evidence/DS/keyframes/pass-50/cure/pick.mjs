// KF-C5p-06 side check: after a pick far down the catalogue (landTop's scroll), the re-landed fold still crosses no heading and shows no sliver. Headless real Chrome (§0ei).
import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const browser = await chromium.launch({ channel: "chrome", headless: true });
const res = {};
try {
  for (const [w, h] of [[1440, 900], [390, 844]]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h } });
    const page = await ctx.newPage();
    try {
      await page.goto("http://localhost:5173/#/easing", { waitUntil: "load" }); await page.waitForTimeout(3000);
      for (const name of ["ease-in-out-expo", "ease-in-back", "steps"]) {
        await page.evaluate((n) => { const t = [...document.querySelectorAll(".easing-target .specimen-tile")].find((e) => e.textContent.trim().startsWith(n)); t.scrollIntoView({ block: "nearest" }); t.click(); }, name);
        await page.waitForTimeout(1500);
        res[`${w}-${name}`] = await page.evaluate(() => {
          const d = document.querySelector(".easing-target .specimen-drawer"); const b = d.getBoundingClientRect(); const fold = b.top + d.clientTop + d.clientHeight;
          return { scrollTop: Math.round(d.scrollTop), maxBS: d.style.maxBlockSize, crossing: [...d.querySelectorAll(".catalogue-family, .specimen-tile")].map((e) => { const r = e.getBoundingClientRect(); return { k: e.textContent.trim().slice(0, 14), shown: Math.round((fold - r.top) * 10) / 10, h: Math.round(r.height) }; }).filter((r) => r.shown > 0.5 && r.shown < r.h - 0.5) };
        });
      }
    } finally { await ctx.close(); }
  }
} finally { await browser.close(); console.log(JSON.stringify(res)); }
