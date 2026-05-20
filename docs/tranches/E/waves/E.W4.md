# E.W4 — Vendor policy + CI hardening + benchmark gate + CW preparation + tooling refresh + keyframes.js coordination

**Opens after**: E.W3 close.
**Lanes**: 6 — A (benchmark CI gate), B (CI hardening — vue-tsc + library-build + Node 22 matrix + Playwright browser cache + WebKit project integration), C (vendor policy for generated shadcn-vue cluster), D (CW seed preparation — verify value.js's CW-readiness), E (motion-token canon adoption + Vite 7.3.3 + tooling refresh), **F (keyframes.js consumption-update coordination — NEW per E-FOLD round)**.
**Status**: planned.

The infrastructure + cross-repo coordination wave. Closes 4 chronically-deferred items (B-01 + B-07 vendor policy; D-03 smoke-safari CI integration; D-04 motion canon adoption) + the keyframes.js v0.6.0 silent-breakage surfaced at E-FOLD.

## Scope

### Lane A — Benchmark CI gate

Per `E-AUDIT-6 §10 top-5 + AUD-6.5`. The L8 microbench (≥ 5× speedup) is currently a manual D.W6 gate; without CI enforcement it can regress silently.

1. **Add `npm run bench` script** to `package.json`:
   ```jsonc
   "bench": "node bench/color-channel-access.mjs && node bench/color2-direct-paths.mjs && node bench/parser-namelookup.mjs"
   ```
   (Includes the 2 new E.W1 benchmarks.)

2. **Add CI step** in `.github/workflows/node.js.yml` (after vitest, before playwright):
   ```yaml
   - run: npm run bench | tee bench-output.txt
   - name: Assert L8 ≥ 5×
     run: |
       MEDIAN=$(grep -oE 'median speedup:\s+[0-9.]+×' bench-output.txt | head -1 | grep -oE '[0-9.]+')
       if (( $(echo "$MEDIAN < 5" | bc -l) )); then
         echo "L8 microbench regressed: $MEDIAN× (gate ≥ 5×)"
         exit 1
       fi
   ```
   Plus analogous assertions for the DIRECT_PATHS (≥ 2×) + nameParser (≥ 5×) benchmarks.

3. **Verify on local CI dry-run** — run with `act` if available, or push to a feature branch.

**Sub-gate A**:
- `npm run bench` exits 0; outputs medians for all 3 benchmarks.
- CI step asserts ≥ 5× for L8, ≥ 2× for DIRECT_PATHS, ≥ 5× for nameParser.

### Lane B — CI hardening

Per `E-AUDIT-6 §7 + §10 + AUD-6.10`. Missing from CI:
- `vue-tsc --noEmit` typecheck step (currently only api/ + vitest run TypeScript).
- Library build verification (`npm run build` should run + the dist size logged).
- CHANGELOG-changed gate (any PR touching `src/` should also touch `CHANGELOG.md`).
- Playwright browser cache (currently re-installs on every run; ~60s/run savings).
- Node 22 matrix (currently Node 24 only).
- `--project=smoke-safari` (E.W3 added the project; E.W4 wires it into CI).
- The deploy job (gh-pages) currently doesn't verify lint/typecheck before deploying.

Plus optional:
- `npm run proof:resolution` step (intentionally fleet-coordinated only at D.W1; can be added to value.js CI as a tracked-but-not-gated check).

Workflow refactor: split into matrix jobs (one per Node version) + separate Playwright + bench jobs that parallelize.

**Sub-gate B**:
- `.github/workflows/node.js.yml` runs:
  - `npm run lint`, `vue-tsc --noEmit`, `npm run build`, `vitest run`, `cd api && npm run test` (E.W2 added), `npm run bench`, `playwright test` (4 projects).
- Node 22 + Node 24 matrix.
- Playwright browser cache key includes the version.
- CHANGELOG-changed gate added (a step that asserts CHANGELOG.md is touched when src/** is touched).

### Lane C — Vendor policy for generated shadcn-vue cluster

Per `E-AUDIT-2 B-bucket B-01 + B-07`. The ~126 generated shadcn-vue typecheck errors have persisted across A + B + D. E opens the vendor policy.

**Decision tree** at lane open:
- **Option 1 (regenerate)**: run shadcn-vue's current CLI against the demo to regenerate the `demo/@/components/ui/` tree. Pros: refreshes against current shadcn-vue templates; may shed errors. Cons: drift from any local modifications.
- **Option 2 (vendor + freeze)**: add `demo/@/components/ui/` to `.gitignore`; document a regenerate command + a known-good baseline. Pros: clean source tree. Cons: install-time generation overhead; harder onboarding.
- **Option 3 (accept + document)**: keep the cluster vendored as-is; document the 126 errors as accepted noise in CLAUDE.md; tighten the eslint config to silence the relevant rules. Pros: KISS, no churn. Cons: persistent noise.

Author `VENDOR-POLICY.md` at repo root capturing the decision + the regenerate command (if applicable) + the accepted-noise rationale (if applicable). Update `CLAUDE.md`'s Conventions section to point at the policy.

**Sub-gate C**:
- `VENDOR-POLICY.md` exists.
- The decision (Option 1/2/3) is documented with explicit rationale.
- If Option 1: vue-tsc error count drops (record from 126 → X).
- If Option 2/3: vue-tsc error count documented as accepted-noise.
- The Conventions section in `CLAUDE.md` cites the policy.

### Lane D — CW seed preparation (read-only)

Per `E-AUDIT-4 §4 + AUD-4.4`. Speedtest's CW seed (`61079cb1`) plans a pnpm-workspace overlay across the constellation. Value.js is a CONSUMER, not author. E reserves a small sub-lane to verify CW-readiness:

1. **Verify zero hard `dist/` aliases** for `@mkbabb/*` siblings in `vite.config.ts` (already verified at D.W1; re-verify at E open).
2. **Verify `peerDependencies` declarations** in `package.json`:
   - Currently `parse-that` is a runtime dep. Should it be a peer-dep? If CW activates workspace-linking, the peer-dep declaration prevents nested-install duplication.
   - Any `@mkbabb/*` that should be peer-dep? (Currently no `@mkbabb/*` in package.json; the library is standalone — the demo depends on glass-ui via `file:`, but that's demo-side.)
3. **Verify `siblingFsAllowTransient` removed** (E.W0).
4. **Verify the contract-v2 publisher half stays green** (`npm run proof:resolution`).
5. **Verify the `default` export key in `package.json:exports["."]`** — under CW's workspace-resolution, the `default` key is the terminal fallback per contract-v2.
6. **Document the CW readiness** in `coordination/Q.md §4`.

**Sub-gate D**:
- `coordination/Q.md §4` carries the CW-readiness verdict.
- No changes to `package.json` are needed (unless step 2 surfaces a peer-dep migration).
- `proof:resolution` GREEN.

### Lane E — Motion-token canon adoption + Vite 7.3.3 + tooling refresh

Per `E-AUDIT-4 §2 + AUD-4.2, AUD-4.5`. Glass-ui shipped `--motion-duration-*` / `--motion-delay-*` canon at `0124a8b`; the demo currently doesn't consume these tokens. Plus Vite 7.3.3 in speedtest AI W6 (value.js is on `^7.0.6`).

1. **Motion-token canon adoption** — survey the demo for hard-coded duration/delay values OR demo-local `--duration-*` tokens. Migrate to glass-ui's canon. The demo's `--animation-slide-sm/md/lg` tokens from B may or may not survive.
2. **Vite 7.3.3 adoption** — `npm update vite` (the `^7.0.6` constraint accepts 7.x.x). Verify build + dev + gh-pages all work post-update.
3. **`demo/DESIGN.md` motion section update** (D.W4 Lane B) — cross-reference the glass-ui motion canon.
4. **Refresh `coordination/Q.md §3` motion-canon row** as ADOPTED.

**Sub-gate E**:
- Demo consumes `--motion-duration-*` / `--motion-delay-*` tokens.
- `npm list vite` shows Vite 7.3.x.
- All gates green (`build`, `dev`, `gh-pages`, smoke).
- `coordination/Q.md` and `demo/DESIGN.md` updated.

### Lane F — keyframes.js consumption-update coordination (NEW per E-FOLD round)

Per `audit/E-FOLD-2-3-4-synthesis.md §1, §4`. The E-FOLD audit surfaced that value.js's v0.6.0 release SILENTLY BROKE keyframes.js's `file:`-linked consumer: `keyframes.js/src/animation/numeric.ts:159` calls `lerp(eased, startVals, stopVals)` which under the v0.6.0 `(a, b, t)` order produces garbage outputs.

Per the precept-bound cross-repo boundary, value.js cannot write keyframes.js directly. Per E1 (architectural transposition) + E5 (sharpened deferral), the smallest unblock action is: PUBLISH the migration diff + a verification protocol; KEEP `lerpLegacy` until the consumer migrates.

1. **File the exact migration diff** in `coordination/Q.md §5`:
   ```diff
   - // keyframes.js/src/animation/numeric.ts:159-163
   - (this.result as Record<string, number>)[seg.keys[i]!] = lerp(
   -     eased,
   -     seg.startVals[i]!,
   -     seg.stopVals[i]!,
   - );
   + (this.result as Record<string, number>)[seg.keys[i]!] = lerp(
   +     seg.startVals[i]!,
   +     seg.stopVals[i]!,
   +     eased,
   + );
   ```

2. **Verify the call site count** — `grep -rn '\blerp(' /Users/mkbabb/Programming/keyframes.js/src/` should return exactly 1 site (the `numeric.ts:159` one). If there are more, enumerate.

3. **Author `scripts/migrate-keyframes-js-lerp.mjs`** in value.js — a tiny codemod the keyframes.js maintainer can run locally:
   ```mjs
   #!/usr/bin/env node
   // Migrates keyframes.js's lerp(t, a, b) → lerp(a, b, t) call sites.
   // Usage: node scripts/migrate-keyframes-js-lerp.mjs ../keyframes.js
   ```
   The codemod uses a conservative regex over the explicit call site shape and asserts before/after parity.

4. **Verification protocol**:
   - Run `cd /Users/mkbabb/Programming/keyframes.js && npm test` against master value.js — expect FAILURE pre-migration (or document the test gap).
   - Apply the migration.
   - Re-run — expect PASS.
   - Document the protocol in `coordination/Q.md §5`.

5. **Trigger for `lerpLegacy` removal**: this lane's coordination work happens IN E. The actual `lerpLegacy` deletion is the NEXT tranche's work, gated by the keyframes.js-side migration confirmation. Lane F's PRODUCT is the migration scaffolding + the documented unblock, not the keyframes.js write.

**Sub-gate F**:
- `coordination/Q.md §5` carries the exact migration diff + the call-site count.
- `scripts/migrate-keyframes-js-lerp.mjs` exists.
- `lerpLegacy` JSDoc updated to the E5-compliant trigger (verified at E.W1 Lane A close).
- The verification protocol documented.

## File bounds

| Lane | Files |
|---|---|
| A | `package.json` (`bench` script), `.github/workflows/node.js.yml` (bench step), `docs/tranches/E/audit/E.W4-bench-gate.md` (new) |
| B | `.github/workflows/node.js.yml` (full hardening), `docs/tranches/E/audit/E.W4-ci-hardening.md` (new) |
| C | `VENDOR-POLICY.md` (new), `CLAUDE.md` (Conventions section), `demo/@/components/ui/` (if regenerate; else `.gitignore`), `docs/tranches/E/audit/E.W4-vendor-policy.md` (new) |
| D | `coordination/Q.md §4` (CW readiness verdict), optional `package.json` (if peer-dep migration needed), `docs/tranches/E/audit/E.W4-cw-readiness.md` (new) |
| E | `demo/@/styles/style.css` (motion-token consumption), various demo SFCs (consumer migrations), `package-lock.json` (Vite 7.3.x), `demo/DESIGN.md` (motion section), `coordination/Q.md §3` (motion-canon row), `docs/tranches/E/audit/E.W4-motion-vite.md` (new) |
| F | `scripts/migrate-keyframes-js-lerp.mjs` (new), `coordination/Q.md §5` (migration diff + protocol), `docs/tranches/E/audit/E.W4-keyframes-coordination.md` (new) |

## Gate

The conjunction of sub-gates A + B + C + D + E + F. Wave-level:
- All E gates green (lint, vue-tsc, vitest, smoke 4 projects, build, proof:resolution, bench).
- CI workflow runs the full matrix (Node 22 + 24, all gates).
- Vendor policy decision committed.
- Motion-token canon adopted.
- Keyframes.js migration scaffolding published; `coordination/Q.md §5` documents the unblock protocol.

## Verification artefacts

5 per-lane audit docs + the VENDOR-POLICY.md + the workflow diff.

## Commit plan

- `feat(ci/w4): bench gate — L8 ≥ 5× + DIRECT_PATHS ≥ 2× + nameParser ≥ 5× assertions` — Lane A.
- `feat(ci/w4): CI hardening — vue-tsc + library build + Node 22 matrix + Playwright browser cache + smoke-safari project + CHANGELOG-changed gate` — Lane B.
- `chore(vendor/w4): vendor policy for generated shadcn-vue cluster (decision: ___)` — Lane C.
- `docs(coord/w4): CW seed preparation — value.js CW-readiness verdict (E.W4 Lane D)` — Lane D.
- `feat(demo/w4): adopt @mkbabb/glass-ui motion-token canon + bump Vite to 7.3.x` — Lane E.
- `feat(coord/w4): keyframes.js consumption-update coordination — migration diff + codemod + protocol (closes E-FOLD-3 finding)` — Lane F.

## Dependencies

- Depends on: E.W3 close (the 4-project structure exists).
- Blocks: E.W5 close (the CI + vendor policy + CW readiness all gate the v0.7.0 release).
