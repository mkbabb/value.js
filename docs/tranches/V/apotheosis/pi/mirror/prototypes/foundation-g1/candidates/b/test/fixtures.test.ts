import { expect, it } from "vitest";

import baselineFixtures from "../../../../foundation-g0/fixtures.json" with { type: "json" };
import erratumFixtures from "../../../fixtures-erratum-01.json" with { type: "json" };
import repairFixtures from "../../../fixtures.json" with { type: "json" };
import {
    classifyCssUnit,
    cssComment,
    cssDimension,
    cssEscape,
    cssIdentifier,
    cssPercentage,
    cssString,
    cssTrivia,
    cssWhitespace,
} from "../index.js";

const baseline: any = baselineFixtures;
const erratum: any = erratumFixtures;
const repair: any = repairFixtures;

it("replays every frozen G0 success and failure fixture", () => {
    const valueSuccesses = [
        [cssEscape, baseline.escapeSuccess],
        [cssIdentifier, baseline.identifierSuccess],
        [cssString, baseline.stringSuccess],
        [cssPercentage, baseline.percentageSuccess],
        [cssDimension, baseline.dimensionSuccess],
    ] as const;
    for (const [parser, rows] of valueSuccesses) {
        for (const [source, value, offset] of rows) {
            expect(parser.parseState(source), source).toMatchObject({ isError: false, value, offset });
        }
    }

    for (const [source, offset] of baseline.commentSuccess) {
        expect(cssComment.parseState(source), source).toMatchObject({ isError: false, offset });
    }
    for (const [source, offset] of baseline.whitespaceSuccess) {
        expect(cssWhitespace.parseState(source), source).toMatchObject({ isError: false, offset });
    }
    for (const [source, offset] of baseline.triviaSuccess) {
        expect(cssTrivia.parseState(source), source).toMatchObject({ isError: false, offset });
    }

    const failureSets = [
        [cssEscape, baseline.escapeFailure],
        [cssIdentifier, baseline.identifierFailure],
        [cssString, baseline.stringFailure],
        [cssPercentage, baseline.percentageFailure],
        [cssDimension, baseline.dimensionFailure],
    ] as const;
    for (const [parser, sources] of failureSets) {
        for (const source of sources) {
            expect(parser.parseState(source), source).toMatchObject({ isError: true, offset: 0 });
        }
    }

    for (const [family, units] of Object.entries(baseline.units) as [string, string[]][]) {
        for (const unit of units) {
            expect(classifyCssUnit(unit.toUpperCase()), unit).toEqual({ unit, family });
        }
    }
});

it("replays every frozen G1 additive fixture", () => {
    for (const [source, value, offset] of repair.rawIdentifierAllowed) {
        expect(cssIdentifier.parseState(source), source).toMatchObject({ isError: false, value, offset });
    }
    for (const source of repair.rawIdentifierExcluded.filter(
        (candidate: string) => !erratum.removeRawIdentifierExcluded.includes(candidate),
    )) {
        expect(cssIdentifier.parseState(source), source).toMatchObject({ isError: true, offset: 0 });
    }
    for (const [source, value, offset] of repair.escapedIdentifierAllowed) {
        expect(cssIdentifier.parseState(source), source).toMatchObject({ isError: false, value, offset });
    }
    for (const [source, value, offset] of repair.stringDecodedEscapes) {
        expect(cssString.parseState(source), source).toMatchObject({ isError: false, value, offset });
    }
    for (const [source, unit, family, offset] of repair.dimensionBoundary) {
        expect(cssDimension.parseState(source), source).toMatchObject({
            isError: false,
            offset,
            value: { unit, family },
        });
    }
    for (const source of repair.dimensionFailure.filter(
        (candidate: string) => !erratum.removeDimensionFailure.includes(candidate),
    )) {
        expect(cssDimension.parseState(source), source).toMatchObject({ isError: true, offset: 0 });
    }
    for (const [source, value, offset] of erratum.addRawIdentifierAllowed) {
        expect(cssIdentifier.parseState(source), source).toMatchObject({ isError: false, value, offset });
    }
    for (const [source, unit, family, offset] of erratum.addDimensionBoundary) {
        expect(cssDimension.parseState(source), source).toMatchObject({
            isError: false,
            offset,
            value: { unit, family },
        });
    }
    for (const unit of repair.mutationProbeUnits) {
        const first = classifyCssUnit(unit)!;
        const expected = { ...first };
        first.unit = "poison";
        first.family = first.family === "angle" ? "length" : "angle";
        expect(classifyCssUnit(unit), unit).toEqual(expected);
    }
});
