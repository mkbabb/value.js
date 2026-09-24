// SERVED MODEL: claude-opus-5-5
// KFA-134 · is the hero wave's in-content pause reachable from the UI? Samples every glyph's translateY over
// 2 s (the max |dy| seen) before and after activating the pause control by KEYBOARD (Tab to it, Enter).
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import fs from "node:fs";
const tag = process.argv[2] || "run"; const OUT = new URL(`./${tag}/`, import.meta.url).pathname; fs.mkdirSync(OUT, { recursive: true });
const b = await chromium.launch({ headless: false }); const res = [];
for (const vp of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
  const ctx = await b.newContext({ viewport: vp, deviceScaleFactor: 2 }); const p = await ctx.newPage();
  await p.goto("http://localhost:5173/"); await p.waitForTimeout(3500);
  const sample = () => p.evaluate(async () => { let max = 0; const t0 = performance.now(); while (performance.now() - t0 < 2000) { for (const c of document.querySelectorAll(".wave-char")) { const m = new DOMMatrix(getComputedStyle(c).transform); max = Math.max(max, Math.abs(m.m42)); } await new Promise((r) => requestAnimationFrame(r)); } return +max.toFixed(2); });
  const control = await p.evaluate(() => { const e = document.querySelector('button[aria-label="Pause the title animation"]'); if (!e) return null; const r = e.getBoundingClientRect(); return { pressed: e.getAttribute("aria-pressed"), x: r.x, y: r.y, w: r.width, h: r.height }; });
  const before = await sample();
  let reached = false; for (let i = 0; i < 30 && control; i++) { await p.keyboard.press("Tab"); if (await p.evaluate(() => document.activeElement?.getAttribute("aria-label") === "Pause the title animation")) { reached = true; break; } }
  if (reached) { await p.keyboard.press("Enter"); await p.waitForTimeout(300); }
  const after = await sample();
  const pressed = await p.evaluate(() => document.querySelector('button[aria-label="Pause the title animation"]')?.getAttribute("aria-pressed"));
  await p.screenshot({ path: `${OUT}home-${vp.width}.png` });
  res.push({ vp: vp.width, control, tabReached: reached, pressedAfter: pressed, maxLiftBeforePx: before, maxLiftAfterPx: after }); await ctx.close();
}
fs.writeFileSync(OUT + "pause.json", JSON.stringify(res, null, 1)); for (const r of res) console.log(JSON.stringify(r));
await b.close();
