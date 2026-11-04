import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/value.js/node_modules/");
const { webkit } = require("playwright");
const OUT = process.env.HOME + "/.dev-logs/x-0hm/rv1/r2";
const browser = await webkit.launch();
try {
  for (const sch of ["dark", "light"]) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: sch });
    try {
      const p = await ctx.newPage();
      await p.goto("https://color.babb.dev/", { waitUntil: "load" }); await p.waitForTimeout(4000);
      const cls = await p.evaluate(() => document.querySelector(".atmosphere-canvas")?.className ?? "none");
      console.log(sch, cls);
      for (const t of [0, 6]) { if (t) await p.waitForTimeout(6000); await p.screenshot({ path: `${OUT}/wk-${sch}-${t}.png`, clip: { x: 0, y: 790, width: 1440, height: 110 } }); }
      await p.screenshot({ path: `${OUT}/wk-${sch}-full.png`, scale: "css" });
      const raf = await p.evaluate(() => new Promise((r) => { const d = []; let last = performance.now(); const end = last + 3000; const f = (t) => { d.push(t - last); last = t; if (t < end) requestAnimationFrame(f); else { d.sort((a, b) => a - b); r({ n: d.length, p50: +d[d.length >> 1].toFixed(1), p95: +d[Math.floor(d.length * 0.95)].toFixed(1), max: +d[d.length - 1].toFixed(1) }); } }; requestAnimationFrame(f); }));
      console.log(sch, JSON.stringify(raf));
    } finally { await ctx.close(); }
  }
} finally { await browser.close(); }
