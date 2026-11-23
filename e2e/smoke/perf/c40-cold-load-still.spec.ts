/**
 * The FORTIETH order, A-4 ("there's a strange re-sizing issue on the main
 * page"): what the first paint shows is what the loaded page shows.
 *
 * Built bundle only: the first paint is the prerendered shell, which the dev
 * server does not serve.
 *
 * Measured on production:
 *   - on a phone the space title ("OKLCh", in the picker's header and in
 *     About) flipped from pink to near-black at about 3.1 s, when the deferred
 *     ink certification landed over the stylesheet's pre-hydration value;
 *   - at 1440 the About fact sheet's label column widened from 156 to 177 px
 *     when the body face arrived (1.09 s), moving every value 6 px.
 * The contract:
 *   (a) at 390, in both schemes, each space title's colour on the first frame
 *       that draws it equals its colour 6 s later (within 2 of 255 per channel);
 *   (b) at 1440 the fact sheet's value column has the same layout x on the
 *       first frame that draws it and 3 s later (within 0.5 px). Layout x, as
 *       the chassis specs read widths: the overture moves the drawn boxes by
 *       transform, on purpose, while the face arrives.
 *   (c) at 390 and 1440, in both schemes, the plate inks the boot certifies
 *       (the primary ink every plate's text is set in, the gold word and glyph
 *       inks, the de-emphasis ink and the accent) resolve on the first frame
 *       to the colour they hold 6 s later (within 2 of 255 per channel).
 *       Measured after the title's cure: the primary ink stepped from the
 *       scheme foreground (light #1c1917, dark #e9e6e2) to the certified ink,
 *       and the gold from glass's raw gold to its certified rungs, about 3 s
 *       in on a phone.
 */
import { test, expect, type Browser } from "@playwright/test";

interface Reading {
    at: number;
    inks: number[][];
    valueX: number | null;
    plate: (number[] | null)[];
}

/** The root's certified plate inks, read on every frame (c). */
const PLATE_INKS = ["--ink-primary", "--ink-gold", "--ink-gold-glyph", "--ink-muted", "--accent-live"] as const;

/** Records, from the document's first frame, each frame's title inks and the fact sheet's value x. */
const RECORDER = (plateInks: readonly string[]) => {
    const w = window as unknown as { __cold: Reading[] };
    w.__cold = [];
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 1;
    const g = canvas.getContext("2d", { willReadFrequently: true })!;
    const rgba = (css: string, sentinel = "#000") => {
        g.clearRect(0, 0, 1, 1);
        g.fillStyle = sentinel;
        g.fillStyle = css;
        g.fillRect(0, 0, 1, 1);
        return [...g.getImageData(0, 0, 1, 1).data];
    };
    // A value the canvas cannot parse leaves the fill at its sentinel, so an
    // emptied or renamed token read black on the first frame and at +6 s, and
    // passed (c) on nothing. Read with two different sentinels, it reads two
    // colours and is recorded as unparsed (`null`).
    const ink = (css: string) => {
        const a = rgba(css);
        const b = rgba(css, "#fff");
        return a.every((c, k) => c === b[k]) ? a : null;
    };
    // The value's x in layout px: the page's arrival (the pane shell's
    // overture, a translate and a 0.985 scale settling over its first half
    // second) moves every drawn box by design; the face swap moved the layout.
    const layoutLeft = (el: HTMLElement) => {
        let x = 0;
        for (let e: HTMLElement | null = el; e; e = e.offsetParent as HTMLElement | null) x += e.offsetLeft;
        return x;
    };
    const tick = (t: number) => {
        const titles = [...document.querySelectorAll<HTMLElement>("main .space-trigger")].filter((el) => el.getClientRects().length > 0);
        const dd = document.querySelector<HTMLElement>("[data-space-facts] dl.nl-facts dd");
        if (titles.length || dd) {
            const root = getComputedStyle(document.documentElement);
            w.__cold.push({
                at: t,
                inks: titles.map((el) => rgba(getComputedStyle(el).color)),
                valueX: dd ? layoutLeft(dd) : null,
                plate: plateInks.map((token) => ink(root.getPropertyValue(token).trim())),
            });
        }
        if (t < 12_000) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
};

async function coldLoad(browser: Browser, width: number, height: number, scheme: "light" | "dark", wait: number) {
    const ctx = await browser.newContext({ viewport: { width, height }, colorScheme: scheme });
    try {
        const page = await ctx.newPage();
        await page.addInitScript(RECORDER, PLATE_INKS);
        // The faces arrive after the first paint, as they do over a real
        // network (production: the body face at 1.09 s on a desk); from a
        // local server they would land before the first frame and hide a swap.
        await page.route(/\.woff2(\?|$)/, async (route) => {
            await new Promise((resolve) => setTimeout(resolve, 1_500));
            await route.continue();
        });
        await page.goto("/", { waitUntil: "commit", timeout: 60_000 });
        await page.waitForTimeout(wait);
        return await page.evaluate(() => (window as unknown as { __cold: Reading[] }).__cold);
    } finally {
        await ctx.close();
    }
}

test.describe("c40 · the cold load holds still (FORTIETH A-4)", () => {
    for (const scheme of ["light", "dark"] as const) {
        test(`(a) 390 · ${scheme}: the space titles keep their first-paint ink`, async ({ browser }) => {
            test.setTimeout(120_000);
            const frames = await coldLoad(browser, 390, 844, scheme, 9_000);
            const first = frames.find((f) => f.inks.length > 0);
            expect(first, "no frame drew a space title").toBeDefined();
            const later = frames.filter((f) => f.at >= first!.at + 6_000 && f.inks.length === first!.inks.length);
            expect(later.length, "no reading 6 s after the first paint").toBeGreaterThan(0);
            const end = later[later.length - 1]!;
            test.info().annotations.push({
                type: "ink at first paint → +6 s",
                description: `${JSON.stringify(first!.inks)} @${first!.at.toFixed(0)} ms → ${JSON.stringify(end.inks)} @${end.at.toFixed(0)} ms`,
            });
            first!.inks.forEach((ink, i) => {
                const drift = Math.max(...ink.map((c, k) => Math.abs(c - end.inks[i]![k]!)));
                expect(drift, `title ${i}: ${ink.join(",")} at first paint, ${end.inks[i]!.join(",")} at +6 s`).toBeLessThanOrEqual(2);
            });
        });
    }

    test("(b) 1440: the fact sheet's values keep their first-paint x", async ({ browser }) => {
        test.setTimeout(120_000);
        const frames = await coldLoad(browser, 1440, 900, "light", 6_000);
        const first = frames.find((f) => f.valueX !== null);
        expect(first, "no frame drew the fact sheet").toBeDefined();
        const later = frames.filter((f) => f.valueX !== null && f.at >= first!.at + 3_000);
        expect(later.length, "no reading 3 s after the first paint").toBeGreaterThan(0);
        const xs = frames.filter((f) => f.valueX !== null).map((f) => f.valueX!.toFixed(1));
        test.info().annotations.push({ type: "value x per frame", description: [...new Set(xs)].join(" → ") });
        expect(Math.abs(later[later.length - 1]!.valueX! - first!.valueX!), "the value column moved").toBeLessThanOrEqual(0.5);
    });

    for (const [width, height] of [[390, 844], [1440, 900]] as const)
        for (const scheme of ["light", "dark"] as const)
            test(`(c) ${width} · ${scheme}: the plate inks keep their first-paint colour`, async ({ browser }) => {
                test.setTimeout(120_000);
                const frames = await coldLoad(browser, width, height, scheme, 9_000);
                const first = frames[0];
                expect(first, "no frame drew the plate").toBeDefined();
                const later = frames.filter((f) => f.at >= first!.at + 6_000);
                expect(later.length, "no reading 6 s after the first paint").toBeGreaterThan(0);
                const end = later[later.length - 1]!;
                PLATE_INKS.forEach((token, i) => {
                    const a = first!.plate[i];
                    const b = end.plate[i];
                    expect(a, `${token} is not a colour on the first frame`).not.toBeNull();
                    expect(b, `${token} is not a colour at +6 s`).not.toBeNull();
                    if (a == null || b == null) return;
                    test.info().annotations.push({ type: token, description: `${a.join(",")} @${first!.at.toFixed(0)} ms → ${b.join(",")} @${end.at.toFixed(0)} ms` });
                    const drift = Math.max(...a.map((c, k) => Math.abs(c - b[k]!)));
                    expect(drift, `${token}: ${a.join(",")} at first paint, ${b.join(",")} at +6 s`).toBeLessThanOrEqual(2);
                });
            });
});
