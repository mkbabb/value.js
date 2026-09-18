import { lstatSync, readFileSync, readdirSync } from "node:fs";
import { basename, dirname, join, relative, resolve, sep } from "node:path";
import { buildBundle, fileIdentity, mirror, repo, root, runBounded, runBundle, sha256 } from "./lib.mjs";

const seats = new Set(["h", "b", "s", "d"]);
const fail = (message) => { throw new Error(message); };
const inside = (base, path) => path === base || path.startsWith(`${base}${sep}`);
const normalize = (path) => relative(repo, path).split(sep).join("/");

function scanSeat(seatRoot) {
    const rootStat = lstatSync(seatRoot);
    if (!rootStat.isDirectory() || rootStat.isSymbolicLink()) fail("seat root must be a regular non-symlink directory");
    const rows = [];
    const visit = (directory) => {
        for (const name of readdirSync(directory).sort()) {
            const path = join(directory, name);
            const stat = lstatSync(path);
            if (stat.isSymbolicLink()) fail(`symlink forbidden: ${normalize(path)}`);
            if (stat.isDirectory()) visit(path);
            else if (stat.isFile()) {
                if ((stat.mode & 0o111) !== 0) fail(`executable candidate file forbidden: ${normalize(path)}`);
                rows.push({ path: normalize(path), kind: "regular", ...fileIdentity(path), mode: (stat.mode & 0o777).toString(8).padStart(4, "0") });
            } else fail(`non-regular candidate entry forbidden: ${normalize(path)}`);
        }
    };
    visit(seatRoot);
    return rows;
}

function sourceLaw(rows, seat) {
    let directCore = false;
    const forbidden = /\b(?:ParserState|process|fetch|XMLHttpRequest|eval|Function)\b|\.(?:parse|slice|substring|charAt|split|matchAll|exec)\s*\(|\b(?:while|for)\s*\(|\.(?:src|offset)\b|from\s+["']node:|from\s+["'](?:fs|child_process|worker_threads|net|http|https)["']/;
    let joined = "";
    for (const row of rows.filter((item) => /\.[cm]?tsx?$/.test(item.path))) {
        const text = readFileSync(join(repo, row.path), "utf8");
        joined += `\n${text}`;
        if (/from\s+["']@mkbabb\/parse-that\/core["']/.test(text)) directCore = true;
        if (/from\s+["']@mkbabb\/parse-that(?:["']|\/(?!core["']))/.test(text)) fail(`only exact @mkbabb/parse-that/core is admitted: ${row.path}`);
        if (forbidden.test(text)) fail(`manual scanner, state access, or ambient capability forbidden: ${row.path}`);
    }
    if (!directCore) fail("candidate must import @mkbabb/parse-that/core directly");
    const wrappers = (joined.match(/\bnew\s+Parser\b/g) ?? []).length;
    const calls = (joined.match(/\.call\s*\(/g) ?? []).length;
    if (seat === "b" || seat === "s") {
        if (wrappers !== 1 || calls !== 1 || (joined.match(/\.save\s*\(/g) ?? []).length !== 1 || (joined.match(/\.restore\s*\(/g) ?? []).length !== 1) fail(`${seat}: exactly one narrow save/call/restore Parser transaction wrapper required`);
        if (/\.unsafe|state\s*\.\s*(?:src|offset)/.test(joined)) fail(`${seat}: transaction wrapper may not access source/cursor or unsafe state APIs`);
    } else if (wrappers !== 0 || calls !== 0 || /\.save\s*\(|\.restore\s*\(/.test(joined)) fail(`${seat}: state transaction wrapper forbidden`);
    const whole = "[+-]?(?:[0-9]*\\.[0-9]+|[0-9]+)(?:[eE][+-]?[0-9]+)?";
    const hasWhole = joined.includes(whole);
    const hasAll = /\ball\s*\(/.test(joined); const hasAny = /\bany\s*\(/.test(joined); const hasThen = /\.then\s*\(/.test(joined); const hasDispatch = /\bdispatch\s*\(/.test(joined);
    if (seat === "h" && (!hasWhole || hasAll || hasAny || hasThen || hasDispatch || wrappers !== 0)) fail("H must be the sole whole-prefix regex/map topology");
    if (seat === "b" && (!hasAll || !hasAny || hasWhole || hasThen || hasDispatch)) fail("B must be factorized all/any without H gate, then stages, or dispatch");
    if (seat === "s" && (!hasThen || hasWhole || hasAll || hasAny || hasDispatch)) fail("S must be staged then composition without H gate, all/any, or dispatch");
    if (seat === "d" && (!hasDispatch || hasWhole || hasAll || hasAny || hasThen || wrappers !== 0)) fail("D must be first-character dispatch with atomic arms");
}

async function strictCompile(entry) {
    const tsc = join(mirror, "node_modules/typescript/bin/tsc");
    const result = await runBounded(process.execPath, [tsc, "--noEmit", "--strict", "--target", "ES2022", "--module", "NodeNext", "--moduleResolution", "NodeNext", "--skipLibCheck", "--verbatimModuleSyntax", "--types", "node", entry], { cwd: mirror, timeoutMs: 10000 });
    if (result.timedOut || result.overflow || result.code !== 0 || result.stdout !== "" || result.stderr !== "") fail(`strict compilation failed: ${JSON.stringify(result)}`);
}

async function close(seat, seatRoot = join(root, "candidates", seat), assay = false) {
    const entry = join(seatRoot, "index.ts");
    const rows = scanSeat(seatRoot);
    if (rows.length !== 1 || rows[0].path !== normalize(entry)) fail("atomic feature candidate root must contain exactly one regular index.ts");
    sourceLaw(rows, seat);
    await strictCompile(entry);
    const built = await buildBundle(entry);
    const candidateInputs = [];
    for (const [input, metadata] of Object.entries(built.metafile.inputs)) {
        const absolute = resolve(repo, input);
        if (inside(seatRoot, absolute)) candidateInputs.push(normalize(absolute));
        else if (!inside(join(mirror, "node_modules/@mkbabb/parse-that"), absolute)) fail(`candidate import escaped seat root: ${input}`);
        for (const imported of metadata.imports) if (imported.external) fail(`unbound external import: ${imported.path}`);
    }
    const sourceFiles = rows.map((row) => row.path).sort();
    if (JSON.stringify(candidateInputs.sort()) !== JSON.stringify(sourceFiles)) fail("every candidate source must belong to the resolved import graph");
    const ledger = rows.map((row) => `${row.sha256}  ${row.bytes}  ${row.mode}  ${row.path}\n`).join("");
    return {
        schema: "value.pi.syntax-consume-number.g12.candidate-closure/v1",
        feature_id: "SYNTAX-CONSUME-NUMBER",
        generation: 12,
        seat,
        root: normalize(seatRoot),
        entry: normalize(entry),
        rows,
        import_inputs: candidateInputs.sort(),
        ledger_sha256: sha256(ledger),
        candidate_bundle_sha256: sha256(built.output),
        candidate_bundle_bytes: built.output.length,
        strict_typescript: "PASS_NO_OUTPUT",
        architecture: "PASS_DIRECT_PARSE_THAT_NO_STATE_SCANNER_NO_AMBIENT_IMPORT",
        status: assay ? "ROOT_ASSAY_CLOSED_ZERO_CREDIT" : "CLOSED_NO_FEATURE_CREDIT",
    };
}

const [mode, seat, receiptPath] = process.argv.slice(2);
if (!seats.has(seat)) fail("seat must be h, b, s, or d");
if (mode === "--preauthor") {
    const seatRoot = join(root, "candidates", seat);
    try { lstatSync(seatRoot); fail(`candidate root already exists: ${seat}`); } catch (error) { if (error.code !== "ENOENT") throw error; }
    process.stdout.write(`${JSON.stringify({ schema: "value.pi.syntax-consume-number.g12.preauthor/v1", seat, status: "ABSENT", credit: 0 })}\n`);
} else if (mode === "--close") process.stdout.write(`${JSON.stringify(await close(seat), null, 2)}\n`);
else if (mode === "--assay") {
    const assayRoot = join(root, "root", "probes", seat);
    process.stdout.write(`${JSON.stringify(await close(seat, assayRoot, true), null, 2)}\n`);
}
else if (mode === "--run") {
    if (!receiptPath) fail("--run requires immutable candidate closure receipt");
    const expected = JSON.parse(readFileSync(resolve(receiptPath), "utf8"));
    const actual = await close(seat);
    if (JSON.stringify(actual) !== JSON.stringify(expected)) fail("candidate closure receipt drift");
    const built = await buildBundle(join(root, "public-worker.ts"), join(root, "candidates", seat, "index.ts"));
    const result = await runBundle(built.output, [join(root, "public-corpus.json")], { timeoutMs: 5000, maxBytes: 1048576 });
    if (result.timedOut || result.overflow || result.code !== 0 || result.stderr !== "") fail(`candidate public harness failed: ${JSON.stringify(result)}`);
    process.stdout.write(result.stdout);
} else fail("usage: --preauthor <seat> | --assay <seat> | --close <seat> | --run <seat> <closure.json>");
