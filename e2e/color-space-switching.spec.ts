import { test, expect } from "@playwright/test";

const COLOR_SPACES = [
    { name: "RGB", firstLabel: "R" },
    { name: "HSL", firstLabel: "H" },
    { name: "HSV", firstLabel: "H" },
    { name: "HWB", firstLabel: "H" },
    { name: "Lab", firstLabel: "L" },
    { name: "LCh", firstLabel: "L" },
    { name: "OKLab", firstLabel: "L" },
    { name: "OKLCh", firstLabel: "L" },
    { name: "XYZ", firstLabel: "X" },
    { name: "Kelvin", firstLabel: "K" },
];

test.describe("Color Space Switching", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/");
        await page.waitForSelector(".spectrum-picker");
    });

    test("all 10 color spaces update slider labels correctly", async ({ page }) => {
        for (const space of COLOR_SPACES) {
            const trigger = page.locator("button[role='combobox']").first();
            await trigger.click();
            await page.waitForSelector("[role='option']");

            const option = page.getByRole("option", { name: space.name, exact: true });
            await option.click();
            await page.waitForTimeout(300);

            const labels = await page.locator("label.font-bold").allTextContents();
            expect(labels.length).toBeGreaterThan(0);

            const firstChar = labels[0].trim().charAt(0).toUpperCase();
            expect(firstChar).toBe(space.firstLabel);

            const sliderCount = await page.locator("[role='slider']").count();
            expect(sliderCount).toBeGreaterThanOrEqual(2);

            await expect(page.locator(".spectrum-picker")).toBeVisible();
        }
    });
});
