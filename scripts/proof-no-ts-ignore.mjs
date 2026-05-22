#!/usr/bin/env node
// Codifies the F.W1 Lane A invariant: zero `@ts-ignore` directives in src/.
//
// F.W1 Lane A swept the library's type-suppression debt — `@ts-ignore`
// silences the compiler at a callsite without recording WHY, so it rots into
// a latent type hole. The disciplined alternative is `@ts-expect-error` (which
// fails CI once the underlying error is fixed) or, better, an honest type fix.
// This gate makes the absence of `@ts-ignore` a runtime invariant.
//
// Added at G.W3 Lane C (proof-script suite for F-thesis invariants).
//
// Exit 0 → clean (zero @ts-ignore in src/).
// Exit 1 → one or more @ts-ignore directives found; each named with file+line.
//
// Run: node scripts/proof-no-ts-ignore.mjs
// npm:  npm run proof:no-ts-ignore

import { execSync } from "node:child_process";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));

// grep is run with cwd pinned to the repo root so the `src/` path resolves
// regardless of the caller's working directory. `|| true` swallows grep's
// exit-1 (no-match) so execSync does not throw on the clean case.
const out = execSync('grep -rn "@ts-ignore" src/ || true', {
    cwd: ROOT,
    encoding: "utf8",
});
const count = out.trim() ? out.trim().split("\n").length : 0;

if (count > 0) {
    console.error(
        `[proof:no-ts-ignore] FAIL — found ${count} @ts-ignore directive(s) in src/:`,
    );
    console.error(out.trimEnd());
    console.error(
        "\nF.W1 Lane A invariant: never silence the compiler with @ts-ignore. " +
            "Fix the type, or use @ts-expect-error so the suppression self-retires.",
    );
    process.exit(1);
}

console.log("[proof:no-ts-ignore] PASS — zero @ts-ignore in src/");
