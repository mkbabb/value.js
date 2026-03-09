import { test, expect } from "@playwright/test";

const COLOR_SPACES = [
    "RGB",
    "HSL",
    "HSV",
    "HWB",
    "Lab",
    "LCh",
    "OKLab",
    "OKLCh",
    "XYZ",
    "Kelvin",
] as const;

/** Select a color space from the combobox dropdown. */
async function selectColorSpace(page: import("@playwright/test").Page, name: string) {
    const trigger = page.locator("button[role='combobox']").first();
    await trigger.click();
    await page.waitForSelector("[role='option']");
    await page.getByRole("option", { name, exact: true }).click();
    // Wait for the markdown to load and render
    await page.waitForTimeout(500);
}

test.describe("Color Space Docs Rendering", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/");
        await page.waitForSelector(".spectrum-picker");
    });

    for (const space of COLOR_SPACES) {
        test(`${space}: KaTeX formulas and code blocks render`, async ({ page }) => {
            await selectColorSpace(page, space);

            // Scroll the "Detailed Guide" section into view
            const guideHeading = page.locator("h2", { hasText: "Detailed Guide" });
            await guideHeading.scrollIntoViewIfNeeded();

            // Find the markdown wrapper
            const markdown = page.locator(".markdown-wrapper");
            await expect(markdown).toBeVisible();

            // --- KaTeX formulas ---
            // The <Katex> Vue component renders into elements with class "katex"
            const katexElements = markdown.locator(".katex");
            const katexCount = await katexElements.count();
            expect(katexCount).toBeGreaterThan(0);

            // Verify each KaTeX element has rendered content (not empty)
            for (let i = 0; i < katexCount; i++) {
                const el = katexElements.nth(i);
                await expect(el).not.toBeEmpty();
            }

            // --- Code blocks ---
            // The ?source imports render as <pre><code> blocks with syntax highlighting
            const codeBlocks = markdown.locator("pre code");
            const codeCount = await codeBlocks.count();
            expect(codeCount).toBeGreaterThan(0);

            // Verify code blocks contain actual function source (not empty, not just whitespace)
            for (let i = 0; i < codeCount; i++) {
                const block = codeBlocks.nth(i);
                const text = await block.textContent();
                expect(text?.trim().length).toBeGreaterThan(10);
            }
        });
    }

    test("KaTeX formulas contain expected mathematical content", async ({ page }) => {
        // OKLCh is a good test case — it has both polar/Cartesian and matrix formulas
        await selectColorSpace(page, "OKLCh");

        const markdown = page.locator(".markdown-wrapper");
        await expect(markdown).toBeVisible();

        // Wait for KaTeX rendering
        const katexElements = markdown.locator(".katex");
        await expect(katexElements.first()).toBeVisible({ timeout: 5000 });

        // Gather all rendered KaTeX text
        const allKatexText = await katexElements.allTextContents();
        const combined = allKatexText.join(" ");

        // Should contain the polar↔Cartesian formulas
        expect(combined).toContain("cos");
        expect(combined).toContain("sin");
        // Should contain the matrix/cbrt formulas
        expect(combined).toMatch(/[³∛]|cbrt|sqrt|3/);
    });

    test("code blocks contain real function implementations", async ({ page }) => {
        // Check OKLab page — code should have actual conversion logic, not placeholders
        await selectColorSpace(page, "OKLab");

        const markdown = page.locator(".markdown-wrapper");
        await expect(markdown).toBeVisible();

        const codeBlocks = markdown.locator("pre code");
        await expect(codeBlocks.first()).toBeVisible({ timeout: 5000 });

        const allCode = await codeBlocks.allTextContents();
        const combined = allCode.join("\n");

        // Should contain recognizable conversion function signatures
        expect(combined).toContain("xyz");
        expect(combined).toContain("oklab");
        // Should contain actual math operations from the source
        expect(combined).toMatch(/Math\.(cbrt|sqrt|hypot)/);
        // Should contain matrix transforms (the real implementation uses transformMat3)
        expect(combined).toContain("transformMat3");
    });
});
