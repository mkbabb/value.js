import { copyFileSync, cpSync, mkdirSync, realpathSync, symlinkSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import {
    prepareConsumerFixtureConstellation,
    resolveConsumerFixtureUniverse,
} from "./consumer-universe-fixture.mjs";

const trancheRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const workspaceNodeModules = resolve(trancheRoot, "../../../..", "node_modules");

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

    return {
        constellation,
        validatorPath,
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
            const annex = consumerReturn.consumerUniverseAnnexProjection(waveId, fixture.receiptPath, validation);
            return { ...fixture, canonicalValidation: validation, annex };
        },
    };
}
