import { createHash } from "node:crypto";
import { existsSync, lstatSync, readFileSync, readdirSync, readlinkSync } from "node:fs";
import { dirname, extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const mirror = resolve(root, "../../..");
const activeRoot = resolve(mirror, "apotheosis");
const candidateRoots = Object.fromEntries(["h", "b", "s", "d"].map((seat) => [seat, resolve(root, `candidates/${seat}`)]));
const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");
const importableExtensions = new Set([".ts", ".tsx", ".mts", ".cts", ".js", ".jsx", ".mjs", ".cjs", ".json", ".wasm", ".node"]);

function walk(base, path, rows) {
    const stat = lstatSync(path);
    if (stat.isSymbolicLink()) { rows.push({ kind: "symlink", path: relative(base, path), target: readlinkSync(path) }); return; }
    if (stat.isDirectory()) { for (const name of readdirSync(path).sort()) walk(base, join(path, name), rows); return; }
    if (!stat.isFile()) return;
    const bytes = readFileSync(path); const extension = extname(path).toLowerCase(); const shebang = bytes.subarray(0, 2).toString() === "#!";
    rows.push({
        kind: "regular",
        path: relative(base, path),
        sha256: sha256(bytes),
        bytes: bytes.length,
        extension: extension || null,
        importable: extension === "" || importableExtensions.has(extension),
        executable: (stat.mode & 0o111) !== 0 || shebang
    });
}

export function census() {
    const activeRows = []; walk(activeRoot, activeRoot, activeRows);
    const roots = Object.fromEntries(Object.entries(candidateRoots).map(([seat, path]) => {
        if (!existsSync(path)) return [seat, { path: relative(root, path), state: "ABSENT", rows: [] }];
        const rows = []; walk(path, path, rows); return [seat, { path: relative(root, path), state: "PRESENT", rows }];
    }));
    return { schema: "value.pi.syntax-consume-number.g11.source-census/v1", active_root: { path: relative(mirror, activeRoot), rows: activeRows }, candidate_roots: roots };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) process.stdout.write(`${JSON.stringify(census(), null, 2)}\n`);
