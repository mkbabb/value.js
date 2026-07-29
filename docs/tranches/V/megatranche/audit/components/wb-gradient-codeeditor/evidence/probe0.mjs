import { chromium } from "playwright";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
page.on("pageerror", (e) => console.log("PAGEERROR", e.message));
await page.goto("http://localhost:9000/#/gradient", { waitUntil: "load" });
for (const t of [1000, 3000, 6000, 9000]) {
    await sleep(t === 1000 ? 1000 : t - 1000);
    console.log(t, "url=", page.url(),
        "editors=", await page.locator('[role="textbox"][aria-label="Gradient CSS"]').count(),
        "verdicts=", await page.getByTestId("gradient-parse-verdict").count(),
        "headings=", (await page.locator("h3").allTextContents()).join("|"));
}
await browser.close();
