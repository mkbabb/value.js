import { test, expect, type Page } from "@playwright/test";
import { mainPane } from "./fixtures/dock";
import { routeBrowsePalettes } from "./fixtures/browse-palettes";
import { loadExtractImage } from "./fixtures/extract-image";

/**
 * The palette swatch on a desk (color-40 L, his FORTIETH order: "a slight
 * border, a bit more depth, and animate on click/hover like a subtle
 * watercolour"). The phone half is `mobile/swatch-touch.spec.ts`.
 */

test.use({ viewport: { width: 1440, height: 900 } });

const seatsOf = (page: Page) =>
    mainPane(page)
        .locator(".swatch-button")
        .evaluateAll((els) =>
            els
                .map((el) => el.getBoundingClientRect())
                .filter((r) => r.width > 0 && r.height > 0)
                .map((r) => [r.width, r.height] as const),
        );

/** Opens the first Browse card's colours (the wall fixture's two). */
async function openBrowseCard(page: Page) {
    await routeBrowsePalettes(page);
    await page.goto("/#/browse", { waitUntil: "domcontentloaded" });
    const card = mainPane(page).locator('[role="article"][aria-label^="Palette:"]').first();
    await expect(card).toBeVisible({ timeout: 60_000 });
    await card.click({ position: { x: 24, y: 12 } });
    await expect(card.locator(".swatch-button").first()).toBeVisible({ timeout: 10_000 });
    return card;
}

test.describe("L-1: one seat on both axes", () => {
    test("Generate, an opened Browse card and Extract: every seat is square", async ({ page }) => {
        await page.goto("/#/generate", { waitUntil: "domcontentloaded" });
        await expect(mainPane(page).locator(".swatch-button").first()).toBeVisible({ timeout: 60_000 });
        const seats = [...(await seatsOf(page))];
        await openBrowseCard(page);
        seats.push(...(await seatsOf(page)));
        await loadExtractImage(page);
        seats.push(...(await seatsOf(page)));
        expect(seats.length).toBeGreaterThan(4);
        for (const [w, h] of seats) expect(Math.abs(w - h), `${w}x${h}`).toBeLessThanOrEqual(1);
    });
});
