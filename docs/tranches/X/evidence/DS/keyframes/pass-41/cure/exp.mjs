// X-DS keyframes r7 pass 8 — experiment: does a content-sized Square plate at 390 move the sheet? (headless, §0ei)
import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();
  await page.goto("http://localhost:5173/#/square", { waitUntil: "load" }); await page.waitForTimeout(4000);
  await page.addStyleTag({ content: ".square-stage{block-size:auto!important;align-self:start;container-type:inline-size} .square-arena{block-size:calc(1.04*(100cqi - 2*1.25rem) + 3rem)}" });
  await page.waitForTimeout(800);
  console.log(JSON.stringify(await page.evaluate(() => { const r = (s) => { const e = [...document.querySelectorAll(s)].find((x) => x.checkVisibility()); if (!e) return null; const b = e.getBoundingClientRect(); return [Math.round(b.top), Math.round(b.bottom), Math.round(b.width)]; };
    return { plate: r(".square-stage"), arena: r(".square-arena"), field: r(".square-field"), box: r(".demo-box"), sheet: r(".pane-frame"), host: r(".scene-host"), cell: r(".stage-cell") }; })));
  await page.screenshot({ path: "exp-390.png" });
} finally { await browser.close(); }
