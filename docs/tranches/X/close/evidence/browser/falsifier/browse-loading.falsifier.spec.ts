// SERVED MODEL: claude-opus-5-5
// X.W11.d · G7 falsifier copy of e2e/smoke/views/browse-loading.spec.ts with ONE true assertion inverted (X-W1 G-7 diff 3d029e44 re-applied). Lives only under close/evidence; never in e2e/.
import { test, expect } from "@playwright/test";
import { mainPane } from "../../../../../../../e2e/smoke/fixtures/dock";
import { setupEnvNoise } from "../../../../../../../e2e/smoke/fixtures/env-noise";
import {
    routeBrowsePalettesDelayed,
    PAGE1_COUNT,
} from "../../../../../../../e2e/smoke/fixtures/browse-palettes";

/**
 * S.W5-1 (S-10) — the loading grammar, pinned by the delayed-route fixture.
 *
 * The wall's mid-fetch state must speak the developing-plate skeleton
 * grammar (`PaletteCardSkeleton`), never the generic spinner: the three
 * `Loader2` browse sites are DEAD (§Hard-gate 2). The fixture holds
 * `GET /palettes` open so the state is deterministically on screen.
 */
test("browse mid-fetch renders developing-plate skeletons, never a spinner", async ({
    page,
}) => {
    const consoleErrors = setupEnvNoise(page);
    await routeBrowsePalettesDelayed(page, 6000);

    // Route straight to the browse view (the admin-populated idiom) — the
    // dock walk would eat the mid-fetch window before the first assertion.
    await page.goto("/#/browse");

    const main = mainPane(page);

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
    await expect(skeletons).toHaveCount(1); // X.W11.d DELIBERATE BREAK (true value: 0)

    expect(consoleErrors).toEqual([]);
});
