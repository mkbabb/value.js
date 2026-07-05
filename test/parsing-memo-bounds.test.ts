// W1-5 (S.W1 · perf-general §4 / lib-parsing F-6) — the 7 memoized parsing entry
// points are keyed on the raw input string, so a sustained interactive session
// (slider/spectrum drag, gradient editing) emits a stream of near-unique
// high-precision strings — each a permanent, never-evicted `Map` key without a
// bound (the code-provable memory-growth vector). Every cache now carries
// `maxCacheSize: PARSE_MEMO_MAX_ENTRIES`; these gates flood each one past the cap
// and assert the LRU eviction holds the size at the bound.

import { describe, expect, it } from "vitest";

import {
    parseCSSPercent,
    parseCSSTime,
    parseCSSValue,
} from "../src/parsing/index";
import { parseCSSColor } from "../src/parsing/color";
import { parseCSSValueUnit } from "../src/parsing/units";
import { parseCSSStylesheet } from "../src/parsing/stylesheet";
import { parseAnimationShorthand } from "../src/parsing/animation-shorthand";
import { PARSE_MEMO_MAX_ENTRIES } from "../src/parsing/utils";

const OVERFLOW = PARSE_MEMO_MAX_ENTRIES + 500; // flood past the bound

describe("W1-5 — memoize caches are bounded (no unbounded memory growth)", () => {
    it("PARSE_MEMO_MAX_ENTRIES matches the normalize.ts precedent (4096)", () => {
        expect(PARSE_MEMO_MAX_ENTRIES).toBe(4096);
    });

    const cases: [string, (i: number) => unknown, { cache: { size: number } }][] = [
        ["parseCSSValue", (i) => parseCSSValue(`${i}px`), parseCSSValue],
        ["parseCSSValueUnit", (i) => parseCSSValueUnit(`${i}px`), parseCSSValueUnit],
        ["parseCSSColor", (i) => parseCSSColor(`hsl(${i} 50% 50%)`), parseCSSColor],
        ["parseCSSPercent", (i) => parseCSSPercent(`${i}%`), parseCSSPercent],
        ["parseCSSTime", (i) => parseCSSTime(`${i}ms`), parseCSSTime],
        [
            "parseCSSStylesheet",
            (i) => parseCSSStylesheet(`.c${i} { color: red; }`),
            parseCSSStylesheet,
        ],
        [
            "parseAnimationShorthand",
            (i) => parseAnimationShorthand(`spin ${i}ms linear`),
            parseAnimationShorthand,
        ],
    ];

    for (const [name, parseOne, fn] of cases) {
        it(`${name} caps its cache at PARSE_MEMO_MAX_ENTRIES under a unique-input flood`, () => {
            for (let i = 0; i < OVERFLOW; i++) parseOne(i);
            // Every insert past the bound evicts the LRU head, so the cache size
            // is pinned to the cap — never the ${OVERFLOW} unique keys fed in.
            expect(fn.cache.size).toBe(PARSE_MEMO_MAX_ENTRIES);
        });
    }
});
