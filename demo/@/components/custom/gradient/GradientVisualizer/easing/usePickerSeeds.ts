/**
 * usePickerSeeds (T.W6-3 / T-47) — the authoring canvas's re-seat
 * discipline. glass-ui's <EasingPicker> modelValue is EMIT-ONLY (no
 * points-in prop — the initialPoints gap rides the P7 packet, the same
 * §FORWARDING note kf carries), so the ONLY blessed re-seat seam is a
 * `:key` remount with initial-prop seeds (the kf idiom). This composable
 * owns when that remount happens and which emissions are ECHOES:
 *
 * - Seeds derive from the interval TRUTH at first sight (preset by
 *   quad/literal match; steps by (n, term); underivable custom → seed
 *   `linear` and SWALLOW the mount echo by value — the kf isSeedEcho
 *   discipline).
 * - A tile press re-seeds deliberately (`reseed`) — the canvas previews
 *   the selection; its remount echo equals the interval and dedupes.
 * - An EXTERNAL interval change under an alive canvas (a stop
 *   splice re-pointing row indices) re-derives + remounts, so the drawn
 *   curve and the live fn can never disagree (the aliveness law's
 *   promise). Picker-authored changes record the canvas truth FIRST and
 *   are never remounted away (drag continuity).
 */
import { ref, watch } from "vue";
import type { Ref } from "vue";
import type { EasingPickerValue } from "@mkbabb/glass-ui/easing";
import { seedForInterval } from "./easingCatalogue";
import type { SpecimenTile, TileSeed } from "./easingCatalogue";
import type { GradientInterval } from "../../composables/useGradientModel";

export interface RowSeed {
    key: number;
    seed: TileSeed;
}

const LINEAR_SEED: TileSeed = { mode: "bezier", preset: "linear" };
const LINEAR_CSS = "cubic-bezier(0, 0, 1, 1)";

export function usePickerSeeds(
    intervals: () => GradientInterval[],
    epoch: () => number,
) {
    const seeds: Ref<Record<number, RowSeed>> = ref({});
    /** What the alive canvas at each row currently DRAWS (seed or edit). */
    const canvasCss = new Map<number, string>();
    /** Pending mount-echo literals to swallow (underivable-custom seats). */
    const swallowCss = new Map<number, string>();

    function deriveSeed(index: number, interval: GradientInterval): RowSeed {
        const prevKey = seeds.value[index]?.key ?? -1;
        const derived = seedForInterval(interval);
        if (derived) {
            canvasCss.set(index, interval.css);
        } else {
            canvasCss.set(index, LINEAR_CSS);
            if (interval.css !== LINEAR_CSS) swallowCss.set(index, LINEAR_CSS);
        }
        return { key: prevKey + 1, seed: derived ?? LINEAR_SEED };
    }

    function ensureSeeds() {
        const list = intervals();
        const next = { ...seeds.value };
        let changed = false;
        for (let i = 0; i < list.length; i++) {
            if (next[i]) continue;
            next[i] = deriveSeed(i, list[i]!);
            changed = true;
        }
        if (changed) seeds.value = next;
    }

    watch(() => intervals().length, ensureSeeds, { immediate: true });

    // The parse re-seed signal: every interval is back at `linear`; clear
    // the whole discipline and re-derive.
    watch(epoch, () => {
        seeds.value = {};
        canvasCss.clear();
        swallowCss.clear();
        ensureSeeds();
    });

    // External interval changes (a splice re-pointing this index) remount
    // the canvas onto the new truth. Picker-authored + tile-pressed
    // changes recorded canvasCss BEFORE this pre-flush watch runs, so
    // they never churn a remount (drag continuity preserved).
    watch(
        () => intervals().map((iv) => iv.css),
        (cssList, prev) => {
            const next = { ...seeds.value };
            let changed = false;
            for (const k of Object.keys(next)) {
                const i = Number(k);
                if (i >= cssList.length) {
                    delete next[i];
                    canvasCss.delete(i);
                    swallowCss.delete(i);
                    changed = true;
                    continue;
                }
                if (cssList[i] === prev?.[i]) continue; // this row didn't change
                if (cssList[i] === canvasCss.get(i)) continue; // canvas agrees
                next[i] = deriveSeed(i, intervals()[i]!);
                changed = true;
            }
            if (changed) seeds.value = next;
        },
    );

    /** A deliberate tile press: the canvas re-seats to preview the tile. */
    function reseed(index: number, tile: SpecimenTile) {
        const cur = seeds.value[index];
        canvasCss.set(index, tile.css);
        swallowCss.delete(index);
        seeds.value = {
            ...seeds.value,
            [index]: { key: (cur?.key ?? 0) + 1, seed: tile.seed },
        };
    }

    /**
     * The echo guard: (re)mount echoes of the truth are no-ops; the
     * underivable-mount `linear` echo is swallowed once; everything else
     * is an authored edit — record the canvas truth and forward.
     */
    function shouldForward(index: number, v: EasingPickerValue): boolean {
        canvasCss.set(index, v.css);
        if (v.css === intervals()[index]?.css) return false;
        if (swallowCss.get(index) === v.css) {
            swallowCss.delete(index);
            return false;
        }
        swallowCss.delete(index);
        return true;
    }

    return { seeds, reseed, shouldForward };
}
