// SERVED MODEL: claude-opus-5-5
//
// X.P.W7 Repair 1 — every published result is deeply frozen. The `<number>` and `<percentage>`
// actions (`src/css/bbnf/math.ts`) build their quantity unfrozen and leave the freeze to the result
// layer (`src/css/result.ts`'s `success`), and `from`/`to` publish one shared frozen node each
// (`src/css/bbnf/value.ts`). `deepFreeze` stops at an already-frozen node, so this test pins that no
// frozen published node holds an unfrozen number or percentage quantity.

import { describe, expect, it } from "vitest";

import {
    parseCssColor,
    parseCssScalar,
    parseCssValue,
    parseCssValues,
    parseKeyframeSelector,
    parseStylesheet,
    parseTimingFunction,
} from "../../src/css/index";

function unfrozenPaths(value: unknown, path = "value", out: string[] = []): string[] {
    if (value === null || typeof value !== "object") return out;
    if (!Object.isFrozen(value)) out.push(path);
    for (const [key, child] of Object.entries(value)) unfrozenPaths(child, `${path}.${key}`, out);
    return out;
}

const CASES: ReadonlyArray<readonly [string, (source: string) => { ok: boolean; value?: unknown }, string]> = [
    ["parseKeyframeSelector", parseKeyframeSelector, "50%"],
    ["parseKeyframeSelector", parseKeyframeSelector, "from"],
    ["parseKeyframeSelector", parseKeyframeSelector, "TO"],
    ["parseKeyframeSelector", parseKeyframeSelector, "entry 25%"],
    ["parseCssScalar", parseCssScalar, "42"],
    ["parseCssScalar", parseCssScalar, "12.5%"],
    ["parseCssValue", parseCssValue, "1 2% calc(50% + 1px), 3 / 4"],
    ["parseCssValues", parseCssValues, "10% 20%"],
    ["parseCssColor", parseCssColor, "rgb(10% 20% 30% / 50%)"],
    ["parseCssColor", parseCssColor, "color-mix(in srgb, red 30%, blue)"],
    ["parseCssColor", parseCssColor, "oklch(0.5 0.1 120 / 0.8)"],
    ["parseTimingFunction", parseTimingFunction, "cubic-bezier(0.1, 0.2, 0.3, 0.4)"],
    ["parseTimingFunction", parseTimingFunction, "steps(3, jump-end)"],
    ["parseTimingFunction", parseTimingFunction, "linear(0, 0.5 25% 75%, 1)"],
    ["parseStylesheet", parseStylesheet, "@keyframes k { from { opacity: 0 } 50% { opacity: 0.5 } to { opacity: 1 } }"],
];

describe("published results are deeply frozen", () => {
    it.each(CASES)("%s — a parsed source", (_name, parse, source) => {
        const parsed = parse(source);
        expect(parsed.ok).toBe(true);
        expect(unfrozenPaths(parsed)).toEqual([]);
    });
});
