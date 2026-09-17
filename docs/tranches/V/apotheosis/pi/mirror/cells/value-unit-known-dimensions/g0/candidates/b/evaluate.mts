import assert from "node:assert/strict";

import { string } from "@mkbabb/parse-that/core";

import { knownDimension } from "./index.js";

const inventory = {
    length: [
        "px", "cm", "mm", "q", "in", "pc", "pt", "em", "rem", "ex",
        "rex", "cap", "rcap", "ch", "rch", "ic", "ric", "lh", "rlh",
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

assert.equal(Object.values(inventory).flat().length, 62);

for (const [family, units] of Object.entries(inventory)) {
    for (const unit of units) {
        const state = knownDimension.parseState(`1${unit},`);
        assert.equal(state.isError, false, `${unit} should parse`);
        assert.equal(state.offset, unit.length + 1, `${unit} should leave delimiter`);
        assert.deepEqual(state.value, {
            kind: "dimension",
            family,
            number: { sign: null, type: "integer", value: 1 },
            unit,
        });
    }
}

assert.deepEqual(knownDimension.parse("-1.5E2DpPx"), {
    kind: "dimension",
    family: "resolution",
    number: { sign: "-", type: "number", value: -150 },
    unit: "dppx",
});

for (const source of ["1pxrest", "1px-rest", "1px_", "1px\\78", "1pxé"]) {
    const state = knownDimension.parseState(source);
    assert.equal(state.isError, true, `${source} should fail`);
    assert.equal(state.offset, 0, `${source} should restore its entry offset`);
    assert.ok(state.furthest >= 3, `${source} should retain diagnostic progress`);
}

for (const source of ["1unknown", "1%", ".px"]) {
    const state = knownDimension.parseState(source);
    assert.equal(state.isError, true, `${source} should fail`);
    assert.equal(state.offset, 0, `${source} should roll back`);
}

assert.deepEqual(knownDimension.parse("-2fr"), {
    kind: "dimension",
    family: "flex",
    number: { sign: "-", type: "integer", value: -2 },
    unit: "fr",
});

const parent = string("(").next(knownDimension).skip(string(")")).eof();
assert.deepEqual(parent.parse("(+.5TURN)"), {
    kind: "dimension",
    family: "angle",
    number: { sign: "+", type: "number", value: 0.5 },
    unit: "turn",
});

console.log(JSON.stringify({ status: "PASS", units: 62, export: "knownDimension" }));
