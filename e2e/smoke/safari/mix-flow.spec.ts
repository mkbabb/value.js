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

    // ── X-W1 · R2 (SH-8 = PP-2 = A-3 = MX-3 = MSS-2 = MR-2) ─────────────────
    // The add-slot was bound by `getByRole("button", { name: "Add current color
    // to the mix" })`, which can NEVER match. MEASURED at the running app,
    // 2026-09-18: the slot renders `<span aria-hidden="true">` with no
    // `aria-label`, no `role`, `pointer-events: none`, and a forced click adds
    // no source. ROOT: glass-ui 7.0.0's `WatercolorDot` declares
    // `inheritAttrs: false` and renders that span, so the demo's `tag="button"`,
    // `aria-label`, `:disabled` and `@click` are all dropped at the seam. The
    // affordance is DEAD in the shipped product — a live BLOCKER, not a test
    // defect. glass-ui is READ-ONLY and `demo/` is this wave's Triumvirate
    // trigger, so the cure is routed (BH relay + the consumer wave) and the
    // oracle is made honest: it binds the node that exists and asserts the
    // contract that is broken.
    const addSlot = main.locator(".add-slot-ghost").first();
    await expect(addSlot).toBeVisible();
    await expect(
        addSlot,
        "the add-slot must be an OPERABLE control, not an aria-hidden decoration — glass-ui 7.0.0 WatercolorDot drops tag/aria-label/@click (inheritAttrs:false)",
    ).toHaveAttribute("aria-label", /Add current color/, { timeout: 2000 });
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
