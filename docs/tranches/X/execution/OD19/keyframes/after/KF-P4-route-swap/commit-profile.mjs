// KF-P4: CPU-profile the swap's commit window (light-390 + light-1440), self-time by function/url.
// One headless browser, a context per cell, closed in finally. Usage: node commit-profile.mjs <outDir>
import { chromium } from "playwright";
import fs from "node:fs";
const OUT = process.argv[2];
const BASE = process.env.BASE ?? "http://localhost:5173/";
const TOP = '[data-dock-tether="top"] .glass-dock';
const res = {};
const browser = await chromium.launch({ headless: true });
try {
  for (const w of [390, 1440]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: w === 390 ? 844 : 900 }, colorScheme: "light", deviceScaleFactor: 2 });
    const page = await ctx.newPage();
    try {
      await page.goto(BASE + "#/cube", { waitUntil: "load" }); await page.waitForTimeout(2500);
      await page.locator(TOP).hover(); await page.waitForTimeout(700);
      await page.locator('[data-dock-tether="top"] [aria-label="Scene"]').first().click(); await page.waitForTimeout(600);
      const cdp = await ctx.newCDPSession(page);
      await cdp.send("Profiler.enable"); await cdp.send("Profiler.setSamplingInterval", { interval: 200 }); await cdp.send("Profiler.start");
      await page.getByRole("option", { name: /spring/i }).first().click();
      await page.waitForTimeout(900);
      const { profile } = await cdp.send("Profiler.stop");
      const byId = new Map(profile.nodes.map((n) => [n.id, n]));
      const self = new Map(); const dt = profile.timeDeltas; 
      profile.samples.forEach((id, i) => { const n = byId.get(id); const cf = n.callFrame; const k = `${cf.functionName || "(anon)"} ${cf.url.replace(/^.*\/(src|demo|node_modules)\//, "$1/").split("?")[0]}:${cf.lineNumber}`; self.set(k, (self.get(k) ?? 0) + (dt[i] ?? 0) / 1000); });
      const byFile = new Map(); for (const [k, v] of self) { const f = k.split(" ")[1]?.split(":")[0] ?? "?"; byFile.set(f, (byFile.get(f) ?? 0) + v); }
      res[w] = { measures: await page.evaluate(() => performance.getEntriesByType("measure").filter((e) => e.name.startsWith("scene-swap:")).map((e) => [e.name, Math.round(e.duration)])),
        topFn: [...self].filter(([k]) => !/^\((idle|program)\)/.test(k)).sort((a, b) => b[1] - a[1]).slice(0, 18).map(([k, v]) => [k, +v.toFixed(1)]),
        topFile: [...byFile].sort((a, b) => b[1] - a[1]).slice(0, 12).map(([k, v]) => [k, +v.toFixed(1)]) };
    } catch (e) { res[w] = { error: String(e).slice(0, 300) }; } finally { await ctx.close(); }
  }
} finally { await browser.close(); }
fs.writeFileSync(OUT + "/commit-profile.json", JSON.stringify(res, null, 1));
console.log(JSON.stringify(res, null, 0).slice(0, 6000));
