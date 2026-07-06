import { test, expect } from "@playwright/test";
import { setupEnvNoise } from "../fixtures/env-noise";
import { openView } from "../fixtures/dock";

/**
 * S.W3-6 / Q10 — the Safari-true proof (WebKit engine, iPhone 14 descriptor).
 *
 * The mix convergence is Safari-true BY CONSTRUCTION: pure geometry —
 * radial-gradient soft discs + source-over compositing, no `ctx.filter`
 * (never shipped in WebKit), no engine-conditional path, NO degraded
 * fallback. This spec drives the real flow on WebKit and asserts the same
 * choreography contract the Chromium spec asserts: the destination well is
 * announced, no spinner grammar, the plate inks in, zero console errors.
 *
 * Timing note: no tight wall-clock bound here — WebKit under software
 * rendering on CI is slow; the Safari-true gate is the flow completing with
 * identical semantics on the identical code path, not the runner's clock.
 */
test("mix convergence completes on WebKit with zero console errors", async ({
    page,
}) => {
    const consoleErrors = setupEnvNoise(page);

    await page.goto("/");
    await openView(page, "Mix");

    const main = page.getByRole("main", { name: "Color tool panes" });

    const addSlot = main.getByRole("button", {
        name: "Add current color to the mix",
    });
    await expect(addSlot).toBeVisible();
    await addSlot.click();
    await addSlot.click();
    await expect(main.locator("[data-mix-source]")).toHaveCount(2);

    await main.getByRole("button", { name: "Mix", exact: true }).click();

    // The announced destination (the ghost well) — the convergence target.
    await expect(main.locator("[data-mix-target]")).toBeVisible({
        timeout: 4000,
    });

    // The spinner grammar is retired on every engine.
    await expect(main.locator(".animate-spin")).toHaveCount(0);

    // The plate inks in on the ONE clock's settle.
    await expect(main.getByText(/^oklab\(/).first()).toBeVisible({
        timeout: 8000,
    });

    expect(consoleErrors).toEqual([]);
});
