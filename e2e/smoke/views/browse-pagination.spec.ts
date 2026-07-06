import { test, expect } from "@playwright/test";
import { setupEnvNoise } from "../fixtures/env-noise";
import { openView } from "../fixtures/dock";
import {
    routeBrowsePalettes,
    PAGE1_COUNT,
    PAGE2_COUNT,
} from "../fixtures/browse-palettes";

/**
 * S.W5-13 (F-1): the public wall renders a FULL keyset page — proving the
 * cursor-shape `listPalettes` wrapper + `res.data` consumption end to end
 * (the sibling `views/browse.spec.ts` only proves the EMPTY grid mounts).
 *
 * `GET /palettes` returns `{ data, nextCursor, hasMore }`; the browse store now
 * reads `nextCursor`/`hasMore` (dead until W5-13). This asserts page 1's 50
 * rows all render. The load-more click-through (page 51+) pairs with Lane A's
 * BrowsePane trigger and extends this spec via the same fixture's page 2.
 */
test("browse wall renders a full keyset page of palettes", async ({ page }) => {
    const consoleErrors = setupEnvNoise(page);
    await routeBrowsePalettes(page);

    await page.goto("/");
    await openView(page, "Browse");

    const main = page.getByRole("main", { name: "Color tool panes" });
    await expect(main.getByRole("heading", { name: "Browse" }).last()).toBeVisible();

    // The wall carries the full first keyset page. Scope to the VISIBLE copy
    // (the pane mounts in both responsive slots; the off-breakpoint one is
    // display:none). All 50 rows render — more than a 50-cap truncation would
    // have shown, and the page's last card (`Wall Palette 50`) is present.
    const cards = main.getByRole("article").filter({ visible: true });
    await expect(cards.first()).toBeVisible();
    await expect(cards).toHaveCount(PAGE1_COUNT);
    await expect(
        page.getByText(`Wall Palette ${PAGE1_COUNT}`, { exact: true }).first(),
    ).toBeVisible();

    expect(consoleErrors).toEqual([]);
});

/**
 * S.W5 Lane A — the LOAD-MORE click-through (page 2): the pane affordance
 * consumes `pm.hasMore` + `pm.loadMoreRemotePalettes` and the wall pages
 * past the 50-cap (the N.W3.D keyset machinery finally serving its primary
 * purpose). The button retires when the cursor exhausts.
 */
test("browse wall pages past the 50-cap through the load-more affordance", async ({ page }) => {
    const consoleErrors = setupEnvNoise(page);
    await routeBrowsePalettes(page);

    await page.goto("/");
    await openView(page, "Browse");

    const main = page.getByRole("main", { name: "Color tool panes" });
    const cards = main.getByRole("article").filter({ visible: true });
    await expect(cards).toHaveCount(PAGE1_COUNT);

    const more = main
        .getByRole("button", { name: "More from the commons" })
        .filter({ visible: true });
    await expect(more).toBeVisible();
    await more.click();

    // Page 2 APPENDS (never replaces the wall) …
    await expect(cards).toHaveCount(PAGE1_COUNT + PAGE2_COUNT);
    await expect(
        page
            .getByText(`Wall Palette ${PAGE1_COUNT + PAGE2_COUNT}`, { exact: true })
            .first(),
    ).toBeVisible();

    // … and the affordance retires with the cursor.
    await expect(more).toHaveCount(0);

    expect(consoleErrors).toEqual([]);
});
