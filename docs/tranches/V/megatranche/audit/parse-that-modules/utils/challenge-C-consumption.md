claude-opus-5[1m]

# CHALLENGE — module `utils` · axis C (CONSUMPTION)

**Subject**: `/Users/mkbabb/Programming/parse-that/typescript/src/parse/utils.ts` (186 lines, read whole).
**Posture**: the module is assumed DEFECTIVE until the tree proves otherwise; every claim below carries a
severity, a `file:line` provenance, and the falsifier that would kill it. Superlatives carry the same
apparatus (L-18 runs both ways).

## 0. Substrate receipt + law preconditions

| item | value |
|---|---|
| evidence root | `/Users/mkbabb/Programming/parse-that` — READ-ONLY; **zero writes made**; main checkout only, no `.worktrees/`, no frozen root, no `~/Documents/Codex` |
| evidence HEAD | `ef10d5b78236c4a30a7bb22a6113b60bdc4bdf42` (`git rev-parse HEAD`), `typescript/package.json` version **1.0.0** |
| working tree | dirty in `rust/**` + untracked `docs/**` only; **no `typescript/src/**` modification** — the TS surface read here is HEAD's |
| built dist read | `typescript/dist/**`, gitignored (`.gitignore:6 dist/`), **mtime 2026-07-29 14:20** — a rebuild *after* O-15's 2026-07-27 measurement. Chunk ids: `diagnostics-DDazRHgl.js`, `packrat-entry-CS1td-8B.js` |
| `parse-that-css-totality-p2` | **ABSENT** (`ls` → `No such file or directory`), re-verified this session. **No STOP finding.** Not created. |
| tooling used | `git`/`grep`/`sed`/`wc` read-only + `node -e` on inlined arithmetic (no repo import, no file written). **No browser tooling. No bench. `enableDiagnostics()` never called. `memoize()` never called — the PT-03 latch was not armed.** |
| downstream read | `/Users/mkbabb/Programming/value.js` `package.json`, `src/css/**` (read-only) |
| the one write | this file |

**Brief-vs-tree contradiction, stated up front (INFO-1).** The task names *"value.js `src/parsing/`"* as the
consume edge. **No such directory exists.** `ls src/` → `color/ css/ easing.ts foundation/ quantize.ts
subpaths/ transform/ value.ts vite-env.d.ts`. value.js's parsing surface is `src/css/**` (7 files), and
that is what was read. Any prior finding anchored on `src/parsing/**` is anchored on nothing.

**INFO-2 — the RED-7 gate is presently unrunnable here.** `parsethat-surface-gaps.mjs:11-13` imports
`@mkbabb/parse-that` and `@mkbabb/parse-that/diagnostics` and its header says *"Run from this workspace
(it resolves the workspace's node_modules)"*. `ls node_modules/@mkbabb/` → `glass-ui keyframes.js
value.js`. **`@mkbabb/parse-that` is not installed.** Its RED rows are therefore **cited, never
re-measured** (epoch rule). Falsifier: `npm ls @mkbabb/parse-that` resolving in this workspace kills
INFO-2.

---

## 1. THE CONSUMPTION FACT THAT FRAMES EVERYTHING

**value.js consumes nothing from this module. It consumes nothing from parse-that at all.**

- `package.json` `dependencies` = `{"@mkbabb/glass-ui":"^7.0.0","@mkbabb/keyframes.js":"^6.0.0"}`. No
  `@mkbabb/parse-that`, in any dependency class.
- `grep -rn "parse-that" src/` → **2 hits, both prose**: `src/subpaths/math.ts:2` ("parse-that-**FREE**")
  and `src/subpaths/transform.ts:4` ("zero parsing, zero parse-that").
- The frozen `/css` surface (`src/css/index.ts`) is **52 exports — 33 types (`:1-35`) + 19 runtime
  (`:36-60`)**, count reproduced exactly as W2 §3 clause 2 states it. Every one of the 19 runtime exports
  resolves to a **hand-written** value.js module (`grammar.ts` · `syntax.ts` · `timeline.ts` ·
  `stylesheet.ts`). Zero combinator imports.

So the CONSUMPTION axis for `utils.ts` is not *"is value.js served well?"* — it is **"could value.js be
served at all, and at what price?"** under PLAW-BIND (parser → value → packed release; direct
parse-that→fourier forbidden, W2 §2c). Every finding below is scored against that question and against
the X·P dual-target algebra's stated laws (W2 §3b O-8 / R-LAW-1..5 / EQ-1..EQ-6) which are what a future
adoption must satisfy.

**This reframing is itself the module's first defect** — see D-09.

---

## 2. THE SURFACE, ENUMERATED

`utils.ts` exports **14 runtime functions**, **1 interface** (`Diagnostic`, `:84-93`), and **2
re-exported types** (`Suggestion`, `SecondarySpan`, `:3`). Routed to subpaths thus:

| symbol | `.` (`index.ts:5-6`) | `/diagnostics` (`diagnostics.ts:6-14`) | `/utils` (`utils-entry.ts:6`) | reachable? |
|---|---|---|---|---|
| `mergeErrorState` | ✔ | ✔ | — | yes |
| `enableDiagnostics` | ✔ | ✔ | — | yes |
| `disableDiagnostics` | ✔ | ✔ | — | yes |
| `collectDiagnostic` | ✔ | ✔ | — | yes |
| `getCollectedDiagnostics` | ✔ | ✔ | — | yes |
| `clearCollectedDiagnostics` | ✔ | ✔ | — | yes |
| `skipWhitespace` | ✔ | — | ✔ | yes (**two homes**) |
| `skipBlockComments` | ✔ | — | ✔ | yes (**two homes**) |
| `isDiagnosticsEnabled` (`:16`) | — | — | — | **NO** |
| `addSuggestion` (`:51`) | — | — | — | **NO** |
| `addSecondarySpan` (`:57`) | — | — | — | **NO** |
| `reportUnclosedDelimiter` (`:66`) | — | — | — | **NO** |
| `resetErrorState` (`:131`) | — | — | — | **NO** |
| `popLastDiagnostic` (`:146`) | — | — | — | **NO** |

**6 of 14 (43 %) of the module's runtime exports are `export`ed in source and reachable from no subpath
in `package.json`'s `exports` map.** All six are live — consumed by `parser.ts:4` and `debug.ts:6`. The
public/private line does not follow a tier; it follows nothing.

---

## 3. BLOCKERS

### D-01 — BLOCKER — The recovery tier ships content-free by default, and arming it to get content couples an unconditional `console.error`

**Provenance.** `utils.ts:33` `state.expected = diagnosticsEnabled && label ? [label] : undefined;` ·
`:38` `if (diagnosticsEnabled && label) {` · `:52` `if (diagnosticsEnabled) { state.suggestions.push(…) }`
· `:58` same for `secondarySpans` · `:71` `if (!diagnosticsEnabled) return;` (`reportUnclosedDelimiter`) ·
`:120-122` `expected: state.expected ? [...state.expected] : []` / `suggestions: [...state.suggestions]` /
`secondarySpans: [...state.secondarySpans]` · `parser.ts:67-69`
`if (isDiagnosticsEnabled()) { console.error(this.state.toString()); }`.

**Exhaustive writer census (this is what makes it a BLOCKER, not a wrinkle).**
`grep -rn "\.expected\s*=\|\.expected\.push\|suggestions\.push\|secondarySpans\.push" src/parse/` returns
**exactly** `utils.ts:33,34,35,41,44,53,59,133,134,135` plus `parser.ts:62,63,64` (three *copies*, not
writes). **`utils.ts` is the sole writer of all three diagnostic channels in the entire package, and every
write is gated on the module-global `diagnosticsEnabled` (`:6`).**

Therefore, under the shipping default (`diagnosticsEnabled = false`, `:6`), **every** `Diagnostic` that
`recover()` (`parser.ts:666`) pushes has the shape
`{offset, furthestOffset, line, column, expected: [], suggestions: [], secondarySpans: [], found}` —
three empty arrays out of eight fields. The error-recovery feature's entire reason to exist is the
diagnostic, and the diagnostic is empty.

**Why it blocks the routing law.** value.js's frozen contract (`src/css/types.ts:25-27`) is
`ParseResult<T> = {ok:true; …} | {ok:false; readonly diagnostics: readonly [ParseIssue, ...ParseIssue[]]}`
— a **non-empty tuple** whose element (`:10-24`) carries `expected: readonly string[]` and
`actual: string | null`. A value.js adapter built on parse-that's recovery tier can satisfy the *type*
(one Diagnostic → one ParseIssue) while emitting `expected: []` for every failure in production. To get
real `expected[]` it must call `enableDiagnostics()`, which is process-global (arity 0, `:8`) and which
turns on `console.error` on every failed top-level `parseState` (`parser.ts:67-69`; dist
`packrat-entry-CS1td-8B.js:882`). A library that prints to the console on a caller's parse failure is not
adoptable into a packed release.

**Corpus.** This is INBOX **O-15 / PT-01** confirmed at *source* provenance (O-15 measured dist). It is
RED-7 **DEBT-1** (`parsethat-surface-gaps.mjs:20-26`), whose three rows all trace here. It violates W2
§3b **R-LAW-3** ("diagnostics are values, never effects" — whose probe *monkey-patches `console.error` to
throw*, making `parser.ts:68` unpassable when armed) and W2 EQ-4's explicit disqualifier: *"A candidate
whose labels exist only under an armed-diagnostics mode reads as diagnostics-ABSENT and fails (PT-01)."*

**Falsifier.** Any code path that populates `state.expected`, `state.suggestions`, or
`state.secondarySpans` while `diagnosticsEnabled === false` kills D-01. The census above enumerates every
writer; there is none. Equivalently: an `enableDiagnostics` overload that arms without reaching
`parser.ts:67` kills it — `enableDiagnostics.length === 0`, there is no such overload.

### D-02 — BLOCKER — `collectedDiagnostics` is a process-global buffer with no parse identity, no source, no auto-reset, a live-array getter, and a rebind-on-clear

**Provenance.** `utils.ts:95` `let collectedDiagnostics: Diagnostic[] = [];` · `:115` `push` ·
`:139` `return collectedDiagnostics;` (the **live array**, typed `readonly Diagnostic[]`) · `:143`
`collectedDiagnostics = [];` (**rebind**, not `length = 0`) · `:147` `return collectedDiagnostics.pop();`
(takes no state) · dist `diagnostics-DDazRHgl.js:50,72-79` identical.

Five distinct consumption failures from one binding:

1. **Aliasing.** `getCollectedDiagnostics()` hands the caller the module's mutable array. The
   `readonly` is compile-time only. A consumer holding it watches it grow under later, unrelated parses.
2. **Clear doesn't clear.** `clearCollectedDiagnostics()` rebinds the module slot. A handle taken before
   the clear still points at the old array with its old contents; a handle taken after points at a
   different object. `getCollectedDiagnostics() !== previouslyHeldHandle` after any clear.
3. **No identity, no source.** `Diagnostic` (`:84-93`) has no parse id and **no `src`**. Two parses of
   two different inputs deposit into one FIFO with nothing distinguishing them — and `found` (`:113`) is
   the only surviving trace of the input, truncated to 20 chars. A consumer cannot render diagnostic #2
   against the right source string.
4. **No auto-reset.** `parseState()` (`parser.ts:~50`) never clears the buffer at entry. Parse N reads
   parse N−1's residue. The API imposes an undocumented, unenforceable "clear before every parse"
   protocol.
5. **Cross-library corruption.** value.js is a *library*. In a bundled browser app, any other
   parse-that consumer sharing the module instance can call `clearCollectedDiagnostics()` and erase
   value.js's pending diagnostics, or read them. Nothing scopes the buffer.

**Corpus.** W2 §3b **O-8** is written for exactly this class: *"No operator reads or writes process-global
mutable state… Arming, memoization, and diagnostics are **parameters of a parse**, never latches."* O-8's
stated motive is PT-03's `PACKRAT_ARMED`; `collectedDiagnostics` is the same class with an *unbounded*
payload rather than a boolean. W2 kill rule **K-6** ("observable cross-parse state… or reset with
residue") kills any candidate exhibiting item 2 or 4.

**Falsifier.** If `getCollectedDiagnostics` returned a copy (`[...collectedDiagnostics]`) items 1–2 die;
`:139` returns the binding. If `clearCollectedDiagnostics` set `length = 0` item 2 dies; `:143` rebinds.
If `Diagnostic` carried `src` item 3 dies; `:84-93` has eight fields, none of them `src`. If `parseState`
cleared at entry item 4 dies; `parser.ts` contains no `clearCollectedDiagnostics` call (`grep` over
`src/parse/` finds the symbol only at `utils.ts:142`, `index.ts:5`, `diagnostics.ts:12`).

### D-03 — BLOCKER — The two byte-scanners cannot be delivered without instantiating both module globals; no subpath in the package offers a global-free path

**Provenance.** `utils.ts:6` (`let diagnosticsEnabled`) and `:95` (`let collectedDiagnostics`) live in the
**same module** as `skipWhitespace` (`:159-164`) and `skipBlockComments` (`:168-186`). The scanners
reference neither — they touch only `state.src` and `state.offset`. Rollup chunks per source module:
dist `diagnostics-DDazRHgl.js` declares `let diagnosticsEnabled = false;` at **`:1`** and
`let collectedDiagnostics = [];` at **`:50`**, and exports the scanners from that same chunk as `b`
(`skipWhitespace`) and `s` (`skipBlockComments`) — see the chunk's export map tail and
`dist/utils.js:1` `import { s, b } from "./diagnostics-DDazRHgl.js";`.

**Every entry loads it.** `diagnostics-DDazRHgl.js` has **zero imports** (it is the package's leaf/root),
and `packrat-entry-CS1td-8B.js:1` imports *from* it
(`import { i as isDiagnosticsEnabled, m as mergeErrorState, r as reportUnclosedDelimiter, f as addSuggestion, a as collectDiagnostic, p as popLastDiagnostic } from "./diagnostics-DDazRHgl.js";`).
`core.js:1`, `parse.js`, `packrat.js`, `diagnostics.js:1`, and `utils.js:1-2` all reach it. **There is no
import of `@mkbabb/parse-that`, by any subpath, that does not instantiate `utils.ts`'s two module
globals.**

**Why it blocks.** W2 §3 clause 12 requires any scan layer to land as *"parse-that-owned combinator-surface
citizens"*; W2 §3b **O-8** forbids process-global mutable state anywhere in the operator set; W2 **G-8**
("NO-LATCH + ALLOCATION, BOTH SIDES") and **K-6** screen for it. A candidate that imports the scanners
imports the globals. Splitting `utils.ts` into `scan.ts` + `diagnostics.ts` is the minimum precondition
for AC-3 SPAN-ALGEBRA (W2 §3c) to consume this module's technique lawfully.

**Falsifier.** Any subpath whose built entry does not transitively import `diagnostics-DDazRHgl.js` kills
D-03. Checked all five: `.`→`parse.js`, `/core`→`core.js:1`, `/diagnostics`→`diagnostics.js:1`,
`/packrat`→`packrat.js`, `/utils`→`utils.js:1`. All five reach it. Equivalently: if the scanners were in
their own source module they would be their own chunk — they are not.

**Honest bound.** The globals are *inert at import* (`sideEffects: false`, `package.json:5`; the latch
arms only on `memoize()`, which I did not call). The breach is **structural availability**, not measured
cost. D-03 does not claim a runtime penalty; it claims that a conforming consumer has no lawful door.

---

## 4. MAJOR

### D-04 — MAJOR — The diagnostics API exports its *readers* and hides its *writers* and its *query*

`isDiagnosticsEnabled` (`:16`), `addSuggestion` (`:51`), `addSecondarySpan` (`:57`),
`reportUnclosedDelimiter` (`:66`), `resetErrorState` (`:131`), `popLastDiagnostic` (`:146`) appear in no
subpath (§2 table). Consequences, each independently load-bearing:

- A consumer-authored parser — the exact cand-F idiom the band ruled on and RED-7 encodes at
  `parsethat-surface-gaps.mjs:20`, `new Parser((s) => { mergeErrorState(s, label); s.isError = true; return s; })`
  — **can** contribute a label (`mergeErrorState` is public) but **cannot** contribute a suggestion or a
  secondary span. Half the diagnostic model is write-only-internally.
- A consumer cannot write their own `recover()`: `collectDiagnostic` is public but `popLastDiagnostic` —
  which `parser.ts:674` calls to undo a collection when `sync` fails — is not. The buffer invariant is
  maintainable only by parse-that's own combinator. Since `recover(sync, sentinel)`'s shape is fixed
  (one sync parser, one constant sentinel), a consumer needing a computed sentinel or a
  diagnostic-transforming recovery has no lawful path.
- `resetErrorState` is private while `collectDiagnostic`, which *calls it* (`:127`), is public — see D-07.

**Falsifier.** Find any of the six in `index.ts`, `core.ts`, `diagnostics.ts`, `packrat-entry.ts`, or
`utils-entry.ts`. `grep` over all five: none present.

### D-05 — MAJOR — `isDiagnosticsEnabled` being private forces every consumer call site to pay unconditional label construction

`mergeErrorState(state, label?)` (`:28`) discards `label` when disarmed (`:33`, `:38`), but the argument is
evaluated at the call site regardless. A consumer writing
`mergeErrorState(s, \`expected ${describeChannel(spec, i)}\`)` runs `describeChannel` and builds the
template on every failing alternative, in production, for a string that is thrown away. The guard exists
(`:16-18`) and parse-that uses it internally (`parser.ts:67`, `debug.ts:174`) — it is simply not exported.

**Falsifier.** If `mergeErrorState` took a thunk (`label?: () => string`) the cost would be deferred; `:28`
takes `label?: string`. If `isDiagnosticsEnabled` were exported the consumer could branch; §2 shows it is
not.

### D-06 — MAJOR — `Suggestion` / `SecondarySpan` are exported types with no exported writer, and `Suggestion.kind` is a closed union that cannot carry the downstream taxonomy

`index.ts:6` and `diagnostics.ts:14` both `export type { Suggestion, SecondarySpan, Diagnostic }`. The only
functions that place a `Suggestion` or `SecondarySpan` into a state are `addSuggestion` (`:51`) and
`addSecondarySpan` (`:57`) — both private (D-04). A consumer can *name* the type and *read* it off a
`Diagnostic`, and can do nothing else with it. Dead public surface.

Worse for adoption: `state.ts:25-29` fixes `Suggestion.kind` to `"unclosed-delimiter" | "trailing-content"`
— **two members, closed**. value.js's ratified `ParseIssue.code` (`src/css/types.ts:11-19`) is an
**eight**-member union (`css_syntax`, `trailing_input`, `keyframe_selector_invalid`,
`color_context_required`, `syntax_descriptor_invalid`, `syntax_mismatch`, `animation_option_invalid`,
`timeline_option_invalid`). Only `trailing_input` has a plausible image (`"trailing-content"`); the other
seven are unrepresentable. The frozen downstream taxonomy and the upstream one do not compose, and the
upstream one is not extensible by a consumer.

**Falsifier.** A public `addSuggestion` or a `kind: string` widening kills the first and second halves
respectively. `:51` is unexported; `state.ts:26` is a two-member literal union.

### D-07 — MAJOR — `collectDiagnostic` is an exported "snapshot" with a hidden destructive reset and no public inverse

`:102-128`: after pushing, `:127` calls `resetErrorState(state)` which sets `state.furthest = -1`,
`state.expected = undefined`, and replaces both arrays (`:132-135`). A consumer who calls the exported
`collectDiagnostic` to *observe* a failure destroys the very error tracking they were about to render, and
— because `resetErrorState` is private (D-04) — cannot perform the reset independently, cannot avoid it,
and cannot restore. The name says "collect"; the effect is "collect and wipe".

**Falsifier.** `const st = p.parseState("bad"); collectDiagnostic(st, 0);` → `st.furthest === -1` and
`st.expected === undefined`. Kill by showing `:127` absent or `resetErrorState` exported; both hold.

### D-08 — MAJOR — `Diagnostic` cannot be mapped onto the downstream's frozen `ParseIssue`

Field-by-field against `src/css/types.ts:10-24`:

| `ParseIssue` field | `Diagnostic` source | verdict |
|---|---|---|
| `code` (8-member union) | — | **absent**; `Suggestion.kind` is 2-member and unrelated (D-06) |
| `start: number` | `furthestOffset` (`:86`) or `offset` (`:85`) | ambiguous — two candidates, no rule |
| `end: number` | — | **absent**. The consumer must invent it (`found.length`? `furthest+1`?) |
| `expected: readonly string[]` | `expected: string[]` (`:89`) | present but `[]` in production (D-01), and **mutable** |
| `actual: string \| null` | `found: string` (`:92`) | **pre-rendered**: 20 chars hardcoded (`:113`), `\n` escaped to `\\n` but `\r`/`\t`/NUL not, `""` at EOF indistinguishable from "found empty", and no `src` to re-render from |

`found` being a rendered presentation string inside the diagnostic *value* is precisely the trap W2 EQ-4
names: *"`code` / `start` / `end` / `expected[]` / `actual` — **not rendered strings** … the rendered
string is a non-normative presentation layer outside the algebra."* A dual-target algebra comparing
`Diagnostic` structurally would be comparing a formatting decision.

**Falsifier.** An `end` field or a `src` field on `:84-93`, or a configurable window at `:113`. None exist.

### D-09 — MAJOR — The module's retention rationale names a consumer that does not consume it

`:150-156`: *"These are the primitives a hand-rolled grammar (**value.js's canonical CSS grammar**) drives
its hot paths with… **Kept** after the CSS grammar itself left for value.js (D2/D3)."* Present tense; the
sentence is the stated reason the code survived the A.W1 excision.

The downstream tree refutes it. value.js@4.0.0 has **zero** dependency on `@mkbabb/parse-that` (§1), and
its grammar hand-rolls a *different* scanner: `src/css/stylesheet.ts:432-441`. This is not a nitpick — a
KEEP decision resting on a false consumer claim is exactly the kind of retention W2's kill-by-number
discipline exists to prevent, and D-11/D-12 show the two scanners would not even be substitutable.

**Falsifier.** Any import of `skipWhitespace`/`skipBlockComments`, or of `@mkbabb/parse-that` at all, in
value.js `src/**`. `grep -rn "parse-that" src/` → two prose hits, both asserting the *absence*.

### D-10 — MAJOR — Three disagreeing public line-number semantics; `Diagnostic.line` silently picks one

All three are public. Measured (`node -e`, algorithms transcribed verbatim from `utils.ts:108-110`,
`state.ts:119-124`, `state.ts:127-134`):

| src | offset | `ParserState.getLineNumber()` (`state.ts:119`) | `ParserState.getLineAndColumn().line` (`state.ts:127`) | `Diagnostic.line` (`utils.ts:109`) |
|---|---|---|---|---|
| `"abc"` | 2 | **0** | 1 | 1 |
| `"a\nb"` | 2 | **1** | 2 | 2 |
| `"a\nb\nc"` | 4 | **2** | 3 | 3 |
| `"\nx"` | 1 | **1** | 2 | 2 |

`getLineNumber()` is off by one against the other two, uniformly. A consumer rendering an error banner
from `state.getLineNumber()` and a recovery list from `Diagnostic.line` produces two different line
numbers for the same offset. `utils.ts:108-110` also *re-implements* `state.ts:128-132` rather than
calling it — two engines, presently equal, free to drift.

**Falsifier.** Run the three algorithms on any input where they agree on all rows — the table above is the
counterexample. Kill D-10 by showing `collectDiagnostic` calls `state.getLineAndColumn(furthest)`; it does
not (`:108-110` is an inline re-derivation).

### D-11 — MAJOR — Two disagreeing public whitespace classes, one of which is wrong for CSS

`utils.ts:162` `while (i < src.length && src.charCodeAt(i) <= 32) i++;` — ASCII, `≤32`.
`leaf.ts:395-398` `whitespace = regex(/\s*/)` — the public `whitespace` **combinator**, JS Unicode `\s`.
`leaf.ts:378-381` `trimStateWhitespace` — `charCodeAt > 32`, i.e. the scanner's class.

Enumerated divergence (measured over U+0000–U+FFFF):

- `skipWhitespace` consumes, `whitespace` does **not**: **27** code points — `0x00–0x08`, `0x0E–0x1F`.
- `whitespace` consumes, `skipWhitespace` does **not**: **19** code points — `U+A0 U+1680 U+2000…U+200A
  U+2028 U+2029 U+202F U+205F U+3000 U+FEFF`.
- vs the css-syntax-3 whitespace set `{09, 0A, 0C, 0D, 20}`: `skipWhitespace` **over-consumes 28** code
  points, including **U+0000**, which css-syntax-3 §3.3 requires be *replaced by U+FFFD* (an ident code
  point), not skipped.

`:156` says the scanner is *"distinct from the `whitespace` Parser combinator"* — the comment knows they
differ and never says how, on a surface where both are exported from `.`.

Against the actual downstream: value.js `stylesheet.ts:434` skips `/\s|;/` — Unicode `\s` **plus `;`**.
Substituting `skipWhitespace` there changes behavior in three directions at once (loses 19 Unicode
spaces → they become prelude text; gains 27 C0 controls; loses `;` → `blocks()` fails to advance).

**Falsifier.** Show `\s` and `≤32` agree — the enumerations above are the counterexample. Or show CSS
whitespace includes U+0000 — css-syntax-3 §3.3 says the opposite.

### D-12 — MAJOR — `skipBlockComments`'s unterminated-comment posture silently loses a diagnostic the downstream currently emits

`:177-181`: on `/*` with no `*/`, `const end = src.indexOf("*/", i + 2); if (end === -1) break;` — the loop
exits with `i` at the `/`, `state.offset` unchanged from the comment start, **no error, no diagnostic, no
signal**. The caller sees "nothing to skip" and proceeds to fail somewhere confusing.

Two contradictions:

1. **css-syntax-3 §4.3.2**: an unterminated comment is a parse error *and consumes to EOF*. This consumes
   nothing.
2. **The sole named downstream does the opposite**: `stylesheet.ts:437-439`
   `const end = source.indexOf("*/", cursor + 2); if (end < 0) return failure(source, "css_syntax", ["closing comment"], cursor);`
   — a typed `ParseIssue` with `code: "css_syntax"` and `expected: ["closing comment"]`. Adopting
   parse-that's primitive would delete that diagnostic outright.

The function also has the state in hand and the private `mergeErrorState`/`addSuggestion` in scope, and
reports nothing.

**Falsifier.** A `mergeErrorState`/`addSuggestion` call in `:168-186` — there is none. Or css-syntax-3
specifying "stop at the comment start" — it does not.

### D-13 — MAJOR — The scanners are COMP-1-hostile by construction: they advance the cursor and record nothing

`:164` and `:185` both end `state.offset = i;`. The bytes crossed — whitespace and entire comment bodies —
are written to **no** channel. W2 §3b **COMP-1** requires, for *every* input in the closed universe,
`weave(V, C, P) === S` byte-for-byte, where `C` is the ordered `(offset, length, kind)` complement holding
*"whitespace, comments, case spelling, separator choice, skipped malformed spans"*. **EQ-2** and **EQ-6**
compare `C` between lowerings. These two functions destroy exactly the bytes `C` is defined to hold, and
offer no hook to capture them.

Consequence for X·P: AC-3 SPAN-ALGEBRA (W2 §3c) cannot adopt them as-is — its scanner must *emit spans*,
not swallow them. The **technique** survives (see S-3); the **signature** cannot.

**Falsifier.** Any out-parameter, callback, or complement write in `:159-186`. Both functions return
`void` and write one field.

### D-14 — MAJOR — `/utils` advertises 2 KB of dependency-free scanners and delivers a 44 KB graph containing the `PACKRAT_ARMED` latch

Measured (`wc -c`, dist mtime 2026-07-29 14:20):

| file | bytes |
|---|---|
| `dist/utils.js` (the `/utils` entry) | **2,039** |
| `dist/diagnostics-DDazRHgl.js` (imported at `utils.js:1`) | 3,516 |
| `dist/packrat-entry-CS1td-8B.js` (imported at `utils.js:2`) | **40,576** |

`utils-entry.ts:6-14` co-locates the two 6-line scanners with `jsonParser`, `csvParser`, `escapedString`,
`quotedString`, `numberParser`. Those pull the combinator core, which is the packrat chunk — which
declares `let PACKRAT_ARMED = false;` at `:678`, sets it at `:722`, reads it at `:682`/`:714` (O-15 PT-03,
reproduced here by `grep`), and holds the `console.error` at `:882`. ESM consumers may tree-shake the
domain parsers; the **CJS arm cannot** — `package.json` maps `"./utils"` `require` → `./dist/utils.cjs`
(2,465 B, same chunk graph), and CJS `require` is not statically shakeable.

The subpath's own doc calls itself *"the utility tier a consumer reaches for when it wants the
batteries-included helpers, **not just the bare combinator core**"* (`utils-entry.ts:4-5`) — yet a
consumer who wants *only* the two scanners has no leaner door than the full barrel.

**Falsifier.** `head -2 dist/utils.js` not importing `packrat-entry-*.js`. It imports it at line 2.

### D-15 — MAJOR — `/core`'s isolation guarantee is false at the build, and `utils.ts` is what breaks it

`core.ts:3-5`: *"The zero-side-effect primitive set… A consumer that imports only this **never pulls the
diagnostics accumulator, the packrat tier**, or the json/csv domain parsers."*

Built: `dist/core.js:1` `import { P, a, b, c, d, e, f, g, h, l, j, r, s, n, t, w } from "./packrat-entry-CS1td-8B.js";`
— that **is** the packrat tier (`PACKRAT_ARMED` at `:678`) — and `packrat-entry-CS1td-8B.js:1` imports six
symbols from `diagnostics-DDazRHgl.js`, which **is** the diagnostics accumulator, i.e. `utils.ts`. Both
halves of the sentence are false.

Attributed here because `utils.ts` is the graph's root: it is the one module with zero imports that every
other module reaches. A consumer's only truthful model is *"importing parse-that at all means importing
utils.ts"*. Semver hygiene: the doc is a published contract and it does not hold.

**Falsifier.** `head -1 dist/core.js` showing no packrat import. It shows one.

### D-16 — MAJOR — `dist` filename collision: `utils.js` and `utils.d.ts` are built from **different source modules**

`vite.config.ts:19` maps entry `utils: "./src/parse/utils-entry.ts"`, so `dist/utils.js` is
**utils-entry.ts**'s output — exporting exactly `csvParser, escapedString, jsonParser, numberParser,
quotedString, skipBlockComments, skipWhitespace` (verified in the file's export block). But
`vite-plugin-dts` also emits `dist/utils.d.ts` from **utils.ts**, declaring all 14 functions including
`mergeErrorState`, `collectDiagnostic`, `addSuggestion`, `resetErrorState`, `popLastDiagnostic`. Both
files exist, 2,068 B and 2,039 B, same directory, same basename.

`package.json` pairs `"./utils"`'s `types` → `./dist/utils-entry.d.ts` with `import` → `./dist/utils.js`
— correct names, but **different stems**. Any resolver that types a runtime file by sibling convention
(`X.js` → `X.d.ts`) attaches `utils.ts`'s declarations to `utils-entry.ts`'s runtime, and
`import { mergeErrorState } from "@mkbabb/parse-that/utils"` **typechecks and crashes at runtime**.

**Honest scoping** (this is why it is MAJOR, not BLOCKER): `moduleResolution: bundler`/`node16` honors the
`exports` map's `types` condition and resolves correctly; `moduleResolution: node10` ignores subpath
exports entirely and fails to resolve at all. The bite is confined to tooling doing exports-map runtime
resolution plus sibling-convention typing (several bundler/d.ts-rollup/IDE plugin paths do this).

**Falsifier.** `dist/utils.js` exporting `mergeErrorState` — its export block does not. Or the absence of
`dist/utils.d.ts` — it is present (`ls -la dist/utils*`).

### D-17 — MAJOR — `/utils` exports functions whose only parameter type it does not export

`utils-entry.d.ts` (whole file) exports `skipWhitespace, skipBlockComments, jsonParser, JsonValue,
csvParser, escapedString, quotedString, numberParser`. **`ParserState` is not among them**, yet it is the
sole parameter of both scanners (`:159`, `:168`). A TypeScript consumer importing only
`@mkbabb/parse-that/utils` cannot name the argument type, cannot construct the argument, and cannot
satisfy the signature without additionally importing `@mkbabb/parse-that` or `/core` — which voids the
subpath's stated purpose and re-imposes the full graph (D-14, D-15).

**Falsifier.** `ParserState` appearing in `utils-entry.d.ts` or `utils-entry.ts`. Neither.

### D-18 — MAJOR — Dual public home for the scanners, with no declared primary

`skipWhitespace`/`skipBlockComments` are exported from both `.` (`index.ts:5`) and `/utils`
(`utils-entry.ts:6`). Nothing states which is the contract. Semver consequence: retiring either is a
breaking change for whichever consumers picked it, so the surface is now pinned twice — and a future
split of `utils.ts` (the D-03 cure) must preserve both.

**Honest bound**: runtime identity is *not* duplicated — both entries import the same
`diagnostics-DDazRHgl.js` chunk (`utils.js:1`; `parse.js` via the packrat chunk), so there is one function
object, not two. The defect is contract ambiguity and semver surface area, not double instantiation. I
checked this specifically because the opposite would have been a BLOCKER.

**Falsifier.** A `@deprecated` tag or a doc sentence naming the primary home — neither exists in
`index.ts`, `utils-entry.ts`, or `utils.ts`.

---

## 5. MINOR

### D-19 — MINOR — `mergeErrorState`'s return value is a fluent affordance nobody can use
`:48` `return state;` typed `ParserState<unknown>`. All ~20 internal call sites discard it
(`parser.ts:93,201,223,239,258,273,291,410,418,447,460,468,504,553,626`; `leaf.ts:16,54,69,142,291,303,360`).
A typed consumer wanting `return mergeErrorState(s, l);` from a `ParserFunction<T>` gets
`ParserState<unknown>` and must cast. **Falsifier**: one internal call site using the return value — none does.

### D-20 — MINOR — `skipBlockComments` is misnamed
It skips whitespace *and* comments (`:171-184`); the doc comment says so (`:166`), the name does not. A
consumer composing `skipWhitespace()` then `skipBlockComments()` double-scans whitespace.
**Falsifier**: a whitespace-free implementation at `:173-176` — the `ch <= 32` branch is there.

### D-21 — MINOR — Type provenance laundering
`:3` re-exports `Suggestion`/`SecondarySpan` from `state.js` through `utils.ts`; `index.ts:6` and
`diagnostics.ts:14` then re-export them *from utils*, while `index.ts:4` takes `ParserContext`/`Span`
from `state.js` directly. One module's types reach the barrel by two different routes, so
"where is `Suggestion` defined?" has two answers in the emitted `.d.ts` graph.
**Falsifier**: `index.ts` sourcing all state types from one place — `:4` and `:6` disagree.

### D-22 — MINOR — `found: ""` at EOF is ambiguous
`:113` `src.slice(furthest, furthest + 20)` yields `""` when `furthest === src.length`, indistinguishable
from a genuinely empty match. `ParseIssue.actual` (`types.ts:23`) is `string | null` precisely to
distinguish these; the mapping loses it. **Falsifier**: a null/EOF sentinel at `:113` — there is none.

### D-23 — MINOR — `readonly Diagnostic[]` is shallow and compile-time only
`:138` returns `readonly Diagnostic[]` but `Diagnostic.expected: string[]`, `suggestions: Suggestion[]`,
`secondarySpans: SecondarySpan[]` (`:89-91`) are all mutable, and the array itself is the live binding
(D-02). A consumer can `d[0].expected.push("x")` and mutate the module's record.
**Falsifier**: `Readonly<>`/`readonly` on `:89-91` — absent. (Contrast: value.js's `ParseIssue` is
`Readonly<{… expected: readonly string[] …}>`, `types.ts:10,22`.)

---

## 6. SUPERLATIVES (L-18, same apparatus)

### S-1 — The per-state threading of the error channels is genuinely, verifiably O-8-clean
`:20-26` claims the furthest-offset/expected/suggestions/secondarySpans model lives on `ParserState`, and
the tree bears it out: `state.ts:43-45` declares all three; `mergeErrorState` (`:28`), `addSuggestion`
(`:51`), `addSecondarySpan` (`:57`), `reportUnclosedDelimiter` (`:66`), and `resetErrorState` (`:131`) all
take the state explicitly. **Four of the five diagnostic channels already satisfy W2 §3b O-8** — the hard
part of the migration parse-that would otherwise owe X·P is done. **Falsifier**: a module-level
`let furthest` / `let expected` — `grep` over `utils.ts` finds exactly two module-level `let`s, `:6` and
`:95`, and neither is an error channel. This is the strongest thing in the file.

### S-2 — The diagnostics-off hot path is allocation-free, which is why D-01's cure is cheap
`:32-35`: on a new furthest with diagnostics off, `expected` is set to `undefined` — **no array
allocated** — and the two array fields are reassigned to fresh empties only on the furthest-advance
branch. `:38`'s accumulate branch is a single boolean test when disarmed. Across the ~22 internal call
sites this is near-zero. The consequence matters: **PT-01 is a *surface* defect, not a *cost* defect** —
the gating mechanism is correctly placed, it is merely wired to a process global instead of a parse
parameter. Threading a per-parse flag is a signature change, not a redesign. **Falsifier**: an allocation
on the disarmed path — `:33`'s ternary yields `undefined`, not `[]`.

### S-3 — The `indexOf("*/")` closing-token scan is the technique the downstream independently converged on
`:178` `const end = src.indexOf("*/", i + 2);` — memchr-style, no per-char loop. value.js, with **zero**
knowledge of this code (§1: no dependency), wrote `stylesheet.ts:438`
`const end = source.indexOf("*/", cursor + 2);` — the identical technique with the identical `+2` offset.
Two independent authors, one answer. That is the best available evidence that the **technique** deserves
to survive into X·P's AC-3 scan-union even though the **export** (D-13, D-11, D-12) does not.
**Falsifier**: a per-character comment loop in either tree — neither has one.

### S-4 — `collectDiagnostic` resets the state, which is non-obvious and correct
`:127` calls `resetErrorState` after the push. Without it, `recover()`'s loop
(`parser.ts:666` inside `many()`/`sepBy()`) would carry element #1's `furthest` forward, and every
subsequent recovered element would report its diagnostic at element #1's offset — because `mergeErrorState`
only advances on `state.offset > state.furthest` (`:29`). A naive implementation gets this wrong.
**Falsifier**: delete `:127` and the second recovered element's `furthestOffset` pins to the first's.
(This correctness is what D-07 wishes were *documented and inversible* — the behavior is right, the
API contract around it is not.)

---

## 7. THE X·P DUAL-TARGET VERDICT — keep / wrap / retire

Scored against W2 §3b (the algebra's laws), §3c (the candidate field), §3 clause 12 (scan primitives stay
inside the combinator library), and the kill rules K-6/K-8.

| item (`utils.ts`) | verdict | rationale + gate |
|---|---|---|
| the `charCodeAt` / `indexOf` byte-loop **technique** (`:159-186`) | **KEEP** | S-3; W2 §3 cl. 12 wants it as a *combinator-surface citizen* in `<p2>/typescript/src/**` on branch `w2/ac3-scan-union` (§4 Surface B). It is AC-3's substrate. |
| per-state threading of `furthest`/`expected`/`suggestions`/`secondarySpans` (`:20-26`, `state.ts:43-45`) | **KEEP** | S-1; already O-8-clean. Folds directly into `D` of `(V, C, P, D)`. |
| `resetErrorState`'s rollback semantics (`:131-136`) | **KEEP, EXTENDED** | S-4. It is a *partial* R-LAW-1: it restores the four diagnostic fields but **not** `state.offset`. The algebra's `mark`/`rollback` must add offset + complement length + journal length + (Wasm) arena watermark. |
| `skipWhitespace` / `skipBlockComments` as **exported functions** | **WRAP, then RETIRE the raw export** | D-13 (no complement channel ⇒ COMP-1/EQ-2/EQ-6 unsatisfiable through them), D-11 (character class hardcoded and CSS-wrong), D-12 (unterminated-comment posture wrong and diagnostic-silent). Wrap as `Parser` values with (a) the char class as a **parameter**, not a literal, (b) a complement emit, (c) a labelled failure on unterminated. They are currently raw state mutators returning `void` — not composable with `.then()`/`all()`/`wrap()` at all. |
| `mergeErrorState` (`:28-49`) | **WRAP** | Its shape is right; its gate is a process global. Becomes "append to `D`", where arming is a **parse parameter** (O-8). |
| `enableDiagnostics` / `disableDiagnostics` / `isDiagnosticsEnabled` + `let diagnosticsEnabled` (`:6-18`) | **RETIRE** | D-01, D-03. O-8: *"Arming… is a parameter of a parse, never a latch."* G-8 / K-6. |
| `let collectedDiagnostics` + `collectDiagnostic` / `getCollectedDiagnostics` / `clearCollectedDiagnostics` / `popLastDiagnostic` (`:95-148`) | **RETIRE** | D-02. `D` is returned in the result, not deposited in a module slot. K-6 kills the reset-with-residue shape outright. |
| `Diagnostic.found` (`:92`, `:113`) | **RETIRE** | D-08. EQ-4 excludes rendered strings from the compared product by name. |
| `Suggestion` / `SecondarySpan` (`state.ts:25-34`, re-exported `:3`) | **RETIRE** | D-06. Superseded by value.js's frozen 8-code `ParseIssue` (`src/css/types.ts:10-24`), already ratified as `D`'s element type by W2 §3b. |
| the `/utils` subpath **as composed** (`utils-entry.ts`) | **RETIRE the composition** | D-14, D-17. If the scanners graduate to combinator citizens they belong on `/core`; `/utils` then means "domain parsers" (json/csv/string) and nothing else — a coherent tier for the first time. |

**Sequencing note for X.P.W2.** Nothing above is executable today: W2 §2b OP-1 (owner begin-word) is NOT
GIVEN, OP-2/OP-3 are unrun, and the fresh root is ABSENT. This verdict is an **input to `.c`'s contract
ratification and `.h`'s kill ledger**, not an authorization. Per W2 §4 no seat may write into
`/Users/mkbabb/Programming/parse-that/**` — every cure listed lands in the fresh root, never here.

---

## 8. CORPUS RECONCILIATION — where I confirm, extend, and contradict

| id | this challenge |
|---|---|
| **O-15 / PT-01** (label no-op unless armed; arming couples `console.error`) | **CONFIRMED at source provenance**, which O-15 did not have: the label drop is `utils.ts:33` + `:38`, and the `console.error` is `parser.ts:67-69`. **EXTENDED** by the writer census (§D-01): `utils.ts` is the *sole* writer of *all three* channels, so the coupling covers `suggestions` and `secondarySpans` too, not just `expected`. |
| **O-15 / PT-01 dist line-cites** | **PARTIAL CONTRADICTION, benignly explained.** `dist/diagnostics-DDazRHgl.js:14` reproduces **exactly** (it is the `state.expected = diagnosticsEnabled && label ? …` line). `dist/packrat-entry-*.js:881` measures at **`:882`** on this working-tree dist (chunk `CS1td-8B`, built 2026-07-29 14:20 — *after* O-15's 2026-07-27 measurement against the published npm dist). O-15 wildcards that chunk's hash, so the ±1 is a rebuild artifact, **not a defect in O-15**. It is a live demonstration of why W2 G-7's substrate-receipt clause exists: **a dist line-cite without a chunk-hash + build-mtime receipt is not reproducible.** |
| **O-15 / PT-03** (`PACKRAT_ARMED` one-way latch, `:678`/`:722`/`:682`/`:714`) | **CONFIRMED by `grep` on this dist** — all four line numbers reproduce exactly. **NOT re-benched** (the latch is one-way; arming is forbidden by this task's law and by W1 §G-4). D-14 adds the consumption consequence O-15 did not draw: the `/utils` subpath cannot deliver its scanners without that chunk in the graph. |
| **O-15 / PT-07** (JS boundary) | **NOT re-measured** (would require importing the package; absent from this workspace, INFO-2). Cited as O-15's, and I concur with its posture: the cure is a named JS-boundary invariant **above** parse-that. Nothing in `utils.ts` guards its `state` argument either (`:159`, `:168` dereference `state.src` unguarded), so the boundary problem is uniform across the module. |
| **RED-7 / `parsethat-surface-gaps.mjs` DEBT-1** (`:20-26`) | **CONFIRMED and traced to source.** All three DEBT-1 rows resolve into this module: the `reject()` label drop → `utils.ts:33`; `Parser.prototype.label` absent → there is no label combinator because `addSuggestion`/`addSecondarySpan` are private (D-04); `enableDiagnostics.length !== 1` → `utils.ts:8`, arity 0, process-global (D-01, D-03). **Cited, not re-run** (INFO-2). |
| **RED-7 GUARD rows** (`:51-57`) | Out of this module's scope (`Parser.parseState`, `Parser.parse`), but D-08 shows the same failure-signal poverty inside `Diagnostic`: no `end`, no `src`, `found:""` ambiguous at EOF. |
| **parser-band.md — the five binding debts** | Debt **1** (labelled failures) is *blocked by this module*: `mergeErrorState` is public but its label is discarded by default (D-01) and the suggestion writers are private (D-04). Debt **3** (recursion bounded by construction) is untouched here — `utils.ts` has no depth parameter and no shield. Debts 2/4/5 are grammar-side, not utils-side. |
| **parser-band.md — cand-O's `never` = `regex(/(?!)/)` vs cand-F's labelled failure** (`:111-112`, `:116`) | The band ruled cand-F's labelled failure better and made it debt 1. **This module is why cand-O reached for `(?!)`**: with `addSuggestion` private and `mergeErrorState`'s label dropped by default, an opaque regex failure is the only zero-width failure a consumer can build that behaves the same armed and disarmed. The band read this as a *candidate* choice; the tree shows it as a *surface* constraint. |
| **W2 §3c AC-3 SPAN-ALGEBRA** | D-13 sharpens AC-3's Stage-0 falsifier: parse-that's existing scanners *cannot* be AC-3's substrate unmodified, because they emit no spans. AC-3 must author the complement-emitting scanner, and W2 §4 Surface B already gives it the only lawful home (`w2/ac3-scan-union`). |
| **W2 §3c AC-4 SIBLINGS-ORACLE** | D-06/D-08 mean AC-4's shared channel table cannot borrow `Suggestion`/`Diagnostic` as the diagnostic carrier — `ParseIssue` must be the table's own row type in both siblings, or EQ-4 has nothing structural to compare. |
| **W1 §G-4 / harness constraints** | Honored: no bench run, latch never armed, diagnostics never enabled, one-process discipline moot. |
| **W2 §2b OP-7 (clone-point substrate mark)** | Respected: everything here is measured at **master `ef10d5b`** (source) and the working-tree dist built from it. The three Codex commits touching `typescript/src/parse/**` (`90d4ec5`/`de36d57`/`059e129`) are **not** in this checkout's history and are neither measured nor adopted. A future re-measure on `f5757082` must re-derive every line number in this file. |

---

## 9. TALLY

**Defects: 23** — BLOCKER **3** (D-01, D-02, D-03) · MAJOR **15** (D-04 … D-18) · MINOR **5**
(D-19 … D-23).
**Superlatives: 4** (S-1 … S-4).
**Records (not scored as defects): 2** — INFO-1 (`src/parsing/` does not exist; the surface is `src/css/**`),
INFO-2 (the RED-7 gate is unrunnable in this workspace; its rows cited, never re-measured).
**STOP findings: 0** — `parse-that-css-totality-p2` absent and not created; no write to the evidence root;
no worktree, frozen root, or Codex path entered.

**Verdict on the axis.** `utils.ts` is the package's universal chunk root and its *only* diagnostic writer,
and it discharges both roles through two module-level `let`s. That single decision produces all three
blockers, makes the recovery tier unusable by the routing law's sole downstream, and puts the two byte
scanners — the module's genuinely good half — behind a door no conforming consumer can open. The module
is not badly *written*; `mergeErrorState`'s allocation discipline (S-2) and the per-state threading (S-1)
are better than most. It is badly *situated*: the right mechanism wired to the wrong scope. The cure is a
split, not a rewrite — `scan.ts` (complement-emitting, class-parameterized, combinator-wrapped) plus a
diagnostics module whose arming is a parse parameter. Both belong in the fresh root, and neither may be
written until the owner's begin-word.
