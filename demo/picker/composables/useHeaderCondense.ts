import { onScopeDispose, ref, watch, type Ref } from "vue";

/**
 * useHeaderCondense — the whole-header scroll-contraction primitive (U-F9,
 * T-61/§0.8). A DISCRETE two-state toggle: the header rests EXPANDED and, past
 * a scroll threshold, condenses to ONE short strip — title AND padding AND the
 * background band contracting together (the owner's §0.8 verbatim). The strip's
 * geometry is a REAL layout-box shrink (the consumer transitions padding +
 * font-size + gap once per threshold crossing), NEVER a compositor-only title
 * `scale()` over an un-shrunk band (t33-research §6.6 — the pinned defect; the
 * producer's shipped `card-header--shrink` / `<ScrollCardHeader>` choreography
 * is compositor-only BY ARCHITECTURAL COMMITMENT — `proof:no-layout-animation`
 * forbids its layout lane — so it structurally cannot satisfy §0.8/BR-9; this
 * demo landing is the REFERENCE implementation a producer real-box-shrink door
 * later absorbs — see the U.W-VISUAL BH relay addendum).
 *
 * MECHANISM:
 *  1. CONDENSE STATE — an IntersectionObserver on a zero-height `sentinel` at
 *     the top of the scroll container. `rootMargin` extends the root's top edge
 *     UP by `threshold` px, so the sentinel stays intersecting until the scroll
 *     passes `threshold`, then leaves — flipping `condensed`. A discrete toggle
 *     (not a per-scroll-frame scrub) ⇒ ZERO per-frame reflow; the layout cost is
 *     one bounded transition at the crossing (the honest box shrink §0.8 demands
 *     without the CLS the producer's compositor gate guards against).
 *  2. SUFFICIENCY GATE — condensing shrinks the scroll content by `savings`
 *     (H_expanded − H_condensed). On content that only just overflows, that
 *     would remove the very overflow the condense needs to sustain itself — the
 *     browser clamps scrollTop, the sentinel re-enters, and the header flickers
 *     back. So the condense is GATED: it fires only when the natural overflow
 *     exceeds `savings + threshold`, i.e., condensing reveals REAL content and
 *     leaves scroll room to stay condensed. Below that (the picker essentially
 *     fits — nothing to scroll to) the header stays EXPANDED, which is correct:
 *     you never condense a header that was never meaningfully scrolled. This
 *     needs no bottom reserve and never oscillates — no trailing space, ever.
 *
 * `savings` is unknown until the first condense settles, so the gate opens on a
 * conservative half-header estimate and tightens to the measured value once the
 * strip has rendered. The scroll root is resolved from the sentinel (the nearest
 * overflow auto/scroll ancestor — the picker Card on mobile); where nothing
 * scrolls (the desktop picker fits, `overflow: visible`) the observer falls back
 * to the viewport root, which never crosses — the header stays EXPANDED (the
 * correct dormant behavior). Observers re-bind on ref resolve (async-mount safe)
 * and self-clean on scope dispose.
 */
export function useHeaderCondense(
    sentinel: Ref<HTMLElement | null>,
    header: Ref<HTMLElement | null>,
    opts: { threshold?: number } = {},
) {
    const condensed = ref(false);

    let io: IntersectionObserver | null = null;
    let scrollRoot: HTMLElement | null = null;
    // measured condensed block-size (0 until the first condense settles)
    let condensedH = 0;
    let settleTimer: ReturnType<typeof setTimeout> | undefined;

    const disconnect = () => {
        io?.disconnect();
        io = null;
        clearTimeout(settleTimer);
        scrollRoot = null;
    };

    const resolveScrollRoot = (el: HTMLElement): HTMLElement | null => {
        let node: HTMLElement | null = el.parentElement;
        while (node) {
            const oy = getComputedStyle(node).overflowY;
            if (oy === "auto" || oy === "scroll") return node;
            node = node.parentElement;
        }
        return null; // viewport fallback (desktop, non-scrolling)
    };

    watch(
        [sentinel, header],
        ([sent, head]) => {
            disconnect();
            if (!sent) return;
            const threshold = opts.threshold ?? 24;
            scrollRoot = resolveScrollRoot(sent);

            io = new IntersectionObserver(
                (entries) => {
                    const e = entries[entries.length - 1];
                    if (!e) return;
                    const wantsCondense = !e.isIntersecting;

                    if (wantsCondense && !condensed.value) {
                        // sufficiency gate: only condense when there is real
                        // scroll room to reveal AND to sustain the condensed
                        // state (no reserve, no oscillation)
                        if (scrollRoot && head) {
                            const overflow =
                                scrollRoot.scrollHeight - scrollRoot.clientHeight;
                            const expandedH = head.getBoundingClientRect().height;
                            const savings = expandedH - (condensedH || expandedH * 0.5);
                            if (overflow <= savings + threshold) return; // stays expanded
                        }
                        condensed.value = true;
                        // cache the true condensed height once the strip settles,
                        // so the gate tightens from the estimate to the measured
                        clearTimeout(settleTimer);
                        settleTimer = setTimeout(() => {
                            if (condensed.value && head) {
                                condensedH = head.getBoundingClientRect().height;
                            }
                        }, 340);
                    } else if (!wantsCondense && condensed.value) {
                        condensed.value = false;
                    }
                },
                {
                    root: scrollRoot,
                    rootMargin: `${threshold}px 0px 0px 0px`,
                    threshold: 0,
                },
            );
            io.observe(sent);
        },
        { immediate: true, flush: "post" },
    );

    onScopeDispose(disconnect);

    return { condensed };
}
