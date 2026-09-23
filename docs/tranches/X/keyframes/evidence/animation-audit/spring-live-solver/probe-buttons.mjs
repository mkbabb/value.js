import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";
const browser = await chromium.launch({ headless: false });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await page.goto("http://localhost:5173/#/spring", { waitUntil: "networkidle" });
await page.waitForTimeout(2000);
console.log(JSON.stringify(await page.evaluate(() => [...document.querySelectorAll("button,[role=slider]")].map((b) => {
  const r = b.getBoundingClientRect(); const lab = (b.getAttribute("aria-label") || b.textContent || "").trim().slice(0, 24);
  return /play|pause|reset|re-seat|reverse|slider|scrub|seek/i.test(lab + b.getAttribute("role")) ? `${lab}|${b.getAttribute("role")}|${Math.round(r.x)},${Math.round(r.y)},${Math.round(r.width)}x${Math.round(r.height)}|vis=${b.checkVisibility()}` : null; }).filter(Boolean)), null, 0));
console.log("scrollH", await page.evaluate(() => [document.scrollingElement.scrollHeight, innerHeight]));
await browser.close();
