#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
    mkdirSync,
    mkdtempSync,
    readFileSync,
    realpathSync,
    rmSync,
    writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";

import {
    consumerFixtureRootIds,
    prepareConsumerFixtureConstellation,
    resolveConsumerFixtureUniverse,
} from "./consumer-universe-fixture.mjs";
import {
    consumerUniverseAnnexProjection,
    consumerUniverseImmutableBindingProjection,
} from "./consumer-universe-return.mjs";
import { liveCasualtyHits, validateDeletionJudgment, validateDeletionJudgmentRecord } from "./deletion-judgment.mjs";
import { compareCanonicalText, canonicalize, parseJsonStrict } from "./json-contract.mjs";
import { recursiveReturnValidatorArgs } from "./return-validation-mode.mjs";

const deletionTruth = resolve(new URL("deletion-truth.mjs", import.meta.url).pathname);
const fixtureRoot = realpathSync(mkdtempSync(join(tmpdir(), "vnext-deletion-judgment-")));
const repositories = join(fixtureRoot, "consumer-constellation");
const evidenceRoot = join(fixtureRoot, "evidence");
const failures = [];
let adversarialRejections = 0;
const sha256 = (input) => createHash("sha256").update(input).digest("hex");
const clone = (value) => structuredClone(value);
const ignoredDirectoryNames = [
    ".cache", ".git", ".next", ".nuxt", ".pnpm", ".turbo", ".venv", ".vnext", ".yarn",
    "__pycache__", "build", "coverage", "dist", "node_modules", "playwright-report",
    "r1-opus-refuted", "target", "test-results", "tranches", "venv",
];
const residueCategories = ["consumers", "declarations", "documentation", "manifests-exports", "packed-artifacts", "source"];

function run(command, args, context) {
    const result = spawnSync(command, args, { encoding: "utf8", maxBuffer: 256 * 1024 * 1024 });
    if (result.status !== 0) throw new Error(`${context} failed: ${(result.stderr || result.error?.message || "unknown failure").trim()}`);
    return result.stdout;
}

function git(repository, args, context = "Git") {
    return run("git", ["-C", repository, ...args], context);
}

function writeFixture(path, contents) {
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, contents);
}

function writeCanonical(path, value) {
    writeFixture(path, `${canonicalize(value)}\n`);
}

function readJson(path) {
    return parseJsonStrict(readFileSync(path));
}

function initializeRepository(name, files) {
    const repository = join(repositories, name);
    mkdirSync(repository, { recursive: true });
    git(repository, ["init", "-b", "main"], `initialize ${name}`);
    git(repository, ["config", "user.name", "Deletion Judgment Selftest"]);
    git(repository, ["config", "user.email", "deletion-judgment@example.invalid"]);
    for (const [path, contents] of Object.entries(files)) writeFixture(join(repository, path), contents);
    git(repository, ["add", "."]);
    git(repository, ["commit", "-m", "fixture baseline"]);
    git(repository, ["remote", "add", "origin", `https://example.invalid/${name}.git`]);
    return realpathSync(repository);
}

function evidence(path, description) {
    const canonical = realpathSync(path);
    return { path: canonical, sha256: sha256(readFileSync(canonical)), description };
}

function finalizeDecision(decision) {
    const preimage = clone(decision);
    delete preimage.origin;
    delete preimage.decision_hash;
    decision.decision_hash = sha256(canonicalize(preimage));
    return decision;
}

function finalizeAnnex(annex, { decisions = true } = {}) {
    if (decisions) annex.decisions.forEach(finalizeDecision);
    const preimage = clone(annex);
    delete preimage.annex_hash;
    annex.annex_hash = sha256(canonicalize(preimage));
    return annex;
}

function makeReturn(waveId, annexes = {}, status = "COMPLETE") {
    const path = join(evidenceRoot, `return-${waveId}.json`);
    const value = { schema: "vnext-deletion-judgment-selftest-return/1", wave_id: waveId, status, annexes, return_hash: "" };
    const preimage = clone(value);
    delete preimage.return_hash;
    value.return_hash = sha256(canonicalize(preimage));
    writeCanonical(path, value);
    const canonical = realpathSync(path);
    return {
        value,
        binding: {
            wave_id: waveId,
            path: canonical,
            file_sha256: sha256(readFileSync(canonical)),
            return_hash: value.return_hash,
            status,
        },
    };
}

function deletionAnnexBinding(waveId, phase, path, annex) {
    const canonical = realpathSync(path);
    return {
        schema: "vnext-deletion-judgment-return-annex/1",
        wave_id: waveId,
        phase,
        path: canonical,
        file_sha256: sha256(readFileSync(canonical)),
        annex_hash: annex.annex_hash,
    };
}

function truthDelta(repository, name, mutate) {
    const before = join(evidenceRoot, `${name}-before.json`);
    const after = join(evidenceRoot, `${name}-after.json`);
    const receipt = join(evidenceRoot, `${name}-receipt.json`);
    run(process.execPath, [deletionTruth, "snapshot", "--phase", "before", "--repository", repository, "--output", before], `${name} before snapshot`);
    mutate();
    git(repository, ["add", "-A"]);
    git(repository, ["commit", "-m", name]);
    run(process.execPath, [deletionTruth, "snapshot", "--phase", "after", "--repository", repository, "--output", after], `${name} after snapshot`);
    run(process.execPath, [deletionTruth, "delta", "--before", before, "--after", after, "--output", receipt], `${name} truth delta`);
    const canonical = realpathSync(receipt);
    const value = readJson(canonical);
    return {
        value,
        reference: {
            owner_wave: "K21",
            root_id: "keyframes",
            path: canonical,
            file_sha256: sha256(readFileSync(canonical)),
            receipt_hash: value.receipt_hash,
        },
    };
}

function sortBy(values, key) {
    return values.sort((left, right) => compareCanonicalText(key(left), key(right)));
}

function scanHitCore(hit) {
    return {
        root_id: hit.root_id,
        path: hit.path,
        pattern: hit.pattern,
        line: hit.line,
        file_sha256: hit.file_sha256,
    };
}

function resolveConsumer(label, constellation) {
    const result = resolveConsumerFixtureUniverse({
        constellation,
        name: label,
        ownerWave: "K21",
        edges: [
            {
                id: "glass-ui:keyframes-manifest",
                source: "glass-ui",
                target: "keyframes",
                package: "@mkbabb/keyframes.js",
                specifier: "^7.0.0",
                kind: "manifest",
                ownerWave: "G07",
                evidencePaths: [join(constellation.roots["glass-ui"], "package.json")],
            },
            {
                id: "glass-ui:keyframes-runtime",
                source: "glass-ui",
                target: "keyframes",
                package: "@mkbabb/keyframes.js",
                specifier: "@mkbabb/keyframes.js",
                kind: "runtime",
                ownerWave: "G07",
                evidencePaths: [join(constellation.roots["glass-ui"], "src/index.ts")],
            },
            {
                id: "value:keyframes-manifest",
                source: "value",
                target: "keyframes",
                package: "@mkbabb/keyframes.js",
                specifier: "^7.0.0",
                kind: "manifest",
                ownerWave: "C02S",
                evidencePaths: [join(constellation.roots.value, "package.json")],
            },
            {
                id: "value:keyframes-runtime",
                source: "value",
                target: "keyframes",
                package: "@mkbabb/keyframes.js",
                specifier: "@mkbabb/keyframes.js",
                kind: "runtime",
                ownerWave: "C02S",
                evidencePaths: [join(constellation.roots.value, "src/index.ts")],
            },
        ],
    });
    return {
        ...result,
        path: result.receiptPath,
        verified: {
            receipt: result.receipt,
            receipt_file_sha256: result.receiptFileSha256,
            roots_sha256: result.rootsSha256,
            bounds_authority: result.authorityBinding,
        },
    };
}

function consumerProjection(resolved, authority) {
    const immutableBinding = consumerUniverseImmutableBindingProjection(
        consumerUniverseAnnexProjection("C00U", resolved.path, resolved.validation),
    );
    const { schema, ...projection } = immutableBinding;
    if (schema !== "vnext-consumer-universe-immutable-binding/1") {
        throw new Error(`consumer immutable binding schema drift: ${schema}`);
    }
    return {
        authority,
        ...projection,
    };
}

function allowedHits(receipt, pattern, tombstonePath, archivePath) {
    const hits = liveCasualtyHits(receipt, [pattern], { ignoredDirectoryNames });
    if (hits.length !== 2) throw new Error(`${pattern} expected one tombstone and one archive hit; observed ${canonicalize(hits)}`);
    return sortBy(hits.map((hit) => {
        const tombstone = hit.path === "TOMBSTONES.md";
        const proofPath = tombstone ? tombstonePath : archivePath;
        return {
            ...hit,
            classification: tombstone ? "tombstone" : "archive",
            reason: tombstone ? "intentional current by-name tombstone" : "immutable tranche history",
            evidence: [evidence(proofPath, tombstone ? "by-name tombstone ledger" : "canonical historical record")],
        };
    }), (hit) => canonicalize(scanHitCore(hit)));
}

function rootDispositions(kind, returnByWave, proof) {
    const unaffected = (rootId) => ({ root_id: rootId, status: "unaffected", evidence: [proof] });
    if (kind !== "element-morph") {
        return consumerFixtureRootIds.map(unaffected);
    }
    const casualty = (rootId, id, owner, behavior) => ({
        root_id: rootId,
        status: "migrated",
        casualties: [{
            id,
            consumer_root_id: rootId,
            import_or_behavior: behavior,
            migration_owner: owner,
            migration_return_hash: returnByWave.get(owner).binding.return_hash,
            evidence: [proof],
        }],
    });
    return consumerFixtureRootIds.map((rootId) => {
        if (rootId === "glass-ui") {
            return casualty("glass-ui", "glass-element-morph", "G07", "redistributed ElementMorph surface and reveal restoration");
        }
        if (rootId === "value") {
            return casualty("value", "value-element-morph", "C02S", "ElementMorph settle and meter choreography");
        }
        return unaffected(rootId);
    });
}

function makeDecision({
    id,
    name,
    kind,
    fileEffects,
    judgment,
    consumer,
    tombstonePath,
    archivePath,
    intrinsicProof,
    replacementProof,
    casualtyProof,
    residueProof,
    returnByWave,
}) {
    const roots = rootDispositions(id, returnByWave, casualtyProof);
    const allowed = allowedHits(consumer.receipt, name, tombstonePath, archivePath);
    const casualtyScan = {
        consumer_receipt_hash: consumer.receipt.receipt_hash,
        patterns: [name],
        roots,
        active_hits: [],
        allowed_hits: allowed,
        scan_sha256: "",
    };
    casualtyScan.scan_sha256 = sha256(canonicalize({
        consumer_receipt_hash: casualtyScan.consumer_receipt_hash,
        decision_id: id,
        patterns: casualtyScan.patterns,
        roots,
        active_hits: [],
        allowed_hits: allowed,
    }));
    const replacement = judgment === "replaced"
        ? {
            applicability: "applicable",
            capability: "episode-keyed transition Program with exact restoration",
            owner_wave: "K13",
            owner_return_hash: returnByWave.get("K13").binding.return_hash,
            evidence: [replacementProof],
        }
        : {
            applicability: "not_applicable",
            reason: "the intrinsic job is vacuous after the retained graph is distilled",
            evidence: [replacementProof],
        };
    return finalizeDecision({
        decision_id: id,
        owner_wave: "K21",
        origin: { kind: "current-wave" },
        surface: { kind, name },
        file_effects: fileEffects,
        intrinsic_job: { claim: `${name} intrinsic consumer job was independently classified`, evidence: [intrinsicProof] },
        judgment,
        replacement,
        casualty_scan: casualtyScan,
        tombstone: { name, evidence: evidence(tombstonePath, `${name} tombstone`) },
        zero_residue: {
            categories: residueCategories.map((category) => ({ category, matches: 0, evidence: [residueProof] })),
        },
        decision_hash: "",
    });
}

function validationOptions(consumer, returnValidatorPath, rerunConsumer = false, extra = {}) {
    return {
        resolveBoundsAuthority(binding) {
            if (canonicalize(binding) !== canonicalize(consumer.authorityBinding)) {
                throw new Error("self-test bounds-authority binding drift");
            }
            return {
                verificationPath: consumer.authorityBinding.path,
                allowedAdditionalWorktrees: [],
            };
        },
        boundsAuthorityPins: [],
        returnValidatorPath,
        rerunConsumer,
        ...extra,
    };
}

function expectRejected(name, base, mutate, fragment, options) {
    const candidate = clone(base);
    mutate(candidate);
    finalizeAnnex(candidate);
    try {
        validateDeletionJudgmentRecord(candidate, options);
        failures.push(`${name} was accepted`);
    } catch (error) {
        if (!error.message.includes(fragment)) failures.push(`${name} rejected for ${JSON.stringify(error.message)}; expected ${JSON.stringify(fragment)}`);
        else adversarialRejections += 1;
    }
}

try {
    mkdirSync(repositories);
    mkdirSync(evidenceRoot);
    const keyframes = initializeRepository("keyframes", {
        "README.md": "keyframes fixture\n",
        "TOMBSTONES.md": "ExistingTombstone\n",
        "archive/history.md": "ExistingHistory\n",
        "package.json": '{"name":"@mkbabb/keyframes.js","version":"7.0.0"}\n',
        "src/ElementMorph.ts": "export class ElementMorph {}\n",
        "src/exports.ts": "export { ElementMorph } from './ElementMorph';\nexport const LegacyRoute = true;\n",
        "src/physics.ts": "export const LegacyPhysics = true;\n",
        "src/program.ts": "export class Program {}\n",
    });
    const glass = initializeRepository("glass-ui", {
        "README.md": "glass fixture\n",
        "package.json": '{"name":"glass-ui","dependencies":{"@mkbabb/keyframes.js":"^7.0.0"}}\n',
        "src/index.ts": 'import { Program } from "@mkbabb/keyframes.js";\nexport const transition = Program;\n',
    });
    initializeRepository("value", {
        "README.md": "value consumer fixture\n",
        "package.json": '{"name":"@mkbabb/value.js","dependencies":{"@mkbabb/keyframes.js":"^7.0.0"}}\n',
        "src/index.ts": 'import { Program } from "@mkbabb/keyframes.js";\nexport const settle = Program;\n',
    });
    const constellation = prepareConsumerFixtureConstellation({
        fixtureRoot,
        primary: {
            id: "keyframes",
            path: keyframes,
            repository: "keyframes",
            ownerWave: "K21",
        },
    });
    git(keyframes, ["add", "."]);
    git(keyframes, ["commit", "-m", "track fixture consumer authority"]);

    const elementTruth = truthDelta(keyframes, "delete-element-morph", () => {
        rmSync(join(keyframes, "src/ElementMorph.ts"));
    });
    const routeTruth = truthDelta(keyframes, "remove-legacy-route-export", () => {
        writeFixture(join(keyframes, "src/exports.ts"), "export { Program } from './program';\n");
    });
    const physicsTruth = truthDelta(keyframes, "delete-legacy-physics", () => {
        rmSync(join(keyframes, "src/physics.ts"));
        writeFixture(join(keyframes, "TOMBSTONES.md"), "ElementMorph\nLegacyRoute\nLegacyPhysics\n");
        writeFixture(join(keyframes, "archive/history.md"), "ElementMorph\nLegacyRoute\nLegacyPhysics\n");
    });
    if (routeTruth.value.deleted_paths.length !== 0 || canonicalize(routeTruth.value.modified_paths) !== canonicalize(["src/exports.ts"])) {
        failures.push("modified-only truth receipt did not remain a zero-deletion receipt");
    }
    if (canonicalize(physicsTruth.value.deleted_paths) !== canonicalize(["src/physics.ts"])
        || canonicalize(physicsTruth.value.modified_paths) !== canonicalize(["TOMBSTONES.md", "archive/history.md"])) {
        failures.push("mixed physics truth receipt did not retain its deletion plus both modified paths");
    }

    const intrinsicPath = join(evidenceRoot, "intrinsic.txt");
    const replacementPath = join(evidenceRoot, "replacement.txt");
    const casualtyPath = join(evidenceRoot, "casualties.txt");
    const residuePath = join(evidenceRoot, "zero-residue.txt");
    writeFixture(intrinsicPath, "intrinsic job analysis\n");
    writeFixture(replacementPath, "replacement analysis\n");
    writeFixture(casualtyPath, "consumer migration and unaffected-root analysis\n");
    writeFixture(residuePath, "source declarations manifests packed consumers documentation all zero\n");
    const consumer1 = resolveConsumer("owner-precut", constellation);

    const passValidatorPath = join(evidenceRoot, "return-validator-pass.mjs");
    const failValidatorPath = join(evidenceRoot, "return-validator-fail.mjs");
    const historicalSpyValidatorPath = join(evidenceRoot, "return-validator-historical-spy.mjs");
    writeFixture(passValidatorPath, "process.exit(0);\n");
    writeFixture(failValidatorPath, "process.stderr.write('injected return failure\\n'); process.exit(1);\n");
    writeFixture(historicalSpyValidatorPath, [
        'if (process.argv.length !== 4 || process.argv[3] !== "--historical-certificate") {',
        '  process.stderr.write("recursive historical mode regression\\n");',
        "  process.exit(64);",
        "}",
        "process.exit(0);",
        "",
    ].join("\n"));
    const canonicalPassValidator = realpathSync(passValidatorPath);
    const canonicalFailValidator = realpathSync(failValidatorPath);
    const canonicalHistoricalSpyValidator = realpathSync(historicalSpyValidatorPath);
    const returnByWave = new Map([
        ["C02S", makeReturn("C02S")],
        ["G07", makeReturn("G07")],
        ["K13", makeReturn("K13")],
    ]);
    const wrongFixedReturn = makeReturn("K14", {}, "KEEP");
    const wrongConditionalReturn = makeReturn("V15P", {}, "COMPLETE");
    const effect = (path, truth) => ({ root_id: "keyframes", path, truth_receipt_hash: truth.reference.receipt_hash });
    const tombstonePath = realpathSync(join(keyframes, "TOMBSTONES.md"));
    const archivePath = realpathSync(join(keyframes, "archive/history.md"));
    const common = {
        consumer: consumer1.verified,
        tombstonePath,
        archivePath,
        intrinsicProof: evidence(intrinsicPath, "intrinsic-job proof"),
        replacementProof: evidence(replacementPath, "replacement proof"),
        casualtyProof: evidence(casualtyPath, "consumer-casualty proof"),
        residueProof: evidence(residuePath, "zero-residue proof"),
        returnByWave,
    };
    const decisions = sortBy([
        makeDecision({
            ...common,
            id: "element-morph",
            name: "ElementMorph",
            kind: "export",
            fileEffects: { deleted: [effect("src/ElementMorph.ts", elementTruth)], modified: [] },
            judgment: "replaced",
        }),
        makeDecision({
            ...common,
            id: "legacy-route",
            name: "LegacyRoute",
            kind: "route",
            fileEffects: { deleted: [], modified: [effect("src/exports.ts", routeTruth)] },
            judgment: "retired",
        }),
        makeDecision({
            ...common,
            id: "physics",
            name: "LegacyPhysics",
            kind: "module",
            fileEffects: {
                deleted: [effect("src/physics.ts", physicsTruth)],
                modified: [effect("TOMBSTONES.md", physicsTruth), effect("archive/history.md", physicsTruth)],
            },
            judgment: "retired",
        }),
    ], ({ decision_id }) => decision_id);
    const ownerAnnex = finalizeAnnex({
        schema: "vnext-deletion-judgment/1",
        phase: "owner-precut",
        wave_id: "K21",
        consumer_scan: consumerProjection(consumer1, "owner-precut"),
        truth_receipts: sortBy([elementTruth.reference, routeTruth.reference, physicsTruth.reference], (item) => `${item.owner_wave}\0${item.root_id}\0${item.receipt_hash}`),
        delivery_deleted: sortBy([
            { root_id: "keyframes", path: "src/ElementMorph.ts" },
            { root_id: "keyframes", path: "src/physics.ts" },
        ], (item) => `${item.root_id}\0${item.path}`),
        disposition_deletions: decisions.map(({ decision_id, file_effects }) => ({ decision_id, file_effects })),
        ancestor_returns: sortBy([...returnByWave.values()].map(({ binding }) => binding), ({ wave_id }) => wave_id),
        decisions,
        c10_removed_surfaces: [],
        annex_hash: "",
    });
    const ownerAnnexPath = join(evidenceRoot, "owner-deletion-judgment.json");
    writeCanonical(ownerAnnexPath, ownerAnnex);
    try {
        validateDeletionJudgment(realpathSync(ownerAnnexPath), validationOptions(consumer1, canonicalPassValidator, true));
    } catch (error) {
        failures.push(`valid owner-precut judgment rejected: ${error.message}`);
    }
    for (const [name, resolvedAuthority] of [
        ["legacy string bounds-authority callback", consumer1.authorityBinding.path],
        ["incomplete bounds-authority callback object", { verificationPath: consumer1.authorityBinding.path }],
        ["extended bounds-authority callback object", {
            verificationPath: consumer1.authorityBinding.path,
            allowedAdditionalWorktrees: [],
            arbitraryAdditionalWorktree: keyframes,
        }],
    ]) {
        const malformedOptions = validationOptions(consumer1, canonicalPassValidator, false, {
            resolveBoundsAuthority() {
                return resolvedAuthority;
            },
        });
        try {
            validateDeletionJudgmentRecord(clone(ownerAnnex), malformedOptions);
            failures.push(`${name} was accepted`);
        } catch (error) {
            if (!error.message.includes("must return exact { verificationPath, allowedAdditionalWorktrees } object")) {
                failures.push(`${name} rejected for ${JSON.stringify(error.message)}`);
            } else adversarialRejections += 1;
        }
    }
    const historicalRecursiveArgs = recursiveReturnValidatorArgs({ historicalGateReplay: true, offline: true });
    try {
        validateDeletionJudgmentRecord(clone(ownerAnnex), validationOptions(
            consumer1,
            canonicalHistoricalSpyValidator,
            false,
            { returnValidatorArgs: historicalRecursiveArgs },
        ));
    } catch (error) {
        failures.push(`recursive historical mode selector rejected its exact flag: ${error.message}`);
    }
    try {
        validateDeletionJudgmentRecord(clone(ownerAnnex), validationOptions(
            consumer1,
            canonicalHistoricalSpyValidator,
            false,
            { returnValidatorArgs: ["--offline"] },
        ));
        failures.push("recursive-historical-regressed-to-offline was accepted");
    } catch (error) {
        if (!error.message.includes("recursive historical mode regression")) {
            failures.push(`recursive-historical-regressed-to-offline rejected for ${error.message}`);
        } else adversarialRejections += 1;
    }

    const ownerReturn = makeReturn("K21", {
        "deletion-judgment": deletionAnnexBinding("K21", "owner-precut", ownerAnnexPath, ownerAnnex),
    }, "PRUNE");
    returnByWave.set("K21", ownerReturn);
    const consumer2 = resolveConsumer("c05-rehearsal", constellation);
    const c05Decisions = clone(ownerAnnex.decisions);
    for (const decision of c05Decisions) decision.origin = { kind: "ancestor-return", owner_return_hash: ownerReturn.binding.return_hash };
    const c05Annex = finalizeAnnex({
        schema: "vnext-deletion-judgment/1",
        phase: "c05-rehearsal",
        wave_id: "C05",
        consumer_scan: consumerProjection(consumer2, "c05-rehearsal"),
        truth_receipts: clone(ownerAnnex.truth_receipts),
        delivery_deleted: clone(ownerAnnex.delivery_deleted),
        disposition_deletions: clone(ownerAnnex.disposition_deletions),
        ancestor_returns: sortBy([...returnByWave.values()].map(({ binding }) => binding), ({ wave_id }) => wave_id),
        decisions: c05Decisions,
        c10_removed_surfaces: [],
        annex_hash: "",
    });
    const c05AnnexPath = join(evidenceRoot, "c05-deletion-judgment.json");
    writeCanonical(c05AnnexPath, c05Annex);
    try {
        validateDeletionJudgment(realpathSync(c05AnnexPath), validationOptions(consumer2, canonicalPassValidator, true, { expectedOwnerWaves: ["K21"] }));
    } catch (error) {
        failures.push(`valid C05 rehearsal rejected: ${error.message}`);
    }
    const c05Return = makeReturn("C05", {
        "consumer-universe": {
            bounds_authority: consumer2.authorityBinding,
            receipt_path: consumer2.path,
            receipt_hash: consumer2.verified.receipt.receipt_hash,
            epoch: { epoch_sha256: consumer2.verified.receipt.epoch.epoch_sha256 },
        },
        "deletion-judgment": deletionAnnexBinding("C05", "c05-rehearsal", c05AnnexPath, c05Annex),
    });
    const consumer3 = resolveConsumer("c10-final", constellation);
    const c10Decisions = clone(c05Annex.decisions);
    const c10Annex = finalizeAnnex({
        schema: "vnext-deletion-judgment/1",
        phase: "c10-final",
        wave_id: "C10",
        consumer_scan: {
            ...consumerProjection(consumer3, "c10-final"),
            c05_return: c05Return.binding,
            baseline_deletion_annex_hash: c05Annex.annex_hash,
            baseline_receipt_hash: consumer2.verified.receipt.receipt_hash,
            baseline_epoch_sha256: consumer2.verified.receipt.epoch.epoch_sha256,
            root_delta: [],
            edge_delta: [],
        },
        truth_receipts: clone(c05Annex.truth_receipts),
        delivery_deleted: clone(c05Annex.delivery_deleted),
        disposition_deletions: clone(c05Annex.disposition_deletions),
        ancestor_returns: clone(c05Annex.ancestor_returns),
        decisions: c10Decisions,
        c10_removed_surfaces: c10Decisions.map((decision) => ({
            decision_id: decision.decision_id,
            decision_hash: decision.decision_hash,
            owner_wave: decision.owner_wave,
            surface: decision.surface.name,
            tombstone: decision.tombstone.name,
        })),
        annex_hash: "",
    });
    const c10AnnexPath = join(evidenceRoot, "c10-deletion-judgment.json");
    writeCanonical(c10AnnexPath, c10Annex);
    try {
        validateDeletionJudgment(realpathSync(c10AnnexPath), validationOptions(consumer3, canonicalPassValidator, true));
    } catch (error) {
        failures.push(`valid C10 aggregate rejected: ${error.message}`);
    }

    const ownerOptions = validationOptions(consumer1, canonicalPassValidator);
    expectRejected("wrong fixed-prune owner status", ownerAnnex, (value) => {
        value.ancestor_returns.push(wrongFixedReturn.binding);
        sortBy(value.ancestor_returns, ({ wave_id }) => wave_id);
    }, "status KEEP does not advance its fixed-prune outcome", ownerOptions);
    expectRejected("wrong conditional owner status", ownerAnnex, (value) => {
        value.ancestor_returns.push(wrongConditionalReturn.binding);
        sortBy(value.ancestor_returns, ({ wave_id }) => wave_id);
    }, "status COMPLETE does not advance its conditional-disposition outcome", ownerOptions);
    expectRejected("omitted physical delivery deletion", ownerAnnex, (value) => value.delivery_deleted.pop(), "delivery_deleted must equal", ownerOptions);
    expectRejected("invented physical delivery deletion", ownerAnnex, (value) => {
        value.delivery_deleted.push({ root_id: "keyframes", path: "src/invented.ts" });
        sortBy(value.delivery_deleted, (item) => `${item.root_id}\0${item.path}`);
    }, "delivery_deleted must equal", ownerOptions);
    expectRejected("overlapping physical deletion decisions", ownerAnnex, (value) => {
        value.decisions[1].file_effects.deleted.push(clone(value.decisions[0].file_effects.deleted[0]));
        value.disposition_deletions[1].file_effects = clone(value.decisions[1].file_effects);
    }, "duplicate semantic row", ownerOptions);
    expectRejected("invented modified-file effect", ownerAnnex, (value) => {
        value.decisions[1].file_effects.modified[0].path = "src/program.ts";
        value.disposition_deletions[1].file_effects = clone(value.decisions[1].file_effects);
    }, "invents modified file effect", ownerOptions);
    expectRejected("omitted mixed-receipt modification", ownerAnnex, (value) => {
        const mixed = value.decisions.find(({ decision_id }) => decision_id === "physics");
        mixed.file_effects.modified.pop();
        value.disposition_deletions.find(({ decision_id }) => decision_id === "physics").file_effects = clone(mixed.file_effects);
    }, "disposition physical modifications must biject exactly", ownerOptions);
    expectRejected("duplicate same-root truth receipt", ownerAnnex, (value) => {
        value.truth_receipts.push(clone(value.truth_receipts[0]));
        sortBy(value.truth_receipts, (item) => `${item.owner_wave}\0${item.root_id}\0${item.receipt_hash}`);
    }, "duplicate semantic row", ownerOptions);
    expectRejected("foreign owner truth receipt", ownerAnnex, (value) => {
        value.truth_receipts[0].owner_wave = "K13";
        sortBy(value.truth_receipts, (item) => `${item.owner_wave}\0${item.root_id}\0${item.receipt_hash}`);
    }, "not owned by the current wave", ownerOptions);
    expectRejected("unjoined modified-only truth receipt", ownerAnnex, (value) => {
        value.decisions.splice(1, 1);
        value.disposition_deletions.splice(1, 1);
    }, "disposition physical modifications must biject exactly", ownerOptions);
    expectRejected("judgment replacement mismatch", ownerAnnex, (value) => { value.decisions[0].judgment = "retired"; }, "retired judgment lacks typed replacement inapplicability", ownerOptions);
    expectRejected("nonancestor replacement owner", ownerAnnex, (value) => {
        value.decisions[0].replacement.owner_wave = "C05";
        value.decisions[0].replacement.owner_return_hash = c05Return.binding.return_hash;
        value.ancestor_returns.push(c05Return.binding);
        sortBy(value.ancestor_returns, ({ wave_id }) => wave_id);
    }, "replacement owner is not a transitive ancestor", ownerOptions);
    expectRejected("missing migration return", ownerAnnex, (value) => {
        value.ancestor_returns = value.ancestor_returns.filter(({ wave_id }) => wave_id !== "G07");
    }, "lacks its exact successful migration return", ownerOptions);
    expectRejected("nonancestor migration owner", ownerAnnex, (value) => {
        const casualty = value.decisions[0].casualty_scan.roots.find(({ status }) => status === "migrated").casualties[0];
        casualty.migration_owner = "C05";
        casualty.migration_return_hash = c05Return.binding.return_hash;
        value.ancestor_returns.push(c05Return.binding);
        sortBy(value.ancestor_returns, ({ wave_id }) => wave_id);
        const scan = value.decisions[0].casualty_scan;
        scan.scan_sha256 = sha256(canonicalize({
            consumer_receipt_hash: scan.consumer_receipt_hash,
            decision_id: value.decisions[0].decision_id,
            patterns: scan.patterns,
            roots: scan.roots,
            active_hits: scan.active_hits,
            allowed_hits: scan.allowed_hits,
        }));
    }, "migration owner is not a transitive ancestor", ownerOptions);
    expectRejected("omitted consumer root disposition", ownerAnnex, (value) => {
        value.decisions[1].casualty_scan.roots.pop();
        const scan = value.decisions[1].casualty_scan;
        scan.scan_sha256 = sha256(canonicalize({
            consumer_receipt_hash: scan.consumer_receipt_hash,
            decision_id: value.decisions[1].decision_id,
            patterns: scan.patterns,
            roots: scan.roots,
            active_hits: scan.active_hits,
            allowed_hits: scan.allowed_hits,
        }));
    }, "does not disposition every included consumer root", ownerOptions);
    expectRejected("fabricated active hit", ownerAnnex, (value) => {
        value.decisions[1].casualty_scan.active_hits = [{
            root_id: "glass-ui",
            path: "src/index.ts",
            pattern: "LegacyRoute",
            line: 1,
            file_sha256: sha256(readFileSync(join(glass, "src/index.ts"))),
        }];
    }, "active full-universe casualty hits drift", ownerOptions);
    expectRejected("archive hit with unrelated evidence", ownerAnnex, (value) => {
        const archive = value.decisions[1].casualty_scan.allowed_hits.find(({ classification }) => classification === "archive");
        archive.evidence = [evidence(intrinsicPath, "unrelated archive assertion")];
    }, "lacks exact by-file evidence", ownerOptions);
    expectRejected("arbitrary archive classification", ownerAnnex, (value) => {
        const tombstone = value.decisions[1].casualty_scan.allowed_hits.find(({ classification }) => classification === "tombstone");
        tombstone.classification = "archive";
        tombstone.reason = "invented archive";
    }, "archive allowlist is outside canonical", ownerOptions);
    expectRejected("missing exact tombstone hit", ownerAnnex, (value) => {
        value.decisions[1].casualty_scan.allowed_hits = value.decisions[1].casualty_scan.allowed_hits.filter(({ classification }) => classification !== "tombstone");
    }, "requires exactly one current intentional tombstone name hit", ownerOptions);
    expectRejected("tombstone name omitted from patterns", ownerAnnex, (value) => {
        value.decisions[1].tombstone.name = "DifferentTombstone";
    }, "casualty patterns omit the exact tombstone name", ownerOptions);
    expectRejected("owner scan bound to invented receipt", ownerAnnex, (value) => {
        const scan = value.decisions[1].casualty_scan;
        scan.consumer_receipt_hash = "0".repeat(64);
        scan.scan_sha256 = sha256(canonicalize({
            consumer_receipt_hash: scan.consumer_receipt_hash,
            decision_id: value.decisions[1].decision_id,
            patterns: scan.patterns,
            roots: scan.roots,
            active_hits: scan.active_hits,
            allowed_hits: scan.allowed_hits,
        }));
    }, "not bound to the current consumer receipt", ownerOptions);
    expectRejected("incomplete zero-residue partition", ownerAnnex, (value) => {
        value.decisions[1].zero_residue.categories.pop();
    }, "schema failure", ownerOptions);

    try {
        validateDeletionJudgmentRecord(clone(ownerAnnex), validationOptions(consumer1, canonicalFailValidator));
        failures.push("universal return validator failure was accepted");
    } catch (error) {
        if (!error.message.includes("failed universal live validation")) failures.push(`universal return validator failed for the wrong reason: ${error.message}`);
        else adversarialRejections += 1;
    }

    const c05Options = validationOptions(consumer2, canonicalPassValidator, false, { expectedOwnerWaves: ["K21"] });
    expectRejected("synthetic C05 deletion", c05Annex, (value) => {
        value.decisions[0].owner_wave = "C05";
        value.decisions[0].origin = { kind: "current-wave" };
    }, "owner union is not the exact transitive return-graph deletion-owner set", c05Options);
    expectRejected("C05 missing originating owner return", c05Annex, (value) => {
        value.ancestor_returns = value.ancestor_returns.filter(({ wave_id }) => wave_id !== "K21");
    }, "lacks its successful owner return", c05Options);
    expectRejected("C05 altered originating decision", c05Annex, (value) => {
        value.decisions[0].intrinsic_job.claim = "C05 invented a different intrinsic-job verdict";
    }, "was not copied exactly from its originating owner return", c05Options);

    const c10Options = validationOptions(consumer3, canonicalPassValidator);
    expectRejected("synthetic C10 deletion", c10Annex, (value) => {
        value.decisions[0].owner_wave = "C10";
        value.decisions[0].origin = { kind: "current-wave" };
        value.c10_removed_surfaces[0].owner_wave = "C10";
    }, "does not exactly equal the rehearsed C05 owner union", c10Options);
    expectRejected("C10 missing originating owner return", c10Annex, (value) => {
        value.ancestor_returns = value.ancestor_returns.filter(({ wave_id }) => wave_id !== "K21");
    }, "does not exactly equal the rehearsed C05 owner union", c10Options);
    expectRejected("C10 altered originating decision", c10Annex, (value) => {
        value.decisions[0].intrinsic_job.claim = "C10 invented a different intrinsic-job verdict";
        finalizeDecision(value.decisions[0]);
        value.c10_removed_surfaces[0].decision_hash = value.decisions[0].decision_hash;
    }, "does not exactly equal the rehearsed C05 owner union", c10Options);
    expectRejected("C10 forged C05 deletion-annex binding", c10Annex, (value) => {
        value.consumer_scan.baseline_deletion_annex_hash = "0".repeat(64);
    }, "does not bind the exact content-addressed C05 deletion rehearsal", c10Options);
    expectRejected("C10 copied C05 census", c10Annex, (value) => {
        value.consumer_scan = {
            ...consumerProjection(consumer2, "c10-final"),
            c05_return: c05Return.binding,
            baseline_deletion_annex_hash: c05Annex.annex_hash,
            baseline_receipt_hash: consumer2.verified.receipt.receipt_hash,
            baseline_epoch_sha256: consumer2.verified.receipt.epoch.epoch_sha256,
            root_delta: [],
            edge_delta: [],
        };
    }, "must rerun the census rather than copy", c10Options);
    expectRejected("C10 omitted release removed-surface row", c10Annex, (value) => {
        value.c10_removed_surfaces.pop();
    }, "must biject exactly", c10Options);
} finally {
    rmSync(fixtureRoot, { recursive: true, force: true });
}

if (failures.length) {
    process.stderr.write(`${failures.join("\n")}\n`);
    process.exit(1);
}

process.stdout.write(`${JSON.stringify({
    schema: "vnext-deletion-judgment-selftest/1",
    valid_owner_precut_annexes: 1,
    valid_c05_rehearsal_annexes: 1,
    valid_c10_aggregate_annexes: 1,
    same_root_truth_receipts: 3,
    modified_only_truth_receipts: 1,
    adversarial_rejections: adversarialRejections,
})}\n`);
