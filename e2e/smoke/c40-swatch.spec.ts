import { test, expect, type Page } from "@playwright/test";
import { mainPane } from "./fixtures/dock";
import { routeBrowsePalettes } from "./fixtures/browse-palettes";
import { loadExtractImage } from "./fixtures/extract-image";
import { decodePng, type DecodedImage } from "./fixtures/frame-diff";

/**
 * The palette swatch on a desk (color-40 L, his FORTIETH order: "a slight
 * border, a bit more depth, and animate on click/hover like a subtle
 * watercolour"). The phone half is `mobile/swatch-touch.spec.ts`.
 */

test.use({ viewport: { width: 1440, height: 900 } });

const seatsOf = (page: Page) =>
    mainPane(page)
        .locator(".swatch-button")
        .evaluateAll((els) =>
            els
                .map((el) => el.getBoundingClientRect())
                .filter((r) => r.width > 0 && r.height > 0)
                .map((r) => [r.width, r.height] as const),
        );

/** Opens the first Browse card's colours (the wall fixture's two). */
async function openBrowseCard(page: Page) {
    await routeBrowsePalettes(page);
    await page.goto("/#/browse", { waitUntil: "domcontentloaded" });
    const card = mainPane(page).locator('[role="article"][aria-label^="Palette:"]').first();
    await expect(card).toBeVisible({ timeout: 60_000 });
    await card.click({ position: { x: 24, y: 12 } });
    await expect(card.locator(".swatch-button").first()).toBeVisible({ timeout: 10_000 });
    return card;
}

test.describe("L-1: one seat on both axes", () => {
    test("Generate, an opened Browse card and Extract: every seat is square", async ({ page }) => {
        await page.goto("/#/generate", { waitUntil: "domcontentloaded" });
        await expect(mainPane(page).locator(".swatch-button").first()).toBeVisible({ timeout: 60_000 });
        const seats = [...(await seatsOf(page))];
        await openBrowseCard(page);
        seats.push(...(await seatsOf(page)));
        await loadExtractImage(page);
        seats.push(...(await seatsOf(page)));
        expect(seats.length).toBeGreaterThan(4);
        for (const [w, h] of seats) expect(Math.abs(w - h), `${w}x${h}`).toBeLessThanOrEqual(1);
    });
});

async function scheme(page: Page, dark: boolean) {
    await page.emulateMedia({ colorScheme: dark ? "dark" : "light" });
    await page.addInitScript((d) => {
        try {
            localStorage.setItem("vueuse-color-scheme", d ? "dark" : "light");
        } catch {
            /* the media emulation still holds */
        }
    }, dark);
}

/** Every solid dot in the main pane: its rim and its cast, as computed. */
const paintOf = (page: Page) =>
    mainPane(page)
        .locator('.swatch-button .watercolor-swatch[data-variant="solid"]')
        .evaluateAll((els) =>
            els
                .filter((el) => el.getBoundingClientRect().width > 0)
                .map((el) => {
                    const cs = getComputedStyle(el);
                    return { border: parseFloat(cs.borderTopWidth), shadow: cs.boxShadow };
                }),
        );

/** One layer, offset down-right, zero blur, no spread. */
function expectStamp(shadow: string) {
    expect(shadow, "one layer").not.toMatch(/\),\s*\S|px,\s*\S/);
    const lengths = (shadow.match(/-?[\d.]+px/g) ?? []).map(parseFloat);
    expect(lengths.length, shadow).toBeGreaterThanOrEqual(3);
    const [x, y, blur] = lengths;
    expect(x!, shadow).toBeGreaterThan(0);
    expect(y!, shadow).toBeGreaterThan(0);
    expect(blur!, shadow).toBe(0);
}

const lum = (img: DecodedImage, i: number) =>
    0.2126 * img.data[i]! + 0.7152 * img.data[i + 1]! + 0.0722 * img.data[i + 2]!;

/**
 * The stamp against its band, read off pixels: the same clip with and without
 * the cast. Where the two differ is the stamp; it must be darker than the band
 * it covers (dark's mid-tone shadow ink would read as a halo).
 */
async function stampDarkerThanBand(page: Page, swatch: import("@playwright/test").Locator) {
    const box = (await swatch.boundingBox())!;
    const clip = { x: box.x - 6, y: box.y - 6, width: box.width + 14, height: box.height + 14 };
    const withStamp = decodePng(await page.screenshot({ clip }));
    const style = await page.addStyleTag({ content: ".watercolor-swatch { box-shadow: none !important; }" });
    await page.waitForTimeout(100);
    const without = decodePng(await page.screenshot({ clip }));
    await style.evaluate((el) => (el as Element).remove());
    let on = 0;
    let off = 0;
    let n = 0;
    for (let p = 0; p < withStamp.width * withStamp.height; p++) {
        const i = p * withStamp.channels;
        const j = p * without.channels;
        if (Math.abs(lum(withStamp, i) - lum(without, j)) < 2) continue;
        on += lum(withStamp, i);
        off += lum(without, j);
        n++;
    }
    expect(n, "the stamp shows").toBeGreaterThan(4);
    expect(on / n, "the stamp is darker than its band").toBeLessThan(off / n);
}

for (const dark of [false, true]) {
    test.describe(`L-2, L-3: the rim and the stamp (${dark ? "dark" : "light"})`, () => {
        test.beforeEach(({ page }) => scheme(page, dark));

        test("Generate, an opened Browse card and Extract: a 1 px rim and one hard stamp", async ({ page }) => {
            await page.goto("/#/generate", { waitUntil: "domcontentloaded" });
            await expect(mainPane(page).locator(".swatch-button").first()).toBeVisible({ timeout: 60_000 });
            await page.mouse.move(0, 0);
            const paints = [...(await paintOf(page))];
            await stampDarkerThanBand(page, mainPane(page).locator(".swatch-button").first());
            await openBrowseCard(page);
            await page.mouse.move(0, 0);
            paints.push(...(await paintOf(page)));
            await loadExtractImage(page);
            paints.push(...(await paintOf(page)));
            await stampDarkerThanBand(page, mainPane(page).locator(".swatch-button").first());
            expect(paints.length).toBeGreaterThan(4);
            for (const p of paints) {
                expect(p.border).toBeGreaterThanOrEqual(1);
                expectStamp(p.shadow);
            }
        });
    });
}

test.describe("L-4: one wet response", () => {
    test("a hover wets the paint (the outline moves, the rim deepens) and moves no other box", async ({ page }) => {
        await page.goto("/#/generate", { waitUntil: "domcontentloaded" });
        const swatches = mainPane(page).locator(".swatch-button");
        await expect(swatches.nth(1)).toBeVisible({ timeout: 60_000 });
        await page.mouse.move(0, 0);
        await page.waitForTimeout(800);
        const read = () =>
            mainPane(page)
                .locator(".swatch-button")
                .evaluateAll((els) =>
                    els.map((el) => {
                        const h = el as HTMLElement;
                        const dot = h.querySelector(".watercolor-swatch")!;
                        const cs = getComputedStyle(dot);
                        return {
                            box: [h.offsetLeft, h.offsetTop, h.offsetWidth, h.offsetHeight].join(","),
                            radius: cs.borderTopLeftRadius + " " + cs.borderBottomRightRadius,
                            rim: cs.borderTopColor,
                        };
                    }),
                );
        const rest = await read();
        await swatches.nth(1).hover();
        await page.waitForTimeout(800);
        const wet = await read();
        expect(wet.map((w) => w.box)).toEqual(rest.map((r) => r.box));
        expect(wet[1]!.radius).not.toBe(rest[1]!.radius);
        expect(wet[1]!.rim).not.toBe(rest[1]!.rim);
        expect(wet[0]!.radius).toBe(rest[0]!.radius);
        await page.mouse.move(0, 0);
        await page.waitForTimeout(900);
        expect((await read())[1]!.radius).toBe(rest[1]!.radius);
    });
});

/**
 * L-7: a list of swatches sits on paper, the row's own ground (the card's
 * paper tone), with no second box: the row is still the well's own child.
 * Today every row is transparent over its well.
 */
test.describe("L-7: the swatch band", () => {
    const bandOf = (row: import("@playwright/test").Locator) =>
        row.evaluate((el) => ({
            ground: getComputedStyle(el).backgroundColor,
            parent: el.parentElement?.matches("[data-generate-plate], [data-palette-swatches], .current-palette-well") ?? false,
        }));
    const transparent = (c: string) => c === "transparent" || /rgba\(0, 0, 0, 0\)|\/ 0\)$/.test(c);

    test("Generate's plate, an opened card and the Current palette: the row has a ground and no new parent", async ({ page }) => {
        await page.goto("/#/generate", { waitUntil: "domcontentloaded" });
        const genRow = mainPane(page).locator("[data-generate-plate] > div:has(.swatch-button)").first();
        await expect(genRow).toBeVisible({ timeout: 60_000 });
        const card = await openBrowseCard(page);
        const cardRow = card.locator("[data-palette-swatches] > div:has(.swatch-button)").first();
        const bands = [await bandOf(cardRow)];
        await page.goto("/#/generate", { waitUntil: "domcontentloaded" });
        await expect(genRow).toBeVisible({ timeout: 60_000 });
        bands.push(await bandOf(genRow));
        await page.goto("/#/palettes", { waitUntil: "domcontentloaded" });
        const currentRow = page.locator(".current-palette-well > .swatch-row").first();
        await expect(currentRow).toBeAttached({ timeout: 60_000 });
        bands.push(await bandOf(currentRow));
        for (const b of bands) {
            expect(transparent(b.ground), `ground ${b.ground}`).toBe(false);
            expect(b.parent).toBe(true);
        }
    });
});
