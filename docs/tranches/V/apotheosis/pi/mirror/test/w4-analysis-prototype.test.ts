import { describe, expect, it } from "vitest";
import * as live from "../../../../../../../dist/subpaths/css.js";
import { parseCssValue } from "../grammar/value.js";
import { serializeCssValue } from "../serialize.js";
import {
    expandAnimationShorthand,
    optionDeclarationValid,
} from "../stylesheet/analyze.js";
import {
    collectAnimationOptions,
    collectCustomFunctions,
    collectDeclarations,
    collectKeyframes,
    collectPropertyDescriptors,
    collectStyleRules,
    collectTimelineOptions,
} from "../stylesheet/collect.js";
import { coerceToSyntax, isSupportedSyntaxDescriptor } from "../syntax.js";
import { parseAnimationRange } from "../timeline.js";
import type { CssValue, Declaration, Stylesheet } from "../types.js";

function value(source: string): CssValue {
    const parsed = parseCssValue(source);
    expect(parsed.ok, source).toBe(true);
    if (!parsed.ok) throw new Error(`fixture did not parse: ${source}`);
    return parsed.value;
}

function declaration(name: string, source: string, important = false): Declaration {
    return { name, value: value(source), important };
}

describe("W4 syntax transpose", () => {
    it("accepts supported alternatives and emits both syntax codes", () => {
        expect(isSupportedSyntaxDescriptor("<length> | <percentage>")).toBe(true);
        expect(isSupportedSyntaxDescriptor("<bogus>")).toBe(false);
        expect(coerceToSyntax("12px", "<length>")).toMatchObject({ ok: true });
        expect(coerceToSyntax("12px", "<number>")).toMatchObject({
            ok: false,
            diagnostics: [{ code: "syntax_mismatch", expected: ["<number>"] }],
        });
        expect(coerceToSyntax("12px", "<bogus>")).toMatchObject({
            ok: false,
            diagnostics: [{ code: "syntax_descriptor_invalid", expected: ["syntax descriptor"] }],
        });
    });

    it("keeps the supported transform and custom-ident decisions", () => {
        expect(coerceToSyntax("translateX(1px) rotate(20deg)", "<transform-list>")).toMatchObject({ ok: true });
        expect(coerceToSyntax("inherit", "<custom-ident>")).toMatchObject({
            ok: false,
            diagnostics: [{ code: "syntax_mismatch" }],
        });
        expect(coerceToSyntax("thing", "<custom-ident>")).toMatchObject({ ok: true });
    });
});

describe("W4 collectors", () => {
    const sheet: Stylesheet = [{
        kind: "scope",
        children: [
            { kind: "style", selectors: [".x"], declarations: [] },
            { kind: "keyframes", name: "fade", rules: [] },
            { kind: "property", name: "--x", descriptor: {} },
            { kind: "function", name: "--f", descriptor: {} },
        ],
    }];

    it("preserves the nested path model across all typed collectors", () => {
        expect(collectStyleRules(sheet).map(({ path }) => path)).toEqual([[0, 0]]);
        expect(collectKeyframes(sheet).map(({ path }) => path)).toEqual([[0, 1]]);
        expect(collectPropertyDescriptors(sheet).map(({ path }) => path)).toEqual([[0, 2]]);
        expect(collectCustomFunctions(sheet).map(({ path }) => path)).toEqual([[0, 3]]);
    });

    it("applies the important cascade without freezing its output", () => {
        const first = declaration("animation-name", "first", true);
        const ignored = declaration("animation-name", "ignored");
        const selected = collectDeclarations([first, ignored]);
        expect(selected.get("animation-name")).toBe(first);
        expect(Object.isFrozen(selected)).toBe(false);
    });

    it("differentials the hand-built path and cascade fixtures against LIVE", () => {
        expect(collectStyleRules(sheet)).toEqual(live.collectStyleRules(sheet));
        expect(collectKeyframes(sheet)).toEqual(live.collectKeyframes(sheet));
        expect(collectPropertyDescriptors(sheet)).toEqual(live.collectPropertyDescriptors(sheet));
        expect(collectCustomFunctions(sheet)).toEqual(live.collectCustomFunctions(sheet));

        const declarations = [
            declaration("animation", "fade 1s ease-in 2 reverse both paused"),
            declaration("animation-duration", "2s", true),
            declaration("animation-duration", "9s"),
        ];
        expect([...collectDeclarations(declarations)]).toEqual([...live.collectDeclarations(declarations)]);
        expect(collectAnimationOptions(declarations)).toEqual(live.collectAnimationOptions(declarations));
    });
});

describe("W4 R2 hardening", () => {
    it("accepts var/env longhands and omits their unreadable collected fields", () => {
        const duration = declaration("animation-duration", "var(--duration)");
        const direction = declaration("animation-direction", "env(--direction)");
        expect(optionDeclarationValid(duration.name, duration.value)).toBe(true);
        expect(optionDeclarationValid(direction.name, direction.value)).toBe(true);
        expect(collectAnimationOptions([duration])).toEqual([{}]);
        expect(collectAnimationOptions([direction])).toEqual([{}]);
    });

    it("keeps non-substitution invalidity visible beside deferred items", () => {
        expect(optionDeclarationValid("animation-duration", value("-1s, var(--duration)"))).toBe(false);
        expect(optionDeclarationValid("animation-duration", value("-1s var(--duration)"))).toBe(false);
        expect(optionDeclarationValid("animation-direction", value("sideways, var(--direction)"))).toBe(false);
        expect(optionDeclarationValid("animation-direction", value("sideways var(--direction)"))).toBe(false);
    });

    it("slots math heads duration then delay then iteration, never attr", () => {
        const duration = expandAnimationShorthand(value("n calc(2s) 1"));
        expect(duration?.get("animation-duration")).toEqual(value("calc(2s)"));
        expect(duration?.get("animation-delay")).toEqual(value("0s"));
        expect(duration?.get("animation-iteration-count")).toEqual(value("1"));

        const delay = expandAnimationShorthand(value("1s calc(2s) 1"));
        expect(delay?.get("animation-duration")).toEqual(value("1s"));
        expect(delay?.get("animation-delay")).toEqual(value("calc(2s)"));
        expect(delay?.get("animation-iteration-count")).toEqual(value("1"));

        const iteration = expandAnimationShorthand(value("1s 2s calc(1)"));
        expect(iteration?.get("animation-duration")).toEqual(value("1s"));
        expect(iteration?.get("animation-delay")).toEqual(value("2s"));
        expect(iteration?.get("animation-iteration-count")).toEqual(value("calc(1)"));

        expect(optionDeclarationValid("animation", value("attr(data-duration)"))).toBe(false);
    });

    it("routes every hardened math head through the same first-open-slot rule", () => {
        const heads = [
            "calc", "min", "max", "clamp", "round", "mod", "rem", "sin", "cos",
            "tan", "asin", "acos", "atan", "atan2", "exp", "log", "pow", "sqrt",
            "hypot", "sign", "abs",
        ];
        for (const head of heads) {
            const authored = value(`name ${head}(2s) 1`);
            expect(optionDeclarationValid("animation", authored), head).toBe(true);
            expect(expandAnimationShorthand(authored)?.get("animation-duration"), head)
                .toEqual(value(`${head}(2s)`));
            expect(optionDeclarationValid("animation-duration", value(`${head}(2s)`)), head).toBe(true);
        }
    });

    it("accepts a deferred shorthand without manufacturing collected slots", () => {
        const shorthand = declaration("animation", "fade var(--duration) ease");
        expect(optionDeclarationValid(shorthand.name, shorthand.value)).toBe(true);
        expect(expandAnimationShorthand(shorthand.value)).toBeUndefined();
        expect(collectAnimationOptions([shorthand])).toEqual([{}]);
    });
});

describe("W4 serializer/timeline integration", () => {
    it("collects timeline values only through serialize/re-parse", () => {
        const declarations = [
            declaration("animation-timeline", "scroll(root block), --progress"),
            declaration("animation-range", "entry 10% exit 90%"),
            declaration("timeline-scope", "--one, --two"),
            declaration("animation-trigger", "once scroll(root) entry 20%"),
        ];
        const collected = collectTimelineOptions(declarations);
        expect(collected).toEqual({
            timeline: { kind: "scroll", scroller: "root", axis: "block" },
            timelines: [
                { kind: "scroll", scroller: "root", axis: "block" },
                { kind: "name", name: "--progress" },
            ],
            range: { start: { phase: "entry", offset: "10%" }, end: { phase: "exit", offset: "90%" } },
            timelineScope: { kind: "names", names: ["--one", "--two"] },
            trigger: {
                type: "once",
                timeline: { kind: "scroll", scroller: "root" },
                range: { start: { phase: "entry", offset: "20%" } },
            },
        });
        expect(collected).toEqual(live.collectTimelineOptions(declarations));
    });

    it("keeps animation-range parse/serialize/re-parse canonical", () => {
        for (const source of ["entry 10%", "entry 10% exit 90%", "cover 0% contain 100%"] as const) {
            const expected = parseAnimationRange(source);
            expect(expected.ok, source).toBe(true);
            const reparsed = parseAnimationRange(serializeCssValue(value(source)));
            expect(reparsed).toEqual(expected);
        }
    });

    it("keeps cosmetic colon/semicolon spacing and real W2 color serialization", () => {
        expect(serializeCssValue({
            kind: "list",
            separator: "space",
            items: [value("a"), value(":"), value("b"), value(";"), value("c")],
        })).toBe("a: b; c");
        expect(serializeCssValue(value("red"))).toBe("rgb(255 0 0)");
    });
});

describe("W4 coerce differential", () => {
    it("matches LIVE across every supported syntax family on stable witnesses", () => {
        const fixtures = [
            ["12deg", "<angle>"], ["red", "<color>"], ["thing", "<custom-ident>"],
            ["1fr", "<flex>"], ["2", "<integer>"], ["12px", "<length>"],
            ["10%", "<length-percentage>"], ["1.5", "<number>"], ["10%", "<percentage>"],
            ["2dppx", "<resolution>"], ["250ms", "<time>"],
            ["rotate(20deg)", "<transform-function>"],
            ["translateX(1px) rotate(20deg)", "<transform-list>"],
        ] as const;
        for (const [source, syntax] of fixtures) {
            expect(coerceToSyntax(source, syntax), `${source} as ${syntax}`)
                .toEqual(live.coerceToSyntax(source, syntax));
        }
    });
});
