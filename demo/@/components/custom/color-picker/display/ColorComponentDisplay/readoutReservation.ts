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

/* ── The face-derived packing ratios (T.W4-2 · the tnum MINT) ────────────
 * Under `tabular-nums` on the shipped face every DIGIT advances exactly
 * 1ch (the minted constant 1340/2000 upm cell — scripts/fonts/
 * build-fraunces-tnum.py); the dot and the sign are NOT tabular glyphs and
 * advance at their own (narrower) widths. Counting them at 1ch each — the
 * retired approximation — over-reserved ~0.5ch per fractional cell. The
 * ratios below are the artifact's own advances at the readout's rendered
 * instances (measured w300/w600 · opsz 41: dot ≤ 0.39ch, hyphen ≤ 0.59ch),
 * carried with a safety margin. */
const DOT_CH = 0.45;
const SIGN_CH = 0.65;

/** ch extent of one bound rendered at the space's least-count format. */
function chOf(n: number, decimals: number): number {
    const s = n.toFixed(decimals);
    let ch = 0;
    for (const c of s) {
        ch += c === "." ? DOT_CH : c === "-" ? SIGN_CH : 1;
    }
    return ch;
}

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
 * guarantees, at the ×φ rung ON THE MINTED FACE. The readout spans the full
 * header: width = 100cqi − 2·clamp(0.75rem, 4cqi, 1.5rem); its type rides
 * the ×φ `cqi` display rung, `min(--type-display-4, max(11.65cqi,
 * 2.618rem))` (ColorComponentDisplay — every bound exactly ×φ of the S
 * rung). Because font ∝ container width across the cqi band, the width IN
 * CH is a near-constant of the composition. Under `tabular-nums` the CSS
 * `ch` = the MINTED tabular cell (1340/2000 upm = 0.67em — wider than the
 * retired proportional face's 0.635em, so the naive 20/φ = 12.36 carried a
 * stale ch):
 *   · cqi band (pane 400–512): (C − 2·0.04C) / (0.67 × 0.1165C) ≈ 11.79ch
 *   · 390 phone (pane 358, font floored 41.89px, ch 28.07px):
 *     (358 − 28.6) / 28.07 ≈ 11.73ch
 * 11.7 is the band floor — ONE constant, no <sm arm (the tabular-cell
 * arithmetic made the phone band converge with the cqi band; t-mobile
 * F-4.3's 2%-tighter floor priced the old ch). Sub-390 viewports fall
 * outside the gate matrix (O-10b judges 32rem + 390).
 *
 * `READOUT_GAP_CH` — the inter-cell gap in `ch`. The tuple paints its gap
 * AS `0.75ch` (the contiguous-tuple composition), so the packing arithmetic
 * and the rendered gap are the SAME quantity by construction.
 *
 * `READOUT_FIT_FLOOR` — Q11b LEVER 2 (RULED): a space within ~3% of the
 * one-line budget holds one line through a derived fit-down coefficient
 * (`font-size: calc(rung × fit)` — module-scope arithmetic, no runtime
 * measurement); a space needing more than the shave takes its HONEST extra
 * line (lever 3 — lab-class), never a deeper squeeze (rejecting the owner's
 * size intent is the REJECTED arm).
 */
const READOUT_LINE_CAPACITY_CH = 11.7;
const READOUT_GAP_CH = 0.75;
const READOUT_FIT_FLOOR = 0.97;

/** Σch of the shown cells at worst case, gaps included. */
function packWidth(space: string, components: string[]): number {
    let w = 0;
    components.forEach((component, i) => {
        w += (i === 0 ? 0 : READOUT_GAP_CH) + readoutCh(space, component);
    });
    return w;
}

/**
 * Q11b lever 2 — the per-space fit coefficient: 1 when the tuple packs (or
 * honestly multi-lines); a derived ≤3% shave when that alone holds the
 * one-line lock (ictcp-class). Bound as `--readout-fit` on the readout.
 */
export function readoutFit(space: string, components: string[]): number {
    const w = packWidth(space, components);
    if (w <= READOUT_LINE_CAPACITY_CH) return 1;
    const fit = READOUT_LINE_CAPACITY_CH / w;
    return fit >= READOUT_FIT_FLOOR ? fit : 1;
}

/**
 * The space's worst-case line count: greedy-pack the shown components'
 * worst-case extents (atomic — a cell never splits) into the guaranteed
 * one-line budget, lever 2 absorbing the ≤3% overhang class. A
 * wider-than-budget space derives its 2 honestly instead of inheriting a
 * blanket.
 */
export function readoutLineCount(space: string, components: string[]): number {
    // Lever 2 first: a fit-down space IS a one-line space.
    if (readoutFit(space, components) < 1) return 1;
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
