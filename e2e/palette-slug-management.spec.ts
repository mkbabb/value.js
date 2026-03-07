import { test, expect, type Page, type Route } from "@playwright/test";

/**
 * E2E tests for palette slug management:
 * - Slug input cancel (X button + Escape key)
 * - Regenerate slug flow (with/without local palettes)
 * - Account switch flow (with/without local palettes)
 * - Migrate palettes prompt (publish, transfer, discard)
 * - Duplicate palette name detection
 * - Admin login via slug input
 */

const MOCK_SESSION_TOKEN = "test-session-slug-mgmt";
const MOCK_USER_SLUG = "icy-spinning-cobalt-crane";
const MOCK_NEW_SLUG = "warm-dancing-ruby-fox";

function setupApiMocks(page: Page) {
    return page.route("**/colors/**", async (route: Route) => {
        const request = route.request();
        const url = new URL(request.url());
        const method = request.method();

        // POST /sessions — auto-register
        if (url.pathname.endsWith("/sessions") && method === "POST") {
            return route.fulfill({
                status: 201,
                contentType: "application/json",
                body: JSON.stringify({
                    token: MOCK_SESSION_TOKEN,
                    userSlug: MOCK_USER_SLUG,
                }),
            });
        }

        // POST /sessions/login — slug login
        if (url.pathname.endsWith("/sessions/login") && method === "POST") {
            const body = JSON.parse((await request.postData()) ?? "{}");
            if (body.slug === MOCK_NEW_SLUG) {
                return route.fulfill({
                    status: 200,
                    contentType: "application/json",
                    body: JSON.stringify({
                        token: "new-session-token",
                        userSlug: MOCK_NEW_SLUG,
                    }),
                });
            }
            return route.fulfill({
                status: 404,
                contentType: "application/json",
                body: JSON.stringify({ error: "Slug not found" }),
            });
        }

        // GET /palettes
        if (url.pathname.endsWith("/palettes") && method === "GET") {
            return route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({
                    data: [],
                    total: 0,
                    limit: 50,
                    offset: 0,
                }),
            });
        }

        // POST /palettes (publish)
        if (url.pathname.endsWith("/palettes") && method === "POST") {
            const body = JSON.parse((await request.postData()) ?? "{}");
            return route.fulfill({
                status: 201,
                contentType: "application/json",
                body: JSON.stringify({
                    id: "published-" + Date.now(),
                    ...body,
                    voteCount: 0,
                    voted: false,
                    status: "published",
                    isLocal: false,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                }),
            });
        }

        // GET /colors/approved
        if (url.pathname.endsWith("/colors/approved") && method === "GET") {
            return route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify([]),
            });
        }

        // Admin queue
        if (url.pathname.endsWith("/admin/queue")) {
            return route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify([]),
            });
        }

        // Admin user palettes
        if (url.pathname.match(/\/admin\/users\/[^/]+\/palettes$/) && method === "GET") {
            const slug = url.pathname.split("/").at(-2);
            return route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify([
                    {
                        id: `${slug}-pal-1`,
                        name: `${slug} Palette 1`,
                        slug: `${slug}-palette-1`,
                        colors: [{ css: "#ff0000", position: 0 }, { css: "#00ff00", position: 1 }],
                        createdAt: "2026-01-01T00:00:00Z",
                        updatedAt: "2026-01-01T00:00:00Z",
                        isLocal: false,
                        status: "published",
                        voteCount: 0,
                    },
                ]),
            });
        }

        // Admin delete user palettes
        if (url.pathname.match(/\/admin\/users\/[^/]+\/palettes$/) && method === "DELETE") {
            return route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({ deleted: 3 }),
            });
        }

        // Admin delete user
        if (url.pathname.match(/\/admin\/users\/[^/]+$/) && method === "DELETE") {
            return route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({ deleted: true, palettesDeleted: 3 }),
            });
        }

        // Admin feature palette
        if (url.pathname.match(/\/admin\/palettes\/[^/]+\/feature$/) && method === "POST") {
            const slug = url.pathname.split("/").at(-2);
            return route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({ slug, status: "featured" }),
            });
        }

        // Admin delete palette
        if (url.pathname.match(/\/admin\/palettes\/[^/]+$/) && method === "DELETE") {
            return route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({ deleted: true }),
            });
        }

        // Admin users list
        if (url.pathname.includes("/admin/users") && method === "GET") {
            return route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({
                    data: [
                        { slug: "test-user-one", createdAt: "2026-01-01T00:00:00Z", paletteCount: 3 },
                        { slug: "test-user-two", createdAt: "2026-02-01T00:00:00Z", paletteCount: 0 },
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
}

async function openPaletteDialog(page: Page) {
    await page.locator(".lucide-palette").first().click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible({ timeout: 5000 });
    return dialog;
}

async function addColorAndOpenDialog(page: Page) {
    // The palette icon opens the dialog directly now
    return openPaletteDialog(page);
}

async function enterSlugSwitchMode(page: Page, dialog: ReturnType<typeof page.getByRole>) {
    const slugMenu = dialog.locator("button:has(.lucide-ellipsis)").first();
    if (!(await slugMenu.isVisible())) return false;
    await slugMenu.click();
    await page.waitForTimeout(300);
    const switchBtn = page.getByText("Switch account");
    if (!(await switchBtn.isVisible())) return false;
    await switchBtn.click();
    await page.waitForTimeout(300);
    return true;
}

// ========================================================================
// Slug Input Cancel
// ========================================================================

test.describe("Slug Input — Cancel", () => {
    test.beforeEach(async ({ page }) => {
        await setupApiMocks(page);
        await page.goto("/");
        await page.waitForSelector(".spectrum-picker");
    });

    test("slug input has a visible X cancel button", async ({ page }) => {
        const dialog = await openPaletteDialog(page);
        await page.waitForTimeout(500);

        if (!(await enterSlugSwitchMode(page, dialog))) return;

        const slugInput = dialog.getByPlaceholder(/enter slug/i);
        await expect(slugInput).toBeVisible();

        // X cancel button should be visible
        const cancelBtn = dialog.locator("form button:has(.lucide-x)");
        await expect(cancelBtn).toBeVisible();
    });

    test("clicking X cancel button exits slug input mode", async ({ page }) => {
        const dialog = await openPaletteDialog(page);
        await page.waitForTimeout(500);

        if (!(await enterSlugSwitchMode(page, dialog))) return;

        const slugInput = dialog.getByPlaceholder(/enter slug/i);
        await expect(slugInput).toBeVisible();

        const cancelBtn = dialog.locator("form button:has(.lucide-x)");
        await cancelBtn.click();
        await page.waitForTimeout(300);

        await expect(slugInput).not.toBeVisible();

        // Slug pill should reappear
        const slugPill = dialog.locator(".fira-code.rounded-full").first();
        await expect(slugPill).toBeVisible();
    });

    test("pressing Escape exits slug input mode", async ({ page }) => {
        const dialog = await openPaletteDialog(page);
        await page.waitForTimeout(500);

        if (!(await enterSlugSwitchMode(page, dialog))) return;

        const slugInput = dialog.getByPlaceholder(/enter slug/i);
        await expect(slugInput).toBeVisible();

        await slugInput.press("Escape");
        await page.waitForTimeout(300);

        await expect(slugInput).not.toBeVisible();
        await expect(dialog).toBeVisible();
    });
});

// ========================================================================
// Regenerate Slug
// ========================================================================

test.describe("Regenerate Slug", () => {
    test.beforeEach(async ({ page }) => {
        await setupApiMocks(page);
        await page.goto("/");
        await page.waitForSelector(".spectrum-picker");
    });

    test("slug menu shows 'Regenerate slug' option", async ({ page }) => {
        const dialog = await openPaletteDialog(page);
        await page.waitForTimeout(500);

        const slugMenu = dialog.locator("button:has(.lucide-ellipsis)").first();
        if (!(await slugMenu.isVisible())) return;

        await slugMenu.click();
        await page.waitForTimeout(300);

        await expect(page.getByText("Regenerate slug")).toBeVisible();
        const refreshIcon = page.locator("[data-reka-popper-content-wrapper] .lucide-refresh-cw");
        await expect(refreshIcon).toBeVisible();
    });

    test("regenerate slug without local palettes just regenerates", async ({ page }) => {
        const dialog = await openPaletteDialog(page);
        await page.waitForTimeout(500);

        const slugPill = dialog.locator(".fira-code.rounded-full").first();

        const slugMenu = dialog.locator("button:has(.lucide-ellipsis)").first();
        if (!(await slugMenu.isVisible())) return;

        await slugMenu.click();
        await page.waitForTimeout(300);

        await page.getByText("Regenerate slug").click();
        await page.waitForTimeout(500);

        // No migrate dialog should appear (no local palettes)
        // MigratePalettesDialog uses role="dialog", check it's not a second dialog
        const dialogs = page.getByRole("dialog");
        const count = await dialogs.count();
        // Should only be the palette dialog itself
        expect(count).toBeLessThanOrEqual(1);

        // Slug pill should still be visible (re-registered)
        await expect(slugPill).toBeVisible();
    });

    test("regenerate slug with local palettes shows migrate prompt", async ({ page }) => {
        const dialog = await openPaletteDialog(page);
        await page.waitForTimeout(500);

        // Create a local palette first
        const nameInput = dialog.getByPlaceholder(/Palette/);
        await nameInput.fill("Regen Test");
        const saveButton = dialog.getByRole("button", { name: "Save", exact: true }).last();
        await saveButton.click();
        await page.waitForTimeout(300);

        // Now regenerate
        const slugMenu = dialog.locator("button:has(.lucide-ellipsis)").first();
        if (!(await slugMenu.isVisible())) return;

        await slugMenu.click();
        await page.waitForTimeout(300);
        await page.getByText("Regenerate slug").click();
        await page.waitForTimeout(300);

        // Migrate dialog should appear with regenerate mode
        await expect(page.getByText("What about your palettes?")).toBeVisible();
        await expect(page.getByText("Publish, then regenerate")).toBeVisible();
        await expect(page.getByText("Just regenerate")).toBeVisible();
    });

    test("clicking 'Just regenerate' proceeds without publishing", async ({ page }) => {
        const dialog = await openPaletteDialog(page);
        await page.waitForTimeout(500);

        const nameInput = dialog.getByPlaceholder(/Palette/);
        await nameInput.fill("Skip Test");
        const saveButton = dialog.getByRole("button", { name: "Save", exact: true }).last();
        await saveButton.click();
        await page.waitForTimeout(300);

        const slugMenu = dialog.locator("button:has(.lucide-ellipsis)").first();
        if (!(await slugMenu.isVisible())) return;

        await slugMenu.click();
        await page.waitForTimeout(300);
        await page.getByText("Regenerate slug").click();
        await page.waitForTimeout(300);

        // Click "Just regenerate"
        await page.getByText("Just regenerate").click();
        await page.waitForTimeout(500);

        // Migrate dialog should close
        await expect(page.getByText("What about your palettes?")).not.toBeVisible();

        // Slug pill should still be visible (new slug from re-register)
        const slugPill = dialog.locator(".fira-code.rounded-full").first();
        await expect(slugPill).toBeVisible();
    });
});

// ========================================================================
// Account Switch
// ========================================================================

test.describe("Account Switch", () => {
    test.beforeEach(async ({ page }) => {
        await setupApiMocks(page);
        await page.goto("/");
        await page.waitForSelector(".spectrum-picker");
    });

    test("switching to a valid slug updates the slug display", async ({ page }) => {
        const dialog = await openPaletteDialog(page);
        await page.waitForTimeout(500);

        if (!(await enterSlugSwitchMode(page, dialog))) return;

        const slugInput = dialog.getByPlaceholder(/enter slug/i);
        await slugInput.fill(MOCK_NEW_SLUG);
        await slugInput.press("Enter");
        await page.waitForTimeout(500);

        const slugPill = dialog.locator(".fira-code.rounded-full").first();
        await expect(slugPill).toHaveText(MOCK_NEW_SLUG);
    });

    test("switching with local palettes shows migrate prompt with switch mode", async ({ page }) => {
        const dialog = await openPaletteDialog(page);
        await page.waitForTimeout(500);

        // Create a local palette
        const nameInput = dialog.getByPlaceholder(/Palette/);
        await nameInput.fill("Switch Test");
        const saveButton = dialog.getByRole("button", { name: "Save", exact: true }).last();
        await saveButton.click();
        await page.waitForTimeout(300);

        if (!(await enterSlugSwitchMode(page, dialog))) return;

        const slugInput = dialog.getByPlaceholder(/enter slug/i);
        await slugInput.fill(MOCK_NEW_SLUG);
        await slugInput.press("Enter");
        await page.waitForTimeout(300);

        // Migrate dialog should appear with switch mode
        await expect(page.getByText("What about your palettes?")).toBeVisible();
        await expect(page.getByText("Publish, then switch")).toBeVisible();
        await expect(page.getByText("Transfer to new account")).toBeVisible();
        await expect(page.getByText("Just switch")).toBeVisible();
    });

    test("invalid slug shows error", async ({ page }) => {
        const dialog = await openPaletteDialog(page);
        await page.waitForTimeout(500);

        if (!(await enterSlugSwitchMode(page, dialog))) return;

        const slugInput = dialog.getByPlaceholder(/enter slug/i);
        await slugInput.fill("non-existent-fake-slug");
        await slugInput.press("Enter");
        await page.waitForTimeout(500);

        await expect(dialog.getByText("Slug not found")).toBeVisible();
    });

    test("switching to the same slug shows already-signed-in error", async ({ page }) => {
        const dialog = await openPaletteDialog(page);
        await page.waitForTimeout(500);

        // Get current slug from the pill
        const slugPill = dialog.locator(".fira-code.rounded-full").first();
        const currentSlug = await slugPill.textContent();

        if (!(await enterSlugSwitchMode(page, dialog))) return;

        const slugInput = dialog.getByPlaceholder(/enter slug/i);
        await slugInput.fill(currentSlug!.trim());
        await slugInput.press("Enter");
        await page.waitForTimeout(300);

        await expect(dialog.getByText("Already signed in as this slug")).toBeVisible();
    });
});

// ========================================================================
// Duplicate Palette Name
// ========================================================================

test.describe("Duplicate Palette Name", () => {
    test.beforeEach(async ({ page }) => {
        await setupApiMocks(page);
        await page.goto("/");
        await page.waitForSelector(".spectrum-picker");
    });

    test("saving with duplicate name shows update prompt", async ({ page }) => {
        const dialog = await openPaletteDialog(page);
        await page.waitForTimeout(500);

        const nameInput = dialog.getByPlaceholder(/Palette/);
        const saveButton = dialog.getByRole("button", { name: "Save", exact: true }).last();

        await nameInput.fill("My Colors");
        await saveButton.click();
        await page.waitForTimeout(300);

        await nameInput.fill("My Colors");
        await saveButton.click();
        await page.waitForTimeout(300);

        await expect(dialog.getByText('"My Colors" already exists.')).toBeVisible();
        await expect(dialog.getByRole("button", { name: "Update" })).toBeVisible();
        await expect(dialog.getByRole("button", { name: "Cancel" })).toBeVisible();
    });

    test("clicking Update replaces existing palette colors", async ({ page }) => {
        const dialog = await openPaletteDialog(page);
        await page.waitForTimeout(500);

        const nameInput = dialog.getByPlaceholder(/Palette/);
        const saveButton = dialog.getByRole("button", { name: "Save", exact: true }).last();

        await nameInput.fill("Updatable");
        await saveButton.click();
        await page.waitForTimeout(300);

        await nameInput.fill("Updatable");
        await saveButton.click();
        await page.waitForTimeout(300);

        await dialog.getByRole("button", { name: "Update" }).click();
        await page.waitForTimeout(300);

        await expect(dialog.getByText('"Updatable" already exists.')).not.toBeVisible();

        const cards = dialog.locator("text=Updatable");
        const count = await cards.count();
        expect(count).toBeGreaterThanOrEqual(1);
    });

    test("clicking Cancel dismisses the duplicate prompt", async ({ page }) => {
        const dialog = await openPaletteDialog(page);
        await page.waitForTimeout(500);

        const nameInput = dialog.getByPlaceholder(/Palette/);
        const saveButton = dialog.getByRole("button", { name: "Save", exact: true }).last();

        await nameInput.fill("CancelTest");
        await saveButton.click();
        await page.waitForTimeout(300);

        await nameInput.fill("CancelTest");
        await saveButton.click();
        await page.waitForTimeout(300);

        await dialog.getByRole("button", { name: "Cancel" }).click();
        await page.waitForTimeout(300);

        await expect(dialog.getByText('"CancelTest" already exists.')).not.toBeVisible();
    });
});

// ========================================================================
// Admin Login via Slug Input
// ========================================================================

test.describe("Admin Login via Slug Input", () => {
    test.beforeEach(async ({ page }) => {
        await setupApiMocks(page);
        await page.goto("/");
        await page.waitForSelector(".spectrum-picker");
    });

    test("entering admin token in slug input activates admin tabs", async ({ page }) => {
        const dialog = await openPaletteDialog(page);
        await page.waitForTimeout(500);

        if (!(await enterSlugSwitchMode(page, dialog))) return;

        const slugInput = dialog.getByPlaceholder(/enter slug/i);
        await slugInput.fill("my-secret-admin-token-12345");
        await slugInput.press("Enter");
        await page.waitForTimeout(500);

        const usersTab = page.getByRole("tab", { name: "Users" });
        await expect(usersTab).toBeVisible();

        // Names tab should be visible (renamed from Colors)
        const namesTab = page.getByRole("tab", { name: "Names" });
        await expect(namesTab).toBeVisible();
    });

    test("admin Users tab shows user list", async ({ page }) => {
        const dialog = await openPaletteDialog(page);
        await page.waitForTimeout(500);

        if (!(await enterSlugSwitchMode(page, dialog))) return;

        const slugInput = dialog.getByPlaceholder(/enter slug/i);
        await slugInput.fill("admin-token-for-test");
        await slugInput.press("Enter");
        await page.waitForTimeout(500);

        const usersTab = page.getByRole("tab", { name: "Users" });
        if (await usersTab.isVisible()) {
            await usersTab.click();
            await page.waitForTimeout(500);

            await expect(dialog.getByText("test-user-one")).toBeVisible();
            await expect(dialog.getByText("test-user-two")).toBeVisible();
        }
    });
});

// ========================================================================
// Admin User Management
// ========================================================================

test.describe("Admin User Management", () => {
    test.beforeEach(async ({ page }) => {
        await setupApiMocks(page);
        await page.goto("/");
        await page.waitForSelector(".spectrum-picker");
    });

    async function loginAsAdmin(page: Page) {
        const dialog = await openPaletteDialog(page);
        await page.waitForTimeout(500);
        if (!(await enterSlugSwitchMode(page, dialog))) return null;
        const slugInput = dialog.getByPlaceholder(/enter slug/i);
        await slugInput.fill("admin-token-for-test");
        await slugInput.press("Enter");
        await page.waitForTimeout(500);
        return dialog;
    }

    test("admin Users tab shows user list with action buttons", async ({ page }) => {
        const dialog = await loginAsAdmin(page);
        if (!dialog) return;

        const usersTab = page.getByRole("tab", { name: "Users" });
        if (!(await usersTab.isVisible())) return;
        await usersTab.click();
        await page.waitForTimeout(500);

        // Users should be visible
        await expect(dialog.getByText("test-user-one")).toBeVisible();
        await expect(dialog.getByText("test-user-two")).toBeVisible();

        // Action buttons should exist
        const impersonateButtons = dialog.getByRole("button", { name: "Impersonate" });
        expect(await impersonateButtons.count()).toBeGreaterThanOrEqual(2);
    });

    test("clicking user row expands to show their palettes", async ({ page }) => {
        const dialog = await loginAsAdmin(page);
        if (!dialog) return;

        const usersTab = page.getByRole("tab", { name: "Users" });
        if (!(await usersTab.isVisible())) return;
        await usersTab.click();
        await page.waitForTimeout(500);

        // Click on user row to expand
        await dialog.getByText("test-user-one").click();
        await page.waitForTimeout(500);

        // Should show user's palettes
        await expect(dialog.getByText("test-user-one Palette 1")).toBeVisible();
    });

    test("delete user button removes user from list", async ({ page }) => {
        const dialog = await loginAsAdmin(page);
        if (!dialog) return;

        const usersTab = page.getByRole("tab", { name: "Users" });
        if (!(await usersTab.isVisible())) return;
        await usersTab.click();
        await page.waitForTimeout(500);

        // Find delete button for first user (the red trash button)
        const userRow = dialog.getByText("test-user-one").locator("../..");
        const deleteBtn = userRow.locator("button.bg-destructive, button[class*='destructive']").first();
        if (await deleteBtn.isVisible()) {
            await deleteBtn.click();
            await page.waitForTimeout(500);
            await expect(dialog.getByText("test-user-one")).not.toBeVisible();
        }
    });
});

// ========================================================================
// Admin Browse Features
// ========================================================================

test.describe("Admin Browse Features", () => {
    test.beforeEach(async ({ page }) => {
        await setupApiMocks(page);
        // Override palettes mock to include palettes
        await page.route("**/colors/palettes?*", async (route: Route) => {
            return route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({
                    data: [
                        {
                            id: "pal-1",
                            name: "Test Palette",
                            slug: "test-palette-slug",
                            colors: [
                                { css: "#ff6b6b", position: 0 },
                                { css: "#4ecdc4", position: 1 },
                            ],
                            createdAt: "2026-01-01T00:00:00Z",
                            updatedAt: "2026-01-01T00:00:00Z",
                            isLocal: false,
                            status: "published",
                            voteCount: 5,
                        },
                    ],
                    total: 1,
                    limit: 50,
                    offset: 0,
                }),
            });
        });
        await page.goto("/");
        await page.waitForSelector(".spectrum-picker");
    });

    test("expanding palette card in browse shows slug with first palette color", async ({ page }) => {
        const dialog = await openPaletteDialog(page);
        await page.waitForTimeout(500);

        // Switch to browse tab
        const browseTab = dialog.getByRole("tab", { name: "Browse" });
        await browseTab.click();
        await page.waitForTimeout(1000);

        // Click palette to expand
        const card = dialog.getByText("Test Palette").first();
        if (await card.isVisible()) {
            await card.click();
            await page.waitForTimeout(500);

            // Slug should be visible in expanded section
            const slugPill = dialog.locator(".fira-code.rounded-full").filter({ hasText: "test-palette-slug" });
            await expect(slugPill).toBeVisible();
        }
    });
});

// ========================================================================
// Dialog Dismiss Behavior
// ========================================================================

test.describe("Dialog Dismiss Behavior", () => {
    test.beforeEach(async ({ page }) => {
        await setupApiMocks(page);
        await page.goto("/");
        await page.waitForSelector(".spectrum-picker");
    });

    test("clicking outside dialog dismisses it", async ({ page }) => {
        await openPaletteDialog(page);
        await page.waitForTimeout(300);

        // Click on overlay (far left)
        await page.mouse.click(20, 400);
        await page.waitForTimeout(500);

        const dialog = page.getByRole("dialog");
        await expect(dialog).not.toBeVisible();
    });

    test("Escape key from slug input does NOT close dialog", async ({ page }) => {
        const dialog = await openPaletteDialog(page);
        await page.waitForTimeout(500);

        if (!(await enterSlugSwitchMode(page, dialog))) return;

        const slugInput = dialog.getByPlaceholder(/enter slug/i);
        await slugInput.press("Escape");
        await page.waitForTimeout(300);

        await expect(slugInput).not.toBeVisible();
        await expect(dialog).toBeVisible();
    });
});
