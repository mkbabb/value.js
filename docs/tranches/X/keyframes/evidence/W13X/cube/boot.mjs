// SERVED MODEL: claude-opus-5-5 — X.KF.W13X.cube · KFA-203: the page ground on the first frames of a cold dark #/cube boot
// usage: node boot.mjs <baseUrl>   (3 cold loads; the canvas colour = html bg, else body bg, on each of the first 6 frames)
import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const b = await chromium.launch({ headless: false }); const out = [];
for (let i = 0; i < 3; i++) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "dark" });
  await ctx.addInitScript(() => { window.__g = []; const f = () => { const h = getComputedStyle(document.documentElement).backgroundColor; const bd = document.body ? getComputedStyle(document.body).backgroundColor : "-"; window.__g.push((h !== "rgba(0, 0, 0, 0)" ? h : bd) + " cs:" + getComputedStyle(document.documentElement).colorScheme + (document.documentElement.classList.contains("dark") ? " .dark" : "")); if (window.__g.length < 6) requestAnimationFrame(f); }; requestAnimationFrame(f); });
  const p = await ctx.newPage(); await p.goto(process.argv[2] + "/#/cube"); await p.waitForSelector(".cube-side"); await p.waitForTimeout(500);
  const g = await p.evaluate(() => window.__g);
  const light = g.filter((c) => { const m = /(\d+(\.\d+)?)[, ]+(\d+(\.\d+)?)[, ]+(\d+(\.\d+)?)/.exec(c); return (m && (+m[1] + +m[3] + +m[5]) / 3 > 128 && !c.startsWith("rgba(0, 0, 0, 0)")) || (c.startsWith("rgba(0, 0, 0, 0)") && !/cs:(dark|light dark)/.test(c)); }).length;
  out.push({ frames: g, lightFrames: light }); await ctx.close();
}
console.log(JSON.stringify(out)); await b.close();
