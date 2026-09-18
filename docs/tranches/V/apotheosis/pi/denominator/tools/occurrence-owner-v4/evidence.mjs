import { readFileSync, readdirSync, statSync } from "node:fs";
import { relative, resolve, sep } from "node:path";
import { byteSort, gitBlobOid, sha256, splitLines, uniqueSorted } from "./shared.mjs";

const PINNED = Object.freeze({
    v1Artifact: ["docs/tranches/V/apotheosis/pi/denominator/occurrence-owner-formation-v1.json", "86d021681ed0e46c067b7a103c35f34ec0793d8eca90059e0d50c6a554f46407", 12766323],
    v1Generator: ["docs/tranches/V/apotheosis/pi/denominator/tools/occurrence-owner-formation-v1.mjs", "74105301b0dcf66f1c4b014c18e52479e2799edcb6bfd626fd5c4ea68c3b4863", 51103],
    v1ChallengeSpec: ["docs/tranches/V/apotheosis/pi/formation/occurrence-owner-v1-challenge-spec.md", "7171bfac873e7d224f7fe82487ea00bd29c166c27dbbe79cbb53a1b29a2a68e0", 19828],
    v1ChallengeArchitecture: ["docs/tranches/V/apotheosis/pi/formation/occurrence-owner-v1-challenge-architecture.md", "6f127a66edca2a96123e2e3a08772c016c0c6578b9d87dcc51ecef3e1bdfad35", 21630],
    v1Gestalt: ["docs/tranches/V/apotheosis/pi/formation/occurrence-owner-v1-root-gestalt.md", "0712c58b6cab1b7eef3dd67006f3b35b15c222fb54eeb7a0edf7cb6d9929021b", 6665],
    v1Rejection: ["docs/tranches/V/apotheosis/pi/denominator/occurrence-owner-formation-v1-rejection.json", "69b5f6696def012d9055e3011a5a880135499f4adfdbe244c5b4785b082c5dd8", 3115],
    v3Artifact: ["docs/tranches/V/apotheosis/pi/denominator/occurrence-owner-formation-v3.json", "3eaa1f5604a2e67087cfa1ddb8fedc571cd99f820ab716d6c7ec7ed1e86c5ef9", 69590643],
    v3Schema: ["docs/tranches/V/apotheosis/pi/denominator/occurrence-owner-formation-v3.schema.json", "80f081145d3ac554f79fd68becd468748e567391ebe08ae2e4229893d5cbd72d", 6775],
    v3Receipt: ["docs/tranches/V/apotheosis/pi/formation/occurrence-owner-v3-formation-2026-07-22.md", "7b6ae52d8abba34df2ea741d8f586323a22c9e7af4b09d6c5e01e2e39aaf793f", 5810],
    v3ChallengeA: ["docs/tranches/V/apotheosis/pi/formation/occurrence-owner-v3-challenge-a.md", "2b6ce7ff3f6f0c90af68d50ecdc01937e73cc52736410ba90d93de9cc9d8072c", 14309],
    v3ChallengeB: ["docs/tranches/V/apotheosis/pi/formation/occurrence-owner-v3-challenge-b.md", "f204b533e4147347005ea2f6373ffda182bd47ae24151dff052bcd4a76dae1cc", 18006],
    v3Gestalt: ["docs/tranches/V/apotheosis/pi/formation/occurrence-owner-v3-root-gestalt.md", "aac3e8ca0fc513f70126ee1737d38df8d7564b3b6c6db275847177ec68c59491", 4412],
    v3Rejection: ["docs/tranches/V/apotheosis/pi/denominator/occurrence-owner-formation-v3-rejection.json", "68572cdd614323d0c37eb7886b5320a7dbf212c5b2ef3f75cc8a570b3432a12f", 2351],
});

function exactPinned(repoRoot, [path, expectedHash, expectedBytes]) {
    const bytes = readFileSync(resolve(repoRoot, path));
    const hash = sha256(bytes);
    if (hash !== expectedHash || bytes.length !== expectedBytes) throw new Error(`${path}: pinned identity mismatch`);
    return { repo_relative_path: path, sha256: hash, bytes: bytes.length, raw: bytes };
}

function exactDerived(repoRoot, identity) {
    const bytes = readFileSync(resolve(repoRoot, identity.repo_relative_path));
    if (bytes.length !== identity.bytes || sha256(bytes) !== identity.sha256) throw new Error(`${identity.repo_relative_path}: derived input mismatch`);
    return { ...identity, raw: bytes };
}

function assertSetEqual(left, right, label) {
    const a = uniqueSorted(left);
    const b = uniqueSorted(right);
    if (JSON.stringify(a) !== JSON.stringify(b)) throw new Error(`${label}: set mismatch`);
}

function parseDag(markdown) {
    const code = /```text\n([\s\S]*?)\n```/.exec(markdown)?.[1];
    if (code === undefined) throw new Error("MODULE-DAG graph absent");
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
        let text = lines[index].replace(/^\s*->\s*/, "").trim();
        while (text.endsWith(",") && index + 1 < lines.length) text += ` ${lines[++index].trim()}`;
        for (const dependency of text.split(/\s*,\s*/).filter(Boolean)) edges.push([current, dependency]);
    }
    if (nodes.length !== 16 || edges.length !== 46) throw new Error(`MODULE-DAG count mismatch ${nodes.length}/${edges.length}`);
    const dependencies = new Map(nodes.map((node) => [node, edges.filter(([from]) => from === node).map(([, dependency]) => dependency)]));
    const visiting = new Set();
    const visited = new Set();
    const visit = (node) => {
        if (visiting.has(node)) throw new Error(`MODULE-DAG cycle: ${node}`);
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
    if (reachable.size !== nodes.length) throw new Error("MODULE-DAG root reachability failure");
    return { nodes, edges, acyclic: true, root_reachable: true };
}

function parseExportBlock(block) {
    return block.split(",").map((item) => item.replace(/\/\*[\s\S]*?\*\//g, "").trim()).filter(Boolean).map((item) => item.replace(/^type\s+/, "").split(/\s+as\s+/)[0].trim());
}

function primaryExports(bytes) {
    const text = bytes.toString("utf8");
    const lines = splitLines(bytes);
    const types = [];
    const runtime = [];
    const evidence = new Map();
    const collect = (match, target) => {
        const symbols = parseExportBlock(match[1]);
        target.push(...symbols);
        for (const symbol of symbols) {
            const relativeCharacter = match[0].indexOf(symbol);
            const absoluteCharacter = match.index + Math.max(0, relativeCharacter);
            const byteOffset = Buffer.byteLength(text.slice(0, absoluteCharacter), "utf8");
            const line = lines.find((row) => row.start <= byteOffset && row.end > byteOffset)?.line ?? 1;
            evidence.set(symbol, line);
        }
    };
    for (const match of text.matchAll(/export\s+type\s*\{([\s\S]*?)\}\s*from/g)) collect(match, types);
    for (const match of text.matchAll(/export\s*\{([\s\S]*?)\}\s*from/g)) collect(match, runtime);
    if (types.length !== 33 || runtime.length !== 19 || new Set([...types, ...runtime]).size !== 52) throw new Error(`primary export census mismatch: ${runtime.length}+${types.length}`);
    return { runtime, types, all: [...runtime, ...types], evidence };
}

function walkFiles(root) {
    const result = [];
    for (const name of readdirSync(root).sort(byteSort)) {
        const path = resolve(root, name);
        const stat = statSync(path);
        if (stat.isDirectory()) result.push(...walkFiles(path));
        else if (stat.isFile()) result.push(path);
    }
    return result;
}

function primaryConsumers(keyframesRoot) {
    const root = resolve(keyframesRoot);
    const files = [];
    const symbols = new Map();
    for (const absolute of walkFiles(resolve(root, "src")).filter((path) => /\.tsx?$/.test(path))) {
        const bytes = readFileSync(absolute);
        const text = bytes.toString("utf8");
        const imports = [...text.matchAll(/import\s+(?:type\s+)?\{([^}]*)\}\s+from\s+["']@mkbabb\/value\.js\/css["']/g)];
        if (imports.length === 0) continue;
        const exactPath = relative(root, absolute).split(sep).join("/");
        const lines = splitLines(bytes);
        files.push({ exact_path: exactPath, sha256: sha256(bytes), bytes: bytes.length });
        for (const item of imports) {
            for (const raw of parseExportBlock(item[1])) {
                const symbol = raw.replace(/^type\s+/, "").split(/\s+as\s+/)[0].trim();
                if (!/^[A-Za-z][A-Za-z0-9]*$/.test(symbol)) throw new Error(`invalid primary consumer symbol: ${symbol}`);
                const startLine = lines.find((line) => line.start <= Buffer.byteLength(text.slice(0, item.index), "utf8") && line.end > Buffer.byteLength(text.slice(0, item.index), "utf8"))?.line ?? 1;
                const evidence = symbols.get(symbol) ?? [];
                evidence.push([exactPath, startLine]);
                symbols.set(symbol, evidence);
            }
        }
    }
    if (files.length !== 27 || symbols.size !== 37) throw new Error(`primary keyframes census mismatch: ${files.length} files/${symbols.size} symbols`);
    return { files: files.sort((a, b) => byteSort(a.exact_path, b.exact_path)), symbols };
}

function safeSourcePath(root, exactPath) {
    const absoluteRoot = resolve(root);
    const absolute = resolve(absoluteRoot, exactPath);
    if (absolute !== absoluteRoot && !absolute.startsWith(`${absoluteRoot}${sep}`)) throw new Error(`source path escaped root: ${exactPath}`);
    return absolute;
}

export function authenticateEvidence(repoRoot, sourceRoot, keyframesRoot) {
    const pinnedEntries = Object.entries(PINNED).map(([name, identity]) => [name, exactPinned(repoRoot, identity)]);
    const pinned = Object.fromEntries(pinnedEntries);
    const v1 = JSON.parse(pinned.v1Artifact.raw.toString("utf8"));
    const v3Rejection = JSON.parse(pinned.v3Rejection.raw.toString("utf8"));
    if (v3Rejection.subject.sha256 !== pinned.v3Artifact.sha256) throw new Error("v3 rejection subject mismatch");
    const derived = Object.fromEntries(Object.entries(v1.input_identities).map(([name, identity]) => [name, exactDerived(repoRoot, identity)]));
    const universe = JSON.parse(derived.universe.raw.toString("utf8"));
    const seed = JSON.parse(derived.seed.raw.toString("utf8"));
    const complement = JSON.parse(derived.complementV3.raw.toString("utf8"));
    const universePaths = universe.sources.map((row) => row.exact_path);
    const seedPaths = seed.roots.map((row) => row.exact_path);
    const seedSet = new Set(seedPaths);
    assertSetEqual(seedPaths, universe.sources.filter((row) => row.root_seed_membership).map((row) => row.exact_path), "seed membership");
    assertSetEqual(complement.entries.map((row) => row.exact_path), universePaths.filter((path) => !seedSet.has(path)), "complement membership");
    if (universePaths.length !== 168 || seedPaths.length !== 76 || complement.entries.length !== 92) throw new Error("168=76+92 mismatch");
    const sources = [];
    let sourceBytes = 0;
    for (const source of universe.sources) {
        const bytes = readFileSync(safeSourcePath(sourceRoot, source.exact_path));
        if (bytes.length !== source.raw_source_bytes || sha256(bytes) !== source.sha256_raw_source || gitBlobOid(bytes) !== source.git_blob_oid_sha1) throw new Error(`source identity mismatch: ${source.exact_path}`);
        sourceBytes += bytes.length;
        sources.push({ ...source, bytes, lines: splitLines(bytes) });
    }
    if (sourceBytes !== 14609103) throw new Error("source byte total mismatch");
    const dag = parseDag(derived.moduleDag.raw.toString("utf8"));
    const indexPath = "src/css/index.ts";
    const typesPath = "src/css/types.ts";
    const indexBytes = readFileSync(resolve(repoRoot, indexPath));
    const typesBytes = readFileSync(resolve(repoRoot, typesPath));
    const exports = primaryExports(indexBytes);
    const consumers = primaryConsumers(keyframesRoot);
    assertSetEqual([...consumers.symbols.keys()], exports.all.filter((symbol) => consumers.symbols.has(symbol)), "consumer/export join");
    for (const symbol of consumers.symbols.keys()) if (!exports.all.includes(symbol)) throw new Error(`consumer symbol absent from primary exports: ${symbol}`);
    return {
        v1,
        sources,
        sourceBytes,
        dag,
        exports,
        consumers,
        owner_scope_bytes: derived.addenda01.raw,
        primary: {
            export_sources: [
                { path: indexPath, bytes: indexBytes.length, sha256: sha256(indexBytes) },
                { path: typesPath, bytes: typesBytes.length, sha256: sha256(typesBytes) },
            ],
            consumer_root_label: "keyframes-v-exec",
            consumer_files: consumers.files,
        },
        identities: {
            pinned: Object.fromEntries(pinnedEntries.map(([name, row]) => [name, { repo_relative_path: row.repo_relative_path, sha256: row.sha256, bytes: row.bytes }])),
            formation_inputs: Object.fromEntries(Object.entries(derived).map(([name, row]) => [name, { repo_relative_path: row.repo_relative_path, sha256: row.sha256, bytes: row.bytes }])),
        },
        membership: { universe: 168, seed: 76, complement: 92, exact_paths_sha256: sha256(Buffer.from(uniqueSorted(universePaths).join("\n"), "utf8")) },
    };
}
