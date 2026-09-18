import { chromium } from "playwright";
const OUT = process.argv[2];
async function go(name, opts, fn) {
  const b = await chromium.launch();
  const c = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, ...opts });
  const p = await c.newPage();
  await p.goto("http://localhost:9000/#/gradient", { waitUntil: "networkidle" });
  await p.waitForTimeout(3200);
  const r = await fn(p);
  console.log("#####", name, JSON.stringify(r, null, 2));
  await b.close();
}
const boxes = () => {
  const q = s => document.querySelector(s);
  const R = s => { const e = q(s); if (!e) return null; const b = e.getBoundingClientRect(); const cs = getComputedStyle(e); return { t:+b.top.toFixed(1), b:+b.bottom.toFixed(1), l:+b.left.toFixed(1), h:+b.height.toFixed(1), w:+b.width.toFixed(1), pad: cs.padding, gap: cs.gap, align: cs.alignItems, display: cs.display }; };
  return { fadingScroll: R('.specimen-strip'), stripRow: R('.strip-row'), family0: R('.strip-family'), family1: R('.strip-family + .strip-family'), eyebrow: R('.family-eyebrow'), tiles0: R('.family-tiles'), tile0: R('.specimen-tile') };
};
await go("boxes", {}, async p => p.evaluate(boxes));
await go("fc-focus", { forcedColors: "active" }, async p => {
  await p.locator('.specimen-tile').nth(2).focus();
  await p.waitForTimeout(300);
  await p.locator(".specimen-strip").first().screenshot({ path: `${OUT}-fc-focus.png` });
  return p.evaluate(() => { const e = document.activeElement; const cs = getComputedStyle(e); return { cls: e.className.slice(-40), outlineW: cs.outlineWidth, outlineS: cs.outlineStyle, outlineC: cs.outlineColor, boxShadow: cs.boxShadow, forcedAdjust: cs.forcedColorAdjust }; });
});
await go("focus-light", {}, async p => {
  await p.locator('.specimen-tile').nth(2).focus();
  await p.waitForTimeout(300);
  await p.locator(".specimen-strip").first().screenshot({ path: `${OUT}-focus-light.png` });
  return p.evaluate(() => { const e = document.activeElement; const cs = getComputedStyle(e); return { outlineW: cs.outlineWidth, outlineS: cs.outlineStyle, boxShadow: cs.boxShadow }; });
});
