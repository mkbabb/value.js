# Tranche C — FINAL — RETIRED via the AB+1 retrospective pattern

**Status**: RETIRED 2026-05-26.
**Repo**: value.js (the colour-authority library + Hono/MongoDB palette-api + demo cohort).
**Tranche letter**: C — value.js-C, the palette-CRUD-facility-and-library-`Palette`-domain tranche, authored 2026-05-18 as the cross-repo peer to fourier-B (the fourier-analysis CRUD/identity convergence tranche).
**Authority for retirement**: `~/Programming/fourier-analysis/docs/audits/runs/2026-05-19-refinement-assay/r4-valuejs-C-refinement.md`.
**Pattern**: the AB+1 retrospective discipline (P-Inv 29 → `glossary/meta-terms.md §"P-Inv 29 (AB+1 retrospective discipline)"`), here applied not to a shadow-execution cohort but to its inverse — a planning artefact that the executed tranches (D / E / F / G) discharged *under different theses*, leaving the original C plan as an unconsumed scaffold. The AB+1 pattern admits retroactive attribution of work; C retires by recognising its attribution post-hoc to D and E.

---

## §1 — Goal criterion and completion criterion (paired)

**Goal criterion (the aim C was reaching for).** Converge the cross-repo CRUD facility between value.js and fourier-analysis through a written contract and shared data, land a `Palette` domain type at `src/palette/` in the library, align the palette-api to the ratified contract, and have the demo natively consume the library `Palette`. The success-state was a single coherent palette-domain authority owned by the colour library, with the api as its persistent surface and the demo as its first-class consumer.

**Completion criterion (the evidence-bearing condition).** The retirement close holds when:

- (a) **the AB+1 attribution table** below cites the discharge for every C scope item against a commit-bearing artefact (D.W2 Lane D commit `ee8bfa4` for the `formatPalette` excision; E.W2 Lane A commit `417c3a5` for the cron rewrite);
- (b) **the orphaned axis** (library `Palette` at `src/palette/`) is named explicitly as orphaned-absent-user-re-mandate, with a `find ~/Programming/value.js/src -name 'palette*'` returning empty as the deletion-proof shape applied to an absence;
- (c) **the never-executed cohort contract** (`CRUD-CONTRACT.md` ratification by value.js side) is recorded as never-fired, with the fourier-side document cited as authoritative-but-unconsumed-by-value.js;
- (d) `PROGRESS.md`'s status board flips every wave row from `provisional` → `RETIRED` and the close lineage A → B → C is honoured retroactively per the AB+1 discipline;
- (e) the cross-repo fourier-B impact statement is recorded — `fourier-B.W4`'s fallback contract becomes the primary path, the `colors.ts` gut is canceled, and the `easings.ts` SVG-sampling workaround stays as a fourier-internal primitive.

Both criteria hold at this writing. The close is clean against the *retirement* form; it is `complete_with_misses` only against the original C aim, and the named successor for every miss is either (i) discharged-elsewhere or (ii) parked-pending-user-re-mandate.

---

## §2 — Thesis verdict — RETIRED, split into three axes

The C thesis (per `C.md §1`) carried three axes. They retire under three different dispositions, and pretending otherwise would be dishonest. The split reads:

### Axis 1 — palette-api alignment to a ratified cross-repo CRUD contract

**Verdict: DISCHARGED-BY-D-AND-E under different theses.** value.js advanced past C's premises without consuming C's plan. D solved the `formatPalette` per-field fallback ("Pre-migration `??` defaults excised") under a *fail-explicit* thesis (D3 invariant). E solved the unbounded `$nin` cron antipattern under a *pipeline parity* thesis (E3 invariant). The work landed; the C-shaped *attribution* never did.

| C scope item | Discharge attribution | Citation |
|---|---|---|
| `formatPalette ??` per-field fallback retires (C.W2 scope) | **D.W2 Lane D (F1)** — the `migrations/check.ts` `assertMigrationsApplied` smoke probe replaces per-field fallback compensation; `api/src/format/palette.ts:7-12, 54-77` carry zero `??` operators on `tags`/`versionCount`/`forkOf`/`oklabColors` | `~/Programming/value.js/docs/tranches/D/FINAL.md §"D.W2 — Lane D"`; commit `ee8bfa4` |
| `cron.ts:24` unbounded `$nin` invert to per-doc `pinned` flag (C.W2 scope) | **E.W2 Lane A** — `api/src/cron.ts` rewritten to delegate to repository methods (`sessions.deleteExpired`, `sessions.deleteStale`, `votes.deleteOrphaned`); the orphaned-vote sweep is bounded by the *positive* slug list (`palettes.listAllSlugs()`), not unbounded `$nin`. The remediation differs from C's `pinned`-flag mechanism but the antipattern is gone; this is *discharged-in-spirit* (a different remediation closes the same hole). | `~/Programming/value.js/docs/tranches/E/FINAL.md §"E.W2 — api/ pipeline parity"`; commit `417c3a5`; `api/src/cron.ts:1-12, 25-29` |
| `migrate-palette-schema.ts` schema-cutover ships (C.W2 scope) | **D.W2 Lane D via F1 probe** — the `migrations/check.ts` startup probe is the functional analog: it verifies the at-rest data carries every field rather than backfilling. The C plan called for a backfill artefact; the executed thesis chose fail-on-missing-fields. Both close the brittleness window C declared (the `??` defaulting *is* the shim C invariant 17 forbids carrying forward). | `~/Programming/value.js/docs/tranches/D/FINAL.md §"D.W2 — Lane D"`; commit `ee8bfa4` |
| `api/src/crud/` utility module (8 files per U4 spec `CRUD-LIB-TS.md`) | **ORPHANED-BY-PARALLEL-EVOLUTION** — D.W2 Lane C chose a `service+repository+errors+events+DI+zod` architecture (20 NEW files / 1502 LoC at commit `626b107`) instead of the C-planned `api/src/crud/{index,slugs,cursors,errors,etag,idempotency,softdelete,pinnedCron}.ts` utility-module shape. The two architectures are not directly mergeable without a non-trivial mapping exercise; D's vocabulary won by execution. | `~/Programming/value.js/docs/tranches/D/FINAL.md §"D.W2 — Lane C"`; commit `626b107` |
| `slugWords.ts` re-points at shared `coordination/SLUG-WORDS.md` precepts data (U2 spec) | **PENDING-NO-PULL** — `api/src/slugWords.ts:4-21` still carries hardcoded `ADJECTIVES`/`VERBS`/`NOUNS` inline. The U2 spec was authored at the 2026-05-19 CRUD-deepen round but never executed because no value.js wave between D and H required the relocation, and the fourier-side consumer never pulled. | `~/Programming/value.js/api/src/slugWords.ts:4-21` |

The honest reading: **the api-alignment axis is closed in fact even though it was never opened in name.** D's "fail-explicit" thesis and E's "pipeline parity" thesis are stronger and more general than C's "cohort-contract conformance" thesis, and they discharged the same hole more thoroughly. The discharge attribution is recorded here at the C close per the AB+1 retrospective discipline (P-Inv 29 → `glossary/meta-terms.md §"P-Inv 29 (AB+1 retrospective discipline)"`).

### Axis 2 — library `Palette` domain type at `src/palette/`

**Verdict: ORPHANED absent user re-mandate.** The library-`Palette` axis never landed because no value.js execution-thesis from D through H required it — fourier was the only demand-side consumer, and fourier-B did not pull. As of 2026-05-26:

- `find ~/Programming/value.js/src -name 'palette*' -o -name 'Palette*'` → empty;
- `src/math.ts:69` still carries `cubicBezierToSVG` (the existing primitive that C.W1 would have generalised to `sampleToSVGPath`) — never generalised;
- `colorScale(stops, t, opts?)` is absent from the library surface;
- demo `Palette` at `demo/@/lib/palette/types.ts:7-28` is unchanged in shape since C planning; the planned rename to `PersistedPalette` (which would have made the *storage* shape distinct from the *domain* shape per invariant 15) never executed;
- G.W1 Lane B's decomposition of `color/utils.ts` into 9 conversion modules was orthogonal to palette domain — none of G's library-perf folds (`L3`/`L5`/`L8`/`L11`/`L12` in D.W3 Lane C) touched palette structure.

The axis stays orphaned because the value.js execution-thesis through H is *cascade-correctness + type-system completion + demo decomposition* (`H.md §1`), not palette domain. The work re-opens only if the user re-mandates the library-`Palette` domain object as a new value.js tranche (suggested letter: a future I or later — H is in flight and rejects new architectural axes per its "polish-grade — not structural rescue" framing). Without re-mandate, the library-`Palette` work is not on value.js's roadmap.

### Axis 3 — CRUD-CONTRACT cross-repo ratification

**Verdict: NEVER EXECUTED.** The cross-repo cohort dissolved when fourier-B did not pull a contract ratification through to value.js. The substantive citations:

- `find ~/Programming/value.js -name 'CRUD-CONTRACT.md'` returns nothing in value.js;
- the authoritative `~/Programming/fourier-analysis/docs/tranches/B/coordination/CRUD-CONTRACT.md` exists in fourier's repo (973 lines, authored at the 2026-05-19 CRUD-deepen round per `~/Programming/fourier-analysis/docs/audits/runs/2026-05-19-crud-deepen/SYNTHESIS.md`) but was never ratified by the value.js side;
- the D–H FINAL/H.md fourier-mentions are read-boundary acknowledgements only (`E/FINAL.md:22` analysis line; `F/FINAL.md:28` zero-writes declaration; `G/FINAL.md:187` dirty-tree observation; `H/H.md:127` read-only marker) — none consume a contract;
- no value.js wave between D and H carried a CRUD-contract sign-off artefact.

The 118-row CONFORMANCE-MATRIX gate at `fourier-analysis/docs/tranches/B/coordination/CONFORMANCE-MATRIX.md` therefore reads `PASS-fourier / N/A-value.js` for every row at the value.js side; the §10 fourier-B.W1 close-gate is structurally unmeetable absent value.js sign-off. fourier-B is expected to absorb this fact when it closes, per the §5 fourier-B impact statement below.

---

## §3 — Wave-level disposition

C's wave schedule (per `C.md §3`) carried five waves. Each closes RETIRED with the disposition shown.

| Wave | Title (the noun-phrase title C planned) | Disposition | Goal/completion at retirement |
|---|---|---|---|
| **C.W0 — Open · acquire joint research + ratified contract** | the open wave whose binding open-gate was value.js-B closed AND fourier-B.W1 ratifies `CRUD-CONTRACT.md` (H5 corrected open-gate) | **NEVER MET** | Goal: open the tranche off a ratified contract. Completion miss: contract never ratified by value.js side; the cohort dissolved. |
| **C.W1 — Library `Palette` + `colorScale` + `sampleToSVGPath`** | the library-substrate wave (3 parallel agents) for the `Palette` domain class at new `src/palette/`, `colorScale` co-located, `sampleToSVGPath` at `src/math.ts` (H5 placement correction), demo `Palette → PersistedPalette` rename, npm version bump published with `@latest` tag updated | **ORPHANED (Axis 2)** | Goal: land the library domain object. Completion miss: `src/palette/` does not exist; the work parks pending user re-mandate. |
| **C.W2 — palette-api alignment to contract; schema migration; `api/src/crud/` utility module landing** | the api-alignment wave (3 parallel agents) for contract conformance (slug, sessions, admin, soft-delete, ownership, cron), `formatPalette ??` retirement, `cron.ts:24` `$nin` invert, `migrate-palette-schema.ts` backfill, `api/src/crud/` utility module per U4 spec, slug-words precepts-data consumption per U2 spec | **DISCHARGED-IN-SUBSTANCE-BY-D-AND-E (Axis 1) + ORPHANED utility-module shape** | Goal: align api to ratified contract. Completion in substance via the D / E discharge table in §2 Axis 1; the C-shaped utility-module architecture is orphaned by D.W2 Lane C's chosen service+repository+errors+events+DI+zod evolution. |
| **C.W3 — Demo native Palette consumption** | the demo-wiring wave (2 parallel agents) for `demo/color-picker` + `demo/hero-lab` native consumption of the library `Palette` as first-class, `PersistedPalette` layering over it, palette save/list/fork/vote flows rendering identically to value.js-B close baseline, Playwright re-probe at 3 viewports light+dark | **ORPHANED (Axis 2 follow-on)** | Goal: demo consumes the library domain object. Completion miss: no library `Palette` to consume; demo type unchanged. |
| **C.W4 — Close** | the close wave (1 serial agent) for `PROGRESS.md` reconciliation, `FINAL.md` citing every commit and artefact, cohort coordination doc marked discharged | **CONVERTED TO RETIREMENT** | The retirement close *is* this `FINAL.md`. The completion form differs from the planned form (no commits to cite — the work happened under D / E commits; coordination doc marked *dissolved*, not *discharged*). |

The five-wave shape was provisional pending joint Wχ close; the joint Wχ never closed (fourier-B did not execute it). All five waves therefore retire at their `provisional` planning state.

---

## §4 — Invariants disposition

C inherited value.js-A's five invariants and value.js-B's five (B1–B5) plus four cohort-specific (14–17). They disposition as follows at retirement:

| Invariant | Disposition |
|---|---|
| value.js-A invariants 1–5 | Honored by D / E / F / G under their own close ceremonies; not C's to verify at retirement. |
| value.js-B invariants B1–B5 (close A, abrogate, one-path, runtime-evidence, zero-deferral) | Honored by D / E / F / G; not C's to verify. |
| Cohort 14 — One converged entity per user-named noun | HONORED by D's vocabulary — `palette` is the single converged noun across `api/src/repositories/palette.ts`, `api/src/format/palette.ts`, `api/src/services/palette.ts` (D.W2 Lane C). |
| Cohort 15 — Domain model in the library, persistence in the app | UNMET at retirement — no library domain model landed. The persistence side stays correctly in the app. The split survives in *form* (library is colour-types, api is storage) but the *intended* `Palette` domain object that would have made the split load-bearing never landed. |
| Cohort 16 — Shared by contract; per-language utility modules admitted; frameworks rejected | UNMET in shared-by-contract sense (contract unratified); HONORED in per-language-utility sense via D's service+repository pattern (which is utility-shaped, not framework-shaped); HONORED in frameworks-rejected sense (no codegen, no third coordinating service introduced). |
| Cohort 17 — Migration is verified, not hoped | HONORED — discharged in substance by D.W2 Lane D's `migrations/check.ts` `assertMigrationsApplied` smoke probe, which verifies field presence rather than hoping for it. This is the F1 fail-explicit thesis directly closing C-17. |

Cohort invariant 15 is the load-bearing miss. The retirement honors it by naming the miss explicitly rather than papering over it.

---

## §5 — fourier-B impact statement

Per `r4-valuejs-C-refinement.md §5`, the cohort timing diagram in `~/Programming/fourier-analysis/docs/tranches/B/coordination/CRUD-CONSTELLATION.md` named the single hard cross-repo dependency: **fourier-B.W4 → value.js-C.W1 published**. C.W1 will never publish under this retirement. Therefore:

1. **fourier-B.W4's fallback contract becomes the primary path.** The fallback (`fourier-B.md §7`, "B.W4 lands everything *except* the `colors.ts` gut-onto-value.js" — named at the 2026-05-18 hardening pass per `2026-05-18-tranche-harden/SYNTHESIS.md §"W4 fallback named"`) is now the *primary* path, not the fallback. fourier-B.W4 collapses to the admin/store re-point only.
2. **`web/src/lib/colors.ts` does NOT gut onto a value.js `Palette` import.** The file stays (current state per the refinement assay: 117 LoC; still defines `VIZ_COLORS.fourier` etc.) until either (a) the user re-mandates the library `Palette` domain object as a new value.js tranche or (b) fourier independently authors its own palette domain object.
3. **The `easings.ts` SVG-sampling workaround stays.** `web/src/lib/easings.ts:89` (`generateCurveSVGPath`) remains fourier's own primitive — value.js's `sampleToSVGPath` will not materialise.
4. **fourier still pins `@mkbabb/value.js ^0.4.6`** while value.js published v0.9.0 — a 5-minor-version drift independent of C. fourier-B's "version-bump consume" should move forward (consuming v0.9.0's `parseCSSColor`, `mixColors`, `color2`, gamut mapping — the surface that already exists), without expecting a `Palette` import.
5. **The cross-repo dependency is severed, not delayed.** fourier-B's coordination doc (`fourier-analysis/docs/tranches/B/coordination/CRUD-CONSTELLATION.md`) should record discharged status with citation to this `FINAL.md` and to the R4 refinement assay.

**One-line fourier-B impact**: fourier-B.W4 must execute its fallback contract as the primary path; the cross-repo `Palette` import gut is canceled; `colors.ts` and `easings.ts` workarounds become permanent in fourier.

---

## §6 — Cross-tranche debt and named successors

Per **P-Inv 28** (zero deferral at tranche close → `glossary/meta-terms.md §"P-Inv 28"`), every retirement item carries a named destination. The discipline binds even at retirement.

| Item | Named successor |
|---|---|
| Library `Palette` at `src/palette/` + `colorScale` + `sampleToSVGPath` (Axis 2 residue) | **CONDITIONAL FUTURE-TRANCHE (post-H, post-user-re-mandate)** — opens only if the user re-mandates the library-`Palette` domain object as a new value.js tranche (suggested letter: a future I or later). Until then, the work is not on value.js's roadmap; the residue is *parked*, not *deferred*. |
| Demo `Palette → PersistedPalette` rename + native consumption of library `Palette` (Axis 2 follow-on) | **CONDITIONAL FUTURE-TRANCHE** — opens with the library-`Palette` re-mandate above; the demo work is meaningless without the library substrate. |
| `slugWords.ts` re-points to shared `coordination/SLUG-WORDS.md` precepts data (U2 spec residue) | **CONDITIONAL FUTURE-TRANCHE (paired with the fourier-side `slug-words.json` consumer)** — opens only if fourier-side authors a consumer of the shared word-list. Without a second consumer the extraction is premature per invariant 16's standalone-package extraction rule. |
| CRUD-CONTRACT.md ratification (Axis 3) | **DISSOLVED-NOT-DEFERRED** — the cross-repo cohort dissolved when fourier-B did not pull. fourier's authoritative `CRUD-CONTRACT.md` remains a fourier-internal coherence document per the 2026-05-19 refinement-assay recommendation; value.js sign-off becomes optional. No future value.js tranche owns this. |
| `api/src/crud/` utility-module shape (Axis 1 architectural mismatch) | **OBVIATED** — D.W2 Lane C's parallel evolution chose a different shape; the C-spec utility module is not on value.js's roadmap. No successor. |
| `formatPalette ??` retirement (Axis 1) | **DISCHARGED** — D.W2 Lane D commit `ee8bfa4`; no successor needed. |
| `cron.ts:24` `$nin` invert (Axis 1) | **DISCHARGED-IN-SPIRIT** — E.W2 Lane A commit `417c3a5`; no successor needed. |
| `migrate-palette-schema.ts` backfill (Axis 1) | **DISCHARGED-VIA-F1-PROBE** — D.W2 Lane D `migrations/check.ts`; no successor needed. |

Zero items deferred to a generic "future tranche". Every residue carries either a conditional re-mandate predicate or an explicit dissolution / obviation rationale.

---

## §7 — Authority and provenance

- **Refinement assay**: `~/Programming/fourier-analysis/docs/audits/runs/2026-05-19-refinement-assay/r4-valuejs-C-refinement.md` (the READ-ONLY refinement report whose verdict is RETIRED per Option 1 — the AB+1 retirement pattern).
- **C plan as authored**: `~/Programming/value.js/docs/tranches/C/C.md` (140 lines; last touched 2026-05-19 in the U5 utility-extraction refinement round).
- **C status board at retirement**: `~/Programming/value.js/docs/tranches/C/PROGRESS.md` (96 lines; status board shows W0 planned + W1–W4 provisional — zero waves executed).
- **D close (discharge of Axis 1 first half)**: `~/Programming/value.js/docs/tranches/D/FINAL.md §"D.W2 — Lane D"`; commit `ee8bfa4`; tag `v0.6.0`.
- **E close (discharge of Axis 1 second half)**: `~/Programming/value.js/docs/tranches/E/FINAL.md §"E.W2 — api/ pipeline parity"`; commit `417c3a5`; tag `v0.7.0`.
- **fourier-side authoritative contract (never ratified by value.js)**: `~/Programming/fourier-analysis/docs/tranches/B/coordination/CRUD-CONTRACT.md` (973 lines).
- **fourier-side cohort coordination doc**: `~/Programming/fourier-analysis/docs/tranches/B/coordination/CRUD-CONSTELLATION.md` — to be updated by the fourier-B close ceremony with the discharged-status citation to this FINAL.md.
- **AB+1 retrospective discipline source**: `~/Programming/value.js/docs/precepts/glossary/meta-terms.md §"P-Inv 29 (AB+1 retrospective discipline)"`; `~/Programming/value.js/docs/precepts/instructions/tranche/SPEC.md §"Retrospective Discipline"`.

---

## §8 — Close declaration

Tranche C is **RETIRED** via the AB+1 retrospective pattern. The api-alignment axis is discharged-by-D-and-E with citations above. The library-`Palette` axis is orphaned absent user re-mandate. The CRUD-CONTRACT ratification was never executed and the cross-repo cohort has dissolved.

The retirement is the close. There is no merge ceremony, no version tag, no commit chain to cite as C-attributed — the closure is the recognition that the work happened under D / E attribution and the unworked residue is parked or dissolved per §6.
