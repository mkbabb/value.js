/**
 * CANDIDATE B — the idiom self-audit, run against this candidate's OWN source.
 *
 * GROUND-B §6 is a checklist; a checklist that nothing executes is a wish. This
 * file reads the three source files off disk, strips comments, and asserts the
 * mechanically checkable half of the checklist. It is 100 lines, it is not a
 * gate generator, and it produces no artifact — it either passes or it fails.
 *
 * The counts printed here are the counts reported in CAND-B.md.
 */

import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

const SOURCES = ["ast.ts", "table.ts", "grammar.ts"] as const;

/**
 * Comment stripper. None of the three files contains `//` or block-comment
 * delimiters inside a string or regex literal, which is asserted below so this
 * simplification cannot silently rot.
 */
const stripComments = (text: string): string =>
    text.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");

const read = (name: string): string =>
    readFileSync(resolve(import.meta.dirname, name), "utf8");

const code = (name: string): string => stripComments(read(name));

const codeOf = (): readonly { readonly name: string; readonly text: string }[] =>
    SOURCES.map((name) => ({ name, text: code(name) }));

describe("rule 1 — zero non-null assertions, zero `as` casts", () => {
    it("has no `!` non-null assertion in any source file", () => {
        // GROUND-B's own pattern, with `!=` excluded.
        const pattern = /[A-Za-z_0-9)\]]!(?!=)/g;
        for (const { name, text } of codeOf()) {
            expect(text.match(pattern) ?? [], name).toEqual([]);
        }
    });

    it("has no `as` type assertion in any source file", () => {
        for (const { name, text } of codeOf()) {
            expect(text.match(/\bas\b/g) ?? [], name).toEqual([]);
        }
    });
});

describe("rule 2 — no hand-rolled cursor, no imperative delimiter scanning", () => {
    it("has no `for`/`while` loop at all", () => {
        for (const { name, text } of codeOf()) {
            expect(text.match(/\b(?:for|while)\s*\(/g) ?? [], name).toEqual([]);
        }
    });

    it("has no index cursor, depth counter, or split-on-delimiter helper", () => {
        // AP-1 / AP-6's tells: `depth++`, `let quote`, `source[i]`,
        // `splitTopLevel`, `splitBalanced`.
        const tells =
            /\bdepth\s*(?:\+\+|--|=[^=])|\blet\s+(?:depth|start|quote|cursor|token)\b|\w+\[i\]|splitTopLevel|splitBalanced/g;
        for (const { name, text } of codeOf()) {
            expect(text.match(tells) ?? [], name).toEqual([]);
        }
    });
});

describe("rule 4 — every regex is one token", () => {
    it("uses no `.*` or `.+` remainder capture", () => {
        for (const { name, text } of codeOf()) {
            expect(text.match(/\/[^/\n]*\.[*+][^/\n]*\//g) ?? [], name).toEqual([]);
        }
    });

    it("uses exactly ONE negated-class regex, and it is the balanced-group skip", () => {
        const matches = SOURCES.flatMap((name) => code(name).match(/\[\^[^\]]*\]/g) ?? []);
        // `[^()]+` inside `balancedGroup`: a value-DISCARDING skip inside a
        // recursive delimiter-balanced production, which MODULE-DAG invariant 4
        // permits — as distinct from a `[^)]*` remainder whose captured string
        // a second pass must re-parse. Nothing reads its value.
        expect(matches).toEqual(["[^()]"]);
    });

    it("has no capture group carrying structure — every group is non-capturing", () => {
        // Every regex literal in the sources, taken where it is introduced:
        // `regex(/…/)`, `new RegExp(/…/)`, or `const X = /…/`.
        const literals = SOURCES.flatMap((name) =>
            [
                ...code(name).matchAll(
                    /(?:regex\(|RegExp\(|=\s*)(\/(?:\\.|\[[^\]]*\]|[^/\n])+\/[a-z]*)/g,
                ),
            ].map((match) => match[1] ?? ""),
        );
        expect(literals.length).toBeGreaterThan(5);
        for (const literal of literals) {
            // Strip character classes (parens inside `[^()]` are literal) and
            // non-capturing groups; anything left is a capture group.
            const bare = literal.replace(/\[[^\]]*\]/g, "").replace(/\(\?:/g, "");
            expect(bare, literal).not.toMatch(/\(/);
        }
    });
});

describe("rules 5–9 — combinator discipline", () => {
    it("never calls `all()`, so `.opt()` inside `all()` is impossible by construction", () => {
        for (const { name, text } of codeOf()) {
            expect(text.match(/\ball\(/g) ?? [], name).toEqual([]);
        }
    });

    it("calls `Parser.lazy` exactly twice — one per back-edge", () => {
        expect(code("grammar.ts").match(/Parser\.lazy\(/g) ?? []).toHaveLength(2);
    });

    it("never memoizes — no process-wide packrat latch is armed", () => {
        for (const { name, text } of codeOf()) {
            expect(text.match(/memoize|mergeMemos|resetPackrat/g) ?? [], name).toEqual([]);
        }
    });

    it("never calls `chain`, and never calls `recover` on a single-value production", () => {
        for (const { name, text } of codeOf()) {
            expect(text.match(/\.chain\(|\.recover\(/g) ?? [], name).toEqual([]);
        }
    });
});

describe("rule 10 — the entry point is total", () => {
    it("never calls `Parser.parse()`; the root goes through `parseState` + `isError`", () => {
        const text = code("grammar.ts");
        expect(text.match(/\.parse\(/g) ?? []).toEqual([]);
        expect(text).toMatch(/\.parseState\(/);
        expect(text).toMatch(/state\.isError/);
    });

    it("ends the root in `.eof()`", () => {
        expect(code("grammar.ts")).toMatch(/\.eof\(\)/);
    });

    it("contains exactly one `try` — the disclosed stack-depth backstop", () => {
        const tries = SOURCES.flatMap((name) => code(name).match(/\btry\b/g) ?? []);
        expect(tries).toHaveLength(1);
    });
});

describe("the comment stripper's own assumption", () => {
    it("no source contains `//` or `/*` inside a string or regex literal", () => {
        for (const { name, text } of codeOf()) {
            expect(text.includes("//"), name).toBe(false);
            expect(text.includes("/*"), name).toBe(false);
        }
    });
});

describe("size", () => {
    it("reports the candidate's line counts", () => {
        const counts = SOURCES.map((name) => {
            const total = read(name).split("\n").length;
            const effective = code(name)
                .split("\n")
                .filter((line) => line.trim().length > 0).length;
            return { name, total, effective };
        });
        // Not a threshold — a receipt. The numbers below are the ones reported.
        expect(counts.map((entry) => entry.name)).toEqual([...SOURCES]);
        for (const entry of counts) {
            expect(entry.effective, entry.name).toBeLessThan(entry.total);
        }
        console.log(
            "CAND-B source:",
            counts.map((entry) => `${entry.name} ${entry.effective}/${entry.total}`).join("  ·  "),
            "| total effective",
            counts.reduce((sum, entry) => sum + entry.effective, 0),
        );
    });
});
