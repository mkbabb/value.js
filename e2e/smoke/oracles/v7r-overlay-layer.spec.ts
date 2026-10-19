import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { routeBrowsePalettes } from "../fixtures/browse-palettes";
import { mainPane } from "../fixtures/dock";

/**
 * X-DS · value · pass 7 · V7R-01 — AN OPEN MENU PAINTS ABOVE THE STAGE.
 *
 * glass 10.1.0's DropdownMenuContent ships z-index auto (its Select and
 * Popover take z-popover), and the shell lifts `.pane-wrapper--stage` to
 * z-index 1 for the hero-blob overlap. A menu opened over the stage region
 * therefore painted UNDER it: the Browse card's "…" menu was invisible, and
 * the 390 overflow menu showed only its first row. Reka's modal layer sets
 * body pointer-events:none, so a plain elementFromPoint still "hit" the
 * hidden item, and every flow spec that clicks a menu item stayed green.
 *
 * The oracle reads PAINT order: with pointer-events forced on for every
 * element, the top element at five points inside the open menu must belong
 * to the menu.
 */
async function menuPaintsOnTop(page: Page): Promise<boolean[]> {
    const menu = page.getByRole("menu");
    await expect(menu).toBeVisible();
    // the open transition settles before the paint read
    await page.waitForTimeout(400);
    return menu.evaluate((m) => {
        const r = m.getBoundingClientRect();
        const st = document.createElement("style");
        st.textContent = "*{pointer-events:auto!important}";
        document.head.appendChild(st);
        try {
            const points: Array<[number, number]> = [
                [0.5, 0.5],
                [0.3, 0.25],
                [0.7, 0.25],
                [0.3, 0.8],
                [0.7, 0.8],
            ];
            return points.map(([fx, fy]) => {
                const top = document.elementFromPoint(r.left + r.width * fx, r.top + r.height * fy);
                return !!top && m.contains(top);
            });
        } finally {
            st.remove();
        }
    });
}

test.describe("V7R-01 · a menu over the stage paints on top", () => {
    test("the Browse card's palette menu at 1440", async ({ page }) => {
        await page.setViewportSize({ width: 1440, height: 900 });
        await routeBrowsePalettes(page);
        await page.goto("/#/browse");
        const main = mainPane(page);
        await expect(main.getByRole("article").first()).toBeVisible({ timeout: 60_000 });
        await main.getByRole("button", { name: "Palette menu" }).first().click();
        expect(await menuPaintsOnTop(page)).toEqual([true, true, true, true, true]);
    });

    test("the dock's overflow menu at 390, over the picker", async ({ page }) => {
        await page.setViewportSize({ width: 390, height: 844 });
        await page.goto("/#/");
        await expect(mainPane(page)).toBeVisible({ timeout: 60_000 });
        await page.getByRole("button", { name: "Menu", exact: true }).click();
        expect(await menuPaintsOnTop(page)).toEqual([true, true, true, true, true]);
    });
});
