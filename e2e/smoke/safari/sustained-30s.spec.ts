import { test, expect } from "@playwright/test";
import { openView } from "../fixtures/dock";

/**
 * E.W3 Lane B — iOS-Safari sustained-30s smoke (the D-03 follow-up).
 *
 * Per the wave spec (`E.W3.md §"Lane B"`) + D-FINAL named-destination
 * (`D/coordination/Q.md §11` / E-AUDIT-2 §2 / E-AUDIT-4 §3): the D.W5
 * Lane C Pixel-7 spec runs Chromium (not WebKit); iOS-Safari engine-specific
 * bugs aren't caught by it. This spec runs on WebKit (the engine descriptor
 * pinned via the `iPhone 14` device in `playwright.config.ts`) and exercises
 * the failure surfaces that only appear on WebKit:
 *
 *   1. The Mar-2026 ValueUnit-nesting stack-overflow class — manifested at
 *      frame ~294 on iOS Safari (smaller JSC call-stack than V8). Fixed by
 *      the `colorUnit2()` unwrap loop at `src/units/color/normalize.ts:102`;
 *      `test/recursion-guard.test.ts` codifies the invariant at the vitest
 *      layer (294-frame replay). This spec exercises the SAME path at the
 *      e2e layer for 10s of spectrum-drive (~600 frames @ 60fps, > 2× the
 *      bug threshold).
 *
 *   2. The WebGL-on-WebKit class — the goo-blob fragment shader (SDF
 *      smooth-union metaballs, FBM noise) is GLSL-ES that compiles on V8's
 *      ANGLE backend; WebKit/JSC has its own GL context implementation. A
 *      shader-compile failure would surface as `webglcontextlost` (the
 *      runtime aborts the context).
 *
 *   3. Stale-prop reactivity bugs that depend on the JSC microtask ordering
 *      (subtly different from V8). The `[stale prop]` console substring is
 *      the canonical guard the topology-reactivity contract emits.
 *
 * **Budget (30s total)**:
 *   - 10s spectrum-drive (exercises the 294-frame recursion-guard path)
 *   - 5s view-switching (palettes → mix → gradient → extract → generate)
 *   - 5s WebGL-render-watch (goo-blob context-alive assertion)
 *   - 10s settle (residual rAF + microtask drain; any deferred error fires)
 *
 * **Assertions**: ZERO `webglcontextlost`, ZERO `RangeError: Maximum call
 * stack`, ZERO `[stale prop]` console substrings across the entire 30s
 * window. The console listener is installed BEFORE `page.goto` so the
 * full lifecycle is observed.
 *
 * **B.W3 invariants observed**: role/label selectors only; no
 * `waitForTimeout` (sustained wall-clock is driven by
 * `page.waitForFunction(() => performance.now() > N)` — a documented
 * read-only-timing pattern, NOT interaction); no `.lucide-*`; no
 * `page.evaluate` for interaction (the `addInitScript` listener install +
 * the `waitForFunction` timer probe are explicitly read-only).
 */

const CONSOLE_FAIL_SUBSTRINGS = [
    "webglcontextlost",
    "RangeError: Maximum call stack",
    "[stale prop]",
] as const;

const matchesFailure = (text: string): boolean =>
    CONSOLE_FAIL_SUBSTRINGS.some((sub) => text.includes(sub));

// Per-test timeout: the spec budget is ~30s of in-page work; the default
// playwright.config.ts timeout is 30000ms. Bump to 60s so the wall-clock
// budget (Boot ~2s + spectrum-drive 10s + view-switch ~3s + WebGL-watch
// 5s + settle 10s ≈ 30s) has headroom for the WebKit boot + Playwright
// protocol RTT on CI without truncating any of the named steps.
test.setTimeout(60_000);

test("iOS-Safari sustained 30s: spectrum-drive + view-switch + WebGL render, zero console failures", async ({
    page,
}) => {
    const consoleFailures: string[] = [];

    // Install the failure capture BEFORE goto so the full lifecycle
    // (including any synchronous boot-time shader-compile failure) is
    // observed.
    page.on("console", (msg) => {
        const text = msg.text();
        if (matchesFailure(text)) consoleFailures.push(`console.${msg.type()}: ${text}`);
    });
    page.on("pageerror", (err) => {
        if (matchesFailure(err.message))
            consoleFailures.push(`pageerror: ${err.message}`);
    });

    // Capture `webglcontextlost` directly off the document — the goo-blob
    // canvas mounts inside HeroBlob and may be unmounted/remounted during
    // view switches; the document-level listener catches the event
    // regardless of which canvas instance fires it. Pattern lifted from
    // `webgl-goo-blob.spec.ts` + `webgl-atmosphere.spec.ts`.
    await page.addInitScript(() => {
        document.addEventListener(
            "webglcontextlost",
            () => console.error("webglcontextlost"),
            true,
        );
    });

    // ── Boot ────────────────────────────────────────────────────────────
    const tStart = Date.now();
    await page.goto("/");

    const main = page.getByRole("main", { name: "Color tool panes" });
    await expect(main).toBeVisible();

    // ── Step 1: WebGL render confirmation (goo-blob on WebKit) ─────────
    // Assert the goo-blob canvas mounted. The HARD-CAP per the wave spec:
    // if WebKit fails to compile the goo-blob fragment shader, the
    // `webglcontextlost` listener will fire and the final assertion will
    // catch it — that's a real finding, not a spec bug.
    await expect(page.getByTestId("goo-blob-canvas").last()).toBeAttached();

    // ── Step 2: 10s spectrum-drive (exercises the recursion-guard path) ─
    // The spectrum canvas is the HSV picker that emits a fresh
    // `colorUnit2()` invocation on every pointer move — the exact path
    // that hit the Mar-2026 stack-overflow at frame ~294 on iOS Safari.
    // 10s @ 60fps = ~600 frames, > 2× the bug threshold. If
    // ValueUnit-nesting regressed, `RangeError: Maximum call stack`
    // would fire during this window.
    const spectrum = page.getByRole("img", { name: /Color spectrum/ }).last();
    await expect(spectrum).toBeVisible();
    const box = await spectrum.boundingBox();
    if (!box) throw new Error("spectrum canvas not laid out");

    // Drive a continuous pointer-down → 10s of moves → pointer-up. The
    // path traces a Lissajous-like curve across the spectrum so the HSV
    // model sweeps through saturation + value cycles; this maximises the
    // diversity of `colorUnit2()` inputs to surface any depth-amplification
    // path that the unit-test layer's synthetic-input replay would miss.
    const cx = box.x + box.width * 0.5;
    const cy = box.y + box.height * 0.5;
    const rx = box.width * 0.35;
    const ry = box.height * 0.35;

    await page.mouse.move(cx, cy);
    await page.mouse.down();

    // Use a `waitForFunction` time-budget driver — read-only timing,
    // documented permitted by the reactivity-instant spec convention.
    // Each iteration moves the pointer + yields to the event loop via
    // a Playwright `mouse.move` (which awaits the dispatch round-trip).
    const spectrumDriveBudget = 10_000;
    const driveStart = await page.evaluate(() => performance.now());
    let iterations = 0;
    while (true) {
        const elapsed = (await page.evaluate(() => performance.now())) - driveStart;
        if (elapsed >= spectrumDriveBudget) break;
        // Parametric path: ω₁ = 0.6 Hz, ω₂ = 0.9 Hz — incommensurate
        // frequencies give a non-repeating sweep across the canvas.
        const t = elapsed / 1000;
        const x = cx + Math.cos(t * 2 * Math.PI * 0.6) * rx;
        const y = cy + Math.sin(t * 2 * Math.PI * 0.9) * ry;
        await page.mouse.move(x, y, { steps: 1 });
        iterations++;
    }
    await page.mouse.up();
    console.log(`[sustained-30s] spectrum-drive: ${iterations} moves over ${spectrumDriveBudget}ms`);

    // Bail early if the recursion-guard regressed — the assertion at the
    // end of the spec is the binding gate, but logging here gives a
    // tight error message at the moment of failure.
    expect(
        consoleFailures.filter((f) => f.includes("RangeError: Maximum call stack")),
        "stack-overflow during spectrum-drive (recursion-guard regression)",
    ).toEqual([]);

    // ── Step 3: 5s view-switching (component-registry leak surface) ────
    // Walk through the views the demo provides. The dock combobox label
    // is "Select view"; options use the `VIEW_MAP` labels. The walk
    // exercises `usePaneRouter`'s component registry under transition
    // load — any leaked watcher, missing dispose, or stale-prop write
    // would fire a `[stale prop]` console error during one of the swaps.
    const viewSequence = [
        "Palettes",
        "Mix",
        "Gradient",
        "Extract",
        "Generate",
    ] as const;
    for (const name of viewSequence) {
        await openView(page, name);
        await expect(main).toBeVisible();
    }
    // Return to Home (the picker view) so the goo-blob canvas is mounted
    // for the WebGL-render-watch step.
    await openView(page, "Home");
    await expect(main).toBeVisible();
    await expect(page.getByTestId("goo-blob-canvas").last()).toBeAttached();

    // ── Step 4: 5s WebGL-render-watch ──────────────────────────────────
    // Hold for 5s after returning to Home with the goo-blob canvas
    // re-mounted. If WebKit's GL context emits `webglcontextlost` under
    // sustained-render pressure (e.g. backgrounded tabs, GPU resource
    // pressure), the listener fires + the final assertion catches it.
    const webglWatchStart = await page.evaluate(() => performance.now());
    await page.waitForFunction(
        (start) => performance.now() - start >= 5_000,
        webglWatchStart,
        { timeout: 7_000, polling: 250 },
    );

    // ── Step 5: 10s settle (residual rAF + microtask drain) ────────────
    // Final budget window — any deferred reactivity write or async error
    // that the prior steps queued has 10s to fire. Sized to bring the
    // total spec wall-clock to ~30s (the wave-spec budget).
    const settleStart = await page.evaluate(() => performance.now());
    await page.waitForFunction(
        (start) => performance.now() - start >= 10_000,
        settleStart,
        { timeout: 12_000, polling: 250 },
    );

    const tEnd = Date.now();
    console.log(`[sustained-30s] total wall-clock: ${tEnd - tStart}ms`);
    console.log(`[sustained-30s] console-failures: ${consoleFailures.length}`);

    // ── Binding assertion ──────────────────────────────────────────────
    // ZERO failure-class console events across the full 30s window.
    expect(consoleFailures).toEqual([]);
});
