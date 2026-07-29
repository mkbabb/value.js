import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
page.on("pageerror", (e) => console.log("PAGEERROR", e.message));
await page.goto("http://localhost:9000/#/mix", { waitUntil: "networkidle" });
await page.waitForTimeout(3000);
console.log("URL", page.url());
const info = await page.evaluate(() => ({
    mains: document.querySelectorAll("main").length,
    buttons: [...document.querySelectorAll("button")].map((b) => ({
        label: (b.getAttribute("aria-label") || b.innerText || "").replace(/\s+/g, " ").trim().slice(0, 48),
        cls: b.className.slice(0, 60),
    })),
    text: document.body.innerText.replace(/\s+/g, " ").slice(0, 400),
}));
console.log(JSON.stringify(info, null, 1));
await browser.close();
