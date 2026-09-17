import { describe, expect, it } from "vitest";
import * as live from "../../../../../../../dist/subpaths/css.js";
import { serializeKeyframeSelector } from "../grammar/keyframe-selector.js";
import {
    parseCssScalar,
    parseCssValue,
    parseCssValues,
    parseKeyframeSelector,
} from "../index.js";
import type { KeyframeSelector, ParseResult } from "../types.js";

type Door<T> = (source: string) => ParseResult<T>;

function gatingProjection<T>(result: ParseResult<T>): unknown {
    return result.ok
        ? { ok: true, value: result.value }
        : { ok: false, code: result.diagnostics[0].code, expected: result.diagnostics[0].expected };
}

function accepted<T>(mirror: Door<T>, oracle: Door<T>, source: string): void {
    const mirrorResult = mirror(source);
    const liveResult = oracle(source);
    expect(mirrorResult.ok, source).toBe(true);
    expect(liveResult.ok, source).toBe(true);
    expect(gatingProjection(mirrorResult), source).toEqual(gatingProjection(liveResult));
}

function rejected<T>(mirror: Door<T>, oracle: Door<T>, source: string): void {
    const mirrorResult = mirror(source);
    const liveResult = oracle(source);
    expect(mirrorResult.ok, source).toBe(false);
    expect(liveResult.ok, source).toBe(false);
    expect(gatingProjection(mirrorResult), source).toEqual(gatingProjection(liveResult));
}

const scalarAccept = [
    "0", "-0", "+0", "1", "-1", "+1", ".5", "-.5", "+.5",
    "1.25", "-2.5", "1px", "-2.5rem", "100%", "0deg", "1e", "1e2px", "1E-2s", "1e+2ms",
    "a", "A", "foo", "FOO", "foo-bar", "_x", "-x", "--", "---", "----",
    "--0", "--1", "--My-Token", "custom123", "none", "auto", "currentColor",
    "''", '""', "'quoted value'", '"quoted"', "'a\\'b'", '"a\\"b"', '"a\\\nb"',
    "+", "*", "-", "<=", ">=", "==", "!=", "<", ">", "=", ":", ";",
] as const;

const scalarReject = [
    "", " ", "\t", "$", "@", "#12", "#12345", "1 2", "1..2", ".",
    "++1", "+-1", "1px!", "foo!", "\"unterminated", "'unterminated", "[x]", "{x}", "(x)",
    "/", ",", "&", "?", "~", "`", "\\", "!", "||", "::", "1e309", "-1e309",
] as const;

const valueAccept = [
    "0", "1px", "-.5rem", "foo", "--", "---", "--1", "'x'", '"a b"', ":", ";", "<=",
    "1px solid", "a b c", "1 : 2", "a ; b", "a / b", "a/b/c", "a, b", "a,b,c",
    "a b / c", "a / b, c", "a b / c, d e", "'a,b' c", '"a/b" c',
    "fn(1)", "fn(a)", "fn(a b)", "fn(a, b)", "fn(a / b)", "fn('a,b')", "fn(\"a/b\")",
    "outer(inner(1))", "outer(inner(a b), 3px)", "outer(a, inner(b, c))", "fn(a, inner(b c))",
    "sibling-index()", "sibling-count()", "scroll()", "view()", "--custom()", "--Custom(1px)",
    "calc(1px + 2px)", "var(--x)", "env(safe-area-inset-top)", "min(1px, 2px)", "clamp(0px, 1px, 2px)",
    "Fn(1)", "outer('x' / 2)", "outer(\"a\\\nb\")", "a, fn(b / c), d e", "x(y(z(1)))",
] as const;

const valueReject = [
    "", " ", "\"unterminated", "'unterminated", "fn(", "fn)",
    "sibling-index(1)", "sibling-count(foo)", "outer(sibling-index(1))",
    "1e309", "-1e309", "outer(1e309)", "a, 1e309", "fn(a, 1e309)",
    "fn([a,b})", "fn({a/b])", "fn((a])", "fn([a,b]", "fn(a))", "[a)", "{a]", "(a}",
] as const;

const selectorAccept = [
    "from", "FROM", "From", "to", "TO", "To",
    "0%", "+0%", "-0%", ".5%", "+.5%", "1%", "1.25%", "25%", "33.333%", "50%",
    "66.667%", "75%", "99%", "99.999%", "100%", "+100%", "100.0%",
    "entry", "ENTRY", "exit", "EXIT", "cover", "COVER", "contain", "CONTAIN",
    "entry 0%", "entry 1%", "entry 25%", "entry 50%", "entry 100%",
    "exit 0%", "exit 12.5%", "exit 50%", "exit 100%",
    "cover 0%", "cover .5%", "cover 25%", "cover 75%", "cover 100%",
    "contain 0%", "contain +10%", "contain 50%", "contain 99.9%", "contain 100%",
    "  from  ", " entry   25% ",
] as const;

const selectorReject = [
    "", " ", "foo", "0", "1px", "101%", "100.1%", "-1%", "+101%", "entry 101%",
    "entry -1%", "exit 200%", "contain -20%", "cover 100.1%", "entry 1px", "entry 10",
    "entry 10% extra", "entry entry", "from 10%", "to 10%", "unknown 10%", "entry()", "#x", "'entry'",
] as const;

describe("W1 maintained value and keyframe-selector banks", () => {
    it("proves 50+ branch-diverse scalar accepts and 20+ asserted scalar rejects", () => {
        expect(scalarAccept.length).toBeGreaterThanOrEqual(50);
        expect(scalarReject.length).toBeGreaterThanOrEqual(20);
        for (const source of scalarAccept) accepted(parseCssScalar, live.parseCssScalar, source);
        for (const source of scalarReject) rejected(parseCssScalar, live.parseCssScalar, source);
    });

    it("proves 50+ branch-diverse value accepts and 20+ asserted value rejects", () => {
        expect(valueAccept.length).toBeGreaterThanOrEqual(50);
        expect(valueReject.length).toBeGreaterThanOrEqual(20);
        for (const source of valueAccept) accepted(parseCssValue, live.parseCssValue, source);
        for (const source of valueReject) rejected(parseCssValue, live.parseCssValue, source);
    });

    it("independently proves 50+ parseCssValues accepts and 20+ asserted rejects", () => {
        expect(valueAccept.length).toBeGreaterThanOrEqual(50);
        expect(valueReject.length).toBeGreaterThanOrEqual(20);
        for (const source of valueAccept) accepted(parseCssValues, live.parseCssValues, source);
        for (const source of valueReject) rejected(parseCssValues, live.parseCssValues, source);
    });

    it("proves 50+ selector accepts and 20+ asserted rejects, including temporary named-range compatibility", () => {
        expect(selectorAccept.length).toBeGreaterThanOrEqual(50);
        expect(selectorReject.length).toBeGreaterThanOrEqual(20);
        for (const source of selectorAccept) accepted(parseKeyframeSelector, live.parseKeyframeSelector, source);
        for (const source of selectorReject) rejected(parseKeyframeSelector, live.parseKeyframeSelector, source);
        for (const source of ["entry 101%", "entry -1%", "exit 200%", "contain -20%"] as const) {
            const parsed = parseKeyframeSelector(source);
            expect(parsed.ok).toBe(false);
            if (!parsed.ok) expect(parsed.diagnostics[0].expected).toEqual(["0%..100%"]);
        }
    });

    it("preserves the exact first inner diagnostic through nested calls and lists", () => {
        for (const source of [
            "outer(sibling-index(1))",
            "outer(1e309)",
            "a, 1e309",
        ] as const) {
            const mirror = parseCssValue(source);
            const oracle = live.parseCssValue(source);
            expect(mirror.ok, source).toBe(false);
            expect(oracle.ok, source).toBe(false);
            if (!mirror.ok && !oracle.ok) {
                expect({
                    code: mirror.diagnostics[0].code,
                    expected: mirror.diagnostics[0].expected,
                    actual: mirror.diagnostics[0].actual,
                }, source).toEqual({
                    code: oracle.diagnostics[0].code,
                    expected: oracle.diagnostics[0].expected,
                    actual: oracle.diagnostics[0].actual,
                });
            }
        }
    });

    it("records CSS Syntax component-value corrections instead of preserving LIVE token loss", () => {
        expect(live.parseCssScalar("1.").ok).toBe(true);
        expect(parseCssScalar("1.").ok).toBe(false);
        const numberThenDelim = parseCssValue("1.");
        expect(numberThenDelim.ok).toBe(true);
        if (numberThenDelim.ok) expect(numberThenDelim.value).toMatchObject({
            kind: "list",
            separator: "space",
        });

        for (const source of ["fn()", "outer(fn())", "fn(!)", "fn(@x)", "fn(#id)", "fn(a;)", "url(http://x)"] as const) {
            expect(parseCssValue(source).ok, source).toBe(true);
        }
        expect(parseCssValue("url(a b)").ok).toBe(false);

        for (const source of ["$", "@", "#12", "1..2", ".", "++1", "1px!", "foo!", "a, $", "$ / a", "a $"] as const) {
            expect(live.parseCssValue(source).ok, source).toBe(false);
            expect(parseCssValue(source).ok, source).toBe(true);
        }

        const normalized = parseCssScalar('"a\\\r\nb"');
        expect(normalized.ok).toBe(true);
        if (normalized.ok) expect(normalized.value).toMatchObject({
            payload: { type: "keyword", value: '"a\\\nb"' },
        });
        expect(parseCssScalar(String.raw`#\31 23`).ok).toBe(true);
        expect(parseCssValue('"foo\\').ok).toBe(false);
    });

    it("keeps recognized non-finite numeric diagnostics empty directly and when nested", () => {
        for (const source of ["1e309", "-1e309"] as const) {
            for (const parse of [parseCssScalar, parseCssValue, parseCssValues] as const) {
                const result = parse(source);
                expect(result.ok, source).toBe(false);
                if (!result.ok) expect(result.diagnostics[0].expected).toEqual([]);
            }
        }
        for (const source of ["outer(1e309)", "a, 1e309", "fn(a, -1e309)"] as const) {
            const result = parseCssValue(source);
            expect(result.ok, source).toBe(false);
            if (!result.ok) expect(result.diagnostics[0].expected).toEqual([]);
        }
    });

    it("asserts R8 expected divergences while retaining ordinary separator precedence", () => {
        for (const source of ["a,,b", "a,,,b", "a//b", "a///b"] as const) {
            expect(live.parseCssValue(source).ok, source).toBe(true);
            expect(parseCssValue(source).ok, source).toBe(false);
            expect(live.parseCssValues(source).ok, source).toBe(true);
            expect(parseCssValues(source).ok, source).toBe(false);
        }
        accepted(parseCssValue, live.parseCssValue, "a b / c, fn(d, e f)");
    });

    it("keeps all four W1 public doors no-throw and rejecting on hostile non-string values", () => {
        const doors = [parseCssScalar, parseCssValue, parseCssValues, parseKeyframeSelector] as const;
        const hostile: readonly unknown[] = [undefined, null, 0, 1, NaN, {}, [], Symbol("css")];
        for (const door of doors) {
            for (const value of hostile) {
                let result: ParseResult<unknown> | undefined;
                expect(() => { result = (door as (source: unknown) => ParseResult<unknown>)(value); }).not.toThrow();
                expect(result?.ok).toBe(false);
            }
        }
    });

    it("flips the W1 color-bearing rows GREEN through the W2 typed seam", () => {
        for (const source of ["red", "#123", "rgb(255 0 0)", "hsl(120 50% 50%)"] as const) {
            accepted(parseCssScalar, live.parseCssScalar, source);
            accepted(parseCssValue, live.parseCssValue, source);
            accepted(parseCssValues, live.parseCssValues, source);
        }
    });

    it("serializes the valid selector domain canonically and round-trips at the 12-decimal policy", () => {
        const cases: readonly [KeyframeSelector, string][] = [
            [{ kind: "percent", value: 0 }, "0%"],
            [{ kind: "percent", value: 1 }, "100%"],
            [{ kind: "percent", value: 0.125 }, "12.5%"],
            [{ kind: "named", name: "entry" }, "entry"],
            [{ kind: "named", name: "exit", offset: 0 }, "exit 0%"],
            [{ kind: "named", name: "contain", offset: 0.3333333333333333 }, "contain 33.333333333333%"],
        ];
        for (const [selector, canonical] of cases) {
            expect(serializeKeyframeSelector(selector)).toBe(canonical);
            const parsed = parseKeyframeSelector(canonical);
            expect(parsed.ok, canonical).toBe(true);
            if (parsed.ok) expect(serializeKeyframeSelector(parsed.value)).toBe(canonical);
        }
    });

    it("accepts CSS Syntax comments, escapes, and simple blocks as bounded spec-over-LIVE corrections", () => {
        for (const source of [
            "/**/foo", "foo/**/", "a/**/b", "fn(a/**/b)",
            String.raw`\66 oo`, "[x]", "{x}", "(x)",
        ] as const) {
            expect(live.parseCssValue(source).ok, source).toBe(false);
            expect(parseCssValue(source).ok, source).toBe(true);
            expect(parseCssValues(source).ok, source).toBe(true);
        }
    });

    it("accepts CSS exponent percentages through the shared number-token grammar", () => {
        expect(live.parseKeyframeSelector("1e2%").ok).toBe(false);
        expect(parseKeyframeSelector("1e2%")).toMatchObject({
            ok: true,
            value: { kind: "percent", value: 1 },
        });
        expect(parseKeyframeSelector("entry 1e-2%")).toMatchObject({
            ok: true,
            value: { kind: "named", name: "entry", offset: 0.0001 },
        });
    });
    it.todo("E-3 RED — named-range unbounded semantics: entry 150%, exit -25%");
    it.todo("E-3 RED — malformed percent-unit divergence: 1%%, 1%px, 1a%b");
});
