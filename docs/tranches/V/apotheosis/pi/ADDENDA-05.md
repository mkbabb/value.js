# V·π ADDENDA-05 — W3 easing/timeline correction ledger (2026-07-21)

> **PROPOSED · NOT RATIFIED · NO NEW SEMANTIC CODE AUTHORIZED.** This is
> the addenda-writing seat of the W3 audit-finding E-3 triumvirate. It
> transposes `formation/w3-easing-timeline-audit-research.md` only as amended
> and controlled by `formation/w3-easing-timeline-audit-harden.md`. It governs
> prototype refinement under `pi/mirror/` only and never authorizes production
> execution.
>
> Nothing in this sheet authorizes R8-W3, R27–R33, PB0, PB1, PB3, PB6, a
> public type change, or a W3 acceptance verdict. This exact addendum must first
> receive **two independent adversarial ACCEPT challenges**, root must complete
> the E-3 gestalt adjudication, and the owner must explicitly ratify the
> decision in §8. Any semantic repair after a challenge invalidates both prior
> challenge verdicts.
>
> Ratification would authorize only R8-W3 and R27–R30 in the Phase-A W3
> prototype. It would ratify the exact terminal dispositions of R31–R33, but
> would not authorize their implementation before their separately gated
> PB0/PB1/PB3/PB6 owners. D-W3-1–D-W3-3 are evidence/gate repairs, not new CSS
> semantic discretion and not proof that W3 is accepted.

Authority chain: `HANDOFF.md` E-1–E-5 → ratified Phase-A `PI.md` and
`waves/W-3.md` → owner scope order `ADDENDA-01.md` → proposed Phase-B
`ADDENDA-02.md` → `W3-AUDIT-A.md` + `W3-AUDIT-B.md` →
`formation/w3-easing-timeline-audit-research.md` →
`formation/w3-easing-timeline-audit-harden.md`. On every conflict, the harden
sheet's R8-W3, R27–R33, D-W3-1–D-W3-3, dependency, and close dispositions
govern.

## 0. Formation verdict and exact boundary

Both independent W3 implementation audits **REJECTED** the authored wave. Its
LIVE transpose and mechanical rails are strong, but its maintained bank blesses
common-mode spec defects: malformed easing lists and `steps()` arity; numeric
rather than lexical integer recognition; a stale `linear()` subset; a lossy
range-list collapse; the wrong `normal` disambiguation; and a false shared
domain for view insets and range offsets. Tokenization, typed math, and the
current list/range carrier also remain outside the frozen Phase-A shape.

The hardened correction has four disjoint authority classes:

| class | rows/work | terminal owner after ratification |
|---|---|---|
| existing global rule, new W3 ownership | R8-W3 | W3 easing repair; W5 retains property-list R8 |
| immediate Phase-A W3 semantics | R27–R30 | W3 prototype repair, then two fresh E-1 audits |
| lossless deferred L4 semantics | R31–R33 | PB1/PB3/PB6 after their owner gates; PB0 freezes the R33 carrier |
| direct evidence/gate repair | D-W3-1–D-W3-3 | focused W3 evidence plus W4/W5/W7 replays |

Reserve **global R27 through R33 atomically** for this sheet. R13–R18 belong
to `ADDENDA-03`; R19–R26 belong to `ADDENDA-04`. R8-W3 is an ownership
extension of the already-ratified empty-list rule, not a duplicate global row.

This addendum changes no public surface. The mirror remains exactly **33 type
+ 19 runtime exports**, the 37-symbol keyframes seam remains unchanged, and
the frozen `RangePhase`, `AnimationRangeValue`, `CssLinearStop`, and result/
diagnostic unions are not widened. No row authorizes edits to `src/`, `vnext/`,
parse-that, BBNF, keyframes, `scripts/dev/dev.sh`, or any `INBOX.md`.

W3 remains **AUTHOR-COMPLETE, E-1 REJECTED, NOT ACCEPTED**. A successful
post-ratification repair can earn at most
`PROVISIONAL_PHASE_A_ACCEPTED` while R31–R33 remain executable RED. The
tranche cannot declare the easing/timeline/range domain perfected until those
rows turn GREEN.

## 1. Pinned authority and content-addressed evidence

All normative rulings are pinned to the official CSSWG repository at commit
`c7573530343759ace8e46438a1fa2c44515b5554`. The verified 76-root manifest has
canonical SHA-256
`cd505eecd6404e8719baef2c18a8e62b03916db46ec56a7ae92f0a1c2615937c`.

| authority | bytes | SHA-256 | controlling subject |
|---|---:|---|---|
| `css-easing-1/Overview.bs` | 19,774 | `92043cb3319f450dfdbbef32035324ddf66969f9fe0330514f2c2db7ca74f185` | `cubic-bezier()` arity; `steps(<integer>, <step-position>?)` |
| `css-easing-2/Overview.bs` | 36,116 | `650cdccf65fe523627ce7917c8d1bef1361dac6bf62a82f8f75c89524a521554` | `linear([<number> && <percentage>{0,2}]#)` and one-point evaluation |
| `scroll-animations-1/Overview.bs` | 65,357 | `c730c2d6cdae2aeb9d5616b844ce378613a24b4af7e1eeca640adbbaedd683e1` | view inset, singular range arm, outer coordinating list, current `scroll` range |
| `css-syntax-3/Overview.bs` | 144,427 | `3f129d17407f9bd027291bcfb8015beb86fc229bf5efe505b49ec2dc30be4390` | whitespace, comments, escapes, identifiers, comma-separated component groups |
| `css-values-4/Overview.bs` | 230,907 | `7051146f8adf0b8c0e9243dd75dab39f18efe3e0905d86afb8abd43fe58d45bc` | literal integer/number, exponent, length-percentage, zero, typed math |

LIVE remains the primary differential oracle. The immutable spec arbitrates
common-mode defects. Chromium **148.0.7778.96**, queried through both
`CSS.supports(property, value)` and declaration serialization, is the recorded
third witness. Browser behavior does not override the pinned grammar.

The eight exact ordered payloads contain **81 sources** total. Tests must
retain or generate them and recompute compact-JSON hashes; prose counts do not
discharge the gate.

| key | payload | sources | compact-JSON SHA-256 |
|---|---|---:|---|
| `B8W3` | R8 easing empty-member supplement | 9 | `d9b4d7ebcfbb6b9c484222b02778f9a9af131645b44336aac232b1efee5f5b2b` |
| `B27` | `steps()` lexical/arity bank | 7 | `b5a0ce1c7a034c6a1028b9ea2b094a99103ff7500634634718d1db9b4ca8a199` |
| `B28` | Easing-2 `linear()` bank | 7 | `5154b60fc0c303d0736ab14f9344aef045dffa12c17bc145d25fbaab859e3dae` |
| `B29` | scalar range disambiguation/list bank | 12 | `12aabfe06550793b7fdf3851b4503abd82fc49bc0c585ec38cc0382af60f8267` |
| `B30` | literal view/range numeric-domain bank | 23 | `97108fc335e6c55c9e7e9658ce043985178f2af3bf7d59f0e54d41606464efcf` |
| `B31` | shared CSS-token boundary bank | 7 | `dffae92026a261532f538cdb0fe88f16ff30b3cbeb1f7dc8b3d5c89f8ccc47e7` |
| `B32` | typed-math/nested-comma bank | 11 | `ac7e01373e98cfa8eaefd122f04b37722b16ace7304a7aba06958d25b159ae45` |
| `B33` | current-range/plural-carrier bank | 5 | `d40c3096267ddd630d75ebc5a974bac93a47bdf184884bebdb3fb02bd24c8dc5` |

The compact JSON object with keys in this exact order
`B8W3,B27,B28,B29,B30,B31,B32,B33` has aggregate SHA-256
`f288380235f1a9f5a925b4bb786e1f05ca499c0b2b1da4f65a4cefd9e626effa`.

## 2. Existing R8 rule — W3 ownership extension

### R8-W3 — empty easing members remain R8

Before splitting a recognized `cubic-bezier()`, `steps()`, or `linear()` body,
reject a leading, repeated, or trailing empty **top-level** comma member.
Nested commas in future math functions are not outer members.

```json
["cubic-bezier(,0,0,1,1)","cubic-bezier(0,,0,1,1)","cubic-bezier(0,0,1,1,)","steps(,2)","steps(2,)","steps(2,,start)","linear(,0,1)","linear(0,,1)","linear(0,1,)"]
```

All nine reject with one diagnostic over the complete original input:
`code:"css_syntax"`, `start:0`, `end:source.length`, `expected:[]`, and
`actual:source`. Current LIVE/mirror accept all nine; Chromium rejects all
nine. After repair they are named expected R8 divergences, not mirror defects.

KISS ruling: call the existing `emptyTopLevelItem(body, ",")` once on each
recognized function path before `splitTopLevel`. Do not create another comma
scanner or globally widen `splitTopLevel`. Range-property empty members remain
W5's animation-coded R8 path; the scalar W3 range door rejects all top-level
commas under R29.

## 3. Immediate Phase-A semantic rows R27–R30

### R27 — exact `steps()` arity and literal `<integer>`

The terminal grammar is `steps(<integer>, <step-position>?)`:

- after R8-W3 emptiness rejection, require exactly one or two arguments;
- recognize the first token as optional ASCII sign plus one or more ASCII
  decimal digits, then convert to a finite JavaScript number;
- require count `> 0`; `jump-none` additionally requires count `> 1`;
- preserve all six position aliases and default omission to `jump-end`; and
- reject decimal/exponent spellings even when their numeric value is integral.

```json
["steps(+01)","steps(0002,start)","steps(-01)","steps(+00)","steps(1.0)","steps(1e0)","steps(2,start,end)"]
```

`steps(+01)` yields `{kind:"steps",count:1,position:"jump-end"}` and
`steps(0002,start)` yields
`{kind:"steps",count:2,position:"jump-start"}`. Negative/zero counts fail the
semantic bound; decimal, exponent, and excess-argument rows fail the grammar.
Every rejection is complete-input `css_syntax` with `expected:[]`.

KISS ruling: preserve the raw first argument for a tiny ASCII classifier, then
reuse current numeric conversion and bounds. Do not add a public integer token,
a parser-level bare `regex()`, or a general tokenizer. PB3/PB6 later replay
typed math/substitution without changing this literal result.

### R28 — pinned Easing-2 `linear()` grammar

The controlling production is
`linear([ <number> && <percentage>{0,2} ]#)`. Therefore the outer list has one
or more nonempty rows; every row has exactly one number and one contiguous
zero-to-two-percentage group; the percentage group may precede or follow the
number; and percentages may not straddle it. `CssLinearStop` already carries
the lossless Phase-A result: `output` stores the number and `input` stores
supplied percentages in source order divided by 100.

```json
["linear(0)","linear(0% 0)","linear(0% 0,100% 1)","linear(0% 25% 0,1)","linear(25% 0 75%,1)","linear(0 25%,1)","linear(0% 25% 0,1 100%)"]
```

Exact controlling projections include:

```text
linear(0)
→ {kind:"linear-function",stops:[{output:0,input:[]}]}

linear(0% 0,100% 1)
→ {kind:"linear-function",stops:[
     {output:0,input:[0]}, {output:1,input:[1]}
   ]}

linear(0% 25% 0,1)
→ {kind:"linear-function",stops:[
     {output:0,input:[0,.25]}, {output:1,input:[]}
   ]}
```

`linear(25% 0 75%,1)` rejects because positions straddle the number; the last
two bank rows accept. Recognized failures use `css_syntax`, full source span,
and `expected:[]`.

`linear(0)` and `linear(0% 0)` are deliberate expected divergences from LIVE
and Chromium 148.0.7778.96. The pinned Easing-2 grammar and its explicit
one-control-point evaluation algorithm govern under E-4. Chromium does accept
the multi-row percentage-first grammar. The browser disagreement may not
weaken the one-row minimum back to two.

KISS ruling: classify each raw row locally, identify one number, and require
the other zero-to-two percentage parts on only one side. Do not interpolate
used values, create a generic easing AST, or build a second grammar engine.
Missing input positions stay missing in the frozen raw AST.

### R29 — singular range arm, standalone `normal`, exact round trip

`parseAnimationRange` returns one `AnimationRangeValue`; it therefore parses
exactly one arm of the property's outer coordinating `#` list. Any top-level
comma rejects at this door. `normal` is a standalone longhand alternative and
cannot consume an offset. Other frozen named phases may carry one R30 offset.

```json
["normal 0","normal 100%","normal 0 100%","entry,exit","entry,,exit","entry,",",entry","normal, normal","entry 10% exit 90%","entry 10% 90%","10% 90%","entry 10%, exit 90%"]
```

Exact successful projections include:

```text
normal 0
→ {start:{phase:"normal"},end:{offset:"0"}}

normal 100%
→ {start:{phase:"normal"},end:{offset:"100%"}}

entry 10% exit 90%
→ {start:{phase:"entry",offset:"10%"},
   end:{phase:"exit",offset:"90%"}}

entry 10% 90%
→ {start:{phase:"entry",offset:"10%"},end:{offset:"90%"}}

10% 90%
→ {start:{offset:"10%"},end:{offset:"90%"}}
```

`normal 0 100%` and every comma-bearing bank row reject with
`timeline_option_invalid`, full source span/actual, and
`expected:["animation range"]`.

The compact serializer need not invent a new spelling. These exact structural
properties must hold:

```text
T = {start:{phase:"normal"},end:{offset:"0"}}
parseAnimationRange(serializeTimelineOptions({range:T})["animation-range"])
=== T structurally

U = {start:{phase:"normal"},end:{offset:"100%"}}
parseAnimationRange(serializeTimelineOptions({range:U})["animation-range"])
=== U structurally
```

Chromium accepts and serializes `normal 0` as `normal 0px`, and rejects
`normal 0 100%`. It accepts `animation-range: entry,exit` as two coordinating
items, which confirms that the comma cannot mean start/end in this scalar AST.

KISS ruling: reject top-level comma before boundary splitting; treat `normal`
as a disjoint one-token boundary; retain the small `[2,1]` split search for
other arms. Do not add a plural field or encode a property list as start/end.

### R30 — exact literal view/range length-percentage domains

Define one internal literal `<length-percentage>` recognizer over the existing
`numUnit` leaf:

- a finite percentage token;
- a finite dimension whose ASCII-case-insensitive unit is in the exact pinned
  length-unit registry already held by `syntax.ts`; or
- a finite literal number whose numeric value is zero, including signed,
  decimal, and exponent spellings.

View inset consumes `auto | <length-percentage>`. Animation-range boundaries
consume `<length-percentage>` only. Nonzero unitless exponent values remain
R11 failures; exponent-spelled zero closes R11's spelling hole.

```json
["view(auto)","view(auto auto)","auto","entry auto","auto auto","view(1e2px)","1e2px","view(0e0)","0e0","view(1q)","1q","view(1svh)","1svh","view(1s)","1s","view(1deg)","1deg","view(1fr)","1fr","view(1foo)","1foo","view(1e0)","1e0"]
```

`view(auto)` and `view(auto auto)` accept with explicit raw insets preserved.
View/range forms of `1e2px`, `0e0`, `1q`, and `1svh` accept. Range `auto`,
`entry auto`, `auto auto`, every time/angle/flex/unknown dimension, and
nonzero unitless `1e0` reject. Invalid view rows use
`timeline_option_invalid` / `expected:["view timeline"]`; invalid range rows
use the same code with `expected:["animation range"]`, always over the
complete original input.

Chromium witnesses the required literal polarity. Math spellings are
normatively valid where their typed result is length-percentage, but belong to
R32 rather than this literal slice.

KISS ruling: extract only the private length-unit registry/predicate into one
internal numeric-domain module used by W3 and `syntax.ts`; do not change
`coerceToSyntax` semantics. The W3 consumer decides `auto` and unitless zero.
This requires a focused W4 syntax replay, not a public export or W0 replay. If
implementation instead needs `lexeme.ts`, a public type, or a second unit
registry, stop and return through E-3.

## 4. Deferred semantic rows R31–R33

Ratification fixes the following results and owners. It grants no PB0, PB1,
PB3, or PB6 implementation authority.

### R31 — `DEFERRED_PB1`: shared CSS token boundaries

PB1 owns CSS preprocessing, the five CSS whitespace code points, comments,
escape decoding/termination, non-ASCII identifiers, decoded token values, and
original/processed spans. W3 must not patch these with JavaScript `\s`, an
ASCII fallback name regex, or a local escape decoder.

The exact ordered seven-source payload is defined by code points:

```text
scroll(root U+000A x)
scroll(root U+000D U+000A x)
scroll(root U+000C x)
scroll(root/**/x)
scroll(root U+00A0 x)
-- U+00E9
-- U+005C 6 1
```

After PB1, the first four parse as `scroll(root x)`; NBSP rejects because it is
not CSS whitespace; `--é` succeeds with that decoded name; and `--\61`
succeeds with decoded name `--a`. PB1's executable bank additionally covers
U+0009/U+0020, comments at every W3 boundary, escaped function names, bad
strings, and source/processed diagnostic spans.

R31 authorizes no W3 code before PB1. The rows remain executable RED evidence,
not TODOs or skips. PB1 then mandates W3/PB6 replay.

### R32 — `DEFERRED_PB3`: typed math and token-aware nested commas

PB3 owns typed math and dimensional results; PB6 consumes that model for view
insets and ranges. The minimum required payload is:

```json
["view(calc(1px))","calc(1px)","view(calc(0px))","calc(0px)","view(calc(0%))","calc(0%)","view(min(1px, 2%))","min(1px, 2%)","view(calc(0))","calc(0)","view(min(1px,2px))"]
```

Typed length-percentage results from `calc(1px)`, `calc(0px)`, `calc(0%)`, and
`min(1px, 2%)` accept in both consumers. `calc(0)` remains a number and
rejects. The comma in `view(min(1px,2px))` is nested and therefore does not
violate R10. PB3/PB6 must add mixed length-percentage calculations, invalid
time/angle/flex results, substitutions, and nested `min`/`max`/`clamp` commas.

R32 authorizes no W3-local math parser, unit algebra, frozen raw-string AST
widening, or indiscriminate `body.includes(",")` growth. The substring guard is
acceptable only for R30's literal subset and must be replaced/replayed at the
token-aware PB3/PB6 boundary.

### R33 — `DEFERRED_PB0_PB6`: current range and plural carrier

The pinned Scroll Animations source includes `scroll` as a current named range,
and `animation-range` is a coordinating `#` list. Frozen `RangePhase` omits
`scroll`; frozen `AnimationRangeValue` represents one arm. Neither carrier can
represent the full grammar losslessly.

```json
["scroll","scroll 0","scroll 0 100%","entry, exit","entry 10%, exit 90%"]
```

The first three are scalar arms using the current range name. The last two are
property coordinating lists. PB0 must freeze the lossless L4 type/adapter
carrier and maturity; PB6 implements it only after both Phase-B owner gates.

Interim ownership is exact:

1. W3 parses one arm and rejects every top-level comma under R29.
2. W5 splits declaration-level coordinating lists and owns R8's
   `animation_option_invalid` empty-item path. It invokes W3 once per nonempty
   arm and never asks W3 to reinterpret comma as start/end.
3. W4 projects a singular arm only. A plural declaration is an explicit
   representability result; W4 may omit/decline it under its own correction
   authority but may not manufacture one `AnimationRangeValue`.
4. PB6 owns the list-capable current parser/serializer overlay. No legacy type
   is mutated.

R33 records the lossless disposition only. It grants no PB0/PB6 code authority
and does not smuggle `spring()`, trigger depth, or a wider range union into W3.

## 5. Direct evidence/gate repairs D-W3-1–D-W3-3

These are necessary proof repairs whose expected polarity comes from ratified
R8-W3/R27–R33. They are not extra CSS semantic rows.

### D-W3-1 — persistent spec-arbitrated W3 corpus

Replace the LIVE-polarized maintained bank with executable evidence that:

1. retains at least 50 asserted actual accepts and 20 asserted actual rejects
   per W3 parse door after reclassification;
2. contains the exact 81-source, eight-bank payload in §1 and recomputes every
   per-bank and aggregate digest;
3. records current and required projections for every expected divergence,
   preserving the born-RED transcript;
4. compares exact success ASTs or exact first diagnostic code, expected array,
   span, and actual source; and
5. runs deferred R31–R33 rows visibly as executable RED evidence rather than
   TODO/skip.

### D-W3-2 — honest serializer properties and downstream witnesses

Retain byte equality with LIVE only where LIVE is the controlling agreement
oracle. Add exact R29 structural round trips for `normal 0` and `normal 100%`.
State plainly that `timelineScope`, `trigger`, and plural `timelines` have no
corresponding public Phase-A parsers and therefore are output-parity fixtures,
not full parse/serialize round trips.

W4 adds a negative plural-range witness and replays all singular timeline
collection paths. W5 proves declaration-layer list splitting, leading/
repeated/trailing empty diagnostics, and per-arm W3 delegation. PB6 later owns
the true plural round trip.

### D-W3-3 — generated differential, browser witness, and bench replay

Retain deterministic generated products over timing families, function
arities, comma cardinalities, timeline argument orders, range 2/1 splits, R30
numeric spellings, and hostile runtime values. Every common-mode LIVE defect
must map to a ratified R row; every other disagreement is a mirror defect.

Re-run Chromium witnesses for every immediate R8-W3/R27–R30 row. Record the
`linear(0)` spec/browser disagreement rather than treating browser behavior as
authority. W7 replays the complete W3 corpus in both VALUE and SHEET benchmark
scenarios and reports the frozen absolute and relative bars. Correctness gates
are never relaxed to win throughput.

## 6. Parsimony and implementation boundary

After ratification, the immediate repair remains a bounded, idiomatic
parse-that adapter:

1. reuse `fnHead`, `balancedUntil`, `runComplete`, `num`, and `numUnit`;
2. reuse `emptyTopLevelItem` for R8 and existing top-level scanner decisions;
3. retain D-3/D-5 head dispatch and the four public result functions;
4. add only a tiny literal-integer classifier, a row-local `linear()`
   classifier, standalone-`normal` disambiguation, and one internal numeric
   domain helper with one length-unit registry;
5. share that registry with `syntax.ts` without changing W4 syntax semantics;
   and
6. leave tokenization, typed math, plural carriers, trigger depth, and
   `spring()` to their named owners.

Do not add a second tokenizer, unit registry, balanced scanner, generic easing
hierarchy, timeline god module, public token kind, speculative plural field,
parser-level bare `regex()`, `.map()`, `.mapState()`, or local math evaluator.
Ordinary array transforms are not parser combinators, but direct loops are
preferred where they preserve raw spelling and diagnostics more clearly.

The bounded cost anchors are S for R8-W3/R27, M for R28, S–M for R29, and M
for R30 plus the shared-registry replay. These are formation-scale anchors, not
lifecycle caps or permission to weaken a gate. R31–R33 remain in their
separately owner-gated PB waves.

## 7. Dependencies, replay, and close semantics

- **W0:** no replay if `lexeme.ts`, `util.ts`, result/type declarations, and
  public exports remain unchanged. Any shared scanner/lexeme/type edit reopens
  W0's single structural check.
- **W1/W2:** run their full suites as regression rails. W3 does not change
  scalar/value/color semantics.
- **W4:** remains close-held on accepted W2+W3. Replay the shared length-unit
  registry, exact R29 singular round trips, serializer no-throw behavior, and
  plural-range non-collapse.
- **W5:** remains join-held. It owns property coordinating-list splitting and
  animation-coded R8 diagnostics, not W3's scalar AST.
- **W7:** replay every W3 case in the frozen differential/benchmark corpus and
  report both performance bars.
- **PB1:** implements R31 and replays W0/W1/W2/W3/W5 plus PB6 adapters.
- **PB3:** implements the typed numeric/math owner for R32; PB6 consumes it.
- **PB6:** implements the R28 current replay and R31–R33 timeline/range
  overlays, including `scroll`, nested math commas, plural lists, and exact
  serializer properties.

The complete required route is:

```text
ADDENDA-05 exact revision
  -> two independent assume-faulty challenges
  -> root E-3 gestalt adjudication
  -> explicit owner ratification of §8
  -> R8-W3 + R27–R30 + D-W3-1…3 prototype repair
  -> W3 mechanical/spec/browser gates + focused W4 replay
  -> two fresh independent W3 E-1 audits
  -> root adjudication
  -> at most PROVISIONAL_PHASE_A_ACCEPTED
  -> W4 may enter its audits only after W2 is also accepted

ADDENDA-02 Gate 1 -> PB0 reviews -> owner Gate 2
  -> PB1/PB3/PB6 turn R31–R33 GREEN
  -> final tranche perfection eligibility
```

Before the two fresh W3 audits start, require:

- this addendum twice-challenged, gestalt-adjudicated, and owner-ratified;
- no author mutating W3/W4 replay files;
- every immediate row and D-W3 repair sealed GREEN, with R31–R33 executable
  and visibly deferred;
- all eight bank hashes and the aggregate 81-source digest regenerate exactly;
- `npm test`, `npm run check`, and `npm run dts-parity` GREEN;
- exact `@mkbabb/parse-that@1.0.0`, zero production dependency
  vulnerabilities, and 33-type + 19-runtime barrel parity;
- every public W3 door no-throw on branch-diverse runtime hostiles;
- LIVE differential, spec-arbitrated rows, and versioned Chromium witnesses;
- exact `normal` structural round trips and an honest serializer claim;
- review finds no second tokenizer/scanner/unit registry, public type widening,
  bare recognition regex, parser `.map()`/`.mapState()`, freeze, or production
  edit; and
- W4 remains close-held until both W2 and W3 are independently accepted.

Any confirmed defect repairs the prototype and restarts both E-1 passes. Any
semantic expansion returns through E-3. Any shared-foundation edit reopens its
structural replay. G-2 is never relaxed to chase performance.

## 8. Exact owner authorization requested

After this exact revision receives two independent ACCEPT challenges and root
gestalt adjudication, the owner is asked to ratify or reject all of the
following as one explicit decision:

1. the R8-W3 ownership extension and atomic global R27–R33 reservation;
2. R27–R30 as the exact immediate Phase-A W3 semantic correction set;
3. `linear(0)` and `linear(0% 0)` as pinned-spec expected divergences from
   LIVE and Chromium 148.0.7778.96;
4. R31/R32/R33 as exact executable deferred results, with no PB1/PB3/PB6 code
   authority and no frozen-type approximation;
5. W3's singular range door, W5's property-list splitting, W4's non-collapse
   duty, and PB6's eventual lossless plural/current-range overlay;
6. D-W3-1–D-W3-3 as evidence/gate repairs listed for exact scope, not new
   semantic discretion;
7. all eight persistent bank digests, their 81-source aggregate digest, and
   mandatory W4/W5/W7/PB1/PB3/PB6 replays;
8. conditional W0 replay only if shared lexeme/scanner/type ownership moves;
9. the unchanged 33-type + 19-runtime surface, prototype-only path, and
   provisional pre-PB1/pre-PB3/pre-PB6 status; and
10. the truthful Codex model-route variance in place of unavailable named
    Opus/Fable routes.

Ratification authorizes no new export, public token kind, `spring()` arm,
trigger grammar, production wiring, local typed math, widened legacy
`RangePhase`, plural field on `AnimationRangeValue`, PB0/PB1/PB3/PB6 feature
code, or ship. It is orthogonal to both Phase-B owner gates in `ADDENDA-02`
and the W1/W2 owner decisions in `ADDENDA-03`/`ADDENDA-04`.

## 9. Cost and close of proposal

This correction adds no feature wave or public door. Its immediate increment
is one bounded W3 semantic/hardening slice plus persistent corpus work,
focused W4/W5/W7 replays, two addendum challenges and root gestalt before
ratification, then two fresh W3 E-1 passes and root adjudication after repair.
R31–R33 code and shared-token/math/type work remain in separately owner-gated
Phase-B budgets.

This sheet is complete only as the third E-3 formation artifact. It is not an
implementation receipt, challenge, owner decision, W3 verdict, Phase-B gate,
or production authorization. The next authorized actions are two independent
assume-faulty challenges of this exact revision and root gestalt adjudication.
Until those complete and the owner ratifies §8, W3 remains
**AUTHOR-COMPLETE, E-1 REJECTED, NOT ACCEPTED**, R8-W3/R27–R33 remain
unratified, and no new semantic code from this addendum may land.

---

Formation receipt: W3 easing/timeline audit-correction addenda-writing seat;
`model_served`: inherited Codex GPT-5 family route; the service-side backend
revision and an Opus/Fable label were not exposed to this seat, so this receipt
claims neither; 2026-07-21.
