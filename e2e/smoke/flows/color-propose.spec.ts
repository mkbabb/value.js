import { test, expect } from "@playwright/test";

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
    // Expand the collapsed dock (idiomatic from view-switch.spec).
    await page.getByRole("combobox", { name: "Select view" }).click({ force: true });
    await page.keyboard.press("Escape");
    // Toggle action bar → cycle to input → cycle to propose.
    await page.getByRole("button", { name: "Toggle action bar" }).click({ force: true });
    await page.getByRole("button", { name: "Open color input" }).click({ force: true });
    // The toggle label flips to "Propose color name" iff
    // canProposeName=true AND the input sub-layer is active — the
    // assertion that the cycle reached the propose state.
    await expect(
        page.getByRole("button", { name: "Propose color name" }),
    ).toBeVisible();
});
