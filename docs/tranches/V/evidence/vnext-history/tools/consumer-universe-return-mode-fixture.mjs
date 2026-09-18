import { createHash } from "node:crypto";
import { copyFileSync, cpSync, mkdirSync, readFileSync, realpathSync, symlinkSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { canonicalize, compareCanonicalText, parseJsonStrict } from "./json-contract.mjs";
import {
    prepareConsumerFixtureConstellation,
    resolveConsumerFixtureUniverse,
} from "./consumer-universe-fixture.mjs";

const trancheRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const workspaceNodeModules = resolve(trancheRoot, "../../../..", "node_modules");
const waveRegistryRelativePaths = ["waves/P-V.md", "waves/K-A.md", "waves/G-D.md", "waves/M-C.md"];
const sha256 = (value) => createHash("sha256").update(value).digest("hex");

export async function prepareConsumerUniverseReturnModeFixture({ fixtureRoot, primary }) {
    mkdirSync(fixtureRoot, { recursive: true });
    const canonicalFixtureRoot = realpathSync(fixtureRoot);
    const constellation = prepareConsumerFixtureConstellation({
        fixtureRoot: canonicalFixtureRoot,
        primary,
    });
    const validatorTranche = resolve(canonicalFixtureRoot, "validator-tranche");
    cpSync(trancheRoot, validatorTranche, { recursive: true });
    symlinkSync(workspaceNodeModules, resolve(validatorTranche, "node_modules"), "dir");
    copyFileSync(constellation.authorityPath, resolve(validatorTranche, "CONSUMER-UNIVERSE-BOUNDS.json"));

    const validatorPath = realpathSync(resolve(validatorTranche, "tools", "validate-return.mjs"));
    const consumerReturn = await import(pathToFileURL(
        resolve(validatorTranche, "tools", "consumer-universe-return.mjs"),
    ).href);
    const consumerRootSnapshot = await import(pathToFileURL(
        resolve(validatorTranche, "tools", "consumer-root-snapshot.mjs"),
    ).href);
    const captureAuthorityPath = resolve(canonicalFixtureRoot, "consumer-immutable-capture-authority.json");
    const capturesByReceiptPath = new Map();
    const writeCaptureAuthority = () => {
        const authority = {
            schema: "vnext-consumer-universe-immutable-capture-authority/1",
            captures: [...capturesByReceiptPath.entries()]
                .map(([receipt_path, immutable_capture]) => ({ receipt_path, immutable_capture }))
                .sort((left, right) => compareCanonicalText(left.receipt_path, right.receipt_path)),
            authority_hash: "",
        };
        const preimage = structuredClone(authority);
        delete preimage.authority_hash;
        authority.authority_hash = sha256(canonicalize(preimage));
        writeFileSync(captureAuthorityPath, `${canonicalize(authority)}\n`);
        return authority;
    };

    return {
        constellation,
        validatorPath,
        captureAuthorityArgs() {
            const authority = writeCaptureAuthority();
            return ["--consumer-immutable-capture-authority", realpathSync(captureAuthorityPath), sha256(readFileSync(captureAuthorityPath)), authority.authority_hash];
        },
        resolve({ name, waveId, edges = [], scenario, expectedExit = 0, requireResolvable = expectedExit === 0 }) {
            const fixture = resolveConsumerFixtureUniverse({
                constellation,
                name,
                edges,
                scenario,
                expectedExit,
                requireResolvable,
            });
            const validation = consumerReturn.validateConsumerUniverseReceipt(fixture.receiptPath, {
                requireResolvable,
            });
            const resolverReport = parseJsonStrict(fixture.resolverStdout);
            const snapshotIndex = consumerReturn.validateConsumerRootSnapshotIndexReference(
                resolverReport.snapshot_index,
            );
            const snapshotIndexDocument = consumerRootSnapshot.validateConsumerRootSnapshotIndex(
                snapshotIndex,
                validation.receipt,
                { forbidOriginalRootReads: false },
            ).index;
            const captureRoot = resolve(canonicalFixtureRoot, "immutable-consumer-captures", name);
            mkdirSync(captureRoot, { recursive: true });
            const copyMaterial = (sourcePath, filename) => {
                const destination = resolve(captureRoot, filename);
                copyFileSync(sourcePath, destination);
                const path = realpathSync(destination);
                return { path, file_sha256: sha256(readFileSync(path)) };
            };
            const materials = {
                receipt: copyMaterial(fixture.receiptPath, "receipt.json"),
                input: copyMaterial(fixture.inputPath, "input.json"),
                resolver: copyMaterial(resolve(validatorTranche, "tools/resolve-consumer-universe.mjs"), "resolve-consumer-universe.mjs"),
                input_schema: copyMaterial(resolve(validatorTranche, "consumer-universe.schema.json"), "consumer-universe.schema.json"),
                receipt_schema: copyMaterial(resolve(validatorTranche, "consumer-universe-receipt.schema.json"), "consumer-universe-receipt.schema.json"),
                bounds_authority: copyMaterial(validation.bounds_authority.path, "CONSUMER-UNIVERSE-BOUNDS.json"),
                wave_registry: {
                    files: waveRegistryRelativePaths.map((relativePath, index) => ({
                        relative_path: relativePath,
                        ...copyMaterial(resolve(validatorTranche, relativePath), `wave-registry-${index + 1}.md`),
                    })),
                    registry_sha256: validation.receipt.formation_wave_registry_sha256,
                },
            };
            const binding = consumerReturn.consumerUniverseImmutableBindingFromResult(fixture.receiptPath, validation);
            const capture = consumerReturn.consumerUniverseImmutableCaptureDocument(binding, materials);
            const capturePath = resolve(captureRoot, "capture.json");
            writeFileSync(capturePath, `${canonicalize(capture)}\n`);
            const immutableCapture = consumerReturn.consumerUniverseImmutableCaptureReference(realpathSync(capturePath));
            capturesByReceiptPath.set(fixture.receiptPath, immutableCapture);
            writeCaptureAuthority();
            const annex = consumerReturn.consumerUniverseAnnexProjection(
                waveId,
                fixture.receiptPath,
                validation,
                immutableCapture,
                snapshotIndex,
            );
            return {
                ...fixture,
                canonicalValidation: validation,
                annex,
                capture,
                capturePath,
                immutableCapture,
                materials,
                rootSnapshots: structuredClone(snapshotIndexDocument.roots),
                snapshotIndex,
                snapshotIndexDocument,
            };
        },
    };
}
