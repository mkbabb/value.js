// challenge-C · PreviewRamp — locate the add-slot ghost the o14 chip leg needs.
import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const out = {};
await page.goto("http://localhost:9000/#/mix");
await page.waitForSelector(".glass-dock", { timeout: 30000 });
await page.waitForTimeout(2000);
out.byRoleCount = await page
    .getByRole("button", { name: "Add current color to the mix" })
    .count();
out.addSlotGhost = await page.evaluate(() =>
    [...document.querySelectorAll(".add-slot-ghost")].map((el) => ({
        tag: el.tagName,
        ariaLabel: el.getAttribute("aria-label"),
        role: el.getAttribute("role"),
        disabled: el.getAttribute("disabled"),
        outer: el.outerHTML.slice(0, 260),
    })),
);
out.anyAriaLabelMatch = await page.evaluate(
    () => document.querySelectorAll('[aria-label*="Add current color"]').length,
);
await browser.close();
console.log(JSON.stringify(out, null, 1));
