# E.W5 HEADLINE close — Strengthened close + FINAL.md + merge + v0.7.0 tag

**Opens after**: E.W4 close.
**Agents**: read-only close audit — 7 lanes per the D.W6 close-ceremony pattern (`docs/tranches/D/waves/D.W6.md`).
**Status**: planned.

The close ceremony for tranche E. Mirrors D.W6's strengthened shape. v0.7.0 release-blocking wave.

## Scope

### Read-only close audit lanes (7)

1. **plan-vs-actual** — every E wave's planned scope against what landed; `PROGRESS.md` matches reality. Zero `planned` rows.

2. **substrate-without-consumer** — E introduces a benchmark CI gate (E.W4), a vendor policy (E.W4), motion-token consumption (E.W4 Lane E), the smoke-safari project (E.W3), the 14 interactive-flow specs (E.W3), the api/ pipeline-parity migrations (E.W2), the first backend tests (E.W2 Lane F), the library transposition outputs (E.W1). Verify each has a consumer + the consumer is not stale.

3. **doc-drift** — `CLAUDE.md`, `demo/CLAUDE.md`, `api/CLAUDE.md`, the per-CLAUDE.md drift fixed at E.W1 Lane E, the wave specs against the shipped tree.

4. **idiomatic-gestalt** — E1 (architectural transposition), E2 (NO LEGACY CODE), E3 (pipeline parity), E4 (audit cadence), E5 (zero deferral); D1-D7 + precept invariants 30-33 all hold. Spot-check the post-E.W1 library shape for any new bolt-ons.

5. **performance** — bundle size after E.W1 (the v0.7.0 candidate has 51 internal exports moved + `lerpLegacy` deleted — bundle may shrink). Backend latency unchanged or improved per E.W2's pipeline-parity. Frame budget unchanged (E didn't touch goo-blob/aurora). All 3 benchmarks (color-channel-access + color2-direct-paths + parser-namelookup) record their medians.

6. **visual-runtime** — Playwright re-probe across all 4 projects (smoke + smoke-admin + smoke-mobile + smoke-safari). Total spec count ≥ 36 (21 baseline + 14 flow + smoke-safari sustained).

7. **integrity sweep** — `git reflog` since E open for unauthorized agent-attributed mutating git operations; `git stash list` clean; `docs/precepts` unchanged (E doesn't bump the submodule unless precepts upstream advances).

### Close ceremony

1. **`docs/tranches/E/FINAL.md`** — close report citing every E commit, the gate evidence, the v0.7.0 BREAKING surface, the 4 published benchmark medians, the smoke-safari WebKit coverage, the api/ pipeline-parity verdict, the vendor policy decision. Pin D's FINAL.md SHA (`7ac4ecc` / merge `eae8afc`).
2. **Reconcile `PROGRESS.md`** — every E wave-log row shows `closed` with commit hashes; "Open dependencies" updated to reflect post-E state.
3. **Pin `docs/precepts` SHA** — `68d9b20` unchanged at E close (verify upstream during E.W5; if precepts advanced, advance value.js's pin OR document the decision to hold).
4. **Update `coordination/Q.md §3`** — final state at E close. Re-verify the standing glass-ui asks + the CW seed status + the motion-canon adoption + the smoke-safari coverage.
5. **Update root `CLAUDE.md`** — test count + spec count post-E (vitest 1582+, smoke ~36 across 4 projects). New scripts (`bench`).
6. **`demo/CLAUDE.md`** — reconcile to post-E state (motion-canon adoption + the `usePaletteManager` slim).
7. **`api/CLAUDE.md`** — reconcile to post-E state (the `routes/sessions.ts` + `routes/colors.ts` migrations + the middleware split + the first backend tests).
8. **CHANGELOG.md** — v0.7.0 entry per E1/E2 invariants: BREAKING (lerpLegacy + 51 internal-conversion exports + WhitePointColor lift), FEATURES (DIRECT_PATHS + nameParser perf + tryParse context window + benchmark CI gate), INTERNAL (api/ pipeline parity + middleware split + smoke-safari + 14 flow specs), MOTION (glass-ui motion canon adoption).

## Merge + release ceremony (v0.7.0)

E ships as **v0.7.0** — minor bump per semver (multiple breaking changes per E1 + E2):
- `lerpLegacy` removed.
- 51 internal-conversion exports moved behind `/internal` (or un-exported entirely).
- `WhitePointColor<T>` lifted (constructor signatures change for LAB/OKLAB/XYZ).
- Dead exports removed (`BLACKLISTED_COALESCE_UNITS`, `STRING_UNITS`, `COLOR_UNITS`).

Mirror's D.W6's merge sequence + version-bump pattern.

### Pre-merge gate matrix (extends D's 10-item — `D-RELEASE-PLAN.md §3`)

The 10 D-merge items + 2 E-NEW items per `dispatch/AGENT.md`:

1. Every E wave-log row reads `closed`.
2. `FINAL.md` cites every E commit + the D close + tag SHAs.
3. `npm run build` + `vue-tsc` + `npm test` + `npm run lint` + `npm run proof:resolution` + `npx playwright test` (4 projects) — all green.
4. **L8 microbenchmark** preserved (≥ 5× speedup; bench output saved to `audit/E.W5-bench/`).
5. **Recursion-guard suite green** — `test/recursion-guard.test.ts` 5 tests passing (D7 invariant).
6. **Reactivity-smoke spec green** — `e2e/smoke/reactivity-instant.spec.ts` ≤ 50ms median (E.W3 flake fix verified).
7. Integrity sweep clean (audit lane 7).
8. `CHANGELOG.md` carries the v0.7.0 entry.
9. `package.json` version bumped to `0.7.0` (the very last E commit on `tranche-e` before the merge).
10. Backend tests green (E.W2 Lane F) — `cd api && npx vitest run` ≥ 50 tests passing.
11. **E-NEW: DIRECT_PATHS bench** ≥ 2× (post-E.W1).
12. **E-NEW: nameParser bench** ≥ 5× (post-E.W1).

### Merge sequence

Per `D-RELEASE-PLAN.md §3` shape:

```
# on tranche-e, at E close
git checkout master
git pull --ff-only origin master         # ensure master is current (D-merge already in)
git checkout tranche-e
git rebase master                        # no-conflict rebase
git checkout master
git merge --no-ff tranche-e -m "Merge tranche-e into master — Tranche E close (v0.7.0)"
git tag -a v0.7.0 -m "v0.7.0 — E close (architectural transposition + api/ pipeline parity + e2e expansion + vendor policy)"
git push origin master --follow-tags
```

The merge commit message — drafted at E.W5:

```
Merge tranche-e into master — Tranche E close (v0.7.0)

Tranche E ships:
- Library architectural transposition: lerpLegacy retired, WhitePointColor<T>
  lifted, DIRECT_PATHS table for color2 hot paths, 152-branch nameParser
  replaced with broad-regex + Map-lookup, 51 internal-conversion barrel
  exports moved behind /internal
- api/ pipeline parity: routes/sessions.ts + routes/colors.ts migrated to
  the D.W2 pipeline; client.withTransaction wired for deleteUser + fork +
  vote; requireOwnership middleware wired; middleware.ts split into
  middleware/*.ts; first backend tests (≥ 50)
- e2e/ coverage expansion: 14 interactive-flow specs + smoke-safari WebKit
  project + 30s sustained spec (D.W6 follow-up) + reactivity-instant flake fix
- CI hardening: benchmark gate + vue-tsc step + Node 22 matrix + Playwright
  browser cache + CHANGELOG-changed gate
- Cross-repo: adopted glass-ui ./styles.css subpath (closed D contract-v2 §2.1
  keystone-gap workaround); adopted glass-ui motion-token canon
- Vendor policy: opened for generated shadcn-vue cluster

Also pins D close (commit eae8afc / tag v0.6.0).

Sub-tranche commits live on tranche-e at <E-open-SHA>..<E.W5-close-SHA>.
```

### Post-merge

- Delete `tranche-e` branch (local + remote — though it's never pushed).
- File the keyframes.js post-v0.7.0 consumption-update ask (the 51-conversion-exports move + the WhitePointColor lift) in `coordination/Q.md §5`.
- Open the next tranche's planning substrate at the new master HEAD. Candidate successors (named in `coordination/Q.md`):
  - **glass-ui-side primitive ship tranche** — the 7 D-filed primitive/blob gaps + BlobDot + deriveAuroraPalette.
  - **value.js demo-abstraction post-glass-ui-ship** — once glass-ui ships, value.js retires `useMetaballRenderer.ts` + `WatercolorDot/`.
  - **CW Phase-2 value.js participation** — when speedtest's CW workspace overlay reaches value.js, a 1-line `package.json` flip.

## File bounds

| Lane | Files |
|---|---|
| Close audit | All E + D + B + A docs — read-only |
| Close ceremony writes | `docs/tranches/E/FINAL.md` (new), `docs/tranches/E/PROGRESS.md`, root `CLAUDE.md`, `demo/CLAUDE.md`, `api/CLAUDE.md`, `docs/tranches/E/coordination/Q.md` (final state), `CHANGELOG.md` (v0.7.0 entry), `package.json` (version 0.6.0 → 0.7.0) |

## Gate

The conjunction of the 7 close-audit lanes + the close-honesty checklist + the 12-item pre-merge gate matrix.

## Verification artefacts

`audit/E.W5-*` (7 close-audit lane outputs), `audit/E.W5-bench/` (the 3 benchmark medians), `docs/tranches/E/FINAL.md`, the merge commit hash, the v0.7.0 tag.

## Commit plan

- `audit(tranche-e/w5-close): 7 read-only close lanes + integrity sweep`
- `docs(tranche-e/w5-close): FINAL.md + PROGRESS + CLAUDE.md updates + coordination/Q.md final state`
- `chore(release): v0.7.0 — E close ceremony + version bump`
- `Merge tranche-e into master — Tranche E close (v0.7.0)` (no-ff merge commit)
- `v0.7.0` tag annotated + pushed.

## Dependencies

- Depends on: E.W4.
- Blocks: nothing — E.W5 is the close.

## Note on the close

E's `FINAL.md` records the precept-bound truth: every finding from `audit/E-AUDIT-1..6` either landed in an E wave, retires with rationale, or routed to a named cross-repo destination. A's `FINAL.md`, B's `FINAL.md`, D's `FINAL.md`, and E's `FINAL.md` together close every clause of every user prompt across the value.js project's history (per `E-AUDIT-1 §6` zero-deferral verdict at E open + the E.W5 verify-at-close re-run).
