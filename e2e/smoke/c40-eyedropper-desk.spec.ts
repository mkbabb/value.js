import { test, expect } from "@playwright/test";
import { loadExtractImage, LANDSCAPE, PORTRAIT } from "./fixtures/extract-image";

/**
 * Pick a colour on a desk (color-40 N-6, N-7): the dialog is the photo's size,
 * with no band of empty glass beside the photo (production showed 257 px on
 * each side at 1440); a mouse hovers to sample and clicks to hold; "Use color"
 * and "Add to palette" stand labelled at the bar's end, quiet until a pick is
 * held.
 */

test.use({ viewport: { width: 1440, height: 900 } });
test.beforeEach(({}, testInfo) => {
    testInfo.setTimeout(180_000);
});

for (const photo of [LANDSCAPE, PORTRAIT]) {
    test(`a ${photo.width}x${photo.height} photo: no side band; hover samples, a click holds, the acts wake`, async ({
        page,
    }) => {
        await loadExtractImage(page, photo);
        await page.locator("[data-zone-affordance]").first().click();
        const dialog = page.getByRole("dialog", { name: "Eyedropper" });
        await expect(dialog).toBeVisible({ timeout: 20_000 });
        // The photo is read once it is fitted: its canvas carries the bitmap
        // and the drawn box has held still for ten frames (the dialog opens on
        // a scale and the fit eases in).
        const fitted = await dialog.evaluate(async (d, size) => {
            const frame = () => new Promise((r) => requestAnimationFrame(() => r(null)));
            let last = "";
            for (let held = 0, n = 0; n < 1200; n++) {
                await frame();
                const c = d.querySelector<HTMLCanvasElement>(".eyedropper-canvas");
                const b = c && c.width === size.w && c.height === size.h ? c.getBoundingClientRect() : null;
                const k = b ? `${b.x},${b.y},${b.width},${b.height},${d.getBoundingClientRect().width}` : "";
                held = k && k === last ? held + 1 : 0;
                last = k;
                if (held >= 10) return true;
            }
            return false;
        }, { w: photo.width, h: photo.height });
        expect(fitted, "the photo is fitted and still").toBe(true);

        const bands = await dialog.evaluate((d) => {
            const box = d.getBoundingClientRect();
            const stage = d.querySelector(".eyedropper-stage")!.getBoundingClientRect();
            const canvas = d.querySelector(".eyedropper-canvas")!.getBoundingClientRect();
            return {
                left: canvas.left - box.left,
                right: box.right - canvas.right,
                above: canvas.top - stage.top,
                below: stage.bottom - canvas.bottom,
            };
        });
        for (const [side, px] of Object.entries(bands)) {
            expect(Math.abs(px), `${side} band ${px} px`).toBeLessThanOrEqual(2);
        }

        const add = dialog.getByRole("button", { name: "Add to palette" });
        const use = dialog.getByRole("button", { name: "Use color" });
        await expect(add).toBeDisabled();
        await expect(use).toBeDisabled();
        // Both stand in the bar on a desk.
        expect(await add.evaluate((el) => !!el.closest(".eyedropper-bar"))).toBe(true);

        const stage = (await dialog.locator(".eyedropper-stage").boundingBox())!;
        await page.mouse.move(stage.x + stage.width * 0.25, stage.y + stage.height * 0.25);
        await expect(dialog.locator("[data-eyedropper-lens]")).toHaveAttribute("data-state", "on");
        const hovered = (await dialog.locator("[data-eyedropper-readout]").textContent())?.trim();
        expect(hovered).not.toMatch(/to sample/);
        await page.mouse.click(stage.x + stage.width * 0.75, stage.y + stage.height * 0.75);
        await expect(dialog.locator(".pick-ring")).toHaveAttribute("data-state", "on");
        await expect(add).toBeEnabled();
        await expect(use).toBeEnabled();
    });
}
