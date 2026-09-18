#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { canonicalize, compareCanonicalText, parseJsonStrict, validateJsonSchema } from "./json-contract.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const paths = {
    source: resolve(root, "api-contract.source.json"),
    schema: resolve(root, "api-contract.source.schema.json"),
    operations: resolve(root, "API-OPERATIONS.md"),
    waves: resolve(root, "waves/K-A.md"),
};
const NONE = "urn:vnext-api-schema:common:none";
const failures = [];

function fail(message) {
    failures.push(message);
}

function hash(value) {
    return createHash("sha256").update(value).digest("hex");
}

function clone(value) {
    return structuredClone(value);
}

function exactKeys(value, keys, label) {
    if (!value || typeof value !== "object" || Array.isArray(value)) {
        fail(`${label}: expected object`);
        return;
    }
    const expected = [...keys].sort();
    const actual = Object.keys(value).sort();
    if (canonicalize(actual) !== canonicalize(expected)) {
        fail(`${label}: keys ${actual.join(",")}; expected ${expected.join(",")}`);
    }
}

function unique(values, label) {
    if (new Set(values).size !== values.length) fail(`${label}: duplicate value`);
}

function parseMarkdown(source) {
    const http = [...source.matchAll(/^\| `([^`]+)` \| (GET|POST|PUT|PATCH|DELETE) \| `([^`]+)` \| (.*?) \| (.*?) \|$/gm)].map(
        (match) => ({
            id: match[1],
            method: match[2],
            path: match[3],
            authorityText: match[4].trim(),
            successText: match[5].trim(),
        }),
    );
    const block = source.match(/## Headless registry operations[\s\S]*?```text\n([\s\S]*?)```/);
    const headless = block?.[1].trim().split(/\n+/).filter(Boolean) ?? [];
    return { http, headless };
}

function statusVector(text) {
    const lead = text.match(/^\d+(?:\/\d+)?/)?.[0];
    return lead ? lead.split("/").map(Number) : [];
}

function hasToken(text, token) {
    return new RegExp(`(?:^|[; +])${token}(?:$|[; +])`).test(text);
}

function operationRefs(operation) {
    return [
        operation.request.pathSchema,
        operation.request.querySchema,
        operation.request.headerSchema,
        operation.request.bodySchema,
        ...operation.success.flatMap((response) => [response.schema, response.headerSchema]),
    ];
}

function validateProfiles(source) {
    const profileKeys = {
        authority: ["principals", "decision", "existence", "credentials"],
        policy: ["cache", "cors", "privacy", "idempotency", "cas"],
    };
    for (const [name, value] of Object.entries(source.profiles.authority)) {
        exactKeys(value, profileKeys.authority, `profiles.authority.${name}`);
        if (!value.principals.length) fail(`profiles.authority.${name}: principals empty`);
        unique(value.principals, `profiles.authority.${name}.principals`);
        unique(value.credentials, `profiles.authority.${name}.credentials`);
    }
    for (const [name, value] of Object.entries(source.profiles.policy)) {
        exactKeys(value, profileKeys.policy, `profiles.policy.${name}`);
        exactKeys(value.cache, ["mode", "directive", "vary"], `profiles.policy.${name}.cache`);
        exactKeys(value.cors, ["mode", "credentials", "origins"], `profiles.policy.${name}.cors`);
        exactKeys(value.privacy, ["classification", "redaction", "logging"], `profiles.policy.${name}.privacy`);
        exactKeys(value.idempotency, ["mode", "retention", "replay"], `profiles.policy.${name}.idempotency`);
        exactKeys(value.cas, ["mode", "failureStatuses"], `profiles.policy.${name}.cas`);
        unique(value.cache.vary, `profiles.policy.${name}.cache.vary`);
        unique(value.cas.failureStatuses, `profiles.policy.${name}.cas.failureStatuses`);
    }
    for (const [name, responses] of Object.entries(source.profiles.errors)) {
        if (!responses.length) fail(`profiles.errors.${name}: empty`);
        unique(responses.map(({ status }) => status), `profiles.errors.${name}.status`);
        for (const response of responses) {
            exactKeys(response, ["status", "schema", "media"], `profiles.errors.${name}.${response.status}`);
            if (response.status < 400 || response.status > 599) fail(`profiles.errors.${name}: invalid ${response.status}`);
            if (response.schema === NONE || !response.media.length) fail(`profiles.errors.${name}.${response.status}: missing problem body`);
        }
    }
}

function validateHttp(operation, canonical, profiles, knownWaves) {
    const label = `http.${operation.id}`;
    if (!canonical) {
        fail(`${label}: absent from API-OPERATIONS.md`);
        return;
    }
    if (operation.method !== canonical.method || operation.path !== canonical.path) {
        fail(`${label}: tuple ${operation.method} ${operation.path}; expected ${canonical.method} ${canonical.path}`);
    }
    if (operation.authorityText !== canonical.authorityText) fail(`${label}: authority text drift`);
    if (operation.successText !== canonical.successText) fail(`${label}: success text drift`);
    if (operation.service !== operation.id.split(".", 1)[0]) fail(`${label}: service/id mismatch`);
    if (!knownWaves.has(operation.owner)) fail(`${label}: unknown owner ${operation.owner}`);
    for (const [kind, name] of Object.entries(operation.profiles)) {
        if (!profiles[kind]?.[name]) fail(`${label}: unknown ${kind} profile ${name}`);
    }

    const expectsEtag = hasToken(canonical.authorityText, "E");
    const expectsKey = hasToken(canonical.authorityText, "I");
    if ((operation.preconditions.etag === "required-strong-if-match") !== expectsEtag) {
        fail(`${label}: If-Match binding disagrees with canonical authority cell`);
    }
    if ((operation.preconditions.idempotencyKey === "required-durable") !== expectsKey) {
        fail(`${label}: Idempotency-Key binding disagrees with canonical authority cell`);
    }
    const policy = profiles.policy[operation.profiles.policy];
    const errors = profiles.errors[operation.profiles.errors] ?? [];
    if (expectsEtag && policy?.cas.mode !== "strong-etag-required") fail(`${label}: E lacks strong CAS policy`);
    if (!expectsEtag && policy?.cas.mode === "strong-etag-required") fail(`${label}: CAS policy invents E`);
    if (expectsKey && policy?.idempotency.mode !== "durable-key") fail(`${label}: I lacks durable replay policy`);
    if (expectsEtag && ![412, 428].every((status) => errors.some((response) => response.status === status))) fail(`${label}: E lacks 412/428 errors`);
    if (!expectsEtag && [412, 428].some((status) => errors.some((response) => response.status === status))) fail(`${label}: non-CAS operation advertises ${errors.some((response) => response.status === 412) ? 412 : 428}`);
    if (operation.method === "GET" && policy?.idempotency.mode !== "safe-method") fail(`${label}: GET is not safe-method`);
    if (operation.method !== "GET" && policy?.cache.directive !== "no-store") fail(`${label}: mutation cache is not no-store`);

    const parameters = [...operation.path.matchAll(/\{([^}]+)\}/g)].map((match) => match[1]);
    if ((operation.request.pathSchema === NONE) !== (parameters.length === 0)) fail(`${label}: path schema/parameter mismatch`);
    if ((operation.request.bodySchema === NONE) !== (operation.request.media.length === 0)) fail(`${label}: body schema/media mismatch`);
    if ((operation.method === "GET" || operation.method === "DELETE") && operation.request.bodySchema !== NONE) {
        fail(`${label}: GET/DELETE body is forbidden by this contract`);
    }
    if (operation.method === "GET" && operation.preconditions.idempotencyKey !== "not-used") fail(`${label}: GET key state is not-used`);
    if (operation.method !== "GET" && operation.request.headerSchema === NONE) fail(`${label}: mutation headers are untyped`);
    exactKeys(operation.preconditions.credentialBindings, ["inputs", "outputs", "secretHandling"], `${label}.credentialBindings`);
    unique(operation.preconditions.credentialBindings.inputs, `${label}.credentialBindings.inputs`);
    unique(operation.preconditions.credentialBindings.outputs, `${label}.credentialBindings.outputs`);
    if (operation.preconditions.credentialBindings.secretHandling !== "never-url-query-log-audit-cache-or-idempotency-receipt") fail(`${label}: secret handling is not fail-closed`);
    if (canonical.authorityText.includes("Session") && !operation.preconditions.credentialBindings.inputs.includes("secure-session-cookie")) fail(`${label}: session credential is not bound`);
    if (canonical.authorityText.includes("Resource") && !operation.preconditions.credentialBindings.inputs.includes("Authorization: Resource")) fail(`${label}: resource credential is not bound`);
    if (canonical.successText.includes("Set-Cookie") && !operation.preconditions.credentialBindings.outputs.some((value) => value.startsWith("Set-Cookie:"))) fail(`${label}: Set-Cookie output is not bound`);

    const expectedStatuses = statusVector(canonical.successText);
    const actualStatuses = operation.success.map(({ status }) => status);
    if (canonicalize(actualStatuses) !== canonicalize(expectedStatuses)) {
        fail(`${label}: success statuses ${actualStatuses}; expected ${expectedStatuses}`);
    }
    unique(actualStatuses, `${label}.success.status`);
    for (const response of operation.success) {
        if (response.status === 204) {
            if (response.schema !== NONE || response.media.length) fail(`${label}: 204 carries a body`);
        } else if (response.schema === NONE || !response.media.length) {
            fail(`${label}: ${response.status} lacks typed media`);
        }
        if (response.headerSchema === NONE) fail(`${label}: ${response.status} response headers are untyped`);
    }
    if (!operation.consumers.length) fail(`${label}: no named consumer`);
    if (!operation.lifecycle.resource || !operation.lifecycle.transition || !operation.lifecycle.effect) fail(`${label}: incomplete lifecycle`);
    for (const reference of operationRefs(operation)) {
        if (!/^urn:vnext-api-schema:[a-z0-9.-]+:[a-z0-9-]+$/.test(reference)) fail(`${label}: invalid schema ref ${reference}`);
    }
}

function validateHeadless(operation, canonicalId, profiles, knownWaves) {
    const label = `headless.${operation.id}`;
    if (operation.id !== canonicalId) fail(`${label}: order/id differs from API-OPERATIONS.md (${canonicalId})`);
    if (operation.service !== operation.id.split(".", 1)[0]) fail(`${label}: service/id mismatch`);
    if (!knownWaves.has(operation.owner)) fail(`${label}: unknown owner ${operation.owner}`);
    if (!profiles.authority[operation.authorityProfile]) fail(`${label}: unknown authority profile ${operation.authorityProfile}`);
    if (!profiles.policy[operation.policyProfile]) fail(`${label}: unknown policy profile ${operation.policyProfile}`);
    if (operation.inputSchema === NONE || operation.outputSchema === NONE) fail(`${label}: input/output must both be typed`);
    if (!operation.idempotency.mode || !operation.idempotency.key || !operation.idempotency.replay) fail(`${label}: incomplete idempotency`);
    if (!operation.retry.mode || operation.retry.maximumAttempts < 1 || !operation.retry.poisonDisposition) fail(`${label}: incomplete retry`);
    if (!operation.lifecycle.resource || !operation.lifecycle.transition || !operation.lifecycle.effect) fail(`${label}: incomplete lifecycle`);
    if (!operation.consumers.length) fail(`${label}: no named consumer`);
    for (const reference of [operation.inputSchema, operation.outputSchema]) {
        if (!/^urn:vnext-api-schema:[a-z0-9.-]+:[a-z0-9-]+$/.test(reference)) fail(`${label}: invalid schema ref ${reference}`);
    }
}

function schemaBindings(expanded) {
    const bindings = new Map([
        [NONE, { reference: NONE, owner: "A01", slots: ["sentinel"], materialization: "built-in" }],
        ["urn:vnext-api-schema:protocol:problem", { reference: "urn:vnext-api-schema:protocol:problem", owner: "A01", slots: ["error"], materialization: "neutral-protocol" }],
    ]);
    const bind = (reference, owner, slot, generator) => {
        const existing = bindings.get(reference);
        if (existing) {
            if (existing.owner !== owner && ![NONE, "urn:vnext-api-schema:protocol:problem"].includes(reference)) {
                fail(`schema ref ${reference}: owners ${existing.owner}/${owner}`);
            }
            if (!existing.slots.includes(slot)) existing.slots.push(slot);
            return;
        }
        bindings.set(reference, { reference, owner, slots: [slot], materialization: generator });
    };
    for (const operation of expanded.http) {
        const generator = operation.service === "value" ? "A20" : "A23C";
        bind(operation.request.pathSchema, operation.owner, `${operation.id}:request.path`, generator);
        bind(operation.request.querySchema, operation.owner, `${operation.id}:request.query`, generator);
        bind(operation.request.headerSchema, operation.owner, `${operation.id}:request.headers`, generator);
        bind(operation.request.bodySchema, operation.owner, `${operation.id}:request.body`, generator);
        for (const response of operation.success) {
            bind(response.schema, operation.owner, `${operation.id}:response.${response.status}.body`, generator);
            bind(response.headerSchema, operation.owner, `${operation.id}:response.${response.status}.headers`, generator);
        }
        for (const response of operation.errors) bind(response.schema, "A01", `${operation.id}:error.${response.status}`, generator);
    }
    for (const operation of expanded.headless) {
        const generator = operation.service === "value" ? "A20" : "A23C";
        bind(operation.inputSchema, operation.owner, `${operation.id}:input`, generator);
        bind(operation.outputSchema, operation.owner, `${operation.id}:output`, generator);
    }
    return [...bindings.values()]
        .map((binding) => ({ ...binding, slots: binding.slots.sort() }))
        .sort((left, right) => compareCanonicalText(left.reference, right.reference));
}

const argv = process.argv.slice(2);
const args = new Set(argv.filter((arg) => !arg.startsWith("--source=")));
const sourceArguments = argv.filter((arg) => arg.startsWith("--source="));
for (const arg of args) if (!["--expanded", "--pretty"].includes(arg)) fail(`unknown argument ${arg}`);
if (sourceArguments.length > 1 || sourceArguments.some((arg) => arg.length === "--source=".length)) fail("--source requires one nonempty path");
if (sourceArguments.length === 1) paths.source = resolve(process.cwd(), sourceArguments[0].slice("--source=".length));
if (args.has("--expanded") && args.has("--pretty")) fail("choose only one of --expanded/--pretty");

const sourceText = readFileSync(paths.source);
const schemaText = readFileSync(paths.schema);
let source;
let schema;
let structurallyValid = false;
try {
    source = parseJsonStrict(sourceText);
    schema = parseJsonStrict(schemaText);
} catch (error) {
    fail(error.message);
}
if (source && schema) {
    const errors = validateJsonSchema(source, schema);
    for (const error of errors) fail(`schema ${error}`);
    structurallyValid = errors.length === 0;
}

let expanded;
let summary;
if (source && structurallyValid) {
    validateProfiles(source);
    const operationsText = readFileSync(paths.operations, "utf8");
    const markdown = parseMarkdown(operationsText);
    const knownWaves = new Set([...readFileSync(paths.waves, "utf8").matchAll(/^\| (A[0-9][0-9][A-Z]?) \|/gm)].map((match) => match[1]));
    if (source.http.length !== 130 || source.headless.length !== 17) fail("closed operation counts differ from 130/17");
    if (source.http.filter(({ service }) => service === "value").length !== 89) fail("value HTTP count differs from 89");
    if (source.http.filter(({ service }) => service === "fourier").length !== 41) fail("Fourier HTTP count differs from 41");
    unique(source.http.map(({ id }) => id), "HTTP operation IDs");
    unique(source.http.map(({ service, method, path }) => `${service}:${method}:${path}`), "HTTP service/method/path tuples");
    unique(source.headless.map(({ id }) => id), "headless operation IDs");
    const canonicalById = new Map(markdown.http.map((operation) => [operation.id, operation]));
    source.http.forEach((operation) => validateHttp(operation, canonicalById.get(operation.id), source.profiles, knownWaves));
    for (const canonical of markdown.http) if (!source.http.some(({ id }) => id === canonical.id)) fail(`http.${canonical.id}: missing contract row`);
    source.headless.forEach((operation, index) => validateHeadless(operation, markdown.headless[index], source.profiles, knownWaves));
    for (const id of markdown.headless) if (!source.headless.some((operation) => operation.id === id)) fail(`headless.${id}: missing contract row`);

    expanded = {
        schema: "vnext.api-contract.expanded/1",
        sourceDocument: source.sourceDocument,
        runtimeBoundary: clone(source.runtimeBoundary),
        http: source.http.map((operation) => ({
            ...clone(operation),
            profileNames: clone(operation.profiles),
            authority: clone(source.profiles.authority[operation.profiles.authority]),
            policy: clone(source.profiles.policy[operation.profiles.policy]),
            errors: clone(source.profiles.errors[operation.profiles.errors]),
            profiles: undefined,
        })),
        headless: source.headless.map((operation) => ({
            ...clone(operation),
            authority: clone(source.profiles.authority[operation.authorityProfile]),
            policy: clone(source.profiles.policy[operation.policyProfile]),
        })),
    };
    for (const operation of expanded.http) delete operation.profiles;
    expanded.schemaBindings = schemaBindings(expanded);
    const httpVector = markdown.http.map(({ id, method, path, authorityText, successText }) => ({ id, method, path, authority: authorityText, success: successText }));
    summary = {
        schema: "vnext.api-contract.validation/1",
        sourceSha256: hash(sourceText),
        sourceSchemaSha256: hash(schemaText),
        canonicalHttpTupleSha256: hash(httpVector.map((operation) => JSON.stringify(operation)).join("\n")),
        canonicalHeadlessIdSha256: hash(markdown.headless.join("\n")),
        expandedHttpSha256: hash(canonicalize(expanded.http)),
        expandedHeadlessSha256: hash(canonicalize(expanded.headless)),
        schemaBindingsSha256: hash(canonicalize(expanded.schemaBindings)),
        expandedContractSha256: hash(canonicalize(expanded)),
        counts: { http: expanded.http.length, value: expanded.http.filter(({ service }) => service === "value").length, fourier: expanded.http.filter(({ service }) => service === "fourier").length, headless: expanded.headless.length, schemaBindings: expanded.schemaBindings.length },
        status: "valid",
    };
    for (const [label, digest] of [
        ["expanded HTTP", summary.expandedHttpSha256],
        ["expanded headless", summary.expandedHeadlessSha256],
        ["schema bindings", summary.schemaBindingsSha256],
        ["expanded contract", summary.expandedContractSha256],
    ]) {
        if (!operationsText.includes(`\`${digest}\``)) fail(`API-OPERATIONS.md: missing signed ${label} digest ${digest}`);
    }
}

if (failures.length) {
    process.stderr.write(`${failures.join("\n")}\n`);
    process.exit(1);
}
if (args.has("--expanded")) process.stdout.write(`${canonicalize(expanded)}\n`);
else if (args.has("--pretty")) process.stdout.write(`${JSON.stringify(expanded, null, 2)}\n`);
else process.stdout.write(`${JSON.stringify(summary, null, 2)}\n`);
