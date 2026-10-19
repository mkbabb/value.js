// X-DS kf pass 8 (KF-C8-04) — the square stage's geometry at 1440. Headless real Chrome (§0ei).
import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  const ctx = await browser.newContext({ viewport: { width: Number(process.env.W ?? 1440), height: Number(process.env.H ?? 900) } });
  const page = await ctx.newPage();
  await page.goto("http://localhost:5173/#/square", { waitUntil: "load" }); await page.waitForTimeout(4000);
  const m = await page.evaluate(() => {
    const R = (s) => { const e = document.querySelector(s); if (!e) return null; const r = e.getBoundingClientRect(); return [Math.round(r.left), Math.round(r.top), Math.round(r.width), Math.round(r.height)]; };
    const box = document.querySelector(".square-arena > *");
    return { stage: R(".square-stage"), telemetry: R(".square-telemetry"), arena: R(".square-arena"),
      kids: [...document.querySelectorAll(".square-arena > *")].map((e) => [e.className.toString().slice(0, 40), ...Object.values(e.getBoundingClientRect().toJSON()).slice(0, 4).map(Math.round)]),
      size: box && getComputedStyle(box).getPropertyValue("--square-size"), travel: box && getComputedStyle(box).getPropertyValue("--square-travel"),
      caption: R(".square-stage figcaption, .square-caption"), stageCls: document.querySelector(".square-stage")?.className };
  });
  console.log(JSON.stringify(m, null, 1));
} finally { await browser.close(); }
