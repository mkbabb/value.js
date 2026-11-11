import { test, expect, type Page } from "@playwright/test";

/**
 * SS-8 B26-extract-generate-panes — the live falsifiers for the two REFUTED
 * rows that kept a residual (packet
 * docs/tranches/X/execution/SS8/packets/B26-extract-generate-panes.md).
 *
 *   · R-2 (SS8-0741): Generate's seed line cleared 4.5:1 over its ground.
 *     Retired with its subject at o1109 canon V8: the seed is Regenerate's
 *     hover gloss, and o20 asserts no standing seed line is painted.
 *   · X-5 (SS8-0726): Add to palette in the eyedropper says what it did
 *     through a polite live region inside the modal, at phone width with touch.
 */

test.describe.configure({ timeout: 120_000 });

async function scheme(page: Page, dark: boolean) {
    await page.emulateMedia({ colorScheme: dark ? "dark" : "light" });
    await page.addInitScript((dark) => {
        try {
            localStorage.setItem("vueuse-color-scheme", dark ? "dark" : "light");
        } catch {
            /* storage may be unavailable; the media emulation still holds */
        }
    }, dark);
}

test.describe("X-5 · phone", () => {
    test.use({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });

    test("X-5 · Add to palette in the eyedropper is announced politely (390, touch)", async ({ page }) => {
        await scheme(page, false);
        await page.goto("/#/extract", { waitUntil: "domcontentloaded" });
        await expect(page.locator("text=Upload image").first()).toBeVisible({ timeout: 60_000 });
        const png = Buffer.from(
            await page.evaluate(() => {
                const c = document.createElement("canvas");
                c.width = 320;
                c.height = 240;
                const g = c.getContext("2d")!;
                ["#1e3a8a", "#e11d48", "#fde68a", "#16a34a"].forEach((col, i) => {
                    g.fillStyle = col;
                    g.fillRect((i % 2) * 160, Math.floor(i / 2) * 120, 160, 120);
                });
                return c.toDataURL("image/png").split(",")[1]!;
            }),
            "base64",
        );
        const [chooser] = await Promise.all([
            page.waitForEvent("filechooser", { timeout: 20_000 }),
            page.locator("text=Upload image").first().click(),
        ]);
        await chooser.setFiles({ name: "ss8-b26.png", mimeType: "image/png", buffer: png });
        await page.waitForFunction(() => /% of the image/.test(document.body.innerText), null, { timeout: 60_000 });
        await page.locator("text=Pick a color").first().tap();
        const dialog = page.getByRole("dialog", { name: "Eyedropper" });
        await expect(dialog).toBeVisible({ timeout: 20_000 });
        // SS-8.r X-5: the tap targets the image only once the eyedropper holds
        // it. The fixed 1.5 s sleep raced the image's decode and the fit's
        // transform transition: a tap on the default 300×150 canvas, or on a box
        // still tweening toward its fit, maps through the fitted pan/zoom to a
        // point off the image, `sampleAt` answers null, nothing pins, and the
        // "Add to palette" action never renders (CLOSE run2: element not found).
        // The stage is read once the canvas carries the bitmap (its backing is
        // the image's 320×240) and its box holds across consecutive frames.
        const stage = await dialog.evaluate(async (d) => {
            const frame = () => new Promise((r) => requestAnimationFrame(() => r(null)));
            const pick = () =>
                [...d.querySelectorAll("canvas")].find((c) => c.width === 320 && c.height === 240) ?? null;
            let last = "";
            for (let held = 0, n = 0; n < 1200; n++) {
                await frame();
                const c = pick();
                const b = c?.getBoundingClientRect();
                const k = b ? `${b.x},${b.y},${b.width},${b.height}` : "";
                held = k && k === last ? held + 1 : 0;
                last = k;
                if (held >= 10) return { x: b!.x, y: b!.y, w: b!.width, h: b!.height };
            }
            return null;
        });
        expect(stage, "the eyedropper holds the image, fitted and settled").not.toBeNull();
        await page.touchscreen.tap(stage!.x + stage!.w * 0.75, stage!.y + stage!.h * 0.25);
        const add = dialog.locator('[title="Add to palette"]').first();
        await expect(add).toBeVisible({ timeout: 10_000 });
        await add.tap();
        // The region lives inside the modal (the page behind is aria-hidden).
        const status = dialog.locator('[role="status"][aria-live="polite"]');
        await expect(status).toHaveText(/added to palette/i, { timeout: 2_000 });
        // A repeat Add of the same colour is announced again (cleared, rewritten).
        await add.tap();
        await expect(status).toHaveText(/added to palette/i, { timeout: 2_000 });
    });
});
