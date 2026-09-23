// Read-only probe: the phase Chip's inline tone style + paint during a morph; which element scrolls /morph.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const browser = await chromium.launch({ headless: false, args: ["--enable-gpu", "--ignore-gpu-blocklist"] });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.goto("http://localhost:3100/morph", { waitUntil: "networkidle" }); await page.waitForTimeout(1200);
const r = await page.evaluate(() => new Promise((res) => {
  const chip = () => { const c = document.querySelector(".desktop-info .glass-chip"); const cs = getComputedStyle(c); return { t: c.textContent.trim(), style: c.getAttribute("style"), bg: cs.backgroundColor, color: cs.color, border: cs.borderColor }; };
  const idle = chip(); document.querySelector(".morph-button").click();
  setTimeout(() => { const mid = chip();
    const scrollers = [...document.querySelectorAll("*")].filter((e) => { const s = getComputedStyle(e); return /(auto|scroll)/.test(s.overflowY) && e.scrollHeight > e.clientHeight + 2; })
      .map((e) => { const b = e.getBoundingClientRect(); return { tag: e.tagName, cls: String(e.className).slice(0, 80), x: Math.round(b.x), w: Math.round(b.width), sh: e.scrollHeight, ch: e.clientHeight }; });
    res({ idle, mid, scrollers }); }, 80);
}));
await page.waitForTimeout(800);
await page.screenshot({ path: new URL("./d-light-8-scroller-rail.png", import.meta.url).pathname });
await browser.close();
writeFileSync(new URL("./probe-tone-scroller.json", import.meta.url), JSON.stringify(r, null, 1));
console.log(JSON.stringify(r));
