/**
 * X.W7.d · G13 — ONE OWNER PER MUTATION, ONE VISIBLE RESULT (browser half).
 *
 * `docs/tranches/X/waves/W7-mutation-ownership.md` names each palette-entity
 * mutation's single call site and its visible result; this oracle is the
 * per-row browser assertion that the result IS visible in the real app, served
 * by the repo's own dev server, with the API routed at the network boundary.
 * A mutation whose verdict is not observable after the act fails its row.
 *
 * Admin rows ride the populated admin fixture (a seeded token + shape-correct
 * envelopes); user rows ride the user-auth fixture; library rows seed the local
 * store. No product selector is copied: every locator is a role, a name, or a
 * `data-*` hook the product ships.
 */
import type { Page } from "@playwright/test";
import { adminPopulatedTest } from "../admin/fixtures/admin-populated";
import { userTest, expect } from "../fixtures/user-auth";

const verdict = (page: Page, scene: string) => page.locator(`[data-admin-notice="${scene}"]`);

async function openUserPalettes(page: Page) {
    await page.goto("/#/admin/users");
    await page.getByText("azure-fox-01", { exact: true }).first().click();
    await expect(page.locator('[data-admin-palette="azure-one-11aa"]')).toBeVisible();
}

adminPopulatedTest.describe("G13 · admin rows", () => {
    adminPopulatedTest("feature — the verdict is announced in the users scene", async ({ page }) => {
        await openUserPalettes(page);
        await page.getByRole("button", { name: "Feature Azure One" }).click();
        await expect(verdict(page, "users")).toContainText("Featured “Azure One”");
    });

    adminPopulatedTest("admin delete — the row leaves and the verdict is announced", async ({ page }) => {
        await openUserPalettes(page);
        await page.getByRole("button", { name: "Delete palette Azure One" }).click();
        // X.W7.e (G14): the delete is deliberate — accepted in its confirm.
        await page.getByRole("dialog").getByRole("button", { name: "Delete palette" }).click();
        await expect(page.locator('[data-admin-palette="azure-one-11aa"]')).toHaveCount(0);
        await expect(verdict(page, "users")).toContainText("Deleted “Azure One”");
    });

    adminPopulatedTest("delete-all (a user's palettes) — confirmed, then announced", async ({ page }) => {
        await page.goto("/#/admin/users");
        const row = page
            .getByText("azure-fox-01", { exact: true })
            .first()
            .locator('xpath=ancestor::div[contains(@class,"cursor-pointer")][1]');
        // X.W7.e (G15): the control is named for what it destroys.
        await row.getByRole("button", { name: "Delete all palettes of azure-fox-01", exact: true }).click();
        await page.getByRole("dialog").getByRole("button", { name: "Delete all palettes" }).click();
        await expect(verdict(page, "users")).toContainText("Deleted 1 palette of azure-fox-01");
    });

    adminPopulatedTest("prune — the confirm names the global scope; the verdict is announced", async ({ page }) => {
        await page.goto("/#/admin/users");
        await page.getByRole("button", { name: "Prune empty" }).click();
        await expect(page.getByRole("dialog")).toContainText("every user with 0 palettes on the server");
        await page.getByRole("dialog").getByRole("button", { name: "Prune" }).click();
        await expect(verdict(page, "users")).toContainText("Pruned 1 empty user");
    });

    adminPopulatedTest("flag dismiss — the row leaves and the verdict is announced", async ({ page }) => {
        await page.goto("/#/admin/flagged");
        await page.getByRole("button", { name: "Dismiss" }).first().click();
        await expect(verdict(page, "flagged")).toContainText("Dismissed the reports on sunset-riot-9a3f");
        await expect(page.getByText("Sunset Riot")).toHaveCount(0);
    });

    adminPopulatedTest("tag delete — the chip leaves and the verdict is announced", async ({ page }) => {
        await page.goto("/#/admin/tags");
        // X.W7.e (S-14(b)): the seat is visible at rest; (G14) the delete is
        // deliberate — accepted in its confirm.
        await page.getByRole("button", { name: "Delete tag moody" }).filter({ visible: true }).click();
        await page.getByRole("dialog").getByRole("button", { name: "Delete tag" }).click();
        await expect(verdict(page, "tags")).toContainText("Deleted tag “moody”");
    });

    adminPopulatedTest("name approve — the verdict is announced", async ({ page }) => {
        await page.goto("/#/admin/names");
        await page.getByRole("button", { name: /Approve color name/ }).first().click();
        await expect(verdict(page, "names")).toContainText("Approved");
    });
});

const REMOTE = {
    slug: "shady-spam",
    name: "Shady Spam",
    colors: [{ css: "#f00", position: 0 }],
    userSlug: "spammer",
    voteCount: 0,
    voted: false,
    isLocal: false,
};

async function browseWith(page: Page, flagStatus: number) {
    await page.route("**/palettes?**", (route) =>
        route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({ data: [REMOTE], total: 1, limit: 50, offset: 0 }),
        }),
    );
    await page.route("**/palettes/shady-spam/flag", (route) =>
        route.fulfill(
            flagStatus === 200
                ? { status: 200, contentType: "application/json", body: JSON.stringify({ flagged: true }) }
                : {
                      status: flagStatus,
                      contentType: "application/problem+json",
                      body: JSON.stringify({ type: "about:blank", title: "Rate limit exceeded", status: flagStatus }),
                  },
        ),
    );
    await page.goto("/#/browse");
    await page.getByRole("button", { name: "Palette menu" }).first().click();
    await page.getByRole("menuitem", { name: /Report/ }).click();
    await page.getByRole("radio", { name: "Spam" }).click();
    await page.getByRole("button", { name: "Report" }).click();
}

userTest.describe("G13 · user rows", () => {
    userTest("report — a success is announced on the card", async ({ page }) => {
        await browseWith(page, 200);
        await expect(page.getByRole("status").filter({ hasText: "Reported — thank you." })).toBeVisible();
    });

    userTest("report — a failure is announced as a failure, never as a success (W7.22)", async ({ page }) => {
        await browseWith(page, 400);
        await expect(page.getByRole("status").filter({ hasText: "Report failed: Rate limit exceeded" })).toBeVisible();
    });
});

/** Seed the local library (the `color-palettes` store) before boot. */
async function seedLibrary(page: Page, colors: number) {
    await page.addInitScript((n) => {
        const palette = {
            id: "local-1",
            name: "Wide Library",
            slug: "wide-library",
            isLocal: true,
            colors: Array.from({ length: n }, (_, i) => ({ css: `oklch(0.6 0.1 ${i * 7})`, position: i })),
        };
        localStorage.setItem("color-palettes", JSON.stringify({ version: 1, palettes: [palette] }));
    }, colors);
}

userTest.describe("G13 · library rows", () => {
    userTest("publish at N = 51 — refused in words before any request (G10 pre-flight)", async ({ page }) => {
        let posted = 0;
        await page.route("**/palettes", (route) => {
            if (route.request().method() === "POST") posted += 1;
            return route.fulfill({ status: 500, body: "" });
        });
        await seedLibrary(page, 51);
        await page.goto("/#/palettes");
        await page.getByRole("button", { name: "Palette menu" }).first().click();
        await page.getByRole("menuitem", { name: /Publish/ }).click();
        await expect(page.getByRole("status").filter({ hasText: "at most 50 colors" })).toBeVisible();
        expect(posted).toBe(0);
    });

    userTest("export failure — the typed outcome is rendered on the card (G7 · ESC-W7b-HOST)", async ({ page }) => {
        await seedLibrary(page, 0);
        await page.goto("/#/palettes");
        await page.getByRole("button", { name: "Palette menu" }).first().click();
        await page.getByRole("menuitem", { name: /Export/ }).click();
        await page.getByRole("menuitem", { name: /JSON/ }).click();
        await expect(page.getByRole("status").filter({ hasText: "This palette has no colors to export." })).toBeVisible();
    });

    userTest("rename — the new name is what the card shows", async ({ page }) => {
        await seedLibrary(page, 3);
        await page.goto("/#/palettes");
        await page.getByRole("button", { name: "Palette menu" }).first().click();
        await page.getByRole("menuitem", { name: /Rename/ }).click();
        const input = page.getByPlaceholder("Palette name...").last();
        await input.fill("Renamed Library");
        await input.press("Enter");
        await expect(page.locator("[data-palette-name]").filter({ hasText: "Renamed Library" })).toBeVisible();
    });

    userTest("delete — the card leaves the library", async ({ page }) => {
        await seedLibrary(page, 3);
        await page.goto("/#/palettes");
        await expect(page.locator("[data-palette-name]").filter({ hasText: "Wide Library" })).toBeVisible();
        await page.getByRole("button", { name: "Palette menu" }).first().click();
        await page.getByRole("menuitem", { name: /Delete/ }).click();
        await expect(page.locator("[data-palette-name]").filter({ hasText: "Wide Library" })).toHaveCount(0);
    });
});

/*
 * X-W7 Repair 1 (Check 1 D-3) — the three OWED-ORACLE rows of
 * `W7-mutation-ownership.md` (4 · 14 · 15), each asserted in the real app.
 * The drawer (row 4) is X-W4's file: it is DRIVEN here, never written.
 */
adminPopulatedTest.describe("G13 · admin rows (Repair 1)", () => {
    adminPopulatedTest("row 15 · delete user — confirmed, the row leaves, the verdict is announced", async ({ page }) => {
        await page.goto("/#/admin/users");
        await expect(page.getByText("azure-fox-01", { exact: true }).first()).toBeVisible();
        await page.getByRole("button", { name: "Delete user azure-fox-01", exact: true }).first().click();
        await page.getByRole("dialog").getByRole("button", { name: "Delete user", exact: true }).click();
        await expect(verdict(page, "users")).toContainText("Deleted user azure-fox-01");
        await expect(page.getByRole("button", { name: "Delete user azure-fox-01", exact: true })).toHaveCount(0);
    });
});

const VERSIONED = { ...REMOTE, slug: "versioned-one", name: "Versioned One", versionCount: 2, currentHash: "h2" };

function version(hash: string, name: string, parentHash: string | null, depth: number) {
    return {
        hash,
        name,
        colors: [{ css: "#0af", position: 0 }],
        parentHash,
        forkedFromHash: null,
        authorSlug: "spammer",
        paletteSlug: VERSIONED.slug,
        createdAt: "2026-09-01T00:00:00.000Z",
        rootHash: "h1",
        depth,
    };
}

userTest.describe("G13 · user rows (Repair 1)", () => {
    userTest("row 4 · version revert — the card reads the server's palette and says Reverted", async ({ page }) => {
        const reverts: string[] = [];
        await page.route("**/palettes?**", (route) =>
            route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({ data: [VERSIONED], total: 1, limit: 50, offset: 0 }),
            }),
        );
        await page.route((url) => url.pathname.endsWith("/palettes/versioned-one/versions"), (route) =>
            route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({
                    data: [version("h2", "Versioned One", "h1", 1), version("h1", "Versioned Origin", null, 0)],
                    total: 2,
                    limit: 20,
                    offset: 0,
                }),
            }),
        );
        await page.route((url) => url.pathname.endsWith("/palettes/versioned-one/revert"), (route) => {
            reverts.push(route.request().postData() ?? "");
            return route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({ ...VERSIONED, name: "Versioned Origin", currentHash: "h1" }),
            });
        });
        await page.goto("/#/browse");
        await page.getByRole("button", { name: "Palette menu" }).filter({ visible: true }).first().click();
        await page.getByRole("menuitem", { name: /Versions/ }).click();
        const revert = page.getByRole("button", { name: "Revert" });
        await expect(revert).toHaveCount(1);
        await revert.click();
        // In the drawer: the subject is the server's palette and v1 is current.
        const drawer = page.getByRole("dialog", { name: "Version History" });
        await expect(drawer).toContainText("Versioned Origin — 2 versions");
        await expect(drawer).toContainText("v1 (current)");
        // On the card, once the modal drawer is dismissed: the verdict and the name.
        await page.keyboard.press("Escape");
        await expect(drawer).toHaveCount(0);
        await expect(page.getByRole("status").filter({ hasText: "Reverted" })).toBeVisible();
        await expect(page.locator("[data-palette-name]").filter({ hasText: "Versioned Origin" }).first()).toBeVisible();
        expect(reverts).toEqual([JSON.stringify({ hash: "h1" })]);
    });
});

userTest.describe("G13 · library rows (Repair 1)", () => {
    userTest("row 14 · delete-all — confirmed, then the grid is the true-empty plate", async ({ page }) => {
        await seedLibrary(page, 3);
        await page.goto("/#/palettes");
        await expect(page.locator("[data-palette-name]").filter({ hasText: "Wide Library" })).toBeVisible();
        await page.getByRole("button", { name: "Delete all saved palettes", exact: true }).click();
        const dialog = page.getByRole("dialog");
        await expect(dialog).toBeVisible();
        // Nothing is destroyed before the confirm is accepted.
        await expect(page.locator("[data-palette-name]").filter({ hasText: "Wide Library" })).toBeVisible();
        await dialog.getByRole("button", { name: "Delete all", exact: true }).click();
        await expect(page.locator("[data-palette-name]").filter({ hasText: "Wide Library" })).toHaveCount(0);
        await expect(page.getByText("No saved palettes yet.")).toBeVisible();
    });
});
