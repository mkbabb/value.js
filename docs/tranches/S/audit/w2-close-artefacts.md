# S.W2 — close artefacts (2026-07-05)

**Verdict: CLOSE.** The §Hard gate (SYNTHESIS §5, transcribed in `waves/S.W2.md`) certified
across a three-step chain, every row verified in the amended tree by an independent verifier
(never a lane's word):

1. **Main-run gate @ `1d2aea1`: BLOCKED** — 3 FAILs (DevMisconfigBanner direct `apiAvailability`
   import · the undelivered `savedColors` narrowing (4 casts relocated, not killed) · no
   committed W2-3 decision artefact) + 1 pre-existing blocker (31 vue-tsc errors in
   `BlobPane.vue`, glass-ui producer drift). 7 rows already PASS.
2. **Remediation (`c5e6f4d`→`e1c8237`) → re-gate @ `e1c8237`: 9 PASS + row-6 FAIL** — the
   typed-narrowing fix pushed `useColorPipeline.ts` to 416 LoC (over its own ≤400 cap; a
   remediation-introduced regression no automated check flags — the cap is review-enforced).
3. **Decompose (`99dcb5e`) — row 6 cured**: persistence lifted to a sibling
   `useColorPersistence.ts` (seed-rider-1-sanctioned shape; a genuine concern boundary — the
   whole localStorage read/write/restore lifecycle + `PersistedColorState`). 341 + 121 LoC,
   zero consumer churn; clean-worktree verify: lint 0 · typecheck 0 · vitest 2080/2080 ·
   URL-precedence e2e 2/2. Row 6 independently re-spot-checked by the orchestrator (wc -l;
   repo-wide >400 sweep over demo/ excl. ui/ → none).

## Gate-row record (final standing)

| Row | Standing | Evidence |
|---|---|---|
| 1 URL-color e2e | PASS | `e2e/smoke/url-color-precedence.spec.ts` 2/2 — URL-wins (hash 260 beats stored 145 across readout+trigger+`--accent-live`) + the rider-3 gated restore. Standing suite member. |
| 2 · 0 direct `apiAvailability` imports | PASS | Only in-module lines (`useApiClient.ts:20` + barrel); DevMisconfigBanner migrated to the seam @ `c5e6f4d`. |
| 3 · 0 `Context` under `services/` | PASS | grep 0 across `api/src/services/`; W2-8 `Services`-in sweep @ `dc9f1cb`. |
| 4 · 0 `savedColors` casts | PASS | `ParsedColorUnit[]` landed @ `87dd7d2`; type-predicate narrowing; the store retyped as the `PersistedColorState` serialized projection (the genuine hole the casts masked). |
| 5 suites | PASS | typecheck 0 (BlobPane cure `fb45d96`: `-?` on the inner mapped type — glass-ui grew optional nested atoms (`satelliteColors?`), the homomorphic map leaked `undefined`; producer NOT defective, no letter) · vitest 2080/2080 · playwright smoke green. |
| 6 · no new file >400 LoC | PASS | `useColorPipeline.ts` 341 · `useColorPersistence.ts` 121 @ `99dcb5e`. |
| 7 api | PASS | `tsc --noEmit` 0 · api suite 224/224 (baseline holds). |
| 8 palettes-pane display | PASS | canonical per-space `toFormattedString` `savedColorStrings` (rider 4 winner) feeds the pane; diverged twin deleted. |
| 9 W2-3 decision | PASS | DECLINED-mechanical, committed record `audit/w2-3-brand-decision.md` + the S.md §7 re-book row (src-owned, post-W1). |
| 10 W2-7 router | PASS | vue-router `^5.1.0`, code-free bump per the W0-7 probe (the wave-doc anchor `demo/package.json:167` was stale — no demo/package.json exists; root `package.json:158`); boot-smoke cold green. K-W5RT: FIRED → FOLDED → LANDED. |

## Per-unit commits

- **pipeline (W2-1 + e2e)**: `94e3e43` (useColorPipeline spine) · `7cdbef1` (URL-precedence e2e)
- **DI (W2-4/5/6/9)**: `fcc6b7d` · `aa7b2bc` · `abb03b4` · `c5530db`
- **api (W2-8)**: `dc9f1cb`
- **LAST**: `f6a34fa` (W2-7 router) · `1d2aea1` (W2-2 accent — consumed W1-6's
  `safeAccentCssString` @ `a26f87e`, the cross-wave sequencing law honored)
- **remediation**: `c5e6f4d` (banner DI) · `fb45d96` (BlobPane) · `3e1046c` (sibling-race
  repair: W1's color-names lift missed the one demo importer) · `87dd7d2` (savedColors) ·
  `e1c8237` (W2-3 record) · `99dcb5e` (row-6 decompose)

## Notes of record

- **W2-1 spine**: `useColorModel.ts` + `useAppColorModel.ts` DELETED; ColorPicker.vue took the
  minimal model-seam swap only (`inject(COLOR_MODEL_KEY)`; the seed's core move — structural
  recomposition stays W4-2's, single-writer law intact); stableHue preserved bit-for-bit via
  the `lastWrittenModel` sentinel; the legacy localStorage write persisted normalized garbage —
  now persists the parseable display string (store was write-only, no consumer depended on it).
- **W2-3 re-book**: the Normalized/Display brand is a runtime-flag redesign (~58 callsites),
  not a brand-and-cast — booked src-owned, sequenced after W1's color-tree settles.
- Vitest count at close: **2080** (64 files) — the count drifts; this doc is the wave-close
  authority. Full 5-project playwright: 42 passed at the main-run gate; desktop smoke +
  targeted specs re-run at each remediation step (untouched-surface rationale recorded).
