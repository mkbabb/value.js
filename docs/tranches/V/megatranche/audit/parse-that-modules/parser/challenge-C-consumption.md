claude-opus-5[1m]

# CHALLENGE — parse-that `parser` module · axis C (CONSUMPTION)

**Subject**: `/Users/mkbabb/Programming/parse-that/typescript/src/parse/parser.ts` (711 lines,
`@mkbabb/parse-that@1.0.0`).
**Posture**: the module is assumed DEFECTIVE until the tree proves otherwise. Every claim below
carries a severity, a `file:line` provenance, and the falsifier that would kill it. Superlatives
carry falsifiers too (L-18 runs both ways).
**Law compliance**: `/Users/mkbabb/Programming/parse-that` was read only. The only write from this
seat is this file. `/Users/mkbabb/Programming/parse-that-css-totality-p2` was checked and is
**ABSENT** (`ls` → `No such file or directory`, 2026-08-04) — no STOP finding. No browser tooling
was used. **No probe was executed that calls `enableDiagnostics()`, `memoize()`, or
`mergeMemos()`** — the `PACKRAT_ARMED` latch is one-way (PT-03) and arming it inside an audit seat
would poison any later measurement in this process; every latch/diagnostics claim below is derived
statically from source and from the *already-built* `dist/` bytes, never from an arming run.

## 0. Read set

Module whole, plus every file it imports, read-only:

| file | lines | why in the read set |
|---|---|---|
| `src/parse/parser.ts` | 711 | subject |
| `src/parse/state.ts` | 189 | `ParserState`, `Span`, `createParserContext`, `parserNames` |
| `src/parse/debug.ts` | 383 | `parserDebug`, `parserPrint` (parser.ts:3) |
| `src/parse/utils.ts` | 186 | `mergeErrorState`, `addSuggestion`, `isDiagnosticsEnabled`, `collectDiagnostic`, `popLastDiagnostic`, `reportUnclosedDelimiter` (parser.ts:4) |
| `src/parse/lazy.ts` | 43 | `createLazyCached` (parser.ts:5) |
| `src/parse/leaf.ts` | 399 | `trimStateWhitespace`, `eof`, `all`, `_initWhitespace`, `whitespace` (parser.ts:6) |
| `src/parse/packrat.ts` | 488 | `packratEnter`, `packratExit` (parser.ts:7) |
| `src/parse/ansi.ts` | 17 | transitive via debug.ts:5 |
| `src/parse/{index,core,diagnostics,packrat-entry,utils-entry}.ts` | 14/26/14/5/14 | the five published entry surfaces |
| `package.json`, `vite.config.ts`, `CHANGELOG.md` | — | the exports map, the multi-entry build, the r6 rulings |
| `test/{subpath-gate.mjs,manifest-gate.mjs,dist-surface.test.ts}`, `scripts/proof-no-dead-combinator.mjs` | — | the surface/semver gates that claim to police this axis |
| `dist/{core.js,parse.js,packrat-entry-CS1td-8B.js,diagnostics-DDazRHgl.js,parser.d.ts,core.d.ts}` | — | the artifact a consumer actually resolves |

Downstream, read-only: value.js `src/css/index.ts` (60 lines — the frozen 52), `src/css/types.ts`,
`package.json`; the band prototypes at
`docs/tranches/V/megatranche/prototypes/css-parser/{cand-o,cand-f,cand-b-dispatch,cand-s-spec,idiom}`;
keyframes.js `src/`.

**Correction to the commission, stated for the record**: the task names `value.js src/parsing/` as
the consume-edge tree. **That directory does not exist** (`find src -type d -name "pars*"` → no
output). value.js's parsing surface is `src/css/**`; the constellation-memory line about
`src/parsing/grammars/*.bbnf` is stale. The consume edges were read at `src/css/**` instead.

## 1. The consumption fact that reframes the whole axis

**value.js does not consume parse-that.** `@mkbabb/parse-that` appears in neither
`dependencies` nor `devDependencies` of `/Users/mkbabb/Programming/value.js/package.json`; it is
absent from `node_modules/@mkbabb/` (which holds only `glass-ui`, `keyframes.js`, `value.js`); it
appears zero times in `package-lock.json`; and `grep -rn "parse-that" src/` returns two *comments*
(`src/subpaths/transform.ts:4`, `src/subpaths/math.ts:2`), both of which brag about being
parse-that-*free*. The routing law's "sole downstream" is, today, a **prospective** consumer.

The one live consume edge in this repository is the band's private workspace:
`docs/tranches/V/megatranche/prototypes/css-parser/package.json` pins
`"@mkbabb/parse-that": "1.0.0"` and installs it into its own `node_modules` — explicitly
"NOT production. Consumes the PUBLISHED package only."

This is **not** a new finding: W2 §3 *Not in scope* rules "adding `@mkbabb/parse-that` to
`package.json` (X-W9 G31 measures that set and it stays as measured)". It is recorded here because
every severity on this axis has to be read against it: **`parser.ts` currently has one real
consumer, and that consumer is a prototype band.** A defect that would be a shipping emergency in a
widely-depended-on library is, here, a *design debt the X·P wave is about to inherit*. Severities
below are calibrated to that: they say what X·P must fix before adoption, not what is on fire in
production.

**52-export surface anchor** (re-verified): `src/css/index.ts` is exactly 60 lines — 33 types at
`:1-35`, 19 runtime exports at `:36-60`. `ParseResult`'s failure arm at `src/css/types.ts:26-28`
is `{ ok: false; diagnostics: readonly [ParseIssue, ...ParseIssue[]] }` — a **non-empty tuple**.
Hold that; it kills `Parser.parse()` in §3, C-M8.

---

## 2. BLOCKERS

### C-B1 — BLOCKER — The subpath export map is not a zone map. `/core` loads the entire library, packrat and diagnostics included.

**Claim.** `src/parse/core.ts:1-6` states: *"The zero-side-effect primitive set… A consumer that
imports only this **never pulls the diagnostics accumulator, the packrat tier**, or the json/csv
domain parsers."* The CHANGELOG elevates this to a ruling — **r6 #6**, 1.0.0: *"parse-that is not
zone-partitioned — the subpath export map (`.` / `core` / `diagnostics` / `packrat` / `utils`) **IS
the zone map**, and splitting the ~711-LOC `parser.ts` is net-negative."*

**Both sentences are false at the artifact.** `parser.ts` — which `core.ts:7` re-exports — statically
imports the diagnostics module at `parser.ts:4` and the packrat module at `parser.ts:7`. The build
resolves this exactly as written:

```
dist/core.js:1   import { P, a, b, … } from "./packrat-entry-CS1td-8B.js";
dist/packrat-entry-CS1td-8B.js:1
                 import { i as isDiagnosticsEnabled, m as mergeErrorState, r as
                 reportUnclosedDelimiter, f as addSuggestion, a as collectDiagnostic,
                 p as popLastDiagnostic } from "./diagnostics-DDazRHgl.js";
```

The chunk `/core` pulls is *named after the packrat entry* and contains it:
`dist/packrat-entry-CS1td-8B.js:678` `let PACKRAT_ARMED = false;` · `:722` `PACKRAT_ARMED = true;` ·
`:773` `const growLR = …`. Those are the same `:678` / `:722` line cites INBOX **O-15 PT-03** used
to characterise the one-way latch — i.e. the latch O-15 measured is inside the `/core` graph.

Measured module graph for `import { Parser } from "@mkbabb/parse-that/core"`:

| file | bytes |
|---|---|
| `dist/core.js` | 1,336 |
| `dist/packrat-entry-CS1td-8B.js` | 40,576 |
| `dist/diagnostics-DDazRHgl.js` | 3,516 |
| **total** | **45,428** |

Of that chunk, lines 1–285 (≈**9,354 bytes, 20.6 % of the whole `/core` graph**) are the ANSI +
pretty-printer tier (`summarizeLine` at `:41`, `statePrint` at `:135`, `parserPrint` at `:174`) —
present solely because `parser.ts:3` imports `parserDebug`/`parserPrint` for two methods that have
zero call sites anywhere (C-M5). The `Parser` class does not begin until `:286`. The packrat/LR
machinery from `:678` onward adds ≥6,163 bytes.

The `.` barrel is worse and by construction: `src/parse/index.ts:2-13` re-exports *every* tier,
including `memoize`/`mergeMemos`/`resetPackrat` (`:8`) and `jsonParser`/`csvParser` via
`export * from "./parsers/index.js"` (`:13`). So the default specifier — the one every band
prototype actually writes (`import { Parser, all, any, dispatch, regex, string } from
"@mkbabb/parse-that"`, cand-f/cand-b headers) — is a strict superset of all four subpaths.

**Why the gate did not catch it.** `test/subpath-gate.mjs` (`proof:subpath`) asserts only that each
subpath's three `exports` fields *resolve to files that exist* (`:24-35`) and that three named
functions are typeof `"function"` (`:45-55`). It has **no exclusion clause** — nothing anywhere in
`proof:all` asserts that `/core` *lacks* packrat or diagnostics. The gate is a liveness gate wearing
a partitioning gate's name.

**Consumption consequence.** Under W2's dual-target frame, a JS lowering that is "source-direct on
the combinator library's own surface" (AC-1's premise, §3c) inherits all 45 KB and the latch with
it. **AC-3's Stage-0 falsifier is a boundary-cost measurement against a "~94 ns whole-parse budget";
a candidate cannot honestly report a JS-lowering footprint while the tier claimed absent is
statically linked.**

**Falsifier.** Show a resolution path by which `import { Parser } from "@mkbabb/parse-that/core"`
does *not* evaluate `dist/packrat-entry-CS1td-8B.js`. Any bundler honouring `"sideEffects": false`
may *tree-shake* unused exports out of the final bundle, but that is a bundler optimisation, not the
package's partitioning: for a plain Node ESM consumer (`node --input-type=module`), for any
non-bundling runtime, and for `require("@mkbabb/parse-that/core")` (the `.cjs` twin is built the
same way, `vite.config.ts:16-22` `formats: ["es","cjs"]`), the whole chunk is evaluated. Producing a
Node run in which `dist/packrat-entry-*.js` is not loaded kills this finding.

**Contradiction filed explicitly.** CHANGELOG 1.0.0 §"Two r6-mandated decisions" r6 #6 asserts the
export map *is* the zone map. The tree disagrees. The premise of the ruling — that splitting
`parser.ts` is net-negative — may still be right; the *conclusion drawn from it* (that the subpaths
therefore partition anything) is measurably wrong, and W2's §3b claim that `/core` is a cheap
primitive tier must not be inherited unexamined.

---

### C-B2 — BLOCKER — The sole entry point emits a diagnostic as a process effect. `parseStateInner` calls `console.error`.

**Claim.** `parser.ts:67-69`:

```ts
if (isDiagnosticsEnabled()) {
    console.error(this.state.toString());
}
```

Every parse in the library funnels through `parseState` → `parseStateInner` (`parser.ts:34-49`,
`:51-75`). On the error branch, if the process-global diagnostics flag (`utils.ts:6` `let
diagnosticsEnabled = false`, flipped by `utils.ts:8-14`) is on, the library **writes to stderr**.
There is no injection point, no per-parse override, no return-value alternative: the parameterless
`enableDiagnostics()` (`utils.ts:8`, arity 0) is the only switch, and `parsethat-surface-gaps.mjs`
already rows this as `DEBT-1  enableDiagnostics() is process-global (arity)`.

This is **O-15 PT-01 localised**: PT-01 reports that `label` is a no-op unless diagnostics are armed
and that "arming couples an unconditional `console.error`", citing
`dist/diagnostics-DDazRHgl.js:14` + `dist/packrat-entry-*.js:881`. **`parser.ts:67-69` is the
source line behind that second cite** — the coupling is not distributed across the library; it is
this module, this branch, three lines.

**Consumption consequence — this is the blocker.** W2 §3b **R-LAW-3 (diagnostic purity)** is
normative and its probe is specified as adversarial: *"The probe monkey-patches
`console.error`/`console.warn` to **throw** over the full corpus — a lowering that prints cannot pass
(the PT-01 coupling made unpassable)."* Any X·P candidate whose JS lowering is source-direct on
`Parser.parseState` — which is AC-1's and AC-3's stated posture, and AC-4's `cand-O` seed's actual
entry (`parser-band.md:108`: *"entry via `parseState` + `isError`"*) — **fails R-LAW-3 by
construction the moment diagnostics are armed**, and it fails **K-8** at the same time, because a
throwing `console.error` turns the print into an exception on the totality corpus.

Note the second-order trap: the two behaviours are not merely coupled, they are *inverted from what
a consumer wants*. With diagnostics **off** (the shipping default) `state.expected` is `undefined`
(`utils.ts:33` seeds the expected-set only `diagnosticsEnabled && label`), so `parseState(...).expected`
carries nothing — `parsethat-surface-gaps.mjs` rows exactly this as `DEBT-1 cand-F reject() label,
diagnostics OFF (shipping default)`. With diagnostics **on**, the labels appear *and* stderr starts
receiving them. **There is no configuration in which a consumer gets structured expectations without
also getting console writes.** That is precisely the "diagnostics are values, never effects"
prohibition, violated in both directions.

**Falsifier.** Exhibit a supported call path that yields a populated `state.expected` on a failed
parse without `isDiagnosticsEnabled()` being true. Reading `utils.ts:28-49`, the expected-set is
gated on `diagnosticsEnabled` at `:33` and `:38`; reading `parser.ts:63`, `errorState.expected` is
copied from `state.expected` and is therefore `undefined` in the default configuration. A path that
defeats both gates kills this finding.

**Severity note.** BLOCKER is assigned on the X·P axis, not on a shipping-outage axis: the default
configuration is silent, so no live consumer is currently printing. It is a blocker because
**R-LAW-3 is a Stage-3 gate W2 cannot pass while `parser.ts:67-69` is on the entry path**, and
Stage 3 runs on every survivor.

---

### C-B3 — BLOCKER — Process-global `PARSER_ID` and the per-instance `this.state` field are observable cross-parse state (O-8 breach, K-6 class).

**Claim, two coupled halves.**

*(a) `PARSER_ID`.* `parser.ts:18` `let PARSER_ID = 0;` and `parser.ts:25` `id: number = PARSER_ID++;`
mint every Parser's identity from a **process-global mutable counter**. That id is not decorative:
it is a direct input to the packrat memo key — `packrat.ts:99` `return parser.id * MEMO_OFFSET_SPAN
+ offset;` — and to the fail-loud budget check at `packrat.ts:90-98`, which throws a `RangeError`
once `parser.id > MEMO_MAX_ID` (≈2,097,151). Consequence: **a Parser's memo identity depends on how
many Parsers the process constructed before it**, i.e. on module evaluation order and on unrelated
consumers sharing the realm.

*(b) `this.state`.* `parser.ts:26` declares `state: ParserState<T> | undefined` as a **public mutable
field**, written on every parse at `:66` (error branch) and `:71` (success branch). Measured: it is
**read nowhere in the shipping library** — `grep -rn "\.state\b" src/ test/` filtered of
`ParserState`/`parseState` returns exactly one hit, `parser.ts:71`, the write itself. A grammar is
normally built once at module scope and reused; each such long-lived Parser therefore **retains the
last parse's `ParserState`, which holds `src` — the entire input string** (`state.ts:48`
`public src: string`) — for the process lifetime, for a field nothing consults.

**Consumption consequence.** W2 §3b **O-8 (the anti-latch construction rule)** is categorical:
*"No operator reads or writes process-global mutable state. Arming, memoization, and diagnostics are
parameters of a parse, never latches."* `PARSER_ID` is exactly such state, and it is *load-bearing*
(the memo key), not incidental. **K-6** kills "observable cross-parse state… or reset with residue";
`this.state` is residue by definition — parse #2 can observe parse #1's `src` and error view through
a public field. And `resetPackrat()` (`packrat.ts:262-272`) clears three Maps but touches neither
`PARSER_ID` nor any Parser's `.state`, so "reset with residue" is literal.

For the constellation this is also a *today* defect, not only an algebra one: a value.js grammar of
a few thousand parsers, reused across a page's worth of `parseCssColor` calls, pins one input string
per top-level parser forever. That is small per instance and unbounded in aggregate across
long-lived processes (the API server, `api/`).

**Falsifier.** (a) Show a read of `Parser.prototype.state` inside `src/` or `test/` — one exists at
`parser.ts:68` (`this.state.toString()`), *inside the C-B2 console branch*; if that branch is
removed per C-B2, the field has zero readers and the claim strengthens. (b) Show that `parser.id` is
not consulted outside packrat: `grep -n "\.id" src/parse/packrat.ts`, comment lines removed, gives
`:90`, `:95`, `:99`, `:316`, `:341`, `:342`, `:349`, `:350`, `:373`, `:382`, `:383`, `:403`, `:404`,
`:412` — **fourteen sites**. (c) Kill the retention claim by exhibiting a code path that nulls
`this.state`; none exists.

---

## 3. MAJOR

### C-M1 — MAJOR — `not()` publishes `Parser<string>` regardless of `T`. A type lie in the shipped `.d.ts`.

`dist/parser.d.ts:21`:

```ts
not<S extends T>(parser?: Parser<S | T>): Parser<string>;
```

Every other combinator threads `T` (`minus<S>(excluded): Parser<T>`, `peek(): Parser<T>`,
`skip<S>(…): Parser<T>`). `not()` does not. The cause is `parser.ts:299-302`: `new Parser(parser ?
not : negate, …)` is called **without an explicit type argument**, the union
`ParserFunction<T> | ParserFunction<…>` gives TS nothing to infer `T` from (see C-M6 — `ParserFunction`
discards its parameter entirely), so the class default `Parser<T = string>` (`parser.ts:24`) wins.

At runtime the value is `T`: the no-arg arm returns `state.ok(savedValue)` (`:260`) and the
two-arg arm restores `state.unsafeSetValue(value1)` (`:286`) — both `T`.

**Consumption consequence.** `numberParser.not(string("x"))` type-checks as `Parser<string>` and
delivers a `number`. Under `noUncheckedIndexedAccess` + strict tuples — the discipline
`parser-band.md:108` credits both band candidates with (*"fixed arity as `all()` typed tuples (zero
`!`)"*) — this silently poisons any downstream tuple the result lands in.

**Falsifier / honest mitigation.** Latent, not live: all in-code `.not()` receivers in the band are
already `Parser<string>` — `cand-b-dispatch/grammar.ts:89` (`identChar.not()`, `identChar` is a
`regex`) and `cand-s-spec/values-4.ts:31` (`.not(regex(...))`). Exhibit a non-string receiver in
consumer code and the finding escalates; keep the surface string-only and it stays latent. It does
**not** stop being a published contract defect: the `.d.ts` is the 1.0.0 promise.

### C-M2 — MAJOR — `trim(p, false)` and `wrap(a, b, false)` publish `Parser<T>` and return arrays.

`dist/parser.d.ts:41` `wrap<L, R>(start, end, discard?: boolean): Parser<T>;`
`dist/parser.d.ts:47` `trim<S>(parser?: Parser<S>, discard?: boolean): Parser<T>;`

Both bodies branch on `discard` and return a **different runtime shape**:

- `parser.ts:392-395` — `if (!discard) return all(start, this, end);` → an array, `[L, T, R]`.
- `parser.ts:484-486` — `if (!discard) return all(parser, this, parser) as unknown as Parser<T[]>;`
  → an array, `[S, T, S]`, cast through `unknown` to `Parser<T[]>`, which the emitter then collapses
  to `Parser<T>`.

Worse, the array's **length is not statically 3**: `all()`'s fused closures drop `undefined` values
and truncate — `leaf.ts:199`/`:207` `if (state.value !== undefined) out[w++] = state.value;` then
`leaf.ts:209` `if (w !== 2) out.length = w;` (and `:248`, `:270` for the other arities). A trim
separator that matches empty (`whitespace` = `regex(/\s*/)`, `leaf.ts:397`, whose empty-match branch
sets `undefined` at `leaf.ts:355`) yields a length-1 array. So the declared type is wrong about the
*kind* and the truthful array type would be wrong about the *arity*.

**Falsifier.** `numberParser.trim(string("|"), false).parse("|5|")` returns `["|", 5, "|"]` while
`tsc` reports `number`. Kill this by producing an overload or a cast in the source that narrows
`discard` — none exists; `parser.ts:392` and `:484` take `discard: boolean` with a `true` default.

**Honest mitigation.** Zero consumers today: `grep -rn "\.trim([^)]*,\|\.wrap([^)]*,[^)]*," src test
scripts <band>` returns **no hits**. Nobody passes `discard: false` anywhere in the constellation.
That is an argument for **retiring the parameter**, not for keeping a lie behind a door nobody opens.

### C-M3 — MAJOR — The whole flags/`call()` tier is unreachable, yet `flags` and `call` ship in the 1.0.0 public `.d.ts`; and `trim()` allocates a Parser it throws away on every call.

Three measurements, all mechanical:

1. **`FLAG_EOF` is never assigned.** `parser.ts:22` defines it; `parser.ts:466` reads it
   (`if (this.flags & FLAG_EOF)`). Full-tree grep for `.flags` assignments returns exactly one:
   `parser.ts:496` `flaggedParser.flags = this.flags | FLAG_TRIM_WS;`. So `parser.ts:466-476` — 11
   lines including the `trailing-content` suggestion and the `"<end of input>"` merge — is reachable
   **only** if a consumer hand-writes `p.flags = 2` against an undocumented, module-private constant.
2. **`flaggedParser` is constructed and discarded.** `parser.ts:492-496` builds it and sets its
   flags; `grep -n "flaggedParser" parser.ts` returns **only `:492` and `:496`**. The function
   returns a *different* Parser at `parser.ts:514-517`. The intervening comment (`:497` *"Also
   provide the inline version for direct `.parser()` callers"*) describes an intent the code does not
   execute — the "also" object is the one returned, and the flagged object is orphaned.
3. **`call()` therefore has no live caller.** Its only two call sites are `state.ts:93`
   (`ParserState.unsafeCall`, itself **zero call sites** across `src/` and `test/` — the only hit is
   its own definition) and `parser.ts:493`, inside the orphaned `flaggedParser`. `call()`
   (`parser.ts:437-478`, 42 lines) is dead in the shipping library.

**Consumption consequences.** (i) `dist/parser.d.ts:8` publishes `flags: number` and `:46` publishes
`call(state: ParserState<T>): ParserState<T>` — both are 1.0.0 contract surface that cannot be
removed without a major, for machinery the library never runs. (ii) The named flag values are
module-private (`parser.ts:20-22`), so a consumer can *see* `flags` in the type and cannot *use* it —
the worst of both: unremovable and unusable. (iii) **Every `.trim()` call allocates a wasted
Parser**, which bumps the global `PARSER_ID` (C-B3a) and therefore *shifts every subsequently
constructed parser's packrat memo key*. The band writes 95 `.trim(` sites; the ruled-winner
architecture (`parser-band.md`) is trim-heavy by design. Two ids consumed per trim, one discarded.

**Falsifier.** Produce any expression in `src/`, `test/`, `scripts/`, the band, or keyframes.js that
reaches `Parser.prototype.call` with `this.flags !== 0`, or that reads `flaggedParser`. Neither
exists.

### C-M4 — MAJOR — `recover()` pops the wrong diagnostic when `sync` nests a `recover`, and writes into a process-global buffer with no parse identity.

`parser.ts:653-688`. The sequence at `:666-677`:

```ts
collectDiagnostic(state as ParserState<unknown>, checkpoint);   // pushes D_outer
state.isError = false;
state.offset = checkpoint;
sync.parser(state as ParserState<unknown>);                     // arbitrary Parser
if (state.isError) {
    popLastDiagnostic();                                        // pops the LAST, not D_outer
    …
}
```

`sync` is typed `Parser<unknown>` — arbitrarily deep. If `sync`'s own subtree contains a `recover`
that *succeeded* (pushing `D_inner` at `parser.ts:666` and returning its sentinel at `:681`) while
`sync` as a whole still failed, then `popLastDiagnostic()` (`utils.ts:146-148`,
`collectedDiagnostics.pop()`) removes **`D_inner`** — a diagnostic that describes a genuine, cured
recovery — and leaves **`D_outer`** in the buffer even though the code's intent (`:664-665`, *"If
sync fails, pop the diagnostic back off"*) is the opposite. Net: one real diagnostic lost, one
spurious diagnostic retained, and the error still propagates.

Compounding it, the buffer is a **module global**: `utils.ts:95` `let collectedDiagnostics:
Diagnostic[] = [];`. It has no parse identity, no source field, and no automatic reset —
`clearCollectedDiagnostics()` (`utils.ts:142-144`) is manual. Two interleaved parses (the exact
scenario `parser.ts:35-42` builds the packrat epoch machinery to make sound) merge their diagnostics
into one undifferentiated array, and a consumer that forgets to clear grows it without bound. Note
the asymmetry the module itself documents: `utils.ts:20-26` explains at length that furthest-offset
tracking was moved **off** module globals onto `ParserState` "so a nested `.parse()` mid-rule…
cannot corrupt the outer parse's error tracking" — and then `recover()` routes the *collected*
diagnostics straight back into a module global.

**Consumption consequence.** `recover` is the only operator in this module that maps to W2's
recovery family, and W2 §3b makes recovery **first-class algebra operations, never backend
behavior** with **R-LAW-4 (non-amplification): "`N` malformed sites yield exactly `N` diagnostics"**.
A pop that can remove the wrong element is a direct R-LAW-4 falsification, and a global buffer is a
direct O-8 falsification.

**Falsifier.** Build `outer = A.recover(sync = B.recover(C, s1).skip(D), s2)` where `B` fails, `C`
succeeds (pushing `D_inner`), and `D` fails so `sync` fails overall; then read
`getCollectedDiagnostics()`. If the array holds `D_outer` and not `D_inner`, confirmed. Kill it by
showing `collectDiagnostic` cannot be re-entered from within a `sync` subtree — nothing in the
signature (`sync: Parser<unknown>`) or the body prevents it.

### C-M5 — MAJOR — Six of 24 public methods have zero call sites in the shipping library, and the dead-surface gate is a hardcoded two-name ban list that cannot find them.

Census, by direct grep over `typescript/src` (excluding `parser.ts` itself), `typescript/test`,
`typescript/scripts`, the four band candidate trees, value.js `src/`, and keyframes.js `src/`:

| method | pt `src` | pt `test` | pt `scripts` | band | verdict |
|---|---|---|---|---|---|
| `mapState` | 0 | 0 | 0 | 0 | **dead** |
| `minus` | 0 | 0 | 0 | 0 | **dead** |
| `peek` | 0 | 0 | 0 | 0 | **dead** |
| `lookAhead` | 0 | 0 | 0 | 0 | **dead** |
| `debug` | 0 | 0 | 0 | 0 | **dead** |
| `call` | 0 (see C-M3) | 0 | 0 | 0 | **dead** |
| `recover` | 0 | 0 | 0 | 1 (`idiom/example.ts:244`) | near-dead |
| `not` | 0 | 0 | 0 | 2 | **untested** |
| `chain` | 0 | 8 | 0 | 5 | live |

Across the *entire* parse-that repository (`typescript/**` + `docs/**`, node_modules excluded),
`.minus(`, `.peek(`, `.lookAhead(` appear in exactly **one non-code file** —
`docs/playground/combinators.md` — and `.mapState(` and `.debug(` appear **nowhere at all**.
`README.md` mentions `mapState`, `minus`, `peek`, `lookAhead` **zero** times each. So five public
methods are: undocumented in the README, untested, unexercised, and shipped in the 1.0.0 `.d.ts`
(`dist/parser.d.ts:17` `mapState`, `:26` `minus`, `:33` `peek`, `:40` `lookAhead`, `:65` `debug`).

**The gate cannot see this.** `scripts/proof-no-dead-combinator.mjs` states parse-that's own precept
in its header — *"an export born one prior tranche with zero workspace consumers is dead by the
precept"* — and then implements it as a literal two-element array (`:29-32`):
`banned = [{ name: "thenMap", … }, { name: "fuse", … }]`. It greps for *those two names*. It has a
vacuity guard (`:51-59`, checks `dispatch` still exists) but **no enumeration step**: it never walks
the exported surface and asks which members have zero consumers. A gate that can only find defects
it was told about by name is a regression test, not a precept enforcer — and the precept it quotes
condemns five methods it structurally cannot reach.

**Consumption consequence.** `not`/`minus`/`peek`/`lookAhead` are exactly the negative-and-lookahead
family a CSS token-boundary grammar needs (band `cand-b-dispatch/grammar.ts:86-89` builds
`bounded()` from `.not()` precisely to stop `120deg50%` mis-tokenising). Shipping them **untested**
means the X·P wave's Stage-2 bijection screen would be registering operators whose only executable
evidence is the candidate's own new tests — a self-authored answer key, which W2's PRUNE list
forbids.

**Falsifier.** Exhibit a call site for any of the six in `typescript/src`, `typescript/test`,
`typescript/scripts`, the band, value.js, or keyframes.js. I found none; a counter-example on any
one row demotes that row, not the finding.

### C-M6 — MAJOR — `ParserFunction<T>` discards its own type parameter, so ~15 casts in this file are no-ops and the exported type is uninhabited-by-`T`.

`parser.ts:13-16` (verbatim, published at `dist/parser.d.ts:2`):

```ts
export type ParserFunction<T = string> = (
    val: ParserState<any>,
) => ParserState<any>;
```

`T` is declared and never referenced. Consequences:

- Every `as ParserFunction<X>` in this module — `:100`, `:119`, `:141`, `:157`, `:184`, `:207`,
  `:229`, `:246`, `:328`, `:354`, `:388`, `:428`, `:493`, `:515`, `:560`, `:633`, `:685` — is a cast
  to the same structural type. They convey intent to a reader and **nothing to the compiler**.
- It is the mechanism behind C-M1: because `ParserFunction<A>` and `ParserFunction<B>` are the same
  type, `new Parser(fn)` has no inference source and falls to `Parser<string>`.
- It is public in **both** `.` (`index.ts:2`) and `./core` (`core.ts:7`). A consumer writing
  `const f: ParserFunction<number> = (s: ParserState<string>) => s;` compiles clean.

**Falsifier.** Show a position where `ParserFunction<A>` is not assignable to `ParserFunction<B>`.
Structurally identical types are mutually assignable; the `any` in both positions removes even
variance as a differentiator. The `eslint-disable` comment at `parser.ts:13` calls the `any`
*"required for variance"* — but with `T` unused there is no variance to preserve.

### C-M7 — MAJOR — `not()` and `minus()` fail without a label, so the two combinators a CSS boundary grammar most needs contribute nothing to the error message (DEBT-1).

The failure arms carry **no `mergeErrorState` call with a label**:

- `parser.ts:261-265` (`negate`, the no-arg arm): self succeeded ⇒ `state.offset = savedOffset;
  state.isError = true; return state;` — no merge, no label.
- `parser.ts:315-319` (`minus`): excluded matched ⇒ `state.offset = savedOffset; state.isError =
  true; return state;` — no merge, no label.

Contrast with the disciplined siblings, which all merge before backtracking: `then` `:93`, `skip`
`:201`, `next` `:223`, `opt` `:239`, `wrap` `:410`/`:418`, `many` `:553`, `sepBy` `:626`.

**Consumption consequence.** `parser-band.md`'s **binding debt 1** is *"labelled zero-width failures
over opaque `(?!)`"*, and W2 §3 folds it as a **contract clause, not advice**. A boundary rejection
built as `parser.skip(identChar.not())` (band `cand-b-dispatch/grammar.ts:89`) therefore fails with
the *inner* parser's expectation set unchanged and no statement that a boundary was required. The
consumer's `ParseIssue.expected` (value.js `src/css/types.ts:21`, `readonly string[]`) has nothing to
carry.

**Falsifier.** `enableDiagnostics(); string("a").skip(regex(/[a-z]/).not()).parseState("ab")` and
inspect `.expected` — I did **not** run this (arming is out of bounds for this seat), so the claim
stands on the static fact that `:261-265` and `:315-319` contain no `mergeErrorState` call. Exhibit
one and the finding dies.

### C-M8 — MAJOR — `parse()` returns `undefined` on failure and cannot express value.js's `ParseResult` failure arm (PT-07).

`parser.ts:77-79`:

```ts
parse(val: string) {
    return this.parseState(val).value;
}
```

`undefined` is a *legitimate success value* in three places in this very module and its imports:
`opt()` returns `state.ok(undefined)` on the absent branch (`parser.ts:241`); `eof()` returns
`state.ok(undefined)` on success (`leaf.ts:14`); `regex()` returns `state.ok(undefined)` on an empty
match (`leaf.ts:342`, `:355`). So `parse()` conflates *failed*, *matched-nothing*, and
*matched-optional-absent* into one indistinguishable value. `parsethat-surface-gaps.mjs` rows it:
`GUARD .parse() failure signal — returns undefined — indistinguishable from .opt()`, and O-15 PT-07
says the same.

**Consumption consequence, sharpened.** value.js's frozen contract at `src/css/types.ts:26-28`
requires the failure arm to be `{ ok: false; diagnostics: readonly [ParseIssue, ...ParseIssue[]] }`
— a **non-empty tuple**. `parse()` returns neither an ok-flag nor a diagnostic; it cannot produce
that shape, and the diagnostics it would need are either absent (diagnostics off, C-B2) or delivered
to stderr. This is why `parser-band.md:108` records that *both* ruled band candidates enter via
"`parseState` + `isError`, **never `parse()` truthiness**" — the ergonomic front door of the library
is the one the adjudicated architecture forbids. Census confirms it: **72 `.parseState(` vs 33
`.parse(` in the band tree**, and the `.parse(` hits include `JSON.parse`.

**Falsifier.** Show a return value of `parse()` that distinguishes failure from a successful
`undefined`. `parseStateInner` returns the same `state` object in both branches (`parser.ts:74`); the
only discriminator is `state.isError`, which `parse()` discards by projecting `.value`.

### C-M9 — MAJOR — `parseState(val: string)` has no runtime boundary guard; non-string input dies as a raw `TypeError` from inside a leaf (PT-07).

`parser.ts:34` / `:52`: `parseState(val: string)` → `new ParserState(val)`. `ParserState`'s
constructor (`state.ts:47-53`) stores `src` unvalidated. The first leaf to touch it throws from
library internals — e.g. `leaf.ts:285` `state.src.charCodeAt(state.offset)` or `leaf.ts:297`
`state.src.startsWith(str, state.offset)`. `parsethat-surface-gaps.mjs` measures **5/5 non-string
inputs throw a raw `TypeError`**, and O-15 PT-07 reports the same.

**Consumption consequence.** value.js's stated cure (O-15) is *"a named JS-boundary invariant
**above** parse-that, not a request to them"* — i.e. **the consumer pays for the guard at every one
of the 19 runtime entry points** (`src/css/index.ts:36-60`). W2 §3 clause 3 folds it as a contract
clause: *"non-string inputs die at a named JS-boundary invariant above the algebra (PT-07)"*. That is
a defensible division of labour, and it is worth naming that this module *chose* it by omission
rather than by declaration: there is no documented precondition on `parseState` in the source, the
`.d.ts`, or the README.

**Falsifier.** Find a guard. `parser.ts:34-49`, `:51-75` and `state.ts:47-53` contain no `typeof`
check, no `throw`, no coercion.

### C-M10 — MAJOR — `parseState()` returns a state whose `toString()` renders at the wrong offset; the correctly-positioned view is a *different object* on a public field.

`parser.ts:55-74`. On error the module builds `errorState` positioned at the **furthest** offset
(`:60-65`), assigns it to `this.state` (`:66`) — and then **returns `state`** (`:74`), the working
state, positioned wherever the last combinator left it.

`ParserState.toString()` (`state.ts:136-138`) delegates to `statePrint`, which renders from
`state.offset`: `debug.ts:161` `const offsetPart = … String(state.offset)` and `debug.ts:168`
`addCursor(state, cursor, isError)` → `state.getLineAndColumn()` (`state.ts:127`, defaulting to
`this.offset`). It never consults `furthest`.

So the natural consumer idiom —

```ts
const s = p.parseState(input);
if (s.isError) console.log(s.toString());   // renders at the WRONG position
```

— points the `^^^` cursor at a backtracked offset, while the correct render is only reachable as
`p.state.toString()`, i.e. through the public mutable field this audit condemns in C-B3b. The two
objects also diverge in content: `errorState.value` is `undefined` by construction (`:61`,
`new ParserState(val, undefined, furthest, true)`) whereas the returned `state` keeps whatever value
the last arm produced.

**Falsifier.** Show `statePrint` consulting `furthest`. `grep -n "furthest" src/parse/debug.ts`
returns exactly two hits — `:202` and `:207` — and **both are in the collected-*Diagnostic* printer**,
reading `d.furthestOffset` off a `Diagnostic` record (`utils.ts:84-93`), not off the state.
`statePrint` (`debug.ts:141-190`) never touches it. `furthest` is otherwise read only in
`utils.ts:29`, `:36`, `:104` and `parser.ts:60`.

### C-M11 — MAJOR — `Parser.lazy` is arity-1 with no depth bound; recursion is bounded by the JS stack, not by construction (PT-04, debt 3).

`parser.ts:702-707` — `static lazy<T>(fn: () => Parser<T>)`, delegating to `createLazyCached`
(`lazy.ts:19-25`), which caches the constructed Parser in a closure and calls `cached.parser(state)`.
No depth counter, no budget parameter, no failure mode other than the host stack.

Measured by `parsethat-surface-gaps.mjs` (rows `DEBT-3`): deepest OK **7,761**, **thrown `RangeError`
at 7,762**, `Parser.lazy.length` = 1. O-15 **PT-04** reports the same numbers.

**Consumption consequence.** W2 §3 clause 3 folds debt 3 as a contract clause: *"recursion bounded
**by construction**, any shield proven non-load-bearing (debt 3; PT-04)"*, and **K-7** kills any
candidate with unbounded recursion — with the explicit note (W2 §3e, `:738-739`) that *"an entry
wrapper returning `ok:false` for an internal throw still fails K-7's shield proof — the
raw-`parseState` instrument runs beneath the wrapper."* So a consumer **cannot** cure this from
above: wrapping `parseState` in try/catch is exactly the shield K-7 rejects. The band's ruled winner
paid for it in the only currency available — `parser-band.md:111`: cand-O's *"one recursion buys the
`var()`/relative scope and costs a ~2,500-frame stack ceiling, guarded and pinned by test."*

**Falsifier.** Show a depth parameter or a bound in `parser.ts:702-707` or `lazy.ts:19-25`. There is
none. Alternatively show that the ceiling is host-independent — it is not (`RangeError` at 7,762 is
one machine's V8 stack, N=1, which is why the number is cited as a *class* not a *constant*).

---

## 4. MINOR

### C-m1 — MINOR — `map(fn, true)` converts an error into a success.

`parser.ts:146-154`: `if (!state.isError || mapError) { return state.ok(fn(state.value as T)); }`.
`ParserState.ok` (`state.ts:55-60`) sets `this.isError = false`. So the second parameter — named
`mapError`, documented nowhere, published at `dist/parser.d.ts:16` as `mapError?: boolean` — does
not "also map on error"; it **erases the error**, unconditionally, and feeds `fn` a value that may be
the failed state's stale residue. Zero consumers pass it (census: no 2-argument `.map(` anywhere in
`src/`, `test/`, or the band that isn't a destructuring callback). *Falsifier*: show a call site, or
show `ok()` preserving `isError`.

### C-m2 — MINOR — `eof()` overwrites the `skip` context, so graph walkers lose the child parser.

`parser.ts:638-642` builds `this.skip(eof())` and then **replaces** the returned parser's context
with `createParserContext("eof", this)`, discarding the `skip` context that held the `eof()` leaf in
`args` (`:208`). The resulting node claims `name: "eof"` while its `.parser` closure is `skip`'s, and
its `args` no longer name the leaf. `parser-band.md:17` credits the band with *"idiom measured
structurally by walking the built combinator graph … a grep cannot prove that, the graph can"* — this
node lies to that walker. *Falsifier*: show the discarded `skip` context reachable from the returned
parser; `:640` assigns over `p.context` outright.

### C-m3 — MINOR — `peek()` writes `state.value` directly, bypassing the declared choke point.

`parser.ts:350` `state.value = value;`. `state.ts:86-89` declares `unsafeSetValue` *"single choke
point for the mutable-state cast pattern"* and every other combinator in this file uses it
(`:286`, `:383`, `:424`, `:555`, `:628`). One-line inconsistency in a method with zero consumers
(C-M5). *Falsifier*: none needed — the two lines are adjacent facts.

### C-m4 — MINOR — Dead `ExtractValue` type declaration.

`parser.ts:9-11` declares `ExtractValue<T>`; it is referenced nowhere in `parser.ts`. `leaf.ts:155-157`
declares its own copy locally. *Falsifier*: `grep -n "ExtractValue" src/parse/parser.ts` → `:9` only.

### C-m5 — MINOR — `"sideEffects": false` is gated GREEN while `parser.ts:711` is a top-level side effect.

`test/manifest-gate.mjs:38-41` fails the build unless `pkg.sideEffects === false`, with the rationale
*"unlocks tree-shaking downstream"*. `parser.ts:711` is a bare top-level call, `_initWhitespace();`,
whose entire purpose is to mutate `leaf.ts`'s `export let whitespace` (`leaf.ts:395-399`) — surviving
into the artifact at `dist/packrat-entry-CS1td-8B.js:1416`. `dist/leaf.d.ts:29` declares
`export declare let whitespace: ReturnType<typeof regex>` — i.e. **never `undefined`** — a claim that
holds only because the initializer runs.

*Honest bound.* Rollup-family bundlers track the assignment to a retained `whitespace` binding and
keep the call, and today's single-chunk dist means module-granular elimination cannot fire either. So
this is a **latent** contradiction, not a live breakage. It is filed because the gate asserts the flag
as a virtue without any companion assertion that the package is in fact effect-free. *Falsifier*:
bundle `import { whitespace } from "@mkbabb/parse-that/core"` under a `sideEffects`-honouring bundler
with module-granular elimination and observe `whitespace !== undefined`.

### C-m6 — MINOR — `many()` and `sepBy()` diverge on zero-width elements, undocumented.

`many()` treats a zero-width match as a **clean stop with the matches so far** (`parser.ts:538`
`if (state.offset === savedOffset) break;` — the zero-width value is *not* pushed, `isError` stays
false). `sepBy()` treats a zero-width element after a separator as a **failure that backtracks past
the separator** (`parser.ts:605` `if (state.isError || state.offset === savedOffset)` → restore to
`cpBeforeSep`). Neither doc comment mentions zero-width. A consumer composing an empty-capable
terminal (`regex(/\s*/)`, `regex(/[0-9]*/)`) gets different truncation semantics from two combinators
presented as siblings. *Falsifier*: show the policy documented in the source, the `.d.ts`, or the
README — it is not.

---

## 5. INFO

### C-i1 — INFO — The root `.` barrel is a superset of all four subpaths, so the zone map is defeated before C-B1 even applies.

`src/parse/index.ts:2-13` re-exports every tier including `memoize`/`mergeMemos`/`resetPackrat`
(`:8`) and `export * from "./parsers/index.js"` (`:13`, json+csv). `mergeErrorState` is exported from
both `.` (`:4`) and `./diagnostics` (`diagnostics.ts:6`) — duplicate surface with no canonical home.
Every band prototype imports from the bare specifier, not a subpath
(`import { Parser, all, any, dispatch, mergeErrorState, regex, string } from "@mkbabb/parse-that"`).
So even a perfectly partitioned build would be bypassed by the idiom the only consumer actually
writes. Filed as INFO because it is a barrel-design choice, not a defect in `parser.ts` — but any
X·P footprint claim that cites `/core` must first show the consumer imports from `/core`.

---

## 6. SUPERLATIVES (L-18, with falsifiers)

### S-1 — The packrat epoch is opened at the *one* correct boundary, and `finally`-guaranteed.

`parser.ts:34-49`. `parseState` wraps `parseStateInner` in `try { … } finally { packratExit(epoch); }`.
Re-entrancy — a `.map` callback that re-parses a different source mid-grow — is the failure mode that
broke 0.12.0 (`packrat.ts:158-181` records it: the per-node reset *"wiped the outer grow's
in-progress cells → `growLR` non-null-asserted a just-deleted cell → `TypeError`"*). The cure is six
lines at the entry boundary rather than a guard smeared through the memo path, and the `finally`
makes it hold across a throwing user callback. `scripts/proof-packrat-reentrant.mjs` is wired into
`proof:all`. **This is the best-placed decision in the module.**
*Falsifier*: construct a nested top-level parse that leaves the parent's `MEMO`/`HEADS`/`GROWING`
altered after return. `packratEnter` (`packrat.ts:216-231`) snapshots all five globals and installs
fresh Maps; `packratExit` (`:243-250`) restores all five. A leak would have to escape the `finally`.

### S-2 — `sepBy()` refuses trailing separators by construction, and says so.

`parser.ts:565-568` states the policy (*"Never accepts a trailing separator — trailing sep acceptance
is a grammar concern"*) and `:594-611` implements it with a checkpoint taken **before** the separator
(`cpBeforeSep`) and restored when the following element fails. For a CSS consumer this is exactly
right: `rgb(1,2,3,)` must not silently parse, and the module refuses to make that a per-call flag.
*Falsifier*: delete the `state.offset = cpBeforeSep` restore at `:608` and `"a,b,"` parses as
`["a","b"]` with the offset past the comma — i.e. the line is load-bearing, not decorative.

### S-3 — Backtracking preserves the furthest-offset record instead of resetting it.

Every backtracking arm calls `mergeErrorState` **before** restoring the offset — `then` `:93-94`,
`skip` `:201-202`, `next` `:223-224`, `opt` `:239-240`, `not` `:258-259`, `wrap` `:410-411`/`:418-420`,
`many` `:553`, `sepBy` `:626`. Combined with `utils.ts:28-49`'s strict-greater/equal discipline, a
failure deep inside an abandoned alternative still sets the reported position. That is the single
most consumer-visible quality difference between combinator libraries, and it is done uniformly.
(C-M7 is the *exception* that proves the rule: `not`'s success-arm and `minus` are the only two arms
that skip it.)
*Falsifier*: no-op every `mergeErrorState` call in `parser.ts` and run
`all(string("ab").opt(), string("z")).parseState("ax")` — the report collapses from offset 1 to
offset 0.

### S-4 — `chain()` carries its own breaking-change provenance in-source.

`parser.ts:124-144`. The comment records the defect (`state.value || chainError` dropped falsy-but-valid
seeds `0`/`''`/`false`), the option chosen (C-16 Option A), the **zero-caller scan** that justified
removing `chainError`, and the semver consequence (*"removed in the 1.0.0 breaking cut"*). A consumer
reading the source learns why the signature changed and what to migrate. This is the provenance
discipline the epoch rule wants, applied without being asked.
*Falsifier*: check the claim against the artifact — `dist/parser.d.ts:15` publishes
`chain<S>(fn: (value: T) => Parser<S | T>): Parser<S>`, one parameter. The comment is true.

---

## 7. What X·P's dual-target algebra would KEEP, WRAP, or RETIRE in this module

Mapped against W2 §3b (state `(V,C,P,D)`, COMP-1, O-8, R-LAW-1..5), §3c (AC-1..AC-4), and §3e
(K-1..K-10). "WRAP" means: expressible as an algebra operator, but only behind a re-shaped signature
or a purity fix — the operator survives, this *method* does not.

| # | member | `parser.ts` | disposition | binding reason |
|---|---|---|---|---|
| 1 | `then` | :81-103 | **KEEP** | the `sequence` capability family, verbatim. Backtracks and merges (S-3). |
| 2 | `or` | :105-122 | **KEEP** | `ordered committed choice`. Note R-LAW-5: the contract must declare the `alt`/`recover` interaction *around* it. |
| 3 | `map` | :146-160 | **WRAP** | `value construction with provenance append` — but the `mapError` parameter is retired (C-m1: it erases errors, K-8 class). |
| 4 | `chain` | :124-144 | **KEEP** | value-dependent continuation; `parser-band.md:108` records it as live band idiom over precomputed tables. |
| 5 | `skip` / `next` | :189-232 | **KEEP** | sequence with positional discard. |
| 6 | `opt` | :234-249 | **KEEP** | the band's idiom law (`.opt()` only behind `.then()`/`.next()`, never inside `all()`) is a *grammar* rule, not an operator defect. |
| 7 | `many` / `sepBy` | :523-636 | **KEEP**, with a declared zero-width policy | the `bounded back-edge` family. C-m6 must become a stated law, not an accident. |
| 8 | `wrap` | :392-431 | **WRAP** | keep the `discard: true` path (it carries `reportUnclosedDelimiter` at `:419` — real diagnostic value); **retire the `discard: false` overload** (C-M2 type lie, zero consumers). |
| 9 | `trim` | :480-521 | **WRAP** | same: keep whitespace-trim, retire `discard: false` (C-M2) **and** the orphaned `flaggedParser` (C-M3). |
| 10 | `not` / `minus` | :251-331 | **WRAP** | the `labelled zero-width failure` family — but they must acquire labels (C-M7 / debt 1) and `not()` must stop publishing `Parser<string>` (C-M1). Also split: `not()` is two operators selected by arity. |
| 11 | `peek` / `lookAhead` | :339-390 | **WRAP** | genuinely part of the capability set; today zero-consumer and untested (C-M5), so they enter the algebra as *specified* operators, never as *inherited* ones. |
| 12 | `eof` | :638-642 | **WRAP** | keep the operator, fix the context clobber (C-m2) so the Stage-2 bijection walk can register it. |
| 13 | `recover` | :653-688 | **WRAP — heavily** | W2 makes recovery **first-class algebra operations, never backend behavior**. The operator survives; its implementation does not: the process-global buffer and the wrong-element `pop` (C-M4) fail O-8 and R-LAW-4. `D` must be a per-parse append-only journal. |
| 14 | `Parser.lazy` | :702-707 | **WRAP** | the back-edge must take a **depth bound as an algebra parameter** (W2 §3b; PT-04; K-7). Arity 1 is the defect, not laziness. |
| 15 | `parseState` | :34-49 | **WRAP** | keep as the entry; **the `console.error` at :67-69 must go** (C-B2 / R-LAW-3) and the boundary guard must be named above it (C-M9 / PT-07). |
| 16 | `parse` | :77-79 | **RETIRE** | cannot express `ParseResult`'s non-empty-diagnostics failure arm (C-M8). The band already routes around it. |
| 17 | `mapState` | :162-187 | **RETIRE** | zero consumers everywhere (C-M5); hands the consumer a raw mutable `ParserState` and an `Object.create` prototype view (`:177-179`) — the anti-thesis of a closed operator set over `(V,C,P,D)`. |
| 18 | `call` + `flags` + `FLAG_*` | :20-22, :27, :437-478, :492-496 | **RETIRE** | unreachable (C-M3). `FLAG_EOF` is read and never written. K-6 also bites: `flags` is per-instance mutable state a consumer can set from outside. |
| 19 | `debug` | :690-696 | **RETIRE** | zero consumers; default `logger = console.log` is an effect (R-LAW-3); drags ~9,354 bytes of ANSI printer into the `/core` graph (C-B1). |
| 20 | `toString` | :698-700 | **RETIRE from the operator set** | presentation, not algebra. W2 EQ-4 rules rendered strings **non-normative** explicitly (*"byte-equal rendered messages across a JS and a Wasm backend is a trap"*). Diagnostics compare structurally; the printer lives outside. |
| 21 | `this.state` | :26, :66, :71 | **RETIRE** | K-6 residue, zero readers (C-B3b). |
| 22 | `PARSER_ID` / `id` | :18, :25 | **RETIRE / re-found** | O-8: no process-global mutable state. Identity must be a parse parameter or a construction-scoped counter, because it *is* the memo key (`packrat.ts:99`). |
| 23 | `ParserFunction<T>` | :13-16 | **RETIRE as published** | the parameter is a lie (C-M6); AC-1's *typed signature* premise needs a real one. |
| 24 | `ExtractValue` | :9-11 | **RETIRE** | dead (C-m4). |

**Candidate-by-candidate read.**

- **AC-1 TAGLESS-TWIN** is the candidate this module *hurts most*, because its JS lowering
  "instantiates the signature with the combinator library's own constructors" — i.e. it inherits
  `parseState` whole, and with it C-B2 (R-LAW-3, unpassable), C-B3 (O-8), and the 45 KB of C-B1. Its
  own predicted failure (b), *megamorphic IC collapse*, is made worse by C-M3: `.trim()` mints two
  closure shapes per site across 95 band sites.
- **AC-2 CLOSED-IR** is the least exposed: an init-time compiler emits a combinator graph, so it may
  select a subset of the surface and simply never emit `mapState`/`call`/`debug`. Its risk from this
  module is C-M6 — a `ParserFunction` that discards `T` gives the IR→combinator compiler no type
  channel to check its own totality against.
- **AC-3 SPAN-ALGEBRA** is the only candidate licensed to touch `typescript/src/**` (W2 §4, branch
  `w2/ac3-scan-union`). C-B3a is a direct hazard for it: a scan layer that constructs parsers at scan
  time perturbs `PARSER_ID` and therefore memo keys. Its own predicted failure (d), *arena latch*, is
  the same class as `PACKRAT_ARMED` and `this.state`.
- **AC-4 SIBLINGS-ORACLE** inherits this module as-is on the TypeScript side (cand-O's four files sit
  on top of `Parser`), so it inherits **every finding above** without a compiler to filter them. Its
  predicted failure (c) — *the one-algebra claim thins* — is sharpened here: the channel table cannot
  be the load-bearing carrier while `not()`/`minus()` fail label-free (C-M7) and `recover()`'s
  diagnostics live in a module global (C-M4), because those are semantic decisions **not expressible
  as table rows**. Under AC-4's own Stage-0 falsifier that is a kill.
- **NC-1 WASM-PRIMARY** is unaffected (pre-killed by citation).

**Where the RED-7 surface-gap rows land in this module.** Of the eight rows
`docs/tranches/V/megatranche/prototypes/css-parser/parsethat-surface-gaps.mjs` prints, **six touch
`parser.ts` directly**:

| gap row | `parser.ts` site | finding |
|---|---|---|
| `DEBT-1 cand-F reject() label, diagnostics OFF` | `:63` (`errorState.expected = state.expected`, `undefined` by default) | C-B2 |
| `DEBT-1 Parser.prototype.label / .expected combinator — absent` | the 24-method surface, `:24-708` | C-M7 |
| `DEBT-3 Parser.lazy ceiling` | `:702-707` | C-M11 |
| `DEBT-3 Parser.lazy depth-bound parameter — arity 1` | `:702` | C-M11 |
| `LATCH resetPackrat() disarms? no` | `:43-48` (the call site that pays the armed cost on every parse) | C-B1 / C-B3 |
| `GUARD parseState(non-string) totality — 5/5 raw TypeError` | `:34`, `:52` | C-M9 |
| `GUARD .parse() failure signal — undefined` | `:77-79` | C-M8 |

(The eighth, `DEBT-1 enableDiagnostics() is process-global (arity)`, lives in `utils.ts:8` — but
`parser.ts:67` is its only consumer inside this module, which is what makes C-B2 unavoidable.)

---

## 8. Overlap and contradiction ledger (corpus discipline)

**Folded, cited, not re-derived** (epoch rule): O-15 **PT-01** (label/diagnostics coupling) → C-B2;
**PT-03** (`PACKRAT_ARMED` one-way, 93.9→138.2 ns = 1.47×, `resetPackrat()` leaves 139.3) → C-B1,
C-B3, cited *by number only*, un-remeasured, and never re-armed in this seat; **PT-04** (lazy depth
7,761 / `RangeError` at 7,762) → C-M11; **PT-07** (5/5 non-string `TypeError`; `.parse()` failure
indistinguishable) → C-M8, C-M9. W2 §3b **O-8** → C-B3; **R-LAW-3** → C-B2; **R-LAW-4** → C-M4;
**EQ-4** (structural, not rendered) → §7 row 20; **K-6/K-7/K-8** → C-B3, C-M11, C-B2. W2 §3c
predicted failure modes → §7 candidate read. `parser-band.md`: the five binding debts (debt 1 →
C-M7, debt 3 → C-M11), the `parseState`-not-`parse()` idiom (`:108`) → C-M8, the graph-walking idiom
measurement (`:17`) → C-m2, cand-O's ~2,500-frame ceiling (`:111`) → C-M11.

**Contradicted explicitly** (the tree disagrees with a written claim):

1. **CHANGELOG 1.0.0, r6 #6** — *"the subpath export map … IS the zone map"*. Falsified by
   `dist/core.js:1` → `dist/packrat-entry-CS1td-8B.js:1` → `dist/diagnostics-DDazRHgl.js`. See C-B1.
2. **`src/parse/core.ts:1-6`** — *"A consumer that imports only this never pulls the diagnostics
   accumulator, the packrat tier"*. Same falsification.
3. **`scripts/proof-no-dead-combinator.mjs` header** — states the precept *"an export born one prior
   tranche with zero workspace consumers is dead"*, then implements a two-name list. Five methods
   satisfy the precept's condition and are invisible to the gate. See C-M5.
4. **`parser.ts:497`** — *"Also provide the inline version for direct `.parser()` callers"*. The
   flagged version is the one discarded; the "also" version is the only one returned. See C-M3.
5. **`parser.ts:13`** — the `eslint-disable` justification *"`any` required for variance"*. With `T`
   unreferenced there is no variance to preserve. See C-M6.
6. **The commission's `value.js src/parsing/`** — does not exist; the consume edges are `src/css/**`.
   See §0.

**Not claimed** (guarding against over-reach): no performance number is asserted anywhere in this
file that was not already measured by O-15 or `parser-band.md`; the byte counts in C-B1 are `stat`
of already-built files, not a bench. The 1.47× latch cost is cited as O-15's N=1 measurement, with
its own honest bound, and is *not* re-stated as a bar — OC-1 remains owner-held and
**BAR: OWNER-GATED-PENDING-RATIFICATION** applies.

---

## 9. Tally

| severity | count | ids |
|---|---|---|
| BLOCKER | 3 | C-B1, C-B2, C-B3 |
| MAJOR | 11 | C-M1 … C-M11 |
| MINOR | 6 | C-m1 … C-m6 |
| INFO | 1 | C-i1 |
| **defects total** | **21** | |
| **superlatives** | **4** | S-1 … S-4 |

**Verdict on the axis.** The module is **DEFECTIVE on CONSUMPTION**, and the defect is structural
rather than incidental: `parser.ts` is written as the private core of a library and *published* as
the public contract of a 1.0.0 package. Six of twenty-four methods have no consumer, two publish
types their bodies contradict, one whole tier (`flags`/`call`) is unreachable, the entry point emits
to stderr, identity comes from a process-global counter, and the subpath map that was ruled to make
partitioning unnecessary does not partition. The saving grace is real and worth protecting: the
backtracking/error-position discipline (S-3), the re-entrancy boundary (S-1), the trailing-separator
refusal (S-2), and the in-source provenance habit (S-4) are all better than the field. **X·P should
inherit those four and re-found the surface around them — not adopt the surface and hope the gates
grow.**
