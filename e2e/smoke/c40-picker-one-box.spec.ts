/**
 * The FORTIETH order, A-1 ("there's a strange re-sizing issue on the main
 * page"): the shared picker keeps ONE box.
 *
 * Measured on production: Home to My Palettes at 1440 narrowed the picker card
 * from ~675 to ~480 px over 250 ms, its spectrum reflowing on every frame
 * (Library's 1/3 stage track, tweened by the row's G9 transition).
 *
 *   (a) at 1280x720, 1440x900 and 1800x1100 the picker card's rect is the same
 *       within 1 px on `/`, `#/palettes`, `#/mix` and `#/blob`;
 *   (b) sampled every frame through Home to My Palettes and back, its width
 *       takes one value;
 *   (c) no animation that runs during a page change animates
 *       `grid-template-columns`, `clip-path`, `width`, `height` or `inset`
 *       (no layout property animates during a page change; the dock's Tools
 *       seat included, K-5: the changes pass through the bar-less routes).
 */
import { test, expect, type Page } from "@playwright/test";

const PICKER_ROUTES = ["#/", "#/palettes", "#/mix", "#/blob"] as const;
const LAYOUT_PROPS = ["grid-template-columns", "clip-path", "width", "height", "inset"];

interface Box {
    x: number;
    y: number;
    w: number;
    h: number;
}

/** The picker card's layout box, read once every finite animation in the row has ended. */
async function pickerBox(page: Page): Promise<Box> {
    await page.waitForFunction(async () => {
        const row = document.querySelector(".pane-container");
        const plate = document.querySelector<HTMLElement>(".pane-wrapper--stage .picker-plate");
        if (!row || !plate) return false;
        if (row.querySelector(".vj-enter-enter-active, .vj-enter-leave-active")) return false;
        const running = row
            .getAnimations({ subtree: true })
            .filter((a) => a.playState === "running" && Number.isFinite(a.effect?.getComputedTiming().endTime ?? Infinity));
        await Promise.allSettled(running.map((a) => a.finished));
        return true;
    });
    // two readings a frame apart agree, or the row is still moving
    let last: Box | null = null;
    for (let i = 0; i < 20; i++) {
        const now = await page.evaluate(() => {
            const r = document.querySelector<HTMLElement>(".pane-wrapper--stage .picker-plate")!.getBoundingClientRect();
            return { x: r.x, y: r.y + window.scrollY, w: r.width, h: r.height };
        });
        if (last && Math.abs(last.w - now.w) < 0.5 && Math.abs(last.h - now.h) < 0.5) return now;
        last = now;
        await page.waitForTimeout(150);
    }
    return last!;
}

async function go(page: Page, hash: string) {
    await page.evaluate((h) => (location.hash = h), hash);
    const view = hash === "#/" ? "picker" : hash.slice(2);
    await expect(page.locator(".app-layout")).toHaveAttribute("data-view", view, { timeout: 30_000 });
}

/** Per frame from the change until the row has been still for 600 ms. */
async function traceChange(page: Page, hash: string) {
    return page.evaluate(async (hash) => {
        const frame = () => new Promise((r) => requestAnimationFrame(r));
        const widths: number[] = [];
        const props = new Set<string>();
        const read = () => {
            const plate = document.querySelector<HTMLElement>(".pane-wrapper--stage .picker-plate");
            for (const a of document.getAnimations()) {
                if (a.playState !== "running") continue;
                // glass's segmented tabs size their indicator by a width and
                // height transition inside a pane (Mix's mode tabs): glass's
                // component, sent to glass, not the page change's own layout
                const target = (a.effect as KeyframeEffect | null)?.target;
                if (target instanceof Element && target.closest(".segmented-indicator")) continue;
                if (a instanceof CSSTransition) props.add(a.transitionProperty);
                else
                    for (const k of (a.effect as KeyframeEffect | null)?.getKeyframes() ?? [])
                        for (const p of Object.keys(k))
                            if (!["offset", "easing", "composite", "computedOffset"].includes(p)) props.add(p);
            }
            return plate ? plate.getBoundingClientRect().width : -1;
        };
        widths.push(read());
        location.hash = hash;
        let still = performance.now();
        let prev = widths[0];
        const start = performance.now();
        while (performance.now() - still < 600 && performance.now() - start < 8000) {
            await frame();
            const w = read();
            if (Math.abs(w - prev!) > 0.01) still = performance.now();
            prev = w;
            widths.push(w);
        }
        return { widths, props: [...props] };
    }, hash);
}

/** A property name in kebab case, so a WAAPI `gridTemplateColumns` reads as the CSS name. */
const kebab = (p: string) => p.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);

test.describe("c40 · the shared picker keeps one box (FORTIETH A-1)", () => {
    test.setTimeout(240_000);

    for (const [width, height] of [
        [1280, 720],
        [1440, 900],
        [1800, 1100],
    ] as const) {
        test(`(a) ${width}x${height}: one rect on the four routes that show the picker`, async ({ page }) => {
            await page.setViewportSize({ width, height });
            await page.goto("/#/", { waitUntil: "load", timeout: 60_000 });
            await page.locator(".pane-wrapper--stage .picker-plate").waitFor({ timeout: 60_000 });
            const boxes: Record<string, Box> = {};
            for (const hash of PICKER_ROUTES) {
                await go(page, hash);
                boxes[hash] = await pickerBox(page);
            }
            const home = boxes["#/"]!;
            for (const hash of PICKER_ROUTES) {
                const b = boxes[hash]!;
                const say = `${hash} ${JSON.stringify(b)} vs Home ${JSON.stringify(home)}`;
                expect(Math.abs(b.x - home.x), `x ${say}`).toBeLessThanOrEqual(1);
                expect(Math.abs(b.y - home.y), `y ${say}`).toBeLessThanOrEqual(1);
                expect(Math.abs(b.w - home.w), `width ${say}`).toBeLessThanOrEqual(1);
                expect(Math.abs(b.h - home.h), `height ${say}`).toBeLessThanOrEqual(1);
            }
        });
    }

    test("(b, c) 1440: through Home to My Palettes and back the width takes one value; no layout property animates", async ({
        page,
    }) => {
        await page.setViewportSize({ width: 1440, height: 900 });
        await page.goto("/#/", { waitUntil: "load", timeout: 60_000 });
        await page.locator(".pane-wrapper--stage .picker-plate").waitFor({ timeout: 60_000 });
        // warm both panes so the change is the revisit a reader makes
        await go(page, "#/palettes");
        await pickerBox(page);
        await go(page, "#/");
        await pickerBox(page);

        const animated = new Set<string>();
        for (const hash of ["#/palettes", "#/"]) {
            const { widths, props } = await traceChange(page, hash);
            const seen = widths.filter((w) => w > 0);
            const spread = Math.max(...seen) - Math.min(...seen);
            expect(spread, `${hash}: picker widths across the change ${[...new Set(seen.map((w) => w.toFixed(1)))].join(", ")}`).toBeLessThanOrEqual(0.5);
            for (const p of props) animated.add(kebab(p));
        }
        // the other changes a reader makes from the picker, a workbench and
        // back, through the bar-less routes, so the dock's Tools seat leaves
        // and returns (K-5)
        for (const hash of ["#/mix", "#/generate", "#/browse", "#/blob", "#/extract", "#/"]) {
            const { props } = await traceChange(page, hash);
            for (const p of props) animated.add(kebab(p));
        }
        const layout = [...animated].filter((p) => LAYOUT_PROPS.includes(p));
        expect(layout, `layout properties animated during a page change (all: ${[...animated].join(", ")})`).toEqual([]);
    });
});
