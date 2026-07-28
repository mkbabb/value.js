// Hold the /palettes response so the skeleton phase is observable, then measure
// the out-in swap the file's own comment claims is a SETTLE, not a POP.
import { chromium } from "playwright";
const OUT = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/D";
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.route("**/palettes?**", async (route) => { await new Promise(r => setTimeout(r, 4500)); await route.continue(); });
await page.addInitScript(() => {
  window.__s = [];
  const tick = () => {
    const p = document.querySelector(".pane-scroll-fade");
    if (p) {
      const grid = p.querySelector(".palette-card-grid");
      const sk = p.querySelectorAll("[class*='skeleton'],[class*='Skeleton']").length;
      const stateBox = p.querySelector(".grid.gap-3");
      window.__s.push([performance.now() | 0, p.scrollHeight, sk, grid ? grid.children.length : -1,
        stateBox ? +stateBox.getBoundingClientRect().height.toFixed(0) : -1,
        grid ? getComputedStyle(grid).opacity : "-"]);
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
});
await page.goto("http://localhost:9010/#/browse", { waitUntil: "load", timeout: 60000 });
await page.waitForTimeout(3500);
await page.screenshot({ path: `${OUT}/skeleton-phase.png` });
await page.waitForTimeout(9000);
const s = await page.evaluate(() => window.__s);
const uniq = s.filter((v, i) => i === 0 || v[4] !== s[i - 1][4] || v[2] !== s[i - 1][2]);
console.log("=== t / paneScrollH / skeletons / gridChildren / stateBoxHeight / gridOpacity ===");
for (const r of uniq) console.log(r.join("  "));
const hs = s.map(r => r[4]).filter(v => v > 0);
console.log("stateBox height min/max:", Math.min(...hs), Math.max(...hs));
await browser.close();
