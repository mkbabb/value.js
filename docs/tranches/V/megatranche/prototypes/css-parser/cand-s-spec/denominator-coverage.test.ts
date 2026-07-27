/**
 * CANDIDATE S — coverage, MEASURED against GROUND-A's numbering.
 *
 * The coverage claim in the report is not a sentence; it is this file. Every
 * `parseCssColor` production in `denominator/productions.ts` is run through
 * this candidate with GROUND-A's own probe inputs, and each production is
 * classified by whether it meets the verdict THE PINNED SPEC OWES IT. The
 * resulting id lists are pinned, so drift in either direction fails the build.
 *
 * Three classifications, because the honest answer needs three:
 *
 *   CONFORMANT       every probe meets the spec's owed verdict at the
 *                    `parseCssColor` door (the subject's contract).
 *   SYNTAX_RECOGNISED
 *                    every probe parses at `parseColorSyntax`, and the value
 *                    door refuses it with the typed `color_context_required`
 *                    because resolving it needs information a context-free
 *                    parser does not have. This is strictly better than a
 *                    generic refusal and strictly worse than resolution.
 *   INCOMPLETE       at least one probe is not recognised at all.
 */

import { describe, expect, it } from "vitest";

import { PRODUCTIONS } from "../denominator/productions";
import { parseColorSyntax, parseCssColor } from "./index";

type Observed = "ACCEPT" | "REJECT" | "DEFERRED" | "THROW";

const atValueDoor = (input: string): Observed => {
    try {
        const outcome = parseCssColor(input);
        if (outcome.ok) return "ACCEPT";
        return outcome.code === "color_context_required" ? "DEFERRED" : "REJECT";
    } catch {
        return "THROW";
    }
};

const atSyntaxDoor = (input: string): Observed => {
    try {
        return parseColorSyntax(input).ok ? "ACCEPT" : "REJECT";
    } catch {
        return "THROW";
    }
};

/** The spec owes ACCEPT or REJECT; a typed refusal still counts as a refusal. */
const meetsOwed = (owed: string, observed: Observed): boolean =>
    owed === "ACCEPT"
        ? observed === "ACCEPT"
        : observed === "REJECT" || observed === "DEFERRED";

const COLOR_PRODUCTIONS = PRODUCTIONS.filter((p) => p.entry === "parseCssColor");

/**
 * PINNED. Moving a row requires re-running the classification below, which is
 * the only thing that can move it.
 */
const CONFORMANT: readonly string[] = [
    "P-001", "P-002", "P-003", "P-004", "P-005", "P-006",
    "P-009", "P-010", "P-011", "P-012", "P-013", "P-014", "P-015",
    "P-016", "P-017", "P-018", "P-019", "P-020", "P-021", "P-022",
    "P-023", "P-024", "P-025",
    "P-034", "P-035", "P-036", "P-037",
];

const SYNTAX_RECOGNISED: readonly string[] = [
    "P-007", "P-008", "P-026", "P-028", "P-029", "P-030", "P-031", "P-032",
];

const INCOMPLETE: readonly string[] = ["P-027", "P-033"];

describe("GROUND-A denominator — the colour section", () => {
    it("has 37 numbered productions, and the three classifications partition them", () => {
        expect(COLOR_PRODUCTIONS.map((p) => p.id).length).toBe(37);
        expect(
            [...CONFORMANT, ...SYNTAX_RECOGNISED, ...INCOMPLETE].slice().sort(),
        ).toEqual(COLOR_PRODUCTIONS.map((p) => p.id).slice().sort());
    });

    it("classifies exactly as pinned — 27 conformant at the value door", () => {
        const conformant: string[] = [];
        const syntaxRecognised: string[] = [];
        const incomplete: string[] = [];

        for (const production of COLOR_PRODUCTIONS) {
            const value = production.cases.every((probe) =>
                meetsOwed(probe.owed, atValueDoor(probe.input)),
            );
            const syntax = production.cases.every((probe) =>
                meetsOwed(probe.owed, atSyntaxDoor(probe.input)),
            );

            if (value) conformant.push(production.id);
            else if (syntax) syntaxRecognised.push(production.id);
            else incomplete.push(production.id);
        }

        expect(conformant).toEqual(CONFORMANT);
        expect(syntaxRecognised).toEqual(SYNTAX_RECOGNISED);
        expect(incomplete).toEqual(INCOMPLETE);
        expect(conformant.length).toBe(27);
    });

    it("holds every TIER-1 colour production — the no-regression mandate", () => {
        const tierOne = COLOR_PRODUCTIONS.filter((p) => p.tier === 1);
        expect(tierOne.length).toBe(24);

        for (const production of tierOne) {
            for (const probe of production.cases) {
                expect(
                    atValueDoor(probe.input),
                    `${production.id} ${JSON.stringify(probe.input)} owed ${probe.owed}`,
                ).toSatisfy((observed: Observed) => meetsOwed(probe.owed, observed));
            }
            expect(CONFORMANT).toContain(production.id);
        }
    });

    it("throws on NO probe in the whole colour section — 130 inputs", () => {
        const inputs = COLOR_PRODUCTIONS.flatMap((p) => p.cases.map((c) => c.input));
        expect(inputs.length).toBe(130);

        for (const input of inputs) {
            expect(atValueDoor(input), JSON.stringify(input)).not.toBe("THROW");
            expect(atSyntaxDoor(input), JSON.stringify(input)).not.toBe("THROW");
        }
    });

    it("records exactly which probes of the two INCOMPLETE productions miss", () => {
        const missing = COLOR_PRODUCTIONS.filter((p) => INCOMPLETE.includes(p.id)).flatMap(
            (p) =>
                p.cases
                    .filter((probe) => !meetsOwed(probe.owed, atSyntaxDoor(probe.input)))
                    .map((probe) => probe.input),
        );

        // Both misses are the SAME missing production: `<calc-sum>` as a colour
        // component (P-033). It is not implemented here because `Channel` would
        // have to widen to an unevaluated math node, and the right home for
        // that is a shared css-values-4 §10 production — not a colour-local one.
        expect(missing).toEqual([
            "oklch(from red calc(l * 1.2) c h)",
            "rgb(calc(1 + 1) 2 3)",
            "oklch(calc(0.5 * 2) 0.1 200)",
        ]);
    });
});
