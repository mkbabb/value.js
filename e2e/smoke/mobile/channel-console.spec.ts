import { test, expect } from "@playwright/test";

/**
 * The picker's channel console on a phone. The rail's tabs and the sliders
 * were both named "L channel" (and C, h, alpha), so a screen reader heard
 * two controls with one name that do different things. The slider keeps its
 * name; the tab is named for what it does, bringing its slider into view.
 */

test.use({ viewport: { width: 390, height: 844 } });
test.beforeEach(({}, testInfo) => {
    testInfo.setTimeout(120_000);
});

test("the rail's tabs and the channel sliders have different names", async ({ page }) => {
    await page.goto("/", { waitUntil: "load" });
    const rail = page.getByRole("tablist", { name: "Color channels" }).first();
    await rail.waitFor({ state: "visible", timeout: 60_000 });
    await page.waitForTimeout(1000);
    const names = await page.evaluate(() => {
        const label = (el: Element) => el.getAttribute("aria-label") ?? "";
        return {
            tabs: [...document.querySelectorAll('[aria-label="Color channels"] [role="tab"]')].map(label),
            sliders: [...document.querySelectorAll('.channel-slider [role="slider"]')].map(label),
        };
    });
    expect(names.sliders).toEqual(["L channel", "C channel", "H channel", "ALPHA channel"]);
    expect(names.tabs).toHaveLength(names.sliders.length);
    const lower = new Set(names.sliders.map((n) => n.toLowerCase()));
    expect(names.tabs.filter((n) => lower.has(n.toLowerCase())), "a tab named like a slider").toEqual([]);
    expect(new Set(names.tabs).size, "every tab has its own name").toBe(names.tabs.length);
});

test("the figures at the sliders' ends are 14 px or more", async ({ page }) => {
    await page.goto("/", { waitUntil: "load" });
    const meter = page.locator(".channel-meter").first();
    await meter.waitFor({ state: "visible", timeout: 60_000 });
    const sizes = await page.evaluate(() =>
        [...document.querySelectorAll(".channel-meter")].map((el) => parseFloat(getComputedStyle(el).fontSize)),
    );
    expect(sizes.length).toBeGreaterThanOrEqual(4);
    for (const size of sizes) expect(size, `a channel figure at ${size} px`).toBeGreaterThanOrEqual(13.95);
});

/**
 * The channel rails' touch targets on a phone (coarse pointer). Each rail
 * answers a touch 23 px either side of its centre (glass's
 * `--slider-touch-target`, 2.875rem), the targets of two neighbouring rails
 * never overlap and leave no seam a touch can fall in, and the rows keep their
 * pitch: the seat gives the target's extra back as block margin, figured from
 * the rail's band (a value the site owns, never glass's internal
 * `--slider-track-height`), so each slider still takes exactly its rail's
 * height in the row.
 */
test("the channel rails' touch targets meet and keep the rows' pitch", async ({ page }) => {
    await page.goto("/", { waitUntil: "load" });
    await page.locator(".channel-slider").first().waitFor({ state: "visible", timeout: 60_000 });
    await page.waitForTimeout(1000);
    const m = await page.evaluate(() => ({
        coarse: matchMedia("(pointer: coarse)").matches,
        rails: [...document.querySelectorAll<HTMLElement>(".channel-slider-seat .channel-slider")].map((el) => {
            const box = el.getBoundingClientRect();
            const track = el.querySelector(".slider-track")!.getBoundingClientRect();
            const cs = getComputedStyle(el);
            return {
                top: box.top,
                bottom: box.bottom,
                height: box.height,
                centre: box.top + box.height / 2,
                rail: track.top + track.height / 2,
                railHeight: track.height,
                taken: box.height + parseFloat(cs.marginTop) + parseFloat(cs.marginBottom),
            };
        }),
    }));
    expect(m.coarse, "the phone project is a coarse pointer").toBe(true);
    expect(m.rails, JSON.stringify(m)).toHaveLength(4);
    for (const r of m.rails) {
        expect(r.height, `a target of ${r.height} px`).toBeCloseTo(46, 0);
        expect(Math.abs(r.centre - r.rail), `the target centred ${r.centre - r.rail} px off its rail`).toBeLessThanOrEqual(0.5);
        expect(Math.abs(r.taken - r.railHeight), `the slider takes ${r.taken} px of its row for a ${r.railHeight} px rail`).toBeLessThanOrEqual(0.5);
    }
    for (let i = 1; i < m.rails.length; i++) {
        const seam = m.rails[i]!.top - m.rails[i - 1]!.bottom;
        expect(seam, `rails ${i - 1} and ${i}: ${seam} px between their targets`).toBeGreaterThanOrEqual(-0.5);
        expect(seam, `rails ${i - 1} and ${i}: ${seam} px between their targets`).toBeLessThanOrEqual(1.5);
    }
});
