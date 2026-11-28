/**
 * c60s · FIFTY-THIRD N — the colour-space pages, in the served page.
 *
 * Born red on master 561137225, where About had no road, no mixing figure
 * and no code (`[data-road]`, `[data-mix]`, `[data-code]` absent):
 *
 *   1 · every offered space shows its road (rendered formulas and stage
 *       numbers), its figure and its code, and the code prints answers;
 *   2 · the road follows the colour: the screen's bytes are the colour's;
 *   3 · the figure is interactive: a partner and a hue path change the strip
 *       and the code that draws it;
 *   4 · on a phone nothing scrolls the page sideways, and the read text keeps
 *       its floors (16 px lede, 14 px numbers and code).
 */
import { test, expect, type Locator, type Page } from "@playwright/test";
import { setupEnvNoise } from "./fixtures/env-noise";

test.describe.configure({ timeout: 180_000 });

async function about(page: Page, query: string): Promise<Locator> {
    await page.goto(`/#/?${query}`, { waitUntil: "domcontentloaded" });
    const card = page.locator(".about-card");
    await expect(card.locator("[data-space-facts]")).toBeVisible({ timeout: 60_000 });
    return card;
}

const SPACES = [
    "rgb", "hsl", "hsv", "hwb", "lab", "lch", "oklab", "oklch", "xyz", "kelvin",
    "srgb-linear", "display-p3", "a98-rgb", "prophoto-rgb", "rec2020", "ictcp", "jzazbz", "hex",
];

test("every offered space shows its road, its figure and its code", async ({ page }) => {
    setupEnvNoise(page);
    for (const space of SPACES) {
        const card = await about(page, `space=${space}`);
        await expect(card.locator("[data-space-facts]")).toHaveAttribute("data-space-facts", space);
        const road = card.locator(`[data-road][data-road-space="${space}"]`);
        await expect(road).toBeVisible();
        // The road's stages carry numbers; its steps render (KaTeX typesets
        // once the engine is in, whoever asked for it).
        await expect(road.locator(".road-values dd").first()).not.toBeEmpty();
        await road.scrollIntoViewIfNeeded();
        await expect(road.locator(".katex").first()).toBeVisible({ timeout: 20_000 });
        await expect(road.locator('[data-o18="graph-node"]').last()).toContainText(/XYZ|sRGB/);

        await expect(card.locator("[data-mix]")).toBeVisible();
        const code = card.locator("[data-code]");
        await expect(code.locator("[data-code-block]")).toHaveCount(3);
        await expect(code.locator('[data-code-block="make"] pre')).toContainText("// →");
        await expect(code.locator('[data-code-block="make"] pre')).toContainText('from "@mkbabb/value.js/color"');
        for (const button of await code.getByRole("button").all()) {
            await expect(button).toHaveAccessibleName(/^Copy the (code|CSS)$/);
        }
    }
});

// Written in OKLCh so the picker stays in OKLCh (a typed hex moves it to Hex);
// each spelling lands on the named colour's bytes exactly.
const BLUEVIOLET = "oklch(53.376% 0.25031 301.375)"; // #8a2be2
const BROWN = "oklch(48.061% 0.15966 25.562)"; // #a52a2a

test("the road follows the colour: its last stage is the colour's own bytes", async ({ page }) => {
    setupEnvNoise(page);
    const card = await about(page, `space=oklch&color=${encodeURIComponent(BLUEVIOLET)}`);
    const bytes = card.locator("[data-road] .road-row").last().locator(".road-values dd");
    await expect(bytes).toHaveText(["138", "43", "226"]);
    await expect(card.locator("[data-road-outside]")).toHaveCount(0);

    await page.goto(`/#/?space=oklch&color=${encodeURIComponent(BROWN)}`);
    await expect(bytes).toHaveText(["165", "42", "42"]);

    // A colour outside sRGB says so, and its bytes are clipped.
    await page.goto(`/#/?space=display-p3&color=${encodeURIComponent("color(display-p3 1 0 0)")}`);
    await expect(card.locator("[data-road-outside]")).toBeVisible();
    await expect(bytes).toHaveText(["255", "0", "0"]);
});

test("the mixing figure answers its controls, and the code follows", async ({ page }) => {
    setupEnvNoise(page);
    const card = await about(page, `space=oklch&color=${encodeURIComponent(BROWN)}`);
    const mix = card.locator("[data-mix]");
    const own = mix.locator('[data-mix-row="own"] .mix-cell');
    const cell = (i: number) => own.nth(i).evaluate((el) => getComputedStyle(el).backgroundColor);
    await mix.scrollIntoViewIfNeeded();

    await mix.getByRole("radio", { name: "Mix toward blue" }).or(mix.getByRole("button", { name: "Mix toward blue" })).click();
    await expect.poll(() => cell(28)).toBe("rgb(0, 0, 255)");
    await expect(card.locator('[data-code-block="mix"] pre')).toContainText("rgb(0, 0, 255)");

    const middle = await cell(14);
    await mix.getByRole("radio", { name: "Hue path: longer" }).or(mix.getByRole("button", { name: "Hue path: longer" })).click();
    await expect.poll(() => cell(14)).not.toBe(middle);
    await expect(card.locator('[data-code-block="mix"] pre')).toContainText('hue: "longer"');
    await expect(card.locator('[data-code-block="css"] pre')).toContainText("in oklch longer hue");
});

for (const space of ["oklch", "ictcp", "kelvin"]) {
    test(`a phone at 390: no sideways scroll, and the floors hold · ${space}`, async ({ browser }) => {
        const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
        try {
            const page = await ctx.newPage();
            setupEnvNoise(page);
            const card = await about(page, `space=${space}`);
            await card.locator("[data-code]").scrollIntoViewIfNeeded();
            await page.waitForTimeout(500);
            const r = await page.evaluate(() => {
                const px = (sel: string) =>
                    [...document.querySelectorAll<HTMLElement>(`.about-card ${sel}`)].map((el) => parseFloat(getComputedStyle(el).fontSize));
                return {
                    sideways: document.documentElement.scrollWidth - window.innerWidth,
                    lede: px("[data-fact=definition]"),
                    numbers: px(".road-values"),
                    code: px(".code-pre"),
                };
            });
            expect(r.sideways, "page scrolls sideways").toBeLessThanOrEqual(0);
            expect(Math.min(...r.lede)).toBeGreaterThanOrEqual(16);
            expect(Math.min(...r.numbers)).toBeGreaterThanOrEqual(14);
            expect(Math.min(...r.code)).toBeGreaterThanOrEqual(14);
        } finally {
            await ctx.close();
        }
    });
}
