# H — findings (audit-to-wave mapping)

Synthesis of `audit/H-AUDIT-1..6` into the H wave plan.

## §1 — Audit summary table

| Audit | Headline finding | Target wave |
|---|---|---|
| H-AUDIT-1 (prompts + precepts) | 27 cumulative prompts (22 + 5 new); ALL precepts + invariants HOLD; **8 silent-gap candidates** surfaced; highest-value: **Gap #5 — demo/ god-module audit** (G3 was src/-only). | gaps fold into H.W3 (Gap #5) + H.W2 (Gap #1) + H.W4 (Gap #2) |
| H-AUDIT-2 (deferred ledger) | 22 H-disposition entries: 6 FOLD-INTO-H + 1 RETIRE + 10 PEER-AUTH + 5 CARRY + 1 INFO. **9 items at 6-tranche carry** (the 8 glass-ui asks + keyframes.js precept-pin); 4 at 5-tranche carry. Doubled-clause demands sharper disposition → 4-option ratification ask. | per-disposition routing to H.W1-H.W4 |
| H-AUDIT-3 (state-at-H-open) | All 15 gates PASS at HEAD `e166d37`. Bench L8 10.14× / DIRECT_PATHS 4.50× / nameParser 37.93× (all ≥ floors). Zero drift since G merge. | H.W0 baseline; H.W5 close compares |
| H-AUDIT-4 (cross-repo state) | **ZERO-mutation G→H boundary** across every sibling. **speedtest AL opened** same weekend (planning-only) — value.js is confirmed sole-identified-consumer of `glass-ui/MetaballCanvas`. 0-of-8 standing glass-ui asks shipped clean. 0 (c) triggers fired. | H W0 includes AL-coordination briefing; H ratification block A asks for the 4-option re-framing of the 9 chronic asks |
| H-AUDIT-5 (architecture) | 9 H-OPP candidates: XYZ_FUNCTIONS mapped-type (-1 as-unknown-as), proof:as-unknown-as-budget, demo/lib/palette/api.ts (484 LoC) split, demo/ god-module audit, withTransaction 7→9, Rolldown marker strip, proof:no-bare-builtins scope-ext, type-predicate narrowing, colorSpaceInfo lift. `Color<T>` deeper restructure REJECTED. Substrate cleaner than at G open. | H.W1 (cascade-correctness) + H.W2 (type-II) + H.W3 (demo-decomp+invariant-ext) + H.W4 (polish) |
| H-AUDIT-6 (api + e2e + CI) | **DEFECT**: createPalette + patchPalette miss withTransaction (orphan-version exposure class). 4-flag api/tsconfig strictness gap. `proof:as-unknown-as-budget` codification candidate. E2E reactivity 200ms flake mitigation candidate. CI release docs gap. | H.W1 (defect + tsconfig) + H.W2 (proof:as-unknown-as-budget) + H.W3 (close demo @ts-ignore) + H.W4 (e2e flake + CI docs) |

## §2 — Disposition routing (audit-to-wave cross-walk)

### Items addressed in H

| # | Item | Origin | H wave/lane |
|---|---|---|---|
| H1 | API-2: createPalette + patchPalette withTransaction (defect) | H-AUDIT-6 §3 | H.W1 Lane A |
| H2 | API-1: api/tsconfig.json strictness lift (4 flags) | H-AUDIT-6 §4 | H.W1 Lane B |
| H3 | withTransaction-coverage audit-list (standing reference) | H-AUDIT-5 + H-AUDIT-6 | H.W1 Lane C |
| H4 | H-OPP-1: typed XYZ_FUNCTIONS mapped-type (-1 as unknown as) | H-AUDIT-5 §src | H.W2 Lane A |
| H5 | H-OPP-2: proof:as-unknown-as-budget (≤ 3) — codifies H2 invariant | H-AUDIT-5 + H-AUDIT-6 | H.W2 Lane B |
| H6 | type-predicate narrowing normalize.ts:319 | H-AUDIT-5 §src | H.W2 Lane C |
| H7 | H-OPP-3: demo/@/lib/palette/api.ts (484 LoC) split into 8 modules | H-AUDIT-5 §demo | H.W3 Lane A |
| H8 | demo/ god-module audit + remediation (Gap #5) | H-AUDIT-1 Gap #5 + H-AUDIT-5 | H.W3 Lane B |
| H9 | colorSpaceInfo data lift from color-picker/index.ts | H-AUDIT-5 §demo | H.W3 Lane C |
| H10 | proof:no-ts-ignore extended to demo/ + close 2 demo @ts-ignore hits | H-AUDIT-6 + H-AUDIT-1 | H.W3 Lane D |
| H11 | proof:no-bare-builtins extended to plugins/+scripts/+bench/ + fix the one outlier | H-AUDIT-5 + H-AUDIT-6 | H.W3 Lane E |
| H12 | Rolldown `//#region` marker strip (vite.config.ts) | H-SEED §3 #1 / H-AUDIT-5 H-OPP-7 | H.W4 Lane A |
| H13 | Bench provenance hygiene (module+symbol, not line numbers) | H-SEED §3 #2 / H-AUDIT-5 | H.W4 Lane B |
| H14 | E2E reactivity-instant flake mitigation | H-AUDIT-6 §3 | H.W4 Lane C |
| H15 | CI release/publish process docs | H-AUDIT-6 | H.W4 Lane D |
| H16 | CONTRIBUTING.md playwright + publish lines | H-AUDIT-6 | H.W4 Lane E |

### Items relayed for ratification (G1 binding)

Per `H.md §7` — 5 ratification blocks (A-E):
- Block A (9 chronic 6-tranche carries — 4-option ask).
- Block B (6 FOLD-INTO-H).
- Block C (5 micro-polish FOLD).
- Block D (PEER-AUTHORSHIP carry-forwards under the chosen Option).
- Block E (release version v0.10.0 vs v1.0.0).

## §3 — Wave file-bounds cross-reference

| Wave | Files touched (mutating) |
|---|---|
| H.W0 | (planning-only) all `docs/tranches/H/*` artefacts |
| H.W1 | `api/src/services/palette/crud.ts` (Lane A); `api/test/**/*.test.ts` (Lane A — new rollback tests); `api/tsconfig.json` (Lane B); `docs/tranches/H/audit/api-withTransaction-coverage.md` (Lane C; new standing reference) |
| H.W2 | `src/units/color/constants.ts` + `src/units/color/dispatch.ts` (Lane A — XYZ_FUNCTIONS mapped-type); `scripts/proof-as-unknown-as-budget.mjs` (Lane B — new); `package.json` + `.github/workflows/node.js.yml` (Lane B — wire); `src/units/normalize.ts` (Lane C — type-predicate) |
| H.W3 | `demo/@/lib/palette/api.ts` (split → DELETED) + `demo/@/lib/palette/api/*.ts` (Lane A — 8 new modules); any demo/ file ≥ 400 LoC (Lane B — case-by-case); `demo/@/components/custom/color-picker/index.ts` + a new data file (Lane C); `demo/color-picker/vite.d.ts` + `demo/@/components/custom/markdown/composables/useMarkdownHighlighting.ts` (Lane D); `scripts/proof-no-bare-builtins.mjs` + `scripts/proof-no-ts-ignore.mjs` (Lane D+E — scope extension); `plugins/vite-source-export.ts` (Lane E — `node:fs` prefix) |
| H.W4 | `vite.config.ts` (Lane A — Rolldown options); `bench/color2-direct-paths.mjs` (Lane B); `e2e/smoke-reactivity/reactivity-instant.spec.ts` (Lane C); `.github/workflows/node.js.yml` (Lane D — release notes); `CONTRIBUTING.md` (Lane E) |
| H.W5 | `docs/tranches/H/FINAL.md`; `docs/tranches/H/PROGRESS.md`; `docs/tranches/H/I-SEED.md` (new); root `CLAUDE.md` (drift); `CHANGELOG.md` (vN.N.N entry); `package.json` (version bump) |

## §4 — Authority

This file pins the 6 audit deliverables + their per-finding routing decisions.
