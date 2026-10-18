// X-DS value pass 9 (V9C-02): the scalar row's label-to-rail rhythm on Extract, Generate,
// Atmosphere and Blob, plus Gradient's Direction. Real Chrome, new headless (§0ei); one browser,
// a context per cell, both closed in a finally.   usage: node probe-v9c02.mjs [base] [out]
import fs from "node:fs";
import { chromium } from "@playwright/test";
import { bootRoute, newPage } from "./harness.mjs";
const BASE = process.argv[2] || "http://localhost:9271";
const OUT = process.argv[3] || new URL("probe-v9c02.json", import.meta.url).pathname;
const ROUTES = ["extract", "generate", "gradient", "atmosphere", "blob"];
const READ = () => [...document.querySelectorAll('main [data-slot="slider"][data-variant="scrubber"], main .glass-slider[data-size="sm"]')]
  .filter((s, i, a) => a.indexOf(s) === i && s.getBoundingClientRect().height > 0).slice(0, 4).map((s) => {
    let row = s.parentElement; while (row && !row.querySelector("label")) row = row.parentElement;
    const label = row?.querySelector("label"); const track = s.querySelector(".slider-track");
    const lr = label?.getBoundingClientRect(), sr = s.getBoundingClientRect(), tr = track?.getBoundingClientRect();
    return { label: label?.textContent.trim(), labelBottom: lr && Math.round(lr.bottom), sliderTop: Math.round(sr.top), sliderH: Math.round(sr.height),
      trackTop: tr && Math.round(tr.top), labelToTrack: lr && tr && Math.round(tr.top - lr.bottom), parentH: Math.round(s.parentElement.getBoundingClientRect().height) };
  });
const out = [];
const browser = await chromium.launch({ channel: "chrome", headless: true, timeout: 300_000 });
try {
  for (const width of [1440, 390]) for (const r of ROUTES) {
    let page;
    try { page = await newPage(browser, width, "light"); await bootRoute(page, `${BASE}/#/${r}`); out.push({ r, width, rows: await page.evaluate(READ) }); }
    catch (e) { out.push({ r, width, e: String(e).slice(0, 200) }); }
    finally { try { await page?.context().close(); } catch {} }
  }
} finally { await browser.close(); fs.writeFileSync(OUT, JSON.stringify(out, null, 1)); }
console.log(JSON.stringify(out));
