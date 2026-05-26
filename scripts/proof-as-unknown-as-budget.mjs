#!/usr/bin/env node
// Codifies the H2 invariant: the `as unknown as` budget in src/ is capped at 2.
//
// `as unknown as <T>` is the documented escape hatch for the irreducible
// residue left over when `as any` is retired (G2). Unlike `as any`, the
// double-cast forces an explicit re-typing — but it still subverts the
// checker, so its count must be bounded and every site policy-documented.
//
// H.W2 Lane A retired the typed-XYZ_FUNCTIONS site; H.W2 Lane C retired the
// type-predicate site. The post-(A+C) count is **2** — Lane C cleaned more
// than the H.W2.md plan anticipated, so this lane tightens the budget below
// the H.md §2 H2 wording (which cites 3) to the strictest reading possible.
// Budget headroom is zero: the count can only be lowered, never raised.
//
// The two documented residue sites (both irreducible):
//   1. src/units/normalize.ts:117 — `style as unknown as Record<string, string>`
//      CSSStyleDeclaration has no string index signature, but the runtime
//      `getComputedValue` indexes it with a dynamic `prop` string. The only
//      shape that admits that read is `Record<string, string>`. The cast is
//      DOM-structural-impossibility class. Centralised at a single named
//      `styleRecord` helper so the boundary lives at one site.
//   2. src/parsing/color.ts:59 — `color.clone() as unknown as Color<number>`
//      `clone()` preserves the concrete `Color<ValueUnit<number>>` subclass;
//      the immediately-following loop overwrites every channel slot with the
//      unwrapped numeric value, so the cloned instance is reinterpreted as
//      a `Color<number>` for the writes. Clone-reinterpret class — the type
//      narrows monotonically through the loop and cannot be expressed
//      structurally without rebuilding the instance.
//
// Added at H.W2 Lane B (proof-script suite extension for H-thesis invariants).
//
// Exit 0 → count ≤ BUDGET.
// Exit 1 → count > BUDGET; every `as unknown as` site named with file+line.
//
// Run: node scripts/proof-as-unknown-as-budget.mjs
// npm:  npm run proof:as-unknown-as-budget

import { execSync } from "node:child_process";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));

// The H2 target — tightened to the post-(A+C) actual count (2). H.md §2 H2
// cites 3 because the plan predated Lane C's cleaner-than-anticipated
// outcome; this script codifies the stricter reality. Lower it as the count
// permits; never raise it.
const BUDGET = 2;

// grep is run with cwd pinned to the repo root so the `src/` path resolves
// regardless of the caller's working directory. `|| true` swallows grep's
// exit-1 (no-match) so execSync does not throw on the clean case.
const out = execSync('grep -rn "as unknown as" src/ || true', {
    cwd: ROOT,
    encoding: "utf8",
});
const count = out.trim() ? out.trim().split("\n").length : 0;

if (count > BUDGET) {
    console.error(
        `[proof:as-unknown-as-budget] FAIL — found ${count} 'as unknown as' site(s); budget ≤ ${BUDGET}`,
    );
    console.error(out.trimEnd());
    console.error(
        "\nH2 invariant: `as unknown as <T>` is reserved for the documented " +
            "DOM-structural-impossibility and clone-reinterpret residue. New sites " +
            "require either an irreducibility-class rationale + budget bump (lane " +
            "review) or a structural refactor that retires the cast.",
    );
    process.exit(1);
}

console.log(
    `[proof:as-unknown-as-budget] PASS — ${count} 'as unknown as' site(s) (budget ≤ ${BUDGET})`,
);
