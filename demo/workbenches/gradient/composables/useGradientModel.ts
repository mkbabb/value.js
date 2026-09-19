/**
 * Gradient model — reactive state for gradient creation, editing, and
 * bi-directional CSS serialization/parsing.
 *
 * Orchestrates sub-composables:
 * - useGradientInterpolation — color space, hue method
 * - useGradientCSS — CSS serialization, coalescing, and parsing
 *
 * X-W6 · X.W6.a (CC-058 · MT-GRADSTOP-1 r3 · GRADSTOP-A §14) — NORMALISE ON
 * WRITE, EASING OWNED BY ITS OPENING STOP. The two land together because
 * neither is safe alone: re-sorting was unsafe while easings were keyed by
 * interval index, and stop-owned easing without a sort still lets a drag emit
 * CSS the model's own parser rejects. What died with them: the parallel
 * `intervals` array, its length watcher, and the index-keyed `updateInterval`.
 * A position is written through ONE mutator, `setStopPosition(id, position)`,
 * which maps then STABLE-sorts — equality stays LEGAL (CSS hard stops are
 * coincident positions and `gradientParse` admits them with `<`, never `<=`).
 * Clamping the mutator to its neighbours is BANNED (it silently deletes
 * drag-across-a-neighbour, the D-8 refusal species) and so is splice-at-insert
 * (it migrates the easings a second time). GRADSTOP-A §15: there is no
 * minimum-ordinal-spacing rule — crowding is cured by disambiguation.
 */

import { ref, computed } from "vue";
import type { HueInterpolationMethod } from "@mkbabb/value.js/color";
import { parseCssColor } from "@mkbabb/value.js/css";
import { clamp } from "@mkbabb/value.js/math";
import type { EasingPickerValue } from "@mkbabb/glass-ui/easing";
import type { PickerSpace } from "../../../color-session/picker-color";
import { useGradientInterpolation } from "./useGradientInterpolation";
import { useGradientCSS, linearInterval } from "./useGradientCSS";
import { parseGradientCSS } from "./gradientParse";
import type { GradientParseResult } from "./gradientParse";

// ── Re-exports (preserve public API surface) ──

export { INTERPOLATION_SPACES, HUE_INTERPOLATION_METHODS } from "./useGradientInterpolation";
export {
    serializeGradient,
    serializeCoalescedGradient,
    serializeRailRamp,
    railPosition,
    linearInterval,
} from "./useGradientCSS";
export { parseGradientCSS } from "./gradientParse";
export type { GradientParseResult, ParsedGradientModel } from "./gradientParse";

// ── Types ──

/**
 * A gradient interval carries the <EasingPicker> payload (the R.W4 `/easing`
 * consume — easing-disposition.md §2.3): the re-parseable CSS literal (the
 * persisted TRUTH) plus the live value.js callable and authoring parameters.
 * Literal-only reads still parse through `/css` and evaluate through
 * `/easing`; editable model state stays complete for two-way picker binding.
 * The former
 * `{easingName, easingFn}` name-catalogue shape died with the EasingSelector
 * fork — the picker's preset menu IS value.js `bezierPresets`.
 */
export type GradientInterval = EasingPickerValue;

export interface GradientStop {
    id: string;
    cssColor: string;
    position: number; // 0–100%
    /**
     * The easing of the interval this stop OPENS — this stop to the one after
     * it in ordinal order. Hanging the interval on its opening stop is what
     * makes a re-sort safe: the curve travels with the stop the author drew it
     * for, so an insert can no longer re-pair a `steps()` authored on 50→100
     * onto 25→50. The LAST stop opens no interval and its easing is inert; it
     * is still carried, because a stop that stops being last must already own
     * the curve that follows it.
     */
    easing: GradientInterval;
}

export type GradientType = "linear" | "radial" | "conic";

export interface GradientModelState {
    type: GradientType;
    direction: number; // degrees (for linear); ignored for radial
    stops: GradientStop[];
    interpolationSpace: PickerSpace;
    hueMethod: HueInterpolationMethod;
    // NOTE: no `resolution` — the coalesce density is the inlined
    // COALESCE_RESOLUTION constant (W5-11 / P2-14: it never had a UI).
}

/** The verdict of a stop-set replacement: applied, or the reason it was not. */
export type SetStopsResult = { ok: true } | { ok: false; reason: string };

// ── Helpers ──

let nextId = 0;
function uid(): string {
    return `stop-${++nextId}-${Date.now().toString(36)}`;
}

/**
 * A position onto the axis it lives on, at the model's tenth-of-a-percent
 * resolution. This clamps to the AXIS DOMAIN (0–100) and to nothing else — it
 * is explicitly NOT the banned neighbour clamp, which would make a drag past a
 * neighbour disappear instead of reorder.
 */
function axisPosition(position: number): number {
    return Math.round(clamp(position, 0, 100) * 10) / 10;
}

/** Ordinal order. Equality is LEGAL and the sort is stable, so coincident
 *  positions (CSS hard stops) keep the order the author built them in. */
function byPosition(a: GradientStop, b: GradientStop): number {
    return a.position - b.position;
}

// ── Composable ──

export function useGradientModel() {
    // ── Direction / type state ──
    const type = ref<GradientType>("linear");
    const direction = ref(90);

    // ── Stop state — the ONE source of truth: positions AND easings ──
    const stops = ref<GradientStop[]>([
        { id: uid(), cssColor: "oklch(0.75 0.15 145)", position: 0, easing: linearInterval() },
        { id: uid(), cssColor: "oklch(0.65 0.18 265)", position: 100, easing: linearInterval() },
    ]);

    // ── Interpolation sub-composable ──
    const { interpolationSpace, hueMethod } = useGradientInterpolation();

    const modelState = computed<GradientModelState>(() => ({
        type: type.value,
        direction: direction.value,
        stops: stops.value,
        interpolationSpace: interpolationSpace.value,
        hueMethod: hueMethod.value,
    }));

    // ── CSS sub-composable ──
    const { coalescedCSS, simpleCSS, railRampCSS } = useGradientCSS(modelState);

    // ── Stop manipulation ──

    /** A gradient needs two stops; below that the instrument has no subject. */
    const canRemove = computed(() => stops.value.length > 2);

    function addStop(cssColor: string, position: number) {
        const minted: GradientStop = {
            id: uid(),
            cssColor,
            position: axisPosition(position),
            easing: linearInterval(),
        };
        stops.value = [...stops.value, minted].sort(byPosition);
    }

    function removeStop(id: string) {
        if (!canRemove.value) return;
        stops.value = stops.value.filter((s) => s.id !== id);
    }

    /**
     * THE SOLE POSITION MUTATOR (GRADSTOP-A §14). Write the position, then
     * re-sort: the model's ordinal order is a function of its positions, so no
     * write can leave it in a state that serializes CSS its own parser rejects.
     */
    function setStopPosition(id: string, position: number) {
        stops.value = stops.value
            .map((s) => (s.id === id ? { ...s, position: axisPosition(position) } : s))
            .sort(byPosition);
    }

    function setStopColor(id: string, cssColor: string) {
        stops.value = stops.value.map((s) => (s.id === id ? { ...s, cssColor } : s));
    }

    /** Store the picker's authored-curve payload on the stop that OPENS the
     *  interval — keyed by identity, never by ordinal index. */
    function setStopEasing(id: string, value: EasingPickerValue) {
        const { mode, css, fn, points, steps, term } = value;
        stops.value = stops.value.map((s) =>
            s.id === id ? { ...s, easing: { mode, css, fn, points, steps, term } } : s,
        );
    }

    /**
     * Replace the whole stop set from a colour list, validated through the
     * shipped `parseCssColor` oracle. The oracle RETURNS a verdict — X-W9's
     * cure made `parseCssColor("oklch()")` answer `{ok:false, diagnostics}`
     * instead of throwing — so this branches on the shape. There is no
     * `try`/`catch` here and there must never be one: wrapping a defect is the
     * masking-fallback the wave bans.
     */
    function setStopsFromColors(colors: string[]): SetStopsResult {
        if (colors.length < 2) {
            return { ok: false, reason: "a gradient needs at least 2 color stops" };
        }
        const unparseable = colors.find((css) => !parseCssColor(css).ok);
        if (unparseable !== undefined) {
            return { ok: false, reason: `unparseable color "${unparseable}"` };
        }
        stops.value = colors.map((css, i) => ({
            id: uid(),
            cssColor: css,
            position: axisPosition((i / (colors.length - 1)) * 100),
            easing: linearInterval(),
        }));
        return { ok: true };
    }

    /**
     * Parse CSS and apply it ATOMICALLY (W5-11 / P0-1): the whole complete
     * model swaps in, or NOTHING changes and the caller gets the explicit
     * `{ ok: false, reason }` verdict to surface. The former field-by-field
     * partial apply (which could desync `stops` from `intervals` and vanish
     * the Easing section) is dead — and so is the desync itself, now that a
     * stop carries its own easing.
     */
    function applyCSS(css: string): GradientParseResult {
        const result = parseGradientCSS(css);
        if (!result.ok) return result;

        const { model } = result;
        type.value = model.type;
        direction.value = model.direction;
        stops.value = model.stops;
        return result;
    }

    return {
        // State
        type,
        direction,
        stops,
        interpolationSpace,
        hueMethod,

        // Computed
        canRemove,
        modelState,
        coalescedCSS,
        simpleCSS,
        railRampCSS,

        // Actions
        addStop,
        removeStop,
        setStopPosition,
        setStopColor,
        setStopEasing,
        setStopsFromColors,
        applyCSS,
    };
}
