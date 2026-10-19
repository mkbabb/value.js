import { test, expect } from "@playwright/test";
import { routeBrowsePalettes } from "../fixtures/browse-palettes";
import { mainPane } from "../fixtures/dock";

/**
 * X-DS · value · pass 9 · P9R-01 — AN EXPANDED CARD'S SWATCHES NEVER COVER ITS META ROW.
 *
 * Below 30rem of card, the meta cluster (tags, vote) drops to grid row 3 and the
 * detail band must drop to row 4. The band sits inside the Collapsible's
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
        await card.getByRole("button", { name: /^Colors of / }).click();
        const detail = card.locator(".palette-card__detail");
        await expect(card.locator("[data-palette-swatches]")).toBeVisible();
        // the disclosure's open morph settles before the geometry read
        await expect
            .poll(async () => (await detail.boundingBox())?.height ?? 0, { timeout: 10_000 })
            .toBeGreaterThan(40);
        await page.waitForTimeout(600);
        const [meta, band] = await Promise.all([
            card.locator(".palette-meta").boundingBox(),
            detail.boundingBox(),
        ]);
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
