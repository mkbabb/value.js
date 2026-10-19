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
 * T.W6.5-P: the table's worst-case premise is TRUE BY CONSTRUCTION since
 * T-33a — the demo model clamps every landing color into these same
 * `getColorSpaceBound` ranges at the pipeline seams (`valueDomain.ts`), so
 * no live value can ink wider than the derivation (`lab(40% 999 47)` inks
 * 125). And the lock's reserved-minus-painted delta renders as DESIGNED AIR
 * above the tuple, never a dead band below it (T-33b — the readout
 * bottom-anchors inside the locked box; ColorComponentDisplay `.readout`).
 *
 * Q11b LEVER 1 — per-space INTEGER LEAST-COUNTS (RULED; required at 390):
 * the "fixed 1-decimal" law generalizes to a fixed per-space least count (a
 * meter's least count is per-quantity): the integer-native spaces (rgb
 * 0–255; the hue/percent channels of hsl/hsv/hwb/lch; xyz's 0–100 axes) ink
 * integers — still value-independent (never a stripped `.0`; the format is
 * a constant of the space). Everything else keeps the 1-decimal instrument
 * format (lab stays 1-decimal; since X.W12.d its worst case sets THE MEASURE
 * the rung is fitted to, so it holds one line — no reserved second line).
 */

import { PICKER_CHANNELS, type PickerSpace } from "../../../color-session/picker-color";

/**
 * The Q11b lever-1 set (t-title-typography F6 + t-mobile F-4.3, the named
 * spaces whose canonical notation is integer): every shown channel of these
 * spaces inks 0 decimals. lab is DELIBERATELY absent (1-decimal; its
 * worst case is the catalog measure — X.W12.d).
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
        (Object.keys(PICKER_CHANNELS) as PickerSpace[]).map((space) => [
            space,
            Object.fromEntries(
                [
                    ...PICKER_CHANNELS[space],
                    { key: "alpha", min: 0, max: 100, unit: "%" as const },
                ].map((meta) => {
                    const scale = meta.unit === "%" && meta.max <= 1 ? 100 : 1;
                    const d = readoutDecimals(space, meta.key);
                    return [
                        meta.key,
                        Math.max(chOf(meta.min * scale, d), chOf(meta.max * scale, d)),
                    ];
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

/* ── The line-count derivation (S.W4-2 → T.W4-2 · Q11b → X.W12.d) ────────
 *
 * The readout's `min-height` locks the SPACE'S own worst-case line count,
 * derived here from the same static table — never a blanket 2.
 *
 * X.W12.d (OA-24, owner frame 4 — "why so much blank space"; g1's largest
 * interval): the direction of the derivation is REVERSED. The retired arm
 * picked the rung first (the ×φ `cqi` display-4 rung, 11.65cqi) and let the
 * catalog's wider spaces take an "honest" second line — which, at every
 * one-line value, painted as a 61px empty band between the title and the
 * numbers (lab's 2-line lock; g1 RESIDUE 61.22px + inflation 55.41px, and
 * the owner's frame 4). A reservation that paints nothing is the dead band
 * wherever it is anchored (below the tuple at T.W4-2, above it at T.W6.5-P).
 *
 * THE MEASURE now comes first: `READOUT_MEASURE_CH` is the widest SHOWN
 * tuple in the catalog at its worst case (lab: `100.0, -125.0, -125.0` =
 * 16.15ch), and the rung is sized so that measure is ONE line of the header
 * (ColorComponentDisplay: `font-size: min(--type-display-1, 100cqi /
 * --readout-measure)`, the measure bound in em through the tnum cell). Every
 * shown space is therefore a one-line space BY CONSTRUCTION — the line lock
 * is the painted line, the card rect still never moves on a value change,
 * and nothing is reserved that does not ink.
 *
 * `READOUT_GAP_CH` — the inter-cell gap in `ch`, painted as `0.75ch`, so the
 * packing arithmetic and the rendered gap are the SAME quantity.
 *
 * `TNUM_CELL_EM` — the minted tabular cell (1340/2000 upm = 0.67em —
 * scripts/fonts/build-fraunces-tnum.py): the em extent of one digit, the
 * factor that turns the `ch` measure into the rung's em divisor.
 *
 * `READOUT_FIT_FLOOR` — Q11b lever 2: kept for the unshown (alpha-bearing)
 * sets the packer still answers; with capacity = the measure no shown set
 * needs it.
 */
const READOUT_GAP_CH = 0.75;
const READOUT_FIT_FLOOR = 0.97;
const TNUM_CELL_EM = 0.67;

/** Σch of the shown cells at worst case, gaps included. */
function packWidth(space: string, components: string[]): number {
    let w = 0;
    components.forEach((component, i) => {
        w += (i === 0 ? 0 : READOUT_GAP_CH) + readoutCh(space, component);
    });
    return w;
}

/** THE MEASURE — the widest shown tuple in the catalog at worst case, in
 *  `ch` (hex's single cell included). The header's one-line budget IS this
 *  measure, so no shown space derives a second line. */
export const READOUT_MEASURE_CH: number = Math.max(
    HEX_CH,
    ...(Object.keys(PICKER_CHANNELS) as PickerSpace[]).map((space) =>
        packWidth(
            space,
            PICKER_CHANNELS[space].map((meta) => meta.key),
        ),
    ),
);

/** The measure in em of the readout's own font — the rung's divisor
 *  (bound as `--readout-measure`; `100cqi / measure` fits it to one line). */
export const READOUT_MEASURE_EM: number = READOUT_MEASURE_CH * TNUM_CELL_EM;

const READOUT_LINE_CAPACITY_CH = READOUT_MEASURE_CH;

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
