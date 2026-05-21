# F.W4 HEADLINE close — `FINAL.md` + merge + v0.8.0 tag

**Opens after**: F.W3 close.
**Agents**: read-only close audit — 7 lanes per the E.W5 close-ceremony pattern (`docs/tranches/E/waves/E.W5.md`).
**Status**: planned.

## Scope

Close ceremony for tranche F. Mirrors E.W5's shape. v0.8.0 release-blocking wave.

## Read-only close audit lanes (7)

1. **plan-vs-actual** — every F wave's planned scope against what landed; `PROGRESS.md` matches reality. Zero `planned` rows.

2. **substrate-without-consumer** — F introduces:
   - `docs/tranches/F/W8-W12-consumer-lockstep.md` (consumed: pointer from F.md §0).
   - The `Github` icon migration (consumer: gh-pages build).
   - The 3 F.W1 transpositions (consumers: type-system + Vite/Rolldown future-proofing + vendor-policy clarity).
   - The keyframes.js cross-repo write (consumer: keyframes.js's test suite).
   - The `lerpLegacy` delete (consumer: zero — that's the point of F2; the absence IS the new state).
   - The 5 F.W3 CI hygiene gates (consumers: CI workflow + future regressions).
   Verify each has a consumer + the consumer is not stale.

3. **doc-drift** — `CLAUDE.md`, `demo/CLAUDE.md`, `api/CLAUDE.md`, the per-CLAUDE.md drift fixed at E.W1 Lane E, the wave specs against the shipped tree. Particularly: any drift introduced by W8-W12 work that wasn't caught at E close + isn't yet caught by F.

4. **idiomatic-gestalt** — F1 (no deferrals), F2 (lerpLegacy retires), F3 (cross-repo write bounded), F4 (W8-W12 back-reference); inherited E1-E5 + D1-D7 + precept invariants 30-33 all hold. Spot-check the post-F.W3 library shape for any new bolt-ons.

5. **performance** — bundle size after F.W3 Lane A's `lerpLegacy` delete (should drop further; bundle size gate from F.W3 Lane E enforces). Bench medians stay above gates (L8 ≥ 5×, DIRECT_PATHS ≥ 2×, nameParser ≥ 5×). Backend latency unchanged.

6. **visual-runtime** — Playwright re-probe across all 5 projects (smoke + smoke-admin + smoke-mobile + smoke-reactivity + smoke-safari). Total spec count ≥ 36.

7. **integrity sweep** — `git reflog` since F open for unauthorized agent-attributed mutating git operations; `git stash list` clean; `docs/precepts` unchanged (F doesn't bump the submodule unless precepts upstream advances). **F-NEW**: verify the cross-repo F.W2 write is the SOLE cross-repo mutation in F's window — no other peer-repo writes by F.

## Close ceremony

1. **`docs/tranches/F/FINAL.md`** — close report citing every F commit, the gate evidence, the v0.8.0 BREAKING surface (`lerpLegacy` delete is LONE), the 3 bench medians, the smoke-safari coverage, the cross-repo write outcome (F.W2's keyframes.js commit SHA + test verdict), the CI hygiene gates added at F.W3. Pin E's FINAL.md SHA (`361db8f` per E.W5 commit) + merge `47399c2` + tag `v0.7.0`.
2. **Reconcile `PROGRESS.md`** — every F wave-log row shows `closed` with commit hashes; "Open dependencies" updated to reflect post-F state (peer-authorship asks with sharpened (c) triggers).
3. **Pin `docs/precepts` SHA** — `68d9b20` unchanged at F close (verify upstream during F.W4; if precepts advanced, advance value.js's pin OR document the decision to hold).
4. **Update `coordination/Q.md` §6** — final state at F close. Re-verify peer asks + the cross-repo F.W2 outcome.
5. **Update root `CLAUDE.md`** — test count + spec count post-F (vitest 1584, smoke 36, api 104, bench triple). New scripts (`proof:dts-layout`).
6. **`demo/CLAUDE.md`** — reconcile to post-F state (gh-pages unblock + the Github icon rename + any vendor sweep deletions).
7. **`api/CLAUDE.md`** — reconcile (no api/ changes in F; brief verify only).
8. **CHANGELOG.md** — v0.8.0 entry per F2 invariant: BREAKING (lerpLegacy delete), INTERNAL (W8-W12 back-reference + gh-pages unblock + 3 transpositions + 5 CI hygiene gates), DEPS (any drift from F.W1 Lane C deletions or codeSplitting).

## Merge + release ceremony (v0.8.0)

F ships as **v0.8.0** — minor bump per semver (lone BREAKING per F2):
- `lerpLegacy` removed from main barrel.

Mirror E.W5's merge sequence + version-bump pattern.

### Pre-merge gate matrix (14 items — extends E's 12)

The 12 E-merge items + 2 F-NEW:

1. Every F wave-log row reads `closed`.
2. `FINAL.md` cites every F commit + the E close (`47399c2` + tag `v0.7.0`) + the cross-repo F.W2 SHA.
3. `npm run build` + `vue-tsc` + `npm test` + `npm run lint` + `npm run proof:resolution` + `npm run proof:dts-layout` + `npx playwright test` (5 projects) — all green.
4. **L8 microbenchmark** preserved (≥ 5×).
5. **Recursion-guard suite green**.
6. **Reactivity-smoke spec green** (≤ 100ms slider-keyboard median; ≤ 50ms spectrum-drag median).
7. Integrity sweep clean (audit lane 7).
8. `CHANGELOG.md` carries the v0.8.0 entry.
9. `package.json` version bumped to `0.8.0`.
10. Backend tests green (`cd api && npx vitest run` ≥ 104 tests passing).
11. **DIRECT_PATHS bench** ≥ 2× (post-F).
12. **nameParser bench** ≥ 5× (post-F).
13. **F-NEW: dts-shape invariant** — `dist/*.d.ts` exists at flat layout (NO `dist/src/*.d.ts`) per F.W3 Lane D.
14. **F-NEW: bundle-size gate** — `dist/value.js` ≤ 145 KB raw per F.W3 Lane E.

### Merge sequence

Per `D-RELEASE-PLAN.md §3` shape:

```
# on tranche-f, at F close
git checkout master
git pull --ff-only origin master         # ensure master is current
git checkout tranche-f
git rebase master                        # likely no-op since F branched off post-W12 master
git checkout master
git merge --no-ff tranche-f -m "Merge tranche-f into master — Tranche F close (v0.8.0)"
git tag -a v0.8.0 -m "v0.8.0 — F close (lerpLegacy retired + W8-W12 back-reference + post-W12 transpositions + CI hygiene)"
git push origin master --follow-tags
```

The merge commit message — drafted at F.W4:

```
Merge tranche-f into master — Tranche F close (v0.8.0)

Tranche F ships:
- F2 invariant satisfaction: lerpLegacy retired. The cross-repo F3
  exception (apply published codemod against keyframes.js) closed
  the (c) trigger; keyframes.js's two silently-broken call sites
  (numeric.ts:159 + group.ts:251) migrated under the F.W2 cross-repo
  write; tests PASS post-migration. value.js-side delete at F.W3.
- W8-W12 back-reference doc authored at value.js side; tranche-
  discipline sharpening codified in F4.
- 3 post-W12 transpositions: @ts-ignore strengthened via typed
  memoize (sole @ts-ignore in src/ → ZERO); Rolldown declarative
  codeSplitting adopted; zero-consumer shadcn-vue subdir sweep.
- gh-pages unblock: Github lucide alias-hygiene fixed (W9-C punt).
- 5 CI hygiene gates: CHANGELOG-changed broadened, vue-tsc baseline
  lowered, dts-shape invariant guard, bundle-size gate, (optional)
  proof:resolution types-key probe extension.

Standing peer-authorship asks carry forward with sharpened TIME-BOUND
(c) triggers per F1:
- 7 glass-ui primitive asks — glass-ui in CONTRACTION posture; re-check
  at each F wave-close (NONE shipped during F window).
- Contract-v2 §2.1 font-asset residual — re-check at F.W4 close
  (dist/glass-ui.css still ships 0 @font-face).
- keyframes.js precept-pin drift — re-check at F.W2 close
  (peer maintainer authority).

Also pins E close (commit 47399c2 / tag v0.7.0).

Sub-tranche commits live on tranche-f at <F-W0-SHA>..<F-W3-close-SHA>.
```

### Post-merge

- Delete `tranche-f` branch (local + remote — though it's never pushed).
- Re-evaluate next tranche's planning substrate. Candidate successors (named in `coordination/Q.md`):
  - **glass-ui primitive-expansion (if glass-ui's contraction posture inverts during F window or shortly after)** — file 7 asks + Aurora derive + BlobDot.
  - **value.js demo-abstraction post-glass-ui-ship** — retire `useMetaballRenderer.ts` + `WatercolorDot/`.
  - **CW Phase-2 value.js participation** — when speedtest's CW workspace overlay reaches value.js, a 1-line `package.json` flip.
  - **keyframes.js precept-pin reconciliation** — coordinate with keyframes.js maintainer.

## File bounds

| Lane | Files |
|---|---|
| Close audit | All F + E + D + B + A docs — read-only |
| Close ceremony writes | `docs/tranches/F/FINAL.md` (new), `docs/tranches/F/PROGRESS.md`, root `CLAUDE.md`, `demo/CLAUDE.md`, `api/CLAUDE.md`, `docs/tranches/F/coordination/Q.md` (final state), `CHANGELOG.md` (v0.8.0 entry), `package.json` (version 0.7.0 → 0.8.0) |

## Gate

Conjunction of the 7 close-audit lanes + the close-honesty checklist + the 14-item pre-merge gate matrix.

## Verification artefacts

`audit/F.W4-*` (7 close-audit lane outputs), `audit/F.W4-bench/` (the 3 benchmark medians), `docs/tranches/F/FINAL.md`, the merge commit hash, the v0.8.0 tag.

## Commit plan

- `audit(tranche-f/w4-close): 7 read-only close lanes + integrity sweep`
- `docs(tranche-f/w4-close): FINAL.md + PROGRESS + CLAUDE.md updates + coordination/Q.md final state`
- `chore(release): v0.8.0 — F close ceremony + version bump`
- `Merge tranche-f into master — Tranche F close (v0.8.0)` (no-ff merge commit)
- `v0.8.0` tag annotated + pushed.

## Dependencies

- Depends on: F.W3.
- Blocks: nothing — F.W4 is the close.

## Note on the close

F's `FINAL.md` records the precept-bound truth: F1 ("No deferrals") is honored — every inherited deferral either landed in F or carries a TIME-BOUND (c) trigger; F2 (lerpLegacy retires) satisfied via the cross-repo F3 exception. A's + B's + D's + E's + F's FINAL.md together close every clause of every user prompt across value.js's history.
