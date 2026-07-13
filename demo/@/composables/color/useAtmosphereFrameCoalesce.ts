import { computed, onScopeDispose, ref, watch, type ComputedRef } from "vue";

/**
 * useAtmosphereFrameCoalesce — rAF-coalesce a colour signal down to AT MOST ONE
 * republish per animation frame (S.W3 · W3-1; lifted from `useColorPipeline` at
 * T.W6.5 close as the PP-8 cohesion cure — an architectural transposition per
 * `MANDATE §0.6`: the perf concern + its rAF lifecycle become their own named
 * composable, the spine stays the ONE colour spine).
 *
 * The atmosphere fan-out — the aurora seed derive + the blob-palette derive
 * (both in useAtmosphere) + the `--accent-live` contrast solve (App) — is the
 * tranche's #1 perf cost (perf-transitions P0-1): three heavy derives
 * (≈16 gamut-maps + a parse + an OKLab contrast solve) would otherwise fire
 * SYNCHRONOUSLY on EVERY `cssColorOpaque` change, i.e. 60×/s under a slider drag
 * → the ~20fps / 31-of-44-janked collapse. This republishes the LATEST opaque
 * colour AT MOST ONCE per animation frame; the atmosphere consumers read the
 * RETURNED signal (never the synchronous `cssColorOpaque`), so each drag frame's
 * intermediate colours collapse to ONE derive. The picker's own instant surfaces
 * (readout, tooltip, spectrum) keep the synchronous `cssColorOpaque`.
 *
 * S-18 (the aurora seed tracks the picked colour) is PRESERVED bit-for-bit: the
 * LAST colour of every frame wins, so a settled drag lands its TERMINAL colour on
 * the next frame and the seed still tracks — coalescing drops the intermediate
 * colours, never the terminal one. Seeded with the current value so the FIRST
 * paint derives synchronously (no atmosphere flash). Non-rAF env (SSR): republish
 * synchronously.
 *
 * Call synchronously within a setup/effect scope — the `onScopeDispose` cancels a
 * pending frame on teardown (identical scope to the former inline pipeline site).
 */
export function useAtmosphereFrameCoalesce(
    source: ComputedRef<string>,
): ComputedRef<string> {
    const latest = ref(source.value);
    let frame: number | null = null;
    const publish = () => {
        frame = null;
        latest.value = source.value; // latest-of-frame wins
    };
    watch(source, () => {
        if (frame !== null) return; // one derive already scheduled this frame
        if (typeof requestAnimationFrame !== "function") {
            publish(); // non-rAF env (SSR): republish synchronously
            return;
        }
        frame = requestAnimationFrame(publish);
    });
    onScopeDispose(() => {
        if (frame !== null && typeof cancelAnimationFrame === "function") {
            cancelAnimationFrame(frame);
        }
    });
    // A ComputedRef so it drops into the existing `ComputedRef<string>` consumer
    // signatures unchanged.
    return computed(() => latest.value);
}
