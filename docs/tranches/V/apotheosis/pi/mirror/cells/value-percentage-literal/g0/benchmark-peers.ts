import { percentage as priorPercentage } from "../../../grammar/css/l4/value-unit.js";

type CssPercentage = {
    kind: "percentage";
    number: {
        sign: "+" | "-" | null;
        type: "integer" | "number";
        value: number;
    };
};

const liveNumericBranch = /^([+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?)%$/i;

function project(representation: string, value: number): CssPercentage {
    return {
        kind: "percentage",
        number: {
            sign: representation[0] === "+" ? "+" : representation[0] === "-" ? "-" : null,
            type: representation.includes(".") || /e/i.test(representation) ? "number" : "integer",
            value,
        },
    };
}

/** Operation-equivalent extraction of the current LIVE scalar regex's numeric arm. */
export function liveRegexPercentage(source: string): CssPercentage | null {
    const match = liveNumericBranch.exec(source);
    if (match === null) return null;
    const representation = match[1]!;
    const value = Number(representation);
    return Number.isFinite(value) ? project(representation, value) : null;
}

/** Operation-equivalent adapter over the rejected pre-reset direct percentage parser. */
export function priorPercentageParser(source: string): CssPercentage | null {
    const state = priorPercentage.parseState(source);
    if (state.isError || state.offset !== source.length) return null;
    return project(state.value.raw.slice(0, -1), state.value.value);
}
