// CHALLENGE-D wb-gradient-stopeditor probe 4 — robust crops via scrollIntoView + element screenshot.
import { chromium } from "playwright";
import { resolve } from "node:path";
const HERE = import.meta.dirname;
const URL = "http://localhost:9000/#/gradient";
const out = (n) => resolve(HERE, `WBGSE-${n}.png`);
const browser = await chromium.launch();

async function fresh(opts = {}) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, ...opts });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: "networkidle", timeout: 45000 });
  await page.waitForTimeout(2200);
  return { ctx, page };
}
async function applyCss(page, css) {
  const editor = page.locator('[contenteditable="true"]');
  await editor.click();
  await page.keyboard.press("ControlOrMeta+a");
  await page.keyboard.type(css);
  await page.waitForTimeout(1200);
  await page.evaluate(() => document.activeElement.blur());
  await page.waitForTimeout(600);
}
const shotRail = async (page, name) => {
  await page.evaluate(() => document.querySelector('[data-testid="gradient-stop-bar"]').scrollIntoView({ block: "center" }));
  await page.waitForTimeout(300);
  await page.locator('[data-testid="gradient-stop-bar"]').screenshot({ path: out(name) });
};

{ // white ramp, light
  const { ctx, page } = await fresh();
  await applyCss(page, "linear-gradient(90deg, #ffffff 0%, #fafafa 100%)");
  await shotRail(page, "p4-white-light");
  const px = await page.evaluate(() => {
    const h = document.querySelector("[data-stop-id]");
    return { border: getComputedStyle(h).borderColor, bg: getComputedStyle(h).backgroundImage.slice(0, 90) };
  });
  console.log("white-light handle:", JSON.stringify(px));
  await ctx.close();
}
{ // 10 stops crowding, light
  const { ctx, page } = await fresh();
  const parts = [];
  for (let i = 0; i < 10; i++) parts.push(`hsl(${i * 36} 80% 55%) ${(i * 100 / 9).toFixed(1)}%`);
  await applyCss(page, `linear-gradient(90deg, ${parts.join(", ")})`);
  await shotRail(page, "p4-crowd");
  await ctx.close();
}
{ // dark scheme, default ramp + white ramp
  const { ctx, page } = await fresh({ colorScheme: "dark" });
  await page.evaluate(() => document.documentElement.classList.add("dark"));
  await page.waitForTimeout(700);
  await shotRail(page, "p4-dark");
  await applyCss(page, "linear-gradient(90deg, #ffffff 0%, #fafafa 100%)");
  await shotRail(page, "p4-dark-white");
  await ctx.close();
}
{ // transparent stops — the alpha-checker state
  const { ctx, page } = await fresh();
  await applyCss(page, "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(255,0,0,0.35) 100%)");
  await shotRail(page, "p4-alpha");
  console.log("alpha stops:", JSON.stringify(await page.evaluate(() => [...document.querySelectorAll("[data-stop-id]")].map(h => h.getAttribute("aria-label")))));
  await ctx.close();
}
await browser.close();
