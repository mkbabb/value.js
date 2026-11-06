import { test, expect } from "@playwright/test";
import { routeBrowsePalettes } from "../fixtures/browse-palettes";
import { mainPane } from "../fixtures/dock";

/**
 * X-DS · value · pass 9 · P9R-01 — AN EXPANDED CARD'S SWATCHES NEVER COVER ITS META ROW.
 *
 * The detail band must sit below the card's meta (X·§0hm D-24: tags and vote share the name
 * row at every card width). Before, below 30rem the meta took row 3 and the detail band had to
 * drop to row 4. The band sits inside the Collapsible's
 * `display: contents` root, so a CHILD selector never matched it: the band kept
 * the `detail` area (row 3) and the swatch row painted over the tags and the
 * vote on every expanded Browse card at 1440 (460 px cards) and 390.
 *
 * The oracle reads geometry: on the expanded card, the meta row's box and the
 * detail band's box do not intersect, and the band sits below the meta row.
 */
for (const [label, width, height] of [
    ["1440", 1440, 900],
    ["390", 390, 844],
] as const) {
    test(`P9R-01 · expanded card at ${label}: the detail band sits below the meta row`, async ({ page }) => {
        await page.setViewportSize({ width, height });
        await routeBrowsePalettes(page);
        await page.goto("/#/browse");
        const main = mainPane(page);
        const card = main.getByRole("article").first();
        await expect(card).toBeVisible({ timeout: 60_000 });
        // X·§0ht (a) D-24.r1: the card is its own disclosure (below 30rem of
        // card the chevron yields to the name), so the oracle opens it by the
        // card's own verb at both widths.
        await card.locator("[data-palette-name]").click();
        const detail = card.locator(".palette-card__detail");
        await expect(card.locator("[data-palette-swatches]")).toBeVisible();
        // the disclosure's open morph settles before the geometry read
        await expect
            .poll(async () => (await detail.boundingBox())?.height ?? 0, { timeout: 10_000 })
            .toBeGreaterThan(40);
        await page.waitForTimeout(600);
        // X·§0hm D-24: the meta's two cells (tags, vote) are the card's own
        // grid cells on the name row; the tags cell renders only when the
        // palette has tags, so the vote is the cell every card has.
        const tags = card.locator(".palette-meta__tags");
        const metaCell = (await tags.count()) > 0 ? tags : card.locator(".palette-meta__vote");
        const [meta, band] = await Promise.all([metaCell.boundingBox(), detail.boundingBox()]);
        expect(meta, "meta row box").not.toBeNull();
        expect(band, "detail band box").not.toBeNull();
        const m = meta!;
        const b = band!;
        expect(b.height).toBeGreaterThan(0);
        const intersects =
            m.x < b.x + b.width && b.x < m.x + m.width && m.y < b.y + b.height && b.y < m.y + m.height;
        expect(intersects, `meta ${JSON.stringify(m)} vs detail ${JSON.stringify(b)}`).toBe(false);
        expect(b.y).toBeGreaterThanOrEqual(m.y + m.height - 0.5);
    });
}
