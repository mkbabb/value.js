# V·π W3 easing/timeline audit correction — harden seat

status: `HARDEN_COMPLETE_PROPOSED_NOT_AUTHORITY`

model_served: `Codex GPT-5 family` (inherited child route; the exact backend
revision and an Opus/Fable label were not exposed, so this receipt claims
neither)

date: 2026-07-21

Target: the focused W3 correction formed from `W3-AUDIT-A.md`,
`W3-AUDIT-B.md`, and
`formation/w3-easing-timeline-audit-research.md`.

This is the harden leg only. It changes no parser, serializer, fixture, public
type, production source, Phase-B gate, or owner authority. Its dispositions
control the addenda-writing seat, but become implementation authority only
after the complete focused addendum is twice challenged, root
gestalt-adjudicated, and explicitly ratified by the owner.

## 0. Harden verdict

**ACCEPT the focused formation with amendments; keep W3 REJECTED.** The two
audits and research establish four immediate Phase-A correction rows, three
lossless deferred L4 rows, and an explicit W3 extension of already-ratified
R8. They also establish three evidence/gate repairs that do not choose new CSS
semantics but still must not be used to imply acceptance before ratification.

The research seat is substantially correct. Harden makes four controlling
amendments:

1. W2 has atomically reserved R19–R26. This sheet therefore reserves **R27–R33**
   for W3 and does not reuse the research seat's wave-local labels.
2. R8 remains the global empty-list rule. W3 gains explicit R8 ownership for
   easing function argument lists; no duplicate correction row is created.
3. Literal length-percentage work and deferred typed-math work are separate.
   R30 closes the finite literal slice with the existing `numUnit` leaf and one
   shared length-unit registry. R32 remains RED until PB3 supplies typed math;
   W3 must not build a local math parser.
4. The scalar `AnimationRangeValue` and the property's coordinating list are
   separate contracts. R29 makes the frozen W3 door singular and lossless.
   R33 keeps the plural/current-range carrier RED for PB0/PB6; W4 and W5 may
   not collapse the distinction in the interim.

The hardened split is:

| class | rows/work | implementation authority |
|---|---|---|
| existing global semantic rule, new W3 ownership | R8-W3 | owner ratifies the ownership/fixtures, then W3 repair |
| immediate Phase-A W3 semantics | R27–R30 | owner ratification, then W3 prototype repair |
| shared token semantics | R31 | PB1, then mandatory W3/PB6 replay |
| typed math and nested-comma semantics | R32 | PB3, then mandatory W3/PB6 replay |
| current range name and plural carrier | R33 | PB0 freezes the carrier; PB6 implements after its own gates |
| evidence/gate repair | D-W3-1–D-W3-3 | no independent CSS discretion; land with the ratified semantic repair |

No row widens the frozen 33-type + 19-runtime Phase-A surface. No row
authorizes PB0/PB1/PB3/PB6 implementation or production execution.

## 1. Namespace ruling

Reserve **R27 through R33** atomically for this focused W3 addendum:

| row | title | terminal owner |
|---|---|---|
| R27 | exact `steps()` arity and literal `<integer>` | W3; PB3/PB6 replay |
| R28 | pinned Easing-2 `linear()` grammar | W3; PB6 replay |
| R29 | singular range arm, standalone `normal`, exact round trip | W3; W4/W5 replay |
| R30 | view/range literal `<length-percentage>` domains and exponent-zero R11 | W3; W4 replay |
| R31 | CSS token boundaries, whitespace, comments, escapes, and decoded names | PB1 → W3/PB6 replay |
| R32 | typed math offsets and token-aware nested commas | PB3 → W3/PB6 replay |
| R33 | current `scroll` range and lossless coordinating-list carrier | PB0 → PB6; W4/W5 adapters |

R13–R18 belong to the focused W1 proposal and R19–R26 belong to the
focused W2 proposal. R27 is therefore the first free global number. The
addenda writer must publish this reservation as one block; it may not renumber
or split these rows based on which implementation happens first.

R8-W3 is not part of the new-number block. It is an ownership amendment to the
already-ratified Syntax-3 rule: recognized easing argument lists reject empty
top-level members rather than silently deleting them.

## 2. Exact immediate semantic dispositions

### R8-W3 — ACCEPT EXTENSION: empty easing members remain R8

Before splitting any recognized `cubic-bezier()`, `steps()`, or `linear()`
body, reject a leading, repeated, or trailing empty **top-level** comma member.
Commas nested in a future math function are not outer members.

The exact ordered supplement is:

```json
["cubic-bezier(,0,0,1,1)","cubic-bezier(0,,0,1,1)","cubic-bezier(0,0,1,1,)","steps(,2)","steps(2,)","steps(2,,start)","linear(,0,1)","linear(0,,1)","linear(0,1,)"]
```

Its compact-JSON SHA-256 is
`d9b4d7ebcfbb6b9c484222b02778f9a9af131645b44336aac232b1efee5f5b2b`.
All nine rows reject with one diagnostic over the original complete input:
`code:"css_syntax"`, `start:0`, `end:source.length`, `expected:[]`, and
`actual:source`. Current LIVE/mirror accept every row; Chromium rejects every
row. This is an expected R8 divergence after repair, not a mirror defect.

KISS ruling: call the existing `emptyTopLevelItem(body, ",")` once on each
recognized function path before `splitTopLevel`. Do not write another comma
scanner or widen `splitTopLevel` globally.

### R27 — ACCEPT: exact `steps()` arity and literal `<integer>`

The terminal grammar is `steps(<integer>, <step-position>?)`:

- after R8-W3 emptiness rejection, require exactly one or two arguments;
- the first source token is an optional ASCII sign followed by one or more
  ASCII decimal digits, then converts to a finite JavaScript number;
- require count `> 0`; `jump-none` additionally requires count `> 1`;
- retain the six current position aliases and default omission to `jump-end`;
- decimal and exponent spellings are not literal `<integer>` tokens even when
  their numeric value is integral.

| source | exact terminal result |
|---|---|
| `steps(+01)` | `{kind:"steps",count:1,position:"jump-end"}` |
| `steps(0002,start)` | `{kind:"steps",count:2,position:"jump-start"}` |
| `steps(-01)` | reject after lexical success: count is not positive |
| `steps(+00)` | reject after lexical success: count is not positive |
| `steps(1.0)` | reject: not a literal integer |
| `steps(1e0)` | reject: not a literal integer |
| `steps(2,start,end)` | reject: excess nonempty argument |

Every reject uses the same complete-input `css_syntax` / `expected:[]`
diagnostic as R8-W3. The ordered seven-source payload above has compact-JSON
SHA-256
`b5a0ce1c7a034c6a1028b9ea2b094a99103ff7500634634718d1db9b4ca8a199`.

KISS ruling: preserve the raw first argument long enough for a tiny ASCII
character loop, then reuse the current numeric conversion and semantic bounds.
Do not use a parser-level bare `regex()`, add a public integer token kind, or
grow a general tokenizer. PB3/PB6 later replay typed math/substitution without
changing the literal Phase-A result.

### R28 — ACCEPT: pinned Easing-2 `linear()` grammar

The pinned production is
`linear( [ <number> && <percentage>{0,2} ]# )`. Therefore:

- the outer list contains one or more nonempty rows;
- each row contains exactly one number and one contiguous group of zero, one,
  or two percentages;
- the percentage group may precede or follow the number;
- percentages may not straddle the number; and
- the existing `CssLinearStop` shape is sufficient: preserve supplied
  positions in source order and divide percentages by 100.

| source | exact terminal result |
|---|---|
| `linear(0)` | `{kind:"linear-function",stops:[{output:0,input:[]}]}` |
| `linear(0% 0)` | one stop `{output:0,input:[0]}` |
| `linear(0% 0,100% 1)` | stops `{output:0,input:[0]}`, `{output:1,input:[1]}` |
| `linear(0% 25% 0,1)` | stops `{output:0,input:[0,.25]}`, `{output:1,input:[]}` |
| `linear(25% 0 75%,1)` | reject; percentages straddle the number |
| `linear(0 25%,1)` | accept; ordinary output-first agreement row |
| `linear(0% 25% 0,1 100%)` | accept both percentage-group orientations |

The ordered seven-source payload has compact-JSON SHA-256
`5154b60fc0c303d0736ab14f9344aef045dffa12c17bc145d25fbaab859e3dae`.
All rejects use `css_syntax`, full source span, and `expected:[]` after the
function has been recognized.

`linear(0)` and `linear(0% 0)` are deliberate expected divergences from LIVE
and Chromium 148.0.7778.96. The immutable Easing-2 grammar and its explicit
one-control-point algorithm govern under E-4. The addendum may not weaken the
minimum back to two because a browser build lags the pinned source.

KISS ruling: per row, classify the raw space-separated parts, identify the one
number, then require the remaining percentage parts to occupy only one side.
Do not add used-value interpolation, a generic easing AST, or a second grammar
engine. Missing input positions remain missing in the frozen raw AST.

### R29 — ACCEPT: one scalar range arm and standalone `normal`

`parseAnimationRange` returns one `AnimationRangeValue`, so it parses exactly
one arm of the property's outer `#` list. Any top-level comma rejects at this
door. `normal` is a standalone boundary alternative and cannot carry an
offset. Other frozen named phases may carry one literal R30 offset.

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

`normal 0 100%` rejects. So do `entry,exit`, `entry,,exit`, `entry,`,
`,entry`, `normal, normal`, and `entry 10%, exit 90%`. Each scalar-range
failure is `timeline_option_invalid`, whole-input span/actual, and
`expected:["animation range"]`.

The exact ordered twelve-source range-disambiguation/list payload is:

```json
["normal 0","normal 100%","normal 0 100%","entry,exit","entry,,exit","entry,",",entry","normal, normal","entry 10% exit 90%","entry 10% 90%","10% 90%","entry 10%, exit 90%"]
```

Its compact-JSON SHA-256 is
`12aabfe06550793b7fdf3851b4503abd82fc49bc0c585ec38cc0382af60f8267`.

The serializer spelling remains compact. These exact properties must hold:

```text
T = {start:{phase:"normal"},end:{offset:"0"}}
parseAnimationRange(serializeTimelineOptions({range:T})["animation-range"])
=== T structurally

U = {start:{phase:"normal"},end:{offset:"100%"}}
parseAnimationRange(serializeTimelineOptions({range:U})["animation-range"])
=== U structurally
```

KISS ruling: reject a top-level comma before boundary splitting; treat
`normal` as a disjoint one-token boundary; retain the current small `[2,1]`
split search for all other arms. Do not add a plural field to the frozen type
or encode a property list as `start/end`.

### R30 — ACCEPT: distinct view/range domains and the literal numeric slice

Define one internal literal `<length-percentage>` recognizer over the existing
`numUnit` leaf:

- a finite percentage token;
- a finite dimension whose ASCII-case-insensitive unit is in the exact pinned
  length-unit registry currently held by `syntax.ts`; or
- a finite literal number whose numeric value is zero, including signed,
  decimal, or exponent spellings.

View inset consumes `auto | <length-percentage>`. Animation-range boundaries
consume `<length-percentage>` only. Thus `auto` remains valid in `view()` but
is invalid through the range door. Nonzero unitless exponent values remain R11
failures, while exponent-spelled zero closes R11's spelling hole.

| family | required result |
|---|---|
| `view(auto)`, `view(auto auto)` | accept and preserve raw inset spelling |
| range `auto`, `entry auto`, `auto auto` | reject animation range |
| view/range `1e2px`, `0e0`, `1q`, `1svh` | accept literal length/zero spelling |
| view/range `1s`, `1deg`, `1fr`, `1foo` | reject wrong dimension class |
| view/range `1e0` | reject nonzero unitless number under R11 |

The exact ordered 23-source payload is:

```json
["view(auto)","view(auto auto)","auto","entry auto","auto auto","view(1e2px)","1e2px","view(0e0)","0e0","view(1q)","1q","view(1svh)","1svh","view(1s)","1s","view(1deg)","1deg","view(1fr)","1fr","view(1foo)","1foo","view(1e0)","1e0"]
```

Its compact-JSON SHA-256 is
`97108fc335e6c55c9e7e9658ce043985178f2af3bf7d59f0e54d41606464efcf`.
Invalid view rows use `timeline_option_invalid` /
`expected:["view timeline"]`; invalid range rows use the same code with
`expected:["animation range"]`, all over the complete original input.

KISS ruling: extract only the private length-unit registry/predicate to a
single internal numeric-domain module used by W3 and `syntax.ts`; do not change
`coerceToSyntax`'s semantics merely because it shares the unit registry. W3's
consumer decides unitless-zero and `auto`. This move requires the focused W4
syntax replay, not a public export or a W0 scaffold replay. If implementation
instead needs `lexeme.ts`, a public type, or a second unit registry, stop and
return through E-3.

## 3. Exact deferred semantic dispositions

### R31 — ACCEPT-DEFER: shared CSS token boundaries belong to PB1

PB1 owns CSS preprocessing, the five CSS whitespace code points, comment
trivia, escape decoding/termination, non-ASCII identifiers, decoded token
values, and source/processed spans. W3 must not patch these with JavaScript
`\s`, an ASCII name regex, or a local escape decoder.

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

Its `JSON.stringify` compact-JSON SHA-256 is
`dffae92026a261532f538cdb0fe88f16ff30b3cbeb1f7dc8b3d5c89f8ccc47e7`.
After PB1, the first four rows parse as `scroll(root x)`, NBSP rejects because
it is not CSS whitespace, `--é` succeeds with that decoded name, and `--\61`
succeeds with decoded name `--a`. PB1's executable bank must additionally
cover U+0009/U+0020, comments at every W3 token boundary, escaped function
names, bad strings, and original/processed diagnostic spans.

R31 authorizes no W3 code before PB1. Until then W3 can be at most
`PROVISIONAL_PHASE_A_ACCEPTED`, and these rows remain executable RED evidence,
not skipped tests or TODOs.

### R32 — ACCEPT-DEFER: typed math and token-aware nested commas belong to PB3

PB3 owns typed math and dimensional results. PB6 consumes that model for view
insets and animation ranges. Required L4 outcomes include accepting
`calc(1px)`, `calc(0px)`, `calc(0%)`, and `min(1px, 2%)` in both consumers;
rejecting `calc(0)` because it remains a number; and accepting the nested comma
in `view(min(1px,2px))` because R10 rejects only a **top-level** comma.

The exact ordered eleven-source payload is:

```json
["view(calc(1px))","calc(1px)","view(calc(0px))","calc(0px)","view(calc(0%))","calc(0%)","view(min(1px, 2%))","min(1px, 2%)","view(calc(0))","calc(0)","view(min(1px,2px))"]
```

Its compact-JSON SHA-256 is
`ac7e01373e98cfa8eaefd122f04b37722b16ace7304a7aba06958d25b159ae45`.
PB3/PB6 must add mixed length-percentage calculations, invalid time/angle/flex
results, substitutions, and nested min/max/clamp commas around this minimum.

R32 authorizes no W3-local math parser, unit algebra, `body.includes(",")`
widening, or frozen raw-string AST widening. The current substring comma guard
is acceptable only for R30's literal subset and must be replaced/replayed at
the token-aware PB3/PB6 boundary.

### R33 — ACCEPT-DEFER: current range inventory and plural carrier

The pinned Scroll Animations source includes `scroll` as a current named range,
and the `animation-range` property is a coordinating `#` list. The frozen
Phase-A `RangePhase` omits `scroll`, while `AnimationRangeValue` represents one
arm. Neither carrier can represent the full current grammar losslessly.

The exact minimum PB6 payload is:

```json
["scroll","scroll 0","scroll 0 100%","entry, exit","entry 10%, exit 90%"]
```

Its compact-JSON SHA-256 is
`d40c3096267ddd630d75ebc5a974bac93a47bdf184884bebdb3fb02bd24c8dc5`.
The first three are scalar arms using the new current range name; the final
two are property coordinating lists with two arms. PB0 must freeze the
lossless L4 type/adapter carrier and maturity before PB6 implements it.

Interim ownership is exact:

1. W3 parses one arm and rejects every top-level comma under R29.
2. W5 owns declaration-list splitting and existing R8's
   `animation_option_invalid` empty-item path. It invokes W3 once per nonempty
   arm; it never asks W3 to reinterpret a comma as `start/end`.
3. W4 may project a singular arm only. A plural declaration is an explicit
   representability result; W4 may omit/decline it under its own correction
   authority but may not manufacture one `AnimationRangeValue`.
4. PB6 owns the current list-capable parser/serializer overlay. No frozen
   legacy type is mutated.

R33 ratification records the lossless disposition only. It grants no PB0 or
PB6 implementation authority before the two Phase-B owner gates.

## 4. Direct evidence/gate repairs

These are not extra CSS semantic rows. They are necessary proof repairs whose
expected polarity is supplied by ratified R8/R27–R33.

### D-W3-1 — persistent, spec-arbitrated W3 corpus

Replace the LIVE-polarized maintained bank with an executable corpus that:

1. retains at least 50 asserted actual accepts and 20 asserted actual rejects
   per W3 parse door after reclassification;
2. includes and rehashes the exact R8-W3/R27–R33 payloads above;
3. stores both current and required projections for every new expected
   divergence, preserving the born-RED transcript;
4. compares exact success ASTs or exact first diagnostic code, expected array,
   span, and actual source; and
5. distinguishes executable deferred RED rows from TODO/skip.

The eight ordered payloads above contain 81 sources in total. Their compact
JSON object digest, with keys in this exact order
`B8W3,B27,B28,B29,B30,B31,B32,B33`, is
`f288380235f1a9f5a925b4bb786e1f05ca499c0b2b1da4f65a4cefd9e626effa`.
Tests must regenerate per-bank and aggregate hashes; a prose count does not
discharge this gate.

### D-W3-2 — honest serializer properties and downstream witnesses

Retain exact byte equality with LIVE only where LIVE is the controlling
agreement oracle. Add exact structural R29 round trips for `normal 0` and
`normal 100%`. State plainly that `timelineScope`, `trigger`, and plural
`timelines` lack corresponding public Phase-A parsers and therefore are output
parity fixtures, not full parse/serialize round trips.

W4 must add a negative plural-range witness and rerun all singular timeline
collection paths. W5 must test declaration-layer list splitting, leading/
repeated/trailing empty items, and per-arm W3 delegation. PB6 later owns the
true plural round trip.

### D-W3-3 — generated differential, browser witness, and bench replay

The repaired gate must retain deterministic generated products over all timing
families, function arities, comma cardinalities, timeline argument orders,
range 2/1 splits, R30 numeric spellings, and hostile runtime values. Every
common-mode LIVE defect maps to a ratified R row; all other disagreement is a
mirror defect.

Re-run the pinned Chromium witness for all immediate R8-W3/R27–R30 rows and
record the expected `linear(0)` spec/browser disagreement rather than treating
browser behavior as the arbiter. W7 must replay the full W3 corpus in both
VALUE and SHEET benchmark scenarios and report the frozen absolute and
relative bars; correctness gates are never relaxed to win throughput.

## 5. Parsimony and implementation boundary

The immediate repair should remain a bounded, idiomatic parse-that adapter:

1. reuse `fnHead`, `balancedUntil`, `runComplete`, `num`, and `numUnit`;
2. reuse `emptyTopLevelItem` for R8 and top-level scanner decisions;
3. retain D-3/D-5 head dispatch and the four public result functions;
4. add only a tiny literal-integer classifier, a row-local `linear()`
   classifier, standalone-`normal` disambiguation, and one internal numeric
   domain helper with one length-unit registry;
5. share the unit registry with `syntax.ts` without changing W4 syntax
   semantics; and
6. leave tokenization, typed math, plural carriers, trigger depth, and
   `spring()` to their named owners.

Do not add a second tokenizer, second unit registry, second balanced scanner,
generic easing hierarchy, timeline god module, public token kind, speculative
plural field, parser-level bare `regex()`, `.map()`, `.mapState()`, or a local
math evaluator. Ordinary array transforms are not parser combinators, but the
repair should prefer direct loops where they preserve raw token spelling and
diagnostics more clearly.

Implementation cost is expected to be S for R8-W3/R27, M for R28, S–M for
R29, and M for R30 plus the shared-registry replay. These are formation-scale
anchors, not lifecycle caps and not permission to weaken a gate. R31–R33 costs
remain in their separately owner-gated PB waves.

## 6. Dependencies, replay, and close semantics

- **W0:** no replay is required if implementation leaves `lexeme.ts`,
  `util.ts`, result/type declarations, and public exports unchanged. Any
  shared scanner or lexeme change reopens W0's single structural check.
- **W1/W2:** run their full suites as regression rails. No W3 row changes
  scalar/value/color semantics.
- **W4:** remains close-held on accepted W2+W3. Replay the shared length-unit
  registry, exact R29 singular round trips, serializer no-throw behavior, and
  plural-range non-collapse.
- **W5:** remains join-held. It owns property-level coordinating-list splitting
  and animation-coded R8 diagnostics, not W3's scalar AST.
- **W7:** replay all W3 cases in the frozen differential/benchmark corpus and
  report both bars.
- **PB1:** implements R31 and replays W0/W1/W2/W3/W5 plus PB6 adapters.
- **PB3:** implements typed numeric/math ownership for R32; PB6 consumes it.
- **PB6:** implements R28 current replay and R31–R33 timeline/range overlays,
  including current `scroll`, nested math commas, plural lists, and exact
  serializer properties.

The complete required route is:

```text
focused W3 addendum
  -> two independent adversarial challenges
  -> root gestalt adjudication
  -> explicit owner ratification of R8-W3 + R27–R33 + D-W3-1…3
  -> R8-W3 + R27–R30 + D-W3-1…3 prototype repair
  -> W3 mechanical/spec/browser gates + W4 focused replay
  -> two fresh independent W3 E-1 audits
  -> provisional Phase-A W3 verdict
  -> W4 may enter its two audits only after W2 is also accepted
  -> PB1/PB3/PB6 later turn R31–R33 GREEN
  -> final tranche perfection verdict
```

A pre-PB1/PB3/PB6 W3 repair may be labelled only
`PROVISIONAL_PHASE_A_ACCEPTED`. Tranche perfection cannot call the easing/
timeline/range domain final while R31, R32, or R33 remains deferred.

## 7. Exact owner authorization requested

The addendum must ask the owner to authorize exactly:

1. the R27–R33 namespace reservation and the R8-W3 ownership extension;
2. R27–R30 as the exact immediate Phase-A W3 semantic correction set;
3. `linear(0)` as a pinned-spec expected divergence from LIVE and Chromium;
4. R31/R32/R33 as exact executable deferred results, with no PB1/PB3/PB6 code
   authority and no frozen-type approximation;
5. W3's singular range door, W5's list splitting, W4's non-collapse duty, and
   PB6's eventual lossless plural/current-range overlay;
6. D-W3-1–D-W3-3 as evidence/gate repairs listed for scope clarity, not new
   semantic discretion;
7. the persistent bank digests and mandatory W4/W5/W7/PB1/PB3/PB6 replays;
8. conditional W0 replay only if shared lexeme/scanner/type ownership moves;
9. the unchanged frozen 33-type + 19-runtime surface and prototype-only path;
   and
10. the truthful Codex model-route variance in place of the unavailable named
    Opus/Fable routes.

Anything else—new exports, public token types, `spring()`, trigger grammar,
production wiring, local typed math, a widened legacy `RangePhase`, or a
plural field on `AnimationRangeValue`—is excluded and must return through its
own authority path.

## 8. Formation seal

The addenda writer may now draft the focused W3 correction sheet from these
dispositions. W3 remains **AUTHOR-COMPLETE, E-1 REJECTED, NOT ACCEPTED**;
R8-W3 and R27–R33 remain **PROPOSED / NOT RATIFIED**; the direct evidence
repairs are not evidence of wave acceptance; and no semantic implementation is
authorized by this harden artifact.

Harden seal: **complete, proposed, non-authoritative; recommendations frozen
for addenda drafting; no code and no production execution.**
