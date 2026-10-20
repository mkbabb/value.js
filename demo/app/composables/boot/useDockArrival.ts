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
 *
 * X.W12U.o5c (COHESION §0fv.2, arm a) — THE DOCK MOUNTS IN THE TASK AFTER
 * FIRST PAINT. The band is veiled at first paint, so the dock is not shown
 * there, and its producer mount (glass dock.js, 23–27 ms of the boot task by
 * `.o5b`'s profile) has no business in the task that paints the pane. The
 * band itself (the `<nav>`, its `--dock-band-min-h` floor and the veil class)
 * stays in the first task, so the box the dock lands in exists from B0 and
 * the pane below it never moves. `dockMounted` opens from the first frame's
 * rAF by a posted MESSAGE — the platform's task-after-this-frame primitive:
 * the frame renders (first paint) and the next task mounts the dock, one
 * task later, never an idle-indefinite or timed slot. The no-morph reveal
 * check below is anchored on the dock's own mount, as it always was. PRM
 * keeps instant states: no veil means the dock IS first-paint state there,
 * so it mounts in the first task.
 */

import { onMounted, ref, shallowRef, watch } from "vue";
import type { Component, Ref } from "vue";
import type { useOverture } from "./useOverture";

/**
 * X.W11.p2 (COHESION §0ge.1(ii)) — THE DOCK LEAVES THE FIRST-PAINT GRAPH. The
 * dock mounts after first paint under the veil (above), so its module graph —
 * the dock tree, its menus and their producer parts — has no place among the
 * boot's modulepreloads. Its chunk is fetched after first paint and the mount
 * opens once it is in, so the reveal check below still anchors on the dock's
 * own mount. Under reduced motion the dock is first-paint state, so the
 * composition root (main.ts) resolves this chunk before `app.mount`, and
 * `dockComponent` is already set when the first task renders. A failed load is
 * not caught here: the rejection reaches the app's `unhandledrejection` floor.
 */
export const dockComponent = shallowRef<Component | null>(null);

export function loadDock(): Promise<Component> {
    return import("../../../shell/dock").then((m) => (dockComponent.value = m.Dock));
}

/** Reduced motion: instant states — the dock is present (and mounted) from the first task. */
export function prefersInstantDock(): boolean {
    return (
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
}

export function useDockArrival(
    dockNav: Readonly<Ref<HTMLElement | null>>,
    overture: ReturnType<typeof useOverture>,
) {
    const prmInstant = prefersInstantDock();
    const dockRevealed = ref(prmInstant);
    const dockMounted = ref(prmInstant);
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
        if (dockMounted.value) return;
        requestAnimationFrame(() => {
            const { port1, port2 } = new MessageChannel();
            port1.onmessage = () => {
                port1.close();
                void loadDock().then(() => {
                    dockMounted.value = true;
                });
            };
            port2.postMessage(null);
        });
    });

    // The reveal check runs once the dock is in the DOM (post-flush of the
    // mount task) — the same anchor the first-task mount gave it. Under PRM
    // the dock is mounted (and revealed) from the start, so this never fires.
    watch(
        dockMounted,
        () => {
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
        },
        { flush: "post", once: true },
    );

    return {
        prmInstant,
        dockMounted,
        dockRevealed,
        onDockMorphSettled,
        onDockLandEnd,
    };
}
