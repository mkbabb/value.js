// SERVED MODEL: claude-opus-5[1m]
import { test, expect, type Locator, type Page } from "@playwright/test";
import { expandDock, openView } from "./fixtures/dock";

/**
 * X-W4 · X.W4.d — THE TYPED `SceneActionSet` (gates D1 · D2 · D3 · D4).
 *
 * `W4.md` §5 "X.W4.d": *one contract names every scene action, and no action can
 * silently do nothing*. §6's unit-d table gives the four gates their falsifiers.
 * This file IS the browser half of D1 and the whole of D4; D2 is an `eslint`
 * invocation and D3 is a one-time `vue-tsc` falsifier demonstration — neither
 * can be a Playwright assertion, and neither is faked here. The gate FORM is a
 * spec, never a `scripts/proof-*.mjs` (CC-019, L-19).
 *
 * WHAT EACH GATE READS HERE, and why it is read that way:
 *
 *  · D1 — "one contract, one render path". The type half is `vue-tsc` + the
 *    single exported `SceneActionSet`; the RENDER half is asserted HERE because
 *    D1's own falsifier says so: *"fails if the collapse is faked by a union
 *    alias that both branches still render — the single render path is asserted
 *    in the spec, not by the type alone."* So the assertion is structural: for
 *    EVERY scene, the dock's action bar is the SAME container
 *    (`[data-testid="scene-action-row"]`, exactly one in the document) holding
 *    seats of the SAME shape (`[data-scene-action]` carrying a token). Two
 *    render paths cannot satisfy one container-plus-shape census.
 *
 *  · D1's named defect — the Picker priority. `Dock.vue`'s `v-if="actionBar"` /
 *    `v-else-if="genericBar"` made the picker's bar SUPPRESS the per-view bar
 *    wherever both existed; `mix` is the view where both exist (its `VIEW_MAP`
 *    row is `left: "color-picker", right: "mix"`). The mix case below is that
 *    defect's direct witness.
 *
 *  · D4 — "no silent no-op". The RED it measures is structural: the mobile
 *    `<PaneSlot>` carries no `:on-mount`, so under the mobile branch the scene
 *    panes never register and every Tools handler used to resolve to
 *    `undefined` with no user-visible signal. **The parity cure is X-W5's**
 *    (gate A3, `bindPane`) and is deliberately NOT taken here — so the mobile
 *    block below asserts the MODELLED `unavailable` state, never a working
 *    dispatch. D4's falsifier: *"Fails if an unregistered action still renders
 *    as an operable control."*
 *
 *  · AB-32 (the cure-regression rider, binding on this unit) — the collapse
 *    must CARRY an active/selected member or the only palette-open indicator
 *    regresses under a green gate. The last test is that rider's fence.
 *
 * VIEWPORT NOTE. `W4.md` §4 admits this unit ONE spec path, in `e2e/smoke/`, so
 * the unregistered-target matrix is measured by an in-file `test.describe` +
 * `test.use` viewport (the idiom `e2e/smoke/oracles/o27-focus-affordance.spec.ts`
 * and `a11y-gradient-stop-grammar.spec.ts` already use), never by inventing an
 * out-of-bounds `e2e/smoke/mobile/` twin. 390×844 puts `App.vue`'s
 * `useBreakpoint("(min-width: 1024px) and (min-aspect-ratio: 1.1)")` on its
 * mobile branch — which is the exact branch D4's RED lives in.
 */

// A cold load of a live-WebGL dev-served app plus several view switches does not
// fit the config's 30s default. The budget is raised HERE, per file, and NOT ONE
// ASSERTION IS RELAXED — the precedent X.W4.a's target specs and X.W4.c's
// grammar spec set.
test.beforeEach(({}, testInfo) => {
    testInfo.setTimeout(180_000);
});

/** The one action row the collapse promises. */
const row = (page: Page): Locator => page.locator('[data-testid="scene-action-row"]');

/** Every seat in the bar, in document order. */
const seats = (page: Page): Locator => page.locator("[data-scene-action]");

/** Read each seat's token, in document order. */
async function tokens(page: Page): Promise<string[]> {
    return seats(page).evaluateAll((els) =>
        els.map((el) => el.getAttribute("data-scene-action") ?? ""),
    );
}

/** Read each seat's modelled state, in document order. */
async function states(page: Page): Promise<string[]> {
    return seats(page).evaluateAll((els) =>
        els.map((el) => el.getAttribute("data-action-state") ?? ""),
    );
}

/**
 * Land the app cold and open the dock's action-bar layer.
 *
 * The demo routes through `createWebHashHistory()`, so a `goto` after a prior
 * navigation is a same-document hash change and a measurement taken on the way
 * samples the old view. Every landing here is a fresh document.
 */
async function landAndOpenBar(page: Page, view?: string): Promise<void> {
    await page.goto("/");
    await expect(page.locator(".glass-dock")).toBeVisible();
    if (view) {
        await openView(page, view);
    }
    await expandDock(page);
    const toggle = page.getByRole("button", { name: "Toggle action bar" });
    await expect(toggle).toBeVisible();
    await toggle.click();
    await expect(page.locator(".glass-dock[data-morphing]")).toHaveCount(0, {
        timeout: 8000,
    });
}

test.describe("D1 · one contract, ONE render path", () => {
    test("the color scene renders through the one action row", async ({ page }) => {
        await landAndOpenBar(page);

        // Exactly ONE row container in the whole document: a second render path
        // would either mint a second container or mint seats outside this one.
        await expect(row(page)).toHaveCount(1);
        await expect(seats(page)).toHaveCount(5);
        expect(await tokens(page)).toEqual([
            "color.reset",
            "color.copy",
            "color.random",
            "color.palettes",
            "color.extract",
        ]);

        // Every seat is a descendant of the one row — no orphan seat path.
        await expect(row(page).locator("[data-scene-action]")).toHaveCount(5);
    });

    test("a workbench scene renders through the SAME row and shape", async ({
        page,
    }) => {
        await landAndOpenBar(page, "Generate");

        await expect(row(page)).toHaveCount(1);
        expect(await tokens(page)).toEqual([
            "generate.regenerate",
            "generate.save",
            "generate.copyColors",
        ]);
        await expect(row(page).locator("[data-scene-action]")).toHaveCount(3);
    });

    test("the Picker priority is GONE: /mix renders the mix set, not the picker's", async ({
        page,
    }) => {
        // `VIEW_MAP.mix` is `left: "color-picker", right: "mix"` — the one view
        // where BOTH contracts existed, and the one where `v-if="actionBar"`
        // masked the scene bar on every desktop load (the D1 defect, verbatim:
        // "the Picker's bar suppresses the per-view bar wherever both exist").
        await landAndOpenBar(page, "Mix");

        await expect(row(page)).toHaveCount(1);
        const seen = await tokens(page);
        expect(seen).toEqual(["mix.clearSelection", "mix.startMix", "mix.copyResult"]);
        expect(
            seen.filter((t) => t.startsWith("color.")),
            "the picker's bar must not mask the mix scene's",
        ).toEqual([]);
    });
});

test.describe("D4 · an unregistered target is a TYPED, SURFACED state — never silence", () => {
    // The mobile branch: `App.vue`'s single `<PaneSlot>` carries no `:on-mount`,
    // so no scene pane registers. The cure for THAT is X-W5's `bindPane`; what
    // this wave owes is that the silence is unrepresentable.
    test.use({ viewport: { width: 390, height: 844 } });

    for (const [view, expected] of [
        ["Generate", ["generate.regenerate", "generate.save", "generate.copyColors"]],
        [
            "Gradient",
            ["gradient.reset", "gradient.copyCSS", "gradient.seedFromPalette"],
        ],
        ["Mix", ["mix.clearSelection", "mix.startMix", "mix.copyResult"]],
    ] as const) {
        test(`${view}: every action is named, modelled 'unavailable', and inoperable`, async ({
            page,
        }) => {
            await landAndOpenBar(page, view);

            await expect(row(page)).toHaveCount(1);
            expect(await tokens(page)).toEqual([...expected]);

            // (1) The state is MODELLED, not absent. `undefined` is not a state.
            expect(await states(page)).toEqual(expected.map(() => "unavailable"));

            // (2) The seat is NOT operable — D4's falsifier reads exactly this.
            const buttons = row(page).locator("[data-scene-action] button");
            await expect(buttons).toHaveCount(expected.length);
            for (let i = 0; i < expected.length; i += 1) {
                const button = buttons.nth(i);
                await expect(button).toBeDisabled();
                await expect(button).toHaveAttribute("aria-disabled", "true");
                // (3) …and it SAYS so: the accessible name carries the state,
                // so a screen-reader user is not told a dead control is live.
                await expect(button).toHaveAccessibleName(/unavailable/i);
            }

            // (4) One announced status message names the condition for AT.
            await expect(row(page).locator('[role="status"]')).toHaveCount(1);
            await expect(row(page).locator('[role="status"]')).toContainText(
                /not registered/i,
            );
        });
    }
});

test.describe("D4 · a registered target is READY, and dispatches for real", () => {
    test("Generate on the desktop branch: three ready seats, and one real dispatch", async ({
        page,
    }) => {
        await landAndOpenBar(page, "Generate");

        expect(await states(page)).toEqual(["ready", "ready", "ready"]);
        const regenerate = row(page).locator(
            '[data-scene-action="generate.regenerate"] button',
        );
        await expect(regenerate).toBeEnabled();
        await expect(regenerate).toHaveAccessibleName("Regenerate");

        // A real dispatch through the typed contract — the state must not
        // degrade (a throw would flip the seat to `failed`, which is itself a
        // rendered state, so this assertion catches BOTH silence and a swallow).
        await regenerate.click();
        await expect(
            row(page).locator('[data-scene-action="generate.regenerate"]'),
        ).toHaveAttribute("data-action-state", "ready");
    });
});

/**
 * §8 artefact 8 — this unit's OWN before/after frames.
 *
 * The five pairs §8 enumerates (slug cluster · rail letters · admin panel ·
 * Select composition · Gradient rail) are units a, b and c's surfaces and are
 * already banked. The surface THIS unit changes is the dock's action bar, so
 * its pair is taken here, on the two views that show the collapse:
 *
 *   · `/#/mix` at the desktop matrix — the D1 defect's own witness. Before the
 *     collapse the Picker priority rendered the PICKER's five seats here and
 *     the mix bar was never reachable; after, the mix set renders.
 *   · `/#/mix` at 390×844 — the branch where no pane registers, so the frame
 *     shows the modelled `unavailable` seats D4 is about.
 *
 * The file names carry no before/after suffix on purpose: the same assertions
 * run against the pre-collapse bytes to take the BEFORE pass, and the frames
 * are named by the pass that took them. Nothing here is a gate; the two
 * assertions are what make the frame worth keeping (a blank dock is not
 * evidence of anything).
 */
const FRAMES = "docs/tranches/X/waves/evidence/W4";

test.describe("§8 artefact 8 — the dock action bar's frames (desktop matrix)", () => {
    test("the Mix view's bar, framed", async ({ page }) => {
        await landAndOpenBar(page, "Mix");
        const dock = page.locator(".glass-dock");
        await expect(dock).toBeVisible();
        await expect(page.locator('[role="button"], button')).not.toHaveCount(0);
        await dock.screenshot({ path: `${FRAMES}/action-bar-mix-desktop.png` });
    });
});

test.describe("§8 artefact 8 — the dock action bar's frames (390 viewport)", () => {
    test.use({ viewport: { width: 390, height: 844 } });

    test("the Mix view's bar with no pane registered, framed", async ({ page }) => {
        await landAndOpenBar(page, "Mix");
        const dock = page.locator(".glass-dock");
        await expect(dock).toBeVisible();
        await expect(page.locator('[role="button"], button')).not.toHaveCount(0);
        await dock.screenshot({ path: `${FRAMES}/action-bar-mix-390.png` });
    });
});

test.describe("AB-32 · the collapse CARRIES the active/selected member", () => {
    test("the palette-open indicator survives the contract collapse", async ({
        page,
    }) => {
        // `paletteActive` is true whenever the current view is not the picker,
        // so landing on Palettes lights the indicator exactly as the pre-collapse
        // `ActionToolbar.vue:46` `:active-style` did.
        await landAndOpenBar(page, "Palettes");

        await expect(
            row(page).locator('[data-scene-action="color.palettes"]'),
        ).toHaveAttribute("data-action-active", "true");
        await expect(
            row(page).locator('[data-scene-action="color.copy"]'),
        ).toHaveAttribute("data-action-active", "false");
    });
});
