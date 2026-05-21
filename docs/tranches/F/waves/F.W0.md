# F.W0 HEADLINE — Open: state-at-open + W8-W12 back-reference + gh-pages unblock + coord refresh

**Opens after**: F open (this commit + the 6-lane audit).
**Lanes**: 4 — A (gh-pages unblock — `Github` lucide alias fix), B (W8-W12 back-reference doc), C (state-at-open gate matrix), D (coord refresh — verify peer-state at F open).
**Status**: planned.

## Scope

F opens against the post-W12 consumer-lockstep state at HEAD `e1549e0`. Three things happen before any structural work: the one chronic (`build:gh-pages` blocked by missing `Github` lucide icon) gets unblocked; the W8-W12 work gets a value.js-side back-reference doc (per F-AUDIT-3 §6); the gate baseline is captured; the cross-repo state is re-verified at the actual peer HEADs.

### Lane A — `Github` lucide alias-hygiene fix (gh-pages unblock)

Per F-AUDIT-3 §3 + F-AUDIT-5 §5.1: W9-C renamed `lucide-vue-next` → `@lucide/vue` but punted alias hygiene. 2 demo files in `demo/@/components/custom/dock/menus/` still import `Github` which does NOT exist in `@lucide/vue` (the icon was renamed; verify the W9-C commit body for the rename mapping).

1. **Locate the 2 files** via grep: `grep -rn "from ['\"]@lucide/vue['\"]" demo/@/components/custom/dock/menus/`. Identify the `Github` imports.
2. **Determine the rename**:
   - Check `@lucide/vue`'s exported names: `node -e "console.log(Object.keys(require('@lucide/vue')))" | tr ',' '\\n' | grep -i 'git'` or similar.
   - The renamed name is likely `Github24` or `GitBranch` or `Brand` family — depends on `@lucide/vue`'s naming scheme.
   - Choose the most semantically correct substitute.
3. **Apply the fix** in the 2 files: update the import + update the template references.
4. **Verify**:
   - `npm run gh-pages 2>&1 | tail -10` exits 0 (was failing on missing `Github`).
   - `npm run build 2>&1 | tail -10` exits 0 (was passing).
   - `npx vue-tsc --noEmit 2>&1 | grep -c 'error TS'` — should drop from 120 to ≤ 118 (2 errors closed).

**Sub-gate A**:
- 2 demo files migrated off the missing `Github` symbol.
- `build:gh-pages` GREEN.
- vue-tsc count drops by 2 (record exact pre/post).

### Lane B — W8-W12 back-reference doc

Per F-AUDIT-3 §6 + F-AUDIT-1 §5 + F4 invariant: value.js's `docs/tranches/` lacks an entry for the W8-W12 consumer-lockstep work. Author a back-reference at `docs/tranches/F/W8-W12-consumer-lockstep.md`:

```markdown
# value.js — W8-W12 consumer LOCKSTEP of speedtest tranche AI § 11

**Authority**: `/Users/mkbabb/Programming/speedtest/docs/tranches/AI/{AI,FINAL}.md`.
**Window**: 2026-05-20 20:16-21:29 EDT. 8 commits direct to master (`47399c2..e1549e0`).
**value.js role**: CONSUMER, not author.
**Posture (per F4)**: value.js-side back-reference doc, no full tranche envelope.

## Commit inventory

| SHA | Lockstep wave | Summary |
| 1fafd5d | W8-β | npm install re-baseline (lockfile self-version 0.6.0 → 0.7.0) |
| 4cd8d15 | W8-β | 23 SAFE-PATCH + SAFE-MINOR devDep bumps (C2 Group B.1 + B.2) |
| 442aba1 | W9-A | lift vue-tsc ^2.2.0 → ^3.3.1 |
| 02ed508 | W9-C | rename lucide-vue-next → @lucide/vue (alias-hygiene punt — see F.W0 Lane A) |
| 209584c | W9-F+H | lift @types/node ^24.12.3 + vaul-vue ^0.4.0 |
| 08a7f96 | W10-β | Vite 7 → 8 + Rolldown (BREAKING bundler swap) |
| 9f56813 | W12-β | TypeScript 5 → 6 |
| e1549e0 | W12-unblocker | dts emission at flat dist/ via entryRoot: src |

## Gate impact verdict (per F-AUDIT-3)

(... transcribe F-AUDIT-3 §3 gate matrix here ...)

## Carried chronics

(... `Github` lucide alias-hygiene punt; `--legacy-peer-deps` install flag if any ...)

## F1 verdict

W8-W12 introduced ONE chronic (`Github`-icon gh-pages blocker — closed at F.W0 Lane A) + opened 2-3 new transposition opportunities (folded into F.W1).

## Authority

Pinned: F-AUDIT-3 + speedtest's AI tranche FINAL.md + this doc.
```

**Sub-gate B**:
- `docs/tranches/F/W8-W12-consumer-lockstep.md` authored with the above structure.
- Cross-references F-AUDIT-3 + speedtest's AI tranche.

### Lane C — State-at-open gate matrix

Capture full baseline at HEAD `e1549e0` post-Lane-A (after gh-pages unblock):

1. `npm run lint` — exit 0.
2. `npx vue-tsc --noEmit 2>&1 | grep -c 'error TS'` — expect 118 post-Lane-A (was 120; -2 from Github fix).
3. `npx vitest run` — expect 1584 / 34.
4. `npx playwright test --reporter=line 2>&1 | tail -5` — expect 36/36.
5. `npm run build` — clean. Record `dist/value.js` size.
6. `npm run gh-pages` — clean post-Lane-A.
7. `npm run proof:resolution` — GREEN.
8. `node bench/color-channel-access.mjs` — record median (≥ 5×).
9. `node bench/color2-direct-paths.mjs` — record (≥ 2× HSL→RGB).
10. `node bench/parser-namelookup.mjs` — record (≥ 5×).
11. `cd api && npx tsc --noEmit && npx vitest run` — clean + 104/20.

Record in `audit/F.W0-state-at-open.md`.

**Sub-gate C**: All gates match expectations (or DRIFTS documented).

### Lane D — Coord refresh (peer-state re-verification at F.W0 dispatch)

Per F-AUDIT-4, peer SHAs were captured at F open dispatch time. Re-verify at F.W0 dispatch (the SHAs may have drifted since):

1. `git -C /Users/mkbabb/Programming/glass-ui log -1 --format='%H %ci %s'`. Compare to recorded `5b81866`.
2. `git -C /Users/mkbabb/Programming/keyframes.js log -1 --format='%H %ci %s'`. Compare to recorded `d312517`. CONFIRM both lerp call sites still unmigrated (re-read `numeric.ts:159` + `group.ts:251`).
3. `git -C /Users/mkbabb/Programming/speedtest log -1 --format='%H %ci %s'`. Compare to recorded `30f7f555`.
4. `git -C /Users/mkbabb/Programming/fourier-analysis log -1 --format='%H %ci %s'`. Compare to recorded `926ca6a`.
5. Precepts pin: `git -C /Users/mkbabb/Programming/value.js submodule status docs/precepts`. Compare to recorded `68d9b20`.

Record any drift in `audit/F.W0-coord-refresh.md` + propose `coordination/Q.md §1` updates (orchestrator integrates).

**Sub-gate D**: Peer-state recorded; any drift documented + Q.md updates proposed.

## File bounds

| Lane | Files |
|---|---|
| A | 2 demo files in `demo/@/components/custom/dock/menus/` (Github icon migration), `audit/F.W0-lane-a-gh-pages-unblock.md` (new) |
| B | `docs/tranches/F/W8-W12-consumer-lockstep.md` (new) |
| C | `audit/F.W0-state-at-open.md` (new) |
| D | `audit/F.W0-coord-refresh.md` (new) |

## Gate

Conjunction of sub-gates A + B + C + D. Wave-level: `vue-tsc` ≤ 120 (post-Lane-A: ≤ 118); `vitest` 1584; smoke 36/36; lint exit 0; proof:resolution GREEN; build + gh-pages clean; bench medians ≥ gates.

## Verification artefacts

`audit/F.W0-lane-a-gh-pages-unblock.md`, `audit/F.W0-state-at-open.md`, `audit/F.W0-coord-refresh.md`, `docs/tranches/F/W8-W12-consumer-lockstep.md`.

## Commit plan

- `fix(demo/w0): migrate dock-menu Github icon off W9-C @lucide/vue rename (closes gh-pages chronic)` — Lane A.
- `docs(tranche-f/w0): state-at-open + W8-W12 back-reference + coord refresh + gh-pages unblock evidence` — Lanes B + C + D.

## Dependencies

- Depends on: F open (this audit substrate authoring).
- Blocks: F.W1 (post-W12 transpositions land on the F.W0 gate-baseline).
