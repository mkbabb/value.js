import { describe, expect, it } from "vitest";
import {
    collectAnimationOptions,
    collectStyleRules,
    collectTimelineOptions,
    parseAnimationTimeline,
    collectCustomFunctions,
    parseCssValue,
    parseStylesheet,
    serializeTimelineOptions,
} from "../src/subpaths/css";
import { serializeCssValue } from "../src/css/stylesheet";

function declarations(source: string) {
    const parsed = parseStylesheet(`.sample { ${source} }`);
    if (!parsed.ok) throw new Error(`Invalid fixture: ${source}`);
    return collectStyleRules(parsed.value)[0]!.rule.declarations;
}

const animationOptions = (source: string) => collectAnimationOptions(declarations(source));

const valueCases = [
    "if(supports(color: red): red; else: blue)",
    "if(supports(color: lch(0 0 0)): red; else: blue)",
    "sibling-index()",
    "calc(1px + 2px)",
    "calc(sibling-index() * 10px)",
    "--double(50px)",
    "--constant()",
] as const;

describe("Value 4 emerging CSS value grammar", () => {
    it.each(valueCases)("parses and canonically round-trips %s", (source) => {
        const parsed = parseCssValue(source);
        expect(parsed.ok).toBe(true);
        if (!parsed.ok) return;
        const serialized = serializeCssValue(parsed.value);
        const reparsed = parseCssValue(serialized);
        expect(reparsed).toEqual(parsed);
    });

    it("keeps calc arithmetic as one whitespace expression, not comma arguments", () => {
        const parsed = parseCssValue("calc(1px + 2px)");
        if (!parsed.ok) throw new Error("calc fixture");
        expect(serializeCssValue(parsed.value)).toBe("calc(1px + 2px)");
    });

    it("captures @function name, typed/defaulted parameters, result, and declarations", () => {
        const source = "@function --f(--x <length>: 0px) { result: calc(var(--x) + 10px); }";
        const parsed = parseStylesheet(source);
        expect(parsed.ok).toBe(true);
        if (!parsed.ok) return;
        const row = collectCustomFunctions(parsed.value)[0]?.rule;
        expect(row?.name).toBe("--f");
        expect(row?.descriptor.parameters).toEqual([{
            name: "--x",
            syntax: "<length>",
            default: {
                kind: "scalar",
                payload: { type: "number", value: 0, unit: "px" },
            },
        }]);
        const result = row?.descriptor.result;
        expect(result && serializeCssValue(result)).toBe("calc(var(--x) + 10px)");
        expect(result && parseCssValue(serializeCssValue(result))).toEqual({
            ok: true,
            value: result,
            diagnostics: [],
        });
        expect(row?.descriptor.declarations?.map((declaration) => declaration.name))
            .toEqual(["result"]);
    });

    it("rejects malformed expressions, zero-arg arithmetic, and invalid function definitions", () => {
        for (const [source, expected, actual] of [
            ["calc()", "function argument", "calc()"],
            ["if()", "function argument", "if()"],
            ["supports()", "function argument", "supports()"],
            ["sibling-index(1)", "zero-argument function", "sibling-index(1)"],
            ["calc(1px @ 2px)", "scalar", "@"],
        ] as const) {
            const parsed = parseCssValue(source);
            expect(parsed.ok, source).toBe(false);
            if (parsed.ok) continue;
            expect(parsed.diagnostics).toHaveLength(1);
            expect(parsed.diagnostics[0]).toMatchObject({
                code: "css_syntax",
                expected: [expected],
                actual,
            });
            expect(Object.isFrozen(parsed.diagnostics)).toBe(true);
            expect(Object.isFrozen(parsed.diagnostics[0])).toBe(true);
        }
        expect(parseStylesheet("@function f(--x) { result: var(--x); }").ok).toBe(false);
        expect(parseStylesheet("@function --f(--x <length>: ) { result: var(--x); }").ok).toBe(false);
    });

    it("admits zero-argument timelines through the shared value and declaration grammar", () => {
        for (const source of ["scroll()", "view()"] as const) {
            expect(parseAnimationTimeline(source).ok, source).toBe(true);
            const value = parseCssValue(source);
            expect(value.ok, source).toBe(true);
            if (value.ok) expect(serializeCssValue(value.value)).toBe(source);
        }

        const parsed = parseStylesheet(".sample { animation-timeline: view(); }");
        expect(parsed.ok).toBe(true);
        if (!parsed.ok) return;
        const options = collectTimelineOptions(collectStyleRules(parsed.value)[0]!.rule.declarations);
        const serialized = serializeTimelineOptions(options)["animation-timeline"];
        expect(serialized).toBe("view()");
        expect(parseStylesheet(`.sample { animation-timeline: ${serialized}; }`)).toEqual(parsed);
    });

    it("elides leading and inter-rule comments without changing canonical stylesheet content", () => {
        const commented = parseStylesheet(`
            /* leading { ; } */
            .one { opacity: 0; }
            /* between \"quoted }\" rules */
            .two { animation-timeline: view(); }
        `);
        const canonical = parseStylesheet(`
            .one { opacity: 0; }
            .two { animation-timeline: view(); }
        `);
        expect(commented).toEqual(canonical);
        expect(commented.ok).toBe(true);
    });

    it("returns named diagnostics for malformed comment and timeline input", () => {
        const comment = "/* never closed";
        expect(parseStylesheet(comment)).toEqual({
            ok: false,
            diagnostics: [{
                code: "css_syntax",
                start: 0,
                end: comment.length,
                expected: ["closing comment"],
                actual: comment,
            }],
        });

        const timeline = parseStylesheet(".sample { animation-timeline: view(diagonal); }");
        expect(timeline).toMatchObject({
            ok: false,
            diagnostics: [{
                code: "timeline_option_invalid",
                expected: ["view timeline"],
                actual: "view(diagonal)",
            }],
        });
    });

    it("expands the structural animation shorthand into one frozen effective row", () => {
        const options = animationOptions("animation: 2s ease-in-out infinite alternate;");
        expect(options).toEqual([{
            name: "none",
            duration: 2,
            delay: 0,
            iterationCount: Infinity,
            direction: "alternate",
            fillMode: "none",
            timingFunction: { kind: "keyword", name: "ease-in-out" },
            composition: "replace",
        }]);
        expect(Object.isFrozen(options)).toBe(true);
        expect(Object.isFrozen(options[0])).toBe(true);
        expect(Object.isFrozen(options[0]!.timingFunction)).toBe(true);
    });

    it.each([
        ["animation: 1s fade; animation-duration: 3s;", 3],
        ["animation-duration: 3s; animation: 1s fade;", 1],
        ["animation: 1s fade !important; animation-duration: 3s;", 1],
        ["animation: 1s fade; animation-duration: 3s !important;", 3],
        ["animation: 1s old; animation: 2s current;", 2],
    ] as const)("cascades shorthand fields independently for %s", (source, duration) => {
        expect(animationOptions(source)[0]).toMatchObject({ duration });
    });

    it("repeats and truncates comma components against the effective name list", () => {
        const options = animationOptions(`
            animation: 1s ease fade, 2s linear spin, 3s steps(2) bounce;
            animation-delay: 100ms, 200ms;
            animation-direction: reverse;
            animation-composition: add, accumulate, replace, add;
        `);
        expect(options.map(({ name, duration, delay, direction, composition }) => ({
            name, duration, delay, direction, composition,
        }))).toEqual([
            { name: "fade", duration: 1, delay: 0.1, direction: "reverse", composition: "add" },
            { name: "spin", duration: 2, delay: 0.2, direction: "reverse", composition: "accumulate" },
            { name: "bounce", duration: 3, delay: 0.1, direction: "reverse", composition: "replace" },
        ]);

        expect(animationOptions("animation-name: fade, spin; animation-duration: 1s;")).toEqual([
            { name: "fade", duration: 1 },
            { name: "spin", duration: 1 },
        ]);
    });

    it("shares shorthand timeline resets with the timeline collector", () => {
        const timeline = (source: string) => collectTimelineOptions(declarations(source)).timeline;
        expect(timeline("animation-timeline: view(); animation: 1s fade;")).toEqual({ kind: "auto" });
        expect(timeline("animation: 1s fade; animation-timeline: view();")).toEqual({ kind: "view" });
        expect(timeline("animation-timeline: view() !important; animation: 1s fade;")).toEqual({ kind: "view" });
        expect(timeline("animation: 1s fade !important; animation-timeline: view();")).toEqual({ kind: "auto" });
    });

    it("rejects malformed shorthand/list arms while retaining the authored value span", () => {
        for (const source of [
            "animation: -1s fade;",
            "animation: ease steps(2) fade;",
            "animation: 1s 2s 3s fade;",
            "animation-timing-function: ease, unknown;",
            "animation-duration: 1s, -2s;",
        ]) {
            const parsed = parseStylesheet(`.sample { ${source} }`);
            expect(parsed.ok, source).toBe(false);
            if (!parsed.ok) expect(parsed.diagnostics[0].code).toBe("animation_option_invalid");
        }

        for (const source of ["animation: 1s,,2s;", "animation-name: fade,;"]) {
            const parsed = parseStylesheet(`.sample { ${source} }`);
            expect(parsed.ok, source).toBe(false);
            if (parsed.ok) continue;
            expect(parsed.diagnostics[0]).toMatchObject({
                code: "animation_option_invalid",
                actual: ",",
                expected: ["nonempty animation list item"],
            });
            expect(parsed.diagnostics[0].end - parsed.diagnostics[0].start).toBe(1);
        }
    });
});
