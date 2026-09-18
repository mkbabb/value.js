import { lstatSync, readFileSync, readdirSync } from "node:fs";
import { basename, dirname, join, relative, resolve, sep } from "node:path";
import { buildBundle, fileIdentity, mirror, repo, root, runBounded, runBundle, sha256 } from "./lib.mjs";
import { assayCandidateAst } from "./candidate-ast-policy.mjs";

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

async function strictCompile(entry) {
    const tsc = join(mirror, "node_modules/typescript/bin/tsc");
    const result = await runBounded(process.execPath, [tsc, "--noEmit", "--strict", "--target", "ES2022", "--module", "NodeNext", "--moduleResolution", "NodeNext", "--skipLibCheck", "--verbatimModuleSyntax", "--types", "node", entry], { cwd: mirror, timeoutMs: 10000 });
    if (result.timedOut || result.overflow || result.code !== 0 || result.stdout !== "" || result.stderr !== "") fail(`strict compilation failed: ${JSON.stringify(result)}`);
}

async function close(seat, seatRoot = join(root, "candidates", seat), assay = false) {
    const entry = join(seatRoot, "index.ts");
    const rows = scanSeat(seatRoot);
    if (rows.length !== 1 || rows[0].path !== normalize(entry)) fail("atomic feature candidate root must contain exactly one regular index.ts");
    const ast = assayCandidateAst(entry, seat);
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
        schema: "value.pi.syntax-consume-number.g13.candidate-closure/v1",
        feature_id: "SYNTAX-CONSUME-NUMBER",
        generation: 13,
        seat,
        root: normalize(seatRoot),
        entry: normalize(entry),
        rows,
        import_inputs: candidateInputs.sort(),
        ledger_sha256: sha256(ledger),
        candidate_bundle_sha256: sha256(built.output),
        candidate_bundle_bytes: built.output.length,
        strict_typescript: "PASS_NO_OUTPUT",
        architecture: "PASS_TYPESCRIPT_AST_DIRECT_PARSE_THAT_NO_STATE_SCANNER_NO_AMBIENT_CAPABILITY",
        ast,
        status: assay ? "ROOT_ASSAY_CLOSED_ZERO_CREDIT" : "CLOSED_NO_FEATURE_CREDIT",
    };
}

const [mode, seat, receiptPath] = process.argv.slice(2);
const negativeControls = Object.freeze({
    "comment-markers": "b",
    "constructed-recognizer": "b",
    "computed-global": "h",
    "computed-state": "b",
    "h-suffix-broadening": "h",
    "wrong-wrapper": "s",
});
if (mode === "--negative-control") {
    const controlSeat = negativeControls[seat];
    if (!controlSeat) fail("unknown negative control");
    const controlRoot = join(root, "root", "negative-controls", seat);
    try {
        await close(controlSeat, controlRoot, true);
    } catch (error) {
        process.stdout.write(`${JSON.stringify({ schema: "value.pi.syntax-consume-number.g13.negative-control/v1", id: seat, seat: controlSeat, status: "REJECTED", mechanism: String(error.message).startsWith("AST_POLICY:") ? "TYPESCRIPT_AST_POLICY" : "CLOSURE", credit: 0 })}\n`);
        process.exit(0);
    }
    fail(`negative control was admitted: ${seat}`);
}
if (!seats.has(seat)) fail("seat must be h, b, s, or d");
if (mode === "--preauthor") {
    const seatRoot = join(root, "candidates", seat);
    try { lstatSync(seatRoot); fail(`candidate root already exists: ${seat}`); } catch (error) { if (error.code !== "ENOENT") throw error; }
    process.stdout.write(`${JSON.stringify({ schema: "value.pi.syntax-consume-number.g13.preauthor/v1", seat, status: "ABSENT", credit: 0 })}\n`);
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
} else fail("usage: --preauthor <seat> | --assay <seat> | --negative-control <id> | --close <seat> | --run <seat> <closure.json>");
