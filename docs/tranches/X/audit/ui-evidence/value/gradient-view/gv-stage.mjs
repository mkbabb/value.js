// READ-ONLY: element capture of the disclosed easing authoring stage (row 1) at 1440 and 390, light.
import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
import { execSync } from "node:child_process";
const OUT = new URL(".", import.meta.url).pathname;
const tree = () => `${execSync("git -C /Users/mkbabb/Programming/value.js rev-parse --short HEAD").toString().trim()} dirty=${execSync("git -C /Users/mkbabb/Programming/value.js status --porcelain | wc -l").toString().trim()}`;
const b = await chromium.launch({ headless: false });
for (const [w, h] of [[1440, 900], [390, 844]]) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 2, colorScheme: "light", hasTouch: w < 500 });
  const page = await ctx.newPage(); page.setDefaultTimeout(45000);
  await page.goto("http://localhost:9000/#/gradient", { waitUntil: "domcontentloaded", timeout: 600000 });
  await page.locator("[data-testid=gradient-stop-bar]").first().waitFor({ timeout: 600000 });
  await new Promise((r) => setTimeout(r, 2500));
  const tune = page.locator("[aria-label='Author a custom curve']").first();
  await tune.scrollIntoViewIfNeeded(); await tune.click(); await new Promise((r) => setTimeout(r, 1500));
  const row = page.locator(".easing-row").first();
  await row.screenshot({ path: OUT + `${w}-light-04d-easing-row-with-stage.png` });
  const m = await page.evaluate(() => { const s = document.querySelector("[id^=easing-authoring-]"); const r = s.getBoundingClientRect(); const card = s.closest(".pane-scroll-fade"); return { stage: [r.y, r.height].map(Math.round), vh: innerHeight, docH: document.documentElement.scrollHeight, cardH: card?.getBoundingClientRect().height }; });
  console.log(w, tree(), JSON.stringify(m));
  await ctx.close();
}
await b.close();
