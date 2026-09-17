import { createHash } from "node:crypto";
import { createRequire } from "node:module";
import { existsSync, lstatSync, readFileSync, readdirSync, realpathSync } from "node:fs";
import { dirname, extname, isAbsolute, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { Script } from "node:vm";

const featureId = "SYNTAX-CONSUME-NUMBER";
const generation = 5;
const status = "PUBLIC_BOUNDARY_PRECURSOR_AWAITING_FRESH_HOLDOUT_AND_TWO_CHALLENGES";
const targetPath = "grammar/css/l4/value-unit/consume-number.ts";
const allowedModule = "@mkbabb/parse-that/core";
const allowedImports = new Set(["Parser", "all", "any", "dispatch", "regex", "string"]);
const seats = Object.freeze(["h", "b", "s", "d"]);
const skepticRoles = Object.freeze(["specification", "parse-that", "hostility", "performance", "gestalt"]);
const adjudicatorRoles = Object.freeze(["semantic", "parser-architecture", "performance-gestalt"]);
const validatorFile = fileURLToPath(import.meta.url);
const cellRoot = dirname(validatorFile);
const mirrorRoot = resolve(cellRoot, "../../..");
const parseThatRoot = join(mirrorRoot, "node_modules", "@mkbabb", "parse-that");
const typeScriptRoot = join(mirrorRoot, "node_modules", "typescript");
const parseLedgerPath = join(cellRoot, "parse-that-package.ledger");
const tsLedgerPath = join(cellRoot, "typescript-package.ledger");
const proofLedgerPath = join(cellRoot, "proof-inputs.ledger");
const relevantSourceExtensions = new Set([".js", ".jsx", ".ts", ".tsx", ".mts", ".cts", ".mjs", ".cjs"]);
const requiredPrecursor = Object.freeze([
    "author-admission-protocol.json", "author-admission-validator.mjs",
    "authorities/css-syntax-3.Overview.bs", "authorities/css-values-4.Overview.bs",
    "benchmark-receipt.schema.json", "benchmark-runner.mjs", "contract.ts",
    "feature-public.json", "fixtures/public-cases.json", "formation-receipt.json",
    "harness.ts", "parse-that-package.ledger", "proof-inputs.ledger",
    "typescript-package.ledger",
]);
const requiredPostFreeze = Object.freeze([
    "holdout-ciphertext.b64", "holdout-receipt.json",
    "reviews/challenge-a.json", "reviews/challenge-b.json", "root-gestalt.json",
]);

const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");
const byteSort = (left, right) => Buffer.from(left).compare(Buffer.from(right));
const slash = (path) => path.split(sep).join("/");

function canonicalFile(path, label) {
    const absolute = resolve(path);
    const canonical = realpathSync(absolute);
    const stat = lstatSync(canonical);
    if (canonical !== absolute || !stat.isFile() || stat.isSymbolicLink()) {
        throw new Error(`${label} is not one canonical regular file`);
    }
    return canonical;
}

function canonicalDirectory(path, label) {
    const absolute = resolve(path);
    const canonical = realpathSync(absolute);
    if (canonical !== absolute || !lstatSync(canonical).isDirectory()) {
        throw new Error(`${label} is not one canonical directory`);
    }
    return canonical;
}

function diskFiles(root) {
    const files = [];
    const visit = (directory) => {
        for (const entry of readdirSync(directory).sort(byteSort)) {
            const path = join(directory, entry);
            const stat = lstatSync(path);
            if (stat.isSymbolicLink()) throw new Error(`symbolic link forbidden: ${path}`);
            if (stat.isDirectory()) visit(path);
            else if (stat.isFile()) files.push(path);
            else throw new Error(`unsupported entry: ${path}`);
        }
    };
    visit(root);
    return files;
}

class Snapshot {
    files = new Map();
    trees = new Map();

    file(path, label) {
        const canonical = canonicalFile(path, label);
        const prior = this.files.get(canonical);
        if (prior !== undefined) return prior;
        const bytes = readFileSync(canonical);
        const record = Object.freeze({ path: canonical, bytes });
        this.files.set(canonical, record);
        return record;
    }

    tree(path, label) {
        const root = canonicalDirectory(path, label);
        if (this.trees.has(root)) return this.trees.get(root);
        const files = diskFiles(root);
        const relatives = files.map((file) => slash(relative(root, file))).sort(byteSort);
        for (const file of files) this.file(file, `${label} file`);
        const record = Object.freeze({ root, relatives });
        this.trees.set(root, record);
        return record;
    }

    close() {
        for (const tree of this.trees.values()) {
            const live = diskFiles(tree.root).map((file) => slash(relative(tree.root, file))).sort(byteSort);
            if (JSON.stringify(live) !== JSON.stringify(tree.relatives)) {
                throw new Error(`tree path set changed before close: ${tree.root}`);
            }
        }
        for (const record of this.files.values()) {
            if (canonicalFile(record.path, "closing snapshot file") !== record.path
                || !readFileSync(record.path).equals(record.bytes)) {
                throw new Error(`captured bytes changed before close: ${record.path}`);
            }
        }
    }
}

function parseLedger(record, expectedHash, expectedRows) {
    if (sha256(record.bytes) !== expectedHash) throw new Error(`ledger digest mismatch: ${record.path}`);
    const text = record.bytes.toString("utf8");
    if (!text.endsWith("\n")) throw new Error(`ledger lacks final LF: ${record.path}`);
    const rows = text.slice(0, -1).split("\n").map((line) => {
        const match = /^([0-9a-f]{64})  ([^\n]+)$/.exec(line);
        if (match === null) throw new Error(`bad ledger row: ${line}`);
        return Object.freeze({ sha256: match[1], path: match[2] });
    });
    const sorted = [...rows].sort((a, b) => byteSort(a.path, b.path));
    if (rows.length !== expectedRows
        || new Set(rows.map((row) => row.path)).size !== rows.length
        || rows.some((row, index) => row.path !== sorted[index].path)) {
        throw new Error(`ledger row count, uniqueness, or ordering mismatch: ${record.path}`);
    }
    return rows;
}

function captureLedgerTree(snapshot, ledgerPath, ledgerHash, rows, root, label) {
    const ledger = parseLedger(snapshot.file(ledgerPath, `${label} ledger`), ledgerHash, rows);
    const tree = snapshot.tree(root, label);
    if (JSON.stringify(tree.relatives) !== JSON.stringify(ledger.map((row) => row.path))) {
        throw new Error(`${label} path closure drift`);
    }
    for (const row of ledger) {
        const record = snapshot.file(join(root, ...row.path.split("/")), `${label} row`);
        if (sha256(record.bytes) !== row.sha256) throw new Error(`${label} byte drift: ${row.path}`);
    }
    return ledger;
}

function captureProofInputs(snapshot) {
    const rows = parseLedger(
        snapshot.file(proofLedgerPath, "proof-input ledger"),
        "247192938b2f578c6fb6ace195dfb1d55b581a2c92374eb4ef386c450c9a20e1",
        6,
    );
    for (const row of rows) {
        const record = snapshot.file(join(mirrorRoot, ...row.path.split("/")), `proof input ${row.path}`);
        if (sha256(record.bytes) !== row.sha256) throw new Error(`proof input drift: ${row.path}`);
    }
    const grammar = snapshot.tree(join(mirrorRoot, "apotheosis", "grammar"), "active grammar");
    const expectedGrammar = rows
        .map((row) => row.path)
        .filter((path) => path.startsWith("apotheosis/grammar/"))
        .map((path) => path.slice("apotheosis/grammar/".length));
    if (JSON.stringify(grammar.relatives) !== JSON.stringify(expectedGrammar)) {
        throw new Error("active grammar is not the exact proof-ledger tree");
    }
    if (grammar.relatives.some((path) => relevantSourceExtensions.has(extname(path)))) {
        throw new Error("active grammar contains a governed source extension");
    }
    const clean = JSON.parse(snapshot.file(join(mirrorRoot, "apotheosis", "clean-base.json"), "clean base").bytes);
    const pkg = JSON.parse(snapshot.file(join(mirrorRoot, "package.json"), "package scripts").bytes);
    const parent = JSON.parse(snapshot.file(join(mirrorRoot, "tsconfig.json"), "parent TypeScript config").bytes);
    const child = JSON.parse(snapshot.file(join(mirrorRoot, "tsconfig.apotheosis.json"), "child TypeScript config").bytes);
    if (!Array.isArray(clean.typescript_sources) || clean.typescript_sources.length !== 0
        || clean.runtime_root !== "apotheosis/grammar"
        || pkg.scripts?.check !== "tsc -p tsconfig.apotheosis.json --noEmit"
        || pkg.scripts?.test !== "vitest run --config apotheosis/vitest.config.ts --passWithNoTests"
        || parent.compilerOptions?.strict !== true
        || child.extends !== "./tsconfig.json"
        || child.compilerOptions?.resolveJsonModule !== true) {
        throw new Error("proof-input semantic identity drift");
    }
    return rows;
}

function loadTypeScriptFromCapture(snapshot) {
    const record = snapshot.file(join(typeScriptRoot, "lib", "typescript.js"), "captured TypeScript compiler");
    const module = { exports: {} };
    const wrapper = new Script(`(function(module,exports,require,__filename,__dirname){${record.bytes.toString("utf8")}\n})`, { filename: record.path });
    wrapper.runInThisContext()(module, module.exports, createRequire(record.path), record.path, dirname(record.path));
    const ts = module.exports;
    if (ts.version !== "5.8.3") throw new Error("captured TypeScript compiler identity drift");
    return ts;
}

function captureTools(snapshot) {
    const parseRows = captureLedgerTree(
        snapshot, parseLedgerPath,
        "6fa2142d1bcfcd2f3fc5bcba8fd49ff7a61801b7e189e8cec0f8b4ea808d5d7d",
        65, parseThatRoot, "parse-that package",
    );
    const tsRows = captureLedgerTree(
        snapshot, tsLedgerPath,
        "3a08d88df997493df6c0dc751d81e52377f155defada21c1a0a7d4d0df048f47",
        130, typeScriptRoot, "TypeScript package",
    );
    const parsePackage = JSON.parse(snapshot.file(join(parseThatRoot, "package.json"), "parse-that package identity").bytes);
    if (parsePackage.name !== "@mkbabb/parse-that" || parsePackage.version !== "1.0.0") {
        throw new Error("parse-that identity drift");
    }
    return { ts: loadTypeScriptFromCapture(snapshot), parseRows, tsRows };
}

function verifyExecutableClosure(snapshot, ts) {
    const local = new Set(["contract.ts", "harness.ts"]);
    const fixtures = new Set();
    const external = new Set();
    const queue = [...local];
    while (queue.length > 0) {
        const path = queue.pop();
        const record = snapshot.file(join(cellRoot, path), `executable closure ${path}`);
        const source = ts.createSourceFile(path, record.bytes.toString("utf8"), ts.ScriptTarget.ES2022, true);
        if (source.parseDiagnostics.length !== 0) throw new Error(`syntax error in executable closure: ${path}`);
        for (const statement of source.statements) {
            if (!ts.isImportDeclaration(statement) || !ts.isStringLiteral(statement.moduleSpecifier)) continue;
            const specifier = statement.moduleSpecifier.text;
            if (specifier.startsWith(".")) {
                const resolved = resolve(dirname(record.path), specifier.endsWith(".json") ? specifier : specifier.replace(/\.js$/, ".ts"));
                const rel = slash(relative(cellRoot, resolved));
                if (specifier.endsWith(".json")) {
                    fixtures.add(rel);
                    snapshot.file(resolved, "fixture import");
                } else if (!local.has(rel)) {
                    local.add(rel);
                    queue.push(rel);
                }
            } else external.add(specifier);
        }
    }
    const closure = {
        local: [...local].sort(byteSort),
        fixtures: [...fixtures].sort(byteSort),
        external: [...external].sort(byteSort),
    };
    if (JSON.stringify(closure.local) !== JSON.stringify(["contract.ts", "harness.ts"])
        || JSON.stringify(closure.fixtures) !== JSON.stringify(["fixtures/public-cases.json"])
        || JSON.stringify(closure.external) !== JSON.stringify(["@mkbabb/parse-that/core", "@mkbabb/parse-that/diagnostics"])) {
        throw new Error(`unexpected executable closure: ${JSON.stringify(closure)}`);
    }
    const fixture = JSON.parse(snapshot.file(join(cellRoot, "fixtures", "public-cases.json"), "public fixture").bytes);
    if (fixture.feature_id !== featureId || fixture.generation !== generation
        || fixture.number_start_prefix_evidence?.length !== 6) {
        throw new Error("fixture identity or subordinate number-start arm drift");
    }
    return closure;
}

function assertCandidateSurface(sourceText, seat, ts) {
    if (!seats.includes(seat)) throw new Error(`unknown seat: ${seat}`);
    const source = ts.createSourceFile(targetPath, sourceText, ts.ScriptTarget.ES2022, true);
    if (source.parseDiagnostics.length !== 0) throw new Error("candidate TypeScript syntax error");
    const forbiddenIdentifiers = new Set([
        "ParserState", "state", "oldState", "newState", "src", "source", "offset", "cursor", "input",
        "eof", "recover", "mapState", "call", "parseState", "eval", "Function", "Reflect", "Symbol",
        "Proxy", "Object", "globalThis", "process", "require",
    ]);
    const allowedMethods = new Set(["map", "skip", "next", "then", "opt", "many", "lookAhead", "startsWith", "includes", "test"]);
    const calls = { Parser: 0, all: 0, any: 0, dispatch: 0, regex: 0, string: 0 };
    const regexSources = [];
    let exports = 0;
    let dispatchKeys = [];
    const visit = (node) => {
        if (ts.isImportDeclaration(node)) {
            if (!ts.isStringLiteral(node.moduleSpecifier) || node.moduleSpecifier.text !== allowedModule) {
                throw new Error(`candidate may import only ${allowedModule}`);
            }
            const clause = node.importClause;
            if (clause === undefined || clause.name !== undefined || clause.namedBindings === undefined || !ts.isNamedImports(clause.namedBindings)) {
                throw new Error("candidate imports must be exact named imports");
            }
            for (const item of clause.namedBindings.elements) {
                const imported = item.propertyName?.text ?? item.name.text;
                if (!allowedImports.has(imported) || item.name.text !== imported) {
                    throw new Error(`candidate import forbidden or aliased: ${imported}`);
                }
            }
        }
        if (ts.isImportEqualsDeclaration(node) || ts.isExportDeclaration(node) || ts.isExportAssignment(node)
            || ts.isElementAccessExpression(node) || ts.isObjectBindingPattern(node)
            || ts.isAsExpression(node) || ts.isTypeAssertionExpression(node) || ts.isNonNullExpression(node)
            || ts.isSpreadAssignment(node) || ts.isSpreadElement(node) || ts.isComputedPropertyName(node)
            || ts.isNewExpression(node) || ts.isFunctionDeclaration(node) || ts.isFunctionExpression(node)
            || ts.isClassDeclaration(node) || ts.isClassExpression(node)
            || ts.isForStatement(node) || ts.isForInStatement(node) || ts.isForOfStatement(node)
            || ts.isWhileStatement(node) || ts.isDoStatement(node) || ts.isTryStatement(node)
            || ts.isAwaitExpression(node) || ts.isYieldExpression(node) || ts.isDeleteExpression(node)
            || ts.isBinaryExpression(node) && ts.isAssignmentOperator(node.operatorToken.kind)) {
            throw new Error(`candidate syntax forbidden: ${ts.SyntaxKind[node.kind]}`);
        }
        if (ts.isVariableDeclaration(node) && !ts.isIdentifier(node.name)) {
            throw new Error("candidate variable declarations must use identifier bindings");
        }
        if (ts.isVariableStatement(node) && node.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword)) {
            const declarations = node.declarationList.declarations;
            if (declarations.length !== 1 || !ts.isIdentifier(declarations[0].name)
                || declarations[0].name.text !== "consumeNumber" || declarations[0].initializer === undefined) {
                throw new Error("sole direct export must be initialized consumeNumber");
            }
            exports += 1;
        } else if (ts.canHaveModifiers(node) && ts.getModifiers(node)?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword)) {
            throw new Error("only a direct consumeNumber variable export is allowed");
        }
        if (ts.isIdentifier(node) && forbiddenIdentifiers.has(node.text)) {
            throw new Error(`forbidden state/source/global identifier: ${node.text}`);
        }
        if (ts.isPropertyAccessExpression(node) && !allowedMethods.has(node.name.text)) {
            throw new Error(`property access is outside the positive construction grammar: ${node.name.text}`);
        }
        if (ts.isCallExpression(node)) {
            if (node.expression.kind === ts.SyntaxKind.ImportKeyword) throw new Error("dynamic import forbidden");
            if (ts.isIdentifier(node.expression)) {
                if (Object.hasOwn(calls, node.expression.text)) calls[node.expression.text] += 1;
                else if (node.expression.text !== "Number") throw new Error(`direct call outside positive grammar: ${node.expression.text}`);
                if (node.expression.text === "regex" && ts.isRegularExpressionLiteral(node.arguments[0])) {
                    const literal = node.arguments[0].text;
                    const lastSlash = literal.lastIndexOf("/");
                    regexSources.push({ source: literal.slice(1, lastSlash), flags: literal.slice(lastSlash + 1) });
                }
                if (node.expression.text === "dispatch" && ts.isObjectLiteralExpression(node.arguments[0])) {
                    dispatchKeys = node.arguments[0].properties.map((property) => {
                        if (!ts.isPropertyAssignment(property)
                            || !(ts.isStringLiteral(property.name) || ts.isIdentifier(property.name))) {
                            throw new Error("dispatch table must use direct string/identifier property assignments");
                        }
                        return property.name.text;
                    }).sort(byteSort);
                }
            } else if (ts.isPropertyAccessExpression(node.expression)) {
                if (!allowedMethods.has(node.expression.name.text)) {
                    throw new Error(`method call outside positive grammar: ${node.expression.name.text}`);
                }
            } else throw new Error("indirect call outside positive grammar");
        }
        if (ts.isPropertyAssignment(node)
            && (ts.isIdentifier(node.name) || ts.isStringLiteral(node.name))
            && node.name.text === "__proto__") {
            throw new Error("__proto__ property forbidden");
        }
        ts.forEachChild(node, visit);
    };
    visit(source);
    if (exports !== 1) throw new Error(`expected one direct consumeNumber export, received ${exports}`);
    const whole = "[+-]?(?:[0-9]*\\.[0-9]+|[0-9]+)(?:[eE][+-]?[0-9]+)?";
    if (seat === "h" && !(calls.regex === 1 && calls.any === 0 && calls.all === 0 && calls.dispatch === 0
        && regexSources.length === 1 && regexSources[0].source === whole && regexSources[0].flags === "")) {
        throw new Error("H topology requires exactly one exact whole-prefix regex and no any/all/dispatch");
    }
    if (seat === "b" && !(calls.dispatch === 0 && calls.string === 0 && calls.any >= 2 && calls.all >= 2 && calls.regex >= 3)) {
        throw new Error("B topology requires regex-terminal production trees with any/all and no string/dispatch");
    }
    if (seat === "s" && !(calls.dispatch === 0 && calls.any >= 2 && calls.all >= 1 && calls.string >= 4)) {
        throw new Error("S topology requires explicit string clauses plus any/all and no dispatch");
    }
    if (seat === "d" && !(calls.dispatch >= 1
        && ["+-", ".", "0-9"].every((key) => dispatchKeys.includes(key)))) {
        throw new Error("D topology requires dispatch with +-, dot, and 0-9 buckets");
    }
    return Object.freeze({ seat, calls, regexSources, dispatchKeys });
}

function typeProbe() {
    return [
        'import { consumeNumber } from "./consume-number.js";',
        'import type { Parser } from "@mkbabb/parse-that/core";',
        'type Expected = Readonly<{ value: number; type: "integer" | "number"; sign: "+" | "-" | null }>;',
        'type IsAny<T> = 0 extends (1 & T) ? true : false;',
        'type IsUnknown<T> = IsAny<T> extends true ? false : unknown extends T ? ([keyof T] extends [never] ? true : false) : false;',
        'type Exact<A,B> = IsAny<A> extends true ? false : IsAny<B> extends true ? false : IsUnknown<A> extends true ? false : IsUnknown<B> extends true ? false : [A] extends [B] ? ([B] extends [A] ? true : false) : false;',
        'type Payload<T> = T extends Parser<infer V> ? V : never;',
        'type Assert<T extends true> = T;',
        'export type Root = Assert<Exact<typeof consumeNumber, Parser<Expected>>>;',
        'export type Leaf = Assert<Exact<Payload<typeof consumeNumber>, Expected>>;',
        '',
    ].join("\n");
}

function typeProof(sourceText, ts, snapshot) {
    const candidatePath = resolve("/__syntax_consume_number_g5_assay__/consume-number.ts");
    const probePath = resolve("/__syntax_consume_number_g5_assay__/.probe.ts");
    const memory = new Map([[candidatePath, sourceText], [probePath, typeProbe()]]);
    const captured = new Map();
    for (const record of snapshot.files.values()) captured.set(resolve(record.path), record.bytes.toString("utf8"));
    const options = {
        strict: true, target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext,
        moduleResolution: ts.ModuleResolutionKind.Bundler, noEmit: true, types: [],
        lib: ["lib.es2022.d.ts"], skipLibCheck: false, verbatimModuleSyntax: true,
    };
    const host = ts.createCompilerHost(options, true);
    const textFor = (path) => memory.get(resolve(path)) ?? captured.get(resolve(path));
    host.fileExists = (path) => textFor(path) !== undefined;
    host.readFile = (path) => textFor(path);
    host.getSourceFile = (path, languageVersion) => {
        const text = textFor(path);
        return text === undefined ? undefined : ts.createSourceFile(resolve(path), text, languageVersion, true);
    };
    host.getDefaultLibFileName = () => join(typeScriptRoot, "lib", "lib.es2022.d.ts");
    host.realpath = (path) => resolve(path);
    host.directoryExists = (path) => {
        const prefix = `${resolve(path)}${sep}`;
        return [...memory.keys(), ...captured.keys()].some((file) => file.startsWith(prefix));
    };
    host.getDirectories = () => [];
    host.resolveModuleNames = (names, containing) => names.map((name) => {
        if (resolve(containing) === probePath && name === "./consume-number.js") {
            return { resolvedFileName: candidatePath, extension: ts.Extension.Ts, isExternalLibraryImport: false };
        }
        if (name === allowedModule) {
            return {
                resolvedFileName: join(parseThatRoot, "dist", "core.d.ts"),
                extension: ts.Extension.Dts,
                isExternalLibraryImport: true,
                packageId: { name: "@mkbabb/parse-that", subModuleName: "core", version: "1.0.0" },
            };
        }
        return ts.resolveModuleName(name, containing, options, host).resolvedModule;
    });
    const program = ts.createProgram({ rootNames: [candidatePath, probePath], options, host });
    for (const source of program.getSourceFiles()) {
        const expected = textFor(source.fileName);
        if (expected === undefined || source.text !== expected) {
            throw new Error(`compiler source is not the captured buffer: ${source.fileName}`);
        }
    }
    const diagnostics = ts.getPreEmitDiagnostics(program);
    if (diagnostics.length !== 0) {
        const text = diagnostics.map((item) => `TS${item.code}: ${ts.flattenDiagnosticMessageText(item.messageText, "\n")}`).join("\n");
        throw new Error(`strict captured-buffer type proof failed:\n${text}`);
    }
    const candidate = program.getSourceFile(candidatePath);
    const symbol = candidate === undefined ? undefined : program.getTypeChecker().getSymbolAtLocation(candidate);
    const exports = symbol === undefined ? [] : program.getTypeChecker().getExportsOfModule(symbol);
    if (exports.length !== 1 || exports[0].getName() !== "consumeNumber") {
        throw new Error("checker export surface is not exactly consumeNumber");
    }
    return Object.freeze({ diagnostics: 0, compilerSources: program.getSourceFiles().length });
}

function parseJson(record, label) {
    try {
        return JSON.parse(record.bytes.toString("utf8"));
    } catch (error) {
        throw new Error(`${label} is not JSON: ${String(error)}`);
    }
}

function verifyAuthorityRows(snapshot, authorities) {
    if (!Array.isArray(authorities) || authorities.length === 0) throw new Error("feature authorities are absent");
    let pathAuthorities = 0;
    let urlAuthorities = 0;
    for (const authority of authorities) {
        let path;
        if (typeof authority.path === "string") {
            path = isAbsolute(authority.path) ? authority.path : resolve(cellRoot, authority.path);
            pathAuthorities += 1;
        } else if (typeof authority.url === "string" && typeof authority.local_path === "string") {
            if (!authority.url.includes(authority.revision ?? "")) throw new Error("pinned URL does not contain its revision");
            path = resolve(cellRoot, authority.local_path);
            urlAuthorities += 1;
        } else {
            throw new Error("authority is not an executable path or pinned URL/local-byte row");
        }
        if (!/^[0-9a-f]{64}$/.test(authority.sha256 ?? "")) throw new Error("authority lacks lowercase SHA-256");
        const record = snapshot.file(path, `authority ${authority.path ?? authority.url}`);
        if (sha256(record.bytes) !== authority.sha256) throw new Error(`authority digest drift: ${authority.path ?? authority.url}`);
        if (authority.bytes !== undefined
            && (!Number.isSafeInteger(authority.bytes) || authority.bytes !== record.bytes.length)) {
            throw new Error(`authority byte-length drift: ${authority.path ?? authority.url}`);
        }
    }
    return Object.freeze({ total: authorities.length, pathAuthorities, urlAuthorities });
}

function verifyAuthorities(snapshot, mutationControl = false) {
    const feature = parseJson(snapshot.file(join(cellRoot, "feature-public.json"), "feature authority registry"), "feature authority registry");
    if (feature.feature_id !== featureId || feature.generation !== generation) throw new Error("feature authority registry identity drift");
    const closure = verifyAuthorityRows(snapshot, feature.authorities);
    if (mutationControl) {
        const mutated = structuredClone(feature.authorities);
        const target = mutated.find((row) => typeof row.path === "string");
        if (target === undefined) throw new Error("no local authority available for mutation control");
        target.sha256 = "0".repeat(64);
        let rejected = false;
        try {
            verifyAuthorityRows(snapshot, mutated);
        } catch {
            rejected = true;
        }
        if (!rejected) throw new Error("mutated local authority row was not rejected");
        return Object.freeze({ ...closure, mutationControl: "REJECTED_MUTATED_LOCAL_SHA256" });
    }
    return closure;
}

function verifyFormation(snapshot) {
    const receipt = parseJson(snapshot.file(join(cellRoot, "formation-receipt.json"), "formation receipt"), "formation receipt");
    if (receipt.feature_id !== featureId || receipt.generation !== generation || receipt.status !== status
        || !Array.isArray(receipt.precursor_byte_closure)) {
        throw new Error("formation receipt identity drift");
    }
    const expected = requiredPrecursor.filter((path) => path !== "formation-receipt.json").sort(byteSort);
    const actual = receipt.precursor_byte_closure.map((row) => row.path).sort(byteSort);
    if (JSON.stringify(actual) !== JSON.stringify(expected)) throw new Error("formation receipt precursor closure drift");
    for (const row of receipt.precursor_byte_closure) {
        const record = snapshot.file(join(cellRoot, ...row.path.split("/")), `formation row ${row.path}`);
        if (row.bytes !== record.bytes.length || row.sha256 !== sha256(record.bytes)) {
            throw new Error(`formation row byte drift: ${row.path}`);
        }
    }
    return receipt;
}

function verifyManifest(snapshot, digest) {
    if (!/^[0-9a-f]{64}$/.test(digest)) throw new Error("manifest digest must be lowercase SHA-256");
    const manifestRecord = snapshot.file(join(cellRoot, "manifest.json"), "author-admission manifest");
    if (sha256(manifestRecord.bytes) !== digest) throw new Error("manifest differs from owner-sealed digest");
    const manifest = parseJson(manifestRecord, "manifest");
    if (manifest.feature_id !== featureId || manifest.generation !== generation
        || !Array.isArray(manifest.public_input_closure)) {
        throw new Error("manifest identity drift");
    }
    const expected = [...requiredPrecursor, ...requiredPostFreeze].sort(byteSort);
    const actual = manifest.public_input_closure.map((row) => row.path).sort(byteSort);
    if (new Set(actual).size !== actual.length || JSON.stringify(actual) !== JSON.stringify(expected)) {
        throw new Error("manifest is not the exact pre-author input closure");
    }
    const records = new Map();
    for (const row of manifest.public_input_closure) {
        const record = snapshot.file(join(cellRoot, ...row.path.split("/")), `manifest row ${row.path}`);
        if (record.bytes.length !== row.bytes || sha256(record.bytes) !== row.sha256) {
            throw new Error(`manifest row byte drift: ${row.path}`);
        }
        records.set(row.path, record);
    }
    return { manifestRecord, manifest, records };
}

function verifyAcceptVerdicts(records) {
    const reviews = ["a", "b"].map((id) => {
        const path = `reviews/challenge-${id}.json`;
        const review = parseJson(records.get(path), path);
        if (review.feature_id !== featureId || review.generation !== generation
            || review.review_id !== id.toUpperCase()
            || review.scope !== "PUBLIC_BOUNDARY_AND_AUTHOR_ADMISSION"
            || review.verdict !== "ACCEPT") {
            throw new Error(`${path} is not an exact ACCEPT boundary verdict`);
        }
        return { id: id.toUpperCase(), path, sha256: sha256(records.get(path).bytes), bytes: records.get(path).bytes.length };
    });
    const root = parseJson(records.get("root-gestalt.json"), "root gestalt");
    if (root.feature_id !== featureId || root.generation !== generation
        || root.scope !== "PUBLIC_BOUNDARY_AND_AUTHOR_ADMISSION"
        || root.verdict !== "ACCEPT"
        || JSON.stringify(root.challenges) !== JSON.stringify(reviews)) {
        throw new Error("root gestalt is not exact ACCEPT over the two captured reviews");
    }
    return { reviews, root: { sha256: sha256(records.get("root-gestalt.json").bytes), bytes: records.get("root-gestalt.json").bytes.length } };
}

function verifyCiphertext(records) {
    const receipt = parseJson(records.get("holdout-receipt.json"), "holdout receipt");
    const ciphertext = records.get("holdout-ciphertext.b64").bytes;
    if (receipt.feature_id !== featureId || receipt.generation !== generation
        || receipt.ciphertext?.sha256 !== sha256(ciphertext)
        || receipt.ciphertext?.bytes !== ciphertext.length
        || receipt.ciphertext?.encoding !== "base64-with-final-lf") {
        throw new Error("fresh holdout receipt does not directly bind captured ciphertext");
    }
    const text = ciphertext.toString("ascii");
    const body = text.endsWith("\n") ? text.slice(0, -1) : "";
    if (body.length === 0 || /\s/.test(body) || Buffer.from(body, "base64").toString("base64") !== body) {
        throw new Error("holdout ciphertext is not canonical base64 with one final LF");
    }
    return { sha256: sha256(ciphertext), bytes: ciphertext.length };
}

function laterAcceptanceContract(candidateSet = null) {
    return Object.freeze({
        validator: "SEPARATE_POST_AUTHOR_ACCEPTANCE_VALIDATOR_REQUIRED",
        skeptic_receipts: skepticRoles.map((role) => Object.freeze({ role, independent_identity: true })),
        adjudicator_receipts: adjudicatorRoles.map((role) => Object.freeze({ role, independent_identity: true })),
        identity_law: "all five skeptic and three adjudicator identities are pairwise distinct and distinct from the four author identities",
        candidate_set: candidateSet,
        candidate_set_law: "every skeptic and adjudicator receipt binds the identical exact ordered H/B/S/D candidate hashes",
        reviewed_hash_law: "every receipt binds one identical reviewed hash from that candidate set; all three synthesis adjudicators unanimously nominate that same exact hash",
        required_other_receipts: ["public", "revealed-holdout", "four-seat-benchmark", "integration", "projection/default-gates"],
        disagreement_law: "missing role, identity reuse, candidate-set drift, reviewed-hash drift, or any adjudicator disagreement is rejection",
    });
}

export function verifySelf() {
    if (slash(relative(mirrorRoot, validatorFile)) !== "cells/syntax-consume-number/g5/author-admission-validator.mjs") {
        throw new Error("validator is not at its governed path");
    }
    const snapshot = new Snapshot();
    captureProofInputs(snapshot);
    const tools = captureTools(snapshot);
    const closure = verifyExecutableClosure(snapshot, tools.ts);
    const authorities = verifyAuthorities(snapshot, true);
    const formation = verifyFormation(snapshot);
    snapshot.close();
    return {
        featureId, generation, status, closure, authorities,
        formationSha256: sha256(snapshot.files.get(join(cellRoot, "formation-receipt.json")).bytes),
        proofLedgerSha256: sha256(snapshot.files.get(proofLedgerPath).bytes),
        toolLedgers: { parseThat: sha256(snapshot.files.get(parseLedgerPath).bytes), typescript: sha256(snapshot.files.get(tsLedgerPath).bytes) },
    };
}

export function verifyPreAuthorAdmission(manifestDigest) {
    if (existsSync(join(cellRoot, "candidates"))) throw new Error("candidate directory exists before author admission");
    const snapshot = new Snapshot();
    captureProofInputs(snapshot);
    const tools = captureTools(snapshot);
    verifyExecutableClosure(snapshot, tools.ts);
    verifyAuthorities(snapshot);
    verifyFormation(snapshot);
    const manifest = verifyManifest(snapshot, manifestDigest);
    const verdicts = verifyAcceptVerdicts(manifest.records);
    const ciphertext = verifyCiphertext(manifest.records);
    snapshot.close();
    return {
        featureId, generation, decision: "AUTHORS_MAY_BE_INVITED",
        manifest: { sha256: sha256(manifest.manifestRecord.bytes), bytes: manifest.manifestRecord.bytes.length },
        ciphertext, verdicts,
        deferred: laterAcceptanceContract(),
    };
}

export function assayCandidateSource(seat, sourceText) {
    const snapshot = new Snapshot();
    captureProofInputs(snapshot);
    const tools = captureTools(snapshot);
    verifyAuthorities(snapshot);
    const topology = assertCandidateSurface(sourceText, seat, tools.ts);
    const types = typeProof(sourceText, tools.ts, snapshot);
    snapshot.close();
    return { featureId, generation, topology, types, sourceSha256: sha256(Buffer.from(sourceText)), sourceBytes: Buffer.byteLength(sourceText) };
}

export function verifyFourSeatAdmission(candidateRootArgument) {
    const candidateRoot = canonicalDirectory(candidateRootArgument, "candidate root");
    const snapshot = new Snapshot();
    captureProofInputs(snapshot);
    const tools = captureTools(snapshot);
    verifyAuthorities(snapshot);
    const tree = snapshot.tree(candidateRoot, "four-seat candidate root");
    const expected = seats.flatMap((seat) => [
        `${seat}/author-receipt.json`,
        `${seat}/overlay/${targetPath}`,
    ]).sort(byteSort);
    if (JSON.stringify(tree.relatives) !== JSON.stringify(expected)) throw new Error("four-seat root has an unexpected path set");
    const sourceHashes = new Set();
    const authorIds = new Set();
    const admitted = [];
    for (const seat of seats) {
        const sourceRecord = snapshot.file(join(candidateRoot, seat, "overlay", ...targetPath.split("/")), `${seat} candidate`);
        const receiptRecord = snapshot.file(join(candidateRoot, seat, "author-receipt.json"), `${seat} author receipt`);
        const receipt = parseJson(receiptRecord, `${seat} author receipt`);
        const sourceText = sourceRecord.bytes.toString("utf8");
        const sourceHash = sha256(sourceRecord.bytes);
        if (receipt.feature_id !== featureId || receipt.generation !== generation || receipt.seat !== seat
            || receipt.topology !== seat.toUpperCase() || receipt.source_sha256 !== sourceHash
            || receipt.source_bytes !== sourceRecord.bytes.length || receipt.independent !== true
            || receipt.peer_source_access !== false || typeof receipt.author_id !== "string"
            || receipt.author_id.length === 0) {
            throw new Error(`${seat} author receipt identity/attestation drift`);
        }
        if (sourceHashes.has(sourceHash)) throw new Error("candidate source bytes are not pairwise distinct");
        if (authorIds.has(receipt.author_id)) throw new Error("author identities are not pairwise distinct");
        sourceHashes.add(sourceHash);
        authorIds.add(receipt.author_id);
        admitted.push({
            seat,
            topology: assertCandidateSurface(sourceText, seat, tools.ts),
            types: typeProof(sourceText, tools.ts, snapshot),
            sourceSha256: sourceHash,
            receiptSha256: sha256(receiptRecord.bytes),
        });
    }
    snapshot.close();
    const candidateSet = admitted.map((item) => Object.freeze({ seat: item.seat, sha256: item.sourceSha256 }));
    return {
        featureId, generation, decision: "FOUR_SOURCE_FLOORS_ADMITTED_FOR_SEPARATE_ACCEPTANCE",
        admitted,
        deferred: laterAcceptanceContract(candidateSet),
    };
}

const invoked = process.argv[1] === undefined ? null : resolve(process.argv[1]);
if (invoked === validatorFile) {
    if (process.argv[2] === "--self-check" && process.argv.length === 3) {
        process.stdout.write(`${JSON.stringify(verifySelf(), null, 2)}\n`);
    } else if (process.argv[2] === "--pre-author" && process.argv.length === 4) {
        process.stdout.write(`${JSON.stringify(verifyPreAuthorAdmission(process.argv[3]), null, 2)}\n`);
    } else if (process.argv[2] === "--assay-stdin" && process.argv.length === 4) {
        process.stdout.write(`${JSON.stringify(assayCandidateSource(process.argv[3], readFileSync(0, "utf8")), null, 2)}\n`);
    } else if (process.argv[2] === "--four-seat" && process.argv.length === 4) {
        process.stdout.write(`${JSON.stringify(verifyFourSeatAdmission(process.argv[3]), null, 2)}\n`);
    } else {
        throw new Error("usage: author-admission-validator.mjs --self-check | --pre-author <manifest-sha256> | --assay-stdin <h|b|s|d> | --four-seat <candidate-root>");
    }
}
