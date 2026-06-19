import { describe, expect, it } from "vitest";
import { parseCSSStylesheet } from "../src/parsing/stylesheet";

describe("parseCSSStylesheet — qualified rules", () => {
    it("parses a simple style rule", () => {
        const s = parseCSSStylesheet(".foo { color: red; }");
        expect(s).toHaveLength(1);
        expect(s[0]!.kind).toBe("style");
        const item = s[0] as Extract<(typeof s)[number], { kind: "style" }>;
        expect(item.selectors).toEqual([".foo"]);
        expect(item.declarations).toHaveLength(1);
        expect(item.declarations[0]!.name).toBe("color");
    });

    it("parses multiple selectors split on commas", () => {
        const s = parseCSSStylesheet(".a, .b, .c { color: red; }");
        const item = s[0] as Extract<(typeof s)[number], { kind: "style" }>;
        expect(item.selectors).toEqual([".a", ".b", ".c"]);
    });

    it("parses multiple declarations", () => {
        const s = parseCSSStylesheet(
            ".x { color: red; background: blue; font-size: 12px; }",
        );
        const item = s[0] as Extract<(typeof s)[number], { kind: "style" }>;
        expect(item.declarations).toHaveLength(3);
        expect(item.declarations.map((d) => d.name)).toEqual([
            "color",
            "background",
            "font-size",
        ]);
    });

    it("recognises !important", () => {
        const s = parseCSSStylesheet(".x { color: red !important; }");
        const item = s[0] as Extract<(typeof s)[number], { kind: "style" }>;
        expect(item.declarations[0]!.important).toBe(true);
    });

    it("preserves custom property names", () => {
        const s = parseCSSStylesheet(".x { --my-prop: 10px; }");
        const item = s[0] as Extract<(typeof s)[number], { kind: "style" }>;
        expect(item.declarations[0]!.name).toBe("--my-prop");
    });

    it("respects commas inside parens in selectors (split list)", () => {
        const s = parseCSSStylesheet(":is(.a, .b), .c { color: red; }");
        const item = s[0] as Extract<(typeof s)[number], { kind: "style" }>;
        expect(item.selectors).toEqual([":is(.a, .b)", ".c"]);
    });
});

describe("parseCSSStylesheet — @keyframes", () => {
    it("parses named keyframes with from/to selectors", () => {
        const s = parseCSSStylesheet(
            "@keyframes slide { from { opacity: 0; } to { opacity: 1; } }",
        );
        expect(s).toHaveLength(1);
        const item = s[0] as Extract<(typeof s)[number], { kind: "keyframes" }>;
        expect(item.kind).toBe("keyframes");
        expect(item.name).toBe("slide");
        expect(item.rules).toHaveLength(2);
        expect(item.rules[0]!.selectors[0]).toEqual({
            kind: "percent",
            value: 0,
        });
        expect(item.rules[1]!.selectors[0]).toEqual({
            kind: "percent",
            value: 100,
        });
    });

    it("parses percent selectors", () => {
        const s = parseCSSStylesheet(
            "@keyframes a { 0% { opacity: 0; } 50% { opacity: .5; } 100% { opacity: 1; } }",
        );
        const item = s[0] as Extract<(typeof s)[number], { kind: "keyframes" }>;
        expect(item.rules).toHaveLength(3);
        const percents = item.rules.map(
            (r) => (r.selectors[0] as { kind: "percent"; value: number }).value,
        );
        expect(percents).toEqual([0, 50, 100]);
    });

    it("parses keyframes with comma-separated selector list", () => {
        const s = parseCSSStylesheet(
            "@keyframes a { 0%, 100% { opacity: 1; } }",
        );
        const item = s[0] as Extract<(typeof s)[number], { kind: "keyframes" }>;
        expect(item.rules[0]!.selectors).toHaveLength(2);
    });

    it("hoists animation-timing-function into rule metadata", () => {
        const s = parseCSSStylesheet(
            "@keyframes a { 50% { opacity: 0.5; animation-timing-function: ease-in; } }",
        );
        const item = s[0] as Extract<(typeof s)[number], { kind: "keyframes" }>;
        expect(item.rules[0]!.timingFunction).toBe("ease-in");
        // and removed from the declaration list
        expect(item.rules[0]!.declarations).toHaveLength(1);
    });

    it("hoists animation-composition into rule metadata", () => {
        const s = parseCSSStylesheet(
            "@keyframes a { 50% { opacity: 0.5; animation-composition: add; } }",
        );
        const item = s[0] as Extract<(typeof s)[number], { kind: "keyframes" }>;
        expect(item.rules[0]!.composition).toBe("add");
    });

    it("supports unnamed keyframes (no name token)", () => {
        const s = parseCSSStylesheet("@keyframes { 0% { opacity: 0; } }");
        const item = s[0] as Extract<(typeof s)[number], { kind: "keyframes" }>;
        expect(item.kind).toBe("keyframes");
        expect(item.name).toBeUndefined();
    });
});

describe("parseCSSStylesheet — @property", () => {
    it("parses an @property rule", () => {
        const s = parseCSSStylesheet(
            "@property --my-color { syntax: \"<color>\"; inherits: false; initial-value: red; }",
        );
        expect(s).toHaveLength(1);
        const item = s[0] as Extract<(typeof s)[number], { kind: "property" }>;
        expect(item.kind).toBe("property");
        expect(item.name).toBe("--my-color");
        expect(item.descriptor.syntax).toBe("<color>");
        expect(item.descriptor.inherits).toBe(false);
        expect(item.descriptor.initialValue).toBeDefined();
    });

    it("strips quotes from syntax descriptor", () => {
        const s = parseCSSStylesheet(
            "@property --a { syntax: \"<length>\"; inherits: true; }",
        );
        const item = s[0] as Extract<(typeof s)[number], { kind: "property" }>;
        expect(item.descriptor.syntax).toBe("<length>");
    });

    // Wave F4 — CLOSED by verification. value.js stores the raw quote-stripped
    // syntax string, NOT a re-serialized AST, so complex syntax (multipliers,
    // unions, the universal token) survives byte-exact. This is the lossless
    // round-trip kf relies on when feeding descriptor.syntax to
    // CSS.registerProperty(). (vj-units-compute-aug §5; handoff §2.)
    it("preserves complex syntax strings byte-exact (multipliers / unions / *)", () => {
        // Valid CSS @property syntax forms: the universal "*", typed tokens
        // with the `+` (space-list) / `#` (comma-list) multipliers, and `|`
        // unions of types and custom idents. (Note: `{n,m}` quantifiers are
        // value-definition syntax, NOT part of the @property descriptor grammar.)
        for (const syntax of [
            "<color>+",
            "<length> | <percentage>",
            "<length>+ | <percentage>#",
            "<image>#",
            "*",
            "small | medium | large",
        ]) {
            const s = parseCSSStylesheet(
                `@property --x { syntax: "${syntax}"; inherits: false; }`,
            );
            const item = s[0] as Extract<(typeof s)[number], { kind: "property" }>;
            expect(item.descriptor.syntax).toBe(syntax);
        }
    });
});

describe("parseCSSStylesheet — unknown at-rules", () => {
    it("captures @import as unknown with no body", () => {
        const s = parseCSSStylesheet("@import \"foo.css\";");
        expect(s).toHaveLength(1);
        const item = s[0] as Extract<(typeof s)[number], { kind: "unknown" }>;
        expect(item.kind).toBe("unknown");
        expect(item.atName).toBe("import");
        expect(item.body).toBeNull();
    });

    it("captures @media as unknown with recursively-parsed children (O.W4 S8)", () => {
        const s = parseCSSStylesheet(
            "@media (min-width: 600px) { .a { color: red; } }",
        );
        const item = s[0] as Extract<(typeof s)[number], { kind: "unknown" }>;
        expect(item.kind).toBe("unknown");
        expect(item.atName).toBe("media");
        // O.W4 S8: block at-rule bodies are no longer opaque strings — they parse
        // recursively into typed `children`. `body` is null for the block form;
        // the nested `.a` style rule is a typed child.
        expect(item.body).toBeNull();
        expect(item.children).toBeDefined();
        expect(item.children).toHaveLength(1);
        const child = item.children![0]!;
        expect(child.kind).toBe("style");
        if (child.kind === "style") {
            expect(child.selectors).toEqual([".a"]);
        }
    });

    it("captures @layer", () => {
        const s = parseCSSStylesheet("@layer base, components;");
        const item = s[0] as Extract<(typeof s)[number], { kind: "unknown" }>;
        expect(item.atName).toBe("layer");
        expect(item.body).toBeNull();
    });
});

describe("parseCSSStylesheet — comments + whitespace", () => {
    it("strips block comments before parsing", () => {
        const s = parseCSSStylesheet(
            "/* hello */ .a { /* inside */ color: red; }",
        );
        const item = s[0] as Extract<(typeof s)[number], { kind: "style" }>;
        expect(item.selectors).toEqual([".a"]);
        expect(item.declarations[0]!.name).toBe("color");
    });

    it("handles whitespace-heavy input", () => {
        const s = parseCSSStylesheet(
            "\n\n.a {\n  color:  red ;\n  background:   blue ;\n}\n\n",
        );
        const item = s[0] as Extract<(typeof s)[number], { kind: "style" }>;
        expect(item.declarations).toHaveLength(2);
    });
});

describe("parseCSSStylesheet — composition", () => {
    it("parses a mixed stylesheet (style + @keyframes)", () => {
        const s = parseCSSStylesheet(
            ".a { color: red; } @keyframes s { 0% { opacity: 0; } }",
        );
        expect(s).toHaveLength(2);
        expect(s[0]!.kind).toBe("style");
        expect(s[1]!.kind).toBe("keyframes");
    });

    it("parses empty stylesheet", () => {
        const s = parseCSSStylesheet("");
        expect(s).toEqual([]);
    });

    it("parses stylesheet of only whitespace", () => {
        const s = parseCSSStylesheet("   \n\t\n  ");
        expect(s).toEqual([]);
    });
});
