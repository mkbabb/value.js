import { chromium } from "playwright";
import fs from "node:fs";
const OUT = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad";
const out = {};

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.goto("http://localhost:9000/#/", { waitUntil: "networkidle" });
await page.waitForTimeout(4000);

out.colorTruth = await page.evaluate(() => {
  const plate = document.querySelector(".spectrum-picker");
  const dot = plate.querySelector(".spectrum-dot");
  const dcs = getComputedStyle(dot);
  const pcs = getComputedStyle(plate);
  const resolve = (c) => {
    const cv = document.createElement("canvas");
    cv.width = cv.height = 1;
    const g = cv.getContext("2d");
    g.fillStyle = c;
    g.fillRect(0, 0, 1, 1);
    return Array.from(g.getImageData(0, 0, 1, 1).data);
  };
  const bg = pcs.backgroundImage;
  const hueMatch = bg.match(/rgb\(255, 255, 255\), (rgb\([^)]+\))/);
  const hueRgb = hueMatch ? hueMatch[1] : null;
  const s = parseFloat(dot.style.left) / 100;
  const v = 1 - parseFloat(dot.style.top) / 100;
  const hue = hueRgb ? resolve(hueRgb) : null;
  const fieldSrgb = hue ? [0, 1, 2].map((i) => Math.round((255 + (hue[i] - 255) * s) * v)) : null;
  const dotR = resolve(dcs.backgroundColor);
  return {
    dotDeclaredFill: dcs.backgroundColor,
    dotFillResolvedSrgb: dotR.slice(0, 3),
    hueEndpoint: hueRgb,
    s: +s.toFixed(4), v: +v.toFixed(4),
    fieldSrgbUnderMarker: fieldSrgb,
    deltaRGB: fieldSrgb ? [0, 1, 2].map((i) => dotR[i] - fieldSrgb[i]) : null,
  };
});

const spaces = [];
async function readPlate(tag) {
  const r = await page.evaluate(() => {
    const p = document.querySelector(".spectrum-picker");
    const trig = document.querySelector('[aria-label="Select color space"]');
    return {
      spaceLabel: trig ? trig.textContent.trim().replace(/\s+/g, " ") : null,
      bg: getComputedStyle(p).backgroundImage,
      aria: p.getAttribute("aria-label"),
      readout: document.querySelector('[class*="readout"]')?.textContent,
    };
  });
  spaces.push({ tag, ...r });
}
await readPlate("initial");
const trigger = page.locator('[aria-label="Select color space"]');
for (const target of ["OKLCH", "HSL", "RGB"]) {
  try {
    await trigger.click();
    await page.waitForTimeout(500);
    const opt = page.getByRole("option", { name: new RegExp(target, "i") }).first();
    if (await opt.count()) { await opt.click(); await page.waitForTimeout(800); await readPlate(target); }
    else { await page.keyboard.press("Escape"); spaces.push({ tag: target, err: "option not found" }); }
  } catch (e) { spaces.push({ tag: target, err: String(e).slice(0, 140) }); try { await page.keyboard.press("Escape"); } catch {} }
}
out.spaceInvariance = spaces;

const cdp = await ctx.newCDPSession(page);
await cdp.send("Performance.enable");
const snap = async () => Object.fromEntries((await cdp.send("Performance.getMetrics")).metrics.map((m) => [m.name, m.value]));

const idleA = await snap();
await page.waitForTimeout(3000);
const idleB = await snap();
out.idleCost3s = {
  LayoutCount: idleB.LayoutCount - idleA.LayoutCount,
  RecalcStyleCount: idleB.RecalcStyleCount - idleA.RecalcStyleCount,
  ScriptDuration_ms: +((idleB.ScriptDuration - idleA.ScriptDuration) * 1000).toFixed(1),
};

const before = await snap();
const box = await page.locator(".spectrum-picker").boundingBox();
await page.mouse.move(box.x + 20, box.y + box.height - 20);
await page.mouse.down();
const N = 120;
for (let i = 0; i < N; i++) {
  await page.mouse.move(box.x + 20 + (i / N) * (box.width - 40), box.y + box.height - 20 - (i / N) * (box.height - 40));
  await page.waitForTimeout(8);
}
await page.mouse.up();
await page.waitForTimeout(400);
const after = await snap();
out.dragCost = {
  moves: N,
  LayoutCount: after.LayoutCount - before.LayoutCount,
  RecalcStyleCount: after.RecalcStyleCount - before.RecalcStyleCount,
  LayoutDuration_ms: +((after.LayoutDuration - before.LayoutDuration) * 1000).toFixed(1),
  RecalcStyleDuration_ms: +((after.RecalcStyleDuration - before.RecalcStyleDuration) * 1000).toFixed(1),
  ScriptDuration_ms: +((after.ScriptDuration - before.ScriptDuration) * 1000).toFixed(1),
};

out.dotProps = await page.evaluate(() => {
  const plate = document.querySelector(".spectrum-picker");
  const dot = plate.querySelector(".spectrum-dot");
  const d = getComputedStyle(dot);
  let card = plate.parentElement;
  while (card && !/card|plate/i.test(card.className || "")) card = card.parentElement;
  return {
    translate: d.translate, transform: d.transform, pointerEvents: d.pointerEvents,
    boxShadow: d.boxShadow, border: d.border, width: d.width, height: d.height,
    cardClass: card ? (card.className || "").slice(0, 90) : null,
    cardShadow: card ? getComputedStyle(card).boxShadow : null,
  };
});

for (const [tag, w, h] of [["mobile390", 390, 844], ["mobile320", 320, 568], ["short900x500", 900, 500], ["justUnderLg1023", 1023, 900]]) {
  await page.setViewportSize({ width: w, height: h });
  await page.waitForTimeout(1200);
  out[tag] = await page.evaluate(() => {
    const p = document.querySelector(".spectrum-picker");
    if (!p) return null;
    const r = p.getBoundingClientRect();
    const cs = getComputedStyle(p);
    return { w: +r.width.toFixed(2), h: +r.height.toFixed(2), aspect: +(r.width / r.height).toFixed(3), hCss: cs.height, touchAction: cs.touchAction };
  });
}

fs.writeFileSync(`${OUT}/SPCD-probe2.json`, JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2));
await browser.close();
