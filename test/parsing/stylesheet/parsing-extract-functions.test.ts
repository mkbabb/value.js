import { describe, expect, it } from "vitest";
import { extractFunctions } from "@src/parsing/extract";
import { extractFunctions as extractFunctionsRoot } from "@src/index";
import { parseCSSStylesheet } from "@src/parsing/stylesheet";

// ─────────────────────────────────────────────────────────────────────────────
// VJ-CSS1 — extractFunctions(ast) → Map<string, CustomFunctionDescriptor>
//
// A depth-walk over the Stylesheet AST filtering `kind === "function"` (the
// @function blocks ALREADY parse, O.W4 S7). Mirrors extractKeyframes (recurses
// into container children) and extractProperties (later wins). kf's adapter
// consumes this to collect @function descriptors for the P.W13 lowering pass.
// ─────────────────────────────────────────────────────────────────────────────

describe("extractFunctions — VJ-CSS1", () => {
    it("is exported from the public root barrel as a function", () => {
        expect(typeof extractFunctionsRoot).toBe("function");
        expect(extractFunctionsRoot).toBe(extractFunctions);
    });

    it("returns an empty Map for a stylesheet with no @function", () => {
        const s = parseCSSStylesheet(".a { color: red; }");
        expect(extractFunctions(s).size).toBe(0);
    });

    it("indexes a top-level @function by its dashed-ident name", () => {
        // CSS Functions & Mixins L1 §3.1 spec form: the <css-type> follows the
        // name by WHITESPACE (a colon would instead introduce a <default-value>).
        const s = parseCSSStylesheet(
            "@function --double(--x <number>) { result: calc(var(--x) * 2); }",
        );
        const fns = extractFunctions(s);
        expect(fns.size).toBe(1);
        const desc = fns.get("--double");
        expect(desc).toBeDefined();
        expect(desc!.parameters).toHaveLength(1);
        expect(desc!.parameters![0]!.name).toBe("--x");
        expect(desc!.parameters![0]!.syntax).toBe("<number>");
        expect(desc!.result).toBeDefined();
    });

    it("indexes multiple @function registrations", () => {
        const s = parseCSSStylesheet(
            "@function --a(--x: <number>) { result: var(--x); }" +
                "@function --b(--y: <number>) { result: var(--y); }",
        );
        const fns = extractFunctions(s);
        expect(fns.size).toBe(2);
        expect(fns.has("--a")).toBe(true);
        expect(fns.has("--b")).toBe(true);
    });

    it("LATER registration overrides earlier (CSS cascade)", () => {
        const s = parseCSSStylesheet(
            "@function --x(--n: <number>) { result: calc(var(--n) * 2); }" +
                "@function --x(--n: <number>) { result: calc(var(--n) * 3); }",
        );
        const fns = extractFunctions(s);
        expect(fns.size).toBe(1);
        // The second (×3) wins; the result ValueArray serializes to the ×3 form.
        expect(fns.get("--x")!.result!.toString()).toContain("3");
    });

    it("depth-walks a @function nested inside @layer (kf-critical)", () => {
        const s = parseCSSStylesheet(
            "@layer base { @function --triple(--x: <number>) { result: calc(var(--x) * 3); } }",
        );
        const fns = extractFunctions(s);
        expect(fns.size).toBe(1);
        expect(fns.has("--triple")).toBe(true);
    });

    it("depth-walks a @function nested inside @media", () => {
        const s = parseCSSStylesheet(
            "@media (min-width: 600px) { @function --wide(--x: <number>) { result: var(--x); } }",
        );
        const fns = extractFunctions(s);
        expect(fns.has("--wide")).toBe(true);
    });
});
