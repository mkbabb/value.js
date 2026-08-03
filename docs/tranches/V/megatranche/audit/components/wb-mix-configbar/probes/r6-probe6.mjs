import { chromium } from "playwright";
const ORIGIN = "http://localhost:9000/#/mix";
const OUT = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/img";
for (const scheme of ["light","dark"]) {
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme });
  const page = await ctx.newPage();
  await page.goto(ORIGIN, { waitUntil: "load" });
  await page.waitForTimeout(2500);
  const rect = await page.evaluate(() => {
    const v = [...document.querySelectorAll("button")].find(b => (b.textContent||"").trim()==="Mix" && b.closest("main"));
    v.removeAttribute("disabled"); v.disabled = false;
    const r = v.getBoundingClientRect();
    return { x:r.x, y:r.y, w:r.width, h:r.height };
  });
  await page.waitForTimeout(900);
  const after = await page.evaluate(() => {
    const v = [...document.querySelectorAll("button")].find(b => (b.textContent||"").trim()==="Mix" && b.closest("main"));
    const c = getComputedStyle(v);
    return { opacity: c.opacity, bg: c.backgroundColor, bw: c.borderWidth, disabled: v.disabled };
  });
  await page.screenshot({ path: `${OUT}/verb-enabled2-${scheme}.png`, clip: { x: rect.x-8, y: rect.y-16, width: rect.w+16, height: rect.h+24 } });
  // hover
  await page.mouse.move(rect.x + rect.w/2, rect.y + rect.h/2);
  await page.waitForTimeout(500);
  const hov = await page.evaluate(() => {
    const v = [...document.querySelectorAll("button")].find(b => (b.textContent||"").trim()==="Mix" && b.closest("main"));
    const c = getComputedStyle(v);
    return { opacity: c.opacity, bg: c.backgroundColor, scale: c.scale, shadow: c.boxShadow.slice(0,60) };
  });
  await page.screenshot({ path: `${OUT}/verb-hover2-${scheme}.png`, clip: { x: rect.x-8, y: rect.y-16, width: rect.w+16, height: rect.h+24 } });
  // focus-visible
  await page.evaluate(() => {
    const v = [...document.querySelectorAll("button")].find(b => (b.textContent||"").trim()==="Mix" && b.closest("main"));
    v.focus();
  });
  await page.keyboard.press("Tab"); await page.keyboard.press("Shift+Tab");
  await page.waitForTimeout(400);
  const foc = await page.evaluate(() => {
    const v = [...document.querySelectorAll("button")].find(b => (b.textContent||"").trim()==="Mix" && b.closest("main"));
    const c = getComputedStyle(v);
    return { outline: c.outline, outlineOffset: c.outlineOffset, shadow: c.boxShadow.slice(0,120), isFocus: v.matches(":focus-visible") };
  });
  await page.screenshot({ path: `${OUT}/verb-focus2-${scheme}.png`, clip: { x: rect.x-12, y: rect.y-20, width: rect.w+24, height: rect.h+32 } });
  console.log(scheme, JSON.stringify({ after, hov, foc }));
  await b.close();
}
