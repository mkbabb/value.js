import assert from "node:assert/strict";
import { ParserState, type Parser } from "@mkbabb/parse-that/core";

type Candidate = {
    cssComments: Parser<{ error: null | "unexpected-eof" }>;
};

const entries = {
    h: "../foundation-g3/integration/grammar/css/l4/tokens/index.ts",
    b: "./candidates/b/index.ts",
    s: "./candidates/s/index.ts",
} as const;

const cases = [
    ["/**/x", 4, null],
    ["/**//**/x", 8, null],
    ["/*a*//*b*/tail", 10, null],
    ["/*a", 3, "unexpected-eof"],
    ["/**//*", 6, "unexpected-eof"],
    ["/*a*//*b", 8, "unexpected-eof"],
    ["/**/ /**/", 4, null],
] as const;

for (const [seat, entry] of Object.entries(entries)) {
    const candidate = await import(entry) as Candidate;
    const parser = candidate.cssComments;
    assert.ok(parser, `${seat}: missing cssComments`);
    const parserId = parser.id;

    for (const [source, offset, error] of cases) {
        const state = parser.parseState(source);
        assert.equal(state.isError, false, `${seat}:${source}`);
        assert.equal(state.offset, offset, `${seat}:${source}:offset`);
        assert.deepEqual(state.value, { error }, `${seat}:${source}:value`);
    }

    for (const source of ["", "x", "/", "/x", " */"]) {
        const predecessor = { seat, source };
        const state = new ParserState<{ error: null | "unexpected-eof" }>(
            source,
            predecessor as unknown as { error: null | "unexpected-eof" },
        );
        parser.call(state);
        assert.equal(state.isError, true, `${seat}:${source}:failure`);
        assert.equal(state.offset, 0, `${seat}:${source}:offset`);
        assert.equal(state.value, predecessor, `${seat}:${source}:predecessor`);
    }

    for (let index = 0; index < 10_000; index += 1) {
        assert.doesNotThrow(() => parser.parseState(index % 2 === 0 ? "/**//**/" : "/*"));
    }
    assert.equal(parser.id, parserId, `${seat}:parser identity`);

    const million = `/*${"a".repeat(1_000_000)}`;
    const scale = parser.parseState(million);
    assert.equal(scale.isError, false, `${seat}:scale error`);
    assert.equal(scale.offset, million.length, `${seat}:scale offset`);
    assert.deepEqual(scale.value, { error: "unexpected-eof" }, `${seat}:scale value`);
}

process.stdout.write(JSON.stringify({
    status: "PASS",
    seats: Object.keys(entries),
    exact_cases_per_seat: cases.length,
    transactional_failures_per_seat: 5,
    hostile_calls_per_seat: 10000,
    million_code_unit_cases_per_seat: 1
}) + "\n");
