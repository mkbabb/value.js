import { test, expect } from "@playwright/test";

test.describe("Propose Name", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/");
        await page.waitForSelector(".spectrum-picker");
    });

    /**
     * Ensure the current color is random (not a named CSS color) so
     * canProposeName is true and the tag icon is visible.
     */
    async function ensureRandomColor(page: import("@playwright/test").Page) {
        const shuffleIcon = page.locator(".lucide-shuffle").first();
        await shuffleIcon.click();
        await page.waitForTimeout(500);
    }

    test("tag icon is visible for unnamed colors", async ({ page }) => {
        await ensureRandomColor(page);

        const tagIcon = page.locator(".lucide-tag").first();
        await expect(tagIcon).toBeVisible({ timeout: 3000 });
    });

    test("tag icon toggles propose form open and closed", async ({ page }) => {
        await ensureRandomColor(page);

        const tagIcon = page.locator(".lucide-tag").first();
        await expect(tagIcon).toBeVisible({ timeout: 3000 });

        // Open the form
        await tagIcon.click();
        await page.waitForTimeout(400);

        const input = page.getByPlaceholder("Propose a name...");
        await expect(input).toBeVisible();

        // Close the form
        await tagIcon.click();
        await page.waitForTimeout(400);

        await expect(input).not.toBeVisible();
    });

    test("propose form is NOT clipped (vertical cutoff fix)", async ({ page }) => {
        await ensureRandomColor(page);

        const tagIcon = page.locator(".lucide-tag").first();
        await expect(tagIcon).toBeVisible({ timeout: 3000 });
        await tagIcon.click();
        await page.waitForTimeout(400);

        const input = page.getByPlaceholder("Propose a name...");
        await expect(input).toBeVisible();

        // The input should have a real bounding box — not clipped to 0 height
        const box = await input.boundingBox();
        expect(box).toBeTruthy();
        expect(box!.height).toBeGreaterThan(10);
        expect(box!.width).toBeGreaterThan(50);
    });

    test("sparkles submit button disabled when input empty", async ({ page }) => {
        await ensureRandomColor(page);

        const tagIcon = page.locator(".lucide-tag").first();
        await expect(tagIcon).toBeVisible({ timeout: 3000 });
        await tagIcon.click();
        await page.waitForTimeout(400);

        // The submit button (contains sparkles icon) should be disabled
        const submitButton = page.locator("button:has(.lucide-sparkles)").first();
        await expect(submitButton).toBeDisabled();
    });

    test("propose form submit button enables with text", async ({ page }) => {
        await ensureRandomColor(page);

        const tagIcon = page.locator(".lucide-tag").first();
        await expect(tagIcon).toBeVisible({ timeout: 3000 });
        await tagIcon.click();
        await page.waitForTimeout(400);

        const proposeInput = page.getByPlaceholder("Propose a name...");
        await expect(proposeInput).toBeVisible();

        // Submit button should be disabled with empty input
        const submitButton = page.locator("button:has(.lucide-sparkles)").first();
        await expect(submitButton).toBeDisabled();

        // Type a name — button should become enabled
        await proposeInput.fill("my-cool-color");
        await page.waitForTimeout(200);
        await expect(submitButton).toBeEnabled();

        // Clear input — button should be disabled again
        await proposeInput.fill("");
        await page.waitForTimeout(200);
        await expect(submitButton).toBeDisabled();
    });
});
