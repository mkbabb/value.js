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
