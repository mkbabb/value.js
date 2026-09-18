claude-opus-5[1m]

# CHALLENGE — `split` · axis C (CONSUMPTION)

**Subject**: `/Users/mkbabb/Programming/parse-that/typescript/src/parse/split.ts` (58 lines, 2 exports)
**Axis**: C — how this module serves its consumers: published surface vs. actual consumption, the
`/css` 52-export surface, API ergonomics, semver hygiene, and the X·P dual-target algebra's
keep/wrap/retire verdict.
**Posture**: the module is assumed DEFECTIVE until the tree proves otherwise. Every claim below
carries severity + `file:line` provenance + its falsifier. Superlatives carry falsifiers too (L-18
runs both ways). Where a claim is derived from source rather than executed, it is tagged
**UNMEASURED** in place.
**Date**: 2026-08-04.

## 0. Bounds honored

- `/Users/mkbabb/Programming/parse-that` was read only. No file in it was created, edited, or
  deleted; no `cargo`/`vite` build was run (a build writes into the evidence tree). All dynamic
  evidence below was produced by evaluating source text **in memory** via `node --input-type=module`
  from stdin — zero files written anywhere except this one.
- `.worktrees/`, frozen roots, and `~/Documents/Codex` were never entered.
- **`/Users/mkbabb/Programming/parse-that-css-totality-p2` does NOT exist** —
  `ls` → `No such file or directory`, re-verified at the head of this audit. No STOP finding.
- **Post-audit receipt**: `git -C /Users/mkbabb/Programming/parse-that status --porcelain -- typescript/`
  → **empty**. `split.ts` mtime `Mar 9 15:39:42 2026`, `split.rs` mtime `Apr 27 16:37:00 2026` — both
  pre-audit, unmodified. The repo does carry pre-existing uncommitted Rust modifications
  (`rust/parse_that/src/{lib,scanners,state}.rs`, `parsers/scan/**`, `.cargo/config.toml`, `README.md`)
  — these are the **uncommitted Wasm substrate W2 OP-6 documents**, present on arrival and untouched
  here; corroborating OP-6's re-verification rather than contradicting it.
- No packrat and no diagnostics were armed. Nothing in this file calls `memoize()`,
  `enableDiagnostics()`, or `makeMemoized()`; the one-way `PACKRAT_ARMED` latch (O-15 PT-03) was
  never touched. The two timing runs below exercise the reconstructed `splitBalanced` alone.
- Imports read: **none**. `split.ts` has zero `import` statements (lines 1–58) — it is the only
  leaf in `src/parse/` with no dependency edge. The read set was therefore widened to its
  *consumption* edges: both barrels, the `exports` map, all five `proof:*` gate scripts that could
  bear on it, the Rust sibling, both test corpora, the published `dist/`, and value.js `src/css/**`.

## 1. Verdict

| | count |
|---|---|
| **Defects** | **14** (C-1 … C-14) |
| **Blockers** | **2** (C-1, C-2) |
| **Superlatives** | **5** (S-1 … S-5) |

**One-line verdict**: the module is *technically the best-behaved leaf in `src/parse/`* — pure,
import-free, latch-free, byte-conservative, and cross-language differential-tested — and it serves
**nobody**. Its published surface has zero consumers in any of the four trees parse-that's own
dead-code gate sweeps; its documented consumer (`toDoc()`) does not exist anywhere in the tree; and
the routing law's sole downstream, value.js, does not depend on the package at all and has
independently authored a *divergent* replacement with 22 call sites. The X·P verdict is **WRAP the
contract, RETIRE the surface** (§6).

## 2. The consumption census (the axis's central measurement)

### 2a. Zero consumers, measured in the repo's own idiom

`proof:no-dead-combinator` (`typescript/scripts/proof-no-dead-combinator.mjs:63-68`) defines the
constellation consumer set as exactly four trees. I ran that gate's own walk + call-site regex over
those four trees for this module's two exports, excluding the definition file:

```
splitBalanced:     1 call-site file  →  ~/parse-that/typescript/test/split.test.ts
containsDelimiter: 1 call-site file  →  ~/parse-that/typescript/test/split.test.ts
```

The only caller of either export, anywhere in the constellation, is the module's own unit test.

### 2b. The routing law's sole downstream consumes none of it

The routing law is `parser → value → packed release` (W2 §2c, PLAW-BIND). Measured on value.js:

| probe | result |
|---|---|
| `@mkbabb/parse-that` in `value.js/package.json` `dependencies` | **ABSENT** (deps = `@mkbabb/glass-ui`, `@mkbabb/keyframes.js` only) |
| `@mkbabb/parse-that` in `devDependencies` | **ABSENT** |
| `value.js/node_modules/@mkbabb/parse-that` | **ABSENT** |
| `@mkbabb/parse-that` in `keyframes.js/package.json` | **ABSENT** |

W2 §3 "Not in scope" confirms this is the *ruled* state, not an oversight: *"adding
`@mkbabb/parse-that` to `package.json` (X-W9 G31 measures that set and it stays as measured)"*.

### 2c. The downstream re-authored the function instead

value.js `src/css/grammar.ts:63-87` defines `splitTopLevel(source, separator: string | "space")`
— the same balanced-split shape — and exports it internally (`grammar.ts:483`). Consumption:

| tree | call sites |
|---|---|
| `src/css/grammar.ts` · `stylesheet.ts` · `timeline.ts` | **22** |
| of which use the `"space"` pseudo-separator | **5** |

`stylesheet.ts:8` imports it; `stylesheet.ts:96` (`splitDeclarations`) routes the whole declaration
body through it; `grammar.ts:177/181/340/350/446/455/468/471` route color bodies, `cubic-bezier`,
`steps`, and `linear()` through it. It is load-bearing for the `/css` runtime surface.

Three further *inline* re-implementations of the same depth-scan exist in the downstream —
`splitValueTokens` (`grammar.ts:89-126`), `emptyComma` (`stylesheet.ts:365-384`), `topLevelColon`
(`stylesheet.ts:580-593`) — i.e. the downstream needed this primitive **four** times and reached for
the published one **zero** times.

### 2d. Would the published surface serve those 22 call sites? Measured: no.

Head-to-head on eleven shapes taken from the actual value.js call sites
(`splitBalanced` from `split.ts` vs `splitTopLevel` from `grammar.ts`, both reconstructed verbatim
from source; the reconstruction preserves `grammar.ts:72`'s escape check — asserted before the run):

```
case                    splitBalanced                          value.js splitTopLevel
X oklch body / split    ["0.5 0.1 200 "," 0.5"]                ["0.5 0.1 200","0.5"]
X rgb components        ["255","128","","","0"]                ["255","128","0"]
X selector list         [":is(.a, .b)"," .c"]                  [":is(.a, .b)",".c"]
X cubic-bezier args     ["0.25"," 0.1"," 0.25"," 1"]           ["0.25","0.1","0.25","1"]
X linear() rows         ["0 0%"," 0.5 50%"," 1 100%"]          ["0 0%","0.5 50%","1 100%"]
  linear row parts      ["0.5","50%"]                          ["0.5","50%"]
X declaration list      ["color: red"," background: blue",""]  ["color: red","background: blue"]
X nested rule block     ["color:red"," &:hover { color: blue"," }"]  ["color:red","&:hover { color: blue","}"]
X content w/ semicolon  ["content: \"a; b\""," color: red"]    ["content: \"a; b\"","color: red"]
X escaped quote in str  ["font-family: 'It\\'s"," mine', serif"]   ["font-family: 'It\\'s, mine'","serif"]
X trailing empty        ["a"," b",""]                          ["a","b"]

10/11 value.js consumption shapes DISAGREE
```

Eight of the ten disagreements are **policy** (trim / empty-drop / whitespace-run collapse) and are
arguably parse-that's win (see S-1). **One is a correctness defect** in parse-that (escaped quote →
C-3). And the `"space"` separator — 5 of the 22 sites — is **structurally unrepresentable**:
`splitBalanced(s, " ")` emits an empty part per extra space (`"255 128   0"` →
`["255","128","","","0"]`), because it has no run-collapsing.

So retrofitting `splitBalanced` to serve its intended downstream requires four API changes
(trim policy, empty-drop policy, whitespace-run separator, escape handling) — i.e. a breaking
redesign, not an adoption.

### 2e. Where it touches the `/css` 52-export surface and RED-7

The `/css` surface is **52** exports — 33 types (`value.js/src/css/index.ts:1-35`) + 19 runtime
(`:36-60`; re-counted here: `parseCssColor, parseCssScalar, parseCssValue, parseCssValues,
parseKeyframeSelector, parseTimingFunction, serializeCssColor, coerceToSyntax, parseAnimationRange,
parseAnimationTimeline, serializeTimelineOptions, collectAnimationOptions, collectCustomFunctions,
collectDeclarations, collectKeyframes, collectPropertyDescriptors, collectStyleRules,
collectTimelineOptions, parseStylesheet` = 19). Matches W2 §3.2's count exactly.

`splitBalanced` corresponds to **none** of the 52 — it is strictly sub-surface. But it sits
directly beneath **at least 10** of the 19 runtime exports via `splitTopLevel`'s 22 call sites
(`parseCssValue`/`parseCssValues` via `grammar.ts:340/350`; `parseTimingFunction` via `:446/455/468/471`;
`parseCssColor` via `:177/181`; `parseStylesheet` + the six `collect*` via `stylesheet.ts:47/54/96/491/554/603/738`;
`parseAnimationRange`/`parseAnimationTimeline` via `timeline.ts:23/38/68/71/75`).

Of the RED rows `parsethat-surface-gaps.mjs` measures
(`value.js/docs/tranches/V/megatranche/prototypes/css-parser/parsethat-surface-gaps.mjs`), exactly
one class reaches this module: the **`GUARD` rows** at `:47-52` —
`parseState(non-string)` totality and the indistinguishable failure signal. `split.ts` reproduces
both, with a strictly worse arm (C-4). The DEBT-1/DEBT-2/DEBT-3 rows (`:19-33`) do **not** touch it:
it has no diagnostics path, no packrat path, and no recursion. That absence is itself the finding —
see C-11.

## 3. Defects

### C-1 — BLOCKER — the published surface has zero consumers and meets parse-that's own written kill criterion

**Provenance**: `split.ts:10,18` (definitions) → `src/parse/index.ts:13` + `src/parse/core.ts:26`
(dual re-export) → `dist/index.d.ts:9`, `dist/split.d.ts:1-2`, `dist/parse.js:12,36`,
`dist/core.js:43,53` (shipped, in the `export {}` block at `:38-57`). Consumers: §2a — one file,
the module's own test.

`proof-no-dead-combinator.mjs:10-11` states parse-that's precept in its own words:

> *"A never-importable export is not part of the public contract; an export born one prior tranche
> with zero workspace consumers is dead by the precept."*

That gate deleted `thenMap` and `fuse` in 0.13.0 on exactly this criterion. `containsDelimiter` and
`splitBalanced` satisfy the criterion identically — and escape only because the gate's `banned`
array (`:29-32`) is a hardcoded two-name list, not a census. `containsDelimiter` is the starker
case: it has **zero** consumers even inside the Rust sibling's own test file
(`rust/parse_that/tests/split_test.rs:1` imports `split_balanced` only).

Surface cost: 2 of 18 runtime keys on `./core` (11%) and 2 of 34 on the root entry (6%), verified by
importing the built `dist/core.js` and `dist/parse.js` and reading their runtime export keys — the
observable-truth idiom `proof-no-css-surface.mjs:12-14` mandates over `.d.ts` greps (*"This gate
instead observes the REAL surface: (1) the runtime export keys of the bundled `dist/parse.js`"*).
Both PRESENT on both entries.

**Falsifier**: any import or call of either name in `parse-that/typescript/src`,
`parse-that/typescript/test` (other than `split.test.ts`), `value.js/src`, or `keyframes.js/src`;
or `@mkbabb/parse-that` appearing in value.js's manifest or `node_modules`. Ran all five — every one
negative. A single production caller anywhere would demote this to INFO.

**Contradiction with the corpus**: none. This *extends* O-15 — the letter measured the parser tier's
postures and explicitly carried "no ask, no bug claim"; the dead-surface census was not in its scope.

### C-2 — BLOCKER — the guard/consume contract lies for every multi-character delimiter

**Provenance**: `split.ts:10` (`delim: string`, `indexOf`) vs `split.ts:50` (`ch === delim`, where
`ch` is a single UTF-16 code unit from `:28`). The doc at `:8-9` binds the two into a protocol:
*"Use before `splitBalanced` to avoid an array allocation when the delimiter is absent."*

Measured:

```
containsDelimiter("a::b","::")   →  true          ← the guard says PRESENT
splitBalanced("a::b","::")       →  ["a::b"]      ← the consumer says ABSENT
native "a::b".split("::")        →  ["a","b"]
splitBalanced("a, b, c",", ")    →  ["a, b, c"]
```

The guard and the consumer, documented as a pair, return **opposite answers** on the same input. No
throw, no diagnostic, no type error: the caller receives a silently unsplit string typed `string[]`.
The same failure is reachable by coercion — `containsDelimiter("aundefinedb", undefined)` is `true`
(`indexOf` stringifies), and `splitBalanced("aundefinedb", undefined)` returns the whole input.

The Rust sibling proves the TS signature is the defect and not the semantics: `split.rs:10,42`
type `delim` as **`u8`**, making a multi-character delimiter *unrepresentable*. The TypeScript
lowering widened the domain without widening the implementation.

**Falsifier**: a `delim.length === 1` runtime check, or a narrowed type (a 1-char template literal
type, or a `CharCode`/branded type). Neither exists — `split.ts:10` and `:18` both take bare
`string`, and `dist/split.d.ts:1-2` ships that signature verbatim. Any such narrowing would kill
this finding outright.

### C-3 — MAJOR — no escape handling: it splits inside CSS strings, contradicting its own doc

**Provenance**: `split.ts:30-37` — the quote state machine tests `ch === '"' || ch === "'"` with no
inspection of the preceding character. `split.ts:16-17` claims it *"ignores delimiters inside `""`
and `''` quoted strings."*

CSS Syntax §4.3.7 defines `\` escapes inside strings, so `'It\'s, mine'` is **one** string token.
Measured:

```
input:  font-family: 'It\'s, mine', serif
splitBalanced   → ["font-family: 'It\\'s", " mine', serif"]     ← string corrupted, split mid-token
splitTopLevel   → ["font-family: 'It\\'s, mine'", "serif"]      ← correct
```

value.js's `grammar.ts:71` (`if (char === quote && source[i - 1] !== "\\") quote = "";`) handles it;
`split.ts` does not. The doc claim at `:16-17` is therefore false for the escaped case, and the
module's own header frames its purpose as CSS-shaped work (`:4` — `()[]` nesting, `""''` quoting;
`split.test.ts:24,31,46,66` are all CSS selectors).

**Falsifier**: an escape branch at `:30` (e.g. `text[i-1] !== "\\"` or an explicit `\\` skip). Absent
in both lowerings — `split.rs:55-56` has the identical gap, so this is a *shared* defect, not a
lowering divergence.

### C-4 — MAJOR — PT-07's boundary class reproduced, with an arm strictly worse than a throw

**Provenance**: `split.ts:11` (`text.indexOf`) is the first thing touched; there is no type guard at
`:10`, `:18`, or `:20`. Measured across the PT-07 input set:

```
splitBalanced(undefined,",")  →  TypeError: Cannot read properties of undefined (reading 'indexOf')
splitBalanced(null,",")       →  TypeError: Cannot read properties of null (reading 'indexOf')
splitBalanced(42,",")         →  TypeError: text.indexOf is not a function
splitBalanced({},",")         →  TypeError: text.indexOf is not a function
splitBalanced([],",")         →  [[]]                    ← NO THROW
splitBalanced("a,b",undefined)→  ["a,b"]                 ← NO THROW
```

4/5 die with a raw built-in `TypeError` — never a named invariant, exactly O-15 PT-07's
*"5/5 non-string inputs throw a raw `TypeError`"* posture, reproduced one tier lower. The 5th is
**worse than the throw**: `[]` has an `.indexOf`, so the guard returns `-1`, the fast path fires, and
the function returns `[[]]` — a value whose declared type is `string[]` (`dist/split.d.ts:2`) but
whose sole element is an `Array`. A downstream doing `.map(s => s.trim())` gets a `TypeError` at a
site far from the cause. A missing delimiter (`undefined`) is likewise a silent no-op.

W2 §3.3 makes the cure normative: *"non-string inputs die at a named JS-boundary invariant **above**
the algebra (PT-07)."* `split.ts` is below everything and declares no boundary at all.

**Falsifier**: a `typeof text !== "string"` guard anywhere in the module, or a narrowed export
wrapper in either barrel. `index.ts:13` and `core.ts:26` are bare re-exports — no wrapper exists.

### C-5 — MAJOR — a pure String utility is published on the `./core` "primitive set" tier

**Provenance**: `core.ts:1-6` documents `./core` as *"The zero-side-effect primitive set: the Parser
core, state, leaf parsers, lazy, and the balanced-split helpers. A consumer that imports only this
never pulls the diagnostics accumulator, the packrat tier, or the json/csv domain parsers."*
`core.ts:26` re-exports the split pair into that tier.

But `split.ts` has **zero imports** (lines 1–58) and references no symbol from the combinator
algebra — no `Parser`, no `ParserState`, no `Span`, no `ParserContext`. It neither constructs nor
consumes anything a combinator library owns. It is `String.prototype.split` with a depth counter.

Meanwhile a `./utils` subpath exists, documented at `utils-entry.ts:1-5` as *"the batteries-included
helpers"* carrying *"the string utility parsers"* (`escapedString`, `quotedString`, `numberParser`).
That is the tier this module's shape belongs to. The misplacement inflates the minimal-surface tier
a tree-shaking consumer reaches for by 11% with helpers it can get from the standard library.

**Falsifier**: any reference from `split.ts` to a combinator-tier type or value — which would make
the `./core` placement correct. There is not one; the file's dependency set is empty.

### C-6 — MAJOR — the surface is doubly semver-locked and wholly ungated

**Provenance**: both names ship from **two** public entry points —
`index.ts:13` → `dist/index.d.ts:9` / `dist/parse.js:12,36`, and `core.ts:26` → `dist/core.js:43,53`.
Confirmed by runtime keys: PRESENT on both `./core` and `.`. Two entry points means two semver
contracts for one function; any signature change is a breaking change twice over.

No gate in `proof:all` (`package.json:49`) pins either name:

| gate | what it actually asserts | pins split? |
|---|---|---|
| `proof:manifest` | `typesVersions` paths, `sideEffects:false`, `exports["."].types` exists (`manifest-gate.mjs:24-47`) | no |
| `proof:subpath` | the four subpaths resolve; `core.Parser`, `core.dispatch`, `packrat.memoize` are functions (`subpath-gate.mjs:44-53`) | **no** |
| `proof:no-css-surface` | 16 CSS symbols absent from the runtime surface (`proof-no-css-surface.mjs:22-27`) | no |
| `proof:no-dead-combinator` | `thenMap`, `fuse` undefined (`:29-32`) | no |
| `proof:no-span-surface` | the 15 excised `*Span` builders | no |

A repo-wide grep for `splitBalanced|containsDelimiter` returns only: the module, the two barrels,
`split.test.ts`, `README.md:96`, `CLAUDE.md:14`, `typescript/CLAUDE.md:19,42,81`, and tranche docs.
**No gate script names them.** Consequence: silently dropping them from `./core` — a breaking change
for any consumer that took `core.ts:5`'s documentation at its word — passes `proof:all` GREEN.

**Falsifier**: any `proof:*` script asserting the presence of either export. None found.

### C-7 — MAJOR — the documented sole consumer does not exist in the tree

**Provenance**: `split.ts:3` — *"Used by BBNF-generated `toDoc()` code to split opaque Span text on a
delimiter at nesting depth 0."* This is the module's stated reason to exist and the justification
for its `()[]`-and-quotes semantics.

Repo-wide search for `toDoc` across `typescript/src`, `rust/parse_that/src`, and `grammar/`:

```
typescript/src/parse/split.ts:3   ///  Used by BBNF-generated `toDoc()` code ...
```

One hit — the doc comment itself (plus `to_doc` in `split.rs:3`, the mirrored comment). There is no
`toDoc` definition, no BBNF code generator, and no `bbnf`/`codegen`/`doc` directory anywhere under
`typescript/src` (`find` → empty). `typescript/src/` contains exactly one subdirectory: `parse`.

The module is therefore documented against a consumer that is either unbuilt, removed without
updating the doc, or never existed. On the consumption axis this is the root cause of C-1: a design
justified by a caller nobody can point at.

**Falsifier**: a `toDoc` emitter or definition anywhere in the tree, or a BBNF codegen entry point.
Neither exists. Note also `README.md:95` documents `span.ts` and `README.md:99` documents
`parsers/ — JSON, CSV, CSS`, both of which were **excised** (`core.ts:9-12`, `proof:no-span-surface`;
`proof:no-css-surface`) — so the README table in which this module's row (`:96`) sits is
demonstrably stale, which is why the row's claims cannot be taken as corroboration.

### C-8 — MINOR — the doc's guard-first advice is a measured net loss on the case it addresses

**Provenance**: `split.ts:8-9` advises calling `containsDelimiter` before `splitBalanced` *"to avoid
an array allocation when the delimiter is absent (the common case for single-item spans)."* But
`splitBalanced:20` **already performs that exact guard internally**. A caller following the advice
therefore pays a second full `indexOf` scan whenever the delimiter is present.

Measured (reconstructed source, in-memory; median-of-40-rounds × 20 000 iterations, sink retained):

```
DELIM PRESENT   naive 211.8 ns   doc-advised guard 274.9 ns   ratio 1.298×
DELIM ABSENT    naive  17.5 ns   doc-advised guard  14.7 ns   ratio 0.841×
node v26.0.0 darwin arm64 — N=1, one machine (O-15's honesty bound, adopted)
```

Following the doc costs **1.298×** on the present case to save 16% on the absent case. Whether that
trade wins depends entirely on the caller's absent:present ratio — and the doc asserts absence is
"the common case" without measurement, for a caller class that does not exist (C-7/C-1). The
advice is unfalsifiable in-tree and net-negative on the measured present case.

**Falsifier**: a real caller corpus where absence dominates enough to net positive. None exists —
there is no caller (§2a). Per the pinned bar posture (OP-4/W2 §2), these ratios are **reported, not
graded**: no bar is asserted.

### C-9 — MINOR — one depth counter for two bracket families lets them cross-cancel

**Provenance**: `split.ts:41-48` — `(` and `[` both `depth++`; `)` and `]` both decrement. Measured:

```
splitBalanced("[a,b),c", ",")  →  ["[a,b)", "c"]     ← a ')' closed a '['
splitBalanced("f(a],b)", ",")  →  ["f(a]", "b)"]     ← split inside the function
```

The `f(a],b)` case is reachable from real CSS: an unescaped `]` inside `url()` or an attribute
selector fragment silently re-enables splitting mid-argument. `split.rs:57-58` shares the defect
exactly (parity held on the wrong behavior).

**Falsifier**: two counters, or a bracket stack that requires matched closers. Neither exists.

### C-10 — MINOR — no `{}` and no comment awareness, in a module whose downstream needs both

**Provenance**: `split.ts:41-48` tracks `()` and `[]` only; there is no `/*` branch anywhere.
Measured:

```
splitBalanced("color:red; &:hover { color: blue; }", ";")
   →  ["color:red", " &:hover { color: blue", " }"]      ← split inside a nested block
splitBalanced("a/*x,y*/,b", ",")
   →  ["a/*x", "y*/", "b"]                               ← split inside a comment
```

This is exactly the shape the sole intended downstream drives through its own splitter:
`value.js/src/css/stylesheet.ts:96` routes declaration bodies through `splitTopLevel(body, ";")`,
and `stylesheet.ts:738` handles nested rules. (value.js's own splitter shares the brace gap and
strips braces at a higher tier — noted for symmetry, not as absolution.)

**Falsifier**: a brace or comment branch at `:41-48`. Absent.

### C-11 — MINOR — an unterminated quote silently swallows the remainder; there is no diagnostic channel at all

**Provenance**: `split.ts:30-39` — once `inString` is set, every subsequent character is skipped
(`:39`) and nothing ever resets it at end-of-input. Measured:

```
splitBalanced('url("x, y),z', ",")  →  ['url("x, y),z']      ← one part, no signal
```

The malformed input is indistinguishable from a well-formed single-item span. The return type is
`string[]` (`:18`), so **no failure is representable**: no `ok:false`, no issue code, no offset.

W2 §3b makes this normative for the successor: `D` is an append-only diagnostic journal, EQ-4
compares diagnostics structurally, and R-LAW-3 requires diagnostics be *values, never effects*.
This module emits neither values nor effects — it reads as diagnostics-ABSENT, the exact posture
W2 §3b's EQ-4 row says *"fails"*.

**Falsifier**: any error signal in the return type or an out-parameter. `dist/split.d.ts:2` ships
`string[]` — none.

### C-12 — MINOR — the empty-string delimiter diverges from `String.prototype.split` silently

**Provenance**: `split.ts:11` (`indexOf("")` → `0`, so the guard says PRESENT) vs `:50`
(`ch === ""` is never true). Measured:

```
containsDelimiter("abc","")  →  true
splitBalanced("abc","")      →  ["abc"]
native "abc".split("")       →  ["a","b","c"]
```

The C-2 guard/consume disagreement recurs at the degenerate end, and the result also diverges from
the standard-library function a consumer would reasonably expect this to generalize. Undocumented
in either the source doc (`:14-17`) or the `.d.ts`.

**Falsifier**: a documented or enforced non-empty precondition. Neither exists.

### C-13 — MINOR — the cross-language differential corpus covers only the happy path

**Provenance**: `typescript/test/split.test.ts` (13 `it()` — 2 for `containsDelimiter` at `:5,:9`,
11 for `splitBalanced` at `:15-64`) and `rust/parse_that/tests/split_test.rs` (11 `#[test]`). The 11
`splitBalanced` rows are 1:1 parallel in order and expectation, down to the degenerate
`",a,,b," → ["","a","","b",""]` (`split.test.ts:53` / `split_test.rs:52`) and
`mixed_nesting_and_quotes` (`split.test.ts:64` / `split_test.rs:65`). That parity is genuinely good (S-4).

But the corpus contains **zero** rows for any of the eight defect classes measured above:
multi-char delimiter (C-2), escaped quote (C-3), non-string input (C-4), cross-bracket cancellation
(C-9), braces (C-10), comments (C-10), unterminated quote (C-11), empty delimiter (C-12). Every
delimiter in every row of both files is a single `,`.

Asymmetry: `contains_delimiter` has **zero** Rust tests — `split_test.rs:1` imports `split_balanced`
only — while the TS side tests it twice (`split.test.ts:6,10`). The paired export is oracle-covered
on one lowering only.

**Falsifier**: a test row in either file using a delimiter other than `,`, or a malformed input.
Grep of both files: none.

### C-14 — MAJOR — the TS and Rust lowerings have different *domains*: an AC-1 "signature leak" already live in the tree's only shipped dual-target pair

**Provenance**:

| | TypeScript | Rust |
|---|---|---|
| split | `splitBalanced(text: string, delim: string): string[]` (`split.ts:18`) | `split_balanced(text: &str, delim: u8) -> Vec<&str>` (`split.rs:42`) |
| guard | `containsDelimiter(text: string, delim: string)` via `indexOf` (`split.ts:10-11`) | `contains_delimiter(text: &str, delim: u8)` via `memchr` (`split.rs:10-11`) |
| index space | UTF-16 code units (`text[i]`, `:28`) | bytes (`text.bytes().enumerate()`, `:53`) |

`README.md:96` presents these as one matched row —
`| Balanced splitting | split.ts — splitBalanced | split.rs — split_balanced |` — and omits
`containsDelimiter`/`contains_delimiter` entirely. The row implies a parity the signatures do not
have: the TS lowering accepts inputs (`"::"`, `""`) the Rust lowering cannot express, and answers
them wrongly (C-2, C-12). A consumer porting between targets must change types, and any differential
oracle built on this pair cannot even *pose* the multi-char question to both sides.

W2 §3c names this exact failure mode as AC-1 TAGLESS-TWIN's predicted failure (a): *"signature leak
— the union of both targets' needs grows a target-conditional or target-only primitive; two
algebras wearing one interface (K-2)."* It is not a hypothetical to be spiked in Stage 0 — it is
**already realized**, in the smallest and most-tested dual-target pair the tree contains. That
makes `split` the cheapest available empirical case for the W2 `.g` seat.

**UNMEASURED sub-claim**: `split.rs:62` slices `&text[start..i]` with byte indices taken from a
`u8` delimiter match; a delimiter byte that is a UTF-8 continuation byte (e.g. `0xA9`, the tail of
`é`) would land `i` off a char boundary and **panic**, where the TS lowering merely returns the
whole input. I could not execute this — running `cargo` writes into the read-only evidence tree.
Stated as source-derived; falsifiable by one `cargo test` in a lawful writable clone.

**Falsifier** (for the measured part): a `u8`-equivalent narrowing on the TS side, or a `&str`
delimiter on the Rust side. Neither exists in the two shipped signatures.

## 4. Superlatives (L-18, running the other way)

### S-1 — SUPERLATIVE — byte conservation by construction: `parts.join(delim) === text`, exactly

`splitBalanced` never trims, never drops empties, never normalizes: it pushes raw
`text.slice(start, i)` (`:51`) and advances `start = i + 1` (`:52`) past exactly one delimiter
character, with a final unconditional `text.slice(start)` (`:56`). The consequence is a
**conservation law**, measured:

```
",a,,b,"            parse-that join===text true    value.js join===text false
":is(.a, .b), .c"   parse-that join===text true    value.js join===text false
"a, b,"             parse-that join===text true    value.js join===text false
```

This is precisely the shape W2 §3b's **COMP-1** and **EQ-2** demand — *"for every `S` … `weave(V, C,
P) === S`, byte for byte"*, and *"same order, same `(offset, length, kind)`"*. `split.ts` already
satisfies the split-level analogue **for free**, because it declined to be helpful. The downstream's
`splitTopLevel` (`grammar.ts:78-79` and `:84-85` — `.trim()` on every part, `if (part)` /
`if (tail)` empty-drop) **destroys**
it: whitespace and empty items vanish with nowhere to go.

The naive reading of §2d — that value.js's splitter is simply better — is therefore **wrong at the
algebra altitude**. Under X·P it is value.js's splitter that would need a byte-complement retrofit,
and `split.ts`'s contract that is the correct primitive. This is the single most valuable thing this
module carries.

**Falsifier**: any input where `splitBalanced(t, d).join(d) !== t`. None found across the tested set,
and none is constructible: the only mutation of `start` is `i + 1` past a one-character delimiter,
and every branch that `continue`s (`:36,43,47`) leaves `start` untouched. (The property is stated for
single-character delimiters — for multi-char it is vacuous by C-2.)

### S-2 — SUPERLATIVE — O-8-clean and rollback-exact by construction; the anti-`PACKRAT_ARMED`

`split.ts:1-58` contains **no `import`** and **no module-scope mutable binding**. Every piece of
state (`result`, `depth`, `inString`, `start`, `:22-25`) is function-local. It is a pure function.

W2 §3b's **O-8 (anti-latch construction rule)** — *"No operator reads or writes process-global
mutable state. Arming, memoization, and diagnostics are parameters of a parse, never latches"* —
is satisfied here trivially and absolutely. **EQ-5 (rollback exactness)** is likewise free: there is
no state to restore. And W2 §3c's AC-3 predicted failure (d), *"arena latch — span-buffer reuse
across parses is the PT-03 class; K-6 kills any candidate whose parse #100,001 is distinguishable
from parse #1"*, cannot touch it: it allocates a fresh `result` per call (`:22`).

Set against O-15 PT-03 — `PACKRAT_ARMED` one-way, 93.9 → 138.2 ns (**1.47×**), `resetPackrat()`
leaving 139.3 — `split.ts` is the counter-example in the same package: it is what O-8 compliance
looks like. Combined with `sideEffects: false` (`package.json:6`, gated by `proof:manifest`) and its
empty import set, it is also perfectly tree-shakable — a consumer that never calls it pays zero
bytes, which materially softens C-1's surface cost (though not C-1's semver cost).

**Falsifier**: any module-scope `let`/`var`, any import, or any closure over shared state. The file
has none — verifiable by reading all 58 lines.

### S-3 — SUPERLATIVE — the underflow clamp is matched across lowerings, and beats the downstream

`split.ts:46` uses `depth = Math.max(0, depth - 1)`; `split.rs:60` uses
`depth = depth.saturating_sub(1)`. This is the one place the two lowerings would *naturally*
diverge — untyped JS silently goes negative and disables all further splitting; Rust's `u32` would
panic on debug-build underflow — and the pair chose matching semantics deliberately.

The clamp is not cosmetic. Measured against the downstream's bare `depth--` (`grammar.ts:76`):

```
")a,b"      parse-that(clamp) [")a","b"]         value.js(bare--) [")a,b"]
"a)b,c,d"   parse-that(clamp) ["a)b","c","d"]    value.js(bare--) ["a)b,c,d"]
"))a,b"     parse-that(clamp) ["))a","b"]        value.js(bare--) ["))a,b"]
```

A single stray `)` — one unescaped paren in a `content` string, one malformed fragment — permanently
disables splitting for the rest of the input in the downstream, and does not in parse-that. On
malformed input, which is exactly the domain W2 §3b's EQ-6 (malformed inverse) governs, **the
published module is the more total of the two**.

**Falsifier**: an input where the clamp produces a *worse* result than bare decrement. The clamp is
strictly more permissive on close-heavy input; it can over-split a genuinely mismatched string
(which is C-9's territory) but never under-splits a well-formed one.

### S-4 — SUPERLATIVE — a byte-parallel cross-language oracle already exists, at the AC-4 idiom

`split.test.ts:14-71` and `split_test.rs:4-72` are an **11-row 1:1 differential corpus** across two
independent lowerings, in the same order with the same inputs and the same expected outputs,
including the degenerate empty-part rows:

| # | TypeScript `it(...)` | Rust `fn ...` |
|---|---|---|
| 1 | `no_delimiter` | `no_delimiter` |
| 2 | `basic_split` | `basic_split` |
| 3 | `nested_parens` | `nested_parens` |
| 4 | `nested_brackets` | `nested_brackets` |
| 5 | `quoted_strings (double quotes)` | `quoted_strings` |
| 6 | `quoted_strings (single quotes)` | `single_quoted_strings` |
| 7 | `deep_nesting` | `deep_nesting` |
| 8 | `empty_segments` | `empty_segments` |
| 9 | `single_char_delimiter` | `single_char` |
| 10 | `empty_input` | `empty_input` |
| 11 | `mixed_nesting_and_quotes` | `mixed_nesting_and_quotes` |

(Three row *names* differ in spelling — rows 5, 6, 9 — while inputs and expectations are identical;
the parity is in the corpus, not in the labels.)

W2 §3c's **AC-4 SIBLINGS-ORACLE** is precisely this idiom — *"two hand-written implementations …
the algebra is normative as specification + table + differential oracle rather than as a shared
executable artifact"* — and its credibility argument (*"the band already measured two independent
grammars agreeing on 30,000 seeded fuzz inputs"*) has a working miniature here. It is the only
module in the tree where the JS and Rust lowerings are pinned to a shared expectation set.

Its coverage is the happy path only (C-13), and its two lowerings do not share a domain (C-14) — so
it is a *proof of the idiom*, not a proof of equivalence. But the idiom is proven, and cheaply.

**Falsifier**: a row present in one file and absent or differently-expected in the other. Checked all
11 pairs by name and value — none.

### S-5 — SUPERLATIVE — the fast path is real, measured, and mirrored in both lowerings

`split.ts:19-20` and `split.rs:43-45` implement the identical short-circuit, with the identical
comment. Measured effect on the case it targets:

```
DELIM ABSENT   17.5 ns/call        DELIM PRESENT  211.8 ns/call     →  ~12× short-circuit
```

The optimization is genuine and its parity across lowerings is deliberate. Only the *advice to
duplicate it at the call site* is wrong (C-8) — the mechanism itself is correct and well-placed.

**Falsifier**: a measurement showing the guard costs more than the scan it skips. It does not:
17.5 ns vs 211.8 ns on the same input class, same rig, same run.

## 5. Contradictions and extensions against the hitherto corpus

| corpus item | this challenge |
|---|---|
| **O-15 / PT-07** (5/5 non-string throw raw `TypeError`; `.parse()` failure indistinguishable) | **EXTENDED, and contradicted in one row.** The class reproduces at `split.ts:11` — but the count is **4/5, not 5/5**: `[]` does *not* throw, it returns `[[]]`, a `string[]`-typed value containing an `Array` (C-4). The array-like arm is a silent type violation the parser-tier probe could not surface, because `parseState` has no analogous duck-typed input. |
| **O-15 / PT-03** (`PACKRAT_ARMED` one-way latch, 1.47×) | **INVERTED here.** `split.ts` is the package's clean O-8 counter-example — zero module-global state, zero imports (S-2). Nothing in this module can arm anything; no bench in this challenge touched the latch. |
| **O-15 / PT-01, PT-04** (label/diagnostics coupling; `Parser.lazy` depth 7,761) | **NOT APPLICABLE** — no diagnostics path, no recursion. That inapplicability is itself C-11: the module has no diagnostic channel at all, which W2 §3b EQ-4 grades as *fails*. |
| **`parsethat-surface-gaps.mjs` RED-7** | Only the `GUARD` rows (`:47-52`) reach this module; DEBT-1/2/3 (`:19-33`) do not. Recorded rather than re-derived. |
| **`registry/adjudicated/parser-band.md` §"WHAT CAND-O OWES CAND-F" debt 4** (the JS-boundary non-string guard, on which *both* candidates converged independently) | **DIRECTLY BINDING.** Both band candidates independently grew a non-string guard; the shipped `split.ts` has none (C-4). The debt is stated for the grammar tier; this module shows the same hole one tier down. |
| **W1 §10 / OP-3** (the three instruments gate W2) | Respected — nothing here extends, edits, or anticipates `harness/**`. All measurement was throwaway in-memory evaluation. |
| **W2 §2 bench bar OWNER-GATED, OP-4** | Respected — the two ratios in C-8 and S-5 are **reported, not graded**. No bar is asserted, invented, or implied. |
| **W2 §3 "Not in scope"** (*"adding `@mkbabb/parse-that` to `package.json`"*) | **CORROBORATED by measurement** (§2b): absent from manifest and `node_modules`. The zero-consumer finding C-1 is therefore not a bug to fix by adoption — it is the ruled state, which is exactly why the surface should retire rather than grow consumers. |
| **`README.md:95-99`** (documents `span.ts` and `parsers/ — CSS`) | **CONTRADICTED BY THE TREE**: both were excised (`core.ts:9-12`; `proof:no-css-surface`). Cited only to establish that the README table containing this module's row (`:96`) is stale and cannot corroborate C-7 or C-14. |

## 6. X·P dual-target verdict — keep / wrap / retire

Read against W2 §3b (the algebra's laws) and §3c (the candidate field):

**RETIRE — the published surface.** Both exports fail parse-that's own dead-code precept verbatim
(C-1), on two entry points, with no gate holding them (C-6), justified by a consumer that does not
exist (C-7). Under W2's `.i` graduation step, nothing at `typescript/src/css/**` would import them:
the survivor's terminals come from the algebra's operator set, not from a String helper. Retirement
is `proof:no-dead-combinator`'s existing mechanism — add two rows to its `banned` array (`:31-34`)
and its cross-tree sweep already proves the zero-consumer precondition.

**KEEP — the conservation contract, promoted to a law.** S-1's `join(delim) === text` is COMP-1 at
split granularity, and it is the property W2 §3b says the algebra must not lose. It should be
lifted out of this module and written into `ALGEBRA.md` as an obligation on the `span-into-C`
capability family — with the downstream's trim/empty-drop policy expressed as a *derived view over
`(V, C)`*, never as a lossy primitive. Concretely: the trimmed-and-compacted list value.js's 22 call
sites want is `V`; the whitespace and empty items `splitTopLevel` currently discards are `C`. Today
neither implementation can produce both.

**WRAP — the semantics, at the boundary, with the domain narrowed.** The `()[]`+quotes scan is a
legitimate *token-class scan* / *span-into-`C`* operator in W2 §3b's capability list. What must not
survive contact with the algebra:

1. the `delim: string` domain — narrow to one character (C-2, C-12), which also closes the TS/Rust
   domain gap (C-14) and makes S-1's conservation law non-vacuous;
2. the missing escape state (C-3) — CSS Syntax §4.3.7 is not optional for a Value-CSS terminal;
3. the shared bracket counter (C-9) and the absent `{}`/comment classes (C-10) — the closed operator
   set must enumerate its bracket families, not fold them;
4. the absent failure channel (C-11) — an unterminated quote must append to `D`, per R-LAW-3 and
   EQ-4, not vanish into a one-element array;
5. the missing boundary invariant (C-4) — per W2 §3.3, non-string input dies **above** the algebra
   at a named invariant, never at a built-in's `TypeError` and never silently as `[[]]`.

**Standing recommendation to the W2 `.g` seat (harness extension)**: use this module as the
**cheapest live specimen of the AC-1 signature-leak failure mode** (C-14). It is 58 lines, has a
complete Rust sibling, an 11-row parallel oracle (S-4), and an already-divergent domain — a
dual-target equality probe can be pointed at it in minutes, and it will fail EQ-1 on
`("a::b", "::")` before any candidate writes a line. That is a gate that can fail for its intended
reason (L-19) at essentially zero cost. **Report only** — nothing here authorizes execution, opens a
root, or moves a verb; X·P execution remains blocked on the owner's begin-word (OP-1).

## 7. Reproduction

Every dynamic result above came from `node --input-type=module` reading source via `fs` and
evaluating it in memory — no file written into either repo, no build run, no latch armed.
`node v26.0.0`, `darwin arm64`, 2026-08-04, N=1 one machine (O-15's stated honesty bound, adopted
here). The two timing tables are **reported, not graded** (OP-4).

Static provenance is cited inline as `file:line` against:
`parse-that/typescript/src/parse/{split,index,core,utils-entry,diagnostics}.ts` ·
`parse-that/typescript/{package.json,test/split.test.ts,test/manifest-gate.mjs,test/subpath-gate.mjs,scripts/proof-no-css-surface.mjs,scripts/proof-no-dead-combinator.mjs}` ·
`parse-that/typescript/dist/{split.d.ts,index.d.ts,core.js,parse.js}` ·
`parse-that/{README.md,rust/parse_that/src/split.rs,rust/parse_that/tests/split_test.rs}` ·
`value.js/src/css/{index.ts,grammar.ts,stylesheet.ts,timeline.ts}` ·
`value.js/package.json` ·
`value.js/docs/tranches/X/parse-that/waves/W2.md` ·
`value.js/docs/tranches/V/megatranche/registry/adjudicated/parser-band.md` ·
`value.js/docs/tranches/V/megatranche/prototypes/css-parser/parsethat-surface-gaps.mjs` ·
`value.js/docs/tranches/V/coordination/INBOX.md:77` (O-15).
