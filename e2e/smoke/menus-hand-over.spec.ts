import { test, expect } from "@playwright/test";
import { routeBrowsePalettes } from "./fixtures/browse-palettes";
import { mainPane } from "./fixtures/dock";

/**
 * One open menu never blocks another control.
 *
 * glass 11's DropdownMenu is non-modal. The site passed `modal` on its seven
 * menus, so an open menu set `pointer-events: none` on the body: on Browse,
 * a second card's "…" did not answer while the first card's menu was open
 * (the press timed out, the first menu stayed open). The press on another
 * control now closes the open menu and acts at once.
 */

test.describe("an open menu hands over to the next press", () => {
    test("Browse: a second card's menu opens while the first is open", async ({ page }) => {
        await page.setViewportSize({ width: 1440, height: 900 });
        await routeBrowsePalettes(page);
        await page.goto("/#/browse");
        const main = mainPane(page);
        await expect(main.getByRole("article").first()).toBeVisible({ timeout: 60_000 });

        const first = main.getByRole("button", { name: "Palette menu for Wall Palette 1", exact: true });
        const second = main.getByRole("button", { name: "Palette menu for Wall Palette 2", exact: true });

        await first.click();
        await expect(first).toHaveAttribute("aria-expanded", "true");
        await expect(page.getByRole("menu")).toHaveCount(1);

        // A modal menu leaves the body unpressable: this press would time out.
        await second.click({ timeout: 3_000 });
        await expect(second).toHaveAttribute("aria-expanded", "true");
        await expect(first).toHaveAttribute("aria-expanded", "false");
        await expect(page.getByRole("menu")).toHaveCount(1);
    });

    test("phone dock: the view select opens while the overflow menu is open", async ({ page }) => {
        await page.setViewportSize({ width: 390, height: 844 });
        await page.goto("/#/");
        await expect(mainPane(page)).toBeVisible({ timeout: 60_000 });

        const menu = page.getByRole("button", { name: "Menu", exact: true });
        await menu.click();
        await expect(page.getByRole("menu")).toBeVisible();

        await page.getByRole("combobox", { name: "Select view" }).click({ timeout: 3_000 });
        await expect(page.getByRole("listbox")).toBeVisible();
        await expect(menu).toHaveAttribute("aria-expanded", "false");
    });
});
