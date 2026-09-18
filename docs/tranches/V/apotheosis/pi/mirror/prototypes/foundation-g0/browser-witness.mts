import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";

import { chromium } from "playwright";

const candidatePath = process.argv[2];
assert(candidatePath, "usage: tsx browser-witness.mts <candidate-index.ts>");

const candidate = await import(pathToFileURL(candidatePath).href) as {
    classifyCssUnit(unit: string): { unit: string; family: string } | null;
    cssDimension: { parseState(input: string): { isError: boolean; offset: number; value: unknown } };
};
const fixtures = JSON.parse(await readFile(new URL("./fixtures.json", import.meta.url), "utf8"));
const units = Object.values(fixtures.units).flat() as string[];

const browser = await chromium.launch({ headless: true });
try {
    const page = await browser.newPage();
    // Evaluate source text rather than a transpiled callback: tsx/esbuild's
    // function-name helper is a Node binding and must not leak into Chromium.
    const witness = await page.evaluate(`(() => {
        const browserUnits = ${JSON.stringify(units)};
        const parse = (source) => {
            try { return CSSNumericValue.parse(source).toString(); }
            catch { return null; }
        };
        return {
            userAgent: navigator.userAgent,
            units: Object.fromEntries(browserUnits.map((unit) => [unit, parse("1" + unit.toUpperCase())])),
            escapedPx: parse(String.raw\`1p\\78\`),
            unknown: parse("1madeup"),
        };
    })()`);

    for (const unit of units) {
        const classified = candidate.classifyCssUnit(unit.toUpperCase());
        assert(classified, `candidate rejected browser-recognized unit ${unit}`);
        assert.equal(classified.unit, unit);
        assert.equal(witness.units[unit], `1${unit}`);
    }
    assert.equal(witness.escapedPx, "1px");
    assert.equal(witness.unknown, null);
    const escaped = candidate.cssDimension.parseState(String.raw`1p\78`);
    assert.equal(escaped.isError, false);
    assert.equal(escaped.offset, 5);
    assert.deepEqual(escaped.value, {
        kind: "dimension",
        number: { sign: null, type: "integer", value: 1 },
        unit: "px",
        family: "length",
    });

    process.stdout.write(`${JSON.stringify({
        status: "PASS",
        userAgent: witness.userAgent,
        unitWitnesses: units.length,
        escapedUnitWitness: witness.escapedPx,
        unknownTypedUnit: witness.unknown,
    })}\n`);
} finally {
    await browser.close();
}
