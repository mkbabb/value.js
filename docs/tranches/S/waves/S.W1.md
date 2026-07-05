# S.W1 — LIBRARY: the 2.1.0 wave (S-24)

**Name**: W1 — Library (the 2.1.0 wave)
**Opens after**: S.W0 (runs parallel with S.W2 — round 1; intra-round ordering below is binding).
**Spec of record**: `audit/SYNTHESIS.md §3.3` (items W1-1..W1-9 + gate riders) · §4 library slate · Q2/Q3/Q9 outcomes from `S.md §12`.
**Agents**: ≤4 parallel by file-family (color / parsing / core / god-module), with two sequencing laws: **W1-6's `safeAccentCssString` is the wave's FIRST landing** (a one-function patch W2-2 waits on) and **W1-8's `stylesheet.ts`/`color.ts` decompositions are sequenced LAST** (recursive-grammar risk; do not split under time pressure).
**Hard gate**: composite (§Hard gate) — 2.1.0 published + tagged · vitest green incl. NEW dark-band + independent-oracle regressions · okhsl dodged band reinstated · caches bounded · cap-check per the census cohesion verdict · PT-E dispatched.
**Status**: PENDING-RATIFICATION.

---

## §Goal criterion

The library's one numerical defect cured structurally, the parsing P0s closed, the
memory-growth vector capped, and the two src surfaces the design waves consume shipped.
(SYNTHESIS §3.3 Goal, verbatim.)

## §Completion criterion

2.1.0 published + tagged; vitest green incl. NEW dark-band + independent-oracle regressions; the
okhsl dodged sweep band reinstated; parse caches bounded; PT-E letter dispatched. (SYNTHESIS
§3.3 Completion, verbatim.)

---

## §Scope (SYNTHESIS §3.3 item table, transcribed verbatim — anchors + evidence lanes intact)

| # | Item | Anchors | Evidence lane |
|---|---|---|---|
| W1-1 | **`srgbToLinear` decode-threshold fix** (the booked defect — its "next minor" trigger fires HERE): guard → `SRGB_TRANSITION`; **delete `gamut.ts`'s inline twin** (the "circular dep" justification is stale — `transfer.ts` is a 0-import leaf) + `clamp` from `../../math`; dark-band goldens (`rgb(1..10/255)→XYZ.Y` hand-computed) + a self-inverse roundtrip test that does NOT reuse the library as oracle (the current `gamut-boundary.test.ts` oracle is circular); reinstate `test/okhsl.test.ts`'s dodged domain | `transfer.ts:30`; `gamut.ts:25-52`; `okhsl.test.ts:63-79` | lib-color-audit P1×2; legacy-sweep-src P0 |
| W1-2 | **`round()` optional-strategy crash** (spec-legal CSS throws): the two-branch idiom already proven at `index.ts:197-205` (the branch implementation; :188-196 is its explanatory comment); retire the test comment that carves around it | `src/parsing/math.ts:144-154`; `grammar-2026-values.test.ts:38-46` | lib-parsing-audit F-1 |
| W1-3 | **Extract depth-walk**: route `extractStyleRules`/`extractAnimationOptions` through the existing `itemChildren` recursion (silent empty results for nested at-rules today) | `extract.ts:135-144,253-264` | lib-parsing-audit F-2 |
| W1-4 | **`fail(message)` → `mergeErrorState`** (3 authored messages currently discarded); `.eof()` swap in stylesheet.ts | `parsing/utils.ts:305-309`; `stylesheet.ts:847-854` | lib-parsing-audit F-4/F-9 |
| W1-5 | **Bound the 7 unbounded memoize caches** (`parseCSSColor` et al. — the code-provable memory-growth vector under drag; the LRU machinery + the `COMPUTED_MEMO_MAX_ENTRIES` precedent already exist in-file) | 7 sites listed at perf-general §4 | perf-general P1; lib-parsing F-6 |
| W1-6 | **New src surfaces (consumed downstream)**: `sampleOKLChSliceBoundary(hue, columns)` (the L×C cusp polyline for W5-8 — the demo never re-derives gamut geometry) · canonical `resolveEasing(string→TimingFunction)` (feeds W5-9; kf/glass-ui converge on it later) · `safeAccentCssString` (retires the demo's hand-denorm blocks, W2) · **ICtCp public space class** if Q9 ratifies (the matrix math already shipped inside `deltaEITP`; cheapest net-new space ever — parsing + `color2()` dispatch + roundtrip goldens + `color2Into` currency) | `boundary.ts`; `easing.ts`+`parsing/easing`; `contrast.ts:185`; `difference.ts:143` | design-gradient P1-6; lib-core P2-4; state-color P1-4; deferred-books §4 |
| W1-7 | **Public-surface hygiene** (land as N small commits, not one — the sub-fixes are independent): `color-soa.ts` excise-or-gate per Q3 (orphan API, phantom consumer) · `reverseCSSIterationCount` wired to its inline twin (keep the export — published API) · `logerp` per Q2 · **`unpackMatrixValues` 2D-branch DEFECT**: the live code emits nonsense atan2-derived rotateX/rotateY for a planar `matrix()` transform (`utils.ts:304-306` — `rotateY = atan2(-c, a)`, `rotateX = atan2(b, d)`); the fix is to return 0 for the two out-of-plane rotations (this bullet is the defect-to-cure, NOT current behavior) · `ch`-unit `getContext` null-narrow (kill the blanket catch masking a null-deref) · `flattenObject` O(N²) flatten-after-loop · `toFixed` trailing-zero consistency · docstring truth (vh/cqw "computed" claim is false — correct or wire) | lib-core P1-1/P1-2/P2-1/-3/-5/-6; legacy-sweep-src P1/P2 | lib-core-value-audit; legacy-sweep-src |
| W1-8 | **God-module round (src)** — every split cohesion-driven (concern boundaries, not LoC chops), per the census: `STYLE_NAMES` → data module; **`color/index.ts` (968 LoC) gets BOTH lifts** — `serialize.ts` (~200 LoC apply-path serializers; lib-color) AND `spaces.ts` (the 15 near-identical space subclasses, ~400 LoC; census) — base `Color<T>`, the `ColorChannel` brand, and `ch()`/`channelOf()`/`setChannel()` stay in `index.ts` as the barrel, mirroring the G.W1 Lane B `conversions/` split one level down (the serialize-only lift would have left the file ~750 LoC, still over the cap); **`units/utils.ts` (722)**: the container-query/writing-mode/font-metric block (~140 LoC, `:349-492` — the census's "genuinely mixed concerns" verdict) → `units/dom-metrics.ts`; NOTE (pass-4 evidence spot, verified live at `src/units/utils.ts:512-625`): the census's "only DOM-touching code" claim was imprecise — `convertToPixels`/`convertAbsoluteUnitToPixels` in the REMAINDER also call `getComputedStyle`/`document`/canvas APIs, so the extraction improves cohesion but does NOT purify the remainder of DOM; the W1-8 implementer decides at the split whether those two ride into `dom-metrics.ts` (cohesion-driven call) — either outcome is verdict-clean; the generic flatten/unflatten stays where CLAUDE.md documents it (a root-utils fold is a recorded future decision, not assumed); **`units/normalize.ts` (550)**: the ResizeObserver layout-epoch cache (~165 LoC, :89-254) → `units/layout-cache.ts` — the documented `as unknown as` irreducible travels with it (the CLAUDE.md ledger cite updates in the same commit); `constants.ts` named-color table → `color-names.ts`; `dispatch.ts` comment-diet (NO structural split — the runtime is cohesive; verdict from lib-color); the 7 hand-rolled scanners consolidate onto a generalized `balancedText` StopPredicate in utils; `stylesheet.ts` (864)/`color.ts` (854) decomposition is scoped-but-sequenced LAST (recursive-grammar risk; tests before/after each extraction; do not split under time pressure) | god-module-dry-census §1; lib-parsing F-3/F-5 | god-module-dry-census; lib-color P2; lib-parsing |
| W1-9 | **PT-E dispatch**: the parse-that 1.1.0+ ask letter — scoped per-parse diagnostics (cures the structurally-dead `ParseDiagnostic.expected`), combinator-inference tightening, Pratt-stays-dormant on the record; pair with the value.js-side decision on the dead `expected` field | parse-that-audit §4 | parse-that-audit |

### Gate riders (SYNTHESIS §3.3, transcribed verbatim — the cap-check bar is pass-4-final)

Fresh-build `.d.ts` guard; `color2Into` currency through any new space; boundary goldens
untouched by the srgb fix except the expected near-black fixtures (enumerate the moved fixtures
in the commit message — never silently regolden); **post-W1 cap check** (the census cohesion
verdict GOVERNS, the raw LoC number does not): **no SPLIT-WORTHY `src/` file remains over-cap
(>500 LoC) without a recorded ledger row.** Two rows fire by construction: the sequenced-LAST
parsing decompositions (`stylesheet.ts`/`color.ts`) if deliberately stopped short, and
`units/utils.ts`, whose enumerated W1-8 lift (the ~140-LoC DOM block out of 722) leaves ≈582 —
over-cap BY CONSTRUCTION while the flatten/unflatten root-fold stays the recorded deferred
decision, so it is a near-guaranteed ledger row at wave close (only a separately-taken-up
root-fold retires it). The census's NOT-god-module / No-split files stay **accepted-over-500 by
verdict, not by exception** — no ledger row, no alarm: `scroll-timeline.ts` 667 ·
`parsing/index.ts` 587 · `transform/path.ts` 562 · `transform/decompose.ts` 541 ·
`color/dispatch.ts` 522 · `easing.ts` 515 · `gamut.ts` 514 · `parsing/math.ts` 509 ·
`color/constants.ts` 613 (LoC + verdicts transcribed from god-module-dry-census §1;
`color/constants.ts` additionally sheds `COLOR_NAMES` via W1-8's data lift and may land
under-cap — either standing is verdict-clean). Note for the wave-close check: `easing.ts` is
EXPECTED to grow under W1-6 (`resolveEasing` lands there) — an over-500 reading at close is the
standing verdict plus booked growth, neither a false alarm nor a silent miss; only a fresh
census re-verdict (cohesion, not count) could flip it to SPLIT-WORTHY. The same parity note
binds `color/dispatch.ts` (522): W1-6's ICtCp fold adds a `color2()` dispatch arm there — its
over-522 reading at close is likewise standing-verdict-plus-booked-growth.

### Publish note (SYNTHESIS §4, binding)

The 2.1.0 publish note names the srgb fix as **output-changing for near-black** (≤2/255, 8-bit
1..10 band) and enumerates the regoldened fixtures. ICtCp rides Q9. **Deliberately NOT done**
(recorded): R-8 gamut-relative spaces (KILLED) · sibling-index/count, device-cmyk, ICC · R-7
HCT/CAM16 · R-4 raytrace (Q8) · Pratt calc() transposition (do NOT pull forward).

## §Triumvirate dispatch

Mandatory on:

- **bounds expansion**: any `demo/`, `api/`, or `../glass-ui` write (this is a src-only wave);
  any published-API removal beyond Q3's `color-soa.ts` outcome;
- **non-local gate failures**: the dark-band goldens disagreeing with the hand-computed oracle
  (the fix premise, not the fixtures, is then in question); a W1-8 extraction breaking the
  recursive grammar's tests (halt the split — the sequenced-LAST discipline exists for this);
  `color2Into` currency failing through ICtCp (the Q9 fold's own gate);
- **loop halt**: the third iteration of any golden-regeneration loop halts and routes (never
  silently regolden).

## §File bounds · disjointness · worktrees

| Item family | Files | Access |
|---|---|---|
| color (W1-1, W1-6 boundary/ICtCp) | `src/units/color/conversions/transfer.ts` · `gamut.ts` · `boundary.ts` · `contrast.ts` · `difference.ts` · `dispatch.ts` (ICtCp arm) · new goldens/tests | modify/create |
| parsing (W1-2..W1-5, W1-8 scanners + LAST decompositions) | `src/parsing/{math,extract,utils,stylesheet,color,index}.ts` + tests | modify/create |
| core (W1-7, W1-6 resolveEasing) | `src/units/utils.ts` · `src/math.ts` · `src/easing.ts` · `src/utils.ts` · `color-soa.ts` (per Q3) | modify/delete |
| god-module (W1-8 lifts) | `src/units/color/index.ts` → `serialize.ts`+`spaces.ts` · `units/utils.ts` → `units/dom-metrics.ts` · `units/normalize.ts` → `units/layout-cache.ts` · `constants.ts` → `color-names.ts` · `STYLE_NAMES` data module | modify/create |
| W1-9 | `letters/PARSE-THAT-PT-E.md` (dispatch) | dispatch |

Do NOT touch: `demo/`, `api/`, `../glass-ui`, `../parse-that` (letter only), `docs/precepts/`.
Parallel agents run in sibling worktrees cut from the wave head, one per file-family; the
god-module agent's `color/index.ts` lifts and the color agent's `dispatch.ts` ICtCp arm are
sequenced (color lands first) — the two share `color/` barrel surfaces.

## §Hard gate (verbatim-faithful to SYNTHESIS §3.3 + riders)

1. **2.1.0 published + tagged** (registry `dist-tags.latest=2.1.0`; annotated tag pushed);
   publish note carries the near-black output-change + regoldened-fixture enumeration.
2. vitest green including the NEW dark-band goldens (hand-computed oracle), the non-circular
   self-inverse roundtrip test, and the reinstated okhsl dodged band.
3. `round()` optional-strategy parses spec-legal CSS (the carve-around test comment retired);
   extract depth-walk covers nested at-rules; `fail()` messages reach `mergeErrorState`.
4. All 7 memoize caches carry a `maxCacheSize` bound.
5. W1-6 exports exist + are consumed by tests (`sampleOKLChSliceBoundary`, `resolveEasing`,
   `safeAccentCssString`; ICtCp per Q9 with roundtrip goldens + `color2Into` currency).
6. Fresh-build `.d.ts` guard green; the post-W1 cap check per the census cohesion verdict (the
   near-guaranteed `units/utils.ts` ledger row recorded, not silently missed).
7. PT-E letter dispatched (W1-9).
8. `npm run lint` 0 · `npm run typecheck` 0 · `npm test` green · `npm run build` clean.

## §No-workaround prohibitions (binding)

- **Never silently regolden** — every moved fixture is enumerated in the commit message.
- **No carve-out test comments** — a known divergence gets a ledger row or a fix (S lesson 5).
- **Do NOT pull the Pratt calc() transposition forward** (parse-that-audit §4.3 — KEEP-DORMANT).
- **No LoC-chop splits** — every W1-8 split is cohesion-driven; do not split `stylesheet.ts`/
  `color.ts` under time pressure.

## §Format + lint cadence

`npm run lint` + `npm run typecheck` + `npm test` after each item batch and before close;
`npm run build` (fresh dist + `.d.ts` guard) before the publish; the boundary-golden suite
re-run after W1-1 and after any W1-8 color-tree move.

## §Verification artefacts

Saved at close (cited in `PROGRESS.md`): the publish + tag record (registry check output); the
dark-band golden table (hand-computed values alongside); the cap-check table (file → LoC →
verdict → ledger row where fired); the regoldened-fixture enumeration (commit message cite); the
PT-E dispatch record; per-item commit hashes.

## §Commit plan

W1-6 `safeAccentCssString` FIRST (unblocks W2-2); W1-1 (srgb fix + gamut twin deletion + goldens,
one commit — the census's "bundle the DRY fix in the same commit" rider); W1-2/W1-3/W1-4
(parsing P0s, row-scoped); W1-5 (cache bounds); W1-6 remainder (boundary sampler, resolveEasing,
ICtCp per Q9); W1-7 as N small commits (the sub-fixes are independent — SYNTHESIS pass-2 note);
W1-8 per-lift commits, `stylesheet.ts`/`color.ts` LAST; the version commit + tag; a status
commit at close.

## §Dependencies

- **Depends on**: S.W0.
- **Blocks**: S.W3 + S.W4 (round 2); W2-2 (consumes `safeAccentCssString`); S.W5 (consumes
  `sampleOKLChSliceBoundary` + `resolveEasing`); S.W7 (gamut-guarded accents).

## §BOOKS opened/serviced (books-never-gates)

- **`srgbToLinear` decode defect** — FIRES here (the book's own "next output-changing minor"
  trigger); retired at the 2.1.0 publish.
- **R-6 ICtCp** — FOLDS here per Q9 (Jzazbz stays deferred — unrelated math).
- **Q2 `logerp` reorder** — NEW BOOK for 3.0.0 if Q2 ratifies at the default.
- **`Color.try()`** — stays booked (soft demand recorded; does not clear the bar).
- **Cap-check ledger rows** — `units/utils.ts` (near-guaranteed) + `stylesheet.ts`/`color.ts`
  if stopped short: recorded at wave close.

## §Evidence packets consumed

`audit/lanes/lib-color-audit.md` · `audit/lanes/lib-parsing-audit.md` ·
`audit/lanes/lib-core-value-audit.md` · `audit/lanes/legacy-sweep-src.md` ·
`audit/lanes/god-module-dry-census.md` §1 · `audit/lanes/perf-general.md` §4 ·
`audit/lanes/parse-that-audit.md` §4 · `audit/lanes/deferred-books-census.md` §4.

## §Hand-off

Round 2 opens on this wave (+W2): W3 measures against the coalesced sink; W4 designs atop the
published surfaces. W5-8/W5-9 consume the W1-6 exports — ZERO new demo math. The 2.1.0 cut
carries the KF courtesy note (`letters/KF-COURTESY.md`).
