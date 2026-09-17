import assert from "node:assert/strict";
import { ParserState, string } from "@mkbabb/parse-that/core";
import { knownDimension } from "./index.ts";

const inventory = {
    length: [
        "px", "cm", "mm", "q", "in", "pc", "pt",
        "em", "rem", "ex", "rex", "cap", "rcap", "ch", "rch", "ic", "ric", "lh", "rlh",
        "vw", "vh", "vi", "vb", "vmin", "vmax",
        "svw", "svh", "svi", "svb", "svmin", "svmax",
        "lvw", "lvh", "lvi", "lvb", "lvmin", "lvmax",
        "dvw", "dvh", "dvi", "dvb", "dvmin", "dvmax",
        "cqw", "cqh", "cqi", "cqb", "cqmin", "cqmax",
    ],
    angle: ["deg", "grad", "rad", "turn"],
    time: ["s", "ms"],
    frequency: ["hz", "khz"],
    resolution: ["dpi", "dpcm", "dppx", "x"],
    flex: ["fr"],
} as const;

let inventorySize = 0;
for (const [family, units] of Object.entries(inventory)) {
    for (const unit of units) {
        inventorySize++;
        const state = knownDimension.eof().parseState(`-2.5E+1${unit}`);
        assert.equal(state.isError, false, `${family}:${unit}`);
        assert.deepEqual(state.value, {
            kind: "dimension",
            family,
            number: { sign: "-", type: "number", value: -25 },
            unit,
        });
    }
}
assert.equal(inventorySize, 62);

const prefix = knownDimension.parseState("12px,");
assert.equal(prefix.isError, false);
assert.equal(prefix.offset, 4);
assert.equal(prefix.src.slice(prefix.offset), ",");

for (const source of ["1pxrest", "1px-rest", "1px_", String.raw`1px\78`, "1pxé"]) {
    const state = knownDimension.parseState(source);
    assert.equal(state.isError, true, source);
    assert.equal(state.offset, 0, source);
    assert.ok(state.furthest >= 3, source);
}

const prior = { untouched: true };
const rollback = new ParserState<any>("!7wat", prior, 1);
knownDimension.call(rollback);
assert.equal(rollback.isError, true);
assert.equal(rollback.offset, 1);
assert.ok(rollback.furthest >= 2);

const folded = knownDimension.eof().parseState("+3.0DVMaX");
assert.equal(folded.isError, false);
assert.deepEqual(folded.value, {
    kind: "dimension",
    family: "length",
    number: { sign: "+", type: "number", value: 3 },
    unit: "dvmax",
});

const negativeRanges = ["-1dppx", "-2fr"];
for (const source of negativeRanges) assert.equal(knownDimension.eof().parseState(source).isError, false);

const parent = string("[").next(knownDimension).skip(string("]")).eof();
const composed = parent.parseState("[6KHZ]");
assert.equal(composed.isError, false);
assert.equal(composed.value.family, "frequency");
assert.equal(composed.value.unit, "khz");

const fallback = knownDimension.or(string("7wat")).eof().parseState("7wat");
assert.equal(fallback.isError, false);
assert.equal(fallback.value, "7wat");

console.log(`candidate-s evaluator: ${inventorySize} units and all semantic probes passed`);
