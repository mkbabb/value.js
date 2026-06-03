# C — Palette CRUD facility + library Palette domain: cross-repo cohort with fourier-analysis

> **STATUS as of 2026-05-26: RETIRED via the AB+1 retrospective pattern.** See `FINAL.md` for the closing ceremony, the three-axis disposition (api-alignment DISCHARGED-BY-D-AND-E; library-`Palette` ORPHANED absent user re-mandate; CRUD-CONTRACT ratification NEVER EXECUTED), and the fourier-B impact statement. The plan below is preserved verbatim as the *as-authored* substrate; it is not the close-state. Authority for retirement: `~/Programming/fourier-analysis/docs/audits/runs/2026-05-19-refinement-assay/r4-valuejs-C-refinement.md`.

**Tranche letter**: C (value.js repo; successor to B).
**Successor to**: B — value.js's close-A-and-simplify tranche (in flight at 2026-05-18, planning-only at this authoring). C opens only after B close. (A close lands inside B.W0; the close lineage is therefore A → B → C.)
**Cross-repo cohort**: value.js ⇄ `fourier-analysis`. **Peer relationship** — not substrate/consumer. fourier's peer side is `fourier-analysis` tranche **B**; this tranche pairs with it under the cohort binding `~/Programming/fourier-analysis/docs/tranches/B/coordination/CRUD-CONSTELLATION.md` (mirrored in this repo at `coordination/CRUD-CONSTELLATION.md`).
**Mode**: **research-first, joint with fourier-B**. The research wave (Wα) and challenge wave (Wχ) are joint — dispatched from fourier-B and scoped to cover both repos. value.js-C consumes the joint outputs; the implementation wave table (§3) is hardened at the joint challenge close. Congruent with value.js-A's research→hardening pattern (`docs/tranches/A/A.md §3` augmented 6 → 8 by HARDEN-1..6).
**Open**: TBD (after value.js-B close AND fourier-B.W1 ratifies `CRUD-CONTRACT.md` — H5 hardening corrects the prior "joint research+challenge close" wording; the binding open-gate is the contract ratification, not the challenge close).

## §1 — Thesis

value.js carries three concentric layers — a **library** (`src/`: CSS value parsing, 15 colour spaces, easings, transforms), a **palette-api** (`api/src/`: Hono + MongoDB; full palette CRUD with slug system, sessions, admin moderation, cron, content-hashing, versioning, forking, voting, OKLab caching), and a **demo** (`demo/color-picker`, `demo/hero-lab`). The CRUD facility is mature; the library is the colour authority.

In parallel and without coordination, `fourier-analysis` independently built **the same CRUD facility in Python/FastAPI** for its own user-named noun — visualization, fragmented today across snapshots + gallery + drafts under five divergent identity schemes (`fourier-analysis/docs/audits/runs/2026-05-18-fourier-tranche/e-crud-slug-valuejs.md`). Every facility row exists in both repos in two languages: slug, sessions, admin, cron, hash, db wiring, middleware. fourier additionally hand-rolls colour logic in `web/src/lib/colors.ts` where value.js — *the colour library fourier already depends on* — ships `parseCSSColor`, `mixColors`, `color2`, gamut mapping.

The user's brief ratifies the architectural opportunity and bounds it precisely: a **"shared optimum for CRUD of visualizations and CRUD of palettes/colours, with no contrivance, no overengineering, no superfluous-cloud. KISS."** The naive reading — a shared CRUD framework both apps import — is forbidden by the same sentence: Python and Node cannot share runtime code without a third service or a codegen step, both superfluous cloud. **C is research-first because the shape of the right answer is open**: convergence by *contract* and shared *data* (the slug word-lists), with the colour/palette domain model owned by value.js the library. The joint research wave determines exactly how far convergence is warranted; the joint challenge adversarially tests that the answer is not a framework in disguise.

What C ships from value.js's side:

1. **A `Palette` domain type in value.js the library.** Pure: ordered colour stops with named ramps, validation, gamut-safe operations, **OKLCh-parent interpolation** (H5 hardening — OKLCh, not LCh, because the library default mix is OKLab at `src/units/color/mix.ts:31`, OKLCh adds the hue axis needed for `HueInterpolationMethod` ramps, `gamutMapOKLab` already ships, and LCh would re-introduce CIE-1976 non-uniformity), serialize/deserialize. No persistence, no HTTP, no database (cohort invariant 15).

   Concrete signature (lands at new `src/palette/`):

   ```ts
   class Palette {
     readonly stops: readonly PaletteStop[];   // { position ∈ [0,1], color: OKLCHColor<number>, name? }
     readonly ramps: readonly PaletteRamp[];   // optional named sub-sequences
     static fromCSS(colors: string[], ramps?: RampSpec[]): Palette;
     sample(t: number, hueMethod?: HueInterpolationMethod): OKLCHColor<number>;
     resample(n: number, hueMethod?: HueInterpolationMethod): Palette;
     toSpace(space: ColorSpace): Color<number>[];
     toCSS(outputSpace?: ColorSpace): string[];
     toSRGBSafe(): Palette;
     toJSON(): PaletteJSON;
     static fromJSON(data: PaletteJSON): Palette;
   }
   function colorScale(stops: string[], t: number, opts?: ColorScaleOpts): string;
   ```

   **Demo cohabitation note** (H5 hardening): a `Palette` type *already exists* in the demo at `demo/@/lib/palette/types.ts:7-28`, consumed by ≥14 files, with `mixPalettes` at `demo/@/lib/palette/mix.ts:70` and `HeroPalettePreset` in hero-lab. C.W1 explicitly **renames the demo `Palette` → `PersistedPalette`** (the demo's type is the *storage* shape — exactly the role invariant 15 keeps out of the library) and positions `mixPalettes` + `HeroPalettePreset` as `PersistedPalette` operations layered over the library `Palette`. Greenfield treatment is dishonest.

2. **Two named library gaps** lifted from joint Wα-R2: `colorScale(stops, t)` (palette sampling primitive — hand-rolled in both repos today; lands alongside `Palette` at `src/palette/`) and a generic `sampleToSVGPath(fn, n)` (value.js ships cubic-bezier sampling only; fourier's `easings.ts` workaround retires once it lands). **H5 hardening corrects placement**: `sampleToSVGPath` belongs in **`src/math.ts`**, not `src/easing.ts` — it generalises the existing `cubicBezierToSVG` at `src/math.ts:68` and is not easing-specific.
3. **palette-api alignment to the ratified CRUD contract.** Today `routes/palettes.ts:formatPalette` carries a `tags ?? [] / versionCount ?? 1 / forkOf ?? null / oklabColors ?? []` defaulting pattern with the comment "Ensure new fields always have defaults for pre-migration documents" — a per-field fallback that contradicts cohort invariant 17 (migration is verified, not hoped). C.W2 retires it via `migrate-palette-schema.ts` (alongside the extant `migrate-slugs.ts`, `migrate-oklab.ts`).
4. **Demo natively consumes the library Palette type.** `demo/color-picker` and `demo/hero-lab` use the `Palette` domain object as a first-class type, not as ad-hoc arrays of CSS strings.

What value.js-C does *not* do (cohort invariant 16): no shared CRUD framework, no third coordinating service, no codegen step. Convergence is a written contract and a shared word-list; the implementation stays in two languages because two languages is the honest description of the system.

## §2 — Binding invariants

value.js-C inherits value.js-A's five invariants and value.js-B's five (B1–B5; close A, abrogate, one-path, runtime-evidence, zero-deferral), unchanged. From the cohort it additionally binds the four CRUD-specific invariants 14–17:

14. **One converged entity per user-named noun** — value.js's noun is `palette`; one collection, one slug, one lifecycle. The versioning / forking / voting / tags / `oklabColors` extensions live as documented optional surface, not parallel nouns.
15. **Domain model in the library, persistence in the app** — `Palette` and its pure operations live in `src/`; storage stays in `api/src/`. No persistence enters the library.
16. **Shared by contract; per-language utility modules admitted; frameworks rejected** — convergence across Node/Python is a *written contract* (`coordination/CRUD-CONTRACT.md`), shared *language-agnostic data* (the slug word-list at `docs/precepts/data/slug-words.json`), and *per-language utility modules* (`api/src/crud/` for value.js; `api/lib/crud/` for fourier) that realise the contract's cross-cutting concerns (slug generation, cursor encoding, problem+json, ETag, Idempotency-Key, soft-delete helpers, pinned-cron pattern). Utility modules are framework-free (no control inversion, no codegen, no lifecycle ownership), size-capped (≤ 500 LOC per repo), and in-repo first (standalone-package extraction is deferred until a third consumer materialises). A shared CRUD *framework*, a codegen step, or a third coordinating service is overengineering and is rejected by invariant. See `~/Programming/fourier-analysis/docs/tranches/B/coordination/CRUD-CONTRACT.md §9` for the per-target disposition table; revised per `~/Programming/fourier-analysis/docs/audits/runs/2026-05-19-utility-extraction/DECISION.md`.
17. **Migration is verified, not hoped** — the `formatPalette` per-field defaulting retires with a backfill verified by count + spot-check; no fallback survives the wave.

## §3 — Wave schedule (provisional — hardened at joint Wχ close)

| Wave | Title | Agents | Closes on | Status |
|---|---|---|---|---|
| W0 | Open · acquire joint research + ratified contract | 1 | value.js-B confirmed closed; fourier-B joint Wα + Wχ artefacts cited; `CRUD-CONTRACT.md` ratified by joint sign-off | **RETIRED 2026-05-26 — NEVER MET** (contract never ratified by value.js side) |
| W1 | Library `Palette` + `colorScale` + `sampleToSVGPath` | 3 parallel | `Palette` at new `src/palette/`; `colorScale` co-located; `sampleToSVGPath` at `src/math.ts` (H5 correction — generalises `cubicBezierToSVG:68`); named vitest specs (`test/palette/{construct,sample,resample,serde,gamut}.test.ts`; `test/math/sampleToSVGPath.test.ts`); demo `Palette → PersistedPalette` rename complete; demo swaps at least one site to consume the library type; npm version bump published with `@latest` tag updated | **RETIRED 2026-05-26 — ORPHANED** (parked pending user re-mandate per FINAL.md §2 Axis 2) |
| W2 | palette-api alignment to contract; schema migration; **`api/src/crud/` utility module landing** | 3 parallel | api conforms to contract (slug, sessions, admin, soft-delete, ownership, cron); `formatPalette` per-field fallback retires; **`cron.ts:24` unbounded `$nin` inverts via the utility's `pinnedCron.cronPrune` helper** (mirrors fourier-A.W4 janitor invert); `migrate-palette-schema.ts` backfill artefact (counts + sample diff) proves no loss — script uses utility helpers; named e2e specs (`e2e/palette-features.spec.ts`, `palette-slug-management.spec.ts`, `propose-name.spec.ts`) green against the new schema; **`api/src/crud/` utility module landed per `coordination/CRUD-LIB-TS.md` (U4 spec); slug-words data consumed from `coordination/SLUG-WORDS.md` (U2 spec) via the precepts location** | **RETIRED 2026-05-26 — DISCHARGED-IN-SUBSTANCE-BY-D-AND-E** (`formatPalette ??` excision at D.W2 Lane D `ee8bfa4`; `cron.ts $nin` rewrite at E.W2 Lane A `417c3a5`; utility-module shape orphaned by D.W2 Lane C's chosen architecture; see FINAL.md §2 Axis 1) |
| W3 | Demo native Palette consumption | 2 parallel | `demo/color-picker` + `demo/hero-lab` consume the library `Palette` type as first-class; `PersistedPalette` (renamed from demo `Palette`) layers over it; palette save/list/fork/vote flows render identically to value.js-B close baseline; Playwright re-probe 3 viewports light+dark green; **demo flows continue to consume the api boundary — `api/src/crud/` utility is server-side only and does not enter the demo** | **RETIRED 2026-05-26 — ORPHANED** (no library `Palette` to consume; paired with W1) |
| W4 | Close | 1 | `PROGRESS.md` reconciled; `FINAL.md` cites every commit + artefact; cohort coordination doc marked discharged | **CONVERTED-TO-RETIREMENT 2026-05-26** (the AB+1 retirement ceremony in FINAL.md substitutes for the planned-form close) |

Provisional pending joint Wχ close. W1 is the cross-repo substrate lane (fourier-B.W4 consumes the published version). W2 + W3 are independent at file bounds and may run concurrently. value.js-C dispatches no own research wave — it joins fourier-B's joint wave.

## §4 — Phases

**Phase 0 — open + research acquisition (W0).** value.js-B must be closed (its `FINAL.md` cited). Joint research artefacts pulled in by reference; ratified `CRUD-CONTRACT.md` becomes the substrate W2 implements against.

**Phase I — library substrate (W1).** Two consumers wait on the `Palette` type — fourier-B.W4 (fourier's consumer wiring) and value.js-C.W3 (demo wiring). W1 lands the type *and* swaps one demo site to prove invariant-4 substrate-with-consumer.

**Phase II — api alignment + demo wiring (W2, W3).** Independent at file bounds; may run concurrently.

**Phase III — close (W4).**

Hardened spec files (`waves/W*.md`) land at joint Wχ close; W0 and W4 specified inline.

## §5 — Critical files and ownership

Refined at joint Wχ; known scope:

| Surface | Files | Owning wave |
|---|---|---|
| Library — Palette type | `src/index.ts`, `src/transform/**`, `src/parsing/**` | W1 |
| Library — `colorScale` | `src/transform/**`, public re-exports | W1 |
| Library — `sampleToSVGPath` | `src/easing.ts` (generalises the cubic-bezier sampler), public re-exports | W1 |
| Library — vitest | `test/**` | W1 |
| palette-api — types + helpers | `api/src/types.ts`, `api/src/routes/palettes.ts` (retire `formatPalette` `??` fallback; refactor to consume `api/src/crud/` helpers) | W2 |
| palette-api — facility | `api/src/slugWords.ts` (re-points at `coordination/SLUG-WORDS.md` data per U2), `api/src/routes/{sessions,admin}.ts`, `api/src/cron.ts` (delegates to `pinnedCron.cronPrune`), `api/src/hash.ts`, `api/src/db.ts`, `api/src/middleware.ts` | W2 |
| **palette-api — utility module (per-language, ~500 LOC)** | **`api/src/crud/{index,slugs,cursors,errors,etag,idempotency,softdelete,pinnedCron}.ts` per `coordination/CRUD-LIB-TS.md` (U4 spec) — substrate consumed by `routes/palettes.ts`, `cron.ts`, and `migrate-palette-schema.ts`** | **W2** |
| palette-api — migration | `api/src/migrate-palette-schema.ts` (create — consumes utility's `softdelete`/`cursors` helpers) | W2 |
| Demo — color-picker palette flows | `demo/color-picker/**`, `demo/@/components/custom/palette-browser/**` | W3 |
| Demo — hero-lab palette consumers | `demo/hero-lab/**` | W3 |

Disjoint between W1, W2, W3 by directory.

## §6 — Hard gates

Tranche-level close gates (per-wave gates in hardened `waves/W*.md` after joint Wχ):

- `src/` ships `Palette` + `colorScale` + `sampleToSVGPath`; vitest covers both library and demo consumption; npm version bumped and tagged.
- fourier-B.W4 consumes the new value.js version; its `colors.ts` LOC drop materialises (cross-repo evidence in `fourier-analysis/docs/tranches/B/PROGRESS.md`).
- palette-api docs match ratified schema with no `??` defaulting fallback; backfill artefact proves no loss.
- palette-api conforms to `CRUD-CONTRACT.md`: slug, sessions, admin, soft-delete, cron, ownership.
- Playwright probe green across 3 viewports for palette CRUD flows; zero console errors; zero non-2xx assets (per value.js-A invariant 3 / B invariant B4).
- No shared framework, no codegen, no third service introduced (cohort invariant 16) — joint challenge certifies.

## §7 — Cross-tranche debt and explicit deferrals

**Inherited from value.js-B:**

- B closes with `FINAL.md` and zero open ledger items (B invariant B5). C does not re-litigate B; B's `FINAL.md §debt` is C's input.
- The library audit run in B.W4 (Mandate 12 AND) seeds C's `Palette` design — if B.W4 surfaces gaps adjacent to `Palette` (`src/transform/`, `src/parsing/`), they are addressed here, not deferred.

**Cross-repo dependency:**

- **Joint research + challenge** owned by fourier-B; value.js-C does not dispatch its own research wave. If joint Wχ surfaces a value.js-specific question Wα did not answer, a tightly-scoped value.js-C-side mini-research lands between W0 and W1 with question + agent prompt + deliverable named explicitly.
- **Contract ratification** at fourier-B.W1 requires value.js sign-off; value.js-C.W0 carries that sign-off. The contract document lives in fourier's repo; value.js-C cites it.

**Deferred:**

- None pre-emptively. Any item joint Wα surfaces that does not fit C's thesis is named in `FINAL.md §debt` with a destination, never silently deferred.

## §8 — Brittleness window (provisional)

W2's palette-api schema migration may require a brittleness window. Declared provisionally:

```yaml
breaking_changes_during_wave: maybe (W2)
suspended_gates:
  - palette read endpoints during schema cutover
restoration_wave: W2 (same wave — migration completes within it)
reason: the `formatPalette` `??` defaulting IS the brittleness shim cohort invariant 17
        forbids carrying forward; W2 closes by retiring it, not extending it.
```

Joint Wχ confirms or removes. Close ceremony cannot run while open.
