served model id: `claude-opus-5[1m]`

# CHALLENGE — `parse-that` module **leaf**, axis **C (CONSUMPTION)**

**Target**: `/Users/mkbabb/Programming/parse-that/typescript/src/parse/leaf.ts` (399 lines, 9 exports).
**Posture**: the module is assumed DEFECTIVE until the tree proves otherwise. Every row carries
severity + `file:line` provenance + a written falsifier. Superlatives carry the same burden (L-18
runs both ways).

**Provenance of this file — two supersessions, recorded in order.**
*Seat 2* (§10): a prior draft of this exact path/axis existed at its dispatch time (mtime
`13:05:35`). It was not accepted as-authored; every claim was re-derived, yielding four corrections
and one addition (C-B8).
*Seat 3* (§11, this pass): a third seat re-derived the file again from a blind read of `leaf.ts` and
its full import closure. **All five of seat 2's load-bearing novel claims (C-B3's double-consumption
receipt, C-B5, C-B6, C-B7, C-B8, C-M7) reproduced exactly** against the same `dist/` — they are
preserved verbatim. Seat 3 contributes **three new defect rows (C-B9, C-M10, C-M11) and one new
superlative (S-7)**, one of which (**C-B9**) *corrects §7's own proposed remedy*, and one of which
(**C-M10**) *refutes a closing sentence of §7*. §11 is the record. Where this file and either prior
draft disagree, this file is the measured one.

---

## 0. Substrate receipts (OP-7 — a number compared across substrates is void)

| what | receipt |
|---|---|
| source under audit | `parse-that/typescript/src/parse/leaf.ts` @ master `ef10d5b`; `git status --short` shows **zero** modifications under `typescript/` (dirty rows are `rust/**`, `README.md`, `.cargo/config.toml` only) |
| runtime probed | `parse-that/typescript/dist/{core.js,core.cjs,parse.js,leaf.d.ts}` — the working-tree build; `dist/leaf.d.ts` carries the PT-Q5 retract prose and `_initWhitespace`, i.e. it is the build **of this source** |
| RED-7 corpus substrate | `parsethat-surface-gaps.mjs` resolves `@mkbabb/parse-that` to `docs/tranches/V/megatranche/prototypes/css-parser/node_modules/@mkbabb/parse-that`, version **1.0.0**. `shasum` on `dist/{core.js,index.d.ts,leaf.d.ts,parse.js}` → **4/4 SAME** as the evidence root (re-run this session). **RED-7's numbers and this challenge sit on one substrate.** |
| forbidden path | `/Users/mkbabb/Programming/parse-that-css-totality-p2` — **absent** (`ls` → `No such file or directory`). **No STOP finding.** |
| law compliance | Read-only on `parse-that` (main checkout only; no `.worktrees/`, no frozen root, no `~/Documents/Codex`). No browser tooling. **Nothing armed** — every probe used `string`/`regex`/`any`/`all`/`dispatch`/`eof`/`whitespace`/`Parser` only; `memoize`/`resetPackrat`/`enableDiagnostics` were never called, and `parsethat-surface-gaps.mjs` was **read, not run**. Sole write = this file. |
| probe mechanism | `node --input-type=module` over stdin heredocs; no probe file was written anywhere. |

---

## 1. The consume edge, measured — not asserted

**PLAW-BIND routing law**: parser → value → packed release. leaf's **sole** lawful downstream is
value.js. Two facts must be held together:

**(a) Today the edge is SEVERED.** value.js's frozen `/css` surface is **52 exports** —
33 types (`src/css/index.ts:1-35`) + 19 runtime (`:36-60`: 7 `grammar` · 1 `syntax` · 3 `timeline` ·
8 `stylesheet`) — and it is a **hand-rolled** grammar. `src/parsing/` does not exist at HEAD.
`grep -rn "parse-that" src/` returns **two prose mentions and zero imports**
(`src/subpaths/math.ts:2`, `src/subpaths/transform.ts:4`). `@mkbabb/parse-that` is **absent from
`package.json`** and from `node_modules/@mkbabb/` (which holds only `glass-ui`, `keyframes.js`,
`value.js`). It was removed at `164343c1` (*"feat(v4)!: value 4.0 producer surface … retire pre-v4
src trees"*); the last commit carrying it is `164343c1^`, `package.json:115` →
`"@mkbabb/parse-that": "^1.0.0"`.

**(b) The last real consumption is fully recoverable, and is the only honest census.** At
`164343c1^`, `src/parsing/**` imported leaf's combinators across **8 source files** (+ `CLAUDE.md`):
`color/color.ts`, `index.ts`, `math.ts`, `stylesheet/stylesheet.ts`, `timeline/easing.ts`,
`timeline/scroll-timeline.ts`, `units.ts`, `utils.ts`.

### 1a. Per-export consumption census

Counted as **occurrences** of a call/reference not preceded by `.` or a word character, over
`164343c1^ -- src/parsing/*.ts src/parsing/**/*.ts`. (Method note: a POSIX-ERE `\w` does **not**
work in `git grep -E`; the character class must be spelled `[^.[:alnum:]_]`. A `\w`-based count
inflates `string` to 443 and `any` to 183 by catching the TypeScript *type* keywords. The numbers
below use the correct class.)

| leaf export | def line | occurrences | lines | verdict |
|---|---|---|---|---|
| `any` | `leaf.ts:28` | **93** | 93 | hottest edge |
| `whitespace` | `leaf.ts:395` | **89** | 89 | hottest *value*-carrying edge |
| `all` | `leaf.ts:154` | **61** | 60 | hot |
| `string` | `leaf.ts:276` | **46** | 43 | hot |
| `regex` | `leaf.ts:317` | **19** | 19 | hot; 2nd param **1** site |
| `dispatch` | `leaf.ts:100` | **6** | 6 | 2 real tables (`index.ts:466`, `color/color.ts:673`); 4 prose |
| `eof` | `leaf.ts:11` | **1** — and that one is **inside a comment** (`stylesheet/stylesheet.ts:627`) | — | **0 real call sites**; reached only via `Parser.prototype.eof()` (`index.ts:528`) |
| `trimStateWhitespace` | `leaf.ts:372` | **0** anywhere in the constellation | 0 | **dead public surface** |
| `_initWhitespace` | `leaf.ts:396` | **0** (correctly withheld from both barrels) | 0 | sealed internal |

`whitespace`'s 89 references decompose as **41** `.trim(whitespace)` · **10** `.skip(whitespace)` ·
**7** `whitespace.next(…)` · 31 remaining (mostly positional arms inside `any(…)`/`all(…)`).
`all(` splits 9 `color.ts` · 13 `index.ts` · 9 `math.ts` · 12 `stylesheet.ts` · 4 `easing.ts` ·
5 `scroll-timeline.ts` · 7 `units.ts` · 1 `utils.ts`.

**Reading**: 6 of 9 exports carry the whole downstream; 3 of 9 (`eof`, `trimStateWhitespace`,
`_initWhitespace`) were never called by the sole consumer. `trimStateWhitespace` is not even a
`Parser` — it is a raw `ParserState` mutator on the published surface of **both** `.` and `./core`.

---

## 2. BLOCKERS (9)

### C-B1 — `all()` at arity 1 returns the bare value, not the 1-tuple its own type declares

- **Where**: `leaf.ts:161` (`parsers.length === 1 ? parsers[0].parser : fuseAll<Result>(parsers)`)
  and the unchecked `as Parser<Result>` at `leaf.ts:163`. Shipped signature `dist/leaf.d.ts:25`.
- **Measured**: `all(string("a")).parse("a")` → `"a"` (a `string`). Declared type: `Parser<[string]>`.
- **Consumption harm**: the type is the contract. A consumer that builds `all(...arms)` from an
  array — the natural shape for a table-driven grammar, exactly what AC-2/AC-4 need — silently
  changes result *shape* at `arms.length === 1`. No runtime signal, no type error; it surfaces as a
  destructuring failure three frames away.
- **Falsifier**: `all(p).parse(x)` returning `[v]`, or a declared `Parser<V | [V]>`, kills this row.
  It returns `"a"` and declares `[string]`.

### C-B2 — `all()` drops `undefined` **and compacts**, so the positional tuple type is a lie

- **Where**: drop tests `leaf.ts:199, 207` (arity-2), `:230, 238, 246` (arity-3), `:267` (general);
  truncation `leaf.ts:209, 248, 270` (`out.length = w`).
- **Measured**: `all(string("a"), string("b").opt(), string("c"))` — declared
  `Parser<[string, string|undefined, string]>` — yields `["a","b","c"]` on `"abc"` and **`["a","c"]`**
  on `"ac"`. Index 1 holds `"c"`; `.length` is 2. `all(string("a"), eof())` → **`["a"]`** (length 1,
  declared length 2), because `eof()` succeeds with `undefined` (`leaf.ts:13`).
- **Consumption harm**: positional destructuring is the only ergonomic use of `all()`, and it is
  unsound for every arm that can produce `undefined` (`.opt()`, `eof()`, `whitespace`, any
  empty-matching `regex`). value.js paid for this **in prose at three sites rather than in types**:
  `164343c1^:src/parsing/index.ts:208-216` — *"parse-that `all()` silently drops `undefined` from
  its result tuple — collapsing `[undefined, stops]` to `[stops]`, which mis-assigned `dir = stops`
  and made the no-direction branch unreachable, so `[dir, ...stops].flat()` threw `stops is not
  iterable` … (NOT a parse-that `all()` semantics change)"*; plus `stylesheet/stylesheet.ts:278` and
  the `math.ts:146` note. **A consumer that shipped a production crash, then wrote three defensive
  comments about one combinator's input-dependent runtime arity, is the measurement.**
- **Falsifier**: a middle-`undefined` case producing `["a", undefined, "c"]`, or a declared
  `Parser<Array<…>>` instead of the mapped tuple at `dist/leaf.d.ts:25`, kills this row. Neither holds.

### C-B3 — `regex(r, matchFunction)`: the **documented** `null` arm resets the cursor to absolute 0 — and lets input be consumed **twice**

- **Where**: signature `leaf.ts:317-320` — `matchFunction?: (match: RegExpMatchArray | null) => string | null`
  (the parameter type explicitly admits `null`, i.e. *invites* handling it). Body `leaf.ts:337-340`:
  `const execResult = sticky.exec(state.src); const match = matchFunction!(execResult); if (match)
  return state.ok(match, sticky.lastIndex - savedOffset);`
- **Mechanism**: a *failed* sticky `exec` resets `lastIndex` to `0` (ECMA-262). If `matchFunction`
  returns a non-null string on a null match — the documented "supply a fallback" reading — the delta
  is `0 - savedOffset`, and `ParserState.ok` (`state.ts:55-59`) does `this.offset += offset`, so the
  cursor lands at **absolute 0**.
- **Measured**: `all(string("aaa"), regex(/x/, m => m ? m[0] : "FALLBACK")).parseState("aaay")` →
  `isError=false`, `value=["aaa","FALLBACK"]`, **`offset=0`**. A successful parse that consumed three
  characters reports a cursor of zero.
- **The harm, made concrete (this seat's addition)**: the reset cursor causes **re-consumption**.
  `all(string("aaa"), fb, string("aaa")).parseState("aaay")` where `fb = regex(/x/, m => m ? m[0] : "FB")`
  → `isError=false`, `value=`**`["aaa","FB","aaa"]`**, `offset=3`. **The same 3-character prefix was
  consumed twice from a 4-character input.** The `many()` zero-progress guard (`parser.ts:538`,
  `if (state.offset === savedOffset) break;`) does not fire — progress *is* made, from a rewound
  base. Downstream, `.eof()` then rejects the "successful" parse
  (`all(string("aaa"), fb).eof().parseState("aaay")` → `isError=true, offset=0`), so the defect
  presents as an inexplicable eof failure, not as a cursor bug.
- **Reachability bound, stated honestly**: value.js's single `matchFunction` site —
  `164343c1^:src/parsing/color/color.ts:129`, `regex(/\(([^)]+)\)/, (m) => m?.[1] ?? null)` —
  returns `null` on a null match and therefore **dodges** this. Zero current consumer exercise. It
  remains a blocker of the *published contract*, and of the W2 slice, whose `parseCssColor`
  head-dispatch wants exactly this map-with-fallback shape.
- **Falsifier**: computing the delta from an `end` captured *before* user code, or a signature
  forbidding a string return on a `null` match, kills this row. Neither holds.

### C-B4 — `regex(r, matchFunction)` reads the shared sticky `lastIndex` **after** user code — value and offset desynchronize under re-entrancy

- **Where**: `leaf.ts:322` constructs **one** `sticky` RegExp per `regex()` call, captured in the
  closure. `leaf.ts:338` calls `matchFunction!(execResult)` — arbitrary consumer code — and *then*
  `leaf.ts:340` reads `sticky.lastIndex`.
- **Measured**: a `matchFunction` that re-enters `parseState` once on the *same* parser with a
  1-character source: outer `parseState("abcd")` → `isError=false`, `value="abcd"`, **`offset=1`**.
  The value says four characters were consumed; the cursor says one.
- **Contradicts an in-tree claim**: `parser.ts:35-41` asserts the `parseState` entry boundary makes
  re-entrancy "**SOUND**". That claim is scoped to *packrat tables*; the closure-captured `sticky`
  regex is a second, unstated re-entrancy hazard at the same boundary, and it corrupts *position*,
  not merely memoization.
- **Consumption harm**: `.map()`-callback re-parsing is an explicitly anticipated consumer pattern,
  named in `parser.ts:36-37`. The default `test()` path (`leaf.ts:344-353`) is safe — no user code
  runs between the `lastIndex` write and its read — so this is *specifically* the `matchFunction` arm.
- **Falsifier**: capturing `sticky.lastIndex` into a local before invoking `matchFunction`, or
  constructing a fresh RegExp per call, kills this row. Neither holds.

### C-B5 — `regex()` fails unconditionally at end-of-input, **invisibly** — so `whitespace` rejects the empty match at EOF

- **Where**: `leaf.ts:327-330`:
  `if (state.offset >= state.src.length) { state.isError = true; return state; }` — an early return
  that **skips `mergeErrorState` entirely**.
- **Measured**: `whitespace` is `regex(/\s*/)` (`leaf.ts:397`). `whitespace.parseState("")` →
  `isError=true`, **`furthest=-1`**. `string("a").skip(whitespace).parseState("a")` → `isError=true`.
- **Two defects on one line**:
  1. **Semantic** — a regex matching the empty string (`/\s*/`, `/[a-z]*/`, `/(?:)/`) is rejected at
     EOF. `whitespace` — the export with **89** value.js references — is **not total**.
  2. **Diagnostic** — the early return skips `mergeErrorState`, so `furthest` is never advanced.
     Truncated input is the commonest malformed class, and it is exactly the class for which the
     furthest-offset tracker reports `-1` ("nothing was tried"). `parseStateInner` (`parser.ts:60`)
     then falls back to `state.offset`, so the rendered error points at the backtracked offset, not
     the failure site.
- **Live consume shapes, separated by probe**: `.skip(whitespace)` (**10** sites) and
  `whitespace.next(…)` (**7** sites) route through the `whitespace` *Parser*; `.trim(whitespace)`
  (**41** sites) routes through `FLAG_TRIM_WS`/`trimStateWhitespace` (`parser.ts:443-465`) and is
  unaffected. Measured on `"a"`: `a.skip(whitespace)` → **isError=true**; `whitespace.next(a)` → ok;
  `a.trim(whitespace)` → ok. **10 of value.js's own sites sat on a rejecting edge** whose only shield
  was that a `)` always followed in the enclosing production.
- **Why blocker, not major**: W2 §3b **COMP-1** requires `weave(V, C, P) === S` for *every* input in
  the closed universe, accepted or malformed (`W2.md:241`). A whitespace scanner that cannot match
  zero bytes at end of string cannot carry a conservation law over a universe containing `""` and
  every trailing-whitespace-free input.
- **Falsifier**: `whitespace.parseState("")` returning `isError=false`, or the EOF branch calling
  `mergeErrorState(state, label)` before failing, kills this row. It does neither.

### C-B6 — `dispatch()`: any 3-character key whose middle char is `-` is silently a **range**, with no escape

- **Where**: `leaf.ts:116-119`:
  `if (chars.length === 3 && chars[1] === '-') { … for (let c = lo; c <= hi; c++) tbl[c] = idx; }`.
  No quoting, no escape, no diagnostic.
- **Measured**: `dispatch({ "+-.": p })` — the exact key a CSS author writes for the number-start set
  `{+, -, .}` — routes charCodes 43…46, i.e. `'+' ',' '-' '.'`. Probe: input `","` → **accepted**,
  returns the parser's value; input `"*"` → error. **`','` (44) is silently admitted as a number head.**
- **Consumption harm for the X·P slice**: `parseCssColor` head dispatch and `parseCssScalar` both
  need a number-start bucket; `"+-."` is the obvious spelling; the failure is silent, admits a
  *separator* as a value head, and is unfixable without knowing the undocumented precedence — the
  JSDoc (`leaf.ts:86-88`) documents the range syntax but never warns that it **shadows** the
  multi-char form.
- **Falsifier**: `dispatch({"+-.": p}).parseState(",")` erroring kills this row. It succeeds.

### C-B7 — `dispatch()`: integer-like keys are hoisted by `Object.entries`, so the documented `"0-9"` range can **never** be overridden by a digit key

- **Where**: `leaf.ts:113` iterates `Object.entries(table)`. Plain-object key order is
  **integer-like ascending, then string keys in insertion order** (ECMA-262
  OrdinaryOwnPropertyKeys). `"0"` is integer-like; `"0-9"` is not.
- **Measured**: `Object.keys({"0-9":1, "0":1})` → `["0","0-9"]`. Therefore
  `dispatch({"0-9": RANGE, "0": SPECIAL}).parse("0")` → **`"RANGE"`**, and the reversed insertion
  order `dispatch({"0": SPECIAL, "0-9": RANGE}).parse("0")` → **`"RANGE"`** as well. The non-digit
  control `dispatch({"a-c": RANGE, "a": SPECIAL}).parse("a")` → **`"SPECIAL"`**, as intended.
- **Consumption harm**: value.js's routing is *built* on the override idiom and had to discover it
  empirically — `164343c1^:src/parsing/index.ts:463-465`: *"Insertion order matters: the broad
  `a-z`/`A-Z`/`-` generic ranges are registered FIRST, then the specific letters override (a later
  single-char table key overwrites the range slot — **verified against parse-that's dispatch**)."*
  That contract appears nowhere in `dispatch`'s JSDoc; it holds for letters and silently **inverts**
  for digits — the one key class the JSDoc names as its own example (`leaf.ts:87`: `ranges ("0-9")`).
- **Both value.js tables dodge it by luck**: `index.ts:466` keys are letters and `"-"`;
  `color/color.ts:673`'s table keys are `"#"`, `"0-9"`, `"+"`, `"-"`, `"."` with no single-digit
  override. Luck is not a contract.
- **Falsifier**: `dispatch({"0-9":R,"0":S}).parse("0")` returning `S` in *either* insertion order
  kills this row. It returns `R` in both.

### C-B8 — leaf has **three different postures** toward a non-string input, and its most-consumed export **silently succeeds** — falsifying the corpus premise the boundary guard is designed on (NEW this seat)

- **Where**: `leaf.ts:327` (`state.offset >= state.src.length`) — on a non-string, `.length` is
  `undefined`, `0 >= undefined` is `false`, so the EOF guard **does not fire**. Control reaches
  `sticky.test(state.src)` (`leaf.ts:344`), where `RegExp.prototype.test` performs `ToString` on the
  argument, silently coercing. `string()` by contrast calls `state.src.charCodeAt` (`:285`) /
  `state.src.startsWith` (`:297`) directly, and `dispatch()` calls `state.src.charCodeAt` (`:136`).
- **Measured, one module, one bad-input class**:

  | probe | result |
  |---|---|
  | `string("a").parseState(42)` | **TypeError** |
  | `string("ab").parseState(42)` | **TypeError** |
  | `dispatch({"4": …}).parseState(42)` | **TypeError** |
  | `regex(/4/).parseState(42)` | **TypeError** (coerces, matches, then `42.substring` throws at `:350`) |
  | `regex(/o/).parseState({})` | **NO THROW** — `isError:true`, an ordinary *parse error* on `"[object Object]"` |
  | `whitespace.parseState(42)` | **NO THROW — `isError:false`**, `offset:0` |
  | `whitespace.parseState({})` | **NO THROW — `isError:false`**, `offset:0` |
  | `whitespace.parseState(null)` | **TypeError** |

- **Consumption harm — this is the blocker**: RED-7's `GUARD parseState(non-string) totality` row and
  O-15 **PT-07** both report *"5/5 throw raw `TypeError`"*, measured on `string("a")`. The natural
  inference — *"a non-string always announces itself"* — is **false for leaf's most-consumed export**.
  `parser-band.md:119` makes "**the JS-boundary non-string guard**" a **binding debt** (debt 4, on
  which cand-O and cand-F *independently converged*), and W2 folds it to *"non-string inputs die at a
  named [boundary]"* (`W2.md:161`). A guard specified from the corpus premise — throw-detection, or a
  spot-check on one leaf — passes `whitespace`, which returns a clean `isError:false` success. The
  guard must be a **positional `typeof` check at the entry boundary**, not an inference from observed
  throwing; the corpus as written does not say that, and this row is why it must.
- **Reachability bound, stated honestly**: a correctly-placed entry-boundary `typeof` guard fixes all
  eight rows at once, and value.js's own consumers never fed a non-string. The blocker is against the
  **published contract's totality** and against the **soundness of the corpus-derived cure**, not
  against a live crash.
- **Falsifier**: uniform behaviour across the eight probes — all throwing, or all parse-erroring —
  kills this row. Measured: three distinct postures, including silent success.

### C-B9 — leaf ships **three mutually inconsistent whitespace character-classes**, none of them CSS's, and `.trim()` silently substitutes one for the parser the caller passed (NEW — seat 3)

- **Where**: three whitespace notions reach the published surface, two of them from leaf:

  | export | definition | class |
  |---|---|---|
  | `trimStateWhitespace` | `leaf.ts:383` — `c === 32 \|\| (c >= 9 && c <= 13)` | `{09,0A,0B,0C,0D,20}` |
  | `whitespace` | `leaf.ts:397` — `regex(/\s*/)` | JS `\s` — incl. U+00A0, U+FEFF, U+2028, U+1680, U+2000-200A |
  | `skipWhitespace` | `utils.ts:162` — `charCodeAt(i) <= 32` | **all** of U+0000–U+0020 |

  All three are on the root barrel (`index.ts:5, 9`); the first two are also on `./core`
  (`core.ts:16-25`).
- **Measured** (offset after skipping one leading character, `dist/parse.js`):

  ```
              skipWhitespace   trimStateWhitespace   whitespace(/\s*/)
  U+0000  NUL      1                 0                     0
  U+001F  US       1                 0                     0
  U+000C  FF       1                 1                     1
  U+00A0  NBSP     0                 0                     1
  U+FEFF  BOM      0                 0                     1
  U+2028  LSEP     0                 0                     1
  ```

  **No two of the three agree.** And css-syntax-3 §4.2 defines whitespace as exactly
  `{U+0009, U+000A, U+000C, U+000D, U+0020}` — so `trimStateWhitespace` **over-accepts U+000B (VT)**,
  `whitespace` over-accepts NBSP/BOM/U+2028, `skipWhitespace` over-accepts every C0 control.
  **The module ships three wrong answers to its sole prospective consumer's question and no right one.**
- **The silent substitution is the sharp edge**: `Parser.trim()`'s default argument **is** the
  `whitespace` regex parser (`parser.ts:481`), but `trim()` then dispatches on a **string tag** —
  `if (parser.context?.name === "whitespace")` (`parser.ts:488`, tag set at `leaf.ts:398`) — and
  substitutes the charCode loop (`parser.ts:498, 509`). The caller hands in a `/\s*/` parser and
  silently gets a `{09..0D,20}` scanner. Measured:

  ```
  string("a").trim().parseState(" a ")                       →  isError = true
  string("a").wrap(regex(/\s*/), regex(/\s*/)).parseState(same input)   →  isError = false
  string("a").trim().parseState("a")                       →  isError = false   // VT; CSS says no
  ```

  This is the code path behind **41** of value.js's 89 `whitespace` references (§1a), and the tag is
  a plain string in a public union (`state.ts:157`), so any parser named `"whitespace"` inherits the
  substitution.
- **Why blocker, and why it corrects §7**: W2 §3b **COMP-1** requires `weave(V, C, P) === S` byte for
  byte, with `C` holding `(offset, length, kind)` for *every* byte not injected into `V` — *"whitespace,
  comments, case spelling, separator choice"* (`W2.md:239`). **All three mechanisms advance the cursor
  and record nothing** (`leaf.ts:389`, `utils.ts:163`): there is no parameter, return channel, or hook
  by which a skipped run could enter `C`. The whitespace surface is COMP-1-**unsatisfiable by
  construction**, not merely mis-specified. §7's `whitespace` row proposes `skipWhitespace` as *"the
  replacement [that] already exists in the tree"* — **that remedy is wrong as stated**: `skipWhitespace`
  is a third, differently-wrong class (it eats NUL and every C0 control, which CSS treats as
  U+FFFD-producing input, not whitespace) and it too has no complement channel. The correct disposition
  is a **new** span-emitting `trivia` operator with the CSS class fixed by citation; §7 is corrected
  below.
- **Falsifier**: any input on which all three mechanisms advance identically, or any mechanism by
  which a skipped run is reported to the caller, or `trim()` honouring the class of the parser it was
  given. Measured: six inputs, three distinct behaviours, zero reporting channel, and `trim()`
  contradicting its own default argument.

---

## 3. MAJOR (11)

### C-M1 — `./core` ships leaf's label construction but exports no way to make a label observable

- **Where**: `core.ts:19-26` re-exports `eof, any, dispatch, all, string, regex,
  trimStateWhitespace, whitespace` — and **not** `enableDiagnostics`, **not** `mergeErrorState`
  (both are on `.` via `index.ts:5` and on `./diagnostics`). leaf builds a label at construction time
  in `string` (`leaf.ts:278`), `regex` (`:324`) and `dispatch` (`:128-132`), passing it to
  `mergeErrorState` at `:16, 142, 291, 303, 360`. `utils.ts:33` gates recording on the module global:
  `state.expected = diagnosticsEnabled && label ? [label] : undefined`.
- **Measured**: `"enableDiagnostics" in core` → **false**; `"mergeErrorState" in core` → **false**.
  `ParserState` **is** exported from `./core` (`core.ts:8-13`), so a `./core` consumer can *read*
  `.expected` and can never make it non-`undefined` through any specifier `./core` provides.
- **Consequence**: cand-F's `reject(label)` idiom — *"the single clearest thing cand-F does better"*
  (`parser-band.md:116`, debt 1) — is **inexpressible on `./core` alone**, because it needs
  `mergeErrorState`. A consumer wanting the zero-side-effect primitive tier *and* labelled zero-width
  failures must import from `.` (dragging json/csv/packrat) or `./diagnostics`, defeating the split's
  stated purpose (`core.ts:3-5`). W2's EQ-4 makes this fatal, not cosmetic: *"a candidate whose labels
  exist only under an armed-diagnostics mode reads as diagnostics-ABSENT and fails"* (`W2.md:266`).
- **Folds**: RED-7 row `DEBT-1 cand-F reject() label, diagnostics OFF (shipping default)` and O-15
  **PT-01**. This challenge adds the *why*: it is not only that arming is required — the `./core`
  tier **cannot arm at all**.
- **Falsifier**: `./core` exporting `enableDiagnostics`, or `mergeErrorState` recording labels
  unconditionally, kills this row. Neither holds.

### C-M2 — `any()`'s terminal `mergeErrorState(state)` is a structural no-op: the hottest alternation is diagnostically silent **by construction**

- **Where**: `leaf.ts:54` (arity-2 arm) and `leaf.ts:69` (general arm) call `mergeErrorState(state)`
  with **no label**, *after* `state.offset` has been restored to `savedOffset`.
- **Mechanism**: `utils.ts:29-47` updates only when `state.offset > state.furthest` (impossible — the
  arms have already pushed `furthest` to ≥ `savedOffset`) or `state.offset === state.furthest`
  (possible, but then `label` is `undefined`, so both branch bodies are empty).
- **Measured, nothing armed**: `any(all(string("ab"), string("c")), string("zz")).parseState("abX")` →
  `furthest=2`, final `offset=0` → `offset < furthest` is **true**, so neither branch can fire. The
  degenerate `any(string("abc"), string("abd")).parseState("abX")` → `furthest=0, offset=0`: the
  equality branch fires, but with `label === undefined` — still a no-op.
- **Consumption harm**: `any` — **93** value.js sites, the module's busiest export — contributes
  **zero** expectations *even with diagnostics armed*, and there is no slot to attach one. RED-7's
  `DEBT-1 Parser.prototype.label / .expected — absent` reads as a missing convenience; the sharper
  reading is that leaf's alternation has **no place to put a label**, because its only merge call is
  provably dead.
- **Falsifier**: `offset < furthest` being false in the advancing-arm case, or `leaf.ts:54/69`
  passing a label, kills this row. Probed: `offset=0`, `furthest=2`; the source passes no label.

### C-M3 — `any()` at arity 1 skips the backtracking every other arity performs

- **Where**: `leaf.ts:76` — `n === 1 ? parsers[0].parser : anyParser`. The general arm restores
  `state.offset = savedOffset` on every failed trial (`leaf.ts:66`); the arity-1 shortcut runs the
  inner `parser` raw.
- **Measured**: with an arm that advances 3 then fails — `any(p).parseState("abcdef")` leaves
  **`offset=3`**; `any(p, q).parseState("abcdef")` leaves **`offset=0`**.
- **Consequence**: C-B1's shape again — a dynamically-built alternation changes semantics at
  `length === 1`. And because the returned `Parser` still carries `createParserContext("any", …)`
  (`leaf.ts:77`), the debug/`toString` view claims `any` while the behaviour is the bare arm.
- **Falsifier**: both offsets being 0 kills this row. They are 3 and 0.

### C-M4 — `dispatch()`'s table is homogeneous while `any()`'s is a union: the advertised `any` → `dispatch` upgrade forces a cast at the parse boundary

- **Where**: `dispatch<T>(table: Record<string, Parser<T>>): Parser<T>` (`dist/leaf.d.ts:24`) vs
  `any<T extends Array<Parser<any>>>(…): Parser<T[number] extends Parser<infer V> ? V : never>`
  (`dist/leaf.d.ts:4`). The JSDoc (`leaf.ts:82-84`) sells `dispatch` as the drop-in replacement for
  `any`'s "sequential trial-and-error", but `Record<string, Parser<T>>` cannot express a
  heterogeneous table.
- **Two consumer receipts, both paid in casts**:
  - `164343c1^:src/parsing/color/color.ts:673` —
    `const Value = dispatch(dispatchTable).trim(whitespace) as Parser<ParsedColorUnit>;`, with a
    10-line comment (`:663-672`) justifying the widening.
  - `164343c1^:src/parsing/index.ts:466` — `const Function_: Parser<any> = dispatch({…})`, with every
    bucket declared `Parser<any>` (`:455-464`) to make the table type-check.
- **Consequence**: the module's own recommended migration path costs the sole consumer its type
  safety at exactly the boundary W2 §3b makes normative — **V** must be assignable to the frozen
  `/css` types under an excess-property check (`W2.md:236`, G-10). An `as` cast at the parse boundary
  is precisely the seam G-10 exists to detect.
- **Falsifier**: a signature `dispatch<T extends Record<string, Parser<unknown>>>(t: T):
  Parser<T[keyof T] extends Parser<infer V> ? V : never>` would make both receipts cast-free. It is
  not that.

### C-M5 — `dispatch()` silently drops non-ASCII keys while its own label advertises them

- **Where**: `leaf.ts:101` allocates `new Int8Array(128)`; `leaf.ts:122` writes
  `tbl[chars.charCodeAt(i)] = idx` with **no** range check — a TypedArray out-of-bounds write is a
  silent no-op. Meanwhile `leaf.ts:128-132` builds the label from `Object.keys(table)`
  *unconditionally*, and `leaf.ts:137` reads `ch < 128 ? tbl[ch] : -1`.
- **Measured**: `dispatch({ "é": string("é") }).parseState("é")` → **isError=true**, with the failure
  label still promising `one of ['é']`.
- **Consequence**: CSS identifiers admit non-ASCII from U+0080 (css-syntax-3 §4.2). A consumer
  building an ident-start dispatch loses every non-ASCII head with **no construction-time signal**
  and a label that actively lies about it.
- **Falsifier**: construction throwing, warning, or the label omitting unrepresentable keys kills
  this row. It does none of the three.

### C-M6 — `trimStateWhitespace` is dead public surface, and the project's own dead-export gate is structurally incapable of catching it

- **Where**: `leaf.ts:372-391`; exported from `index.ts:9` and `core.ts:23`; `dist/leaf.d.ts:28`.
- **Facts**: **0** consumers in value.js (`164343c1^` *or* HEAD, `src/` *or* `test/`), **0** in
  keyframes.js; inside parse-that it is used only by `parser.ts:443, 452, 456, 465, 499, 509` — all
  *internal*. It is not a `Parser` but a `ParserState` mutator, so it cannot compose with any other
  export on the surface it ships alongside.
- **Contradicts the project's own precept**: `scripts/proof-no-dead-combinator.mjs:9-11` — *"A
  never-importable export is not part of the public contract; an export born one prior tranche with
  zero workspace consumers is dead by the precept."* That gate's `banned` list (`:30-33`) is
  hardcoded to exactly `{name:"thenMap"}` and `{name:"fuse"}`, so it is structurally incapable of
  finding the next instance. **The gate proves two named deletions; it does not enforce the precept.**
  (Its vacuity guard, `:17-19`, confirms `dispatch` is still defined — good hygiene aimed at the
  wrong risk.)
- **Falsifier**: a single import of `trimStateWhitespace` from any consumer tree kills this row.
  `git grep` over `164343c1^:src/`, HEAD `src/`, and `test/` finds none.

### C-M7 — `.parse()` returns a **partial value** on failure — this extends and partly contradicts O-15 PT-07

- **Where**: `parser.ts:77-79` — `parse(val) { return this.parseState(val).value; }`.
  `parseStateInner` builds a clean `errorState` with `value: undefined` (`parser.ts:61`) but assigns
  it only to `this.state` (`:66`) and then **`return state`** (`:74`) — the *mutated* state. leaf's
  `fuseAll` error arms (`leaf.ts:194-198, 224-228, 262-266`) restore `offset` but never reset
  `state.value`.
- **Measured**: `all(string("a"), string("b"), string("c")).parse("abX")` → **`"b"`** (the last
  successful sub-parser's value) while `parseState("abX").isError === true`. Success on `"abc"` yields
  `["a","b","c"]`. The single-leaf case behaves as O-15 recorded: `string("a").parse("b")` →
  `undefined`.
- **Why this matters for the corpus**: O-15 **PT-07** and RED-7's `GUARD .parse() failure signal —
  returns undefined, indistinguishable from .opt()` both **understate** it. The failure return is not
  merely ambiguous with a successful `undefined`; it can be a **plausible, differently-shaped value**
  (`"b"` where success yields a 3-array). **A JS-boundary invariant that checks only for `undefined`
  — the cure O-15 itself proposes — passes this input.** (Same failure mode as C-B8, different
  mechanism: the corpus generalized from a single-leaf probe to the module.)
- **Also**: `parseState()` hands back `state` (offset backtracked, value partial) while
  `console.error(this.state.toString())` (`parser.ts:68`) renders `errorState` (offset `furthest`,
  value `undefined`). Two different error views; **the printed one is not the returned one.**
  Measured: returned `offset=0, value="b"`; `p.state` → `offset=2, value=undefined`.
- **Falsifier**: `all(a,b,c).parse("abX")` returning `undefined` kills this row. It returns `"b"`.

### C-M8 — 19 lines of internal tranche archaeology ship in the published `.d.ts`

- **Where**: `leaf.ts:90-98` (the PT-Q5 RETRACT note) is emitted verbatim into `dist/leaf.d.ts:5-23`,
  immediately above `export declare function dispatch<T>(…)`.
- **Consequence**: every consumer's editor hover for `dispatch` — the one combinator the
  README-level story is built on — leads with "PT-Q5 RETRACT note", "0.12.0", "terminal-or-KILL
  disposition", "value.js's coordinated Q session". The actual usage documentation
  (`leaf.ts:82-88`, four lines) is buried above it. A retraction rationale is a CHANGELOG entry, not
  API documentation.
- **Falsifier**: `dist/leaf.d.ts` carrying only the four-line `@param` block kills this row. It
  carries all 19.

### C-M9 — `whitespace`'s published type is *inferred from another export*, and is non-optional over an initialization window

- **Where**: `leaf.ts:395` — `export let whitespace: ReturnType<typeof regex>;` → `dist/leaf.d.ts:29`.
  Initialized only by `_initWhitespace()` (`leaf.ts:396-399`), invoked once from `parser.ts:711`, at
  the bottom of a module `leaf.ts:1` already imports (a deliberate cycle, documented at
  `leaf.ts:393-394`).
- **Two semver/type problems**:
  1. `ReturnType<typeof regex>` makes `regex`'s **inferred** return type part of `whitespace`'s
     public type. Any change to `regex`'s inference silently changes a *second* export's `.d.ts` —
     the package cannot reason about its own surface stability. `package.json:3` declares `1.0.0`,
     so this is a compatibility surface, not a pre-1.0 draft.
  2. The declared type is non-optional (`Parser<string>`) while the binding is genuinely `undefined`
     between leaf's evaluation and `parser.ts:711`. The manifest declares `"sideEffects": false`
     (`package.json:6`), which grants bundlers permission to elide module bodies whose exports appear
     unused — and the initializer is a bare top-level call, the exact construct that permission
     targets.
- **Honest bound**: I could not make the window observable through any published specifier — the
  shipped bundles are single-file, and `dist/core.cjs` initialized correctly under `require` (S-4).
  The claim is about the **declared contract**, not a reproduced runtime failure.
- **Falsifier**: an explicit `Parser<string>` annotation plus an eager (non-`let`) construction kills
  both halves. Neither is present.

### C-M10 — `dispatch()`'s **hit path does not restore the cursor**: it is a committed choice sold as the backtracking `any()` it replaces (NEW — seat 3)

- **Where**: `leaf.ts:139-141` — `if (idx >= 0) { return parsers[idx].parser(state); }`. There is no
  `savedOffset` capture anywhere in `dispatchParser` (`leaf.ts:134-145`). Compare `any`, which
  restores `state.offset = savedOffset` before every retrial and before its final failure
  (`leaf.ts:46-52`, `:66-67`).
- **Measured**, with an arm that advances then fails (`string("a").chain(() => string("b"))` —
  `chain` does not restore, `parser.ts:131-138`):

  ```
  dispatch({ "a": leaky }).parseState("ax").offset      →  1     // cursor leaked
  any(leaky, string("zzz")).parseState("ax").offset     →  0     // cursor restored
  ```
- **Consumption harm**: the JSDoc (`leaf.ts:82-85`) sells `dispatch` as the O(1) replacement for
  *"sequential trial-and-error like `any()`"*, and `proof-no-dead-combinator.mjs:53-57` names it *"the
  known-live export"*. A consumer performing the recommended migration silently changes backtracking
  discipline at the busiest routing point in the grammar. Both of value.js's real tables
  (`164343c1^:src/parsing/index.ts:466`, `color/color.ts:673`) sit inside enclosing `any`/`trim`
  wrappers that happened to re-restore — luck again, not contract.
- **This refutes §7's own closing sentence.** §7 concluded that `dispatch`'s defects *"live in its
  **table-construction API**, not in its dispatch loop."* C-M10 is **in the loop**, and it is the one
  defect a corrective wrapper around the *table* cannot fix — a wrapper must also bracket the call.
  §7 is corrected below.
- **W2 bearing**: §3b names *channel-table dispatch* as a required capability family alongside
  *ordered committed choice* — as **two** families. Shipping one operator whose rollback law is the
  committed one while its documentation promises the backtracking one makes **EQ-5** (*"offset …
  restored to pre-mark values"*, `W2.md:267`) unstatable for the family, exactly as C-M3 does for `any`.
- **Falsifier**: `dispatch` restoring the cursor after a leaking arm, or the JSDoc declaring the
  committed semantics. Measured 1 vs 0; the JSDoc declares neither.

### C-M11 — `./core`'s tier-isolation promise is **false in the built graph**, and `proof:subpath` is structurally incapable of detecting it (NEW — seat 3)

- **The claim under audit**: `core.ts:3-5` — *"The zero-side-effect primitive set… A consumer that
  imports only this **never pulls the diagnostics accumulator, the packrat tier**, or the json/csv
  domain parsers."*
- **Measured import graph of the shipped build** (`dist/`, the same build §0 receipts):

  ```
  dist/core.js:1                    →  ./packrat-entry-CS1td-8B.js     (40 K; PACKRAT_ARMED at :678)
  dist/packrat-entry-CS1td-8B.js:1  →  ./diagnostics-DDazRHgl.js       (4 K)
  ```

  `import { string } from "@mkbabb/parse-that/core"` therefore loads **the packrat tier and the
  diagnostics accumulator**, transitively, in two hops. The four leaf-relevant chunks are not
  separable: `core.js` is a 1.3 K re-export shim over the 40 K monolith.
- **leaf is a proximate cause of the diagnostics edge**: `leaf.ts:5` imports `mergeErrorState` from
  `./utils.js` — the diagnostics module — and **every one of leaf's six error paths calls it**
  (`:16, 54, 69, 142, 291, 303, 360`). There is no leaf terminal that does not touch the diagnostics
  tier. (The packrat edge is `parser.ts:7`'s — `packratEnter`/`packratExit` — and is attributed there,
  not to leaf.)
- **The gate cannot catch it**: `test/subpath-gate.mjs:26-45` checks that each `exports` target
  *exists on disk* and that `core.Parser` / `core.dispatch` are `typeof "function"`. It never inspects
  an import graph. So `proof:subpath` is green while the claim it exists to protect is false — a gate
  that cannot fail for its intended reason (W2 L-19), turned on the evidence tree's own instrument.
  This is the same structural finding as C-M6's reading of `proof-no-dead-combinator.mjs`: two of the
  five `proof:*` gates prove a specific past deletion rather than enforcing a standing property.
- **Relation to C-M1**: C-M1 established that a `./core` consumer cannot *observe* a label because the
  tier withholds `enableDiagnostics`/`mergeErrorState`. C-M11 sharpens it in the worse direction — the
  consumer **already pays for the whole accumulator and the whole packrat tier**, and is denied only
  the switch. The cost is borne; the capability is withheld. It also moots C-M1's stated workaround
  (*"must import from `.` … defeating the split's stated purpose"*): the purpose was already defeated.
- **Falsifier**: an import graph in which `dist/core.js` reaches neither chunk, or a `proof:subpath`
  assertion over module edges. Neither exists.

---

## 4. MINOR (7)

| id | claim | provenance | falsifier / measurement |
|---|---|---|---|
| C-m1 | `eof<T>()`'s `<T>` is phantom — declared, never used, return cast to `Parser<unknown>`. `eof<string>()` is `Parser<unknown>`. | `leaf.ts:11`, `:24` (`as Parser<unknown>`), `dist/leaf.d.ts:3` | a `T`-dependent return type kills it; the `.d.ts` says `Parser<unknown>` for all `T` |
| C-m2 | `regex()` and `whitespace` are typed `Parser<string>` but yield `undefined` on an empty match. | `leaf.ts:355` (`state.unsafeSetValue(undefined)`), `dist/leaf.d.ts:27, 29` | measured: `whitespace.parseState("x").value` → `undefined` (`typeof "undefined"`), declared `string` |
| C-m3 | `dispatch`'s intern index overflows `Int8Array`. **Exact boundary measured**: indices 0–127 correct; **128–255 fail *closed*** (stored as negative → the `idx >= 0` test at `:139` rejects); **256 → `P0`, 257 → `P1`, 300 → `P44`** — i.e. **≥256 fails *open*, dispatching to the wrong parser**. | `leaf.ts:101` (`new Int8Array(128)`), `:104-111` (`internParser` returns an unbounded index), `:122`, `:139` | probe interns *N* parsers behind non-ASCII (dropped) keys, then one ASCII key at index *N*; each filler also matches the probe input so a mis-dispatch is visible rather than masked as an error. Reachability: needs ≥128 distinct parser objects in one table — high. A bound on `internParser`, or a `Uint16Array`, kills it. |
| C-m4 | `internParser` is `Array.prototype.indexOf` — O(n²) over table size. | `leaf.ts:105` | construction-time only; a `Map` kills it. Cited as ergonomics-of-scale, not hot-path cost. |
| C-m5 | `string("")` is a zero-width unconditional success producing `""` — which `all()` **keeps**, unlike `undefined`. | `leaf.ts:282` (the `len === 1` guard excludes it), `:296-306` (`startsWith("", n)` is always true) | measured: `string("").parseState("xyz")` → `isError=false, value="", offset=0`; `all(string(""), string("x")).parse("x")` → `["","x"]` |
| C-m6 | `_initWhitespace` is in the published `dist/leaf.d.ts:30` even though no `exports` specifier reaches it. | `dist/leaf.d.ts:30` vs `package.json:7-33` (five specifiers, **no** wildcard) | harmless at runtime (S-2); it is surface *noise* in the type story |
| C-m7 | `matchFunction` returning `""` is an undocumented sentinel meaning "succeed zero-width, discard the match" — and it discards the regex's *consumed length* too. | `leaf.ts:341-343` (`else if (match === "") return state.ok(undefined)`) vs the JSDoc, which documents no return-value protocol | measured: `regex(/a/, () => "").parseState("abc")` → `value=undefined, offset=0` — the matched `"a"` is un-consumed. A documented `""` protocol, or a distinct sentinel, kills it. |

---

## 5. INFO (2)

**C-i1 — the routing law's first hop is currently severed.** leaf's sole lawful downstream consumes
**zero** of it: `src/parsing/` is gone at HEAD, `src/css/grammar.ts` is hand-rolled,
`@mkbabb/parse-that` is absent from `package.json` and `node_modules/@mkbabb/`, and the last commit
carrying it is `164343c1^:package.json:115`. This is not itself a leaf defect — it is the frame every
row above must be read in. **A consumption audit of a module with no live consumer is an audit of a
contract, and this challenge is written that way**: every blocker is stated against the *published
surface*, with the current-exercise bound named explicitly where it differs (C-B3, C-B5, C-B6, C-B7,
C-B8).

**C-i2 — one corpus-provenance correction, in the module's favour.**
`parsethat-surface-gaps.mjs:4` claims *"Run from this workspace (it resolves the workspace's
node_modules)"*. It does not: the workspace `node_modules/@mkbabb/` has no `parse-that` at all, so
resolution lands on `docs/tranches/V/megatranche/prototypes/css-parser/node_modules/@mkbabb/parse-that`
— a prototype-local install, version **1.0.0**. **However**, `shasum` over that install's
`dist/{core.js, index.d.ts, leaf.d.ts, parse.js}` is **4/4 identical** to the read-only evidence
root's build (re-verified this session). Under OP-7's substrate-receipt clause the RED-7 numbers are
therefore **valid and comparable** to everything measured here. **The comment is wrong; the evidence
is sound.** Recorded so a later reader does not void the corpus on a false alarm.

---

## 6. SUPERLATIVES (7) — L-18 runs both ways

**S-1 — `dispatch`'s end-of-input handling is exactly right, and free.**
`leaf.ts:136-137`: `const ch = state.src.charCodeAt(off); const idx = ch < 128 ? tbl[ch] : -1;`.
Past the end, `charCodeAt` yields `NaN`; `NaN < 128` is `false`; the expression falls to `-1` and
takes the labelled error path (`:142-144`). No bounds check, no extra branch, no special case — **the
guard that keeps non-ASCII out of a 128-entry table *is* the EOF guard.** *Falsifier*:
`dispatch({a:p}).parseState("")` crashing or spuriously matching would kill it; measured, it takes
the error path cleanly. (Note this is the same `<128` test that produces C-M5: the mechanism is
elegant; its *silence* about dropped keys is the defect.)

**S-2 — the initialization hook is correctly sealed.** `_initWhitespace` is exported from
`leaf.ts:396` and re-exported by **neither** barrel — `index.ts:9` and `core.ts:19-26` both enumerate
exactly `eof, any, dispatch, all, string, regex, trimStateWhitespace, whitespace`. The `exports` map
(`package.json:7-33`) declares five specifiers and **no wildcard**. *Measured*: deep-importing
`@mkbabb/parse-that/dist/leaf.js` fails with **`ERR_PACKAGE_PATH_NOT_EXPORTED`**. *Falsifier*: a
`"./*"` entry, or `_initWhitespace` in either barrel, would kill it. Neither exists. **This is the
correct pattern for a module-init hook, and the rest of the surface should be held to it.**

**S-3 — the PT-Q5 retract note is a model of honest self-audit.** `leaf.ts:90-98` names its own
speculative seam, states it had *zero* production consumers, cites the consumer's actual call sites
("value.js's only `dispatch()` calls pass NO subTable"), states the removal is contract-safe
*because* nobody passed the argument, and pre-declares the condition under which it may return ("if
value.js's coordinated Q session measures an on-path win … not before"). This is precisely the
discipline W2 §3c demands of a candidate — predicted failure modes and falsifiers written *before*
measurement (`W2.md:164`). **The content is exemplary; only its location is wrong (C-M8).**

**S-4 — the `export let` does not leak write access through any published specifier — with the
mechanism stated correctly.** `whitespace` is a mutable binding (`leaf.ts:395`), so a consumer
poisoning it would poison every `.trim()` in the realm (`parser.ts:480-482` reads the live binding as
its default argument) — an O-8 anti-latch hazard. It is closed, but **not uniformly by throwing**:

| module mode | assignment result |
|---|---|
| ESM namespace (`import * as ns` from `dist/core.js`) | **TypeError** — *"Cannot assign to property 'whitespace' of [object Module]"* |
| CJS under `"use strict"` (`dist/core.cjs`) | **TypeError** — *"Cannot set property whitespace of #\<Object\> which has only a getter"* |
| CJS sloppy mode (`dist/core.cjs`) | **no throw — silently discarded** |

In all three the write **does not land**: the descriptor is `{get: true, set: false, configurable:
false}` and the post-tamper parse still works (`string("a").trim().parse("  a  ")` → `"a"`). *Stated
honestly*: this is closed by the **bundler's getter-only interop**, not by construction (hence C-M9),
and the sloppy-CJS row means a consumer's tamper attempt is *silently swallowed* rather than
diagnosed. *Falsifier*: a writable data property, or a successful reassignment in any mode, kills it.

**S-5 — the PT-B3 fusion docblocks make checkable claims, and the claims check out.**
`leaf.ts:166-177` claims the fused `all()` builds *exactly one* flat array (vs N−1 nested 2-tuples
for `a.then(b).then(c)`), uses no `for…of` iterator object, and preserves "the EXACT drop-`undefined`
+ backtracking/offset-restore semantics of the original". Reading `fuseAll` (`:179-273`) against
`then` (`parser.ts:81-103`) confirms every clause: one `out` array per call, indexed writes, indexed
`for`, `savedOffset` restore on every error arm, identical `state.value !== undefined` filter; the
arity-2/arity-3 unrolls are faithful to the general arm. **Crucially: the drop-`undefined` defect
(C-B2) is *inherited*, not introduced** — the fusion preserved a pre-existing semantic exactly, which
is what a semantics-preserving optimization is supposed to do. *Falsifier*: any divergence between
the unrolled arms and the general arm would kill it; there is none.

**S-6 — `regex`'s default path is the right shape for the sole consumer's hot leg.**
`leaf.ts:344-353` uses `sticky.test()` + `String.prototype.substring()` rather than `exec()`,
avoiding a `RegExpMatchArray` allocation per call, and inlines the offset write instead of routing
through `state.ok`'s `+=`. **18 of value.js's 19 `regex()` sites use this path**; the one exception
(`164343c1^:src/parsing/color/color.ts:129`) genuinely needs a capture group. The optimization is
aimed at the leg the consumer actually runs. *Falsifier*: if most consumer sites passed
`matchFunction`, the fast path would be optimizing the cold leg; measured, 18 of 19 do not.

**S-7 — every label in the library is a construction-time constant, so the diagnostic *data* is
already pure and already free (NEW — seat 3).** leaf builds each terminal's expectation **once, when
the combinator is constructed**, and closes over it: `` label = `"${str}"` `` (`leaf.ts:278`),
`` label = `/${r.source}/${r.flags}` `` (`:324`), `` label = `one of [${labelChars}]` `` (`:127-132`,
explicitly commented *"Pre-compute label at construction time"*). Zero string allocation on the error
path; the failure site passes a constant. This matters beyond micro-cost: W2 **R-LAW-3** requires that
*"a diagnostic is a value appended to `D`, never an effect"* (`W2.md:281`), and R-LAW-3's probe
monkey-patches `console.error` to throw. leaf's label **production** already satisfies that law
completely — it allocates nothing, prints nothing, and touches no global. The entire PT-01 / EQ-4
problem (C-M1, C-M2) is in the **delivery** — `utils.ts:33`'s `diagnosticsEnabled && label` gate and
`parser.ts:67-68`'s coupled `console.error` — and **none of it is in this module's construction
discipline**, which needs no change to satisfy the algebra. *Falsifier*: a label built inside a parse
function, or any per-failure string concatenation, would kill this; there is none — all three label
expressions are evaluated in the factory body, above the returned closure.

---

## 7. What the X·P dual-target algebra would KEEP / WRAP / RETIRE

Assessed against `docs/tranches/X/parse-that/waves/W2.md` §3b (COMP-1 `:241`, O-8 `:253`, EQ-1..EQ-6
`:259-268`, R-LAW-1..5 `:275-287`) and §3c (AC-1 TAGLESS-TWIN `:313` · AC-2 CLOSED-IR `:326` ·
AC-3 SPAN-ALGEBRA `:346` · AC-4 SIBLINGS-ORACLE `:370`). AC-3 binds any scan layer to stay **inside**
the combinator library ("*the scanner is a combinator-library citizen*", `W2.md:350-351`), so leaf is
the natural home of the terminal tier — which makes these dispositions load-bearing, not advisory.

| export | disposition | reasoning, bound to a W2 clause |
|---|---|---|
| `dispatch` | **KEEP, wrapped — and the wrapper must bracket the *call*, not only the table** | Its `Int8Array` LUT is the correct lowering shape and has a zero-import Wasm analogue (a 128-byte class table in linear memory) — it is literally AC-3's *"typed-array class table … the identical table under `v128`"* (`W2.md:346-348`) and it is AC-4's *"same machine-readable channel table"* carrier (`:372`). **But it cannot be adopted raw**: the wrapper must (i) reject or escape 3-char `-`-middle keys (C-B6), (ii) build from an ordered `Array<[key, parser]>` or `Map`, never a plain object (C-B7), (iii) reject non-ASCII keys loudly (C-M5), (iv) bound the intern index (C-m3), (v) be typed heterogeneously (C-M4) so **V** stays assignable to the frozen `/css` types under G-10 (`:236`), **and (vi) capture/restore `offset` around the dispatched arm (C-M10) — the one requirement no table-side wrapper can satisfy**, since the leak is in `leaf.ts:139-141`. |
| `string` | **KEEP as-is** | Total on string input, allocation-free on the 1-char path (`leaf.ts:282-294`), label-bearing, no state beyond `offset`. Satisfies **O-8** by construction. Sole mark: `string("")` (C-m5), which the algebra should express as an explicit `succeed` operator rather than a degenerate `string` — cand-O already built `succeed` from `string("")`, and *that* is the row to make normative. |
| `all` | **WRAP — never expose raw** | The tuple-shape lie (C-B1) and drop-`undefined` compaction (C-B2) are fatal to **EQ-3** (provenance `P` is an ordered `(start,end)` array and *"leaf construction order must match"*, `:265` — an arm that vanishes from the value array desynchronizes the index) and to **EQ-1** (structural deep-equal on a value whose arity varies by input, `:263`). The algebra's `sequence` must preserve arity and represent absence **explicitly**. |
| `any` | **WRAP — never expose raw** | The arity-1 backtracking divergence (C-M3) breaks **EQ-5** (*"offset … restored to pre-mark values"*, `:267`); the dead terminal merge (C-M2) leaves no slot for the labelled zero-width failure that debt 1 (`parser-band.md:116`) and **EQ-4** (`:266`) require. Separately, §3b needs *ordered **committed** choice*, which leaf's unconditional-backtracking `any` does not provide at all — a `commit` point must be **added**, not wrapped around. |
| `regex` | **RETIRE from the terminal tier** | Four independent reasons, each sufficient. (1) **C-B5** — non-total at EOF, so **COMP-1** (`:241`, *every* input) cannot hold with `regex` as a terminal. (2) **C-B3/C-B4** — the `matchFunction` arm corrupts the cursor (measured double-consumption; re-entrancy desync): EQ-5 and EQ-3 damage. (3) **C-B8** — it silently `ToString`-coerces non-strings, defeating the boundary guard of debt 4. (4) It has **no zero-import Wasm lowering**: a JS `RegExp` is a host object — under AC-1 it is the *"signature leak"* failure (`:317`), under AC-2 the *"escape-hatch node … one node kind with exactly one lowering kills dual-target by construction"* (`:335-337`). GATE-VERDICT's *"LIVE regex measured FASTEST ≈1.8×"* is a **speed** observation about the deposed baseline, now reversed *"three times by two authors and an arbiter with three methods"* (`parser-band.md:143`) — it is not an argument for keeping a host-object terminal. Replacement: AC-3's branchless char-class scan over a class table, which lowers to `v128` or a scalar loop identically. |
| `whitespace` | **RETIRE** | It **is** `regex(/\s*/)` and inherits C-B5 whole: the parser named "zero or more" **rejects zero at end of input** (measured: `isError=true`, `furthest=-1`). It also silently **succeeds on a non-string** (C-B8). Under §3b, inter-token whitespace is not a value at all — it is **C**, the byte complement `(offset, length, kind)` (`:264`). A whitespace *Parser* whose value is sometimes `""`, sometimes `undefined` (C-m2), and which sometimes fails, cannot carry a conservation law. **CORRECTED by C-B9 (seat 3)**: an earlier revision of this row proposed `utils.ts:159-164` `skipWhitespace` as *"the replacement [that] already exists in the tree"*. It is **not** a drop-in — it is a **third, differently-wrong character class** (`charCodeAt <= 32`, eating NUL and every C0 control, which css-syntax-3 §4.2 treats as U+FFFD-producing input, not whitespace), it disagrees with both leaf mechanisms on six measured code points, and it has **no complement channel** either. The disposition is a **new** span-emitting `trivia` operator: CSS's class `{09,0A,0C,0D,20}` fixed by citation, emitting `(offset, length, kind)` into **C**. All three existing mechanisms retire together. |
| `trimStateWhitespace` | **RETIRE from the public surface; and its internal use is *also* a defect** | Zero external consumers (C-M6), not a `Parser`, and its in-place `ParserState` mutation is the wrong shape for an algebra whose recovery ops need `mark`/`rollback` (**R-LAW-1**, `:275`). An earlier revision called it *"exactly right where `parser.ts:443-465` uses it"*; **C-B9 narrows that**: those internal uses are precisely the mechanism by which `.trim(whitespace)` silently substitutes a `{09..0D,20}` scanner for the `/\s*/` parser the caller passed, at 41 consumer sites. Right as an *internal scanner*, wrong as the *unannounced implementation of a parameterized combinator*. |
| `eof` | **RETIRE — replace with a total-consumption law** | **0 real call sites** even at peak; reached only via `Parser.prototype.eof()`. Its `undefined` success value is *invisible* to `all()` (C-B2, measured: `all(string("a"), eof())` → `["a"]`), so it cannot participate in a value algebra. "Input fully consumed" is a **judgment on the final state** — trivially expressible as `C` covering the tail under COMP-1 — not an operator. Its phantom `<T>` (C-m1) is a symptom of the same category error. |
| `_initWhitespace` | **RETIRE with `whitespace`** | Exists only to break the `leaf ↔ parser` module cycle (`leaf.ts:393-394`). Once whitespace is complement rather than value, the cycle and the hook both disappear. Its **sealing pattern** (S-2) should survive as the house rule for any future init hook. |

**Net**: of nine exports the algebra **keeps two** (`string`; `dispatch` only behind a corrective
wrapper), **wraps two** (`all`, `any` — as *distinct* operators, since ordered-committed choice is
not leaf's unconditional-backtracking `any`), and **retires five**. The retirements are not
stylistic: `regex` and `whitespace` fail **COMP-1** by measurement (C-B5, C-B9), `all`/`any` fail
**EQ-3** and **EQ-5** by measurement (C-B1/C-B2/C-M3), and none of the five has a zero-import Wasm
lowering. **Nothing in the whitespace family survives** — all three mechanisms (`whitespace`,
`trimStateWhitespace`, `skipWhitespace`) advance a cursor and record nothing, and no two of them agree
on what whitespace is (C-B9).

**A consequence W2 should hear**: `dispatch` is the **only** leaf export that both survives on its
merits *and* has no equivalent in the frozen 52-export surface — it is the one thing value.js gained
from parse-that that it could not have hand-rolled cheaply
(`164343c1^:src/parsing/index.ts:389-397` documents the megamorphic-`any` problem it solved:
*"≈30 function names arrive at one `any()` site"*). If the dual-target algebra keeps exactly one
artifact from this module, it is the 128-entry char-class LUT — **and it must be re-authored, not
imported**. *An earlier revision closed this paragraph with "four of its seven defects … live in its
**table-construction API**, not in its dispatch loop." Seat 3 refutes that*: with **C-M10** the count
is five of eight, and the eighth — the missing cursor restore at `leaf.ts:139-141` — is **in the
dispatch loop**, which is why the re-authoring cannot be a table-side adapter over the shipped
function. The LUT layout is the keeper; the function around it is not.

---

## 8. Corpus reconciliation

| corpus id | relation to this challenge |
|---|---|
| O-15 **PT-01** (label a no-op unless armed) | **Confirmed and sharpened** → C-M1: the `./core` tier *cannot arm at all*, so leaf's labels (`leaf.ts:132, 278, 324`) are unobservable there by construction; and C-M2: `any` has no label slot to arm. |
| O-15 **PT-03** (`PACKRAT_ARMED` one-way latch) | **Not in leaf's scope.** leaf holds **no** process-global mutable state; every export is a pure closure factory. Recorded as a leaf-favourable observation supporting S-4 and W2's **O-8**. Not armed by any probe here. |
| O-15 **PT-04** (`Parser.lazy` depth 7,761) | Not in leaf's scope (`lazy.ts` / `parser.ts:702`). No claim made. |
| O-15 **PT-07** — *`.parse()` returns `undefined` on failure* | **Contradicted, in the worse direction** → C-M7. The failure return can be a *partial value of a different shape*: `all(a,b,c).parse("abX")` → `"b"`. A boundary invariant testing only for `undefined` — O-15's own proposed cure — **passes** this input. |
| O-15 **PT-07** — *5/5 non-string inputs throw a raw `TypeError`* | **Contradicted, in the worse direction** → C-B8. True for `string()`; **false for `whitespace`**, which returns `isError:false` on `42` and `{}`. The measurement is right; the generalization to the module is not. |
| RED-7 `DEBT-1 cand-F reject() label, diagnostics OFF → undefined` | Mechanism located: `utils.ts:33` drops the label, `core.ts:19-26` withholds the switch → C-M1. |
| RED-7 `DEBT-1 Parser.prototype.label / .expected — absent` | Root cause located **in leaf**: `any`'s only merge call is provably dead (`leaf.ts:54, 69`) → C-M2. |
| RED-7 `GUARD .parse() failure signal` | Extended → C-M7. |
| RED-7 `GUARD parseState(non-string) totality` | **Extended and partly contradicted** → C-B8 (three postures; `whitespace` succeeds silently). |
| RED-7 `DEBT-3` (lazy depth), `LATCH` rows | Outside leaf. No claim. |
| `parser-band.md:116` debt 1 (labelled failures) | leaf can *produce* labels but the tier that ships leaf cannot *observe* them (C-M1). |
| `parser-band.md:118` debt 3 (recursion bounded by construction) | leaf is **recursion-free** — a genuine strength, and the reason a leaf-only tier is the right place to start the dual-target lowering. |
| `parser-band.md:119` debt 4 (JS-boundary non-string guard) | **The debt is correct and this challenge strengthens its specification**: the guard must be a positional `typeof` check at entry, because leaf's own postures are non-uniform (C-B8). |
| W2 §3b **COMP-1** (`:241`) | `regex`/`whitespace` fail it by measurement (C-B5). |
| W2 §3b **O-8** (`:253`) | leaf **passes**: no operator reads or writes process-global mutable state. (S-4 caveat: `whitespace` is a `let`, closed by interop rather than construction → C-M9.) |
| W2 §3b **EQ-3 / EQ-4 / EQ-5** | `all`'s compaction (C-B2) breaks EQ-3; `any`'s arity-1 divergence (C-M3) breaks EQ-5; the armed-only labels (C-M1) are exactly EQ-4's named disqualifier (`:266`). |
| W2 §3c **AC-3** (`:346-351`) | Endorsed as the *direction* — a scan layer inside the combinator library is right. **But its in-tree seed is not free**: C-B9 shows `utils.ts:159-164` `skipWhitespace` is a third divergent class, so AC-3's scanner must author its class table from the css-syntax-3 citation, not harvest one of leaf's three. |
| W2 §3b **COMP-1** — second, independent failure | C-B9: none of the three whitespace mechanisms has a channel into **C**. This is separate from C-B5 (which is about *totality at EOF*); C-B9 is about *conservation* and would hold even if `regex` were made total. |
| W2 §3b — *channel-table dispatch* vs *ordered committed choice* as **two** families (`:249-251`) | C-M10: leaf ships one operator that is documented as the second and implemented as the first, so neither family has a stateable EQ-5. |
| W2 **R-LAW-3** (`:281`, diagnostics as values, probe throws on `console.*`) | **leaf passes on production, fails on delivery** — S-7 (labels are construction-time constants; no allocation, no print, no global) against C-M1/C-M2/C-M11 (the switch is withheld, the merge is dead, and the tier is paid for anyway). |
| `core.ts:3-5` tier-isolation claim | **Contradicted by measurement** → C-M11: `dist/core.js` reaches the packrat chunk and the diagnostics chunk in two hops. |
| `test/subpath-gate.mjs` (`proof:subpath`) | **Vacuous for its stated purpose** → C-M11. With C-M6's reading of `proof-no-dead-combinator.mjs`, two of five `proof:*` gates prove a past deletion rather than enforce a standing property. |
| W1 §OP-2 (harness liveness) | Not exercised; no harness was run or edited. |
| W2 **OP-6** (Wasm substrate uncommitted) | Untouched; no Wasm claim made. The §7 lowering notes are about *shape*, not about importing uncommitted bytes (K-10 respected). |

---

## 9. Tally

| severity | count | ids |
|---|---|---|
| BLOCKER | **9** | C-B1 · C-B2 · C-B3 · C-B4 · C-B5 · C-B6 · C-B7 · C-B8 · **C-B9** |
| MAJOR | **11** | C-M1 … C-M9 · **C-M10** · **C-M11** |
| MINOR | **7** | C-m1 … C-m7 |
| INFO | **2** | C-i1 · C-i2 |
| **defects total** | **29** | |
| SUPERLATIVE | **7** | S-1 … S-6 · **S-7** |

Every BLOCKER and every MAJOR except **C-M9** was **reproduced against `dist/`**; C-M9 is stated as a
declared-contract defect with its non-reproduction named. C-B3, C-B5, C-B6, C-B7 and C-B8 carry an
explicit **current-exercise bound**, because the sole downstream either dodges them by idiom or no
longer consumes the module at all (C-i1). **C-B9 carries none** — it is live at 41 of the sole
consumer's own `.trim(whitespace)` sites (§1a) and is the only blocker whose harm needed no exotic
input, merely a non-ASCII space. **C-M11 carries none** either: it is true of every `./core` import
that exists.

---

## 10. Corrections to the prior draft at this path (re-derivation record)

The draft present at dispatch time was re-derived row by row. **17 of its 22 defect rows and 5 of its
6 superlatives reproduced exactly.** The following did not, and are corrected above:

| # | prior draft | measured this session | disposition |
|---|---|---|---|
| 1 | C-m3: *"≥256 dispatch to the wrong parser … **257 distinct parsers → returns `P0`** instead of `P256`"* | **256 → `P0`; 257 → `P1`; 300 → `P44`.** The off-by-one came from a probe whose filler parsers could not match the input, so a mis-dispatch was masked as an error. The direction was right; the boundary was not. | **corrected** in C-m3, with the boundary table (0–127 correct / 128–255 fail-closed / ≥256 fail-open) and the probe-design note |
| 2 | S-4: *"assignment **throws `TypeError`**"* (flat claim) | Throws under **ESM** and **strict CJS**; **silently discarded** under **sloppy CJS**. The *conclusion* (no write lands) holds in all three. | **corrected** in S-4 with a three-row mode table; the sloppy-mode silent-swallow is now stated as the residual ergonomic mark |
| 3 | census: `all` = **62** | **61** occurrences / 60 lines (9+13+9+12+4+5+7+1) | **corrected** in §1a |
| 4 | census: `whitespace` = 39 `.trim` · 10 `.skip` · 8 `.next` | **41** `.trim` · **10** `.skip` · **7** `.next` | **corrected** in §1a and C-B5 |
| 5 | — (absent) | `whitespace.parseState(42)` → **`isError:false`**, while `string("a").parseState(42)` throws: **three postures toward one bad-input class**, falsifying the generalization behind O-15 PT-07 / RED-7's GUARD row and under-specifying `parser-band.md:119` debt 4 | **added** as **C-B8**; C-B3 also gained its measured double-consumption receipt |

A methodological note worth carrying: the prior draft's census was *correct* and my first re-count
appeared to contradict it (`any` 183, `string` 443) — because **`\w` is not POSIX ERE and `git grep
-E` does not honour it**, so the class silently matched the TypeScript `any`/`string` *type* keywords.
The correct spelling is `[^.[:alnum:]_]`. Recorded so the next seat does not "correct" a right number
into a wrong one.

---

## 11. Seat-3 re-derivation record

Seat 3 opened blind on `leaf.ts` + its full import closure (`parser.ts` · `state.ts` · `utils.ts` ·
`lazy.ts` · the five entry modules) and the shipped `dist/`, then diffed its independent findings
against the resident file. **Nothing was overwritten.** Substrate identical to §0: master `ef10d5b`,
`typescript/` clean, `parse-that-css-totality-p2` re-verified **absent**, nothing armed (no
`memoize`/`resetPackrat`/`enableDiagnostics` call in any probe), all probes via `node --input-type=module`
with no file written outside this one.

### 11a. Reproduction of seat 2's load-bearing novel claims

| claim | seat-3 measurement | verdict |
|---|---|---|
| **C-B3** double-consumption — `all(string("aaa"), fb, string("aaa")).parseState("aaay")` | `value=["aaa","FB","aaa"]`, `offset=3`, `isError=false` | **reproduced exactly** |
| **C-B5** `whitespace.parseState("")` | `isError=true`, `furthest=-1` | **reproduced exactly** |
| **C-B5** `string("a").skip(whitespace).parseState("a")` | `isError=true` | **reproduced exactly** |
| **C-B6** `dispatch({"+-.": p}).parseState(",")` | ACCEPTED (and `"*"` errors) | **reproduced exactly** |
| **C-B7** integer-key hoisting | `Object.keys({"0-9":1,"0":1})` → `["0","0-9"]`; digits → `RANGE` in **both** insertion orders; letters `{"a-c":R,"a":S}` → `SPECIAL`, `{"a":S,"a-c":R}` → `RANGE` | **reproduced exactly**, plus one row seat 2 did not print: for **letters** the *last* key wins (so value.js's empirical "register ranges first, then override" note holds), while for **digits** the range wins in **either** order. The inversion is total, not order-dependent. |
| **C-B8** `whitespace.parseState(42)` | `isError=false` | **reproduced exactly** |
| **C-M7** `all(a,b,c).parse("abX")` | `"b"` with `parseState(...).isError === true` | **reproduced exactly** |

Seat 3 also independently re-derived, and confirms without amendment: C-B1 (`all(string("ab")).parse("ab")`
→ `"ab"`), C-B2 (`all(opt(a), b).parse("b")` → `["b"]`; and the same at arity 3 and 4), C-B4 (re-entrant
`matchFunction`: outer offset **6** on a 3-char source vs control **3**), C-M3 (`any(p)` → offset 1,
`any(p,q)` → 0), C-M5 (`dispatch({"é": …})` → `isError=true`), C-m1, C-m2 (`regex(/a?/).parse("z")` →
`undefined`, `typeof "undefined"`), C-M6, C-i1, and S-2 (`_initWhitespace` absent from both `dist/parse.js`
and `dist/core.js` export lists).

### 11b. What seat 3 adds — and what it corrects

| # | addition | what it changes in the resident file |
|---|---|---|
| 1 | **C-B9** (BLOCKER) — three mutually inconsistent whitespace classes, none CSS's; `.trim()` silently substitutes `trimStateWhitespace` for the `whitespace` parser passed to it. Measured on six code points: `skipWhitespace` / `trimStateWhitespace` / `/\s*/` disagree pairwise; `string("a").trim()` **rejects** NBSP-padded input that `wrap(regex(/\s*/), regex(/\s*/))` **accepts**; VT (U+000B) is accepted though css-syntax-3 §4.2 excludes it. | **Corrects §7's `whitespace` row**, which proposed `skipWhitespace` as the in-tree replacement — it is a third divergent class with no complement channel. Also **narrows §7's `trimStateWhitespace` row** ("exactly right where `parser.ts:443-465` uses it"): that internal use *is* the substitution mechanism, live at 41 consumer sites. Gives COMP-1 a second, independent failure (conservation, not just totality). |
| 2 | **C-M10** (MAJOR) — `dispatch()`'s hit path (`leaf.ts:139-141`) never captures or restores `offset`; measured `dispatch({a: leaky})` → offset 1 vs `any(leaky, zzz)` → 0. | **Refutes §7's closing sentence** ("four of its seven defects live in its table-construction API, not in its dispatch loop"). Five of eight now, and the eighth is in the loop — so the corrective wrapper must bracket the *call*, which a table-side adapter cannot do. §7's `dispatch` row gains requirement (vi). |
| 3 | **C-M11** (MAJOR) — `dist/core.js:1 → packrat-entry-CS1td-8B.js (40 K, PACKRAT_ARMED at :678) → diagnostics-DDazRHgl.js`. `./core`'s promise never to pull the diagnostics accumulator or the packrat tier is false in the shipped build; `test/subpath-gate.mjs` checks file existence and `typeof`, never edges. | **Sharpens C-M1** in the worse direction: the `./core` consumer already *pays* for the accumulator and the packrat tier and is denied only the switch — which moots C-M1's stated workaround. Pairs with C-M6 as a second `proof:*` gate that certifies a past deletion rather than enforcing a standing property. |
| 4 | **S-7** (SUPERLATIVE) — every label in the library is a construction-time constant (`leaf.ts:127-132, 278, 324`); zero error-path allocation, no print, no global. | Adds the missing L-18 counterweight to C-M1/C-M2: leaf's diagnostic **production** already satisfies W2 R-LAW-3 in full. The whole PT-01/EQ-4 problem is delivery-side, and this module's construction discipline needs no change to satisfy the algebra. |

### 11c. Two probe-design notes, carried forward

1. **A dispatch probe whose arms cannot match the input masks a mis-dispatch as an ordinary parse
   error.** Seat 2 already recorded this for C-m3's boundary; seat 3 hit it again on C-B7 (arms built
   from `string("x")` against input `"0"` returned `undefined` for *all* orders, hiding the inversion).
   Dispatch arms must be `regex(/./).map(tag)` — total on any first character — so the *identity* of the
   dispatched arm is observable.
2. **The whitespace divergence is invisible to any ASCII-only corpus.** All three mechanisms agree on
   space, tab, LF, CR and FF. The disagreement lives entirely at NUL/C0 (`skipWhitespace` only) and at
   NBSP/BOM/U+2028 (`/\s*/` only). A totality corpus drawn from the 52-export surface's own fixtures
   would never separate them — which is why C-B9 needed a code-point sweep rather than a grammar probe,
   and why W1's oracle should carry one.
