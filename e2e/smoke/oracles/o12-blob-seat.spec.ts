import { test, expect } from "@playwright/test";
import { mainPane } from "../fixtures/dock";
import {
    GATE,
    SOFT_CEIL,
    detectRenderer,
    isSoftwareGL,
    installFrameCollector,
    resetFrames,
    readFrames,
    percentile,
    waitMs,
} from "../perf/frame-budget";
import {
    instrumentWebglDraws,
    GOO_BLOB_TESTID,
    lastCanvasDrawCount,
} from "../fixtures/webgl-appearance";

/**
 * THE SEAT FORMULA (T.W4-5 · D8) — the e2e mirror of the ONE cqi footprint law
 * (`ColorPicker.vue .pane-shell{--blob-fp: clamp(7rem, 22cqi, 11rem)}`),
 * computed at the test's own viewport (PI-4). Moved here from the retired
 * W3-3 timing fixture (X.W12U.b); the 390 leg carries its own copy.
 */
function seatFootprintPx(paneWidthPx: number, remPx = 16): number {
    return Math.min(Math.max(0.22 * paneWidthPx, 7 * remPx), 11 * remPx);
}
/** Visible bead = 2·bodyRadius·fp (bodyRadius 0.26 — the HERO register). */
const BEAD_RATIO = 0.52;

/**
 * T.W4-5 · O-12 — THE BLOB SEAT SET (SYNTHESIS §6.1 O-12; D8 + the PI-3/PI-4
 * riders). Minted in the SAME commit as the seat formula (PI-4's law); the
 * mobile width bound lives in `mobile/blob-presence-mobile.spec.ts`
 * (formula-derived there — the fifth row of this set); the park timing
 * constants (the shared timing fixture) retired with the W3-3
 * wall-clock park (X.W12U.b, COHESION §0dm).
 *
 *   1 · SEAT IDENTITY — `--blob-seat` resolves 0 (Q3 "Flush.") and the
 *       wrapper sits wholly inside the card (containment identity:
 *       orbit-reach 0.49 ≤ 0.5 bounds every painted pixel to the wrapper).
 *   2 · OCCLUSION — `elementFromPoint` across the bead's arc never resolves
 *       into the dock (the chrome band): the bead never enters chrome in
 *       paint (Q3b's two readings never conflict).
 *   3 · IDLE FRAME COST (X.W12U.b, COHESION §0dm, ESC-W12d-1; restates the
 *       HOVER-MOOD FLOOR "the PARKED bead answers a hover ≥ 6/255 within
 *       400 ms"). Both halves of that premise are gone at HEAD: the hero no
 *       longer parks (the owner's live blob; the loop rides the producer's
 *       `settled` gate), and the hero is an inert ornament with no pointer
 *       host (`HeroBlob.vue:2-10`: `pointer-events-none`, no pressLabel), so
 *       the wake+curious beat has no trigger (baseline read 1.21/255). The
 *       leg now bounds what the live bead COSTS at the seat: over an idle
 *       window it draws (> 0), at most one draw per displayed frame (+1 edge
 *       race; measured at 1440: draws 28/20/23 = frames 28/20/23), and idle
 *       p50 holds the §6.2 13 ms on a real GPU (measured headed, hero live:
 *       10.2 ms) — or, on a 60 Hz frame clock (WebKit; §0ei background
       Chrome), the seat's own PRM-parked p50 + 1 ms, the hero adding no
       idle cost — and the SOFT_CEIL guard on SwiftShader. The bead's visible
 *       motion at idle and under a resting pointer is the live-blob gate's
 *       (`w12-picker-blob.spec.ts`). Evidence: `W12U-evidence/b/`.
 *   4 · HOVER-ACTIVE BUDGET — sustained-pointermove frame p50 ≤ 20ms (the
 *       NEW §6.2 row; renderer-aware: asserted on real GPU, hang-guarded on
 *       SwiftShader — the idle-frame-budget shape).
 */

test.use({ viewport: { width: 1440, height: 900 } });

const BLOB_CANVAS = '[data-testid="goo-blob-canvas"]';

// ── O-12 BACKING-RATIO FEASIBILITY LEG (boot-G MINT · G-ORACLE-2, U.W-ORACLE)
// The seat-identity leg (`--blob-seat === 0` + wrapper ⊂ card) is the GUARD
// CONSTANT — it certifies the seat GEOMETRY but is blind to the backing-store
// RESOLUTION. R2 (T.W45 checkpoint) shipped the blob booting at ~0.35× backing
// (the substrate presizes from gBCR mid-`blob-emerge`, when the anchor is
// scaled from 0.35), and the idle park FROZE that low-res frame — a wreck the
// geometry leg cannot see (the box is full-size; only its pixels are starved).
// This leg makes the R2 regression class SLATE-VISIBLE: it certifies the real
// referent — the canvas backing store at FULL DEVICE RESOLUTION after settle.
// BORN-GREEN — cured at af18e07 (HeroBlob drives the producer's re-measure seam
// — pause()/resume() at the emerge animationend — sizing the backing against
// the untransformed box). The floor is DERIVED FROM MEASUREMENT (see the
// derivation in docs/tranches/U/audit/oracle/feasibility/): the settled cured
// ratio measures ≈ 1.0 (backing ≡ css×dpr); the R2 wreck freezes at ≈ 0.35× —
// the 0.6 floor sits well above the wreck (with the ~8–10% frame-noise + any
// quality-ladder margin) and below full-res, so a re-regression to the low-res
// emerge frame reds here while healthy boot stays green.
const BACKING_RATIO_FLOOR = 0.6;
/** Margin after the emerge settle for the backing re-measure (X.W12U.b). */
const BACKING_SETTLE_MS = 1_500;

/** X.W12U.b — the idle window (leg 3). */
const IDLE_MS = 2_000;
const WINDOW_MS = 3_000;
const EDGE_SLACK = 1;
/** rAF timestamp jitter between two reads of one engine's frame clock (ms). */
const RAF_JITTER_MS = 1;

async function bootWithBlob(page: import("@playwright/test").Page) {
    await page.goto("/");
    await expect(mainPane(page)).toBeVisible();
    const blob = page.locator(BLOB_CANVAS).last();
    // Arrival is harness latency, not a seat reading: the canvas mounts behind
    // the overture beat DAG and the async HeroBlob chunk (the b2bb8aab h1
    // precedent measured 17.1 s cold). X.W12U.b read it absent at 15 s on a
    // warm :9000 at host load ~57 with the picker otherwise rendered.
    await expect(blob).toBeAttached({ timeout: 45_000 });
    // Wait out the emerge pose (the W2-4 settle-stamp discipline).
    const pane = await page
        .locator(".pane-wrapper--stage")
        .first()
        .evaluate((el) => el.clientWidth);
    const fp = seatFootprintPx(pane);
    await expect
        .poll(async () => (await blob.boundingBox())?.width ?? 0, {
            timeout: 6000,
        })
        .toBeGreaterThanOrEqual(1.6 * fp - 2);
    return { blob, fp };
}

test("O-12 · 1+2 — seat identity (flush, contained) + dock never occluded by the bead's arc", async ({
    page,
}) => {
    test.setTimeout(90_000); // the 45 s arrival bound (bootWithBlob) + the leg
    const { fp } = await bootWithBlob(page);

    // --blob-seat resolves 0 (the Q3 ruling, mechanically).
    const seat = await page
        .locator(".pane-shell")
        .first()
        .evaluate((el) => getComputedStyle(el).getPropertyValue("--blob-seat").trim());
    expect(seat === "0px" || seat === "0", `--blob-seat = "${seat}"`).toBe(true);

    // Containment: wrapper ⊂ card (the wrapper bounds all paint).
    const wrapper = await page.locator(".hero-blob-anchor").first().boundingBox();
    const card = await page.locator(".pane-shell > *").first().boundingBox();
    if (!wrapper || !card) throw new Error("seat geometry not laid out");
    expect(wrapper.x).toBeGreaterThanOrEqual(card.x - 1);
    expect(wrapper.y).toBeGreaterThanOrEqual(card.y - 1);
    expect(wrapper.x + wrapper.width).toBeLessThanOrEqual(card.x + card.width + 1);
    expect(wrapper.y + wrapper.height).toBeLessThanOrEqual(card.y + card.height + 1);
    // The formula sized the wrapper.
    expect(Math.abs(wrapper.width - fp)).toBeLessThanOrEqual(2);

    // Occlusion: probe the bead's 12-o'clock arc + center + corners of the
    // visible bead box — never a dock-band element.
    const cx = wrapper.x + wrapper.width / 2;
    const cy = wrapper.y + wrapper.height / 2;
    const r = (BEAD_RATIO / 2) * wrapper.width;
    const probes: [number, number][] = [
        [cx, cy],
        [cx, cy - r],
        [cx + r * 0.7, cy - r * 0.7],
        [cx - r * 0.7, cy - r * 0.7],
        [cx, wrapper.y + 2],
    ];
    for (const [x, y] of probes) {
        const hit = await page.evaluate(
            ([px, py]) => {
                const el = document.elementFromPoint(px!, py!);
                return {
                    inDock: !!el?.closest(".glass-dock, nav"),
                    tag: el?.tagName ?? "none",
                };
            },
            [x, y],
        );
        expect(
            hit.inDock,
            `elementFromPoint(${x.toFixed(0)},${y.toFixed(0)}) resolved into the dock (${hit.tag}) — the bead entered the chrome band`,
        ).toBe(false);
    }
});

test("O-12 · 3 — idle frame cost at the seat: the live bead draws, at most once per frame, cadence in budget", async ({
    page,
    browser,
    browserName,
}) => {
    test.setTimeout(90_000);
    await instrumentWebglDraws(page);
    await installFrameCollector(page);
    await bootWithBlob(page);
    const soft = isSoftwareGL(await detectRenderer(page));
    // The bead must have drawn before its idle cost means anything.
    await expect
        .poll(() => lastCanvasDrawCount(page, GOO_BLOB_TESTID), { timeout: 45_000 })
        .toBeGreaterThan(0);

    await waitMs(page, IDLE_MS);
    const before = await lastCanvasDrawCount(page, GOO_BLOB_TESTID);
    await resetFrames(page);
    await waitMs(page, WINDOW_MS);
    const draws = (await lastCanvasDrawCount(page, GOO_BLOB_TESTID)) - before;
    const frames = await readFrames(page);
    const p50 = percentile(frames, 50);
    console.log(
        `[o12-idle-cost] renderer=${soft ? "SOFTWARE-GL" : "REAL-GPU"} window=${WINDOW_MS}ms draws=${draws} frames=${frames.length} p50=${p50.toFixed(1)}ms (gate ≤${GATE.idleP50Ms}ms real-GPU)`,
    );
    expect(draws, "the idle bead drew nothing — the live hero parked").toBeGreaterThan(0);
    expect(
        draws,
        `the bead drew ${draws} times over ${frames.length} displayed frames — more than one draw per frame`,
    ).toBeLessThanOrEqual(frames.length + EDGE_SLACK);
    if (soft) {
        expect(frames.length, "the rAF loop stalled").toBeGreaterThanOrEqual(SOFT_CEIL.idleMinFrames);
        expect(p50, `software-GL idle p50 ${p50.toFixed(1)}ms over the hang guard`).toBeLessThanOrEqual(
            SOFT_CEIL.idleP50Ms,
        );
    } else {
        // A real GPU. The §6.2 13 ms is the 120 Hz-cell number; a 60 Hz frame
        // clock reads p50 16.7-17.0 ms for any page (headless WebKit, the
        // oracles-safari project: about:blank 17.0 ms; real Chrome new-headless
        // on Metal under §0ei: live and parked both 16.7 ms —
        // `W12U-evidence/b/probe-webkit-cadence.mjs`, `probe-idle-cost.mjs`).
        // So the budget is the §6.2 gate or, where the engine's own clock sits
        // above it, the hero's own idle cost: live p50 ≤ the same seat's
        // PRM-parked p50 (0 hero draws) + one ms of rAF timestamp jitter.
        const parked = await browser.newContext({
            viewport: { width: 1440, height: 900 },
            reducedMotion: "reduce",
        });
        const ref = await parked.newPage();
        await installFrameCollector(ref);
        await bootWithBlob(ref);
        await waitMs(ref, IDLE_MS);
        await resetFrames(ref);
        await waitMs(ref, WINDOW_MS);
        const floor = percentile(await readFrames(ref), 50);
        await parked.close();
        const budget = Math.max(GATE.idleP50Ms, floor + RAF_JITTER_MS);
        console.log(`[o12-idle-cost] ${browserName} parked floor p50=${floor.toFixed(1)}ms → budget ${budget.toFixed(1)}ms`);
        expect(
            p50,
            `${browserName} idle p50 ${p50.toFixed(1)}ms with the bead live over max(§6.2 ${GATE.idleP50Ms}ms, parked floor ${floor.toFixed(1)}ms + ${RAF_JITTER_MS}ms)`,
        ).toBeLessThanOrEqual(budget);
    }
});

test("O-12 · 4 — hover-active frame budget: sustained pointermove sweep p50 ≤ 20ms", async ({
    page,
}) => {
    test.setTimeout(90_000);
    await installFrameCollector(page);
    const { blob } = await bootWithBlob(page);
    const renderer = await detectRenderer(page);
    const soft = isSoftwareGL(renderer);

    const box = await blob.boundingBox();
    if (!box) throw new Error("blob box");
    const cx = box.x + box.width / 2;
    const cy = box.y + box.height / 2;
    const r = box.width * 0.2;

    await resetFrames(page);
    // A 2s sustained sweep — the interactive register no gate owned (PI-3b).
    const steps = 60;
    for (let i = 0; i < steps; i++) {
        const a = (i / steps) * Math.PI * 4;
        await page.mouse.move(cx + r * Math.cos(a), cy + r * Math.sin(a), {
            steps: 2,
        });
        await page.waitForTimeout(33);
    }
    const frames = await readFrames(page);
    const p50 = percentile(frames, 50);
    console.log(
        `[o12-hover-active] renderer=${soft ? "SOFTWARE-GL" : "REAL-GPU"} frames=${frames.length} p50=${p50.toFixed(1)}ms (gate ≤20ms real-GPU)`,
    );
    expect(frames.length, "no frames collected").toBeGreaterThan(0);
    if (soft) {
        expect(
            p50,
            `software-GL hover-active p50 ${p50.toFixed(1)}ms over the ${SOFT_CEIL.idleP50Ms}ms hang guard`,
        ).toBeLessThanOrEqual(SOFT_CEIL.idleP50Ms);
    } else {
        expect(
            p50,
            `hover-active p50 ${p50.toFixed(1)}ms over the ≤${GATE.dragP50Ms ?? 20}ms budget`,
        ).toBeLessThanOrEqual(20);
    }
});

test("O-12 · 5 — the backing-ratio feasibility leg: the settled canvas backing store is at full device resolution (never the 0.35× emerge-presize wreck; boot-G / R2)", async ({
    page,
}) => {
    test.setTimeout(90_000); // the 45 s arrival bound (bootWithBlob) + the leg
    const { blob } = await bootWithBlob(page);
    // Let the emerge re-measure seam (pause()/resume() at the `blob-emerge`
    // animationend) settle the backing against the untransformed box. The
    // wait was the retired park latency; it is the settle margin alone now
    // (bootWithBlob already polled the canvas to its settled footprint).
    await waitMs(page, BACKING_SETTLE_MS);

    const renderer = await detectRenderer(page);
    const m = await blob.evaluate((el) => {
        const c = el as HTMLCanvasElement;
        const box = c.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        return {
            backingW: c.width,
            backingH: c.height,
            cssW: box.width,
            cssH: box.height,
            dpr,
            // The R2 invariant is dpr-agnostic: backing ÷ (css × dpr). Full
            // device resolution ≈ 1.0; the frozen emerge frame ≈ 0.35×.
            ratio: box.width > 0 ? c.width / (box.width * dpr) : 0,
        };
    });
    console.log(
        `[o12-backing] renderer=${isSoftwareGL(renderer) ? "SOFTWARE-GL" : "REAL-GPU"} backing ${m.backingW}x${m.backingH} css ${m.cssW.toFixed(1)}x${m.cssH.toFixed(1)} dpr ${m.dpr} → ratio ${m.ratio.toFixed(3)} (full-res ≈ 1.0; R2 wreck ≈ 0.35; floor ${BACKING_RATIO_FLOOR})`,
    );
    // The backing resize is JS-driven (the substrate's gBCR sizer), so this leg
    // is renderer-INDEPENDENT — it is not the aurora's GPU-only class (U-F15);
    // it measures a real resolution floor headless, the honest born-GREEN case.
    expect(m.cssW, "blob canvas has a laid-out box").toBeGreaterThan(0);
    expect(m.backingW, "blob canvas has a backing store").toBeGreaterThan(0);
    expect(
        m.ratio,
        `backing at full device resolution (ratio ${m.ratio.toFixed(3)} — the R2 wreck freezes ≈ 0.35×; a regression re-froze the low-res emerge frame)`,
    ).toBeGreaterThanOrEqual(BACKING_RATIO_FLOOR);
});
