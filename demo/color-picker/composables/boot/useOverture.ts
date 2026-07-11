/**
 * boot/useOverture — THE OVERTURE (T.W2 · W2-3; D3 THE ONE BOOT OVERTURE).
 *
 * The load is ONE choreography: *hydrate → derive → commit; order by GATING,
 * not by timing; work defers, appearance composes; one material from t0.*
 * This module is the named beat-gating DAG (D3 [AMENDED-AT-HARDENING M-10] —
 * law 4's replacement): each beat opens on a NAMED arming predicate, never a
 * timer, so throttling stretches the overture without reshuffling it:
 *
 *   B0 · ground     — pre-paint (index.html's fouc-guard; the W2-2 gradient
 *                     ground + theme-color; `overture:b0` marked there).
 *   B1 · plates     — hydration-committed ∧ mount. Hydration is committed
 *                     synchronously BEFORE the app constructs (W2-1's law —
 *                     the model is BORN hydrated), so B1 opens at mount. The
 *                     plate-land family starts here (slot `appear` grammar +
 *                     the dock's veiled arrival; stagger dock +0 / left +40ms
 *                     / right +120ms — `--overture-*` tokens at the shell).
 *   B2 · field      — `isArmed` ∧ dock-plate-landed. The 0.9s derive-in
 *                     (`--overture-derive-in`) starts when BOTH commit —
 *                     normal-CPU settle ≤1.6s (dock lands ~0.62s + 0.9s).
 *   B3 · instrument — left-plate-landed (deliberately INDEPENDENT of B2 —
 *                     the instrument never waits on the GPU). B3-COMPLETE =
 *                     the left plate settled ∧ any running in-card
 *                     field-paint beat finished (state-checked via
 *                     getAnimations, never a timeout).
 *   B4 · ornament   — B3-complete ∧ B2-STARTED ∧ chunk-resolved (the
 *                     chunk-resolved leg lives at the consumer:
 *                     ColorPicker's idle-fetched HeroBlob — work defers,
 *                     appearance composes; an early chunk WAITS on the
 *                     field's arm — kills the measured d/e idle race by
 *                     construction). DE-COINCIDED from the field's arrival
 *                     (T.W6.5 Lane M): the flip waits out the derive-in
 *                     transition's SETTLE (state-checked via getAnimations,
 *                     never a timeout) + an idle slice, so the blob engine
 *                     mount (the §4.1 wall — forensically the WHOLE wall,
 *                     see the b4 block) can never freeze the 0.9s arrival
 *                     fade mid-flight. PRM: synchronous (law 5).
 *
 * Every beat START stamps a `performance.mark("overture:bN")` — the O-4
 * order-invariance oracle asserts B0 < B1 < {B2, B3} < B4 ∧ B2 < B4 under
 * 6× CPU throttle over these marks.
 *
 * PRM collapses the overture to INSTANT STATES (law 5, kept): every beat
 * opens at mount, in order, synchronously; the CSS side kills the
 * transitions (the existing PRM discipline) — first content frame ≡ the
 * settled composition (the §Hard-gate 5b instant-states law).
 *
 * WHAT THIS RETIRES (D3, by name): the five-clock smear (idle clocks A/B as
 * APPEARANCE gates — the work stays idle-deferred), the About pop (the slot
 * appear grammar), the dock mount-morph as a visible actor (the veil — the
 * booked P7 arrive-expanded interim), the Google-Fonts network actor
 * (self-hosted, index.html), the seeded-session gate as evidence (O-2).
 */

import { onMounted, ref, watch } from "vue";
import type { ComputedRef, InjectionKey, Ref } from "vue";

export interface OvertureBeats {
    /** B1 — plates (hydration-committed ∧ mount). */
    b1: Readonly<Ref<boolean>>;
    /** B2 — the field derive-in has STARTED (isArmed ∧ dock-plate-landed). */
    b2: Readonly<Ref<boolean>>;
    /** B3 — the instrument beat (left-plate-landed). */
    b3: Readonly<Ref<boolean>>;
    /** B3-complete — left plate settled ∧ in-card paint beats finished. */
    b3Complete: Readonly<Ref<boolean>>;
    /** B4 — the ornament beat is OPEN (B3-complete ∧ B2-started, then ONE
     *  yielded slice — see the de-coincidence note in `useOverture`). The
     *  chunk-resolved leg composes at the consumer (∧ blob chunk ready). */
    b4: Readonly<Ref<boolean>>;
    /** The dock's plate has landed (B2's second predicate; veil-reveal end). */
    dockLanded: Readonly<Ref<boolean>>;
    /** Beat callbacks — the shell + consumers report NAMED completion events. */
    noteDockLanded: () => void;
    noteLeftPlateSettled: (el: Element | null) => void;
    noteRightPlateSettled: () => void;
    /** W2-4: the ornament emerge actually began (marks overture:b4). */
    noteOrnamentEmerge: () => void;
}

export const OVERTURE_KEY: InjectionKey<OvertureBeats> = Symbol("overture");

function mark(name: string) {
    if (typeof performance !== "undefined") performance.mark(name);
}

/**
 * Install the overture. Called once from App setup.
 *
 * @param fieldArmed the atmosphere's arrival signal (`auroraArrived` —
 *        isArmed on the webgl path; immediate on the css substrate).
 */
export function useOverture(fieldArmed: ComputedRef<boolean>): OvertureBeats {
    const prm =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const b1 = ref(false);
    const dockLanded = ref(false);
    const b3 = ref(false);
    const b3Complete = ref(false);
    const b4Marked = { done: false };

    // B2 = isArmed ∧ dock-plate-landed — a computed PREDICATE (gating, never
    // a timer); the mark fires once on the flip.
    const b2 = ref(false);
    watch(
        () => fieldArmed.value && dockLanded.value,
        (open) => {
            if (open && !b2.value) {
                b2.value = true;
                mark("overture:b2");
            }
        },
        { immediate: true },
    );

    // B4 opens on B3-complete ∧ B2-started — then waits out the FIELD'S
    // ARRIVAL before flipping (T.W6.5 Lane M · the B2/B4 DE-COINCIDENCE,
    // t33-research §4.1/§4.3 — the row's "next beat" arm):
    //
    // THE FORENSIC (this lane's chunk-block probe, archived in
    // w65-lane-m-record.md): the ~505ms post-b2/b4 main-thread wall is the
    // BLOB ENGINE MOUNT alone — with the HeroBlob chunk blocked the wall
    // vanishes entirely, so it is ONE indivisible producer-engine init task
    // (WebGL2 context + shader compile; the L20 eager-config/lazy-engine
    // split + GAP-L5 halves are its SIZE cure — the standing W7 P9/P1
    // packet rows). What the demo OWNS is its PLACEMENT: a b4 synchronous
    // with b2 mounted the engine ~30ms into the field's 0.9s derive-in,
    // freezing the arrival fade mid-flight. The beat DAG owns the ordering,
    // so the seam lives HERE: after the predicate commits, b4 waits for the
    // derive-in transition to SETTLE — a STATE check on the canvas's own
    // running animations (the noteLeftPlateSettled / useDockArrival
    // getAnimations idiom; `.atmosphere-canvas` is app-unique, overture.css)
    // — then takes an idle slice. Never a timer: no transition running
    // (css substrate, an already-settled field, a test mount) falls through
    // immediately. TIME-DRIVEN FINITE animations only (the WebKit-mobile
    // ScrollTimeline lesson, useDockArrival) so an infinite/scroll-driven
    // ambient loop can never wedge the ornament. Order is preserved (B2 <
    // B4 strictly — O-4's DAG assert); the rIC 500ms ceiling bounds the
    // ornament's wait on a busy main thread; Safari (no rIC) takes the
    // macrotask hop. PRM keeps the instant-states law (law 5): synchronous.
    const b4 = ref(false);
    const openB4 = () => {
        if ("requestIdleCallback" in window) {
            window.requestIdleCallback(() => (b4.value = true), {
                timeout: 500,
            });
        } else {
            setTimeout(() => (b4.value = true), 0);
        }
    };
    watch(
        () => b3Complete.value && b2.value,
        (open) => {
            if (!open || b4.value) return;
            if (prm || typeof window === "undefined") {
                b4.value = true;
                return;
            }
            // One frame past the arming flush, so the derive-in transition
            // (opened by the same b2 flip) is observable via getAnimations.
            requestAnimationFrame(() => {
                const canvas = document.querySelector(".atmosphere-canvas");
                const running = (canvas?.getAnimations?.() ?? []).filter(
                    (a) => {
                        if (!(a.timeline instanceof DocumentTimeline))
                            return false;
                        const t = a.effect?.getTiming();
                        return t ? t.iterations !== Infinity : true;
                    },
                );
                if (!running.length) {
                    openB4();
                    return;
                }
                void Promise.allSettled(running.map((a) => a.finished)).then(
                    openB4,
                );
            });
        },
        { immediate: true },
    );

    onMounted(() => {
        // B1: hydration-committed ∧ mount. The hydration half is committed
        // BY CONSTRUCTION before any render (W2-1 — boot/hydrate runs before
        // the model ref exists), so mount IS the composite predicate.
        b1.value = true;
        mark("overture:b1");
        if (prm) {
            // Instant states: the whole DAG opens now, in order (marks stay
            // ordered for O-4's PRM-OFF sibling; the CSS side is static).
            dockLanded.value = true;
            b3.value = true;
            mark("overture:b3");
            b3Complete.value = true;
        }
    });

    const noteDockLanded = () => {
        if (dockLanded.value) return;
        dockLanded.value = true;
    };

    const noteLeftPlateSettled = (el: Element | null) => {
        if (b3.value) return;
        b3.value = true;
        mark("overture:b3");
        // B3-complete: the left plate is settled; if an in-card field-paint
        // beat is RUNNING at this moment, wait for it to finish (a STATE
        // check via getAnimations — never a timeout). The picker's spectrum
        // `field-paint-in` is the named beat; other panes have none.
        const running = (el
            ?.getAnimations?.({ subtree: true })
            ?.filter(
                (a) =>
                    a instanceof CSSAnimation &&
                    /field-paint/.test((a as CSSAnimation).animationName),
            ) ?? []) as Animation[];
        if (!running.length) {
            b3Complete.value = true;
            return;
        }
        void Promise.allSettled(running.map((a) => a.finished)).then(() => {
            b3Complete.value = true;
        });
    };

    const noteRightPlateSettled = () => {
        /* the right plate carries no downstream gate today — the hook exists
         * so the grammar reports symmetrically (and W4+ can consume it). */
    };

    const noteOrnamentEmerge = () => {
        if (b4Marked.done) return;
        b4Marked.done = true;
        mark("overture:b4");
    };

    return {
        b1,
        b2,
        b3,
        b3Complete,
        b4,
        dockLanded,
        noteDockLanded,
        noteLeftPlateSettled,
        noteRightPlateSettled,
        noteOrnamentEmerge,
    };
}
