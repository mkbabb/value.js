import { createHash } from "node:crypto";
import { lstatSync, readFileSync, readdirSync, readlinkSync } from "node:fs";
import { join, relative, resolve, sep } from "node:path";
import { buildBundle, fileIdentity, mirror, repo, sha256 } from "./lib.mjs";

const rel = (path) => relative(repo, path).split(sep).join("/");
const packageRoots = [
    "@mkbabb/parse-that",
    "esbuild",
    "@esbuild/darwin-arm64",
    "typescript",
    "@types/node",
    "undici-types"
];
function treeLedger(base) {
    const rows = [];
    const visit = (directory) => {
        for (const name of readdirSync(directory).sort()) {
            const path = join(directory, name); const stat = lstatSync(path); const pathRel = relative(base, path).split(sep).join("/");
            if (stat.isDirectory()) visit(path);
            else if (stat.isSymbolicLink()) rows.push(`L  ${pathRel}  ${readlinkSync(path)}\n`);
            else if (stat.isFile()) { const identity = fileIdentity(path); rows.push(`F  ${identity.sha256}  ${identity.bytes}  ${(stat.mode & 0o777).toString(8).padStart(4, "0")}  ${pathRel}\n`); }
            else throw new Error(`unsupported runtime entry ${path}`);
        }
    };
    visit(base);
    const ledger = rows.join("");
    return { files_or_links: rows.length, bytes: Buffer.byteLength(ledger), ledger_sha256: sha256(ledger) };
}

const built = await buildBundle(new URL("./peer-worker.mts", import.meta.url).pathname);
const sourceRows = Object.keys(built.metafile.inputs).sort().map((input) => {
    const path = resolve(repo, input); const stat = lstatSync(path);
    if (!stat.isFile() || stat.isSymbolicLink()) throw new Error(`peer input not a regular file: ${input}`);
    return { path: rel(path), ...fileIdentity(path), mode: (stat.mode & 0o777).toString(8).padStart(4, "0") };
});
const closure = {
    schema: "value.pi.syntax-consume-number.g12.runtime-closure/v1",
    generation: 12,
    node: { path: process.execPath, version: process.version, ...fileIdentity(process.execPath) },
    lockfile: { path: rel(join(mirror, "package-lock.json")), ...fileIdentity(join(mirror, "package-lock.json")) },
    peer_bundle: { sha256: sha256(built.output), bytes: built.output.length, source_rows: sourceRows },
    package_trees: Object.fromEntries(packageRoots.map((name) => [name, treeLedger(join(mirror, "node_modules", name))])),
    build: { bundle: true, format: "esm", platform: "node", target: "node22", write: false, exact_parse_that_alias: true },
};
if (process.argv[2] === "--print") process.stdout.write(`${JSON.stringify(closure, null, 2)}\n`);
else if (process.argv[2] === "--verify" && process.argv[3]) {
    if (JSON.stringify(JSON.parse(readFileSync(process.argv[3], "utf8"))) !== JSON.stringify(closure)) throw new Error("runtime/source closure drift");
    process.stdout.write(`${JSON.stringify({ status: "PASS", peer_sources: sourceRows.length, packages: packageRoots.length })}\n`);
} else throw new Error("usage: --print | --verify <runtime-closure.json>");
