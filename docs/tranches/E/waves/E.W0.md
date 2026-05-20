# E.W0 HEADLINE — Open: glass-ui `./styles.css` adoption + state-at-open + chronically-deferred fold-confirm + coord refresh

**Opens after**: E open (this commit + the 6-lane audit).
**Lanes**: 3 — A (glass-ui `./styles.css` adoption + `siblingFsAllowTransient` retire-or-narrow), B (state-at-open + chronically-deferred fold-confirm), C (coord refresh — verify peer-state at E open).
**Status**: planned.

## Scope

E opens against the D close + the v0.6.0 merge. Three things happen before any structural work: the glass-ui `./styles.css` ship is consumed (closing D's keystone-gap workaround); the state-at-open + the chronically-deferred ledger are confirmed clean; the cross-repo state is re-verified at the actual peer HEADs.

### Lane A — glass-ui `./styles.css` adoption + `siblingFsAllowTransient` retire-or-narrow

Per `E-AUDIT-4 §2`, glass-ui shipped `9275584` adding `"./styles.css": "./dist/glass-ui.css"` — the SFC-scoped compiled surface. This is the highest-priority near-term E win (cited in `findings.md AUD-4.1 + AUD-2.7`).

1. **Inspect the demo's current `@mkbabb/glass-ui/styles` consumption** at `demo/@/styles/style.css:3`. Identify what the Tailwind-source surface provides vs what the new compiled surface provides.
2. **Add `@import "@mkbabb/glass-ui/styles.css";`** at the appropriate place in `demo/@/styles/style.css` (preserves the Tailwind-source import; ADDS the SFC-scoped surface). The two are orthogonal distribution mechanisms per glass-ui commit `9275584`'s message.
3. **Verify the demo renders the post-consumption state** — boot probe at 1280×800 light + dark; assert the SFC-scoped surface is reachable (visual probe vs the post-D baseline; expect zero pixel-drift OR documented drift).
4. **Decide `siblingFsAllowTransient`'s fate**:
   - If the Tailwind-source `./styles` import (line 3 in `demo/@/styles/style.css`) still requires font-asset resolution through the symlink, the widening must STAY (narrower-but-documented). Record the residual rationale inline.
   - If the SFC-scoped surface absorbs the font-asset paths (verify by checking what `dist/glass-ui.css` includes), the widening can RETIRE.
5. **Update `vite.config.ts`'s inline comment** to reflect the post-adoption reality + the residual (if any).
6. **Update `coordination/Q.md §3`** — mark the contract-v2 §2.1 keystone gap as FULLY MITIGATED (if widening retired) or NARROWED (if widening kept with sharpened rationale).

**Sub-gate A**:
- `demo/@/styles/style.css` imports both `@mkbabb/glass-ui/styles` (Tailwind source) AND `@mkbabb/glass-ui/styles.css` (compiled SFC-scoped).
- The boot probe shows zero console errors + zero pixel-drift (or documented).
- `vite.config.ts` carries either zero `siblingFsAllowTransient` (full retirement) OR the narrowed widening with updated inline rationale.
- `coordination/Q.md §3` reflects the post-adoption state.

### Lane B — state-at-open probe + chronically-deferred fold-confirm

1. **Confirm D close is clean**:
   - `docs/tranches/D/FINAL.md` exists.
   - D's `PROGRESS.md` shows zero `planned` rows.
   - `v0.6.0` tag exists and points at the close-ceremony commit `7ac4ecc`.
   - master HEAD at `eae8afc` (the D-merge commit).
   - `git stash list` empty.
2. **Run the E-open gate matrix** as a baseline:
   - `npx vue-tsc --noEmit 2>&1 | grep -c 'error TS'` — expect **126** (the residual generated shadcn-vue cluster).
   - `npx vitest run` — expect **1582 passing across 34 files**.
   - `npx playwright test` (all 3 projects) — expect **21/21 green** in ≤ 12 s.
   - `npm run lint` — exit 0.
   - `npm run proof:resolution` — GREEN.
   - `npm run build` — clean; record `dist/value.js` size + gzip.
   - `node bench/color-channel-access.mjs` 3x — record medians (≥ 5×).
3. **Chronically-deferred fold-confirm** — `findings.md §2` enumerates 10 FOLD-INTO-E items + 3 RETIRE items. For each, verify the item is correctly stated:
   - **A-11 ConfigSliderPane** — verify `demo/@/components/custom/panes/ConfigSliderPane.vue` already adopts `@mkbabb/glass-ui/configurator` (per D.W3 Lane A audit). If yes, mark RETIRED.
   - **A-14..A-18 5 historical doc-drift** — verify `docs/tranches/A/findings.md` for stale-SHA / phantom-citation residuals. Note which need E.W5 close-audit treatment.
   - **B-01 + B-07 vendor policy** — confirm the ~126 generated shadcn-vue typecheck cluster persists at master HEAD (`npx vue-tsc --noEmit 2>&1 | grep -c 'error TS'` = 126 still).
   - **D-03 smoke-safari** — confirm `playwright.config.ts` does NOT yet have a `smoke-safari` project (correct — E.W3 adds).
   - **AUD-4.7 keyframes.js precept-pin drift** — confirm by reading `git -C /Users/mkbabb/Programming/keyframes.js submodule status docs/precepts`.
4. **Record** in `audit/E.W0-state-at-open.md`.

**Sub-gate B**:
- The E-open gate matrix matches expected (126 / 1582 / 21 / lint 0 / proof:resolution GREEN / build clean / bench ≥ 5×).
- The chronically-deferred ledger (`findings.md §2`) verified item-by-item.
- D close clean (FINAL.md + tag + master HEAD).

### Lane C — coord refresh (peer-state verification at E open)

`coordination/Q.md` was authored from `E-AUDIT-4`. Re-verify at actual peer HEADs:

1. **Glass-ui** — `git -C /Users/mkbabb/Programming/glass-ui log -1 --format=%H` should match `66e9b8f` (or whatever HEAD is at E.W0 dispatch time). Re-verify the 5 post-Q-close commits + the `./styles.css` ship.
2. **Keyframes.js** — `git -C /Users/mkbabb/Programming/keyframes.js log -1 --format=%H` should match `0909177`. Re-verify the precept-pin drift.
3. **Speedtest** — `git -C /Users/mkbabb/Programming/speedtest log -1 --format=%H` should match `9d22bcdf`. Re-verify CW seed at `61079cb1`.
4. **Fourier-analysis** — `git -C /Users/mkbabb/Programming/fourier-analysis log -1 --format=%H` should match `926ca6a`. Re-verify the 109-file dirty tree.
5. **Precepts** — confirm value.js's pin at `68d9b20`; confirm no upstream commits after `68d9b20`.

**Sub-gate C**: `coordination/Q.md §2-§8` reflects the actual peer HEADs at E.W0 dispatch time. Any drift between the audit-doc-recorded SHA and the actual HEAD is noted with explicit reconciliation.

## File bounds

| Lane | Files |
|---|---|
| A | `demo/@/styles/style.css` (add `./styles.css` import), `vite.config.ts` (retire-or-narrow `siblingFsAllowTransient` + update inline comment), `docs/tranches/E/coordination/Q.md` (§3 update) |
| B | `docs/tranches/E/audit/E.W0-state-at-open.md` (new) |
| C | `docs/tranches/E/coordination/Q.md` (minor reconciliation only) |

## Gate

The conjunction of sub-gates A + B + C + a single 1280×800 light boot probe + a dark-mode boot probe. `vue-tsc` ≤ 126 unchanged; `vitest` 1582; smoke + smoke-admin + smoke-mobile all green.

## Verification artefacts

`audit/E.W0-state-at-open.md`, `audit/E.W0-playwright/` (light + dark boot captures + the post-`./styles.css`-adoption rendered surface), the coord-refresh confirm.

## Commit plan

- `feat(demo/w0): adopt @mkbabb/glass-ui/styles.css subpath (closes D contract-v2 §2.1 keystone gap; siblingFsAllowTransient ___)` — Lane A. (Verb in commit message reflects the retire-or-narrow decision.)
- `docs(tranche-e/w0): state-at-open + chronically-deferred fold-confirm + coord/Q.md peer-HEAD refresh` — Lanes B + C.

## Dependencies

- Depends on: E open (this audit-substrate authoring).
- Blocks: every subsequent E wave (the `./styles.css` adoption is foundational for E.W1+).
