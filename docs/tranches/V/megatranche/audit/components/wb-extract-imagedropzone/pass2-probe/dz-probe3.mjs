import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:9000/#/extract", { waitUntil: "networkidle" });
await page.waitForTimeout(2500);
const main = page.locator("main");
const loc = main.getByRole("button", { name: /Upload image/i });
console.log("matches for /Upload image/i inside <main>:", await loc.count());
for (let i = 0; i < await loc.count(); i++) {
  const el = loc.nth(i);
  console.log(" ", i, JSON.stringify(await el.evaluate((e) => ({ tag: e.tagName, role: e.getAttribute("role"), aria: e.getAttribute("aria-label"), title: e.getAttribute("title"), cls: String(e.className).slice(0,50) }))));
}
// mutation check: would the walk spec still pass if the DROP ZONE were removed?
await page.evaluate(() => {
  const z = [...document.querySelectorAll('[role="button"]')].filter((e) => /image/i.test(e.getAttribute("aria-label")||""))[0];
  if (z) z.remove();
});
console.log("after DELETING ImageDropZone from the DOM, walk.spec's assertion:");
const after = main.getByRole("button", { name: /Upload image/i });
console.log("  matches:", await after.count(), " .last() visible:", await after.last().isVisible().catch(()=>false));
await browser.close();
