#!/usr/bin/env node

import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { canonicalize, compareCanonicalText, parseJsonStrict } from "./json-contract.mjs";
import {
    cssCorpusPartitions,
    selfHash,
    sha256,
    sharedArtifactContract,
    validateP01StructuralCompletion,
} from "./p01-structural-contract.mjs";

const root = resolve(new URL("..", import.meta.url).pathname);
const load = (name) => parseJsonStrict(readFileSync(resolve(root, name)));
const schemas = {
    authorship: load("p01-independent-authorship.schema.json"),
    inputEpoch: load("p01-input-epoch.schema.json"),
    cssModule: load("css-module-isomorphism.schema.json"),
    originLedger: load("p01-origin-ledger.schema.json"),
    cssCorpus: load("p01-css-corpus.schema.json"),
    grammarOracle: load("p01-grammar-oracle-proposal.schema.json"),
    typescriptCombinators: load("p01-typescript-combinators-proposal.schema.json"),
    differentialLedger: load("p01-differential-ledger.schema.json"),
};
const canonicalAuthorship = load("P01-INDEPENDENT-AUTHORSHIP.json");
const hash = (label) => sha256(`p01-structural-selftest:${label}`);
const commit = "1234567890abcdef1234567890abcdef12345678";

function fixture() {
    const module = {
        bbnf_path: "grammar/css/syntax.bbnf",
        bbnf_sha256: hash("bbnf"),
        typescript_path: "src/css/grammar/syntax.ts",
        test_path: "test/src/css/grammar/syntax.test.ts",
        imports: [],
    };
    const executionManifest = {
        schema: "vnext-css-module-isomorphism/1",
        source: { repository: "/Users/mkbabb/Programming/bbnf-lang", commit, root: "grammar/css" },
        authority: {
            snapshot_kind: "execution-input",
            execution_resnapshot: "after the active BBNF CSS full-modular-union freeze, partition every committed grammar/css/**/*.bbnf file at the P00/P01 coordination pin into runtime modules or typed non-runtime exclusions",
            translation: "handwritten-parse-that-combinators",
            module_join: "replace grammar/css/ with src/css/grammar/ and .bbnf with .ts",
            responsibility_join: "every runtime BBNF CSS module has exactly one typed TypeScript combinator peer and external test owning the same grammar responsibility; every other CSS grammar has one typed non-runtime disposition",
            import_join: "formation snapshots may record exact upstream defects; an execution-input snapshot requires zero corrections and TypeScript edges equal BBNF edges exactly",
            runtime_modules_sha256: sha256(canonicalize([module.bbnf_path])),
            excluded_dispositions_sha256: sha256(canonicalize([])),
            resolved_edges_sha256: sha256(canonicalize([{ bbnf_path: module.bbnf_path, imports: [] }])),
            runtime: "typescript-combinator-only",
            future_generated_parser: "replacement-only-after-separate-adjudication",
            imports_active_engine_novelty: false,
        },
        modules: [module],
        edge_corrections: [],
        excluded: [],
        manifest_hash: "",
    };
    executionManifest.manifest_hash = selfHash(executionManifest, "manifest_hash");
    const executionBinding = {
        path: "/proof/test/proof/p00/css-module-isomorphism.execution.json",
        file_sha256: hash("execution-file"),
        manifest_hash: executionManifest.manifest_hash,
        bbnf_commit: commit,
        runtime_modules_sha256: executionManifest.authority.runtime_modules_sha256,
        excluded_dispositions_sha256: executionManifest.authority.excluded_dispositions_sha256,
        resolved_edges_sha256: executionManifest.authority.resolved_edges_sha256,
    };
    const predecessors = ["P00", "V01", "V02"].map((wave) => ({
        wave_id: wave,
        path: `/proof/${wave}.return.json`,
        file_sha256: hash(`${wave}-file`),
        return_hash: hash(`${wave}-return`),
        wave_contract_sha256: hash(`${wave}-contract`),
    }));
    const packageBinding = {
        name: "@mkbabb/parse-that",
        version: "1.0.0",
        registry_spec: "@mkbabb/parse-that@1.0.0",
        integrity: `sha512-${Buffer.from(hash("integrity")).toString("base64")}`,
        receipt: { path: "/proof/parse-that-package-receipt.json", sha256: hash("package-receipt-file") },
        receipt_hash: hash("package-receipt"),
        tarball_sha256: hash("tarball"),
        files_sha256: hash("package-files"),
        runtime_files_sha256: hash("package-runtime"),
        declaration_files_sha256: hash("package-declarations"),
        export_conditions_sha256: hash("package-exports"),
        no_link_tree_sha256: hash("package-install"),
    };
    const cssCorpusFile = { path: "/proof/css-corpus.json", file_sha256: hash("corpus-file"), corpus_hash: "" };
    const epoch = {
        schema: "vnext-p01-input-epoch/1",
        wave_id: "P01",
        wave_contract_sha256: hash("P01-wave-contract"),
        coordinator_session_id: "pure-p01-coordinator",
        coordinator_transcript: { path: "/proof/coordinator.jsonl", sha256: hash("coordinator-transcript") },
        predecessor_returns: predecessors,
        coordination_clearance: {
            stream: { path: "/proof/coordination.json", sha256: hash("coordination-stream") },
            tip_sequence: 3,
            tip_event_sha256: hash("snapshot-event"),
            parse_that: {
                path: "/Users/mkbabb/Programming/parse-that",
                branch: "master",
                head: commit,
                dirty_sha256: hash("parse-that-dirty"),
            },
            bbnf_lang: {
                path: "/Users/mkbabb/Programming/bbnf-lang",
                branch: "master",
                head: commit,
                dirty_sha256: hash("bbnf-dirty"),
            },
            validator_command: "node docs/tranches/V/vnext/tools/validate-pt-coordination.mjs --require-current",
            validator_stdout: { path: "/proof/coordination-validator.json", sha256: hash("coordination-validator") },
        },
        committed_value: {
            state: "committed",
            repository: "/Users/mkbabb/Programming/value.js",
            commit,
            committed_tree_sha256: hash("value-tree"),
        },
        bbnf_css_union_freeze: {
            state: "frozen",
            scope: "snapshot-2026-constituents-and-exceptions-plus-every-w3c-level-4-module-plus-css-syntax-and-normative-dependencies",
            source_thread_id: "12345678-1234-1234-1234-1234567890ab",
            bbnf_commit: commit,
            snapshot_event_sha256: hash("snapshot-event"),
            module_manifest_sha256: executionBinding.file_sha256,
            runtime_modules_sha256: executionBinding.runtime_modules_sha256,
            excluded_dispositions_sha256: executionBinding.excluded_dispositions_sha256,
            resolved_edges_sha256: executionBinding.resolved_edges_sha256,
            imports_parse_that_novelty: false,
        },
        parse_that_package: packageBinding,
        host_capsule: { path: "/proof/BBNF-HOST-CONTROL.json", sha256: hash("host") },
        css_module_isomorphism: structuredClone(executionBinding),
        css_corpus: cssCorpusFile,
        standards_lock: { path: "/proof/standards-lock.json", sha256: hash("standards") },
        value_css_signatures: { path: "/proof/value-signatures.json", sha256: hash("signatures") },
        shared_inputs: { path: "/proof/p01-origin-ledger.json", file_sha256: hash("origin-file"), ledger_hash: "" },
        frozen_at: "2026-07-18T20:00:00Z",
        epoch_hash: "",
    };
    const cases = cssCorpusPartitions.map((partition) => ({
        case_id: `${partition}.case`,
        partition,
        entry_module: module.bbnf_path,
        covered_modules: [module.bbnf_path],
        fixture: { path: `/proof/corpus/${partition}.css`, sha256: hash(`${partition}-input`) },
        expected: {
            outcome: partition === "pathological" ? "recover" : "accept",
            cst_sha256: hash(`${partition}-cst`),
            diagnostics_sha256: hash(`${partition}-diagnostics`),
            spans_sha256: hash(`${partition}-spans`),
            exact_serialization_sha256: hash(`${partition}-exact`),
            edit_serialization_sha256: hash(`${partition}-edit`),
            canonical_serialization_sha256: hash(`${partition}-canonical`),
            route_trace_sha256: hash(`${partition}-trace`),
        },
    })).sort((left, right) => compareCanonicalText(left.case_id, right.case_id));
    const caseIds = cases.map(({ case_id }) => case_id);
    const cssCorpus = {
        schema: "vnext-p01-css-corpus/1",
        origin: { wave_id: "P00", p00_return_hash: predecessors[0].return_hash },
        execution_manifest: structuredClone(executionBinding),
        partitions: cssCorpusPartitions,
        cases,
        case_ids_sha256: sha256(canonicalize(caseIds)),
        covered_modules_sha256: sha256(canonicalize([module.bbnf_path])),
        corpus_hash: "",
    };
    cssCorpus.corpus_hash = selfHash(cssCorpus, "corpus_hash");
    cssCorpusFile.corpus_hash = cssCorpus.corpus_hash;
    const originLedger = {
        schema: "vnext-p01-origin-ledger/1",
        origins: {
            p00: { kind: "terminal-predecessor-return", ...predecessors[0] },
            v01: { kind: "terminal-predecessor-return", ...predecessors[1] },
            v02: { kind: "terminal-predecessor-return", ...predecessors[2] },
            value_commit: {
                kind: "committed-value",
                repository: "/Users/mkbabb/Programming/value.js",
                commit,
                committed_tree_sha256: hash("value-tree"),
            },
            bbnf_terminal_freeze: {
                kind: "terminal-bbnf-css-union",
                state: "frozen",
                repository: "/Users/mkbabb/Programming/bbnf-lang",
                commit,
                committed_tree_sha256: hash("bbnf-tree"),
                snapshot_event_sha256: epoch.bbnf_css_union_freeze.snapshot_event_sha256,
                module_manifest_sha256: executionBinding.file_sha256,
                runtime_modules_sha256: executionBinding.runtime_modules_sha256,
                excluded_dispositions_sha256: executionBinding.excluded_dispositions_sha256,
                resolved_edges_sha256: executionBinding.resolved_edges_sha256,
            },
            parse_that_package: { kind: "published-package", ...packageBinding },
        },
        shared_artifacts: sharedArtifactContract.map(([id, origin, purpose]) => {
            const evidence = {
                "p00-return": { path: predecessors[0].path, sha256: predecessors[0].file_sha256 },
                "v01-return": { path: predecessors[1].path, sha256: predecessors[1].file_sha256 },
                "v02-return": { path: predecessors[2].path, sha256: predecessors[2].file_sha256 },
                "host-capsule": epoch.host_capsule,
                "css-execution-manifest": { path: executionBinding.path, sha256: executionBinding.file_sha256 },
                "css-corpus": { path: cssCorpusFile.path, sha256: cssCorpusFile.file_sha256 },
                "standards-lock": epoch.standards_lock,
                "value-css-signatures": epoch.value_css_signatures,
                "parse-that-package-receipt": packageBinding.receipt,
            }[id];
            return { id, origin, purpose, ...evidence };
        }),
        ledger_hash: "",
    };
    originLedger.ledger_hash = selfHash(originLedger, "ledger_hash");
    const artifactById = new Map(originLedger.shared_artifacts.map((artifact) => [artifact.id, artifact]));
    const evidenceInput = (id) => {
        const artifact = artifactById.get(id);
        return { path: artifact.path, sha256: artifact.sha256 };
    };
    const predecessorRecords = {
        P00: { evidence_inputs: ["host-capsule", "css-execution-manifest", "css-corpus", "parse-that-package-receipt"].map(evidenceInput) },
        V01: { evidence_inputs: [evidenceInput("standards-lock")] },
        V02: { evidence_inputs: [evidenceInput("value-css-signatures")] },
    };
    epoch.shared_inputs.ledger_hash = originLedger.ledger_hash;
    epoch.epoch_hash = selfHash(epoch, "epoch_hash");

    const implementationRoot = "/proof/proposals/typescript-combinators";
    const implementationManifest = {
        schema: "vnext-p01-typescript-combinators-proposal/1",
        slot: "typescript-combinators",
        input_epoch_hash: epoch.epoch_hash,
        execution_manifest: structuredClone(executionBinding),
        origin_ledger_hash: originLedger.ledger_hash,
        css_corpus_hash: cssCorpus.corpus_hash,
        parse_that_package_receipt_hash: packageBinding.receipt_hash,
        proposal_root: implementationRoot,
        typescript_root: `${implementationRoot}/src/css/grammar`,
        modules: [{ bbnf_path: module.bbnf_path, typescript_path: module.typescript_path, sha256: hash("implementation-module") }],
        runtime_contract: {
            translation: "handwritten-parse-that-combinators",
            package_name: "@mkbabb/parse-that",
            package_version: "1.0.0",
            import_specifier: "@mkbabb/parse-that",
            public_entry_only: true,
            original_string_input: true,
            encoded_token_buffer: false,
            generated_runtime: false,
            alternate_runtime: false,
            workspace_link: false,
            active_t_u_or_bank_input: false,
        },
        manifest_hash: "",
    };
    implementationManifest.manifest_hash = selfHash(implementationManifest, "manifest_hash");
    const oracleRoot = "/proof/proposals/grammar-oracle";
    const oracleFixtures = cases.map(({ case_id }) => ({ case_id, fixture_path: `${case_id}.json`, sha256: hash(`${case_id}-oracle`) }));
    const oracleManifest = {
        schema: "vnext-p01-grammar-oracle-proposal/1",
        slot: "grammar-oracle",
        input_epoch_hash: epoch.epoch_hash,
        execution_manifest: structuredClone(executionBinding),
        origin_ledger_hash: originLedger.ledger_hash,
        css_corpus_hash: cssCorpus.corpus_hash,
        parse_that_package_receipt_hash: packageBinding.receipt_hash,
        proposal_root: oracleRoot,
        test_root: `${oracleRoot}/test/src/css/grammar`,
        fixture_root: `${oracleRoot}/fixtures`,
        tests: [{ bbnf_path: module.bbnf_path, test_path: module.test_path, sha256: hash("oracle-test") }],
        fixtures: oracleFixtures,
        oracle_contract: {
            source: "pinned-bbnf-responsibilities-and-css-corpus",
            implementation_read_before_freeze: false,
            generated_or_copied_from_implementation: false,
            cst: true,
            malformed_input: true,
            original_utf16_spans: true,
            diagnostics: true,
            exact_edit_canonical_serialization: true,
            route_traces: true,
            active_t_u_or_bank_input: false,
        },
        manifest_hash: "",
    };
    oracleManifest.manifest_hash = selfHash(oracleManifest, "manifest_hash");
    const proposals = {
        grammarOracle: {
            binding: {
                root: oracleRoot,
                manifest: { path: `${oracleRoot}/proposal.manifest.json`, sha256: hash("oracle-manifest-file") },
                manifest_hash: oracleManifest.manifest_hash,
                artifact_tree_sha256: hash("oracle-tree"),
            },
            manifest: oracleManifest,
        },
        typescriptCombinators: {
            binding: {
                root: implementationRoot,
                manifest: { path: `${implementationRoot}/proposal.manifest.json`, sha256: hash("implementation-manifest-file") },
                manifest_hash: implementationManifest.manifest_hash,
                artifact_tree_sha256: hash("implementation-tree"),
            },
            manifest: implementationManifest,
        },
    };
    const proposalManifests = {
        grammar_oracle: {
            slot: "grammar-oracle",
            path: proposals.grammarOracle.binding.manifest.path,
            file_sha256: proposals.grammarOracle.binding.manifest.sha256,
            manifest_hash: oracleManifest.manifest_hash,
        },
        typescript_combinators: {
            slot: "typescript-combinators",
            path: proposals.typescriptCombinators.binding.manifest.path,
            file_sha256: proposals.typescriptCombinators.binding.manifest.sha256,
            manifest_hash: implementationManifest.manifest_hash,
        },
    };
    const fixtureHashes = new Map(oracleFixtures.map(({ case_id, sha256 }) => [case_id, sha256]));
    const rows = cases.map(({ case_id, partition, covered_modules }) => ({
        case_id,
        partition,
        covered_modules,
        oracle_fixture_sha256: fixtureHashes.get(case_id),
        implementation_result_sha256: hash(`${case_id}-implementation`),
        comparison: "match",
        owner: { kind: "none" },
    }));
    const differentialLedger = {
        schema: "vnext-p01-differential-ledger/1",
        input_epoch_hash: epoch.epoch_hash,
        execution_manifest: structuredClone(executionBinding),
        css_corpus: cssCorpusFile,
        proposal_manifests: proposalManifests,
        coverage: {
            expected_case_count: caseIds.length,
            compared_case_count: caseIds.length,
            expected_case_ids_sha256: sha256(canonicalize(caseIds)),
            compared_case_ids_sha256: sha256(canonicalize(caseIds)),
            expected_runtime_modules_sha256: sha256(canonicalize([module.bbnf_path])),
            exercised_runtime_modules_sha256: sha256(canonicalize([module.bbnf_path])),
            rows_sha256: sha256(canonicalize(rows)),
        },
        rows,
        unowned_divergence_count: 0,
        ledger_hash: "",
    };
    differentialLedger.ledger_hash = selfHash(differentialLedger, "ledger_hash");
    const authorshipManifest = structuredClone(canonicalAuthorship);
    authorshipManifest.state = "complete";
    authorshipManifest.execution_input_epoch = {
        state: "frozen",
        path: "/proof/test/proof/p01/input-epoch.json",
        file_sha256: hash("input-epoch-file"),
        epoch_hash: epoch.epoch_hash,
    };
    const session = (sessionId, agentPath) => ({
        provider: "codex",
        session_id: sessionId,
        agent_path: agentPath,
        model: "gpt-5.6-sol",
        effort: "ultra",
        fork_turns: "none",
        inherited_dialogue_turns: 0,
        ancestry_session_ids: ["pure-p01-coordinator", sessionId],
        transcript: { path: `/proof/${sessionId}.jsonl`, sha256: hash(`${sessionId}-transcript`) },
    });
    const authorReceipt = (slot, sessionId, agentPath, proposal, offset) => {
        const receipt = {
            schema: "vnext-p01-author-receipt/1",
            slot,
            session: session(sessionId, agentPath),
            frozen_input_epoch_sha256: epoch.epoch_hash,
            report: { path: `/proof/${sessionId}.md`, sha256: hash(`${sessionId}-report`) },
            access_log: { path: `/proof/${sessionId}.access.json`, sha256: hash(`${sessionId}-access`) },
            observed_read_paths: [],
            proposal: structuredClone(proposal.binding),
            session_started_at: `2026-07-18T20:00:0${offset}Z`,
            freeze_started_at: `2026-07-18T20:0${4 + offset}:00Z`,
            freeze_finished_at: `2026-07-18T20:0${4 + offset}:30Z`,
            session_finished_at: `2026-07-18T20:0${6 + offset}:00Z`,
            peer_proposal_read_before_both_freezes: false,
            generated_or_copied_from_peer: false,
            receipt_hash: "",
        };
        receipt.receipt_hash = selfHash(receipt, "receipt_hash");
        return receipt;
    };
    authorshipManifest.author_receipts = [
        authorReceipt("grammar-oracle", "pure-oracle", "/root/p01_grammar_oracle", proposals.grammarOracle, 0),
        authorReceipt("typescript-combinators", "pure-implementation", "/root/p01_typescript_combinators", proposals.typescriptCombinators, 1),
    ];
    const adjudicationReceipt = {
        state: "complete",
        schema: "vnext-p01-adjudication-receipt/1",
        session: session("pure-adjudicator", "/root/p01_independence_adjudicator"),
        started_at: "2026-07-18T20:09:00Z",
        frozen_author_receipt_hashes: authorshipManifest.author_receipts.map(({ receipt_hash }) => receipt_hash).sort(),
        frozen_proposal_manifests: Object.values(proposalManifests).sort((left, right) => compareCanonicalText(left.slot, right.slot)),
        report: { path: "/proof/adjudication.md", sha256: hash("adjudication-report") },
        differential_ledger: { path: "/proof/differential.json", file_sha256: hash("differential-file"), ledger_hash: differentialLedger.ledger_hash },
        verdict: "accepted",
        receipt_hash: "",
    };
    adjudicationReceipt.receipt_hash = selfHash(adjudicationReceipt, "receipt_hash");
    authorshipManifest.adjudication.receipt = adjudicationReceipt;
    authorshipManifest.manifest_hash = selfHash(authorshipManifest, "manifest_hash");
    return {
        authorshipManifest,
        epoch,
        executionManifest,
        originLedger,
        cssCorpus,
        predecessorRecords,
        proposals,
        differentialLedger,
        adjudicationProposalBindings: Object.values(proposalManifests),
        schemas,
    };
}

const failures = [];
const control = fixture();
const controlFailures = validateP01StructuralCompletion(control);
if (controlFailures.length !== 0) failures.push(`pure structural completion control rejected:\n${controlFailures.join("\n")}`);

function expectRejected(name, mutate, fragment) {
    const candidate = structuredClone(control);
    mutate(candidate);
    const errors = validateP01StructuralCompletion(candidate);
    if (!errors.some((error) => error.includes(fragment))) failures.push(`${name}: expected ${fragment}; found ${errors.join(" | ")}`);
}

expectRejected("wrong-role-schema", (value) => {
    value.proposals.typescriptCombinators.manifest.schema = "vnext-p01-grammar-oracle-proposal/1";
    value.proposals.typescriptCombinators.manifest.manifest_hash = selfHash(value.proposals.typescriptCombinators.manifest, "manifest_hash");
    value.proposals.typescriptCombinators.binding.manifest_hash = value.proposals.typescriptCombinators.manifest.manifest_hash;
}, "must equal \"vnext-p01-typescript-combinators-proposal/1\"");
expectRejected("missing-shared-origin", (value) => {
    value.originLedger.shared_artifacts.pop();
    value.originLedger.ledger_hash = selfHash(value.originLedger, "ledger_hash");
}, "exact nine-artifact");
expectRejected("unrouted-shared-artifact", (value) => {
    value.predecessorRecords.P00.evidence_inputs = value.predecessorRecords.P00.evidence_inputs.filter(({ path }) => !path.endsWith("/css-corpus.json"));
}, "P00 return must content-address this exact shared artifact once");
expectRejected("active-t-input", (value) => {
    value.originLedger.shared_artifacts[5].path = "/Users/mkbabb/Programming/value.js/docs/tranches/T/active.json";
    value.originLedger.ledger_hash = selfHash(value.originLedger, "ledger_hash");
}, "active T/U/parse-that-bank input is forbidden");
expectRejected("red-w0-authority", (value) => {
    value.executionManifest.source.commit = "af15f63e0d2d3d719938c13b906a50acbb92ea3b";
    value.executionManifest.manifest_hash = selfHash(value.executionManifest, "manifest_hash");
}, "RED BBNF W0 commit is forbidden");
expectRejected("missing-corpus-partition", (value) => {
    value.cssCorpus.cases = value.cssCorpus.cases.filter(({ partition }) => partition !== "unicode");
    value.cssCorpus.corpus_hash = selfHash(value.cssCorpus, "corpus_hash");
}, "every required partition must be nonempty");
expectRejected("proposal-execution-drift", (value) => {
    value.proposals.grammarOracle.manifest.execution_manifest.manifest_hash = hash("drift");
    value.proposals.grammarOracle.manifest.manifest_hash = selfHash(value.proposals.grammarOracle.manifest, "manifest_hash");
    value.proposals.grammarOracle.binding.manifest_hash = value.proposals.grammarOracle.manifest.manifest_hash;
}, "must equal the frozen execution-manifest");
expectRejected("incomplete-differential", (value) => {
    value.differentialLedger.rows.pop();
    value.differentialLedger.ledger_hash = selfHash(value.differentialLedger, "ledger_hash");
}, "total exactly-once sorted corpus-case coverage required");
expectRejected("unowned-divergence", (value) => {
    value.differentialLedger.rows[0].comparison = "divergence";
    value.differentialLedger.rows[0].owner = { kind: "none" };
    value.differentialLedger.ledger_hash = selfHash(value.differentialLedger, "ledger_hash");
}, "divergence requires exactly one");
expectRejected("mutable-proposal-binding", (value) => {
    value.adjudicationProposalBindings[0].file_sha256 = hash("rewritten-after-freeze");
}, "both immutable role manifests must be bound unchanged");
expectRejected("overlapping-role-roots", (value) => {
    const oracleRoot = value.proposals.grammarOracle.binding.root;
    value.proposals.typescriptCombinators.binding.root = `${oracleRoot}/implementation`;
    value.proposals.typescriptCombinators.binding.manifest.path = `${oracleRoot}/implementation/proposal.manifest.json`;
    value.proposals.typescriptCombinators.manifest.proposal_root = `${oracleRoot}/implementation`;
    value.proposals.typescriptCombinators.manifest.typescript_root = `${oracleRoot}/implementation/src/css/grammar`;
    value.proposals.typescriptCombinators.manifest.manifest_hash = selfHash(value.proposals.typescriptCombinators.manifest, "manifest_hash");
    value.proposals.typescriptCombinators.binding.manifest_hash = value.proposals.typescriptCombinators.manifest.manifest_hash;
}, "role proposal roots overlap");

if (failures.length) {
    process.stderr.write(`${failures.join("\n")}\n`);
    process.exit(1);
}
process.stdout.write(`${JSON.stringify({
    schema: "vnext-p01-structural-contract-selftest/1",
    passing_completion_controls: 1,
    adversarial_rejections: 11,
})}\n`);
