import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

import { ParserState } from "@mkbabb/parse-that/core";
import { number as deposedNumber } from "../../g7/authorities/historical-utils.ts";
import { canonical, sha256 } from "./protocol.ts";
import { fail, repoRoot, type CandidateRow } from "./bindings.ts";

export type Sign = "+" | "-" | null;
export type NumberType = "integer" | "number";
export type Leaf = { sign: Sign; type: NumberType; value: number };
export type Observation = { end: number; leaf: Leaf };
export type Case = Leaf & { id: string; source: string; end: number; binary64_be_hex: string };
export type Lane = { id: string; run: (source: string) => Observation };

const bits = (value: number): string => {
    const bytes = Buffer.allocUnsafe(8);
    bytes.writeDoubleBE(value, 0);
    return bytes.toString("hex");
};

function assertLeaf(id: string, actual: unknown, expected: Case): asserts actual is Leaf {
    if (typeof actual !== "object" || actual === null || Object.getPrototypeOf(actual) !== Object.prototype) fail(`${id}: leaf prototype`);
    const object = actual as object;
    if (Object.isFrozen(object) || Object.isSealed(object) || !Object.isExtensible(object)) fail(`${id}: leaf mutability`);
    if (canonical(Reflect.ownKeys(object)) !== canonical(["sign", "type", "value"])) fail(`${id}: leaf keys`);
    const descriptors = Object.getOwnPropertyDescriptors(object);
    for (const key of ["sign", "type", "value"] as const) {
        const descriptor = descriptors[key];
        if (!descriptor || !descriptor.enumerable || !descriptor.configurable || !descriptor.writable
            || descriptor.get !== undefined || descriptor.set !== undefined || !Object.hasOwn(descriptor, "value")) fail(`${id}: ${key} descriptor`);
    }
    const leaf = actual as Leaf;
    if (leaf.sign !== expected.sign || leaf.type !== expected.type || bits(leaf.value) !== expected.binary64_be_hex) fail(`${id}: leaf semantics`);
}

export const deposed: Lane = {
    id: "deposed",
    run(source) {
        const state = new ParserState<number>(source, undefined, 0);
        deposedNumber.call(state);
        if (state.isError || typeof state.value !== "number") fail("deposed parser failure");
        const end = state.offset;
        const representation = source.slice(0, end);
        const first = representation[0];
        const sign: Sign = first === "+" || first === "-" ? first : null;
        const type: NumberType = representation.includes(".") || /[eE]/.test(representation) ? "number" : "integer";
        const leaf: Leaf = { sign, type, value: state.value };
        return { end, leaf };
    },
};

export async function loadCandidateLanes(rows: readonly CandidateRow[]): Promise<Lane[]> {
    return await Promise.all(rows.map(async (row): Promise<Lane> => {
        const module = await import(pathToFileURL(resolve(repoRoot, row.path)).href);
        const parser = module.consumeNumber;
        if (!parser || typeof parser.call !== "function") fail(`${row.id}: missing consumeNumber Parser`);
        return {
            id: row.id,
            run(source) {
                const state = new ParserState<Leaf>(source, undefined, 0);
                parser.call(state);
                if (state.isError || typeof state.value !== "object" || state.value === null) fail(`${row.id}: candidate parser failure`);
                return { end: state.offset, leaf: state.value };
            },
        };
    }));
}

function validateLane(lane: Lane, rows: readonly Case[]): void {
    for (const row of rows) {
        const observation = lane.run(row.source);
        if (observation.end !== row.end) fail(`${lane.id}/${row.id}: end ${observation.end} != ${row.end}`);
        assertLeaf(`${lane.id}/${row.id}`, observation.leaf, row);
    }
}

export function semanticValidation(candidates: readonly Lane[], manifest: any) {
    const common = manifest.corpus.common_domain as Case[];
    const corrected = manifest.corpus.corrected_only as Case[];
    validateLane(deposed, common);
    for (const lane of candidates) {
        validateLane(lane, common);
        validateLane(lane, corrected);
    }
    return {
        deposed: { common_domain: `PASS_${common.length}`, corrected_only: "NOT_RUN_NON_COMMON_DOMAIN" },
        candidates: Object.fromEntries(candidates.map((lane) => [lane.id, {
            common_domain: `PASS_${common.length}`,
            corrected_only: `PASS_${corrected.length}`,
        }])),
    };
}

export function checksumWork(lane: Lane, rows: readonly Case[], repetitions: number) {
    let sink = 0;
    for (let repetition = 0; repetition < repetitions; repetition++) for (let index = 0; index < rows.length; index++) {
        const observation = lane.run(rows[index]!.source);
        const leaf = observation.leaf;
        sink += observation.end * 3 + Math.abs(leaf.value) * ((index % 7) + 1)
            + (leaf.sign === "-" ? 11 : leaf.sign === "+" ? 7 : 5) + (leaf.type === "number" ? 13 : 17);
    }
    const operations = rows.length * repetitions;
    return { sink, operations, digest: sha256(canonical({ sink, operations })) };
}

export const validateDeposed = (rows: readonly Case[]): void => { validateLane(deposed, rows); };
