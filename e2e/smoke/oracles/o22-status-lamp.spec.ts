import { test, expect } from "@playwright/test";

/**
 * T.W6 — O-22: THE DOCK STATUS LAMP ORACLE (SYNTHESIS §6.1; W6-6 / T-9).
 *
 * The dev-misconfig BANNER is dead (owner order; the R10 live confirm — it
 * dominated the overture and overlapped the dock band). Its affordance
 * re-homed as the dock band's STATUS LAMP. This oracle asserts the LIVE
 * half of O-22:
 *
 *   1. NO false lamp — under the healthy harness backend (VITE_API_URL is
 *      same-origin here) the band carries no lamp, and the dead banner
 *      never resurrects (negative watch on `.dev-misconfig-banner`).
 *   2. The `unavailable` variant lights under a REAL transport failure
 *      (routes aborted → the fetch rejection trips the S.W0-1 latch), with
 *      the honest quiet register (role="status"), WITHOUT any dock
 *      interaction — the lamp is band chrome, never a collapsible layer.
 *   3. Band seat: the lamp renders inside the dock band (the nav
 *      landmark), not inside the dock's layer machinery.
 *
 * HARNESS BOUND (recorded, not fudged): the `misconfigured` variant CANNOT
 * fire under this suite — the e2e webServer sets VITE_API_URL (the triad's
 * first leg disarms it by design). The misconfigured face + the full
 * variant matrix + the S.W0-1 contract rows (synchronous DevMisconfigError,
 * loud console.error, misconfigured ≠ unavailable, dev-gating) are asserted
 * closed-form in test/status-lamp.test.ts over the SAME resolver the SFC
 * consumes.
 */

test.describe("O-22 · the dock status lamp (W6-6 / T-9)", () => {
    test("healthy backend → no lamp; the dead banner stays dead", async ({
        page,
    }) => {
        await page.goto("/");
        await page.waitForSelector(".glass-dock");
        // The banner's negative watch (the resurrection guard).
        await expect(page.locator(".dev-misconfig-banner")).toHaveCount(0);
        // A healthy band carries no lamp (correct variant per precondition:
        // available → nothing).
        await expect(page.locator(".dock-status-lamp")).toHaveCount(0);
    });

    test("transport failure → the unavailable variant, first-paint band chrome", async ({
        page,
    }) => {
        // A REAL network-level failure on the api paths (never an HTTP
        // status): the boot color-names read rejects and trips the latch.
        await page.route(/\/(colors|sessions|palettes|users)\//, (route) =>
            route.abort("connectionrefused"),
        );
        await page.goto("/");

        // NO dock interaction: the lamp must arrive as band chrome the
        // moment the latch trips — never gated on expanding a layer or
        // saving a palette.
        const lamp = page.locator(".dock-status-lamp");
        await expect(lamp).toBeVisible({ timeout: 10000 });
        await expect(lamp).toHaveAttribute("data-variant", "unavailable");
        // The quiet honest register — a status, not an alert.
        await expect(lamp).toHaveAttribute("role", "status");

        // Band seat: inside the nav landmark (the dock band) …
        const nav = page.locator('nav[aria-label="Application navigation"]');
        expect(
            await lamp.evaluate(
                (el, navSel) => !!el.closest(navSel),
                'nav[aria-label="Application navigation"]',
            ),
        ).toBe(true);
        await expect(nav).toBeVisible();
        // … and NOT inside the dock's collapsible layer machinery.
        expect(
            await lamp.evaluate((el) => !!el.closest(".dock-layers")),
        ).toBe(false);

        // Geometry: the lamp is ON the band's axis (its vertical centre falls
        // within the dock pill's band), parked at the inline end — it never
        // shifts the pill's centring (out-of-flow chrome).
        const lampBox = (await lamp.boundingBox())!;
        const dockBox = (await page.locator(".glass-dock").boundingBox())!;
        const lampMidY = lampBox.y + lampBox.height / 2;
        expect(lampMidY).toBeGreaterThan(dockBox.y - 1);
        expect(lampMidY).toBeLessThan(dockBox.y + dockBox.height + 1);
    });
});
