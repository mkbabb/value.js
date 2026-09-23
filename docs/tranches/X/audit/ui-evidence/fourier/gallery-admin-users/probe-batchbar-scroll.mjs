// READ-ONLY probe: where the BatchActionBar sits when the operator selects a row deep in the list. GETs only.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const OUT = new URL(".", import.meta.url).pathname;
const browser = await chromium.launch({ headless: false });
for (const [vp, size] of [["d", { width: 1440, height: 900 }], ["m", { width: 390, height: 844 }]]) {
  const page = await (await browser.newContext({ viewport: size, deviceScaleFactor: 2, isMobile: vp === "m", hasTouch: vp === "m" })).newPage();
  await page.route("**/api/**", (r) => r.request().method() !== "GET" && /\/api\/admin\//.test(r.request().url()) ? r.abort() : r.fallback());
  await page.goto("http://localhost:3100/gallery?admin=dev");
  await page.getByRole("tab", { name: "Users" }).waitFor({ timeout: 30000 }); await page.waitForTimeout(5000);
  await page.getByRole("tab", { name: "Users" }).click(); await page.locator("[role=listitem]").first().waitFor();
  await page.evaluate(() => document.querySelector(".overflow-y-auto.h-full.py-4").scrollLeft = 0);
  const cb = page.locator("[role=listitem] button[role=checkbox]").nth(14);
  await cb.scrollIntoViewIfNeeded(); await cb.click(); await page.waitForTimeout(800);
  const r = await page.evaluate(() => { const b = document.querySelector("[aria-label='Batch user actions']").getBoundingClientRect(); const s = document.querySelector(".overflow-y-auto.h-full.py-4"); return { barTop: Math.round(b.top), barBottom: Math.round(b.bottom), vh: innerHeight, scrollTop: s.scrollTop, scrollLeft: s.scrollLeft, barVisible: b.bottom > 0 && b.top < innerHeight }; });
  console.log(vp, JSON.stringify(r));
  await page.screenshot({ path: OUT + `${vp}-light-11-deep-select-batchbar.png` });
}
await browser.close();
