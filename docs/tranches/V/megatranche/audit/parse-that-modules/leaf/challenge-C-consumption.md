served model id: `claude-opus-5[1m]`

# CHALLENGE — `parse-that` module **leaf**, axis **C (CONSUMPTION)**

**Target**: `/Users/mkbabb/Programming/parse-that/typescript/src/parse/leaf.ts` (399 lines, 9 exports).
**Posture**: the module is assumed DEFECTIVE until the tree proves otherwise. Every row below carries
severity + `file:line` provenance + a written falsifier. Superlatives carry the same burden (L-18
runs both ways).

---

## 0. Substrate receipts (OP-7 clause — a number compared across substrates is void)

| what | receipt |
|---|---|
| source under audit | `/Users/mkbabb/Programming/parse-that/typescript/src/parse/leaf.ts` @ master `ef10d5b`; `git status --short` shows **zero** modifications under `typescript/` (only `rust/**`, `README.md`, `.cargo/config.toml` are dirty) |
| runtime probed | `/Users/mkbabb/Programming/parse-that/typescript/dist/{core.js,core.cjs,parse.js,leaf.d.ts}` — the working-tree build; `dist/leaf.d.ts` carries the PT-Q5 retract prose and `_initWhitespace`, i.e. it is the build **of this source** |
| RED-7 corpus substrate | `parsethat-surface-gaps.mjs` resolves `@mkbabb/parse-that` from `docs/tranches/V/megatranche/prototypes/css-parser/node_modules/@mkbabb/parse-that` (`import.meta.resolve` from the script dir), version **1.0.0**. `shasum` on `dist/{core.js,index.d.ts,leaf.d.ts,parse.js}` → **4/4 SAME** as the evidence root. **The RED-7 numbers and this challenge are on one substrate.** |
| forbidden path | `/Users/mkbabb/Programming/parse-that-css-totality-p2` — **absent** (`ls` → `No such file or directory`). No STOP finding. |
| law compliance | Read-only on `parse-that` (main checkout only; no `.worktrees/`, no frozen root, no `~/Documents/Codex`). No browser tooling. **Nothing armed** — every probe used `string`/`regex`/`any`/`all`/`dispatch`/`Parser` only; `memoize`/`resetPackrat`/`enableDiagnostics` were never called. Sole write = this file. |
| probe mechanism | `node --input-type=module` over stdin heredocs; no probe file was written anywhere. |

---

## 1. The consume edge, measured — not asserted

**PLAW-BIND routing law**: parser → value → packed release. `leaf.ts`'s **sole** lawful downstream
is value.js. Two facts must be held simultaneously:

**(a) Today the edge is SEVERED.** value.js `src/css/**` — the frozen 52-export surface (33 types
`src/css/index.ts:1-35`, 19 runtime `:36-60`) — is a hand-rolled grammar. `src/css/grammar.ts:1-33`
imports only `../foundation/result`, `../color/model`, `../value`, `./types`, `./named-colors`.
`grep -rn "parse-that" src/` returns **two prose mentions and zero imports**
(`src/subpaths/transform.ts:4`, `src/subpaths/math.ts:2`). `@mkbabb/parse-that` is **not in
`package.json`** and **not in `node_modules/@mkbabb/`** (only `glass-ui`, `keyframes.js`,
`value.js`). It was removed at `164343c1` (`feat(v4)!: … retire pre-v4 src trees`); the last commit
that carried it is `164343c1^`, `package.json:115` → `"@mkbabb/parse-that": "^1.0.0"`.

**(b) The last real consumption is fully recoverable and is the only honest census.** At
`164343c1^`, `src/parsing/**` imported leaf's combinators at 7 files
(`color/color.ts:22`, `index.ts:1`, `math.ts:16`, `stylesheet/stylesheet.ts:8`,
`timeline/easing.ts:1`, `timeline/scroll-timeline.ts:1-2`, `units.ts:1`, `utils.ts:1-2`).

### 1a. Per-export consumption census (`git grep` over `164343c1^:src/parsing`)

| leaf export | line | direct value.js sites | verdict |
|---|---|---|---|
| `any` | `leaf.ts:28` | **93** | hottest edge |
| `whitespace` | `leaf.ts:395` | **89** refs (39 `.trim(whitespace)` · 10 `.skip(whitespace)` · 8 `whitespace.next(…)` · rest in `any(…)`) | hottest *value*-carrying edge |
| `all` | `leaf.ts:154` | **62** | hot |
| `string` | `leaf.ts:276` | **46** | hot |
| `regex` | `leaf.ts:317` | **19** (of which **1** passes `matchFunction`: `color/color.ts:129`) | hot; 2nd param ~unused |
| `dispatch` | `leaf.ts:100` | **6** (2 real tables: `index.ts:466`, `color/color.ts:673`) | load-bearing, 2 sites |
| `eof` | `leaf.ts:11` | **0 direct** (reached only via `Parser.prototype.eof()`, `parser.ts:638-642`; 2 call sites) | never imported |
| `trimStateWhitespace` | `leaf.ts:372` | **0** anywhere in the constellation | **dead public surface** |
| `_initWhitespace` | `leaf.ts:396` | **0** (correctly withheld from both barrels) | sealed internal |

**Reading**: 6 of 9 exports carry the whole downstream; 2 of 9 (`eof`, `trimStateWhitespace`) have
never been imported by the sole consumer; `trimStateWhitespace` is not even a `Parser` — it is a raw
`ParserState` mutator on the published surface of **both** `.` and `./core`.

---

## 2. BLOCKERS (7)

### C-B1 — `all()` at arity 1 returns the bare value, not the 1-tuple its own type declares

- **Where**: `leaf.ts:161` (`parsers.length === 1 ? parsers[0].parser : fuseAll<Result>(parsers)`) and
  the unchecked `as Parser<Result>` at `leaf.ts:163`. Shipped signature: `dist/leaf.d.ts:25`.
- **Measured**: `all(string("a")).parse("a")` → `"a"` (a `string`). The declared type is
  `Parser<[string]>`.
- **Why it is a consumption blocker**: the type is the contract. A consumer that builds
  `all(...arms)` from an array — the natural shape for a table-driven grammar, exactly what the X·P
  AC-2/AC-4 candidates need — silently changes result *shape* at `arms.length === 1`. There is no
  runtime signal and no type error; the defect surfaces as a destructuring failure three frames away.
- **Falsifier**: if `all(p).parse(x)` returned `[v]`, or if the declared type were `Parser<V | [V]>`,
  this row dies. It returns `"a"` and declares `[string]`. Re-run:
  `node -e 'const{all,string}=await import("./dist/core.js");console.log(all(string("a")).parse("a"))' --input-type=module`.

### C-B2 — `all()` drops `undefined` **and compacts**, so the positional tuple type is a lie

- **Where**: the drop tests `leaf.ts:199, 207` (arity-2), `:230, 238, 246` (arity-3), `:267`
  (general); the truncation `leaf.ts:209, 248, 270` (`out.length = w`).
- **Measured**: `all(string("a"), string("b").opt(), string("c"))` — declared
  `Parser<[string, string|undefined, string]>` — yields `["a","b","c"]` on `"abc"` and **`["a","c"]`**
  on `"ac"`. Index 1 holds `"c"`; `.length` is 2. `all(string("a"), eof())` → `["a"]` (length 1,
  declared length 2), because `eof()` succeeds with `undefined` (`leaf.ts:13`).
- **Why it is a consumption blocker**: positional destructuring — `const [h, sep, t] = …` — is the
  only ergonomic way to use `all()`, and it is unsound for every arm that can produce `undefined`
  (`.opt()`, `eof()`, `whitespace`, any empty-matching `regex`). value.js paid for this in prose at
  **three** sites rather than in types: `164343c1^:src/parsing/index.ts:210-216` ("parse-that `all()`
  silently … (NOT a parse-that all() semantics change)"), `stylesheet/stylesheet.ts:278`
  ("parse-that's `all()` filters out values from `.opt()`"), and the `math.ts:146` note. A consumer
  writing three defensive comments about one combinator's arity-dependent runtime shape is the
  measurement.
- **Falsifier**: if the middle-`undefined` case produced `["a", undefined, "c"]`, or if the declared
  type were `Parser<Array<…>>` rather than the mapped tuple `dist/leaf.d.ts:25`, this row dies.
  Neither holds.

### C-B3 — `regex(r, matchFunction)`: the **documented** `null` arm regresses the cursor to absolute 0

- **Where**: signature `leaf.ts:317-320` — `matchFunction?: (match: RegExpMatchArray | null) => string | null`
  (the parameter type explicitly admits `null`, i.e. invites handling it). Body `leaf.ts:337-340`:
  `const execResult = sticky.exec(state.src); const match = matchFunction!(execResult); if (match)
  return state.ok(match, sticky.lastIndex - savedOffset);`
- **Mechanism**: a *failed* sticky `exec` resets `lastIndex` to `0` (ECMA-262). If `matchFunction`
  returns a non-null string on a null match — the documented "supply a fallback" reading — the offset
  delta is `0 - savedOffset`, i.e. negative, and `ParserState.ok` (`state.ts:55-61`) does
  `this.offset += offset`. The cursor lands at **absolute 0**, not at a relative backstep.
- **Measured**: `all(string("aaa"), regex(/x/, m => m ? m[0] : "FALLBACK")).parseState("aaay")` →
  `isError=false`, `value=["aaa","FALLBACK"]`, **`offset=0`**. A *successful* parse that consumed
  three characters reports a cursor of zero.
- **Why it is a consumption blocker**: this is a published, typed, optional parameter of the second
  most-used leaf. Any consumer using the fallback idiom gets silent re-consumption downstream (the
  `many()` guard at `parser.ts:538` (`if (state.offset === savedOffset) break;`) protects only the
  zero-progress case, not the *negative*
  case inside `all`/`then`/`sepBy`).
- **Reachability bound, stated honestly**: value.js's single `matchFunction` site
  (`164343c1^:src/parsing/color/color.ts:129`, `(m) => m?.[1] ?? null`) returns `null` on a null
  match and therefore **dodges** this. Zero current consumer exercise. It remains a blocker of the
  *published contract* — and of the X·P W2 slice, whose `parseCssColor` head-dispatch needs exactly
  this map-with-fallback shape.
- **Falsifier**: if `leaf.ts:340` computed the delta from a saved `end` captured before user code, or
  if the signature forbade returning a string on a `null` match, this row dies. Neither holds.

### C-B4 — `regex(r, matchFunction)` reads the shared sticky `lastIndex` **after** user code — value/offset desynchronize under re-entrancy

- **Where**: `leaf.ts:322` constructs **one** `sticky` RegExp per `regex()` call, captured in the
  closure. `leaf.ts:338` calls `matchFunction!(execResult)` (arbitrary consumer code), then
  `leaf.ts:340` reads `sticky.lastIndex`.
- **Measured**: a `matchFunction` that re-enters `parseState` once on the *same* parser with a
  1-character source: outer `parseState("abcd")` → `isError=false`, `value="abcd"`, **`offset=1`**.
  The value says four characters were consumed; the cursor says one.
- **Contradicts an in-tree claim**: `parser.ts:33-42` states the `parseState` entry boundary makes
  "**re-entrancy SOUND**". That claim is scoped to packrat tables; the closure-captured `sticky`
  regex is a second, unstated re-entrancy hazard at the same boundary, and it corrupts *position*,
  not just memoization.
- **Why it is a consumption blocker**: `.map()`-callback re-parsing is an explicitly anticipated
  consumer pattern (named in `parser.ts:35`). The default `test()` path (`leaf.ts:344-353`) is safe —
  no user code runs between the `lastIndex` write and read — so this is *specifically* the
  `matchFunction` arm.
- **Falsifier**: if `leaf.ts` captured `sticky.lastIndex` into a local *before* invoking
  `matchFunction`, or if a fresh RegExp were constructed per call, this row dies. Neither holds.

### C-B5 — `regex()` fails unconditionally at end-of-input, **and does so invisibly** — so `whitespace` rejects the empty match at EOF

- **Where**: `leaf.ts:327-330`:
  `if (state.offset >= state.src.length) { state.isError = true; return state; }` — an early return
  that **skips `mergeErrorState` entirely**.
- **Measured**: `whitespace` is `regex(/\s*/)` (`leaf.ts:397`). `whitespace.parseState("")` →
  `isError=true`, **`furthest=-1`**. `string("a").skip(whitespace).parseState("a")` → `isError=true`.
  `all(string("a"), whitespace).parseState("a")` → `isError=true`, `furthest=-1`.
- **Two defects in one line**:
  1. **Semantic** — a regex that matches the empty string (`/\s*/`, `/[a-z]*/`, `/(?:)/`) is rejected
     at EOF. `whitespace` — the export with **89** value.js references — is not total.
  2. **Diagnostic** — because the early return skips `mergeErrorState`, `furthest` is never advanced.
     Truncated input is the single most common malformed class, and it is exactly the class for which
     the furthest-offset tracker reports the *wrong* position (or `-1`, meaning "nothing was tried").
     `parseStateInner` (`parser.ts:59-60`) then falls back to `state.offset`, so the rendered error
     points at the backtracked offset, not the failure site.
- **Live consume shapes**: `.skip(whitespace)` (**10** value.js sites) and `whitespace.next(…)`
  (**8** sites) route through the `whitespace` *Parser*; `.trim(whitespace)` (**39** sites) routes
  through `FLAG_TRIM_WS`/`trimStateWhitespace` (`parser.ts:443-465`) and is unaffected. Probed:
  `a.skip(whitespace)` on `"a"` → **isError=true**; `whitespace.next(a)` → ok; `a.trim(whitespace)` →
  ok. So 10 of value.js's own sites sit on a rejecting edge whose only shield is that a `)` always
  follows in the enclosing production.
- **Why blocker, not major**: W2 §3b COMP-1 requires `weave(V, C, P) === S` for **every** input in
  the closed universe, accepted or malformed. A whitespace scanner that cannot match zero bytes at
  the end of the string cannot satisfy a conservation law over a universe that includes `""` and
  every trailing-whitespace-free input.
- **Falsifier**: if `whitespace.parseState("")` returned `isError=false`, or if the EOF branch called
  `mergeErrorState(state, label)` before failing, this row dies. Measured: it does neither.

### C-B6 — `dispatch()`: any 3-character key whose middle char is `-` is silently a **range**, with no escape

- **Where**: `leaf.ts:116-119`:
  `if (chars.length === 3 && chars[1] === '-') { … for (let c = lo; c <= hi; c++) tbl[c] = idx; }`.
  There is no quoting, no escape, and no diagnostic.
- **Measured**: `dispatch({ "+-.": marker })` — the exact key a CSS author writes for the
  number-start set `{+, -, .}` — routes `'+'`, `','`, `'-'`, `'.'` all to `marker`. `','` (charCode
  44, inside the accidental range 43…46) is **admitted**. In a CSS grammar this silently makes the
  comma a number head.
- **Why it is a consumption blocker for the X·P slice**: `parseCssColor` head dispatch and
  `parseCssScalar` both need a number-start bucket; `"+-."` is the obvious spelling; the failure is
  silent, admits a separator as a value head, and is unfixable without knowing the undocumented
  rule (the JSDoc `leaf.ts:86-88` documents range syntax but never warns that it *shadows* the
  multi-char form).
- **Falsifier**: if `dispatch({"+-.": p}).parseState(",")` errored, this row dies. It returns the
  parser's value.

### C-B7 — `dispatch()`: integer-like keys are hoisted by `Object.entries`, so the documented `"0-9"` range can **never** be overridden by a digit key

- **Where**: `leaf.ts:113` iterates `Object.entries(table)`. Plain-object key order is
  **integer-like keys ascending, then string keys in insertion order** (ECMA-262 OrdinaryOwnPropertyKeys).
  `"0"` is integer-like; `"0-9"` is not.
- **Measured**: `Object.keys({ "0-9": 1, "0": 1 })` → `["0","0-9"]`. Therefore
  `dispatch({ "0-9": RANGE, "0": SPECIAL }).parseState("0")` → **`RANGE`**, at *any* insertion order.
  The non-digit control `dispatch({ "a-c": RANGE, "a": SPECIAL })` → `SPECIAL`, as intended.
- **Why it is a consumption blocker**: value.js's routing is *built* on the override idiom, and had
  to discover it empirically —
  `164343c1^:src/parsing/index.ts:463-465`: *"Insertion order matters: the broad `a-z`/`A-Z`/`-`
  generic ranges are registered FIRST, then the specific letters override (a later single-char table
  key overwrites the range slot — **verified against parse-that's dispatch**)."* That contract is
  nowhere in `dispatch`'s JSDoc; it holds for letters and silently **inverts** for digits — the one
  key class the JSDoc actually names as its example (`leaf.ts:87`: `ranges ("0-9")`).
- **Both value.js tables dodge it by luck**: `index.ts:466` keys are letters and `"-"`;
  `color/color.ts:645-649` keys are `"#"`, `"0-9"`, `"+"`, `"-"`, `"."` with no single-digit
  override. Luck is not a contract.
- **Falsifier**: if `dispatch({"0-9": R, "0": S}).parseState("0")` returned `S` in either insertion
  order, this row dies. It returns `R` in both.

---

## 3. MAJOR (9)

### C-M1 — `./core` ships leaf's label construction but exports no way to make a label observable

- **Where**: `core.ts:19-26` re-exports `eof, any, dispatch, all, string, regex,
  trimStateWhitespace, whitespace` — and **not** `enableDiagnostics`, **not** `mergeErrorState`.
  Leaf builds a label at construction time in `string` (`leaf.ts:278`), `regex` (`:324`), and
  `dispatch` (`:128-132`), and passes it to `mergeErrorState` at `:16, 142, 291, 303, 360`.
  `utils.ts:32` gates recording on the module-global: `state.expected = diagnosticsEnabled && label ? [label] : undefined`.
- **Measured**: `"enableDiagnostics" in core` → `false`; `"mergeErrorState" in core` → `false`;
  `string("abc").parseState("xyz").expected` → `undefined`. `ParserState` **is** exported from
  `./core` (`core.ts:8-13`), so a `./core` consumer can *read* `.expected` and can never make it
  non-`undefined` through any specifier `./core` provides.
- **Consequence**: cand-F's `reject(label)` idiom — the single clearest thing cand-F does better
  (`registry/adjudicated/parser-band.md` § "WHAT CAND-O OWES CAND-F" debt 1) — is **inexpressible on
  `./core` alone**, because it needs `mergeErrorState`. A consumer that wants the zero-side-effect
  primitive tier *and* labelled zero-width failures must import from `.` (dragging json/csv/packrat)
  or from `./diagnostics`, defeating the split's stated purpose (`core.ts:3-5`).
- **Folds**: RED-7 row 1 (`DEBT-1 cand-F reject() label, diagnostics OFF (shipping default) →
  undefined`) and O-15 **PT-01**. This challenge adds the *why*: it is not only that arming is
  required, it is that the `./core` tier cannot arm at all.
- **Falsifier**: if `./core` exported `enableDiagnostics`, or if `mergeErrorState` recorded labels
  unconditionally, this row dies. Neither holds.

### C-M2 — `any()`'s terminal `mergeErrorState(state)` is a structural no-op — the hottest alternation is diagnostically silent **by construction**

- **Where**: `leaf.ts:54` (arity-2 arm) and `leaf.ts:69` (general arm) call `mergeErrorState(state)`
  with **no label**, *after* `state.offset` has been restored to `savedOffset`.
- **Mechanism**: `utils.ts:29-45` updates only when `state.offset > state.furthest` (impossible —
  arms have already pushed `furthest` to ≥ `savedOffset`) or `state.offset === state.furthest`
  (possible, but then `label` is `undefined` so the body is empty).
- **Measured, without arming anything**:
  `any(all(string("ab"), string("c")), string("zz")).parseState("abX")` → `furthest=2`,
  final `offset=0`; `offset < furthest` → **true**, so neither branch of `mergeErrorState` can fire.
  The degenerate case `any(string("abc"), string("abd")).parseState("abX")` → `furthest=0`,
  `offset=0`: the equality branch fires but with `label === undefined` — still a no-op.
- **Consequence for consumption**: `any` — **93** value.js sites, the module's busiest export —
  contributes **zero** expectations even with diagnostics armed, and there is no place to attach one.
  The RED-7 row *"`Parser.prototype.label` / `.expected` combinator — absent"* is usually read as a
  missing convenience; the sharper reading is that leaf's alternation has no *slot* for a label,
  because its only merge call is provably dead.
- **Falsifier**: if `offset < furthest` were false in the advancing-arm case, or if `leaf.ts:54/69`
  passed a label, this row dies. Probed: `offset=0`, `furthest=2`; the source passes no label.

### C-M3 — `any()` at arity 1 skips the backtracking every other arity performs

- **Where**: `leaf.ts:76` — `n === 1 ? parsers[0].parser : anyParser`. The general arm restores
  `state.offset = savedOffset` on every failed trial (`leaf.ts:66`); the arity-1 shortcut runs the
  inner `parser` raw.
- **Measured**: with an arm that advances 3 then fails — `any(p).parseState("abcdef")` leaves
  **`offset=3`**; `any(p, q).parseState("abcdef")` leaves **`offset=0`**.
- **Consequence**: identical to C-B1's shape — a dynamically-built alternation changes semantics at
  `length === 1`. Combined with the fact that the returned `Parser` still carries
  `createParserContext("any", …)` (`leaf.ts:77`), the debug/`toString` view claims `any` while the
  behaviour is the bare arm.
- **Falsifier**: if both offsets were 0, this row dies. They are 3 and 0.

### C-M4 — `dispatch()`'s table is homogeneous while `any()`'s is a union: the advertised `any` → `dispatch` upgrade forces a cast at the parse boundary

- **Where**: `dispatch<T>(table: Record<string, Parser<T>>): Parser<T>` (`dist/leaf.d.ts:24`) vs
  `any<T extends Array<Parser<any>>>(…): Parser<T[number] extends Parser<infer V> ? V : never>`
  (`dist/leaf.d.ts:4`). The JSDoc (`leaf.ts:82-84`) sells `dispatch` as the drop-in replacement for
  `any`'s "sequential trial-and-error", but `Record<string, Parser<T>>` cannot express a
  heterogeneous table, and `T` is inferred as the *intersection-ish* common type, not a union.
- **Two consumer receipts, both paid in casts**:
  - `164343c1^:src/parsing/color/color.ts:673` —
    `const Value = dispatch(dispatchTable).trim(whitespace) as Parser<ParsedColorUnit>;` with a
    10-line comment (`:663-672`) justifying the widening ("`dispatch(...)` returns
    `Parser<ValueUnit>` (the heterogeneous bucket width above)").
  - `164343c1^:src/parsing/index.ts:466` — `const Function_: Parser<any> = dispatch({…})`, with every
    bucket declared `Parser<any>` (`:456-464`) to make the table type-check.
- **Consequence**: the module's own recommended migration path costs the sole consumer its type
  safety at exactly the boundary W2 §3b makes normative (**V** must be assignable to the frozen
  `/css` types under an excess-property check, G-10). An `as` cast at the parse boundary is precisely
  the seam G-10 exists to detect.
- **Falsifier**: if `dispatch` were typed `dispatch<T extends Record<string, Parser<unknown>>>(t: T):
  Parser<T[keyof T] extends Parser<infer V> ? V : never>`, both receipts would be cast-free. It is not.

### C-M5 — `dispatch()` silently drops non-ASCII keys while its own label advertises them

- **Where**: `leaf.ts:101` allocates `new Int8Array(128)`; `leaf.ts:122` writes
  `tbl[chars.charCodeAt(i)] = idx` with **no** range check. A TypedArray out-of-bounds write is a
  silent no-op. Meanwhile `leaf.ts:128-132` builds the label from `Object.keys(table)`
  unconditionally, and `leaf.ts:137` reads `ch < 128 ? tbl[ch] : -1`.
- **Measured**: `dispatch({ "é": string("é") }).parseState("é")` → **ERROR**, with the failure label
  still promising `one of ['é']`.
- **Consequence**: CSS identifiers admit non-ASCII from U+0080 (css-syntax-3 §4.2). A consumer
  building an ident-start dispatch loses every non-ASCII head **with no construction-time signal**
  and a label that actively lies about it.
- **Falsifier**: if the construction threw, warned, or if the label omitted unrepresentable keys,
  this row dies. It does none of the three.

### C-M6 — `trimStateWhitespace` is dead public surface, and the project's own dead-export gate cannot catch it

- **Where**: `leaf.ts:372-391`; exported from `index.ts:9` and `core.ts:23`;
  `dist/leaf.d.ts:28`.
- **Facts**: **0** consumers in value.js (`164343c1^` or HEAD), **0** in keyframes.js, and inside
  parse-that it is used only by `parser.ts:443, 452, 456, 465, 499, 509` — all *internal*. It is not
  a `Parser`; it is a `ParserState` mutator, so it cannot be composed with any other export on the
  surface it ships alongside.
- **Contradicts the project's own precept**: `scripts/proof-no-dead-combinator.mjs:9-11` — *"A
  never-importable export is not part of the public contract; an export born one prior tranche with
  zero workspace consumers is dead by the precept."* That gate's `banned` list
  (`scripts/proof-no-dead-combinator.mjs:29-32`) is hardcoded to exactly `thenMap` and `fuse`, so it
  is structurally incapable of finding the next instance. The gate proves two named deletions; it
  does not enforce the precept.
- **Falsifier**: a single import of `trimStateWhitespace` from any consumer tree kills this row.
  `git grep` over `164343c1^:src/`, HEAD `src/`, and `test/` finds none.

### C-M7 — `.parse()` returns a **partial** value on failure — this extends and partly contradicts O-15 PT-07

- **Where**: `parser.ts:77-79` — `parse(val) { return this.parseState(val).value; }`.
  `parseStateInner` builds a clean `errorState` with `value: undefined` (`parser.ts:61`) but assigns
  it only to `this.state` (`:66`) and then **`return state`** (`:74`) — the mutated state. Leaf's
  `fuseAll` error arms (`leaf.ts:196-206, 226-245, 262-266`) restore `offset` but never reset
  `state.value`.
- **Measured**: `all(string("a"), string("b"), string("c")).parse("abX")` → **`"b"`** (the last
  successful sub-parser's value) while `parseState("abX").isError === true`. Success on `"abc"`
  yields `["a","b","c"]`. The leaf case behaves as O-15 recorded: `string("a").parse("b")` →
  `undefined`.
- **Why this matters for the corpus**: O-15 **PT-07** and RED-7 row *"`.parse()` failure signal —
  returns `undefined`, indistinguishable from `.opt()"`* both understate it. The failure return is
  not merely ambiguous with a successful `undefined`; it can be a **plausible, differently-shaped
  value** (`"b"` where success yields a 3-array). A JS-boundary invariant that checks only for
  `undefined` — the cure O-15 proposes — will pass this input.
- **Also**: `parseState()` hands back `state` (offset backtracked, value partial) while
  `console.error(this.state.toString())` (`parser.ts:68`) renders `errorState` (offset `furthest`,
  value `undefined`). Two different error views; the printed one is not the returned one. Measured:
  `parseState("abX")` → `offset=0, value="b"`; `p.state` → `offset=2, value=undefined`.
- **Falsifier**: if `all(a,b,c).parse("abX")` returned `undefined`, this row dies. It returns `"b"`.

### C-M8 — 19 lines of internal tranche archaeology ship in the published `.d.ts`

- **Where**: `leaf.ts:90-98` (the PT-Q5 RETRACT note) is emitted verbatim into
  `dist/leaf.d.ts:5-23`, immediately above `export declare function dispatch<T>(…)`.
- **Consequence**: every consumer's editor hover for `dispatch` — the single combinator the
  README-level story is built on — leads with "PT-Q5 RETRACT note", "0.12.0", "terminal-or-KILL
  disposition", "value.js's coordinated Q session". The actual usage documentation (`leaf.ts:82-88`,
  four lines) is buried above it. A retraction rationale is a CHANGELOG entry, not API documentation.
- **Falsifier**: if `dist/leaf.d.ts` carried only the four-line `@param` block, this row dies. It
  carries all 19 lines.

### C-M9 — `whitespace`'s published type is *inferred from another export*, and is non-optional over an initialization window

- **Where**: `leaf.ts:395` — `export let whitespace: ReturnType<typeof regex>;` →
  `dist/leaf.d.ts:29`. Initialized only by `_initWhitespace()` (`leaf.ts:396-399`), invoked once from
  `parser.ts:711`, at the bottom of a module that `leaf.ts:1` already imports (a deliberate cycle,
  documented at `leaf.ts:393-394`).
- **Two semver/type problems**:
  1. `ReturnType<typeof regex>` makes `regex`'s **inferred** return type part of `whitespace`'s
     public type. Any change to `regex`'s inference silently changes a second export's `.d.ts` — the
     package cannot reason about its own surface stability. `package.json` declares version `1.0.0`,
     so this is now a compatibility surface, not a pre-1.0 draft.
  2. The declared type is non-optional (`Parser<string>`) while the binding is genuinely `undefined`
     between leaf's evaluation and `parser.ts:711`. The manifest declares `"sideEffects": false`
     (`package.json:6`), which grants bundlers permission to elide module bodies whose exports appear
     unused — and the initializer is a bare top-level call, the exact construct that permission
     targets.
- **Honest bound**: I could not make the window observable through any published specifier — the
  shipped bundles are single-file, and `dist/core.cjs` initialized correctly under `require` (see
  S-4). The claim is therefore about the *declared contract*, not a reproduced runtime failure.
- **Falsifier**: an explicit `Parser<string>` annotation and an eager (non-`let`) construction would
  kill both halves. Neither is present.

---

## 4. MINOR (7)

| id | claim | provenance | falsifier |
|---|---|---|---|
| C-m1 | `eof<T>()`'s `<T>` is phantom: declared, never used, return cast to `Parser<unknown>`. `eof<string>()` is `Parser<unknown>`. | `leaf.ts:11` (`export function eof<T>()`), `:24` (`as Parser<unknown>`), `dist/leaf.d.ts:3` | a `T`-dependent return type kills it; the `.d.ts` says `Parser<unknown>` for all `T` |
| C-m2 | `regex()` and `whitespace` are typed `Parser<string>` but yield `undefined` on an empty match. | `leaf.ts:355` (`state.unsafeSetValue(undefined)`), `dist/leaf.d.ts:27, 29` | measured: `whitespace.parseState("x").value` → `undefined`, declared `string` |
| C-m3 | `dispatch`'s `Int8Array` index overflows: ≥128 distinct parsers fail **closed**; ≥256 dispatch to the **wrong** parser. | `leaf.ts:101` (`Int8Array(128)`), `:105-111` (`internParser` returns an unbounded index), `:122` | measured: 130 distinct parsers → `ERROR`; **257 distinct parsers → returns `P0` instead of `P256`**. Reachability bound: needs ≥128 distinct parser objects in one table — high, but the ≥256 case fails *open*, silently. |
| C-m4 | `internParser` is `Array.prototype.indexOf` — O(n²) over table size. | `leaf.ts:105` | construction-time only; a `Map` kills it. Cited as ergonomics-of-scale, not a hot-path cost. |
| C-m5 | `string("")` is a zero-width unconditional success producing `""` (which `all()` **keeps**, unlike `undefined`). | `leaf.ts:282` (`len === 1` guard), `:296-306` (`startsWith("", n)` is always true) | measured: `string("").parseState("xyz")` → `isError=false, value="", offset=0` |
| C-m6 | `_initWhitespace` is in the published `dist/leaf.d.ts:30` even though no `exports` specifier reaches it. | `dist/leaf.d.ts:30` vs `package.json:7-33` (no wildcard subpath) | harmless at runtime (see S-2); it is surface *noise* in the type story |
| C-m7 | `matchFunction` returning `""` is an undocumented sentinel meaning "succeed zero-width, discard the match" — and it discards the regex's *consumed* length too. | `leaf.ts:341-343` (`else if (match === "") return state.ok(undefined)`) vs the JSDoc, which documents no return-value protocol at all | a documented `""` protocol, or a distinct sentinel, kills it |

---

## 5. INFO (2)

**C-i1 — the routing law's first hop is currently severed.** `leaf.ts`'s sole lawful downstream
consumes **zero** of it. value.js `src/css/grammar.ts` is hand-rolled (`:1-33` imports);
`@mkbabb/parse-that` is absent from `package.json` and from `node_modules/@mkbabb/`; the last commit
carrying it is `164343c1^:package.json:115`. This is not itself a leaf defect — it is the frame every
row above must be read in. **A consumption audit of a module with no live consumer is an audit of a
contract, and this challenge is written that way**: every blocker is stated against the published
surface, with the current-exercise bound named explicitly where it differs (C-B3, C-B5, C-B6, C-B7).

**C-i2 — one corpus provenance correction, in the module's favour.**
`parsethat-surface-gaps.mjs:5` claims *"Run from this workspace (it resolves the workspace's
node_modules)"*. It does not: `import.meta.resolve` from the script's directory lands on
`docs/tranches/V/megatranche/prototypes/css-parser/node_modules/@mkbabb/parse-that` — a
prototype-local, untracked install (the workspace `node_modules/@mkbabb/` has no `parse-that`, and
`/Users/mkbabb/node_modules/@mkbabb/parse-that` is a broken self-referential symlink). **However**,
`shasum` on that install's `dist/{core.js,index.d.ts,leaf.d.ts,parse.js}` is **4/4 identical** to the
read-only evidence root's build. Under OP-7's substrate-receipt clause the RED-7 numbers are
therefore **valid and comparable** to everything measured here. The comment is wrong; the evidence is
sound. Recorded so a later reader does not void the corpus on a false alarm.

---

## 6. SUPERLATIVES (6) — L-18 runs both ways

**S-1 — `dispatch`'s end-of-input handling is exactly right, and free.**
`leaf.ts:136-137`: `const ch = state.src.charCodeAt(off); const idx = ch < 128 ? tbl[ch] : -1;`.
Past the end, `charCodeAt` yields `NaN`; `NaN < 128` is `false`; the expression falls to `-1` and
takes the labelled error path (`:142-144`). No bounds check, no extra branch, no special case — the
guard that keeps non-ASCII out of a 128-entry table *is* the EOF guard. **Falsifier**:
`dispatch({a: p}).parseState("")` returning a crash or a spurious match would kill it — measured, it
takes the error path cleanly. (Note this is the same `<128` test that produces C-M5; the mechanism is
elegant, its *silence* about dropped keys is the defect.)

**S-2 — the initialization hook is correctly sealed.** `_initWhitespace` is exported from `leaf.ts:396`
and re-exported by **neither** barrel — `index.ts:9` and `core.ts:19-26` both enumerate exactly
`eof, any, dispatch, all, string, regex, trimStateWhitespace, whitespace`. The `exports` map
(`package.json:7-33`) declares five specifiers and **no wildcard**, so deep-importing
`@mkbabb/parse-that/dist/leaf.js` is blocked by Node's exports resolution. **Falsifier**: a `"./*"`
entry in the exports map, or `_initWhitespace` in either barrel, would kill it. Neither exists. This
is the correct pattern for a module-init hook and the rest of the surface should be held to it.

**S-3 — the PT-Q5 retract note is a model of honest self-audit.** `leaf.ts:90-98` names its own
speculative seam, states that it had *zero* production consumers, cites the consumer's actual call
sites ("value.js's only `dispatch()` calls pass NO subTable"), states the removal is contract-safe
*because* nobody passed the argument, and pre-declares the condition under which it may return ("if
value.js's coordinated Q session measures an on-path win … not before"). This is exactly the
discipline W2 §3c demands of a candidate (predicted failure modes and falsifiers written *before*
measurement). The content is exemplary; only its *location* is wrong (C-M8).

**S-4 — the `export let` does not leak write access through any published specifier.** Despite
`whitespace` being a mutable binding (`leaf.ts:395`), `Object.getOwnPropertyDescriptor(require("./dist/core.cjs"), "whitespace")`
→ `{get: true, set: false, configurable: false}`, and assignment **throws `TypeError`**; the parse
after the attempted tamper still works (`string("a").trim().parse(" a ")` → `"a"`). ESM namespace
objects are read-only by spec. The O-8 anti-latch hazard implied by a process-global mutable
`Parser` — a consumer poisoning every `.trim()` in the realm, since `parser.ts:480-482` reads the
live binding as its default argument — is **closed in practice**. **Falsifier**: a writable data
property or a successful reassignment would kill it; measured, assignment throws. Stated honestly:
this is closed by the bundler's interop, not by construction (hence C-M9).

**S-5 — the PT-B3 fusion docblocks make checkable claims, and the claims check out.**
`leaf.ts:166-177` claims the fused `all()` builds *exactly one* flat array (vs N−1 nested tuples for
`a.then(b).then(c)`), uses no `for…of` iterator object, and preserves "the EXACT drop-`undefined` +
backtracking/offset-restore semantics of the original". Reading `fuseAll` (`:179-273`) against
`then` (`parser.ts:81-105`) confirms every clause: one `out` array per call, indexed writes, indexed
`for`, `savedOffset` restore on every error arm, identical `state.value !== undefined` filter. The
arity-2/arity-3 unrolls are byte-faithful to the general arm. **Crucially: the drop-`undefined`
defect (C-B2) is *inherited*, not introduced** — the fusion preserved a pre-existing semantic
faithfully, which is what a semantics-preserving optimization is supposed to do. **Falsifier**: any
divergence between the arity-2/3 arms and the general arm would kill it; there is none.

**S-6 — `regex`'s default path is the right shape for the sole consumer's hot leg.**
`leaf.ts:344-353` uses `sticky.test()` + `String.prototype.substring()` rather than `exec()`,
avoiding a `RegExpMatchArray` allocation per call, and inlines the offset write instead of routing
through `state.ok`'s `+=`. All **19** of value.js's `regex()` sites but one use this path (the
exception, `164343c1^:src/parsing/color/color.ts:129`, genuinely needs a capture group). The
optimization is aimed at the leg the consumer actually runs. **Falsifier**: if the majority of
consumer sites passed `matchFunction`, the fast path would be optimizing the cold leg; measured,
18 of 19 do not.

---

## 7. What the X·P dual-target algebra would KEEP / WRAP / RETIRE

Assessed against `docs/tranches/X/parse-that/waves/W2.md` §3b (the laws: COMP-1, O-8, EQ-1..EQ-6,
R-LAW-1..5) and §3c (AC-1 TAGLESS-TWIN · AC-2 CLOSED-IR · AC-3 SPAN-ALGEBRA · AC-4 SIBLINGS-ORACLE).
W2 §3 item 12 binds any scan layer to stay *inside* the combinator library, so leaf is the natural
home for the terminal tier under AC-3 — this is the disposition that matters most.

| export | disposition | reasoning, bound to a W2 clause |
|---|---|---|
| `dispatch` | **KEEP, wrapped** | The channel-table dispatch capability is named verbatim in §3b's capability families. Its `Int8Array` LUT is the correct lowering shape and has a zero-import Wasm analogue (a 128-byte table in linear memory) — it survives AC-1's "continuation inexpressibility" and AC-2's "escape-hatch node" predictions. **But it cannot be adopted raw**: the wrapper must (i) reject or escape 3-char `-`-middle keys (C-B6), (ii) build the table from an ordered `Array<[key, parser]>` or a `Map`, never a plain object (C-B7), (iii) reject non-ASCII keys loudly (C-M5), (iv) bound the intern index (C-m3), and (v) be typed heterogeneously (C-M4) so **V** stays assignable to the frozen `/css` types under G-10. |
| `string` | **KEEP as-is** | Total, allocation-free on the 1-char path (`leaf.ts:282-294`), label-bearing, no state beyond `offset`. Satisfies O-8 (no global state) by construction. The only mark is `string("")` (C-m5), which the algebra should express as an explicit `succeed` operator rather than a degenerate `string` — cand-O already built `succeed` from `string("")` (`parser-band.md` § Distinctions), and that is the row to make normative. |
| `all` | **WRAP — never expose raw** | The tuple-shape lie (C-B1) and the drop-`undefined` compaction (C-B2) are both fatal to **EQ-3** (provenance `P` is an ordered `(start,end)` array keyed to *construction-ordered leaf index* — an arm that vanishes from the value array desynchronizes the index) and to **EQ-1** (structural deep-equal on a value whose arity varies by input). The algebra's `sequence` operator must preserve arity and represent absence explicitly. |
| `any` | **WRAP — never expose raw** | The arity-1 backtracking divergence (C-M3) breaks **EQ-5** (rollback exactness: "offset … restored to pre-mark values"), and the dead terminal merge (C-M2) means the operator has no slot for the labelled zero-width failure that debt 1 / §3b's capability list requires. §3b also needs *ordered **committed** choice*, which leaf's unconditional-backtracking `any` does not provide at all — a `commit` point has to be added, not wrapped around. |
| `regex` | **RETIRE from the terminal tier** | Three independent reasons, each sufficient. (1) **C-B5**: it is non-total at EOF, so COMP-1 (`weave(V,C,P) === S` for *every* input) cannot hold with `regex` as a terminal. (2) **C-B3/C-B4**: the `matchFunction` arm corrupts the cursor — negative offsets and re-entrancy desync — which is EQ-5 and EQ-3 damage. (3) It has **no zero-import Wasm lowering**: a JS `RegExp` is a host object; under AC-1 it is the "signature leak" failure written into §3c, under AC-3 it is a token-class scan that must be a class table. GATE-VERDICT's "LIVE regex measured FASTEST ≈1.8×" is a *speed* observation about the deposed baseline and is explicitly folklore-scarred in W2 §2c — it is not an argument for keeping a host-object terminal. The replacement is §3b's **token-class scan** over a branchless class table (AC-3's substrate), which lowers to `v128` or a scalar loop identically. |
| `whitespace` | **RETIRE** | It is `regex(/\s*/)` and therefore inherits C-B5 whole: the parser named for "zero or more" **rejects zero at end of input** (measured: `whitespace.parseState("")` → `isError=true`, `furthest=-1`). Under W2 §3b, inter-token whitespace is not a value at all — it is **C**, the byte complement, `(offset, length, kind)`. A whitespace *Parser* whose value is sometimes `""` and sometimes `undefined` (C-m2) and which sometimes fails cannot be the carrier of a conservation law. The replacement already exists in the tree: `utils.ts:159-163` `skipWhitespace` (a total charCode scan) plus a complement-append. |
| `trimStateWhitespace` | **RETIRE from the public surface; KEEP internally** | Zero consumers (C-M6), not a `Parser`, and its in-place `ParserState` mutation is the wrong shape for an algebra whose recovery ops need `mark`/`rollback` (R-LAW-1). It is exactly right where `parser.ts:443-465` uses it and exactly wrong on `./core`. |
| `eof` | **RETIRE — replace with a total-consumption law** | Zero direct consumers even at peak (`164343c1^`); reached only via `Parser.prototype.eof()`. Its `undefined` success value is invisible to `all()` (C-B2, measured: `all(string("a"), eof())` → `["a"]`), so it cannot participate in a value algebra. "Input fully consumed" is a *judgment on the final state* — trivially expressible as `C` covering the tail under COMP-1 — not an operator. Its phantom `<T>` (C-m1) is a symptom of the same category error. |
| `_initWhitespace` | **RETIRE with `whitespace`** | Exists only to break the `leaf ↔ parser` module cycle (`leaf.ts:393-394`). Once whitespace is complement, not value, the cycle and the hook both disappear. Its *sealing pattern* (S-2) should be kept as the house rule for any future init hook. |

**Net**: of nine exports, the algebra keeps **two** (`string`, `dispatch` — the latter only behind a
corrective wrapper), wraps **two** (`all`, `any` — as *distinct* operators, since ordered-committed
choice is not leaf's unconditional-backtracking `any`), and retires **five**. The retirements are not
stylistic: `regex` and `whitespace` fail **COMP-1** by measurement (C-B5), `all`/`any` fail **EQ-3**
and **EQ-5** by measurement (C-B1/C-B2/C-M3), and none of the five has a zero-import Wasm lowering.

**A consequence W2 should hear**: `dispatch` is the *only* leaf export that both survives on its
merits and has no equivalent in the frozen 52-export surface — it is the one thing value.js gained
from parse-that that it could not have hand-rolled cheaply (`164343c1^:src/parsing/index.ts:394-397`
documents the megamorphic-`any` problem it solved). If the dual-target algebra keeps exactly one
artifact from this module, it is the 128-entry char-class LUT — and it must be re-authored, not
imported, because four of its seven defects (C-B6, C-B7, C-M4, C-M5) live in its **table-construction
API**, not its dispatch loop.

---

## 8. Corpus reconciliation

| corpus id | relation to this challenge |
|---|---|
| O-15 **PT-01** (label is a no-op unless armed) | **Confirmed and sharpened** → C-M1: the `./core` tier cannot arm at all, so leaf's labels (`leaf.ts:132, 278, 324`) are unobservable there by construction; and C-M2: `any` has no label slot to arm. |
| O-15 **PT-03** (`PACKRAT_ARMED` one-way latch) | **Not in leaf's scope.** leaf holds **no** process-global mutable state; every export is a pure closure factory. Recorded as a leaf-favourable observation supporting S-4 and W2's O-8. Not armed by any probe here. |
| O-15 **PT-04** (`Parser.lazy` depth 7,761) | Not in leaf's scope (`lazy.ts` / `parser.ts:702`). No claim made. |
| O-15 **PT-07** (`.parse()` returns `undefined` on failure) | **Contradicted as stated, in the worse direction** → C-M7. The failure return is a *partial value of a different shape*, not `undefined`: `all(a,b,c).parse("abX")` → `"b"`. A boundary invariant testing only for `undefined` — O-15's own proposed cure — passes this input. |
| RED-7 row `DEBT-1 cand-F reject() label … undefined` | Mechanism located: `utils.ts:32` drops the label, `core.ts:19-26` withholds the switch → C-M1. |
| RED-7 row `DEBT-1 Parser.prototype.label/.expected — absent` | Root cause located in leaf: `any`'s only merge call is provably dead (`leaf.ts:54, 69`) → C-M2. |
| RED-7 row `GUARD .parse() failure signal` | Extended → C-M7. |
| RED-7 rows `DEBT-3` (lazy depth), `LATCH` | Outside leaf. No claim. |
| `parser-band.md` debt 1 (labelled failures) | leaf can *produce* labels but the tier that ships leaf cannot *observe* them (C-M1). |
| `parser-band.md` debt 3 (recursion bounded by construction) | leaf is recursion-free — a genuine strength, and the reason a leaf-only tier is the right place to start the dual-target lowering. |
| W2 §3b **COMP-1** | `regex`/`whitespace` fail it by measurement (C-B5). |
| W2 §3b **O-8** | leaf **passes**: no operator reads or writes process-global mutable state (S-4 caveat: `whitespace` is a `let`, closed by interop rather than construction → C-M9). |
| W2 §3b **EQ-3 / EQ-5** | `all`'s compaction (C-B2) and `any`'s arity-1 divergence (C-M3) violate them. |
| W2 §3 item 12 (scan layer stays inside the combinator library) | Endorsed — and §7 above names the concrete replacement for `regex`/`whitespace` inside leaf's own tier. |
| W1 §OP-2 (harness liveness) | Not exercised; no harness was run or edited. |

---

## 9. Tally

| severity | count | ids |
|---|---|---|
| BLOCKER | **7** | C-B1 · C-B2 · C-B3 · C-B4 · C-B5 · C-B6 · C-B7 |
| MAJOR | **9** | C-M1 … C-M9 |
| MINOR | **7** | C-m1 … C-m7 |
| INFO | **2** | C-i1 · C-i2 |
| **defects total** | **25** | |
| SUPERLATIVE | **6** | S-1 … S-6 |

Every BLOCKER and every MAJOR except C-M9 was **reproduced against `dist/`**; C-M9 is stated as a
declared-contract defect with its non-reproduction named. C-B3, C-B5, C-B6 and C-B7 additionally
carry an explicit current-exercise bound, because the sole downstream either dodges them by idiom or
no longer consumes the module at all (C-i1).
