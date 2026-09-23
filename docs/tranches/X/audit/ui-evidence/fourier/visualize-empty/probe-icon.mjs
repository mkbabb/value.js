// read-only: icon size + hover computed style of the drop-target button at both viewports
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const b = await chromium.launch({ headless: false });
for (const [w,h,m] of [[1440,900,false],[390,844,true]]) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, isMobile: m, hasTouch: m });
  const p = await ctx.newPage(); await p.goto("http://localhost:3100/visualize", { waitUntil: "networkidle" }); await p.waitForTimeout(600);
  const get = () => p.evaluate(() => { const bt = document.querySelector(".drop-target-button"); const s = getComputedStyle(bt); const i = bt.querySelector("svg").getBoundingClientRect();
    return { icon: [Math.round(i.width), Math.round(i.height)], bg: s.backgroundColor, tr: s.transform, sh: s.boxShadow.slice(-80), font: s.fontSize, iconVar: s.getPropertyValue("--button-icon-size") }; });
  const rest = await get(); if (!m) await p.hover(".drop-target-button"); await p.waitForTimeout(400); console.log(w, JSON.stringify({ rest, hover: await get() }));
  await ctx.close(); }
await b.close();
