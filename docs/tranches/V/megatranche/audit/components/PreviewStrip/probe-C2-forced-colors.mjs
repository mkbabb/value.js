import { chromium } from "/Users/mkbabb/Programming/value.js/node_modules/playwright/index.mjs";

const SHOT = "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad";

const run = async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto("http://localhost:9000/#/generate", { waitUntil: "domcontentloaded" });
    await page.waitForSelector(".glass-dock", { timeout: 30000 });
    await page.waitForTimeout(2500);
    const out = {};

    // ---------- 1. o20's assertion, reproduced without the dock fixture ----------
    await page.getByRole("combobox", { name: "Generation preset" }).click();
    await page.waitForSelector('[role="listbox"] .preview-strip');
    await page.waitForTimeout(300);
    const target = page.getByRole("option").filter({ hasText: "Pastel" });
    out.stamped = ((await target.locator("[data-stops]").getAttribute("data-stops")) ?? "").split("|");
    await page.screenshot({ path: `${SHOT}/strip-count5.png`, clip: { x: 0, y: 250, width: 700, height: 620 } });
    await target.click();
    await page.waitForTimeout(500);
    out.liveSwatchBg = await page.$$eval(".generate-swatch", (els) =>
        els.map((el) => getComputedStyle(el).backgroundColor),
    );
    out.o20WouldPass = JSON.stringify(out.liveSwatchBg) === JSON.stringify(out.stamped);

    // ---------- 2. count -> 12, screenshot the truncated strips ----------
    const slider = page.getByRole("slider", { name: "Color count" }).first();
    await slider.focus();
    await page.keyboard.press("End");
    await page.waitForTimeout(400);
    await page.getByRole("combobox", { name: "Generation preset" }).click();
    await page.waitForSelector('[role="listbox"] .preview-strip');
    await page.waitForTimeout(400);
    await page.screenshot({ path: `${SHOT}/strip-count12.png`, clip: { x: 0, y: 250, width: 700, height: 620 } });
    const strip = page.locator('[role="listbox"] .preview-strip').first();
    await strip.screenshot({ path: `${SHOT}/strip-chip-12.png`, scale: "css" });
    out.chip12 = await strip.evaluate((el) => {
        const segs = [...el.querySelectorAll(".preview-strip-segment")];
        return {
            n: segs.length,
            stamped: (el.getAttribute("data-stops") || "").split("|").length,
            widths: segs.map((s) => +s.getBoundingClientRect().width.toFixed(2)),
        };
    });
    await page.keyboard.press("Escape");
    await page.waitForTimeout(200);

    // ---------- 3. forced-colors: does the strip survive? ----------
    await page.emulateMedia({ forcedColors: "active" });
    await page.waitForTimeout(300);
    await page.getByRole("combobox", { name: "Generation preset" }).click();
    await page.waitForSelector('[role="listbox"] .preview-strip');
    await page.waitForTimeout(400);
    out.forcedColors = await page
        .locator('[role="listbox"] .preview-strip')
        .first()
        .evaluate((el) => {
            const segs = [...el.querySelectorAll(".preview-strip-segment")];
            return {
                bgs: segs.map((s) => getComputedStyle(s).backgroundColor),
                distinct: new Set(segs.map((s) => getComputedStyle(s).backgroundColor)).size,
            };
        });
    await page.locator('[role="listbox"] .preview-strip').first().screenshot({
        path: `${SHOT}/strip-forced-colors.png`,
        scale: "css",
    });
    await page.keyboard.press("Escape");
    await page.emulateMedia({ forcedColors: "none" });

    // ---------- 4. the RAMP's stamp shape, for the one-serialization claim ----------
    await page.goto("http://localhost:9000/#/mix", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2500);
    const add = page.getByRole("button", { name: "Add current color to the mix" });
    if (await add.count()) {
        await add.first().click();
        await page.waitForTimeout(200);
        await add.first().click();
        await page.waitForTimeout(400);
    }
    await page.getByRole("combobox", { name: "Color space", exact: true }).first().click();
    await page.waitForTimeout(500);
    out.rampStamp = await page
        .locator('[role="listbox"] [data-stops]')
        .first()
        .evaluate((el) => (el.getAttribute("data-stops") || "").split("|").slice(0, 2))
        .catch((e) => "NO RAMP CHIP: " + e.message);

    console.log(JSON.stringify(out, null, 1));
    await browser.close();
};
run().catch((e) => {
    console.error("FAIL", e.stack);
    process.exit(1);
});
