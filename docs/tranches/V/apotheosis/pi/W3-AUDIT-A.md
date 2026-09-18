# V·π W3 E-1 AUDIT A — EASING + TIMELINE

2026-07-21 · independent adversarial pass A · **REJECT**

This pass assumed the author artifact faulty. It did not read or contact another
W3 auditor, did not edit implementation code, and did not touch production,
`vnext/`, the dev script, an inbox, parse-that, BBNF, or keyframes.

## Verdict

**REJECT.** The LIVE differential and mechanical rails are strong, but the W3
feature gate is not spec-GREEN. There are two immediate, independently
sufficient blockers:

1. `parseAnimationRange` and `serializeTimelineOptions` do not round-trip a
   valid public range shape: `{start:{phase:"normal"},end:{offset:"0"}}`
   serializes to `normal 0`, then parses as
   `{start:{phase:"normal",offset:"0"}}`, deleting the end boundary.
2. Every easing family admits malformed comma lists, and `steps()` additionally
   ignores arbitrary extra arguments. The maintained accept bank asserts two of
   these defects as GREEN.

The adversarial pass also confirmed further LIVE-derived spec debt in the W3
sheet itself: lexical `<integer>` is implemented as numeric integrality;
`linear()` is restricted contrary to the pinned Easing 2 grammar; view/range
offsets conflate `auto`, arbitrary dimensions, exponent spelling, and
`<length-percentage>`; and the timeline/range slice is not on the shared CSS
token rail. Those findings require explicit E-3/PB routing before this wave can
be represented as proven rather than merely LIVE-equivalent.

## Evidence and authorities

- Authority read: `HANDOFF.md`, `PI.md`, `waves/W-3.md`, formation research and
  hardening, the author receipt, current W3 code/tests, LIVE source and built
  oracle.
- Immutable official sources at CSSWG commit
  `c7573530343759ace8e46438a1fa2c44515b5554` were re-fetched and SHA-256
  verified against the 76-root seed:
  [CSS Easing 1](https://raw.githubusercontent.com/w3c/csswg-drafts/c7573530343759ace8e46438a1fa2c44515b5554/css-easing-1/Overview.bs)
  `92043cb3319f450dfdbbef32035324ddf66969f9fe0330514f2c2db7ca74f185`,
  [CSS Easing 2](https://raw.githubusercontent.com/w3c/csswg-drafts/c7573530343759ace8e46438a1fa2c44515b5554/css-easing-2/Overview.bs)
  `650cdccf65fe523627ce7917c8d1bef1361dac6bf62a82f8f75c89524a521554`, and
  [Scroll-driven Animations 1](https://raw.githubusercontent.com/w3c/csswg-drafts/c7573530343759ace8e46438a1fa2c44515b5554/scroll-animations-1/Overview.bs)
  `c730c2d6cdae2aeb9d5616b844ce378613a24b4af7e1eeca640adbbaedd683e1`.
- Chromium third witness: Playwright Chromium **148.0.7778.96**, using both
  `CSS.supports(property, value)` and a style declaration's serialized value.
- Generated differential challenge: 2,922 easing spellings, 24 timeline
  spellings, and 225 range spellings. Mirror and LIVE had zero gating
  differences for easing and range; the sole timeline difference was the
  intended R10 `scroll(root,x)` rejection.

## 1. Total-tranche / gestalt analysis

### G-A1 — W3 is correctly sequenced, but its source-of-truth boundary is not

W3 remains an appropriate W0-only authoring wave and an appropriate hard close
prerequisite for W4. Its four runtime exports are cohesive, and keeping
`spring()` and deep trigger parsing out of Phase A is sound. The failure is not
the wave boundary; it is the claim that a near-verbatim LIVE transpose plus
only R10/R11 is spec-complete.

The pinned authorities already disagree with that claim:

- Easing 2 defines `linear( [ <number> && <percentage>{0,2} ]# )`; `#` permits
  one item, and `&&` permits percentage-before-number ordering. The spec even
  defines the one-control-point output. The W3 sheet instead mandates at least
  two stops and the implementation requires output-first. Chromium has not
  implemented the one-stop case (`linear(0)` is rejected), but it accepts and
  canonicalizes `linear(0% 0, 100% 1)`. Under E-4, the pinned spec arbitrates
  the former disagreement.
- Scroll Animations uses CSS tokenization, `<dashed-ident>`, and
  `<length-percentage>`/math values. The current LIVE anchor uses a broad unit
  regex and non-`s` function regex, so transposing it preserved known
  non-CSS whitespace, escape, unit-class, exponent, and math behavior.
- The pinned scroll source includes the current `scroll` named timeline range,
  while the frozen Phase-A `RangePhase` omits it. This is properly a PB6/L4
  overlay concern, but it proves that accepted W3 can only mean the frozen
  Phase-A slice, not current-timeline completeness.

### G-A2 — Acceptance now would contaminate W4 and W5

W4's `collectTimelineOptions` property lane depends on the exact
serialize→parse behavior that fails for `normal 0`. W5 calls
`parseAnimationRange` over declarations. Closing W3 despite the counterexample
would convert K-9 from a risk into a known downstream defect and would let W4
or W5 certify a lossy AST.

The close overlay should remain `{W2,W3} ⟹ W4`, with W3 considered open until
its correction addendum is ratified, implemented, and twice re-audited.

### G-A3 — Exact E-3 and Phase-B routing

The closed divergence ledger cannot silently absorb new mirror≠LIVE results.
The smallest proper addendum should:

1. **Extend R8 ownership to W3** for top-level comma items inside
   `cubic-bezier()`, `steps()`, and `linear()`, plus repeated-empty commas in
   the public range door. Easing failures should remain `css_syntax` with the
   function-path empty `expected`; range failures should remain
   `timeline_option_invalid`, `expected:["animation range"]`. W5 retains its
   already-specified `animation_option_invalid` declaration-layer path.
2. Add the next free correction row after ADDENDA-03's R18 for exact `steps()`
   arity and literal `<integer>` token form. PB3 must replay the row when math
   integers land.
3. Add a pinned Easing-2 row for one-stop `linear()` and the unordered `&&`
   stop grammar. This changes the defective W3 brief, not just its code.
4. Add a range-disambiguation row: `normal` is a standalone boundary, so
   `normal 0` is start `normal` plus end offset `0`; `normal 0 100%` rejects.
   The same row must decide whether public `parseAnimationRange` consumes one
   shorthand arm or an entire comma-separated coordinating list. The current
   type can represent one arm, not a list; W4/W5 must own list separation.
5. Split view-inset and range-offset adjudication. `auto` is valid for view
   inset but invalid for animation range; arbitrary dimensions such as `s`,
   `deg`, `fr`, or `foo` are not lengths; exponent-spelled zero still satisfies
   R11. PB3 owns the complete unit/math inventory and PB6 owns the required W3
   replay, including calc/min/max and current range names.
6. Keep CSS comments, exact CSS whitespace, escaped/non-ASCII dashed idents,
   and token-aware top-level comma detection on PB1, with a mandatory PB6
   timeline replay. Do not create a second W3 tokenizer.

This is not an ad-hoc W3 patch: research→harden→addendum, two challenges,
gestalt, owner ratification, then implementation and two fresh W3 audits.

## 2. Wave analysis

### What passed

- **Born-RED provenance:** the repaired W0 harness mechanically established all
  19 unique LIVE-positive doors RED before feature authoring. The current door
  state flips exactly W1+W2+W3 and leaves the remaining doors RED.
- **Deliverables:** all four runtime exports are present; D-3 and D-5 dispatch
  are real; four timing kinds are exercised; R10/R11 have explicit banks.
- **Mechanical rails:** `npm test` = 10 files, 45 pass, 4 pre-existing W1 TODO;
  `npm run check` GREEN; `npm run dts-parity` = 33 type + 19 runtime GREEN;
  `npm audit --omit=dev` = 0 vulnerabilities.
- **LIVE differential:** the maintained projection checks success values and
  failure code+expected. The independent 3,171-case product challenge found no
  unexpected LIVE/mirror gating difference.
- **Structural laws:** no freeze; no parser-level `regex()`, `.map()`, or
  `.mapState()`; no new dependency; public entries are no-throw on the hostile
  runtime bank. Array `.map()` sites are ordinary value transforms, not banned
  parser combinators.
- **Parsimony:** 122 easing LOC plus 230 timeline/serializer LOC is larger than
  LIVE but still bounded and legible under the parse-that/no-throw constraints.
  Duplicated Phase-A envelope helpers should wait for PB1 rather than invite a
  premature abstraction.

### What failed

- The born-GREEN bank is LIVE-polarized, not spec-polarized. It deliberately
  counts `steps(2,start,end)`, `linear(0,,1)`, and `entry,,exit` as accepts;
  counts valid `view(1e2px)` and `view(calc(1px))` as rejects; and never probes
  the lossy `normal` range round trip.
- Raw cardinality is real but not sufficient. After removing the misclassified
  fixtures each door still has room above 50/20, so the remedy is to correct
  the fixture taxonomy and add the missing branches, not pad the bank.
- The receipt correctly surfaced malformed easing to E-3 rather than silently
  patching it, but an active known blocker means the author artifact cannot yet
  satisfy the W3 close gate.
- The model receipt identifies only a Codex GPT-5 family seat, not the Opus
  route required by E-5. This report does not misrepresent that route. Root or
  owner must adjudicate the model-route variance before counting this pass as
  one of the required routed E-1 seats.

## 3. Feature analyses

### 3.1 `parseTimingFunction` — REJECT

Keyword dispatch, case folding, `step-start`/`step-end`, cubic x bounds, y
unboundedness, positive step counts, aliases, `jump-none >= 2`, finite numbers,
and output-first linear rows with zero-to-two percentage positions all behave
as intended against LIVE. The defects are:

#### Malformed comma/arity classification

| family | minimized spelling | LIVE/mirror | pinned spec + Chromium | cause |
|---|---|---|---|---|
| cubic leading empty | `cubic-bezier(,0,0,1,1)` | accept as `0,0,1,1` | reject | empty dropped |
| cubic interior empty | `cubic-bezier(0,,0,1,1)` | accept as `0,0,1,1` | reject | empty dropped |
| cubic trailing empty | `cubic-bezier(0,0,1,1,)` | accept | reject | empty dropped |
| cubic real extra | `cubic-bezier(0,0,1,1,2)` | reject | reject | four-value check works |
| steps trailing empty | `steps(2,)` | accept as `steps(2)` | reject | empty dropped |
| steps leading empty | `steps(,2)` | accept as `steps(2)` | reject | argument shifts |
| steps repeated empty | `steps(2,,start)` | accept | reject | empty dropped |
| steps real extra | `steps(2,start,end)` | accept, ignores `end` | reject | no `args.length` check |
| linear leading/interior/trailing | `linear(,0,1)`, `linear(0,,1)`, `linear(0,1,)` | accept as `linear(0,1)` | reject | empty rows dropped |

This is R8 for empty comma members and a separate exact-arity defect for
nonempty third `steps()` arguments. Linear has no maximum stop count; its
per-stop maximum of two percentages is correctly enforced.

#### Step token type

`Number.isInteger` at `grammar/easing.ts:78` accepts `steps(1.0)` and
`steps(1e0)`. CSS `<integer>` literal syntax is an optional sign plus decimal
digits, and Chromium rejects both while accepting `steps(+01)`. Numeric-value
integrality is not lexical integer conformance.

#### Linear grammar

`grammar/easing.ts:89-99` assumes the output number comes first and requires at
least two rows. The pinned grammar's `&&` makes `linear(0% 0,100% 1)` valid;
Chromium accepts and serializes it as `linear(0 0%, 1 100%)`. The pinned `#`
and one-point algorithm make `linear(0)` valid even though both LIVE and this
Chromium build reject it. The spec is the arbiter on that witness divergence.

### 3.2 `parseAnimationTimeline` — REJECT pending routed correction

The frozen ASCII/live subset is well transposed: keyword/name/function
dispatch, axis/scroller order independence, duplicate rejection, at-most-two
view insets, function-specific diagnostics, and no-throw behavior pass. R10's
current direct comma cases reject correctly.

However:

- `timeline.ts:30-31` rejects LF/CR inside `scroll()`/`view()`; CSS treats them
  as whitespace and Chromium accepts `scroll(root\nx)`. It accepts form feed,
  exposing the inconsistency.
- `splitTopLevel(...,"space")` accepts NBSP as whitespace; CSS does not, and
  Chromium rejects `scroll(root x)`.
- comments are rejected rather than token trivia (`scroll(root/**/x)`), and
  `asciiName` rejects valid non-ASCII/escaped dashed idents such as `--é` and
  `--\\61`; Chromium accepts them.
- `timelineOffset` accepts `view(1s)`, `view(1deg)`, `view(1fr)`, and
  `view(1foo)`, all invalid `<length-percentage>` values, but rejects valid
  `view(1e2px)`, `view(0e0)`, and math lengths. Chromium witnesses the opposite
  polarity.
- R10 is implemented as `body.includes(",")`, not a top-level comma decision.
  That is adequate only while nested math is rejected; PB3/PB6 must replay it
  for valid comma-bearing nested functions such as `min()`.

The token/escape items belong to PB1 and the numeric inventory/math items to
PB3+PB6. They must be named replays, not silently inherited as accepted W3
behavior.

### 3.3 `parseAnimationRange` — REJECT

The common entry/exit/cover/contain cases and ordinary 2/1 split examples work,
and R11 rejects ordinary nonzero bare numbers. Four failures remain:

1. **Lossy `normal` ambiguity.** `normal 0` is valid shorthand for start
   `normal`, end offset `0`, but `rangeBoundary()` permits `normal` to consume
   an offset and the early single-boundary return wins. The serializer
   counterexample proves public value loss. `normal 0 100%` is consequently
   accepted by LIVE/mirror though Chromium rejects it.
2. **Wrong `auto` reuse.** `auto` belongs to view inset, not animation range.
   LIVE/mirror accept `auto`, `entry auto`, and `auto auto`; Chromium rejects.
3. **R8 hole and list collapse.** `entry,,exit` (and longer repeated-empty
   variants) collapses to two nonempty pieces and is accepted. Separately,
   `entry,exit` is a valid property coordinating list, but this scalar public
   type collapses it into one `{start,end}` range, losing list multiplicity.
   The addendum must place list splitting at W4/W5 or introduce an L4 list
   overlay; it must not pretend the current scalar AST represents both.
4. **Offset grammar.** Time/angle/flex/unknown units are accepted; exponent and
   calc lengths are rejected; exponent-spelled zero is rejected despite R11.
   This is the same false shared-helper economy as the timeline door.

The current official `scroll` named range is also absent from `RangePhase`.
That type growth belongs to PB6's L4 overlay, not a mutation of the frozen 33
Phase-A type bodies.

### 3.4 `serializeTimelineOptions` — REJECT

For the 13 authored well-formed cases the output exactly matches LIVE, the
function is no-throw, and the timeline/range spellings are compact. Scope and
trigger serialization are plausible verbatim transposes.

The claimed property lane is nevertheless false because the case set omits the
minimum ambiguous valid shape:

```text
input:      { range: { start: { phase: "normal" }, end: { offset: "0" } } }
serialized: { "animation-range": "normal 0" }
parsed:     { start: { phase: "normal", offset: "0" } }
```

The end boundary disappears. Add this and the corresponding percentage case to
the property lane, then require structural round-trip after the range grammar
is corrected. W4's K-9 round-trip rail remains blocked until this is GREEN.

## Required re-entry gate

W3 may re-enter implementation audit only after:

1. the correction addendum above is formed, twice challenged, gestalt-approved,
   and owner-ratified;
2. the repaired bank marks malformed commas/extra arity and invalid unit classes
   RED, adds integer-token and `normal` round-trip fixtures, and records the
   pinned-spec/Chromium `linear(0)` disagreement explicitly;
3. full tests, strict check, d.ts parity, audit, independent generated
   differential, and Chromium witnesses are GREEN; and
4. both independent W3 implementation audits rerun over the repaired artifact.

**Final verdict: REJECT.**

model_served: Codex GPT-5 family (the exact backend revision is not exposed to
this seat; this is not represented as an Opus receipt)
