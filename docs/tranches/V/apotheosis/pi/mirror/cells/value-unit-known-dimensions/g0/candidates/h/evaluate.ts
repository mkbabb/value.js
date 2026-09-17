import assert from "node:assert/strict";
import { ParserState, string } from "@mkbabb/parse-that/core";
import { knownDimension } from "./index.js";

const inventory = {
    length: "px cm mm q in pc pt em rem ex rex cap rcap ch rch ic ric lh rlh vw vh vi vb vmin vmax svw svh svi svb svmin svmax lvw lvh lvi lvb lvmin lvmax dvw dvh dvi dvb dvmin dvmax cqw cqh cqi cqb cqmin cqmax",
    angle: "deg grad rad turn",
    time: "s ms",
    frequency: "hz khz",
    resolution: "dpi dpcm dppx x",
    flex: "fr",
} as const;

let unitCount = 0;
for (const [family, units] of Object.entries(inventory)) {
    for (const unit of units.split(" ")) {
        const result = knownDimension.parse(`1${unit.toUpperCase()}`);
        assert.equal(result.family, family, unit);
        assert.equal(result.unit, unit, unit);
        unitCount++;
    }
}
assert.equal(unitCount, 62);

const success = knownDimension.parseState("-1.25e2DPCM,");
assert.equal(success.isError, false);
assert.equal(success.offset, 11);
assert.deepEqual(success.value, {
    kind: "dimension",
    family: "resolution",
    number: { sign: "-", type: "number", value: -125 },
    unit: "dpcm",
});

for (const source of ["1pxrest", "1px-rest", "1px_", "1px\\78", "1pxé"]) {
    const result = knownDimension.parseState(source);
    assert.equal(result.isError, true, source);
    assert.equal(result.offset, 0, source);
}

const sentinel = { sentinel: true };
const rollback = new ParserState("pre:1wat", sentinel, 4);
knownDimension.call(rollback as ParserState<never>);
assert.equal(rollback.isError, true);
assert.equal(rollback.offset, 4);
assert.ok(rollback.furthest > 4);

const parent = string("[").next(knownDimension).skip(string(",")).skip(string("]")).eof();
assert.deepEqual(parent.parse("[+2DVMin,]"), {
    kind: "dimension",
    family: "length",
    number: { sign: "+", type: "integer", value: 2 },
    unit: "dvmin",
});

assert.equal(knownDimension.parse("-1FR").family, "flex");

console.log("candidate h evaluator: ok");
