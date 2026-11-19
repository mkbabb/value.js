import { test, expect, type Page } from "@playwright/test";
import { extractedCard, loadExtractImage } from "./fixtures/extract-image";

/**
 * The palette card's three-dots menu (color-40 O-4, O-5; his FORTIETH order:
 * "clicking the three dots should not squish the entire container--the three
 * dots options should have more icons, like for json, export should be a
 * dropdown menu within a menu").
 */

const trigger = (page: Page) =>
    extractedCard(page).getByRole("button", { name: /^Palette menu for / });

test.describe("O-5: the press is the card's own", () => {
    test.use({ viewport: { width: 1440, height: 900 } });

    test("holding the menu trigger leaves the card's box as it was", async ({
        page,
    }) => {
        await loadExtractImage(page);
        const card = extractedCard(page);
        await page.mouse.move(0, 0);
        await page.waitForTimeout(500);
        const rest = await card.evaluate((el) => {
            const r = el.getBoundingClientRect();
            return [r.width, r.height];
        });
        const box = (await trigger(page).boundingBox())!;
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
        await page.mouse.down();
        const held: number[][] = [];
        for (let i = 0; i < 8; i++) {
            await page.waitForTimeout(60);
            held.push(
                await card.evaluate((el) => {
                    const r = el.getBoundingClientRect();
                    return [r.width, r.height];
                }),
            );
        }
        await page.mouse.up();
        for (const [w, h] of held) {
            expect(
                Math.abs(w! - rest[0]!),
                `width ${w} against ${rest[0]}`,
            ).toBeLessThanOrEqual(0.5);
            expect(
                Math.abs(h! - rest[1]!),
                `height ${h} against ${rest[1]}`,
            ).toBeLessThanOrEqual(0.5);
        }
    });
});

/** The open menu's plate (glass's menu content). */
const menu = (page: Page) => page.getByRole("menu").first();

/** Each row of the open menu: its name and whether a glyph leads it. */
const rows = (page: Page) =>
    menu(page)
        .locator('[role="menuitem"]')
        .evaluateAll((els) =>
            els
                .filter(
                    (el) =>
                        el.getBoundingClientRect().height > 0 && !el.closest("[inert]"),
                )
                .map((el) => ({
                    name: (el.textContent ?? "").trim(),
                    glyph: el.firstElementChild?.tagName.toLowerCase() === "svg",
                    glyphPx:
                        el.querySelector("svg")?.getBoundingClientRect().width ?? 0,
                    labelPx: parseFloat(getComputedStyle(el).fontSize),
                })),
        );

test.describe("O-4: the menu on a desk", () => {
    test.use({ viewport: { width: 1440, height: 900 } });

    test("every row leads with a 20 px glyph beside a 16 px label; Copy colors; Export cascades with glyphs", async ({
        page,
    }) => {
        await loadExtractImage(page);
        await trigger(page).click();
        await expect(menu(page)).toBeVisible();
        const root = await rows(page);
        expect(root.map((r) => r.name)).toContain("Copy colors");
        for (const r of root) {
            expect(r.glyph, `${r.name} has a glyph`).toBe(true);
            expect(Math.round(r.glyphPx), r.name).toBe(20);
            expect(r.labelPx, r.name).toBeGreaterThanOrEqual(16);
        }
        await menu(page).getByRole("menuitem", { name: "Export" }).hover();
        const sub = page.getByRole("menu").nth(1);
        await expect(sub).toBeVisible();
        const formats = await sub
            .locator('[role="menuitem"]')
            .evaluateAll((els) =>
                els.map((el) => ({
                    name: (el.textContent ?? "").trim(),
                    glyph: !!el.querySelector("svg"),
                })),
            );
        expect(formats.map((f) => f.name)).toEqual([
            "JSON",
            "CSS Custom Properties",
            "Tailwind Config",
            "SVG Swatch",
            "PNG Swatch",
        ]);
        for (const f of formats) expect(f.glyph, f.name).toBe(true);
    });
});

test.describe("O-4: the menu on a phone", () => {
    test.use({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });

    test("the root is four rows in 200 px; Export opens the formats in the same plate; the back row returns", async ({
        page,
    }) => {
        await loadExtractImage(page);
        await trigger(page).tap();
        await expect(menu(page)).toBeVisible();
        await page.waitForTimeout(400);
        const root = await rows(page);
        expect(root.map((r) => r.name)).toEqual([
            "Save",
            "Rename",
            "Copy colors",
            "Export",
        ]);
        for (const r of root) expect(r.glyph, r.name).toBe(true);
        const plate = await menu(page).elementHandle();
        const rootH = (await menu(page).boundingBox())!.height;
        expect(rootH).toBeLessThanOrEqual(200);

        await menu(page).getByRole("menuitem", { name: "Export" }).tap();
        await page.waitForTimeout(500);
        const formats = await rows(page);
        expect(formats.map((r) => r.name)).toEqual([
            "Export",
            "JSON",
            "CSS Custom Properties",
            "Tailwind Config",
            "SVG Swatch",
            "PNG Swatch",
        ]);
        for (const r of formats) expect(r.glyph, r.name).toBe(true);
        expect(
            await menu(page).evaluate((el, p) => el === p, plate),
            "the same plate",
        ).toBe(true);

        await menu(page).locator("[data-back-row]").tap();
        await page.waitForTimeout(500);
        expect((await rows(page)).map((r) => r.name)).toEqual([
            "Save",
            "Rename",
            "Copy colors",
            "Export",
        ]);
        expect(
            Math.abs((await menu(page).boundingBox())!.height - rootH),
        ).toBeLessThanOrEqual(1);
    });

    for (const reduced of [false, true]) {
        test(`the swap's plate edge travels and the pages fade${reduced ? " (reduced motion)" : ""}`, async ({
            page,
        }) => {
            await page.emulateMedia({
                reducedMotion: reduced ? "reduce" : "no-preference",
            });
            await loadExtractImage(page);
            await trigger(page).tap();
            await expect(menu(page)).toBeVisible();
            await page.waitForTimeout(400);
            const heights: number[] = [];
            await menu(page).evaluate((el) => {
                const w = window as unknown as { __h: number[] };
                w.__h = [];
                const t0 = performance.now();
                const tick = () => {
                    w.__h.push(el.getBoundingClientRect().height);
                    if (performance.now() - t0 < 600) requestAnimationFrame(tick);
                };
                requestAnimationFrame(tick);
            });
            await menu(page).getByRole("menuitem", { name: "Export" }).tap();
            const fades = await menu(page)
                .locator('[data-page-id="export"]')
                .evaluate(
                    (el) =>
                        el
                            .getAnimations()
                            .map(
                                (a) =>
                                    ((a.effect as KeyframeEffect).getKeyframes()[0] ??
                                        {}) as Record<string, unknown>,
                            )
                            .filter((k) => "opacity" in k).length,
                );
            await page.waitForTimeout(700);
            heights.push(
                ...(await page.evaluate(
                    () => (window as unknown as { __h: number[] }).__h,
                )),
            );
            expect(fades, "the arriving page fades in").toBeGreaterThan(0);
            const distinct = new Set(heights.map((h) => Math.round(h)));
            expect(
                distinct.size,
                "the plate's height passes through between its two sizes",
            ).toBeGreaterThan(2);
        });
    }

    test("opening the menu at 4x has no frame over 100 ms", async ({ page }) => {
        await loadExtractImage(page);
        await page.waitForTimeout(600);
        const cdp = await page.context().newCDPSession(page);
        await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
        await page.evaluate(() => {
            const w = window as unknown as { __gaps: number[] };
            w.__gaps = [];
            let last = performance.now();
            const t0 = last;
            const tick = (now: number) => {
                w.__gaps.push(now - last);
                last = now;
                if (now - t0 < 1500) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
        });
        await trigger(page).tap();
        await expect(menu(page)).toBeVisible();
        await page.waitForTimeout(1600);
        const gaps = await page.evaluate(
            () => (window as unknown as { __gaps: number[] }).__gaps,
        );
        await cdp.send("Emulation.setCPUThrottlingRate", { rate: 1 });
        console.log(`O-4 open at 4x: longest frame ${Math.max(...gaps).toFixed(1)} ms`);
        expect(Math.max(...gaps)).toBeLessThanOrEqual(100);
    });
});
