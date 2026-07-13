// O.W4 — GRAMMAR-2026 VALUE-FUNCTION + COLOR gate (the G2 lane).
//
// Each clause runs the REAL `parseCSSValue` over a REAL CSS string and asserts
// the REAL typed output (inv-M-observable-truth — no source-grep proxy). The
// clause roster mirrors O.W4.md's born-RED gate table (C1-C9, C16-C17 — the
// value-function + color subset; the at-rule / stylesheet clauses C10-C15 are
// gated by the sibling G1 lane over `parseCSSStylesheet`).
//
// VERIFY-BEFORE-FOLD ledger (observed on today's tree BEFORE the cure):
//   C1  round(<A>,<B>) — BOTH forms GREEN. The STRATEGY-OMITTED form
//        `round(25px, 5px)` is spec-legal (`<rounding-strategy>` is optional,
//        `css-values.bbnf:72`) and now parses (S.W1 W1-2 · lib-parsing F-1: the
//        two-branch idiom in `math.ts` cures the old `all()` drop-undefined
//        crash "args is not iterable"). The known-divergence carve-around is
//        RETIRED — the omitted form is asserted below alongside the explicit one.
//   C2  mod(18, 5)        — ALREADY GREEN (FunctionValue "mod")
//   C3  abs(-5px)         — ALREADY GREEN (FunctionValue "abs")
//   C4  color-mix(...)    — ALREADY GREEN (typed Color ValueUnit, unit "color")
//   C5  color-mix hue     — ALREADY GREEN (hue method parsed)
//   C6  light-dark(...)   — ALREADY GREEN (deferred "color-keyword" sentinel)
//   C7  contrast-color()  — ALREADY GREEN via generic handleFunc (FunctionValue)
//   C8  sibling-index/-count — ALREADY GREEN via generic handleFunc
//   C9  if(...)           — BORN-RED on today's tree (collapsed to CSSString
//        "if"); CURED here by the dedicated if() scanner in parsing/index.ts
//   C16 system color      — BORN-RED on today's tree (bare CSSString, no tag);
//        CURED here by the systemColor parser in parsing/color.ts
//   C17 round-trip        — `parse(s).toString()` re-parses to the same typed
//        structure for each non-trivial clause.

import { describe, expect, it } from "vitest";

import { parseCSSValue } from "@src/parsing";
import { FunctionValue, ValueUnit } from "@src/units";

describe("O.W4 grammar-2026 — value functions + color (G2 lane)", () => {
    // --- S1 math roster: ALREADY GREEN (gate-only round-trip) ---

    describe("C1 — round() (S1)", () => {
        it("parses round(nearest, 25px, 5px) to FunctionValue('round')", () => {
            const r = parseCSSValue("round(nearest, 25px, 5px)");
            expect(r).toBeInstanceOf(FunctionValue);
            expect((r as FunctionValue).name).toBe("round");
        });

        // W1-2 (S.W1 · lib-parsing F-1): the OPTIONAL-strategy form is
        // spec-legal and MUST parse — the old crash ("args is not iterable")
        // is cured by the two-branch idiom in `math.ts`. The omitted strategy
        // defaults to "nearest", so the two forms are structurally identical.
        it("parses the strategy-OMITTED form round(25px, 5px) (spec-legal)", () => {
            const r = parseCSSValue("round(25px, 5px)");
            expect(r).toBeInstanceOf(FunctionValue);
            const fn = r as FunctionValue;
            expect(fn.name).toBe("round");
            // strategy defaults to "nearest" (first arg), then the two operands.
            const strategy = fn.values[0] as ValueUnit;
            expect(strategy).toBeInstanceOf(ValueUnit);
            expect(strategy.value).toBe("nearest");
            expect(fn.values).toHaveLength(3);
        });

        it("the omitted and explicit forms parse to the same structure", () => {
            const omitted = parseCSSValue("round(25px, 5px)") as FunctionValue;
            const explicit = parseCSSValue(
                "round(nearest, 25px, 5px)",
            ) as FunctionValue;
            expect(omitted.toString()).toBe(explicit.toString());
        });
    });

    describe("C2 — mod() (S1, already-green roster)", () => {
        it("parses mod(18, 5) to FunctionValue('mod')", () => {
            const r = parseCSSValue("mod(18, 5)");
            expect(r).toBeInstanceOf(FunctionValue);
            expect((r as FunctionValue).name).toBe("mod");
        });
    });

    describe("C3 — abs() (S1, already-green roster)", () => {
        it("parses abs(-5px) to FunctionValue('abs')", () => {
            const r = parseCSSValue("abs(-5px)");
            expect(r).toBeInstanceOf(FunctionValue);
            expect((r as FunctionValue).name).toBe("abs");
        });
    });

    // --- S2 color-mix(): ALREADY GREEN (gate-only round-trip) ---

    describe("C4 — color-mix() method (S2, already-green)", () => {
        it("parses color-mix(in oklch, red, blue) to a typed Color ValueUnit", () => {
            const r = parseCSSValue("color-mix(in oklch, red, blue)");
            expect(r).toBeInstanceOf(ValueUnit);
            expect((r as ValueUnit).unit).toBe("color");
            // The mix resolves in oklch — the superType carries the space tag.
            expect((r as ValueUnit).superType).toContain("oklch");
        });
    });

    describe("C5 — color-mix() hue method (S2, already-green)", () => {
        it("parses color-mix(in oklch shorter hue, red 30%, blue) to a Color", () => {
            const r = parseCSSValue("color-mix(in oklch shorter hue, red 30%, blue)");
            expect(r).toBeInstanceOf(ValueUnit);
            expect((r as ValueUnit).unit).toBe("color");
        });
    });

    // --- S3 light-dark(): ALREADY GREEN (deferred sentinel) ---

    describe("C6 — light-dark() (S3)", () => {
        it("parses light-dark(white, #1a1a1a) to a deferred color-keyword sentinel", () => {
            const r = parseCSSValue("light-dark(white, #1a1a1a)");
            expect(r).toBeInstanceOf(ValueUnit);
            // The VJ-3 sentinel: a FunctionValue("light-dark", [light, dark])
            // wrapped in a "color-keyword" ValueUnit so per-scheme resolution is
            // deferred to the consumer (VERBATIM, no scheme resolution at parse).
            expect((r as ValueUnit).unit).toBe("color-keyword");
            const inner = (r as ValueUnit).value;
            expect(inner).toBeInstanceOf(FunctionValue);
            expect((inner as FunctionValue).name).toBe("light-dark");
            expect((inner as FunctionValue).values.length).toBe(2);
        });
    });

    // --- S4 contrast-color(): VJ-Q1 (1.1.1) — EAGER-evaluated to a concrete
    // Color (CSS Color L7, Baseline April 2026). The Tranche-O placeholder
    // asserted the opaque-FunctionValue fall-through (TO-VERIFY browser support);
    // the library-LEADS catch-up now resolves it to the maximally-contrasting
    // black/white per the WCAG 2.x contrast ratio. The never-shipped L6
    // `contrast-color(<c> vs <c>+)` comparison form was retired (no-legacy).

    describe("C7 — contrast-color() (VJ-Q1, L7 — eager Color resolution)", () => {
        it("resolves contrast-color(white) to a concrete Color (black), not an opaque FunctionValue", () => {
            const r = parseCSSValue("contrast-color(white)");
            expect(r).not.toBeInstanceOf(FunctionValue);
            expect((r as ValueUnit).unit).toBe("color");
            expect(r.toString()).toBe("rgb(0 0 0)");
        });

        it("resolves contrast-color(black) to white", () => {
            expect(parseCSSValue("contrast-color(black)").toString()).toBe(
                "rgb(255 255 255)",
            );
        });
    });

    // --- S5 sibling-index()/sibling-count(): ALREADY GREEN via handleFunc ---

    describe("C8 — sibling-index()/sibling-count() (S5, TO-VERIFY — parse only)", () => {
        it("parses sibling-index() to FunctionValue('sibling-index', [])", () => {
            const r = parseCSSValue("sibling-index()");
            expect(r).toBeInstanceOf(FunctionValue);
            expect((r as FunctionValue).name).toBe("sibling-index");
            expect((r as FunctionValue).values.length).toBe(0);
        });

        it("parses sibling-count() to FunctionValue('sibling-count', [])", () => {
            const r = parseCSSValue("sibling-count()");
            expect(r).toBeInstanceOf(FunctionValue);
            expect((r as FunctionValue).name).toBe("sibling-count");
            expect((r as FunctionValue).values.length).toBe(0);
        });
    });

    // --- S6 if(): BORN-RED → CURED ---

    describe("C9 — if() inline conditional (S6, born-RED → cured)", () => {
        it("parses if(style(--theme: dark): black; else: white) to FunctionValue('if', [cond, value, else]) VERBATIM", () => {
            const r = parseCSSValue("if(style(--theme: dark): black; else: white)");
            expect(r).toBeInstanceOf(FunctionValue);
            const fn = r as FunctionValue;
            expect(fn.name).toBe("if");
            expect(fn.values.length).toBe(3);
            // Clauses captured as RAW VERBATIM TEXT — no evaluation, no
            // resolution. The condition keeps its internal `:`.
            expect(fn.values[0]!.value).toBe("style(--theme: dark)");
            expect(fn.values[1]!.value).toBe("black");
            expect(fn.values[2]!.value).toBe("white");
        });

        it("captures non-color conditions and values verbatim", () => {
            const r = parseCSSValue("if(media(width > 800px): 20px; else: 10px)");
            const fn = r as FunctionValue;
            expect(fn.name).toBe("if");
            expect(fn.values[0]!.value).toBe("media(width > 800px)");
            expect(fn.values[1]!.value).toBe("20px");
            expect(fn.values[2]!.value).toBe("10px");
        });

        it("keeps a nested if() in the consequent VERBATIM (single-level outer split via balanced parens)", () => {
            const r = parseCSSValue(
                "if(style(--mode: dark): if(style(--a): 1; else: 2); else: 3)",
            );
            const fn = r as FunctionValue;
            expect(fn.name).toBe("if");
            // The inner if()'s `;` is at depth>0, so it stays inside the
            // consequent clause text rather than splitting the outer body.
            expect(fn.values[0]!.value).toBe("style(--mode: dark)");
            expect(fn.values[1]!.value).toBe("if(style(--a): 1; else: 2)");
            expect(fn.values[2]!.value).toBe("3");
        });

        it("does NOT evaluate the condition — value.js emits the clauses verbatim", () => {
            // Division-of-labour: even a trivially-false-looking condition is
            // captured, never resolved. Both branches survive.
            const fn = parseCSSValue("if(style(--x): a; else: b)") as FunctionValue;
            expect(fn.values[0]!.value).toBe("style(--x)");
            expect(fn.values[1]!.value).toBe("a");
            expect(fn.values[2]!.value).toBe("b");
        });
    });

    // --- S12 system colors: BORN-RED → CURED ---

    describe("C16 — system colors (S12, born-RED → cured)", () => {
        it("tags Canvas as ValueUnit('Canvas', 'system-color')", () => {
            const r = parseCSSValue("Canvas");
            expect(r).toBeInstanceOf(ValueUnit);
            expect((r as ValueUnit).unit).toBe("system-color");
            expect((r as ValueUnit).value).toBe("Canvas");
        });

        it("tags the CSS Color 4 §6.2 roster", () => {
            for (const name of [
                "CanvasText",
                "ButtonText",
                "GrayText",
                "AccentColor",
                "Highlight",
                "FieldText",
            ]) {
                const r = parseCSSValue(name) as ValueUnit;
                expect(r.unit).toBe("system-color");
                expect(r.value).toBe(name);
            }
        });

        it("tags the legacy CSS Color 3 §4.5 roster", () => {
            for (const name of [
                "ButtonHighlight",
                "ButtonShadow",
                "ThreeDDarkShadow",
                "WindowText",
                "InfoText",
            ]) {
                const r = parseCSSValue(name) as ValueUnit;
                expect(r.unit).toBe("system-color");
                expect(r.value).toBe(name);
            }
        });

        it("normalizes casing to the canonical CamelCase spelling (case-insensitive match)", () => {
            const r = parseCSSValue("canvastext") as ValueUnit;
            expect(r.unit).toBe("system-color");
            expect(r.value).toBe("CanvasText");
        });

        it("does NOT shadow a real CSS named color (red stays a resolved color)", () => {
            const r = parseCSSValue("red") as ValueUnit;
            expect(r.unit).toBe("color");
        });

        it("leaves an unknown identifier as a bare string (not a system color)", () => {
            const r = parseCSSValue("notacolor") as ValueUnit;
            expect(r.unit).not.toBe("system-color");
        });
    });

    // --- C17 round-trip: parse(s).toString() re-parses to the same structure ---

    describe("C17 — round-trip (each non-trivial clause)", () => {
        const reparseEquals = (input: string) => {
            const first = parseCSSValue(input);
            const serialized = first.toString();
            const second = parseCSSValue(serialized);
            return { first, serialized, second };
        };

        it("if() round-trips to the same FunctionValue('if', ...)", () => {
            const { first, serialized, second } = reparseEquals(
                "if(style(--theme: dark): black; else: white)",
            );
            // Serialized form re-emits the spec's `:`/`;` inline-conditional
            // syntax (byte-stable with the input) so it re-parses to the same
            // FunctionValue — the generic comma-join would lose the structure.
            expect(serialized).toBe("if(style(--theme: dark): black; else: white)");
            expect(second).toBeInstanceOf(FunctionValue);
            const a = first as FunctionValue;
            const b = second as FunctionValue;
            expect(b.name).toBe("if");
            expect(b.values.map((v) => v.value)).toEqual(
                a.values.map((v) => v.value),
            );
        });

        it("system color round-trips byte-stable (Canvas → 'Canvas' → Canvas)", () => {
            const { serialized, second } = reparseEquals("Canvas");
            expect(serialized).toBe("Canvas");
            expect((second as ValueUnit).unit).toBe("system-color");
            expect((second as ValueUnit).value).toBe("Canvas");
        });

        it("legacy system color round-trips byte-stable", () => {
            const { serialized, second } = reparseEquals("ThreeDDarkShadow");
            expect(serialized).toBe("ThreeDDarkShadow");
            expect((second as ValueUnit).unit).toBe("system-color");
        });

        it("light-dark() round-trips to the same color-keyword sentinel", () => {
            const { serialized, second } = reparseEquals(
                "light-dark(white, #1a1a1a)",
            );
            expect((second as ValueUnit).unit).toBe("color-keyword");
            const inner = (second as ValueUnit).value as FunctionValue;
            expect(inner.name).toBe("light-dark");
            // The serialized form re-parses to a light-dark sentinel.
            expect(serialized).toContain("light-dark(");
        });

        it("contrast-color() resolves eagerly to a concrete Color that round-trips (VJ-Q1)", () => {
            // VJ-Q1: contrast-color() is EAGER — it resolves to a concrete black/
            // white Color at parse time, so the serialized form is that resolved
            // color (`rgb(0 0 0)`), which round-trips to the same color (NOT the
            // verbatim `contrast-color(...)` FunctionValue the L6 placeholder kept).
            const { serialized, second } = reparseEquals("contrast-color(white)");
            expect(second).not.toBeInstanceOf(FunctionValue);
            expect((second as ValueUnit).unit).toBe("color");
            expect(serialized).toBe("rgb(0 0 0)");
        });

        it("sibling-index() round-trips to the same FunctionValue", () => {
            const { serialized, second } = reparseEquals("sibling-index()");
            expect(serialized).toBe("sibling-index()");
            expect((second as FunctionValue).name).toBe("sibling-index");
        });

        it("color-mix() round-trips to a typed color", () => {
            const { second } = reparseEquals("color-mix(in oklch, red, blue)");
            expect((second as ValueUnit).unit).toBe("color");
        });
    });
});
