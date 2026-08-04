claude-opus-5[1m]

# CHALLENGE — parse-that module `utils` · axis **L (LIBRARY)**

**Subject**: `/Users/mkbabb/Programming/parse-that/typescript/src/parse/utils.ts` (186 lines)
**Imports read whole**: `src/parse/state.ts` (189) — the module's *only* import, and it is type-only.
**Context read whole (not scope, cited as evidence)**: `parser.ts` (711), `leaf.ts` (399), `debug.ts` (383), `lazy.ts` (43), `packrat.ts` (488, targeted), `diagnostics.ts` (14), `utils-entry.ts` (14), `index.ts` (14), `core.ts` (26), `packrat-entry.ts` (5), `tsconfig.json`, `package.json`, `test/**`, `scripts/**`, and the published `dist/` chunks.
**Date**: 2026-08-04 · **Posture**: module assumed DEFECTIVE until the tree proved otherwise; each claim carries its own falsifier and I record where the falsifier won (S-3).

**Law compliance**: `/Users/mkbabb/Programming/parse-that` treated as read-only evidence (main checkout only; no `.worktrees/`, no frozen root, no `~/Documents/Codex` entered). `/Users/mkbabb/Programming/parse-that-css-totality-p2` **verified ABSENT** (`ls` → `No such file or directory`) — no STOP finding. My only write is this file. No browser tooling. **Nothing armed**: `enableDiagnostics()` was never called and `memoize()`/`mergeMemos()` were never constructed in any process I started, so `PACKRAT_ARMED` (packrat.ts:156) stayed `false` — the one-way latch (PT-03) is untouched. The single process I ran was a boundary probe of two pure scanners, not a bench.

**Verdict**: **20 defects — 2 BLOCKER, 9 MAJOR, 7 MINOR, 2 INFO — and 6 superlatives.** The module is small enough (186 lines) that its size is not the problem; its *concern count* is. The two BLOCKERs are both in the collected-diagnostics tier and both are invisible to the test suite, which does not touch it at all.

---

## 0. Hitherto corpus — folded, verified, and where I contradict it

Every O-15 dist cite reproduced exactly against the shipped bundle. I fold rather than re-derive, and extend only where the bytes go further than the letter did.

| Row | O-15 claim | Verified at | Status |
|---|---|---|---|
| **PT-01** | `label` is a no-op unless diagnostics armed | `dist/diagnostics-DDazRHgl.js:14` (`state.expected = diagnosticsEnabled && label ? [label] : void 0`) ≡ `utils.ts:33`; also `:18` ≡ `utils.ts:38` | **CONFIRMED**, and **EXTENDED** by L-U-04 (the cost/information inversion is not in O-15) |
| **PT-01** | arming couples an unconditional `console.error` | `dist/packrat-entry-CS1td-8B.js:881-883` ≡ `parser.ts:67-69` | **CONFIRMED at the exact line** |
| **PT-03** | `PACKRAT_ARMED` one-way latch, `:678` false / `:722` true / read `:682`,`:714` | all four dist lines land; source `packrat.ts:156` init, `:290` sole `= true`, reads `:217`/`:266`; `grep -n "PACKRAT_ARMED *="` → exactly 2 hits, no reset | **CONFIRMED**; **not sited in `utils`** — see L-U-19, and see S-4 where `utils` gets the same construction *right* |
| **PT-04** | lazy depth 7,761 / `RangeError` at 7,762 | `utils.ts` contains **no recursion** (`while` at `:162`, `:171`; no self-calls) | **NOT SITED HERE**; its allocation-axis analogue is L-U-11 (a ceiling that is *absent*, not low) — L-U-20 |
| **PT-07** | 5/5 non-string inputs throw a raw `TypeError` | **MEASURED CONTRADICTION** — a 6th case, `src = 42`, returns **NO-THROW / silent no-op** through `skipWhitespace`. See **L-U-10** | **CONTRADICTED (extended)** — the "5/5 throws" generalization does not hold across the `/utils` subpath |
| **PT-07** | `.parse()` returns `undefined` on failure, ambiguous | `parser.ts:77-79` `parse(val) { return this.parseState(val).value; }` — no `isError` surfacing | **CONFIRMED**, upstream of `utils`; L-U-10 shows the boundary invariant must also cover `/utils`, not just `.parse()` |

**X·P wave specs folded** (`docs/tranches/X/parse-that/waves/`):
- `W2.md:281` **R-LAW-3** — "A diagnostic is a value appended to `D`, never an effect." → L-U-04.
- `W2.md:266` **EQ-4** — "A candidate whose labels exist only under an armed-diagnostics mode reads as diagnostics-**ABSENT** and fails (PT-01)." → `utils.ts:33`/`:38` **is** that construction. L-U-04.
- `W2.md:253` **O-8** (anti-latch construction rule) — "No operator reads or writes process-global mutable state"; `W2.md:473` **K-6** — "observable cross-parse state (the latch class)"; `W2.md:367` — "reuse across parses is the PT-03 class". → **L-U-01**: `collectedDiagnostics` is precisely this class, and under the megatranche's own ratified law it is a *kill*-class construction.
- `W1.md:96-98` — "Quarantine diagnostics from the bench entirely … arming diagnostics couples an unconditional `console.error`." → the harness constraint L-U-04 grounds.
- `W2.md:161-162` — "non-string inputs die at a named [boundary]" + G-5. → **L-U-10** widens the required boundary surface.

**`registry/adjudicated/parser-band.md:116`** (binding debt 1, "Labelled failure diagnostics … `expected: ["<named-color>"]` beats `(?!)`") — **directly blocked by L-U-04**: in parse-that's default posture `expected` is *always* `[]`, so a value.js grammar that discharges debt 1 by passing labels into `mergeErrorState` discharges nothing unless it also arms diagnostics and accepts `console.error`. I record this as the load-bearing consequence of PT-01 that the band row does not yet name.

---

## 1. BLOCKERS

### L-U-01 · BLOCKER · `collectedDiagnostics` is a process-global, cross-parse, unbounded sink written on an ungated path — and it falsifies the module's own reentrancy claim

**Provenance**
- `utils.ts:95` `let collectedDiagnostics: Diagnostic[] = [];`
- `utils.ts:115` `collectedDiagnostics.push({…})` — inside `collectDiagnostic`, `utils.ts:102`
- `utils.ts:139` `return collectedDiagnostics;` · `:143` `collectedDiagnostics = [];` · `:147` `collectedDiagnostics.pop();`
- **Sole caller**: `parser.ts:666` `collectDiagnostic(state as ParserState<unknown>, checkpoint);` inside `recover()` — **with no `isDiagnosticsEnabled()` guard**. Contrast `parser.ts:67`, which does guard.
- dist: `diagnostics-DDazRHgl.js:50, 59, 78, 81, 84` — identical, shipped.

**The defect.** `utils.ts:20-26` states, in the module's own words, that error tracking lives on the `ParserState` "not on module globals", making a parse "reentrant and interleave-safe: a nested `.parse()` mid-rule operates on its own state and cannot corrupt the outer parse's error tracking." That claim is **true for the trio** (`furthest`/`expected`/`suggestions`/`secondarySpans` — see S-2) and **false for this buffer**, which sits 70 lines below the comment. Three compounding consequences:

1. **Nested-parse contamination.** `parseState` (`parser.ts:43-48`) opens a packrat epoch and `try/finally`-restores the packrat tables across a nested top-level parse — deliberate, documented re-entrancy work. It does **not** snapshot `collectedDiagnostics`. So a nested `.parse()` inside a `.map` callback appends into the *outer* parse's collection, and its `popLastDiagnostic()` (`parser.ts:674`) pops whatever is last — which may be the **outer** parse's diagnostic. The buffer carries no parse identity, so two interleaved parses cannot be separated after the fact.
2. **Unbounded growth.** Nothing auto-clears. `clearCollectedDiagnostics()` is consumer-driven only. A long-lived process using `recover()` (a stylesheet server, a watch-mode compiler) accumulates `Diagnostic` objects forever, each holding a 20-char `found` string plus three arrays.
3. **Ungated cost.** Because `parser.ts:666` does not check the flag, the **default, unarmed** posture pays the full snapshot — including L-U-11's O(n) prefix copies — on every recovered failure.

**Falsifier, and why it fails.** *"`recover()` is opt-in, so only consumers who asked for diagnostics touch the global."* Rejected on two counts: (a) opt-in to *recovery* is not opt-in to a *process-global*, and `recover()` is the library's advertised way to keep `many()`/`sepBy()` loops going (`parser.ts:644-652`) — i.e. the normal path for any tolerant grammar; (b) the pop at `parser.ts:674` mutates shared state regardless of who opted in. A genuine falsifier would be a per-parse buffer keyed on the state — `grep -rn "collectedDiagnostics" src/` returns exactly `utils.ts:95, 115, 139, 143, 147` and nothing else. None exists.

**Why BLOCKER and not MAJOR.** Every other finding here can be worked around by a disciplined consumer. This one cannot: a consumer has no way to scope, snapshot, or attribute the buffer, and no way to opt out of it while using `recover()`. It is the construction `W2.md:253` (O-8) and `W2.md:473` (K-6) exist to kill.

---

### L-U-02 · BLOCKER · `collectDiagnostic`'s reset is a destructive, un-undoable side effect — `recover()`'s sync-failure path reports the error at the wrong offset with the whole expected-set destroyed

**Provenance**
- `utils.ts:127` `resetErrorState(state);` — the last statement of `collectDiagnostic`
- `utils.ts:131-136` `resetErrorState` → `state.furthest = -1; state.expected = undefined; state.suggestions = []; state.secondarySpans = [];`
- `parser.ts:666` collect → `parser.ts:672-677` on sync failure: `popLastDiagnostic();` **return value discarded**, then `state.offset = checkpoint; state.isError = true; return state;`
- `parser.ts:60` `const furthest = state.furthest >= 0 ? state.furthest : state.offset;`

**The failure scenario, traced at the bytes.** A grammar wraps an element in `.recover(sync, sentinel)`. The element fails at offset 400 having accumulated `furthest = 400` and an `expected` set of six labels. `recover()` calls `collectDiagnostic(state, checkpoint=120)`. That function snapshots correctly — **and then resets the state**: `furthest = -1`, `expected = undefined`, both arrays replaced. `sync` is then run and *also* fails (the case the code names explicitly: "e.g. at EOF", `parser.ts:665`). The compensating `popLastDiagnostic()` removes the `Diagnostic` from the list — **but nothing restores the state.** The error now propagates to `parseStateInner`, which at `parser.ts:60` finds `state.furthest === -1`, falls through to `state.offset` — which `parser.ts:675` just set to `checkpoint` — and builds the error view at **offset 120 with `expected: undefined`**.

The user sees "parse failed at column ~120, expected nothing in particular" for an error that occurred at offset 400 with six known expectations. The comment at `parser.ts:663-665` asserts the error "propagates normally"; it propagates with **amnesia**. This is exactly the failure mode furthest-offset tracking exists to prevent, introduced by the tracking code itself.

**Second-order damage.** Even on the *success* path the reset is lossy in a way nothing documents: `furthest = -1` means the **next** failure at *any* offset wins the `>` comparison at `utils.ts:29`, including one strictly *earlier* than the true furthest already reached before the recovery point. Post-recovery error locations are therefore not monotone with respect to the pre-recovery parse.

**Falsifier, and why it fails.** *"A later `mergeErrorState` re-seeds `furthest`, so nothing is lost."* Rejected: (a) on the named EOF path the parse does not continue, so nothing re-seeds; (b) when it does continue, `furthest = -1` re-seeds from the *next* failure wherever it lands — everything before the `recover()` is gone, permanently; (c) `popLastDiagnostic()` returning `Diagnostic | undefined` (`utils.ts:146`) is the *shape* of a restore contract that the module never implements and the caller never uses.

**The cure is a separation, not a patch**: `collectDiagnostic` should snapshot and nothing else; the reset belongs at the call site, on the branch where recovery actually succeeded (`parser.ts:680-681`), not before the branch is known.

**Compounding**: L-U-03 — this path has **zero tests**.

---

## 2. MAJORS

### L-U-03 · MAJOR · The entire collected-diagnostics and byte-scanner surface has ZERO test coverage — including both BLOCKERs

`grep -rn "collectDiagnostic\|CollectedDiagnostics\|popLastDiagnostic\|mergeErrorState\|recover(\|skipWhitespace\|skipBlockComments" test/` → **0 hits**. Same grep over `scripts/` → **0 hits** (the nine `proof-*.mjs` are manifest / no-css-surface / subpath / packrat×4 / no-span-surface / no-dead-combinator / perf — none names `utils`). The only `utils` symbols that appear anywhere in `test/` are `enableDiagnostics`/`disableDiagnostics`, and only as fixtures: `test/reentrancy.test.ts:14-15` (`beforeEach`/`afterEach`) and `test/debug.test.ts:27-31`. They are never subjects.

**9 of the module's 13 exported functions — ~70% — are untested**, and the untested set contains L-U-01, L-U-02, L-U-08, L-U-09 and L-U-10 in full.

*Falsifier*: coverage could sit in `test/benchmarks/` or `test/utils.ts` — both were included in the grep root; neither hits. Nor in `dist-surface.test.ts`/`subpath-gate.mjs`, which check *export presence*, not behaviour.

### L-U-04 · MAJOR · PT-01 confirmed — and it is worse than "a no-op": the default posture pays maximum cost for zero information

`utils.ts:33` and `:38` gate label recording on `diagnosticsEnabled`; arming couples `console.error` at `parser.ts:67-69`. Both O-15 cites verified. **What O-15 does not say, and the bytes do:**

Because `collectDiagnostic` runs *ungated* (L-U-01), the **unarmed** posture executes the full O(n) snapshot (`utils.ts:107-113`) to produce a `Diagnostic` in which:
- `expected` is **always** `[]` — `utils.ts:120` copies `state.expected`, which `:33` set to `undefined` and `:38` declined to fill;
- `suggestions` is **always** `[]` — `addSuggestion` gates at `:52`;
- `secondarySpans` is **always** `[]` — `addSecondarySpan` gates at `:58`.

So the library spends its most expensive per-error operation producing a record carrying only `offset`, `line`, `column` and a 20-char snippet. Maximum cost, minimum information. That inversion is the finding; PT-01's "no-op" framing understates it.

This is squarely non-conformant with the megatranche's ratified law: `W2.md:281` R-LAW-3 ("a diagnostic is a value … never an effect" — `parser.ts:68` is the effect) and `W2.md:266` EQ-4 ("labels that exist only under an armed-diagnostics mode read as diagnostics-ABSENT and fail"). It also **blocks `parser-band.md:116`** (debt 1, labelled failure diagnostics): a value.js grammar cannot discharge that debt through `mergeErrorState` labels without also accepting `console.error`.

*Falsifier*: *"gating is a deliberate perf choice — labels cost allocation."* The accounting refutes it. The label *string* is built **once at parser-construction time** (`leaf.ts:132` builds `one of [...]` via `map`/`join`; the `string`/`regex` labels likewise), so the per-failure cost is exactly one 1-element array (`:33`) or one `.push` (`:41`) — the *same order* as the **two** array allocations the module already pays unconditionally when diagnostics are **off** (L-U-05). The module spends more on the disabled path than the feature would cost on the enabled one.

### L-U-05 · MAJOR · `mergeErrorState` allocates two arrays per furthest-advance even when diagnostics are OFF, on the library's hottest error path

```
utils.ts:32    state.furthest = state.offset;
utils.ts:33    state.expected = diagnosticsEnabled && label ? [label] : undefined;
utils.ts:34    state.suggestions = [];          // ← unconditional
utils.ts:35    state.secondarySpans = [];       // ← unconditional
```
Lines 34-35 sit **outside** the `diagnosticsEnabled` guard that governs line 33. dist `diagnostics-DDazRHgl.js:15-16` — shipped identically.

**Provably dead when disabled.** The only writers to either array are `addSuggestion` (`utils.ts:53`, gated at `:52`) and `addSecondarySpan` (`utils.ts:59`, gated at `:58`). `grep -rn "\.suggestions\|\.secondarySpans" src/` outside `utils.ts` finds only *reads* and aliases (`parser.ts:63-64`, `debug.ts:180,185`). Both arrays are initialized to `[]` by the class field (`state.ts:44-45`; emitted at `dist/packrat-entry-CS1td-8B.js:301-302`). Therefore, with diagnostics off, both are **always already empty** and the reassignment is semantically a no-op.

**Volume.** `mergeErrorState` has **27 call sites** on failure paths — `parser.ts:93,201,223,239,258,273,291,410,418,447,460,468,504,553,626` plus `leaf.ts:16,54,69,142,291,303,360`. `furthest` is monotone (assigned only at `:32`, only to a strictly greater offset), so the trigger count per parse is bounded by distinct advancing offsets — but each trigger is **2 escaping heap allocations**, measured against O-15 PT-03's **93.9 ns/parse** unarmed baseline. Worse, a failed parse pays **4 empty arrays before any error handling at all**: `new ParserState(val)` at `parser.ts:52` and the error-view `new ParserState(...)` at `parser.ts:61`, each constructing two.

*Falsifier*: *"V8 escape analysis elides them."* Rejected — escape analysis requires the allocation not to be stored into a heap object; both are stored into `state`. They escape by construction.

**Cure is one line**: move `:34-35` inside the `diagnosticsEnabled` branch, or `if (state.suggestions.length) state.suggestions.length = 0`. The module already knows this pattern — see **S-6**, `reportUnclosedDelimiter` applies exactly this discipline 30 lines away.

### L-U-06 · MAJOR · `getCollectedDiagnostics()` hands out the LIVE module-global array behind a compile-time-only `readonly`

`utils.ts:138-140` `export function getCollectedDiagnostics(): readonly Diagnostic[] { return collectedDiagnostics; }` — dist `:78` verbatim. `readonly Diagnostic[]` erases at runtime; the package ships `.cjs`/`.js` for untyped consumers (`package.json` exports).

Three composed hazards:
1. The returned handle keeps receiving `push` (`:115`) — the consumer's "snapshot" grows under them.
2. It keeps receiving `pop` (`:147`) — a `recover()` sync failure can **remove an element the consumer already enumerated**.
3. `clearCollectedDiagnostics()` (`:143`) **reassigns** (`= []`) rather than truncating, so the same handle silently **detaches** instead of emptying. Combined with (1)/(2), a consumer can never determine whether their handle is live or stale.

Additionally the `Diagnostic` fields are mutable (`utils.ts:89-91`: `expected: string[]`, `suggestions: Suggestion[]`, `secondarySpans: SecondarySpan[]`). The snapshot *does* copy defensively at `:120-122` — good — but then hands the copies out mutably.

*Falsifier*: *"TS `readonly` suffices."* Rejected: the hazard is mutation-**by the library**, which `readonly` on the consumer's binding cannot prevent, and JS consumers have no wall at all.

### L-U-07 · MAJOR · The byte-scanners are dead in-tree, untested, and welded to the diagnostics globals — so `@mkbabb/parse-that/utils` drags the whole diagnostics tier

`utils.ts:159-186`. Zero call sites in `src/`, `test/`, `scripts/` (grep verified). Their own header (`:150-156`) says they exist for "value.js's canonical CSS grammar" — a consumer in another repo.

Because they share a source module with `diagnosticsEnabled` (`:6`) and `collectedDiagnostics` (`:95`), Rollup emits them **into the diagnostics chunk**:
- `dist/diagnostics-DDazRHgl.js:113` `skipWhitespace as b,` · `:123` `skipBlockComments as s`
- `dist/utils.js:1` `import { s, b } from "./diagnostics-DDazRHgl.js";`

So `import { skipWhitespace } from "@mkbabb/parse-that/utils"` links a **3,516-byte chunk containing two module-level mutable globals and the entire diagnostics accumulator**. This contradicts `package.json:"sideEffects": false` and the tiering `core.ts:3-5` advertises ("A consumer that imports only this never pulls the diagnostics accumulator").

**The Goldilocks reading**: 186 lines is a *good* size. The defect is **four disjoint concerns** — (a) the arm flag `:6-18`, (b) per-state error merging `:28-80`, (c) the global collection buffer `:84-148`, (d) byte scanners `:150-186` — served across **two disjoint public subpaths**: `/diagnostics` (`diagnostics.ts:6-14`) and `/utils` (`utils-entry.ts:6`). The correct cut is two files; the scanners import nothing from (a)-(c) and are wanted by consumers who want none of them.

*Falsifier*: *"tree-shaking removes what's unused."* Rejected, and the dist proves it both ways: reassigned module-level `let` bindings are not removable once any export of the chunk is retained, and `utils.js:1` imports the chunk whole. Meanwhile `addSecondarySpan` and `resetErrorState` — `export`ed in source at `:57`/`:131` — are **absent** from the chunk's export map (`:111-124`), proving Rollup *did* prune truly-unreferenced names and did **not** prune these. (Those two are also dead public surface in their own right: neither is re-exported by any entry file.)

### L-U-08 · MAJOR · `skipWhitespace`'s predicate is not "ASCII whitespace" — it silently eats every C0 control

`utils.ts:158` JSDoc: *"Skip ASCII whitespace (charCode <= 32)"*. `utils.ts:162` `while (i < src.length && src.charCodeAt(i) <= 32) i++;`

**Measured** (fresh process, published `dist/utils.js`, nothing armed):
```
src = String.fromCharCode(0,27,7) + "x"   (len 4)  →  offset 3
```
NUL, ESC and BEL are all consumed as whitespace. `charCode <= 32` is U+0000–U+0020 — the whole C0 control range plus space, not "ASCII whitespace".

CSS whitespace is exactly U+0009 / U+000A / U+000C / U+000D / U+0020; U+0000 is preprocessed to U+FFFD (a *character*, not whitespace) and C0 controls are parse errors. A CSS tokenizer built on this primitive — **the stated purpose**, `:150-156` — silently accepts `rgb(<NUL>255 0 0)` as `rgb(255 0 0)`, and silently accepts an ESC-injected declaration as clean input.

*Falsifier*: *"the doc discloses `<= 32`."* Rejected — it discloses the *mechanism* while mis-naming the *semantics*, which is the failure mode: a reader who trusts the name `skipWhitespace` and the phrase "ASCII whitespace" gets a lenient scanner. Either the name is wrong or the predicate is; the module cannot be right under both readings.

### L-U-09 · MAJOR · `skipBlockComments` leaves an unterminated `/*` observationally identical to a legitimate division `/`

`utils.ts:177-180`:
```
if (ch === 47 /* / */ && src.charCodeAt(i + 1) === 42 /* * */) {
    const end = src.indexOf("*/", i + 2);
    if (end === -1) break;              // ← offset left AT the '/'
```
**Measured**: `{src:"/* oops", offset:0}` → **offset 0**. `{src:"/2", offset:0}` → **offset 0**. `identical: true`.

CSS uses `/` as a real separator (`font: 12px/1.5`, `grid-area: 1/2`, `hsl(0 0% 0% / 50%)`), so after the call the caller **cannot distinguish** "there was an unterminated comment here" from "there is a slash here". The parse then fails somewhere downstream against a slash-shaped expectation, and the true cause — an unclosed comment — is unrecoverable from the state.

The sharper point: this module **defines the exact machinery for this diagnosis** — `reportUnclosedDelimiter` at `:66-80`, emitting "unclosed \`X\` opened here" — 90 lines above, and declines to use it. That is internal inconsistency, not an omission of an unbuilt feature. `:167` even documents the behaviour ("An unterminated comment stops the scan at its start") without noting that the resulting state is ambiguous.

*Falsifier*: *"a scanner primitive should not report diagnostics."* Accepted as a design stance — but then it must be **distinguishable**: return a boolean, or park `offset` at `src.length`. It does neither, so the information is destroyed rather than deferred.

### L-U-10 · MAJOR · PT-07 extended and partly CONTRADICTED — the exported scanners have three different non-string postures, one of them a SILENT NO-OP

`utils.ts:160-162` and `:169-171` read `state.src.length` and `state.src.charCodeAt(i)` with no guard of any kind.

**Measured** — one fresh process, published `dist/utils.js`, `enableDiagnostics()` never called, `memoize()` never constructed:

| `state.src` | `skipWhitespace(state)` |
|---|---|
| `"  a"` (control) | NO-THROW, offset 2 ✓ |
| **`42`** | **NO-THROW, offset 0 — silent no-op** |
| `null` | `TypeError: Cannot read properties of null (reading 'length')` |
| `undefined` | `TypeError: Cannot read properties of undefined (reading 'length')` |
| `{length: 5}` | `TypeError: src.charCodeAt is not a function` |
| `[" ", "a"]` | `TypeError: src.charCodeAt is not a function` |
| `new Uint8Array([32,97])` | `TypeError: src.charCodeAt is not a function` |

**This contradicts O-15 PT-07's "5/5 non-string inputs throw a raw `TypeError`"** as a package-wide generalization. A numeric `src` is silently treated as an **empty document**: `(42).length` is `undefined`, `i < undefined` is `false`, the loop never runs, `state.offset = i` writes back the unchanged offset. No throw, no signal. That is strictly *worse* than the raw `TypeError` O-15 flagged — a raw `TypeError` at least stops the program.

Three postures (silent no-op / null-deref message / method-missing message) from **one function** on non-string input, with no named error and no boundary assertion anywhere in the module.

*Falsifier*: *"nobody passes a non-string state."* Rejected — these are **public exports** at `@mkbabb/parse-that/utils` taking a structurally-typed `ParserState`, and the header at `:150-156` explicitly invites hand-rolled grammars to drive them. My probe constructed `{src, offset}` by hand, which is exactly what that invitation produces. A JS consumer has no type wall at all.

**Consequence for value.js**: the JS-boundary invariant O-15 places *above* parse-that (`W2.md:161-162`, G-5) must cover the `/utils` subpath, not only `.parse()`. Guarding `.parse()` alone leaves the silent-no-op case open.

### L-U-11 · MAJOR · `collectDiagnostic` re-implements `ParserState.getLineAndColumn` with O(n) allocations, when the O(1)-space version is in its own import

```
utils.ts:107   const before = src.slice(0, furthest);              // full prefix COPY
utils.ts:108   const lastNl = before.lastIndexOf("\n");
utils.ts:109   const line = lastNl === -1 ? 1 : before.slice(0, lastNl + 1).split("\n").length;
                                              // ↑ SECOND prefix copy   ↑ array of EVERY line
utils.ts:110   const column = lastNl === -1 ? furthest : furthest - lastNl - 1;
utils.ts:113   const found = src.slice(furthest, furthest + 20).replace(/\n/g, "\\n");
```
`state.ts:127-134` — **the file `utils.ts` imports** — already computes the identical answer with no prefix copy:
```
const lastNewline = this.src.lastIndexOf("\n", offset - 1);
```
The two are semantically equal (`src.slice(0,f).lastIndexOf("\n")` ≡ `src.lastIndexOf("\n", f-1)`), so this is duplication *and* a strict allocation regression against the author's own helper.

**Cost.** Combined with L-U-01's ungated call site, a document of `n` characters with `k` recovered failures allocates ≈ `2·n·k` string bytes plus `k` full line-arrays → **O(n·k)**. On a 10 MB stylesheet with 200 recovered errors that is ~4 GB of transient string traffic. The module declares no resource ceiling of its own; this is the allocation-axis analogue of PT-04's depth ceiling — a bound that is *absent* rather than low (L-U-20).

**Third implementation, and it disagrees.** `state.ts:119-124` `getLineNumber()` computes a *different* answer: for `"a\nb"` at offset 2 it returns **1**, while `getLineAndColumn(2).line` and `collectDiagnostic` both compute **2**; for a newline-free source it returns **0**, not 1. It has **zero callers** (`grep` finds only `debug.ts:59`, which uses `getLineAndColumn`). Three line-number implementations in the module's own import surface, two answers, one of them dead and wrong.

*Falsifier*: *"the slice version reads more clearly."* Rejected — it is four lines against one method call to a helper the same author wrote, and it is the *less* correct of the three implementations to imitate.

---

## 3. MINORS

### L-U-12 · MINOR · `Diagnostic.offset` is a write-only field
`utils.ts:85` declares it; `:116` sets it from `errorOffset`. **Never read**: `formatDiagnostic` (`debug.ts:200-228`) reads `furthestOffset` (`:202`, `:207`), `line`/`column` (`:203`), `expected` (`:212`), `secondarySpans` (`:216`), `suggestions` (`:220`), `found` (`:224`) — and never `d.offset`. Grep finds no other reader. It is `recover()`'s checkpoint, not the error site, and nothing documents that — so it is dead or misleading, and a consumer who reasonably assumes it is the error offset gets the recovery start instead. *Falsifier*: an external consumer might read it — which is precisely the hazard, since its meaning is undocumented.

### L-U-13 · MINOR · `mergeErrorState`'s return value is dead at all 27 call sites
`utils.ts:48` `return state;`. `grep -rn "= *mergeErrorState\|return mergeErrorState" src/ test/` → **0 hits**. A dead return on the module's hottest function, and it advertises a chainable/pure shape for a function that mutates in place — the wrong mental model for the one function readers most need to model correctly.

### L-U-14 · MINOR · `found` escapes only `\n`, and slices by UTF-16 code unit
`utils.ts:113` `.replace(/\n/g, "\\n")` leaves `\r`, `\t` and every other C0 control **raw**, so `formatDiagnostic` (`debug.ts:224-226`) can emit a literal carriage return inside backticks and corrupt its own compiler-style rendering — the exact class of input L-U-08 shows the scanner happily admits. Separately, `src.slice(furthest, furthest + 20)` cuts on a code-unit boundary, so the snippet can end in a **lone surrogate** handed to the consumer inside `Diagnostic.found`. *Falsifier*: 20 chars is display truncation — true for the visual cut, not for the lone surrogate, which is data.

### L-U-15 · MINOR · `ParserState<unknown>` signatures impose 35 casts on callers
Every export takes `ParserState<unknown>` (`:28, 51, 57, 67, 102, 131, 159, 168`), forcing `as ParserState<unknown>` at every call site: **`parser.ts` ×19, `leaf.ts` ×16 = 35** (`grep -c`). **None of these functions touches `.value`**, so a generic `<T>(state: ParserState<T>, …)` erases all 35 with no loss of safety. Pure caller-side noise imposed by the callee's signature choice. Also inconsistent annotation within 100 lines: `enableDiagnostics` (`:8`), `disableDiagnostics` (`:12`), `isDiagnosticsEnabled` (`:16`) and `mergeErrorState` (`:28`) carry no explicit return type while `collectDiagnostic` (`:102`), `resetErrorState` (`:131`), `getCollectedDiagnostics` (`:138`), `clearCollectedDiagnostics` (`:142`), `skipWhitespace` (`:159`) and `skipBlockComments` (`:168`) do.

### L-U-16 · MINOR · `expected?: string[]` conflates "diagnostics off" with "nothing recorded yet"
`utils.ts:33` sets `undefined` on every furthest-advance in the default posture; `:45` sets `[label]` when armed. `undefined` therefore means **both** things, and every reader must re-handle it: `utils.ts:120` (`state.expected ? [...] : []`), `debug.ts:175` (`state.expected ?? []`), `parser.ts:62` (aliases the union onward). A non-optional `readonly string[]` seeded from one shared frozen empty array removes three ternaries and one union. **This is a type defect only — the V8 shape is fine; see S-3, where I falsified my own stronger hypothesis.**

### L-U-17 · MINOR · `clone()` copies `furthest` but not the accumulation, breaking `mergeErrorState`'s invariant — and it is live on the armed packrat path
`state.ts:101-108` copies `src, value, offset, isError, furthest` and **not** `expected`/`suggestions`/`secondarySpans`, yielding a state with `furthest = N` and an empty accumulation — a combination `mergeErrorState` cannot produce and does not expect (at `utils.ts:36` the clone takes the `===` branch and starts a *new* expected set at an offset that already had one). Sole live caller: `packrat.ts:351` `const scratch = live.clone();`, whose `snapshot(scratch)` at `:356` captures only offset/value/isError — so **every label, suggestion and secondary span accumulated during an LR grow pass is discarded and never merged back into `live`**. Latent while unarmed (`packrat.ts:217`/`:266` are no-ops until `:290`), live once armed. *Falsifier*: *"a grow pass shouldn't pollute the outer error set"* — plausible as a design, but then `furthest` should not be copied either; copying one half of a coupled invariant is the defect.

### L-U-18 · MINOR · `skipBlockComments` duplicates `skipWhitespace`'s loop body with a correctness coupling
`utils.ts:172-176` re-implements the `ch <= 32` skip rather than calling `skipWhitespace`. Defensible for inlining (a call would re-read `state.offset`), but as written the L-U-08 predicate fix must be applied in **two** places, and there is no shared named constant to keep them honest. Duplication is cheap; duplication of a *wrong* predicate is not.

---

## 4. INFO

### L-U-19 · INFO · PT-03 re-verified at the bytes — and `utils` is not the site
`packrat.ts:156` `let PACKRAT_ARMED = false;` · `:290` `PACKRAT_ARMED = true;` — `grep -n "PACKRAT_ARMED *="` returns **exactly those two lines**, so there is no path back to `false`. Reads at `:217`, `:266`. dist `packrat-entry-CS1td-8B.js:678` (false), `:722` (true), reads `:682`/`:714` — all four O-15 cites land exactly. `resetPackrat()` (`packrat.ts:262-272`) clears `MEMO`/`HEADS`/`GROWING` and does **not** disarm, matching O-15's measured 139.3 residue. Recorded here because the latch is the harness constraint (`W1.md:279-284`, G-4) that governs any future measurement of the findings above — and because `utils` gets the same construction *right* (S-4).

### L-U-20 · INFO · PT-04 not sited in `utils`; its analogue is an absent ceiling, not a low one
`utils.ts` contains no recursion — two bounded `while` loops (`:162`, `:171`), no self-calls, no mutual calls except `reportUnclosedDelimiter → addSuggestion/addSecondarySpan` (`:74`, `:79`), which is depth-1. The 7,761 lazy ceiling lives in `Parser.lazy`/`createLazyCached` (`parser.ts:702-707`, `lazy.ts:18-24`). The resource ceiling this module *lacks* is the per-diagnostic O(n) allocation of L-U-11, unbounded in both input size and diagnostic count.

---

## 5. SUPERLATIVES — L-18 runs both ways

### S-1 · The module is a RUNTIME LEAF, and that is what breaks a real cycle
The graph contains `state.ts:2 → debug.ts:6 → utils.ts`, and `utils.ts:1`/`:3` import from `state.js` — a cycle on paper. Both of `utils.ts`'s imports are `import type` / `export type`, and with `verbatimModuleSyntax: true` (`tsconfig.json`) they erase completely. **Proof at the bytes**: `dist/diagnostics-DDazRHgl.js` contains **0** `import` statements and begins at line 1 with `let diagnosticsEnabled = false;`. No init-order hazard, no TDZ exposure for the two module globals, in a graph that otherwise has one. This is deliberate and correct, and it is the reason the two globals are safe to *initialize* even though they are unsafe to *use* (L-U-01).

### S-2 · The furthest-offset algebra is right, and the per-state threading is a genuine advance
`utils.ts:29-47`: a three-way split on `>` / `===` / (implicit) `<`, with the `<` case a clean no-op fall-through to `return state`. The `===` branch dedupes through `includes` (`:40`), so a label repeated across backtracking alternatives appears once — the correct set semantics for an expected-set. And the whole trio lives on the `ParserState` instance rather than a module global (`state.ts:43-45`, documented `utils.ts:20-26`), which makes `furthest`/`expected` reentrant where Parsimmon-class combinator libraries use process globals. **That claim in the comment is TRUE for the trio.** Only the collection buffer escapes it (L-U-01), and the right reading is that the module did the hard 90% and left one object behind.

### S-3 · The V8 shape is stable — I expected otherwise and the tree won
`expected?: string[]` has **no initializer** in TS (`state.ts:43`). Under `useDefineForClassFields: false` that would make `mergeErrorState`'s `state.expected = …` (`utils.ts:33`) a property **addition** and a hidden-class transition on the hot error path — a serious V8 defect for a parser library. It is not. `tsconfig.json` targets **ES2022**, so class fields are *defined*, and the emitted bytes confirm it: `dist/packrat-entry-CS1td-8B.js:300` `expected;` · `:301` `suggestions = [];` · `:302` `secondarySpans = [];`, ahead of the constructor's five parameter-property assignments (`:288-292`). Every `ParserState` carries all eight fields from construction — **one map, no transition, no dictionary-mode risk.** Hypothesis falsified; the credit is the module's.

### S-4 · `diagnosticsEnabled` is a proper two-way toggle, not a latch
`utils.ts:8` sets `true`, `:12` sets `false` — reversible, and exercised as such by `test/reentrancy.test.ts:14-15` and `test/debug.test.ts:27-31`. Directly contrast `PACKRAT_ARMED` three files away (`packrat.ts:290`, never reassigned `false` — O-15 PT-03, L-U-19), which cost 1.47× permanently once touched. Under `W2.md:253` (O-8, the anti-latch construction rule) this module's flag **passes**. It is the *coupling* to `console.error` that fails (L-U-04), not the flag's shape — a distinction worth preserving, because the cure for L-U-04 is to sever the effect, not to redesign the toggle.

### S-5 · `skipBlockComments`'s closing-token scan is the correct primitive
`utils.ts:178` `src.indexOf("*/", i + 2)` delegates to V8's `StringIndexOf` — a memchr/SIMD-class search for a two-byte needle over a one-byte-representation string — instead of a per-character JS loop, with O(1) extra space, no closure, no allocation, and correct arithmetic (`i = end + 2`, `:180`, which cannot re-scan the closing token). Paired with `skipWhitespace`'s in-place `state.offset` write-back (`:163`), the two functions are genuinely allocation-free and monomorphic in their argument. This is the one part of the module that costs nothing, and the header's D7 rationale (`:150-156`) is honest about why. Its defects (L-U-08/09/10) are **semantic**, not mechanical — the machine is right, the meaning is not.

### S-6 · `reportUnclosedDelimiter` shows the module already knows the discipline it fails to apply
`utils.ts:71` `if (!diagnosticsEnabled) return;` — placed **before** the `closeText` ternary (`:72-73`) and both template literals (`:76`, `:79`), so the disabled path builds nothing at all. That is exactly the guard placement `mergeErrorState` omits for its own two array allocations (L-U-05), 30 lines earlier in the same file. The pattern is correct, present, and local — which makes L-U-05 a lapse rather than an oversight, and makes its one-line cure obviously in-idiom.

---

## 6. Tally and the shortest path

| Severity | Count | Ids |
|---|---|---|
| **BLOCKER** | **2** | L-U-01, L-U-02 |
| MAJOR | 9 | L-U-03 … L-U-11 |
| MINOR | 7 | L-U-12 … L-U-18 |
| INFO | 2 | L-U-19, L-U-20 |
| **Total defects** | **20** | |
| **Superlatives** | **6** | S-1 … S-6 |

**Three cuts retire eleven findings.**
1. **Split the file in two.** `diagnostics.ts` (arm flag + per-state merge) and `scan.ts` (the two byte-scanners) — kills L-U-07, most of L-U-18's coupling, and unblocks the `/utils` subpath's stated tiering.
2. **Make the collection tier a value, not a global.** Per-parse buffer on the `ParserState`; `collectDiagnostic` snapshots and does **not** reset; `getCollectedDiagnostics` returns a copy. Kills L-U-01, L-U-02, L-U-06, L-U-12, and satisfies `W2.md:253`/`:281`/`:473` (O-8 / R-LAW-3 / K-6).
3. **Sever the label gate from the console effect.** Record labels unconditionally (the cost accounting in L-U-04 shows it is cheaper than the status quo's unconditional `:34-35`); make rendering an explicit consumer call. Kills L-U-04 and L-U-05, and unblocks `parser-band.md:116` debt 1.

The remainder — L-U-08/09/10, the scanner semantics — is a separate, smaller correction: fix the predicate to the five CSS whitespace code points, make an unterminated `/*` distinguishable from `/`, and put a named boundary assertion on `state.src`. **L-U-03 is the precondition for all of it**: none of these paths currently has a test, so every cure above would land unverified today.
