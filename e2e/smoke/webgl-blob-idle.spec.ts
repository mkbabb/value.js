import { test, expect } from "@playwright/test";
import {
    instrumentWebglDraws,
    GOO_BLOB_TESTID,
    lastCanvasDrawCount,
} from "./fixtures/webgl-appearance";
import { decodePng } from "./fixtures/frame-diff";
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
} from "./perf/frame-budget";
import { convertColor, mapColorToGamut } from "../../dist/subpaths/color.js";
import { parseCssColor } from "../../dist/subpaths/css.js";

/**
 * X.W12U.b (COHESION §0dm, ESC-W12d-1) — THE LIVE HERO'S IDLE FRAME COST.
 *
 * W3-3 parked the hero on a wall clock (2 s idle → sleepy, +3.3 s → the
 * substrate's manual `paused`), and this spec asserted the park as a draw
 * plateau. The owner's live blob supersedes that contract (W12.md addendum
 * (f)): the park now rides the producer's `settled` demand gate, so a
 * fission-armed hero keeps drawing at idle, and the idle CPU the park bought
 * is spent only while the engine moves. `HERO_FISSION_AMP` is not tuned to
 * pass anything here. The gate is therefore a COST, not a stillness:
 *
 *   1 · LIVE — over an idle window with no input the hero draws (> 0).
 *   2 · ONE DRAW PER FRAME — the hero's draw calls never outrun the displayed
 *       frames (the collector's rAF ticks) over the same window, +1 for the
 *       window-edge read race. Measured (headless SwiftShader, :9000, x3
 *       windows each): 1440 draws 28/20/23 = frames 28/20/23; 390 draws
 *       37/44/39 = frames 37/44/39 (`W12U-evidence/b/probe-idle-cost.mjs`).
 *       A second loop, a multi-pass regression or an uncoalesced redraw
 *       doubles the ratio and reds here on any renderer.
 *   3 · CADENCE — idle frame p50 ≤ the §6.2 13 ms on a real GPU (measured
 *       headed, live hero: p50 10.2 ms, p95 ≤ 12.0 ms, identical to the PRM
 *       run — the live hero adds nothing measurable to an idle main-thread
 *       frame); under SwiftShader the SOFT_CEIL hang guard (the live hero's
 *       software draw runs p50 58-158 ms there — a software-raster floor,
 *       not the gate; see `perf/frame-budget.ts`).
 *   4 · PRM PARKS — under prefers-reduced-motion the producer renders one
 *       static frame and parks: 0 draws over the idle window (measured 0/0/0
 *       at 1440 and at 390).
 */

/** Idle before the window: past the first draw's boot beats. */
const IDLE_MS = 2_000;
/** The sampled idle window. */
const WINDOW_MS = 3_000;
/** The window-edge race between the draw read and the frame read. */
const EDGE_SLACK = 1;

async function bootHero(page: import("@playwright/test").Page) {
    await instrumentWebglDraws(page);
    await installFrameCollector(page);
    await page.goto("/");
    await expect(page.getByTestId(GOO_BLOB_TESTID).last()).toBeAttached({ timeout: 45_000 });
    // The hero must actually render before its idle cost means anything.
    await expect
        .poll(() => lastCanvasDrawCount(page, GOO_BLOB_TESTID), {
            timeout: 45_000,
            message: "goo-blob never drew — cannot measure its idle cost",
        })
        .toBeGreaterThan(0);
}

/** Blob draws and displayed frames over one idle window. */
async function idleWindow(page: import("@playwright/test").Page) {
    const before = await lastCanvasDrawCount(page, GOO_BLOB_TESTID);
    await resetFrames(page);
    await waitMs(page, WINDOW_MS);
    const draws = (await lastCanvasDrawCount(page, GOO_BLOB_TESTID)) - before;
    const frames = await readFrames(page);
    return { draws, frames };
}

test("hero blob idle frame cost: live, one draw per frame, cadence in budget (the settled seam, no wall-clock park)", async ({
    page,
}) => {
    test.setTimeout(90_000);
    await bootHero(page);
    const soft = isSoftwareGL(await detectRenderer(page));

    // Idle = no input at all. The old spectrum-click anchor reset HeroBlob's
    // wall-clock idle timer, which is retired; a colour change now only
    // re-inks the app, and under SwiftShader that recolour holds the main
    // thread for seconds (probe-click-stall.mjs: 0 frames for 5 s after one
    // click; headed GPU: one 122 ms gap), which would read as the hero's cost.
    await waitMs(page, IDLE_MS);

    const { draws, frames } = await idleWindow(page);
    const p50 = percentile(frames, 50);
    console.log(
        `[blob-idle-cost] renderer=${soft ? "SOFTWARE-GL" : "REAL-GPU"} window=${WINDOW_MS}ms ` +
            `draws=${draws} frames=${frames.length} p50=${p50.toFixed(1)}ms`,
    );

    expect(draws, "the idle hero drew nothing — the live blob parked (the retired wall-clock park)").toBeGreaterThan(0);
    expect(
        draws,
        `the hero drew ${draws} times over ${frames.length} displayed frames — more than one draw per frame`,
    ).toBeLessThanOrEqual(frames.length + EDGE_SLACK);
    if (soft) {
        expect(frames.length, "the rAF loop stalled").toBeGreaterThanOrEqual(SOFT_CEIL.idleMinFrames);
        expect(p50, `software-GL idle p50 ${p50.toFixed(1)}ms over the hang guard`).toBeLessThanOrEqual(
            SOFT_CEIL.idleP50Ms,
        );
    } else {
        expect(p50, `idle p50 ${p50.toFixed(1)}ms over the §6.2 ≤${GATE.idleP50Ms}ms gate with the hero live`).toBeLessThanOrEqual(
            GATE.idleP50Ms,
        );
    }
});

test("hero blob under prefers-reduced-motion: one static frame, then parked (0 idle draws)", async ({
    page,
}) => {
    test.setTimeout(90_000);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await bootHero(page);
    await waitMs(page, IDLE_MS);
    // The PRM hero's static frame lands ~1.5 s after navigation, inside the
    // boot's own chunk and overture work; under SwiftShader that work can hold
    // the main thread for seconds (X.W12U.b gate run 5 read 0 frames over the
    // whole window at 390). A 0-draw window with 0 frames proves nothing, so
    // the window opens only once the page ticks again (a precondition, not the
    // gate: the gate is 0 draws over a window that itself shows frames).
    await expect
        .poll(
            async () => {
                await resetFrames(page);
                await waitMs(page, 500);
                return (await readFrames(page)).length;
            },
            { timeout: 45_000, message: "the page never resumed ticking after boot" },
        )
        .toBeGreaterThanOrEqual(SOFT_CEIL.idleMinFrames);
    const { draws, frames } = await idleWindow(page);
    console.log(`[blob-idle-cost] PRM window=${WINDOW_MS}ms draws=${draws} frames=${frames.length}`);
    expect(frames.length, "the rAF loop stalled").toBeGreaterThanOrEqual(SOFT_CEIL.idleMinFrames);
    expect(draws, `the PRM hero drew ${draws} times over ${WINDOW_MS}ms of idle — it is not parked`).toBe(0);
});


/**
 * X.W6.h · h1 — "hero blob carries current chroma" (CC-061 · MT-F032), the
 * predicate as restated by COHESION §0z E6 (`W6.md` addendum 2026-09-19):
 * the painted dominant chroma is within the stated ΔC of the current
 * colour's chroma GAMUT-MAPPED (css-color-4 §13 chroma reduction — L and h
 * held; the library's `mapColorToGamut`) to the drawing buffer's colour
 * space — read off the blob's own WebGL2 context (`drawingBufferColorSpace`),
 * never assumed; `(color-gamut: p3)` is printed beside it. Chroma beyond the
 * display's own gamut is honest-RED-by-physics and is not what this arm
 * asserts — it asserts the deliverable at the buffer's ceiling.
 *
 * The census (`docs/tranches/X/waves/W6-blob-pipeline-census.md`, gate h2)
 * is the premise: no stage strips chroma at the lightness it lands on; the
 * loss is the LIGHTNESS each stage lands on. So the oracle measures the
 * painted bead's OKLCH chroma directly off a settled frame — the dominant
 * atom is the bead body, sampled as the median over a core disk well inside
 * the body radius (bodyRadius 0.325 of the canvas; the disk is 0.15), where
 * the Fresnel rim and satellites never reach.
 */

/**
 * The STATED ΔC (OKLCH chroma), derived, never tuned to a reading: two
 * css-color-4 §13 JNDs (deltaEOK 0.02 each). One JND is the gamut-mapping
 * algorithm's own acceptance band on the target; the second is the painted
 * surface's measured run-to-run spread on a settled frame (max 0.0164 over
 * three runs per seed, `docs/tranches/X/waves/W6-evidence/blob/h1-*.txt`). The negative control (the
 * palette's chroma scaled ×0.3 — a desaturated ghost) reds at ΔC −0.108 and
 * −0.173, so the band cannot pass the defect the row names.
 */
const H1_DELTA_C = 0.04;
/** Past the producer's autonomic sleepy arc (idle > 6 s) — see the wait. */
const REST_MS = 6_100;
const CORE_DISK = 0.15;

const H1_SEEDS = [
    "lab(92% 88.8 20)", // the owner's case (OM-6), 12.94× outside sRGB at its L
    "oklch(0.65 0.3 150)",
    "oklch(0.55 0.37 328)",
];

function oklchOf(css: string): [number, number, number] {
    const parsed = parseCssColor(css);
    if (!parsed.ok) throw new Error(`unparseable ${css}`);
    const o = convertColor(parsed.value, "oklch");
    if (!o.ok) throw new Error(`unconvertible ${css}`);
    return o.value.channels as [number, number, number];
}

function mappedChroma(css: string, gamut: "srgb" | "display-p3"): number {
    const parsed = parseCssColor(css);
    if (!parsed.ok) throw new Error(`unparseable ${css}`);
    const mapped = mapColorToGamut(parsed.value, gamut);
    if (!mapped.ok) throw new Error(`unmappable ${css}`);
    const o = convertColor(mapped.value, "oklch");
    if (!o.ok) throw new Error(`unconvertible ${css}`);
    return o.value.channels[1] as number;
}

for (const seed of H1_SEEDS) {
    test(`hero blob carries current chroma — ${seed}`, async ({ page }) => {
        test.setTimeout(60_000);
        await page.setViewportSize({ width: 1440, height: 900 });
        await page.goto(`/#/?space=oklch&color=${encodeURIComponent(seed)}`);
        const blob = page.getByTestId(GOO_BLOB_TESTID).last();
        // X-W6 Repair 1 (C1-3 / C1-7): the blob's ARRIVAL is not what h1
        // asserts. The canvas mounts behind the overture beat DAG (b2 field
        // settle -> b4 idle slice -> the async HeroBlob chunk -> engine init),
        // measured 1.6-6.4 s after navigation on a warm dev server and 17.1 s
        // on the first navigation of a freshly spawned one (FCP alone 13.8 s:
        // the dev server's on-demand transform). The expect default (8 s) made
        // whichever seed ran first on a cold server RED with the canvas absent
        // - a harness latency, not a chroma reading. The arrival wait is
        // therefore bounded by this test's own budget, and the chroma
        // assertions below are unchanged.
        await expect(blob).toBeVisible({ timeout: 45_000 });
        // The buffer's colour space, READ off the blob's own WebGL2 context
        // (`getContext` returns the context the producer already created) —
        // never inferred. The display's gamut is printed beside it.
        const space = await page.evaluate((id) => {
            const cv = [
                ...document.querySelectorAll<HTMLCanvasElement>(
                    `[data-testid="${id}"]`,
                ),
            ].pop();
            const gl = cv?.getContext("webgl2");
            return {
                buffer: gl ? gl.drawingBufferColorSpace : "no-webgl2",
                p3: matchMedia("(color-gamut: p3)").matches,
            };
        }, GOO_BLOB_TESTID);
        expect(["srgb", "display-p3"]).toContain(space.buffer);
        const bufferGamut = space.buffer as "srgb" | "display-p3";
        // The rest pose h1 has always read: past the producer's autonomic
        // sleepy arc (`idleMs > 6e3`, glass blob.js). The bead is live now (no
        // frozen frame), and the core-disk reading is steady from ~3 s on
        // (`W12U-evidence/b/probe-h1-live.mjs`: 3.0/6.1/9.0/12.0 s agree to
        // ±0.001 C per seed).
        await waitMs(page, REST_MS);
        const img = decodePng(await blob.screenshot());
        const cx = img.width / 2;
        const cy = img.height / 2;
        const r = img.width * CORE_DISK;
        const cache = new Map<string, [number, number, number]>();
        const chromas: number[] = [];
        const Ls: number[] = [];
        let sa = 0;
        let sb = 0;
        for (let y = Math.floor(cy - r); y <= Math.ceil(cy + r); y++) {
            for (let x = Math.floor(cx - r); x <= Math.ceil(cx + r); x++) {
                if ((x - cx) ** 2 + (y - cy) ** 2 > r * r) continue;
                const i = (y * img.width + x) * img.channels;
                const key = `rgb(${img.data[i]} ${img.data[i + 1]} ${img.data[i + 2]})`;
                let lch = cache.get(key);
                if (!lch) {
                    lch = oklchOf(key);
                    cache.set(key, lch);
                }
                Ls.push(lch[0]);
                chromas.push(lch[1]);
                const hr = ((Number.isFinite(lch[2]) ? lch[2] : 0) * Math.PI) / 180;
                sa += lch[1] * Math.cos(hr);
                sb += lch[1] * Math.sin(hr);
            }
        }
        const median = (xs: number[]) => [...xs].sort((a, b) => a - b)[xs.length >> 1]!;
        const paintedC = median(chromas);
        const paintedL = median(Ls);
        const paintedH = ((Math.atan2(sb, sa) * 180) / Math.PI + 360) % 360;
        const [seedL, seedC, seedH] = oklchOf(seed);
        const targetC = mappedChroma(seed, bufferGamut);
        console.log(
            `[h1] seed ${seed} L ${seedL.toFixed(4)} C ${seedC.toFixed(5)} h ${seedH.toFixed(2)} · ` +
                `buffer ${bufferGamut} (display p3: ${space.p3}) · target C (gamut-mapped) ${targetC.toFixed(5)} · ` +
                `painted core median L ${paintedL.toFixed(4)} C ${paintedC.toFixed(5)} h ${paintedH.toFixed(2)} · ` +
                `ΔC ${(paintedC - targetC).toFixed(5)} (stated ±${H1_DELTA_C}) · px ${chromas.length}`,
        );
        expect(
            Math.abs(paintedC - targetC),
            `painted dominant chroma ${paintedC.toFixed(5)} vs the gamut-mapped current chroma ${targetC.toFixed(5)}`,
        ).toBeLessThanOrEqual(H1_DELTA_C);
    });
}
