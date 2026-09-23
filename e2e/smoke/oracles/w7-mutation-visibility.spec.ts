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
        await expect(page.locator('[data-admin-palette="azure-one-11aa"]')).toHaveCount(0);
        await expect(verdict(page, "users")).toContainText("Deleted “Azure One”");
    });

    adminPopulatedTest("delete-all (a user's palettes) — confirmed, then announced", async ({ page }) => {
        await page.goto("/#/admin/users");
        const row = page
            .getByText("azure-fox-01", { exact: true })
            .first()
            .locator('xpath=ancestor::div[contains(@class,"cursor-pointer")][1]');
        await row.getByRole("button", { name: "Palettes", exact: true }).click();
        await page.getByRole("dialog").getByRole("button", { name: "Delete palettes" }).click();
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
        // The seat is revealed on hover/focus (ATP-2 is X.W7.e's); the keyboard
        // path is the one every user has.
        const del = page.getByRole("button", { name: "Delete tag moody" });
        await del.focus();
        await del.press("Enter");
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
