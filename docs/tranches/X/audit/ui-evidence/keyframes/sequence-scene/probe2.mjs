import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
const b = await chromium.launch({ headless: false });
for (const vp of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
const ctx = await b.newContext({ viewport: vp, colorScheme: "light" });
const page = await ctx.newPage();
await page.goto("http://localhost:5173/#/sequence", { waitUntil: "networkidle" }); await page.waitForTimeout(3000);
const m = await page.evaluate(() => {
  const r = s => { const e = document.querySelector(s); if (!e) return null; const b = e.getBoundingClientRect(); return [Math.round(b.x), Math.round(b.y), Math.round(b.width), Math.round(b.height)]; };
  const cs = (s, p) => { const e = document.querySelector(s); return e && p.map(k => k + ":" + getComputedStyle(e)[k]).join(" "); };
  return { stage: r(".seq-stage"), axis: r(".seq-axis"), rows: r(".seq-rows"), track1: r(".seq-row .seq-track"), playheadTrack: r(".seq-playhead-track"), playhead: r(".seq-playhead"), stageGrid: cs(".seq-stage", ["gridTemplateRows", "gridTemplateColumns"]), rail: cs(".seq-row .progress-rail", ["height", "backgroundColor", "opacity"]), scrubRail: r(".seq-scrub .progress-rail"), scrubRailCs: cs(".seq-scrub .progress-rail", ["height", "backgroundColor"]),
   metric: (() => { const e = document.querySelector(".seq-target .readout-accent"); return e && { html: e.outerHTML.slice(0, 600), r: r(".seq-target .readout-accent") }; })(),
   btn: cs("button[aria-label^='Play the reel']", ["borderRadius", "width", "height"]), handleGrip: cs(".seq-handle", ["width", "height"]),
   titleSize: cs(".seq-target h2", ["fontSize", "fontFamily"]), capSize: cs(".seq-target .text-mono-caption", ["fontSize", "fontFamily"]), axisSize: cs(".seq-axis-tick", ["fontSize"]), labelFont: cs(".seq-row-at", ["fontSize"]), timecode: cs(".seq-timecode", ["fontSize"]),
   dockBtns: [...document.querySelectorAll("button")].map(e => { const b = e.getBoundingClientRect(); return (e.getAttribute("aria-label") || e.textContent.trim().slice(0, 20)) + " " + [b.x, b.y, b.width, b.height].map(Math.round) + " vis=" + getComputedStyle(e).visibility + " op=" + getComputedStyle(e).opacity; }) };
});
console.log(JSON.stringify(m, null, 1));
await ctx.close(); }
console.log(execSync("git -C /Users/mkbabb/Programming/keyframes.js rev-parse --short HEAD").toString(), execSync("git -C /Users/mkbabb/Programming/keyframes.js status --porcelain | wc -l").toString());
await b.close();
