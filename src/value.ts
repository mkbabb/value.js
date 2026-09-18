import type { AnyColor } from "./color/index";

export type CssScalar = Readonly<{
    kind: "scalar";
    payload:
        | Readonly<{ type: "number"; value: number; unit: string }>
        | Readonly<{ type: "keyword"; value: string }>
        | Readonly<{ type: "color"; value: AnyColor }>;
}>;

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
