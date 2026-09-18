SERVED MODEL: claude-opus-5[1m]

# X.P.W2.b — THE ALGEBRA CONTRACT, OPUS ARM (blind draft)

**What this file is.** One of two independently derived candidate contracts for the Value-CSS
semantic-and-recovery algebra, authored by the Opus seat of `W2.md` §5 phase 1 (`.b`, L598–601,
whose goal / mechanism / sub-gate are `.a`'s). It is a **draft, not the contract**: `X.P.W2.c`, a
fresh Fable adjudicator, refutes at least one load-bearing claim of each arm and rules ONE
`ALGEBRA.md` over both (`W2.md` §5 `.c`, L603–615). Nothing here ratifies anything, stamps any
verb, sets any bar, or authorizes any write in the fresh root.

**Blindness receipt (the evidence phase 2 adjudicates).** This seat never opened
`docs/tranches/X/parse-that/algebra/draft-fable.md`, never read a commit or diff containing it,
never listed the `algebra/` directory, and never read any summary of the Fable arm. It also never
opened the two sealed author arms `W2-fable-author.md` / `W2-opus-author.md` (dated evidence,
untouched forever). The section skeleton below is this seat's own; it was written after the
measurements, not before. Written 2026-09-17, 18:18 local, in one sitting.

**Measurement law taken literally** (`W2.md` §5 `.a`: _"every load-bearing number re-measured
in-seat with the command pasted; zero numbers from memory"_). Every count, ceiling, coordinate and
verdict below was produced by a command run at this seat today; the commands and their raw outputs
are in **Appendix A**, and each claim cites the appendix row that carries it. Two numbers are
**cited, never re-derived**, because the epoch rule forbids re-deriving them here: W1's bar-ledger
arithmetic and the `1,636,680 µs` reconstruction (`W2.md` §2b OP-4/OP-5). No speed sentence appears
anywhere in this file.

**Notation.** `len(X)` is the length of the ordered structure `X` — written this way, not with
absolute-value bars, so that every table cell in this file survives a Markdown formatter intact.

**No CST anywhere.** §12 states the discriminator and applies it to the one construct that looks
like a counter-example (`StylesheetItem.children`). Any tree-shaped carrier of **input syntax** in
this draft would be a draft defect; there is none.

---

## 1. The object: what an algebra is here, and what it is not

The deliverable is **not** a combinator library and **not** a grammar DSL. It is:

> a **closed, finite set of typed operators** over a **four-part state**, with **laws both lowerings
> must satisfy observably**, where **recovery is an operator** and never a backend behaviour.

Three consequences are load-bearing and are stated as clauses, not as prose:

- **A-1 (data, not code).** Every operator term is a value: an operator id, plus arguments that are
  themselves terms, integer literals, byte-string literals, label literals, or identifiers drawn
  from one of **seven closed registries** (§5.2). **No operator argument is a host function.** A
  grammar is therefore a serializable datum, and the _same_ datum drives both lowerings. This is
  what makes an operator-to-lowering bijection printable at all (G-2), and it is the clause that
  answers `W2.md` §12's named exposure (v): _"an algebra finite on paper and open in practice
  because one operator is a `bind` that can express anything."_ There is no `bind`, no `chain`, no
  `map(fn)`, no `hostFn` (§5.4).
- **A-2 (the carrier is a value plus recovery state).** The parse's carrier is `(V, C, P, D)` (§3)
  — a plain value, a byte complement, a provenance array and a diagnostic journal. No node in any
  of the four holds a child node **of input syntax**.
- **A-3 (one algebra or none).** Nothing in an operator term may be target-conditional. The algebra
  module imports neither lowering (G-1's structural condition); the lowerings import the algebra.

---

## 2. The universe this algebra must be total over

The closed input universe is the **frozen 52-export surface** of `@mkbabb/value.js/css`: **33
types** at `src/css/index.ts:1-35` and **19 runtime** at `:36-60`, re-derived at this seat
(**A.1**): `33` and `19`, total `52`, with the derivation instrument agreeing
(`node harness/totality/derive.mjs --check` → _"GREEN — manifest 52 == derived 52 (33 types + 19
runtime); names, kinds and slices identical"_, **A.2**). The barrel's own sha256 at this seat is
`c09d076e…f90c`, byte-identical to the sha the W1 manifest records as its derivation source — the
universe has not moved under the instrument.

The three **closed unions** the algebra must reproduce exactly, all counted at true bytes (**A.3**):

| union                | site                                | members                                                                                                                                                                                             | measured |
| -------------------- | ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `ParseIssue["code"]` | `types.ts:10-24`, codes at `:12-19` | `css_syntax` · `trailing_input` · `keyframe_selector_invalid` · `color_context_required` · `syntax_descriptor_invalid` · `syntax_mismatch` · `animation_option_invalid` · `timeline_option_invalid` | **8**    |
| `CssColorSpace`      | `types.ts:6-8`                      | rgb · hsl · hwb · lab · lch · oklab · oklch · xyz · srgb-linear · display-p3 · a98-rgb · prophoto-rgb · rec2020                                                                                     | **13**   |
| `StylesheetItem`     | `types.ts:118-127`                  | 4 named aliases + 5 inline arms                                                                                                                                                                     | **9**    |

**Corpus clause (C-CORP, from §3 item 2).** No candidate is evaluated on any corpus that is not a
declared subset of this universe plus the adjudicated fixtures: the R1–R5 rows held **spec-correct,
never bug-compatible**; the band's divergence ledger; the **GROUND-A** empty-arg cross-product
(**21 heads × 10 fillings = a 210-member sub-language**, quoted at
`audit/parser/GROUND-A-denominator.md:207`, **A.4**); cand-F's 4,000-case mutation fuzz; cand-O's
replayable mulberry32 corpus. A corpus asymmetry between candidates is a self-authored answer key
and is forbidden by the same clause.

---

## 3. The state — `(V, C, P, D)`

A parse of input `S` is a **total** function from `S` to `(V, C, P, D, ok)`. The four parts are
separate because fusing any two of them is exactly what a CST is.

| part                       | definition                                                                                                                                                                                                                         | why separate                                                                                                                                               | measured anchor                                                                                                                                                                        |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **V** — semantic value     | exactly the frozen `/css` value types, **zero** extra properties. `V` is assignable to the frozen type under an excess-property check                                                                                              | makes "no CST" checkable rather than assertable (G-10)                                                                                                     | the shipped shapes at the pinned bytes are `{space,channels,alpha}` for `V:color` and `{kind,…}` for `V:timing-function`, **7 of 7 sampled values `Object.isFrozen` → true** (**A.5**) |
| **C** — byte complement    | an ordered list of `(offset, length, kind)` for **every byte of `S` not injected into `V`**: whitespace, comments, case spelling, separator choice, punctuation, and every span skipped by recovery. `kind` is drawn from REG-KIND | `(V, C)` fused into one tree _is_ the CST; keeping them apart is what lets `V` be a plain value                                                            | the only operator that may move bytes here is `SKIP` (§5.1 #21)                                                                                                                        |
| **P** — provenance         | an array from `V`'s **construction-ordered leaf index** to `(start, end)` in `S`. An array, not a node field                                                                                                                       | provenance without tree position; forces both lowerings to build `V` in the same order, which is what makes EQ-3 a real constraint rather than a formality | appended only by `EMIT` (§5.1 #17)                                                                                                                                                     |
| **D** — diagnostic journal | an append-only ordered list of `ParseIssue` **values** (the frozen 8-code union, `types.ts:10-24`)                                                                                                                                 | diagnostics are values, never effects (R-LAW-3)                                                                                                            | appended only by `NOTE` (§5.1 #22)                                                                                                                                                     |

**The exported projection.** `ParseResult<T>` (`types.ts:25-27`) is the algebra's **projection**,
not its state: `ok:true` yields `{value, diagnostics: []}` and `ok:false` yields a non-empty
diagnostics tuple. **`C` and `P` are not exported.** That is a contract fact with a consequence:
COMP-1 (§4) is checkable **inside** the algebra and by the harness, and is invisible at the public
surface — so it must be asserted by the harness, never inferred from the public API.

**Obligation O-NONEMPTY.** `types.ts:27`'s failure arm is a **non-empty tuple**
`readonly [ParseIssue, ...ParseIssue[]]`. The frozen contract therefore already forbids the PT-07
`undefined`-on-failure shape _at the type level_, and makes _"every rejection carries at least one
diagnostic"_ a contract obligation rather than a nicety. Measured at the pinned published bytes:
**25 rejections sampled, 0 with an empty diagnostics tuple** (**A.8**) — the incumbent honours the
obligation it is typed into.

---

## 4. COMP-1 — conservation, and the malformed inverse, as one law

> **COMP-1.** For **every** `S` in the closed universe — accepted or malformed —
> `weave(V, C, P) === S`, byte for byte.

`weave` is a **total function of the algebra**, defined here (not left to a lowering): it merges
the `C` spans and the `P` spans into one offset-ordered cover of `[0, len(S))` and concatenates the
covered bytes. It is well-defined exactly when the two span sets are **disjoint and complete**, so
COMP-1 decomposes into three checkable sub-conditions, and a violation names which one broke:

- **COMP-1a (completeness)** — the union of the `C` spans with the `P` spans is `[0, len(S))`.
- **COMP-1b (disjointness)** — their intersection is empty.
- **COMP-1c (fidelity)** — the concatenation in offset order equals `S`.

COMP-1 subsumes the _byte complement_ and _malformed inverse_ products in one falsifiable law, and
it is the reason recovery cannot be an escape hatch: **bytes skipped by recovery land in `C` or the
law breaks** (R-LAW-2). It is also the reason `SKIP` is the _only_ byte-discarding operator: any
other discard route would create an uncovered interval and fail COMP-1a by construction.

**Relation to the two exported serializers.** `serializeCssColor` and `serializeTimelineOptions`
(the two **W-class** rows of §8) are the **C-free** direction: `V` to `S′`, where `S′` is the
canonical spelling. They are _not_ `weave` — `weave` restores the author's bytes, a serializer
prints the algebra's own. Both are named in the 52-map so the distinction cannot be lost by
accident; and note that `serializeCssColor` returns `Result<string, ColorIssue>`, **a different
issue union** from the one `D` carries (§10, mark DM-3).

---

## 5. The closed operator set — **22 operators**

### 5.1 The enumeration

Notation for argument kinds: **T** = operator term · **N** = integer literal · **S** = byte-string
literal · **L** = label literal · **@R** = identifier drawn from closed registry `R` (§5.2).

| #   | id         | arguments                                                                  | consumes input                  | writes                                                                 | law notes                                                                                                                        |
| --- | ---------- | -------------------------------------------------------------------------- | ------------------------------- | ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| 1   | `LIT`      | S                                                                          | yes, exactly those bytes        | offset; the bytes reach `C` via an enclosing `SKIP`, or `P` via `EMIT` | no predicate function, ever                                                                                                      |
| 2   | `CLASS`    | @REG-CLASS, N min, N max                                                   | yes, a maximal run in the class | offset                                                                 | branchless 256-entry table; the SIMD-or-scalar question is a **lowering** question, not an algebra one                           |
| 3   | `NUM`      | @REG-NUM                                                                   | yes                             | offset, value stack                                                    | the numeric microsyntax is ONE operator so that `1.`, `1e400` and minus-zero are algebra-level decisions, not lowering accidents |
| 4   | `IDENT`    | @REG-POLICY (case fold)                                                    | yes                             | offset, value stack                                                    | ASCII case folding is a declared policy, never implicit                                                                          |
| 5   | `END`      | none                                                                       | no (zero-width)                 | none                                                                   | end-of-input assertion; the `trailing_input` code's only source                                                                  |
| 6   | `SEQ`      | T… (n at least 2)                                                          | via children                    | none                                                                   | n-ary, not binary: the registry stays flat and the depth of the **term** is not the depth of the **parse**                       |
| 7   | `ALT`      | T… (n at least 2)                                                          | via children                    | none                                                                   | ordered committed choice; no "otherwise" arm that is a host function                                                             |
| 8   | `DISPATCH` | @REG-CLASS (head), @REG-TABLE (arm table)                                  | via children                    | none                                                                   | **no default arm.** The closed-union law made load-bearing: an unknown head is a `FAIL`, never a fallback                        |
| 9   | `REP`      | T, T? (sep), N min, N max                                                  | via children                    | none                                                                   | `max` is a literal; infinity is not an admissible argument (K-7's structural half)                                               |
| 10  | `OPT`      | T, @REG-TABLE (default constant)                                           | via child                       | none                                                                   | the default is a **named constant**; `undefined` is not an admissible default (the PT-07 shape at the value level)               |
| 11  | `COMMIT`   | none                                                                       | no                              | commit barrier                                                         | after it, the enclosing `ALT` may not backtrack past this point                                                                  |
| 12  | `FAIL`     | L… (at least 1)                                                            | no                              | expectation set                                                        | **labelled zero-width failure** — debt 1. An empty label list is not constructible                                               |
| 13  | `EXPECT`   | T, L… (at least 1)                                                         | via child                       | expectation set                                                        | relabels a child's expectation set; labels live on operators, never in a printer                                                 |
| 14  | `MARK`     | T                                                                          | via child                       | snapshot and restore                                                   | the transaction operator: snapshot `(offset, len(D), len(C), len(P), arena)` and restore **exactly** on failure                  |
| 15  | `RECOVER`  | T, T sync, @REG-TABLE sentinel, @REG-POLICY alt-interaction                | via children                    | `C`, `D`, offset                                                       | the only operator that may skip malformed bytes; §7 R-LAW-2/4/5 bind it                                                          |
| 16  | `DEPTH`    | T, N bound                                                                 | via child                       | depth counter                                                          | **the only re-entrant operator.** The bound is an argument — an algebra parameter (§9, CL-D3)                                    |
| 17  | `EMIT`     | @REG-CTOR, N arity                                                         | no                              | `V`, `P`                                                               | constructs one `V` node from the k topmost value-stack entries and appends its provenance in construction order                  |
| 18  | `CLAMP`    | N lo, N hi, @REG-POLICY mode                                               | no                              | `V`                                                                    | clamps per §8.1/§4.2; `mode` declares the non-finite posture (§10, DM-3)                                                         |
| 19  | `SCALE`    | N num, N den                                                               | no                              | `V`                                                                    | **exactly `(value * num) / den`** — debt 4. A folded factor is not constructible: there is no single-argument form               |
| 20  | `MAPCONST` | @REG-TABLE, L miss-label                                                   | no                              | `V`                                                                    | closed null-prototype table lookup; the miss is a labelled failure, never `undefined`                                            |
| 21  | `SKIP`     | T, @REG-KIND                                                               | via child                       | `C`                                                                    | **the only byte-discarding operator.** COMP-1a is enforced here                                                                  |
| 22  | `NOTE`     | @REG-CODE, @REG-POLICY span source, L… expected, @REG-POLICY actual source | no                              | `D`                                                                    | appends a `ParseIssue` **value**; it may not print, log or throw (R-LAW-3)                                                       |

**Count: 22.** (`LIT CLASS NUM IDENT END` = 5 · `SEQ ALT DISPATCH REP OPT` = 5 · `COMMIT FAIL
EXPECT` = 3 · `MARK RECOVER DEPTH` = 3 · `EMIT CLAMP SCALE MAPCONST` = 4 · `SKIP NOTE` = 2.)

### 5.2 The seven closed registries

| registry       | contents                                                                                                                                                                                                    | closure evidence                                                                                                         |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **REG-CLASS**  | byte-class tables, each a 256-entry `Uint8Array`                                                                                                                                                            | a table is data; adding one is a contract amendment, visible in the registry diff                                        |
| **REG-NUM**    | the CSS numeric profiles (number · percentage · dimension · integer)                                                                                                                                        | four entries; the `1.` / `1e400` / minus-zero edges are profile properties (§9 CL-D4, §10 DM-3)                          |
| **REG-CTOR**   | the value constructors — **exactly the 31 `V:` rows of §8**                                                                                                                                                 | one constructor per frozen value shape; the count is the 52-map's own, not an independent list                           |
| **REG-TABLE**  | closed constant tables: the **148** named colours (**A.6**), the keyword enums (`RangePhase`, `ScrollerKeyword`, `TimelineAxis`, `TriggerType`), `DISPATCH` arm tables, `OPT` defaults, `RECOVER` sentinels | null-prototype; a miss is a `FAIL`, never a prototype hit                                                                |
| **REG-CODE**   | the frozen **8** `ParseIssue` codes (`types.ts:12-19`)                                                                                                                                                      | the union is frozen; a ninth code is a value.js contract change, not a W2 act                                            |
| **REG-KIND**   | the `C` complement kinds: `whitespace` · `comment` · `separator` · `case-spelling` · `punctuation` · `skipped-malformed`                                                                                    | six; COMP-1 does not care which, only that the span is covered — the kinds exist so EQ-2 has something to disagree about |
| **REG-POLICY** | declared policies: case fold · clamp mode · `RECOVER` alt-interaction (R-LAW-5) · `NOTE` span and actual source                                                                                             | every entry is a _declared_ choice with an owner-escalation path where the band left a dissent (§10)                     |

**The closure test (CL-1), stated so it can fail.** Take any operator term `t`. Walk its arguments.
`t` is admissible iff **every argument is a term, an integer literal, a byte-string literal, a label
literal, or an identifier present in one of the seven registries** — and inadmissible otherwise.
_Falsifier_: a candidate that passes its slice while holding a JavaScript closure anywhere inside a
term. The test is mechanical (`typeof arg === "function"` anywhere in the term walk is red) and is
the structural half of K-2/K-3.

### 5.3 Capability-family coverage (`W2.md` §3b, L246-251) — all 13, none by hand-waving

| #   | family (the spec's words)                           | operator(s)                                  | note                                                                                         |
| --- | --------------------------------------------------- | -------------------------------------------- | -------------------------------------------------------------------------------------------- |
| 1   | sequence                                            | `SEQ`                                        | n-ary                                                                                        |
| 2   | ordered committed choice                            | `ALT` + `COMMIT`                             | commitment is separate so an arm can commit mid-way                                          |
| 3   | token-class scan                                    | `CLASS` (+ `NUM`, `IDENT` as profiled scans) | §3 item 12: scan primitives are **combinator-library citizens**, never a CSS-side lexer pass |
| 4   | span-into-`C`                                       | `SKIP`                                       | the sole byte-discard route (COMP-1a)                                                        |
| 5   | channel-table dispatch                              | `DISPATCH`                                   | closed table, no default arm                                                                 |
| 6   | value construction with provenance append           | `EMIT`                                       | construction order **is** `P`'s order (EQ-3)                                                 |
| 7   | clamp                                               | `CLAMP`                                      | per §8.1/§4.2                                                                                |
| 8   | exact scale `(value * num) / den`                   | `SCALE`                                      | two arguments by construction (debt 4)                                                       |
| 9   | labelled zero-width failure with named expectations | `FAIL` (+ `EXPECT`)                          | debt 1; empty label lists not constructible                                                  |
| 10  | bounded back-edge, depth an **algebra parameter**   | `DEPTH`                                      | the bound is an argument (CL-D3)                                                             |
| 11  | commit point                                        | `COMMIT`                                     | —                                                                                            |
| 12  | mark/rollback                                       | `MARK`                                       | R-LAW-1's subject                                                                            |
| 13  | recover/resync with declared synchronization        | `RECOVER`                                    | R-LAW-2/4/5's subject                                                                        |

The **six residual operators** — `LIT`, `END`, `REP`, `OPT`, `MAPCONST`, `NOTE` — are not padding;
each closes a hole the thirteen families leave open: `LIT` (a literal is not a class), `END`
(`trailing_input` has no other source), `REP` (a bounded loop is not a back-edge and must not be
written as one), `OPT` (a declared default keeps `undefined` out of `V`), `MAPCONST` (the 148-row
table is data, not 148 `ALT` arms), `NOTE` (`D` must have exactly one writer).

### 5.4 What is deliberately **absent**, and why each absence is load-bearing

| absent                                            | why                                                                                                                                                                                    |
| ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `bind` / `chain` / `flatMap`                      | it makes the operator set infinite in practice while finite on paper — `W2.md` §12 exposure (v). The substrate has `chain` at `parser.ts:127` (**A.7**); the algebra does not adopt it |
| `map(fn)` with an opaque host function            | value construction is `EMIT` over a registry id; a host closure would be a one-lowering node (K-3) and would break CL-1                                                                |
| `hostFn` / escape-hatch node                      | AC-2's own predicted failure (b); pre-forbidden by CL-1 rather than discovered at Stage 2                                                                                              |
| a general negative lookahead over arbitrary terms | it forces both lowerings to share a backtracking model; the microsyntax rows the band adjudicated are expressible with `CLASS` + `COMMIT`                                              |
| memoization as an operator                        | PT-03's class. Memoization is a **lowering** decision that must be unobservable (CL-O8, §9)                                                                                            |
| `debug` / `toString`                              | presentation, not algebra (EQ-4's own reason)                                                                                                                                          |

### 5.5 The bijection registry (what G-2 prints, and how it catches the v12 shape)

Each operator carries a registry row in **both** lowerings:

```
(opId, arity, argKinds[], fingerprint, jsSymbol, wasmOpcode)
fingerprint = sha256(opId ‖ 0x00 ‖ arity ‖ 0x00 ‖ argKinds.join(","))
```

G-2 compares **registries, not counts** (`W2.md` §6 G-2): the check is (i) same length, (ii) same
order, (iii) `fingerprint[i]` equal pairwise, (iv) `jsSymbol[i]` and `wasmOpcode[i]` both present
and non-null. **The v12 shape — 18 declared predicate ids over a 20-formula domain, misbound not
absent — fails (iii) even when (i) passes**, which is the whole point: a bijection that is "18 of
20" passes a naive count check and must fail this one. A **hole is declared, never absent**: an
operator with no Wasm opcode is written into the registry with `wasmOpcode: DECLARED-ABSENT` and a
named reason, so the pairing is visibly broken rather than silently short.

---

## 6. The six equality products, each with its stated comparison

The products are `W2.md` §3b's (ratified there over both blind arms); what this arm contributes is
the **comparison mechanism** per product and a falsifier per product.

| id       | product             | comparison as this draft states it                                                                                                                                                                                                                         | "exact" means                                                                          | the falsifier this comparison must survive                                                                                                                                                                                                                                                                                                                                                       |
| -------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **EQ-1** | semantic value `V`  | canonical structural serialization with **key order = `REG-CTOR` field order** (not insertion order); numbers written in the 17-significant-digit round-trip form, with minus-zero and `NaN` given distinct spellings; byte-compare the two serializations | **bit-for-bit f64 via `Object.is`** — minus-zero differs from zero, `NaN` equals `NaN` | `===` passes a candidate that disagrees on minus-zero. Measured at this seat: `0 === -0` is **true**, `Object.is(0,-0)` is **false**, `NaN === NaN` is **false**, `Object.is(NaN,NaN)` is **true** (**A.5**). A comparison built on `===` cannot see either defect                                                                                                                               |
| **EQ-2** | byte complement `C` | ordered list equality on `(offset, length, kind)`; **and** `weave` round-trips on both sides                                                                                                                                                               | same order, same triples                                                               | a candidate that merges two adjacent spans of different `kind` into one passes a `weave`-only check and fails the triple check — the kinds exist to be disagreed about                                                                                                                                                                                                                           |
| **EQ-3** | provenance `P`      | ordered `(start,end)` array equality, index by index                                                                                                                                                                                                       | leaf **construction order** must match                                                 | a candidate that builds `V` bottom-up in one lowering and top-down in the other produces identical `V` and different `P`; EQ-1 alone would pass it                                                                                                                                                                                                                                               |
| **EQ-4** | diagnostics `D`     | ordered **structural** equality over `code` / `start` / `end` / `expected[]` / `actual`                                                                                                                                                                    | never rendered strings                                                                 | rendered messages differ across a JS and a Wasm backend by number formatting and locale alone. **Measured hazard, live**: the pinned published module transports a `ColorIssue` code (`color_out_of_range`) inside `ParseIssue.expected[]`, a label slot (**A.8**). A candidate whose labels exist **only** under an armed-diagnostics mode reads diagnostics-**ABSENT** and fails (CL-PT01, §9) |
| **EQ-5** | rollback            | post-failure state equality on five coordinates — `offset`, `len(D)`, `len(C)`, `len(P)`, and the Wasm arena watermark — each compared to the pre-`MARK` snapshot                                                                                          | value equality only; **cost asymmetry is declared, not equalized**                     | a candidate that restores `offset` but not `len(C)` leaks a span into the complement and then passes COMP-1 _by accident_ on the next input; comparing all five coordinates is what catches it                                                                                                                                                                                                   |
| **EQ-6** | malformed inverse   | COMP-1 (§4, all three sub-conditions) over every `ok:false` input of the corpus                                                                                                                                                                            | `weave(V,C,P) === S` for every rejection                                               | a candidate that skips malformed bytes without entering `C` fails COMP-1a and names the interval; a candidate that double-covers fails COMP-1b. One law, two distinguishable failures                                                                                                                                                                                                            |

**Comparison mechanism, one sentence.** A canonical structural serialization per product,
byte-compared — so a product's comparison is itself a value and can be pasted into evidence.

---

## 7. The five recovery laws, each with a falsifiable probe

Recovery is an **algebra operation** (`RECOVER`, `MARK`, `DEPTH`), never backend behaviour: K-4
kills any candidate whose recovery is expressible only backend-side, and G-2's registry makes the
claim structural before it is behavioural.

| id          | law                                                                                                                                                                                                                                                                                                                     | probe (executable shape)                                                                                                                                             | what the probe must be able to catch                                                                                                                                                                                                                                                                                                                                                     |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **R-LAW-1** | **Rollback exactness.** On failure inside `MARK`, the restored state equals the pre-mark state in `offset`, `len(D)`, `len(C)`, `len(P)`, and the Wasm arena watermark. The lowerings may differ in **cost** — arena truncation against an allocation-free failing path — never in value; the asymmetry is **declared** | for every corpus row, snapshot the five coordinates before the outermost `MARK` and assert equality after a forced failure; print the five-tuple pair on mismatch    | a lowering that restores four of five coordinates. The probe fails on the coordinate, naming it                                                                                                                                                                                                                                                                                          |
| **R-LAW-2** | **Complement conservation.** Bytes skipped by recovery enter `C`; they never vanish. COMP-1 holds on malformed input                                                                                                                                                                                                    | run COMP-1a/b/c over the malformed corpus and print, per failure, the uncovered or doubly-covered interval                                                           | a lowering that "recovers" by advancing `offset` without a `SKIP`. COMP-1a names the interval                                                                                                                                                                                                                                                                                            |
| **R-LAW-3** | **Diagnostic purity.** A diagnostic is a value appended to `D`, **never an effect**                                                                                                                                                                                                                                     | monkey-patch `console.error` **and** `console.warn` to **throw**, then run the full corpus in both lowerings; a lowering that prints cannot pass                     | exactly the PT-01 coupling, made unpassable. Measured at this seat as a **positive control on the probe itself**: the pinned published module over an 11-row corpus gives **11 clean, 0 printed** (**A.5**), while the clone-point substrate prints unconditionally once armed (`parser.ts:66-68`, **A.7**) — so the probe is known to be able to fire, and known not to fire spuriously |
| **R-LAW-4** | **Non-amplification and progress.** `N` malformed sites yield exactly `N` diagnostics; `sync` must consume at least one byte or recovery does not re-enter                                                                                                                                                              | run with a `sync` that matches at **offset 0 of the failure** — the degenerate case — and assert (a) termination under a wall-clock bound, (b) `len(D) == N`         | a lowering that hangs, or emits N-squared diagnostics. The substrate already carries the mechanism this law names: `recover` raises a `RecoveryNonProgress` fault when `state.offset === checkpoint` (`parser.ts:707-711`, **A.7**) — **the mechanism exists, the assertion does not**, which is precisely the gap this law closes                                                       |
| **R-LAW-5** | **The `alt`/`recover` interaction, declared.** A recovered branch is a **success** for the enclosing choice, so a first arm that recovers **starves** the second                                                                                                                                                        | static check over the term: for every `ALT`, walk each non-final arm for a reachable `RECOVER`; the declared policy (@REG-POLICY) must be present on every such site | a "lenient" parser that silently stops being total. Leaving the rule undeclared is the failure; this draft's position is stated below                                                                                                                                                                                                                                                    |

**This draft's R-LAW-5 position, stated rather than deferred.** The default policy is
**`recover-final-only`**: `RECOVER` is admissible only in the **final** arm of an enclosing `ALT`.
The alternative — `recover-declared`, admitting recovery in a non-final arm when the arm carries an
explicit declaration — is retained in REG-POLICY for the one construct that genuinely needs it (the
malformed qualified rule inside a `REP` over stylesheet items, where the recovering arm _is_ the
last resort but sits inside a loop, not inside a choice). `.c` should rule which is normative; the
cost of the rejected reading is: `recover-final-only` forbids a legal grammar shape and forces a
rewrite through `REP`; `recover-declared` admits an arm ordering whose totality depends on a
declaration a reviewer must read rather than a structure a walk can check.

---

## 8. The 52 to named-production map (set-difference empty both ways)

**Three production classes and one carrier class**, because collapsing them would be the dishonest
map. **P** = parse production (`S` to `(V,C,P,D)`) · **W** = weave-projection (`V` to `S′`, the
C-free direction) · **X** = value projection (`V` to `V′`, **consumes zero input bytes**) · **V** =
vocabulary (codomain of a REG-CTOR constructor) · **K** = algebra carrier.

**Measured (A.9), double-run identical:** universe 52 · mapped 52 · universe-minus-map **EMPTY** ·
map-minus-universe **EMPTY** · distinct production names **52** · duplicates **0** · by class
`{V:31, K:2, P:10, W:2, X:7}` (types 31+2 = 33, runtime 10+2+7 = 19) · **declared holes: 1**.

| #   | export                       | kind    | slice      | production                       | class | bound by                     | note                                                                                                          |
| --- | ---------------------------- | ------- | ---------- | -------------------------------- | ----- | ---------------------------- | ------------------------------------------------------------------------------------------------------------- |
| 1   | `AnimationRangeValue`        | type    | types      | **V:animation-range-value**      | V     | EMIT/range-value             | codomain of P:animation-range                                                                                 |
| 2   | `AnimationTimelineValue`     | type    | types      | **V:animation-timeline-value**   | V     | EMIT/timeline-value          | codomain of P:animation-timeline                                                                              |
| 3   | `AnimationTriggerValue`      | type    | types      | **V:animation-trigger-value**    | V     | EMIT/trigger-value           | **HOLE-1 DECLARED**: no entry production returns it; reached only through X:animation-options                 |
| 4   | `CSSAnimationOptions`        | type    | types      | **V:animation-options**          | V     | EMIT/animation-options       | codomain of X:animation-options                                                                               |
| 5   | `CSSPropertyDescriptor`      | type    | types      | **V:property-descriptor**        | V     | EMIT/property-descriptor     | built inside P:stylesheet item kind `property`                                                                |
| 6   | `CSSTimelineOptions`         | type    | types      | **V:timeline-options**           | V     | EMIT/timeline-options        | codomain of X:timeline-options; domain of W:timeline-options                                                  |
| 7   | `CollectedRule`              | type    | types      | **V:collected-rule**             | V     | EMIT/collected-rule          | the X-class projection envelope                                                                               |
| 8   | `CssColor`                   | type    | types      | **V:color**                      | V     | EMIT/color                   | codomain of P:color; domain of W:color                                                                        |
| 9   | `CssColorSpace`              | type    | types      | **V:color-space**                | V     | DISPATCH/color-head          | the closed key domain of the colour head table (**13**, measured)                                             |
| 10  | `CssLinearStop`              | type    | types      | **V:linear-stop**                | V     | EMIT/linear-stop             | inside P:timing-function arm `linear-function`                                                                |
| 11  | `CssTimingFunction`          | type    | types      | **V:timing-function**            | V     | EMIT/timing-function         | codomain of P:timing-function (4 kinds, `types.ts:33-36`)                                                     |
| 12  | `CustomFunctionDescriptor`   | type    | types      | **V:custom-function-descriptor** | V     | EMIT/custom-fn-descriptor    | inside P:stylesheet item kind `function`                                                                      |
| 13  | `CustomFunctionParameter`    | type    | types      | **V:custom-function-parameter**  | V     | EMIT/custom-fn-parameter     | inside P:stylesheet item kind `function`                                                                      |
| 14  | `CustomFunctionRule`         | type    | types      | **V:custom-function-rule**       | V     | EMIT/custom-fn-rule          | P:stylesheet item kind `function`                                                                             |
| 15  | `Declaration`                | type    | types      | **V:declaration**                | V     | EMIT/declaration             | domain of X:declarations                                                                                      |
| 16  | `KeyframeRule`               | type    | types      | **V:keyframe-rule**              | V     | EMIT/keyframe-rule           | P:stylesheet item kind `keyframes`                                                                            |
| 17  | `KeyframeSelector`           | type    | types      | **V:keyframe-selector**          | V     | EMIT/keyframe-selector       | codomain of P:keyframe-selector                                                                               |
| 18  | `KeyframesBlock`             | type    | types      | **V:keyframes-block**            | V     | EMIT/keyframes-block         | P:stylesheet item kind `keyframes`                                                                            |
| 19  | `ParseIssue`                 | type    | types      | **K:D-element**                  | K     | NOTE                         | **CARRIER, not a production**: the `D` journal's element type (8 codes, `types.ts:10-24`)                     |
| 20  | `ParseResult`                | type    | types      | **K:result-envelope**            | K     | the algebra's own projection | **CARRIER**: the `(ok, V, D)` projection; `C` and `P` are **not** exported                                    |
| 21  | `PropertyRule`               | type    | types      | **V:property-rule**              | V     | EMIT/property-rule           | P:stylesheet item kind `property`                                                                             |
| 22  | `RangeBoundary`              | type    | types      | **V:range-boundary**             | V     | EMIT/range-boundary          | inside P:animation-range                                                                                      |
| 23  | `RangePhase`                 | type    | types      | **V:range-phase**                | V     | MAPCONST/range-phase         | closed keyword table                                                                                          |
| 24  | `ScrollTimelineDescriptor`   | type    | types      | **V:scroll-timeline-descriptor** | V     | EMIT/scroll-timeline         | P:stylesheet item kind `scroll-timeline`                                                                      |
| 25  | `ScrollerKeyword`            | type    | types      | **V:scroller-keyword**           | V     | MAPCONST/scroller            | closed keyword table                                                                                          |
| 26  | `StyleRule`                  | type    | types      | **V:style-rule**                 | V     | EMIT/style-rule              | P:stylesheet item kind `style`                                                                                |
| 27  | `Stylesheet`                 | type    | types      | **V:stylesheet**                 | V     | EMIT/stylesheet              | codomain of P:stylesheet                                                                                      |
| 28  | `StylesheetItem`             | type    | types      | **V:stylesheet-item**            | V     | DISPATCH/item-head           | the closed union DISPATCH emits (**9**, measured)                                                             |
| 29  | `TimelineAxis`               | type    | types      | **V:timeline-axis**              | V     | MAPCONST/axis                | closed keyword table                                                                                          |
| 30  | `TimelineScopeValue`         | type    | types      | **V:timeline-scope-value**       | V     | EMIT/timeline-scope          | timeline descriptor arm                                                                                       |
| 31  | `TriggerType`                | type    | types      | **V:trigger-type**               | V     | MAPCONST/trigger-type        | closed keyword table                                                                                          |
| 32  | `ViewInset`                  | type    | types      | **V:view-inset**                 | V     | EMIT/view-inset              | inside P:animation-timeline                                                                                   |
| 33  | `ViewTimelineDescriptor`     | type    | types      | **V:view-timeline-descriptor**   | V     | EMIT/view-timeline           | P:stylesheet item kind `view-timeline`                                                                        |
| 34  | `parseCssColor`              | runtime | grammar    | **P:color**                      | P     | entry                        | **SLICE ROW** (§3d): head DISPATCH · hex · 148 named · rgb/hsl legacy and modern · oklch · `var()` · GROUND-A |
| 35  | `parseCssScalar`             | runtime | grammar    | **P:scalar**                     | P     | entry                        | calls P:color first — the R1 blast radius (`GROUND-A-denominator.md:209-210`)                                 |
| 36  | `parseCssValue`              | runtime | grammar    | **P:value**                      | P     | entry                        | —                                                                                                             |
| 37  | `parseCssValues`             | runtime | grammar    | **P:value-list**                 | P     | entry                        | `REP(P:value, sep)`                                                                                           |
| 38  | `parseKeyframeSelector`      | runtime | grammar    | **P:keyframe-selector**          | P     | entry                        | —                                                                                                             |
| 39  | `parseTimingFunction`        | runtime | grammar    | **P:timing-function**            | P     | entry                        | **SLICE ROW** (§3d): all four kinds — the second value shape                                                  |
| 40  | `serializeCssColor`          | runtime | grammar    | **W:color**                      | W     | weave-projection             | `V` to `S′`; returns `Result<string, ColorIssue>` — **a different issue union** (§10 DM-3)                    |
| 41  | `coerceToSyntax`             | runtime | syntax     | **P:syntax-coerce**              | P     | entry, parameterised         | **two inputs** `(source, syntax)`: a production parameterised by a syntax descriptor                          |
| 42  | `parseAnimationRange`        | runtime | timeline   | **P:animation-range**            | P     | entry                        | —                                                                                                             |
| 43  | `parseAnimationTimeline`     | runtime | timeline   | **P:animation-timeline**         | P     | entry                        | —                                                                                                             |
| 44  | `serializeTimelineOptions`   | runtime | timeline   | **W:timeline-options**           | W     | weave-projection             | `V` to a frozen record; the C-free direction                                                                  |
| 45  | `collectAnimationOptions`    | runtime | stylesheet | **X:animation-options**          | X     | value-projection             | `Declaration[]` to `CSSAnimationOptions[]`; **zero input bytes**                                              |
| 46  | `collectCustomFunctions`     | runtime | stylesheet | **X:custom-functions**           | X     | value-projection             | `Stylesheet` to `CollectedRule<CustomFunctionRule>[]`                                                         |
| 47  | `collectDeclarations`        | runtime | stylesheet | **X:declarations**               | X     | value-projection             | `Declaration[]` to `ReadonlyMap`                                                                              |
| 48  | `collectKeyframes`           | runtime | stylesheet | **X:keyframes**                  | X     | value-projection             | `Stylesheet` to `CollectedRule<KeyframesBlock>[]`                                                             |
| 49  | `collectPropertyDescriptors` | runtime | stylesheet | **X:property-descriptors**       | X     | value-projection             | `Stylesheet` to `CollectedRule<PropertyRule>[]`                                                               |
| 50  | `collectStyleRules`          | runtime | stylesheet | **X:style-rules**                | X     | value-projection             | `Stylesheet` to `CollectedRule<StyleRule>[]`                                                                  |
| 51  | `collectTimelineOptions`     | runtime | stylesheet | **X:timeline-options**           | X     | value-projection             | `Declaration[]` to `CSSTimelineOptions`                                                                       |
| 52  | `parseStylesheet`            | runtime | stylesheet | **P:stylesheet**                 | P     | entry                        | **SLICE ROW** (§3d): ONE malformed qualified rule under COMP-1                                                |

**Holes declared, never absent** (the v12 lesson: _an unbound formula does not go missing, it
misbinds the next one_):

- **HOLE-1 — `AnimationTriggerValue`.** No entry production returns it; it is reachable only through
  the **X** projection `collectAnimationOptions`. Declared as an X-reachable vocabulary row, with
  its route written into the row. It is **not** an absence, and it is not silently attached to a
  neighbouring production.
- **The X class is a declared non-parse class.** Seven runtime exports consume **no input bytes**.
  Mapping them to parse productions to make a table look total would be exactly the misbinding the
  v12 arc produced. They are mapped to named **projections** instead, and G-6's reporter must carry
  the class column or its "TOTAL" verbs will mean two different things in one table.
- **The two K rows** (`ParseIssue`, `ParseResult`) are the algebra's own carriers. A contract that
  maps them to productions has mapped the ruler to the thing measured.

**G-6 posture (`W2.md` §6 G-6, L741-754): this map REPORTS, it does not cure.** The inherited
baseline stands as the wave received it, and the fresh root's own distance re-measured at this seat
is **0 TOTAL / 0 PARTIAL / 52 ABSENT** (`p2-native`, **A.2**). 52/52 TOTAL is the band's staged
CLOSE gate; a W2 claiming it has overreached by definition.

---

## 9. The §3 debt clauses, folded as contract clauses with their cites

Each row is a **clause of the contract**, not advice. "Cite" is the provenance; "measured" is this
seat's own re-measurement.

| clause      | the debt, as a clause                                                                                                                                                                                                                                    | cite                                                                                                                           | measured at this seat                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **CL-D1**   | Failures are **labelled zero-width failures with named expectations**; an opaque `(?!)`-shaped failure is inadmissible. `FAIL` and `EXPECT` take at least one label; an empty label list is not constructible                                            | `W2.md` §3 L158 (debt 1); `parser-band.md` _"WHAT CAND-O OWES CAND-F"_ item 1 — _"`expected: ["<named-color>"]` beats `(?!)`"_ | the incumbent's live distance: over a 27-row malformed corpus at the pinned bytes, **25 rejections — 6 with `expected: []`**, 18 named, and **1 carrying a `ColorIssue` code in the label slot** (**A.8**)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| **CL-D2**   | The **reject path is its own measured leg**, in both lowerings, and is never averaged into an accepted-path number                                                                                                                                       | `W2.md` §3 L159 (debt 2); band item 2                                                                                          | not re-derived here — G-7's table and W1's bar ledger own the arithmetic (epoch rule). The clause this draft adds: **a reject-path number without its own row is not a number**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| **CL-D3**   | **Recursion is bounded by construction**: `DEPTH(T, N)` is the only re-entrant operator and its bound is an **algebra parameter**. A try/catch shield may exist **only** if proven non-load-bearing by the raw-`parseState`-over-corpus instrument (K-7) | `W2.md` §3 L159-160 (debt 3), §6 G-11, O-15 PT-04; band item 3                                                                 | **three different ceilings, three shapes, one substrate** (**A.7**): a linear chain of 1,048,575 `Parser.lazy` terms parses without failing; the self-referential back-edge (`v(` … `)` around a terminal) fails at **257** and succeeds at **256**, stable across two runs; and the cause is a **named constant in the substrate** — `NESTING_LIMIT = 256` at `typescript/src/parse/state.ts:51`, enforced in `enterLazy()` at `:111-124`, which sets a `Nesting` fault and **returns a failure, not a `RangeError`**. The inherited coordinates (`W2.md` §6 G-11's **7,761**; W1's measured **7,759**) are a _third_ shape. **Conclusion, and the reason the clause reads as it does: the emergent ceiling is shape-dependent by roughly thirtyfold and instrument-dependent at the boundary, so it cannot be a contract property. Only a declared parameter can be** |
| **CL-D4**   | `scale(num, den)` is written **`(value * num) / den`**, never a folded factor. `SCALE` has no single-argument form                                                                                                                                       | `W2.md` §3 L160-161 (debt 4); band item 4 — _"2.55 is inexact in binary; 100% must be exactly 255"_                            | re-derived exactly: over the 1001 values 0, 0.1, … 100, **`v * 0.01` differs from `v / 100` for 114** of them; first five `3.1 6.2 12.4 16.7 17.5` (**A.6**)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| **CL-D5**   | The **GROUND-A empty-arg class is a generated cross-product**, not a literal list, and is part of every candidate's corpus                                                                                                                               | `W2.md` §3 L161 (debt 5); `GROUND-A-denominator.md:207`                                                                        | **21 × 10 = 210-member sub-language**, quoted at the byte (**A.4**); the R1 probe's own corpus is a _different_ generated cross-product — **18 heads × 9 bodies + 10 base = 172**, and 172 × 9 functions = **1,548 calls** (**A.4**), which reproduces `W2.md` §6 G-5's header arithmetic exactly                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| **CL-PT01** | **Diagnostics are algebra products that may never ride an armed-diagnostics path.** `NOTE` appends a value; no operator prints. A candidate whose labels exist only under an armed mode reads diagnostics-ABSENT and fails EQ-4                          | `W2.md` §3 L161-162, INBOX O-15 PT-01                                                                                          | the coupling reproduces **at the clone-point bytes**: `typescript/src/parse/parser.ts:66-68` — `if (isDiagnosticsEnabled()) { console.error(errorState.toString()); }`, with `diagnosticsEnabled = false` at `utils.ts:6` (**A.7**). Arming the labels arms an unconditional **effect**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| **CL-O8**   | **No one-way global latch of any kind.** No operator reads or writes process-global mutable state; arming, memoization and diagnostics are **parameters of a parse**                                                                                     | `W2.md` §3b L253-257 (O-8), O-15 PT-03                                                                                         | the counter-example is in the substrate, at the bytes: `PACKRAT_ARMED` declared `let … = false` at `packrat.ts:158`, read at `:224` and `:273`, set true at `:297`, with `resetPackrat()` at `:269` (**A.7**). The rationale the law needs: **no algebra with a global absorbing state can satisfy EQ-1 across two lowerings that arm at different times**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| **CL-PT07** | **Non-string inputs die at a named JS-boundary invariant ABOVE the algebra.** `BOUNDARY-1`: the entry wrapper asserts `typeof S === "string"` and returns the frozen failure shape; no algebra operator ever sees a non-string                           | `W2.md` §3 L162, O-15 PT-07                                                                                                    | reproduced **twice, both substrates** (**A.5**, **A.7**): the pinned published `parseCssColor` throws a raw `TypeError` on **7 of 7** non-string shapes; the clone-point substrate throws on 7 of 7 with three distinct messages. And the second half of PT-07 reproduces too — `Parser.parse()` returns `undefined` for a real failure **and** for a successful parse whose value is `undefined`, indistinguishable (**A.7**). `ParseResult`'s non-empty tuple (O-NONEMPTY, §3) is the frozen contract's own cure, and `BOUNDARY-1` is its entry half                                                                                                                                                                                                                                                                                                                  |

---

## 10. Declared marks — carried as rows, never silently picked

Every row has an **owner-escalation path**. No seat may rule any of these; a candidate that picks
one silently has re-litigated a ruled matter or pre-empted an owner.

| id       | mark                                                                                               | this draft's declared position                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | measured today                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | escalation path                                                                                                                                                                                                                                                                                                                     |
| -------- | -------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **DM-1** | runtime `Object.freeze` on `V` — normative or not?                                                 | **NORMATIVE**, with the freeze cost measured as its own bench leg (G-8) rather than assumed. Rationale: the frozen contract's types are `Readonly<…>` throughout, and an unfrozen `V` makes EQ-1 comparisons order-dependent on consumer mutation                                                                                                                                                                                                                                                                                       | the shipped 4.0.0 **already freezes**: `Object.isFrozen(value)` is **true** on 7 of 7 sampled `V` — colour three times, timing-function four times (**A.5**). Cand-O paid 1.01–1.02 times for it (band, cited)                                                                                                                                                                                                                                                                  | if the freeze leg is materially costly, the owner rules; the contract states the alternative (`freeze-at-boundary-only`) so the rejected reading is written down, not erased                                                                                                                                                        |
| **DM-2** | token juxtaposition width — the band's **token-stream reading**, held as a DECLARED divergence row | **carry the band's reading**, and carry the dissent verbatim; do **not** settle it in W2                                                                                                                                                                                                                                                                                                                                                                                                                                                | the three adjudicated juxtaposition rows at the pinned bytes: `rgb(50%20%30%)` is **ok:false `css_syntax`**, `hsl(120 50%50%)` is **ok:false `css_syntax`**, `rgb(1.5.5 3)` is **ok:false `css_syntax`** (**A.5**). The incumbent is **strict** on all three                                                                                                                                                                                                                    | owner; _"the owner may still overrule toward strictness — the dissent is preserved, not settled"_ (`W2.md` §3d L423)                                                                                                                                                                                                                |
| **DM-3** | **non-finite numeral posture — and a cross-union binding gap this seat found**                     | the band adjudicates _"`color_non_finite` on unclamped non-finite"_. **But `color_non_finite` is not a `ParseIssue` code.** It is one of the **7** `ColorIssue` codes at `src/color/model.ts:29-37`; the frozen `D` journal admits only the **8** `ParseIssue` codes. **A `ParseIssue` with `code: "color_non_finite"` is not constructible.** This draft declares the posture as: reject at parse time with `css_syntax`, **and** carry the colour-domain reason in `expected[]` only if the owner rules that the slot may carry codes | measured (**A.3**, **A.5**, **A.8**): the two unions are disjoint sets of 8 and 7; `src/css/grammar.ts:295` returns `err({code:"color_non_finite"})` from `serializeCssColor` — a `Result<string, ColorIssue>`, not a `ParseResult`; at the pinned bytes `lab(50 1e400 0)` gives **`css_syntax` with `expected: []`**, and `rgb(0 0 0 / 200%)` gives **`css_syntax` with `expected: ["color_out_of_range"]`** — a `ColorIssue` code already riding a label slot in shipped code | **owner**, and this is the sharpest of the four: the band's adjudication and the frozen union do not compose, and a candidate that "implements the adjudication" will have invented a ninth code or smuggled one through `expected[]`. Escalate **before** phase 4 dispatches, so three seats do not each invent a different answer |
| **DM-4** | the try/catch shield posture                                                                       | a shield may exist **only** if proven non-load-bearing by the raw-`parseState`-over-corpus instrument (K-7). This draft's position: **no shield**, because `DEPTH`'s bound makes the only known unbounded route a returned failure                                                                                                                                                                                                                                                                                                      | the substrate's own depth route already returns a failure rather than throwing (`enterLazy` raises a `Nesting` fault, **A.7**) — so a shield would be non-load-bearing _for that route_ and load-bearing for nothing else yet named                                                                                                                                                                                                                                             | owner if any candidate needs one; K-7 kills a shield that is load-bearing                                                                                                                                                                                                                                                           |

**One further declared row, carried from W1's R-9 rather than re-decided here.** The third
differential cell (the vendored, sha-pinned published 4.0.0) has two known divergences from cand-O,
and both reproduce at this seat (**A.5**): `parseCssColor("color-mix(in oklch, red, blue)")` is
**`ok:false css_syntax`** (A-F2) and `parseStylesheet("@@@ { }")` is **`ok:true`** (D-F2). They are
**declared third-cell divergence rows**, never silent expectations, and never a candidate's bug.

---

## 11. The shared slice (§3d), and what it forces the operator set to prove

The slice is identical across candidates — a corpus asymmetry is a self-authored answer key
(`W2.md` §3d L409). What this draft adds is the mapping from each slice limb to the operators it
exercises, so a candidate cannot pass the slice while leaving an operator unproven.

| slice limb (`W2.md` §3d, L411-422)                                                    | operators it forces                                            | why it is in the slice                                                                                                                                                                                                                    |
| ------------------------------------------------------------------------------------- | -------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `parseCssColor` head dispatch over the full production set                            | `DISPATCH` (no default arm), `CLASS`, `IDENT`                  | the closed-union law under load                                                                                                                                                                                                           |
| hex (3/4/6/8)                                                                         | `CLASS`, `NUM`, `SCALE`, `EMIT`                                | `SCALE`'s exactness on the percentage-to-255 conversions                                                                                                                                                                                  |
| the **148** named colours plus the `transparent` / `currentcolor` context posture     | `MAPCONST` (148-row null-prototype table), `NOTE`              | measured: the 148-row table is closed and **does not contain** `transparent` or `currentcolor` (**A.6**) — the two are context keywords, and `color_context_required` is one of the frozen 8 codes for exactly that reason                |
| `rgb()`/`rgba()` and `hsl()`/`hsla()` in **both** legacy-comma and modern-slash forms | `ALT`, `COMMIT`, `SKIP(separator)`                             | the separator choice is a `C` fact, not a `V` fact — EQ-2's first real test                                                                                                                                                               |
| `oklch()` — the R1 crash family's representative                                      | `NUM`, `FAIL`, `COMMIT`                                        | measured live at the pinned bytes: `parseCssColor("oklch()")` **throws** `TypeError: Cannot read properties of undefined (reading 'replace')`, and so do `rgb()`, `hwb( )`, `foo()` and `color()` — **5 of 5** (**A.5**). The named enemy |
| ONE context node (`var()`)                                                            | `DEPTH`                                                        | the only back-edge in the slice                                                                                                                                                                                                           |
| the GROUND-A empty-arg cross-product                                                  | `FAIL`, `DISPATCH`                                             | 210 rows, all of which must be `ok:false` with a named expectation (CL-D1)                                                                                                                                                                |
| `parseTimingFunction` **whole** — all four kinds (`types.ts:32-36`)                   | `DISPATCH`, `NUM`, `REP`, `EMIT` with four constructors        | proves the algebra is **not colour-shaped**. Measured shapes at the pinned bytes: `{kind,name}` · `{kind,x1,y1,x2,y2}` · `{kind,count,position}` · `{kind,stops}` (**A.5**)                                                               |
| ONE malformed qualified rule satisfying COMP-1                                        | `MARK`, `RECOVER`, `SKIP(skipped-malformed)`, `NOTE`, `COMMIT` | the recovery scenario: trailing-garbage resync to a declared synchronization point                                                                                                                                                        |
| the malformed-inverse product on **every** rejected input                             | COMP-1a/b/c                                                    | EQ-6                                                                                                                                                                                                                                      |

**Expected values inherit the band adjudications verbatim**: hue **unwrapped** at parse time (the
incumbent returns `hsl(480 50% 50%)` with channels `[480, 0.5, 0.5]`, measured, **A.5**); clamps per
§8.1/§4.2 — and note that the incumbent does **not** clamp `rgb(300 0 0)`, returning `[300,0,0]`
(measured), so "clamp" is a declared position with a measured incumbent divergence, not an assumed
default; `color_non_finite` on unclamped non-finite **subject to DM-3**; juxtaposition per DM-2.

---

## 12. No CST — the discriminator, and the construct that tests it

**NC-TEST (the discriminator).** An artifact is a CST carrier iff **some node type has a field whose
type is another artifact node type _and_ whose population depends on the incidental bytes of the
input** — trivia, punctuation, spelling, separator choice. Equivalently: a CST is `(V, C)` fused.
The algebra's answer is structural, in three parts:

1. **No operator constructs a node that refers to another operator's node.** `EMIT` builds a `V`
   node from REG-CTOR; its fields are the frozen types' fields. There is no `AlgebraNode` type
   anywhere in this draft.
2. **Every incidental byte is in `C`, reachable only through `SKIP`** — so the artifact that _could_
   be a CST (`V`) provably cannot be: it has nowhere to put trivia, and COMP-1a/b makes that
   checkable rather than asserted.
3. **`V` is assignable to the frozen `/css` types under an excess-property check** (G-10's second
   half). The easy way to satisfy no-CST is to make `V` `any`-shaped; both halves are required.

**The construct that tests the discriminator, named rather than hidden.** `StylesheetItem` is
_recursive_: the `scope` and `starting-style` arms carry `children: readonly StylesheetItem[]`, and
`Stylesheet = readonly StylesheetItem[]` (`types.ts:118-128`, measured, **A.3**). A careless reading
says "V is a tree, therefore CST". It is not: the recursion mirrors the **specified nesting of the
language's semantics** (`@scope` genuinely contains rules), and **not one incidental byte lives in
it** — every brace, every space, every comment between two nested items is in `C`. NC-TEST
discriminates correctly: the field's type is another _frozen contract_ type, not another _artifact_
node type, and its population depends on the specified structure, not on the spelling. **A draft
that declared `V` non-recursive to look clean would be declaring the frozen contract wrong.**

---

## 13. Anchor verification, and the drift record

`W2.md`'s own anchors were verified at true bytes **before** being cited (the method's requirement;
a drifted anchor gets INTENT at the true bytes, recorded). **All four hold; zero drift in the spec's
own cites:**

| spec cite                                                    | claim                                | at true bytes today                                                                                     | verdict   |
| ------------------------------------------------------------ | ------------------------------------ | ------------------------------------------------------------------------------------------------------- | --------- |
| `src/css/index.ts:36-60` (19 runtime) and `:1-35` (33 types) | the 52 universe                      | 33 type names in the `:1-35` block, 19 runtime names in `:36-60`; total 52                              | **HOLDS** |
| `src/css/types.ts:10-24`                                     | the frozen 8-code `ParseIssue` union | `export type ParseIssue = Readonly<{` at `:10`, its closing brace at `:24`, 8 code literals at `:12-19` | **HOLDS** |
| `src/css/types.ts:27`                                        | the non-empty failure tuple          | `:27` is exactly the `ok: false` arm carrying `readonly [ParseIssue, ...ParseIssue[]]`                  | **HOLDS** |
| `src/css/types.ts:32-36`                                     | `CssTimingFunction`'s four kinds     | declaration at `:32`, the four `kind:` arms at `:33`, `:34`, `:35`, `:36`                               | **HOLDS** |

**One drift found, in a gate's supporting coordinate, recorded with INTENT at the true bytes:**

- `W2.md` §6 **G-4**'s born-RED row cites _"the substrate's `recover`
  (`typescript/src/parse/parser.ts:653`, clone point and master alike)"_. At the clone-point bytes in
  `<p2>`, `recover(` is at **`parser.ts:679`** — its doc comment opens at `:671` and its body runs to
  `:723`. **INTENT at the true bytes: `typescript/src/parse/parser.ts:679-723`.** The gate's
  _substance_ is unaffected and re-measured here: the substrate's `recover` carries the
  **mechanisms** (checkpoint, rollback, diagnostic collection, and a `RecoveryNonProgress` fault at
  `:707-711`) and **no assertion** of rollback-exactness, conservation, purity or non-amplification —
  which is what G-4's row says. The line coordinate alone moved.

---

## 14. Residuals, and what this draft refuses to decide

**For `.c` to rule** (each stated so the rejected reading has a cost, per §5 `.c`'s mechanism):

- **Q-B1 — the operator count.** This arm proposes **22**. If the other arm proposes fewer by fusing
  `NUM` and `IDENT` into `CLASS`, the cost is that the numeric edges (`1.`, `1e400`, minus-zero)
  become lowering accidents rather than algebra decisions, and CL-D4's exactness has no operator to
  live on. If it proposes more by splitting `MARK` and `RECOVER`, the cost is a larger bijection
  registry with more misbinding surface.
- **Q-B2 — R-LAW-5's policy.** `recover-final-only` (this arm's default) against `recover-declared`.
  The cost of each is written in §7.
- **Q-B3 — DM-3, the `color_non_finite` cross-union gap.** This is not a preference; it is a measured
  contradiction between the band's adjudication and the frozen 8-code union (§10). **It should reach
  the owner before phase 4 dispatches**, or three candidate seats will each invent a different ninth
  code.
- **Q-B4 — the X class in G-6's reporter.** Seven runtime exports consume zero input bytes. If the
  coverage reporter carries one verb column for both classes, "TOTAL" means two different things in
  one table. This draft asks for a class column; the cost of refusing is a report that reads total
  while nothing parsed.

**Explicitly refused by this seat** (they belong to other seats or to the owner): any bench bar
(`W2.md` §3a's last trigger — _"an owner ask, never an orchestrator decision"_); any candidate
ranking (§3c's field is `.c`'s to fix and `.h`'s to adjudicate); any Wasm-substrate transport ruling
(OP-6, owner's); any claim about 52/52 (OP-8); any edit to W1's instruments (an edit there is a §3a
halt); any byte in `/Users/mkbabb/Programming/parse-that`, `~/.codex/**` or `~/Documents/Codex/**`.

**Non-authority, restated.** This is research evidence, not product authority (handoff §2). It
adopts no parser into value.js, adds nothing to any `package.json`, publishes nothing, and produces
no release condition.

---

## Appendix A — measurement transcript

Every command was run at this seat on **2026-09-17**, read-only. `<p2>` is
`/Users/mkbabb/Programming/parse-that-css-totality-p2`; `<vjs>` is
`/Users/mkbabb/Programming/value.js`. `git status --porcelain` in `<p2>` was **0** before and after
every command in this appendix. Nothing in `/Users/mkbabb/Programming/parse-that` was read or
written by any command here.

### A.1 — the 52, counted at the barrel

```
⟨cmd⟩ cd <vjs> && sed -n '2,34p' src/css/index.ts | grep -cE '^\s+[A-Za-z]'
33
⟨cmd⟩ sed -n '36,60p' src/css/index.ts | grep -oE '^\s{4}[A-Za-z][A-Za-z0-9]*|^export \{ [A-Za-z]+ \}' | wc -l
19
⟨cmd⟩ shasum -a 256 src/css/index.ts src/css/types.ts
c09d076ed779fedee1840c59900e0f34e5cba36c32c126ced864a849a3acf90c  src/css/index.ts
109327ce94fdcc37d57677e23e3c0bd0c8dfde399ace2998a87e2442d9338fe2  src/css/types.ts
```

### A.2 — W1's totality instrument, run unmodified (execute-no-write, R-E)

```
⟨cmd⟩ cd <p2> && node harness/totality/derive.mjs --check      EXIT=0
derived     52 exports = 33 types + 19 runtime
cross-check 51 block members + 1 single-line export = 52
manifest 52 · derived 52   EQUAL     sets  names IDENTICAL · kinds+slices IDENTICAL
GREEN — manifest 52 == derived 52 (33 types + 19 runtime); names, kinds and slices identical.

published-4.0.0  AGGREGATE (52)   51 TOTAL ·  1 PARTIAL ·  0 ABSENT   (PARTIAL: parseCssColor form:color-mix)
p2-native        AGGREGATE (52)    0 TOTAL ·  0 PARTIAL · 52 ABSENT
⟨cmd⟩ git -C <p2> status --porcelain | wc -l
       0
```

### A.3 — the three closed unions, the recursion, and the second issue union

```
⟨cmd⟩ node -e '(extract the ParseIssue code union from src/css/types.ts)'
count 8 :: css_syntax trailing_input keyframe_selector_invalid color_context_required
           syntax_descriptor_invalid syntax_mismatch animation_option_invalid timeline_option_invalid
⟨cmd⟩ node -e '(extract CssColorSpace)'
count 13 :: rgb hsl hwb lab lch oklab oklch xyz srgb-linear display-p3 a98-rgb prophoto-rgb rec2020
⟨cmd⟩ sed -n '118,128p' src/css/types.ts
118 export type StylesheetItem =
119   KeyframesBlock        120 PropertyRule        121 CustomFunctionRule
122   Readonly<{ kind: "scope"; ...; children: readonly StylesheetItem[] }>
123   Readonly<{ kind: "starting-style"; children: readonly StylesheetItem[] }>
124   Readonly<{ kind: "scroll-timeline"; ... }>    125 Readonly<{ kind: "view-timeline"; ... }>
126   StyleRule             127 Readonly<{ kind: "unknown"; ...; children?: readonly StylesheetItem[] }>;
128 export type Stylesheet = readonly StylesheetItem[];
        -> 9 members (4 named aliases + 5 inline)
⟨cmd⟩ grep -n "export type ColorIssue" -A 12 src/color/model.ts
29: export type ColorIssue = Readonly<{ code: color_invalid_input, color_non_finite,
    color_out_of_range, color_missing_channel, color_missing_alpha,
    color_progress_out_of_range, contrast_unreachable }>        -> 7 codes, DISJOINT from the 8
⟨cmd⟩ grep -rn "color_non_finite" src/ | head -3
src/css/grammar.ts:295:        return err({ code: "color_non_finite" });      (inside serializeCssColor)
src/color/model.ts:31:    | "color_non_finite"
```

### A.4 — the two generated cross-products (GROUND-A, and the R1 corpus)

```
⟨cmd⟩ sed -n '207p' docs/tranches/V/megatranche/audit/parser/GROUND-A-denominator.md
21 × 10 = **210-member** sub-language, plus a negative assertion that a non-blank body never throws.

⟨cmd⟩ node -e '(re-run the r1 probe head x body literals)'
heads 18 bodies 9 base 10 corpus 172 calls over 9 fns 1548
```

### A.5 — the third differential cell: the vendored, sha-pinned published 4.0.0

```
⟨cmd⟩ node ... (import of cand-o/vendor/value-js-4.0.0/dist/subpaths/css.js)
vendored sha256: 8b5381305ea26236326f06a38559247b2089a5be7fa78abe43640d0556320c42   == the pinned 8b5381...0c42

--- R1, the shipping crash ---
parseCssColor("oklch()")  -> THREW TypeError: Cannot read properties of undefined (reading 'replac...
parseCssColor("rgb()")    -> THREW   parseCssColor("hwb( )") -> THREW
parseCssColor("foo()")    -> THREW   parseCssColor("color()") -> THREW            5 of 5

--- the accepted control / the juxtaposition rows (DM-2) ---
"oklch(0.7 0.1 200)" ok:true   "#abc" ok:true   "rebeccapurple" ok:true
"rgb(50%20%30%)"  ok:false code:css_syntax      "hsl(120 50%50%)" ok:false code:css_syntax
"rgb(1.5.5 3)"    ok:false code:css_syntax

--- W1 R-9's declared third-cell divergences ---
parseCssColor("color-mix(in oklch, red, blue)")  ok:false code:css_syntax        [A-F2]
parseStylesheet("@@@ { }")                       ok:true                          [D-F2]

--- PT-07 at the published boundary ---
null undefined number object array symbol bigint  ->  THREW TypeError      7 of 7

--- O-NONEMPTY ---
rejections sampled 8 · with an EMPTY diagnostics tuple: 0

--- V shapes + DM-1 ---
parseCssColor oklch/hex/named   V keys: space,channels,alpha   | frozen: true
parseTimingFunction kw          V keys: kind,name              | frozen: true
parseTimingFunction cb          V keys: kind,x1,y1,x2,y2       | frozen: true
parseTimingFunction steps       V keys: kind,count,position    | frozen: true
parseTimingFunction lin         V keys: kind,stops             | frozen: true

--- EQ-1's f64 requirement ---
0 === -0 : true | Object.is(0,-0) : false | NaN === NaN : false | Object.is(NaN,NaN) : true

--- clamp / hue / non-finite postures (§11, DM-3) ---
"lab(50 1e400 0)"      ok:false code:css_syntax expected:[]
"oklch(0.5 0.1 1e400)" ok:false code:css_syntax expected:[]
"rgb(300 0 0)"         ok:true  [300,0,0] a=1          <- NOT clamped at parse time
"hsl(480 50% 50%)"     ok:true  [480,0.5,0.5] a=1      <- hue NOT wrapped (the band's reading)
"rgb(0 0 0 / 200%)"    ok:false code:css_syntax expected:["color_out_of_range"]   <- a ColorIssue CODE in a label slot

--- R-LAW-3's probe shape, as a positive control on the probe ---
console.error/warn patched to THROW · corpus 11 · clean 11 · printed 0 · other throws 0
```

### A.6 — the constant tables and the exact-scale arithmetic

```
⟨cmd⟩ node -e '(count entry-shaped lines in cand-o/named-colors.ts)'
entry lines: 148
transparent/currentcolor mentions in the table: []          <- the two are context keywords, not rows

⟨cmd⟩ node -e 'for i in 0..1000: v=i/10; count !Object.is(v*0.01, v/100)'
domain 1001 values 0,0.1,...,100 · disagreements: 114
first five: 3.1 6.2 12.4 16.7 17.5

⟨cmd⟩ wc -l  cand-o/{ast,spec,grammar,index,named-colors}.ts
112 ast.ts · 223 spec.ts · 480 grammar.ts · 200 index.ts · 194 named-colors.ts   = 1209
```

### A.7 — the clone-point substrate (`<p2>`), read only

```
⟨cmd⟩ git -C <p2> grep -c wasm32 HEAD -- rust/parse_that/     -> no output, exit 1
⟨cmd⟩ grep -rl wasm32 rust/parse_that/src | wc -l             -> 0     (OP-6: zero Wasm kernels inherited)
⟨cmd⟩ git ls-tree --name-only HEAD rust/parse_that/src/parsers/scan/ | wc -l  -> 13
⟨cmd⟩ grep -rl 'simd\|SIMD' typescript/src | wc -l            -> 0
      (the census asymmetry: 13 committed Rust scan files : 0 committed wasm32 kernels : 0 TS scan modules)
⟨cmd⟩ grep -cE '^\s{4}[a-zA-Z_]...\(' typescript/src/parse/parser.ts   -> 24 public Parser methods
      (incl. chain at :127 — present in the substrate, NOT adopted by this algebra, §5.4)

--- CL-PT01, at the bytes ---
typescript/src/parse/utils.ts:6      let diagnosticsEnabled = false;
typescript/src/parse/parser.ts:66-68 if (isDiagnosticsEnabled()) { console.error(errorState.toString()); }

--- CL-O8, at the bytes ---
packrat.ts:158  let PACKRAT_ARMED = false;      :224 / :273  if (!PACKRAT_ARMED) ...
packrat.ts:297  PACKRAT_ARMED = true;           :269  export function resetPackrat(): void

--- CL-D3, three shapes, one substrate ---
state.ts:51        const NESTING_LIMIT = 256;
state.ts:111-124   enterLazy(): if (liveDepth >= NESTING_LIMIT) { fault ??= {kind:"Nesting",...};
                                 isError = true; return false }
probe 1 (linear chain of Parser.lazy terms over one terminal):
        deepest OK 1,048,575 · no failure below the 2^20 cap
probe 5 (self-referential back-edge, read through parseState, NOT through .parse()):
        deepest OK depth : 256 · first failing depth : 257 · at the ceiling parseState THROWS: none
        double-run: deepest OK 256 — stable: true
inherited coordinates, cited not re-derived: W2.md §6 G-11 = 7,761 · W1's own measure = 7,759 (R-8)

--- CL-PT07 second half, at the bytes ---
parser.ts:74-76    parse(val) { return this.parseState(val).value }
P.parse("x")   -> "x"        P.parse("zzz")  -> undefined        (a real failure)
string("u").map(()=>undefined).parse("u") -> undefined           (a success)      INDISTINGUISHABLE
non-string x 7 -> THREW TypeError x 7, three distinct messages:
                  reading 'src' of null / of undefined / state.src.startsWith is not a function

--- R-LAW-4's mechanism, present without its assertion ---
parser.ts:679-723  recover(sync, sentinel): checkpoint / savedValue / savedDiagnostics;
                   state.rollback(...) on fault
parser.ts:707-711  if (state.offset === checkpoint) {
                       fault ??= { kind: "RecoveryNonProgress", offset: checkpoint }; ... }
```

### A.8 — the debt-1 census at the pinned bytes (deterministic: pure calls, no clock, no RNG)

```
corpus 27 · threw (R1 class) 0 · rejections 25
  expected[] EMPTY (the opaque (?!) shape, debt 1) : 6/25
  expected[] a NAMED label                          : 18/25
  expected[] carrying a ColorIssue CODE             : 1/25
samples: parseCssColor("lab(50 1e400 0)")   -> expected: []
         parseCssColor("rgb(0 0 0 / 200%)") -> expected: ["color_out_of_range"]  <- a ColorIssue CODE in a label slot
         parseTimingFunction("cubic-bezier(1)" / "steps()" / "steps(0)" / "linear()") -> expected: []
```

### A.9 — the 52-map set-difference (write-then-measure, double-run)

```
⟨cmd⟩ node map52.mjs        (the §8 table's own source; emitted, then diffed against itself)
universe 52 · mapped 52
SET-DIFFERENCE universe minus map : EMPTY
SET-DIFFERENCE map minus universe : EMPTY
by class: {"V":31,"K":2,"P":10,"W":2,"X":7}
distinct production names: 52 · duplicates: 0
DECLARED HOLES: 1 AnimationTriggerValue
⟨cmd⟩ node map52.mjs --md > run1 ; node map52.mjs --md > run2 ; diff run1 run2
DOUBLE-RUN: IDENTICAL
```

---

_X.P.W2.b, Opus arm, blind. Authored 2026-09-17 by the Opus 5 seat of `W2.md` §5 phase 1
(`claude-opus-5[1m]`). Read-only against every tree; zero bytes written outside this file. The
sealed author arms and the Fable arm's draft were never opened. `W2.md` is byte-untouched by this
seat; `scripts/dev/dev.sh` was never touched._
