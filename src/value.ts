import type { AnyColor } from "./color/index";

/**
 * PSL-2, published from the module that RETURNS it (ESC-W9d-DTS-SPELLING).
 *
 * `CssScalar`'s colour payload carries an `AnyColor`, so a consumer who writes
 * down what `CssScalar` holds must be able to name it — and its vocabulary —
 * from `./value`. X-W9.d wrote that list into `src/subpaths/value.ts` instead
 * and measured three re-export spellings there all emit a BARE `declare` into
 * `value.d.ts` (G13). Published here, the declaration arrives under this
 * module's own spelling and the subpath's `export *` carries it exported.
 */
export type {
    Alpha,
    AnyColor,
    Channel,
    ChannelsBySpace,
    Color,
    SpaceId,
} from "./color/index";

export type CssScalar = Readonly<{
    kind: "scalar";
    payload:
        | Readonly<{ type: "number"; value: number; unit: string }>
        | Readonly<{ type: "keyword"; value: string }>
        | Readonly<{ type: "color"; value: AnyColor }>;
}>;

/**
 * A function and its comma-separated arguments. The EMPTY `name` is a `()` simple block
 * (css-syntax-3 §5.4.8), e.g. the group in `calc(50% - (1em / 2))`, serialized `( … )`.
 */
export type CssCall = Readonly<{
    kind: "call";
    name: string;
    args: readonly CssValue[];
}>;

export type CssList = Readonly<{
    kind: "list";
    separator: "space" | "comma" | "slash";
    items: readonly CssValue[];
}>;

export type CssValue = CssScalar | CssCall | CssList;

const LAYOUT_UNITS = new Set([
    "%", "var", "calc",
    "vh", "vw", "vmin", "vmax", "vi", "vb",
    "svh", "svw", "svmin", "svmax", "svi", "svb",
    "lvh", "lvw", "lvmin", "lvmax", "lvi", "lvb",
    "dvh", "dvw", "dvmin", "dvmax", "dvi", "dvb",
    "cqw", "cqh", "cqi", "cqb", "cqmin", "cqmax",
]);

export function isLayoutTrackingUnit(unit: string): boolean {
    return LAYOUT_UNITS.has(unit.toLowerCase());
}
