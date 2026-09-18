claude-opus-5[1m]

# CHALLENGE — parse-that `core` · axis C (CONSUMPTION)

**Subject**: `/Users/mkbabb/Programming/parse-that/typescript/src/parse/core.ts` (26 lines, 18 runtime
+ 4 type exports) — the `"@mkbabb/parse-that/core"` subpath entry (`package.json:11-15`,
`vite.config.ts:16`).

**Posture**: the module is assumed DEFECTIVE until the tree proves otherwise. Every claim below
carries severity + `file:line` provenance + its own falsifier, and **L-18 runs both ways** — §4
records five superlatives and §2 C-17′ records one of my own hypotheses **refuted by its falsifier**
and withdrawn.

**Read whole** (read-only, main checkout only; no worktree, no frozen root, no `~/Documents/Codex`
entered): `core.ts` and every file it imports — `parser.ts` (711), `state.ts` (189), `lazy.ts` (43),
`leaf.ts` (399), `split.ts` (58) — plus the transitive consumption graph `utils.ts` (186),
`packrat.ts` (§enter/exit/arm), the four sibling subpath entries, `package.json`, `vite.config.ts`,
`tsconfig.json`, the five gate scripts, and the emitted `dist/**`.

**STOP-finding check**: `/Users/mkbabb/Programming/parse-that-css-totality-p2` does **not** exist
(`ls` → `No such file or directory`, this session) and was not created. No STOP.

**Instrumentation law honoured**: no browser tooling; no bench; `memoize()` / `mergeMemos()` /
`enableDiagnostics()` were **never called** in any probe — `PACKRAT_ARMED`
(`dist/packrat-entry-CS1td-8B.js:678`) and `diagnosticsEnabled`
(`dist/diagnostics-DDazRHgl.js`) remain false in every process I opened. Every measurement below is
a single `parseState()` / arity read / module-graph read against the **built dist**, the repo's own
observable-truth standard (`scripts/proof-no-css-surface.mjs:6-14`).

---

## 1. What `/core` claims, and what a consumer actually gets

`core.ts:1-6` is the contract. Verbatim:

> *"The zero-side-effect primitive set: the Parser core, state, leaf parsers, lazy, and the
> balanced-split helpers. **A consumer that imports only this never pulls the diagnostics
> accumulator, the packrat tier, or the json/csv domain parsers.**"*

Three denials. **Two of the three are false**, and the third — the only true one — is worth
1.2 KB. The emitted graph:

```
dist/core.js  (1,336 B)
  └─ import { P,a,b,c,d,e,f,g,h,l,j,r,s,n,t,w }
       from "./packrat-entry-CS1td-8B.js"          (40,576 B)   ← dist/core.js:1
            └─ import { isDiagnosticsEnabled, mergeErrorState,
                        reportUnclosedDelimiter, addSuggestion,
                        collectDiagnostic, popLastDiagnostic }
                 from "./diagnostics-DDazRHgl.js"  ( 3,516 B)   ← packrat chunk :1
```

The chunk a `/core` consumer loads is *named after the packrat entry*, contains `PACKRAT_ARMED`
(`:678`), `packratEnter` (`:681`), the MEMO key machinery (`:661-675`), the ANSI/debug printer
(`parserDebug`, `:262`) and the PT-01 `console.error` (`:882`) — and it imports the diagnostics
accumulator wholesale. `/core` is 16 of its 18 runtime names *re-exported from the packrat chunk*;
only `containsDelimiter` / `splitBalanced` are local (`dist/core.js:2-37`).

**Byte accounting** (unminified — `vite.config.ts:8` sets `minify: false`; this is the graph, not a
gzip claim):

| entry | closure | bytes |
|---|---|---|
| `.` (root barrel) | `parse.js` + packrat chunk + diagnostics chunk + `core.js` + `utils.js` | **48,576** |
| `./core` | `core.js` + packrat chunk + diagnostics chunk | **45,428** |
| **delta** | the json/csv/string-utility tier only | **3,148 B = 6.5 %** |

`/core` is **93.5 %** of the root barrel. The entire A.W3 subpath split buys the "primitive-set"
consumer 6.5 % — and the two things the docblock promises it excludes are 93 % of what it ships.

---

## 2. Defect ledger

Nineteen findings. Severity · provenance · falsifier on every row. `→` marks the empirical receipt.

---

### C-1 — BLOCKER — the `/core` isolation contract is false at the dist level

**Provenance**: claim at `core.ts:3-5`; refutation at `dist/core.js:1` (imports the 40,576-byte
packrat chunk) and `dist/packrat-entry-CS1td-8B.js:1` (that chunk imports the whole diagnostics
accumulator). `PACKRAT_ARMED` at `:678`; `packratEnter` at `:681`; the PT-01 `console.error` at
`:882`.

The coupling is not merely a bundling accident — it is *executed*. `Parser.parseState`
(`parser.ts:34-49`) opens a packrat epoch (`packratEnter()`, `:43`) and closes it in a `finally`
(`:47`) on **every top-level parse**, and `parseStateInner` reads `isDiagnosticsEnabled()`
(`parser.ts:67`) and calls `console.error` (`:68`) on every failure. `Parser` is `core.ts:7`. So the
"zero-side-effect primitive set" is the tier that owns both O-15 defects: **PT-03**'s one-way latch
read and **PT-01**'s diagnostics/`console.error` coupling ride the *primitive* entry, not the
opt-in tiers named after them.

**Why this is BLOCKER on the consumption axis**: the docblock is the only guidance a consumer has
for choosing between `.` and `./core`, and the choice it describes does not exist. A team that
picks `/core` "to stay off the packrat tier" ships the packrat tier.

**Falsifier** (stated, and it fails): *if* Rollup emitted a `/core`-exclusive chunk without
packrat/diagnostics, the claim would hold. It does not — `dist/core.js:1` is a single import from
the packrat chunk, and there is no third chunk. Re-checkable in one command:
`grep -n '^import' dist/core.js dist/packrat-entry-CS1td-8B.js`.

**Contradicts nothing in the corpus; sharpens O-15.** O-15 cites `dist/packrat-entry-*.js:881` and
`dist/diagnostics-DDazRHgl.js:14` for PT-01. This challenge adds the *reachability* fact O-15 does
not state: those two lines are reachable from the `/core` subpath, i.e. from the tier documented as
excluding them.

---

### C-2 — BLOCKER — the `/core`-exported `whitespace` parser **rejects at end of input**

`whitespace` (`core.ts:24`) is `regex(/\s*/)` (`leaf.ts:397`). `/\s*/` matches the empty string at
every position, including EOF. The shipped parser does not:

```
→ whitespace.parseState("")                              isError  true    value undefined
→ whitespace.parseState("  ")                            isError  false   value "  "
→ whitespace.parseState("a")                             isError  false   value undefined
```

**Root cause**: `leaf.ts:326-330` — `regex()`'s parser function short-circuits
`if (state.offset >= state.src.length) { state.isError = true; return state; }` **before the regex
is ever tried**. A zero-width-matching pattern therefore cannot succeed at EOF.

**Blast radius, measured on `/core` exports only**:

```
→ all(string("a"), whitespace).parseState("a")           isError  true    ← valid input REJECTED
→ string("a").wrap(whitespace, whitespace).parseState("a")  isError true  ← valid input REJECTED
→ string("a").trim(whitespace, false).parseState("a")    isError  true    ← valid input REJECTED
→ string("a").trim().parseState("a")                     isError  false   ← survives (flag path)
```

The default `p.trim()` survives only because `Parser.trim` (`parser.ts:488`) sniffs
`parser.context?.name === "whitespace"` and diverts to the charCode loop `trimStateWhitespace`
(`leaf.ts:372-391`) instead of running the `whitespace` Parser at all. That is: the library's own
hot path routes *around* its own exported combinator. Every consumer that uses `whitespace`
compositionally — the documented way — hits the defect; the trailing-optional-whitespace idiom
(`all(value, whitespace)`) rejects any input that ends exactly at the value.

**Why BLOCKER**: a shipped `/core` export silently rejects valid input, and the failure is
positionally invisible (see C-3, which is the same root cause).

**Falsifier**: *if* `whitespace` were documented as "one-or-more" or as offset-interior-only, the
behaviour would be a naming defect, not a correctness one. It is not — it is literally `regex(/\s*/)`
(`leaf.ts:397`) and it *does* return success-with-`undefined` at a non-whitespace interior offset
(third probe above), proving the intended semantics are "match zero or more, always succeed".

---

### C-3 — MAJOR — `regex()`'s EOF path skips `mergeErrorState`, so the reported error position is wrong

Same site, second consequence. `leaf.ts:327-330` returns error **without** calling
`mergeErrorState`, so neither `state.furthest` nor `state.expected` is updated. `string()`
(`leaf.ts:291`, `:303`) always calls it. Two `/core` leaves, two incompatible failure protocols.

```
→ regex(/[0-9]+/).parseState("")                    isError true  furthest -1  expected undefined
→ string("x").parseState("")                        isError true  furthest  0

→ all(string("abc"), regex(/[0-9]+/)).parseState("abc")
     furthest -1  →  parseStateInner (parser.ts:60) reports error at offset 0
     true failure site is offset 3
→ all(string("abc"), string("9")).parseState("abc")
     furthest  3  →  reports 3                                     (control, correct)
```

`parser.ts:60` — `const furthest = state.furthest >= 0 ? state.furthest : state.offset;` — falls
back to `state.offset`, which `fuseAll` (`leaf.ts:263-266`) has already restored to `savedOffset`.
A consumer building a CSS error message from `parseState()` points the caret at **column 0** for a
truncated input whenever the failing leaf is a `regex` at EOF — which is the single most common
authoring error in the target domain (`oklch(0.5 0.1` , `rgb(1 2` , an unterminated `var(`).

**Falsifier**: *if* `mergeErrorState` were called on that path, `furthest` would be `0` (not `-1`)
in the first probe and `3` in the third. Both measured to the contrary; the control proves the
harness is capable of the correct answer.

---

### C-4 — MAJOR — `/core` is **not closed under labelled failure**: `mergeErrorState` is off the surface

Every leaf `/core` exports produces labelled failures through `mergeErrorState`
(`leaf.ts:16, 54, 69, 142, 291, 303, 360`) — and `/core` does not export it:

```
→ Object.keys(await import("./dist/core.js")).length   18
   Parser, ParserState, all, any, containsDelimiter, createLazyCached, createParserContext,
   dispatch, eof, getLazyParser, lazy, mergeSpans, regex, spanToString, splitBalanced,
   string, trimStateWhitespace, whitespace
→ "mergeErrorState" in core        false
→ "label" in Parser.prototype      false
```

So the primitive tier can *consume* labelled failures but cannot *construct* one. The cand-F
`reject()` idiom — `new Parser(s => { mergeErrorState(s, label); s.isError = true; return s; })`,
`parsethat-surface-gaps.mjs:22`, verbatim from `cand-f/color.ts:159-164` — is **the** mechanism the
parser-band's **binding debt 1** ("Replace `never` in the keyword/colourspace `chain` arms with a
labelled zero-width failure … `expected: ["<named-color>"]` beats `(?!)`",
`registry/adjudicated/parser-band.md § WHAT CAND-O OWES CAND-F`) requires. It is unreachable from
`/core`. The probe itself is the proof: `parsethat-surface-gaps.mjs:12-13` imports every combinator
from the root barrel and must reach separately into `@mkbabb/parse-that/diagnostics` for exactly
this one function.

The irony is measurable: the diagnostics chunk is **already loaded** by `/core` (C-1). The consumer
pays 3,516 bytes for `mergeErrorState` and is denied the name.

**Falsifier**: *if* `Parser.prototype.label` (or any core-surface labelling combinator) existed, the
debt would be dischargeable without a second subpath. Measured absent.

---

### C-5 — MAJOR — on the `/core` surface, `expected` is **always** `undefined`, and the only cure buys `console.error`

`utils.ts:33` — `state.expected = diagnosticsEnabled && label ? [label] : undefined;` and `:38` —
`if (diagnosticsEnabled && label)`. Labels are gated on a module-global armed at
`utils.ts:8-10` (`enableDiagnostics`). `/core` exports neither `enableDiagnostics` nor
`disableDiagnostics` (measured, C-4 export list). Therefore **every** parse failure on the `/core`
surface carries `expected === undefined`, unconditionally, with no way to change that from `/core`.

Reach into `/diagnostics` to arm it and you take PT-01 whole: `parseStateInner`
(`parser.ts:67-69`) calls `console.error(this.state.toString())` on every failure with no separate
switch. Labels and console spew are one bit. `parsethat-surface-gaps.mjs:24-26` is the RED row
("cand-F reject() label, diagnostics OFF (shipping default)" → `expected` `undefined`).

`Parser` is a `/core` export; the coupling therefore belongs to this module's consumption contract,
not to the diagnostics tier's.

**Falsifier**: *if* `mergeErrorState`'s label seeding were unconditional (diagnostics gating only the
*rendering*), `/core` would produce labels by default. `utils.ts:33` gates the seeding itself.

---

### C-6 — MAJOR — the subpath split's payload premise is unearned for `/core`

Per §1: `/core` closure 45,428 B vs root closure 48,576 B — **93.5 %**, saving 3,148 B. The
`vite.config.ts:11-24` comment calls these "per-tier entry points"; there is no tier here, only a
1,336-byte facade over one 40 KB chunk.

**Falsifier**: *if* minification or tree-shaking recovered the difference, the premise would stand.
It cannot: the *graph* is what was measured, and `sideEffects: false` cannot drop the packrat
chunk's top-level `_initWhitespace()` call (C-13) or the `Parser` class the entry exports. The
honest bound on this claim: bytes are unminified (`vite.config.ts:8`), so the absolute numbers move
under a minifier — the 93.5 % *ratio* is a module-graph fact and does not.

---

### C-7 — MAJOR — `ParserFunction<T>`'s type parameter is phantom; `/core`'s only typed extension point is unsound

`core.ts:7` exports `type ParserFunction`. `parser.ts:14-16`:

```ts
export type ParserFunction<T = string> = (val: ParserState<any>) => ParserState<any>;
```

`T` appears **nowhere** in the body. `new Parser<CssColor>(fn)` accepts any function whose signature
is `(ParserState<any>) => ParserState<any>` — i.e. anything at all after `any` widening. The single
documented way for a consumer to author a custom leaf on the `/core` surface provides zero type
checking, while advertising a generic that reads as if it did. `Parser<T = string>`
(`parser.ts:24`) compounds it: an unannotated `new Parser(fn)` is silently `Parser<string>`.

**Falsifier**: *if* the body were `(val: ParserState<unknown>) => ParserState<T>`, the parameter
would be load-bearing. `parser.ts:14-16` is the tree.

---

### C-8 — MAJOR — `createParserContext` is exported with a **closed** name union the consumer cannot extend

`core.ts:10` exports `createParserContext`; `core.ts:14` exports `type ParserContext`. Both are
typed against `(typeof parserNames)[number]` — a frozen 29-name list of parse-that-internal
combinator names (`state.ts:141-171`, `:174`, `:180`). `parserNames` itself is exported from
**neither** `/core` (`core.d.ts`, 6 lines — verified) **nor** the root barrel (`index.ts`, 14 lines
— verified).

Consequence: `createParserContext("named-color", …)` is a type error, and there is no widening path.
The context field is not decorative — `Parser.trim` dispatches on it (`parser.ts:488`,
`parser.context?.name === "whitespace"`), so a consumer's custom combinator can never participate in
the flag-based trim fast path. The extension point is exported and closed.

**Falsifier**: *if* the union were `string` or if `parserNames` were exported for declaration
merging, consumers could name their own. `state.ts:174` pins the union; `core.d.ts` and `index.ts`
omit `parserNames`.

---

### C-9 — MAJOR — `lazy` is a **legacy** TS decorator that binds `this` to the prototype

`core.ts:15` exports `lazy`. `lazy.ts:30-43` is the TypeScript *experimental* method-decorator
signature — `(target, _propertyName, descriptor: TypedPropertyDescriptor<…>)`, arity 3 (measured:
`→ lazy.length  3`). TC39/TypeScript-5 standard decorators pass `(value, context)`. `tsconfig.json`
sets `strict: true` and **no** `experimentalDecorators` (verified by grep). A consumer on default
TS 5 settings cannot apply `@lazy` at all; the export compiles in-repo only because it is never
applied in-repo.

Second, independent defect on the same 14 lines: `lazy.ts:35` —
`const method = descriptor.value!.bind(target);`. For an instance-method decorator, `target` **is the
prototype**. Any decorated method that reads instance state receives the prototype as `this`. The
export is simultaneously unusable (modern TS) and wrong (legacy TS).

**Falsifier**: *if* `tsconfig.json` enabled `experimentalDecorators`, half the claim would soften to
"legacy-only". It does not. The `bind(target)` half stands regardless — `lazy.ts:35` is
unconditional.

---

### C-10 — MAJOR — `getLazyParser` is a process-global cache with zero consumers (and an O-8 violation)

`core.ts:15` exports `getLazyParser`. `lazy.ts:5-15`: a module-level
`const LAZY_PARSER_CACHE = new WeakMap<Function, unknown>()`, keyed on the *function identity* of the
thunk, never cleared, never scoped to a parse. Grep across `parse-that/typescript/src`, the value.js
tree, and `dist` finds no caller other than the barrel re-exports.

Under the X·P target algebra this is a named enemy, not a neutral helper. **W2 §3b O-8** (`W2.md:253-257`):
*"No operator reads or writes process-global mutable state. Arming, memoization, and diagnostics are
parameters of a parse, never latches."* `getLazyParser` is memoization on a process-global map. It is
also the sibling of the defect the same section indicts — a global cache whose behaviour differs
between parse #1 and parse #N is precisely **K-6**'s kill class (`W2.md:474-475`).

`createLazyCached` (`lazy.ts:18-24`) is the correct construction — a **closure-local** cache, with
the comment naming the reason ("avoids mutating function objects (megamorphic IC pollution)"). The
module already contains its own refutation of the export beside it.

**Falsifier**: *if* any consumer called `getLazyParser`, it would be live surface with a
justification. None does.

---

### C-11 — MAJOR — `/core` offers **no depth-bounded back-edge**; binding debt 3 is undischargeable on this surface

```
→ createLazyCached.length   1
→ Parser.lazy.length        1
```

`/core`'s two recursion primitives (`core.ts:15`, and `Parser.lazy` reachable via `core.ts:7`) both
take exactly one argument: the thunk. There is no place to pass a bound.

**parser-band binding debt 3** (`registry/adjudicated/parser-band.md`): *"cand-O's one `lazy`
back-edge (balanced tail) should carry an **explicit depth bound** so the stack ceiling becomes an
ordinary `ok:false` by construction; the try/catch may remain as a last-resort shield but must stay
proven non-load-bearing."* **W2 §3b** makes this an algebra law: *"bounded back-edge (the depth bound
an **algebra parameter**)"* (`W2.md:250`), enforced by **K-7** (`W2.md:475-476`). **O-15 PT-04**
measures the consequence on the published dist: `Parser.lazy` arity 1, deepest OK **7,761**, thrown
`RangeError` at 7,762.

`parsethat-surface-gaps.mjs:37` is the RED row: `Parser.lazy.length !== 2` → *"arity 1 — (fn) only"*.
I reproduce it directly on the `/core` surface above, and extend it: `createLazyCached` — the
primitive `Parser.lazy` is built from (`parser.ts:702-707`) and which `/core` exports separately —
has the same arity 1. The debt cannot be discharged by wrapping `Parser.lazy`; the seam is absent
one level down too.

**Falsifier**: *if* either function accepted a `maxDepth`, the bound could be an algebra parameter
without a fork. Both measured arity 1.

---

### C-12 — MAJOR — 16 of `/core`'s 18 runtime exports are ungated; semver drift is invisible to `proof:all`

`test/subpath-gate.mjs` is the only gate that touches the `/core` surface. It asserts existence of
the five subpath dist targets (`:26-37`) and then exactly **two** symbols: `core.Parser` is a
function (`:47-49`) and `core.dispatch` is a function (`:52-54`). `scripts/proof-no-dead-combinator.mjs`
bans two *named* symbols (`thenMap`, `fuse`, `:29-32`) and vacuity-guards on `dispatch`.
`test/manifest-gate.mjs` reads the manifest only. Nothing enumerates the export set.

Deleting `spanToString`, `mergeSpans`, `getLazyParser`, `trimStateWhitespace`, `createLazyCached`,
`splitBalanced`, `containsDelimiter`, `eof`, `any`, `all`, `string`, `regex`, `whitespace`, `lazy`,
`ParserState`, or `createParserContext` from `/core` leaves `npm run proof:all` **GREEN**. For a
package at `1.0.0` (`package.json:3`) whose 1.0.0 cut was itself a breaking removal (`core.ts:6`,
the `*Span` excision), the public surface of the primary subpath is 89 % unpinned.

**Falsifier**: *if* `manifest-gate.mjs` or any gate held a golden export list, drift would be caught.
Read all five gate scripts — none does. (Contrast the discipline applied to the *removed* surface:
`proof:no-span-surface` and `proof:no-dead-combinator` both exist. Removal is gated; retention is
not.)

---

### C-13 — MAJOR — `sideEffects: false` is false, and a green gate **enforces** the false declaration

`package.json:5` declares `"sideEffects": false`. `parser.ts:711` is a bare top-level call —
`_initWhitespace();` — emitted verbatim at `dist/packrat-entry-CS1td-8B.js:1416` (the function at
`:657-659`). It assigns the `let`-bound export `whitespace` (`leaf.ts:395`) and sets
`whitespace.context.name = "whitespace"` (`leaf.ts:398`), which `Parser.trim`'s fast path
dispatches on (`parser.ts:488`) and whose default parameter is `whitespace` itself (`parser.ts:481`).

`test/manifest-gate.mjs:38-41` — Gate 2 — **fails the build** unless `sideEffects` is exactly
`false`. The gate's own header (`:5`) gives the rationale ("a tree-shaking consumer over-includes
the barrel"). The gate is therefore green *because* the manifest asserts something the source
contradicts.

**Consumer-visible hazard**: a bundler that honours `sideEffects: false` and drops the unreferenced
top-level `_initWhitespace()` statement leaves `whitespace === undefined`; `p.trim()` with no
argument then evaluates `parser.context?.name` on `undefined` (`parser.ts:488`) and throws a raw
`TypeError`.

**Falsifier — stated honestly and only partly closed**: I did **not** bundle a consumer, so the
"bundler drops it" half is a *hazard*, not a measurement — most bundlers conservatively retain calls
that mutate module-scope bindings. The half I did close is the one that matters for the axis: the
manifest fact is untrue (`dist/…:1416` is a top-level effect) and a gate mandates it. Severity is
MAJOR on the false-declaration-plus-enforcing-gate, not on a claimed breakage.

---

### C-14 — MAJOR — PT-07 on the `/core` surface: `undefined` means both success and failure, on two core exports

```
→ string("a").parseState(undefined | null | 42 | {} | [])   5/5 throw raw TypeError
→ string("x").parse("y")        undefined      ← FAILURE
→ whitespace.parse("a")         undefined      ← SUCCESS  (isError false, measured C-2)
```

`Parser.parse` (`parser.ts:77-79`) is `parseState(val).value`. It discards `isError`. Two exports of
this module return `undefined` for opposite outcomes, and there is no discriminator on the returned
value. O-15 **PT-07** states the pair against the published dist; I reproduce it on `/core`
specifically and sharpen it — O-15 says `.parse()` failure is *"indistinguishable from a successful
`undefined`"*; the concrete witness is `whitespace`, and it is the very export C-2 also indicts.

**Where this lands in the target algebra**: W2 §3b holds the frozen contract's failure arm
load-bearing — `{ ok: false; diagnostics: readonly [ParseIssue, ...ParseIssue[]] }`, a **non-empty
tuple** (`W2.md:292-295`) — making "every rejection carries ≥1 diagnostic" a *type-level* obligation.
`/core`'s `Parser.parse` cannot express it, and `/core`'s `Parser.parseState` cannot populate it
(C-5). **K-8** kills any throw on any universe row (`W2.md:477-478`); the 5/5 raw `TypeError` is
that throw. The corpus's own remedy stands and I do not re-litigate it: value.js's cure is *"a named
JS-boundary invariant **above** parse-that, not a request to them"* (O-15) / *"non-string inputs die
at a named JS-boundary invariant above the algebra"* (`W2.md:161-162`). This row records that the
boundary must sit above `/core` **specifically**, because `/core` is where `parseState` is exported.

**Falsifier**: *if* `parse()` returned a discriminated result, or `parseState` guarded its input, the
pair would be distinguishable. Measured otherwise, 5/5 and 2/2.

---

### C-15 — MINOR — `Suggestion` / `SecondarySpan` type the public `ParserState` fields but are absent from `/core`

`ParserState.suggestions: Suggestion[]` and `.secondarySpans: SecondarySpan[]` are **public**
instance fields (`state.ts:44-45`), typed by interfaces **declared in `state.ts` itself**
(`:25-34`). `/core` exports the class (`core.ts:9`) and, of the state types, only
`ParserContext` and `Span` (`core.ts:14`) — verified against `dist/core.d.ts` (6 lines, line 3).

A `/core` consumer holding a `ParserState` cannot name the element type of two of its public fields.
The types are reachable only via `@mkbabb/parse-that/diagnostics` (`diagnostics.ts:14`), which
re-exports them from `utils.ts:3`, which re-exports them from `state.ts` — a three-hop path back to
the module `/core` already owns.

**Falsifier**: *if* the fields were private or `@internal`, omission would be correct. `state.ts:44-45`
declares them public with no annotation, and `ParserState.clone()`/`save()`/`restore()` are all part
of the exported surface.

---

### C-16 — MINOR — the balanced-split helpers are format-time BBNF codegen support inside the "primitive set"

`core.ts:26` exports `containsDelimiter` / `splitBalanced`. `split.ts:1-4` states their purpose:
*"Used by BBNF-generated `toDoc()` code to split opaque Span text on a delimiter at nesting depth 0."*
They parse nothing, take no `ParserState`, return no `Parser`. They are string formatting.

Two consumption facts. (i) **Zero routing-chain consumers**: no value.js file references either name
(grep, `src/**`). (ii) **Zero in-package consumers except the barrel**: they are the only two `/core`
names Rollup did **not** hoist into the shared chunk — they sit inlined at `dist/core.js:2-37`, and
`dist/parse.js:3` imports them *back out of `core.js`*, which is what "no other entry uses these" looks
like in an emitted graph.

Under the routing law (`W2.md:133` — parser → value → packed release; **direct parse-that→fourier
FORBIDDEN**) a helper whose only consumer is bbnf-lang's generated formatter sits outside the chain
entirely. Under W2 §3b's capability families (`W2.md:249-251`) it maps to none.

**Falsifier**: *if* a routing-chain consumer used them, they would be live core surface. None does —
and their emission position is independent corroboration.

---

### C-17 — MINOR — `dispatch` is ASCII-only, in a domain whose ident-start is not

`leaf.ts:101` allocates `new Int8Array(128)`; `leaf.ts:137` routes
`const idx = ch < 128 ? tbl[ch] : -1;`. Any first code point ≥ U+0080 takes the labelled-failure arm
unconditionally. CSS Syntax §4.2 defines `ident-start code point` as *letter | **non-ASCII code
point** | `_`* — so a custom property, custom ident, counter-style name, `@font-face` family name, or
`var()` head beginning with a non-ASCII letter cannot be routed by `/core`'s O(1) dispatcher and must
fall to `any()`'s sequential trial.

**Falsifier and its honest bound**: this is **prospective**, not observed — value.js consumes no
`dispatch` today (C-19), so no shipped grammar hits it. It becomes live the moment an X·P candidate
uses `dispatch` for head selection, which `W2.md:249-251` names as a capability family
("channel-table dispatch") and `W2.md:411-413` puts in the shared slice ("head dispatch over the full
production set"). Recorded as a design constraint on the algebra, at MINOR.

---

### C-17′ — **WITHDRAWN** (my own hypothesis, refuted by its own falsifier — L-18)

I hypothesised an `Int8Array` **overflow**: `internParser` (`leaf.ts:104-111`) assigns monotonically
increasing indices into an `Int8Array` (range −128..127), so a table with ≥128 distinct parsers would
store index 128 as −128 and `idx >= 0` (`:139`) would silently *reject*; ≥256 would wrap to 0 and
silently *mis-dispatch to `parsers[0]`* — a wrong-answer defect.

**Refuted by construction.** The table addresses code points 0..127 only (`leaf.ts:101`, `:137`), so
at most **128** distinct slots can be written, so `internParser` can mint at most **128** distinct
indices (0..127) — every one of which `Int8Array` represents exactly. Index 128 is unreachable. I
built a 130-parser table to force it and could not: only 127 keys are addressable, and the highest
reachable index (126, key `\x7f`) round-trips correctly (`→ probe(127)` returns its own char). The
`Int8Array(128)` sizing is not merely safe, it is **exactly minimal and total** — see superlative
S-2. The hypothesis is withdrawn, not softened.

---

### C-18 — MINOR — corpus-instrument defects in `parsethat-surface-gaps.mjs` (the RED-7 probe itself)

Two, both on the probe, both bearing on how RED-7 should be read against this module.

**(a) One row can never go RED.** `parsethat-surface-gaps.mjs:46`:

```js
row(!ARM ? false : false, "LATCH   PACKRAT_ARMED is a module-global one-way flag", …);
```

Both ternary arms are the constant `false`. The `PACKRAT_ARMED` row prints `ok` in every mode
including `--arm`. **L-19** (`W2.md:308`) — *"a gate must be able to fail for its intended reason"* —
names exactly this. The finding is not lost (O-15 PT-03 carries the latch with dist line-cites
`:678`/`:722`), but the probe's own count under-reports by the one row whose subject is the module's
most consequential coupling.

**(b) The probe cannot run from the workspace its header names.** `parsethat-surface-gaps.mjs:3-4`:
*"Run from this workspace (it resolves the workspace's node_modules)."*

```
→ (cwd = /Users/mkbabb/Programming/value.js)  await import("@mkbabb/parse-that")
   UNRESOLVED: ERR_MODULE_NOT_FOUND — Cannot find package '@mkbabb/parse-that'
→ ls node_modules/@mkbabb/   →  glass-ui  keyframes.js  value.js     (no parse-that)
```

I therefore did **not** execute the probe. RED-7's seven rows are derived by reading the source
(rows 1, 2, 3, 4, 5 and the two GUARD rows red on the unarmed default; the LATCH rows do not, per
(a)); **five of the seven I reproduced independently and directly against `dist/core.js`** and
report above with receipts — C-4 (row 1's `mergeErrorState` gap and `label` absence), C-11 (row 5),
C-14 (both GUARD rows). Row 4 (`Parser.lazy` ceiling / `RangeError`) I did **not** re-measure and
cite from **O-15 PT-04** (7,761 / `RangeError` at 7,762) rather than claim. Row 3
(`enableDiagnostics` arity/process-global) is the diagnostics tier, not this module.

**RED-7 ↔ `core` mapping (the axis question)**: **six of the seven** RED rows land on exports of
`core.ts` — five on `Parser` (`core.ts:7`: `.label` absence, `.lazy` ceiling, `.lazy` arity,
`parseState` non-string, `parse` failure signal) and one on the **absence** of `mergeErrorState`
from the surface that hosts the leaves which call it. Only row 3 is purely a sibling tier's.
`core.ts` is where RED-7 lives.

---

### C-19 — INFO — `/core` has **zero** consumers; every consumption claim above is prospective

```
→ value.js package.json  dependencies: { "@mkbabb/glass-ui": "^7.0.0",
                                         "@mkbabb/keyframes.js": "^6.0.0" }
                         peerDependencies: {}    devDependencies: no @mkbabb/parse-that
→ grep -rn "parse-that" value.js/src/   →  2 hits, both comments asserting the negative:
     src/subpaths/transform.ts:4  "a pure leaf (zero parsing, zero parse-that)"
     src/subpaths/math.ts:2       "pure numeric math (O.W2). parse-that-FREE."
```

The routing law's **sole downstream** (`W2.md:133`) does not depend on this package at all. The 52
frozen `/css` exports — re-derived this session against `value.js/src/css/index.ts` (60 lines):
**`total 52  types 33  runtime 19`**, matching `W2.md:147-148` exactly — are produced by value.js's
own hand-written grammar (`src/css/grammar.ts`), not by parse-that.

**This contradicts nothing and is filed INFO deliberately.** W2 §3 *Not in scope* (`W2.md:193-194`)
already freezes the set: *"adding `@mkbabb/parse-that` to `package.json` (X-W9 G31 measures that set
and it stays as measured)"*. The fact is recorded because it *calibrates* every row above: `/core`'s
API ergonomics, its subpath economics, and its semver surface are today **unexercised by any
production consumer**. C-1's misleading docblock has misled no one yet; C-2's EOF rejection has broken
no shipped grammar. They become live at the moment W2's AC-1/AC-3 seats build "source-direct JS **on
the combinator library's own surface**" (`W2.md:104-105`, `:313-316`, `:346-352`) — which is
precisely why the module must be challenged **now**, before a candidate inherits these defects as
substrate.

---

## 3. The X·P dual-target algebra verdict — keep / wrap / retire

Per **W2 §3b** (`W2.md:224-302`): state `(V, C, P, D)`; law **COMP-1**; the capability families at
`:249-251`; **O-8** anti-latch at `:253-257`; **R-LAW-1..5** at `:273-290`; kill rules **K-1..K-10**
at `:463-483`. Verdicts are against the algebra as ratified in W2, not against parse-that's own
roadmap.

| `/core` export | `core.ts` | W2 §3b family | verdict | binding reason |
|---|---|---|---|---|
| `string` | :21 | token-class scan (terminal) | **KEEP** | labelled zero-width failure already correct (`leaf.ts:291`, `:303`); the model leaf |
| `all` | :20 | sequence | **KEEP** | `fuseAll` (`leaf.ts:179-273`) restores `savedOffset` on every arm — R-LAW-1 rollback exactness by construction |
| `any` | :18 | ordered committed choice | **KEEP + declare** | backtracking is exact (`leaf.ts:42-73`); **R-LAW-5** (`W2.md:288-290`) must be *declared* over it — a recovering first arm starves the second |
| `dispatch` | :19 | channel-table dispatch | **KEEP + widen** | the family's canonical realization; ASCII bound (C-17) must be lifted before an ident head-table |
| `eof` | :17 | commit point | **KEEP** | labels correctly (`leaf.ts:16`) |
| `Span`, `spanToString`, `mergeSpans` | :12,:11,:14 | span-into-`C` | **KEEP** | the zero-copy offset pair is exactly `C`'s `(offset, length)` carrier and `P`'s `(start,end)` row |
| `regex` | :22 | token-class scan | **WRAP (repair first)** | C-2/C-3: the EOF short-circuit (`leaf.ts:327-330`) breaks both totality and furthest-offset. **K-1** (equality) and **K-8** (totality) both bite; an algebra cannot lower a terminal whose failure protocol differs from its sibling's |
| `Parser` | :7 | (the carrier) | **WRAP — mandatory** | `parseState` reads the `PACKRAT_ARMED` global (`parser.ts:43` → `packrat.ts:217`) = **O-8** violation + **K-6** cross-parse state; `parseStateInner` `console.error`s (`parser.ts:68`) = **R-LAW-3** violation ("diagnostics are values, never effects", `W2.md:281-283`) — and R-LAW-3's probe *monkey-patches `console.error` to throw*, so an unwrapped `Parser` **cannot pass its own gate**. `.parse()` must not survive the wrap (C-14) |
| `ParserState` | :9 | — | **WRAP** | carries `expected`/`suggestions`/`secondarySpans` (`state.ts:43-45`) but not `(V,C,P,D)`; `unsafeSetValue`/`unsafeCall`/`unsafeCallRaw` (`:87-99`) are three type-erasure escape hatches an algebra may not expose |
| `whitespace` | :24 | token-class scan | **WRAP or RETIRE** | broken at EOF (C-2); `Parser.trim` already routes around it (`parser.ts:488`). `trimStateWhitespace` is the working artifact |
| `trimStateWhitespace` | :23 | token-class scan | **KEEP** | pure, allocation-free, total (`leaf.ts:372-391`); the whitespace primitive that actually works |
| `createLazyCached` | :15 | bounded back-edge | **WRAP (needs a parameter)** | closure-local, correct O-8 posture (`lazy.ts:18-24`) — but **arity 1** (C-11); the depth bound W2 requires as an *algebra parameter* (`W2.md:250`) has nowhere to go. **K-7** |
| `getLazyParser` | :15 | — | **RETIRE** | process-global `WeakMap` (`lazy.ts:5`) = **O-8** violation, **K-6** class; zero consumers (C-10) |
| `lazy` (decorator) | :15 | — | **RETIRE** | legacy decorator, unusable on TS 5 defaults; binds `this` to the prototype (C-9) |
| `createParserContext`, `ParserContext` | :10,:14 | — | **RETIRE from the algebra surface** | debug-printer plumbing (`parser.ts:699`, `state.ts:136-138`); W2 rules provenance is **`P`, an array, not a node field** (`W2.md:238`) — a per-node context object is the tree-shaped carrier §3b forbids. Closed union (C-8) makes it useless to consumers anyway |
| `ParserFunction` | :7 | — | **RETIRE** | phantom parameter (C-7); replace with a real `(state) => state` signature carrying `T` |
| `containsDelimiter`, `splitBalanced` | :26 | none | **RETIRE from `/core`** | format-time BBNF codegen support (C-16); no family, no routing-chain consumer. A `/format` subpath, or bbnf-lang's own tree |

**Net**: of 18 runtime + 4 type exports — **10 keep, 6 wrap (2 of them requiring a source repair
first), 6 retire**. The three `/core` exports the W2 slice most depends on (`W2.md:411-419`:
`parseCssColor` deep head dispatch + `parseTimingFunction` whole + one malformed qualified rule
under COMP-1) are `dispatch`, `any`, and `Parser` — and `Parser`, the one every candidate must sit
on, is the one that cannot pass **R-LAW-3** unwrapped.

**One consequence for W2 §4a's AC-3 seat.** The scan-union seat is the only unit permitted to write
`<p2>/typescript/src/**` (`W2.md:524`, `:554-555`), on `w2/ac3-scan-union`, with the condition *"the
library's own test suite stays green on the branch, or the union is a fork, not a citizen"*. C-2 and
C-3 are pre-existing source defects in `leaf.ts` on that seat's exact surface. If that seat repairs
`regex()`'s EOF path it changes `whitespace`'s observable behaviour for every parse-that consumer —
a change that must be a *declared divergence row* for `.h`, not a silent green. Filing it here so the
seat inherits the fact rather than discovering it.

---

## 4. Superlatives (L-18 both ways)

**S-1 — module-instance identity is preserved across all five subpaths.** The dual-package hazard
that breaks most multi-entry libraries does not exist here, and it is the single most valuable
property of the split. Receipts: `dist/core.js:1`, `dist/parse.js:1`, `dist/packrat.js:1`,
`dist/utils.js:2` all import the **same** `packrat-entry-CS1td-8B.js`; `dist/diagnostics.js:1` and
`dist/utils.js:1` the same `diagnostics-DDazRHgl.js`; and `grep -c diagnosticsEnabled` gives **9** in
the diagnostics chunk and **0** in the packrat chunk — exactly one copy of the flag, one `Parser`
class, one `PACKRAT_ARMED`. So `parsethat-surface-gaps.mjs:12-13`'s cross-subpath mix (combinators
from `.`, `mergeErrorState` from `/diagnostics`) is **sound**, `instanceof Parser` holds across
subpaths, and `enableDiagnostics()` from `/diagnostics` really does arm the leaves that `/core`
exports. **This is unadvertised and ungated** — `subpath-gate.mjs` never asserts it, and it is the
one property whose loss (e.g. a `manualChunks` change) would break consumers silently. It deserves a
gate more than any surface row does.

**S-2 — `dispatch`'s `Int8Array(128)` is exactly minimal and provably total.** My overflow attack
(C-17′) is refuted by construction: ≤128 addressable code points ⇒ ≤128 distinct interned parsers ⇒
indices 0..127 ⇒ every index exactly representable. Not "safe by luck" — the table width and the
index width are the *same* 128, and `leaf.ts:137`'s `ch < 128` guard closes the only other door. A
`Uint8Array` or `Int16Array` here would be strictly worse (the −1 sentinel needs the sign; a wider
type wastes the cache line the dispatcher exists to fit).

**S-3 — the PT-Q5 RETRACT docblock is the exemplar of consumption-driven design.** `leaf.ts:88-98`:
a shipped perf widening (2nd-byte `subTable`) is **retracted** because *"It had ZERO production
consumers — value.js's only `dispatch()` calls pass NO subTable — so the widening was a no-consumer
perf seam gated against a SYNTHETIC corpus no consumer runs"*, with the re-entry condition stated in
advance (*"If value.js's coordinated Q session measures an on-path win, the widening is
re-introduced … with the perf gate re-anchored to value.js's real `c`-bucket grammar — not before"*).
That is `K-5`/OP-8 posture written a tranche before W2 named it, on the exact module under
challenge. Every C-row above is a departure from a standard this file already set for itself.

**S-4 — retirement hygiene is exemplary and machine-enforced.** The `*Span` excision is cited at
`core.ts:6` and `index.ts:10-12` with the fold row (S.H2 row 48), the deprecating version (0.13.0),
the originating finding (PT-Q4), the consumer count (zero) **and** the enforcing gate name
(`proof:no-span-surface`) — and the gate exists (`package.json:32`). `proof:no-dead-combinator`
does the same for `thenMap`/`fuse` with a **vacuity guard** (`scripts/proof-no-dead-combinator.mjs:18-20`)
so a typo'd path cannot false-green. Most libraries delete silently; this one leaves a citation trail
a consumer can audit. (C-12 is the exact inverse of this virtue, which is what makes it worth
naming.)

**S-5 — the C-16 `chain()` cure is textbook semver hygiene on a consumer-facing bug.**
`parser.ts:124-137`: the pre-1.0.0 code gated the continuation on `state.value || chainError`, so a
**falsy-but-valid** seed (`0` / `''` / `false`) was silently dropped — a real wrong-answer defect for
any numeric grammar. The fix threads the value unconditionally on success, and the removal of the
`chainError` parameter is justified in-comment by *measurement*, not taste: *"was dead-on-error (the
isError branch already returns first) and had **zero callers across value.js + parse-that**"*, landed
in a major cut (1.0.0) rather than smuggled into a patch. That is exactly the discipline C-12's
missing surface gate would make repeatable.

**S-6 (half-superlative, recorded for completeness) — the observable-truth standard.**
`scripts/proof-no-css-surface.mjs:6-14` is a gate that *documents its own earlier unsoundness*: the
charter's first draft grepped `index.d.ts` for CSS symbol substrings, which would have passed GREEN
with the CSS parser still shipping, because the barrel's `export *` never inlines them. The rewrite
observes the runtime export keys of the bundled dist instead. I adopted that standard for this whole
challenge — every claim in §1 and §2 is measured against `dist/**` or a live import, never against a
source grep — and it is the reason C-1 is provable at all.

---

## 5. Counts

| | |
|---|---|
| **defects** | **19** (C-1 … C-19) |
| **BLOCKER** | **2** (C-1 the false isolation contract · C-2 `whitespace` rejects at EOF) |
| MAJOR | 12 (C-3 · C-4 · C-5 · C-6 · C-7 · C-8 · C-9 · C-10 · C-11 · C-12 · C-13 · C-14) |
| MINOR | 4 (C-15 · C-16 · C-17 · C-18) |
| INFO | 1 (C-19) |
| **withdrawn by own falsifier** | 1 (C-17′ `Int8Array` overflow — refuted, → superlative S-2) |
| **superlatives** | **5** (S-1 … S-5; S-6 recorded as a half) |

**Corpus alignment**: folds O-15 (PT-01 §C-1/C-5, PT-03 §C-1, PT-04 §C-11, PT-07 §C-14) with dist
line-cites carried, never re-derived; folds `registry/adjudicated/parser-band.md`'s binding debts 1
(§C-4) and 3 (§C-11); folds `docs/tranches/X/parse-that/waves/W2.md` §3b/§3c/§3e/§4 for the algebra
verdicts (§3). **Contradicts** one corpus artifact explicitly, with receipts: the RED-7 probe
`parsethat-surface-gaps.mjs` has a row that cannot go RED (`:46`) and cannot be run from the
workspace its own header names (§C-18). **Re-derived and confirmed**: the 52-export `/css` count
(33 types + 19 runtime, `value.js/src/css/index.ts`) matching `W2.md:147-148`.
