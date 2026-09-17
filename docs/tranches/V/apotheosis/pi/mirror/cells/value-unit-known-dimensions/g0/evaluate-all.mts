import { readFileSync } from "node:fs";

import { ParserState, string } from "@mkbabb/parse-that/core";

type Family = "length" | "angle" | "time" | "frequency" | "resolution" | "flex";
type FixtureManifest = {
    families: Record<Family, string[]>;
    numbers: string[];
    boundarySuccess: string[];
    boundaryFailure: string[];
    hostile: string[];
};

const fixtures = JSON.parse(readFileSync(new URL("./fixtures/manifest.json", import.meta.url), "utf8")) as FixtureManifest;
const candidates = {
    h: (await import("./candidates/h/index.ts")).knownDimension,
    b: (await import("./candidates/b/index.ts")).knownDimension,
    s: (await import("./candidates/s/index.ts")).knownDimension,
};

const caseVariant = (unit: string): string => [...unit]
    .map((character, index) => index % 2 === 0 ? character.toUpperCase() : character)
    .join("");

const numberShape = (representation: string) => ({
    sign: representation[0] === "+" ? "+" : representation[0] === "-" ? "-" : null,
    type: /[.eE]/.test(representation) ? "number" : "integer",
    value: Number(representation),
});

let successTransactions = 0;
let failureTransactions = 0;
let hostileTransactions = 0;

for (const [candidateId, parser] of Object.entries(candidates)) {
    if (parser === undefined) throw new Error(`${candidateId}: missing knownDimension export`);
    const parserId = parser.id;

    for (const [family, units] of Object.entries(fixtures.families) as Array<[Family, string[]]>) {
        for (const unit of units) {
            for (const representation of fixtures.numbers) {
                const spelledUnit = caseVariant(unit);
                const source = `${representation}${spelledUnit}`;
                const state = parser.parseState(source);
                const expectedNumber = numberShape(representation);
                if (state.isError || state.offset !== source.length
                    || state.value.kind !== "dimension" || state.value.family !== family
                    || state.value.unit !== unit
                    || state.value.number.sign !== expectedNumber.sign
                    || state.value.number.type !== expectedNumber.type
                    || !Object.is(state.value.number.value, expectedNumber.value)
                    || JSON.stringify(Object.keys(state.value)) !== JSON.stringify(["kind", "family", "number", "unit"])) {
                    throw new Error(`${candidateId}: success mismatch: ${source}`);
                }
                successTransactions += 1;
            }
        }
    }

    for (const source of fixtures.boundarySuccess) {
        const state = parser.parseState(source);
        const delimiterOffset = source.search(/[,)/ ;]/);
        if (state.isError || state.offset !== delimiterOffset) {
            throw new Error(`${candidateId}: delimiter boundary mismatch: ${source}`);
        }
        successTransactions += 1;
    }

    for (const source of fixtures.boundaryFailure) {
        const state = parser.parseState(source);
        if (!state.isError || state.offset !== 0) {
            throw new Error(`${candidateId}: identifier boundary mismatch: ${source}`);
        }
        failureTransactions += 1;
    }

    for (const source of fixtures.hostile) {
        let state;
        try {
            state = parser.parseState(source);
        } catch (error) {
            throw new Error(`${candidateId}: hostile throw: ${source}`, { cause: error });
        }
        if (!state.isError || state.offset !== 0) {
            throw new Error(`${candidateId}: hostile mismatch: ${source}`);
        }
        hostileTransactions += 1;
    }

    const entryState = new ParserState<unknown>("xx1PX,", { sentinel: candidateId });
    entryState.offset = 2;
    parser.call(entryState);
    if (entryState.isError || entryState.offset !== 5 || entryState.value.unit !== "px") {
        throw new Error(`${candidateId}: nonzero entry mismatch`);
    }

    const parent = parser.skip(string(",")).then(parser).parseState("1px,2em!");
    if (parent.isError || parent.offset !== 7
        || parent.value[0].unit !== "px" || parent.value[1].unit !== "em") {
        throw new Error(`${candidateId}: parent composition mismatch`);
    }

    for (let index = 0; index < 1_000; index += 1) parser.parseState(`${index}px`);
    if (parser.id !== parserId) throw new Error(`${candidateId}: parser identity changed`);
}

console.log(JSON.stringify({
    status: "PASS",
    candidates: Object.keys(candidates),
    unitCount: Object.values(fixtures.families).flat().length,
    successTransactions,
    failureTransactions,
    hostileTransactions,
}));
