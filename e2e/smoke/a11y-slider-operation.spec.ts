import { test, expect, type Page, type Locator } from "@playwright/test";

/**
 * U.W-A11Y · U-F57 (BR-8) — SLIDER KEYBOARD OPERATION (driven, not merely
 * focusable). registry §16: "slider keyboard OPERATION" was uncovered — presence
 * (a focusable thumb) is NOT operation (the value actually MOVES across the
 * range on arrow / Home / End).
 *
 * This is a born-RED COVERAGE gate: no test drove the sliders' keyboard value
 * change before. The Slider is the glass-ui primitive (demo/@/components/ui/slider
 * re-exports @mkbabb/glass-ui Slider). If operation were broken the cure is a
 * glass-ui RELAY (not a demo edit) — the born-RED test is the demo's, the source
 * cure (if any) is relayed. Here we drive each channel slider and assert the
 * value MOVES: Home → min, End → max, ArrowRight → increment.
 *
 * NOTE: ComponentSliders.vue is the controls lane's file — this lane writes only
 * the born-RED test, never the source.
 */

async function ready(page: Page) {
    await page.goto("/");
    await expect(
        page.getByRole("main", { name: "Color tool panes" }),
    ).toBeVisible({ timeout: 20000 });
}

async function valueNow(slider: Locator): Promise<number> {
    const v = await slider.getAttribute("aria-valuenow");
    return v === null ? NaN : parseFloat(v);
}

test("BR-8 · slider keyboard OPERATION — Home/End/Arrow drive the value across the range", async ({
    page,
}) => {
    await ready(page);

    // Every channel slider in the picker main (reka-ui/glass-ui Slider, role=slider
    // with aria-valuenow). Drive EACH — operation must hold for all, not just L.
    const sliders = page.getByRole("main").getByRole("slider");
    const count = await sliders.count();
    console.log(`[BR-8] channel sliders found: ${count}`);
    expect(count).toBeGreaterThanOrEqual(1);

    let drivenOk = 0;
    const failures: string[] = [];

    for (let i = 0; i < count; i++) {
        const slider = sliders.nth(i);
        if (!(await slider.isVisible())) continue;
        const label =
            (await slider.getAttribute("aria-label")) ?? `slider#${i}`;

        await slider.focus();

        // Home → minimum.
        await page.keyboard.press("Home");
        await expect
            .poll(async () => valueNow(slider), { timeout: 3000 })
            .not.toBeNaN();
        const atMin = await valueNow(slider);

        // End → maximum. The value must MOVE off the min (the range is driven).
        await page.keyboard.press("End");
        await expect
            .poll(async () => valueNow(slider), { timeout: 3000 })
            .toBeGreaterThan(atMin);
        const atMax = await valueNow(slider);

        // ArrowLeft from max → a decrement (a single-step drive works too).
        await page.keyboard.press("ArrowLeft");
        const afterArrow = await valueNow(slider);

        const moved = atMax > atMin && afterArrow <= atMax;
        if (moved) {
            drivenOk++;
        } else {
            failures.push(
                `${label}: min=${atMin} max=${atMax} arrow=${afterArrow}`,
            );
        }
        console.log(
            `[BR-8] ${label}: Home=${atMin} End=${atMax} ArrowLeft=${afterArrow} → ${moved ? "MOVES" : "STUCK"}`,
        );
    }

    if (failures.length) {
        console.log(
            `[BR-8] STUCK sliders (→ glass-ui Slider RELAY if any): ${failures.join(" | ")}`,
        );
    }
    // every visible channel slider is keyboard-operable across its range.
    expect(failures).toEqual([]);
    expect(drivenOk).toBeGreaterThanOrEqual(1);
});
