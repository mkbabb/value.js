import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
let choosers = 0;
page.on("filechooser", async (fc) => { choosers++; });
await page.goto("http://localhost:9000/#/extract", { waitUntil: "networkidle" });
await page.waitForTimeout(2500);
const zone = page.locator('[role="button"][aria-label^="Upload image"]');
await zone.focus();
await page.keyboard.press("Enter"); await page.waitForTimeout(400);
console.log("filechoosers after Enter:", choosers);
await zone.focus();
await page.keyboard.press("Space"); await page.waitForTimeout(400);
console.log("filechoosers after Enter+Space:", choosers);
// scroll-on-space check: did the page scroll?
const sy = await page.evaluate(() => window.scrollY);
console.log("scrollY after Space:", sy);
// mouse click -> how many choosers (double-open check via the hidden input's bubbling click)
await zone.click(); await page.waitForTimeout(500);
console.log("filechoosers after a mouse click:", choosers);
await browser.close();
