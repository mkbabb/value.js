# V·π ADDENDA-03 — W1 value-token correction ledger (2026-07-21)

> **PROPOSED · NOT RATIFIED · NO NEW SEMANTIC CODE AUTHORIZED.** This is
> the addenda-writing seat of the W1 audit-finding E-3 triumvirate. It
> transposes `formation/w1-audit-research.md` only as corrected by
> `formation/w1-audit-harden.md`. It is a prototype/refinement authority for
> `pi/mirror/`, never production execution.
>
> Nothing in this sheet authorizes R14–R16, an expected-divergence credit for
> R18, PB1, or any other new semantic code until **two independent adversarial
> challenges of this exact addendum are GREEN, root completes the E-3 gestalt
> adjudication, and the owner explicitly ratifies it**. Repairing this sheet
> semantically after a challenge invalidates both prior challenge verdicts.
>
> Ratification would authorize only the narrow W1 slice in §4. It would not
> ratify `ADDENDA-02`, satisfy either Phase-B owner gate, authorize PB0/PB1,
> close W1, flip the W2 color seam, or execute anything in production.

Authority chain: `HANDOFF.md` E-1–E-5 → ratified Phase-A `PI.md` and
`waves/W-1.md` → owner scope order `ADDENDA-01.md` → proposed Phase-B
`ADDENDA-02.md` → W1 audits A/B →
`formation/w1-audit-research.md` → `formation/w1-audit-harden.md`. On every
conflict, the harden dispositions H-W1-1–H-W1-8 and H-R13–H-R18 govern this
sheet.

## 0. Formation verdict and exact boundary

The two W1 audits found two kinds of work:

1. **D-W1-1–D-W1-8 are repairs under existing ratified W1 authority.** Their
   focused implementation is retained, but it is not an acceptance verdict.
2. **R13–R18 change or classify semantics beyond the closed R1–R12 ledger.**
   They require this full E-3 gate. R14, R15, narrow R16, and only R18's
   immediate parity/divergence slice are W1-sized after ratification. R13,
   R17, and the full tokenizing remainder of R18 are PB1-only.

The smallest correct result is therefore a **provisional pre-PB1 W1
prototype**, not a final L4 foundation. R13 and R17/full-R18 remain executable,
named `DEFERRED_PB1` rows and remain RED for tranche perfection. The W2 color
rows remain independently RED until W2 activates the existing seam.

### Pinned primary evidence for these rulings

The semantic evidence is pinned to the verified CSSWG source tree at commit
`c7573530343759ace8e46438a1fa2c44515b5554`:

| source object | blob / raw-source digest | relevant carriers |
|---|---|---|
| `css-syntax-3/Overview.bs` | git blob `238e068faf59212a4790cffcc27731e8c697c113`; SHA-256 `3f129d17407f9bd027291bcfb8015beb86fc229bf5efe505b49ec2dc30be4390` | preprocessing, comments, ident start/sequence, string token, number, numeric token |
| `scroll-animations-1/Overview.bs` | git blob `5fff74caff11c2e3a8c1e6257d99440af2df4dbb`; SHA-256 `c730c2d6cdae2aeb9d5616b844ce378613a24b4af7e1eeca640adbbaedd683e1` | named timeline-range keyframe-selector grammar |

These object identities make the correction evidence reproducible. They do
not substitute for PB0's unratified occurrence-atomic denominator, and this
sheet does not claim PB0 closure.

## 1. Frozen surface and tranche invariants

This addendum changes no public surface. All of the following remain frozen:

- `mirror/index.ts`: exactly **19 runtime + 33 type = 52 direct exports**;
- all export names, TypeScript signatures, the 37-symbol keyframes seam, and
  the legacy `ParseResult<T>` shape;
- the legacy eight-code `ParseIssue` union;
- the concrete color door's typed seam: W1 does not implement color, and its
  color-bearing scalar/value rows stay RED until W2;
- R4's inclusive 0..100 rule for a **standalone** percentage and R8's rejection
  of actual empty comma/slash list arms;
- W5's legacy fail-fast stylesheet contract and R12 custom-property raw-value
  fallback;
- the prohibition on edits to `src/`, `vnext/`, parse-that, BBNF, keyframes,
  `scripts/dev/dev.sh`, and every `INBOX.md`.

There is one future CSS source scanner: PB1's preprocessing-aware, lossless
scanner. No comment-aware `util.ts`, W1/W2/W5 splitter, Unicode fallback
tokenizer, identifier escape decoder, source pre-strip pass, or second token
cursor may be introduced. `ADDENDA-02` Gate 2 remains the sole possible
authorization for PB1.

## 2. Existing-authority repair ledger D-W1-1–D-W1-8

These rows are frozen as repairs, not new feature scope. The focused repair
receipt is directionally correct, subject to the receipt correction below.

| id | frozen repair | exact close evidence |
|---|---|---|
| **D-W1-1** | Correct the shared W0 `ident` leaf for the CSS/LIVE `--` start; remove any exact-`--` W1 workaround made redundant. This is not escape or Unicode completeness. | `--`, `---`, `----`, `--0`, `--1`, `--5`, and `--My-Token` are asserted accepts at leaf, scalar, and value levels with spelling/case preserved. |
| **D-W1-2** | Accept one active U+005C followed by LF, CRLF, CR, or FF in a quoted string while preserving raw Phase-A payload spelling. This agreement repair is already authorized; divergent even-run classification is R18. | Each of the four line endings accepts after one active U+005C; the same raw newline without protection rejects; two-U+005C cases remain separately classified. |
| **D-W1-3** | Replace null-only recursive failure propagation and the outer-source diagnostic guess with the smallest typed carrier preserving the first inner failure. | `outer(fn())` and `a, fn()` reject `css_syntax` / `expected:["function argument"]`; `outer(sibling-index(1))` rejects with `expected:["zero-argument function"]`; `fn(a, inner())` preserves the inner `function argument`. |
| **D-W1-4** | Recognized non-finite numerics remain rejected and preserve LIVE's empty expected set through scalar, nested value, and values-wrapper paths. | `1e309`, `-1e309`, `outer(1e309)`, `a, 1e309`, and `fn(a, -1e309)` reject `css_syntax` / `expected:[]`; none yields a value. |
| **D-W1-5** | Correct the false reject census. `1e` and `--` are accept boundaries, never reject rows. | Every accept row asserts `ok:true`; every reject row asserts `ok:false`; each owned door has at least 50 actual accepts and 20 actual rejects. |
| **D-W1-6** | Replace template-count proof with maintained branch-diverse deterministic hostile banks. | Per door: non-string runtime values, truncation, delimiters, quotes/escapes, nesting, numeric limits, named offsets, separators, and executable deferred PB1 rows; no throw. Random fuzz is discovery-only. |
| **D-W1-7** | A door-state GREEN compares the complete Phase-A gating projection, never two independent acceptance predicates. | Agreement rows compare `ok` plus structural value on success, or first `code` plus `expected[]` on failure. Every divergence maps to an already-ratified R row. Stub and W2-color doors remain explicitly RED. |
| **D-W1-8** | Prove the internal selector serializer on its accepted domain and state its inherited precision policy. | Both selector kinds cover canonical examples and canonical idempotence; `serialize(parse(serialize(parse(source))))` is stable. Formatting rounds percentage magnitude to 12 decimals, strips insignificant zeros, and is not lossless identity for arbitrary hand-built floats. |

For D-W1-3, `start`, `end`, and `actual` remain recorded-not-gating under the
ratified Phase-A harden policy unless separately escalated. For D-W1-8,
NaN/infinity hand-built selector objects are outside the internal serializer's
valid domain and do not create a public no-throw promise.

### Repair-receipt truth correction

`W1-REPAIR-RECEIPT.md` says four unresolved TODO/RED classes remain. The two
audits and harden pass establish **six**: R13 comments, R14 exponent selector
percentages, R15 named offsets, R16 strict numeric-token boundaries, R17
identifier preprocessing/escapes/non-ASCII completeness, and R18 even-run/full
escape behavior. The four existing TODOs are therefore not a complete ledger
and may not be cited as one. The focused tests' 8 files / 30 passes and four
TODOs are mechanical evidence only; W1 remains rejected.

Because D-W1-1 and D-W1-2 changed shared `mirror/lexeme.ts`, **one W0
structural replay was mandatory and is now ACCEPTED**. The post-W1 replay seal
in `W0-STRUCTURAL-CHECK.md` records 8 test files, 30 passes, 4 deliberately
unresolved TODOs, strict declaration/source parity at 33 types + 19 runtimes,
and no W0 regression. Independent probes covered the `--` identifier start;
one-active-U+005C LF/CRLF/CR/FF continuations; and quote parity after 1, 2, 3,
and 4 consecutive U+005C code points across `quoted`, `balancedUntil`, and all
activated splitters. Freeze independence, trailing-input reserve, fused-leaf
offset/span/one-exec behavior, dependency integrity, and the exact barrel also
remained GREEN. This is the one scaffold replay required by the shared-leaf
repair, not two feature audits. It reopens only if a later repair changes that
shared foundation.

## 3. Correction ledger R13–R18

Every row below is a correction classification. Until owner ratification,
none is a new GREEN divergence. The "required result" column is proposed
authority, not a statement that the current prototype already implements it.

### R13 — `DEFERRED_PB1`: comments preserve token boundaries

Comments produce no token, but their removal does not concatenate the
significant tokens on their two sides. PB1 solely owns preprocessing-aware
comment recognition, trivia intervals, token boundaries, original↔processed
offsets, unterminated-comment recovery/diagnostics, and component-value
assembly.

For the exact projections below, define:

```text
K(x)       = {kind:"scalar", payload:{type:"keyword", value:x}}
List(s,xs) = {kind:"list", separator:s, items:xs}
Call(n,xs) = {kind:"call", name:n, args:xs}
Values(v)  = v when v is already a list; otherwise List("space", [v])
```

The following is the terminal legacy lowering after PB1. It is not conditional
on a later PB0 decision:

| exact source | required `parseCssScalar` | required `parseCssValue` | required `parseCssValues` |
|---|---|---|---|
| `foo/**/`, `/**/foo` | `K("foo")` | `K("foo")` | `List("space",[K("foo")])` |
| `fn(/*x*/a)`, `fn(a/**/)` | reject `css_syntax` / `expected:["scalar"]` | `Call("fn",[K("a")])` | `List("space",[Call("fn",[K("a")])])` |
| `a/**/b` | reject `css_syntax` / `expected:["scalar"]` | **`List("space",[K("a"),K("b")])`** | the same space list |
| `a/**/,b`, `a,/**/b` | reject `css_syntax` / `expected:["scalar"]` | `List("comma",[K("a"),K("b")])` | the same comma list |
| `a/**//b`, `a//**/b` | reject `css_syntax` / `expected:["scalar"]` | `List("slash",[K("a"),K("b")])` | the same slash list |
| `a/**//`, `a//**/` | reject `css_syntax` / `expected:["scalar"]` | reject `css_syntax` / `expected:["scalar"]` under R8 trailing-empty-slash | the same rejection |
| quoted `"/*x*/"` | `K("\"/*x*/\"")` | `K("\"/*x*/\"")` | `List("space",[K("\"/*x*/\"")])` |

Thus a comment returns no token, but it is a terminal component-value boundary
for the frozen adapter: `a/**/b` becomes two keyword scalars in a space list,
never `ab` and never a later discretionary lowering. A comment beside a real
comma or slash does not create another item; an actual trailing slash still
fails R8. Comment spelling inside a quoted string remains byte-for-byte data.

The current unterminated-comment behavior is a distinct, placement-dependent
RED seam and is frozen truthfully here:

| exact source / door | current LIVE | current mirror | required PB1 legacy result |
|---|---|---|---|
| `foo/*` or `foo /*` / scalar | reject `css_syntax` / `expected:["scalar"]` | same rejection | same rejection |
| `foo/*` or `foo /*` / value | **accept `List("slash",[K("foo"),K("*")])`** | same fabricated slash list | reject `css_syntax` / `expected:["scalar"]` |
| `foo/*` or `foo /*` / values | the same fabricated slash list | the same fabricated slash list | reject `css_syntax` / `expected:["scalar"]` |
| `/*foo` / scalar, value, values | reject `css_syntax` / `expected:["scalar"]` | same rejection | same rejection |
| `fn(a/*)` / value | **accept `Call("fn",[List("slash",[K("a"),K("*")])])`** | reject `css_syntax` / `expected:["scalar"]` | reject `css_syntax` / `expected:["scalar"]` |
| `fn(a/*)` / values | `List("space",[Call("fn",[List("slash",[K("a"),K("*")])])])` | reject `css_syntax` / `expected:["scalar"]` | reject `css_syntax` / `expected:["scalar"]` |
| `fn(/*a)` / value, values | reject `css_syntax` / `expected:["scalar"]` | same rejection | same rejection |

After PB1, every unterminated-comment parse-error form above rejects through
the legacy fail-fast adapters with `css_syntax`; the future L4 door follows
its PB0-frozen recovery/diagnostic row and may retain partial evidence without
widening the legacy result.

No R13 behavior may land in W1, W2, W5, `splitTopLevel`,
`splitValueTokens`, or `emptyTopLevelItem`. Its witnesses must execute and be
reported as `DEFERRED_PB1`; a skipped test or TODO is not a discharged row and
earns no provisional W1 GREEN credit.

### R14 — W1 after ratification: finite exponent percentages

An exponent belongs to a CSS number only when `e`/`E`, an optional sign, and a
following digit are present. W1 may reuse the existing W0 numeric leaf; it may
not add a tokenizer.

| witness | current LIVE | required mirror result |
|---|---|---|
| `1e2%`, `1e+2%` | generic selector rejection | `{kind:"percent", value:1}` |
| `1e-2%` | generic selector rejection | `{kind:"percent", value:0.0001}` |
| `entry 1e-2%` | generic selector rejection | `{kind:"named", name:"entry", offset:0.0001}` |
| `1e3%`, `-1e2%` | rejection | `keyframe_selector_invalid`, `expected:["0%..100%"]` under standalone R4 |
| `1e%`, `1e+%`, `1e309%` | rejection | `keyframe_selector_invalid`, `expected:["keyframe selector"]` |

This row changes only `parseKeyframeSelector`. Finite exponent numbers in the
generic scalar/value doors already agree with LIVE. PB1 later re-proves the
token boundary, and PB6 inherits it for its exact pinned timeline-range
inventory.

### R15 — W1 after ratification: R4 is standalone-only

The frozen named-selector arm already represents `entry`, `exit`, `cover`, and
`contain`. For those four names, any finite percentage offset is accepted
without clamping. This does not expand the type or claim the full modern
timeline-range inventory.

| witness | current LIVE / mirror | required result |
|---|---|---|
| `entry 150%` | reject with the LIVE-compatibility range diagnostic | `{kind:"named", name:"entry", offset:1.5}` |
| `entry -1%` | reject with the LIVE-compatibility range diagnostic | `{kind:"named", name:"entry", offset:-0.01}` |
| `exit 200%` | reject | `{kind:"named", name:"exit", offset:2}` |
| `contain -20%` | reject | `{kind:"named", name:"contain", offset:-0.2}` |
| `101%`, `-1%` | reject | standalone R4 remains: `keyframe_selector_invalid`, `expected:["0%..100%"]` |
| `entry`, `entry 0%`, `entry 100%` | accept | existing named shapes remain unchanged |
| `entry 10`, `entry 1px`, `entry 10% extra`, unknown name, or non-finite offset | reject | generic `keyframe_selector_invalid`, `expected:["keyframe selector"]` |

The temporary named `expected:["0%..100%"]` branch is pre-ratification LIVE
compatibility only and must disappear when R15 lands. Serializer gates add
negative, zero, fractional, 100%, and greater-than-100 named offsets under the
inherited twelve-decimal canonical policy. PB6 owns the complete named-range
inventory and maturity; PB12a later consumes its recovered-rule adapter.

### R16 — W1 after ratification: narrow complete-input token boundary

The legacy value adapter may not fabricate one numeric scalar from multiple
CSS tokens. This is a ruling about the three complete-input W1 doors, not the
validity of an enclosing declaration or stylesheet.

| witnesses | current LIVE | current and required mirror result in each legacy door |
|---|---|---|
| `1%%`, `1%px`, `1a%b`, **`1e%`** | accepts one fabricated number/unit scalar, including `{value:1,unit:"e%"}` for `1e%` | `parseCssScalar`, `parseCssValue`, and `parseCssValues` reject `css_syntax` / `expected:["scalar"]` |

The maintained R16 bank is derived from the token rule rather than capped at
those four remembered strings. It contains this exact deterministic set:

```text
B16 = { "1e%" }
    ∪ { N + T
        | N ∈ { "1", ".5", "-1", "1e2", "1e-2" }
        | T ∈ { "%%", "%px", "px%", "a%b" } }
```

For every `N + T` row, LIVE currently fabricates one numeric scalar with
`value:Number(N)` and `unit:T`; `parseCssValues` wraps that scalar in a
singleton space list. For `1e%`, LIVE fabricates value `1`, unit `e%` in the
same way. The mirror currently, and after ratification must continue to,
reject every row in all three complete-input doors with `css_syntax` /
`expected:["scalar"]`. The bank records the minimized roots plus signed,
fractional, complete-exponent, and negative-exponent siblings. Any newly
discovered LIVE disagreement outside this closed generated set is minimized
and returned through E-3; it is not silently credited to R16.

Ratification authorizes the current rejection to be classified and gated as
an expected divergence. PB1 later preserves the true component-token sequence;
PB3 owns semantic numeric/unit nodes; PB12b decides whether such a sequence
matches a property/descriptor goal. W5 may not cite R16 to reject a whole
stylesheet, and R12's raw-keyword fallback for custom-property values remains
intact.

### R17 — `DEFERRED_PB1`: identifier preprocessing, escapes, and non-ASCII completeness

The proposed immediate W1 route is **retracted**. PB1 owns preprocessing
replacement, NUL and surrogate handling, non-ASCII code points, CSS escape
decoding and terminators, escaped identifier/function names, decoded token
values, and original/processed spans.

| witness | current LIVE / mirror | required PB1 result |
|---|---|---|
| `-é`, `--é` | LIVE rejects; mirror partially accepts | valid identifiers with spelling/case and source mapping preserved |
| bare `é` | both reject | valid identifier |
| escaped identifier and escaped function-name forms | incomplete on both legacy paths | tokenize/decode under the single PB1 scanner, then replay consuming grammars |
| NUL, lone-surrogate, and astral-code-point boundaries | not proven | apply the pinned preprocessing/token rules and exact diagnostics/spans |

Current `-<non-ASCII>` and `--<non-ASCII>` acceptance is a partial pre-PB1
seam, not conformance credit. No W1-local Unicode regex, default-dispatch
tokenizer, escape decoder, `fnHead` widening, or source preprocessor may land.
The row remains RED for perfection and is replayed through W0/W1/W2/W5 after
PB1; PB7 consumes the same token owner.

### R18 — split: immediate parity invariant; full escape semantics in PB1

Let `BS(n)` mean exactly `n` consecutive **U+005C REVERSE SOLIDUS** code
points. Define two executable source families by code points, not host-language
escaping:

```text
Q(n)   = U+0066 U+006E U+0028 U+0022 U+0061 (U+005C × n)
         U+0022 U+002C U+0020 U+0062 U+0029
         # rendered: fn("a + BS(n) + ", b)

L(n,E) = U+0022 U+0061 (U+005C × n) E U+0062 U+0022
         where E ∈ { LF U+000A, CRLF U+000D U+000A,
                         CR U+000D, FF U+000C }

RawQ(n) = U+0022 U+0061 (U+005C × n) U+0022
C(n)    = Call("fn",[K(RawQ(n)),K("b")])
```

In particular, `Q(2)` renders as `fn("a\\", b)` and contains **exactly two
U+005C code points before the closing U+0022**. `RawQ(2)` has the JSON/
TypeScript escaped spelling `"\"a\\\\\""`; its semantic value is the four
delimiters/data groups quote, `a`, two U+005C, quote.

The exact required `Q(2)` projections, written without the shorthand, are:

```text
parseCssValue(Q(2)) =
  {kind:"call", name:"fn", args:[
    {kind:"scalar", payload:{type:"keyword", value:RawQ(2)}},
    {kind:"scalar", payload:{type:"keyword", value:"b"}}
  ]}

parseCssValues(Q(2)) =
  {kind:"list", separator:"space", items:[parseCssValue(Q(2))]}
```

Exact quote-parity projections:

| source | current LIVE `parseCssValue` / `parseCssValues` | current mirror | immediate required mirror result |
|---|---|---|---|
| `Q(1)` | reject `css_syntax` / `expected:["scalar"]` in both doors | same rejection | same rejection; odd run keeps the apparent quote escaped |
| `Q(2)` | reject `css_syntax` / `expected:["scalar"]` in both doors | value: **`C(2)`**; values: **`List("space",[C(2)])`** | preserve those exact ASTs as the R18 divergence |
| `Q(3)` | reject `css_syntax` / `expected:["scalar"]` in both doors | same rejection | same rejection; odd run keeps the apparent quote escaped |
| `Q(4)` | reject `css_syntax` / `expected:["scalar"]` in both doors | value: `C(4)`; values: `List("space",[C(4)])` | preserve those exact ASTs as the R18 divergence |

`parseCssScalar(Q(n))` rejects `css_syntax` / `expected:["scalar"]` for every
`n=1..4` in LIVE, the current mirror, and the required artifact because a call
is not a scalar. The value/values rows above are the parity-sensitive doors.

Exact newline projections, applying identically for every listed `E`:

| source | current LIVE | current mirror | immediate required mirror result |
|---|---|---|---|
| `L(1,E)` | scalar/value: `K(L(1,E))`; values: `List("space",[K(L(1,E))])` | same | same raw-spelling success; one active U+005C is D-W1-2 agreement |
| `L(2,E)` | scalar/value: `K(L(2,E))`; values: singleton space list | all three doors reject `css_syntax` / `expected:["scalar"]` | preserve that rejection as the R18 divergence |
| `L(3,E)` | scalar/value: `K(L(3,E))`; values: singleton space list | same | same raw-spelling success; the final active U+005C protects the newline |
| `L(4,E)` | scalar/value: `K(L(4,E))`; values: singleton space list | all three doors reject `css_syntax` / `expected:["scalar"]` | preserve that rejection as the R18 divergence |

`balancedUntil` and every Phase-A top-level splitter share this parity
invariant; their W0 replay bank covers nesting and separators after `BS(1)`
through `BS(4)`, and that replay is now ACCEPTED. PB1 alone owns preprocessing,
escape-code-point/hex decoding, escape terminators, bad-string token production/
recovery, normalized string values, and original/processed spans. No
feature-local scanner is authorized.

## 4. Exact authorization requested from the owner

After this exact addendum receives two GREEN independent challenges and root's
gestalt adjudication, the owner is asked to ratify or reject all of the
following as one explicit decision:

1. D-W1-1–D-W1-8 as the frozen existing-authority repair ledger and the one W0
   structural replay caused by the shared-lexeme edit;
2. R13 and R17 as executable `DEFERRED_PB1` seams, with no present
   implementation or conformance credit;
3. R14 finite exponent selector percentages, R15 unbounded finite offsets for
   exactly the frozen four named kinds, and R16's narrow complete-input legacy
   classification as the only new W1 semantic slice;
4. R18's split: retain the already-authorized parity/one-active-U+005C repair,
   authorize its exact divergence fixtures/classification, and leave complete
   preprocessing/escape/string-token semantics in PB1;
5. the provisional pre-PB1 status, W2/W5 holds and replay obligations, and the
   re-audit sequence in §5.

Ratification authorizes no PB0, PB1, PB3, PB6, PB7, PB12a, or PB12b feature
code; no new export; no expanded named-range inventory; no legacy AST/result/
diagnostic-union widening; no stylesheet recovery; and no production swap.
It is orthogonal to both owner gates in `ADDENDA-02`.

## 5. Sequence, audits, downstream holds, and replay

```text
focused D-W1-1..8 repair seal
  -> one W0 structural replay (ACCEPTED 2026-07-21)
  || ADDENDA-03 write -> 2 independent challenges -> root gestalt
       -> explicit owner ratification
  -> land R14 + R15 + R16 classification/fixtures + immediate R18 fixtures
  -> W1 mechanical gates
  -> 2 fresh independent W1 E-1 audits -> root adjudication
  -> W2 activates and proves W1 color rows
  -> provisional pre-PB1 Phase-A W1 status

ADDENDA-02 Gate 1 -> PB0 reviews -> owner Gate 2 -> PB1
  -> shared-scanner W0/W1/W2/W5 replay under ADDENDA-02
  -> R13 + R17 + full R18 may become GREEN
```

The two post-ratification W1 audits receive the same sealed artifact and
oracles, run independently at total-tranche, wave, and per-feature altitudes,
and report LOC/parsimony, commands, corpus counts, and model receipt. Any
confirmed semantic defect repairs the artifact and restarts both passes. A
shared-lexeme defect also reopens the one W0 structural replay.

Before those audits start, all of these gates must be GREEN:

- this addendum is twice-challenged, gestalt-adjudicated, and owner-ratified;
- all focused and ratified immediate rows are sealed; no author is mutating
  W0/W1 files;
- the W0 structural replay remains GREEN (currently **ACCEPTED**), including
  declarations/parity, lexemes, scanners, freeze independence, trailing-input
  reserve, ident starts, line continuations, and the R18 1–4 parity matrix;
- `npm run check`, the maintained suite, and `npm run dts-parity` are GREEN;
- the barrel still reports 33 types + 19 runtimes;
- each W1 door proves at least 50 asserted actual accepts and 20 asserted actual
  rejects over branch-diverse deterministic hostiles and non-string no-throw
  values;
- agreement compares structural values or exact first `code` + `expected[]`;
  every disagreement maps to R4, R8, or a ratified R13–R18 row;
- R13 and R17/full-R18 run visibly as deferred PB1 rows rather than TODOs or
  skipped tests;
- selector serialization covers both kinds, exponent selectors, and
  negative/>100 named offsets at the twelve-decimal policy;
- review finds no comment-aware splitter, Unicode/escape tokenizer, bare
  feature recognition regex, `.map`, `.mapState`, or second scanner;
- the W2 color seam remains explicitly RED.

### W2 and W5 consequences

- **W2 may continue its independent color authoring**, but it cannot close the
  W1 color overlay until it replays the complete repaired and ratified W1
  scalar/value bank. It must not absorb comment, Unicode, escape, or global
  numeric-token ownership. A pre-PB1 W2 close is provisional and replays after
  PB1.
- **W5 remains held on rejected W1.** After W1 receives its provisional
  non-color adjudication and its other Phase-A dependencies are satisfied, W5
  may consume the repaired diagnostics and immediate rows. It may implement
  already-ratified R5 and R12, but may not add R13 tokenization or promote R16
  into a whole-sheet rejection rule. A pre-PB1 W5 close is provisional and
  replays after PB1.
- PB1 later re-anchors W0 and every exposed accepted or in-progress Phase-A
  wave under the owner-ratified `ADDENDA-02` quiescence/replay rule. This sheet
  neither changes nor pre-authorizes that rule.

Even after both fresh W1 audits are GREEN, root may record only a
**provisional pre-PB1 non-color W1 verdict** until the W2 overlay closes. Even
after W2, tranche perfection cannot call W1 final while R13, R17, and full R18
remain PB1-deferred.

## 6. Cost and owner-visible scope

This correction does not add a feature wave or a public door. Its bounded
increment is:

- the already-performed focused D-W1 repair: one S-grade correction slice;
- the completed, ACCEPTED W0 structural replay: one S-grade scaffold check;
- after ratification, R14/R15 code plus R16/R18 classification and fixtures:
  one S-grade W1 correction slice;
- two addendum challenges plus root gestalt before ratification;
- two fresh full E-1 W1 passes plus root adjudication after the immediate slice.

An S-grade anchor is at most one-half author-seat-day under the Phase-A
formation scale. Review, adjudication, and any repair/re-audit are separate;
the estimate is neither a lifecycle cap nor permission to relax the gates.
R13/R17/full-R18 implementation and all shared-scanner replay costs remain in
the separately owner-gated PB1/Phase-B budget in `ADDENDA-02` and are not
smuggled into this increment.

The owner decision is therefore small but substantive: approve or reject the
six-row semantics and exact provisional sequence above, knowing that approval
adds one bounded immediate W1 correction slice and mandatory review, while
leaving the larger tokenizer work and final tranche closure explicitly RED.

## 7. Close of this proposal

This sheet is complete only as the third E-3 formation artifact. It is not an
implementation receipt, an audit, an owner decision, or a W1 verdict. The next
authorized actions are two independent assume-faulty challenges of this exact
revision and root gestalt adjudication. Until those complete and the owner
ratifies, W1 remains **REJECTED**, R13–R18 remain unratified, and no new
semantic code from this addendum may land.

### Amendment receipt after the first two challenges

This revision closes every finding against the prior challenged digest:

- **A-01:** R13 now freezes a terminal legacy `separator:"space"` lowering for
  `a/**/b` and exact comma/slash/trailing-empty/quoted-comment adjacency rows.
- **A-02:** R16 now includes the exact `1e%` three-door divergence and the
  deterministic derived/minimized `B16` boundary bank.
- **A-03:** R18 now defines `Q(n)`/`L(n,E)` by Unicode code points and freezes
  current and required BS(1)–BS(4) projections, including the exact `Q(2)` call
  AST and `parseCssValues` wrapper.
- **A-04:** the formation receipt below now records the truthful served model.
- **B-1:** R13 now records the actual fabricated slash-list successes for
  `foo/*`, `foo /*`, and LIVE `fn(a/*)`, while retaining mandatory PB1 legacy
  rejection and the PB0-owned L4 recovery result.
- The post-W1 W0 structural replay is recorded as already **ACCEPTED**, with
  ident, line-continuation, and backslash-parity evidence.

These are semantic-evidence amendments, so both prior REJECT challenges remain
historical and do not count. Two fresh independent challenges must attack this
exact amended revision before root gestalt or owner ratification.

---

Formation receipt: W1 audit-correction addenda-writing seat;
`model_served: gpt-5.6-sol` (inherited Codex route); 2026-07-21.
