import { adminTest as test, expect } from "../fixtures/admin-auth";
import type {
    PaginatedResponse,
    ProposedColorName,
} from "../../../fixtures/palette-envelopes";

/**
 * E.W3 Lane A admin flow #13 — color-approve. Names panel pending tab:
 * mock /admin/queue to return one pending proposal, click Approve,
 * assert POST /admin/colors/<id>/approve fires.
 */
test("admin approve color name POSTs /admin/colors/<id>/approve", async ({ page }) => {
    let approveCalled = false;
    // ── X-W1 · R31 (M-LC6) ──────────────────────────────────────────────────
    // The stub claimed `status: "pending"`. The server's union is exactly
    // `"proposed" | "approved" | "rejected"` — "pending" is a state the API has
    // never emitted, so this fixture taught the spec a shape the product does
    // not produce, and nothing could say so because the envelope was an
    // untyped object literal. It is now typed against the re-derived DTO
    // (`e2e/fixtures/palette-envelopes.ts`), which makes a re-invented member a
    // compile error rather than a green test against fiction.
    const queue: PaginatedResponse<ProposedColorName> = {
        data: [
            {
                id: "prop-approve-1",
                name: "ew3-approve-target",
                css: "#123456",
                status: "proposed",
                createdAt: "2026-01-01T00:00:00.000Z",
            },
        ],
        total: 1,
        limit: 50,
        offset: 0,
    };
    await page.route("**/admin/queue**", (route) =>
        route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify(queue),
        }),
    );
    await page.route("**/admin/colors/prop-approve-1/approve", (route) => {
        approveCalled = true;
        return route.fulfill({ status: 200, body: "" });
    });

    await page.goto("/#/admin/names");
    await expect(page.getByRole("main", { name: "Color tool panes" })).toBeVisible();
    await page
        .getByRole("button", { name: "Approve color name ew3-approve-target" })
        .last()
        .click();
    await expect.poll(() => approveCalled).toBe(true);
});
