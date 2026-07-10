import { describe, expect, it } from "vitest";
import { parseCSSStylesheet } from "@src/parsing/stylesheet";
import type { StylesheetItem } from "@src/parsing/stylesheet";
import { extractKeyframes } from "@src/parsing/extract";
import {
    serializeStylesheet,
    serializeStylesheetItem,
} from "@src/parsing/serialize";
import {
    extractNamedTimelines,
    parseAnimationTimelineList,
    serializeAnimationTimeline,
} from "@src/parsing/scroll-timeline";

// O.W4 GRAMMAR-G1 — the AT-RULE + NESTING grammar gate. Each clause runs the
// REAL parseCSSStylesheet / extractKeyframes / serialize* over a REAL CSS
// string and asserts the REAL typed output (no source-grep proxy).

const roundTrips = (css: string): void => {
    const first = parseCSSStylesheet(css);
    const serialized = serializeStylesheet(first);
    const second = parseCSSStylesheet(serialized);
    // parse(serialize(parse(s))) deep-equals parse(s).
    expect(second).toEqual(first);
};

describe("O.W4 S7 — @function typed (C10)", () => {
    // CSS Functions & Mixins L1 §3.1:
    //   <function-parameter> = <custom-property-name> <css-type>? [ : <default-value> ]?
    // The <css-type> follows the name by WHITESPACE; the default is introduced
    // by a single top-level colon.
    const css =
        "@function --double(--x <length>) { result: calc(var(--x) * 2); }";

    it("C10 — parses to kind:function with name + descriptor", () => {
        const s = parseCSSStylesheet(css);
        expect(s).toHaveLength(1);
        const item = s[0]!;
        expect(item.kind).toBe("function");
        if (item.kind !== "function") throw new Error("not a function");
        expect(item.name).toBe("--double");
        expect(item.descriptor.parameters).toEqual([
            { name: "--x", syntax: "<length>" },
        ]);
        // `result:` is hoisted into the descriptor (not a general declaration).
        expect(item.descriptor.result).toBeDefined();
        expect(item.descriptor.result!.toString()).toContain("calc");
        expect(item.descriptor.declarations).toBeUndefined();
    });

    it("C10 — the KF-1 spec vector: --x <length>: 0px", () => {
        const s = parseCSSStylesheet(
            "@function --f(--x <length>: 0px) { result: var(--x); }",
        );
        const item = s[0]!;
        if (item.kind !== "function") throw new Error("not a function");
        expect(item.descriptor.parameters).toEqual([
            { name: "--x", syntax: "<length>", default: "0px" },
        ]);
    });

    it("C10 — no type, no default: bare --x", () => {
        const s = parseCSSStylesheet(
            "@function --f(--x) { result: var(--x); }",
        );
        const item = s[0]!;
        if (item.kind !== "function") throw new Error("not a function");
        expect(item.descriptor.parameters).toEqual([{ name: "--x" }]);
    });

    it("C10 — type, no default: --x <length>", () => {
        const s = parseCSSStylesheet(
            "@function --f(--x <length>) { result: var(--x); }",
        );
        const item = s[0]!;
        if (item.kind !== "function") throw new Error("not a function");
        expect(item.descriptor.parameters).toEqual([
            { name: "--x", syntax: "<length>" },
        ]);
    });

    it("C10 — default, no type: --x: 0px", () => {
        const s = parseCSSStylesheet(
            "@function --f(--x: 0px) { result: var(--x); }",
        );
        const item = s[0]!;
        if (item.kind !== "function") throw new Error("not a function");
        expect(item.descriptor.parameters).toEqual([
            { name: "--x", default: "0px" },
        ]);
    });

    it("C10 — comma-nested default: var(--y, 1px) survives the split", () => {
        const s = parseCSSStylesheet(
            "@function --f(--x <length>: var(--y, 1px)) { result: var(--x); }",
        );
        const item = s[0]!;
        if (item.kind !== "function") throw new Error("not a function");
        expect(item.descriptor.parameters).toEqual([
            { name: "--x", syntax: "<length>", default: "var(--y, 1px)" },
        ]);
    });

    it("C10 — type() css-type notation carries no phantom default", () => {
        const s = parseCSSStylesheet(
            "@function --f(--x type(<length>)) { result: var(--x); }",
        );
        const item = s[0]!;
        if (item.kind !== "function") throw new Error("not a function");
        expect(item.descriptor.parameters).toEqual([
            { name: "--x", syntax: "type(<length>)" },
        ]);
    });

    it("C10 — multiple params, mixed shapes", () => {
        const s = parseCSSStylesheet(
            "@function --f(--x <length>: 0px, --y <color>: red, --z) { result: var(--x); }",
        );
        const item = s[0]!;
        if (item.kind !== "function") throw new Error("not a function");
        expect(item.descriptor.parameters).toEqual([
            { name: "--x", syntax: "<length>", default: "0px" },
            { name: "--y", syntax: "<color>", default: "red" },
            { name: "--z" },
        ]);
    });

    it("C17 — @function round-trips", () => {
        roundTrips(css);
        roundTrips(
            "@function --f(--x <length>: var(--y, 1px), --z <color>) { result: var(--x); }",
        );
    });
});

describe("O.W4 S8 — recursive at-rule bodies + extractKeyframes depth-walk (C11/C12)", () => {
    const css =
        "@layer base { @keyframes fade { from { opacity: 0; } to { opacity: 1; } } }";

    it("C11 — @layer body parses @keyframes into typed children", () => {
        const s = parseCSSStylesheet(css);
        expect(s).toHaveLength(1);
        const layer = s[0]!;
        expect(layer.kind).toBe("unknown");
        if (layer.kind !== "unknown") throw new Error("not unknown");
        expect(layer.atName).toBe("layer");
        expect(layer.prelude).toBe("base");
        expect(layer.children).toBeDefined();
        expect(layer.children).toHaveLength(1);
        const kf = layer.children![0]!;
        expect(kf.kind).toBe("keyframes");
        if (kf.kind !== "keyframes") throw new Error("not keyframes");
        expect(kf.name).toBe("fade");
        expect(kf.rules).toHaveLength(2);
    });

    it("C12 — extractKeyframes finds @keyframes nested inside @layer", () => {
        const s = parseCSSStylesheet(css);
        const km = extractKeyframes(s);
        expect(km.has("fade")).toBe(true);
        expect(km.get("fade")).toHaveLength(2);
    });

    it("C12 — extractKeyframes walks @media > @supports > @keyframes (deep)", () => {
        const s = parseCSSStylesheet(
            "@media (min-width: 100px) { @supports (display: grid) { @keyframes deep { from { opacity: 0; } } } }",
        );
        const km = extractKeyframes(s);
        expect(km.has("deep")).toBe(true);
    });

    it("C8 — semicolon-form at-rule keeps body:null, no children (BC)", () => {
        const s = parseCSSStylesheet("@layer base;");
        const item = s[0]!;
        expect(item.kind).toBe("unknown");
        if (item.kind !== "unknown") throw new Error("not unknown");
        expect(item.body).toBeNull();
        expect(item.children).toBeUndefined();
    });

    it("C17 — @layer-wrapped @keyframes round-trips", () => {
        roundTrips(css);
    });
});

describe("O.W4 S9 — full nesting AST (C13)", () => {
    const css = ".a { color: blue; .b { color: red; } }";

    it("C13 — nested rule collected into style.children", () => {
        const s = parseCSSStylesheet(css);
        expect(s).toHaveLength(1);
        const outer = s[0]!;
        expect(outer.kind).toBe("style");
        if (outer.kind !== "style") throw new Error("not style");
        expect(outer.selectors).toEqual([".a"]);
        // Outer declarations carry only `color: blue`.
        expect(outer.declarations).toHaveLength(1);
        expect(outer.declarations[0]!.name).toBe("color");
        expect(outer.children).toBeDefined();
        expect(outer.children).toHaveLength(1);
        const inner = outer.children![0]!;
        expect(inner.kind).toBe("style");
        if (inner.kind !== "style") throw new Error("inner not style");
        expect(inner.selectors).toEqual([".b"]);
    });

    it("C13 — non-nested style item has no children field (byte-identical BC)", () => {
        const s = parseCSSStylesheet(".x { color: green; }");
        const item = s[0]! as Extract<StylesheetItem, { kind: "style" }>;
        expect("children" in item).toBe(false);
    });

    it("C17 — nested style round-trips", () => {
        // Color values have a known value.js idempotence quirk
        // (blue→rgb(0 0 255)→Color with a different internal field shape) that
        // is orthogonal to the grammar — use color-free declarations so the
        // round-trip witnesses the NESTING structure, not the color bug.
        roundTrips(".a { opacity: 1; .b { opacity: 0; } }");
    });
});

describe("O.W4 S10 — @scope typed (C14)", () => {
    const css = "@scope (.card) to (.footer) { p { color: blue; } }";

    it("C14 — @scope parses to kind:scope with root/limit/children", () => {
        const s = parseCSSStylesheet(css);
        const item = s[0]!;
        expect(item.kind).toBe("scope");
        if (item.kind !== "scope") throw new Error("not scope");
        expect(item.root).toEqual([".card"]);
        expect(item.limit).toEqual([".footer"]);
        expect(item.children).toHaveLength(1);
        expect(item.children[0]!.kind).toBe("style");
    });

    it("C14 — @scope with no prelude (root/limit absent)", () => {
        const s = parseCSSStylesheet("@scope { p { color: red; } }");
        const item = s[0]!;
        if (item.kind !== "scope") throw new Error("not scope");
        expect(item.root).toBeUndefined();
        expect(item.limit).toBeUndefined();
        expect(item.children).toHaveLength(1);
    });

    it("C12 — extractKeyframes walks @scope children", () => {
        const s = parseCSSStylesheet(
            "@scope (.card) { @keyframes spin { from { opacity: 0; } } }",
        );
        expect(extractKeyframes(s).has("spin")).toBe(true);
    });

    it("C17 — @scope round-trips", () => {
        // Color-free decls — see the C17 note in the nesting describe block.
        roundTrips("@scope (.card) to (.footer) { p { opacity: 0; } }");
        roundTrips("@scope { p { opacity: 0; } }");
        roundTrips("@scope (.root) { p { opacity: 0; } }");
    });
});

describe("O.W4 S11 — @starting-style typed (C15)", () => {
    const css = "@starting-style { .box { opacity: 0; } }";

    it("C15 — @starting-style parses to kind:starting-style with children", () => {
        const s = parseCSSStylesheet(css);
        const item = s[0]!;
        expect(item.kind).toBe("starting-style");
        if (item.kind !== "starting-style") throw new Error("not starting-style");
        expect(item.children).toHaveLength(1);
        expect(item.children[0]!.kind).toBe("style");
    });

    it("C17 — @starting-style round-trips", () => {
        roundTrips(css);
    });
});

describe("O.W4b — @scroll-timeline / @view-timeline typed at-rules", () => {
    it("@scroll-timeline parses to kind:scroll-timeline", () => {
        const s = parseCSSStylesheet("@scroll-timeline --my { source: auto; }");
        const item = s[0]!;
        expect(item.kind).toBe("scroll-timeline");
        if (item.kind !== "scroll-timeline") throw new Error("not scroll-timeline");
        expect(item.name).toBe("--my");
        expect(item.descriptor.source).toBe("auto");
    });

    it("@scroll-timeline captures orientation + selector(...) source VERBATIM", () => {
        const s = parseCSSStylesheet(
            "@scroll-timeline --tl { source: selector(#scroller); orientation: block; }",
        );
        const item = s[0]!;
        if (item.kind !== "scroll-timeline") throw new Error("not scroll-timeline");
        expect(item.descriptor.source).toBe("selector(#scroller)");
        expect(item.descriptor.orientation).toBe("block");
    });

    it("@view-timeline parses to kind:view-timeline", () => {
        const s = parseCSSStylesheet(
            "@view-timeline --subject { subject: selector(.box); axis: inline; inset: 10% auto; }",
        );
        const item = s[0]!;
        expect(item.kind).toBe("view-timeline");
        if (item.kind !== "view-timeline") throw new Error("not view-timeline");
        expect(item.name).toBe("--subject");
        expect(item.descriptor.subject).toBe("selector(.box)");
        expect(item.descriptor.axis).toBe("inline");
        expect(item.descriptor.inset).toBe("10% auto");
    });

    it("C33 — extractNamedTimelines builds the registry", () => {
        const s = parseCSSStylesheet(`
            @scroll-timeline --my-tl { source: auto; orientation: block; }
            @view-timeline --subject { subject: selector(.box); axis: inline; }
        `);
        const reg = extractNamedTimelines(s);
        expect(reg.scroll.get("--my-tl")).toEqual({
            source: "auto",
            orientation: "block",
        });
        expect(reg.view.get("--subject")).toEqual({
            subject: "selector(.box)",
            axis: "inline",
        });
    });

    it("C34 — parseAnimationTimelineList parses the #-list form", () => {
        const list = parseAnimationTimelineList("scroll(root), --main-tl, none");
        expect(list).toEqual([
            { kind: "scroll", scroller: "root" },
            { kind: "name", name: "--main-tl" },
            { kind: "none" },
        ]);
    });

    it("C35 — list form round-trips", () => {
        const css = "scroll(root), --main-tl, none";
        const list = parseAnimationTimelineList(css);
        const serialized = list.map(serializeAnimationTimeline).join(", ");
        expect(parseAnimationTimelineList(serialized)).toEqual(list);
    });

    it("C17 — @scroll-timeline / @view-timeline round-trip", () => {
        roundTrips("@scroll-timeline --my { source: auto; orientation: block; }");
        roundTrips(
            "@view-timeline --s { subject: selector(.box); axis: inline; inset: 10% auto; }",
        );
    });
});

describe("serialize coverage — every new construct round-trips item-level", () => {
    // Color-free declarations — `color: blue` has a value.js Color idempotence
    // quirk orthogonal to the grammar (see the C17 note above).
    const cases = [
        "@function --double(--x: <length>) { result: calc(var(--x) * 2); }",
        "@layer base { @keyframes fade { from { opacity: 0; } to { opacity: 1; } } }",
        "@scope (.card) to (.footer) { p { opacity: 0; } }",
        "@starting-style { .box { opacity: 0; } }",
        "@scroll-timeline --my { source: auto; }",
        "@view-timeline --s { subject: selector(.box); axis: inline; }",
        ".a { opacity: 1; .b { opacity: 0; } }",
    ];
    for (const css of cases) {
        it(`round-trips: ${css.slice(0, 40)}…`, () => {
            const first = parseCSSStylesheet(css);
            const reserialized = parseCSSStylesheet(
                serializeStylesheetItem(first[0]!),
            );
            expect(reserialized).toEqual(first);
        });
    }
});
