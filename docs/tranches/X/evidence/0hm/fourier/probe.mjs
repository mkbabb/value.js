import { createRequire } from "node:module";
import { writeFileSync, mkdirSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/value.js/package.json");
const { chromium } = require("playwright");
const OUT = process.env.OUT || "/Users/mkbabb/.dev-logs/x-0hm/seat3/r1";
mkdirSync(OUT, { recursive: true });
const BASE = "https://fourier.babb.dev";
const ALL = ["/paper", "/w", "/gallery", "/equation", "/morph", "/nope-404"];
const cells = [
  { tag: "d1440L", vp: [1440, 900], dsf: 1, scheme: "light", routes: ALL },
  { tag: "d1800D", vp: [1800, 1000], dsf: 2, scheme: "dark", routes: ALL },
  { tag: "m390D", vp: [390, 844], dsf: 3, scheme: "dark", routes: ALL, mobile: true },
  { tag: "m390L", vp: [390, 844], dsf: 3, scheme: "light", routes: ["/paper", "/w", "/equation"], mobile: true },
  { tag: "m430D", vp: [430, 932], dsf: 3, scheme: "dark", routes: ["/paper", "/w", "/gallery"], mobile: true },
  { tag: "l844D", vp: [844, 390], dsf: 3, scheme: "dark", routes: ["/paper", "/w", "/equation", "/morph"], mobile: true },
];
const results = [];
const browser = await chromium.launch({ headless: true });
try {
  for (const c of cells) {
    for (const r of c.routes) {
      const ctx = await browser.newContext({
        viewport: { width: c.vp[0], height: c.vp[1] }, deviceScaleFactor: c.dsf,
        colorScheme: c.scheme, isMobile: !!c.mobile, hasTouch: !!c.mobile,
      });
      const page = await ctx.newPage();
      const errs = [];
      page.on("console", (m) => m.type() === "error" && errs.push(m.text().slice(0, 160)));
      page.on("pageerror", (e) => errs.push("PAGEERR " + String(e).slice(0, 160)));
      const row = { cell: c.tag, route: r };
      try {
        const t0 = Date.now();
        await page.goto(BASE + r, { waitUntil: "networkidle", timeout: 30000 }).catch(() => {});
        row.loadMs = Date.now() - t0;
        await page.waitForTimeout(2500);
        row.url = page.url().replace(BASE, "");
        Object.assign(row, await page.evaluate(async () => {
          const de = document.documentElement;
          const vw = innerWidth, vh = innerHeight;
          const off = [];
          for (const el of document.querySelectorAll("body *")) {
            const b = el.getBoundingClientRect();
            if (b.width < 2 || b.height < 2) continue;
            const cs = getComputedStyle(el);
            if (cs.visibility === "hidden" || cs.display === "none" || +cs.opacity === 0) continue;
            if (b.right > vw + 1 || b.left < -1) {
              if (off.length < 6) off.push(`${el.tagName.toLowerCase()}.${String(el.className).slice(0, 40)} L${b.left | 0} R${b.right | 0}`);
            }
          }
          const fs = (sel) => { const e = document.querySelector(sel); if (!e) return null; const s = getComputedStyle(e); return `${s.fontSize}/${s.fontWeight}/${s.fontFamily.split(",")[0]}`; };
          const h = [...document.querySelectorAll("h1,h2,h3")].slice(0, 6).map((e) => { const s = getComputedStyle(e); const b = e.getBoundingClientRect(); return `${e.tagName}:${s.fontSize}:${s.fontFamily.split(",")[0]}:${(e.textContent || "").trim().slice(0, 28)}@${b.left | 0},${b.top | 0}w${b.width | 0}`; });
          const canv = [...document.querySelectorAll("canvas")].map((cv) => { const b = cv.getBoundingClientRect(); return `${b.width | 0}x${b.height | 0}@${b.left | 0},${b.top | 0} bs${cv.width}x${cv.height}`; });
          const docks = [...document.querySelectorAll("[class*=dock]")].filter((e) => /\bdock\b|glass-dock|dock-root/.test(e.className)).slice(0, 4).map((e) => { const b = e.getBoundingClientRect(); return `${String(e.className).slice(0, 30)} ${b.left | 0},${b.top | 0} ${b.width | 0}x${b.height | 0}`; });
          // rAF timing 3s
          const ds = []; let last = performance.now();
          await new Promise((res) => { const end = last + 3000; const f = (t) => { ds.push(t - last); last = t; t < end ? requestAnimationFrame(f) : res(); }; requestAnimationFrame(f); });
          ds.sort((a, b) => a - b);
          const q = (p) => +ds[Math.min(ds.length - 1, Math.floor(p * ds.length))].toFixed(1);
          return {
            title: document.title, overflowX: de.scrollWidth - vw, docH: de.scrollHeight,
            offscreen: off, bodyFont: fs("body"), headings: h, canvases: canv, docks,
            raf: { n: ds.length, p50: q(0.5), p95: q(0.95), max: q(0.999), over33: ds.filter((d) => d > 33).length },
            theme: de.className.slice(0, 60),
          };
        }));
        await page.screenshot({ path: `${OUT}/${c.tag}${r.replace(/\//g, "_")}.jpg`, type: "jpeg", quality: 55, scale: "css" });
      } catch (e) { row.err = String(e).slice(0, 200); }
      row.consoleErrors = errs.slice(0, 5);
      results.push(row);
      console.log(JSON.stringify(row));
      await ctx.close();
    }
  }
} finally {
  await browser.close();
  writeFileSync(`${OUT}/rows.json`, JSON.stringify(results, null, 1));
}
