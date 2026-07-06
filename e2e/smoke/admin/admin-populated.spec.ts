import { adminPopulatedTest as test, expect, USERS, QUEUE } from "./fixtures/admin-populated";

/**
 * S.W5-13 — the populated-fixture pattern, proven green.
 *
 * The suite's admin surface has only ever seen EMPTY envelopes (admin-auth.ts);
 * this exercises the moderation panels against real seeded rows so the F-1
 * mobile-overflow class + the moderation click-throughs become testable. This
 * spec is the pattern's anchor; W5-12's moderation-flow specs extend it.
 */

test("admin-users renders seeded user rows", async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
        if (msg.type() === "error") consoleErrors.push(msg.text());
    });
    page.on("pageerror", (err) => consoleErrors.push(err.message));

    await page.goto("/#/admin/users");

    await expect(page.getByRole("main", { name: "Color tool panes" })).toBeVisible();
    await expect(
        page.getByRole("heading", { name: "Users" }).filter({ visible: true }),
    ).toBeVisible();

    // Every seeded slug renders (the slug-pill). The panel mounts in both
    // responsive slots, so at least one visible copy per slug is enough.
    for (const user of USERS) {
        await expect(
            page.getByText(user.slug, { exact: true }).filter({ visible: true }).first(),
        ).toBeVisible();
    }

    expect(consoleErrors).toEqual([]);
});

/**
 * S.W5-12 — the F-1 fence: the moderation flow OPERABLE at 390px.
 *
 * Pre-fix, the raw reka TabsContent grid item sat at min-width:auto, so the
 * long-string row (QUEUE c3 — the seeded stressor) propagated its full-line
 * min-content up as the track floor and pushed approve/reject ~250px off an
 * overflow-x-hidden card: the entire flow was unreachable on a phone. The
 * fence asserts every action button of every seeded row sits INSIDE the
 * viewport and that approving actually removes a row.
 */
test.describe("names moderation at 390px (F-1)", () => {
    test.use({ viewport: { width: 390, height: 844 } });

    test("approve/reject stay on-card and operable with long-string rows", async ({ page }) => {
        const consoleErrors: string[] = [];
        page.on("console", (msg) => {
            if (msg.type() === "error") consoleErrors.push(msg.text());
        });
        page.on("pageerror", (err) => consoleErrors.push(err.message));

        await page.goto("/#/admin/names");
        await expect(
            page.getByRole("heading", { name: "Names" }).filter({ visible: true }).first(),
        ).toBeVisible();

        const approve = page
            .getByRole("button", { name: /Approve color name/i })
            .filter({ visible: true });
        const reject = page
            .getByRole("button", { name: /Reject color name/i })
            .filter({ visible: true });

        // One visible action pair per seeded row (incl. the c3 stressor).
        await expect(approve).toHaveCount(QUEUE.length);
        await expect(reject).toHaveCount(QUEUE.length);

        // The F-1 fence proper: every action button INSIDE the 390px viewport.
        for (const locator of [approve, reject]) {
            for (const button of await locator.all()) {
                const box = await button.boundingBox();
                expect(box).not.toBeNull();
                expect(box!.x).toBeGreaterThanOrEqual(0);
                expect(box!.x + box!.width).toBeLessThanOrEqual(391);
            }
        }

        // The flow is OPERABLE: approving removes the row.
        await approve.first().click();
        await expect(approve).toHaveCount(QUEUE.length - 1);

        expect(consoleErrors).toEqual([]);
    });
});

test("admin-flagged renders a seeded flagged palette + moderation actions", async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
        if (msg.type() === "error") consoleErrors.push(msg.text());
    });
    page.on("pageerror", (err) => consoleErrors.push(err.message));

    await page.goto("/#/admin/flagged");

    await expect(page.getByRole("main", { name: "Color tool panes" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Flagged" }).first()).toBeVisible();

    // The seeded flagged palette name + a moderation Dismiss action are present.
    await expect(page.getByText("Sunset Riot").first()).toBeVisible();
    await expect(page.getByRole("button", { name: /Dismiss/i }).first()).toBeVisible();

    expect(consoleErrors).toEqual([]);
});
