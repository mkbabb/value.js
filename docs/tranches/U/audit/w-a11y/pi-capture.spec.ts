/**
 * U.W-A11Y · U-F56 / U-F58 — the π-frame capture (NOT a CI gate; lives OUTSIDE
 * `e2e/smoke/admin/` so the main smoke-admin glob never runs it). Drives the
 * three never-eyeballed authed populated states — login (the authed identity
 * menu), admin (the populated moderation panel), browse (the populated wall) —
 * plus the U-F58 thrown-error boundary, in BOTH schemes, and writes
 * element-clipped frames (probe-parsimony: never a full-page dump) to
 * `docs/tranches/U/audit/w-a11y/pi/`.
 *
 * a11y is deterministic-headless — these frames are the EYE half of the
 * RED→GREEN flip the born-RED battery (a11y-authed-*.spec.ts) proves by machine.
 *
 * NOTE (pi-path flag): the wave doc §π says `audit/pi/w-a11y/`; the lane task
 * directs `audit/w-a11y/pi/`. This capture uses the task path and the close note
 * flags the discrepancy.
 */
import { userTest } from "../../../../../e2e/smoke/fixtures/user-auth";
import { routeBrowsePalettes } from "../../../../../e2e/smoke/fixtures/browse-palettes";
import { adminPopulatedTest } from "../../../../../e2e/smoke/admin/fixtures/admin-populated";
import { expect } from "@playwright/test";

const PI = "docs/tranches/U/audit/w-a11y/pi";
const SCHEMES = ["light", "dark"] as const;

for (const scheme of SCHEMES) {
    userTest.describe(`π user surface (${scheme})`, () => {
        userTest.use({ colorScheme: scheme });

        userTest(`authed-login-${scheme}: the identity menu`, async ({ page }) => {
            await page.goto("/#/palettes");
            const trigger = page
                .getByRole("button", { name: "Profile" })
                .filter({ visible: true })
                .first();
            await expect(trigger).toBeVisible();
            await trigger.click();
            const menu = page.getByRole("menu").filter({ visible: true }).first();
            await expect(menu).toBeVisible();
            await page.waitForTimeout(250);
            await menu.screenshot({ path: `${PI}/authed-login-${scheme}.png` });
        });

        userTest(`authed-browse-${scheme}: the populated wall`, async ({ page }) => {
            await routeBrowsePalettes(page);
            await page.goto("/#/browse");
            await expect(
                page.getByRole("article").filter({ visible: true }).first(),
            ).toBeVisible();
            await page.waitForTimeout(400);
            const main = page.locator("main").first();
            await main.screenshot({ path: `${PI}/authed-browse-${scheme}.png` });
        });
    });

    adminPopulatedTest.describe(`π admin surface (${scheme})`, () => {
        adminPopulatedTest.use({ colorScheme: scheme });

        adminPopulatedTest(`authed-admin-${scheme}: the populated users panel`, async ({
            page,
        }) => {
            await page.goto("/#/admin/users");
            await expect(
                page.getByRole("heading", { name: "Users" }).filter({ visible: true }).first(),
            ).toBeVisible();
            // Focus the disclosure row so the BR-9 keyboard-focus affordance
            // paints in the frame (the cure's eye evidence).
            const expander = page
                .getByText("azure-fox-01", { exact: true })
                .first()
                .locator('xpath=ancestor::div[contains(@class,"cursor-pointer")][1]');
            await expander.focus();
            await page.waitForTimeout(300);
            const main = page.locator("main").first();
            await main.screenshot({ path: `${PI}/authed-admin-${scheme}.png` });
        });

        adminPopulatedTest(`error-boundary-${scheme}: the U-F58 focus-managed alert`, async ({
            page,
        }) => {
            await page.route("**/admin/users**", (route) => {
                if (!new URL(route.request().url()).pathname.startsWith("/admin/")) {
                    return route.continue();
                }
                return route.fulfill({
                    status: 200,
                    contentType: "application/json",
                    body: JSON.stringify({
                        data: [
                            {
                                slug: null,
                                createdAt: "2026-07-05T00:00:00.000Z",
                                lastSeenAt: "2026-07-05T00:00:00.000Z",
                                status: "active",
                                paletteCount: 2,
                            },
                        ],
                        total: 1,
                        limit: 50,
                        offset: 0,
                    }),
                });
            });
            await page.goto("/#/admin/users");
            const alert = page.getByRole("alert").filter({ visible: true }).first();
            await expect(alert).toBeVisible({ timeout: 10_000 });
            await page.waitForTimeout(300);
            await alert.screenshot({ path: `${PI}/error-boundary-${scheme}.png` });
        });
    });
}
