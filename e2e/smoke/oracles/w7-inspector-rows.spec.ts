/**
 * X.W7.d2 · COHESION §0bk.1 — the selected-entity inspector (browser half).
 *
 * The six rows `W7-mutation-ownership.md` held ROUTED (rename · tag ·
 * publish/unpublish · fork · vote · delete on a remote palette): each act's
 * FAILURE is rendered on the inspector that took it (`role="status"`), never a
 * `console.warn` alone. Plus the typed-set row: selecting a palette makes ITS
 * verbs the dock's `palette` scene, and a dock seat dispatches the inspector's
 * own path.
 *
 * The API is routed at the network boundary; every locator is a role, a name,
 * or a `data-*` hook the product ships (no product selector copied).
 */
import type { Page } from "@playwright/test";
import { userTest, expect } from "../fixtures/user-auth";
import { expandDock } from "../fixtures/dock";

/** An owned, public, versioned remote palette (the user-auth fixture's slug). */
const OWNED = {
    slug: "owned-one",
    name: "Owned One",
    colors: [
        { css: "#e11d48", position: 0 },
        { css: "#2563eb", position: 1 },
    ],
    userSlug: "test-user",
    voteCount: 3,
    voted: false,
    isLocal: false,
    visibility: "public",
    tags: [],
    versionCount: 2,
    currentHash: "h2",
    createdAt: "2026-07-10T00:00:00.000Z",
    updatedAt: "2026-07-10T00:00:00.000Z",
};

const PROBLEM = (status: number, title: string) => ({
    status,
    contentType: "application/problem+json",
    body: JSON.stringify({ type: "about:blank", title, status }),
});

/** Serve the wall with `OWNED`, and fail `method` on `path` with a 500. */
async function wallFailing(page: Page, method: string, path: string) {
    await page.route("**/palettes?**", (route) =>
        route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({ data: [OWNED], total: 1, limit: 50, offset: 0 }),
        }),
    );
    await page.route(`**/palettes/${path}`, (route) =>
        route.request().method() === method
            ? route.fulfill(PROBLEM(500, "Server exploded"))
            : route.fallback(),
    );
    await page.goto("/#/browse");
    await expect(page.getByRole("article", { name: "Palette: Owned One" })).toBeVisible();
}

const card = (page: Page) => page.getByRole("article", { name: "Palette: Owned One" });
/** The inspector's rail (`ActionFeedback`, `role="status"`). While the menu is
 *  open the page outside it is inert to the accessibility tree, so the rail is
 *  read page-wide by its words, as the sibling G13 oracle reads it. */
const verdict = (page: Page, text: string | RegExp) =>
    page.getByRole("status").filter({ hasText: text });
const renameInput = (page: Page) =>
    page.getByPlaceholder("Palette name...").filter({ visible: true });

async function menu(page: Page, item: RegExp) {
    await card(page).getByRole("button", { name: "Palette menu" }).click();
    await page.getByRole("menuitem", { name: item }).click();
}

userTest.describe("G13 · the six inspector rows — a failure is rendered where the act was taken", () => {
    userTest("rename — a refused PATCH is said on the inspector", async ({ page }) => {
        await wallFailing(page, "PATCH", "owned-one");
        await menu(page, /Rename/);
        const input = renameInput(page);
        await input.fill("Renamed");
        await input.press("Enter");
        await expect(verdict(page, "Rename failed: Server exploded")).toBeVisible();
    });

    userTest("tag — a refused tag save is said on the inspector", async ({ page }) => {
        await page.route("**/colors/tags", (route) =>
            route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify([{ name: "warm", category: "mood" }]),
            }),
        );
        await wallFailing(page, "PATCH", "owned-one");
        await menu(page, /Edit Tags/);
        // The editor's own box (the browse filter bar lists the same catalog).
        await page.getByRole("dialog").getByRole("checkbox").first().click();
        await expect(verdict(page, /The tags were not saved: Server exploded/)).toBeVisible();
    });

    userTest("publish / unpublish — a refused flip is said on the inspector", async ({ page }) => {
        await wallFailing(page, "POST", "owned-one/unpublish");
        await menu(page, /Make private/);
        await expect(verdict(page, "Unpublish failed: Server exploded")).toBeVisible();
    });

    userTest("fork — a refused remix is said on the inspector", async ({ page }) => {
        await wallFailing(page, "POST", "owned-one/fork");
        await menu(page, /Remix/);
        await expect(verdict(page, /^Remix failed/)).toBeVisible();
    });

    userTest("vote — a refused vote is said on the inspector", async ({ page }) => {
        await wallFailing(page, "POST", "owned-one/vote");
        await card(page).getByRole("button", { name: /votes/ }).click();
        await expect(verdict(page, "Vote failed: Server exploded")).toBeVisible();
    });

    userTest("delete — a refused delete is said on the inspector, and the palette stays", async ({ page }) => {
        await wallFailing(page, "DELETE", "owned-one");
        await menu(page, /^Delete$/);
        await expect(verdict(page, "Delete failed: Server exploded")).toBeVisible();
        await expect(card(page)).toBeVisible();
    });
});

userTest.describe("the selected entity on X-W4's typed SceneActionSet", () => {
    userTest("selecting a palette makes its verbs the dock's set; a seat runs the inspector's path", async ({ page }) => {
        await wallFailing(page, "PATCH", "owned-one");
        const seats = page.locator('[data-testid="scene-action-row"] [data-scene-action]');
        await card(page).getByText("Owned One", { exact: true }).click();
        await expandDock(page);
        await page.getByRole("button", { name: "Toggle action bar" }).click();
        await expect(page.locator(".glass-dock[data-morphing]")).toHaveCount(0, { timeout: 8000 });
        await expect
            .poll(() => seats.evaluateAll((els) => els.map((el) => el.getAttribute("data-scene-action"))))
            .toEqual([
                "palette.save",
                "palette.rename",
                "palette.tags",
                "palette.versions",
                "palette.visibility",
                "palette.fork",
                "palette.vote",
                "palette.export",
                "palette.delete",
            ]);
        await page.locator('[data-scene-action="palette.rename"] button').click();
        await expect(renameInput(page)).toBeFocused();
        await renameInput(page).press("Escape");

        // Deselecting returns the dock to the view's own set (Browse has none).
        await card(page).getByText("Owned One", { exact: true }).click();
        await expect(page.locator('[data-scene-action^="palette."]')).toHaveCount(0);
    });
});
