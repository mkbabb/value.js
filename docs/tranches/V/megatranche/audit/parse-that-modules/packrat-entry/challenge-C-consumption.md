claude-opus-5[1m]

# CHALLENGE — `packrat-entry` · axis C (CONSUMPTION)

**Subject**: `/Users/mkbabb/Programming/parse-that/typescript/src/parse/packrat-entry.ts` — **5 lines**, read whole.
**Axis**: how this module serves its consumers — the surface it publishes vs. what value.js actually
consumes; the `./packrat` subpath contract; the `/css` (52-export) downstream surface; API ergonomics;
semver hygiene; and the X·P dual-target algebra's keep/wrap/retire verdict.
**Posture (binding)**: the module is assumed **DEFECTIVE** until the tree proves otherwise. Every claim
carries severity + `file:line` + its own falsifier. **L-18 runs both ways** — the three superlatives carry
falsifiers too.

**STOP-finding check (law, first act)**: `ls /Users/mkbabb/Programming/parse-that-css-totality-p2` →
`No such file or directory`. The forbidden root does **not** exist and was **not** created. No STOP finding.

---

## 0. Method, bounds, and what was NOT run

**Read whole (read-only)**. The module (5 lines) and **every file it imports, transitively**:
`packrat.ts` (488) → `parser.ts` (711), `state.ts` (189) → `lazy.ts` (43), `leaf.ts`, `utils.ts`,
`debug.ts`, `ansi.ts`. Surface context: `index.ts` (14), `core.ts` (26), `diagnostics.ts` (14),
`utils-entry.ts` (14), `package.json` (58), `vite.config.ts`, `test/subpath-gate.mjs`,
`scripts/proof-no-css-surface.mjs`, `README.md` §"Combinator support", `docs/api.md`,
`typescript/CHANGELOG.md` §1.0.0/§0.13.0. Built artifacts: `dist/{packrat.js,packrat.cjs,packrat.d.ts,
packrat-entry.d.ts,core.js,parse.js,utils.js,diagnostics.js}`, both shared chunks and **all** their
`.map` files.

**Downstream read (value.js, read-only)**: `package.json` (4.0.0), `src/css/index.ts` (the 52-export
`/css` surface), `dist/subpaths/css.js` (packed), and — because the brief's `src/parsing/` **no longer
exists at HEAD** — the pre-v4 tree at `164343c1^` (`src/parsing/**`, 8 files) where the parse-that
consume edges actually lived. That retirement is itself part of the record (C-4).

**Corpus folded, not re-invented** (cited by id; contradicted explicitly where the tree disagrees —
see C-10): INBOX **O-15** (`docs/tranches/V/coordination/INBOX.md:77` — PT-01/PT-03/PT-04/PT-07 with
dist line-cites); **X·P W2** (`docs/tranches/X/parse-that/waves/W2.md` — §2c row `:132`, §3 clause 3
`:161`, **O-8** `:253-258`, §3c AC-3(d) `:366-368`, **K-6** `:473`, **K-8** `:478`, **G-8** born-RED
`:784-788`, **G-10** `:810`); **X·P W1** (`W1.md:94-96,280-283,439`); **X·P W3** (`W3.md:85,289-292,
497,505,514`); **parser-band** (`registry/adjudicated/parser-band.md:17,108,119,134`); and the sibling
module challenge `audit/parse-that-modules/packrat/challenge-C-consumption.md` (C-1..C-18, S-1..S-4),
whose **mechanism** findings on `packrat.ts` I fold by citation and do **not** re-claim. This file
claims only what is decided **in `packrat-entry.ts` and in the export-map row it defines**.

**Deliberately NOT run (law)**: nothing that arms packrat or diagnostics. The latch is one-way
(`packrat.ts:156,290`; O-15 PT-03) and a single stray `memoize()` poisons the process for every later
measurement. `parsethat-surface-gaps.mjs --arm` was **not** run, and the un-armed leg was not run either
(it is a 250k-iteration bench; the law's spirit is no benches). Every dynamic claim below is therefore
either **MEASURED** on a strictly non-arming path (module import + property read only) or **derived from
source with a stated executable falsifier**. No claim is presented as measured that was not.

**Non-arming measurements taken this session** (node v26.0.0, darwin arm64, in `parse-that/typescript`;
`memoize` is imported but **never called**):

```
ESM  ./packrat keys : ["memoize","mergeMemos","resetPackrat"]          # import dist/packrat.js
CJS  ./packrat keys : ["memoize","mergeMemos","resetPackrat"]          # require dist/packrat.cjs
every entry key ∈ root barrel : true          root barrel key count : 34
entry.memoize      === root.memoize      : true
entry.resetPackrat === root.resetPackrat : true
entry.memoize      === entry.mergeMemos  : false
getCijKey / packratEnter / packratExit reachable from ./packrat : false / false / false
                                    ... from the root barrel     : false / false / false
Parser.prototype own names : 25   ·  Parser.prototype.memoize : undefined  ·  .mergeMemos : undefined
dist/packrat.js.map  = {"version":3,"file":"packrat.js","sources":[],"sourcesContent":[],"names":[],"mappings":";"}
dist/packrat.cjs.map = {"version":3,"file":"packrat.cjs","sources":[],"sourcesContent":[],"names":[],"mappings":";;;;;;"}
dist/packrat-entry-CS1td-8B.js.map .sources = [lazy.ts, ansi.ts, debug.ts, state.ts, leaf.ts, packrat.ts, parser.ts]
dist/core.js.map .sources = ["../src/parse/split.ts"]
value.js dist/subpaths/css.js : grep -c 'parse-that|memoize|packrat' → 0
```

**Substrate receipt (OP-7 clause).** All parse-that reads are the **main checkout**
`/Users/mkbabb/Programming/parse-that` at `ef10d5b` (`typescript/package.json:3` = `1.0.0`). No
worktree, no frozen root, no `~/Documents/Codex` path was entered. The prototype workspace's
`node_modules/@mkbabb/parse-that` is the same `1.0.0`. O-15's numbers predate the OP-7 commits and are
quoted as **inherited receipts**, never re-derived.

**The module, whole** (`packrat-entry.ts:1-5`):

```ts
// Subpath entry: "@mkbabb/parse-that/packrat" (A.W3).
//
// The opt-in packrat / left-recursion memoization tier. Thin re-export of
// packrat.ts (NOT modified here — owned by A.W2 on its own branch).
export { memoize, mergeMemos, resetPackrat } from "./packrat.js";
```

Four comment lines and one statement. Everything this module **decides** is (a) *that a subpath exists*,
(b) *which three names it publishes*, and (c) *what it calls itself*. All three decisions are challenged
below. A 5-line file has nowhere to hide: it is either exactly right or it is the wrong three names.

---

## 1. Findings

### C-1 — BLOCKER — the tier boundary this file exists to draw does not exist in the build; no consumer can decline the tier it gates

`packrat-entry.ts:3` calls this "the **opt-in** packrat / left-recursion memoization tier", and the
founding commit `3b559a9` ("feat(A.W3): subpath split") states the deliverable as *"Consumers can now
import exactly their tier instead of the full barrel."* The 1.0.0 cut then promoted that to ruled
doctrine: `CHANGELOG.md:101-103` — *"(**r6 #6**) parse-that is **not** zone-partitioned — the subpath
export map (`.` / `core` / `diagnostics` / `packrat` / `utils`) **IS** the zone map."*

The build falsifies it for exactly this zone. MEASURED, first line of each served entry:

```
dist/core.js:1   import { P, a, b, c, d, e, f, g, h, l, j, r, s, n, t, w } from "./packrat-entry-CS1td-8B.js";
dist/parse.js:1  import { P, a, b, c, d, e, f, g, h, l, m, i, j, r, k, s, n, t, w } from "./packrat-entry-CS1td-8B.js";
dist/utils.js:2  import { f as dispatch, n as string, r as regex, P as Parser, c as any } from "./packrat-entry-CS1td-8B.js";
dist/diagnostics.js:1  import { c, a, d, e, g, m } from "./diagnostics-DDazRHgl.js";     ← the one clean entry
```

The mechanism is `parser.ts:7` (`import { packratEnter, packratExit } from "./packrat.js"`) consumed at
`parser.ts:43-48` inside `parseState`'s `try/finally`. Because `Parser.parseState` — the only parse
entry — calls into `packrat.ts`, the packrat module is reachable from `Parser` itself; rollup therefore
placed the whole runtime in one shared chunk **and named that chunk after this very module**:
`packrat-entry-CS1td-8B.js` (40,576 B). A consumer who imports `@mkbabb/parse-that/core` — the entry
whose own header at `core.ts:3-5` promises *"A consumer that imports only this never pulls the
diagnostics accumulator, **the packrat tier**, or the json/csv domain parsers"* — loads the full LR
machinery, `MEMO`/`HEADS`/`GROWING`, and the `PACKRAT_ARMED` global, in the first line of the file.

`package.json:6` (`"sideEffects": false`) does not rescue this: it authorizes a bundler to drop *unused
modules*, and `packrat.ts` is not unused — it is on `Parser.parseState`'s call path. Nothing can shake it.

**Consumer harm.** The subpath's entire promise is *cost isolation*. Every consumer pays the packrat tier
whether or not they name it, and the one subpath that could have made the promise true (`./packrat`) is
the one whose contents were already unavoidable. This module is a **naming ceremony over a graph edge
that was never cut.**

**Falsifier**: exhibit a served entry under `dist/` that reaches `Parser` without importing
`packrat-entry-*.js`. MEASURED: three of the four `Parser`-bearing entries import it; the fourth
(`./diagnostics`) does not expose `Parser` at all (`diagnostics.ts:1-14` — six diagnostics functions and
three types). A second falsifier: show `parser.ts` calling `parseState` without `packratEnter` — it
cannot; `parser.ts:43` is unconditional and the arming check lives *inside* `packratEnter`
(`packrat.ts:217`), i.e. one module-boundary too late to be shakeable.

**Contrast that proves I am not over-claiming**: `./diagnostics` **is** a real zone — `dist/diagnostics.js`
imports only the diagnostics chunk. The zone map is not uniformly false; it is false **here**.

---

### C-2 — BLOCKER — the entry publishes the *arming* half of the tier and withholds the *scoping* half; its three names are two latches and a mislabeled no-op

This is the curation decision made in `packrat-entry.ts:5` — distinct from `packrat.ts`'s implementation
(sibling C-2/C-3/C-14, folded as mechanism). `packrat.ts` exports **six** functions:

| `packrat.ts` export | line | published by `./packrat`? | effect on the process |
|---|---|---|---|
| `memoize` | `:482` | **yes** | **arms** the one-way latch at *construction* (`:290`) |
| `mergeMemos` | `:486` | **yes** | **arms** the one-way latch at *construction* (`:290`) |
| `resetPackrat` | `:262` | **yes** | clears three Maps; **does not disarm** |
| `packratEnter` | `:216` | no | opens a parse-scoped epoch |
| `packratExit` | `:243` | no | closes it, restoring the parent |
| `getCijKey` | `:79` | no | key derivation |

The entry selected the three names that **only add global state** and withheld the two that **scope it**.
`packratEnter`/`packratExit` are the sole primitives in the module that bound packrat's effect to one
parse; they are `export`ed in source and declared in `dist/packrat.d.ts:44,56`, and MEASURED they are
reachable from **neither** `./packrat` **nor** the root barrel (`false` on both, all three names). So the
published API is: *two ways to arm forever, and nothing that un-arms or scopes.*

Worse, the third name reads as the undo and is not. O-15 **PT-03** (inherited receipt, `INBOX.md:77`;
re-cited at `W2.md:132,784-788`; `W1.md:280-283`): UNARMED **93.9 ns/parse** → ARMED **138.2** = **1.47×**,
and **`resetPackrat()` leaves it at 139.3**. The dist provenance is pinned: `PACKRAT_ARMED` false at
`packrat-entry-*.js:678`, true at `:722`, read at `:682`/`:714`, **no assignment back to false anywhere in
the bundle** (`W1.md:280-283,439`). In source: `packrat.ts:156` (`let PACKRAT_ARMED = false`) and
`packrat.ts:290` (`PACKRAT_ARMED = true`, inside `makeMemoized` at `:280`) are the only two writes.
`resetPackrat` (`:262-271`) clears `MEMO`/`HEADS`/`GROWING` and never touches the flag.

And the two arming names are not two things. MEASURED: `entry.memoize !== entry.mergeMemos` as objects,
but both are one-line calls into the same `makeMemoized` (`packrat.ts:482-488`) differing only in a
string that reaches the debug printer (sibling C-14). So of three published names: **one function twice,
plus a reset that resets the wrong thing.**

**Why this is a consumption BLOCKER, not a style note.** The sole downstream's own ruled gate forbids the
surface. `parser-band.md:108` (the adjudicated idiom reading) and `W2.md:810` **G-10** both require the
JS lowering's structural graph-walk to show **`memoize = 0`**. `W2.md:253-258` **O-8** makes it law:
*"No operator reads or writes process-global mutable state. Arming, memoization, and diagnostics are
**parameters of a parse**, never latches. PT-03 made law: a one-way `PACKRAT_ARMED` costing 1.47× forever,
whose reset does not disarm, is a state machine with one absorbing state — and no algebra with a global
absorbing state can satisfy EQ-1 across two lowerings that arm at different times."* `W2.md:473` **K-6**
kills any candidate with *"observable cross-parse state (the latch class) … or reset with residue."*
`W2.md:161` binds it into the contract: *"no one-way global latch of any kind (PT-03 / O-8)."*

So `./packrat` publishes exactly the construct the downstream's algebra names as its canonical
counter-example — and withholds the two functions that would have made a lawful, parse-scoped version
expressible. Every prototype in the band encodes the refusal in a test:
`cand-o/idiom.test.ts:65-68` (*"`memoize()` sets PACKRAT_ARMED process-wide and never disarms it"* → asserts
`count(...\bmemoize\b|\bmergeMemos\b) === 0`), `:169-170` (no `memoize` node in the built graph),
`cand-f/color.ts:28` (*"ZERO `memoize`: the band ruling stands"*), `cand-b-dispatch/structure.test.ts:116-118`
(*"never memoizes — no process-wide packrat latch is armed"*).

**Falsifier**: name one export of `./packrat` (or of `.`) that returns the process to the unarmed state,
or that scopes memoization to a single parse or a single parser instance. MEASURED served surface is
`["memoize","mergeMemos","resetPackrat"]` in **both** conditions; the two scoping primitives are absent
from both. A second falsifier, executable: run the tree's own `scripts/proof-packrat-armed.mjs` poison-child
harness and show a path from armed back to unarmed — the gate's own design (`:13-21`) presumes there is none.

---

### C-3 — MAJOR — the subpath is a strict, identity-equal subset of the root barrel: it adds no reachable name and no measurable saving, at the price of a permanently frozen 1.x export-map key

`index.ts:8` re-exports the identical three names from the identical module:
`export { memoize, mergeMemos, resetPackrat } from "./packrat.js";` — the same statement as
`packrat-entry.ts:5` with a different filename above it.

MEASURED: every key of `./packrat` is present on the root barrel (`true`), and the *function objects are
identical* — `entry.memoize === root.memoize` → `true`, `entry.resetPackrat === root.resetPackrat` → `true`.
There is no wrapper, no re-binding, no distinct instance. Bytes: `dist/packrat.js:1` and `dist/parse.js:1`
import **the same chunk file** (`packrat-entry-CS1td-8B.js`), so a Node consumer with no bundler evaluates
the same 40,576 B either way; and a bundler consumer already had `sideEffects:false` (`package.json:6`)
tree-shaking the barrel. The subpath's residual value is **namespacing** — and it buys that by minting an
`exports` key, which under semver is a public contract that cannot be removed below a major.

**Semver ledger for this row.** The key was added at `3b559a9` (2026-06-19) with *"Version UNCHANGED"* — a
minor-shaped addition to the exports map at 0.x. The 1.0.0 cut (`CHANGELOG.md:5`, 2026-07-03) then froze it
into the major line. Retiring it now costs a 2.0.0 — and the project has already demonstrated it will pay
that price for a zero-consumer surface: the 1.0.0 cut removed the entire `*Span` family for exactly that
reason (`CHANGELOG.md:11-13`, gate `proof:no-span-surface`, `index.ts:10-12`). The cost of the `./packrat`
key is therefore not hypothetical; it is one deferred major.

**Falsifier**: exhibit a name served by `@mkbabb/parse-that/packrat` and not by `@mkbabb/parse-that`, or a
measured byte/evaluation difference between the two import paths for the same three names. Neither exists
(measured key sets and identity comparisons above; identical chunk import in both entry files).

---

### C-4 — MAJOR — zero import sites in the entire constellation, including during the dependency's own lifetime; and the sole downstream, needing memoization, wrote its own rather than import this one

Searched every repo the routing law touches. The literal specifier `@mkbabb/parse-that/packrat` is
**written** in exactly six places and **imported** in **none**:

| site | what it is |
|---|---|
| `packrat-entry.ts:1` | this module's own header comment |
| `docs/tranches/A/A.md:390`, `docs/tranches/A/waves/A.W3.md:97` | parse-that's own design docs — the *specification* of the subpath, in fenced example code |
| value.js `docs/tranches/V/apotheosis/pi/mirror/cells/syntax-consume-number/g11/peer-resolver.mjs:11`, `g12/lib.mjs:25`, `g13/lib.mjs:25` | resolver **tables** that enumerate all five export-map keys to redirect them; they map the specifier, they do not import from it |

Zero `import` statements. The subpath has never been consumed by anything.

**The decisive record is the dependency's own lifetime.** value.js `3.1.0` (at `164343c1^`) depended on
`"@mkbabb/parse-that": "^1.0.0"` — the exact version that ships this subpath. MEASURED over that tree:

- **10 import statements across 8 files** in `src/parsing/**` (`color/color.ts`, `index.ts`, `math.ts`,
  `stylesheet/stylesheet.ts`, `timeline/easing.ts`, `timeline/scroll-timeline.ts` ×2, `units.ts`,
  `utils.ts` ×2) — **every one of them from the root barrel** `"@mkbabb/parse-that"`.
- **`git grep "@mkbabb/parse-that/" 164343c1^ -- src/ demo/ test/` → no matches.** Not `./packrat`, not
  `./core`, not `./diagnostics`, not `./utils`. The subpath split's *entire* consumer base, at the moment
  it had one, used none of it.
- The names actually imported: `Parser`, `all`, `any`, `dispatch`, `regex`, `string`, `whitespace`,
  `mergeErrorState`, `ParserState`. **`memoize` never appears in a parse-that import line.**

And the sharpest fact on this axis: **value.js did memoize — it just wrote its own.**
`164343c1^:src/utils.ts:116` exports a `memoize<T extends (...args:any[]) => any>(func, options)` with
`maxCacheSize`, `ttl`, `keyFn`, `shouldCache`, and a `.cache` handle (`:178`), used at
`src/parsing/index.ts:542,618`, `src/parsing/color/color.ts:721`, `src/parsing/animation-shorthand.ts:164`.
`color.ts` imports parse-that at `:22` and value.js's own `memoize` at `:41` — **both names live in one
module scope, and the one from parse-that is not the memoizer.** The downstream's revealed design is
per-instance, bounded, parameterized, disposable, zero-global: precisely the shape `W2.md:253-258` O-8
demands ("*a parameter of a parse, never a latch*"), and precisely what `./packrat` does not offer.

At HEAD the dependency is gone entirely: value.js `4.0.0` deps = `{@mkbabb/glass-ui, @mkbabb/keyframes.js}`;
parse-that was removed at `164343c1` (2026-07-17, *"feat(v4)!: value 4.0 producer surface … retire pre-v4
src trees"*). The 52-export `/css` surface that replaced `src/parsing/` (`src/css/index.ts` — 33 types +
19 values; `parseCssColor`, `parseCssValue`, `parseTimingFunction`, `parseStylesheet`, …) is
combinator-free, and the packed artifact carries **zero** bytes of it: `grep -c 'parse-that|memoize|packrat'
dist/subpaths/css.js` → **0**.

**Falsifier**: produce one `import`/`require` statement, anywhere outside parse-that's own design docs,
whose specifier is `@mkbabb/parse-that/packrat`. Or produce a value.js call site, at any commit, that
passes a `Parser` to parse-that's `memoize`. I found neither in the full history of the consume edge.

---

### C-5 — MAJOR — the `./packrat` export-map row points `types` and `import` at differently-named files, leaving a *same-named, larger-surface* declaration file adjacent to the runtime target

`package.json:23-26`:

```json
"./packrat": {
    "types":   "./dist/packrat-entry.d.ts",
    "import":  "./dist/packrat.js",
    "require": "./dist/packrat.cjs"
}
```

The skew is manufactured by the build config: `vite.config.ts:18` names the **entry key** `packrat` while
the **source file** is `packrat-entry.ts`, and `vite-plugin-dts` emits declarations named after *source*
files. So `dist/` ends up holding two `packrat.*` families with different surfaces:

| file | origin | declared/served exports |
|---|---|---|
| `dist/packrat.js` / `.cjs` | built from `packrat-entry.ts` | **3** — `memoize`, `mergeMemos`, `resetPackrat` (MEASURED, both conditions) |
| `dist/packrat-entry.d.ts` (109 B) | dts of `packrat-entry.ts` | 3 — re-export line |
| **`dist/packrat.d.ts` (2,623 B)** | dts of **`packrat.ts`** | **6** — adds `getCijKey` `:2`, `packratEnter` `:44`, `packratExit` `:56` |

Any resolver that honours `exports.types` (TS `node16`/`nodenext`/`bundler`) is safe. Any resolver that
resolves the **runtime** file via `exports.import` and then takes types by **adjacency** — the long-standing
`.js`→sibling-`.d.ts` convention, used by several bundler d.ts plugins and older loader stacks — types
`packratEnter`/`packratExit`/`getCijKey` as importable from `@mkbabb/parse-that/packrat`. The consumer then
ships `import { packratEnter } from "@mkbabb/parse-that/packrat"`, which **typechecks clean** and fails at
load with `SyntaxError: The requested module … does not provide an export named 'packratEnter'` — a runtime
crash produced by a green typecheck, which is the worst failure shape a types field can have.

**Bound stated honestly** (why MAJOR and not BLOCKER): the package is `exports`-only —
`package.json` has **no** `main`, **no** top-level `types`, **no** `typesVersions` (fields at `:1-58`;
`exports` at `:7`, `files` at `:51`). A classic node10 resolver therefore cannot reach
`@mkbabb/parse-that/packrat` at all, which removes the largest population from the hazard. The exposure is
the middle band: exports-aware runtime resolution + adjacency-based type resolution. That band is real but
not universal, so this is a MAJOR with a named trigger, not a blocker.

**Falsifier**: show that no supported resolver configuration reaches `dist/packrat.d.ts` starting from
`dist/packrat.js`, *or* show `dist/packrat.d.ts` absent from the published tarball. It is not absent:
`package.json:51-53` publishes `"files": ["./dist"]` — the whole directory, `packrat.d.ts` included.

**The one-line cure** (stated because a 5-line module's defects should have 5-line fixes): rename the vite
entry key from `packrat` to `packrat-entry` (`vite.config.ts:18`) and repoint `import`/`require`; the two
families stop colliding and `types`/`import` finally name the same stem.

---

### C-6 — MAJOR — the gate that guards this subpath is weaker than the subpath's contract, and contradicts its own header

`test/subpath-gate.mjs` is the only automated check on this module's published surface. Its header
(`:5-8`) claims: *"we resolve the dist target each subpath maps to (**reading the `exports` map from
package.json so the gate tracks the manifest, not a hardcoded path**) and import it directly."*

What it actually does:

- `:25` — `const subpaths = ["./core", "./diagnostics", "./packrat", "./utils"];` — the **set** is
  hardcoded. It reads the manifest for *targets*, not for *which subpaths exist*. A newly added subpath is
  ungated, and `"."` is never checked at all. The header's own claim is false for the half that matters.
- `:29-34` — for each of `types`/`import`/`require` it only `existsSync`s the path. The `require` (CJS)
  target and the `types` file are **never loaded or read**. A `.d.ts` whose content diverged from the
  runtime (exactly C-5's shape) passes.
- `:53-54` — the entire behavioural assertion for this module is `typeof packrat.memoize !== "function"`.
  **`mergeMemos` and `resetPackrat` are never checked.**

**Falsifier — executable, and it is the finding.** Delete `mergeMemos` and `resetPackrat` from
`packrat-entry.ts:5`, leaving `export { memoize } from "./packrat.js";`. Rebuild. `proof:subpath` prints
GREEN (`:57-60`) while **two thirds of the subpath's published surface has silently vanished** — a breaking
change to a 1.x export map, undetected by the only gate that names it. The inverse falsifier: point at any
line in `subpath-gate.mjs` that would fail on that edit. There is none.

Contrast with the tree's better gates, which shows the standard exists here:
`scripts/proof-no-css-surface.mjs:6-15` explicitly reasons about *observable truth* — it rejects its own
first draft's substring-grep as "UNSOUND" and observes runtime export keys instead. `subpath-gate.mjs`
takes the weaker posture on a surface where the stronger one was already invented in-repo.

---

### C-7 — MAJOR — the only documentation of the name this entry serves documents a *different API shape* with false semantics, and the subpath specifier is documented nowhere

The feature `./packrat` gates is documented in exactly two places, both as an **instance method**:

- `README.md:305-310`:
  ```ts
  const expression = Parser.lazy(() =>
      all(expression, operators.then(expression).opt()).mergeMemos().or(number)
  ).memoize();
  ```
  — **no import line at all**, and `.mergeMemos()` / `.memoize()` written as methods.
- `docs/api.md:101-104`: `### \`memoize(): Parser<T>\`` — a **zero-argument method** heading, in a list
  between `recover` and `chain`, both of which *are* real `Parser` methods.

MEASURED: `Parser.prototype` has **25** own names; `Parser.prototype.memoize` → `undefined`;
`Parser.prototype.mergeMemos` → `undefined`. The methods do not exist (sibling C-4, independently
re-confirmed here). What this entry actually serves is a **free unary function** `memoize<T>(parser: Parser<T>)`
(`packrat.ts:482`) — a shape documented nowhere, in any file, in any repo.

And the specifier itself is undocumented: `@mkbabb/parse-that/packrat` appears **zero** times in
`README.md` and **zero** times in `typescript/CHANGELOG.md` (measured). `README.md:16,34` show root-barrel
imports only; `README.md:74` still describes the library as *"@mkbabb/parse-that v0.8.2"*.

**Consumer harm, stated as the loop it creates**: a consumer who reads the docs cannot discover this
subpath (it is never named); a consumer who discovers the subpath from `package.json` cannot find docs for
what it exports (the docs describe a method that does not exist). The `./packrat` key is discoverable only
by reading the export map, and usable only by reading `packrat.ts`.

**Falsifier**: find a documentation line, anywhere in parse-that, that writes `memoize` as a free function
taking a parser, or that writes the string `@mkbabb/parse-that/packrat` outside `docs/tranches/A/**` (the
design record, not user docs). Neither exists. The README's own pointer (`:313`, *"See memoize.test.ts for
details"*) concedes the point: the tests are the documentation.

---

### C-8 — MINOR — both served conditions ship an empty sourcemap, and this module's source text appears in no shipped `sources` array at all

MEASURED, verbatim:

```
dist/packrat.js.map  = {"version":3,"file":"packrat.js","sources":[],"sourcesContent":[],"names":[],"mappings":";"}
dist/packrat.cjs.map = {"version":3,"file":"packrat.cjs","sources":[],"sourcesContent":[],"names":[],"mappings":";;;;;;"}
```

Both are structurally valid and semantically empty, and both are nonetheless advertised —
`dist/packrat.js:7` and `dist/packrat.cjs:7` emit `//# sourceMappingURL=`. A devtools step-through into
`@mkbabb/parse-that/packrat` therefore gets a *silent no-op* rather than an honest missing-map notice: the
tool reports a map present and maps nothing. `vite.config.ts:9` sets `sourcemap: true`; the facade shape
(one re-export statement, fully elided by rollup) leaves nothing to map.

The module is erased from the other map too: `dist/packrat-entry-CS1td-8B.js.map`'s `sources` are
`[lazy.ts, ansi.ts, debug.ts, state.ts, leaf.ts, packrat.ts, parser.ts]` — **`packrat-entry.ts` is absent**.
Compare `dist/core.js.map`, whose `sources` is a non-empty `["../src/parse/split.ts"]`. So
`packrat-entry.ts` appears in **zero** shipped `sources` arrays.

Two consequences worth naming. (i) Its provenance header — the only place in shipped code where the
subpath specifier is written (`:1`) — reaches no consumer. (ii) The stale line `:4` (*"owned by A.W2 on its
own branch"*) is a dangling branch reference in a `1.0.0` release, harmless **only** because the erasure at
(i) keeps it out of the tarball's readable surface. That is luck, not hygiene.

**Falsifier**: find `packrat-entry.ts` in any `sources` array under `dist/`, or show a devtools/Node
`--enable-source-maps` session that resolves a frame in `dist/packrat.js` to the TypeScript source. Neither
is possible from the artifacts as built.

---

### C-9 — MINOR — the tree wrote down its own retirement condition for this entry; the condition is satisfied and the retirement has not happened

`CHANGELOG.md:106-111` (the 1.0.0 cut's recorded decision):

> **The WDM/LR (Warth–Douglass–Millstein left-recursion) tier keep is PROVISIONAL.** Arming (S.H1) makes
> the packrat/LR tier free for the LL(1) constellation, but this is **NOT** a blanket "made free" claim:
> the latch **never disarms**, so "free" holds **only for memoize-free processes**. The tier is kept
> pending the **bbnf-lang LR-consumer question** (bbnf-lang is the one grammar-DSL that would exercise it);
> if that consumer never materializes, a future cut may retire the tier.

MEASURED against the named consumer: `/Users/mkbabb/Programming/bbnf-lang/package.json` has **no `name`,
no `version`, no `dependencies`, no `devDependencies`** — it is a bare `{"workspaces":["playground"]}`.
`bbnf-lang/playground/package.json` (`@mkbabb/bbnf-playground`) depends on `@mkbabb/glass-ui`,
`@mkbabb/keyframes.js`, `@mkbabb/value.js@^0.10.0`, vue, monaco, reka-ui — **not** on
`@mkbabb/parse-that`. bbnf-lang is a Rust workspace (`Cargo.toml`, `crates/`); its TypeScript surface is a
Vue playground. The one grammar-DSL that would exercise the LR tier has no dependency on the package
that ships it, in either of its two manifests.

The condition the project set for itself is met. This finding claims only the *unacted* state, not a
schedule — but it removes the last standing argument for the `./packrat` key's existence, and it is the
condition the X·P verdict (§2) executes against.

**Falsifier**: a `@mkbabb/parse-that` entry in any bbnf-lang manifest, or a named LR consumer elsewhere in
the constellation. Searched: value.js (none, C-4), keyframes.js (declared parse-that-free by parse-that
itself at `typescript/CHANGELOG.md:15` — *"kf is parse-that-free"*), glass-ui (not a parser consumer),
bbnf-lang (measured above).

---

### C-10 — INFO — explicit contradiction of the sibling `packrat` challenge's closing chronology

The sibling `audit/parse-that-modules/packrat/challenge-C-consumption.md` closes: *"the 1.0.0 cut froze all
of that into the major line **at the moment the sole downstream had already ruled `memoize = 0`**."* The
tree disagrees, and the corpus law requires me to say so rather than inherit it.

| event | date | provenance |
|---|---|---|
| `./packrat` subpath created | **2026-06-19** | commit `3b559a9`, *"Version UNCHANGED"* |
| **1.0.0 cut** | **2026-07-03** | `CHANGELOG.md:5` |
| value.js removes the parse-that dependency | **2026-07-17** | commit `164343c1` |
| parser-band adjudication rules `memoize = 0` | **2026-07-27** | `parser-band.md` header; idiom reading `:108` |

The freeze **preceded** both the dependency removal and the ruling by two and three weeks respectively. At
the 1.0.0 cut, value.js `3.1.0` still declared `"@mkbabb/parse-that": "^1.0.0"` (measured at `164343c1^`).
The defect in C-3 (a zero-consumer key frozen into the major line) stands **on its own evidence** — the
subpath had zero import sites on the day it was frozen, and C-4 measures that directly — but the
*aggravating* claim that the maintainers froze it in defiance of a known ruling is chronologically
impossible and should not propagate into the harvest. Recorded as INFO because it corrects the corpus
without changing any severity.

---

## 2. What the X·P dual-target algebra keeps, wraps, or retires in this module

Read against `W2.md` §3b (contract clauses), §3c (`:304-400`, the candidate field), and the kill rules
(`:470-482`). The unit of judgment here is the **five lines**, not the tier.

**RETIRE — the `./packrat` export-map key and this file, whole.** Not wrapped. The algebra's operator set
(`W2.md:250`) is closed and enumerated, and O-8 (`:253-258`) forbids any operator that reads or writes
process-global mutable state — naming `PACKRAT_ARMED` as *the* counter-example, in the algebra's own words.
K-6 (`:473`) kills observable cross-parse state and "reset with residue"; G-8 (`:784-788`) pastes PT-03's
93.9→138.2→139.3 as its **born-RED baseline**, i.e. this module's published behaviour is the harness's
control group for what a candidate must *not* do. G-10 (`:810`) requires the built-graph walk to show
`memoize = 0`. There is no wrapping that survives this: a parse-scoped wrapper over `memoize` still arms at
construction (`packrat.ts:290` fires in `makeMemoized`, before any parse), so the wrapper's *existence*
is the violation. `resetPackrat` has nothing left to reset once `memoize` is gone. **All three published
names retire together.** C-9 shows the tree's own written condition for that retirement is already met;
C-3 prices it at one major.

**KEEP — two ideas, neither of them a name in this file.** (i) *The facade shape*: a subpath entry that is
a pure re-export with zero logic is the right instrument (S-1), and the algebra will need exactly this for
its own lowering-selection surfaces. (ii) *Memoization as a bounded, per-instance parameter* — which the
downstream already built and shipped: `164343c1^:src/utils.ts:116` (`maxCacheSize`/`ttl`/`keyFn`/
`shouldCache`/`.cache`). That is what `W2.md:253-256` means by "a parameter of a parse"; it is the design
`./packrat` should have published and did not.

**Per-candidate reading** (§3c). **AC-1 TAGLESS-TWIN**: a globally-armed memo table cannot be instantiated
per-lowering — arming in the JS instantiation is invisible to the Wasm one, so EQ-1 fails by construction
(`:257-258` says so explicitly). **AC-2 CLOSED-IR**: `memoize` would have to be an IR node kind with a
lowering in both targets; its lowering is a module-global `Map`, which is the escape-hatch-node kill
(`:339-341`). **AC-3 SPAN-ALGEBRA**: its own predicted failure (d) is *"**arena latch** — span-buffer reuse
across parses is **the PT-03 class**; K-6 kills any candidate whose parse #100,001 is distinguishable from
parse #1"* (`:366-368`) — the algebra names this module's behaviour as a named way to die. **AC-4
SIBLINGS-ORACLE** carries cand-O forward, and cand-O's suite already asserts the exclusion executably
(`cand-o/idiom.test.ts:65-68,169-170`).

**Not a K-8 row.** For completeness against the totality kill (`:478`): `getCijKey`'s `RangeError`
(`packrat.ts:90-98`) is unreachable through this entry's surface — `getCijKey` is not exported by
`./packrat` (MEASURED `false`) — so the throw is the tier's problem (sibling C-8), not the entry's. Stated
so the harvest does not double-count it here.

---

## 3. Superlatives (L-18 both ways — each with its falsifier)

### S-1 — SUPERLATIVE — a true zero-logic facade, with measured ESM/CJS surface parity and zero leak from the larger implementation surface

Five lines, one statement, no wrapper, no default export, no namespace object, no re-binding. The served
key set is **byte-identically** `["memoize","mergeMemos","resetPackrat"]` in **both** conditions
(MEASURED: `import dist/packrat.js` and `require dist/packrat.cjs`), and the identity relation to the root
barrel is exact (`entry.memoize === root.memoize` → `true`). Crucially, the implementation module beneath
it exports **six** names and declares all six in `dist/packrat.d.ts` (`:2,44,56` for the three extras) —
and **not one leaks**: `getCijKey`, `packratEnter`, `packratExit` are all `false` on the entry namespace.
An entry that admits exactly its intended surface, in two module systems, over a source that offers twice
as much, is the correct discipline.

Contrast within the same family: `utils-entry.ts` mixes four source modules across two tiers
(`utils.js` + `parsers/json.js` + `parsers/csv.js` + `parsers/utils.js`), and `core.ts:3-5` makes a
promise its own build breaks (C-1). This file makes no promise it does not keep at the surface level.

**Falsifier**: a name reachable from `./packrat` in one condition and not the other, or any of the three
non-published `packrat.ts` exports reachable through the entry namespace. MEASURED absent, both directions.

---

### S-2 — SUPERLATIVE — the module declares its own ownership boundary and the creating commit honoured it exactly

`packrat-entry.ts:4`: *"Thin re-export of packrat.ts (**NOT modified here — owned by A.W2 on its own
branch**)."* A file that states which changes it is *not* entitled to make is the epoch discipline the
megatranche asks for, written into source at the moment of the split rather than reconstructed afterward.

And it held. MEASURED: `git show --numstat 3b559a9 -- typescript/src/parse/` lists six paths —
`core.ts +59/-0`, `diagnostics.ts +14/-0`, `index.ts +16/-0`, `packrat-entry.ts +5/-0`, `span.ts +345/-0`,
`utils-entry.ts +14/-0`. **`packrat.ts` is absent from the commit.** The subpath split created four entry
facades and touched **zero lines** of the tier it re-exports — additions only, no deletions anywhere in
`src/parse/`. That is the claim in `:4` discharged, verifiably, by the diff.

**Falsifier**: any hunk touching `typescript/src/parse/packrat.ts` in `3b559a9`. There is none (numstat
above). A second falsifier: a later commit to `packrat-entry.ts` that edits tier behaviour rather than the
re-export list — `git log --follow` on the path returns exactly one commit, `3b559a9`; the file has never
been modified since creation.

---

### S-3 — SUPERLATIVE — the published key set matches its founding specification exactly, seven weeks and one major later — the only entry in the family of which that is true

`3b559a9`'s commit message specifies the tier as, verbatim, `./packrat  memoize/mergeMemos/resetPackrat`.
MEASURED at `1.0.0`, both conditions: `["memoize","mergeMemos","resetPackrat"]`. Exact match, same order,
no drift, across a major version boundary and the `sideEffects`/latch rework of S.H1.

This is genuinely rare, and the contrast is in the same commit: `./core` was specified as *"Parser/
ParserState/**Span**, leaf parsers, **span combinators (incl. the SpanParser tagged-union)**, lazy, split"*,
and the 1.0.0 cut deleted that entire family (`CHANGELOG.md:11-13`; `index.ts:10-12`, *"The 15
closure-based `*Span` builders were EXCISED … a zero-consumer surface"*; gate `proof:no-span-surface`).
The founding spec for `./core` is now false in two of its five clauses; the founding spec for `./packrat`
is true in all of them.

**Stated honestly, and this is the point**: exact spec fidelity is a virtue *of the surface*, and it is
simultaneously the reason C-2 and C-3 are still live — the file has faithfully published three names that
nothing consumes and that the downstream's algebra forbids. **A promise kept perfectly to no one is still
a promise kept perfectly.** L-18 requires recording both halves; the harvest should carry S-3 and C-2
together or neither.

**Falsifier**: a name in the served surface absent from the `3b559a9` message, or vice versa. MEASURED:
none, in either direction, in either module system.

---

## 4. Ledger

| id | severity | claim | provenance |
|---|---|---|---|
| C-1 | **BLOCKER** | the tier boundary this file exists to draw does not exist in the build; the shared chunk is named after this module and `./core` imports it on line 1 | `packrat-entry.ts:3`; `dist/core.js:1`, `dist/parse.js:1`, `dist/utils.js:2`; `parser.ts:7,43-48`; `core.ts:3-5`; `CHANGELOG.md:101-103`; commit `3b559a9` |
| C-2 | **BLOCKER** | publishes the arming half (2 names, one function) and withholds the scoping half (`packratEnter`/`packratExit`); `resetPackrat` does not disarm | `packrat-entry.ts:5`; `packrat.ts:156,216,243,262-271,290,482-488`; O-15 PT-03 (`INBOX.md:77`); `W2.md:161,253-258,473,784-788,810`; `parser-band.md:108`; `cand-o/idiom.test.ts:65-68,169-170` |
| C-3 | MAJOR | strict identity-equal subset of the root barrel — no name, no bytes, no evaluation saved; costs one frozen 1.x export key | `index.ts:8` vs `packrat-entry.ts:5`; MEASURED identity `true` ×2; `dist/packrat.js:1` ≡ `dist/parse.js:1` chunk; `package.json:6,23-26`; `CHANGELOG.md:11-13` |
| C-4 | MAJOR | zero import sites constellation-wide, including during the dependency's lifetime; value.js wrote its own `memoize` instead | 6 write sites / 0 import sites; `164343c1^` — 10 root-barrel imports over 8 files, `git grep "@mkbabb/parse-that/"` → none; `164343c1^:src/utils.ts:116,178`; `src/parsing/color/color.ts:22,41`; `dist/subpaths/css.js` grep → 0 |
| C-5 | MAJOR | `types`/`import` name skew leaves a 6-export `dist/packrat.d.ts` adjacent to a 3-export runtime target → green typecheck, load-time `SyntaxError` | `package.json:23-26,51-53`; `vite.config.ts:18`; `dist/packrat.d.ts:2,44,56` vs MEASURED 3 served keys |
| C-6 | MAJOR | the subpath gate is weaker than the contract and contradicts its own header; deleting 2 of 3 exports keeps it GREEN | `subpath-gate.mjs:5-8,25,29-34,53-54,57-60`; contrast `proof-no-css-surface.mjs:6-15` |
| C-7 | MAJOR | the served name is documented only as a nonexistent `Parser` method; the subpath specifier is documented nowhere | `README.md:16,34,74,305-313`; `docs/api.md:101-104`; MEASURED `Parser.prototype` 25 names, `.memoize` `undefined` |
| C-8 | MINOR | empty sourcemaps shipped and advertised on both conditions; `packrat-entry.ts` in zero shipped `sources` arrays | MEASURED `dist/packrat.js.map`, `dist/packrat.cjs.map`, chunk map `.sources`; `dist/packrat.js:7`, `dist/packrat.cjs:7`; contrast `dist/core.js.map`; `vite.config.ts:9`; `packrat-entry.ts:4` |
| C-9 | MINOR | the tree's own written retirement condition is satisfied and unacted — the named LR consumer has no dependency in either manifest | `CHANGELOG.md:106-111`; `bbnf-lang/package.json` (workspaces only); `bbnf-lang/playground/package.json` |
| C-10 | INFO | explicit contradiction: the sibling challenge's closing chronology is impossible (1.0.0 predates both the dep removal and the band ruling) | `CHANGELOG.md:5`; `164343c1`; `parser-band.md` header; sibling verdict ¶ |
| S-1 | SUPERLATIVE | true zero-logic facade; measured ESM/CJS key parity; zero leak from a 6-export implementation surface | `packrat-entry.ts:5`; MEASURED both conditions; `dist/packrat.d.ts:2,44,56` |
| S-2 | SUPERLATIVE | declares its own ownership boundary, and the creating commit honoured it — `packrat.ts` untouched, additions only | `packrat-entry.ts:4`; `git show --numstat 3b559a9` (6 paths, `packrat.ts` absent); `git log --follow` → 1 commit |
| S-3 | SUPERLATIVE | published key set matches the founding spec exactly across a major — the only entry in the family of which that holds | commit `3b559a9` message; MEASURED keys; contrast `./core` at `CHANGELOG.md:11-13`, `index.ts:10-12` |

**Counts**: **10 findings** — 2 BLOCKER · 5 MAJOR · 2 MINOR · 1 INFO — and **3 superlatives**.

---

## 5. Verdict on the axis

Five lines make three decisions, and on the consumption axis two of the three are wrong.

*That a subpath exists* is wrong because the build never cut the edge the subpath names: `dist/core.js:1`
imports a chunk **named after this module**, so the "opt-in tier" is mandatory for every consumer of
`Parser`, and the 1.0.0 cut's ruled zone map (`CHANGELOG.md:101-103`) is false for exactly this zone (C-1).
*Which three names it publishes* is wrong because the three chosen are two arming latches — the same
function twice — plus a reset that clears the store and leaves the latch set (C-2), while the two
primitives that would have made a lawful parse-scoped memoizer expressible (`packratEnter`/`packratExit`,
`packrat.ts:216,243`) were withheld. The result is a published API whose every member the sole downstream's
own adjudicated gate forbids by name (`parser-band.md:108`, `W2.md:810` G-10) and whose measured behaviour
the successor algebra pastes in as its **born-RED control group** (`W2.md:784-788` G-8, O-15 PT-03).

*What it calls itself* is the one decision that is right, and it is right so completely that it produced
S-1, S-2 and S-3 — a faithful facade, an honoured ownership boundary, and a surface that still matches its
founding specification exactly, seven weeks and one major later.

The consumption record is unambiguous and it is not a matter of opinion. **Zero import sites exist,
anywhere, ever.** During the only window in which parse-that had a downstream, value.js pinned `^1.0.0`
and imported the root barrel at **10 sites across 8 files**, the subpath at **none** — and, needing
memoization, wrote its own bounded, per-instance, zero-global `memoize` (`164343c1^:src/utils.ts:116`)
while a parse-that import sat eighteen lines above it in the same file (`color.ts:22,41`). That is not
neglect; it is a design verdict rendered by the consumer, three weeks before the adjudication reached the
same conclusion formally. Today the dependency is gone (`164343c1`), the 52-export `/css` surface that
replaced `src/parsing/` is combinator-free, and the packed artifact carries **zero** bytes of this tier.
The named future consumer, bbnf-lang, has no parse-that dependency in either of its manifests — so the
retirement condition the project wrote for itself at `CHANGELOG.md:106-111` is **met** (C-9).

**X·P verdict: RETIRE the key and the file, whole; keep the facade shape and the downstream's
parameterized memoizer as the design.** The surface cannot be wrapped into lawfulness, because
`makeMemoized` arms at construction (`packrat.ts:290`) — the wrapper's mere existence is the O-8 breach.
Its price is one major, which C-3 shows the project has already paid once, for this exact reason, on the
`*Span` family.
