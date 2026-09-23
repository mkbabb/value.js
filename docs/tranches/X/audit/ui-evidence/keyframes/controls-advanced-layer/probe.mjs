// controls-advanced-layer probe — READ-ONLY; which scenes carry a layer in the advanced pane.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const browser = await chromium.launch({ headless: false });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
const out = {};
for (const sc of ["cube", "amiga", "square", "easing", "spring", "sequence", "matrix"]) {
  const errs = []; page.removeAllListeners("pageerror"); page.on("pageerror", (e) => errs.push(String(e).slice(0, 160)));
  await page.goto(`http://localhost:5173/#/${sc}`, { waitUntil: "networkidle" }).catch((e) => errs.push("goto " + e));
  await page.waitForTimeout(3000);
  const advs = page.locator(".controls-pane button", { hasText: "advanced" });
  const n = await advs.count(); const vis = await advs.filter({ visible: true }).count();
  let adv = null;
  if (vis) { await advs.filter({ visible: true }).first().click(); await page.waitForTimeout(900);
    adv = await page.evaluate(() => { const p = [...document.querySelectorAll("[aria-label='Back to controls']")].find(e => e.getBoundingClientRect().width)?.closest(".panel-content");
      return p ? { text: p.innerText.replace(/\s+/g, " ").slice(0, 200), fields: p.querySelectorAll(".labeled-field").length, h: Math.round(p.getBoundingClientRect().height) } : "no pane"; }); }
  out[sc] = { hash: await page.evaluate(() => location.hash), advButtons: n, visible: vis, adv, errs: errs.slice(0, 3) };
}
console.log(JSON.stringify(out, null, 1));
await browser.close();
