import { test, expect } from "@playwright/test";
import { setupEnvNoise } from "../fixtures/env-noise";
import { openView } from "../fixtures/dock";
import {
    routeBrowsePalettes,
    PAGE1_COUNT,
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
