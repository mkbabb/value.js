#!/usr/bin/env node
// Codifies the G2 invariant: the `as any` budget in src/ is capped at 5.
//
// `as any` discards every type guarantee at a callsite — it is the single
// most corrosive escape hatch in a strict TypeScript codebase. G2 set a hard
// ceiling of 5 so the count cannot silently drift upward; G.W2 drove the
// actual count to 0. A non-zero budget (rather than 0) leaves a small,
// deliberate allowance for genuinely unavoidable third-party-shape coercions
// while still failing CI on any meaningful regression.
//
// Added at G.W3 Lane D (proof-script suite for G-thesis invariants).
//
// Exit 0 → count ≤ BUDGET.
// Exit 1 → count > BUDGET; every `as any` site named with file+line.
//
// Run: node scripts/proof-as-any-budget.mjs
// npm:  npm run proof:as-any-budget

import { execSync } from "node:child_process";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));

// The G2 target. Current count at HEAD is 0 — the budget is headroom, not a
// license to add suppressions. Lower it as the count permits; never raise it.
const BUDGET = 5;

// grep is run with cwd pinned to the repo root so the `src/` path resolves
// regardless of the caller's working directory. `|| true` swallows grep's
// exit-1 (no-match) so execSync does not throw on the clean case.
const out = execSync('grep -rn "as any" src/ || true', {
    cwd: ROOT,
    encoding: "utf8",
});
const count = out.trim() ? out.trim().split("\n").length : 0;

if (count > BUDGET) {
    console.error(
        `[proof:as-any-budget] FAIL — found ${count} 'as any' site(s); budget ≤ ${BUDGET}`,
    );
    console.error(out.trimEnd());
    console.error(
        "\nG2 invariant: `as any` discards all type safety. Replace each site " +
            "with a precise type, a type guard, or `as unknown as <T>` with a rationale.",
    );
    process.exit(1);
}

console.log(
    `[proof:as-any-budget] PASS — ${count} 'as any' site(s) (budget ≤ ${BUDGET})`,
);
