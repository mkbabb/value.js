import { test, expect } from "@playwright/test";
import type { Locator, Page } from "@playwright/test";
import { setupEnvNoise } from "../fixtures/env-noise";
import { openView, paneSettled } from "../fixtures/dock";
import { regionSettled } from "../fixtures/settle";
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
    const main = page.getByRole("main", { name: "Gradient" });
    await expect(main.getByRole("heading", { name: "Gradient" }).last()).toBeVisible();
    // Pixel probes judge a surface at rest — the cold-load stall-then-resume
    // enter transition otherwise screenshots the rail mid-flight (see
    // paneSettled).
    await paneSettled(page);
    // X.W6.s (§0ba) — `paneSettled` reads transforms at one instant; the
    // shared settle also refuses a pane still carrying its enter/leave class
    // (the pre-start pose the SwiftShader frame gap parks it in).
    await regionSettled(bar(main));
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

/**
 * X.W11.wk (COHESION §0gt.4) — the O-103b ENGINE-FACT form for the three
 * press-minted legs below (a3 · a4 · the keyboard grammar's interior stop).
 *
 * Each leg presses at a sub-pixel position (half the rail, a handle's centre)
 * and gates the ordinal the rail mints there. Chromium delivers the press's
 * `PointerEvent.clientX` at the requested sub-pixel position; WebKit delivers
 * it QUANTIZED to a whole CSS pixel (measured at the 2026-10-28 darwin witness
 * as minted 49.9 for 50 and 0.1 for 0, and by `close/evidence/safari-real/
 * darwin-webkit-2026-10-29/probe/engine-facts.mjs`). The rail mints exactly
 * the ordinal painted at the pixel it was GIVEN, so the literal ordinal is an
 * engine fact on such an engine, not a product defect.
 *
 * The form, per press and never by engine name: the delivered press is read
 * off the page. If it sits where it was asked (Chromium), every leg gates as
 * written, so Chromium is the gate. If the engine moved it, the literal is
 * REPORTED (an `engine-fact` annotation naming both positions) and the same
 * law is gated at the pixel actually delivered: the minted ordinal may differ
 * from the requested one by no more than the delivered offset's share of the
 * track plus a4's own tolerance. An engine that delivers sub-pixel presses is
 * gated on the literal again with no new ruling.
 */
type Press = { x: number; y: number };

async function armPressProbe(page: Page): Promise<void> {
    await page.evaluate(() => {
        const w = window as unknown as { __press?: Press | null };
        w.__press = null;
        document.addEventListener(
            "pointerdown",
            (e) => {
                w.__press = { x: e.clientX, y: e.clientY };
            },
            { capture: true, once: true },
        );
    });
}

async function deliveredPress(page: Page): Promise<Press> {
    const press = await page.evaluate(
        () => (window as unknown as { __press?: Press | null }).__press ?? null,
    );
    expect(press, "the press reached the page").not.toBeNull();
    return press!;
}

/** The rail's track width in CSS px, the denominator of the one axis. */
const railTrack = (rail: Locator) =>
    rail.evaluate((el) => {
        const cs = getComputedStyle(el);
        const inset = parseFloat(cs.getPropertyValue("--rail-inset"));
        return (
            el.getBoundingClientRect().width -
            parseFloat(cs.borderLeftWidth) -
            parseFloat(cs.borderRightWidth) -
            inset * 2
        );
    });

/**
 * The engine QUANTIZED the press to a whole CSS pixel: it was asked for a
 * sub-pixel position and delivered an integer one. Only that fact opens the
 * report path; any other displacement fails the strict gate as written.
 */
const SUBPIXEL_EPS = 0.01;
const engineMovedPress = (requestedX: number, press: Press) =>
    Number.isInteger(press.x) && Math.abs(press.x - requestedX) > SUBPIXEL_EPS;

/** The O-103b report, in one wording. */
function reportPress(requestedX: number, press: Press, leg: string): void {
    test.info().annotations.push({
        type: "engine-fact",
        description:
            `${leg}: this engine delivered the press at clientX ${press.x} for a requested ${requestedX.toFixed(3)} ` +
            `(whole-pixel pointer coordinates); the literal ordinal is reported, Chromium is its gate (O-103b form, COHESION §0gt.4)`,
    });
}

/** Two aria-valuenow readings differ by a step, in the rail's own 0.1 grain. */
const stepped = (from: number, by: number) => String(+(from + by).toFixed(1));

test("one axis: every handle centre sits where the ramp paints its own ordinal", async ({
    page,
}) => {
    const consoleErrors = setupEnvNoise(page);
    const main = await openGradient(page);
    const rail = bar(main);
    await rail.scrollIntoViewIfNeeded();

    // Three stops, so an interior ordinal is measured beside the terminals.
    const box = (await rail.boundingBox())!;
    const requestedX = box.x + box.width * 0.5;
    await armPressProbe(page);
    await rail.click({ position: { x: box.width * 0.5, y: box.height / 2 } });
    await expect(rail.locator("[data-stop-id]")).toHaveCount(3);
    const press = await deliveredPress(page);

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
                skewPx: +(
                    hr.x +
                    hr.width / 2 -
                    (originX + (track * ordinal) / 100)
                ).toFixed(3),
            };
        });
    });

    if (engineMovedPress(requestedX, press)) {
        reportPress(requestedX, press, "a3 interior ordinal");
        const track = await railTrack(rail);
        const ordinals = skews.map((s) => s.ordinal);
        expect([ordinals[0], ordinals[2]]).toEqual([0, 100]);
        expect(Math.abs(ordinals[1]! - 50)).toBeLessThanOrEqual(
            (100 * Math.abs(press.x - requestedX)) / track + INVERSE_TOL_PCT,
        );
    } else {
        expect(skews.map((s) => s.ordinal)).toEqual([0, 50, 100]);
    }
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
        // The reload lands back on `#/gradient`, so `openView` re-picks the
        // view already mounted: no pane swap runs and `paneSettled` returns at
        // once, while the view-select listbox is still closing. Until it has
        // closed, the select's dismissable layer holds `body` at
        // `pointer-events: none` and the raw `page.mouse.click` below reaches
        // no element (measured: `elementFromPoint` → HTML, stops stay 2). Let
        // the listbox close before pressing — a settle, not a relaxation: a
        // listbox that never closes times this out and fails loudly.
        await expect(page.getByRole("listbox")).toHaveCount(0);
        const live = bar(page.getByRole("main", { name: "Gradient" }));
        await regionSettled(live);
        const ids = () =>
            live
                .locator("[data-stop-id]")
                .evaluateAll((els) => els.map((e) => e.getAttribute("data-stop-id")!));

        // The reload resets the model to its two-stop seed; wait for the rail
        // to carry them before reading, or the census below counts an empty
        // pane and the gate passes on a page that never rendered.
        await expect(live.locator("[data-stop-id]")).toHaveCount(2);
        const before = await ids();
        const handle = live
            .locator(`[data-stop-id][aria-valuenow="${terminal}"]`)
            .first();
        const hb = (await handle.boundingBox())!;
        const rb = (await live.boundingBox())!;
        const requestedX = hb.x + hb.width / 2;
        await armPressProbe(page);
        await page.mouse.click(requestedX, rb.y + 4);
        await expect(live.locator("[data-stop-id]")).toHaveCount(before.length + 1);
        const press = await deliveredPress(page);

        const after = await ids();
        const mintedId = after.find((id) => !before.includes(id))!;
        const minted = await live
            .locator(`[data-stop-id="${mintedId}"]`)
            .evaluate((el) => ({
                ordinal: Number(el.getAttribute("aria-valuenow")),
                left: (el as HTMLElement).style.left,
            }));

        // The pressed pixel mapped back to exactly the ordinal painted there.
        if (engineMovedPress(requestedX, press)) {
            reportPress(requestedX, press, `a4 terminal ${terminal}`);
            const track = await railTrack(live);
            expect(Math.abs(minted.ordinal - terminal)).toBeLessThanOrEqual(
                (100 * Math.abs(press.x - requestedX)) / track + INVERSE_TOL_PCT,
            );
        } else {
            expect(Math.abs(minted.ordinal - terminal)).toBeLessThanOrEqual(
                INVERSE_TOL_PCT,
            );
        }
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

/**
 * X-W6 · X.W6.b — ADDED (b1 / b2 / b3 / b4): THE SEAT, THE INSPECTOR AND THE
 * KEYBOARD GRAMMAR. ADD-never-replace: every spec above is untouched.
 *
 * The rail's seats used to ride the ramp's own centre row, and each seat's hit
 * rung masked its own width of add surface: `bar.x + 3` minted nothing (the
 * terminal seat's rung owned the meniscus from frame one) and at 12 stops only
 * 149px of 462 — 32.3% — could still mint, with no indication of why the
 * gesture had stopped working. The seats now take their own band below the
 * ramp, so the whole ramp is the add gesture's ground at every width and every
 * stop count, and crowding is disambiguated on the seat band rather than paid
 * for out of the add surface (GRADSTOP-A §15: never a minimum-spacing law).
 */
test("the seat rail frees the meniscus: every rail ordinal mints, at any rail width", async ({
    page,
}) => {
    const consoleErrors = setupEnvNoise(page);
    const main = await openGradient(page);
    const rail = bar(main);
    await rail.scrollIntoViewIfNeeded();

    // Crowd the rail to the adjudicated census input (12 stops).
    const box = (await rail.boundingBox())!;
    for (const f of [0.12, 0.2, 0.28, 0.36, 0.44, 0.52, 0.6, 0.72, 0.8, 0.88]) {
        await rail.click({ position: { x: box.width * f, y: box.height / 2 } });
    }
    await expect(rail.locator("[data-stop-id]")).toHaveCount(12);

    // The census is the gate's own: every column of the ramp's centre row whose
    // topmost element IS the ramp is a column that can still mint.
    const census = (l: Locator) =>
        l.evaluate((el) => {
            const r = el.getBoundingClientRect();
            const cy = r.y + r.height / 2;
            let n = 0;
            for (let x = 0; x < Math.floor(r.width); x++) {
                if (document.elementFromPoint(r.x + x + 0.5, cy) === el) n++;
            }
            return { total: Math.round(r.width), addable: n };
        });

    // ANY rail width: the desktop cell and the narrow cell, same census.
    for (const width of [1440, 390]) {
        await page.setViewportSize({ width, height: 844 });
        await rail.scrollIntoViewIfNeeded();
        const c = await census(rail);
        expect(c.addable).toBe(c.total);
    }

    // …and the meniscus itself: a press 3px inside the rail's left edge mints.
    await page.setViewportSize({ width: 1440, height: 900 });
    await rail.scrollIntoViewIfNeeded();
    const wide = (await rail.boundingBox())!;
    await page.mouse.click(wide.x + 3, wide.y + wide.height / 2);
    await expect(rail.locator("[data-stop-id]")).toHaveCount(13);

    expect(consoleErrors).toEqual([]);
});

/**
 * b3 — NUMERIC POSITION ENTRY. A stop's position existed only as a
 * whole-percent accessible name and inside the CSS string: a user who knew the
 * number they wanted could only approach it by aim. The inspector's field
 * writes through the SAME sole mutator every gesture writes through, so entry
 * and paint cannot disagree — asserted here to the axis's own tolerance.
 */
test("stop inspector numeric entry round-trips to the ordinal the rail paints", async ({
    page,
}) => {
    const consoleErrors = setupEnvNoise(page);
    const main = await openGradient(page);
    const rail = bar(main);
    await rail.scrollIntoViewIfNeeded();

    const box = (await rail.boundingBox())!;
    await rail.click({ position: { x: box.width * 0.5, y: box.height / 2 } });
    await expect(rail.locator("[data-stop-id]")).toHaveCount(3);

    // The minted interior stop is already the inspector's subject (X.W12.u2 ·
    // UIA-V-373); a re-tap would deselect it (the handle's re-tap grammar).
    const handle = rail.locator("[data-stop-id]").nth(1);
    const id = (await handle.getAttribute("data-stop-id"))!;
    await expect(main.getByTestId("gradient-stop-inspector")).toContainText(
        "Stop 2 of 3",
    );

    // X.W12.u2 (UIA-V-45): the field is glass's NumberField, which commits on
    // Enter / blur (a half-typed entry is never a position).
    await main.getByTestId("gradient-stop-position").fill("37.5");
    await main.getByTestId("gradient-stop-position").press("Enter");

    const seat = rail.locator(`[data-stop-id="${id}"]`);
    await expect(seat).toHaveAttribute("aria-valuenow", "37.5");

    // The painted centre agrees with the typed ordinal on the one axis.
    const skewPx = await rail.evaluate((el, stopId) => {
        const r = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        const inset = parseFloat(cs.getPropertyValue("--rail-inset"));
        const bl = parseFloat(cs.borderLeftWidth);
        const br = parseFloat(cs.borderRightWidth);
        const originX = r.x + bl + inset;
        const track = r.width - bl - br - inset * 2;
        const h = el
            .querySelector(`[data-stop-id="${stopId}"]`)!
            .getBoundingClientRect();
        return +(h.x + h.width / 2 - (originX + track * 0.375)).toFixed(3);
    }, id);
    expect(Math.abs(skewPx)).toBeLessThanOrEqual(AXIS_TOL_PX);

    expect(consoleErrors).toEqual([]);
});

/**
 * b1 — THE KEYBOARD GRAMMAR IS TOTAL, and its two BOUNDS are honest.
 *
 * Every §5.2 key is bound on the seat: the interior leg presses all six and
 * reads the model's own value back. The terminal leg is the same grammar at the
 * axis's end — `Home` on a stop already at 0% and `ArrowDown` below it are
 * bound and CORRECT no-ops, because a value control at its minimum cannot
 * decrease; the same seat answers `ArrowUp` immediately, which is what tells a
 * bound apart from an absent binding. (`gate-seat.mjs` G3d reads the FIRST seat
 * in document order — the 0% terminal of the two-stop seed — through
 * `style.left`, so it cannot make that distinction: see the X.W6.b receipt.)
 */
test("keyboard grammar is total: an interior stop answers every key, a terminal holds its bound", async ({
    page,
}) => {
    const consoleErrors = setupEnvNoise(page);
    const main = await openGradient(page);
    const rail = bar(main);
    await rail.scrollIntoViewIfNeeded();

    const box = (await rail.boundingBox())!;
    const requestedX = box.x + box.width * 0.5;
    await armPressProbe(page);
    await rail.click({ position: { x: box.width * 0.5, y: box.height / 2 } });
    await expect(rail.locator("[data-stop-id]")).toHaveCount(3);
    const delivered = await deliveredPress(page);
    const id = (await rail
        .locator("[data-stop-id]")
        .nth(1)
        .getAttribute("data-stop-id"))!;
    const seat = rail.locator(`[data-stop-id="${id}"]`);

    // The interior stop is minted at 50 where the press lands where it was
    // asked; on an engine that moved it (the O-103b form above) the grammar is
    // gated from the ordinal actually minted, and the literal is reported.
    const start = Number(await seat.getAttribute("aria-valuenow"));
    if (engineMovedPress(requestedX, delivered)) {
        reportPress(requestedX, delivered, "keyboard grammar interior seed");
    } else {
        expect(start).toBe(50);
    }

    const press = async (key: string) => {
        await seat.focus();
        await page.keyboard.press(key);
    };

    for (const [key, want] of [
        ["ArrowUp", stepped(start, 1)],
        ["ArrowDown", stepped(start, 0)],
        ["ArrowRight", stepped(start, 1)],
        ["ArrowLeft", stepped(start, 0)],
        ["PageUp", stepped(start, 10)],
        ["PageDown", stepped(start, 0)],
        ["Home", "0"],
        ["End", "100"],
    ] as const) {
        await press(key);
        await expect(seat).toHaveAttribute("aria-valuenow", want);
    }
    // The ordinal rides the VALUE, so a move re-announces it (it used to ride
    // the NAME alone, which is announced on focus and not on change).
    await expect(seat).toHaveAttribute("aria-valuetext", "Stop 2 of 3, position 100%");

    // The bound, honestly: the terminal answers the keys that have somewhere to go.
    const terminal = rail.locator("[data-stop-id]").first();
    await expect(terminal).toHaveAttribute("aria-valuenow", "0");
    const leftAt = () => terminal.evaluate((el) => (el as HTMLElement).style.left);
    const before = await leftAt();
    await terminal.focus();
    await page.keyboard.press("Home");
    await expect(terminal).toHaveAttribute("aria-valuenow", "0");
    expect(await leftAt()).toBe(before);
    await terminal.focus();
    await page.keyboard.press("ArrowDown");
    await expect(terminal).toHaveAttribute("aria-valuenow", "0");
    expect(await leftAt()).toBe(before);
    await terminal.focus();
    await page.keyboard.press("ArrowUp");
    await expect(terminal).toHaveAttribute("aria-valuenow", "1");
    expect(await leftAt()).not.toBe(before);

    expect(consoleErrors).toEqual([]);
});

/**
 * b4 — ONE REMOVAL OWNER, AND A FLOOR THAT SAYS WHY.
 *
 * The rail's only remover used to be a chip that EXISTED only while removal was
 * legal (`v-if="selectedStop && removable"`) over a remover that returned in
 * silence — a capability expressed as absence, twice. The inspector is the one
 * owner now: it stays, it reads as refused at the floor, and its reason is its
 * own accessible description.
 */
test("one removal owner: the floor is a disabled control carrying its reason", async ({
    page,
}) => {
    const consoleErrors = setupEnvNoise(page);
    const main = await openGradient(page);
    const rail = bar(main);
    await rail.scrollIntoViewIfNeeded();

    const remove = main.getByRole("button", { name: "Remove selected stop" });
    // X.W12U.h · A2-VA-L3-7: with no selection the inspector is its hint alone,
    // so the removal owner is counted once a stop is its subject.

    // At the two-stop floor the control is PRESENT and refused, with a reason.
    await rail.locator("[data-stop-id]").first().click();
    // ONE removal control on the route — not one per stop, and not a second
    // species hiding behind a gesture.
    await expect(main.getByRole("button", { name: /remove/i })).toHaveCount(1);
    await expect(remove).toBeVisible();
    await expect(remove).toBeDisabled();
    const reasonId = await remove.getAttribute("aria-describedby");
    expect(reasonId).toBeTruthy();
    await expect(main.locator(`#${reasonId}`)).toContainText("at least two stops");

    // Above the floor it is the working owner.
    const box = (await rail.boundingBox())!;
    await rail.click({ position: { x: box.width * 0.5, y: box.height / 2 } });
    await expect(rail.locator("[data-stop-id]")).toHaveCount(3);
    // The minted stop is selected on mint (X.W12.u2 · UIA-V-373).
    await expect(remove).toBeEnabled();
    await remove.click();
    await expect(rail.locator("[data-stop-id]")).toHaveCount(2);

    // …and it is back at the floor, still present, still saying why.
    await rail.locator("[data-stop-id]").first().click();
    await expect(remove).toBeDisabled();

    expect(consoleErrors).toEqual([]);
});
