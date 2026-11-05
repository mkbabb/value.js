// SERVED MODEL: claude-opus-5-5
/**
 * F-V-D1 (X realization, value-DESIGN V-D1) — the spectrum plane's shape
 * belongs to the picker measure, not to the viewport height.
 *
 * The plane's inline size follows the picker measure; its block size used to
 * follow `20dvh` (floored 6rem, capped 10rem) below lg and a measure-derived
 * term at lg. Two unrelated scales, so the aspect was whatever they divided to:
 * 3.741 at 844×390 (20dvh = 78 hits the 6rem floor) and 2.648 / 2.385 at 1440+.
 *
 * Gate, per cell: 1.6 ≤ w/h ≤ 2.5 everywhere, and w/h ≤ φ·√φ + 0.01 (2.068)
 * wherever the plane sits at its flattest bound. Cells: 8 viewports × picker
 * and mix × light and dark.
 */
import { test, expect } from "@playwright/test";

const VIEWPORTS: [number, number][] = [
    [390, 844],
    [430, 932],
    [844, 390],
    [1024, 768],
    [1440, 900],
    [1800, 1000],
    [2560, 1440],
    [3440, 1440],
];
const ROUTES = ["/", "/mix"] as const;
const PHI_SQRT_PHI = 1.618034 * Math.sqrt(1.618034); // 2.0582

for (const scheme of ["light", "dark"] as const) {
    for (const route of ROUTES) {
        for (const [width, height] of VIEWPORTS) {
            test(`spectrum aspect · ${route} · ${width}×${height} · ${scheme}`, async ({ browser }) => {
                test.setTimeout(90_000);
                const ctx = await browser.newContext({
                    viewport: { width, height },
                    colorScheme: scheme,
                });
                try {
                    const page = await ctx.newPage();
                    await page.goto(`/#${route}`, { timeout: 60_000 });
                    const plane = page
                        .locator(".pane-wrapper--stage .spectrum-picker")
                        .first();
                    await expect(plane).toBeVisible({ timeout: 30_000 });
                    // Layout size, not the transformed box (the pane-enter
                    // family moves regions by transform).
                    const read = () =>
                        plane.evaluate((el) => {
                            const e = el as HTMLElement;
                            const fig = e.closest(".spectrum-figure") as HTMLElement | null;
                            return {
                                w: e.offsetWidth,
                                h: e.offsetHeight,
                                fig: fig?.offsetWidth ?? 0,
                            };
                        });
                    await expect.poll(async () => (await read()).w, { timeout: 15_000 }).toBeGreaterThan(0);
                    const { w, h, fig } = await read();
                    const aspect = w / h;
                    test.info().annotations.push({
                        type: "reading",
                        description: JSON.stringify({ w, h, fig, aspect: +aspect.toFixed(3) }),
                    });
                    expect(aspect, `w/h ${w}×${h}`).toBeGreaterThanOrEqual(1.6);
                    expect(aspect, `w/h ${w}×${h}`).toBeLessThanOrEqual(2.5);
                    // Where the flattest bound binds (block = inline / φ√φ),
                    // the aspect is that bound and no flatter.
                    const minBound = fig / PHI_SQRT_PHI;
                    if (Math.abs(h - minBound) <= 1) {
                        expect(aspect, "at the flattest bound").toBeLessThanOrEqual(PHI_SQRT_PHI + 0.01);
                    }
                } finally {
                    await ctx.close();
                }
            });
        }
    }
}
