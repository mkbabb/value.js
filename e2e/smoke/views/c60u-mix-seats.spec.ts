import { test, expect } from "@playwright/test";
import { mainPane } from "../fixtures/dock";

/**
 * O60 K and M (the owner, 23 Nov, on the Mix page).
 *
 * K: "and a bit larger" (the colours being mixed). The chips and the slot for
 * the next colour sit a step above glass's `lg` seat: 52 px (were 44).
 *
 * M: "audit for all absurdly wide buttons on every page. Larger text for some
 * elements like this" (the Mix verb, 649 px wide at 1440, its words 16 px).
 * The verb sizes to its words at the footer's end, in the body's larger step,
 * and it keeps one width while its words change ("Add two colors" … "Mix"),
 * so it never jumps. The Size mismatch field takes a column, not the footer.
 */
test("Mix: the chips are 52 px; the verb fits its words, a step larger, and keeps its width as they change", async ({
    page,
}) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/#/mix", { waitUntil: "load" });
    const main = mainPane(page);
    const verb = main.getByTestId("mix-verb");
    await expect(verb).toBeVisible({ timeout: 60_000 });
    const footer = (await verb.locator("xpath=..").boundingBox())!;

    const add = main.getByRole("button", { name: "Add current color to the mix" });
    const ghost = (await add.boundingBox())!;
    expect(Math.round(ghost.width)).toBeGreaterThanOrEqual(52);
    expect(Math.round(ghost.height)).toBeGreaterThanOrEqual(52);

    const look = async () => ({
        w: Math.round((await verb.boundingBox())!.width),
        font: await verb.evaluate((el) => parseFloat(getComputedStyle(el).fontSize)),
    });
    const empty = await look();
    expect(empty.w, `the verb is ${empty.w} px of a ${footer.width} px footer`).toBeLessThan(footer.width * 0.5);
    expect(empty.font).toBeGreaterThan(16.5);

    await add.click();
    await expect(main.getByRole("button", { name: "Add one more color", exact: true })).toBeVisible();
    expect((await look()).w).toBe(empty.w);
    await add.click();
    await expect(main.getByRole("button", { name: "Mix", exact: true })).toBeEnabled();
    expect((await look()).w).toBe(empty.w);

    const chip = (await main.locator(".mix-chip").first().boundingBox())!;
    expect(Math.round(chip.width)).toBeGreaterThanOrEqual(52);

    // the Size mismatch field: one column of the pair above it (it was the
    // footer's whole width, 649 px). Its row opens only for two palettes of
    // different sizes; the field is laid out in its column while the row is
    // closed, so its width is read from the layout.
    const fieldsW = (await main.getByRole("combobox", { name: "Hue method", exact: true }).boundingBox())!.width;
    const sizeW = await main
        .getByRole("combobox", { name: "Size mismatch", exact: true, includeHidden: true })
        .evaluate((el) => el.getBoundingClientRect().width);
    expect(sizeW).toBeGreaterThan(0);
    expect(sizeW).toBeLessThanOrEqual(fieldsW + 2);
});
