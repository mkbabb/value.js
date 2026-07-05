/**
 * The mix convergence CLOCK — S.W3-6 / Q10 first-principles re-work.
 *
 * THE NARRATION IS THE MIX. Each selected source releases a soft pigment drop
 * from its actual chip position (`[data-mix-source]`); the drops arc across
 * the plate toward the result plate's awaiting well (`[data-mix-target]`, the
 * seeded WatercolorDot ghost), surrendering their identity en route — every
 * drop's pigment rides a `sampleColorRamp()` perceptual ramp from its own
 * color to the TRUE mixed result, in the SAME interpolation space + hue
 * method the mix math itself ran. All drops arrive together (a chord, not a
 * queue) at `MIX_ARRIVE_MS`; the merged pool swells, settles with one soft
 * ripple by `MIX_CONVERGE_MS`, and the DOM plate inks in beneath the
 * dissolving pool. The convergence LANDS AT the result plate — no jump-cuts,
 * no spinner: the animation IS the progress. The stage model (geometry,
 * pigment, draw calls) lives in `mixStage.ts`; this composable owns the
 * clock and the lifecycle.
 *
 * ONE CLOCK. This composable's rAF timeline is the only clock in the mix
 * choreography. The phase machine (`useMixingState`) owns no timers — it
 * advances mixing → done on the `onSettled` completion event fired here at
 * t = MIX_CONVERGE_MS. Total wall clock ≤ 1.2 s (900 ms timeline + 300 ms
 * dissolve, overlapping the plate's vj-morph reveal).
 *
 * SAFARI-TRUE BY CONSTRUCTION. Pure geometry: radial-gradient soft discs +
 * default source-over alpha compositing (see `mixStage.ts`). No `ctx.filter`
 * (never shipped in WebKit), no engine-conditional path, no degraded
 * fallback — one implementation, every engine.
 *
 * RAF DISCIPLINE (W3-8-ready). A single self-terminating loop, armed only for
 * the [arm, settle+epilogue] window; elapsed time accumulates per-frame
 * deltas (capped), so a `useRAFLoop` host with `pauseWhenHidden` freezes the
 * narration cleanly instead of jump-cutting. Under prefers-reduced-motion the
 * loop never arms and completion fires immediately — the result appears with
 * zero dead time.
 */

import { watch, onBeforeUnmount } from "vue";
import type { Ref } from "vue";
import { useBreakpoint } from "@mkbabb/glass-ui/dom";
import type { HueInterpolationMethod } from "@src/units/color/mix";
import type { ColorSpace } from "@src/units/color/constants";
import type { AnimationPhase, MixResult } from "./useMixingState";
import type { Stage } from "./mixStage";
import { collectStage, drawStage, MIX_CONVERGE_MS, MIX_EPILOGUE_MS } from "./mixStage";

export { MIX_ARRIVE_MS, MIX_CONVERGE_MS, MIX_EPILOGUE_MS } from "./mixStage";

/**
 * Per-frame delta cap: large enough that slow-frame environments (software
 * raster, throttled tabs) still track wall clock, small enough that the one
 * oversized delta on hidden-tab resume (rAF doesn't fire while hidden) can't
 * jump-cut the narration.
 */
const FRAME_DELTA_CAP = 200;

export interface MixingAnimationOptions {
    result: Ref<MixResult | null>;
    space: Ref<ColorSpace>;
    hueMethod: Ref<HueInterpolationMethod>;
    /** The completion event — the phase machine's ONLY forward edge. */
    onSettled: () => void;
}

export function useMixingAnimation(
    canvasRef: Ref<HTMLCanvasElement | null>,
    phase: Ref<AnimationPhase>,
    { result, space, hueMethod, onSettled }: MixingAnimationOptions,
) {
    let frame: number | null = null;
    let running = false;
    let settledFired = false;
    let elapsed = 0;
    let last = 0;
    let stage: Stage | null = null;

    // PRM gate: the convergence is decorative MOTION. Under
    // prefers-reduced-motion the loop is never armed; the completion event
    // fires immediately, so the result inks in with zero dead time.
    const { matches: prefersReducedMotion } = useBreakpoint(
        "(prefers-reduced-motion: reduce)",
    );

    /** The convergence pigment: what the landing pool IS. */
    function convergeCss(): string | null {
        const res = result.value;
        if (!res) return null;
        if (res.type === "color") return res.css ?? null;
        // Palette mix: the pool lands on the first well slot, whose dot IS
        // the mix of the sources' first colors — spatially and chromatically true.
        return res.colors?.[0]?.css ?? null;
    }

    function render(now: number) {
        if (!running) return;
        const canvas = canvasRef.value;
        const ctx = canvas?.getContext("2d");
        if (!canvas || !ctx || !stage) {
            stop();
            return;
        }

        // Pause-tolerant clock: capped per-frame deltas, never wall-clock jumps.
        elapsed += Math.min(now - last, FRAME_DELTA_CAP);
        last = now;

        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        ctx.clearRect(0, 0, w, h);

        drawStage(ctx, stage, elapsed);

        if (!settledFired && elapsed >= MIX_CONVERGE_MS) {
            settledFired = true;
            onSettled();
        }

        if (elapsed >= MIX_CONVERGE_MS + MIX_EPILOGUE_MS) {
            stop();
            ctx.clearRect(0, 0, w, h);
            return;
        }
        frame = requestAnimationFrame(render);
    }

    function arm() {
        stop();
        settledFired = false;

        if (prefersReducedMotion.value) {
            // No motion, no dead time: complete immediately.
            settledFired = true;
            onSettled();
            return;
        }

        const canvas = canvasRef.value;
        const poolCss = convergeCss();
        if (!canvas || !canvas.parentElement || !poolCss) {
            settledFired = true;
            onSettled();
            return;
        }

        // Cover the pane's full scrollable extent so the well is reachable
        // even when the plate sits below the fold.
        const parent = canvas.parentElement;
        const w = parent.clientWidth;
        const h = parent.scrollHeight;
        canvas.style.height = `${h}px`;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        const ctx = canvas.getContext("2d");
        if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        stage = collectStage(canvas, poolCss, space.value, hueMethod.value);
        if (!stage) {
            // Nothing measurable to narrate (no stamped sources) — settle
            // honestly rather than stall the phase machine.
            settledFired = true;
            onSettled();
            return;
        }

        elapsed = 0;
        last = performance.now();
        running = true;
        frame = requestAnimationFrame(render);
    }

    function stop() {
        running = false;
        if (frame != null) {
            cancelAnimationFrame(frame);
            frame = null;
        }
    }

    function clearCanvas() {
        const canvas = canvasRef.value;
        const ctx = canvas?.getContext("2d");
        if (canvas && ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            canvas.style.height = "";
        }
    }

    // flush:"post" — the ghost well ([data-mix-target]) mounts in the same
    // reactive flush that opens the mixing window; measure after the DOM patch.
    watch(
        phase,
        (next) => {
            if (next === "mixing") {
                arm();
            } else if (next === "idle") {
                stop();
                stage = null;
                clearCanvas();
            }
        },
        { flush: "post" },
    );

    onBeforeUnmount(() => stop());

    return { stop };
}
