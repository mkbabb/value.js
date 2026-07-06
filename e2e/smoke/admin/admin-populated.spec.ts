import { adminPopulatedTest as test, expect, USERS } from "./fixtures/admin-populated";

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
