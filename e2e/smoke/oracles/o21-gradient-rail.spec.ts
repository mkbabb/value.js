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
    await expect(main.getByRole("heading", { name: "Gradient" }).last()).toBeVisible();
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

    expect(rgbDistance(left, FIRST_STOP)).toBeLessThan(rgbDistance(left, LAST_STOP));
    expect(rgbDistance(right, LAST_STOP)).toBeLessThan(rgbDistance(right, FIRST_STOP));

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

/**
 * X-W6 · X.W6.a — ADDED (a3 / a4 / a12): ONE POSITION AXIS.
 *
 * The rail carried two maps. The ramp was a border-box layer spanning the full
 * box while handle centres rode `calc(10px + (100% - 20px) * p/100)` over the
 * PADDING box, so the two agreed only near 47% and were **±11.0px apart at the
 * terminals** — a user aiming at the colour they could see minted a stop that
 * landed somewhere else. Worse, the 10px was a JS literal while the seat was
 * sized `max(1.5rem, 24px)`, so the disagreement GREW with the type scale
 * (+4.0px of handle overhang at rootFS 20px, measured 2026-09-19).
 *
 * Both maps are now the one expression `calc(var(--rail-inset) +
 * var(--rail-track) * <ordinal>)`, minted once in `useGradientCSS.railPosition`
 * and read by the ramp string, by every handle's `left`, and — through the same
 * registered custom property — by the script's inverse map. This oracle holds
 * all three legs against the live DOM, at the default root size and at 20px.
 */
const AXIS_TOL_PX = 1; // a3's stated tolerance
const INVERSE_TOL_PCT = 0.05; // a4's stated tolerance

test("one axis: every handle centre sits where the ramp paints its own ordinal", async ({
    page,
}) => {
    const consoleErrors = setupEnvNoise(page);
    const main = await openGradient(page);
    const rail = bar(main);
    await rail.scrollIntoViewIfNeeded();

    // Three stops, so an interior ordinal is measured beside the terminals.
    const box = (await rail.boundingBox())!;
    await rail.click({ position: { x: box.width * 0.5, y: box.height / 2 } });
    await expect(rail.locator("[data-stop-id]")).toHaveCount(3);

    const skews = await rail.evaluate((el) => {
        const r = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        const inset = parseFloat(cs.getPropertyValue("--rail-inset"));
        const bl = parseFloat(cs.borderLeftWidth);
        const br = parseFloat(cs.borderRightWidth);
        // Where the ramp paints ordinal p: the ramp's stop positions ARE the
        // axis expression, so this is the axis, read off the rail itself.
        const originX = r.x + bl + inset;
        const track = r.width - bl - br - inset * 2;
        return [...el.querySelectorAll("[data-stop-id]")].map((h) => {
            const hr = h.getBoundingClientRect();
            const ordinal = Number(h.getAttribute("aria-valuenow"));
            return {
                ordinal,
                skewPx:
                    +(hr.x + hr.width / 2 - (originX + (track * ordinal) / 100)).toFixed(3),
            };
        });
    });

    expect(skews.map((s) => s.ordinal)).toEqual([0, 50, 100]);
    for (const s of skews) {
        expect(Math.abs(s.skewPx)).toBeLessThanOrEqual(AXIS_TOL_PX);
    }

    expect(consoleErrors).toEqual([]);
});

test("the forward and inverse maps are inverse: a press at a handle's own pixel reads its own ordinal", async ({
    page,
}) => {
    const consoleErrors = setupEnvNoise(page);
    const main = await openGradient(page);
    const rail = bar(main);
    await rail.scrollIntoViewIfNeeded();

    // Press at the exact pixel where each TERMINAL handle is painted; the stop
    // the rail mints there must carry that terminal's own ordinal. The ordinal
    // is read from the model's own `aria-valuenow` and the geometry from the
    // inline `left` — never from the accessible NAME, which announces identity
    // and ordinal rank, not position (GRADSTOP-A §6, the readout-vacuity rule).
    for (const terminal of [0, 100]) {
        await page.reload({ waitUntil: "networkidle" });
        await openView(page, "Gradient");
        await paneSettled(page);
        const live = bar(page.getByRole("main", { name: "Color tool panes" }));
        const ids = () =>
            live.locator("[data-stop-id]").evaluateAll((els) =>
                els.map((e) => e.getAttribute("data-stop-id")!),
            );

        // The reload resets the model to its two-stop seed; wait for the rail
        // to carry them before reading, or the census below counts an empty
        // pane and the gate passes on a page that never rendered.
        await expect(live.locator("[data-stop-id]")).toHaveCount(2);
        const before = await ids();
        const handle = live.locator(`[data-stop-id][aria-valuenow="${terminal}"]`).first();
        const hb = (await handle.boundingBox())!;
        const rb = (await live.boundingBox())!;
        await page.mouse.click(hb.x + hb.width / 2, rb.y + 4);
        await expect(live.locator("[data-stop-id]")).toHaveCount(before.length + 1);

        const after = await ids();
        const mintedId = after.find((id) => !before.includes(id))!;
        const minted = await live
            .locator(`[data-stop-id="${mintedId}"]`)
            .evaluate((el) => ({
                ordinal: Number(el.getAttribute("aria-valuenow")),
                left: (el as HTMLElement).style.left,
            }));

        // The pressed pixel mapped back to exactly the ordinal painted there.
        expect(Math.abs(minted.ordinal - terminal)).toBeLessThanOrEqual(INVERSE_TOL_PCT);
        // …and it is expressed in the one axis, not in a private px literal.
        expect(minted.left).toContain("var(--rail-inset)");
        expect(minted.left).toContain("var(--rail-track)");
    }

    expect(consoleErrors).toEqual([]);
});

test("type-scale containment: at rootFS 20px the terminal handles stay inside the rail", async ({
    page,
}) => {
    const consoleErrors = setupEnvNoise(page);
    const main = await openGradient(page);
    const rail = bar(main);
    await rail.scrollIntoViewIfNeeded();

    // Measured at the shipped root size and at the type-scale step that used
    // to pull the axis apart. The inset is half a handle seat and the seat is
    // sized from the same property, so containment holds at BOTH.
    for (const fs of ["16px", "20px"]) {
        const v = await rail.evaluate((el, size) => {
            document.documentElement.style.fontSize = size;
            const r = el.getBoundingClientRect();
            const hs = [...el.querySelectorAll("[data-stop-id]")] as HTMLElement[];
            const first = hs[0]!.getBoundingClientRect();
            const last = hs[hs.length - 1]!.getBoundingClientRect();
            return {
                rootFS: getComputedStyle(document.documentElement).fontSize,
                handleW: +first.width.toFixed(2),
                leftOverhang: +(r.x - first.x).toFixed(2),
                rightOverhang: +(last.x + last.width - (r.x + r.width)).toFixed(2),
            };
        }, fs);
        expect(v.rootFS).toBe(fs);
        expect(v.leftOverhang).toBeLessThanOrEqual(AXIS_TOL_PX);
        expect(v.rightOverhang).toBeLessThanOrEqual(AXIS_TOL_PX);
    }
    await rail.evaluate(() => {
        document.documentElement.style.fontSize = "";
    });

    expect(consoleErrors).toEqual([]);
});

/* ── X-W1 · R2 — DELETED: "ruler grammar: two terminal caps at the track
 * extremes, every rung strictly interior".
 *
 * The test bound `getByTestId("gradient-ruler-cap")` and
 * `getByTestId("gradient-rung")`. Measured 2026-09-18, both statically
 * (`grep -rn 'gradient-ruler-cap\|gradient-rung' demo/` → 0 rows) and at the
 * running app (`document.querySelectorAll` → 0 and 0): the ruler was removed
 * from the product and NO successor element exists for either binding. There is
 * nothing to re-point at, so R2's rule applies in its second arm — the spec is
 * DELETED with this rationale rather than converted to `test.skip()`, which G-6
 * names as the same deferral under a new name.
 *
 * What it asserted is not silently lost: the two surviving tests in this file
 * cover the rail's paint contract and its pill silhouette, and the ruler's own
 * re-introduction (if any) belongs to the wave that re-introduces it.
 * `scripts/ci/oracle-slate.mjs` section E now reds on a `getByTestId` literal
 * that appears in no product byte, so this class cannot return unobserved.
 */
