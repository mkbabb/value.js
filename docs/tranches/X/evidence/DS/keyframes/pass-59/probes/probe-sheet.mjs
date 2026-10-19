import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const OUT = process.env.OUT ?? ".";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const m = (page) => page.evaluate(() => {
  const s = document.querySelector("[data-slot=sheet-content]"); const t = s?.querySelector("[data-slot=configurator-layer-trigger]"); const l = t?.closest("[data-slot=configurator-layer]");
  const r = (e) => e && [Math.round(e.getBoundingClientRect().top), Math.round(e.getBoundingClientRect().height)];
  return { sheet: r(s), trigger: t?.textContent.trim().slice(0, 20), expanded: t?.getAttribute("aria-expanded"), layer: r(l) };
});
try {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  try {
    await page.goto(`http://localhost:5197/#/cube`, { waitUntil: "load" }); await page.waitForTimeout(3500);
    const rep = { peek: await m(page) };
    await page.click("[data-slot=sheet-content] [data-slot=configurator-layer-trigger]"); await page.waitForTimeout(1500);
    rep.afterTap1 = await m(page);
    await page.screenshot({ path: `${OUT}/cube-sheet-tap-390-light.png` });
    await page.click("[data-slot=sheet-content] [data-slot=configurator-layer-trigger]"); await page.waitForTimeout(1200);
    rep.afterTap2 = await m(page);
    // keyboard path from a fresh peek
    await page.goto(`http://localhost:5197/#/cube`, { waitUntil: "load" }); await page.reload({ waitUntil: "load" }); await page.waitForTimeout(3500);
    rep.peek2 = await m(page);
    await page.focus("[data-slot=sheet-content] [data-slot=configurator-layer-trigger]"); await page.keyboard.press("Enter"); await page.waitForTimeout(1500);
    rep.afterEnter = await m(page);
    console.log(JSON.stringify(rep));
  } finally { await ctx.close(); }
} finally { await browser.close(); }
