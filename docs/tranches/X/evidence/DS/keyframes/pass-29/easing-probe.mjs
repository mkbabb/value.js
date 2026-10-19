// X-DS keyframes r6 pass 4 (critic C4) — KF-R6C4-01 probe. Headless real Chrome only (§0ei).
// #/easing: the stage plate (.easing-target) ends with the drawer (.specimen-drawer); the band
// between the drawer's foot and the plate's foot is the plate's padding plus the drawer's inset.
import fs from "node:fs"; import path from "node:path"; import { createRequire } from "node:module"; import { fileURLToPath } from "node:url";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const HERE = path.dirname(fileURLToPath(import.meta.url));
const BASE = process.env.BASE ?? "http://localhost:5173/";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const out = {};
try {
  for (const [w, h] of [[1440, 900], [1280, 800], [1024, 768], [390, 844]]) for (const scheme of ["light", "dark"]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: scheme });
    const page = await ctx.newPage();
    await page.goto(`${BASE}#/easing`, { waitUntil: "load" }); await page.waitForTimeout(Number(process.env.SETTLE ?? 3500));
    out[`${w}-${scheme}`] = await page.evaluate(() => {
      const card = document.querySelector(".easing-target"), d = card.querySelector(".specimen-drawer");
      const c = card.getBoundingClientRect(), r = d.getBoundingClientRect(), host = card.parentElement.getBoundingClientRect();
      return { cardTop: +c.top.toFixed(1), cardBottom: +c.bottom.toFixed(1), hostBottom: +host.bottom.toFixed(1), drawerBottom: +r.bottom.toFixed(1),
        band: +(c.bottom - r.bottom).toFixed(1), drawerH: d.clientHeight, scrollH: d.scrollHeight, maxBlock: d.style.maxBlockSize || null };
    });
    await ctx.close();
  }
} finally { await browser.close(); }
const file = path.join(HERE, process.env.JSON ?? "easing-probe.json");
fs.writeFileSync(file, JSON.stringify(out, null, 1)); console.log(JSON.stringify(out));
