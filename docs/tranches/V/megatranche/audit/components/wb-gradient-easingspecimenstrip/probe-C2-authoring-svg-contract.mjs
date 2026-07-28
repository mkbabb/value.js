import { chromium } from "playwright";
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 1200 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.goto("http://localhost:9000/#/gradient", { waitUntil: "networkidle" });
await page.waitForTimeout(2500);
await page.click('button[aria-label="Author a custom curve"]');
await page.waitForTimeout(1500);
const info = await page.evaluate(() => {
    const stage = document.querySelector("#easing-authoring-0");
    const svgs = [...stage.querySelectorAll("svg")].map((s) => ({
        role: s.getAttribute("role"), cls: String(s.getAttribute("class")).slice(0, 50),
        viewBox: s.getAttribute("viewBox"), aria: s.getAttribute("aria-label"),
        w: +s.getBoundingClientRect().width.toFixed(1), h: +s.getBoundingClientRect().height.toFixed(1),
        blockSize: getComputedStyle(s).blockSize, inlineSize: getComputedStyle(s).inlineSize,
        aspect: getComputedStyle(s).aspectRatio,
    }));
    const root = stage.querySelector(".easing-authoring");
    return {
        svgs,
        matchRoleImg: stage.querySelectorAll("svg[role='img']").length,
        vbRatioVar: root ? getComputedStyle(root).getPropertyValue("--vb-ratio") : null,
        picker: !!stage.querySelector("[data-testid='easing-picker']"),
        pickerGridCols: stage.querySelector("[data-testid='easing-picker']") ? getComputedStyle(stage.querySelector("[data-testid='easing-picker']")).gridTemplateColumns : null,
        glassCards: stage.querySelectorAll(".glass-card").length,
    };
});
console.log(JSON.stringify(info, null, 1));
await browser.close();
