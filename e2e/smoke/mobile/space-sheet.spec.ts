import { test, expect, type Locator, type Page } from "@playwright/test";

/**
 * The colour-space list on a phone is glass's sheet: it spans the screen.
 * Before, the anchored list's width cap also bound the sheet form, and the
 * sheet stood 358 of 390 px.
 */

test.use({ viewport: { width: 390, height: 844 } });
test.beforeEach(({}, testInfo) => {
    testInfo.setTimeout(120_000);
});

const SHEET = '[data-slot="select-content"][data-form="sheet"]';

async function boot(page: Page): Promise<Locator> {
    await page.goto("/", { waitUntil: "load" });
    const trigger = page.getByLabel("Select color space").first();
    await trigger.waitFor({ state: "visible", timeout: 60_000 });
    await page.waitForTimeout(1500);
    return trigger;
}

async function settled(sheet: Locator): Promise<void> {
    await sheet.waitFor({ state: "visible" });
    await sheet.evaluate((el) =>
        Promise.allSettled(el.getAnimations({ subtree: true }).map((a) => a.finished)),
    );
}

test("the colour-space sheet is the screen's width", async ({ page }) => {
    const trigger = await boot(page);
    await trigger.tap();
    const sheet = page.locator(SHEET).first();
    await settled(sheet);
    const r = (await sheet.boundingBox())!;
    const vw = await page.evaluate(() => document.documentElement.clientWidth);
    expect(Math.abs(r.width - vw), `the sheet is ${r.width} px of ${vw}`).toBeLessThanOrEqual(1);
    expect(Math.abs(r.x), "the sheet starts at the screen's edge").toBeLessThanOrEqual(1);
});
