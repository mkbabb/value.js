/**
 * X.W7.e · G14 · N-6 · S-14 — DELIBERATE DISMISSAL AT DESTRUCTIVE SEATS (browser half).
 *
 * The network is the instrument (a decorative dialog passes a grep; it cannot
 * pass this): every destructive Admin control is activated in the real app,
 * served by the repo's own dev server with the API routed at the network
 * boundary, and the oracle counts the mutation requests that leave the page.
 *
 *   G14 / S-14(a) — ZERO mutation requests after the seat is activated (twice),
 *                   and EXACTLY ONE after the confirm is accepted.
 *   N-6           — the acceptance is a DOUBLE activation inside the leave
 *                   transition's hit-testable window (fold W7.92 · Δ-3: 271 ms
 *                   chromium / 159 ms webkit): the count is still one.
 *   S-14(b)       — the tag seat is visible AT REST (no hover, no focus).
 *
 * No product selector is copied: every locator is a role, an accessible name,
 * or a `data-*` hook the product ships.
 */
import type { Page, Request } from "@playwright/test";
import { adminPopulatedTest as test, expect } from "../admin/fixtures/admin-populated";

/** Mutation requests to the admin API (module/asset fetches never count). */
function mutationLedger(page: Page): string[] {
    const ledger: string[] = [];
    page.on("request", (req: Request) => {
        const url = new URL(req.url());
        if (req.method() !== "GET" && url.pathname.startsWith("/admin/")) {
            ledger.push(`${req.method()} ${url.pathname}`);
        }
    });
    return ledger;
}

/** Zero before acceptance; exactly one after a double acceptance. */
async function assertDeliberate(page: Page, ledger: string[], seatName: string, accept: string, expected: string) {
    const seat = page.getByRole("button", { name: seatName, exact: true }).filter({ visible: true });
    await expect(seat).toHaveCount(1);
    // A double activation of the seat opens one confirm and fires nothing.
    await seat.dblclick();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    expect(ledger, "requests before acceptance").toEqual([]);

    // N-6: a double activation of the accept button — the second press lands
    // while the leaving dialog is still hit-testable (the measured 159–271 ms).
    await dialog.getByRole("button", { name: accept, exact: true }).dblclick();
    await expect(dialog).toHaveCount(0);
    await page.waitForTimeout(300); // past the widest window: a late second request would land here
    expect(ledger, "requests after a double acceptance").toEqual([expected]);
}

test.describe("G14 · N-6 — destructive Admin seats fire nothing until accepted, then exactly once", () => {
    test("color-name delete (Names → Approved)", async ({ page }) => {
        const ledger = mutationLedger(page);
        // The populated fixture serves no approved list (it routes `/admin/approved`,
        // the wire path is `/admin/colors/approved`): this row seeds one approved
        // name at the boundary, registered after the fixture so it takes precedence.
        await page.route("**/admin/colors/approved**", (route) =>
            route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({
                    data: [
                        {
                            id: "a1",
                            name: "Oxblood",
                            css: "oklch(0.4 0.12 25)",
                            status: "approved",
                            contributor: "azure-fox-01",
                            createdAt: "2026-09-23T00:00:00.000Z",
                        },
                    ],
                    total: 1,
                    limit: 50,
                    offset: 0,
                }),
            }),
        );
        await page.goto("/#/admin/names");
        await page.getByRole("button", { name: /^Approved/ }).filter({ visible: true }).click();
        await assertDeliberate(page, ledger, "Delete color name Oxblood", "Delete name", "DELETE /admin/colors/a1");
    });

    test("color-name reject (Names → Pending, W7.93)", async ({ page }) => {
        const ledger = mutationLedger(page);
        await page.goto("/#/admin/names");
        await assertDeliberate(page, ledger, "Reject color name Wax Seal", "Reject name", "POST /admin/colors/c1/reject");
    });

    test("tag delete — the seat is visible at rest (S-14(b)), then deliberate", async ({ page }) => {
        const ledger = mutationLedger(page);
        await page.goto("/#/admin/tags");
        const seat = page.getByRole("button", { name: "Delete tag moody", exact: true }).filter({ visible: true });
        await expect(seat).toHaveCount(1);
        await page.mouse.move(0, 0); // no hover, no focus: the resting state
        await expect(seat).toHaveCSS("opacity", "1");
        await assertDeliberate(page, ledger, "Delete tag moody", "Delete tag", "DELETE /admin/tags/moody");
    });

    test("flagged-palette delete", async ({ page }) => {
        const ledger = mutationLedger(page);
        await page.goto("/#/admin/flagged");
        await assertDeliberate(page, ledger, "Delete palette Sunset Riot", "Delete palette", "DELETE /admin/palettes/sunset-riot-9a3f");
    });

    test("delete-all-palettes — named for its destruction (G15), then deliberate", async ({ page }) => {
        const ledger = mutationLedger(page);
        await page.goto("/#/admin/users");
        const seat = page.getByRole("button", { name: "Delete all palettes of azure-fox-01", exact: true });
        await expect(seat.filter({ visible: true })).toHaveText("Delete all palettes");
        await assertDeliberate(
            page,
            ledger,
            "Delete all palettes of azure-fox-01",
            "Delete all palettes",
            "DELETE /admin/users/azure-fox-01/palettes",
        );
    });

    test("user-disclosure palette delete", async ({ page }) => {
        const ledger = mutationLedger(page);
        await page.goto("/#/admin/users");
        await page.getByText("azure-fox-01", { exact: true }).first().click();
        await expect(page.locator('[data-admin-palette="azure-one-11aa"]')).toBeVisible();
        await assertDeliberate(page, ledger, "Delete palette Azure One", "Delete palette", "DELETE /admin/palettes/azure-one-11aa");
    });
});
