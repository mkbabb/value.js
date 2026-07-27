/**
 * CANDIDATE S — the keyword productions, RE-DERIVED not asserted.
 *
 * GROUND-C §3.6's lesson: a fixture whose expected value is hand-typed and
 * never re-derived is an assertion wearing a test's clothes. So nothing here
 * types a colour value. The names come from the spec-scraped fixture, the
 * channels are recomputed from the table's own hex, and the two are compared to
 * what the parser produced.
 *
 * The 148-entry table is `src/css/named-colors.ts` — the subject's DATA, which
 * GROUND-A §2 measured as name-for-name identical to css-color-4 with zero
 * misses and zero extras. This band is replacing the parser, not the table, and
 * re-transcribing 148 hex triples would only add a transcription risk.
 */

import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

import { NAMED_COLORS } from "../../../../../../../src/css/named-colors";
import { SYSTEM_COLOR_NAMES } from "./color-4";
import { parseColorSyntax, parseCssColor } from "./index";

const fixture = (name: string): { count: number; names: string[] } =>
    JSON.parse(
        readFileSync(resolve(import.meta.dirname, "../fixtures", name), "utf8"),
    ) as { count: number; names: string[] };

const NAMED = fixture("css-color-4-named-colors.json");
const SYSTEM = fixture("css-color-4-system-colors.json");

describe("css-color-4 §6.1 <named-color>", () => {
    it("recognises exactly the spec's 148 names — no misses, no extras", () => {
        expect(NAMED.count).toBe(148);
        expect(Object.keys(NAMED_COLORS).slice().sort()).toEqual(NAMED.names.slice().sort());
    });

    it("parses all 148 in three spellings, with channels re-derived from the hex", () => {
        for (const name of NAMED.names) {
            const hex = NAMED_COLORS[name];
            expect(hex, name).toBeDefined();
            if (hex === undefined) continue;

            const expected = [
                Number.parseInt(hex.slice(1, 3), 16),
                Number.parseInt(hex.slice(3, 5), 16),
                Number.parseInt(hex.slice(5, 7), 16),
            ];

            for (const spelling of [
                name,
                name.toUpperCase(),
                name.slice(0, 1).toUpperCase() + name.slice(1),
            ]) {
                const outcome = parseCssColor(spelling);
                expect(outcome.ok, spelling).toBe(true);
                if (!outcome.ok) continue;
                expect(outcome.value.space).toBe("rgb");
                expect(outcome.value.channels).toEqual(expected);
                expect(outcome.value.alpha).toBe(1);
                expect(expected.every((channel) => Number.isInteger(channel))).toBe(true);
            }
        }
    });

    it("matches WHOLE ident tokens only — the keyword boundary", () => {
        expect(parseCssColor("green").ok).toBe(true);
        expect(parseCssColor("greenyellow").ok).toBe(true);
        // `green` must not match inside a longer ident, and no trailing junk.
        expect(parseCssColor("greenish").ok).toBe(false);
        expect(parseCssColor("green-").ok).toBe(false);
        expect(parseCssColor("green ").ok).toBe(true); // trailing whitespace only
        expect(parseCssColor("re").ok).toBe(false);
        expect(parseCssColor("redd").ok).toBe(false);
        expect(parseCssColor("red red").ok).toBe(false);
    });

    it("agrees with the hex production on the same colour", () => {
        const named = parseCssColor("rebeccapurple");
        const hex = parseCssColor("#663399");
        expect(named.ok && hex.ok).toBe(true);
        if (named.ok && hex.ok) expect(named.value).toEqual(hex.value);
    });
});

describe("css-color-4 §6.2 <system-color> and the two spec keywords", () => {
    it("carries exactly the spec's 19 system-colour names", () => {
        expect(SYSTEM.count).toBe(19);
        expect(SYSTEM_COLOR_NAMES.slice().sort()).toEqual(SYSTEM.names.slice().sort());
    });

    it("recognises every system colour and refuses it with the typed code", () => {
        for (const name of SYSTEM.names) {
            const syntax = parseColorSyntax(name);
            expect(syntax.ok, name).toBe(true);
            if (syntax.ok) expect(syntax.value.kind).toBe("system-color");

            const value = parseCssColor(name.toUpperCase());
            expect(value.ok).toBe(false);
            if (!value.ok) expect(value.code).toBe("color_context_required");
        }
    });

    it("treats `transparent` as `rgb(0 0 0 / 0)` and `currentColor` as context-dependent", () => {
        const transparent = parseCssColor("TRANSPARENT");
        expect(transparent.ok).toBe(true);
        if (transparent.ok) {
            expect(transparent.value.channels).toEqual([0, 0, 0]);
            expect(transparent.value.alpha).toBe(0);
        }

        const current = parseCssColor("currentColor");
        expect(current.ok).toBe(false);
        if (!current.ok) expect(current.code).toBe("color_context_required");
    });
});
