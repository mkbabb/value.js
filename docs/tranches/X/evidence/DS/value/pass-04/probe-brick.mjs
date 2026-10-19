// X-DS value pass 4 cure — the critic's brick/menu cells re-shot (pass-04/critic/probe.mjs, unchanged but for this line). Headless real Chrome only (§0ei).
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/@playwright/test/index.mjs";
const BASE = "http://localhost:9000";
const OUT = process.argv[2];
const browser = await chromium.launch({ channel: "chrome", headless: true });
const out = {};
const brick = "?space=lab&color=" + encodeURIComponent("lab(38% 32 24)");
for (const theme of ["light", "dark"]) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: theme });
  const page = await ctx.newPage();
  // 1. Blob: where does the footer land?
  await page.goto(BASE + "/#/blob", { waitUntil: "load" });
  await page.waitForTimeout(5000);
  out[`blob-${theme}`] = await page.evaluate(() => {
    const bar = document.querySelector(".config-action-bar");
    const card = bar?.closest(".card");
    const r = (e) => e && (({ top, bottom, height }) => ({ top, bottom, height }))(e.getBoundingClientRect());
    return { bar: r(bar), card: r(card), docH: document.documentElement.scrollHeight, winH: innerHeight };
  });
  // 2. Owner brick on picker, extract, gradient
  for (const route of ["/", "/extract", "/gradient", "/mix"]) {
    await page.goto(BASE + "/#" + route + brick, { waitUntil: "load" });
    await page.waitForTimeout(5000);
    await page.screenshot({ path: `${OUT}/brick${route.replace("/", "-") || "-picker"}-1440-${theme}.png` });
  }
  // 3. The view menu open (floating plate)
  await page.goto(BASE + "/#/gradient", { waitUntil: "load" });
  await page.waitForTimeout(4000);
  const trig = page.locator("nav [role=combobox]").first();
  if (await trig.count()) {
    await trig.click();
    await page.waitForTimeout(800);
    await page.screenshot({ path: `${OUT}/viewmenu-1440-${theme}.png` });
    await page.keyboard.press("Escape");
  }
  // 4. A select menu open in the gradient pane
  const sel = page.locator("main [role=combobox]").first();
  if (await sel.count()) {
    await sel.click();
    await page.waitForTimeout(800);
    await page.screenshot({ path: `${OUT}/selectmenu-1440-${theme}.png` });
    await page.keyboard.press("Escape");
  }
  await ctx.close();
}
console.log(JSON.stringify(out, null, 1));
await browser.close();
