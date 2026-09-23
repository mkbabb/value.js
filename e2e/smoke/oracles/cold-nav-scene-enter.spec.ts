// SERVED MODEL: claude-opus-5-5[1m]
import { test, expect } from "@playwright/test";
import type { Browser } from "@playwright/test";

/**
 * X-W5 · X.W5.d3 — the COLD-NAVIGATION witness (COHESION §0ay ESC-W6close5-1).
 *
 * The defect: on a cold first navigation the incoming scene could be left in
 * `vj-enter-enter-from` + `vj-enter-enter-active` for good. The pane then held
 * its entry transform and the gradient rail sat off-screen at x = −351 (X-W6
 * fifth close, Act 2a: 1 of 5 fresh browsers on a cold dev server).
 *
 * The condition that produces it: the pane's chunk arrives AFTER the slot's
 * loading delay (`usePaneRouter`'s `PANE_LOAD_DELAY_MS`, 200 ms). The async
 * pane then swaps its loading plate for the resolved pane INSIDE the slot's one
 * `<Transition>` child. A cold server's first transform crosses that delay only
 * sometimes, so this witness makes the cold network explicit instead. Each
 * context is fresh (no cache, no storage), and its pane-chunk requests are held
 * for `CHUNK_HOLD_MS`, so every first navigation takes the plate → pane path.
 *
 * The assertions, per context:
 *   · no element keeps a `vj-enter-enter-from` / `vj-enter-enter-active` class
 *     once the scene has had its enter (the stuck state was measured held for
 *     12 s; a poll bounded well under that is a falsifier, not a settle);
 *   · the gradient rail is on-screen (its box starts inside the viewport).
 */

const CONTEXTS = 5;
const CHUNK_HOLD_MS = 800;
/** A pane module as the dev server serves it (the lazy pane chunks). */
const PANE_CHUNK = /\/(workbenches|scenes|palettes)\/.*Pane\.vue/;
const STUCK_ENTER = '[class*="vj-enter-enter-from"], [class*="vj-enter-enter-active"]';

async function coldNavigate(browser: Browser) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    await ctx.route(PANE_CHUNK, async (route) => {
        await new Promise((resolve) => setTimeout(resolve, CHUNK_HOLD_MS));
        await route.continue();
    });
    const page = await ctx.newPage();
    await page.goto("/#/gradient");
    const bar = page.getByTestId("gradient-stop-bar");
    await expect(bar).toBeAttached({ timeout: 30_000 });
    return { ctx, page, bar };
}

test.describe("X.W5.d3 — cold navigation leaves no scene mid-enter", () => {
    test.setTimeout(180_000);

    test(`${CONTEXTS} fresh contexts × cold first navigation → 0 stuck enter states`, async ({
        browser,
    }) => {
        for (let i = 0; i < CONTEXTS; i++) {
            const { ctx, page, bar } = await coldNavigate(browser);
            try {
                await expect
                    .poll(() => page.locator(STUCK_ENTER).count(), {
                        message: `context ${i}: a pane is still in vj-enter-enter-from/-active`,
                        timeout: 4_000,
                    })
                    .toBe(0);
                const box = await bar.boundingBox();
                expect(box, `context ${i}: the gradient rail has a box`).not.toBeNull();
                expect(box!.x, `context ${i}: the gradient rail starts on-screen`).toBeGreaterThanOrEqual(0);
                expect(box!.x, `context ${i}: the gradient rail starts inside the viewport`).toBeLessThan(1440);
            } finally {
                await ctx.close();
            }
        }
    });
});
