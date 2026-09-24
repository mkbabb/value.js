// SERVED MODEL: claude-opus-5-5
//
// X.P.W7 — the public contract "results are immutable", pinned. Since `.k2` (W7.md ADDENDUM
// 2026-09-24 §2, Cure 2) a node is BUILT frozen where it is constructed (the actions under
// `src/css/bbnf/`, the stylesheet layer's readers), and `success` (`src/css/result.ts`) freezes only
// its own envelope: nothing walks a result after it is built. So a construction site that forgets its
// freeze publishes a mutable node, and this test is what catches it — on hand-picked sources and on a
// sample of the real corpus through all seven entries.

import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import {
    parseCssColor,
    parseCssScalar,
    parseCssValue,
    parseCssValues,
    parseKeyframeSelector,
    parseStylesheet,
    parseTimingFunction,
} from "../../src/css/index";

function unfrozenPaths(value: unknown, path = "value", out: string[] = []): string[] {
    if (value === null || typeof value !== "object") return out;
    if (!Object.isFrozen(value)) out.push(path);
    for (const [key, child] of Object.entries(value)) unfrozenPaths(child, `${path}.${key}`, out);
    return out;
}

const CASES: ReadonlyArray<readonly [string, (source: string) => { ok: boolean; value?: unknown }, string]> = [
    ["parseKeyframeSelector", parseKeyframeSelector, "50%"],
    ["parseKeyframeSelector", parseKeyframeSelector, "from"],
    ["parseKeyframeSelector", parseKeyframeSelector, "TO"],
    ["parseKeyframeSelector", parseKeyframeSelector, "entry 25%"],
    ["parseCssScalar", parseCssScalar, "42"],
    ["parseCssScalar", parseCssScalar, "12.5%"],
    ["parseCssValue", parseCssValue, "1 2% calc(50% + 1px), 3 / 4"],
    ["parseCssValues", parseCssValues, "10% 20%"],
    ["parseCssColor", parseCssColor, "rgb(10% 20% 30% / 50%)"],
    ["parseCssColor", parseCssColor, "color-mix(in srgb, red 30%, blue)"],
    ["parseCssColor", parseCssColor, "oklch(0.5 0.1 120 / 0.8)"],
    ["parseTimingFunction", parseTimingFunction, "cubic-bezier(0.1, 0.2, 0.3, 0.4)"],
    ["parseTimingFunction", parseTimingFunction, "steps(3, jump-end)"],
    ["parseTimingFunction", parseTimingFunction, "linear(0, 0.5 25% 75%, 1)"],
    ["parseStylesheet", parseStylesheet, "@keyframes k { from { opacity: 0 } 50% { opacity: 0.5 } to { opacity: 1 } }"],
];

describe("published results are deeply frozen", () => {
    it.each(CASES)("%s — a parsed source", (_name, parse, source) => {
        const parsed = parse(source);
        expect(parsed.ok).toBe(true);
        expect(unfrozenPaths(parsed)).toEqual([]);
    });
});

const HERE = path.dirname(new URL(import.meta.url).pathname);

/** The real corpus (`bench/css-equivalence/real-corpus.json`, 3,049 sources): every entry, every source. */
const REAL: readonly string[] = JSON.parse(readFileSync(path.join(HERE, "../../bench/css-equivalence/real-corpus.json"), "utf8"))
    .rows.map((row: { s: string | { src: string } }) => (typeof row.s === "string" ? row.s : row.s.src));

const ENTRIES: ReadonlyArray<readonly [string, (source: string) => { ok: boolean; value?: unknown }]> = [
    ["parseCssColor", parseCssColor],
    ["parseCssScalar", parseCssScalar],
    ["parseCssValue", parseCssValue],
    ["parseCssValues", parseCssValues],
    ["parseKeyframeSelector", parseKeyframeSelector],
    ["parseTimingFunction", parseTimingFunction],
    ["parseStylesheet", parseStylesheet],
];

describe("sampled results are deeply frozen, every entry", () => {
    it.each(ENTRIES)("%s — the real corpus", (_name, parse) => {
        let accepted = 0;
        const unfrozen: string[] = [];
        for (const source of REAL) {
            const parsed = parse(source);
            if (!parsed.ok) continue;
            accepted++;
            for (const path of unfrozenPaths(parsed)) unfrozen.push(`${JSON.stringify(source).slice(0, 60)} ${path}`);
        }
        expect(accepted).toBeGreaterThan(0);
        expect(unfrozen.slice(0, 10)).toEqual([]);
    });
});
