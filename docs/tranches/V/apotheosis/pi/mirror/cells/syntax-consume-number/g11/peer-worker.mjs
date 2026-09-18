import { ParserState } from "@mkbabb/parse-that/core";
import { readFile } from "node:fs/promises";
import { parseCssScalar } from "../../../../../../../../../src/css/grammar.ts";
import { number as historicalNumber } from "../g7/authorities/historical-utils.ts";
import { numberValue as c14NumberValue } from "../../../../../../vnext/prototypes/c14-css/src/css/grammar/l4/value-unit.ts";

const corpus = JSON.parse(await readFile(process.argv[2], "utf8"));
const classify = (raw) => ({
    type: raw.includes(".") || /[eE]/.test(raw) ? "number" : "integer",
    sign: raw.startsWith("+") ? "+" : raw.startsWith("-") ? "-" : null,
});

function live(raw) {
    const executed = parseCssScalar(raw);
    if (!executed.ok || executed.value.kind !== "scalar" || executed.value.payload.type !== "number" || executed.value.payload.unit !== "") return { ok: false, end: 0 };
    return { ok: true, end: raw.length, value: executed.value.payload.value, ...classify(raw) };
}

function deposed(raw) {
    const state = new ParserState(raw, undefined, 0);
    historicalNumber.call(state);
    if (state.isError) return { ok: false, end: state.offset };
    const representation = raw.slice(0, state.offset);
    return { ok: true, end: state.offset, value: state.value, ...classify(representation) };
}

function c14(raw) {
    const state = new ParserState(raw, undefined, 0);
    c14NumberValue.call(state);
    if (state.isError) return { ok: false, end: state.offset };
    const executed = state.value;
    return { ok: true, end: state.offset, value: executed.value, ...classify(executed.raw) };
}

const observations = { live_regex: {}, deposed: {}, c14: {} };
for (const test of corpus.cases) {
    observations.live_regex[test.id] = live(test.raw);
    observations.deposed[test.id] = deposed(test.raw);
    observations.c14[test.id] = c14(test.raw);
}
process.stdout.write(`${JSON.stringify({ status: "PASS", observations })}\n`);
