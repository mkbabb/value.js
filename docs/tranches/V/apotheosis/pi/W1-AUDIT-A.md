# V·π W1 AUDIT A — independent adversarial pass

2026-07-21 · target: sealed `W1-AUTHOR-RECEIPT.md` artifact · posture:
assume faulty, prove otherwise · code edits: none

## Verdict

**REJECT.** The basic value shapes, precedence, W2 color seam, R8 rejection,
standalone R4 range check, and no-throw wrapper are sound, but W1 does not meet
its born-GREEN gate. There are confirmed mirror defects in identifiers,
diagnostic propagation, and named-selector diagnostics; the scalar reject bank
contains only 18 actual rejects despite claiming 20; and the current CSS-Syntax
trivia/numeric behavior creates new, unratified live divergences. One of the
formation's R4 assumptions is also narrower than the current CSS grammar.

## 1. Total-tranche / gestalt analysis

W1's position immediately after W0 and before W5 is structurally sensible. The
three value entries share one recursive tree, keyframe selectors reuse the same
numeric/identifier leaves, and keeping color behind the W2 seam avoids a second
color implementation. The W2 activation edge remains the right boundary.

The implementation nevertheless exposes a formation-level sequencing problem:
W0's lexemes destructively consume comments, while W1's list scanners inspect
the untouched source and know nothing about comments. Consequently trivia
behavior depends on where a comment happens to occur. For example,
`parseCssScalar("a/**/")` succeeds, `parseCssValue("a/**/")` fails because the
slash-empty-item scan mistakes the comment delimiters for list separators,
`fn(/*x*/a)` succeeds because `fnHead` consumes the comment, and `fn(a/**/)`
fails because the body scanner sees it. CSS Syntax consumes comments as trivia
wherever encountered, not only after a convenient lexeme ([CSS Syntax 3,
consume comments](https://www.w3.org/TR/css-syntax-3/#consume-comments)). This
is not a local edge case: W5 will consume W1 for every declaration, and the
Phase-B tokenizer/PB1 work will otherwise have to replace assumptions embedded
throughout this grammar.

The optimal refinement is therefore:

1. Repair the contract defects below before W1 can close.
2. Route newly discovered spec-vs-LIVE decisions through E-3, not an ad-hoc W1
   patch. The closed R1–R12 whitelist currently has no rows for comment trivia,
   CSS scientific-notation percentages, strict percentage/dimension token
   boundaries, or string line continuation.
3. Make the future PB1/tokenizer wave own a uniform, source-preserving trivia
   and token-boundary contract, with W1 migration vectors. It must also preserve
   nested failure information; the current null-only recursive carrier loses
   the exact failing subexpression.
4. Refine R4's wording. The current Scroll-driven Animations grammar constrains
   a standalone selector to `<percentage [0,100]>`, but spells a named selector
   `<timeline-range-name> <percentage>` without that range restriction and
   explicitly discusses attachment points outside the active interval
   ([named timeline range keyframe selectors](https://www.w3.org/TR/scroll-animations-1/#named-timeline-range-keyframe-selectors)).
   `entry 150%` is therefore not covered by the formation's blanket 0..100
   claim. The frozen four-name Phase-A type can remain a compatibility slice,
   while the additional modern range names belong to Phase B; the percentage
   semantics of the existing named arm need an explicit ruling now.

Until this is adjudicated, W5 must not treat W1 as a closed dependency. W2 may
continue independently, but its activation tests should include the repaired
W1 diagnostic/trivia vectors so color does not conceal value-parser defects.

## 2. Wave analysis

### Gate and ledger

- The four owned public exports are present and the other 15 runtime doors stay
  stub-RED. The W2 color seam is visibly RED (`red` is still a keyword and hex
  still fails), as intended.
- R8 works on the probed internal empty arms: `a,,b`, `a//b`, and nested
  `outer(a,,b)` reject. Comma > slash > space and nested-call shapes agree with
  LIVE on the supplied positive probes.
- Standalone percentages enforce R4's 0..100 interval, and `from`/`to` lower to
  0/1. The named offset branch does not preserve LIVE's required
  `expected:["0%..100%"]` diagnostic when it rejects an out-of-range value.
- The receipt is materially inaccurate about the scalar gate. Its 20-row
  `scalarReject` array contains two LIVE-and-mirror successes: `1e` is parsed as
  number 1 with unit `e`, and `--` is parsed as a keyword. Independent count:
  **20 rows, 18 rejects, 2 accepts**. The test asserts only array length and
  equality, never `ok:false`. The per-door minimum is not met.
- `serializeKeyframeSelector` is delivered but has no authored test or
  parse/serialize property row. Normal sampled shapes serialize canonically,
  but a spec-valid `{kind:"named", name:"entry", offset:1.5}` emits
  `entry 150%` which the current parser rejects.
- The author supplied a model receipt, but it records
  `gpt-5.6-terra/high`, not the literal Opus route required by E-5. Root must
  either record the available-model equivalence/waiver or reroute; this is a
  governance discrepancy, not the basis of the code rejection.

### Parsimony and architecture

The W1 feature code is 265 LOC (`value.ts` 184 + selector 81), versus roughly
120 LOC for the corresponding LIVE block, plus a 27-LOC W0 scanner extension.
Some growth is justified by parse-that composition and no-throw guards, but the
`complete(parse)` adapter converts recursive outcomes to `T | null` and then
`valueFailureExpected()` re-guesses the diagnostic at the outermost source.
That extra mechanism is both larger and incorrect. A small internal result
carrier that propagates the first typed failure, or direct combinator failure
adjudication at the failing call/list item, would be simpler in behavior even
if similar in LOC. No bare `regex()`, `.map`, `.mapState`, `.skip`, or
feature-local tokenizer was found; `dispatch()` and `Parser.lazy` are present
as required.

### Fixture quality

The mechanical test command is green, but the bank is not adversarial enough
to prove the gate:

- 45 of 53 scalar accepts are the same number+unit template; its alleged reject
  bank has only 18 rejects.
- All 50 value accepts are one `fn-N(number, number)` shape and all 20 rejects
  are one empty-call shape. Nested failure propagation, malformed lists,
  quotes, comments, unit boundaries, and non-string hostiles are absent.
- All 51 selector accepts are ordinary percentages and all 20 rejects are
  standalone high percentages. Named out-of-range offsets, scientific notation,
  comment positions, malformed named offsets, and serializer round-trips are
  absent.
- The only hostile public-entry assertion calls every door with `undefined`.
  It establishes a useful smoke check, not the per-door hostile/mutation corpus
  required by `ADDENDA-01 §2`.

## 3. Feature analyses

### `parseCssScalar`

Confirmed mirror defects:

- `---`, `--5`, and `--0` succeed in LIVE as keyword scalars but fail in the
  mirror. They are also CSS identifiers: an ident token may begin with `--`,
  after which digits and hyphens are name code points ([CSS Syntax 3 token
  diagrams](https://www.w3.org/TR/css-syntax-3/#token-diagrams)). The W0
  `ident` leaf incorrectly requires a name-start character after `--`; W1's
  `doubleDashScalar` only patches the exact `--` spelling.
- A quoted string containing an escaped newline (`"a\\\nb"`) succeeds in LIVE
  and is permitted by the CSS string-token algorithm as a line continuation,
  but W1 rejects it because the quoted leaf's `\\.` arm does not span newline
  ([consume a string token](https://www.w3.org/TR/css-syntax-3/#consume-string-token)).

Unratified divergences also exist. The mirror correctly rejects LIVE's
single-scalar `1%%` and `1%px` (CSS tokenization yields a percentage followed by
another token), while it accepts trailing comments that LIVE rejects. Those
may be desirable spec corrections, but G-2's closed whitelist makes them
`MIRROR_DEFECT` until an addenda names and tests them. Comment acceptance is
currently not even consistent with `parseCssValue`, as described above.

### `parseCssValue` / `parseCssValues`

The ASTs for ordinary scalar/list/call inputs, separator precedence, allowed
zero-argument calls, and `parseCssValues` singleton wrapping agree with LIVE on
independent positive probes. R8's internal empty-item rejection is implemented.

The recursive failure path is incorrect. `parseValue()` collapses every inner
failure to `null`, and `valueFailureExpected()` inspects only the outer source.
The harden gate requires exact diagnostic code and `expected[]`; these probes
fail it:

| source | LIVE first diagnostic | mirror first diagnostic |
|---|---|---|
| `outer(fn())` | `css_syntax`, `function argument`, actual `fn()` | `css_syntax`, `scalar`, actual whole source |
| `outer(sibling-index(1))` | `css_syntax`, `zero-argument function`, actual inner call | `css_syntax`, `scalar`, actual whole source |
| `a, fn()` | `css_syntax`, `function argument`, actual `fn()` | `css_syntax`, `scalar`, actual whole source |
| `fn(a, inner())` | `css_syntax`, `function argument`, actual `inner()` | `css_syntax`, `scalar`, actual whole source |

The span/actual difference is recorded-only under H §4, but the `expected[]`
difference is gating. `parseCssValues` inherits the same defect.

Trivia handling is also structurally incomplete. `fn(/*x*/a)` happens to
succeed because the comment follows `fnHead`; `fn(a/**/)`, `a/**/b`, and even
`parseCssValue("a/**/")` fail because `emptyTopLevelItem(..., "/")` treats
comment delimiters as slash-list separators. This is incompatible with the CSS
tokenizer and with W1's own scalar door.

### `parseKeyframeSelector` / serializer

Confirmed contract defect: `entry 101%`, `entry -1%`, `exit 200%`, and
`contain -20%` get LIVE's `keyframe_selector_invalid` code but the wrong
`expected[]`: mirror emits `keyframe selector`, LIVE emits `0%..100%`. Even if
root retains LIVE's named-range restriction for Phase A, diagnostic fidelity
requires the range diagnostic.

Two spec findings require formal adjudication rather than silent differential
growth:

- CSS numbers admit scientific notation ([CSS Syntax 3, consume a
  number](https://www.w3.org/TR/css-syntax-3/#consume-number)). The mirror
  therefore accepts `1e2%` and `entry 1e2%` while LIVE rejects them. That is
  spec-supported, but it is not in R1–R12.
- The current named-range grammar does not constrain its percentage to 0..100
  and explicitly permits attachment points outside the active interval. The
  mirror rejects `entry 150%`, so its parser cannot round-trip a serializer
  output that its public AST type can represent. R4 should remain on the
  standalone percentage arm only.

The existing serializer itself matches LIVE's canonical formatting on 0%,
100%, fractional percent, and ordinary named offsets. It needs a property bank,
especially for negative/>100 named offsets once the spec ruling lands.

## Independent evidence

Executed from `pi/mirror/`:

- `npm test -- --reporter=verbose` → 8 files / 25 tests green, but the false
  reject-count assertion above remains.
- `npm run check` → green.
- `npm run dts-parity` → green, 33 type + 19 runtime exports.
- `npm audit --omit=dev` → 0 vulnerabilities.
- Independent executable-oracle probes produced the identifier, nested
  diagnostic, comment-placement, exponent, and named-offset results recorded
  above.

## Required close conditions

1. Fix `--`-prefixed identifier recognition and escaped-newline strings, then
   add exact LIVE/spec probes.
2. Preserve inner list/call failure `expected[]` instead of reconstructing it at
   the outer source.
3. Correct named-offset diagnostics if retaining the Phase-A LIVE restriction.
4. Replace count-only banks with genuinely 50-accept/20-reject, branch-diverse
   assertions per owned door; add hostile/no-throw mutations and serializer
   round-trips.
5. Adjudicate the new CSS-Syntax divergences and named-range percentage ruling
   through E-3; feed the resulting trivia/token contract into PB1 and W5.
6. Re-run both independent E-1 audits after repair. W1 is not ACCEPTED until
   both close green and root adjudicates the gestalt findings.

**Final: REJECT.**
