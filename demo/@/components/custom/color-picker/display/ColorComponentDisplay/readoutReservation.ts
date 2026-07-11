/**
 * The readout's LINE-LEVEL reservation table (T.W4-2 — the R4 re-scope).
 *
 * THE RE-SCOPE (t-title-typography F4; t-mobile F-4.4 — the phone-band
 * PRECONDITION of the ×φ size move): the table's job re-scopes from per-cell
 * width floors to the LINE-LEVEL LOCK ONLY. The retired mechanism — every
 * cell reserving its worst-case `ch` as `min-width` — rendered the worst
 * case as BLANK width on every non-worst value (39–51% of every cell was
 * empty reservation, pooling between the values as the owner's "spread
 * apart" dead air, shot t-2002-52/t-2002-09). Cells are now INTRINSIC and
 * the card-lock GOAL is re-earned at tuple/line level (R4: the goal
 * survives, the mechanism dies — no per-cell `ch` reservation returns):
 *
 *   (i)  REAL tabular figures — the self-hosted tnum-verified face (O-10c)
 *        + the fixed per-space format below ⇒ widths change only at
 *        digit-count boundaries, never per value;
 *   (ii) the per-space worst-case LINE-COUNT lock (derived here) ⇒ the
 *        containing card rect never moves.
 *
 * STATIC, derived at module scope from the library's own
 * `COLOR_SPACE_RANGES` + `COLOR_SPACE_DENORM_UNITS` — no ResizeObserver, no
 * runtime measurement, no nudged constants.
 *
 * Q11b LEVER 1 — per-space INTEGER LEAST-COUNTS (RULED; required at 390):
 * the "fixed 1-decimal" law generalizes to a fixed per-space least count (a
 * meter's least count is per-quantity): the integer-native spaces (rgb
 * 0–255; the hue/percent channels of hsl/hsv/hwb/lch; xyz's 0–100 axes) ink
 * integers — still value-independent (never a stripped `.0`; the format is
 * a constant of the space). Everything else keeps the 1-decimal instrument
 * format (lab stays 1-decimal and takes its HONEST 2-line lock — Q11b
 * lever 3; ictcp/jzazbz are 2-line at <sm).
 */

import type { ColorSpace } from "@mkbabb/value.js/color";
import {
    COLOR_SPACE_RANGES,
    getColorSpaceBound,
    getColorSpaceDenormUnit,
} from "@mkbabb/value.js/color";

/**
 * The Q11b lever-1 set (t-title-typography F6 + t-mobile F-4.3, the named
 * spaces whose canonical notation is integer): every shown channel of these
 * spaces inks 0 decimals. lab is DELIBERATELY absent (1-decimal + the
 * honest 2-line lock — the ruled lever-3 arm).
 */
const INTEGER_LEAST_COUNT: ReadonlySet<string> = new Set([
    "rgb",
    "hsl",
    "hsv",
    "hwb",
    "lch",
    "xyz",
]);

/** The per-(space, component) least count — the readout format's ONE knob
 *  (consumed by `ColorComponentDisplay.figParts` AND the `ch` table below,
 *  so the lock arithmetic and the rendered format can never disagree). */
export function readoutDecimals(space: string, _component: string): number {
    return INTEGER_LEAST_COUNT.has(space) ? 0 : 1;
}

/** ch width of one bound rendered at the space's least-count format. */
const chOf = (n: number, decimals: number): number =>
    n.toFixed(decimals).length;

/** The per-space, per-component worst-case `ch` table (line-lock input). */
export const READOUT_CH: Readonly<Record<string, Readonly<Record<string, number>>>> =
    Object.fromEntries(
        (Object.keys(COLOR_SPACE_RANGES) as ColorSpace[]).map((space) => [
            space,
            Object.fromEntries(
                Object.keys(COLOR_SPACE_RANGES[space]).map((component) => {
                    const unit = getColorSpaceDenormUnit(space, component);
                    const { min, max } = getColorSpaceBound(space, component, unit);
                    const d = readoutDecimals(space, component);
                    return [component, Math.max(chOf(min, d), chOf(max, d))];
                }),
            ),
        ]),
    );

/** Widest legal hex rendering: `#rrggbbaa`. */
const HEX_CH = 9;

/**
 * Worst-case `ch` extent of a readout cell — a LINE-PACKING input only
 * (never a rendered min-width; the R4 re-scope). Unknown pairs fall back to
 * the hex extent (the widest single-cell format in the catalog).
 */
export function readoutCh(space: string, component: string): number {
    if (space === "hex" || component === "hex") return HEX_CH;
    return READOUT_CH[space]?.[component] ?? HEX_CH;
}

/* ── The line-count derivation (S.W4-2 → T.W4-2 · Q11b) ──────────────────
 *
 * The readout's `min-height` locks the SPACE'S own worst-case line count,
 * derived here from the same static table — never a blanket 2 (the blanket
 * lock left a permanent blank second line under every one-line space).
 *
 * Both constants below are DERIVED from the composition, not measured at
 * runtime and not nudged to fit:
 *
 * `READOUT_LINE_CAPACITY_CH` — the one-line `ch` budget the header
 * guarantees. The readout spans the full header: width = 100cqi −
 * 2·clamp(0.75rem, 4cqi, 1.5rem); its type rides the `cqi` display rung
 * (ColorComponentDisplay). Because font ∝ container width across the cqi
 * band, the width IN CH is a near-constant of the composition — that
 * constancy is the point of the rung. 20 is the band floor at the S rung
 * (the S-audit's live derivation, held verbatim); the ×φ move divides it by
 * the same φ the rung multiplies (the constant's own formula, never a
 * nudge) — landing in T.W4-2's tuple commit WITH the rung.
 *
 * `READOUT_GAP_CH` — the inter-cell gap in `ch`. The tuple paints its gap
 * AS `0.75ch` (the contiguous-tuple composition), so the packing arithmetic
 * and the rendered gap are the SAME quantity by construction.
 */
const READOUT_LINE_CAPACITY_CH = 20;
const READOUT_GAP_CH = 0.75;

/**
 * The space's worst-case line count: greedy-pack the shown components'
 * worst-case extents (atomic — a cell never splits) into the guaranteed
 * one-line budget. A wider-than-budget space derives its 2 honestly instead
 * of inheriting a blanket.
 */
export function readoutLineCount(space: string, components: string[]): number {
    let lines = 1;
    let used = 0;
    for (const component of components) {
        const cell = readoutCh(space, component);
        const next = used === 0 ? cell : used + READOUT_GAP_CH + cell;
        if (next > READOUT_LINE_CAPACITY_CH && used > 0) {
            lines += 1;
            used = cell;
        } else {
            used = next;
        }
    }
    return lines;
}
