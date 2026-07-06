import { test, expect } from "@playwright/test";
import { setupEnvNoise } from "../fixtures/env-noise";
import {
    routeBrowsePalettesDelayed,
    PAGE1_COUNT,
} from "../fixtures/browse-palettes";

/**
 * S.W5-1 (S-10) — the loading grammar, pinned by the delayed-route fixture.
 *
 * The wall's mid-fetch state must speak the developing-plate skeleton
 * grammar (`PaletteCardSkeleton`), never the generic spinner: the three
 * `Loader2` browse sites are DEAD (§Hard-gate 2). The fixture holds
 * `GET /palettes` open so the state is deterministically on screen.
 */
test("browse mid-fetch renders developing-plate skeletons, never a spinner", async ({ page }) => {
    const consoleErrors = setupEnvNoise(page);
    await routeBrowsePalettesDelayed(page, 6000);

    // Route straight to the browse view (the admin-populated idiom) — the
    // dock walk would eat the mid-fetch window before the first assertion.
    await page.goto("/#/browse");

    const main = page.getByRole("main", { name: "Color tool panes" });

    // The mid-fetch state: developing plates present…
    const skeletons = main
        .locator('[data-slot="palette-card-skeleton"]')
        .filter({ visible: true });
    await expect(skeletons.first()).toBeVisible();

    // …and NO generic spinner visible anywhere in the pane (the Loader2
    // class of loading furniture is dead on the browse surface; hidden
    // action-button spinners in the off-breakpoint slot don't count).
    await expect(
        main.locator("svg.animate-spin").filter({ visible: true }),
    ).toHaveCount(0);

    // The wall then develops into the real page-1 cards.
    const cards = main.getByRole("article").filter({ visible: true });
    await expect(cards).toHaveCount(PAGE1_COUNT, { timeout: 15_000 });
    await expect(skeletons).toHaveCount(0);

    expect(consoleErrors).toEqual([]);
});
