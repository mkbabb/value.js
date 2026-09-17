#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, lstatSync, readFileSync, readdirSync, realpathSync } from "node:fs";
import { dirname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { canonicalize, compareCanonicalText, parseJsonStrict, validateJsonSchema } from "./json-contract.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
let receiptPath;
for (let index = 2; index < process.argv.length; index += 1) {
    if (process.argv[index] === "--receipt" && process.argv[index + 1]) receiptPath = resolve(process.argv[++index]);
    else {
        process.stderr.write("usage: node validate-parse-that-package-receipt.mjs --receipt <path>\n");
        process.exit(2);
    }
}
if (!receiptPath) {
    process.stderr.write("usage: node validate-parse-that-package-receipt.mjs --receipt <path>\n");
    process.exit(2);
}

const receipt = parseJsonStrict(readFileSync(receiptPath));
const schema = parseJsonStrict(readFileSync(resolve(root, "parse-that-package-receipt.schema.json")));
const failures = validateJsonSchema(receipt, schema);
const fail = (message) => failures.push(message);
const digest = (algorithm, bytes, encoding = "hex") => createHash(algorithm).update(bytes).digest(encoding);
const sha256 = (bytes) => digest("sha256", bytes);
const fileHash = (path) => sha256(readFileSync(path));

function checkedFile(evidence, pointer) {
    if (!evidence?.path || !existsSync(evidence.path)) {
        fail(`${pointer}/path: missing file`);
        return false;
    }
    const metadata = lstatSync(evidence.path);
    if (!metadata.isFile() || metadata.isSymbolicLink()) {
        fail(`${pointer}/path: regular non-symlink file required`);
        return false;
    }
    if (realpathSync(evidence.path) !== evidence.path) fail(`${pointer}/path: canonical path required`);
    const actual = fileHash(evidence.path);
    if (actual !== evidence.sha256) fail(`${pointer}/sha256: computed ${actual}`);
    return true;
}

const tarballOkay = checkedFile(receipt.tarball, "/tarball");
let archiveFiles = [];
let packageJson;
if (tarballOkay) {
    const tarball = readFileSync(receipt.tarball.path);
    if (tarball[0] !== 0x1f || tarball[1] !== 0x8b) fail("/tarball/path: gzip tarball required");
    const integrity = `sha512-${digest("sha512", tarball, "base64")}`;
    if (integrity !== receipt.package?.integrity) fail(`/package/integrity: computed ${integrity}`);
    try {
        const listing = execFileSync("/usr/bin/tar", ["-tzf", receipt.tarball.path], { encoding: "utf8", maxBuffer: 32 * 1024 * 1024 })
            .trim().split("\n").filter(Boolean);
        if (new Set(listing).size !== listing.length) fail("/archive: duplicate archive path");
        for (const path of listing) {
            if (!path.startsWith("package/") || path.includes("\\") || path.split("/").includes("..") || path.startsWith("/")) fail(`/archive: unsafe path ${path}`);
        }
        const verbose = execFileSync("/usr/bin/tar", ["-tvzf", receipt.tarball.path], { encoding: "utf8", maxBuffer: 32 * 1024 * 1024 })
            .trim().split("\n").filter(Boolean);
        if (verbose.length !== listing.length || verbose.some((line) => !/^[-d]/.test(line))) fail("/archive: only regular files and directories are permitted");
        const regular = listing.filter((path) => !path.endsWith("/")).sort(compareCanonicalText);
        archiveFiles = regular.map((path) => {
            const bytes = execFileSync("/usr/bin/tar", ["-xOzf", receipt.tarball.path, path], { encoding: null, maxBuffer: 64 * 1024 * 1024 });
            return { path: path.slice("package/".length), bytes: bytes.length, sha256: sha256(bytes), content: bytes };
        });
        const packageRow = archiveFiles.find(({ path }) => path === "package.json");
        if (!packageRow) fail("/archive: package.json missing");
        else {
            packageJson = parseJsonStrict(packageRow.content);
            if (packageJson.name !== receipt.package?.name || packageJson.version !== receipt.package?.version) fail("/package: tarball package.json name/version mismatch");
        }
    } catch (error) {
        fail(`/archive: ${error.message}`);
    }
}

if (archiveFiles.length) {
    const rows = archiveFiles.map(({ path, bytes, sha256 }) => ({ path, bytes, sha256 }));
    const runtime = rows.filter(({ path }) => /\.(?:cjs|mjs|js)$/.test(path));
    const declarations = rows.filter(({ path }) => /\.d\.(?:cts|mts|ts)$/.test(path));
    const packageRow = rows.find(({ path }) => path === "package.json");
    const projections = {
        package_json_sha256: packageRow?.sha256,
        file_count: rows.length,
        files_sha256: sha256(canonicalize(rows)),
        runtime_files_sha256: sha256(canonicalize(runtime)),
        declaration_files_sha256: sha256(canonicalize(declarations)),
        export_conditions_sha256: sha256(canonicalize({ exports: packageJson?.exports ?? null, main: packageJson?.main ?? null, module: packageJson?.module ?? null, types: packageJson?.types ?? null })),
    };
    for (const [key, value] of Object.entries(projections)) if (receipt.archive?.[key] !== value) fail(`/archive/${key}: computed ${value}`);
    if (runtime.length === 0) fail("/archive/runtime_files_sha256: no runtime files");
    if (declarations.length === 0) fail("/archive/declaration_files_sha256: no declaration files");
}

for (const [name, evidence] of [["npm_ls", receipt.install?.npm_ls], ["lockfile", receipt.install?.lockfile]]) checkedFile(evidence, `/install/${name}`);
const packagePath = receipt.install?.package_path;
if (packagePath) {
    const expected = resolve(receipt.install.root, "node_modules/@mkbabb/parse-that");
    if (packagePath !== expected) fail(`/install/package_path: expected ${expected}`);
    if (!existsSync(packagePath) || !lstatSync(packagePath).isDirectory() || lstatSync(packagePath).isSymbolicLink()) fail("/install/package_path: installed package must be a real directory");
    else if (realpathSync(packagePath) !== packagePath) fail("/install/package_path: installed package must not resolve through a link");
}

function installedRows(directory) {
    const rows = [];
    const visit = (current) => {
        for (const name of readdirSync(current).sort(compareCanonicalText)) {
            const path = resolve(current, name);
            const metadata = lstatSync(path);
            if (metadata.isSymbolicLink()) fail(`/install/package_path: symlink forbidden ${path}`);
            else if (metadata.isDirectory()) visit(path);
            else if (metadata.isFile()) rows.push({ path: relative(directory, path).split("\\").join("/"), bytes: metadata.size, sha256: fileHash(path) });
            else fail(`/install/package_path: unsupported filesystem entry ${path}`);
        }
    };
    if (existsSync(directory)) visit(directory);
    return rows.sort((left, right) => compareCanonicalText(left.path, right.path));
}

if (packagePath && existsSync(packagePath)) {
    const installed = installedRows(packagePath);
    const archive = archiveFiles.map(({ path, bytes, sha256 }) => ({ path, bytes, sha256 }));
    const treeHash = sha256(canonicalize(installed));
    if (receipt.install.tree_sha256 !== treeHash) fail(`/install/tree_sha256: computed ${treeHash}`);
    if (canonicalize(installed) !== canonicalize(archive)) fail("/install/package_path: installed tree differs from tarball bytes");
    const installedPackage = parseJsonStrict(readFileSync(resolve(packagePath, "package.json")));
    if (installedPackage.name !== "@mkbabb/parse-that" || installedPackage.version !== "1.0.0") fail("/install/package_path: wrong installed package identity");
}

if (receipt.install?.npm_ls?.path && existsSync(receipt.install.npm_ls.path)) {
    const npmLs = parseJsonStrict(readFileSync(receipt.install.npm_ls.path));
    const installed = npmLs.dependencies?.["@mkbabb/parse-that"];
    if (installed?.version !== "1.0.0" || installed?.resolved?.startsWith("file:") || installed?.link === true) fail("/install/npm_ls: exact non-link 1.0.0 dependency missing");
}
if (receipt.install?.lockfile?.path && existsSync(receipt.install.lockfile.path)) {
    const lock = parseJsonStrict(readFileSync(receipt.install.lockfile.path));
    const installed = lock.packages?.["node_modules/@mkbabb/parse-that"];
    if (installed?.version !== "1.0.0" || installed?.link === true || typeof installed?.resolved !== "string" || installed.resolved.startsWith("file:") || installed.integrity !== receipt.package?.integrity) {
        fail("/install/lockfile: exact registry 1.0.0 integrity entry missing");
    }
}

const preimage = structuredClone(receipt);
delete preimage.receipt_hash;
const computed = sha256(canonicalize(preimage));
if (receipt.receipt_hash !== computed) fail(`/receipt_hash: computed ${computed}`);

if (failures.length) {
    process.stderr.write(`${failures.join("\n")}\n`);
    process.exit(1);
}
process.stdout.write(`${JSON.stringify({ schema: receipt.schema, package: `${receipt.package.name}@${receipt.package.version}`, integrity: receipt.package.integrity, files: receipt.archive.file_count, receipt_hash: computed })}\n`);
