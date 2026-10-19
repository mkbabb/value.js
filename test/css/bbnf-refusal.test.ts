// SERVED MODEL: claude-opus-5-5
//
// X.P.W7 `.l3` (W7.md ADDENDUM 2026-09-25 (e); COHESION §0dq) — the refusal discipline, pinned on
// value.js's side. A refused component's failure record (`Refused`, the colour grammar's `invalid`)
// is internal: built once as a plain record, read once by its entry, and published only as the
// frozen `failure` — so the published refusal is deeply frozen and names exactly the component
// refused, while the record itself costs no freezes. (The grammar side — a refusal builds no value
// it discards, and re-scans nothing it has classified — is bbnf-lang's `test/reentry.test.ts`.)
// The stylesheet readers build each list in one array, in one pass (no mapped copy spread, no
// filtered copy): their answers are pinned below.

import { describe, expect, it } from "vitest";

import { parseCssColor, parseCssScalar, parseCssValue, parseCssValues, parseKeyframeSelector, parseStylesheet, parseTimingFunction } from "../../src/css/index";
import { parser } from "../../src/css/bbnf/load";
import { ruleList } from "../../src/css/bbnf/sheet";
import { splitTopLevel } from "../../src/css/bbnf/index";

function unfrozenPaths(value: unknown, path = "value", out: string[] = []): string[] {
    if (value === null || typeof value !== "object") return out;
    if (!Object.isFrozen(value)) out.push(path);
    for (const [key, child] of Object.entries(value)) unfrozenPaths(child, `${path}.${key}`, out);
    return out;
}

describe("a refusal publishes one frozen diagnostic", () => {
    it.each([
        ["parseCssValue", parseCssValue, "1px @ 2px", { start: 4, end: 5, expected: ["scalar"] }],
        ["parseCssValues", parseCssValues, "a, b ^^ c", { start: 5, end: 7, expected: ["scalar"] }],
        ["parseCssScalar", parseCssScalar, "@@", { start: 0, end: 2, expected: ["scalar"] }],
    ] as const)("%s(%j) names the refused component", (_name, parse, source, want) => {
        const parsed = parse(source);
        expect(parsed.ok).toBe(false);
        expect(parsed.diagnostics).toHaveLength(1);
        expect(parsed.diagnostics[0]).toMatchObject({ code: "css_syntax", ...want, actual: source.slice(want.start, want.end) });
        expect(unfrozenPaths(parsed)).toEqual([]);
    });

    it.each([
        ["parseCssColor", parseCssColor, "rgb(1)"],
        ["parseCssColor", parseCssColor, "rgb(from red r g b)"],
        ["parseCssValue", parseCssValue, "rgb(1) 2px"],
        ["parseKeyframeSelector", parseKeyframeSelector, "150%"],
        ["parseTimingFunction", parseTimingFunction, "cubic-bezier(2, 0, 0, 1)"],
        ["parseStylesheet", parseStylesheet, "a { color: red"],
        ["parseStylesheet", parseStylesheet, "rgb(1 2 3)"],
    ] as const)("%s(%j) is refused, deeply frozen", (_name, parse, source) => {
        const parsed = parse(source);
        expect(parsed.ok).toBe(false);
        expect(unfrozenPaths(parsed)).toEqual([]);
    });

    it("builds the component's failure record once, unfrozen, and never publishes it", () => {
        const record = parser.entries.valueTop("1px @ 2px") as { kind: string; span?: { start: number; end: number } };
        expect(record).toEqual({ kind: "refused", code: "css_syntax", expected: "scalar", span: { start: 4, end: 5 } });
        expect(Object.isFrozen(record)).toBe(false);
        const published = parseCssValue("1px @ 2px");
        expect(published.ok).toBe(false);
        expect(published.diagnostics[0]).not.toBe(record);
    });
});

describe("the stylesheet readers build each list in one pass", () => {
    it("drop empty items, keep order, and see through groups and strings", () => {
        expect(splitTopLevel(" a , , b(c, d) ,'e,f' ,", ",")).toEqual(["a", "b(c, d)", "'e,f'"]);
        expect(splitTopLevel(";a: 1;; b: (2;3) ;", ";")).toEqual(["a: 1", "b: (2;3)"]);
        expect(splitTopLevel("  x   y(1 2)  'z w' ", "space")).toEqual(["x", "y(1 2)", "'z w'"]);
        expect(splitTopLevel("a, (b", ",")).toBeNull();
    });

    it("answer a rule list's blocks, and on a refused sheet no block", () => {
        expect(ruleList("a { b: c } @x y; d{}")).toEqual({
            blocks: [{ prelude: "a", body: " b: c " }, { prelude: "@x y", body: null }, { prelude: "d", body: "" }],
            fault: undefined,
        });
        expect(ruleList("rgb(1 2 3)")).toEqual({ blocks: [], fault: { expected: "rule", start: 0 } });
    });
});
