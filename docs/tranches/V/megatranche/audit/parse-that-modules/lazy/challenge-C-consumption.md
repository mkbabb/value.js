claude-opus-5[1m]

# CHALLENGE — `lazy` · axis C (CONSUMPTION)

**Target**: `/Users/mkbabb/Programming/parse-that/typescript/src/parse/lazy.ts` (43 lines, read whole).
**Imports read whole (read-only)**: `parser.ts` (711 L), `state.ts` (189 L), plus every consumption edge —
`index.ts`, `core.ts`, `debug.ts`, `packrat-entry.ts`, `typescript/package.json`, `typescript/tsconfig.json`,
`typescript/dist/{lazy.d.ts,parse.js,core.js,packrat-entry-CS1td-8B.js}`, `scripts/proof-no-dead-combinator.mjs`.
**Downstream read (read-only)**: value.js `package.json`, `src/subpaths/css.ts`, `src/css/`.
**Evidence root posture**: `/Users/mkbabb/Programming/parse-that` main checkout only; no `.worktrees/`, no frozen
root, no `~/Documents/Codex` entered. `/Users/mkbabb/Programming/parse-that-css-totality-p2` re-verified
**absent** (`test -e … → absent-ok`, 2026-08-04) and not created. No browser tooling. No bench armed packrat or
diagnostics — every probe below runs `parseState` on the unarmed default path; `memoize()` was never called, so
`PACKRAT_ARMED` (O-15 PT-03's one-way latch) stays false for the whole session.

**Posture**: the module is assumed DEFECTIVE until the tree proves otherwise. Every claim carries severity +
`file:line` + its own falsifier; the three superlatives carry falsifiers too (L-18 runs both ways).

**Tally**: 13 defects (2 BLOCKER · 6 MAJOR · 4 MINOR · 1 INFO) · 3 superlatives.

---

## 0. The consumption fact that frames everything

`lazy.ts` exports **three** symbols — `getLazyParser`, `createLazyCached`, `lazy` — and ships all three on **two**
public entry points: the root barrel (`src/parse/index.ts:7`) and the `/core` subpath (`src/parse/core.ts:15`),
both mapped in `typescript/package.json:8-19` with `import` **and** `require` conditions, frozen at **1.0.0**
(`typescript/package.json:3`).

The routing law's sole downstream consumes **none of them, and does not depend on parse-that at all**:

| edge | evidence |
| --- | --- |
| value.js dependency closure | `package.json` `dependencies` = `@mkbabb/glass-ui ^7.0.0`, `@mkbabb/keyframes.js ^6.0.0`. `grep -c parse-that package-lock.json` → **0**. Neither transitive dep declares it (`grep parse-that node_modules/@mkbabb/{keyframes.js,glass-ui}/package.json` → exit 1). |
| value.js source | `grep -rn "parse-that" src/ demo/` → **2 hits, both prose**: `src/subpaths/transform.ts:4` ("zero parse-that"), `src/subpaths/math.ts:2` ("parse-that-FREE"). |
| `src/parsing/` | **does not exist** — retired at `164343c1` *"feat(v4)!: value 4.0 producer surface + packed-surface gate; retire pre-v4 src trees"*. |
| the `/css` surface | `src/subpaths/css.ts` = **52 exports** (33 `export type` + 19 `export`), every one re-exported from `../css/index`, served by a hand-written `src/css/grammar.ts` (**483 lines**) over `src/foundation/result` — zero combinators. |

So the CONSUMPTION axis for this module is not "does it serve its consumer well". It is: **a three-export public
surface, sealed by a 1.0.0 stability promise onto two entry points, with one in-repo consumer (`debug.ts:318` —
and that one is defective, §D-C1) and zero downstream consumers.** Every finding below is read against that.

---

## 1. BLOCKERS

### D-C1 — [BLOCKER] Two caches, one thunk: printing a lazy parser silently builds a *second* parser graph and retains it forever

**Where.** `lazy.ts:5-15` (`LAZY_PARSER_CACHE` + `getLazyParser`) and `lazy.ts:18-24` (`createLazyCached`) are
**two independent caches over the same thunk**. The execution path uses the closure:
`parser.ts:702-707` — `static lazy<T>(fn) { return new Parser(createLazyCached(fn), createParserContext("lazy", undefined, fn)) }`.
The printing path uses the WeakMap: `debug.ts:316-318` — `case "lazy": { const [lazy] = args!; const p = getLazyParser(lazy); … }`,
reached from `Parser.toString()` (`parser.ts:698-700`) and `Parser.debug()` (`parser.ts:690-696`).
They never meet: `createLazyCached`'s `cached` is a closure-private `let` (`lazy.ts:19`) with no reader.

**Measured** (`dist/parse.js`, unarmed):

```
A after construct  calls= 0
B after parse      calls= 1
C after 2nd parse  calls= 1
D after toString   calls= 2      <- the thunk ran a SECOND time
J executing-graph id= 42  printed-graph id= 47  SAME? false
K getLazyParser(fn).id = 47  => the WeakMap holds the PHANTOM, not the runtime graph
```

**Consequences, all consumption-facing.**
1. **`toString()` is not a read.** It constructs a full second parser subtree. On a recursive grammar that is a
   whole second cycle. A "debug print" is an allocation event proportional to grammar size.
2. **The printed grammar is not the running grammar.** Different `Parser.id`s (42 vs 47) for the same rule. Any
   tool that keys on identity — including parse-that's own `PARSER_STRINGS.set(p.id, s)` memo at `debug.ts:321-322`
   — memoizes against the phantom's id, so the memo can never hit for the executing node.
3. **Permanent retention.** `WeakMap` is only weak in its key. The key is `fn`, and `fn` is strongly retained by
   `context.args` (`state.ts:180-186`, `createParserContext(name, parser, ...args)`) on the **live** `Parser`. So
   while the parser is alive the entry is alive, and the phantom subtree is alive with it. One `console.log(parser)`
   permanently doubles the retained parser graph, with no API to release it.

**Falsifier.** If `createLazyCached` exposed its realized parser and `parserPrint` read it, probe `D` would still
read `calls= 1` and probe `J` would read `SAME? true`. It reads `calls= 2` and `SAME? false`. Conversely, if the
WeakMap entry were collectable while the parser lives, the retention half would fall — but `state.ts:180-186`
stores `fn` in `args`, and `parser.ts:705` passes exactly that `fn`, so the strong path is closed.

---

### D-C2 — [BLOCKER] No accessor for the realized parser ⇒ the X·P G-10 / G-11 graph-walk gates cannot walk the *shipped* graph

**Where.** `lazy.ts:19` — `let cached: Parser<T> | undefined;` — is the only place the realized back-edge parser
lives, and nothing reads it. The `lazy` node's `context.args[0]` (`parser.ts:705`) is the **thunk**, not the parser.

**Why this is a blocker and not a nit.** The X·P dual-target algebra makes the built graph the *normative object*
of two close gates:

- **G-10** (`W2.md:808-815`): *"the band's structural graph-walk (no `.opt()` child of any `all()`; `lazy ≤ 1` with
  an explicit depth bound; `memoize = 0`) … Command: `node harness/w2/idiom-nocst.mjs --candidate <id>` (walks the
  **built** graph … a grep cannot prove "no `opt` under `all`"; the graph can)."*
- **G-11** (`W2.md:822-826`): the deep-nesting bound must be structural, *"returns `ok:false` from a constructed
  bound in BOTH lowerings — never a `RangeError`"*.
- `registry/adjudicated/parser-band.md:17` states the same instrument: *"idiom measured structurally by walking the
  built combinator graph (no `.opt()` child of any `all()`, exactly 1 lazy, 0 memoize) — a grep cannot prove that,
  the graph can."*

The winning candidate **has** a lazy back-edge — `parser-band.md:111`: *"exactly one `Parser.lazy` on the one true
back-edge (balanced tail)"* — so any honest walk **must** traverse it. The only public route past a `lazy` node is
`getLazyParser` (`index.ts:7`, `core.ts:15`), and per D-C1 that materializes a phantom. For a *recursive* back-edge
the phantom is a second, unshared cycle: a walker counting `lazy ≤ 1` or inspecting a depth bound is measuring an
object the shipped parser never executes.

**Falsifier.** Suppose the harness avoids `getLazyParser` and instead reads `context.args[0]` and calls it itself.
It *still* gets a different object than the executing one, because `cached` (`lazy.ts:19`) is unreachable — there
is no `Parser.lazy` variant, no `.force()`, no `.inner`, no export that returns it. I checked the whole surface:
`grep -n "lazy" src/parse/*.ts` yields exactly the definition, `parser.ts:702-707`, `index.ts:7`, `core.ts:15`,
`debug.ts:2,316-318`, `state.ts:149`, `parsers/json.ts:25,28`. Nothing reads the closure. The only way to falsify
this is a **source change** to `lazy.ts` — which is precisely the finding: the gates W2 pins cannot be built
honestly against this module as written.

**Contradiction to record.** Neither `W2.md §3c` nor `parser-band.md` names `getLazyParser` or the `lazy` decorator
anywhere (`grep -n "getLazyParser" docs/tranches/X/parse-that/waves/*.md` → no hits). The algebra's `lazy ≤ 1`
census counts `Parser.lazy` *call sites* and is silent on the two exports that make the census unmeasurable. That
gap is what this challenge adds to the corpus.

---

## 2. MAJOR

### D-C3 — [MAJOR] The `lazy` decorator throws under the very tsconfig that compiles it

**Where.** `lazy.ts:30-43` is a **legacy** TypeScript method decorator: three parameters
`(target, _propertyName, descriptor)`, mutating `descriptor.value` in place, returning `void`.
`typescript/tsconfig.json` has **no `experimentalDecorators`** key (full file read: `target ES2022`, `module ESNext`,
`moduleResolution bundler`, `strict`, `verbatimModuleSyntax`, `skipLibCheck`, `forceConsistentCasingInFileNames`,
`resolveJsonModule`, `sourceMap:false`, `declaration`, `declarationMap` — that is all of it), and
`typescript/package.json:53` pins `typescript ^5.8.0`. With `experimentalDecorators` off, TS ≥ 5.0 emits **standard
TC39 decorators**, whose method-decorator signature is `(value, context)` — two arguments, no descriptor.

**Measured** (calling it with the TC39 shape against the shipped `dist/parse.js`):

```
M TC39-shape -> TypeError: Cannot read properties of undefined (reading 'value')
G typeof lazy decorator = function  arity= 3
```

`lazy.ts:35` dereferences `descriptor.value!` — under the standard protocol `descriptor` is `undefined`, so the
non-null assertion `!` (which is the *only* thing suppressing the type error) becomes a runtime throw.

**Falsifier.** Adding `"experimentalDecorators": true` would rescue it. The flag is absent, and
`grep -rn "experimentalDecorators\|@lazy" typescript/ --include=*.json --include=*.ts` (node_modules excluded)
returns **nothing** — the flag is never set anywhere and the decorator is never applied anywhere. It has never
been exercised in-tree, which is why nothing caught this.

---

### D-C4 — [MAJOR] The decorator binds to the prototype, so instance state is invisible and every instance shares one wrong grammar

**Where.** `lazy.ts:35` — `const method = descriptor.value!.bind(target);`. For an instance-method decorator,
`target` is the **prototype**, not the instance. The bind happens at *decoration* time; `this` inside the method is
therefore permanently the prototype object.

**Measured** (legacy calling convention, so the decorator can even run):

```
class G { m(){ return string(this.tok ?? '<<undefined-this.tok>>'); } }
N g1.m() parses "a"?  false        (g1.tok = 'a')
O g2.m() parses "b"?  false        (g2.tok = 'b')
P grammar built =  "<<undefined-this.tok>>"
```

Both instances produce a grammar built from `this.tok === undefined`. Neither parses its own token. A grammar class
that reads any instance field — a dialect flag, an options object, a sub-parser registry — is silently mis-built.

**Falsifier.** If the replacement bound at *call* time (`descriptor.value.call(this)` inside the wrapper), each
instance would see its own state and probes N/O would read `true`. `lazy.ts:35` hoists the bind above
`lazy.ts:37`'s wrapper; they read `false`.

---

### D-C5 — [MAJOR] The decorator does not cache — its own docstring is false, and it makes the cost it exists to avoid

**Where.** `lazy.ts:26-29` promises *"Defers parser construction until first invocation, **then caches**."*
`lazy.ts:37-42` calls `createLazyCached(method)` **inside** the replacement function, so every invocation of the
decorated method allocates a **fresh** closure with a fresh `cached` slot and a fresh `Parser`.

**Measured**:

```
U distinct Parser objects per m() call? true | ids 37 38 39
V method() invocations after 3 m() + 0 parses = 0
W method() invocations after 3 parses        = 3     (a real cache would be 1)
X re-parse of p1                             = 3     (the per-parser closure does cache — per parser)
```

The caching is per-`Parser`, not per-method. A rule referenced from N sites in a grammar is constructed N times —
exactly the blow-up `lazy` exists to prevent. Note the asymmetry with `Parser.lazy`: there the consumer hoists
`const rule = Parser.lazy(fn)` once, so one closure serves all references; the decorator **removes** that option,
because the only way to name the rule is to call the method.

**Falsifier.** If `createLazyCached(method)` were hoisted to `lazy.ts:36` (outside the wrapper) and the wrapper
returned a single memoized `Parser`, probe W would read `1`. It reads `3`, and probe U shows three distinct ids.

---

### D-C6 — [MAJOR] Dual-package hazard: the cache **and** `Parser` identity fork across the `import` / `require` conditions the package itself declares

**Where.** `lazy.ts:5` — `const LAZY_PARSER_CACHE = new WeakMap(...)` — is a **module global**.
`typescript/package.json:8-19` declares both `"import": "./dist/parse.js"` and `"require": "./dist/parse.cjs"` for
`.`, and the same pair for `./core`. A consumer graph that loads both conditions (one dep `import`s, another
`require`s — routine in mixed toolchains) instantiates the module twice.

**Measured**:

```
R Parser identity  ESM === CJS ?                    false
S getLazyParser(fn) same object across conditions?  false | ids 37 38
T a instanceof cjs.Parser -> false ;  b instanceof esm.Parser -> true(*)
```

The **same thunk** is cached twice, in two WeakMaps, producing two `Parser` graphs whose classes fail each other's
`instanceof`. `(*)` the asymmetry in T is an ordering artifact of which module initialized `PARSER_ID` first; the
load-bearing row is R + S.

**Falsifier.** If the package were ESM-only, or if the cache were hung off a cross-realm key (a `Symbol.for` slot on
`globalThis`), R and S would read `true`. They read `false`, and the exports map at `package.json:10-12,15-17`
explicitly ships both conditions.

---

### D-C7 — [MAJOR] `getLazyParser` is a public *unconstrained generic thunk memoizer* with an `undefined` cache hole and an unchecked cast

**Where.** `lazy.ts:7-15`. Three separate surface problems in nine lines:

1. **`if (cached !== undefined)` (`lazy.ts:9`)** uses `undefined` as the miss sentinel, so a thunk that legitimately
   returns `undefined` is **never cached**. Measured: `I … thunk invocations for 3 gets = 3 (cached would be 1)`.
2. **`WeakMap<Function, unknown>` (`lazy.ts:5`) + `<T>` unconstrained (`lazy.ts:7`)**: the signature is
   `getLazyParser<T>(fn: () => T): T` — nothing ties `T` to `Parser`. The name promises a parser; the type promises
   nothing. This is a general-purpose memoizer wearing a parser name on the public barrel.
3. **`return cached as T` (`lazy.ts:10`)** is an unchecked cast against a `unknown`-valued map. Two call sites
   passing the same `fn` at different `T` both receive whatever the first stored, silently mistyped — `strict` is on
   (`tsconfig.json`) and cannot see through the cast.

**Falsifier.** Constraining `T extends Parser<unknown>` and switching to `LAZY_PARSER_CACHE.has(fn)` closes (1) and
(3) and narrows (2). `dist/lazy.d.ts:3` ships the unconstrained signature verbatim —
`export declare function getLazyParser<T>(fn: () => T): T;` — so the published contract is the loose one.

---

### D-C8 — [MAJOR] A zero-consumer surface frozen at 1.0.0, past a precept this repo enforces on other exports — and its gate cannot see it

**Where.** `index.ts:7` and `core.ts:15` both export all three symbols; `typescript/package.json:3` pins `1.0.0`.
In-repo consumers, exhaustively: `lazy` (decorator) → **0**; `getLazyParser` → **1** (`debug.ts:318`, the defective
call of D-C1); `createLazyCached` → **2** (`parser.ts:704`, `lazy.ts:39`), both internal. Downstream consumers → **0**
(§0). `parsers/json.ts:25,28` uses `Parser.lazy`, i.e. `createLazyCached` transitively — not the barrel exports.

The repo states the precept and has acted on it. `scripts/proof-no-dead-combinator.mjs:11-12`:
*"A never-importable export is not part of the public contract; an export born one prior tranche with zero workspace
consumers is dead by the precept."* `index.ts:9-11` records the enforcement: *"The 15 closure-based `*Span` builders
were EXCISED in the 1.0.0 cut (S.H2, fold row 48): a zero-consumer surface, deprecated in 0.13.0 (PT-Q4)."*

`lazy` and `getLazyParser` have exactly that property and were **not** excised. The gate cannot catch them: its
banned set is **two hardcoded names** (`proof-no-dead-combinator.mjs:30-33` — `thenMap`, `fuse`), matched by regex
against two named files. It enumerates nothing. It greens over `lazy.ts` by construction — the same "counts, not
registries" failure mode W2 §G-2 was written to kill (`W2.md:128`: *"the v12 defect re-armed as a machine screen
(G-2 compares registries, never counts)"*).

**Cost of the miss.** 1.0.0 is a stability promise. Removing `lazy` or `getLazyParser` now costs a **major**. The
cheap window — the same S.H2 cut that took the 15 `*Span` builders — was open and was not used on this module.

**Falsifier.** If the gate enumerated the barrel and diffed against the constellation consumer sweep it already
performs (`proof-no-dead-combinator.mjs:60+`, "Cross-tree consumer sweep"), `lazy` and `getLazyParser` would red.
It sweeps consumers only for the two hardcoded names. Run `npm run proof:no-dead-combinator` and it passes.

---

## 3. MINOR

### D-C9 — [MINOR] No depth parameter; the ceiling is a thrown `RangeError` — and the number pinned in three places does not reproduce

**Where.** `parser.ts:702` — `static lazy<T>(fn: () => Parser<T>)` — arity **1** (measured: `H Parser.lazy arity = 1`).
`lazy.ts:18-24` has no counter, no bound, no guard. `createLazyCached` is the natural and only home for one: it is
the single choke point every recursive descent passes through.

This is the shipped-surface half of **O-15 PT-04** and **DEBT-3** (`parser-band.md:118`: *"cand-O's one `lazy`
back-edge (balanced tail) should carry an explicit depth bound so the stack ceiling becomes an ordinary `ok:false`
by construction"*), and it is what `parsethat-surface-gaps.mjs:36-37` reds on:
`row(!mode.startsWith("ok:false"), …)` and `row(Parser.lazy.length !== 2, "DEBT-3 Parser.lazy depth-bound parameter", …)`.

**But the pinned number is not stable.** Re-measured here on the same protocol as
`parsethat-surface-gaps.mjs:30-38` (unarmed, `dist/core.js`, `nested = Parser.lazy(() => any(all(string("("), nested, string(")")), string("x")))`):

```
Q Parser.lazy deepest OK = 8277 | failure mode: RangeError thrown at depth 8278
```

**This contradicts the corpus, explicitly.** Three places pin `7,761 / 7,762`: INBOX **O-15** (`INBOX.md:77`),
`parsethat-surface-gaps.mjs` (the DEBT-3 row's expectation), and `W2.md:831-833` — which additionally asserts
*"reproduced independently by W1's session: **a stable property**, and a thrown error, not a returned failure."*
The **class** is stable and I confirm it: unbounded, no parameter, a **thrown `RangeError`** rather than a returned
`ok:false`. The **value** is not: 8,277 here, +6.6% over the pin, on the same repo and script shape — it tracks host
stack headroom and V8 frame size, not the grammar.

**Consequence for W2.** G-11's born-RED baseline (`W2.md:831`) is *pasted as a literal*. A gate that asserts
`deepest === 7761` is flaky by construction and will red on a clean tree; a gate that asserts
`failure mode === "RangeError thrown"` is sound. Recommend the baseline be restated as the class, with the number
carried as a dated, host-tagged observation — the same honest `N=1, one machine` bound O-15 already applied to
PT-03's 1.47× (`INBOX.md:77`).

**Falsifier.** Run the identical probe on the host that produced 7,761. If it reproduces there and 8,277 here, the
number is host-local — which is the claim. Only a *third* host reproducing 7,761 exactly would falsify it, and that
would still not explain this run.

---

### D-C10 — [MINOR] `/core` — the subpath whose docblock names `lazy` as part of a tier-free primitive set — pulls the packrat tier *and* the diagnostics module

**Where.** `core.ts:3-6`: *"The zero-side-effect primitive set: the Parser core, state, leaf parsers, **lazy**, and
the balanced-split helpers. A consumer that imports only this **never pulls** the diagnostics accumulator, the
packrat tier, or the json/csv domain parsers."*

The built artifact says otherwise. `dist/core.js:1` opens
`import { P, a, b, c, d, e, f, g, h, l, j, r, s, n, t, w } from "./packrat-entry-CS1td-8B.js";` — a **40,576-byte**
chunk (`dist/core.js` is 1,336 B; the weight is all in the import), containing **9** occurrences of
`PACKRAT_ARMED` / `makeMemoized` / `packratEnter`. That chunk's own first line is
`import { i as isDiagnosticsEnabled, m as mergeErrorState, … } from "./diagnostics-DDazRHgl.js";`.
And `LAZY_PARSER_CACHE` is at **line 2 of the packrat chunk** — this module's cache literally lives inside the tier
`core.ts` says it excludes.

So the lightest possible way to import `lazy` drags in both tiers O-15 indicts: the packrat one-way latch (PT-03,
`INBOX.md:77`, `packrat-entry-*.js:678/:722`) and the diagnostics module whose arming couples an unconditional
`console.error` (PT-01, `diagnostics-DDazRHgl.js:14`). **Nothing is armed by loading** — `PACKRAT_ARMED` flips only
in `makeMemoized()` — so this is a payload/claim defect, not a behavior change. That is why it is MINOR.

**Falsifier.** If the chunker had split `lazy` out, `dist/core.js` would import a lazy-sized chunk. `ls -l` gives
`dist/core.js` 1,336 B and `dist/packrat-entry-CS1td-8B.js` 40,576 B, and the import at `dist/core.js:1` is
unconditional.

---

### D-C11 — [MINOR] `createLazyCached` calls `.parser()` not `.call()` — a latent flag bypass, inert today only because `Parser.flags` is dead code

**Where.** `lazy.ts:22` — `return cached.parser(state) as ParserState<T>;`. The flag-aware entry point is
`Parser.call` (`parser.ts:437-477`), which applies `FLAG_TRIM_WS` (`parser.ts:442-454`) and `FLAG_EOF`
(`parser.ts:466-476`). `.parser` skips all of it. `state.ts:93-101` even names the distinction
(`unsafeCall` vs `unsafeCallRaw`); `lazy.ts:22` takes the raw path.

**Why it is currently harmless — and I say so rather than overclaim.** `flags` is assigned exactly **once** in the
whole source (`grep -n "\.flags" src/parse/*.ts`): `parser.ts:496`, `flaggedParser.flags = this.flags | FLAG_TRIM_WS;`
— onto an object `trim()` then **discards**, returning a *different* `Parser` at `parser.ts:514-517`. Measured:

```
L flags after .trim() = 0 ;  after .eof() = 0     (FLAG_TRIM_WS = 1, FLAG_EOF = 2)
```

Every parser in the tree carries `flags === 0`, so `call()` degenerates to `this.parser(state)` (`parser.ts:438-440`)
and lazy's bypass costs nothing.

**The trap.** The moment `parser.ts:496` is repaired — and it is plainly a bug, a built-then-dropped object — every
lazy back-edge silently drops `trim`/`eof` semantics for its subtree, with no type error and no test to catch it,
because no test can currently exercise a nonzero flag.

**Falsifier.** If any returned parser ever carried a nonzero flag, probe L would show it. None does. Falsify the
*latency* claim by showing `flaggedParser` is returned somewhere — `parser.ts:492-517` returns the
`whitespaceTrim`-backed parser instead.

---

### D-C12 — [MINOR] A dead type parameter shipped into the published `.d.ts`

**Where.** `lazy.ts:30` declares `lazy<T>` and the signature (`lazy.ts:31-33`) never mentions `T`: `target: unknown`,
`_propertyName: string`, `descriptor: TypedPropertyDescriptor<() => any>`. It is uninferable and unbindable.
`dist/lazy.d.ts:9` ships it verbatim:

```ts
export declare function lazy<T>(target: unknown, _propertyName: string, descriptor: TypedPropertyDescriptor<() => any>): void;
```

A consumer writing `@lazy<MyNode>` gets zero checking: the descriptor's return is `any`, the decorator's return is
`void`, and `T` binds to nothing. The `any` at `lazy.ts:33` also carries an eslint suppression cost the module did
not pay (contrast `parser.ts:12-13`, which annotates its one `any` with an explicit disable + reason).

**Falsifier.** `TypedPropertyDescriptor<() => Parser<T>>` would bind `T` and make the generic load-bearing. The
shipped signature uses `() => any`.

---

## 4. INFO

### D-C13 — [INFO] Four names for one concept; the one a consumer reaches for by name is the broken one; and the context tag cannot tell them apart

`lazy` (decorator, D-C3/4/5 — broken) · `Parser.lazy` (`parser.ts:702`, the real API) · `createLazyCached`
(`lazy.ts:18`, the engine) · `getLazyParser` (`lazy.ts:7`, a *different* cache). A consumer scanning the barrel for
"lazy" finds the decorator first — alphabetically and by name-match — and it is the one that throws.

`state.ts:149` gives all of them a single `parserNames` tag, `"lazy"`, so `context.name === "lazy"` cannot
distinguish a `Parser.lazy` node (whose `args[0]` is the raw thunk, `parser.ts:705`) from a decorator node (whose
`args[0]` is the *bound* method, `lazy.ts:40` — a fresh function object per decoration, hence a distinct WeakMap key).
`debug.ts:316-318` dispatches on that one tag and calls `getLazyParser` on whichever it gets. Severity is INFO
because no behavior turns on the ambiguity today beyond D-C1's mis-dispatch, which is already counted.

---

## 5. Superlatives (L-18 runs both ways — each with its falsifier)

### S-1 — The closure-local cache is the *correct* mechanism, and the comment states the non-obvious reason

`lazy.ts:17`: *"Closure-local lazy cache — avoids mutating function objects (megamorphic IC pollution)"*. The
obvious implementation is to stamp the memo on the thunk (`fn.__cached = …`). That transitions the function object's
hidden class and de-optimizes every inline cache holding it — a real V8 effect most combinator libraries get wrong,
and one that would land squarely on the hottest object in a recursive grammar. This module picked the right
mechanism **and wrote down why**, which is rarer than picking it.

**Falsifier.** If `createLazyCached` stamped a property, the comment would be aspirational. `lazy.ts:19` is
`let cached: Parser<T> | undefined;` — a genuine closure variable; `grep -n "fn\." lazy.ts` finds no property write.

### S-2 — Laziness is deferred to first **parse**, not first construction — which is what makes module-scope mutual recursion declarable

Measured: `A after construct calls= 0` / `B after parse calls= 1` / `C after 2nd parse calls= 1`. Constructing
`Parser.lazy(fn)` does not force the thunk, so `parsers/json.ts:25,28` can write `jsonArray` and `jsonObject` as
top-level `const`s that reference each other without a TDZ throw. Deferring to *construction* would have been the
easy, wrong choice and would have made the library's own JSON parser unwritable in that idiom.

**Falsifier.** If the thunk ran at construction, `Parser.lazy(() => …p…)` at module scope would throw
`ReferenceError: Cannot access 'p' before initialization`. Probe A reads `calls = 0`, and `json.ts:25,28` compiles
and runs.

### S-3 — The hot path is one perfectly-predicted branch and zero allocations per parse

`lazy.ts:20-23`. After the first parse, `cached` is a monomorphic non-`undefined` slot; `if (!cached)` predicts
perfectly forever; nothing is allocated per invocation; the indirection is a single property load plus a call.
For the **one** member of this module the X·P algebra keeps (§6), that is exactly the right shape — six lines, no
Map lookup, no per-parse closure, no try/catch.

**Falsifier.** A per-parse `fn()` call, a `Map.get`, or a per-parse object would show in an allocation profile.
The body is four statements and contains none of them; probe `X` (re-parse after cache fill) shows the thunk
counter unchanged.

---

## 6. What the X·P dual-target algebra keeps, wraps, or retires here

Read against `W2.md §3b/§3c` (the algebra + the candidate field), `W2.md §G-10/§G-11`, and
`registry/adjudicated/parser-band.md:111,118,134,142`.

| symbol | verdict | binding reason |
| --- | --- | --- |
| `createLazyCached` (`lazy.ts:18-24`) | **WRAP — keep the engine, change the contract** | cand-O's architecture requires **exactly one** lazy back-edge (`parser-band.md:111`); this is its only engine, and §S-1/S-3 say the engine itself is right. Two wrappers are mandatory, not optional: **(a)** a construction-time depth bound so G-11's `ok:false` replaces the `RangeError` (`parser-band.md:118`; `W2.md:822-826`) — closing D-C9; **(b)** an accessor for the realized parser so G-10's graph-walk measures the shipped graph — closing D-C2 and, with it, D-C1. Both changes live in these six lines. |
| `lazy` (decorator, `lazy.ts:30-43`) | **RETIRE** | D-C3 (throws under the repo's own tsconfig) + D-C4 (wrong `this`) + D-C5 (docstring false, no caching) + D-C12 (dead generic) + zero consumers anywhere. It is not a candidate-neutral primitive; it is a broken convenience frozen into 1.0.0. `index.ts:9-11` already establishes the excision idiom. |
| `getLazyParser` (`lazy.ts:7-15`) | **RETIRE from `.` and `/core`; if kept, DEMOTE to the accessor of row 1** | D-C1 (the phantom-graph engine) + D-C6 (forks across conditions) + D-C7 (unconstrained generic, `undefined` hole, unchecked cast). Its single in-repo caller is `debug.ts:318` — a debug printer. A debug-only cache does not belong on the primitive barrel; and once row 1's accessor exists, `debug.ts:318` should call *that*, and this export has no reason to survive at all. |
| the `"lazy"` `parserNames` tag (`state.ts:149`) | **KEEP, disambiguate** | The tag is what makes G-10's structural walk possible at all — the algebra needs to *find* back-edges. But per D-C13 it currently conflates three producers. One tag per producer, or `args[0]` typed, is the minimum for a registry-comparing gate (`W2.md:128`, G-2 "compares registries, never counts"). |

**The gap this challenge adds to the hitherto corpus.** O-15 PT-04 and DEBT-3 both treat `lazy` as a **depth**
problem. It is also an **observability** problem: `W2.md:812-815` and `parser-band.md:17` both stake the idiom gate
on *walking the built graph*, and this module makes the built graph unreachable (D-C2) while offering an export that
looks like the accessor and silently returns a phantom (D-C1). A depth bound alone satisfies G-11 and still leaves
G-10 measuring an object that never runs. Both wrappers, or neither.

---

## 7. Probe ledger (reproducible; nothing armed)

All probes: `cd /Users/mkbabb/Programming/parse-that/typescript`, `node --input-type=module`, against the committed
`dist/`. `memoize()` never called → `PACKRAT_ARMED` false throughout; `enableDiagnostics()` never called.

| id | probe | result |
| --- | --- | --- |
| A–E | thunk-invocation count across construct / parse / parse / toString / toString | `0 · 1 · 1 · 2 · 2` |
| F,J,K | executing vs printed graph identity | `id 42` vs `id 47`, `SAME? false`; WeakMap holds `47` |
| G,H | `lazy.length` / `Parser.lazy.length` | `3` (legacy decorator shape) / `1` (no depth arg) |
| I | `getLazyParser` on an `undefined`-returning thunk, 3 gets | **3** invocations |
| L | `flags` after `.trim()` / `.eof()` | `0` / `0` |
| M | `lazy(fn, {kind:"method",name:"m"})` (TC39 shape) | `TypeError: Cannot read properties of undefined (reading 'value')` |
| N,O,P | two instances, distinct `this.tok`, decorated method | both fail; grammar = `"<<undefined-this.tok>>"` |
| Q | `Parser.lazy` depth ceiling (surface-gaps protocol) | deepest OK **8,277**; `RangeError` at **8,278** |
| R,S,T | ESM/CJS dual load | `Parser` identity `false`; `getLazyParser(fn)` → ids `37`/`38` |
| U,V,W,X | decorator per-call cache | 3 distinct Parsers; **3** method invocations for 3 parses |
