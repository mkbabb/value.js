import { chromium } from "playwright";
const OUT = "/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/audit/components/picker-spectrumcanvas/probe";
const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
const errs = []; page.on("pageerror", e => errs.push(e.message));
await page.goto("http://localhost:9000/#/?space=hsl&color=hsl(60%20100%25%2050%25)", { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(1800);
console.log("url:", (await page.evaluate(() => location.href)).slice(0,140));

const r = await page.evaluate(async () => {
  const el = document.querySelector(".spectrum-picker");
  const rr = el.getBoundingClientRect();
  const mk = (t, x, y) => new PointerEvent(t, { bubbles: true, cancelable: true, composed: true, pointerId: 1, pointerType: "mouse", isPrimary: true, button: 0, buttons: t === "pointerup" ? 0 : 1, clientX: x, clientY: y });
  // top-right corner: s=1, v=1 (pure hue, full value)
  const x = rr.left + rr.width * 0.98, y = rr.top + rr.height * 0.02;
  el.dispatchEvent(mk("pointerdown", x, y)); el.dispatchEvent(mk("pointerup", x, y));
  await new Promise(res => setTimeout(res, 700));
  const dot = el.querySelector(".spectrum-dot");
  const cs = getComputedStyle(dot);
  return {
    label: el.getAttribute("aria-label"),
    dotBorder: cs.borderTopColor,
    dotBorderVar: cs.getPropertyValue("--dot-border").trim(),
    dotBg: cs.backgroundColor,
    plateBg: getComputedStyle(el).backgroundImage.slice(0, 130),
    dotLeftTop: dot.style.left + " / " + dot.style.top,
  };
});
console.log("YELLOW top-right pick:", JSON.stringify(r, null, 1));
await page.locator(".spectrum-picker").screenshot({ path: OUT + "/yellow-corner-dot-border.png" });

// now hue 240 (blue) for the contrast comparison
await page.goto("http://localhost:9000/#/?space=hsl&color=hsl(240%20100%25%2050%25)", { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(1500);
const r2 = await page.evaluate(async () => {
  const el = document.querySelector(".spectrum-picker"); const rr = el.getBoundingClientRect();
  const mk = (t, x, y) => new PointerEvent(t, { bubbles: true, cancelable: true, composed: true, pointerId: 1, pointerType: "mouse", isPrimary: true, button: 0, buttons: t === "pointerup" ? 0 : 1, clientX: x, clientY: y });
  const x = rr.left + rr.width * 0.98, y = rr.top + rr.height * 0.02;
  el.dispatchEvent(mk("pointerdown", x, y)); el.dispatchEvent(mk("pointerup", x, y));
  await new Promise(res => setTimeout(res, 700));
  const dot = el.querySelector(".spectrum-dot");
  return { label: el.getAttribute("aria-label"), dotBorder: getComputedStyle(dot).borderTopColor };
});
console.log("BLUE top-right pick:", JSON.stringify(r2));
await page.locator(".spectrum-picker").screenshot({ path: OUT + "/blue-corner-dot-border.png" });
console.log("ERRORS:", JSON.stringify(errs.slice(0,6)));
await browser.close();
