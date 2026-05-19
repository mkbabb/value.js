import { test, expect } from "@playwright/test";

/**
 * Smoke: the color-space select switches the active space.
 * Opens the reka-ui Select trigger, picks a different space, asserts the
 * trigger label updated. Role/label-based selectors only.
 */
test("color-space select switches the active space", async ({ page }) => {
    const main = page.getByRole("main", { name: "Color tool panes" });
    await page.goto("/");
    await expect(main).toBeVisible();

    // The picker pane's color-space trigger (a second, identical control
    // lives in the color-docs heading — .first() is the live picker one).
    const trigger = main
        .getByRole("combobox", { name: "Select color space" })
        .first();
    await expect(trigger).toBeVisible();

    const before = (await trigger.textContent())?.trim() ?? "";

    // Pick a target distinct from whatever is currently selected.
    const target = before === "OKLCh" ? "Lab" : "OKLCh";

    await trigger.click();
    await page.getByRole("option", { name: target, exact: true }).click();

    await expect(trigger).toHaveText(target);
    expect(before).not.toBe(target);
});
