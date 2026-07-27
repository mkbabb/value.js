#!/usr/bin/env node
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { canonicalize, compareCanonicalText, parseJsonStrict, validateJsonSchema } from "./json-contract.mjs";
const root = resolve(dirname(fileURLToPath(import.meta.url)), ".."), paths = {
  source: resolve(root, "api-contract.source.json"),
  schema: resolve(root, "api-contract.source.schema.json"),
  operations: resolve(root, "API-OPERATIONS.md"),
  waves: resolve(root, "waves/K-A.md"),
  closureWaves: resolve(root, "waves/M-C.md"),
  facility: resolve(root, "API-FACILITY-ISOMORPHISM.json"),
  facilitySchema: resolve(root, "api-facility-isomorphism.schema.json")
}, NONE = "urn:vnext-api-schema:common:none", failures = [];
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
  if (!value || typeof value != "object" || Array.isArray(value)) {
    fail(`${label}: expected object`);
    return;
  }
  const expected = [...keys].sort(), actual = Object.keys(value).sort();
  canonicalize(actual) !== canonicalize(expected) && fail(`${label}: keys ${actual.join(",")}; expected ${expected.join(",")}`);
}
function unique(values, label) {
  new Set(values).size !== values.length && fail(`${label}: duplicate value`);
}
function parseMarkdown(source2) {
  const http = [...source2.matchAll(/^\| `([^`]+)` \| (GET|POST|PUT|PATCH|DELETE) \| `([^`]+)` \| (.*?) \| (.*?) \|$/gm)].map(
    (match) => ({
      id: match[1],
      method: match[2],
      path: match[3],
      authorityText: match[4].trim(),
      successText: match[5].trim()
    })
  ), headless = source2.match(/## Headless registry operations[\s\S]*?```text\n([\s\S]*?)```/)?.[1].trim().split(/\n+/).filter(Boolean) ?? [];
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
    ...operation.success.flatMap((response) => [response.schema, response.headerSchema])
  ];
}
function validateProfiles(source2) {
  const profileKeys = {
    authority: ["principals", "decision", "existence", "credentials"],
    policy: ["cache", "cors", "privacy", "idempotency", "cas"]
  };
  for (const [name, value] of Object.entries(source2.profiles.authority))
    exactKeys(value, profileKeys.authority, `profiles.authority.${name}`), value.principals.length || fail(`profiles.authority.${name}: principals empty`), unique(value.principals, `profiles.authority.${name}.principals`), unique(value.credentials, `profiles.authority.${name}.credentials`);
  for (const [name, value] of Object.entries(source2.profiles.policy))
    exactKeys(value, profileKeys.policy, `profiles.policy.${name}`), exactKeys(value.cache, ["mode", "directive", "vary"], `profiles.policy.${name}.cache`), exactKeys(value.cors, ["mode", "credentials", "origins"], `profiles.policy.${name}.cors`), exactKeys(value.privacy, ["classification", "redaction", "logging"], `profiles.policy.${name}.privacy`), exactKeys(value.idempotency, ["mode", "retention", "replay"], `profiles.policy.${name}.idempotency`), exactKeys(value.cas, ["mode", "failureStatuses"], `profiles.policy.${name}.cas`), unique(value.cache.vary, `profiles.policy.${name}.cache.vary`), unique(value.cas.failureStatuses, `profiles.policy.${name}.cas.failureStatuses`);
  for (const [name, responses] of Object.entries(source2.profiles.errors)) {
    responses.length || fail(`profiles.errors.${name}: empty`), unique(responses.map(({ status }) => status), `profiles.errors.${name}.status`);
    for (const response of responses)
      exactKeys(response, ["status", "schema", "media"], `profiles.errors.${name}.${response.status}`), (response.status < 400 || response.status > 599) && fail(`profiles.errors.${name}: invalid ${response.status}`), (response.schema === NONE || !response.media.length) && fail(`profiles.errors.${name}.${response.status}: missing problem body`);
  }
}
const processLocalValueCommands = [
  "value.color-name-proposal.create",
  "value.color-name-proposal.merge",
  "value.flag.create",
  "value.fork.create",
  "value.mix.create",
  "value.mix.materialize",
  "value.mix.revert",
  "value.palette.create",
  "value.revision.revert",
  "value.share.create",
  "value.tag.create",
  "value.tag.merge",
  "value.user.create",
  "value.variant.create",
  "value.variant.revert"
], durableFourierCommands = [
  "fourier.contour.create",
  "fourier.derivation.create",
  "fourier.image.create",
  "fourier.job.bases",
  "fourier.job.epicycles",
  "fourier.job.equation",
  "fourier.job.extract-contour",
  "fourier.job.simplification",
  "fourier.revision.revert",
  "fourier.visualization.create",
  "fourier.visualization.restore"
], cursorOperationIds = [
  "fourier.audit.list",
  "fourier.contour.list",
  "fourier.derivation.list",
  "fourier.image.list",
  "fourier.job.list",
  "fourier.revision.list",
  "fourier.visualization.list-search",
  "value.audit.list",
  "value.color-name-proposal.list",
  "value.color-name.list",
  "value.featured.list",
  "value.flag.list",
  "value.fork.list",
  "value.mix.list",
  "value.mix.revision-list",
  "value.palette.list-search",
  "value.palette.mine",
  "value.palette.trash-list",
  "value.revision.list",
  "value.share.list",
  "value.tag.list",
  "value.user.list",
  "value.variant.list",
  "value.variant.revision-list"
];
function validateCursorContract(source2) {
  const cursor = source2.cursorContract;
  exactKeys(cursor, ["mode", "invalidStatus", "invalidProblemType", "implicitRestart", "operationIds"], "cursorContract"), cursor.mode !== "authenticated-query-and-sort-bound-keyset" && fail("cursorContract.mode: cursor is not query/sort-bound keyset"), (cursor.invalidStatus !== 400 || cursor.invalidProblemType !== "urn:contract:cursor-invalid") && fail("cursorContract: invalid cursor must be typed 400"), cursor.implicitRestart !== "forbidden" && fail("cursorContract: implicit restart is not forbidden"), exactArray(cursor.operationIds, cursorOperationIds, "cursorContract.operationIds");
  const byId = new Map(source2.http.map((operation) => [operation.id, operation]));
  for (const id of cursor.operationIds) {
    const operation = byId.get(id);
    if (!operation) {
      fail(`cursorContract.${id}: unknown operation`);
      continue;
    }
    operation.method !== "GET" && fail(`cursorContract.${id}: cursor operation is not GET`), operation.request.querySchema === NONE && fail(`cursorContract.${id}: cursor query is untyped`), (source2.profiles.errors[operation.profiles.errors] ?? []).some(({ status }) => status === 400) || fail(`cursorContract.${id}: typed 400 is absent`);
  }
}
function exactArray(actual, expected, label) {
  if (!Array.isArray(actual)) {
    fail(`${label}: expected array`);
    return;
  }
  if (canonicalize(actual) !== canonicalize(expected)) {
    const actualSet = new Set(actual), expectedSet = new Set(expected);
    fail(`${label}: missing ${JSON.stringify(expected.filter((value) => !actualSet.has(value)))}; extra ${JSON.stringify(actual.filter((value) => !expectedSet.has(value)))}`);
  }
}
function validateFacilityContract(facility2, source2, sourceText2) {
  facility2.authority.operation_source_sha256 !== hash(sourceText2) && fail("facility.authority.operation_source_sha256: source drift"), exactArray(facility2.authority.rulings, ["D-10", "D-11", "D-12", "D-13", "D-14", "D-15"], "facility.authority.rulings");
  const operations = [...source2.http, ...source2.headless], expectedCounts = {
    http: source2.http.length,
    headless: source2.headless.length,
    total: operations.length,
    value: {
      http: source2.http.filter(({ service }) => service === "value").length,
      headless: source2.headless.filter(({ service }) => service === "value").length,
      total: operations.filter(({ service }) => service === "value").length
    },
    fourier: {
      http: source2.http.filter(({ service }) => service === "fourier").length,
      headless: source2.headless.filter(({ service }) => service === "fourier").length,
      total: operations.filter(({ service }) => service === "fourier").length
    }
  };
  canonicalize(facility2.counts) !== canonicalize(expectedCounts) && fail("facility.counts: source-derived counts differ");
  const expectedFacilityIds = [
    "resource-core",
    "history",
    "derivation",
    "lifecycle-expiry",
    "identity",
    "variants",
    "mix",
    "share",
    "social",
    "taxonomy",
    "curation",
    "palette-binding",
    "assets",
    "jobs",
    "audit",
    "meta",
    "http-idempotency-maintenance",
    "database-migration"
  ];
  exactArray(facility2.facilities.map(({ id }) => id), expectedFacilityIds, "facility.facilities.ids");
  const known = new Map(operations.map((operation) => [operation.id, operation])), occurrences = new Map(operations.map(({ id }) => [id, []]));
  for (const row of facility2.facilities) {
    const value = row.operation_ids.value, fourier = row.operation_ids.fourier;
    exactArray(value, [...value].sort(compareCanonicalText), `facility.${row.id}.value`), exactArray(fourier, [...fourier].sort(compareCanonicalText), `facility.${row.id}.fourier`), {
      isomorphic: value.length > 0 && fourier.length > 0 && row.named_asymmetries.length === 0,
      "ratified-asymmetry": value.length > 0 && fourier.length > 0 && row.named_asymmetries.length > 0,
      "value-only-refused": value.length > 0 && fourier.length === 0 && row.named_asymmetries.length > 0,
      "fourier-only-refused": value.length === 0 && fourier.length > 0 && row.named_asymmetries.length > 0
    }[row.relation] || fail(`facility.${row.id}: relation shape is false`);
    for (const [service, ids] of Object.entries(row.operation_ids))
      for (const id of ids) {
        const operation = known.get(id);
        operation ? operation.service !== service && fail(`facility.${row.id}: ${id} is not ${service}`) : fail(`facility.${row.id}: unknown operation ${id}`), occurrences.get(id)?.push(row.id);
      }
    const expectedOwners = [...new Set([...value, ...fourier].map((id) => known.get(id)?.owner).filter(Boolean))].sort(compareCanonicalText);
    exactArray(row.owner_waves, expectedOwners, `facility.${row.id}.owner_waves`), (!row.authority_refs.includes("API-OPERATIONS.md") || !row.authority_refs.includes("D-15")) && fail(`facility.${row.id}: missing operation/D-15 authority`);
  }
  for (const [id, rows] of occurrences) rows.length !== 1 && fail(`facility coverage: ${id} occurs ${rows.length} times (${rows.join(",")})`);
  const coverage = {
    value: facility2.facilities.flatMap((row) => row.operation_ids.value).sort(compareCanonicalText),
    fourier: facility2.facilities.flatMap((row) => row.operation_ids.fourier).sort(compareCanonicalText)
  }, coverageHash = hash(canonicalize(coverage));
  facility2.operation_coverage_sha256 !== coverageHash && fail(`facility.operation_coverage_sha256: ${facility2.operation_coverage_sha256}; expected ${coverageHash}`);
  const preimage = clone(facility2);
  delete preimage.manifest_sha256;
  const manifestHash = hash(canonicalize(preimage));
  return facility2.manifest_sha256 !== manifestHash && fail(`facility.manifest_sha256: ${facility2.manifest_sha256}; expected ${manifestHash}`), { coverageHash, manifestHash };
}
function waveIds(markdown, prefix) {
  return [...markdown.matchAll(/^\| ([A-Z]+\d+[A-Z]?) \|/gm)].map((match) => match[1]).filter((id) => id.startsWith(prefix));
}
function returnCoverage(source2, apiWaves, closureWaves) {
  const issues = [], http = source2.http.map(({ id, owner, service }) => ({ id, owner, service })), headless = source2.headless.map(({ id, owner, service }) => ({ id, owner, service })), all = [...http, ...headless], allIds = all.map(({ id }) => id);
  new Set(allIds).size !== allIds.length && issues.push("operation ID appears in both transports");
  const applicable = [...waveIds(apiWaves, "A"), "C03", "C06", "C10"], closure = new Set(waveIds(closureWaves, "C"));
  for (const id of ["C03", "C06", "C10"]) closure.has(id) || issues.push(`missing closure owner ${id}`);
  for (const operation of all) applicable.includes(operation.owner) || issues.push(`${operation.id}: owner ${operation.owner} is outside coverage`);
  const universe = (service, transport) => (transport === "http" ? http : headless).filter((operation) => !service || operation.service === service).map(({ id }) => id).sort(compareCanonicalText), allAudit = /* @__PURE__ */ new Set(["A00", "A01", "A26", "C06", "C10"]), valueAudit = /* @__PURE__ */ new Set(["A03", "A06"]), fourierAudit = /* @__PURE__ */ new Set(["A21R", "C03"]), generated = /* @__PURE__ */ new Map([["A20", "value"], ["A23C", "fourier"]]), rows = applicable.map((wave_id) => {
    const owned = {
      http: http.filter(({ owner }) => owner === wave_id).map(({ id }) => id).sort(compareCanonicalText),
      headless: headless.filter(({ owner }) => owner === wave_id).map(({ id }) => id).sort(compareCanonicalText)
    };
    let basis = "none", audited = { http: [], headless: [] };
    if (allAudit.has(wave_id))
      basis = "all-operations", audited = { http: universe(null, "http"), headless: universe(null, "headless") };
    else if (valueAudit.has(wave_id) || fourierAudit.has(wave_id)) {
      const service = valueAudit.has(wave_id) ? "value" : "fourier";
      basis = `${service}-service`, audited = { http: universe(service, "http"), headless: universe(service, "headless") };
    } else if (generated.has(wave_id)) {
      const service = generated.get(wave_id);
      basis = `${service}-generated-http-excluding-owned`;
      const ownedIds2 = new Set(owned.http);
      audited = { http: universe(service, "http").filter((id) => !ownedIds2.has(id)), headless: [] };
    }
    const ownedIds = /* @__PURE__ */ new Set([...owned.http, ...owned.headless]);
    return [...audited.http, ...audited.headless].some((id) => ownedIds.has(id)) && issues.push(`${wave_id}: owned and audited vectors overlap`), { wave_id, owned, audited, audit_basis: basis };
  });
  for (const operation of all)
    rows.filter((row) => row.owned.http.includes(operation.id) || row.owned.headless.includes(operation.id)).length !== 1 && issues.push(`${operation.id}: owner bijection failed`);
  return { rows, issues, sha256: hash(canonicalize(rows)) };
}
function validateHttp(operation, canonical, profiles, knownWaves) {
  const label = `http.${operation.id}`;
  if (!canonical) {
    fail(`${label}: absent from API-OPERATIONS.md`);
    return;
  }
  (operation.method !== canonical.method || operation.path !== canonical.path) && fail(`${label}: tuple ${operation.method} ${operation.path}; expected ${canonical.method} ${canonical.path}`), operation.authorityText !== canonical.authorityText && fail(`${label}: authority text drift`), operation.successText !== canonical.successText && fail(`${label}: success text drift`), operation.service !== operation.id.split(".", 1)[0] && fail(`${label}: service/id mismatch`), knownWaves.has(operation.owner) || fail(`${label}: unknown owner ${operation.owner}`);
  for (const [kind, name] of Object.entries(operation.profiles))
    profiles[kind]?.[name] || fail(`${label}: unknown ${kind} profile ${name}`);
  const expectsEtag = hasToken(canonical.authorityText, "E"), expectsKey = hasToken(canonical.authorityText, "I");
  operation.preconditions.etag === "required-strong-if-match" !== expectsEtag && fail(`${label}: If-Match binding disagrees with canonical authority cell`), ["required-process-local", "required-durable"].includes(operation.preconditions.idempotencyKey) !== expectsKey && fail(`${label}: Idempotency-Key binding disagrees with canonical authority cell`);
  const policy = profiles.policy[operation.profiles.policy], errors = profiles.errors[operation.profiles.errors] ?? [];
  expectsEtag && policy?.cas.mode !== "strong-etag-required" && fail(`${label}: E lacks strong CAS policy`), !expectsEtag && policy?.cas.mode === "strong-etag-required" && fail(`${label}: CAS policy invents E`), expectsKey && operation.service === "value" && (operation.preconditions.idempotencyKey !== "required-process-local" || policy?.idempotency.mode !== "process-local-key") && fail(`${label}: Value I lacks process-local replay policy`), expectsKey && operation.service === "fourier" && (operation.preconditions.idempotencyKey !== "required-durable" || policy?.idempotency.mode !== "durable-key") && fail(`${label}: Fourier I lacks durable replay policy`), expectsEtag && ![412, 428].every((status) => errors.some((response) => response.status === status)) && fail(`${label}: E lacks 412/428 errors`), !expectsEtag && [412, 428].some((status) => errors.some((response) => response.status === status)) && fail(`${label}: non-CAS operation advertises ${errors.some((response) => response.status === 412) ? 412 : 428}`), operation.method === "GET" && policy?.idempotency.mode !== "safe-method" && fail(`${label}: GET is not safe-method`), operation.method !== "GET" && policy?.cache.directive !== "no-store" && fail(`${label}: mutation cache is not no-store`);
  const parameters = [...operation.path.matchAll(/\{([^}]+)\}/g)].map((match) => match[1]);
  operation.request.pathSchema === NONE != (parameters.length === 0) && fail(`${label}: path schema/parameter mismatch`), operation.request.bodySchema === NONE != (operation.request.media.length === 0) && fail(`${label}: body schema/media mismatch`), (operation.method === "GET" || operation.method === "DELETE") && operation.request.bodySchema !== NONE && fail(`${label}: GET/DELETE body is forbidden by this contract`), operation.method === "GET" && operation.preconditions.idempotencyKey !== "not-used" && fail(`${label}: GET key state is not-used`), operation.method !== "GET" && operation.request.headerSchema === NONE && fail(`${label}: mutation headers are untyped`), exactKeys(operation.preconditions.credentialBindings, ["inputs", "outputs", "secretHandling"], `${label}.credentialBindings`), unique(operation.preconditions.credentialBindings.inputs, `${label}.credentialBindings.inputs`), unique(operation.preconditions.credentialBindings.outputs, `${label}.credentialBindings.outputs`), operation.preconditions.credentialBindings.secretHandling !== "never-url-query-log-audit-cache-or-idempotency-receipt" && fail(`${label}: secret handling is not fail-closed`), canonical.authorityText.includes("Session") && !operation.preconditions.credentialBindings.inputs.includes("secure-session-cookie") && fail(`${label}: session credential is not bound`), canonical.authorityText.includes("Resource") && !operation.preconditions.credentialBindings.inputs.includes("Authorization: Resource") && fail(`${label}: resource credential is not bound`), canonical.successText.includes("Set-Cookie") && !operation.preconditions.credentialBindings.outputs.some((value) => value.startsWith("Set-Cookie:")) && fail(`${label}: Set-Cookie output is not bound`);
  const expectedStatuses = statusVector(canonical.successText), actualStatuses = operation.success.map(({ status }) => status);
  canonicalize(actualStatuses) !== canonicalize(expectedStatuses) && fail(`${label}: success statuses ${actualStatuses}; expected ${expectedStatuses}`), unique(actualStatuses, `${label}.success.status`);
  for (const response of operation.success)
    response.status === 204 ? (response.schema !== NONE || response.media.length) && fail(`${label}: 204 carries a body`) : (response.schema === NONE || !response.media.length) && fail(`${label}: ${response.status} lacks typed media`), response.headerSchema === NONE && fail(`${label}: ${response.status} response headers are untyped`);
  operation.consumers.length || fail(`${label}: no named consumer`), (!operation.lifecycle.resource || !operation.lifecycle.transition || !operation.lifecycle.effect) && fail(`${label}: incomplete lifecycle`);
  for (const reference of operationRefs(operation))
    /^urn:vnext-api-schema:[a-z0-9.-]+:[a-z0-9-]+$/.test(reference) || fail(`${label}: invalid schema ref ${reference}`);
}
function validateHeadless(operation, canonicalId, profiles, knownWaves) {
  const label = `headless.${operation.id}`;
  operation.id !== canonicalId && fail(`${label}: order/id differs from API-OPERATIONS.md (${canonicalId})`), operation.service !== operation.id.split(".", 1)[0] && fail(`${label}: service/id mismatch`), knownWaves.has(operation.owner) || fail(`${label}: unknown owner ${operation.owner}`), profiles.authority[operation.authorityProfile] || fail(`${label}: unknown authority profile ${operation.authorityProfile}`), profiles.policy[operation.policyProfile] || fail(`${label}: unknown policy profile ${operation.policyProfile}`), (operation.inputSchema === NONE || operation.outputSchema === NONE) && fail(`${label}: input/output must both be typed`), (!operation.idempotency.mode || !operation.idempotency.key || !operation.idempotency.replay) && fail(`${label}: incomplete idempotency`), (!operation.retry.mode || operation.retry.maximumAttempts < 1 || !operation.retry.poisonDisposition) && fail(`${label}: incomplete retry`), (!operation.lifecycle.resource || !operation.lifecycle.transition || !operation.lifecycle.effect) && fail(`${label}: incomplete lifecycle`), operation.consumers.length || fail(`${label}: no named consumer`);
  for (const reference of [operation.inputSchema, operation.outputSchema])
    /^urn:vnext-api-schema:[a-z0-9.-]+:[a-z0-9-]+$/.test(reference) || fail(`${label}: invalid schema ref ${reference}`);
}
function schemaBindings(expanded2) {
  const bindings = /* @__PURE__ */ new Map([
    [NONE, { reference: NONE, owner: "A01", slots: ["sentinel"], materialization: "built-in" }],
    ["urn:vnext-api-schema:protocol:problem", { reference: "urn:vnext-api-schema:protocol:problem", owner: "A01", slots: ["error"], materialization: "neutral-protocol" }]
  ]), bind = (reference, owner, slot, generator) => {
    const existing = bindings.get(reference);
    if (existing) {
      existing.owner !== owner && ![NONE, "urn:vnext-api-schema:protocol:problem"].includes(reference) && fail(`schema ref ${reference}: owners ${existing.owner}/${owner}`), existing.slots.includes(slot) || existing.slots.push(slot);
      return;
    }
    bindings.set(reference, { reference, owner, slots: [slot], materialization: generator });
  };
  for (const operation of expanded2.http) {
    const generator = operation.service === "value" ? "A20" : "A23C";
    bind(operation.request.pathSchema, operation.owner, `${operation.id}:request.path`, generator), bind(operation.request.querySchema, operation.owner, `${operation.id}:request.query`, generator), bind(operation.request.headerSchema, operation.owner, `${operation.id}:request.headers`, generator), bind(operation.request.bodySchema, operation.owner, `${operation.id}:request.body`, generator);
    for (const response of operation.success)
      bind(response.schema, operation.owner, `${operation.id}:response.${response.status}.body`, generator), bind(response.headerSchema, operation.owner, `${operation.id}:response.${response.status}.headers`, generator);
    for (const response of operation.errors) bind(response.schema, "A01", `${operation.id}:error.${response.status}`, generator);
  }
  for (const operation of expanded2.headless) {
    const generator = operation.service === "value" ? "A20" : "A23C";
    bind(operation.inputSchema, operation.owner, `${operation.id}:input`, generator), bind(operation.outputSchema, operation.owner, `${operation.id}:output`, generator);
  }
  return [...bindings.values()].map((binding) => ({ ...binding, slots: binding.slots.sort() })).sort((left, right) => compareCanonicalText(left.reference, right.reference));
}
const argv = process.argv.slice(2), args = new Set(argv.filter((arg) => !arg.startsWith("--source="))), sourceArguments = argv.filter((arg) => arg.startsWith("--source="));
for (const arg of args) ["--expanded", "--pretty", "--selftest"].includes(arg) || fail(`unknown argument ${arg}`);
(sourceArguments.length > 1 || sourceArguments.some((arg) => arg.length === 9)) && fail("--source requires one nonempty path"), sourceArguments.length === 1 && (paths.source = resolve(process.cwd(), sourceArguments[0].slice(9))), ["--expanded", "--pretty", "--selftest"].filter((arg) => args.has(arg)).length > 1 && fail("choose one output mode");
const sourceText = readFileSync(paths.source), schemaText = readFileSync(paths.schema), facilityText = readFileSync(paths.facility), facilitySchemaText = readFileSync(paths.facilitySchema);
let source, schema, facility, facilitySchema, structurallyValid = !1;
try {
  source = parseJsonStrict(sourceText), schema = parseJsonStrict(schemaText), facility = parseJsonStrict(facilityText), facilitySchema = parseJsonStrict(facilitySchemaText);
} catch (error) {
  fail(error.message);
}
if (source && schema && facility && facilitySchema) {
  const errors = validateJsonSchema(source, schema);
  for (const error of errors) fail(`schema ${error}`);
  const facilityErrors = validateJsonSchema(facility, facilitySchema);
  for (const error of facilityErrors) fail(`facility schema ${error}`);
  structurallyValid = errors.length === 0 && facilityErrors.length === 0;
}
let expanded, summary;
if (source && structurallyValid) {
  validateProfiles(source), validateCursorContract(source);
  const operationsText = readFileSync(paths.operations, "utf8"), markdown = parseMarkdown(operationsText), apiWavesText = readFileSync(paths.waves, "utf8"), closureWavesText = readFileSync(paths.closureWaves, "utf8"), knownWaves = new Set(waveIds(apiWavesText, "A"));
  (source.http.length !== 129 || source.headless.length !== 17) && fail("closed operation counts differ from 129/17"), source.http.filter(({ service }) => service === "value").length !== 88 && fail("value HTTP count differs from 88"), source.http.filter(({ service }) => service === "fourier").length !== 41 && fail("Fourier HTTP count differs from 41"), unique(source.http.map(({ id }) => id), "HTTP operation IDs"), unique(source.http.map(({ service, method, path }) => `${service}:${method}:${path}`), "HTTP service/method/path tuples"), unique(source.headless.map(({ id }) => id), "headless operation IDs");
  const canonicalById = new Map(markdown.http.map((operation) => [operation.id, operation]));
  source.http.forEach((operation) => validateHttp(operation, canonicalById.get(operation.id), source.profiles, knownWaves));
  for (const canonical of markdown.http) source.http.some(({ id }) => id === canonical.id) || fail(`http.${canonical.id}: missing contract row`);
  source.headless.forEach((operation, index) => validateHeadless(operation, markdown.headless[index], source.profiles, knownWaves));
  for (const id of markdown.headless) source.headless.some((operation) => operation.id === id) || fail(`headless.${id}: missing contract row`);
  exactArray(
    source.http.filter(({ preconditions }) => preconditions.idempotencyKey === "required-process-local").map(({ id }) => id).sort(compareCanonicalText),
    processLocalValueCommands,
    "process-local Value commands"
  ), exactArray(
    source.http.filter(({ preconditions }) => preconditions.idempotencyKey === "required-durable").map(({ id }) => id).sort(compareCanonicalText),
    durableFourierCommands,
    "durable Fourier commands"
  ), source.http.some(({ id }) => id === "value.palette.restore") && fail("D-12: Value palette restore is retained"), source.http.some(({ id }) => id === "fourier.visualization.restore") || fail("D-12: Fourier visualization restore is absent");
  for (const id of ["value.share.create", "value.share.list", "value.share.detail", "value.share.revoke", "value.share.redeem"])
    source.http.some((operation) => operation.id === id) || fail(`D-14: retained /shares operation absent ${id}`);
  const facilityValidation = validateFacilityContract(facility, source, sourceText), coverage = returnCoverage(source, apiWavesText, closureWavesText);
  failures.push(...coverage.issues.map((message) => `return coverage: ${message}`));
  let coverageSelftest = null;
  if (args.has("--selftest")) {
    const unknownOwner = clone(source);
    unknownOwner.http[0].owner = "ZZZ";
    const duplicateTransport = clone(source);
    duplicateTransport.headless.push({ ...clone(duplicateTransport.headless[0]), id: duplicateTransport.http[0].id });
    const controls = [
      returnCoverage(unknownOwner, apiWavesText, closureWavesText).issues.some((message) => message.includes("outside coverage")),
      returnCoverage(duplicateTransport, apiWavesText, closureWavesText).issues.some((message) => message.includes("both transports"))
    ];
    controls.some((passed) => !passed) && fail("return coverage selftest did not reject both mutations"), coverageSelftest = { positive: coverage.issues.length === 0, rejected_mutations: controls.filter(Boolean).length };
  }
  expanded = {
    schema: "vnext.api-contract.expanded/1",
    sourceDocument: source.sourceDocument,
    runtimeBoundary: clone(source.runtimeBoundary),
    cursorContract: clone(source.cursorContract),
    http: source.http.map((operation) => ({
      ...clone(operation),
      profileNames: clone(operation.profiles),
      authority: clone(source.profiles.authority[operation.profiles.authority]),
      policy: clone(source.profiles.policy[operation.profiles.policy]),
      errors: clone(source.profiles.errors[operation.profiles.errors]),
      profiles: void 0
    })),
    headless: source.headless.map((operation) => ({
      ...clone(operation),
      authority: clone(source.profiles.authority[operation.authorityProfile]),
      policy: clone(source.profiles.policy[operation.policyProfile])
    }))
  };
  for (const operation of expanded.http) delete operation.profiles;
  expanded.schemaBindings = schemaBindings(expanded);
  const httpVector = markdown.http.map(({ id, method, path, authorityText, successText }) => ({ id, method, path, authority: authorityText, success: successText }));
  summary = {
    schema: "vnext.api-contract.validation/1",
    sourceSha256: hash(sourceText),
    sourceSchemaSha256: hash(schemaText),
    facilitySha256: hash(facilityText),
    facilitySchemaSha256: hash(facilitySchemaText),
    facilityOperationCoverageSha256: facilityValidation.coverageHash,
    facilityManifestSha256: facilityValidation.manifestHash,
    apiReturnCoverageSha256: coverage.sha256,
    apiReturnCoverageWaves: coverage.rows.length,
    canonicalHttpTupleSha256: hash(httpVector.map((operation) => JSON.stringify(operation)).join(`
`)),
    canonicalHeadlessIdSha256: hash(markdown.headless.join(`
`)),
    expandedHttpSha256: hash(canonicalize(expanded.http)),
    expandedHeadlessSha256: hash(canonicalize(expanded.headless)),
    schemaBindingsSha256: hash(canonicalize(expanded.schemaBindings)),
    expandedContractSha256: hash(canonicalize(expanded)),
    counts: { http: expanded.http.length, value: expanded.http.filter(({ service }) => service === "value").length, fourier: expanded.http.filter(({ service }) => service === "fourier").length, headless: expanded.headless.length, schemaBindings: expanded.schemaBindings.length },
    status: "valid"
  }, coverageSelftest && (summary.selftest = coverageSelftest);
  for (const [label, digest] of [
    ["expanded HTTP", summary.expandedHttpSha256],
    ["expanded headless", summary.expandedHeadlessSha256],
    ["schema bindings", summary.schemaBindingsSha256],
    ["expanded contract", summary.expandedContractSha256]
  ])
    operationsText.includes(`\`${digest}\``) || fail(`API-OPERATIONS.md: missing signed ${label} digest ${digest}`);
}
failures.length && (process.stderr.write(`${failures.join(`
`)}
`), process.exit(1)), args.has("--expanded") ? process.stdout.write(`${canonicalize(expanded)}
`) : args.has("--pretty") ? process.stdout.write(`${JSON.stringify(expanded, null, 2)}
`) : process.stdout.write(`${JSON.stringify(summary, null, 2)}
`);
