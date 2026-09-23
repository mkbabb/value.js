// verify: (a) seek fidelity — is the paused WAAPI effect re-driven by anything else; (b) rAF cadence without screencast load.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const D = new URL(".", import.meta.url).pathname;
const browser = await chromium.launch({ headless: false });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await page.goto("http://localhost:5173/", { waitUntil: "domcontentloaded" });
await page.waitForSelector(".typing-dot"); await page.waitForTimeout(3000);
const res = await page.evaluate(async () => {
  const vis = { vs: document.visibilityState, focus: document.hasFocus() };
  const raf = async (ms) => { const dl = []; let last = performance.now(); const end = last + ms; await new Promise(r => { const f = n => { dl.push(+(n - last).toFixed(1)); last = n; n < end ? requestAnimationFrame(f) : r(); }; requestAnimationFrame(f); }); return dl.slice(1); };
  const r1 = await raf(3000), r2 = await raf(3000);
  // long tasks
  const lt = []; try { new PerformanceObserver(l => l.getEntries().forEach(e => lt.push(+e.duration.toFixed(0)))).observe({ type: "longtask" }); } catch {}
  const r3 = await raf(3000);
  const dots = [...document.querySelectorAll(".typing-dot")];
  const a = document.getAnimations().filter(x => dots.includes(x.effect?.target)); a.forEach(x => x.pause());
  const out = [];
  for (const t of [3000, 3025, 3050, 3075, 3100]) {
    a.forEach(x => x.currentTime = t);
    const imm = +getComputedStyle(dots[0]).opacity;
    await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
    out.push({ t, imm, after: +getComputedStyle(dots[0]).opacity, ct: a[0].currentTime, ps: a[0].playState, prog: +a[0].effect.getComputedTiming().progress.toFixed(4), nAnims: dots[0].getAnimations().length, inline: dots[0].style.opacity });
  }
  return { vis, r1: summarize(r1), r2: summarize(r2), r3: summarize(r3), lt, out };
  function summarize(d) { return { n: d.length, over20: d.filter(x => x > 20).length, max: Math.max(...d), big: d.filter(x => x > 20) }; }
});
writeFileSync(D + "verify.json", JSON.stringify(res, null, 1));
console.log(JSON.stringify(res));
await browser.close();
