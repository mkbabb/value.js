import { test, expect } from "@playwright/test";
import { routeBrowsePalettes } from "../fixtures/browse-palettes";
import { mainPane } from "../fixtures/dock";

/**
 * X·§0ht.a11y — ON A PHONE THE CARD'S DISCLOSURE AND ITS FEATURED TIER STAY IN
 * THE ACCESSIBILITY TREE.
 *
 * §0ht (a) D-24.r1 gave a phone card's name the row: the chevron ("Colors of
 * <name>") and the Featured label yield. They yielded by `display: none`, which
 * also took them out of the accessibility tree: the chevron is the card's one
 * `aria-expanded` (the card is a non-interactive article with `aria-current`),
 * and the label is the badge's only name (its glyph is aria-hidden; a span's
 * `title` names nothing). The container query had already hidden the label at
 * a 390 card with a mouse.
 *
 * The oracle reads the tree: the disclosure button is there by role and name,
 * its `aria-expanded` follows the card's own verb (tap, or click with a mouse),
 * the Featured card's accessible name carries the tier, and the badge's word is
 * in the card's subtree.
 */
const CELLS = [
    { label: "touch 390", width: 390, height: 844, touch: true },
    { label: "touch 430", width: 430, height: 932, touch: true },
    { label: "mouse 390", width: 390, height: 844, touch: false },
] as const;

for (const cell of CELLS) {
    for (const scheme of ["light", "dark"] as const) {
        test.describe(`§0ht.a11y · ${cell.label} · ${scheme}`, () => {
            test.use({
                viewport: { width: cell.width, height: cell.height },
                hasTouch: cell.touch,
                isMobile: cell.touch,
                colorScheme: scheme,
            });

            test("the disclosure and the Featured tier are in the tree", async ({ page }) => {
                await page.addInitScript((s) => {
                    try {
                        localStorage.setItem("vueuse-color-scheme", s);
                    } catch {}
                }, scheme);
                await routeBrowsePalettes(page);
                await page.goto("/#/browse");
                const main = mainPane(page);
                const card = main.getByRole("article", { name: /^Palette: Wall Palette 1\b/ });
                await expect(card).toBeVisible({ timeout: 60_000 });

                // (2) every Featured card names its tier, and the badge's word
                // is in the card's subtree (not only in the card's label). Soft, so
                // the disclosure leg below still reads when this one is RED.
                const featured = main.getByRole("article").filter({ has: page.locator(".featured-badge") });
                await expect(featured.first()).toBeVisible();
                for (const c of await featured.all()) {
                    await expect.soft(c).toHaveAccessibleName(/Featured/);
                    const body = (await c.ariaSnapshot()).split("\n").slice(1).join("\n");
                    expect.soft(body, "the badge's word in the card's subtree").toContain("Featured");
                }

                // (1) the disclosure is a button in the tree, and its
                // aria-expanded follows the card's own verb.
                const disclose = card.getByRole("button", { name: "Colors of Wall Palette 1" });
                await expect(disclose).toHaveCount(1);
                await expect(disclose).toHaveAttribute("aria-expanded", "false");
                const name = card.locator("[data-palette-name]");
                await name.scrollIntoViewIfNeeded();
                if (cell.touch) await name.tap();
                else await name.click();
                await expect(card.locator("[data-palette-swatches]")).toBeVisible();
                await expect(disclose).toHaveAttribute("aria-expanded", "true");
                if (cell.touch) await name.tap();
                else await name.click();
                await expect(disclose).toHaveAttribute("aria-expanded", "false");
            });
        });
    }
}
