claude-opus-5[1m]

# CHALLENGE — `leaf` · LIBRARY axis

**Target**: `/Users/mkbabb/Programming/parse-that/typescript/src/parse/leaf.ts` (399 lines, 14,876 B, mtime 2026-07-03)
**Package**: `@mkbabb/parse-that@1.0.0` · `"type": "module"` · `"sideEffects": false`
**Evidence root**: `/Users/mkbabb/Programming/parse-that` main checkout, READ-ONLY. No worktree, no frozen root, no `~/Documents` entered.
**STOP-check**: `test -e /Users/mkbabb/Programming/parse-that-css-totality-p2` → **ABSENT** (verified 2026-08-04, `ls` → `No such file or directory`). Nothing created. No STOP finding.
**Posture**: module assumed DEFECTIVE until the tree proved otherwise. Every row below carries severity + `file:line` + a falsifier. Where I ran, I ran read-only `node --input-type=module -e` probes against the built `typescript/dist/` — **no file written anywhere but this one**, **`enableDiagnostics()` never called**, **`memoize()`/`mergeMemos()` never constructed** (the PT-03 latch is one-way and is still cold in every probe process). No timing bench was run; every number below is a **count** or a **`%HasHoleyElements` predicate**, never a duration.

**Read whole**: `leaf.ts` and every module it imports — `parser.ts` (711), `state.ts` (189), `utils.ts` (186), plus the transitive `debug.ts` (383), `lazy.ts` (43), `packrat.ts` (488), `core.ts` (26), `index.ts` (14), `diagnostics.ts` (14), and the emitted `dist/leaf.d.ts` + `dist/packrat-entry-CS1td-8B.js` + `dist/diagnostics-DDazRHgl.js`.

**Corpus folded, not re-invented**: INBOX **O-15** (`docs/tranches/V/coordination/INBOX.md:77`, PT-01/PT-03/PT-04/PT-07); the X·P wave specs `docs/tranches/X/parse-that/waves/W1.md` (harness constraints; G-4←PT-03, G-5←PT-01, G-9←PT-04, the JS-boundary invariant←PT-07) and `W2.md` (algebra candidates); `docs/tranches/V/megatranche/registry/adjudicated/parser-band.md` (cand-O verdict, the five binding debts, G1–G8, the preserved DISSENTs).

---

## 0. VERDICT

`leaf.ts` is **two modules wearing one filename**: five genuinely excellent terminal parsers (`string`, `regex`, `trimStateWhitespace`, and the `dispatch` table structure) and three n-ary combinators (`any`, `all`/`fuseAll`, `dispatch`'s control flow) whose **declared types do not describe their runtime behaviour**. The terminals are among the best allocation-disciplined code in the package — §5 records seven superlatives, and they are not consolation prizes. The combinators ship **three blocker-grade defects**, one of which (`all()` dropping `undefined` children and collapsing the tuple) is **live and silently wrong inside the library's own test suite** (`test/math.test.ts:18-21`, verified §1.2), and one of which (`regex()` rejecting at end-of-input) makes the package's **own exported `whitespace` parser fail on every input it is asked to trail** (verified §1.3).

The parser-band adjudication already paid for this without naming it: `parser-band.md:108` records the idiom law "`.opt()` only ever behind `.then()`/`.next()`, **never inside `all()`**", and `parser-band.md:134` (G8) makes "no `.opt()` child of any `all()`" a **structural graph-walk gate** that both candidates had to build. **That gate exists because of `leaf.ts:199/207/230/238/246/267`.** A consumer ecosystem that must walk the built combinator graph to defend against a leaf combinator's type lie has diagnosed the defect precisely and then routed around it. This challenge names it.

**Counts**: 3 BLOCKER · 13 MAJOR · 13 MINOR · 2 INFO = **31 defects** · **7 superlatives**.

---

## 1. BLOCKERS

### L-B1 — `all()` at arity 1 returns the child's value, not a 1-tuple; the published `.d.ts` says otherwise
**Severity**: BLOCKER · **Provenance**: `src/parse/leaf.ts:160-163` (`parsers.length === 1 ? parsers[0].parser : fuseAll<Result>(parsers)`), declared type at `src/parse/leaf.ts:155-158` + shipped at `dist/leaf.d.ts` (`export declare function all<T extends Array<Parser<any>>>(...parsers: T): Parser<{ [K in keyof T]: T[K] extends Parser<infer V> ? V : never; }>`).

The arity-1 short-circuit hands back **the child's raw `ParserFunction`**. `ExtractValue<[Parser<string>]>` is `[string]`, so the call is typed `Parser<[string]>`; at runtime it yields `"a"`.

```
A1 all(p) arity-1 runtime value: "a" | Array.isArray: false
A2 all(a,b) arity-2:             ["a","b"]
```
**Falsifier**: `Array.isArray(all(string("a")).parse("a")) === true`. It is `false`. Falsifier fails; finding stands.

**Why blocker**: this is not an edge case behind a flag — it is the unconditional behaviour of a public generic whose whole purpose is to produce tuples, and TypeScript will happily let a consumer write `const [x] = all(p).parse(s)` (destructuring a string yields its first *character*). `parser-band.md:108` records that both candidates use "fixed arity as `all()` typed tuples (zero `!` under `noUncheckedIndexedAccess`)" — that idiom is **type-unsound at arity 1** and neither candidate's gate catches it, because both happened to write arity ≥ 2.

**Cure**: delete the short-circuit (route arity 1 through a 1-arity `fuseAll` arm), or type the arity-1 overload as `Parser<V>`. The former preserves the documented contract; the latter breaks it.

### L-B2 — `all()` silently drops `undefined` children and **shifts every later element left**; declared arity is fixed, runtime arity is variable
**Severity**: BLOCKER · **Provenance**: `src/parse/leaf.ts:199, 207` (arity-2), `:230, 238, 246` (arity-3), `:267` (general) — `if (state.value !== undefined) out[w++] = state.value;` — plus the truncations at `:209, 248, 270` (`if (w !== n) out.length = w;`).

Any child that succeeds with `undefined` is erased from the result **and the positions after it collapse**. Three first-party producers of success-with-`undefined` feed straight into this: `.opt()` (`parser.ts:241` `state.ok(undefined)`), `regex()`'s empty-match path (`leaf.ts:355` `state.unsafeSetValue(undefined)`), and `regex()`'s `matchFunction === ""` path (`leaf.ts:342`).

```
C1 all(a, /x*/, b).parse("ab") = ["a","b"]   declared arity 3, runtime len 2
C2 all(a, z.opt(), b).parse("ab")  = ["a","b"]
C3 all(a, z.opt(), b).parse("azb") = ["a","z","b"]
```
One call site, two arities. Positional destructuring is silently wrong in exactly the branch where the optional is absent.

**It is live in the library's own tests.** `test/math.test.ts:18-21`:
```ts
const exponent = all(regex(/[eE]/), regex(/[-+]/).opt(), digits)
    .map(([, exponentSign, exponent]) => `e${exponentSign ?? ""}${exponent}`)
```
Verified reproduction against `dist/`:
```
Q1 raw all() on "e5"  (sign ABSENT):  ["e","5"]     len 2
Q2 raw all() on "e+5" (sign PRESENT): ["e","+","5"] len 3
Q3 mapped "e5"  -> "e5undefined"   <-- MALFORMED
Q4 mapped "e+5" -> "e+5"
Q5 parseFloat("1"+mapped) = 100000 (correct 100000)  <- masked by parseFloat lenience
Q6 Number("1"+mapped)     = NaN                       <- what a strict consumer sees
```
The grammar emits the string `"e5undefined"`. The suite is green **only because `parseFloat` truncates at the first invalid character**. `Number()` — or any strict numeric coercion, which is what a CSS value pipeline uses — yields `NaN`.

**Falsifier**: "`all()`'s runtime arity always equals its declared arity." Q1/Q2 refute it from one call site. "The drop is harmless because consumers destructure defensively." Q3 refutes it inside parse-that's own test tree.

**Corpus tie**: this is the root cause of `parser-band.md:108`'s idiom law and `parser-band.md:134`'s G8 structural gate. Both candidates independently had to forbid `.opt()` under `all()` — a lint invented to survive a type lie. The wave should record the debt against `leaf.ts`, not against grammar authors.

**Cure (KISS)**: write every child unconditionally (`out[i] = state.value`) and let the tuple type be honest; `undefined` is a legitimate tuple element. If the drop must be preserved for compatibility, it must be **in the type** (`Parser<Array<V>>`, not a tuple) — a breaking but truthful change.

### L-B3 — `regex()` rejects unconditionally at end-of-input, so every **nullable** regex terminal — including the package's exported `whitespace` — fails at EOF
**Severity**: BLOCKER · **Provenance**: `src/parse/leaf.ts:327-330`
```ts
if (state.offset >= state.src.length) { state.isError = true; return state; }
```
`whitespace` is `regex(/\s*/)` (`leaf.ts:397`) and is a public export of both `.` (`index.ts:9`) and `./core` (`core.ts:24`). `/\s*/` matches the empty string at EOF and must succeed; the guard makes it error.

```
B1 regex(/\s*/).parseState("")                       isError: true
B2 whitespace (context.name="whitespace") on ""      isError: true
B3 all(string("a"), whitespace).parseState("a")      isError: true
B4 all(string("a"), whitespace).parseState("a ")     isError: false
B5 string("a").skip(whitespace).parseState("a")      isError: true
B6 string("a").trim(whitespace,false).parseState("a") isError: true
B7 string("a").trim().parseState("a")                isError: false   (flag path — dodges it)
```
B3 is the headline: **`all(string("a"), whitespace)` cannot parse `"a"`.** B6 reaches it through the documented public API with the documented default argument (`Parser.trim(parser = whitespace, discard = false)`, `parser.ts:480-486` → `all(parser, this, parser)`). B7 shows the only reason this is not a total outage: `.trim()` with the default and `discard = true` takes the `FLAG_TRIM_WS` branch (`parser.ts:488-496`) and uses `trimStateWhitespace` instead — a **different code path with a different whitespace alphabet** (see L-M7). The defect is masked by an inconsistency, not by a fix.

The guard's stated purpose is an early-out. It is wrong for any nullable pattern (`x*`, `x?`, `(?:)`, lookahead-only), and there is no way for a caller to opt out.

**Falsifier**: "`regex(/\s*/)` succeeds zero-width at EOF like every other nullable matcher." B1 refutes it. "`whitespace` is internal." `index.ts:9` and `core.ts:24` export it; `dist/leaf.d.ts` declares it.

**Cure**: delete the guard. The sticky-`test()` path at `:344` already handles EOF correctly (`lastIndex = len`, empty match, `end === savedOffset` → the `:354-357` empty-match arm). The guard is a redundant fast-exit that changes semantics.

---

## 2. MAJOR

### L-M1 — `dispatch()`'s `Int8Array` index truncates: **silent wrong-parser dispatch** above 127 interned parsers, **silent wrong accept** at 256
**Severity**: MAJOR · **Provenance**: `leaf.ts:101` (`new Int8Array(128).fill(-1)`), `:104-111` (`internParser` monotonic index), `:119/:122` (`tbl[c] = idx`), `:137-141` (`idx >= 0` → `parsers[idx]`).

`idx` is an unbounded array index stored into a **signed 8-bit** cell. `idx ∈ [128,255]` stores negative → the char reads as unmapped (silent reject). `idx = 256` stores `0` → **dispatches `parsers[0]`**.

```
F1  201 distinct parsers, key "Z" -> intern idx 200 -> Int8Array(200) = -56
    parseState("Z") isError: true  (char IS mapped; silently rejected)
F2b 257 distinct parsers; key "W" bound to string("NOPE") at intern idx 256 -> stored 0
    parseState("W") isError: false  value: "W"  offset: 1
    => WRONG ACCEPT: parsers[0]=regex(/./) ran instead of the bound string("NOPE")
```
F2b is a **silent wrong answer**, the worst class for a parser library: the caller receives a successful parse produced by a parser it never bound to that character.

**Honest bound**: unreachable for the CSS grammars this package serves (`parser-band.md` cand-O/cand-F both bind well under 30 heads per table). It is a latent boundary defect, not a shipping outage — hence MAJOR, not BLOCKER. It is also **one character to fix**: `Int16Array` (256 B) or `Int32Array` (512 B) removes the ceiling entirely; the table is allocated once per `dispatch()` construction.

**Falsifier**: "the intern index cannot exceed the 128 table slots." `internParser` is called at `:114` for **every** entry before the chars are examined (`:116-124`), so entries whose chars collide still consume intern indices. F1/F2b construct it.

### L-M2 — `dispatch()`'s range syntax **hijacks any 3-char key whose middle character is `-`**; reversed ranges are silent no-ops
**Severity**: MAJOR · **Provenance**: `leaf.ts:116-124` (`if (chars.length === 3 && chars[1] === '-')`), doc at `:86-88` (keys may be "single chars", "ranges", or "multi-char").

The docstring offers three key forms with **no stated precedence and no escape**. A user writing the canonical CSS numeric-head set as a multi-char key gets a range instead:

```
E1 dispatch({"+-.": /./}) on ","   accepted: true   <-- "," is NOT in the key
E2 dispatch({"+-.": /./}) on "-":true  "+":true  "."`:true
E3 control dispatch({"+.": /./}) on "," accepted: false
E4 dispatch({"9-0": /./}) on "5"   accepted: false  (reversed range = silent no-op)
```
`"+-."` silently maps char codes 43–46 = `+ , - .`. In CSS, `,` is a *separator* — routing it into a number head is a live over-acceptance for exactly the grammar X·P W2/W3 will write (`W2.md:810` inherits the G8 idiom gates; nothing there catches this).

E4: `"9-0"` maps **nothing** (`for (c = 57; c <= 48; ...)` never runs) with no diagnostic.

**Falsifier**: "no realistic grammar writes a 3-char key with a middle hyphen." `+-.` is the CSS-syntax number-start set, verbatim. "The docstring warns of the ambiguity." It does not — `:86-88` presents both forms as independent.

**Cure**: require an explicit range marker (`{ range: ["0","9"] }`), or match ranges only when both outer chars are alphanumeric and lo ≤ hi, and **throw** on a reversed range rather than silently mapping nothing.

### L-M3 — `all()` returns **HOLEY_ELEMENTS** at arity ≥ 4 and **PACKED_ELEMENTS** at arity 2–3, from the same API
**Severity**: MAJOR · **Provenance**: `leaf.ts:191` / `:222` (`[undefined, undefined(, undefined)]` — packed literal) vs `leaf.ts:257` (`new Array(n)` — holey). Verified with `--allow-natives-syntax`:

```
K arity2 len 2 | HasHoleyElements: false | HasPackedElements: true
K arity3 len 3 | HasHoleyElements: false | HasPackedElements: true
K arity4 len 4 | HasHoleyElements: true  | HasPackedElements: false
K arity5 len 5 | HasHoleyElements: true  | HasPackedElements: false
N4 new Array(5) fully written stays holey: true
N1 arity3 with a dropped undefined: len 2 packed: true
N2 arity5 with a dropped undefined: len 4 packed: false holey: true
```
Elements-kind transitions are one-way toward more general: writing every slot of a `new Array(n)` does **not** restore PACKED (N4). So arity ≥ 4 results are permanently holey, and every downstream consumer of `all()` results (`.map`, `for…of`, destructuring, `join`) sees **two elements kinds from one call site** — the exact IC pollution the module's own comments (`:166-177`) claim to be avoiding.

This module is on the hot path of a parser library; `print.test.ts:15` (`all(a,b,c,d).many()`) already builds arity-4 results in-tree.

**Magnitude: UNMEASURED.** Per `parser-band.md:74-78` ("No speed claims outside the printed table") I assert the *mechanism* and the *predicate*, not a throughput delta. The predicate is the finding.

**Cure, verified**: `new Array(n).fill(undefined)` → `N3 packed: true, holey: false` (and stays packed through `out.length = w`). One method call at construction of each result array.

**Falsifier**: "V8 re-packs a fully written holey array." N4 refutes it. "The three arms produce the same shape." K refutes it.

### L-M4 — `fuseAll` allocates the result array **before the first child runs**, so every **failed** `all()` allocates garbage — on the reject path `parser-band.md` named a binding debt
**Severity**: MAJOR · **Provenance**: `leaf.ts:190-198` (arity-2: `const out = [undefined, undefined]` at `:191`, `p0.parser(state)` at `:193`, error return at `:194-198`), `:221-229` (arity-3), `:257-266` (general).

On the failure path the array is allocated, never written, and abandoned. In a backtracking alternation — `any(all(...), all(...), …)`, the shape of every CSS function-head grammar — **each failed arm allocates one array**. The comment at `:174-176` calls it "ONE result array per call (the deliverable)"; on the reject path it is not a deliverable, it is garbage.

`parser-band.md:117` makes this a **binding debt on the wave**: "*Reject-path budget. cand-F fails ~1.3–1.4× faster (0.86× vs 0.64× of published). The wave's bench gate must track the reject path as its own leg.*" This allocation sits directly in that leg and is free to remove.

**Magnitude: UNMEASURED** (honesty law). The structural fact is the finding.

**Cure (KISS, semantics-identical)**: hoist the `out` allocation below the first child's error check. Arity-2 becomes: run `p0`, bail on error, *then* `const out = [undefined, undefined]`.

**Falsifier**: "the array is needed before p0 because p0 writes into it." It does not — `:199` writes only after the check.

### L-M5 — `regex()` reads `sticky.lastIndex` **after** running user code, so a re-entrant `matchFunction` drives `state.offset` **past `src.length`**
**Severity**: MAJOR · **Provenance**: `leaf.ts:333` (`sticky.lastIndex = savedOffset`), `:337` (`sticky.exec`), `:338` (`matchFunction!(execResult)` — **arbitrary user code**), `:340` (`state.ok(match, sticky.lastIndex - savedOffset)` — reads mutable regex state *after* the user code).

`sticky` is a per-construction closure singleton (`:322`). A `matchFunction` that re-enters the same parser (directly, or via a nested `.parse()` — the exact re-entrancy class `packrat.ts:158-185` PT-Q1 was hardened against) clobbers `lastIndex` between `exec` and the read.

```
M4 re-entrant matchFunction on "aa": value "aa" offset 8   (src length 2)
M5 control, no re-entrancy:          value "aa" offset 2
```
**`state.offset = 8` on a 2-character source.** That offset then flows into `eof` (`leaf.ts:13` `offset >= src.length` → **true**, so `eof()` spuriously succeeds), into `getLineAndColumn` (`state.ts:127`), and into every subsequent `substring`/`charCodeAt`.

Note the asymmetry: `packrat.ts` got a full `try/finally` epoch save/restore for re-entrancy (PT-Q1), while the leaf that hands control to user code mid-operation got nothing.

**Falsifier**: "`matchFunction` cannot re-enter." It is a caller-supplied closure with no restriction; M4 constructs one in four lines.

**Cure**: `const end = sticky.lastIndex;` immediately after `:337`, before `:338`. One line, zero semantic change in the non-re-entrant case.

### L-M6 — `regex()`'s EOF guard skips `mergeErrorState`, so a failure at EOF **does not advance `furthest`** and contributes no label — asymmetric with every other leaf
**Severity**: MAJOR · **Provenance**: `leaf.ts:327-330` (no merge) vs `:360` (merge), `:291`/`:303` (`string` merges), `:16` (`eof` merges).

```
M1 regex(/\d+/) at EOF (offset 2, len 2): isError true  furthest -1   <- NOT merged
M2 regex(/\d+/) mid-input (offset 1):     isError true  furthest  1   <- merged
M3 string("x")  at EOF (offset 2, len 2): isError true  furthest  2   <- merged
```
`parser.ts:60` renders the error display at `state.furthest >= 0 ? state.furthest : state.offset`. A parse whose deepest failure is a regex-at-EOF therefore reports a **stale, earlier** position — the furthest-offset model's single job, silently defeated at the most common failure position in a parser (running out of input).

**Falsifier**: "the caller's `offset` is right even if `furthest` is not." `parser.ts:60-66` builds the error view from `furthest` when it is ≥ 0, so an earlier merge from a *shallower* failure wins over the deeper EOF failure.

**Cure**: fold into L-B3's cure — deleting the guard routes EOF through `:360`, which merges.

### L-M7 — **Three mutually inconsistent whitespace alphabets** ship in one package; `/\s*/` over-accepts NBSP, which CSS does not treat as whitespace
**Severity**: MAJOR · **Provenance**: `leaf.ts:383` (`c === 32 || (c >= 9 && c <= 13)`), `leaf.ts:397` (`whitespace = regex(/\s*/)` — Unicode `\s`), `utils.ts:162` (`skipWhitespace`: `charCodeAt(i) <= 32`).

Measured across 10 code points:

| code point | `trimStateWhitespace` | `whitespace` (`/\s*/`) | `skipWhitespace` (`<=32`) |
|---|---|---|---|
| U+00A0 NBSP | no | **yes** | no |
| U+FEFF ZWNBSP/BOM | no | **yes** | no |
| U+2028 LS | no | **yes** | no |
| U+2003 EM SPACE | no | **yes** | no |
| U+3000 IDEOGRAPHIC SPACE | no | **yes** | no |
| U+000B VT | **yes** | **yes** | **yes** |
| U+000C FF | yes | yes | yes |
| U+0000 NUL | no | no | **yes** |
| U+000E SO | no | no | **yes** |
| U+001B ESC | no | no | **yes** |

Only tab/LF/CR/FF/VT/space agree. Against css-syntax-3 §4.2 (whitespace = newline, U+0009, U+0020) **all three over-accept**: `trimStateWhitespace` admits VT; `/\s*/` admits NBSP, BOM, LS/PS and the Unicode space separators; `skipWhitespace` admits every C0 control. **NBSP is a valid ident code point in CSS** — consuming it as whitespace is a spec divergence in the exact domain this package's largest consumer occupies.

The divergence is *reachable by choosing a code path*: `.trim()` with the default takes `trimStateWhitespace` (`parser.ts:488-496`), `.trim(whitespace, false)` takes `/\s*/` (`parser.ts:484-486`). Same argument, two alphabets. Verified as B6/B7 in L-B3.

**Falsifier**: "the three are used in disjoint domains." `parser.ts:481` makes `whitespace` the **default argument** of the same method that dispatches to `trimStateWhitespace`; `utils.ts:158-164` advertises `skipWhitespace` as the primitive "value.js's canonical CSS grammar drives its hot paths with".

### L-M8 — PT-01 confirmed at the bytes **and extended**: the disabled diagnostics feature reallocates **two arrays per furthest-advance** on the default path
**Severity**: MAJOR · **Provenance**: `utils.ts:33-35` / emitted `dist/diagnostics-DDazRHgl.js:14-16`:
```js
state.expected = diagnosticsEnabled && label ? [label] : void 0;
state.suggestions = [];
state.secondarySpans = [];
```
Lines 15–16 are **unguarded by `diagnosticsEnabled`**. Every furthest-advance — driven by leaf.ts's seven `mergeErrorState` call sites (`:16, :54, :69, :142, :291, :303, :360`) — allocates two fresh arrays for a feature that is off. `ParserState` allocates two more per construction (`state.ts:44-45`, emitted `dist/packrat-entry-CS1td-8B.js:301-302`).

Measured counts (counts, not timings; instrumented via property setters on a `ParserState`, grammar built from leaf combinators):

| corpus | length | furthest advances | **arrays reallocated** |
|---|---|---|---|
| `rgb(255, 128, 0)` through an 8-head `any()` | 16 | 1 | 2 |
| `zzz(1, 2, 3)` (reject) | 12 | 1 | 2 |
| 20-element `sepBy` list, 4-way `any()` head | 88 | 20 | **40** |
| 60-element `sepBy` list, 4-way `any()` head | 228 | 60 | **120** |
| 60-element list, first-arm-always-matches | 288 | 0 | 0 |

**Honest reading**: the cost is grammar-shape-dependent and is **zero** when the leading alternation arm always matches (row 5) — I over-expected before measuring, and say so. Where alternation arms fail at advancing offsets it is ≈ 2 arrays per grammar element, against O-15 PT-03's 93.9 ns/parse unarmed baseline.

**PT-01 line-cite reconciliation** (O-15 row, `INBOX.md:77`):
- `dist/diagnostics-DDazRHgl.js:14` — **CONFIRMED verbatim**.
- `dist/packrat-entry-*.js:881` for the coupled `console.error` — at the bytes, `:881` is the guard `if (isDiagnosticsEnabled()) {` and `:882` is `console.error(this.state.toString());`. **One-line drift; the coupling claim is unaffected.** Recorded as a correction to the cite, not a contradiction of the row.
- The coupling itself: `parser.ts:67-69` is the **only** consumer-visible effect of arming besides the label at `utils.ts:33/38`, and it is **unconditional and uninjectable** — no logger parameter, no opt-out. `parserDebug` takes a `logger` (`debug.ts:355`); `parseStateInner` does not. A consumer who wants `expected[]` from `leaf.ts`'s three labels (`:132`, `:278`, `:324`) must accept stderr writes on every failing top-level parse.

**Falsifier for the extension**: "the two array assignments are inside the diagnostics guard." `dist/diagnostics-DDazRHgl.js:14-16` shows the guard covers only line 14.

**Cure**: guard `:15-16` with `diagnosticsEnabled`, or hoist a frozen shared empty array. Both are one line and preserve armed behaviour exactly.

### L-M9 — `any()` at arity 1 and `dispatch()` **do not restore `offset` on failure**; `any()` at arity ≥ 2 does
**Severity**: MAJOR · **Provenance**: `leaf.ts:76` (`n === 1 ? parsers[0].parser : anyParser`), `leaf.ts:140` (`return parsers[idx].parser(state)` — direct return, no restore, no merge), vs `leaf.ts:45-46/51-52` and `:66-67` (the ≥ 2 arms restore).

```
G0 bare P = string("a").chain(()=>string("b")) on "ax": isError true  offset 1
G1 any(P)          on "ax": isError true  offset 1   <- leaked
G2 any(P, ZZ)      on "ax": isError true  offset 0   <- restored
G3 dispatch({a:P}) on "ax": isError true  offset 1   <- leaked
```
Three spellings of "try this alternative", three different post-failure offsets. A caller that swaps `any(p, q)` → `any(p)` (or → `dispatch({…})` for the O(1) win the docstring at `:81-84` advertises) silently changes backtracking behaviour. `dispatch` additionally merges **no** error label when the selected arm fails (only when no arm is selected, `:142`), so the committed-choice failure is diagnostically invisible.

**Falsifier**: "no first-party combinator advances then fails." `Parser.chain` (`parser.ts:131-138`) returns on inner error without restoring, and `Parser.or` (`:105-116`) returns `other`'s state unrestored. G0 constructs it from two leaf primitives.

**Cure**: `dispatch` — save/restore `off` around the arm and merge `label` on arm failure. `any` — drop the arity-1 short-circuit (it also removes L-m3's dead closure).

### L-M10 — the `parser.ts ↔ leaf.ts` cycle makes package correctness depend on the **textual order of export statements**, and `"sideEffects": false` is false
**Severity**: MAJOR (source-tree; **not** reachable through the published single-chunk bundle) · **Provenance**: `leaf.ts:395` (`export let whitespace: ReturnType<typeof regex>;` — declared **non-optional**, never initialized in-module), `leaf.ts:396-398` (`_initWhitespace`), `parser.ts:711` (top-level `_initWhitespace();`), `parser.ts:6` (`parser.ts` imports `leaf.js`), `leaf.ts:1` (`leaf.ts` imports `parser.js`), `package.json:6` (`"sideEffects": false`).

ES module semantics: `export let x` creates the binding at instantiation in **TDZ**; it leaves TDZ when its declaration statement executes during *evaluation*. If `leaf.js` is evaluated first, its dependency `parser.js` evaluates to completion — including `_initWhitespace()` at `:711` — **before `leaf.ts:395` runs**. Assigning to a TDZ `let` throws:
```
J0 TDZ mechanism: ReferenceError: Cannot access 'x' before initialization
```
The package is safe today **by accident of statement order**: `core.ts` exports `./parser.js` at line 7 and `./leaf.js` at line 16; `index.ts` at lines 2 and 9. Moving the `leaf.js` export above the `parser.js` export in either barrel makes `import "@mkbabb/parse-that"` throw at load. There is no test, no comment, and no lint pinning that order — `dist-surface.test.ts` and `subpath-gate.mjs` test the export *set*, not the evaluation order.

The comment at `leaf.ts:393-394` says the deferral exists "to avoid constructing Parser instances during circular module initialization." The chosen mechanism **relocates** the cycle hazard from a construction-order problem into a TDZ problem, and hides it behind a barrel's line ordering.

**Honest scope**: the published dist bundles both modules into one scope (`dist/packrat-entry-CS1td-8B.js:656` `let whitespace;`, `:1416` `_initWhitespace();`) — **no TDZ at runtime in the shipped artifact**. The hazard is live for (a) anyone consuming `src/` — which is exactly what X.P.W0's fresh root will do — and (b) any build emitting `leaf` as its own chunk.

`"sideEffects": false` (`package.json:6`) is a **false declaration**: `parser.ts:711` is a top-level call that mutates another module's state. That flag is precisely the licence a bundler needs to prune it.

**Falsifier**: "the deferral is safe because functions are hoisted." `_initWhitespace` is hoisted; the `let` it assigns is not. J0 demonstrates the mechanism. "The bundle proves it works." It proves the *bundle* works; §L-M10's scope statement concedes that explicitly.

**Cure**: break the cycle. `all`, `eof`, and `trimStateWhitespace` are the only three symbols `parser.ts` needs from `leaf.ts` (`parser.ts:6`); moving them (or moving `Parser` into a `parser-core` module) removes the cycle, the deferral, the TDZ, and the false `sideEffects` claim together. See L-i1.

### L-M11 — `ParserFunction<T>` is **phantom**: `T` is unused, so all nine `as ParserFunction<X>` casts in this module assert nothing
**Severity**: MAJOR · **Provenance**: `parser.ts:14-16`
```ts
export type ParserFunction<T = string> = (val: ParserState<any>) => ParserState<any>;
```
`T` appears nowhere in the body. `ParserFunction<string>`, `ParserFunction<Result>` and `ParserFunction<never>` are the **same type**: `(any) => any`.

`leaf.ts` contains **9** such casts (`:57, :72, :148, :211, :250, :272, :294, :306, :366`) plus **16** `as ParserState<unknown>` casts — **25 assertions in 399 lines**, of which the 9 are type-theoretically vacuous and the 16 launder a real variance hole. The module reads as heavily typed; the type system is checking almost nothing across those boundaries. This is the mechanism by which L-B1 and L-B2 pass `tsc --strict` in silence.

**Falsifier**: `type Eq = ParserFunction<string> extends ParserFunction<number> ? true : false` — it is `true` in both directions.

**Cure**: make it `(state: ParserState<T>) => ParserState<T>` and fix the fallout, or delete the parameter and stop pretending. The middle position — a parameter that exists to look typed — is the defect.

### L-M12 — ~110 lines of arity-unrolled duplication justified by **uncited** perf comments, with **no test file** pinning the arms' equivalence
**Severity**: MAJOR · **Provenance**: `leaf.ts:182-211` (arity-2), `:214-251` (arity-3), `:253-272` (general) — three near-identical bodies; `leaf.ts:39-57` vs `:58-73` — the same for `any()`. Justifying comments at `:32-37` and `:166-177`.

The comments assert measured facts with no citation: "the dominant `or`-style 2-way alternation", "the hottest value.js shape (calc/rgb/hsl triples)", "**59 `all()` sites**", "so V8 sees a monomorphic call site with constant-folded parser bindings". No benchmark file, no `test/benchmarks/` entry, and no ledger row is referenced. `parser-band.md:74-78` states the governing honesty law — "**No speed claims outside the printed table**" — and this module is 110 lines of duplication resting entirely on unprinted ones.

Worse, the unrolls are **not equivalent**: L-M3 proves arity-2/3 and arity-≥4 return different elements kinds, so the "semantics-preserving" claim at `:32` and `:167` is false as written.

There is **no `test/leaf.test.ts`**. `ls typescript/test/` — the leaf combinators are exercised only transitively via `csv.test.ts` (1 site), `json.test.ts` (2), `math.test.ts` (6), `print.test.ts` (3), `memoize.test.ts` (3), `debug.test.ts` (2), `reentrancy.test.ts` (1). No test asserts arity-0/1/2/3/N equivalence — which is why L-B1, L-B2 and L-M3 all survived to the published artifact, and why L-B2 is *live inside `math.test.ts` itself*.

**Falsifier**: "the unrolls are proven by the bench suite." `test/benchmarks/` contains no `all`/`any` arity comparison; `package.json` `proof:*` scripts cover manifest/subpath/packrat/span/dead-combinator/perf — none targets leaf arity.

### L-M13 — PT-07 confirmed at leaf's four unguarded `state.src` sites — **and corrected**: the boundary posture is per-leaf and per-input, and `.parse()` on failure returns a **plausible partial value**, not `undefined`
**Severity**: MAJOR · **Provenance**: `leaf.ts:285` (`state.src.charCodeAt`), `:297` (`state.src.startsWith`), `:327/:350` (`state.src.length` / `.substring`), `:136` (`state.src.charCodeAt`). Zero guards; `ParserState`'s constructor (`state.ts:47-53`) types `src: string` and validates nothing.

Measured across 6 non-string inputs × 4 leaves:

| input | `string` (1ch) | `string` (2ch) | `regex` | `dispatch` |
|---|---|---|---|---|
| `123` | TypeError | TypeError | TypeError (`.substring`) | TypeError |
| `null` | TypeError | TypeError | TypeError | TypeError |
| `undefined` | TypeError | TypeError | TypeError | TypeError |
| `{}` | TypeError | TypeError | **NO THROW — `isError=true`** | TypeError |
| `["a"]` | TypeError | TypeError | **NO THROW — `isError=true`** | TypeError |
| `Symbol()` | TypeError | TypeError | TypeError (coercion) | TypeError |

**Correction to O-15 PT-07's "5/5 non-string inputs throw a raw `TypeError`"**: at the leaf level the posture is **not uniform**. `regex()` reaches `sticky.test(state.src)` (`:344`) which **implicitly coerces** the input to a string; objects and arrays therefore produce an *ordinary parse rejection* rather than a throw, and a non-string whose coercion happens to match would advance past the guard before dying at `:350`. So a non-string input can traverse a `regex` leaf without a diagnostic and only crash later, at a different site, with a different message. O-15's aggregate ("5/5 throw") is right at the *entry-point* granularity it measured and incomplete at the *leaf* granularity — recorded as a refinement, not a contradiction.

**Correction to O-15 PT-07's "`.parse()` returns `undefined` on failure"**: it returns whatever `state.value` happens to hold, which is frequently a **plausible partial result**:
```
D1 all(string("a"), whitespace)  on "a":  .parse() -> "a"   isError: true
D2 string("a").skip(string("b")) on "ax": .parse() -> "a"   isError: true
D3 string("a").then(string("b")) on "ax": .parse() -> "a"   isError: true
D4 string("a").many(2)           on "a":  .parse() -> []    isError: true
```
This is **strictly worse** than the recorded `undefined`-ambiguity: a caller using `.parse()` and checking for `undefined` will accept `"a"` from a failed parse. The X·P W1 JS-boundary invariant (`W1.md:76`, "asserted **above** parse-that, per O-15's own posture") must therefore be stated as "**never use `.parse()`; use `parseState()` and check `isError`**" — which is exactly what `parser-band.md:108` recorded both candidates already doing ("entry via `parseState` + `isError`, never `parse()` truthiness"). This row supplies the *reason*.

Leaf's own contribution to the other horn — success-with-`undefined` — is three sites: `eof()` (`:14`), `regex()` empty match (`:355`), `regex()` `matchFunction === ""` (`:342`):
```
P3 eof() success value: undefined | eof() failure value: undefined  -> indistinguishable
P5 regex(/x*/) on "abc": isError false offset 0 value undefined      -> success with undefined
```

---

## 3. MINOR

| id | severity | finding | provenance | falsifier |
|---|---|---|---|---|
| **L-m1** | MINOR | `Span` is imported and never used — dead import ships in the source tree | `leaf.ts:3`; `grep -n "Span" leaf.ts` → line 3 only; `tsconfig.json` sets no `noUnusedLocals`/`noUnusedParameters` | grep the file for a second `Span` occurrence |
| **L-m2** | MINOR | `eof<T>()`'s type parameter is vestigial — unused in the signature, uninferable, and the return is cast to `Parser<unknown>`. Published that way | `leaf.ts:11, 24`; `dist/leaf.d.ts`: `export declare function eof<T>(): Parser<unknown>` | find a call site where `T` is inferable or observable |
| **L-m3** | MINOR | `any()` at arity 1 **builds the general closure and discards it** — one dead closure allocation per construction | `leaf.ts:58-73` runs whenever `n !== 2`, incl. `n === 1`; `:76` then selects `parsers[0].parser` | check whether the `else` is guarded on `n > 2` — it is not |
| **L-m4** | MINOR | `makeParser` is a dead one-line indirection (`new Parser(...)` is the same length); its generic return is cast away at 4 of 6 call sites | `leaf.ts:7-9`; casts at `:24, :78, :150(ok), :163, :312(ok), :368(ok)` | find behaviour `makeParser` adds over `new Parser` |
| **L-m5** | MINOR | `regex()` with a `matchFunction` returning `""` succeeds **zero-width with an `undefined` value** even though the regex consumed input — undocumented | `leaf.ts:341-343`; `P4 matchFunction -> "": isError false offset 0 value undefined (regex consumed 3)` | show the behaviour documented anywhere |
| **L-m6** | MINOR | The `regex()` header comment claims a "zero-alloc default path"; `:350` calls `state.src.substring(...)`, which allocates on every successful match | `leaf.ts:315-316` vs `:350` | show `substring` returning without allocation |
| **L-m7** | MINOR | `.trim()`'s fast path dispatches on the **mutable public** `context.name === "whitespace"` string tag, set by post-construction mutation. A user's own `regex(/\s*/)` is *not* recognised; a forged tag on an unrelated parser *is*, and the parser is then ignored entirely | `leaf.ts:398` (`whitespace.context.name = "whitespace"`), `parser.ts:488` (the test), `state.ts:173-177` (`name` is an optional mutable field) | construct `const p = regex(/[abc]*/); p.context.name = "whitespace"; x.trim(p)` and observe `p` never runs |
| **L-m8** | MINOR | `dispatch()` cannot route any non-ASCII code point — all fall to the error label with no diagnostic distinguishing "unmapped" from "out of table range" | `leaf.ts:137` (`ch < 128 ? tbl[ch] : -1`); declared at `:82-84` but silently conflated at `:142` | pass a non-ASCII first char and look for a distinct diagnostic |
| **L-m9** | MINOR | `internParser` is O(entries × distinct) via `Array.prototype.indexOf`; construction-time only, but a `Map` is the same code length | `leaf.ts:104-111` (`parsers.indexOf(parser)` inside the `:113` loop) | show `indexOf` is sublinear |
| **L-m10** | MINOR | `dispatch`/`string`/`regex` build label strings at construction that are **dead unless diagnostics are armed** (PT-01 corollary), and retain them for the parser's lifetime. `dispatch`'s is the most expensive: spread + map + two joins per table | `leaf.ts:128-132`, `:278`, `:324`; consumed only at `utils.ts:33/38` under `diagnosticsEnabled` | call `enableDiagnostics()`… which is precisely the coupling L-M8 records; the label cannot be reached without the `console.error` |
| **L-m11** | MINOR | **No `test/leaf.test.ts`.** 8 public exports, the package's densest hot path, zero direct test file; arity 0/1/2/3/N behaviour untested (the direct cause of L-B1/L-B2/L-M3 shipping) | `ls typescript/test/` — 12 `.ts` specs, none targeting leaf | find a spec asserting `all()` arity behaviour |
| **L-m12** | MINOR | Leaf declares **no** frame/recursion budget. Each `all`/`any`/`dispatch` level costs a stack frame against O-15 PT-04's measured ceiling (deepest OK 7,761, `RangeError` at 7,762), so the *grammar*-nesting ceiling is 7761/k for an unpublished k. `W1.md:544` G-9 is titled "**DEPTH IS DECLARED, NOT DISCOVERED**"; leaf declares nothing | `leaf.ts` — no depth parameter, no guard; `dispatch`'s `return parsers[idx].parser(state)` at `:140` is not a tail call under V8 | publish k; the module supplies no way to compute it |
| **L-m13** | MINOR | Redundant `state.isError = true` dead stores in `fuseAll`'s error arms (the child already set it) — 4 sites; harmless, but the module elsewhere counts nanoseconds | `leaf.ts:196, 204, 227, 235, 243, 264` | show a child that errors without setting `isError` |

---

## 4. INFO

- **L-i1 — Goldilocks: the size is right, the seam is not.** 399 lines / 14.9 KB is well within band for this package (`parser.ts` 711, `packrat.ts` 488). The defect is **cohesion**: the file holds five *terminals* (`string`, `regex`, `eof`, `whitespace`, `trimStateWhitespace` — ~130 lines) and three *n-ary combinators* (`any`, `dispatch`, `all`/`fuseAll` — ~245 lines) that are categorically siblings of `Parser.or`/`Parser.then`, which live in `parser.ts`. The seam was drawn by **which side of the import cycle a symbol had to sit on**, not by category — the proof being `parser.ts:6`, which imports `all`, `eof` and `trimStateWhitespace` straight back. That cycle is the root cause of L-M10 and of the `_initWhitespace` deferral. Splitting `leaf.ts` into `terminals.ts` (no `Parser` import needed beyond the constructor) + folding `any`/`all`/`dispatch` next to `or`/`then` dissolves cycle, deferral, TDZ and the false `sideEffects: false` in one move.
- **L-i2 — Failure-triad duplication.** `mergeErrorState(state, label?); state.isError = true; return state;` appears **7×** in `leaf.ts` (`:16-18, :54-56, :69-71, :142-144, :291-293, :303-305, :360-362`) and ~10× more in `parser.ts`. A shared `fail(state, label)` would collapse it — **but** it adds a frame on the reject path, which L-m12 and `parser-band.md:117` both make expensive. Recorded as a *known, defensible* duplication: the tradeoff is real and the current choice is arguably right. Noted so a later cleanup does not "fix" it blind.

---

## 5. SUPERLATIVES (L-18 runs both ways)

1. **`string()`'s single-char fast path is the best code in the module** — `leaf.ts:282-294`. One `charCodeAt` compare, and on success it stores **the shared `str` reference** (`:287`), not a fresh substring. **Zero allocation on the hottest leaf in any grammar.** Most combinator libraries return `src.substr(offset, 1)` here and pay a string per token.
2. **`regex()` chooses `test()` over `exec()` on the default path** — `leaf.ts:344-347`. This genuinely avoids the `RegExpMatchArray` allocation (an object with `index`, `input`, `groups` and the capture array) on every match, and correctly falls back to `exec()` only when a `matchFunction` needs the full array (`:335-338`). The header's "zero-alloc" overclaims (L-m6), but **the decision is right** and is the single largest allocation win in the file.
3. **`trimStateWhitespace` is exemplary** — `leaf.ts:372-391`. Zero allocation, no regex-engine entry, a correct fast-exit (`:378`) that dodges the loop setup for the overwhelmingly common non-whitespace case, and an explicit code-point comment (`:382`) rather than a magic predicate. Its only sin is being one of three alphabets (L-M7) — the code itself is right.
4. **`any()` and `dispatch()` allocate nothing per invocation.** Verified by reading every path: `any` (`:42-72`) holds one integer; `dispatch` (`:134-145`) holds two. For a module whose job is alternation — the classic allocation sink in combinator libraries — this is a real, sustained discipline.
5. **`dispatch()`'s `Int8Array(128).fill(-1)` is the right data structure** — `leaf.ts:101`. 128 bytes, O(1), no `Map`, no hashing, and the `-1` fill correctly frees index 0 for a real parser. **The width is the bug (L-M1); the design is not.** An `Int16Array` keeps every virtue and removes the ceiling.
6. **The PT-Q5 RETRACT note is exemplary engineering honesty** — `leaf.ts:90-98`. A shipped perf seam (the 2nd-byte `subTable` widening) was **removed** for having zero production consumers and a synthetic-only gate, with the re-introduction condition named precisely ("*If value.js's coordinated Q session measures an on-path win… with the perf gate re-anchored to value.js's real `c`-bucket grammar — not before*"). This is exactly the posture `parser-band.md:74-78`'s honesty law demands, authored *in this module*, by this module's author. It stands in sharp contrast to L-M12's uncited unroll comments in the same file — and it is the standard those comments should be held to.
7. **The zero-width leaves are safe by construction.** `string("")` (`:296-306`, always-succeed non-advancing — `P1/P2` confirm it succeeds at EOF where `regex(/\s*/)` does not) and `regex()`'s empty-match arm (`:354-357`) both leave `offset` untouched, and every looping combinator upstream guards on `state.offset === savedOffset` (`parser.ts:538`, `:582`, `:605`). `parser-band.md:111` records cand-O building `succeed` from `string("")` — the leaf supports that idiom correctly and deliberately.

---

## 6. O-15 RECONCILIATION (row-by-row, at the bytes)

| O-15 row | O-15 claim | verified here | disposition |
|---|---|---|---|
| **PT-01** | `label` is a no-op unless diagnostics armed; arming couples an unconditional `console.error` at `dist/diagnostics-DDazRHgl.js:14` + `dist/packrat-entry-*.js:881` | `diagnostics-DDazRHgl.js:14` verbatim ✅. `packrat-entry-CS1td-8B.js:881` is the **guard**, `:882` the `console.error` | **CONFIRMED**, one-line cite drift recorded. **EXTENDED** by L-M8: `:15-16` reallocate two arrays *outside* the guard — 40 arrays / 88-char input measured. New row, not in O-15. |
| **PT-03** | `PACKRAT_ARMED` one-way latch: `:678` false, `:722` true, read at `:682`/`:714`, no assignment back to false anywhere | `grep -rn "PACKRAT_ARMED *=" dist/*.js` → **exactly two**: `:678 = false` (initializer), `:722 = true`. Reads at `:682` (`packratEnter`) and `:714` (`resetPackrat`). `.cjs` mirror at `:679` | **CONFIRMED EXACTLY.** Leaf-specific corollary: `leaf.ts` contains **zero** packrat references (`grep -c` → 0), so leaf never arms the latch — yet every leaf parse is wrapped by `packratEnter/Exit` (`parser.ts:43-48`) and inherits the 1.47× once *any* module in the process constructs a `memoize()`. Leaf's cost is set by a global it neither writes nor can read. |
| **PT-04** | `Parser.lazy` arity 1, deepest OK 7,761, `RangeError` at 7,762 | not re-measured (leaf has no `lazy`; re-measuring would prove nothing new and costs a 7.7k-frame stack) | **FOLDED as-is.** Leaf's contribution recorded as L-m12: it is a frame multiplier with no declared budget, against `W1.md:544` G-9. |
| **PT-07** | 5/5 non-string inputs throw a raw `TypeError`; `.parse()` returns `undefined` on failure | 4 leaf sites unguarded ✅ — but `regex()` **does not throw** for `{}`/`[]` (implicit coercion via `sticky.test`), and `.parse()` on failure returns **`"a"`, not `undefined`**, in three of four probed shapes | **CONFIRMED at entry-point granularity; REFINED at leaf granularity** (L-M13). The `.parse()` correction *strengthens* O-15's cure: the JS-boundary invariant must forbid `.parse()` outright, not merely disambiguate `undefined`. |

**Explicit contradictions of the corpus**: two, both in L-M13, both narrowing rather than reversing an O-15 row. No X·P wave spec or `parser-band.md` claim is contradicted; `parser-band.md:108`/`:117`/`:134` are *corroborated* with the leaf-side cause (L-B2, L-M4).

---

## 7. WHAT THE WAVE SHOULD DO WITH THIS

Ordered by (cost to fix) ÷ (blast radius), all cures KISS and local:

1. **L-B3 + L-M6** — delete `leaf.ts:327-330`. One deletion fixes the nullable-regex EOF rejection *and* the missing furthest-merge. Highest ratio in the file.
2. **L-M5** — hoist `const end = sticky.lastIndex` above the `matchFunction` call. One line; removes an out-of-bounds-offset class.
3. **L-M3** — `new Array(n)` → `new Array(n).fill(undefined)` at `leaf.ts:257`. One call; verified to restore PACKED (N3).
4. **L-M8** — guard `utils.ts:34-35` with `diagnosticsEnabled`. One condition; removes 2 arrays per furthest-advance from the default path.
5. **L-M4** — hoist the `out` allocation below the first child's error check in all three `fuseAll` arms. Directly discharges `parser-band.md:117` debt #2.
6. **L-M1** — `Int8Array` → `Int16Array` at `leaf.ts:101`. One identifier; removes a silent-wrong-answer class.
7. **L-B1 + L-M9 + L-m3** — delete the arity-1 short-circuits at `leaf.ts:76` and `:161`. Fixes a type lie, an offset-restore asymmetry, and a dead closure together.
8. **L-B2** — the breaking one. Either write children unconditionally (recommended; `.opt()` under `all()` becomes legal and G8's gate can be retired) or make the type honest. **This is the decision X.P.W2's algebra choice actually turns on**, and it should be taken explicitly rather than inherited.
9. **L-M10 + L-i1** — break the `parser ↔ leaf` cycle. Everything downstream (TDZ, `_initWhitespace`, the barrel line-order dependency, the false `sideEffects: false`) falls out with it.
10. **L-m11** — write `test/leaf.test.ts`. Arity 0/1/2/3/N, EOF-nullability, dispatch key forms, boundary types. Every blocker above would have been caught by the first ten cases.
