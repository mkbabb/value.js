import { test, expect } from "@playwright/test";

test.describe("Admin Panel", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/");
        await page.waitForSelector(".spectrum-picker");

        // Open palette dialog
        await page.locator(".lucide-layout-grid").first().click();
        await expect(page.getByRole("dialog")).toBeVisible({ timeout: 3000 });
    });

    test("admin tab is hidden by default", async ({ page }) => {
        const adminTab = page.getByRole("tab", { name: /admin/i });
        await expect(adminTab).not.toBeVisible();
    });

    test("shift+click on header dot reveals admin tab", async ({ page }) => {
        // The header dot is the colored circle button inside the dialog header
        const dialog = page.getByRole("dialog");
        const dot = dialog.locator("button.rounded-full").first();
        await expect(dot).toBeVisible();

        // Shift+click to reveal admin
        await dot.click({ modifiers: ["Shift"] });
        await page.waitForTimeout(300);

        // Admin tab should now be visible and active
        const adminTab = page.getByRole("tab", { name: /admin/i });
        await expect(adminTab).toBeVisible();
        await expect(adminTab).toHaveAttribute("data-state", "active");
    });

    test("admin tab shows login form when not authenticated", async ({ page }) => {
        const dialog = page.getByRole("dialog");
        const dot = dialog.locator("button.rounded-full").first();
        await dot.click({ modifiers: ["Shift"] });
        await page.waitForTimeout(300);

        // Should show the login form
        const tokenInput = page.getByPlaceholder("Admin token...");
        await expect(tokenInput).toBeVisible();

        const loginButton = page.getByRole("button", { name: /login/i });
        await expect(loginButton).toBeVisible();
    });

    test("login with token stores auth and shows admin content", async ({ page }) => {
        // Mock the admin queue API to return successfully
        await page.route("**/admin/queue", (route) => {
            route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify([]),
            });
        });

        const dialog = page.getByRole("dialog");
        const dot = dialog.locator("button.rounded-full").first();
        await dot.click({ modifiers: ["Shift"] });
        await page.waitForTimeout(300);

        // Fill in token and login
        const tokenInput = page.getByPlaceholder("Admin token...");
        await tokenInput.fill("test-admin-token");
        await page.getByRole("button", { name: /login/i }).click();
        await page.waitForTimeout(500);

        // Should show admin content (queue section, palette management)
        await expect(page.getByText("Proposed Color Names")).toBeVisible();
        await expect(page.getByText("Palette Management")).toBeVisible();
        await expect(page.getByPlaceholder("Palette slug...")).toBeVisible();
    });

    test("admin queue renders proposed names from API", async ({ page }) => {
        // Mock the admin queue API with some data
        await page.route("**/admin/queue", (route) => {
            route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify([
                    {
                        id: "abc123",
                        name: "midnight-orchid",
                        css: "oklch(30% 0.15 300)",
                        status: "proposed",
                        createdAt: "2026-02-25T12:00:00Z",
                    },
                    {
                        id: "def456",
                        name: "sunset-coral",
                        css: "oklch(70% 0.2 30)",
                        status: "proposed",
                        createdAt: "2026-02-25T13:00:00Z",
                    },
                ]),
            });
        });

        const dialog = page.getByRole("dialog");
        const dot = dialog.locator("button.rounded-full").first();
        await dot.click({ modifiers: ["Shift"] });
        await page.waitForTimeout(300);

        await page.getByPlaceholder("Admin token...").fill("test-token");
        await page.getByRole("button", { name: /login/i }).click();
        await page.waitForTimeout(500);

        // Both proposed names should appear
        await expect(page.getByText("midnight-orchid")).toBeVisible();
        await expect(page.getByText("sunset-coral")).toBeVisible();
    });

    test("approve button removes item from queue", async ({ page }) => {
        await page.route("**/admin/queue", (route) => {
            route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify([
                    {
                        id: "abc123",
                        name: "test-color",
                        css: "oklch(50% 0.1 180)",
                        status: "proposed",
                        createdAt: "2026-02-25T12:00:00Z",
                    },
                ]),
            });
        });

        await page.route("**/admin/colors/abc123/approve", (route) => {
            route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({ approved: true }),
            });
        });

        const dialog = page.getByRole("dialog");
        const dot = dialog.locator("button.rounded-full").first();
        await dot.click({ modifiers: ["Shift"] });
        await page.waitForTimeout(300);

        await page.getByPlaceholder("Admin token...").fill("test-token");
        await page.getByRole("button", { name: /login/i }).click();
        await page.waitForTimeout(500);

        await expect(page.getByText("test-color")).toBeVisible();

        // Click the approve (check) button
        const approveBtn = page.locator(".lucide-check").first();
        await approveBtn.click();
        await page.waitForTimeout(500);

        // Item should be removed
        await expect(page.getByText("test-color")).not.toBeVisible();
    });

    test("logout hides admin tab and returns to saved", async ({ page }) => {
        await page.route("**/admin/queue", (route) => {
            route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify([]),
            });
        });

        const dialog = page.getByRole("dialog");
        const dot = dialog.locator("button.rounded-full").first();
        await dot.click({ modifiers: ["Shift"] });
        await page.waitForTimeout(300);

        await page.getByPlaceholder("Admin token...").fill("test-token");
        await page.getByRole("button", { name: /login/i }).click();
        await page.waitForTimeout(500);

        // Click logout
        await page.getByRole("button", { name: /logout/i }).click();
        await page.waitForTimeout(300);

        // Should switch back to saved tab, admin tab hidden
        const savedTab = page.getByRole("tab", { name: "Saved" });
        await expect(savedTab).toHaveAttribute("data-state", "active");

        const adminTab = page.getByRole("tab", { name: /admin/i });
        await expect(adminTab).not.toBeVisible();
    });

    test("dialog height stays fixed when switching tabs", async ({ page }) => {
        // Dialog is already open from beforeEach — measure on Saved tab
        const dialog = page.getByRole("dialog");
        const initialBox = await dialog.boundingBox();
        expect(initialBox).toBeTruthy();

        // Switch to browse tab
        await page.getByRole("tab", { name: "Browse" }).click();
        await page.waitForTimeout(500);

        const browseBox = await dialog.boundingBox();
        expect(browseBox).toBeTruthy();

        // Height should be the same (within 2px tolerance for border/rounding)
        expect(Math.abs(initialBox!.height - browseBox!.height)).toBeLessThan(2);
    });
});
