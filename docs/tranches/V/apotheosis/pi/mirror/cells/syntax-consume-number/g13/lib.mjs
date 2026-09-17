import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { createRequire } from "node:module";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const root = dirname(fileURLToPath(import.meta.url));
export const mirror = resolve(root, "../../..");
export const repo = resolve(mirror, "../../../../../..");
const require = createRequire(join(mirror, "package.json"));
export const esbuild = require("esbuild");
export const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");
export const fileIdentity = (path) => {
    const bytes = readFileSync(path);
    return { sha256: sha256(bytes), bytes: bytes.length };
};

const parseThatDist = join(mirror, "node_modules/@mkbabb/parse-that/dist");
const parseThatTargets = new Map([
    ["@mkbabb/parse-that", "parse.js"],
    ["@mkbabb/parse-that/core", "core.js"],
    ["@mkbabb/parse-that/diagnostics", "diagnostics.js"],
    ["@mkbabb/parse-that/packrat", "packrat.js"],
    ["@mkbabb/parse-that/utils", "utils.js"],
]);

const pinPlugin = (candidateEntry) => ({
    name: "g13-exact-imports",
    setup(build) {
        build.onResolve({ filter: /^@candidate$/ }, () => candidateEntry ? { path: candidateEntry } : { errors: [{ text: "@candidate forbidden in this build" }] });
        build.onResolve({ filter: /^@mkbabb\/parse-that(?:\/.*)?$/ }, (args) => {
            const target = parseThatTargets.get(args.path);
            return target ? { path: join(parseThatDist, target) } : { errors: [{ text: `unrecognized parse-that subpath ${args.path}` }] };
        });
    },
});

export async function buildBundle(entry, candidateEntry) {
    const result = await esbuild.build({
        absWorkingDir: repo,
        entryPoints: [entry],
        bundle: true,
        format: "esm",
        platform: "node",
        target: "node22",
        metafile: true,
        write: false,
        logLevel: "silent",
        plugins: [pinPlugin(candidateEntry)],
    });
    const output = result.outputFiles[0]?.contents;
    if (!output) throw new Error("esbuild emitted no bundle");
    return { output, metafile: result.metafile };
}

export const cleanEnv = Object.freeze({
    PATH: "/usr/bin:/bin",
    LANG: "C",
    LC_ALL: "C",
    TZ: "UTC",
    NO_COLOR: "1",
    TMPDIR: tmpdir(),
});

export function runBounded(command, args, options = {}) {
    const timeoutMs = options.timeoutMs ?? 5000;
    const maxBytes = options.maxBytes ?? 1048576;
    return new Promise((resolveRun, rejectRun) => {
        const child = spawn(command, args, { cwd: options.cwd ?? root, env: cleanEnv, stdio: ["ignore", "pipe", "pipe"], detached: true });
        const output = { stdout: Buffer.alloc(0), stderr: Buffer.alloc(0) };
        let timedOut = false;
        let overflow = false;
        const stop = () => {
            try { process.kill(-child.pid, "SIGKILL"); } catch { try { child.kill("SIGKILL"); } catch {} }
        };
        for (const name of ["stdout", "stderr"]) child[name].on("data", (chunk) => {
            output[name] = Buffer.concat([output[name], chunk]);
            if (output[name].length > maxBytes) { overflow = true; stop(); }
        });
        const timer = setTimeout(() => { timedOut = true; stop(); }, timeoutMs);
        child.once("error", (error) => { clearTimeout(timer); rejectRun(error); });
        child.once("close", (code, signal) => {
            clearTimeout(timer);
            resolveRun({ code, signal, timedOut, overflow, stdout: output.stdout.toString("utf8"), stderr: output.stderr.toString("utf8") });
        });
    });
}

export async function runBundle(output, args, limits = {}) {
    const directory = mkdtempSync(join(tmpdir(), "value-pi-g13-"));
    const path = join(directory, "bundle.mjs");
    try {
        writeFileSync(path, output, { mode: 0o400 });
        return await runBounded(process.execPath, [path, ...args], limits);
    } finally {
        rmSync(directory, { recursive: true, force: true });
    }
}
