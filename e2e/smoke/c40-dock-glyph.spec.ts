/**
 * The FORTIETH order, K (the dock, the site's share) and B-2: what the site
 * adds to a page change in the dock, read every animation frame.
 *
 *   K-1  The view glyph crosses in place, on the trigger and on the folded
 *        seal: the glyph seat is never empty (the summed opacity of the view
 *        glyphs in it is 0.5 or more at every frame) and it settles within
 *        300 ms of the pick (today 0.00 at +550 ms, settled at +955).
 *   K-2  A dock action's glyph is keyed by its icon: across a view change
 *        that keeps the picker's Copy and Reset seats, their glyph nodes are
 *        the same nodes.
 *   K-3  The trigger's accent sweep runs on the small-state clock: the
 *        `--accent-view` transition a view change starts lasts 200 ms or
 *        less (it was the 550 ms panel clock).
 *   K-4  The settle beat goes: no `vj-settle` animation starts on a view
 *        change (two scale motions on one control is the engineered look).
 *   K-6 / B-2  The press is answered before the work: the trigger names the
 *              chosen view, and the menu is closing, on a frame BEFORE the
 *              one the route lands on (the switch used to run inside the
 *              input's own task, so the two always shared a frame).
 */
import { test, expect, type Page } from "@playwright/test";
import { expandDock, dockAtRest } from "./fixtures/dock";

interface Frame {
    t: number;
    /** the trigger's visible name */
    label: string;
    /** the route's view, as the shell stamps it */
    view: string;
    /** the view menu's listbox is still open */
    menu: boolean;
}

async function openHome(page: Page, width: number, height: number) {
    await page.setViewportSize({ width, height });
    await page.goto("/#/", { waitUntil: "load", timeout: 60_000 });
    await page.locator(".glass-dock").first().waitFor({ timeout: 30_000 });
    await dockAtRest(page);
    await expandDock(page);
}

/** Start a per-frame trace of the trigger, the route and the menu. */
async function startTrace(page: Page) {
    await page.evaluate(() => {
        const w = window as unknown as { __trace: Frame[]; __tracing: boolean };
        w.__trace = [];
        w.__tracing = true;
        const t0 = performance.now();
        const tick = () => {
            const trigger = document.querySelector<HTMLElement>(".view-select-trigger");
            w.__trace.push({
                t: performance.now() - t0,
                label: trigger?.innerText.trim() ?? "",
                view: document.querySelector<HTMLElement>(".app-layout")?.dataset.view ?? "",
                menu: document.querySelector('[role="listbox"][data-state="open"]') !== null,
            });
            if (w.__tracing) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    });
}

async function stopTrace(page: Page): Promise<Frame[]> {
    return page.evaluate(() => {
        const w = window as unknown as { __trace: Frame[]; __tracing: boolean };
        w.__tracing = false;
        return w.__trace;
    });
}

interface GlyphFrame {
    t: number;
    /** the summed effective opacity of the view glyphs in the seat */
    sum: number;
    /** how many view glyphs the seat holds */
    n: number;
    /** one glyph, at full strength, untransformed */
    rest: boolean;
}

/**
 * Trace the view glyphs inside `seat` per frame. A view glyph is a lucide
 * SVG that is not the select's chevron; its strength is the product of the
 * opacities from it up to the seat (the wrapper that crosses, or the SVG
 * itself where the SVG was the moving element).
 */
async function traceGlyphs(page: Page, seat: string, act: () => Promise<void>, ms = 1200): Promise<{ frames: GlyphFrame[]; t0: number }> {
    await page.evaluate(
        ({ seat, ms }) => {
            const w = window as unknown as { __glyphs: GlyphFrame[]; __t0: number };
            w.__glyphs = [];
            w.__t0 = -1;
            document.addEventListener("pointerup", () => (w.__t0 = performance.now()), { capture: true, once: true });
            const start = performance.now();
            const tick = () => {
                const host = document.querySelector<HTMLElement>(seat);
                const glyphs = host
                    ? [...host.querySelectorAll<SVGElement>("svg.lucide")].filter((g) => !/chevron/.test(g.getAttribute("class") ?? ""))
                    : [];
                let sum = 0;
                let rest = glyphs.length === 1;
                for (const g of glyphs) {
                    let op = 1;
                    for (let el: Element | null = g; el && el !== host; el = el.parentElement) {
                        const cs = getComputedStyle(el);
                        op *= Number(cs.opacity);
                        if (cs.transform !== "none" || (cs.scale !== "none" && cs.scale !== "1")) rest = false;
                    }
                    sum += op;
                    if (op < 0.99) rest = false;
                }
                w.__glyphs.push({ t: performance.now(), sum, n: glyphs.length, rest });
                if (performance.now() - start < ms) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
        },
        { seat, ms },
    );
    await act();
    await page.waitForTimeout(ms + 100);
    return page.evaluate(() => {
        const w = window as unknown as { __glyphs: GlyphFrame[]; __t0: number };
        return { frames: w.__glyphs, t0: w.__t0 };
    });
}

/** The glyph faults of one change: an empty seat, or no rest within `bound` ms of `t0`. */
function glyphFaults(frames: GlyphFrame[], t0: number, bound: number): string[] {
    const out: string[] = [];
    const thin = frames.filter((f) => f.sum < 0.5);
    if (thin.length) out.push(`seat under 0.5 on ${thin.length} frames (lowest ${Math.min(...thin.map((f) => f.sum)).toFixed(2)} at +${(thin[0]!.t - t0).toFixed(0)} ms)`);
    // the last frame that is not at rest; the glyph has settled after it
    let last = -1;
    frames.forEach((f, i) => {
        if (!f.rest) last = i;
    });
    const settled = last + 1 < frames.length ? frames[last + 1]!.t - t0 : Infinity;
    if (!(settled <= bound)) out.push(`settled at +${settled.toFixed(0)} ms (bound ${bound})`);
    return out;
}

test.describe("c40 · the dock's share of a page change", () => {
    test.setTimeout(120_000);

    test("K-1: the trigger's view glyph crosses in place and settles within 300 ms of the pick", async ({ page }) => {
        await openHome(page, 1440, 900);
        await page.getByRole("combobox", { name: "Select view" }).click();
        const option = page.getByRole("option", { name: "Palettes", exact: true });
        await expect(option).toBeVisible();
        const { frames, t0 } = await traceGlyphs(page, ".view-select-trigger", () => option.click());
        expect(t0, "the pick was seen").toBeGreaterThan(0);
        const after = frames.filter((f) => f.t >= t0);
        expect(glyphFaults(after, t0, 300)).toEqual([]);
    });

    test("K-1: the folded seal's glyph crosses in place", async ({ page }) => {
        await page.setViewportSize({ width: 1440, height: 900 });
        await page.goto("/#/", { waitUntil: "load", timeout: 60_000 });
        await page.locator(".glass-dock").first().waitFor({ timeout: 30_000 });
        await dockAtRest(page);
        await page.mouse.move(5, 890);
        await expect(page.locator(".glass-dock.collapsed")).toHaveCount(1, { timeout: 20_000 });
        await dockAtRest(page);
        const { frames } = await traceGlyphs(page, ".dock-seal", () =>
            page.evaluate(() => {
                (window as unknown as { __glyphT0: number }).__glyphT0 = performance.now();
                location.hash = "#/palettes";
            }),
        );
        const t0 = await page.evaluate(() => (window as unknown as { __glyphT0: number }).__glyphT0);
        await expect(page.locator(".app-layout")).toHaveAttribute("data-view", "palettes");
        // the seal changes when the route lands; its crossing is bounded from there
        const landed = frames.find((f, i) => i > 0 && f.n > 1) ?? frames.find((f) => f.t >= t0)!;
        expect(glyphFaults(frames.filter((f) => f.t >= t0), landed.t, 300)).toEqual([]);
    });

    test("K-2: across a view change the Copy and Reset glyphs are the same nodes", async ({ page }) => {
        await openHome(page, 1440, 900);
        await page.getByRole("button", { name: "Toggle action bar" }).click();
        const seats = ["color.copy", "color.reset"];
        for (const token of seats)
            await expect(page.locator(`[data-scene-action="${token}"] svg`)).toHaveCount(1, { timeout: 10_000 });
        await page.evaluate((seats) => {
            for (const token of seats) {
                const svg = document.querySelector(`[data-scene-action="${token}"] svg`) as SVGElement & { __c40?: string };
                svg.__c40 = token;
            }
        }, seats);
        // the views whose scene is the picker's (useSceneActions VIEW_SCENES:
        // Home, My Palettes, Blob); Mix carries its own scene's seats
        for (const hash of ["#/palettes", "#/blob", "#/"]) {
            await page.evaluate((h) => (location.hash = h), hash);
            const view = hash === "#/" ? "picker" : hash.slice(2);
            await expect(page.locator(".app-layout")).toHaveAttribute("data-view", view);
            await dockAtRest(page);
            const kept = await page.evaluate(
                (seats) =>
                    seats.map((token) => {
                        const svgs = [...document.querySelectorAll(`[data-scene-action="${token}"] svg`)] as (SVGElement & { __c40?: string })[];
                        return `${token}: ${svgs.length} glyph(s), ${svgs.filter((s) => s.__c40 === token).length} kept`;
                    }),
                seats,
            );
            expect(kept, `after ${hash}`).toEqual(seats.map((t) => `${t}: 1 glyph(s), 1 kept`));
        }
    });

    test("K-3: the accent sweep on a view change lasts 200 ms or less", async ({ page }) => {
        await openHome(page, 1440, 900);
        const sweeps = await page.evaluate(
            () =>
                new Promise<number[]>((resolve) => {
                    const trigger = document.querySelector<HTMLElement>(".view-select-trigger")!;
                    const seen: number[] = [];
                    // the event bubbles: the sweep runs on whichever box
                    // under the trigger declares it
                    trigger.addEventListener("transitionrun", (e) => {
                        if (e.propertyName !== "--accent-view") return;
                        for (const a of (e.target as Element).getAnimations())
                            if (a instanceof CSSTransition && a.transitionProperty === "--accent-view")
                                seen.push(Number(a.effect?.getComputedTiming().duration ?? 0) + Number(a.effect?.getComputedTiming().delay ?? 0));
                    });
                    location.hash = "#/gradient";
                    setTimeout(() => resolve(seen), 1500);
                }),
        );
        expect(sweeps.length, "a view change sweeps the trigger's accent").toBeGreaterThan(0);
        for (const ms of sweeps) expect(ms, "the sweep's clock").toBeLessThanOrEqual(200);
    });

    test("K-4: no settle beat runs on a view change", async ({ page }) => {
        await openHome(page, 1440, 900);
        const beats = await page.evaluate(
            () =>
                new Promise<string[]>((resolve) => {
                    const seen: string[] = [];
                    const on = (e: AnimationEvent) => {
                        if (/settle/.test(e.animationName)) seen.push(e.animationName);
                    };
                    document.addEventListener("animationstart", on, true);
                    location.hash = "#/gradient";
                    setTimeout(() => {
                        document.removeEventListener("animationstart", on, true);
                        resolve(seen);
                    }, 2000);
                }),
        );
        expect(beats).toEqual([]);
    });

    test("K-6 / B-2: the trigger names the chosen view, and the menu closes, before the route lands", async ({
        page,
    }) => {
        await openHome(page, 1440, 900);
        await page.getByRole("combobox", { name: "Select view" }).click();
        const option = page.getByRole("option", { name: "Palettes", exact: true });
        await expect(option).toBeVisible();
        await startTrace(page);
        await option.click();
        await expect(page.locator(".app-layout")).toHaveAttribute("data-view", "palettes");
        await page.waitForTimeout(300);
        const frames = await stopTrace(page);

        const named = frames.findIndex((f) => /Palettes/.test(f.label));
        const landed = frames.findIndex((f) => f.view === "palettes");
        const closed = frames.findIndex((f, i) => i > 0 && !f.menu);
        const summary = frames
            .slice(Math.max(0, named - 2), landed + 2)
            .map((f) => `${f.t.toFixed(0)}ms ${f.label}/${f.view}/${f.menu ? "open" : "closed"}`)
            .join(" · ");
        expect(named, `the trigger named Palettes (${summary})`).toBeGreaterThan(0);
        expect(landed, `the route landed (${summary})`).toBeGreaterThan(0);
        expect(named, `the chosen view is painted on a frame before the route lands (${summary})`).toBeLessThan(
            landed,
        );
        expect(closed, `the menu is closing by the frame the press is named (${summary})`).toBeLessThanOrEqual(
            named,
        );
    });
});
