/**
 * useSpecimenRows (T.W6-3 / T-47) — the per-interval specimen derivation:
 * each gradient interval becomes a row whose identity is derived from the
 * interval TRUTH (the persisted css literal): its name (named when named,
 * `custom` otherwise), its interval-TRUE micro portrait (sampled from the
 * live callable — the ONE glyph painter), its pressed tile, and its OWN
 * ink — the eased ramp midpoint, contrast-certified against the resting
 * plate (the D6 house guard; t-easing-pane §8: one ink per specimen,
 * consumed through the producer's `--motion-accent` door).
 */
import { computed } from "vue";
import type { ComputedRef } from "vue";
import { useSafeAccentFn } from "@composables/color/useContrastSafeColor";
import { easingFnOf } from "../../composables/useGradientCSS";
import { interpolateStopColors } from "../../composables/useGradientInterpolation";
import { glyphPath, specimenNameFor, tileIdFor } from "./easingCatalogue";
import type {
    GradientInterval,
    GradientModelState,
    GradientStop,
} from "../../composables/useGradientModel";

export interface SpecimenRow {
    index: number;
    label: string;
    c0: string;
    c1: string;
    css: string;
    name: string;
    glyph: string;
    tileId: string | null;
    ink: string | null;
}

export function useSpecimenRows(
    stops: () => GradientStop[],
    intervals: () => GradientInterval[],
    modelState: () => GradientModelState,
): ComputedRef<SpecimenRow[]> {
    const { safeCss } = useSafeAccentFn("resting");

    return computed<SpecimenRow[]>(() => {
        const rows: SpecimenRow[] = [];
        const stopList = stops();
        const intervalList = intervals();
        const model = modelState();
        for (let i = 0; i < intervalList.length; i++) {
            const s0 = stopList[i];
            const s1 = stopList[i + 1];
            const interval = intervalList[i];
            if (!s0 || !s1 || !interval) continue;
            const fn = easingFnOf(interval);
            const mid = interpolateStopColors(
                s0.cssColor,
                s1.cssColor,
                fn(0.5),
                model.interpolationSpace,
                model.hueMethod,
            );
            rows.push({
                index: i,
                label: `${i + 1} → ${i + 2}`,
                c0: s0.cssColor,
                c1: s1.cssColor,
                css: interval.css,
                name: specimenNameFor(interval),
                glyph: glyphPath(fn),
                tileId: tileIdFor(interval),
                ink: safeCss(mid),
            });
        }
        return rows;
    });
}
