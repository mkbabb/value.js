#!/usr/bin/env node

import { createHash } from "node:crypto";
import { mkdtempSync, readFileSync, realpathSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import {
    canonicalCleanProviderBootstrapAuthority,
    validateCleanProviderBootstrapAuthority,
} from "./clean-provider-bootstrap-authority.mjs";
import { canonicalize, parseJsonStrict } from "./json-contract.mjs";

const directory = mkdtempSync(join(tmpdir(), "vnext-clean-bootstrap-authority-"));
const failures = [];
let rejections = 0;
const sha256 = (value) => createHash("sha256").update(value).digest("hex");
const canonical = canonicalCleanProviderBootstrapAuthority();
const sourceManifest = parseJsonStrict(readFileSync(canonical.path));

function finalize(manifest) {
    const preimage = structuredClone(manifest);
    delete preimage.manifest_hash;
    manifest.manifest_hash = sha256(canonicalize(preimage));
    return manifest;
}

function writeFixture(name, mutate) {
    const manifest = structuredClone(sourceManifest);
    mutate(manifest);
    finalize(manifest);
    const path = join(directory, `${name}.json`);
    const source = `${canonicalize(manifest)}\n`;
    writeFileSync(path, source);
    return {
        path: realpathSync(path),
        file_sha256: sha256(source),
        manifest_hash: manifest.manifest_hash,
    };
}

function reject(name, mutate, fragment, options = {}) {
    const binding = writeFixture(name, mutate);
    try {
        validateCleanProviderBootstrapAuthority(binding, {
            verificationPath: binding.path,
            requireCanonicalPath: false,
            ...options,
        });
        failures.push(`${name} was accepted`);
    } catch (error) {
        if (!error.message.includes(fragment)) failures.push(`${name} rejected for ${error.message}; expected ${fragment}`);
        else rejections += 1;
    }
}

try {
    const positive = validateCleanProviderBootstrapAuthority(canonical, {
        expectedParentSessionId: sourceManifest.calibration.parent_session_id,
        beforeTimestamp: "2026-07-20T00:00:00.000Z",
    });
    if (canonicalize(positive.bootstrap) !== canonicalize(sourceManifest.bootstrap)) {
        failures.push("canonical authority lost its bootstrap projection");
    }

    reject("posthoc-bootstrap", (value) => {
        value.bootstrap.baseInstructions = "0".repeat(64);
    }, "projection differs");
    reject("forged-prefix", (value) => {
        value.calibration.prefix_sha256 = "0".repeat(64);
    }, "prefix hash drift");
    reject("forged-session", (value) => {
        value.calibration.session_id = "00000000-0000-0000-0000-000000000000";
    }, "session path escapes");
    reject("forged-parent", () => {}, "does not descend", {
        expectedParentSessionId: "00000000-0000-0000-0000-000000000000",
    });
    reject("late-calibration", () => {}, "not frozen before", {
        beforeTimestamp: sourceManifest.calibrated_at,
    });
    reject("forged-calibrated-at", (value) => {
        value.calibrated_at = "2026-07-19T20:05:53.478Z";
    }, "does not bind");
} finally {
    rmSync(directory, { recursive: true, force: true });
}

if (failures.length) {
    process.stderr.write(`${failures.join("\n")}\n`);
    process.exit(1);
}
process.stdout.write(`${JSON.stringify({
    schema: "vnext-clean-provider-bootstrap-authority-selftest/1",
    positives: 1,
    rejections,
})}\n`);
