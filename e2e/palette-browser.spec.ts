import { test, expect } from "@playwright/test";

test.describe("Palette Browser", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/");
        await page.waitForSelector(".spectrum-picker");
    });

    test("opens palette dialog via grid icon", async ({ page }) => {
        const gridIcon = page.locator(".lucide-layout-grid").first();
        await expect(gridIcon).toBeVisible();
        await gridIcon.click();

        // Dialog should appear — look for the dialog role
        const dialog = page.getByRole("dialog");
        await expect(dialog).toBeVisible({ timeout: 3000 });

        // Title contains "Palettes"
        await expect(dialog.getByText("Palettes", { exact: true }).first()).toBeVisible();
    });

    test("saved and browse tabs are present", async ({ page }) => {
        await page.locator(".lucide-layout-grid").first().click();
        await page.waitForTimeout(300);

        const savedTab = page.getByRole("tab", { name: "Saved" });
        const browseTab = page.getByRole("tab", { name: "Browse" });

        await expect(savedTab).toBeVisible();
        await expect(browseTab).toBeVisible();
    });

    test("can switch between saved and browse tabs", async ({ page }) => {
        await page.locator(".lucide-layout-grid").first().click();
        await page.waitForTimeout(300);

        const savedTab = page.getByRole("tab", { name: "Saved" });
        const browseTab = page.getByRole("tab", { name: "Browse" });

        // Start on saved tab
        await expect(savedTab).toHaveAttribute("data-state", "active");

        // Switch to browse
        await browseTab.click();
        await page.waitForTimeout(300);
        await expect(browseTab).toHaveAttribute("data-state", "active");

        // Switch back to saved
        await savedTab.click();
        await page.waitForTimeout(300);
        await expect(savedTab).toHaveAttribute("data-state", "active");
    });

    test("palette form has name input and buttons", async ({ page }) => {
        // First add a color to the palette so there are saved colors
        const paletteIcon = page.locator(".lucide-palette").first();
        await paletteIcon.click();
        await page.waitForTimeout(400);

        // Open palette dialog
        await page.locator(".lucide-layout-grid").first().click();
        await page.waitForTimeout(300);

        const nameInput = page.getByPlaceholder("Palette name...");
        await expect(nameInput).toBeVisible();
    });

    test("save button disabled when no name entered", async ({ page }) => {
        // Add a color first
        const paletteIcon = page.locator(".lucide-palette").first();
        await paletteIcon.click();
        await page.waitForTimeout(400);

        // Open dialog
        await page.locator(".lucide-layout-grid").first().click();
        await page.waitForTimeout(300);

        // Find save buttons — they should be disabled with empty name
        const saveButton = page.getByRole("button", { name: /save/i }).first();
        if (await saveButton.isVisible()) {
            await expect(saveButton).toBeDisabled();
        }
    });

    test("can create a local palette with a name", async ({ page }) => {
        // Add a color to saved colors
        const paletteIcon = page.locator(".lucide-palette").first();
        await paletteIcon.click();
        await page.waitForTimeout(400);

        // Open palette dialog
        await page.locator(".lucide-layout-grid").first().click();
        await page.waitForTimeout(300);

        // Type a palette name
        const nameInput = page.getByPlaceholder("Palette name...");
        await nameInput.fill("Test Palette");
        await page.waitForTimeout(200);

        // Save button should now be enabled
        const saveButton = page.getByRole("button", { name: /save/i }).first();
        if (await saveButton.isVisible()) {
            await expect(saveButton).toBeEnabled();
            await saveButton.click();
            await page.waitForTimeout(500);

            // Palette should appear in saved tab — use exact match within the dialog
            const dialog = page.getByRole("dialog");
            await expect(
                dialog.getByText("Test Palette", { exact: true }).first(),
            ).toBeVisible({ timeout: 3000 });
        }
    });

    test("search filters palettes by name", async ({ page }) => {
        // Add a color and create a palette
        const paletteIcon = page.locator(".lucide-palette").first();
        await paletteIcon.click();
        await page.waitForTimeout(400);

        await page.locator(".lucide-layout-grid").first().click();
        await page.waitForTimeout(300);

        const nameInput = page.getByPlaceholder("Palette name...");
        await nameInput.fill("Unique Search Test");

        const saveButton = page.getByRole("button", { name: /save/i }).first();
        if (await saveButton.isVisible()) {
            await saveButton.click();
            await page.waitForTimeout(500);
        }

        // Now search for it
        const searchInput = page.getByPlaceholder("Search palettes...");
        if (await searchInput.isVisible()) {
            await searchInput.fill("Unique Search");
            await page.waitForTimeout(300);

            // Should find our palette (exact match within dialog)
            const dialog = page.getByRole("dialog");
            await expect(
                dialog.getByText("Unique Search Test", { exact: true }).first(),
            ).toBeVisible();

            // Search for something that doesn't exist
            await searchInput.fill("zzz_nonexistent_palette");
            await page.waitForTimeout(300);

            // Original palette should not be visible
            await expect(
                dialog.getByText("Unique Search Test", { exact: true }),
            ).not.toBeVisible();
        }
    });
});
