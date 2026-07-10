/**
 * useGamutDetent — the threshold detent at the truth line (R.W3 Lane B / B4;
 * treatment §MICRO-INTERACTIONS clause 4 as amended, `overlay-amendment.md §1`).
 *
 * A detent, NOT a wall: every point of the square is a legitimate sRGB color,
 * so the drag always completes. When a drag carries the dot OUTBOUND across
 * the JND contour, the dot — and the model value with it, so the resistance
 * is real — holds at the contour for ~6px of pointer travel, then releases
 * and catches up. One detent per crossing; inbound crossings free; no contour
 * ⇒ no detent (the absence of resistance is the same fact as the absence of
 * the line). A fast flick whose crossing event already lands past the hold
 * band passes through untouched — a detent is felt at drag speed, never a
 * snag at flick speed.
 *
 * Crossing detection is a per-event lookup against the SAME boundary samples
 * the render pass computed (`useGamutOverlay.contourVAt`) — zero new geometry.
 * The detent itself is drag physics tied to user input (state, not
 * decoration); only the micro-label's appear/fade is PRM-gated, in CSS.
 */

import { ref } from "vue";

/** Pointer travel absorbed at the contour before release, in CSS px. */
const HOLD_PX = 6;

export interface UseGamutDetentDeps {
    /** v of the contour at s; `Infinity` ⇔ column everywhere faithful. */
    contourVAt: (s: number) => number;
    hasContour: () => boolean;
}

export function useGamutDetent(deps: UseGamutDetentDeps) {
    /** True while the dot+model are held at the contour (drives the label). */
    const holding = ref(false);

    let anchor: { s: number; v: number } | null = null;
    let wasInside = false;
    /** Released past the detent — no re-detent until an inbound return. */
    let spent = false;

    const inside = (s: number, v: number) => v < deps.contourVAt(s);

    function reset() {
        holding.value = false;
        anchor = null;
        spent = false;
        wasInside = false;
    }

    /** Arm on pointerdown: a drag STARTED outside the line never detents. */
    function begin(s: number, v: number) {
        reset();
        wasInside = deps.hasContour() && inside(s, v);
    }

    /**
     * Filter a drag sample; returns the coordinates the model should take
     * (the anchor while holding, the raw point otherwise).
     */
    function apply(
        s: number,
        v: number,
        rectW: number,
        rectH: number,
    ): { s: number; v: number } {
        if (!deps.hasContour()) {
            reset();
            return { s, v };
        }

        if (inside(s, v)) {
            // Inbound is always free, and re-arms the next outbound detent.
            holding.value = false;
            anchor = null;
            spent = false;
            wasInside = true;
            return { s, v };
        }

        if (holding.value && anchor) {
            const dist = Math.hypot(
                (s - anchor.s) * rectW,
                (v - anchor.v) * rectH,
            );
            if (dist < HOLD_PX) return { s: anchor.s, v: anchor.v };
            holding.value = false;
            anchor = null;
            spent = true;
            return { s, v };
        }

        if (wasInside && !spent) {
            // The outbound crossing lands this event: hold ON the contour.
            wasInside = false;
            const vC = Math.min(deps.contourVAt(s), 1);
            if ((v - vC) * rectH < HOLD_PX) {
                holding.value = true;
                anchor = { s, v: vC };
                return { s: anchor.s, v: anchor.v };
            }
            spent = true; // flick — already past the band, no snag
            return { s, v };
        }

        wasInside = false;
        return { s, v };
    }

    /** Drag ended — drop any hold. */
    function end() {
        reset();
    }

    return { holding, begin, apply, end };
}
