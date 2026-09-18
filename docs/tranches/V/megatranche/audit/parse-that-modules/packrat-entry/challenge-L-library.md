claude-opus-5[1m]

# CHALLENGE — `packrat-entry` · axis L (LIBRARY)

**Target**: `/Users/mkbabb/Programming/parse-that/typescript/src/parse/packrat-entry.ts` — 5 lines, 270 B, 1 statement, 3 exported names.
**Read whole**: the target + its only import `packrat.ts` (489) + that module's imports `parser.ts` (712) and `state.ts` (190), plus the transitive `lazy.ts` (44), `leaf.ts`, `utils.ts`, `debug.ts` reached through `parser.ts`; the manifest half of the entry (`package.json#exports["./packrat"]`, `vite.config.ts:14-20`); the gates that name it (`test/subpath-gate.mjs`, `test/manifest-gate.mjs`, `scripts/proof-packrat-armed.mjs`); and the shipped artifacts (`dist/packrat.js`, `dist/packrat.cjs`, `dist/packrat-entry.d.ts`, `dist/packrat.d.ts`, `dist/packrat-entry-CS1td-8B.js`, `dist/packrat-entry-46NYx4_U.cjs`, `dist/parse.js`, `dist/parse.cjs`, `dist/core.js`, `dist/diagnostics.js`). All read-only.
**Measured against**: `typescript/dist/` as built **2026-07-29 14:20**; parse-that main checkout at `ef10d5b`; node **v26.0.0**, darwin arm64.
**Law compliance**: **no `memoize()` / `mergeMemos()` was constructed** in any probe — `PACKRAT_ARMED` was **not** tripped by this seat. No `enableDiagnostics()`. No browser tooling. Three read-only probes were run from the scratchpad against `dist/` (import-namespace enumeration, cross-format identity, unarmed allocation count, non-string boundary); each is reproduced inline with its command shape. Sole write: this file.
**STOP-probe**: `ls -d /Users/mkbabb/Programming/parse-that-css-totality-p2` → *No such file or directory*. **Absent, as required. No STOP finding.** No `.worktrees/`, frozen root, or `~/Documents/Codex` path was entered.

---

## 0. VERDICT

| | count |
|---|---|
| **BLOCKER** | **1** |
| MAJOR | 6 |
| MINOR | 6 |
| **defects total** | **13** |
| **superlatives** | **6** |
| corroborations (not defects) | 4 |
| hypotheses killed against myself | 4 |

**Posture.** Assumed DEFECTIVE until the tree proved otherwise. On its *stated* job — narrowing a 6-export module to a 3-export public tier — it proved otherwise, cleanly and measurably (S-1, S-6). It fails on everything the narrowing is *for*.

**The headline.** `packrat-entry.ts` is a curator. Its entire product is the answer to one question: *what does `"@mkbabb/parse-that/packrat"` mean?* The answer it ships is:

* **one usable function** — `memoize` — because `mergeMemos` is the same implementation with a different debug string (E-M2) and `resetPackrat` has no correct call site and can throw a `TypeError` out of `.parse()` (E-M3, = packrat/L-M1);
* **91.1 % of the entire library** by shipped bytes, including the diagnostics accumulator, the debug printers and every import-time side effect, under a `"sideEffects": false` declaration (E-M1) — the "tier" is nominal;
* **nothing with which to use it**: no `Parser`, no `ParserState`, no types (E-M6), so every consumer *must* pair this subpath with a second entry;
* and, because the manifest offers `import` **and** `require` for both, that mandatory pairing is where the **BLOCKER** lives: the two formats are **separate module instances with separate `PACKRAT_ARMED` latches, separate memo tables, and colliding `PARSER_ID` counters** (E-B1) — measured, not inferred.

Every one of those is a decision made *in this file or its manifest row*, not inherited from `packrat.ts`. The 24 defects the sibling challenge found inside `packrat.ts` are folded, not restated; where I agree I cite, where the bytes disagree with the corpus I contradict explicitly (§9).

---

## 1. THE MODULE, VERBATIM

```ts
// Subpath entry: "@mkbabb/parse-that/packrat" (A.W3).
//
// The opt-in packrat / left-recursion memoization tier. Thin re-export of
// packrat.ts (NOT modified here — owned by A.W2 on its own branch).
export { memoize, mergeMemos, resetPackrat } from "./packrat.js";
```

Five lines. Line 3–4 make two factual claims — *"thin"* and *"owned by A.W2 on its own branch"*. Both are false at today's tree (E-M1, E-m3). Line 5 is byte-identical to `index.ts:8`.

---

## 2. METHOD — what was measured, and how

| # | probe | result |
|---|---|---|
| P1 | `import(dist/packrat.js)`, enumerate namespace | `memoize,mergeMemos,resetPackrat` — exactly 3. `packratEnter`/`packratExit`/`getCijKey`/`Parser`/`ParserState` all `false` under `in`. |
| P2 | same, but `require(dist/packrat.cjs)` in the **same process** | same 3 names; `esm.memoize === cjs.memoize` → **`false`**; `esm.resetPackrat === cjs.resetPackrat` → **`false`**. |
| P3 | `import(dist/parse.js)` + `require(dist/parse.cjs)`, compare | `esmRoot.Parser === cjsRoot.Parser` → **`false`**. First parser minted in each: **id 37 in both** — two independent `PARSER_ID` counters (`parser.ts:18`, `:25`). |
| P4 | subclass `globalThis.Map` **before** importing `dist/packrat.js`, count constructions | **4** at import: chunk `:173` `PARSER_STRINGS`, `:675` `MEMO`, `:676` `HEADS`, `:680` `GROWING`. Then importing the **full barrel** adds **0** more. |
| P5 | 2,000 non-memoized `.parse()` calls, unarmed | **0.0 packrat Maps per parse** — S.H1's no-op claim independently GREEN (S-3). |
| P6 | non-string `.parse()` across three leaf shapes | three-valued, coercion-dependent — §9 PT-07 row. |

No probe constructed a memoizer; P5's counter would have shown 3/parse if anything had (the project's own `scripts/proof-packrat-armed.mjs:120-138` POISON mode is exactly that experiment, and this seat did not run it).

---

## 3. BLOCKER

### E-B1 — the exports map ships two module instances with two latches, two memo tables and colliding parser ids; a mixed-format graph silently reverts PT-B1

**Provenance.** `package.json:20-28` — `"./packrat"` declares `"import": "./dist/packrat.js"` **and** `"require": "./dist/packrat.cjs"`; `"."` (`:9-13`) does the same for `parse.js`/`parse.cjs`. `dist/packrat.js:1` imports the ESM chunk `./packrat-entry-CS1td-8B.js`; `dist/packrat.cjs:3` requires the CJS chunk `./packrat-entry-46NYx4_U.cjs`. **These are two files, each carrying its own copy of every packrat global:**

| binding | ESM chunk | CJS chunk |
|---|---|---|
| `let MEMO = new Map()` | `:675` | `:676` |
| `let HEADS = new Map()` | `:676` | `:677` |
| `let PACKRAT_ARMED = false` | **`:678`** | **`:679`** |
| `let GROWING = new Map()` | `:680` | `:681` |
| `if (!PACKRAT_ARMED) return null` (`packratEnter`) | `:682` | `:683` |
| `if (!PACKRAT_ARMED) return` (`resetPackrat`) | `:714` | `:715` |
| `PACKRAT_ARMED = true` (`makeMemoized`) | **`:722`** | **`:723`** |

O-15 PT-03 and `W1.md:439`/`:575` cite **only the ESM ordinals** (`:678`, `:722`, `:682`, `:714`). They are exact — for one of the two latches that ship.

**Measured (P2/P3), not inferred:**

```
esm.memoize === cjs.memoize            -> false
esm.resetPackrat === cjs.resetPackrat  -> false
esmRoot.Parser === cjsRoot.Parser      -> false
first fresh parser id, each format     -> 37 and 37     (ids COLLIDE across instances)
```

**The defect, in two independent mechanisms.**

*Mechanism 1 — the epoch never opens.* `packratEnter`/`packratExit` have exactly two call sites, `parser.ts:43` and `:47`, inside `Parser.parseState` — **of the same instance**. Arming happens in `makeMemoized` (`packrat.ts:290`) — **of the same instance**. So a graph whose memoized node came from instance A but whose top-level parser is an instance-B `Parser` (any `.then`/`.or`/`.next` on a B parser yields a B parser) is driven by **B's** `parseState` → **B's** `packratEnter` → **B's** latch, which is `false` → `return null` → **no epoch**. A's `MEMO`/`HEADS`/`GROWING` are then never swapped and never cleared for the life of the process. That is precisely the state PT-B1 described and 0.12.0 fixed: `memoize(p).parse('hello')` then `.parse('world')` returning `'hello'` (`CHANGELOG.md` 0.12.0; `packrat.ts:161-164`).

*Mechanism 2 — memo-key collision inside a single parse.* `getCijKey` is `parser.id * 2**32 + offset` (`packrat.ts:99`) with **no instance component**, and `PARSER_ID` is a per-module-instance counter (`parser.ts:18`) that restarts at 0 in each bundle. Measured: the first user-minted parser is **id 37 in both formats**. Two *different* parsers therefore share a key in whichever `MEMO` the wrapper closes over, at the same offset — a mis-restore that needs no second `.parse()` call at all.

**Entry culpability — why this is filed against a 5-line file.** The subpath exports **no `Parser`, no `ParserState`, and no types** (P1; `dist/packrat-entry.d.ts` is 3 value names, 0 type names). It is therefore *impossible* to consume `/packrat` without importing a second entry — the repo's own examples do exactly that (`docs/tranches/A/A.md:390`, `A.W3.md:97`). This file's curation choice **mandates** the pairing; the manifest row this file backs **offers two conditions** for both halves of it; and neither file, nor the docstring, nor any gate says the pairing must not cross formats.

**Severity — and an explicit grade delta I owe the corpus.** `diagnostics/challenge-L-library.md` L-m6 raised the dual-package hazard for the diagnostics globals and graded it **MINOR**, correctly: the consequence there is a lost log. Here the consequence is a **wrong parse value** of a class already adjudicated a shipped BLOCKER once. Same hazard class, different blast radius; I grade up and record the reason rather than diverge silently. Following the precedent of `packrat/challenge-L-library.md` L-B2 (graded BLOCKER on a predicted-but-unmeasured consequence), the final end-to-end step is a **prediction**, because measuring it requires constructing a memoizer and arming the latch — forbidden to this seat.

**FALSIFIER (for the wave, one fresh process, deliberately arming):**

```js
const esm = await import(".../dist/parse.js");
const cjs = require(".../dist/parse.cjs");
const { memoize } = await import(".../dist/packrat.js");   // instance A
const inner = memoize(esm.regex(/[a-z]+/));                 // A arms; A's tables
const outer = cjs.string("<").next(inner).skip(cjs.string(">"));  // B drives
outer.parse("<hello>"); const second = outer.parse("<world>");
```
**Prediction: `second === "hello"`** — PT-B1 revived. If it is `"world"`, mechanism 1 is refuted and this drops to MAJOR (mechanism 2 stands on the measured id collision alone). **Whole finding collapses to INFO** if any of these becomes true: the `require` condition is dropped (ESM-only), the packrat state is moved onto a `Symbol.for()` `globalThis` slot, or `PARSER_ID` is seeded from a cross-realm source. None is true today — `grep -n "globalThis" dist/packrat-entry-CS1td-8B.js` returns nothing for any packrat binding.

---

## 4. MAJOR

### E-M1 — the "opt-in tier" is 91.1 % of the library, evaluates 100 % of its import-time effects, and the docstring calls it "thin"

**Provenance.** `packrat-entry.ts:3-4` — *"Thin re-export of packrat.ts"*. At the shipped bytes:

```
dist/packrat.js                      158 B  ->  imports:
dist/packrat-entry-CS1td-8B.js    40,576 B  ->  line 1 imports:
dist/diagnostics-DDazRHgl.js       3,516 B
                          total   44,250 B
full barrel (parse.js + chunk + diagnostics + core.js + utils.js) = 48,576 B
                                            /packrat = 91.1 % of the whole library
```

The 40,576-byte chunk is not packrat. It is `parser.ts` + `leaf.ts` + `state.ts` + `lazy.ts` + `debug.ts` + `packrat.ts` — the entire parser core, including `parserDebug` and two `console.error`/`console.log` sites (`:262`, `:882`, `:1403`). Its **line 1** imports the diagnostics chunk, so the packrat tier drags the diagnostics accumulator as well.

**Measured (P4).** Importing `dist/packrat.js` *alone* constructs **4 Maps** and mints **37 `Parser` instances** (`_initWhitespace()` at chunk tail; `parser.ts:711`). Importing the **full barrel afterwards adds zero further Maps** — the tier boundary is nominal at runtime, not merely at byte count. `package.json:5` declares `"sideEffects": false` over all of it, and `manifest-gate.mjs:36-40` **asserts** that declaration as a passing gate.

**FALSIFIER.** Show a bundler configuration under which `import { memoize } from "@mkbabb/parse-that/packrat"` emits materially less than the barrel. Tree-shaking can prune unreferenced *exports*, but `memoize` transitively references `Parser` → `leaf` → `debug` → diagnostics; the chunk is one Rollup module and the `_initWhitespace()` call is module-scope. For the plain-Node consumer (no bundler) the whole 44,250 B is *evaluated*, measured above. — *Not found.*

**Fold.** Same class as `diagnostics/L-M8` (`core.ts`'s "never pulls the diagnostics accumulator" is false at the bytes) and `utils-entry/D-7`. New here: the direction is reversed and worse — this is the tier the split existed to *isolate*, and it is the one that carries the chunk's name (E-m4).

### E-M2 — 2 of the tier's 3 exports are the same function; the difference is a debug string nothing reads

**Provenance.** `packrat.ts:482-488`:

```ts
export function memoize<T>(p: Parser<T>): Parser<T>   { return makeMemoized(p, "memoize"); }
export function mergeMemos<T>(p: Parser<T>): Parser<T> { return makeMemoized(p, "mergeMemo"); }
```

`name` reaches exactly one place — `createParserContext(name, p)` at `packrat.ts:479` → `context.name` (`state.ts:173-177`). Repo-wide readers of that field: `parser.ts:488` (`=== "whitespace"`) and `debug.ts`'s printers. **Nothing anywhere branches on `"mergeMemo"`** — `grep -rn "mergeMemo" src/ test/ scripts/` returns only the two definitions, the `parserNames` literal (`state.ts:151`), the two barrels, four prose comments, and one test import. The module's own comment concedes it: *"memoize() and mergeMemos() share the SAME left-recursion machinery — they differ only in the `name` recorded"* (`packrat.ts:275-278`).

**Why it is a defect of *this* file.** On the barrel it is 2 of ~30 names. Here it is **two thirds of a three-name public tier**, and the subpath's design record presents them as distinct capabilities: `docs/tranches/A/A.md:348` — *"`memoize`, `mergeMemos`, `resetPackrat`. Opt-in LR tier."* A consumer choosing between them is choosing a printer label while believing they are choosing an algorithm.

**FALSIFIER.** Exhibit one input/grammar pair for which `memoize(p)` and `mergeMemos(p)` produce different values, offsets, or error states. — *None can exist without a reader of `context.name === "mergeMemo"`, and there is none.* Refuted the moment such a reader lands; until then the tier publishes one function twice.

### E-M3 — `resetPackrat` is one third of the tier, has no correct call site, and one of its two reachable behaviours is a `TypeError` out of `.parse()`

**I do not re-grade the sibling.** `packrat/challenge-L-library.md` **L-M1** establishes this at MAJOR with three arms (A: a provable no-op between epoch-opened parses; B: mid-parse it clears `MEMO` under three unchecked `!` dereferences at `packrat.ts:396`, `:401`, `:455`, reproducing the PT-Q1 crash signature that `scripts/proof-packrat-reentrant.mjs:1-9` documents verbatim; C: its only non-vacuous use is on the un-epoched bypass path). I concur with all three and with MAJOR.

**What is new at this altitude — two entry-owned aggravations.**

1. **Curation.** `index.ts:8` publishing it is a barrel sin of omission. `packrat-entry.ts:5` publishing it is a *selection*: the file's only job is choosing 3 names out of 6, and one of the three chosen is the one with the empty correct-use set. The two names it *declined* to publish (`packratEnter`, `packratExit`) are the ones that actually perform the reset, correctly, per parse.
2. **It is the reset that does not reset.** O-15/PT-03 measured the arm tax at **93.9 → 138.2 ns/parse (1.47×)** and `resetPackrat()` leaving it at **139.3**. A consumer reading a three-name tier — `memoize`, `mergeMemos`, `resetPackrat` — will reasonably read the third as "and this puts it back". It clears three Maps that `packratEnter` (`packrat.ts:225-227`) already replaced wholesale, and leaves the latch (`packrat.ts:266` returns *before* touching anything when unarmed; there is no `PACKRAT_ARMED = false` anywhere in either bundle).

**FALSIFIER.** A call site in the repo or in value.js where `resetPackrat()` changes an observable outcome. Repo-wide consumers outside tests: **zero** (`memoize.test.ts:14,67,91,108,120`; `reentrancy.test.ts:104,197` — all on the un-epoched `p.parser(state)` path per packrat/L-B2). value.js: **zero** — `grep -rn "memoize\|mergeMemos\|resetPackrat\|parse-that/packrat" src/ demo/ api/` returns two unrelated prose hits and no import; `@mkbabb/parse-that` is not a dependency of value.js at all today. — *Not found.*

### E-M4 — the tier's arm-state is unobservable, and this file is the one place a cure belongs

**Provenance.** The published surface is 3 names (P1, both formats). None observes `PACKRAT_ARMED`. `W1.md:434`/`:459` makes it a binding harness clause — *"`PACKRAT_ARMED === false` at entry and exit of every cell, **read from the dist, never inferred**"* — and `W3.md:116`/`:522` requires *"the packrat arm-state printed on every row"* of the bench ledger. `packrat/challenge-L-library.md` L-M6 arm 2 already ruled G-4 **unsatisfiable as written**; I concur.

**What I add.** The unsatisfiability is *this module's* to cure and no other's. `packrat.ts` holds the binding; `index.ts` is the kitchen-sink barrel; **`packrat-entry.ts` is the file whose declared purpose is the packrat tier's public API.** The cure is one export here (plus a two-line accessor upstream), after which G-4 becomes literally satisfiable and W3's per-row print becomes a read rather than an inference. `W1.md:126` names precisely the inference the missing accessor forces on the harness: *"'we did not call `memoize`, therefore it is unarmed' — the latch is set by `makeMemoized()`, which the grammar may [reach]"*.

**FALSIFIER.** Any exported route to arm-state — a getter, a symbol, a dev-only global. `grep -n "ARMED" dist/packrat.js dist/packrat.cjs dist/packrat-entry.d.ts` → **no hits in any of the three**; the identifier exists only inside the chunks. — *None.*

### E-M5 — no gate constrains the export set; the entry itself has zero direct test coverage

**Provenance.** `packrat-entry.ts` is referenced in exactly two places repo-wide: `package.json:24` (`types`) and `vite.config.ts:18` (build entry). `grep -rn "packrat-entry" src/ test/ scripts/` finds nothing else. The tier's only assertion is `test/subpath-gate.mjs:44-46`:

```js
if (typeof packrat.memoize !== "function") { fail("./packrat did not export `memoize` as a function"); }
```

One name, one `typeof`. `memoize.test.ts:1` imports from `"../src/parse"` — the **barrel** — so no test in the repository ever loads this module or the artifact built from it.

**Consequence.** Every curation property the file exists to hold is unpinned. Widening line 5 to `export * from "./packrat.js"` would publish `packratEnter`, `packratExit` and `getCijKey` as public API — and `proof:subpath`, `proof:manifest`, `proof:packrat-armed` and the whole vitest suite stay **GREEN**. Narrowing it to drop `mergeMemos` or `resetPackrat` would likewise pass. The entry's duplication of `index.ts:8` is the same hazard from the other side: two files must be edited in lockstep with nothing enforcing it (same class as `utils-entry/D-11`).

**FALSIFIER.** A gate asserting set equality or set membership beyond `memoize`. — *None; the four `proof:*` scripts that could (`subpath`, `manifest`, `packrat-armed`, `packrat-cross-input`) assert existence, manifest hygiene, allocation flatness and cross-input behaviour respectively — none enumerates.* Precedent for the class: `packrat/L-M7` (a named proof gate certifying a property the code does not have) and `diagnostics/L-B5` (`proof:subpath` never loads `/diagnostics` at all).

### E-M6 — the subpath is not self-contained in TypeScript: 2 of 3 exports name a type it does not export

**Provenance.** `dist/packrat-entry.d.ts` is one line — `export { memoize, mergeMemos, resetPackrat } from './packrat.js';` — **three value names, zero type names**. Both `memoize` and `mergeMemos` are `<T>(parser: Parser<T>) => Parser<T>` (`packrat.ts:482`, `:486`). `Parser` is reachable only from `"."` or `"./core"`.

A consumer who wants to write the type of a memoized rule — `const expr: Parser<Ast> = memoize(...)` — must import from a second entry purely to *name* the type. TypeScript's structural typing makes the cross-entry pairing sound at the type level; it is E-B1 that makes the corresponding **runtime** pairing unsound, and this defect is what forces every consumer into it.

**FALSIFIER.** Show the type is nameable from the subpath alone. — *Refuted at the bytes: the `.d.ts` is one re-export line with no `export type`.* **Fold**: `diagnostics/L-M11` found the identical class ("two of six exports take a type it does not export"). Here it is **two of three**, and unlike `/diagnostics` this tier's exports are *higher-order* — they take and return the missing type, so no consumer can avoid it.

---

## 5. MINOR

### E-m1 — the entry's basename collides with the module it re-exports; `dist/packrat.js` and `dist/packrat.d.ts` describe different modules

`vite.config.ts:18` maps entry key `packrat` → `src/parse/packrat-entry.ts`, so the built runtime lands at `dist/packrat.js` (**3 exports**, verified P1). Meanwhile `dts({ include: ["src/"] })` (`vite.config.ts:25`) emits a declaration for *every* source file, so `dist/packrat.d.ts` — the sibling of that runtime by basename — declares **6 exports** (`getCijKey`, `packratEnter`, `packratExit`, `resetPackrat`, `memoize`, `mergeMemos`) plus five internal interfaces (`Answer`, `LR`, `Head`, `MemoCell`, `PackratEpoch`).

**I concur with `packrat/challenge-L-library.md` §8.3's kill**: on the sanctioned path there is *no* leak — `exports["./packrat"].types` routes to `packrat-entry.d.ts`, whose 3 names are a subset of the 6, and the absence of a `./dist/*` wildcard blocks deep imports for every exports-aware resolver. Types and runtime **agree today**.

**What survives as a defect** is the latent trap, not a live leak: the type graph and the runtime graph disagree about what the specifier `./packrat.js` *denotes* — to `tsc` reading `packrat-entry.d.ts` it is the internals module; to Node reading `dist/packrat.js` it is the entry. They coincide only by the subset accident, and the accident is unpinned (E-M5). Secondary: `files: ["./dist"]` (`package.json:60-62`) ships the internals' declarations into every consumer's `node_modules` as de-facto documentation of an API that is not public.

**FALSIFIER.** A resolver that pairs `dist/packrat.js` with `dist/packrat.d.ts` under the published manifest. — *Not found for exports-aware resolvers; and node10 cannot resolve the subpath at all (E-m2), so it cannot mis-pair it either.* Cure is one rename: `src/parse/packrat/index.ts`, or an entry key that is not a source basename.

### E-m2 — no `default` condition, no `engines`; legacy resolution fails hard rather than degrading

`exports["./packrat"]` (`package.json:22-27`) offers `types`/`import`/`require` and no `default`. A resolver whose condition set contains neither `import` nor `require` (a custom `conditionNames`, some `browser`-first pipelines) gets an unresolvable specifier, not a fallback. Under classic/node10 resolution the subpath cannot resolve either: `files` ships only `dist/`, so there is no root-level `packrat.js`, and `typesVersions` was deliberately removed by A.W0 (`manifest-gate.mjs:3-8`). `package.json` declares no `engines`, so nothing states the modern-resolver requirement.

**FALSIFIER.** "Modern-only is a legitimate posture" — agreed, and it is why this is MINOR rather than MAJOR. The defect is that the posture is **undeclared**: the failure a 2019-era toolchain sees is `Cannot find module '@mkbabb/parse-that/packrat'`, with no `engines` row to explain it.

### E-m3 — stale coordination prose shipped in a published source file

`packrat-entry.ts:4` — *"(NOT modified here — owned by A.W2 on its own branch)"*. A.W2 landed long ago (`docs/tranches/A/PROGRESS.md:14` records the landing; the branch does not exist at `ef10d5b`, whose recent history is the S.H4 1.0.0 cut). Two of the file's five lines are an instruction to a maintainer that no longer denotes anything, in a file shipped to consumers via `files: ["./dist"]`'s sourcemaps (`dist/packrat.js.map` embeds the source). Paired with the false *"thin"* (E-M1), **2 of 5 lines are wrong**.

### E-m4 — the library's core chunk is named after this 5-line module, and the corpus now cites `parser.ts` code as "packrat-entry"

Rollup names a shared chunk after one of its entry points; it chose this one. Both bundles' entire core therefore ships as **`packrat-entry-CS1td-8B.js`** / **`packrat-entry-46NYx4_U.cjs`**. Downstream, that name has become the citation of record for code that is not packrat: O-15/PT-01 cites *"`dist/packrat-entry-*.js:881`"* for the unconditional `console.error`, whose source is **`parser.ts:67-69`** (today `:882` ESM / `:883` CJS — the ordinal drift is already flagged by `utils-entry/D-16`-adjacent notes and `packrat/L-i4`; the *attribution* is the part I add). `W1.md:439`/`:575` likewise print `"packrat-entry chunk"` as the LATCH provenance.

The evidence is not wrong — the code is in that file — but the entry's name has silently annexed the whole library in every cite the megatranche will carry forward. **FALSIFIER**: rename the vite entry key or set `build.rollupOptions.output.chunkFileNames`, rebuild, and the cites move. Cost: one line of `vite.config.ts`. Recorded so the wave re-issues cites against a name that means what it says.

### E-m5 — `CURRENT_SRC: string | undefined` receives non-strings on this tier's reachable boundary

`packrat.ts:186` declares `let CURRENT_SRC: string | undefined`; `packrat.ts:433-435` assigns `state.src`, typed `string` at `state.ts:48`. Measured (P6), non-string inputs reach a parser body without throwing: `regex(/[0-9]+/).parse({})`, `.parse(true)`, `.parse(["a"])` all return `undefined` with no throw — the value is coerced inside `RegExp.prototype.exec`, never by an explicit guard. A memoized node on such a parse writes the non-string into `CURRENT_SRC`.

Consequence today: **nil** — `packrat/L-m1` establishes `CURRENT_SRC` is never read for a decision. It is a type lie of record on the entry's own dependency, and it is the anchor the module's comment (`packrat.ts:183-185`) calls *"a within-epoch assertion anchor"* — an assertion anchor that can hold `{}`. **FALSIFIER**: a `typeof` guard or a read site. — *Neither exists.*

### E-m6 — "inert until armed" is per-parse, not per-process: the tables are allocated at import regardless

`packrat.ts:133-134`, `:193` allocate `MEMO`/`HEADS`/`GROWING` at module scope; measured (P4) as 3 of the 4 Maps constructed by merely importing `dist/packrat.js`. S.H1's claim (`packrat.ts:137-155`) is about the **per-parse** allocation and is exactly true (S-3); the surrounding prose — *"the packrat machinery is inert"*, *"touches no globals"* (`:210-214`) — reads as per-process and is not. Cost is three empty Maps once; the defect is the claim's scope, in the doc block this entry's tier is sold on. **FALSIFIER**: lazy-init the trio inside `packratEnter`. — Not done; `packrat/L-M6` proposes the same cure from the other side.

---

## 6. CORROBORATION (not defects)

**C-1 · PT-03 re-verified in both bundles.** Four `PACKRAT_ARMED` sites per bundle, one `true` write, **no assignment back to `false` in either** — ESM `:678/:682/:714/:722` (O-15's ordinals, exact), CJS `:679/:683/:715/:723`. Concurs with `packrat/§7`. The *new* reading is that "the latch" is a category error: there are **two**, and O-15 cites one (feeds E-B1).

**C-2 · S.H1 measured GREEN, independently.** P5: 2,000 non-memoized `.parse()` calls allocate **0.0** packrat Maps. The latch's stated benefit is real (S-3).

**C-3 · PT-04 folded, not re-measured** (arming forbidden). Structural prediction for the wave: a memoized recursive rule costs **3** frames per level (`memoizeFn` → `evalParser` → `parser.parser`, `packrat.ts:426`/`:295-300`) against **2** for a bare `Parser.lazy` back-edge (`lazy.ts:20-23`), so the memoized ceiling is strictly below PT-04's **7,761** — the same direction `packrat/L-i1` predicts and `utils-entry/D-8` measured for a *different* multiplier (2,966 through `jsonParser`). **Falsifier**: binary-search a memoized left-recursive rule in a fresh process; if the ceiling is ≥ 7,761 the prediction dies. Counter-weight: the **grow** loop costs no stack at all (S-5).

**C-4 · PT-07 CONTRADICTED as a general claim** — see §9.

---

## 7. SUPERLATIVES (L-18 runs both ways)

### S-1 · The narrowing is real, correct, and verified in both formats — the file earns its existence

`packrat.ts` exports **six** names. Three of them — `getCijKey` (`:79`), `packratEnter` (`:216`), `packratExit` (`:243`) — are epoch primitives whose misuse is exactly the PT-Q1 corruption class. This file publishes **three**, and P1 confirms at runtime, in **both** bundles, that `packratEnter`, `packratExit` and `getCijKey` are **absent from the namespace** (`in` → `false`). The cheaper thing to write — `export * from "./packrat.js"` — is one keystroke shorter and would have published all six. It wasn't written. Among the five subpath entries this is the only one whose narrowing hides a *hazardous* API rather than merely a large one.

### S-2 · Intra-format single-instance is guaranteed by the chunking, and nobody had to think about it

`dist/packrat.js:1`, `dist/core.js:1` and `dist/parse.js:1` all destructure from the **same** specifier (`./packrat-entry-CS1td-8B.js`); the CJS trio likewise (`packrat-entry-46NYx4_U.cjs`). So a consumer who imports `Parser` from `"."` and `memoize` from `"./packrat"` — the exact pairing E-M6 forces — gets **one** `PACKRAT_ARMED`, **one** `MEMO`, **one** `PARSER_ID`. The soundness E-B1 threatens is intact within a format, for free. Worth naming precisely because it is *accidental*: a future `manualChunks` or `preserveModules` change would destroy it with no gate noticing.

### S-3 · The S.H1 no-op is not a claim, it is a measurement — and it reproduces

`packrat.ts:216-217` claims `packratEnter` "returns `null` and touches no globals" unarmed. Read at the bytes: `if (!PACKRAT_ARMED) return null;` is the **first** statement, and `packratExit` (`:244`) and `resetPackrat` (`:266`) guard symmetrically. Measured independently at 0.0 Maps/parse over 2,000 parses (P5), matching `scripts/proof-packrat-armed.mjs`'s clause without running it. A performance claim in a comment that survives an adversarial re-measurement is rare.

### S-4 · The tier is inert to `import` — arming requires a construction, not a reach

Importing `dist/packrat.js` does not arm anything: the write is inside `makeMemoized` (`packrat.ts:290`), reached only by calling `memoize`/`mergeMemos`. This audit imported the subpath in three separate processes and the latch stayed `false` throughout — which is *why* this seat could obey its law and still measure the tier. A subpath entry that armed a process-global latch at import would have made the entire read-only audit impossible; this one is honest enough to be studied.

### S-5 · What the tier actually buys: left recursion at **zero** stack cost

`growLR` (`packrat.ts:380-407`) is a `while (true)` loop with a strict-advance stop (`:398`), not a recursion — the seed grows iteratively — and it is wrapped in a `try/finally` (`:390`, `:402-406`) that restores `GROWING`/`HEADS` on any throw. Combined with the epoch's own `finally` at `parser.ts:46-48`, a mid-grow `RangeError` or user-`.map` throw unwinds cleanly at **two** nesting levels. Against C-3's frame-cost prediction this is the honest counter-weight: the feature this entry publishes converts a class of unbounded *recursion* into a bounded *loop*, which is the strongest thing anyone can say for a packrat tier.

### S-6 · Goldilocks, exactly — and the manifest row is well-formed where most are not

Five lines, one statement, no shim, no re-implementation, no backwards-compat alias, correct `.js` extension for NodeNext, and a comment that names the subpath specifier and the wave that created it. The manifest row backing it puts `types` **first** (`package.json:23`, the ordering most packages get wrong), gives all three fields real targets that `subpath-gate.mjs:27-35` proves exist, and — decisively — declares **no `./dist/*` wildcard**, which is what kills the deep-import leak that `packrat/§8.3` independently killed. Where this file is wrong it is wrong about *what it publishes*, never about *how*.

---

## 8. HYPOTHESES THE FALSIFIER KILLED (recorded, so the tally is honest)

**8.1 — "Importing `/packrat` arms the latch."** *Killed.* P4/P5: import mints no memoizer, and 2,000 subsequent plain parses allocate 0 Maps. Had this been true it would have been the BLOCKER; it is instead S-4.

**8.2 — "The epoch internals leak into the published API."** *Killed*, concurring with `packrat/§8.3` and now with runtime receipts in **both** formats (P1): the namespaces are exactly `{memoize, mergeMemos, resetPackrat}`. Survives only as the latent naming trap E-m1.

**8.3 — "The `types` target under-declares (or over-declares) the runtime."** *Killed.* `dist/packrat-entry.d.ts`'s three names are exactly the three runtime exports — measured, not assumed. The `exports` map's `types`-first ordering is correct.

**8.4 — "`/packrat` and the root barrel are separate instances *within* one format, so a barrel-built grammar plus a subpath `memoize` already splits the latch."** *Killed at the bytes* — both destructure from one chunk specifier (S-2). This is what confines E-B1 to the **cross-format** case, and it is the single largest reason E-B1 is not accompanied by a second BLOCKER.

---

## 9. CORPUS FOLD — agree, extend, contradict

| corpus row | disposition |
|---|---|
| **O-15 / PT-01** (label no-op unless armed; arming couples an unconditional `console.error`; `dist/diagnostics-DDazRHgl.js:14` + `dist/packrat-entry-*.js:881`) | **CONFIRMED**; ordinal drift to `:882` (ESM) / `:883` (CJS) already carried by `packrat/L-i4` and `utils-entry`. **NEW — attribution**: the cited file is named after *this* module but the code is `parser.ts:67-69`; the misfiling is manufactured by the chunk-naming (E-m4). Re-issue cites as `dist/packrat-entry-CS1td-8B.js:882 (source: parser.ts:68)`. |
| **O-15 / PT-03** (one-way latch `:678/:682/:714/:722`; 93.9→138.2 ns = 1.47×; `resetPackrat()` leaves 139.3) | **CONFIRMED byte-exact for the ESM bundle.** **EXTENDED, materially**: there are **two** latches, and the letter cites one — CJS `:679/:683/:715/:723` (C-1). That plurality is the mechanism of **E-B1**, so PT-03 should be re-stated as *"one one-way latch **per bundle format**"*. Also **EXTENDED by E-M3**: the 139.3 figure is the receipt for "the reset that does not reset". |
| **O-15 / PT-04** (lazy 7,761; `RangeError` at 7,762) | **FOLDED, not re-measured** (arming forbidden). Structural prediction + falsifier at C-3; counter-weight at S-5. Consistent with `utils-entry/D-8`'s measured 2,966 through a different multiplier — the general lesson is that 7,761 is a *floor for arity-1 lazy*, never a consumer-facing ceiling. |
| **O-15 / PT-07** (*"5/5 non-string inputs throw a raw `TypeError`"*; `.parse()` `undefined`-on-failure) | **CONTRADICTED as a general claim, with receipts.** Measured today against the same dist: `regex(/[0-9]+/).parse(42)` → `TypeError: state.src.substring is not a function`; `.parse(null)` / `.parse(undefined)` → `TypeError: … reading 'length'`; `string("ab").parse(42)` → `TypeError: state.src.startsWith is not a function`; but **`.parse({})`, `.parse(true)`, `.parse(["a"])` → `undefined`, no throw**, and `regex(/[a-z]+/).parse(42)` → `undefined`, no throw. The posture is **three-valued and coercion-dependent**: `RegExp.exec` coerces silently, and a `TypeError` appears only if the parser subsequently reaches a `String` method. This **corroborates `index/challenge-L-library.md` B-3** ("throw / silent-reject / silent-accept, not 5/5") and refines it: which branch you get is a function of the *first leaf combinator and whether the coerced string matches*. O-15's "5/5" is an artifact of its probe grammar. The letter's conclusion — that value.js's cure belongs **above** parse-that — is *strengthened*, not weakened: a boundary this input-dependent cannot be pattern-matched from outside. Also **E-m5**: the coerced non-string reaches `CURRENT_SRC`. |
| **`packrat/challenge-L-library.md` L-B2** (soundness bolted to 1 of 3 public entry points) | **ENDORSED and extended along a second axis.** L-B2 is *intra*-instance (`parser`/`call` bypass `parseState`); **E-B1 is inter-instance** (`parseState` runs, but on an unarmed twin). The two compose: on a mixed-format graph the bypass path additionally has no epoch to drop the table. |
| **`packrat/challenge-L-library.md` L-M1** (`resetPackrat` has no correct call site) | **CONCURRED at MAJOR — deliberately not re-graded.** E-M3 adds the entry-owned aggravations (1-of-3 curation; the "reset that does not reset" reading) and the zero-consumer receipt from value.js's tree. |
| **`packrat/challenge-L-library.md` L-M6 / §8.3** | **CONCURRED on both** (unobservable latch; no leak on the sanctioned path). E-M4 assigns the accessor's *home* to this file; E-m1 records what survives §8.3's kill. |
| **`diagnostics/challenge-L-library.md` L-m6** (dual-package hazard, graded MINOR) | **SAME CLASS, GRADED UP with the reason stated** (E-B1): lost log vs. wrong parse value reviving an adjudicated BLOCKER. |
| **`diagnostics/L-M8` · `utils-entry/D-7` · `index/M-1,M-2`** (tier isolation false; `sideEffects:false` untrue) | **CONCURRED and completed for the last tier**: `/packrat` is the *worst* case at 91.1 % of the library, 37 import-time `Parser` constructions and 4 Maps (E-M1). One reconciliation for the wave: I measure the barrel minting **37** parsers at import today; `index/M-1` reports **36**. Both were measured; the ±1 should be reconciled once against one build rather than carried as two numbers. |
| **`W1.md:94-96` one-fresh-process-per-cell** | **ENDORSED and given a third justification.** Beyond "the latch never disarms" and packrat/L-B2's table accumulation: **E-B1** means a harness that loads the library under two formats in one process has *two* arm-states, so even a correct per-process assertion could read the wrong one. The W1 rule should say *one fresh process **and one module format** per cell*. |
| **`W1.md:434/:459` G-4** (arm-state read from the dist, never inferred) | **CONTRADICTED as written** — concurring with `packrat/L-M6` arm 2 — and **assigned**: the cure belongs in `packrat-entry.ts` (E-M4). Until then, `proof-packrat-armed.mjs`'s retained-heap clause is the only observable form, and it is measured through the **barrel** (`scripts/proof-packrat-armed.mjs:47`), never through `/packrat`. |
| **`W2.md:810` / `parser-band.md:108,134` (`memoize = 0` idiom gate)** | **STRONGLY ENDORSED — with a new, independent reason.** The band's gate is justified today on soundness (`packrat/L-B1`) and on the process-wide arm tax. **E-B1 adds packaging**: a grammar with `memoize = 0` cannot be split across module instances by a consumer's format choice, because it never constructs the wrapper whose closure captures one instance's tables. The cheapest structural defence against every finding in this file is the one the band already ruled. |
| **`W3.md:289-292`** ("`resetPackrat()` must actually disarm rather than only clearing the memo store") | **AGREED, and E-M3 supplies the surface-level receipt**: the tier publishes exactly three names, the third is the one W3 wants fixed, and no fourth name can observe whether the fix worked (E-M4). Fix both in one edit to this file. |
| **`docs/tranches/A/A.md:348`, `A.W3.md:97`** (the subpath's design record) | **CONTRADICTED in one clause**: *"`memoize`, `mergeMemos`, `resetPackrat`. Opt-in LR tier."* presents three capabilities where the tree has one (E-M2 + E-M3). The `import { memoize } from "@mkbabb/parse-that/packrat"` example at `A.md:390` is also the shape that walks a consumer into the mandatory second import (E-M6) and therefore into E-B1's reach. |

---

## 10. DISPOSITION

The file is a good curator with a bad brief. Its narrowing is real, verified in both bundles, and hides exactly the three names that should be hidden (S-1); it is inert to import (S-4); it is the right size (S-6). Nothing in the 5 lines is clumsy.

What it publishes does not survive reading:

* a **tier that is 91.1 % of the library** and evaluates every one of its import-time effects, described in its own docstring as *"thin"* (**E-M1**);
* **one function published twice** under names the docs sell as distinct capabilities (**E-M2**);
* a **reset that cannot reset, has no correct call site, and can throw a `TypeError` out of `.parse()`** — one third of the surface (**E-M3**, = packrat/L-M1);
* **no way to observe the irreversible state the tier installs**, which is what makes W1's G-4 unsatisfiable (**E-M4**);
* **no gate on any of it**, and no test that ever loads the module (**E-M5**);
* a surface that **cannot be used without a second import** (**E-M6**) — and a manifest that offers two formats for that second import, where the two are **separate instances with separate latches, separate memo tables and colliding parser ids** (**E-B1**, the BLOCKER).

**Smallest edits that retire the most.** (1) Add an arm-state accessor upstream and export it here — retires **E-M4**, makes `W1` G-4 satisfiable, and makes `W3.md:289-292`'s "must disarm" checkable. (2) Drop `mergeMemos` from line 5 (or delete it upstream) — retires **E-M2**, one line. (3) Drop `resetPackrat` from line 5 until `packrat/L-M1`'s guard lands — retires **E-M3**'s curation arm, one line. (4) Rewrite lines 3–4 to state what the tier actually costs, and set `output.chunkFileNames` — retires **E-m3**, **E-m4**, and the *"thin"* half of **E-M1**. (5) For **E-B1**, the honest options are ESM-only publication, moving the packrat globals to a `Symbol.for()` realm slot, or re-exporting `Parser` (and its type) from this subpath so a consumer never needs a second entry — the third is one line here and is the only one this file can do alone.

**For the megatranche.** The operative consequences are: **(i)** O-15/PT-03 should be re-issued as *"one one-way latch per bundle format"* with the CJS ordinals added — the plurality is the mechanism of a BLOCKER, not a footnote; **(ii)** O-15/PT-07's "5/5 throw" is contradicted at today's bytes and should be re-stated as a three-valued, coercion-dependent boundary (corroborating `index`/B-3), which *strengthens* the letter's above-the-library cure; **(iii)** W1's one-fresh-process-per-cell rule should read *one process **and one module format** per cell*; **(iv)** W1's G-4 is unsatisfiable until this file gains a fourth export; and **(v)** `parser-band.md`'s `memoize = 0` gate now has a third independent justification — packaging — and remains the cheapest defence against every finding above.

---

*Read-only. No file in `/Users/mkbabb/Programming/parse-that` was modified. No memoizer was constructed and no diagnostics were enabled — the one-way latch was not tripped by this audit. `/Users/mkbabb/Programming/parse-that-css-totality-p2` does not exist and was not created. Sole write: this file.*
