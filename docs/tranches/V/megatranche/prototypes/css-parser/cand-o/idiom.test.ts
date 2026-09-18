/**
 * cand-O · the idiom, measured on cand-O's own source and on its own graph.
 *
 * GROUND-B wrote fifteen rules and eight anti-patterns. Prose compliance is
 * worth nothing, so this file re-measures them two ways.
 *
 * TEXTUALLY, with comments stripped first — measuring the prose that describes
 * an anti-pattern as if it were the anti-pattern is exactly the kind of green
 * GROUND-C catalogued (I-8, "green harnesses over unrecomputed expectations").
 * The postfix-`!` measure is GROUND-B's own regex `[A-Za-z_0-9)\]]!`, which
 * counted 72 non-null assertions in the incumbent `src/css/grammar.ts`.
 *
 * STRUCTURALLY, by walking the built combinator graph through `Parser.context`.
 * A grep cannot prove that no `.opt()` sits inside an `all()`; the graph can.
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { Parser } from "@mkbabb/parse-that";
import { describe, expect, it } from "vitest";

import { colorRoot, internals } from "./grammar";

const read = (name: string): string =>
    readFileSync(fileURLToPath(new URL(`./${name}`, import.meta.url)), "utf8");

/** Block comments, then whole-line `//` and jsdoc continuations. */
const stripComments = (source: string): string =>
    source
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .split("\n")
        .filter((line) => !/^\s*(?:\/\/|\*)/.test(line))
        .join("\n");

const SOURCES = ["ast.ts", "spec.ts", "grammar.ts", "index.ts"] as const;

const code = (name: string): string => stripComments(read(name));

const count = (haystack: string, pattern: RegExp): number =>
    haystack.match(pattern)?.length ?? 0;

describe("the idiom, measured textually", () => {
    it("strips comments before measuring — the measure is of code, not prose", () => {
        // grammar.ts's header names `memoize` and `components.length === 3` as
        // things it does NOT do. Measuring the header would score them as hits.
        expect(read("grammar.ts")).toContain("memoize()");
        expect(code("grammar.ts")).not.toContain("memoize");
    });

    it.each(SOURCES)("%s carries zero non-null assertions", (name) => {
        expect(count(code(name), /[A-Za-z_0-9)\]]!(?!=)/g)).toBe(0);
    });

    it.each(SOURCES)("%s carries no escape-hatch casts", (name) => {
        expect(count(code(name), /\bas any\b/g)).toBe(0);
        expect(count(code(name), /\bas unknown as\b/g)).toBe(0);
    });

    it("uses Parser.lazy exactly once — one back-edge, one lazy", () => {
        expect(count(code("grammar.ts"), /Parser\.lazy\(/g)).toBe(1);
    });

    it("never arms packrat", () => {
        // `memoize()` sets PACKRAT_ARMED process-wide and never disarms it, so
        // one decorative call taxes every parseState() in the host process.
        for (const name of SOURCES) {
            expect(count(code(name), /\bmemoize\b|\bmergeMemos\b/g)).toBe(0);
        }
    });

    it("never reads Parser.parse() — the one rule that buys totality", () => {
        for (const name of SOURCES) {
            expect(count(code(name), /\.parse\((?!State)/g)).toBe(0);
        }
        expect(count(code("index.ts"), /\.parseState\(/g)).toBe(1);
    });

    it("hand-rolls no cursor", () => {
        // AP-1: the incumbent's shipping crash came out of a hand-written index
        // loop (`splitTopLevel`), not out of its regexes.
        const source = code("grammar.ts");
        expect(count(source, /for\s*\(\s*let\s+\w+\s*=/g)).toBe(0);
        expect(count(source, /\bwhile\s*\(/g)).toBe(0);
        expect(count(source, /\.charCodeAt\(/g)).toBe(0);
    });

    it("keeps every regex terminal narrow — no `.*`, no `[^)]*` remainder", () => {
        const literals = code("grammar.ts").match(/regex\(\/.*?\/[a-z]*\)/g) ?? [];
        expect(literals.length).toBeGreaterThanOrEqual(8);
        for (const literal of literals) {
            expect(literal, literal).not.toMatch(/\.\*/);
            expect(literal, literal).not.toMatch(/\[\^\)\]/);
        }
    });

    it("expresses component arity in the combinator, never in a length check", () => {
        const source = code("grammar.ts");
        expect(count(source, /parts\.length|components\.length|values\.length/g)).toBe(0);

        // The only two `.length` reads in the file are of a hex token's own
        // digit count, AFTER the grammar has already restricted it to {3,4,6,8}.
        // They choose between spellings of one token; they do not count parsed
        // components. Pinned here so the exemption cannot quietly widen.
        const lengthReads = source.match(/\.length\s*(?:>|===)\s*\d/g) ?? [];
        expect(lengthReads).toEqual([".length > 4", ".length === 8"]);
    });
});

// ── The graph ───────────────────────────────────────────────────────────────

interface Walked {
    readonly byName: ReadonlyMap<string, number>;
    readonly nodes: readonly Parser<unknown>[];
    readonly childrenOf: ReadonlyMap<number, readonly Parser<unknown>[]>;
}

const walk = (root: Parser<unknown>): Walked => {
    const seen = new Set<number>();
    const nodes: Parser<unknown>[] = [];
    const byName = new Map<string, number>();
    const childrenOf = new Map<number, readonly Parser<unknown>[]>();
    const queue: Parser<unknown>[] = [root];

    while (queue.length > 0) {
        const node = queue.shift();
        if (node === undefined || seen.has(node.id)) continue;
        seen.add(node.id);
        nodes.push(node);

        const name = node.context?.name ?? "<anonymous>";
        byName.set(name, (byName.get(name) ?? 0) + 1);

        const children: Parser<unknown>[] = [];
        const { parser, args } = node.context ?? {};
        if (parser instanceof Parser) children.push(parser);
        for (const arg of args ?? []) {
            if (arg instanceof Parser) children.push(arg);
        }
        childrenOf.set(node.id, children);
        queue.push(...children);
    }

    return { byName, nodes, childrenOf };
};

describe("the idiom, measured structurally", () => {
    const graph = walk(colorRoot);

    it("reaches a graph worth measuring", () => {
        expect(graph.nodes.length).toBeGreaterThan(100);
    });

    it("has no `opt` directly inside an `all` — the tuple-shift trap", () => {
        // all() DROPS `undefined` arms at runtime while TypeScript keeps the
        // position, so one `.opt()` inside an `all()` silently renumbers every
        // later element. A grep cannot see this; the graph can.
        const offenders = graph.nodes
            .filter((node) => node.context?.name === "all")
            .flatMap((node) => graph.childrenOf.get(node.id) ?? [])
            .filter((child) => child.context?.name === "opt");
        expect(offenders).toEqual([]);
    });

    it("contains exactly one lazy node — one back-edge in the whole grammar", () => {
        expect(graph.byName.get("lazy")).toBe(1);
    });

    it("contains no memoize node", () => {
        expect(graph.byName.get("memoize")).toBeUndefined();
        expect(graph.byName.get("mergeMemo")).toBeUndefined();
    });

    it("contains no debug or recover node — neither belongs in a single-value grammar", () => {
        // GROUND-B: `recover(sync, sentinel)` earns its place in list-shaped
        // grammars. The correct answer to a malformed <color> is one failure.
        expect(graph.byName.get("debug")).toBeUndefined();
        expect(graph.byName.get("recover")).toBeUndefined();
    });

    it("dispatches twice — first char, then function head", () => {
        expect(graph.byName.get("dispatch")).toBe(2);
    });
});

describe("the lookup tables cannot answer for Object.prototype", () => {
    it("the keyword table is null-prototype", () => {
        expect(Object.getPrototypeOf(internals.KEYWORD_PARSERS)).toBeNull();
        for (const key of [
            "constructor",
            "toString",
            "hasOwnProperty",
            "valueOf",
            "__proto__",
            "prototype",
        ]) {
            expect(internals.KEYWORD_PARSERS[key]).toBeUndefined();
        }
    });

    it("the colourspace table is null-prototype", () => {
        expect(Object.getPrototypeOf(internals.PREDEFINED_PARSERS)).toBeNull();
        for (const key of ["constructor", "toString", "__proto__"]) {
            expect(internals.PREDEFINED_PARSERS[key]).toBeUndefined();
        }
    });

    it("holds 169 keywords: 148 named + 19 system + transparent + currentcolor", () => {
        expect(Object.keys(internals.KEYWORD_PARSERS)).toHaveLength(169);
    });

    it("holds 9 <colorspace> names", () => {
        expect(Object.keys(internals.PREDEFINED_PARSERS)).toHaveLength(9);
    });
});
