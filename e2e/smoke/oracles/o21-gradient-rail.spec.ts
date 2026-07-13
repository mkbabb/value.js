import { test, expect } from "@playwright/test";
import type { Locator, Page } from "@playwright/test";
import { setupEnvNoise } from "../fixtures/env-noise";
import { openView, paneSettled } from "../fixtures/dock";
import { meanRGB, rgbDistance, screenshotPixels } from "./gradient-pixels";

/**
 * T.W6 W6-2 · O-21 — THE RAIL SILHOUETTE/RUNG-EXTENTS ORACLE (SYNTHESIS
 * §6.1 O-21): ramp ≡ border-box (no terminal bleed) + the rung-row's ruler
 * grammar, on the re-authored editing rail.
 *
 * Born against two shot-visible defects (t-gradient-surfaces §5/§6):
 * mirrored terminal slivers (the ramp layer TILED under the 1px border
 * ring, so each border column painted the OPPOSITE terminal's color) and a
 * rung row that read as a truncated bar (interior arc-length marks with no
 * visible termination law).
 *
 * 1 · Terminal truth (pixel probe): the rail's left edge columns read as
 *     the FIRST stop's color family, the right edge as the LAST's — the
 *     sign test that the mirrored-sliver class fails by construction.
 * 2 · The owned paint stack (computed contract): ramp = layer-1
 *     `linear-gradient(90deg,…)`, no-repeat, border-box origin AND clip,
 *     over the alpha-checker layer — the geometry that makes 1 hold.
 * 3 · Pill silhouette (T-46): border-radius ≥ half the rail height — the
 *     glass-ui slider-track rounding register.
 * 4 · Ruler grammar: exactly TWO terminal caps at the inset track's 0/100,
 *     every iso-ΔE rung strictly interior — the termination law visible.
 */

test.use({ deviceScaleFactor: 2 });

// The default seed's terminals, as 8-bit sRGB (oklch(0.75 0.15 145) /
// oklch(0.65 0.18 265) — the shipped boot model).
const FIRST_STOP: [number, number, number] = [133, 197, 125];
const LAST_STOP: [number, number, number] = [104, 139, 243];

async function openGradient(page: Page): Promise<Locator> {
    await page.goto("/");
    await openView(page, "Gradient");
    const main = page.getByRole("main", { name: "Color tool panes" });
    await expect(
        main.getByRole("heading", { name: "Gradient" }).last(),
    ).toBeVisible();
    // Pixel probes judge a surface at rest — the cold-load stall-then-resume
    // enter transition otherwise screenshots the rail mid-flight (see
    // paneSettled).
    await paneSettled(page);
    return main;
}

const bar = (main: Locator) => main.getByTestId("gradient-stop-bar").last();

// ── O-21 SPAN FEASIBILITY LEG (G-ORACLE-2 · the feasibility-leg law) ─────────
// The `owned paint stack` test is the GUARD CONSTANT: it asserts the computed
// `background-image` ≡ `linear-gradient(90deg…)` with border-box origin+clip — a
// paint-stack proxy, blind to whether the ramp actually SPANS its stops in
// paint. THIS terminal-truth leg is the feasibility half: in real screenshot
// PIXELS each rail EDGE paints ITS OWN terminal stop's color (left→first,
// right→last), so a mirrored-sliver bleed or a collapsed span reds here even
// while the paint stack still reads correct — the constant certified against the
// real referent, not against its own serialization. (U.W-ORACLE / U-F6-oracle.)
test("terminal truth: each rail edge paints ITS OWN stop's color (no mirrored bleed)", async ({
    page,
}) => {
    const consoleErrors = setupEnvNoise(page);
    const main = await openGradient(page);
    const rail = bar(main);
    await rail.scrollIntoViewIfNeeded();

    const png = await screenshotPixels(page, rail);
    // Edge columns just inside the hairline (device px at dpr 2), sampled
    // at the pill's vertical middle band (inside the rounded silhouette).
    const left = meanRGB(png, 3, 8, 0.4, 0.6);
    const right = meanRGB(png, png.w - 8, png.w - 3, 0.4, 0.6);

    expect(rgbDistance(left, FIRST_STOP)).toBeLessThan(
        rgbDistance(left, LAST_STOP),
    );
    expect(rgbDistance(right, LAST_STOP)).toBeLessThan(
        rgbDistance(right, FIRST_STOP),
    );

    expect(consoleErrors).toEqual([]);
});

test("the owned paint stack: normalized 90° ramp, no-repeat, border-box origin+clip", async ({
    page,
}) => {
    const consoleErrors = setupEnvNoise(page);
    const main = await openGradient(page);
    const rail = bar(main);

    const paint = await rail.evaluate((el) => {
        const cs = getComputedStyle(el);
        return {
            image: cs.backgroundImage,
            repeat: cs.backgroundRepeat,
            origin: cs.backgroundOrigin,
            clip: cs.backgroundClip,
        };
    });

    // Layer 1 = the rail-normalized projection; layer 2 = the checker ground.
    expect(paint.image).toMatch(/^linear-gradient\(90deg/);
    expect(paint.image).toContain("repeating-conic-gradient");
    expect(paint.repeat).toBe("no-repeat, repeat");
    expect(paint.origin).toBe("border-box, border-box");
    expect(paint.clip).toBe("border-box, border-box");

    expect(consoleErrors).toEqual([]);
});

test("pill silhouette (T-46): the rail rounds on the glass-ui slider-track register", async ({
    page,
}) => {
    const consoleErrors = setupEnvNoise(page);
    const main = await openGradient(page);
    const rail = bar(main);

    const { radius, height } = await rail.evaluate((el) => ({
        radius: parseFloat(getComputedStyle(el).borderTopLeftRadius),
        height: el.getBoundingClientRect().height,
    }));
    expect(radius).toBeGreaterThanOrEqual(height / 2);

    expect(consoleErrors).toEqual([]);
});

test("ruler grammar: two terminal caps at the track extremes, every rung strictly interior", async ({
    page,
}) => {
    const consoleErrors = setupEnvNoise(page);
    const main = await openGradient(page);

    const caps = main.getByTestId("gradient-ruler-cap");
    await expect(caps).toHaveCount(2);

    const capBoxes = [
        await caps.nth(0).boundingBox(),
        await caps.nth(1).boundingBox(),
    ];
    if (!capBoxes[0] || !capBoxes[1]) throw new Error("caps not visible");
    const capXs = capBoxes
        .map((b) => b.x + b.width / 2)
        .sort((a, b) => a - b);

    // Caps share the handles' inset track: cap centers ≡ the 0%/100%
    // handle centers (the default seed's stops; ±1.5px subpixel layout) —
    // the congruence claim, measured against the REAL handles, not a
    // re-derived formula.
    const handles = bar(main).locator("[data-stop-id]");
    const first = await handles.first().boundingBox();
    const last = await handles.last().boundingBox();
    if (!first || !last) throw new Error("handles not visible");
    const handleXs = [first, last]
        .map((b) => b.x + b.width / 2)
        .sort((a, b) => a - b);
    expect(Math.abs(capXs[0]! - handleXs[0]!)).toBeLessThan(1.5);
    expect(Math.abs(capXs[1]! - handleXs[1]!)).toBeLessThan(1.5);

    // Every iso-ΔE rung is INTERIOR (rungs are arc-length marks — the ends
    // are not rungs; the caps carry the termination law).
    const rungs = main.getByTestId("gradient-rung");
    const count = await rungs.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
        const box = await rungs.nth(i).boundingBox();
        if (!box) continue;
        const cx = box.x + box.width / 2;
        expect(cx).toBeGreaterThan(capXs[0]!);
        expect(cx).toBeLessThan(capXs[1]!);
    }

    expect(consoleErrors).toEqual([]);
});
