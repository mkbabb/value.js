**SERVED MODEL: `claude-opus-5[1m]`** (Opus 5, 1M context) — sole seat, no subagent. Session 2026-08-04, node v26.0.0 · darwin arm64.

# CHALLENGE · module `diagnostics` · axis **C — CONSUMPTION**

**Target**: `/Users/mkbabb/Programming/parse-that/typescript/src/parse/diagnostics.ts` (14 lines, 532 bytes).

**Read whole, read-only**: the target; its sole import `src/parse/utils.ts` (186 lines); `utils.ts`'s
sole import `src/parse/state.ts` (189 lines); the four sibling entries it is priced against
(`index.ts`, `core.ts`, `utils-entry.ts`, `packrat-entry.ts`); `typescript/package.json`;
`typescript/vite.config.ts`; the surface gates `test/subpath-gate.mjs` + `test/dist-surface.test.ts`;
`README.md` §Diagnostics/§Error Recovery; the built artifacts `dist/diagnostics.{js,cjs,d.ts}` +
`dist/diagnostics-DDazRHgl.js` + `dist/diagnostics-DpUY87_d.cjs` + `dist/parse.js` + `dist/core.js` +
`dist/utils.js` + `dist/utils.d.ts` + `dist/utils-entry.d.ts` + `dist/packrat.js` +
`dist/packrat-entry-CS1td-8B.js` + `dist/debug.d.ts`; and the call sites in `src/parse/parser.ts`
(:4, :67, :93, :201, :223, :239, :258, :273, :291, :410, :418, :419, :447, :460, :468, :469, :504,
:553, :626, :666, :674), `src/parse/leaf.ts` (:5, :16, :54, :69, :142, :291, :303, :360), and
`src/parse/debug.ts` (:6, :59, :174, :200, :235).

**Downstream read, read-only**: `value.js/src/subpaths/css.ts`, `value.js/src/css/types.ts`,
`value.js/package.json`, `value.js/package-lock.json`, `value.js/node_modules/@mkbabb/`, and the
prototypes workspace `docs/tranches/V/megatranche/prototypes/css-parser/`.

**STOP-FINDING CHECK — CLEAN.** `/Users/mkbabb/Programming/parse-that-css-totality-p2` does **not**
exist (`ls -d` → `No such file or directory`) and was not created. No `.worktrees/`, no frozen root,
no `~/Documents/Codex` was entered. Evidence root touched read-only; my only write is this file.

**Arming discipline.** **No probe armed diagnostics and no probe armed packrat.** The two probes that
measure heap use `--expose-gc` on the *unarmed* default path only; the module owning `PACKRAT_ARMED`
is never loaded by `/diagnostics` (S-6). O-15's PT-01/PT-03 armed-path numbers are **cited**, with
their dist lines re-read byte-for-byte, never re-measured.

**Posture.** Assumed DEFECTIVE until the tree proved otherwise. It proved otherwise in seven places
(§4) and failed in sixteen (§2/§3). Every row carries severity · `file:line` · falsifier. Two
hypotheses I attacked **survived their falsifiers** and are recorded as NOT-defects (§3, INFO-A/B) —
L-18 runs both ways.

---

## 0. The consumption ledger, stated first

| question | measured answer | provenance |
|---|---|---|
| exports on `/diagnostics` | **6 values + 3 types** | `diagnostics.ts:6-14`; `dist/diagnostics.d.ts:1-2`; runtime enumeration |
| of those, consumed by value.js's **shipped** `src/` | **0 of 9** | `value.js/src/**` — see D-0 |
| of those, consumed **through this subpath** anywhere in the value.js tree | **1** (`mergeErrorState`, once) | `parsethat-surface-gaps.mjs:13` |
| `/css` subpath exports (the 52 = 33 types + 19 values) that touch this module | **0 of 52** | `value.js/src/subpaths/css.ts:1-56`, counted |
| RED-7 rows landing on this file | **3** (all DEBT-1) | `parsethat-surface-gaps.mjs:20-24, :25, :26`; W1.md:470-472 |
| value exports that are pure functions of their arguments | **0 of 6** | `utils.ts:6-144` (B-3) |
| gates asserting any named export of `/diagnostics` | **0** | `test/subpath-gate.mjs:25-36`; `test/dist-surface.test.ts:14-15` (D-10) |
| X·P disposition | **KEEP 0 · WRAP 0 · RETIRE 6 + 3 types + the subpath** | §5 |

---

## D-0 · The consumption premise in the task brief is FALSE against the tree — **BLOCKER (process, not code)**

The brief instructs: *"read value.js `src/parsing/` read-only for the consume edges."*
**`value.js/src/parsing/` does not exist.** The successor is `value.js/src/css/` (7 files:
`grammar.ts` `index.ts` `named-colors.ts` `stylesheet.ts` `syntax.ts` `timeline.ts` `types.ts`) — a
**hand-rolled** grammar with its own diagnostic contract (`ParseIssue`, `src/css/types.ts:10-24`)
that imports nothing from parse-that.

Further, and decisively for this axis: **`@mkbabb/parse-that` is not a dependency of value.js at all.**

- `value.js/package.json` `dependencies` = `{@mkbabb/glass-ui, @mkbabb/keyframes.js}` — nothing else.
- `grep -c "parse-that" value.js/package-lock.json` → **0**.
- `require.resolve("@mkbabb/parse-that")` from the value.js root → **`MODULE_NOT_FOUND`**.
- `value.js/node_modules/@mkbabb/` contains exactly `glass-ui`, `keyframes.js`, `value.js`.
- value.js carries a **live test asserting the non-dependency**: `prototypes/css-parser/denominator/
  denominator.test.ts:80-87` — *"@mkbabb/parse-that is NOT yet a dependency of value.js (decree I-11
  §2 unexecuted)"*, `expect(Object.keys(pkg.dependencies)).toEqual(["@mkbabb/glass-ui",
  "@mkbabb/keyframes.js"])`.

**This contradicts the hitherto corpus explicitly**, as L-18 requires me to say. O-15 asserts
(`parse-that/docs/valuejs-evidence-2026-07-27-1.1.0-ask-addendum.md:12`) *"value.js readopted
parse-that as published by owner decree."* At the repo root that readoption **has not landed in the
manifest**. The real consume edge is the private, non-published prototypes workspace
`docs/tranches/V/megatranche/prototypes/css-parser/package.json`, whose own header reads *"NOT
production. Consumes the PUBLISHED package only"* and which pins `"@mkbabb/parse-that": "1.0.0"` in
its own `node_modules` (installed version verified `1.0.0`).

Across that entire tree — production and prototypes — **`@mkbabb/parse-that/diagnostics` is imported
exactly once, for exactly one symbol**: `parsethat-surface-gaps.mjs:13`. Every other parse-that import
(cand-F, cand-O, cand-B, cand-S, GROUND-B, the g16 fixtures) reaches for the root barrel or `/core`.
**Even cand-F — the one candidate using `mergeErrorState` in production code — imports it from the
root barrel**, not from this subpath (`cand-f/color.ts`: `import { Parser, all, any, dispatch,
mergeErrorState, regex, string } from "@mkbabb/parse-that"`).

**Consequence for this axis, and it is the whole frame:** on the routing law's stated path
(parser → value → packed release) this module has **zero shipped consumers**. Everything below audits
a *prospective* surface — what the module would cost the parser wave the moment readoption lands —
and every severity reads as "blocking at adoption," not "breaking in production today."

*Falsifier*: produce any file under `value.js/src/`, `demo/`, or `test/` importing from
`@mkbabb/parse-that` (any subpath), or any `parse-that` entry in `package.json` / `package-lock.json`.
I grepped all four trees plus both manifests; zero hits. If readoption landed on another branch this
row narrows to "not on this branch" — but the lockfile has 0 hits at HEAD, so the packed release
cannot contain it.

*Secondary (MINOR, corpus hygiene)*: `parsethat-surface-gaps.mjs:4-5` documents itself as runnable
*"from this workspace"* with a command written relative to the **repo root**. Node resolves bare
specifiers from the *importing file's* directory upward, so the command as written **does** resolve
(the probe file sits beside the workspace's `node_modules`) — but `cwd`-based reasoning about it is
wrong, and a seat that runs `require.resolve` from the repo root will see MODULE_NOT_FOUND and
misread it as a RED row. Cited so that does not happen.

### 0.1 · Which RED-7 rows land on THIS module

| probe line | row | touches |
|---|---|---|
| `:20-24` | `DEBT-1  cand-F reject() label, diagnostics OFF (shipping default)` → `expected` **undefined** | `mergeErrorState`, `utils.ts:33` — the gate `diagnosticsEnabled && label` |
| `:25` | `DEBT-1  Parser.prototype.label / .expected combinator` → **absent** | this module is the *only* labelling API in the package, and it is a bare `(state, label?)` function, not a combinator — that shape is *why* `.label()` does not exist |
| `:26` | `DEBT-1  enableDiagnostics() is process-global (arity)` → `0 args` | `diagnostics.ts:8` → `utils.ts:8`; arity 0, verified |

The other RED rows (`:36-37` lazy depth, `:47-48` the packrat latch, `:56-57` the JS boundary) belong
to `lazy`/`packrat`/`parser` — except that **S-6** shows `/diagnostics` is the one subpath that
provably cannot trip `:47-48`.

---

## 1. What the module actually is

`diagnostics.ts` is a **14-line pure re-export shim**. It defines nothing. It selects 6 of the 13
value exports and 3 of the 3 type exports of `utils.ts` and republishes them behind the
`"./diagnostics"` subpath (`package.json:18-22` → `dist/diagnostics.js` / `.cjs` / `.d.ts`, built from
`vite.config.ts:17`).

Therefore **every consumption property of this module is a property of what it selected**, and the
selection itself is the only decision the file makes. That selection is the object under challenge.

The 13 value exports of `utils.ts`, partitioned by reachability from **any** published entry
(verified by runtime enumeration of all four importable surfaces, not by reading alone):

| export | `utils.ts` | `/diagnostics` | root barrel | `/core` | `/utils` | reachable |
|---|---|---|---|---|---|---|
| `mergeErrorState` | :28 | ✅ :7 | ✅ `index.ts:5` | ❌ | ❌ | yes (**twice** — D-13) |
| `enableDiagnostics` | :8 | ✅ :8 | ✅ `index.ts:5` | ❌ | ❌ | yes (twice) |
| `disableDiagnostics` | :12 | ✅ :9 | ✅ `index.ts:5` | ❌ | ❌ | yes (twice) |
| `collectDiagnostic` | :102 | ✅ :10 | ✅ `index.ts:5` | ❌ | ❌ | yes (twice) |
| `getCollectedDiagnostics` | :138 | ✅ :11 | ✅ `index.ts:5` | ❌ | ❌ | yes (twice) |
| `clearCollectedDiagnostics` | :142 | ✅ :12 | ✅ `index.ts:5` | ❌ | ❌ | yes (twice) |
| `isDiagnosticsEnabled` | :16 | ❌ | ❌ | ❌ | ❌ | **NO** (D-11) |
| `addSuggestion` | :51 | ❌ | ❌ | ❌ | ❌ | **NO** (D-9) |
| `addSecondarySpan` | :57 | ❌ | ❌ | ❌ | ❌ | **NO** (D-9) |
| `reportUnclosedDelimiter` | :66 | ❌ | ❌ | ❌ | ❌ | **NO** (D-9) |
| `resetErrorState` | :131 | ❌ | ❌ | ❌ | ❌ | **NO** |
| `popLastDiagnostic` | :146 | ❌ | ❌ | ❌ | ❌ | **NO** |
| `skipWhitespace` / `skipBlockComments` | :159/:168 | ❌ | ✅ `index.ts:5` | ❌ | ✅ `utils-entry.ts:6` | yes |

Measured surfaces, verbatim:

```
diagnostics : [clearCollectedDiagnostics, collectDiagnostic, disableDiagnostics,
               enableDiagnostics, getCollectedDiagnostics, mergeErrorState]      (6)
root        : 34 names;  diag-not-in-root = []          <- strict subset, D-13
core        : [Parser, ParserState, all, any, containsDelimiter, createLazyCached,
               createParserContext, dispatch, eof, getLazyParser, lazy, mergeSpans,
               regex, spanToString, splitBalanced, string, trimStateWhitespace, whitespace]
utils       : [csvParser, escapedString, jsonParser, numberParser, quotedString,
               skipBlockComments, skipWhitespace]
isDiagnosticsEnabled reachable from [diagnostics, root, core, utils] = [false,false,false,false]
```

*Falsifier for the "NO" rows*: name a published import path. I read all five entry files whole and the
five `exports` keys of `package.json:7-33`, then enumerated all four at runtime. The six appear in the
built ESM chunk only as single-letter aliases behind a **content-hashed** filename
(`dist/diagnostics-DDazRHgl.js:111-124`: `f`, `i`, `p`, `r`) — not a supported specifier, and the
exports map has no `"./*"` passthrough, so deep-import escape is closed.

---

## 2. BLOCKERS

### B-1 · The subpath cannot supply an EQ-4-comparable diagnostic in the shipping default posture — **BLOCKER**

`mergeErrorState` gates *all* label capture on the module-private global `diagnosticsEnabled`:

```
utils.ts:33   state.expected = diagnosticsEnabled && label ? [label] : undefined;
utils.ts:38   if (diagnosticsEnabled && label) {
```
(built, verbatim: `dist/diagnostics-DDazRHgl.js:14` and `:18` — re-read.)

`mergeErrorState` is the **only** published export anywhere on the package surface that writes
`state.expected`. There is no `Parser.prototype.label`, no `.expected()` combinator — measured, not
assumed: `parsethat-surface-gaps.mjs:25` probes `"label" in Parser.prototype` and W1.md:471 prints
`RED  DEBT-1  Parser.prototype.label / .expected combinator      absent`.

X·P W2 §3b, EQ-4, in its own words:

> "A candidate whose labels exist only under an armed-diagnostics mode reads as **diagnostics-ABSENT
> and fails** (PT-01)."

So the module's flagship export is, by construction, EQ-4-failing under the default posture — and the
default is the shipping one (`utils.ts:6  let diagnosticsEnabled = false;`).

Not hypothetical for value.js. The band's **#1 binding debt** is precisely this capability:
`registry/adjudicated/parser-band.md:116` — *"Labelled failure diagnostics. … `expected:
["<named-color>"]` beats `(?!)`. This is the single clearest thing cand-F does better."* cand-F's
mechanism is this export verbatim — `prototypes/css-parser/cand-f/color.ts:158-164`:

```ts
const reject = <T>(label: string): Parser<T> =>
    new Parser<T>((state) => { mergeErrorState(state, label); state.isError = true; return state; });
```

and cand-F's own type doc concedes the defect at `cand-f/color.ts:592`: *"Populated only under
`enableDiagnostics()`; `[]` otherwise."* **The band's top debt is un-dischargeable through this
module as shipped.**

Statically confirmed RED row (no execution, nothing armed): `parsethat-surface-gaps.mjs:20-24` builds
`any(string("red"), reject("<named-color>"))` against `"rebeccapurple"`. `string("red")` fails at
offset 0; the reject arm calls `mergeErrorState(s, "<named-color>")` with `state.offset = 0 >
state.furthest = -1` (initial, `state.ts:52`) → takes the `utils.ts:29` branch → `expected =
undefined`. Printed baseline, W1.md:470.

*Falsifier*: exhibit a published export that writes `state.expected` without consulting
`diagnosticsEnabled`. In the built ESM chunk `state.expected` is assigned at exactly three sites —
`:14` (flag-gated), `:24` (flag-gated, inside the `:18` guard), `:73` (`resetErrorState`, which
*clears* it and is unreachable anyway per §1). None qualifies. Confirmed.

### B-2 · `enableDiagnostics` arms an unconditional `console.error`, making R-LAW-3 unpassable — **BLOCKER**

`diagnostics.ts:8` exports `enableDiagnostics`; `dist/diagnostics-DDazRHgl.js:3` shows it is the sole
writer of `diagnosticsEnabled = true` in the bundle. The only thing a consumer can want from it —
labels (B-1) — is inseparable from an I/O effect on the same path:

```
parser.ts:67-69                          if (isDiagnosticsEnabled()) { console.error(this.state.toString()); }
dist/packrat-entry-CS1td-8B.js:881-883   (identical, built — re-read this session)
```

This sits inside `parseState()` (`parser.ts:54-74`), i.e. on **every failed parse**, not on an opt-in
printing path.

X·P W2 §3b, **R-LAW-3 — diagnostic purity**:

> "A diagnostic is a value appended to `D`, never an effect. The probe monkey-patches
> `console.error`/`console.warn` to **throw** over the full corpus — a lowering that prints cannot
> pass (**the PT-01 coupling made unpassable**)."

Importing `enableDiagnostics` from this subpath is therefore a **probe-fatal import** for any X·P
lowering. No scoped posture exists — `enableDiagnostics.length === 0` (`utils.ts:8`), the second
confirmed RED row, W1.md:472.

The harness law was written **around this file specifically**: W1.md:465-466 defines **G-5 —
DIAGNOSTICS ARE QUARANTINED** ("Zero bench cell runs with diagnostics enabled; the labelled-failure
suite runs in its own process; the bench emits zero `console.error`"), with a byte-empty-stderr GREEN
condition (W1.md:483-486) and W1.md:97-99 ordering the quarantine structurally. A module that requires
its consumer's *bench architecture* be redesigned around it is a consumption defect of the first order.

**Aggravation — the printed value is computed by a broken helper.** `state.toString()` → `statePrint`
→ `addCursor` → `state.getLineAndColumn()` at `debug.ts:59`. That method is wrong at offset 0 on a
leading-newline source (D-14, measured this session): `{line: 2, column: -1}` where the correct answer
is `{line: 1, column: 0}`. The sole consumer-visible effect `enableDiagnostics()` buys can print a
**negative column**.

*Falsifier*: exhibit a published export that arms labels without arming the print, or any
parameterization of `enableDiagnostics` (a logger argument, a scope object, a returned disposer). Its
arity is 0 and its body is one assignment (`utils.ts:8-10`). Confirmed.

### B-3 · O-8 violation is total: 6 of 6 value exports read or write process-global mutable state — **BLOCKER**

X·P W2 §3b, **O-8 (the anti-latch construction rule)**:

> "No operator reads or writes process-global mutable state. **Arming, memoization, and diagnostics
> are parameters of a parse, never latches.**"

Full inventory against the two module globals (`utils.ts:6  let diagnosticsEnabled`, `utils.ts:95
let collectedDiagnostics`):

| export | `diagnostics.ts` | global | how |
|---|---|---|---|
| `mergeErrorState` | :7 | `diagnosticsEnabled` | **reads** — `utils.ts:33`, `:38` |
| `enableDiagnostics` | :8 | `diagnosticsEnabled` | **writes** — `utils.ts:9` |
| `disableDiagnostics` | :9 | `diagnosticsEnabled` | **writes** — `utils.ts:13` |
| `collectDiagnostic` | :10 | `collectedDiagnostics` | **writes** — `utils.ts:115` |
| `getCollectedDiagnostics` | :11 | `collectedDiagnostics` | **reads** — `utils.ts:139` |
| `clearCollectedDiagnostics` | :12 | `collectedDiagnostics` | **rebinds** — `utils.ts:143` |

**6 of 6. Zero pure functions of arguments.** Not a module *containing* a latch — a module that is
*nothing but* latch operations. **No wrapper can rescue any of them**: a wrapper around a global-read
is still a global-read; O-8 forbids the operator, not the spelling. This is why §5's WRAP column is
empty by construction, not by oversight.

*Falsifier*: name one of the six whose behavior is a function of its arguments alone. Give
`mergeErrorState` the same `(state, label)` twice with the flag flipped between calls and it produces
different `state.expected` — the definition of impurity, and `utils.ts:33` literally.

### B-4 · The "opt-in" buffer is NOT opt-in: 160.8 MiB / 800,004 objects retained with diagnostics never armed — which falsifies README:193 — **BLOCKER**

The module header advertises (`diagnostics.ts:3-5`) *"the **opt-in** collected-diagnostics buffer."*
The code contradicts it. Every other write path in `utils.ts` checks the flag first — `addSuggestion`
`:52`, `addSecondarySpan` `:58`, `reportUnclosedDelimiter` `:71`, `mergeErrorState`'s label seeding
`:33`/`:38`. **`collectDiagnostic` (`utils.ts:102-128`, built `dist/diagnostics-DDazRHgl.js:51-70`)
has no such check.** And `Parser.prototype.recover` calls it **unconditionally**: `parser.ts:666`.

Measured (`--expose-gc`, diagnostics **never** enabled, consumer never touching the diagnostics API):

```
heapUsed delta over 200,000 recovered parses :  160.8 MiB
retained Diagnostic objects                  :  800,004
heap after clearCollectedDiagnostics()       :    0.3 MiB
```

The collapse to 0.3 MiB on clear proves the retention is *exactly* the module-global array
(`utils.ts:95`), not incidental. A second run (1,000 parses of `'a,b,c,d,e'`) produced **4,000** rows
before any diagnostics call was made.

**README.md:191-193 states, of this exact system**: *"TypeScript via `enableDiagnostics()` /
`disableDiagnostics()`. **Zero overhead when off.**"* The claim is **false** for the `recover()` path
— the path README §Error Recovery (`:216-237`) exists to sell, and whose own doc-comment
(`parser.ts:648-651`) advertises the unbounded use: *"enables `many()` / `sepBy()` loops to keep going
— each failed element produces a diagnostic but doesn't halt the overall parse."*

With diagnostics off, each retained row is also **hollow**: `expected: []` (B-1), `suggestions: []`,
`secondarySpans: []` (`utils.ts:120-122`) — measured verbatim
`{"offset":2,"furthestOffset":2,"line":1,"column":2,"expected":[],"suggestions":[],"secondarySpans":[],"found":"b,c,d,e"}`.
What remains (`offset`/`line`/`column`/`found`) is already obtainable from `/core` via
`parseState().furthest` + `getLineAndColumn()`. **In the shipping default the tier delivers nothing
`/core` does not, while leaking.**

X·P kill-rule territory: W2 §3c(AC-3)(d) **arena latch** — *"K-6 kills any candidate whose parse
#100,001 is distinguishable from parse #1."* An uncapped module-global append-only array makes parse
#100,001 distinguishable **by resident memory**, in the default posture, with the feature nominally
off.

*Falsifier*: add `if (!diagnosticsEnabled) return;` at `utils.ts:103` and re-run the 200k probe — if
retained ≠ 0 the diagnosis is wrong. Or point at any cap/eviction on `collectedDiagnostics`
(`utils.ts:95`, `:102-128` — none), or any reset on `parseState()` entry (`parser.ts:40-75` — none;
that absence is why the count is 4,000 and not 4). `popLastDiagnostic` (`utils.ts:146`) shrinks it by
one but is unreachable from every published entry (§1). Confirmed.

### B-5 · The only documented interpreter of the exported `Diagnostic` shape is exported from no entry and is absent from every shipped `.js` — **BLOCKER**

README:229-232 is the module's headline worked example:

```ts
clearCollectedDiagnostics();
stylesheet.parse(cssWithErrors);
const diagnostics = getCollectedDiagnostics();
console.error(formatAllDiagnostics(diagnostics, css));   // ← unreachable
```

and README:235-237 states *"Both TypeScript and Rust expose the same API: `collectDiagnostic()` /
`push_diagnostic()`, `getCollectedDiagnostics()` / `get_collected_diagnostics()`, `formatDiagnostic()`
/ `format_diagnostic()`."*

Measured `typeof` on the published package, root barrel **and** `/diagnostics`:

```
formatDiagnostic      root: undefined   /diagnostics: undefined
formatAllDiagnostics  root: undefined   /diagnostics: undefined
statePrint            root: undefined   /diagnostics: undefined
```

They exist in source (`src/parse/debug.ts:200`, `:235`) and are **declared in a shipped declaration
file** (`dist/debug.d.ts:12` and `:17`, inside `files:["./dist"]`) — but `debug.ts` is not a
`vite.config.ts:14-20` entry, no `package.json:7-33` subpath points at it, and
`grep -l "formatDiagnostic\|formatAllDiagnostics" dist/*.js` returns **nothing**: the bytes are not in
any shipped bundle at all.

**Consumption consequence**: `/diagnostics` ships the *data* (`Diagnostic`, `Suggestion`,
`SecondarySpan`) and withholds the *only interpreter its own documentation names*. A consumer holding
`readonly Diagnostic[]` must hand-roll the renderer, re-deriving the *"center-truncation … ±4 lines of
context with gutter line numbers"* README:203-205 advertises as shipped. Note the example's second
line is independently broken too: `.parse()` returns `undefined` on failure (O-15 PT-07),
indistinguishable from a successful `undefined`.

This is the row that most directly blocks decree I-11 §2: value.js's nine `/css` parser entry points
must render `ParseIssue`s, and the module supplies no renderer.

*Falsifier*: exhibit a resolvable specifier under the published `exports` map yielding
`formatAllDiagnostics`. I enumerated all four entries at runtime; the shipped-`.js` grep is the
stronger falsifier — the bytes are simply absent. Confirmed.

---

## 3. MAJOR / MINOR / INFO

### D-6 · Dual-package hazard on a module whose state is 100 % global — **firing, measured in one process** — **MAJOR**

`package.json:18-22` gives `./diagnostics` both conditions (`import: ./dist/diagnostics.js` →
`diagnostics-DDazRHgl.js`; `require: ./dist/diagnostics.cjs` → `diagnostics-DpUY87_d.cjs`), and
`package.json:6` declares `sideEffects: false`. Two chunk files ⇒ two module instances ⇒ two
`let diagnosticsEnabled`, two `let collectedDiagnostics`.

Measured, both conditions loaded in **one** process:

```
esm.enableDiagnostics === cjs.enableDiagnostics   : false
esm store len : 2      cjs store len : 2
after esm.clearCollectedDiagnostics()  ->  esm: 0   cjs: 2   <- NOT drained
```

For an ordinary stateless library this is a footnote; for a module that is **100 % global state**
(B-3) it is the whole API silently bisecting: `enableDiagnostics()` arms half the parser fleet,
`getCollectedDiagnostics()` sees half the errors, and `clearCollectedDiagnostics()` — B-4's only
mitigation — drains half the leak.

*Falsifier / bound*: show Node collapses the two conditions to one instance for a subpath entry
declaring both. It does not; the measured `false` identity and the undrained CJS store are direct
evidence. A weaker falsifier — "no real consumer mixes conditions" — is refuted by value.js's own
`demo/` Vite graph, which resolves CJS deps alongside ESM. **I upgrade this from the "latent, not
firing" reading**: the prototypes workspace being ESM-only makes it latent *there*, but the hazard is
a property of the published manifest, and it fires the moment any transitive dependency `require`s.

### D-7 · No per-parse scoping: parse #2's diagnostics contain parse #1's bytes — **MAJOR**

`Parser.prototype.parseState` (`parser.ts:40-75`) never touches `collectedDiagnostics`. Measured:

```
clearCollectedDiagnostics(); p.parseState('a,ZZZ'); p.parseState('a,QQQ');
getCollectedDiagnostics() -> 2 rows:   found="ZZZ" line=1 col=2
                                       found="QQQ" line=1 col=2
```

The result of parsing input #2 carries input #1's bytes. There is no scoped alternative: no
`parseWithDiagnostics()`, no state-local journal accessor, no `Symbol.dispose`. The **only** correct
usage is `clearCollectedDiagnostics()` immediately before every parse — which is exactly why
README:229 opens its example with that line, though the README never says it is mandatory and
`diagnostics.ts` carries no per-function documentation (its header, `:1-5`, describes the tier, not
the protocol).

**Against value.js's `/css` contract**: `ParseResult<T>`'s failure arm is `{ readonly ok: false;
readonly diagnostics: readonly [ParseIssue, ...ParseIssue[]] }` (`src/css/types.ts:27`) — a
**non-empty tuple**, returned by all nine parser entry points on the 52-export surface.
`getCollectedDiagnostics()` returns `readonly Diagnostic[]` that may be **empty** (nothing recovered)
*and* may contain a **previous parse's** rows. Neither end of the cardinality contract is
dischargeable without a manual clear, a length check, and a synthesized fallback `ParseIssue` — three
pieces of glue for a contract the module could have satisfied by returning the journal from the parse.

*Falsifier*: exhibit any parse entry point that resets or scopes the store. Grep of `parser.ts` finds
only `collectDiagnostic` (`:666`) and `popLastDiagnostic` (`:674`), both *inside* `recover()`, both
append/pop, neither scoping. Confirmed.

### D-8 · `getCollectedDiagnostics()` has two aliasing semantics from one signature, and `readonly` is erased at every level — **MAJOR**

```
utils.ts:138-140   return collectedDiagnostics;   // the binding itself, not a copy
utils.ts:142-144   collectedDiagnostics = [];     // rebinds; does NOT truncate in place
```

Measured:

```
held = getCollectedDiagnostics();  p.parseState(...)
held tracks growth?  true  (4001 === live)          <- LIVE VIEW
clearCollectedDiagnostics()
held.len = 4001   live.len = 0   same object? false  <- DEAD SNAPSHOT
held.push({})  ->  OK, len 4002                      <- readonly erased at runtime
```

One call site returns a **live, self-updating view** before `clear()` and a **silently stale
snapshot** after — with no type, name, or doc distinguishing them. A consumer that caches the result
across a clear boundary (the natural thing, since D-7 forces clears) reads a frozen past.

The `readonly` is thin at compile time too: the element type is `Diagnostic`, not
`Readonly<Diagnostic>`, and `.expected`/`.suggestions`/`.secondarySpans` are all mutable arrays
(`utils.ts:84-93`). Contrast value.js's `ParseIssue` — `Readonly<{…; expected: readonly string[]; …}>`
(`src/css/types.ts:10-24`), deep-readonly on both wrapper and array. Bridging loses immutability and
forces a clone.

value.js's own consumer gets the ordering right *by luck of style*: `idiom/example.test.ts:249` clears
in `beforeEach` then re-calls `getCollectedDiagnostics()` fresh at `:261`/`:269`. Hoisting that call
above the clear — the obvious refactor — is silently wrong, and neither types nor docs warn.

*Falsifier*: `return [...collectedDiagnostics]` at `:139` kills hazard 1;
`collectedDiagnostics.length = 0` at `:143` kills hazard 2. Both one-token changes, neither present.
Confirmed.

### D-9 · The published type surface has no producers — half the algebra shipped — **MAJOR**

`diagnostics.ts:14` publishes `Suggestion`, `SecondarySpan`, `Diagnostic`. `Diagnostic.suggestions:
Suggestion[]` and `.secondarySpans: SecondarySpan[]` (`utils.ts:90-91`) are therefore *readable*. But
the three functions that populate them — `addSuggestion` (`utils.ts:51`), `addSecondarySpan` (`:57`),
`reportUnclosedDelimiter` (`:66`) — are re-exported by **no entry whatsoever** (§1, verified at
runtime). `dist/diagnostics.d.ts:1` names exactly six values; `addSuggestion` survives only as the
internal alias `f` at `dist/diagnostics-DDazRHgl.js:117`.

A consumer writing a grammar on this library can **read** suggestions but never **emit** one. The only
writers are parse-that's internals: `wrap()` at `parser.ts:419` and the EOF check at `parser.ts:469`.
The vocabulary is closed against extension too — `Suggestion["kind"]` is the 2-member union
`"unclosed-delimiter" | "trailing-content"` (`state.ts:25-29`), so even a consumer who *could* call
`addSuggestion` could not name its own diagnostic class.

The asymmetry is what makes this a consumption defect rather than a scoping choice: publishing a
*read* type whose *write* path is private tells a consumer the capability exists, then withholds it.
For value.js's parser wave — whose whole reason to touch this module is emitting better rejections
(parser-band.md:116) — **the emit half is the half that is missing**.

*Falsifier*: name a published specifier from which `addSuggestion` is importable. All five entries
read whole and all four enumerated at runtime; absent from every one. Confirmed.

### D-10 · The `/diagnostics` surface is asserted by **zero** gate: `export {}` would keep `proof:subpath` GREEN — **MAJOR (semver hygiene)**

`test/subpath-gate.mjs:25-36` iterates `["./core","./diagnostics","./packrat","./utils"]` and checks
only that each entry's `types`/`import`/`require` **files exist**. It then asserts *named exports* for
`./core` (`:45` `Parser`, `:50` `dispatch`) and `./packrat` (`:53` `memoize`) — and **nothing** for
`./diagnostics` or `./utils`. The vitest publish-discipline gate `dist-surface.test.ts:14-15` compares
`src/parse/index.ts` against `dist/index.d.ts` **only**. Grep for `diagnostic` across `test/` +
`scripts/` matches just `subpath-gate.mjs` (the array literal) and `reentrancy.test.ts:18` (a comment).

*Falsifier, and it is decisive*: replace the body of `diagnostics.ts` with `export {}`. The dist entry
still builds (`vite.config.ts:17`), the three files still exist, and `npm run proof:subpath` still
prints GREEN. Nothing in the repository — not `proof:all` (`package.json:49`, nine proofs), not the
vitest suite — would notice all six exports vanishing at a patch bump. For a package at **1.0.0** with
a published exports map, that is the hygiene gap: the tier hardest to test by behaviour (globals, no
return values) is the one with no surface gate at all.

*Scope note against S-3*: S-3 credits the `.d.ts` for faithfully mirroring the `.js`. That remains
true and is a different property — mirroring is enforced by the dts plugin, **intent** is enforced by
nothing.

### D-11 · `isDiagnosticsEnabled` is unreachable — a consumer must clobber the global it is asked to manage — **MINOR**

`utils.ts:16-18` exports it; `debug.ts:6` and `parser.ts:4` import it internally; **no published entry
re-exports it** (§1, all four measured `undefined`). It exists in the ESM chunk only as alias `i`
(`dist/diagnostics-DDazRHgl.js:119`) and is *declared* in a shipped `dist/utils.d.ts:5` that no
exports path serves.

The save/restore posture every well-behaved library wants —

```js
const prev = isDiagnosticsEnabled();   // NOT importable
enableDiagnostics();
try { … } finally { if (!prev) disableDiagnostics(); }
```

— is unavailable. A consumer arming diagnostics must **clobber** its caller's posture; restoring means
guessing, and given B-2 guessing wrong means either losing labels or spraying stderr into someone
else's process. This is why W1.md:487-489 declares that *"a suite that merely disables diagnostics
after use fails for the same structural reason as G-4."* **And it means W1's G-5 cannot be *asserted*
from outside the package** — the harness can only refrain from calling `enableDiagnostics`; it cannot
verify the state, so any transitive dependency that arms defeats the quarantine silently. That is a
weaker gate than W1 believes it has.

It also explains the probe's shape: `parsethat-surface-gaps.mjs:26` measures `enableDiagnostics.length`
(arity) as a *proxy* for scoping precisely because there is no reader to measure directly.

*Falsifier*: import it from any of the five subpaths. Absent from all; enumerated at runtime.

### D-12 · `Diagnostic` is structurally non-conformant with the frozen `ParseIssue` on **all five** EQ-4 fields — **MINOR**

EQ-4 fixes the comparison basis: **`code` / `start` / `end` / `expected[]` / `actual`** — *"not
rendered strings … the rendered string is a non-normative presentation layer outside the algebra."*

| EQ-4 field (`src/css/types.ts:10-24`) | `Diagnostic` (`utils.ts:84-93`) supplies | verdict |
|---|---|---|
| `code` — closed 8-member union | — | **ABSENT**; no field is a classification |
| `start: number` | `offset` *or* `furthestOffset` | **two** positions, no stated invariant relating them |
| `end: number` | — | **ABSENT**; the shape carries points, never spans |
| `expected: readonly string[]` | `expected: string[]` | present — but **`[]` in the default posture** (B-1), and mutable |
| `actual: string \| null` | `found: string` | **WRONG KIND** — 20-char slice, `\n` string-escaped (`utils.ts:113`), no `null` case; a *rendered* value, exactly what EQ-4 rules non-normative |
| — | `line`, `column` | presentation layer; mixed-basis (D-14) |
| — | `suggestions`, `secondarySpans` | `[]` in the default posture |
| deep `Readonly<…>` | mutable at every level (D-8) | freeze mismatch |

*Falsifier*: exhibit a total, information-preserving `Diagnostic → ParseIssue`. It does not exist:
`code` is unrecoverable (nothing classifies) and `end` is unrecoverable because `found` is truncated
at 20 characters, so any error span wider than 20 bytes has lost its extent irretrievably.

The two-position hazard is precisely W2 §3c(AC-2)(c)'s **label/PC drift** — *"provenance and
diagnostics need positions IN the IR; a second table … that can drift from the first."* `offset` (the
recovery checkpoint, `parser.ts:658` → `:666`) and `furthestOffset` (the watermark) are two
independently maintained positions in one record with no asserted relation.

### D-13 · `mergeErrorState` has two published homes and no declared canonical one — **MINOR (semver hygiene)**

Exported from the root barrel (`index.ts:5`) **and** from `/diagnostics` (`diagnostics.ts:7`) — and
measured, the `/diagnostics` surface has **zero** exclusive exports (`diag-not-in-root = []`). value.js's
two consumers split across the two homes:

- `cand-f/color.ts` — from the **root** `"@mkbabb/parse-that"`
- `parsethat-surface-gaps.mjs:13` — from **`"@mkbabb/parse-that/diagnostics"`**

In ESM both resolve to one chunk instance (S-2), so behavior agrees **today**. The hygiene defect is
forward-looking, with precedent in this very neighborhood: `index.ts:10-12` records that the barrel
*has already been narrowed once* — *"The 15 closure-based `*Span` builders were EXCISED in the 1.0.0
cut (S.H2, fold row 48): a zero-consumer surface, deprecated in 0.13.0."* A future minor narrowing the
barrel to make the tiering honest breaks cand-F's import and not the probe's, and nothing says which
path is supported. Compounded by D-10: **two hand-maintained export lists for one surface, with no
gate binding either.** With `sideEffects: false` (`package.json:6`) a tree-shaking bundler already
drops the unused root surface, so the subpath's marginal benefit is confined to bundler-less Node ESM
— where it is real and large (S-6).

*Falsifier*: find a canonicality or deprecation note for either copy. Neither `index.ts:1-14` nor
`diagnostics.ts:1-14` contains one. Confirmed.

### D-14 · The correct line/column algorithm is forked here instead of cured at source — three conventions ship — **MINOR**

`collectDiagnostic` re-implements line/column inline (`utils.ts:107-110`) rather than calling the
`ParserState` method that exists for it (`state.ts:127-134`). Measured this session:

```
"\n".lastIndexOf("\n", -1) = 0            <- the clamping trap
getLineAndColumn(0) on "\n"     = {line:2, column:-1}   (state.ts:127-134)
getLineAndColumn(0) on "\na"    = {line:2, column:-1}
getLineAndColumn(0) on "\n\n\n" = {line:2, column:-1}
getLineAndColumn(0) on "a\nb"   = {line:1, column:0}    <- correct only without a leading newline
```

`state.ts:128` does `src.lastIndexOf("\n", offset - 1)`; at `offset = 0` that is
`lastIndexOf("\n", -1)`, whose position argument is clamped to 0, so on a leading-newline source it
**matches the newline at index 0** → `line = 2`, `column = 0 - 0 - 1 = **-1**`.

**The duplicate is the correct one** — credited as S-5 — but it cures by **forking**, not by fixing.
The broken method stays public: `ParserState` is exported from the root barrel (`index.ts:3`) and from
`/core` (`core.ts:9`), so every `/core` consumer still gets it — and it is on the path B-2's effect
walks (`debug.ts:59` → `statePrint` → `toString()` → the armed `console.error`).

Compounding: **three mutually inconsistent line conventions ship in one library**, measured on
`"aa\nbb"`:

```
state.getLineNumber()          = 0     (state.ts:119-124)
state.getLineAndColumn().line  = 1     (state.ts:127-134)
Diagnostic.line                = 1     (utils.ts:109 — this module's shape)
```

A consumer correlating a `Diagnostic.line` (from `/diagnostics`) against `state.getLineNumber()` (from
`/core`) is off by one on every row, silently — both are `number`, neither documents its basis.
`Diagnostic.column` is 0-based (`utils.ts:110`) while `.line` is 1-based, so the shape is mixed-basis
internally too.

*Falsifier*: `new ParserState("aa\nbb").getLineNumber()` returning `1`. It returns `0` — the
`newlineIndex >= 0 ? … : 0` fallback at `state.ts:122-123`. And grep for `getLineAndColumn` across
`src/`, `test/`, `scripts/` returns exactly `state.ts:127` (definition) and `debug.ts:59` (an
uncompensated call). Confirmed.

### D-15 · `Diagnostic.found` is a lossy presentation string and the shape's only byte-level record — **MINOR**

`utils.ts:113`: `const found = src.slice(furthest, furthest + 20).replace(/\n/g, "\\n")`. Three losses
in one line: a hard **20-character clamp**, an **escaping transform** that makes the string not the
source bytes, and **no extent field anywhere** in `Diagnostic` (`utils.ts:84-93` has `offset`,
`furthestOffset`, `line`, `column` — no `end`, no `length`).

- Against `/css`: cannot serve `ParseIssue.actual: string | null` — no `null` case (it is `""` at EOF,
  which means "nothing left" and "empty match" alike), truncated, escaped.
- Against W2's **COMP-1** (`weave(V, C, P) === S` byte-for-byte on **every** input including malformed)
  and **R-LAW-2** (*"Bytes skipped by recovery enter `C`; they never vanish"*): the bytes `recover()`
  skips are recorded **only** as this clamped, escaped 20-char prefix. The complement cannot be
  reconstructed. There is no carrier here for either law.

*Falsifier*: exhibit a field on `Diagnostic` recording the full skipped extent. `utils.ts:84-93` is the
complete interface; there is none. Confirmed.

### D-16 · `mergeErrorState` leads a double life its signature hides — **INFO**

`label` is optional (`utils.ts:28`), and the internal call sites split heavily against labelling:
`parser.ts:93, 201, 223, 239, 258, 273, 291, 410, 418, 447, 460, 504, 553, 626` pass **no** label; only
`:468` passes one (`"<end of input>"`), and `leaf.ts` passes labels at `:16, 142, 291, 303, 360` while
passing none at `:54, 69`. So one exported function performs two unrelated jobs:

1. **advance the furthest watermark + reset the per-parse diagnostic sub-state** (`utils.ts:29-35`) —
   always meaningful, flag-independent, load-bearing for backtracking correctness;
2. **record an expectation** (`utils.ts:33` tail, `:38-46`) — meaningful only when armed.

Job 1 is parser-internal plumbing no consumer should reach into; job 2 is the only reason a consumer
imports it. Publishing them fused means cand-F's `reject(label)` (`cand-f/color.ts:158-164`) must
invoke watermark bookkeeping to get a label, and gets silence for its trouble (B-1). X·P splits these
into a watermark operator and a *labelled zero-width failure* operator — which W2 §3b names in its
required capability families.

*Falsifier*: show the two jobs cannot be separated. `utils.ts:29-35` and `:36-47` share only the
`state.offset` vs `state.furthest` comparison; the label logic is confined to the
`diagnosticsEnabled && label` sub-expressions and touches nothing the watermark reset needs.
Separable. INFO because it is a design critique with no failing behavior of its own beyond B-1.

---

### INFO-A · **REFUTED** — "the unarmed `suggestions`/`secondarySpans` clears are a hot-path allocation cost on the DEBT-2 reject leg"

`mergeErrorState` `utils.ts:34-35` assigns two fresh arrays on **every** furthest-offset advance,
ungated. They are **provably dead when unarmed**: the only writers are `addSuggestion` `:52-54` and
`addSecondarySpan` `:58-60`, both behind the armed guard, so unarmed the arrays can never be non-empty
and the reassignment can never clear anything. Structurally dead — and parser-band.md:117 (DEBT-2)
makes the reject path its own bench leg, so cost would matter.

Measured on the pure reject path (`any(string('rgb'),string('hsl'),string('oklch'))` vs `'zzz'`,
2,000,000 rejects, no `recover()`, nothing armed):

```
pre-GC churn      : 0.3 MiB   (~0.16 bytes/reject)
post-GC retained  : 0.03 MiB  -> churn, not leak
```

V8's young generation absorbs it entirely. **NOT a defect.** Recorded because a reviewer reading
`utils.ts:34-35` will reach for it and should see it already killed by its own falsifier. (Contrast
B-4, where the allocation is *retained* and the same instinct is correct.)

### INFO-B · **REFUTED** — "the exported `mergeErrorState` signature forces consumer type casts"

The library casts at every internal call site — `as ParserState<unknown>` at `leaf.ts:16,54,69,142,
291,303,360` and ~15 sites in `parser.ts` — which reads as a signature that does not accept
`ParserState<T>`. It does. A `strict` / `moduleResolution: NodeNext` `tsc` probe of cand-F's
`reject()` typed generically, both discarding and using the return value, compiles **exit 0**, no
casts. The consumer ergonomics of the *signature* are fine; the defect is the *semantics* (B-1). **NOT
a defect.**

---

## 4. SUPERLATIVES (L-18 runs both ways)

### S-1 · The diagnostics flag is genuinely two-way — this module is **not** the PT-03 latch class

`disableDiagnostics()` (`utils.ts:12-14`; built `dist/diagnostics-DDazRHgl.js:5-7`) writes
`diagnosticsEnabled = false`. That is a real disarm path, and it distinguishes this module sharply
from its neighbor: O-15 PT-03 measured `PACKRAT_ARMED` with `:678` false, `:722` true, reads at `:682`
and `:714`, and **no assignment back to false anywhere in the bundle** — I re-read all four lines this
session and confirm `resetPackrat` (`packrat-entry:711-718`) clears `MEMO`/`HEADS`/`GROWING`/`LR_STACK`
/`CURRENT_SRC` and **never** touches `PACKRAT_ARMED`.

**I contradict a corpus phrasing here, as the law requires.** W1.md:487-489's G-5 falsifier says *"a
suite that merely disables diagnostics after use fails for the same structural reason as G-4:
process-global state set once."* The *test-hygiene* conclusion is right (a global set once is not
provably restored across cells in one process — D-11 removes the reader that could prove it), but the
*stated reason* is not: unlike `PACKRAT_ARMED`, `diagnosticsEnabled` **does** have a writer back to
false. The module's sin is globality (B-3), not one-wayness. This matters for §5: it is a
RETIRE-for-O-8 module, not a K-6 absorbing-state module — though B-4 shows its *buffer* is K-6 shaped
even though its *flag* is not.

### S-2 · One chunk identity across all three ESM entries — the multi-entry build did not fracture the global

A five-entry Vite lib build (`vite.config.ts:14-20`) could easily have inlined `utils.ts` into each
entry, giving three independent `diagnosticsEnabled` flags. It did not:

```
dist/parse.js:2        import { … } from "./diagnostics-DDazRHgl.js";
dist/diagnostics.js:1  import { c, a, d, e, g, m } from "./diagnostics-DDazRHgl.js";
dist/utils.js:1        import { s, b } from "./diagnostics-DDazRHgl.js";
```

Same specifier, same instance. This is exactly what `parsethat-surface-gaps.mjs:11-13` silently
depends on — it takes `enableDiagnostics`/`disableDiagnostics` from the **root** barrel and
`mergeErrorState` from **`/diagnostics`**, and the DEBT-1 row would be measuring two unrelated flags
had the chunks split. Non-obvious, correct, load-bearing for the corpus's own probe. (The CJS side is a
*separate* instance — that is D-6, a different defect, and it does not diminish this one.)

### S-3 · The shim is honest, minimal, and wildcard-free

14 lines, zero logic, an explicit named list, a header naming the tier and the wave that created it
(`diagnostics.ts:1  // Subpath entry: "@mkbabb/parse-that/diagnostics" (A.W3)`), and — the part that
takes discipline — **no `export *`**. Contrast the root barrel, which ends in `index.ts:14  export *
from "./parsers/index.js"`, a wildcard whose surface no reader can enumerate from the file. The
`.d.ts` is a faithful 2-line mirror (`dist/diagnostics.d.ts:1-2`) and `dist/diagnostics.js:2-9` exports
exactly the six it names — so declared and shipped surfaces cannot *drift*, even though (D-10) nothing
asserts either against intent.

### S-4 · The per-parse half of the design is right, and it is the half worth porting

The furthest-offset watermark, expected-set, suggestions, and secondary spans live on the
**ParserState instance** — `state.ts:43-45` (fields), `state.ts:52` (`furthest` a constructor
parameter) — not on module globals. `utils.ts:20-26` states the reasoning correctly:

> "the Rust port's `state.furthest_offset` model … This makes a parse **reentrant and
> interleave-safe**: a nested `.parse()` mid-rule operates on its own state and cannot corrupt the
> outer parse's error tracking."

This is the `D` of X·P's `(V, C, P, D)` four-part state done correctly one layer down, and it is
genuinely non-trivial — a global `furthest` would corrupt any grammar whose rule bodies invoke
`.parse()`. The merge rule itself (`utils.ts:29-47`: strictly-greater resets, equal accumulates
without duplicates via the `:40` `includes` check) is the semantic content the wave should port.

*Falsifier*: if `furthest` were a module global, two interleaved parses would clobber each other. It is
a constructor field (`state.ts:52`) copied by `clone()` (`state.ts:101-109`). Confirmed.

### S-5 · `collectDiagnostic`'s line/column is correct where the shared helper is not

`collectDiagnostic`'s inline computation (`utils.ts:107-110` — `before = src.slice(0, furthest)` then
`lastIndexOf` on the *slice*) is correct on every case I tried, **including** the leading-newline
offset-0 cases where `ParserState.getLineAndColumn` returns `{line: 2, column: -1}` (D-14, measured).
Slicing first sidesteps the `lastIndexOf(needle, -1)` clamping trap entirely. This module dodged a real
bug in the library it sits under.

*Falsifier*: exhibit an offset where the inline version is wrong. None found. (This is also why D-14 is
MINOR and points *outward* at `state.ts` — but it stays a defect, because the correct algorithm was
forked instead of installed at source, and `/core` consumers still get the broken one.)

### S-6 · `/diagnostics` is the **only** subpath that provably cannot arm the PT-03 latch — its runtime graph is one dependency-free leaf chunk

`dist/diagnostics.js:1` imports from `./diagnostics-DDazRHgl.js` and nothing else. That chunk has
**zero** `import` statements (`grep -c "^import"` → `0`; 3,516 bytes). Meanwhile `dist/core.js:1`,
`dist/packrat.js:1`, and `dist/parse.js:1` all import `./packrat-entry-CS1td-8B.js` — the chunk where
`let PACKRAT_ARMED = false` lives (`:678`).

**Importing `@mkbabb/parse-that/diagnostics` therefore cannot arm the one-way latch, because the module
owning it is never loaded.** For W1's G-4 (latch asserted at entry and exit) and G-5 (diagnostics
quarantined), this is precisely the right import shape.

The layering is also one-directional and correct: `dist/packrat-entry-CS1td-8B.js:1` imports six
symbols **from** the diagnostics chunk (`isDiagnosticsEnabled`, `mergeErrorState`,
`reportUnclosedDelimiter`, `addSuggestion`, `collectDiagnostic`, `popLastDiagnostic`); the diagnostics
chunk imports nothing, from anywhere. Contrast `dist/utils.js:1-2`, which imports from **both**.
core → diagnostics only, no cycle — which is why 14 lines of pure re-export suffice.

**Honest bound, stated so it cannot be over-read**: the isolation is nominal for a real grammar —
`Parser`, `string`, `regex`, `any`, `all` all live in the latch chunk, so any actual parser loads it
anyway (unarmed, but loaded). The property buys the *harness*, not the grammar; and `mergeErrorState`
without a `Parser` does nothing. It is nevertheless the correct architectural placement, and it is the
one thing §5 KEEPs as a constraint.

### S-7 · Publish fidelity is byte-exact and the declared type surface is sound

`dist/diagnostics.js` and `dist/diagnostics.d.ts` in the read-only evidence root are **byte-identical**
to the installed `@mkbabb/parse-that@1.0.0` tarball (sha256 `006aee90…9522` and `2a3ac1be…98c0`), and
the content-hashed chunk name `diagnostics-DDazRHgl.js` matches on both sides. Every O-15 dist
line-cite for this module (PT-01's `:14`) resolves identically against either tree — I re-read the
bytes rather than trusting the cite.

**This narrows, without contradicting, a corpus caveat**: `parser-band.md:132` warns that *"the repo's
own `dist/subpaths/css.js` differs from what 4.0.0 ships … dist-drift, should be ledgered separately."*
That caveat is about **value.js's** dist. For **parse-that's** `/diagnostics` there is no drift, and
the vendored-tarball discipline is not needed to cite this module.

The type surface holds up too: a `moduleResolution: NodeNext`, `strict: true`, `skipLibCheck: false`
probe importing `Diagnostic`, `Suggestion`, `SecondarySpan` **and** `mergeErrorState`,
`collectDiagnostic`, `getCollectedDiagnostics` from `"@mkbabb/parse-that/diagnostics"` compiles with
**exit 0** — despite `dist/diagnostics.d.ts:1` re-exporting from `'./utils.js'`, a specifier whose
runtime and type resolutions point at *different* source modules (`dist/utils.js` is the bundle of
`utils-entry.ts`; `dist/utils.d.ts` is the declaration of `utils.ts`). **The name collision is latent,
not live** — but it is one dts-plugin config change (`rollupTypes`) away from silently resolving
`Diagnostic` to a declaration file that does not export it, and D-10 shows no gate would catch that.

---

## 5. What the X·P dual-target algebra would KEEP, WRAP, or RETIRE

| export | disposition | binding law | note |
|---|---|---|---|
| `mergeErrorState` | **RETIRE**, semantics ported | O-8 (reads global), EQ-4 (B-1) | split per D-16 into a watermark operator + the algebra's *"labelled zero-width failure with named expectations"*. The `:29-47` merge **rule** is kept as algebra; the function is not. |
| `enableDiagnostics` | **RETIRE** | O-8, **R-LAW-3** | probe-fatal (B-2); the algebra has no arming operator by construction — *"diagnostics are parameters of a parse, never latches."* |
| `disableDiagnostics` | **RETIRE** | O-8 | exists only to undo `enableDiagnostics`; with no arming there is nothing to disarm. |
| `collectDiagnostic` | **RETIRE** | O-8, R-LAW-1, K-6 | replaced by `D`'s append-only journal *as a value*; the ungated global push (B-4) is the K-6 arena-latch shape. R-LAW-1 requires *"journal length"* restorable — a module-global array exposes no length handle, and `popLastDiagnostic` (the internal partial answer) is not exported. |
| `getCollectedDiagnostics` | **RETIRE** | O-8, D-8 | `D` is returned **with** the parse result, never fetched from a side channel — `ParseResult`'s failure arm is already `readonly [ParseIssue, ...ParseIssue[]]` (`src/css/types.ts:27`). |
| `clearCollectedDiagnostics` | **RETIRE** | O-8 | a journal that is a value needs no clearing; its lifetime is the parse. |
| type `Diagnostic` | **RETIRE** | EQ-4 | superseded by the frozen `ParseIssue` (`src/css/types.ts:10-24`); no total map exists (D-12). |
| type `Suggestion` | **RETIRE** | EQ-4, D-9 | folds into `ParseIssue.expected` / the `C` complement; its 2-member closed `kind` (`state.ts:25-29`) cannot host the 8-code union. |
| type `SecondarySpan` | **RETIRE** | EQ-4, COMP-1 | an `(offset, label)` pair is a point; `C` carries `(offset, length, kind)` spans, and COMP-1 requires `weave(V,C,P) === S` byte-for-byte, which points cannot satisfy. |
| **the `"./diagnostics"` subpath itself** | **RETIRE** | O-8 | with 6/6 exports retired the subpath has no residue. |

**KEEP: 0 exports. WRAP: 0 exports.** The WRAP column is empty **on principle**: a wrapper would have
to (a) save and restore the arming flag — impossible, no observable (D-11); (b) scope the journal per
parse — impossible, `recover()` writes the global directly and unguarded (B-4, `parser.ts:666`); (c)
present one store across ESM and CJS — impossible, two instances (D-6). Every wrapper seam this module
offers is closed from the inside, and O-8 forbids the *operator*, not the spelling (B-3).

**What is KEPT is semantic, not syntactic** — two things:

1. **The per-parse furthest-offset merge rule** (S-4, `utils.ts:29-47`): reset-on-advance,
   dedupe-on-tie, accumulate at the watermark. This is exactly parser-band.md:116's binding debt and
   exactly the shape `ParseIssue.expected: readonly string[]` was designed for. Keep the algorithm;
   discard the gate (`utils.ts:33`/`:38`) and the global.
2. **The layering** (S-6): the diagnostic tier at the bottom of the graph, importing nothing. Keep as
   an architectural constraint on `D`, so `D` can never acquire a back-edge into the parser.

**Per-candidate consequences** (W2 §3c):

- **AC-1 TAGLESS-TWIN** — `enableDiagnostics` has **no image** under a typed-final signature: a
  signature operation is a function of the interpretation and its arguments; this is a write to
  ambient state. Including it would be W2's *signature leak* failure by definition. The module cannot
  appear in the signature at all.
- **AC-2 CLOSED-IR** — `Diagnostic` cannot be an IR node payload: no `code`, so not a member of any
  closed union (D-12). Its `offset`-vs-`furthestOffset` pair is precisely the predicted **label/PC
  drift** failure (c) — two positions, no invariant, already shipping.
- **AC-3 SPAN-ALGEBRA** — dies on (d) **arena latch** via `collectedDiagnostics`: B-4's measured
  800,004 retained objects make parse #100,001 distinguishable from parse #1 **by resident memory**,
  which **K-6 kills**. Distinct mechanism from PT-03's absorbing flag — per S-1 the flag itself is
  two-way; the *buffer* is the absorbing state.
- **AC-4 SIBLINGS-ORACLE** — the sharpest consequence, and it is a **false-GREEN generator**: with
  diagnostics off (the default), both siblings emit `expected: []` and therefore **agree on `D`
  vacuously**. EQ-4 passes while comparing nothing, and the oracle — the candidate's *only* wall
  against drift (predicted failure (a): *"agreement on 30,000 inputs, divergence on input 30,001"*) —
  is blind on exactly the product the band's #1 debt is about. A candidate built on this module would
  ship a green diagnostics oracle that has never compared a diagnostic.

**Gate consequences already written into the corpus**: W1's **G-5** (W1.md:465-489) exists *because of
this module* — B-2 is its RED baseline, and D-11 shows the gate is weaker than assumed (unverifiable
from outside). Adopting the subpath as-is imports a permanent architectural constraint on every bench
the program will ever run.

---

## 6. Verdict and tally

The 14 lines are well-written (S-3), the tier boundary they draw is real and enforced by the build
(S-3, S-6), the chunk identity behind them is correct (S-2), the per-parse model they front is right
(S-4), one of the functions they publish quietly out-computes the library's own shared helper (S-5),
the subpath is the only one that cannot arm the PT-03 latch (S-6), and the published bytes are exact
(S-7). **The file is not sloppy.**

It is nonetheless **RETIRE-in-whole on the consumption axis**, for five independent blocking reasons,
any one of which suffices:

1. Its flagship export cannot produce a comparable diagnostic in the shipping posture (**B-1**, EQ-4);
2. The switch that would fix that arms an unconditional `console.error`, making R-LAW-3 unpassable
   (**B-2**);
3. Six of six value exports read or write process-global mutable state, so O-8 forbids all of them and
   no wrapper can launder any (**B-3**);
4. The "opt-in" buffer is not opt-in — **160.8 MiB / 800,004 objects retained with diagnostics never
   armed**, falsifying README:193's *"Zero overhead when off"* (**B-4**, K-6);
5. The only documented interpreter of the shape it exports is unreachable and absent from every
   shipped bundle, making README:229-232 unrunnable (**B-5**).

| severity | ids | count |
|---|---|---|
| BLOCKER | D-0 (brief premise false / zero shipped consumers), B-1, B-2, B-3, B-4, B-5 | **6** |
| MAJOR | D-6, D-7, D-8, D-9, D-10 | 5 |
| MINOR | D-11, D-12, D-13, D-14, D-15 | 5 |
| INFO | D-16 | 1 |
| **defects total** | D-0 · B-1…B-5 · D-6…D-16 | **17** |
| SUPERLATIVE | S-1 … S-7 | **7** |
| NOT-defects (falsifier survived) | INFO-A (unarmed clears negligible: 0.03 MiB retained / 2e6 rejects), INFO-B (signature needs no consumer casts: tsc exit 0) | 2 |

**Corpus folded, not re-invented**: O-15 PT-01 (label/`console.error` coupling — cited, dist lines
re-read, never re-armed), PT-03 (latch — cited for S-1/S-6's contrast, never armed), PT-04, PT-07
(`.parse()` `undefined` — cited in B-5 against README:230). W1.md:97-99, :465-489 (G-5 quarantine, its
byte-empty-stderr GREEN, the pasted DEBT-1 RED rows at :470-472). W2 §3b (O-8, EQ-1…EQ-6, COMP-1,
R-LAW-1…5, the `(V,C,P,D)` state, the capability families) and §3c (AC-1…AC-4 predicted failures, K-6).
parser-band.md:114-120 (the five binding debts; DEBT-1 is B-1's frame, DEBT-2 is INFO-A's), :132
(dist-drift caveat — narrowed at S-7, not contradicted).

**Contradicted explicitly where the tree disagrees**: the brief's `src/parsing/` (D-0). O-15's
*"value.js readopted parse-that as published"* — not in the manifest at `tranche-u` HEAD (D-0).
W1.md:487-489's stated *reason* for the G-5 falsifier — `diagnosticsEnabled` is two-way, unlike
`PACKRAT_ARMED`; the conclusion survives, the reason does not (S-1). README:193's *"Zero overhead when
off"* — false on the `recover()` path (B-4). README:235-237's *"Both TypeScript and Rust expose the
same API … `formatDiagnostic()`"* — TypeScript does not (B-5).
