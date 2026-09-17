# V·π W1 AUDIT-FINDING RESEARCH — value-token corrections and PB1 routing

2026-07-21 · E-3 research seat · design/refinement only · **NO CODE**

Authority: `../HANDOFF.md` E-1–E-5, especially E-3; ratified Phase-A
`../PI.md`; `../ADDENDA-01.md`; proposed, unratified `../ADDENDA-02.md`;
Phase-A `research-architecture.md` and `harden.md`; Phase-B
`research-l4-architecture.md` and `harden-l4.md`; `../waves/W-1.md`; the W1
author receipt and both independent W1 audits.

## 0. Research verdict

Both W1 audits are substantively correct. They found two different classes of
work which must not be conflated:

1. **Existing-authority W1 defects.** Multi-hyphen identifier recognition,
   the single-backslash escaped-newline string case, nested `expected[]`
   propagation, non-finite numeric `expected[]`, the false reject count, the
   non-differential door-state rail, and missing selector-serializer tests are
   repairs to already-ratified W1 behavior. They need no new semantic scope and
   may be repaired as one small W1 correction slice.
2. **New spec corrections.** Uniform comment trivia/token boundaries,
   exponent percentages in keyframe selectors, unrestricted named-range
   offsets, strict numeric-token boundaries, CSS non-ASCII/escaped identifiers,
   and escape-parity behavior cross the closed R1–R12 differential whitelist.
   They require an E-3 addenda (harden → write → twice-challenge → gestalt →
   owner ratification) before their behavior is changed or credited GREEN.

The smallest optimal sequence is therefore **repair the existing contract now,
form the new addenda in parallel, then land only the ratified W1-sized
corrections**. Do not build a second comment-aware splitter. Full trivia,
preprocessing, escapes, and token-boundary ownership remains PB1's job under
`ADDENDA-02`; until owner Gates 1 and 2 authorize PB1, W1 can at most receive a
provisional Phase-A close and must replay after PB1.

The frozen **19 runtime + 33 type** legacy barrel and all signatures remain
unchanged. `parseKeyframeSelector` continues to return the existing
`KeyframeSelector` union; the W2 color seam stays RED and untouched.

## 1. Primary-spec findings

The following rulings are taken from the current official primary documents,
not inferred from LIVE:

- [CSS Syntax 3 §4.3.2](https://www.w3.org/TR/css-syntax-3/#consume-comments)
  consumes comments before token recognition and returns no token. A comment
  is not a slash separator and does not merge the tokens on its two sides;
  `a/**/b` tokenizes as two ident tokens, with a comment interval between them.
  EOF inside a comment is a parse error.
- [CSS Syntax 3 §4.3.9](https://www.w3.org/TR/css-syntax-3/#check-if-three-code-points-would-start-an-ident-sequence)
  says `-` followed by `-` starts an ident sequence. Once started,
  [§4.3.11](https://www.w3.org/TR/css-syntax-3/#consume-an-ident-sequence)
  consumes ident code points, including digits, hyphens, non-ASCII code points,
  and valid escapes. Thus `---`, `--5`, bare non-ASCII identifiers, and escaped
  identifiers are syntax classes, not regex accidents.
- [CSS Syntax 3 §4.3.5](https://www.w3.org/TR/css-syntax-3/#consume-a-string-token)
  consumes a newline following one active reverse solidus as a line
  continuation. A newline not protected by an active reverse solidus produces
  a bad-string token. Backslash parity therefore matters: two consecutive
  reverse solidi consume as an escaped reverse solidus and do **not** protect
  the following newline or quote.
- [CSS Syntax 3 §4.3.12](https://www.w3.org/TR/css-syntax-3/#consume-a-number)
  includes an exponent only when `e`/`E`, an optional sign, and a following
  digit are present. Therefore `1e2` is one number, while `1e` is the number
  `1` followed by an ident-start and becomes a dimension with unit `e`.
- [CSS Syntax 3 §4.3.3](https://www.w3.org/TR/css-syntax-3/#consume-a-numeric-token)
  chooses exactly one numeric token: dimension when the following code points
  start an ident, otherwise percentage when the next code point is `%`,
  otherwise number. Consequently `1%%`, `1%px`, and `1a%b` cannot be one
  scalar numeric token.
- [Scroll-driven Animations 1, Named Timeline Range Keyframe Selectors](https://www.w3.org/TR/scroll-animations-1/#named-range-keyframe-selectors)
  extends the grammar as
  `from | to | <percentage [0,100]> | <timeline-range-name> <percentage>`.
  Only the standalone percentage carries `[0,100]`. The named arm accepts a
  finite percentage outside that interval, and the spec explicitly describes
  attachment points outside the animation's active interval.

These findings preserve R4 for standalone selectors and narrow only its
over-broad application to the named arm.

## 2. Existing W1 authority — confirmed repairs

These rows are defects or proof defects, not new features. They should be fixed
before any W1 re-audit, without waiting for PB1.

| id | confirmed defect | smallest repair and close witness |
|---|---|---|
| **D-W1-1** | `mirror/lexeme.ts` rejects `---`, `--5`, and `--0`, although both LIVE and Syntax 3 accept them. The special `doubleDashScalar` repairs only `--`. | Correct the shared ident leaf's `--` start rule; delete the exact-spelling special case if it becomes redundant. Add leaf, scalar, and value fixtures for `--`, `---`, `--0`, `--5`, and ordinary `--CustomName`. This repair does not attempt escaped identifiers. |
| **D-W1-2** | The quoted leaf rejects a string containing **one** reverse solidus followed by a newline. LIVE accepts it and Syntax 3 defines it as continuation. | Teach the quoted leaf the one-active-backslash LF/CRLF/CR/FF continuation cases while retaining raw Phase-A payload spelling. Add the two-backslash counterexample, but classify that counterexample under R18 before accepting a LIVE divergence. |
| **D-W1-3** | Recursive value failures collapse to `null`; `valueFailureExpected()` then guesses at the outer source. | Replace the null-only internal recursion carrier with the smallest typed success/failure carrier that preserves the first inner `code` and `expected[]`. `outer(fn())`, `outer(sibling-index(1))`, `a, fn()`, and `fn(a, inner())` must retain `function argument` or `zero-argument function`. `start/end/actual` remain recorded-not-gating under Harden §4. |
| **D-W1-4** | Recognized non-finite numeric inputs such as `1e309` reject with mirror `expected:["scalar"]` instead of LIVE `expected:[]`. | Preserve the recognized-numeric failure through the same carrier as D-W1-3. Direct scalar, nested value, and `parseCssValues` fixtures gate exact `expected:[]`. No non-finite value is accepted. |
| **D-W1-5** | The claimed 20 scalar rejects contain two successes: `1e` and `--`. The test asserts count and equality, never rejection. | Replace them with at least two real rejects and assert `ok:false` on every reject row for both mirror and the applicable oracle. Keep `1e` and `--` as positive boundary fixtures. Diversify each owned door rather than repeating one template. |
| **D-W1-6** | The maintained bank does not prove the hardening requirement. | Add deterministic branch-diverse, no-throw inputs per W1 door: malformed nesting, truncation, quotes/escapes, numeric boundaries, named offsets, separators, comments as observational/deferred rows, and non-string runtime values. Counts are a floor, not the assertion. |
| **D-W1-7** | `differentialDoorStates()` compares independent acceptance predicates, not complete gated results. | For W1 doors compare the LIVE/mirror `ok`, value tree on success, and first `code` + `expected[]` on failure, with explicit R-ledger classification. A door is not `mirrorGreen` merely because one witness succeeds. Preserve stub-RED logic for unowned doors. |
| **D-W1-8** | Internal `serializeKeyframeSelector` has no tests and its inherited 12-decimal policy is unstated. | Add canonical examples for both selector kinds and a canonical-idempotence property. State that the inherited `toFixed(12)` policy is canonical/precision-limiting, not lossless identity for arbitrary hand-built floating values. Include `parse(serialize(parse(source)))` over the valid parser domain and exact stable output on a >12-digit fixture. |

Do **not** patch named-offset diagnostics to `expected:["0%..100%"]` and then
immediately remove the range error. R15 below supersedes that LIVE behavior if
ratified. If R15 is rejected, the current wrong named-offset `expected[]` is an
additional ordinary contract repair.

## 3. Proposed R-ledger additions

The addenda harden/write seats should preserve these identifiers and semantics
unless their adversarial review finds a narrower formulation.

### R13 — uniform comments are trivia with token boundaries

**LIVE defect:** comment behavior depends on raw-string location. Examples:
`foo/**/` succeeds as a mirror scalar but fails as a mirror value;
`fn(/*x*/a)` succeeds while `fn(a/**/)` fails; raw slash scans mistake `/*` and
`*/` for slash-list boundaries.

**Ruling:** comments are scanner-owned trivia at every token boundary. Leading
and trailing comments around one legacy atom do not change its AST. Comments
inside a function behave the same way. A comment between two significant
tokens keeps them distinct; the legacy compatibility adapter represents
`a/**/b` like `a b` as a `separator:"space"` list because the frozen AST has no
adjacency separator. Comments inside quoted strings are data. Unterminated
comments reject with `css_syntax`. R8 still rejects actual empty comma/slash
items; comment delimiters never count as `/` separators.

**Owner:** **PB1 primary**, then mandatory W0/W1/W5 re-anchor/replay. Do not add
comment logic to `splitTopLevel`, `splitValueTokens`, or
`emptyTopLevelItem`; `harden-l4` already requires PB1 to replace the destructive
W0 trivia leaf and all parallel raw scanners. Until PB1 is owner-authorized and
accepted, R13 is a classified deferred correction, not implementation license.

### R14 — CSS exponent percentages in keyframe selectors

**LIVE defect:** `parseKeyframeSelector` uses a non-exponent regex and rejects
`1e2%`, `1e+2%`, `1e-2%`, and named equivalents. The mirror's `numUnit` already
recognizes them.

**Ruling:** accept finite exponent percentages under the same arm rules as
their decimal values. Standalone `1e2%` is 100% and GREEN; standalone values
whose evaluated percentage is outside 0..100 still reject under R4. Named
values use R15. Non-finite results remain clean rejection.

**Owner:** **W1 now** after addenda ratification; **PB1 replay** proves the
token; **PB6** inherits it for the expanded timeline-range inventory.

### R15 — named timeline-range offsets are not range-limited

**LIVE + mirror defect:** both reject `entry 150%` and `entry -1%`; LIVE emits
`expected:["0%..100%"]`, while the mirror currently emits the wrong generic
message.

**Ruling:** R4 applies only to the standalone `<percentage [0,100]>` arm.
For each named selector representable by the frozen Phase-A type (`entry`,
`exit`, `cover`, `contain`), accept any **finite** `<percentage>` and store its
ratio without clamping (`150% → 1.5`, `-1% → -0.01`). The existing serializer
then round-trips these values canonically. No type or export signature changes.

**Owner:** **W1 now** after addenda ratification for the frozen four names;
**PB6** owns the exact current `<timeline-range-name>` inventory, maturity, and
the full L4 timeline/keyframe grammar; **PB12a** consumes it in recovered rules.

### R16 — strict percentage/dimension token boundaries

**LIVE defect:** LIVE accepts `1%%`, `1%px`, and `1a%b` as one numeric scalar
with a fabricated unit string.

**Ruling:** no Phase-A scalar may combine multiple Syntax-3 tokens into one
number/unit payload. The legacy complete-value adapter rejects these whole
inputs rather than lying about one scalar. PB1 later exposes their true
lossless component-token sequence; a typed property goal in PB12b decides
whether that sequence matches a property grammar. This ruling is about token
identity, not a claim that every surrounding CSS declaration containing those
tokens is globally invalid.

**Owner:** **W1 now** after addenda ratification (current rejection plus explicit
expected-divergence fixtures); **PB1** owns exact token partition; **PB3** owns
semantic numeric/unit nodes; **PB12b** owns property-goal validity.

### R17 — non-ASCII and escaped identifier completeness

**LIVE defect / current partial mirror behavior:** LIVE rejects unescaped
non-ASCII identifiers. The mirror accepts `-é` and `--é` but rejects bare `é`
because parse-that's ASCII-only `dispatch()` cannot route it. Neither W0 nor W1
implements CSS escapes in identifiers/function names.

**Ruling:** the Phase-A compatibility adapter accepts raw unescaped non-ASCII
identifiers wherever its existing scalar/ident-or-function grammar admits an
identifier, preserving spelling and case. Full escape preprocessing,
code-point decoding, function-name recognition, original/processed spans, and
invalid-escape diagnostics are PB1-owned and may not be approximated with a
second regex grammar.

**Owner:** **W1** may add the narrow unescaped-non-ASCII route only after
addenda ratification; **PB1 primary** for complete identifier and escape
semantics, followed by W1/W2/W5 replay. PB7 inherits the same token owner for
selectors. If the addenda writer cannot specify a uniform Phase-A dispatch
without a second recognition path, defer all of R17 to PB1 and restore current
partial divergences to a clearly provisional, non-GREEN state.

### R18 — active-backslash parity governs strings and balanced scans

**LIVE defect / mirror partial correction:** LIVE's raw scanners treat a quote
as escaped whenever the immediately preceding character is `\`, even after an
even-length run. The W0 balanced scanners correctly count parity, but the
quoted leaf lacks line-continuation handling. LIVE also accepts some
two-backslash-before-newline bad strings which Syntax 3 rejects.

**Ruling:** only an odd active backslash run escapes the following quote; only
one active reverse solidus protects a following newline. Even runs close the
quote or leave the newline unprotected as specified. D-W1-2 supplies the
LIVE-agreeing one-backslash continuation; R18 classifies the resulting
spec-correct LIVE divergences. Preserve raw Phase-A keyword spelling.

**Owner:** **W0/W1 fixture and minimal leaf/scanner consistency now** after
addenda ratification; **PB1 primary** for preprocessing, bad-string tokens,
escapes, interval spans, and every re-anchored grammar. No feature-local scanner.

## 4. Executable witness table

All current-result rows were reproduced with the sealed prototype and the
fresh LIVE `dist/subpaths/css.js`. “Spec” describes the proposed ratified
result; it does not authorize code from this research seat.

| witness | current LIVE | current mirror | classification / required result |
|---|---|---|---|
| scalar `---`, `--5`, `--0` | accept keyword | reject `scalar` | **D-W1-1:** accept now; LIVE + spec agreement |
| scalar containing `"a` + one `\` + LF + `b"` | accept raw keyword | reject | **D-W1-2:** accept now; add two-backslash negative under R18 |
| value `outer(fn())` | reject `function argument` | reject `scalar` | **D-W1-3:** propagate inner `expected[]` |
| value `outer(sibling-index(1))` | reject `zero-argument function` | reject `scalar` | **D-W1-3:** propagate inner `expected[]` |
| scalar/value `1e309` | reject `expected:[]` | reject `expected:["scalar"]` | **D-W1-4:** retain numeric failure fidelity |
| alleged reject `1e` | accept number `1`, unit `e` | same | **D-W1-5:** positive dimension boundary, not a reject |
| alleged reject `--` | accept keyword | same | **D-W1-5:** positive identifier boundary, not a reject |
| scalar `foo/**/` | LIVE rejects; spec one ident + trivia | mirror scalar accepts | **R13/PB1:** scalar and value adapters must agree |
| value `fn(/*x*/a)` / `fn(a/**/)` | LIVE rejects both | mirror accepts first, rejects second | **R13/PB1:** both accept with arg `a` |
| value `a/**/b` | LIVE rejects | mirror rejects | **R13/PB1:** two ident component values; legacy adapter maps to space list |
| selector `1e2%` | reject generic selector | accept percent `1` | **R14:** ledger current spec-correct divergence |
| selector `entry 1e-2%` | reject generic selector | accept named offset `0.0001` | **R14+R15:** ledger and retain |
| selector `entry 150%` | reject `0%..100%` | reject generic selector | **R15:** accept named offset `1.5` |
| selector `entry -1%` | reject `0%..100%` | reject generic selector | **R15:** accept named offset `-0.01` |
| scalar/value `1%%`, `1%px`, `1a%b` | accept fabricated unit | reject | **R16:** keep legacy rejection; PB1 proves multiple tokens |
| scalar/value `-é`, `--é` | reject | accept | **R17:** ledger partial spec-correct divergence |
| scalar/value bare `é` | reject | reject | **R17:** unescaped non-ASCII route missing; full escapes wait PB1 |
| value with two U+005C before an apparent closing quote, then unmatched text | LIVE may accept | parity scanner rejects | **R18:** keep spec rejection and ledger it |

Suggested deterministic probe command from `pi/mirror/`:

```sh
./node_modules/.bin/tsx --eval 'import * as m from "./index.ts"; import * as l from "/Users/mkbabb/Programming/value.js/dist/subpaths/css.js"; for (const s of ["---","--5","1e309","1e2%","entry 150%","entry -1%","1%%","1%px","-é","é","foo/**/","fn(/*x*/a)","fn(a/**/)","outer(fn())"]) console.log(JSON.stringify({s,live:{scalar:l.parseCssScalar(s),value:l.parseCssValue(s),selector:l.parseKeyframeSelector(s)},mirror:{scalar:m.parseCssScalar(s),value:m.parseCssValue(s),selector:m.parseKeyframeSelector(s)}}));'
```

The maintained test corpus should express these as typed tables rather than
depending on this exploratory command.

## 5. Smallest sequencing and wave ownership

1. **E-3 formation now:** this file is research only. A harden seat attacks
   R13–R18, then an addenda writer freezes the accepted rows, fixtures, and
   provisional/replay semantics. The addenda receives two independent
   challenges and root gestalt adjudication before owner ratification.
2. **Existing W1 repair in parallel:** repair D-W1-1 through D-W1-8 only. Do
   not touch comment scanning, named-offset range behavior, non-ASCII scope, or
   new expected-divergence classifications while the addenda is unratified.
3. **After the correction addenda is ratified:** land the W1-sized portions of
   R14, R15, R16, the explicitly permitted literal subset of R17, and R18's
   fixtures. R13 and complete R17/R18 scanning remain PB1-owned. Re-run both
   independent W1 E-1 audits against the expanded bank.
4. **W1 status:** if those audits are GREEN, W1 may close only as the
   pre-PB1/provisional Phase-A artifact already contemplated by
   `ADDENDA-02 §4`. W2 remains its color activation edge; W5 must consume the
   repaired diagnostics but may not invent comment rules.
5. **PB1 later, never implicitly:** proposed `ADDENDA-02` is not ratified and
   its seed/Gate 1 is RED. Only owner Gate 2 can authorize PB1. Once accepted,
   PB1 replaces `skipBlockComments` and all raw splitters as source authority,
   then W0/W1 and every affected accepted Phase-A wave replay their gates and
   two audits. Only that replay can call W1 final on the shared L4 substrate.
6. **Downstream ownership:** PB3 owns numeric semantics, PB6 owns the full
   timeline-range/keyframe inventory, PB7 consumes identifier tokens for
   selectors, PB12a integrates recovered rules, and PB12b decides typed
   property-goal validity. None duplicates PB1 tokenization.

### Explicit hold lines

- No `src/`, `vnext/`, keyframes, parse-that, BBNF, script, or inbox edit.
- No Phase-B feature code and no PB1 prototype before its owner gates.
- No local comment-aware patch to `util.ts`; it would be knowingly deleted by
  PB1 and would still lack preprocessing, interval, and recovery truth.
- No widening or renaming of the frozen 52 exports and no color work in W1.
- No claim that LIVE agreement validates named-range offsets where the primary
  spec says otherwise.

## 6. No-code verdict

**RESEARCH COMPLETE; IMPLEMENTATION NOT AUTHORIZED BY THIS MEMO.** W1 remains
**REJECTED** on its sealed artifact. Its existing-authority repairs are
well-bounded and can be made without waiting for PB1, but R13–R18 must finish
the E-3 harden/write/challenge/ratification chain before any new semantic
behavior is implemented or counted as an expected divergence. Uniform comment,
escape, and token-boundary correctness waits for the one PB1 shared scanner;
the prototype must not pay for a temporary second tokenizer.

— V·π W1 audit-finding research seat, 2026-07-21
