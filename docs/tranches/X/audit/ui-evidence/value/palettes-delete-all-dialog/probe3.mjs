// READ-ONLY probe 3: control for dock collapse (no dialog), focus-ring token on dialog buttons, overlay dismissal.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const now = new Date().toISOString();
const store = { version: 1, palettes: [{ id: "local-1", name: "Sunset Drift", slug: "sunset-drift", colors: ["#ff6b6b","#feca57","#48dbfb"].map((css, position) => ({ css, position })), createdAt: now, updatedAt: now, isLocal: true }] };
const browser = await chromium.launch({ headless: false });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light", deviceScaleFactor: 1 });
await ctx.addInitScript((s) => { try { localStorage.setItem("color-palettes", s); localStorage.setItem("vueuse-color-scheme", "light"); } catch {} }, JSON.stringify(store));
const page = await ctx.newPage();
await page.goto("http://localhost:9000/#/palettes", { waitUntil: "domcontentloaded", timeout: 90000 });
const trig = page.getByRole("button", { name: "Delete all saved palettes" });
await trig.waitFor({ timeout: 120000 });
const r = {};
for (const t of [0, 3000, 6000, 12000]) { if (t) await page.waitForTimeout(3000 * (t === 12000 ? 2 : 1)); await page.screenshot({ path: `${OUT}p3-control-noninteract-${t}ms.png`, clip: { x: 520, y: 0, width: 400, height: 110 } }); }
await page.mouse.move(720, 40); await page.waitForTimeout(1200);
await page.screenshot({ path: `${OUT}p3-control-dock-hover.png`, clip: { x: 520, y: 0, width: 400, height: 110 } });
await page.keyboard.press("Tab"); // move focus into doc
await trig.focus(); await page.keyboard.press("Shift+Tab"); await page.keyboard.press("Tab"); await page.waitForTimeout(300);
r.trigger = await page.evaluate(() => { const a = document.activeElement; const c = getComputedStyle(a); return { t: a.getAttribute('aria-label'), fv: a.matches(':focus-visible'), bs: c.boxShadow, token: c.getPropertyValue('--focus-ring-shadow') }; });
await page.keyboard.press("Enter"); await page.waitForTimeout(800);
r.initialFocus = await page.evaluate(() => { const a = document.activeElement; return { t: a.textContent.trim(), fv: a.matches(':focus-visible') }; });
await page.keyboard.press("Tab"); await page.waitForTimeout(300);
r.dialogBtn = await page.evaluate(() => { const a = document.activeElement; const c = getComputedStyle(a); return { t: a.textContent.trim(), fv: a.matches(':focus-visible'), bs: c.boxShadow, token: c.getPropertyValue('--focus-ring-shadow'), attrs: [...a.attributes].map(x => x.name + '=' + x.value).join(' ').slice(0, 300) }; });
await page.screenshot({ path: `${OUT}p3-kbd-focus-delete.png`, clip: { x: 700, y: 420, width: 320, height: 130 } });
await page.mouse.click(100, 800); await page.waitForTimeout(700);
r.openAfterOutsideClick = await page.locator('[role=dialog]').count();
await page.waitForTimeout(3000);
await page.screenshot({ path: `${OUT}p3-dock-after-close.png`, clip: { x: 520, y: 0, width: 400, height: 110 } });
await browser.close();
writeFileSync(`${OUT}probe3-log.json`, JSON.stringify(r, null, 2));
console.log(JSON.stringify(r, null, 2));
