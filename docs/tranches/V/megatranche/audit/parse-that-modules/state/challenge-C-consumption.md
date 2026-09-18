claude-opus-5[1m]

# CHALLENGE — `typescript/src/parse/state.ts` · axis C (CONSUMPTION)

**Subject**: `/Users/mkbabb/Programming/parse-that/typescript/src/parse/state.ts`, 189 lines, at
master `ef10d5b` (read-only evidence; branch `master`, no writes made).
**Posture**: the module is assumed DEFECTIVE until the tree proves otherwise. Every claim below
carries severity + `file:line` provenance + the falsifier that would kill it. Superlatives carry
the same burden (L-18 runs both ways).
**Law compliance**: `/Users/mkbabb/Programming/parse-that-css-totality-p2` does **not** exist
(`ls` → `No such file or directory`, verified at open) and was not created. No writes to
`/Users/mkbabb/Programming/parse-that/**`. No worktrees, no frozen roots, no `~/Documents/Codex`.
No browser tooling. No bench armed diagnostics or packrat: the two runtime probes below call only
`ParserState.toString()` and the three line/column getters, which **read** `isDiagnosticsEnabled()`
and never call `enableDiagnostics()` or `memoize()` — the one-way latch (`PACKRAT_ARMED`) is
untouched.

---

## 0. The surface, exactly

`state.ts` exports **9 symbols** — 5 runtime, 4 type:

| symbol | line | runtime/type | on `.` | on `/core` | in-tree consumers |
|---|---|---|---|---|---|
| `Span` | `state.ts:8` | type | yes (`index.ts:4`) | yes (`core.ts:14`) | **0** (2 dead imports, §C-3) |
| `spanToString` | `state.ts:13` | runtime | yes (`index.ts:3`) | yes (`core.ts:11`) | **0** |
| `mergeSpans` | `state.ts:17` | runtime | yes (`index.ts:3`) | yes (`core.ts:12`) | **0** |
| `Suggestion` | `state.ts:25` | type | yes — **laundered via `utils.js`** (`index.ts:6`) | **NO** | `utils.ts:51`, `debug.ts:7` |
| `SecondarySpan` | `state.ts:31` | type | yes — laundered (`index.ts:6`) | **NO** | `utils.ts:57`, `debug.ts:7` |
| `ParserState` | `state.ts:36` | runtime | yes (`index.ts:3`) | yes (`core.ts:9`) | everywhere |
| `parserNames` | `state.ts:141` | runtime | **NO** | **NO** | types `ParserContext.name` |
| `ParserContext` | `state.ts:173` | type | yes (`index.ts:4`) | yes (`core.ts:14`) | `parser.ts:31` (public ctor param) |
| `createParserContext` | `state.ts:179` | runtime | yes (`index.ts:3`) | yes (`core.ts:13`) | 25 literal sites + `packrat.ts:479` |

Measured `/core` runtime surface (`node -e "Object.keys(await import('./dist/core.js'))"`) — **18
keys**: `Parser ParserState all any containsDelimiter createLazyCached createParserContext dispatch
eof getLazyParser lazy mergeSpans regex spanToString splitBalanced string trimStateWhitespace
whitespace`. `parserNames` absent. `Suggestion`/`SecondarySpan` absent (`dist/core.d.ts:1-6`).

---

## 1. The axis-defining fact: value.js consumes **zero** of this module

The task frames value.js as "the routing law's sole downstream". Measured in the value.js tree:

- `package.json` — `grep -c "parse-that"` → **0**. Dependencies are `@mkbabb/glass-ui@^7.0.0` and
  `@mkbabb/keyframes.js@^6.0.0` only (`package.json:82-85`).
- `package-lock.json` — **0** hits.
- `node_modules/@mkbabb/parse-that` — **absent**.
- `await import("@mkbabb/parse-that")` → `ERR_MODULE_NOT_FOUND`.
- value.js's own CSS parser (`src/css/{grammar,types,stylesheet,timeline,syntax}.ts`) is
  hand-written; its every import is intra-repo (`../foundation/result`, `../color/model`,
  `../value`, `./types`). The only two `parse-that` strings in `src/**` are doc comments asserting
  the *absence* of the edge: `src/subpaths/transform.ts:4` ("zero parse-that") and
  `src/subpaths/math.ts:2` ("parse-that-FREE").

This is **not** an oversight and I do not report it as a defect: X·P W2 §3 *Not in scope* rules it
explicitly — *"adding `@mkbabb/parse-that` to `package.json` (X-W9 G31 measures that set and it
stays as measured)"*. The whole 9-symbol surface is therefore **prospective**, and every §4
keep/wrap/retire verdict below is a verdict on a surface with **no installed consumer to break**.
That is the single most important consumption fact about this module and it cuts *for* aggressive
change: there is no compatibility debt to pay.

**Falsifier**: any `dependencies`/`devDependencies` entry, lockfile row, or `node_modules` install
of `@mkbabb/parse-that` in the value.js tree. None exists.

### 1a. Corpus contradiction — the RED-7 script cannot run (MAJOR)

`docs/tranches/V/megatranche/prototypes/css-parser/parsethat-surface-gaps.mjs:11-13` does
`import { … } from "@mkbabb/parse-that"` and `from "@mkbabb/parse-that/diagnostics"`, and its
header (`:3`) says *"Run from this workspace (it resolves the workspace's node_modules)"*. Given
§1, that resolution **fails at line 11 before any row is evaluated**. The script cannot presently
emit RED or GREEN in the tree that owns it.

I therefore **contradict the task framing explicitly**: the "RED-7 surface gaps" are a **dated
record of a past run against an installed 1.0.0**, not a live gate. Every row I fold below is
folded as historical evidence, cross-checked against source, never as a currently-reproducing
signal. Where I re-derive a row from the tree I say so.

**Severity**: MAJOR (a born-RED gate that cannot execute is a gate that cannot go green either —
it is unfalsifiable in place). **Falsifier**: install the package and the script runs; or point at
a vendored tarball path the script actually resolves. Neither exists today.

---

## 2. Blockers

### C-1 — BLOCKER — the `/core` tier promise is **false** and **ungated**; `state.ts:2` is the sole cause on the `ParserState`-only path

`core.ts:3-5` sells the subpath in prose:

> *"The zero-side-effect primitive set… A consumer that imports only this **never pulls the
> diagnostics accumulator, the packrat tier**, or the json/csv domain parsers."*

Measured against the built artifact:

- `dist/core.js:1` — the subpath's **only** dependency is
  `import { P, a, b, c, d, e, f, g, h, l, j, r, s, n, t, w } from "./packrat-entry-CS1td-8B.js"`.
- `dist/packrat-entry-CS1td-8B.js` is **40,576 bytes** and contains, by name-count:
  `PACKRAT_ARMED` ×4 · `makeMemoized` ×3 · `memoize` ×5 · `resetPackrat` ×2 · `statePrint` ×3 ·
  `collectDiagnostic` ×2 · `summarizeLine` ×2 · `MAX_LINE_WIDTH` ×3, plus raw ANSI SGR codes
  (`[1m`, `[3m`, `31m`, `32m`).
- Runtime probe: `new (await import('./dist/core.js')).ParserState('abc').toString()` returns a
  27-byte rendered string — i.e. the **debug printer is live in the `/core` graph**.

The json/csv half of the promise holds (`jsonParser`/`csvParser` → 0 hits in the chunk). The
**packrat half is false**, and the diagnostics half is false for `collectDiagnostic`/`statePrint`
(only the `enable/disableDiagnostics` toggles live in the separate 3,516-byte
`diagnostics-DDazRHgl.js`).

**Attribution to `state.ts`.** `state.ts:2` — `import { statePrint } from "./debug.js"` — is the
module's **only** runtime import, and it exists solely to serve `toString()` (`state.ts:136-138`).
Because `toString()` is a *method on an exported class*, no tree-shaker can drop it: retaining
`ParserState` retains the method body, which retains `statePrint`, which retains `debug.ts`, which
(`debug.ts:3`) retains `Parser`, which (`parser.ts:7`) retains `packrat.ts` and `PACKRAT_ARMED`.
`sideEffects: false` (`package.json:5`) cannot help — this is a hard reference, not a side effect.
The import graph is a **cycle**: `state.ts → debug.ts → parser.ts → state.ts`.

**Falsifier, and how it sharpens rather than kills the claim.** Removing `state.ts:2` does *not*
purge packrat from `/core` wholesale, because `core.ts:7` also exports `Parser`, and `parser.ts:7`
imports `packrat.ts` directly. So the honest, surviving claim is narrower and still blocking:
`state.ts:2` is the **only** link on the `ParserState`-alone path — a consumer who imports just
`ParserState` (the sanctioned way to author a custom `ParserFunction`, `parser.ts:13-16`) pays for
`debug.ts` + `ansi.ts` + `utils.ts` + `lazy.ts` + `parser.ts` + `packrat.ts` today, and would pay
for **nothing** if `toString()` did not exist. Second falsifier: a *bundling* consumer with
tree-shaking may recover part of this; the measurement above is normative only for non-bundling
consumers (Node ESM, Deno, import-map browsers), for whom ESM module evaluation is total. I make
no claim about post-shake bundle size — I did not measure it, and measuring it would require a
build I am not permitted to run.

**Why BLOCKER, not MAJOR.** The gate that should catch this does not: `test/subpath-gate.mjs:25-55`
checks only that each subpath's `types`/`import`/`require` targets **exist** and that
`core.Parser`, `core.dispatch`, `packrat.memoize` are functions. It never asserts the exclusion the
prose sells. And X·P W2 §3b **O-8** makes the exclusion law: *"No operator reads or writes
process-global mutable state. Arming, memoization, and diagnostics are parameters of a parse, never
latches… no algebra with a global absorbing state can satisfy EQ-1 across two lowerings that arm at
different times."* A `/core` import that ships `PACKRAT_ARMED` resident is precisely the absorbing
state O-8 forbids, delivered through the tier advertised as clean. Cross-ref O-15 **PT-03** (latch
one-way, 93.9 → 138.2 ns = 1.47×, `resetPackrat()` leaves 139.3), and `packrat.ts:147-153`, which
states the arming rule in the source: *"The latch arms on the FIRST memoize()/mergeMemos()
CONSTRUCTION (makeMemoized) and NEVER disarms."*

### C-2 — BLOCKER — `ok`/`err`/`from` return `this`; the published `.d.ts` says otherwise, and `ParserFunction` invites consumers to depend on it

`state.ts:55-73`:

```ts
ok<S>(value: S, offset: number = 0): ParserState<S> {
    this.offset += offset; this.unsafeSetValue(value); this.isError = false;
    return this as unknown as ParserState<S>;
}
```

`err` (`:62`) and `from` (`:69`) are the same shape. All three **mutate the receiver and return
it**, re-tagged with a different type parameter. The emitted declaration
(`dist/state.d.ts` — `ok<S>(value: S, offset?: number): ParserState<S>;`) is indistinguishable from
a pure constructor. Three consequences a consumer cannot see from the types:

1. `const a = st.ok(1), b = st.ok(2)` ⇒ `a === b` and `a.value === 2`. The first "result" is
   retroactively rewritten.
2. After `st.ok(v)`, the receiver's own `T` is a lie: `st: ParserState<T>` still typechecks while
   holding an `S`. `unsafeSetValue` (`:87-89`) is the choke point that launders it.
3. `err<S>(value?: S)` (`:62`) — the value parameter is **optional**, so `err()` writes `undefined`
   into the state. Combined with `parse()` (`parser.ts:77-79`) returning `.value`, this is the
   mechanism behind O-15 **PT-07** (*".parse() returns undefined on failure — indistinguishable
   from a successful undefined"*); the constructor default `public value: T = undefined as T`
   (`state.ts:49`) is the same unchecked lie at the type level.

**Falsifier — is it documented?** No. `state.ts:55-109` carries doc comments on `unsafeSetValue`
(`:86`), `unsafeCall` (`:91`), `unsafeCallRaw` (`:96`) and `getLineAndColumn` (`:126`) — and
**zero** on `ok`, `err`, `from`, `save`, `restore`, `clone`. The three genuinely dangerous methods
are the undocumented ones. Second falsifier: is anyone outside the library expected to touch these?
Yes — `ParserFunction` (`parser.ts:13-16`) is exported from `.` (`index.ts:2`) and `/core`
(`core.ts:7`) precisely so consumers can write `(state: ParserState<any>) => ParserState<any>`, and
the only way to return from one is `ok`/`err`/`from`.

**Why BLOCKER.** X·P W2 §3b **EQ-5** requires rollback exactness — *"offset, journal length,
complement length … restored to pre-mark values"* — and **R-LAW-1** requires the restored state be
*exactly* the pre-mark state. A state object whose result constructors alias the receiver cannot
express mark/rollback without a separate, correct copy primitive; the copy primitive it does
publish is itself broken (§C-6). Any candidate that hosts its algebra on this class inherits an
un-auditable identity model.

---

## 3. Major

### C-3 — MAJOR — `Span`/`spanToString`/`mergeSpans`: the excision the gate let live, plus 2 dead type-imports

Commit `043c4d1` (*"S.H2: the 1.0.0 legacy cut — excise `*Span`"*) killed the 15 closure-based
`*Span` builders. `index.ts:10-12` records the rationale verbatim: *"a **zero-consumer surface**,
deprecated in 0.13.0 (PT-Q4)."*

The same principle, applied to what survived:

- `spanToString` (`state.ts:13`) — consumers in `src/`, `test/`, `bench/`: **0**.
- `mergeSpans` (`state.ts:17`) — consumers: **0**.
- `Span` (`state.ts:8`) — imported at `parser.ts:2` and `leaf.ts:3`, and **used in neither file
  body**. `grep -n "Span" parser.ts` → `:2` (the import) and `:64` (`secondarySpans`, an unrelated
  symbol). `grep -n "Span" leaf.ts` → `:3` only. Two **dead type-imports**.
- The only textual justification left is `split.ts:3` — *"Used by BBNF-generated `toDoc()` code to
  split opaque **Span** text"* — which describes an external generator, not this repo, and refers
  to `splitBalanced`, not to `Span`.

Yet all three ship on **both** `.` (`index.ts:3-4`) and `/core` (`core.ts:11-14`), and are live in
the built surface (`dist/index.d.ts:2-3`, `dist/state.d.ts:6-17`, `dist/core.js` export list). They
are **2 of the 18 `/core` runtime keys** — 11 % of that tier's surface is dead.

**Why the gate missed it.** `scripts/proof-no-span-surface.mjs:33-37` enumerates the 15 builder
names as a literal array (`stringSpan`, `regexSpan`, … `lookAheadSpan`) and scans for those.
`Span`, `spanToString`, `mergeSpans` are not in the list, so the gate is **GREEN over the residue**.
`test/dist-surface.test.ts:58,69` reuses the same name list. This is a gate whose construction —
name enumeration rather than reachability — guarantees it cannot see the class of thing it exists
to find.

**Falsifier**: a consumer, a test, a bench, or a doc example that calls `spanToString`/`mergeSpans`
or names `Span` in a position that affects typechecking. I searched `src/`, `test/`, and the
built `dist/**` and found none. If the BBNF generator at `split.ts:3` is a real downstream, the
right cure is a documented contract, not two unreferenced helpers on the primitive tier.

### C-4 — MAJOR — `createParserContext` is published; `parserNames`, the only source of its legal arguments, is not

`createParserContext` (`state.ts:179-189`) has first parameter `(typeof parserNames)[number]` and
is exported from `.` (`index.ts:3`) and `/core` (`core.ts:13`). `parserNames` (`state.ts:141-171`)
is exported from `state.ts` but appears in **neither** barrel.

Measured: `dist/parse.js` export list (34 keys) — no `parserNames`. `/core` runtime keys (18,
measured above) — no `parserNames`. So a consumer can *name* the type
(`ParserContext["name"]`) but cannot **enumerate**, iterate, or validate against the 29 values; a
consumer building tooling over `ParserContext` must hard-copy 29 string literals out of the
`.d.ts`. `ParserContext` itself is on the public surface as `Parser`'s constructor parameter
(`parser.ts:31`, `public context: ParserContext = {}`), so this is not an internal type.

**Falsifier**: reachability by another path. `export * from "./parsers/index.js"` (`index.ts:14`)
covers only `parsers/`, not `state.ts`; the measured runtime key sets settle it.

### C-5 — MAJOR — three published position getters, mutually inconsistent; the two broken ones have zero internal consumers

`state.ts:111-134` publishes `getColumnNumber()`, `getLineNumber()`, `getLineAndColumn()`. Measured
against `dist/core.js` (probe: construct `ParserState(src, undefined, off)`, call all three):

| src | offset | `getLineNumber()` | `getColumnNumber()` | `getLineAndColumn()` |
|---|---|---|---|---|
| `"a\nb"` | 2 | **1** | 0 | `{line: 2, column: 0}` |
| `"a\nb"` | 1 | 1 | **0** | `{line: 1, column: **1**}` |
| `"a\nb\nc"` | 4 | **2** | 0 | `{line: 3, column: 0}` |
| `"abc"` | 2 | **0** | 2 | `{line: 1, column: 2}` |

In **all four** probes at least one component disagrees. `getLineNumber()` is off by one on rows 1,
3, 4 and returns **0** for an offset on the first line — not a line number under any convention.
The mechanisms differ at `state.ts:113` / `:120` (`lastIndexOf("\n", offset)`, inclusive of the
offset) versus `state.ts:128` (`lastIndexOf("\n", offset - 1)`, exclusive), and at `:131`
(`slice(0, lastNewline + 1)`) versus `:122` (`slice(0, newlineIndex)`).

Consumers: `getLineAndColumn` is used at `debug.ts:59`. `getLineNumber` and `getColumnNumber` have
**zero** consumers anywhere in `src/` or `test/`. So the module publishes two dead, wrong getters
alongside one live, correct one, and offers a consumer no way to tell which is which — the
correct one is the *last* declared and the only one with a doc comment (`state.ts:126`).

**Falsifier**: a documented convention under which `getLineNumber()`'s output is right. `:119-124`
carries no doc comment and no convention; `:126` documents the *other* method as *"1-based line and
0-based column"*, which `getLineNumber` contradicts on 3 of 4 probes.

### C-6 — MAJOR — `clone()` breaks the pairing invariant the module's own doc-comment asserts, and packrat is a live consumer

`state.ts:38-42` documents the invariant:

> *"`expected` is the accumulated label set **at `furthest`**; `suggestions`/`secondarySpans` are
> the diagnostic extras collected **at `furthest`**…"*

`clone()` (`state.ts:101-109`) copies exactly the 5 constructor arguments — `src`, `value`,
`offset`, `isError`, **`furthest`** — and **not** `expected`, `suggestions`, `secondarySpans`. The
new instance takes the field initializers (`:43-45`): `expected = undefined`, `suggestions = []`,
`secondarySpans = []`. So a clone is born with a **non-`-1` `furthest` and an empty label set** —
the exact state the doc says is impossible.

Live consumer: `packrat.ts:351` — `const scratch = live.clone();` inside the left-recursion grow
pass. `scratch.furthest` inherits the parent parse's furthest; its `expected` is `undefined`. The
next `mergeErrorState(scratch, label)` with `offset === furthest` takes the `else if` branch
(`utils.ts:36-46`) and seeds a **fresh** `expected` — the parent's accumulated labels are gone,
silently, with no signal.

Compare the library's own workaround: `parser.ts:61-65` does **not** use `clone()` for the copy
that matters; it hand-rolls `new ParserState(val, undefined, furthest, true)` and then explicitly
assigns `.expected`, `.suggestions`, `.secondarySpans`. The class publishes `clone()` as *the* copy
operation, and the one place correctness depends on copying diagnostics, the library routes around
it.

Under X·P W2 §3b **EQ-4** (diagnostics compared as *ordered structural equality* of
`code`/`start`/`end`/`expected[]`/`actual`), a copy primitive that drops `D` while keeping the
offset it is indexed by cannot satisfy the product across two lowerings.

**Falsifier**: an argument that the LR scratch *should* start with empty diagnostics. Even granting
that, the bug stands — it should then also reset `furthest` to `-1`, which `clone()` does not do
(`state.ts:107`), and the reset should be intentional at the call site, not an artifact of an
under-copying method published to every consumer.

### C-7 — MAJOR — `save()`/`restore()` is an asymmetric pair that forces success; zero consumers; published

`state.ts:75-84`:

```ts
save(): { offset: number; value: T } { return { offset: this.offset, value: this.value }; }
restore(saved: { offset: number; value: any }): this {
    this.offset = saved.offset; this.value = saved.value;
    this.isError = false;                       // ← not saved, unconditionally forced
    return this;
}
```

`save()` captures 2 of the 8 fields. `restore()` writes those 2 and then **forces `isError = false`
regardless of what was saved**. It also leaves `furthest`, `expected`, `suggestions`,
`secondarySpans` untouched, so a restore rewinds the offset while the error tracking stays pinned
at a furthest the state can no longer reach. The `saved` parameter is typed `{ offset: number;
value: any }` — an inline literal with `any`, not the return type of `save()`, so a consumer gets
no help from the compiler that the two are meant to pair.

Consumers of `.save()`/`.restore()` in `src/` or `test/`: **0**. Both ship on `.` and `/core` as
`ParserState` methods.

Under W2 **R-LAW-1** (*"the restored state is exactly the pre-mark state: offset, journal length,
complement length"*) this is the published mark/rollback primitive failing the law by three fields
and one forced boolean.

**Falsifier**: a call site that relies on the `isError = false` behaviour, which would make it
intentional-if-undocumented. There are none.

### C-8 — MAJOR — `ParserContext.name` is a mutable optional the library post-hoc rewrites and then dispatches on

`state.ts:173-177` declares `name?: (typeof parserNames)[number]` — optional, mutable, on a plain
object type. Three consequences:

1. **The factory is not the only construction site.** `leaf.ts:395-398`:
   ```ts
   export let whitespace: ReturnType<typeof regex>;
   export function _initWhitespace() { whitespace = regex(/\s*/); whitespace.context.name = "whitespace"; }
   ```
   The name is **overwritten after construction**, bypassing `createParserContext` entirely. (This
   is why a naive grep of `createParserContext("…")` finds only 25 of the 29 names — `"whitespace"`
   arrives by mutation, `"memoize"`/`"mergeMemo"` by the typed variable at `packrat.ts:479` +
   `:282`.)
2. **Behaviour dispatches on it.** `parser.ts:488` — `if (parser.context?.name === "whitespace")`
   selects `trim()`'s fast flag-based path (`FLAG_TRIM_WS`); anything else falls through to
   `this.wrap(parser, parser)` (`parser.ts:495`). A consumer who passes their own `regex(/\s*/)` to
   `.trim()` gets `context.name === "regex"` and silently takes the other path. The published
   `trim()` API's implementation strategy is keyed on a mutable string field of a published type.
3. **The union guarantees nothing.** `name` is optional and `Parser`'s constructor defaults
   `context` to `{}` (`parser.ts:31`), so a consumer's exhaustive `switch (ctx.name)` must still
   handle `undefined`, and any code holding a `Parser` can rewrite the discriminant.

**Falsifier**: is the divergence in (2) semantic or only performance? `regex(/\s*/)` always succeeds
zero-width, so `wrap` accepts the same language — I measured no acceptance difference and claim
none. The defect is that a published API's strategy selection depends on a field the type system
declares free to mutate; the trap is real even where the languages coincide.

### C-9 — MAJOR — `/core` publishes `ParserState` but not the types of two of its public fields

`ParserState` exposes `suggestions: Suggestion[]` (`state.ts:44`) and
`secondarySpans: SecondarySpan[]` (`state.ts:45`) as public fields. `core.ts:7-26` exports
`ParserState` but **not** `Suggestion`/`SecondarySpan` (confirmed in the emitted
`dist/core.d.ts:1-6`). Both types are declared in `state.ts:25-34` and reach the public surface only
by laundering through a *different* module: `index.ts:6` and `diagnostics.ts:14` both write
`export type { Suggestion, SecondarySpan, Diagnostic } from "./utils.js"`, and `utils.ts:3`
re-exports them from `./state.js`.

So a `/core`-only TypeScript consumer who wants to write `function handle(s: Suggestion)` must
import from `.` or `/diagnostics` — and `/diagnostics` resolves to `dist/diagnostics.js`, the
accumulator tier `core.ts:3-5` promises to avoid. The tiering story and the type story contradict
each other, and `state.ts`'s decision to co-locate the two diagnostic shapes with `ParserState`
(`state.ts:21-23`) while the barrels route them through `utils.js` is the cause.

**Falsifier**: structural typing lets a consumer write `{ offset: number; label: string }` inline
and assign it. True — and that is the workaround, not a defense: it means the published nominal
names are unusable from the tier that publishes the class carrying them.

### C-10 — MAJOR — two array allocations per state and per furthest-advance, provably dead on the shipping default path (DEBT-2)

`state.ts:44-45` initializes `suggestions = []` and `secondarySpans = []` as **unconditional field
initializers** — every `ParserState` construction allocates two arrays. `parser.ts:52` constructs
one per parse; `parser.ts:61` constructs a **second** on every failure. So the reject path
allocates **4 arrays per parse**.

Worse, `utils.ts:30-37`:

```ts
if (state.offset > state.furthest) {
    state.furthest = state.offset;
    state.expected = diagnosticsEnabled && label ? [label] : undefined;  // guarded
    state.suggestions = [];                                             // NOT guarded
    state.secondarySpans = [];                                          // NOT guarded
}
```

The `expected` assignment is guarded by `diagnosticsEnabled`; the two array re-allocations are
**not**. Every furthest-offset advance — i.e. every forward-progress failure in a deep grammar —
allocates two fresh arrays.

They are provably dead by default: the only writers are `addSuggestion` (`utils.ts:51-55`) and
`addSecondarySpan` (`utils.ts:57-61`), and **both bodies are wrapped in `if (diagnosticsEnabled)`**.
Diagnostics ship OFF (`utils.ts:6`, `let diagnosticsEnabled = false`).

This is `registry/adjudicated/parser-band.md` **DEBT-2** territory — *"The wave's bench gate must
track the reject path as its own leg"* — with `state.ts`'s field design as the mechanism.

**Falsifier**: a JIT that escape-analyses the array literals away. Plausible for the constructor
site under monomorphic conditions; **implausible** for `utils.ts:35-36`, where the arrays are
stored into a heap object that outlives the call and is read by `parser.ts:63-64`. I make no
quantitative claim — I did not bench this (arming a bench is out of bounds), and O-15's 93.9 ns
unarmed figure is not decomposable into this line. The defect claimed is *provable deadness of a
per-advance allocation*, not a measured cost.

---

## 4. Minor / informational

### C-11 — MINOR — `createParserContext`'s return type is inferred, not `ParserContext`; the `.d.ts` inlines all 29 literals

`state.ts:179-189` has no return annotation. The emitted declaration (`dist/state.d.ts`) is:

```ts
export declare function createParserContext(name: (typeof parserNames)[number], parser: Parser<unknown> | undefined, ...args: unknown[]): {
    name: "string" | "regex" | "then" | ... | "lookAhead";   // all 29, inlined
    parser: Parser<unknown> | undefined;
    args: unknown[];
};
```

The declared return is an anonymous object type with `name` **required** (`ParserContext` declares
it optional), and the 29 literals are pasted into the signature. Semver hygiene: adding one
combinator name to `parserNames` textually changes the public declaration of a *different* exported
function. **Falsifier**: assignability is fine (extra-required-props widen into
`ParserContext`), so nothing breaks today — hence MINOR. Cure is one annotation: `: ParserContext`.

### C-12 — MINOR — `"trim"` is an orphan union member with a live-looking consumer branch

`parserNames` (`state.ts:141-171`) declares 29 names. Producers, exhaustively traced:

- 25 literal `createParserContext("…")` call sites across `parser.ts`, `leaf.ts`;
- `"memoize"` / `"mergeMemo"` via `makeMemoized(parser, name)` (`packrat.ts:280-283`, `:479`,
  `:483`, `:487`);
- `"whitespace"` via post-hoc mutation (`leaf.ts:398`, see §C-8).

That is 28. **`"trim"` is produced nowhere.** `Parser.trim()` (`parser.ts:480`) emits
`createParserContext("trimWhitespace", …)` on the fast path (`:491`, `:516`) and delegates to
`this.wrap(…)` (`:495`) on the slow one — never `"trim"`.

The bad part: `debug.ts:274` contains `case "trim": {` — a switch arm keyed on a value that cannot
occur. Dead code that reads as covered. **Falsifier**: any producer of `"trim"`. `grep -rn '"trim"'
src/` returns exactly two hits — `state.ts:156` (the declaration) and `debug.ts:274` (the consumer).

### C-13 — MINOR — `toString()` overrides `Object.prototype.toString` with a diagnostic renderer, and is PT-01's print payload

`state.ts:136-138` — `toString() { return statePrint(this as ParserState<unknown>); }`. Two
consumption consequences beyond §C-1's graph cost:

1. Any incidental string coercion of a `ParserState` — template interpolation, `String(st)`,
   `"" + st`, a logger's default serializer — invokes the full debug renderer (measured: 27 bytes
   for a trivial state; `debug.ts:9-10` sizes it at up to `MAX_LINES = 4` lines × 74 columns, ANSI
   included when the printer colorizes).
2. It is the payload in O-15 **PT-01**: `parser.ts:68-70` —
   `if (isDiagnosticsEnabled()) { console.error(this.state.toString()); }`. Arming diagnostics turns
   every failed parse into an unconditional `console.error`. X·P W2 §3b **R-LAW-3** makes this
   unpassable by construction: *"the probe monkey-patches `console.error`/`console.warn` to throw
   over the full corpus — a lowering that prints cannot pass."*

I rate this MINOR **as a `state.ts` defect** and say so explicitly: the `console.error` lives in
`parser.ts:69`, not here. `state.ts` supplies the renderer; it does not choose to print. Recorded
so the attribution is not double-counted against this module at BLOCKER weight.

### C-14 — INFO — `Suggestion.kind` is a closed 2-member union pinned to delimiter recovery

`state.ts:25-29` — `kind: "unclosed-delimiter" | "trailing-content"`. The only producers are
`reportUnclosedDelimiter` (`utils.ts:74-79`) and the EOF path (`parser.ts:468-469`). Value-CSS
recovery under W2 §3b needs a considerably wider vocabulary (labelled zero-width failure, resync to
a declared synchronization point, malformed-span skip). Not a defect today — it is correctly closed
for what it covers — but it is a **hard-coded 2 of the recovery space**, and any consumer switching
on it will need a breaking change.

---

## 5. Superlatives (L-18, held to the same evidentiary bar)

### S-1 — the `unsafe*` choke-point idiom is real and it holds

`state.ts:86-99` names three methods `unsafeSetValue`, `unsafeCall`, `unsafeCallRaw`, each with a
doc comment saying exactly what it launders (*"single choke point for the mutable-state cast
pattern"* / *"…for combinator type casts"*). This is not decoration — it is load-bearing and
measurable:

| file | `as any` | `as unknown as` |
|---|---|---|
| `state.ts` | **0** | 3 (the `ok`/`err`/`from` returns) |
| `parser.ts` (711 lines) | **0** | 5 |
| `leaf.ts` | **0** | **0** |
| `packrat.ts` | **0** | **0** |

Zero `as any` across the entire parse tree, in a mutable-state combinator library whose whole
design is type-erasing. `parser.ts` routes through `state.unsafeCallRaw(…)` at `:218`, `:313`,
`:376`, `:402`, `:416` and `state.unsafeSetValue(…)` at `:286`, `:383`, `:424` rather than casting
inline. **Falsifier**: a scattered-cast pattern elsewhere in the tree. `grep -c "as any"` over
`src/parse/*.ts` → 0 everywhere. The idiom holds. This is the one thing X·P should copy verbatim
regardless of which candidate survives.

### S-2 — per-parse diagnostic substate is the reentrancy foundation, and it is *already* the shape W2's O-8 demands

`state.ts:21-23` states the design decision — *"These live with ParserState because the diagnostic
accumulator is per-parse state, threaded through the parse, **not a module global**"* — and
`utils.ts:22-27` backs it with the consequence: *"This makes a parse reentrant and interleave-safe:
a nested `.parse()` mid-rule operates on its own state and cannot corrupt the outer parse's error
tracking."* `state.ts:38-42` records the provenance (the Rust port's `state.furthest_offset` model).

This is precisely W2 §3b **O-8** — *"Arming, memoization, and diagnostics are parameters of a parse,
never latches"* — implemented, in the tree, before O-8 was written. The contrast is the finding:
`state.ts` holds this line and `packrat.ts:147-153` breaks it with `PACKRAT_ARMED` (O-15 PT-03).
An X·P candidate looking for prior art for "diagnostics as values threaded through state" has it
here, working, and should say so rather than re-derive it.

**Falsifier**: a module-global in `state.ts`. There is none — the file declares no top-level
mutable binding (`state.ts:1-189`); the only top-level values are the `parserNames` frozen tuple
(`:141`) and three pure functions.

### S-3 — `getLineAndColumn` is the correct one, and it is the only one documented

`state.ts:126-134` — correct 1-based line / 0-based column across all four probes in §C-5,
correctly handles the no-newline case, correctly uses the exclusive `offset - 1` bound so an offset
*at* a newline attributes to the line it terminates, takes an explicit `offset` parameter defaulting
to `this.offset` (so it serves the `furthest` display, which is what `debug.ts:59` needs), and
carries the only doc comment among the three. It is a small, right function. The cure for §C-5 is
to collapse the other two into it, not to fix them.

---

## 6. X·P dual-target algebra — keep / wrap / retire

Read against W2 §3b (the `(V, C, P, D)` state model, COMP-1, O-8, EQ-1..EQ-6, R-LAW-1..5) and §3c
(AC-1..AC-4, NC-0/NC-1). Every candidate hosts the band's adjudicated grammar substance; the
question here is only what of **this module** each would inherit.

| symbol | verdict | reasoning, tied to the algebra |
|---|---|---|
| `ParserState` (the class) | **WRAP — cannot be adopted as `(V, C, P, D)`** | It carries `V` (`value`) and part of `D` (`expected`/`suggestions`/`secondarySpans`), and **nothing** of `C` (byte complement) or `P` (provenance). COMP-1 (`weave(V,C,P) === S`) is unrepresentable on it. All four candidates need a state with `C` and `P`; **AC-3 SPAN-ALGEBRA** needs `C` as its primary carrier. Under R-B this is a wrap, not a rename. |
| `ok` / `err` / `from` | **RETIRE (§C-2)** | Aliasing result constructors defeat EQ-5/R-LAW-1 auditing. Replace with either genuinely fresh states or an explicit, documented in-place protocol — not one wearing a functional signature. |
| `save` / `restore` | **RETIRE (§C-7)** | This is the mark/rollback slot in the algebra, and the incumbent forces `isError = false` and copies 2 of 8 fields. R-LAW-1 requires *exactly* the pre-mark state; a correct `mark()`/`rollback()` is a first-class algebra operation per W2 §3b, not a two-field snapshot. |
| `clone` | **RETIRE (§C-6)** | Copies `furthest` without `expected` — breaks its own documented invariant and EQ-4. Whatever replaces it must copy `D` or explicitly reset the index it is keyed on. |
| `unsafeSetValue` / `unsafeCall` / `unsafeCallRaw` | **KEEP the idiom; the methods are AC-1/AC-2-specific** | §S-1. **AC-1 TAGLESS-TWIN** in particular is a typed-final encoding whose whole risk is *signature leak*; a named, enumerable set of erasure points is exactly the instrument that makes leak visible. Keep the discipline, re-derive the members. |
| `getLineAndColumn` | **KEEP verbatim (§S-3)** | `P` (provenance) is `(start, end)` offsets by W2 §3b; rendering those to line/column for `D`'s presentation layer is the one job this does, and it does it right. Note EQ-4 compares *structural* diagnostics, not rendered strings — so this belongs in the non-normative presentation layer, which is where it already is (`debug.ts:59`). |
| `getLineNumber` / `getColumnNumber` | **RETIRE (§C-5)** | Two wrong, unused, undocumented getters shadowing a right one. |
| `Span` / `spanToString` / `mergeSpans` | **RETIRE (§C-3)** | Zero consumers; the S.H2 rationale already condemns them; the gate's name-list construction is the only reason they survived. Note the tension: **AC-3** will want a span type — but it wants `(offset, length, kind)` for `C` (W2 §3b), not `{start, end}`, and it should not inherit a dead one. |
| `Suggestion` / `SecondarySpan` | **WRAP → the frozen 8-code `ParseIssue` union** | W2 §3b binds `D` to `src/css/types.ts:10-24`'s 8-code union, and `types.ts:27` makes the failure arm `readonly [ParseIssue, ...ParseIssue[]]` — a **non-empty tuple**, which W2 notes *"already forbids the PT-07 shape at the type level."* `Suggestion.kind`'s 2 members (§C-14) are a strict subset of what recovery needs. |
| `parserNames` / `ParserContext` / `createParserContext` | **RETIRE for the algebra; KEEP as a debug facility, fixed** | A 29-name open-ended string tag with a **mutable optional** discriminant (§C-8) is the opposite of W2 §3b's *"closed, enumerated operator set."* **AC-2 CLOSED-IR** in particular is defined by *"a finite closed union of IR node kinds… no fallback kind"*; `name?: … \| undefined` with post-hoc mutation is the fallback kind, spelled `undefined`. If retained for debug output, `name` must become required and immutable, `parserNames` must be exported (§C-4), and `"trim"` must go (§C-12). |
| `toString` | **RETIRE from the state class (§C-1, §C-13)** | It is the single edge that welds the debug printer to the flagship export, and it is R-LAW-3's print payload. Rendering is a free function over `D`, invoked by the caller — never a method the consumer's logger can trigger by accident. |

**Net**: of 9 exported symbols, X·P retires or restructures **8**. The one unqualified keep is
`getLineAndColumn` (plus the `unsafe*` *idiom*, which is not a symbol). Per §1 there is no installed
consumer to break — the retirement cost is zero and the only debt is documentation.

---

## 7. Ledger

| id | severity | claim | provenance |
|---|---|---|---|
| §1a | MAJOR | RED-7 surface-gaps script cannot resolve its own import in the value.js tree | `parsethat-surface-gaps.mjs:11-13`; `ERR_MODULE_NOT_FOUND` |
| C-1 | **BLOCKER** | `/core`'s tier promise false + ungated; `state.ts:2` sole cause on the `ParserState` path | `core.ts:3-5`; `dist/core.js:1`; 40,576-byte chunk census; `subpath-gate.mjs:25-55` |
| C-2 | **BLOCKER** | `ok`/`err`/`from` alias `this`, undocumented, reachable via published `ParserFunction` | `state.ts:55-73`; `dist/state.d.ts` |
| C-3 | MAJOR | `Span`/`spanToString`/`mergeSpans` zero-consumer residue; 2 dead type-imports; gate blind by construction | `state.ts:8-19`; `parser.ts:2`; `leaf.ts:3`; `proof-no-span-surface.mjs:33-37` |
| C-4 | MAJOR | `parserNames` unexported though it types published `createParserContext` | `state.ts:141`; measured `/core` + `dist/parse.js` key sets |
| C-5 | MAJOR | three position getters mutually inconsistent; 2 dead and wrong | `state.ts:111-134`; 4-row measurement |
| C-6 | MAJOR | `clone()` keeps `furthest`, drops `expected`; live at the LR grow pass | `state.ts:101-109`; `packrat.ts:351`; `utils.ts:36-46` |
| C-7 | MAJOR | `save`/`restore` asymmetric, forces `isError = false`, zero consumers | `state.ts:75-84` |
| C-8 | MAJOR | `ParserContext.name` mutable optional; library mutates and dispatches on it | `state.ts:173-177`; `leaf.ts:398`; `parser.ts:488` |
| C-9 | MAJOR | `/core` ships `ParserState` without `Suggestion`/`SecondarySpan` | `core.ts:7-26`; `dist/core.d.ts:1-6`; `index.ts:6` |
| C-10 | MAJOR | unconditional 2-array alloc per state and per furthest-advance, provably dead by default | `state.ts:44-45`; `utils.ts:30-37`, `:51-61` |
| C-11 | MINOR | `createParserContext` return type inferred, 29 literals inlined into the `.d.ts` | `state.ts:179-189`; `dist/state.d.ts` |
| C-12 | MINOR | `"trim"` orphan union member with a live-looking branch at `debug.ts:274` | `state.ts:156`; `debug.ts:274`; `parser.ts:480-495` |
| C-13 | MINOR | `toString()` overrides string coercion; is PT-01's print payload | `state.ts:136-138`; `parser.ts:68-70` |
| C-14 | INFO | `Suggestion.kind` closed at 2 members, narrower than Value-CSS recovery needs | `state.ts:25-29`; W2 §3b |
| S-1 | SUPERLATIVE | `unsafe*` choke points hold: `as any` = 0 across the parse tree | `state.ts:86-99`; grep census |
| S-2 | SUPERLATIVE | per-parse diagnostic substate = W2's O-8, implemented before O-8 was written | `state.ts:21-23`, `:38-42`; `utils.ts:22-27` |
| S-3 | SUPERLATIVE | `getLineAndColumn` correct, documented, and the one the live consumer uses | `state.ts:126-134`; `debug.ts:59` |

**Totals**: 14 defects (§1a + C-1..C-13), of which **2 BLOCKER**, 8 MAJOR, 3 MINOR, 1 INFO;
**3 superlatives**.

### Corpus cross-reference

| corpus id | folded as |
|---|---|
| O-15 **PT-01** (label no-op unless armed; arming couples `console.error`) | §C-13 — `state.ts:136-138` is the payload; re-derived from source at `parser.ts:68-70`, `utils.ts:33` |
| O-15 **PT-03** (`PACKRAT_ARMED` one-way, 1.47×, `resetPackrat()` does not disarm) | §C-1 — re-derived structurally: the latch is resident in the `/core` chunk; source rule at `packrat.ts:147-153` |
| O-15 **PT-07** (non-string `TypeError`; `.parse()` failure ≡ successful `undefined`) | §C-2.3 — mechanism located at `state.ts:49` + `:62` |
| `parser-band.md` **DEBT-2** (reject path as its own bench leg) | §C-10 — the allocation the leg would measure |
| `parser-band.md` **DEBT-1** (labelled failure; `expected: ["<named-color>"]`) | §C-10 — `utils.ts:33` guards `expected` on `diagnosticsEnabled`, so the label is `undefined` by default; matches the RED-7 row, re-derived from source since the script cannot run (§1a) |
| W2 §3b **O-8** / **R-LAW-3** / **EQ-4** / **EQ-5** / **R-LAW-1** | §C-1 / §C-13 / §C-6 / §C-2 / §C-7 |
| W2 §3c **AC-1** signature leak · **AC-2** closed union, no fallback kind · **AC-3** span carrier | §6 verdict column |
| W2 §3 *Not in scope* (no `@mkbabb/parse-that` in `package.json`) | §1 — the zero-edge is ruled, not accidental |
| S.H2 `043c4d1` / fold row 48 (`*Span` excision rationale) | §C-3 — the rationale applied to what survived it |
