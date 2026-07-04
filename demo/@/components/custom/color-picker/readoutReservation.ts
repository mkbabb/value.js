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
