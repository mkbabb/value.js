// OD19 KF-P3 — Long Animation Frames over the Keyframes open (dark+light 1440), with script attribution. Headless chromium.
import { chromium } from "playwright";
import { writeFileSync } from "node:fs";
const OUT = process.argv[2]; const BASE = "http://localhost:5173/";
const res = {};
const browser = await chromium.launch({ headless: true });
try {
  for (const scheme of ["dark", "light"]) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme, deviceScaleFactor: 2 });
    try {
      const page = await ctx.newPage();
      await page.goto(BASE + "#/cube", { waitUntil: "load" }); await page.waitForTimeout(3000);
      await page.locator('[data-dock-tether="top"] .glass-dock').hover({ timeout: 30000 }); await page.waitForTimeout(700);
      await page.locator("[data-dock-surface-trigger]").first().click({ timeout: 15000 }); await page.waitForTimeout(600);
      await page.evaluate(() => {
        window.__loaf = []; window.__t = null;
        addEventListener("pointerdown", () => { window.__t = performance.now(); }, { once: true, capture: true });
        const obs = new PerformanceObserver((l) => {
          for (const e of l.getEntries()) {
            const scripts = e.scripts.map((s) => ({ inv: s.invoker.slice(0, 80), src: (s.sourceURL || "").split("/").slice(-1)[0].split("?")[0], fn: s.sourceFunctionName, dur: Math.round(s.duration), forced: Math.round(s.forcedStyleAndLayoutDuration) })).filter((s) => s.dur >= 3);
            window.__loaf.push({ start: e.startTime, dur: Math.round(e.duration), block: Math.round(e.blockingDuration), render: Math.round(e.renderStart - e.startTime), style: Math.round(e.styleAndLayoutStart - e.startTime), scripts });
          }
        });
        obs.observe({ type: "long-animation-frame" });
      });
      await page.locator('[role=menuitem][data-surface="keyframes"]').first().click();
      await page.waitForSelector(".monaco-editor .view-lines .view-line", { timeout: 15000 });
      const edAt = await page.evaluate(() => performance.now());
      await page.waitForTimeout(800);
      res[scheme] = await page.evaluate((edAt) => ({ edAtRel: Math.round(edAt - window.__t), loaf: window.__loaf.filter((e) => e.start >= window.__t - 5).map((e) => ({ ...e, start: Math.round(e.start - window.__t) })) }), edAt);
    } finally { await ctx.close(); }
  }
} finally { await browser.close(); }
writeFileSync(`${OUT}/loaf-open.json`, JSON.stringify(res, null, 1));
for (const [k, v] of Object.entries(res)) { console.log(k, "editorSeenAt~", v.edAtRel); for (const e of v.loaf) console.log(" ", JSON.stringify(e).slice(0, 600)); }
