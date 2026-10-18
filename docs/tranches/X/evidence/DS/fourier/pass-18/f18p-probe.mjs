// X-DS fourier pass 18 cure (critic F18C) probe, 2026-10-18. Headless real Chrome only (§0ei); one browser, one context per cell, closed in finally.
// DS-F18C-T1: /paper at 390, the ToC band's title button (label end, chevron, readout boxes).
// DS-F18C-T2: /404 card (card width, content right edge, slack) at 1440 and 390.
// Frames: paper-top-<theme>-390, nf-rest-<theme>-<w>.
import { chromium } from "/Users/mkbabb/Programming/fourier-analysis/web/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = process.argv[2]; const BASE = process.argv[3] ?? "http://localhost:3263"; const TAG = process.argv[4] ?? "after";
const sfx = TAG === "after" ? "" : "-" + TAG;
const b = await chromium.launch({ channel: "chrome", headless: true });
const out = {};
try {
  for (const theme of ["light", "dark"]) for (const [w, h] of [[1440, 900], [390, 844]]) {
    const k = `${theme}-${w}`; const o = (out[k] = {}); const touch = w < 1024;
    const ctx = await b.newContext({ viewport: { width: w, height: h }, colorScheme: theme, deviceScaleFactor: 2, ...(touch ? { isMobile: true, hasTouch: true } : {}) });
    try {
      await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); localStorage.setItem("theme", t); } catch {} }, theme);
      const p = await ctx.newPage();
      const box = (sel) => p.evaluate((s) => { const el = document.querySelector(s); if (!el) return null; const r = el.getBoundingClientRect(); return { x: +r.x.toFixed(1), r: +r.right.toFixed(1), w: +r.width.toFixed(1) }; }, sel);
      await p.goto(BASE + "/no-such-page-ds18", { waitUntil: "domcontentloaded", timeout: 90000 });
      await p.waitForLoadState("networkidle", { timeout: 20000 }).catch(() => {});
      await p.waitForTimeout(3000); await p.mouse.move(0, 0).catch(() => {});
      o.nf = await p.evaluate(() => {
        const c = document.querySelector("[data-testid=not-found]"); if (!c) return null;
        const r = c.getBoundingClientRect(); const pad = parseFloat(getComputedStyle(c).paddingLeft);
        let right = 0; for (const el of c.querySelectorAll("h1, p, button")) right = Math.max(right, el.getBoundingClientRect().right);
        return { cardX: +r.x.toFixed(1), cardW: +r.width.toFixed(1), pad, contentRight: +right.toFixed(1), rightSlack: +(r.right - right).toFixed(1) };
      });
      await p.screenshot({ path: `${OUT}/nf-rest-${theme}-${w}${sfx}.png` });
      if (w === 390) {
        await p.goto(BASE + "/paper", { waitUntil: "domcontentloaded", timeout: 90000 });
        await p.waitForLoadState("networkidle", { timeout: 20000 }).catch(() => {});
        await p.waitForTimeout(5000); await p.mouse.move(0, 0).catch(() => {});
        o.band = { btn: await box(".floating-toc-title-btn"), label: await box(".floating-toc-section"), chevron: await box(".floating-toc-chevron"), readout: await box(".floating-toc-page"),
          text: await p.evaluate(() => document.querySelector(".floating-toc-section")?.textContent.trim()) };
        if (o.band.label && o.band.chevron) o.band.labelToChevron = +(o.band.chevron.x - o.band.label.r).toFixed(1);
        await p.screenshot({ path: `${OUT}/paper-top-${theme}-390${sfx}.png` });
      }
    } catch (e) { o.err = e.message.slice(0, 300); } finally { await ctx.close(); }
    console.log("done", k); writeFileSync(`${OUT}/f18p-probe-${TAG}.json`, JSON.stringify(out, null, 1));
  }
} finally { await b.close(); }
