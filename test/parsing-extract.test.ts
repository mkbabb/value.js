import { describe, expect, it } from "vitest";
import {
    extractAnimationOptions,
    extractKeyframes,
    extractProperties,
    extractStyleRules,
} from "../src/parsing/extract";
import { parseCSSStylesheet } from "../src/parsing/stylesheet";

// ─────────────────────────────────────────────────────────────────────────────
// extractKeyframes
// ─────────────────────────────────────────────────────────────────────────────

describe("extractKeyframes", () => {
    it("returns an empty Map for a stylesheet with no keyframes", () => {
        const s = parseCSSStylesheet(".a { color: red; }");
        const result = extractKeyframes(s);
        expect(result.size).toBe(0);
    });

    it("indexes named @keyframes by name", () => {
        const s = parseCSSStylesheet(
            "@keyframes slide { from { opacity: 0; } to { opacity: 1; } }",
        );
        const result = extractKeyframes(s);
        expect(result.size).toBe(1);
        expect(result.get("slide")).toBeDefined();
        expect(result.get("slide")!).toHaveLength(2);
    });

    it("concatenates multiple @keyframes with same name", () => {
        const s = parseCSSStylesheet(
            "@keyframes a { 0% { opacity: 0; } } @keyframes a { 100% { opacity: 1; } }",
        );
        const result = extractKeyframes(s);
        expect(result.get("a")!).toHaveLength(2);
    });

    it("groups unnamed keyframes under empty string", () => {
        const s = parseCSSStylesheet("@keyframes { 0% { opacity: 0; } }");
        const result = extractKeyframes(s);
        expect(result.get("")).toBeDefined();
    });

    it("multiple distinct animations indexed separately", () => {
        const s = parseCSSStylesheet(
            "@keyframes a { 0% { opacity: 0; } } @keyframes b { 0% { opacity: 1; } }",
        );
        const result = extractKeyframes(s);
        expect(result.size).toBe(2);
        expect(result.has("a")).toBe(true);
        expect(result.has("b")).toBe(true);
    });

    it("ignores non-keyframe items", () => {
        const s = parseCSSStylesheet(
            ".a { color: red; } @keyframes x { 0% { opacity: 0; } }",
        );
        const result = extractKeyframes(s);
        expect(result.size).toBe(1);
        expect(result.has("x")).toBe(true);
    });
});

// ─────────────────────────────────────────────────────────────────────────────
// extractProperties
// ─────────────────────────────────────────────────────────────────────────────

describe("extractProperties", () => {
    it("returns empty Map when no @property rules", () => {
        const s = parseCSSStylesheet(".a { color: red; }");
        const result = extractProperties(s);
        expect(result.size).toBe(0);
    });

    it("indexes @property by name", () => {
        const s = parseCSSStylesheet(
            "@property --my-color { syntax: \"<color>\"; inherits: false; initial-value: red; }",
        );
        const result = extractProperties(s);
        expect(result.get("--my-color")).toBeDefined();
        expect(result.get("--my-color")!.syntax).toBe("<color>");
        expect(result.get("--my-color")!.inherits).toBe(false);
    });

    it("later registrations override earlier ones", () => {
        const s = parseCSSStylesheet(
            "@property --x { syntax: \"<length>\"; inherits: true; } @property --x { syntax: \"<color>\"; inherits: false; }",
        );
        const result = extractProperties(s);
        expect(result.size).toBe(1);
        expect(result.get("--x")!.syntax).toBe("<color>");
    });

    it("multiple distinct properties", () => {
        const s = parseCSSStylesheet(
            "@property --a { syntax: \"<length>\"; inherits: true; } @property --b { syntax: \"<color>\"; inherits: false; }",
        );
        const result = extractProperties(s);
        expect(result.size).toBe(2);
    });
});

// ─────────────────────────────────────────────────────────────────────────────
// extractStyleRules
// ─────────────────────────────────────────────────────────────────────────────

describe("extractStyleRules", () => {
    it("returns empty array when no qualified rules", () => {
        const s = parseCSSStylesheet("@keyframes x { 0% { opacity: 0; } }");
        const result = extractStyleRules(s);
        expect(result).toEqual([]);
    });

    it("returns selectors + declarations for each style rule", () => {
        const s = parseCSSStylesheet(".a { color: red; }");
        const result = extractStyleRules(s);
        expect(result).toHaveLength(1);
        expect(result[0]!.selectors).toEqual([".a"]);
        expect(result[0]!.declarations).toHaveLength(1);
    });

    it("returns multiple rules in document order", () => {
        const s = parseCSSStylesheet(
            ".a { color: red; } .b { color: blue; } .c { color: green; }",
        );
        const result = extractStyleRules(s);
        expect(result).toHaveLength(3);
        expect(result.map((r) => r.selectors[0])).toEqual([".a", ".b", ".c"]);
    });

    it("ignores @keyframes and @property", () => {
        const s = parseCSSStylesheet(
            "@keyframes k { 0% { opacity: 0; } } .a { color: red; } @property --x { syntax: \"<color>\"; }",
        );
        const result = extractStyleRules(s);
        expect(result).toHaveLength(1);
    });
});

// ─────────────────────────────────────────────────────────────────────────────
// extractAnimationOptions
// ─────────────────────────────────────────────────────────────────────────────

describe("extractAnimationOptions", () => {
    it("returns empty object when no animation declarations", () => {
        const s = parseCSSStylesheet(".a { color: red; }");
        const result = extractAnimationOptions(s);
        expect(result).toEqual({});
    });

    it("extracts animation-duration", () => {
        const s = parseCSSStylesheet(".a { animation-duration: 1s; }");
        const result = extractAnimationOptions(s);
        expect(result.duration).toBe(1000);
    });

    it("extracts animation-delay", () => {
        const s = parseCSSStylesheet(".a { animation-delay: 500ms; }");
        const result = extractAnimationOptions(s);
        expect(result.delay).toBe(500);
    });

    it("extracts animation-iteration-count (numeric)", () => {
        const s = parseCSSStylesheet(".a { animation-iteration-count: 3; }");
        const result = extractAnimationOptions(s);
        expect(result.iterationCount).toBe(3);
    });

    it("extracts animation-iteration-count: infinite", () => {
        const s = parseCSSStylesheet(
            ".a { animation-iteration-count: infinite; }",
        );
        const result = extractAnimationOptions(s);
        expect(result.iterationCount).toBe(Infinity);
    });

    it("extracts animation-direction", () => {
        const s = parseCSSStylesheet(".a { animation-direction: alternate; }");
        const result = extractAnimationOptions(s);
        expect(result.direction).toBe("alternate");
    });

    it("extracts animation-fill-mode", () => {
        const s = parseCSSStylesheet(".a { animation-fill-mode: forwards; }");
        const result = extractAnimationOptions(s);
        expect(result.fillMode).toBe("forwards");
    });

    it("extracts animation-timing-function", () => {
        const s = parseCSSStylesheet(
            ".a { animation-timing-function: ease-in; }",
        );
        const result = extractAnimationOptions(s);
        expect(result.timingFunction).toBe("ease-in");
    });

    it("extracts animation-composition", () => {
        const s = parseCSSStylesheet(".a { animation-composition: add; }");
        const result = extractAnimationOptions(s);
        expect(result.composition).toBe("add");
    });

    it("extracts shorthand animation: 1s ease slide", () => {
        const s = parseCSSStylesheet(".a { animation: slide 1s ease; }");
        const result = extractAnimationOptions(s);
        expect(result.name).toBe("slide");
        expect(result.duration).toBe(1000);
        expect(result.timingFunction).toBe("ease");
    });

    it("animation-name carries through", () => {
        const s = parseCSSStylesheet(".a { animation-name: slide; }");
        const result = extractAnimationOptions(s);
        expect(result.name).toBe("slide");
    });

    it("later declarations override earlier (cascade order)", () => {
        const s = parseCSSStylesheet(
            ".a { animation-duration: 1s; animation-duration: 2s; }",
        );
        const result = extractAnimationOptions(s);
        expect(result.duration).toBe(2000);
    });

    it("merges across multiple style rules", () => {
        const s = parseCSSStylesheet(
            ".a { animation-duration: 1s; } .b { animation-delay: 200ms; }",
        );
        const result = extractAnimationOptions(s);
        expect(result.duration).toBe(1000);
        expect(result.delay).toBe(200);
    });

    it("invalid direction value is ignored", () => {
        const s = parseCSSStylesheet(".a { animation-direction: bogus; }");
        const result = extractAnimationOptions(s);
        expect(result.direction).toBeUndefined();
    });
});

// ─────────────────────────────────────────────────────────────────────────────
// W1-3 (lib-parsing F-2) — depth-walk: nested at-rules must not silently return
// empty. Before the fix, both extractStyleRules and extractAnimationOptions were
// flat top-level scans; a rule nested in @media/@layer/@container/@supports or a
// CSS-Nesting parent returned `[]` / `{}` with zero signal.
// ─────────────────────────────────────────────────────────────────────────────

describe("extractStyleRules — nested at-rule depth-walk (W1-3)", () => {
    it("finds a rule nested inside @media", () => {
        const s = parseCSSStylesheet(
            "@media (min-width: 600px) { .foo { color: red; } }",
        );
        const result = extractStyleRules(s);
        expect(result).toHaveLength(1);
        expect(result[0]!.selectors).toEqual([".foo"]);
        expect(result[0]!.declarations).toHaveLength(1);
    });

    it("finds a rule nested inside @layer", () => {
        const s = parseCSSStylesheet(
            "@layer base { .a { color: red; } .b { color: blue; } }",
        );
        const result = extractStyleRules(s);
        expect(result.map((r) => r.selectors[0])).toEqual([".a", ".b"]);
    });

    it("finds CSS-Nesting child rules alongside the parent", () => {
        const s = parseCSSStylesheet(
            ".card { color: red; .title { color: blue; } }",
        );
        const result = extractStyleRules(s);
        const selectors = result.map((r) => r.selectors[0]);
        expect(selectors).toContain(".card");
        expect(selectors).toContain(".title");
    });

    it("collects top-level AND nested rules in document order", () => {
        const s = parseCSSStylesheet(
            ".a { color: red; } @media screen { .b { color: blue; } } .c { color: green; }",
        );
        const result = extractStyleRules(s);
        expect(result.map((r) => r.selectors[0])).toEqual([".a", ".b", ".c"]);
    });
});

describe("extractAnimationOptions — nested at-rule depth-walk (W1-3)", () => {
    it("finds animation longhands nested inside @media", () => {
        const s = parseCSSStylesheet(
            "@media (min-width: 600px) { .foo { animation-duration: 1s; animation-name: spin; } }",
        );
        const result = extractAnimationOptions(s);
        expect(result.duration).toBe(1000);
        expect(result.name).toBe("spin");
    });

    it("finds the animation shorthand nested inside @media (the F-2 repro)", () => {
        const s = parseCSSStylesheet(
            "@media (min-width: 600px) { .foo { animation: spin 1s linear infinite; } }",
        );
        const result = extractAnimationOptions(s);
        expect(result.name).toBe("spin");
        expect(result.duration).toBe(1000);
        expect(result.timingFunction).toBe("linear");
        expect(result.iterationCount).toBe(Infinity);
    });

    it("finds animation longhands on a CSS-Nesting child rule", () => {
        const s = parseCSSStylesheet(
            ".card { color: red; &:hover { animation-duration: 250ms; } }",
        );
        const result = extractAnimationOptions(s);
        expect(result.duration).toBe(250);
    });
});
