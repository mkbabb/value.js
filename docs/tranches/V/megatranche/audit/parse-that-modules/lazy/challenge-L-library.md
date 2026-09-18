claude-opus-5[1m]

# CHALLENGE — `lazy` · LIBRARY axis (L)

**Target**: `/Users/mkbabb/Programming/parse-that/typescript/src/parse/lazy.ts` (43 lines, 3 exports)
**Read whole, read-only**: `lazy.ts` + its direct imports `parser.ts` (711), `state.ts` (189) + the transitive
surface those two require to adjudicate the named hazards — `utils.ts` (186), `packrat.ts` (head + latch
region), `debug.ts` (the `case "lazy"` arm + `statePrint`), `leaf.ts` (entry + `whitespace`), `core.ts`,
`index.ts`, `diagnostics.ts`, `packrat-entry.ts`, `tsconfig.json`, `package.json`, and the published
`dist/` bundles for the O-15 byte cites.
**Date**: 2026-08-04 · **Substrate**: parse-that `ef10d5b` (1.0.0), TypeScript 5.9.3, node v26.0.0, darwin arm64

**STOP-finding check**: `/Users/mkbabb/Programming/parse-that-css-totality-p2` **does not exist**
(`ls` → `No such file or directory`). No STOP condition. No worktree, frozen root, or Codex path entered.

**Law compliance**: single write (this file). No browser tooling. Every probe below ran in a throwaway
`node -e` process against `dist/core.js`; **none called `memoize()`/`mergeMemos()`/`enableDiagnostics()`**, so
`PACKRAT_ARMED` stayed `false` (packrat.ts:156) and `diagnosticsEnabled` stayed `false` (utils.ts:6) in every
probe — the one-way latch was never touched, and the process-global latches do not survive process exit in
any case.

**Posture**: the module is presumed DEFECTIVE. Each claim below carries severity, `file:line` provenance, and
its own falsifier; claims that did not survive their falsifier are recorded as such rather than deleted
(S-4 is one I tried to land and could not).

**Verdict (after pass 2)**: **20 defects (2 BLOCKER, 5 MAJOR, 8 MINOR, 5 INFO) · 6 superlatives.** The
module's *hot path* (`createLazyCached`) is excellent and load-bearing for packrat soundness. Its other two
exports are the problem: `lazy` (the namesake decorator) cannot run under the package's own compiler
configuration **and** fails to do the one thing lazy exists to do; `getLazyParser` is a second, divergent
cache that manufactures a shadow grammar. Separately, O-15 **PT-04's headline number is challenged**: the
depth ceiling is not a constant, and the cold figure on this box is **2.74× lower** than the pinned 7,761.
Pass 2 adds the sharpest structural finding of the two passes: **`createLazyCached` defers arbitrary parser
*construction* into the middle of a parse, which falsifies the arming invariant `packrat.ts:284-289` asserts
in prose** (N-1).

> **PASS STRUCTURE.** §0–§7 are **pass 1**, preserved byte-for-byte — its measurements are its own and are
> not re-stated at second hand. §8 is **pass 2** (independent seat, same model id, same axis, same
> read-only substrate), which folds pass 1, contradicts it nowhere, extends L-M1 with a third probe shape
> and a stack-frame census, and adds eight findings and two superlatives pass 1 did not reach. §9 is the
> merged ledger. Where the two passes measure the same quantity, both numbers are printed and neither is
> averaged.

---

## 0 · Corpus folded (cited, not re-invented)

| Source | Row / line | Status here |
|---|---|---|
| INBOX **O-15** PT-01 | label no-op unless armed; arming couples unconditional `console.error` | **CONFIRMED at the bytes** (§5.1); one-line precision note |
| INBOX **O-15** PT-03 | `PACKRAT_ARMED` one-way latch, `:678`/`:682`/`:714`/`:722` | **CONFIRMED EXACTLY at the bytes** (§5.2) |
| INBOX **O-15** PT-04 | `Parser.lazy` arity 1; deepest OK 7,761; `RangeError` at 7,762 | arity + failure mode **CONFIRMED**; the **number CHALLENGED** — L-M1 |
| INBOX **O-15** PT-07 | 5/5 non-string raw `TypeError`; `.parse()` undefined-on-failure ambiguity | **CONFIRMED / reproduced** (§5.3) |
| `X/parse-that/waves/W1.md:549,573` | DEBT-3 rows pin "deepest OK = 7761 / RangeError at 7762" | **contradicted as a stable baseline** — L-M1 |
| `X/parse-that/waves/W2.md:831` | "Born-RED baselines, pasted" — same 7,761 | same contradiction; the baseline needs a cold/warm qualifier |
| `X/parse-that/waves/W2.md:250,810` | depth as an **algebra parameter**; `lazy ≤ 1` structural gate | **corroborated** — L-M3 shows arity 1 has no depth slot to put it in |
| `registry/adjudicated/parser-band.md:111` | cand-O's "~2,500-frame stack ceiling, guarded and pinned by test" | **corroborated by measurement** — my cold bisect lands at 2,833, the same order; 7,761 is not |
| `registry/adjudicated/parser-band.md:118` | DEBT-3 "recursion bounded by construction, not by catch" | **strengthened** — L-M1's hysteresis makes catch-based bounding unsound in principle, not just in taste |
| `registry/adjudicated/parser-band.md:134` | G8 structural graph-walk gate | **corroborated** — L-B2 is exactly the defect a *textual* grep cannot see and a graph walk can |

---

## 1 · The module, whole

```ts
// lazy.ts
 1  import { Parser } from "./parser.js";
 2  import type { ParserState } from "./state.js";
 3  import { createParserContext } from "./state.js";
 5  const LAZY_PARSER_CACHE = new WeakMap<Function, unknown>();
 7  export function getLazyParser<T>(fn: () => T): T {            // ← cache #1 (module-global WeakMap)
 8      const cached = LAZY_PARSER_CACHE.get(fn);
 9      if (cached !== undefined) return cached as T;
12      const parser = fn();
13      LAZY_PARSER_CACHE.set(fn, parser);
14      return parser;
17  // Closure-local lazy cache — avoids mutating function objects (megamorphic IC pollution)
18  export function createLazyCached<T>(fn: () => Parser<T>): (state: ParserState<T>) => ParserState<T> {
19      let cached: Parser<T> | undefined;                        // ← cache #2 (closure-local)
20      return (state: ParserState<T>) => {
21          if (!cached) cached = fn();
22          return cached.parser(state) as ParserState<T>;
23      };
28  /** Method decorator … Defers parser construction until first invocation, then caches. */
32  export function lazy<T>(target: unknown, _propertyName: string,
35      descriptor: TypedPropertyDescriptor<() => any>) {
36      const method = descriptor.value!.bind(target);
37      descriptor.value = function () {
38          return new Parser(createLazyCached(method),
39                            createParserContext("lazy", undefined, method));
```

Three exports, three *different* strategies for one idea. Only one of them is in the shipping hot path.
Call-site census over `src/`, `test/`, `scripts/`, `docs/` (excluding `dist/`):

| Export | Internal consumers | Public exposure |
|---|---|---|
| `createLazyCached` | `parser.ts:704` (`Parser.lazy`) + `lazy.ts:39` | `index.ts:7`, `core.ts:15` |
| `getLazyParser` | `debug.ts:318` **only** | `index.ts:7`, `core.ts:15` |
| `lazy` (decorator) | **zero** — `grep -rn "@lazy" src test scripts docs` → 0 hits | `index.ts:7`, `core.ts:15` |

`Parser.lazy` — the wrapper the whole tree actually uses — has 14 in-tree call sites
(`parsers/json.ts:25,28`; `test/math.test.ts:45,54,66,70`; `test/memoize.test.ts:17,25,28,30,42,57`;
`test/reentrancy.test.ts:111,130,162`; `test/print.test.ts:21`; two benches). **Not one of them uses the
decorator.**

---

## 2 · BLOCKERS

### L-B1 — BLOCKER — the `lazy` decorator cannot run under this package's own compiler configuration
**Provenance**: `lazy.ts:32-43` (signature + `descriptor.value!`) · `tsconfig.json` (no `experimentalDecorators`,
`"target": "ES2022"`) · TypeScript **5.9.3** (`node_modules/typescript/package.json`) ·
exported at `index.ts:7` and `core.ts:15`.

`experimentalDecorators` appears **nowhere** in the repo:

```
$ grep -rn "experimentalDecorators" . --include='*.json' --include='*.ts' | grep -v node_modules
(no output)
```

With TS ≥ 5.0 and `experimentalDecorators` absent/false, decorators compile to **TC39 standard** semantics:
a method decorator is invoked as `dec(originalMethod, context)` — two arguments, the second an object, and
**no `PropertyDescriptor` at all**. `lazy`'s third parameter is therefore `undefined`, and line 36
(`descriptor.value!.bind(target)`) dereferences it **at class-definition time**.

**MEASURED** (probe P1, `dist/core.js`, standard-decorator call shape):

```
P1 TC39 shape -> TypeError: Cannot read properties of undefined (reading 'value')
```

Not a parse-time failure — a *class-evaluation* failure. A consumer who writes `@lazy` gets a hard throw the
moment the module containing the grammar class is imported.

**Falsifier attempted**: *"it is documented as a legacy decorator; the consumer sets `experimentalDecorators`."*
Rejected on three counts. (i) There is no such documentation — the JSDoc at `lazy.ts:27-31` says only "Method
decorator", with no config precondition. (ii) `verbatimModuleSyntax: true` + `moduleResolution: "bundler"` +
ES2022 is a modern-toolchain profile; a consumer on that profile cannot enable `experimentalDecorators` without
also opting out of standard decorators project-wide. (iii) The package ships **no** in-tree usage that would
have caught the break, so no CI signal exists. **Falsifier did not survive; the finding stands.**

**Blast-radius bound (stated honestly)**: zero in-tree consumers, so nothing in parse-that or value.js breaks
*today*. The severity is BLOCKER because it is a **shipped public export of the module that bears its name**,
reachable from both `.` and `./core`, that throws on first use under the repo's own settings.

---

### L-B2 — BLOCKER — the decorator does not tie the recursion knot: the one thing `lazy` exists to do
**Provenance**: `lazy.ts:37-42` (a fresh `new Parser` + fresh `createLazyCached` closure **per method call**) ·
docstring `lazy.ts:28-31` ("Defers parser construction until first invocation, **then caches**") ·
contrast `parser.ts:702-707` (`Parser.lazy`, which closes over a *variable*).

`descriptor.value` is replaced by a function that constructs a **new** `Parser` on **every invocation**. The
`createLazyCached` cache it installs is scoped to that one `Parser`, not to the method. So for the canonical
recursive-grammar shape `@lazy expr() { return string("a").then(this.expr()).or(string("a")); }`, every
recursion level reached at parse time calls `this.expr()` again, mints a *fresh* lazy node with a *fresh*
empty cache, and builds a *whole new body subtree* — retained for the process lifetime by the closure chain.
The knot is never tied.

**MEASURED** (probe P2/P3, `dist/core.js`; ids counted by minting a marker `Parser` before/after each parse):

```
DECORATOR    ids minted:  depth2-first=15   depth2-again=0   depth8-first=30   depth8-again=0
Parser.lazy  ids minted:  depth2-first=4    depth2-again=0   depth8-first=0
P2 same Parser across two calls of the decorated method?  false  | ids: 1, 2
```

Read the two rows against each other. `Parser.lazy` constructs **once, ever** — 4 parsers on the first parse,
then **0** at any depth forever. The decorator constructs **~5 parsers per additional unit of recursion depth
ever reached**, permanently: 15 to reach depth 2, then **30 more** to reach depth 8. And two calls of the
decorated method return two *different* `Parser` objects (ids 1 and 2), which is the direct disproof of the
docstring's "then caches".

Three consequences, each with its own provenance:

1. **Unbounded, depth-proportional, process-lifetime retention.** Live grammar size = O(deepest recursion ever
   reached), never reclaimed while the class is loaded.
2. **`parser.id` inflation into a hard `RangeError`.** `id` is a process-global counter (`parser.ts:18,25`).
   `getCijKey` throws `RangeError` above `MEMO_MAX_ID` ≈ **2,097,151** (`packrat.ts:71-77`, guard at
   `packrat.ts:90-98`) to avoid float64 memo-key aliasing. A long-lived decorator-built grammar walks toward
   that ceiling monotonically; `Parser.lazy` does not.
3. **`memoize()` can never hit.** Packrat's memo key is `(id, offset)` (`packrat.ts:79-99`). A fresh id per
   recursion level means every level occupies a distinct cell that is never revisited — so wrapping a
   decorator-built grammar in `memoize()`/`mergeMemos()` arms the latch (PT-03, `packrat.ts:290`) and pays
   its measured **1.47×** cost for **zero** memoization benefit. That is the worst possible trade.

**Falsifier attempted**: *"per-call construction is intended — the decorator is a factory, not a singleton."*
Rejected. (i) The docstring explicitly promises caching. (ii) The name `lazy` in this codebase means exactly
one thing — `parser.ts:702` `Parser.lazy`, the idiom every one of the 14 in-tree call sites uses, which ties
the knot at a variable. (iii) `parser-band.md:111` requires "**exactly one** `Parser.lazy` on the one true
back-edge" and `parser-band.md:134`'s G8 gate asserts `lazy ≤ 1` structurally on the built graph — a grammar
built with this decorator would fail that gate by construction, since the graph grows a new lazy node per
level. **Falsifier did not survive; the finding stands.**

**Note for the program**: L-B2 is precisely the class of defect `parser-band.md:134` argues a grep cannot
prove and a **graph walk** can. This finding is a live worked example of that adjudication being right —
textually the decorator looks identical to `Parser.lazy`; structurally the graph is a different shape.

---

## 3 · MAJORS

### L-M1 — MAJOR — PT-04's depth ceiling is not a constant; the cold figure is 2.74× lower than the pinned 7,761
**Provenance**: `parser.ts:702-707` (`Parser.lazy`) · `lazy.ts:20-23` (the arrow frame) · no depth guard
anywhere (see L-M3) · contradicts INBOX **O-15 PT-04**, `W1.md:549,573`, `W2.md:831`.

**MEASURED**, three ways, all on this box (node v26.0.0, `dist/core.js`), grammar
`const expr = Parser.lazy(() => string("c").then(expr).or(string("c")))`:

| Condition | deepest OK | throws at |
|---|---|---|
| **Cold process** (bisected, one fresh `node` process per trial, 13 processes) | **2,833** | 2,834 |
| **Warm, same process** (bisect's own doubling walk 1→4096 warms the code first) | **8,191** | 8,192 |
| **After one overflow, same process** | 1,000 OK · 3,000 RangeError · 6,000 RangeError | — |

```
COLD-PROCESS ceiling for Parser.lazy(.then/.or) chain: deepest OK = 2833, RangeError at 2834
fresh-process depth 7761: RangeError      fresh-process depth 6000: RangeError   (reproduced 2×)
6000 (cold): RangeError | 60000 (force overflow): RangeError | 6000 (after): RangeError
                        | 3000 (after): RangeError           | 1000 (after): OK
```

Three separate dependencies fall out, and none of them is in O-15's single number:

1. **Grammar shape.** Frames per recursion level for this shape are four — the `or` closure
   (`parser.ts:106`), the `then` closure (`parser.ts:82`), the **lazy arrow** (`lazy.ts:20`), and the next
   level's `or`. A flatter grammar buys proportionally more depth. A number quoted without the grammar is
   not a measurement of the library.
2. **JIT tier.** The *only* difference between rows 1 and 2 is that the bisect's doubling walk executed ~4,000
   successful parses first, promoting the closures to optimised code with smaller frames. Same box, same
   process image, same grammar: **2.89× spread**.
3. **Overflow hysteresis.** After one `RangeError`, the ceiling *collapses* — depth 3,000 fails in a process
   where 1,000 still passes. A production process that survives one overflow has a permanently degraded
   ceiling thereafter.

**Falsifier attempted**: *"different machine, different node, different number — O-15 bounded itself at N=1,
one machine, and said so."* Granted and respected — O-15's honesty about its bound is not in question here,
and I am not claiming their box would read 2,833. The claim is **kind, not magnitude**: the *intra-machine,
intra-process* spread is 2.89×, which no cross-machine caveat covers. A single scalar cannot describe this
quantity on **any** machine. **Falsifier survived only as a scope note; the finding stands.**

**Consequences for the standing program** (this is the actionable part):
- `W1.md:549/573` and `W2.md:831` pin 7,761/7,762 as **born-RED baselines**. As written they are
  warm-path readings of an unstated grammar shape and will not reproduce cold. They need a
  `(grammar shape, JIT state, prior-overflow state)` qualifier or they will flake as gates.
- `parser-band.md:111`'s "~2,500-frame stack ceiling" for cand-O is the figure my **cold** bisect corroborates
  (2,833, same order). Margin should be declared against the **cold** number, never the warm one.
- `parser-band.md:118`'s DEBT-3 — "recursion bounded **by construction**, not by catch" — is strengthened from
  a preference to a necessity. A catch-based shield cannot be calibrated against a quantity that moves 2.89×
  with JIT state and collapses after first use. `W2.md:250`'s "depth as an **algebra parameter**" is the only
  posture the measurement supports.

---

### L-M2 — MAJOR — a stack overflow through a lazy back-edge leaves `Parser.state` holding the *previous* parse's success
**Provenance**: `parser.ts:51-75` (`parseStateInner` assigns `this.state` only *after* `this.parser(state)`
returns — success at `:71`, error at `:66`) · `parser.ts:43-48` (the try/finally restores the packrat epoch but
does **not** touch `this.state`) · public field `parser.ts:26` (`state: ParserState<T> | undefined`), emitted
into `core.d.ts`.

**MEASURED** (probe: succeed, then overflow, then read `.state`):

```
stack-overflow throw: RangeError | p.state STALE from prior parse?
    isError-before=false   offset-after=2   value-after=["c","c"]
```

After `deep.parse("cc")` succeeded and `deep.parse("c".repeat(200000))` threw `RangeError`, `deep.state` still
reports `offset=2`, `value=["c","c"]`, `isError=false` — **the previous parse's success, presented as if it
were this parse's result**. A consumer that wraps `parse()` in try/catch (the only defence available, since
`recover()` cannot help — L-M3) and then inspects `p.state` for diagnostics reads a stale success. That is a
silent wrong answer, not a loud failure.

The try/finally at `parser.ts:44-48` is otherwise exemplary — it is what keeps the packrat tables sound on an
unwind (`packrat.ts:104-121`, and see S-1). The gap is that it hardened the *global* state and left the
*instance* state un-invalidated.

**Falsifier attempted**: *"`.state` is internal; consumers use the return value of `parse()`/`parseState()`."*
Rejected: `state` is a public class field (`parser.ts:26`), appears in the emitted `core.d.ts` surface, and is
the *only* accessor for the furthest-offset/expected/suggestion diagnostics that `parseStateInner:60-65`
carefully constructs — the diagnostics tier has no other exit. **Falsifier did not survive; the finding stands.**

**Cheapest cure** (KISS, one line, no API change): `this.state = undefined;` as the first statement of
`parseStateInner`, or in the existing `finally` at `parser.ts:46`.

---

### L-M3 — MAJOR — no depth ceiling, no depth parameter, and `recover()` provably cannot catch the one failure lazy makes possible
**Provenance**: `Parser.lazy` arity — `parser.ts:702` `static lazy<T>(fn: () => Parser<T>)`; **MEASURED**
`Parser.lazy.length === 1`, confirming O-15 PT-04's "arity 1" exactly. · no depth counter anywhere:

```
$ grep -rn "depth|Depth|MAX_DEPTH|stack" src/parse/*.ts src/parse/parsers/*.ts
debug.ts:12,358,359,379   debugDepth   — print indentation only
packrat.ts:31,175,364     prose + LR-stack comments
split.ts:4,14,23,42,46,50 delimiter-nesting counter, unrelated to recursion
```

· only two `try` blocks on the whole parse path — `parser.ts:44` (packrat epoch) and `packrat.ts:390` — and
**neither catches**; both are `try/finally`.

So the failure mode is an uncaught host `RangeError` escaping `parse()`. The module's own declared recovery
posture cannot reach it: `Parser.recover()` (`parser.ts:653-688`) promises in its docstring
(`parser.ts:644-652`) that "each failed element produces a diagnostic but doesn't halt the overall parse" —
but its implementation inspects `state.isError` only, with no `try`. A thrown `RangeError` bypasses
`collectDiagnostic` (`:666`), bypasses `popLastDiagnostic` (`:674`), and unwinds straight out.

`lazy` is not incidental to this. It is the **only** construct in the algebra that makes unbounded recursion
expressible at all — the combinator graph is otherwise built eagerly and is necessarily a DAG
(`parser-band.md:118`: "cand-F proves the colour grammar proper is a DAG"). Every back-edge in every parse-that
grammar goes through `createLazyCached`. The depth hazard is therefore *lazy's* hazard, and lazy's constructor
has no slot to receive a bound: arity 1, `(fn)` only. This is exactly `W1.md:557`'s DEBT-3 requirement
("cand-O's single `lazy` back-edge to gain an explicit depth bound") stated from the library side.

**Falsifier attempted**: *"`recover()` is for grammar errors, not host errors; conflating them is a category
mistake."* Partially survives — the distinction is real, and I do not claim `recover()` should catch
`RangeError` by reflex. But the docstring makes an unqualified promise about not halting the parse, and on a
lazy grammar the single most likely halt is this one. **The finding stands, re-scoped**: it is a
documented-posture gap plus a missing depth parameter, not a demand that `recover()` grow a `catch`.

**Cheapest cure, aligned with `W2.md:250`**: give `Parser.lazy` a second parameter —
`static lazy<T>(fn: () => Parser<T>, maxDepth = Infinity)` — and have the arrow keep a closure-local counter,
returning `state.err(...)` past the bound. That converts the ceiling into an ordinary `ok:false` **by
construction**, which is exactly what `parser-band.md:118` asks for, and it costs one increment/decrement on a
path that already pays four frames per level.

---

### L-M4 — MAJOR — `getLazyParser` is a second, divergent cache: printing a lazy grammar builds a permanent shadow grammar with ids that can never appear in the memo table
**Provenance**: `lazy.ts:5-15` (cache #1, module-global `WeakMap`) vs `lazy.ts:19-23` (cache #2,
closure-local) · sole consumer `debug.ts:316-327` (`case "lazy"` → `getLazyParser(lazy)` → `print(p, p.id)`) ·
`fn` retained in `context.args` by `createParserContext("lazy", undefined, fn)` at `parser.ts:705` /
`lazy.ts:40` · packrat memo key is `(id, offset)` — `packrat.ts:79-99`.

The two caches are keyed on the same `fn` but are **never reconciled**. `createLazyCached` calls `fn()` and
keeps the result in its closure; `getLazyParser` calls `fn()` **again** and keeps *that* result in the WeakMap.
Since `fn` is `() => new Parser(...)` in every real grammar, the two results are different objects with
different `id`s, by construction.

**MEASURED**:

```
getLazyParser minted a SECOND tree: 3 parsers; stable across calls: true
```

i.e. after a lazy node's execution cache was already resolved, the debug path built three more parsers. Two
consequences:

1. **Permanent double allocation on a debug call.** The WeakMap entry lives as long as its key `fn` does — and
   `fn` is held in `context.args` for the lifetime of the `Parser`, which for a module-level grammar is the
   process. There is **no** `clearLazyCache()` export, though the module's siblings both have one
   (`resetPackrat()` — `packrat.ts:263`; `clearCollectedDiagnostics()` — `utils.ts:142`). Asymmetric reset
   surface.
2. **The printout is wrong where it matters most.** `parserPrint` emits ids from the shadow tree. Packrat
   memoises on `(id, offset)`. So debugging a memoised left-recursive grammar — the *only* kind that needs
   both the printer and the memo table — yields a printout whose ids will never appear in `MEMO`. The two
   diagnostic instruments cannot be cross-referenced.

**Falsifier attempted (and this one materially narrowed the finding)**: *"PT-01 says arming diagnostics couples
an unconditional `console.error(this.state.toString())` — so this shadow-tree cost lands on every failed parse
once armed."* **Rejected — checked.** `parser.ts:68` calls `ParserState.toString()`, which is
`statePrint` (`state.ts:135`, `debug.ts:141-...`). I read `statePrint` whole: it renders badge, offset, source
context, and the diagnostic extras from the *state*, and **never calls `parserPrint`**. So the error path does
**not** force `getLazyParser`. The shadow tree is forced only by an explicit `Parser.toString()` /
`.debug()` (`parser.ts:690-700`). **The finding survives at reduced blast radius**, and this narrowing is
recorded against any future over-read of PT-01 that assumes the diagnostics path drags the printer.

---

## 4 · MINORS

### L-m1 — MINOR — `getLazyParser` tests value-presence, not key-presence
`lazy.ts:8-11`: `const cached = LAZY_PARSER_CACHE.get(fn); if (cached !== undefined) …`. If `fn()` ever returns
`undefined`, the entry is written at `:13` and then **never served** — `fn()` re-runs on every call, forever,
with the WeakMap entry as pure dead weight. `WeakMap.has()` is the correct idiom.
**Falsifier**: *"`T` is always a `Parser`, which is never `undefined`."* Rejected: the signature is
`<T>(fn: () => T): T` — wholly unconstrained — and `core.ts:15` exports it publicly with that signature. Latent,
not dead. Survived as MINOR.

### L-m2 — MINOR — `createLazyCached`'s failure on a malformed `fn` is a nameless raw host `TypeError` (PT-07 class)
`lazy.ts:21-22`: `if (!cached) cached = fn(); return cached.parser(state)`. A `fn` returning `undefined` — the
one-keystroke mistake `Parser.lazy(() => { p })` (brace arrow, no `return`) — yields
`TypeError: Cannot read properties of undefined (reading 'parser')` with **no** parser name, no offset, no
context. It cannot be improved after the fact either: `createParserContext("lazy", undefined, fn)`
(`lazy.ts:40`, `parser.ts:705`) sets `context.parser = undefined`, so `parserPrint` can only render
`"unknown"` (`debug.ts:262-265`), and `debug.ts:318`'s `p.id` would throw a *second* `TypeError` on the same
object. This is the same posture O-15 **PT-07** names for non-string input — a raw host error at a boundary,
with the library's own naming machinery unable to help. `!cached` (falsy) rather than `=== undefined` also
means the failed construction is silently retried on every invocation rather than latched.
**Falsifier**: only reachable on a malformed `fn`. Granted — hence MINOR, not MAJOR. Survived.

### L-m3 — MINOR — the decorator binds to the prototype, so `this` is never the instance
`lazy.ts:36`: `descriptor.value!.bind(target)`. Under legacy method-decorator semantics `target` is the
**prototype** for an instance method, so `this` inside a decorated grammar method is the prototype and every
instance field reads `undefined`. The bind also happens once, at decoration time, so all instances share it.
`descriptor.value!`'s non-null assertion additionally throws a raw `TypeError` if applied to an accessor
(where `value` is absent).
**Falsifier**: only reachable if L-B1 is first cured. Chained-latent → MINOR. Survived.

### L-m4 — MINOR — duplication: `Parser.lazy` and the decorator body are the same three lines
`parser.ts:702-707` and `lazy.ts:37-42` construct the identical `new Parser(createLazyCached(f),
createParserContext("lazy", undefined, f))`, differing only in whether `f` is `fn` or the bound `method`.
Two spellings of one idea, split across a module boundary, in a **43-line** module. Goldilocks reading: the
file is not too long — it is **incoherent for its length**, holding three unrelated strategies (module-global
WeakMap, closure-local, decorator) of which one is dead and one is broken. The Goldilocks module here is
`createLazyCached` alone, ~7 lines, with `Parser.lazy` as its only wrapper.

### L-m5 — MINOR (import surface; also the falsifier that keeps lazy's dispatch choice safe) — the `flags` machinery is entirely dead, and one branch of it leaks an allocation
`createLazyCached` dispatches via `cached.parser(state)` (`lazy.ts:22`), **bypassing** `Parser.call()`
(`parser.ts:437-478`) and therefore all flag pre/post processing. I set out to file that as a MAJOR. It is not,
and the reason is a worse defect underneath:

- The **only** writer of `flags` in the entire tree is `parser.ts:496`, `flaggedParser.flags = this.flags | FLAG_TRIM_WS`.
- `flaggedParser` is constructed at `:492`, flagged at `:496`, and then **discarded** — `trim()` returns the
  separately-built `whitespaceTrim` parser at `:514-517`. Verified by grep: `flaggedParser` occurs at exactly
  two lines, 492 and 496, and at neither is it returned or stored.
- `FLAG_EOF` (`parser.ts:22`) is **read** at `:466` and **never written anywhere**.

Therefore `flags === 0` on every reachable `Parser`; `Parser.call()`'s entire body below `:440` — roughly 40
lines, including the whole `FLAG_EOF` trailing-content diagnostic at `:466-476` — is **unreachable**; and every
`.trim(whitespace)` call leaks one fully-constructed `Parser` (plus its `createParserContext` object and args
array) straight to the collector. Three defects in one site.

That unreachability is precisely the falsifier for my original claim: `.call()` ≡ `.parser()` today, so lazy's
bypass is currently sound. **Recorded at INFO/MINOR with the flag rot as the reason** — and flagged forward:
if anyone ever *fixes* `trim()` to return `flaggedParser`, `createLazyCached` silently starts dropping
whitespace trimming on every lazy node. Scope: `parser.ts` (import surface), reported here because it is the
sole reason lazy's dispatch choice is safe.

### L-m6 — MINOR — `"sideEffects": false` versus a load-bearing module-eval initializer reachable from `lazy.ts`
`package.json:"sideEffects": false` · `parser.ts:711` runs `_initWhitespace()` at module-eval time ·
`leaf.ts:395-398`: `export let whitespace: ReturnType<typeof regex>;` then
`function _initWhitespace() { whitespace = regex(/\s*/); whitespace.context.name = "whitespace"; }` — a
**mutable binding that is `undefined` until that top-level call runs** · `core.ts:2-5` further advertises "the
zero-side-effect primitive set". A bundler that honours `sideEffects: false` and drops `parser.js`'s evaluation
leaves `whitespace` undefined, and `trim()`'s default parameter (`parser.ts:481`) then dereferences it, as does
the `parser.context?.name === "whitespace"` dispatch at `:488`.
**Falsifier**: *"`parser.js` is always retained — `lazy.ts:1` imports `Parser` as a value."* Survives only
narrowly, and only via the decorator: `createLazyCached` — the export a `./core` consumer actually wants —
**never references `Parser` at all**. The single value-reference keeping `parser.js` alive from this module is
`new Parser(...)` at `lazy.ts:38`, inside the function L-B1 proves unusable. Cure a dead export, lose the
anchor. Survived as MINOR/latent.

---

## 5 · O-15 corroboration at the bytes (as instructed)

### 5.1 PT-01 — CONFIRMED, with a one-line precision note
```
dist/diagnostics-DDazRHgl.js:14:  state.expected = diagnosticsEnabled && label ? [label] : void 0;
```
Exact match for O-15's cite. `label` is a no-op unless armed. Source: `utils.ts:33` (and the accumulate arm at
`utils.ts:38-46`). The coupled effect:
```
dist/packrat-entry-CS1td-8B.js:881:      if (isDiagnosticsEnabled()) {
dist/packrat-entry-CS1td-8B.js:882:        console.error(this.state.toString());
```
O-15 cites `packrat-entry-*.js:881` — that line is the **guard**; the `console.error` is one line below at
`:882` (`:883` in `packrat-entry-46NYx4_U.cjs`). Since the guard *is* the coupling, this is a precision note,
**not** a contradiction — the claim "the two are reachable only together" is exactly right. Source:
`parser.ts:67-69`. Narrowing filed at L-M4: this path calls `statePrint`, **not** `parserPrint`.

### 5.2 PT-03 — CONFIRMED EXACTLY, both bundles
```
dist/packrat-entry-CS1td-8B.js:678: let PACKRAT_ARMED = false;
dist/packrat-entry-CS1td-8B.js:682:   if (!PACKRAT_ARMED) return null;      ← packratEnter
dist/packrat-entry-CS1td-8B.js:714:   if (!PACKRAT_ARMED) return;           ← resetPackrat
dist/packrat-entry-CS1td-8B.js:722:   PACKRAT_ARMED = true;                 ← makeMemoized
```
Every line number in O-15's PT-03 row matches the bytes. Whole-`dist` grep for `PACKRAT_ARMED = `:
```
packrat-entry-CS1td-8B.js:678, 722        packrat-entry-46NYx4_U.cjs:679, 723
```
Exactly two assignments per bundle — the initialiser and the arm. **No assignment back to `false` anywhere in
either bundle.** Source: `packrat.ts:156` / `:217` / `:266` / `:290`, and `resetPackrat` (`packrat.ts:263-273`)
demonstrably clears the three Maps without disarming, corroborating O-15's "leaves 139.3". I did **not**
re-bench (the latch is one-way and the law forbids arming it); the structural half is confirmed at the bytes.

### 5.3 PT-07 — CONFIRMED / reproduced
```
PT-07 success-undefined: undefined | failure: undefined | indistinguishable: true
```
`string("u").map(() => undefined).parse("u")` and `.parse("Z")` both return `undefined` and compare equal.
Provenance: `parse()` is `parseState(val).value` (`parser.ts:77-79`); on failure `parseStateInner` returns the
mutated `state` whose value was last set by whichever combinator failed. Non-string input: `parseState(val: string)`
(`parser.ts:34`) has **no** runtime guard, so `state.src.charCodeAt` / `.startsWith` (`leaf.ts:285,297`) throw a
raw host `TypeError`. I hit the same class incidentally with a duck-typed state
(`TypeError: state.unsafeSetValue is not a function`, thrown from `stringParser`).
**Nothing in `lazy.ts` adds a guard at either boundary.** O-15's posture — cure it with a named JS-boundary
invariant **above** parse-that — is the right call and is unaffected by anything in this module.

---

## 6 · Superlatives (L-18 runs both ways)

### S-1 — SUPERLATIVE — `createLazyCached`'s closure cache is load-bearing for **packrat soundness**, not merely a perf nicety
`lazy.ts:19-23` caches the constructed `Parser` for the closure's lifetime, which makes `parser.id`
(`parser.ts:18,25`) **stable across parses** — and packrat's memo key is `(id, offset)` (`packrat.ts:79-99`).
**MEASURED**: `Parser.lazy` minted 4 ids on the first parse and **0** on every subsequent parse, at every
depth tried. Had the arrow re-invoked `fn()` per parse, three things would break at once: `memoize()` would
never hit (fresh cells every parse), ids would march monotonically toward `MEMO_MAX_ID`'s hard `RangeError`
(`packrat.ts:71-77,90-98`), and `getCijKey`'s carefully-argued float64 budget would be spent on garbage. The
comment at `lazy.ts:17` sells this as an IC nicety; it is doing considerably more work than it advertises.
**L-B2 is the counterexample that proves it** — the decorator omits exactly this property and inherits exactly
those three failures.

### S-2 — SUPERLATIVE — the hot arrow is allocation-free and correctly minimal
`lazy.ts:20-23`, per invocation: one context-slot load, one branch that is perfectly predicted after the first
call, one property load, one call. **Zero** per-invocation allocation — no array, no closure, no wrapper state.
For a combinator library where the back-edge is on every recursive descent, this is the right shape, and it is
notably better than the `getLazyParser` sibling three lines above it, which pays a `WeakMap` hash lookup for
the same job.

### S-3 — SUPERLATIVE — `Parser` and `ParserState` are hidden-class transition-free, which is what keeps S-2's property load monomorphic
Verified **at the emitted bytes**, not inferred:
```
dist/packrat-entry-CS1td-8B.js:854  class Parser {
                              855    constructor(parser, context = {}) { this.parser = parser; this.context = context; }
                              859    id = PARSER_ID++;   860  state;   861  flags = FLAG_NONE;
dist/packrat-entry-CS1td-8B.js:286  class ParserState { … 300  expected;  301  suggestions = [];  302  secondarySpans = []; }
```
Class-field initialisers run before the constructor body, so property insertion order is identical for every
instance. The detail that matters: `state;` (`:860`) and **`expected;` (`:300`) are declared without
initialisers**, so both exist as `undefined` from birth — `parseStateInner`'s later `this.state = errorState`
(`parser.ts:66`) and `mergeErrorState`'s `state.expected = [label]` (`utils.ts:33,45`) therefore add **no**
property and trigger **no** map transition on the error path. Only two sites assign a `Parser` property from
outside the class (`parser.ts:496`, `:640`) and both write pre-existing fields. All `Parser` instances share
one map, which is exactly why `cached.parser` at `lazy.ts:22` stays monomorphic. Quiet, deliberate, and
correct.

### S-4 — SUPERLATIVE (a falsification I attempted and **failed** to land) — the module's stated IC rationale survived attack
`lazy.ts:17` claims the closure-local cache "avoids mutating function objects (megamorphic IC pollution)". I
hypothesised the *opposite* hazard: since every lazy arrow originates from a single `FunctionLiteral` inside
one `createLazyCached`, all of them plausibly share one `SharedFunctionInfo` and one feedback vector, so the
`cached.parser(state)` **call** site would go megamorphic once ≥5 distinct lazy nodes exist — which would make
the comment's boast half-empty.
**MEASURED**, 1 vs 16 distinct lazy nodes driven through the same arrow, warmed, same total invocation count:
```
ns per lazy-arrow invocation — 1 distinct lazy node: 71.5 | 16 distinct lazy nodes: 70.9 | ratio: 0.99x
```
**Hypothesis NOT SUPPORTED.** Honest bound, stated rather than buried: the probe allocates a `ParserState`
per call and the ~70 ns is allocation-dominated, so a few-ns IC effect could hide inside it; N=1, one machine,
one node build. The decisive instrument is `--trace-ic` over a written harness, which this lane's single-write
law forbids, and `%GetFeedbackVector` is unavailable in node v26. Recorded as tested-and-not-supported rather
than dropped, because L-18 runs both ways and a failed attack is evidence too.

---

## 7 · Ledger

| id | sev | claim | provenance | falsifier outcome |
|---|---|---|---|---|
| L-B1 | **BLOCKER** | decorator throws at class-definition time under the repo's own tsconfig | `lazy.ts:36`; `tsconfig.json`; TS 5.9.3; P1 | did not survive |
| L-B2 | **BLOCKER** | decorator does not tie the knot; ~5 parsers per depth level, retained | `lazy.ts:37-42`; P2/P3 (15→+30 vs 4→0) | did not survive |
| L-M1 | MAJOR | depth ceiling not constant; cold 2,833 vs pinned 7,761 (2.74×); hysteresis after first overflow | 13-process cold bisect; O-15 PT-04; W1:549,573; W2:831 | survived as scope note only |
| L-M2 | MAJOR | `Parser.state` stale-success after a thrown `RangeError` | `parser.ts:51-75`; measured `offset=2,value=["c","c"],isError=false` | did not survive |
| L-M3 | MAJOR | no depth guard/parameter; `recover()` cannot catch the overflow it invites | `Parser.lazy.length===1`; grep; `parser.ts:653-688` | survived; finding re-scoped |
| L-M4 | MAJOR | dual cache → permanent shadow grammar with ids absent from `MEMO` | `lazy.ts:5-15` vs `19-23`; `debug.ts:318`; +3 parsers measured | survived at reduced radius |
| L-m1 | MINOR | `getLazyParser` value-presence guard; should be `.has()` | `lazy.ts:8-11` | did not survive |
| L-m2 | MINOR | nameless raw `TypeError` on malformed `fn`; no negative latch | `lazy.ts:21-22`; `context.parser=undefined` | survived → MINOR |
| L-m3 | MINOR | decorator binds to prototype; `this` never the instance | `lazy.ts:36` | chained-latent → MINOR |
| L-m4 | MINOR | `Parser.lazy` ≡ decorator body; 3 strategies in 43 lines | `parser.ts:702-707`; `lazy.ts:37-42` | n/a |
| L-m5 | MINOR | `flags` machinery wholly dead; `flaggedParser` leaked per `.trim()`; `FLAG_EOF` never written | `parser.ts:22,466,492-496,514-517` | is itself lazy's safety falsifier |
| L-m6 | MINOR | `sideEffects:false` vs `_initWhitespace()` module-eval anchor | `package.json`; `parser.ts:711`; `leaf.ts:395-398` | survived narrowly |
| S-1 | SUPERLATIVE | closure cache is load-bearing for packrat `(id,offset)` soundness | `packrat.ts:79-99`; 4→0 ids measured | — |
| S-2 | SUPERLATIVE | hot arrow allocation-free, correctly minimal | `lazy.ts:20-23` | — |
| S-3 | SUPERLATIVE | `Parser`/`ParserState` transition-free at the emitted bytes | `dist/…:286-302, 854-861` | — |
| S-4 | SUPERLATIVE | stated IC rationale survived my falsification attempt (0.99×) | measured 71.5 vs 70.9 ns | attack failed, recorded |

**Totals: 12 defects (2 BLOCKER · 4 MAJOR · 6 MINOR) · 4 superlatives.**

**One-line verdict (pass 1)**: keep `createLazyCached` verbatim and give it a depth parameter; delete `lazy` and
`getLazyParser`, folding the printer onto the execution cache — and re-qualify PT-04's 7,761 as a warm-path
reading before any gate is built on it.

---

# 8 · PASS 2 — independent re-audit, folding pass 1

**Seat**: claude-opus-5[1m], 2026-08-04, independent of §0–§7.
**Substrate**: `/Users/mkbabb/Programming/parse-that` @ **`ef10d5b`** (2026-07-05), main checkout, READ-ONLY.
No worktree, no frozen root, no `~/Documents/Codex` path entered.
`/Users/mkbabb/Programming/parse-that-css-totality-p2` → **does not exist** (re-verified). **No STOP finding.**
**Runtime**: node **v26.0.0**, darwin arm64. **Writes**: this file only.
**Law**: every probe ran in a throwaway `node --input-type=module -e` process against `dist/parse.js`. **No probe
called `memoize()`, `mergeMemos()`, or `enableDiagnostics()`** — `PACKRAT_ARMED` (`packrat.ts:156`) and
`diagnosticsEnabled` (`utils.ts:6`) stayed `false` throughout. The one finding that would require arming
(**N-1**) is marked **ANALYTIC** and ships with the probe someone else may run in a disposable process.

**Relationship to pass 1**: pass 2 **confirms** L-B1, L-B2, L-M4, L-m1, L-m2, L-m3, L-m5 by independent probe
(numbers below), **corroborates** L-M1's thesis with a third probe shape, and **contradicts pass 1 nowhere**.
Where pass 1 already owns a row, pass 2 does not re-file it.

### 8.0 · Independent confirmations of pass-1 rows (probes re-run from scratch)

| pass-1 row | pass-2 probe | result |
|---|---|---|
| **L-B1** | `lazy(function m(){…}, {kind:"method",name:"m"})` — TC39 call shape | `TypeError: Cannot read properties of undefined (reading 'value')`. Also `lazy.length === 3` — the declared arity itself announces the legacy shape. **CONFIRMED.** |
| **L-B2** | legacy shape simulated exactly as `__decorate` does it: `lazy(G.prototype,"rule",desc)` then `Object.defineProperty` | `g.rule() === g.rule()` → **false**, ids 37 / 38. **CONFIRMED** by a second, independent construction. |
| **L-m3** | same probe, with a real instance field: `class G { constructor(tok){this.tok=tok} rule(){ return string(this.tok) } }` | `new G("a").rule().parse("a")` → `TypeError: Cannot read properties of undefined (reading 'length')` — i.e. `string(undefined)`, because `this` is `G.prototype`. Pass 1 filed this **analytically**; pass 2 **executes it**. The prototype bind is not latent-by-reasoning, it is a reproduced crash. |
| **L-M4** | `let calls=0; fn=()=>{calls++; return digits.or(string("x"))}` | `p.parse("123")` → `calls=1`; `p.toString()` → `calls=2`. Parse-time inner `Parser.id = 38`, print-time inner `Parser.id = 39`, **same object → false**. **CONFIRMED**, and note the sharper corollary: `debug.ts:321-322` memoises `PARSER_STRINGS` under the *shadow* ids, so the printer's own cycle guard (`debug.ts:257`, `:339`) is keyed on a graph that never executes. |
| **L-m1** | `getLazyParser(() => undefined)` ×3 | body invoked **3** times — the WeakMap entry is written and never served. **CONFIRMED.** |
| **L-m2** | `Parser.lazy(() => undefined).parse("a")` ×3 · `Parser.lazy(() => { throw … })` ×3 | `TypeError: Cannot read properties of undefined (reading 'parser')` **every** parse; body re-invoked **3/3** in both cases. **CONFIRMED** — there is no negative latch for either a bad return *or* a throwing constructor. |
| **L-m5** | `inner.flags = 1 /* FLAG_TRIM_WS */; Parser.lazy(() => inner).parseState("   a")` | `isError = true` — the `.call()` path would have trimmed and matched. **CONFIRMED**, including pass 1's falsifier: `grep -rn '\.flags' src/parse/*.ts` shows the only write is `parser.ts:496` on the discarded `flaggedParser`. Latent, exactly as pass 1 rated it. |

---

### N-1 — **MAJOR** (ANALYTIC — the latch is one-way and the law forbids arming it) — `createLazyCached` defers parser **construction** into the parse, falsifying the arming invariant `packrat.ts` asserts in prose

**Provenance**: `lazy.ts:21` (`if (!cached) cached = fn();`) · `parser.ts:43,47` (`packratEnter` / `packratExit`
bracket the parse) · `packrat.ts:216-217`, `:243-244`, `:290` (the latch machinery) · the invariant text at
**`packrat.ts:284-289`**.

`packrat.ts:284-289` does not merely describe behaviour — it asserts a guarantee:

> "Arming at CONSTRUCTION (not first invocation) guarantees the latch is set before any memoized parse can
> open its epoch — the armed path stays byte-identical. The latch never disarms."

That guarantee holds only while construction precedes invocation. **`createLazyCached` is the one mechanism
in the algebra that makes construction happen *during* invocation**, and nothing forbids a lazy body from
containing a `memoize()`. For `Parser.lazy(() => memoize(p))`:

1. `parseState` calls `packratEnter()` (`parser.ts:43`). `PACKRAT_ARMED` is still `false`, so
   `packrat.ts:217` returns `null` — **no epoch is opened, no tables are installed.**
2. Mid-parse, `lazy.ts:21` evaluates the body → `makeMemoized` runs → `packrat.ts:290` sets
   `PACKRAT_ARMED = true`. The latch arms **inside** a parse that was already admitted as unarmed.
3. The memoized node then reads and writes the module-global `MEMO` / `HEADS` / `GROWING`
   (`packrat.ts:133-134`, `:193`) with **no epoch installed** — the very state `packratEnter` exists to
   isolate.
4. `packratExit(null)` returns early at `packrat.ts:244`. Nothing is restored; nothing is cleared.

**Residue.** That first parse's memo cells — retaining its `value`s and offsets — *become* the module-global
tables for the process. Every later top-level parse snapshots them, installs fresh Maps, and **restores the
dirty ones on exit** (`packrat.ts:218-230`, `:245-249`), so they are never read again and never freed.
`resetPackrat()` is the only cure, and O-15/PT-03 measured that it clears the store **without** disarming
(139.3 ns, still armed).

**What I claim and what I do not.** I traced both hazard classes the epoch machinery was built for and found
**no wrong-answer window**: cross-input (PT-B1) is closed because every subsequent parse installs empty
tables, and re-entrancy (PT-Q1) is closed because a nested `parseState` sees the now-armed latch. So this is
**a violated stated invariant plus a process-lifetime retention leak — not a wrong answer.** Pass 1 did not
reach this row; it is the sharpest structural finding of either pass because it shows the two modules'
guarantees are coupled through a seam neither module names.

**Falsifier / the probe to run in a fresh, disposable process** (I did not run it — arming is irreversible):
build `Parser.lazy(() => memoize(inner))`, parse once, then assert the next `packratEnter()` snapshot's
`memo.size > 0`. **If it is 0, this finding is wrong and I withdraw it.** Second falsifier: show that a
`memoize()` inside a lazy body is forbidden somewhere — it is not; `packrat.ts:482-488` exports `memoize`
publicly and `memoize.test.ts:17` already composes it with `Parser.lazy` in the other order
(`memoize(Parser.lazy(…))`), which is safe precisely because it constructs eagerly.

**Interaction with pass 1's L-B2.** L-B2 shows a decorator-built grammar mints a fresh `id` per recursion
level, so `memoize()` never hits. N-1 shows the *ordering* hazard. Together: a decorator-built, lazily-armed
memoized grammar pays PT-03's measured **1.47×** for zero benefit **and** arms the latch from inside a parse
that never opened an epoch. That is the worst cell in the matrix, and it is reachable through documented API.

**Bearing on X.P.W1 §3.5.** W1 requires `PACKRAT_ARMED` asserted false "at entry **and** at exit of every
bench cell". N-1 is the proof that the exit assertion is load-bearing rather than belt-and-braces: a cell can
arm *itself* mid-parse, and an entry-only assertion would pass while every later cell in that process
measures at the armed rate.

---

### N-2 — MINOR — PT-07's raw-`TypeError` boundary posture recurs at a **`./core` public export**: `getLazyParser`

**Provenance**: `lazy.ts:12` (`const parser = fn();`, no guard) · exported at `index.ts:7` **and**
`core.ts:15` · typed `getLazyParser<T>(fn: () => T): T` (`dist/lazy.d.ts:3`), with `T` unconstrained.

```
API-TEST (dist/parse.js, node v26.0.0) — 5/5 non-function inputs:
  getLazyParser(null)      -> TypeError: fn is not a function
  getLazyParser(undefined) -> TypeError: fn is not a function
  getLazyParser(42)        -> TypeError: fn is not a function
  getLazyParser("str")     -> TypeError: fn is not a function
  getLazyParser({})        -> TypeError: fn is not a function
```

This is **the identical 5/5 raw-`TypeError` shape O-15 recorded as PT-07**, at a *different* public entry
point. Pass 1's §5.3 reproduced PT-07 at `parseState`; the posture is wider than that one door. The
consequence is directly actionable for the program: **X.P.W1 §3.9's JS-boundary invariant, if asserted only
over `parse`/`parseState`, leaves a hole exactly the width of the `core` subpath.** Either the invariant
covers every export that can receive consumer-supplied values, or it is a guard on the front door of a house
with `./core` open at the back.

*Falsifier*: `getLazyParser` is arguably internal-by-intent — pass 1's census and mine agree it has exactly
**one** in-tree caller, `debug.ts:318`. Then the defect is that it is exported at all (see N-5), and the row
converts rather than disappears.

---

### N-3 — MINOR — the load-bearing V8 rationale at `lazy.ts:17` is **stale**, and now contrasts against a strawman the file itself used to contain

**Provenance**: `lazy.ts:17` · `git show 37f958f:typescript/src/parse/lazy.ts` ·
`git show 7ec4b31:typescript/src/parse/lazy.ts`.

```
lazy.ts:17  // Closure-local lazy cache — avoids mutating function objects (megamorphic IC pollution)
```

Git shows the comment **was true when written**. At `37f958f` (2026-02-27) `getLazyParser` was:

```ts
export function getLazyParser<T>(fn: (() => any) & { parser?: any }): any {
    if (fn.parser) return fn.parser;
    return (fn.parser = fn());          // ← mutates the function object
}
```

At `7ec4b31` (2026-03-30, *"refactor(ts): centralize as-any casts into unsafeSetValue/unsafeCall"*) that body
was replaced by the `WeakMap` now at `lazy.ts:5-15` — and the comment was not touched. As of HEAD **neither**
function in the file mutates a function object, so the stated rationale distinguishes `createLazyCached` from
nothing present. A reader auditing V8 shapes is handed a present-tense justification for a decision whose
stated alternative was deleted four months ago.

**This reframes pass 1's S-4 without contradicting it.** Pass 1 attacked the comment's *IC claim* empirically
and honourably failed to land the attack (0.99×). Pass 2 attacks the comment's *referent*: the claim survives
as physics, but it no longer describes a choice this file is making. Both readings are correct and they are
about different halves of one sentence.

*Falsifier*: read the comment as historical narration and it is harmless. It is written in the present tense,
positioned as the rationale for the function immediately below it, and is the only design commentary in the
module.

---

### N-4 — MINOR — the `lazy.ts` ↔ `parser.ts` circular **value** import was deliberately engineered around at `37f958f`, then re-introduced at `7ec4b31`, and exists solely to serve the dead decorator

**Provenance**: `lazy.ts:1` (value import of `Parser`) · `parser.ts:5` (value import of `createLazyCached`) ·
`lazy.ts:38` (the sole value-use) · `lazy.ts:3,40` (`createParserContext`, also decorator-only) ·
`git show 37f958f:typescript/src/parse/lazy.ts`.

The `37f958f` version had **no such edge**, and carried an explicit mechanism plus a comment naming the hazard:

```ts
// Forward reference — set by parser.ts to avoid circular import at module init
let _Parser: any;
export function _setParserClass(cls: any) { _Parser = cls; }
```

`7ec4b31` deleted that mechanism and took the direct import. The **only** value-use of `Parser` in the current
file is `lazy.ts:38` (`new Parser(...)`), inside the decorator; the only use of `createParserContext`
(`lazy.ts:3`, `:40`) is likewise the decorator. Delete the dead-and-broken decorator (L-B1/L-B2) and **both
imports become type-only** under `verbatimModuleSyntax` — `lazy.ts` becomes a true leaf, the cycle is severed,
and the module-init ordering question about `LAZY_PARSER_CACHE` (`lazy.ts:5`) evaporates.

**This is the precise counterpart to pass 1's L-m6**, and the two rows should be read together: L-m6 shows
that `lazy.ts:38` is the *anchor* keeping `parser.js` evaluated for a `./core` consumer, and warns "cure a
dead export, lose the anchor". N-4 supplies the history — the anchor is an artifact of a regression, not a
design, and the pre-regression tree solved the same problem without it. **The cure for both is the same and it
is not "keep the dead decorator": it is to make `_initWhitespace`'s effect explicit rather than to rely on an
accidental value-import to drag it in.**

*Falsifier, and it bounds the claim*: severing this edge does **not** unbundle anything — see N-5. `./core`
drags packrat regardless, because `parser.ts:7` imports `packratEnter`/`packratExit` directly and calls them
at `parser.ts:43`/`:47`. The cycle is also currently benign at runtime: nothing in `lazy.ts`'s module body
constructs a `Parser`. Hygiene and regression, not a live fault.

---

### N-5 — INFO — `core.ts`'s "never pulls the diagnostics accumulator, the packrat tier" is **false at the built bytes**

**Provenance**: claim at `core.ts:3-5` · built truth at `dist/core.js:1` · chunk `dist/packrat-entry-CS1td-8B.js`.

`core.ts:3-5` states: *"A consumer that imports only this never pulls the diagnostics accumulator, the packrat
tier, or the json/csv domain parsers."* The emitted entry point is one line:

```js
dist/core.js:1  import { P, a, b, c, d, e, f, g, h, l, j, r, s, n, t, w } from "./packrat-entry-CS1td-8B.js";
```

One chunk, **40,576 bytes**, containing `PACKRAT_ARMED` (`:678`) and importing `diagnosticsEnabled` from
`diagnostics-DDazRHgl.js` at `:1`. The json/csv third of the claim **is** honoured (`grep -n
'jsonParser\|csvParser'` over the chunk → no match); the other two thirds are not. Pass 1's L-m6 cites this
docstring; pass 2 falsifies it at the bytes.

**Not lazy's fault, and I will not pretend otherwise**: the packrat pull comes from `parser.ts:7`, the
diagnostics pull from `state.ts:2` → `debug.ts:6`. Severing `lazy.ts:1` (N-4) changes neither. What **is** in
scope: `core.js` re-exports `createLazyCached` (`d`), `getLazyParser` (`h`), and `lazy` (`l`) — three of
eighteen `core` exports — of which one has a single in-tree caller in the **debug** module and one is dead and
throws on first use. Two of three do not belong on a surface that calls itself "the zero-side-effect primitive
set".

*Falsifier*: `package.json` declares `"sideEffects": false` and the dist annotates the WeakMap
`/* @__PURE__ */` (`packrat-entry-CS1td-8B.js:2`), so a tree-shaking bundler may drop the unreached halves for
an app consumer. That mitigates bundle size; it does not make the docstring true, and it does nothing for a
CJS/`require` consumer — and pass 1's L-m6 shows honouring `sideEffects:false` has its own hazard.

---

### N-6 — (extends **L-M1**, not a separate defect) — a third probe shape, a frame census, and the arithmetic that bounds what a leaner `lazy` could ever buy

Pass 1 measured the **recursive-grammar** ceiling cold (2,833) and warm (8,191), and found overflow
hysteresis. Pass 2 measured a **different shape** — the one PT-04's wording most directly describes ("`Parser.lazy`
… deepest successful **nesting**") — plus the per-level frame cost pass 1 asserted analytically.

| shape | probe | measured | stability |
|---|---|---|---|
| **N nested `Parser.lazy` wrappers** over `string("a")`, then `.parse("a")`, binary-searched | `for(i<n){const inner=p; p=Parser.lazy(()=>inner)}` | deepest OK **10,336**, `RangeError` at 10,337 | **10,336 / 10,336 / 10,336** — three fresh node processes |
| **one self-recursive back-edge** | `expr = any(string("(").next(Parser.lazy(()=>expr)).skip(string(")")), string("x"))` on `"("*n + "x" + ")"*n` | deepest OK **6,203**, `RangeError: Maximum call stack size exceeded` at 6,204 | single run |
| **frames per recursion level** | `new Error().stack`, `stackTraceLimit=400`, nesting 2 / 3 / 6 → 22 / 27 / 42 stack lines | **5**, exactly linear (two independent deltas both = 5) | — |

The five frames, innermost-out, read off the captured stack: `anyParser` → **the `createLazyCached` closure**
→ `unsafeCallRaw` → `next` → `skip`.

**Three consequences, each bounded:**

1. **Three shapes, one artifact, three ceilings — 2,833 (pass 1, cold) / 6,203 / 10,336.** Pass 1 proved the
   number moves with **JIT state** and **prior-overflow state**; pass 2 proves it moves with **grammar shape**
   by a factor of 3.6× *between two shapes measured minutes apart in identical cold processes*. The two
   passes attack the same pin from orthogonal directions and agree: **`7,761` is not a property of the
   library.** Neither is `10,336`.
2. **The lazy closure is exactly 1 of 5 frames per level.** Therefore the *entire* achievable win from
   deleting the lazy indirection is ~25% of stack depth (5 → 4 frames), not an order of magnitude. This is
   evidence **for** `parser-band.md:118` DEBT-3 and `W2.md:250`'s "depth as an algebra parameter" — and
   decisive evidence **against** any hope that a leaner `lazy` is the cure. Pass 1's L-M3 proposed
   `static lazy<T>(fn, maxDepth = Infinity)`; N-6 is the quantitative case that this is the *only* posture the
   measurement supports.
3. **PT-04's probe source is not published**, so I cannot say which construction differs from mine. My
   construction is pasted above verbatim precisely so it is falsifiable. **W2.md:831 should paste the probe,
   not the constant** — a born-RED gate whose baseline no one can reconstruct cannot be turned GREEN by
   measurement.

*Falsifier*: publish PT-04's probe and re-run all three shapes in one process. If PT-04's construction also
yields 10,336 here, item 3 is a measurement error and I withdraw it; items 1 and 2 stand on pass 1's cold
bisect and this frame census independently.

---

### N-7 — INFO — X.P.W1's pinned substrate `2636c238` is **not reachable** from the read-only main checkout

`W1.md §2` states the ten gates are "all ten RED at HEAD **`2636c238`**, measured 2026-08-03".

```
$ git -C /Users/mkbabb/Programming/parse-that cat-file -t 2636c238
fatal: Not a valid object name 2636c238
```

This checkout is at `ef10d5b` (2026-07-05), and `git log --since=2026-07-20 -- typescript/src/parse/` is
**empty** — no source commit has touched the parse tree since. W2-opus-author.md:765's "the three source
commits landed 07-29" therefore describes a tree that is not this one.

**Consequence for anyone folding either pass**: all SOURCE cites in this file resolve against `ef10d5b`. If
the X.P substrate diverges, `lazy.ts` line numbers must be re-resolved. Mitigating: `lazy.ts` has **three
commits in its entire history** (`37f958f` 2026-02-27, `e47c241` 2026-03-07, `7ec4b31` 2026-03-30), so
divergence is unlikely — but "unlikely" is not "verified", and I did not enter another root to check, because
the law forbids it.

---

### N-8 — INFO — evidence hygiene: **every** `dist:line` cite in O-15, in pass 1, and in pass 2 is against a **gitignored** build

`.gitignore:6` = `dist/`. `typescript/dist/` is a local artifact (mtime 2026-07-29 14:20), not a tracked one.
O-15's cites (`dist/diagnostics-DDazRHgl.js:14`, `dist/packrat-entry-*.js:881`) and both passes' cites
(`packrat-entry-CS1td-8B.js:2 / 12-18 / 19-26 / 234 / 678 / 682 / 714 / 722 / 881 / 1411`) are line numbers
into bytes that **cannot be regenerated from the repository at a commit**.

They reproduce here only because the chunk hashes happen to match — which is itself how I know the artifact I
measured *is* the artifact O-15 measured, and is therefore the sole warrant for pass 1 §5.1/§5.2 and pass 2
§0 asserting PT-01/PT-03 "at the bytes" rather than merely at the source. **That warrant is one
`npm run build` from evaporating.**

X.P.W1 §3 G-3 already requires a sha256 manifest for the rescued harness tree. The same discipline is owed to
any dist cite a gate will read: pin the tarball — as cand-O did (`sha256(dist/subpaths/css.js)` =
`8b5381…0c42`, `parser-band.md`) — or the cite decays silently.

---

### N-9 — INFO — zero direct test coverage for the module on the recursion critical path

No file under `typescript/test/` names `getLazyParser` or `createLazyCached`
(`grep -rln` → empty). The decorator has zero uses in parse-that **or** value.js
(`grep -rn '@lazy\b'` over both trees → empty). `Parser.lazy` is exercised only *transitively* — memoize 6 ·
math 4 · reentrancy 3 · json 2 · print 1 — always as a means to some other assertion.

There is consequently no test for: the double-construction (L-M4), the per-call cache (L-B2), a body returning
`undefined` (L-m1/L-m2), the flags bypass (L-m5), the stale `.state` after overflow (L-M2), the boundary
posture (N-2), the construction-ordering invariant (N-1), or **any depth bound whatsoever**. The ceiling is
entirely undefended by the suite — which is precisely why the 7,761 pin went four months without anyone
noticing it is not a constant.

X.P.W1 §3.7 ("declare the corpus's maximum recursion depth against the measured `Parser.lazy` ceiling") is a
**corpus-side** mitigation for a **library-side** gap. The library-side gate — *a test asserting the depth
bound is a returned failure, not a thrown one* — does not exist, and is exactly what `parser-band.md:118`
DEBT-3 asks for.

---

## 8b · Pass-2 superlatives (L-18 runs both ways)

### S-5 — SUPERLATIVE — deferring **construction** makes the back-edge *structurally visible*, which is the only reason the band's idiom gate is possible at all

`parser.ts:702-707` tags every lazy node `createParserContext("lazy", undefined, fn)`; `"lazy"` is a
first-class member of the `parserNames` union (`state.ts:149`); and the body function is retained as
`context.args[0]`. Consequence: **the back-edges of a grammar are enumerable on the built graph.**

That is exactly what `parser-band.md` relied upon to rule the band: cand-O's idiom was *"measured structurally
by walking the built combinator graph (no `.opt()` child of any `all()`, **exactly 1 lazy**, 0 memoize) — a
grep cannot prove that, the graph can."* `W2.md:810`'s G-10/G-11 idiom-and-depth walks inherit the same
dependency. A parser library in which recursion is expressed by an untagged closure cannot be audited this
way, and the adjudication that ruled cand-O the winner would have had no instrument.

*Falsifier, and it is the honest one*: this is the **same design decision** as L-M4. Retaining `fn` on the
context is what lets `debug.ts:318` re-invoke it behind the executing graph's back and mint the shadow tree.
The superlative and the defect are one choice read from two sides — and the cure L-M4 proposes (fold the
printer onto the execution cache) preserves the superlative **entirely**, which is what makes it the right
cure.

### S-6 — SUPERLATIVE — the cache is **input-independent by construction**, so it introduces none of the hazard class that bit packrat twice

`createLazyCached`'s `cached` (`lazy.ts:19`) is keyed on **nothing** — not on `src`, not on offset, not on an
epoch. A lazy node resolves once and the resolved parser serves every input for process lifetime. That is why
`lazy` needs no analogue of `packratEnter`/`packratExit` (`packrat.ts:216-250`), no `CURRENT_SRC` anchor
(`packrat.ts:186`), and why it appears in **neither** PT-B1 (cross-input mis-restore, fixed 0.12.0) nor PT-Q1
(re-entrancy regression, fixed 0.13.0) — the two soundness bugs that cost packrat a tranche each.

The correct amount of state on which to key a *grammar-shape* cache is zero, and this module keys on zero.
Read against pass 1's S-1 (the cache is load-bearing because it makes `parser.id` **stable**), the pair states
the whole property: stable in identity, independent of input. Those two together are what make `(id, offset)`
a sound memo key at all.

*Falsifier, and it bounds the praise*: the safety is a property of well-behaved bodies, **not an enforced
invariant**. A body closing over mutable configuration — `Parser.lazy(() => build(currentOptions))` — freezes
whatever `currentOptions` was at the first parse, silently, forever, with no diagnostic. Nothing in the type
(`() => Parser<T>`, `lazy.ts:18`) or the runtime forbids it, and L-m2/N-1 show the module has no vocabulary
for "resolution was wrong, try again". The property is real; the guarantee is not.

---

# 9 · Merged ledger (pass 1 + pass 2)

| id | sev | claim | pass | falsifier outcome |
|---|---|---|---|---|
| L-B1 | **BLOCKER** | decorator throws at class-definition time under the repo's own tsconfig | 1, re-probed by 2 | did not survive |
| L-B2 | **BLOCKER** | decorator does not tie the knot; ~5 parsers per depth level, retained | 1, re-probed by 2 | did not survive |
| L-M1 | MAJOR | depth ceiling not constant; cold 2,833 vs pinned 7,761; JIT + hysteresis dependence | 1, **extended by N-6** | survived as scope note only |
| L-M2 | MAJOR | `Parser.state` holds stale success after a thrown `RangeError` | 1 | did not survive |
| L-M3 | MAJOR | no depth guard/parameter; `recover()` cannot catch the overflow lazy invites | 1 | survived; re-scoped |
| L-M4 | MAJOR | dual cache → permanent shadow grammar; ids absent from `MEMO` | 1, re-probed by 2 | survived at reduced radius |
| **N-1** | **MAJOR** | **lazy defers construction into the parse, falsifying `packrat.ts:284-289`'s arming invariant; cells written with no epoch + process-lifetime retention** | **2** | ANALYTIC; probe published, not run (law) |
| L-m1 | MINOR | `getLazyParser` value-presence guard; should be `.has()` | 1, re-probed by 2 | did not survive |
| L-m2 | MINOR | nameless raw `TypeError` on malformed `fn`; no negative latch | 1, re-probed by 2 | survived → MINOR |
| L-m3 | MINOR | decorator binds to prototype; `this` never the instance | 1 (analytic), **executed by 2** | promoted from chained-latent to reproduced |
| L-m4 | MINOR | `Parser.lazy` ≡ decorator body; three strategies in 43 lines | 1 | n/a |
| L-m5 | MINOR | `flags` machinery wholly dead; `flaggedParser` leaked per `.trim()`; `FLAG_EOF` never written | 1, re-probed by 2 | is itself lazy's safety falsifier |
| L-m6 | MINOR | `sideEffects:false` vs `_initWhitespace()` module-eval anchor | 1, **historicised by N-4** | survived narrowly |
| **N-2** | MINOR | PT-07's raw-`TypeError` posture recurs at the `./core` export `getLazyParser` (5/5) | **2** | converts rather than disappears |
| **N-3** | MINOR | `lazy.ts:17` IC rationale stale since `7ec4b31`; contrasts against a deleted strawman | **2** | survived (git-dated) |
| **N-4** | MINOR | parser↔lazy cycle engineered around at `37f958f`, re-introduced at `7ec4b31`; decorator-only | **2** | survived, bounded by N-5 |
| **N-5** | INFO | `core.ts:3-5`'s no-packrat/no-diagnostics claim false at the built bytes (40,576-byte chunk) | **2** | survived; not lazy's fault, stated |
| **N-6** | — | *extension of L-M1*: 10,336 (×3 stable) / 6,203 / 2,833 across three shapes; **5 frames per level, lazy is 1** | **2** | — |
| **N-7** | INFO | W1's pinned substrate `2636c238` is not an object in this checkout | **2** | survived |
| **N-8** | INFO | all `dist:line` cites (O-15's and both passes') are against a gitignored build | **2** | survived |
| **N-9** | INFO | zero direct tests; no depth test anywhere in the suite | **2** | survived |
| S-1 | SUPERLATIVE | closure cache load-bearing for packrat `(id, offset)` soundness | 1 | — |
| S-2 | SUPERLATIVE | hot arrow allocation-free, correctly minimal | 1 | — |
| S-3 | SUPERLATIVE | `Parser`/`ParserState` hidden-class transition-free at the emitted bytes | 1 | — |
| S-4 | SUPERLATIVE | stated IC rationale survived pass 1's falsification attempt (0.99×) | 1, **reframed by N-3** | attack failed, recorded |
| **S-5** | SUPERLATIVE | the back-edge is structurally visible → the band's graph-walk idiom gate is possible | **2** | shares its root with L-M4 |
| **S-6** | SUPERLATIVE | cache input-independent by construction → immune to the PT-B1 / PT-Q1 hazard class | **2** | property real, guarantee unenforced |

**TOTALS: 20 defects (2 BLOCKER · 5 MAJOR · 8 MINOR · 5 INFO) · 6 superlatives.**
*(N-6 is counted as an extension of L-M1, not as a separate defect.)*

## 9a · Corpus reconciliation

| corpus id | disposition |
|---|---|
| **O-15 / PT-01** | **CONFIRMED at the bytes** by both passes — `diagnostics-DDazRHgl.js:14` (guard) + `packrat-entry-CS1td-8B.js:880-881` (`isDiagnosticsEnabled()` → `console.error`). Pass 1's precision note about `:881` being the guard and `:882` the effect stands. Pass 1's L-M4 narrowing — the error path calls `statePrint`, **never** `parserPrint` — is the correct bound on any over-read of PT-01. |
| **O-15 / PT-03** | **CONFIRMED EXACTLY at the bytes**, `:678` / `:682` / `:714` / `:722`, exactly two assignments per bundle, no disarm anywhere. **Extended by N-1**: `lazy.ts:21` is the mechanism by which arming can occur *after* `packratEnter` has already declined to open an epoch — which falsifies the guarantee `packrat.ts:284-289` states in prose. |
| **O-15 / PT-04** | **CHALLENGED by both passes, from orthogonal directions.** Pass 1: JIT state (2.89× intra-process) + overflow hysteresis. Pass 2: grammar shape (3.6× between two cold shapes) + a 5-frames-per-level census bounding any lazy-side cure at ~25%. Neither pass claims O-15's box would read differently; both claim **a single scalar cannot describe this quantity on any box**. `W1.md:549,573` and `W2.md:831` must paste the probe and a `(shape, JIT state, prior-overflow state)` qualifier, or the born-RED baseline will flake as a gate. |
| **O-15 / PT-07** | **CONFIRMED / reproduced** by pass 1 at `parseState` (success-`undefined` vs failure-`undefined` indistinguishable). **EXTENDED by N-2**: the same 5/5 raw-`TypeError` shape at `getLazyParser`, a `./core` export. The JS-boundary invariant asserted **above** parse-that (O-15's own posture, W1 §3.9) must therefore cover more than the two parse entry points. |
| **X.P.W1 §3.5-3.6** | Reinforced by **N-1**: the exit-side `PACKRAT_ARMED` assertion is load-bearing, not belt-and-braces — a cell can arm itself mid-parse. |
| **X.P.W1 §3.7** | Re-scoped by **N-6**: the corpus depth bound must be declared against the *grammar's* frames-per-level, cold, not against a library constant. |
| **X.P.W1 §3.9** | Widened by **N-2**. |
| **X.P.W1 OP-1** | `parse-that-css-totality-p2` **ABSENT**, verified twice, not created. No STOP finding. |
| **X.P.W1 §2 (`2636c238`)** | **N-7**: not an object in this checkout; W1's ten-gates-RED baseline is not verifiable from the main read-only tree. |
| **X.P.W2 line 250 / 475 (K-7) / 810 / 831** | Corroborated and quantified by L-M3 + N-6: "depth as an algebra parameter" is the only posture the measurements support, and G-10/G-11's graph walk is possible only because of **S-5**. |
| **parser-band.md — DEBT-3** | **This module is the load-bearing evidence.** It is the only construct making unbounded recursion expressible; it has arity 1 with no depth slot; there is no path from stack exhaustion to `isError`; and **N-9** shows the suite has no depth test at all. |
| **parser-band.md — idiom reading ("exactly 1 lazy", graph-walked)** | **S-5** explains why that gate is constructible. It is also the falsifier that keeps a shared-call-site IC concern INFO-grade for the ruled grammar — one lazy node is one call target, hence monomorphic — consistent with pass 1's S-4 failing to measure any effect at 16 nodes (0.99×). |
| **parser-band.md — DISSENT, try/catch posture** | Sharpened. cand-F's "no shield, recursion-free grammar" is unavailable to *any* grammar using `Parser.lazy`, because L-m2/N-1 show even a **malformed body** escapes as a raw host `TypeError` rather than `isError`. The shield question is downstream of this module's error posture, not independent of it. |
| **L-16 (evidence modes never impersonate one another)** | Honoured: every row above is labelled SOURCE, API-TEST, or ANALYTIC. No BENCH-PROCESS was run in pass 2. **N-8** records that the SOURCE/bytes distinction itself rests on a gitignored artifact. |

## 9b · Falsification order (what would move this module)

1. **Delete the decorator** (`lazy.ts:26-43`) — zero consumers, uncompilable under the repo's own tsconfig,
   crashes under both decorator regimes, and does not cache. Discharges L-B1, L-B2, L-m3, L-m4, and — via
   N-4 — the cycle, making both imports type-only. Falsify by producing one working consumer.
   **Sequencing note**: L-m6 shows `lazy.ts:38` is the accidental anchor keeping `parser.js` evaluated for a
   `./core` consumer. Make `_initWhitespace`'s effect explicit **first**, then delete.
2. **Collapse the two caches into one** so a body resolves exactly once per process, and fold the printer onto
   the execution cache. Discharges L-M4 and N-2's converted form. Falsify by showing the print path *wants*
   a distinct graph.
3. **`static lazy<T>(fn, maxDepth = Infinity)`** with a closure-local counter returning `state.err(...)` past
   the bound — the ceiling becomes an ordinary `ok:false` **by construction** (`parser-band.md` DEBT-3,
   `W2.md:250`), calibrated cold, at a cost of one inc/dec on a path already paying five frames per level
   (N-6). Discharges L-M1's gate-flake, L-M3, and gives N-9 something to test.
4. **A resolution sentinel, not a truthiness test** (`lazy.ts:9`, `:21`) so a malformed body fails once,
   typed, named — not silently, every parse, raw. Discharges L-m1, L-m2.
5. **`this.state = undefined` at the top of `parseStateInner`** (pass 1's one-line cure) — discharges L-M2.
6. **Forbid, or make sound, construction-during-parse for anything that arms a global latch** — the N-1 seam.
   Cheapest honest fix: arm at `packratEnter` time by consulting a *count* of constructed memoizers, or open
   the epoch unconditionally once any lazy body exists. Either way, `packrat.ts:284-289`'s prose must stop
   asserting a guarantee the algebra does not provide.
7. **Re-cite PT-04 with its probe attached**, or retire the constant from `W2.md:831`'s born-RED baseline
   (N-6), and **pin the dist by sha256** before any gate reads a `dist:line` (N-8).

---

*Pass 2 authored 2026-08-04 · LIBRARY axis · claude-opus-5[1m] · single write (this file, appended — pass 1 preserved byte-for-byte) · parse-that read-only at `ef10d5b`, main checkout only, no worktree or frozen root entered, no browser tooling, no probe that armed the packrat latch or the diagnostics flag.*

---

# 10 · PASS 3 — blind re-audit, folded

**Served model**: `claude-opus-5[1m]`. **Date**: 2026-08-04. **Substrate**: parse-that `master` `ef10d5b`
(`typescript/package.json` = `1.0.0`), TypeScript 5.9.3, darwin arm64.

**Method note, stated first because it bounds everything below.** Pass 3 was conducted **blind** — the module
and its whole transitive import surface were read and adjudicated *before* passes 1 and 2 were opened. It is
therefore an independent replication, not a review. Evidence mode: **SOURCE + BYTES ONLY**. No process was
started; no `node -e` probe was run; nothing was executed. Where pass 2 has an API-TEST receipt and pass 3 has
only an analytic derivation, **pass 2's receipt governs** — I do not restate an executed result as if I had
re-run it (L-16).

**Law compliance**: `/Users/mkbabb/Programming/parse-that-css-totality-p2` re-verified **ABSENT**
(`ls` → `No such file or directory`) — third independent check, no STOP finding, not created. Main checkout
only; no `.worktrees/`, no frozen root, no `~/Documents/Codex`. Single write (this file, appended — passes 1
and 2 preserved byte-for-byte). No browser tooling. Nothing armed `PACKRAT_ARMED` or `diagnosticsEnabled`.

## 10.0 · Independent convergence (recorded as evidence, claimed as nothing new)

Reading blind, pass 3 landed on **L-B1, L-B2, L-M4, L-m1, L-m2, L-m3, L-m5, S-1/S-2/S-3** and on pass 1's
narrowing that **PT-01 does not reach `lazy.ts`** (`parser.ts:67-69` → `ParserState.prototype.toString`
(`state.ts:136-138`) → `statePrint` (`debug.ts:141-192`), which never calls `parserPrint`). It independently
re-verified PT-03 at `dist/packrat-entry-CS1td-8B.js:678/682/714/722` — exactly four occurrences, one write,
no disarm — and PT-01's guard verbatim at `dist/diagnostics-DDazRHgl.js:14`.

Three seats converging on the same ten rows from different directions is itself a finding: **these are not
reading artefacts.** Pass 3 adds no count to any of them.

Pass 3 **did not** independently reach L-M1, L-M2, N-1, N-6 — all four require execution, and pass 3 ran none.
It records no opinion on their numbers beyond noting that L-M1/N-6's thesis (a scalar cannot describe the
depth ceiling) is the correct posture for a gate constant regardless of which box measured it.

## 10.1 · NEW — P3-1 · INFO · `lazy<T>`'s type parameter is **phantom**, and it is published

**Provenance**: `lazy.ts:30`; published at `dist/lazy.d.ts:9`:
`export declare function lazy<T>(target: unknown, _propertyName: string, descriptor: TypedPropertyDescriptor<() => any>): void;`

`T` appears in **no parameter position and no return position**. Every call infers `T = unknown`; every
explicit `lazy<Foo>` is silently meaningless; the declaration promises a type relationship the signature
cannot express. Alongside it, `TypedPropertyDescriptor<() => any>` is the file's **only** `any`, it is
unnecessary (the actual contract is `() => Parser<unknown>`, which `parser.ts:702` writes correctly), and it
propagates into the shipped `.d.ts` — a consumer-visible hole, not an internal one.

**Falsifier**: name any position in which `T` occurs. There is none. **Disposition**: not independently
actionable — it is one more line on the ledger for §9b step 1 (delete the decorator), which discharges it
along with L-B1/L-B2/L-m3/L-m4.

## 10.2 · NEW — P3-2 · INFO · `createLazyCached`'s declared signature is a variance lie that the constructor erases on contact

**Provenance**: `lazy.ts:18` declares `(state: ParserState<T>) => ParserState<T>`; `parser.ts:14-16` defines
`ParserFunction<T> = (val: ParserState<any>) => ParserState<any>`; `parser.ts:29-32` is where the two meet.

The **incoming** state's value type is whatever the *predecessor* combinator last wrote onto the threaded,
mutated state (`state.ts:55-73` — `ok`/`err`/`from` all return `this`, retyped by assertion). It is not `T`.
`T` is the type this lazy *produces*. The precise-looking parameter type therefore describes a relationship
that does not hold, and it buys nothing: it typechecks only because the `Parser` constructor accepts
`ParserFunction<T>`, whose `any`s erase it at the single point of use. The `as ParserState<T>` at `:22` is
likewise cosmetic — no cast is doing work, because the object returned is the same object passed in.

This is a **type-quality** row, not a correctness row: the runtime is sound (mutable threaded state is the
library's deliberate design, and `state.ts:87-99`'s `unsafeSetValue`/`unsafeCall`/`unsafeCallRaw` choke points
are the right way to hold it). What is defective is that the signature reads as a guarantee to a consumer
using `./core` and is not one.

**Falsifier**: exhibit a call site where the declared `ParserState<T>` parameter rejects a program the
erased `ParserState<any>` would accept. Under `parser.ts:14-16` no such site can exist — which *is* the
defect.

## 10.3 · NEW — P3-3 · MINOR · `context.parser = undefined` is the graph's **only child-link hole**, and it is an adjudication the band's gate authors need

**Provenance**: `lazy.ts:40` and `parser.ts:705` both call `createParserContext("lazy", undefined, fn)` —
i.e. `context.parser = undefined`. Every other combinator in the library passes `this`: `then` `parser.ts:101`,
`or` `:120`, `chain` `:142`, `map` `:158`, `mapState` `:185`, `skip` `:208`, `next` `:230`, `opt` `:247`,
`not` `:301`, `minus` `:329`, `peek` `:355`, `lookAhead` `:388`, `wrap` `:429`, `many` `:561`, `sepBy` `:634`,
`recover` `:686`, `eof` `:640`.

Pass 1 (L-m2, `challenge-L-library.md:385-388`) records this as an *error-naming* limitation. It is also, and
more consequentially, a **structural** one: `context.parser` is the canonical child link, so **a graph walk
stops dead at every lazy node.** The only way through is `getLazyParser(context.args[0])` — i.e. through
L-M4's shadow.

**Adjudication for `W2.md:810` / `W2-opus-author.md:695` (G-10/G-11) and `parser-band.md`'s idiom reading
("no `.opt()` child of any `all()`; exactly 1 lazy; 0 memoize", graph-walked):**

- **Counts SURVIVE.** For a body with no build-time state, the shadow is *structurally isomorphic* to the
  executing graph, so `lazy ≤ 1` and the `.opt()`-under-`all()` predicate return the same answer on either.
- **Termination SURVIVES**, and for a reason worth writing down so no one re-derives it: the knot node
  reached *inside* the shadow is the **original** lazy `Parser` object (the body closes over the module-level
  `const`), so it carries the **same `Parser.id`** and any visited-set walker halts. Only the *interior* of
  the shadow subtree has fresh ids.
- **Identity and allocation assertions DO NOT SURVIVE.** A gate that asserts on `Parser.id`, on object
  identity across a lazy edge, on node counts *as allocated*, or on `MEMO` cell provenance is reading a graph
  that never executes (L-M4; and `debug.ts:321-322` memoises `PARSER_STRINGS` under those shadow ids).
- **Operational rule**: *count freely across a lazy edge; never assert identity or allocation across one.*

**Falsifier**: a body that consults mutable build state breaks even the count guarantee, because the shadow
is then not isomorphic. cand-O's grammar is pure (`parser-band.md` §Architecture — the eight colour functions
are one production parameterised by a static channel table), so the gate is safe **for the ruled grammar** —
which is a property of that grammar, not of this library, and must not be generalised.

## 10.4 · NEW — S-7 · SUPERLATIVE · `lazy.ts` made the retention choice its own dependency did not

**Provenance**: `lazy.ts:5` (`new WeakMap()`), surviving into the bundle as
`dist/packrat-entry-CS1td-8B.js:2` — `const LAZY_PARSER_CACHE = /* @__PURE__ */ new WeakMap();` (the purity
annotation is preserved, so the allocation is tree-shakeable when nothing reaches it). Contrast, one file
away in the same chunk: `debug.ts:245` — `const PARSER_STRINGS = new Map<number, string>();`.

`PARSER_STRINGS` is keyed on `Parser.id`, a **process-global monotonically increasing** counter
(`parser.ts:18`, `:25`). It is written at `debug.ts:322`, `:340`, `:346` and is **never cleared, never
evicted, and exposes no reset** — while its siblings both do (`resetPackrat()` `packrat.ts:262`;
`clearCollectedDiagnostics()` `utils.ts:142`). Every `toString()` in a long-lived process (a dev server
logging parse trees) therefore adds permanently-retained entries under keys that **can never recur**. That is
an unbounded leak. `lazy.ts` has none: it reached for the weak structure.

**Stated with its own caveat, because L-18 runs both ways**: L-M4 and P3-5 below show lazy's better choice is
**inert** — `fn` is retained by `context.args`, so the WeakMap never collects. The *instinct* is still
correct and the neighbour lacks it entirely; that asymmetry is the superlative, and its emptiness in practice
is the defect already filed.

## 10.5 · Riders on existing rows (no new count)

**P3-4 — rider on N-7/N-8 (chronology), and it is a *positive* result.** `git log -1 --format='%H %ad'
--date=short -- typescript/src/parse/lazy.ts` → **`7ec4b31` 2026-03-30**. The module is **byte-frozen since
2026-03-30**, ~4 months before O-15 measured it on 07-27. Pass 2 (`:843-846`) left this at *"divergence is
unlikely — but 'unlikely' is not 'verified'"*. For **this module** it is now verified in the affirmative
direction: the last mutation strictly **predates** the measurement window, so
`W2-opus-author.md:765`'s caveat (*"every O-15 number predates the clone-point substrate"*) **does not apply
to `lazy.ts`** — **O-15 PT-04 is a measurement of the exact bytes challenged in this file.** This does not
disturb N-6/L-M1's separate and correct objection that a single scalar cannot describe the quantity; it
removes only the *staleness* doubt, leaving the *methodology* doubt intact. N-7 and N-8 stand unchanged: the
`dist:line` cites remain against a gitignored build and still want a sha256 pin.

**P3-5 — rider on L-M4 (the retention chain, one step further).** Pass 1 establishes that the WeakMap entry
lives as long as `fn`, which `context.args` holds for the process. The design conclusion it stops short of:
**`WeakMap` is therefore exactly equivalent to `Map` at both of the only two construction sites that exist**
(`parser.ts:705`, `lazy.ts:40`) — the weak reference can never fire. Sharper still, the **sole** consumer,
`debug.ts:317`, obtains `fn` by destructuring it back out of `context.args` — i.e. out of the very reference
that defeats the weakness. Any cure must therefore add an explicit reset (§9b step 2), because there is no
GC-based path to reclamation. Same defect, one turn of the screw; no new count.

**P3-6 — extension of N-9 (coverage), strengthening it.** `grep -rn "toHaveBeenCalled\|callCount\|calls\b"
test/*.ts` → **zero hits in the entire suite.** N-9's "zero direct tests for the module" is therefore stronger
than stated: the suite possesses **no mechanism at all** for asserting invocation counts, so L-B2, L-M4,
L-m1, and L-m2 are not merely unfixed — they are **unobservable** to it. The eight `Parser.lazy` fixtures
(`math.test.ts:45,54,66,70`; `memoize.test.ts:17,25,28,30,42,57`; `reentrancy.test.ts:111,130,162`;
`json.test.ts:17,27`; `print.test.ts:21`) all assert *parse results*; `print.test.ts:31` exercises the
`getLazyParser` arm and asserts only `expect(s).toBeTruthy()`. Three lines convert L-M4 from an argument into
a red test:

```ts
let n = 0; const p = Parser.lazy(() => { n++; return digits; });
p.parse("1"); p.toString();
expect(n).toBe(1);   // currently 2
```

## 10.6 · Rows pass 3 looked for and did **not** find (recorded so the next seat need not re-look)

- **No re-entrancy hazard in `lazy.ts` itself.** `createLazyCached`'s `cached` is per-`Parser`, input-independent,
  and written once; a nested `parse(differentSrc)` mid-parse cannot corrupt it. This is pass 2's **S-6**,
  reached independently.
- **No `console`, no label, no diagnostics call** anywhere in the module — confirming pass 1's PT-01 narrowing
  from the opposite direction (`grep -n "console\|Diagnostic\|label" src/parse/lazy.ts` → empty).
- **No packrat import.** `lazy.ts` imports exactly `parser.js` (value) and `state.js` (type + value). It holds
  no arming latch. Its module-global is monotone fill-only — a cache, not a latch: it changes no behaviour,
  only identity and residency. The honest overlap with `W2.md:132`'s **O-8** anti-latch construction rule is
  one severity band down and is already filed as L-M4/P3-5. (N-1's separate claim — that deferring
  *construction* into the parse can arm the latch mid-parse — is a `packrat.ts` seam reached through lazy, and
  pass 3 neither confirms nor disputes it, having run nothing.)
- **No allocation on the steady-state hot path.** `lazy.ts:20-23` = one closure-slot load, one branch, one
  monomorphic call. Zero bytes of garbage per invocation; `state` is threaded and mutated in place. Pass 2's
  **S-2**, reached independently.

## 10.7 · Merged ledger, passes 1–3

| pass | defects added | superlatives added |
|---|---|---|
| 1 | 12 (2 BLOCKER · 4 MAJOR · 6 MINOR) | 4 |
| 2 | 8 (1 MAJOR · 2 MINOR · 5 INFO) | 2 |
| **3** | **3 (1 MINOR · 2 INFO)** | **1** |

**MERGED TOTALS: 23 defects (2 BLOCKER · 5 MAJOR · 9 MINOR · 7 INFO) · 7 superlatives.**

New in pass 3: **P3-3** (MINOR — the `context.parser` child-link hole + the gate adjudication),
**P3-1** (INFO — phantom generic, published), **P3-2** (INFO — the erased variance lie), **S-7**
(SUPERLATIVE — the retention choice its own dependency did not make). Riders **P3-4** (chronology, positive),
**P3-5** (weakness defeated), **P3-6** (coverage) add no count.

**§9b's falsification order is unchanged by pass 3.** P3-1 and P3-2 discharge with step 1 (delete the
decorator); P3-5 constrains step 2 (the collapse must ship an explicit reset — GC will not do it); P3-3 adds
no step but supplies the operational rule the band's gate authors need *today*: **count across a lazy edge,
never assert identity or allocation across one.** P3-4 removes the staleness doubt from step 7's first
clause while leaving its methodology objection (N-6) and its sha256-pin clause (N-8) fully intact.

---

*Pass 3 authored 2026-08-04 · LIBRARY axis · `claude-opus-5[1m]` · conducted **blind** (module and full
transitive import surface adjudicated before passes 1–2 were opened), then folded · evidence mode SOURCE +
BYTES only, **nothing executed** — where pass 2 holds an API-TEST receipt, pass 2 governs · single write
(this file, appended — passes 1 and 2 preserved byte-for-byte) · parse-that read-only at `ef10d5b`, main
checkout only, no worktree / frozen root / Codex path entered, no browser tooling, no probe that armed the
packrat latch or the diagnostics flag · `parse-that-css-totality-p2` verified ABSENT, not created.*
