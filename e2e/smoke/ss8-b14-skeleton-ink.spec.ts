import { test, expect, type Page } from "@playwright/test";
import { decodePng } from "./fixtures/frame-diff";

/**
 * SS-8 B14-card-grid-skeleton — the loading plate's ink holds a contrast floor.
 *
 *   · SS8-0408 (PCS U-1): glass-ui's `Skeleton` paints `--foreground` at
 *     `--ink-seam` (8 %) and reads no `--skeleton-glass-bg`, so the browse
 *     loading wall laid an 8 % block on an 8 % well — the plate's step was the
 *     atmosphere's to set (dark measured 1.048:1). The block and the well are
 *     sampled side by side in the meta row (one atmosphere under both), in both
 *     schemes, at both ends of the producer's breathe (opacity 1 and 0.55).
 *
 * The list request is held (never fulfilled inside the test) so the wall stays.
 */

const FLOOR = 1.1;

type Rgb = readonly [number, number, number];

const lum = ([r, g, b]: Rgb) => {
    const f = (c: number) => {
        c /= 255;
        return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};
const contrast = (a: Rgb, b: Rgb) => {
    const hi = Math.max(lum(a), lum(b));
    const lo = Math.min(lum(a), lum(b));
    return (hi + 0.05) / (lo + 0.05);
};

test.use({ viewport: { width: 1440, height: 900 } });
test.describe.configure({ timeout: 90_000 });

async function wall(page: Page) {
    await page.route(/\/palettes(\?|$)/, () => {
        /* held: the wall stays up */
    });
    await page.goto("/#/browse", { waitUntil: "domcontentloaded" });
    const plate = page.locator('[data-slot="palette-card-skeleton"]').first();
    await expect(plate).toBeVisible({ timeout: 60_000 });
    await page.waitForTimeout(800);
    return plate;
}

/** Block centre and the well 12px past the meta row's last block, same row. */
async function samplePair(page: Page, phase: number) {
    const pts = await page
        .locator('[data-slot="palette-card-skeleton"]')
        .first()
        .evaluate((root, t) => {
            // Only the producer's breathe (time-based); scroll timelines are left be.
            for (const a of root.getAnimations({ subtree: true })) {
                if (!(a as CSSAnimation).animationName?.startsWith("skeleton-breathe")) continue;
                a.pause();
                a.currentTime = t;
            }
            const meta = root.querySelector(":scope > div:nth-child(2)")!;
            const first = meta.firstElementChild!.getBoundingClientRect();
            const last = meta.lastElementChild!.getBoundingClientRect();
            const y = Math.round(first.y + first.height / 2);
            return {
                block: [Math.round(first.x + first.width / 2), y] as const,
                well: [Math.round(last.right + 12), y] as const,
            };
        }, phase);
    await page.waitForTimeout(100);
    const img = decodePng(await page.screenshot());
    const px = ([x, y]: readonly [number, number]): Rgb => {
        const i = (y * img.width + x) * img.channels;
        return [img.data[i] ?? 0, img.data[i + 1] ?? 0, img.data[i + 2] ?? 0];
    };
    return contrast(px(pts.block), px(pts.well));
}

for (const scheme of ["light", "dark"] as const) {
    test(`SS8-0408 · the loading plate's ink holds ${FLOOR}:1 over its well (${scheme})`, async ({
        page,
    }) => {
        await page.emulateMedia({ colorScheme: scheme });
        await wall(page);
        // 0 = the breathe's opacity-1 end; 1100 = its 0.55 end.
        const read = { peak: await samplePair(page, 0), trough: await samplePair(page, 1100) };
        console.log(`SS8-0408 ${scheme}`, JSON.stringify(read));
        expect(read.peak).toBeGreaterThanOrEqual(FLOOR);
        expect(read.trough).toBeGreaterThanOrEqual(FLOOR);
    });
}
