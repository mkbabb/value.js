import { test, expect } from "@playwright/test";
import { mainPane } from "./fixtures/dock";
import {
    extractedCard,
    loadExtractImage,
    replaceExtractImage,
    LANDSCAPE,
} from "./fixtures/extract-image";

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

        test("O-1: the weighted strip stands above the name row and the swatches, its cells by share", async ({
            page,
        }) => {
            await loadExtractImage(page, UNEQUAL);
            const card = extractedCard(page);
            const strip = card.locator(
                '[data-color-strip][data-orientation="horizontal"]',
            );
            await expect(strip).toBeVisible();
            await page.waitForTimeout(500);
            const g = await card.evaluate((el) => {
                const s = el
                    .querySelector<HTMLElement>("[data-color-strip]")!
                    .getBoundingClientRect();
                const name = el
                    .querySelector<HTMLElement>("[data-palette-name]")!
                    .getBoundingClientRect();
                const sw = el
                    .querySelector<HTMLElement>(".swatch-button")!
                    .getBoundingClientRect();
                const bands = [
                    ...el.querySelectorAll<HTMLElement>(
                        "[data-color-strip] [data-band]",
                    ),
                ].map((b) => b.getBoundingClientRect().width);
                return {
                    stripH: s.height,
                    stripBottom: s.bottom,
                    nameTop: name.top,
                    swatchTop: sw.top,
                    bands,
                };
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
    test("My Palettes keeps V6C-06: an opened card's strip folds away", async ({
        page,
    }) => {
        await page.goto("/#/palettes", { waitUntil: "domcontentloaded" });
        await expect(mainPane(page)).toBeVisible({ timeout: 60_000 });
        const cards = mainPane(page).locator(
            '[role="article"][aria-label^="Palette:"]',
        );
        if ((await cards.count()) === 0)
            test.skip(true, "no saved palette in a fresh profile");
        await cards.first().click({ position: { x: 24, y: 12 } });
        await page.waitForTimeout(600);
        const h = await cards
            .first()
            .locator('[data-color-strip][data-orientation="horizontal"]')
            .evaluate((s) => s.getBoundingClientRect().height);
        expect(h).toBeLessThanOrEqual(0.5);
    });
});

test.describe("O-3: the strip says the shares; no line restates it", () => {
    test.use({ viewport: { width: 390, height: 844 } });

    test("no share or dominant line above the card; each band is named by its share and value", async ({
        page,
    }) => {
        await loadExtractImage(page, UNEQUAL);
        const main = mainPane(page);
        await expect(main.getByText(/% of the image/)).toHaveCount(0);
        await expect(main.getByText(/^dominant$/)).toHaveCount(0);
        const names = await extractedCard(page)
            .locator("[data-color-strip] [data-band]")
            .evaluateAll((els) => els.map((e) => e.getAttribute("aria-label") ?? ""));
        expect(names).toHaveLength(3);
        for (const n of names) expect(n).toMatch(/^\d{1,3}% · \S/);
        const shares = names.map((n) => parseInt(n, 10)).sort((a, b) => a - b);
        expect(shares).toEqual([25, 25, 50]);
    });

    test("O-7: the photo's Pick a color chip reads at 14 px or more", async ({ page }) => {
        await loadExtractImage(page, UNEQUAL);
        const chip = mainPane(page).locator("[data-zone-affordance]");
        await expect(chip).toBeVisible();
        const size = await chip.evaluate((el) => parseFloat(getComputedStyle(el).fontSize));
        expect(size).toBeGreaterThanOrEqual(14);
    });
});

/**
 * O-2: before filling, the result seat holds a proper shadow palette, the
 * developed card's own silhouette (strip, name row, k daubs) in the skeleton
 * ink; it is still at rest and breathes only while a run is in flight; the
 * developed card fills the same box, and a Replace never collapses the column.
 * Today the ghost is a 40 px outline strip, and the out-in morph took the
 * column from 325.7 to 226.1 px and back at 390.
 */
for (const width of [1440, 390] as const) {
    test.describe(`O-2: the shadow palette at ${width}`, () => {
        test.use({ viewport: { width, height: width === 390 ? 844 : 900 } });

        test("the ghost is the developed card's box, still and silent at rest", async ({
            page,
        }) => {
            await page.goto("/#/extract", { waitUntil: "domcontentloaded" });
            const ghost = mainPane(page)
                .locator('[data-slot="shadow-palette"]')
                .first();
            await expect(ghost).toBeVisible({ timeout: 60_000 });
            await expect(ghost).toHaveAttribute("aria-hidden", "true");
            await expect(
                ghost.locator('[data-slot="shadow-palette-head"]'),
            ).toHaveCount(1);
            await expect(
                ghost.locator('[data-slot="shadow-palette-daub"]'),
            ).toHaveCount(5);
            const still = await ghost.evaluate(
                (el) => el.getAnimations({ subtree: true }).length,
            );
            expect(still, "nothing runs on the empty face").toBe(0);
            // The ink is the site's skeleton ink, a fill, not an outline.
            const fill = await ghost
                .locator('[data-slot="shadow-palette-cell"]')
                .first()
                .evaluate((el) => getComputedStyle(el).backgroundColor);
            expect(fill).not.toMatch(/rgba\(0, 0, 0, 0\)|transparent/);
            const ghostH = await ghost.evaluate(
                (el) => el.getBoundingClientRect().height,
            );
            await loadExtractImage(page, LANDSCAPE);
            await page.waitForTimeout(600);
            const cardH = await extractedCard(page).evaluate(
                (el) => el.getBoundingClientRect().height,
            );
            expect(
                Math.abs(cardH - ghostH),
                `ghost ${ghostH} against card ${cardH}`,
            ).toBeLessThanOrEqual(2);
        });

        test("a Replace holds the result column to within 2 px, frame by frame", async ({
            page,
        }) => {
            await loadExtractImage(page, LANDSCAPE);
            await page.waitForTimeout(600);
            const seat = mainPane(page).locator(".extract-result-seat").first();
            const settled = await seat.evaluate(
                (el) => el.getBoundingClientRect().height,
            );
            await seat.evaluate((el) => {
                const w = window as unknown as { __seat: number[] };
                w.__seat = [];
                const tick = () => {
                    w.__seat.push(el.getBoundingClientRect().height);
                    if (w.__seat.length < 240) requestAnimationFrame(tick);
                };
                requestAnimationFrame(tick);
            });
            await replaceExtractImage(page, {
                ...LANDSCAPE,
                colors: ["#0f766e", "#f59e0b", "#7c3aed", "#f8fafc"],
            });
            await page.waitForTimeout(2500);
            const heights = await page.evaluate(
                () => (window as unknown as { __seat: number[] }).__seat,
            );
            expect(heights.length).toBeGreaterThan(30);
            for (const h of heights) {
                expect(
                    Math.abs(h - settled),
                    `${h} against ${settled}`,
                ).toBeLessThanOrEqual(2);
            }
        });
    });
}

test.describe("O-2: the run in flight breathes, and reduced motion holds it still", () => {
    test.use({ viewport: { width: 390, height: 844 } });

    for (const reduced of [false, true]) {
        test(`mid-run the ghost announces itself and ${reduced ? "holds still under reduced motion" : "breathes"}`, async ({
            page,
        }) => {
            await page.emulateMedia({
                reducedMotion: reduced ? "reduce" : "no-preference",
            });
            await loadExtractImage(page, LANDSCAPE);
            await page.waitForTimeout(400);
            // Hold the next run in flight: the quantizer's worker never hears it.
            await page.evaluate(() => {
                const proto = Worker.prototype;
                const post = proto.postMessage;
                proto.postMessage = function () {
                    /* held */
                } as Worker["postMessage"];
                (window as unknown as { __release: () => void }).__release = () => {
                    proto.postMessage = post;
                };
            });
            await replaceExtractImage(page, {
                ...LANDSCAPE,
                colors: ["#0f766e", "#f59e0b", "#7c3aed", "#f8fafc"],
            });
            const ghost = mainPane(page)
                .locator('[data-slot="shadow-palette"]')
                .first();
            await expect(ghost).toBeVisible({ timeout: 10_000 });
            await expect(ghost).toHaveAttribute("role", "status");
            await page.waitForTimeout(300);
            const running = await ghost.evaluate(
                (el) =>
                    el
                        .getAnimations({ subtree: true })
                        .filter((a) => a.playState === "running").length,
            );
            await page.evaluate(() =>
                (window as unknown as { __release: () => void }).__release(),
            );
            if (reduced) expect(running, "reduced motion: still").toBe(0);
            else expect(running, "the run breathes").toBeGreaterThan(0);
        });
    }
});
