import { createDecipheriv, createHash } from "node:crypto";
import {
    chmodSync,
    existsSync,
    readFileSync,
    statSync,
    writeFileSync,
} from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { Parser, ParserState, regex, string } from "@mkbabb/parse-that/core";

type Sign = "+" | "-" | null;
type NumberType = "integer" | "number";
type CssNumber = { sign: Sign; type: NumberType; value: number };
type Seat = "h" | "b" | "s" | "d";
type SeatStats = {
    case_count: number;
    success_cases: number;
    failure_cases: number;
    ordinary_failure_cases: number;
    ahead_failure_cases: number;
    parent_cases: number;
    parent_accepts: number;
    parent_rejects: number;
    hostile_cases: number;
};

const here = dirname(fileURLToPath(import.meta.url));
const fail = (message: string): never => { throw new Error(message); };
const assert = (condition: unknown, message: string): asserts condition => {
    if (!condition) fail(message);
};
const bytes = (relativePath: string): Buffer => readFileSync(resolve(here, relativePath));
const json = (relativePath: string): any => JSON.parse(bytes(relativePath).toString("utf8"));
const digest = (value: string | Uint8Array): string => createHash("sha256").update(value).digest("hex");
const fileDigest = (relativePath: string): string => digest(bytes(relativePath));
const mode = (relativePath: string): string => (statSync(resolve(here, relativePath)).mode & 0o777).toString(8).padStart(4, "0");
const canonical = (value: any): string => JSON.stringify(sortForCanonicalJson(value));

function sortForCanonicalJson(value: any): any {
    if (Array.isArray(value)) return value.map(sortForCanonicalJson);
    if (value !== null && typeof value === "object") {
        const result: Record<string, unknown> = {};
        for (const key of Object.keys(value).sort()) result[key] = sortForCanonicalJson(value[key]);
        return result;
    }
    return value;
}

const same = (label: string, actual: unknown, expected: unknown) => {
    assert(canonical(actual) === canonical(expected), `${label} join mismatch`);
};
const expectHash = (relativePath: string, expected: string) => {
    const actual = fileDigest(relativePath);
    assert(actual === expected, `${relativePath} SHA-256 mismatch: ${actual}`);
};
const expectMode = (relativePath: string, expected = "0444") => {
    const actual = mode(relativePath);
    assert(actual === expected, `${relativePath} mode mismatch: ${actual}`);
};

const FIXED_HASHES = {
    "feature.json": "266df7a5994fd7a75cb7bb2eee2fbcee02d38320ae0dde265727c6737626dc29",
    "public-evaluator.mts": "bbeeee5e7333a0105fe85c91624fc2be4c34500447bfe9dfce9de5a426b784b7",
    "holdout-receipt.json": "787f2543f4046ed71669daa55ca03af65a269f320f4f9891d22adab8da127e0e",
    "candidate-set.json": "e2f786bb2e190da3c45e9f6396ffb98bad652772de12c6c047519d48c4fda5e6",
    "holdout-recovery-ciphertext.b64": "3c2dcf58cc2cfc351399acfeefff56065b33a68c38400eece6f03a7d9460ebae",
    "holdout-recovery-reveal.json": "337a11ca21e39004e4381e5052298e5f9df2c7ffa87990b3c811ea55a2800038",
} as const;
const FAMILY_COUNTS = {
    "bounded-hostile-strings": 5,
    "incomplete-decimal-exponent-suffixes": 10,
    "maximal-prefix-repeated-fractions": 6,
    "ordinary-mutable-result-descriptors": 3,
    "parent-composition": 15,
    "signed-zero-extreme-conversion": 10,
    "transactional-failures": 8,
    "utf16-nonzero-offsets": 4,
} as const;
const SEATS: Seat[] = ["h", "b", "s", "d"];
const MAX_GENERATED_UTF16_LENGTH = 8193;

assert(process.argv.length === 2, "usage: node holdout-evaluator.mts");
assert(!existsSync(resolve(here, "holdout-evidence.json")), "holdout-evidence.json already exists; refusing to overwrite");
expectMode("holdout-evaluator.mts");
const evaluatorSha256 = fileDigest("holdout-evaluator.mts");

for (const [relativePath, expected] of Object.entries(FIXED_HASHES)) {
    expectHash(relativePath, expected);
    expectMode(relativePath);
}

const feature = json("feature.json");
const receipt = json("holdout-receipt.json");
const candidateSet = json("candidate-set.json");
const reveal = json("holdout-recovery-reveal.json");
const manifest = json("fixtures/manifest.json");

assert(feature.feature_id === "SYNTAX-CONSUME-NUMBER" && feature.generation === 14, "feature identity mismatch");
assert(receipt.feature_id === feature.feature_id && receipt.generation === feature.generation, "receipt identity join mismatch");
assert(candidateSet.feature_id === feature.feature_id && candidateSet.generation === feature.generation, "candidate-set identity join mismatch");
assert(reveal.feature_id === feature.feature_id && reveal.generation === feature.generation, "reveal identity join mismatch");

const receiptAuthorityPaths = ["feature.json", "candidate.d.ts", "fixtures/manifest.json", "fixtures/repairs.json", "public-evaluator.mts"];
for (const relativePath of receiptAuthorityPaths) {
    const claim = receipt.authority[relativePath];
    assert(claim && typeof claim.sha256 === "string", `missing receipt authority for ${relativePath}`);
    expectHash(relativePath, claim.sha256);
    expectMode(relativePath, claim.mode);
}
assert(feature.candidate_interface.sha256 === receipt.authority["candidate.d.ts"].sha256, "feature/interface receipt join mismatch");
assert(feature.fixtures.manifest.sha256 === receipt.authority["fixtures/manifest.json"].sha256, "feature/manifest receipt join mismatch");
assert(manifest.repairs.sha256 === receipt.authority["fixtures/repairs.json"].sha256, "manifest/repairs receipt join mismatch");
const baseRelativePath = `fixtures/${manifest.base.path}`;
expectHash(baseRelativePath, manifest.base.sha256);
expectMode(baseRelativePath);

same("candidate-set authority", candidateSet.authority, {
    feature_sha256: FIXED_HASHES["feature.json"],
    public_evaluator_sha256: FIXED_HASHES["public-evaluator.mts"],
    holdout_receipt_sha256: FIXED_HASHES["holdout-receipt.json"],
});
assert(candidateSet.status === "SEALED_PRE_REVEAL_ZERO_CREDIT", "candidate-set status mismatch");
assert(candidateSet.public_replay.status === "PASS_ALL_FOUR", "candidate-set public replay was not all-pass");

const candidateAuthority: Record<Seat, { path: string; sha256: string; bytes: number; lines: number; mode: string; topology: string }> = {} as any;
for (const seat of SEATS) {
    const setClaim = candidateSet.candidates[seat];
    const revealClaim = reveal.candidate_freeze.candidates[seat];
    const relativePath = `candidates/${seat}/index.ts`;
    assert(setClaim && revealClaim, `missing candidate claim for seat ${seat}`);
    assert(revealClaim.path === relativePath, `seat ${seat} reveal path mismatch`);
    assert(setClaim.sha256 === revealClaim.sha256 && setClaim.mode === revealClaim.mode, `seat ${seat} candidate/reveal join mismatch`);
    expectHash(relativePath, setClaim.sha256);
    expectMode(relativePath, setClaim.mode);
    const sourceBytes = bytes(relativePath);
    assert(sourceBytes.byteLength === setClaim.bytes, `seat ${seat} byte count mismatch`);
    assert(sourceBytes.reduce((count, octet) => count + (octet === 10 ? 1 : 0), 0) === setClaim.lines, `seat ${seat} line count mismatch`);
    candidateAuthority[seat] = { path: relativePath, sha256: setClaim.sha256, bytes: setClaim.bytes, lines: setClaim.lines, mode: setClaim.mode, topology: setClaim.topology };
}
same("reveal candidate-set freeze", reveal.candidate_freeze.candidate_set, {
    path: "candidate-set.json",
    sha256: FIXED_HASHES["candidate-set.json"],
    mode: "0444",
});

function decodeBase64Frame(relativePath: string): { file: Buffer; frame: Buffer; ciphertext: Buffer; nonce: Buffer; tag: Buffer } {
    const file = bytes(relativePath);
    assert(file.at(-1) === 10 && !file.subarray(0, -1).includes(10), `${relativePath} must contain one terminal LF`);
    const encoded = file.subarray(0, -1).toString("ascii");
    const frame = Buffer.from(encoded, "base64");
    assert(frame.toString("base64") === encoded, `${relativePath} is not canonical standard base64`);
    assert(frame.byteLength >= 36, `${relativePath} frame is truncated`);
    return { file, frame, ciphertext: frame.subarray(20, -16), nonce: frame.subarray(8, 20), tag: frame.subarray(-16) };
}

const originalFrame = decodeBase64Frame("holdout-ciphertext.b64");
const originalClaim = receipt.sealed_artifact;
expectMode("holdout-ciphertext.b64", originalClaim.mode);
assert(digest(originalFrame.file) === originalClaim.file_sha256 && originalFrame.file.byteLength === originalClaim.file_bytes, "original ciphertext file commitment mismatch");
assert(digest(originalFrame.frame) === originalClaim.frame_sha256 && originalFrame.frame.byteLength === originalClaim.frame_bytes, "original frame commitment mismatch");
assert(digest(originalFrame.ciphertext) === originalClaim.ciphertext_sha256 && originalFrame.ciphertext.byteLength === originalClaim.ciphertext_bytes, "original ciphertext commitment mismatch");
assert(originalFrame.frame.subarray(0, 8).toString("ascii") === "VPG14H01", "original frame magic mismatch");
assert(originalFrame.nonce.toString("hex") === receipt.encryption.nonce_hex, "original nonce join mismatch");
assert(originalFrame.tag.toString("hex") === receipt.encryption.authentication_tag_hex, "original authentication tag join mismatch");

same("reveal original receipt", reveal.original_seal.receipt, {
    path: "holdout-receipt.json",
    sha256: FIXED_HASHES["holdout-receipt.json"],
    mode: "0444",
});
same("reveal original ciphertext", reveal.original_seal.ciphertext, {
    path: originalClaim.path,
    file_sha256: originalClaim.file_sha256,
    frame_sha256: originalClaim.frame_sha256,
    ciphertext_sha256: originalClaim.ciphertext_sha256,
    mode: originalClaim.mode,
});
same("original plaintext commitment", reveal.original_seal.plaintext_commitment, {
    bytes: receipt.corpus.plaintext_bytes,
    sha256: receipt.corpus.plaintext_sha256,
    case_count: receipt.corpus.case_count,
    family_count: receipt.corpus.family_count,
    family_counts: receipt.corpus.family_counts,
});

const aad = Buffer.from(reveal.decryption.aad_base64, "base64");
assert(aad.byteLength === reveal.decryption.aad_bytes, "AAD byte count mismatch");
assert(digest(aad) === reveal.decryption.aad_sha256, "AAD hash mismatch");
const aadObject = JSON.parse(aad.toString("utf8"));
assert(Buffer.from(canonical(aadObject)).equals(aad), "AAD canonical roundtrip mismatch");
same("recovery AAD", aadObject, {
    schema: "value.pi.syntax-consume-number.g14.holdout-recovery-aad/v1",
    feature_id: reveal.feature_id,
    generation: reveal.generation,
    continuity: reveal.continuity,
    original_seal: reveal.original_seal,
    candidate_freeze: reveal.candidate_freeze,
    corpus: reveal.corpus,
    recovery_encryption: {
        algorithm: reveal.decryption.algorithm,
        frame_magic: reveal.decryption.frame_magic,
        frame_layout: "8-byte ASCII magic || 12-byte nonce || ciphertext || 16-byte authentication tag",
        nonce_hex: reveal.decryption.nonce_hex,
    },
});

const recoveryFrame = decodeBase64Frame("holdout-recovery-ciphertext.b64");
const recoveryClaim = reveal.recovery_artifact;
assert(digest(recoveryFrame.file) === recoveryClaim.file_sha256 && recoveryFrame.file.byteLength === recoveryClaim.file_bytes, "recovery ciphertext file commitment mismatch");
assert(digest(recoveryFrame.frame) === recoveryClaim.frame_sha256 && recoveryFrame.frame.byteLength === recoveryClaim.frame_bytes, "recovery frame commitment mismatch");
assert(digest(recoveryFrame.ciphertext) === recoveryClaim.ciphertext_sha256 && recoveryFrame.ciphertext.byteLength === recoveryClaim.ciphertext_bytes, "recovery ciphertext commitment mismatch");
assert(recoveryFrame.frame.subarray(0, 8).toString("ascii") === reveal.decryption.frame_magic, "recovery frame magic mismatch");
assert(recoveryFrame.nonce.toString("hex") === reveal.decryption.nonce_hex, "recovery nonce join mismatch");
assert(recoveryFrame.tag.toString("hex") === reveal.decryption.authentication_tag_hex, "recovery authentication tag join mismatch");
assert(reveal.decryption.algorithm === "AES-256-GCM" && reveal.decryption.key_bytes === 32, "recovery algorithm mismatch");

const key = Buffer.from(reveal.decryption.key_hex, "hex");
assert(key.byteLength === 32, "recovery key length mismatch");
const decipher = createDecipheriv("aes-256-gcm", key, recoveryFrame.nonce);
decipher.setAAD(aad);
decipher.setAuthTag(recoveryFrame.tag);
let plaintext: Buffer;
try {
    plaintext = Buffer.concat([decipher.update(recoveryFrame.ciphertext), decipher.final()]);
} catch (error) {
    fail(`AES-256-GCM authentication failed: ${String(error)}`);
} finally {
    key.fill(0);
}
assert(plaintext.byteLength === 13_840, `plaintext byte count mismatch: ${plaintext.byteLength}`);
const plaintextSha256 = digest(plaintext);
assert(plaintextSha256 === "f53e24b703596990e9e53cf0160e2e32bf3a524022d41d982d251207ea5d5867", `plaintext SHA-256 mismatch: ${plaintextSha256}`);
assert(plaintext.byteLength === receipt.corpus.plaintext_bytes && plaintextSha256 === receipt.corpus.plaintext_sha256, "plaintext/original receipt join mismatch");
assert(plaintext.byteLength === reveal.corpus.plaintext_bytes && plaintextSha256 === reveal.corpus.plaintext_sha256, "plaintext/reveal join mismatch");

const plaintextText = plaintext.toString("utf8");
const corpus = JSON.parse(plaintextText);
const canonicalPlaintext = Buffer.from(canonical(corpus), "utf8");
assert(canonicalPlaintext.equals(plaintext), "plaintext canonical roundtrip mismatch");
assert(digest(canonicalPlaintext) === reveal.corpus.canonical_roundtrip_sha256, "canonical roundtrip hash mismatch");
plaintext.fill(0);
canonicalPlaintext.fill(0);

assert(corpus.schema === "value.pi.syntax-consume-number.g14.hidden-holdout/v1", "hidden corpus schema mismatch");
assert(corpus.feature_id === feature.feature_id && corpus.generation === feature.generation, "hidden corpus identity mismatch");
assert(corpus.case_count === 61 && reveal.corpus.case_count === 61 && receipt.corpus.case_count === 61, "hidden case count mismatch");
assert(Object.keys(corpus.families).length === 8 && reveal.corpus.family_count === 8 && receipt.corpus.family_count === 8, "hidden family count mismatch");
same("hidden family counts", corpus.family_counts, FAMILY_COUNTS);
same("receipt family counts", receipt.corpus.family_counts, FAMILY_COUNTS);
same("reveal family counts", reveal.corpus.family_counts, FAMILY_COUNTS);
same("hidden authority hashes", corpus.authority_sha256, Object.fromEntries(receiptAuthorityPaths.map((path) => [path, receipt.authority[path].sha256])));

const caseIndex: Array<{ family: string; id: string }> = [];
const familyPayloadSha256: Record<string, string> = {};
const seenIds = new Set<string>();
for (const [family, expectedCount] of Object.entries(FAMILY_COUNTS)) {
    const rows = corpus.families[family];
    assert(Array.isArray(rows) && rows.length === expectedCount, `${family} count mismatch`);
    familyPayloadSha256[family] = digest(canonical(rows));
    assert(familyPayloadSha256[family] === reveal.corpus.family_payload_sha256[family], `${family} payload hash mismatch`);
    for (const row of rows) {
        assert(row && typeof row.id === "string" && !seenIds.has(row.id), `${family} has an invalid or duplicate case id`);
        seenIds.add(row.id);
        caseIndex.push({ family, id: row.id });
    }
}
assert(seenIds.size === 61, "hidden corpus does not have 61 unique cases");
assert(digest(canonical(corpus.families)) === reveal.corpus.case_payload_sha256, "case payload hash mismatch");
assert(digest(canonical(caseIndex)) === reveal.corpus.case_index_sha256, "case index hash mismatch");
assert(digest(canonical({ family_counts: corpus.family_counts, family_payload_sha256: familyPayloadSha256 })) === reveal.corpus.family_manifest_sha256, "family manifest hash mismatch");

function materialize(partsValue: unknown, maxLength: number, id: string): string {
    assert(Number.isInteger(maxLength) && maxLength >= 0 && maxLength <= MAX_GENERATED_UTF16_LENGTH, `${id}: invalid generator bound`);
    const parts = typeof partsValue === "string" ? [partsValue] : (partsValue as any)?.parts;
    assert(Array.isArray(parts), `${id}: generator parts missing`);
    let result = "";
    for (const part of parts) {
        let addition: string;
        if (typeof part === "string") {
            addition = part;
        } else {
            assert(part && typeof part.repeat === "string" && part.repeat.length > 0, `${id}: invalid repeat token`);
            assert(Number.isInteger(part.count) && part.count >= 0, `${id}: invalid repeat count`);
            assert(part.repeat.length * part.count <= maxLength - result.length, `${id}: repeat exceeds declared bound`);
            addition = part.repeat.repeat(part.count);
        }
        assert(result.length + addition.length <= maxLength, `${id}: materialized string exceeds declared bound`);
        result += addition;
    }
    return result;
}

function expectedNumber(spec: any, representation: string, id: string): number {
    assert(spec && typeof spec.kind === "string", `${id}: invalid expected number specification`);
    if (spec.kind === "negative-zero") return -0;
    if (spec.kind === "positive-zero") return 0;
    if (spec.kind === "positive-infinity") return Infinity;
    if (spec.kind === "negative-infinity") return -Infinity;
    if (spec.kind === "Number(representation)") return Number(representation);
    const literal = /^Number\((.*)\)$/.exec(spec.kind);
    if (literal) return Number(literal[1]);
    return fail(`${id}: unknown expected number kind ${spec.kind}`);
}

function expectedLeaf(row: any, representation: string): CssNumber {
    const expected = row.expected ?? row.expected_leaf;
    assert(expected && [null, "+", "-"].includes(expected.sign), `${row.id}: invalid expected sign`);
    assert(expected.type === "integer" || expected.type === "number", `${row.id}: invalid expected type`);
    return { sign: expected.sign, type: expected.type, value: expectedNumber(expected.value, representation, row.id) };
}

function assertExactMutableLeaf(id: string, actual: unknown, expected: CssNumber): asserts actual is CssNumber {
    assert(typeof actual === "object" && actual !== null && Object.getPrototypeOf(actual) === Object.prototype, `${id}: result is not an ordinary object`);
    assert(!Object.isFrozen(actual) && !Object.isSealed(actual) && Object.isExtensible(actual), `${id}: result is not mutable and extensible`);
    same(`${id} keys`, Reflect.ownKeys(actual), ["sign", "type", "value"]);
    const descriptors = Object.getOwnPropertyDescriptors(actual) as Record<string, PropertyDescriptor>;
    for (const [key, value] of Object.entries(expected)) {
        const descriptor = descriptors[key];
        assert(descriptor && descriptor.enumerable === true && descriptor.configurable === true && descriptor.writable === true, `${id}: descriptor flags mismatch for ${key}`);
        assert(Object.hasOwn(descriptor, "value") && descriptor.get === undefined && descriptor.set === undefined && Object.is(descriptor.value, value), `${id}: descriptor/value mismatch for ${key}`);
    }
    const leaf = actual as CssNumber & { extra?: string };
    const replacementSign: Sign = leaf.sign === "+" ? "-" : "+";
    leaf.sign = replacementSign;
    assert(leaf.sign === replacementSign, `${id}: sign assignment mutation failed`);
    leaf.sign = expected.sign;
    assert(delete (leaf as any).type, `${id}: type deletion mutation failed`);
    Object.defineProperty(leaf, "type", { value: expected.type, enumerable: true, writable: true, configurable: true });
    leaf.extra = "probe";
    assert(leaf.extra === "probe" && delete leaf.extra, `${id}: extension mutation failed`);
}

function predecessor(profileName: string): unknown {
    const profile = corpus.predecessor_profiles[profileName];
    assert(profile, `unknown predecessor profile ${profileName}`);
    if (profile.kind === "frozen") {
        if (Array.isArray(profile.value)) return Object.freeze([...profile.value]);
        return Object.freeze({ ...profile.value });
    }
    switch (profile.value) {
        case "undefined": return undefined;
        case "null": return null;
        case "false": return false;
        case "0": return 0;
        case "": return "";
        default: return fail(`invalid primitive predecessor ${profileName}`);
    }
}

const diagnosticsSnapshot = (state: ParserState<unknown>): string => JSON.stringify({
    furthest: state.furthest,
    expected: state.expected,
    suggestions: state.suggestions,
    secondarySpans: state.secondarySpans,
});

function seedAheadDiagnostics(state: ParserState<unknown>, offset: number) {
    const seed = corpus.diagnostic_profiles["preseeded-ahead"].seed;
    state.furthest = offset + seed.furthest_delta;
    state.expected = [...seed.expected];
    state.suggestions = seed.suggestions.map((item: any) => ({ ...item }));
    state.secondarySpans = seed.secondarySpans.map((item: any) => ({ offset: offset + item.offset_delta, label: item.label }));
}

function validateDiagnostics(id: string, state: ParserState<unknown>, sourceLength: number, offset: number) {
    assert(Number.isInteger(state.furthest) && state.furthest >= -1 && state.furthest <= Math.max(sourceLength, offset + 97), `${id}: diagnostic furthest is malformed`);
    assert(state.expected === undefined || (Array.isArray(state.expected) && state.expected.length <= 32 && state.expected.every((item) => typeof item === "string" && item.length <= 256)), `${id}: expected diagnostics are malformed`);
    assert(Array.isArray(state.suggestions) && state.suggestions.length <= 32, `${id}: suggestions are malformed`);
    assert(Array.isArray(state.secondarySpans) && state.secondarySpans.length <= 32, `${id}: secondary spans are malformed`);
}

function runSuccess(parser: Parser<CssNumber>, row: any, stats: SeatStats) {
    assert(typeof row.source === "string" && typeof row.representation === "string", `${row.id}: invalid success source`);
    assert(Number.isInteger(row.offset) && Number.isInteger(row.end), `${row.id}: invalid success offsets`);
    assert(row.source.slice(row.offset, row.end) === row.representation, `${row.id}: representation/source join mismatch`);
    const prior = Object.freeze({ tag: "hidden-success-prior" });
    const state = new ParserState<unknown>(row.source, prior, row.offset);
    const originalSource = state.src;
    try { parser.call(state as ParserState<CssNumber>); } catch (error) { fail(`${row.id}: candidate threw ${String(error)}`); }
    assert(state.src === originalSource && !state.isError && state.offset === row.end, `${row.id}: exact maximal-prefix/source boundary mismatch`);
    assertExactMutableLeaf(row.id, state.value, expectedLeaf(row, row.representation));
    stats.case_count++;
    stats.success_cases++;
}

function runFailure(parser: Parser<CssNumber>, row: any, stats: SeatStats) {
    assert(typeof row.source === "string" && Number.isInteger(row.offset) && row.offset >= 0 && row.offset <= row.source.length, `${row.id}: invalid failure input`);
    assert(row.diagnostics === "ordinary" || row.diagnostics === "preseeded-ahead", `${row.id}: invalid diagnostic profile`);
    const prior = predecessor(row.predecessor);
    const state = new ParserState<unknown>(row.source, prior, row.offset);
    const originalSource = state.src;
    if (row.diagnostics === "preseeded-ahead") seedAheadDiagnostics(state, row.offset);
    const before = diagnosticsSnapshot(state);
    try { parser.call(state as ParserState<CssNumber>); } catch (error) { fail(`${row.id}: candidate threw ${String(error)}`); }
    assert(state.src === originalSource && state.isError && state.offset === row.offset && Object.is(state.value, prior), `${row.id}: failure was not transactional`);
    validateDiagnostics(row.id, state, row.source.length, row.offset);
    if (row.diagnostics === "preseeded-ahead") {
        assert(diagnosticsSnapshot(state) === before, `${row.id}: pre-existing ahead diagnostics changed`);
        stats.ahead_failure_cases++;
    } else {
        stats.ordinary_failure_cases++;
    }
    stats.case_count++;
    stats.failure_cases++;
}

function parentParser(parser: Parser<CssNumber>, row: any): Parser<unknown> {
    const numeric = string(row.prefix).next(parser);
    if (row.kind === "percentage") return numeric.skip(string("%")).skip(string(row.suffix)).eof();
    if (row.kind === "dimension") return numeric.then(regex(/[a-zA-Z]+/)).skip(string(row.suffix)).eof();
    if (row.kind === "integer") return numeric.chain((leaf) => leaf.type === "integer" ? string(row.suffix).map(() => leaf) : string("\u0000").map(() => leaf)).eof();
    assert(row.kind === "delimited", `${row.id}: invalid parent kind`);
    return numeric.skip(string(row.suffix)).eof();
}

function parentRepresentation(row: any): string {
    let end = row.source.length - row.suffix.length;
    if (row.kind === "percentage") end--;
    if (row.kind === "dimension") end -= row.expected_unit.length;
    return row.source.slice(row.prefix.length, end);
}

function runParent(parser: Parser<CssNumber>, row: any, stats: SeatStats) {
    assert(typeof row.source === "string" && typeof row.prefix === "string" && typeof row.suffix === "string", `${row.id}: invalid parent input`);
    const prior = Object.freeze({ tag: "hidden-parent-prior" });
    const state = new ParserState<unknown>(row.source, prior, 0);
    const originalSource = state.src;
    try { parentParser(parser, row).call(state); } catch (error) { fail(`${row.id}: parent threw ${String(error)}`); }
    assert(state.src === originalSource, `${row.id}: parent changed source`);
    if (!row.accepts) {
        assert(state.isError, `${row.id}: invalid full-source parent composition was accepted`);
        stats.parent_rejects++;
    } else {
        assert(!state.isError && state.offset === row.source.length, `${row.id}: valid full-source parent composition was rejected`);
        const leaf = row.kind === "dimension" ? (state.value as [CssNumber, string])[0] : state.value as CssNumber;
        const representation = parentRepresentation(row);
        const expected = expectedLeaf(row, representation);
        assert(Object.is(leaf.value, expected.value), `${row.id}: parent leaf value mismatch`);
        if (row.expected_value) assert(Object.is(leaf.value, expectedNumber(row.expected_value, representation, row.id)), `${row.id}: parent expected value mismatch`);
        if (row.kind === "dimension") assert((state.value as [CssNumber, string])[1] === row.expected_unit, `${row.id}: parent unit mismatch`);
        assertExactMutableLeaf(row.id, leaf, expected);
        stats.parent_accepts++;
    }
    stats.parent_cases++;
    stats.case_count++;
}

function emptyStats(): SeatStats {
    return { case_count: 0, success_cases: 0, failure_cases: 0, ordinary_failure_cases: 0, ahead_failure_cases: 0, parent_cases: 0, parent_accepts: 0, parent_rejects: 0, hostile_cases: 0 };
}

async function evaluateSeat(seat: Seat): Promise<SeatStats> {
    const authority = candidateAuthority[seat];
    const moduleUrl = `${pathToFileURL(resolve(here, authority.path)).href}?holdout=${authority.sha256}`;
    const candidateModule = await import(moduleUrl);
    assert(candidateModule.consumeNumber instanceof Parser, `seat ${seat}: candidate must export an exact parse-that Parser`);
    const parser = candidateModule.consumeNumber as Parser<CssNumber>;
    const stats = emptyStats();

    for (const family of ["maximal-prefix-repeated-fractions", "incomplete-decimal-exponent-suffixes", "utf16-nonzero-offsets", "signed-zero-extreme-conversion", "ordinary-mutable-result-descriptors"])
        for (const row of corpus.families[family]) runSuccess(parser, row, stats);
    for (const row of corpus.families["transactional-failures"]) runFailure(parser, row, stats);
    for (const row of corpus.families["parent-composition"]) runParent(parser, row, stats);
    for (const hiddenRow of corpus.families["bounded-hostile-strings"]) {
        const source = materialize(hiddenRow.generator, hiddenRow.max_utf16_length, hiddenRow.id);
        assert(source.length === hiddenRow.max_utf16_length, `${hiddenRow.id}: generated UTF-16 length does not equal committed bound`);
        const expectation = hiddenRow.expectation;
        if (expectation.status === "failure") {
            runFailure(parser, { id: hiddenRow.id, source, offset: 0, predecessor: expectation.predecessor, diagnostics: expectation.diagnostics }, stats);
        } else {
            assert(expectation.status === "success", `${hiddenRow.id}: invalid hostile disposition`);
            const representation = materialize(expectation.representation, hiddenRow.max_utf16_length, `${hiddenRow.id}/representation`);
            runSuccess(parser, { id: hiddenRow.id, source, offset: 0, end: expectation.end, representation, expected: expectation.expected }, stats);
        }
        stats.hostile_cases++;
    }

    same(`seat ${seat} exact stats`, stats, {
        case_count: 61,
        success_cases: 37,
        failure_cases: 9,
        ordinary_failure_cases: 4,
        ahead_failure_cases: 5,
        parent_cases: 15,
        parent_accepts: 6,
        parent_rejects: 9,
        hostile_cases: 5,
    });
    return stats;
}

const seatEvidence: Record<string, unknown> = {};
for (const seat of SEATS) {
    const stats = await evaluateSeat(seat);
    seatEvidence[seat] = {
        status: "PASS_EXACT_61_OF_61",
        candidate: candidateAuthority[seat],
        family_counts: FAMILY_COUNTS,
        ...stats,
    };
}

assert(reveal.verification.reconstruction_gate === "PASS_EXACT" && reveal.verification.authenticated_decryption === "PASS", "recovery verification disposition mismatch");
assert(reveal.verification.plaintext_byte_identical_to_original_commitment === true && reveal.verification.plaintext_hash_matches_original_receipt === true, "recovery commitment flags mismatch");

const verifiedArtifacts = Object.fromEntries([
    ...Object.entries(FIXED_HASHES).map(([path, sha256]) => [path, { sha256, mode: mode(path), bytes: statSync(resolve(here, path)).size }]),
    ...receiptAuthorityPaths.filter((path) => !(path in FIXED_HASHES)).map((path) => [path, { sha256: fileDigest(path), mode: mode(path), bytes: statSync(resolve(here, path)).size }]),
    ["holdout-ciphertext.b64", { sha256: originalClaim.file_sha256, mode: mode("holdout-ciphertext.b64"), bytes: originalFrame.file.byteLength }],
    [manifest.base.path, { sha256: manifest.base.sha256, mode: mode(baseRelativePath), bytes: statSync(resolve(here, baseRelativePath)).size }],
]);
const evidence = {
    schema: "value.pi.syntax-consume-number.g14.holdout-evidence/v1",
    status: "PASS_ALL_FOUR_EXACT",
    feature_id: feature.feature_id,
    generation: feature.generation,
    prototype_evidence_only: true,
    evaluator: { path: "holdout-evaluator.mts", sha256: evaluatorSha256, mode: "0444" },
    authority: {
        status: "PASS_ALL_LOCAL_HASH_MODE_AND_CROSS_ARTIFACT_JOINS",
        verified_artifacts: verifiedArtifacts,
        candidate_set_sha256: FIXED_HASHES["candidate-set.json"],
    },
    authenticated_recovery: {
        algorithm: "AES-256-GCM",
        status: "PASS_AUTHENTICATED_IN_MEMORY_ONLY",
        recovery_file_sha256: recoveryClaim.file_sha256,
        frame_sha256: recoveryClaim.frame_sha256,
        ciphertext_sha256: recoveryClaim.ciphertext_sha256,
        aad_sha256: reveal.decryption.aad_sha256,
        frame_magic: reveal.decryption.frame_magic,
        plaintext_written: false,
    },
    corpus: {
        schema: corpus.schema,
        plaintext_bytes: 13_840,
        plaintext_sha256: plaintextSha256,
        canonical_roundtrip_sha256: reveal.corpus.canonical_roundtrip_sha256,
        case_count: 61,
        case_index_sha256: reveal.corpus.case_index_sha256,
        case_payload_sha256: reveal.corpus.case_payload_sha256,
        family_count: 8,
        family_counts: FAMILY_COUNTS,
        family_payload_sha256: familyPayloadSha256,
        family_manifest_sha256: reveal.corpus.family_manifest_sha256,
        generators_materialized_with_utf16_bounds: true,
        maximum_generated_utf16_length: MAX_GENERATED_UTF16_LENGTH,
    },
    seats: seatEvidence,
    replay: {
        candidate_order: SEATS,
        cases_per_candidate: 61,
        total_case_executions: 244,
        exact_parser_instance_required: true,
        source_preservation_checked: true,
        signed_zero_checked_with_Object_is: true,
        infinity_dispositions_checked: true,
        predecessor_identity_checked: true,
        ahead_diagnostic_snapshot_checked: true,
        full_source_parent_dispositions_checked: ["percentage", "dimension", "integer", "delimited"],
        hostile_no_throw_checked: true,
        benchmark_executed: false,
        production_source_read: false,
        candidate_source_modified: false,
    },
    credit: { parser: 0, feature: 0, benchmark: 0, integration: 0, production: 0 },
};

const evidencePath = resolve(here, "holdout-evidence.json");
writeFileSync(evidencePath, `${JSON.stringify(evidence, null, 2)}\n`, { encoding: "utf8", flag: "wx", mode: 0o444 });
chmodSync(evidencePath, 0o444);
assert(mode("holdout-evidence.json") === "0444", "holdout evidence mode freeze failed");
const evidenceSha256 = fileDigest("holdout-evidence.json");
process.stdout.write(`${JSON.stringify({
    schema: "value.pi.syntax-consume-number.g14.holdout-evaluator-result/v1",
    status: "PASS_ALL_FOUR_EXACT",
    evaluator_sha256: evaluatorSha256,
    evidence_sha256: evidenceSha256,
    seats: Object.fromEntries(SEATS.map((seat) => [seat, "PASS_EXACT_61_OF_61"])),
    total_case_executions: 244,
})}\n`);
