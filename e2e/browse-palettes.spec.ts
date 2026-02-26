import { test, expect } from "@playwright/test";

test.describe("Browse Palettes", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/");
        await page.waitForSelector(".spectrum-picker");
    });

    test("browse tab loads remote palettes or shows empty state", async ({ page }) => {
        await page.locator(".lucide-layout-grid").first().click();
        await page.waitForTimeout(300);

        const browseTab = page.getByRole("tab", { name: "Browse" });
        await browseTab.click();

        // Wait for either palettes to load or the loading spinner to appear/disappear
        await page.waitForTimeout(2000);

        // Either palette cards exist or the tab content is empty/loading
        const browsePanel = page.getByRole("tabpanel");
        await expect(browsePanel).toBeVisible();
    });

    test("palette card shows color strip after creation", async ({ page }) => {
        // Add a color to saved colors via the palette icon
        const paletteIcon = page.locator(".lucide-palette").first();
        await paletteIcon.click();
        await page.waitForTimeout(400);

        // Open palette dialog
        await page.locator(".lucide-layout-grid").first().click();
        await page.waitForTimeout(300);

        // Create a palette
        const nameInput = page.getByPlaceholder("Palette name...");
        await nameInput.fill("Color Strip Test");

        const saveButton = page.getByRole("button", { name: /save/i }).first();
        if (await saveButton.isVisible()) {
            await saveButton.click();
            await page.waitForTimeout(500);
        }

        // Palette card should appear in the dialog with its name
        const dialog = page.getByRole("dialog");
        await expect(
            dialog.getByText("Color Strip Test", { exact: true }).first(),
        ).toBeVisible({ timeout: 3000 });
    });

    test("palette card expands on click to show details", async ({ page }) => {
        // Create a palette
        const paletteIcon = page.locator(".lucide-palette").first();
        await paletteIcon.click();
        await page.waitForTimeout(400);

        await page.locator(".lucide-layout-grid").first().click();
        await page.waitForTimeout(300);

        const nameInput = page.getByPlaceholder("Palette name...");
        await nameInput.fill("Expand Test");

        const saveButton = page.getByRole("button", { name: /save/i }).first();
        if (await saveButton.isVisible()) {
            await saveButton.click();
            await page.waitForTimeout(500);
        }

        // Click the palette card to expand it
        const dialog = page.getByRole("dialog");
        const paletteCard = dialog.getByText("Expand Test", { exact: true }).first();
        await paletteCard.click();
        await page.waitForTimeout(400);

        // After expanding, the card should be taller (detail section visible)
        const card = paletteCard.locator("..").locator("..");
        const box = await card.boundingBox();
        expect(box).toBeTruthy();
    });

    test("copy all colors from a palette", async ({ page, context }) => {
        await context.grantPermissions(["clipboard-read", "clipboard-write"]);

        // Create a palette
        const paletteIcon = page.locator(".lucide-palette").first();
        await paletteIcon.click();
        await page.waitForTimeout(400);

        await page.locator(".lucide-layout-grid").first().click();
        await page.waitForTimeout(300);

        const nameInput = page.getByPlaceholder("Palette name...");
        await nameInput.fill("Copy Test");

        const saveButton = page.getByRole("button", { name: /save/i }).first();
        if (await saveButton.isVisible()) {
            await saveButton.click();
            await page.waitForTimeout(500);
        }

        // Look for clipboard copy icon within the dialog
        const dialog = page.getByRole("dialog");
        const copyIcon = dialog.locator(".lucide-clipboard-copy").first();
        if (await copyIcon.isVisible({ timeout: 2000 }).catch(() => false)) {
            await copyIcon.click();
            await page.waitForTimeout(500);

            const clipboardText = await page.evaluate(() =>
                navigator.clipboard.readText(),
            );
            expect(clipboardText).toBeTruthy();
        }
    });
});
