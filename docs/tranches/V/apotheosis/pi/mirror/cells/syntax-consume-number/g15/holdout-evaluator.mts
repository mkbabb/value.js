import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import {
    Parser,
    ParserState,
    regex,
    string,
} from "@mkbabb/parse-that/core";

type JsonObject = Record<string, any>;
type Failure = { case_id: string; assertions: string[] };

const G15 = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(G15, ...Array.from({ length: 9 }, () => ".."));
const MIRROR = path.resolve(G15, "../../..");
const EXPECTED_CANDIDATE_SET_SHA256 =
    "6b3b2057519a595b83f70b317ccc88b08b0e34d232f20feaf580409b55da0d40";
const EXPECTED_RECEIPT_SHA256 =
    "2ee93b9a8d239c9ecd6bd27762b826da69231a0bbb1b3f5def3fb7679b00dd1d";
const EXPECTED_CANDIDATE_IDS = ["h", "b", "s", "d"];

const sha256 = (input: crypto.BinaryLike): string =>
    crypto.createHash("sha256").update(input).digest("hex");

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

const invariant = (condition: unknown, message: string): asserts condition => {
    if (!condition) {
        throw new Error(message);
    }
};

const mode = (filePath: string): number => fs.statSync(filePath).mode & 0o777;

const candidateSetPath = path.join(G15, "candidate-set.json");
const candidateSetBytes = fs.readFileSync(candidateSetPath);
invariant(
    sha256(candidateSetBytes) === EXPECTED_CANDIDATE_SET_SHA256,
    "frozen candidate-set hash mismatch",
);
invariant(mode(candidateSetPath) === 0o444, "candidate-set is not mode 0444");
const candidateSet = JSON.parse(candidateSetBytes.toString("utf8"));
invariant(candidateSet.status === "SEALED_PRE_TIMING", "candidate-set status mismatch");
invariant(
    canonical(candidateSet.candidates.map((candidate: JsonObject) => candidate.id)) ===
        canonical(EXPECTED_CANDIDATE_IDS),
    "candidate order or IDs mismatch",
);

const featurePath = path.join(G15, "feature.json");
const featureBytes = fs.readFileSync(featurePath);
invariant(sha256(featureBytes) === candidateSet.feature_sha256, "feature hash mismatch");

const interfacePath = path.join(G15, "candidate.d.ts");
const interfaceBytes = fs.readFileSync(interfacePath);
const feature = JSON.parse(featureBytes.toString("utf8"));
invariant(
    sha256(interfaceBytes) === feature.candidate_interface.sha256,
    "candidate interface hash mismatch",
);

const sourceBindings = candidateSet.candidates.map((candidate: JsonObject) => {
    const sourcePath = path.resolve(REPO, candidate.path);
    invariant(
        sourcePath.startsWith(`${path.join(G15, "candidates")}${path.sep}`),
        `candidate ${candidate.id} path escapes frozen candidate directory`,
    );
    const bytes = fs.readFileSync(sourcePath);
    const text = bytes.toString("utf8");
    invariant(sha256(bytes) === candidate.sha256, `candidate ${candidate.id} hash mismatch`);
    invariant(bytes.length === candidate.bytes, `candidate ${candidate.id} byte count mismatch`);
    invariant(
        text.split("\n").length - 1 === candidate.lines,
        `candidate ${candidate.id} line count mismatch`,
    );
    invariant(mode(sourcePath) === 0o444, `candidate ${candidate.id} is not mode 0444`);
    return {
        id: candidate.id,
        path: candidate.path,
        absolutePath: sourcePath,
        sha256: candidate.sha256,
        bytes: candidate.bytes,
        lines: candidate.lines,
    };
});

const receiptPath = path.join(G15, "holdout-receipt.json");
const receiptBytes = fs.readFileSync(receiptPath);
invariant(sha256(receiptBytes) === EXPECTED_RECEIPT_SHA256, "receipt hash mismatch");
invariant(mode(receiptPath) === 0o444, "receipt is not mode 0444");
const receipt = JSON.parse(receiptBytes.toString("utf8"));

const ciphertextPath = path.join(G15, receipt.artifacts.ciphertext_path);
const ciphertextFileBytes = fs.readFileSync(ciphertextPath);
invariant(
    sha256(ciphertextFileBytes) === receipt.artifacts.ciphertext_file_sha256,
    "ciphertext file hash mismatch",
);
const ciphertext = Buffer.from(
    ciphertextFileBytes.toString("utf8").replace(/\s/g, ""),
    "base64",
);
invariant(ciphertext.length === receipt.artifacts.ciphertext_bytes, "ciphertext length mismatch");
invariant(
    sha256(ciphertext) === receipt.artifacts.ciphertext_sha256,
    "decoded ciphertext hash mismatch",
);

const aadCanonical = canonical(receipt.encryption.aad);
invariant(
    sha256(Buffer.from(aadCanonical, "utf8")) === receipt.encryption.aad_canonical_sha256,
    "AAD hash mismatch",
);
invariant(
    receipt.encryption.aad.feature_id === "SYNTAX-CONSUME-NUMBER" &&
        receipt.encryption.aad.generation === 15,
    "AAD feature identity mismatch",
);
invariant(
    receipt.encryption.aad.semantic_contract_sha256 ===
        "2112d1d17c6463c5b1e81750bdbd4de6e32dbe0a23fec3723c2d6d4a9707b2c4",
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

const keyPath = receipt.escrow.key_path;
invariant(typeof keyPath === "string" && keyPath.startsWith("/tmp/"), "escrow path mismatch");
invariant(mode(keyPath) === 0o600, "escrow key is not mode 0600");
const key = Buffer.from(fs.readFileSync(keyPath, "utf8").trim(), "hex");
invariant(key.length === 32, "escrow key length mismatch");

const decipher = crypto.createDecipheriv(
    "aes-256-gcm",
    key,
    Buffer.from(receipt.encryption.nonce_b64, "base64"),
);
decipher.setAAD(Buffer.from(aadCanonical, "utf8"), {
    plaintextLength: ciphertext.length,
});
decipher.setAuthTag(Buffer.from(receipt.encryption.auth_tag_b64, "base64"));
const plaintext = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
key.fill(0);
invariant(plaintext.length === receipt.artifacts.plaintext_bytes, "plaintext length mismatch");
invariant(sha256(plaintext) === receipt.artifacts.plaintext_sha256, "plaintext hash mismatch");
const corpus = JSON.parse(plaintext.toString("utf8"));
invariant(canonical(corpus) === plaintext.toString("utf8"), "plaintext is not canonical");
plaintext.fill(0);
invariant(corpus.total_cases === 180, "holdout case count mismatch");
invariant(
    canonical(corpus.family_counts) === canonical(receipt.corpus_summary.family_counts),
    "holdout family count mismatch",
);
invariant(
    corpus.identity.semantic_contract_sha256 ===
        receipt.encryption.aad.semantic_contract_sha256,
    "corpus semantic identity mismatch",
);

const parseThatPackagePath = path.join(
    MIRROR,
    "node_modules/@mkbabb/parse-that/package.json",
);
const tsxPackagePath = path.join(MIRROR, "node_modules/tsx/package.json");
const parseThatPackageBytes = fs.readFileSync(parseThatPackagePath);
const tsxPackageBytes = fs.readFileSync(tsxPackagePath);
const parseThatPackage = JSON.parse(parseThatPackageBytes.toString("utf8"));
const tsxPackage = JSON.parse(tsxPackageBytes.toString("utf8"));
invariant(parseThatPackage.version === "1.0.0", "parse-that runtime version mismatch");

const numberPattern = /[+-]?(?:[0-9]*\.[0-9]+|[0-9]+)(?:[Ee][+-]?[0-9]+)?/y;

const oracleAt = (source: string, offset: number): JsonObject | null => {
    numberPattern.lastIndex = offset;
    const match = numberPattern.exec(source);
    if (match === null || match.index !== offset) {
        return null;
    }
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

const check = (failures: string[], condition: unknown, code: string): void => {
    if (!condition) {
        failures.push(code);
    }
};

const parserKeys = (parser: Parser<any>): string[] =>
    Reflect.ownKeys(parser).map((key) => String(key));

const resultShapeChecks = (
    result: any,
    expected: JsonObject,
    failures: string[],
): void => {
    check(failures, result !== null && typeof result === "object", "result:not-object");
    if (result === null || typeof result !== "object") {
        return;
    }
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
    const state = new ParserState(
        testCase.input.source,
        undefined,
        testCase.input.offset,
    );
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
    if (failures.length > 0) {
        return failures;
    }
    const state = new ParserState(
        testCase.input.source,
        undefined,
        testCase.input.offset,
    );
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
    check(
        failures,
        afterDiagnostics === beforeDiagnostics,
        "transaction:ahead-diagnostics",
    );
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
            const oracle = oracleAt(input.source, input.offset);
            check(failures, oracle !== null, "repeat:oracle-precondition");
            if (oracle === null) {
                continue;
            }
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
    check(
        failures,
        context !== null && typeof context === "object",
        "introspection:context",
    );
    check(failures, before.length >= 1 && before.length <= 4096, "introspection:string-length");
    const oracle = oracleAt(testCase.input.source, testCase.input.offset);
    check(failures, oracle !== null, "introspection:oracle-precondition");
    if (oracle !== null) {
        const state = new ParserState(
            testCase.input.source,
            undefined,
            testCase.input.offset,
        );
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

const evaluateCandidate = async (binding: JsonObject): Promise<JsonObject> => {
    const loaded = await import(pathToFileURL(binding.absolutePath).href);
    const parser = loaded.consumeNumber as Parser<any>;
    invariant(parser instanceof Parser, `candidate ${binding.id} export is not a Parser`);

    let initialPrintable = "";
    let initialPrintableError: string | null = null;
    try {
        initialPrintable = parser.toString();
    } catch (error) {
        initialPrintableError = error instanceof Error ? error.name : "unknown";
    }
    const initial = {
        id: parser.id,
        context: parser.context,
        keys: parserKeys(parser),
        printable: initialPrintable,
        printableError: initialPrintableError,
    };

    const familyResults: JsonObject = {};
    const allFailures: Array<Failure & { family: string }> = [];
    for (const family of corpus.families) {
        const failures: Failure[] = [];
        const parentCache = new Map<string, Parser<any>>();
        for (const testCase of family.cases) {
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
                failures.push({ case_id: testCase.id, assertions: assertionFailures });
                allFailures.push({
                    family: family.id,
                    case_id: testCase.id,
                    assertions: assertionFailures,
                });
            }
        }
        familyResults[family.id] = {
            total: family.cases.length,
            passed: family.cases.length - failures.length,
            failed: failures.length,
            failures,
        };
    }

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
    const constructionFailed = Object.entries(constructionAssertions)
        .filter(([, passed]) => !passed)
        .map(([name]) => name);
    const passedCases = Object.values(familyResults).reduce(
        (sum: number, value: any) => sum + value.passed,
        0,
    );
    return {
        id: binding.id,
        source_sha256: binding.sha256,
        total_cases: corpus.total_cases,
        passed_cases: passedCases,
        failed_cases: allFailures.length,
        families: familyResults,
        construction_stability: {
            total: Object.keys(constructionAssertions).length,
            passed:
                Object.keys(constructionAssertions).length - constructionFailed.length,
            failed: constructionFailed.length,
            assertions: constructionAssertions,
            failures: constructionFailed,
        },
        transaction: familyResults["transaction-ahead-diagnostics"],
        parent_composition: familyResults["parent-composition"],
        introspection: familyResults["parser-introspection"],
        parser_id_growth: familyResults["no-per-call-parser-id-growth"],
        failures: allFailures,
        verdict:
            allFailures.length === 0 && constructionFailed.length === 0
                ? "PASS"
                : "FAIL",
    };
};

const perCandidate: JsonObject = {};
for (const binding of sourceBindings) {
    perCandidate[binding.id] = await evaluateCandidate(binding);
}

const allPass = EXPECTED_CANDIDATE_IDS.every(
    (id) => perCandidate[id]?.verdict === "PASS",
);
const evidence = {
    schema: "value.pi.syntax-consume-number.g15.holdout-evidence/v1",
    feature_id: "SYNTAX-CONSUME-NUMBER",
    generation: 15,
    status: allPass ? "PASS_ALL_FOUR" : "HOLDOUT_FAILURE",
    evaluation: {
        executed_at: new Date().toISOString(),
        run_count: 1,
        candidates_loaded_once_each: true,
        benchmark_timing_performed: false,
        hidden_plaintext_persisted: false,
        hidden_case_disclosure: "stable IDs only on failure",
    },
    frozen_bindings: {
        candidate_set_sha256: EXPECTED_CANDIDATE_SET_SHA256,
        candidate_set_mode: "0444",
        feature_sha256: sha256(featureBytes),
        candidate_interface_sha256: sha256(interfaceBytes),
        receipt_sha256: sha256(receiptBytes),
        ciphertext_file_sha256: sha256(ciphertextFileBytes),
        ciphertext_sha256: receipt.artifacts.ciphertext_sha256,
        plaintext_sha256: receipt.artifacts.plaintext_sha256,
        aad_sha256: receipt.encryption.aad_canonical_sha256,
        semantic_contract_sha256:
            receipt.encryption.aad.semantic_contract_sha256,
        normative_source: receipt.encryption.aad.normative_source,
        candidate_sources: sourceBindings.map(
            ({ absolutePath: _absolutePath, ...binding }: JsonObject) => binding,
        ),
    },
    runtime_bindings: {
        node: process.version,
        platform: process.platform,
        architecture: process.arch,
        parse_that: {
            package: "@mkbabb/parse-that",
            version: parseThatPackage.version,
            package_json_sha256: sha256(parseThatPackageBytes),
            import: "@mkbabb/parse-that/core",
        },
        tsx: {
            version: tsxPackage.version,
            package_json_sha256: sha256(tsxPackageBytes),
        },
    },
    corpus: {
        total_cases: corpus.total_cases,
        family_counts: corpus.family_counts,
        family_order: corpus.families.map((family: JsonObject) => family.id),
    },
    per_candidate: perCandidate,
    verdict: {
        all_candidates_pass: allPass,
        passed_candidates: EXPECTED_CANDIDATE_IDS.filter(
            (id) => perCandidate[id]?.verdict === "PASS",
        ),
        failed_candidates: EXPECTED_CANDIDATE_IDS.filter(
            (id) => perCandidate[id]?.verdict !== "PASS",
        ),
    },
    authorship_receipt: {
        role: "independent preauthor holdout custodian and post-freeze evaluator author",
        agent: "Codex",
        model_family: "OpenAI GPT-5",
        exact_provider_checkpoint_available_to_agent: false,
        runtime_surface: "Codex desktop agent",
        candidate_sources_inspected_only_after_exact_freeze_verification: true,
        hidden_corpus_decrypted_only_after_exact_freeze_verification: true,
        hidden_plaintext_or_key_persisted_in_repository: false,
        prior_g14_holdout_cases_inspected: false,
        benchmark_timing_performed: false,
    },
};

process.stdout.write(`${JSON.stringify(evidence, null, 2)}\n`);
