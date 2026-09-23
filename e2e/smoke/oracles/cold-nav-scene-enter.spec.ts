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
 * Two routes, `CONTEXTS` fresh contexts each:
 *   · `#/gradient`: two lazy panes (Gradient ‖ Palettes), the arm Act 2a
 *     measured;
 *   · `#/`: the eager Picker beside the lazy About pane. The Picker's mount
 *     re-renders the slot while About's chunk is still in flight, which is
 *     the general form of the trigger.
 *
 * The assertions, per context:
 *   · no element keeps a `vj-enter-enter-from` / `vj-enter-enter-active` class
 *     within `SETTLE_BOUND_MS`;
 *   · on `#/gradient`, within the same bound, the gradient rail is on-screen
 *     (its box starts inside the viewport).
 */

const CONTEXTS = 5;
const CHUNK_HOLD_MS = 800;
/** A pane module as the dev server serves it (the lazy pane chunks). */
const PANE_CHUNK = /\/(workbenches|scenes|palettes)\/.*Pane\.vue/;
/**
 * How long a reading may take to come true. The stuck state is permanent (the
 * classes are never removed), so any bound fails it. The bound only has to
 * cover the enter itself (`--spring-snappy`, 0.44 s) plus the software-GL frame
 * stall at boot: under the suite's swiftshader launch the renderer produced no
 * frame for ~2 s after the pane mounted (rAF 0/s, `document.timeline` frozen),
 * which holds a live transition mid-travel without anything being stuck.
 */
const SETTLE_BOUND_MS = 8_000;
const STUCK_ENTER = '[class*="vj-enter-enter-from"], [class*="vj-enter-enter-active"]';

async function coldNavigate(browser: Browser, hash: string) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    await ctx.route(PANE_CHUNK, async (route) => {
        await new Promise((resolve) => setTimeout(resolve, CHUNK_HOLD_MS));
        await route.continue();
    });
    const page = await ctx.newPage();
    // `networkidle` outlasts the held chunks, so every pane has RESOLVED before
    // the stuck-state poll starts. Without it the poll can read 0 while a lazy
    // pane is still in flight, before the dropped enter has happened at all.
    await page.goto(hash, { waitUntil: "networkidle", timeout: 60_000 });
    await expect(page.locator(".pane-plate"), "no region still shows its loading plate").toHaveCount(0, {
        timeout: 30_000,
    });
    return { ctx, page };
}

test.describe("X.W5.d3 — cold navigation leaves no scene mid-enter", () => {
    test.setTimeout(240_000);

    for (const hash of ["/#/gradient", "/#/"]) {
        test(`${hash}: ${CONTEXTS} fresh contexts × cold first navigation → 0 stuck enter states`, async ({
            browser,
        }) => {
            for (let i = 0; i < CONTEXTS; i++) {
                const { ctx, page } = await coldNavigate(browser, hash);
                try {
                    await expect
                        .poll(() => page.locator(STUCK_ENTER).count(), {
                            message: `${hash} context ${i}: a pane is still in vj-enter-enter-from/-active`,
                            timeout: SETTLE_BOUND_MS,
                        })
                        .toBe(0);
                    if (hash !== "/#/gradient") continue;
                    const bar = page.getByTestId("gradient-stop-bar");
                    await expect
                        .poll(async () => (await bar.boundingBox())?.x ?? Number.NaN, {
                            message: `${hash} context ${i}: the gradient rail starts inside the viewport`,
                            timeout: SETTLE_BOUND_MS,
                        })
                        .toBeGreaterThanOrEqual(0);
                    expect((await bar.boundingBox())!.x).toBeLessThan(1440);
                } finally {
                    await ctx.close();
                }
            }
        });
    }
});
