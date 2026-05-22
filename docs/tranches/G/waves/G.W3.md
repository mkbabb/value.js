# G.W3 — Invariant codification + CI/api/e2e hygiene

**Opens after**: G.W2 close.
**Lanes**: 11 — A (SCRIPTS-1 types-key probe), B (SCRIPTS-2 proof:no-deprecated), C (SCRIPTS-3 proof:no-ts-ignore), D (SCRIPTS-4 proof:as-any-budget), E (API-1 withTransaction expansion), F (API-2 engines.node), G (E2E-1 mobile-walk spec), H (CI-2 npm pack --dry-run), **I (G-PUB-1 codemod-publication invariant — user-ratified 2026-05-21)**, **J (FOLD-S1 proof:no-deep — port speedtest AD.W2.T7)**, **K (FOLD-S2 proof:no-bare-builtins for api/src/)**.
**Status**: planned.

## Scope

G.W3 codifies F's and G's invariants as runtime proof scripts (G4 invariant) + lands bounded cross-cutting improvements (API-1/2; E2E-1; CI-2).

### Lane A — SCRIPTS-1: `proof:resolution` types-key probe extension

Per F.W3 Lane F successor (deferred per its OPTIONAL framing). Extend `scripts/proof-resolution-contract.mjs` to probe that `package.json` `exports["."].types` resolves to an actually-emitted file in `dist/`.

**Sub-gate A**:
- Script probes the types-key.
- `npm run proof:resolution` exits 0 at HEAD.
- New gate exits 1 if `dist/index.d.ts` (or the types-key target) is missing — verify with a temporary `mv` of the file.

### Lane B — SCRIPTS-2: `proof:no-deprecated` (codifies F2)

Author `scripts/proof-no-deprecated.mjs`:
```mjs
#!/usr/bin/env node
// Codifies F2 invariant: zero @deprecated annotations in src/.
// Added at G.W3 Lane B (proof script suite for F-thesis invariants).
import { execSync } from "node:child_process";
const out = execSync('grep -rn "@deprecated" src/ || true', { encoding: "utf8" });
const count = out.trim() ? out.split("\n").length : 0;
if (count > 0) {
    console.error(`[proof:no-deprecated] FAIL — found ${count} @deprecated annotation(s) in src/:`);
    console.error(out);
    process.exit(1);
}
console.log("[proof:no-deprecated] PASS — zero @deprecated in src/");
```

Wire into `package.json` scripts + CI workflow post-build step.

**Sub-gate B**:
- Script authored + executable.
- `npm run proof:no-deprecated` exits 0 at HEAD.
- CI step wired.

### Lane C — SCRIPTS-3: `proof:no-ts-ignore` (codifies F.W1 Lane A)

Analogous shape to Lane B but greps `@ts-ignore` (not `@deprecated`).

**Sub-gate C**:
- Script authored.
- `npm run proof:no-ts-ignore` exits 0 at HEAD.
- CI step wired.

### Lane D — SCRIPTS-4: `proof:as-any-budget` (codifies G2)

Author `scripts/proof-as-any-budget.mjs` with a budget of 5 (the G2 target):
```mjs
#!/usr/bin/env node
import { execSync } from "node:child_process";
const BUDGET = 5;
const out = execSync('grep -rn "as any" src/ || true', { encoding: "utf8" });
const count = out.trim() ? out.split("\n").length : 0;
if (count > BUDGET) {
    console.error(`[proof:as-any-budget] FAIL — found ${count} 'as any' site(s); budget ≤ ${BUDGET}`);
    console.error(out);
    process.exit(1);
}
console.log(`[proof:as-any-budget] PASS — ${count} 'as any' site(s) (budget ≤ ${BUDGET})`);
```

**Sub-gate D**:
- Script authored.
- `npm run proof:as-any-budget` exits 0 at HEAD (post-G.W2; count ≤ 5).
- CI step wired.

### Lane E — API-1: `withTransaction` 4-site expansion

Per `audit/G-AUDIT-6 §1`: extend the existing `withTransaction` middleware (E.W2 Lane B) to 4 additional cross-collection write sites:
- `deletePalette` — removes votes + flags + sessions linked to the palette.
- `revertToVersion` — palette + version-history bidirectional update.
- `batchPalettes(delete)` — batch deletion.
- `batchUsers(suspend)` — user state + cascading session invalidation.

Each site must wrap the multi-collection mutation in `services.withTransaction(async (session) => { ... })` per the existing pattern at the 3 F-window sites (deleteUser, fork, toggleVote).

**Sub-gate E**:
- 4 sites migrated.
- `cd api && npx vitest run` — all tests still passing (104+).
- Add ≥ 2 new tests verifying transaction rollback on partial-failure for at least 2 of the 4 sites.

### Lane F — API-2: `engines.node` declaration

Add `"engines": { "node": ">=22" }` to `api/package.json` per `audit/G-AUDIT-6 §1`. Aligns with the constellation Node 22+ posture.

**Sub-gate F**:
- `engines.node` declared.
- `cd api && npm install --legacy-peer-deps --package-lock-only` regenerates lockfile cleanly OR no lockfile drift required.

### Lane G — E2E-1: mobile-walk spec

Per `audit/G-AUDIT-6 §2`: add 1 mobile-walk spec under `e2e/smoke/mobile/` (the `smoke-mobile` Playwright project's `testDir`) exercising PaneSegmentedControl + dock interactions. Spec count: 35 → 36 files / 36 → 37 blocks.

**Sub-gate G**:
- Spec authored at `e2e/smoke/mobile/walk.spec.ts` (or similar name following existing convention).
- `npx playwright test --project=smoke-mobile` PASSes locally (Pixel-7 viewport).

### Lane H — CI-2: `npm pack --dry-run` publish-shape regression catch

Per `audit/G-AUDIT-6 §3`: add a CI step that runs `npm pack --dry-run --legacy-peer-deps` and inspects the emitted file list. Catches regressions in `files:` declaration + `exports` map + `dist/` shape.

**Sub-gate H**:
- CI step added post-build.
- Locally `npm pack --dry-run` shows the expected file set.

### Lane I (NEW — G-PUB-1) — Codemod publication invariant

Per `audit/G-PEER-KEYFRAMES-JS §4.1` (user-ratified 2026-05-21): F.W2's published codemod `scripts/migrate-keyframes-js-lerp.mjs` is **invisible to npm consumers** — `scripts/` is not in `package.json files:` array; `npm pack --dry-run` confirms 150 files in tarball, zero codemod content.

Fix:
1. Add `"scripts/migrate-*.mjs"` to `package.json files:` array.
2. Author `scripts/proof-codemod-publication.mjs` — invariant guard that asserts `scripts/migrate-*.mjs` files are in the published tarball (run `npm pack --dry-run --json` and verify the `files[].path` list contains the matching pattern). Exit 0 if matched, exit 1 with diagnostic otherwise.
3. Wire `proof:codemod-publication` into `package.json scripts` + CI workflow.

**Sub-gate I**:
- `package.json files:` includes `scripts/migrate-*.mjs`.
- `npm pack --dry-run --json | jq '.files[].path' | grep migrate-keyframes-js-lerp` returns the codemod file.
- `npm run proof:codemod-publication` exits 0.
- CI step wired.

### Lane J (NEW — FOLD-S1) — `proof:no-deep.mjs` gate

Per `audit/G-PEER-SPEEDTEST §7.1 FOLD-S1` (user-ratified 2026-05-21): port speedtest's `scripts/check-deep.mjs` (AD.W2.T7) → `scripts/proof-no-deep.mjs` to gate `:deep()` CSS selector regression across `demo/` + `src/`. value.js inherits the precept but has no CI gate.

```mjs
#!/usr/bin/env node
// Codifies the no-:deep() precept across demo/ + src/.
// Ported from speedtest's scripts/check-deep.mjs (AD.W2.T7).
import { execSync } from "node:child_process";
const out = execSync('grep -rn "::v-deep\\|:deep(" demo/ src/ --include="*.vue" --include="*.css" --include="*.scss" || true', { encoding: "utf8" });
const count = out.trim() ? out.split("\n").length : 0;
if (count > 0) {
    console.error(`[proof:no-deep] FAIL — found ${count} :deep() / ::v-deep usage(s):`);
    console.error(out);
    process.exit(1);
}
console.log("[proof:no-deep] PASS — zero :deep() / ::v-deep in demo/ + src/");
```

Wire into `package.json scripts` + CI workflow.

**Sub-gate J**:
- `npm run proof:no-deep` exits 0 at HEAD.
- CI step wired.

### Lane K (NEW — FOLD-S2) — `proof:no-bare-builtins.mjs` for api/src/

Per `audit/G-PEER-SPEEDTEST §7.1 FOLD-S2` (user-ratified 2026-05-21): port speedtest's `scripts/check-bare-built-ins.mjs` → `scripts/proof-no-bare-builtins.mjs` scoped at `api/src/`. The Hono + Node 22+ stack at api/ has the same fragility class speedtest gates against — bare imports of `fs`, `path`, `crypto`, etc. without the `node:` prefix.

```mjs
#!/usr/bin/env node
// Codifies the node:* prefix requirement for built-in imports in api/src/.
// Ported from speedtest's scripts/check-bare-built-ins.mjs.
import { execSync } from "node:child_process";
const BUILTINS = ["fs", "path", "crypto", "url", "os", "stream", "util", "child_process", "http", "https", "events", "querystring", "buffer"];
const pattern = BUILTINS.map(b => `from ['\"]${b}['\"]`).join("\\|");
const out = execSync(`grep -rn "${pattern}" api/src/ --include="*.ts" --include="*.mjs" || true`, { encoding: "utf8" });
const count = out.trim() ? out.split("\n").length : 0;
if (count > 0) {
    console.error(`[proof:no-bare-builtins] FAIL — found ${count} bare built-in import(s) in api/src/ (must use node:* prefix):`);
    console.error(out);
    process.exit(1);
}
console.log("[proof:no-bare-builtins] PASS — zero bare built-in imports in api/src/");
```

Wire into `package.json scripts` + CI workflow.

**Sub-gate K**:
- `npm run proof:no-bare-builtins` exits 0 at HEAD.
- CI step wired.

## File bounds

| Lane | Files |
|---|---|
| A | `scripts/proof-resolution-contract.mjs` (extended), `audit/G.W3-lane-a-types-probe.md` (new) |
| B | `scripts/proof-no-deprecated.mjs` (new), `package.json` (script), `.github/workflows/node.js.yml` (CI step), `audit/G.W3-lane-b-no-deprecated.md` (new) |
| C | `scripts/proof-no-ts-ignore.mjs` (new), `package.json`, `.github/workflows/node.js.yml`, `audit/G.W3-lane-c-no-ts-ignore.md` (new) |
| D | `scripts/proof-as-any-budget.mjs` (new), `package.json`, `.github/workflows/node.js.yml`, `audit/G.W3-lane-d-as-any-budget.md` (new) |
| E | `api/src/services/palette/*.ts`, `api/src/services/admin/*.ts` (4 cross-collection write sites), `api/test/*.test.ts` (new rollback tests), `audit/G.W3-lane-e-withTransaction-expansion.md` (new) |
| F | `api/package.json` (engines), `api/package-lock.json` (if drift), `audit/G.W3-lane-f-engines-node.md` (new) |
| G | `e2e/smoke/mobile/walk.spec.ts` (new), `audit/G.W3-lane-g-mobile-walk.md` (new) |
| H | `.github/workflows/node.js.yml` (CI step), `audit/G.W3-lane-h-pack-dry-run.md` (new) |
| I (NEW) | `package.json` (files: + scripts), `scripts/proof-codemod-publication.mjs` (new), `.github/workflows/node.js.yml` (CI step), `audit/G.W3-lane-i-codemod-publication.md` (new) |
| J (NEW) | `scripts/proof-no-deep.mjs` (new), `package.json` (scripts), `.github/workflows/node.js.yml` (CI step), `audit/G.W3-lane-j-no-deep.md` (new) |
| K (NEW) | `scripts/proof-no-bare-builtins.mjs` (new), `package.json` (scripts), `.github/workflows/node.js.yml` (CI step), `audit/G.W3-lane-k-no-bare-builtins.md` (new) |

## Gate

Conjunction of sub-gates A + B + C + D + E + F + G + H + I + J + K. Wave-level:
- 6 new proof scripts at HEAD (`proof:no-deprecated`, `proof:no-ts-ignore`, `proof:as-any-budget`, `proof:codemod-publication`, `proof:no-deep`, `proof:no-bare-builtins`) + the extended `proof:resolution`, all exiting 0 locally + wired in CI.
- `cd api && npx vitest run` — ≥ 104 + new rollback tests passing.
- `find e2e -name '*.spec.ts' | wc -l` — 36 (was 35).
- `engines.node >= 22` declared.
- All E gates GREEN (lint, vitest, vue-tsc 0, build, proof:resolution, proof:dts-layout, bench medians, smoke 36+/36+).

## Commit plan

- `feat(scripts/w3): extend proof:resolution with types-key existence probe (F.W3 Lane F successor; G.W3 Lane A)`
- `feat(scripts/w3): proof:no-deprecated — codify F2 invariant (G.W3 Lane B)`
- `feat(scripts/w3): proof:no-ts-ignore — codify F.W1 Lane A invariant (G.W3 Lane C)`
- `feat(scripts/w3): proof:as-any-budget — codify G2 invariant (≤ 5; G.W3 Lane D)`
- `feat(api/w3): expand withTransaction to deletePalette + revertToVersion + batch sites (G.W3 Lane E)`
- `chore(api/w3): declare engines.node >= 22 (G.W3 Lane F)`
- `test(e2e/w3): add mobile-walk spec — PaneSegmentedControl + dock (G.W3 Lane G)`
- `feat(ci/w3): npm pack --dry-run publish-shape regression catch (G.W3 Lane H)`

## Dependencies

- Depends on: G.W2 close (as-any-budget enforces post-G.W2 count).
- Blocks: G.W4 close (v0.9.0 release blocked on this wave's gates).
