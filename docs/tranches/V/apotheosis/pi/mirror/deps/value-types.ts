import type { AnyColor } from "./color-model.js";

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

export type JumpPosition = "jump-start" | "jump-end" | "jump-none" | "jump-both";

