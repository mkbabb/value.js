import { describe, it, expect, beforeEach } from "vitest";
import {
    clearCollectedDiagnostics,
    getCollectedDiagnostics,
} from "@mkbabb/parse-that";
import {
    parseMath,
    resilientArguments,
    INVALID_ARGUMENT,
    type CalcNode,
} from "./example.js";

/** Narrowing helper — the entry point is total, so every read goes through `ok`. */
const node = (source: string): CalcNode => {
    const outcome = parseMath(source);
    if (!outcome.ok) {
        throw new Error(`expected ${JSON.stringify(source)} to parse; failed @${outcome.offset}`);
    }
    return outcome.node;
};

const fails = (source: string): boolean => !parseMath(source).ok;

describe("worked example — CSS L4 math functions", () => {
    describe("terminals", () => {
        it("parses <number>, <percentage> and <dimension>", () => {
            expect(node("calc(1)")).toEqual({
                kind: "call",
                name: "calc",
                args: [{ kind: "number", value: 1 }],
            });
            expect(node("calc(50%)")).toEqual({
                kind: "call",
                name: "calc",
                args: [{ kind: "percentage", value: 50 }],
            });
            expect(node("calc(-1.5e2px)")).toEqual({
                kind: "call",
                name: "calc",
                args: [{ kind: "dimension", value: -150, unit: "px" }],
            });
            expect(node("calc(.5em)")).toEqual({
                kind: "call",
                name: "calc",
                args: [{ kind: "dimension", value: 0.5, unit: "em" }],
            });
        });

        it("case-folds function names and units without a second pass", () => {
            expect(node("CALC(1PX * 2)")).toEqual({
                kind: "call",
                name: "calc",
                args: [
                    {
                        kind: "operation",
                        op: "*",
                        left: { kind: "dimension", value: 1, unit: "px" },
                        right: { kind: "number", value: 2 },
                    },
                ],
            });
        });
    });

    describe("precedence, associativity, recursion", () => {
        it("binds * tighter than -, left-associatively", () => {
            expect(node("calc(100% - 2 * 8px)")).toEqual({
                kind: "call",
                name: "calc",
                args: [
                    {
                        kind: "operation",
                        op: "-",
                        left: { kind: "percentage", value: 100 },
                        right: {
                            kind: "operation",
                            op: "*",
                            left: { kind: "number", value: 2 },
                            right: { kind: "dimension", value: 8, unit: "px" },
                        },
                    },
                ],
            });
        });

        it("folds a same-precedence run left-associatively", () => {
            expect(node("calc(1 - 2 - 3)")).toEqual({
                kind: "call",
                name: "calc",
                args: [
                    {
                        kind: "operation",
                        op: "-",
                        left: {
                            kind: "operation",
                            op: "-",
                            left: { kind: "number", value: 1 },
                            right: { kind: "number", value: 2 },
                        },
                        right: { kind: "number", value: 3 },
                    },
                ],
            });
        });

        it("recurses through parentheses and through nested math functions", () => {
            expect(node("calc((1 + 2) * 3)")).toEqual({
                kind: "call",
                name: "calc",
                args: [
                    {
                        kind: "operation",
                        op: "*",
                        left: {
                            kind: "operation",
                            op: "+",
                            left: { kind: "number", value: 1 },
                            right: { kind: "number", value: 2 },
                        },
                        right: { kind: "number", value: 3 },
                    },
                ],
            });

            expect(node("calc(min(1px, 2px) * 3)")).toEqual({
                kind: "call",
                name: "calc",
                args: [
                    {
                        kind: "operation",
                        op: "*",
                        left: {
                            kind: "call",
                            name: "min",
                            args: [
                                { kind: "dimension", value: 1, unit: "px" },
                                { kind: "dimension", value: 2, unit: "px" },
                            ],
                        },
                        right: { kind: "number", value: 3 },
                    },
                ],
            });
        });

        it("survives deep nesting without a stack budget of its own", () => {
            const deep = `calc(${"(".repeat(64)}1${")".repeat(64)})`;
            expect(parseMath(deep).ok).toBe(true);
        });
    });

    describe("arity lives in sepBy, not in a post-hoc length check", () => {
        it("clamp() takes exactly three arguments", () => {
            expect(parseMath("clamp(1px, 2px, 3px)").ok).toBe(true);
            expect(fails("clamp(1px, 2px)")).toBe(true);
            expect(fails("clamp(1px, 2px, 3px, 4px)")).toBe(true);
            expect(fails("clamp()")).toBe(true);
        });

        it("min()/max() take one or more; calc() takes exactly one", () => {
            expect(parseMath("min(1px)").ok).toBe(true);
            expect(parseMath("max(1px, 2px, 3px, 4px)").ok).toBe(true);
            expect(fails("min()")).toBe(true);
            expect(fails("calc(1px, 2px)")).toBe(true);
        });

        it("rejects a trailing separator (sepBy never accepts one)", () => {
            expect(fails("min(1px,)")).toBe(true);
            expect(fails("clamp(1px, 2px, 3px,)")).toBe(true);
        });
    });

    describe("CSS L4 §10.9 — whitespace is part of the grammar", () => {
        it("requires whitespace around + and -", () => {
            expect(parseMath("calc(1 + 2)").ok).toBe(true);
            expect(fails("calc(1+2)")).toBe(true);
            expect(fails("calc(1 -2)")).toBe(true);
            expect(fails("calc(1- 2)")).toBe(true);
        });

        it("does not require whitespace around * and /", () => {
            expect(parseMath("calc(1*2)").ok).toBe(true);
            expect(parseMath("calc(1 * 2)").ok).toBe(true);
            expect(parseMath("calc(1/2)").ok).toBe(true);
        });
    });

    describe("totality — the entry point never throws, never half-answers", () => {
        const HOSTILE = [
            "",
            " ",
            "   \n\t ",
            "calc()",
            "calc(",
            "calc",
            "calc)",
            "calc(()",
            "calc(())",
            "calc(,)",
            "calc(1px",
            "calc(1px))",
            "calc(1px) trailing",
            "min(,)",
            "clamp(,,)",
            "notafunction(1px)",
            "calc(1px + )",
            "calc(+ 1px)",
            "calc(* 1px)",
            "calc(1px * )",
            "calc(1e)",
            "calc(1..2)",
            "calc(#fff)",
            "calc(var(--x))",
            "((((((((((",
            "calc(" + "1 + ".repeat(2000) + "1)",
        ];

        for (const source of HOSTILE) {
            it(`is total on ${JSON.stringify(source.slice(0, 32))}`, () => {
                let thrown: unknown = null;
                let outcome: ReturnType<typeof parseMath> | null = null;
                try {
                    outcome = parseMath(source);
                } catch (error) {
                    thrown = error;
                }
                expect(thrown).toBeNull();
                expect(outcome).not.toBeNull();
                // Either a well-formed success or a well-formed failure — never
                // a stale value smuggled out of a failed parse.
                if (outcome !== null && !outcome.ok) {
                    expect(Number.isInteger(outcome.offset)).toBe(true);
                    expect(outcome.offset).toBeGreaterThanOrEqual(0);
                }
            });
        }

        it("reports a furthest offset that points at the offending token", () => {
            const outcome = parseMath("calc(1px + )");
            expect(outcome.ok).toBe(false);
            if (!outcome.ok) {
                // The parse got past "calc(1px" before failing.
                expect(outcome.offset).toBeGreaterThanOrEqual(8);
            }
        });
    });

    describe("recover() — list-shaped grammars only", () => {
        beforeEach(() => clearCollectedDiagnostics());

        it("keeps parsing past a bad element and records one diagnostic", () => {
            const state = resilientArguments.parseState("(1px, ?, 3)");

            expect(state.isError).toBe(false);
            expect(state.value).toEqual([
                { kind: "dimension", value: 1, unit: "px" },
                INVALID_ARGUMENT,
                { kind: "number", value: 3 },
            ]);

            const diagnostics = getCollectedDiagnostics();
            expect(diagnostics.length).toBe(1);
            expect(diagnostics[0]?.found.startsWith("?")).toBe(true);
        });

        it("a clean list collects no diagnostics", () => {
            const state = resilientArguments.parseState("(1px, 2px)");
            expect(state.isError).toBe(false);
            expect(getCollectedDiagnostics().length).toBe(0);
        });
    });
});
