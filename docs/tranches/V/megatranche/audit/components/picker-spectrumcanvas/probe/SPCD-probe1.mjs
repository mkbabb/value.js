import { chromium, webkit } from "playwright";
import fs from "node:fs";

const OUT = process.argv[2] || "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad";
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
const consoleErrors = [];
page.on("console", (m) => { if (m.type() === "error") consoleErrors.push(m.text()); });
await page.goto("http://localhost:9000/#/", { waitUntil: "networkidle" });
await page.waitForTimeout(4000);

const probe = await page.evaluate(() => {
  const plate = document.querySelector(".spectrum-picker");
  if (!plate) return { error: "no .spectrum-picker" };
  const dot = plate.querySelector(".spectrum-dot");
  const pr = plate.getBoundingClientRect();
  const dr = dot ? dot.getBoundingClientRect() : null;
  const cs = getComputedStyle(plate);
  const dcs = dot ? getComputedStyle(dot) : null;
  // derive s,v from dot CENTER relative to plate
  const sFromDot = dr ? (dr.left + dr.width / 2 - pr.left) / pr.width : null;
  const vFromDot = dr ? 1 - (dr.top + dr.height / 2 - pr.top) / pr.height : null;
  const label = plate.getAttribute("aria-label");
  return {
    aria: { role: plate.getAttribute("role"), label, tabindex: plate.getAttribute("tabindex") },
    plateRect: { x: +pr.x.toFixed(2), y: +pr.y.toFixed(2), w: +pr.width.toFixed(2), h: +pr.height.toFixed(2), aspect: +(pr.width / pr.height).toFixed(3) },
    dotRect: dr ? { x: +dr.x.toFixed(2), y: +dr.y.toFixed(2), w: +dr.width.toFixed(2), h: +dr.height.toFixed(2) } : null,
    dotInlineLeftTop: dot ? { left: dot.style.left, top: dot.style.top } : null,
    dotComputedTransform: dcs ? dcs.transform : null,
    dotComputedBorder: dcs ? dcs.border : null,
    dotBoxShadow: dcs ? dcs.boxShadow : null,
    dotBg: dcs ? dcs.backgroundColor : null,
    dotBorderRadius: dcs ? dcs.borderRadius : null,
    dotFilter: dcs ? dcs.filter : null,
    sFromDotCenter: sFromDot === null ? null : +sFromDot.toFixed(4),
    vFromDotCenter: vFromDot === null ? null : +vFromDot.toFixed(4),
    plateBackgroundImage: cs.backgroundImage,
    plateBorderRadius: cs.borderRadius,
    plateOverflow: cs.overflow,
    plateOutline: cs.outline + " / offset " + cs.outlineOffset,
    plateAnimation: cs.animation,
    plateTransition: cs.transition,
    plateTouchAction: cs.touchAction,
    plateBoxShadow: cs.boxShadow,
    plateCursor: cs.cursor,
    plateClasses: plate.className,
    figureTag: plate.parentElement ? plate.parentElement.tagName : null,
    figureHasCaption: plate.parentElement ? !!plate.parentElement.querySelector("figcaption") : null,
    // is the dot escaping the plate?
    dotEscape: dr ? {
      top: +(pr.top - dr.top).toFixed(2),
      left: +(pr.left - dr.left).toFixed(2),
      bottom: +(dr.bottom - pr.bottom).toFixed(2),
      right: +(dr.right - pr.right).toFixed(2),
    } : null,
    // the readout beside it
    readoutText: (document.querySelector('[class*="readout"]') || {}).textContent,
    // canvas count inside the component
    canvasInside: plate.querySelectorAll("canvas").length,
  };
});

// tab order
const tabOrder = await page.evaluate(() => {
  const card = document.querySelector(".spectrum-picker")?.closest("[class*=card], article, section, div");
  const all = Array.from(document.querySelectorAll('a[href],button,input,select,textarea,[tabindex]:not([tabindex="-1"]),[contenteditable="true"]'));
  return all.filter((e) => e.offsetParent !== null).map((e) => ({ tag: e.tagName, role: e.getAttribute("role") || e.computedRole, name: e.getAttribute("aria-label") || e.textContent?.trim().slice(0, 28) })).slice(0, 20);
});

fs.writeFileSync(`${OUT}/probe-1.json`, JSON.stringify({ probe, tabOrder, consoleErrors }, null, 2));
console.log(JSON.stringify({ probe, tabOrder, consoleErrors }, null, 2));

await page.screenshot({ path: `${OUT}/plate-desktop.png`, clip: { x: probe.plateRect.x - 30, y: probe.plateRect.y - 60, width: probe.plateRect.w + 60, height: probe.plateRect.h + 120 } });

await browser.close();
