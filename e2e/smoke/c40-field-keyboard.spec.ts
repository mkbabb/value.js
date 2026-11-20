import { test, expect, type Locator } from "@playwright/test";

/**
 * The colour field is reachable by the keyboard: it takes focus, the arrows
 * move saturation (left, right) and value (up, down) by one percent, Shift by
 * ten, the label speaks both values, and the page does not scroll under the
 * keys. Before, the field took no focus, so a keyboard could not set a colour
 * by saturation and value at all.
 */

test.beforeEach(({}, testInfo) => {
    testInfo.setTimeout(120_000);
});

async function reading(field: Locator): Promise<{ s: number; v: number }> {
    const label = (await field.getAttribute("aria-label")) ?? "";
    const m = /saturation (\d+)%, lightness (\d+)%/.exec(label);
    expect(m, `the field's label speaks both values: "${label}"`).not.toBeNull();
    return { s: Number(m![1]), v: Number(m![2]) };
}

test("the arrows move the colour field by 1, Shift by 10", async ({ page }) => {
    await page.goto("/", { waitUntil: "load" });
    const field = page.locator(".spectrum-picker").first();
    await field.waitFor({ state: "visible", timeout: 60_000 });
    await page.waitForTimeout(1200);

    expect(await field.evaluate((el) => (el as HTMLElement).tabIndex), "the field is in the tab order").toBe(0);
    await page.keyboard.press("Shift");
    await field.focus();
    await expect(field).toBeFocused();

    const scroll0 = await page.evaluate(() => scrollY);
    const start = await reading(field);

    await page.keyboard.press("Shift+ArrowDown");
    await page.keyboard.press("ArrowLeft");
    const a = await reading(field);
    expect(a, "Shift+Down takes 10 from value, Left takes 1 from saturation").toEqual({
        s: Math.max(0, start.s - 1),
        v: Math.max(0, start.v - 10),
    });

    await page.keyboard.press("Shift+ArrowRight");
    await page.keyboard.press("ArrowUp");
    const b = await reading(field);
    expect(b, "Shift+Right adds 10 to saturation, Up adds 1 to value").toEqual({
        s: Math.min(100, a.s + 10),
        v: Math.min(100, a.v + 1),
    });

    for (let i = 0; i < 12; i++) await page.keyboard.press("Shift+ArrowUp");
    expect((await reading(field)).v, "value stops at 100").toBe(100);

    expect(await page.evaluate(() => scrollY), "the keys never scroll the page").toBe(scroll0);

    await page.waitForTimeout(300);
    const ring = await field.evaluate((el) => getComputedStyle(el).boxShadow);
    expect(ring, "keyboard focus shows glass's ring").not.toBe("none");
});
