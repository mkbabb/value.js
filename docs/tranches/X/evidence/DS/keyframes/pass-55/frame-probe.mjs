// pass 10: dump the spring pane frame's children geometry (headless real Chrome; closed in finally).
import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const BASE = process.env.BASE ?? "http://localhost:5193/";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const out = {};
try {
  for (const [w, h] of [[1440, 1080], [1440, 900]]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h } }); const page = await ctx.newPage();
    try {
      await page.goto(`${BASE}#/spring`, { waitUntil: "load" }); await page.waitForTimeout(3500);
      for (const state of ["rest", "open"]) {
        if (state === "open") { await page.locator(".spring-heatmap-section [data-figure-title]").first().click(); await page.waitForTimeout(1500); }
        out[`${w}x${h}-${state}`] = await page.evaluate(() => {
          const f = document.querySelector(".pane-frame"); const fr = f.getBoundingClientRect();
          const walk = (e, d) => { const r = e.getBoundingClientRect(); const cs = getComputedStyle(e); const row = `${"  ".repeat(d)}${e.tagName.toLowerCase()}.${[...e.classList].slice(0, 4).join(".")} ${Math.round(r.top)}-${Math.round(r.bottom)} h=${Math.round(r.height)} flex=${cs.flex} mbs=${cs.maxBlockSize} pad=${cs.paddingBlockEnd} gap=${cs.rowGap}`;
            return d < 3 ? [row, ...[...e.children].flatMap((c) => walk(c, d + 1))] : [row]; };
          return { frame: [Math.round(fr.top), Math.round(fr.bottom)], tree: walk(f, 0) };
        });
      }
    } finally { await ctx.close(); }
  }
} finally { await browser.close(); console.log(JSON.stringify(out, null, 1)); }
