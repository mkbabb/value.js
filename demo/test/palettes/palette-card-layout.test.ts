// @vitest-environment node
/**
 * X.W7.c — the layout-bearing palette gates, measured in a real engine.
 *
 *   G9   the meta row does not overflow inside the legal bound (390×844, three
 *        30-char tags + featured + 4–5-digit counts): card `scrollWidth <=
 *        clientWidth`, the card no wider than its list column, no page-level
 *        horizontal scroll, and the name's rendered width > 0.
 *   G10  the same no-overflow law at EVERY fixture N, and the card height law:
 *        one height across the whole colour/tag fixture set.
 *   G11  (root-only half) the cast is the card ROOT's own box-shadow — it
 *        follows the rounded silhouette — and hover is a distinct register at
 *        that root. The golden half is X-W1's `e2e/visual/` (not authored here).
 *   N-13 under `prefers-reduced-motion` the collapse COMPLETES and the swatch
 *        subtree leaves the DOM.
 *
 * jsdom has no layout, so these run in Playwright Chromium against the harness
 * page (`n-fixtures/harness/`) served through the repo's own `vite.config.ts`.
 */
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { openHarness, measureCard, type HarnessSeat } from "./n-fixtures/browser";
import { COLOR_NS, TAG_NS } from "./n-fixtures/fixtures";

let seat: HarnessSeat;

beforeAll(async () => {
    seat = await openHarness({ width: 390, height: 844 });
}, 60_000);

afterAll(async () => {
    await seat?.close();
});

describe("G9 · the meta row at 390×844 with a legal payload", () => {
    it("does not overflow; the name keeps a rendered width", async () => {
        const g = await measureCard(seat.page, "g9");
        expect(g.scrollWidth).toBeLessThanOrEqual(g.clientWidth);
        expect(g.cardWidth).toBeLessThanOrEqual(g.gridWidth);
        expect(g.docScrollWidth).toBeLessThanOrEqual(g.viewportWidth);
        expect(g.nameWidth).toBeGreaterThan(0);
    });
});

describe("G10 · the no-overflow law and the height law at every fixture N", () => {
    const keys = [...COLOR_NS.map((n) => `colors-${n}`), ...TAG_NS.map((n) => `tags-${n}`), "g9"];

    it("no fixture overflows its card or the page", async () => {
        for (const key of keys) {
            const g = await measureCard(seat.page, key);
            expect(g.scrollWidth, key).toBeLessThanOrEqual(g.clientWidth);
            expect(g.cardWidth, key).toBeLessThanOrEqual(g.gridWidth);
            expect(g.nameWidth, key).toBeGreaterThan(0);
        }
    });

    it("one card height across the whole fixture set", async () => {
        const heights = new Set<number>();
        for (const key of keys) heights.add(Math.round((await measureCard(seat.page, key)).height));
        expect([...heights]).toHaveLength(1);
    });
});

describe("G11 · root-only: the cast and the hover register live on the card root", () => {
    it("the cast is the root's own rounded box-shadow, and hover deepens it", async () => {
        const read = () =>
            seat.page.evaluate(() => {
                const card = document.querySelector<HTMLElement>('[role=article][data-case="colors-5"]')!;
                const cs = getComputedStyle(card);
                return {
                    shadow: cs.boxShadow,
                    radius: cs.borderTopLeftRadius,
                    translate: cs.translate,
                    castChildren: card.querySelectorAll(".cartoon-cast").length,
                };
            });
        const rest = await read();
        expect(rest.shadow).not.toBe("none");
        expect(parseFloat(rest.radius)).toBeGreaterThan(0);
        expect(rest.castChildren).toBe(0);

        await seat.page.hover('[role=article][data-case="colors-5"]');
        await seat.page.waitForTimeout(400);
        const hover = await read();
        expect(hover.shadow).not.toBe(rest.shadow);
        expect(hover.translate).not.toBe(rest.translate);
        await seat.page.mouse.move(0, 0);
    });
});

describe("N-13 · the reduced-motion disclosure completes", () => {
    it("collapse under prefers-reduced-motion removes the swatch subtree", async () => {
        await seat.page.emulateMedia({ reducedMotion: "reduce" });
        const swatchCount = () =>
            seat.page.evaluate(
                () =>
                    document.querySelectorAll('[role=article][data-case="disclosure"] [data-palette-swatches]')
                        .length,
            );
        await seat.page.evaluate(() => window.setDisclosure(true));
        await expect.poll(swatchCount, { timeout: 2_000 }).toBeGreaterThan(0);
        await seat.page.evaluate(() => window.setDisclosure(false));
        await expect.poll(swatchCount, { timeout: 2_000 }).toBe(0);
        await seat.page.emulateMedia({ reducedMotion: "no-preference" });
    });

    it("the animated disclosure (no preference) still completes on its height morph", async () => {
        const swatchCount = () =>
            seat.page.evaluate(
                () =>
                    document.querySelectorAll('[role=article][data-case="disclosure"] [data-palette-swatches]')
                        .length,
            );
        await seat.page.evaluate(() => window.setDisclosure(true));
        await expect.poll(swatchCount, { timeout: 2_000 }).toBe(1);
        await seat.page.evaluate(() => window.setDisclosure(false));
        await expect.poll(swatchCount, { timeout: 2_000 }).toBe(0);
    });
});
