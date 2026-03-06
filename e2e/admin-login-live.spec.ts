import { test, expect, type Page } from "@playwright/test";

const RUN_LIVE = process.env.PALETTE_API_E2E === "1";
const ADMIN_TOKEN = process.env.ADMIN_TOKEN_E2E ?? "test-admin-token";

async function openPaletteDialog(page: Page) {
    await page.goto("/");
    await page.waitForSelector(".spectrum-picker");
    await page.locator(".lucide-palette").first().click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible({ timeout: 5000 });
    return dialog;
}

async function loginAsAdmin(page: Page, dialog: ReturnType<typeof page.getByRole>, token: string) {
    const slugMenu = dialog.locator("button:has(.lucide-ellipsis)").first();
    await slugMenu.click();
    await page.waitForTimeout(300);
    await page.getByText("Switch account").click();
    await page.waitForTimeout(300);

    const slugInput = dialog.getByPlaceholder(/enter slug/i);
    await slugInput.fill(token);
    await slugInput.press("Enter");
    await page.waitForTimeout(500);
}

test.describe("Admin Login Live", () => {
    test.skip(!RUN_LIVE, "Set PALETTE_API_E2E=1 to run against a live API.");

    test("accepts admin token and loads admin section", async ({ page }) => {
        const dialog = await openPaletteDialog(page);

        const usersResponsePromise = page.waitForResponse(
            (res) =>
                res.url().includes("/admin/users") && res.request().method() === "GET",
        );

        await loginAsAdmin(page, dialog, ADMIN_TOKEN);

        // Admin tabs should appear
        await expect(dialog.getByRole("tab", { name: "Users" })).toBeVisible();

        // Click Users tab to trigger the API call
        await dialog.getByRole("tab", { name: "Users" }).click();

        const usersResponse = await usersResponsePromise;
        expect(usersResponse.status()).toBe(200);

        await expect(dialog.getByRole("tab", { name: "Palettes" })).toBeVisible();
        await expect(dialog.getByRole("tab", { name: "Colors" })).toBeVisible();
        await expect(dialog.getByPlaceholder("Search users...")).toBeVisible();
    });
});
