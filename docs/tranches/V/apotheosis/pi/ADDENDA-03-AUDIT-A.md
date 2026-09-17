# V·π ADDENDA-03 AUDIT A — independent E-3 adversarial challenge

2026-07-21 · target: exact proposed `ADDENDA-03.md` revision ending in the
2026-07-21 formation receipt · posture: assume faulty, prove otherwise ·
implementation edits: none · Audit B was neither read nor contacted

model_served: `gpt-5.6-sol` (Codex route; no Opus-labelled route was exposed to
this seat)

## Verdict

**REJECT.** The proposal has the right tranche boundary, the right immediate
versus PB1 split, and the right W2/W5/PB6 routing. Its frozen 52-export surface,
two owner-gate separation, serializer domain, replay obligations, and bounded
cost are coherent. It cannot yet be put to the owner, however, because three
semantic rows are not terminal/executable enough for the addendum's claimed
"exact authorization": R13 leaves the legacy result at a conditional choice,
R16 omits a known current value-door divergence already present in its own R14
witness set, and R18 contains an instruction to invent the expected fixture
later instead of freezing an exact input and result now. The formation receipt
also omits the model receipt required by E-5.

Repairing any of the three semantic defects changes the challenged authority.
Per E-3 and the addendum's own preamble, both independent challenges must then
restart against the repaired exact revision.

## 1. Total-tranche / gestalt analysis

### What is optimal and should be retained

The sequence is KISS-correct. W1 should receive only the bounded selector and
complete-input compatibility slice now; comment handling, preprocessing,
Unicode/escape decoding, bad-string recovery, and source mapping belong to the
single PB1 scanner after `ADDENDA-02` Gate 2. Adding any comment-aware W1/W2/W5
splitter would duplicate a tokenizer that PB1 must replace. Current inspection
finds no such new scanner or pre-strip pass.

The downstream boundaries are also correct:

- W2 can author color independently but cannot close the W1 color overlay
  without replaying the sealed W1 bank. It acquires no global token ownership.
- W5 remains held on rejected W1, then may consume only the provisionally
  accepted W1 semantics. It cannot turn R16 into whole-sheet rejection or
  implement R13 locally; R12's custom-property fallback remains intact.
- PB6 owns the complete, maturity-pinned named-range/timeline inventory. W1's
  four-name `KeyframeSelector` compatibility slice neither expands that
  denominator nor competes with PB6.
- PB1 later re-anchors W0/W1/W2/W5 under the separately owner-gated Phase-B
  replay rule. This addendum neither authorizes PB1 nor alters either
  `ADDENDA-02` owner gate.

That is the optimal sequence. The defects below concern whether the owner is
being given a closed semantic decision, not whether the work should be moved
into an earlier tokenizer wave.

### Confirmed gestalt defects

#### A-01 — BLOCKING: R13 has no terminal legacy-adapter result or named later decision

`ADDENDA-03.md:135` correctly freezes the L4 token fact that `a/**/b` is two
ident component values, but then says the legacy adapter *may* map it to a
space list "only if" that preserves its contract. That is a condition, not a
terminal disposition. The owner-decision section nevertheless asks the owner
to ratify R13's semantics as part of one exact decision.

The repair need not decide the adapter early. It can preserve the hardened
boundary by stating exactly that:

1. the PB1/L4 expected CST is two adjacent ident component values with the
   intervening comment retained only as trivia/source evidence;
2. `ADDENDA-03` does **not** ratify a legacy `separator:"space"` lowering;
3. PB0's occurrence row and Gate-2 contract must freeze whether the legacy
   adapter can lower that sequence without lying, and the Phase-A replay stays
   RED until that row is terminal.

Alternatively the addendum may freeze the exact legacy AST now, but it cannot
leave an unassigned "may" inside a row the owner is asked to approve. The same
section should replace "comments adjacent to `,` or `/`" with a finite witness
table and exact expected component/list result. This is especially important
because R13 must later be executable rather than a TODO.

#### A-02 — BLOCKING: the correction ledger misses `1e%` in the three value doors

`ADDENDA-03.md:157` lists `1e%` only under R14's selector diagnostics, while
R16's executable witnesses at line 195 are limited to `1%%`, `1%px`, and
`1a%b`. Independent probing shows another already-present LIVE divergence:

```text
input: 1e%
LIVE parseCssScalar/parseCssValue/parseCssValues:
  ok:true; fabricated numeric unit "e%"
mirror parseCssScalar/parseCssValue/parseCssValues:
  ok:false; css_syntax; expected:["scalar"]
```

CSS Syntax consumes `1` as a number, then recognizes an ident sequence `e` for
the dimension unit, leaving `%` as another token. Therefore the mirror's
complete-input rejection belongs to R16's "do not fabricate one scalar from
multiple tokens" principle, not to R14's selector-only correction. Without an
explicit R16 witness, the known disagreement is absent from the executable
ledger that `§5` requires to map every divergence to a ratified row.

Add `1e%` to R16 for all three legacy doors with the exact projection above.
The corpus author should also derive boundary siblings from the same numeric-
token rule rather than treating the current three spellings as an exhaustive
denominator; every retained LIVE divergence needs an explicit minimized
fixture and R16 classification.

#### A-03 — BLOCKING: R18 contains a placeholder, not an exact divergence row

`ADDENDA-03.md:238` says a function/list source after `BS(2)` should
"assert the spec result" but names neither the source nor the result. This
fails the harden requirement that each row freeze current LIVE behavior,
current mirror behavior, the exact AST or diagnostic, and an executable
fixture. It also makes the owner-decision claim of "exact divergence fixtures"
at lines 259–261 untrue.

A concrete minimized row already exists in the inspected artifact and can be
frozen without adding a scanner:

```text
source code points: fn("a\\", b)
                    # exactly two U+005C before the closing quote
LIVE parseCssValue:  css_syntax / expected:["scalar"]
required mirror AST:
  { kind:"call", name:"fn", args:[
      { kind:"scalar", payload:{ type:"keyword", value:"\"a\\\\\"" } },
      { kind:"scalar", payload:{ type:"keyword", value:"b" } }
  ] }
```

The repaired table must use an unambiguous code-point spelling, give the exact
`parseCssValue` and `parseCssValues` projections, and do the same for the
`BS(1)` through `BS(4)` quote/newline cases. Full string tokenization still
belongs to PB1; exact Phase-A parity fixtures do not create a second tokenizer.

### Tranche-wide non-defects

- The pinned CSS Syntax and Scroll Animations blob/raw-source identities match
  `formation/l4-root-seed-manifest.json`; the sheet does not misrepresent them
  as PB0 closure.
- No R13/R17/full-R18 implementation credit is granted before PB1. They remain
  RED for tranche perfection.
- The proposed S-grade immediate slice and separate audit/adjudication cost are
  reasonable. R13/R17/full-R18 implementation and replay remain charged to
  PB1, not hidden in this addendum.
- The two post-ratification W1 audits, W0 replay, W2 overlay, and later PB1
  replay are all distinct and correctly retained.

## 2. Addendum / gate analysis

### Authority, surface, and owner decision

The status banner is sound: `PROPOSED`, not ratified, no semantic code
authorized. It correctly requires two challenges, root gestalt adjudication,
and explicit owner ratification, and it correctly says a semantic amendment
invalidates prior challenges. It does not conflate this decision with either
`ADDENDA-02` gate.

The public contract remains exact in both plan and artifact:

- `mirror/index.ts` exposes 19 runtime names and 33 type names;
- `npm run dts-parity` reports `33 types + 19 runtime exports`;
- the legacy eight-code `ParseIssue`, `ParseResult<T>`, 37-symbol seam, W2
  color boundary, R4 standalone interval, R8 empty-arm rejection, W5 fail-fast
  contract, and R12 fallback are not widened;
- `serializeKeyframeSelector` remains internal and does not become a 53rd
  export.

The owner request is otherwise admirably narrow: D-W1-1–8, deferred R13/R17,
immediate R14/R15/R16 plus the parity slice of R18, provisional status, and the
replay/hold sequence. Once A-01–A-03 are repaired, that remains the right
single decision to surface.

### Existing-repair ledger D-W1-1–D-W1-8

| row | audit result |
|---|---|
| **D-W1-1** | **Semantics ACCEPT.** One shared `ident` repair, no exact-`--` workaround, no escape/Unicode completeness claim. Current maintained evidence is not yet the row's full matrix: `--5` is not asserted at leaf/scalar/value and several listed spellings are absent at value level. That is a pre-re-audit evidence gap, not authority to change semantics. |
| **D-W1-2** | **Semantics ACCEPT.** One-active-U+005C continuation is agreement work; even-run divergence remains R18. The required W0 replay has not yet covered all 1/2/3/4-backslash × LF/CRLF/CR/FF combinations, so the repair is not structurally re-sealed yet. |
| **D-W1-3** | **ACCEPT.** The `ParseResult<CssValue>` internal carrier preserves first inner `code`/`expected[]`; no public result shape changed. |
| **D-W1-4** | **ACCEPT.** Direct and nested recognized non-finite numerics stay rejected with `expected:[]`. |
| **D-W1-5** | **ACCEPT.** `1e` and `--` are positive boundaries and every maintained accept/reject loop asserts the claimed polarity. |
| **D-W1-6** | **ACCEPT as a close requirement, not yet discharged.** The banks are materially more diverse, but the four current `it.todo` rows are not executable deferred rows and the W0 parity matrix remains incomplete. The addendum says so and correctly blocks re-audit until repaired. |
| **D-W1-7** | **ACCEPT.** Door state compares the complete Phase-A projection (`ok`+value or first code+expected), and stub/color doors remain RED. The full corpus, not the small census, remains the proof. |
| **D-W1-8** | **ACCEPT.** Both selector kinds and the twelve-decimal canonical/precision-limiting domain are stated. R15's negative and >100% cases correctly remain future post-ratification fixtures. |

The receipt correction from four to six unresolved E-3 classes is accurate.
The one W0 structural replay is the correct consequence of changing shared
`lexeme.ts`; W0 does not need two invented feature audits.

### R13–R18 row analysis

| row | audit result |
|---|---|
| **R13** | **REJECT as written (A-01).** PB1 sole ownership, no-token comment semantics, quote-data behavior, R8 preservation, and legacy fail-fast rejection are correct. The L4 two-ident result is clear; the legacy adapter outcome and adjacency fixtures are not terminal. |
| **R14** | **ACCEPT.** The exponent grammar, numeric conversion (`1e-2%` → `0.0001` ratio), standalone R4 diagnostics, incomplete/non-finite generic selector diagnostics, W1/PB1/PB6 routing, and no-tokenizer rule are exact. |
| **R15** | **ACCEPT.** R4 is standalone-only; exactly four frozen names accept any finite percentage; invalid unit/name/extra/non-finite inputs use the generic selector diagnostic; PB6 retains the complete inventory and maturity. |
| **R16** | **REJECT as incomplete (A-02).** The narrow three-door/never-whole-sheet semantics, R12 preservation, and PB1/PB3/PB12b ownership are correct. The known `1e%` multi-token LIVE divergence needs its own executable row. |
| **R17** | **ACCEPT-DEFER.** Preprocessing, escape decoding, Unicode/replacement, function-name decoding, and spans remain wholly PB1-owned; current partial `-<non-ASCII>` behavior earns no credit and no fallback tokenizer is authorized. |
| **R18** | **REJECT as underspecified (A-03).** The immediate odd/even invariant versus PB1 remainder is the right split and the direct bad-string diagnostic is correct. The function/list divergence and the full BS(1..4) replay matrix need exact sources and projections, not an instruction to decide them during implementation. |

### Governance and receipt defect

E-5 requires a `model_served` receipt on every seat. The formation receipt at
`ADDENDA-03.md:373` identifies the seat and date but not the served model. This
is a **mechanical governance defect (A-04)**. Add the truthful served-model
identifier and any root routing disposition; do not invent an Opus label. This
does not drive the semantic rejection, but the exact artifact cannot receive a
GREEN challenge while the standing-law receipt is absent.

## 3. Prototype / feature inspection

### No premature semantic landing

No post-addendum implementation of R14–R16 or new R18 behavior was found:

- Both original W1 audits already record exponent-selector acceptance and the
  strict malformed-unit rejection, proving current R14/R16 behavior predates
  this addendum and was discovered rather than newly landed. The maintained
  test still marks their classifications TODO; neither is credited GREEN.
- R15 is not implemented. `entry 150%`, `entry -1%`, `exit 200%`, and
  `contain -20%` still reject with the temporary LIVE-compatible
  `expected:["0%..100%"]` diagnostic.
- The R18 implementation consists only of the W0 odd/even scanner invariant
  and D-W1-2's already-authorized one-active-U+005C line continuation. The
  function/list divergence has no maintained classification fixture yet.
- R13 and R17 remain visibly incomplete. No comment-aware utility, Unicode
  fallback dispatch, escape decoder, source preprocessor, or second token
  cursor was added.

This is the correct pre-ratification implementation posture. Existing
unratified behavior must remain classified RED, but it need not be deleted and
reimplemented merely to satisfy sequencing.

### Current mechanical evidence

Executed from `pi/mirror/`:

```text
npm test -- --reporter=verbose
  8 files passed; 30 tests passed; 4 TODO

npm run check
  GREEN

npm run dts-parity
  GREEN; 33 types + 19 runtime exports
```

Independent LIVE/mirror probes confirmed:

- R14 current mirror shapes and proposed diagnostics for `1e2%`, `1e-2%`,
  `entry 1e-2%`, `1e3%`, `-1e2%`, `1e+%`, and `1e309%`;
- R15 is absent and its temporary diagnostics remain LIVE-compatible;
- R16's three named witnesses reject in all three mirror doors with
  `css_syntax` / `expected:["scalar"]` while LIVE fabricates a scalar;
- the additional `1e%` value-door divergence in A-02;
- R13's current placement-dependent split;
- one-U+005C newline agreement, two-U+005C newline rejection, and the exact
  `fn("a\\", b)` parity divergence in A-03;
- canonical selector serialization emits `entry 150%` and `entry -1%` for
  valid hand-built finite objects, while the pre-ratification parser still
  rejects those spellings as required.

## Required repair before a fresh challenge

1. Make R13 terminal: either freeze the legacy `a/**/b` adapter result or name
   PB0/Gate 2 as the explicit unresolved decision, keep it RED, and enumerate
   exact adjacency witnesses/results.
2. Add `1e%` to R16's three-door expected-divergence ledger and require a
   derived minimized numeric-token boundary bank so every known disagreement
   is explicitly classified.
3. Replace R18's placeholder with code-point-unambiguous BS(1..4) sources,
   current LIVE/mirror projections, and exact required ASTs/diagnostics for
   `parseCssScalar`, `parseCssValue`, and `parseCssValues` as applicable.
4. Add the truthful `model_served` formation receipt.
5. Restart both independent E-3 challenges on the repaired exact revision,
   then root performs gestalt adjudication. Only two GREEN replacements make
   the packet eligible for owner ratification.

**Final: REJECT.**

---

## Fresh re-challenge of amended ADDENDA-03 — 2026-07-21

Target SHA-256:
`9d8006bb2e6f9d900d00e503d6e8b8fe2e84a730892d4ee558e72eab4ef57f02`

Posture: fresh independent assume-faulty E-3 challenge of the exact amended
revision · Audit B was neither read nor contacted · packet/code edits: none ·
model_served: `gpt-5.6-sol` (inherited Codex route)

### Re-audit verdict

**ACCEPT.** The amended sheet discharges A-01 through A-04 without widening
the authorized slice or obscuring deferred work. It is now sufficiently exact,
terminal, and executable to proceed to the other independent challenge and,
only if that challenge is also GREEN, root's E-3 gestalt adjudication. This
verdict is one challenge only: it is not ratification, implementation, a W1
verdict, an `ADDENDA-02` gate decision, or owner approval.

### Prior finding repair verification

#### A-01 — R13 terminal lowering and diagnostics: GREEN

R13 no longer leaves `a/**/b` behind a discretionary "may". It freezes the
legacy lowering as `List("space",[K("a"),K("b")])` while preserving the
underlying Syntax-3 fact that the comment produces no token and that the two
ident component values do not concatenate. This is the only parsimonious
lowering available in the frozen `CssValue` list contract and creates no new
public type or separator.

The adjacency bank is now finite and exact:

- leading/trailing comments around `foo` lower to the same keyword scalar;
- both function-comment placements lower to one argument `a` in value/values
  while the scalar door rejects;
- comma and slash adjacency lower to the corresponding two-item list;
- comment-adjacent trailing slash remains R8 rejection;
- quoted comment spelling remains raw keyword data.

The formerly vague unterminated-comment row is also terminal for every legacy
door. Independent probes reproduced all amended current-oracle claims:

- LIVE and mirror both fabricate `List("slash",[K("foo"),K("*")])` for the
  value/values forms of both `foo/*` and `foo /*`, while their scalar doors
  reject;
- LIVE fabricates the nested slash list in `fn(a/*)` and its values wrapper,
  while the current mirror rejects;
- `/*foo` and `fn(/*a)` reject in the stated doors.

PB1's required legacy result is exact `css_syntax` /
`expected:["scalar"]` rejection for every unterminated-comment form. The L4
recovery result remains truthfully outside this addendum in PB0's occurrence
row. R13 stays executable `DEFERRED_PB1`, earns no current conformance credit,
and authorizes no comment logic in W1, W2, W5, or `util.ts`.

#### A-02 — R16 `1e%` and generated boundary bank: GREEN

R16 now explicitly assigns `1e%` to the three complete-input value doors:
LIVE fabricates value `1` with unit `e%`; the mirror rejects `css_syntax` /
`expected:["scalar"]`. The row correctly remains distinct from R14's
selector-only handling of the same spelling.

I generated the exact amended `B16` set rather than sampling it:

```text
1 explicit `1e%` row
+ 5 numeric heads × 4 malformed tails
= 21 unique sources
```

For all **21 sources × 3 doors**, executable assertions confirmed that LIVE
currently fabricates the stated numeric scalar (with `parseCssValues` adding
only the singleton space-list wrapper) and that the mirror rejects with the
exact required diagnostic. The signed, fractional, exponent, and negative-
exponent siblings all satisfy the sheet's formula. Newly discovered cases are
correctly routed back through E-3 rather than silently absorbed by the row.
R16 remains a complete-input adapter ruling, not a stylesheet-invalidity rule;
R12 and the PB1/PB3/PB12b ownership chain are intact.

#### A-03 — R18 code-point sources and projections: GREEN

`Q(n)`, `L(n,E)`, and `RawQ(n)` are now defined by Unicode code points, so no
host-language escaping ambiguity remains. The `Q(2)` and `Q(4)` ASTs name the
exact raw quoted payload, call arguments, and `parseCssValues` wrapper; odd
runs name exact rejection projections. The scalar-door invariant is explicit.

Independent generation reproduced the complete matrix:

- **Q(1–4):** LIVE rejects value/values for all four; mirror rejects odd runs
  and produces exactly `C(2)`/`C(4)` plus the stated values wrappers for even
  runs; both scalar implementations reject all four with the exact diagnostic.
- **L(1–4,E), E ∈ {LF, CRLF, CR, FF}:** all **16** LIVE rows preserve the
  raw spelling as `K(L(n,E))` (or the singleton values wrapper); mirror matches
  on odd runs and rejects all three doors on even runs with `css_syntax` /
  `expected:["scalar"]`.

Those results are the spec-correct odd/even active-backslash rule. The sheet
does not mislabel them as complete CSS string support: preprocessing, escape
code-point and hex decoding, terminators, bad-string recovery, normalization,
and source mapping remain PB1-only.

#### A-04 — formation/model receipt: GREEN

The addenda-writing receipt now truthfully records
`model_served: gpt-5.6-sol` and identifies it as the inherited Codex route. It
does not invent an Opus label. Any E-5 route variance remains visible for root
governance disposition rather than hidden in the artifact; the missing-receipt
defect itself is closed.

### Authority, replay, surface, and KISS challenge

The post-W1 W0 structural replay is truthfully represented. The amended sheet
and `W0-STRUCTURAL-CHECK.md` agree on 8 files / 30 passes / 4 deliberately
unresolved TODOs, 33 type + 19 runtime parity, one-active-U+005C continuation
over LF/CRLF/CR/FF, and independent 1/2/3/4 quote-parity probes across the
activated scanners. The report does not claim that the unratified R13–R18
feature fixtures are already maintained GREEN. Shared-foundation changes still
reopen the replay.

The gate sequence remains exact:

1. two fresh challenges of this amended digest;
2. root E-3 gestalt adjudication;
3. explicit owner ratification;
4. only then the immediate R14/R15/R16/R18 code/classification/fixture slice;
5. mechanical W1 gates, two fresh E-1 W1 audits, root adjudication, and the W2
   color overlay;
6. separately, `ADDENDA-02` Gate 1, PB0 reviews, owner Gate 2, PB1, and the
   shared-scanner replay that can close R13/R17/full-R18.

No silence or Phase-A activity substitutes for either owner decision. W2 may
continue independent color authoring but owns no tokenizer. W5 stays held on
rejected W1 and cannot turn R16 into whole-sheet rejection. PB6 still owns the
complete named-range inventory and maturity; W1 retains only its frozen four-
name compatibility slice. This is the optimal downstream allocation.

The legacy surface remains exactly **19 runtime + 33 type = 52 direct
exports**, with the eight-code issue union, result shape, 37-symbol seam, W2
color boundary, W5 fail-fast contract, and R12 fallback unchanged.
`serializeKeyframeSelector` remains internal and its finite accepted domain is
explicitly canonical/precision-limiting rather than lossless for arbitrary
floats.

No duplicate tokenizer appeared. Current W0/W1 raw splitters remain the known
provisional substrate; there is still no comment-aware `util.ts`, Unicode
fallback dispatch, escape decoder, source pre-strip pass, or second token
cursor. PB1 remains the sole future preprocessing/token/recovery owner. The
amendment adds evidence and authority only; current R14/R16/R18 behavior is
still uncredited, R15 is still absent, and the four maintained TODOs remain
visible. No semantic implementation was smuggled into formation.

### Fresh evidence

Executed against the exact amended packet and current prototype:

```text
shasum -a 256 ADDENDA-03.md
  9d8006bb2e6f9d900d00e503d6e8b8fe2e84a730892d4ee558e72eab4ef57f02

npm test -- --reporter=verbose
  8 files passed; 30 tests passed; 4 TODO

npm run check
  GREEN

npm run dts-parity
  GREEN; 33 types + 19 runtime exports

independent generated oracle assertions
  R13 current fabricated/reject projections: GREEN
  B16: 21 sources × 3 doors: GREEN
  Q(1–4): all scalar/value/values projections: GREEN
  L(1–4,E): 16 rows × scalar/value/values projections: GREEN
```

The four TODOs are correctly still RED and do not count as implementation or
discharge. The fresh commands prove current truth and structural stability;
they do not pre-approve the post-ratification feature slice.

### Final re-audit seal

**ACCEPT.** A-01, A-02, A-03, and A-04 are closed on SHA-256
`9d8006bb2e6f9d900d00e503d6e8b8fe2e84a730892d4ee558e72eab4ef57f02`.
The historical REJECT above remains the accurate verdict on the superseded
revision and supplies no GREEN credit. Any semantic amendment to this digest
invalidates this re-audit. No packet, prototype, production, BBNF, keyframes,
script, or inbox file was edited by this pass; only this appended Audit-A
section changed.
