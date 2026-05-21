# G.W4 HEADLINE close — `FINAL.md` + merge + v0.9.0 tag

**Opens after**: G.W3 close.
**Agents**: read-only close audit — 7 lanes per the E.W5 / F.W4 close-ceremony pattern.
**Status**: planned.

## Scope

Close ceremony for tranche G. Mirrors F.W4's shape. v0.9.0 release-blocking wave.

## Read-only close audit lanes (7)

1. **plan-vs-actual** — every G wave's planned scope against what landed; `PROGRESS.md` matches reality. Zero `planned` rows.

2. **substrate-without-consumer** — G introduces:
   - The 7 new color sub-modules (G.W1 Lane B) — consumers: the barrel + internal imports.
   - The 4 new typed wrappers (G.W2 Lanes A-D) — consumers: the call sites they replaced.
   - The 4 new proof scripts (G.W3 Lanes A-D) — consumers: CI workflow + invariant enforcement.
   - The withTransaction-expanded routes (G.W3 Lane E) — consumers: existing endpoints.
   - The mobile-walk spec (G.W3 Lane G) — consumer: smoke-mobile CI project.
   Verify each has a consumer.

3. **doc-drift** — `CLAUDE.md`, `demo/CLAUDE.md`, `api/CLAUDE.md`, wave specs against the shipped tree. Particularly: any drift from G.W1 Lane B (color/utils.ts decomposition — root CLAUDE.md's src/ structure block needs update).

4. **idiomatic-gestalt** — G1 (relay-before-ratification — verify by reading the open commit + the user's ratification response in the chat log), G2 (`as any` ≤ 5 in src/), G3 (color/utils.ts decomposed; ≤ 7 modules; ≤ 350 LoC each), G4 (4 proof scripts at HEAD); inherited F1-F4 + E1-E5 + D1-D7 + precept 30-33 all hold.

5. **performance** — bundle size after G.W2 typed strengthening (typed wrappers should be byte-equivalent or smaller after tree-shaking). Bench medians stay above gates. DIRECT_PATHS bench must remain ≥ 2× — verify Lane B didn't pessimize JIT.

6. **visual-runtime** — Playwright re-probe across all 5 projects + the new mobile-walk spec. Total spec count ≥ 36.

7. **integrity sweep** — `git reflog` since G open for unauthorized agent-attributed mutating git operations; `git stash list` clean; `docs/precepts` unchanged; **G-NEW**: verify ZERO cross-repo writes in G window (no keyframes.js push without explicit user authorization).

## Close ceremony

1. **`docs/tranches/G/FINAL.md`** — close report citing every G commit, gate evidence, v0.9.0 release surface (BREAKING decision from G.W2 Lane C), bench medians, smoke + mobile-walk coverage, no-cross-repo-writes verdict. Pin F's FINAL SHA (`6b3a41b` merge + tag `v0.8.0`).
2. **Reconcile `PROGRESS.md`**.
3. **Pin `docs/precepts` SHA** (`68d9b20` if unchanged upstream; document hold otherwise).
4. **Update `coordination/Q.md` §7** with final state at G close.
5. **Update root `CLAUDE.md`** — src/units/color/ structure block reflects 7-module split; `as any` budget gate note.
6. **`demo/CLAUDE.md`** — no expected changes (demo untouched in G).
7. **`api/CLAUDE.md`** — withTransaction-expansion note (G.W3 Lane E).
8. **CHANGELOG.md** — v0.9.0 entry per G.W2 Lane C BREAKING decision (lone BREAKING or none).

## Merge + release ceremony (v0.9.0)

G ships as **v0.9.0** — minor bump per semver (BREAKING decision at G.W2 Lane C).

### Pre-merge gate matrix (18 items — extends F's 14)

F's 14 + 4 G-NEW:

1-14: inherited from F.W4 §"Pre-merge gate matrix".
15. **G-NEW: `npm run proof:no-deprecated`** GREEN.
16. **G-NEW: `npm run proof:no-ts-ignore`** GREEN.
17. **G-NEW: `npm run proof:as-any-budget`** GREEN (count ≤ 5).
18. **G-NEW: `npm run proof:resolution` extended types-key probe** GREEN.

### Merge sequence

Per F.W4.md shape:

```
git checkout master
git pull --ff-only origin master
git checkout tranche-g
git rebase master                        # likely no-op (G branched off post-F-merge master)
git checkout master
git merge --no-ff tranche-g -m "Merge tranche-g into master — Tranche G close (v0.9.0)"
git tag -a v0.9.0 -m "v0.9.0 — G close (...)"
git push origin master --follow-tags
```

### Post-merge

- Delete `tranche-g` branch.
- Re-evaluate next-tranche candidates:
  - glass-ui primitive-expansion (if glass-ui's contraction posture inverts).
  - keyframes.js precept-pin reconciliation.
  - CW Phase-2 (if user signals + speedtest CW Phase-2 ships).

## File bounds

| Lane | Files |
|---|---|
| Close audit | All G + F + E + D + B + A docs — read-only |
| Close ceremony writes | `docs/tranches/G/FINAL.md` (new), `docs/tranches/G/PROGRESS.md`, root `CLAUDE.md`, `api/CLAUDE.md`, `docs/tranches/G/coordination/Q.md` (final state), `CHANGELOG.md` (v0.9.0 entry), `package.json` (version 0.8.0 → 0.9.0) |

## Gate

Conjunction of 7 close-audit lanes + close-honesty checklist + 18-item pre-merge gate matrix.

## Commit plan

- `audit(tranche-g/w4-close): 7 read-only close lanes + integrity sweep`
- `docs(tranche-g/w4-close): FINAL.md + PROGRESS + CLAUDE.md updates + coordination/Q.md final state`
- `chore(release): v0.9.0 — G close ceremony + version bump`
- `Merge tranche-g into master — Tranche G close (v0.9.0)` (no-ff merge commit)
- `v0.9.0` tag annotated + pushed.

## Dependencies

- Depends on: G.W3.
- Blocks: nothing — G.W4 is the close.
