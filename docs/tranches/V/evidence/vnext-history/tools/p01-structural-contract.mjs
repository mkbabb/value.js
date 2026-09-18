import { createHash } from "node:crypto";
import { isAbsolute, relative, resolve } from "node:path";

import { canonicalize, compareCanonicalText, validateJsonSchema } from "./json-contract.mjs";

export const cssCorpusPartitions = [
    "syntax",
    "value",
    "stylesheet",
    "unicode",
    "pathological",
    "serialization",
    "consumer-ingest",
    "historical-disposition",
];

export const sharedArtifactContract = [
    ["p00-return", "P00", "terminal-predecessor-return"],
    ["v01-return", "V01", "terminal-predecessor-return"],
    ["v02-return", "V02", "terminal-predecessor-return"],
    ["host-capsule", "P00", "historical-host-control"],
    ["css-execution-manifest", "P00", "terminal-css-runtime-partition"],
    ["css-corpus", "P00", "pinned-css-differential-corpus"],
    ["standards-lock", "V01", "standards-lock"],
    ["value-css-signatures", "V02", "value-css-signature-lock"],
    ["parse-that-package-receipt", "published-parse-that-1.0.0", "published-package-receipt"],
];

export const forbiddenFormationBbnfCommit = "af15f63e0d2d3d719938c13b906a50acbb92ea3b";

export function sha256(input) {
    return createHash("sha256").update(input).digest("hex");
}

export function selfHash(value, member) {
    const preimage = structuredClone(value);
    delete preimage[member];
    return sha256(canonicalize(preimage));
}

export function p01ExecutionBinding(epoch) {
    return epoch?.css_module_isomorphism;
}

export function isForbiddenP01InputPath(path) {
    if (typeof path !== "string") return false;
    if (path === "/Users/mkbabb/Programming/parse-that" || path.startsWith("/Users/mkbabb/Programming/parse-that/")) return true;
    if (/(?:^|\/)docs\/tranches\/(?:T|U)(?:\/|$)/.test(path)) return true;
    if (/(?:^|\/)docs\/tranches\/B(?:\/|$)/.test(path)) return true;
    if (/(?:^|\/)(?:research-)?bank(?:\/|$)/i.test(path)) return true;
    return false;
}

function same(left, right) {
    return canonicalize(left) === canonicalize(right);
}

function sorted(values) {
    return [...values].sort(compareCanonicalText);
}

function pathWithin(root, candidate) {
    if (!isAbsolute(root) || !isAbsolute(candidate)) return false;
    const fromRoot = relative(root, candidate);
    return fromRoot !== "" && !fromRoot.startsWith("..") && !isAbsolute(fromRoot);
}

function pathsOverlap(left, right) {
    if (!isAbsolute(left ?? "") || !isAbsolute(right ?? "")) return false;
    const fromLeft = relative(left, right);
    const fromRight = relative(right, left);
    return fromLeft === "" || (!fromLeft.startsWith("..") && !isAbsolute(fromLeft)) || (!fromRight.startsWith("..") && !isAbsolute(fromRight));
}

function schemaFailures(value, schema, pointer, failures) {
    if (!schema) {
        failures.push(`${pointer}: structural schema was not supplied`);
        return;
    }
    for (const error of validateJsonSchema(value, schema)) failures.push(`${pointer}${error}`);
}

function exactExecutionBinding(actual, expected, pointer, failures) {
    if (!same(actual, expected)) failures.push(`${pointer}: must equal the frozen execution-manifest path, file hash, internal hash, BBNF commit and three upstream vector hashes`);
}

function exactEvidence(actual, expected, pointer, failures) {
    if (actual?.path !== expected?.path || actual?.sha256 !== expected?.sha256) failures.push(`${pointer}: path/hash binding mismatch`);
}

function rowById(rows) {
    return new Map((rows ?? []).map((row) => [row.case_id, row]));
}

export function validateP01StructuralCompletion({
    authorshipManifest,
    epoch,
    executionManifest,
    originLedger,
    cssCorpus,
    predecessorRecords = {},
    proposals,
    differentialLedger,
    adjudicationProposalBindings,
    schemas = {},
    forbiddenBbnfCommit = forbiddenFormationBbnfCommit,
}) {
    const failures = [];
    const executionBinding = p01ExecutionBinding(epoch);
    const modules = executionManifest?.modules ?? [];
    const excluded = executionManifest?.excluded ?? [];
    const modulePaths = modules.map(({ bbnf_path }) => bbnf_path);
    const moduleSet = new Set(modulePaths);

    schemaFailures(authorshipManifest, schemas.authorship, "/", failures);
    if (authorshipManifest?.state !== "complete") failures.push("/state: pure structural completion requires complete");
    if (authorshipManifest?.manifest_hash !== selfHash(authorshipManifest ?? {}, "manifest_hash")) failures.push("/manifest_hash: internal self-hash mismatch");
    if (authorshipManifest?.execution_input_epoch?.epoch_hash !== epoch?.epoch_hash) failures.push("/execution_input_epoch/epoch_hash: authority binding and parsed epoch differ");
    schemaFailures(epoch, schemas.inputEpoch, "/execution_input_epoch", failures);
    schemaFailures(executionManifest, schemas.cssModule, "/execution_input_epoch/css_module_isomorphism/file", failures);
    if (!epoch || epoch.schema !== "vnext-p01-input-epoch/1") failures.push("/execution_input_epoch: frozen P01 epoch is required");
    if (epoch?.epoch_hash !== selfHash(epoch ?? {}, "epoch_hash")) failures.push("/execution_input_epoch/epoch_hash: internal self-hash mismatch");
    if (!executionManifest || executionManifest.authority?.snapshot_kind !== "execution-input") failures.push("/execution_input_epoch/css_module_isomorphism: execution-input snapshot required");
    if ((executionManifest?.edge_corrections ?? []).length !== 0) failures.push("/execution_input_epoch/css_module_isomorphism/edge_corrections: execution authority requires zero corrections");
    if (executionBinding?.path && !executionBinding.path.endsWith("/test/proof/p00/css-module-isomorphism.execution.json")) {
        failures.push("/execution_input_epoch/css_module_isomorphism/path: distinct test/proof/p00/css-module-isomorphism.execution.json required");
    }
    if (executionManifest?.source?.commit === forbiddenBbnfCommit || executionBinding?.bbnf_commit === forbiddenBbnfCommit) {
        failures.push("/execution_input_epoch/css_module_isomorphism/bbnf_commit: formation/current RED BBNF W0 commit is forbidden as execution authority");
    }
    if (executionManifest?.manifest_hash !== selfHash(executionManifest ?? {}, "manifest_hash")) failures.push("/execution_input_epoch/css_module_isomorphism/manifest_hash: internal self-hash mismatch");
    if (executionManifest?.source?.commit !== executionBinding?.bbnf_commit) failures.push("/execution_input_epoch/css_module_isomorphism/bbnf_commit: source commit binding mismatch");
    for (const field of ["runtime_modules_sha256", "excluded_dispositions_sha256", "resolved_edges_sha256"]) {
        if (executionManifest?.authority?.[field] !== executionBinding?.[field]) failures.push(`/execution_input_epoch/css_module_isomorphism/${field}: execution binding mismatch`);
        if (executionBinding?.[field] !== epoch?.bbnf_css_union_freeze?.[field]) failures.push(`/execution_input_epoch/css_module_isomorphism/${field}: upstream terminal-freeze vector mismatch`);
    }
    if (!same(modulePaths, sorted(modulePaths))) failures.push("/execution_input_epoch/css_module_isomorphism/modules: must be sorted");
    const excludedPaths = excluded.map(({ bbnf_path }) => bbnf_path);
    if (!same(excludedPaths, sorted(excludedPaths))) failures.push("/execution_input_epoch/css_module_isomorphism/excluded: must be sorted");
    const computedVectors = {
        runtime_modules_sha256: sha256(canonicalize(modulePaths)),
        excluded_dispositions_sha256: sha256(canonicalize(excluded.map(({ bbnf_path, disposition }) => ({ bbnf_path, disposition })))),
        resolved_edges_sha256: sha256(canonicalize(modules.map(({ bbnf_path, imports }) => ({ bbnf_path, imports })))),
    };
    for (const [field, digest] of Object.entries(computedVectors)) {
        if (executionManifest?.authority?.[field] !== digest) failures.push(`/execution_input_epoch/css_module_isomorphism/authority/${field}: computed ${digest}`);
    }

    schemaFailures(originLedger, schemas.originLedger, "/execution_input_epoch/shared_inputs", failures);
    if (originLedger?.ledger_hash !== selfHash(originLedger ?? {}, "ledger_hash")) failures.push("/execution_input_epoch/shared_inputs/ledger_hash: internal self-hash mismatch");
    const predecessorByWave = new Map((epoch?.predecessor_returns ?? []).map((row) => [row.wave_id, row]));
    for (const [key, wave] of [["p00", "P00"], ["v01", "V01"], ["v02", "V02"]]) {
        const expected = predecessorByWave.get(wave);
        const actual = originLedger?.origins?.[key];
        const projected = actual && {
            wave_id: actual.wave_id,
            path: actual.path,
            file_sha256: actual.file_sha256,
            return_hash: actual.return_hash,
            wave_contract_sha256: actual.wave_contract_sha256,
        };
        if (!same(projected, expected)) failures.push(`/execution_input_epoch/shared_inputs/origins/${key}: must exactly bind the ${wave} terminal return`);
    }
    const valueOrigin = originLedger?.origins?.value_commit;
    const expectedValueOrigin = epoch?.committed_value && {
        repository: epoch.committed_value.repository,
        commit: epoch.committed_value.commit,
        committed_tree_sha256: epoch.committed_value.committed_tree_sha256,
    };
    const actualValueOrigin = valueOrigin && {
        repository: valueOrigin.repository,
        commit: valueOrigin.commit,
        committed_tree_sha256: valueOrigin.committed_tree_sha256,
    };
    if (!same(actualValueOrigin, expectedValueOrigin)) failures.push("/execution_input_epoch/shared_inputs/origins/value_commit: must exactly bind the epoch's committed Value tree");
    const freeze = epoch?.bbnf_css_union_freeze;
    const ledgerFreeze = originLedger?.origins?.bbnf_terminal_freeze;
    const expectedFreeze = freeze && {
        state: freeze.state,
        commit: freeze.bbnf_commit,
        snapshot_event_sha256: freeze.snapshot_event_sha256,
        module_manifest_sha256: freeze.module_manifest_sha256,
        runtime_modules_sha256: freeze.runtime_modules_sha256,
        excluded_dispositions_sha256: freeze.excluded_dispositions_sha256,
        resolved_edges_sha256: freeze.resolved_edges_sha256,
    };
    const actualFreeze = ledgerFreeze && {
        state: ledgerFreeze.state,
        commit: ledgerFreeze.commit,
        snapshot_event_sha256: ledgerFreeze.snapshot_event_sha256,
        module_manifest_sha256: ledgerFreeze.module_manifest_sha256,
        runtime_modules_sha256: ledgerFreeze.runtime_modules_sha256,
        excluded_dispositions_sha256: ledgerFreeze.excluded_dispositions_sha256,
        resolved_edges_sha256: ledgerFreeze.resolved_edges_sha256,
    };
    if (!same(actualFreeze, expectedFreeze)) failures.push("/execution_input_epoch/shared_inputs/origins/bbnf_terminal_freeze: must exactly project the terminal CSS-union freeze");
    if (ledgerFreeze?.commit === forbiddenBbnfCommit) failures.push("/execution_input_epoch/shared_inputs/origins/bbnf_terminal_freeze/commit: RED W0 authority is forbidden");
    const packageOrigin = originLedger?.origins?.parse_that_package;
    const expectedPackage = epoch?.parse_that_package && {
        name: epoch.parse_that_package.name,
        version: epoch.parse_that_package.version,
        registry_spec: epoch.parse_that_package.registry_spec,
        integrity: epoch.parse_that_package.integrity,
        receipt: epoch.parse_that_package.receipt,
        receipt_hash: epoch.parse_that_package.receipt_hash,
        tarball_sha256: epoch.parse_that_package.tarball_sha256,
        files_sha256: epoch.parse_that_package.files_sha256,
        runtime_files_sha256: epoch.parse_that_package.runtime_files_sha256,
        declaration_files_sha256: epoch.parse_that_package.declaration_files_sha256,
        export_conditions_sha256: epoch.parse_that_package.export_conditions_sha256,
        no_link_tree_sha256: epoch.parse_that_package.no_link_tree_sha256,
    };
    const actualPackage = packageOrigin && {
        name: packageOrigin.name,
        version: packageOrigin.version,
        registry_spec: packageOrigin.registry_spec,
        integrity: packageOrigin.integrity,
        receipt: packageOrigin.receipt,
        receipt_hash: packageOrigin.receipt_hash,
        tarball_sha256: packageOrigin.tarball_sha256,
        files_sha256: packageOrigin.files_sha256,
        runtime_files_sha256: packageOrigin.runtime_files_sha256,
        declaration_files_sha256: packageOrigin.declaration_files_sha256,
        export_conditions_sha256: packageOrigin.export_conditions_sha256,
        no_link_tree_sha256: packageOrigin.no_link_tree_sha256,
    };
    if (!same(actualPackage, expectedPackage)) failures.push("/execution_input_epoch/shared_inputs/origins/parse_that_package: must exactly project the validated published-package receipt");

    const expectedArtifacts = new Map([
        ["p00-return", predecessorByWave.get("P00") && { path: predecessorByWave.get("P00").path, sha256: predecessorByWave.get("P00").file_sha256 }],
        ["v01-return", predecessorByWave.get("V01") && { path: predecessorByWave.get("V01").path, sha256: predecessorByWave.get("V01").file_sha256 }],
        ["v02-return", predecessorByWave.get("V02") && { path: predecessorByWave.get("V02").path, sha256: predecessorByWave.get("V02").file_sha256 }],
        ["host-capsule", epoch?.host_capsule],
        ["css-execution-manifest", executionBinding && { path: executionBinding.path, sha256: executionBinding.file_sha256 }],
        ["css-corpus", epoch?.css_corpus && { path: epoch.css_corpus.path, sha256: epoch.css_corpus.file_sha256 }],
        ["standards-lock", epoch?.standards_lock],
        ["value-css-signatures", epoch?.value_css_signatures],
        ["parse-that-package-receipt", epoch?.parse_that_package?.receipt],
    ]);
    const artifacts = originLedger?.shared_artifacts ?? [];
    if (!same(artifacts.map(({ id, origin, purpose }) => [id, origin, purpose]), sharedArtifactContract)) {
        failures.push("/execution_input_epoch/shared_inputs/shared_artifacts: exact nine-artifact P00/V01/V02/published-package projection required");
    }
    for (const [index, artifact] of artifacts.entries()) {
        exactEvidence({ path: artifact.path, sha256: artifact.sha256 }, expectedArtifacts.get(artifact.id), `/execution_input_epoch/shared_inputs/shared_artifacts/${index}`, failures);
        if (isForbiddenP01InputPath(artifact.path)) failures.push(`/execution_input_epoch/shared_inputs/shared_artifacts/${index}/path: active T/U/parse-that-bank input is forbidden`);
        const lineageWave = {
            "host-capsule": "P00",
            "css-execution-manifest": "P00",
            "css-corpus": "P00",
            "standards-lock": "V01",
            "value-css-signatures": "V02",
            "parse-that-package-receipt": "P00",
        }[artifact.id];
        if (lineageWave) {
            const matches = (predecessorRecords?.[lineageWave]?.evidence_inputs ?? []).filter((input) => input.path === artifact.path && input.sha256 === artifact.sha256);
            if (matches.length !== 1) failures.push(`/execution_input_epoch/shared_inputs/shared_artifacts/${index}: ${lineageWave} return must content-address this exact shared artifact once`);
        }
    }

    schemaFailures(cssCorpus, schemas.cssCorpus, "/execution_input_epoch/css_corpus", failures);
    if (cssCorpus?.corpus_hash !== selfHash(cssCorpus ?? {}, "corpus_hash")) failures.push("/execution_input_epoch/css_corpus/corpus_hash: internal self-hash mismatch");
    exactExecutionBinding(cssCorpus?.execution_manifest, executionBinding, "/execution_input_epoch/css_corpus/execution_manifest", failures);
    if (cssCorpus?.origin?.p00_return_hash !== predecessorByWave.get("P00")?.return_hash) failures.push("/execution_input_epoch/css_corpus/origin: exact P00 return required");
    if (!same(cssCorpus?.partitions, cssCorpusPartitions)) failures.push("/execution_input_epoch/css_corpus/partitions: exact eight required partitions expected");
    const cases = cssCorpus?.cases ?? [];
    const caseIds = cases.map(({ case_id }) => case_id);
    if (!same(caseIds, sorted(caseIds)) || new Set(caseIds).size !== caseIds.length) failures.push("/execution_input_epoch/css_corpus/cases: case IDs must be unique and sorted");
    if (cssCorpus?.case_ids_sha256 !== sha256(canonicalize(caseIds))) failures.push("/execution_input_epoch/css_corpus/case_ids_sha256: case universe digest mismatch");
    const seenPartitions = new Set(cases.map(({ partition }) => partition));
    if (!same(sorted(seenPartitions), sorted(cssCorpusPartitions))) failures.push("/execution_input_epoch/css_corpus/cases: every required partition must be nonempty");
    const corpusCoveredModules = sorted(new Set(cases.flatMap(({ covered_modules = [] }) => covered_modules)));
    if (cssCorpus?.covered_modules_sha256 !== sha256(canonicalize(corpusCoveredModules))) failures.push("/execution_input_epoch/css_corpus/covered_modules_sha256: covered-module digest mismatch");
    if (!same(corpusCoveredModules, sorted(modulePaths))) failures.push("/execution_input_epoch/css_corpus/cases: covered-module union must equal every execution runtime module");
    for (const [index, corpusCase] of cases.entries()) {
        if (!corpusCase.covered_modules?.includes(corpusCase.entry_module)) failures.push(`/execution_input_epoch/css_corpus/cases/${index}/entry_module: must be included in covered_modules`);
        if ((corpusCase.covered_modules ?? []).some((path) => !moduleSet.has(path))) failures.push(`/execution_input_epoch/css_corpus/cases/${index}/covered_modules: module is outside the execution runtime partition`);
        if (isForbiddenP01InputPath(corpusCase.fixture?.path)) failures.push(`/execution_input_epoch/css_corpus/cases/${index}/fixture/path: active T/U/parse-that-bank input is forbidden`);
    }

    const oracle = proposals?.grammarOracle;
    const implementation = proposals?.typescriptCombinators;
    const authorshipReceipts = new Map((authorshipManifest?.author_receipts ?? []).map((receipt) => [receipt.slot, receipt]));
    for (const [slot, proposal] of [["grammar-oracle", oracle], ["typescript-combinators", implementation]]) {
        if (!same(authorshipReceipts.get(slot)?.proposal, proposal?.binding)) failures.push(`/author_receipts/${slot}/proposal: complete authority does not bind the parsed role proposal unchanged`);
    }
    for (const [name, proposal, schema] of [
        ["grammar-oracle", oracle, schemas.grammarOracle],
        ["typescript-combinators", implementation, schemas.typescriptCombinators],
    ]) {
        schemaFailures(proposal?.manifest, schema, `/author_receipts/${name}/proposal/manifest`, failures);
        if (proposal?.manifest?.manifest_hash !== selfHash(proposal?.manifest ?? {}, "manifest_hash")) failures.push(`/author_receipts/${name}/proposal/manifest_hash: internal self-hash mismatch`);
        if (proposal?.binding?.manifest_hash !== proposal?.manifest?.manifest_hash) failures.push(`/author_receipts/${name}/proposal/manifest_hash: receipt does not bind the parsed manifest hash`);
        if (proposal?.manifest?.proposal_root !== proposal?.binding?.root) failures.push(`/author_receipts/${name}/proposal/root: role manifest and receipt root differ`);
        if (proposal?.binding?.manifest?.path !== resolve(proposal?.binding?.root ?? "/", "proposal.manifest.json")) failures.push(`/author_receipts/${name}/proposal/manifest/path: immutable manifest must be proposal-root/proposal.manifest.json`);
        exactExecutionBinding(proposal?.manifest?.execution_manifest, executionBinding, `/author_receipts/${name}/proposal/execution_manifest`, failures);
        if (proposal?.manifest?.input_epoch_hash !== epoch?.epoch_hash) failures.push(`/author_receipts/${name}/proposal/input_epoch_hash: frozen epoch mismatch`);
        if (proposal?.manifest?.origin_ledger_hash !== originLedger?.ledger_hash) failures.push(`/author_receipts/${name}/proposal/origin_ledger_hash: shared-input ledger mismatch`);
        if (proposal?.manifest?.css_corpus_hash !== cssCorpus?.corpus_hash) failures.push(`/author_receipts/${name}/proposal/css_corpus_hash: corpus mismatch`);
        if (proposal?.manifest?.parse_that_package_receipt_hash !== epoch?.parse_that_package?.receipt_hash) failures.push(`/author_receipts/${name}/proposal/parse_that_package_receipt_hash: published package mismatch`);
        for (const path of [proposal?.binding?.root, proposal?.binding?.manifest?.path]) {
            if (isForbiddenP01InputPath(path)) failures.push(`/author_receipts/${name}/proposal: active T/U/parse-that-bank root is forbidden`);
        }
    }
    if (pathsOverlap(oracle?.binding?.root, implementation?.binding?.root)) failures.push("/author_receipts: role proposal roots overlap");
    if (!pathWithin(implementation?.binding?.root ?? "", implementation?.manifest?.typescript_root ?? "")) failures.push("/author_receipts/typescript-combinators/proposal/typescript_root: must be a strict descendant of its proposal root");
    if (!pathWithin(oracle?.binding?.root ?? "", oracle?.manifest?.test_root ?? "")) failures.push("/author_receipts/grammar-oracle/proposal/test_root: must be a strict descendant of its proposal root");
    if (!pathWithin(oracle?.binding?.root ?? "", oracle?.manifest?.fixture_root ?? "")) failures.push("/author_receipts/grammar-oracle/proposal/fixture_root: must be a strict descendant of its proposal root");
    if (implementation?.manifest?.typescript_root !== resolve(implementation?.binding?.root ?? "/", "src/css/grammar")) failures.push("/author_receipts/typescript-combinators/proposal/typescript_root: exact proposal-root/src/css/grammar join required");
    if (oracle?.manifest?.test_root !== resolve(oracle?.binding?.root ?? "/", "test/src/css/grammar")) failures.push("/author_receipts/grammar-oracle/proposal/test_root: exact proposal-root/test/src/css/grammar join required");
    if (oracle?.manifest?.fixture_root !== resolve(oracle?.binding?.root ?? "/", "fixtures")) failures.push("/author_receipts/grammar-oracle/proposal/fixture_root: exact proposal-root/fixtures join required");
    if (pathsOverlap(oracle?.manifest?.test_root, oracle?.manifest?.fixture_root)) failures.push("/author_receipts/grammar-oracle/proposal: test_root and fixture_root must be disjoint");

    const expectedImplementationModules = modules.map(({ bbnf_path, typescript_path }) => ({ bbnf_path, typescript_path }));
    const actualImplementationModules = (implementation?.manifest?.modules ?? []).map(({ bbnf_path, typescript_path }) => ({ bbnf_path, typescript_path }));
    if (!same(actualImplementationModules, expectedImplementationModules)) failures.push("/author_receipts/typescript-combinators/proposal/modules: exact execution BBNF-to-TypeScript vector required");
    const expectedOracleTests = modules.map(({ bbnf_path, test_path }) => ({ bbnf_path, test_path }));
    const actualOracleTests = (oracle?.manifest?.tests ?? []).map(({ bbnf_path, test_path }) => ({ bbnf_path, test_path }));
    if (!same(actualOracleTests, expectedOracleTests)) failures.push("/author_receipts/grammar-oracle/proposal/tests: exact execution BBNF-to-test vector required");
    const fixtureIds = (oracle?.manifest?.fixtures ?? []).map(({ case_id }) => case_id);
    if (!same(fixtureIds, caseIds)) failures.push("/author_receipts/grammar-oracle/proposal/fixtures: exactly one sorted oracle fixture per corpus case required");

    schemaFailures(differentialLedger, schemas.differentialLedger, "/adjudication/receipt/differential_ledger", failures);
    if (differentialLedger?.ledger_hash !== selfHash(differentialLedger ?? {}, "ledger_hash")) failures.push("/adjudication/receipt/differential_ledger/ledger_hash: internal self-hash mismatch");
    if (differentialLedger?.input_epoch_hash !== epoch?.epoch_hash) failures.push("/adjudication/receipt/differential_ledger/input_epoch_hash: frozen epoch mismatch");
    exactExecutionBinding(differentialLedger?.execution_manifest, executionBinding, "/adjudication/receipt/differential_ledger/execution_manifest", failures);
    const expectedCorpusBinding = epoch?.css_corpus && { path: epoch.css_corpus.path, file_sha256: epoch.css_corpus.file_sha256, corpus_hash: epoch.css_corpus.corpus_hash };
    if (!same(differentialLedger?.css_corpus, expectedCorpusBinding)) failures.push("/adjudication/receipt/differential_ledger/css_corpus: frozen corpus path/file/internal hashes required");
    const expectedProposalBindings = {
        grammar_oracle: oracle && { slot: "grammar-oracle", path: oracle.binding?.manifest?.path, file_sha256: oracle.binding?.manifest?.sha256, manifest_hash: oracle.binding?.manifest_hash },
        typescript_combinators: implementation && { slot: "typescript-combinators", path: implementation.binding?.manifest?.path, file_sha256: implementation.binding?.manifest?.sha256, manifest_hash: implementation.binding?.manifest_hash },
    };
    if (!same(differentialLedger?.proposal_manifests, expectedProposalBindings)) failures.push("/adjudication/receipt/differential_ledger/proposal_manifests: both immutable role-manifest path/file/internal hashes required");
    const expectedAdjudicationBindings = [expectedProposalBindings.grammar_oracle, expectedProposalBindings.typescript_combinators].sort((left, right) => compareCanonicalText(left.slot, right.slot));
    if (!same([...(adjudicationProposalBindings ?? [])].sort((left, right) => compareCanonicalText(left.slot, right.slot)), expectedAdjudicationBindings)) {
        failures.push("/adjudication/receipt/frozen_proposal_manifests: both immutable role manifests must be bound unchanged");
    }
    if (!same([...(authorshipManifest?.adjudication?.receipt?.frozen_proposal_manifests ?? [])].sort((left, right) => compareCanonicalText(left.slot, right.slot)), expectedAdjudicationBindings)) {
        failures.push("/adjudication/receipt/frozen_proposal_manifests: complete authority and parsed proposals differ");
    }
    if (authorshipManifest?.adjudication?.receipt?.differential_ledger?.ledger_hash !== differentialLedger?.ledger_hash) {
        failures.push("/adjudication/receipt/differential_ledger/ledger_hash: complete authority and parsed ledger differ");
    }

    const ledgerRows = differentialLedger?.rows ?? [];
    const ledgerCaseIds = ledgerRows.map(({ case_id }) => case_id);
    if (!same(ledgerCaseIds, caseIds)) failures.push("/adjudication/receipt/differential_ledger/rows: total exactly-once sorted corpus-case coverage required");
    const casesById = rowById(cases);
    const fixtureById = rowById(oracle?.manifest?.fixtures ?? []);
    for (const [index, row] of ledgerRows.entries()) {
        const corpusCase = casesById.get(row.case_id);
        if (!corpusCase || row.partition !== corpusCase.partition || !same(row.covered_modules, corpusCase.covered_modules)) {
            failures.push(`/adjudication/receipt/differential_ledger/rows/${index}: partition/module coverage must equal the frozen corpus case`);
        }
        if (row.oracle_fixture_sha256 !== fixtureById.get(row.case_id)?.sha256) failures.push(`/adjudication/receipt/differential_ledger/rows/${index}/oracle_fixture_sha256: frozen oracle fixture mismatch`);
        if (row.comparison === "match" && row.owner?.kind !== "none") failures.push(`/adjudication/receipt/differential_ledger/rows/${index}/owner: matching row must have owner none`);
        if (row.comparison === "divergence" && !["value-owned-grammar-row", "p00-parse-that-blocker", "external-bbnf-topology-row"].includes(row.owner?.kind)) {
            failures.push(`/adjudication/receipt/differential_ledger/rows/${index}/owner: divergence requires exactly one Value grammar, P00 parse-that or external BBNF owner`);
        }
    }
    const exercisedModules = sorted(new Set(ledgerRows.flatMap(({ covered_modules = [] }) => covered_modules)));
    const coverage = differentialLedger?.coverage;
    const expectedCoverage = {
        expected_case_count: caseIds.length,
        compared_case_count: ledgerCaseIds.length,
        expected_case_ids_sha256: sha256(canonicalize(caseIds)),
        compared_case_ids_sha256: sha256(canonicalize(ledgerCaseIds)),
        expected_runtime_modules_sha256: sha256(canonicalize(sorted(modulePaths))),
        exercised_runtime_modules_sha256: sha256(canonicalize(exercisedModules)),
        rows_sha256: sha256(canonicalize(ledgerRows)),
    };
    if (!same(coverage, expectedCoverage)) failures.push("/adjudication/receipt/differential_ledger/coverage: total case/module coverage receipts do not recompute");
    if (!same(exercisedModules, sorted(modulePaths))) failures.push("/adjudication/receipt/differential_ledger/rows: runtime-module exercise coverage is not total");
    const unowned = ledgerRows.filter((row) => row.comparison === "divergence" && !["value-owned-grammar-row", "p00-parse-that-blocker", "external-bbnf-topology-row"].includes(row.owner?.kind)).length;
    if (differentialLedger?.unowned_divergence_count !== 0 || unowned !== 0) failures.push("/adjudication/receipt/differential_ledger/unowned_divergence_count: no unowned divergence is permitted");

    return failures;
}
