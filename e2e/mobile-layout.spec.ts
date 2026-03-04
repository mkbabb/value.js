import { test, expect } from "@playwright/test";

test.describe("Mobile Layout", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/");
        await page.waitForSelector(".spectrum-picker");
    });

    test("all main elements are visible and not clipped on mobile", async ({
        page,
        browserName,
    }) => {
        // Only run for mobile project (iPhone viewport)
        const viewport = page.viewportSize();
        if (!viewport || viewport.width > 500) {
            test.skip();
        }

        // Spectrum picker should be visible
        await expect(page.locator(".spectrum-picker")).toBeVisible();

        // At least one slider should be visible
        await expect(page.locator("[role='slider']").first()).toBeVisible();

        // Color input should be visible
        await expect(page.locator("[contenteditable]").first()).toBeVisible();

        // Color space selector should be visible
        await expect(page.locator("button[role='combobox']").first()).toBeVisible();
    });

    test("page is scrollable and content below fold is reachable", async ({ page }) => {
        const viewport = page.viewportSize();
        if (!viewport || viewport.width > 500) {
            test.skip();
        }

        // Get the total scrollable height
        const scrollHeight = await page.evaluate(
            () => document.documentElement.scrollHeight,
        );
        const viewportHeight = viewport!.height;

        // Page should be scrollable (content exceeds viewport)
        expect(scrollHeight).toBeGreaterThan(viewportHeight);

        // Scroll to bottom and verify we can reach it
        await page.evaluate(() =>
            window.scrollTo(0, document.documentElement.scrollHeight),
        );
        await page.waitForTimeout(300);

        const scrollTop = await page.evaluate(() => window.scrollY);
        expect(scrollTop).toBeGreaterThan(0);
    });

    test("color picker card is not clipped on mobile", async ({ page }) => {
        const viewport = page.viewportSize();
        if (!viewport || viewport.width > 500) {
            test.skip();
        }

        // The action buttons row (copy, random, etc.) should be reachable by scrolling
        const copyIcon = page.locator(".lucide-copy").first();

        // Scroll the copy button into view
        await copyIcon.scrollIntoViewIfNeeded();
        await expect(copyIcon).toBeVisible();

        // The copy button should be within the viewport after scrolling
        const box = await copyIcon.boundingBox();
        expect(box).toBeTruthy();
        expect(box!.y).toBeGreaterThanOrEqual(0);
        expect(box!.y).toBeLessThan(viewport!.height + 50); // small tolerance for scroll
    });

    test("palette card opens and is visible on mobile", async ({ page }) => {
        const viewport = page.viewportSize();
        if (!viewport || viewport.width > 500) {
            test.skip();
        }

        // Find and click the "add to palette" button (palette icon)
        const paletteButton = page.locator(".lucide-palette").first();
        await paletteButton.scrollIntoViewIfNeeded();
        await paletteButton.click();

        // Wait for the palette card transition
        await page.waitForTimeout(400);

        // The "Saved colors" heading should be visible after scrolling
        const savedColorsHeading = page.getByText("Saved colors");
        await savedColorsHeading.scrollIntoViewIfNeeded();
        await expect(savedColorsHeading).toBeVisible();

        // The palette card should not be clipped — the plus button should be reachable
        const plusIcon = page.locator(".lucide-plus").first();
        await plusIcon.scrollIntoViewIfNeeded();
        await expect(plusIcon).toBeVisible();
    });

    test("picker width caps and centers on wider mobile viewport", async ({ page }) => {
        const viewport = page.viewportSize();
        if (!viewport || viewport.width > 500) {
            test.skip();
        }

        await page.setViewportSize({ width: 700, height: viewport.height });
        await page.waitForTimeout(150);

        const metrics = await page
            .locator(".picker-shell")
            .first()
            .evaluate((el) => {
                const rect = el.getBoundingClientRect();
                const style = getComputedStyle(el as HTMLElement);
                const maxWidth = Number.parseFloat(style.maxWidth);
                const leftGap = rect.left;
                const rightGap = window.innerWidth - rect.right;
                return {
                    width: rect.width,
                    maxWidth,
                    leftGap,
                    rightGap,
                    viewportWidth: window.innerWidth,
                };
            });

        expect(metrics.viewportWidth).toBe(700);
        expect(Number.isFinite(metrics.maxWidth)).toBeTruthy();
        expect(metrics.width).toBeLessThanOrEqual(metrics.maxWidth + 1);
        expect(Math.abs(metrics.leftGap - metrics.rightGap)).toBeLessThanOrEqual(4);
    });
});
