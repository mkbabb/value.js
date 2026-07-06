import { expect } from "@playwright/test";
import type { Page } from "@playwright/test";

/**
 * S.W3 ORACLE — the transition-family frame-budget harness (SYNTHESIS §6.1 P1
 * oracle rows; §6.2 budgets; S.W3.md §Hard-gate 1 + 5).
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * THE §6.2 GATES ARE 120 Hz-HARDWARE NUMBERS. The budgets were captured on an
 * M-series dev host at dpr=1 (SYNTHESIS §6.2 footnote: "captured at dpr=1 on an
 * M5 Max"). A 120 Hz display has an ~8.3 ms vsync floor; the drag ≤20 ms and
 * idle ≤13 ms gates live just above it. The standing e2e projects, by contrast,
 * force ANGLE-SwiftShader software rasterisation (`playwright.config.ts` — the
 * headless-stability requirement): software raster + a ~40 fps compositor floor
 * (~25-42 ms/frame measured, with dozens of >50 ms software-raster tasks under
 * an active drag) CANNOT reproduce the M-series numbers by construction. Wiring
 * the raw §6.2 numbers as unconditional assertions in the SwiftShader harness
 * would red the suite on correct hardware-passing behaviour.
 *
 * So this harness is RENDERER-AWARE and never silently re-baselines (R lesson 3,
 * S.W3.md §No-workaround):
 *   • REAL-GPU run (headed / GPU CI): assert the EXACT §6.2 numbers. Verified on
 *     the built bundle on the M-series host at wave close — drag p50 8.3 ms,
 *     view-switch first-frame 1.3 ms, idle p50 8.3 ms, 0 long tasks (see
 *     docs/tranches/S/audit/w3-frame-budget-measure.md).
 *   • SOFTWARE-GL run (the standing SwiftShader projects): assert engine-robust
 *     regression ceilings (documented below, generous vs the measured software
 *     floor) + the cross-engine-invariant §6.2 rows that DO hold under software
 *     (view-switch long-task ≤50 ms; idle sampling window > N). Every run LOGS
 *     the measured p50/p95/first-frame against the §6.2 gate, so the number is
 *     always on the record — a recorded caveat, not a silent substitution.
 *
 * The software ceilings are NOT the gate; they are a floor that still catches a
 * gross regression (an uncoalesced fan-out, a blocking pane mount, an un-parked
 * idle loop) while tolerating software-raster cost. The authoritative §6.2 gate
 * is the built-bundle real-GPU measurement archived at wave close.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/** The §6.2 budgets, verbatim — the gate asserted on real-GPU runs. */
export const GATE = {
    dragP50Ms: 20,
    dragLongTaskMs: 50, // 0 tasks longer than this, in-drag
    viewSwitchFirstFrameMs: 100,
    viewSwitchLongTaskMs: 50,
    idleP50Ms: 13,
} as const;

/**
 * Software-GL regression ceilings — generous vs the SwiftShader floor measured
 * on the BUILT bundle (drag p50 58-100 ms + dozens of software-raster tasks,
 * maxTask 327-413 ms; view-switch first-frame ~216 ms + a ~234 ms software-raster
 * pane-mount task; idle p50 25-42 ms). These are NOT the §6.2 gate — under
 * software raster the per-frame WebGL cost AND the pane-mount both inflate into
 * >50 ms tasks that a real GPU renders in <1 ms (measured: hardware maxTask 0).
 * So on software we assert only FREEZE guards (a task running into the hundreds-
 * of-ms → seconds means the fan-out/mount actually regressed to blocking) + the
 * structural > N idle window; the tight §6.2 p50/first-frame/long-task numbers
 * are asserted on the real-GPU branch. See the file docstring.
 */
// These are deliberately LOOSE — a catastrophic-hang guard, not the gate. Under
// software raster the per-frame WebGL cost (aurora + spectrum) AND the pane mount
// inflate into hundreds of ms of task time that a real GPU renders in <1 ms; on
// GitHub Actions (CPU ~2-4× slower than the M5 Max these were tuned on: local
// worst-observed drag maxTask ~520 ms, view first-frame ~120 ms / task ~230 ms,
// idle p50 ~50 ms) those scale up further. The ceilings sit ~5× above the local
// software floor so they never flake, yet still catch a genuine multi-second
// freeze (an uncoalesced fan-out, a blocking pane mount, a stalled idle loop).
// The authoritative §6.2 p50/first-frame/long-task numbers are asserted on the
// real-GPU branch (verified on the built bundle: drag 8.4 ms, view 8.3 ms, idle
// 8.3 ms, 0 long tasks). The blob idle-park is separately proven engine-
// independently by the draw-plateau oracle (webgl-goo-blob-idle.spec.ts).
export const SOFT_CEIL = {
    dragMaxTaskMs: 3000,
    viewSwitchFirstFrameMs: 1500,
    viewSwitchMaxTaskMs: 3000,
    idleP50Ms: 500,
    idleMinFrames: 3, // liveness — the rAF loop is ticking, the page isn't frozen
} as const;

/** WebGL2 renderer string — distinguishes real GPU from ANGLE-SwiftShader. */
export async function detectRenderer(page: Page): Promise<string> {
    return page.evaluate(() => {
        const canvas = document.createElement("canvas");
        const gl =
            (canvas.getContext("webgl2") as WebGL2RenderingContext | null) ??
            (canvas.getContext("webgl") as WebGLRenderingContext | null);
        if (!gl) return "no-webgl";
        const ext = gl.getExtension("WEBGL_debug_renderer_info");
        return ext
            ? String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL))
            : "masked";
    });
}

export function isSoftwareGL(renderer: string): boolean {
    return /swiftshader|llvmpipe|software|microsoft basic|no-webgl/i.test(
        renderer,
    );
}

/**
 * Install the in-page frame/long-task collector. MUST be called BEFORE
 * `page.goto` (via addInitScript, so the long-task observer is armed before any
 * task lands). `__resetFrames()` zeroes the window at the start of a measured
 * interaction; read `__frames` (rAF inter-frame deltas, ms) and `__longtasks`
 * (PerformanceObserver longtask durations, ms) after.
 *
 * Read-only timing instrumentation only — the B.W3 Lane D ban is on
 * `page.evaluate` DRIVING DOM interaction, not on reading `performance` timing
 * (the reactivity-instant.spec.ts carve-out).
 */
export async function installFrameCollector(page: Page): Promise<void> {
    await page.addInitScript(() => {
        interface FrameWin {
            __frames: number[];
            __longtasks: number[];
            __resetFrames: () => void;
            __lastTs: number;
            __raf: number;
        }
        const w = window as unknown as FrameWin;
        w.__frames = [];
        w.__longtasks = [];
        let last = performance.now();
        w.__lastTs = last;
        const tick = (now: number) => {
            w.__frames.push(now - last);
            last = now;
            w.__lastTs = now; // the last painted-frame timestamp (rAF clock)
            w.__raf = requestAnimationFrame(tick);
        };
        w.__raf = requestAnimationFrame(tick);
        w.__resetFrames = () => {
            w.__frames = [];
            w.__longtasks = [];
            last = performance.now();
            w.__lastTs = last;
        };
        try {
            new PerformanceObserver((list) => {
                for (const e of list.getEntries())
                    w.__longtasks.push(e.duration);
            }).observe({ entryTypes: ["longtask"] });
        } catch {
            /* longtask API absent (WebKit) — the specs run Chromium-only */
        }
    });
}

export function resetFrames(page: Page): Promise<void> {
    return page.evaluate(() =>
        (window as unknown as { __resetFrames: () => void }).__resetFrames(),
    );
}

export function readFrames(page: Page): Promise<number[]> {
    return page.evaluate(() =>
        (window as unknown as { __frames: number[] }).__frames.slice(),
    );
}

export function readLongTasks(page: Page): Promise<number[]> {
    return page.evaluate(() =>
        (window as unknown as { __longtasks: number[] }).__longtasks.slice(),
    );
}

/** Nearest-rank percentile (0-100). NaN on empty. */
export function percentile(values: number[], p: number): number {
    if (!values.length) return NaN;
    const sorted = [...values].sort((a, b) => a - b);
    return sorted[Math.min(sorted.length - 1, Math.floor((p / 100) * sorted.length))];
}

/** Read-only wall-clock wait — the reactivity/idle-spec `performance.now()` idiom. */
export async function waitMs(page: Page, ms: number): Promise<void> {
    const start = await page.evaluate(() => performance.now());
    await page.waitForFunction(
        (a) => performance.now() - a.start >= a.ms,
        { start, ms },
        { timeout: ms + 5_000, polling: 100 },
    );
}
