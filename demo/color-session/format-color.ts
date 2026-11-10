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
 *                    `formatSpecimen`, which rounds through the same
 *                    `CHANNEL_DECIMALS` table, so the tree carries one digit
 *                    policy.
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
import { parseCssColor } from "@mkbabb/value.js/color";
import { canonicalColor } from "../palettes/export";
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
import {
    ALPHA_COMPACT_DECIMALS,
    INTERCHANGE_DECIMALS,
    channelDecimals,
    displayScale,
    roundTo,
    storageDecimals,
} from "./channel-decimals";

export type FormatRegister = "compact" | "caption" | "interchange" | "exact";

/** The `caption` register — X-W6's one specimen digit policy, re-exported. */
export { SPECIMEN_CHAR_BUDGET, formatSpecimen, type Specimen };

/** The `exact` register — the W51 byte authority, re-exported untouched. */
export { canonicalColor as formatExact };

export {
    ALPHA_COMPACT_DECIMALS,
    CHANNEL_DECIMALS,
    INTERCHANGE_DECIMALS,
    LCH_C_COMPACT_RULING,
    channelDecimals,
    formatFixed,
    type DecimalCell,
    type OwnerRuling,
} from "./channel-decimals";

const UNIT_SUFFIX: Readonly<Record<ChannelMeta["unit"], string>> = {
    "": "",
    "%": "%",
    deg: "deg",
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
 * specimen policy's `hex` row spells it), and a named colour keeps its name
 * (`tomato` reads as itself, never as the channels it stands for). The parse is read as a Result, never
 * thrown: a string the parser rejects is not a colour this facility can
 * budget, so its caption is its own text — the facility is total by
 * declaration, and validation is the parser's (X-W9), not the caption's.
 */
export function formatCssCaption(css: string): string {
    if (/^[a-z]+$/i.test(css.trim())) return css.trim();
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
