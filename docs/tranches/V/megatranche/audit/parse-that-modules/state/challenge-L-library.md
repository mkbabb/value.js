claude-opus-5[1m]

# CHALLENGE — module `state` · axis L (LIBRARY)

**Target**: `/Users/mkbabb/Programming/parse-that/typescript/src/parse/state.ts` (189 lines)
**Tree**: `parse-that` main checkout, HEAD `ef10d5b`, package `@mkbabb/parse-that@1.0.0`. Read-only.
**Read whole**: `state.ts` + every file it imports (`parser.ts` 711, `debug.ts` 383) + every file
*those* import (`utils.ts` 186, `lazy.ts` 43, `ansi.ts` 17, `leaf.ts` 399, `packrat.ts` 488,
`split.ts` 58) + the tier entries (`core.ts`, `index.ts`, `diagnostics.ts`, `utils-entry.ts`,
`packrat-entry.ts`) + `tsconfig.json` + `package.json` + `test/subpath-gate.mjs` + the shipped
`dist/` bytes.
**Posture**: module assumed DEFECTIVE until the tree proved otherwise. Two hypotheses were
falsified by the tree and are recorded as superlatives (S-1, S-5), not suppressed.

**STOP-condition check**: `ls /Users/mkbabb/Programming/parse-that-css-totality-p2` → *No such file
or directory*. **CLEAN — no STOP finding.** No worktree, frozen root, or `~/Documents/Codex` path
was entered. No browser tooling. No bench. The one executable act was a **read-only correctness
probe** in a fresh throwaway process against `dist/core.js` that calls neither `memoize()` /
`mergeMemos()` (so `PACKRAT_ARMED` cannot arm — packrat.ts:290 is the sole write) nor
`enableDiagnostics()`; probe source at
`…/scratchpad/probe.mjs`, outputs pasted inline below and labelled **[PROBE n]**.

**Tally**: **15 defects** — 1 BLOCKER, 5 MAJOR, 9 MINOR — plus 2 INFO scoping notes and **5
superlatives**.

---

## 0. Hitherto corpus — folded, corroborated, contradicted

O-15's dist line-cites were re-verified **at the bytes of the same shipped chunk**. They hold, with
one ±1 and one substantive contradiction.

| O-15 row | O-15 claim | verdict at the bytes | cite |
|---|---|---|---|
| **PT-01** | `label` is a no-op unless diagnostics armed | **CONFIRMED, exact** | `dist/diagnostics-DDazRHgl.js:14` = `state.expected = diagnosticsEnabled && label ? [label] : void 0;` — source `utils.ts:33`; the accumulate arm gated identically at `utils.ts:38` |
| **PT-01** | arming couples an unconditional `console.error` | **CONFIRMED, ±1** | O-15 cited `packrat-entry-*.js:881`; :881 is `if (isDiagnosticsEnabled()) {`, :882 is `console.error(this.state.toString());`. Source `parser.ts:67-69`. No injectable sink; the only logger seam in the module family is `parserDebug`'s param (`debug.ts:355`), which this path does not use |
| **PT-03** | `PACKRAT_ARMED` one-way latch, `:678` false / `:722` true / read `:682`,`:714` | **CONFIRMED, exact, all four** | `sed -n '678p;682p;714p;722p'` → `let PACKRAT_ARMED = false;` / `if (!PACKRAT_ARMED) return null;` / `if (!PACKRAT_ARMED) return;` / `PACKRAT_ARMED = true;`. Source: `packrat.ts:156,217,266,290` — `grep -rn PACKRAT_ARMED src/` returns **exactly 5 hits, one comment + one init + two reads + one write-to-true; no write-to-false exists** |
| **PT-04** | deepest OK 7,761, `RangeError` at 7,762 | **not re-measured** (would require a deep-recursion drive; out of the read-only bound). **Scoped out of `state.ts` — see INFO i-1** | — |
| **PT-07** | 5/5 non-string inputs throw a raw `TypeError` | **CONFIRMED 5/5** `[PROBE J]` | `null`/`undefined` → *Cannot read properties of … (reading 'charCodeAt')*; `5`/`{}`/`[]` → *state.src.charCodeAt is not a function*. Site `leaf.ts:285` (len-1 fast path) or `leaf.ts:297` (`startsWith`). **Every message names an internal method, never the contract** |
| **PT-07** | `.parse()` returns `undefined` on failure | **CONTRADICTED — the tree is worse than the row.** See **BLOCKER B-1** | `[PROBE A/C/D]` |

**X·P wave-spec overlap.** W1 §G-4 ("THE BENCH IS NEVER ARMED", W1.md:434-439, restated :575)
already anchors the latch to `packrat-entry chunk :678,:722 — set by makeMemoized(), never cleared`.
This challenge corroborates that anchor at the same bytes and adds the source-side proof
(`packrat.ts:290` is the *unique* write-to-true, reached from `makeMemoized` at **construction**,
not first invocation — so *building* a memoized parser and never running it still arms the process
for its lifetime). W1.md:76 homes PT-04 and PT-07 as harness/boundary concerns above parse-that;
INFO i-1/i-2 below agree and say why neither is a `state.ts` byte.
`registry/adjudicated/parser-band.md` bears on this module only through the ruled winner's
measured cost (cand-O node 1247 ns vs published 1500 ns) — cited once, in **S-5**, as the reason
the mutable-single-cell design is right.

---

## BLOCKER

### B-1 — `.parse()`'s failure value is arbitrary and collides bit-for-bit with legitimate success values; `ParserState.err()`, the one construct that would prevent it, has **zero callers**

**Severity**: BLOCKER — silent wrong answer at the library's most-used public entry point.
**Provenance**: `state.ts:62-67` (`err()`), `state.ts:36` (no `isError`/`value` coupling),
`parser.ts:77-79` (`.parse()`), `parser.ts:74` (returns the *live* state, not the error view),
`parser.ts:555` (`many`), `parser.ts:628` (`sepBy`), `parser.ts:82-97` (`then`).

`ParserState` exposes `err<S>(value?: S, offset = 0)` (state.ts:62-67), whose no-arg form sets
`value = undefined` **and** `isError = true` together — the typed error transition. `grep -rn "\.err("
src/ test/` returns **0 hits**. Nothing in the library, or its tests, ever calls it. The live error
protocol is instead two *independent, uncoupled raw writes*, and combinators choose their own
residue:

```
parser.ts:553-556   mergeErrorState(...); state.isError = true; state.unsafeSetValue([]);   // many
parser.ts:626-629   mergeErrorState(...); state.isError = true; state.unsafeSetValue([]);   // sepBy
parser.ts:93-96     mergeErrorState(...); state.offset = savedOffset; state.isError = true; // then — value untouched
```

`parseStateInner` builds a positioned `errorState` for display (parser.ts:60-66) but **returns
`state`** (parser.ts:74), and `.parse()` is `this.parseState(val).value` (parser.ts:78). So the
failure value is whatever the last combinator happened to leave.

**[PROBE A/B/C/D]** — fresh process, `dist/core.js`, diagnostics off, packrat unarmed:

```
A many(1) FAIL     .parse('zzz') => []       <- FAILED parse
B many(0) OK-empty .parse('zzz') => []       <- SUCCESSFUL empty match
C sepBy(x,1) FAIL  .parse('zzz') => []
D then FAIL        .parse('ab')  => "a"      <- residue of the first sub-parser
```

Rows **A and B are indistinguishable**. A caller cannot tell a failed `many(1)` from a successful
`many(0)`: both yield `[]`, which is *truthy*, so even the defensive `if (!result)` idiom passes. Row
**D** is worse — a failed `then` returns `"a"`, a value the grammar could legitimately have produced.

**Falsifier**: *"Callers are supposed to use `.parseState()` and check `.isError`, so `.parse()`'s
value on failure is unspecified."* — **Survives.** (i) `.parse()` is the documented, exported,
three-line convenience wrapper and the shape every consumer reaches for; (ii) nothing in
`state.ts`, `parser.ts`, or the tier docblocks says its failure value is unspecified; (iii) the
class ships `err()` — a construct whose entire purpose is to make error ⇒ `value = undefined`
hold — and then never uses it, so the module *asserts* the invariant in its API and *violates* it
in its implementation; (iv) O-15's PT-07 already treats "returns `undefined` on failure" as the
observed contract — the tree does not even honour *that*, so a consumer following O-15's
characterization is mis-informed in the unsafe direction.
**Second falsifier**: *"This is a `parser.ts` defect, not `state.ts`."* — Partially. The
manifestation is in `parser.ts`; the **enabling absence** is `state.ts`'s: `isError` and `value` are
two unrelated public mutable fields (state.ts:47-53) with no discriminated pairing and no enforced
transition, and the one method that would pair them is dead. A `state.ts`-side cure exists and is
one line of discipline: make `err()` the sole error transition and delete the raw `isError = true`
idiom. **Recorded here because the axis names `.parse()` undefined-on-failure ambiguity explicitly.**

---

## MAJOR

### M-1 — `state.ts:2` value-imports `debug.js`, so the shipped `./core` tier drags in the ANSI renderer **and** the entire diagnostics module — falsifying `core.ts`'s own docblock at the bytes

**Severity**: MAJOR — nullifies the A.W3 subpath split for the tier it matters most on, and no gate
catches it.
**Provenance**: `state.ts:2`, `state.ts:136-138`, `core.ts:4-6`, `dist/core.js:1`,
`dist/packrat-entry-CS1td-8B.js:1,28,135,262,268,368,675-844`, `package.json:"sideEffects": false`,
`test/subpath-gate.mjs:26-56`.

`core.ts:4-6` states the tier's contract verbatim:

> *"The zero-side-effect primitive set… A consumer that imports only this **never pulls the
> diagnostics accumulator, the packrat tier**, or the json/csv domain parsers."*

At the bytes, two of those three are false:

```
dist/core.js:1                      import { P, a, b, … } from "./packrat-entry-CS1td-8B.js";
dist/packrat-entry-CS1td-8B.js:1    import { i as isDiagnosticsEnabled, m as mergeErrorState,
                                             r as reportUnclosedDelimiter, f as addSuggestion,
                                             a as collectDiagnostic, p as popLastDiagnostic }
                                             from "./diagnostics-DDazRHgl.js";
dist/packrat-entry-CS1td-8B.js:28   const enabled = … process.env.NO_COLOR;     <- ANSI
dist/packrat-entry-CS1td-8B.js:135/268/368   statePrint
dist/packrat-entry-CS1td-8B.js:675-844       MEMO / PACKRAT_ARMED / makeMemoized / memoize
```

`./core` resolves to a **40,576-byte / 1,438-line** chunk that *is* the packrat entry and that
imports the diagnostics chunk. (`grep -c "jsonParser\|csvParser"` on the chunk → **0**, so the
json/csv third of the claim is honest; the other two are not.)

The **root cause is `state.ts`**: line 2 is a *value* import of `statePrint`, consumed only by
`toString()` at `state.ts:136-138`. That creates a genuine ESM value cycle
`state → debug → {ansi, utils, lazy, parser} → state`, and — decisively — the retention edge is a
**prototype method reference**. `package.json` declares `"sideEffects": false`, inviting downstream
DCE, but no bundler can drop `statePrint` while `ParserState.prototype.toString` names it and the
class is exported. `ParserState` is therefore **inseparable from the ANSI presentation layer and
the diagnostics flag by construction**.

**Falsifier**: *"`proof:subpath` gates the split, so this is already covered."* — **Survives.**
`test/subpath-gate.mjs` asserts only that the four subpath targets *exist* and that
`core.Parser`, `core.dispatch`, `packrat.memoize` are functions (:44-56). It makes **no** payload
or exclusion assertion. The docblock's separation claim is entirely unenforced.
**Second falsifier**: *"Chunking is Vite's choice; source-level the modules are separate."* —
**Survives.** The published artifact is the contract, `package.json:exports` points `./core` at
`dist/core.js`, and that file's first line is the import above. A consumer gets the 40KB chunk.

### M-2 — `clone()` copies the diagnostic **anchor** and drops the **payload**; the result is internally incoherent, not merely lossy

**Severity**: MAJOR — public API misnomer with a live consumer.
**Provenance**: `state.ts:101-109`; `dist/packrat-entry-CS1td-8B.js:341-349`; sole caller
`packrat.ts:351`.

`clone()` passes `src, value, offset, isError, furthest` to the constructor and **nothing else**.
`expected`, `suggestions`, `secondarySpans` are re-initialized empty by the field initializers
(state.ts:43-45).

**[PROBE G]** — state with `furthest = 3`, `expected = ["<x>"]`, one suggestion, one secondary span:

```
G clone: furthest 3 | expected undefined | suggestions 0 | secondarySpans 0
```

The incoherence is the point. `furthest` is the *anchor* for the other three (state.ts:37-42:
`expected` is "the accumulated label set **at** `furthest`"). Copying the anchor while dropping its
payload leaves the clone in a state `mergeErrorState` cannot repair: at `state.offset === furthest`
it takes the **accumulate** branch (`utils.ts:36-47`) and starts a *fresh* one-element `expected`
at an offset whose real label set has already been lost — strictly worse than if `furthest` had been
reset to `-1`, which would have taken the **restart** branch (utils.ts:29-35) and rebuilt cleanly.
`resetErrorState` (utils.ts:131-136) resets all four together, proving the module knows they travel
as a unit.

Live consequence at `packrat.ts:349-360`: inside `recall()`'s evalSet re-evaluation, `live.clone()`
produces the scratch state that `parser.parser(scratch)` then drives. Every label,
suggestion, and secondary span discovered during that re-evaluation is written to the scratch and
discarded — only `snapshot(scratch)` (offset/value/isError, packrat.ts:252-254) survives. With
packrat + diagnostics armed, an LR grow pass therefore **loses its diagnostics silently**, and the
outer state's `furthest` is never advanced by it.

**Falsifier**: *"Dropping diagnostics on clone is intentional — a fresh diagnostic scope per
clone."* — **Survives.** (i) Nothing says so: `clone()` carries no docblock while its five
neighbours do; (ii) if it were intentional, `furthest` would be reset too — copying it is the
tell; (iii) `resetErrorState` exists and resets all four, so the "fresh scope" operation is already
spelled elsewhere and `clone()` does not call it.

### M-3 — three public position methods, two conventions, and they **disagree at runtime**

**Severity**: MAJOR — public API returns contradictory answers for the same offset; zero tests.
**Provenance**: `state.ts:111-117` (`getColumnNumber`), `:119-124` (`getLineNumber`), `:126-134`
(`getLineAndColumn`); exported wholesale via `core.ts:8-13` and `index.ts:3`.

`getColumnNumber` searches `lastIndexOf("\n", offset)` (**inclusive**); `getLineAndColumn` searches
`lastIndexOf("\n", offset - 1)` (**exclusive**). `getLineNumber` returns a 0-based line;
`getLineAndColumn` returns 1-based. No shared implementation; three hand-rolled scans.

**[PROBE E/F]** — `src = "a\nb"`:

```
E offset=1  getColumnNumber() => 0 | getLineAndColumn() => {"line":1,"column":1} | getLineNumber() => 1
F offset=2  getColumnNumber() => 0 | getLineAndColumn() => {"line":2,"column":0} | getLineNumber() => 1
```

At offset 1 the two column methods return **0 and 1** for the same position (1 is correct — offset 1
is the second character of line 1; `getColumnNumber` computes `1 - (1+1) = -1` and clamps to 0 at
state.ts:116). At offset 2 the two line methods return **1 and 2** (2 is correct).

Only `getLineAndColumn` has a caller (`debug.ts:59`). `grep -rn "getColumnNumber\|getLineNumber"
src/ test/` → **3 hits, all three the declarations themselves**. Zero callers, zero tests — so the
two wrong ones have never been exercised.

**Falsifier**: *"They are internal helpers; the disagreement is unreachable."* — **Survives.**
`core.ts:8` exports `ParserState` wholesale and `dist/core.d.ts:2` re-declares it; both methods are
`public` on a published class with no `@internal` marker. A consumer computing an error position
from `getColumnNumber()` gets a different answer than the library's own renderer does.
**Second falsifier**: *"0 vs 1 at a newline character is a definitional edge, not a bug."* —
**Survives.** `getLineNumber`'s off-by-one at offset 2 is not an edge; it reports line 1 for a
character on line 2, and it does so for *every* offset on *every* line after the first.

### M-4 — two array allocations per `ParserState`, unconditionally, for a feature that is write-gated off; on every failed parse both pairs are allocated and one pair is **immediately overwritten**

**Severity**: MAJOR — allocation discipline on the hottest object in a hot parser library.
**Provenance**: `state.ts:44-45`; `dist/packrat-entry-CS1td-8B.js:301-302`; `parser.ts:52`,
`parser.ts:61`, `parser.ts:63-64` (= `dist:878-880`); write gates `utils.ts:52`, `utils.ts:58`.

```
state.ts:44   suggestions: Suggestion[] = [];
state.ts:45   secondarySpans: SecondarySpan[] = [];
```

Both are only ever *written* under `if (diagnosticsEnabled)` (utils.ts:51-61) — the default is
`false` (utils.ts:6). On the default path every `ParserState` still allocates two arrays that are
guaranteed to stay empty.

The dead-allocation proof is at the failure path. `parseStateInner` constructs a **second**
`ParserState` (parser.ts:61) and then, three lines later:

```
dist/packrat-entry-CS1td-8B.js:878-880
      errorState.expected = state.expected;
      errorState.suggestions = state.suggestions;
      errorState.secondarySpans = state.secondarySpans;
```

The two arrays the constructor just allocated for `errorState` are **discarded one statement after
creation**, replaced by aliases. Per failed top-level parse: 4 arrays allocated, 2 immediately
garbage. Add `clone()` (state.ts:102, called per-involved-parser per LR grow pass at packrat.ts:351)
and `formatDiagnostic`'s throwaway state (debug.ts:207) and the count climbs with no diagnostic
ever enabled.

**Falsifier**: *"V8 escape analysis / scalar replacement elides empty-array allocation."* —
**Survives.** `this` escapes: `parseStateInner` stores the state on the long-lived `Parser` instance
(`parser.ts:66` / `:71`) and returns it (`:74`). The arrays are reachable from a heap-escaping
object, so scalar replacement cannot apply to them.
**Second falsifier**: *"Lazy-init would reintroduce a hidden-class transition (S-1) — the
allocation is the price of shape stability."* — **Partially survives, and this is the honest
tension.** The cure that keeps both is a single lazily-allocated `diag` sub-object field
(one always-installed slot, `undefined` until diagnostics arm), or two always-installed slots
initialized to a shared frozen empty array. Neither costs a shape. The current code buys shape
stability at 2 allocations per state when 0 was available; the *aliasing overwrite* at dist:878-880
is unconditionally dead regardless of which cure is chosen.

### M-5 — the hot object's hidden-class stability rests on an **unpinned** compiler switch; one tsconfig character flips `ParserState` to two shapes, and no gate would notice

**Severity**: MAJOR — latent (not currently firing); a one-line config change away from a hot-path
regression on every `ParserState` in the process.
**Provenance**: `state.ts:43`; `tsconfig.json` (`"target": "ES2022"`, **no
`useDefineForClassFields`**, no `noUnusedLocals`); `dist/packrat-entry-CS1td-8B.js:300`;
`utils.ts:33`; `package.json:"build": "vite build"`.

`expected?: string[];` (state.ts:43) is declared with **no initializer**, unlike its two neighbours.
It survives to the dist as a bare field declaration:

```
dist/packrat-entry-CS1td-8B.js:300   expected;
```

and therefore **is** installed at construction — **[PROBE H/I]**:

```
H own keys at construction => ["expected","suggestions","secondarySpans","src","value","offset","isError","furthest"]
I 'expected' in fresh => true | hasOwn => true
```

That emit exists **only** because `target: ES2022` makes `useDefineForClassFields` default to
`true`, and both tsc and esbuild (which Vite uses to transpile) derive the flag from the tsconfig
target. `tsconfig.json` does not pin it. Set `"useDefineForClassFields": false`, or lower `target`
below ES2022, and a bare TS field declaration is **erased** — the property vanishes from the
constructor, and the first `mergeErrorState` at a new furthest offset:

```
utils.ts:33   state.expected = diagnosticsEnabled && label ? [label] : undefined;
```

*adds* the property (assigning `undefined` to a non-existent property still transitions the map),
splitting every `ParserState` in the process into two hidden classes and making every
`state.offset` / `state.isError` / `state.value` load site polymorphic. `mergeErrorState` is on the
failure path of `string`, `regex`, `eof`, `dispatch`, `any`, `then`, `skip`, `next`, `opt`, `not`,
`many`, `sepBy`, `wrap`, `call` — i.e. essentially every parse.

**Falsifier**: *"Nobody will flip that flag."* — **Survives.** `proof:all` (package.json) runs ten
gates; none reads `tsconfig.json`, and none asserts anything about `ParserState`'s own-property set.
`proof:perf` would be the only signal and it measures throughput, not shape. The field's
*correctness* is invisible at the source (`expected?: string[]` reads like a type-only declaration
in every other TS project that targets < ES2022) and its *performance* is invisible without a
regression bar. A one-line, well-intentioned tsconfig edit silently regresses the library's hottest
object.
**Second falsifier**: *"Then the finding is in tsconfig.json, not state.ts."* — **Survives.** The
fix is in `state.ts` and costs three characters: `expected: string[] | undefined = undefined;` makes
the shape stable under *every* value of the flag. The config is the hazard's trigger; the source
line is its cause.

---

## MINOR

### m-1 — six public methods, **zero callers**, ~30 of 189 lines dead

`grep -rn` across `src/` **and** `test/`: `.save()` → 0 · `.restore(` → 0 · `state.from(` → 0 ·
`unsafeCall(` → 0 (only the declaration, state.ts:92) · `getColumnNumber` → 0 · `getLineNumber` → 0.
Sites: `state.ts:69-73, 75-77, 79-84, 91-94, 111-117, 119-124`. `.clone()` has exactly one caller
(packrat.ts:351) and, per **M-2**, is broken. On a 189-line module that is ~16% dead public
surface, all of it exported through `./core` and the barrel.
**Falsifier**: *"They are consumer-facing API, not dead."* — Survives as a *typed* concern: three of
the six (`restore`, `getColumnNumber`, `getLineNumber`) are defective (m-4, m-5, M-3) precisely
*because* nothing exercises them; an unexercised public method that returns wrong answers is worse
than an absent one.

### m-2 — `Span` / `spanToString` / `mergeSpans`: zero consumers, still exported from two tiers, with two dead type imports tsc is configured not to see

`state.ts:8-19` declares `Span` and its two helpers. `grep -rn "spanToString\|mergeSpans"
src/ test/` → 4 hits: the two declarations, `index.ts:3`, `core.ts:11-12`. **No call sites.**
`leaf.ts:3` and `parser.ts:2` `import type { …, Span }` and **never reference `Span` in their
bodies**. `tsconfig.json` sets neither `noUnusedLocals` nor `noUnusedParameters`, so tsc is silent.
This is the residue of the S.H2 1.0.0 cut (fold row 48) that excised the 15 `*Span` **combinators**
— gated by `proof:no-span-surface` and `test/dist-surface.test.ts:58-77`, both of which check for
the fifteen `*Span` *function names* and therefore pass while the type and its two orphan helpers
remain shipped in `./core`.
**Falsifier**: *"BBNF-generated `toDoc()` uses Spans."* — `split.ts:3`'s comment says "Used by
BBNF-generated `toDoc()` code to split opaque Span text" — but that describes `splitBalanced`, which
takes `(text: string, delim: string)` and never mentions the `Span` type. No consumer of `Span`
exists in this tree.

### m-3 — the "single choke point" docblocks are **false at the bytes**

`state.ts:86` — *"Type-erased value setter — single choke point for the mutable-state cast
pattern."* There are **13** `unsafeSetValue` calls and **8** direct `.value =` writes that bypass
it: `state.ts:81` (`restore`), `packrat.ts:258, 298, 354`, `parser.ts:179, 350`.
`state.ts:91` — *"Type-erased parser invocation via `.call()` — single choke point for combinator
type casts."* `unsafeCall` has **0** callers; the live idiom is ~30 inline
`state as ParserState<unknown>` casts across `parser.ts` and `leaf.ts`.
**Falsifier**: *"'Choke point' means 'the sanctioned way', not 'the only way'."* — Survives:
"single" is the load-bearing word, and a choke point with 8 documented bypasses and a sibling with
0 users is neither single nor a choke point. The docblock actively misleads a reader auditing cast
safety.

### m-4 — `restore()` is not the inverse of `save()`, in three separate ways

`save()` (state.ts:75-77) returns `{ offset: number; value: T }`. `restore()` (state.ts:79-84)
takes `{ offset: number; value: any }`. (i) `any` in a public signature of a `strict` project whose
sibling files carry explicit `no-explicit-any` disables (`parser.ts:13`, `debug.ts:253`) — this one
has none. (ii) `save()` does not capture `isError`, so the round trip loses it. (iii) `restore()`
**unconditionally sets `isError = false`** (state.ts:82) — a side effect the name does not imply:
restoring a saved point silently clears an error the caller may still need. Both dead (m-1), so no
shipped bug is demonstrated — hence MINOR, not MAJOR.

### m-5 — `getLineNumber` and `getLineAndColumn` each allocate the whole prefix as an array of lines

`state.ts:122` and `:131` both do `src.slice(0, …).split("\n")` purely to take `.length` — an O(n)
string copy plus an O(lines) array, to compute a count that a `for` loop over `charCodeAt` yields
allocation-free. `debug.ts:58` then does a **full-source** `state.src.split("\n")` on top. On the
PT-01 path (diagnostics armed ⇒ `console.error(this.state.toString())` on every failed top-level
parse, parser.ts:67-69) that is two full-source materializations per failure.
**Falsifier**: *"Cold path — only runs when diagnostics are on."* — Survives, narrowed: PT-01 makes
"diagnostics on" mean "every failed parse renders", and `toString()` is additionally reachable from
any template literal or `String(state)` a consumer writes in a log line, with no indication that it
costs O(src).

### m-6 — Goldilocks: 189 lines carrying **four** unrelated concerns, and the grab-bag is the direct cause of M-1

`state.ts` holds (1) the zero-copy `Span` type + 2 helpers (:8-19, dead), (2) the diagnostic
substate types `Suggestion` / `SecondarySpan` (:25-34), (3) the mutable `ParserState` class
(:36-139), (4) parser **metadata** — `parserNames` / `ParserContext` / `createParserContext`
(:141-189). The file is *small* but *incoherent*, and the incoherence is load-bearing: concern (3)'s
`toString()` is what pulls `debug.js` into the core tier (M-1), and concern (2) produces a
three-hop type identity — `utils.ts:1` imports `Suggestion`/`SecondarySpan` *from* `state.ts`,
`utils.ts:3` re-exports them, and `debug.ts:7` imports them back *from* `utils.js` rather than from
the file that declares them two hops away. Splitting into `state.ts` (the class), `context.ts`
(concern 4), and deleting concerns 1-2's dead residue resolves M-1 and m-2 together.

### m-7 — `parserNames` is 29 strings of runtime data serving a purely type-level purpose, and `createParserContext` declares no return type

`grep -rn "parserNames" src/ test/` → 3 hits, **all three type positions**
(`state.ts:141` declaration, `:174` `(typeof parserNames)[number]`, `:180` same). The array is never
read at runtime, yet it is a `const` (not a `type`), so it ships in every bundle including `./core`.
`createParserContext` (state.ts:179-189) has no `: ParserContext` annotation; it returns an
all-**required** object where `ParserContext` (state.ts:173-177) is all-**optional** — structurally
compatible, nominally unlinked, so a field rename breaks at the ~40 call sites rather than at the
factory. `args: unknown[]` is an untyped bag that forces the 20+ `args![0]` non-null assertions and
unchecked casts throughout `parserPrint` (debug.ts:267-332).

### m-8 — `then` and `or` pass `this` **twice** into the context, doubling retention on a long-lived graph

`parser.ts:101` — `createParserContext("then", this as Parser<unknown>, this, next)` — and
`parser.ts:120` (`or`) put the same parser in both the `parser` slot and `args[0]`. `parserPrint`'s
`then`/`or` arms (debug.ts:295-307) read only `args`, so the `parser` slot is redundant for exactly
these two. Parsers are constructed once and live for the process, so every context object is a
permanent allocation; a CSS-value grammar mints thousands.

### m-9 — the top-level `Parser` retains the entire source string after the parse returns

`parser.ts:66` / `:71` assign `this.state = errorState` / `this.state = state`, and
`ParserState.src` (state.ts:48) is a strong reference to the full input. A long-lived top-level
parser therefore pins the last-parsed source — plus the whole produced value graph via
`state.value` — until the next parse, with no release path. For value.js parsing a large
stylesheet this is a retained-memory footprint proportional to the source, held by a module-scope
grammar object.
**Falsifier**: *"`.state` is the documented way to inspect the last parse."* — Survives as scoped:
the retention is a consequence of a debug affordance, is undocumented as such, and has no
`clearState()`. Rated MINOR because the leak is bounded (one source, overwritten on next parse), not
unbounded.

---

## INFO — scoping notes (contradictions where the tree disagrees with a naive reading of O-15)

### i-1 — PT-04 (lazy depth 7,761) is **not** a `state.ts` defect, and putting it there would be the wrong cure

`ParserState` carries no depth counter, and adding one would cost an increment + compare **per
combinator invocation** on the hot path — precisely the tax the module's mutable-single-cell design
(S-5) exists to avoid. The cheap cure needs **zero `state.ts` bytes**: `parser.ts:43-48` already
wraps the parse in `try { … } finally { packratExit(epoch) }`; adding a `catch` that re-throws a
`RangeError` carrying `state.offset` / `state.furthest` converts the bare 7,762-deep stack overflow
into a positioned error, using data the state already holds. This agrees with W1.md:76, which homes
PT-04 in G-9 (a harness gate), not in the state object.

### i-2 — PT-07's non-string cure is likewise a one-line boundary guard, not a `state.ts` change — but the *messages* are worse than O-15 records

`public src: string` (state.ts:48) is a compile-time-only guarantee, fully erased at runtime, so the
5/5 raw `TypeError`s are structural. One `typeof val !== "string"` guard at `parser.ts:34` covers
all five cases — confirming O-15's own posture that the invariant belongs **above** parse-that.
Worth noting for the invariant's wording: the observed messages are *Cannot read properties of null
(reading 'charCodeAt')* and *state.src.charCodeAt is not a function* **[PROBE J]** — the throwing
site is `leaf.ts:285`/`:297`, i.e. whichever leaf parser runs first, so the message is
**grammar-dependent** and names an internal method rather than the contract. A boundary invariant
that matches on message text would be brittle; it must match on `typeof`.

---

## SUPERLATIVES (L-18 runs both ways)

### S-1 — the hidden class **is** stable, and my hypothesis to the contrary is falsified at the bytes

The obvious LIBRARY-axis indictment of `state.ts:43-45` — that `expected?: string[]` with no
initializer, unlike its two initialized neighbours, transitions `ParserState`'s map on the first
`mergeErrorState` (utils.ts:33) and splits the hottest object into two shapes — **is wrong.**
`dist/packrat-entry-CS1td-8B.js:300` emits `expected;`, and **[PROBE H/I]** shows the property
installed as an own key at construction, in a fixed order identical for every instance:
`["expected","suggestions","secondarySpans","src","value","offset","isError","furthest"]` — the
three field declarations first (they run before the constructor body for a base class, regardless of
their textual position after it in the emit), then the five parameter properties. **One shape, every
time.** For a state object threaded through every combinator invocation this is the right answer.
It is recorded as a superlative on its merits and separately as **M-5** on its *fragility* — the
two findings are not in tension: the outcome is correct, the mechanism guaranteeing it is unpinned
and ungated.

### S-2 — per-parse threading of the error state onto `ParserState` is the module's load-bearing design decision, and it is right — with an executable proof

`state.ts:37-45` moves `furthest` / `expected` / `suggestions` / `secondarySpans` off module
globals and onto the instance, faithfully carrying the Rust port's `state.furthest_offset` model
(the docblock says so, and `utils.ts:20-26` restates the reasoning). This makes a parse **reentrant
and interleave-safe**: a nested `.parse()` inside a `.map` callback operates on its own state and
cannot corrupt the outer parse's furthest tracking. That is not an assertion — `test/reentrancy.test.ts`
exercises exactly the hazard (*"preserves the outer parse's furthest-offset across a nested
`.parse()`"*), and the same insight is what forced the packrat epoch to move to the `parseState`
boundary (packrat.ts:158-185, the PT-Q1 cure). Many combinator libraries keep a module-global
"expected" set; this one does not, and it can prove it.

### S-3 — `Span` is genuinely zero-copy

`state.ts:8-19`: two numbers, no allocation until `spanToString` is called, and `mergeSpans` builds
one flat object rather than walking text. The design is correct; it is merely dead (m-2). Recorded
so the m-2 cleanup deletes it for the right reason (no consumer) rather than the wrong one (a
perceived design flaw).

### S-4 — the `unsafe*` prefix is honest naming, and it makes the cast surface greppable in one query

`unsafeSetValue` / `unsafeCall` / `unsafeCallRaw` (state.ts:86-99) mark the type-erasure sites with
a prefix most combinator libraries omit entirely, hiding the same casts behind neutral names. One
`grep -rn unsafe src/` enumerates the sanctioned erasure surface. m-3's finding is that the
discipline is **unenforced**, not that it is wrong — the naming is a genuine positive and should
survive any refactor.

### S-5 — the mutable-single-cell state is the correct hot-path architecture, and the band measured its payoff

`ok()` / `err()` / `from()` (state.ts:55-73) return `this` re-typed rather than allocating a new
state; the entire parse threads **one** cell. Combinators backtrack by saving an integer offset
(`const savedOffset = state.offset`) rather than cloning — the idiom appears at parser.ts:83, 107,
191, 214, 236, 253, 312, 342, 368, 401, 443, 457, 525, 577, 603 and in `leaf.ts`'s fused arms.
Per-combinator state allocation is **zero**. `registry/adjudicated/parser-band.md`'s cross-bench
puts an idiomatic parse-that CSS grammar at **1247 ns/parse** against the published hand-rolled
parser's **1500 ns** on the shared-accepted corpus — a combinator library beating a bespoke parser
on its own corpus, which this allocation posture is a principal reason for. The phantom type
parameters (`ParserState<T>` re-typed at each step) are the honest cost of that choice, and the
module owns it in the `unsafe*` naming rather than hiding it.

---

## Cure ordering (highest leverage first — no execution authorized by this file)

1. **B-1** — make `err()` the sole error transition; normalize `many`/`sepBy` failure values; or
   change `.parse()`'s contract explicitly. One-line-per-site; unblocks the JS-boundary invariant
   O-15 already scoped above parse-that.
2. **M-1** — remove `state.ts:2`. Move the `toString()` → `statePrint` binding to the call site (or
   to `debug.ts` as `statePrint(state)`), breaking the state→debug value cycle and letting `./core`
   honour `core.ts:4-6`. Add the missing exclusion assertion to `test/subpath-gate.mjs`.
3. **M-5** — `expected: string[] | undefined = undefined;` (state.ts:43). Three characters; removes
   the tsconfig dependency entirely.
4. **M-2** — `clone()` either copies all four error-tracking fields or resets `furthest` to `-1`
   alongside the other three. Never the current split.
5. **M-3** — delete `getColumnNumber` / `getLineNumber` (m-1: zero callers) and keep
   `getLineAndColumn` as the single implementation.
6. **M-4** — a single lazily-allocated `diag` slot, plus delete the dead alias-overwrite at
   parser.ts:63-64.
7. **m-1 / m-2 / m-6** — one cleanup: delete the dead methods and the `Span` residue, split the
   metadata concern into `context.ts`.

**Every claim above is falsifiable from the cited bytes. Two of my own hypotheses were falsified by
the tree and are recorded as S-1 and i-1 rather than suppressed.**
