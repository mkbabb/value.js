# V·π W1 VALUES — E-1 adversarial audit B

Date: 2026-07-21  
Artifact: sealed W1 prototype under `pi/mirror/`  
Method: independent assume-faulty pass; `W1-AUDIT-A.md` was neither read nor
consulted. The implementation was checked against the ratified Phase-A sheet,
LIVE `src/css/grammar.ts`, the emitted LIVE package, CSS Syntax 3, and
Scroll-driven Animations 1.

## Verdict: REJECT

W1 has the right broad shape and stays inside the prototype boundary, but it
cannot close. The green suite misses contract-visible parser defects, its
claimed scalar reject bank contains only 18 actual rejects, and the current
artifact has spec-correct divergences from LIVE that are not in the closed
R1–R12 whitelist. E-1 requires repair and re-audit; E-3 requires an addendum
for newly accepted spec divergences rather than silently treating them as
agreement.

## 1. Total-tranche / gestalt analysis

### What is optimal

- W1 is correctly sequenced immediately after W0: the generic number/unit,
  scalar, list, call, and keyframe-selector shapes are prerequisites for W2,
  W3, W5, and most Phase-B modules.
- The W2 color seam is clean. Named/hex/functional color rows remain RED while
  non-color atoms work, so W1 has not absorbed W2.
- D-1 and D-4 dispatch, `Parser.lazy`, the W0 lexemes, and the sanctioned
  imperative scanners are used. There is no local bare regex, `.map`, or
  `.mapState`, and no production path was touched.
- R8 is enforced recursively for both comma and slash lists, including call
  bodies. `from`/`to`, operator keywords, call flattening, and zero-argument
  call rules retain the intended AST shapes.

### Gestalt finding G-1 — PB tokenizer work is a prerequisite to calling W1 a
stable L4 foundation

W1 exposes exactly why the Phase-B CSS-Syntax tokenizer cannot be a late,
independent feature. The current `ident` leaf rejects valid CSS identifiers
such as `---` and `--1`; comment consumption works only after some lexemes; and
the raw list scanners treat comment-opening `/` as a list slash. These are
foundation semantics used by every downstream grammar. Phase B must re-anchor
or formally adapt W1 after its tokenizer foundation before typed selectors,
conditions, math, substitution, or value matching close. That does not excuse
the Phase-A defects below: W1 still needs a coherent repaired contract now.

### Gestalt finding G-2 — the closed correction ledger has already been crossed

The mirror intentionally accepts several CSS-correct forms that LIVE rejects:

- exponent percentages (`1e2%`, `entry 1e-2%`);
- a quoted call argument whose closing quote follows an even backslash run;
- selected comment-trivia placements;
- non-ASCII identifiers such as `-é`.

CSS Syntax 3 explicitly includes exponent notation in its number algorithm and
consumes comments before each token. The corrected even-backslash behavior was
also identified during W0. These may be desirable corrections, but none is in
R1–R12. Under Harden §4, every unlisted disagreement is a `MIRROR_DEFECT` by
construction. Add the intended behaviors through E-3 (with explicit fixtures),
or restore agreement; the present implicit middle state cannot graduate.

### Gestalt finding G-3 — R4's scope is too broad for named ranges

R4 is correct only for the standalone `<percentage [0,100]>` arm. The current
Scroll-driven Animations grammar is:

```text
from | to | <percentage [0,100]> | <timeline-range-name> <percentage>
```

The named-range percentage is not range-restricted. `entry 101%` and
`entry -1%` therefore must not inherit R4's 0–100 rejection. Both LIVE and the
mirror currently reject them. This is a spec defect in the inherited design,
not evidence that the mirror is correct because it agrees with LIVE. Route the
scope correction through E-3 and carry it into the Phase-B keyframe/timeline
depth work.

Primary specification witnesses:

- CSS number exponents and numeric-token construction:
  <https://www.w3.org/TR/css-syntax-3/#consume-a-number>
- comments consumed before tokenization:
  <https://www.w3.org/TR/css-syntax-3/#consume-comments>
- identifier-start rules (`--` starts an ident sequence):
  <https://www.w3.org/TR/css-syntax-3/#check-if-three-code-points-would-start-an-ident-sequence>
- named timeline range keyframe selectors:
  <https://www.w3.org/TR/scroll-animations-1/#named-range-keyframe-selectors>

## 2. Whole-wave analysis

### Blocking W-1 — the stated scalar reject minimum is not met

`test/w1-values.test.ts:18-21` labels 20 strings as `scalarReject`, but the test
only checks mirror/LIVE equality. It never asserts that either result rejects.
Two rows, `1e` and `--`, are accepted by both parsers:

```text
1e  -> number 1, unit "e"
--  -> keyword "--"
```

The bank therefore has 18 actual rejects, below the required 20. The test name
and author receipt overstate the gate. This is a mechanical close blocker.

### Blocking W-2 — the bank is counted but not adversarially diverse

The 50 value accepts are one repeated shape, `fn-N(Npx, Npx)`, and the 51
selector accepts are sequential bare percentages. The bank omits numeric
overflow/exponent boundaries, multi-hyphen identifiers, named offset failures,
comment placement, quote escape parity, malformed nested calls, and serializer
round trips. ADDENDA-01 requires hostile/fuzz coverage per public door; one
`undefined` call per barrel entry in `door-stubs.test.ts` is not that corpus.
The independent deterministic hostile run executed 5,014 inputs against each
of the four W1 entries (20,056 calls) and observed zero throws, which is good,
but the maintained gate must own equivalent coverage.

### Blocking W-3 — the door-state harness does not prove differential GREEN

`harness/differential.ts:63-68` runs the same acceptance predicate separately
against LIVE and mirror. `mirrorGreen` means only that one mirror witness
returns an acceptable bit/value predicate; it does not compare the mirror
result with LIVE. A wrong AST or wrong diagnostic can still mark the door
GREEN. The detailed W1 tests do perform equality for their narrow corpus, but
the door-state assertion cannot substantiate its name or the receipt's claim
that exactly four differential doors are GREEN.

### Blocking W-4 — the internal selector serializer is untested

`serializeKeyframeSelector` has no test reference. Independent valid probes
matched LIVE on `from`, `to`, bare percentages, and named offsets, but a
high-precision parse/serialize/parse probe changed the numeric value after the
12-decimal canonicalization. That may be an accepted canonical precision
policy because LIVE is identical, but it must be stated and tested. At minimum,
the W1 deliverable needs canonical and parse-round-trip fixtures over both
selector kinds.

### Parsimony / KISS

The 184-line value module and 81-line selector module remain understandable and
reuse the common lexeme/scanner layer. The duplicated eight-line `complete`
adapter and reparsing in `valueFailureExpected` are modest but measurable
future cleanup candidates; do not abstract them until repairs show actual
reuse. More important than shaving those lines is eliminating the current
split-brain trivia handling. One scanner/lexeme policy should serve all four
doors.

## 3. Feature analyses

### `parseCssScalar`

#### Confirmed defect F-1 — valid multi-hyphen identifiers reject

`lexeme.ts:54-57` requires a letter/underscore/non-ASCII code point after the
optional `--` prefix. Consequently `---`, `----`, and `--1` reject. LIVE accepts
all three, and CSS Syntax says a leading `--` starts an ident sequence whose
subsequent ident code points may include hyphens and digits. This is both an
oracle and spec failure.

#### Confirmed defect F-2 — non-finite numeric diagnostics lose LIVE fidelity

`grammar/value.ts:31-33` turns a recognized non-finite number into `null`, and
the public entry reports `expected:["scalar"]`. LIVE recognizes the numeric
form and returns the default `css_syntax` failure with `expected:[]`.

```text
input     mirror expected    LIVE expected
1e309     ["scalar"]          []
-1e309    ["scalar"]          []
```

Harden makes `expected[]` gating. This is a confirmed diagnostic defect, not a
recorded span difference.

#### Clarification C-1 — legacy-invalid units are correctly rejected but need a
ledger decision

LIVE accepts malformed unit strings such as `1%%`, `1%px`, and `1a%b`; the
mirror rejects them because `numUnit` permits one `%` or an alphabetic/hyphen
unit. CSS Syntax supports the mirror on these cases. They are nevertheless
unlisted divergences and must be classified through E-3 before G-2.

### `parseCssValue`

#### Confirmed defect F-3 — comment trivia collides with slash-list recognition

`grammar/value.ts:103-127` performs R8 empty-item and slash splitting before an
atom lexeme can consume comment trivia. `util.ts:88-106` is quote/depth-aware
but not comment-aware. Examples:

```text
foo/*c*/       parseCssScalar: success; parseCssValue: css_syntax
fn(a/*c*/)     css_syntax
/**/foo        css_syntax
a /**/ b       css_syntax
```

The first result also demonstrates an incoherent scalar/value relationship:
a source accepted by `parseCssScalar` is rejected by `parseCssValue`, even
though the latter's atom fallback is the scalar tier. CSS Syntax consumes
comments before tokens, and the tranche hostile set calls for comment trivia
at every seam. The scanner policy must skip comments without weakening R8 or
accepting unterminated trivia.

#### Confirmed defect F-4 — inner diagnostics are collapsed

The null-only recursive grammar discards the inner failure decision and
`valueFailureExpected()` reparses only the outer envelope. This already changes
observable diagnostics for non-finite nested/scalar values and makes future
semantic failures fragile. For the direct `1e309` case, mirror returns
`expected:["scalar"]` while LIVE returns `[]`; `parseCssValues` inherits the
same defect. Span/`actual` differences are recorded-only, but `expected[]` is
not.

#### R8 result

The core R8 behavior is correct: top-level and nested `a,,b`, `a//b`, and the
corresponding call-body forms reject, while ordinary comma/slash/space
precedence and nested functions retain the intended values. The defect is that
the same preflight mistakes comment `/` for a separator.

### `parseCssValues`

The singleton-space-list wrapper and preservation of an existing list match
LIVE. It correctly propagates W1 value failures without throwing. It is not an
independent parser, so F-1–F-4 and the unledgered divergences flow through
unchanged; its counted bank does not independently prove more than the
`parseCssValue` bank.

### `parseKeyframeSelector`

#### Confirmed defect F-5 — named offset range failures emit the wrong
`expected[]`

`rangeInvalid()` checks only a whole-input numeric percentage. When `named()`
rejects an out-of-range offset, the public entry falls through to
`["keyframe selector"]`; LIVE emits `["0%..100%"]`.

```text
input            mirror expected          LIVE expected
entry 101%       ["keyframe selector"]     ["0%..100%"]
entry -1%        ["keyframe selector"]     ["0%..100%"]
contain 100.1%   ["keyframe selector"]     ["0%..100%"]
```

Under the present contract this is a gating diagnostic defect. Under the CSS
spec, those named offsets should be accepted instead (G-3), so root should not
merely patch the message without resolving R4's scope.

#### Confirmed governance defect F-6 — exponent percentages are silently
outside the differential ledger

The mirror accepts `1e2%`, `1e+2%`, `1e-2%`, and equivalent named offsets;
LIVE rejects them as `keyframe selector`. CSS Syntax supports the mirror, but
R1–R12 contains no such correction. These rows must become explicit
expected-divergence fixtures under an addendum before this door can be called
differential GREEN.

#### R4 / shape result

Standalone finite percentages enforce 0–100 and lower to 0–1; `from`/`to` and
the four frozen named kinds produce the correct contract shapes. Dispatch and
case normalization are sound for the current frozen type surface.

### `serializeKeyframeSelector` (internal)

Canonical spellings match LIVE for ordinary valid values: `from`/`0%`,
`to`/`100%`, bare named selectors, and named offsets. It is parsimonious and
does not throw for numeric `NaN`/infinity, though it emits non-CSS strings for
such invalid internal objects. Because it is not a public entry, input
validation is not required here; the missing valid-domain tests and precision
policy are the actionable issues (W-4).

### Color seam

The seam is correctly typed and ordered before identifier fallback. `red` and
`#123` remain intentionally different from LIVE until W2, while non-color call
and scalar rows are not blocked. No W2 implementation leaked into W1.

## 4. Evidence

Mechanical suite on the sealed tree:

```text
$ npm test
Test Files  8 passed (8)
Tests       25 passed (25)

$ npm run check
tsc --noEmit                         # exit 0

$ npm run dts-parity
V·π W0 d.ts parity GREEN: 33 types + 19 runtime exports.
```

Independent probes:

- 5,014 deterministic hostile inputs × 4 public W1 doors = 20,056 calls,
  **0 throws**.
- 60 scalar boundary/identifier/string/operator rows produced 10 mirror/LIVE
  result-or-diagnostic differences; only some are desirable spec corrections,
  and none of those new corrections is ledgered.
- 91 scalar/list/call/comment rows on each value door reproduced the identifier,
  non-finite diagnostic, comment, and unledgered escape-parity classes.
- Valid selector serialization matched LIVE on both selector kinds; a long
  fractional percentage exposed the undocumented 12-decimal precision loss.

## 5. Classification and required adjudication

### Confirmed defects (blocking)

1. Repair valid `--`-started identifier coverage (`---`, `--1`, etc.).
2. Preserve exact `expected[]` for recognized non-finite numeric failures, or
   explicitly amend the diagnostic contract.
3. Make value/list scanners consume comments coherently without weakening R8.
4. Resolve named-offset semantics; under the present oracle contract the
   diagnostic is wrong, while the CSS spec says the offsets are not 0–100
   restricted.
5. Replace the false 20-reject scalar count with at least 20 asserted rejects
   and add a genuinely hostile/diverse maintained bank.
6. Make the door GREEN rail compare complete gated results, not independent
   acceptance predicates.
7. Add valid-domain serializer fixtures and state its precision policy.

### Clarifications requiring E-3, not ad-hoc patches

1. Ledger exponent percentages as a spec correction if retained.
2. Ledger correct even-backslash quote closing and intended comment/non-ASCII
   behavior wherever LIVE disagrees.
3. Ledger rejection of LIVE's malformed `%` unit strings if retained.
4. Narrow R4 to the standalone-percentage arm and carry the named-range ruling
   into Phase B.

### Non-blocking suggestions

- After correctness is restored, measure whether the repeated full-source
  reparses (`complete`, `valueFailureExpected`) matter before abstracting or
  optimizing them.
- Keep W1's color-close condition explicit: this audit covers the authorized
  non-color state only; W2 must still flip and re-prove the color rows.

**Seal:** second independent E-1 pass complete. No code or authority document
was edited; this audit file is the only write. W1 remains **REJECTED** pending
fix, addenda adjudication, and re-audit.
