// READ-ONLY probe 2: dock state around the dialog, focus ring, fonts.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { writeFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const now = new Date().toISOString();
const store = { version: 1, palettes: [{ id: "local-1", name: "Sunset Drift", slug: "sunset-drift", colors: ["#ff6b6b","#feca57","#48dbfb"].map((css, position) => ({ css, position })), createdAt: now, updatedAt: now, isLocal: true }] };
const browser = await chromium.launch({ headless: false });
const res = [];
for (const theme of ["light", "dark"]) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: theme, deviceScaleFactor: 2 });
  await ctx.addInitScript(([s, t]) => { try { localStorage.setItem("color-palettes", s); localStorage.setItem("vueuse-color-scheme", t); } catch {} }, [JSON.stringify(store), theme]);
  const page = await ctx.newPage();
  await page.goto("http://localhost:9000/#/palettes", { waitUntil: "domcontentloaded", timeout: 90000 }); await page.waitForTimeout(6000);
  const dockBox = () => page.evaluate(() => { const n = document.querySelector('nav, [class*=dock]'); const r = n?.getBoundingClientRect(); return r && { cls: n.className.toString().slice(0, 80), w: Math.round(r.width), h: Math.round(r.height) }; });
  const r = { theme, dockBefore: await dockBox() };
  const trig = page.getByRole("button", { name: "Delete all saved palettes" });
  await trig.waitFor({ timeout: 120000 }).catch(async (e) => { await page.screenshot({ path: `${OUT}p2-${theme}-no-trigger.png` }); throw e; }); await page.waitForTimeout(1500); await trig.click(); await page.waitForTimeout(800);
  r.dockOpen = await dockBox();
  r.fonts = await page.evaluate(() => { const d = document.querySelector('[role=dialog]'); const h = [...document.querySelectorAll('h1,h2,h3')].map(e => ({ t: e.textContent.trim().slice(0, 30), ff: getComputedStyle(e).fontFamily.slice(0, 60) })); return { dialogTitle: getComputedStyle(d.querySelector('h2')).fontFamily, desc: getComputedStyle(d.querySelector('p')).fontFamily, btn: getComputedStyle(d.querySelector('button')).fontFamily, headings: h }; });
  await page.keyboard.press("Tab"); await page.waitForTimeout(300);
  r.focusDelete = await page.evaluate(() => { const a = document.activeElement; const c = getComputedStyle(a); return { t: a.textContent.trim(), fv: a.matches(':focus-visible'), outline: c.outline, oo: c.outlineOffset, bs: c.boxShadow.slice(0, 200) }; });
  await page.screenshot({ path: `${OUT}p2-${theme}-focus-delete.png`, clip: { x: 740, y: 440, width: 260, height: 100 } });
  await page.keyboard.press("Shift+Tab"); await page.waitForTimeout(300);
  r.focusCancel = await page.evaluate(() => { const a = document.activeElement; const c = getComputedStyle(a); return { t: a.textContent.trim(), fv: a.matches(':focus-visible'), outline: c.outline, bs: c.boxShadow.slice(0, 200), td: c.textDecorationLine }; });
  await page.screenshot({ path: `${OUT}p2-${theme}-focus-cancel.png`, clip: { x: 680, y: 440, width: 320, height: 100 } });
  await page.getByRole("button", { name: "Cancel" }).click();
  for (const ms of [500, 2000, 5000]) { await page.waitForTimeout(ms === 500 ? 500 : ms - (ms === 2000 ? 500 : 2000)); r[`dockAfterCancel${ms}`] = await dockBox(); }
  await page.screenshot({ path: `${OUT}p2-${theme}-after-cancel-5s.png` });
  res.push(r); await ctx.close();
}
await browser.close();
writeFileSync(`${OUT}probe2-log.json`, JSON.stringify(res, null, 2));
console.log(JSON.stringify(res, null, 2));
