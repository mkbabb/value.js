import { test, expect } from "@playwright/test";
import type { Browser } from "@playwright/test";

/**
 * X-W6 · X.W6.i — gate **i3** (CC-067 · DR-05): COLD-LOAD ARM-REPLAY — the
 * first painted atmosphere equals the seeded pick.
 *
 * RED at open (`W6.md` i3): "every cold load paints the pre-hydration default
 * until first picker interaction".
 *
 * WHAT IS MEASURED — a DOM fact at the first-paint instant (the TELEMETRY LAW,
 * `W6.md` §8), never a console line and never a screenshot taken "soon after"
 * load (a screenshot's own latency lands it after the app has repainted, so a
 * frame-grab oracle reads the settled page and passes vacuously):
 *
 *   An init script (it runs before any page script) records every write to the
 *   atmosphere's ground stops — the four `--saved-bg-n` properties on <html>,
 *   the layer the atmosphere paints before any runtime exists — with its
 *   `performance.now()` time. After the page settles, the stops in force at the
 *   browser's own `first-paint` entry are compared with the settled stops.
 *
 * For each seed, on a COLD load (a fresh context: no storage, no ground
 * record) of `#/?space=oklch&color=<seed>`: every first-paint stop must equal
 * its settled stop (ΔE_OK ≤ FIRST_PAINT_TOLERANCE — the settled ground IS the
 * seeded one), and, so the equality is not vacuous, the settled ground must
 * differ from an unseeded cold load's by ≥ SEED_MOVES in at least one stop.
 * ΔE_OK is Euclidean OKLab distance; 0.02 is the css-color-4 JND.
 */

const SEEDS = ["oklch(0.62 0.2 30)", "oklch(0.62 0.2 150)", "oklch(0.62 0.2 260)"];
const STOPS = 4;
const FIRST_PAINT_TOLERANCE = 0.02;
const SEED_MOVES = 0.05;

type Lab = [number, number, number];

async function coldLoad(browser: Browser, hash: string) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.addInitScript((n: number) => {
        const w = window as unknown as { __ground: { t: number; stops: string[] }[] };
        w.__ground = [];
        const read = () => {
            const s = document.documentElement?.style;
            if (!s) return [] as string[];
            return Array.from({ length: n }, (_, i) =>
                s.getPropertyValue(`--saved-bg-${i}`).trim(),
            );
        };
        const note = () => {
            const stops = read();
            const last = w.__ground[w.__ground.length - 1];
            if (stops.some(Boolean) && (!last || last.stops.join() !== stops.join())) {
                w.__ground.push({ t: performance.now(), stops });
            }
        };
        // Observe the DOCUMENT, not <html>: an init script can run before the
        // parser has created the root element.
        new MutationObserver(note).observe(document, {
            subtree: true,
            childList: true,
            attributes: true,
            attributeFilter: ["style"],
        });
    }, STOPS);
    await page.goto(`/${hash}`);
    await page.waitForTimeout(2500);
    const reading = await page.evaluate((n: number) => {
        const w = window as unknown as { __ground: { t: number; stops: string[] }[] };
        const fp =
            performance.getEntriesByName("first-paint")[0]?.startTime ?? Number.NaN;
        const atPaint = [...w.__ground].reverse().find((g) => g.t <= fp) ?? null;
        const settled = Array.from({ length: n }, (_, i) =>
            getComputedStyle(document.documentElement)
                .getPropertyValue(`--saved-bg-${i}`)
                .trim(),
        );
        // Resolve any CSS colour string to OKLab through the browser's own parser.
        const probe = document.createElement("canvas").getContext("2d")!;
        const lab = (css: string): [number, number, number] => {
            probe.fillStyle = "#000";
            probe.fillStyle = css;
            probe.fillRect(0, 0, 1, 1);
            const [r, g, b] = probe.getImageData(0, 0, 1, 1).data;
            const lin = (c: number) => {
                const x = c / 255;
                return x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4;
            };
            const [R, G, B] = [lin(r!), lin(g!), lin(b!)];
            const l = Math.cbrt(0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B);
            const m = Math.cbrt(0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B);
            const s = Math.cbrt(0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B);
            return [
                0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
                1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
                0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
            ];
        };
        return {
            firstPaint: fp,
            writes: w.__ground.length,
            atPaint: atPaint
                ? { t: atPaint.t, stops: atPaint.stops, lab: atPaint.stops.map(lab) }
                : null,
            settled: { stops: settled, lab: settled.map(lab) },
        };
    }, STOPS);
    await ctx.close();
    return reading;
}

const dE = (a: Lab, b: Lab) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);

test("the first painted atmosphere is the seeded pick's, on a cold load", async ({
    browser,
}) => {
    test.setTimeout(120_000);
    const unseeded = await coldLoad(browser, "#/");
    for (const seed of SEEDS) {
        const r = await coldLoad(
            browser,
            `#/?space=oklch&color=${encodeURIComponent(seed)}`,
        );
        expect(
            r.atPaint,
            `${seed}: no ground write precedes first paint (${r.firstPaint}ms)`,
        ).not.toBeNull();
        const moved = Math.max(
            ...r.settled.lab.map((l, i) =>
                dE(l as Lab, unseeded.settled.lab[i] as Lab),
            ),
        );
        const gaps = r.atPaint!.lab.map((l, i) =>
            dE(l as Lab, r.settled.lab[i] as Lab),
        );
        console.log(
            `${seed}: first-paint ${r.firstPaint.toFixed(0)}ms, ground at paint [${r.atPaint!.stops.join(" ")}] → settled [${r.settled.stops.join(" ")}]; ` +
                `first-paint vs settled ΔE_OK max ${Math.max(...gaps).toFixed(4)}; settled vs unseeded max ${moved.toFixed(4)}`,
        );
        expect
            .soft(moved, `${seed}: the seed does not move the ground`)
            .toBeGreaterThanOrEqual(SEED_MOVES);
        expect
            .soft(
                Math.max(...gaps),
                `${seed}: the first painted atmosphere is not the seeded one`,
            )
            .toBeLessThanOrEqual(FIRST_PAINT_TOLERANCE);
    }
});
