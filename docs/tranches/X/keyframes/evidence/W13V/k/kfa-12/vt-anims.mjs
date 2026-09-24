// SERVED MODEL: claude-opus-5-5
// KFA-12 companion: during a dock scene pick, how many ::view-transition-* animations run?
// (Same page/instrument as the audit's probe-vt-binding.mjs; headed, 1440x900.)
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const b = await chromium.launch({ headless: false });
const page = await (await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 })).newPage();
await page.goto("http://localhost:5173/#/cube"); await page.waitForTimeout(3500);
await page.evaluate(() => { window.__vt = 0; const tick = () => { window.__vt = Math.max(window.__vt, document.getAnimations().filter((a) => a.effect?.pseudoElement?.includes("view-transition")).length); requestAnimationFrame(tick); }; requestAnimationFrame(tick); });
const combo = page.getByRole("combobox", { name: "Scene" });
await page.locator('[aria-label="Scene"]:visible').first().hover(); await combo.waitFor({ state: "visible" }); await page.waitForTimeout(400);
await combo.click(); await page.getByRole("option", { name: "Amiga", exact: true }).click(); await page.waitForTimeout(2000);
console.log(JSON.stringify({ maxViewTransitionPseudoAnims: await page.evaluate(() => window.__vt), hash: await page.evaluate(() => location.hash) }));
await b.close();
