import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { beforeAll, describe, expect, it } from "vitest";

// ─────────────────────────────────────────────────────────────────────────────
// R.W1.3 — fresh-build published `.d.ts` regression assertion.
//
// A cheap lock against barrel drift on the `extractFunctions` walker (VJ-CSS1,
// shipped since 1.1.0). The symbol is re-exported from the root barrel
// (`src/index.ts`) and the `@mkbabb/value.js/parsing` subpath barrel
// (`src/subpaths/parsing.ts`); a FRESH build must carry it into BOTH published
// declaration files. This guards against the type surface silently losing the
// export even while source imports keep passing (the pass-2 "dist-only" scare —
// refuted, and locked here so it can never recur unseen).
// ─────────────────────────────────────────────────────────────────────────────

// vitest runs from the repository root (the vitest.config home).
const root = process.cwd();

describe("published .d.ts surface (R.W1.3)", () => {
    beforeAll(() => {
        // Emit the real published declarations (vite-plugin-dts, flat layout).
        execFileSync("npm", ["run", "build"], {
            cwd: root,
            stdio: "ignore",
            timeout: 120_000,
        });
    }, 120_000);

    it("root barrel dist/index.d.ts exports extractFunctions", () => {
        const dts = readFileSync(`${root}/dist/index.d.ts`, "utf8");
        expect(dts).toContain("extractFunctions");
    });

    it("parsing subpath dist/subpaths/parsing.d.ts exports extractFunctions", () => {
        const dts = readFileSync(`${root}/dist/subpaths/parsing.d.ts`, "utf8");
        expect(dts).toContain("extractFunctions");
    });
});
