import { test, expect } from "@playwright/test";
import {
    instrumentWebglDraws,
    GOO_BLOB_TESTID,
    lastCanvasDrawCount,
} from "./fixtures/webgl-appearance";
import { decodePng } from "./fixtures/frame-diff";
import { convertColor, mapColorToGamut } from "../../dist/subpaths/color.js";
import { parseCssColor } from "../../dist/subpaths/css.js";

/**
 * W3-3 (S.W3) — the blob idle-gate proof (perf-transitions P0-2; §6.2 "0
 * un-gated idle rAF"; §6.1 hard-gate item 5).
 *
 * The hero blob's WebGL render loop costs ~7ms on EVERY mounted frame, even
 * fully idle — the picker default-view floor sits at 54fps vs the blob-off
 * 85fps. `HeroBlob.vue` drives the renderer's existing `paused` seam after N ms
 * of no colour/pointer activity so the loop PARKS (the substrate's `manual`
 * suspend). This spec proves the park with the buffer-/timing-independent
 * draw-call oracle: after N ms of true idle the blob's WebGL draw count
 * PLATEAUS. A live un-gated loop would keep adding draws (the audit measured a
 * continuous per-frame tax); a parked loop adds ~zero.
 *
 * N — THE IDLE THRESHOLD — mirrors `HeroBlob.vue`'s `BLOB_IDLE_MS`. Per §6.1 the
 * idle sampling window MUST EXCEED N, else the sample straddles the still-live
 * pre-park window and the ≤13ms idle gate fails on correct true-idle behaviour.
 * We anchor the idle countdown with one interaction, wait PAST N for the park,
 * THEN sample the draw count over a window that itself exceeds N.
 *
 * Keep this constant in lock-step with `HeroBlob.vue`'s `BLOB_IDLE_MS`.
 *
 * W6-4 (S.W6): the park now completes at N + SLEEPY_POSE_MS (2000 + 700 =
 * 2700ms — HeroBlob first poses the blob sleepy, THEN freezes that frame).
 * PARK_SETTLE_MS = N + 1500 = 3500ms keeps 800ms slack past park completion.
 */
// T.W4-5 (PI-4): the park-latency contract lives in the ONE shared fixture.
import {
    PARK_SETTLE_MS,
    SAMPLE_WINDOW_MS,
    PARKED_DRAW_SLACK,
} from "./fixtures/blob-timing";

/** Read-only wall-clock wait (the reactivity/safari-spec `performance.now()` idiom). */
async function waitMs(page: import("@playwright/test").Page, ms: number): Promise<void> {
    const start = await page.evaluate(() => performance.now());
    await page.waitForFunction(
        (a) => performance.now() - a.start >= a.ms,
        { start, ms },
        { timeout: ms + 3_000, polling: 250 },
    );
}

test("hero blob parks its WebGL loop after N ms idle (0 un-gated idle rAF)", async ({
    page,
}) => {
    await instrumentWebglDraws(page);
    await page.goto("/");

    await expect(page.getByTestId(GOO_BLOB_TESTID).last()).toBeAttached();

    // Warm-up: the blob must actually render before a plateau means anything.
    await expect
        .poll(() => lastCanvasDrawCount(page, GOO_BLOB_TESTID), {
            timeout: 10_000,
            message: "goo-blob never drew — cannot measure the idle-gate",
        })
        .toBeGreaterThan(0);

    // Anchor the idle countdown: one spectrum interaction changes the colour,
    // which resets HeroBlob's idle timer (its `watch(cssColorOpaque)` activity
    // signal) AND wakes the blob live. From here we do NOT interact again.
    const spectrum = page.getByRole("img", { name: /Color spectrum/ }).last();
    await expect(spectrum).toBeVisible();
    const box = await spectrum.boundingBox();
    if (!box) throw new Error("spectrum canvas not laid out");
    await page.mouse.click(box.x + box.width * 0.5, box.y + box.height * 0.5);

    // Wait past N (+ margin) with no further activity — the loop parks.
    await waitMs(page, PARK_SETTLE_MS);

    // Sample the draw count across a window that EXCEEDS N (§6.1): a parked loop
    // adds ~0 draws; an un-gated loop would add hundreds.
    const before = await lastCanvasDrawCount(page, GOO_BLOB_TESTID);
    await waitMs(page, SAMPLE_WINDOW_MS);
    const after = await lastCanvasDrawCount(page, GOO_BLOB_TESTID);

    expect(
        after - before,
        `blob drew ${after - before} frames over ${SAMPLE_WINDOW_MS}ms of true idle — the render loop is NOT parked (W3-3 idle-gate regressed)`,
    ).toBeLessThanOrEqual(PARKED_DRAW_SLACK);
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
        // A settled frame: past the park, the sleepy pose is frozen.
        await waitMs(page, PARK_SETTLE_MS);
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
