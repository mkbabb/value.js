import { webkit } from "playwright";
const browser = await webkit.launch();
const ctx = await browser.newContext({ viewport:{width:1440,height:900}, deviceScaleFactor:2, colorScheme:"light" });
const page = await ctx.newPage();
await page.goto("http://localhost:9000/#/extract", { waitUntil:"load" });
await page.waitForTimeout(3500);
// drive k to its max via keyboard on the thumb (no source edits, read-only interaction)
const thumb = page.locator('.slider-thumb[aria-label="Number of colors"]');
await thumb.focus();
for (let i=0;i<20;i++) await page.keyboard.press("ArrowRight");
await page.waitForTimeout(400);
const r = await page.evaluate(() => {
  const lab = document.querySelector("label.text-mono-small.plate-ink");
  const cs = getComputedStyle(lab);
  // measure the actual ink advance with a canvas using the same resolved font
  const c = document.createElement("canvas").getContext("2d");
  c.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
  const inkW = c.measureText(lab.textContent.trim()).width;
  const thumb = document.querySelector('.slider-thumb[aria-label="Number of colors"]');
  return {
    text: lab.textContent.trim(),
    ariaValueNow: thumb.getAttribute("aria-valuenow"),
    ariaValueText: thumb.getAttribute("aria-valuetext"),
    boxWidth: cs.width, clientW: lab.clientWidth, scrollW: lab.scrollWidth,
    measuredInkWidth: +inkW.toFixed(2),
    headroomPx: +(parseFloat(cs.width) - inkW).toFixed(2),
    headroomPct: +(((parseFloat(cs.width) - inkW)/parseFloat(cs.width))*100).toFixed(1),
    overflows: lab.scrollWidth > lab.clientWidth,
    fontResolved: cs.fontFamily,
  };
});
console.log("=== k driven to max ===");
console.log(JSON.stringify(r, null, 1));
await page.screenshot({ path:"/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/WBEC-D4-k16.png", clip:{x:210,y:470,width:500,height:110} });
await browser.close();
