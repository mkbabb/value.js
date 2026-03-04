import { test, expect, type Locator, type Page } from "@playwright/test";

const RUN_LIVE = process.env.PALETTE_API_E2E === "1";
const ADMIN_TOKEN = process.env.ADMIN_TOKEN_E2E ?? "test-admin-token";

async function openPaletteDialog(page: Page) {
    await page.goto("/");
    await page.waitForSelector(".spectrum-picker");
    await page.locator(".lucide-palette").first().click();
    const dialog = page.locator(".palette-dialog").first();
    await expect(dialog).toBeVisible({ timeout: 5000 });
    return dialog;
}

async function openAdminTab(dialog: Locator) {
    const dot = dialog.getByRole("button").first();
    await dot.click({ modifiers: ["Shift"] });
    await expect(dialog.getByRole("tab", { name: "Admin" })).toBeVisible({
        timeout: 5000,
    });
}

test.describe("Admin Login Live", () => {
    test.skip(!RUN_LIVE, "Set PALETTE_API_E2E=1 to run against a live API.");

    test("accepts .env-style token input and loads admin section", async ({ page }) => {
        const dialog = await openPaletteDialog(page);
        await openAdminTab(dialog);

        const queueResponsePromise = page.waitForResponse(
            (res) =>
                res.url().includes("/admin/queue") && res.request().method() === "GET",
        );

        await page
            .getByPlaceholder("Admin token...")
            .fill(`ADMIN_TOKEN="${ADMIN_TOKEN}"`);
        await page.getByRole("button", { name: /login/i }).click();

        const queueResponse = await queueResponsePromise;
        expect(queueResponse.status()).toBe(200);

        await expect(dialog.getByText("Proposed Color Names")).toBeVisible();
        await expect(dialog.getByText("Palette Management")).toBeVisible();
        await expect(dialog.getByPlaceholder("Palette slug...")).toBeVisible();
    });
});
