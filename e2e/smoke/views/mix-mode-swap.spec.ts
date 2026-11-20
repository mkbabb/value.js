import { test, expect, type Page } from "@playwright/test";
import { mainPane } from "../fixtures/dock";

/**
 * The Mix pane's Colors to Palettes switch tweens the pane instead of jumping
 * it (critique M-01, with M-02, M-03 and M-04 in the same pane).
 *
 * Before: at the first frame the "Size mismatch" row was whole and pushed the
 * Mix verb down 76 px in one frame; then the Colors panel faded out, left a
 * hole, and the hole closed in one frame (74 px). "Size mismatch" showed with
 * no palette chosen, the verb sat dim with no reason, and a "Selected" title
 * headed one dashed slot.
 */

/** The Mix verb's top edge on every painted frame for `ms` after `act`. */
async function verbTrack(page: Page, act: () => Promise<void>, ms = 900): Promise<number[]> {
    await page.evaluate((ms) => {
        const w = window as unknown as { __track: Promise<number[]> };
        w.__track = new Promise((resolve) => {
            const out: number[] = [];
            const t0 = performance.now();
            const verb = () =>
                document.querySelector<HTMLElement>('main [data-testid="mix-verb"]') ?? undefined;
            const step = (t: number) => {
                const el = verb();
                if (el) out.push(el.getBoundingClientRect().top);
                if (t - t0 < ms) requestAnimationFrame(step);
                else resolve(out);
            };
            requestAnimationFrame(step);
        });
    }, ms);
    await act();
    return page.evaluate(() => (window as unknown as { __track: Promise<number[]> }).__track);
}

test("Colors to Palettes eases the verb; no size row without palettes; the verb says what it needs", async ({
    page,
}) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/#/mix");
    const main = mainPane(page);
    await expect(main.getByRole("tab", { name: "Palettes" })).toBeVisible({ timeout: 60_000 });
    await page.waitForTimeout(800);

    // M-03: no "Selected" title over the slot; the slot carries the colour.
    await expect(main.getByRole("heading", { name: "Selected", exact: true })).toHaveCount(0);
    await expect(main.locator(".add-slot-ghost .add-slot-fill")).toBeVisible();
    // M-02: while it cannot act, the verb says what it needs.
    await expect(main.getByRole("button", { name: "Add two colors", exact: true })).toBeDisabled();

    const track = await verbTrack(page, () => main.getByRole("tab", { name: "Palettes" }).click());
    const from = track[0]!;
    const to = track[track.length - 1]!;
    const [lo, hi] = [Math.min(from, to), Math.max(from, to)];
    // The verb moves (the Colors panel leaves), and it travels straight from
    // its place to its new one: no frame outside that span (the size row used
    // to push it 76 px down and back), and at least one frame inside it (a
    // tween; a cut has none). Read on frames, not on a frame count, so a slow
    // machine's sparse frames do not decide it.
    expect(hi - lo, JSON.stringify(track)).toBeGreaterThan(8);
    for (const y of track) {
        expect(y, JSON.stringify(track)).toBeGreaterThanOrEqual(lo - 1);
        expect(y, JSON.stringify(track)).toBeLessThanOrEqual(hi + 1);
    }
    expect(
        track.filter((y) => y > lo + 1 && y < hi - 1).length,
        JSON.stringify(track),
    ).toBeGreaterThanOrEqual(1);

    // M-04: with no palettes chosen the leftover rule has nothing to say, so
    // the verb sits right under the interpolation fields.
    const verb = main.getByRole("button", { name: "Pick two palettes", exact: true });
    await expect(verb).toBeDisabled();
    const fields = (await main.getByRole("combobox", { name: "Hue method", exact: true }).boundingBox())!;
    const verbBox = (await verb.boundingBox())!;
    expect(verbBox.y - (fields.y + fields.height)).toBeLessThan(24);
});
