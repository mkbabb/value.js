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
 *   (b) at 1440 the fact sheet's value column has the same x on the first
 *       frame that draws it and 3 s later (within 0.5 px).
 */
import { test, expect, type Browser } from "@playwright/test";

interface Reading {
    at: number;
    inks: number[][];
    valueX: number | null;
}

/** Records, from the document's first frame, each frame's title inks and the fact sheet's value x. */
const RECORDER = () => {
    const w = window as unknown as { __cold: Reading[] };
    w.__cold = [];
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 1;
    const g = canvas.getContext("2d", { willReadFrequently: true })!;
    const rgba = (css: string) => {
        g.clearRect(0, 0, 1, 1);
        g.fillStyle = "#000";
        g.fillStyle = css;
        g.fillRect(0, 0, 1, 1);
        return [...g.getImageData(0, 0, 1, 1).data];
    };
    const tick = (t: number) => {
        const titles = [...document.querySelectorAll<HTMLElement>("main .space-trigger")].filter((el) => el.getClientRects().length > 0);
        const dd = document.querySelector<HTMLElement>("[data-space-facts] dl.nl-facts dd");
        if (titles.length || dd)
            w.__cold.push({
                at: t,
                inks: titles.map((el) => rgba(getComputedStyle(el).color)),
                valueX: dd ? dd.getBoundingClientRect().left : null,
            });
        if (t < 12_000) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
};

async function coldLoad(browser: Browser, width: number, height: number, scheme: "light" | "dark", wait: number) {
    const ctx = await browser.newContext({ viewport: { width, height }, colorScheme: scheme });
    try {
        const page = await ctx.newPage();
        await page.addInitScript(RECORDER);
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
});
