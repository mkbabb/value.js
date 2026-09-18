#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { computeCorpusEpoch } from "./corpus-epoch.mjs";
import { walkCorpusFiles } from "./corpus-files.mjs";
import { canonicalize, compareCanonicalText, parseJsonStrict } from "./json-contract.mjs";
import { indexUniqueAgentSessions } from "./seat-ledger-session-index.mjs";

const toolPath = fileURLToPath(import.meta.url);
const toolsRoot = dirname(toolPath);
const sha256 = (value) => createHash("sha256").update(value).digest("hex");

function assert(condition, message) {
    if (!condition) throw new Error(message);
}

function permutations(values) {
    if (values.length < 2) return [values];
    return values.flatMap((value, index) => permutations([
        ...values.slice(0, index),
        ...values.slice(index + 1),
    ]).map((tail) => [value, ...tail]));
}

function orderSignature(values) {
    const ordered = [...values].sort(compareCanonicalText);
    return { ordered, sha256: sha256(canonicalize(ordered)) };
}

function assertPermutationInvariant(values, label) {
    const expected = canonicalize(orderSignature(values));
    for (const permutation of permutations(values)) {
        assert(canonicalize(orderSignature(permutation)) === expected, `${label}: permutation changed canonical order or hash`);
    }
}

function expectRejected(operation, label) {
    try {
        operation();
    } catch {
        return;
    }
    throw new Error(`${label}: invalid canonical JSON input was accepted`);
}

function runOrderControls() {
    const method = ["locale", "Compare"].join("");
    const original = String.prototype[method];
    Object.defineProperty(String.prototype, method, {
        configurable: true,
        value: () => { throw new Error("locale collation entered canonical ordering"); },
        writable: true,
    });
    try {
        const truth = ["Z", "a", "a-", "a.", "a_", "a\u0308", "ä", "𐀀", "\uE000"];
        assert(canonicalize([...truth].reverse().sort(compareCanonicalText)) === canonicalize(truth), "ordinal truth table drift");
        assert(compareCanonicalText("a\u0308", "ä") !== 0, "normalization-distinct strings collapsed");
        assert(compareCanonicalText("𐀀", "\uE000") < 0, "astral/BMP order is not UTF-16 ordinal order");
        assertPermutationInvariant(["a_", "a-"], "consumer IDs");
        assertPermutationInvariant(["API-OPERATIONS.md", "api-contract.source.json", "a\u0308", "ä"], "P01/CSS paths");
        assertPermutationInvariant(["a.b", "a/x"], "Value paths");
        assertPermutationInvariant(["𐀀", "\uE000"], "astral/BMP paths");

        const high = String.fromCharCode(0xd800);
        const low = String.fromCharCode(0xdc00);
        expectRejected(() => parseJsonStrict('"\\ud800"'), "parsed lone high surrogate value");
        expectRejected(() => parseJsonStrict('"\\udc00"'), "parsed lone low surrogate value");
        expectRejected(() => parseJsonStrict('{"\\ud800":1}'), "parsed lone surrogate key");
        expectRejected(() => canonicalize({ value: high }), "constructed lone high surrogate value");
        expectRejected(() => canonicalize({ [low]: true }), "constructed lone low surrogate key");
        expectRejected(() => parseJsonStrict('{\u00a0"value":1}'), "non-JSON NBSP whitespace");
        expectRejected(() => parseJsonStrict(Buffer.from([0xef, 0xbb, 0xbf, 0x7b, 0x7d])), "UTF-8 BOM");
        expectRejected(() => parseJsonStrict(Buffer.from([0x22, 0xc0, 0xaf, 0x22])), "overlong UTF-8");
        expectRejected(() => parseJsonStrict(Buffer.from([0x22, 0xe2, 0x82])), "truncated UTF-8");
        expectRejected(() => parseJsonStrict(Buffer.from([0x22, 0x80, 0x22])), "orphan UTF-8 continuation");
        expectRejected(() => parseJsonStrict('{"same":1,"same":2}'), "duplicate object member");
        expectRejected(() => parseJsonStrict("1e999"), "non-finite JSON number");
        const paired = String.fromCodePoint(0x10000);
        assert(canonicalize({ paired }) === `{"paired":${JSON.stringify(paired)}}`, "valid surrogate pair changed");
        assert(canonicalize(["a\u0308", "ä"]) === '["ä","ä"]', "valid Unicode was normalized");
        return {
            truth,
            permutation_sets: 4,
            invalid_unicode_rejections: 5,
            invalid_json_byte_rejections: 5,
            invalid_json_semantic_rejections: 2,
        };
    } finally {
        Object.defineProperty(String.prototype, method, {
            configurable: true,
            value: original,
            writable: true,
        });
    }
}

function toolFiles(directory) {
    return readdirSync(directory, { withFileTypes: true })
        .sort((left, right) => compareCanonicalText(left.name, right.name))
        .flatMap((entry) => entry.isDirectory()
            ? toolFiles(resolve(directory, entry.name))
            : entry.isFile() && entry.name.endsWith(".mjs") ? [resolve(directory, entry.name)] : []);
}

function assertStaticBoundary() {
    const forbidden = [
        [".", "locale", "Compare", "("].join(""),
        ["Intl", ".", "Collator"].join(""),
    ];
    const violations = toolFiles(toolsRoot).flatMap((path) => {
        const source = readFileSync(path, "utf8");
        return forbidden.filter((needle) => source.includes(needle)).map((needle) => `${relative(toolsRoot, path)}:${needle}`);
    });
    assert(violations.length === 0, `locale-sensitive canonical tooling remains: ${violations.join(", ")}`);
    return toolFiles(toolsRoot).length;
}

function assertFilesystemPermutationControls() {
    const fixture = mkdtempSync(join(tmpdir(), "vnext-canonical-order-"));
    try {
        mkdirSync(resolve(fixture, "a"));
        writeFileSync(resolve(fixture, "a", "x"), "nested\n");
        writeFileSync(resolve(fixture, "a.b"), "flat\n");
        writeFileSync(resolve(fixture, "a\u0308"), "decomposed\n");
        writeFileSync(resolve(fixture, "ä"), "composed\n");
        const normal = walkCorpusFiles(fixture);
        const reversed = walkCorpusFiles(fixture, {
            readdir: (path) => [...readdirSync(path, { withFileTypes: true })].reverse(),
        });
        assert(canonicalize(normal) === canonicalize(reversed), "raw directory order changed corpus traversal");
        const first = computeCorpusEpoch(fixture, () => normal);
        const second = computeCorpusEpoch(fixture, () => [...normal].reverse());
        assert(canonicalize(first) === canonicalize(second), "walker permutation changed corpus epoch");

        const sessionRows = [
            { agent_path: "/root/a", file: "z.jsonl", value: { id: "a" } },
            { agent_path: "/root/b", file: "a.jsonl", value: { id: "b" } },
        ];
        const projection = (rows) => canonicalize([...indexUniqueAgentSessions(rows)].map(([agentPath, value]) => ({ agentPath, id: value.id })));
        assert(projection(sessionRows) === projection([...sessionRows].reverse()), "session file order changed seat selection");
        let duplicateRejected = false;
        try {
            indexUniqueAgentSessions([...sessionRows, { agent_path: "/root/a", file: "m.jsonl", value: { id: "duplicate" } }]);
        } catch (error) {
            duplicateRejected = /duplicate session agent_path/.test(error.message);
        }
        assert(duplicateRejected, "duplicate seat agent_path was not rejected");
        return { corpus_files: normal.length, seat_permutations: 2, duplicate_seats: "rejected" };
    } finally {
        rmSync(fixture, { recursive: true });
    }
}

function localeWorker() {
    const result = runOrderControls();
    process.stdout.write(`${JSON.stringify(result)}\n`);
}

function main() {
    const staticToolFiles = assertStaticBoundary();
    const localeRuns = ["en_US.UTF-8", "sv_SE.UTF-8", "tr_TR.UTF-8"].map((locale) => {
        const run = spawnSync(process.execPath, [toolPath, "--locale-worker"], {
            encoding: "utf8",
            env: { ...process.env, LANG: locale, LC_ALL: locale },
        });
        assert(run.status === 0, `${locale}: canonical worker failed: ${run.stderr.trim()}`);
        return locale;
    });
    const filesystem = assertFilesystemPermutationControls();
    process.stdout.write(`${JSON.stringify({
        schema: "vnext-canonical-order-selftest/1",
        static_tool_files: staticToolFiles,
        locales: localeRuns,
        permutation_sets: 4,
        invalid_unicode_rejections: 5,
        invalid_json_byte_rejections: 5,
        invalid_json_semantic_rejections: 2,
        filesystem,
    }, null, 2)}\n`);
}

try {
    if (process.argv[2] === "--locale-worker" && process.argv.length === 3) localeWorker();
    else if (process.argv.length === 2) main();
    else throw new Error("usage: node selftest-canonical-order.mjs [--locale-worker]");
} catch (error) {
    process.stderr.write(`${error.message}\n`);
    process.exit(1);
}
