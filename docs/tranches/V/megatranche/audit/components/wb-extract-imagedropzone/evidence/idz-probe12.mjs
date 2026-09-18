import { chromium } from "playwright";
const ZONE = '[role="button"][aria-label*="image" i]';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:9000/#/extract", { waitUntil: "load" });
await page.waitForTimeout(2400);
await page.evaluate((s) => document.querySelector(s).classList.add("scale-[1.01]"), ZONE);
await page.waitForTimeout(600); // let transition-all settle
const settled = await page.evaluate((s) => {
    const cs = getComputedStyle(document.querySelector(s));
    return { scale: cs.scale, transform: cs.transform, transitionProperty: cs.transitionProperty, transitionDuration: cs.transitionDuration };
}, ZONE);
console.log(JSON.stringify({ settled }, null, 2));
await browser.close();
