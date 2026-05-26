#!/usr/bin/env node
// Codifies the F.W1 Lane A invariant: zero `@ts-ignore` directives in src/ + demo/.
//
// F.W1 Lane A swept the library's type-suppression debt — `@ts-ignore`
// silences the compiler at a callsite without recording WHY, so it rots into
// a latent type hole. The disciplined alternative is `@ts-expect-error` (which
// fails CI once the underlying error is fixed) or, better, an honest type fix.
// This gate makes the absence of `@ts-ignore` a runtime invariant.
//
// Added at G.W3 Lane C (proof-script suite for F-thesis invariants).
// Scope-extended at H.W3 Lane D: the gate now covers `demo/` in addition to
// `src/`. The vendored `demo/@/components/ui/` shadcn tree is excluded per
// `VENDOR-POLICY.md` — generated code is not subject to the hand-written
// no-suppression invariant.
//
// Exit 0 → clean (zero @ts-ignore in src/ or non-vendored demo/).
// Exit 1 → one or more @ts-ignore directives found; each named with file+line.
//
// Run: node scripts/proof-no-ts-ignore.mjs
// npm:  npm run proof:no-ts-ignore

import { execSync } from "node:child_process";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));

// grep is run with cwd pinned to the repo root so the `src/` + `demo/` paths
// resolve regardless of the caller's working directory. `--exclude-dir=ui`
// drops the vendored shadcn-vue tree at `demo/@/components/ui/` (the only
// `ui` directory under src/ + demo/). `|| true` swallows grep's exit-1
// (no-match) so execSync does not throw on the clean case.
const out = execSync(
    'grep -rn --exclude-dir=ui "@ts-ignore" src/ demo/ || true',
    { cwd: ROOT, encoding: "utf8" },
);
const count = out.trim() ? out.trim().split("\n").length : 0;

if (count > 0) {
    console.error(
        `[proof:no-ts-ignore] FAIL — found ${count} @ts-ignore directive(s) in src/ or demo/:`,
    );
    console.error(out.trimEnd());
    console.error(
        "\nF.W1 Lane A invariant: never silence the compiler with @ts-ignore. " +
            "Fix the type, or use @ts-expect-error so the suppression self-retires.",
    );
    process.exit(1);
}

console.log("[proof:no-ts-ignore] PASS — zero @ts-ignore in src/ + demo/");
