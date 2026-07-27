import { chromium } from "playwright";

const BASE = "http://localhost:9000";
const SEED = {
    inputColor: "oklch(72% 0.19 25deg)",
    savedColors: ["oklch(72% 0.19 25deg)"],
};
const PRE = {
    version: 1,
    palettes: [{
        id: "victim-id", name: "Victim", slug: "victim",
        colors: [{ css: "#111111", position: 0 }, { css: "#222222", position: 1 }, { css: "#333333", position: 2 }],
        createdAt: "2020-01-01T00:00:00.000Z", updatedAt: "2020-01-01T00:00:00.000Z", isLocal: true,
    }],
};

const run = async () => {
    const browser = await chromium.launch();
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    await ctx.addInitScript(([seed, pre]) => {
        localStorage.setItem("color-picker", JSON.stringify(seed));
        localStorage.setItem("color-palettes", JSON.stringify(pre));
    }, [SEED, PRE]);
    const page = await ctx.newPage();
    await page.goto(BASE + "/");
    await page.getByRole("combobox", { name: "Select view" }).click();
    await page.getByRole("option", { name: "Palettes", exact: true }).click();
    await page.waitForSelector(".dashed-well .swatch-row .watercolor-swatch");

    const out = {};
    out.before = await page.evaluate(() => JSON.parse(localStorage.getItem("color-palettes")).palettes.map((p) => ({ name: p.name, colors: p.colors.map((c) => c.css) })));

    // 1. tooltip on the add slot never opens
    await page.locator(".add-slot-ghost").hover({ force: true, timeout: 3000 }).catch(() => {});
    await page.waitForTimeout(600);
    out.tooltipOpen = await page.evaluate(() => ({
        tooltipContent: document.querySelectorAll("[data-reka-popper-content-wrapper],[role=tooltip]").length,
        addSlotAttrs: [...document.querySelector(".add-slot-ghost").attributes].map((a) => a.name),
    }));

    // 2. trigger the duplicate banner with the SAME name as the pre-existing palette
    const input = page.locator(".dashed-well input");
    await input.fill("Victim");
    await input.press("Enter");
    await page.waitForTimeout(300);
    out.bannerShown = await page.evaluate(() => document.querySelector(".dashed-well").innerText.includes("already exists"));

    // 3. now empty the buffer via the hover-panel Remove, banner still up
    await page.locator(".dashed-well .swatch-row > div").first().hover();
    await page.waitForTimeout(250);
    await page.locator(".floating-panel button[aria-label^='Remove color']").click();
    await page.waitForTimeout(400);
    out.afterRemoveAll = await page.evaluate(() => {
        const w = document.querySelector(".dashed-well");
        return {
            wellText: w.innerText.replace(/\n/g, " | "),
            bannerStillShown: w.innerText.includes("already exists"),
            swatchCount: w.querySelectorAll(".swatch-row .watercolor-swatch").length,
        };
    });

    // 4. press Update with an EMPTY buffer
    if (out.afterRemoveAll.bannerStillShown) {
        await page.getByRole("button", { name: "Update", exact: true }).click();
        await page.waitForTimeout(400);
    }
    out.after = await page.evaluate(() => JSON.parse(localStorage.getItem("color-palettes")).palettes.map((p) => ({ name: p.name, colors: p.colors.map((c) => c.css) })));

    console.log(JSON.stringify(out, null, 2));
    await browser.close();
};

run().catch((e) => { console.error("PROBE FAILED", e); process.exit(1); });
