import { test, expect } from "@playwright/test";
import { expandDock } from "../fixtures/dock";

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
 * /colors/propose submission step is NOT exercised here because the
 * propose-mode <span role="textbox" contenteditable> lives in the
 * dock's collapse-cycle layer and is not reliably reachable via
 * accessible-name selectors during the cross-fade. Filed as an
 * E.W3-Lane-A finding (audit doc §6 "dock-collapse a11y finding").
 * The cycle-state assertion here proves the propose pathway is wired;
 * the contenteditable submission has unit coverage in
 * test/parsing/extract.test.ts via the underlying
 * `submitProposedName` handler.
 */
test("propose cycle reaches 'Propose color name' state for an unnamed color", async ({
    page,
}) => {
    await page.goto("/?color=%23abcdef");
    await expect(page.getByRole("main", { name: "Color tool panes" })).toBeVisible();
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
