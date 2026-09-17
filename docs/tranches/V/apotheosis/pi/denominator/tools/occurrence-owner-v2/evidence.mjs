import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { byteSort, gitBlobOid, sha256, splitLines, uniqueSorted } from "./shared.mjs";

export const PINNED = Object.freeze({
    rejectedArtifact: ["docs/tranches/V/apotheosis/pi/denominator/occurrence-owner-formation-v1.json", "86d021681ed0e46c067b7a103c35f34ec0793d8eca90059e0d50c6a554f46407", 12766323],
    rejectedGenerator: ["docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-formation-v1.mjs", "74105301b0dcf66f1c4b014c18e52479e2799edcb6bfd626fd5c4ea68c3b4863", 51103],
    specificationChallenge: ["docs/tranches/V/apotheosis/pi/formation/occurrence-owner-v1-challenge-spec.md", "7171bfac873e7d224f7fe82487ea00bd29c166c27dbbe79cbb53a1b29a2a68e0", 19828],
    architectureChallenge: ["docs/tranches/V/apotheosis/pi/formation/occurrence-owner-v1-challenge-architecture.md", "6f127a66edca2a96123e2e3a08772c016c0c6578b9d87dcc51ecef3e1bdfad35", 21630],
    rootGestalt: ["docs/tranches/V/apotheosis/pi/formation/occurrence-owner-v1-root-gestalt.md", "0712c58b6cab1b7eef3dd67006f3b35b15c222fb54eeb7a0edf7cb6d9929021b", 6665],
    rejectionReceipt: ["docs/tranches/V/apotheosis/pi/denominator/occurrence-owner-formation-v1-rejection.json", "69b5f6696def012d9055e3011a5a880135499f4adfdbe244c5b4785b082c5dd8", 3115],
});

function readExact(repoRoot, [path, expectedHash, expectedBytes]) {
    const bytes = readFileSync(resolve(repoRoot, path));
    const actualHash = sha256(bytes);
    if (actualHash !== expectedHash || bytes.length !== expectedBytes) {
        throw new Error(`${path}: identity mismatch: ${actualHash}/${bytes.length}`);
    }
    return { repo_relative_path: path, sha256: actualHash, bytes: bytes.length, raw: bytes };
}

function json(bytes, label) {
    try {
        return JSON.parse(bytes.toString("utf8"));
    } catch (error) {
        throw new Error(`${label}: invalid JSON: ${error.message}`);
    }
}

function assertSetEqual(actual, expected, label) {
    const a = uniqueSorted(actual);
    const b = uniqueSorted(expected);
    if (JSON.stringify(a) !== JSON.stringify(b)) {
        const absent = b.filter((item) => !a.includes(item));
        const extra = a.filter((item) => !b.includes(item));
        throw new Error(`${label}: set mismatch; absent=${absent.join(",")}; extra=${extra.join(",")}`);
    }
}

function parseDag(markdown) {
    const code = /```text\n([\s\S]*?)\n```/.exec(markdown)?.[1];
    if (code === undefined) throw new Error("MODULE-DAG text graph absent");
    const lines = code.split(/\r?\n/);
    const nodes = [];
    const edges = [];
    let current = null;
    for (let index = 0; index < lines.length; index += 1) {
        const node = /^([a-z][a-z-]*)(?:\s+\([^)]*\))?$/.exec(lines[index]);
        if (node !== null) {
            current = node[1];
            nodes.push(current);
            continue;
        }
        if (current === null || !/^\s*->\s*/.test(lines[index])) continue;
        let dependencyText = lines[index].replace(/^\s*->\s*/, "").trim();
        while (dependencyText.endsWith(",") && index + 1 < lines.length) {
            index += 1;
            dependencyText += ` ${lines[index].trim()}`;
        }
        for (const dependency of dependencyText.split(/\s*,\s*/).filter(Boolean)) edges.push({ from: current, dependency });
    }
    const nodeSet = new Set(nodes);
    for (const edge of edges) if (!nodeSet.has(edge.from) || !nodeSet.has(edge.dependency)) throw new Error(`MODULE-DAG unknown node in ${edge.from}->${edge.dependency}`);
    const visiting = new Set();
    const visited = new Set();
    const dependencies = new Map(nodes.map((node) => [node, edges.filter((edge) => edge.from === node).map((edge) => edge.dependency)]));
    const visit = (node) => {
        if (visiting.has(node)) throw new Error(`MODULE-DAG cycle at ${node}`);
        if (visited.has(node)) return;
        visiting.add(node);
        for (const dependency of dependencies.get(node) ?? []) visit(dependency);
        visiting.delete(node);
        visited.add(node);
    };
    for (const node of nodes) visit(node);
    const reachable = new Set();
    const walk = (node) => {
        if (reachable.has(node)) return;
        reachable.add(node);
        for (const dependency of dependencies.get(node) ?? []) walk(dependency);
    };
    walk("stylesheet");
    if (reachable.size !== nodes.length) throw new Error(`MODULE-DAG root reachability mismatch: ${reachable.size}/${nodes.length}`);
    return { nodes, edges, acyclic: true, stylesheet_root_reachable_nodes: [...reachable].sort(byteSort) };
}

function extractCoverageCensuses(markdown) {
    const runtimeSection = markdown.slice(markdown.indexOf("### 1a."), markdown.indexOf("### 1b."));
    const runtime = [...runtimeSection.matchAll(/^\| `([A-Za-z][A-Za-z0-9]*)` /gm)].map((match) => match[1]);
    const typeSection = markdown.slice(markdown.indexOf("All **ABSENT**:"), markdown.indexOf("(defined `types.ts", markdown.indexOf("All **ABSENT**:")));
    const types = [...typeSection.matchAll(/`([A-Za-z][A-Za-z0-9]*)`/g)].map((match) => match[1]);
    const seamStart = markdown.indexOf("| KF-consumed symbol (×uses)");
    const seamEnd = markdown.indexOf("Representative site anchors", seamStart);
    const seam = markdown.slice(seamStart, seamEnd);
    const consumers = uniqueSorted([...seam.matchAll(/`([A-Za-z][A-Za-z0-9]*)`/g)].map((match) => match[1]));
    if (runtime.length !== 19 || new Set(runtime).size !== 19) throw new Error(`coverage runtime census mismatch: ${runtime.length}`);
    if (types.length !== 33 || new Set(types).size !== 33) throw new Error(`coverage type census mismatch: ${types.length}`);
    if (consumers.length !== 37) throw new Error(`coverage consumer census mismatch: ${consumers.length}`);
    return { runtime, types, exports: [...runtime, ...types], consumers };
}

function lineEvidence(bytes, symbol) {
    const lines = splitLines(bytes);
    const matches = lines.filter((line) => line.text.includes(`\`${symbol}\``));
    if (matches.length === 0) throw new Error(`PI exact symbol line absent: ${symbol}`);
    return matches.map((line) => ({ line: line.line, exact_line_sha256: sha256(Buffer.from(line.text, "utf8")), exact_line: line.text }));
}

function authenticateDerivedInput(repoRoot, v1, key) {
    const identity = v1.input_identities[key];
    if (identity?.repo_relative_path === null || identity?.repo_relative_path === undefined) throw new Error(`v1 input identity absent: ${key}`);
    const bytes = readFileSync(resolve(repoRoot, identity.repo_relative_path));
    const actual = sha256(bytes);
    if (actual !== identity.sha256 || bytes.length !== identity.bytes) throw new Error(`${key}: input identity mismatch`);
    return { ...identity, raw: bytes };
}

export function authenticateEvidence(repoRoot, sourceRoot) {
    const pinnedEntries = Object.entries(PINNED).map(([name, value]) => [name, readExact(repoRoot, value)]);
    const pinned = Object.fromEntries(pinnedEntries);
    const v1 = json(pinned.rejectedArtifact.raw, "rejected v1 artifact");
    const rejection = json(pinned.rejectionReceipt.raw, "v1 rejection receipt");
    if (rejection.subject.sha256 !== pinned.rejectedArtifact.sha256 || rejection.generator.sha256 !== pinned.rejectedGenerator.sha256) throw new Error("rejection receipt does not bind challenged v1 subjects");
    const derived = Object.fromEntries(Object.keys(v1.input_identities).map((key) => [key, authenticateDerivedInput(repoRoot, v1, key)]));
    const universe = json(derived.universe.raw, "source universe");
    const seed = json(derived.seed.raw, "seed manifest");
    const complement = json(derived.complementV3.raw, "complement v3");

    const universePaths = universe.sources.map((row) => row.exact_path);
    const seedPaths = seed.roots.map((row) => row.exact_path);
    const complementPaths = complement.entries.map((row) => row.exact_path);
    const derivedComplementPaths = universePaths.filter((path) => !new Set(seedPaths).has(path));
    assertSetEqual(seedPaths, universe.sources.filter((row) => row.root_seed_membership).map((row) => row.exact_path), "seed/universe membership");
    assertSetEqual(complementPaths, derivedComplementPaths, "complement membership");
    if (universePaths.length !== 168 || seedPaths.length !== 76 || complementPaths.length !== 92) throw new Error("168=76+92 identity mismatch");
    for (const entry of complement.entries) {
        const source = universe.sources.find((row) => row.exact_path === entry.exact_path);
        if (source === undefined || source.sha256_raw_source !== entry.sha256_raw_source || source.raw_source_bytes !== entry.raw_source_bytes || source.git_blob_oid_sha1 !== entry.git_blob_oid_sha1) {
            throw new Error(`complement metadata mismatch: ${entry.exact_path}`);
        }
    }

    const sources = [];
    let sourceBytes = 0;
    for (const source of universe.sources) {
        const bytes = readFileSync(resolve(sourceRoot, source.exact_path));
        if (bytes.length !== source.raw_source_bytes || sha256(bytes) !== source.sha256_raw_source || gitBlobOid(bytes) !== source.git_blob_oid_sha1) {
            throw new Error(`authenticated source mismatch: ${source.exact_path}`);
        }
        sourceBytes += bytes.length;
        sources.push({ ...source, bytes, lines: splitLines(bytes) });
    }
    if (sourceBytes !== 14609103) throw new Error(`authenticated source byte identity mismatch: ${sourceBytes}`);

    const dag = parseDag(derived.moduleDag.raw.toString("utf8"));
    if (dag.nodes.length !== 16 || dag.edges.length !== 46) throw new Error(`exact MODULE-DAG identity mismatch: ${dag.nodes.length}/${dag.edges.length}`);
    const coverageCensuses = extractCoverageCensuses(derived.coverage.raw.toString("utf8"));
    assertSetEqual(coverageCensuses.exports, v1.compatibility_obligations.rows.map((row) => row.symbol), "52 evidence/v1 discovery cross-check");
    assertSetEqual(coverageCensuses.consumers, v1.compatibility_obligations.exact_37_symbols, "37 evidence/v1 discovery cross-check");
    const piLineEvidence = Object.fromEntries(coverageCensuses.exports.map((symbol) => [symbol, lineEvidence(derived.pi.raw, symbol)]));

    return {
        v1,
        rejection,
        sources,
        derived,
        dag,
        coverageCensuses,
        piLineEvidence,
        identities: {
            pinned: Object.fromEntries(pinnedEntries.map(([name, row]) => [name, { repo_relative_path: row.repo_relative_path, sha256: row.sha256, bytes: row.bytes }])),
            derived_inputs: Object.fromEntries(Object.entries(derived).map(([name, row]) => [name, { repo_relative_path: row.repo_relative_path, sha256: row.sha256, bytes: row.bytes }])),
        },
        membership: {
            universe_count: universePaths.length,
            seed_count: seedPaths.length,
            complement_count: complementPaths.length,
            identity: "168 = 76 + 92",
            seed_set_derived_from_seed_manifest_and_equal_to_universe_membership: true,
            complement_set_derived_as_universe_minus_seed_and_equal_to_complement_v3: true,
            exact_paths_digest_sha256: sha256(Buffer.from(uniqueSorted(universePaths).join("\n"), "utf8")),
        },
        sourceBytes,
    };
}
