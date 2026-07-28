import { chromium } from "playwright";
const URL = "http://localhost:9000/#/atmosphere";
const OUT = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad";

const tabTo = async (page, aria) => {
    for (let i = 0; i < 30; i++) {
        await page.keyboard.press("Tab");
        const a = await page.evaluate(() => document.activeElement?.getAttribute("aria-label") || "");
        if (a === aria) return true;
    }
    return false;
};

const run = async () => {
    const browser = await chromium.launch();
    const res = {};

    // 1. forced-colors + keyboard focus on the Harmony trigger
    {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, forcedColors: "active" });
        const page = await ctx.newPage();
        await page.goto(URL, { waitUntil: "networkidle" });
        await page.waitForTimeout(2500);
        await page.screenshot({ path: `${OUT}/D-fc-rest.png`, clip: { x: 199, y: 250, width: 1042, height: 190 } });
        res.fcFound = await tabTo(page, "Palette harmony");
        res.fcFocus = await page.evaluate(() => {
            const e = document.activeElement;
            const c = getComputedStyle(e);
            return { aria: e.getAttribute("aria-label"), outlineStyle: c.outlineStyle, outlineWidth: c.outlineWidth, outlineColor: c.outlineColor, boxShadow: c.boxShadow.slice(0, 90), border: c.border, bg: c.backgroundColor };
        });
        await page.screenshot({ path: `${OUT}/D-fc-focus.png`, clip: { x: 199, y: 250, width: 1042, height: 190 } });
        await ctx.close();
    }

    // 2. normal scheme: rest vs focus crop of the four rows (raggedness + italic clip)
    {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 3 });
        const page = await ctx.newPage();
        await page.goto(URL, { waitUntil: "networkidle" });
        await page.waitForTimeout(2500);
        await page.screenshot({ path: `${OUT}/D-rows-3x.png`, clip: { x: 300, y: 300, width: 260, height: 160 } });
        await ctx.close();
    }

    // 3. menu: selection vs keyboard highlight
    {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
        const page = await ctx.newPage();
        await page.goto(URL, { waitUntil: "networkidle" });
        await page.waitForTimeout(2500);
        await page.click("[aria-label='Palette harmony']");
        await page.waitForTimeout(600);
        await page.keyboard.press("ArrowDown");
        await page.keyboard.press("ArrowDown");
        await page.waitForTimeout(400);
        res.menu = await page.evaluate(() =>
            Array.from(document.querySelectorAll("[role='option']")).map((i) => {
                const c = getComputedStyle(i);
                return { t: i.textContent.trim().slice(0, 20), sel: i.getAttribute("aria-selected"), hl: i.getAttribute("data-highlighted"), outlineStyle: c.outlineStyle, bg: c.backgroundColor, bs: c.boxShadow.slice(0, 70) };
            }));
        await page.screenshot({ path: `${OUT}/D-menu-kb.png` });
        await ctx.close();
    }
    console.log(JSON.stringify(res, null, 1));
    await browser.close();
};
run();
