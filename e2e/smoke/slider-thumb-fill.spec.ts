import { test, expect, type Page } from "@playwright/test";

/**
 * The scrubber's thumb is the fill's end (his FORTY-SECOND C: "capped and
 * invisible, like you're just pulling the track"). On every scalar slider the
 * thumb paints the fill's own colour, so no disc shows at the value; tabbed
 * to, the slider still shows glass's ring. In light and in dark, at 1440 and
 * at 390. The picker's channel rings (glass's spectrum variant) are not
 * scrubbers and are not read.
 */

test.beforeEach(({}, testInfo) => {
    testInfo.setTimeout(180_000);
});

const CELLS = [
    { width: 1440, height: 900, scheme: "light" },
    { width: 1440, height: 900, scheme: "dark" },
    { width: 390, height: 844, scheme: "light" },
    { width: 390, height: 844, scheme: "dark" },
] as const;

/** Every visible scrubber's thumb and fill, as resolved colours. */
async function readScrubbers(page: Page) {
    return page.evaluate(() => {
        const probe = document.createElement("div");
        document.body.append(probe);
        const resolve = (css: string) => {
            probe.style.backgroundColor = "";
            probe.style.backgroundColor = css;
            return getComputedStyle(probe).backgroundColor;
        };
        const rows: { name: string; thumb: string; fill: string }[] = [];
        for (const root of document.querySelectorAll<HTMLElement>('.glass-slider:not([data-variant="spectrum"])')) {
            const thumb = root.querySelector<HTMLElement>(".slider-thumb");
            const range = root.querySelector<HTMLElement>(".slider-range");
            if (!thumb || !range || root.getBoundingClientRect().width === 0) continue;
            const tint = getComputedStyle(range).getPropertyValue("--liquid-fill-tint").trim();
            rows.push({
                name: thumb.getAttribute("aria-label") ?? "",
                thumb: getComputedStyle(thumb).backgroundColor,
                fill: resolve(tint),
            });
        }
        probe.remove();
        return rows;
    });
}

for (const cell of CELLS) {
    test(`Extract and Gradient (${cell.width}, ${cell.scheme}): each scrubber's thumb is its fill's colour; a tabbed slider shows its ring`, async ({
        page,
    }) => {
        await page.setViewportSize({ width: cell.width, height: cell.height });
        await page.emulateMedia({ colorScheme: cell.scheme });
        for (const hash of ["#/extract", "#/gradient"]) {
            await page.goto(`/${hash}`, { waitUntil: "load" });
            await page.locator('.glass-slider:not([data-variant="spectrum"])').first().waitFor({ state: "visible", timeout: 60_000 });
            await page.waitForTimeout(1500);
            const rows = await readScrubbers(page);
            expect(rows.length, `${hash}: scrubbers on the page`).toBeGreaterThan(0);
            for (const row of rows) {
                expect(row.thumb, `${hash} ${row.name}: the thumb paints the fill's colour`).toBe(row.fill);
            }
        }

        // The ring: the first scrubber, reached by the keyboard, shows glass's
        // focus ring on its track.
        const thumb = page.locator('.glass-slider:not([data-variant="spectrum"]) [role="slider"]').first();
        await thumb.focus();
        await page.keyboard.press("ArrowRight");
        await page.waitForTimeout(300);
        const ring = await thumb.evaluate((el) => {
            const track = el.closest(".glass-slider")?.querySelector<HTMLElement>(".slider-track");
            return track ? getComputedStyle(track).boxShadow : "none";
        });
        expect(ring, "the tabbed slider's track wears the focus ring").not.toBe("none");
    });
}
