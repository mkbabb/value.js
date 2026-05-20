# D.W0 HEADLINE — Open: precept advance + coord refresh + B residuals

**Opens after**: D open.
**Lanes**: 1 orchestrator preamble (Lane 0 — precept submodule advance) + 2 lanes — A (B-residual probe / state-at-open verification), B (coord refresh — `Q.md §3` rows + `§9` keyframes.js + `§6` precept SHA verification).
**Status**: planned.

## Scope

D opens against the B.W4 close. Three things happen before any structural work: the precept submodule advances to the contract-v2 codification SHA `68d9b20`; the cross-repo state is re-verified and `coordination/Q.md` is reconciled to it; the B-residual state is confirmed clean.

### Lane 0 — precept submodule advance (orchestrator, before Lanes A and B)

`research/Dh-contract-v2.md §1` names `68d9b20` as the contract-v2 codification SHA — read the precepts repo to verify the SHA exists and codifies contract-v2 before the bump.

1. `git -C docs/precepts fetch && git -C docs/precepts cat-file -t 68d9b20` → must return `commit`.
2. `git -C docs/precepts show 68d9b20 --stat` — verify it touches `cross-repo-dev-resolution.md` (or whatever name) with contract-v2 content (forbids `development`, mandates `build:watch`).
3. `git -C docs/precepts checkout 68d9b20`; `git submodule status docs/precepts` confirms the new SHA.
4. Commit: `chore(precepts): advance shared submodule to 68d9b20 (contract-v2 codification)`.

**Sub-gate 0**: `git -C docs/precepts rev-parse HEAD` returns `68d9b20`; the submodule registration is committed.

### Lane A — B-residual probe + state-at-open verification

1. Confirm B.W4 close is clean: A's `FINAL.md` + B's `FINAL.md` exist; A and B wave-logs zero `planned`; `git stash list` empty.
2. Run the D-open gate matrix as a baseline:
   - `npx vue-tsc --noEmit 2>&1 | grep -c 'error TS'` — expect 126 (generated shadcn only); record.
   - `npx vitest run` — expect 1409; record.
   - `npx playwright test --project=smoke` — expect 3/3; record.
   - Cold-start `npm run dev`, Playwright boot probe at 1280×800 light — expect 0 console errors, 0 stale-prop warnings (invariant-31 holds across the contract-v2 boundary as long as Lane 0's precept advance lands first).
3. Record the state in `audit/D.W0-state-at-open.md`.

**Sub-gate A**: state-at-open matches the B-close gate (126 / 1409 / 3 smoke / 0 console); precept pin `68d9b20`; no untracked WIP outside the named scope (`docs/tranches/C/`, the tranche-C scaffold, is acknowledged but not D's).

### Lane B — coordination/Q.md refresh

`coordination/Q.md` was authored against the B-close state. Re-verify each row at D open and reconcile:

1. **`§3` metaballs row** — refresh the surface from 5 to 7 additions per `research/Dd-blob.md §3` (G6 `MetaballCanvas mode="layout"` + G7 `pauseOnHidden` newly filed). Already done in D's substrate authoring; this lane confirms.
2. **`§3` aurora row** — refresh with the `deriveAuroraPalette` + `deriveAuroraConfig` algorithm sketch per `research/Dc-aurora.md §3`. Already done; confirm.
3. **`§3` BlobDot row** — `WatercolorDot` instance count was filed as "11" in B; `research/Dd-blob.md §2` re-counted as 16 instance sites (across 9 consumer files). Refresh.
4. **`§6` precept SHA** — already names `68d9b20`; Lane 0 lands the advance; this lane verifies the doc reflects post-advance state.
5. **`§9` keyframes.js** — already refreshed in D's substrate authoring (B's "6 gaps" framing was stale; keyframes.js is code-side contract-v2 compliant at `0909177`; only precept-pin off-target). Confirm.

**Sub-gate B**: `coordination/Q.md §3` reflects the 7-addition metaballs surface + the aurora algorithm sketch + 16-instance BlobDot count; `§6` records the post-Lane-0 SHA; `§9` carries the refreshed keyframes.js framing; no row is silently stale.

## File bounds

| Lane | Files |
|---|---|
| 0 | `docs/precepts` (submodule pointer) |
| A | `docs/tranches/D/audit/D.W0-state-at-open.md` (new) |
| B | `docs/tranches/D/coordination/Q.md` (verify / minor reconciliation only; the substrate authoring already encoded the refresh) |

## Gate

The conjunction of sub-gates 0 + A + B + a single 1280×800 light boot probe. `vue-tsc` ≤ 126 unchanged; `vitest` 1409; smoke 3/3.

## Verification artefacts

`audit/D.W0-state-at-open.md`, `audit/D.W0-playwright/` (one boot capture), the precept advance commit hash, the coord-refresh commit (if any reconciliation lands beyond the substrate).

## Commit plan

- `chore(precepts): advance shared submodule to 68d9b20 (contract-v2 codification)` — Lane 0.
- `docs(tranche-d/w0): state-at-open + coord/Q.md refresh confirm` — Lanes A + B (one commit; both are docs-only).

## Dependencies

- Depends on: D open.
- Blocks: every subsequent D wave (the contract-v2 advance is foundational for D.W1; the state-at-open baseline is the W6 close reference).
