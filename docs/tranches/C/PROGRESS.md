# C — Progress

Execution log for value.js tranche C. Updated at wave boundaries. Reconciled at W4 close.

## Status board

| Wave | Status | Closed at | Notes |
|---|---|---|---|
| W0 — Open · acquire joint research + ratified contract | **RETIRED** | 2026-05-26 | NEVER MET — contract never ratified by value.js side; cohort dissolved. |
| W1 — Library `Palette` + `colorScale` + `sampleToSVGPath` | **RETIRED** | 2026-05-26 | ORPHANED — `src/palette/` does not exist; parked pending user re-mandate. |
| W2 — palette-api alignment to contract; schema migration; `api/src/crud/` utility module landing | **RETIRED** | 2026-05-26 | DISCHARGED-IN-SUBSTANCE — `formatPalette ??` excision at D.W2 Lane D (`ee8bfa4`); `cron.ts $nin` invert at E.W2 Lane A (`417c3a5`); utility-module shape orphaned by D.W2 Lane C's chosen architecture. |
| W3 — Demo native Palette consumption | **RETIRED** | 2026-05-26 | ORPHANED — no library `Palette` to consume. |
| W4 — Close | **CONVERTED-TO-RETIREMENT** | 2026-05-26 | `FINAL.md` authored as a retirement ceremony per the AB+1 retrospective pattern. |

## Log

### 2026-05-18 — tranche authored (opening plan)

- C authored at fourier-analysis's user request under the cross-repo planning round. Pairs with `~/Programming/fourier-analysis/docs/tranches/B/`.
- The cohort tranche letter for value.js is **C** (not B, as value.js-B is already in flight as "Close A, simplify, complete the AND"). The cohort therefore pairs fourier-**B** ⇄ value.js-**C**.
- value.js-C does not open until value.js-B closes AND fourier-B's joint research+challenge close. value.js-A also closes inside value.js-B.W0 — the lineage A → B → C is canonical for value.js.
- The research wave (Wα) and challenge wave (Wχ) are joint with fourier-B; value.js-C consumes the joint outputs at W0 and dispatches no own research.
- Implementation waves W1–W4 are provisional pending joint Wχ close.
- Next action: none until value.js-B closes and fourier-B's joint Wα + Wχ close. At that point, dispatch C.W0.

### 2026-05-18 — 6-agent hardening pass (joint with fourier)

Second 6-agent parallel pass run from fourier-analysis (`~/Programming/fourier-analysis/docs/audits/runs/2026-05-18-tranche-harden/`)
covered value.js-C in lane H5 + H6. Load-bearing corrections applied:

- **Open-gate corrected**: C opens after value.js-B close AND **fourier-B.W1 ratifies `CRUD-CONTRACT.md`** (the binding gate; prior wording said "joint research+challenge close" which is a soft predecessor, not the binding one).
- **`Palette` type signature concretised**: class shape with `stops`, `ramps`, `sample/resample/toSpace/toCSS/toSRGBSafe/toJSON`; **parent space OKLCh** (not LCh — library default mix is OKLab; OKLCh adds the hue axis for `HueInterpolationMethod`; LCh re-introduces CIE-1976 non-uniformity).
- **`sampleToSVGPath` location corrected**: lives at `src/math.ts` (generalises existing `cubicBezierToSVG:68`), not `src/easing.ts`.
- **Demo cohabitation named explicitly**: `Palette` already exists at `demo/@/lib/palette/types.ts:7-28` with ≥14 consumers + `mixPalettes` + `HeroPalettePreset`. C.W1 renames the demo type to `PersistedPalette` (the *storage* shape — exactly what invariant 15 keeps out of the library); the library `Palette` is the *domain* shape that `PersistedPalette` layers over.
- **C.W2 gate added**: `cron.ts:24` unbounded `$nin` inverts to per-doc `pinned` flag (mirrors fourier-A.W4 janitor invert).
- **Named test specs** at every wave (vitest specs at C.W1; e2e specs at C.W2/W3).
- Citation fix in `coordination/CRUD-CONSTELLATION.md`: timing-diagram arrow `C.W3 → C.W1` (now showing the W1-published consumption explicitly).

### 2026-05-19 — 6-agent CRUD-deepen round (SOTA spec authoring, joint with fourier)

Six-agent round dispatched from fourier (`~/Programming/fourier-analysis/docs/audits/runs/2026-05-19-crud-deepen/`). value.js-C side of the deliverables:

- `waves/W1.md` (94L) — library `Palette` + `colorScale` + `sampleToSVGPath` at `src/math.ts`; demo `Palette → PersistedPalette` rename; npm version bump published with `@latest` tag.
- `waves/W2.md` (97L) — palette-api alignment to ratified `CRUD-CONTRACT.md`; `formatPalette` `??` defaulting retires on 7 fields; `cron.ts:24` `$nin` invert to per-doc `pinned` flag (joint cron pattern with fourier per `R-lifecycle-spec.md §4`); `migrate-palette-schema.ts` ships.
- `waves/W3.md` (76L) — demo native library-`Palette` consumption at ≥10 sites (`fromCSS`/`fromJSON`/`sample`/`resample`/`toCSS`/`toSRGBSafe`); `PersistedPalette` confined to api-boundary files; `HeroPalettePreset` composes over `palette`.

All three WAVE_SPEC-compliant (9 sections each); hard gates close on evidence — `npx vitest`, `npx playwright`, `git grep`, `npm view`/`npm dist-tag`, `vue-tsc -b --force`. Remain *provisional* pending joint Wχ challenge.

**Cohort spec corpus now landed** at fourier-B coordination: `CRUD-CONTRACT.md` (13 sections, 973L), `SCHEMA.md` (754L, OpenAPI 3.1 + JSON Schema 2020-12), `CONFORMANCE-MATRIX.md` (303L, 118 rows × 2 repos). value.js-C reads these by symbolic citation per `research/README.md`.

**Bonus finding (filed to value.js, not in C scope):** impersonation endpoint (`api/src/routes/admin.ts` per H4-derived audit) ships an *un-expiring* session token — missing `expiresAt` — correctness bug. Destination: value.js-B `FINAL.md §debt` or a value.js follow-up tranche.

### 2026-05-19 — U1–U6 utility-extraction refinement round (tranche refinement, joint with fourier)

Six-agent parallel round dispatched from fourier (U1 architectural decision,
U2 slug-words spec, U3 fourier `api/lib/crud/` Python utility spec, U4
value.js `api/src/crud/` TS utility spec, U5 tranche-spec refinement [this
entry], U6 conformance-matrix extension). Substrate from
`~/Programming/fourier-analysis/docs/audits/runs/2026-05-19-utility-extraction/`.

**U1 invariant 16 revised**: per-language utility modules admitted at ≤500
LOC per repo; "shared by contract, per-language utility modules admitted,
frameworks rejected". `C.md §2` invariant 16 inherits the cohort revision
via `coordination/CRUD-CONTRACT.md §9` (extended by U6).

**U5 surgical edits (this commit):**

- `C.md §3` wave table: W2 row absorbs `api/src/crud/` utility-module
  landing per U4 spec (`coordination/CRUD-LIB-TS.md`); slug-words data
  consumed from `coordination/SLUG-WORDS.md` (U2) at the precepts
  location (`docs/precepts/data/slug-words.json`); `cron.ts:24` now
  delegates to `pinnedCron.cronPrune`; `migrate-palette-schema.ts`
  consumes utility helpers. W3 row notes demo flows remain on the api
  boundary — the utility is server-side only.
- `C.md §5` critical files: new "palette-api utility module" row owned
  by W2 (8 files at `api/src/crud/`); `palette-api — types + helpers`
  row updated to note `palettes.ts` consumes utility helpers; `cron.ts`
  delegates to `pinnedCron.cronPrune`; `slugWords.ts` re-points at the
  U2 precepts data.
- `waves/W2.md`: scope items 10–11 added (utility module landing + 7
  named vitest specs); file bounds add 8 utility-module files + 7 test
  files + `slugWords.ts` modify-carve; agent units A/B/C re-scoped
  (A consumes helpers + migrator, B delegates cron via `pinnedCron`,
  C lands the module); hard gates 11–13 added (LOC bound, consumption
  proof, slug-words data resolution).
- `waves/W3.md`: scope item 9 + hard gate 9 added — utility-module
  boundary preserved (demo never imports from `api/src/crud/`; server-side
  only per U1's bounded invariant 16).

**No sub-wave split, no new brittleness window**: utility modules land
alongside the entity per U1's bounded invariant 16. The wave shape
(W2 = api alignment + utility; W3 = demo native consumption) is preserved.

**Cross-references**: see `~/Programming/fourier-analysis/docs/tranches/B/PROGRESS.md`
for the symmetric B.W3 / B.W4 refinement.

### 2026-05-26 — RETIRED via the AB+1 retrospective pattern

Tranche C closes RETIRED. Authority: `~/Programming/fourier-analysis/docs/audits/runs/2026-05-19-refinement-assay/r4-valuejs-C-refinement.md` (R4 refinement assay).

Axis disposition per `FINAL.md §2`:

- **Axis 1 (palette-api alignment)** — DISCHARGED-BY-D-AND-E. `formatPalette ??` excision at D.W2 Lane D commit `ee8bfa4`; `cron.ts:24` unbounded `$nin` rewrite at E.W2 Lane A commit `417c3a5`; `migrate-palette-schema.ts` analog at D.W2 Lane D `migrations/check.ts` smoke probe. C-shaped `api/src/crud/` utility-module orphaned by D.W2 Lane C's chosen service+repository+errors+events+DI+zod architecture.
- **Axis 2 (library `Palette` domain)** — ORPHANED absent user re-mandate. `find src -name 'palette*'` returns empty; no value.js execution-thesis from D through H required the domain object; fourier (the demand-side consumer) did not pull.
- **Axis 3 (CRUD-CONTRACT ratification)** — NEVER EXECUTED. fourier-side document exists at `~/Programming/fourier-analysis/docs/tranches/B/coordination/CRUD-CONTRACT.md` (973L, authored at the 2026-05-19 CRUD-deepen round) but was never ratified by the value.js side; the cross-repo cohort has dissolved.

**Named successors** per P-Inv 28: library-`Palette` axis parks as CONDITIONAL FUTURE-TRANCHE pending user re-mandate; `slugWords.ts` re-points to shared precepts data parks paired with the fourier-side consumer; `CRUD-CONTRACT.md` ratification dissolved (no successor); all other residues discharged by D / E or obviated by D's chosen architecture.

**fourier-B impact**: fourier-B.W4's fallback contract becomes the primary path; the cross-repo `Palette` import gut is canceled; `colors.ts` and `easings.ts` workarounds become permanent in fourier. See `FINAL.md §5`.

**Status**: every wave row above flipped from `provisional` → `RETIRED` (or `CONVERTED-TO-RETIREMENT` for W4). Axis disposition recorded per FINAL.md §2; residue routed per FINAL.md §6.
