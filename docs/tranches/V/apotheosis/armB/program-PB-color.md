# PROGRAM PB-COLOR — the value.js color restore program (arm-B independent formation, 2026-07-19)

> Formed from: L1 §3 (THE COLOR PROGRAM) · L2 P2 (drops archaeology + the 14-row P2.2
> restore ledger) · CONVERSATION-ADDENDA C13/C17/C20/C21 · armB truth sweep §9
> (`sweep-value-lib.md`, re-verified at value `c654824e`/`db77dbd8`-equivalent).
> Independence firewall honored: zero vnext/snapshot/armA input.

---

## 1. CHARTER

The color program is a **RESTORE, not net-new** (P2.1): the loss is SINGLE-SIDED —
value.js's v4 cut (`164343c1`) extinguished the entire gamut/ΔE/ramp/Into apparatus in
one commit with zero tombstones; kf never owned gamut code and is **consume-only +
scar-deletion**. Every wave lands under the **frozen v4 facade**
(`color/index.ts:33-40`: convertColor · interpolateHue · mapColorToGamut · mixColors ·
safeAccentColor · toRgba8 — signatures never move); every restore is **ADDITIVE**, so
the whole program rides the 4.1.x additive vehicle (W56/D54) and owes NOTHING to the
value-5 co-land boundary (P4.2). **C13 is law**: zero-alloc kernels for every critical
op, machine-checked by alloc-count gates (the live baseline is the defect:
`mapColorToGamut` ≈96+ allocs/call, `safeAccentColor` ≤67 Result-allocating evaluates —
sweep §9). WPT/CSS-Color-4 §13 conformance vectors are the NEW gate infrastructure.
Tombstones honored: the 3.0.0 SoA removal, the OO/ValueUnit flip, BBNF-grammar-files —
never re-litigated; every restored capability gets a by-name RESTORED CHANGELOG row
(§7 law 1 compliance; the capability-diff gate is owned by the gates program — we are
its first client). Resurrection recipes: `git show 164343c1^:src/color/…` for every
as-was restore.

**Wave count: 14** (13 P2.2 color rows + 1 gate-infra wave; P2.2 row 4 R-PARSER belongs
to the parsing program — cited here only as external dependency `EXT:R-PARSER`).
Priority order is the P2.2 ledger's own: DELTAE → GAMUT → INTO → RAMP → grammar
restores → decision rows → gated tails. KISS per C21: each wave is one mechanism,
one gate family, one landing.

---

## 2. THE WAVE SET

Conventions: **born-RED** = the gate exists and FAILS on today's tree before the wave's
code lands, because the defect is live (absence counts as a live defect when the letters
name it a drop). **Alloc gate** = `--expose-gc` heapUsed-delta harness over 10k-call
windows + out-param identity assertions (`returned === out`), budgets per-op; delivered
by wave 01, extended by every kernel wave. **Thrice** (C20) runs on every wave: 2 Fable
skeptics + 1 Fable adjudicator, convergence = two consecutive clean passes. Routing
baseline (C17): Fable = numerics/kernel/API design + adjudication; Opus = mechanical
vector transcription, scaffolding, census sweeps. All work stays in `src/color/` +
`src/css/` + `test/` + `bench/` per the landing column; test placement obeys the
isomorphism law (C11: `test/color/…` mirrors `src/color/…` — never flat-root, never
colocated).

---

### F-PB-color-01 | value.js | Conformance + alloc-gate infrastructure
- **Intent**: Build the program's gate spine BEFORE any restore: the WPT/CSS-Color-4
  §13 conformance vector corpus and the allocation-count harness. Both are born-RED
  against the LIVE tree — the extant gamut path is the standing defect.
- **Deliverables**: `test/color/conformance/` — §13 gamut-mapping vectors (WPT
  css/css-color + spec-derived clip/JND cases), conversion round-trip vectors for the
  16 live spaces, interpolation/hue vectors; `test/support/alloc-harness.ts`
  (`--expose-gc` heapUsed-delta per 10k-call window + identity assertions) + the
  per-op alloc-budget table (checked in as data, versioned); vitest wiring under the
  producer gate (P3.4 row 1: library gates stay producer+api).
- **Acceptance gates (born-RED today)**: RED-1: §13 clip-criterion vectors FAIL against
  the extant 32-iteration bisection (`operations.ts:133`, loop `:160` — no ΔE stop, no
  clip comparison; sweep §9). RED-2: alloc harness measures ≈96+ allocs/call on
  `mapColorToGamut` vs the budget row (≤3 facade allocs) — the gate prints the measured
  number. GREEN-expected: conversion round-trips (those are conformant today —
  vacuous-green forbidden, so each vector family is annotated expected-RED/GREEN at
  landing).
- **Dependencies**: none (program root).
- **π/DELTA**: none (pure gate infra).
- **Routing**: Opus for WPT vector transcription (mechanical, high-volume); Fable
  designs the alloc-harness methodology + budget table; thrice on the budget table.

### F-PB-color-02 | value.js | R-DELTAE — the ΔE family restore (P2.2 row 1, PREREQUISITE)
- **Intent**: Restore `deltaEOK` (+ the JND constant), `deltaE2000`, `deltaEITP` as-was
  from `164343c1^`, typing modernized to the v4 Result/Color model. Prerequisite of
  every P≥2 row.
- **Deliverables**: `src/color/delta-e.ts` (or the resurrected file's v4-idiomatic
  home); additive exports through `color/index.ts` + `subpaths/color.ts`; reference
  vectors (Sharma-2005 ΔE2000 dataset, ITP pairs, OK-JND pairs) in
  `test/color/delta-e.test.ts`; CHANGELOG RESTORED rows by name.
- **Acceptance gates (born-RED)**: grep truth today is `deltaE` = 0 hits in src (sweep
  §9) — the vector suite is authored first and RED by absence; GREEN = all three
  metrics within reference tolerance; alloc gate: 0 allocs/call steady-state (pure
  scalar math on channel reads — no intermediate Color/Result construction in the
  kernel).
- **Dependencies**: F-PB-color-01.
- **π/DELTA**: none.
- **Routing**: Fable for the typing-modernization design; Opus transcribes reference
  datasets.

### F-PB-color-03 | value.js | R-GAMUT — analytical Ottosson engine + §13-conformant clip (P2.2 row 2)
- **Intent**: Replace the 32-iteration chroma bisection with the analytical Ottosson
  cusp+Halley engine + the ΔE-OK JND clip criterion (CSS Color 4 §13 conformant), as a
  **zero-alloc kernel under the frozen facade** — `mapColorToGamut`/`safeAccentColor`
  signatures unchanged, consumers never move. Raytrace exact-boundary is restored as
  the **TEST-SIDE oracle only** (never shipped in dist).
- **Deliverables**: `src/color/gamut.ts` (cusp+Halley kernel, scalar-only inner loop);
  facade rewire in `operations.ts` (`:133` bisection dies; `safeAccentColor:207`
  re-based on the kernel — the `:266,:283` secondary bisections retired);
  `test/color/oracle/raytrace.ts` (resurrected from `164343c1^`, test-side);
  boundary-agreement sweep grid; CHANGELOG RESTORED rows.
- **Acceptance gates (born-RED)**: wave-01's RED-1 (§13 vectors) and RED-2 (alloc
  count) flip GREEN here — that flip IS the wave's acceptance; oracle gate:
  cusp+Halley boundary within tolerance of raytrace exact boundary across the sweep
  grid (hue×lightness lattice, all RGB gamuts: srgb/display-p3/rec2020/a98/prophoto);
  alloc budget: kernel 0, facade ≤3 (Result + channels + color — the facade's return
  contract allocates by design); `safeAccentColor` bounded-alloc gate: allocs
  independent of iteration count (the ≤67-evaluate blowup dies measurably).
- **Dependencies**: F-PB-color-01, F-PB-color-02 (ΔE-OK JND is the stop criterion).
- **π/DELTA**: **DELTA obligation** — the clip criterion CHANGES mapped outputs vs
  bisection: before/after swatch plates for the demo's `safeAccentColor`-driven
  surfaces + a bisection-vs-cusp perceptual-diff grid, presented at thrice
  adjudication (probe parsimony: static plates, no dev-server safari).
- **Routing**: Fable for the numerics (cusp/Halley derivation review is exactly the
  novelty tier); Opus for the sweep-grid scaffolding.

### F-PB-color-04 | value.js | R-INTO — the Into family, extending SCI-1 (P2.2 row 3)
- **Intent**: The out-param zero-alloc family EXTENDED beyond the DECIDED SCI-1 pair
  (D54: `mixColorsInto`/`toRgba8Into` — SHIP-4.1.x, inherit, never re-adjudicate):
  add `convertColorInto`, `mapColorToGamutInto`, and the `safeAccentColor`-class hot
  path. **RIDES the W56 4.1.x vehicle — never forks it** (CARRY-LEDGER W56 row; the
  evidence tuple owed to atlas at the cut is W56's own duty, not ours).
- **Deliverables**: Into variants in `src/color/operations.ts`/`gamut.ts` sharing the
  wave-03 kernel; additive exports; `test/color/into.test.ts` (equivalence-with-
  allocating-twin vectors + identity assertions); alloc-budget rows (all Into ops: 0
  steady-state); bench entries in the resurrected `bench/` (arrives with EXT:R-PARSER
  — if bench/ is not yet landed, the alloc harness alone gates and the bench entry is
  a booked rider, not a drop).
- **Acceptance gates (born-RED)**: no `*Into` function exists in src today (sweep §9)
  — suite RED by absence; GREEN = byte-equal results vs the allocating twins across
  the conformance corpus + 0 allocs steady-state + `returned === out` identity.
- **Dependencies**: F-PB-color-02, F-PB-color-03; EXT: the W56 release wave (vehicle
  only — code lands before the cut, ships at it). Shared-vehicle note: D-GAP-6's
  `sampleBezier` rides the same 4.1.x row (CARRY-LEDGER:50) — easing program's cargo,
  named here only so the vehicle is not forked twice.
- **π/DELTA**: none (bit-identical outputs by gate).
- **Routing**: Fable designs the out-param API idiom ONCE (it becomes the program
  standard); Opus mechanically extends it per-op.

### F-PB-color-05 | value.js + kf dispatch | R-RAMP — N-stop ramps + the kf scar-deletion dispatch (P2.2 row 5)
- **Intent**: Restore `sampleColorRamp`/`sampleColorRampAt` + `mixColorsN`, plus
  `sampleColorRampInto` on the wave-04 idiom. Then the ONE kf dispatch: kf
  backward-emit re-adopts and deletes its scar tissue (P2.1) — consume-only, per the
  P4.5 protocol (spec into kf's inbox; the kf successor implements; no cross-repo
  edits without owner grant).
- **Deliverables**: `src/color/ramp.ts`; additive exports; ramp vectors (stop
  distribution, hue-method interaction, gamut-clipped stops) in
  `test/color/ramp.test.ts`; the INBOUND letter
  `keyframes.js/docs/tranches/V/coordination/VALUEJS-INBOUND-*-ramp-readopt.md`
  naming both scars by line: `compile/emit/backward/color.ts:120-124` (hand-rolled
  oklab Euclidean ΔE → replaced by `deltaEOK`) + `backward.ts:30-32` (stale
  `sampleColorRamp`/`deltaEOK` docstrings → cured by the real imports).
- **Acceptance gates (born-RED)**: `sampleColorRamp`/`mixColorsN` grep = 0 today —
  suite RED by absence; alloc gate: `sampleColorRampInto` 0 steady-state; dispatch
  gate: the letter EXISTS on disk with both scar rows named (kf-side deletion is
  kf-owned execution — our gate is the dispatch, not their landing).
- **Dependencies**: F-PB-color-03 (clipped stops), F-PB-color-04 (Into idiom).
- **π/DELTA**: **DELTA obligation** — ramp swatch strips (value demo gradient
  surfaces) before/after where demo consumption exists at landing time.
- **Routing**: Fable writes the dispatch letter (cross-repo contract precision);
  Opus scaffolds vectors.

### F-PB-color-06 | value.js | R-MIX-GRAMMAR — `color-mix()` (P2.2 row 6)
- **Intent**: `color-mix()` grammar + structural node + serialization ON the restored
  parse-that grammar (L1 §2: gaps become waves ON the restored grammar — never on the
  retiring regex parser). Carries the **P1.5 defect-family register**: U-F29
  (parseCSSValues loud-fail) + U-F30 (color-mix serialization) were patched pre-v4 and
  deleted with it — the recurrence risk lives in the successor, so their regression
  vectors are this wave's cargo (families, not instances).
- **Deliverables**: color-mix production in the restored `src/css/` grammar +
  structural node type + serializer; WPT color-mix parse/serialize vectors; the
  U-F29/U-F30 family regression vectors; evaluation seam onto `mixColors` (facade,
  unchanged).
- **Acceptance gates (born-RED)**: `color-mix` grep = 0 in src today — parsing
  `color-mix(in oklch, red, blue)` FAILS on the live tree; GREEN = WPT parse/serialize
  vectors + loud-fail on malformed input (the U-F29 family law: never silent).
- **Dependencies**: EXT:R-PARSER (the parsing program's restoration wave — hard
  prerequisite); F-PB-color-02 (interpolation-space semantics share ΔE-adjacent
  constants only where spec'd).
- **π/DELTA**: none (parse/serialize; evaluation is bit-gated).
- **Routing**: Fable for the node/AST design (must be parse-that-idiomatic, C1-bounded
  — no parse-that feature novelty; needs route as PT-E ask letters); Opus for WPT
  vector transcription.

### F-PB-color-07 | value.js | R-RELATIVE — relative color `from` syntax (P2.2 row 7)
- **Intent**: Restore relative-color (`rgb(from red r g b)` etc.) grammar + node +
  channel-substitution evaluation, ON the restored grammar. Where a relative channel
  carries `calc()`, evaluation defers to the R-EVAL decision (wave 12) — until ruled,
  the DOM-resolution status quo stands and the node preserves the raw expression
  (loud, typed, never a masked fallback).
- **Deliverables**: relative-color productions + node + serializer; WPT relative-color
  vectors; channel-substitution evaluation over the frozen facade's `convertColor`.
- **Acceptance gates (born-RED)**: relative syntax HARD-FAILS parse today (P2.2 row 7)
  — vectors RED on the live tree; GREEN = WPT parse/eval/serialize vectors; the
  calc-bearing subset is explicitly marked deferred-to-OD-C4, counted, and gated
  RED-with-disposition — not silently skipped.
- **Dependencies**: EXT:R-PARSER; F-PB-color-02/03 (none-channel + gamut interactions
  in eval vectors).
- **π/DELTA**: none.
- **Routing**: Fable grammar design; Opus vectors.

### F-PB-color-08 | value.js | R-CONTRAST — `contrast-color()` + the WCAG republish decision (P2.2 row 8)
- **Intent**: `contrast-color()` grammar + node ON the restored grammar; the paired
  owner decision (OD-C1) rules whether the WCAG-metrics surface republishes as public
  API or stays evaluation-internal.
- **Deliverables**: grammar production + node + evaluation (contrast metric per spec);
  vectors; the OD-C1 decision row filed with the cost sheet (what republishing adds to
  the frozen surface; what internal-only forgoes).
- **Acceptance gates (born-RED)**: `contrast-color(` parse FAILS today — RED; GREEN =
  spec vectors; the public-vs-internal split lands EXACTLY per OD-C1's ruling (the
  wave is executable under either ruling; only the export set differs).
- **Dependencies**: EXT:R-PARSER; F-PB-color-02.
- **π/DELTA**: none at this wave (demo affordances for contrast are frontend-program
  territory).
- **Routing**: Fable for the decision cost sheet; Opus for vectors.

### F-PB-color-09 | value.js | R-OKHSL — OKHSL/OKHSV spaces (P2.2 row 9)
- **Intent**: Restore OKHSL/OKHSV (resurrect `164343c1^:…okhsl.ts`, modernized),
  REUSING the wave-03 cusp math (Ottosson's okhsl is cusp-parameterized — one kernel,
  two clients; no duplicated cusp solver, per C21).
- **Deliverables**: `src/color/okhsl.ts` (or model-integrated space entries per the
  v4 space-table idiom — adjudicated at thrice); factory exports (`okhsl`, `okhsv`)
  additive; Ottosson reference round-trip vectors; conformance-corpus extension.
- **Acceptance gates (born-RED)**: `okhsl|okhsv` grep = 0 in src today (sweep §9) —
  RED by absence; GREEN = reference round-trips within tolerance + conversion
  closure through the anchor graph (`CONVERSION_ANCHORS`) + 0-alloc kernel gate.
- **Dependencies**: F-PB-color-03 (cusp kernel).
- **π/DELTA**: none unless the demo picker adopts OKHSL controls (frontend program's
  pull; if pulled, the π obligation transfers with it — booked as a named rider, not
  dropped).
- **Routing**: Fable for the space-table integration design; Opus for vectors.

### F-PB-color-10 | value.js | R-HDR — the 11-day HDR parse restore (P2.2 row 10; OD-gated)
- **Intent**: Restore the `ictcp()`/`jzazbz()` PARSE surface (the 3.1.0 drop), gated
  on OD-C2 (owner: restore vs the CSS-native-only law). The asymmetry is live and
  provable: the SPACE factories ship at HEAD (`color/index.ts:20-21` exports `ictcp`,
  `jzazbz`) while their css parse is dead — the drop severed only the grammar half.
- **Deliverables**: iff OD-C2 = restore: ictcp/jzazbz productions ON the restored
  grammar + serializers + vectors; iff OD-C2 = decline: a RIGHTLY tombstone in the
  next release CHANGELOG naming both (§7 law 1 — the decline itself must be papered,
  or we re-run the no-advocate mechanism).
- **Acceptance gates (born-RED iff pulled)**: `parseCssColor("ictcp(0.4 0 0)")` FAILS
  today while `ictcp(0.4, 0, 0)` (factory) succeeds — the asymmetry vector pair is
  the born-RED probe; GREEN = parse↔factory↔serialize closure.
- **Dependencies**: EXT:R-PARSER; OD-C2.
- **π/DELTA**: none (HDR display verification is out of probe-parsimony scope; noted
  as a limitation in the wave record, not a silent gap).
- **Routing**: Opus-heavy (mechanical restore either way); Fable only at the OD-C2
  cost sheet.

### F-PB-color-11 | value.js (lean) | R-SPRING-GRAMMAR — CSS `spring()` grammar (P2.2 row 11; OD-gated)
- **Intent**: The `spring()`/`parseSpring` grammar existed pre-v4 and died at the cut.
  Ownership is the open half: kf-owns-the-SOLVER is SETTLED (K F6.6 fence —
  cite-to-overturn, and we do not); grammar value-vs-kf is OD-C3, **leaning value**
  (CSS-spec territory; value /css already owns the timing-function grammar —
  `parseTimingFunction`, grammar territory per P1.4).
- **Deliverables**: iff OD-C3 = value: `spring()` production ON the restored grammar
  emitting a structural node kf's solver consumes (the node/solver seam specified in
  a P4.5 INBOUND letter — grammar here, semantics there, no dual path); iff kf: a
  bounded INBOUND spec dispatching the grammar there + a value-side tombstone.
- **Acceptance gates (born-RED iff value-ruled)**: `spring(` parse grep = 0 today —
  RED; GREEN = parse vectors + the seam letter on disk; the F6.6 fence explicitly
  cited-and-honored in the wave record (solver untouched).
- **Dependencies**: EXT:R-PARSER; OD-C3; P1.4's consume-vs-ratify adjudication of
  kf's easing name-table (the parsing program's boundary-census row — shared seam,
  named to prevent a two-program collision on the same file family).
- **π/DELTA**: none.
- **Routing**: Fable for the seam design (cross-repo contract); Opus for vectors.

### F-PB-color-12 | value.js (decision-only default) | R-EVAL — calc/math static evaluator (P2.2 row 12; OD row)
- **Intent**: WEAK candidate by the ledger's own label. The tension is C12's full-spec
  mandate (typed values congruent to DOM equivalents — calc-bearing values included)
  vs the DOM-resolution status quo. Default posture: **banked, decision-first** —
  no evaluator lands without OD-C4.
- **Deliverables**: the OD-C4 decision sheet: spec-coverage delta (which WPT/vector
  families stay RED-with-disposition without static eval — the wave-07 calc subset is
  the concrete exhibit), cost (a calc AST evaluator is a genuine sub-engine; C21
  weighs against), and the banked wave shape with a named re-trigger (OD-C4=yes, or a
  consumer presenting a real static-eval need — four-tree census required, consumer
  count alone insufficient per §7).
- **Acceptance gates**: no born-RED (no live defect: DOM resolution is the working
  status quo). The gate is dispositional: OD-C4 filed with the exhibit counts, and the
  wave-07 deferred subset's disposition updated to match the ruling — zero silent
  drops.
- **Dependencies**: F-PB-color-07 (the exhibit).
- **π/DELTA**: none.
- **Routing**: Fable only (pure adjudication).

### F-PB-color-13 | value.js | R-SOA — channel-fold SoA as a NEW primitive (P2.2 row 13; bench-gated)
- **Intent**: The 3.0.0 SoA tombstone **stands as written** (RIGHTLY — never
  re-litigated). This wave is NOT a restore: it is a NEW primitive admissible only
  under the zero-alloc mandate, and it fires only on measured batch-path evidence
  (the Into loops of waves 04/05 are the null hypothesis — if per-call Into already
  meets budgets on batch workloads, SoA is superfluous complexity per C21).
- **Deliverables**: the bench exhibit FIRST (batch convert/mix/ramp workloads, Into
  loop vs SoA prototype, on the resurrected bench infra); iff the exhibit clears the
  ratified threshold (OD-C5 sets it): the channel-fold primitive in `src/color/` with
  0-alloc steady-state + its own conformance-equivalence vectors; iff not: a RETIRED
  disposition citing the exhibit — terminal either way, no re-booking (§7 chronic
  law).
- **Acceptance gates**: born-RED only at pull (the SoA-equivalence suite authored
  against the prototype); the standing gate is dispositional: exhibit + threshold +
  terminal ruling on the record.
- **Dependencies**: F-PB-color-04, F-PB-color-05; EXT: bench/ infra (rides R-PARSER's
  bench resurrection); OD-C5.
- **π/DELTA**: none.
- **Routing**: Fable designs the prototype + adjudicates the exhibit; Opus runs the
  bench matrix.

### F-PB-color-14 | value.js | R-BOUNDARY — gamut boundary samplers (P2.2 row 14; W53-gated)
- **Intent**: Boundary samplers restore **GATED on the W53 perceived-space-plate
  rebuild's ACTUAL needs** (CARRY-LEDGER W53/B1 arm-A: rebuild the plate ON v4 from
  tag `v-perceived-space-plate-ref-w40` — the old code imports dead v4-cut APIs;
  rebuild, not restore). W53 pulls; this wave answers with exactly the sampler
  surface the plate consumes — nothing speculative (C21).
- **Deliverables**: iff pulled: the boundary-sampler API (cusp-engine-derived, wave-03
  kernel; raytrace oracle re-used for sampler agreement) + additive exports + the
  plate's consumption seam; iff W53 closes without the pull: BANKED with the named
  re-trigger (any future gamut-viz consumer; four-tree census at pull time).
- **Acceptance gates (born-RED iff pulled)**: sampler suite RED by absence at pull;
  GREEN = oracle agreement + 0-alloc sampling loop + the plate consuming the real
  API (no plate-side reimplementation — that would be the scar pattern reborn).
- **Dependencies**: F-PB-color-03 (kernel), F-PB-color-09 (iff the plate renders
  OKHSL-parameterized surfaces — resolved at pull); EXT: W53 (the gating vehicle).
- **π/DELTA**: **FULL π/DELTA obligation** — the plate IS a visual claim: rendered
  perceived-space plates vs the `v-perceived-space-plate-ref-w40` tag's reference
  captures, adjudicated visually at thrice (probe parsimony: static captures, one
  pass).
- **Routing**: Fable for the sampler API + visual adjudication; Opus for capture
  scaffolding.

---

## 3. OWNER-DECISION ROWS SURFACED

| OD | Question | Program default / lean | Bound wave |
|---|---|---|---|
| OD-C1 | `contrast-color()` WCAG-metrics: republish as public API vs evaluation-internal | internal (frozen-facade parsimony) — sheet presents both | F-PB-color-08 |
| OD-C2 | R-HDR parse restore vs the CSS-native-only law | restore (the asymmetry — live factories, dead parse — is incoherent surface); decline requires the tombstone | F-PB-color-10 |
| OD-C3 | `spring()` GRAMMAR ownership value-vs-kf (solver settled kf, K F6.6 — honored) | value (CSS-spec territory; timing-function grammar precedent, P1.4) | F-PB-color-11 |
| OD-C4 | R-EVAL static calc evaluator: C12 spec-coverage vs DOM-resolution status quo | status quo (WEAK candidate per the ledger; C21) — exhibit-driven sheet | F-PB-color-12 |
| OD-C5 | R-SOA bench threshold: what measured batch-path win admits a new SoA primitive over Into loops | ratify a threshold before the exhibit runs (no post-hoc goalposts) | F-PB-color-13 |

(Alloc budgets are NOT owner rows — they are the wave-01 table, thrice-adjudicated;
JND = the spec-conventional ΔE-OK constant, restored as-was, not re-decided.)

---

## 4. ROW-LANDING TABLE — zero silent drops

Every color-relevant letter/packet/addenda row, where it lands in THIS program:

| Source row | Landing |
|---|---|
| P2.2 row 1 R-DELTAE | F-PB-color-02 |
| P2.2 row 2 R-GAMUT (Ottosson cusp+Halley + JND clip + raytrace oracle + zero-alloc kernel + frozen facade) | F-PB-color-03 |
| P2.2 row 3 R-INTO (extends SCI-1; W56 4.1.x vehicle, never forked) | F-PB-color-04 |
| P2.2 row 4 R-PARSER | NOT this program — parsing program; consumed as EXT:R-PARSER dependency (waves 06,07,08,10,11; bench infra 13) |
| P2.2 row 5 R-RAMP + kf re-adopt | F-PB-color-05 |
| P2.2 row 6 R-MIX-GRAMMAR | F-PB-color-06 |
| P2.2 row 7 R-RELATIVE | F-PB-color-07 |
| P2.2 row 8 R-CONTRAST + WCAG decision | F-PB-color-08 + OD-C1 |
| P2.2 row 9 R-OKHSL (reuse cusp math) | F-PB-color-09 |
| P2.2 row 10 R-HDR (owner vs CSS-native-only law) | F-PB-color-10 + OD-C2 |
| P2.2 row 11 R-SPRING-GRAMMAR (ownership open; F6.6 solver fence) | F-PB-color-11 + OD-C3 |
| P2.2 row 12 R-EVAL (weak; decision) | F-PB-color-12 + OD-C4 |
| P2.2 row 13 R-SOA (new primitive; 3.0.0 tombstone stands) | F-PB-color-13 + OD-C5 |
| P2.2 row 14 R-BOUNDARY (W53-gated) | F-PB-color-14 |
| P2.1 single-sided loss; kf NEVER owned gamut (P0.2 refutation 15) | charter — NO kf gamut wave exists here; kf is consume-only |
| P2.1 kf scar tissue (backward/color.ts:120-124 ΔE; backward.ts:30-32 docstrings) | F-PB-color-05 dispatch cargo, both scars named by line |
| P2.1/P2.2 tombstone list (SoA-3.0.0, OO/ValueUnit, BBNF files, …) | charter: never re-litigated; wave-13 explicitly built as NEW-not-restore |
| P2.1 no-advocate⇒no-tombstone mechanism + §7 law 1 | charter CHANGELOG duty per wave; OD-C2 decline branch owes a tombstone; capability-diff gate = gates-program interface (we are client, not owner) |
| L1 §3 "WPT/§13 conformance vectors are NEW gate infrastructure" | F-PB-color-01 |
| L1 §3 mapColorToGamut indictment (32-iter, no ΔE stop, non-conformant) + sweep §9 measurements (:133/:160, ≈96+ allocs, ≤67 evaluates :207/:226/:266/:283) | F-PB-color-01 born-RED definitions; F-PB-color-03 acceptance |
| L1 §3 "SCI-1 DECIDED SHIP-4.1.x (D54) — inherit, extend, never re-adjudicate" + P5 SCI-1 row + CARRY-LEDGER W56 | F-PB-color-04 (extends; never re-opens) |
| P5 W53 vehicle (perceived-space plate, tag `v-perceived-space-plate-ref-w40`) | F-PB-color-14 gate + π/DELTA |
| P5 D-GAP-6 sampleBezier on the same 4.1.x vehicle | named in F-PB-color-04 (vehicle-sharing note; easing program's cargo — not duplicated here) |
| P1.5 ad-hoc-fix FAMILY (U-F29/U-F30; recurrence risk in the successor; track families) | F-PB-color-06 regression-vector cargo |
| P1.4 value /css owns timing-function grammar (parseTimingFunction) | OD-C3 lean evidence (F-PB-color-11) |
| P4.5 ownership protocol (specs into kf inbox; no direct cross-repo edits) | F-PB-color-05 + F-PB-color-11 dispatch mechanics |
| P4.2 additive-until-co-land / frozen surfaces | charter: whole program is 4.1.x-additive; facade frozen (color/index.ts:33-40) |
| C13 zero-alloc every critical op + alloc gates | F-PB-color-01 harness + budget table; per-wave alloc gates (02,03,04,05,09,13,14) |
| C12 (color-side slice: full spec incl. experimental) | waves 06,07,08,10 + the OD-C4 exhibit (the calc subset counted, never silently skipped) |
| C17 routing (Fable design/adjudication; Opus mechanical; report model_served) | per-wave routing notes; thrice seats all Fable per C20 |
| C20 thrice method | every wave (conventions block) |
| C21 KISS/parsimony + probe parsimony | wave-cut rationale (14 waves, 1 mechanism each); static-capture-only π probes (03,05,14) |
| C1/C15 parse-that bound (no novelty; needs → PT-E letters) | F-PB-color-06 routing note; grammar waves consume parse-that as published |
| C11 test isomorphism (tests displaced, mirrored tree) | conventions block: all new tests under `test/color/…`/`test/css/…` mirrors (sweep §5's broken isomorphism is the structure program's cure; this program lands compliant from birth) |
| P3.4 rows 1 (producer+api gate surface) + 6 (capability-diff gate) | wave-01 wiring; charter interface note |
| Sweep §9 ictcp/jzazbz factories live at HEAD (color/index.ts:20-21) vs dead parse | F-PB-color-10 born-RED asymmetry probe |

Non-color rows sighted but owned elsewhere (named to prove non-drop, not to claim):
R-PARSER + bench resurrection (parsing program) · capability-diff/manifest/isomorphism
gates (gates+structure programs) · decompose/quantize/subpaths dispositions (structure
program) · C2/C3/C4/C5/C10/C22 (frontend programs) · C6/C7 (routing/API programs).

— arm-B independent formation · PB-color · 14 waves · 2026-07-19
