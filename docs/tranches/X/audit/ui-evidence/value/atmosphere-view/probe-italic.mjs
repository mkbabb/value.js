// READ-ONLY probe (atmosphere-view): which ancestor sets font-style: italic on the pane; 390 load retry.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const b = await chromium.launch({ headless: false });
for (const [tag, vp] of [["1440", { width: 1440, height: 900 }]]) {
  const ctx = await b.newContext({ viewport: vp, colorScheme: "light", hasTouch: tag === "390" });
  const page = await ctx.newPage();
  const t0 = Date.now();
  await page.goto("http://localhost:9000/#/atmosphere", { waitUntil: "domcontentloaded", timeout: 240000 });
  const ok = await page.locator(".config-console").first().waitFor({ timeout: 150000 }).then(() => true, () => false);
  console.log(tag, "loaded", ok, (Date.now() - t0) + "ms");
  if (ok) console.log(tag, JSON.stringify(await page.evaluate(() => {
    const out = []; let el = document.querySelector(".aurora-row button[role=combobox]");
    while (el) { const s = getComputedStyle(el); out.push(`${el.tagName}.${String(el.className).slice(0, 50)} :: ${s.fontStyle} ${s.fontSize}`); el = el.parentElement; }
    const sheets = []; for (const sh of document.styleSheets) { try { for (const r of sh.cssRules) { if (r.cssText && /font-style:\s*italic/.test(r.cssText) && r.cssText.length < 400) sheets.push(r.cssText.slice(0, 200)); } } catch {} }
    return { chain: out, italicRules: sheets.slice(0, 20) };
  }), null, 1));
  await ctx.close();
}
await b.close();
