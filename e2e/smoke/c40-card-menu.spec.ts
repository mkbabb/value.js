import { test, expect, type Page } from "@playwright/test";
import { extractedCard, loadExtractImage } from "./fixtures/extract-image";

/**
 * The palette card's three-dots menu (color-40 O-4, O-5; his FORTIETH order:
 * "clicking the three dots should not squish the entire container--the three
 * dots options should have more icons, like for json, export should be a
 * dropdown menu within a menu").
 */

const trigger = (page: Page) => extractedCard(page).getByRole("button", { name: /^Palette menu for / });

test.describe("O-5: the press is the card's own", () => {
    test.use({ viewport: { width: 1440, height: 900 } });

    test("holding the menu trigger leaves the card's box as it was", async ({ page }) => {
        await loadExtractImage(page);
        const card = extractedCard(page);
        await page.mouse.move(0, 0);
        await page.waitForTimeout(500);
        const rest = await card.evaluate((el) => {
            const r = el.getBoundingClientRect();
            return [r.width, r.height];
        });
        const box = (await trigger(page).boundingBox())!;
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
        await page.mouse.down();
        const held: number[][] = [];
        for (let i = 0; i < 8; i++) {
            await page.waitForTimeout(60);
            held.push(
                await card.evaluate((el) => {
                    const r = el.getBoundingClientRect();
                    return [r.width, r.height];
                }),
            );
        }
        await page.mouse.up();
        for (const [w, h] of held) {
            expect(Math.abs(w! - rest[0]!), `width ${w} against ${rest[0]}`).toBeLessThanOrEqual(0.5);
            expect(Math.abs(h! - rest[1]!), `height ${h} against ${rest[1]}`).toBeLessThanOrEqual(0.5);
        }
    });
});
