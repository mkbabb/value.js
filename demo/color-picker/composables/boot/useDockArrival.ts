/**
 * useDockArrival — the dock's B1 voice (T.W2-3; the M-14 BOOKED-INTERIM;
 * lifted from App.vue at the W2-close PP-8 cap cure — a move, not a rework).
 *
 * The dock arrives AS the pill: the demo VEILS the dock
 * (`.overture-dock-veiled`, overture.css) while the producer's mount
 * nub→pill morph runs, and reveals through the plate-land family
 * (`.overture-dock-land`) on the morph's `transitionend`. A RECORDED
 * booked-interim — the sanctioned mechanism is the P7 arrive-expanded ask;
 * this veil dies the day it ships. The reveal's `animationend` is B2's
 * second predicate (`noteDockLanded`). State-gated, never timed: a no-morph
 * mount (the P7 future) reveals via the getAnimations emptiness check.
 * PRM: instant states — no veil, no land, the dock is simply present.
 */

import { onMounted, ref } from "vue";
import type { Ref } from "vue";
import type { useOverture } from "./useOverture";

export function useDockArrival(
    dockNav: Readonly<Ref<HTMLElement | null>>,
    overture: ReturnType<typeof useOverture>,
) {
    const prmInstant =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dockRevealed = ref(prmInstant);
    if (prmInstant) overture.noteDockLanded();

    function onDockMorphSettled(e: TransitionEvent) {
        if (dockRevealed.value) return;
        // Only the producer dock's own morph counts (any property of the
        // .glass-dock subtree — the nub→pill geometry transition).
        if ((e.target as Element | null)?.closest?.(".glass-dock")) {
            dockRevealed.value = true;
        }
    }
    function onDockLandEnd(e: AnimationEvent) {
        if (e.animationName.includes("overture-plate-land")) {
            overture.noteDockLanded();
        }
    }
    onMounted(() => {
        if (dockRevealed.value) return;
        // State-gated no-morph fallback (the P7 arrive-expanded future): after
        // the mount's styles settle (two frames — a state boundary, not a
        // timeout), if the producer dock is NOT morphing, reveal immediately.
        requestAnimationFrame(() =>
            requestAnimationFrame(() => {
                if (dockRevealed.value) return;
                const dock = dockNav.value?.querySelector(".glass-dock");
                // TIME-DRIVEN FINITE animations only — the dock subtree
                // carries two classes of standing animation that never
                // "finish" on the wall clock and must never gate the reveal:
                // infinite-iteration loops, AND ScrollTimeline-driven
                // progress states (the gl-fade scroll-rail pair: iterations
                // 1 but endTime "53.3%" — their `finished` promise never
                // resolves; awaiting them veiled the dock FOREVER on
                // WebKit-mobile, where no mount-morph transitionend arrives
                // first — b2 never opened, the blob never mounted; the
                // smoke-safari project caught it at the W2 close). The mount
                // morph is a finite document-timeline transition/animation.
                const running = (
                    dock?.getAnimations({ subtree: true }) ?? []
                ).filter((a) => {
                    if (!(a.timeline instanceof DocumentTimeline)) return false;
                    const t = a.effect?.getTiming();
                    return t ? t.iterations !== Infinity : true;
                });
                if (!running.length) {
                    dockRevealed.value = true;
                    return;
                }
                // A morph IS running — gate the reveal on its own completion
                // (covers animation-driven morphs the transitionend capture
                // cannot see; first signal wins via the guard).
                void Promise.allSettled(running.map((a) => a.finished)).then(
                    () => {
                        dockRevealed.value = true;
                    },
                );
            }),
        );
    });

    return { prmInstant, dockRevealed, onDockMorphSettled, onDockLandEnd };
}
