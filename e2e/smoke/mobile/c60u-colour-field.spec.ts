import { test, expect, type Page } from "@playwright/test";
import { dockSettled } from "../fixtures/dock";

/**
 * O60 (the owner, 23 Nov, on the dock's colour entry, a black pill reading
 * "brown" with an arrow): "the input should be more rounded, and should be
 * properly editable on mobile".
 *
 * On a phone (smoke-mobile: Pixel 7, touch) the field takes glass's field
 * radius (16 px, was the 10 px media radius), never zooms the page (16 px text
 * on a coarse pointer), offers a Go key, and edits like a phone field: a tap
 * selects the whole value, so typing replaces it, and Go commits. Before, it
 * was a contenteditable run at the 10 px media radius, with no Go key, whose
 * selected value painted white on white in light mode.
 */

test.use({ viewport: { width: 390, height: 844 } });
test.beforeEach(({}, testInfo) => {
    testInfo.setTimeout(120_000);
});

async function openColourField(page: Page) {
    const seal = page.locator(".glass-dock.collapsed");
    await dockSettled(page);
    if (await seal.count()) {
        await seal.tap();
        await dockSettled(page);
    }
    await page.getByRole("button", { name: "Toggle action bar" }).first().tap();
    await dockSettled(page);
    await page.getByRole("button", { name: "Open color input" }).first().tap();
    const field = page.getByRole("textbox", { name: "Enter a CSS color" });
    await expect(field).toBeVisible({ timeout: 10_000 });
    return field;
}

test("the colour field on a phone: rounded, 16 px, Go; a tap takes the whole value, typing replaces it, Go commits", async ({
    page,
}) => {
    await page.goto("/#/?color=brown", { waitUntil: "load" });
    await expect(page.locator(".glass-dock").first()).toBeVisible({ timeout: 60_000 });
    const field = await openColourField(page);

    const look = await field.evaluate((el) => {
        const box = el.closest(".color-field")!;
        return {
            fontPx: parseFloat(getComputedStyle(el).fontSize),
            radiusPx: parseFloat(getComputedStyle(box).borderTopLeftRadius),
            enterkeyhint: el.getAttribute("enterkeyhint"),
        };
    });
    expect(look.fontPx, "under 16 px a phone zooms the page on focus").toBeGreaterThanOrEqual(16);
    expect(look.radiusPx, "glass's field radius").toBeGreaterThanOrEqual(16);
    expect(look.enterkeyhint).toBe("go");
    // The selected value stays legible: the selection keeps the field's own
    // ink (the app's selection ink is the dock's band ink, white on this
    // field's white paper in light mode).
    const inks = await field.evaluate((el) => [getComputedStyle(el).color, getComputedStyle(el, "::selection").color]);
    expect(inks[1], "the selection's ink").toBe(inks[0]);

    await field.tap();
    await page.waitForTimeout(300);
    await expect(field).toBeFocused();
    await page.keyboard.type("rgb(10 200 30)");
    await expect(field, "the tap selected the whole value, so the typing replaced it").toHaveValue(
        "rgb(10 200 30)",
    );
    await page.keyboard.press("Enter");
    await expect(page).toHaveTitle(/rgb\(10 200 30\)/, { timeout: 5_000 });
});
