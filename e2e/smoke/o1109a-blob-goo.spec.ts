// SERVED MODEL: claude-opus-5-5
//
// o1109 blob lane: the goo is pronounced and the body is painted, not shaded.
//
// The owner, 2026-11-09, on color.babb.dev (the hero bead in the readout card,
// one small pseudopod, a heavily shaded sphere): "satellite blobs and goo
// morphing needs to be more pronounced, less shaded".
//
// Measured on the rendered bead, never a config flag. The page is plated
// black and everything else on it is hidden (visibility), so the frame
// holds only goo pixels; the wrapper's drop-shadow is dropped for the read
// (it paints outside the body and is not the body's shading). Each frame is
// read in the producer's uv (the wrapper box): the body radius is the median outermost mask radius over
// 360 angles, and from it:
//   · lobes    — angular runs where the goo reaches past 1.25 body radii: the
//                satellites visible as beads or pseudopods;
//   · mass     — goo area beyond 1.12 body radii, over the body disc area;
//   · neck     — the widest bridge crossing the 1.18-radius circle that is
//                not the whole circle, in body radii (the merge/split neck);
//   · clip     — the share of the wrapper's edge the goo touches (the
//                wrapper's paint containment cuts the goo flat there; 0 = no cut);
//   · shade    — the OKLab L spread (p97 − p3) over the body interior
//                (r < 0.9 body radii): the specular/rim/terminator range.
// A 10 s window samples a frame every 500 ms. The live tier (W12_REAL_GPU=1)
// is where the goo moves; the software tier paints, parks and holds one frame,
// which carries the same geometry and shading. Under reduced motion the
// producer holds one static frame: the satellites must still read in it.
import { writeFile } from "node:fs/promises";
import { test, expect, type Page } from "@playwright/test";
import { mainPane } from "./fixtures/dock";
import { decodePng, meanAbsDiff, type DecodedImage } from "./fixtures/frame-diff";
import { waitMs, detectRenderer, isSoftwareGL } from "./perf/frame-budget";
import { useRealGpuCell } from "./perf/real-gpu";
import { GOO_BLOB_TESTID, instrumentWebglDraws, lastCanvasDrawCount } from "./fixtures/webgl-appearance";

useRealGpuCell();

const CANVAS = `[data-testid="${GOO_BLOB_TESTID}"]`;
const WINDOW_MS = 10_000;
const STEP_MS = 500;
const WIDTHS = [360, 390, 430, 820, 1440] as const;
const SCHEMES = ["light", "dark"] as const;

/** sRGB byte → OKLab L. */
function oklabL(r: number, g: number, b: number): number {
    const lin = (c: number) => {
        const v = c / 255;
        return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
    };
    const R = lin(r), G = lin(g), B = lin(b);
    const l = Math.cbrt(0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B);
    const m = Math.cbrt(0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B);
    const s = Math.cbrt(0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B);
    return 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
}

interface GooFrame {
    lobes: number;
    mass: number;
    neck: number;
    shade: number;
    clip: number;
}

/** Read one plated frame of the canvas (see the header for each metric). */
function readGoo(img: DecodedImage, span: number): GooFrame {
    const { width: W, height: H, channels: C, data } = img;
    const mask = new Uint8Array(W * H);
    for (let i = 0; i < W * H; i++) {
        const o = i * C;
        mask[i] = Math.max(data[o]!, data[o + 1]!, data[o + 2]!) > 14 ? 1 : 0;
    }
    const cx = W / 2, cy = H / 2;
    const S = span; // the producer's uv unit: the wrapper box, in screenshot px
    const BINS = 360;
    const reach = new Float64Array(BINS);
    for (let y = 0; y < H; y++)
        for (let x = 0; x < W; x++) {
            if (!mask[y * W + x]) continue;
            const dx = x - cx, dy = y - cy;
            const r = Math.hypot(dx, dy) / S;
            const bin = Math.floor(((Math.atan2(dy, dx) + Math.PI) / (2 * Math.PI)) * BINS) % BINS;
            if (r > reach[bin]!) reach[bin] = r;
        }
    const sorted = [...reach].sort((a, b) => a - b);
    const R = sorted[Math.floor(BINS / 2)]!;
    if (R <= 0) return { lobes: 0, mass: 0, neck: 0, shade: 0, clip: 0 };

    // lobes: runs of ≥ 3 bins past 1.25 R, wrapping the circle.
    const past = [...reach].map((r) => r > 1.25 * R);
    let lobes = 0;
    if (past.every(Boolean)) lobes = 1;
    else {
        const start = past.findIndex((p) => !p);
        let run = 0;
        for (let k = 1; k <= BINS; k++) {
            const p = past[(start + k) % BINS]!;
            if (p) run++;
            else {
                if (run >= 3) lobes++;
                run = 0;
            }
        }
    }

    // mass and shade
    let outside = 0;
    const Ls: number[] = [];
    for (let y = 0; y < H; y++)
        for (let x = 0; x < W; x++) {
            const i = y * W + x;
            if (!mask[i]) continue;
            const r = Math.hypot(x - cx, y - cy) / S;
            if (r > 1.12 * R) outside++;
            else if (r < 0.9 * R) {
                const o = i * C;
                Ls.push(oklabL(data[o]!, data[o + 1]!, data[o + 2]!));
            }
        }
    const mass = outside / (Math.PI * (R * S) ** 2);
    Ls.sort((a, b) => a - b);
    const shade = Ls.length ? Ls[Math.floor(Ls.length * 0.97)]! - Ls[Math.floor(Ls.length * 0.03)]! : 0;

    // neck: masked runs on the 1.18 R circle that are not the whole circle.
    const N = 1440, rr = 1.18 * R * S;
    const on: boolean[] = [];
    for (let k = 0; k < N; k++) {
        const a = (k / N) * 2 * Math.PI;
        const x = Math.round(cx + rr * Math.cos(a)), y = Math.round(cy + rr * Math.sin(a));
        on.push(x >= 0 && y >= 0 && x < W && y < H && mask[y * W + x] === 1);
    }
    let neck = 0;
    if (!on.every(Boolean) && on.some(Boolean)) {
        const start = on.findIndex((p) => !p);
        let run = 0;
        for (let k = 1; k <= N; k++) {
            if (on[(start + k) % N]) run++;
            else {
                neck = Math.max(neck, run);
                run = 0;
            }
        }
    }
    const neckR = (neck / N) * 2 * Math.PI * 1.18; // arc length in body radii
    // clip: goo pixels on the wrapper's edge (its paint containment cuts the
    // goo flat there), as a share of the edge.
    const half = S / 2;
    let edge = 0, edgeOn = 0;
    for (let k = -half; k <= half; k++) {
        for (const [x, y] of [[cx + k, cy - half], [cx + k, cy + half - 1], [cx - half, cy + k], [cx + half - 1, cy + k]] as const) {
            const xi = Math.round(x), yi = Math.round(y);
            if (xi < 0 || yi < 0 || xi >= W || yi >= H) continue;
            edge++;
            if (mask[yi * W + xi]) edgeOn++;
        }
    }
    return { lobes, mass, neck: neckR, shade, clip: edge ? edgeOn / edge : 0 };
}

async function bootPlated(page: Page) {
    await instrumentWebglDraws(page);
    await page.goto("/");
    await expect(mainPane(page)).toBeVisible();
    const canvas = page.locator(CANVAS).last();
    // The hero mounts behind the first post-paint idle tick (useIdleReady); on
    // a loaded host's software raster that tick can be late.
    await expect(canvas).toBeAttached({ timeout: 45_000 });
    await expect
        .poll(async () => (await canvas.boundingBox())?.width ?? 0, { timeout: 8_000 })
        .toBeGreaterThan(80);
    await expect
        .poll(() => lastCanvasDrawCount(page, GOO_BLOB_TESTID), { timeout: 15_000 })
        .toBeGreaterThan(0);
    if (process.env.O1109_FRAMES) {
        await waitMs(page, 1_200);
        const a = (await page.locator(".hero-blob-anchor").last().boundingBox())!;
        await page.screenshot({
            path: test.info().outputPath("context.png"),
            clip: { x: Math.max(0, a.x - 3 * a.width), y: Math.max(0, a.y - a.height / 2), width: 4 * a.width, height: 2 * a.height },
        });
    }
    await page.addStyleTag({
        content: `body * { visibility: hidden !important; }
            .goo-blob-wrapper, .goo-blob-wrapper * { visibility: visible !important; }
            html, body { background: #000 !important; }
            .goo-blob-wrapper { filter: none !important; }`,
    });
    await waitMs(page, 1_200);
    await canvas.scrollIntoViewIfNeeded();
    return canvas;
}

async function sampleWindow(page: Page, canvas: ReturnType<Page["locator"]>) {
    // The producer's uv is the wrapper box (the canvas is drawn 1.6× it and
    // the wrapper's paint containment bounds the goo to it).
    const [cb, wb] = await Promise.all([
        canvas.boundingBox(),
        page.locator(".goo-blob-wrapper").last().boundingBox(),
    ]);
    if (!cb || !wb) throw new Error("o1109-goo: blob not laid out");
    const frames: GooFrame[] = [];
    const imgs: DecodedImage[] = [];
    for (let t = 0; t < WINDOW_MS; t += STEP_MS) {
        if (t) await waitMs(page, STEP_MS);
        const png = await canvas.screenshot({ animations: "allow" });
        if (process.env.O1109_FRAMES) await writeFile(test.info().outputPath(`f${String(t).padStart(5, "0")}.png`), png);
        const img = decodePng(png);
        imgs.push(img);
        frames.push(readGoo(img, (img.width * wb.width) / cb.width));
    }
    const mean = (k: keyof GooFrame) => frames.reduce((s, f) => s + f[k], 0) / frames.length;
    const max = (k: keyof GooFrame) => Math.max(...frames.map((f) => f[k]));
    const sortedShade = frames.map((f) => f.shade).sort((a, b) => a - b);
    const motion = Math.max(0, ...imgs.slice(1).map((im, i) => meanAbsDiff(imgs[i]!, im)));
    return {
        lobesMean: mean("lobes"),
        lobesMax: max("lobes"),
        massMean: mean("mass"),
        neckMax: max("neck"),
        shadeMedian: sortedShade[Math.floor(sortedShade.length / 2)]!,
        clipMax: max("clip"),
        motion,
    };
}

for (const scheme of SCHEMES) {
    for (const width of WIDTHS) {
        test(`o1109a blob goo · ${width} ${scheme}: satellites pronounced, body painted`, async ({ page }) => {
            test.setTimeout(90_000);
            await page.setViewportSize({ width, height: width >= 820 ? 900 : 844 });
            await page.emulateMedia({ colorScheme: scheme });
            const canvas = await bootPlated(page);
            const software = isSoftwareGL(await detectRenderer(page));
            const m = await sampleWindow(page, canvas);
            console.log(`[o1109-goo] ${width} ${scheme} ${software ? "software" : "gpu"} ${JSON.stringify(m)}`);
            await canvas.screenshot({ path: test.info().outputPath(`goo-${width}-${scheme}.png`) });
            // Satellites read as beads: on average at least two lobes stand
            // past the body, and the goo outside the body is a real mass.
            expect(m.lobesMean, "too few satellites visible past the body").toBeGreaterThanOrEqual(2);
            expect(m.massMean, "the satellite mass outside the body is a sliver").toBeGreaterThanOrEqual(0.06);
            // A bridge is visible: some neck crossing the rim is wide.
            expect(m.neckMax, "no visible neck bridges a satellite to the body").toBeGreaterThanOrEqual(1);
            // The goo stays inside the wrapper's paint containment: never cut flat.
            expect(m.clipMax, "the goo is cut flat at the wrapper's edge").toBeLessThanOrEqual(0.02);
            // The body is painted, not lit: its interior L spread is narrow.
            expect(m.shadeMedian, "the body is still heavily shaded").toBeLessThanOrEqual(0.12);
        });
    }
}

test("o1109a blob goo · reduced motion: one static frame, satellites still read", async ({ page }) => {
    test.setTimeout(90_000);
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ reducedMotion: "reduce", colorScheme: "dark" });
    const canvas = await bootPlated(page);
    const m = await sampleWindow(page, canvas);
    console.log(`[o1109-goo] PRM 390 dark ${JSON.stringify(m)}`);
    expect(m.motion, "the PRM bead animates").toBe(0);
    expect(m.lobesMean, "too few satellites in the PRM frame").toBeGreaterThanOrEqual(2);
    expect(m.shadeMedian, "the PRM body is still heavily shaded").toBeLessThanOrEqual(0.12);
});
