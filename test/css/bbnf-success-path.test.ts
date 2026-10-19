// SERVED MODEL: claude-opus-5-5
//
// X.P.W7 `.l4` (W7.md ADDENDUM 2026-09-25 (f); COHESION §0dt) — the success-path discipline, pinned.
// The cures build each accepted node once, in the shape it is published in:
//   · a value level (comma, slash, space) that holds one item IS that item, and a real list is built in
//     one array, in one pass — the first refused item, in order, still refuses the value;
//   · the `numeric` leaf hands its number and unit to the action as its two groups (no re-split);
//   · the rule list and the top-level lists discard their separators and gaps in the grammar
//     (`sep >> item`, `ruleGap >> …`), so the blocks and items arrive as one list, and a block body is
//     read as text once;
//   · a style rule is built once, frozen as built: `children` only when the body nests rules.

import { describe, expect, it } from "vitest";

import { parseCssValue, parseStylesheet } from "../../src/css/index";
import { splitTopLevel } from "../../src/css/bbnf/index";
import { ruleList } from "../../src/css/bbnf/sheet";

const deeplyFrozen = (value: unknown): boolean =>
    value === null || typeof value !== "object" || (Object.isFrozen(value) && Object.values(value).every(deeplyFrozen));

describe("a value level builds its node once", () => {
    it("answers a one-item level as the item itself", () => {
        const one = parseCssValue("12px");
        expect(one.ok && one.value).toEqual({ kind: "scalar", payload: { type: "number", value: 12, unit: "px" } });
    });

    it("builds a real list in order, frozen as built", () => {
        const parsed = parseCssValue("1px solid red, 2px / 3px");
        expect(parsed.ok).toBe(true);
        if (!parsed.ok) return;
        expect(parsed.value.kind).toBe("list");
        const list = parsed.value as Extract<typeof parsed.value, { kind: "list" }>;
        expect(list.separator).toBe("comma");
        expect(list.items.map((item) => item.kind)).toEqual(["list", "list"]);
        expect(deeplyFrozen(parsed)).toBe(true);
    });

    it("refuses with the first refused item, in order", () => {
        const refused = parseCssValue("a, 1px @ 2px, # b");
        expect(refused.ok).toBe(false);
        if (refused.ok) return;
        expect(refused.diagnostics[0]).toMatchObject({ start: 7, end: 8 });
    });
});

describe("the numeric leaf's groups are the number and the unit", () => {
    it.each([
        ["1.5e3px", 1500, "px"],
        ["-.5%", -0.5, "%"],
        ["+2", 2, ""],
        ["10E-1Q", 1, "Q"],
    ])("%s", (source, value, unit) => {
        const parsed = parseCssValue(source);
        expect(parsed.ok && parsed.value).toEqual({ kind: "scalar", payload: { type: "number", value, unit } });
    });
});

describe("the rule list and the top-level lists discard separators in the grammar", () => {
    it("answers the blocks across gaps, stray semicolons and comments, a body read once as text", () => {
        expect(ruleList(" /* x */ a { b { c } } ; ;\n d; ")).toEqual({
            blocks: [{ prelude: "a", body: " b { c } " }, { prelude: "d", body: null }],
            fault: undefined,
        });
        expect(ruleList("a{} b{").fault).toEqual({ expected: "closing brace", start: 5 });
    });

    it("answers the items without their separators", () => {
        expect(splitTopLevel("a;b ; ;c", ";")).toEqual(["a", "b", "c"]);
        expect(splitTopLevel("a,b", ",")).toEqual(["a", "b"]);
        expect(splitTopLevel("   ", "space")).toEqual([]);
    });
});

describe("a style rule is built once, in its published shape", () => {
    it("carries no children key when the body holds only declarations", () => {
        const sheet = parseStylesheet("a, b { color: red; margin: 0 }");
        expect(sheet.ok).toBe(true);
        if (!sheet.ok) return;
        expect(Object.keys(sheet.value[0]!).sort()).toEqual(["declarations", "kind", "selectors"]);
        expect(deeplyFrozen(sheet)).toBe(true);
    });

    it("carries its nested rules as children", () => {
        const sheet = parseStylesheet("a { color: red; b { margin: 0 } }");
        expect(sheet.ok).toBe(true);
        if (!sheet.ok) return;
        const rule = sheet.value[0] as Extract<(typeof sheet.value)[number], { kind: "style" }>;
        expect(rule.declarations.map((d) => d.name)).toEqual(["color"]);
        expect(rule.children?.map((c) => c.kind)).toEqual(["style"]);
        expect(deeplyFrozen(sheet)).toBe(true);
    });
});
