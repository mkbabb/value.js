// focus probe — READ-ONLY: keyboard walk inside the advanced pane; does Back paint a focus-visible indicator?
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const OUT = new URL(".", import.meta.url).pathname;
const browser = await chromium.launch({ headless: false });
for (const theme of ["light", "dark"]) {
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: theme });
await ctx.addInitScript((t) => { try { localStorage.setItem("vueuse-color-scheme", t); } catch {} }, theme);
const page = await ctx.newPage();
await page.goto("http://localhost:5173/#/amiga", { waitUntil: "networkidle" }); await page.waitForTimeout(3500);
const a = page.locator(".controls-pane button", { hasText: /^\s*advanced\s*$/ }).filter({ visible: true }).first();
await a.focus(); await page.keyboard.press("Enter"); await page.waitForTimeout(1000);
const st = () => page.evaluate(() => { const e = document.activeElement; const c = getComputedStyle(e); return [e.tagName, e.getAttribute("aria-label") || e.textContent.trim().slice(0, 20), e.matches(":focus-visible"), c.outlineStyle + " " + c.outlineWidth, c.boxShadow.slice(0, 70), c.backgroundColor]; });
const walk = [await st()];
for (const k of ["Tab", "Tab", "Tab", "Tab", "Tab", "Shift+Tab", "Shift+Tab", "Shift+Tab", "Shift+Tab", "Shift+Tab"]) { await page.keyboard.press(k); await page.waitForTimeout(200); walk.push([k, ...(await st())]); }
console.log(theme, JSON.stringify(walk, null, 0));
const bb = await page.locator("[aria-label='Back to controls']").filter({ visible: true }).first().boundingBox();
await page.screenshot({ path: OUT + `11-back-kbd-focus-zoom-1440-${theme}.png`, clip: { x: bb.x - 16, y: bb.y - 16, width: 220, height: bb.height + 32 } });
await page.keyboard.press("Tab"); await page.keyboard.press("Tab"); await page.keyboard.press("Tab"); await page.keyboard.press("Tab"); await page.waitForTimeout(300);
const sw = await page.locator(".labeled-field-grid [role=switch]").filter({ visible: true }).first().boundingBox();
console.log(theme, "at switch:", JSON.stringify(await st()));
await page.screenshot({ path: OUT + `12-switch-kbd-focus-zoom-1440-${theme}.png`, clip: { x: sw.x - 110, y: sw.y - 70, width: 380, height: sw.height + 90 } });
await ctx.close(); }
await browser.close();
