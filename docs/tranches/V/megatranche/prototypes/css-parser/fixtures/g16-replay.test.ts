/**
 * G16 REPLAY — the one operation V·π actually accepted, against the salvaged
 * corpus, in this workspace, against the PUBLISHED `@mkbabb/parse-that@1.0.0`.
 *
 * `g16-accepted.ts` is a BYTE-IDENTICAL copy of
 * `pi/mirror/apotheosis/grammar/css/l4/value-unit/numeric.ts`.
 * SHA-256 `8c3ac689f2e24635216ac0499f23166996ac0136e0b6876e82a8da4f75eb95aa`
 * — verified equal to the acceptance record in `g16/acceptance.json`. It was
 * copied unmodified; the import specifier `@mkbabb/parse-that/core` resolves
 * here without edit, which is why the hash survives the copy.
 *
 * WHY THIS EXISTS. V·π's acceptance rested on 180 sealed cases that are now
 * permanently undecryptable. That means its central correctness claim is
 * UNREPLAYABLE on its own terms. This file re-establishes the claim against a
 * corpus transcribed independently in this session from the PUBLIC fixtures,
 * so the band can decide adopt/adapt/start-clean on evidence rather than on a
 * receipt it cannot open.
 *
 * This grants no acceptance credit. It measures one leaf.
 */

import { ParserState } from "@mkbabb/parse-that/core";
import { describe, expect, it } from "vitest";

import { consumeNumber } from "./g16-accepted.js";
import {
    numberHostileGenerators,
    numberHostileNoThrow,
    numberPrefixCases,
} from "./salvaged.js";

/** Enter the parser at a non-zero offset, exactly as a parent production would. */
function callAt(source: string, offset: number): ParserState<unknown> {
    const state = new ParserState<unknown>(source, undefined, offset);
    return consumeNumber.call(state as ParserState<never>) as ParserState<unknown>;
}

type Leaf = { sign: "+" | "-" | null; type: "integer" | "number"; value: number };

describe("G16 accepted operation vs the salvaged corpus", () => {
    it("satisfies every maximal-prefix case, including at non-zero entry offsets", () => {
        const failures: string[] = [];

        for (const c of numberPrefixCases) {
            const out = callAt(c.source, c.offset);

            if (c.expected === null) {
                // Transactional failure: error set, offset untouched.
                if (!out.isError || out.offset !== c.offset) {
                    failures.push(
                        `${c.id}: wanted transactional failure at ${c.offset}, got isError=${out.isError} offset=${out.offset}`,
                    );
                }
                continue;
            }

            const leaf = out.value as Leaf | undefined;
            if (
                out.isError ||
                out.offset !== c.end ||
                leaf?.sign !== c.expected.sign ||
                leaf?.type !== c.expected.type ||
                !Object.is(leaf?.value, c.expected.value)
            ) {
                failures.push(
                    `${c.id} ${JSON.stringify(c.source)}@${c.offset}: wanted end=${c.end} ${JSON.stringify(c.expected)}, got isError=${out.isError} end=${out.offset} ${JSON.stringify(leaf)}`,
                );
            }
        }

        expect(failures).toEqual([]);
        expect(numberPrefixCases.length).toBeGreaterThanOrEqual(45);
    });

    it("does not throw on any hostile input", () => {
        for (const c of numberHostileNoThrow) {
            expect(() => consumeNumber.parseState(c.source), c.id).not.toThrow();
        }
    });

    it("does not blow up on 32K-digit and 1M-unit inputs", () => {
        // NOT a benchmark. This asserts the ABSENCE of catastrophic
        // backtracking, nothing about speed. No warmup, no repetition, no
        // comparator — a timing number from this test would be meaningless.
        for (const g of numberHostileGenerators) {
            const source = g.build();
            expect(() => consumeNumber.parseState(source), g.id).not.toThrow();
        }
    });

    it("keeps one parser instance: no per-call construction", () => {
        // The regex terminal is a module-level const. If a candidate rebuilds
        // its parser per call, `id` changes and every parent's memo/dispatch
        // identity breaks. This is the property most easily lost in a rewrite.
        const before = consumeNumber.id;
        for (let i = 0; i < 1_000; i += 1) consumeNumber.parseState(`${i}`);
        expect(consumeNumber.id).toBe(before);
    });

    it("leaves the predecessor value untouched when it fails", () => {
        const predecessor = { sentinel: true };
        const state = new ParserState<unknown>("not-a-number", predecessor);
        const out = consumeNumber.call(state as ParserState<never>);

        expect(out).toBe(state);
        expect(out.isError).toBe(true);
        expect(out.offset).toBe(0);
        expect(out.value).toBe(predecessor);
    });
});

describe("G16 — the two decisions it does NOT make", () => {
    it("does not return the source extent or spelling, only the semantic leaf", () => {
        // `<dimension>` and `<percentage>` round-trip serialization need the raw
        // spelling ("1.0" vs "1", "+7" vs "7"). G16 discards it; the extent is
        // recoverable only from `state.offset`, which a `.map()` cannot see.
        // V·π called this "a harness observation, not a lexical result layer".
        // This band must make that call deliberately, not inherit it silently.
        const out = consumeNumber.parseState("1.0rem");
        expect(Object.keys(out.value as object)).toEqual(["sign", "type", "value"]);
        expect(out.value).toEqual({ sign: null, type: "number", value: 1 });
        // The spelling "1.0" is gone; only `type: "number"` survives to record
        // that a fraction was written.
    });

    it("propagates binary64 overflow as Infinity rather than deciding a policy", () => {
        const over = consumeNumber.parseState("1e309") as ParserState<Leaf>;
        expect(over.value.value).toBe(Infinity);
        const under = consumeNumber.parseState("-1e-324") as ParserState<Leaf>;
        expect(Object.is(under.value.value, -0)).toBe(true);
        // Neither is wrong — CSS clamps at used-value time — but a `value: number`
        // that can be ±Infinity is a contract this band should state out loud.
    });
});
