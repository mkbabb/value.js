// Read-only probe: samples the phase chip + disabled state every rAF across one morph (desktop + mobile, light).
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const browser = await chromium.launch({ headless: false, args: ["--enable-gpu", "--ignore-gpu-blocklist"] });
const out = {};
for (const [vp, size] of [["d", { width: 1440, height: 900 }], ["m", { width: 390, height: 844 }]]) {
  const ctx = await browser.newContext({ viewport: size, deviceScaleFactor: 2, hasTouch: vp === "m", isMobile: vp === "m" });
  const page = await ctx.newPage();
  await page.goto("http://localhost:3100/morph", { waitUntil: "networkidle" }); await page.waitForTimeout(1200);
  const run = async () => page.evaluate(() => new Promise((res) => {
    const samples = []; const t0 = performance.now();
    const chip = () => [...document.querySelectorAll(".demo-info")].find((e) => e.offsetParent)?.textContent.replace(/\s+/g, " ").trim();
    const tick = () => { const b = document.querySelector(".morph-button"); samples.push([Math.round(performance.now() - t0), chip(), b.disabled, document.querySelectorAll(".controls-section :disabled").length, document.querySelector(".morph-button path")?.getAttribute("d").length]);
      if (performance.now() - t0 < 1500) requestAnimationFrame(tick); else res(samples); };
    document.querySelector(".morph-button").click(); requestAnimationFrame(tick);
  }));
  const s = await run();
  // compress: keep transitions
  out[vp] = s.filter((x, i) => i === 0 || x[1] !== s[i - 1][1] || x[2] !== s[i - 1][2]).concat([s[s.length - 1]]);
  out[vp + "-frames"] = s.length;
  await ctx.close();
}
await browser.close();
writeFileSync(new URL("./probe-timing.json", import.meta.url), JSON.stringify(out, null, 1));
console.log(JSON.stringify(out));
