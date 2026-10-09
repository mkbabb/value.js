import { createRequire } from "node:module";
const { chromium } = createRequire("/Users/mkbabb/Programming/value.js/package.json")("playwright");
const OUT = process.argv[2];
const browser = await chromium.launch({ channel: "chrome", headless: true });
for (const [w, h, route] of [[1440, 900, "cube"], [1440, 900, "sequence"], [390, 844, "cube"]]) {
  const page = await (await browser.newContext({ viewport: { width: w, height: h } })).newPage();
  await page.goto(`http://localhost:5173/#/${route}`); await page.evaluate(() => localStorage.clear()); await page.reload(); await page.waitForTimeout(5000);
  try { await page.locator('[aria-controls]').filter({ hasText: "layer" }).first().click({ timeout: 4000 }); await page.waitForTimeout(1200);
    console.log(route, w, JSON.stringify(await page.evaluate(() => [...document.querySelectorAll("[data-subpane-header]")].map(h => { const c = h.querySelector("[data-subpane-caption]"); const t = h.querySelector("[data-subpane-title]"); return { hH: Math.round(h.getBoundingClientRect().height), cap: c?.textContent.trim(), capTop: c && Math.round(c.getBoundingClientRect().top), titleTop: Math.round(t.getBoundingClientRect().top), titleH: Math.round(t.getBoundingClientRect().height) }; }))));
    await page.screenshot({ path: `${OUT}/layer-pane-${route}-${w}-light.png` }); } catch (e) { console.log(route, w, "layer", e.message.slice(0, 80)); }
  if (w === 390) { await page.reload(); await page.waitForTimeout(5000); try { await page.locator('[aria-label="Edit easing curve"]').first().click({ timeout: 6000 }); await page.waitForTimeout(1500); await page.screenshot({ path: `${OUT}/cube-easing-edit-390-light.png` }); } catch (e) { console.log("390 edit", e.message.slice(0, 80)); } }
}
await browser.close();
