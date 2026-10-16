// X-DS fourier pass 14 cure (F14X): AFTER frames + computed stroke reads for DS-F14X-P1 (the stage plate's line weight vs the levels tiles). Headless real Chrome (§0ei).
// usage: BASE=http://localhost:3134 node f14x-probe.mjs <outDir>
import { chromium } from "/Users/mkbabb/Programming/fourier-analysis/web/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = process.argv[2]; const BASE = process.env.BASE ?? "http://localhost:3134";
const out = {};

// Rendered stroke weight in css px: stroke-width (user units) x the svg's user-to-css scale, unless the path is non-scaling.
const read = (p) => p.evaluate(() => {
  const weigh = (path) => {
    const svg = path.ownerSVGElement; const cs = getComputedStyle(path);
    const vb = svg.viewBox.baseVal; const r = svg.getBoundingClientRect();
    const scale = Math.min(r.width / vb.width, r.height / vb.height);
    const w = parseFloat(cs.strokeWidth); const ns = cs.vectorEffect === "non-scaling-stroke";
    return { svgPx: +r.width.toFixed(1), strokeWidth: w, vectorEffect: cs.vectorEffect, stroke: cs.stroke, renderedPx: +(ns ? w : w * scale).toFixed(2) };
  };
  const plate = document.querySelector(".morph-button path");
  const tile = document.querySelector(".levels-card .grid-cell path");
  const a = plate && weigh(plate), b = tile && weigh(tile);
  return { plate: a, tile: b, ratio: a && b ? +(a.renderedPx / b.renderedPx).toFixed(2) : null };
});

const b = await chromium.launch({ channel: "chrome", headless: true });
try {
  for (const theme of ["light", "dark"]) {
    const ctxOf = (w) => b.newContext({ viewport: { width: w, height: w > 500 ? 900 : 844 }, colorScheme: theme, deviceScaleFactor: 2, ...(w < 500 ? { isMobile: true, hasTouch: true } : {}) });
    const init = (ctx) => ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); localStorage.setItem("theme", t); } catch {} }, theme);
    for (const w of [1440, 1024, 390]) {
      const k = `morph-${theme}-${w}`; const ctx = await ctxOf(w); await init(ctx); const p = await ctx.newPage();
      try {
        await p.mouse.move(0, 0).catch(() => {});
        await p.goto(BASE + "/morph", { waitUntil: "domcontentloaded", timeout: 90000 });
        await p.waitForLoadState("networkidle", { timeout: 30000 }).catch(() => {}); await p.waitForTimeout(3000);
        await p.screenshot({ path: `${OUT}/${k}-stage.png` });
        await p.locator(".levels-card").scrollIntoViewIfNeeded(); await p.waitForTimeout(400);
        out[k] = await read(p);
        await p.screenshot({ path: `${OUT}/${k}-levels.png` });
      } catch (e) { out[k + "-err"] = e.message.slice(0, 300); }
      finally { await ctx.close(); }
    }
  }
} finally { await b.close(); writeFileSync(`${OUT}/f14x-probe.json`, JSON.stringify(out, null, 1)); }
