# B.W4 HEADLINE close — Strengthened close + doc drift + Q.md + A-residuals

**Opens after**: B.W3 close.
**Agents**: read-only close audit — 7 lanes per the precept close-ceremony pattern (`precepts/SPEC §Close`).
**Status**: planned.

> **Hardening note (2026-05-19).** This was B.W5. Renumbered (six waves → five). The wave-structure hardening audit kept the close ceremony intact — its seven read-only lanes are a precept policy, not over-fit.

## Scope

The close ceremony for Tranche B. Read-only audit lanes per `precepts/SPEC §Close`. Adapts the structure A.W7.md drafted but never ran.

### Read-only close audit lanes

1. **plan-vs-actual** — every B wave's planned scope against what landed; PROGRESS.md matches reality.
2. **substrate-without-consumer** — `usePaneRouter.ts` (new) and the `e2e/smoke/` infrastructure (new) both have consumers. Per precept §8.
3. **doc-drift** — `CLAUDE.md` (test count 1372→1409, file count 24→26), `demo/CLAUDE.md`, `demo/DESIGN.md` (hero-lab TODO state after B.W2), `README.md` if any, A.md §8 (Ad-20/Ae-12/Ab-16 records).
4. **idiomatic-gestalt** — the demo's consumption of glass-ui after B's consolidations; verify no rebuilt-by-hand surface survived; invariants B1–B5 hold.
5. **performance** — bundle size after B.W2 consolidation (expected reduction from removed wrapper components); the goo-blob + aurora frame budget unchanged from W4 baseline.
6. **visual-runtime** — Playwright re-probe, binding ≥3 viewports light + dark, animation-frame samples on every state transition B introduced or modified (B.W1 dock pin + SpectrumCanvas/SwatchHoverMenu, B.W2 PaletteDialog tabs).
7. **integrity sweep** — `git reflog` since B open for unauthorized agent-attributed mutating git operations; `git stash list` clean across the primary tree and every worktree B used; `docs/precepts` shows exactly one expected submodule change — B.W0's advance `3310a8c` → `3c32fae` — and nothing further.

### Close ceremony

1. **`docs/tranches/B/FINAL.md`** — close report citing every B commit, the gate evidence, the Playwright artefacts, the disposition of every B finding (landed / retired-with-rationale / routed to coord/Q.md or named successor). Plus the A close reference (B.W0 closed A; B's FINAL pins A's FINAL.md SHA).
2. **Reconcile `PROGRESS.md`** — every B wave-log row shows `closed` with commit hashes; "Open dependencies" updated.
3. **Pin `docs/precepts` SHA** — B opened against `3310a8c` and B.W0 advanced the pin to `3c32fae` (glass-ui Q.W6's advance — invariants 30–33 + π-lane re-activation; `coord/Q.md §6`). FINAL.md pins `3c32fae` and confirms B ran under invariants 30–33 (invariant 33 on the B.W3 e2e deletion + B.W1 strip; invariant 32 on the strip; invariant 30 in B.W3's library audit; invariant 31 at the B.W0/B.W1 probes).
4. **Update `coordination/Q.md §3`** — final state of the standing/partial gaps at B close. Q is closed (`4b16de7`); the §2a re-verification (2026-05-19) is the authoritative ship-state — B.W4 confirms nothing shipped between that re-verification and B close, or records what did.
5. **Update `CLAUDE.md`** root — test count `1409 passed, 26 files`; file structure if changed by B.W2 consolidation; any inaccurate statements found in the doc-drift audit.
6. **A.md §8 records** — add the explicit retirement entries for Ad-20 (`SelectContent` width literals), Ae-12 (Aurora cursor seam), Ab-16 (PointerDebugOverlay dev-only colors). These were never formally recorded despite the close-honesty claim.
7. **Research letter renaming** — A's research dir has `Aa, Ab, Ad, Ae, Ag` with gaps at `Ac`/`Af`. Rename per `HARDEN-6 §4` to contiguous `Aa..Ae` (rename Ag→Ac). Update every cite in A's wave specs and audit docs.
8. **HARDEN-6 phantom citations** — fix `coordination/Q.md` and `dispatch/AGENT.md` citations to non-existent precept clauses (replace with the correct reference or remove).
9. **`api/` exclusion** — add a one-liner to `docs/tranches/A/findings.md §5` recording that `api/` (Hono + MongoDB backend) is explicitly out of scope.
10. **A↔Q contested boundary status** — `coord/Q.md §4` already records the resolution (the 2026-05-19 Q-close assay): Q closed, never wrote value.js, retired the contested lanes; the boundary is **MOOT**. B.W4 confirms `§4` reads correctly against Q's final state and B's `FINAL.md` cites it as a closed-state cross-repo item.

## File bounds

| Lane | Files |
|---|---|
| Close audit | All B + A docs — read-only |
| Close ceremony writes | `docs/tranches/B/FINAL.md` (new); `docs/tranches/B/PROGRESS.md`; `CLAUDE.md`; `docs/tranches/A/A.md` (§8 records); `docs/tranches/A/findings.md` (api note); `docs/tranches/A/coordination/Q.md` + `docs/tranches/A/dispatch/AGENT.md` (citation fixes); `docs/tranches/B/coordination/Q.md` (§3 final state); `docs/tranches/A/research/` (rename Ag→Ac); every A wave spec citing the renamed research file |

## Gate

Per `B.md §6`: the conjunction of the 7 read-only audit lanes' findings + the close-honesty checklist (`precepts/SPEC §Close`) + the visual-runtime re-probe. `docs/tranches/B/FINAL.md` exists and cites every B commit + the A close hash; B's wave-log shows zero `planned`; the integrity sweep is clean; `npm run build` + `npm test` + `npm run test:e2e -- --project=smoke` all green; the 10 doc-drift/coord items are committed.

## Verification artefacts

`audit/B.W4-*` (the 7 close-audit lane outputs), `audit/B.W4-visual-runtime/`, `docs/tranches/B/FINAL.md`, B.W4's close commit hash.

## Commit plan

- `audit(tranche-b/w4-close): 7 read-only close lanes + integrity sweep`
- `docs(tranche-a/close-residuals): records Ad-20/Ae-12/Ab-16 in §8, HARDEN-6 citation fixes, api note in §5, research renamed Ag→Ac`
- `docs(tranche-b/w4-close): FINAL.md + PROGRESS + CLAUDE.md test count + coordination/Q.md §3 update`

## Dependencies

- Depends on: B.W3.
- Blocks: nothing — B.W4 is the close.

## Note on the close

B's `FINAL.md` records the precept-bound truth: every finding from `research/Ba..Bζ` and the consolidated `research/B-e2e-investigation.md` either landed in a B wave, retired with rationale, or routed to a named cross-repo destination (the 7 standing glass-ui gaps → a glass-ui successor tranche; the ~104-error shadcn-vue generated cluster → a future generator-update / vendoring effort). No silent deferral. A's `FINAL.md` (written at B.W0) and B's `FINAL.md` together close the work the user opened with the turn-1 prompt.
