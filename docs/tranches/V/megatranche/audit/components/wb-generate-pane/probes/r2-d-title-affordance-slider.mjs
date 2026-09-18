import { chromium } from "@playwright/test";
const browser = await chromium.launch();
const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
await page.goto("http://localhost:9000/#/generate", { waitUntil: "networkidle" });
await page.waitForSelector("[data-generate-plate]", { timeout: 20000 });
await page.waitForTimeout(600);

const sel = '[data-generate-plate] input[aria-label="Palette name"]';
const rest = await page.evaluate((s) => {
  const el = document.querySelector(s), st = getComputedStyle(el);
  return { boxShadow: st.boxShadow, outline: `${st.outlineWidth} ${st.outlineStyle} ${st.outlineColor}`, border: st.borderWidth, bg: st.backgroundColor, textDecoration: st.textDecorationLine, cursor: st.cursor };
}, sel);
await page.keyboard.press("Tab"); // move focus into the document via keyboard
await page.focus(sel);
await page.evaluate((s) => document.querySelector(s).focus({ focusVisible: true }), sel);
await page.waitForTimeout(120);
const focused = await page.evaluate((s) => {
  const el = document.querySelector(s), st = getComputedStyle(el);
  return { matchesFocusVisible: el.matches(":focus-visible"), boxShadow: st.boxShadow, outline: `${st.outlineWidth} ${st.outlineStyle} ${st.outlineColor}` };
}, sel);
// hover affordance
await page.hover(sel);
await page.waitForTimeout(120);
const hovered = await page.evaluate((s) => ({ textDecoration: getComputedStyle(document.querySelector(s)).textDecorationLine }), sel);

// count-slider thumb focus indicator + keyboard operability
await page.focus('[role="slider"]');
const beforeVal = await page.getAttribute('[role="slider"]', "aria-valuenow");
await page.keyboard.press("ArrowRight");
await page.waitForTimeout(200);
const afterVal = await page.getAttribute('[role="slider"]', "aria-valuenow");
const swatchesAfter = await page.evaluate(() => document.querySelectorAll(".generate-swatch").length);

console.log(JSON.stringify({ nameInput: { rest, focused, hovered }, slider: { beforeVal, afterVal, swatchesAfter } }, null, 1));
await browser.close();
