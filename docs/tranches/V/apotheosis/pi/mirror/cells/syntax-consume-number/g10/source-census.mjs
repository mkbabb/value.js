import { createHash } from "node:crypto";
import { lstatSync, readFileSync, readdirSync, readlinkSync } from "node:fs";
import { dirname, extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const mirror = resolve(root, "../../..");
const roots = [resolve(root, ".."), resolve(mirror, "apotheosis")];
const extensions = new Set([".ts", ".tsx", ".mts", ".cts", ".js", ".jsx", ".mjs", ".cjs"]);
const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");

export function census() {
    const rows = [];
    const walk = (path) => {
        const stat = lstatSync(path);
        if (stat.isSymbolicLink()) {
            rows.push({ kind: "symlink", path: relative(mirror, path), target: readlinkSync(path) });
            return;
        }
        if (stat.isDirectory()) {
            for (const name of readdirSync(path).sort()) walk(join(path, name));
            return;
        }
        if (!stat.isFile()) return;
        const bytes = readFileSync(path);
        const extension = extname(path).toLowerCase();
        const extensionlessExecutable = extension === "" && ((stat.mode & 0o111) !== 0 || bytes.subarray(0, 2).toString() === "#!");
        if (extensions.has(extension) || extensionlessExecutable) rows.push({ kind: "source", path: relative(mirror, path), sha256: sha256(bytes), bytes: bytes.length });
    };
    roots.forEach(walk);
    rows.sort((a, b) => a.path.localeCompare(b.path));
    return { roots: roots.map((path) => relative(mirror, path)), executable_extensions: [...extensions].sort(), rows, row_count: rows.length, source_count: rows.filter((row) => row.kind === "source").length, symlink_count: rows.filter((row) => row.kind === "symlink").length };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) process.stdout.write(`${JSON.stringify(census(), null, 2)}\n`);
