/**
 * CANDIDATE S — the terminals, tested ON THEIR OWN.
 *
 * This is the formulation's headline claim: because `<number>`, `<percentage>`,
 * `<angle>`, `<hue>` and `<alpha-value>` are real, separately named
 * productions, they are separately testable — you find their defects here
 * rather than through a caller three levels up. The subject folds all five into
 * one `channelToken(token, percentScale, angle)` helper, which cannot be
 * addressed at all except through `parseCssColor`.
 *
 * The `<number>` terminal is additionally run against GROUND-C's salvaged
 * 49-case maximal-prefix corpus, entering at the recorded non-zero offsets.
 * Those fixtures carry no credit; they are inputs.
 */

import { ParserState } from "@mkbabb/parse-that";
import { describe, expect, it } from "vitest";

import {
    numberHostileGenerators,
    numberHostileNoThrow,
    numberPrefixCases,
} from "../fixtures/salvaged";
import { numberToken } from "./syntax-3";
import { alphaValue, angle, dashedIdent, hue, number, percentage } from "./values-4";

/** Enter a production at an arbitrary offset, exactly as a parent would. */
function callAt(source: string, offset: number): ParserState<unknown> {
    const state = new ParserState<unknown>(source, undefined, offset);
    return numberToken.call(state as ParserState<never>) as ParserState<unknown>;
}

/** A whole-input parse of one terminal — the shape every test below uses. */
function parseWhole<T>(
    parser: { parseState: (source: string) => { isError: boolean; value: T } },
    source: string,
): T | null {
    const state = parser.parseState(source);
    return state.isError ? null : state.value;
}

describe("css-syntax-3 §4.3.12 <number-token> — the numeric literal", () => {
    it("consumes the maximal legal prefix of all 49 salvaged cases", () => {
        const failures: string[] = [];

        for (const probe of numberPrefixCases) {
            const state = callAt(probe.source, probe.offset);

            if (probe.representation === null) {
                if (!state.isError) failures.push(`${probe.id}: wanted failure`);
                continue;
            }

            if (state.isError || state.offset !== probe.end || state.value !== probe.representation) {
                failures.push(
                    `${probe.id} ${JSON.stringify(probe.source)}@${probe.offset}: ` +
                        `wanted ${JSON.stringify(probe.representation)} to ${probe.end}, ` +
                        `got isError=${state.isError} ${JSON.stringify(state.value)} to ${state.offset}`,
                );
            }
        }

        expect(failures).toEqual([]);
        expect(numberPrefixCases.length).toBe(49);
    });

    it("re-derives every case's numeric value rather than trusting the fixture", () => {
        for (const probe of numberPrefixCases) {
            if (probe.representation === null || probe.expected === null) continue;
            expect(Object.is(Number(probe.representation), probe.expected.value)).toBe(true);
        }
    });

    it("does not throw on any hostile numeric input", () => {
        for (const probe of [...numberHostileNoThrow, ...numberPrefixCases]) {
            expect(() => callAt(probe.source, 0)).not.toThrow();
        }

        for (const generator of numberHostileGenerators) {
            const source = generator.build();
            expect(() => callAt(source, 0)).not.toThrow();
        }
    });
});

describe("css-values-4 §5.1 <number>", () => {
    it("accepts every spelling css-syntax-3 §4.3.12 admits", () => {
        expect(parseWhole(number, "0")).toBe(0);
        expect(parseWhole(number, "-1.5e2")).toBe(-150);
        expect(parseWhole(number, "+.5")).toBe(0.5);
        expect(Object.is(parseWhole(number, "-0"), -0)).toBe(true);
    });

    it("is NOT a <percentage> and NOT a <dimension> — the boundary is the token rule", () => {
        // `50` in `50%` is a <percentage-token>, so <number> must not take it.
        expect(number.parseState("50%").isError).toBe(true);
        // `1e` is `1` + the unit `e`: a <dimension-token>, not a <number>.
        expect(number.parseState("1e").isError).toBe(true);
        expect(number.parseState("1px").isError).toBe(true);
        expect(number.parseState("1-x").isError).toBe(true);
        // …but a following `-` that cannot start an ident IS a new number.
        expect(parseWhole(number, "1")).toBe(1);
    });
});

describe("css-values-4 §5.2 <percentage>", () => {
    it("is one token, so the `%` must be adjacent", () => {
        expect(parseWhole(percentage, "50%")).toBe(50);
        expect(parseWhole(percentage, "-12.5%")).toBe(-12.5);
        expect(percentage.parseState("50 %").isError).toBe(true);
        expect(percentage.parseState("50").isError).toBe(true);
    });
});

describe("css-values-4 §7.1 <angle>", () => {
    it("canonicalises all four units to degrees", () => {
        expect(parseWhole(angle, "120deg")).toBe(120);
        expect(parseWhole(angle, "0.5turn")).toBe(180);
        expect(parseWhole(angle, "200grad")).toBe(180);
        expect(parseWhole(angle, "3.14rad")).toBeCloseTo(179.9087, 3);
        expect(parseWhole(angle, "120DEG")).toBe(120);
    });

    it("requires the unit to be a WHOLE ident — `deg50` is not `deg`", () => {
        expect(angle.parseState("120deg50").isError).toBe(true);
        expect(angle.parseState("120degx").isError).toBe(true);
        expect(angle.parseState("120").isError).toBe(true);
        expect(angle.parseState("120px").isError).toBe(true);
    });
});

describe("css-color-4 §7.1 <hue>", () => {
    it("is <number> | <angle> — and NOTHING else", () => {
        expect(parseWhole(hue, "120")).toBe(120);
        expect(parseWhole(hue, "0.5turn")).toBe(180);
        // The subject accepts `50%` as a hue by routing it through the same
        // percent-scaled helper as every other channel. The production says no.
        expect(hue.parseState("50%").isError).toBe(true);
    });
});

describe("css-color-4 §4.1 <alpha-value>", () => {
    it("maps <percentage> onto 0..1 and passes <number> through", () => {
        expect(parseWhole(alphaValue, "0.5")).toBe(0.5);
        expect(parseWhole(alphaValue, "50%")).toBe(0.5);
        expect(parseWhole(alphaValue, "1")).toBe(1);
    });

    it("does not clamp — css-color-4 clamps at used-value time, not at parse time", () => {
        expect(parseWhole(alphaValue, "1.5")).toBe(1.5);
        expect(parseWhole(alphaValue, "-1")).toBe(-1);
    });

    it("has no empty spelling: the alpha tail cannot be satisfied by nothing", () => {
        expect(alphaValue.parseState("").isError).toBe(true);
        expect(alphaValue.parseState(" ").isError).toBe(true);
    });
});

describe("css-values-4 §3.2 <dashed-ident>", () => {
    it("requires the two-hyphen prefix", () => {
        expect(parseWhole(dashedIdent, "--brand")).toBe("--brand");
        expect(parseWhole(dashedIdent, "--")).toBe("--");
        expect(dashedIdent.parseState("-brand").isError).toBe(true);
        expect(dashedIdent.parseState("brand").isError).toBe(true);
    });
});

describe("every terminal is total", () => {
    const TERMINALS = { number, percentage, angle, hue, alphaValue, dashedIdent };
    const HOSTILE = [
        "",
        " ",
        "\t",
        "\n",
        "\0",
        "%",
        "-",
        "--",
        "+",
        ".",
        "e",
        "1e",
        "1e+",
        "..",
        "1.2.3.4.5",
        "\uD800",
        "\uDFFF",
        "∞",
        "9".repeat(4096),
        "-".repeat(4096),
    ];

    for (const [name, parser] of Object.entries(TERMINALS)) {
        it(`${name} never throws`, () => {
            for (const source of HOSTILE) {
                expect(() => parser.parseState(source), JSON.stringify(source)).not.toThrow();
            }
        });
    }
});
