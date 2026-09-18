# MINI-TRANCHE V·π — THE PARSER TO SPEC — SHEET (2026-07-20)

> **RATIFIED (root, 2026-07-20)** as **Phase A** (frozen 52-export core). Scope
> expanded by owner order to **Phase B — full CSS L4 + parser hardening + BBNF
> coordination**: see `./ADDENDA-01.md`. All waves govern under the edicts in
> `./HANDOFF.md §2` (twice-audit · parsimony · addenda-not-patch · direct-impl).

Charter: `./CHARTER.md` (goal G-1/G-2/G-3, scope, close). Formation consumed:
`./formation/research-architecture.md` (seat R) + `./formation/harden.md`
(seat H). **Where H CONFIRMED a defect in R, H governs — the override is named
in the owning wave file.** Census oracles: `../parser-proof/coverage.md` (P-2),
`../parser-proof/equivalence.md` (P-1), `../parser-proof/PROFILE-ANALYSIS.md`
(P-4), `../parser-proof/bench-results.json` (P-3 rig). Engine
`@mkbabb/parse-that@1.0.0` AS PUBLISHED (no edits, ever). Code home:
`pi/mirror/`.

## 1. Waves

Eight waves. Model = **opus** for every seat (Fable is research/root only, per
Charter). Effort tier per door grade (R §B: S≤½ seat-day / M≈1 / L≥2 →
medium/high). Authoring fans out ‖4 after W0; **CLOSE is not ‖4** — H-3:
`W2 ⟹ W1(color rows)`, `{W2,W3} ⟹ W4`; **simultaneous-close ceiling = 3**.
Full born-RED gate text lives in each wave file (from H §5); the column below is
its one-line seal.

| id | name | deliverables (paths under `pi/mirror/`) | live anchors | born-RED seal (H §5) | deps | ‖grp | seat |
|---|---|---|---|---|---|---|---|
| **W0** | SCAFFOLD | package.json · tsconfig · `deps/*` · `named-colors.ts` · `types.ts` · `result.ts` · `lexeme.ts` · `util.ts` · `index.ts` (52-barrel over stubs) · harness+bench stubs · test infra | `src/css/{types,named-colors}.ts`, `grammar.ts:33-126`, `src/{foundation/result,color/model,color/anchors,value,easing}.ts` | tsc-strict clean; `dts-parity`+`lexeme`+`scanners`+`freeze-independence`+`no-trailing-input` GREEN; barrel imports 52; **every door born-RED** | — | P0 (solo, gate) | opus·high |
| **W1** | VALUES | `grammar/value.ts` · `grammar/keyframe-selector.ts` (+`parseCssScalar`) | `grammar.ts:327-405` | value+kf-sel doors GREEN **sans color** (color rows RED behind W2 seam); W1 bank (minus color) discharged | W0 | P1 (author‖) | opus·medium |
| **W2** | COLOR | `grammar/color.ts` · `serialize.ts::serializeCssColor` | `grammar.ts:181-320`, named-colors | color door GREEN on H-8 matrix + exhaustive named + R1/R3/R6/R9; `serializeCssColor` round-trip GREEN; **W1 color rows flip GREEN** | W0 | P1 (author‖, **L — budget alone**) | opus·high |
| **W3** | EASING+TIMELINE | `grammar/easing.ts` · `timeline.ts` (parseAnimationRange/Timeline + serializeTimelineOptions) | `grammar.ts:436-478`, `timeline.ts:1-124` | easing+timeline+range doors GREEN incl. R10/R11; 4 timing kinds. Independent of W1/W2 | W0 | P1 (author‖) | opus·medium |
| **W4** | ANALYSIS | `stylesheet/analyze.ts` · `stylesheet/collect.ts` · `syntax.ts` · `serialize.ts::serializeCssValue` | `stylesheet.ts:99-363,747-897`, `syntax.ts:1-101` | collect\*/coerce/serialize doors GREEN over hand-built `Stylesheet`; **R2 accept+omit** (H-5); `collectTimelineOptions` round-trip-stable — **close-gated on W2+W3** | W0, **close⟸W2,W3** | P1 (author‖) | opus·medium |
| **W5** | STYLESHEET | `stylesheet/blocks.ts` · `stylesheet/declarations.ts` · `stylesheet/at-rules.ts` · `stylesheet/index.ts` | `stylesheet.ts:431-825` | `parseStylesheet` GREEN on all 9 `StylesheetItem` kinds, nesting, every descriptor validator, unknown passthrough, R2/R5/R7/R12, hostile set; **fail-fast affirmed** | W1,W3,W4 | P2 (join, **L — may split W5a/W5b**) | opus·high |
| **W6** | GRADUATION | full-surface differential sweep; census re-run; kf seam probe | — | full differential **0 MIRROR_DEFECT**; R1–R12 asserted EXPECTED_DIVERGENCE; kf 37-symbol tsc probe compiles; P-2 census → 52/52 + 37/37 | W1–W5 | P3 (‖W7) | opus·medium |
| **W7** | BENCH | P-3 resurrection on the full grammar; V8 profile; O-4 tables | — | both bars reported per scenario over 5 invocations; G-3 verdict emitted | W1–W5 | P3 (‖W6) | opus·medium |

Dependency lattice: `W0 → {W1‖W2‖W3‖W4} → W5 → {W6‖W7}`. Close order overlay:
`W2⟹W1_color`, `{W2,W3}⟹W4` (H-3). Continuous rail: **every wave closes only
with its door's differential GREEN + its born-RED bank discharged** (R §F).

## 2. Zero-drop ledger

Census-closure discipline: **every row below homes to exactly one wave (or a
named OUT/DEFERRED bucket); no orphans.** Sources: coverage.md Surface-1
(19 runtime + 33 type + 8-code + 4-kind), Surface-2 (37 kf symbols), Surface-3
(14 gaps); equivalence.md R1–R5 + research §E R6–R12; PROFILE O-1..O-6; H
confirmed findings + risk register K-1..K-9.

### 2a. Surface-1 runtime — 19 exports (coverage.md §1a; all were 0-TOTAL)

| export | home | export | home | export | home |
|---|---|---|---|---|---|
| `parseCssColor` | W2 | `parseCssScalar` | W1 | `parseCssValue` | W1 |
| `parseCssValues` | W1 | `parseKeyframeSelector` | W1 | `parseTimingFunction` | W3 |
| `serializeCssColor` | W2 | `coerceToSyntax` | W4 | `parseAnimationRange` | W3 |
| `parseAnimationTimeline` | W3 | `serializeTimelineOptions` | W3 | `collectAnimationOptions` | W4 |
| `collectCustomFunctions` | W4 | `collectDeclarations` | W4 | `collectKeyframes` | W4 |
| `collectPropertyDescriptors` | W4 | `collectStyleRules` | W4 | `collectTimelineOptions` | W4 |
| `parseStylesheet` | W5 | | | | |

### 2b. Surface-1 types — 33 + union + kinds (coverage.md §1b/§1c/§1d)

**All 33 type bodies transpose byte-for-byte at W0** (`types.ts`, 4 import
rewires) and are locked by the born-GREEN `dts-parity` gate; the runtime wave
that *exercises* each in the differential value-equality is noted for routing:

`CssColorSpace`·`CssColor`→W2 · `CssLinearStop`·`CssTimingFunction`→W3 ·
`Declaration`→W4/W5 · `KeyframeSelector`·`KeyframeRule`→W1/W5 ·
`CSSPropertyDescriptor`·`PropertyRule`→W5 ·
`CustomFunctionParameter`·`CustomFunctionDescriptor`·`CustomFunctionRule`→W5 ·
`CSSAnimationOptions`→W4 ·
`AnimationTimelineValue`·`ScrollerKeyword`·`TimelineAxis`·`ViewInset`→W3 ·
`RangePhase`·`RangeBoundary`·`AnimationRangeValue`→W3 ·
`TimelineScopeValue`·`TriggerType`·`AnimationTriggerValue`·`CSSTimelineOptions`→W3/W4 ·
`ScrollTimelineDescriptor`·`ViewTimelineDescriptor`→W5 ·
`StyleRule`·`KeyframesBlock`·`StylesheetItem`·`Stylesheet`·`CollectedRule`→W5 ·
`ParseIssue`·`ParseResult`→W0 (shape) + per-code below.

**`ParseIssue` 8-code union — emission home:** `css_syntax`→W0 (no-throw guard;
all waves) · `trailing_input`→W0 (**reserved-unused**, `no-trailing-input`
guard, map engine-trailing→`css_syntax`, H-9/Q6) · `keyframe_selector_invalid`→W1
· `color_context_required`→W2 · `syntax_descriptor_invalid`·`syntax_mismatch`→W4
· `animation_option_invalid`→W4 (collect) + W5 (declaration) ·
`timeline_option_invalid`→W3. **`CssTimingFunction` 4 kinds** (keyword /
cubic-bezier / steps / linear-function)→W3.

### 2c. Surface-2 — 37 kf-consumed symbols (coverage.md §2; 0-TOTAL as assay)

Each homes to the wave producing its export/type; **all 37 are re-verified TOTAL
at W6 by the tsc-only seam probe** (Q10 — a compile-time module importing every
symbol from the mirror d.ts). Types: `KeyframeSelector`·`KeyframeRule`→W1;
`CSSTimelineOptions`·`AnimationRangeValue`·`AnimationTimelineValue`·`AnimationTriggerValue`·`RangeBoundary`·`RangePhase`·`TriggerType`→W3;
`CSSAnimationOptions`→W4;
`CSSPropertyDescriptor`·`CustomFunctionDescriptor`·`CustomFunctionParameter`→W5;
`Stylesheet`·`StylesheetItem`·`StyleRule`→W5; `CssColor`·`CssLinearStop`·`CssTimingFunction`→W2/W3;
`Declaration`→W4; `ParseIssue`·`ParseResult`→W0. Runtime:
`parseCssScalar`·`parseCssValues`·`parseKeyframeSelector`→W1; `parseTimingFunction`→W3;
`parseAnimationRange`·`parseAnimationTimeline`·`serializeTimelineOptions`→W3;
`serializeCssColor`→W2; `coerceToSyntax`→W4;
`collectAnimationOptions`·`collectCustomFunctions`·`collectPropertyDescriptors`→W4;
`collectKeyframes`·`collectStyleRules`·`collectTimelineOptions`→W4; `parseStylesheet`→W5.
(Superset check — coverage Finding A: the frozen surface already fully serves kf;
zero orphan seams — H-1 recount-confirmed.)

### 2d. Spec-correction ledger R1–R12 (equivalence.md §4 R1–R5 + research §E R6–R12)

Closed whitelist; each is an **EXPECTED_DIVERGENCE** fixture (mirror ≠ live is
asserted GREEN). A disagreement not on this list is a MIRROR_DEFECT by
construction (H §4).

| # | correction | home | # | correction | home |
|---|---|---|---|---|---|
| R1 | empty functional-color → clean `ok:false` (no-throw) | W2 (+W0 guard) | R7 | preserve `--*` case (css-vars 1) | W5 |
| R2 | animation substitution-guard (var/env defer + math-head slotting) — **H-5 two-rule predicate governs** | W4 (collect) + W5 (decl) | R8 | reject empty/trailing list items (Syntax 3); animation-* keep coded path | W1 (+W5) |
| R3 | trailing `/` no-alpha → reject | W2 | R9 | color legacy(all-comma)/modern(none); mixed rejected | W2 |
| R4 | kf-selector percent range 0..100 (live-correct, KEEP) | W1 | R10 | scroll()/view() commas rejected | W3 |
| R5 | preceding comment is trivia, clean decl name | W5 | R11 | timeline offset unit required except 0 | W3 |
| R6 | hsl/hwb `<number>` sat/light ≡ percentage → /100 | W2 | R12 | `--*` value: parseCssValue else raw-keyword scalar | W5 |

**Contract-shaped KEEPS** (expected-AGREEMENT, not corrections): whole-sheet
fail-fast→W5 (kf validate.ts:182, Q8 CONFIRMED) · `from`/`to`→percent 0/1→W1 ·
operator/`:`/`;` keyword scalars→W1 · zero-arg call rules→W1 ·
`serializeCssColor` canonical incl. `color(xyz …)`→W2 · unterminated comment
fails sheet→W5.

### 2e. Surface-3 — 14 growth gaps (coverage.md §3; "do NOT redden the gate")

The frozen 52-export /css surface is NOT the full typed-feature registry. Each
gap homes to **SUBSUMED** (the frozen-contract slice lands in a π wave) or
**DEFERRED** (not a frozen /css export — megatranche V-registry, out of π scope):

| gap | disposition | gap | disposition |
|---|---|---|---|
| 1 full color inventory | **SUBSUMED W2** (13 spaces+hex+named+`color()`); relative-color/color-mix/light-dark/contrast-color = **DEFERRED V17/V19/V20** | 8 typed declarations/value matcher | **DEFERRED V04/V09** |
| 2 full easing | **SUBSUMED W3**; `spring()` = **DEFERRED V25** | 9 typed selectors | **DEFERRED V07** |
| 3 filter functions | **DEFERRED V23** (generic CssCall via W1) | 10 at-rule stylesheet model | **SUBSUMED W5** (frozen 9-kind); recovery = **DEFERRED V09** |
| 4 calc/math typed | **DEFERRED V04/V05** (opaque math-head via W1, R2/H-5) | 11 CSS-Syntax-L3 tokenizer | **DEFERRED V03** |
| 5 gradients/image union | **DEFERRED V21/V22** (generic CssCall via W1) | 12 full transform+motion | **DEFERRED V24C/V24M** |
| 6 keyframes/timelines depth | **SUBSUMED W1+W3+W5** (frozen selectors/timeline/range); triggers depth = **DEFERRED V28** | 13 unit algebra/context-req | **SUBSUMED W1** (numUnit); typed classes = **DEFERRED V05** |
| 7 media/container/supports | **DEFERRED V08** (unknown-at-rule passthrough via W5) | 14 substitution var/env/attr typed | **SUBSUMED W1/W4** (var/env defer, R2); typed = **DEFERRED V06** |

### 2f. Perf ladder O-1..O-6 (PROFILE-ANALYSIS §3)

| rung | home | rung | home |
|---|---|---|---|
| O-1 skipBlockComments trivia leaf | W0 (`lexeme.ts`) | O-4 `dispatch()` tables | W3/W5 author-side (D-3/D-4/D-5) + **W7 profile-gated** for D-1/D-2 |
| O-2 fused lexeme leaf (span before trivia, no map/mapState) | W0 (`lexeme.ts`) | O-5 `memoize` | W7 only-if-backtracking-measured |
| O-3 one-pass numbers | W0 (`lexeme.ts`) | O-6 engine asks / byte-class | **OUT** (upstream no-contact; reimplement-only after floor met) |

### 2g. H confirmed findings + retractions

| finding | disposition | home |
|---|---|---|
| **H-2** freeze is a ~24-site surface, not one line | strip ALL (grammar success/failure + ~19 analyze/collect + named-colors:1); §2 ruling | W0 (result/named-colors) + W4 (analyze/collect) |
| **H-3** false parallelism — W4 close⟸W3, W1 color⟸W2 | close-order overlay; ceiling 3 | §1 lattice + W4/W1 gates |
| **H-5** R2 predicate under-specified (must rule slotting) | two-rule predicate + collection-omit consequence | W4 (+W5) |
| **H-7** recognition is 3 layers (regex leaves + imperative scanners + combinators) | scanners carry own born-RED tests | W0 (`scanners.test.ts`) |
| **H-8** color-door matrix + named exhaustiveness need enumeration | 13×{legacy,modern,none}+hex+`color()`; named count from source | W2 |
| **H-9** Q4/Q5/Q6 probes | R8 nil in demo/kf; R7 safe (kf=CSSOM); trailing_input 0 sites | W0 guards + W1/W5/W2 |
| H-1 census count · H-4 barrel provenance · H-6 regex-free transpose | **RETRACTED** (R vindicated) — no action; H-4 fixes parity gate to name+type scope not `from` | note only (W0 parity script) |

### 2h. Risk register K-1..K-9 (H §7)

| K | risk | home | K | risk | home |
|---|---|---|---|---|---|
| K-1 | parse-that expressiveness cliff | W0 (`scanners`, `balancedUntil` sanctioned) | K-6 | corpus blind spot | W2/W6 (matrix checklist) |
| K-2 | freeze silently transposed | W4/W6 (grep=0 at close) | K-7 | bench sheet bar unreachable | W7 (OC-1 row, do NOT relax G-2) |
| K-3 | W4 closed before W3 | W4 (live W3 exports in differential) | K-8 | seat overrun on L doors | W2, W5 (split pre-authorized) |
| K-4 | R2 slotting drift | W4 (arm-by-arm fixture) | K-9 | serialize↔parseAnimationRange round-trip instability | W4 (round-trip fixture; serialize before collect) |
| K-5 | AST-shape drift late | W0 (`dts-parity` born-GREEN, re-run every wave) | | | |

## 3. Close protocol

Close = the totality gate (Charter §Goal) re-run against the **full mirror
barrel** (not the C14 assay), verdict written to `pi/PI-CLOSE.md`, evidence
letter to the fleet. Each rail is a mechanical re-run of the pinned proof seat:

- **G-1 coverage (P-2 re-census):** run `coverage.md`'s census against
  `pi/mirror/index.ts` → must read **52/52 runtime+type TOTAL** and **37/37
  kf-consumed TOTAL** (was 0/3/49). Landed at W6.
- **G-2 equivalence (P-1 graduated):** the differential harness (mirror vs LIVE,
  witness spec-arbitrated per equivalence.md §5) over the graduated corpus
  (403 + 142 formerly-OUT_OF_SCOPE + R1–R12 + hostile set; ≥50 accept/≥20 reject
  per door; color exhaustive; property-lane round-trip GREEN-rail) → **0
  MIRROR_DEFECT**, R1–R12 all asserted EXPECTED_DIVERGENCE. Landed at W6.
- **G-3 bench (P-3 resurrection):** the frozen rig (`bench-results.json` schema
  `p3-comparative-bench-aggregate/1`; 5 invocations × 15 samples × N=1000; 5
  frozen scenarios, sha256-pinned inputs) → report **both bars per scenario over
  5 invocations**: absolute (VALUE ≥0.0500 / SHEET ≥0.1000 vs jsonParser peak)
  and relative (mirror peak ≥ deposed peak). Baseline to beat: C14 value
  **0.0640 (PASS)** / sheet **0.0537 (FAIL)** → the mirror must ≈2× sheet
  throughput to clear absolute. **Absolute-met on both = unconditional GREEN;
  relative-only-met = OC-1 owner-decision row** (bench-bar recalibration is
  owner's — the mini-tranche does NOT relax G-2 to chase perf, K-7). Landed at
  W7.
- **PI-CLOSE.md:** re-verdict all three rails, carry the OC-1 row if sheet is
  relative-only, then the evidence letter to the fleet inbox at close (no INBOX
  writes during execution).

## 4. Standing constraints (CHARTER §Constraints, verbatim)

`vnext/` Codex-owned READ-ONLY (collision letter sent:
`../../coordination/value-inbox-2026-07-20-pi-minitranche-notice.md`) · repo
`src/` untouched (live stays live until the megatranche swap wave) · zero new
repo deps · `scripts/dev/dev.sh` never touched · epoch-pinned authorities
immutable; `pi/` is new territory · Fable sparingly: research seat + root
adjudication only, all else Opus, model_served receipts · docs LEAN.

— seat W, V·π formation, 2026-07-20.
