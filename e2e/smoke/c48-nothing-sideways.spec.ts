import { test, expect, type Page } from "@playwright/test";

/**
 * His FORTY-SEVENTH order: nothing scrolls sideways. Two rows of the sideways
 * census (23 Nov) are the site's own.
 *
 *   C-1 · Gradient > Interpolation at 844x390. The pane's column is 243 px
 *         there, and the band set its three fields side by side by the
 *         viewport's width (`sm`), 73 px each: every select trigger (which
 *         cannot shrink below its value) ran 15 to 26 px into its neighbour or
 *         past the render tile. The band now lays itself out by its own width.
 *         Asserted, with the widest value the selects offer ("Decreasing")
 *         chosen: no trigger overlaps another trigger or the tile, none runs
 *         past the band, and none clips its value, at 844x390 and at 1440
 *         (where the three still sit side by side in one row).
 *   Latent · the picker's scroll host computed `overflow-x: auto` (glass's
 *         `.card-scroll-host` sets only y), so one pixel of content wider than
 *         the plate would pan it sideways under a thumb. Asserted: x is
 *         hidden at 390, 844x390 and 1440.
 */

test.describe.configure({ timeout: 90_000 });

async function open(page: Page, hash: string, ready: () => Promise<void>) {
    await page.goto(`/${hash}`, { waitUntil: "domcontentloaded" });
    await ready();
    await page.waitForTimeout(1500);
}

const BANDS = [
    { width: 844, height: 390, sideBySide: false },
    { width: 1440, height: 900, sideBySide: true },
] as const;

for (const { width, height, sideBySide } of BANDS) {
    test(`C-1 · the interpolation fields hold their values without overlap (${width}x${height})`, async ({ page }) => {
        await page.setViewportSize({ width, height });
        await open(page, "#/gradient", () =>
            expect(page.getByRole("textbox", { name: "Gradient CSS" }).last()).toBeVisible({ timeout: 60_000 }),
        );
        // The widest value any of the three selects offers ("Decreasing"),
        // so the wide layout is read at its hardest.
        await page.getByRole("combobox", { name: "Hue method" }).last().click();
        await page.getByRole("option", { name: /^Decreasing/ }).click();
        await page.waitForTimeout(800);
        const m = await page.evaluate(() => {
            const tileEl = document.querySelector<HTMLElement>('[data-testid="gradient-render-tile"]')!;
            const band = tileEl.parentElement!.getBoundingClientRect();
            const tile = tileEl.getBoundingClientRect();
            const triggers = [...tileEl.parentElement!.querySelectorAll<HTMLElement>('button[role="combobox"]')];
            const box = (r: DOMRect) => ({ left: r.left, right: r.right, top: r.top, bottom: r.bottom });
            return {
                band: box(band),
                tile: box(tile),
                triggers: triggers.map((t) => {
                    const val = t.querySelector<HTMLElement>("[data-slot='select-value'], span") ?? t;
                    return {
                        text: (t.textContent ?? "").trim(),
                        ...box(t.getBoundingClientRect()),
                        clipped: val.scrollWidth > val.clientWidth + 0.5,
                    };
                }),
            };
        });
        const overlap = (a: { left: number; right: number; top: number; bottom: number }, b: typeof a) =>
            Math.min(a.right, b.right) - Math.max(a.left, b.left) > 0.5 &&
            Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) > 0.5;
        expect(m.triggers.length, JSON.stringify(m)).toBe(3);
        for (const [i, t] of m.triggers.entries()) {
            expect(t.clipped, `${t.text}: its value is clipped`).toBe(false);
            expect(t.right, `${t.text} runs ${(t.right - m.band.right).toFixed(1)} px past the band`).toBeLessThanOrEqual(m.band.right + 0.5);
            expect(overlap(t, m.tile), `${t.text} overlaps the render tile`).toBe(false);
            for (const u of m.triggers.slice(i + 1)) {
                expect(overlap(t, u), `${t.text} overlaps ${u.text}: ${JSON.stringify([t, u])}`).toBe(false);
            }
        }
        const rows = new Set(m.triggers.map((t) => Math.round(t.top))).size;
        expect(rows, `the fields sit in ${rows} rows`).toBe(sideBySide ? 1 : 3);
    });
}

for (const [width, height] of [[390, 844], [844, 390], [1440, 900]] as const) {
    test(`the picker's scroll host never pans sideways (${width}x${height})`, async ({ page }) => {
        await page.setViewportSize({ width, height });
        await open(page, "", () => expect(page.locator(".picker-scroll-host").first()).toBeVisible({ timeout: 60_000 }));
        const m = await page.locator(".picker-scroll-host").first().evaluate((el) => {
            const cs = getComputedStyle(el);
            return { x: cs.overflowX, y: cs.overflowY, sw: el.scrollWidth, cw: el.clientWidth };
        });
        expect(m.x, JSON.stringify(m)).toBe("hidden");
        expect(m.y, JSON.stringify(m)).toBe("auto");
    });
}
