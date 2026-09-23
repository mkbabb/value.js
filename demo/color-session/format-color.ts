/**
 * THE DISPLAY FORMATTING FACILITY — one module owns display precision
 * (X.W7.f · W7.md §5.f · CC-070 · OM-14 §4).
 *
 * The library serializer (`serializeCssColor`) is a ROUND-TRIP contract: it
 * spells every channel at twelve decimals, is asserted by the library's own
 * tests and sits under the parser proof gate, so it is never the lever (G18 —
 * `src/` is not touched; an additive `{ precision }` option is X-W9's). Display
 * precision is a DEMO concern and lives here, beside `picker-color.ts` (the
 * one demo-side chokepoint every colour string flows through), reading the
 * same `PICKER_CHANNELS` metadata.
 *
 * FOUR REGISTERS — the context decides the precision, never the call site:
 *
 *  · `compact`     — instrument readouts (hero, meter, `aria-valuetext`): the
 *                    per-channel least count of `CHANNEL_DECIMALS`.
 *  · `caption`     — every place a colour is READ as text or SPOKEN: specimen
 *                    rows, tooltips, titles, aria-labels. This register IS
 *                    X-W6's `formatSpecimen` digit policy (four significant
 *                    digits, bounded by `SPECIMEN_CHAR_BUDGET`) — re-exported,
 *                    never re-implemented, so the tree carries ONE caption
 *                    digit policy (CE-1: "this wave mints no second one").
 *  · `interchange` — clipboard / URL / "copy CSS": bounded but generous and
 *                    DECLARED — the W51 per-quantity counts, reused rather than
 *                    re-invented (OM-14 §4.6), spelled in OKLCh like W51.
 *  · `exact`       — the W51 export path. `canonicalColor` stays the byte
 *                    authority, UNTOUCHED; it is named here, not wrapped.
 *
 * THE MECHANISM (OM-14 §4.4): round the channels, then serialize. A colour
 * whose channels carry ≤ N fractional digits makes the library's `toFixed(12)`
 * a no-op, so the library stays the single authority on SPELLING (keyword,
 * slash, `none`) — no regex over serialized output, no second serializer.
 */
import { parseCssColor } from "@mkbabb/value.js/css";
import { canonicalColor } from "../palettes/export/canonical";
import type { DisplayColorSpace } from "./color-model";
import {
    CSS_PICKER_SPACES,
    PICKER_CHANNELS,
    convertPickerColor,
    serializePickerColor,
    withAlpha,
    withChannel,
    type ChannelMeta,
    type PickerColor,
    type PickerSpace,
} from "./picker-color";
import { SPECIMEN_CHAR_BUDGET, formatSpecimen, type Specimen } from "./specimen-format";

export type FormatRegister = "compact" | "caption" | "interchange" | "exact";

/** The `caption` register — X-W6's one specimen digit policy, re-exported. */
export { SPECIMEN_CHAR_BUDGET, formatSpecimen, type Specimen };

/** The `exact` register — the W51 byte authority, re-exported untouched. */
export { canonicalColor as formatExact };

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
    xyz: { x: 0, y: 0, z: 0 },
    kelvin: { kelvin: 0 },
    "srgb-linear": { r: 1, g: 1, b: 1 },
    "display-p3": { r: 1, g: 1, b: 1 },
    "a98-rgb": { r: 1, g: 1, b: 1 },
    "prophoto-rgb": { r: 1, g: 1, b: 1 },
    rec2020: { r: 1, g: 1, b: 1 },
    ictcp: { i: 3, ct: 3, cp: 3 },
    jzazbz: { jz: 3, az: 3, bz: 3 },
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
function displayScale(meta: ChannelMeta): number {
    return meta.unit === "%" && meta.max <= 1 ? 100 : 1;
}

/** Decimals in STORAGE units: the display decimals plus the display scale's digits. */
function storageDecimals(meta: ChannelMeta, displayDecimals: number): number {
    return displayDecimals + Math.round(Math.log10(displayScale(meta)));
}

/** Round to `decimals` places; negative zero never survives into a readout. */
function roundTo(value: number, decimals: number): number {
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

const UNIT_SUFFIX: Readonly<Record<ChannelMeta["unit"], string>> = {
    "": "",
    "%": "%",
    deg: "°",
    K: "K",
};

/** One channel, `compact` register: stored value → display string with its unit. */
export function formatChannel(space: PickerSpace, key: string, value: number): string {
    const meta = PICKER_CHANNELS[space].find((m) => m.key === key);
    if (!meta) throw new RangeError(`No ${space}.${key} channel`);
    const shown = roundTo(value * displayScale(meta), channelDecimals(space, key));
    return `${shown}${UNIT_SUFFIX[meta.unit]}`;
}

/** Round every numeric channel (and the alpha) of `color` to its register's decimals. */
function roundColor(
    color: PickerColor,
    decimalsOf: (meta: ChannelMeta) => number,
    alphaDecimals: number,
): PickerColor {
    const metas = PICKER_CHANNELS[color.space];
    let rounded = color.channels.reduce<PickerColor>((accumulated, channel, index) => {
        const meta = metas[index];
        if (typeof channel !== "number" || !meta) return accumulated;
        return withChannel(accumulated, meta.key, roundTo(channel, storageDecimals(meta, decimalsOf(meta))));
    }, color);
    if (typeof rounded.alpha === "number") {
        // alpha is spelled as a percent: its display decimals + the ×100's two.
        rounded = withAlpha(rounded, roundTo(rounded.alpha, alphaDecimals + 2));
    }
    return rounded;
}

/**
 * A whole colour as CSS text in a register. `caption` is the colour in its own
 * space through X-W6's specimen policy; `compact` rounds in the colour's own
 * CSS space (a non-CSS space — hsv, kelvin, ictcp, jzazbz — is spelled in OKLCh,
 * as `serializePickerColor` spells it, converted BEFORE rounding so no
 * conversion re-inflates the digits); `interchange` spells OKLCh at W51's
 * counts. `exact` is `formatExact` (a different input: the W51 snapshot colour).
 */
export function formatColor(
    color: PickerColor,
    register: Exclude<FormatRegister, "exact">,
): string {
    if (register === "caption") return formatSpecimen(color, color.space).text;
    if (register === "interchange") {
        const oklch = convertPickerColor(color, "oklch");
        const cells: Readonly<Record<string, number>> = INTERCHANGE_DECIMALS.oklch;
        return serializePickerColor(
            roundColor(oklch, (meta) => cells[meta.key]!, INTERCHANGE_DECIMALS.alpha),
        );
    }
    const css = CSS_PICKER_SPACES.has(color.space) ? color : convertPickerColor(color, "oklch");
    return serializePickerColor(
        roundColor(css, (meta) => channelDecimals(css.space, meta.key), ALPHA_COMPACT_DECIMALS),
    );
}

/**
 * A stored CSS colour STRING (a palette's `css`, a mix source's `css`) in the
 * `caption` register — what every title, tooltip and aria-label reads.
 *
 * A hex literal keeps its hex spelling (it carries no excess digit; the
 * specimen policy's `hex` row spells it). The parse is read as a Result, never
 * thrown: a string the parser rejects is not a colour this facility can
 * budget, so its caption is its own text — the facility is total by
 * declaration, and validation is the parser's (X-W9), not the caption's.
 */
export function formatCssCaption(css: string): string {
    const parsed = parseCssColor(css);
    if (!parsed.ok) return css;
    const space: DisplayColorSpace = css.trim().startsWith("#") ? "hex" : parsed.value.space;
    return formatSpecimen(parsed.value, space).text;
}

/** A count as shown (`text`) and as stated exactly (`title`). */
export interface FormattedCount {
    readonly text: string;
    readonly title: string;
}

const COUNT_STEPS: readonly (readonly [number, string])[] = [
    [1e9, "b"],
    [1e6, "m"],
    [1e3, "k"],
];

/**
 * THE COMPACT-NUMBER FORMATTER (G17): `12345` → `12.3k`, the exact `12345` kept
 * for `title`. One decimal at most, TRUNCATED — a compact count never
 * overstates (`999999` reads `999.9k`, never `1000k` or `1m`), and a trailing
 * `.0` is dropped (`1000` → `1k`). Below a thousand the count is exact.
 */
export function formatCount(count: number): FormattedCount {
    const title = String(count);
    const magnitude = Math.abs(count);
    const sign = count < 0 ? "-" : "";
    for (const [step, suffix] of COUNT_STEPS) {
        if (magnitude >= step) {
            const tenths = Math.floor((magnitude / step) * 10) / 10;
            return { text: `${sign}${tenths}${suffix}`, title };
        }
    }
    return { text: title, title };
}
