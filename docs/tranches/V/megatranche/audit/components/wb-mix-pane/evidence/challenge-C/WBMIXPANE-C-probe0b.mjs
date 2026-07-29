import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:9000/#/mix", { waitUntil: "networkidle" });
await page.waitForTimeout(3000);
const info = await page.evaluate(() => {
    const el = document.querySelector('[aria-label="Add current color to the mix"]');
    const well = document.querySelector(".dashed-well");
    return {
        found: !!el,
        tag: el?.tagName,
        role: el?.getAttribute("role"),
        disabled: el?.getAttribute("disabled"),
        outer: el?.outerHTML.slice(0, 400),
        wellHTML: well?.outerHTML.replace(/\s+/g, " ").slice(0, 1200),
    };
});
console.log(JSON.stringify(info, null, 1));
await browser.close();
