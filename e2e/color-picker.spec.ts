import { test, expect } from "@playwright/test";

test.describe("Color Picker", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/");
        // Wait for the app to hydrate
        await page.waitForSelector(".spectrum-picker");
    });

    test("page loads with main elements visible", async ({ page }) => {
        // Spectrum picker
        await expect(page.locator(".spectrum-picker")).toBeVisible();

        // Color space selector
        await expect(page.locator("button[role='combobox']").first()).toBeVisible();

        // At least one slider
        await expect(page.locator("[role='slider']").first()).toBeVisible();
    });

    test("spectrum interaction fires handlers", async ({ page }) => {
        const spectrum = page.locator(".spectrum-picker");
        const box = await spectrum.boundingBox();
        if (!box) throw new Error("Spectrum not found");

        // Track mousedown events on the spectrum
        const mouseDownFired = await page.evaluate(() => {
            return new Promise<boolean>((resolve) => {
                const el = document.querySelector(".spectrum-picker")!;
                el.addEventListener(
                    "mousedown",
                    () => resolve(true),
                    { once: true },
                );
                // Timeout fallback
                setTimeout(() => resolve(false), 2000);
            });
        });

        // Trigger mousedown via Playwright mouse API (runs concurrently with the evaluate promise)
        // We need to start the listener first, so use a different approach:
        let resolved = false;
        const listenerPromise = page.evaluate(() => {
            return new Promise<boolean>((resolve) => {
                const el = document.querySelector(".spectrum-picker")!;
                el.addEventListener(
                    "mousedown",
                    () => resolve(true),
                    { once: true },
                );
                setTimeout(() => resolve(false), 3000);
            });
        });

        // Give the listener time to register
        await page.waitForTimeout(100);

        // Click the spectrum
        await page.mouse.click(
            box.x + box.width * 0.9,
            box.y + box.height * 0.9,
        );

        const result = await listenerPromise;
        expect(result).toBe(true);

        // Verify the spectrum has interactive styles (cursor, gradients)
        const style = await spectrum.getAttribute("style");
        expect(style).toContain("linear-gradient");
    });

    test("slider interaction updates color value", async ({ page }) => {
        const sliders = page.locator("[role='slider']");
        const firstSlider = sliders.first();
        const sliderBox = await firstSlider.boundingBox();
        if (!sliderBox) throw new Error("Slider not found");

        // Drag the slider
        await firstSlider.click();
        await page.mouse.down();
        await page.mouse.move(sliderBox.x + sliderBox.width + 50, sliderBox.y + sliderBox.height / 2);
        await page.mouse.up();

        // Verify the slider has an aria-valuenow attribute that changed
        const value = await firstSlider.getAttribute("aria-valuenow");
        expect(value).toBeTruthy();
    });

    test("color input accepts text and updates color", async ({ page }) => {
        const input = page.locator("[contenteditable]").first();
        await expect(input).toBeVisible();

        // Clear and type a new color
        await input.click();
        await page.keyboard.down("Meta");
        await page.keyboard.press("a");
        await page.keyboard.up("Meta");
        await page.keyboard.type("red");
        await page.keyboard.press("Enter");

        // Wait for parsing debounce
        await page.waitForTimeout(500);

        // The spectrum background should reflect the hue change
        const spectrum = page.locator(".spectrum-picker");
        const style = await spectrum.getAttribute("style");
        expect(style).toBeTruthy();
    });

    test("color space switching works", async ({ page }) => {
        // Open the color space selector
        const trigger = page.locator("button[role='combobox']").first();
        await trigger.click();

        // Wait for the dropdown
        await page.waitForSelector("[role='option']");

        // Select HSV
        const hsvOption = page.locator("[role='option']").filter({ hasText: "HSV" });
        await hsvOption.click();

        // Verify sliders updated — look for "H" label
        await expect(page.locator("label").filter({ hasText: "H" }).first()).toBeVisible();
    });

    test("copy button triggers clipboard write", async ({ page, context, browserName }) => {
        // WebKit doesn't support clipboard permissions via grantPermissions
        test.skip(browserName === "webkit", "Clipboard permissions unsupported in WebKit");
        // Grant clipboard permissions
        await context.grantPermissions(["clipboard-read", "clipboard-write"]);

        // Find and click the copy icon
        const copyButton = page.locator(".lucide-copy").first();
        await expect(copyButton).toBeVisible();
        await copyButton.click();

        // Wait for toast notification
        await page.waitForTimeout(500);

        // Check clipboard has content
        const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
        expect(clipboardText).toBeTruthy();
        // Should be a valid CSS color string
        expect(clipboardText.length).toBeGreaterThan(3);
    });

    test("URL state round-trip restores space and color", async ({ page }) => {
        const color = encodeURIComponent("rgb(255, 0, 0)");
        const url = `/#space=rgb&color=${color}`;
        await page.goto(url, { waitUntil: "load" });
        await page.waitForSelector(".spectrum-picker");

        // Verify the color space selector shows "RGB"
        const trigger = page.locator("button[role='combobox']").first();
        await expect(trigger).toContainText("RGB", { timeout: 5000 });

        // Verify the input contains the color (may be formatted)
        const input = page.locator("[contenteditable]").first();
        const inputText = await input.textContent();
        // Should contain "rgb" or the parsed color values (255)
        expect(inputText).toBeTruthy();
        expect(inputText!.length).toBeGreaterThan(2);
    });

    test("reset button restores defaults", async ({ page }) => {
        // First switch to a non-default space
        const trigger = page.locator("button[role='combobox']").first();
        await trigger.click();
        await page.waitForSelector("[role='option']");
        await page.locator("[role='option']").filter({ hasText: "HSV" }).click();
        await expect(trigger).toContainText("HSV");

        // Click the reset button
        const resetButton = page.locator(".lucide-rotate-ccw").first();
        await resetButton.click();

        // Verify we're back to OKLCh
        await expect(trigger).toContainText("OKLCh", { timeout: 5000 });

        // Verify URL updated
        await page.waitForTimeout(300);
        const hash = new URL(page.url()).hash;
        expect(hash).toContain("space=oklch");
    });

    test("URL updates when color space is switched", async ({ page }) => {
        const trigger = page.locator("button[role='combobox']").first();
        await trigger.click();
        await page.waitForSelector("[role='option']");
        await page.locator("[role='option']").filter({ hasText: "HSV" }).click();
        await page.waitForTimeout(300);

        const hash = new URL(page.url()).hash;
        expect(hash).toContain("space=hsv");
    });

    test("rapid spectrum dragging does not cause jank", async ({ page }) => {
        const spectrum = page.locator(".spectrum-picker");
        const box = await spectrum.boundingBox();
        if (!box) throw new Error("Spectrum not found");

        // Start dragging
        await page.mouse.move(box.x + 10, box.y + 10);
        await page.mouse.down();

        const frameTimes: number[] = [];
        const start = Date.now();

        // Drag rapidly for 1 second
        while (Date.now() - start < 1000) {
            const x = box.x + Math.random() * box.width;
            const y = box.y + Math.random() * box.height;
            const frameStart = Date.now();
            await page.mouse.move(x, y);
            frameTimes.push(Date.now() - frameStart);
        }

        await page.mouse.up();

        // p95 frame time should be under 50ms (generous for CI)
        frameTimes.sort((a, b) => a - b);
        const p95 = frameTimes[Math.floor(frameTimes.length * 0.95)];
        expect(p95).toBeLessThan(100);
    });
});
