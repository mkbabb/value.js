claude-opus-5[1m]

# CHALLENGE — `typescript/src/parse/index.ts` · axis **C (CONSUMPTION)**

**Subject**: `/Users/mkbabb/Programming/parse-that/typescript/src/parse/index.ts` — 14 lines,
**34 runtime exports + 6 type exports**; the `.` entry of `@mkbabb/parse-that@1.0.0`'s `exports` map.

**Axis**: how this module serves its consumers — the published surface vs. what value.js actually
consumes (the routing law's sole downstream); the `/css` packed surface at the far end of that law;
the RED-7 rows of `parsethat-surface-gaps.mjs` where they touch this module; API ergonomics; semver
hygiene; and what the X·P dual-target algebra (`docs/tranches/X/parse-that/waves/W2.md` §3b/§3c)
would keep, wrap, or retire here.

**Posture**: the module is assumed DEFECTIVE until the tree proves otherwise. Every claim carries a
severity, `file:line` provenance, and the falsifier that would kill it. Superlatives carry the same
burden — L-18 runs both ways (§5).

**Supersession**: this file is a re-run of the same slot and **carries the union** of every earlier
same-slot draft's rows and this pass's. Rows folded from an earlier draft are marked *(folded)* and
were **independently re-verified against the tree** before being carried; nothing was copied on
trust. Rows new to a pass are unmarked.

**Pass 3 (2026-08-04, `claude-opus-5[1m]`)** carried all 19 prior rows after re-verifying each one's
load-bearing cite against the tree — `packrat.ts:156/217/266/290` (one write, and it is `true`),
`parser.ts:67-68` (the print on the failure path), `dist/parse.cjs:25-27` (the `whitespace` getter),
`tsconfig.json:3,8` (`target: ES2022`, `verbatimModuleSyntax`, **no** `experimentalDecorators`),
`grep -c formatAllDiagnostics dist/packrat-entry-CS1td-8B.js` → `0`. **All 19 reproduce.** Pass 3
adds **seven** rows (C-M10…C-M15, C-m6) and **one** superlative (S-6) from a measurement class no
prior pass ran: *static* tree-shaking of the shipped `dist` under both bundler postures, which turns
C-M6's structural claim into bytes and produces one finding that **refines O-15 PT-03 in the
consumer's favour**.

**Ledger**: **26 defect rows — 2 BLOCKER · 15 MAJOR · 6 MINOR · 3 INFO** · **6 superlatives**.

**Writes**: this file only. `/Users/mkbabb/Programming/parse-that` was read at `main`/`ef10d5b`,
main checkout only — no `.worktrees/`, no frozen root, no `~/Documents/Codex`.
**STOP-check**: `ls /Users/mkbabb/Programming/parse-that-css-totality-p2` → `No such file or
directory` (re-verified 2026-08-04). The forbidden root does **not** exist and was not created.
**Latch hygiene**: no bench was run. `memoize()` / `mergeMemos()` were never called in any process I
started; `PACKRAT_ARMED` was never set; diagnostics were never armed. The single execution performed
(§0.3) is a pure module-identity read with no timing.

---

## 0. What was read, and the measurements taken

### 0.1 The module, whole

```
 1  // Barrel re-exports — all sub-modules
 2  export { Parser, type ParserFunction } from "./parser.js";
 3  export { ParserState, createParserContext, spanToString, mergeSpans } from "./state.js";
 4  export type { ParserContext, Span } from "./state.js";
 5  export { mergeErrorState, enableDiagnostics, disableDiagnostics, collectDiagnostic,
            getCollectedDiagnostics, clearCollectedDiagnostics, skipWhitespace,
            skipBlockComments } from "./utils.js";
 6  export type { Suggestion, SecondarySpan, Diagnostic } from "./utils.js";
 7  export { getLazyParser, createLazyCached, lazy } from "./lazy.js";
 8  export { memoize, mergeMemos, resetPackrat } from "./packrat.js";
 9  export { eof, any, dispatch, all, string, regex, trimStateWhitespace, whitespace } from "./leaf.js";
10  // The 15 closure-based `*Span` builders were EXCISED in the 1.0.0 cut (S.H2,
11  // fold row 48): a zero-consumer surface, deprecated in 0.13.0 (PT-Q4). Gate:
12  // proof:no-span-surface.
13  export { containsDelimiter, splitBalanced } from "./split.js";
14  export * from "./parsers/index.js";
```

Every imported module read whole: `parser.ts` (711 L) · `state.ts` (189) · `utils.ts` (186) ·
`lazy.ts` (43) · `packrat.ts` (488) · `leaf.ts` (399) · `split.ts` (58) · `parsers/index.ts` (8) ·
`parsers/json.ts` (52) · `parsers/csv.ts` (20) · `parsers/utils.ts` (23). Transitively reached and
read: `debug.ts` (383) and `ansi.ts` (17), pulled by `parser.ts:3` **and** `state.ts:2`. Also read:
the four sibling entries (`core.ts` · `diagnostics.ts` · `packrat-entry.ts` · `utils-entry.ts`),
`package.json`, `vite.config.ts`, `tsconfig.json`, the shipped `dist/` (both formats), and the five
gates binding this surface — `test/dist-surface.test.ts`, `test/manifest-gate.mjs`,
`test/subpath-gate.mjs`, `scripts/proof-no-css-surface.mjs`, `scripts/proof-no-dead-combinator.mjs`.

### 0.2 The consumer sweep — the load-bearing measurement

| tree | result | command |
|---|---|---|
| `value.js` deps + devDeps | **no `@mkbabb/parse-that`** | `node -e "…require('./package.json')"` |
| `value.js` repo, ex-`docs/`/`node_modules`/`.git` | **zero imports** — only prose in `CHANGELOG.md` + two "parse-that-FREE" comments (`src/subpaths/math.ts:2`, `src/subpaths/transform.ts:4`) | `grep -rn parse-that --exclude-dir={node_modules,docs,.git} .` |
| `value.js` resolution | **`MODULE_NOT_FOUND`** | `node -e "require.resolve('@mkbabb/parse-that')"` |
| `keyframes.js` | zero — one prose comment, `src/animation/internal/leaves.ts:9-10` ("the subpath is `parse-that`-FREE") | `grep -rn parse-that …/{package.json,src}` |
| `glass-ui` · `bbnf-lang` | zero in `package.json` and `src/` | same |
| `value.js/node_modules/@mkbabb/*` (transitive) | zero | `grep -n parse-that …/node_modules/@mkbabb/*/package.json` |

### 0.3 The dual-graph identity probe (executed; no arming, no timing)

```
$ node --input-type=module -e "…import('./dist/parse.js')  vs  createRequire()('./dist/parse.cjs')…"
esm.Parser === cjs.Parser : false
esm export count: 34
cjs export count: 34
parser id esm: 37  cjs: 37  -> independent counters: true
```

### 0.4 Corpus concordance, and one explicit contradiction

Folded, not re-invented: **O-15** (INBOX `docs/tranches/V/coordination/INBOX.md:77`; letter at
`parse-that/docs/valuejs-evidence-2026-07-27-1.1.0-ask-addendum.md`) — PT-01, PT-03, PT-04, PT-07,
each re-verified against the working-tree dist. **`registry/adjudicated/parser-band.md`** — the five
binding debts and the preserved DISSENTs. **`X/parse-that/waves/W1.md`** — the three instruments, the
52-export manifest and the sha-pinned tarball posture (cited, **not** exercised: this challenge
touched neither instrument). **`X/parse-that/waves/W2.md`** §3b/§3c/§3d — the ratified algebra.

### 0.5 The tree-shake probe (pass 3; static only — nothing executed, nothing armed)

The measurement class no prior pass ran. Rollup is used as a **static analyser** over the already-built
`dist`: it parses and eliminates, it never runs the library. Two postures, because the difference
between them *is* the finding (C-M11):

```
$ D=/Users/mkbabb/Programming/parse-that/typescript/dist
$ R=/Users/mkbabb/Programming/parse-that/typescript/node_modules/.bin/rollup
$ echo "import { X } from \"$D/<entry>.js\"; globalThis.__x = X;" \
    | $R --stdin=.js -f es --silent                                  # posture A: default
    | $R --stdin=.js -f es --silent --no-treeshake.moduleSideEffects # posture B: sideEffects:false honoured
```

Run from the scratchpad, never from the evidence root — no file was written inside
`/Users/mkbabb/Programming/parse-that`. **Latch hygiene holds**: rollup evaluates nothing, so
`PACKRAT_ARMED` is never assigned and `diagnosticsEnabled` is never set. The one row that reports a
*runtime* number (O-15 PT-03's 1.47×) is cited from the corpus, not re-measured.

**Contradiction, stated explicitly (C-i1)**: O-15 cites `dist/packrat-entry-*.js:881` for the
unconditional `console.error`. In the build present in the tree it is at **`:882`**. All four
`PACKRAT_ARMED` cites (`:678`/`:682`/`:714`/`:722`) and the `diagnostics-DDazRHgl.js:14` cite
reproduce **exactly**, and the chunk hash `diagnostics-DDazRHgl` matches the letter's — so this is
the same build and a one-line drift, not a different artifact.

---

## 1. BLOCKERS

### C-B1 — The routing law is severed: the barrel's sole declared downstream consumes **zero** of it, and neither CHANGELOG records the cut *(folded — re-verified)*

**BLOCKER** · `index.ts:1-14` (all 34 exports) · `value.js` commit `164343c1` ·
`parse-that/typescript/CHANGELOG.md:11-12` · `scripts/proof-no-dead-combinator.mjs:11-12,63-68`.

The routing law is `parser → value → packed release`, and parse-that states it in its own release
note: *"1.0.0 reaches keyframes.js ONLY via value.js's `^1.0.0`-carrying 2.0.x follow-on (kf is
parse-that-free)"* (`CHANGELOG.md:11-12`). value.js was the **entire** route.

value.js commit `164343c1` (*"feat(v4)!: value 4.0 producer surface…"*, 2026-07-17) deleted the
dependency block wholesale:

```
$ git show 164343c1 -- package.json | grep -n 'parse-that\|dependencies'
144:-    "dependencies": {
145:-        "@mkbabb/parse-that": "^1.0.0"
```

§0.2 shows the consequence is total, not partial: **no source file in value.js, keyframes.js,
glass-ui, or bbnf-lang imports a single one of the 34 exports**, and the package is not even
resolvable from value.js. This is a 34-symbol public API with an empty consumer set.

That is not merely "unused" — it violates parse-that's **own written precept**.
`scripts/proof-no-dead-combinator.mjs:11-12` states it in the imperative: *"A never-importable export
is not part of the public contract; an export born one prior tranche with zero workspace consumers is
dead by the precept."* That gate sweeps exactly the trees swept above (`:63-68`,
`resolve(root, "../../value.js/src")` and `.../keyframes.js/src`) and currently red-lists two
symbols (`thenMap`, `fuse`) by that standard — while **thirty-four** symbols meeting the identical
standard sit in the barrel unexamined, because the gate hardcodes a two-name ban list instead of
computing the zero-consumer set.

**Semver hygiene**: this happened with **no version event on either side**. parse-that remains
`1.0.0` (`package.json:3`) with an unchanged manifest, and value.js's `4.0.0` §Breaking
(`value.js/CHANGELOG.md:16-22`) enumerates seven removals — root export, `/parsing`, `/units`,
`ValueUnit`, legacy timing registries — and never mentions dropping the dependency (C-i2). The single
most consequential fact about this barrel's consumption is recorded nowhere in either release
history.

**Consequence for this challenge**: every keep/retire ruling below must be made on *specification*
(the ratified W2 laws and the band adjudications), because there is no usage evidence left to appeal
to. That is stated as a limit on the method, not smuggled past it.

*Falsifier*: exhibit one `import`/`require` of `@mkbabb/parse-that` in the non-`docs`, non-test
source of value.js, keyframes.js, glass-ui, or bbnf-lang. §0.2's six commands each return empty; one
non-empty result kills this row. The one file that *does* import it —
`value.js/docs/tranches/V/megatranche/prototypes/css-parser/parsethat-surface-gaps.mjs:11-13` — is an
audit probe under `docs/`, and it cannot execute (C-M5).

### C-B2 — Nine of thirty-four exports are process-global latches, published across two independent module graphs — proven — and this is the exact construction W2's O-8 forbids by name *(folded + extended: the dual-graph proof is new)*

**BLOCKER** · `index.ts:5` (6 symbols) + `index.ts:8` (3 symbols) · `package.json:8-12` ·
proven at §0.3.

Nine exports exist only to mutate module-level process state:

| export | line | the global it moves | source |
|---|---|---|---|
| `enableDiagnostics` / `disableDiagnostics` | `:5` | `diagnosticsEnabled` | `utils.ts:6-14` |
| `collectDiagnostic` / `getCollectedDiagnostics` / `clearCollectedDiagnostics` | `:5` | `collectedDiagnostics: Diagnostic[]` | `utils.ts:94,102,138,142` |
| `mergeErrorState` | `:5` | reads `diagnosticsEnabled` to decide whether `label` survives | `utils.ts:28-49` |
| `memoize` / `mergeMemos` | `:8` | **arms `PACKRAT_ARMED` — one-way** | `packrat.ts:156,290` |
| `resetPackrat` | `:8` | clears `MEMO`/`HEADS`/`GROWING`; **does not disarm** | `packrat.ts:262-273` |

**The latch, in source and in the shipped bytes.** Source: `packrat.ts:156` `let PACKRAT_ARMED =
false`, read at `:217` and `:266`, set `true` at `:290`, and **no assignment back to `false` anywhere
in the file**. Shipped: `dist/packrat-entry-CS1td-8B.js:678` (`false`), `:682`, `:714` (reads), `:722`
(`true`) — O-15 PT-03's cites reproduce exactly. Two further aggravations live in the naming and the
placement: (i) the reset function is *called* `resetPackrat` and is exported at `:8` next to the
arming functions, so the barrel reads as if the latch were reversible — `packrat.ts:262-273` clears
three Maps and returns; (ii) arming happens at **construction**, not invocation
(`packrat.ts:290`, inside `makeMemoized`), so merely *building* a memoized parser that is never run
imposes O-15 PT-03's measured **1.47×** (93.9 → 138.2 ns/parse; 139.3 after `resetPackrat()`) on
every unrelated parse in the process, forever.

**The duplication, proven.** `package.json:8-12` publishes `"."` with both
`"import": "./dist/parse.js"` and `"require": "./dist/parse.cjs"`, and the two are **separate module
graphs**. §0.3: `esm.Parser === cjs.Parser` is `false`, and each graph runs its own `PARSER_ID`
counter (`parser.ts:18`) — both hand back `37` for the same construction sequence. A process reaching
this package through both formats — routine in Node hybrid apps, and the default condition under
vitest's mixed transform pipeline — therefore holds **two** `diagnosticsEnabled` flags, **two**
`collectedDiagnostics` buffers, **two** `PACKRAT_ARMED` latches, and **two** `MEMO` tables.
`enableDiagnostics()` on one copy leaves the other silent; `getCollectedDiagnostics()` on one cannot
see what the other collected; arming packrat in one imposes 1.47× on that copy alone, undisarmable.

**Against the ratified algebra this is disqualifying by name.** W2 §3b **O-8 (the anti-latch
construction rule)**: *"No operator reads or writes process-global mutable state. Arming,
memoization, and diagnostics are **parameters of a parse**, never latches. PT-03 made law: a one-way
`PACKRAT_ARMED` costing 1.47× forever, whose reset does not disarm, is a state machine with one
absorbing state — and no algebra with a global absorbing state can satisfy EQ-1 across two lowerings
that arm at different times."* Nine of thirty-four exports are precisely those latches.

*Falsifier*: (a) show `esm.Parser === cjs.Parser` — §0.3's probe is three lines and reruns in
isolation; or (b) show a `PACKRAT_ARMED = false` assignment anywhere in `packrat.ts` or
`dist/packrat-entry-CS1td-8B.js` (`grep -n PACKRAT_ARMED` → `678, 682, 714, 722`: exactly one write,
and it is `true`); or (c) show the exports map routing both conditions to one graph (a `"module"`-only
entry, or shared state outside the bundle). None hold.

---

## 2. MAJOR

### C-M1 — `export *` at `:14` leaves 5 of 34 runtime exports undeclared — and the repo diagnosed this exact blindness in a sibling gate and left it uncured here *(folded — mechanism re-derived)*

**MAJOR** · `index.ts:14` · `test/dist-surface.test.ts:19-34,45-52` ·
`scripts/proof-no-css-surface.mjs:6-14`.

`test/dist-surface.test.ts` exists to bite a real historical defect — its own header (`:7-10`): *"The
shipped 0.8.2 dist exported only 8 of the 15 span fns (a silent source↔dist version-drift defect:
`import { altSpan }` from the pinned dist hit a runtime `undefined`, and the version number lied
about it)."* Its mechanism (`:21`) is a single regex:

```js
const re = /export\s*\{([^}]*)\}/g;
```

That matches **only** `export { … }` forms. `index.ts:14`'s `export * from "./parsers/index.js"`
contributes **no names to `srcNames` and none to `distNames`**, so the five symbols it routes —
`jsonParser`, `csvParser`, `escapedString`, `quotedString`, `numberParser`
(`parsers/index.ts:5-8`) — sit outside the gate's field of view in **both** directions. The exact
0.8.2 failure mode is undetectable for 14.7 % of the runtime surface.

What makes this MAJOR rather than MINOR is that **the repo already knows**.
`scripts/proof-no-css-surface.mjs:6-14` says so verbatim: *"the charter's first draft grepped
`dist/index.d.ts` for CSS symbol substrings. That is UNSOUND — the barrel re-exports the parsers tier
via `export * from './parsers/index.js'`, so the CSS symbols never appear inlined in `index.d.ts` …
A substring grep of `index.d.ts` would pass GREEN with the CSS parser still shipping."* That gate was
rewritten to read the **runtime** export keys (`:37-42`, `CSS_SYMBOLS.filter((s) => s in mod)`). The
publish-discipline gate — whose entire purpose is drift detection — was not. Of the ten `proof:*`
scripts in `package.json:45-55`, **not one** locks the star line's contents.

*Falsifier*: show `namedExports()` returning any of the five parsers symbols from `index.ts`. It
cannot — the function is 16 lines with one regex, and `export *` contains no `{`.

### C-M2 — `getCollectedDiagnostics()` is published; its only renderers ship in **no** bundle *(folded — re-measured)*

**MAJOR** · `index.ts:5` (`getCollectedDiagnostics`) + `index.ts:6` (`type Diagnostic`) ·
`debug.ts:200,235`.

The barrel hands a consumer `readonly Diagnostic[]` (`utils.ts:138`; shape at `utils.ts:84-93` —
`offset`, `furthestOffset`, `line`, `column`, `expected[]`, `suggestions[]`, `secondarySpans[]`,
`found`) and ships **zero** way to render it. `debug.ts:200` `formatDiagnostic(d, src)` and
`debug.ts:235` `formatAllDiagnostics(diagnostics, src)` are the only two functions in the tree that
consume a `Diagnostic`, and they appear in **no entry and no chunk**:

```
$ grep -l formatDiagnostic     dist/*.js   → (empty)
$ grep -l formatAllDiagnostics dist/*.js   → (empty)
```

They are not merely un-exported — `sideEffects: false` (`package.json:6`) plus no reachability from
any of the five entries means Rollup drops them from the published artifact entirely. The consumer's
only recourse is to re-implement line/column rendering over a struct whose `line`/`column` are
already computed at `utils.ts:112-115`. The half-export is the defect: the *type* ships
(`index.ts:6`), the *collector* ships (`index.ts:5`), the *renderer* does not exist in the package.

*Falsifier*: name any published entry — `.`, `/core`, `/diagnostics`, `/packrat`, `/utils` — from
which `formatDiagnostic` resolves. `grep -n 'formatDiagnostic\|statePrint\|parserPrint' dist/parse.js
dist/core.js dist/diagnostics.js dist/utils.js dist/packrat.js` returns nothing.

### C-M3 — `isDiagnosticsEnabled` is withheld, arming is welded to `console.error`, and `mergeErrorState`'s `label` is silently discarded on the shipping default *(folded — three prior rows consolidated, all re-verified)*

**MAJOR** · `index.ts:5` (six diagnostics exports; `isDiagnosticsEnabled` absent) · `utils.ts:16-18,33`
· `parser.ts:67-69` · O-15 PT-01.

Three couplings, one door.

**(a) The reader is withheld.** `utils.ts:16` exports `isDiagnosticsEnabled()`. `index.ts:5` does not
re-export it, and neither does `diagnostics.ts:6-14`:

```
$ grep -l isDiagnosticsEnabled dist/parse.js dist/core.js dist/diagnostics.js dist/utils.js \
      dist/packrat.js dist/index.d.ts dist/diagnostics.d.ts   → (empty)
```

A library publishing `enableDiagnostics()`/`disableDiagnostics()` as process-globals (C-B2) while
withholding the reader forces every consumer into a destructive protocol: arm, parse, then **guess** —
`disableDiagnostics()` if you assume it was off, clobbering the caller's state if it was on. There is
no save-and-restore. `parsethat-surface-gaps.mjs:29` scores exactly this:
`row(enableDiagnostics.length !== 1, "DEBT-1 enableDiagnostics() is process-global (arity)", …)`.

**(b) The label is a no-op unarmed.** `utils.ts:33`:
`state.expected = diagnosticsEnabled && label ? [label] : undefined`. So `mergeErrorState(state,
"<named-color>")` — exported at `index.ts:5`, and the **only** labelling path the package offers
(there is no `.label()` combinator: `parsethat-surface-gaps.mjs:26` measures `!("label" in
Parser.prototype)`) — silently drops its second argument on the shipping default. Shipped:
`dist/diagnostics-DDazRHgl.js:14`, O-15 PT-01's cite, byte-exact.

**(c) Arming turns on stderr.** `parser.ts:67-69`, inside `parseStateInner`, on the failure path of
**every** parse: `if (isDiagnosticsEnabled()) console.error(this.state.toString())`. Shipped at
`dist/packrat-entry-CS1td-8B.js:882` (O-15 cites `:881`; see C-i1).

So a consumer wanting the labelled failures the parser-band's **DEBT-1** requires
(`parser-band.md` §"WHAT CAND-O OWES CAND-F" ¶1: *"Replace `never` … with a labelled zero-width
failure in cand-F's style; `expected: ["<named-color>"]` beats `(?!)`"*) must arm a process-global
that also prints to stderr on every rejection, and cannot determine or restore its prior value.
W2 §3b **R-LAW-3 (diagnostic purity)** makes this an outright kill: *"The probe monkey-patches
`console.error`/`console.warn` to **throw** over the full corpus — a lowering that prints cannot
pass."* And **EQ-4** rules that *"a candidate whose labels exist only under an armed-diagnostics mode
reads as diagnostics-ABSENT and fails (PT-01)."* Both arms of the coupling are individually fatal
under the ratified laws.

*Falsifier*: exhibit a published path to `isDiagnosticsEnabled`; or a posture that yields
`state.expected` without setting the global (`utils.ts:33`, `:41` gate on it unconditionally); or a
failure path that does not print when armed (`parser.ts:67` gates on the same flag). None exists.

### C-M4 — `createParserContext` is published with a **closed** 29-literal name union that is itself unpublished

**MAJOR** · `index.ts:3` (`createParserContext`) + `index.ts:4` (`type ParserContext`) ·
`state.ts:141-181`.

`createParserContext`'s first parameter is typed `(typeof parserNames)[number]`
(`state.ts:179-181`), and `ParserContext.name` is the same union (`state.ts:173-177`). `parserNames`
(`state.ts:141-171`) is a `readonly` tuple of exactly **29** literals — `"string"`, `"regex"`,
`"then"`, … `"lookAhead"`. It is **not** exported from `index.ts`, not from `core.ts`, and not from
any dist entry (`grep -n parserNames dist/index.d.ts dist/core.d.ts` → empty).

Two consequences, both binding on the band's actual work:

1. **A consumer cannot name a custom parser.** The band's cand-F idiom is
   `new Parser((s) => { mergeErrorState(s, label); s.isError = true; return s; })` — reproduced
   verbatim at `parsethat-surface-gaps.mjs:20`. Giving it a context requires
   `createParserContext("named-color-reject", undefined)`, which is a compile error: the string is
   not in the 29-member union. The published surface admits only parse-that's own internal combinator
   names. A downstream grammar of the size the band adjudicated (cand-O's four files, 1,209 lines)
   can name **zero** of its own productions.
2. **A consumer cannot type a variable holding the field.** `ParserContext` is exported
   (`index.ts:4`) with a `name?` of an unnameable type, so `let n: ??? = ctx.name` requires
   re-declaring all 29 literals by hand or falling back to `string` and casting.

This starves W2's **EQ-4** at the source: the labels that must populate `expected[]` for ordered
structural diagnostics equality are exactly the names the closed union refuses.

*Falsifier*: show `parserNames` — or an open `name` type — reachable from any published entry; or
show `createParserContext("anything-custom", undefined)` typechecking against `state.ts:179`.

### C-M5 — Every RED row of the band's surface-gaps probe is reached through an `index.ts` export, and the probe cannot execute at all

**MAJOR** · `index.ts:2,3,5,8,9` · `parsethat-surface-gaps.mjs:11-13,20-53` ·
`parser-band.md` §"WHAT CAND-O OWES CAND-F".

The probe imports **ten** symbols, every one an `index.ts` line: `Parser`, `string`, `regex`, `any`,
`all`, `memoize`, `resetPackrat`, `enableDiagnostics`, `disableDiagnostics` from the root barrel
(`:11-12`), and `mergeErrorState` from `/diagnostics` (`:13`) — which `index.ts:5` also publishes.
There is no gap the probe measures that this module does not own.

Reading the nine `row()` calls against the source, the **unarmed** run yields exactly **seven RED**
(the row at `:47` is `row(!ARM ? false : false, …)` — a tautologically-green record row; the
`resetPackrat` row at `:46` fires only under `--arm`):

| # | probe line | RED because | owning `index.ts` export | debt |
|---|---|---|---|---|
| 1 | `:23-25` | `armF.parseState("rebeccapurple").expected` is `undefined` — the label is a no-op unarmed (C-M3b) | `mergeErrorState` (`:5`) | DEBT-1 |
| 2 | `:26` | `!("label" in Parser.prototype)` — no labelling combinator | `Parser` (`:2`) | DEBT-1 |
| 3 | `:27` | `enableDiagnostics.length === 0` — arming takes no scope | `enableDiagnostics` (`:5`) | DEBT-1 |
| 4 | `:37` | ceiling is a **thrown `RangeError`**, not `ok:false` (O-15 PT-04: depth 7,762) | `Parser.lazy` on `Parser` (`:2`) | DEBT-3 |
| 5 | `:38` | `Parser.lazy.length === 1` — no depth-bound parameter | `Parser` (`:2`) | DEBT-3 |
| 6 | `:52` | `parseState(non-string)` throws raw `TypeError` 5/5 (O-15 PT-07) | `Parser`/`string` (`:2`,`:9`) | GUARD |
| 7 | `:53` | `.parse()` returns `undefined` on failure — indistinguishable from success (O-15 PT-07) | `Parser` (`:2`) | GUARD |

**RED-7 is 7-of-7 non-tautological rows, and 7-of-7 land on this barrel.** Not one gap belongs to a
module the barrel merely neighbours.

And the probe **cannot run**. Its header (`:4-5`) says *"Run from this workspace (it resolves the
workspace's node_modules)"*; §0.2 gives `require.resolve('@mkbabb/parse-that')` → `MODULE_NOT_FOUND`
from `/Users/mkbabb/Programming/value.js`. The instrument that measures this module's consumption
fitness is itself unrunnable **because of C-B1** — the dependency edge it resolves through was
deleted at `164343c1`. The seven rows above are therefore derived by reading the probe against source
and shipped dist, not by executing it; each row's cite is independently checkable without it.

*Falsifier*: (a) run the probe from `value.js` — it dies on an unresolved specifier before the first
`row()`; or (b) show any of the seven evaluating green against `parser.ts` / `utils.ts` /
`packrat.ts` at the cited lines.

### C-M6 — The root barrel is a fan-in of all four tier chunks, and `/core` ships the tier it disclaims *(folded — re-measured)*

**MAJOR** · `index.ts:1-14` · `dist/parse.js:1-4` · `dist/core.js:1` · `core.ts:3-6`.

`core.ts:3-6` states the tiering promise: *"The zero-side-effect primitive set… A consumer that
imports only this **never pulls the diagnostics accumulator, the packrat tier**, or the json/csv
domain parsers."* The shipped bytes falsify it:

```
$ head -1 dist/core.js
import { P, a, b, c, d, e, f, g, h, l, j, r, s, n, t, w } from "./packrat-entry-CS1td-8B.js";
$ ls -la dist/packrat-entry-CS1td-8B.js  →  40576 bytes
```

`/core` imports the same 40,576-byte chunk the root does. The cause originates here: `index.ts:2`
publishes `Parser`, and `Parser.parseState` calls `packratEnter()` / `packratExit()` unconditionally
on every parse (`parser.ts:43-49`, importing `./packrat.js` at `parser.ts:7`). Packrat is on the
default path, so it cannot be split off `Parser`, so it cannot be split off `/core`.
`dist/packrat.js` (158 B) and `dist/diagnostics.js` (282 B) are thin re-export shims over the same
two chunks; only `/diagnostics` achieves real separation — it alone avoids the 40 KB chunk.

The root's shape confirms the fan-in: `dist/parse.js:1-4` imports from **all four** —
`packrat-entry-*.js`, `diagnostics-*.js`, `core.js`, `utils.js`. So `import { Parser } from
"@mkbabb/parse-that"` is strictly the most expensive door in the package, pulling the packrat
machinery, the diagnostics accumulator, the ANSI/debug printer (C-M7), and the json/csv showcases,
for a consumer who wanted one class. The A.W3 subpath split buys the root consumer nothing.

*Falsifier*: show `dist/core.js` resolving without `packrat-entry-CS1td-8B.js`, or that chunk lacking
the packrat tier (`grep -n PACKRAT_ARMED dist/packrat-entry-CS1td-8B.js` → `678,682,714,722`).

### C-M7 — `ParserState` welds an ANSI terminal renderer into every consumer bundle, browsers included, and `sideEffects:false` cannot shake it *(folded — dependency chain re-traced)*

**MAJOR** · `index.ts:3` (`ParserState`) · `state.ts:2,136-137` · `debug.ts:1-2` · `ansi.ts:1-17`.

`state.ts:2` imports `statePrint` from `./debug.js`, and `ParserState.toString()` (`state.ts:136-137`)
calls it. `debug.ts` imports `ansi.ts`, whose ten exports (`ansi.ts:8-17`) are raw escape-sequence
emitters — `\x1b[1m`, `\x1b[31m`, `\x1b[41m`, … The chain is `index.ts:3 → state.ts:2 → debug.ts →
ansi.ts`, and it runs through a **method on the exported class**, not a separable function, so tree
shaking cannot cut it: `grep -l statePrint dist/*.js` → `dist/packrat-entry-CS1td-8B.js`, i.e. it is
in the 40 KB chunk every entry but `/diagnostics` loads (C-M6). `parser.ts:3` adds a second edge via
`Parser.toString()` (`parser.ts:698`) and `Parser.debug()` (`parser.ts:690`).

The result inverts C-M2 exactly: the two functions a consumer would actually want
(`formatDiagnostic`, `formatAllDiagnostics`) are **absent** from the shipped bytes, while terminal
colour codes no browser consumer can use are **mandatory** payload.

*Falsifier*: show `ParserState.toString()` not reaching `ansi.ts` (`state.ts:2` → `debug.ts:1` →
`ansi.ts`, three hops, all static imports), or `statePrint` absent from the shipped chunk.

### C-M8 — The `*Span` excision is incomplete: `:3-4` still publish a type and two helpers that nothing in the library produces *(folded — producer search re-run)*

**MAJOR** · `index.ts:3` (`spanToString`, `mergeSpans`) + `index.ts:4` (`type Span`) ·
`state.ts:8-22` · `leaf.ts:3` · `parser.ts:2`.

The 1.0.0 cut removed the 15 `*Span` **builders** and kept the `Span` value type plus its two helpers,
on the stated grounds that they *"operate on the surviving `Span` value, not the deleted builders"*
(`CHANGELOG.md`, S.H2 section). But after the excision **nothing in the library produces a `Span`**.
A whole-tree search for producers:

```
$ grep -rn "Span" src/parse/*.ts src/parse/parsers/*.ts | grep -v 'SecondarySpan|secondarySpans|spanToString|mergeSpans|\*Span|//'
src/parse/core.ts:14    export type { ParserContext, Span } from "./state.js";
src/parse/index.ts:4    export type { ParserContext, Span } from "./state.js";
src/parse/state.ts:8    export interface Span { start: number; end: number; }
src/parse/leaf.ts:3     import type { ParserState, ParserContext, Span } from "./state.js";
src/parse/parser.ts:2   import type { ParserContext, Span } from "./state.js";
```

Five hits: two re-exports, one declaration, and **two unused type imports**. `Span` appears nowhere in
a signature, a return type, or a field of `leaf.ts` or `parser.ts` — it is imported and never
referenced. No combinator returns `Span`; no `ParserState` field holds one. So `spanToString(span,
src)` (`state.ts:13`) and `mergeSpans(a, b)` (`state.ts:17`) are two exported functions over a
structurally-typed pair the consumer must construct entirely by hand — `{ start, end }` — for which
this package offers no source.

The gate that calls itself terminal on this surface passes anyway: `proof:no-span-surface` and
`test/dist-surface.test.ts:55-79` both check a **hardcoded list of the 15 builder names** and
explicitly whitelist the three survivors, so an orphaned value type is invisible to them.

*Falsifier*: exhibit one function in `src/parse/**` whose signature mentions `Span` as a parameter or
return, other than `spanToString`/`mergeSpans` themselves. The grep above is exhaustive over the
source tree.

### C-M9 — `:7` exports a symbol named `lazy` that is **not** the `lazy` any consumer means — and it cannot compile under the package's own decorator era *(folded — tsconfig check is new)*

**MAJOR** · `index.ts:7` (`lazy`) · `lazy.ts:30-42` · `tsconfig.json:2-13` · `parser.ts:702`.

In a parser-combinator library, `lazy` names one thing: the deferred back-edge that lets a grammar
recurse. That function exists here — it is `Parser.lazy` (`parser.ts:702`), the static the band's
**DEBT-3** and O-15 **PT-04** both measure. The barrel does **not** export it under that name; what
`index.ts:7` exports as `lazy` is a **method decorator** (`lazy.ts:30-42`):

```ts
export function lazy<T>(target: unknown, _propertyName: string,
                        descriptor: TypedPropertyDescriptor<() => any>) { … }
```

That is the TypeScript 4.x `experimentalDecorators` signature. `tsconfig.json` sets `target: ES2022`
and **does not set `experimentalDecorators`**, so under the package's own compiler
(`package.json` devDeps `"typescript": "^5.8.0"`) TS resolves `@lazy` as a **stage-3 standard
decorator**, whose contract is `(value, context)` and which cannot mutate a descriptor. Applying the
published `lazy` under a modern default config is a type error. It is also never exercised anywhere:
`grep -rn '@lazy' src test` → empty.

So the most-expected name on the surface is bound to a dead, era-mismatched decorator, while the
function consumers need reaches them only as a static on `Parser` — undiscoverable by import, and
carrying the unbounded 7,761-deep `RangeError` ceiling the band's DEBT-3 exists to fix.

*Falsifier*: show `experimentalDecorators` in `tsconfig.json` (`grep` → absent), or one `@lazy`
application in any tree, or `lazy` exported from `index.ts:7` with the `Parser.lazy` semantics.

### C-M10 — The fan-in has a price, and it is ~400×: a three-line pure string function costs 36,359 bytes through the barrel

**MAJOR** · `index.ts:13` (`containsDelimiter`, `splitBalanced`) · `split.ts:10-12,18-58` ·
measured per §0.5. *Extends C-M6 from structure to bytes.*

C-M6 proves the root is a fan-in of all four chunks. This row measures what that costs a consumer.
`split.ts:10-12` `containsDelimiter` is `return text.indexOf(delim) !== -1` — three lines, **zero
imports**, ~90 bytes of body. `split.ts:18-58` `splitBalanced` is 40 lines, likewise zero imports.
Neither touches `Parser`, `ParserState`, diagnostics, or packrat. Tree-shaken floor, one import
statement, both postures:

| import | from | posture A (default) | posture B (`sideEffects:false` honoured) |
|---|---|---:|---:|
| `containsDelimiter` | `.` (barrel) | **36,359 B** | **118 B** |
| `splitBalanced` | `.` (barrel) | 37,142 B | 901 B |
| `splitBalanced` | `./core` | 32,782 B | 901 B |
| `string` | `.` (barrel) | 36,266 B | 32,734 B |
| `jsonParser` | `.` (barrel) | 36,289 B | 36,289 B |
| `memoize` | `./packrat` | 36,900 B | — |
| `mergeErrorState` | `./diagnostics` | **304 B** | — |

Three things the table says that the chunk graph alone does not:

1. **~400× for the leaf-pure exports.** 36,359 bytes delivered for ~90 bytes wanted. The entire delta
   is the 40 KB chunk that posture A cannot drop, for the reason C-M11 gives.
2. **The barrel is measurably *worse* than the tier it fans in.** `splitBalanced` costs **4,360 bytes
   more** from `.` than from `./core` (37,142 vs 32,782), because `dist/parse.js:1-4` additionally
   pulls the diagnostics chunk and `utils.js`. C-M6 called the root "the most expensive door"; this
   is the number on that door.
3. **`/diagnostics` at 304 B is the only entry that behaves like a tier**, and only because it sits at
   the *base* of the graph (`dist/diagnostics-DDazRHgl.js` imports nothing — verified: `head -3` shows
   `let diagnosticsEnabled = false;` as line 1). Every entry above it inherits the full 40 KB. The
   A.W3 five-way split therefore delivers exactly **two** distinct payloads, not five.

The consumer class this bites is named in the tree: value.js ships to browsers (`gh-pages` build
mode, `demo/color-picker/`) and W2 §3d's shared slice is *a colour parser in a colour picker*.

*Falsifier*: (a) reproduce the two commands in §0.5 and get a materially different floor — they are
deterministic over a fixed `dist`; or (b) show `containsDelimiter` reaching a consumer without the
40 KB chunk under posture A — `dist/core.js:1` and `dist/parse.js:1` both import it unconditionally.
*Scope, stated so the severity is not inflated*: these are **absolute pre-gzip bytes for a
dev-tooling package**, measured with an exact command, not a claim about user-visible latency.
SURVIVED as scoped.

### C-M11 — `sideEffects: false` is false of the shipped bytes, and the gate that mandates it cannot fail for its intended reason

**MAJOR** · `package.json:6` · `test/manifest-gate.mjs:5,37-40` ·
`dist/packrat-entry-CS1td-8B.js:28,1416` · `parser.ts:711` · `ansi.ts:3-6`.

`package.json:6` declares `"sideEffects": false`, and `test/manifest-gate.mjs:37-40` **hard-requires**
it:

```js
if (pkg.sideEffects !== false) { console.error(`FAIL: package.json sideEffects must be false…`); failed = true; }
```

The gate's own header states the motive, and it is exactly C-M10: *"`sideEffects` was absent (a
tree-shaking consumer **over-includes the barrel**)"* (`manifest-gate.mjs:5`). The diagnosis was
right. The cure was to assert a property of the artifact **in the manifest** and then never check the
artifact. The shipped chunk carries **two** module-level side effects:

```
dist/packrat-entry-CS1td-8B.js:28    const enabled = typeof process !== "undefined"
                                       && process.stderr?.isTTY === true && !process.env.NO_COLOR;
dist/packrat-entry-CS1td-8B.js:1416  _initWhitespace();
```

The first is `ansi.ts:3-6`, reached only through `debug.ts:5` — i.e. it rides the same
`index.ts:3 → state.ts:2 → debug.ts → ansi.ts` chain C-M7 traced, and it performs a **top-level
`process` read**. The second is `parser.ts:711`, a bare top-level call, the workaround for the
`parser`↔`leaf` cycle documented at `leaf.ts:393-394`.

**L-19: a gate must be able to fail for its intended reason.** `manifest-gate.mjs` reads three
manifest string properties and never opens `dist/`. It cannot fail for over-inclusion; it can only
fail for the absence of a claim about over-inclusion. The claim is untrue of the bytes it describes.

*Falsifier — and it partly fires*: "the declaration is inaccurate but harmless, so this is cosmetic."
I probed it. Under posture B, rollup **retains** `_initWhitespace()` whenever `whitespace` is
imported — it tracks the live binding through the assignment — and `ansi.ts`'s `enabled` const is
read only by the ANSI emitters. **No breakage is reproducible under rollup**, and I record that: the
*harm* half of the claim is **KILLED** for that bundler. What survives, and is why this stays MAJOR:
(i) the whole tree-shakeability story of C-M10 rides on downstream bundlers trusting a flag that is
false of the artifact — a bundler-implementation-dependent accident, not a guarantee; (ii) the
posture-A column of C-M10's table is what a consumer gets when the flag is *not* honoured, and it is
400×; (iii) `process.env` is a documented rewrite target for Vite's `define` in browser builds — the
exact consumer class C-M7 identifies as receiving mandatory ANSI payload. This is the same defect
C-M7 names, seen from the manifest side: **the package tells bundlers it is pure, ships two impurities
in the chunk every entry but `/diagnostics` loads, and gates the telling rather than the truth.**

### C-M12 — `Parser.recover()` writes the process-global journal unconditionally and retains on success: unbounded growth across parses

**MAJOR** · `index.ts:5` (`collectDiagnostic`, `clearCollectedDiagnostics`) · `parser.ts:665,672-680`
· `utils.ts:95,115,123`. *Extends C-B2: names the writer no prior pass identified.*

C-B2 establishes `collectedDiagnostics` as one of the nine process-globals. This row identifies its
**unconditional writer on a public code path**, which changes the severity of the global from
"consumer-triggered" to "library-triggered":

- `utils.ts:95` — `let collectedDiagnostics: Diagnostic[] = [];`, module scope.
- `parser.ts:665` — inside the public method `Parser.recover(sync, sentinel)`:
  `collectDiagnostic(state as ParserState<unknown>, checkpoint);` — **not gated on
  `diagnosticsEnabled`**. Every other diagnostics behaviour in the package is gated (`utils.ts:33`,
  `:41`, `parser.ts:67`); this one is not.
- `utils.ts:115` pushes a `Diagnostic` holding a 20-char `found` slice plus three copied arrays
  (`utils.ts:112-121`).
- `parser.ts:672-678` pops **only when `sync` also fails**. On the success path (`parser.ts:680`
  `return state.ok(sentinel)`) the entry is **retained**.

So N successful recoveries over a process lifetime retain N `Diagnostic` objects, forever, whether or
not the consumer ever asked for diagnostics. The only drain is `clearCollectedDiagnostics()`
(`utils.ts:142-144`), published at `index.ts:5`, with nothing in the types, the JSDoc, or the exports
map pairing it to `recover()`.

Against the ratified algebra this fails two laws, not one. **O-8** (already cited by C-B2). And
**R-LAW-4 non-amplification** — *"`N` malformed sites yield exactly `N` diagnostics"* — which holds
*within* one parse and fails **across** parses: parse #2's journal contains parse #1's diagnostics.
That is also the shape W2 §3c's **K-6** kill rule tests for by name (*"kills any candidate whose
parse #100,001 is distinguishable from parse #1"*) — here the incumbent is distinguishable at parse
#2.

*Falsifier*: "a per-parse reset clears it." It does not. `resetErrorState` (`utils.ts:131-136`) is
called at the tail of `collectDiagnostic` (`utils.ts:123`) and resets the **state's** tracking —
`furthest`, `expected`, `suggestions`, `secondarySpans` — precisely so the next error starts fresh
*while the array keeps growing*. `utils.ts:20-26` advertises reentrancy on the state model; the
module-global array is the one thing that escapes it. SURVIVED.

### C-M13 — `getCollectedDiagnostics()` hands back a live alias; `clearCollectedDiagnostics()` swaps the backing store

**MAJOR** · `index.ts:5` (both) · `utils.ts:138-139,142-144`.

```ts
export function getCollectedDiagnostics(): readonly Diagnostic[] { return collectedDiagnostics; }   // :138-139
export function clearCollectedDiagnostics(): void { collectedDiagnostics = []; }                     // :142-144
```

The getter returns **the array object itself**. `readonly Diagnostic[]` is a compile-time guard only —
it produces no runtime immutability and no copy. The clearer **reassigns** the binding rather than
truncating in place. The two are published on the same line of `index.ts`, and their aliasing
semantics are incoherent:

- **Before any clear**, a captured `const ds = getCollectedDiagnostics()` is a *live view* that mutates
  under the consumer: `ds.length` sampled twice can differ with no consumer action, because
  `Parser.recover` is writing to it (C-M12).
- **After a clear**, that same `ds` is silently **detached**: subsequent `collectDiagnostic` writes
  land in the new array, `ds` is a frozen snapshot that will never update again, and every read of it
  succeeds. No error at any layer, no type-level signal, nothing observable except wrong answers.

This is the diagnostics-as-values surface W2 §3b requires (`D` as *"an append-only ordered list"*)
implemented as a swappable process-global with a leaking handle — and **EQ-4** compares `D` by
ordered structural equality, which is undefined against a store whose identity changes under the
comparator.

*Falsifier*: "truncating in place (`collectedDiagnostics.length = 0`) would fix it, so this is a
one-line issue, not a defect." Correct about the fix; the defect is that the **published pair**, as
shipped, has semantics no consumer can use safely without knowing the implementation. SURVIVED.

### C-M14 — The accumulator is published; its inverse is unreachable — including the one the library's own `recover()` depends on

**MAJOR** · `index.ts:5` (`collectDiagnostic` published) · `utils.ts:131-136,146-148` (both withheld)
· `parser.ts:674`. *Companion to C-M3(a): a second and a third withheld reader/writer.*

C-M3(a) shows `isDiagnosticsEnabled` is withheld. Two more from the same file are withheld, and one
of them is load-bearing inside the package:

| symbol | source | published from | used internally at |
|---|---|---|---|
| `popLastDiagnostic` | `utils.ts:146-148` | **nowhere** (`index.ts` ✗, `diagnostics.ts` ✗) | `parser.ts:674`, inside `Parser.recover` |
| `resetErrorState` | `utils.ts:131-136` | **nowhere** | `utils.ts:123`, inside `collectDiagnostic` |

So the barrel hands out the **accumulate** verb (`collectDiagnostic`, `index.ts:5`) and withholds the
**un-accumulate** verb — while the library's own recovery implementation cannot work without it
(`parser.ts:672-676`: when `sync` fails, `popLastDiagnostic()` removes the entry so the error
propagates normally). A consumer writing its own recovery combinator — exactly the W2 §3b
**R-LAW-1** (rollback exactness) and **R-LAW-4** (non-amplification) shape, and exactly what AC-1's
predicted *"continuation inexpressibility"* and AC-2's predicted *"escape-hatch node"* require
someone to attempt — **cannot reproduce `recover()`'s semantics from the published surface**. The
one operation W2 §3d puts in the shared slice (*"ONE malformed qualified rule … exercising commit +
labelled failure + rollback"*) is the one the barrel makes unimplementable downstream.

*Falsifier*: "`clearCollectedDiagnostics` suffices as the inverse." It does not — it drops the
**entire** journal including diagnostics from unrelated earlier recoveries in the same process (and,
per C-M12, that journal is cumulative across parses). Pop-one and clear-all are not substitutes.
Second falsifier: exhibit any published entry resolving `popLastDiagnostic` — `index.ts:5` lists six
`utils` symbols and `diagnostics.ts:6-13` lists six; `popLastDiagnostic` is in neither. SURVIVED.

### C-M15 — `Suggestion` and `SecondarySpan` are published as types whose every producer is unreachable

**MAJOR** · `index.ts:6` (the types) · `utils.ts:51-55,57-64,66-82` (the producers, all withheld).
*Distinct from C-m3, which is about provenance splitting; this is about the type/value asymmetry.*

`index.ts:6` publishes `Suggestion` and `SecondarySpan`. Their producers are:

| producer | source | published from |
|---|---|---|
| `addSuggestion` | `utils.ts:51-55` | nowhere |
| `addSecondarySpan` | `utils.ts:57-64` | nowhere |
| `reportUnclosedDelimiter` | `utils.ts:66-82` (calls `addSecondarySpan` at `:79`) | nowhere |

A consumer can *name* the type, and can read one off a `Diagnostic` (`utils.ts:84-93`), and has **no
published operation that emits one into a parse**. This is the same half-export shape as C-M2 with
the halves reversed: there, the type and the collector ship and the renderer does not; here, the type
ships and the constructors do not.

*Falsifier*: "they are plain interfaces (`state.ts:25-34`), so a consumer can build one with an
object literal." True — **REFINED, not killed**. The sharper surviving claim: a consumer can
construct the value and has **no sink** for it. The only sinks are `state.suggestions` and
`state.secondarySpans`, mutated exclusively by the two withheld adders. `index.ts:6` therefore
publishes two types that are, on the public surface, **read-only by construction** — and
`reportUnclosedDelimiter` is the package's one piece of higher-level error-shaping (it composes a
`SecondarySpan` labelled `` `unclosed \`${openText}\` opened here` ``), stranded with them.
SURVIVED as refined.

---

## 3. MINOR

### C-m1 — `getLazyParser` and `createLazyCached` are internals of an unpublished tier

**MINOR** · `index.ts:7` · `lazy.ts:7,18` · `debug.ts:2,318` · `parser.ts:5,703`.

`getLazyParser`'s only caller in the tree is `debug.ts:318`, inside `parserPrint` — a function
reaching **no** published entry (C-M2/C-M7). `createLazyCached`'s only caller is `parser.ts:703`,
inside `Parser.lazy`. Both are published at `index.ts:7` as first-class API with no consumer story:
one serves an unreachable printer, the other is the body of a static the barrel already ships via
`Parser`. Three lazy-named exports; none is the one that matters (C-M9).

*Falsifier*: `grep -rn 'getLazyParser\|createLazyCached' src test` → five hits, all definitions or the
two internal call sites named. No third pattern of use exists.

### C-m2 — `skipWhitespace`/`skipBlockComments` were retained explicitly for the consumer that no longer exists, and `skipBlockComments` is CSS logic that cleared the excision gate by name-list evasion

**MINOR** · `index.ts:5` · `utils.ts:150-186` · `scripts/proof-no-css-surface.mjs:22-27` ·
`test/dist-surface.test.ts:83-98`.

`utils.ts:150-157` states the retention rationale in the file: *"These are the primitives a
hand-rolled grammar (**value.js's canonical CSS grammar**) drives its hot paths with… Kept after the
CSS grammar itself left for value.js (D2/D3)."* Per §0.2 that grammar no longer imports parse-that;
the named beneficiary is gone.

Separately, `skipBlockComments` (`utils.ts:168-186`) **is** CSS logic — it scans `/*`…`*/` via
`indexOf` and stops at an unterminated comment. The A.W1 invariant is *"the CSS surface is GONE —
permanently and completely"* (`proof-no-css-surface.mjs:4`) and *"the source barrel names zero CSS
symbols"* (`dist-surface.test.ts:83-98`), but both gates match a **hardcoded symbol-name list**
(`proof-no-css-surface.mjs:22-27`: `cssParser`, `CssNode`, `MediaQuery`, …). A function whose
*behaviour* is CSS-specific but whose *name* is not passes both unexamined. This is a scope
observation, not a correctness claim — the function is correct; it is on the wrong side of a boundary
the project declared closed.

*Falsifier*: show a non-CSS grammar in the constellation driving `skipBlockComments` (§0.2: none), or
either gate matching behaviour rather than names (both are name lists).

### C-m3 — `Suggestion`/`SecondarySpan` are routed through a second module, splitting one file's types across two barrel lines

**MINOR** · `index.ts:4` vs `index.ts:6` · `state.ts:8,25,31` · `utils.ts:1,3`.

`Span` (`state.ts:8`), `Suggestion` (`state.ts:25`) and `SecondarySpan` (`state.ts:31`) are all
declared in `state.ts`. `index.ts:4` exports `ParserContext` and `Span` from `./state.js`;
`index.ts:6` exports `Suggestion` and `SecondarySpan` from `./utils.js`, which merely re-exports them
(`utils.ts:3`). Two lines, two provenance paths, one source file — and a consumer following
`dist/index.d.ts`'s declaration map lands in the wrong module for two of the three.

*Falsifier*: show `Suggestion` or `SecondarySpan` declared anywhere but `state.ts:25,31`. `utils.ts:1`
imports them as types and `:3` re-exports; there is no second declaration.

### C-m4 — `./package.json` is not exported, so the X·P substrate receipt cannot read this package's version through its own surface *(folded — re-verified)*

**MINOR** · `package.json:7-40`.

The `exports` map declares exactly five keys — `.`, `./core`, `./diagnostics`, `./packrat`,
`./utils` — and **no `"./package.json"` entry** (`'./package.json' in p.exports` → `false`). Modern
Node treats an `exports` map as exhaustive, so `require('@mkbabb/parse-that/package.json')` and the
equivalent import both fail with `ERR_PACKAGE_PATH_NOT_EXPORTED`. Any consumer or receipt-generator
wanting the resolved version — and W1's substrate posture is built on pinned, hashed identities —
must reach around the package into `node_modules` by path, which is exactly the resolution-bypassing
the `exports` map exists to prevent. The near-universal convention is to add the one line.

*Falsifier*: name an `exports` condition that resolves `@mkbabb/parse-that/package.json`.
`package.json:7-40` has five explicit keys and no pattern key.

### C-m5 — The tarball ships ~11 internal `.d.ts` files no `exports` path can resolve

**MINOR** · `package.json:7-40` (`exports`), `:41-43` (`files: ["./dist"]`).

`files: ["./dist"]` publishes the whole directory; `exports` declares five conditions and **no `"./*"`
wildcard**, so deep imports are blocked. Dead published weight: `dist/ansi.d.ts`, `debug.d.ts`,
`leaf.d.ts`, `parser.d.ts`, `state.d.ts`, `split.d.ts`, `lazy.d.ts`, `packrat.d.ts`, `utils.d.ts`,
`parsers/{index,json,csv,utils}.d.ts`, plus every `.d.ts.map` and `.js.map`. Notably `debug.d.ts`
types the very functions C-M2 shows are absent from the runtime — a consumer who found the
declaration would get a phantom.

*Falsifier*: name an `exports` condition resolving `@mkbabb/parse-that/debug` or
`.../dist/debug.js`. There is no pattern key.

### C-m6 — The census: 29 never-importable runtime exports against 34 reachable ones, and the precept's gate polices exactly two

**MINOR** · `scripts/proof-no-dead-combinator.mjs:9-12,29-32` · six source files.
*Generalises C-M2 / C-M4 / C-m5 from named symbols to the whole set.*

The repo states the law in the imperative (`proof-no-dead-combinator.mjs:9-11`): *"A never-importable
export is not part of the public contract; an export born one prior tranche with zero workspace
consumers is dead by the precept."* Applying that law to the module's own tree — every symbol
carrying the `export` keyword that reaches **no** entry point (`.`, `/core`, `/diagnostics`,
`/packrat`, `/utils`):

| file | never-importable exports | n |
|---|---|---:|
| `debug.ts` | `summarizeLine:14` · `formatExpected:33` · `addCursor:53` · `statePrint:141` · `formatDiagnostic:200` · `formatAllDiagnostics:235` · `parserPrint:247` · `parserDebug:351` | 8 |
| `ansi.ts` | `bold:8` · `dim:9` · `italic:10` · `red:11` · `green:12` · `yellow:13` · `cyan:14` · `gray:15` · `bgRed:16` · `bgGreen:17` | 10 |
| `utils.ts` | `isDiagnosticsEnabled:16` · `addSuggestion:51` · `addSecondarySpan:57` · `reportUnclosedDelimiter:66` · `resetErrorState:131` · `popLastDiagnostic:146` | 6 |
| `packrat.ts` | `getCijKey:79` · `packratEnter:216` · `packratExit:243` | 3 |
| `state.ts` | `parserNames:141` | 1 |
| `leaf.ts` | `_initWhitespace:396` | 1 |
| | **total** | **29** |

**Twenty-nine never-importable against thirty-four reachable** — 46 % of the module's `export`
keywords produce no public surface. The gate that codifies the precept hardcodes a **two**-name ban
list (`proof-no-dead-combinator.mjs:29-32`: `thenMap`, `fuse`), both already deleted. It is the same
structural weakness C-B1 identifies from the other direction: the gate bans names instead of
computing the zero-reachability set, so it can only ever catch what someone already knew.

*Falsifier*: "these are internal by convention, so the precept does not apply." Only
`_initWhitespace` carries the underscore marker; none carries an `@internal` JSDoc; and
`vite-plugin-dts` emits `dist/debug.d.ts` and `dist/ansi.d.ts` as first-class declaration files,
shipped by `files: ["./dist"]` (C-m5). Second falsifier: exhibit any of the 29 resolving from a
published entry — `'parserNames' in await import('./dist/parse.js')` → **`false`**; C-M2's greps
return empty for the `debug.ts` set. SURVIVED. *Recorded honestly*: `getCijKey`, `packratEnter`,
`packratExit`, `_initWhitespace`, and `isDiagnosticsEnabled` are all genuinely load-bearing
internals — the defect is that they carry `export` at all, which is a source-hygiene MINOR, not a
consumption BLOCKER. Only the `debug.ts` and `utils.ts` rows have consumption consequences, and those
are already scored at C-M2, C-M3, C-M14, and C-M15.

---

## 4. INFO — record corrections and declared trade-offs

### C-i1 — O-15's `packrat-entry:881` cite is off by one against the build in the tree

**INFO** · INBOX `docs/tranches/V/coordination/INBOX.md:77`;
`parse-that/docs/valuejs-evidence-2026-07-27-1.1.0-ask-addendum.md` §PT-01.

O-15 cites `dist/packrat-entry-*.js:881` for the unconditional `console.error`; in the build present
it is at **`:882`**. Same build, not a different artifact: the sibling chunk hash
`diagnostics-DDazRHgl.js` matches the letter's cite exactly and that letter's `:14` reproduces
byte-for-byte, as do all four `PACKRAT_ARMED` cites (`:678`/`:682`/`:714`/`:722`). I record the drift
rather than propagate it; C-M3 is unaffected. Note also `:262` — a **second** `console.error`, the
default `logger` parameter of `parserDebug` — which the letter does not cite and which is opt-in, not
on the failure path.

*Falsifier*: `grep -n console.error dist/packrat-entry-CS1td-8B.js` → `262`, `882`.

### C-i2 — value.js `4.0.0` §Breaking omits the parse-that removal

**INFO** · `value.js/CHANGELOG.md:16-22` vs commit `164343c1`.

The §Breaking list enumerates seven removals and never records that the sole runtime dependency was
deleted. A consumer diffing manifests learns it; a consumer reading the changelog does not. This is
value.js's record to correct, filed here because it is why C-B1 has no paper trail on either side.

*Falsifier*: find "parse-that" between line 3 (the `4.0.0` heading) and line 32 (the `3.1.0`
heading). `grep -n parse-that CHANGELOG.md` → `165, 175, 177, 184, 332, 333, 336, 350, 482` — none in
range.

### C-i3 — No legacy-resolver fallback; recorded because it is a **declared** trade-off, not a regression *(folded — re-verified)*

**INFO** · `package.json` (`main`, `types`, `module` all `undefined`) · `test/manifest-gate.mjs:1-9`.

There is no top-level `main`, `types`, or `module`. A pre-`exports` resolver (Node < 12.7, or a
bundler pinned to `mainFields`) resolves nothing. This is **deliberate and gated**:
`test/manifest-gate.mjs:1-9` records that 0.9.0's `typesVersions` mapped to a non-existent path and
that the cure was to delete it because *"the `exports` map already resolves types correctly for every
modern resolver."* Recorded as a declared posture, not scored as a defect — but it is a real
consumption boundary, and it is not written down anywhere a consumer reads.

*Falsifier*: show `main`/`types`/`module` present in `package.json` — `node -e` prints `undefined`
for all three.

---

## 5. SUPERLATIVES — L-18 runs both ways, same evidentiary burden

### S-1 — Source↔dist surface parity is **exact at 34/34, in both formats**, and it is gated

Counting `index.ts` by hand: 1 (`parser`) + 4 (`state`) + 8 (`utils`) + 3 (`lazy`) + 3 (`packrat`) +
8 (`leaf`) + 2 (`split`) + 5 (`parsers`) = **34**. Measured (§0.3): ESM 34, CJS 34.
`dist/index.d.ts` reproduces all ten export statements verbatim. The 0.8.2 defect the gate exists for
(`dist-surface.test.ts:7-10`, 8 of 15 shipped) has not recurred, and — C-M1's star-line hole aside —
the gate is a cheap, correctly-motivated cure for a defect class that silently lies to consumers
through a version number. *Falsifier*: exhibit any `index.ts` runtime name absent from
`Object.keys(await import('./dist/parse.js'))`. None.

### S-2 — The CJS build preserves the `whitespace` live binding through a getter

`leaf.ts:395` declares `export let whitespace` and `parser.ts:711` assigns it after module
evaluation — a deferred-initialization pattern most barrels turn into a permanent `undefined` on the
CJS side, because a naive `exports.whitespace = whitespace` snapshots the pre-init value. This build
does it correctly:

```js
// dist/parse.cjs:25-28
Object.defineProperty(exports, "whitespace", { enumerable: true, get: () => packrat.whitespace });
```

Note the discrimination: the other 33 exports are plain `exports.X = chunk.X` assignments
(`dist/parse.cjs:7-24,29+`); **only** the one mutable binding gets the getter. That is a targeted,
correct treatment, not a blanket one. *Falsifier*: show `whitespace` snapshotting — `require()` the
CJS build and read the descriptor; it has a getter and no value.

### S-3 — The `*Span` excision is triple-gated, and the barrel documents its own removal with citations

`index.ts:10-12` carries a three-line comment naming the removal, the wave (S.H2), the fold row (48),
the prior deprecation (0.13.0, PT-Q4), the reason (zero consumers), and the enforcing gate
(`proof:no-span-surface`) — inline, in a 14-line file. Enforcement is genuinely triple: source barrel
(`dist-surface.test.ts:70-79`), built dist (`:55-68`), and a runtime proof script
(`package.json:52`). All 15 builder names are absent from `index.ts` and `dist/index.d.ts`. A barrel
that records *what it stopped exporting, why, and the gate that keeps it stopped* is rare and is the
correct posture — even though C-M8 shows the excision's residue was scoped by name rather than by
producer. *Falsifier*: `grep -E
'(string|regex|many|sepBy|wrap|opt|skip|next|alt|takeUntilAny|negate|peek|not|minus|lookAhead)Span'
src/parse/index.ts dist/index.d.ts` → empty.

### S-4 — Zero renames, zero default export, zero namespace re-export — so the root and the tiers hand back the **same** binding, and a gate checks it

Every one of the 34 is a pass-through of its source name: no `as`, no `export default`, no
`export * as ns`. Consequently `dist/parse.js:1` and `dist/core.js:1` import from the identical chunk
file (`./packrat-entry-CS1td-8B.js`), so within one module format `Parser` from the root and `Parser`
from `/core` are the *same object* — no intra-format dual-instance hazard, and the whole surface is
enumerable by `grep` without resolving aliases. `test/subpath-gate.mjs:26-58` reads the `exports` map
from `package.json` rather than hardcoding paths, checks all three fields of all four subpaths
exist, then **imports the targets and asserts live functions** (`core.Parser`, `core.dispatch`,
`packrat.memoize`) — a gate that tracks the manifest instead of duplicating it. (This is precisely
why C-B2's *cross-format* duplication is the only identity break in the package, and why it earns its
severity.) *Falsifier*: find an alias, default, or namespace form in `index.ts` — 14 lines, none.

### S-5 — Type-export hygiene is exact at all six type positions

Under `verbatimModuleSyntax: true` (`tsconfig.json:8`), every type-only export must be spelled as
such or the emitted JS carries a phantom runtime import. All six type positions are correct:
`index.ts:2` uses the inline form (`type ParserFunction` beside a value export in one clause);
`index.ts:4` and `index.ts:6` use whole-clause `export type { … }` for `ParserContext`, `Span`,
`Suggestion`, `SecondarySpan`, `Diagnostic`. Zero over-broad `export type` on a value, zero value
export of a type. The consequence is visible in the artifact: `dist/parse.js`'s export list contains
exactly the 34 runtime names and not one type name. *Falsifier*: find a type in `dist/parse.js`'s
export list, or a value smuggled through an `export type` clause.

### S-6 — **New measurement**: the PT-03 latch is *statically eliminable*, which refines O-15 and C-B2 in the consumer's favour

C-B2 scores the packrat latch as a blocker, and it is right about the construction. But no pass had
asked whether a consumer can *compile it away*. Under §0.5's posture A, a `/core`-only bundle whose
single import is `string`:

```
$ grep -c PACKRAT_ARMED  core-string.bundle.js   → 0
$ grep -c memoize        core-string.bundle.js   → 0
// bundle :596-598 — rollup constant-folded the flag to `false` and folded the epoch entry:
function packratEnter() {
  return null;
}
```

Rollup proved `PACKRAT_ARMED` is never assigned `true` in that graph (the sole write is
`packrat.ts:290`, inside `makeMemoized`, reachable only from `memoize`/`mergeMemos`), folded the
flag, and reduced `packratEnter()` to a stub. So **O-15 PT-03's 1.47× is a cost of *reaching*
`memoize`, not a structural cost of the library**: any consumer whose module graph never touches it —
including a *barrel* consumer, since `dist/parse.js` re-exports `memoize` as an ordinary shakeable
binding — pays nothing, and the arming apparatus does not survive into the artifact at all.

This is a refinement of PT-03, not a contradiction of it: PT-03 measured a runtime cost *after*
arming; this measures that the apparatus is eliminable *before* it. It is also the one piece of good
news in this file for the X·P bench posture — W1 §G-4 requires every bench cell to prove
`PACKRAT_ARMED === false` at entry and exit, and a `/core`-shaped cell can satisfy that by
**construction** rather than by assertion.

*The condition, stated so the superlative is not oversold*: **one** `memoize` call anywhere in the
application un-folds it process-wide and permanently (`packrat.ts:290` sets, and per C-B2 nothing
clears — `resetPackrat` at `:262-273` clears three Maps and never touches the flag). The elimination
is a property of the *consumer's* graph, not of the library, which is exactly why W2 §3b **O-8**
outlaws the construction anyway. *Falsifier*: exhibit `PACKRAT_ARMED` or `memoize` surviving in a
`/core` bundle that does not import them — the two greps above return `0` and `0`; or show the fold
holding after a `memoize` call, which C-B2's one-way write forbids.

---

## 6. The X·P dual-target algebra: KEEP · WRAP · RETIRE

Read against `W2.md` §3b (the normative object: state `(V, C, P, D)`; COMP-1; O-8; EQ-1..EQ-6;
R-LAW-1..5) and §3c (candidates AC-1 TAGLESS-TWIN · AC-2 CLOSED-IR · AC-3 SPAN-ALGEBRA · AC-4
SIBLINGS-ORACLE). W2 is **specified and unrun** — its preamble: *"nothing in either arm, or here,
authorizes execution: X·P execution awaits the owner's explicit begin-word."* Nothing below is a
recommendation to act; it is a reading of what the ratified laws imply about this barrel.

**KEEP — 8 of 34.** `Parser` · `ParserState` · `string` · `regex` · `any` · `all` · `dispatch` ·
`eof` (`index.ts:2,3,9`). These are the eight the band's two independent hand-written grammars
actually drove — `parser-band.md` §"Shared virtues": *"regexes are single-token terminals; fixed
arity as `all()` typed tuples (zero `!` under `noUncheckedIndexedAccess`); … two-level `dispatch`
narrowing; … entry via `parseState` + `isError`, never `parse()` truthiness."* AC-1's *"lowering-JS
instantiates the signature with the combinator library's own constructors (the interpretation IS the
shipped parser — source-direct, no codegen)"* names this set as its substrate. The fluent combinators
the grammars also use — `.then`, `.or`, `.chain`, `.map`, `.opt`, `.trim`, `.skip`, `.next`, `.wrap`
— are **methods** on `Parser` (`parser.ts:81,105,124,146,189,212,234,481` and the `wrap` at
`parser.ts:392`), so they ride `index.ts:2` and need no barrel row of their own. **AC-3 would grow
this line**: its scanner is *"a combinator-library citizen (fresh-root `typescript/src/**`,
branch-isolated — parse-that owns it; scannerless surface preserved, scanning an internal fusion)"* —
under exactly one of four candidates, `index.ts` is a **growing** surface, not a shrinking one.

**WRAP — 9 of 34, and the wrap is total: they must become parse parameters.** All six diagnostics
exports at `:5` and all three packrat exports at `:8`. O-8 is categorical: *"Arming, memoization, and
diagnostics are **parameters of a parse**, never latches."* Under the algebra
`enableDiagnostics`/`collectDiagnostic`/`getCollectedDiagnostics`/`clearCollectedDiagnostics` collapse
into the **`D`** limb — *"an append-only ordered list of `ParseIssue` values… diagnostics are
**values, never effects** (R-LAW-3)"* — and `mergeErrorState`'s label argument becomes the
operator-level *"labelled zero-width failure with named expectations"* of §3b's capability family.
`memoize`/`mergeMemos`/`resetPackrat` become a per-parse memoization parameter with no absorbing
state. C-B2 is the measurement that makes this a wrap and not a keep; C-M4 is why the labels cannot
even be named today.

**RETIRE — 17 of 34.**

- `containsDelimiter`, `splitBalanced` (`:13`) — `split.ts:3-6` names their consumer as *"BBNF-
  generated `toDoc()` code"*; §0.2 finds zero hits in `bbnf-lang`. They are string **formatting**
  helpers, not parsing: no place in a state algebra whose every operator must satisfy COMP-1.
  **Retire from the barrel even if kept as code**: C-M10 measures them at 36,359 / 37,142 bytes
  through `.` for ~90 and ~900 bytes of body — they are the only two exports whose entire barrel cost
  is pure amplification, and a leaf-only home (or bbnf-lang ownership) removes ~400× for the consumer
  they were written for without touching the algebra.
- `jsonParser`, `csvParser` (`:14` via `parsers/index.ts:5-7`) — `parsers/index.ts:1-4` calls them
  *"the terse, spec-grade combinator examples"*. Showcases, not algebra. W2's shared slice (§3d) is
  `parseCssColor` deep + `parseTimingFunction` whole + one malformed qualified rule; neither JSON nor
  CSV appears.
- `escapedString`, `quotedString`, `numberParser` (`parsers/utils.ts:7,15,21`) — superseded by AC-4's
  *"same machine-readable channel table extracted from `spec.ts` ('the ONE place a range lives')"* and
  by §3b's exact-scale operator `(value * num) / den`. A free-handed `numberParser()` is the *"neither
  sibling free-handing"* failure AC-4 must avoid.
- `lazy`, `getLazyParser`, `createLazyCached` (`:7`) — C-M9/C-m1; and the back-edge they gesture at is
  replaced by §3b's *"bounded back-edge (the depth bound an **algebra parameter**)"*, which is band
  **DEBT-3** verbatim (*"cand-O's one `lazy` back-edge should carry an explicit depth bound so the
  stack ceiling becomes an ordinary `ok:false` by construction"*). O-15 PT-04's thrown `RangeError` at
  7,762 is the current, unbounded shape.
- `skipWhitespace`, `skipBlockComments`, `trimStateWhitespace` (`:5`, `:9`) — these mutate
  `state.offset` in place (`utils.ts:159-165,168-186`; `leaf.ts:372-391`) and the skipped bytes
  **vanish with no record**. Direct COMP-1 violation (*"`weave(V, C, P) === S`, byte for byte"*) and
  R-LAW-2 (*"Bytes skipped by recovery enter `C`; they never vanish"*). Under the algebra whitespace
  and comments are `C` entries — *"ordered `(offset, length, kind)` for every byte of `S` **not**
  injected into `V` — whitespace, comments, case spelling…"* — not an offset bump.
- `whitespace` (`:9`) — a shared mutable module singleton (`leaf.ts:395`, initialized at
  `parser.ts:711`, its `context.name` mutated at `leaf.ts:398`) and the default argument of
  `Parser.trim()` (`parser.ts:481`). A process-global parser instance is O-8's shape.
- `spanToString`, `mergeSpans`, `Span` (`:3`, `:4`) — already orphaned in the tree (C-M8), and
  independently superseded: W2 replaces span-carrying with the `C` complement plus a `P` side table
  that is *"provenance without tree position; an array, not a node field."* At most these survive as
  an internal of `P`; as a **public** value type they invite the node-field posture §3b calls a draft
  defect.

**Two structural obligations this barrel cannot meet as published.** (i) **EQ-4** compares diagnostics
*"ordered structural equality … `code` / `start` / `end` / `expected[]` / `actual`"* and rules that
*"a candidate whose labels exist only under an armed-diagnostics mode reads as diagnostics-ABSENT and
fails (PT-01)"* — C-M3 promoted from observation to kill condition. (ii) **R-LAW-3**'s probe
*"monkey-patches `console.error`/`console.warn` to **throw** over the full corpus"*; `parser.ts:67-69`
prints on the failure path of every parse whenever the global is armed, so the armed configuration of
this barrel cannot pass that probe at all.

---

## 7. Boundary of culpability — what this module could not fix

Honesty about attribution, so the severities are not inflated:

- The **latch itself** is `packrat.ts:290`'s design, not the barrel's; the barrel's culpability is
  that it puts the arming door on the **default** import path (`:8`) and names the non-reset
  `resetPackrat` beside it (C-B2).
- The **`console.error`** is `parser.ts:67-69`; the barrel's culpability is exporting the only switch
  that turns it on while withholding the reader (`isDiagnosticsEnabled`) — a surface decision, not a
  parser decision (C-M3).
- The **`RangeError` ceiling** is `createLazyCached`'s unbounded recursion; the barrel's culpability
  is publishing three lazy-named exports, none of which is the one consumers reach (C-M9).
- The **packrat-on-`/core`** coupling is `parser.ts:43-49`; the barrel's culpability is that it (and
  `core.ts`) publish a tiering promise the module graph cannot keep (C-M6).
- The **dependency deletion** at `164343c1` is value.js's act. The barrel's culpability is that it
  carries no marker of it: same version, same manifest, same 34 exports, and a dead-code precept in
  its own gate that it does not apply to itself (C-B1).
- The **chunking** is `vite.config.ts`'s output, and the two `parser`↔`leaf` / `parser`↔`packrat`
  cycles are `parser.ts:6-7`'s design; the barrel's culpability is publishing a five-way tier split
  that the module graph forbids, and pricing it at ~400× for the three leaf-pure exports that owe the
  graph nothing (C-M10, C-M11).
- The **`recover()` journal write** is `parser.ts:665`; the barrel's culpability is publishing the
  accumulator and withholding its inverse, so the behaviour is neither avoidable nor reproducible
  from outside (C-M12, C-M14).

---

## 8. Verdict

The module is **DEFECTIVE on the consumption axis**, and the defect is not ergonomic — it is
existential. Two blockers carry it: the barrel has **no consumer anywhere in the constellation**
(C-B1, six independent commands, all empty), and nine of its thirty-four exports are the
process-global latch construction the ratified X·P algebra forbids by name (C-B2, proven by
`esm.Parser !== cjs.Parser` and by a `PACKRAT_ARMED` with exactly one write, and that write is
`true`). The band's RED-7 resolves **entirely** onto this file (C-M5, 7-of-7), and the probe that
measures it can no longer run because the dependency edge it needs was deleted at `164343c1`. Of the
34 exports, the algebra keeps 8, must wrap 9 into parse parameters, and retires 17.

**26 rows — 2 BLOCKER · 15 MAJOR · 6 MINOR · 3 INFO · 6 superlatives.** Three rows were
**severity-reduced by their own falsifiers** and are recorded at the reduced grade, not the one the
prosecution wanted: C-M11's harm half is killed for rollup (the row survives on the posture-A column
and the bundler-dependence), C-M15 is refined from "cannot construct" to "cannot sink", and C-m6's
consumption consequence is explicitly narrowed to the `debug.ts`/`utils.ts` rows already scored
elsewhere. One superlative (S-6) is a new measurement that moves a corpus number in the module's
favour.

Pass 3 adds the price tag and the mechanism behind it. The fan-in C-M6 described structurally costs
**~400×** for the three exports that owe the parser graph nothing (C-M10: 36,359 bytes to deliver a
90-byte `indexOf` wrapper), and it costs that only because the package declares a purity it does not
have and gates the declaration instead of the artifact (C-M11: `sideEffects: false` at
`package.json:6`, mandated by `manifest-gate.mjs:37-40`, contradicted at
`dist/packrat-entry-CS1td-8B.js:28` and `:1416` — a gate that cannot fail for its intended reason).
Pass 3 also finds the process-global story is worse than C-B2 could see from the export list: the
journal has an **unconditional writer on a public method** that retains across parses (C-M12,
`parser.ts:665`), a getter that leaks the live store against a clearer that swaps it (C-M13), and no
published inverse — including the one `Parser.recover` itself depends on (C-M14, `parser.ts:674`).
Three of the four diagnostics laws W2 §3b ratifies (R-LAW-1, R-LAW-3, R-LAW-4) are unmeetable from
this surface, and **EQ-4** has no store whose identity survives comparison.

The craft in the file is real and §5 records six superlatives for it — exact 34/34 source↔dist
parity, a correctly-handled `export let` live binding in CJS, a triple-gated and self-documenting
`*Span` excision, an alias-free surface with a manifest-tracking subpath gate, exact type-export
hygiene at all six positions, and — new at pass 3, and the one finding that runs *against* the
prosecution — the PT-03 latch proving **statically eliminable** from any consumer graph that never
reaches `memoize` (S-6), which refines O-15's 1.47× from a structural tax into a cost of admission.
L-18 ran both ways and it moved a number in the defence's favour.

None of it reaches a consumer. A barrel can be immaculate and still be, on this axis, a closed door.
