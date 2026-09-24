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
import { parseCssColor } from "@mkbabb/value.js/css";
import { clamp } from "@mkbabb/value.js/math";
import type { EasingPickerValue } from "@mkbabb/glass-ui/easing";
import { useGradientInterpolation } from "./useGradientInterpolation";
import {
    useGradientCSS,
    linearInterval,
    formatColorLiteral,
    seedLiteral,
} from "./useGradientCSS";
import { parseGradientCSS } from "./gradientParse";
import type { GradientParseResult } from "./gradientParse";
import { sampleAt } from "../model/sample";
import type {
    GradientModelState,
    GradientStop,
    GradientType,
} from "../model/types";

// X-W6 · X.W6.c: the domain types live in the leaf `../model/types`, and this
// factory re-exports NOTHING. The seven-name "preserve public API surface"
// block is gone — every consumer imports the module that owns the name.

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

/**
 * The seeded pair, restated in the one literal dialect (X.W6.c — c3): the model
 * authors these, so they print exactly as a minted stop does.
 */
const SEED_COLORS = ["oklch(0.75 0.15 145)", "oklch(0.65 0.18 265)"] as const;

function seededStops(): GradientStop[] {
    return SEED_COLORS.map((css, i) => ({
        id: uid(),
        cssColor: seedLiteral(css),
        position: i === 0 ? 0 : 100,
        easing: linearInterval(),
    }));
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
    const stops = ref<GradientStop[]>(seededStops());

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

    /**
     * THE MINT PATH (X-W6 · X.W6.c — c3). A new stop takes the ramp's own
     * colour at its position — through the one sampling law, so the stop lands
     * exactly the colour the add ghost previewed — printed in the one literal
     * dialect the seeds print in. The owner used to sample and hand the colour
     * in, which is how a minted stop came to print in a second grammar.
     */
    function mintStop(position: number): string {
        const at = axisPosition(position);
        return addStop(formatColorLiteral(sampleAt(modelState.value, at)), at);
    }

    /** Insert a stop of a GIVEN colour; the sort keeps the ordinal invariant.
     *  Returns the new stop's id (X.W12.u2 · UIA-V-373: the owner selects it). */
    function addStop(cssColor: string, position: number): string {
        const added: GradientStop = {
            id: uid(),
            cssColor,
            position: axisPosition(position),
            easing: linearInterval(),
        };
        stops.value = [...stops.value, added].sort(byPosition);
        return added.id;
    }

    /** Back to the seeded pair (the Reset action). */
    function resetStops() {
        stops.value = seededStops();
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
        mintStop,
        resetStops,
        removeStop,
        setStopPosition,
        setStopColor,
        setStopEasing,
        setStopsFromColors,
        applyCSS,
    };
}
