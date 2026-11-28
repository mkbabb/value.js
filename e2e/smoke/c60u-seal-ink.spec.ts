import { test, expect } from "@playwright/test";
import { dockAtRest } from "./fixtures/dock";

/**
 * O60 A (the owner, 23 Nov, on the collapsed dock's seal, the live colour as a
 * pink wax with the Palettes glyph drawn in black): "should be white in
 * darkmode". In dark mode the seal inks its glyph light, as every other glyph
 * in the dark dock is, on the default pink. (Below 1024 px the dock never
 * collapses, so the seal is read on a desk.)
 */
test.use({ colorScheme: "dark" });

test("dark: the collapsed dock's seal inks its glyph light on the default pink", async ({ page }) => {
    await page.addInitScript(() => {
        try {
            localStorage.setItem("vueuse-color-scheme", "dark");
        } catch {}
    });
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/#/palettes", { waitUntil: "load", timeout: 60_000 });
    await page.locator(".glass-dock").first().waitFor({ timeout: 30_000 });
    await dockAtRest(page);
    await page.mouse.move(5, 890);
    await expect(page.locator(".glass-dock.collapsed")).toHaveCount(1, { timeout: 20_000 });
    await dockAtRest(page);
    const seal = page.locator(".dock-seal").first();
    await expect(seal).toBeVisible();
    // the ink turns on the effects clock; read it at rest, painted (the
    // computed ink may serialise as oklch())
    await expect
        .poll(
            () =>
                seal.evaluate((el) => {
                    const ctx = document.createElement("canvas").getContext("2d")!;
                    ctx.fillStyle = getComputedStyle(el).color;
                    ctx.fillRect(0, 0, 1, 1);
                    const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
                    return Math.min(r!, g!, b!);
                }),
            { timeout: 10_000 },
        )
        .toBeGreaterThanOrEqual(240);
});
