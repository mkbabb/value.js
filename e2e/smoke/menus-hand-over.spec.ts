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

        await first.click();
        await expect(first).toHaveAttribute("aria-expanded", "true");
        await expect(page.getByRole("menu")).toHaveCount(1);

        // The second press goes to a card whose trigger the open menu does not
        // cover: a press on a point under the menu is a press on the menu. The
        // menu opens below its trigger and can reach the next card's "…", so
        // the trigger is chosen from the cards on screen by its box, read once
        // the menu has opened to its size.
        await page.waitForTimeout(400);
        const menuBox = (await page.getByRole("menu").boundingBox())!;
        const viewport = page.viewportSize()!;
        let secondName = "";
        for (let n = 2; n <= 12 && !secondName; n++) {
            const box = await main
                .getByRole("button", { name: `Palette menu for Wall Palette ${n}`, exact: true })
                .boundingBox();
            if (!box || box.y < 0 || box.y + box.height > viewport.height) continue;
            const clear =
                box.x + box.width <= menuBox.x ||
                box.x >= menuBox.x + menuBox.width ||
                box.y + box.height <= menuBox.y ||
                box.y >= menuBox.y + menuBox.height;
            if (clear) secondName = `Palette menu for Wall Palette ${n}`;
        }
        expect(secondName, "a second card's trigger on screen, clear of the open menu").not.toBe("");
        const second = main.getByRole("button", { name: secondName, exact: true });

        // A modal menu leaves the body unpressable: this press would time out.
        await second.click({ timeout: 3_000 });
        await expect(second).toHaveAttribute("aria-expanded", "true");
        await expect(first).toHaveAttribute("aria-expanded", "false");
        await expect(page.getByRole("menu")).toHaveCount(1);
    });

    test("phone dock: the view select opens while the overflow menu is open", async ({ page }) => {
        // The phone's Menu is modal again (MobileMenuDropdown.vue): glass's
        // DockTrigger opens its menu on pointerdown, and in WebKit the same
        // press's mousedown moves focus to the dock face, which a non-modal
        // menu reads as focus leaving and closes at once (oracles-safari,
        // V7R-01 at 390). A modal menu holds the body, so this hand-over waits
        // on glass's trigger keeping focus in the menu it opens; take the mark
        // off with the site's `modal` at that release.
        test.fail(true, "waits on glass's DockTrigger keeping focus in a menu it opens on pointerdown");
        await page.setViewportSize({ width: 390, height: 844 });
        await page.goto("/#/");
        await expect(mainPane(page)).toBeVisible({ timeout: 60_000 });

        // includeHidden: the open select hides the rest of the page from
        // assistive tech (reka's modal listbox), the dock's Menu button with it
        const menu = page.getByRole("button", { name: "Menu", exact: true, includeHidden: true });
        await menu.click();
        await expect(page.getByRole("menu")).toBeVisible();

        await page.getByRole("combobox", { name: "Select view" }).click({ timeout: 3_000 });
        await expect(page.getByRole("listbox")).toBeVisible();
        await expect(menu).toHaveAttribute("aria-expanded", "false");
    });
});
