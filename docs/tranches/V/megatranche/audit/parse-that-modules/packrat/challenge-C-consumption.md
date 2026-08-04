claude-opus-5[1m]

# CHALLENGE — `packrat` · axis C (CONSUMPTION)

**Subject**: `/Users/mkbabb/Programming/parse-that/typescript/src/parse/packrat.ts` (488 lines, read whole).
**Axis**: how this module serves its consumers — exported surface vs. actual consumption, the subpath
surface, API ergonomics, semver hygiene, and the X·P dual-target algebra's keep/wrap/retire verdict.
**Posture**: the module is assumed DEFECTIVE until the tree proves otherwise. Every claim below carries
severity + `file:line` + its own falsifier (L-18 runs both ways — the superlatives carry falsifiers too).

## 0. Method, bounds, and what was NOT run

**Read whole (read-only)**: `packrat.ts`; every module it imports — `parser.ts` (711), `state.ts` (189),
and transitively `lazy.ts` (43); the subpath entry `packrat-entry.ts` (5); the barrel `index.ts` (14);
`package.json`; `vite.config.ts`; the built `dist/{packrat.js,packrat.cjs,packrat.d.ts,packrat-entry.d.ts,parse.js,core.js,utils.js}`
and both shared chunks; `test/subpath-gate.mjs`, `test/dist-surface.test.ts`, `test/manifest-gate.mjs`,
`scripts/proof-no-dead-combinator.mjs`, `scripts/proof-packrat-armed.mjs`; `README.md` §"Combinator support";
`docs/api.md`; `typescript/CHANGELOG.md` §1.0.0/§0.13.0. Downstream: value.js `package.json`, `src/css/index.ts`,
`docs/tranches/V/megatranche/prototypes/css-parser/parsethat-surface-gaps.mjs`.

**Corpus folded, not re-invented**: INBOX **O-15** (`docs/tranches/V/coordination/INBOX.md:77` — PT-01/PT-03/PT-04/PT-07
with dist line-cites); **X·P W2** (`docs/tranches/X/parse-that/waves/W2.md` — §3b O-8 `:253-258`, §3c AC-3(d) `:366-368`,
K-6 `:473`, G-8 born-RED `:784-788`, G-10 `:810`); **parser-band** (`registry/adjudicated/parser-band.md:17,108,134`).

**Deliberately NOT run** (law): nothing that arms packrat or diagnostics — the latch is one-way and a stray
`memoize()` poisons the process for every later measurement (the tree's own gate says so:
`scripts/proof-packrat-armed.mjs:13-21`). Consequently every dynamic claim below is either (a) measured on a
non-arming path and marked **MEASURED**, or (b) derived from source with a stated executable falsifier and marked
**UNRUN-BY-LAW**. No claim is presented as measured that was not.

**Two non-arming measurements were taken** (import + property read only; `memoize` is never constructed):

```
$ node -e "import('./dist/parse.js').then(m=>{…})"          # in parse-that/typescript
Parser.prototype methods: 25 ["constructor","parseState","parseStateInner","parse","then","or","chain",
  "map","mapState","skip","next","opt","not","minus","peek","lookAhead","wrap","call","trim","many",
  "sepBy","eof","recover","debug","toString"]
has memoize method: undefined   |  has mergeMemos method: undefined
free memoize: function | free mergeMemos: function | resetPackrat: function
getCijKey on root barrel: undefined | packratEnter: undefined

$ node -e "import('@mkbabb/parse-that')…"                    # in value.js
UNRESOLVABLE: ERR_MODULE_NOT_FOUND
```

**STOP-finding check (law)**: `ls /Users/mkbabb/Programming/parse-that-css-totality-p2` → `No such file or
directory`. The forbidden root is ABSENT and was not created. No `.worktrees/`, frozen root, or `~/Documents/Codex`
path was entered. My only write is this file.

## 1. The consumption ground truth

The routing law (W2.md `:133`) names value.js the sole downstream: **parser → value → packed release**.
Measured against the tree, this module's consumption edge is **empty**:

| surface | exported at | consumed by | evidence |
|---|---|---|---|
| `memoize` | `packrat.ts:482`, barrel `index.ts:8`, subpath `packrat-entry.ts:5` | **zero** non-test callers in any swept tree | `grep -rln memoize` over `parse-that/typescript/{src,test,scripts}` → only `packrat*.ts`, `index.ts`, `state.ts` (a name string), 2 test files, 4 proof scripts |
| `mergeMemos` | `packrat.ts:486` + both entries | **zero** non-test callers | same sweep |
| `resetPackrat` | `packrat.ts:262` + both entries | **zero** non-test callers | same sweep |
| `getCijKey` | `packrat.ts:79` | 1 test, via a **source** deep-import | `test/memoize.test.ts:3` — `from "../src/parse/packrat.js"`, not the package surface |
| `packratEnter` / `packratExit` | `packrat.ts:216,243` | `parser.ts:43,47` only | legitimate internal edge |

**value.js does not depend on `@mkbabb/parse-that` at all.** `package.json` `dependencies` = `{"@mkbabb/glass-ui":"^7.0.0","@mkbabb/keyframes.js":"^6.0.0"}`; no peer, no optional, no dev entry; the package is not
installed (`node_modules/@mkbabb/` holds `glass-ui`, `keyframes.js`, `value.js` only). The only two occurrences of
the string "parse-that" in value.js `src/` are prose asserting the *absence* of the dependency
(`src/subpaths/transform.ts:4`, `src/subpaths/math.ts:2` — "parse-that-FREE"). value.js ships its own
hand-written `src/css/grammar.ts` behind the 52-export `/css` surface (`src/css/index.ts:1-35` types, `:36-60` runtime).

**And the future consumption is ruled to zero.** The adjudicated parser band's idiom gate for the ruled winner
cand-O is literally **`memoize = 0`** (`parser-band.md:134`), listed among the band's "shared virtues" as
"**zero memoize**" (`:108`) and asserted structurally by graph-walk rather than grep (`:17`). X·P W2 carries that
same clause into G-10 (`W2.md:810`). So the sole downstream neither consumes this tier today nor is permitted to
consume it in the architecture that succeeds it.

## 2. Defects

### C-1 — BLOCKER — the cross-input soundness cure is bound to ONE of the class's four public invocation paths

`packrat.ts:158-181` states the soundness model: MEMO/HEADS/GROWING/LR_STACK are module-global and keyed
`(id, offset)` **with no source component**, so cross-input soundness depends *entirely* on `packratEnter()`
installing fresh tables at "the parseState ENTRY boundary". That boundary exists at exactly one call site —
`parser.ts:43`, inside `Parser.parseState`.

But `Parser` publishes four ways to run a parser, and only two route through it:

| path | epoch opened? | publicity |
|---|---|---|
| `p.parse(src)` | yes (`parser.ts:78` → `parseState`) | public |
| `p.parseState(src)` | yes (`parser.ts:43`) | public |
| `p.call(state)` | **no** | `public call(state)` — `parser.ts:437` |
| `p.parser(state)` | **no** | `public parser` constructor field — `parser.ts:30` |

`ParserState` is exported from the root barrel with a public constructor (`index.ts:3`, `state.ts:47-53`), and
`ParserState` even publishes `unsafeCall` / `unsafeCallRaw` (`state.ts:92-99`) as the sanctioned "choke point for
combinator plumbing". A consumer that originates a parse as `p.parser(new ParserState(src))` — or `p.call(...)` —
runs a memoized parser against whatever module-global tables happen to be installed. Two such runs over two
different sources at the same offset collide on the same `(id, offset)` key and the second mis-restores the
first: **PT-B1, the defect the 0.12.0 line called a correctness BLOCKER (`CHANGELOG.md:122`), resurrected through
the published surface.** There is no runtime guard, no assertion, no deprecation, and no line of documentation
forbidding raw entry. `CURRENT_SRC` (`packrat.ts:186`, set at `:433`) is retained explicitly as a "within-epoch
consistency anchor" but is never compared to anything — it cannot catch this.

*Falsifier* (UNRUN-BY-LAW — arms the latch; run in a fresh process):
`const p = memoize(regex(/[a-z]+/)); const a = new ParserState("hello"); p.parser(a); const b = new ParserState("world"); p.parser(b); console.log(b.value)` — prints `"world"` ⇒ **refuted, downgrade to MINOR (doc gap)**;
prints `"hello"` ⇒ confirmed.
*Reachability, stated honestly*: the band's own idiom law is "entry via `parseState` + `isError`"
(`parser-band.md:108`), so a disciplined consumer never trips this. The finding is that the invariant is
**unenforced and undocumented**, and its violation is a silent wrong answer rather than a throw. A reviewer who
judges the trigger unreachable should still hold the module defective on documentation grounds — the
requirement "memoized parsers may only be entered via `parse`/`parseState`" appears nowhere in `README.md`,
`docs/api.md`, `CHANGELOG.md`, or the module header.

### C-2 — BLOCKER — arming is a one-way, process-global, cross-consumer tax with no public opt-out

`packrat.ts:290` sets `PACKRAT_ARMED = true` inside `makeMemoized`, i.e. at **construction** of any memoized
wrapper. There is no assignment back to `false` anywhere — verified in source (`:156` is the only other mention,
the initializer) and in the shipped bundle (`dist/packrat-entry-CS1td-8B.js:678` init `false`, `:722` set `true`,
read at `:682` and `:714`; no third assignment). O-15 PT-03 measured the consequence:
**UNARMED 93.9 ns/parse → ARMED 138.2 = 1.47×, and `resetPackrat()` leaves 139.3** (`INBOX.md:77`).

The consumption defect is that the cost is **non-local and unrefusable**. One `memoize()` anywhere in the
process — a transitive dependency, a dev-only grammar, a test helper, a REPL line — permanently taxes every
unrelated parse by every unrelated consumer. The public API is arm-with-no-disarm: the only knob,
`resetPackrat()` (`:262-272`), clears three Maps and **cannot** disarm; worse, its own S.H1 early-return
(`:266 if (!PACKRAT_ARMED) return;`) means it is a no-op in exactly the state where disarming would be needed.

The tree concedes this in two places. The project's own gate has to spawn a child process to survive it:
"a single stray `memoize()` construction **ANYWHERE** in the process arms the latch … which would false-RED the
flat probe" (`scripts/proof-packrat-armed.mjs:13-21`). And the CHANGELOG withdraws the "made free" claim:
"the latch **never disarms**, so 'free' holds **only for memoize-free processes**" (`CHANGELOG.md:107-110`).
value.js's own RED-7 probe demonstrates the contamination with a parser that is never used —
`if (ARM) memoize(string("some-other-grammar-entirely"))` then benches an unrelated grammar
(`parsethat-surface-gaps.mjs:45-49`), and hard-codes the `resetPackrat() disarms?` row **RED**.

X·P has already made this a law: **O-8, "no operator reads or writes process-global mutable state … Arming,
memoization, and diagnostics are parameters of a parse, never latches" — naming PT-03 explicitly as the
counter-example (`W2.md:253-258`)** — and **K-6** kills any candidate with observable cross-parse state
(`W2.md:473`), with G-8's born-RED baseline being this exact 1.47× (`W2.md:784-788`).

*Falsifier* (UNRUN-BY-LAW): any assignment `PACKRAT_ARMED = false` in source or bundle, or a documented public
disarm, refutes. `grep -n "PACKRAT_ARMED" src/parse/packrat.ts dist/packrat-entry-*.js` shows init + one `true` +
two reads; nothing else. Alternatively, a measurement showing armed ≈ unarmed within noise on a modern runner
would demote the severity to MINOR — note W1's 2026-08-03 re-measure found UNARMED **55.6 ns** vs O-15's 93.9
(`W2.md:` G-7 born-RED block), so the *absolute* numbers are not portable; the **ratio** and the one-wayness are
the claim, not the nanoseconds.

### C-3 — MAJOR — `resetPackrat()` is a public mid-parse foot-gun the PT-Q1 cure did not close

PT-Q1's diagnosis (`packrat.ts:166-172`) is precise: a reset firing *during* a grow left `growLR` non-null-asserting
a just-deleted cell → `TypeError`. The cure moved the reset out of `memoizeFn` to the epoch boundary. But the
**public** `resetPackrat()` still clears the live tables unconditionally (`:267-271`), and the non-null assertions
it can invalidate are still there:

- `growLR` — `const seed = (MEMO.get(key)!.ans as Answer);` (`:396`) and `applyAnswer(state, MEMO.get(key)!.ans …)` (`:401`)
- `memoizeFn` — `const cell = MEMO.get(key)!;` (`:455`), mutated at `:463`

Every one of these runs with user code on the stack: `evalParser` (`:295-300`) invokes the wrapped parser, whose
body may contain a consumer `.map` (`parser.ts:146`), `.chain` (`:124`), `.mapState` (`:162`), or a `recover`
sync parser (`:653`) — any of which may call the exported `resetPackrat()`. The module header still *instructs*
consumers to do so: "resetting the caches per parse via `resetPackrat()`" (`packrat.ts:15`). That sentence was
made obsolete by PT-Q1 (the epoch now resets per top-level parse) and is now actively hazardous if a consumer
reads "per parse" as "inside the parse".

*Falsifier* (UNRUN-BY-LAW): build `const expr = memoize(Parser.lazy(() => all(expr, string("+"), digits).map(v => { resetPackrat(); return v; }).or(digits)));` and `expr.parse("1+2+3")`. No throw ⇒ refuted. A
`TypeError: Cannot read properties of undefined (reading 'ans')` at the `growLR` line ⇒ confirmed.

### C-4 — MAJOR — the only consumer-facing documentation of this module documents an API that does not exist

Both documented usages are **method** form:

- `README.md:307-310` — ``all(expression, operators.then(expression).opt()).mergeMemos().or(number)).memoize()``
- `docs/api.md:101` — ``### `memoize(): Parser<T>` `` , sited inside the `Parser<T>` **method** section (between
  `recover<S>(…)` at `:95` and `chain<S>(…)` at `:106`), arity zero.

The shipped class has neither. **MEASURED** above: `Parser.prototype` owns 25 properties (24 methods +
constructor) and `typeof Parser.prototype.memoize === "undefined"`, likewise `mergeMemos`. The real API is the
free function `memoize(parser)` (`packrat.ts:482`). A consumer following the README verbatim gets
`TypeError: … .memoize is not a function` on the *first line they write against this tier*. For a module whose
entire consumer population is "someone who read the README's left-recursion section", this is the whole
consumption surface being wrong.

*Falsifier*: `typeof Parser.prototype.memoize === "function"` ⇒ refuted. Measured `undefined`.

### C-5 — MAJOR — the one API sentence in `docs/api.md` describes behavior the module does not implement

`docs/api.md:103-104`: "Caches parse results by `(parserId, offset)` key. On cache hit, restores offset and
returns the cached value. Required for left-recursive grammars."

Against the source that is false in three ways, each consumer-visible:

1. A "cache hit" may return an **in-progress `LR` marker's growing seed**, not a cached value
   (`:470-473` → `applyAnswer(state, m.ans.seed)`), and that seed is *initialised to a FAILURE*
   (`:443-447` `isError: true`).
2. A "cache hit" may return a synthetic **ε (empty, non-advancing, `value: undefined`)** answer for a second
   occurrence of a growing head, even though nothing was ever cached at that key
   (`:315-332` — `cell === undefined`, yet a value is manufactured and returned). A consumer's `.map` receives
   `undefined` for a syntactically present occurrence, silently.
3. A cell may be **evicted and recomputed** on lookup when the parser is in the head's `evalSet`
   (`:349-360` — `head.evalSet.delete`, fresh `parser.parser(scratch)`, overwrite).

`mergeMemos` and `resetPackrat` are documented **nowhere** in `docs/api.md` (grep: the only hit in either doc
file is `api.md:101`), and the `./packrat` subpath is not mentioned in `README.md` or `docs/api.md` at all.

*Falsifier*: a doc revision, or a reading of `:315-332` under which the returned answer is "the cached value" —
`MEMO.get(key)` returned `undefined` on that branch by construction (`:315`), so there is none.

### C-6 — MAJOR — a zero-consumer tier promoted to a permanent package subpath, against the project's own precept

`scripts/proof-no-dead-combinator.mjs:9-13` states the precept as law: *"A never-importable export is not part of
the public contract; an export born one prior tranche with zero workspace consumers is dead by the precept."* The
consumer trees that gate sweeps are `parse-that/src`, `parse-that/test`, `../../value.js/src`,
`../../keyframes.js/src` (`:63-68`) — the exact sweep run in §1, which returns **zero non-test consumers** of
`memoize`/`mergeMemos`/`resetPackrat`. `thenMap` and `fuse` were DELETED on that reasoning.

This tier was instead **promoted**: `package.json` `exports["./packrat"]` (`:22-26`) makes it a permanent
subpath of the **1.0.0** line, with a dedicated build entry (`vite.config.ts` `packrat: "./src/parse/packrat-entry.ts"`)
and a dedicated gate that asserts its liveness (`test/subpath-gate.mjs:47-49`). Semver hygiene consequence: the
whole surface — including the `resetPackrat` foot-gun (C-3) and the latch semantics (C-2) — is frozen for all of
1.x; retiring it is now a **major** bump rather than the zero-BC-obligation delete it would have been in 0.13.0.

The CHANGELOG itself concedes the keep is speculative: "**The WDM/LR tier keep is PROVISIONAL** … The tier is
kept pending the bbnf-lang LR-consumer question (bbnf-lang is the one grammar-DSL that would exercise it); if
that consumer never materializes, a future cut may retire the tier" (`CHANGELOG.md:106-111`). There is no bbnf
module in `typescript/src/` (the whole tree is 18 files, `src/parse/**` only), and the Rust port — the project's
SOTA artifact — "omits left-recursion / packrat entirely" (`packrat.ts:12`).

*Falsifier*: one non-test consumer of `memoize`/`mergeMemos`/`resetPackrat` in any swept tree, or a landed
bbnf-lang module, refutes. Sweep found none; `find src -type f` lists 18 files, none bbnf.

### C-7 — MAJOR — dual-package hazard on a module whose entire contract is module-global state

Every subpath ships both `import` and `require` conditions (`package.json:8-31`). ESM and CJS are built as
**separate graphs with separate chunks**: `dist/packrat.js → packrat-entry-CS1td-8B.js` vs
`dist/packrat.cjs → packrat-entry-46NYx4_U.cjs`. Each carries its own copy of every module-global this design
depends on:

| global | ESM chunk | CJS chunk |
|---|---|---|
| `PACKRAT_ARMED` | `:678` | `:679` |
| `MEMO` / `HEADS` / `GROWING` | `:675,676,680` | (mirrored) |
| `PARSER_ID` (the memo key's high half) | `:850` | `:851` |

For a stateless combinator library duplication is merely wasteful. Here it is a correctness surface: (a) arming
one copy leaves the other unarmed, so a parser whose `parseState` lives in copy A gets no epoch while the
memoizer lives in copy B; and (b) **two independent `PARSER_ID` counters mint colliding ids**, and
`getCijKey(p, offset) = p.id * 2³² + offset` (`:99`) has no copy discriminator — two distinct parsers, one from
each copy, share memo cells if they meet in one table. The manifest manufactures the hazard; the module has no
defense against it.

*Falsifier* (UNRUN-BY-LAW): in one process, `const {Parser: E} = await import(".../dist/parse.js"); const {Parser: C} = require(".../dist/parse.cjs"); console.log(new E(f).id, new C(f).id)` — divergent, non-overlapping id
ranges refute; overlapping ranges confirm the collision precondition. (The second leg — that a memoized parse
actually crosses copies — requires arming and is not run.)

### C-8 — MAJOR — an in-parse `RangeError` whose trigger is an unresettable, unobservable process-global counter

`getCijKey` throws `RangeError` when `parser.id > MEMO_MAX_ID (≈2,097,151)` or `offset ≥ 2³²`
(`packrat.ts:90-98`). This is called from `memoizeFn` (`:437`) and `recall` (`:306`) — i.e. **during a parse**.
The library's contract everywhere else is failure-explicit-by-return (`parseState` sets `isError`,
`parser.ts:55`); this is the second class of in-parse throw on top of the PT-07 boundary `TypeError` already
filed in O-15 (`INBOX.md:77`).

The consumption sharpness is the trigger: `parser.id` comes from `PARSER_ID++`, a **process-global monotonic
counter** (`parser.ts:18,25`) that is never reset and is not readable from any export (`PARSER_ID` is
module-private; only per-instance `.id` is visible). A long-lived process that constructs parsers per unit of
work — a language server, a REPL, a server compiling user grammars per request — crosses ~2.1M and from that
point **every memoized parse throws, permanently, with no recovery path and no way to have seen it coming**.
The source calls this "unreachable for any realistic grammar/source" (`:92`), which is true per-grammar and
false per-process: the bound is on cumulative construction, not on grammar size. It is documented once, in
`CHANGELOG.md:136-141`, and in neither `README.md` nor `docs/api.md`.

*Falsifier*: an export or reset for `PARSER_ID`, or a per-parse/per-grammar id space, refutes. `grep -n PARSER_ID
src/parse/parser.ts` → `:18` declaration, `:25` increment; no export, no reset.

### C-9 — MINOR — `./packrat` is a name zone, not a payload zone: 40,576 bytes shipped to obtain three functions

`dist/packrat.js` is six lines that re-export `{m,i,k}` from `packrat-entry-CS1td-8B.js` — a **40,576-byte**
shared chunk that is the entire parser core. The packrat region within it is ~**5,670 bytes** (`:655-855`),
≈14 %. Symmetrically, `dist/core.js` imports the *same* chunk, so the "core" tier cannot shed the packrat module
either: `packratEnter`/`packratExit` and all five globals are retained for every `./core` consumer because
`Parser.parseState` references them (`parser.ts:43,47`).

The CHANGELOG asserts the split is the architecture: "parse-that is **not** zone-partitioned — the subpath export
map (`.` / `core` / `diagnostics` / `packrat` / `utils`) **IS** the zone map" (`CHANGELOG.md:101-103`). The built
artifact contradicts that at the payload level; the zoning is nominal. `sideEffects: false` (`package.json:5`)
does let a consumer bundler drop `makeMemoized`/`memoize`/`mergeMemos`/`getCijKey` by statement-level DCE, so the
residue for a non-packrat consumer is small — which is why this is MINOR and not MAJOR. The gate that "proves"
the split only checks that files exist and that `packrat.memoize` is a function (`test/subpath-gate.mjs:27-49`);
it asserts nothing about payload separation.

*Falsifier*: a per-tier chunk containing only that tier's code, or a measured `./core` bundle with zero packrat
bytes after DCE, refutes. `cat dist/core.js` line 1 imports `packrat-entry-CS1td-8B.js`.

### C-10 — MINOR — `getCijKey` is exported into a `.d.ts` no consumer can reach

`packrat.ts:79` exports `getCijKey`; neither entry re-exports it (`index.ts:8`, `packrat-entry.ts:5`), and
**MEASURED** above: `getCijKey` and `packratEnter` are `undefined` on the root barrel. Its sole consumer
deep-imports the source (`test/memoize.test.ts:3`). Yet it is emitted as a public declaration in
`dist/packrat.d.ts:2`, alongside `packratEnter`/`packratExit` — a typed surface that the `exports` map
(which publishes no `./dist/*` wildcard) makes unreachable. This is precisely the class the project deletes:
"a never-importable export is not part of the public contract" (`CHANGELOG.md:121-122`). The fix is `@internal`
or a test-only re-export, not a public `export`.

*Falsifier*: any consumer reaching `getCijKey` through the `exports` map refutes. There is no subpath that
resolves to `dist/packrat.js`-the-declaration; the `./packrat` `types` field points at `packrat-entry.d.ts`,
which re-exports exactly three names.

### C-11 — MINOR — the module header ships stale guidance that C-3 makes hazardous

`packrat.ts:13-15`: "a left-recursive grammar opts in by wrapping its recursive parser with `memoize()` /
`mergeMemos()` and **resetting the caches per parse via `resetPackrat()`**." PT-Q1 moved the reset to the epoch
boundary (`:174-181`, `parser.ts:43-48`), so per-parse resetting is now redundant at best; read as
"inside the parse", it is the C-3 crash. The header is the only design documentation this module has and it is
one revision behind its own fix.

*Falsifier*: a reading under which per-parse `resetPackrat()` is still required — `packratEnter` installs empty
tables on every top-level parse (`:225-229`), so it is not.

### C-12 — MINOR — the tier's ergonomics offer no scoping primitive, only a global one

There is no public "run this parse with a scoped packrat epoch" API: `packratEnter`/`packratExit` — the only
scoping mechanism that exists — are exported from `packrat.ts:216,243` but from **neither** published entry.
A consumer's entire vocabulary is `memoize` / `mergeMemos` / `resetPackrat`: arm globally, cache globally, clear
globally. Combined with C-2 this is the whole ergonomic complaint — the module offers process-scope where every
consumer need is parse-scope or parser-scope. (This is exactly what X·P O-8 legislates against; see §4.)

*Falsifier*: any exported per-parse or per-parser scoping handle. `index.ts:8` and `packrat-entry.ts:5` list three
names each; measured `packratEnter === undefined` on the barrel.

### C-13 — INFO — the RED-7 surface-gaps probe cannot run in this workspace; its packrat rows are inherited, not reproducible here

`docs/tranches/V/megatranche/prototypes/css-parser/parsethat-surface-gaps.mjs:11-13` imports
`"@mkbabb/parse-that"` and `"@mkbabb/parse-that/diagnostics"`. **MEASURED**: that specifier is
`ERR_MODULE_NOT_FOUND` from the value.js root, and `node_modules/@mkbabb/parse-that` does not exist — consistent
with W2's "Not in scope: adding `@mkbabb/parse-that` to `package.json`" (`W2.md:193-194`). The two packrat rows
it defines — `LATCH resetPackrat() disarms PACKRAT_ARMED?` (hard-coded RED, `:47`) and `LATCH PACKRAT_ARMED is a
module-global one-way flag` (`:48-49`, citing bundle `:678,:722`) — are therefore **inherited O-15 receipts**, not
locally reproducible evidence. This does not weaken C-2 (which I re-verified directly in source and bundle) but
it should be stated rather than left as an implied local measurement.

*Falsifier*: a successful `node docs/.../parsethat-surface-gaps.mjs` run in this workspace refutes. Measured
resolution failure above.

## 3. Superlatives (L-18 — the module earns these)

### S-1 — the float64-safe memo key with a fail-loud boundary is exemplary

`getCijKey` (`:79-100`) replaced a 32-bit signed shift that aliased silently at `id ≥ 4096`
(`getCijKey(4096,0) === getCijKey(0,0)`) with an exact float64 multiply-add, and it **documents the defect it
cures, the exact aliasing witness, and the arithmetic budget** (`:52-77`: 32-bit offset span, ≈2²¹ id headroom,
32+21=53). Where the budget runs out it throws rather than aliasing (`:90-98`). Choosing *fail-loud over
silently-wrong* at a numeric boundary, and writing the derivation in the source, is the standard the rest of the
audit should be held to. (C-8 is a complaint about *where* that throw surfaces to a consumer, not about the
choice.)
*Falsifier*: a source length or id count in realistic use that aliases under the new key — the span exceeds V8's
~512 MB (<2²⁹) string ceiling by three bits, so none exists.

### S-2 — the epoch save/restore is the right shape, in the right place, with the right unwind

`packratEnter`/`packratExit` (`:216-250`) snapshot **all five** globals and restore them, and the call site wraps
`parseStateInner` in `try/finally` (`parser.ts:43-48`). That makes nested top-level parses re-entrancy-sound
*and* leaves the parent uncorrupted on a throw, at the cost of one object per parse. `growLR` mirrors the
discipline internally with its own `try/finally` restoring `GROWING`/`HEADS` (`:390-406`). This is a genuinely
correct concurrency-of-recursion design, not a patch.
*Falsifier*: a global mutated inside an epoch and absent from `PackratEpoch` — the interface (`:196-202`) lists
`memo`, `heads`, `growing`, `lrStack`, `currentSrc`, and the module declares exactly those five
(`:133-135,186,193`). Set-equal.

### S-3 — arming at construction rather than first invocation is the subtle, correct ordering

`:284-290` arms in `makeMemoized`, and the reasoning at `:146-155` is right: arming at first *invocation* would
mean the first memoized parse's `packratEnter` had already returned `null`, so that parse would run epoch-less.
Construction-time arming is what keeps the armed path byte-identical. (The precondition "construction precedes
invocation" is violated by `Parser.lazy(() => memoize(…))`, since `createLazyCached` forces `fn()` at first parse
— `lazy.ts:21`. That is the *one* hole in an otherwise exactly-reasoned choice, and its consequence is retention,
not a wrong answer: the arming parse runs against pristine module-init tables, and every later parse gets a fresh
epoch. Worth a follow-up row; it does not diminish the design.)
*Falsifier*: an invocation-time arming that preserves byte-identity — none exists; the first memoized parse would
necessarily skip its epoch.

### S-4 — `proof:packrat-armed` is a gate that proves its own non-vacuity

`scripts/proof-packrat-armed.mjs` subclasses the global `Map` **before** importing the dist to count real
allocations (`:57-67`), asserts flat allocation over 5,000 parses (`:131-139`), and then spawns a **child process**
that deliberately arms the latch and asserts allocation *does* occur (`:141-155`) — proving both that the counter
is live and that the memoize-free isolation requirement genuinely bites. That is L-19 ("a gate must be able to
fail for its intended reason") met in-tree, by a project that also wrote down *why* it refused to gate on a
throughput percentage (`:29-32`, flake trap). It is also, read the other way, the tree's own written admission of
C-2.
*Falsifier*: a false-green path through the gate — the poison child closes the two obvious ones (dead counter,
broken latch).

## 4. What the X·P dual-target algebra would KEEP, WRAP, or RETIRE here

Read against `W2.md` §3b (laws), §3c (candidates), §6 (gates):

| element | verdict | authority |
|---|---|---|
| `memoize` / `mergeMemos` **as exported** | **RETIRE** | O-8 forbids operators that read/write process-global state (`W2.md:253-258`); K-6 kills observable cross-parse state (`:473`); the ruled-winner idiom gate is `memoize = 0` (`parser-band.md:134`, carried into G-10 `W2.md:810`) |
| `PACKRAT_ARMED` (the latch) | **RETIRE, named as the counter-example** | O-8 cites it by name — "a one-way `PACKRAT_ARMED` costing 1.47× forever, whose reset does not disarm, is a state machine with one absorbing state" (`W2.md:255-257`); it is G-8's pasted born-RED baseline (`:784-788`) |
| `resetPackrat` | **RETIRE** | a global clear is meaningless once memoization is a parse parameter; G-8 additionally requires "a state reset leaves no measurable residue" (`:780-781`), which the 139.3 ns reading fails |
| the `(id, offset)` **key algebra** | **KEEP — as a per-parse structure** | S-1's exactness and fail-loud boundary are reusable; AC-3's predicted failure (d) "**arena latch** — span-buffer reuse across parses is the PT-03 class" (`:366-368`) shows the successor still needs a position-keyed table, just one owned by the parse |
| `packratEnter`/`packratExit` (epoch save/restore) | **WRAP — promote to the parse-parameter boundary** | the mechanism is right (S-2); the defect is that it is one call site's private discipline (C-1). The algebra's answer is a context passed *into* the parse, so there is no boundary to bypass |
| `getCijKey`'s `RangeError` | **WRAP — convert to a value** | R-LAW-3 "diagnostics are values, never effects" (`:281-283`) and G-5's "zero throws … every rejection carries ≥1 diagnostic" (`:` G-5 block) both forbid an in-parse throw; the budget breach becomes a `ParseIssue`, not an exception |
| the WDM/LR **capability** | **RETIRE for the CSS lane; keep only if bbnf-lang lands** | the CHANGELOG already frames it as provisional pending exactly that consumer (`CHANGELOG.md:106-111`); W2's four candidates (AC-1..AC-4, `:313-385`) reach left-recursion by construction (typed-final signatures, closed IR, span algebra, hand-written siblings) — **none** needs a memo tier |

Net: of the module's 488 lines, the algebra keeps the **key arithmetic** and the **epoch shape** as ideas and
retires the **entire exported surface**. The honest reading is that `packrat.ts` is a well-engineered
implementation of a capability its declared downstream has already ruled itself out of using.

## 5. Explicit contradictions with the hitherto corpus

Where the tree disagrees with the record, the tree wins and the disagreement is stated (law):

1. **`CHANGELOG.md:116-117` (0.13.0): "value.js consumes the corrected packrat surface transitively."**
   FALSE against today's tree. value.js 4.0.0 `package.json` declares no `@mkbabb/parse-that` dependency in any
   field, the package is absent from `node_modules`, and `src/` mentions parse-that twice — both times to assert
   its absence (`src/subpaths/transform.ts:4`, `src/subpaths/math.ts:2`). The sentence may have been true at
   0.13.0; it is stale, and it is the sentence a reader would use to justify keeping the tier.
2. **`CHANGELOG.md:101-103` (r6 #6): "the subpath export map IS the zone map."** Contradicted at the payload
   level by the build (C-9): `dist/core.js`, `dist/packrat.js`, and `dist/utils.js` all import one 40,576-byte
   chunk. The zoning is nominal, not physical.
3. **`packrat.ts:15`: "resetting the caches per parse via `resetPackrat()`."** Contradicted by `:174-181` and
   `parser.ts:43-48` in the same tree — the epoch already resets per top-level parse (C-11).
4. **`docs/api.md:101` + `README.md:307-310`: `.memoize()` / `.mergeMemos()` as `Parser` methods.** Contradicted
   by measurement — `Parser.prototype` has neither (C-4).
5. **O-15 PT-03's absolute nanoseconds (93.9 / 138.2 / 139.3).** Not contradicted, but not portable: W1's
   2026-08-03 re-measure found UNARMED 55.6 ns on the same claim (`W2.md` G-7 born-RED block). C-2 is asserted on
   the **ratio and the one-wayness**, both re-verified in source and bundle here; the nanosecond triple is cited
   as the record's, not re-derived (epoch rule).

## 6. Ledger

| id | severity | claim | provenance |
|---|---|---|---|
| C-1 | BLOCKER | epoch soundness bound to 1 of 4 public invocation paths; PT-B1 reachable via `.parser`/`.call` | `packrat.ts:158-181`; `parser.ts:30,43,437`; `state.ts:47,92-99` |
| C-2 | BLOCKER | one-way process-global arming; cross-consumer tax, no disarm, no opt-out | `packrat.ts:156,266,290`; dist `:678,:682,:714,:722`; `proof-packrat-armed.mjs:13-21`; `INBOX.md:77` |
| C-3 | MAJOR | public `resetPackrat()` can crash a live grow (PT-Q1 shape, public route) | `packrat.ts:15,267-271,396,401,455,463` |
| C-4 | MAJOR | README + api.md document `Parser` methods that do not exist | `README.md:307-310`; `docs/api.md:101`; MEASURED prototype |
| C-5 | MAJOR | the one api.md semantics sentence is false in three ways | `docs/api.md:103`; `packrat.ts:315-332,349-360,443-447,470-473` |
| C-6 | MAJOR | zero-consumer tier frozen into a 1.x subpath, against the project's own dead-code precept | `proof-no-dead-combinator.mjs:9-13,63-68`; `package.json:22-26`; `CHANGELOG.md:106-111` |
| C-7 | MAJOR | dual-package hazard: two `PACKRAT_ARMED`, two `PARSER_ID`, keys with no copy discriminator | dist ESM `:678,850` vs CJS `:679,851`; `packrat.ts:99` |
| C-8 | MAJOR | in-parse `RangeError` triggered by an unresettable, unobservable global counter | `packrat.ts:90-98`; `parser.ts:18,25` |
| C-9 | MINOR | `./packrat` ships 40,576 B for 3 functions; `./core` cannot shed packrat | `dist/packrat.js`, `dist/core.js:1`; chunk 40,576 B / packrat region ~5,670 B |
| C-10 | MINOR | `getCijKey` public in source + `.d.ts`, unreachable from every entry | `packrat.ts:79`; `dist/packrat.d.ts:2`; `index.ts:8`; `packrat-entry.ts:5` |
| C-11 | MINOR | stale module-header guidance made hazardous by C-3 | `packrat.ts:15` |
| C-12 | MINOR | no parse-scoped or parser-scoped primitive on the public surface | `packrat.ts:216,243` vs `index.ts:8` |
| C-13 | INFO | the RED-7 probe is unrunnable here; its packrat rows are inherited receipts | `parsethat-surface-gaps.mjs:11-13`; MEASURED `ERR_MODULE_NOT_FOUND` |
| S-1 | SUPERLATIVE | float64-safe key + fail-loud budget, with the cured defect documented in source | `packrat.ts:52-100` |
| S-2 | SUPERLATIVE | five-global epoch snapshot/restore with correct `try/finally` unwind | `packrat.ts:196-250,390-406`; `parser.ts:43-48` |
| S-3 | SUPERLATIVE | arming at construction (not invocation) — the subtle correct ordering | `packrat.ts:146-155,284-290` |
| S-4 | SUPERLATIVE | a gate that proves its own non-vacuity via a poison child process | `proof-packrat-armed.mjs:57-67,131-155` |

**Counts**: 13 findings (2 BLOCKER · 6 MAJOR · 4 MINOR · 1 INFO) · 4 superlatives.

**Verdict on the axis.** As an *implementation* this module is above the tree's median (S-1..S-4). As a
*consumer-facing surface* it fails: it has no consumers, its documentation describes a different API, its only
public knob is a foot-gun, its cost is global and unrefusable, and the 1.0.0 cut froze all of that into the
major line at the moment the sole downstream had already ruled `memoize = 0`.
