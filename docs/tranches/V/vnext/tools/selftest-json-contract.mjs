#!/usr/bin/env node
import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { assertSupportedJsonSchema, parseJsonStrict, validateJsonSchema } from "./json-contract.mjs";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
let schemas = 0;
for (const name of readdirSync(root).filter((name) => name.endsWith(".schema.json")).sort()) {
    assertSupportedJsonSchema(parseJsonStrict(readFileSync(resolve(root, name))), `#/${name}`);
    schemas += 1;
}
const cases = [
    [3, { type: "number", maximum: 2 }],
    [-1, { type: "number", minimum: 0 }],
    [[1, 2], { type: "array", maxItems: 1 }],
    [[], { type: "array", minItems: 1 }],
    [{}, { type: "object", minProperties: 1 }],
    [{ a: 1, b: 2 }, { type: "object", maxProperties: 1 }],
    ["ab", { type: "string", maxLength: 1 }],
    ["", { type: "string", minLength: 1 }],
];
const positives = [
    [2, { type: "number", maximum: 2, minimum: 2 }],
    [[1], { type: "array", maxItems: 1, minItems: 1 }],
    [{ a: 1 }, { type: "object", maxProperties: 1, minProperties: 1 }],
    ["a", { type: "string", maxLength: 1, minLength: 1 }],
];
for (const [value, schema] of positives) {
    const errors = validateJsonSchema(value, schema);
    if (errors.length) throw new Error(`exact bound rejected: ${errors.join(";")}`);
}
for (const [value, schema] of cases) if (validateJsonSchema(value, schema).length === 0) throw new Error(`bound survived: ${JSON.stringify(schema)}`);
for (const schema of [{ type: "string", mystery: true }, { type: "string", format: "email" }]) {
    let rejected = false;
    try { validateJsonSchema("x", schema); } catch { rejected = true; }
    if (!rejected) throw new Error("unsupported used schema keyword/format survived");
}
process.stdout.write(`${JSON.stringify({ schema: "vnext-json-contract-selftest/1", schemas, positive: positives.length, hostile: cases.length + 2 })}\n`);
