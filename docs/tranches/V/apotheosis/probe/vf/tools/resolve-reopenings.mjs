#!/usr/bin/env node

import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import {
    existsSync,
    lstatSync,
    readFileSync,
    readdirSync,
    realpathSync,
    statSync,
    writeFileSync,
} from "node:fs";
import { basename, dirname, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

import { canonicalize, compareCanonicalText, parseJsonStrict, validateJsonSchema } from "./json-contract.mjs";
import { loadWaveContracts } from "./wave-contract.mjs";
import { loadWaveEdgePolicy, requireWaveEdgePolicy, requireWaveOutcome } from "./wave-edge-policy.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const trancheRoot = resolve(here, "..");
const returnValidator = resolve(here, "validate-return.mjs");
const receiptSchema = parseJsonStrict(readFileSync(resolve(here, "../resolved-reopenings.schema.json")));
const forbiddenDynamicOwners = new Set(["C08", "C09", "C10"]);
const waveContracts = loadWaveContracts();
const waveEdgePolicy = loadWaveEdgePolicy(trancheRoot, waveContracts);

const sha256 = (value) => createHash("sha256").update(value).digest("hex");
const hashFile = (path) => sha256(readFileSync(path));
const same = (left, right) => canonicalize(left) === canonicalize(right);

function assert(condition, message) {
    if (!condition) throw new Error(message);
}

function sorted(values) {
    return [...values].sort(compareCanonicalText);
}

function assertSortedUnique(values, label) {
    assert(Array.isArray(values), `${label} must be an array`);
    assert(new Set(values).size === values.length, `${label} contains a duplicate`);
    assert(same(values, sorted(values)), `${label} must be sorted`);
}

function closureEdge(from, to) {
    const edge = requireWaveEdgePolicy(waveEdgePolicy, from, to);
    assert(same(edge.allowed_statuses, ["COMPLETE"]), `${from} -> ${to} must require COMPLETE in the canonical edge policy`);
    return edge;
}

function directoryDigest(entries, kind) {
    const rows = entries
        .map((entry) => kind === "c08"
            ? {
                attempt: entry.record.annexes.closure.attempt,
                file_sha256: entry.file_sha256,
                name: entry.name,
                return_hash: entry.record.return_hash,
            }
            : {
                file_sha256: entry.file_sha256,
                name: entry.name,
                return_hash: entry.record.return_hash,
                wave_id: entry.record.wave_id,
            })
        .sort((left, right) => compareCanonicalText(left.name, right.name));
    return sha256(canonicalize(rows));
}

export function validateResolvedReceipt(receipt) {
    const failures = validateJsonSchema(receipt, receiptSchema);
    const fail = (message) => failures.push(message);
    const reopenings = receipt?.resolved_reopenings ?? [];
    const ownerIds = reopenings.map(({ wave_id }) => wave_id);
    const expectedDependencies = sorted(["C08", ...ownerIds]);

    if (receipt?.static_dependencies?.length !== 1 || receipt.static_dependencies[0] !== "C08") {
        fail("/static_dependencies: C08 must remain the sole static dependency");
    }
    try {
        const c08ToC09 = closureEdge("C08", "C09");
        closureEdge("C09", "C10");
        if (!c08ToC09.allowed_statuses.includes(receipt?.c08?.status)) {
            fail(`/c08/status: ${receipt?.c08?.status} does not advance the C08 -> C09 static dependency`);
        }
    } catch (error) {
        fail(`/static_dependencies: ${error.message}`);
    }
    if (new Set(ownerIds).size !== ownerIds.length) fail("/resolved_reopenings: wave IDs must be unique");
    if (!same(ownerIds, sorted(ownerIds))) fail("/resolved_reopenings: rows must be sorted by wave ID");
    if (!same(receipt?.resolved_dependencies, expectedDependencies)) {
        fail(`/resolved_dependencies: expected ${expectedDependencies.join(",")}`);
    }
    for (const [index, row] of reopenings.entries()) {
        if (row.accepted_in_corpus_sha256 !== receipt.corpus_epoch?.sha256) {
            fail(`/resolved_reopenings/${index}/accepted_in_corpus_sha256: does not bind the inspected C08 corpus epoch`);
        }
        if (forbiddenDynamicOwners.has(row.wave_id)) {
            fail(`/resolved_reopenings/${index}/wave_id: closure/release wave cannot be a dynamic repair owner`);
        }
        try {
            const outcome = requireWaveOutcome(waveEdgePolicy, row.wave_id);
            if (row.status !== "REFUSED" && !outcome.advancing_statuses.includes(row.status)) {
                fail(`/resolved_reopenings/${index}/status: ${row.status} does not advance ${row.wave_id}; expected ${outcome.advancing_statuses.join(" or ")}`);
            }
        } catch (error) {
            fail(`/resolved_reopenings/${index}/wave_id: ${error.message}`);
        }
    }
    const preimage = { ...receipt };
    delete preimage.receipt_hash;
    const computed = sha256(canonicalize(preimage));
    if (receipt?.receipt_hash !== computed) fail(`/receipt_hash: found ${receipt?.receipt_hash}; computed ${computed}`);
    return failures;
}

export function resolveLedger({ c08Entries, ownerEntries, c08Root, ownerRoot }) {
    const c08ToC09 = closureEdge("C08", "C09");
    closureEdge("C09", "C10");
    assert(c08Entries.length > 0, "C08 attempt ledger is empty");
    for (const entry of c08Entries) {
        assert(entry.record.wave_id === "C08", `${entry.name}: C08 ledger contains ${entry.record.wave_id}`);
        assert(entry.record.annexes?.closure, `${entry.name}: missing annexes.closure`);
    }

    const attempts = [...c08Entries].sort(
        (left, right) => left.record.annexes.closure.attempt - right.record.annexes.closure.attempt,
    );
    for (const [index, entry] of attempts.entries()) {
        const closure = entry.record.annexes.closure;
        const expectedAttempt = index + 1;
        assert(closure.attempt === expectedAttempt, `C08 attempts must be complete and unique from 1; expected ${expectedAttempt}, found ${closure.attempt}`);
        assertSortedUnique(closure.reopened_owners, `C08 attempt ${closure.attempt} reopened_owners`);
        const resolvedIds = closure.resolved_reopenings.map(({ wave_id }) => wave_id);
        assertSortedUnique(resolvedIds, `C08 attempt ${closure.attempt} resolved_reopenings`);
        assert(
            closure.resolved_reopenings.every(({ wave_id }) => !forbiddenDynamicOwners.has(wave_id)),
            `C08 attempt ${closure.attempt} names a closure/release wave as a repair owner`,
        );
        const overlap = closure.reopened_owners.filter((waveId) => resolvedIds.includes(waveId));
        assert(overlap.length === 0, `C08 attempt ${closure.attempt} marks current reopenings resolved: ${overlap.join(",")}`);
        if (index < attempts.length - 1) {
            assert(entry.record.status === "NOT_CLEAN", `non-latest C08 attempt ${closure.attempt} must be NOT_CLEAN`);
            assert(closure.verdict === "not_clean", `non-latest C08 attempt ${closure.attempt} must have verdict=not_clean`);
        }
    }

    const latest = attempts.at(-1);
    const closure = latest.record.annexes.closure;
    assert(c08ToC09.allowed_statuses.includes(latest.record.status), `latest C08 return must advance C08 -> C09 with COMPLETE, found ${latest.record.status}`);
    assert(closure.verdict === "clean", "latest C08 return must have verdict=clean");
    assert(closure.reopened_owners.length === 0, "latest C08 return has current reopenings");

    const everReopened = new Set(attempts.flatMap(({ record }) => record.annexes.closure.reopened_owners));
    const resolutions = closure.resolved_reopenings;
    const resolutionIds = resolutions.map(({ wave_id }) => wave_id);
    const resolutionById = new Map(resolutions.map((resolution) => [resolution.wave_id, resolution]));
    assert(
        same(sorted(everReopened), resolutionIds),
        `latest C08 cumulative resolutions do not equal all prior reopenings; expected ${sorted(everReopened).join(",") || "none"}`,
    );

    const corpusInputs = latest.record.evidence_inputs.filter(({ sha256: digest }) => digest === closure.inspected_corpus_sha256);
    assert(corpusInputs.length === 1, "latest C08 must bind inspected_corpus_sha256 to exactly one persisted evidence input");
    const corpusEpoch = { path: corpusInputs[0].path, sha256: closure.inspected_corpus_sha256 };

    const ownerById = new Map();
    for (const entry of ownerEntries) {
        const owner = entry.record.wave_id;
        assert(!ownerById.has(owner), `owner return ledger contains duplicate ${owner}`);
        assert(!forbiddenDynamicOwners.has(owner), `${owner} cannot be a dynamic repair owner`);
        const outcome = requireWaveOutcome(waveEdgePolicy, owner);
        const refusedSupersession = entry.record.status === "REFUSED" && resolutionById.has(owner) && everReopened.has(owner);
        assert(
            refusedSupersession || outcome.advancing_statuses.includes(entry.record.status),
            `${owner} return status ${entry.record.status} neither advances its canonical outcome nor forms a typed REFUSED reopening supersession`,
        );
        ownerById.set(owner, entry);
    }
    assert(
        same(sorted(ownerById.keys()), resolutionIds),
        `owner return IDs differ from C08 cumulative resolutions; expected ${resolutionIds.join(",") || "none"}, found ${sorted(ownerById.keys()).join(",") || "none"}`,
    );

    const resolvedReopenings = resolutions.map(({ wave_id, owner_return_hash }) => {
        const entry = ownerById.get(wave_id);
        assert(entry.record.return_hash === owner_return_hash, `${wave_id} owner return hash is stale or mismatched`);
        return {
            wave_id,
            path: entry.path,
            file_sha256: entry.file_sha256,
            owner_return_hash,
            status: entry.record.status,
            accepted_in_corpus_sha256: closure.inspected_corpus_sha256,
        };
    });
    const receipt = {
        schema: "vnext-resolved-reopenings/1",
        wave_id: "C09",
        static_dependencies: ["C08"],
        resolved_dependencies: sorted(["C08", ...resolutionIds]),
        corpus_epoch: corpusEpoch,
        c08: {
            attempts_root: c08Root,
            attempts_root_sha256: directoryDigest(c08Entries, "c08"),
            latest_return_path: latest.path,
            latest_file_sha256: latest.file_sha256,
            latest_return_hash: latest.record.return_hash,
            latest_attempt: closure.attempt,
            latest_validation: "live-pin-at-scheduling",
            status: latest.record.status,
            verdict: closure.verdict,
        },
        owner_returns_root: ownerRoot,
        owner_returns_root_sha256: directoryDigest(ownerEntries, "owner"),
        resolved_reopenings: resolvedReopenings,
        receipt_hash: "",
    };
    const preimage = { ...receipt };
    delete preimage.receipt_hash;
    receipt.receipt_hash = sha256(canonicalize(preimage));
    const failures = validateResolvedReceipt(receipt);
    assert(failures.length === 0, failures.join("\n"));
    return receipt;
}

function validateReturn(path, mode) {
    try {
        const args = [returnValidator, path];
        if (mode) args.push(mode);
        execFileSync(process.execPath, args, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
    } catch (error) {
        const stderr = error.stderr?.toString().trim() || error.message;
        throw new Error(`${path}: canonical return validation failed\n${stderr}`);
    }
}

function scanLedger(root, kind) {
    assert(existsSync(root), `${kind} ledger does not exist: ${root}`);
    assert(statSync(root).isDirectory(), `${kind} ledger is not a directory: ${root}`);
    const canonicalRoot = realpathSync(root);
    const entries = readdirSync(canonicalRoot, { withFileTypes: true })
        .sort((left, right) => compareCanonicalText(left.name, right.name))
        .map((entry) => {
            const path = resolve(canonicalRoot, entry.name);
            assert(entry.isFile() && !entry.isSymbolicLink(), `${kind} ledger entry must be a regular file: ${path}`);
            assert(entry.name.endsWith(".return.json"), `${kind} ledger contains a non-return file: ${path}`);
            assert(!lstatSync(path).isSymbolicLink(), `${kind} ledger symlink is forbidden: ${path}`);
            const record = parseJsonStrict(readFileSync(path));
            if (kind === "c08") assert(record.wave_id === "C08", `${entry.name}: C08 ledger contains ${record.wave_id}`);
            else assert(!forbiddenDynamicOwners.has(record.wave_id), `${entry.name}: ${record.wave_id} cannot be a dynamic repair owner`);
            validateReturn(path, kind === "c08" ? "--historical-certificate" : "--immutable-authority");
            const canonicalPath = realpathSync(path);
            if (kind === "c08") {
                const attempt = record.annexes?.closure?.attempt;
                const expectedName = `C08-attempt-${String(attempt).padStart(3, "0")}.return.json`;
                assert(entry.name === expectedName, `${entry.name}: expected canonical C08 filename ${expectedName}`);
            } else {
                const expectedName = `${record.wave_id}.return.json`;
                assert(entry.name === expectedName, `${entry.name}: expected canonical owner filename ${expectedName}`);
            }
            return {
                name: entry.name,
                path: canonicalPath,
                file_sha256: hashFile(canonicalPath),
                record,
            };
        });
    return { root: canonicalRoot, entries };
}

export function verifyResolvedReceiptFiles(receipt, { liveLatest = false } = {}) {
    const structuralFailures = validateResolvedReceipt(receipt);
    assert(structuralFailures.length === 0, structuralFailures.join("\n"));
    const c08 = scanLedger(receipt.c08.attempts_root, "c08");
    const owners = scanLedger(receipt.owner_returns_root, "owner");
    const latestC08 = [...c08.entries].sort(
        (left, right) => left.record.annexes.closure.attempt - right.record.annexes.closure.attempt,
    ).at(-1);
    assert(latestC08, "C08 attempt ledger is empty");
    if (liveLatest) validateReturn(latestC08.path);
    const regenerated = resolveLedger({
        c08Entries: c08.entries,
        ownerEntries: owners.entries,
        c08Root: c08.root,
        ownerRoot: owners.root,
    });
    assert(same(receipt, regenerated), "resolved dependency receipt or sealed return ledgers have drifted");
    assert(existsSync(receipt.corpus_epoch.path), `corpus epoch evidence does not exist: ${receipt.corpus_epoch.path}`);
    assert(resolve(receipt.corpus_epoch.path) === receipt.corpus_epoch.path, "corpus epoch evidence path must be absolute");
    assert(realpathSync(receipt.corpus_epoch.path) === receipt.corpus_epoch.path, "corpus epoch evidence path must be canonical and may not traverse a symlink");
    assert(!lstatSync(receipt.corpus_epoch.path).isSymbolicLink(), "corpus epoch evidence symlink is forbidden");
    assert(statSync(receipt.corpus_epoch.path).isFile(), `corpus epoch evidence is not a file: ${receipt.corpus_epoch.path}`);
    assert(hashFile(receipt.corpus_epoch.path) === receipt.corpus_epoch.sha256, "persisted corpus epoch hash has drifted");
    return regenerated;
}

function parseArguments(argv) {
    const result = {};
    const allowed = new Set(["--c08-returns", "--owner-returns", "--output"]);
    for (let index = 0; index < argv.length; index += 2) {
        const key = argv[index];
        const value = argv[index + 1];
        assert(allowed.has(key) && value, `usage: node resolve-reopenings.mjs --c08-returns <dir> --owner-returns <dir> --output <receipt.json>`);
        assert(!(key in result), `duplicate argument ${key}`);
        result[key] = value;
    }
    for (const key of allowed) assert(result[key], `missing required argument ${key}`);
    return result;
}

function isInside(path, root) {
    const offset = relative(root, path);
    return offset === "" || (!offset.startsWith(`..${sep}`) && offset !== "..");
}

function main() {
    const args = parseArguments(process.argv.slice(2));
    const c08 = scanLedger(resolve(args["--c08-returns"]), "c08");
    const owners = scanLedger(resolve(args["--owner-returns"]), "owner");
    const output = resolve(args["--output"]);
    assert(!existsSync(output), `refusing to overwrite receipt: ${output}`);
    assert(!isInside(output, c08.root) && !isInside(output, owners.root), "receipt output must be outside both sealed return ledgers");
    const receipt = resolveLedger({
        c08Entries: c08.entries,
        ownerEntries: owners.entries,
        c08Root: c08.root,
        ownerRoot: owners.root,
    });
    verifyResolvedReceiptFiles(receipt, { liveLatest: true });
    writeFileSync(output, `${canonicalize(receipt)}\n`, { flag: "wx" });
    process.stdout.write(`${canonicalize({
        schema: receipt.schema,
        wave_id: receipt.wave_id,
        resolved_dependencies: receipt.resolved_dependencies,
        corpus_epoch_sha256: receipt.corpus_epoch.sha256,
        receipt_hash: receipt.receipt_hash,
        output,
    })}\n`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
    try {
        main();
    } catch (error) {
        process.stderr.write(`${error.message}\n`);
        process.exit(1);
    }
}
