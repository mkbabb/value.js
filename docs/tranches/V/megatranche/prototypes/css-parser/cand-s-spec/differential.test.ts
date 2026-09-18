/**
 * CANDIDATE S — differential against the LIVE regex parser.
 *
 * GROUND-C §3.5 states the rule that makes a differential a gate rather than a
 * noise generator: the R1–R12 ledger is a CLOSED WHITELIST, and a disagreement
 * that is not on it is a defect in the REPLACEMENT. GROUND-C is also explicit
 * that the ledger is INCOMPLETE (R2/R5/R7/R12 have no fixtures), so this file
 * carries a second, separately-labelled table of divergences that are NOT on
 * the ledger — each one with its spec citation, so an adjudicator can check the
 * argument rather than take the claim.
 *
 * Two further GROUND-C warnings are obeyed here:
 *   · R6 is a VALUE divergence, not an accept/reject one. This differential
 *     compares the parsed value, not just `ok`.
 *   · R9 is BIDIRECTIONAL. The live parser both over-accepts (`rgb(255, 0 0)`)
 *     and under-accepts (`rgba(1, 2, 3, 50%)`), so a one-directional
 *     "we reject more" test would score it green while half of it is broken.
 */

import { describe, expect, it } from "vitest";

// The subject under replacement. It THROWS on the R1 class, which is why every
// call to it below is wrapped.
import { parseCssColor as liveParseCssColor } from "../../../../../../../src/css/grammar";
import { PRODUCTIONS } from "../denominator/productions";
import { liveDivergences } from "../fixtures/salvaged";
import { parseCssColor } from "./index";

type Snapshot = {
    readonly verdict: "ACCEPT" | "REJECT" | "THROW";
    readonly value: string | null;
};

const shape = (value: unknown): string => {
    if (value === null || typeof value !== "object") return String(value);
    const record: Record<string, unknown> = { ...value };
    return JSON.stringify([record["space"], record["channels"], record["alpha"]]);
};

function live(input: string): Snapshot {
    try {
        const outcome = liveParseCssColor(input);
        return outcome.ok
            ? { verdict: "ACCEPT", value: shape(outcome.value) }
            : { verdict: "REJECT", value: null };
    } catch {
        return { verdict: "THROW", value: null };
    }
}

function candidate(input: string): Snapshot {
    try {
        const outcome = parseCssColor(input);
        return outcome.ok
            ? { verdict: "ACCEPT", value: shape(outcome.value) }
            : { verdict: "REJECT", value: null };
    } catch {
        return { verdict: "THROW", value: null };
    }
}

/** Rows of the CLOSED whitelist — GROUND-C's own R-numbers. */
const LEDGER: Readonly<Record<string, string>> = Object.fromEntries(
    [
        // R1 — the shipping crash class. LIVE THROWS; a ParseResult library must not.
        ...[
            "rgb()", "oklch()", "hsl(  )", "hwb()", "rgba()", "hsla()", "lab()",
            "lch()", "oklab()", "color()", "foo()", "xyz()", "calc()", "url()",
            "rgb( )", "rgb(/)", "rgb( / )", "rgb(\t)", "rgb(\n)",
        ].map((input) => [input, "R1"]),

        // R3 — `[ / [<alpha-value> | none] ]?` admits no empty tail (= P-037).
        ...[
            "rgb(1 2 3 / )", "rgb(1,2,3,)", "rgb(1 2 3 /)", "rgb(1,2,3, )",
            "hsl(0 50% 50% /)", "color(srgb 1 0 0 /)", "color(srgb 1 0 0/)",
            "oklch(0.5 0.1 200 / )",
        ].map((input) => [input, "R3"]),

        // R6 — a bare <number> saturation/lightness IS a percentage (value-only).
        ...["hsl(120 50 50)", "hwb(120 10 20)"].map((input) => [input, "R6"]),

        // R9 — legacy is ALL-comma, modern is comma-free; both directions.
        ...[
            "rgb(255, 0 0)", "rgb(255 0, 0)", "hsl(120, 50% 50%)", "lab(50%, 0, 0)",
            "color(srgb, 1, 0, 0)",
            "rgba(1,2,3,0.5)", "rgb(1,2,3,0.5)", "rgba(50%,50%,50%,50%)",
            "hsla(120,50%,50%,0.5)", "hsl(120,50%,50%,0.5)", "rgba(1, 2, 3, 50%)",
            "hsla(120deg, 25%, 75%, 50%)", "rgba(1,2,3,50%)",
        ].map((input) => [input, "R9"]),

        // GROUND-A P-024 — the named tier-2 gap: `none` through xyz-d50.
        ...["color(xyz-d50 none 0.2 0.1)"].map((input) => [input, "P-024"]),
    ],
);

/**
 * Divergences NOT on the ledger. Each is a deliberate decision with a spec
 * citation. This table is the honest half of the differential: GROUND-C's
 * closed-whitelist rule would otherwise book every one of these as a defect in
 * this candidate, and the correct response is to argue them, not to hide them.
 */
const DECLARED: Readonly<Record<string, string>> = {
    // TIGHTENINGS — the live parser accepts, this candidate rejects.
    "hsl(50% 50% 50%)":
        "css-color-4 §7.2 — `[<hue> | none]`, and `<hue> = <number> | <angle>`. " +
        "A <percentage> is not a <hue>. The subject routes hue through the same " +
        "percent-scaled helper as every other channel, so it cannot express this.",
    "rgb(none, 2, 3)":
        "css-color-4 §7.1 — `<legacy-rgb-syntax>` names only <number>/<percentage>. " +
        "`none` is a modern-syntax component; legacy syntax has no missing components.",
    "rgb(1, 50%, 3)":
        "css-color-4 §7.1 — legacy is `<percentage>#{3}` OR `<number>#{3}`, uniform. " +
        "The subject rewrites commas to spaces before splitting, losing the distinction.",
    "hsl(120, 50, 50)":
        "css-color-4 §7.2 — `<legacy-hsl-syntax> = hsl(<hue>, <percentage>, " +
        "<percentage>, <alpha-value>?)`. A bare <number> S/L is a MODERN allowance only.",

    // LOOSENING — the live parser rejects, this candidate accepts.
    "rgb(1.5.5.5)":
        "css-syntax-3 §4.3.12 — `1.5.5.5` is THREE <number-token>s (`1.5`, `.5`, " +
        "`.5`): 'consume a number' takes at most one fraction part. Whitespace " +
        "between component values is insignificant, so this is `rgb(1.5 .5 .5)`. " +
        "Flagged in the report as the one row that would benefit from a browser witness.",

    // DELIBERATE MODEL DIFFERENCE — both accept, the value differs.
    "color(xyz-d50 0.4 0.2 0.1)":
        "The subject applies a D50→D65 Bradford adaptation inside the PARSER and " +
        "reports `space: xyz`. This candidate reports `space: xyz-d50` unadapted, " +
        "because adaptation is a colour operation (`src/color/anchors.ts` already " +
        "owns it) and folding it in here is precisely what makes `none` " +
        "unrepresentable — GROUND-A P-024. Integration cost: one branch at the " +
        "colour boundary.",
    "color(xyz-d50 0.4 0.2 0.1 / .5)":
        "As `color(xyz-d50 0.4 0.2 0.1)` — the alpha is incidental.",
};

const CORPUS: readonly string[] = [
    ...new Set([
        ...PRODUCTIONS.filter((production) => production.entry === "parseCssColor").flatMap(
            (production) => production.cases.map((probe) => probe.input),
        ),
        ...liveDivergences.map((row) => row.source),
        "hsl(50% 50% 50%)",
        "rgb(none, 2, 3)",
        "rgb(1, 50%, 3)",
        "hsl(120, 50, 50)",
        "rgb(1.5.5.5)",
        "rgb (1 2 3)",
        "color(--from-scan 1 0 0)",
        "rgba(1,2,3,50%)",
        "rgb(1,2,3, )",
        "oklch(0.5 0.1 200 / )",
        "color(srgb 1 0 0/)",
        "hsl(120deg50% 50%)",
        "#FFF",
        "#ffff",
        "tan",
        "tan(1)",
        "lab(50 20 -30)",
        "hwb(120 10 20)",
    ]),
];

const divergesOn = (input: string): boolean => {
    const before = live(input);
    const after = candidate(input);
    return before.verdict !== after.verdict || before.value !== after.value;
};

describe("differential — LIVE regex parser vs candidate S", () => {
    it("runs a corpus of 179 inputs", () => {
        expect(CORPUS.length).toBe(179);
    });

    it("every divergence is either on GROUND-C's closed ledger or declared", () => {
        const undeclared: string[] = [];

        for (const input of CORPUS) {
            if (!divergesOn(input)) continue;
            if (input in LEDGER || input in DECLARED) continue;
            undeclared.push(
                `${JSON.stringify(input)} live=${JSON.stringify(live(input))} ` +
                    `mine=${JSON.stringify(candidate(input))}`,
            );
        }

        expect(undeclared).toEqual([]);
    });

    it("has no dead rows — every ledger and declared row really does diverge", () => {
        for (const input of [...Object.keys(LEDGER), ...Object.keys(DECLARED)]) {
            expect(divergesOn(input), JSON.stringify(input)).toBe(true);
        }
    });

    it("accounts for all 50 divergences: 43 on the ledger, 7 declared", () => {
        const diverging = CORPUS.filter(divergesOn);
        expect(diverging.length).toBe(50);
        expect(diverging.filter((input) => input in LEDGER).length).toBe(43);
        expect(diverging.filter((input) => input in DECLARED).length).toBe(7);
    });

    it("agrees with the live parser on the other 129 inputs, VALUE included", () => {
        const agreeing = CORPUS.filter((input) => !divergesOn(input));
        expect(agreeing.length).toBe(129);

        // Spot-check that agreement is not vacuous: these carry real values.
        for (const input of ["#abc", "red", "rgb(50% 50% 50%)", "oklch(70% 0.15 200deg)"]) {
            expect(live(input).verdict).toBe("ACCEPT");
            expect(candidate(input).value).toBe(live(input).value);
        }
    });
});

describe("the R1 row, stated as the band states it", () => {
    it("LIVE throws on all ten salvaged crash inputs; the candidate throws on none", () => {
        const crashers = liveDivergences.filter((row) => row.rRow === "R1");
        expect(crashers.length).toBeGreaterThan(0);

        for (const row of crashers) {
            expect(live(row.source).verdict).toBe("THROW");
            expect(candidate(row.source).verdict).toBe("REJECT");
        }
    });
});

describe("R6 — the value divergence a `ok`-only differential cannot see", () => {
    it("`hsl(120 50 50)` differs in VALUE, not in verdict", () => {
        expect(live("hsl(120 50 50)").verdict).toBe("ACCEPT");
        expect(candidate("hsl(120 50 50)").verdict).toBe("ACCEPT");
        expect(candidate("hsl(120 50 50)").value).not.toBe(live("hsl(120 50 50)").value);
        // …and the candidate's value equals the percentage spelling's, which is
        // what "a <number> is interpreted as a percentage" means.
        expect(candidate("hsl(120 50 50)").value).toBe(candidate("hsl(120 50% 50%)").value);
    });
});
