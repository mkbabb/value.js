# H.W5 HEADLINE close — `FINAL.md` + merge + tag

**Opens after**: H.W4 close.
**Agents**: read-only close audit — 7 lanes per the F.W4 / G.W4 close-ceremony pattern.
**Status**: planned.

## Scope

Close ceremony for tranche H. Mirrors G.W4's shape. Release-blocking wave.

## Read-only close audit lanes (7)

1. **plan-vs-actual** — every H wave's planned scope against what landed; `PROGRESS.md` matches reality; zero `planned` rows.
2. **substrate-without-consumer** — every H artefact has a live consumer (the 1 new proof script wired in CI; the 2 scope-extended proofs cover their declared trees; the decomposed `demo/@/lib/palette/api/` modules are imported; the withTransaction-coverage audit-list is referenced).
3. **doc-drift** — `CLAUDE.md`, `demo/CLAUDE.md`, `api/CLAUDE.md`, `README.md`, `CONTRIBUTING.md`, `docs/RELEASE.md`, wave specs against the shipped tree. Particularly the demo decomposition.
4. **idiomatic-gestalt** — H1 (cascade-correctness — verified via the coverage audit-list), H2 (`as unknown as` ≤ 3 in src/ — proof:as-unknown-as-budget green), H3 (no demo god module — every `demo/` file ≤ 400 LoC), H4 (proof scripts cover their declared trees); inherited G1-G4 + F1-F4 + E1-E5 + D1-D7 + precept 30-33 all hold.
5. **performance** — bundle size after Lane A Rolldown strip; bench medians stay above gates. DIRECT_PATHS HSL→RGB ≥ 2×; L8 ≥ 5×; nameParser ≥ 5×.
6. **visual-runtime** — Playwright re-probe across 5 projects; total spec count ≥ 36; the reactivity-instant flake mitigation (H.W4 Lane C) verified deterministic.
7. **integrity sweep** — `git reflog` since H open for unauthorized agent-attributed mutating git operations; `git stash list` clean; `docs/precepts` unchanged; **H-NEW (inherited from G)**: verify ZERO cross-repo writes in H window.

## Close ceremony

1. **`docs/tranches/H/FINAL.md`** — close report citing every H commit, gate evidence, vN.N.N release surface (no BREAKING expected), bench medians, smoke coverage, no-cross-repo-writes verdict. Pin G's FINAL SHA (`e166d37` merge + tag `v0.9.0`).
2. **Reconcile `PROGRESS.md`**.
3. **Pin `docs/precepts` SHA** (`68d9b20` if unchanged upstream; document hold otherwise).
4. **Update `coordination/Q.md` §7.1** with final state at H close (mirroring G's pattern).
5. **Update root `CLAUDE.md`** — H1-H4 mention if the structure block needs an update; `as unknown as` budget gate note; reference to `docs/RELEASE.md`.
6. **`demo/CLAUDE.md`** — adjust for H.W3 Lane A (demo/lib/palette/api/ split) + Lane B (any god-module remediation).
7. **`api/CLAUDE.md`** — H.W1 Lane A (createPalette/patchPalette withTransaction); the standing reference at `docs/tranches/H/audit/api-withTransaction-coverage.md`.
8. **CHANGELOG.md** — vN.N.N entry. v0.10.0 default; v1.0.0 if Block-E (ii) ratified.
9. **`docs/tranches/H/I-SEED.md`** — predecessor-authored forward-carry ledger for tranche I (mirroring G's H-SEED.md shape).
10. **`README.md`** — minor structure-block refresh if H changed the `src/` or `demo/` shape materially.
11. **`CONTRIBUTING.md`** — already updated at H.W4 Lane E.

## Merge + release ceremony (vN.N.N)

H ships as **vN.N.N** — per Block-E ratification:
- (i) v0.10.0 — idiomatic semver-minor bump (default).
- (ii) v1.0.0 — declare stable public API.

### Pre-merge gate matrix (22 items — G's 21 + 1 H-NEW)

G's 21 inherited + 1 H-NEW:

1-21: inherited from G.W4 §"Pre-merge gate matrix".
22. **H-NEW: `npm run proof:as-unknown-as-budget`** GREEN (count ≤ 3).

Plus scope-extensions to existing gates (no new gate item, just broader coverage):
- `proof:no-bare-builtins` now covers `api/src/` + `plugins/` + `scripts/` + `bench/`.
- `proof:no-ts-ignore` now covers `src/` + `demo/`.

### Merge sequence

Per G.W4.md shape:

```
git checkout master
git pull --ff-only origin master
git checkout tranche-h
git rebase master                        # likely no-op
git checkout master
git merge --no-ff tranche-h -m "Merge tranche-h into master — Tranche H close (vN.N.N)"
git tag -a vN.N.N -m "vN.N.N — H close (...)"
git push origin master --follow-tags
```

### Post-merge

- Delete `tranche-h` branch.
- Re-evaluate next-tranche candidates (forward-carry seed at `docs/tranches/H/I-SEED.md`):
  - glass-ui primitive-expansion (if glass-ui's contraction posture inverts).
  - keyframes.js precept-pin reconciliation + R11 push.
  - useMetaballRenderer migration to `@mkbabb/glass-ui/metaballs` (gated on Metaballs sub-asks).
  - api/ further decomposition if any service exceeds 400 LoC at I open.

## File bounds

| Lane | Files |
|---|---|
| Close audit | All H + G + F + E + D + B + A docs — read-only |
| Close ceremony writes | `docs/tranches/H/FINAL.md` (new), `docs/tranches/H/PROGRESS.md`, `docs/tranches/H/I-SEED.md` (new), root `CLAUDE.md`, `demo/CLAUDE.md`, `api/CLAUDE.md`, `README.md`, `docs/tranches/H/coordination/Q.md` (§7.1 G-close pattern), `CHANGELOG.md` (vN.N.N entry), `package.json` (version 0.9.0 → vN.N.N) |

## Gate

Conjunction of 7 close-audit lanes + close-honesty checklist + 22-item pre-merge gate matrix.

## Commit plan

- `audit(tranche-h/w5-close): 7 read-only close-audit lanes + integrity sweep`
- `docs(tranche-h/w5): resolve close-audit doc drift (if any)`
- `docs(tranche-h/w5-close): FINAL.md + I-SEED + close-ceremony docs`
- `chore(release): vN.N.N — H close ceremony + version bump`
- `Merge tranche-h into master — Tranche H close (vN.N.N)` (no-ff merge commit)
- `vN.N.N` tag annotated + pushed.

## Dependencies

- Depends on: H.W4.
- Blocks: nothing — H.W5 is the close.
