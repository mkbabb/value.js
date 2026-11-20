import { test, expect, type Page } from "@playwright/test";
import { mainPane } from "./fixtures/dock";

/**
 * The picker's header numbers (color-40 G; his FORTIETH order: "the header
 * numbers of the components should be a bit larger and audacious").
 *
 * - They stand at the title's rung on a desk (41.9 px against a 53.3 px title
 *   today) and fill the header's content box on a phone (25.9 px today).
 * - The integer is 700 and the face has that instance.
 * - Every space in the catalogue is one line, and the card does not change
 *   height between spaces (the card-lock law).
 * - The readout never runs into the blob's hit box.
 * - Tab walks figure to figure and on out of the readout (today leaving a
 *   figure re-created all of them, so the focus was lost each time).
 */

const PICKER_TRIGGER = '.pane-shell .title-row [role="combobox"]';

async function boot(page: Page) {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(mainPane(page).locator(".pane-shell .readout .readout-fig").first()).toBeVisible({ timeout: 60_000 });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(600);
}

function census(page: Page) {
    return page.evaluate(() => {
        const ps = document.querySelector(".pane-shell")!;
        const readout = ps.querySelector<HTMLElement>(".readout")!;
        const fig = ps.querySelector<HTMLElement>(".readout .readout-fig")!;
        const int = ps.querySelector<HTMLElement>(".readout .fig-int")!;
        const trig = ps.querySelector<HTMLElement>('.title-row [role="combobox"]')!;
        const blob = ps.querySelector<HTMLElement>(".hero-blob-anchor");
        const card = ps.closest<HTMLElement>('[data-slot="card"]') ?? ps;
        const tops = [...ps.querySelectorAll(".readout-cell")].map((c) => Math.round(c.getBoundingClientRect().top));
        const r = readout.getBoundingClientRect();
        const b = blob?.getBoundingClientRect() ?? null;
        const hits = !!b && r.left < b.right && r.right > b.left && r.top < b.bottom && r.bottom > b.top;
        const cs = getComputedStyle(int);
        return {
            figPx: parseFloat(getComputedStyle(fig).fontSize),
            trigPx: parseFloat(getComputedStyle(trig).fontSize),
            weight: cs.fontWeight,
            instance: document.fonts.check(`700 ${cs.fontSize} Fraunces`, int.textContent ?? "0"),
            lines: new Set(tops).size,
            cardH: Math.round(card.getBoundingClientRect().height * 10) / 10,
            hitsBlob: hits,
        };
    });
}

async function spaces(page: Page): Promise<string[]> {
    await page.locator(PICKER_TRIGGER).first().click();
    const ids = await page
        .locator('[role="option"][data-space]')
        .evaluateAll((els) => els.map((e) => e.getAttribute("data-space")!));
    await page.keyboard.press("Escape");
    await page.waitForTimeout(300);
    return ids;
}

async function choose(page: Page, space: string) {
    await page.locator(PICKER_TRIGGER).first().click();
    const opt = page.locator(`[role="option"][data-space="${space}"]`);
    await opt.scrollIntoViewIfNeeded();
    await opt.click();
    await page.waitForTimeout(450);
}

for (const width of [1440, 390] as const) {
    test.describe(`the header numbers at ${width}`, () => {
        test.use({ viewport: { width, height: width === 390 ? 844 : 900 } });

        test("the title's rung, 700, one line in every space, the card held, clear of the blob", async ({ page }) => {
            test.setTimeout(180_000);
            await boot(page);
            const first = await census(page);
            if (width === 1440) {
                expect(Math.abs(first.figPx - first.trigPx), `${first.figPx} against ${first.trigPx}`).toBeLessThanOrEqual(1);
            } else {
                expect(first.figPx).toBeGreaterThanOrEqual(30);
            }
            expect(first.weight).toBe("700");
            expect(first.instance, "the face has a 700 instance").toBe(true);

            const heights = new Set<number>();
            for (const space of await spaces(page)) {
                await choose(page, space);
                const c = await census(page);
                expect(c.lines, `${space} on one line`).toBe(1);
                expect(c.hitsBlob, `${space} clear of the blob`).toBe(false);
                heights.add(c.cardH);
            }
            expect([...heights], "the card's height is one value across spaces").toHaveLength(1);
        });
    });
}

test.describe("the keyboard passes the figures", () => {
    test.use({ viewport: { width: 1440, height: 900 } });

    test("Tab walks figure to figure, then leaves the readout", async ({ page }) => {
        await boot(page);
        const figs = mainPane(page).locator(".pane-shell .readout .readout-fig");
        const n = await figs.count();
        expect(n).toBeGreaterThanOrEqual(3);
        await figs.first().focus();
        for (let i = 1; i < n; i++) {
            await page.keyboard.press("Tab");
            const at = await page.evaluate(() => {
                const a = document.activeElement as HTMLElement | null;
                const all = [...document.querySelectorAll(".pane-shell .readout .readout-fig")];
                return a ? all.indexOf(a) : -2;
            });
            expect(at, `Tab ${i} lands on figure ${i}`).toBe(i);
        }
        await page.keyboard.press("Tab");
        const after = await page.evaluate(() => {
            const a = document.activeElement;
            return {
                body: a === document.body || a === null,
                inReadout: !!a?.closest(".readout"),
                inPicker: !!a?.closest(".pane-shell"),
            };
        });
        expect(after.body, "the focus is not dropped").toBe(false);
        expect(after.inReadout, "and has left the readout").toBe(false);
        expect(after.inPicker, "for the picker's next control").toBe(true);
    });
});

test.describe("the figures are 44 px targets on touch", () => {
    test.use({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });

    test("each figure's box is 44 px tall or more", async ({ page }) => {
        await boot(page);
        const heights = await mainPane(page)
            .locator(".pane-shell .readout .readout-fig")
            .evaluateAll((els) => els.map((e) => e.getBoundingClientRect().height));
        expect(heights.length).toBeGreaterThan(0);
        for (const h of heights) expect(h).toBeGreaterThanOrEqual(44);
    });
});
