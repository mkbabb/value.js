#!/usr/bin/env node
// Codifies the F2 invariant: zero `@deprecated` annotations in src/.
//
// F.W3 Lane A retired the last deprecated surface (`lerpLegacy`) at v0.8.0.
// F2 is the standing thesis that the library carries no deprecation debt —
// every consumer migrates to the canonical API at the root, no compat shims.
// This gate makes that a runtime invariant: a future `@deprecated` JSDoc tag
// in src/ fails CI.
//
// Added at G.W3 Lane B (proof-script suite for F-thesis invariants).
//
// Exit 0 → clean (zero @deprecated in src/).
// Exit 1 → one or more @deprecated annotations found; each named with file+line.
//
// Run: node scripts/proof-no-deprecated.mjs
// npm:  npm run proof:no-deprecated

import { execSync } from "node:child_process";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));

// grep is run with cwd pinned to the repo root so the `src/` path resolves
// regardless of the caller's working directory. `|| true` swallows grep's
// exit-1 (no-match) so execSync does not throw on the clean case.
const out = execSync('grep -rn "@deprecated" src/ || true', {
    cwd: ROOT,
    encoding: "utf8",
});
const count = out.trim() ? out.trim().split("\n").length : 0;

if (count > 0) {
    console.error(
        `[proof:no-deprecated] FAIL — found ${count} @deprecated annotation(s) in src/:`,
    );
    console.error(out.trimEnd());
    console.error(
        "\nF2 invariant: the library carries no deprecation debt — migrate the " +
            "consumer to the canonical API at the root and delete the deprecated surface.",
    );
    process.exit(1);
}

console.log("[proof:no-deprecated] PASS — zero @deprecated in src/");
