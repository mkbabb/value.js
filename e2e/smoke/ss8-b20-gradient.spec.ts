import { test, expect, type Page } from "@playwright/test";
import { decodePng } from "./fixtures/frame-diff";

/**
 * SS-8 B20-gradient-visualizer — the live falsifiers for the REFUTED layout
 * and ink rows (packet docs/tranches/X/execution/SS8/packets/B20-gradient-visualizer-code.md).
 *
 *   · R-1 (SS8-0577): each section heading's ink clears 4.5:1 over the ground
 *     painted just past its text run (the aurora field), both schemes.
 *   · R-6 (SS8-0582): at phone width the interpolation band stacks; no trigger's
 *     value is clipped, overlaps the render tile, or runs off the right edge
 *     (UIA-V-44 + V7C-01).
 *   · R-15 (SS8-0591), phone limb: the render tile is a near-square beside the
 *     Direction row (V7C-01). The desktop limb (no aspect-ratio) is GV-19's
 *     frame, routed to X-W6.b, and is not asserted here.
 */

test.describe.configure({ timeout: 90_000 });

async function openGradient(page: Page, dark = false) {
    await page.emulateMedia({ colorScheme: dark ? "dark" : "light" });
    await page.addInitScript((dark) => {
        try {
            localStorage.setItem("vueuse-color-scheme", dark ? "dark" : "light");
        } catch {
            /* storage may be unavailable; the media emulation still holds */
        }
    }, dark);
    await page.goto("/#/gradient", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("textbox", { name: "Gradient CSS" }).last()).toBeVisible({ timeout: 60_000 });
    await page.waitForTimeout(1500);
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
    test(`R-1 · section headings clear 4.5:1 over the live ground (1440, ${dark ? "dark" : "light"})`, async ({ page }) => {
        await page.setViewportSize({ width: 1440, height: 900 });
        await openGradient(page, dark);
        const readings: { text: string; ratio: number }[] = [];
        for (const text of ["Stops", "Interpolation", "Easing", "CSS"]) {
            const head = page.getByRole("heading", { level: 3, name: text, exact: true }).last();
            await head.scrollIntoViewIfNeeded();
            await page.waitForTimeout(300);
            const geo = await head.evaluate((el) => {
                const range = document.createRange();
                range.selectNodeContents(el);
                const b = range.getBoundingClientRect();
                const y = Math.round(b.top + b.height / 2);
                const cv = document.createElement("canvas").getContext("2d")!;
                cv.fillStyle = getComputedStyle(el).color;
                cv.fillRect(0, 0, 1, 1);
                const d = cv.getImageData(0, 0, 1, 1).data;
                return { pts: [[Math.round(b.right + 16), y], [Math.round(b.right + 40), y]], ink: [d[0], d[1], d[2], d[3]! / 255] };
            });
            const img = decodePng(await page.screenshot());
            const [r, g, b, a] = geo.ink as [number, number, number, number];
            for (const [x, y] of geo.pts as [number, number][]) {
                const i = (y * img.width + x) * img.channels;
                const ground = [img.data[i]!, img.data[i + 1]!, img.data[i + 2]!];
                const ink = [r * a + ground[0]! * (1 - a), g * a + ground[1]! * (1 - a), b * a + ground[2]! * (1 - a)];
                readings.push({ text, ratio: +ratio(ink, ground).toFixed(2) });
            }
        }
        const worst = readings.reduce((m, r) => (r.ratio < m.ratio ? r : m));
        expect(worst.ratio, JSON.stringify(readings)).toBeGreaterThanOrEqual(4.5);
    });
}

for (const width of [390, 320]) {
    test(`R-6 + R-15 · the interpolation band stacks unclipped and the tile is near-square (${width})`, async ({ page }) => {
        await page.setViewportSize({ width, height: 844 });
        await openGradient(page);
        const m = await page.evaluate(() => {
            const tile = document.querySelector('[data-testid="gradient-render-tile"]')!.getBoundingClientRect();
            const triggers = [...document.querySelectorAll<HTMLElement>('main button[role="combobox"]')].filter(
                (t) => !/Gradient/.test(t.textContent ?? ""),
            );
            return {
                vw: innerWidth,
                aspect: tile.width / tile.height,
                triggers: triggers.map((t) => {
                    const r = t.getBoundingClientRect();
                    const val = t.querySelector("span") ?? t;
                    return {
                        text: (t.textContent ?? "").trim(),
                        left: Math.round(r.left),
                        top: Math.round(r.top),
                        clipped: val.scrollWidth > val.clientWidth,
                        overlapsTile: !(r.right <= tile.left || r.left >= tile.right || r.bottom <= tile.top || r.top >= tile.bottom),
                        offRight: r.right > innerWidth,
                    };
                }),
            };
        });
        expect(m.triggers.length, JSON.stringify(m)).toBeGreaterThanOrEqual(3);
        // Below sm the band is ONE column: every field starts at the same x, each on its own row.
        expect(new Set(m.triggers.map((t) => t.left)).size, JSON.stringify(m)).toBe(1);
        expect(new Set(m.triggers.map((t) => t.top)).size, JSON.stringify(m)).toBe(m.triggers.length);
        for (const t of m.triggers) {
            expect(t, JSON.stringify(t)).toMatchObject({ clipped: false, overlapsTile: false, offRight: false });
        }
        expect(m.aspect).toBeGreaterThan(0.8);
        expect(m.aspect).toBeLessThan(1.25);
    });
}
