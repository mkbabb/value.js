import { test, expect } from "@playwright/test";

/**
 * Phone controls are not the desk times one and a half (his FORTY-SECOND D;
 * the study's 2.7). glass multiplies each control rung by
 * `--ui-coarse-scale` under a coarse pointer; at its default 1.5 a phone drew
 * selects, fields and icon buttons 54 to 66 px tall. At 390 under touch, no
 * select, field or icon button is taller than 50 px, and none is under the
 * 44 px touch floor.
 *
 * Swatches are not in the census: a swatch's seat is the palette's own length
 * on both axes, not a control rung. The Current palette's add seat is the
 * ghost of the next swatch, seated with its row, and is left out with them.
 * So are the two colour-space triggers: each is a word set at its heading's
 * type rung (the picker's title, 33 px at 390, and About's heading), not a
 * control rung. About's word is the smaller; on touch it answers 44 px, read
 * below by touch points 20 px above and below its centre.
 */

test.use({ viewport: { width: 390, height: 844 } });
test.beforeEach(({}, testInfo) => {
    testInfo.setTimeout(180_000);
});

// Home, Extract and an empty My Palettes hold no select, field or icon button
// outside their swatches and the colour-space words; these three carry the
// interpolation selects, the palette's field and its icon buttons.
const ROUTES = ["/#/mix", "/#/generate", "/#/gradient"] as const;

const CONTROLS = [
    '[data-slot="select-trigger"]',
    "button[data-icon-only]:not(.swatch-button):not(.add-slot-ghost)",
    "input:not([type=range]):not([type=hidden]):not([type=file]):not([type=checkbox]):not([type=radio])",
].join(",");

for (const route of ROUTES) {
    test(`${route}: every select, field and icon button is 44 to 50 px tall`, async ({ page }) => {
        await page.goto(route, { waitUntil: "load" });
        await page.locator("main").first().waitFor({ state: "visible", timeout: 60_000 });
        await page.waitForTimeout(2500);
        expect(await page.evaluate(() => matchMedia("(pointer: coarse)").matches)).toBe(true);

        const census = await page.evaluate((sel) => {
            const rows: { what: string; h: number }[] = [];
            for (const el of document.querySelectorAll<HTMLElement>(sel)) {
                const r = el.getBoundingClientRect();
                const cs = getComputedStyle(el);
                if (r.width === 0 || r.height === 0 || cs.visibility === "hidden" || cs.display === "none") continue;
                if (el.closest("[inert], [aria-hidden='true']") || el.matches(".space-trigger")) continue;
                const name =
                    el.getAttribute("aria-label") ??
                    el.getAttribute("placeholder") ??
                    (el.textContent ?? "").trim().slice(0, 24);
                rows.push({ what: `${el.tagName.toLowerCase()}.${[...el.classList].slice(0, 2).join(".")} "${name}"`, h: Math.round(r.height * 10) / 10 });
            }
            return rows;
        }, CONTROLS);

        expect(census.length, "the page has controls to measure").toBeGreaterThan(0);
        const tall = census.filter((c) => c.h > 50.5);
        const short = census.filter((c) => c.h < 43.5);
        expect(tall, `taller than 50 px: ${JSON.stringify(tall)}`).toEqual([]);
        expect(short, `under 44 px: ${JSON.stringify(short)}`).toEqual([]);
    });
}

test("About's colour-space word answers a touch 20 px above and below its centre", async ({ page }) => {
    await page.goto("/", { waitUntil: "load" });
    const word = page.locator(".about-pane .space-trigger--inline").first();
    await word.waitFor({ state: "visible", timeout: 60_000 });
    await word.scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);
    const hits = await word.evaluate((el) => {
        const r = el.getBoundingClientRect();
        const x = r.left + r.width / 2;
        const y = r.top + r.height / 2;
        return [-20, 0, 20].map((dy) => {
            const at = document.elementFromPoint(x, y + dy);
            return { dy, height: Math.round(r.height * 10) / 10, inside: !!at && (at === el || el.contains(at)) };
        });
    });
    expect(hits.every((h) => h.inside), JSON.stringify(hits)).toBe(true);
});
