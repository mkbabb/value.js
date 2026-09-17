# V·π ADDENDA-05 ADVERSARIAL CHALLENGE A — W3 easing/timeline corrections

status: `ACCEPT`

date: 2026-07-21

challenged artifact: `ADDENDA-05.md`

challenged raw-byte SHA-256:
`1bf4170857c1def8a2992b1275d6fe43d1a4d6b91e9f509f9046915e400ba525`

model_served: inherited Codex GPT-5 family route; the service-side backend
revision and an Opus/Fable label were not exposed to this seat, so this receipt
claims neither.

This was an independent assume-faulty challenge. I did not read or contact the
other addendum auditor, edit the addendum, inspect an unpublished verdict, or
change implementation/production files.

## Verdict

**ACCEPT.** The challenged sheet is internally complete, content-addressed,
spec-correct at the pinned revision, lossless at every Phase-A/deferred
boundary, parsimonious, and authority-safe. I found no semantic, ownership,
diagnostic, evidence, or sequencing defect requiring amendment.

This verdict approves the addendum for root E-3 gestalt adjudication only. It
does not ratify R8-W3 or R27–R33, authorize parser changes, accept W3, authorize
PB0/PB1/PB3/PB6, or relax any downstream replay.

## 1. Artifact and authority identity

- The challenged bytes independently hash to the digest above.
- The Phase-B root-seed manifest independently canonicalizes to
  `cd505eecd6404e8719baef2c18a8e62b03916db46ec56a7ae92f0a1c2615937c`
  after removal of only its top-level `manifest_content_digest`, recursively
  sorting object keys, preserving arrays, and compact JSON serialization.
- Fresh HTTPS retrieval from the official CSSWG repository at immutable commit
  `c7573530343759ace8e46438a1fa2c44515b5554` reproduced all five cited source
  identities exactly:

| source | bytes | independently reproduced SHA-256 |
|---|---:|---|
| `css-easing-1/Overview.bs` | 19,774 | `92043cb3319f450dfdbbef32035324ddf66969f9fe0330514f2c2db7ca74f185` |
| `css-easing-2/Overview.bs` | 36,116 | `650cdccf65fe523627ce7917c8d1bef1361dac6bf62a82f8f75c89524a521554` |
| `scroll-animations-1/Overview.bs` | 65,357 | `c730c2d6cdae2aeb9d5616b844ce378613a24b4af7e1eeca640adbbaedd683e1` |
| `css-syntax-3/Overview.bs` | 144,427 | `3f129d17407f9bd027291bcfb8015beb86fc229bf5efe505b49ec2dc30be4390` |
| `css-values-4/Overview.bs` | 230,907 | `7051146f8adf0b8c0e9243dd75dab39f18efe3e0905d86afb8abd43fe58d45bc` |

The namespace is also collision-free. `ADDENDA-03` owns R13–R18,
`ADDENDA-04` owns R19–R26, and the challenged sheet is the only global packet
reserving R27–R33. R8-W3 is correctly an ownership extension of ratified R8,
not a second global rule.

## 2. Exact evidence rehash

I reconstructed each ordered payload from the sheet, serialized it with
`JSON.stringify`, and hashed the resulting UTF-8 bytes. Every denominator and
digest reproduced:

| bank | count | independently reproduced SHA-256 |
|---|---:|---|
| `B8W3` | 9 | `d9b4d7ebcfbb6b9c484222b02778f9a9af131645b44336aac232b1efee5f5b2b` |
| `B27` | 7 | `b5a0ce1c7a034c6a1028b9ea2b094a99103ff7500634634718d1db9b4ca8a199` |
| `B28` | 7 | `5154b60fc0c303d0736ab14f9344aef045dffa12c17bc145d25fbaab859e3dae` |
| `B29` | 12 | `12aabfe06550793b7fdf3851b4503abd82fc49bc0c585ec38cc0382af60f8267` |
| `B30` | 23 | `97108fc335e6c55c9e7e9658ce043985178f2af3bf7d59f0e54d41606464efcf` |
| `B31` | 7 | `dffae92026a261532f538cdb0fe88f16ff30b3cbeb1f7dc8b3d5c89f8ccc47e7` |
| `B32` | 11 | `ac7e01373e98cfa8eaefd122f04b37722b16ace7304a7aba06958d25b159ae45` |
| `B33` | 5 | `d40c3096267ddd630d75ebc5a974bac93a47bdf184884bebdb3fb02bd24c8dc5` |

The banks total exactly 81 sources. The compact object in the specified key
order `B8W3,B27,B28,B29,B30,B31,B32,B33` independently hashes to
`f288380235f1a9f5a925b4bb786e1f05ca499c0b2b1da4f65a4cefd9e626effa`.

For B31 specifically, the recorded digest disambiguates the notation to these
exact source strings, with no extra U+0020 adjacent to the named code point:

```json
["scroll(root\nx)","scroll(root\r\nx)","scroll(root\fx)","scroll(root/**/x)","scroll(root x)","--é","--\\61"]
```

Thus its variable rows contain respectively U+000A, U+000D U+000A, U+000C,
U+00A0, U+00E9, and the literal sequence U+005C U+0036 U+0031. Replacing any
of those with prose characters or adding display spaces changes the hash and
fails the gate.

## 3. Semantic challenge R8-W3 and R27–R30

### R8-W3 and R27

The empty-member extension has the correct altitude: only recognized easing
function bodies gain the existing top-level R8 check, so nested future math
commas are not misclassified and W5 retains its property-list diagnostic. The
exact whole-input `css_syntax` / empty-expected diagnostic is consistent with
the recognized W3 function path.

Pinned Easing 1 defines `steps(<integer>, <step-position>?)`, requires a
positive count (greater than one for `jump-none`), and preserves all four
`jump-*` values plus `start`/`end`. The sheet correctly distinguishes a CSS
integer token from a numerically integral number: signs and leading zeroes are
valid, while decimal and exponent representations are not literal integers.
Requiring exactly one or two nonempty arguments closes the ignored-tail defect
without introducing a tokenizer.

### R28

Pinned Easing 2 defines
`linear([ <number> && <percentage>{0,2} ]#)`. The sheet preserves the required
one-or-more nonempty rows, the unordered number/percentage-group orientation,
the contiguous zero-to-two percentage multiplier, and supplied percentage
order. The one-control-point output algorithm explicitly returns that point's
output, so `linear(0)` and `linear(0% 0)` are normative successes even though
the recorded Chromium 148 witness rejects them. Retaining missing inputs in
the raw `CssLinearStop` rather than applying used-value canonicalization is the
lossless frozen-carrier choice.

### R29

Pinned Scroll Animations defines the shorthand as
`[ <animation-range-start> <animation-range-end>? ]#` and separately defines
both longhands as coordinating lists. The scalar `parseAnimationRange` result
can therefore represent exactly one shorthand arm, never a comma list. The
sheet correctly assigns list splitting to W5, singular projection/non-collapse
to W4, and the lossless plural overlay to PB6.

Within one arm, `normal` is a standalone longhand alternative, not a named
range with an offset. Consequently `normal 0` and `normal 100%` unambiguously
mean a `normal` start plus a numeric end. The two required serializer/parser
properties preserve those exact structures, while `normal 0 100%` and every
top-level-comma B29 row correctly fail with the complete-input
`timeline_option_invalid` / `expected:["animation range"]` diagnostic.

### R30

The literal domain split matches the pinned grammars: view inset accepts
`auto | <length-percentage>`, while an animation-range boundary accepts only
`<length-percentage>`. CSS Values permits unitless zero as a length, including
zero-valued exponent spellings, but does not turn a nonzero bare number into a
length. Exponent dimensions remain dimensions, and time, angle, flex, and
unknown dimensions are not lengths.

The proposed private helper is correctly bounded to literal `numUnit` values
and one shared length-unit registry. Sharing only that registry with
`syntax.ts`, leaving `coerceToSyntax` behavior unchanged, and letting the W3
consumer decide `auto`/unitless-zero avoids both a duplicate registry and an
unauthorized W4 semantic change.

## 4. Deferred challenge R31–R33

- **R31 / PB1:** ownership of preprocessing, the five CSS whitespace code
  points, comments, escape decoding, non-ASCII names, and original/processed
  spans is correctly centralized. LF, CRLF, FF, and comment trivia separate
  the `root` and `x` tokens; NBSP is not CSS whitespace; `--é` and `--\61`
  require decoded ident-token semantics. Keeping these rows executable RED
  prevents provisional W3 from claiming full token conformance.
- **R32 / PB3 then PB6:** the sheet correctly separates literal R30 from typed
  math. `calc(1px)`, `calc(0px)`, `calc(0%)`, and mixed
  `min(1px, 2%)` have length-percentage-compatible types, whereas `calc(0)`
  remains a number. A comma inside `min()` is nested, not R10's top-level
  separator. No W3-local algebra or substring-comma generalization is allowed.
- **R33 / PB0 then PB6:** the pinned source defines `scroll` as a current named
  view-timeline range and defines animation-range as a coordinating list.
  Frozen `RangePhase` lacks `scroll`, and `AnimationRangeValue` carries one
  arm, so deferring the carrier to PB0 and the overlay to PB6 is the only
  lossless disposition. W3/W4/W5 interim duties neither reject valid property
  lists globally nor collapse them into a fabricated scalar value.

These rows ratify terminal expectations and ownership only; the sheet
repeatedly and unambiguously withholds PB0/PB1/PB3/PB6 implementation
authority.

## 5. Diagnostics, proof rails, and parsimony

The success ASTs, failure codes, expected arrays, full-input spans/actuals, and
the two exact R29 structural round trips are sufficient and non-contradictory.
D-W3-1 requires actual asserted accept/reject denominators per parse door,
exact bank regeneration, born-RED projections, and visible deferred failures.
D-W3-2 distinguishes true round trips from serializer-only parity and places
plural witnesses with the correct consumers. D-W3-3 retains generated
differentials, versioned browser evidence, hostile runtime coverage, and both
W7 benchmark bars without subordinating correctness to speed.

The replay lattice is complete: W0 reopens only for shared lexeme/scanner/type
movement; W1/W2 remain regressions; W4 replays the shared registry, singular
round trips, no-throw serialization, and plural non-collapse; W5 owns list
splitting; W7 owns VALUE/SHEET benches; PB1/PB3/PB6 close the deferred rows.
W4 remains correctly close-held until W2 and W3 are independently accepted.

The implementation prescription is idiomatic and KISS-forward: reuse the
existing parse-that leaves and balanced/top-level scanners; add only local
classifiers and one shared private numeric-domain registry; forbid a second
tokenizer/scanner/unit registry, generic easing hierarchy, timeline god
module, public token, speculative plural field, local math engine, bare parser
recognition regex, and parser `.map()`/`.mapState()`.

## 6. Owner authority and close

Section 8 asks for one exact, reviewable decision covering the ownership
extension, atomic namespace, immediate rows, expected spec/browser
divergences, deferred rows, carrier split, evidence repairs, digests, replays,
conditional W0 reopening, unchanged surface, prototype-only boundary, and
truthful model-route variance. Its exclusions prevent that decision from
silently authorizing exports, `spring()`, trigger grammar, production wiring,
typed math, legacy type widening, plural fields, Phase-B code, or ship.

No repairs are required. Root may proceed to the independent second verdict
and, if both challenges ACCEPT the identical bytes, E-3 gestalt adjudication.
W3 remains **AUTHOR-COMPLETE, E-1 REJECTED, NOT ACCEPTED** until the complete
post-ratification repair and fresh twice-audit route succeeds.
