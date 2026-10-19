// X-DS keyframes pass 5 (r8) cure seat — measure the easing drawer fold and the square reach. Headless real Chrome (§0ei).
import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const BASE = "http://localhost:5173/";
const out = {};
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  for (const [w, h] of [[1440, 900], [390, 844]]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: "light", deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    try {
      await page.goto(`${BASE}#/easing`, { waitUntil: "load" }); await page.waitForTimeout(3500);
      out[`easing-${w}`] = await page.evaluate(() => {
        const d = document.querySelector(".easing-target .specimen-drawer");
        const b = d.getBoundingClientRect(); const cs = getComputedStyle(d);
        const plate = document.querySelector(".easing-target").getBoundingClientRect();
        const rows = [...d.querySelectorAll(".catalogue-family, .specimen-tile")].map((e) => { const r = e.getBoundingClientRect(); return { k: e.classList.contains("catalogue-family") ? "H:" + e.textContent.trim() : "T:" + e.textContent.trim().slice(0, 14), top: Math.round(r.top), bottom: Math.round(r.bottom) }; }).filter((r) => r.top < b.bottom + 200);
        return { drawer: { top: Math.round(b.top), bottom: Math.round(b.bottom), client: d.clientHeight, scrollTop: d.scrollTop, scrollH: d.scrollHeight, maxBS: d.style.maxBlockSize, fadeEnd: cs.getPropertyValue("--fade-end"), mask: cs.maskImage.slice(0, 120) }, plateBottom: Math.round(plate.bottom), rows };
      });
      await page.goto(`${BASE}#/square`, { waitUntil: "load" }); await page.waitForTimeout(3500);
      out[`square-${w}`] = await page.evaluate(() => {
        const f = document.querySelector(".square-field").getBoundingClientRect();
        const box = document.querySelector(".demo-box").getBoundingClientRect();
        const plate = document.querySelector(".square-arena")?.closest("[class*=card], .glass-resting") ?? document.querySelector(".square-arena");
        const p = plate.getBoundingClientRect(); const ar = document.querySelector(".square-arena").getBoundingClientRect();
        const pad = getComputedStyle(document.querySelector(".square-arena")).getPropertyValue("--stage-plate-pad-inline");
        return { field: [Math.round(f.left), Math.round(f.width), Math.round(f.top), Math.round(f.bottom)], box: [Math.round(box.width)], plate: [Math.round(p.left), Math.round(p.width), Math.round(p.top), Math.round(p.bottom)], arena: [Math.round(ar.width), Math.round(ar.height)], pad };
      });
    } finally { await ctx.close(); }
  }
} finally { await browser.close(); console.log(JSON.stringify(out, null, 1)); }
