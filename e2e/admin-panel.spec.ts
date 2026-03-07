import { test, expect, type Page } from "@playwright/test";

async function openPaletteDialog(page: Page) {
    await page.goto("/");
    await page.waitForSelector(".spectrum-picker");
    await page.locator(".lucide-palette").first().click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible({ timeout: 5000 });
    return dialog;
}

async function loginAsAdmin(page: Page, dialog: ReturnType<typeof page.getByRole>) {
    // Wait for slug pill to appear (ensureUser auto-registers via POST /sessions)
    const slugMenu = dialog.locator("button:has(.lucide-ellipsis)").first();
    await expect(slugMenu).toBeVisible({ timeout: 5000 });

    // Open slug menu → Switch account → enter admin token
    await slugMenu.click();
    await page.waitForTimeout(300);
    await page.getByText("Switch account").click();
    await page.waitForTimeout(300);

    const slugInput = dialog.getByPlaceholder(/enter slug/i);
    await slugInput.fill("test-admin-token");
    await slugInput.press("Enter");
    await page.waitForTimeout(500);
}

test.describe("Admin Panel", () => {
    test.beforeEach(async ({ page }) => {
        // Mock API routes
        await page.route("**/colors/**", async (route) => {
            const url = new URL(route.request().url());
            const method = route.request().method();

            if (url.pathname.endsWith("/sessions") && method === "POST") {
                return route.fulfill({
                    status: 201,
                    contentType: "application/json",
                    body: JSON.stringify({ token: "test-token", userSlug: "test-slug-one" }),
                });
            }
            if (url.pathname.endsWith("/palettes") && method === "GET") {
                return route.fulfill({
                    status: 200,
                    contentType: "application/json",
                    body: JSON.stringify({ data: [], total: 0, limit: 50, offset: 0 }),
                });
            }
            if (url.pathname.endsWith("/colors/approved")) {
                return route.fulfill({
                    status: 200,
                    contentType: "application/json",
                    body: JSON.stringify([]),
                });
            }
            if (url.pathname.endsWith("/admin/queue")) {
                return route.fulfill({
                    status: 200,
                    contentType: "application/json",
                    body: JSON.stringify([]),
                });
            }
            if (url.pathname.includes("/admin/users") && method === "GET") {
                return route.fulfill({
                    status: 200,
                    contentType: "application/json",
                    body: JSON.stringify({
                        data: [
                            { slug: "user-alpha-one", createdAt: "2026-01-01T00:00:00Z", paletteCount: 3 },
                            { slug: "user-beta-two", createdAt: "2026-02-01T00:00:00Z", paletteCount: 0 },
                        ],
                        total: 2,
                        limit: 50,
                        offset: 0,
                    }),
                });
            }
            return route.fulfill({
                status: 404,
                contentType: "application/json",
                body: JSON.stringify({ error: "Not found" }),
            });
        });
    });

    test("admin tabs are hidden by default", async ({ page }) => {
        const dialog = await openPaletteDialog(page);
        const usersTab = dialog.getByRole("tab", { name: "Users" });
        await expect(usersTab).not.toBeVisible();
    });

    test("entering admin token via slug input reveals admin tabs", async ({ page }) => {
        const dialog = await openPaletteDialog(page);
        await page.waitForTimeout(500);
        await loginAsAdmin(page, dialog);

        // Admin tabs should appear
        await expect(dialog.getByRole("tab", { name: "Users" })).toBeVisible();
        await expect(dialog.getByRole("tab", { name: "Names" })).toBeVisible();
    });

    test("admin header changes to 'Admin Palettes'", async ({ page }) => {
        const dialog = await openPaletteDialog(page);
        await page.waitForTimeout(500);
        await loginAsAdmin(page, dialog);

        await expect(dialog.getByText("Admin")).toBeVisible();
    });

    test("Users tab loads and shows user list", async ({ page }) => {
        const dialog = await openPaletteDialog(page);
        await page.waitForTimeout(500);
        await loginAsAdmin(page, dialog);

        await dialog.getByRole("tab", { name: "Users" }).click();
        await page.waitForTimeout(500);

        await expect(dialog.getByText("user-alpha-one")).toBeVisible();
        await expect(dialog.getByText("user-beta-two")).toBeVisible();
        await expect(dialog.getByRole("button", { name: "Impersonate" }).first()).toBeVisible();
    });

    test("Names tab shows queue or empty state", async ({ page }) => {
        const dialog = await openPaletteDialog(page);
        await page.waitForTimeout(500);
        await loginAsAdmin(page, dialog);

        await dialog.getByRole("tab", { name: "Names" }).click();
        await page.waitForTimeout(300);

        await expect(dialog.getByText("No pending proposals")).toBeVisible();
    });

    test("Names tab renders proposed names from API", async ({ page }) => {
        // Override the queue mock with data
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

        const dialog = await openPaletteDialog(page);
        await page.waitForTimeout(500);
        await loginAsAdmin(page, dialog);

        await dialog.getByRole("tab", { name: "Names" }).click();
        await page.waitForTimeout(500);

        await expect(dialog.getByText("midnight-orchid")).toBeVisible();
        await expect(dialog.getByText("sunset-coral")).toBeVisible();
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

        const dialog = await openPaletteDialog(page);
        await page.waitForTimeout(500);
        await loginAsAdmin(page, dialog);

        await dialog.getByRole("tab", { name: "Names" }).click();
        await page.waitForTimeout(500);

        await expect(dialog.getByText("test-color")).toBeVisible();

        // Click approve (check icon button)
        const approveBtn = dialog.locator(".lucide-check").first();
        await approveBtn.click();
        await page.waitForTimeout(500);

        await expect(dialog.getByText("test-color")).not.toBeVisible();
    });

    test("search placeholder changes per admin tab", async ({ page }) => {
        const dialog = await openPaletteDialog(page);
        await page.waitForTimeout(500);
        await loginAsAdmin(page, dialog);

        await dialog.getByRole("tab", { name: "Users" }).click();
        await page.waitForTimeout(300);
        await expect(dialog.getByPlaceholder("Search users...")).toBeVisible();

        await dialog.getByRole("tab", { name: "Names" }).click();
        await page.waitForTimeout(300);
        await expect(dialog.getByPlaceholder(/color names/i)).toBeVisible();
    });

    test("dialog height stays fixed when switching tabs", async ({ page }) => {
        const dialog = await openPaletteDialog(page);
        const initialBox = await dialog.boundingBox();
        expect(initialBox).toBeTruthy();

        await dialog.getByRole("tab", { name: "Browse" }).click();
        await page.waitForTimeout(500);

        const browseBox = await dialog.boundingBox();
        expect(browseBox).toBeTruthy();

        expect(Math.abs(initialBox!.height - browseBox!.height)).toBeLessThan(40);
    });
});
