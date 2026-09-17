import { createHash } from "node:crypto";
import { lstatSync, readFileSync, readdirSync, readlinkSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const mirror = resolve(root, "../../..");
const repository = resolve(mirror, "../../../../../..");
const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");
const identity = (path) => { const bytes = readFileSync(path); return { sha256: sha256(bytes), bytes: bytes.length }; };
const packages = ["@mkbabb/parse-that", "tsx", "esbuild", "@esbuild/darwin-arm64", "get-tsconfig", "resolve-pkg-maps"];
const packageRows = [];
for (const packageName of packages) {
    const packageRoot = join(mirror, "node_modules", packageName);
    const walk = (path) => {
        for (const name of readdirSync(path).sort()) {
            const absolute = join(path, name); const stat = lstatSync(absolute);
            if (stat.isSymbolicLink()) packageRows.push({ package: packageName, kind: "symlink", path: relative(packageRoot, absolute), target: readlinkSync(absolute) });
            else if (stat.isDirectory()) walk(absolute);
            else if (stat.isFile()) packageRows.push({ package: packageName, kind: "file", path: relative(packageRoot, absolute), ...identity(absolute) });
        }
    };
    walk(packageRoot);
}
packageRows.sort((a, b) => `${a.package}/${a.path}`.localeCompare(`${b.package}/${b.path}`));

const peerSourcePaths = [
    "src/css/grammar.ts",
    "src/css/named-colors.ts",
    "src/css/types.ts",
    "src/foundation/result.ts",
    "src/color/model.ts",
    "src/color/anchors.ts",
    "src/value.ts",
    "docs/tranches/V/vnext/prototypes/c14-css/src/css/grammar/l4/value-unit.ts",
    "docs/tranches/V/vnext/prototypes/c14-css/src/css/grammar/combinators.ts",
    "docs/tranches/V/vnext/prototypes/c14-css/src/css/cst.ts",
    "docs/tranches/V/apotheosis/pi/mirror/cells/syntax-consume-number/g7/authorities/historical-utils.ts"
];
const peerSources = peerSourcePaths.map((path) => ({ path, ...identity(join(repository, path)) }));
const packageLock = identity(join(mirror, "package-lock.json"));
const node = { path: process.execPath, version: process.version, platform: process.platform, arch: process.arch, ...identity(process.execPath) };
const data = Buffer.from(JSON.stringify({ packages, packageRows, peerSources, packageLock, node }));
const packageClosures = packages.map((packageName) => {
    const rows = packageRows.filter((row) => row.package === packageName);
    return { package: packageName, rows: rows.length, sha256: sha256(Buffer.from(JSON.stringify(rows))) };
});
process.stdout.write(`${JSON.stringify({
    schema: "value.pi.syntax-consume-number.g11.runtime-closure/v1",
    packages,
    package_closures: packageClosures,
    package_row_count: packageRows.length,
    peer_sources: peerSources,
    package_lock: { path: "../../../package-lock.json", ...packageLock },
    node,
    loader: "../../../node_modules/tsx/dist/loader.mjs",
    resolver: "peer-resolver.mjs",
    data_closure_sha256: sha256(data)
}, null, 2)}\n`);
