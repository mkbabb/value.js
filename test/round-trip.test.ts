import { describe, expect, it } from "vitest";
import { parseCSSStylesheet } from "../src/parsing/stylesheet";
import { serializeStylesheet } from "../src/parsing/serialize";
import { parseCSSValue } from "../src/parsing";
import { lowerSpringEasing, parseSpring } from "../src/parsing/easing";
import type {
    Declaration,
    KeyframeRule,
    KeyframeSelector,
    Stylesheet,
    StylesheetItem,
} from "../src/parsing/stylesheet";

// ───────────────────────────────────────────────────────────────────────────
// inv-O-2 — the SEMANTIC-IDEMPOTENCE invariant (O.W5 / D5).
//
//   parse(serialize(parse(s))) ≡ parse(s)   (VALUE-NORMALIZED, not byte/CST)
//
// For EVERY grammar construct, a parse → serialize → re-parse cycle must yield a
// structurally-equal AST. "Value-normalized" is load-bearing: the OUTER parse(s)
// already normalizes colors (`blue` → `rgb(0 0 255)`), units, and function
// argument shapes, so the comparison must compare RESOLVED values — a Color's
// channels via its normalized `toString()`, NOT its raw input string or internal
// field layout. A naive `JSON.stringify` / shape-equal comparator FALSELY fails
// on this normalization; `deepEqualAST` below compares declaration values via
// their normalized `toString()` and the tree structure recursively.
//
// The corpus is a DETERMINISTIC fixed array (no runtime fuzzer dependency) — one
// representative per construct (O.W5.md S4 table). The corpus IS the spec.
// ───────────────────────────────────────────────────────────────────────────

// ─── value-normalized structural equality ─────────────────────────────────

/**
 * Normalize a declaration value to its canonical string. `ValueArray.toString()`
 * renders the resolved value — a `Color` emits its normalized channels
 * (`rgb(0 0 255)`), a `FunctionValue` emits its canonical function syntax. This
 * is the SEMANTIC comparison key: two values that resolve to the same CSS are
 * equal regardless of their internal field shape or original input spelling.
 */
const normValue = (v: { toString(): string }): string =>
    v.toString().replace(/\s+/g, " ").trim();

const eqDeclaration = (a: Declaration, b: Declaration): boolean =>
    a.name === b.name &&
    a.important === b.important &&
    normValue(a.value) === normValue(b.value);

const eqDeclarations = (a: Declaration[], b: Declaration[]): boolean =>
    a.length === b.length && a.every((d, i) => eqDeclaration(d, b[i]!));

const eqKeyframeSelector = (
    a: KeyframeSelector,
    b: KeyframeSelector,
): boolean => {
    if (a.kind !== b.kind) return false;
    if (a.kind === "percent" && b.kind === "percent") {
        return a.value === b.value;
    }
    if (a.kind === "named" && b.kind === "named") {
        return a.name === b.name;
    }
    return false;
};

const eqKeyframeRule = (a: KeyframeRule, b: KeyframeRule): boolean =>
    a.selectors.length === b.selectors.length &&
    a.selectors.every((s, i) => eqKeyframeSelector(s, b.selectors[i]!)) &&
    eqDeclarations(a.declarations, b.declarations) &&
    (a.timingFunction ?? "") === (b.timingFunction ?? "") &&
    (a.composition ?? "") === (b.composition ?? "");

const eqStringArray = (a?: string[], b?: string[]): boolean => {
    const aa = a ?? [];
    const bb = b ?? [];
    return aa.length === bb.length && aa.every((s, i) => s.trim() === bb[i]!.trim());
};

// Treat null/undefined children as empty arrays (vacuous nesting equality).
const childrenOf = (item: { children?: StylesheetItem[] }): StylesheetItem[] =>
    item.children ?? [];

/**
 * Recursive value-normalized structural comparator over `StylesheetItem` trees.
 * Compares by `kind`, then by the kind's distinguishing fields (name, prelude,
 * selectors, descriptor, rules) and recurses into children. Declaration values
 * compare via `normValue` (semantic, not byte). It is NORMALIZED but NOT loose:
 * a different `kind`, a missing/extra child, a wrong selector, or a wrong
 * declaration value all make it return `false` (asserted by the negative tests).
 */
function deepEqualItem(a: StylesheetItem, b: StylesheetItem): boolean {
    if (a.kind !== b.kind) return false;
    switch (a.kind) {
        case "keyframes": {
            if (b.kind !== "keyframes") return false;
            return (
                (a.name ?? "") === (b.name ?? "") &&
                a.rules.length === b.rules.length &&
                a.rules.every((r, i) => eqKeyframeRule(r, b.rules[i]!))
            );
        }
        case "property": {
            if (b.kind !== "property") return false;
            return (
                a.name === b.name &&
                (a.descriptor.syntax ?? "") === (b.descriptor.syntax ?? "") &&
                a.descriptor.inherits === b.descriptor.inherits &&
                (a.descriptor.initialValue
                    ? normValue(a.descriptor.initialValue)
                    : "") ===
                    (b.descriptor.initialValue
                        ? normValue(b.descriptor.initialValue)
                        : "")
            );
        }
        case "function": {
            if (b.kind !== "function") return false;
            const ap = a.descriptor.parameters ?? [];
            const bp = b.descriptor.parameters ?? [];
            const paramsEq =
                ap.length === bp.length &&
                ap.every(
                    (p, i) =>
                        p.name === bp[i]!.name &&
                        (p.syntax ?? "") === (bp[i]!.syntax ?? "") &&
                        (p.default ?? "") === (bp[i]!.default ?? ""),
                );
            const resEq =
                (a.descriptor.result ? normValue(a.descriptor.result) : "") ===
                (b.descriptor.result ? normValue(b.descriptor.result) : "");
            return (
                a.name === b.name &&
                paramsEq &&
                resEq &&
                eqDeclarations(
                    a.descriptor.declarations ?? [],
                    b.descriptor.declarations ?? [],
                )
            );
        }
        case "scope": {
            if (b.kind !== "scope") return false;
            return (
                eqStringArray(a.root, b.root) &&
                eqStringArray(a.limit, b.limit) &&
                deepEqualList(a.children, b.children)
            );
        }
        case "starting-style": {
            if (b.kind !== "starting-style") return false;
            return deepEqualList(a.children, b.children);
        }
        case "scroll-timeline": {
            if (b.kind !== "scroll-timeline") return false;
            return (
                a.name === b.name &&
                (a.descriptor.source ?? "") === (b.descriptor.source ?? "") &&
                (a.descriptor.orientation ?? "") ===
                    (b.descriptor.orientation ?? "")
            );
        }
        case "view-timeline": {
            if (b.kind !== "view-timeline") return false;
            return (
                a.name === b.name &&
                (a.descriptor.subject ?? "") === (b.descriptor.subject ?? "") &&
                (a.descriptor.axis ?? "") === (b.descriptor.axis ?? "") &&
                (a.descriptor.inset ?? "") === (b.descriptor.inset ?? "")
            );
        }
        case "style": {
            if (b.kind !== "style") return false;
            return (
                eqStringArray(a.selectors, b.selectors) &&
                eqDeclarations(a.declarations, b.declarations) &&
                deepEqualList(childrenOf(a), childrenOf(b))
            );
        }
        case "unknown": {
            if (b.kind !== "unknown") return false;
            // Per S4: do NOT compare raw body strings (whitespace may normalize).
            // Compare the at-rule name, the (trimmed) prelude, and recurse into
            // the typed children that the recursive at-rule parser produced.
            const bodyShapeEq =
                (a.children !== undefined) === (b.children !== undefined);
            return (
                a.atName === b.atName &&
                a.prelude.trim() === b.prelude.trim() &&
                bodyShapeEq &&
                deepEqualList(childrenOf(a), childrenOf(b))
            );
        }
    }
}

function deepEqualList(a: StylesheetItem[], b: StylesheetItem[]): boolean {
    return a.length === b.length && a.every((it, i) => deepEqualItem(it, b[i]!));
}

/** The top-level value-normalized AST comparator used by every corpus assertion. */
export function deepEqualAST(a: Stylesheet, b: Stylesheet): boolean {
    return deepEqualList(a, b);
}

// ─── the deterministic fixed corpus (one per construct) ────────────────────

const CORPUS: { name: string; css: string }[] = [
    {
        name: "@keyframes",
        css: "@keyframes slide { 0% {transform: translateX(0)} 100% {transform: translateX(100px)} }",
    },
    {
        name: "@property",
        css: '@property --color { syntax: "<color>"; inherits: false; initial-value: red; }',
    },
    {
        name: "style (flat)",
        css: ".foo { color: oklch(0.5 0.1 200); transform: scale(1.2); }",
    },
    {
        name: "@layer (nested @keyframes)",
        css: "@layer base { @keyframes fade { 0% {opacity:0} 100% {opacity:1} } }",
    },
    {
        name: "@media (recursive)",
        css: "@media (max-width: 768px) { .foo { display: none; } }",
    },
    {
        name: "@container",
        css: "@container sidebar (min-width: 400px) { .card { flex-direction: row; } }",
    },
    {
        name: "@scope",
        css: "@scope (.card) { .title { font-size: 1.5em; } }",
    },
    {
        name: "@starting-style",
        css: "@starting-style { .dialog { opacity: 0; } }",
    },
    {
        name: "@scroll-timeline",
        css: "@scroll-timeline --my-tl { source: auto; orientation: block; }",
    },
    {
        name: "@view-timeline",
        css: "@view-timeline --my-vt { subject: selector(.card); }",
    },
    {
        name: "CSS Nesting",
        css: ".parent { color: red; .child { color: blue; } }",
    },
    {
        name: "linear() stops",
        css: "@keyframes f { from { animation-timing-function: linear(0, 0.5 50%, 1); } to { opacity: 1; } }",
    },
    {
        name: "spring()",
        css: "@keyframes f { from { animation-timing-function: spring(1, 100, 10, 0); } to { opacity: 1; } }",
    },
    {
        name: "color(in oklch)",
        css: ".foo { color: color(in oklch 0.5 0.1 200); }",
    },
    {
        name: "gradient",
        css: ".foo { background: linear-gradient(to bottom right, oklch(0.7 0.2 30), oklch(0.4 0.15 250)); }",
    },
    {
        name: "cubic-bezier()",
        css: "@keyframes f { from { animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1); } to {} }",
    },
    {
        name: "steps()",
        css: "@keyframes f { from { animation-timing-function: steps(4, end); } to {} }",
    },
    {
        name: "var()",
        css: ".foo { color: var(--primary-color, oklch(0.5 0.1 200)); }",
    },
    {
        name: "calc()",
        css: ".foo { width: calc(100% - 2rem); }",
    },
    {
        name: "@function",
        css: "@function --brand-color(--lightness: 0.5) { result: oklch(var(--lightness) 0.15 200); }",
    },
    {
        // if() PARSES now (O.W4 G2) — included per O.W5.md S4 ("if() PARSES now").
        name: "if()",
        css: ".foo { color: if(style(--on: 1): red; else: blue); }",
    },
];

// ─── the invariant assertion ───────────────────────────────────────────────

describe("inv-O-2 — semantic-idempotence (parse∘serialize∘parse ≡ parse)", () => {
    it("covers ≥ 18 distinct grammar constructs", () => {
        expect(CORPUS.length).toBeGreaterThanOrEqual(18);
    });

    for (const { name, css } of CORPUS) {
        it(`round-trips ${name}`, () => {
            const parsed1 = parseCSSStylesheet(css);
            const serialized = serializeStylesheet(parsed1);
            const parsed2 = parseCSSStylesheet(serialized);
            expect(deepEqualAST(parsed1, parsed2)).toBe(true);
        });
    }
});

// ─── deepEqualAST is NORMALIZED but NOT trivially-loose ────────────────────

describe("deepEqualAST is value-normalized but still catches real differences", () => {
    it("treats a normalized color equal to its keyword form (blue ≡ rgb(0 0 255))", () => {
        // The OUTER parse already normalizes `blue`; assert the comparator does
        // not regress to byte equality by comparing the two spellings directly.
        const a = parseCSSStylesheet(".x { color: blue; }");
        const b = parseCSSStylesheet(".x { color: rgb(0 0 255); }");
        expect(deepEqualAST(a, b)).toBe(true);
    });

    it("CATCHES a wrong declaration value", () => {
        const a = parseCSSStylesheet(".x { color: red; }");
        const b = parseCSSStylesheet(".x { color: green; }");
        expect(deepEqualAST(a, b)).toBe(false);
    });

    it("CATCHES a different kind", () => {
        const a = parseCSSStylesheet("@keyframes k { 0% {opacity:0} }");
        const b = parseCSSStylesheet(".k { opacity: 0; }");
        expect(deepEqualAST(a, b)).toBe(false);
    });

    it("CATCHES a missing nested child", () => {
        const a = parseCSSStylesheet("@layer base { @keyframes f { 0%{opacity:0} } }");
        const b = parseCSSStylesheet("@layer base { }");
        expect(deepEqualAST(a, b)).toBe(false);
    });

    it("CATCHES a wrong selector", () => {
        const a = parseCSSStylesheet(".a { color: red; }");
        const b = parseCSSStylesheet(".b { color: red; }");
        expect(deepEqualAST(a, b)).toBe(false);
    });

    it("CATCHES a missing declaration", () => {
        const a = parseCSSStylesheet(".a { color: red; opacity: 1; }");
        const b = parseCSSStylesheet(".a { color: red; }");
        expect(deepEqualAST(a, b)).toBe(false);
    });
});

// ─── S3 spring() moderate-supersede ────────────────────────────────────────

describe("spring() moderate-supersede (O.W5 S3)", () => {
    it("round-trips spring() as author syntax", () => {
        expect(parseCSSValue("spring(1, 100, 10, 0)").toString()).toBe(
            "spring(1, 100, 10, 0)",
        );
        expect(parseSpring("spring(1, 100, 10, 0)").toString()).toBe(
            "spring(1, 100, 10, 0)",
        );
    });

    it("lowers to a self-idempotent linear()", () => {
        const lowered = lowerSpringEasing(1, 100, 10, 0, 16);
        expect(lowered.startsWith("linear(")).toBe(true);
        expect(parseCSSValue(lowered).toString()).toBe(lowered);
    });

    it("lowered curve rises from 0 and settles toward 1 (real ODE, not a stub)", () => {
        const lowered = lowerSpringEasing(1, 100, 10, 0, 24);
        // Extract the stop output values.
        const inner = lowered.slice("linear(".length, -1);
        const outputs = inner
            .split(",")
            .map((s) => parseFloat(s.trim().split(/\s+/)[0]!));
        expect(outputs[0]).toBe(0);
        expect(outputs[outputs.length - 1]).toBe(1);
        // Initial rise: the first few samples increase monotonically off zero.
        expect(outputs[1]!).toBeGreaterThan(outputs[0]!);
        expect(outputs[2]!).toBeGreaterThan(outputs[1]!);
        // Underdamped (ζ=0.5) overshoots past 1 then settles back near 1.
        const peak = Math.max(...outputs);
        expect(peak).toBeGreaterThan(1);
        const tail = outputs.slice(-3);
        for (const v of tail) {
            expect(Math.abs(v - 1)).toBeLessThan(0.05);
        }
    });

    it("rejects non-physical spring params on lowering", () => {
        expect(() => lowerSpringEasing(0, 100, 10, 0)).toThrow();
        expect(() => lowerSpringEasing(1, 0, 10, 0)).toThrow();
    });
});
