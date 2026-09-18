import { ParserState } from "@mkbabb/parse-that/core";
import { parseCssScalar } from "../../../../../../../../../src/css/grammar.ts";
import { number as historicalNumber } from "../g7/authorities/historical-utils.ts";
import { numberValue as c14NumberValue } from "../../../../../../vnext/prototypes/c14-css/src/css/grammar/l4/value-unit.ts";
import { readFileSync } from "node:fs";

const corpus = JSON.parse(readFileSync(process.argv[2]!, "utf8"));
const classify = (raw: string) => ({ type: raw.includes(".") || /[eE]/.test(raw) ? "number" : "integer", sign: raw.startsWith("+") ? "+" : raw.startsWith("-") ? "-" : null });
const live = (raw: string) => {
    const value = parseCssScalar(raw);
    if (!value.ok || value.value.kind !== "scalar" || value.value.payload.type !== "number" || value.value.payload.unit !== "") return { ok: false, end: 0 };
    return { ok: true, end: raw.length, value: value.value.payload.value, ...classify(raw) };
};
const deposed = (raw: string) => {
    const state = new ParserState<any>(raw, undefined, 0); historicalNumber.call(state);
    if (state.isError) return { ok: false, end: state.offset };
    return { ok: true, end: state.offset, value: state.value, ...classify(raw.slice(0, state.offset)) };
};
const c14 = (raw: string) => {
    const state = new ParserState<any>(raw, undefined, 0); c14NumberValue.call(state);
    if (state.isError) return { ok: false, end: state.offset };
    return { ok: true, end: state.offset, value: state.value.value, ...classify(state.value.raw) };
};
const observations: Record<string, Record<string, unknown>> = { live_regex: {}, deposed: {}, c14: {} };
for (const row of corpus.cases) {
    observations.live_regex![row.id] = live(row.raw);
    observations.deposed![row.id] = deposed(row.raw);
    observations.c14![row.id] = c14(row.raw);
}
process.stdout.write(`${JSON.stringify({ schema: "value.pi.syntax-consume-number.g12.peer-observations/v1", observations })}\n`);
