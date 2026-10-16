// X-DS keyframes r7 pass 8 — cure seat geometry for KF-C8r-03 (Square plate at 390). Headless real Chrome (§0ei).
import fs from "node:fs"; import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const out = process.argv[2] ?? "geo.json";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const res = {};
try {
  for (const [w, h] of [[390, 844], [1440, 900]]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    await page.goto("http://localhost:5173/#/square", { waitUntil: "load" }); await page.waitForTimeout(4000);
    res[w] = await page.evaluate(() => {
      const r = (e) => { if (!e) return null; const b = e.getBoundingClientRect(); return { t: Math.round(b.top), b: Math.round(b.bottom), l: Math.round(b.left), w: Math.round(b.width), h: Math.round(b.height) }; };
      const st = document.querySelector(".square-stage");
      const anc = []; let e = st; while (e && e !== document.body) { const cs = getComputedStyle(e); anc.push({ cls: (e.className?.baseVal ?? e.className).toString().slice(0, 60), ct: cs.containerType, r: r(e) }); e = e.parentElement; }
      const sheet = [...document.querySelectorAll(".pane-frame")].find((x) => x.checkVisibility());
      return { plate: r(st), header: r(document.querySelector(".square-telemetry")), arena: r(document.querySelector(".square-arena")), field: r(document.querySelector(".square-field")),
        caption: r(document.querySelector(".square-arena .square-legend, .square-arena [class*=caption], .square-arena figcaption")),
        box: r(document.querySelector(".demo-box")), sheet: r(sheet), pad: getComputedStyle(st).getPropertyValue("--stage-plate-pad-inline").trim(), anc };
    });
    await ctx.close();
  }
} finally { await browser.close(); }
fs.writeFileSync(out, JSON.stringify(res, null, 1)); console.log(JSON.stringify(res, null, 1));
