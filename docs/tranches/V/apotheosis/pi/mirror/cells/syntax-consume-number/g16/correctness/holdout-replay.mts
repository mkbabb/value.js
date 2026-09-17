import { createDecipheriv, createHash } from "node:crypto";
import { readFileSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";

import {
    Parser,
    ParserState,
    regex,
    string,
} from "@mkbabb/parse-that/core";

type JsonObject = Record<string, any>;
type Failure = { case_id: string; assertions: string[] };
type CssNumber = {
    sign: "+" | "-" | null;
    type: "integer" | "number";
    value: number;
};
type OracleResult = { end_offset: number; result: CssNumber };

const HERE = dirname(fileURLToPath(import.meta.url));
const G15 = resolve(HERE, "../../g15");
const G14 = resolve(HERE, "../../g14");
const MIRROR = resolve(HERE, "../../../..");
const H2_PATH = join(G15, "optimization/h2/index.ts");
const RECEIPT_PATH = join(G15, "holdout-receipt.json");
const PUBLIC_EVALUATOR_PATH = join(G14, "public-evaluator.mts");
const TSX_PATH = join(MIRROR, "node_modules/.bin/tsx");

const H2_SHA256 =
    "8c3ac689f2e24635216ac0499f23166996ac0136e0b6876e82a8da4f75eb95aa";
const RECEIPT_SHA256 =
    "2ee93b9a8d239c9ecd6bd27762b826da69231a0bbb1b3f5def3fb7679b00dd1d";
const CIPHERTEXT_FILE_SHA256 =
    "5ff5a6b3f6bd9586711ec82a8f61a155ceeced7ac499a82bb6f9d08ba6c40ffe";
const PUBLIC_EVALUATOR_SHA256 =
    "bbeeee5e7333a0105fe85c91624fc2be4c34500447bfe9dfce9de5a426b784b7";
const SEMANTIC_CONTRACT_SHA256 =
    "2112d1d17c6463c5b1e81750bdbd4de6e32dbe0a23fec3723c2d6d4a9707b2c4";

const invariant: (condition: unknown, message: string) => asserts condition = (
    condition,
    message,
) => {
    if (!condition) {
        throw new Error(message);
    }
};

const sha256 = (input: NodeJS.ArrayBufferView | string): string =>
    createHash("sha256").update(input).digest("hex");

const canonical = (value: any): string => {
    if (value === null || typeof value !== "object") {
        return JSON.stringify(value);
    }
    if (Array.isArray(value)) {
        return `[${value.map(canonical).join(",")}]`;
    }
    return `{${Object.keys(value)
        .sort()
        .map((key) => `${JSON.stringify(key)}:${canonical(value[key])}`)
        .join(",")}}`;
};

const mode = (filePath: string): number => statSync(filePath).mode & 0o777;
const check = (failures: string[], condition: unknown, code: string): void => {
    if (!condition) {
        failures.push(code);
    }
};
const parserKeys = (parser: Parser<any>): string[] =>
    Reflect.ownKeys(parser).map((key) => String(key));

const args = process.argv.slice(2);
invariant(
    args.length === 1 && args[0] === "--verify",
    "usage: holdout-replay.mts --verify",
);

// Freeze gate: the candidate is not imported until all four immutable properties pass.
const h2Bytes = readFileSync(H2_PATH);
const h2Text = h2Bytes.toString("utf8");
invariant(sha256(h2Bytes) === H2_SHA256, "H2 hash mismatch");
invariant(h2Bytes.length === 560, "H2 byte count mismatch");
invariant(!h2Text.includes("\r"), "H2 contains non-LF line endings");
invariant(h2Text.split("\n").length - 1 === 17, "H2 LF line count mismatch");
invariant(mode(H2_PATH) === 0o444, "H2 is not mode 0444");

// Authenticate the existing G15 receipt, ciphertext, AAD, and escrow key.
const receiptBytes = readFileSync(RECEIPT_PATH);
invariant(sha256(receiptBytes) === RECEIPT_SHA256, "receipt hash mismatch");
invariant(mode(RECEIPT_PATH) === 0o444, "receipt is not mode 0444");
const receipt = JSON.parse(receiptBytes.toString("utf8"));
invariant(receipt.schema === "value.pi.holdout-receipt/v2", "receipt schema mismatch");
invariant(receipt.feature_id === "SYNTAX-CONSUME-NUMBER", "receipt feature mismatch");
invariant(receipt.generation === 15, "receipt generation mismatch");
invariant(receipt.status === "SEALED_PREAUTHOR", "receipt status mismatch");
invariant(
    receipt.artifacts.ciphertext_path === "holdout-ciphertext.b64",
    "ciphertext path mismatch",
);
const ciphertextPath = join(G15, receipt.artifacts.ciphertext_path);
const ciphertextFileBytes = readFileSync(ciphertextPath);
invariant(
    sha256(ciphertextFileBytes) === CIPHERTEXT_FILE_SHA256 &&
        receipt.artifacts.ciphertext_file_sha256 === CIPHERTEXT_FILE_SHA256,
    "ciphertext file hash mismatch",
);
const ciphertext = Buffer.from(
    ciphertextFileBytes.toString("utf8").replace(/\s/g, ""),
    "base64",
);
invariant(ciphertext.length === receipt.artifacts.ciphertext_bytes, "ciphertext size mismatch");
invariant(sha256(ciphertext) === receipt.artifacts.ciphertext_sha256, "ciphertext hash mismatch");

const aadCanonical = canonical(receipt.encryption.aad);
invariant(receipt.encryption.algorithm === "AES-256-GCM", "encryption algorithm mismatch");
invariant(
    sha256(Buffer.from(aadCanonical, "utf8")) ===
        receipt.encryption.aad_canonical_sha256,
    "AAD hash mismatch",
);
invariant(
    receipt.encryption.aad.feature_id === "SYNTAX-CONSUME-NUMBER" &&
        receipt.encryption.aad.generation === 15 &&
        receipt.encryption.aad.semantic_contract_sha256 === SEMANTIC_CONTRACT_SHA256,
    "AAD semantic identity mismatch",
);
invariant(
    receipt.encryption.aad.normative_source.commit ===
        "08f2f799da6a306e8bf5daca208683717f26d643" &&
        receipt.encryption.aad.normative_source.document_sha256 ===
            "3f129d17407f9bd027291bcfb8015beb86fc229bf5efe505b49ec2dc30be4390" &&
        receipt.encryption.aad.normative_source.line_start === 1610 &&
        receipt.encryption.aad.normative_source.line_end === 1678,
    "AAD normative identity mismatch",
);

const keyPath: unknown = receipt.escrow.key_path;
invariant(
    typeof keyPath === "string" && keyPath.startsWith("/tmp/"),
    "escrow key path mismatch",
);
invariant(receipt.escrow.required_mode === "0600", "escrow mode receipt mismatch");
invariant(mode(keyPath) === 0o600, "escrow key is not mode 0600");
const keyFileBytes = readFileSync(keyPath);
invariant(/^[0-9a-f]{64}\n$/.test(keyFileBytes.toString("ascii")), "escrow key encoding mismatch");
const key = Buffer.from(keyFileBytes.toString("ascii").trim(), "hex");
keyFileBytes.fill(0);
invariant(key.length === 32, "escrow key length mismatch");
const nonce = Buffer.from(receipt.encryption.nonce_b64, "base64");
const authTag = Buffer.from(receipt.encryption.auth_tag_b64, "base64");
invariant(nonce.length === 12, "AES-GCM nonce length mismatch");
invariant(authTag.length === 16, "AES-GCM tag length mismatch");
const decipher = createDecipheriv("aes-256-gcm", key, nonce);
decipher.setAAD(Buffer.from(aadCanonical, "utf8"), {
    plaintextLength: ciphertext.length,
});
decipher.setAuthTag(authTag);
const plaintext = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
key.fill(0);
invariant(plaintext.length === receipt.artifacts.plaintext_bytes, "plaintext size mismatch");
invariant(sha256(plaintext) === receipt.artifacts.plaintext_sha256, "plaintext hash mismatch");
const plaintextText = plaintext.toString("utf8");
const corpus = JSON.parse(plaintextText);
invariant(canonical(corpus) === plaintextText, "plaintext is not canonical JSON");
plaintext.fill(0);
invariant(corpus.total_cases === 180, "holdout case count mismatch");
invariant(
    canonical(corpus.family_counts) === canonical(receipt.corpus_summary.family_counts),
    "holdout family counts mismatch",
);
invariant(
    corpus.identity.semantic_contract_sha256 === SEMANTIC_CONTRACT_SHA256,
    "holdout semantic identity mismatch",
);

// This is the sole candidate import, performed only after the immutable H2 gate passes.
const candidateModule = await import(`${pathToFileURL(H2_PATH).href}?sha256=${H2_SHA256}`);
const consumeNumber = candidateModule.consumeNumber as Parser<CssNumber>;
invariant(consumeNumber instanceof Parser, "H2 consumeNumber is not a Parser");

const expectedNumber = (encoded: JsonObject): number => {
    switch (encoded.kind) {
        case "negative-zero":
            return -0;
        case "positive-infinity":
            return Infinity;
        case "negative-infinity":
            return -Infinity;
        case "nan":
            return NaN;
        case "finite":
            return Number(encoded.javascript_string);
        default:
            throw new Error("unknown numeric encoding");
    }
};

const resultShapeChecks = (
    result: any,
    expected: CssNumber,
    failures: string[],
): void => {
    check(failures, result !== null && typeof result === "object", "result:not-object");
    if (result === null || typeof result !== "object") return;
    check(
        failures,
        canonical(Reflect.ownKeys(result).map((key) => String(key))) ===
            canonical(["sign", "type", "value"]),
        "result:own-key-order",
    );
    check(failures, Object.getPrototypeOf(result) === Object.prototype, "result:prototype");
    check(failures, result.sign === expected.sign, "result:sign");
    check(failures, result.type === expected.type, "result:type");
    check(failures, Object.is(result.value, expected.value), "result:value");
};

const runLeafSuccess = (parser: Parser<any>, testCase: JsonObject): string[] => {
    const failures: string[] = [];
    const state = new ParserState<any>(testCase.input.source, undefined, testCase.input.offset);
    let returned: ParserState<any> | undefined;
    try {
        returned = parser.call(state);
    } catch (error) {
        failures.push(`call:throw:${error instanceof Error ? error.name : "unknown"}`);
        return failures;
    }
    check(failures, returned === state, "state:return-identity");
    check(failures, state.src === testCase.input.source, "state:source");
    check(failures, state.isError === false, "state:is-error");
    check(failures, state.offset === testCase.expected.end_offset, "state:end-offset");
    resultShapeChecks(
        state.value,
        {
            sign: testCase.expected.result.sign,
            type: testCase.expected.result.type,
            value: expectedNumber(testCase.expected.result.value),
        },
        failures,
    );
    return failures;
};

const runDescriptorCase = (parser: Parser<any>, testCase: JsonObject): string[] => {
    const failures = runLeafSuccess(parser, testCase);
    if (failures.length > 0) return failures;
    const state = new ParserState<any>(testCase.input.source, undefined, testCase.input.offset);
    parser.call(state);
    const result = state.value as JsonObject;
    for (const key of ["sign", "type", "value"]) {
        const descriptor = Object.getOwnPropertyDescriptor(result, key);
        check(failures, descriptor !== undefined, `descriptor:${key}:missing`);
        if (descriptor !== undefined) {
            check(failures, "value" in descriptor, `descriptor:${key}:not-data`);
            check(failures, descriptor.enumerable === true, `descriptor:${key}:enumerable`);
            check(failures, descriptor.writable === true, `descriptor:${key}:writable`);
            check(failures, descriptor.configurable === true, `descriptor:${key}:configurable`);
        }
    }
    check(failures, Object.isExtensible(result), "result:not-extensible");
    check(failures, !Object.isFrozen(result), "result:frozen");
    try {
        result.sign = "+";
        result.type = "integer";
        result.value = 1729;
        delete result.value;
        result.value = 4104;
        result.extra = true;
    } catch (error) {
        failures.push(`result:mutation-throw:${error instanceof Error ? error.name : "unknown"}`);
    }
    check(failures, result.value === 4104 && result.extra === true, "result:mutation-effect");
    return failures;
};

const runTransactionCase = (parser: Parser<any>, testCase: JsonObject): string[] => {
    const failures: string[] = [];
    const predecessor = {
        ...testCase.input.predecessor_value_recipe,
        nested: { ...testCase.input.predecessor_value_recipe.nested },
    };
    const diagnostic = testCase.input.diagnostics;
    const state = new ParserState(
        testCase.input.source,
        predecessor,
        testCase.input.offset,
        false,
        diagnostic.furthest,
    );
    state.expected = [...diagnostic.expected];
    state.suggestions = diagnostic.suggestions.map((value: JsonObject) => ({ ...value }));
    state.secondarySpans = diagnostic.secondarySpans.map((value: JsonObject) => ({ ...value }));
    const beforeDiagnostics = canonical({
        furthest: state.furthest,
        expected: state.expected,
        suggestions: state.suggestions,
        secondarySpans: state.secondarySpans,
    });
    let returned: ParserState<any> | undefined;
    try {
        returned = parser.call(state);
    } catch (error) {
        failures.push(`call:throw:${error instanceof Error ? error.name : "unknown"}`);
        return failures;
    }
    check(failures, returned === state, "state:return-identity");
    check(failures, state.src === testCase.input.source, "transaction:source");
    check(failures, state.offset === testCase.input.offset, "transaction:offset");
    check(failures, state.value === predecessor, "transaction:value-identity");
    check(failures, state.isError === true, "transaction:is-error");
    const afterDiagnostics = canonical({
        furthest: state.furthest,
        expected: state.expected,
        suggestions: state.suggestions,
        secondarySpans: state.secondarySpans,
    });
    check(failures, afterDiagnostics === beforeDiagnostics, "transaction:ahead-diagnostics");
    return failures;
};

const runHostileFailure = (parser: Parser<any>, testCase: JsonObject): string[] => {
    const failures: string[] = [];
    const predecessor = { hostile: testCase.id };
    const state = new ParserState(testCase.input.source, predecessor, testCase.input.offset);
    try {
        parser.call(state);
    } catch (error) {
        failures.push(`call:throw:${error instanceof Error ? error.name : "unknown"}`);
        return failures;
    }
    check(failures, state.src === testCase.input.source, "hostile:source");
    check(failures, state.offset === testCase.input.offset, "hostile:offset");
    check(failures, state.value === predecessor, "hostile:value-identity");
    check(failures, state.isError === true, "hostile:is-error");
    return failures;
};

const makeParent = (parser: Parser<any>, testCase: JsonObject): Parser<any> => {
    switch (testCase.parent.kind) {
        case "percentage":
            return parser.skip(string("%")).eof();
        case "dimension":
            return parser.then(regex(new RegExp(testCase.parent.unit_pattern))).eof();
        case "integer-only": {
            const accept = string("");
            const reject = regex(/(?!)x/);
            return parser
                .chain((value: JsonObject) =>
                    value.type === "integer" ? accept : reject,
                )
                .eof();
        }
        case "delimited":
            return parser.skip(string(testCase.parent.delimiter)).eof();
        default:
            throw new Error("unknown parent kind");
    }
};

const runParentCase = (parent: Parser<any>, testCase: JsonObject): string[] => {
    const failures: string[] = [];
    const state = new ParserState(testCase.input.source);
    try {
        parent.call(state);
    } catch (error) {
        failures.push(`parent:throw:${error instanceof Error ? error.name : "unknown"}`);
        return failures;
    }
    const accepted = state.isError === false && state.offset === testCase.input.source.length;
    check(failures, accepted === testCase.expected.accept, "parent:accept-reject");
    check(failures, state.src === testCase.input.source, "parent:source");
    return failures;
};

// G15 used a regex oracle for repeat/introspection preconditions. Reproduce it here exactly;
// the independent assay below uses an unrelated imperative scanner.
const g15NumberPattern = /[+-]?(?:[0-9]*\.[0-9]+|[0-9]+)(?:[Ee][+-]?[0-9]+)?/y;
const g15OracleAt = (source: string, offset: number): OracleResult | null => {
    g15NumberPattern.lastIndex = offset;
    const match = g15NumberPattern.exec(source);
    if (match === null || match.index !== offset) return null;
    const representation = match[0];
    return {
        end_offset: offset + representation.length,
        result: {
            sign:
                representation[0] === "+" || representation[0] === "-"
                    ? representation[0]
                    : null,
            type: /[.eE]/.test(representation) ? "number" : "integer",
            value: Number(representation),
        },
    };
};

const signature = (state: ParserState<any>): string => {
    const value = state.value;
    return canonical({
        isError: state.isError,
        offset: state.offset,
        keys:
            value !== null && typeof value === "object"
                ? Reflect.ownKeys(value).map((key) => String(key))
                : [],
        sign: value?.sign,
        type: value?.type,
        value:
            value !== null && typeof value === "object"
                ? Object.is(value.value, -0)
                    ? "-0"
                    : String(value.value)
                : String(value),
    });
};

const runRepeatedCase = (parser: Parser<any>, testCase: JsonObject): string[] => {
    const failures: string[] = [];
    const id = parser.id;
    const context = parser.context;
    const keys = parserKeys(parser);
    let printable: string;
    try {
        printable = parser.toString();
    } catch (error) {
        failures.push(`introspection:to-string-throw:${error instanceof Error ? error.name : "unknown"}`);
        return failures;
    }
    const first = new Map<string, string>();
    const resultIdentities = new Set<object>();
    for (let round = 0; round < testCase.rounds; round += 1) {
        for (const input of testCase.sequence) {
            const oracle = g15OracleAt(input.source, input.offset);
            check(failures, oracle !== null, "repeat:oracle-precondition");
            if (oracle === null) continue;
            const state = new ParserState(input.source, undefined, input.offset);
            try {
                parser.call(state);
            } catch (error) {
                failures.push(`repeat:throw:${error instanceof Error ? error.name : "unknown"}`);
                continue;
            }
            check(failures, state.isError === false, "repeat:is-error");
            check(failures, state.offset === oracle.end_offset, "repeat:end-offset");
            resultShapeChecks(state.value, oracle.result, failures);
            if (state.value !== null && typeof state.value === "object") {
                check(failures, !resultIdentities.has(state.value), "repeat:result-reused");
                resultIdentities.add(state.value);
            }
            const inputKey = `${input.offset}:${input.source}`;
            const current = signature(state);
            if (first.has(inputKey)) {
                check(failures, first.get(inputKey) === current, "repeat:unstable-result");
            } else {
                first.set(inputKey, current);
            }
        }
    }
    check(failures, parser.id === id, "repeat:parser-id");
    check(failures, parser.context === context, "repeat:parser-context");
    check(failures, canonical(parserKeys(parser)) === canonical(keys), "repeat:parser-keys");
    try {
        check(failures, parser.toString() === printable, "repeat:to-string-stability");
    } catch (error) {
        failures.push(`repeat:to-string-throw:${error instanceof Error ? error.name : "unknown"}`);
    }
    return [...new Set(failures)];
};

const runIntrospectionCase = (parser: Parser<any>, testCase: JsonObject): string[] => {
    const failures: string[] = [];
    const id = parser.id;
    const context = parser.context;
    const keys = parserKeys(parser);
    let before = "";
    try {
        before = parser.toString();
    } catch (error) {
        failures.push(`introspection:to-string-throw:${error instanceof Error ? error.name : "unknown"}`);
        return failures;
    }
    check(failures, parser instanceof Parser, "introspection:not-parser");
    check(failures, Number.isSafeInteger(id) && id >= 0, "introspection:id");
    check(failures, context !== null && typeof context === "object", "introspection:context");
    check(failures, before.length >= 1 && before.length <= 4096, "introspection:string-length");
    const oracle = g15OracleAt(testCase.input.source, testCase.input.offset);
    check(failures, oracle !== null, "introspection:oracle-precondition");
    if (oracle !== null) {
        const state = new ParserState(testCase.input.source, undefined, testCase.input.offset);
        try {
            parser.call(state);
            check(failures, state.isError === false, "introspection:call-error");
            check(failures, state.offset === oracle.end_offset, "introspection:end-offset");
            resultShapeChecks(state.value, oracle.result, failures);
        } catch (error) {
            failures.push(`introspection:call-throw:${error instanceof Error ? error.name : "unknown"}`);
        }
    }
    check(failures, parser.id === id, "introspection:id-stability");
    check(failures, parser.context === context, "introspection:context-stability");
    check(failures, canonical(parserKeys(parser)) === canonical(keys), "introspection:key-stability");
    try {
        const after = parser.toString();
        check(failures, after === before, "introspection:string-stability");
        check(failures, parser.toString() === after, "introspection:string-repeat");
    } catch (error) {
        failures.push(`introspection:after-to-string-throw:${error instanceof Error ? error.name : "unknown"}`);
    }
    return [...new Set(failures)];
};

const runIdGrowthCase = (parser: Parser<any>, testCase: JsonObject): string[] => {
    const failures: string[] = [];
    const candidateId = parser.id;
    const before = new Parser((state) => state);
    for (let index = 0; index < testCase.calls; index += 1) {
        const input = testCase.input_cycle[index % testCase.input_cycle.length];
        const state = new ParserState(input.source, undefined, input.offset);
        try {
            parser.call(state);
        } catch (error) {
            failures.push(`id-growth:call-throw:${error instanceof Error ? error.name : "unknown"}`);
            break;
        }
    }
    const after = new Parser((state) => state);
    check(failures, after.id - before.id === 1, "id-growth:per-call-parser-allocation");
    check(failures, parser.id === candidateId, "id-growth:candidate-id");
    return failures;
};

const evaluateHoldout = (parser: Parser<any>): JsonObject => {
    const initial = {
        id: parser.id,
        context: parser.context,
        keys: parserKeys(parser),
        printable: "",
        printableError: null as string | null,
    };
    try {
        initial.printable = parser.toString();
    } catch (error) {
        initial.printableError = error instanceof Error ? error.name : "unknown";
    }
    const familyResults: JsonObject = {};
    const allFailures: Array<Failure & { family: string }> = [];
    let executed = 0;
    for (const family of corpus.families) {
        const failures: Failure[] = [];
        const parentCache = new Map<string, Parser<any>>();
        for (const testCase of family.cases) {
            executed += 1;
            let assertionFailures: string[];
            try {
                switch (testCase.mode) {
                    case "leaf-success":
                    case "hostile-leaf-success":
                        assertionFailures = runLeafSuccess(parser, testCase);
                        break;
                    case "leaf-success-object-contract":
                        assertionFailures = runDescriptorCase(parser, testCase);
                        break;
                    case "leaf-failure-transaction":
                        assertionFailures = runTransactionCase(parser, testCase);
                        break;
                    case "hostile-leaf-failure":
                        assertionFailures = runHostileFailure(parser, testCase);
                        break;
                    case "synthetic-parent": {
                        const cacheKey = canonical(testCase.parent);
                        let parent = parentCache.get(cacheKey);
                        if (parent === undefined) {
                            parent = makeParent(parser, testCase);
                            parentCache.set(cacheKey, parent);
                        }
                        assertionFailures = runParentCase(parent, testCase);
                        break;
                    }
                    case "repeat-fresh-states":
                        assertionFailures = runRepeatedCase(parser, testCase);
                        break;
                    case "parser-introspection":
                        assertionFailures = runIntrospectionCase(parser, testCase);
                        break;
                    case "parser-id-allocation-sentinel":
                        assertionFailures = runIdGrowthCase(parser, testCase);
                        break;
                    default:
                        assertionFailures = ["evaluator:unknown-mode"];
                }
            } catch (error) {
                assertionFailures = [
                    `evaluator:exception:${error instanceof Error ? error.name : "unknown"}`,
                ];
            }
            assertionFailures = [...new Set(assertionFailures)];
            if (assertionFailures.length > 0) {
                const failure = { case_id: testCase.id, assertions: assertionFailures };
                failures.push(failure);
                allFailures.push({ family: family.id, ...failure });
            }
        }
        familyResults[family.id] = {
            total: family.cases.length,
            passed: family.cases.length - failures.length,
            failed: failures.length,
        };
    }
    invariant(executed === corpus.total_cases, "not all holdout cases executed");
    let finalPrintable = "";
    let finalPrintableError: string | null = null;
    try {
        finalPrintable = parser.toString();
    } catch (error) {
        finalPrintableError = error instanceof Error ? error.name : "unknown";
    }
    const constructionAssertions: Record<string, boolean> = {
        exported_parser_instance: parser instanceof Parser,
        id_safe_integer: Number.isSafeInteger(initial.id) && initial.id >= 0,
        id_stable: parser.id === initial.id,
        context_object: initial.context !== null && typeof initial.context === "object",
        context_identity_stable: parser.context === initial.context,
        own_keys_stable: canonical(parserKeys(parser)) === canonical(initial.keys),
        to_string_non_throwing:
            initial.printableError === null && finalPrintableError === null,
        to_string_nonempty: initial.printable.length > 0,
        to_string_stable: initial.printable === finalPrintable,
    };
    const constructionFailures = Object.entries(constructionAssertions)
        .filter(([, passed]) => !passed)
        .map(([name]) => name);
    invariant(
        allFailures.length === 0 && constructionFailures.length === 0,
        `holdout failure ${canonical({ cases: allFailures, construction: constructionFailures })}`,
    );
    return {
        total_cases: executed,
        family_counts: corpus.family_counts,
        families: familyResults,
        construction_assertions: Object.keys(constructionAssertions).length,
    };
};

const holdoutResult = evaluateHoldout(consumeNumber);

// Independent, imperative test oracle. It is deliberately not production grammar.
const isDigit = (code: number): boolean => code >= 0x30 && code <= 0x39;
const scannerOracleAt = (source: string, offset: number): OracleResult | null => {
    if (!Number.isInteger(offset) || offset < 0 || offset > source.length) return null;
    let cursor = offset;
    const signCode = source.charCodeAt(cursor);
    if (signCode === 0x2b || signCode === 0x2d) cursor += 1;
    let integerDigits = 0;
    while (isDigit(source.charCodeAt(cursor))) {
        integerDigits += 1;
        cursor += 1;
    }
    let fraction = false;
    if (source.charCodeAt(cursor) === 0x2e && isDigit(source.charCodeAt(cursor + 1))) {
        fraction = true;
        cursor += 2;
        while (isDigit(source.charCodeAt(cursor))) cursor += 1;
    } else if (integerDigits === 0) {
        return null;
    }
    const exponentMarker = source.charCodeAt(cursor);
    let exponent = false;
    if (exponentMarker === 0x45 || exponentMarker === 0x65) {
        let probe = cursor + 1;
        const exponentSign = source.charCodeAt(probe);
        if (exponentSign === 0x2b || exponentSign === 0x2d) probe += 1;
        const exponentStart = probe;
        while (isDigit(source.charCodeAt(probe))) probe += 1;
        if (probe > exponentStart) {
            exponent = true;
            cursor = probe;
        }
    }
    const representation = source.slice(offset, cursor);
    return {
        end_offset: cursor,
        result: {
            sign:
                representation[0] === "+" || representation[0] === "-"
                    ? representation[0]
                    : null,
            type: fraction || exponent ? "number" : "integer",
            value: Number(representation),
        },
    };
};

const assayFailures: string[] = [];
let assayCalls = 0;
let assaySuccesses = 0;
let assayFailuresExpected = 0;
const runAssayCase = (label: string, source: string, offset: number): void => {
    assayCalls += 1;
    const expected = scannerOracleAt(source, offset);
    const prior = { label, nested: { stable: true } };
    const state = new ParserState(source, prior, offset, false, source.length + 32);
    state.expected = ["preexisting-ahead"];
    state.suggestions = [{ kind: "trailing-content", message: "stable" }];
    state.secondarySpans = [{ offset: source.length + 1, label: "stable" }];
    const diagnostics = canonical({
        furthest: state.furthest,
        expected: state.expected,
        suggestions: state.suggestions,
        secondarySpans: state.secondarySpans,
    });
    let returned: ParserState<any> | undefined;
    try {
        returned = consumeNumber.call(state as unknown as ParserState<CssNumber>);
    } catch (error) {
        assayFailures.push(`${label}:throw:${error instanceof Error ? error.name : "unknown"}`);
        return;
    }
    check(assayFailures, returned === state, `${label}:return-identity`);
    check(assayFailures, state.src === source, `${label}:source`);
    if (expected === null) {
        assayFailuresExpected += 1;
        check(assayFailures, state.isError === true, `${label}:failure-state`);
        check(assayFailures, state.offset === offset, `${label}:failure-offset`);
        check(assayFailures, state.value === prior, `${label}:failure-value`);
        check(
            assayFailures,
            canonical({
                furthest: state.furthest,
                expected: state.expected,
                suggestions: state.suggestions,
                secondarySpans: state.secondarySpans,
            }) === diagnostics,
            `${label}:ahead-diagnostics`,
        );
        return;
    }
    assaySuccesses += 1;
    check(assayFailures, state.isError === false, `${label}:success-state`);
    check(assayFailures, state.offset === expected.end_offset, `${label}:success-offset`);
    resultShapeChecks(state.value, expected.result, assayFailures);
    for (const key of ["sign", "type", "value"]) {
        const descriptor =
            state.value !== null && typeof state.value === "object"
                ? Object.getOwnPropertyDescriptor(state.value, key)
                : undefined;
        check(assayFailures, descriptor !== undefined, `${label}:descriptor:${key}`);
        if (descriptor !== undefined) {
            check(
                assayFailures,
                descriptor.enumerable === true &&
                    descriptor.configurable === true &&
                    descriptor.writable === true &&
                    "value" in descriptor,
                `${label}:descriptor-flags:${key}`,
            );
        }
    }
    check(assayFailures, Object.isExtensible(state.value), `${label}:extensible`);
};

const shortAlphabet = ["+", "-", ".", "0", "1", "e", "E", "x"];
const shortInputs: string[] = [""];
let frontier = [""];
for (let length = 1; length <= 4; length += 1) {
    const next: string[] = [];
    for (const prefix of frontier) {
        for (const symbol of shortAlphabet) next.push(prefix + symbol);
    }
    shortInputs.push(...next);
    frontier = next;
}
let exhaustiveCalls = 0;
for (let inputIndex = 0; inputIndex < shortInputs.length; inputIndex += 1) {
    const source = shortInputs[inputIndex]!;
    for (let offset = 0; offset <= source.length; offset += 1) {
        runAssayCase(`short/${inputIndex}/${offset}`, source, offset);
        exhaustiveCalls += 1;
    }
}
const offsetPrefixes = ["", "x", "😀"];
const offsetSuffixes = ["", "x", "😀"];
let contextCalls = 0;
for (let inputIndex = 0; inputIndex < shortInputs.length; inputIndex += 1) {
    const core = shortInputs[inputIndex]!;
    for (let prefixIndex = 0; prefixIndex < offsetPrefixes.length; prefixIndex += 1) {
        const prefix = offsetPrefixes[prefixIndex]!;
        for (let suffixIndex = 0; suffixIndex < offsetSuffixes.length; suffixIndex += 1) {
            const suffix = offsetSuffixes[suffixIndex]!;
            runAssayCase(
                `context/${inputIndex}/${prefixIndex}/${suffixIndex}`,
                `${prefix}${core}${suffix}`,
                prefix.length,
            );
            contextCalls += 1;
        }
    }
}

const incompleteCases = [
    "1.",
    "+1.",
    "-.5e",
    "-.5e+",
    "-.5e-",
    "1e",
    "1e+",
    "1e-",
    "1E+x",
    "+.5E-",
    ".",
    "+.",
];
for (let index = 0; index < incompleteCases.length; index += 1) {
    runAssayCase(`incomplete/${index}`, incompleteCases[index]!, 0);
}
const repeatedFractionCases = [
    "1.2.3",
    ".1.2",
    "+01.02.03e4",
    "1..2",
    "-0.0.0E+2",
    "x1.25.50%",
];
for (let index = 0; index < repeatedFractionCases.length; index += 1) {
    const source = repeatedFractionCases[index]!;
    runAssayCase(`repeated-fraction/${index}`, source, source.startsWith("x") ? 1 : 0);
}
const utf16Cases: Array<[string, number]> = [
    ["😀+1.5x", 2],
    ["x😀-.25E+2%", 3],
    ["\ud83d1e+", 1],
    ["\udc001.2.3", 1],
    ["😀.", 2],
    ["😀e1", 1],
];
for (let index = 0; index < utf16Cases.length; index += 1) {
    const [source, offset] = utf16Cases[index]!;
    runAssayCase(`utf16/${index}`, source, offset);
}
const hostileCases = [
    "+".repeat(200_000),
    ".".repeat(200_000),
    "e".repeat(200_000),
    `${"9".repeat(200_000)}x`,
    "1.".repeat(100_000),
    `${"😀".repeat(50_000)}+1`,
];
for (let index = 0; index < hostileCases.length; index += 1) {
    const source = hostileCases[index]!;
    runAssayCase(`hostile/${index}`, source, 0);
}

const repeatedSequence: Array<[string, number]> = [
    ["1", 0],
    ["+01.25e-2x", 0],
    ["😀-.0E+9%", 2],
    ["1.2.3", 0],
];
const repeatedId = consumeNumber.id;
const repeatedContext = consumeNumber.context;
const repeatedKeys = canonical(parserKeys(consumeNumber));
const repeatedPrintable = consumeNumber.toString();
const repeatedSignatures = new Map<string, string>();
const repeatedIdentities = new Set<object>();
const idSentinelBefore = new Parser((state) => state);
let repeatedCalls = 0;
for (let round = 0; round < 32; round += 1) {
    for (let index = 0; index < repeatedSequence.length; index += 1) {
        const [source, offset] = repeatedSequence[index]!;
        const expected = scannerOracleAt(source, offset);
        invariant(expected !== null, "repeated assay oracle precondition failed");
        const state = new ParserState<any>(source, undefined, offset);
        consumeNumber.call(state);
        repeatedCalls += 1;
        check(assayFailures, !state.isError, `repeat/${index}:state`);
        check(assayFailures, state.offset === expected.end_offset, `repeat/${index}:offset`);
        resultShapeChecks(state.value, expected.result, assayFailures);
        if (state.value !== null && typeof state.value === "object") {
            check(
                assayFailures,
                !repeatedIdentities.has(state.value),
                `repeat/${index}:result-identity`,
            );
            repeatedIdentities.add(state.value);
        }
        const key = `${offset}:${source}`;
        const current = signature(state);
        if (repeatedSignatures.has(key)) {
            check(
                assayFailures,
                repeatedSignatures.get(key) === current,
                `repeat/${index}:signature`,
            );
        } else {
            repeatedSignatures.set(key, current);
        }
    }
}
const idSentinelAfter = new Parser((state) => state);
check(assayFailures, idSentinelAfter.id - idSentinelBefore.id === 1, "assay:parser-id-growth");
check(assayFailures, consumeNumber.id === repeatedId, "assay:parser-id-stability");
check(assayFailures, consumeNumber.context === repeatedContext, "assay:context-stability");
check(assayFailures, canonical(parserKeys(consumeNumber)) === repeatedKeys, "assay:keys-stability");
check(assayFailures, consumeNumber.toString() === repeatedPrintable, "assay:print-stability");
invariant(
    assayFailures.length === 0,
    `scanner assay failure ${canonical([...new Set(assayFailures)].slice(0, 100))}`,
);

// Run the exact frozen public evaluator in a separate process against the same exact H2 path.
const publicEvaluatorBytes = readFileSync(PUBLIC_EVALUATOR_PATH);
invariant(
    sha256(publicEvaluatorBytes) === PUBLIC_EVALUATOR_SHA256,
    "public evaluator hash mismatch",
);
invariant(mode(PUBLIC_EVALUATOR_PATH) === 0o444, "public evaluator is not mode 0444");
const publicRun = spawnSync(
    TSX_PATH,
    [PUBLIC_EVALUATOR_PATH, "--candidate", H2_PATH],
    { cwd: MIRROR, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] },
);
invariant(publicRun.error === undefined, `public evaluator spawn failed: ${String(publicRun.error)}`);
invariant(
    publicRun.status === 0,
    `public evaluator failed: ${publicRun.stderr.trim() || "nonzero exit"}`,
);
const publicResult = JSON.parse(publicRun.stdout.trim());
invariant(
    publicResult.schema === "value.pi.syntax-consume-number.g14.public-result/v1" &&
        publicResult.status === "PASS",
    "public evaluator result mismatch",
);

const output = {
    schema: "value.pi.syntax-consume-number.g16.correctness-result/v1",
    status: "PASS",
    subject: {
        id: "h2",
        sha256: H2_SHA256,
        bytes: 560,
        lf_lines: 17,
        mode: "0444",
    },
    holdout: {
        receipt_sha256: RECEIPT_SHA256,
        ciphertext_file_sha256: CIPHERTEXT_FILE_SHA256,
        total_cases: holdoutResult.total_cases,
        family_counts: holdoutResult.family_counts,
        families: holdoutResult.families,
        construction_assertions: holdoutResult.construction_assertions,
        status: "PASS",
    },
    public: {
        evaluator_sha256: PUBLIC_EVALUATOR_SHA256,
        result: publicResult,
    },
    independent_assay: {
        oracle: "imperative scanner, test-only, not grammar",
        short_inputs: shortInputs.length,
        exhaustive_offset_calls: exhaustiveCalls,
        wrapped_context_calls: contextCalls,
        incomplete_decimal_exponent_calls: incompleteCases.length,
        repeated_fraction_calls: repeatedFractionCases.length,
        utf16_calls: utf16Cases.length,
        long_hostile_calls: hostileCases.length,
        repeated_calls: repeatedCalls,
        total_calls: assayCalls + repeatedCalls,
        successes: assaySuccesses + repeatedCalls,
        expected_transactional_failures: assayFailuresExpected,
        result_descriptor_checks: true,
        parser_id_stable: true,
        per_call_parser_id_growth: false,
        status: "PASS",
    },
    evidence_scope:
        "The corpus is regression evidence applied after candidate freeze; no cryptographically isolated author-access claim is made or needed.",
    controls: {
        verify_only: true,
        benchmark_timing_performed: false,
        candidate_or_source_mutated: false,
        active_integration_performed: false,
        secret_plaintext_or_key_persisted: false,
        evidence_json_written: false,
    },
};

process.stdout.write(`${JSON.stringify(output)}\n`);
