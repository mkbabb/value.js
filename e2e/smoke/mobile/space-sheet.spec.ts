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
    // The open's own animations: not a loop, and not the list's scroll-driven
    // edge fades (a ScrollTimeline's animation finishes only at the scroll's end).
    await sheet.evaluate((el) =>
        Promise.allSettled(
            el
                .getAnimations({ subtree: true })
                .filter((a) => a.timeline === document.timeline && a.effect?.getComputedTiming().endTime !== Infinity)
                .map((a) => a.finished),
        ),
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

/** Every visible line of text in `el` set under `floor` px. */
async function textUnder(el: Locator, floor: number): Promise<string[]> {
    return el.evaluate((root, floor) => {
        const out: string[] = [];
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
        for (let n = walker.nextNode(); n; n = walker.nextNode()) {
            const text = n.textContent?.trim() ?? "";
            const parent = n.parentElement;
            if (!text || !parent) continue;
            const r = parent.getBoundingClientRect();
            const cs = getComputedStyle(parent);
            if (r.width <= 1 || r.height <= 1 || cs.visibility === "hidden") continue;
            const size = parseFloat(cs.fontSize);
            if (size < floor) out.push(`"${text.slice(0, 32)}" at ${size.toFixed(1)} px`);
        }
        return out;
    }, floor);
}

test("no text in the colour-space sheet is under 14 px", async ({ page }) => {
    const trigger = await boot(page);
    await trigger.tap();
    const sheet = page.locator(SHEET).first();
    await settled(sheet);
    await expect(sheet.locator(".specimen-caption").first()).toBeVisible();
    expect(await textUnder(sheet, 13.95)).toEqual([]);
});

test("no text in Mix's interpolation sheets is under 14 px", async ({ page }) => {
    await page.goto("/#/mix", { waitUntil: "load" });
    for (const name of ["Color space", "Hue method"]) {
        const trigger = page.getByRole("combobox", { name, exact: true }).first();
        await trigger.waitFor({ state: "visible", timeout: 60_000 });
        await trigger.scrollIntoViewIfNeeded();
        await page.waitForTimeout(600);
        await trigger.tap();
        const sheet = page.locator(SHEET).first();
        await settled(sheet);
        expect(await textUnder(sheet, 13.95), `${name}'s sheet`).toEqual([]);
        await page.keyboard.press("Escape");
        await sheet.waitFor({ state: "detached" }).catch(() => {});
        await page.waitForTimeout(600);
    }
});
