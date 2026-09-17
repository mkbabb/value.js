# V·π W3 E-1 AUDIT B — EASING + TIMELINE

2026-07-21 · independent adversarial pass B · status: **REJECT**

The W3 prototype is a strong transpose of the LIVE implementation, but it is
not acceptable as the spec-proven Phase-A easing/timeline wave. The maintained
gate proves LIVE parity and the authorized R10/R11 divergences; it does not
prove the pinned grammars. Several cases recorded as GREEN accepts are invalid
CSS, several valid CSS forms are recorded as rejects, and the range door
collapses comma-separated animation lists into a single range AST. The last
defect also makes two CSS values with different semantics parse to the same
tree and serialize to the same space-separated spelling.

No production, BBNF, keyframes, dependency, inbox, or prototype code was
edited by this pass. This report is the only artifact written.

## Verdict and defect routing

**REJECT.** W3 must not be an accepted prerequisite for W4/W5 yet.

| id | finding | class | disposition |
|---|---|---|---|
| B-01 | `splitTopLevel()` drops empty fields, so every easing family admits malformed leading/trailing/repeated comma members; `steps()` also ignores excess arity. | common-mode LIVE+mirror spec defect; new Phase-A E-3 row | Form and ratify an addendum, then reject empty members and enforce exact family arity. |
| B-02 | `steps()` validates the JavaScript number value, not the CSS `<integer>` token: `steps(1.0)` and `steps(1e0)` are accepted. | common-mode spec defect; new Phase-A E-3 row, with PB3 replay | Preserve literal token kind for the Phase-A decision; PB3 later supplies the shared typed numeric model. |
| B-03 | `linear()` hard-codes output-before-position and at least two rows. Pinned Easing 2 uses unordered `&&` inside each row and permits one row. | wave specification itself is stale; new Phase-A E-3 row, PB6 replay | Add percent-first rows now if ratified; explicitly adjudicate the one-row pinned-spec/browser disagreement rather than silently retaining `>=2`. |
| B-04 | `parseAnimationRange()` treats a top-level comma as the separator between `start` and `end`. In the pinned property grammar, it separates coordinating-list items. Repeated commas are also collapsed. | Phase-A contract/semantic defect; E-3 plus PB6 | The singular frozen Phase-A door should reject top-level commas; PB6 must own the list-capable current-L4 door. |
| B-05 | The range grammar admits `auto` and arbitrary alphabetic dimensions (`5deg`, `5s`, `5banana`), while rejecting valid exponent lengths and math (`1e2px`, `calc(1px)`). | common-mode spec defect split across E-3 and PB3 | Add the narrow `auto` rejection to Phase A; route dimensional units, exponent tokens, math, and context to PB3, with mandatory W3 replay. |
| B-06 | The single-boundary-first disambiguator gives `normal 0` the wrong AST: `{start:{phase:"normal",offset:"0"}}` rather than start `normal`, end `0`. | common-mode spec/AST defect; new Phase-A E-3 row | Special-case `normal` as the disjoint keyword before named-range parsing; add exact AST fixtures. |
| B-07 | R11 is incomplete for zero spellings: `0e0`, `0E+2`, `-0e100`, and `0.0e-4` are zero and accepted by Chromium, but the mirror deliberately rejects every exponent spelling. | existing R11 defect; PB3 replay | Do not classify every exponent as non-zero. Preserve lexical number value now or bind the correction explicitly to the PB3 token model. |
| B-08 | The maintained bank calls known invalid values accepted and valid exponent lengths rejected; its serializer test checks only the singular `timeline` and `range` fields. | direct W3 gate defect | Reclassify the bank from LIVE polarity to spec-arbitrated polarity and state the partial serializer property honestly. |

There were **no independently found mirror-only gating differences outside
R10/R11** in the generated differential matrix. The rejection is nevertheless
substantive: E-4 makes the pinned spec the arbiter of common-mode defects, and
the current tests positively bless those defects.

## Evidence basis

### Immutable authorities

All sources were freshly fetched at CSSWG commit
`c7573530343759ace8e46438a1fa2c44515b5554`; each raw SHA-256 reproduced the
root-seed manifest:

| authority | SHA-256 |
|---|---|
| [CSS Easing 1](https://raw.githubusercontent.com/w3c/csswg-drafts/c7573530343759ace8e46438a1fa2c44515b5554/css-easing-1/Overview.bs) | `92043cb3319f450dfdbbef32035324ddf66969f9fe0330514f2c2db7ca74f185` |
| [CSS Easing 2](https://raw.githubusercontent.com/w3c/csswg-drafts/c7573530343759ace8e46438a1fa2c44515b5554/css-easing-2/Overview.bs) | `650cdccf65fe523627ce7917c8d1bef1361dac6bf62a82f8f75c89524a521554` |
| [Scroll-driven Animations 1](https://raw.githubusercontent.com/w3c/csswg-drafts/c7573530343759ace8e46438a1fa2c44515b5554/scroll-animations-1/Overview.bs) | `c730c2d6cdae2aeb9d5616b844ce378613a24b4af7e1eeca640adbbaedd683e1` |
| [CSS Values 4](https://raw.githubusercontent.com/w3c/csswg-drafts/c7573530343759ace8e46438a1fa2c44515b5554/css-values-4/Overview.bs) | `7051146f8adf0b8c0e9243dd75dab39f18efe3e0905d86afb8abd43fe58d45bc` |

The relevant pinned productions are:

- `steps( <integer>, <step-position>? )`; Values 4 defines a literal integer as
  digits with an optional sign, not a decimal or exponent spelling.
- `linear( [ <number> && <percentage>{0,2} ]# )`; `&&` makes row order
  independent and `#` has a minimum of one item. The Easing 2 output algorithm
  explicitly handles a one-item point list.
- `scroll( [ <scroller> || <axis> ]? )` and
  `view( [ <axis> || <view-timeline-inset> ]? )`.
- `animation-range: [ <animation-range-start>
  <animation-range-end>? ]#`; the comma belongs to the outer coordinating
  list, not between a single range's start and end.
- Range longhands admit `normal`, `<length-percentage>`, or a named range plus
  optional `<length-percentage>`; unlike view inset, range does not admit
  `auto`.

### Mechanical and generated rails

| rail | result |
|---|---|
| focused W3 Vitest | 1 file, 7 tests, GREEN |
| `npm run check` | GREEN |
| `npm run dts-parity` | GREEN, 33 type + 19 runtime exports |
| `npm audit --omit=dev` | 0 vulnerabilities |
| generated easing differential | 12,001 spellings; 0 LIVE/mirror gating differences |
| generated timeline differential | 2,882 spellings; 324 R10 + 17 R11 differences; 0 other |
| generated range differential | 1,156 spellings; 102 R11 differences; 0 other |
| serializer transpose sample | 17/17 valid structural options exactly equal to LIVE |
| accepted-AST serialize/reparse sample | 8/8 timeline and 8/8 range trees stable, including trees later shown spec-invalid |

The generated matrix varied numeric spellings, all comma cardinalities,
function arities, easing positions, scroll/view argument orders, range phases,
offsets, units, exponents, and math heads. It produced no throws. This is good
evidence that the implementation transposes LIVE faithfully; it is not evidence
that LIVE is a complete CSS grammar.

### Browser/CSSOM witness

Chromium `148.0.7778.96` was queried with both `CSS.supports(property, value)`
and a style declaration's serialized value.

| value | Chromium | LIVE/mirror |
|---|---|---|
| `steps(1.0)`, `steps(1e0)` | reject | accept as count 1 |
| `steps(2,)`, `steps(,2)`, `steps(2,,start)`, `steps(2,start,end)` | reject | accept |
| `cubic-bezier(0,,0,1,1)`, `cubic-bezier(0,0,1,1,)` | reject | accept |
| `linear(0,,1)`, `linear(,0,1)`, `linear(0,1,)` | reject | accept |
| `linear(0% 0, 100% 1)` | accept; serialize `linear(0 0%, 1 100%)` | reject |
| `linear(0)` | reject in this Chromium | reject, while pinned Easing 2 permits it |
| `view(5deg)`, `view(5s)`, `view(5banana)` | reject | accept |
| `view(1e2px)` | accept; serialize `view(100px)` | reject |
| `view(calc(1px))`, `view(min(1px,2px))` | accept | reject |
| `entry,,exit` | reject | accept as one start/end object |
| `animation-range: auto`, `entry auto` | reject | accept |
| `animation-range: 1e2px`, `calc(1px)` | accept | reject |
| `animation-range: 5deg`, `5s`, `5banana` | reject | accept |

Chromium also exposes the `normal 0` AST error through shorthand expansion:
the declared shorthand serializes as `normal 0px`, with
`animation-range-start: normal` and `animation-range-end: 0px`. LIVE and mirror
instead return a single start boundary whose `phase` is `normal` and whose
`offset` is `0`.

The one-row `linear(0)` case is an important three-witness disagreement:
LIVE and Chromium reject, but the immutable Easing 2 grammar and its one-item
output algorithm accept. Per E-4, the spec governs. Because the ratified W3
brief explicitly says `linear >=2 stops`, this is a scope correction requiring
E-3 rather than a silent code patch.

## Altitude 1 — total-tranche / gestalt analysis

### The wave boundary is workable; its proof boundary was not optimal

Bundling easing with timeline/range remains manageable: four exports, 352
implementation lines including serializers, and no W1/W2 dependency. A split
would add ceremony without removing a code dependency because there is almost
none to remove. The problematic original decision was not wave size; it was
declaring the W3 grammar complete from LIVE plus only R10/R11 while the pinned
Easing 2 and Scroll Animations grammars already expose additional semantic
rows.

The implementation followed that brief accurately. The proof bank then
reinforced its blind spot by labeling LIVE acceptance as the expected polarity.
Examples appear directly in the maintained accepts:

- `steps(2,start,end)` at test line 44;
- `linear(0,,1)` at line 48;
- `entry,,exit` at line 96;
- `auto` and `entry auto` at lines 88-90;
- valid exponent length `entry 1e2px` is labeled a reject at line 101.

Those fixtures make the test suite worse than merely incomplete: future fixes
would turn the current gate RED.

### Range lists reveal a frozen-surface mismatch

`AnimationRangeValue` can represent one `{start,end?}` pair, while the property
grammar is a comma-separated list. The current parser maps both of these
sources to the same AST:

```text
entry 10%, exit 90%   # two coordinating-list items
entry 10% exit 90%    # one item with start and end
```

`serializeTimelineOptions()` emits both as `entry 10% exit 90%`, erasing list
cardinality and changing CSS meaning. This cannot be repaired by preserving
LIVE's comma branch. The parsimonious Phase-A decision is for the singular door
to reject a top-level comma; PB6 can expose the correctly list-capable current
L4 shape without changing the frozen 52-export contract.

### Downstream rescope

- **W4 remains close-blocked.** Its `collectTimelineOptions` round-trip rail
  cannot prove semantic stability against a range parser that loses list
  cardinality or mis-parses `normal <offset>`.
- **W5 remains join-blocked** on W3 acceptance because stylesheet collection
  consumes these values.
- **PB1** must replay comments, escapes, non-ASCII dashed identifiers, and
  cross-door token boundaries. W3's deliberate comment rejection and ASCII
  timeline-name restriction are not to be patched locally.
- **PB3** owns dimension vectors, the exact unit inventory, exponents, math
  functions, signed zero, and context. It must replay all W3 numeric seams.
- **PB6** owns current list-valued animation/timeline/range/trigger grammar,
  exact version/maturity, serializers, and the one-row/percent-first Easing 2
  decisions. It must not inherit the singular Phase-A comma collapse.

These findings do not authorize PB1/PB3/PB6 work before their existing owner
gates. They require the Phase-A E-3 formation needed to repair W3 and exact
replay obligations in the later PB waves.

## Altitude 2 — W3 as a wave

### What is discharged

- All four exports are real and reachable through the frozen barrel.
- The four `CssTimingFunction` kinds are exercised.
- Five keywords, step aliases, positive-count and `jump-none >= 2` semantic
  guards, cubic x-coordinate bounds, timeline dispatch, and range split search
  are present.
- R10 is implemented with function-specific `timeline_option_invalid`
  diagnostics.
- The tested non-exponent R11 cases correctly reject non-zero unitless offsets
  and accept ordinary signed zero spellings.
- The maintained bank exceeds 50/20 LIVE-polarity counts per parsing door, and
  the hostile bank demonstrates no throws.
- Type parity, no-freeze, and dependency pinning remain green.

### What is not discharged

1. **Born-GREEN means the wrong thing.** The accept/reject counts are against
   LIVE even where the pinned grammar contradicts LIVE. Removing mislabeled
   cases still leaves ample corpus size, so there is no reason to retain them
   merely to meet the count.
2. **Malformed list and arity coverage is inverted.** The exact hostile forms
   named in this audit are either absent or stored in the accept bank.
3. **R11 is value-incomplete.** `timelineOffset()` rejects any source containing
   `e`/`E` before testing the numeric value. Chromium accepts exponent spellings
   whose value is zero and rejects `1e0`, exactly the value-sensitive behavior
   R11 requires.
4. **Range 2/1 disambiguation is not exact.** The code tries a single boundary
   before split points. That is wrong for `normal <offset>` because `normal` is
   a standalone keyword, not a named range with an offset.
5. **The serializer property is overstated.** Test lines 209-220 only reparse
   `options.timeline` and `options.range`. It does not reparse `timelines`,
   `timelineScope`, or `trigger`; there are no corresponding Phase-A parsers.
   Exact valid-input output parity with LIVE is good, but it is not “every
   public parseable field” or a full `CSSTimelineOptions` round trip.

### KISS / LOC assessment

The W3 files contain 122 easing lines and 230 timeline/serializer lines. They
add no parser-combinator `regex()`, `.map()`, `.mapState()`, freeze, or god
module. The observed `.map()` calls are ordinary array transforms, not parser
staging. D-3/D-5 dispatch is present.

There is one economy concern: `complete()` plus `functionBody()` is duplicated
nearly verbatim between easing and timeline. It is about forty lines of shared
adapter/envelope machinery. This is not independently acceptance-blocking, but
any repair should either make the helper genuinely shared or simplify it; it
should not add a third copy. More importantly, do not grow local unit tables or
math parsing in `timeline.ts`: PB3's one numeric model is the KISS solution.

## Altitude 3 — feature analyses

### `parseTimingFunction`

**Correct:** keyword normalization; step aliases; positive integer *value* and
`jump-none` lower bound; cubic control-point count after non-empty splitting;
x1/x2 range checks; finite numeric guard; linear stop output/positions shape;
whole-source error spans and LIVE-equivalent expected arrays on exercised
failures.

**Blocking:**

- At easing lines 56, 67, and 88, `splitTopLevel()` has already erased empty
  comma members. There is no `emptyTopLevelItem()` check. Minimized accepted
  invalids include `steps(2,)`, `steps(,2)`, `steps(2,,start)`,
  `cubic-bezier(0,,0,1,1)`, and `linear(0,,1)`.
- Easing lines 67-81 never require `args.length <= 2`, so
  `steps(2,start,end)` succeeds and silently drops `end`.
- Easing lines 68 and 78 use numeric value plus `Number.isInteger`; lexical
  `<integer>` distinctions were already discarded. Both `steps(1.0)` and
  `steps(1e0)` become count 1.
- Easing lines 89-99 require output first and `stops.length >= 2`; this rejects
  pinned `&&` forms such as `linear(0% 0, 100% 1)`. The minimum-cardinality
  decision is stale against pinned Easing 2 and requires explicit adjudication.

Once these invalid successes become failures, the expected public shape should
remain `css_syntax`, whole-source span/actual, and family-internal empty
`expected[]`, matching the existing family guard pattern. Exact fixtures must
lock that decision rather than allowing generic outer `expected:["timing
function"]` drift.

### `parseAnimationTimeline`

**Correct:** `auto`/`none`, ASCII frozen-contract dashed names, scroll/view
argument uniqueness and unordered arms, R10 top-level comma examples, ordinary
R11 non-zero unitless rejection, specific expected strings, no throw.

**Deferred rather than locally patched:**

- `asciiName()` rejects CSS escapes and non-ASCII names: PB1 owns the shared CSS
  token boundary and escape model.
- `timelineOffset()` accepts any alphabetic unit and rejects exponents/math:
  PB3 owns typed dimension vectors and math.
- The current `body.includes(",")` R10 implementation rejects every comma,
  including one nested inside a future math function. It is correct for the
  Phase-A grammar that does not admit math; PB3/PB6 must replace it with
  token-aware top-level grammar rather than copying the substring test.

**Existing-row defect:** exponent-valued zero is still zero. Chromium accepted
`view(0e0)`, `view(0E+2)`, `view(-0e100)`, and `view(0.0e-4)`, while rejecting
`view(1e0)`. The blanket exponent rejection at timeline lines 67-69 does not
discharge R11.

### `parseAnimationRange`

**Correct:** known Phase-A range-name recognition; ordinary single-boundary
forms; the successful 2/1 search for unambiguous sequences such as
`entry 10% exit 90%`; `timeline_option_invalid` code and `animation range`
expected string; no throw.

**Blocking:**

- Range lines 163-170 interpret one comma as `start,end`, but the comma is a
  CSS list separator. `entry 10%, exit 90%` must not become the same singular
  AST as `entry 10% exit 90%`.
- `splitTopLevel()` drops empty pieces, so line 164 cannot see that
  `entry,,exit` contained three fields. The current test explicitly accepts it.
- Lines 173-179 prefer `rangeBoundary(tokens)` before trying splits.
  Consequently `normal 0` and `normal 10%` are represented as an impossible
  `normal` named range with an offset. The browser longhands prove the correct
  split.
- `timelineOffset()` admits `auto` here because view inset and range reuse one
  predicate despite different productions. `auto`, `entry auto`, and
  `normal auto` are invalid ranges.
- Arbitrary dimensions are accepted and exponent/math lengths rejected. Those
  semantics must be centralized in PB3, not repaired with another local regex
  or ad-hoc allowlist.

### `serializeTimelineOptions`

**Correct:** for structurally valid simple options, the code is an exact
no-freeze transpose of LIVE; 17 independently sampled objects matched byte for
byte. Precedence of non-empty `timelines` over singular `timeline`, ordering of
public fields, and no-throw fallback are correct.

**Blocking property caveat:** serializer equality cannot repair a lossy parse.
Parsing `entry 10%, exit 90%` and serializing its returned tree yields
`entry 10% exit 90%`, changing a two-item coordinating list into one range.
The current AST-round-trip sample passes precisely because both source forms
were collapsed before serialization. Add a semantic/list-cardinality witness
at W4 and a list-capable property at PB6; do not call the current property exact.

## Required re-audit entry conditions

1. A research -> harden -> addenda-write E-3 packet defines, at minimum:
   easing empty-member/exact-arity behavior; CSS integer token behavior;
   percent-first and one-row `linear()` disposition; range comma/list policy;
   `normal <offset>` disambiguation; range `auto`; and R11 exponent-zero.
2. That addendum receives two independent challenges, root gestalt, and owner
   ratification before semantic code changes.
3. The maintained W3 bank is relabeled to spec-arbitrated polarity. It must
   contain leading, trailing, repeated, and excess comma/arity witnesses for
   every easing family and range.
4. Direct AST fixtures prove `normal 0` and `normal 10%` split into start/end,
   while `entry 10%` remains one named boundary.
5. The singular Phase-A range door rejects top-level commas, or another
   explicitly ratified frozen-contract ruling proves how list cardinality is
   preserved. PB6's list-capable follow-on remains separately gated.
6. PB1/PB3/PB6 replay obligations are recorded without pulling their work into
   an ad-hoc W3 patch.
7. Full W3 test/check/d.ts/audit rails and both independent E-1 passes rerun.

Until then, W3 remains **AUTHOR-COMPLETE, E-1 REJECTED, NOT ACCEPTED**.

model_served: Codex GPT-5 family (exact backend revision not exposed to this seat)
