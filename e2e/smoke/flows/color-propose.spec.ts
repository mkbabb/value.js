import { test, expect } from "@playwright/test";
import { expandDock, mainPane } from "../fixtures/dock";

/**
 * E.W3 Lane A flow #8 — color-propose (propose-mode cycle smoke).
 *
 * The ActionBarLayer's toggle button cycles actions→input→propose;
 * the `canProposeName` computed (true when the active color doesn't
 * match a built-in or custom name) gates the cycle into the propose
 * leg. We seed an unnamed color via the URL, expand the dock + action
 * bar, then assert the cycle reaches the "Propose color name" state
 * (a label only present when canProposeName=true AND the input layer
 * is active).
 *
 * COVERAGE NOTE (E-AUDIT-6 §10 follow-up): the final POST
 * /colors/propose submission step is NOT exercised by the first test because
 * the propose-mode <span role="textbox" contenteditable> lives in the dock's
 * collapse-cycle layer and is not reliably reachable via accessible-name
 * selectors during the cross-fade. Filed as an E.W3-Lane-A finding (audit doc
 * §6 "dock-collapse a11y finding").
 *
 * ── X-W1 · R2 + R20 (shell-dock-actionbarlayer AB-9) ────────────────────────
 * The sentence that stood here — *"the contenteditable submission has unit
 * coverage in test/parsing/extract.test.ts via the underlying
 * `submitProposedName` handler"* — is DELETED as a false citation. MEASURED
 * 2026-09-18: `test/parsing/` holds exactly one entry, `timeline/`, and no file
 * named `extract.test.ts` exists anywhere in the repository; `submitProposedName`
 * appears only in `demo/shell/dock/ColorInput.vue`, in no test of any species.
 * The claim discharged nothing — it merely pointed the reader away from a hole.
 * R20's rider replaces it with the CYCLE-INVARIANT gate below, which asserts
 * the swap machinery the old assertions never touched (they read one toggle's
 * aria-label, a control OUTSIDE the two swapped sub-layers).
 */
test("propose cycle reaches 'Propose color name' state for an unnamed color", async ({
    page,
}) => {
    await page.goto("/?color=%23abcdef");
    await expect(mainPane(page)).toBeVisible();
    // Ensure the dock is expanded (desktop boots expanded post-N.W5 Defect-B;
    // `expandDock` is a no-op then, and clicks the pill on any collapsed viewport).
    await expandDock(page);
    // Toggle action bar → cycle to input → cycle to propose (real clicks — the
    // controls are reachable on the expanded dock; no `force:true`).
    await page.getByRole("button", { name: "Toggle action bar" }).click();
    // "Toggle action bar" swaps the dock's active layer via a DockLayerGroup
    // spring morph. Until it settles, the entering ActionBarLayer sits in a
    // still-transitioning (inert) dock layer, so a click on its "Open color
    // input" toggle is swallowed — Playwright reports the click landed, yet the
    // handler never runs and the cycle never advances (a nondeterministic
    // ~30% miss that only surfaces under load, deep in the sequential run). Wait
    // for the dock's own settle signal (`[data-morphing]` clears) before the
    // next click — the same idiom `expandDock` uses. This is transition
    // synchronisation, NOT a product accommodation: canProposeName is correct
    // and the control works; the click was racing the reveal animation.
    await expect(page.locator(".glass-dock[data-morphing]")).toHaveCount(0, {
        timeout: 5000,
    });
    await page.getByRole("button", { name: "Open color input" }).click();
    // The toggle label flips to "Propose color name" iff
    // canProposeName=true AND the input sub-layer is active — the
    // assertion that the cycle reached the propose state.
    await expect(
        page.getByRole("button", { name: "Propose color name" }),
    ).toBeVisible();
});

/**
 * X-W1 · R20 (AB-9 + AB-26 + MISS-11) — THE CYCLE INVARIANT.
 *
 * AB-9's finding: the component's sole gate was vacuous. Its surviving
 * assertions read the toggle's `aria-label`, computed from `toolbarMode` +
 * `canProposeName` on a control that is not part of the swap at all, so every
 * mutation to the swap machinery stayed green. The invariant the layer
 * actually maintains — and the one nothing measured — is a THREE-part law
 * (`ActionBarLayer.vue:87-93`):
 *
 *   1. exactly one `.dock-layer` carries `is-active`, in every cycle state;
 *   2. the other carries `inert` (so it is unreachable to pointer, keyboard
 *      and AT while it is crossfading out);
 *   3. a SUCCESSFUL propose returns the toolbar to `actions`.
 *
 * Leg 3 is born-RED and names a live product defect: `ColorInput.vue:238`
 * carries the comment *"Signal parent to exit propose mode"* above code that
 * sends NO signal — the component declares no `emits`, exposes no event, and
 * `ActionBarLayer` holds `colorInputRef` without a single watcher on it. The
 * only exit from propose mode is a third press of the toggle. The comment
 * describes an intention; this leg measures the behaviour.
 */
test("the sub-layer cycle keeps exactly one active layer, the other inert", async ({
    page,
}) => {
    await page.goto("/?color=%23abcdef");
    await expect(mainPane(page)).toBeVisible();
    await expandDock(page);
    await page.getByRole("button", { name: "Toggle action bar" }).click();
    await expect(page.locator(".glass-dock[data-morphing]")).toHaveCount(0, {
        timeout: 5000,
    });

    const grid = page.locator(".dock-layer-grid").first();
    const layers = grid.locator("> .dock-layer");
    await expect(layers, "the grid hosts both sub-layers at once").toHaveCount(2);

    /** The invariant, asserted at whatever cycle state the toolbar is in. */
    const expectOneActiveOneInert = async (where: string) => {
        await expect(
            grid.locator("> .dock-layer.is-active"),
            `${where}: exactly one sub-layer is active`,
        ).toHaveCount(1);
        await expect(
            grid.locator("> .dock-layer:not(.is-active)"),
            `${where}: the inactive sub-layer is inert — a crossfading layer must not be reachable by pointer, keyboard or AT`,
        ).toHaveAttribute("inert", /.*/);
    };

    await expectOneActiveOneInert("actions");

    await page.getByRole("button", { name: "Open color input" }).click();
    await expectOneActiveOneInert("input");

    // The propose leg shares the INPUT sub-layer (`activeSubLayer` is keyed on
    // `showInput`, not on `toolbarMode`), so the invariant must survive a state
    // change that does not swap the layer.
    await page.getByRole("button", { name: "Propose color name" }).click();
    await expectOneActiveOneInert("propose");
});

test("a successful propose returns the toolbar to its actions state", async ({
    page,
}) => {
    let proposed = false;
    await page.route("**/colors/propose", (route) => {
        proposed = true;
        return route.fulfill({
            status: 201,
            contentType: "application/json",
            body: JSON.stringify({ name: "ew1-proposed", css: "#abcdef" }),
        });
    });

    await page.goto("/?color=%23abcdef");
    await expect(mainPane(page)).toBeVisible();
    await expandDock(page);
    await page.getByRole("button", { name: "Toggle action bar" }).click();
    await expect(page.locator(".glass-dock[data-morphing]")).toHaveCount(0, {
        timeout: 5000,
    });
    await page.getByRole("button", { name: "Open color input" }).click();
    await page.getByRole("button", { name: "Propose color name" }).click();

    const field = page.getByRole("textbox", { name: /color/i }).first();
    await field.click();
    await page.keyboard.type("ew1 proposed");
    await page.keyboard.press("Enter");

    await expect
        .poll(() => proposed, {
            message: "the propose submission never reached the network",
        })
        .toBe(true);

    // The toolbar's own statement that it is back in the actions state: the
    // toggle re-offers "Open color input". `ColorInput` sends no signal for
    // this today — see the docblock above.
    await expect(
        page.getByRole("button", { name: "Open color input" }),
        "a successful propose must return the toolbar to `actions` — ColorInput.vue:238 comments that it signals the parent, and sends nothing",
    ).toBeVisible({ timeout: 4000 });
});
