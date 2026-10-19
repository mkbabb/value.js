import { test, expect, type Page, type Route } from "@playwright/test";
import { mainPane } from "../fixtures/dock";

/**
 * X.W11.api — W11.md ADDENDUM 2026-10-06 limb (a), COHESION §0eh.
 *
 * The palette API failed silently for ~6 weeks behind an expired certificate:
 * every fetch from color.babb.dev died at TLS and the wall said nothing a
 * person could act on. This is the limb's falsifier. A palette request that
 * fails — the route ABORTED (what a dead network or a refused certificate looks
 * like to `fetch`), a 503, or a body that is not the palette list — must:
 *
 *   1. raise ONE glass toast that names the failure and carries a Retry action,
 *      however many requests fail in the burst;
 *   2. leave the Browse wall on a plate that says the palette service couldn't
 *      be reached — never the "No palettes published yet." of a true empty;
 *   3. recover through the toast's Retry once the service answers.
 */

const PALETTE = {
    slug: "after-the-outage",
    name: "After The Outage",
    colors: [{ css: "#2563eb" }, { css: "#e11d48" }],
    userSlug: "gallery",
    voteCount: 0,
    voted: false,
    isLocal: false,
};

type Failure = (route: Route) => Promise<void>;

const FAILURES: ReadonlyArray<{ name: string; fail: Failure; names: RegExp }> = [
    {
        name: "aborted (network / TLS)",
        fail: (route) => route.abort("failed"),
        names: /network|TLS/i,
    },
    {
        name: "503",
        fail: (route) =>
            route.fulfill({
                status: 503,
                contentType: "application/json",
                body: JSON.stringify({ error: "upstream down" }),
            }),
        names: /503/,
    },
    {
        name: "malformed body",
        fail: (route) =>
            route.fulfill({
                status: 200,
                contentType: "text/html",
                body: "<!doctype html><title>not the palette list</title>",
            }),
        names: /malformed|not the palette list|unreadable/i,
    },
];

/** The glass Toaster's viewport (reka `ToastViewport`, role=region). */
function toasts(page: Page) {
    return page
        .getByRole("region", { name: /Notifications/ })
        .getByRole("listitem");
}

for (const { name, fail, names } of FAILURES) {
    test(`palette API ${name}: one toast with Retry, and the wall says the service couldn't be reached`, async ({
        page,
    }) => {
        let healthy = false;
        let failed = 0;
        await page.route("**/palettes?**", (route) => {
            if (healthy) {
                return route.fulfill({
                    status: 200,
                    contentType: "application/json",
                    body: JSON.stringify({ data: [PALETTE], nextCursor: null, hasMore: false }),
                });
            }
            failed++;
            return fail(route);
        });

        await page.goto("/#/browse");
        const main = mainPane(page);
        await expect(main).toBeVisible();

        // (2) The wall's plate names the service, distinct from a true empty.
        const plate = main.getByRole("alert");
        await expect(plate).toContainText("Couldn't reach the palette service.");
        await expect(main).not.toContainText("No palettes published yet.");

        // (1) One toast naming the failure, with a Retry action.
        const toast = toasts(page);
        await expect(toast).toHaveCount(1);
        await expect(toast).toContainText("Couldn't reach the palette service");
        await expect(toast).toContainText(names);
        await expect(toast.getByRole("button", { name: "Retry" })).toBeVisible();

        // A burst: the plate's Retry fails twice more — still one toast. Each
        // press lands on the settled plate (the wall swaps it out and back in).
        for (const atLeast of [2, 3]) {
            await expect(async () => {
                await plate.getByRole("button", { name: "Retry" }).click({ timeout: 2_000 });
                expect(failed).toBeGreaterThanOrEqual(atLeast);
            }).toPass();
            await expect(plate).toContainText("Couldn't reach the palette service.");
        }
        await expect(toast).toHaveCount(1);

        // (3) The service answers again: the toast's Retry restores the wall.
        healthy = true;
        await toast.getByRole("button", { name: "Retry" }).click();
        await expect(main.getByRole("article", { name: `Palette: ${PALETTE.name}` })).toBeVisible();
        await expect(main).not.toContainText("Couldn't reach the palette service.");
    });
}
