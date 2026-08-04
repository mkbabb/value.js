**SERVED MODEL: `claude-opus-5[1m]`** (Opus 5, 1M context) — sole seat, no subagent. Session 2026-08-04, node v26.0.0 · darwin arm64.

# CHALLENGE · module `diagnostics` · axis **C — CONSUMPTION**

**Target**: `/Users/mkbabb/Programming/parse-that/typescript/src/parse/diagnostics.ts` (14 lines).
**Read whole, read-only**: the target; its sole import `src/parse/utils.ts` (186 lines); `utils.ts`'s
sole import `src/parse/state.ts` (189 lines); the four sibling entries it is priced against
(`index.ts`, `core.ts`, `utils-entry.ts`, `packrat-entry.ts`); `package.json`; the built artifacts
`dist/diagnostics.{js,cjs,d.ts}` + `dist/diagnostics-DDazRHgl.js` + `dist/diagnostics-DpUY87_d.cjs`
+ `dist/parse.js` + `dist/core.js` + `dist/utils.js` + `dist/packrat.js`; the call sites in
`src/parse/parser.ts` (:67, :411, :420, :462, :469, :667, :674) and `src/parse/debug.ts` (:6, :59, :174).
**Downstream read read-only**: `value.js/src/subpaths/css.ts`, `value.js/src/css/types.ts`,
`value.js/package.json`, `value.js/package-lock.json`, and the prototypes workspace
`docs/tranches/V/megatranche/prototypes/css-parser/`.

**STOP-FINDING CHECK — CLEAN.** `/Users/mkbabb/Programming/parse-that-css-totality-p2` does **not**
exist (`ls -d` → `No such file or directory`) and was not created. No `.worktrees/`, no frozen root,
no `~/Documents/Codex` was entered. Evidence root touched read-only; my only write is this file.

**Posture.** Assumed DEFECTIVE until the tree proved otherwise. It proved otherwise in five places
(§4) and failed in twelve (§2/§3). Every row carries severity · `file:line` · falsifier.

---

## 0. The consumption ledger, stated first

| question | measured answer | provenance |
|---|---|---|
| exports on `/diagnostics` | **6 values + 3 types** | `diagnostics.ts:6-14`; `dist/diagnostics.d.ts:1-2` |
| of those, consumed by value.js's **shipped** `src/` | **0 of 9** | `value.js/src/**` — see D-0 |
| of those, consumed by value.js's **prototypes** workspace | **4 of 9** (`mergeErrorState`, `enableDiagnostics`, `getCollectedDiagnostics`, `clearCollectedDiagnostics`) | grep of `prototypes/css-parser/**` |
| `/css` subpath exports (the 52) that touch this module | **0 of 52** | `value.js/src/subpaths/css.ts:1-56` |
| RED-7 rows landing on this file | **2** (both DEBT-1) | `parsethat-surface-gaps.mjs:22-24, :26`; W1.md:468-472 |
| value exports that are pure functions of their arguments | **0 of 6** | `utils.ts:6-144` (D-3) |
| X·P disposition | **KEEP 0 · WRAP 0 · RETIRE 6 + the subpath** | §5 |

---

## D-0 · The consumption premise in the task brief is FALSE against the tree — **BLOCKER (process, not code)**

The brief instructs: *"read value.js `src/parsing/` read-only for the consume edges."*
**`value.js/src/parsing/` does not exist.** It was deleted whole at commit `164343c1`
(*"feat(v4)!: value 4.0 producer surface + packed-surface gate; retire pre-v4 src trees"*) — 19 files
including `src/parsing/index.ts`, `src/parsing/color/color.ts`, `src/parsing/stylesheet/stylesheet.ts`.
The successor is `value.js/src/css/` (7 files), a **hand-rolled** grammar with its own diagnostic
contract (`ParseIssue`, `src/css/types.ts:10-24`) that imports nothing from parse-that.

Further, and decisively for this axis: **`@mkbabb/parse-that` is not a dependency of value.js at all.**

- `value.js/package.json` `dependencies` = `{@mkbabb/glass-ui, @mkbabb/keyframes.js}`; `devDependencies` = 32 entries, none of them parse-that.
- `grep -c "parse-that" value.js/package-lock.json` → **0**.
- `node -e require.resolve('@mkbabb/parse-that', {paths:['/Users/mkbabb/Programming/value.js']})` → **`MODULE_NOT_FOUND`**.
- `value.js/node_modules/@mkbabb/` contains exactly `glass-ui`, `keyframes.js`, `value.js`.
- The only two source mentions of the string in `src/` are *negations*: `src/subpaths/math.ts:2` ("parse-that-**FREE**") and `src/subpaths/transform.ts:4` ("zero parse-that").

**This contradicts the hitherto corpus explicitly**, as L-18 requires me to say. The O-15 letter
asserts (`parse-that/docs/valuejs-evidence-2026-07-27-1.1.0-ask-addendum.md:12`) *"value.js readopted
parse-that as published by owner decree."* At the repo root that readoption **has not landed in the
manifest**. The real consume edge is the *private, non-published* prototypes workspace
`docs/tranches/V/megatranche/prototypes/css-parser/package.json`, whose own header says
*"NOT production. Consumes the PUBLISHED package only"* and which pins `"@mkbabb/parse-that": "1.0.0"`
in its own `node_modules`.

**Consequence for this axis, and it is the whole frame:** on the routing law's stated path
(parser → value → packed release) this module currently has **zero shipped consumers**. Everything
below is therefore an audit of a *prospective* surface — what the module would cost the parser wave
the moment the readoption lands in the manifest — and every severity should be read as
"blocking at adoption," not "breaking in production today."

*Falsifier*: produce any file under `value.js/src/`, `value.js/demo/`, or `value.js/test/` that
imports from `@mkbabb/parse-that` (any subpath), or any `parse-that` entry in `package.json` /
`package-lock.json`. I grepped all four trees plus both manifests; zero hits. If the readoption
landed on a branch other than `tranche-u` HEAD, this row narrows to "not on this branch" — but the
lockfile has 0 hits at HEAD, so the packed release cannot contain it.

*Secondary*: `parsethat-surface-gaps.mjs:4-5` documents itself as runnable *"from this workspace
(it resolves the workspace's node_modules)"* with a command written relative to the **repo root**
(`node docs/tranches/V/megatranche/prototypes/css-parser/parsethat-surface-gaps.mjs`). Run from the
repo root that command cannot resolve `@mkbabb/parse-that` (MODULE_NOT_FOUND, above); it resolves
only with CWD inside `prototypes/css-parser/`. MINOR, corpus-hygiene, cited so a future seat does
not read a resolution failure as a RED row.

---

## 1. What the module actually is

`diagnostics.ts` is a **14-line pure re-export shim**. It defines nothing. It selects 6 of the 13
value exports and 3 of the 3 type exports of `utils.ts` and republishes them behind the
`"./diagnostics"` subpath (`package.json:18-22` → `dist/diagnostics.js` / `.cjs` / `.d.ts`).

Therefore **every consumption property of this module is a property of what it selected**, and the
selection itself is the only decision the file makes. That selection is the object under challenge.

The 13 value exports of `utils.ts`, partitioned by reachability from **any** published entry:

| export | `utils.ts` | on `/diagnostics` | on root barrel | on `/utils` | reachable at all |
|---|---|---|---|---|---|
| `mergeErrorState` | :28 | ✅ :7 | ✅ `index.ts:5` | — | yes (**twice** — D-10) |
| `enableDiagnostics` | :8 | ✅ :8 | ✅ `index.ts:5` | — | yes (twice) |
| `disableDiagnostics` | :12 | ✅ :9 | ✅ `index.ts:5` | — | yes (twice) |
| `collectDiagnostic` | :102 | ✅ :10 | ✅ `index.ts:5` | — | yes (twice) |
| `getCollectedDiagnostics` | :138 | ✅ :11 | ✅ `index.ts:5` | — | yes (twice) |
| `clearCollectedDiagnostics` | :142 | ✅ :12 | ✅ `index.ts:5` | — | yes (twice) |
| `isDiagnosticsEnabled` | :16 | ❌ | ❌ | ❌ | **NO** (D-8) |
| `addSuggestion` | :51 | ❌ | ❌ | ❌ | **NO** (D-7) |
| `addSecondarySpan` | :57 | ❌ | ❌ | ❌ | **NO** (D-7) |
| `reportUnclosedDelimiter` | :66 | ❌ | ❌ | ❌ | **NO** (D-7) |
| `resetErrorState` | :131 | ❌ | ❌ | ❌ | **NO** |
| `popLastDiagnostic` | :146 | ❌ | ❌ | ❌ | **NO** |
| `skipWhitespace` / `skipBlockComments` | :159/:168 | ❌ | ✅ `index.ts:5` | ✅ `utils-entry.ts:6` | yes |

*Falsifier for the "NO" rows*: name a published import path. I read all five entry files whole
(`index.ts:1-14`, `core.ts:1-26`, `diagnostics.ts:1-14`, `packrat-entry.ts:1-5`, `utils-entry.ts:1-14`)
and the five `exports` keys of `package.json:7-33`. The six appear in the built ESM chunk only as
single-letter aliases behind a **content-hashed** filename (`dist/diagnostics-DDazRHgl.js:111-124`:
`f`, `i`, `p`, `r`) — not a supported specifier, and the hash changes every rebuild.

---

## 2. BLOCKERS

### B-1 · The subpath cannot supply an EQ-4-comparable diagnostic in the shipping default posture — **BLOCKER**

`mergeErrorState` gates *all* label capture on the module-private global `diagnosticsEnabled`:

```
utils.ts:33   state.expected = diagnosticsEnabled && label ? [label] : undefined;
utils.ts:38   if (diagnosticsEnabled && label) {
```
(built, verbatim: `dist/diagnostics-DDazRHgl.js:14` and `:18`.)

`mergeErrorState` is the **only** published export anywhere on the package surface that writes
`state.expected`. There is no `Parser.prototype.label`, no `.expected()` combinator — measured, not
assumed: `parsethat-surface-gaps.mjs:25` probes `"label" in Parser.prototype` and W1.md:471 prints
the result `RED  DEBT-1  Parser.prototype.label / .expected combinator      absent`.

X·P W2 §3b, EQ-4, states the disposition in its own words:

> "A candidate whose labels exist only under an armed-diagnostics mode reads as **diagnostics-ABSENT
> and fails** (PT-01)."

So the module's flagship export is, by construction, EQ-4-failing under the default posture — and
the default is the shipping one (`utils.ts:6  let diagnosticsEnabled = false;`).

This is not hypothetical for value.js. The band's **#1 binding debt** is precisely this capability:
`registry/adjudicated/parser-band.md:116` — *"Labelled failure diagnostics. … `expected: ["<named-color>"]`
beats `(?!)`. This is the single clearest thing cand-F does better."* And cand-F's mechanism is this
export verbatim: `prototypes/css-parser/cand-f/color.ts:159-164` builds `reject(label)` around
`mergeErrorState(state, label)`, and cand-F's own type doc concedes the defect at
`cand-f/color.ts:592`: *"Populated only under `enableDiagnostics()`; `[]` otherwise."* Two other
candidates repeat the concession verbatim (`cand-b-dispatch/ast.ts:120`, `cand-s-spec/index.ts:46`,
`idiom/example.ts:209`). **The band's top debt is un-dischargeable through this module as shipped.**

Statically confirmed RED row (no execution needed, no arming): `parsethat-surface-gaps.mjs:20-24`
builds `any(string("red"), reject("<named-color>"))` and parses `"rebeccapurple"`. `string("red")`
fails at offset 0 (`"reb" ≠ "red"`); the reject arm calls `mergeErrorState(s, "<named-color>")` with
`state.offset = 0 > state.furthest = -1` (initial, `state.ts:52`) → takes the `utils.ts:29` branch →
`expected = undefined`. Printed baseline, W1.md:470:
`RED  DEBT-1  cand-F reject() label, diagnostics OFF (shipping default) undefined`.

*Falsifier*: exhibit a published export that writes `state.expected` without consulting
`diagnosticsEnabled`. In the built ESM chunk `state.expected` is assigned at exactly three sites —
`:14` (flag-gated), `:24` (flag-gated, inside the `:18` guard), `:73` (`resetErrorState`, which
*clears* it and is unreachable anyway per §1). None qualifies. Confirmed.

### B-2 · `enableDiagnostics` is the arming switch for an unconditional `console.error`, making R-LAW-3 unpassable — **BLOCKER**

`diagnostics.ts:8` exports `enableDiagnostics`. `dist/diagnostics-DDazRHgl.js:3` shows it is the sole
writer of `diagnosticsEnabled = true` in the bundle. The only thing a consumer can want from it —
labels (B-1) — is inseparable from an I/O effect on the same path:

```
parser.ts:67-69          if (isDiagnosticsEnabled()) {
                             console.error(this.state.toString());
                         }
dist/packrat-entry-CS1td-8B.js:881-883   (identical, built)
```

This sits inside `parseState()` (`parser.ts:54-74`), i.e. on **every failed parse**, not on an
opt-in printing path.

X·P W2 §3b, **R-LAW-3 — diagnostic purity**, in its own words:

> "A diagnostic is a value appended to `D`, never an effect. The probe monkey-patches
> `console.error`/`console.warn` to **throw** over the full corpus — a lowering that prints cannot
> pass (**the PT-01 coupling made unpassable**)."

So importing `enableDiagnostics` from this subpath is a **probe-fatal import** for any X·P lowering:
the one call that turns labels on turns R-LAW-3's monkey-patched `console.error` into a throw over
the whole corpus. There is no scoped posture available — `enableDiagnostics.length === 0`
(`utils.ts:8`, zero parameters), the second statically-confirmed RED row, printed at W1.md:472:
`RED  DEBT-1  enableDiagnostics() is process-global (arity)      0 args`.

The harness law was written **around this file specifically**: W1.md:465-466 defines
**G-5 — DIAGNOSTICS ARE QUARANTINED** ("Zero bench cell runs with diagnostics enabled; the
labelled-failure suite runs in its own process; the bench emits zero `console.error`"), with a
byte-empty-stderr GREEN condition (W1.md:483-486) and W1.md:97-99 ordering the quarantine
structurally. A module that requires its consumer's *bench architecture* to be redesigned around it
is a consumption defect of the first order.

**Aggravation — the printed value is computed by a broken helper.** `state.toString()` →
`statePrint` → `addCursor` → `state.getLineAndColumn()` at `debug.ts:59`. That method is wrong at
offset 0 on a leading-newline source (measured, §3 D-11): it returns `{line: 2, column: -1}` where
the correct answer is `{line: 1, column: 0}`. So the sole consumer-visible effect that
`enableDiagnostics()` buys can print a **negative column**.

*Falsifier*: exhibit a published export that arms labels without arming the print, or any
parameterization of `enableDiagnostics` (a logger argument, a scope object, a returned disposer).
Its arity is 0 and its body is one assignment (`utils.ts:8-10`). Confirmed.

### B-3 · O-8 violation is total: 6 of 6 value exports read or write process-global mutable state — **BLOCKER**

X·P W2 §3b, **O-8 (the anti-latch construction rule)**:

> "No operator reads or writes process-global mutable state. **Arming, memoization, and diagnostics
> are parameters of a parse, never latches.**"

Full inventory of the subpath's six value exports against the two module globals
(`utils.ts:6  let diagnosticsEnabled` and `utils.ts:95  let collectedDiagnostics`):

| export | `diagnostics.ts` | global touched | how |
|---|---|---|---|
| `mergeErrorState` | :7 | `diagnosticsEnabled` | **reads** — `utils.ts:33`, `:38` |
| `enableDiagnostics` | :8 | `diagnosticsEnabled` | **writes** — `utils.ts:9` |
| `disableDiagnostics` | :9 | `diagnosticsEnabled` | **writes** — `utils.ts:13` |
| `collectDiagnostic` | :10 | `collectedDiagnostics` | **writes** — `utils.ts:115` |
| `getCollectedDiagnostics` | :11 | `collectedDiagnostics` | **reads** — `utils.ts:139` |
| `clearCollectedDiagnostics` | :12 | `collectedDiagnostics` | **writes (rebinds)** — `utils.ts:143` |

**6 of 6. Zero pure functions of arguments.** This is the strongest form of O-8 failure the audit
could find: not a module *containing* a latch, a module that is *nothing but* latch operations.

The wave-level consequence is that **no wrapper can rescue any of them.** A wrapper around a
global-read is still a global-read; a wrapper around a global-write still has an absorbing
process-wide effect. O-8 forbids the operator, not the spelling. This is why §5's disposition table
has an empty WRAP column.

*Falsifier*: name one of the six whose behavior is a function of its arguments alone. Give
`mergeErrorState` the same `(state, label)` twice with the flag flipped between calls and it
produces different `state.expected` — that is the definition of impurity, and it is `utils.ts:33`
literally. Confirmed by reading `utils.ts:6-144` whole.

---

## 3. MAJOR / MINOR / INFO

### D-4 · Dual-package hazard on a module whose state is 100 % global — **MAJOR**

`package.json:18-22` gives `./diagnostics` both conditions:

```
"import":  "./dist/diagnostics.js"   → imports ./diagnostics-DDazRHgl.js   (dist/diagnostics.js:1)
"require": "./dist/diagnostics.cjs"  → requires ./diagnostics-DpUY87_d.cjs (dist/diagnostics.cjs:3)
```

Two distinct module instances, two `let diagnosticsEnabled`, two `let collectedDiagnostics`. In a
process that reaches the package on both conditions — trivially common once anything transitively
`require`s it — `enableDiagnostics()` on one side leaves the other side unarmed, and
`getCollectedDiagnostics()` on one side never sees what `collectDiagnostic()` pushed on the other.
For an ordinary stateless library this is a footnote; for a module that is **100 % global state**
(B-3) it is the whole API silently bisecting.

Measured, from the actual consumer workspace:
`require.resolve("@mkbabb/parse-that/diagnostics")` inside `prototypes/css-parser/` →
`…/node_modules/@mkbabb/parse-that/dist/diagnostics.cjs` (the CJS instance), while the workspace's
own `import` statements (`"type": "module"` in its `package.json`) take the ESM instance.

*Falsifier / honest bound*: the prototypes workspace is ESM-only today, so both its consumers
(`parsethat-surface-gaps.mjs:11-13` root+subpath, `cand-f/color.ts:66` root) land on the single ESM
chunk (see S-2) and the hazard is **latent, not firing**. It fires the moment any consumer or
transitive dependency uses `require`. Downgraded from BLOCKER to MAJOR on exactly that bound.
Refutable by removing the `require` condition, or by hoisting the two globals into a realm-shared
cell (`globalThis` symbol) — neither is done.

### D-5 · `getCollectedDiagnostics()` hands out the live array, and `clearCollectedDiagnostics()` silently detaches every outstanding handle — **MAJOR**

```
utils.ts:138-140   export function getCollectedDiagnostics(): readonly Diagnostic[] {
                       return collectedDiagnostics;   // the binding itself, not a copy
                   }
utils.ts:142-144   export function clearCollectedDiagnostics(): void {
                       collectedDiagnostics = [];     // rebinds; does NOT truncate in place
                   }
```

Two consequences, neither expressible in the published types:

1. **`readonly Diagnostic[]` is erased at runtime.** The returned reference *is* the library's
   buffer. `(getCollectedDiagnostics() as Diagnostic[]).push(…)` or `.length = 0` mutates parse-that's
   internal state from consumer code. The type is a compile-time suggestion over a live handle.
2. **Clear-then-read is a silent stale read.** Because `clear()` rebinds rather than truncating, a
   handle taken *before* a clear keeps pointing at the **old** array and stops tracking forever —
   no error, no empty result, just a frozen snapshot that looks live.

value.js's own consumer gets the ordering right *by luck of style*:
`prototypes/css-parser/idiom/example.test.ts:249` clears in `beforeEach`, then re-calls
`getCollectedDiagnostics()` fresh at `:261` and `:269`. Hoisting that call above the clear — the
obvious refactor — is silently wrong, and neither the types nor the docs warn.

*Falsifier*: if `getCollectedDiagnostics` returned `[...collectedDiagnostics]`, hazard 1 vanishes;
if `clearCollectedDiagnostics` did `collectedDiagnostics.length = 0`, hazard 2 vanishes. Both are
one-token changes and neither is present — read `utils.ts:139` and `:143`, and the built forms at
`dist/diagnostics-DDazRHgl.js:78` and `:81`. Confirmed.

### D-6 · `collectDiagnostic` is NOT flag-gated — the "opt-in" buffer grows unbounded in the default posture while collecting nothing — **MAJOR**

The module header advertises (`diagnostics.ts:3-5`):

> "the **opt-in** collected-diagnostics buffer and its enable/disable toggles"

The code contradicts it. Every other write-path in `utils.ts` checks the flag first —
`addSuggestion` `:52`, `addSecondarySpan` `:58`, `reportUnclosedDelimiter` `:71`. `collectDiagnostic`
(`utils.ts:102-128`, built `dist/diagnostics-DDazRHgl.js:51-70`) **has no such check**: it computes
line/column, slices `found`, and pushes unconditionally.

With diagnostics off — the shipping default — every pushed `Diagnostic` is mostly hollow:
`expected: []` (because `mergeErrorState` never wrote it, B-1), `suggestions: []`, `secondarySpans: []`
(`utils.ts:120-122`). Only `offset`/`furthestOffset`/`line`/`column`/`found` carry signal.

The growth path is real and reachable from the public API: `Parser.recover()` calls
`collectDiagnostic` on **every** failed element (`parser.ts:667`), and its own doc-comment
(`parser.ts:655-656`) advertises exactly the unbounded use — *"enables `many()` / `sepBy()` loops to
keep going — each failed element produces a diagnostic but doesn't halt the overall parse."* Nothing
in the surface bounds the buffer; the only brake is the consumer remembering to call
`clearCollectedDiagnostics()`.

This is also X·P kill-rule territory: W2 §3c(AC-3)(d) **arena latch** — *"K-6 kills any candidate
whose parse #100,001 is distinguishable from parse #1."* A module-global append-only array with no
cap makes parse #100,001 distinguishable from parse #1 **by resident memory**, in the default
posture, with the feature nominally off.

*Falsifier*: point at a `diagnosticsEnabled` check inside `collectDiagnostic`, or at any internal
cap/eviction on `collectedDiagnostics`. Read `utils.ts:102-128` and `:95` — neither exists.
`popLastDiagnostic` (`utils.ts:146`) shrinks it by one but is unreachable from every published entry
(§1). Confirmed. *Mitigating*: `clearCollectedDiagnostics` **is** exported, so this is curable by a
disciplined consumer — hence MAJOR, not BLOCKER.

### D-7 · The published type surface has no producers — half the algebra shipped — **MAJOR**

`diagnostics.ts:14` publishes `Suggestion`, `SecondarySpan`, `Diagnostic`. `Diagnostic.suggestions:
Suggestion[]` and `.secondarySpans: SecondarySpan[]` (`utils.ts:90-91`) are therefore *readable* by
any consumer. But the three functions that populate them —

```
utils.ts:51   addSuggestion(state, suggestion)
utils.ts:57   addSecondarySpan(state, offset, label)
utils.ts:66   reportUnclosedDelimiter(state, openText, openOffset)
```

— are re-exported by **no entry whatsoever** (§1 table). Confirmed against the build:
`dist/diagnostics.d.ts:1` names exactly six values; `addSuggestion` survives only as the internal
alias `f` at `dist/diagnostics-DDazRHgl.js:117`.

So a consumer writing a grammar on this library can **read** suggestions but can never **emit** one.
The only writers are parse-that's own internals: `wrap()` at `parser.ts:419` (unclosed delimiter)
and the EOF check at `parser.ts:469` (trailing content). And the vocabulary is closed against
extension too — `Suggestion["kind"]` is the 2-member union
`"unclosed-delimiter" | "trailing-content"` (`state.ts:26`), so even a consumer that could call
`addSuggestion` could not name its own diagnostic class.

The asymmetry is what makes this a consumption defect rather than a scoping choice: publishing a
*read* type whose *write* path is private tells a consumer the capability exists, then withholds it.
For value.js's parser wave — whose whole reason to touch this module is emitting better rejections
(parser-band.md:116) — the emit half is the half that is missing.

*Falsifier*: name a published specifier from which `addSuggestion` is importable. All five entries
read whole; none exports it. Confirmed.

### D-8 · `isDiagnosticsEnabled` is unreachable — a consumer must clobber the global it is asked to manage — **MINOR**

`utils.ts:16-18` exports `isDiagnosticsEnabled`; `debug.ts:6` and `parser.ts:4` import it
internally; **no published entry re-exports it** (§1). It exists in the ESM chunk only as alias `i`
(`dist/diagnostics-DDazRHgl.js:119`).

Consequence: the save/restore posture every well-behaved library wants —

```js
const prev = isDiagnosticsEnabled();   // NOT importable
enableDiagnostics();
try { … } finally { if (!prev) disableDiagnostics(); }
```

— is unavailable. A consumer arming diagnostics must **clobber** whatever posture its caller had, and
restoring means guessing. Given B-2 (arming couples `console.error`), guessing wrong means either
losing labels or spraying stderr into someone else's process. This is exactly why W1.md:487-489
declares that *"a suite that merely disables diagnostics after use fails for the same structural
reason as G-4: process-global state set once"* — the missing reader is what makes disciplined
restore impossible.

It also explains the shape of the RED probe: `parsethat-surface-gaps.mjs:26` measures
`enableDiagnostics.length` (arity) as a proxy for scoping precisely because there is no reader to
measure directly.

*Falsifier*: import it from any of the five subpaths. `index.ts:5`, `core.ts:7-26`,
`diagnostics.ts:6-14`, `packrat-entry.ts:5`, `utils-entry.ts:6-14` — absent from all. Confirmed.

### D-9 · `Diagnostic` is structurally non-conformant with value.js's frozen `ParseIssue` on 3 of EQ-4's 5 compared fields — **MINOR**

X·P W2 §3b EQ-4 fixes the comparison basis: **`code` / `start` / `end` / `expected[]` / `actual`** —
*"not rendered strings … the rendered string is a non-normative presentation layer outside the algebra."*

value.js's frozen contract (`src/css/types.ts:10-24`):

```ts
export type ParseIssue = Readonly<{
    code: "css_syntax" | "trailing_input" | "keyframe_selector_invalid" | "color_context_required"
        | "syntax_descriptor_invalid" | "syntax_mismatch" | "animation_option_invalid" | "timeline_option_invalid";
    start: number; end: number; expected: readonly string[]; actual: string | null;
}>;
```

parse-that's `Diagnostic` (`utils.ts:84-93`): `{offset, furthestOffset, line, column, expected,
suggestions, secondarySpans, found}`.

| EQ-4 field | `Diagnostic` supplies | verdict |
|---|---|---|
| `code` | — | **ABSENT**; no field is a closed classification |
| `start` | `offset` / `furthestOffset` | present-ish, but **two** positions with no stated invariant relating them |
| `end` | — | **ABSENT**; the shape carries points, never spans |
| `expected[]` | `expected` | present — but empty in the default posture (B-1) |
| `actual` | `found` | **WRONG KIND** — a 20-char slice with `\n` string-escaped (`utils.ts:113`), i.e. a *rendered* value, exactly what EQ-4 rules non-normative |

*Falsifier*: exhibit a total, information-preserving `Diagnostic → ParseIssue`. It does not exist:
`code` is unrecoverable from any field (nothing classifies), and `end` is unrecoverable because
`found` is **truncated at 20 characters** (`utils.ts:113  src.slice(furthest, furthest + 20)`), so any
error span wider than 20 bytes has lost its extent irretrievably. Not total. Confirmed.

Note the two-position hazard is precisely the drift class W2 §3c(AC-2)(c) names — *"label/PC drift —
provenance and diagnostics need positions IN the IR; a second table … that can drift from the first."*
`offset` (the recovery checkpoint, `parser.ts:658` → `:667`) and `furthestOffset` (the watermark) are
two independently maintained positions in one record with no asserted relation.

### D-10 · `mergeErrorState` has two published homes and no declared canonical one — **MINOR (semver hygiene)**

It is exported from the root barrel (`index.ts:5`) **and** from `/diagnostics` (`diagnostics.ts:7`),
and value.js's two consumers split across them:

- `prototypes/css-parser/cand-f/color.ts:66` — from the **root** `"@mkbabb/parse-that"`
- `prototypes/css-parser/parsethat-surface-gaps.mjs:13` — from **`"@mkbabb/parse-that/diagnostics"`**

In ESM both resolve to one chunk instance (S-2), so behavior agrees **today**. The hygiene defect is
forward-looking and has precedent in this very file's neighborhood: `index.ts:10-12` records that the
barrel *has already been narrowed once* — *"The 15 closure-based `*Span` builders were EXCISED in the
1.0.0 cut (S.H2, fold row 48): a zero-consumer surface, deprecated in 0.13.0."* A future minor that
narrows the barrel again to make the tiering honest breaks the `cand-f` import and not the probe's,
and nothing in the tree says which path is supported. The subpath header (`diagnostics.ts:1-5`)
claims the *tier* without claiming *exclusivity*; `index.ts:5` carries no deprecation marker.

*Falsifier*: find a canonicality or deprecation note for either copy. Neither `index.ts:1-14` nor
`diagnostics.ts:1-14` contains one. Confirmed. (Same duplication applies to the other five, but
`mergeErrorState` is the one with two live consumers disagreeing, so it is the row that will bite.)

### D-11 · The correct line/column algorithm is duplicated here instead of fixed at source — `/core` consumers keep the broken one — **MINOR**

`collectDiagnostic` re-implements line/column inline (`utils.ts:107-110`) rather than calling the
`ParserState` method that already exists for it (`state.ts:127-134`). I ran the two algorithms as
pure arithmetic over an 11-string × all-offsets corpus (52 pairs; scratchpad only, **no parse-that
import, nothing armed**):

```
checked 52 (src,offset) pairs; divergences = 3
DIVERGE "\n"     0  A=[1,0]  B=[2,-1]
DIVERGE "\na"    0  A=[1,0]  B=[2,-1]
DIVERGE "\n\n\n" 0  A=[1,0]  B=[2,-1]
```
A = `collectDiagnostic`'s inline copy; B = `ParserState.getLineAndColumn`.

**The duplicate is the correct one.** `getLineAndColumn` does `src.lastIndexOf("\n", offset - 1)`
(`state.ts:128`); at `offset = 0` that is `lastIndexOf("\n", -1)`, and per spec the position argument
is clamped to 0, so on a leading-newline source it **matches the newline at index 0** —
verified directly: `node -e 'console.log("\n".lastIndexOf("\n",-1))'` → `0`. Result: `line = 2`,
`column = 0 - 0 - 1 = **-1**`.

So this module dodged a real bug — credited as S-5 — but dodged it by **forking rather than curing**.
The broken method stays public: `ParserState` is exported from the root barrel (`index.ts:3`) and
from `/core` (`core.ts:9`), so every `/core` consumer still gets `getLineAndColumn`. Worse, it is on
the path this module's own B-2 effect walks: `debug.ts:59` calls it inside `addCursor`, which
`statePrint` → `state.toString()` → the armed `console.error` at `parser.ts:68` reaches. The one
observable thing `enableDiagnostics()` buys can print `column: -1`.

*Falsifier*: exhibit an offset where the two agree at 0 on a leading-newline source, or a caller of
`getLineAndColumn` outside `debug.ts:59` that compensates. Neither exists — grep for
`getLineAndColumn` across `src/`, `test/`, `scripts/` returns exactly `state.ts:127` (the definition)
and `debug.ts:59` (the uncompensated call). Confirmed.

### D-12 · `mergeErrorState` leads a double life its signature hides — **INFO**

`label` is optional (`utils.ts:28  label?: string`), and the internal call sites split 3-to-1 against
labelling: `parser.ts:411`, `:420`, `:462` pass **no** label; only `:469` passes one
(`"<end of input>"`). So one exported function performs two unrelated jobs:

1. **advance the furthest watermark + reset the per-parse diagnostic sub-state** (`utils.ts:29-35`) —
   always meaningful, flag-independent, and load-bearing for backtracking correctness;
2. **record an expectation** (`utils.ts:33 tail`, `:38-46`) — meaningful only when armed.

Job 1 is arguably parser-internal plumbing that no consumer should be reaching into; job 2 is the
only reason a consumer imports it. Publishing them fused means cand-F's `reject(label)`
(`cand-f/color.ts:159-164`) must invoke watermark bookkeeping to get a label, and gets silence for
its trouble (B-1). X·P would split these into a watermark operator and a *labelled zero-width
failure* operator — which W2 §3b names explicitly in the required capability families: *"labelled
zero-width failure with named expectations."*

*Falsifier*: show the two jobs cannot be separated. `utils.ts:29-35` and `:36-47` share only the
`state.offset` vs `state.furthest` comparison; the label logic is confined to the `diagnosticsEnabled
&& label` sub-expressions and touches nothing the watermark reset needs. Separable. INFO because it
is a design critique with no failing behavior of its own beyond B-1.

---

## 4. SUPERLATIVES (L-18 runs both ways)

### S-1 · The diagnostics flag is genuinely two-way — this module is **not** the PT-03 latch class

`disableDiagnostics()` (`utils.ts:12-14`; built `dist/diagnostics-DDazRHgl.js:5-7`) writes
`diagnosticsEnabled = false`. That is a real disarm path, and it distinguishes this module sharply
from its neighbor: O-15 PT-03 measured `PACKRAT_ARMED` with `:678` false, `:722` true, reads at `:682`
and `:714`, and **no assignment back to false anywhere in the bundle** — `resetPackrat()` leaves the
process at 139.3 ns/parse against an unarmed 93.9.

**I contradict a corpus phrasing here, as the law requires.** W1.md:487-489's G-5 falsifier says *"a
suite that merely disables diagnostics after use fails for the same structural reason as G-4:
process-global state set once."* The *test-hygiene* conclusion is right (a global set once is not
provably restored across cells in one process — D-8 removes the reader that could prove it), but the
*stated reason* is not: unlike `PACKRAT_ARMED`, `diagnosticsEnabled` **does** have a writer back to
false. The module's sin is globality (B-3), not one-wayness. Getting this distinction right matters
for §5's disposition: this is a RETIRE-for-O-8 module, not a K-6 absorbing-state module.

*Falsifier*: grep the ESM chunk for a write of `diagnosticsEnabled = false` →
`dist/diagnostics-DDazRHgl.js:1` (initializer) and `:6` (`disableDiagnostics` body). Present.

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
if the chunks had split. Non-obvious, correct, and load-bearing for the corpus's own probe.

*Falsifier*: if any entry declared its own `let diagnosticsEnabled`, grep of `dist/*.js` for that
token would hit more than the one chunk. It hits only `diagnostics-DDazRHgl.js:1`. (The CJS side is
a *separate* instance — that is D-4, a different defect, and it does not diminish this one.)

### S-3 · The shim is honest, minimal, and wildcard-free

14 lines, zero logic, an explicit named list, a header naming the tier and the wave that created it
(`diagnostics.ts:1  // Subpath entry: "@mkbabb/parse-that/diagnostics" (A.W3)`), and — the part that
takes discipline — **no `export *`**. Contrast the root barrel, which ends in
`index.ts:14  export * from "./parsers/index.js"`, a wildcard whose surface no reader can enumerate
from the file. The `.d.ts` is a faithful 2-line mirror (`dist/diagnostics.d.ts:1-2`), so the declared
surface and the shipped surface cannot drift.

The tiering claim is real too: `core.ts:3-5` promises *"A consumer that imports only this never pulls
the diagnostics accumulator"* and the build honors it — `dist/core.js:1` imports only
`packrat-entry-CS1td-8B.js`, never the diagnostics chunk. The subpath split does what it says.

*Falsifier*: find an unenumerable re-export in `diagnostics.ts`, or a `.d.ts` naming something the
`.js` does not export. `dist/diagnostics.js:2-9` exports exactly the six of `dist/diagnostics.d.ts:1`.
Clean.

### S-4 · The per-parse half of the design is right, and it is the half worth porting

The furthest-offset watermark, expected-set, suggestions, and secondary spans live on the
**ParserState instance** — `state.ts:43-45` (fields) and `state.ts:52` (`furthest` as a constructor
parameter) — not on module globals. `utils.ts:20-26` states the reasoning explicitly and correctly:

> "the Rust port's `state.furthest_offset` model … This makes a parse **reentrant and
> interleave-safe**: a nested `.parse()` mid-rule operates on its own state and cannot corrupt the
> outer parse's error tracking."

This is the `D` of X·P's `(V, C, P, D)` four-part state (W2 §3b) done correctly one layer down, and
it is genuinely non-trivial — a global `furthest` would corrupt any grammar whose rule bodies invoke
`.parse()`. The merge rule itself (`utils.ts:29-47`: strictly-greater resets, equal accumulates
without duplicates via the `:40` `includes` check) is the semantic content the wave should port.

*Falsifier*: if `furthest` were a module global, two interleaved parses would clobber each other.
It is a constructor field (`state.ts:52`) copied by `clone()` (`state.ts:101-109`). Confirmed.

### S-5 · `collectDiagnostic`'s line/column is correct where the shared helper is not

Measured over 52 `(src, offset)` pairs (D-11): `collectDiagnostic`'s inline computation
(`utils.ts:107-110`, `before = src.slice(0, furthest)` then `lastIndexOf` on the *slice*) is correct
on every pair, including the three leading-newline offset-0 cases where the "obvious"
`ParserState.getLineAndColumn` returns `{line: 2, column: -1}`. Slicing first sidesteps the
`lastIndexOf(needle, -1)` clamping trap entirely.

*Falsifier*: exhibit a pair where the inline version is wrong. Over the corpus
`["", "a", "\n", "a\nb", "\na", "a\n", "a\n\nb", "\n\n\n", "abc\ndef\nghi", "\r\na", "xxxxx\nyyyyy"]`
× all offsets, zero. (This superlative is also why D-11 is MINOR and points *outward* at `state.ts`
rather than at this module — but it stays a defect, because the correct algorithm was forked instead
of installed at source, and `/core` consumers still get the broken one.)

---

## 5. What the X·P dual-target algebra would KEEP, WRAP, or RETIRE

W2 §3b fixes the laws; applying them to this module's nine exports:

| export | disposition | binding law | note |
|---|---|---|---|
| `mergeErrorState` | **RETIRE**, semantics ported | O-8 (reads global), EQ-4 (B-1) | split per D-12 into a watermark operator + the algebra's *"labelled zero-width failure with named expectations"* (§3b capability list). The `:29-47` merge **rule** is kept as algebra; the function is not. |
| `enableDiagnostics` | **RETIRE** | O-8, **R-LAW-3** | probe-fatal (B-2); the algebra has no arming operator by construction — *"diagnostics are parameters of a parse, never latches."* |
| `disableDiagnostics` | **RETIRE** | O-8 | exists only to undo `enableDiagnostics`; with no arming there is nothing to disarm. |
| `collectDiagnostic` | **RETIRE** | O-8, R-LAW-4, K-6 | replaced by `D`'s append-only journal *as a value*; the ungated global push (D-6) is the K-6 arena-latch shape (W2 §3c AC-3(d)). |
| `getCollectedDiagnostics` | **RETIRE** | O-8, D-5 | `D` is returned **with** the parse result, not fetched from a side channel — `ParseResult`'s failure arm is already `readonly [ParseIssue, ...ParseIssue[]]` (`src/css/types.ts:27`). |
| `clearCollectedDiagnostics` | **RETIRE** | O-8 | a journal that is a value needs no clearing; its lifetime is the parse. |
| type `Diagnostic` | **RETIRE** | EQ-4 | superseded by the frozen `ParseIssue` (`src/css/types.ts:10-24`); no total map exists (D-9). |
| type `Suggestion` | **RETIRE** | EQ-4, D-7 | folds into `ParseIssue.expected` / the `C` complement; its 2-member closed `kind` (`state.ts:26`) cannot host the 8-code union. |
| type `SecondarySpan` | **RETIRE** | EQ-4, COMP-1 | a `(offset, label)` pair is a point; the algebra's `C` carries `(offset, length, kind)` spans, and COMP-1 requires `weave(V,C,P) === S` byte-for-byte, which points cannot satisfy. |
| **the `"./diagnostics"` subpath itself** | **RETIRE** | O-8 | with 6/6 exports retired the subpath has no residue. |

**KEEP: 0 exports. WRAP: 0 exports.** The WRAP column is empty on principle, not oversight: O-8
forbids the *operator*, and a wrapper over a process-global read is still a process-global read
(B-3). The only thing kept is *semantic*, not syntactic — the per-parse furthest-offset merge rule
(S-4), which becomes an algebra law rather than an exported function.

**Per-candidate consequences** (W2 §3c):

- **AC-1 TAGLESS-TWIN** — `enableDiagnostics` has **no image** under a typed-final signature: a
  signature operation is a function of the interpretation and its arguments, and this is a write to
  ambient state. Including it would be W2's *signature leak* failure (a) by definition. The module
  therefore cannot appear in the signature at all.
- **AC-2 CLOSED-IR** — `Diagnostic` cannot be an IR node payload: it carries no `code`, so it is not
  a member of any closed union (D-9). And its `offset`-vs-`furthestOffset` pair is precisely the
  predicted **label/PC drift** failure (c) — two positions, no invariant, already shipping.
- **AC-3 SPAN-ALGEBRA** — dies on (d) **arena latch** via `collectedDiagnostics`: an unbounded
  append-only global (D-6) makes parse #100,001 distinguishable from parse #1 by resident memory,
  which **K-6 kills**. Note this is a distinct mechanism from PT-03's absorbing flag; per S-1 the
  flag itself is two-way.
- **AC-4 SIBLINGS-ORACLE** — the sharpest consequence, and it is a **false-GREEN generator**: with
  diagnostics off (the default), both siblings emit `expected: []` and therefore **agree on `D`
  vacuously**. EQ-4 passes while comparing nothing, and the oracle — the candidate's *only* wall
  against drift (predicted failure (a): *"agreement on 30,000 inputs, divergence on input 30,001"*)
  — is blind on exactly the product the band's #1 debt (parser-band.md:116) is about. A candidate
  built on this module would ship a green diagnostics oracle that has never compared a diagnostic.

**Gate consequences already written into the corpus**: W1's **G-5** (W1.md:465-489, byte-empty
`bench.stderr` + a separately-processed labelled-failure suite) exists *because of this module* —
B-2 is its RED baseline. Adopting the subpath as-is therefore imports a permanent architectural
constraint on every bench the program will ever run.

---

## 6. Verdict

The 14 lines are well-written (S-3), the tier boundary they draw is real and enforced by the build
(S-3), the chunk identity behind them is correct (S-2), the per-parse model they front is right
(S-4), and one of the functions they publish quietly out-computes the library's own shared helper
(S-5). The file is not sloppy.

It is nonetheless **RETIRE-in-whole on the consumption axis**, for three independent blocking
reasons, any one of which suffices:

1. Its flagship export cannot produce a comparable diagnostic in the shipping posture (**B-1**, EQ-4);
2. The switch that would fix that arms an unconditional `console.error`, making R-LAW-3 unpassable
   (**B-2**);
3. Six of six value exports read or write process-global mutable state, so O-8 forbids all of them
   and no wrapper can launder any (**B-3**).

The consumption picture underneath is sparser still: **0 of the 52 `/css` exports** touch this module,
**0 of value.js's shipped `src/`** imports it, and the package is not in value.js's manifest or
lockfile at all (**D-0**) — so the correct reading is not "a defective dependency" but "a
prospective dependency that should not be adopted in this shape." The 2 RED rows the corpus already
prints against it (W1.md:470, :472) are not incidental findings; they are the two halves of B-1 and
B-2, and the harness law (G-5) was written around them before this challenge began.

**Counts: 12 defects (3 BLOCKER · 4 MAJOR · 4 MINOR · 1 INFO) · 5 superlatives · 1 explicit corpus
contradiction (S-1 vs W1.md:487-489) · 1 corpus-vs-tree contradiction (D-0 vs O-15's "readopted"
claim) · STOP-check clean.**

---

*Read-only against `/Users/mkbabb/Programming/parse-that` (main checkout) and `/Users/mkbabb/Programming/value.js` @ `tranche-u`. No worktree, frozen root, or Codex path entered. No browser tooling. No bench run; nothing armed — `enableDiagnostics()` was never called and `memoize()` was never reached, so the packrat latch was not touched. The only execution was a 20-line pure-arithmetic line/column differential in the session scratchpad (D-11/S-5), which imports nothing. Sole write: this file.*
