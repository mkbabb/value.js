import { lstatSync, readFileSync, readdirSync, readlinkSync } from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

import { canonical, sha256 } from "./protocol.ts";

export type CandidateRow = { id: string; path: string; sha256: string };

export const here = dirname(fileURLToPath(import.meta.url));
export const mirrorRoot = resolve(here, "../../../..");
export const repoRoot = resolve(mirrorRoot, "../../../../../..");
export const manifestPath = resolve(here, "benchmark-manifest.json");
export const fail = (message: string): never => { throw new Error(message); };
export const json = (path: string): any => JSON.parse(readFileSync(path, "utf8"));
export const hashFile = (path: string): string => sha256(readFileSync(path));

function treeLedger(base: string) {
    const rows: string[] = [];
    const visit = (directory: string): void => {
        for (const name of readdirSync(directory).sort()) {
            const path = join(directory, name);
            const stat = lstatSync(path);
            const local = relative(base, path).split(sep).join("/");
            if (stat.isDirectory()) visit(path);
            else if (stat.isSymbolicLink()) rows.push(`L  ${local}  ${readlinkSync(path)}\n`);
            else if (stat.isFile()) rows.push(`F  ${hashFile(path)}  ${stat.size}  ${(stat.mode & 0o777).toString(8).padStart(4, "0")}  ${local}\n`);
            else fail(`unsupported package-tree entry: ${path}`);
        }
    };
    visit(base);
    const ledger = rows.join("");
    return { files_or_links: rows.length, ledger_bytes: Buffer.byteLength(ledger), ledger_sha256: sha256(ledger) };
}

export function verifyBindings(manifest: any): void {
    if (manifest.status !== "OPTIMIZED_H2_V3_PRE_TIMING") fail("unexpected manifest status");
    const expectedLanes = manifest.protocol.candidate_count + manifest.protocol.comparable_peer_count;
    const expectedBlocks = expectedLanes * 2 * manifest.protocol.sample_superblocks;
    if (manifest.candidate_registry.expected_candidates !== manifest.protocol.candidate_count
        || manifest.protocol.comparable_peer_count !== 1
        || manifest.protocol.sample_blocks_when_registry_has_four_candidates !== expectedBlocks) {
        fail("candidate/schedule cardinality mismatch");
    }
    const node = manifest.bindings.runtime.node;
    if (process.version !== node.version || process.execPath !== node.path || hashFile(process.execPath) !== node.sha256) {
        fail("Node runtime binding mismatch");
    }
    for (const group of [manifest.bindings.runtime.files, manifest.bindings.peer_sources, manifest.bindings.harness.files]) {
        for (const row of group) if (hashFile(resolve(repoRoot, row.path)) !== row.sha256) fail(`file binding mismatch: ${row.path}`);
    }
    for (const tree of manifest.bindings.runtime.trees) {
        if (canonical(treeLedger(resolve(repoRoot, tree.path))) !== canonical({
            files_or_links: tree.files_or_links,
            ledger_bytes: tree.ledger_bytes,
            ledger_sha256: tree.ledger_sha256,
        })) fail(`${tree.id}: package-tree binding mismatch`);
    }
    for (const classification of ["common_domain", "corrected_only"]) {
        const bytes = `${canonical(manifest.corpus[classification])}\n`;
        if (sha256(bytes) !== manifest.corpus.bindings[`${classification}_sha256`]) fail(`${classification} corpus binding mismatch`);
    }
}

export function candidateRegistry(manifest: any): { hash: string; rows: CandidateRow[] } {
    const binding = manifest.candidate_registry;
    if (typeof binding.sha256 !== "string" || !/^[0-9a-f]{64}$/.test(binding.sha256)) {
        fail("candidate registry is still an unhashed placeholder");
    }
    const path = resolve(repoRoot, binding.path);
    if (hashFile(path) !== binding.sha256) fail("candidate registry binding mismatch");
    const registry = json(path);
    if (registry.schema !== binding.schema || registry.status !== binding.required_status) fail("candidate registry schema/status mismatch");
    const rows = registry.candidates as CandidateRow[];
    if (!Array.isArray(rows) || rows.length !== binding.expected_candidates) fail("candidate count mismatch");
    const roots = [resolve(here, "../candidates"), resolve(here, "../optimization")];
    const ids = new Set<string>();
    for (const row of rows) {
        const source = resolve(repoRoot, row.path);
        if (!roots.some((root) => source.startsWith(`${root}${sep}`))) fail(`${row.id}: candidate path escapes G15 candidates`);
        if (!/^[a-z][a-z0-9_-]*$/.test(row.id) || row.id === "deposed" || ids.has(row.id)) fail(`${row.id}: invalid candidate id`);
        if (hashFile(source) !== row.sha256) fail(`${row.id}: candidate source binding mismatch`);
        ids.add(row.id);
    }
    return { hash: binding.sha256, rows };
}
