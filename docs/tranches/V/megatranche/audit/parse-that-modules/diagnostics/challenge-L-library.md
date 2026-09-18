`claude-opus-5[1m]` (Opus 5, 1M context) — served model id, in-seat, no subagent.

# CHALLENGE — `diagnostics` · LIBRARY axis (L)

**Target**: `/Users/mkbabb/Programming/parse-that/typescript/src/parse/diagnostics.ts` (14 lines)
**Substrate**: parse-that `master` @ `ef10d5b`, `typescript/package.json` version `1.0.0`. READ-ONLY.
**Read whole**: `diagnostics.ts`; `utils.ts` (186); `state.ts` (189); every consumer on the export graph — `parser.ts` (711), `leaf.ts`, `debug.ts` (383), `packrat.ts` (488), `lazy.ts`, `core.ts`, `index.ts`, `utils-entry.ts`, `packrat-entry.ts`; `package.json`, `tsconfig.json`; the gates `test/subpath-gate.mjs`, `test/manifest-gate.mjs`, `test/dist-surface.test.ts`, `test/debug.test.ts`, `test/reentrancy.test.ts`, `test/setup.ts`; and the published `dist/` (`diagnostics.js`, `diagnostics.cjs`, `diagnostics-DDazRHgl.js`, `diagnostics-DpUY87_d.cjs`, `packrat-entry-CS1td-8B.js`, `core.js`, `utils.js`, and the `.d.ts` set).
**Dist provenance**: built 2026-07-29 14:20; chunk hashes `diagnostics-DDazRHgl.js` / `packrat-entry-CS1td-8B.js` are **the same hashes O-15 cited**, so every O-15 dist line below was re-verified against identical bytes, not a rebuild.
**Posture**: module assumed DEFECTIVE until the tree proves otherwise. Every claim carries a falsifier; superlatives carry them too (L-18 runs both ways).

**STOP-check**: `/Users/mkbabb/Programming/parse-that-css-totality-p2` does **not** exist (`ls` → `No such file or directory`). Not created. No worktree, frozen root, or Codex path entered. No bench run; nothing armed diagnostics or packrat — the PT-03 latch is untouched and was read statically only.

**Tally**: **24 defects (5 BLOCKER · 11 MAJOR · 7 MINOR · 1 INFO) · 6 superlatives · 1 corroboration · 3 falsified hypotheses · 1 in-place correction to a prior pass.**

> **SUPERSESSION NOTE.** A prior L-axis pass on this slot existed at this path (17 defects / 4 BLOCKER / 5 superlatives). It is **preserved whole** here — every one of its findings was independently re-verified at the bytes this pass and **all survived**, retaining their original IDs (L-B1…L-B4, L-M1…L-M7, L-m1…L-m5, L-i1, L-i2, S-1…S-5) so the ledger stays traceable. This pass adds **L-B5, L-M8…L-M11, L-m6, L-m7, S-6**, records three falsified hypotheses, **corrects one overstated allocation claim inside L-M2**, and **withdraws one superlative I had drafted** because the prior pass's L-B3 defeats it. Nothing was dropped.

---

## 0. What the module actually is

`diagnostics.ts` is a 14-line subpath barrel (A.W3) for `"@mkbabb/parse-that/diagnostics"`. It has **zero logic**: 5 lines of doc comment, one value re-export of six functions and one type re-export of three types, all from `./utils.js`. Every substantive claim below therefore lands either on the barrel's **selection** (what it chose to export and to withhold) or on the `utils.ts` implementation it publishes. Both are in scope: a barrel is a contract, and a contract that publishes a broken half is the barrel's defect.

Published surface, exactly:

```
mergeErrorState · enableDiagnostics · disableDiagnostics
collectDiagnostic · getCollectedDiagnostics · clearCollectedDiagnostics
type Suggestion · type SecondarySpan · type Diagnostic
```

Withheld though present in `utils.ts`: `isDiagnosticsEnabled` (:16), `addSuggestion` (:51), `addSecondarySpan` (:57), `reportUnclosedDelimiter` (:66), `resetErrorState` (:131), `popLastDiagnostic` (:146). Withheld from `debug.ts`: `formatDiagnostic` (:200), `formatAllDiagnostics` (:235).

### Thesis

> **The library renders diagnostics you did not ask for — unconditionally, to stderr — and ships no way to render the ones you did ask for; meanwhile the buffer it advertises as "opt-in" fills on the unarmed default path and is unreachable from the subpath that advertises it.**

---

## 1. BLOCKERS

### L-B1 — `collectedDiagnostics` is an unbounded, source-unattributed module global that the diagnostics flag does not gate

**Severity**: BLOCKER · **Provenance**: `utils.ts:95`, `:102-128`, `:115`; dist `diagnostics-DDazRHgl.js:50-70`; call site `parser.ts:666`.

`let collectedDiagnostics: Diagnostic[] = []` (`utils.ts:95`) is process-global. `collectDiagnostic` (`utils.ts:102`) pushes into it (`:115`) and **contains no `diagnosticsEnabled` check** — compare its siblings `addSuggestion` (`utils.ts:52`), `addSecondarySpan` (`:58`) and `reportUnclosedDelimiter` (`:71`), every one of which opens with the guard. The omission survives minification: dist `diagnostics-DDazRHgl.js:51-70` is gate-free, byte for byte.

Consequence on the **default, unarmed, shipping path**: any grammar using `Parser.recover` — the combinator whose entire documented purpose is to let `many()`/`sepBy()` loops keep going (`parser.ts:650-651`) — pushes one `Diagnostic` per recovered element into a global array that nothing ever drains. Each record retains a 20-char `found` string and three arrays. In a long-lived process (value.js parsing CSS in a browser session; a server parsing untrusted input) this is monotone growth with no ceiling and no back-pressure. The only drain, `clearCollectedDiagnostics`, is manual and undocumented as an obligation.

This is also the precise inversion of the design the module advertises for itself (`utils.ts:20-26`: "not on module globals … reentrant and interleave-safe"). That property was won for `furthest`/`expected`/`suggestions`/`secondarySpans` and never extended to the buffer. Note the asymmetry against `parseState`'s PT-Q1 hardening (`parser.ts:34-49`): packrat's global tables are snapshotted and restored around every top-level parse via `packratEnter`/`packratExit` and a `finally`. The diagnostics buffer gets no such treatment.

**Added this pass — the attribution limb, which is worse than the leak.** Two interleaved parses (exactly the nested-`.parse()`-in-a-`.map` case PT-Q1 was written to support and which `parser.ts:38-46` names explicitly) braid their diagnostics into one undifferentiated list, and `Diagnostic` (`utils.ts:84-93`) carries **no source or parse handle** — eight fields, all offsets/strings, none identifying which string they index. The only renderer, `formatDiagnostic(d, src)` (`debug.ts:200`), takes a `src` the record cannot supply. So a consumer holding diagnostics from `srcA` and `srcB` will draw a caret into the wrong string, at an offset that may not exist in it, **silently**. The `PackratEpoch` interface (`packrat.ts:194-200`) has five fields and none is diagnostic — the author had the epoch idiom one module over and did not apply it here.

**Falsifier**: exhibit a `diagnosticsEnabled` check anywhere on `collectDiagnostic`'s path, or a bound/eviction on `collectedDiagnostics`, or a save/restore of the buffer in `parseState`, or a src/parse identity field on `Diagnostic`. None exists in `utils.ts`, `parser.ts`, `packrat.ts`, or the shipped chunk. Alternatively: show `recover` is unreachable without arming — it is not; `recover` is a plain `Parser` method (`parser.ts:653`), independent of the flag.

**Corpus**: extends INBOX **O-15 / PT-01** (which measured the *label↔console* coupling, not the buffer). Bears directly on X·P W2 **R-LAW-4** ("`N` malformed sites yield exactly `N` diagnostics", `W2.md:284`) — here `N` sites yield `N` diagnostics *that are never released*, so the law's non-amplification clause holds per-parse and fails per-process. Not previously filed: no corpus grep hit for `collectedDiagnostics`, `clearCollectedDiagnostics`, or `unbounded`.

---

### L-B2 — `getCollectedDiagnostics()` is provably always `[]` for a consumer of this subpath

**Severity**: BLOCKER · **Provenance**: `diagnostics.ts:6-13`; sole writer `parser.ts:666`; dist `diagnostics.js:1-9`.

The barrel exports the buffer's **reader** (`getCollectedDiagnostics`), its **eraser** (`clearCollectedDiagnostics`) and its **writer** (`collectDiagnostic`) — but the only thing in the library that *calls* the writer is `Parser.prototype.recover` (`parser.ts:666`), and `Parser` is not on this subpath. `dist/diagnostics.js` imports exactly six symbols from one chunk; there is no `Parser` in the module graph at all (see S-1).

So a consumer who does the obvious thing —

```js
import { enableDiagnostics, getCollectedDiagnostics } from "@mkbabb/parse-that/diagnostics";
enableDiagnostics();
someParser.parse(badInput);          // fails
getCollectedDiagnostics();           // []  — always
```

— gets an empty array and a `console.error` spray (L-B4). The headline feature named in the barrel's own doc comment ("the opt-in collected-diagnostics buffer", `diagnostics.ts:4`) is unreachable from the barrel. `collectDiagnostic` is exported as a manual escape hatch, but its signature `(state: ParserState<unknown>, errorOffset: number)` requires a `ParserState` the consumer can only obtain from `parseState()` on the **root** entry — by which point the parse is over and the per-rule structure the diagnostic is supposed to localize is gone (and see L-M11: the consumer cannot even *name* that type from this subpath).

**Falsifier**: find a second call site of `collectDiagnostic` in `src/`. `grep -rn collectDiagnostic typescript/src` returns `utils.ts` (definition), `parser.ts:4` (import), `parser.ts:666` (the one call), `index.ts:5` and `diagnostics.ts:10` (re-exports). One writer, inside `recover`.

**Corpus**: this is O-15 **PT-07**'s second limb (`.parse()` returns `undefined` on failure, indistinguishable from a successful `undefined`) reaching its worst form — the failure is unobservable in the return value **and** absent from the buffer that exists to observe it. I do not contradict O-15's posture that the cure is a JS-boundary invariant **above** parse-that; I sharpen why that wrapper must own diagnostics outright (X·P W2 Layer **D**, `W2.md:239`), since it cannot recover a diagnostic from the library even after detecting the failure.

---

### L-B3 — `popLastDiagnostic()` LIFO-pops the wrong record when `sync` itself recovers

**Severity**: BLOCKER (correctness) · **Provenance**: `parser.ts:653-682`, specifically `:666` (collect), `:670` (run `sync`), `:674` (pop); `utils.ts:146-148`.

`recover` implements rollback as: collect a diagnostic, run `sync`, and if `sync` fails, undo the collection with `popLastDiagnostic()`. The undo assumes **nothing was collected in between**. But `sync` is an arbitrary consumer-supplied `Parser` (`parser.ts:653`), and `Parser.recover` is public, so `sync` may itself contain a recovery that collects and *keeps* a diagnostic.

Construct: `outer = p.recover(sync, s)` with `sync = q.recover(r, t).then(z)`.
- `p` fails → `collectDiagnostic` pushes **D_outer** (`:666`).
- `sync` runs: `q` fails → inner `recover` pushes **D_inner**; `r` succeeds → inner keeps D_inner and returns its sentinel (`:681`).
- `z` fails → `sync` overall fails.
- `:674` `popLastDiagnostic()` removes **D_inner** — the wrong record. **D_outer** stays in the buffer describing a branch that was rolled back and whose error is about to propagate anyway.

Net effect per occurrence: one spurious diagnostic retained for a discarded path, one legitimate diagnostic destroyed. The buffer length is restored, so length-based assertions pass while the contents are wrong — the failure is **silent**.

This violates X·P W2 **R-LAW-1** (rollback exactness: "the restored state is exactly the pre-mark state: offset, **journal length**…", `W2.md:275-278`) in content-if-not-in-length, and **R-LAW-4** (non-amplification, `W2.md:284`) in both directions at once. The cure is a mark/rewind on the journal (record `collectedDiagnostics.length` before `sync`, truncate to it after) rather than a LIFO pop — exactly the shape R-LAW-1 already prescribes and which the tree does not implement.

**Falsifier**: show `sync` cannot recover — nothing in the type (`sync: Parser<unknown>`) or the runtime forbids it. Or show `popLastDiagnostic` is index-aware: `utils.ts:147` is `collectedDiagnostics.pop()`, unconditional.

---

### L-B4 — arming is the only route to labels and it hard-couples `console.error`; the barrel ships the switch with no seam and no getter

**Severity**: BLOCKER · **Provenance**: gate `utils.ts:33` + `:38` (dist `diagnostics-DDazRHgl.js:14`); effect `parser.ts:67-69` (dist `packrat-entry-CS1td-8B.js:881-883`); second effect site `debug.ts:174-189`; withheld getter `utils.ts:16`.

**Verified at the bytes, independently of O-15.** `mergeErrorState` seeds `state.expected` only under `diagnosticsEnabled && label` (`utils.ts:33`, `:38`; dist chunk line 14 reads `state.expected = diagnosticsEnabled && label ? [label] : void 0;`). The *only* public way to flip that flag is `enableDiagnostics()`. And `parseStateInner` fires an unconditional `console.error(this.state.toString())` under `if (isDiagnosticsEnabled())` (`parser.ts:67-69`; dist `packrat-entry-CS1td-8B.js:881` = `if (isDiagnosticsEnabled()) {`, `:882` = `console.error(this.state.toString());`). Labels and stderr are reachable **only together**. There is no logger parameter on this path — contrast `parserDebug` (`parser.ts:693`) and `debug.ts:355`, which both *do* take an injectable `logger`, proving the seam was understood and simply not applied where it matters. Note also that `this.state.toString()` is evaluated **eagerly as the argument**, so the full ANSI multi-line render (`state.ts:136-138` → `statePrint`, whose diagnostic extras at `debug.ts:174-189` are gated on the same flag) is built on every failure regardless of where stderr points.

The barrel makes this worse in two specific ways:

1. **No `isDiagnosticsEnabled` export.** It exists (`utils.ts:16`), is declared in the shipped types (`dist/utils.d.ts:5`), is even exported from the chunk as `i` (`dist/diagnostics-DDazRHgl.js:119`) for `packrat-entry`'s use, and is used internally twice (`parser.ts:67`, `debug.ts:174`) — but `diagnostics.ts:6-13` withholds it. A library that wants the standard discipline for a process-global toggle — read, set, restore — **cannot**. It can only `enable`/`disable` blindly, clobbering whatever an outer consumer configured. Two independent libraries in one process, each politely `disableDiagnostics()`-ing after use, silently disarm each other. The barrel exports precisely the two functions that make the global unsafe and withholds the one that would make it composable.
2. **No scoped posture.** `enableDiagnostics()` is arity 0 (`utils.ts:8`, `dist/utils.d.ts:3`) — no parser scope, no parse scope, no logger. Corpus-confirmed RED: X·P `W1.md:472` / `:572` (`enableDiagnostics() is process-global (arity) → 0 args`).

**Falsifier**: exhibit any path that populates `state.expected` with diagnostics disabled — the ternary at `utils.ts:33` and the guard at `:38` are the only two writers of `expected` in the package outside `resetErrorState` (`:133`) and `parser.ts:62` (a copy). Or exhibit a logger injection point on `parseStateInner` — `parser.ts:51-75` takes no arguments beyond `val`.

**Corpus**: this is **O-15 / PT-01**, re-verified at both source and dist, and X·P W1 **G-5** / W2 **R-LAW-3** ("diagnostics are values, never effects", `W2.md:281-283`). I confirm O-15's dist cites exactly. **No contradiction found.** New here: the missing getter as the *compositional* half of the defect, which the corpus records as an arity observation but not as a save/restore impossibility. The downstream cost is already paid and ledgered — W1 §G-5 (`W1.md:465-466`, `:492-493`) had to make a **byte-empty `bench.stderr`** a born-RED gate, and `W1.md:97-98` names this coupling as the reason; W2 EQ-4 (`W2.md:266`) rules that labels existing only under an armed mode read as **diagnostics-ABSENT**.

---

### L-B5 — *(NEW this pass)* the entire collection tier is untested, and `proof:subpath` never loads `/diagnostics`

**Severity**: BLOCKER · **Provenance**: exhaustive `grep -rn` over `test/`; `test/subpath-gate.mjs:25-55`; `test/dist-surface.test.ts:13-15`; `test/manifest-gate.mjs:24-46`; `package.json` `proof:*` scripts.

- **Zero test references.** `collectDiagnostic`, `getCollectedDiagnostics`, `clearCollectedDiagnostics`, `popLastDiagnostic`, `resetErrorState`, `formatDiagnostic`, `formatAllDiagnostics`, and `recover(` return **no hits** anywhere in `test/` (17 entries, enumerated in full, `test/benchmarks/` included). The only diagnostics symbols any test names are `enableDiagnostics`/`disableDiagnostics`, at `test/debug.test.ts:10-11,27,31` and `test/reentrancy.test.ts:10-11,14-15` — and both use them purely as `beforeEach`/`afterEach` scaffolding for assertions about *other* things (`summarizeLine`, `formatExpected`, expected-set accumulation).
- **`proof:subpath` does not exercise this surface.** `test/subpath-gate.mjs:25-36` checks that `./diagnostics`'s three exports-map fields point at files that **exist**. `:39-55` then imports **only** `./core` and `./packrat`, asserting only `core.Parser`, `core.dispatch`, `packrat.memoize`. `./diagnostics` and `./utils` are never loaded, never introspected. Renaming or deleting any export in `diagnostics.ts` leaves this gate GREEN.
- **`dist-surface` does not cover it either.** `test/dist-surface.test.ts:14-15` compares `src/parse/index.ts` against `dist/index.d.ts` **only**. The four subpath barrels (`diagnostics.ts`, `core.ts`, `utils-entry.ts`, `packrat-entry.ts`) are outside its scope — which is ironic, since its own header (`:6-11`) says it exists to bite "*a silent source↔dist version-drift defect*."
- **`manifest-gate` is manifest-shape only** (`typesVersions`, `sideEffects`, `exports["."].types`) — `test/manifest-gate.mjs:24-46`.

Three of the six functions this barrel publishes, plus the `Parser.recover()` combinator that is their sole producer, plus the `Diagnostic` shape they traffic in, have **no test of any kind** in a package published at **1.0.0** — and the gate written specifically to protect the subpath split only stats the file. The exposure is not hypothetical: **L-B3, L-B1's ungated push, L-M5, and L-M9 are four live defects, all on this untested path.** Untested-ness is the mechanism by which they stand.

**Falsifier**: exhibit one test — anywhere in `test/`, including `test/benchmarks/` — referencing any of the eight symbols, or any gate that imports `dist/diagnostics.js` and asserts its surface. Neither exists.

---

## 2. MAJORS

### L-M1 — `mergeErrorState` allocates two guaranteed-empty arrays per new-furthest event, with diagnostics OFF

**Severity**: MAJOR (hot-path allocation) · **Provenance**: `utils.ts:32-35`; dist `diagnostics-DDazRHgl.js:13-16`; 20 call sites (`leaf.ts:16,54,69,142` ×4, `parser.ts:93,201,223,239,258,273,291,410,418,447,460,468,504,553,626` ×15, plus the definition).

```ts
state.furthest = state.offset;
state.expected = diagnosticsEnabled && label ? [label] : undefined;   // GATED
state.suggestions = [];                                              // NOT gated
state.secondarySpans = [];                                           // NOT gated
```

The gating discipline is applied on line 33 and abandoned on lines 34-35 — same function, adjacent statements. When diagnostics are disabled, `suggestions` and `secondarySpans` **can never be non-empty**: their only writers, `addSuggestion` (`utils.ts:52`) and `addSecondarySpan` (`:58`), both return early under the same flag. So on the shipping default path these two assignments replace an empty array with a *different* empty array — pure garbage, no semantic effect.

Cost model: `furthest` is monotone per state, so new-furthest events are bounded by the count of distinct offsets reached, i.e. O(input length) for a backtracking grammar. A 100-char CSS value can burn ~200 short-lived array allocations per parse, entirely in the young generation, entirely pointless. Against PT-03's measured **93.9 ns/parse** unarmed baseline (O-15), this is not noise in the budget of a hot parser library. `mergeErrorState` is the single most-called function on the failure path, and the failure path is the *common* path inside `or`/`any`/`many` backtracking.

**Falsifier — including the strongest rebuttal, pre-empted.** Show a disabled-diagnostics route that pushes into either array: `addSuggestion`/`addSecondarySpan` are the only `.push` sites (`utils.ts:53`, `:59`), both flag-guarded. Or show the reset is required for correctness across a `furthest` advance — it is not; with the flag off both arrays are already `[]` from the field initializers (`state.ts:44-45`) and stay `[]`. The subtler rebuttal is that V8 sinks the allocation via escape analysis: **it cannot** — the array is stored into `state`, a long-lived heap object threaded through the whole parse, so it escapes by definition and TurboFan's escape analysis is inapplicable. Cure without behavior change: hoist the two resets inside the existing `diagnosticsEnabled` test, or guard with `if (state.suggestions.length)`.

---

### L-M2 — `collectDiagnostic` re-implements `ParserState.getLineAndColumn`, and does it worse

**Severity**: MAJOR (duplication + O(lines) allocation) · **Provenance**: `utils.ts:106-110` vs `state.ts:126-134`; dist `diagnostics-DDazRHgl.js:54-57`.

`collectDiagnostic` receives a `ParserState` (`utils.ts:102`) that already carries a public `getLineAndColumn(offset)` computing the identical 1-based-line / 0-based-column pair (`state.ts:127-134`). It ignores it and inlines its own:

```ts
const before = src.slice(0, furthest);              // utils.ts:107
const lastNl  = before.lastIndexOf("\n");           // :108
const line = lastNl === -1 ? 1 : before.slice(0, lastNl + 1).split("\n").length;   // :109
```

**Duplication is unambiguous** — I traced both across the newline/no-newline cases and they are semantically identical (`src.slice(0,furthest).lastIndexOf("\n")` ≡ `src.lastIndexOf("\n", furthest-1)`; the column expressions at `utils.ts:110` and `state.ts:132` are token-identical). The fork is gratuitous; the allocation-free `fromIndex` idiom is present three times next door (`state.ts:113`, `:120`, `:128`) and absent here.

> **CORRECTION to the prior pass (recorded, not buried).** The prior L-M2 listed three O(furthest) allocations, calling `src.slice(0, furthest)` a "full-prefix COPY" and `before.slice(0, lastNl + 1)` a second copy. **Both are wrong and are withdrawn.** V8 returns a `SlicedString` in O(1) for results ≥ `SlicedString::kMinLength` (13) over a flat parent, and `lastIndexOf` reads sliced content through `GetFlatContent` without flattening. Items 1 and 2 cost a wrapper object each, not a prefix copy. The "~200 KB of transient strings for a 100 KB source" figure does not hold and is retracted.

**The surviving claim, at its true scope**: `.split("\n").length` materializes **one string object per line of the prefix**, plus a `FixedArray`, to read `.length` and discard — the classic split-to-count antipattern. On a 10,000-line document that is ~10,000 allocations per diagnostic; in a `many().recover()` loop, *O(N × lines)* garbage for *N* errors, i.e. quadratic total work in source size on the very path this module exists to serve. `state.ts:131` shares the antipattern, so the duplication propagates the defect rather than isolating it.

**Falsifier**: exhibit a counting loop, `matchAll` count, or cached line index at either site — neither has one. Or show the two computations disagree, justifying the fork — they do not.

---

### L-M3 — four line/column implementations, two incompatible conventions

**Severity**: MAJOR (correctness of the published `Diagnostic`) · **Provenance**: `state.ts:111-117` (`getColumnNumber`), `state.ts:119-124` (`getLineNumber`), `state.ts:126-134` (`getLineAndColumn`), `utils.ts:106-110` (`collectDiagnostic`).

| impl | line base | no-newline case |
|---|---|---|
| `getLineNumber` (`state.ts:119`) | **0-based** | returns `0` (`:123`) |
| `getLineAndColumn` (`state.ts:129`) | **1-based** | returns `1` |
| `collectDiagnostic` (`utils.ts:109`) | **1-based** | returns `1` |
| `getColumnNumber` (`state.ts:111`) | column only | — |

`getLineNumber` also uses `lastIndexOf("\n", this.offset)` — **no `- 1`** (`state.ts:120`) — where the other two use `offset - 1`. On an offset that *is* a newline the two disagree by one line on top of the base disagreement.

So `Diagnostic.line` (the value this subpath publishes, `utils.ts:87`) and `state.getLineNumber()` (the value the same object would report) can differ by 1 or 2 for the same offset in the same source. A consumer correlating a collected `Diagnostic` against a live state — the natural thing to do, since `Diagnostic` carries no source reference (L-B1) — gets an off-by-one editor jump. `Diagnostic`'s field is undocumented as to base (`utils.ts:87`), so the consumer cannot resolve it from the types.

**Falsifier**: `src = "a\nb"`, `offset = 3`. `getLineAndColumn(3)`: `lastIndexOf("\n", 2)` → 1, so line = `"a\n".split("\n").length` = 2. `getLineNumber()` with `this.offset = 3`: `lastIndexOf("\n", 3)` → 1, line = `"a".split("\n").length` = 1. Two methods on one class, one offset, answers 2 and 1. To falsify, exhibit a documented base for each — none is documented.

---

### L-M4 — `getCollectedDiagnostics()` aliases the live global while `clearCollectedDiagnostics()` rebinds it

**Severity**: MAJOR (type unsoundness + aliasing incoherence) · **Provenance**: `utils.ts:138-140`, `:142-144`; dist `diagnostics-DDazRHgl.js:77-82`; both exported at `diagnostics.ts:11-12`.

```ts
export function getCollectedDiagnostics(): readonly Diagnostic[] {
    return collectedDiagnostics;          // :139 — the live array, by reference
}
export function clearCollectedDiagnostics(): void {
    collectedDiagnostics = [];            // :143 — REBIND, not truncate
}
```

Two defects that compound:

- **`readonly Diagnostic[]` is a compile-time fiction.** The returned reference *is* the mutable module global. A later `collectDiagnostic` mutates the array a caller is iterating — mutation-during-iteration, from a function the type annotation promises is read-only.
- **`get` aliases but `clear` rebinds**, so the two disagree about identity. A caller holding `const ds = getCollectedDiagnostics()` who then calls `clearCollectedDiagnostics()` observes `ds` **unchanged and permanently detached** — it will never see another diagnostic and never empty. Two callers can hold two arrays that both claim to be "the collected diagnostics" and disagree forever.

The discipline is applied at the wrong boundary: `collectDiagnostic` defensively copies all three inner arrays into the snapshot (`utils.ts:120-122`, rightly — see S-4), while the outer, genuinely dangerous handoff at `:139` is by reference.

**Falsifier**: show a copy at `:139` or a truncation (`length = 0`) at `:143`. Neither is present in source or in the shipped chunk (dist `:78`, `:81`). Either fix alone removes the incoherence; the pairing is what makes it MAJOR.

---

### L-M5 — `collectDiagnostic` zeroes `state.furthest`, destroying the enclosing parse's error position

**Severity**: MAJOR · **Provenance**: `utils.ts:127` → `resetErrorState` `utils.ts:131-136`, specifically `:132`; consumed at `parser.ts:60`.

`collectDiagnostic` ends by calling `resetErrorState(state)`, which sets `state.furthest = -1` (`utils.ts:132`). Since the only caller is `recover` (`parser.ts:666`) operating on the **live** parse state, one successful recovery anywhere in a grammar wipes furthest-offset tracking for the *entire enclosing parse*. `parseStateInner` then renders its error from exactly that field:

```ts
const furthest = state.furthest >= 0 ? state.furthest : state.offset;   // parser.ts:60
```

After a recovery, `furthest` reflects only progress made *since* the reset. If the deepest failure occurred before the recovery point, the final error message points at a **shallower** offset than the parse actually reached — the single most valuable number in a parse error, silently degraded by an unrelated feature. This is also an R-LAW-1 (`W2.md:275-278`) rollback-exactness violation: `recover` restores `offset` and `isError` (`parser.ts:669`, `:675-676`) but not `furthest`, which it destroyed as a side effect of journaling.

**Falsifier**: show `furthest` is restored on either `recover` exit path. `parser.ts:668-681` touches `isError`, `offset`, and `value` only. Or show the reset is needed — it is defensible for *snapshot* semantics ("so the next error starts fresh", `utils.ts:99-100`) but the correct scope is the recovered subtree, not the whole parse; a save/restore of `furthest` around `sync` preserves both.

---

### L-M6 — the barrel's own doc comment is factually wrong about the module it publishes

**Severity**: MAJOR (contract, and it is inside the 14 lines under audit) · **Provenance**: `diagnostics.ts:3-5` vs `utils.ts:102`.

> "The diagnostic accumulation tier — furthest-offset error merging plus **the opt-in collected-diagnostics buffer and its enable/disable toggles**." — `diagnostics.ts:3-5`

The sentence binds the buffer to the toggles. The bytes do not: `collectDiagnostic` has no flag check (L-B1), so the buffer accumulates on the unarmed default path, and `enableDiagnostics`/`disableDiagnostics` have **zero** effect on whether records are collected — only on how *populated* each record's `expected`/`suggestions`/`secondarySpans` fields are (`utils.ts:33`, `:52`, `:58`). Under the default configuration the buffer fills with structurally valid but semantically empty `Diagnostic`s: real `offset`/`line`/`column`/`found`, and three empty arrays.

Three of the barrel's fourteen lines assert a gating relationship that does not exist. For a 14-line file whose only content is documentation and re-exports, a false doc comment is a large fraction of the artifact.

**Falsifier**: exhibit the flag on `collectDiagnostic`'s path. `utils.ts:102-128` and dist `diagnostics-DDazRHgl.js:51-70` are both gate-free.

---

### L-M7 — the exported surface is not closed under its own semantics

**Severity**: MAJOR (API design) · **Provenance**: `diagnostics.ts:6-14` vs `utils.ts:16, 51, 57, 66, 131, 146` and `debug.ts:200, 235`.

The barrel publishes `collectDiagnostic` (a mutator with a side effect on the passed state) while withholding every counterpart:

| withheld | where | why it is needed by the exported surface |
|---|---|---|
| `isDiagnosticsEnabled` | `utils.ts:16` | save/restore around the global toggle (L-B4) |
| `resetErrorState` | `utils.ts:131` | `collectDiagnostic` performs it implicitly (`:127`); consumers cannot do it explicitly, nor undo it |
| `popLastDiagnostic` | `utils.ts:146` | the buffer is **accumulate-only** from outside; `recover` retracts internally (`parser.ts:674`), consumers cannot |
| `addSuggestion` / `addSecondarySpan` | `utils.ts:51`, `:57` | no way to *produce* a `Suggestion`, though the type ships (L-m4) |
| `formatDiagnostic` / `formatAllDiagnostics` | `debug.ts:200`, `:235` | no renderer for the `Diagnostic[]` the subpath hands back (and see L-M10 — they ship no runtime at all) |

Net: the module gives you a way to add records, no way to remove one, no way to read the flag it lets you set, no way to construct the value types it exports, and no way to render the values it returns. `clearCollectedDiagnostics` (all-or-nothing) is the sole retraction primitive.

**Falsifier**: show these are reachable via another documented subpath. `package.json` exports `.`, `./core`, `./diagnostics`, `./packrat`, `./utils`. `index.ts:5` re-exports the same six functions and no more; `utils-entry.ts` exports only `skipWhitespace`/`skipBlockComments` plus the sample parsers; `debug.ts` has **no** subpath at all.

---

### L-M8 — *(NEW)* the split is one-way: `core.ts`'s "never pulls the diagnostics accumulator" is false at the shipped bytes

**Severity**: MAJOR (doc↔bytes contradiction; tree-shaking claim) · **Provenance**: `src/parse/core.ts:3-5`; `dist/core.js:1`; `dist/packrat-entry-CS1td-8B.js:1`; `src/parse/parser.ts:4`.

`core.ts:3-5` asserts:
> "*The zero-side-effect primitive set … A consumer that imports only this **never pulls the diagnostics accumulator**, the packrat tier, or the json/csv domain parsers.*"

The shipped import chain says otherwise:
- `dist/core.js:1` — `import { P, a, b, c, d, e, f, g, h, l, j, r, s, n, t, w } from "./packrat-entry-CS1td-8B.js";`
- `dist/packrat-entry-CS1td-8B.js:1` — `import { i as isDiagnosticsEnabled, m as mergeErrorState, r as reportUnclosedDelimiter, f as addSuggestion, a as collectDiagnostic, p as popLastDiagnostic } from "./diagnostics-DDazRHgl.js";`

So `@mkbabb/parse-that/core` loads the **entire** diagnostics module — flag, `collectedDiagnostics` buffer, all 13 functions. It cannot do otherwise: `parser.ts:4` hard-imports six diagnostics symbols and `core.ts:7` exports `Parser`. `grep -ln "diagnostics-DDazRHgl" dist/*.js` returns `diagnostics.js`, `parse.js`, `utils.js`, **and** `packrat-entry-CS1td-8B.js`.

**This does not contradict S-1 and the two must not be conflated.** S-1's claim is that the diagnostics chunk imports *nothing* (verified: `dist/diagnostics-DDazRHgl.js` line 1 is `let diagnosticsEnabled = false;`, zero import statements). That is the **outbound** direction and it is true. L-M8 is the **inbound** direction: everything else imports *it*. The separability is one-way, so `/diagnostics` is cheap to import and impossible to avoid. The root cause is that `Parser`'s error path is written against the diagnostics module directly rather than against an injected sink — the subpath boundary is drawn at the barrel, where it is cosmetic, not at the seam, where it would be real.

**Falsifier**: show `dist/core.js` reaching `Parser` without the diagnostics chunk, or a build in which the chunk is absent from `core`'s graph. Neither holds. `core.ts:3-5` should be struck or qualified.

---

### L-M9 — *(NEW)* `ParserState.clone()` drops the diagnostic substate while keeping `furthest`, and `packrat.ts:351`'s scratch is never merged back

**Severity**: MAJOR · **Provenance**: `state.ts:101-109`, `:38-41`, `:43-45`, `:47-53`; `packrat.ts:349-357`, `:253-261`.

```ts
clone(): ParserState<T> {
    return new ParserState<T>(this.src, this.value, this.offset, this.isError, this.furthest);
}
```
The constructor takes five parameters (`state.ts:47-53`). `expected`, `suggestions`, and `secondarySpans` are **not** among them, so the clone receives a fresh `undefined` and two fresh empty arrays (`state.ts:43-45`) while **inheriting `furthest`**. That breaks the class's own documented invariant at `state.ts:38-41` — "*`expected` is the accumulated label set at `furthest`*" — since on the clone `furthest` is inherited and its label set is empty. A subsequent `mergeErrorState(clone, label)` at `offset === furthest` then takes the `else if` branch (`utils.ts:36-46`) and sets `expected = [label]`, having lost every previously accumulated alternative.

The single call site makes it live. `packrat.ts:349-357`:
```ts
const scratch = live.clone();
scratch.offset = pos; scratch.isError = false; scratch.value = undefined as T;
parser.parser(scratch);
const ans = snapshot(scratch as ParserState<unknown>);   // :352
```
`snapshot` (`packrat.ts:253-255`) captures `{offset, value, isError}` — three fields — and `applyAnswer` (`:257-261`) writes back the same three. Any deeper failure discovered during the eval-set re-evaluation raises `scratch.furthest` and populates `scratch.expected`, and **all of it is discarded**. Under `memoize()`/`mergeMemos()` + left recursion, `parseStateInner`'s error view (`parser.ts:57-60`) can therefore report an offset **earlier** than the parse genuinely reached, with a correspondingly wrong caret and expected-set — the same class of harm as L-M5, arriving by a different route.

**Falsifier**: show (a) `clone()` copies the three fields — `state.ts:101-109` shows five constructor args, none diagnostic; (b) `snapshot`/`applyAnswer` carry `furthest` — `packrat.ts:253-261` shows three fields; or (c) another merge path — `grep -rn "mergeErrorState(" src/` gives 20 sites, **none in `packrat.ts`**. **Honest bound**: this requires `memoize`/`mergeMemos` **and** left recursion **and** the eval-set branch — narrow, but it is exactly the configuration the packrat tier exists for, and L-B5 explains why nothing caught it.

---

### L-M10 — *(NEW)* there is no `dist/debug.js` at all: the `Diagnostic` renderers ship a `.d.ts` with no runtime

**Severity**: MAJOR (publish discipline; sharpens L-M7's last row) · **Provenance**: `dist/debug.d.ts:12,17`; `ls dist/*.js`; exhaustive grep of shipped bundles.

`formatDiagnostic` (`debug.ts:200`) and `formatAllDiagnostics` (`debug.ts:235`) are the only code in the package that turns a `Diagnostic` into anything a human reads — ~60 lines including caret placement, secondary-span rendering, and suggestion formatting. Reachability, checked exhaustively:

- No barrel exports them: `grep -n "debug" src/parse/{index,core,diagnostics,utils-entry,packrat-entry}.ts` → **zero hits**.
- No exports-map entry reaches `debug` (`package.json` ships five: `.`, `./core`, `./diagnostics`, `./packrat`, `./utils`).
- **`ls dist/*.js` → `core.js`, `diagnostics-DDazRHgl.js`, `diagnostics.js`, `packrat-entry-CS1td-8B.js`, `packrat.js`, `parse.js`, `utils.js`. There is no `debug.js`.** No debug runtime module is emitted at all.
- Both names appear in **no** shipped `.js`/`.cjs` — tree-shaken out entirely. They survive only as declarations at `dist/debug.d.ts:12,17`.

So `files: ["./dist"]` publishes a declaration file describing runtime functions that **do not ship**. That is precisely the source↔dist drift class `test/dist-surface.test.ts:6-11` was written to bite (the 8-of-15 `*Span` incident), scoped too narrowly to catch it — a direct compounding of L-B5. And read against L-B4 it completes the thesis: forced rendering of the unwanted, zero rendering of the wanted.

**Falsifier**: exhibit any published path from an exports-map entry to `formatDiagnostic`, or a `dist/debug.js`. Neither exists.

---

### L-M11 — *(NEW)* the subpath is not self-contained in TypeScript: two of six exports take a type it does not export

**Severity**: MAJOR (type quality / module boundary) · **Provenance**: `dist/diagnostics.d.ts:1-2` vs `dist/utils.d.ts:6,28`; `dist/core.d.ts:2`.

```ts
export declare function mergeErrorState(state: ParserState<unknown>, label?: string): ParserState<unknown>;
export declare function collectDiagnostic(state: ParserState<unknown>, errorOffset: number): void;
```
`dist/diagnostics.d.ts` re-exports six functions and three types — and **not** `ParserState`. A consumer importing only `@mkbabb/parse-that/diagnostics` receives two functions whose first parameter — and, for `mergeErrorState`, whose **return type** — they cannot name without additionally importing from `.` or `./core` (`dist/core.d.ts:2`). This is the type-level twin of L-B2's runtime finding: the subpath hands you a mutator over a value it will not let you hold or describe.

**Falsifier**: find `ParserState` (value or type) in `diagnostics.ts` or `dist/diagnostics.d.ts`. It is in neither. *(Distinct from L-m3, which is about the depth of the type graph `tsc` must load; this is about a name the consumer needs and cannot get.)*

---

## 3. MINORS

### L-m1 — `found` slices by UTF-16 code unit and can emit a lone surrogate
**Severity**: MINOR · **Provenance**: `utils.ts:113`; dist `diagnostics-DDazRHgl.js:58`.
`src.slice(furthest, furthest + 20)` cuts at a fixed code-unit count. A source with an astral character (emoji, many CJK extensions, math script) straddling offset `furthest + 20` yields a `Diagnostic.found` containing an unpaired surrogate. `JSON.stringify` emits it as a `\udXXX` escape that is not well-formed UTF-8, and transports that validate (some HTTP/JSON layers, `Buffer.from(s, "utf8")` round-trips) mangle or reject it. **Falsifier**: `Array.from(...).slice(0, 20)` or an `Intl.Segmenter` removes the hazard — the tree uses neither; there is no surrogate handling anywhere in `utils.ts`.

### L-m2 — `found` escapes only `\n`, and is then interpolated into ANSI output
**Severity**: MINOR · **Provenance**: `utils.ts:113` (`.replace(/\n/g, "\\n")`) → `debug.ts:224`, with the ANSI codes from `ansi.ts`.
`\r`, `\t`, `\x1b`, and every other C0 control pass through untouched into a string the library itself renders with escape sequences around it. A raw ESC in the input lands inside an ANSI context in a terminal — cursor moves, dirty color state, or `\r` overwriting the diagnostic line. Low impact (the sink is a developer terminal), but the escape list is arbitrarily one character long. **Falsifier**: point to a sanitizer between `utils.ts:113` and `debug.ts:224` — `formatDiagnostic` (`debug.ts:200-227`) applies none.

### L-m3 — `mergeErrorState` is core plumbing mis-shelved as a diagnostic, and the type graph is not a leaf
**Severity**: MINOR · **Provenance**: `diagnostics.ts:7`; 20 call sites; `dist/diagnostics.d.ts:1` → `dist/utils.d.ts:1` → `dist/state.d.ts:1`.
`mergeErrorState` runs on **every** parse failure regardless of the flag — it is the furthest-offset machine, not a diagnostic feature. Shelving it under `/diagnostics` mis-signals cost. Separately: while the **runtime** graph is a true leaf (S-1), the **type** graph is not — `diagnostics.d.ts` re-exports from `./utils.js`, whose `.d.ts` imports `ParserState` from `./state.js`, whose `.d.ts` imports `Parser` from `./parser.js`. A consumer wanting only `enableDiagnostics(): void` makes `tsc` load the entire parser type surface. **Falsifier**: the runtime asymmetry is real and favorable (S-1); this is a type-checking cost only, hence MINOR.

### L-m4 — `Suggestion` / `SecondarySpan` are exported as read-only decoration
**Severity**: MINOR · **Provenance**: `diagnostics.ts:14`; `state.ts:25-34`; constructors withheld (`utils.ts:51`, `:57`).
Both types ship, neither can be produced by a consumer, and `Suggestion.kind` is a closed two-member union (`state.ts:26`) so a consumer could not extend it even if `addSuggestion` were exported. They are useful solely for destructuring `Diagnostic`, which `Diagnostic` already implies. **Falsifier**: exporting `addSuggestion`/`addSecondarySpan` would make them constructive — the barrel does not.

### L-m5 — `expected?: string[]` is a tri-state, branched at every read
**Severity**: MINOR (ergonomics; **not** a shape hazard) · **Provenance**: `state.ts:43`; reads at `utils.ts:39`, `:120`, `parser.ts:62`, `debug.ts:175`.
`expected` is `undefined | [] | string[]` where `undefined` and `[]` mean the same thing. Every consumer pays a branch (`state.expected ? [...state.expected] : []` at `utils.ts:120`; `state.expected ?? []` at `debug.ts:175`). **The stronger V8 claim is declined and stays declined** — see F1: under `target: ES2022` with default `useDefineForClassFields`, the field is installed at construction (`dist/packrat-entry-CS1td-8B.js:300` emits a bare `expected;`), so there is **no** hidden-class transition. The residual defect is the redundant tri-state and its branches. Recorded this way deliberately; the shape-transition version of this finding would be false.

### L-m6 — *(NEW)* dual-package hazard on state whose entire contract is singleton-ness
**Severity**: MINOR · **Provenance**: `dist/diagnostics.js:1` vs `dist/diagnostics.cjs:3`; `package.json:9-31`.
`dist/diagnostics.js:1` binds `./diagnostics-DDazRHgl.js`; `dist/diagnostics.cjs:3` binds `./diagnostics-DpUY87_d.cjs`. Two module graphs, each with its own `let diagnosticsEnabled` and `let collectedDiagnostics`. A consumer tree resolving both forks — an ESM app with a CJS transitive dependency, routine — gets **two** flags and **two** buffers: `enableDiagnostics()` on one does not govern parses running through the other, and `getCollectedDiagnostics()` reads the wrong buffer. Most dual-package hazards are benign because the module is stateless; this is the case where it is not. **Honest scope (see F3)**: *within* each fork the state is correctly singleton — all four ESM entries share the one chunk, verified by `grep -ln`. The hazard exists only across the `import`/`require` fork, which `package.json` ships for all five entries.

### L-m7 — *(NEW)* a fresh `RegExp` object per collected diagnostic
**Severity**: MINOR · **Provenance**: `utils.ts:113` → dist `diagnostics-DDazRHgl.js:58`.
`.replace(/\n/g, "\\n")` — a regex **literal** evaluated inside a function body allocates a new `JSRegExp` on every call (the compiled code is cached; the object is not). Hoisting to module scope is free and safe here (`String.prototype.replace` with a global regex resets `lastIndex`). An outlier against the file's own byte-scanner discipline (S-6), which is why it reads as an oversight. **Falsifier**: show the literal is hoisted or the call is cold — it is neither; it is on the per-diagnostic path that L-B1 shows runs unarmed.

### L-i2 (INFO) — `sideEffects: false` versus a top-level call in `parser.ts`
**Severity**: INFO (scope-adjacent) · **Provenance**: `package.json` `"sideEffects": false`; `parser.ts:711` `_initWhitespace();`.
The package declares itself side-effect-free while `parser.js` executes `_initWhitespace()` at module scope. This is **not** on the diagnostics chunk's graph (S-1) — recorded for the core-module challenge, not charged here. For *this* module the declaration is honest: init is two assignments (`dist:1`, `:50`) and no top-level work. **Falsifier**: `dist/diagnostics.js` imports one chunk with zero further imports; `_initWhitespace` is not reachable from it.

---

## 4. Corroboration (not a defect)

### L-i1 — PT-03's one-way latch, independently re-verified at the bytes
**Provenance**: `dist/packrat-entry-CS1td-8B.js`, exhaustive grep for `PACKRAT_ARMED`:

```
678:  let PACKRAT_ARMED = false;      // initializer
682:  if (!PACKRAT_ARMED) return null;// read
714:  if (!PACKRAT_ARMED) return;     // read
722:  PACKRAT_ARMED = true;           // the ONLY write
```

Four occurrences in the shipped bundle, exactly as O-15 reported: one initializer, two reads, one write-to-true, **zero** writes back to false. Source concurs (`packrat.ts:156,217,266,290`), and `packrat.ts:289` states outright "*The latch never disarms*"; `resetPackrat` (`packrat.ts:263-272`) clears the memo store and does not disarm. **O-15 PT-03 confirmed with no contradiction**, at the exact line numbers it cited. Relevant to this module because it is the same anti-pattern class as L-B4/L-B1 — a process-global latch with no inverse — and because X·P W1 **G-4** and W2 **§3b O-8** already forbid it by construction; `W2.md:254` generalises it into the rule this module also breaks: "*Arming, memoization, and diagnostics are **parameters of a parse**, never latches.*" `diagnosticsEnabled` is the second latch of the pair. I ran no bench and armed nothing; this is a static read.

---

## 5. SUPERLATIVES (L-18, the other direction)

### S-1 — the `/diagnostics` subpath is a **true runtime leaf**, and that is rare
**Provenance**: `dist/diagnostics.js:1`; `grep -n "^import\|require(" dist/diagnostics-DDazRHgl.js` → **no matches**; chunk is 125 lines.
Importing `@mkbabb/parse-that/diagnostics` pulls one 125-line chunk with **zero** transitive runtime imports — no `Parser`, no `packrat`, no `debug`, no `ansi`. This is possible only because `utils.ts:1` and `:3` are `import type` / `export type` (`verbatimModuleSyntax: true`), so the `state.js` dependency erases completely at build. Deliberate, correct, and easily lost; the tree holds it.
**Falsifier**: a single value import from `state.js` in `utils.ts` would collapse it — `state.ts:2` imports `statePrint` from `debug.js`, which would drag `debug` and `ansi` into every consumer of the toggles. It does not happen. Verified in the published artifact, not inferred. *(L-M8 is the inbound direction and does not touch this claim.)*

### S-2 — the per-state migration of furthest/expected is real, and the module says why
**Provenance**: `utils.ts:20-26`; `state.ts:36-45`; `mergeErrorState` `utils.ts:28-49`.
The comment block states the design (per-`ParserState`, not module-global, "so a nested `.parse()` mid-rule … cannot corrupt the outer parse's error tracking") with its Rust-port lineage, and the bytes honor it exactly: `mergeErrorState`, `addSuggestion`, `addSecondarySpan`, `reportUnclosedDelimiter` and `resetErrorState` touch **only** the state passed in. Rationale-in-place that matches the implementation is the exception, not the rule. That L-B1 is the discipline stopping one function short sharpens rather than dulls the compliment.
**Falsifier**: a module-global write inside any of those five functions. There is none; `collectedDiagnostics` is the only module-level mutable, and only `collectDiagnostic`/`clearCollectedDiagnostics` touch it.

### S-3 — `mergeErrorState`'s common path is allocation-free and its dedupe is in-place
**Provenance**: `utils.ts:29-47`.
The three-way comparison puts the overwhelmingly common case (`state.offset < state.furthest` — a backtracking failure shallower than the deepest reached) on an **empty** path: no branch body, no allocation, immediate `return state`. The same-offset label accumulation dedupes with `Array.prototype.includes` on a tiny array (`:40-42`) rather than allocating a `Set` — right for the expected cardinality. Correct hot-parser instinct; L-M1 is a lapse *within* an otherwise well-shaped function, which is why it reads as a fixable oversight rather than a design error.
**Falsifier**: an allocation on the `<` path. There is none — the `else if` at `:36` has no `else`.

### S-4 — the snapshot genuinely cannot alias the live state
**Provenance**: `utils.ts:120-122`.
`collectDiagnostic` copies all three arrays (`[...state.expected]`, `[...state.suggestions]`, `[...state.secondarySpans]`) into the record before the subsequent `resetErrorState` mutates the originals. Given that `resetErrorState` immediately reassigns those fields (`:134-135`), the copies are load-bearing, and getting this wrong would have produced a subtle shared-mutation bug. It is right.
**Falsifier**: drop any spread and the record aliases arrays that `:134-135` replaces — a real bug the tree avoided. (L-M4's complaint is that this same care was not applied one function later, at the boundary where it matters more.)

### S-5 — module size is Goldilocks-correct
**Provenance**: `diagnostics.ts` — 14 lines, 5 of comment, 6 value exports, 3 type exports, one import source.
There is nothing to split, nothing to merge, no god-module pressure. Every finding above is about *which* symbols crossed the boundary and what they do — not about the boundary's existence or the file's size.
**Falsifier**: identify a symbol that belongs here and is absent for size reasons — L-M7's list is absent for *design* reasons; adding all eight would still leave the file under 25 lines.

### S-6 — *(NEW)* the byte-scanners in the same file are textbook, which is what makes L-M1/L-M2/L-m7 read as oversights
**Provenance**: `utils.ts:158-186`.
`skipWhitespace`/`skipBlockComments`: `charCodeAt` compared against literal 32/47/42, `indexOf("*/")` as a memchr-style close-token scan rather than a per-character loop, a **single** `state.offset` writeback at the end rather than per-step mutation, no closure allocated per step, and an unterminated comment handled by `break` (stopping at the comment start) rather than scanning to EOF. This is exactly the allocation discipline the L axis asks for, in the same 186-line file as the defects above — the strongest available evidence that L-M1, L-M2 and L-m7 are lapses rather than the author's standard.
**Falsifier**: an allocation or a closure inside either loop. There is none — both are `while` loops over a local `i` with one store at exit.

### WITHDRAWN superlative (recorded, not silently dropped)
I drafted a sixth commendation for `recover`'s pop-on-sync-failure (`parser.ts:670-676`) as "a careful transactional touch — most recovery combinators leak a phantom diagnostic here." **It is withdrawn**: L-B3 shows the `pop()` retracts the *wrong* record under composition, so the mechanism is not merely uncommendable, it is a BLOCKER. The intent was right; the primitive is wrong. Recorded because a superlative I killed against myself is evidence the same way a defect is.

---

## 6. FALSIFIED — hypotheses killed against myself

**F1 · "`expected?: string[]` with no initializer forces a hidden-class transition on the hottest object in the library." — FALSE, withdrawn.**
I expected `expected` to be absent from `ParserState`'s initial shape (unlike `suggestions`/`secondarySpans`, which carry `= []` at `state.ts:44-45`), making `utils.ts:33`'s assignment a map transition on the ordinary error path even with diagnostics off. At the bytes: `tsconfig.json` targets **ES2022**, so `useDefineForClassFields` defaults to `true`, and `dist/packrat-entry-CS1td-8B.js:300` emits a bare `expected;` field declaration — the slot **is** installed at construction with value `undefined`. No transition. Reached independently by the prior pass (L-m5), which likewise declined the stronger claim; two passes, same falsification.

**F2 · "`src.slice(0, furthest)` copies the entire source prefix." — FALSE; forced an in-place correction to L-M2.**
V8 returns a `SlicedString` in O(1) for results ≥ 13 chars over a flat parent, and `lastIndexOf` reads sliced content through `GetFlatContent` without flattening. The prior pass's "full-prefix COPY" ×2 and its "~200 KB of transient strings" figure are retracted in L-M2 above. Only the `.split("\n")`-to-count allocation survives, and L-M2 is now stated at that narrower scope.

**F3 · "The ESM build duplicates the diagnostics state across subpath entries." — FALSE within ESM; survives only across the ESM/CJS fork (L-m6).**
`grep -ln "diagnostics-DDazRHgl" dist/*.js` returns all four ESM consumers pointing at the **one** shared chunk, so `enableDiagnostics()` imported from `/diagnostics` does correctly govern parsers built from `.` or `/core`. Vite's chunking is right; L-m6 is scoped to the `import`/`require` fork alone.

---

## 7. CORPUS RECONCILIATION

| Corpus row | Status |
|---|---|
| **O-15 · PT-01** (label no-op unless armed; arming couples unconditional `console.error`; `diagnostics-DDazRHgl.js:14` + `packrat-entry-*.js:881`) | **CONFIRMED at the bytes**, same chunk hashes. Escalated to BLOCKER (**L-B4**) and extended: the lever is missing from this barrel specifically, and `parser.ts:67` is the one error site in the package taking **no** injected `logger` while `debug.ts:355` and `parser.ts:693` both do. |
| **O-15 · PT-03** (one-way latch; `:678` false, `:682`/`:714` read, `:722` true, no write back) | **CONFIRMED at the bytes** — exactly four occurrences, one write. **L-i1**. Not charged against this module; recorded because `diagnosticsEnabled` is the same anti-pattern (`W2.md:254`). Nothing armed. |
| **O-15 · PT-04** (`Parser.lazy` arity 1, deepest OK 7,761, `RangeError` at 7,762) | **Not re-measured** — measuring means running a 7.7k-deep parse, outside this module. Read-only concurrence: `lazy.ts:18-24` `createLazyCached` adds one JS frame per back-edge with **no depth counter**, so the ceiling is the raw JS stack and O-15's number is the expected shape. Routed by `W1.md:76` → G-9, `W2.md:132` → depth-as-parameter + G-11. |
| **O-15 · PT-07** (non-string raw `TypeError`; `.parse()` `undefined` on failure) | **CONFIRMED and EXTENDED (L-B2).** `parser.ts:74-76` — `parse(val) { return this.parseState(val).value; }`, no guard, no `ok`-wrapper. Added limb: with diagnostics armed the buffer is **also** empty, since `collectDiagnostic` has one caller inside `recover`. I do **not** contradict O-15's posture that the cure is a JS-boundary invariant above parse-that; I sharpen why that wrapper must own diagnostics outright (W2 Layer **D**, `W2.md:239`). |
| **X·P W1 §G-5** (`W1.md:465-466`, `:492-497`) — diagnostics quarantined, byte-empty `bench.stderr` | The downstream cost already paid for L-B4. `W1.md:497`'s note that a harness which merely *disables* diagnostics after use "fails for the same structural reason as G-4" independently corroborates the save/restore impossibility. |
| **X·P W2 §R-LAW-1 / R-LAW-3 / R-LAW-4** (`W2.md:275-284`) | Violated at specific lines: R-LAW-1 by **L-B3** (LIFO pop, not mark/rewind) and **L-M5** (`furthest` destroyed, not restored); R-LAW-3 by **L-B4**; R-LAW-4 by **L-B1** (per-process amplification) and **L-B3** (both directions at once). W2's `console.error`-throws probe (`:282-283`) would fail armed parse-that on any corpus containing one rejection. |
| **X·P W2 §EQ-4** (`W2.md:266`) | "*A candidate whose labels exist only under an armed-diagnostics mode reads as diagnostics-ABSENT and fails (PT-01)*" — this module's exact posture. |
| **registry/adjudicated/parser-band.md:112, :116** — cand-F's labelled failures beat cand-O's opaque `(?!)`; debt 1 binding on the wave | **Reinforced with a hazard the adjudication did not price.** parse-that labels flow through `mergeErrorState(state, label)` (`leaf.ts:142`), and `utils.ts:33`/`:38` gate label capture on `diagnosticsEnabled`. A wave discharging debt 1 through parse-that's **native label channel** gets labels only when armed — dragging L-B4's `console.error` and failing EQ-4 as diagnostics-ABSENT. **Debt 1 must be discharged in the wave's own value-level `D` journal (`W2.md:239`), never via `mergeErrorState` labels.** This is the one place the tree materially sharpens `parser-band.md`. |
| **parser-band.md:118** — depth bounded by construction, not by catch | Concurs with the PT-04 reading: `lazy.ts` supplies no depth parameter, so any bound must be built above it. |

**Explicit contradiction of the tree.** `src/parse/core.ts:3-5` — "*A consumer that imports only this never pulls the diagnostics accumulator*" — is **false** at the shipped bytes (**L-M8**). This is a source comment, not a corpus row, and I contradict it directly and on the record.

---

## 8. Bottom line

The barrel is a well-drawn boundary (S-1, S-5) over an implementation whose global half was never finished. The per-state error tracking is genuinely correct and genuinely reentrant (S-2); the collected-diagnostics buffer beside it is a process-global, flag-ungated, unbounded, source-unattributed array whose reader aliases it, whose eraser rebinds it, whose only writer is unreachable from this subpath, and whose retraction primitive pops the wrong element under composition. The doc comment calling that buffer "opt-in" is false (L-M6) and occupies three of the file's fourteen lines. Nothing in the tier is tested (L-B5), the renderers for the type it publishes ship no runtime at all (L-M10), and the subpath it draws is separable only outbound (L-M8).

**Highest-value cures, none of them a rewrite and none altering the public type surface:**
1. Delete `parser.ts:67-69`, or route it through an injectable sink as `parserDebug` already does — discharges **L-B4**, unblocks W1 G-5, satisfies W2 R-LAW-3, and makes `parser-band.md`'s debt-1 labelled failures usable in production rather than only under an armed, stderr-writing mode.
2. Gate `collectDiagnostic` on `diagnosticsEnabled` (**L-B1**, **L-M6**).
3. Mark/rewind the journal by length in `recover` instead of `pop()` (**L-B3**, R-LAW-1).
4. Hoist the two array resets in `mergeErrorState` inside the existing flag test (**L-M1**).
5. Export `isDiagnosticsEnabled` (**L-B4.1**, **L-M7**).
6. Delete `utils.ts:106-110` in favor of `state.getLineAndColumn` (**L-M2**), then fix the split-to-count at `state.ts:131` once, for both.
7. Extend `test/subpath-gate.mjs:39` to import and assert `./diagnostics` and `./utils` (**L-B5**) — six lines.

Five of the seven are one-line changes.
