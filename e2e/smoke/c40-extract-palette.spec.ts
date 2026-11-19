import { test, expect } from "@playwright/test";
import { mainPane } from "./fixtures/dock";
import { extractedCard, loadExtractImage } from "./fixtures/extract-image";

/**
 * Extract's palette (color-40 O-1 to O-3; his FORTIETH order: "the pallete
 * before filling should be a proper shadow palette skeleton--after it should be
 * a palette with a palette overview view (like in my palettes) and an individal
 * palette view, like extant").
 */

/** Three flat colours over unequal shares: half, a quarter, a quarter. */
const UNEQUAL = {
    width: 320,
    height: 240,
    colors: ["#1e3a8a", "#1e3a8a", "#e11d48", "#fde68a"],
    name: "unequal.png",
} as const;

for (const width of [1440, 390] as const) {
    test.describe(`the developed card at ${width}`, () => {
        test.use({ viewport: { width, height: width === 390 ? 844 : 900 } });

        test("O-1: the weighted strip stands above the name row and the swatches, its cells by share", async ({ page }) => {
            await loadExtractImage(page, UNEQUAL);
            const card = extractedCard(page);
            const strip = card.locator('[data-color-strip][data-orientation="horizontal"]');
            await expect(strip).toBeVisible();
            await page.waitForTimeout(500);
            const g = await card.evaluate((el) => {
                const s = el.querySelector<HTMLElement>("[data-color-strip]")!.getBoundingClientRect();
                const name = el.querySelector<HTMLElement>("[data-palette-name]")!.getBoundingClientRect();
                const sw = el.querySelector<HTMLElement>(".swatch-button")!.getBoundingClientRect();
                const bands = [...el.querySelectorAll<HTMLElement>("[data-color-strip] [data-band]")].map(
                    (b) => b.getBoundingClientRect().width,
                );
                return { stripH: s.height, stripBottom: s.bottom, nameTop: name.top, swatchTop: sw.top, bands };
            });
            expect(g.stripH).toBeGreaterThanOrEqual(39.5);
            expect(g.stripBottom).toBeLessThanOrEqual(g.nameTop + 0.5);
            expect(g.nameTop).toBeLessThan(g.swatchTop);
            // Half, a quarter, a quarter: the widest cell is twice the narrowest.
            expect(g.bands).toHaveLength(3);
            const sorted = [...g.bands].sort((a, b) => a - b);
            expect(sorted[2]! / sorted[0]!).toBeGreaterThan(1.8);
            expect(sorted[2]! / sorted[0]!).toBeLessThan(2.2);
        });
    });
}

test.describe("O-1: the card is the extract result only", () => {
    test.use({ viewport: { width: 1440, height: 900 } });
    test("My Palettes keeps V6C-06: an opened card's strip folds away", async ({ page }) => {
        await page.goto("/#/palettes", { waitUntil: "domcontentloaded" });
        await expect(mainPane(page)).toBeVisible({ timeout: 60_000 });
        const cards = mainPane(page).locator('[role="article"][aria-label^="Palette:"]');
        if ((await cards.count()) === 0) test.skip(true, "no saved palette in a fresh profile");
        await cards.first().click({ position: { x: 24, y: 12 } });
        await page.waitForTimeout(600);
        const h = await cards
            .first()
            .locator('[data-color-strip][data-orientation="horizontal"]')
            .evaluate((s) => s.getBoundingClientRect().height);
        expect(h).toBeLessThanOrEqual(0.5);
    });
});
