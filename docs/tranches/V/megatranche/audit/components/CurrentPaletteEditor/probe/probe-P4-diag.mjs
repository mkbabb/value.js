import { chromium } from "playwright";
const ORIGIN = "http://localhost:9000";
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
await ctx.addInitScript(() => {
    localStorage.setItem(
        "color-picker",
        JSON.stringify({
            inputColor: "rgb(255 0 0)",
            savedColors: ["rgb(255 0 0)", "rgb(0 255 0)", "rgb(0 0 255)", "rgb(255 255 0)"],
        }),
    );
});
const page = await ctx.newPage();
page.on("console", (m) => { if (m.type() === "error") console.log("CONSOLE-ERR", m.text().slice(0, 160)); });
await page.goto(ORIGIN + "/#/palettes", { waitUntil: "networkidle" });
await page.waitForTimeout(3500);
console.log(JSON.stringify(await page.evaluate(() => ({
    storage: localStorage.getItem("color-picker"),
    wellText: document.querySelector(".dashed-well")?.innerText,
    wells: document.querySelectorAll(".dashed-well").length,
    rowChildren: document.querySelector(".swatch-row")?.children.length,
    hash: location.hash,
})), null, 2));
await browser.close();
