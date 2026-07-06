/**
 * The readout's `ch`-reservation table (R.W3 Lane D / D1 — the card-lock
 * law's application, demo/DESIGN.md §Type; N.W16 D1-1; U31).
 *
 * STATIC, derived at module scope from the library's own
 * `COLOR_SPACE_RANGES` + `COLOR_SPACE_DENORM_UNITS` — no ResizeObserver, no
 * runtime measurement, no nudged constants. For every (space, component) the
 * table holds the `ch` width of the widest legal rendering the readout can
 * ink (sign + integer digits + `.` + one fractional digit, the
 * `ColorComponentDisplay` format), so a slider drag from min to max re-inks
 * the SAME box and the containing card rect never moves (±0px).
 *
 * `ch` is the right unit because the readout declares tabular figures
 * (`tabular-nums`): every digit, the sign, and the decimal point advance at
 * the tabular width, so a worst-case character count IS a worst-case width.
 */

import type { ColorSpace } from "@src/units/color/constants";
import {
    COLOR_SPACE_RANGES,
    getColorSpaceBound,
    getColorSpaceDenormUnit,
} from "@src/units/color/constants";

/** ch width of one bound rendered at the readout's 1-decimal format. */
const chOf = (n: number): number => n.toFixed(1).length;

/** The per-space, per-component worst-case `ch` table. */
export const READOUT_CH: Readonly<Record<string, Readonly<Record<string, number>>>> =
    Object.fromEntries(
        (Object.keys(COLOR_SPACE_RANGES) as ColorSpace[]).map((space) => [
            space,
            Object.fromEntries(
                Object.keys(COLOR_SPACE_RANGES[space]).map((component) => {
                    const unit = getColorSpaceDenormUnit(space, component);
                    const { min, max } = getColorSpaceBound(space, component, unit);
                    return [component, Math.max(chOf(min), chOf(max))];
                }),
            ),
        ]),
    );

/** Widest legal hex rendering: `#rrggbbaa`. */
const HEX_CH = 9;

/**
 * Worst-case `ch` reservation for a readout cell. Unknown pairs fall back to
 * the hex reservation (the widest single-cell format in the catalog).
 */
export function readoutCh(space: string, component: string): number {
    if (space === "hex" || component === "hex") return HEX_CH;
    return READOUT_CH[space]?.[component] ?? HEX_CH;
}

/* ── The line-count derivation (S.W4-2 · S-19 — design-picker P1-1) ──────
 *
 * The readout's `min-height` locks the SPACE'S own worst-case line count,
 * derived here from the same static table — never a blanket 2 (the blanket
 * lock left a permanent blank second line under every one-line space).
 *
 * Both constants below are DERIVED from the composition, not measured at
 * runtime and not nudged to fit:
 *
 * `READOUT_LINE_CAPACITY_CH` — the one-line `ch` budget the header
 * guarantees. The readout spans the full header (S.W4-2): width =
 * 100cqi − 2·clamp(0.75rem, 4cqi, 1.5rem); its type rides the `cqi`
 * display rung, `min(--type-display-2, max(7.2cqi, 1.618rem))`
 * (ColorComponentDisplay). Because font ∝ container width across the cqi
 * band, the width IN CH is a near-constant of the composition — that
 * constancy is the point of the rung. With Fraunces' declared tabular
 * advance ≈ 0.635em (the S-audit's own measure: a 33.83px `ch` at the
 * 53.28px token cap — design-picker P1-1), at the 2026-07-05 owner-ruling
 * clamp (--pane-max 32rem / --pane-min 25rem):
 *   · C = 512px (--pane-max):   (512 − 41)   / (0.635 × 36.86) ≈ 20.1ch
 *   · C = 400px (--pane-min):   (400 − 32)   / (0.635 × 28.8)  ≈ 20.1ch
 *   · C = 358px (390px phone):  (358 − 28.6) / (0.635 × 25.9)  ≈ 20.0ch
 * (Verified live at the narrowing: all catalog spaces — Lab/OKLCh/ICtCp/
 * Jzazbz included — hold their locked line count at 512px panes.)
 * 20 is the band floor. The widest catalog line (lab: 5 + 6 + 6 + two gaps
 * ≈ 18.5ch) fits with ~1.5ch to spare — headroom for the value-dependent
 * comma/unit slop the cell reservations don't cover.
 *
 * `READOUT_GAP_CH` — the inter-cell gap (`gap-x-3` = 0.75rem) in `ch` at
 * the band's SMALLEST type (font floor 1.618rem ≈ 25.9px → ch ≈ 16.4px →
 * 12px ≈ 0.73ch): the conservative end, since a fixed-rem gap is
 * relatively widest where the type is smallest.
 */
const READOUT_LINE_CAPACITY_CH = 20;
const READOUT_GAP_CH = 0.75;

/**
 * The space's worst-case line count: greedy-pack the shown components'
 * reserved cells (atomic — a cell never splits) into the guaranteed
 * one-line budget. 1 for every space in today's catalog; a future
 * wider-than-budget space derives its 2 honestly instead of inheriting a
 * blanket.
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
