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

**Verdict**: **12 defects (2 BLOCKER, 4 MAJOR, 6 MINOR) · 4 superlatives.** The module's *hot path*
(`createLazyCached`) is excellent and load-bearing for packrat soundness. Its other two exports are the
problem: `lazy` (the namesake decorator) cannot run under the package's own compiler configuration **and**
fails to do the one thing lazy exists to do; `getLazyParser` is a second, divergent cache that manufactures a
shadow grammar. Separately, O-15 **PT-04's headline number is challenged**: the depth ceiling is not a
constant, and the cold figure on this box is **2.74× lower** than the pinned 7,761.

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

**One-line verdict**: keep `createLazyCached` verbatim and give it a depth parameter; delete `lazy` and
`getLazyParser`, folding the printer onto the execution cache — and re-qualify PT-04's 7,761 as a warm-path
reading before any gate is built on it.
