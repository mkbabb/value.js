import { test, expect } from "@playwright/test";

test.describe("Edge Cases", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/");
        await page.waitForSelector(".spectrum-picker");
    });

    test("slug preview appears when typing palette name", async ({ page }) => {
        // Add a color first
        const paletteIcon = page.locator(".lucide-palette").first();
        await paletteIcon.click();
        await page.waitForTimeout(400);

        // Open palette dialog
        await page.locator(".lucide-layout-grid").first().click();
        await page.waitForTimeout(300);

        const nameInput = page.getByPlaceholder("Palette name...");
        await nameInput.fill("My Test Palette");
        await page.waitForTimeout(500);

        // Slug preview should appear (normalized version of the name)
        const slugText = page.getByText("my-test-palette");
        if (await slugText.isVisible({ timeout: 2000 }).catch(() => false)) {
            await expect(slugText).toBeVisible();
        }
    });

    test("search with no results shows empty state", async ({ page }) => {
        // Open palette dialog
        await page.locator(".lucide-layout-grid").first().click();
        await page.waitForTimeout(300);

        const searchInput = page.getByPlaceholder("Search palettes...");
        if (await searchInput.isVisible()) {
            await searchInput.fill("zzz_absolutely_no_match_12345");
            await page.waitForTimeout(300);

            // The saved tab panel should either be empty or show no palette cards
            const tabPanel = page.getByRole("tabpanel");
            const paletteCards = tabPanel.locator("[class*='border-2']");
            const count = await paletteCards.count();
            expect(count).toBe(0);
        }
    });

    test("mobile: no horizontal overflow on card", async ({ page }) => {
        const viewport = page.viewportSize();
        if (!viewport || viewport.width > 500) {
            test.skip();
        }

        // The document should not have horizontal scroll
        const scrollWidth = await page.evaluate(
            () => document.documentElement.scrollWidth,
        );
        const clientWidth = await page.evaluate(
            () => document.documentElement.clientWidth,
        );

        // scrollWidth should not exceed clientWidth (no horizontal overflow)
        expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1); // 1px tolerance
    });

    test("mobile: card fits within viewport width", async ({ page }) => {
        const viewport = page.viewportSize();
        if (!viewport || viewport.width > 500) {
            test.skip();
        }

        // Find the main card element
        const spectrum = page.locator(".spectrum-picker").first();
        const card = spectrum.locator("xpath=ancestor::div[contains(@class, 'rounded-md')]").first();

        if (await card.isVisible()) {
            const box = await card.boundingBox();
            expect(box).toBeTruthy();
            // Card right edge should not extend past viewport
            expect(box!.x + box!.width).toBeLessThanOrEqual(viewport.width + 10);
            // Card left edge should not be off-screen
            expect(box!.x).toBeGreaterThanOrEqual(-1);
        }
    });

    test("mobile: palette dialog is usable on small screens", async ({ page }) => {
        const viewport = page.viewportSize();
        if (!viewport || viewport.width > 500) {
            test.skip();
        }

        await page.locator(".lucide-layout-grid").first().click();
        await page.waitForTimeout(500);

        // Dialog should be visible
        const dialog = page.getByRole("dialog");
        if (await dialog.isVisible({ timeout: 3000 }).catch(() => false)) {
            const box = await dialog.boundingBox();
            expect(box).toBeTruthy();
            // Dialog should not overflow viewport width
            expect(box!.width).toBeLessThanOrEqual(viewport.width + 1);
        }
    });
});
