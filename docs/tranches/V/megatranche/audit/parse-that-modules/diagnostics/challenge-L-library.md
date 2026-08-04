claude-opus-5[1m]

# CHALLENGE — `diagnostics` · LIBRARY axis (L)

**Target**: `/Users/mkbabb/Programming/parse-that/typescript/src/parse/diagnostics.ts` (14 lines)
**Read whole, read-only**: `diagnostics.ts`, `utils.ts` (187), `state.ts` (189), plus every consumer
on the export graph — `parser.ts`, `leaf.ts`, `debug.ts`, `index.ts`, `packrat-entry.ts`,
`utils-entry.ts` — and the published `dist/` (`diagnostics.js`, `diagnostics-DDazRHgl.js`,
`packrat-entry-CS1td-8B.js`, `diagnostics.d.ts`, `utils.d.ts`, `state.d.ts`).
**Substrate**: parse-that `master` @ `ef10d5b`, `typescript/package.json` version `1.0.0`.
**Posture**: module assumed DEFECTIVE until the tree proves otherwise. Every claim carries a
falsifier; superlatives carry them too (L-18 runs both ways).

**STOP-check**: `/Users/mkbabb/Programming/parse-that-css-totality-p2` does **not** exist
(`ls` → `No such file or directory`). Not created. No worktree, frozen root, or Codex path entered.
No bench run; nothing armed diagnostics or packrat in this audit — the PT-03 latch is untouched.

**Tally**: 17 defects (4 BLOCKER · 7 MAJOR · 5 MINOR · 1 INFO) · 5 superlatives · 1 corroboration.

---

## 0. What the module actually is

`diagnostics.ts` is a 14-line subpath barrel (A.W3) for `"@mkbabb/parse-that/diagnostics"`. It has
**zero logic**: 5 lines of doc comment, one value re-export of six functions and one type re-export
of three types, all from `./utils.js`. Every substantive claim below therefore lands either on the
barrel's **selection** (what it chose to export and to withhold) or on the `utils.ts` implementation
it publishes. Both are in scope: a barrel is a contract, and a contract that publishes a broken
half is the barrel's defect.

The published surface is exactly:

```
mergeErrorState · enableDiagnostics · disableDiagnostics
collectDiagnostic · getCollectedDiagnostics · clearCollectedDiagnostics
type Suggestion · type SecondarySpan · type Diagnostic
```

Withheld from the subpath though present in `utils.ts`: `isDiagnosticsEnabled` (:16),
`addSuggestion` (:51), `addSecondarySpan` (:57), `reportUnclosedDelimiter` (:66),
`resetErrorState` (:131), `popLastDiagnostic` (:146). Withheld from `debug.ts`:
`formatDiagnostic` (:200), `formatAllDiagnostics` (:234).

---

## 1. BLOCKERS

### L-B1 — `collectedDiagnostics` is an unbounded module global that the diagnostics flag does not gate

**Severity**: BLOCKER · **Provenance**: `utils.ts:95`, `:102-128`, `:115`; dist
`diagnostics-DDazRHgl.js:51-70`; call site `parser.ts:666`.

`let collectedDiagnostics: Diagnostic[] = []` (`utils.ts:95`) is process-global. `collectDiagnostic`
(`utils.ts:102`) pushes into it (`:115`) and **contains no `diagnosticsEnabled` check** — compare
its siblings `addSuggestion` (`utils.ts:52`), `addSecondarySpan` (`:58`) and
`reportUnclosedDelimiter` (`:71`), every one of which opens with the guard. The omission survives
minification: dist `diagnostics-DDazRHgl.js:51-70` is gate-free, byte for byte.

Consequence on the **default, unarmed, shipping path**: any grammar using `Parser.recover` — the
combinator whose entire documented purpose is to let `many()`/`sepBy()` loops keep going
(`parser.ts:650-651`) — pushes one `Diagnostic` per recovered element into a global array that
nothing ever drains. Each record retains a 20-char `found` string and three arrays. In a long-lived
process (value.js parsing CSS in a browser session; a server parsing untrusted input) this is
monotone growth with no ceiling and no back-pressure. The only drain, `clearCollectedDiagnostics`,
is manual and undocumented as an obligation.

This is also the precise inversion of the design the module advertises for itself
(`utils.ts:20-26`: "not on module globals … reentrant and interleave-safe"). That property was won
for `furthest`/`expected`/`suggestions`/`secondarySpans` and never extended to the buffer. Note the
asymmetry against `parseState`'s PT-Q1 hardening (`parser.ts:34-49`): packrat's global tables are
snapshotted and restored around every top-level parse via `packratEnter`/`packratExit` and a
`finally`. The diagnostics buffer gets no such treatment, so two interleaved parses (exactly the
nested-`.parse()`-in-a-`.map` case PT-Q1 was written to support) braid their diagnostics into one
undifferentiated global list with no parse identity on the record — `Diagnostic` (`utils.ts:84-93`)
carries offsets but no source or parse handle.

**Falsifier**: exhibit a `diagnosticsEnabled` check anywhere on `collectDiagnostic`'s path, or a
bound/eviction on `collectedDiagnostics`, or a save/restore of the buffer in `parseState`. None
exists in `utils.ts`, `parser.ts`, or the shipped chunk. Alternatively: show `recover` is
unreachable without arming — it is not; `recover` is a plain `Parser` method (`parser.ts:653`),
independent of the flag.

**Corpus**: extends INBOX **O-15 / PT-01** (which measured the *label↔console* coupling, not the
buffer). Bears directly on X·P W2 **R-LAW-4** ("`N` malformed sites yield exactly `N` diagnostics",
`W2.md:284`) — here `N` sites yield `N` diagnostics *that are never released*, so the law's
non-amplification clause holds per-parse and fails per-process. Not previously filed: no corpus
grep hit for `collectedDiagnostics`, `clearCollectedDiagnostics`, or `unbounded`.

---

### L-B2 — `getCollectedDiagnostics()` is provably always `[]` for a consumer of this subpath

**Severity**: BLOCKER · **Provenance**: `diagnostics.ts:6-13`; sole writer `parser.ts:666`;
dist `diagnostics.js:1-9`.

The barrel exports the buffer's **reader** (`getCollectedDiagnostics`) and its **eraser**
(`clearCollectedDiagnostics`) and its **writer** (`collectDiagnostic`) — but the only thing in the
library that *calls* the writer is `Parser.prototype.recover` (`parser.ts:666`), and `Parser` is not
on this subpath. `dist/diagnostics.js` imports exactly six symbols from one chunk; there is no
`Parser` in the module graph at all (see S-1).

So a consumer who does the obvious thing —

```js
import { enableDiagnostics, getCollectedDiagnostics } from "@mkbabb/parse-that/diagnostics";
enableDiagnostics();
someParser.parse(badInput);          // fails
getCollectedDiagnostics();           // []  — always
```

— gets an empty array and a `console.error` spray (L-B4). The headline feature named in the
barrel's own doc comment ("the opt-in collected-diagnostics buffer", `diagnostics.ts:4`) is
unreachable from the barrel. `collectDiagnostic` is exported as a manual escape hatch, but its
signature `(state: ParserState<unknown>, errorOffset: number)` requires a `ParserState` the consumer
can only obtain from `parseState()` on the **root** entry — by which point the parse is over and the
per-rule structure the diagnostic is supposed to localize is gone.

**Falsifier**: find a second call site of `collectDiagnostic` in `src/`. `grep -rn collectDiagnostic
typescript/src` returns `utils.ts` (definition), `parser.ts:4` (import), `parser.ts:666` (the one
call), `index.ts:5` and `diagnostics.ts:10` (re-exports). One writer, inside `recover`.

---

### L-B3 — `popLastDiagnostic()` LIFO-pops the wrong record when `sync` itself recovers

**Severity**: BLOCKER (correctness) · **Provenance**: `parser.ts:653-682`, specifically `:666`
(collect), `:670` (run `sync`), `:674` (pop); `utils.ts:146-148`.

`recover` implements rollback as: collect a diagnostic, run `sync`, and if `sync` fails, undo the
collection with `popLastDiagnostic()`. The undo assumes **nothing was collected in between**. But
`sync` is an arbitrary consumer-supplied `Parser` (`parser.ts:653`), and `Parser.recover` is public,
so `sync` may itself contain a recovery that collects and *keeps* a diagnostic.

Construct: `outer = p.recover(sync, s)` with `sync = q.recover(r, t).then(z)`.
- `p` fails → `collectDiagnostic` pushes **D_outer** (`:666`).
- `sync` runs: `q` fails → inner `recover` pushes **D_inner**; `r` succeeds → inner keeps D_inner and
  returns its sentinel (`:681`).
- `z` fails → `sync` overall fails.
- `:674` `popLastDiagnostic()` removes **D_inner** — the wrong record. **D_outer** stays in the
  buffer describing a branch that was rolled back and whose error is about to propagate anyway.

Net effect per occurrence: one spurious diagnostic retained for a discarded path, one legitimate
diagnostic destroyed. The buffer length is restored, so length-based assertions pass while the
contents are wrong — the failure is silent.

This violates X·P W2 **R-LAW-1** (rollback exactness: "the restored state is exactly the pre-mark
state: offset, **journal length**…", `W2.md:275-278`) in content-if-not-in-length, and **R-LAW-4**
(non-amplification, `W2.md:284`) in both directions at once. The cure is a mark/rewind on the
journal (record `collectedDiagnostics.length` before `sync`, truncate to it after) rather than a
LIFO pop — which is exactly the shape R-LAW-1 already prescribes and which the tree does not
implement.

**Falsifier**: show `sync` cannot recover — nothing in the type (`sync: Parser<unknown>`) or the
runtime forbids it. Or show `popLastDiagnostic` is index-aware: `utils.ts:147` is
`collectedDiagnostics.pop()`, unconditional.

---

### L-B4 — arming is the only route to labels and it hard-couples `console.error`; the barrel ships the switch with no seam and no getter

**Severity**: BLOCKER · **Provenance**: gate `utils.ts:33` + `:38` (dist
`diagnostics-DDazRHgl.js:14`); effect `parser.ts:67-69` (dist `packrat-entry-CS1td-8B.js:881`);
second effect site `debug.ts:174-189`; withheld getter `utils.ts:16`.

**Verified at the bytes, independently of O-15.** `mergeErrorState` seeds `state.expected` only
under `diagnosticsEnabled && label` (`utils.ts:33`, `:38`; dist chunk line 14 reads
`state.expected = diagnosticsEnabled && label ? [label] : void 0;`). The *only* public way to flip
that flag is `enableDiagnostics()`. And `parseStateInner` fires an unconditional
`console.error(this.state.toString())` under `if (isDiagnosticsEnabled())` (`parser.ts:67-69`;
dist `packrat-entry-CS1td-8B.js:881`). Labels and stderr are reachable **only together**. There is
no logger parameter on this path — contrast `parserDebug` (`parser.ts:693`) and `debug.ts:355`,
which both *do* take an injectable `logger`, proving the seam was understood and simply not applied
where it matters.

The barrel makes this worse in two specific ways:

1. **No `isDiagnosticsEnabled` export.** It exists (`utils.ts:16`) and is used internally twice
   (`parser.ts:67`, `debug.ts:174`), but `diagnostics.ts:6-13` withholds it. A library that wants
   the standard discipline for a process-global toggle — read, set, restore — **cannot**. It can
   only `enable`/`disable` blindly, clobbering whatever an outer consumer configured. Two
   independent libraries in one process, each politely `disableDiagnostics()`-ing after use, silently
   disarm each other. The barrel exports precisely the two functions that make the global unsafe and
   withholds the one that would make it composable.
2. **No scoped posture.** `enableDiagnostics()` is arity 0 (`utils.ts:8`) — no parser scope, no
   parse scope, no logger. Corpus-confirmed RED: X·P `W1.md:472` / `:572`
   (`enableDiagnostics() is process-global (arity) → 0 args`).

**Falsifier**: exhibit any path that populates `state.expected` with diagnostics disabled — the
ternary at `utils.ts:33` and the guard at `:38` are the only two writers of `expected` in the
package outside `resetErrorState` (`:133`) and `parser.ts:62` (a copy). Or exhibit a logger
injection point on `parseStateInner` — `parser.ts:51-75` takes no arguments beyond `val`.

**Corpus**: this is **O-15 / PT-01**, re-verified at both source and dist, and X·P W1 **G-5** /
W2 **R-LAW-3** ("diagnostics are values, never effects", `W2.md:281-283`). I confirm O-15's dist
cites exactly: `diagnostics-DDazRHgl.js:14` is the gate; `packrat-entry-*.js:881` is
`if (isDiagnosticsEnabled()) {`. **No contradiction found.** New here: the missing getter as the
*compositional* half of the defect, which the corpus records as an arity observation but not as a
save/restore impossibility.

---

## 2. MAJORS

### L-M1 — `mergeErrorState` allocates two guaranteed-empty arrays per new-furthest event, with diagnostics OFF

**Severity**: MAJOR (hot-path allocation) · **Provenance**: `utils.ts:32-35`; dist
`diagnostics-DDazRHgl.js:13-16`; 22 call sites (`leaf.ts` ×7, `parser.ts` ×15).

```ts
state.furthest = state.offset;
state.expected = diagnosticsEnabled && label ? [label] : undefined;   // GATED
state.suggestions = [];                                              // NOT gated
state.secondarySpans = [];                                           // NOT gated
```

The gating discipline is applied on line 33 and abandoned on lines 34-35 — same function, adjacent
statements. When diagnostics are disabled, `suggestions` and `secondarySpans` **can never be
non-empty**: their only writers, `addSuggestion` (`utils.ts:52`) and `addSecondarySpan` (`:58`),
both return early under the same flag. So on the shipping default path these two assignments replace
an empty array with a *different* empty array — pure garbage, no semantic effect.

Cost model: `furthest` is monotone per state, so new-furthest events are bounded by the count of
distinct offsets reached, i.e. O(input length) for a backtracking grammar. A 100-char CSS value can
burn ~200 short-lived array allocations per parse, entirely in the young generation, entirely
pointless. Against PT-03's measured **93.9 ns/parse** unarmed baseline (O-15), this is not noise
in the budget of a hot parser library.

`mergeErrorState` is the single most-called function on the failure path — 22 static call sites, and
the failure path is the *common* path inside `or`/`any`/`many` backtracking.

**Falsifier**: show a disabled-diagnostics route that pushes into either array. `addSuggestion` and
`addSecondarySpan` are the only `.push` sites for them in `src/` (`utils.ts:53`, `:59`); both are
flag-guarded. Or show the reset is required for correctness across a `furthest` advance — it is not,
because when the flag is off both arrays are already `[]` from the field initializers
(`state.ts:44-45`) and stay `[]`. Cure without behavior change: hoist the two resets inside the
existing `diagnosticsEnabled` test, or point both at a shared frozen empty array on the cold path.

---

### L-M2 — `collectDiagnostic` re-implements `ParserState.getLineAndColumn`, and does it strictly worse

**Severity**: MAJOR (duplication + O(n) allocation) · **Provenance**: `utils.ts:106-110` vs
`state.ts:126-134`; dist `diagnostics-DDazRHgl.js:54-57`.

`collectDiagnostic` receives a `ParserState` (`utils.ts:102`) that already carries a
`getLineAndColumn(offset)` method computing the identical 1-based-line / 0-based-column pair
(`state.ts:127-134`). It ignores it and inlines its own:

```ts
const before = src.slice(0, furthest);              // utils.ts:107 — full-prefix COPY
const lastNl  = before.lastIndexOf("\n");           // :108
const line = lastNl === -1 ? 1 : before.slice(0, lastNl + 1).split("\n").length;   // :109
```

Three avoidable allocations, each O(furthest):
1. `src.slice(0, furthest)` copies the entire prefix — unnecessary, because `String.lastIndexOf`
   takes a `fromIndex`. `state.ts:128` already does it right: `src.lastIndexOf("\n", offset - 1)`.
2. `before.slice(0, lastNl + 1)` copies the prefix **again**.
3. `.split("\n")` materializes an array of every line in the prefix, to read `.length` and discard.

For a 100 KB source with a failure near the end, one `collectDiagnostic` call allocates ~200 KB of
transient strings plus an array of thousands of substrings — to produce a single integer. In a
`many().recover()` loop this runs once per malformed element, giving quadratic total work in input
size for a linear number of errors.

**Falsifier**: show the two computations disagree, justifying the fork. They do not:
`src.slice(0, furthest).lastIndexOf("\n")` scans indices `[0, furthest-1]`, exactly what
`src.lastIndexOf("\n", furthest - 1)` scans; the column expressions are token-identical
(`utils.ts:110` vs `state.ts:132`). The fork is gratuitous. Note the tree *also* contains the
allocation-free idiom in `state.ts:113` and `:120` — so the good pattern is present three times in
the file next door and absent here.

---

### L-M3 — four line/column implementations, two incompatible conventions

**Severity**: MAJOR (correctness of the published `Diagnostic`) · **Provenance**: `state.ts:111-117`
(`getColumnNumber`), `state.ts:119-124` (`getLineNumber`), `state.ts:126-134`
(`getLineAndColumn`), `utils.ts:106-110` (`collectDiagnostic`).

| impl | line base | no-newline case |
|---|---|---|
| `getLineNumber` (`state.ts:119`) | **0-based** | returns `0` (`:123`) |
| `getLineAndColumn` (`state.ts:129`) | **1-based** | returns `1` |
| `collectDiagnostic` (`utils.ts:109`) | **1-based** | returns `1` |
| `getColumnNumber` (`state.ts:111`) | column only | — |

`getLineNumber` also uses `lastIndexOf("\n", this.offset)` — **no `- 1`** (`state.ts:120`) — where
the other two use `offset - 1`. On an offset that *is* a newline the two disagree by one line on
top of the base disagreement.

So `Diagnostic.line` (the value this subpath publishes, `utils.ts:87`) and
`state.getLineNumber()` (the value the same object would report) can differ by 1 or 2 for the same
offset in the same source. A consumer correlating a collected `Diagnostic` against a live state — the
natural thing to do, since `Diagnostic` carries no source reference — gets an off-by-one editor
jump. `Diagnostic`'s field is undocumented as to base (`utils.ts:87`), so the consumer cannot even
resolve it from the types.

**Falsifier**: `src = "a\nb"`, `offset = 3`. `getLineAndColumn(3)`: `lastIndexOf("\n", 2)` → 1, so
line = `"a\n".split("\n").length` = 2. `getLineNumber()` with `this.offset = 3`:
`lastIndexOf("\n", 3)` → 1, line = `"a".split("\n").length` = 1. Two methods on one class, one
offset, answers 2 and 1. To falsify, exhibit a documented base for each — none is documented.

---

### L-M4 — `getCollectedDiagnostics()` aliases the live global while `clearCollectedDiagnostics()` rebinds it

**Severity**: MAJOR (type unsoundness + aliasing incoherence) · **Provenance**: `utils.ts:138-140`,
`:142-144`; both exported at `diagnostics.ts:11-12`.

```ts
export function getCollectedDiagnostics(): readonly Diagnostic[] {
    return collectedDiagnostics;          // :139 — the live array, by reference
}
export function clearCollectedDiagnostics(): void {
    collectedDiagnostics = [];            // :143 — REBIND, not truncate
}
```

Two defects that compound:

- **`readonly Diagnostic[]` is a compile-time fiction.** The returned reference *is* the mutable
  module global. A later `collectDiagnostic` mutates the array a caller is iterating —
  mutation-during-iteration, from a function the type annotation promises is read-only.
- **`get` aliases but `clear` rebinds**, so the two functions disagree about identity. A caller that
  holds `const ds = getCollectedDiagnostics()` and then calls `clearCollectedDiagnostics()` observes
  `ds` **unchanged and permanently detached** — it will never see another diagnostic, and never
  empty. Two callers can hold two arrays that both claim to be "the collected diagnostics" and
  disagree forever.

The discipline is applied at the wrong boundary: `collectDiagnostic` defensively copies all three
inner arrays into the snapshot (`utils.ts:120-122`, and rightly so — see S-4), while the outer,
genuinely dangerous handoff at `:139` is by reference.

**Falsifier**: show a copy at `:139` or a truncation (`length = 0`) at `:143`. Neither is present in
source or in the shipped chunk. Either fix alone removes the incoherence; the pairing is what makes
it a MAJOR.

---

### L-M5 — `collectDiagnostic` zeroes `state.furthest`, destroying the enclosing parse's error position

**Severity**: MAJOR · **Provenance**: `utils.ts:127` → `resetErrorState` `utils.ts:131-136`,
specifically `:132`; consumed at `parser.ts:60`.

`collectDiagnostic` ends by calling `resetErrorState(state)`, which sets `state.furthest = -1`
(`utils.ts:132`). Since the only caller is `recover` (`parser.ts:666`) operating on the **live**
parse state, one successful recovery anywhere in a grammar wipes the furthest-offset tracking for
the *entire enclosing parse*.

`parseStateInner` then renders its error from exactly that field:

```ts
const furthest = state.furthest >= 0 ? state.furthest : state.offset;   // parser.ts:60
```

After a recovery, `furthest` reflects only progress made *since* the reset. If the deepest failure
of the parse occurred before the recovery point, the final error message points at a **shallower**
offset than the parse actually reached — the single most valuable number in a parse error, silently
degraded by an unrelated feature. This is also an R-LAW-1 (`W2.md:275-278`) rollback-exactness
violation: `recover` restores `offset` and `isError` (`parser.ts:669`, `:675-676`) but not
`furthest`, which it destroyed as a side effect of journaling.

**Falsifier**: show `furthest` is restored on either `recover` exit path. `parser.ts:668-681`
touches `isError`, `offset`, and `value` only. Or show the reset is needed — it is defensible for
the *snapshot* semantics ("so the next error starts fresh", `utils.ts:99-100`) but the correct scope
is the recovered subtree, not the whole parse; a save/restore of `furthest` around `sync` would
preserve both.

---

### L-M6 — the barrel's own doc comment is factually wrong about the module it publishes

**Severity**: MAJOR (contract, and it is in the 14 lines under audit) · **Provenance**:
`diagnostics.ts:3-5` vs `utils.ts:102`.

> "The diagnostic accumulation tier — furthest-offset error merging plus **the opt-in
> collected-diagnostics buffer and its enable/disable toggles**." — `diagnostics.ts:3-5`

The sentence binds the buffer to the toggles. The bytes do not: `collectDiagnostic` has no flag
check (L-B1), so the buffer accumulates on the unarmed default path, and `enableDiagnostics` /
`disableDiagnostics` have **zero** effect on whether records are collected — they affect only how
*populated* each record's `expected` / `suggestions` / `secondarySpans` fields are
(`utils.ts:33`, `:52`, `:58`). Under the default configuration the buffer fills with structurally
valid but semantically empty `Diagnostic`s: real `offset`/`line`/`column`/`found`, and three empty
arrays.

Three of the barrel's fourteen lines assert a gating relationship that does not exist. For a 14-line
file whose only content is documentation and re-exports, a false doc comment is a large fraction of
the artifact.

**Falsifier**: exhibit the flag on `collectDiagnostic`'s path. `utils.ts:102-128` and dist
`diagnostics-DDazRHgl.js:51-70` are both gate-free.

---

### L-M7 — the exported surface is not closed under its own semantics

**Severity**: MAJOR (API design) · **Provenance**: `diagnostics.ts:6-14` vs `utils.ts:16, 51, 57,
66, 131, 146` and `debug.ts:200, 234`.

The barrel publishes `collectDiagnostic` (a mutator with a side effect on the passed state) while
withholding every counterpart:

| withheld | where | why it is needed by the exported surface |
|---|---|---|
| `isDiagnosticsEnabled` | `utils.ts:16` | save/restore around the global toggle (L-B4) |
| `resetErrorState` | `utils.ts:131` | `collectDiagnostic` performs it implicitly (`:127`); consumers cannot do it explicitly, nor undo it |
| `popLastDiagnostic` | `utils.ts:146` | the buffer is **accumulate-only** from outside; `recover` retracts internally (`parser.ts:674`), consumers cannot |
| `addSuggestion` / `addSecondarySpan` | `utils.ts:51`, `:57` | no way to *produce* a `Suggestion`, though the type ships (L-m4) |
| `formatDiagnostic` / `formatAllDiagnostics` | `debug.ts:200`, `:234` | no renderer for the `Diagnostic[]` the subpath hands back |

Net: the module gives you a way to add records, no way to remove one, no way to read the flag it
lets you set, no way to construct the value types it exports, and no way to render the values it
returns. `clearCollectedDiagnostics` (all-or-nothing) is the sole retraction primitive.

**Falsifier**: show these are reachable via another documented subpath. `package.json` exports
`.` (index), `./core`, `./diagnostics`, `./packrat`, `./utils`. `index.ts:5` re-exports the same six
functions and no more; `utils-entry.ts` exports only `skipWhitespace`/`skipBlockComments` plus the
sample parsers; `debug.ts` has **no** subpath at all, so `formatDiagnostic` is unreachable from every
published entry point. Confirmed against `dist/utils-entry.d.ts` and the exports map.

---

## 3. MINORS

### L-m1 — `found` slices by UTF-16 code unit and can emit a lone surrogate
**Severity**: MINOR · **Provenance**: `utils.ts:113`; dist `diagnostics-DDazRHgl.js:58`.
`src.slice(furthest, furthest + 20)` cuts at a fixed code-unit count. A source with an astral
character (emoji, many CJK extensions, math script) straddling offset `furthest + 20` yields a
`Diagnostic.found` containing an unpaired surrogate. `JSON.stringify` will happily emit it as a
`\udXXX` escape that is not well-formed UTF-8, and transports that validate (some HTTP/JSON layers,
`Buffer.from(s, "utf8")` round-trips) mangle or reject it. **Falsifier**: use
`Array.from(...).slice(0, 20)` or an `Intl.Segmenter` and the hazard disappears — the tree uses
neither; there is no surrogate handling anywhere in `utils.ts`.

### L-m2 — `found` escapes only `\n`, and is then interpolated into ANSI output
**Severity**: MINOR · **Provenance**: `utils.ts:113` (`.replace(/\n/g, "\\n")`) → `debug.ts:224`
(`red(\`\\\`${d.found}\\\`\`)`), with the ANSI codes from `ansi.ts`.
`\r`, `\t`, `\x1b`, and every other C0 control pass through untouched into a string the library
itself renders with escape sequences around it. A raw ESC in the input therefore lands inside an
ANSI context in a terminal — cursor moves, color state left dirty, or `\r` overwriting the diagnostic
line. Low impact (the sink is a developer terminal), but the escape list is arbitrarily one
character long. **Falsifier**: point to a sanitizer between `utils.ts:113` and `debug.ts:224` —
`formatDiagnostic` (`debug.ts:200-227`) applies none.

### L-m3 — `mergeErrorState` is core plumbing mis-shelved as a diagnostic, and the type graph is not a leaf
**Severity**: MINOR · **Provenance**: `diagnostics.ts:7`; 22 call sites (`leaf.ts` ×7,
`parser.ts` ×15); `dist/diagnostics.d.ts:1` → `dist/utils.d.ts:1` → `dist/state.d.ts:1`.
`mergeErrorState` runs on **every** parse failure regardless of the flag — it is the furthest-offset
machine, not a diagnostic feature. Shelving it under `/diagnostics` mis-signals cost to consumers.
Separately: while the **runtime** graph is a true leaf (S-1), the **type** graph is not —
`diagnostics.d.ts` re-exports from `./utils.js`, whose `.d.ts` imports `ParserState` from
`./state.js`, whose `.d.ts` imports `Parser` from `./parser.js`. A consumer wanting only
`enableDiagnostics(): void` makes `tsc` load the entire parser type surface. **Falsifier**: the
runtime asymmetry is real and favorable — see S-1; this is a type-checking cost only, hence MINOR.

### L-m4 — `Suggestion` / `SecondarySpan` are exported as read-only decoration
**Severity**: MINOR · **Provenance**: `diagnostics.ts:14`; `state.ts:25-34`; constructors withheld
(`utils.ts:51`, `:57`).
Both types ship, neither can be produced by a consumer, and `Suggestion.kind` is a closed two-member
union (`state.ts:26`) so a consumer could not extend it even if `addSuggestion` were exported. They
are useful solely for destructuring `Diagnostic`, which is what `Diagnostic` already implies.
**Falsifier**: exporting `addSuggestion`/`addSecondarySpan` would make them constructive — the barrel
does not.

### L-m5 — `expected?: string[]` is a tri-state, branched at every read
**Severity**: MINOR (V8 shape + ergonomics) · **Provenance**: `state.ts:43`; reads at
`utils.ts:39`, `:120`, `parser.ts:62`, `debug.ts:175`.
`expected` is `undefined | [] | string[]` where `undefined` and `[]` mean the same thing. Every
consumer pays a branch (`state.expected ? [...state.expected] : []` at `utils.ts:120`;
`state.expected ?? []` at `debug.ts:175`), and the field's value type oscillates between `undefined`
and `Array` across `mergeErrorState` calls (`utils.ts:33`), which is a tagged-representation
transition in V8 rather than a stable one. Under `target: ES2022` + default
`useDefineForClassFields`, the field *is* defined at construction, so the hidden class is stable —
the map does not transition. **Falsifier**: that last point is the falsifier for the stronger claim,
and I decline to make it: with `useDefineForClassFields` on (confirmed: `tsconfig.json` `"target":
"ES2022"`, no override), there is **no** hidden-class transition here. The residual defect is the
redundant tri-state and its branches, not a shape hazard. Recorded this way deliberately — the
shape-transition version of this finding would be false.

### L-i2 (INFO) — `sideEffects: false` versus a top-level call in `parser.ts`
**Severity**: INFO (scope-adjacent) · **Provenance**: `package.json` `"sideEffects": false`;
`parser.ts:711` `_initWhitespace();`.
The package declares itself side-effect-free while `parser.js` executes `_initWhitespace()` at module
scope. This is **not** on the diagnostics chunk's graph (S-1), so this subpath is unaffected —
recorded for the core-module challenge, not charged here. **Falsifier**: `dist/diagnostics.js`
imports one chunk with zero further imports; `_initWhitespace` is not reachable from it.

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

Four occurrences in the shipped bundle, exactly as O-15 reported: one initializer, two reads, one
write-to-true, **zero** writes back to false. `resetPackrat` clears the memo store and does not
disarm. **O-15 PT-03 is confirmed with no contradiction**, at the line numbers it cited. Relevant to
this module because it is the same anti-pattern class as L-B4/L-B1 — a process-global latch with no
inverse — and because X·P W1 **G-4** and W2 **§3b O-8** already forbid it by construction. I ran no
bench and armed nothing; this is a static read.

---

## 5. SUPERLATIVES (L-18, the other direction)

### S-1 — the `/diagnostics` subpath is a **true runtime leaf**, and that is rare
**Provenance**: `dist/diagnostics.js:1` (`import { c, a, d, e, g, m } from
"./diagnostics-DDazRHgl.js"`); `grep -n "^import\|require(" diagnostics-DDazRHgl.js` → **no
matches**; chunk is 125 lines.
The A.W3 subpath split genuinely delivers: importing `@mkbabb/parse-that/diagnostics` pulls one
125-line chunk with **zero** transitive runtime imports — no `Parser`, no `packrat`, no `debug`, no
`ansi`. This is possible only because `utils.ts:1` and `:3` are `import type` / `export type`
(`verbatimModuleSyntax: true`), so the `state.js` dependency erases completely at build. That is a
deliberate, correct, and easily-lost property, and the tree holds it.
**Falsifier**: a single value import from `state.js` in `utils.ts` would collapse it — `state.ts:2`
imports `statePrint` from `debug.js`, which would drag `debug` (12,586 B) and `ansi` into every
consumer of the toggles. It does not happen. Verified in the published artifact, not inferred.

### S-2 — the per-state migration of furthest/expected is real, and the module says why
**Provenance**: `utils.ts:20-26`; `state.ts:36-45`; `mergeErrorState` `utils.ts:28-49`.
The comment block at `utils.ts:20-26` states the design (per-`ParserState`, not module-global, "so a
nested `.parse()` mid-rule … cannot corrupt the outer parse's error tracking") and the bytes honor
it exactly: `mergeErrorState`, `addSuggestion`, `addSecondarySpan`, `reportUnclosedDelimiter` and
`resetErrorState` touch **only** the state passed in. Rationale-in-place that matches the
implementation is the exception, not the rule. The defect (L-B1) is that this discipline stopped one
function short of the buffer — which sharpens rather than dulls the compliment.
**Falsifier**: a module-global write inside any of those five functions. There is none;
`collectedDiagnostics` is the only module-level mutable, and only `collectDiagnostic` /
`clearCollectedDiagnostics` touch it.

### S-3 — `mergeErrorState`'s common path is allocation-free and its dedupe is in-place
**Provenance**: `utils.ts:29-47`.
The three-way comparison puts the overwhelmingly common case (`state.offset < state.furthest` — a
backtracking failure shallower than the deepest reached) on an **empty** path: no branch body, no
allocation, immediate `return state`. And the same-offset label accumulation dedupes with
`Array.prototype.includes` on a tiny array (`:40-42`) rather than allocating a `Set` — the right call
for the expected cardinality. For the axis in question this is correct hot-parser instinct; L-M1 is
a lapse *within* an otherwise well-shaped function, which is why it reads as a fixable oversight
rather than a design error.
**Falsifier**: an allocation on the `<` path. There is none — the `else if` at `:36` has no `else`.

### S-4 — the snapshot genuinely cannot alias the live state
**Provenance**: `utils.ts:120-122`.
`collectDiagnostic` copies all three arrays (`[...state.expected]`, `[...state.suggestions]`,
`[...state.secondarySpans]`) into the record before the subsequent `resetErrorState` mutates the
originals. Given that `resetErrorState` immediately reassigns those fields (`:134-135`), the copies
are load-bearing, and getting this wrong would have produced a subtle shared-mutation bug. It is
right.
**Falsifier**: drop any spread and the record aliases arrays that `:134-135` replaces — a real bug
the tree avoided. (The complaint in L-M4 is that this same care was not applied one function later,
at the boundary where it matters more.)

### S-5 — module size is Goldilocks-correct
**Provenance**: `diagnostics.ts` — 14 lines, 5 of comment, 6 value exports, 3 type exports, one
import source.
There is nothing to split, nothing to merge, no god-module pressure, and the subpath boundary is
drawn at a real seam (S-1 proves the seam is honored at build). Every finding above is about
*which* symbols crossed the boundary and what they do — not about the boundary's existence or the
file's size.
**Falsifier**: identify a symbol that belongs here and is absent for size reasons — L-M7's list is
absent for *design* reasons, not size; adding all eight would still leave the file under 25 lines.

---

## 6. Bottom line

The barrel is a well-drawn boundary (S-1, S-5) over an implementation whose global half was never
finished (L-B1, L-B2, L-B4). The per-state error tracking is genuinely correct and genuinely
reentrant (S-2); the collected-diagnostics buffer beside it is a process-global, flag-ungated,
unbounded array whose reader aliases it, whose eraser rebinds it, whose only writer is unreachable
from this subpath, and whose retraction primitive pops the wrong element under composition
(L-B3). The doc comment describing that buffer as "opt-in" is false (L-M6), and it occupies three of
the file's fourteen lines.

The single highest-value cure is **not** a rewrite: gate `collectDiagnostic` on
`diagnosticsEnabled`, mark/rewind the journal by length in `recover` instead of `pop`, hoist the two
array resets in `mergeErrorState` inside the existing flag test, export `isDiagnosticsEnabled`, and
delete `utils.ts:106-110` in favor of `state.getLineAndColumn`. Four of those are one-line changes
and none alters the public type surface.

**Standing corpus alignment**: O-15 PT-01 and PT-03 both re-verified at their cited dist lines with
no contradiction; PT-07's `.parse()`-undefined ambiguity is confirmed structurally here (L-B2 shows
the diagnostics subpath cannot disambiguate it either — `getCollectedDiagnostics()` returns `[]` on
an ordinary failure), which strengthens O-15's own posture that the JS-boundary invariant belongs
**above** parse-that. X·P W1 G-5 and W2 R-LAW-1/3/4 are each violated by the tree at specific lines
cited above; W1's RED baseline rows are reproduced, not merely restated.
