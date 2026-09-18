import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:9000/#/extract", { waitUntil: "networkidle" });
await page.waitForTimeout(2500);
const r = await page.evaluate(() => {
  const z = [...document.querySelectorAll('[role="button"]')].filter((e)=>/Upload image/.test(e.getAttribute("aria-label")||""))[0];
  const cs = getComputedStyle(z);
  // which min-height won?
  const sheets = [...document.styleSheets];
  let rules = [];
  for (const s of sheets) { let rr; try { rr = s.cssRules; } catch { continue; }
    for (const rule of rr) { if (rule.selectorText && /min-h-\\\[1[48]0px\\\]/.test(rule.selectorText)) rules.push(rule.cssText); } }
  return { classList: z.className, computedMinHeight: cs.minHeight, computedMaxHeight: cs.maxHeight, computedHeight: cs.height, matchedRules: rules };
});
console.log(JSON.stringify(r, null, 1));
await browser.close();
