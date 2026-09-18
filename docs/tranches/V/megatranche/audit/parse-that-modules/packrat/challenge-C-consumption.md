claude-opus-5[1m]

# CHALLENGE — `packrat` · axis C (CONSUMPTION)

**Subject**: `/Users/mkbabb/Programming/parse-that/typescript/src/parse/packrat.ts` (488 lines, read whole).
**Axis**: how this module serves its consumers — exported surface vs. actual consumption, the subpath
surface, API ergonomics, semver hygiene, and the X·P dual-target algebra's keep/wrap/retire verdict.
**Posture**: the module is assumed DEFECTIVE until the tree proves otherwise. Every claim below carries
severity + `file:line` + its own falsifier (L-18 runs both ways — the superlatives carry falsifiers too).

**Supersession note (2026-08-04).** This file supersedes an earlier same-axis pass at this path. All
thirteen findings of that pass (C-1..C-13) and all four superlatives are **retained verbatim in
substance and independently re-verified against the tree in this pass** — including its two
documentation findings (C-4, C-5), which I re-confirmed at `README.md:305-310` and `docs/api.md:101-104`
before carrying them. Five rows are **added** (C-14..C-18), one of which (C-15) promotes the earlier
pass's own S-3 parenthetical — "*worth a follow-up row*" — into the row it asked for. Numbering of
C-1..C-13 is held stable so sibling challenges and the harvest can cite across the two passes.

## 0. Method, bounds, and what was NOT run

**Read whole (read-only)**: `packrat.ts`; every module it imports — `parser.ts` (711), `state.ts` (189),
and transitively `lazy.ts` (43); the subpath entry `packrat-entry.ts` (5); the barrel `index.ts` (14);
the sibling entries `core.ts` (26), `diagnostics.ts`, `utils-entry.ts`;
`package.json`; `vite.config.ts`; the built `dist/{packrat.js,packrat.cjs,packrat.d.ts,packrat-entry.d.ts,parse.js,core.js,utils.js}`
and both shared chunks; `test/subpath-gate.mjs`, `test/memoize.test.ts`, `test/reentrancy.test.ts`,
`scripts/proof-no-dead-combinator.mjs`, `scripts/proof-packrat-armed.mjs`,
`scripts/proof-packrat-{cross-input,reentrant}.mjs`; `README.md` §"Combinator support";
`docs/api.md`; `typescript/CHANGELOG.md` §1.0.0/§0.13.0. Downstream: value.js `package.json` (+ its git
history), `src/css/index.ts`, `node_modules/@mkbabb/value.js/package.json`,
`docs/tranches/V/megatranche/prototypes/css-parser/parsethat-surface-gaps.mjs`.

**Corpus folded, not re-invented**: INBOX **O-15** (`docs/tranches/V/coordination/INBOX.md:77` — PT-01/PT-03/PT-04/PT-07
with dist line-cites); **X·P W2** (`docs/tranches/X/parse-that/waves/W2.md` — §3b O-8 `:253-258`, §3c AC-3(d) `:366-368`,
K-6 `:473`, K-8 `:478`, G-8 born-RED `:784-788`, G-10 `:810`, §11 row 4 `:335-337`); **parser-band**
(`registry/adjudicated/parser-band.md:17,108,134`).

**Deliberately NOT run** (law): nothing that arms packrat or diagnostics — the latch is one-way and a stray
`memoize()` poisons the process for every later measurement (the tree's own gate says so:
`scripts/proof-packrat-armed.mjs:13-21`). Consequently every dynamic claim below is either (a) measured on a
non-arming path and marked **MEASURED**, or (b) derived from source with a stated executable falsifier and marked
**UNRUN-BY-LAW**. No claim is presented as measured that was not.

**Non-arming measurements taken** (import + property read only; `memoize` is never constructed):

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

$ for f in parse core diagnostics packrat utils; do grep -c 'getCijKey\|packratEnter\|packratExit' dist/$f.js dist/$f.cjs; done
0 in all ten entry files
```

**Substrate receipt.** parse-that main checkout `ef10d5b` ("VALUEJS-PT-E"); `typescript/package.json`
version `1.0.0`; `dist/` mtimes 2026-07-29 (chunk `packrat-entry-CS1td-8B.js`, 40,576 B). value.js branch
`tranche-u`; `@mkbabb/value.js@4.0.0` resolved from `node_modules`. This tree's dist is **newer** than the
published dist O-15 measured (2026-07-27); where they could disagree I say so (C-13, §5.5).

**STOP-finding check (law)**: `ls /Users/mkbabb/Programming/parse-that-css-totality-p2` → `No such file or
directory`. The forbidden root is ABSENT and was not created. No `.worktrees/`, frozen root, or `~/Documents/Codex`
path was entered. `/Users/mkbabb/Programming/parse-that` was touched only by `git log`/`git show`/`grep`/`cat`/`sed`.
My only write is this file.

## 1. The consumption ground truth

The routing law (W2.md `:133`) names value.js the sole downstream: **parser → value → packed release**.
Measured against the tree, this module's consumption edge is **empty at every hop**:

| surface | exported at | consumed by | evidence |
|---|---|---|---|
| `memoize` | `packrat.ts:482`, barrel `index.ts:8`, subpath `packrat-entry.ts:5` | **zero** non-test callers in any swept tree | `grep -rln memoize` over `parse-that/typescript/{src,test,scripts}` → only `packrat*.ts`, `index.ts`, `state.ts` (a name string), 2 test files, 4 proof scripts |
| `mergeMemos` | `packrat.ts:486` + both entries | **zero** non-test callers | same sweep; and it is not a distinct function (C-14) |
| `resetPackrat` | `packrat.ts:262` + both entries | **zero** non-test callers | same sweep |
| `getCijKey` | `packrat.ts:79` | 1 test, via a **source** deep-import | `test/memoize.test.ts:3` — `from "../src/parse/packrat.js"`, not the package surface |
| `packratEnter` / `packratExit` | `packrat.ts:216,243` | `parser.ts:43,47` only | legitimate internal edge |

**value.js does not depend on `@mkbabb/parse-that` at all — and the dependency was deleted, not merely
unused.** `git log -S"parse-that" -- package.json` names the event: **`164343c1`**
*"feat(v4)!: value 4.0 producer surface + packed-surface gate; retire pre-v4 src trees"*, whose diff carries
`-        "@mkbabb/parse-that": "^1.0.0"`. Today `grep -c parse-that package.json` → **0**; `dependencies` =
`{"@mkbabb/glass-ui":"^7.0.0","@mkbabb/keyframes.js":"^6.0.0"}`; no peer, no optional, no dev entry; the
package is not installed (`node_modules/@mkbabb/` holds `glass-ui`, `keyframes.js`, `value.js` only).
value.js has no `src/parsing/` directory any more (`find src -type d` → `src/{css,color,foundation,transform,subpaths}`);
the only two occurrences of the string "parse-that" in `src/` are prose asserting the dependency's *absence*
(`src/subpaths/transform.ts:4`, `src/subpaths/math.ts:2` — "parse-that-FREE"). value.js ships its own
hand-written `src/css/grammar.ts` behind the 52-export `/css` surface (`src/css/index.ts:1-35` types = 33,
`:36-60` runtime = 19).

**The packed release carries zero packrat bytes.** `node_modules/@mkbabb/value.js/package.json` → version
`4.0.0`, `dependencies: undefined`; `grep -rl 'parse-that\|PACKRAT_ARMED\|mergeMemos' node_modules/@mkbabb/value.js/dist/`
→ empty.

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

**The tree demonstrates the hazard on itself.** `test/reentrancy.test.ts:196-212` — the >1 MiB memo test —
builds `memoize(regex(/[ab]/))`, constructs `new ParserState(src)` by hand, and calls **`letter.parser(st0)`**
twice, raw and epochless. It is correct only because the test calls `resetPackrat()` manually at `:197`. The
library's own suite therefore encodes the caller discipline that 0.12.0 advertised removing —
`memoize.test.ts:137` labels PT-B1 "*the BLOCKER — no `resetPackrat` discipline*".

*Falsifier* (UNRUN-BY-LAW — arms the latch; run in a fresh process):
`const p = memoize(regex(/[a-z]+/)); const a = new ParserState("hello"); p.parser(a); const b = new ParserState("world"); p.parser(b); console.log(b.value)` — prints `"world"` ⇒ **refuted, downgrade to MINOR (doc gap)**;
prints `"hello"` ⇒ confirmed.
*Reachability, stated honestly*: the band's own idiom law is "entry via `parseState` + `isError`"
(`parser-band.md:108`), so a disciplined consumer never trips this. The finding is that the invariant is
**unenforced and undocumented**, and its violation is a silent wrong answer rather than a throw. A reviewer who
judges the trigger unreachable should still hold the module defective on documentation grounds — the
requirement "memoized parsers may only be entered via `parse`/`parseState`" appears nowhere in `README.md`,
`docs/api.md`, `CHANGELOG.md`, or the module header, while the library's own test file uses the forbidden entry.

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
(`parsethat-surface-gaps.mjs:44-47`), and hard-codes the `resetPackrat() disarms?` row **RED**.

X·P has already made this a law: **O-8, "no operator reads or writes process-global mutable state … Arming,
memoization, and diagnostics are parameters of a parse, never latches" — naming PT-03 explicitly as the
counter-example (`W2.md:253-258`)** — and **K-6** kills any candidate with observable cross-parse state
(`W2.md:473`), with G-8's born-RED baseline being this exact 1.47× (`W2.md:784-788`) and W2 §11 row 4 carrying
it as one of the five named scars, "*K-6 kills the class, not the instance*" (`W2.md:335-337`).

*Falsifier* (UNRUN-BY-LAW): any assignment `PACKRAT_ARMED = false` in source or bundle, or a documented public
disarm, refutes. `grep -n "PACKRAT_ARMED" src/parse/packrat.ts dist/packrat-entry-*.js` shows init + one `true` +
two reads; nothing else. Alternatively, a measurement showing armed ≈ unarmed within noise on a modern runner
would demote the severity to MINOR — note W1's 2026-08-03 re-measure found UNARMED **55.6 ns** vs O-15's 93.9
(`W2.md:772-774`), so the *absolute* numbers are not portable; the **ratio** and the one-wayness are
the claim, not the nanoseconds.

### C-3 — MAJOR — `resetPackrat()` is a public mid-parse foot-gun the PT-Q1 cure did not close, and a no-op everywhere else

PT-Q1's diagnosis (`packrat.ts:166-172`) is precise: a reset firing *during* a grow left `growLR` non-null-asserting
a just-deleted cell → `TypeError`. The cure moved the reset out of `memoizeFn` to the epoch boundary. But the
**public** `resetPackrat()` still clears the live tables unconditionally (`:267-271`), and the non-null assertions
it can invalidate are still there:

- `growLR` — `const seed = (MEMO.get(key)!.ans as Answer);` (`:396`) and `applyAnswer(state, MEMO.get(key)!.ans …)` (`:401`)
- `memoizeFn` — `const cell = MEMO.get(key)!;` (`:455`), mutated at `:463`

Every one of these runs with user code on the stack: `evalParser` (`:295-300`) invokes the wrapped parser, whose
body may contain a consumer `.map` (`parser.ts:146`), `.chain` (`:124`), `.mapState` (`:162`), or a `recover`
sync parser (`:653`) — any of which may call the exported `resetPackrat()`. The module header still *instructs*
consumers to do so: "resetting the caches per parse via `resetPackrat()`" (`packrat.ts:15`).

**The other arm is equally bad: outside a parse the function does nothing.** Since `packratEnter` installs fresh
tables at every top-level parse (`:225-229`) and `packratExit` restores the parent's (`:245-249`), the
module-root tables are already empty between top-level parses — so a `resetPackrat()` call on the documented
entry path clears nothing. One third of the served subpath surface is therefore a no-op on the documented entry
and a crash-generator off it; its only load-bearing use is repairing C-1's raw-entry hazard, which is documented
nowhere. Every in-repo call site sits between parses (`memoize.test.ts:14,67,91,108,120`;
`reentrancy.test.ts:104,197`), so the test suite exercises only the no-op arm — except `reentrancy.test.ts:197`,
which is load-bearing precisely because that test uses the raw entry (C-1).

*Falsifier* (UNRUN-BY-LAW, crash arm): build `const expr = memoize(Parser.lazy(() => all(expr, string("+"), digits).map(v => { resetPackrat(); return v; }).or(digits)));` and `expr.parse("1+2+3")`. No throw ⇒ refuted. A
`TypeError: Cannot read properties of undefined (reading 'ans')` at the `growLR` line ⇒ confirmed.
*Falsifier* (no-op arm): exhibit one `resetPackrat()` call on the `parse`/`parseState` path that changes an
observable outcome. I found none in `src/`, `test/`, or `scripts/`.

### C-4 — MAJOR — the only consumer-facing documentation of this module documents an API that does not exist

Both documented usages are **method** form:

- `README.md:305-310` — ``all(expression, operators.then(expression).opt()).mergeMemos().or(number)).memoize()``
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
whole surface — including the `resetPackrat` foot-gun (C-3), the `mergeMemos` alias (C-14), and the latch
semantics (C-2) — is frozen for all of 1.x; retiring it is now a **major** bump rather than the
zero-BC-obligation delete it would have been in 0.13.0.

The CHANGELOG itself concedes the keep is speculative: "**The WDM/LR tier keep is PROVISIONAL** … The tier is
kept pending the bbnf-lang LR-consumer question (bbnf-lang is the one grammar-DSL that would exercise it); if
that consumer never materializes, a future cut may retire the tier" (`CHANGELOG.md:106-111`). There is no bbnf
module in `typescript/src/` (the whole tree is 18 files, `src/parse/**` only), and the Rust port — the project's
SOTA artifact — "omits left-recursion / packrat entirely" (`packrat.ts:12`). **The named consumer does not
consume it either**: `/Users/mkbabb/Programming/bbnf-lang/package.json` exists and carries no `parse-that`
dependency (`grep -n parse-that` → no match), and `grep -rn 'memoize\|mergeMemos\|resetPackrat'` over
`bbnf-lang/src` → no match. The tree's own stated condition for retirement is therefore already met.

*Falsifier*: one non-test consumer of `memoize`/`mergeMemos`/`resetPackrat` in any swept tree, or a landed
bbnf-lang LR consumer, refutes. Sweep found none; `find src -type f` lists 18 files, none bbnf; bbnf-lang's
manifest and sources are clean of the package.

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
memoizer lives in copy B — **which is C-1's silent-staleness reached without ever touching the raw entry**; and
(b) **two independent `PARSER_ID` counters mint colliding ids**, and
`getCijKey(p, offset) = p.id * 2³² + offset` (`:99`) has no copy discriminator — two distinct parsers, one from
each copy, share memo cells if they meet in one table. The manifest manufactures the hazard; the module has no
defense against it; and `sideEffects: false` (`package.json:5`) advertises the opposite posture — that module
identity does not matter here.

**Ungated.** All four packrat proof gates import `dist/parse.js` and only `dist/parse.js`
(`proof-packrat-cross-input.mjs:20,27`; `proof-packrat-reentrant.mjs:26,33`; `proof-packrat-armed.mjs:47`;
`proof-packrat-large-offset.mjs`). `test/subpath-gate.mjs:44-56` loads `./core` and `./packrat` but asserts only
`typeof … === "function"` on three names — it never runs a parse, never touches CJS, and cannot observe a split
latch. No gate in the repository can fail for this reason.

*Falsifier* (UNRUN-BY-LAW): in one process, `const {Parser: E} = await import(".../dist/parse.js"); const {Parser: C} = require(".../dist/parse.cjs"); console.log(new E(f).id, new C(f).id)` — divergent, non-overlapping id
ranges refute; overlapping ranges confirm the collision precondition. (The second leg — that a memoized parse
actually crosses copies — requires arming and is not run.) *Reachability*: a consumer that never mixes
`require()` and `import` of this package is inert to C-7; that constraint is documented nowhere.

### C-8 — MAJOR — an in-parse `RangeError` whose trigger is an unresettable, unobservable process-global counter

`getCijKey` throws `RangeError` when `parser.id > MEMO_MAX_ID (≈2,097,151)` or `offset ≥ 2³²`
(`packrat.ts:90-98`). This is called from `memoizeFn` (`:437`) and `recall` (`:306`) — i.e. **during a parse**.
The library's contract everywhere else is failure-explicit-by-return (`parseState` sets `isError`,
`parser.ts:55`); this is the second class of in-parse throw on top of the PT-07 boundary `TypeError` already
filed in O-15 (`INBOX.md:77`). It is the **K-8** class — "any throw on any universe/R1 corpus row" (`W2.md:478`).

The consumption sharpness is the trigger: `parser.id` comes from `PARSER_ID++`, a **process-global monotonic
counter** (`parser.ts:18,25`) that is never reset and is not readable from any export (`PARSER_ID` is
module-private; only per-instance `.id` is visible). A long-lived process that constructs parsers per unit of
work — a language server, a REPL, a server compiling user grammars per request — crosses ~2.1M and from that
point **every memoized parse throws, permanently, with no recovery path and no way to have seen it coming**.
The source calls this "unreachable for any realistic grammar/source" (`:92`), which is true per-grammar and
false per-process: the bound is on cumulative construction, not on grammar size — at the module's own estimate
of a few thousand parsers per CSS grammar build (`:69`), ~1,050 rebuilds exhaust it. It is documented once, in
`CHANGELOG.md:136-141`, and in neither `README.md` nor `docs/api.md`.

*Falsifier*: an export or reset for `PARSER_ID`, or a per-parse/per-grammar id space, refutes. `grep -n PARSER_ID
src/parse/parser.ts` → `:18` declaration, `:25` increment; no export, no reset. `index.ts:1-14`, `core.ts:7-26`,
`packrat-entry.ts:5`, `utils-entry.ts`, `diagnostics.ts` expose no budget query.

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
residue for a non-packrat consumer is small — which is why this is MINOR and not MAJOR. What DCE cannot drop is
the module-init state: `let MEMO/HEADS/GROWING = new Map()` (`:675,676,680`) and `PACKRAT_ARMED` (`:678`) are
live because `packratEnter` reads them. The gate that "proves" the split only checks that files exist and that
`packrat.memoize` is a function (`test/subpath-gate.mjs:27-49`); it asserts nothing about payload separation.

*Falsifier*: a per-tier chunk containing only that tier's code, or a measured `./core` bundle with zero packrat
bytes after DCE, refutes. `cat dist/core.js` line 1 imports `packrat-entry-CS1td-8B.js`.

### C-10 — MINOR — `getCijKey` is exported into a `.d.ts` no consumer can reach, and `PackratEpoch` is unnameable

`packrat.ts:79` exports `getCijKey`; neither entry re-exports it (`index.ts:8`, `packrat-entry.ts:5`), and
**MEASURED** above: `getCijKey` and `packratEnter` are `undefined` on the root barrel, and all three appear in
**0 of 10** built entry files. Its sole consumer deep-imports the source (`test/memoize.test.ts:3`). Yet it is
emitted as a public declaration in `dist/packrat.d.ts:2`, alongside `packratEnter`/`packratExit` — a typed
surface that the `exports` map (which publishes no `./dist/*` wildcard) makes unreachable. This is precisely the
class the project deletes: "a never-importable export is not part of the public contract" (`CHANGELOG.md:121-122`).

Compounding it: `dist/packrat.d.ts` declares `packratEnter(): PackratEpoch | null` while `PackratEpoch` itself is
**not exported** (`packrat.ts:196`, and the emitted `.d.ts` ends in a bare `export {}`). Even a consumer who
reached the function could not name its return type without `ReturnType<typeof packratEnter>`. The fix is
`@internal` or a test-only re-export, not a public `export`.

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
tables on every top-level parse (`:225-229`), so it is not. (It *is* required on the raw entry — C-1 — which is
the one thing the sentence does not say.)

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
with W2's "Not in scope: adding `@mkbabb/parse-that` to `package.json`" (`W2.md:193-194`) and with the
`164343c1` deletion (§1). The two packrat rows it defines — `LATCH resetPackrat() disarms PACKRAT_ARMED?`
(hard-coded RED, `:47`) and `LATCH PACKRAT_ARMED is a module-global one-way flag` (`:48-49`, citing bundle
`:678,:722`) — are therefore **inherited O-15 receipts**, not locally reproducible evidence. This does not weaken
C-2 (which I re-verified directly in source and bundle) but it should be stated rather than left as an implied
local measurement. See also C-17: even if it could run, one of those two rows can never fire.

*Falsifier*: a successful `node docs/.../parsethat-surface-gaps.mjs` run in this workspace refutes. Measured
resolution failure above.

### C-14 — MAJOR — `mergeMemos` is a pure alias of `memoize`: two of the three served exports are one function

`memoize` (`:482-484`) and `mergeMemos` (`:486-488`) both call `makeMemoized(parser, name)` with a `name` that
reaches exactly one place — `createParserContext(name, p)` at `:479`. The docblock concedes it:
"*they differ only in the `name` recorded on the parser context*" (`:274-278`). And `context.name` is read in
only two places in the entire library: `debug.ts:365` (`parser.context.name ?? ""`, a printer) and
`parser.ts:488` (`=== "whitespace"`). Neither is on the memoization path. `grep -rn 'mergeMemo' src/` outside
`packrat.ts` returns only the two re-export lines and the display string at `state.ts:151`.

So the `/packrat` subpath's three-name surface reduces to: one real function (`memoize`), one alias of it under a
name that promises something else, and one no-op/foot-gun (C-3). A consumer choosing `mergeMemos` because the
name suggests memo-table merging gets `memoize` with a different debug label — and the docblock's justification
("a head and the alternation merged into it cooperate at the same (id, offset) cells", `:276-278`) is true of
**both** functions and of neither differentially. `memoize.test.ts:58` is the only use, inside a math grammar,
with no assertion that distinguishes it from `memoize`.

**Semver consequence**: C-6 froze this alias into the 1.x line, so removing the redundant name is now a major bump.

*Falsifier*: exhibit any parser `p` and input `s` with `memoize(p).parse(s) !== mergeMemos(p).parse(s)`, or any
read of `context.name` that alters memoization behavior. The code paths are byte-identical modulo one string
literal.

### C-15 — MAJOR — the first-parse arming window retains a parse's memo tables and its entire source string for the process lifetime

The latch arms at **construction** (`:290`); `packratEnter` reads it at **parse entry** (`:217`). If the first
memoizer is constructed *during* a parse, the read has already happened. `Parser.lazy` makes this the normal
idiom for exactly the grammars this module exists to serve: `createLazyCached` forces the thunk on first
invocation, i.e. mid-parse (`lazy.ts:18-24`; `parser.ts:702-707`). A consumer writing
`Parser.lazy(() => memoize(inner))` — a lazy back-edge — hits the window on parse #1:

1. `packratEnter` returned `null` (`:217`), so **no epoch was opened** for that parse.
2. `memoizeFn` then writes cells into the module-root `MEMO` and sets `CURRENT_SRC = state.src` (`:433-435`).
3. `packratExit(null)` returns early (`:244`) and restores nothing.

Consequence: the module-root tables permanently retain that parse's cells — each `Answer` holding a `value`
(`:103-107`), each `LR` holding a `Parser` reference (`:110-115`) — and `CURRENT_SRC` retains the **whole source
string**. Those cells are thereafter unreachable *and* unreclaimable: every later parse installs fresh tables
(`:225-229`), and the root map is faithfully snapshotted (`:219`) and restored (`:245`) at every epoch boundary,
so it stays live by reference and is never consulted again. Only a manual `resetPackrat()` frees it — which is C-3's
otherwise-dead function, and this use is documented nowhere.

This is the row the earlier pass's S-3 flagged as "*worth a follow-up row*"; filed here. It is **retention, not a
wrong answer** — the arming parse runs against pristine module-init tables, so no stale cell is ever served —
which is why it is MAJOR and not BLOCKER.

*Falsifier*: construct every memoizer before the first parse and the window is closed; the leak is then zero, and
the bound in any case is one parse's cells plus one source string per process. `proof:packrat-armed` cannot see
it — its POISON child arms *before* the measuring window (`proof-packrat-armed.mjs:96-100`), the safe ordering.

### C-16 — MINOR — `core.ts` states an isolation guarantee the build falsifies twice

`core.ts:3-6` tells consumers, in the subpath entry's own docblock: "*A consumer that imports only this never
pulls the diagnostics accumulator, the packrat tier, or the json/csv domain parsers.*" The build contradicts two
of the three:

- `dist/core.js:1` — `import { P, a, b, c, … } from "./packrat-entry-CS1td-8B.js";` — the chunk **is** the packrat
  tier (`MEMO`/`HEADS`/`GROWING` at `:675,676,680`, `PACKRAT_ARMED` at `:678`, `makeMemoized` at `:721`,
  `memoize`/`mergeMemos` at `:844`/`:847`).
- `dist/packrat-entry-CS1td-8B.js:1` — `import { i as isDiagnosticsEnabled, m as mergeErrorState, … } from "./diagnostics-DDazRHgl.js";` — so the chunk drags the diagnostics accumulator in behind it.

C-9 records the payload consequence; this row records the **documented claim**, which is the consumption-axis
harm: a consumer picks `./core` *because the docblock promised isolation*. Nothing gates the promise —
`test/subpath-gate.mjs` checks file existence and three `typeof`s. The coupling is structural (`parser.ts:7`
imports `packratEnter`/`packratExit` unconditionally), so it cannot be fixed by re-chunking alone.

*Falsifier*: exhibit a `./core` resolution that does not pull `packrat-entry-*.js`, or a diagnostics-free packrat
chunk. Neither exists in `dist/`.

### C-17 — MINOR — value.js's own RED-7 instrument carries a packrat row that can never fire

`parsethat-surface-gaps.mjs:48` reads
`row(!ARM ? false : false, "LATCH   PACKRAT_ARMED is a module-global one-way flag", …)` — the predicate is
`false` in **both** branches, so the row is unconditionally `ok` and can never contribute a RED. That is L-19
violated in the instrument ("a gate must be able to fail for its intended reason"). Its sibling at `:47` is
hard-coded `row(true, …)` but is guarded by `if (ARM)`, so it fires only under `--arm`.

Net: of the script's nine rows, two touch packrat; under the default (shipping-posture) invocation the module
contributes **zero** RED rows — the 1.47× tax and the one-way latch are invisible to the instrument unless the
operator passes `--arm`, which is the act this audit's law forbids. The module's RED-7 footprint is therefore
`--arm`-only and, at `:48`, unfalsifiable by construction.

*Falsifier*: run with and without `--arm` and diff row `:48`'s status — identical `ok` both ways by construction.
(Not executed: arming is forbidden, and per C-13 the script cannot resolve its import here anyway — which is
itself evidence that this instrument's only packrat-sensitive row is unrunnable under audit conditions.)

### C-18 — MINOR — semver attention is spent on the unreachable surface while the served behaviour change is filed as perf

`CHANGELOG.md:39-41` documents a "**Type ripple**" — `packratEnter()` now returns `PackratEpoch | null`,
`packratExit(saved)` null-guards, `resetPackrat()` early-returns when unarmed. Two of those three functions are
reachable by **no consumer** (C-10), and the third's type did not change. Meanwhile the change that *is*
observable on the served surface — that after the epoch model `resetPackrat()` clears nothing on the documented
entry (C-3), inverting the instruction still printed at `packrat.ts:15` (C-11) — is filed under
"**Performance**" (`CHANGELOG.md:18`), not as a surface retirement or a documentation correction. A consumer
reading the 1.0.0 notes to decide whether their `resetPackrat()` calls still mean anything gets no answer.

*Falsifier*: name a consumer whose types broke on the `PackratEpoch | null` ripple — per C-10 none can exist. Or
point at a CHANGELOG line stating that `resetPackrat()` is now a no-op on the `parse`/`parseState` path; I found
none across §1.0.0 and §0.13.0.

## 3. Superlatives (L-18 — the module earns these)

### S-1 — the float64-safe memo key with a fail-loud boundary is exemplary

`getCijKey` (`:79-100`) replaced a 32-bit signed shift that aliased silently at `id ≥ 4096`
(`getCijKey(4096,0) === getCijKey(0,0)`) with an exact float64 multiply-add, and it **documents the defect it
cures, the exact aliasing witness, and the arithmetic budget** (`:52-77`: 32-bit offset span, ≈2²¹ id headroom,
32+21=53). The key is provably injective inside the budget — the two components cannot carry into each other,
and the sum stays ≤ 2⁵³−1. Where the budget runs out it throws rather than aliasing (`:90-98`). Both former
hazards are pinned by tests: `memoize.test.ts:161` (the int32 overflow) and `reentrancy.test.ts:196-212` (the
>1 MiB cross-offset case). Choosing *fail-loud over silently-wrong* at a numeric boundary, and writing the
derivation in the source, is the standard the rest of the audit should be held to. (C-8 is a complaint about
*where* that throw surfaces to a consumer, not about the choice.)
*Falsifier*: a source length or id count in realistic use that aliases under the new key — the span exceeds V8's
~512 MB (<2²⁹) string ceiling by three bits, so none exists.

### S-2 — the epoch save/restore is the right shape, in the right place, with the right unwind

`packratEnter`/`packratExit` (`:216-250`) snapshot **all five** globals and restore them, and the call site wraps
`parseStateInner` in `try/finally` (`parser.ts:43-48`). That makes nested top-level parses re-entrancy-sound
*and* leaves the parent uncorrupted on a throw, at the cost of one object per parse. `growLR` mirrors the
discipline internally with its own `try/finally` restoring `GROWING`/`HEADS` (`:390-406`). This is a genuinely
correct concurrency-of-recursion design, not a patch — and it is why C-3's crash arm stays contained to the
throwing parse.
*Falsifier*: a global mutated inside an epoch and absent from `PackratEpoch` — the interface (`:196-202`) lists
`memo`, `heads`, `growing`, `lrStack`, `currentSrc`, and the module declares exactly those five
(`:133-135,186,193`). Set-equal. Or a throw path exiting `growLR`/`parseState` without passing a `finally` —
there is none in either file.

### S-3 — arming at construction rather than first invocation is the subtle, correct ordering

`:284-290` arms in `makeMemoized`, and the reasoning at `:146-155` is right: arming at first *invocation* would
mean the first memoized parse's `packratEnter` had already returned `null`, so that parse would run epoch-less.
Construction-time arming is what keeps the armed path byte-identical. (The precondition "construction precedes
invocation" is violated by `Parser.lazy(() => memoize(…))`, since `createLazyCached` forces `fn()` at first parse
— `lazy.ts:21`. That is the *one* hole in an otherwise exactly-reasoned choice; it is now filed as **C-15**, and
its consequence is retention, not a wrong answer. It does not diminish the design.)
*Falsifier*: an invocation-time arming that preserves byte-identity — none exists; the first memoized parse would
necessarily skip its epoch.

### S-4 — `proof:packrat-armed` is a gate that proves its own non-vacuity

`scripts/proof-packrat-armed.mjs` subclasses the global `Map` **before** importing the dist to count real
allocations (`:57-67`), asserts flat allocation over 5,000 parses (`:131-139`), and then spawns a **child process**
that deliberately arms the latch and asserts allocation *does* occur (`:141-155`) — proving both that the counter
is live and that the memoize-free isolation requirement genuinely bites. That is L-19 ("a gate must be able to
fail for its intended reason") met in-tree, by a project that also wrote down *why* it refused to gate on a
throughput percentage (`:29-32`, flake trap). It is also, read the other way, the tree's own written admission of
C-2. The contrast with C-17 — value.js's own probe carrying a row that cannot fire — is instructive in both
directions.
*Falsifier*: a false-green path through the gate — the poison child closes the two obvious ones (dead counter,
broken latch).

## 4. What the X·P dual-target algebra would KEEP, WRAP, or RETIRE here

Read against `W2.md` §3b (laws), §3c (candidates), §6 (gates):

| element | verdict | authority |
|---|---|---|
| `memoize` **as exported** | **RETIRE** | O-8 forbids operators that read/write process-global state (`W2.md:253-258`); K-6 kills observable cross-parse state (`:473`); the ruled-winner idiom gate is `memoize = 0` (`parser-band.md:134`, carried into G-10 `W2.md:810`) |
| `mergeMemos` | **RETIRE — twice over** | it is not a distinct operator (C-14), so it fails the algebra's closed-enumeration discipline before O-8 is even reached: a "closed, enumerated operator set" (`W2.md:139-142`) cannot contain two names for one operation |
| `PACKRAT_ARMED` (the latch) | **RETIRE, named as the counter-example** | O-8 cites it by name — "a one-way `PACKRAT_ARMED` costing 1.47× forever, whose reset does not disarm, is a state machine with one absorbing state" (`W2.md:255-257`); it is G-8's pasted born-RED baseline (`:784-788`) and W2 §11 scar #4 (`:335-337`) |
| `resetPackrat` | **RETIRE** | a global clear is meaningless once memoization is a parse parameter; G-8 additionally requires "a state reset leaves no measurable residue" (`:780-781`), which the 139.3 ns reading fails; and C-3 shows it is already a no-op on the documented path |
| the `(id, offset)` **key algebra** | **KEEP — as a per-parse structure** | S-1's exactness and fail-loud boundary are reusable; AC-3's predicted failure (d) "**arena latch** — span-buffer reuse across parses is the PT-03 class" (`:366-368`) shows the successor still needs a position-keyed table, just one owned by the parse |
| `packratEnter`/`packratExit` (epoch save/restore) | **WRAP — promote to the parse-parameter boundary** | the mechanism is right (S-2); the defect is that it is one call site's private discipline (C-1) that a second module copy can silently skip (C-7). The algebra's answer is a context passed *into* the parse, so there is no boundary to bypass and no copy to desynchronise |
| `getCijKey`'s `RangeError` | **WRAP — convert to a value** | R-LAW-3 "diagnostics are values, never effects" (`:281-283`) and K-8's zero-throw clause (`:478`) both forbid an in-parse throw; the budget breach becomes a `ParseIssue`, not an exception — and the id space becomes parse-local, closing C-8's trigger |
| the WDM/LR **capability** | **RETIRE for the CSS lane; the tree's own retirement condition is met** | the CHANGELOG frames the keep as provisional pending a bbnf-lang consumer (`CHANGELOG.md:106-111`) — that consumer's manifest carries no `parse-that` dependency (C-6); W2's four candidates (AC-1..AC-4, `:313-385`) reach left-recursion by construction (typed-final signatures, closed IR, span algebra, hand-written siblings) — **none** needs a memo tier |

Net: of the module's 488 lines, the algebra keeps the **key arithmetic** and the **epoch shape** as ideas and
retires the **entire exported surface**. The honest reading is that `packrat.ts` is a well-engineered
implementation of a capability its declared downstream has already ruled itself out of using — and whose three
served names reduce, on inspection, to one real operator.

## 5. Explicit contradictions with the hitherto corpus

Where the tree disagrees with the record, the tree wins and the disagreement is stated (law):

1. **`CHANGELOG.md:116-119` (0.13.0): "value.js consumes the corrected packrat surface transitively."**
   FALSE against today's tree, and falsified by a nameable event: `164343c1` *"feat(v4)!: value 4.0 producer
   surface + packed-surface gate"* deleted `"@mkbabb/parse-that": "^1.0.0"` from value.js's `package.json`. Today
   the manifest has zero occurrences, the package is absent from `node_modules`, the packed `@mkbabb/value.js@4.0.0`
   declares `dependencies: undefined`, and `src/` mentions parse-that twice — both times to assert its absence
   (`src/subpaths/transform.ts:4`, `src/subpaths/math.ts:2`). The sentence may have been true at 0.13.0; it is
   stale, and it is the sentence a reader would use to justify keeping the tier.
2. **`CHANGELOG.md:14-16` (1.0.0): the "single external SPINE — 1.0.0 reaches keyframes.js ONLY via value.js's
   `^1.0.0`-carrying 2.0.x follow-on".** The spine is **broken at the carrier hop**: value.js no longer carries
   `^1.0.0` in any field. Whatever downstream propagation the 1.0.0 cut planned, the declared route no longer
   exists.
3. **`CHANGELOG.md:101-103` (r6 #6): "the subpath export map IS the zone map."** Contradicted at the payload
   level by the build (C-9): `dist/core.js`, `dist/packrat.js`, and `dist/utils.js` all import one 40,576-byte
   chunk. The zoning is nominal, not physical.
4. **`core.ts:3-6`: "A consumer that imports only this never pulls the diagnostics accumulator, the packrat
   tier…"** Falsified twice by the build (C-16): `dist/core.js:1` imports the packrat chunk, and that chunk's own
   line 1 imports the diagnostics chunk.
5. **`packrat.ts:15`: "resetting the caches per parse via `resetPackrat()`."** Contradicted by `:174-181` and
   `parser.ts:43-48` in the same tree — the epoch already resets per top-level parse (C-11), so the instruction
   is a no-op on the documented entry and a crash if read as "inside the parse" (C-3).
6. **`docs/api.md:101` + `README.md:305-310`: `.memoize()` / `.mergeMemos()` as `Parser` methods.** Contradicted
   by measurement — `Parser.prototype` has neither (C-4).
7. **`CHANGELOG.md:107-111`: the tier is "kept pending the bbnf-lang LR-consumer question."** The condition is
   already resolved against the keep: `/Users/mkbabb/Programming/bbnf-lang/package.json` carries no `parse-that`
   dependency and its sources use none of the three exports (C-6).
8. **O-15 PT-03's absolute nanoseconds (93.9 / 138.2 / 139.3).** Not contradicted, but not portable: W1's
   2026-08-03 re-measure found UNARMED 55.6 ns on the same claim (`W2.md:772-774`). C-2 is asserted on
   the **ratio and the one-wayness**, both re-verified in source and bundle here; the nanosecond triple is cited
   as the record's, not re-derived (epoch rule).

## 6. Ledger

| id | severity | claim | provenance |
|---|---|---|---|
| C-1 | BLOCKER | epoch soundness bound to 1 of 4 public invocation paths; PT-B1 reachable via `.parser`/`.call` — and the library's own test uses that entry | `packrat.ts:158-181`; `parser.ts:30,43,437`; `state.ts:47,92-99`; `reentrancy.test.ts:196-212` |
| C-2 | BLOCKER | one-way process-global arming; cross-consumer tax, no disarm, no opt-out | `packrat.ts:156,266,290`; dist `:678,:682,:714,:722`; `proof-packrat-armed.mjs:13-21`; `INBOX.md:77` |
| C-3 | MAJOR | public `resetPackrat()` can crash a live grow (PT-Q1 shape, public route) **and** is a no-op on the documented entry | `packrat.ts:15,225-229,267-271,396,401,455,463` |
| C-4 | MAJOR | README + api.md document `Parser` methods that do not exist | `README.md:305-310`; `docs/api.md:101`; MEASURED prototype |
| C-5 | MAJOR | the one api.md semantics sentence is false in three ways | `docs/api.md:103-104`; `packrat.ts:315-332,349-360,443-447,470-473` |
| C-6 | MAJOR | zero-consumer tier frozen into a 1.x subpath, against the project's own dead-code precept; the named future consumer has no dependency either | `proof-no-dead-combinator.mjs:9-13,63-68`; `package.json:22-26`; `CHANGELOG.md:106-111`; `bbnf-lang/package.json` |
| C-7 | MAJOR | dual-package hazard: two `PACKRAT_ARMED`, two `PARSER_ID`, keys with no copy discriminator; ungated | dist ESM `:678,850` vs CJS `:679,851`; `packrat.ts:99`; all 4 proof gates load `dist/parse.js` only |
| C-8 | MAJOR | in-parse `RangeError` triggered by an unresettable, unobservable global counter (K-8 class) | `packrat.ts:90-98`; `parser.ts:18,25`; `W2.md:478` |
| C-14 | MAJOR | `mergeMemos` ≡ `memoize`; `name` reaches only the debug printer — 2 of 3 served exports are one function | `packrat.ts:274-278,479,482-488`; `debug.ts:365`; `parser.ts:488`; `state.ts:151` |
| C-15 | MAJOR | first-parse arming window retains a parse's memo cells and its whole source string for the process lifetime | `packrat.ts:217,244,290,433-435,219,245`; `lazy.ts:18-24`; `parser.ts:702-707` |
| C-9 | MINOR | `./packrat` ships 40,576 B for 3 functions; `./core` cannot shed packrat | `dist/packrat.js`, `dist/core.js:1`; chunk 40,576 B / packrat region ~5,670 B |
| C-10 | MINOR | `getCijKey` public in source + `.d.ts`, unreachable from every entry; `PackratEpoch` unnameable | `packrat.ts:79,196`; `dist/packrat.d.ts:2`; `index.ts:8`; `packrat-entry.ts:5`; 0/10 dist entries |
| C-11 | MINOR | stale module-header guidance made hazardous by C-3 | `packrat.ts:15` |
| C-12 | MINOR | no parse-scoped or parser-scoped primitive on the public surface | `packrat.ts:216,243` vs `index.ts:8` |
| C-16 | MINOR | `core.ts` promises isolation from the packrat tier and the diagnostics accumulator; the build falsifies both | `core.ts:3-6`; `dist/core.js:1`; `dist/packrat-entry-CS1td-8B.js:1` |
| C-17 | MINOR | value.js's RED-7 probe has a packrat row that can never fire (`!ARM ? false : false`) | `parsethat-surface-gaps.mjs:47,48` |
| C-18 | MINOR | semver notes a type ripple on an unreachable surface; the served behaviour change is filed as perf | `CHANGELOG.md:18,39-41` vs `packrat.ts:15` |
| C-13 | INFO | the RED-7 probe is unrunnable here; its packrat rows are inherited receipts | `parsethat-surface-gaps.mjs:11-13`; MEASURED `ERR_MODULE_NOT_FOUND` |
| S-1 | SUPERLATIVE | float64-safe key + fail-loud budget, with the cured defect documented in source | `packrat.ts:52-100` |
| S-2 | SUPERLATIVE | five-global epoch snapshot/restore with correct `try/finally` unwind | `packrat.ts:196-250,390-406`; `parser.ts:43-48` |
| S-3 | SUPERLATIVE | arming at construction (not invocation) — the subtle correct ordering | `packrat.ts:146-155,284-290` |
| S-4 | SUPERLATIVE | a gate that proves its own non-vacuity via a poison child process | `proof-packrat-armed.mjs:57-67,131-155` |

**Counts**: 18 findings (2 BLOCKER · 8 MAJOR · 7 MINOR · 1 INFO) · 4 superlatives.

**Verdict on the axis.** As an *implementation* this module is above the tree's median (S-1..S-4). As a
*consumer-facing surface* it fails, and the failure is structural rather than cosmetic: it has **no consumers**
(the dependency was deleted at `164343c1`, the packed release carries zero bytes, and the named future consumer
has no dependency either); its documentation describes a different API (`.memoize()` as a method) with different
semantics; of its three served exports one is an alias of another and one is a no-op-or-foot-gun; its cost is
global, one-way, and unrefusable; and the 1.0.0 cut froze all of that into the major line at the moment the sole
downstream had already ruled `memoize = 0`. The X·P algebra keeps two ideas from it and retires the surface
entire — and the tree's own written condition for that retirement (`CHANGELOG.md:106-111`) is, as of this
reading, already satisfied.
