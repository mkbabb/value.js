import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";

/**
 * S.W6-5 — WebKit atmosphere + hero verification (the missing Safari repro).
 *
 * Two audit-driven findings this stands up on the `smoke-safari` (iPhone 14,
 * WebKit) project — the vehicle the desktop-Chromium suite could not reach:
 *
 *  1. **Aurora paints on WebKit, post-L1.** `safari-truth.md §P0` found the
 *     aurora WebGL2 shader FAILED to compile on WebKit's native GLSL-ES
 *     validator (3 defects glass-ui `5cf8e8f0` introduced: a `flat`
 *     reserved-keyword local, a stale `vec3` forward-decl of a widened
 *     `vec4 structureTensorField`, and the downstream `vec3 tf = <vec4>`
 *     dimension mismatch). On every real Safari the field fell to the flat
 *     CSS placeholder. The L1 producer cure is dist-confirmed at glass-ui
 *     4.2.0 (`flatCol` rename + `vec4` forward-decl + `vec4 tf`). This test
 *     re-verifies the cure at runtime: the shader compiles (no `[aurora] init
 *     failed`), the WebGL substrate ARMS (`resolveRenderMode` → webgl, no
 *     gradient fallback painted), and the atmosphere canvas is live.
 *
 *  2. **The blob "spazz" repro (centroid-in-wrapper).** `safari-truth.md §P1`
 *     + `blob-genesis.md §1.3-2` name the spazz hypothesis — a 50ms dt-clamp
 *     frame-pacing lurch, compounded by the dual-WebGL2-surface contention
 *     (on WebKit the goo-blob AND the aurora each hold a live WebGL2 context;
 *     on Chrome the blob takes WebGPU so the contention never arises). The
 *     literal spazz did NOT reproduce on desktop Chrome, so it needs the
 *     WebKit vehicle. This test drives the picker HARD while both GL surfaces
 *     render, sampling the visible metaball centroid; the spazz assertion is
 *     that the centroid stays within the hero WRAPPER box across the drive
 *     (a spazz throws the body out of its footprint), with zero context loss.
 *
 * Report-only per the wave (`S.W6.md` W6-5): a reproduced spazz that
 * implicates the demo's consume geometry vs the producer contention hypothesis
 * re-routes the L5 ask on evidence — this spec captures the evidence, it does
 * not fix.
 *
 * A vivid blue boot color (`oklch(0.65 0.22 250)`) is fed via the URL hash so
 * the opaque metaball body contrasts sharply with the light card surface — the
 * centroid is isolated by per-screenshot distance-from-corner-background, which
 * needs the body to differ from the wash behind it.
 *
 * B.W3 invariants: role/label + testid selectors; `waitForFunction`
 * read-only-timing (no `waitForTimeout`); the `page.evaluate` calls decode a
 * compositor screenshot + read layout — read-only, never interaction.
 */

const BOOT_URL = "/#/picker?space=oklch&color=oklch(0.65 0.22 250)";

const CONSOLE_FAIL_SUBSTRINGS = [
    "webglcontextlost",
    "RangeError: Maximum call stack",
    "[stale prop]",
    // safari-truth §P0 candidate item: turn the invisible aurora-WebKit P0 into
    // a hard gate. With L1 cured these stay silent; a regression re-reddens.
    "[aurora] init failed",
    "shader compile failed",
] as const;

const matchesFailure = (text: string): boolean =>
    CONSOLE_FAIL_SUBSTRINGS.some((sub) => text.includes(sub));

function installFailureCapture(page: Page, sink: string[]): Promise<void> {
    page.on("console", (msg) => {
        const text = msg.text();
        if (matchesFailure(text)) sink.push(`console.${msg.type()}: ${text}`);
    });
    page.on("pageerror", (err) => {
        if (matchesFailure(err.message)) sink.push(`pageerror: ${err.message}`);
    });
    // Surface a raw context-loss event even if no console.error is wired.
    return page.addInitScript(() => {
        document.addEventListener(
            "webglcontextlost",
            () => console.error("webglcontextlost"),
            true,
        );
    });
}

test.describe("S.W6-5 WebKit atmosphere + hero", () => {
    test("aurora paints on WebKit (L1 shader cure re-verify)", async ({ page }) => {
        const failures: string[] = [];
        await installFailureCapture(page, failures);

        await page.goto(BOOT_URL);
        await expect(page.getByRole("main", { name: "Color tool panes" })).toBeVisible();

        const atmosphere = page.getByTestId("atmosphere-canvas");
        await expect(atmosphere).toBeAttached();
        const box = await atmosphere.boundingBox();
        expect(box, "atmosphere canvas must be laid out").not.toBeNull();
        expect(box!.width).toBeGreaterThan(0);
        expect(box!.height).toBeGreaterThan(0);

        // Let the deferred aurora arm + first frame land.
        await page.waitForFunction(() => performance.now() > 2500);

        // The render-mode signal: css-substrate mode paints a linear-gradient
        // BACKGROUND on the atmosphere canvas; webgl mode leaves it unset and
        // the shader owns the paint. A webgl arm with NO init-failed is the
        // positive proof the L1-cured shader compiled + runs on WebKit.
        const mode = await page.evaluate(() => {
            const el = document.querySelector(
                '[data-testid="atmosphere-canvas"]',
            ) as HTMLElement | null;
            const inlineBg = el?.style.backgroundImage ?? "";
            const computedBg = el ? getComputedStyle(el).backgroundImage : "";
            let renderer = "unknown";
            try {
                const c = document.createElement("canvas");
                const gl = c.getContext("webgl2");
                if (!gl) renderer = "no-webgl2";
                else {
                    const ext = gl.getExtension("WEBGL_debug_renderer_info");
                    renderer = ext
                        ? String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL))
                        : "no-debug-ext";
                }
            } catch (e) {
                renderer = "throw:" + String(e);
            }
            return {
                hasGradientFallback:
                    /gradient/i.test(inlineBg) || /gradient/i.test(computedBg),
                renderer,
            };
        });
        console.log(`[w6-5 aurora] renderer=${mode.renderer} gradientFallback=${mode.hasGradientFallback}`);

        // The cure gate (BINDING): the shader compiled — no init-failed fired.
        expect(
            failures.filter(
                (f) => f.includes("[aurora] init failed") || f.includes("shader compile failed"),
            ),
            "aurora shader must compile on WebKit (L1 cure)",
        ).toEqual([]);

        // WebGL substrate armed on this WebKit vehicle (Apple GPU → not the
        // software-raster css downgrade), so the cured shader path was actually
        // exercised. If a GPU-blocklisted WebKit takes the css substrate the
        // message names it — an environment mode difference, not an L1 regress.
        expect(
            mode.hasGradientFallback,
            `aurora should arm the WebGL substrate on WebKit (renderer=${mode.renderer}); a gradient fallback means the css substrate was chosen (software renderer), not that the L1 shader regressed`,
        ).toBe(false);

        expect(failures, "no GL/console failures during aurora warm-up").toEqual([]);
    });

    test("blob centroid stays in wrapper under dual-WebGL2 drive (spazz repro)", async ({
        page,
    }) => {
        const failures: string[] = [];
        await installFailureCapture(page, failures);

        await page.goto(BOOT_URL);
        await expect(page.getByRole("main", { name: "Color tool panes" })).toBeVisible();

        // BOTH GL surfaces live — the dual-WebGL2-contention vehicle.
        const canvas = page.getByTestId("goo-blob-canvas").last();
        await expect(canvas).toBeAttached();
        await expect(page.getByTestId("atmosphere-canvas")).toBeAttached();

        // Settle the first blob frame (W3-2 idle-callback defer).
        await page.waitForFunction(() => performance.now() > 2500);

        // --- centroid sampler ---------------------------------------------
        // Screenshot the blob canvas region (compositor capture — robust to the
        // renderer's preserveDrawingBuffer:false), decode it in-page via a
        // base64 round-trip (the browser owns a PNG decoder), and locate the
        // opaque body by its distance from the four background corners of the
        // clip (the body sits inset ~25% within the 160%-of-wrapper canvas, so
        // the corners are always pure background). Map image px → page px via
        // devicePixelRatio; the screenshot origin maps to the clip origin even
        // when the right edge is viewport-clamped.
        const INK_THRESHOLD = 85; // calibrated: isolates the vivid body from the wash
        const MIN_INK = 1200; // device px; below this the body is washed out / absent

        type Sample = {
            hasInk: boolean;
            inkCount: number;
            cx: number | null; // page px
            cy: number | null;
        };

        async function sampleCentroid(): Promise<Sample> {
            const cbox = await canvas.boundingBox();
            if (!cbox) return { hasInk: false, inkCount: 0, cx: null, cy: null };
            const png = await page.screenshot({
                clip: { x: cbox.x, y: cbox.y, width: cbox.width, height: cbox.height },
            });
            const b64 = png.toString("base64");
            return page.evaluate(
                async ({ dataUrl, clipX, clipY, threshold }) => {
                    const img = new Image();
                    await new Promise<void>((res, rej) => {
                        img.onload = () => res();
                        img.onerror = () => rej(new Error("decode fail"));
                        img.src = dataUrl;
                    });
                    const w = img.naturalWidth;
                    const h = img.naturalHeight;
                    const cv = document.createElement("canvas");
                    cv.width = w;
                    cv.height = h;
                    const ctx = cv.getContext("2d")!;
                    ctx.drawImage(img, 0, 0);
                    const d = ctx.getImageData(0, 0, w, h).data;
                    const at = (x: number, y: number) => {
                        const i = (y * w + x) * 4;
                        return [d[i]!, d[i + 1]!, d[i + 2]!];
                    };
                    const corners = [
                        at(2, 2),
                        at(w - 3, 2),
                        at(2, h - 3),
                        at(w - 3, h - 3),
                    ];
                    const bg = [0, 1, 2].map(
                        (k) => corners.reduce((s, c) => s + c[k]!, 0) / corners.length,
                    );
                    let sx = 0,
                        sy = 0,
                        n = 0;
                    for (let y = 0; y < h; y++) {
                        for (let x = 0; x < w; x++) {
                            const p = at(x, y);
                            const dist = Math.sqrt(
                                (p[0]! - bg[0]!) ** 2 +
                                    (p[1]! - bg[1]!) ** 2 +
                                    (p[2]! - bg[2]!) ** 2,
                            );
                            if (dist > threshold) {
                                sx += x;
                                sy += y;
                                n++;
                            }
                        }
                    }
                    const dpr = window.devicePixelRatio || 1;
                    return {
                        hasInk: n > 0,
                        inkCount: n,
                        cx: n ? clipX + sx / n / dpr : null,
                        cy: n ? clipY + sy / n / dpr : null,
                    };
                },
                { dataUrl: `data:image/png;base64,${b64}`, clipX: cbox.x, clipY: cbox.y, threshold: INK_THRESHOLD },
            );
        }

        // The hero wrapper (the GooBlob root `.goo-blob-wrapper`, parent of the
        // canvas) — the footprint the body must not spazz out of.
        async function wrapperBox() {
            const b = await canvas.locator("xpath=..").boundingBox();
            if (!b) throw new Error("no wrapper box");
            return b;
        }

        // --- drive: rapid spectrum scrub, both surfaces live, sample between ---
        const spectrum = page.getByRole("img", { name: /Color spectrum/ }).last();
        await expect(spectrum).toBeVisible();
        const sbox = await spectrum.boundingBox();
        if (!sbox) throw new Error("spectrum not laid out");
        const cx = sbox.x + sbox.width * 0.5;
        const cy = sbox.y + sbox.height * 0.5;
        // Stay in the vivid inner region so the driven color keeps contrast.
        const rx = sbox.width * 0.25;
        const ry = sbox.height * 0.25;

        await page.mouse.move(cx, cy);
        await page.mouse.down();

        const samples: Sample[] = [];
        const t0 = await page.evaluate(() => performance.now());
        const BURSTS = 8;
        for (let b = 0; b < BURSTS; b++) {
            // A burst of rapid moves — sustained uniform uploads + excited mood
            // + deformation, both GL contexts contending.
            for (let k = 0; k < 14; k++) {
                const t = ((await page.evaluate(() => performance.now())) - t0) / 1000;
                const x = cx + Math.cos(t * 2 * Math.PI * 0.7) * rx;
                const y = cy + Math.sin(t * 2 * Math.PI * 1.1) * ry;
                await page.mouse.move(x, y, { steps: 1 });
            }
            samples.push(await sampleCentroid());
        }
        await page.mouse.up();

        // Two settle samples after release.
        await page.waitForFunction(() => performance.now() > 0);
        samples.push(await sampleCentroid());
        await page.waitForFunction((s) => performance.now() - s > 400, await page.evaluate(() => performance.now()));
        samples.push(await sampleCentroid());

        const wrap = await wrapperBox();
        const TOL = 12; // px slack for the AA halo at the footprint edge

        const inkSamples = samples.filter((s) => s.hasInk && s.inkCount >= MIN_INK);
        const outOfWrapper = inkSamples.filter(
            (s) =>
                s.cx! < wrap.x - TOL ||
                s.cx! > wrap.x + wrap.width + TOL ||
                s.cy! < wrap.y - TOL ||
                s.cy! > wrap.y + wrap.height + TOL,
        );

        // Frame-to-frame centroid excursion (evidence for the lurch hypothesis).
        let maxJump = 0;
        for (let i = 1; i < inkSamples.length; i++) {
            const a = inkSamples[i - 1]!;
            const b = inkSamples[i]!;
            maxJump = Math.max(maxJump, Math.hypot(b.cx! - a.cx!, b.cy! - a.cy!));
        }

        console.log(
            `[w6-5 spazz] wrapper=${JSON.stringify({
                x: Math.round(wrap.x),
                y: Math.round(wrap.y),
                w: Math.round(wrap.width),
                h: Math.round(wrap.height),
            })} inkSamples=${inkSamples.length}/${samples.length} maxJumpPx=${maxJump.toFixed(1)} centroids=${JSON.stringify(
                inkSamples.map((s) => ({ x: Math.round(s.cx!), y: Math.round(s.cy!), ink: s.inkCount })),
            )}`,
        );

        // The vehicle must actually observe the blob for the assertion to mean
        // anything (guards against a silent no-paint on headless WebKit).
        expect(
            inkSamples.length,
            "the blob must paint on WebKit for the spazz assertion to be meaningful",
        ).toBeGreaterThanOrEqual(3);

        // THE SPAZZ ASSERTION (centroid-in-wrapper): every observed body
        // centroid stays inside the hero footprint. A failure here = the spazz
        // REPRODUCED — capture `outOfWrapper` as the evidence and route the L5
        // ask (report, don't fix).
        expect(
            outOfWrapper,
            "blob centroid left the wrapper (spazz reproduced) — evidence for the L5 producer route",
        ).toEqual([]);

        // No context loss / shader failure / recursion across the dual-surface drive.
        expect(failures, "no GL/console failures during dual-WebGL2 drive").toEqual([]);
    });
});
