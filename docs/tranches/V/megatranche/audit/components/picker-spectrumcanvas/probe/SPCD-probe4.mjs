import { chromium } from "playwright";
import fs from "node:fs";
const OUT = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad";
const out = {};
const browser = await chromium.launch();

// ---- 1. pointercancel semantics ----
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto("http://localhost:9000/#/", { waitUntil: "networkidle" });
  await page.waitForTimeout(3500);
  const readout = async () => page.evaluate(() => ({
    readout: document.querySelector('[class*="readout"]')?.textContent,
    aria: document.querySelector(".spectrum-picker").getAttribute("aria-label"),
    dot: [document.querySelector(".spectrum-dot").style.left, document.querySelector(".spectrum-dot").style.top],
  }));
  const box = await page.locator(".spectrum-picker").boundingBox();
  out.cancel = { before: await readout() };
  // pointerdown at A (25%, 75% down), then move to B (85%, 15% down), then pointercancel
  const A = { x: box.x + box.width * 0.25, y: box.y + box.height * 0.75 };
  const B = { x: box.x + box.width * 0.85, y: box.y + box.height * 0.15 };
  await page.mouse.move(A.x, A.y);
  await page.mouse.down();
  await page.waitForTimeout(120);
  out.cancel.afterDownAtA = await readout();
  await page.mouse.move(B.x, B.y);
  await page.waitForTimeout(40); // rAF still pending / just applied
  // dispatch a real pointercancel on the plate
  await page.evaluate(() => {
    const p = document.querySelector(".spectrum-picker");
    p.dispatchEvent(new PointerEvent("pointercancel", { bubbles: true, pointerId: 1, clientX: 0, clientY: 0 }));
  });
  await page.waitForTimeout(300);
  out.cancel.afterCancel = await readout();
  await page.mouse.up();
  await page.waitForTimeout(200);
  out.cancel.note = "afterCancel equal to B => cancel COMMITS; equal to A => cancel REVERTS";
  out.cancel.BfractionExpected = { s: 0.85, v: 0.85 };
  await ctx.close();
}

// ---- 2. keyboard: can any key change the spectrum? ----
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto("http://localhost:9000/#/", { waitUntil: "networkidle" });
  await page.waitForTimeout(3500);
  out.keyboard = await page.evaluate(() => {
    const p = document.querySelector(".spectrum-picker");
    return {
      tabIndexAttr: p.getAttribute("tabindex"),
      isFocusable: (() => { p.focus?.(); return document.activeElement === p; })(),
      role: p.getAttribute("role"),
      hasKeydownAttr: !!p.onkeydown,
      innerFocusables: p.querySelectorAll('a[href],button,input,[tabindex]').length,
      figureParent: p.parentElement.tagName,
      figureCaption: p.parentElement.querySelector("figcaption") ? "yes" : "no",
      namedNumericAxes: Array.from(document.querySelectorAll('[role="slider"],[role="spinbutton"]')).map((e) => e.getAttribute("aria-label")),
    };
  });
  await ctx.close();
}

// ---- 3. RTL ----
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto("http://localhost:9000/#/", { waitUntil: "networkidle" });
  await page.waitForTimeout(3000);
  await page.evaluate(() => { document.documentElement.setAttribute("dir", "rtl"); });
  await page.waitForTimeout(800);
  out.rtl = await page.evaluate(() => {
    const p = document.querySelector(".spectrum-picker");
    const d = p.querySelector(".spectrum-dot");
    const pr = p.getBoundingClientRect(), dr = d.getBoundingClientRect();
    return {
      bg: getComputedStyle(p).backgroundImage.slice(0, 130),
      dotInline: [d.style.left, d.style.top],
      dotCenterFractionFromPlateLeft: +(((dr.left + dr.width / 2) - pr.left) / pr.width).toFixed(4),
      aria: p.getAttribute("aria-label"),
      dir: getComputedStyle(p).direction,
    };
  });
  await ctx.close();
}

// ---- 4. touch: does the first tap change the color? (gate) ----
{
  const ctx = await browser.newContext({ ...(await import("playwright")).devices["iPhone 13"], hasTouch: true, isMobile: true });
  const page = await ctx.newPage();
  await page.goto("http://localhost:9000/#/", { waitUntil: "networkidle" });
  await page.waitForTimeout(3500);
  const read = async () => page.evaluate(() => document.querySelector(".spectrum-picker")?.getAttribute("aria-label"));
  const box = await page.locator(".spectrum-picker").boundingBox().catch(() => null);
  if (box) {
    out.touchGate = { before: await read() };
    await page.touchscreen.tap(box.x + box.width * 0.2, box.y + box.height * 0.8);
    await page.waitForTimeout(500);
    out.touchGate.afterFirstTap = await read();
    out.touchGate.gateClass = await page.evaluate(() => document.querySelector(".spectrum-picker").className.includes("touch-gate-active"));
    out.touchGate.gateOutline = await page.evaluate(() => { const cs = getComputedStyle(document.querySelector(".spectrum-picker")); return { outlineColor: cs.outlineColor, outlineWidth: cs.outlineWidth, touchAction: cs.touchAction }; });
    await page.touchscreen.tap(box.x + box.width * 0.8, box.y + box.height * 0.2);
    await page.waitForTimeout(500);
    out.touchGate.afterSecondTap = await read();
    out.touchGate.plateBox = { w: +box.width.toFixed(1), h: +box.height.toFixed(1) };
  } else out.touchGate = { err: "no plate on mobile" };
  await ctx.close();
}

fs.writeFileSync(`${OUT}/SPCD-probe4.json`, JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2));
await browser.close();
