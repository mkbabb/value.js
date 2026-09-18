import { execFileSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { verifyDtsParity } from "../tools/parity.js";

describe("W0 declaration parity", () => {
    it("fresh-emits the mirror and resolves all 52 contracts against live source", () => {
        const mirrorRoot = dirname(dirname(fileURLToPath(import.meta.url)));
        const tsc = join(mirrorRoot, "node_modules/typescript/bin/tsc");
        execFileSync(process.execPath, [tsc, "-p", "tsconfig.declarations.json"], { cwd: mirrorRoot });
        execFileSync(process.execPath, [tsc, "-p", "tsconfig.source-contract.json"], { cwd: mirrorRoot });
        expect(verifyDtsParity(true)).toEqual({ types: 33, runtime: 19 });
    });
});
