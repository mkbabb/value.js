// X-DS value pass 5 (VP5-01): no ResizeObserver loop error on the config panes, at the
// critic's viewports and across a live resize. Real Chrome, new headless (§0ei).
import { chromium } from "@playwright/test";
import { bootRoute, newPage } from "./harness.mjs";
const BASE = process.argv[2] ?? "http://localhost:9231";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const errs = [];
try {
    for (const route of ["/#/blob", "/#/atmosphere"]) {
        const page = await newPage(browser, 1440, "light");
        page.on("pageerror", (e) => errs.push(`${route} pageerror ${e.message}`));
        page.on("crash", () => errs.push(`${route} CRASH`));
        page.on("console", (m) => m.type() === "error" && errs.push(`${route} console ${m.text().slice(0, 160)}`));
        await bootRoute(page, BASE + route);
        for (const [w, h] of [[1280, 800], [1100, 760], [1440, 900], [390, 844], [1440, 900]]) {
            await page.setViewportSize({ width: w, height: h });
            await page.waitForTimeout(600);
            console.log(route, w, h, "trim", await page.evaluate(() => getComputedStyle(document.querySelector(".config-action-bar")).marginBlockStart));
        }
        const trim = await page.evaluate(() => getComputedStyle(document.querySelector(".config-action-bar")).marginBlockStart);
        console.log(route, "final trim", trim);
        await page.context().close();
    }
} finally {
    await browser.close();
}
console.log(JSON.stringify({ errors: errs }));
