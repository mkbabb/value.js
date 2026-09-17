# PROGRAM PB-COLOR — FINAL (thrice-adjudicated) — the value.js color restore program (arm-B, 2026-07-19)

> Amended from `program-PB-color.md` after the thrice loop: skeptic 1
> (`thrice-PB-color-skeptic1.md`) + skeptic 2 (`thrice-PB-color-skeptic2.md`) +
> this adjudication (every claim re-proven or disproven on my OWN git/tree reads —
> never vote-counted; the two skeptics directly contradicted each other on Halley
> and both were part-wrong). Canon: L1 §3 · L2 P2 · addenda C13/C17/C20/C21 ·
> armB sweep §9. Firewall honored: zero vnext/snapshot/armA input.
> **Wave count: 8** (down from 14: five grammar/eval rows CEDED to PA-parse by
> named seam, three decision-shells collapsed into the OD docket, one census wave
> ADDED — the completeness organ both skeptics proved missing).

---

## 1. CHARTER (amended)

The color program is a **RESTORE, not net-new** (P2.1) — with ONE honestly-labeled
exception: the multi-gamut analytical mapper is **part-restore / part-NEW** (the
pre-v4 sRGB engine — cusp + one-Halley-step, `164343c1^:src/units/color/gamut/gamut.ts`
— restores as-was; its sector coefficients are **sRGB-fit** by the pre-v4 tree's own
comment, so the display-p3/rec2020/a98/prophoto generalization is priced as novel
numerics, never sold as transcription). The loss is SINGLE-SIDED (value's v4 cut
`164343c1`, zero tombstones); kf never owned gamut code and is **consume-only +
scar-deletion**. Every wave lands under the **frozen v4 facade** (`color/index.ts:33-40`:
convertColor · interpolateHue · mapColorToGamut · mixColors · safeAccentColor ·
toRgba8 — signatures never move; anchors re-derived at execution per §7 law 3); every
restore is **ADDITIVE** on the 4.1.x vehicle (W56/D54). The co-land posture, honestly
priced: the program owes nothing to the value-5 BREAKING boundary, but (a) the kf
scar-deletion depends on a **kf pin-advance** (kf pins value EXACT `4.0.0`,
`keyframes-v-exec/package.json` deps block — a cheap minor-pin bump to ≥4.1.x, kf-owned,
named as a rider in the dispatch letter, NOT the value-5 co-land), and (b) waves 03/04
CHANGE `mapColorToGamut`/`safeAccentColor` outputs inside a minor — priced with a
behavioral CHANGELOG row + DELTA plates presented at the 4.1.x cut.

**C13 (zero-alloc) discipline is STRUCTURAL + bench-witnessed** — per the owner's
retired-proof-idiom feedback and C21: kernel zero-alloc is enforced by SIGNATURE
(scalar-tuple in/number out; out-param `returned === out`), witnessed by rows in the
ONE resurrected `bench/` spine (this program owns resurrecting the **color-bench
eight** — `color-alloc-hotpath`, `color-channel-access`, `color-dispatch`,
`color-interp`, `color-soa-fold`, `color2-direct-paths`, `gamut-boundary`,
`numeric-soa`, all real at `164343c1^:bench/`; PA-parse F-03 owns bench INFRA + the
parser witness; arrival-order rider: if infra is unlanded when wave 04 needs it, this
program lands the infra and PA-parse's row folds). Measurement units are HONEST:
heapUsed **bytes/call**, object counts only via heap sampling where bytes are
ambiguous; **budgets are RATIFIED in-wave against the historical measured datum
(P3.2: gamut path 37→9 allocs/call), never pre-committed** — the prior ≤3-facade
fantasy and the invented "16 live spaces" (there are **17**, `src/color/model.ts:4-7`)
die here.

**Born-RED is labeled honestly**: TRUE born-RED only where the defect is LIVE (the
§13-non-conformant bisection; the unpapered-drop paper debt); suites that are RED
merely because a restored feature is absent are labeled **authored-RED** (ordinary
TDD, not gate rigor). The **capability-diff gate cannot see pre-4.0.0 drops** (it
diffs vs the prior tag; 4.0.0 already lacks the dropped surface) — the census wave
(02) is the cure and the retro-tombstone paper rides the first 4.1.x CHANGELOG.

**Grammar cession (the collision cure)**: P2.2 rows 6/7/10/11/12 + row 8's grammar
half are **CEDED to PA-parse F-05/F-06 under OD-PA-1/2/3** by named seam — PA-parse's
own row-landing already claims them ("row 6 · row 7 · row 8 (grammar half) → F-05";
"row 10 · row 11 · row 12 → F-06 + OD-PA-1/2/3") and every force vector agrees: they
land in `src/css/`, gate on parse/serialize vectors, depend on R-PARSER, and the
relative-color prior art lives in the parser tree (`164343c1^:src/parsing/color/relative-color.ts`).
The former OD-C2/C3/C4 are DELETED as duplicate dockets; this program contributes
evidence exhibits into PA-parse's rows (the HDR asymmetry probe: `ictcp`/`jzazbz`
factories live at `color/index.ts` while their css parse is dead). U-F29/U-F30 family
vectors are PA-parse's declared cargo (their F-03/F-05) — not double-carried here.
With the cession, this program's EXT:R-PARSER dependency edge is DELETED.

Tombstones honored: 3.0.0 SoA, OO/ValueUnit, BBNF files — never re-litigated.
Resurrection recipes CORRECTED (the pre-v4 tree has **no `src/color/`**):
`git show 164343c1^:src/units/color/difference.ts` (ΔE2000/ITP + HDR raws) ·
`…/gamut/gamut.ts` (Ottosson engine, `DELTA_E_OK_JND = 0.02` at `:63`) ·
`…/gamut/{boundary,raytrace,okhsl}.ts` · `…/colorFilter.ts` · `…/contrast.ts`.
Conventions: thrice (C20) on every wave; routing per C17 (Fable = novel numerics,
adjudication, cross-repo letters; Opus = census scripts, vector transcription,
mechanical resurrection); tests mirrored under `test/color/…` (C11); additive exports
via `color/index.ts` + the frozen subpath keys, with the **subpaths-dissolution seam
NAMED**: the structure program dissolves `subpaths/` concurrently — export rows here
land through whatever specifier shape that program's D50-bounded ruling makes
canonical (file-level collision declared, not discovered).

---

## 2. THE WAVE SET

### F-PB-color-01 | value.js | R-DELTAE (program root — the ledger's own PREREQUISITE runs first)
- **Intent**: Restore `deltaEOK` (+ `DELTA_E_OK_JND = 0.02`), `deltaE2000`, `deltaEITP`
  as-was — and they ARE as-was: scalar-tuple kernels (`deltaEOK(L1,a1,b1,L2,a2,b2)`
  at pre-v4 `gamut.ts:65-ff`; `deltaE2000`/`deltaEITP` in `difference.ts`), typing
  untouched by the v4 model (numbers in, number out — zero-alloc BY SIGNATURE).
- **Deliverables**: `src/color/delta-e.ts` (recipes: `164343c1^:src/units/color/difference.ts`
  + `gamut/gamut.ts`); additive exports; Sharma-2005 ΔE2000 + ITP + OK-JND reference
  vectors in `test/color/delta-e.test.ts`; CHANGELOG RESTORED rows by name; a
  `color-interp`-family bench row (witness, not gate).
- **Acceptance gates**: authored-RED by absence (grep truth: `deltaE` = 0 hits in live
  src — verified); GREEN = all three metrics within reference tolerance. NO heap gate
  (a heap-delta gate on `dL*dL+da*da+db*db` is vacuous-green by construction —
  signature enforces the invariant).
- **Dependencies**: none.
- **π/DELTA**: none.
- **Routing**: Opus (mechanical resurrection + dataset transcription); Fable at thrice only.

### F-PB-color-02 | value.js | DROP-CENSUS LOCK + retro-tombstones (the completeness organ; runs parallel to 01)
- **Intent**: The machine census the charter preached and never ran: export-census
  diff **v3.1.0-tag ↔ 4.0.0 ↔ HEAD** over the color-adjacent published surface
  (`subpaths/color.ts` + `src/index.ts` color rows). EVERY prior symbol gets a
  terminal row: RESTORE (pointer to its owning wave) / SUPERSEDED tombstone /
  DECLINE tombstone / owner-tier docket row. Named at birth (all verified published
  at `164343c1^:src/subpaths/color.ts`): `rgb2ColorFilter`/`cssFiltersToString`
  (`:217` — the P2.1-named capability BOTH skeptics caught this program silently
  dropping), `GAMUT_SECTOR_COEFFICIENTS` (`:82`), the HDR conversion raws
  `rawXyz2ictcp`/`rawIctcp2xyz` (`:194`) + `rawXyz2jzazbz`/`rawJzazbz2xyz` (`:195`),
  the direct per-pair fast paths `hsl2rgb`/`oklch2xyz`/`xyz2rgb`/`linear2srgb`/`hex2rgb`
  (`:202-206`), `sampleGamutBoundary`/`Into` (`:136`), `mixColorsN`/`sampleColorRamp`/`At`
  (`:132`). Cures the capability-diff gate's structural blindness to pre-existing
  drops (§7 law 1's unpapered-six-families debt gets its owner).
- **Deliverables**: the census script (tri-tag export extraction + diff, output to
  the program record); the disposition table (every symbol → terminal row); the
  retro-tombstone CHANGELOG text staged for the first 4.1.x cut; the **C12 color-slice
  gap register** filed as named INPUT to PA-parse F-04's spec-completeness census by
  seam (`light-dark()`, `device-cmyk()`, custom `color()` profiles, system colors —
  all grep-0 in live src, verified; the census MECHANISM is PA-parse's; this program
  never again claims the C12 slice via four examples).
- **Acceptance gates (born-RED — the paper debt is a LIVE defect per §7 law 1)**:
  the census check FAILS while any prior symbol lacks a terminal row; GREEN = zero
  unrowed symbols + staged tombstone text + the gap register dispatched.
- **Dependencies**: none (parallel root).
- **π/DELTA**: none.
- **Routing**: Opus (census mechanics); Fable adjudicates contested dispositions.

### F-PB-color-03 | value.js | §13 CONFORMANCE CURE (minimal, decoupled from the engine port)
- **Intent**: Correctness ships FIRST on a small diff. CSS Color 4 §13's reference
  algorithm IS a chroma bisection with a ΔE-OK JND stop + local clip (corroborated
  by the pre-v4 tree's own wide-gamut path: `dispatch.ts` "the CSS Color 4 §13.2
  reference strategy… JND early-exit… local-MINDE break", `CHROMA_SEARCH_STEPS = 24`).
  The live 32-iteration bisection (`operations.ts:133-160` region — no ΔE stop, no
  clip comparison) is a small diff from conformant: add the JND stop + the
  clipped-within-JND comparison, on `deltaEOK` from wave 01.
- **Deliverables**: the **executable §13 spec-reference implementation as the vector
  GENERATOR (named deliverable** — WPT css/css-color is thin-to-absent on
  gamut-mapping vectors; mapping is non-interoperable across browsers; provenance is
  owned, not hand-waved); the spec-derived clip/JND conformance corpus + hue/round-trip
  vectors for the **17** live spaces (round-trips honestly annotated expected-GREEN —
  regression cargo, not gate theater) under `test/color/conformance/`; the minimal
  cure diff on the extant bisection; behavioral CHANGELOG row (mapped outputs change).
- **Acceptance gates (TRUE born-RED — the program's one live-misbehavior gate)**:
  the §13 vectors FAIL against the live bisection today; GREEN = the flip on the
  cured bisection. DELTA obligation: before/after swatch plates for
  `safeAccentColor`-driven demo surfaces (static plates, probe parsimony).
- **Dependencies**: F-PB-color-01 (JND stop criterion).
- **π/DELTA**: DELTA as above.
- **Routing**: Fable designs the reference implementation (spec-fidelity is the
  novelty); Opus transcribes vectors.

### F-PB-color-04 | value.js | R-GAMUT-ENGINE (part-restore / part-NEW, honestly priced)
- **Intent**: The analytical engine, in two honestly-labeled halves. **RESTORE half
  (Opus-mechanical)**: the sRGB Ottosson engine as-was — `computeMaxSaturation`
  (polynomial guess + one Halley step, pre-v4 `gamut.ts:106-142`), `findCusp` (`:153`),
  `findGamutIntersection` (closed-form lower half + one Halley step upper, `:168-182`),
  `gamutMapOKLab`/`gamutMapSRGB`, `DELTA_E_OK_JND` — Halley is REAL in the pre-v4 tree
  (9 hits; CLAUDE.md:126 "polynomial guess + one Halley step, zero-iteration");
  raytrace oracle resurrected TEST-SIDE as-was (`gamut/raytrace.ts`). **NEW half
  (Fable numerics, priced as novel)**: the multi-gamut generalization — the sector
  coefficients are sRGB-fit (the pre-v4 dispatch comment says so outright: "the
  analytical Ottosson map is sRGB-specific"), so per-gamut coefficient fits (or a
  basis generalization) for display-p3/rec2020/a98/prophoto are new derivation work
  with achromatic/near-cusp edge-case validation. §13 semantics come from wave 03's
  reference — the engine must MATCH it, analytically (constant-L intersection is
  representable in `findGamutIntersection` with `L0 = L1`). The facade stays frozen.
  **`safeAccentColor`'s two secondary 32-step loops are NOT retired** — they bisect
  LIGHTNESS against a WCAG contrast criterion (`clears()` → float+quantized
  `contrast()`, live `operations.ts:223-303`), which no gamut engine can invert;
  each `evaluate` merely gets cheaper here, and the alloc collapse is wave 05's.
- **Deliverables**: `src/color/gamut.ts` (both halves, scalar-only inner loops);
  facade rewire (the 32-iter bisection in `mapColorToGamut` dies); `test/color/oracle/raytrace.ts`;
  the per-gamut fit validation grid; resurrected color-bench rows (`gamut-boundary.mjs`
  + `color-alloc-hotpath.mjs` first); CHANGELOG RESTORED rows.
- **Acceptance gates**: output-equivalence vs the wave-03 §13 reference within JND
  across the hue×lightness lattice × all 5 RGB gamuts (this inherits wave 03's flip —
  the engine may not regress conformance); boundary agreement vs the raytrace oracle
  (sub-eps tolerance per the oracle's own documented residual); bench rows record the
  measured bytes/call drop with the **historical 9-alloc facade parity as the ratified
  target datum** (P3.2 measured; budgets set HERE, in-wave).
- **Dependencies**: F-PB-color-03 (the reference + the flip it must preserve).
- **π/DELTA**: covered by wave 03's plates unless engine outputs diverge within-JND
  visibly — then a second plate pass (static, one pass).
- **Routing**: Opus for the as-was sRGB transcription + oracle port; Fable for the
  multi-gamut derivation + convergence validation (the REAL novelty tier).

### F-PB-color-05 | value.js | R-INTO — SCI-1 extension on the W56 4.1.x vehicle (never forked)
- **Intent**: The out-param family extended beyond the DECIDED SCI-1 pair (D54 —
  inherit, never re-adjudicate): `convertColorInto`, `mapColorToGamutInto`, and the
  `safeAccentColor` internal loop re-plumbed onto Into kernels — **THIS wave is where
  facade allocs collapse and where iteration-independent allocation becomes true and
  gateable** (each `evaluate` allocates Results through the frozen facade by design;
  only internal Into plumbing removes it — the prior program gated this in wave 03,
  a dependency inversion, cured here). **No idiom-design seat**: the idiom is D54's
  blessed `lerpArray` out-buffer shape, twice-precedented (the pre-v4 tree shipped
  `mixColorsInto`/`sampleGamutBoundaryInto` et al.).
- **Deliverables**: Into variants sharing the wave-04 kernel; additive exports;
  `test/color/into.test.ts` (byte-equality vs allocating twins across the conformance
  corpus + `returned === out` identity); bench steady-state rows (bytes/call ≈ 0 on
  Into ops; `safeAccentColor` allocation independent of iteration count — measured,
  post-re-plumb); the 4.1.x behavioral/pricing CHANGELOG rows ride the vehicle.
  Shared-vehicle note: D-GAP-6 `sampleBezier` rides the same 4.1.x row (easing
  program's cargo — named so the vehicle is not forked).
- **Acceptance gates**: authored-RED by absence (`*Into` grep = 0 in live src/color —
  verified); GREEN = equivalence + identity + steady-state bench rows within the
  wave-04-ratified budgets.
- **Dependencies**: F-PB-color-03 (fixed facade semantics), F-PB-color-04 (the
  kernel); EXT: the W56 release wave (vehicle only).
- **π/DELTA**: none (bit-identical by gate).
- **Routing**: Opus mechanical per-op extension; Fable at thrice.

### F-PB-color-06 | value.js + kf dispatch | R-RAMP + the kf scar-cure dispatch (ordering loosened, gate de-vacuized)
- **Intent**: Restore `sampleColorRamp`/`sampleColorRampAt` + `mixColorsN` on the
  frozen `mixColors` facade — **dep: wave 01 only** (the kf ΔE scar needs only
  `deltaEOK`; ramps are interpolation + stop distribution; the highest-external-value
  item no longer queues behind the hardest numerics). Riders: gamut-clipped-stop
  vector family extends after wave 04; `sampleColorRampInto` rides wave 05's idiom.
  Then the ONE kf dispatch (P4.5 protocol; kf-owned execution).
- **Deliverables**: `src/color/ramp.ts`; additive exports; ramp vectors (stop
  distribution, hue-method interaction) in `test/color/ramp.test.ts`; the INBOUND
  letter `keyframes.js/docs/tranches/V/coordination/VALUEJS-INBOUND-*-ramp-readopt.md`
  whose cargo is (a) a **grep-derived scar CENSUS executed at dispatch time** (§7
  law 3 — the frozen two-line list was already incomplete: live kf HEAD shows the
  hand-rolled `colorDeltaE` at `compile/emit/backward/color.ts:120-124` PLUS stale
  doc references at `backward.ts:30`, `:32`, `:47` AND `animation/index.ts:233` —
  today's five sites are the SEED, the dispatch-time grep is the bound), and (b) the
  **kf pin-advance rider row**: kf pins value EXACT `4.0.0` — the scar deletion is
  executable only after kf advances to ≥4.1.x (a kf-owned minor bump, priced in the
  letter, falsifiable against kf's manifest — NOT the value-5 co-land boundary).
- **Acceptance gates**: authored-RED suite (ramp family grep = 0, verified); GREEN =
  vectors + the letter on disk **with the census attached and the pin-advance row
  present** (letter-existence alone was author-satisfiable — the census + the
  manifest-falsifiable pin row are what an auditor can check against the world).
- **Dependencies**: F-PB-color-01. Riders on 04/05 as named.
- **π/DELTA**: DELTA — ramp swatch strips where demo consumption exists at landing.
- **Routing**: Fable writes the dispatch letter; Opus scaffolds vectors + the census grep.

### F-PB-color-07 | value.js | R-CONTRAST — evaluation half + OD-C1 (grammar half CEDED)
- **Intent**: The WCAG-metrics evaluation surface + the republish-vs-internal
  decision (OD-C1). The `contrast-color()` GRAMMAR half is PA-parse F-05's by that
  program's own seam cite ("the WCAG-metrics REPUBLISH half is the color program's —
  seam cited, grammar half owned here") — the collision dissolves into the seam both
  sides now name.
- **Deliverables**: the contrast/luminance evaluation module (recipe reference:
  `164343c1^:src/units/color/contrast.ts`; the live `operations.ts` contrast
  internals as the modern base); spec vectors on the metrics; the OD-C1 cost sheet
  (republish adds to the frozen surface vs internal-only forgoes); the seam contract
  (node-shape agreement letter with PA-parse F-05 so evaluation binds when their
  grammar lands).
- **Acceptance gates**: metric spec vectors GREEN (honestly labeled: no live defect
  here — this is capability restoration + a decision); the wave is executable under
  either OD-C1 ruling (only the export set differs); the seam contract on disk.
- **Dependencies**: F-PB-color-01 (ΔE-adjacent constants where spec'd); EXT: PA-parse
  F-05 timing for the node seam (evaluation core lands independently).
- **π/DELTA**: none (demo contrast affordances are frontend-program territory).
- **Routing**: Fable for the decision sheet + seam contract; Opus for vectors.

### F-PB-color-08 | value.js | R-OKHSL — OKHSL/OKHSV (correct recipe, one cusp kernel)
- **Intent**: Restore OKHSL/OKHSV — recipe **`164343c1^:src/units/color/gamut/okhsl.ts`**
  (the corrected path), modernized to the v4 space-table idiom, REUSING the wave-04
  cusp kernel (one kernel, two clients; no duplicated solver, per C21).
- **Deliverables**: the space entries + factory exports (`okhsl`, `okhsv`) additive;
  Ottosson reference round-trip vectors; conformance-corpus extension; anchor-graph
  closure through `CONVERSION_ANCHORS`.
- **Acceptance gates**: authored-RED by absence (grep = 0, verified); GREEN =
  reference round-trips within tolerance + anchor closure; kernel zero-alloc by
  signature + a bench row witness.
- **Dependencies**: F-PB-color-04 (cusp kernel).
- **π/DELTA**: none unless the demo picker adopts OKHSL controls (frontend pull;
  obligation transfers as a named rider).
- **Routing**: Fable for space-table integration design; Opus for vectors.

---

## 3. OWNER-DECISION DOCKET CONTRIBUTIONS (one sheet at arm level — no decision-shell waves)

| OD | Question | Program position | Binding |
|---|---|---|---|
| OD-C1 | `contrast-color()` WCAG-metrics: republish vs evaluation-internal | internal lean (frozen-facade parsimony); both costed | F-PB-color-07 |
| OD-PA-1 (HDR) | **PA-parse's docket row** — this program contributes the asymmetry exhibit: `ictcp`/`jzazbz` factories LIVE at `color/index.ts` while their css parse is dead; decline branch owes the by-name tombstone (§7 law 1) | evidence contributed; ownership PA-parse F-06 | seam |
| OD-PA-2 (spring grammar) | **PA-parse's docket row** — value-lean evidence (timing-function grammar precedent, P1.4) contributed; K F6.6 solver fence honored | evidence contributed; ownership PA-parse F-06/F-07 | seam |
| OD-PA-3 (R-EVAL) | **PA-parse's docket row** — WEAK per the ledger; the calc-bearing relative-color subset is PA-parse's exhibit now | ceded whole | seam |
| SoA (was OD-C5 + wave 13) | **BANKED registry row, not a wave**: the 3.0.0 tombstone stands; the null hypothesis (Into loops meet budgets) wins by default (C21); re-trigger = batch bench rows from waves 05/06 missing the ratified budget; the threshold is ratified in THIS sheet before any exhibit runs (no post-hoc goalposts); prototype spend only on trigger; terminal either way, no re-booking | banked-with-trigger | docket |
| R-BOUNDARY (was wave 14) | **BANKED on the W53 pull** (CARRY-LEDGER W53/B1: rebuild the perceived-space plate ON v4 from tag `v-perceived-space-plate-ref-w40`): iff pulled — sampler API from the wave-04 kernel + raytrace oracle agreement + the FULL π/DELTA vs the tag's reference captures travels with the trigger; iff W53 closes without the pull — stays banked with the named re-trigger (any gamut-viz consumer; four-tree census at pull) | banked-with-trigger | docket |
| Census owner-tier rows | contested dispositions surfaced by wave 02 (colorFilter restore-vs-tombstone chief among them; four-tree consumer census at pull per §7) | filed by wave 02 | docket |

---

## 4. ROW-LANDING TABLE — zero silent drops (every original entry carried, ceded-with-seam, or docketed; one previously-DROPPED row landed)

| Source row | Landing |
|---|---|
| P2.2 row 1 R-DELTAE | F-PB-color-01 (root, as the ledger ordered) |
| P2.2 row 2 R-GAMUT | F-PB-color-03 (§13 conformance, TRUE born-RED) + F-PB-color-04 (engine, part-restore/part-new) |
| P2.2 row 3 R-INTO (extends SCI-1; W56 vehicle never forked) | F-PB-color-05 |
| P2.2 row 4 R-PARSER | PA-parse (unchanged; no longer a dependency edge of this program) |
| P2.2 row 5 R-RAMP + kf re-adopt | F-PB-color-06 (dep loosened to wave 01; scar census + pin rider) |
| P2.2 row 6 R-MIX-GRAMMAR · row 7 R-RELATIVE · row 10 R-HDR · row 11 R-SPRING · row 12 R-EVAL | **CEDED by named seam → PA-parse F-05/F-06 + OD-PA-1/2/3** (their row-landing table already claims them; collision dissolved) |
| P2.2 row 8 R-CONTRAST | split per PA-parse's own seam: grammar half → PA-parse F-05; WCAG evaluation/republish half → F-PB-color-07 + OD-C1 |
| P2.2 row 9 R-OKHSL | F-PB-color-08 (corrected recipe) |
| P2.2 row 13 R-SOA | OD docket: banked-with-trigger (3.0.0 tombstone stands; threshold pre-ratified) |
| P2.2 row 14 R-BOUNDARY | OD docket: banked on the W53 pull (π/DELTA travels with trigger) |
| **P2.1 colorFilter (+ the unrowed export families)** | **F-PB-color-02 — previously a SILENT DROP in this program; now census-rowed by name** (colorFilter, GAMUT_SECTOR_COEFFICIENTS, HDR conversion raws, per-pair fast paths, sampleGamutBoundary/Into) |
| P2.1 single-sided loss; kf never owned gamut | charter — kf consume-only; no kf gamut wave |
| P2.1 kf scar tissue | F-PB-color-06 dispatch — grep census at dispatch time (5 known sites as seed) |
| P2.1 no-advocate⇒no-tombstone + §7 law 1 | F-PB-color-02 (retro-tombstones — the capability-diff gate is structurally blind to pre-4.0.0 drops; census is the cure); per-wave RESTORED CHANGELOG duty |
| L1 §3 conformance-vectors-as-new-gate-infrastructure | F-PB-color-03 (the §13 reference GENERATOR is the named deliverable; no standalone infra wave — the corpus lives with its first born-RED client) |
| L1 §3 mapColorToGamut indictment + sweep §9 measurements | F-PB-color-03 born-RED definition (the ~96+ figure restated honestly as a code-read INFERENCE; the gate records the measured bytes/call baseline instead) |
| L1 §3 SCI-1 DECIDED (D54) + P5 + CARRY-LEDGER W56 | F-PB-color-05 (extends; idiom = the blessed shape; no design seat) |
| P5 W53 vehicle | OD docket R-BOUNDARY row |
| P5 D-GAP-6 same-vehicle note | F-PB-color-05 (named; easing program's cargo) |
| P1.5 U-F29/U-F30 family register | PA-parse F-03/F-05 declared cargo (double-carry deleted) |
| P1.4 timing-function grammar precedent | OD-PA-2 evidence contribution |
| P4.5 ownership protocol | F-PB-color-06 dispatch mechanics |
| P4.2 additive/frozen surfaces + kf exact pin | charter (honest pricing: pin-advance rider ≠ co-land; behavioral CHANGELOG + DELTA at the 4.1.x cut) |
| C13 zero-alloc + machine check | charter: structural signatures + the ONE bench spine; color-bench-eight ownership HERE (F-04/F-05 rows); budgets ratified in-wave vs the 9-alloc datum |
| C12 color-side slice | F-PB-color-02's gap register → PA-parse F-04 census by seam (the four-examples-as-done claim retracted) |
| C17 / C20 / C21 / C11 | conventions (routing repriced: Opus for as-was transcription incl. the sRGB engine; Fable for the multi-gamut novelty, letters, adjudication) |
| C1/C15 parse-that bound | travels with the ceded grammar rows (PA-parse's law) |
| P3.4 rows 1 + 6 | wave wiring stays producer+api; capability-diff gate = gates-program interface, its pre-4.0.0 blindness cured by F-02 |
| Sweep §9 ictcp/jzazbz asymmetry | OD-PA-1 evidence exhibit (contributed via seam) |
| subpaths/ dissolution (structure program) | charter seam note — file-level collision NAMED |

Non-color rows sighted but owned elsewhere: R-PARSER + bench INFRA (PA-parse; the
color-bench EIGHT are ours) · capability-diff/manifest/isomorphism gates (gates +
structure programs) · decompose/quantize/subpaths dispositions (structure program) ·
C2/C3/C4/C5/C10/C22 (frontend programs) · C6/C7 (routing/API programs).

---

## 5. ADJUDICATION LOG — every skeptic claim, PROVEN/DISPROVEN on my own evidence

Method: every load-bearing claim re-verified by direct `git show`/`git grep`/`ls-tree`
on value.js (`tranche-u` HEAD + `164343c1^`), keyframes-v-exec HEAD, and the armB
corpus. The skeptics CONTRADICTED each other on Halley; both were part-wrong; neither
was vote-counted.

### Skeptic 1

- **A1 (colorFilter silent drop)** — **PROVEN**. `164343c1^:src/subpaths/color.ts:217`
  exports `rgb2ColorFilter, cssFiltersToString`; P2.1 names colorFilter; the original
  program rowed it nowhere. Adopted: F-02 census row + docket ruling; the anti-drop
  program no longer re-runs the no-advocate mechanism on itself.
- **A2 (unrowed export families)** — **PROVEN**. Verified at `:82/:132/:136/:194-195/:202-206`:
  GAMUT_SECTOR_COEFFICIENTS, HDR conversion raws, per-pair fast paths,
  sampleGamutBoundary/Into, mixColorsN/ramp rows. Adopted: all census-rowed by name in F-02.
- **A3 (capability-diff gate blind to pre-existing drops)** — **PROVEN** (structural:
  §7 law 1 diffs vs the prior tag; 4.0.0 already lacks the dropped surface, so every
  future publish diffs clean). Adopted: F-02 is the cure; retro-tombstones ride the
  first 4.1.x CHANGELOG.
- **A4 (C12 landing fudged)** — **PROVEN**. My grep: `light-dark|device-cmyk` = 0 hits
  in live src; the original program claimed the C12 slice via four named productions
  with no census mechanism. Adopted: claim retracted; gap register → PA-parse F-04
  census by seam (the census is L1 §2 wave-3's own mechanism).
- **B1 (16 vs 17 spaces)** — **PROVEN**. `src/color/model.ts:4-7` enumerates 17; the
  sweep asserts no count — "16" was invented. Adopted: 17 everywhere.
- **B2 (resurrection recipe path wrong)** — **PROVEN**. `git ls-tree -d 164343c1^ src/`:
  parsing/quantize/subpaths/transform/units — **no `src/color/`**; the apparatus is at
  `src/units/color/{difference,colorFilter,contrast}.ts` + `gamut/{gamut,boundary,raytrace,okhsl}.ts`.
  Adopted: every recipe corrected.
- **B3 (wave-03 novelty routing refuted; engine already exists)** — **PROVEN AS AMENDED**.
  The engine EXISTS (my grep: 9 Halley hits — `gamut.ts:106/:116/:142/:168/:182`,
  `raytrace.ts:11/:27`, `boundary.ts:430`, CLAUDE.md:126) so the sRGB half is
  Opus-mechanical transcription, as claimed. BUT skeptic 1 overcorrects: the pre-v4
  analytical map is **sRGB-specific** (dispatch.ts's own comment — "its polynomial
  coefficients are sRGB-fit"), and the program's gate demands all 5 RGB gamuts — the
  multi-gamut generalization is genuine Fable-tier numerics. Adopted: split routing in F-04.
- **B4 (Into idiom design theater)** — **PROVEN**. Pre-v4 exports `mixColorsInto`,
  `sampleGamutBoundaryInto` (subpaths/color.ts:132/:136 region) + D54's blessed
  out-buffer shape. Adopted: no idiom-design seat in F-05.
- **B5 (≈96 is an inference; wrong instrument; pre-committed budget)** — **PROVEN**.
  Sweep §9:163 reads "…⇒ ~96+ allocs/call" — a code-read derivation (32 iters ×
  3 Result-allocating calls), never a measurement; heapUsed-delta measures bytes, not
  counts; the charter pre-committed ≤3 while claiming the table was thrice cargo.
  Adopted: honest units (bytes/call; sampling for counts), budgets ratified in-wave,
  the born-RED gate records the measured baseline instead of gating a derived number.
- **C1 (vacuous dispatch gate + kf pin blocker)** — **PROVEN AS AMENDED**. kf pins
  value EXACT `"4.0.0"` (verified in keyframes-v-exec package.json deps) and the
  letter-exists gate was author-satisfiable. AMENDMENT: the blocker is a kf-owned
  minor pin-advance to ≥4.1.x, NOT the value-5 co-land boundary — skeptic 1 inflates
  it; the charter's "owes nothing to co-land" survives for the BREAKING boundary with
  the pin rider named. Adopted: census-attached + manifest-falsifiable pin row in F-06.
- **C2 (OD scatter violates the single-docket law)** — **DISPROVEN in the strong form**:
  the original §3 WAS a single consolidated sheet, and L1 §9's law binds the return
  presentation, which a program-level table satisfies. The SURVIVING half (decision
  shells inflating wave count) is real — adopted via the collapse (waves 10-14 → seam
  cessions + docket rows; 14 → 8).
- **C3 (born-GREEN corpus mis-rooted)** — **PROVEN**. The original wave 01 sequenced a
  mostly-expected-GREEN corpus BEFORE R-DELTAE, demoting the ledger's own PREREQUISITE
  beneath invented infrastructure. Adopted: no infra root; DELTAE is the root; the
  corpus lives with its first born-RED client (F-03).
- **D1 (decouple the §13 cure from the engine port)** — **PROVEN**. §13's reference
  algorithm IS bisection + JND stop + local clip — corroborated by the pre-v4 tree's
  own wide-gamut path (`CHROMA_SEARCH_STEPS = 24` + "JND early-exit (CSS Color 4
  §13.2 local-MINDE break)"). Adopted: F-03 (small-diff cure, correctness first) /
  F-04 (engine, equivalence-gated) split.
- **D2 (fabricated 06→02 edge)** — **PROVEN** (color-mix's spec involves no ΔE); moot
  after cession — the edge is deleted with the row.
- **D3 (color-bench ownership seam)** — **PROVEN**. `164343c1^:bench/` lists 11 benches;
  8 are color-family (verified by ls-tree). Adopted: this program owns resurrecting the
  color eight as rows in the ONE bench spine; arrival-order rider vs PA-parse's infra.
- **D4 (oracle tests the wrong thing; vector provenance hand-waved)** — **PROVEN**.
  Boundary agreement ≠ §13 mapping behavior; WPT is thin on gamut-mapping. Adopted:
  the executable §13 reference implementation is F-03's NAMED deliverable (the vector
  generator); F-04 gates on BOTH output-equivalence vs the reference AND boundary-oracle
  agreement.

### Skeptic 2

- **F1 (six-row double-booking vs PA-parse)** — **PROVEN by direct read**. PA-parse
  F-05 owns R-MIX/R-RELATIVE/R-CONTRAST-grammar ("the WCAG-metrics REPUBLISH half is
  the color program's — seam cited, grammar half owned here"); F-06 owns
  R-HDR/R-SPRING/R-EVAL under OD-PA-1/2/3; its row-landing claims rows 6/7/8-grammar
  and 10/11/12 outright; U-F29/U-F30 are its F-03/F-05 cargo. Adopted: full cession by
  named seam; duplicate OD-C2/C3/C4 deleted; evidence exhibits contributed instead;
  EXT:R-PARSER edge deleted from this program.
- **F2 (colorFilter)** — **PROVEN** (same evidence as S1-A1). Adopted: F-02 (census row),
  not a dedicated wave — the census wave is the right-sized organ for the whole family.
- **F3a (contrast bisections cannot be retired)** — **PROVEN by direct read** of live
  `operations.ts:223-303`: both 32-step loops bisect LIGHTNESS against `clears()`
  (float + quantized WCAG contrast) — not the gamut boundary; not analytically
  invertible through gamut-map + encode + round-half-even. Adopted: the retirement
  claim is deleted; F-04 states they stay; F-05 owns the alloc collapse.
- **F3b (≤3 facade allocs contradicts canon; dependency inversion)** — **PROVEN**.
  The facade converts on entry and exit by contract (each hop allocates Result +
  Color + channels); P3.2's MEASURED datum for the fully-restored apparatus is 9
  allocs/call; iteration-independent allocation requires internal Into plumbing —
  wave-04 content in the original sequencing. Adopted: budget pre-commit killed;
  9-alloc parity is the ratified datum; the alloc collapse and its gate move to F-05.
- **F3c (no Halley pre-v4; mapper is net-new)** — **DISPROVEN in its factual core,
  PROVEN in its surviving half**. "Zero Halley hits" is FALSE — my grep found 9
  (gamut.ts:106-182, raytrace.ts, boundary.ts:430, CLAUDE.md:126), and sRGB egress
  WAS the analytical zero-iteration map (the 24-step bisection was the WIDE-GAMUT
  path only). SURVIVING: the multi-gamut cusp+Halley mapper the gates demand is
  part-NEW (sRGB-fit coefficients — the pre-v4 comment says so), and the original
  "as-was restore" label under-priced it. Adopted: part-restore/part-new labeling +
  split routing in F-04.
- **F4 (wave-01 contrived spine; second measurement apparatus)** — **PROVEN AS AMENDED**.
  The deltaE heap-gate vacuity is exact (scalar-tuple signatures — verified at pre-v4
  `gamut.ts:65ff`/`difference.ts` — cannot allocate; a gate that exists to be green);
  the standalone `alloc-harness.ts` + versioned budget table is the retired
  proof-idiom genus (owner feedback: enforce structurally) and duplicates the bench
  spine. AMENDMENT: the conformance corpus itself SURVIVES (it is L1 §3's mandated
  new gate infrastructure) — housed in F-03 with its first born-RED client, per
  skeptic 2's own counter-shape. Adopted: kill the harness wave; structural signatures
  + ONE bench spine; corpus into F-03.
- **F5 (wave inflation; born-RED redefinition)** — **PROVEN (largely)**. Waves 12/13/14
  were docket rows dressed as waves (§9's own taxonomy provides the home); 13's
  prototype spend contradicted C21's default. The born-RED stretch ("absence = live
  defect") laundered TDD as gate rigor — L1 §0 says "wherever the defect is LIVE".
  Adopted: 8 waves; banked-with-trigger docket rows; TRUE-born-RED vs authored-RED
  labeling (the program's only true born-RED gates: F-03's vectors and F-02's paper debt).
- **F6 (scar census incomplete; frozen line-cites)** — **PROVEN by my own grep** of kf
  HEAD: `sampleColorRamp|deltaEOK` hits at `animation/index.ts:233`,
  `backward.ts:30/:32/:47` — plus the verified hand-rolled `colorDeltaE` at
  `color.ts:120-124` = five sites, vs the program's frozen two. Adopted: dispatch-time
  grep census as the letter's cargo (seed, not bound), per §7 law 3.
- **F7 (behavioral pricing + subpaths collision)** — **PROVEN**. Waves 03/04 change
  published outputs inside a 4.1.x minor (glass peers value ^4) — priced via the
  behavioral CHANGELOG row + DELTA plates at the cut (charter + F-03/F-05); the
  `subpaths/color.ts` export path collides with the structure program's dissolution —
  now a NAMED charter seam.
- **F8 (ramp ordering; contrived 06→02 edge)** — **PROVEN**. The kf ΔE scar needs only
  `deltaEOK`; ramps ride the frozen `mixColors` facade; the clipped-stop family and
  `rampInto` are riders. Adopted: F-06 depends on F-01 only, riders named; the
  color-mix→ΔE edge died with the cession.

### Convergence statement

The final survives both skeptics' strongest surviving points simultaneously: the
census organ + retro-tombstones (S1-A1/A2/A3), the honest C12 seam (S1-A4), corrected
counts/recipes (S1-B1/B2), the correctness/engine decouple with owned vector
provenance (S1-D1/D4), the bench-eight ownership (S1-D3), the grammar cession
dissolving the sibling collision (S2-F1), the contrast-bisection truth (S2-F3a), the
alloc-budget honesty + inversion cure (S2-F3b/S1-B5), the part-restore/part-new
Halley reconciliation (S1-B3 × S2-F3c — each skeptic half-right, resolved by direct
archaeology), the one-measurement-spine structural discipline (S2-F4), the wave-count
deflation with banked triggers (S2-F5/S1-C2), the dispatch-time scar census + pin
rider (S2-F6/S1-C1), and the priced behavioral/subpaths seams (S2-F7). Dependency
shape: F-01 → {F-03, F-06, F-07} · F-02 parallel root · F-03 → F-04 → {F-05, F-08};
three waves run in parallel after the root; the kf-facing dispatch no longer waits on
the hardest numerics. 8 waves, one mechanism each, one measurement spine, one docket.

— arm-B thrice adjudicator · PB-color FINAL · 8 waves · 2026-07-19
