// read-only: resolve --ui-scale / --button-size / height at 390 coarse
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const b = await chromium.launch({ headless: false });
const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
const p = await ctx.newPage(); await p.goto("http://localhost:3100/visualize", { waitUntil: "networkidle" }); await p.waitForTimeout(600);
console.log(JSON.stringify(await p.evaluate(() => { const bt = document.querySelector(".drop-target-button"); const s = getComputedStyle(bt);
  const probe = (v) => { const d = document.createElement("div"); d.style.width = `var(${v})`; bt.appendChild(d); const w = getComputedStyle(d).width; d.remove(); return w; };
  return { uiScale: getComputedStyle(document.documentElement).getPropertyValue("--ui-scale"), btnScale: s.getPropertyValue("--ui-scale"), buttonSize: probe("--button-size"), glyph: probe("--ui-glyph"), h: bt.getBoundingClientRect().height, minH: s.minHeight, height: s.height, radius: s.borderRadius, pad: s.padding };
})));
await b.close();
