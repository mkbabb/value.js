// SERVED MODEL: claude-opus-5-5
/**
 * X.W11.h13 · E13 — THE G11 GOLDEN HALF (X-W10 DISPOSITION §5 / §8 E13).
 *
 * G11 asked for "PaletteCard rest + hover, 3 viewports, light/dark". The
 * facet/silhouette half was discharged when `PaletteCard.vue` was deleted
 * (`d104cd5fc`); the golden half enrols on the SUCCESSOR card, the
 * `PaletteInspector` root (`.palette-card`, `role="article"`), as rest + hover
 * × the harness's three widths {390, 1024, 3440} × {light, dark} = 12 cells.
 *
 * The canon it witnesses (`demo/DESIGN.md`): §1.1 BREATH OF LIFE — a hoverable
 * container owes a DISTINCT hover frame; §2.1–2.2 M-1/M-2 — the in-chrome card
 * casts nothing, at rest or on hover.
 *
 * Capture inputs only (R35's CURE-SHAPE LOCK): the Palettes pane is populated
 * by the existing seeded-storage init script, and the hover is a real pointer
 * hover. Every cell reaches the camera through the one `visual.shot()` path.
 */
import type { Page } from "@playwright/test";
import { SCHEMES, VIEWPORTS, type Scheme } from "./census";
import { gotoRoute, seedSavedPalettes, seedScheme } from "./capture";
import { visualTest as test, expect } from "./fixtures";

const STATES = ["rest", "hover"] as const;
type CardState = (typeof STATES)[number];

/** The successor card's root, as the product renders it. */
function firstCard(page: Page) {
    return page.locator('.palette-card[role="article"]').first();
}

/** The card root's live hover register: `translate` and the hairline colour. */
async function register(page: Page): Promise<{ translate: string; border: string }> {
    return firstCard(page).evaluate((el) => {
        const cs = getComputedStyle(el);
        return { translate: cs.translate, border: cs.borderTopColor };
    });
}

test.describe("palette-card", () => {
    for (const viewport of VIEWPORTS) {
        for (const scheme of SCHEMES as readonly Scheme[]) {
            for (const state of STATES as readonly CardState[]) {
                test(`palette-card ${state} · ${viewport.id} · ${scheme}`, async ({
                    page,
                    visual,
                }) => {
                    const capture = { width: viewport.width, height: viewport.height };
                    await seedSavedPalettes(page.context());
                    await seedScheme(page.context(), scheme);
                    await page.emulateMedia({ colorScheme: scheme });
                    await page.setViewportSize(capture);

                    await gotoRoute(page, "/#/palettes");

                    // The seed must reach the card, or this arm photographs the
                    // empty pane under the card's name.
                    const card = firstCard(page);
                    await expect(
                        card,
                        "no PaletteInspector card rendered from the seeded store",
                    ).toBeVisible();
                    await expect(card).toContainText("Seeded Palette 1");

                    const rest = await register(page);
                    if (state === "hover") {
                        await card.hover();
                        // §1.1: the hover frame must be DISTINCT from rest. The
                        // register is read live, so a hover that paints nothing
                        // reds here, by name, before any golden is consulted.
                        await expect
                            .poll(() => register(page), {
                                message:
                                    "the card's hover frame is identical to rest (§1.1)",
                            })
                            .not.toEqual(rest);
                    }

                    await visual.shot(page, {
                        arm: "palette-card",
                        subject: state,
                        pane: viewport.form === "mobile" ? "palettes" : "both",
                        viewport: viewport.id,
                        scheme,
                        fidelity: "real",
                        capture,
                    });
                });
            }
        }
    }
});
