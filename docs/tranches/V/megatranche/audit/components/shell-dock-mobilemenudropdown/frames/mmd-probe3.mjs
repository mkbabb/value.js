import { webkit } from "playwright";
import fs from "node:fs";
const OUT = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad";
const URL = "http://localhost:9000/#/";
const out = {};
const browser = await webkit.launch();

async function mk(ls = {}) {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, colorScheme: "light" });
  const page = await ctx.newPage();
  await page.addInitScript((l) => { for (const [k, v] of Object.entries(l)) localStorage.setItem(k, v); }, ls);
  await page.goto(URL, { waitUntil: "load" });
  await page.waitForTimeout(3000);
  return { ctx, page };
}

// 1. as-child truth + GitHub anchor font + dead-zone geometry
{
  const { ctx, page } = await mk();
  await page.locator(".dock-dropdown-trigger").first().click();
  await page.waitForTimeout(500);
  out.asChild = await page.evaluate(() => {
    const a = document.querySelector('[role="menu"] a[href="https://github.com/mkbabb/value.js"]');
    const item = a.closest('[role="menuitem"]');
    const ir = item.getBoundingClientRect(); const ar = a.getBoundingClientRect();
    const ca = getComputedStyle(a); const ci = getComputedStyle(item);
    return {
      anchorIsItem: a === item,
      anchorParentIsItem: a.parentElement === item,
      itemTag: item.tagName, itemCls: String(item.className).slice(0, 70),
      anchorCls: String(a.className).slice(0, 70),
      itemRect: { x: +ir.x.toFixed(1), y: +ir.y.toFixed(1), w: +ir.width.toFixed(1), h: +ir.height.toFixed(1) },
      anchorRect: { x: +ar.x.toFixed(1), y: +ar.y.toFixed(1), w: +ar.width.toFixed(1), h: +ar.height.toFixed(1) },
      deadFractionOfRow: +(1 - (ar.width * ar.height) / (ir.width * ir.height)).toFixed(3),
      anchorFont: ca.fontFamily.split(",")[0].replace(/"/g, "") + " " + ca.fontSize + "/" + ca.lineHeight,
      itemFont: ci.fontFamily.split(",")[0].replace(/"/g, "") + " " + ci.fontSize + "/" + ci.lineHeight,
      anchorDisplay: ca.display,
      // the @mbabb wordmark link, for contrast
      mbabb: (() => { const m = document.querySelector('[role="menu"] a[href="https://github.com/mkbabb"]'); const mr = m.getBoundingClientRect(); const cm = getComputedStyle(m); return { w: +mr.width.toFixed(1), h: +mr.height.toFixed(1), font: cm.fontFamily.split(",")[0].replace(/"/g, "") + " " + cm.fontSize, display: cm.display }; })(),
      // hit test the right half of the GitHub row
      hitAtRowRight: (() => { const el = document.elementFromPoint(ir.right - 20, ir.y + ir.height / 2); return el ? el.tagName + "." + String(el.className).slice(0, 40) : null; })(),
      hitAtAnchor: (() => { const el = document.elementFromPoint(ar.x + 5, ar.y + 5); return el ? el.tagName + "." + String(el.className).slice(0, 40) : null; })(),
    };
  });
  // click the DEAD right side of the GitHub row: does it navigate or just close?
  const box = out.asChild.itemRect;
  const before = page.context().pages().length;
  await page.mouse.click(box.x + box.w - 20, box.y + box.h / 2);
  await page.waitForTimeout(900);
  out.githubRowClick = {
    newPages: page.context().pages().length - before,
    menuStillOpen: await page.evaluate(() => !!document.querySelector('[role="menu"]')),
    url: page.url(),
  };
  await ctx.close();
}

// 2. dock-band adjacency + optical rhythm
{
  const { ctx, page } = await mk();
  out.rhythm = await page.evaluate(() => {
    const q = (s) => { const e = document.querySelector(s); if (!e) return null; const r = e.getBoundingClientRect(); return { x: +r.x.toFixed(1), r: +r.right.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1), y: +r.y.toFixed(1), b: +r.bottom.toFixed(1) }; };
    const plate = q(".dock-plate") || q(".glass-dock");
    const sel = q(".dock-select-trigger");
    const seg = q(".dock-mobile-panes");
    const dd = q(".dock-dropdown-trigger");
    return { plate, sel, seg, dd, gapSelSeg: seg && sel ? +(seg.x - sel.r).toFixed(1) : null, gapSegDd: dd && seg ? +(dd.x - seg.r).toFixed(1) : null, leftInset: sel && plate ? +(sel.x - plate.x).toFixed(1) : null, rightInset: dd && plate ? +(plate.r - dd.r).toFixed(1) : null, ddVCenterOffset: dd && plate ? +(((dd.y + dd.b) / 2) - ((plate.y + plate.b) / 2)).toFixed(2) : null };
  });
  await ctx.close();
}

await browser.close();
fs.writeFileSync(`${OUT}/mmd-probe3.json`, JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2));
