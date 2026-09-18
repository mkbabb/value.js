#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { basename, dirname, extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { canonicalize, compareCanonicalText, parseJsonStrict } from "./json-contract.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = resolve(root, "API-TARGET-PATHS.json");
const contractPath = resolve(root, "api-contract.source.json");
const manifest = parseJsonStrict(readFileSync(manifestPath));
const contract = parseJsonStrict(readFileSync(contractPath));
const failures = [];
const fail = (message) => failures.push(message);
const sha256 = (value) => createHash("sha256").update(value).digest("hex");

if (manifest.schema !== "vnext-api-target-paths/1") fail("invalid manifest schema");
if (manifest.authority?.operations !== "api-contract.source.json") fail("operation authority must be api-contract.source.json");
const contractSha = sha256(readFileSync(contractPath));
if (manifest.authority?.operationsSha256 !== contractSha) fail(`operation authority hash ${manifest.authority?.operationsSha256}; computed ${contractSha}`);
if (manifest.runtimes?.value?.repository !== "value.js" || manifest.runtimes.value.root !== "api" || manifest.runtimes.value.language !== "TypeScript") fail("value runtime boundary is not value.js/api TypeScript");
if (manifest.runtimes?.fourier?.repository !== "fourier-analysis" || manifest.runtimes.fourier.root !== "api" || manifest.runtimes.fourier.language !== "Python") fail("Fourier runtime boundary is not independent fourier-analysis/api Python");

const forbiddenSegments = new Set(["shared", "common", "utils", "helpers", "components", "ui", "shadcn", "admin"]);
const generatedNames = new Set(["operation.json", "openapi.json", "schema.json", "vector.json", "client.ts"]);
const allPaths = [];
const unitByRuntime = new Map();
const moduleByFile = new Map();
const operationBindings = [];

function inspectPath(runtimeName, path, kind) {
    allPaths.push({ runtimeName, path, kind });
    if (typeof path !== "string" || !path || path.startsWith("/") || path.includes("//") || path.includes("..") || /[{}*]/.test(path)) {
        fail(`${runtimeName}: invalid or non-expanded ${kind} path ${String(path)}`);
        return;
    }
    if (path !== path.toLowerCase()) fail(`${runtimeName}: non-lowercase target path ${path}`);
    const segments = path.split("/");
    for (const segment of segments.slice(0, -1)) {
        if (forbiddenSegments.has(segment) && !(kind === "test-support" && ["support", "fixtures"].includes(segment))) fail(`${runtimeName}: forbidden source sector ${segment} in ${path}`);
    }
    if (segments.some((segment) => segment === "__tests__" || segment === "__test__")) fail(`${runtimeName}: source-colocated test convention ${path}`);
    const file = basename(path);
    const extension = extname(file);
    let stem = file.slice(0, -extension.length);
    if (stem.endsWith(".test")) stem = stem.slice(0, -5);
    if (stem.endsWith("_test")) stem = stem.slice(0, -5);
    const parent = segments.at(-2);
    if (stem.startsWith(`${parent}-`) || stem.startsWith(`${parent}_`)) fail(`${runtimeName}: grouped filename repeats module name ${path}`);
    if (kind === "source") {
        if (/\.(?:test|spec)\.[^.]+$/.test(path) || /_test\.py$/.test(path)) fail(`${runtimeName}: test is colocated in source inventory ${path}`);
        if (/\/(?:registry|manager|controller)\.(?:ts|py)$/.test(path)) fail(`${runtimeName}: handwritten god-registry/manager/controller candidate ${path}`);
    }
}

function behaviorStem(path, runtimeName) {
    const file = basename(path);
    if (runtimeName === "value") return file.replace(/\.ts$/, "");
    return file.replace(/\.py$/, "");
}

for (const runtimeName of ["value", "fourier"]) {
    const runtime = manifest.runtimes?.[runtimeName];
    if (!runtime) {
        fail(`missing runtime ${runtimeName}`);
        continue;
    }
    const sourceCollections = [runtime.applicationEntries, runtime.contract?.files, runtime.platform?.files, runtime.workers?.files, runtime.migrations];
    for (const collection of sourceCollections) for (const path of collection ?? []) inspectPath(runtimeName, path, "source");
    for (const path of runtime.generated ?? []) {
        inspectPath(runtimeName, path, "generated");
        if (!generatedNames.has(basename(path))) fail(`${runtimeName}: ungoverned generated output ${path}`);
    }
    if (!runtime.applicationEntries?.includes(runtime.workers?.entry)) fail(`${runtimeName}: worker entry is not an application entry`);
    if (!runtime.contract?.files?.includes(runtime.contract.entry)) fail(`${runtimeName}: contract entry missing from contract files`);
    if (!runtime.platform?.files?.includes(runtime.platform.entry)) fail(`${runtimeName}: platform entry missing from platform files`);
    for (const required of generatedNames) if (!(runtime.generated ?? []).some((path) => basename(path) === required)) fail(`${runtimeName}: missing generated ${required}`);
    if (!(runtime.migrations ?? []).length) fail(`${runtimeName}: no database migration target`);

    const units = new Map([
        ["platform/http", runtime.platform.files.filter((path) => path.includes("/platform/http/"))],
        ["platform/db", runtime.platform.files.filter((path) => path.includes("/platform/db/"))]
    ]);
    const moduleIds = new Set();
    for (const module of runtime.modules ?? []) {
        if (!module.id || moduleIds.has(module.id)) fail(`${runtimeName}: duplicate or empty module ${module.id}`);
        moduleIds.add(module.id);
        if (!(module.jobs ?? []).length) fail(`${runtimeName}:${module.id}: module has no intrinsic jobs`);
        const expectedRoot = runtimeName === "value" ? `api/src/modules/${module.id}/` : `api/modules/${module.id}/`;
        const expectedTestRoot = runtimeName === "value" ? `api/test/src/modules/${module.id}/` : `tests/api/modules/${module.id}/`;
        const extension = runtimeName === "value" ? ".ts" : ".py";
        const moduleEntry = `${expectedRoot}module${extension}`;
        if (!(module.files ?? []).includes(moduleEntry)) fail(`${runtimeName}:${module.id}: missing explicit module entry ${moduleEntry}`);
        for (const path of module.files ?? []) {
            inspectPath(runtimeName, path, "source");
            if (!path.startsWith(expectedRoot)) fail(`${runtimeName}:${module.id}: source outside exact module root ${path}`);
            moduleByFile.set(`${runtimeName}:${path}`, module.id);
        }
        for (const path of module.tests ?? []) {
            inspectPath(runtimeName, path, "test");
            if (!path.startsWith(expectedTestRoot)) fail(`${runtimeName}:${module.id}: test outside isomorphic external root ${path}`);
        }
        const testStems = new Set((module.tests ?? []).map((path) => behaviorStem(path, runtimeName).replace(/\.test$/, "").replace(/_test$/, "")));
        for (const path of module.files ?? []) {
            const stem = behaviorStem(path, runtimeName);
            if (stem !== "module" && !testStems.has(stem)) fail(`${runtimeName}:${module.id}: behavioral file lacks isomorphic external test ${path}`);
        }
        units.set(module.id, module.files);
    }
    unitByRuntime.set(runtimeName, units);

    const supportRoots = new Map();
    for (const exception of runtime.testSupportExceptions ?? []) {
        if (!exception.root || !exception.reason || supportRoots.has(exception.root)) fail(`${runtimeName}: invalid or duplicate support exception ${exception.root}`);
        supportRoots.set(exception.root, exception.reason);
    }
    for (const path of runtime.supportFiles ?? []) {
        inspectPath(runtimeName, path, "test-support");
        if (![...supportRoots.keys()].some((rootPath) => path.startsWith(`${rootPath}/`))) fail(`${runtimeName}: support file has no named exception ${path}`);
    }
    for (const rootPath of supportRoots.keys()) if (!(runtime.supportFiles ?? []).some((path) => path.startsWith(`${rootPath}/`))) fail(`${runtimeName}: vacuous support exception ${rootPath}`);

    for (const [operationId, path] of Object.entries(runtime.workers?.bindings ?? {})) {
        if (!(runtime.workers.files ?? []).includes(path)) fail(`${runtimeName}: headless binding ${operationId} targets unknown worker ${path}`);
    }
    for (const edge of runtime.integrationEdges ?? []) {
        for (const endpoint of [edge.producer, edge.consumer]) {
            if (/\/(?:route|store)\.(?:ts|py)$/.test(endpoint)) fail(`${runtimeName}: cross-module route/store edge ${endpoint}`);
            const full = runtimeName === "value" ? `api/src/modules/${endpoint}` : `api/modules/${endpoint}`;
            if (!moduleByFile.has(`${runtimeName}:${full}`)) fail(`${runtimeName}: integration endpoint is not a module file ${endpoint}`);
        }
        if (!(runtime.contract.files ?? []).includes(runtimeName === "value" ? `api/src/${edge.contract}` : `api/${edge.contract}`)) fail(`${runtimeName}: integration edge uses unknown contract ${edge.contract}`);
    }

    const adjacency = new Map([...moduleIds].map((id) => [id, new Set()]));
    const ownerOfEndpoint = (endpoint) => {
        const candidates = [...moduleIds].filter((id) => endpoint.startsWith(`${id}/`)).sort((a, b) => b.length - a.length);
        return candidates[0];
    };
    for (const edge of runtime.integrationEdges ?? []) {
        const producer = ownerOfEndpoint(edge.producer);
        const consumer = ownerOfEndpoint(edge.consumer);
        if (!producer || !consumer || producer === consumer) fail(`${runtimeName}: invalid cross-module edge ${edge.producer} -> ${edge.consumer}`);
        else adjacency.get(producer).add(consumer);
    }
    const visiting = new Set();
    const visited = new Set();
    const visit = (id) => {
        if (visiting.has(id)) {
            fail(`${runtimeName}: module integration cycle at ${id}`);
            return;
        }
        if (visited.has(id)) return;
        visiting.add(id);
        for (const target of adjacency.get(id) ?? []) visit(target);
        visiting.delete(id);
        visited.add(id);
    };
    for (const id of moduleIds) visit(id);
}

const caseKeys = new Map();
for (const item of allPaths) {
    const key = `${item.runtimeName}:${item.path}`.toLowerCase();
    if (caseKeys.has(key)) fail(`duplicate/case-colliding target path ${item.runtimeName}:${item.path} (${caseKeys.get(key)})`);
    else caseKeys.set(key, item.kind);
}

const operations = [...(contract.http ?? []), ...(contract.headless ?? [])];
if (operations.length !== 147 || contract.http.length !== 130 || contract.headless.length !== 17) fail(`operation authority count is ${contract.http.length} HTTP + ${contract.headless.length} headless, expected 130 + 17`);
const mappedDomains = new Set();
for (const operation of operations) {
    const domain = operation.id.split(".").slice(0, 2).join(".");
    const unit = manifest.operationDomainUnits?.[domain];
    const units = unitByRuntime.get(operation.service);
    if (!unit || !units?.has(unit)) {
        fail(`${operation.id}: operation domain ${domain} has no target unit`);
        continue;
    }
    mappedDomains.add(domain);
    const unitFiles = units.get(unit);
    if (operation.transport === "http") {
        const routeExtension = operation.service === "value" ? "/route.ts" : "/route.py";
        if (!unitFiles.some((path) => path.endsWith(routeExtension))) fail(`${operation.id}: HTTP target unit ${unit} has no route`);
    } else if (manifest.runtimes[operation.service].workers.bindings[operation.id] === undefined) {
        fail(`${operation.id}: headless operation has no worker binding`);
    }
    operationBindings.push({ id: operation.id, owner: operation.owner, runtime: operation.service, unit });
}
for (const domain of Object.keys(manifest.operationDomainUnits ?? {})) if (!mappedDomains.has(domain)) fail(`operation-domain mapping is vacuous ${domain}`);
const headlessIds = new Set((contract.headless ?? []).map((operation) => operation.id));
for (const runtimeName of ["value", "fourier"]) {
    for (const operationId of Object.keys(manifest.runtimes[runtimeName].workers.bindings ?? {})) if (!headlessIds.has(operationId)) fail(`${runtimeName}: worker binds non-headless or unknown operation ${operationId}`);
}

operationBindings.sort((left, right) => compareCanonicalText(left.id, right.id));
const bindingSha = sha256(canonicalize(operationBindings));
if (manifest.operation_owner_module_sha256 !== bindingSha) fail(`operation owner/module hash ${manifest.operation_owner_module_sha256}; computed ${bindingSha}`);
const preimage = structuredClone(manifest);
delete preimage.manifest_sha256;
const manifestSha = sha256(canonicalize(preimage));
if (manifest.manifest_sha256 !== manifestSha) fail(`manifest hash ${manifest.manifest_sha256}; computed ${manifestSha}`);

if (failures.length) {
    process.stderr.write(`${failures.join("\n")}\n`);
    process.exit(1);
}

process.stdout.write(`${JSON.stringify({
    schema: manifest.schema,
    operations: operationBindings.length,
    http: contract.http.length,
    headless: contract.headless.length,
    value_modules: manifest.runtimes.value.modules.length,
    fourier_modules: manifest.runtimes.fourier.modules.length,
    paths: allPaths.length,
    operation_owner_module_sha256: bindingSha,
    manifest_sha256: manifestSha
})}\n`);
