SERVED MODEL: claude-fable-5-1

# X.P.W2.a — Algebra contract, Fable arm (blind draft)

**Posture.** Unit `X.P.W2.a`, phase 1 of `W2.md` (§5 L586–596), authored **blind of `.b`**: at this
seat's open `docs/tranches/X/parse-that/algebra/` did not exist (⟨`ls docs/tranches/X/parse-that/algebra`⟩
→ `No such file or directory`), `draft-opus.md` was never opened, and no skeleton was shared. This
file is a **candidate contract** for `.c` to refute, not the algebra; `.c` ratifies `ALGEBRA.md`.
Read-only against every tree; every load-bearing number below was re-measured at this seat with the
command pasted (§1); nothing is from memory. Sections executed exactly: `W2.md` §3 items 1–3
(L139–162) · §3b (L224–302) · §3d (L409–423) · §6 G-1 (L682–691) · G-6 (L741–754).

**What this draft delivers** (the `.a` goal, §5): the closed operator enumeration **with a count**
(§3: **20 operators**, plus four closed registries), the four state parts (§2), COMP-1 as an
executable ownership law (§2.3), the six products each with its comparison (§5), the five recovery
laws each with a falsifiable probe (§6), the **52 → named-production map** (§8, 33 + 19, ∅ both
ways), every §3 debt clause folded as a contract clause with its provenance (§7), and the declared
marks as rows with escalation paths (§10). §9 realizes the §3d slice as terms of the algebra so the
contract is **buildable tomorrow without a question**.

---

## 1. Measurements (read-only; every number this file leans on)

```
⟨cmd⟩ node -e '<count export lines of src/css/index.ts: L2–34 types, L36–60 runtime>'
types 33 runtime 19 total 52                                       (double-run: identical)

⟨cmd⟩ sed -n '12,19p' src/css/types.ts | grep -c '"'
8                                                                  (the ParseIssue code union)

⟨cmd⟩ sed -n '27p' src/css/types.ts
    | { readonly ok: false; readonly diagnostics: readonly [ParseIssue, ...ParseIssue[]] };
⟨cmd⟩ sed -n '26p' src/css/types.ts
    | { readonly ok: true; readonly value: T; readonly diagnostics: readonly [] }

⟨cmd⟩ sed -n '32,36p' src/css/types.ts | grep -c 'kind:'
4                                                                  (CssTimingFunction kinds)

⟨cmd⟩ node -e 'let c=0;for(let i=0;i<=1000;i++){const n=i/10;if(n*0.01!==n/100)c++;}console.log(c)'
114                                                                (of 1001; double-run: 114)

⟨cmd⟩ node -e '<count keys of NAMED_COLORS in src/css/named-colors.ts>'
keys 148   transparent false   currentcolor false                  (both are NOT table rows)

⟨cmd⟩ node -e '<the R1 probe corpus arithmetic: 10 seeds + 18 heads × 9 bodies>'
names 18 bodies 9 seeds 10 corpus 172

⟨cmd⟩ sed -n '23p' docs/tranches/V/megatranche/registry/adjudicated/parser-band.md
## MEASURED — R1 totality gate (… 172 inputs + 7 non-string)

⟨cmd⟩ sed -n '181p' src/css/grammar.ts                              (the R1 crash site, MT-F024)
    const components = splitTopLevel(slash[0]!.replace(/,/g, " "), "space");

⟨cmd⟩ sed -n '138p' src/css/grammar.ts                              (the incumbent's scale form)
        return value === null ? null : value * percentScale / 100;

⟨cmd⟩ wc -l …/prototypes/css-parser/cand-o/{ast,spec,grammar,index,named-colors}.ts
112 223 480 200 194 → 1209 total

⟨cmd⟩ grep -n "7759\|7,761" docs/tranches/X/execution/D/X-P-W1.md | head -2
175: RED DEBT-3 Parser.lazy ceiling (deepest OK = 7759), failure mode RangeError thrown at depth 7760
(W2.md §6 G-11 and O-15 PT-04 read 7,761 / 7,762; W1's F-1: the ceiling is per box-state)

⟨cmd⟩ grep -n "PT-07" docs/tranches/V/coordination/INBOX.md | cut -c1-40
83: | O-15 | 2026-07-27 | parse-that …   (PT-01 · PT-03 93.9→138.2 ns = 1.47×, reset 139.3 · PT-04 · PT-07 5/5)

⟨cmd⟩ grep -n "21 heads" docs/tranches/V/megatranche/registry/adjudicated/parser-band.md
120: … the wave inherits the union (21 heads × 10 fillings) plus cand-F's 4,000-case mutation fuzz …

⟨cmd⟩ sed -n '13p' src/easing.ts
export type JumpPosition = "jump-start" | "jump-end" | "jump-none" | "jump-both";

⟨cmd⟩ grep -n "^type Channel\|^export type Channel\|^export type Alpha" src/color/model.ts
8: export type Channel = number | "none";   9: export type Alpha = number | "none";
```

One fact from these that binds the whole design and is easy to miss: **the frozen success arm is
`diagnostics: readonly []`** (`types.ts:26`). There is no "ok with warnings" on the frozen surface.
A parse that appends anything to `D` is `ok:false`, full stop. Recovery therefore exists to make
`ok:false` *total, conservative, and complete* (all N sites reported, every byte owned) — never to
manufacture an `ok:true` around a defect.

---

## 2. The state — a parse is `S ↦ (V, C, P, D)`

### 2.1 The four product parts (the *outputs*, compared by EQ-1..EQ-6)

| part | type (this draft) | who writes it | why separate |
|---|---|---|---|
| **V** — semantic value | exactly a frozen `/css` value type (`types.ts:1–130`), **zero extra properties**; absent (`⊥`) when the parse fails | `CTOR` assembles; `NUM`/`DIGITS`/`KW`/`DISPATCH` supply the leaves | `V` is assignable to the frozen type under an excess-property `tsc` fixture (G-10); nothing in `V` records syntax except where the frozen type itself does (`{kind:"unknown", prelude, body}`, `types.ts:127`, is a *frozen value field*, not a carrier this draft adds) |
| **C** — byte complement | ordered list of `(offset, length, kind)`, `kind ∈ K_C` (§2.3), `length ≥ 1` | `DROP` (structural bytes), `RECOVER` (skipped bytes), the boundary's residue rule (§4.6) | every byte of `S` not owned by a `V`-leaf is owned by exactly one `C` entry — the accountant half of "no CST" |
| **P** — provenance | ordered list of `(start, end)`, `end > start`, one entry per **leaf** of `V` in construction order | `NUM` · `DIGITS` · `KW` · `DISPATCH` (the four leaf-producing operators, §3) | position without tree position; an array indexed by leaf order; the leaf ↔ field mapping is a property of the constructor row (§3.5), not of `V` |
| **D** — diagnostic journal | append-only ordered list of `ParseIssue` (`types.ts:10–24`, the 8-code union), each `expected[]` drawn from the closed label registry `L` | `RECOVER` (one per recovered site) and the boundary (exactly one on terminal failure; one `trailing_input` on residue) — **no other operator appends to D** | diagnostics are values, never effects (R-LAW-3); the append set is two operators wide so purity is auditable by registry |

The shipped surface projects the product: `ok` ⟺ `D = []` ⟺ `V ≠ ⊥`; success ⇒
`{ok:true, value:V, diagnostics:[]}`; failure ⇒ `{ok:false, diagnostics:D}` with `|D| ≥ 1` (the
non-empty tuple, `types.ts:27`, is an *obligation* of the boundary, §4.6).

### 2.2 The internal parse state σ and the parse parameters Θ (O-8 made structural)

Operators are functions `σ → σ' × (A | ⊥)`. σ is a **record, passed in, returned out**, never a
module global:

```
σ = ⟨ i : offset into S          (0 ≤ i ≤ |S|)
      C, P, D : the three journals (append-only within an operator; truncated only by TRY's rollback)
      depth : REF nesting counter
      farthest : (f, expectedIds[]) — the farthest-failure merge for labelled diagnostics
      arena : Wasm-lowering only — the value-arena watermark (EQ-5 compares it; the JS lowering reports 0) ⟩
Θ = ⟨ depthBound : number          (default 64, §10 M-5)
      diagnostics : "structural"    (the only mode; there is no "armed" — PT-01 folded, §7)
      memo : "none"                 (the only mode — PT-03 folded; §3 has no memoize operator) ⟩
```

**O-8, restated as a checkable clause**: the algebra module exports **no** mutable binding, reads
**no** process-global (`globalThis`, module-level `let`, `process.env`), and every lowering's entry
takes `(S, Θ)` and returns the product. The G-8 history-invariance leg is the runtime witness; the
structural witness is `grep -nE "^(let|var) " <algebra sources>` → 0 and the bijection walk finding
no operator with a free variable outside `(σ, Θ, its arguments)`.

### 2.3 COMP-1 — conservation, as this draft reads it (an ownership tiling, executable in one pass)

`C` is fixed by §3b as `(offset, length, kind)` — **it carries no bytes**. A `weave` that
*regenerates* `S` from `(V, C, P)` is therefore impossible without smuggling text into `C` (which
would make `C` a CST fragment) or re-rendering leaves from `V` (impossible: `50%` and `0.5` both
construct the leaf `0.5`). This draft reads COMP-1 as the strongest law the fixed shape admits, and
names it a **draft ruling for `.c`** (§10 M-0):

> **COMP-1 (ownership).** Let `Ω = { [o, o+len) : (o,len,k) ∈ C } ∪ { [s,e) : (s,e) ∈ P }`. For
> **every** `S` (accepted or malformed): (i) the intervals of `Ω` are pairwise disjoint; (ii) their
> union is exactly `[0, |S|)`; (iii) sorted by start, `C` and `P` interleave in `S`-order (no
> interval precedes one it follows in `S`); (iv) every `C` entry's bytes satisfy its kind's
> predicate `π_k`. `weave(V, C, P)` is the function that copies each interval's bytes from its
> owner's span; COMP-1 is the statement `weave(V, C, P) ≡ S` **as an accounting identity** — every
> byte has exactly one owner and the owner's claim is true.

`K_C` (closed, 6 kinds, each with predicate `π_k`): `ws` (every byte ∈ ws-class) · `comment`
(`/*…*/` balanced, no nested open) · `punct` (a single byte in `( ) , / % # ; : { } [ ]`) ·
`keyword` (a case-folded literal that is **not** a leaf of `V`, e.g. `from`, a unit suffix `deg`) ·
`skipped` (bytes a `RECOVER` consumed — any bytes) · `residue` (unconsumed tail at the boundary —
any bytes). A candidate that needs a seventh kind has found a byte class the contract did not
account for and returns it to `.c`, not to a fallback.

Why this is not weaker than "byte for byte": bytes skipped by recovery *must* land in `C.skipped`
or (ii) fails; a leaf claiming `50` while nothing claims `%` fails (ii); a separator counted both as
a leaf suffix and as `punct` fails (i); a lowering that reorders leaf construction fails (iii) — and
each is a one-pass check over two sorted arrays, identical in both lowerings.

---

## 3. The closed operator set — **20 operators**, four closed registries

Typing: `Op<A>` where `A` ranges over the closed *carrier kinds* `𝒦 = { Span, Num, Kw, Unit, Tuple<…>,
List<A>, Opt<A>, T ∈ Frozen }` — `Frozen` being the 33 `/css` types and their constituent scalars
(`Channel = number | "none"`, `Alpha`, `JumpPosition`). **No carrier kind is a syntax node**: `Span`
is a `(start,end)` pair with no children; `Tuple` and `List` hold carriers, never spans-with-children.
There is no carrier that has a field typed as another carrier *and* a span — that is the structural
no-CST check (G-10) stated as a type rule.

Every operator has **exactly two lowerings** (JS on the combinator library's own surface; Wasm as a
zero-import routine over linear memory) and one bijection row; **there is no operator with one
lowering, no operator with a host-closure argument, and no `bind`** (no operator takes a function
that receives σ). The only user-supplied "code" enters through the four registries (§3.5), whose
rows are data with declared semantics and their own two lowerings each.

### 3.1 Terminals — consume bytes (5)

| id | operator | signature | effect on (i, C, P, D) | family |
|---|---|---|---|---|
| OP-01 | `SCAN cls min max` | `Op<Span>` | consumes the maximal run of bytes in byte-class `cls ∈ R_cls`, requires `min ≤ run ≤ max` (`max` may be ∞); yields the span; **zero-width failure** `⟨css_syntax, [cls.label]⟩` when `run < min` | token-class scan |
| OP-02 | `LIT bytes` | `Op<Span>` | matches `bytes` (ASCII, case-folded) at `i`; yields the span; zero-width failure `⟨css_syntax, ["'"+bytes+"'"]⟩` | token-class scan (fixed sequence) |
| OP-03 | `NUM` | `Op<Num>` | scans a css-syntax `<number-token>` (`[+-]? digits? (. digits)? ([eE] [+-]? digits)?`, at least one digit; `1.` is **not** a number — parser-band L94); converts to f64 by the JS `Number` grammar in **both** lowerings (Wasm lowering carries its own decimal→f64 routine and must agree bit-for-bit — an EQ-1 obligation, §5); **appends `(start,end)` to P**; non-finite result → posture M-3 (§10) | value construction + provenance append (leaf) |
| OP-04 | `DIGITS radix n` | `Op<Num>` | exactly `n` digits in `radix ∈ {10,16}`; integer value; **appends to P** | value construction + provenance append (leaf) |
| OP-05 | `KW scan table` | `Op<T>` | runs `scan : Op<Span>` (normally `SCAN ident`), case-folds the span, looks it up in `table ∈ R_kw` (closed, null-prototype); yields the row's **value** (a frozen-type value or scalar); **appends the span to P**; miss → zero-width failure `⟨code, [table.label]⟩` **at the span's start** (the consumed span is released — the failure is zero-width by construction) | labelled zero-width failure · value + provenance (leaf) |

### 3.2 Structure — combine (6)

| id | operator | signature | semantics | family |
|---|---|---|---|---|
| OP-06 | `SEQ [o₁ … oₙ]` | `Op<Tuple<A₁…Aₙ>>` | runs in order, threading σ; first failure propagates (no rollback of its own — the enclosing `TRY`/`ALT` owns the mark); yields the typed tuple; **fixed arity, n ≥ 1** | sequence |
| OP-07 | `ALT [o₁ … oₙ]` | `Op<A>` | ordered choice with commitment: each arm runs under an implicit `TRY`; an arm failing **before** its `CUT` restores σ (R-LAW-1) and the next arm runs; an arm failing **after** its `CUT` propagates the failure — no later arm runs; all-arms-fail → the farthest-failure merge (§4.4). **Rule R-LAW-5 (declared)**: `RECOVER` may appear only in the **last** arm's subtree (structural check) | ordered committed choice |
| OP-08 | `CUT` | `Op<Unit>` | marks the enclosing `ALT` arm committed from here; consumes nothing; illegal outside an `ALT` arm (a bijection-walk error) | commit point |
| OP-09 | `PURE v` | `Op<A>` | consumes nothing, yields the constant `v` (`v` is a frozen-type value or scalar, e.g. `PURE 1` for the default alpha, `PURE "jump-end"`); `OPT o ≝ ALT [o, PURE none]` is a **notation**, not an operator | sequence (unit) |
| OP-10 | `REP o min max sep?` | `Op<List<A>>` | iterates `o` (optionally `sep` between items, `sep : Op<Unit>`); **progress law**: an iteration that consumes 0 bytes terminates the loop (so `REP` cannot spin); `count < min` → failure at the loop's mark; `max` may be ∞. Iteration, not recursion — a 10,000-item stylesheet costs depth 0 | sequence (iteration) — see §10 M-6 for the addition beyond §3b's family list |
| OP-11 | `DROP kind o` | `Op<Span> → Op<Unit>` | runs `o`; **appends `(start, len, kind)` to C** (`kind ∈ K_C \ {skipped, residue}`); yields `Unit`. `WS ≝ DROP ws (SCAN ws 0 ∞)` and `TOK b ≝ DROP punct (LIT b)` are notations | span-into-C |

### 3.3 Dispatch and labelled failure (2)

| id | operator | signature | semantics | family |
|---|---|---|---|---|
| OP-12 | `DISPATCH scan table` | `Op<A>` | runs `scan : Op<Span>`, case-folds the span, looks it up in `table ∈ R_dispatch` (closed, null-prototype, `key → Op<A>`); **appends the key span to P** (a dispatch key is a semantic decision — the `space`/`kind` leaf); runs the row's operator; miss → zero-width failure `⟨code, [table.label]⟩` at the span start (span released) | channel-table dispatch |
| OP-13 | `FAIL code labels` | `Op<⊥>` | consumes nothing; fails with the frozen `code` and `labels ⊆ L`; **the** labelled zero-width failure (debt 1 — never an opaque `(?!)`); used as an `ALT` last arm to name what was expected | labelled zero-width failure with named expectations |

### 3.4 Value operators — pure over their argument, never over σ (3)

| id | operator | signature | semantics | family |
|---|---|---|---|---|
| OP-14 | `CLAMP lo hi o` | `Op<Num> → Op<Num>` | `min(max(v, lo), hi)`; `"none"` passes through; NaN → posture M-3 | clamp (§8.1 / §4.2) |
| OP-15 | `SCALE num den o` | `Op<Num> → Op<Num>` | **`(v * num) / den`** with integer `num, den` — two f64 operations in that order, never a folded factor (debt 4, §7); `"none"` passes through | exact scale |
| OP-16 | `CTOR row [o₁ … oₙ]` | `Op<T>` | runs the argument operators as a `SEQ`, then applies constructor `row ∈ R_ctor` to the tuple: yields a frozen-type value **or** a labelled zero-width failure `⟨row.code, row.labels⟩` (constructor guards, e.g. `steps`: `count ≥ 1`, integer, `jump-none ⇒ count ≥ 2`; `cubic-bezier`: `x₁,x₂ ∈ [0,1]`). Constructors **cannot read σ, cannot consume bytes, cannot append to any journal** — they are total functions `Tuple → T | ⊥` | value construction |

### 3.5 Recovery and recursion (3)

| id | operator | signature | semantics | family |
|---|---|---|---|---|
| OP-17 | `TRY o` | `Op<A>` | takes a **mark** `m = ⟨i, |C|, |P|, |D|, depth, arena⟩`; runs `o`; on failure **restores σ to `m` exactly** (truncating the three journals and the arena) and re-raises the failure with `farthest` retained (the merge survives rollback — it is the only field that does); on success passes through. `ALT` arms are `TRY`-wrapped implicitly; `TRY` is also available bare for lookahead-shaped productions | mark / rollback |
| OP-18 | `RECOVER code o sync` | `Op<A> → Op<Opt<A>>` | runs `TRY o`; on failure at farthest offset `f` with mark offset `m`: **(a)** appends `ParseIssue⟨code, start=m, end=f, expected=farthest.labels, actual=S[m,f) or null⟩` to D; **(b)** runs `sync : Op<Span>` from `m` — `sync` must consume **≥ 1 byte** (else the recovery fails outright with the same issue, R-LAW-4 progress); **(c)** appends `(m, |sync|, skipped)` to C; **(d)** yields `none`. On success yields `some(a)`. **May not appear in a non-final `ALT` arm** (R-LAW-5, structural) | recover / resync with declared synchronization |
| OP-19 | `REF name` | `Op<A>` | the **only** back-edge: refers to production `name ∈ G` (the grammar is a finite map `name → Op`); increments `depth` on entry, decrements on exit; `depth > Θ.depthBound` → labelled zero-width failure `⟨css_syntax, ["nesting ≤ " + Θ.depthBound]⟩` — an ordinary `ok:false`, **never a `RangeError`** (debt 3 / PT-04 / G-11). Both lowerings count identically; the Wasm lowering's own stack is sized from `Θ.depthBound`, so the bound is the algebra's, not the host's | bounded back-edge (depth = algebra parameter) |
| OP-20 | `LOOK o` | `Op<A> → Op<Unit>` | positive lookahead: runs `TRY o` then **always** restores σ to the mark (journals included); success ⟺ `o` succeeded; consumes nothing. Needed for the juxtaposition rows (M-1) where `rgb(1.5.5 3)` must be read as `1.5` `.5` — a number may not be followed by `.digit` under the strict reading; the operator exists so the *choice* is a declared row, not a lexer rule | commit point (negative form via `ALT[LOOK o, …]`) |

**Count: 20** (`OP-01` … `OP-20`). `OPT`, `WS`, `TOK`, `NOT o ≝ ALT[SEQ[LOOK o, FAIL …], PURE unit]`
are notations that expand to these twenty; the bijection registry (G-2) lists the twenty and **no
notation** — an expansion is not a row.

### 3.6 The four closed registries (data, each row with two lowerings)

| registry | row shape | slice contents (§9) | closure witness |
|---|---|---|---|
| **`R_cls`** byte classes | `{ label, table: Uint8Array(256) }` | `ws` `{ \t\n\r\f}` · `ident` `[A-Za-z0-9_-]` (no escapes — the incumbent supports none, `grammar.ts:89–127`) · `digit` · `hexdigit` · `sign` · `any-but-close` `[^)]` · `any-but-semi-or-close` `[^;}]` | the Wasm lowering embeds the same 256-byte tables in its data segment; the JS lowering the same `Uint8Array`s; `sha256` of the concatenated tables printed by the bijection walk |
| **`R_kw`** keyword→value tables | `{ label, code, rows: {key → value} }` | `named-color` (148 rows, `src/css/named-colors.ts`, → `Color<"rgb">` triples) · `timing-keyword` (5) · `step-alias` (`step-start`,`step-end` → 2) · `jump-position` (6 spellings → 4 values, `grammar.ts:457–460`) · `none` (1) · `context-color` (the 20 spellings of `CONTEXT_COLOR`, `grammar.ts:160`, → the value `context`) · `hue-unit` (`deg`,`grad`,`rad`,`turn` → `(num,den)` pairs for `SCALE`) | row count printed; a key present in one lowering's table and not the other's is the v12 misbinding shape and fails G-2 |
| **`R_dispatch`** key→operator tables | `{ label, code, rows: {key → Op} }` | `color-head` (`rgb`,`rgba`,`hsl`,`hsla`,`hwb`,`lab`,`lch`,`oklab`,`oklch`,`color`,`var` → 11 rows for the slice; the full set at W3) · `timing-head` (`cubic-bezier`,`steps`,`linear` → 3) · `color-space` (`color()`'s 8 predefined spaces, `types.ts:7–8`) | as above |
| **`R_ctor`** constructors | `{ label, code, arity, leafMap: fieldName[] , guards }` | `rgb` `hsl` `hwb` `lab` `lch` `oklab` `oklch` `color` (→ `Color<S>`; `leafMap` = `[space, c1, c2, c3, alpha?]`) · `hex-color` (`[r,g,b,a?]` from `DIGITS`) · `context` (→ the `color_context_required` failure — a constructor whose *only* result is a labelled failure, so the context posture is a registry row) · `timing-keyword` · `cubic-bezier` · `steps` · `linear-function` · `linear-stop` · `unknown-rule` · `style-rule` · `declaration` | arity and `leafMap` checked against the frozen type's field list by the bijection walk; a constructor with a field the frozen type lacks is an excess property and fails G-10 |
| **`L`** labels | `string[]`, indexed | every `label` above + the `FAIL` labels the grammar uses; the Wasm lowering emits label **indices**, the JS glue maps index → string **outside** the algebra | `L` is printed and `sha256`d; EQ-4 compares indices |

---

## 4. Laws the twenty must satisfy observably (both lowerings)

- **L-CLOSED.** The grammar `G` is a finite map `name → term` over the twenty operators and the four
  registries; the bijection walk enumerates every term node and every registry row and prints the
  registry per lowering. Missing, extra, duplicate, reordered, **misbound** → G-2 red.
- **L-NOCST.** No carrier kind has a child carrier *and* a span; `V` has zero properties outside
  its frozen type; `P` is a flat array; `C` is a flat array. (The frozen `StylesheetItem.children`
  is a *value* nesting the frozen type itself declares — `V` may nest exactly as far as
  `types.ts` nests, and no further.)
- **L-PURE.** `D` is appended only by OP-18 and the boundary; `C` only by OP-11, OP-18 and the
  boundary; `P` only by OP-03/04/05/12. Any other write site is a defect found by the walk.
- **L-PROGRESS.** `REP` iterations and `RECOVER` syncs consume ≥ 1 byte or terminate.
- **L-COMMIT.** After `CUT`, failure is final for the enclosing `ALT`; the merge of expectations
  from released arms is discarded at the cut (so a committed arm's diagnostic names *its* expectation,
  not every sibling's).
- **L-DEPTH.** `depth ≤ Θ.depthBound` at every `REF` entry or the parse fails with a labelled
  issue; no host recursion limit is ever reached — the JS lowering's own recursion is bounded by
  the same counter (the combinator library's `lazy` is used **once**, at the single `REF` site of the
  balanced tail, with the counter beneath it — debt 3).
- **L-FARTHEST (the diagnostic rule).** On terminal failure the boundary emits exactly one
  `ParseIssue`: `code` = the code carried by the farthest failure (ties → the first raised);
  `start` = the offset of the innermost `TRY` mark enclosing the farthest failure; `end` = the
  farthest offset `f`; `expected` = the label set merged at `f` in raise order (deduplicated,
  order-preserving); `actual = S.slice(start, end) || null` (the incumbent's own rule,
  `grammar.ts:57`). This is a **third-cell declared divergence** from the published 4.0.0, whose
  `failure()` defaults `start=0, end=source.length` (`grammar.ts:50–51`) — the incumbent reports the
  whole input as the issue span; the algebra reports the site. Carried as a row, never silently
  matched.

### 4.6 The boundary — BND-1, **above** the algebra (PT-07 / debt 7)

Each of the 19 runtime exports that parses is `ENTRY(prod)`, a JS function that (1) if
`typeof source !== "string"` returns `{ok:false, diagnostics:[⟨css_syntax, 0, 0, ["string"],
actual: null⟩]}` **without constructing σ** — the algebra never sees a non-string, so the Wasm
lowering, which receives bytes, needs no counterpart (this is why BND-1 is *not* an operator and
K-3 does not apply to it); (2) builds σ over `S` with Θ; (3) runs `prod`; (4) **closes the tiling**:
if `i < |S|` after `prod`, appends `(i, |S|−i, residue)` to C and `⟨trailing_input, i, |S|,
["end of input"], S.slice(i)⟩` to D; (5) if `D = []` returns `{ok:true, value:V, diagnostics:[]}`
with `V` deep-frozen per M-4, else `{ok:false, diagnostics:D}` (`|D| ≥ 1` by construction: terminal
failure appends one; recovery appended ≥ 1; residue appends one). **A throw escaping `ENTRY` is K-8**;
no `try/catch` exists in `ENTRY` (the shield posture, M-2).

---

## 5. The six equality products — comparison mechanism per product

Mechanism (all six): a **canonical structural serialization** per product, byte-compared across
the JS lowering, the Wasm lowering, and (third cell) the vendored sha-pinned published 4.0.0
(`dist/subpaths/css.js` = `8b5381305ea26236326f06a38559247b2089a5be7fa78abe43640d0556320c42`, W1's
copy). The serializer is one function in the harness (`.g`'s), never per candidate.

| id | product | canonical serialization | comparison | "exact" |
|---|---|---|---|---|
| EQ-1 | `V` | frozen-type-directed walk (field order = the frozen type's declaration order, `types.ts`); every f64 emitted as its 8 bytes big-endian; strings as length-prefixed UTF-8; `"none"` as a tag byte; `⊥` as one byte | byte equality | **`Object.is` per channel** (the 8-byte form distinguishes `−0` and every NaN payload; `===` would not — G-3's falsifier) |
| EQ-2 | `C` | `(offset u32, length u32, kind u8)*` in list order | byte equality | same order, same triples; COMP-1 holds on both (checked first) |
| EQ-3 | `P` | `(start u32, end u32)*` in list order | byte equality | leaf construction order must match — the Wasm lowering must build `V`'s leaves in the JS lowering's order; `leafMap` in `R_ctor` fixes it |
| EQ-4 | `D` | `(code u8, start u32, end u32, expectedIds u16 count + u16*, actual: tag + bytes)*` in journal order | byte equality | **structure, never rendered strings**; `expectedIds` index `L`; a lowering whose labels appear only under an "armed" mode has no such mode to be in — Θ has no arm flag (PT-01) |
| EQ-5 | rollback | after every `TRY` failure in the corpus, the tuple `⟨i, |C|, |P|, |D|, depth, arena⟩` **post-restore** vs the mark; the JS lowering reports `arena = 0` | tuple equality per site, both lowerings; the count of sites must also agree | value equality; **cost asymmetry declared not equalized** — G-8 prints the two lowerings' rollback cost as separate rows |
| EQ-6 | malformed inverse | COMP-1 (§2.3) evaluated on every `ok:false` input: the sorted `Ω` printed as `(start,end,owner)*` | the tiling check passes in both, **and** EQ-2/EQ-3's bytes agree | `Ω` is a partition of `[0,|S|)` in both lowerings; disagreement on who owns a byte is a K-1 divergence |

**Third-cell declared divergences carried into `.g`'s corpus (never silent expectations)**: (a) issue
spans (§4 L-FARTHEST vs the incumbent's `0..|S|`); (b) `rgba(1, 2, 3, 0.5)` / `hsla(…)` legacy
4-arg (incumbent rejects — parser-band L84–85, GAP); (c) the §8.1/§4.2 clamps (incumbent unclamped /
rejects, L91–92); (d) the seven unsound accepts the incumbent admits (L86–95); (e) juxtaposition
(M-1); (f) `1e400` (M-3); (g) W1's R-9 rows (`color-mix()` rejected by the incumbent; `@@@ { }`
accepted by it). EQ-1 across the **two lowerings** admits no divergence at all (K-1).

---

## 6. The five recovery laws — each with a falsifiable probe (G-4's rows)

| law | statement (binding) | probe (fails for its intended reason) |
|---|---|---|
| **R-LAW-1** rollback exactness | for every `TRY` that fails, post-restore `⟨i, |C|, |P|, |D|, depth, arena⟩` **equals** the mark; `farthest` alone survives | instrument every `TRY` site over slice + R1 + fuzz corpora; print `(sites, mismatches)` per lowering; **positive control**: a harness-side mutant that skips the `P` truncation must print `mismatches > 0` or the probe is decorative |
| **R-LAW-2** complement conservation | bytes consumed by `RECOVER`'s `sync` appear as one `C.skipped` entry; COMP-1 holds on every malformed input | run COMP-1's tiling on every `ok:false` corpus row; print the first uncovered or doubly-owned byte if any; positive control: a mutant `RECOVER` that omits step (c) must fail |
| **R-LAW-3** diagnostic purity | no operator emits an effect; `D` is the only diagnostic channel | monkey-patch `console.error`/`console.warn`/`console.log`/`process.stdout.write` to **throw**, run the full corpus in both lowerings; any throw fails; also assert `Θ` has no field whose value changes diagnostics' *presence* (grep the Θ type: exactly the three fields of §2.2) |
| **R-LAW-4** non-amplification + progress | `N` malformed sites ⇒ exactly `N` issues in `D`; a `sync` consuming 0 bytes fails the recovery instead of re-entering | corpus rows with `N ∈ {1,2,3,5,8}` planted sites (garbage between qualified rules) → `|D| = N` printed per row; a `sync` defined as `SCAN any-but-semi-or-close 0 ∞` at a `;` matches 0 bytes at offset 0 of the failure — the probe plants exactly that and asserts termination within 1 s and `|D| = N` (a hang or `N²` fails) |
| **R-LAW-5** `alt`/`recover` declared | **`RECOVER` is forbidden in any non-final `ALT` arm** (a recovered arm succeeds with `none` and would starve the later arms); the bijection walk enforces it structurally, and the corpus row `ALT[RECOVER(a), b]` is a **negative control** the walk must reject | `node harness/w2/op-bijection.mjs --structural` prints `RECOVER-in-nonfinal-ALT: 0`; the negative-control grammar prints `1` and exits non-zero |

---

## 7. The debts and postures — folded as contract clauses (each with its provenance)

| # | clause (binding on every candidate) | provenance |
|---|---|---|
| debt 1 | every failure that a `KW`/`DISPATCH` miss or a `FAIL` raises carries **named expectations** from `L`; the label `(?!)` and any regex-derived expectation are forbidden (`grep -c '(?!)' <algebra+grammar sources>` → 0) | parser-band L116 (*"`expected: ["<named-color>"]` beats `(?!)`"*); `W2.md` §3 item 3 |
| debt 2 | the reject path is its own measured leg (`reject-non-throwing`) in W1's bench; head-dispatch ordering and early `CUT` after the head are the declared knobs; **no averaging across legs** | parser-band L117 (*"cand-F fails ~1.3–1.4× faster (0.86× vs 0.64×)"*); `W2.md` §6 G-7 |
| debt 3 | recursion bounded **by construction**: exactly one `REF` site for the slice (the balanced tail under `var()`), the counter beneath it, `Θ.depthBound` the parameter; a `try/catch` shield may exist only if the raw-σ-over-corpus instrument (cand-O's, held binding) proves it non-load-bearing, and its removal is M-2 | parser-band L118; O-15 PT-04 (`RangeError` at 7,762 — this box 7,760, W1 F-1); `W2.md` §6 G-11 |
| debt 4 | `SCALE num den` is `(v * num) / den` — two operations, integer `num,den`; a folded factor (`* 2.55`, `* 0.01`) is a defect; **114 of the 1001 values `0, 0.1, …, 100` differ** under `n*0.01` vs `n/100` (§1); the incumbent's own form `value * percentScale / 100` (`grammar.ts:138`) already evaluates left-to-right as `(v*255)/100` and is the conforming shape | parser-band L119 (cand-F: *"2.55 is inexact in binary; 100% must be exactly 255"*); `W2.md` §3 item 3 |
| debt 5 | the GROUND-A empty-arg class is a **generated** cross-product row set in `.g`'s corpus — **21 heads × 10 fillings** — plus the R1 probe's own 18 × 9 + 10 = 172; never hand-listed | parser-band L120; `audit/probes/r1-published-totality.mjs` L38–42 |
| PT-01 | diagnostics are products of the algebra (`D`), present on every parse; **Θ has no arm flag**; a lowering whose `expected[]` is empty unless something is "armed" reads diagnostics-ABSENT and fails EQ-4 | INBOX O-15 (PT-01: *"`label` is a no-op unless diagnostics are armed, and arming couples an unconditional `console.error`"*); `W2.md` §3b EQ-4 |
| PT-03 / O-8 | no process-global mutable state, no one-way latch, no memoization mode (§3 has no memoize operator; `Θ.memo = "none"` is the only value) | INBOX O-15 (PT-03: 93.9 → 138.2 ns = 1.47×; `resetPackrat()` leaves 139.3); `W2.md` §3b O-8; G-8 |
| PT-07 | non-string inputs die at **BND-1** (§4.6), above the algebra, as `ok:false` with one `css_syntax` issue — never a raw `TypeError`; `.parse()`-truthiness entry is forbidden (the algebra's failure is a value, not `undefined`) | INBOX O-15 (PT-07: *"5/5 non-string inputs throw a raw `TypeError`; `.parse()` returns `undefined` on failure"*); X-P-W1.md L1349 (reproduced); parser-band R1 table (published 7/7 non-string throw) |
| R1 | zero throws over the 172 + 7; every rejection carries ≥ 1 issue (the non-empty tuple, `types.ts:27`) | parser-band L23–31 (published `parseCssColor` **102/172 + 7/7**); the crash site `grammar.ts:181`; `W2.md` §6 G-5 |
| band | hue **unwrapped** at parse time (`hsl(480 …)` → 480); §8.1 / §4.2 clamps via `CLAMP`; `color_non_finite` on unclamped non-finite (M-3); legacy comma forms for `rgb/rgba/hsl/hsla` only, never for `hwb`/`lab`/`lch`/`ok*` (L95) | parser-band L15, L91–98, L104 |

---

## 8. The totality contract — 52 → named production, ∅ both ways, holes declared

Verbs: **PROD** = a parse production `G[name]` whose `V`-type is the row's type · **PROJ** = a total
function over an already-parsed `V` (no bytes read; outside the algebra; declared as a hole for
W3's `typescript/src/css/**` with the algebra's product as its input) · **INV** = a serializer, the
inverse direction (a hole; W3) · **CONST** = a constituent frozen type reached only inside another
row's `V` · **ALG** = an algebra product type. A **hole** is declared, never absent: its row names
the owner and what would make it a PROD.

### 8.1 The 19 runtime exports (`src/css/index.ts:36–60`)

| # | export | verb | production / hole | slice? |
|---|---|---|---|---|
| 1 | `parseCssColor` | PROD | `color` (§9.1) | **YES — deep** |
| 2 | `parseCssScalar` | PROD | `scalar` — `ALT[dimension, percentage, number, keyword]` over `NUM` + `hue-unit`-style unit tables | no (W3) |
| 3 | `parseCssValue` | PROD | `value` — `ALT[color, scalar, function-call, keyword-ident]`; `function-call` reuses `balanced-tail` (the one `REF`) | no (W3) |
| 4 | `parseCssValues` | PROD | `value-list` — `REP value 1 ∞ (WS, TOK ",", WS)` | no (W3) |
| 5 | `parseKeyframeSelector` | PROD | `keyframe-selector` — `ALT[percent-selector, named-selector]`, code `keyframe_selector_invalid` | no (W3) |
| 6 | `parseTimingFunction` | PROD | `timing` (§9.2) | **YES — whole** |
| 7 | `serializeCssColor` | INV | hole `σ-color`: `CssColor → Result<string, ColorIssue>`; owner W3; becomes in-algebra only if `.c` rules serialization an algebra product (it is not one of the six) | no |
| 8 | `coerceToSyntax` | PROJ+PROD | hole `coerce`: parses `syntax` (a `<syntax>` descriptor grammar, PROD `syntax-descriptor`, code `syntax_descriptor_invalid`) then projects `value` against it (code `syntax_mismatch`); owner W3 | no |
| 9 | `parseAnimationRange` | PROD | `animation-range` — `SEQ[range-boundary, OPT(SEQ[WS, range-boundary])]` | no (W3) |
| 10 | `parseAnimationTimeline` | PROD | `animation-timeline` — `DISPATCH timeline-head {auto,none,scroll,view} + name-ident` | no (W3) |
| 11 | `serializeTimelineOptions` | INV | hole `σ-timeline`; owner W3 | no |
| 12 | `collectAnimationOptions` | PROJ | hole `π-animation-options`: `Declaration[] → CSSAnimationOptions[]` (a projection of `V`; owner W3) | no |
| 13 | `collectCustomFunctions` | PROJ | hole `π-custom-functions`: `Stylesheet → CollectedRule<CustomFunctionRule>[]` | no |
| 14 | `collectDeclarations` | PROJ | hole `π-declarations`: `Declaration[] → ReadonlyMap<string, Declaration>` | no |
| 15 | `collectKeyframes` | PROJ | hole `π-keyframes` | no |
| 16 | `collectPropertyDescriptors` | PROJ | hole `π-property-descriptors` | no |
| 17 | `collectStyleRules` | PROJ | hole `π-style-rules` | no |
| 18 | `collectTimelineOptions` | PROJ | hole `π-timeline-options`: `Declaration[] → CSSTimelineOptions` | no |
| 19 | `parseStylesheet` | PROD | `stylesheet` — `REP (RECOVER css_syntax rule sync-rule) 0 ∞` where `rule = ALT[at-rule, qualified-rule]` and `sync-rule = SCAN any-but-semi-or-close 1 ∞` then the closing byte; the **one malformed qualified rule** of §3d exercises exactly this row | **partial — the §3d recovery scenario only** |

**Runtime set difference**: exports − map = ∅ (19 rows); map − exports = ∅ (no row names an export
that is not in `index.ts:36–60`). Re-derivable: `grep -c '^| [0-9]* | \`' <this section>` = 19.

### 8.2 The 33 types (`src/css/index.ts:1–35`)

| # | type | verb | production whose `V` (or constituent of) |
|---|---|---|---|
| 1 | `AnimationRangeValue` | PROD | `animation-range` |
| 2 | `AnimationTimelineValue` | PROD | `animation-timeline` |
| 3 | `AnimationTriggerValue` | CONST | of `CSSTimelineOptions` (hole `π-timeline-options`) |
| 4 | `CSSAnimationOptions` | CONST | of hole `π-animation-options` |
| 5 | `CSSPropertyDescriptor` | CONST | of `stylesheet` (`property-rule` arm) |
| 6 | `CSSTimelineOptions` | CONST | of hole `π-timeline-options` / `σ-timeline` |
| 7 | `CollectedRule` | CONST | of the four `π-*` collectors |
| 8 | `CssColor` | PROD | `color` — **slice** |
| 9 | `CssColorSpace` | CONST | the `space` leaf of `color` (13 spellings, `types.ts:6–8`; `R_dispatch color-head` + `color-space`) |
| 10 | `CssLinearStop` | CONST | of `timing` (`linear-function` arm) — **slice** |
| 11 | `CssTimingFunction` | PROD | `timing` — **slice** (all 4 kinds) |
| 12 | `CustomFunctionDescriptor` | CONST | of `stylesheet` (`function-rule` arm) |
| 13 | `CustomFunctionParameter` | CONST | of `CustomFunctionDescriptor` |
| 14 | `CustomFunctionRule` | CONST | of `stylesheet` |
| 15 | `Declaration` | CONST | of `stylesheet` (`declaration` ctor) — **slice** (the qualified rule's body) |
| 16 | `KeyframeRule` | CONST | of `stylesheet` (`keyframes-block` arm) |
| 17 | `KeyframeSelector` | PROD | `keyframe-selector` |
| 18 | `KeyframesBlock` | CONST | of `stylesheet` |
| 19 | `ParseIssue` | ALG | the element type of `D` (8 codes; every code is emitted by a named site: `css_syntax` FAIL/boundary · `trailing_input` boundary residue · `keyframe_selector_invalid` `keyframe-selector` · `color_context_required` `context` ctor · `syntax_descriptor_invalid`/`syntax_mismatch` hole `coerce` · `animation_option_invalid`/`timeline_option_invalid` holes `π-animation-options`/`π-timeline-options`) |
| 20 | `ParseResult` | ALG | the boundary's projection of `(V, D)` (§4.6) |
| 21 | `PropertyRule` | CONST | of `stylesheet` |
| 22 | `RangeBoundary` | CONST | of `animation-range` |
| 23 | `RangePhase` | CONST | of `RangeBoundary` (`R_kw range-phase`, 7) |
| 24 | `ScrollTimelineDescriptor` | CONST | of `stylesheet` (`scroll-timeline` arm) |
| 25 | `ScrollerKeyword` | CONST | of `animation-timeline` (`R_kw scroller`, 3) |
| 26 | `StyleRule` | CONST | of `stylesheet` (`style-rule` ctor) — **slice** (the qualified rule) |
| 27 | `Stylesheet` | PROD | `stylesheet` |
| 28 | `StylesheetItem` | CONST | the element union of `stylesheet` (9 kinds, `types.ts:118–127`) |
| 29 | `TimelineAxis` | CONST | of `animation-timeline` (`R_kw axis`, 4) |
| 30 | `TimelineScopeValue` | CONST | of hole `π-timeline-options` |
| 31 | `TriggerType` | CONST | of `AnimationTriggerValue` (`R_kw trigger`, 4) |
| 32 | `ViewInset` | CONST | of `animation-timeline` (`view` arm) |
| 33 | `ViewTimelineDescriptor` | CONST | of `stylesheet` (`view-timeline` arm) |

**Type set difference**: 33 rows, each a name from `index.ts:2–34`; ∅ both ways. **Holes declared**:
7 PROJ + 2 INV = **9 holes**, each owner-named (W3), none absent. G-6's coverage report inherits the
0-of-52 baseline (GATE-VERDICT P-2) and restates it with the slice rows (`parseCssColor`,
`parseTimingFunction`, and `parseStylesheet`'s recovery scenario) at their **measured** verb; this
draft claims no verb for any row (OP-8).

---

## 9. The shared slice as terms of the algebra (§3d, identical across candidates)

Notation: `WS ≝ DROP ws (SCAN ws 0 ∞)` · `TOK b ≝ DROP punct (LIT b)` · `OPT o ≝ ALT[o, PURE none]`
· `IDENT ≝ SCAN ident 1 ∞`. Every line below expands to the twenty operators and the registries.

### 9.1 `color` (`parseCssColor` deep)

```
color        := SEQ[WS, ALT[hex, named, context, functional, FAIL css_syntax ["<color>"]], WS]
hex          := SEQ[TOK "#", ALT[ SEQ[DIGITS 16 2 ×4],  SEQ[DIGITS 16 2 ×3],
                                  SEQ[DIGITS 16 1 ×4],  SEQ[DIGITS 16 1 ×3] ] ]  ⇒ CTOR hex-color
                 (1-digit groups: CTOR hex-color doubles the nibble: v*17; alpha = a/255 as (a*1)/255 — SCALE 1 255)
named        := ALT[ KW IDENT named-color            (148 rows → Color<"rgb">, alpha PURE 1),
                     KW IDENT transparent-row        (1 row → rgb(0,0,0,0); a KW row, not a named-color row: §1 shows
                                                      `transparent` is NOT in NAMED_COLORS) ]
context      := KW IDENT context-color  ⇒ CTOR context   (→ FAIL color_context_required ["context-free color"];
                 `var(`/`env(` heads route here from color-head so the incumbent's L260–262 posture is a registry row)
functional   := DISPATCH IDENT color-head {
   rgb | rgba : SEQ[TOK "(", CUT, WS, ALT[modern-rgb, legacy-rgb], WS, TOK ")"]  ⇒ CTOR rgb
   hsl | hsla : SEQ[TOK "(", CUT, WS, ALT[modern-hsl, legacy-hsl], WS, TOK ")"]  ⇒ CTOR hsl
   oklch      : SEQ[TOK "(", CUT, WS, ok-l, WS, ok-c, WS, hue, alpha-slash?, WS, TOK ")"] ⇒ CTOR oklch
   var        : SEQ[TOK "(", CUT, balanced-tail, TOK ")"] ⇒ CTOR context   (ONE context node: the value is the failure)
   … (hwb, lab, lch, oklab, color: W3's rows; NOT in the slice) }
modern-rgb   := SEQ[rgb-ch, WS, rgb-ch, WS, rgb-ch, OPT alpha-slash]
legacy-rgb   := SEQ[rgb-ch, WS, TOK ",", WS, rgb-ch, WS, TOK ",", WS, rgb-ch, OPT(SEQ[WS, TOK ",", WS, alpha])]
rgb-ch       := CLAMP 0 255 (ALT[ SEQ[NUM, TOK "%"] ⇒ SCALE 255 100,  NUM,  KW IDENT none ])
modern-hsl   := SEQ[hue, WS, pct-ch, WS, pct-ch, OPT alpha-slash]
legacy-hsl   := SEQ[hue, WS, TOK ",", WS, pct-only, WS, TOK ",", WS, pct-only, OPT(SEQ[WS, TOK ",", WS, alpha])]
hue          := ALT[ SEQ[NUM, DROP keyword (KW IDENT hue-unit)] ⇒ SCALE (unit.num) (unit.den),  NUM,  KW IDENT none ]
                 (UNWRAPPED — 480 stays 480, parser-band L15/L98; deg → SCALE 1 1, turn → SCALE 360 1, grad → SCALE 9 10,
                  rad → posture: SCALE is integer-only; `rad` needs 180/π — declared M-7 for .c)
pct-ch       := CLAMP 0 1 (ALT[ SEQ[NUM, TOK "%"] ⇒ SCALE 1 100,  NUM ⇒ SCALE 1 100,  KW IDENT none ])   (R6: `50` ≡ `50%`, band G3)
pct-only     := CLAMP 0 1 (SEQ[NUM, TOK "%"] ⇒ SCALE 1 100)
ok-l         := CLAMP 0 1 (ALT[ SEQ[NUM, TOK "%"] ⇒ SCALE 1 100,  NUM,  KW IDENT none ])
ok-c         := CLAMP 0 ∞ (ALT[ SEQ[NUM, TOK "%"] ⇒ SCALE 4 1000,  NUM,  KW IDENT none ])   (100% = 0.4; (v*4)/1000 exact)
alpha-slash  := SEQ[WS, TOK "/", WS, alpha]
alpha        := CLAMP 0 1 (ALT[ SEQ[NUM, TOK "%"] ⇒ SCALE 1 100,  NUM,  KW IDENT none ])   (§4.2: 1.5 → 1, band G4)
balanced-tail:= REP (ALT[ SEQ[TOK "(", REF balanced-tail, TOK ")"],  DROP keyword (SCAN any-but-paren 1 ∞) ]) 0 ∞
                 (the ONE REF; depth counted; > Θ.depthBound ⇒ ok:false; the `var(var(…))`>10,000 row of G-11 lands here)
```

The GROUND-A cross-product (`rgb()`, `rgb( )`, `rgb(/)`, … 21 heads × 10 fillings) falls through
`CUT` into the channel `ALT`s, whose last arm is a `FAIL`/`KW`-miss: every filling yields **one**
issue with a named expectation and a tiled `C` — no path reaches `grammar.ts:181`'s `undefined`.

### 9.2 `timing` (`parseTimingFunction` whole — the second value shape)

```
timing         := SEQ[WS, ALT[ KW IDENT timing-keyword ⇒ CTOR timing-keyword     (5 → {kind:"keyword", name})
                              KW IDENT step-alias      ⇒ CTOR steps               (step-start/step-end → count 1)
                              DISPATCH IDENT timing-head {
                                cubic-bezier : SEQ[TOK "(", CUT, WS, NUM, sep, NUM, sep, NUM, sep, NUM, WS, TOK ")"]
                                               ⇒ CTOR cubic-bezier   (guard x1,x2 ∈ [0,1] → FAIL css_syntax ["x in [0,1]"])
                                steps        : SEQ[TOK "(", CUT, WS, NUM, OPT(SEQ[sep, KW IDENT jump-position]), WS, TOK ")"]
                                               ⇒ CTOR steps          (guards: integer, ≥1, jump-none ⇒ ≥2; default PURE "jump-end")
                                linear       : SEQ[TOK "(", CUT, WS, REP linear-stop 2 ∞ sep, WS, TOK ")"]
                                               ⇒ CTOR linear-function }
                              FAIL css_syntax ["<timing-function>"] ], WS]
sep            := SEQ[WS, TOK ",", WS]
linear-stop    := SEQ[NUM, REP (SEQ[WS, NUM, TOK "%"] ⇒ SCALE 1 100) 0 2] ⇒ CTOR linear-stop   (input: [] | [n] | [n,n])
```

`types.ts:32–36`'s four kinds ↔ four constructor rows; `JumpPosition`'s four values ↔ the six
spellings of `R_kw jump-position` (`grammar.ts:457–460`).

### 9.3 The malformed qualified rule (`parseStylesheet`'s recovery scenario)

```
stylesheet     := SEQ[ REP (SEQ[WS, RECOVER css_syntax rule sync-rule]) 0 ∞, WS ]
rule           := ALT[ at-rule, qualified-rule ]                          (at-rule: W3; unknown-rule ctor exists in R_ctor)
qualified-rule := SEQ[ prelude, TOK "{", CUT, REP declaration 0 ∞ (WS, TOK ";", WS), WS, TOK "}" ] ⇒ CTOR style-rule
prelude        := SCAN any-but-brace-or-semi 1 ∞  ⇒ selectors (split on top-level "," is a CTOR guard, not a scan)
declaration    := SEQ[ IDENT, WS, TOK ":", CUT, WS, REF value, OPT(SEQ[WS, TOK "!", WS, LIT "important"]) ] ⇒ CTOR declaration
sync-rule      := SEQ[ SCAN any-but-semi-or-close 1 ∞, OPT(TOK ";") ]  (≥1 byte by SCAN's min — R-LAW-4 progress by construction)
```

The scenario `a { color: red } GARBAGE ) ; b { color: blue }`: the first rule parses; `GARBAGE ) ;`
fails `rule` before any `CUT` → `RECOVER` appends one `css_syntax` issue at `(m, f)`, `sync-rule`
consumes `GARBAGE ) ;` into `C.skipped`, the loop continues, the second rule parses; the product is
`ok:false` with `|D| = 1`, and `Ω` tiles the whole input (EQ-6). A second garbage site gives
`|D| = 2` (R-LAW-4).

---

## 10. Declared marks — rows, never silent picks; each with its escalation path

| id | mark | this draft's position | escalation path |
|---|---|---|---|
| **M-0** | COMP-1's reading: `C` carries no bytes, so `weave` is an **ownership identity** (§2.3), not a generator | ADOPTED as the draft ruling; the alternative (text in `C`) is a CST fragment and fails L-NOCST | `.c` rules at ratification; if `.c` requires a generating `weave`, `C`'s shape must change in `ALGEBRA.md` §State and the change is the owner's (it alters §3b's fixed table) |
| **M-1** | token juxtaposition (`rgb(50%20%30%)`, `rgb(1.5.5 3)`, `hsl(120 50%50%)`) | the band's token-stream reading is realized: `WS` is `SCAN ws 0 ∞` (zero-width allowed) between channels, so juxtaposed tokens parse; `1.5.5` → `NUM` scans `1.5`, then `.5` — **a DECLARED divergence row from the published 4.0.0 (which rejects)**; `LOOK` (OP-20) exists so `.c` or the owner can flip to strictness by inserting `NOT (LIT ".")` after `NUM` without a new operator | owner's ruling (parser-band DISSENT L140: *"the owner may overrule toward cand-F's stricter line"*); until ruled, the row stays declared in `.g`'s corpus and never becomes a silent expectation |
| **M-2** | the `try/catch` shield | **NONE in this draft**: with `REF` counted and `REP` iterating, the grammar has no unbounded recursion, so cand-F's posture (parser-band L142) is tenable by construction; a candidate that adds a shield must run the raw-σ-over-corpus instrument and prove it non-load-bearing (K-7) | owner (DISSENT L142 *"the shield may be removed"* once depth-bounded — that condition is met structurally here; `.c` records whether the removal is ruled or carried) |
| **M-3** | non-finite numerals (`1e400`, NaN from `NUM`) | `NUM` yields `±Infinity` per the JS `Number` grammar; `CLAMP` absorbs it where a clamp exists (`rgb(1e400 0 0)` → 255); an **unclamped** channel receiving a non-finite value fails at the `CTOR` guard with `⟨css_syntax, ["finite <number>"]⟩` (the band's `color_non_finite` is **not a frozen `ParseIssue` code** — `types.ts:12–19` has 8 codes and it is not among them; the closest frozen code is `css_syntax`, and the label carries the meaning) | owner (DISSENT L141: *"deserves an owner ruling"*); `.c` must additionally rule the code mapping since the band's name does not exist on the frozen surface — a finding of this draft |
| **M-4** | runtime `Object.freeze` on `V` | **normative at the boundary only** (`ENTRY` deep-freezes on success; the algebra's `CTOR`s do not freeze — the Wasm arena is immutable by construction); G-8 measures the freeze as its own leg (cand-O paid ×1.01–1.02, parser-band L76) | owner may rule freezing non-normative; the boundary is the single site to flip, and the frozen `Readonly<…>` types are unaffected either way |
| **M-5** | `Θ.depthBound` default | **64**: the 403-string oracle corpus's max nesting is **8** (X-P-W1.md L1050, item 335); 64 is 8× that and 121× below this box's measured `lazy` ceiling (7,759 → `RangeError` at 7,760, W1 F-1); the G-11 row (`var(var(…))` past 10,000) returns `ok:false` at depth 65 in both lowerings | `.c` ratifies the default; the parameter itself is not a mark (it is O-8's requirement) |
| **M-6** | `REP` (OP-10) is an operator **beyond** §3b's listed families | added because a list is not a back-edge: lowering lists through `REF` would spend depth per item and put `parseCssValues`/`parseStylesheet` under `Θ.depthBound`; iteration with the progress law is the honest carrier and has a trivial zero-import Wasm lowering (a loop) | `.c` rules whether `REP` stands or lists lower through `REF` with a per-production bound; the cost of the rejected reading is stated either way |
| **M-7** | `SCALE` is integer-only; `rad` hue needs `180/π` | `hue-unit rad` is carried as `SCALE 180 1` followed by a constructor-side division by `Math.PI` in **both** lowerings (Wasm: the f64 constant `0x400921FB54442D18`); a transcendental constant is not an exact scale and is declared, not hidden | `.c` rules whether `rad` enters the slice's `R_kw hue-unit` at all (the incumbent's `channelToken` accepts it, `grammar.ts:134–153`) or is a W3 row |
| **M-8** | issue span rule L-FARTHEST vs the incumbent's `0..|S|` | site-accurate spans adopted; a **declared third-cell divergence** on EQ-4's `start`/`end`/`actual` for every rejected input | `.c` ratifies; no owner ruling needed — the published behaviour is a documented default (`grammar.ts:50–51`), not a contract |

---

## 11. What the bijection walk prints from this contract (G-1 / G-2 shape)

```
OPERATORS        20   OP-01..OP-20        js: 20 lowered   wasm: 20 lowered   misbound: 0
REGISTRY R_cls    7   sha256 <tables>     js == wasm
REGISTRY R_kw     7   rows 148+5+2+6+1+20+4
REGISTRY R_disp   3   rows 11+3+8
REGISTRY R_ctor  18   arity/leafMap checked against types.ts
LABELS  L         n   sha256 <labels>     js == wasm
GRAMMAR G         m   productions; REF sites: 1 (balanced-tail); RECOVER-in-nonfinal-ALT: 0; CUT-outside-ALT: 0
TARGET-CONDITIONALS 0   (grep -rnE "isWasm|target\s*===|TARGET_JS|TARGET_WASM" → 0)
```

A candidate whose registry differs from the contract's in any row — not count — is the v12 shape
and fails before any timing.

---

## 12. Sub-gate self-check (§5.a) and coverage of §3b's families

| §3b family | operator(s) |
|---|---|
| sequence | OP-06 `SEQ` (+ OP-09 `PURE`, OP-10 `REP`) |
| ordered committed choice | OP-07 `ALT` |
| token-class scan | OP-01 `SCAN`, OP-02 `LIT` |
| span-into-`C` | OP-11 `DROP` |
| channel-table dispatch | OP-12 `DISPATCH` |
| value construction with provenance append | OP-03 `NUM`, OP-04 `DIGITS`, OP-05 `KW`, OP-16 `CTOR` |
| clamp | OP-14 `CLAMP` |
| exact scale `(value * num) / den` | OP-15 `SCALE` |
| labelled zero-width failure with named expectations | OP-13 `FAIL` (+ the miss paths of OP-05/OP-12) |
| bounded back-edge (depth an algebra parameter) | OP-19 `REF` with `Θ.depthBound` |
| commit point | OP-08 `CUT` (+ OP-20 `LOOK`) |
| mark / rollback | OP-17 `TRY` |
| recover / resync with declared synchronization | OP-18 `RECOVER` |

13 of 13 families covered. **Zero CST**: no carrier kind has children with spans (§3 preamble,
L-NOCST); `C`, `P`, `D` are flat arrays; `V` is the frozen type and nothing else. **Model receipt**:
line 1 of this file. **Blindness**: `draft-opus.md` unopened; no shared skeleton.

*Authored 2026-09-17 by `X.P.W2.a` (served model `claude-fable-5-1`); read-only against every tree;
value.js at `f62bf82b` + working tree; `/Users/mkbabb/Programming/parse-that` and `<p2>` untouched.*
