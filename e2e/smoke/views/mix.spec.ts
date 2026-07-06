import { test, expect } from "@playwright/test";
import { setupEnvNoise } from "../fixtures/env-noise";
import { openView } from "../fixtures/dock";

/**
 * Smoke (D.W5 Lane A): the Mix view renders its pane heading.
 * Picker is the left pane in mix mode; right pane is the Mix surface.
 */
test("mix view renders Mix heading with zero console errors", async ({
    page,
}) => {
    const consoleErrors = setupEnvNoise(page);

    await page.goto("/");

    await openView(page, "Mix");

    const main = page.getByRole("main", { name: "Color tool panes" });
    await expect(
        main.getByRole("heading", { name: "Mix" }).last(),
    ).toBeVisible();

    expect(consoleErrors).toEqual([]);
});

/**
 * S.W3-6 / Q10 — the mix convergence flow (the first-principles re-work).
 *
 * The choreography under test: startMix computes the result synchronously and
 * mounts the result plate GHOSTED (the awaiting well, `[data-mix-target]` —
 * the announced destination the canvas convergence lands on); the canvas
 * timeline is the ONE clock (MIX_CONVERGE_MS = 900ms) and its completion
 * event — not a parallel setTimeout — inks the plate in. Total choreography
 * ≤ 1.2s (§6.2 "Mix choreography wall clock" gate).
 *
 * Honest assertions vs the REPLACED choreography (enumerated per the Q10
 * commit discipline):
 *   - the generic spinner row ("Gathering…/Mixing…/Revealing…" +
 *     `.animate-spin`) is asserted ABSENT — the animation IS the progress;
 *   - the result must reveal within 2.5s of the click — the retired
 *     choreography could not reveal before its hard-coded 2.9s timer chain,
 *     so this bound both proves the ≤1.2s re-work (plus test-runner slack)
 *     and would catch a regression to timer-driven choreography.
 */
test("mix flow: convergence lands at the result plate within budget", async ({
    page,
}) => {
    const consoleErrors = setupEnvNoise(page);

    await page.goto("/");
    await openView(page, "Mix");

    const main = page.getByRole("main", { name: "Color tool panes" });

    // Two sources: add the picker's current color twice (a valid mix).
    const addSlot = main.getByRole("button", {
        name: "Add current color to the mix",
    });
    await expect(addSlot).toBeVisible();
    await addSlot.click();
    await addSlot.click();
    await expect(main.locator("[data-mix-source]")).toHaveCount(2);

    // Fire the mix.
    await main.getByRole("button", { name: "Mix", exact: true }).click();

    // The destination is ANNOUNCED: the result plate mounts ghosted with the
    // awaiting well — the anchor the convergence lands on.
    await expect(main.locator("[data-mix-target]")).toBeVisible({
        timeout: 2000,
    });

    // The spinner grammar is retired: no parallel progress row, ever.
    await expect(main.locator(".animate-spin")).toHaveCount(0);

    // The plate inks in on the canvas clock's settle — within the ≤1.2s
    // choreography budget plus runner slack (2.5s; the retired 2.9s-timer
    // choreography cannot pass this bound).
    await expect(main.getByText(/^oklab\(/).first()).toBeVisible({
        timeout: 2500,
    });

    expect(consoleErrors).toEqual([]);
});
