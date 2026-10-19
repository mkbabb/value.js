// X-DS fourier pass 16 cure (critic F16C) probe, 2026-10-18. Headless real Chrome only (§0ei); one browser, one context per cell, closed in finally.
// DS-F16C-T1: for displays (2.70) and (2.74), the .katex-display scrollWidth vs clientWidth, the .katex font-size, and whether a mask/animation runs.
// Frames: paper-env-<theme>-<w> (display (2.70) seated near the top, so the critic's cell is in frame).
import { chromium } from "/Users/mkbabb/Programming/fourier-analysis/web/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = process.argv[2]; const ONLY = process.argv[5]; const t0 = Date.now(); const log = (m) => console.log(`[${((Date.now() - t0) / 1000).toFixed(1)}s] ${m}`); const BASE = process.argv[3] ?? "http://localhost:3261"; const TAG = process.argv[4] ?? "after";
const b = await chromium.launch({ channel: "chrome", headless: true });
const out = {};
const measure = () => {
  const rows = [...document.querySelectorAll(".paper-article .math-block")];
  const res = {};
  for (const r of rows) {
    const num = r.querySelector(".math-block__number")?.textContent.trim() ?? "";
    if (!/^\(2\.7[0-5]\)$/.test(num)) continue;
    const d = r.querySelector(".katex-display"); if (!d) continue;
    const k = d.querySelector(":scope > .katex"); const cs = getComputedStyle(d);
    res[num] = { scrollWidth: d.scrollWidth, clientWidth: d.clientWidth, overflow: d.scrollWidth - d.clientWidth, fits: d.scrollWidth <= d.clientWidth,
      katexFontSize: k ? getComputedStyle(k).fontSize : null, edgeEnd: cs.getPropertyValue("--math-edge-end"), animations: d.getAnimations().length };
  }
  return res;
};
try {
  for (const theme of ["light", "dark"]) for (const [w, h] of [[1440, 900], [390, 844]]) {
    const k = `${theme}-${w}`; if (ONLY && !ONLY.split(",").includes(k)) continue; log(`cell ${k}`); const o = (out[k] = {}); const touch = w < 1024;
    const ctx = await b.newContext({ viewport: { width: w, height: h }, colorScheme: theme, deviceScaleFactor: 2, ...(touch ? { isMobile: true, hasTouch: true } : {}) });
    try {
      await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); localStorage.setItem("theme", t); } catch {} }, theme);
      const p = await ctx.newPage();
      log("goto"); await p.goto(BASE + "/paper", { waitUntil: "domcontentloaded", timeout: 90000 });
      await p.waitForLoadState("networkidle", { timeout: 20000 }).catch(() => {});
      log("loaded"); await p.waitForTimeout(5000); await p.mouse.move(0, 0).catch(() => {});
      const find = () => p.evaluate(() => { const t = [...document.querySelectorAll(".paper-article .math-block")].find((x) => x.querySelector(".math-block__number")?.textContent.trim() === "(2.70)"); if (t) { t.scrollIntoView({ block: "start" }); document.querySelector(".paper-scroll").scrollTop -= 160; return true; } return false; });
      for (let i = 0; i < 160; i++) { if (i % 10 === 0) log(`scroll ${i}`); if (await find()) break; await p.evaluate(() => { document.querySelector(".paper-scroll").scrollTop += 600; }); await p.waitForTimeout(350); }
      await p.waitForTimeout(1500); await find();
      await p.waitForTimeout(2500);
      log(`seated ${k}`); o.displays = await p.evaluate(measure);
      log("shot"); await p.screenshot({ path: `${OUT}/paper-env-${theme}-${w}${TAG === "after" ? "" : "-" + TAG}.png` });
    } catch (e) { o.err = e.message.slice(0, 300); } finally { await ctx.close(); }
    log(`done ${k}`); writeFileSync(`${OUT}/f16p-probe-${TAG}${ONLY ? "-" + ONLY.replace(/,/g, "_") : ""}.json`, JSON.stringify(out, null, 1));
  }
} finally { await b.close(); }
