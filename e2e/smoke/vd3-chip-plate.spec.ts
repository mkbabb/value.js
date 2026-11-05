// SERVED MODEL: claude-opus-5-5
/**
 * V-D3 (X realization, value-DESIGN) — the chip plate is φ² of its OWN em,
 * and it survives forced colours.
 *
 *   · BC-R-4: every preview chip's border box is 2.618 ± 0.01 wide per unit
 *     height at a 12, 16 and 24 px chip font (a root-em width held φ² only at
 *     16 px);
 *   · BC-R-6: under `forced-colors: active` the chip keeps its specimen paint
 *     (`forced-color-adjust: none`, and the ramp's `background-image` is not
 *     `none`), joining the shared `[data-color-surface]` rule.
 */
import { test, expect, type Page } from "@playwright/test";

test.describe.configure({ timeout: 120_000 });

async function openSpaceMenu(page: Page) {
    await page.goto("/#/gradient", { waitUntil: "domcontentloaded" });
    await page.waitForSelector(".glass-dock", { timeout: 60_000 });
    const trigger = page.getByRole("combobox", { name: "Color space", exact: true }).first();
    await trigger.scrollIntoViewIfNeeded();
    await trigger.click();
    await expect(page.getByRole("listbox")).toBeVisible();
    await page.mouse.move(2, 2);
    await page.waitForTimeout(500);
    return page.getByRole("listbox").locator(".preview-chip");
}

test("BC-R-4 · the chip plate is φ² × its own em at 12 / 16 / 24 px", async ({ browser }) => {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    try {
        const page = await ctx.newPage();
        const chips = await openSpaceMenu(page);
        expect(await chips.count(), "ramp chips render").toBeGreaterThan(0);
        for (const size of [12, 16, 24]) {
            const r = await chips.first().evaluate((el, size) => {
                const e = el as HTMLElement;
                e.style.fontSize = `${size}px`;
                // Layout size (border box), never the transformed box: the
                // menu's open motion scales its content.
                const cs = getComputedStyle(e);
                return { w: parseFloat(cs.width), h: parseFloat(cs.height) };
            }, size);
            test.info().annotations.push({ type: "reading", description: `${size}px ${r.w}×${r.h}` });
            expect(r.h, `${size}px block = 1em`).toBeCloseTo(size, 0);
            expect(r.w / r.h, `${size}px plate`).toBeGreaterThanOrEqual(2.618 - 0.01);
            expect(r.w / r.h, `${size}px plate`).toBeLessThanOrEqual(2.618 + 0.01);
        }
    } finally {
        await ctx.close();
    }
});

test("BC-R-6 · forced colours keep the chip's specimen paint", async ({ browser }) => {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, forcedColors: "active" });
    try {
        const page = await ctx.newPage();
        const chips = await openSpaceMenu(page);
        const n = await chips.count();
        expect(n, "ramp chips render").toBeGreaterThan(0);
        for (let i = 0; i < n; i++) {
            const r = await chips.nth(i).evaluate((el) => {
                const cs = getComputedStyle(el);
                return { adjust: cs.forcedColorAdjust, image: cs.backgroundImage, surface: el.hasAttribute("data-color-surface") };
            });
            expect(r.surface, `chip ${i} declares a colour surface`).toBe(true);
            expect(r.adjust, `chip ${i} forced-color-adjust`).toBe("none");
            expect(r.image, `chip ${i} keeps its ramp`).not.toBe("none");
        }
    } finally {
        await ctx.close();
    }
});
