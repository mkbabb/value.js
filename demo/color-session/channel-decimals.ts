/**
 * The per-channel decimal table — the one digit policy every colour readout,
 * caption and title rounds through (format-color.ts re-exports it; the
 * specimen line reads it directly, which keeps the two modules acyclic).
 */
import type { ChannelMeta, PickerSpace } from "./picker-color";

/**
 * An OWNER-RULING cell: the facility does not decide it. `shipped` is the value
 * the product ships TODAY (the ruled per-space rule it replaces) — carried so
 * the facility is total, never a new guess — and `ruling` names the open row.
 */
export interface OwnerRuling {
    readonly ruling: string;
    readonly shipped: number;
}
export type DecimalCell = number | OwnerRuling;

/** OM-14 §4.7 row 1 — the one cell of the table this wave may not decide. */
export const LCH_C_COMPACT_RULING: OwnerRuling = Object.freeze({
    ruling:
        "OM-14 §4.7 row 1 (OWNER-RULING): lch C compact — 0 (today's per-space rule) vs 1, given oklch C carries 3",
    shipped: 0,
});

/**
 * THE PER-CHANNEL DECIMAL TABLE — `compact` register, in DISPLAY units: a
 * percent channel counts decimals of the percent (`s = 0.5` shows as `50%`), a
 * hue counts decimals of the degree, alpha counts decimals of its percent.
 *
 * Per CHANNEL, not per space (OM-14 §4.2): the per-space rule cannot express
 * OKLCh, whose tuple mixes a 0–100 % lightness, a 0–0.5 chroma and a 0–360 hue.
 * Seeded from the ruled `INTEGER_LEAST_COUNT` (`readoutReservation.ts`) and
 * OM-14 §4.2's compact column; where that column is silent (lch L, the five
 * 0–1 RGB encodings) the cell carries the shipped per-space value.
 *
 * Owner order 2026-11-09 ("too many digits of signif"): this is the ONE digit
 * policy. The hero, the meters, the space menu, the tab title, tooltips and
 * toasts all round through it, at what perception supports: a 0–1 RGB
 * encoding to three decimals (finer than an 8-bit step), XYZ to a tenth of a
 * percent, OKLCh L to a tenth of a percent, C to three decimals, h whole.
 */
export const CHANNEL_DECIMALS = Object.freeze({
    rgb: { r: 0, g: 0, b: 0 },
    hsl: { h: 0, s: 0, l: 0 },
    hsv: { h: 0, s: 0, v: 0 },
    hwb: { h: 0, w: 0, b: 0 },
    lab: { l: 1, a: 1, b: 1 },
    lch: { l: 0, c: LCH_C_COMPACT_RULING, h: 0 },
    oklab: { l: 1, a: 3, b: 3 },
    oklch: { l: 1, c: 3, h: 0 },
    xyz: { x: 1, y: 1, z: 1 },
    kelvin: { kelvin: 0 },
    "srgb-linear": { r: 3, g: 3, b: 3 },
    "display-p3": { r: 3, g: 3, b: 3 },
    "a98-rgb": { r: 3, g: 3, b: 3 },
    "prophoto-rgb": { r: 3, g: 3, b: 3 },
    rec2020: { r: 3, g: 3, b: 3 },
    ictcp: { i: 3, ct: 3, cp: 3 },
    jzazbz: { jz: 3, az: 3, bz: 3 },
    "xyz-d50": { x: 1, y: 1, z: 1 },
    "display-p3-linear": { r: 3, g: 3, b: 3 },
} satisfies Record<PickerSpace, Readonly<Record<string, DecimalCell>>>);

/** Alpha's `compact` cell, in percent (the serializer spells alpha as `/ N%`). */
export const ALPHA_COMPACT_DECIMALS = 0;

/**
 * The `interchange` register — W51's per-quantity counts (`canonical.ts`:
 * L 3 dp %, C 6 dp, H 3 dp, A 6 dp as a number = 4 dp as a percent), in the
 * same OKLCh spelling. Declared, not accidental; ~40% of the 12-decimal bytes
 * and it still round-trips the parser (OM-14 §4.6).
 */
export const INTERCHANGE_DECIMALS = Object.freeze({
    oklch: { l: 3, c: 6, h: 3 },
    alpha: 4,
});

function cellValue(cell: DecimalCell): number {
    return typeof cell === "number" ? cell : cell.shipped;
}

/** ×100 for a percent channel stored as a 0–1 fraction; 1 otherwise. */
export function displayScale(meta: ChannelMeta): number {
    return meta.unit === "%" && meta.max <= 1 ? 100 : 1;
}

/** Decimals in STORAGE units: the display decimals plus the display scale's digits. */
export function storageDecimals(meta: ChannelMeta, displayDecimals: number): number {
    return displayDecimals + Math.round(Math.log10(displayScale(meta)));
}

/** Round to `decimals` places; negative zero never survives into a readout. */
export function roundTo(value: number, decimals: number): number {
    const rounded = Number(value.toFixed(decimals));
    return rounded === 0 ? 0 : rounded;
}

/** The `compact` register's decimals for one channel, in display units. */
export function channelDecimals(space: PickerSpace, key: string): number {
    const row: Readonly<Record<string, DecimalCell>> = CHANNEL_DECIMALS[space];
    const cell = row[key];
    if (cell === undefined) throw new RangeError(`No ${space}.${key} channel`);
    return cellValue(cell);
}

/**
 * A number at `decimals` places with trailing zeros stripped and no negative
 * zero: `0.180` reads `0.18`, `73.0` reads `73`, `-0.0` reads `0`.
 */
export function formatFixed(value: number, decimals: number): string {
    return String(roundTo(value, decimals));
}
