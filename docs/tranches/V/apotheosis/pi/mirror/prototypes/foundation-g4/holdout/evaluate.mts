import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

import * as H from "../../foundation-g3/integration/grammar/css/l4/tokens/index.ts";
import * as B from "../candidates/b/index.ts";
import * as S from "../candidates/s/index.ts";

type Operation = "cssEscape" | "cssIdentifier" | "cssString" | "cssWhitespace" | "cssComments";
type Case = Readonly<{
    id: string;
    operation: Operation;
    input: string;
    offset?: number;
    result?: unknown;
    failure?: true;
}>;
type State = Readonly<{ value: unknown; offset: number; isError: boolean }>;
type Parser = Readonly<{ parseState(input: string): State }>;
type Seat = Readonly<Record<Operation, Parser>>;

const fixtureUrl = new URL("./cases.json", import.meta.url);
const fixtureBytes = await readFile(fixtureUrl);
const evaluatorBytes = await readFile(fileURLToPath(import.meta.url));
const fixture = JSON.parse(fixtureBytes.toString("utf8")) as { schema: number; cases: Case[] };

assert.equal(fixture.schema, 1, "unsupported holdout schema");
assert.ok(fixture.cases.length > 0, "holdout must not be empty");
assert.equal(new Set(fixture.cases.map(({ id }) => id)).size, fixture.cases.length, "case ids must be unique");

const operations: readonly Operation[] = [
    "cssEscape",
    "cssIdentifier",
    "cssString",
    "cssWhitespace",
    "cssComments",
];
const seats = { H, B, S } as unknown as Readonly<Record<"H" | "B" | "S", Seat>>;
const sha256 = (data: string | Uint8Array): string => createHash("sha256").update(data).digest("hex");
const stable = (value: unknown): string => JSON.stringify(value, (_key, item) => {
    if (item === null || typeof item !== "object" || Array.isArray(item)) return item;
    return Object.fromEntries(Object.entries(item as Record<string, unknown>).sort(([a], [b]) => a.localeCompare(b)));
});

const operationTotals = Object.fromEntries(operations.map((operation) => [
    operation,
    fixture.cases.filter((test) => test.operation === operation).length,
]));
const seen = new Set(fixture.cases.map(({ operation }) => operation));
assert.deepEqual([...seen].sort(), [...operations].sort(), "every operation must have holdout coverage");

const summaries: Array<{ seat: string; passed: number; total: number; digest: string }> = [];
for (const [seatName, seat] of Object.entries(seats)) {
    for (const operation of operations) {
        assert.equal(typeof seat[operation]?.parseState, "function", `${seatName}.${operation} is not a parser`);
    }

    const normalized: unknown[] = [];
    for (const test of fixture.cases) {
        let state: State;
        try {
            state = seat[test.operation].parseState(test.input);
        } catch (error) {
            throw new Error(`${seatName}/${test.id} threw`, { cause: error });
        }

        if (test.failure) {
            assert.equal(state.isError, true, `${seatName}/${test.id}: expected transactional failure`);
            assert.equal(state.offset, 0, `${seatName}/${test.id}: failure did not roll back to entry offset`);
            normalized.push({ id: test.id, failure: true, offset: state.offset });
            continue;
        }

        assert.equal(state.isError, false, `${seatName}/${test.id}: unexpected parse failure`);
        assert.equal(state.offset, test.offset, `${seatName}/${test.id}: raw offset`);
        assert.deepEqual(state.value, test.result, `${seatName}/${test.id}: normalized result`);
        normalized.push({ id: test.id, failure: false, offset: state.offset, result: state.value });
    }

    summaries.push({
        seat: seatName,
        passed: fixture.cases.length,
        total: fixture.cases.length,
        digest: sha256(stable(normalized)),
    });
}

const report = {
    fixtureSha256: sha256(fixtureBytes),
    evaluatorSha256: sha256(evaluatorBytes),
    cases: fixture.cases.length,
    operationTotals,
    seats: summaries,
};
const suiteSha256 = sha256(stable(report));

console.log(JSON.stringify({ ...report, suiteSha256 }, null, 2));
