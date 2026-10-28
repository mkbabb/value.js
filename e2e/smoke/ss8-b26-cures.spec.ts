import { test, expect, type Page } from "@playwright/test";
import { decodePng } from "./fixtures/frame-diff";

/**
 * SS-8 B26-extract-generate-panes — the live falsifiers for the two REFUTED
 * rows that kept a residual (packet
 * docs/tranches/X/execution/SS8/packets/B26-extract-generate-panes.md).
 *
 *   · R-2 (SS8-0741): Generate's seed line (the plate's bench note) clears
 *     4.5:1 over the ground it is painted on, both schemes. The witness read
 *     4.08:1 light.
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

const lin = (v: number) => {
    const s = v / 255;
    return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
};
const lum = ([r, g, b]: number[]) => 0.2126 * lin(r!) + 0.7152 * lin(g!) + 0.0722 * lin(b!);
const ratio = (a: number[], b: number[]) => {
    const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
    return (x! + 0.05) / (y! + 0.05);
};

for (const dark of [false, true]) {
    test(`R-2 · the seed line clears 4.5:1 over its painted ground (1440, ${dark ? "dark" : "light"})`, async ({ page }) => {
        await page.setViewportSize({ width: 1440, height: 900 });
        await scheme(page, dark);
        await page.goto("/#/generate", { waitUntil: "domcontentloaded" });
        const seed = page.locator("[data-generate-plate] p", { hasText: /^\s*seed:/ });
        await expect(seed).toBeVisible({ timeout: 60_000 });
        await page.waitForTimeout(2500);
        // The ink as computed, then the ground with the ink hidden (the text's
        // own run box, so the reading is the pixels the glyphs sit on).
        const geo = await seed.evaluate((el) => {
            const range = document.createRange();
            range.selectNodeContents(el);
            const b = range.getBoundingClientRect();
            const cv = document.createElement("canvas").getContext("2d")!;
            cv.fillStyle = getComputedStyle(el).color;
            cv.fillRect(0, 0, 1, 1);
            const d = cv.getImageData(0, 0, 1, 1).data;
            (el as HTMLElement).style.setProperty("color", "transparent", "important");
            return { x: b.left, y: b.top, w: b.width, h: b.height, ink: [d[0]!, d[1]!, d[2]!, d[3]! / 255] };
        });
        const img = decodePng(await page.screenshot());
        await seed.evaluate((el) => (el as HTMLElement).style.removeProperty("color"));
        let [sr, sg, sb] = [0, 0, 0];
        let n = 0;
        for (let y = Math.ceil(geo.y); y < Math.floor(geo.y + geo.h); y++) {
            for (let x = Math.ceil(geo.x); x < Math.floor(geo.x + geo.w); x++) {
                const i = (y * img.width + x) * img.channels;
                sr += img.data[i]!;
                sg += img.data[i + 1]!;
                sb += img.data[i + 2]!;
                n++;
            }
        }
        const ground = [sr / n, sg / n, sb / n];
        const [r, g, b, a] = geo.ink as [number, number, number, number];
        const ink = [r * a + ground[0]! * (1 - a), g * a + ground[1]! * (1 - a), b * a + ground[2]! * (1 - a)];
        const reading = { ink: ink.map(Math.round), ground: ground.map(Math.round), ratio: +ratio(ink, ground).toFixed(2) };
        expect(reading.ratio, JSON.stringify(reading)).toBeGreaterThanOrEqual(4.5);
    });
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
        await page.waitForTimeout(1500);
        const stage = await dialog.evaluate((d) => {
            const c = [...d.querySelectorAll("canvas,img")]
                .map((e) => e.getBoundingClientRect())
                .sort((a, b) => b.width * b.height - a.width * a.height)[0]!;
            return { x: c.x, y: c.y, w: c.width, h: c.height };
        });
        await page.touchscreen.tap(stage.x + stage.w * 0.75, stage.y + stage.h * 0.25);
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
