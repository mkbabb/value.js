import { test, expect, devices } from "@playwright/test";

/**
 * D.W5 Lane C — Pixel-7 mobile smoke probe.
 *
 * One spec that exercises the mobile-only paths. Per
 * `research/Dg-playwright-coverage.md §6`: a single probe, not a full mobile
 * suite (5-second budget).
 *
 * Engine note (per `D-HARDEN-5 §4`): Pixel-7 in Playwright runs **Chromium**,
 * not WebKit. This spec catches mobile-layout bugs but NOT iOS-Safari
 * engine-specific bugs. A `smoke-safari` WebKit project + 30s sustained
 * spec is recorded as a follow-up beyond D in `coordination/Q.md §11`.
 *
 * ── X.W5.c — RE-POINTED FROM AMPUTATION TO PRESENCE ─────────────────────────
 * The retired header described "the mobile pane mounts in the `lg:hidden`
 * branch; at the Pixel-7 viewport the desktop branch is hidden via `lg:flex`,
 * so the mobile copy IS the visible one". Both halves are gone:
 *
 *   · there is no mobile branch and no desktop branch — `App.vue` renders the
 *     scene's `regions[]` once, at every viewport, and the grid decides how
 *     many columns they get (`shell.css .pane-container`, an intrinsic
 *     `auto-fit` track list). Nothing reads a breakpoint;
 *   · `lg:flex`/`lg:hidden` were never the mechanism by the time this was
 *     written — the `[data-layout]` stamp replaced them at T round-4 (MOB-1)
 *     and X.W5.c retired the stamp with the fork.
 *
 * So the mobile boot assertion is now a PRESENCE assertion: at 412×915 the
 * default scene's regions are both mounted and both visible. That is the fact
 * the wave bought (gate C1: `#/` rendered 69 characters at 390 against 1751 at
 * 1440 before it), and it is the one a boot probe should be defending.
 *
 * Selectors: role/label only. Each region carries its own accessible name from
 * the schema (`SceneRegion.label`), and `<main>` is named by the route H1.
 */

test.use({ ...devices["Pixel 7"] });

test("mobile boot: both regions render + dock visible + zero console errors", async ({
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

    // Primary landmark — named by the route H1 (X.W5.a · EB-30), so a scene
    // that is not mounted can never be the scene `<main>` announces.
    const main = page.getByRole("main", { name: "Home" });
    await expect(main).toBeVisible();
    await expect(page.getByRole("heading", { level: 1, name: "Home" })).toBeVisible();

    // The default scene's TWO regions, both present at a phone viewport. The
    // schema names them; the shell does not choose between them.
    const stage = main.getByRole("region", { name: "Picker" });
    const inspector = main.getByRole("region", { name: "About" });
    await expect(stage).toBeVisible();
    await expect(inspector).toBeVisible();

    // One column: the inspector sits BELOW the stage rather than beside it.
    const stageBox = await stage.boundingBox();
    const inspectorBox = await inspector.boundingBox();
    expect(stageBox).not.toBeNull();
    expect(inspectorBox).not.toBeNull();
    expect(inspectorBox!.y).toBeGreaterThanOrEqual(stageBox!.y + stageBox!.height - 1);

    // Mobile dock — the navigation landmark wraps the dock band. Asserted
    // attached because the box collapses.
    const nav = page.getByRole("navigation", { name: "Application navigation" });
    await expect(nav).toBeAttached();

    // The view-select combobox lives inside the dock — visible at mobile
    // since the dock collapses its layout but keeps the trigger reachable.
    await expect(page.getByRole("combobox", { name: /Select view/i })).toBeVisible();

    expect(consoleErrors).toEqual([]);
});
