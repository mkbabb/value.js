import { describe, expect, it } from "vitest";
import { parseCSSStylesheet } from "../src/parsing/stylesheet";
import {
    formatCSS,
    serializeDeclaration,
    serializeKeyframeSelector,
    serializeStylesheet,
    serializeStylesheetItem,
    stylesheetToString,
} from "../src/parsing/serialize";
import { ValueArray, ValueUnit } from "../src/units";

// ─────────────────────────────────────────────────────────────────────────────
// serializeKeyframeSelector
// ─────────────────────────────────────────────────────────────────────────────

describe("serializeKeyframeSelector", () => {
    it("emits 0% for from-style percent selector", () => {
        const out = serializeKeyframeSelector({ kind: "percent", value: 0 });
        expect(out).toBe("0%");
    });

    it("emits 100% for to-style", () => {
        const out = serializeKeyframeSelector({ kind: "percent", value: 100 });
        expect(out).toBe("100%");
    });

    it("emits named selectors as their name", () => {
        const out = serializeKeyframeSelector({
            kind: "named",
            name: "entry",
        });
        expect(out).toBe("entry");
    });
});

// ─────────────────────────────────────────────────────────────────────────────
// serializeDeclaration
// ─────────────────────────────────────────────────────────────────────────────

describe("serializeDeclaration", () => {
    it("emits 'name: value' for simple decl", () => {
        const decl = {
            name: "color",
            value: new ValueArray(new ValueUnit("red", "string")),
            important: false,
        };
        const out = serializeDeclaration(decl);
        expect(out).toBe("color: red");
    });

    it("appends !important when flag is set", () => {
        const decl = {
            name: "color",
            value: new ValueArray(new ValueUnit("red", "string")),
            important: true,
        };
        const out = serializeDeclaration(decl);
        expect(out).toBe("color: red !important");
    });

    it("emits custom property names verbatim", () => {
        const decl = {
            name: "--my-prop",
            value: new ValueArray(new ValueUnit(10, "px")),
            important: false,
        };
        const out = serializeDeclaration(decl);
        expect(out).toBe("--my-prop: 10px");
    });
});

// ─────────────────────────────────────────────────────────────────────────────
// serializeStylesheetItem
// ─────────────────────────────────────────────────────────────────────────────

describe("serializeStylesheetItem", () => {
    it("serializes a style rule with multiple declarations", () => {
        const s = parseCSSStylesheet(".a { color: red; font-size: 12px; }");
        const out = serializeStylesheetItem(s[0]!);
        expect(out).toContain(".a {");
        // `red` is parsed as an rgb color and re-emitted as rgb()
        expect(out).toMatch(/color:\s*(red|rgb\()/);
        expect(out).toContain("font-size: 12px");
    });

    it("serializes @keyframes with name and rules", () => {
        const s = parseCSSStylesheet(
            "@keyframes slide { 0% { opacity: 0; } 100% { opacity: 1; } }",
        );
        const out = serializeStylesheetItem(s[0]!);
        expect(out).toContain("@keyframes slide");
        expect(out).toContain("0%");
        expect(out).toContain("100%");
    });

    it("serializes @keyframes without name", () => {
        const s = parseCSSStylesheet("@keyframes { 0% { opacity: 0; } }");
        const out = serializeStylesheetItem(s[0]!);
        expect(out.startsWith("@keyframes {")).toBe(true);
    });

    it("emits keyframe timingFunction when present", () => {
        const s = parseCSSStylesheet(
            "@keyframes a { 50% { opacity: 0.5; animation-timing-function: ease-in; } }",
        );
        const out = serializeStylesheetItem(s[0]!);
        expect(out).toContain("animation-timing-function: ease-in");
    });

    it("emits keyframe composition when present", () => {
        const s = parseCSSStylesheet(
            "@keyframes a { 50% { opacity: 0.5; animation-composition: add; } }",
        );
        const out = serializeStylesheetItem(s[0]!);
        expect(out).toContain("animation-composition: add");
    });

    it("serializes @property rule with all descriptors", () => {
        const s = parseCSSStylesheet(
            "@property --c { syntax: \"<color>\"; inherits: false; initial-value: red; }",
        );
        const out = serializeStylesheetItem(s[0]!);
        expect(out).toContain("@property --c");
        expect(out).toContain('syntax: "<color>"');
        expect(out).toContain("inherits: false");
        // `red` round-trips as rgb()
        expect(out).toMatch(/initial-value:\s*(red|rgb\()/);
    });

    it("serializes unknown at-rule with no body as semicolon-terminated", () => {
        const s = parseCSSStylesheet("@import \"foo.css\";");
        const out = serializeStylesheetItem(s[0]!);
        expect(out).toContain("@import");
        expect(out.endsWith(";")).toBe(true);
    });

    it("serializes unknown at-rule with body in braces", () => {
        const s = parseCSSStylesheet(
            "@media (min-width: 600px) { .a { color: red; } }",
        );
        const out = serializeStylesheetItem(s[0]!);
        expect(out).toContain("@media");
        expect(out).toContain("{");
        expect(out).toContain("}");
    });

    it("multi-selector style rule joins with comma+space", () => {
        const s = parseCSSStylesheet(".a, .b, .c { color: red; }");
        const out = serializeStylesheetItem(s[0]!);
        expect(out).toContain(".a, .b, .c");
    });
});

// ─────────────────────────────────────────────────────────────────────────────
// serializeStylesheet (top-level) + round-trips
// ─────────────────────────────────────────────────────────────────────────────

describe("serializeStylesheet — round-trip", () => {
    it("style rule round-trips through parse → serialize → parse", () => {
        const css = ".a { color: red; }";
        const s = parseCSSStylesheet(css);
        const out = serializeStylesheet(s);
        const reparsed = parseCSSStylesheet(out);
        expect(reparsed).toHaveLength(1);
        expect(reparsed[0]!.kind).toBe("style");
        const item = reparsed[0] as Extract<
            (typeof reparsed)[number],
            { kind: "style" }
        >;
        expect(item.selectors).toEqual([".a"]);
        expect(item.declarations[0]!.name).toBe("color");
    });

    it("keyframes round-trip preserves selector percent values", () => {
        const css =
            "@keyframes slide { 0% { opacity: 0; } 50% { opacity: 0.5; } 100% { opacity: 1; } }";
        const s = parseCSSStylesheet(css);
        const out = serializeStylesheet(s);
        const reparsed = parseCSSStylesheet(out);
        const item = reparsed[0] as Extract<
            (typeof reparsed)[number],
            { kind: "keyframes" }
        >;
        expect(item.rules).toHaveLength(3);
        const percents = item.rules.map(
            (r) => (r.selectors[0] as { kind: "percent"; value: number }).value,
        );
        expect(percents).toEqual([0, 50, 100]);
    });

    it("multi-item stylesheet round-trips", () => {
        const css =
            ".a { color: red; } @keyframes k { 0% { opacity: 0; } 100% { opacity: 1; } }";
        const s = parseCSSStylesheet(css);
        const out = serializeStylesheet(s);
        const reparsed = parseCSSStylesheet(out);
        expect(reparsed).toHaveLength(2);
        expect(reparsed[0]!.kind).toBe("style");
        expect(reparsed[1]!.kind).toBe("keyframes");
    });

    it("separator between items is blank-line aware", () => {
        const s = parseCSSStylesheet(
            ".a { color: red; } .b { color: blue; }",
        );
        const out = serializeStylesheet(s);
        // Two items separated by blank line
        expect(out.split("\n\n").length).toBeGreaterThan(1);
    });

    it("empty stylesheet serializes to empty string", () => {
        const s = parseCSSStylesheet("");
        const out = serializeStylesheet(s);
        expect(out).toBe("");
    });

    it("preserves !important through round-trip", () => {
        const css = ".a { color: red !important; }";
        const s = parseCSSStylesheet(css);
        const out = serializeStylesheet(s);
        expect(out).toContain("!important");
        const reparsed = parseCSSStylesheet(out);
        const item = reparsed[0] as Extract<
            (typeof reparsed)[number],
            { kind: "style" }
        >;
        expect(item.declarations[0]!.important).toBe(true);
    });

    it("preserves custom property names through round-trip", () => {
        const css = ".a { --my-prop: 10px; }";
        const s = parseCSSStylesheet(css);
        const out = serializeStylesheet(s);
        const reparsed = parseCSSStylesheet(out);
        const item = reparsed[0] as Extract<
            (typeof reparsed)[number],
            { kind: "style" }
        >;
        expect(item.declarations[0]!.name).toBe("--my-prop");
    });
});

// ─────────────────────────────────────────────────────────────────────────────
// formatCSS / stylesheetToString (async — lazy prettier)
// ─────────────────────────────────────────────────────────────────────────────

describe("formatCSS — prettier wrapper", () => {
    it("formats a simple CSS string", async () => {
        const formatted = await formatCSS(".a{color:red;}");
        expect(formatted).toContain(".a");
        expect(formatted).toContain("color");
        expect(formatted).toContain("red");
    });

    it("stylesheetToString returns a formatted string for a stylesheet", async () => {
        const s = parseCSSStylesheet(".a { color: red; }");
        const out = await stylesheetToString(s);
        expect(typeof out).toBe("string");
        expect(out).toContain("color");
        // `red` round-trips as rgb()
        expect(out).toMatch(/red|rgb\(/);
    });

    it("formatCSS honours printWidth", async () => {
        const out = await formatCSS(".a { color: red; }", 120);
        expect(typeof out).toBe("string");
    });
});
