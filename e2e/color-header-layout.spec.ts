import { test, expect } from "@playwright/test";

/**
 * Validates that the color picker header (color space selector + component values)
 * never spills into additional rows or overflows its container, across all color
 * spaces and a variety of input colors that produce extreme component values.
 */

const COLOR_SPACES = [
    "RGB", "HSL", "HSV", "HWB", "Lab", "LCh", "OKLab", "OKLCh", "XYZ", "Kelvin",
] as const;

/** Colors chosen to produce large/negative/decimal-heavy component values. */
const FUZZ_COLORS = [
    "rgb(255, 255, 255)",    // max RGB
    "rgb(0, 0, 0)",          // min RGB — zeros everywhere
    "hsl(359.9, 100%, 50%)", // near-max hue, full saturation
    "lab(100% -125 125)",    // extreme Lab a/b
    "oklch(0.999 0.4 359)",  // near-max OKLCh chroma + hue
    "color(display-p3 1 0 0)", // wide gamut — may produce negative sRGB
    "#123456",               // arbitrary mid-range
    "hwb(180 0% 0%)",        // pure cyan
];

/** Selector for the CardTitle h3 that wraps component values. */
const COMPONENT_ROW = "h3.flex";

/** Selector for contenteditable value spans. */
const VALUE_SPANS = `${COMPONENT_ROW} [contenteditable='true']`;

async function switchColorSpace(page: import("@playwright/test").Page, space: string) {
    const trigger = page.locator("button[role='combobox']").first();
    await trigger.click();
    await page.waitForSelector("[role='option']");
    await page.getByRole("option", { name: space, exact: true }).click();
    await page.waitForTimeout(200);
}

async function setColorViaUrl(page: import("@playwright/test").Page, color: string, space: string) {
    const encoded = encodeURIComponent(color);
    await page.goto(`/#space=${space.toLowerCase()}&color=${encoded}`, { waitUntil: "load" });
    await page.waitForSelector(".spectrum-picker");
    await page.waitForTimeout(300);
}

test.describe("Color Header Layout", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/");
        await page.waitForSelector(".spectrum-picker");
    });

    test("component display row does not wrap across all color spaces", async ({ page }) => {
        for (const space of COLOR_SPACES) {
            await switchColorSpace(page, space);

            const componentRow = page.locator(COMPONENT_ROW).first();
            await expect(componentRow).toBeVisible();

            // All child divs (one per component) should share the same y position
            const childBoxes = await componentRow.locator(":scope > div").evaluateAll(
                (els) => els.map((el) => el.getBoundingClientRect()),
            );

            if (childBoxes.length < 2) continue; // Kelvin has 1 component

            const firstY = childBoxes[0].top;
            for (let i = 1; i < childBoxes.length; i++) {
                expect(
                    Math.abs(childBoxes[i].top - firstY),
                    `component ${i} in ${space} wrapped to a new row (top: ${childBoxes[i].top} vs ${firstY})`,
                ).toBeLessThan(5);
            }
        }
    });

    test("header does not overflow card width", async ({ page }) => {
        for (const space of COLOR_SPACES) {
            await switchColorSpace(page, space);

            // CardHeader is the div with class "fraunces" inside the card
            const cardHeader = page.locator(".fraunces").first();
            // Card is the ancestor with rounded-md
            const card = cardHeader.locator("xpath=ancestor::div[contains(@class, 'rounded')]").first();

            const headerBox = await cardHeader.boundingBox();
            const cardBox = await card.boundingBox();

            if (!headerBox || !cardBox) continue;

            expect(
                headerBox.x + headerBox.width,
                `header overflows card in ${space}`,
            ).toBeLessThanOrEqual(cardBox.x + cardBox.width + 1);
        }
    });

    test("component display stays single-row with extreme fuzz colors", async ({ page }) => {
        for (const color of FUZZ_COLORS) {
            for (const space of ["Lab", "OKLCh", "RGB"] as const) {
                await setColorViaUrl(page, color, space);

                const componentRow = page.locator(COMPONENT_ROW).first();
                await expect(componentRow).toBeVisible({ timeout: 3000 });

                const childBoxes = await componentRow.locator(":scope > div").evaluateAll(
                    (els) => els.map((el) => el.getBoundingClientRect()),
                );

                if (childBoxes.length < 2) continue;

                const firstY = childBoxes[0].top;
                for (let i = 1; i < childBoxes.length; i++) {
                    expect(
                        Math.abs(childBoxes[i].top - firstY),
                        `component ${i} wrapped in ${space} with color "${color}" (top: ${childBoxes[i].top} vs ${firstY})`,
                    ).toBeLessThan(5);
                }
            }
        }
    });

    test("component values render valid numbers for all spaces", async ({ page }) => {
        for (const space of COLOR_SPACES) {
            await switchColorSpace(page, space);

            const valueSpans = page.locator(VALUE_SPANS);
            const count = await valueSpans.count();

            // Kelvin has 1 component, all others have 3
            const minExpected = space === "Kelvin" ? 1 : 3;
            expect(count, `expected ${minExpected}+ editable values for ${space}, got ${count}`).toBeGreaterThanOrEqual(minExpected);

            for (let i = 0; i < count; i++) {
                const text = await valueSpans.nth(i).textContent();
                expect(text, `empty component text in ${space}`).toBeTruthy();
                const num = parseFloat(text!.trim());
                expect(
                    Number.isFinite(num),
                    `non-finite component "${text}" in ${space}`,
                ).toBe(true);
            }
        }
    });

    test("component display has correct aria labels per space", async ({ page }) => {
        // Keys from COLOR_SPACE_RANGES (lowercase, excluding alpha)
        const EXPECTED_LABELS: Record<string, string[]> = {
            RGB: ["r", "g", "b"],
            HSL: ["h", "s", "l"],
            HSV: ["h", "s", "v"],
            HWB: ["h", "w", "b"],
            Lab: ["l", "a", "b"],
            LCh: ["l", "c", "h"],
            OKLab: ["l", "a", "b"],
            OKLCh: ["l", "c", "h"],
            XYZ: ["x", "y", "z"],
            Kelvin: ["kelvin"],
        };

        for (const space of COLOR_SPACES) {
            await switchColorSpace(page, space);

            const expected = EXPECTED_LABELS[space];
            for (const label of expected) {
                const span = page.locator(
                    `[aria-label="${label} component value"]`,
                );
                await expect(
                    span,
                    `missing aria-label for "${label}" in ${space}`,
                ).toBeVisible({ timeout: 2000 });
            }
        }
    });
});
