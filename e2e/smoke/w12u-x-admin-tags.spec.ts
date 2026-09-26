// SERVED MODEL: claude-opus-5-5
//
// X.W12U.x · §2.2 (COHESION §0cy gap 10) — A2-VA-X-1: "/admin/tags at 390
// rendered Not Found" (AUDIT-2-value.md:52, side observation, token-less run).
//
// DECIDED: the admin GUARD, not the catch-all. `router/index.ts:47` declares
// `/admin/tags` as its own `meta: { admin: true }` record, so the
// `/:pathMatch(.*)*` catch-all (`:56`) can never claim it; `router/guards.ts`
// (`installAdminGuard`, registered at `router/index.ts:66`) fail-closes a
// token-less navigation to the `not-found` record at the typed address (X-W3 ·
// G-18, the fail-closed choice that keeps the admin route table private).
//
// This spec pins both halves at the width the register read (390x844), in both
// themes, for a deep link AND an in-app hash navigation:
//   - token-less  → the Not Found pane; the Tags pane is absent;
//   - admin token → the Tags pane mounts and paints its (route-stubbed) rows.
// A regression either way — the guard failing open, or an admin route falling
// through to the catch-all — reds one arm and only that arm.
import { expect, test as base, type Page } from "@playwright/test";
import { adminPopulatedTest } from "./admin/fixtures/admin-populated";
import { mainPane } from "./fixtures/dock";

const NOT_FOUND = "Not Found";

async function read(page: Page, heading: string) {
    await expect(page.getByRole("heading", { name: heading }).first()).toBeVisible();
    expect(new URL(page.url()).hash).toBe("#/admin/tags");
}

for (const colorScheme of ["light", "dark"] as const) {
    base.describe(`390x844 ${colorScheme}`, () => {
        base.use({ viewport: { width: 390, height: 844 }, colorScheme });

        base("token-less deep link fail-closes to Not Found at the typed address", async ({ page }) => {
            await page.goto("/#/admin/tags");
            await read(page, NOT_FOUND);
            await expect(page.getByRole("heading", { name: "Tags", exact: true })).toHaveCount(0);
            await expect(page).toHaveTitle(/^Not Found/);
        });

        base("token-less in-app hash navigation fail-closes the same way", async ({ page }) => {
            await page.goto("/#/");
            // the app is mounted and routed BEFORE the hash changes, so this arm
            // exercises an in-app navigation, not a second deep link
            await expect(mainPane(page)).toBeVisible();
            await page.evaluate(() => {
                location.hash = "#/admin/tags";
            });
            await read(page, NOT_FOUND);
            await expect(page.getByRole("heading", { name: "Tags", exact: true })).toHaveCount(0);
        });

        adminPopulatedTest("admin token mounts the Tags pane with its rows, never the catch-all", async ({ page }) => {
            await page.goto("/#/admin/tags");
            await read(page, "Tags");
            await expect(page.getByRole("heading", { name: NOT_FOUND })).toHaveCount(0);
            await expect(page.getByText("moody", { exact: true }).first()).toBeVisible();
            await expect(page.getByText("pastel", { exact: true }).first()).toBeVisible();
            await expect(page).toHaveTitle(/^Tags/);
        });
    });
}
