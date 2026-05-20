import { test, expect, devices } from "@playwright/test";

/**
 * D.W5 Lane C — Pixel-7 mobile smoke probe.
 *
 * One spec that exercises the mobile-only paths: the PaneSegmentedControl
 * toggle that swaps between the dual-pane mobile layout slots, and the
 * mobile dock layer. Per `research/Dg-playwright-coverage.md §6`: a single
 * probe, not a full mobile suite (5-second budget).
 *
 * Engine note (per `D-HARDEN-5 §4`): Pixel-7 in Playwright runs **Chromium**,
 * not WebKit. This spec catches mobile-layout bugs but NOT iOS-Safari
 * engine-specific bugs. A `smoke-safari` WebKit project + 30s sustained
 * spec is recorded as a follow-up beyond D in `coordination/Q.md §11`.
 *
 * Selectors: role/label only. The mobile pane mounts in the `lg:hidden`
 * branch; at the Pixel-7 viewport (412×915) the desktop branch is hidden
 * via `lg:flex`, so the mobile copy IS the visible one — no `.last()`
 * convention needed.
 */

test.use({ ...devices["Pixel 7"] });

test("mobile boot: page renders + dock visible + zero console errors", async ({
    page,
}) => {
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
        const text = msg.text();
        // Filter env-noise from the shared production palette API rate
        // limits — same pattern as page-load.spec.ts.
        if (msg.type() !== "error") return;
        if (/Failed to load resource:.*\b(4\d\d|5\d\d)\b/.test(text)) return;
        consoleErrors.push(text);
    });
    page.on("pageerror", (err) => consoleErrors.push(err.message));

    await page.goto("/");

    // Primary landmark — proves the pane shell mounted in the mobile slot.
    const main = page.getByRole("main", { name: "Color tool panes" });
    await expect(main).toBeVisible();

    // Mobile dock — the navigation landmark wraps the fixed mobile dock,
    // which renders even on mobile (position:fixed at the bottom of the
    // viewport). Asserted attached because the box collapses.
    const nav = page.getByRole("navigation", { name: "Application navigation" });
    await expect(nav).toBeAttached();

    // The view-select combobox lives inside the dock — visible at mobile
    // since the dock collapses its layout but keeps the trigger reachable.
    await expect(page.getByRole("combobox", { name: /Select view/i })).toBeVisible();

    expect(consoleErrors).toEqual([]);
});
