# V·π W1 AUDIT-FINDING HARDEN — correction ledger and gate boundary

2026-07-21 · E-3 harden seat · design/refinement only · **NO CODE**

Authority: `../HANDOFF.md` E-1–E-5, especially E-3; ratified Phase-A
`../PI.md` and `../waves/W-1.md`; `../ADDENDA-01.md`; proposed, unratified
`../ADDENDA-02.md`; Phase-A formation `research-architecture.md` and
`harden.md`; both independent W1 audits; and `w1-audit-research.md`.

Target: the proposed R13–R18 correction set and its sequencing. The current
`pi/mirror/` W1 repair was inspected only to establish feasibility. This seat
did not edit it.

## 0. Harden verdict

**CONDITIONAL ACCEPT of the research, with mandatory corrections. W1 remains
REJECTED.** The two audits correctly separated already-authorized defects from
new semantics, and the focused repair is a viable KISS repair of the former.
The proposed ledger needs these dispositions:

1. **R13 ACCEPT-DEFER:** comments and token boundaries are PB1-only. No W1 or
   W5 comment-aware splitter is permitted.
2. **R14 ACCEPT:** exponent percentages are a W1-sized selector correction
   after the correction addendum is ratified; PB1 and PB6 later replay it.
3. **R15 ACCEPT:** R4 applies only to standalone percentages. The frozen four
   named kinds accept any finite percentage after ratification; PB6 owns the
   full named-range inventory.
4. **R16 ACCEPT-NARROW:** strict numeric-token boundaries govern the three
   legacy W1 value doors. They do not declare an entire CSS declaration
   invalid; PB1/PB12b own component-token and property-goal meaning.
5. **R17 RETRACT from immediate W1:** complete non-ASCII/escaped identifier
   behavior is inseparable from PB1 preprocessing and tokenization. The current
   partial behavior is a named PB1-deferred seam, not implementation credit.
6. **R18 ACCEPT-SPLIT:** active-backslash parity and the already-authorized
   single-backslash line-continuation repair are immediate W0/W1 invariants;
   escape decoding, preprocessing, bad-string tokens, and spans remain PB1.

The correction addendum must freeze those exact boundaries, survive two
independent challenges and root gestalt adjudication, and be owner-ratified
before R14–R16 or the divergent slice of R18 can be credited GREEN. It does not
authorize PB1. PB1 remains behind the two owner gates in `ADDENDA-02`.

## 1. Disposition of the focused existing-authority repair

The in-progress repair is feasible without a feature-local tokenizer. Its
current mechanical suite is GREEN (8 files; 30 passed; 4 TODO), but that is not
an acceptance verdict. The eight audit defects have these harden dispositions:

### H-W1-1 — shared `--` identifier repair: ACCEPT

Correcting the W0 `ident` leaf so `--`, `---`, `--0`, `--5`, and ordinary
dashed custom identifiers agree with LIVE and CSS Syntax is an existing W1
contract repair. The exact-spelling W1 workaround is no longer needed. This
does **not** authorize CSS escapes or claim complete Unicode preprocessing;
those are R17/PB1.

### H-W1-2 — active-backslash line continuation: ACCEPT with boundary

One active U+005C followed by LF, CRLF, CR, or FF is already-authorized because
LIVE and the CSS string-token algorithm agree. Retaining the raw Phase-A
keyword spelling is contract-compatible. The two-U+005C counterexamples are
new LIVE divergences and require R18 ratification before they become GREEN.

### H-W1-3 — nested failure carrier: ACCEPT

Using `ParseResult<CssValue>` as the internal recursive outcome is the smallest
repair. It preserves the first nested semantic failure and removes the
outer-source `valueFailureExpected()` guess. This is not a new public result
shape or a Phase-B partial-success carrier.

For every expected-agreement failure, W1 gates exact `ok`, first diagnostic
`code`, and `expected[]`. `start`, `end`, and `actual` remain recorded rather
than gating under Phase-A Harden §4 unless an independently observed non-trivial
LIVE callsite escalates them. A maintained test may compare `actual` more
strictly, but the authority must not silently redefine the gate around it.

### H-W1-4 — non-finite numeric failure: ACCEPT

A recognized `1e309`/`-1e309` must remain rejected and carry LIVE-compatible
`css_syntax` with `expected:[]` directly, inside calls/lists, and through
`parseCssValues`. It is not an exponent rejection: finite exponent numbers are
ordinary CSS numbers.

### H-W1-5 — true accept/reject counts: ACCEPT

`1e` and `--` are positive boundary fixtures, never reject rows. Every reject
bank row must assert `ok:false`; every accept row must assert `ok:true`; both
must meet the per-door floor with branch-diverse cases. An array length plus
oracle equality is not a proof of either count.

### H-W1-6 — hostile/no-throw bank: ACCEPT with exact scope

Deterministic non-string, truncation, delimiter, quote, nesting, numeric, and
selector mutations belong in each W1 door's maintained bank. Random fuzz may
discover inputs but does not gate close. Comment, Unicode/escape, and PB1 token
rows must be present as explicitly deferred executable ledger entries; a
non-executed TODO is not proof that the boundary was preserved.

### H-W1-7 — differential door state: ACCEPT

A W1 door is GREEN only when a deterministic corpus compares the full Phase-A
gating projection: `ok` plus structural value on success, or first `code` plus
`expected[]` on failure, with each divergence mapped to a ratified R row. A
single acceptance predicate is only a smoke witness. The repaired harness's
projected equality is suitable for the small door-state census; the maintained
bank, not that census, proves the door.

### H-W1-8 — selector serializer proof: ACCEPT with domain limit

The inherited twelve-decimal formatter is a canonical, precision-limiting
policy, not lossless identity for arbitrary hand-built floating values. Test
both selector kinds for canonical stability and
`serialize(parse(serialize(parse(source))))` stability over the accepted parser
domain. After R15, negative and greater-than-100 named offsets join that domain.
NaN/infinity hand-built objects are outside this internal serializer's valid
domain and must not be used to imply a public no-throw contract.

### Repair receipt correction

The current repair receipt names four unresolved TODO classes, but the audits
found **six** E-3 classes. R17 (non-ASCII/escaped identifiers) and R18
(even-backslash divergences) must be explicit alongside comments, exponent
selectors, named offsets, and strict numeric-token boundaries. The existing
four TODOs therefore cannot be treated as the complete correction ledger.

Because the repair changes the shared W0 `lexeme.ts`, W0's one structural check
must replay after the repair seal and before W1's two re-audits. This is a
structural replay, not two contrived W0 feature audits.

## 2. Numbered R13–R18 dispositions

Primary arbiters are [CSS Syntax 3](https://www.w3.org/TR/css-syntax-3/) and
[Scroll-driven Animations 1](https://www.w3.org/TR/scroll-animations-1/#named-range-keyframe-selectors).
The addendum writer must pin the exact source object/version used; these links
alone are not a PB0 occurrence denominator.

### H-R13 — ACCEPT-DEFER: comments are scanner-owned trivia and preserve a token boundary

The proposed semantic direction is correct, but “comments are whitespace” is
too loose. CSS comments return no token. Their removal does not concatenate the
significant tokens on either side: `a/**/b` yields two ident tokens, not one
`ab` token. For the frozen Phase-A value AST, the PB1 compatibility adapter may
represent that two-component sequence as a `separator:"space"` list only when
that mapping is lossless with respect to the legacy semantic contract.

Corrected mandatory terms:

1. PB1 is the sole owner of preprocessing-aware comment recognition, token
   boundaries, trivia intervals, original↔processed offsets, unterminated
   comment diagnostics/recovery, and component-value assembly.
2. Leading/trailing comments around one representable Phase-A atom do not
   change its semantic AST. Comments between representable atoms preserve two
   component values. Comments inside strings are data.
3. An unterminated comment makes the legacy fail-fast value/sheet adapter
   reject with its existing Phase-A code. The L4 door follows the PB0-frozen
   recovery/diagnostic row and may retain partial evidence; that does not widen
   the legacy `ParseResult`.
4. R8 still rejects actual empty comma/slash items. Neither `/*` nor `*/` is a
   slash-list separator.
5. No patch may add comment handling to `splitTopLevel`, `splitValueTokens`,
   `emptyTopLevelItem`, W1, W2, or W5. No second token cursor or pre-strip pass
   may be introduced.

R13 can be ratified now as **DEFERRED_PB1**, but it is not an implemented
expected divergence and earns no W1 GREEN credit. Until PB1 is authorized and
accepted, maintained witnesses for `foo/**/`, `/**/foo`, `fn(/*x*/a)`,
`fn(a/**/)`, `a/**/b`, comments adjacent to comma/slash, string-contained
comment spelling, and unterminated comments remain a named provisional seam.

### H-R14 — ACCEPT: finite exponent percentages in keyframe selectors

CSS number syntax includes an exponent only when `e`/`E`, an optional sign,
and at least one following digit are present. The W0 numeric leaf already
implements that boundary, so this correction needs no tokenizer clone.

Corrected mandatory terms:

1. `1e2%` and `1e+2%` are standalone 100% and produce
   `{kind:"percent", value:1}`.
2. `1e-2%` is 0.01% and produces value `0.0001`. The same conversion applies
   to a named offset under R15.
3. R4 still rejects a finite standalone exponent percentage whose evaluated
   percentage is outside 0..100, with
   `keyframe_selector_invalid` / `expected:["0%..100%"]`.
4. Incomplete exponent spellings (`1e%`, `1e+%`) and non-finite evaluated
   values reject generically with
   `keyframe_selector_invalid` / `expected:["keyframe selector"]`.
5. This is a selector correction only. LIVE already accepts finite exponent
   numbers in the generic scalar/value doors; those remain agreement rows.

Owner sequence: W1 after correction-addendum ratification; PB1 replay proves
the token boundary; PB6 inherits the behavior for its exact, pinned current
timeline-range inventory.

### H-R15 — ACCEPT: R4 is standalone-only; frozen named offsets are unbounded finite percentages

The grammar distinguishes `<percentage [0,100]>` from
`<timeline-range-name> <percentage>`. Applying the standalone range to the
named arm is a LIVE and mirror defect. The correction remains Phase-A-sized
because the frozen type already represents the four current names in its
compatibility slice.

Corrected mandatory terms:

1. Standalone percentages retain R4's inclusive 0..100 bound.
2. `entry`, `exit`, `cover`, and `contain` accept any finite percentage offset,
   without clamping: `entry 150%` stores `1.5`; `entry -1%` stores `-0.01`.
3. A missing unit, extra token, unknown name, or non-finite offset rejects with
   the generic selector diagnostic, not `expected:["0%..100%"]`.
4. The current temporary named-range `0%..100%` diagnostic is correct only for
   pre-ratification LIVE compatibility. It must disappear when R15 lands; do
   not preserve and then bypass two conflicting adjudicators.
5. Canonical serialization and parse/serialize stability include negative,
   zero, fractional, 100%, and greater-than-100 named offsets.

PB6, not W1, owns the full `<timeline-range-name>` inventory, maturity pins,
future names, timeline/trigger depth, and any later grammar change such as a
wider offset type. R15 is not proof of “full named-range semantics.”

### H-R16 — ACCEPT-NARROW: one numeric token, not fabricated unit text

The mirror is correct that `1%%`, `1%px`, and `1a%b` are not one CSS numeric
token. The research must not overstate this as whole-declaration invalidity.

Corrected mandatory terms:

1. As complete inputs to `parseCssScalar`, `parseCssValue`, and
   `parseCssValues`, those spellings reject with `css_syntax` and
   `expected:["scalar"]`; each is an explicit expected divergence from LIVE.
2. The ruling says only that the legacy adapter cannot fabricate one
   `{type:"number", unit:"..."}` payload from multiple tokens. PB1 later
   preserves the actual component-token sequence.
3. PB12b decides whether that sequence matches a property/descriptor goal.
   W5 must not reject an entire stylesheet merely by citing R16.
4. R12 remains intact: a custom-property declaration may preserve a token soup
   through its raw-keyword compatibility fallback when `parseCssValue` cannot
   represent it. That is not an R16 contradiction.
5. PB3 owns numeric/unit semantic nodes; W2 is not assigned a new global
   numeric-token wave by this row.

Owner sequence: W1 classification/fixtures after addendum ratification; PB1,
PB3, and PB12b close the lossless/token, semantic-unit, and typed-goal meanings.

### H-R17 — RETRACT immediate W1 ownership; ACCEPT only as a PB1-deferred row

The desired CSS result is correct, but the proposed narrow W1 route is not a
stable boundary. The current W0 leaf and ASCII-only `dispatch()` form a partial
implementation: `-é` and `--é` route through `-`, while a bare non-ASCII start
does not. Extending only the dispatch fallback would still leave preprocessing
replacement,
surrogate/NUL handling, escapes, escaped function names, decoded token value,
and original/processed spans unresolved.

Corrected mandatory terms:

1. R17 is titled **CSS identifier preprocessing, escapes, and non-ASCII
   completeness** and is owned by PB1, followed by W0/W1/W2/W5 replay and PB7
   consumption.
2. No W1-local Unicode regex, default dispatch tokenizer, escape decoder, or
   source preprocessor may land. Do not widen `fnHead` independently.
3. Current `-<non-ASCII>`/`--<non-ASCII>` acceptance is recorded as a partial
   pre-PB1 behavior and receives no conformance credit. Bare non-ASCII,
   escaped identifiers, escaped function names, NUL/replacement, lone
   surrogate, and astral-code-point vectors remain PB1 RED.
4. The correction addendum may explicitly exempt this named PB1 seam from a
   **provisional** W1 close; it may not call W1 Unicode-complete or classify the
   current partial implementation as discharged.

Restoring LIVE rejection with a quote/comment/escape-aware W1 guard would be a
second scanner and is worse than the named provisional seam. The sole-scanner
rule therefore governs even though it delays this correction.

### H-R18 — ACCEPT-SPLIT: immediate parity invariant, PB1 token completeness

The parity rule is sound, but “governs strings and balanced scans” must not be
read as complete CSS string/escape tokenization.

Corrected immediate slice after addendum ratification:

1. One active U+005C protects the following quote and permits LF/CRLF/CR/FF
   line continuation. That one-backslash continuation already agrees with LIVE
   and is an existing-authority repair.
2. An even U+005C run does not escape the following quote. A function value
   whose quoted argument ends after two U+005C code points, then continues with
   another argument, must parse according to the real closing quote; this is an
   expected divergence where LIVE's raw scanner disagrees.
3. Two U+005C code points before a newline represent an escaped U+005C followed
   by an unprotected newline; the legacy scalar/value rejects with
   `css_syntax` / `expected:["scalar"]` even where LIVE accepts.
4. `balancedUntil` and the Phase-A splitters share the odd/even delimiter
   invariant. The W0 scanner bank must cover quotes after 1, 2, 3, and 4 U+005C
   code points and nested delimiters.

PB1-only remainder: CSS preprocessing, escaped-code-point decoding, hex escape
consumption and terminators, bad-string token production/recovery, string
value normalization, and original/processed spans. R18 authorizes no new
feature-local scanner and no claim that the Phase-A regex is a complete CSS
string tokenizer.

## 3. Corrected minimal correction-addendum terms

The addenda-writing seat should produce the next correction addendum with no
larger scope than the following:

1. **Status and authority.** `PROPOSED / NOT RATIFIED / NO NEW SEMANTIC CODE
   AUTHORIZED` until two independent challenges, root gestalt adjudication,
   and explicit owner ratification. It is orthogonal to `ADDENDA-02` and does
   not satisfy either Phase-B owner gate.
2. **Surface lock.** No runtime/type export, signature, legacy diagnostic-code
   union, result shape, color seam, or fail-fast sheet contract changes.
3. **Existing repairs.** D-W1-1–D-W1-8 are enumerated as repairs under current
   authority. Shared-leaf changes trigger one W0 structural replay.
4. **Ledger table.** Freeze R13–R18 exactly as hardened above, with per-row
   current LIVE behavior, current mirror behavior, required result, exact
   `code`/`expected[]` or AST, owner, immediate/deferred status, and replay
   owners.
5. **Immediate W1 authorization.** Only R14, R15, R16, and R18's parity fixture/
   divergence slice may land after ratification. R13 and R17, plus the full
   tokenizing remainder of R18, remain PB1-only.
6. **Provisional seam.** R13 and R17 are executable, named `DEFERRED_PB1` rows.
   They are excluded only from a specifically labelled pre-PB1 provisional
   W1 verdict and remain RED for tranche perfection. A TODO or skipped test is
   not a discharge.
7. **Differential classification.** Expected-agreement rows compare exact
   Phase-A gating projections. Ratified divergences compare against their
   explicit spec result, never against a predicate such as “mirror rejects.”
8. **Serializer policy.** Twelve-decimal canonicalization is inherited and
   precision-limiting. R15 expands the accepted named-offset domain without
   promising lossless arbitrary-float identity.
9. **No duplicate recognition.** No comment-aware `util.ts`, W1/W2/W5 scanner,
   Unicode fallback tokenizer, or pre-strip pass. PB1 remains the sole future
   scanner and parse-local recovery authority.
10. **Downstream replay.** W2/W5 consume only the immediate Phase-A results;
    PB1 later re-anchors W0 and every exposed accepted/in-progress Phase-A wave
    under `ADDENDA-02`'s owner-ratified replay rule.

No unrelated audit suggestion belongs in this addendum. In particular it must
not authorize Phase-B feature code, expand the named-range inventory, widen the
legacy AST, or solve stylesheet recovery.

## 4. Dependency and gate corrections

The smallest valid sequence is:

```text
focused D-W1 repair seal
  -> W0 structural replay
  || E-3 harden (this file) -> correction addenda write
       -> 2 independent addenda challenges -> root gestalt -> owner ratification
  -> land R14/R15/R16 + immediate R18 classification/fixtures
  -> mechanical W1 gates
  -> 2 independent W1 E-1 re-audits -> root adjudication
  -> existing W2 => W1_color close overlay
  -> provisional pre-PB1 W1 close, with R13/R17 explicitly DEFERRED_PB1

ADDENDA-02 Gate 1 -> PB0 audits -> owner Gate 2 -> PB1
  -> W0 structural replay + W1/W2/W5 exposed-wave replay/audits
  -> R13/R17/full-R18 GREEN on the sole shared scanner
```

These are gate changes, not new production execution:

1. W1 cannot be re-audited to GREEN on the current four TODOs alone. The exact
   six-row correction ledger and ratified semantics must be in the sealed
   artifact first.
2. The correction addendum's own two challenges occur before owner
   ratification. A repair to the addendum after a challenge invalidates both
   prior challenge verdicts unless root proves the change mechanical and
   challenge-neutral; semantic changes always restart both.
3. W1's two E-1 passes run after all immediate code/fixture changes. Any
   confirmed repair reopens both passes.
4. W1's non-color artifact may receive only a **provisional pre-PB1** verdict.
   Existing H-3 remains: W2 must activate and prove the color-bearing W1 rows
   before the total W1 door is closed.
5. No provisional status waives the later PB1 replay required by
   `ADDENDA-02`. Tranche perfection cannot declare W1 final while R13/R17/full
   R18 remain deferred.

## 5. Downstream consequences

### W2

- W2 remains the only color owner. It must replay the complete repaired W1
  scalar/value bank when it activates the color seam, including exact nested
  diagnostics and the ratified R14–R16/R18 rows.
- W2 must not absorb comment, Unicode, or escape tokenization. PB1 later
  re-anchors its numeric/color lexemes and triggers the ordinary exposed-wave
  replay.
- R16 does not silently create a new global W2 numeric grammar. Color-specific
  token rules stay under W2's existing R1/R3/R6/R9 authority until PB1/PB3.

### W5

- W5 may implement already-ratified R5 comment-before-declaration-name behavior
  and the legacy unterminated-comment fail-fast gate. It may not repair R13 by
  adding comment logic to value splitters or declaration-local tokenizers.
- R16 is not a whole-sheet rejection rule. Normal declarations may inherit the
  legacy W1 value failure; `--*` declarations retain R12's raw-keyword fallback.
- W5 must consume the repaired first nested diagnostic. It may not reconstruct
  `expected[]` after a W1 failure.
- A pre-PB1 W5 close is provisional and must replay after PB1 along with its
  R5/R7/R8/R12 and hostile-comment vectors.

### PB1 / PB6 / PB12

- PB1 solely closes R13, R17, and the full R18 remainder; it also re-proves
  R14/R16 token boundaries and preserves parse-local diagnostics.
- PB6 owns the exact current named-range inventory and maturity. It inherits
  R14/R15 for the four frozen names but does not infer its denominator from
  them.
- PB12a consumes the PB6 selector/rule adapter in recovered sheets. PB12b owns
  property-goal meaning for the multi-token R16 sequences. Neither duplicates
  PB1.

## 6. Re-audit prerequisites

Both independent W1 passes may start only after all of the following are true:

1. The correction addendum is twice-challenged, gestalt-adjudicated, and
   owner-ratified; its exact ratified revision is named in the repair receipt.
2. The focused repair and immediate R14/R15/R16/R18 slice are sealed. No author
   is still mutating shared W0/W1 files.
3. W0's structural replay is GREEN: declarations/parity, lexeme, scanners,
   freeze independence, trailing-input reserve, and the shared-leaf
   odd/even/line-continuation vectors.
4. `npm run check`, the full maintained tests, and `npm run dts-parity` are
   GREEN. The barrel remains 33 type + 19 runtime exports.
5. Each owned W1 door has at least 50 asserted actual accepts and 20 asserted
   actual rejects, with branch-diverse deterministic hostiles and non-string
   no-throw inputs. Template repetition does not prove diversity.
6. The differential corpus gates exact structural success values or exact
   first `code` + `expected[]`; every disagreement is mapped to R4/R8 or one
   ratified R13–R18 row. No acceptance-only “GREEN” witness remains.
7. R13 and R17/full-R18 deferred rows execute as a visible PB1 ledger and are
   excluded only by the explicit provisional-gate term. They are not skipped
   and not counted as passed.
8. Selector serialization covers both kinds, twelve-decimal canonical
   stability, finite exponent values, and negative/>100 named offsets.
9. Grammar review finds no comment-aware splitter, Unicode/escape tokenizer,
   bare recognition regex, `.map`, `.mapState`, or second scanner in W1/W2/W5.
10. W2's seam remains visibly RED until W2 lands, and the audit states whether
    it is judging the non-color provisional W1 artifact or the post-W2 total
    door.
11. Each audit reports all three E-1 altitudes, LOC/parsimony, exact commands,
    corpus counts, and the served-model receipt. A route that differs from E-5
    needs an explicit root disposition; silence is not equivalence.

The two passes are independent and receive the same sealed artifact plus the
same authoritative oracle set. Confirmed defects repair and restart both.

## 7. Final verdict

**HARDEN COMPLETE; CORRECTION SET CONDITIONALLY ACCEPTED AS AMENDED. W1 IS
STILL REJECTED.** The focused repair is technically sound and should be kept,
but its current green tests cannot close W1. R14, R15, R16, and the narrow R18
slice are W1-sized only after the E-3 addendum is ratified. R13, R17, and full
R18 wait for the owner-gated PB1 sole scanner. W2 retains the color activation
edge; W5 remains a consumer, never a substitute tokenizer; PB6 retains full
named-range ownership. Two fresh W1 audits and root adjudication are mandatory
after the authorized correction slice seals.

— V·π W1 audit-finding harden seat, 2026-07-21
