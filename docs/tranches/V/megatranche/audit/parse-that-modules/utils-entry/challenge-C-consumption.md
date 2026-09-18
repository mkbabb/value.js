claude-opus-5[1m]

# CHALLENGE — `utils-entry` · axis C (CONSUMPTION)

**Subject**: `/Users/mkbabb/Programming/parse-that/typescript/src/parse/utils-entry.ts` (14 lines) — the
`@mkbabb/parse-that/utils` subpath entry.
**Posture**: the module is presumed DEFECTIVE until the tree proves otherwise. Every claim below carries a
severity, a `file:line` provenance, and the falsifier that would kill it. Superlatives carry the same burden
(L-18 runs both ways).
**Verdict**: **14 defects — 3 BLOCKER, 7 MAJOR, 2 MINOR, 2 INFO — plus 4 superlatives and 4 explicit
contradictions of the hitherto corpus.** The entry *file* is close to flawless (S-1); the *subpath it names*
is the defective object, and on the consumption axis it is the weakest of parse-that's four subpaths.

---

## 0. Substrate receipt (M-24 / W2 §3e — a number compared across substrates is void)

| field | value |
|---|---|
| evidence root | `/Users/mkbabb/Programming/parse-that` — **READ-ONLY**, no write performed |
| evidence HEAD | `ef10d5b` (`master`), `typescript/package.json` version **1.0.0** |
| dist provenance | `typescript/dist/**` is **gitignored** (`.gitignore:6` → `dist/`; `git check-ignore -v typescript/dist/utils.js` confirms). Untracked working-tree build, mtimes **2026-07-29 14:20**. **Provenance is therefore unverifiable by commit.** Consistency check performed: `dist/utils.js`'s 7-export tail and `dist/parsers/utils.d.ts` match `master`'s sources name-for-name, so the artifacts I cite are consistent with the source I read. |
| O-15 chunk match | `diagnostics-DDazRHgl.js` — hash **identical** to the chunk O-15 cites, so the diagnostics chunk is the O-15-measured artifact. `packrat-entry-CS1td-8B.js` is not hash-pinned in O-15 (cited as `packrat-entry-*.js`). |
| OP-7 caveat | the dist mtime (2026-07-29) coincides with the three `codex/css-totality-combinators-20260729` commits W2.md:121 names as modifying `typescript/src/parse/**`. HEAD is `master`, so the **source** I read is master; the **dist** may not be. Every dist-only claim below is marked `[dist]` and every one has a source-side twin. |
| consumer root | `/Users/mkbabb/Programming/value.js` @ `95cfbb15` (`tranche-u`), version **4.0.0** |
| node | `v26.0.0` |
| law compliance | `/Users/mkbabb/Programming/parse-that-css-totality-p2` **does not exist** (re-verified: `No such file or directory`) — **no STOP finding**. No worktree, frozen root, or `~/Documents/Codex` path entered. No bench run; **packrat never armed, diagnostics never enabled** (the probes below call `.parse()` only — `memoize()` and `enableDiagnostics()` were never invoked; the one-way latch at `packrat-entry-CS1td-8B.js:678` is still `false`). Single write = this file. |

**Re-derived, not inherited** — the `/css` totality universe: `src/css/index.ts:2-34` = **33 type exports**,
`:36-60` = **19 runtime exports** (7 grammar · 1 syntax · 3 timeline · 8 stylesheet) = **52**. Matches
W2.md:147-150 (`19 runtime :36-60 + 33 types :1-35`). The count is confirmed independently; I do not re-derive
it again anywhere below (epoch rule).

---

## 1. The module, whole

```ts
// utils-entry.ts, verbatim, 14 lines
export { skipWhitespace, skipBlockComments } from "./utils.js";        // :6
export { jsonParser } from "./parsers/json.js";                        // :7
export type { JsonValue } from "./parsers/json.js";                    // :8
export { csvParser } from "./parsers/csv.js";                          // :9
export { escapedString, quotedString, numberParser } from "./parsers/utils.js"; // :10-14
```

Every file it imports, read whole: `src/parse/utils.ts` (186) · `src/parse/parsers/json.ts` (52) ·
`src/parse/parsers/csv.ts` (20) · `src/parse/parsers/utils.ts` (23) · plus the transitive
`src/parse/index.ts` (14, imported by all three `parsers/*`) and the three sibling entries
(`core.ts` · `diagnostics.ts` · `packrat-entry.ts`) for surface comparison.

**7 runtime exports + 1 type.** Header claim (`:3-5`): *"Whitespace/comment skip primitives plus the json/csv
domain-parser showcases and the string utility parsers. The utility tier a consumer reaches for when it wants
the batteries-included helpers, not just the bare combinator core."*

---

## 2. Defects

### C-1 — MAJOR — the subpath adds **zero** surface: all 7 exports are already on the root `.` entry

`utils-entry.ts:6-14` exports 7 names. `src/parse/index.ts:5` already exports `skipWhitespace,
skipBlockComments`; `index.ts:14` (`export * from "./parsers/index.js"`) re-exports the other five via
`parsers/index.ts:5-8`. Measured against `[dist]`:

```
/utils runtime exports: 7  csvParser,escapedString,jsonParser,numberParser,quotedString,skipBlockComments,skipWhitespace
root "." export count : 34
set difference (/utils \ root): (none — 100% duplicate)
```

Contrast the sibling tiers, which each carry surface the root does **not** duplicate in shape: `/core`
(`core.ts:7-27`, 18 exports) is the only *narrowing* entry; `/diagnostics` (`diagnostics.ts:6-14`) is the only
place `Diagnostic`/`Suggestion` are grouped as a tier; `/packrat` (`packrat-entry.ts:5`) is the only opt-in
arming door. `/utils` narrows nothing a consumer could not get by importing 7 names from `.` — while adding a
permanent 1.0.0 `exports`-map commitment (`package.json:28-32`) whose removal costs a MAJOR bump.

*Falsifier*: any name exported from `@mkbabb/parse-that/utils` that is not exported from `@mkbabb/parse-that`.
*Not claimed*: an aliasing hazard. ESM identity holds (`root.jsonParser === utils.jsonParser` → `true`;
`root.skipWhitespace === utils.skipWhitespace` → `true`) because `dist/parse.js:4` re-exports from
`./utils.js`. CJS identity holds within CJS. Only ESM↔CJS differ (C-14).

---

### C-2 — **BLOCKER** — `escapedString`/`quotedString` silently **corrupt** every escape they parse

`parsers/utils.ts:7-12`:

```ts
export function escapedString() {
    return string("\\").then(
        regex(/[bfnrt"'\\/]/)
            .or(string("u").skip(regex(/[0-9a-fA-F]{4}/)))
    ).map(([, esc]) => esc);
}
```

The `\uXXXX` arm is `string("u").skip(regex(...))` — `skip` (`parser.ts:189-207`) keeps the **left** value, so
the arm yields the literal `"u"` and throws the four hex digits away. The named-escape arm yields the raw
escape *character*, never the character it denotes. Measured `[dist]`, `dist/utils.js` (the shipped `/utils`
entry):

| call | returns | should return |
|---|---|---|
| `escapedString().parse("\\u0041")` | `"u"` | `"A"` |
| `escapedString().parse("\\n")` | `"n"` | `"\n"` |
| `quotedString().parse('"a\\nb"')` | `"anb"` | `"a\nb"` |
| `quotedString().parse('"a\\u0041b"')` | `"aub"` | `"aAb"` |

`quotedString` (`parsers/utils.ts:15-18`) consumes `escapedString()` and `.join("")`s the parts, so the
corruption reaches the top-level public export with **no diagnostic, no `ok:false`, no throw** — a
successful-looking parse returning wrong bytes. This is the worst failure mode a parser can have.

The condemning detail: the **same subpath** ships a correct implementation 40 lines away.
`parsers/json.ts:22-24` decodes via `JSON.parse` and measures `"A"` on the identical input. Two escape
semantics on one 7-export surface, disagreeing, both public, both semver-locked at 1.0.0. A consumer who
reaches for the export *named* `escapedString` gets the broken one; the correct one is only reachable by
parsing a whole JSON document.

*Falsifier*: any input on which `escapedString().parse(s)` equals the escape's decoded value. Four inputs
tried, four wrong. *Scope note*: this is a correctness fact, cited here because it is a **consumption**
fact — it is what the subpath hands its consumers.

---

### C-3 — MAJOR — `quotedString(quote)`'s parameter is spliced raw into a character class; the declared type is a lie

`parsers/utils.ts:16`:

```ts
const inner = regex(new RegExp(`[^${quote}\\\\]+`)).or(escapedString());
```

`quote: string = '"'` (`:15`) is interpolated into a regex character class unescaped. For any
metacharacter-bearing quote the grammar silently becomes a different grammar. `dist/parsers/utils.d.ts:5`
declares `quotedString(quote?: string): Parser<string>` — the parameter's type says every string is valid.
Measured `[dist]`:

| call | runtime type | declared type |
|---|---|---|
| `quotedString("]").parse("]ab]")` | `object` / **Array** (`[]`) | `string` |
| `quotedString("^").parse("^ab^")` | `string` (`"ab"`) — accidental pass | `string` |

`quotedString("]")` builds `/[^]\\]+/`, in which `[^]` is *any character including newline* — the class is
gone, the grammar is unrecognisable, and the returned value is not a `string` at all, contradicting
`Parser<string>` at runtime. A `Parser<string>` that yields an array is a type-lie a consumer cannot defend
against by reading the `.d.ts`. Secondary: the `RegExp` is recompiled on **every call** (`:16`), so a consumer
who calls `quotedString()` per parse pays a regex compile per parse.

*Falsifier*: `typeof quotedString("]").parse("]ab]") === "string"`, or a documented constraint on `quote`
anywhere in `parsers/utils.ts`, `utils-entry.ts`, or the `.d.ts`. There is none.

---

### C-4 — **BLOCKER** — `csvParser` does not implement its own docstring, and truncates silently

`parsers/csv.ts:19-20`: *"Combinator CSV parser — returns array of rows, each an array of string fields."*
Measured `[dist]`:

| input | returns | docstring promises |
|---|---|---|
| `"a,b\nc,d"` | `[["a","b\nc","d"]]` | `[["a","b"],["c","d"]]` |
| `"a,,b"` | `[["a"]]` | `[["a","","b"]]` |
| `""` | `[]` | `[]` (ok) |

Row 1: `regex(/[^,]+/)` (`csv.ts:14`) matches across `\n`, and `.trim()` (`:7`, `:17`) eats the newline, so a
two-row file collapses into one row with a field containing a literal newline. **The parser has no concept of
a row.** Row 2: an empty field kills `sepBy` mid-line and `.many()` (`:20`) stops, discarding `,b` with no
error — silent data loss on the single most common CSV edge case. Both are shipped on a versioned public
subpath.

*Falsifier*: any two-line input for which `csvParser.parse` returns two rows. None exists — `token`
(`csv.ts:11-15`) contains no line terminator.

---

### C-5 — **BLOCKER** — the tier promise is false at the bundle level: `/utils` drags **both** the diagnostics chunk and the packrat latch chunk

The subpath's headline (`utils-entry.ts:3`) is *"whitespace/comment skip primitives"*. `[dist]`
`dist/utils.js:1-2`:

```js
import { s, b } from "./diagnostics-DDazRHgl.js";
import { f as dispatch, n as string, r as regex, P as Parser, c as any } from "./packrat-entry-CS1td-8B.js";
```

Both imports are **static and unconditional**. `skipWhitespace`/`skipBlockComments` are `b`/`s` — they live in
the **diagnostics chunk**, because `src/parse/utils.ts` fuses the diagnostics accumulator (`:6-148`) and the
byte scanners (`:150-186`) into one source module. Measured graph cost for a consumer who wants two 6-line
loops:

| format | files loaded | bytes |
|---|---|---|
| ESM `/utils` | `utils.js` 2,039 + `diagnostics-DDazRHgl.js` 3,516 + `packrat-entry-CS1td-8B.js` 40,576 | **46,131** |
| CJS `/utils` | `utils.cjs` 2,465 + `diagnostics-DpUY87_d.cjs` 3,787 + `packrat-entry-46NYx4_U.cjs` 41,041 | **47,293** (no tree-shaking — `utils.cjs:3-4` are `require()`s that evaluate whole modules) |

The actual source of the two scanners is `utils.ts:159-186` — **28 lines, ~700 bytes**. The consumer pays
~66× that in ESM and cannot avoid it in CJS.

What rides along is exactly what the corpus flagged. `packrat-entry-CS1td-8B.js:678` `let PACKRAT_ARMED =
false;`, read at `:682` and `:714`, set `true` at `:722` inside `makeMemoized`, **never reset** — O-15 PT-03's
line cites reproduce **exactly** on this substrate. `packrat-entry-CS1td-8B.js:881-883`:

```js
if (isDiagnosticsEnabled()) {
  console.error(this.state.toString());
}
```

— O-15 PT-01's coupling, at `:882` (see X-1 for the cite correction).

The comparison that makes this a defect rather than a fact of life: `core.ts:3-5` states outright *"A consumer
that imports only this never pulls the diagnostics accumulator, the packrat tier, or the json/csv domain
parsers."* `/core` is the tier that keeps its promise on **content** while still importing the same chunk
(`dist/core.js:1`), because the chunker put everything in one file — but `/utils` cannot even make the
content-level promise: it *is* the json/csv tier **and** the diagnostics chunk **and** the packrat chunk in
one door. There is no consumer for whom `/utils` is a narrower import than `.` (`dist/parse.js` = the same
three chunks). **The subpath has no tier.**

*Falsifier*: a resolved import graph for `@mkbabb/parse-that/utils` that omits `packrat-entry-*` or
`diagnostics-*`. Verified absent in both formats.

---

### C-6 — MAJOR — `dist/` declaration/runtime name collision: `dist/utils.js` and `dist/utils.d.ts` describe **different modules**

`vite.config.ts:14-20` names the `/utils` **entry chunk** `utils`, emitting `dist/utils.js`. But
`vite-plugin-dts` (`vite.config.ts:25`, `include: ["src/"]`) also emits a declaration for the **source module**
`src/parse/utils.ts` at the same basename: `dist/utils.d.ts`. They disagree:

| artifact | describes | exports |
|---|---|---|
| `dist/utils.js` | the `/utils` entry bundle | **7** — `csvParser`, `escapedString`, `jsonParser`, `numberParser`, `quotedString`, `skipBlockComments`, `skipWhitespace` |
| `dist/utils.d.ts` | `src/parse/utils.ts` | **17** — `enableDiagnostics`, `disableDiagnostics`, `isDiagnosticsEnabled`, `mergeErrorState`, `addSuggestion`, `addSecondarySpan`, `reportUnclosedDelimiter`, `Diagnostic`, `collectDiagnostic`, `resetErrorState`, `getCollectedDiagnostics`, `clearCollectedDiagnostics`, `popLastDiagnostic`, `skipWhitespace`, `skipBlockComments`, `Suggestion`, `SecondarySpan` |

Only the hand-steer at `package.json:29` (`"types": "./dist/utils-entry.d.ts"`) keeps them apart, and only for
resolvers that honour the `exports` map's `types` condition. Any tool that falls back to the universal
`.js`→`.d.ts` adjacency rule — a bundler inferring types, an older `moduleResolution`, a consumer who deep-imports
`dist/utils.js`, a `.d.ts` emitted by a downstream `tsc` that records the resolved file path — gets the **wrong
17-export surface**, including `enableDiagnostics` and `popLastDiagnostic` which are not on this subpath at all.
Handing a consumer a declaration that advertises the diagnostics arming door on the *utility* subpath is the
inverse of tier isolation. (`/packrat` has the identical collision — `dist/packrat.js` 3 exports vs
`dist/packrat.d.ts` describing `src/parse/packrat.ts` — so this is a class defect, not a one-off. `/utils` is
the instance in scope.)

*Falsifier*: `dist/utils.d.ts` exporting exactly the 7 names `dist/utils.js` exports.

---

### C-7 — MAJOR — the subpath is not self-sufficient: it cannot type its own headline export's argument

`utils.ts:159` — `export function skipWhitespace(state: ParserState<unknown>): void`. A consumer of
`@mkbabb/parse-that/utils` who writes any wrapper, adapter, or typed call site needs the name `ParserState`.
`utils-entry.ts` exports it nowhere; measured `[dist]`: `"ParserState" in utils === false`. The only type the
subpath exports is `JsonValue` (`:8`) — the type of the export a CSS grammar will never touch.

So the consumer must *additionally* import from `.` or `/core` — which (per C-5) resolves the same chunk
graph, and (per C-1) already carries all 7 `/utils` names. The tier split collapses for **exactly the export
that motivates the tier**. `/core` by contrast is closed: `dist/core.d.ts:2-3` exports `ParserState`,
`ParserContext`, `Span` alongside its functions.

*Falsifier*: any type-only path from `@mkbabb/parse-that/utils` alone to a nameable `ParserState`.

---

### C-8 — MAJOR — the `/utils` **type** graph imports the root barrel

`[dist]` `dist/parsers/utils.d.ts:1` — `import { Parser } from '../index.js';` — i.e. the `/utils` declaration
chain reaches `dist/index.d.ts`, the target of `exports["."].types` (`package.json:9`). Source-side twin:
`parsers/utils.ts:4`, `parsers/json.ts:5`, `parsers/csv.ts:5` all import from `"../index.js"` — the barrel —
rather than from the leaf modules (`parser.js`, `leaf.js`). Compare `dist/core.d.ts:1-6`, which imports
exclusively from leaves (`./parser.js`, `./state.js`, `./lazy.js`, `./leaf.js`, `./split.js`).

Consequence for a consumer: `/utils` gives tier isolation in **neither** dimension — not at runtime (C-5) and
not in the type graph. A TypeScript consumer importing only `/utils` still has the entire root barrel's
declaration surface in its program.

*Falsifier*: `parsers/utils.ts` importing `Parser` from `"../parser.js"` instead of `"../index.js"`.

---

### C-9 — MAJOR — the gate that names `/utils` never loads it; `proof:subpath` cannot fail on this subpath

`test/subpath-gate.mjs:25-36` iterates `["./core","./diagnostics","./packrat","./utils"]` and checks only that
each `types`/`import`/`require` path **exists on disk**. `:39-55` then imports and asserts *surface* for
`./core` (`Parser`, `dispatch`) and `./packrat` (`memoize`) — and stops. `./utils` and `./diagnostics` are
never imported, never asserted. The gate then prints (`:57-60`):

> `proof:subpath GREEN — 4 subpaths resolve; ./core{Parser,dispatch} + ./packrat{memoize} are live functions.`

"4 subpaths resolve" overstates what was measured: two were resolved and loaded, two were `existsSync`'d.
`utils-entry.ts` could be emptied to `export {}` and `proof:subpath` would still print GREEN — the entry whose
whole job is to *be* a surface has no surface gate. This matters more than for `/diagnostics`, because
`/diagnostics` is a strict subset of a module the root gate exercises, whereas `/utils` is the only door to
`escapedString`/`quotedString`/`csvParser` — the three exports carrying C-2/C-3/C-4.

*Falsifier*: delete every export line from `utils-entry.ts`, rebuild, run `node test/subpath-gate.mjs` — if it
goes RED the claim dies. Nothing in `:25-60` can make it do so.

---

### C-10 — MAJOR — the module's stated raison d'être is falsified by the downstream tree: **zero consumers, anywhere**

`utils.ts:150-156` (the comment governing the two exports at `utils-entry.ts:6`):

> *"These are the primitives a hand-rolled grammar (**value.js's canonical CSS grammar**) drives its hot paths
> with, distinct from the `whitespace` Parser combinator."*

Measured against the sole downstream of the PLAW-BIND routing law (W2.md:133 — parser → value → packed
release):

1. **value.js does not depend on parse-that.** `@mkbabb/parse-that` is absent from
   `/Users/mkbabb/Programming/value.js/package.json`; `node_modules/@mkbabb/` contains only `glass-ui`,
   `keyframes.js`, `value.js`; `import("@mkbabb/parse-that")` from the workspace → **`ERR_MODULE_NOT_FOUND`**.
   W2.md:193-194 confirms this is *intended*: adding it to `package.json` is explicitly **"Not in scope"**.
2. **value.js's grammar uses neither scanner and would not want them.** `src/css/grammar.ts` (483 lines) skips
   whitespace with `/\s/.test(char)` and `String.prototype.trim()` (`:77-84`, `:115`) — a regex/string idiom,
   not a `charCode <= 32` byte loop, and it holds no `ParserState` to mutate.
3. **value.js *reimplemented* `skipBlockComments` rather than importing it.** `src/css/stylesheet.ts:437-439`
   hand-rolls `source.startsWith("/*", cursor)` + `indexOf` — the same memchr-close technique `utils.ts:177-181`
   ships. Independent reinvention by the named consumer is the strongest available evidence that the export was
   never reachable.
4. **Zero consumers inside parse-that either.** `grep -rn "skipWhitespace\|skipBlockComments" src/ test/
   bench/ scripts/` returns only the two definitions (`utils.ts:159`, `:168`) and the two re-exports
   (`index.ts:5`, `utils-entry.ts:6`). No test, no bench, no internal call site.

So the subpath's headline exports have **no consumer in any repository of the constellation**, and the
comment naming their consumer is false as written.

*Falsifier*: one `import` of `skipWhitespace` or `skipBlockComments` in value.js, keyframes.js, or parse-that's
own `src/`/`test/`/`bench/`/`scripts/`. Searched; none.

---

### C-11 — MINOR — two incompatible API shapes inside a 7-export surface, with no stated rule

`jsonParser` (`json.ts:52`) and `csvParser` (`csv.ts:20`) are **module-eval singletons** — the Parser graph is
built once at import. `escapedString`/`quotedString`/`numberParser` (`parsers/utils.ts:7`, `:15`, `:21`) are
**per-call factories** that rebuild the entire graph (and, for `quotedString`, recompile a `RegExp`) on every
invocation. Nothing in `utils-entry.ts:6-14`, `parsers/index.ts:5-8`, or the `.d.ts` tells a consumer which is
which; the only signal is the `()`. A consumer who caches `jsonParser` correctly and calls `numberParser()`
per parse is paying an unadvertised allocation per parse; a consumer who hoists `numberParser()` correctly is
relying on undocumented behaviour.

*Falsifier*: a documented singleton-vs-factory convention anywhere on the surface. There is none.

---

### C-12 — MINOR — demo code is semver-locked, in direct contradiction of the package's own dead-export precept

`parsers/index.ts:1-4` calls json/csv *"domain-parser **showcases**… the terse, spec-grade combinator
**examples**"*; `utils-entry.ts:3-5` calls the same five *"batteries-included helpers"*. Whichever they are,
they sit behind a published `exports` subpath at **1.0.0** (`package.json:28-32`), so removing any of them is a
MAJOR bump.

Meanwhile `scripts/proof-no-dead-combinator.mjs:1-24` codifies the opposite precept and enforces it on
*combinators*:

> *"A never-importable export is not part of the public contract; an export born one prior tranche with **zero
> workspace consumers** is dead by the precept."*

Under that precept `skipWhitespace`/`skipBlockComments` (C-10: zero workspace consumers) and the five showcases
(zero non-test consumers; only `test/json-vectors.test.ts:8` touches `jsonParser`, via a deep source path, not
via the subpath) are all dead. The gate does not look at entry surface, so the package enforces its precept on
`thenMap`/`fuse` and exempts an entire subpath from it. The asymmetry is the defect, not the exports.

*Falsifier*: a gate that reds on a zero-consumer **entry** export. `proof:all` (`package.json:49`) runs ten
proofs; none does.

---

### C-13 — INFO — `numberParser` yields `Infinity` with no diagnostic

Measured `[dist]`: `numberParser().parse("1e400")` → `Infinity` (`typeof "number"`). `parsers/utils.ts:22` maps
a matched numeral through bare `Number`. This is the exact non-finite posture the band carries as a **preserved
DISSENT** (`registry/adjudicated/parser-band.md:138` DISSENT; W2.md:301 — *"non-finite numeral posture
(`color_non_finite` on unclamped non-finite per the band; dissent preserved)"*). Recorded, not condemned: on
its own terms `numberParser` promises only "a number". It becomes a defect the moment any algebra production
binds to it, because the algebra's `D` journal (W2.md:239) requires a `ParseIssue` value where this export
emits silence.

*Falsifier*: a stated non-finite contract on `numberParser`. There is none in source or `.d.ts`.

---

### C-14 — INFO — dual-package identity split, and a latent K-6 surface

Measured: ESM↔CJS identity **fails** (`utils.cjs`'s `jsonParser !== utils.js`'s `jsonParser`), while
within-format identity holds. This is the ordinary dual-package hazard and applies package-wide, not only to
`/utils` — recorded because `jsonParser`/`csvParser` are **module-eval singletons** (C-11) whose internal state
is therefore per-format. A candidate that memoizes either singleton (`memoize`, `packrat-entry.ts:5`) arms the
process-global latch at `packrat-entry-CS1td-8B.js:722` for one format's instance only, making parse *N*
distinguishable from parse *1* in one half of a mixed graph — W2.md's **K-6** kill class (`:474`).

*Not measured*: I did not arm packrat (law). The claim is a construction argument from the singleton shape plus
the latch's read sites (`:682`, `:714`), not a measurement. *Falsifier*: a `resetPackrat()` (`:713-720`) that
sets `PACKRAT_ARMED = false` — it does not; O-15 PT-03's "clears the memo store, does not disarm" reproduces
in the source.

---

## 3. Contradictions of the hitherto corpus (stated explicitly, per law)

**X-1 — O-15 PT-01's line cite is half wrong; the substance survives.** INBOX O-15 states the arming coupling
sits at *"`dist/diagnostics-DDazRHgl.js:14` + `dist/packrat-entry-*.js:881`"*. Measured on the
**hash-identical** chunk: `grep -n "console" dist/diagnostics-DDazRHgl.js` → **no match, exit 1** (125 lines);
line 14 is `state.expected = diagnosticsEnabled && label ? [label] : void 0;`. There is **no `console` call
anywhere in the diagnostics chunk.** The coupling is entirely in the packrat chunk, at
`packrat-entry-CS1td-8B.js:881-883` (`if (isDiagnosticsEnabled()) { console.error(...) }`) — O-15's second cite,
right to ±1 line. Since the chunk hash matches O-15's own, this is a **transcription error, not substrate
drift**. PT-01's claim ("`label` is a no-op unless diagnostics are armed, and arming couples a `console.error`")
is **CONFIRMED**; its first cite should read `packrat-entry-CS1td-8B.js:882`. PT-03's four cites
(`:678`/`:682`/`:714`/`:722`) reproduce **exactly**.

**X-2 — `parsethat-surface-gaps.mjs`'s latch row is vacuous.** `:48`:
`row(!ARM ? false : false, "LATCH   PACKRAT_ARMED is a module-global one-way flag", …)`. The predicate is the
constant `false` in both branches, so this row can **never** increment `red`. The RED-7 count therefore does
not include the finding the row is named for; the latch is only ever counted via the `--arm` row at `:47`,
which the shipping-default (unarmed) run never reaches. *Falsifier*: any argv under which `:48`'s first
argument evaluates truthy.

**X-3 — the RED-7 probe is currently unrunnable in this workspace.** `parsethat-surface-gaps.mjs:1-11`
instructs *"Run from this workspace (it resolves the workspace's node_modules)"*, but
`@mkbabb/parse-that` is not installed here (`ERR_MODULE_NOT_FOUND`, §0). Its imports at `:11-13` would throw
before the first row. *Falsifier*: a successful `node docs/tranches/V/megatranche/prototypes/css-parser/parsethat-surface-gaps.mjs`
from `/Users/mkbabb/Programming/value.js`.

**X-4 — no RED-7 row touches this module, and none can.** The probe imports from `@mkbabb/parse-that` (root,
`:11-12`) and `@mkbabb/parse-that/diagnostics` (`:13`). It imports **nothing** from `@mkbabb/parse-that/utils`.
Mapping its rows to the module: DEBT-1 (`:22-26`) → `Parser`/`mergeErrorState`/`enableDiagnostics`, root +
`/diagnostics`; DEBT-3 (`:29-37`) → `Parser.lazy`, root; DEBT-2/LATCH (`:39-48`) → `memoize`/`resetPackrat`,
root; GUARD (`:56-57`) → `parseState`/`parse`, root. **Zero rows on `/utils`.** So the corpus's only surface
instrument has never measured this subpath — which is why C-2, C-3, C-4, C-6, C-7, C-8 and C-9 are new here.
The RED-7 rows *do* touch this module transitively through C-5 (the `/utils` graph statically loads the very
chunks DEBT-1/DEBT-2/LATCH indict), but that is an inference from the import graph, not a row. *Falsifier*: an
import of `@mkbabb/parse-that/utils` anywhere in `parsethat-surface-gaps.mjs`.

---

## 4. The X·P dual-target algebra: KEEP / WRAP / RETIRE

Read against `docs/tranches/X/parse-that/waves/W2.md` §2c, §3, §3b, §3c, §3e — **specification only; nothing
here authorizes execution, and X·P execution awaits the owner's begin-word (W2.md:115, OP-1).**

| export | verdict | binding citation |
|---|---|---|
| `skipWhitespace` | **WRAP** | W2.md:188-191 (§3.12) — scan primitives stay parse-that-owned combinator citizens in `<p2>/typescript/src/**`, branch-isolated, *never* a CSS-side lexer pass. This export is that seat's raw material. |
| `skipBlockComments` | **WRAP, with a named hazard** | same, plus the CSS-literal objection below. |
| `jsonParser` · `JsonValue` | **RETIRE** | W2.md:146-154 (§3.2) — the closed input universe *is* the 52-export `/css` surface; JSON is not in it. No algebra production, no corpus row. |
| `csvParser` | **RETIRE** | as above, **plus C-4** — an export that cannot produce rows cannot produce a conforming `V`. |
| `escapedString` · `quotedString` | **RETIRE** | as above, **plus C-2/C-3** — they inject a wrong `V`, so **EQ-1** (W2.md:263, bit-for-bit structural equality) fails for any candidate that touches them, in *both* lowerings identically. A defect both lowerings share is invisible to K-1 and lethal to the wave. |
| `numberParser` | **RETIRE** | as above, **plus C-13** — the band's non-finite dissent (W2.md:301) has no expression here, and **debt 4** (W2.md:158-159: `scale(num,den)` written `(value*num)/den`, never a folded factor) has no hook on a bare `Number` map. |

**Why the two scanners are only WRAP, never KEEP.** Three algebra laws bite:

1. **COMP-1 fails by construction** (W2.md:241-245: for every `S`, `weave(V, C, P) === S`, byte for byte).
   `skipWhitespace` (`utils.ts:159-164`) and `skipBlockComments` (`:168-186`) advance `state.offset` and
   **record nothing**. Every byte they skip enters neither `V` nor `C`, so COMP-1 breaks on the first input
   with leading whitespace or a comment — i.e. on nearly every real CSS string. They may enter the algebra
   **only** behind the `span-into-C` operator family (W2.md:250), which is a wrapper, not an adoption. A
   candidate that calls them directly is dead on **EQ-6** (W2.md:268, the malformed inverse).
2. **The CSS literal is in the wrong repository.** `utils.ts:177-181` hard-codes `/` `*` and `indexOf("*/")` —
   CSS block-comment syntax — inside a package that runs `proof:no-css-surface` (`package.json:40`) precisely
   to keep CSS out, and whose own `parsers/index.ts:1-4` records that *"The CSS grammar that once lived here
   moved to value.js (the constellation's one canonical CSS grammar, D2/D3)"*. The comment scanner is the
   residue the D2/D3 move missed. Under **W2.md:188-191** the scan tier stays in parse-that, but as a
   *class-table* citizen; the wrapper must take the comment delimiters as a **parameter**, not a literal.
3. **AC-4's Stage-0 falsifier catches it as written** (W2.md:385): *"any semantic decision in the slice
   demonstrably NOT expressible as a table row consumed by both siblings → killed."* `skipBlockComments`'s
   `47`/`42`/`"*/"` literals are semantic decisions in code, not table rows. AC-4 either parameterises them or
   fails its own admission screen on this module.

**Which candidate has a live claim on this module.** **AC-3 SPAN-ALGEBRA** (W2.md:346-368) is the only one:
its "branchless char-class scanner (typed-array class table; scalar JS loop shaped for auto-vectorization…)"
is a strict generalisation of `skipWhitespace`'s `charCodeAt(i) <= 32` loop, and W2's File Bounds give exactly
one seat write access to `<p2>/typescript/src/**` on branch `w2/ac3-scan-union` (W2.md:524). Two warnings for
that seat, from this module:

- `skipWhitespace`'s `<= 32` predicate is **not** CSS whitespace. CSS Syntax §4.2 whitespace is
  `\n` `\t` ` ` (with `\r`/`\f` preprocessed); `<= 32` additionally swallows `\v`, `\0`, and every C0 control.
  A class **table** (AC-3's own design) makes this a row and a test; the current loop makes it invisible. This
  is precisely AC-3's predicted failure (a) — **token-boundary divergence**, W2.md:355-359 — reachable without
  writing a line of new code.
- `skipBlockComments`'s unterminated-comment posture (`utils.ts:179`, `if (end === -1) break;` → stop at the
  comment's start) **differs** from value.js's (`stylesheet.ts:439` → `failure(source, "css_syntax", ["closing
  comment"])`). Two lowerings inheriting different halves of that disagreement is an **EQ-4** (W2.md:266,
  structural diagnostic equality) failure waiting to be built. It must be a declared row in `ALGEBRA.md`
  before either lowering is written.

**The subpath itself: RETIRE, as an owner-carried recommendation only.** With 2 exports wrapped into the
fresh root's scan tier and 5 retired, `"./utils"` has no residue — and C-1/C-5/C-6/C-7/C-8/C-9 say it never
had a tier to begin with. Two constraints hold the recommendation short of an action: (i) W2.md:196-197
forbids *"any write inside `/Users/mkbabb/Programming/parse-that`"* by any seat, so the retirement is only
executable in the `<p2>` clone; (ii) it is a published `exports`-map removal at 1.0.0 and therefore a **2.0.0**
act. Filed as a recommendation to the owner, not as a wave task.

**One thing this module gets right for the algebra**, stated because L-18 runs both ways: **O-8**
(W2.md:254-258, no operator reads or writes process-global mutable state). `skipWhitespace` and
`skipBlockComments` read and write **only** the `ParserState` passed to them (`utils.ts:159-164`, `:168-186`) —
no module global, no latch, no `diagnosticsEnabled` read. They are the only two exports on this subpath that
satisfy O-8 by construction, and among the very few in the package: `mergeErrorState` (`utils.ts:28-49`),
`addSuggestion` (`:51`), and everything in the packrat tier read process globals. See S-3.

---

## 5. Superlatives (L-18 — earned, with falsifiers)

**S-1 — the entry file is, in itself, close to flawless.** 14 lines, **zero runtime logic**, one line per
origin module. `export type { JsonValue }` (`:8`) is separated from the value export on the line above —
`verbatimModuleSyntax`-correct and erasable without a runtime import. Every specifier carries a `.js`
extension (`:6,7,8,9,14`) — NodeNext/bundler-correct. It re-exports nothing it does not name (no `export *`,
unlike `index.ts:14`), so its surface is auditable by reading it. **Not one of the 14 defects above lives in
this file**; every one lives in what it re-exports, or in how the subpath is packaged, gated, and documented.
That is the correct failure distribution for an entry module. *Falsifier*: a runtime statement, an untyped
type re-export, an extensionless specifier, or a wildcard in `utils-entry.ts:1-14`. None.

**S-2 — `skipBlockComments`'s unterminated-comment posture is the totality-correct one.** `utils.ts:179`:
`const end = src.indexOf("*/", i + 2); if (end === -1) break;` — an unterminated comment stops the scan **at
the comment's start** rather than consuming to EOF. Under W2.md's **K-8** (`:478`, *any* throw on *any*
universe row is a totality breach) and **R-LAW-4** (`:284`, `sync` must consume ≥1 byte or recovery does not
re-enter), that is the shape that keeps a parser total and non-hanging on the single nastiest malformed-CSS
input. value.js's independently-written twin chose to *fail* instead (`stylesheet.ts:439`); both are
defensible, but parse-that's is the one that composes. *Falsifier*: an input on which `skipBlockComments`
advances past an unterminated `/*`. The `break` at `:179` forbids it.

**S-3 — the two scanners are already O-8-clean, which almost nothing else in the package is.** Per §4 above,
`utils.ts:159-186` touches only the passed state. Set against the module they share a file with — the same
`utils.ts` holds `diagnosticsEnabled` (`:6`), `collectedDiagnostics` (`:95`), and five functions that mutate
them — the scanners' purity is a deliberate line held, not an accident. It is the single reason they are WRAP
rather than RETIRE. *Falsifier*: a module-global read or write inside `utils.ts:159-186`. There is none.

**S-4 — someone saw the `dist/utils.d.ts` collision and routed around it.** `package.json:29` points
`"./utils".types` at `dist/utils-entry.d.ts`, **not** at the adjacent `dist/utils.d.ts` that the runtime file's
basename would imply — the same deliberate steer `"./packrat".types → dist/packrat-entry.d.ts`
(`package.json:24`) makes. The workaround is correct for every exports-map-aware resolver, and the two
`*-entry.ts` filenames exist for exactly this reason. C-6 stands only because the collision was worked around
rather than removed — but the hazard was **seen**, and that deserves the record. *Falsifier*: `"./utils".types`
pointing at `./dist/utils.js`'s adjacent declaration. It does not.

---

## 6. Ledger

| id | severity | claim | anchor |
|---|---|---|---|
| C-1 | MAJOR | subpath adds zero surface; 7/7 exports duplicated on root `.` | `utils-entry.ts:6-14` · `index.ts:5,14` |
| C-2 | **BLOCKER** | `escapedString`/`quotedString` silently corrupt every escape | `parsers/utils.ts:7-12,15-18` |
| C-3 | MAJOR | `quote` spliced raw into a regex class; `Parser<string>` returns an array | `parsers/utils.ts:16` · `dist/parsers/utils.d.ts:5` |
| C-4 | **BLOCKER** | `csvParser` has no concept of a row; truncates on empty fields | `parsers/csv.ts:11-20` |
| C-5 | **BLOCKER** | `/utils` statically loads the diagnostics + packrat-latch chunks (46,131 B ESM) | `dist/utils.js:1-2` · `packrat-entry-CS1td-8B.js:678,882` |
| C-6 | MAJOR | `dist/utils.js` (7 exports) collides with `dist/utils.d.ts` (17 exports) | `vite.config.ts:14-25` · `package.json:29` |
| C-7 | MAJOR | subpath cannot type `skipWhitespace`'s argument — no `ParserState` export | `utils.ts:159` · `utils-entry.ts:6-14` |
| C-8 | MAJOR | `/utils` type graph imports the root barrel | `parsers/utils.ts:4` · `dist/parsers/utils.d.ts:1` |
| C-9 | MAJOR | `proof:subpath` never loads `/utils`; false-GREEN + overstated message | `test/subpath-gate.mjs:25-60` |
| C-10 | MAJOR | stated consumer (value.js CSS grammar) does not exist; zero consumers anywhere | `utils.ts:150-156` · `value.js src/css/grammar.ts:77-115` · `stylesheet.ts:437-439` |
| C-11 | MINOR | singleton vs factory shapes mixed with no stated rule | `json.ts:52` · `csv.ts:20` · `parsers/utils.ts:7,15,21` |
| C-12 | MINOR | demo code semver-locked; contradicts the package's own dead-export precept | `parsers/index.ts:1-4` · `scripts/proof-no-dead-combinator.mjs:1-24` |
| C-13 | INFO | `numberParser` yields `Infinity` with no diagnostic | `parsers/utils.ts:22` |
| C-14 | INFO | ESM↔CJS identity split over module-eval singletons; latent K-6 | `dist/utils.cjs:3-4` · `packrat-entry-CS1td-8B.js:722` |
| X-1 | — | O-15 PT-01's `diagnostics-DDazRHgl.js:14` cite is wrong; substance CONFIRMED at `packrat-entry-CS1td-8B.js:882` | INBOX O-15 |
| X-2 | — | `parsethat-surface-gaps.mjs:47`'s latch row is a constant `false` — can never count RED | probe `:48` |
| X-3 | — | the RED-7 probe cannot run in this workspace (`ERR_MODULE_NOT_FOUND`) | probe `:1-13` |
| X-4 | — | no RED-7 row touches `/utils`; the corpus has never measured this subpath | probe `:11-13,22-57` |
| S-1 | ✦ | the entry file itself carries none of the 14 defects | `utils-entry.ts:1-14` |
| S-2 | ✦ | unterminated-comment posture is the totality-correct one (K-8 / R-LAW-4) | `utils.ts:179` |
| S-3 | ✦ | both scanners are O-8-clean by construction — the reason they survive as WRAP | `utils.ts:159-186` |
| S-4 | ✦ | the `types` steer around the `dist/` basename collision was deliberate and works | `package.json:29` |

**Counts**: defects **14** (BLOCKER **3** · MAJOR **7** · MINOR **2** · INFO **2**) · superlatives **4** ·
corpus contradictions **4** (not counted as defects — they are findings against the instruments, not the
module).
