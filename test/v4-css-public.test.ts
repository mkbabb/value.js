import { describe, expect, it } from "vitest";
import {
    coerceToSyntax,
    collectCustomFunctions,
    collectKeyframes,
    collectPropertyDescriptors,
    collectStyleRules,
    parseAnimationRange,
    parseAnimationTimeline,
    parseCssColor,
    parseCssScalar,
    parseCssValue,
    parseCssValues,
    parseStylesheet,
    serializeCssColor,
} from "../src/subpaths/css";

describe("Value 4 public CSS capability", () => {
    it("parses each structural value arm without truncating trailing input", () => {
        expect(parseCssScalar("12.5rem")).toMatchObject({
            ok: true,
            value: {
                kind: "scalar",
                payload: { type: "number", value: 12.5, unit: "rem" },
            },
        });
        expect(parseCssScalar("currentColor")).toMatchObject({
            ok: true,
            value: {
                kind: "scalar",
                payload: { type: "keyword", value: "currentColor" },
            },
        });
        expect(parseCssValue("translate(10px, calc(20px + 2%))")).toMatchObject({
            ok: true,
            value: { kind: "call", name: "translate" },
        });
        expect(parseCssValue("10px / 20%")).toMatchObject({
            ok: true,
            value: { kind: "list", separator: "slash" },
        });
        expect(parseCssValues("red, blue")).toMatchObject({
            ok: true,
            value: { kind: "list", separator: "comma" },
        });
        expect(parseCssValues("10px")).toMatchObject({
            ok: true,
            value: { kind: "list", separator: "space", items: [{ kind: "scalar" }] },
        });
        expect(parseCssValues("translate(10px) rotate(45deg)")).toMatchObject({
            ok: true,
            value: {
                kind: "list",
                separator: "space",
                items: [
                    { kind: "call", name: "translate" },
                    { kind: "call", name: "rotate" },
                ],
            },
        });
        expect(parseCssScalar("1px trailing")).toMatchObject({
            ok: false,
            diagnostics: [{ code: "css_syntax" }],
        });
    });

    it("round-trips every CSS-spellable color space", () => {
        for (const source of [
            "rgb(10 20 30 / 80%)",
            "hsl(20 30% 40%)",
            "hwb(20 10% 30%)",
            "lab(50% 10 20)",
            "lch(50% 20 30)",
            "oklab(50% 0.1 0.05)",
            "oklch(50% 0.1 30)",
            "color(xyz 0.1 0.2 0.3)",
            "color(srgb-linear 0.1 0.2 0.3)",
            "color(display-p3 0.1 0.2 0.3)",
            "color(a98-rgb 0.1 0.2 0.3)",
            "color(prophoto-rgb 0.1 0.2 0.3)",
            "color(rec2020 0.1 0.2 0.3)",
        ]) {
            const parsed = parseCssColor(source);
            expect(parsed.ok, source).toBe(true);
            if (!parsed.ok) continue;
            const serialized = serializeCssColor(parsed.value);
            expect(serialized.ok, source).toBe(true);
            if (serialized.ok) expect(parseCssColor(serialized.value).ok, source)
                .toBe(true);
        }
    });

    it("coerces through the declared syntax rather than accepting any parsed value", () => {
        expect(coerceToSyntax("12", "<number>").ok).toBe(true);
        expect(coerceToSyntax("12", "<integer>").ok).toBe(true);
        expect(coerceToSyntax("12.5", "<integer>")).toMatchObject({
            ok: false,
            diagnostics: [{ code: "syntax_mismatch" }],
        });
        expect(coerceToSyntax("12px", "<length>").ok).toBe(true);
        expect(coerceToSyntax("oklch(50% 0.1 30)", "<color>").ok).toBe(true);
        expect(coerceToSyntax("12px", "<number>")).toMatchObject({
            ok: false,
            diagnostics: [{ code: "syntax_mismatch" }],
        });
        expect(coerceToSyntax("12", "number")).toMatchObject({
            ok: false,
            diagnostics: [{ code: "syntax_descriptor_invalid" }],
        });
        expect(coerceToSyntax("red", "<banana>")).toMatchObject({
            ok: false,
            diagnostics: [{ code: "syntax_descriptor_invalid" }],
        });
    });

    it("parses timeline and range variants directly with named failures", () => {
        expect(parseAnimationTimeline("scroll(block root)")).toEqual({
            ok: true,
            value: { kind: "scroll", scroller: "root", axis: "block" },
            diagnostics: [],
        });
        expect(parseAnimationTimeline("view(inline 10% 20%)")).toEqual({
            ok: true,
            value: {
                kind: "view",
                axis: "inline",
                inset: { start: "10%", end: "20%" },
            },
            diagnostics: [],
        });
        expect(parseAnimationRange("entry 10% exit 90%")).toEqual({
            ok: true,
            value: {
                start: { phase: "entry", offset: "10%" },
                end: { phase: "exit", offset: "90%" },
            },
            diagnostics: [],
        });
        expect(parseAnimationTimeline("view(block inline)")).toMatchObject({
            ok: false,
            diagnostics: [{ code: "timeline_option_invalid" }],
        });
        expect(parseAnimationRange("entry 10% exit nope")).toMatchObject({
            ok: false,
            diagnostics: [{ code: "timeline_option_invalid" }],
        });
    });

    it("collects every public stylesheet rule family with exact nested paths", () => {
        const parsed = parseStylesheet(`
            @property --tone {
                syntax: "<color>";
                inherits: false;
                initial-value: oklch(60% 0.1 30);
            }
            @function --double(--x <number>: 1) {
                result: calc(var(--x) * 2);
            }
            @media (width > 30rem) {
                .sample { color: var(--tone); }
                @keyframes pulse {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            }
        `);
        expect(parsed.ok).toBe(true);
        if (!parsed.ok) return;

        expect(collectPropertyDescriptors(parsed.value)).toMatchObject([{
            path: [0],
            rule: {
                kind: "property",
                name: "--tone",
                descriptor: { syntax: "<color>", inherits: false },
            },
        }]);
        expect(collectCustomFunctions(parsed.value)).toMatchObject([{
            path: [1],
            rule: {
                kind: "function",
                name: "--double",
                descriptor: { parameters: [{ name: "--x", syntax: "<number>" }] },
            },
        }]);
        expect(collectStyleRules(parsed.value)).toMatchObject([{
            path: [2, 0],
            rule: { kind: "style", selectors: [".sample"] },
        }]);
        expect(collectKeyframes(parsed.value)).toMatchObject([{
            path: [2, 1],
            rule: { kind: "keyframes", name: "pulse" },
        }]);
    });

    it("fails the whole stylesheet on malformed public rule syntax", () => {
        expect(parseStylesheet("@property --tone { initial-value }")).toMatchObject({
            ok: false,
            diagnostics: [{ code: "css_syntax" }],
        });
        expect(parseStylesheet("@keyframes x { 150% { opacity: 1; } }")).toMatchObject({
            ok: false,
            diagnostics: [{ code: "keyframe_selector_invalid" }],
        });
        for (const source of [
            "@property tone { syntax: \"<color>\"; inherits: false; initial-value: red; }",
            "@property --tone { syntax: \"<color>\"; inherits: maybe; initial-value: red; }",
            "@property --tone { syntax: \"<color>\"; inherits: false; }",
            "@property --tone { syntax: \"<banana>\"; inherits: false; initial-value: red; }",
            "@property --tone { syntax: \"<number>\"; inherits: false; initial-value: red; }",
        ]) {
            expect(parseStylesheet(source).ok, source).toBe(false);
        }
    });
});
