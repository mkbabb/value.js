claude-opus-5[1m]

# CHALLENGE — parse-that module `packrat` — LIBRARY axis (L)

**Slug** `packrat` · **Axis** L · **Date** 2026-08-04 · **Seat** Opus solo (mechanical/challenge tier, M-12)

**Subject** `/Users/mkbabb/Programming/parse-that/typescript/src/parse/packrat.ts` (488 lines).
**Read whole, plus every file it imports** (read-only, main checkout only):
`./parser.ts` (712) · `./state.ts` (190) · and transitively `./utils.ts` (187), `./leaf.ts` (399),
`./lazy.ts` (43), `./debug.ts`, `./index.ts`, `./core.ts`, `./packrat-entry.ts`, `./diagnostics.ts`,
`./split.ts`, `./ansi.ts`. Test corpus read: `test/memoize.test.ts` (177), `test/reentrancy.test.ts` (215).

**Evidence-tree provenance.** `/Users/mkbabb/Programming/parse-that` @ `ef10d5b`. The checkout is
*dirty* — `.cargo/config.toml`, `README.md`, `rust/Cargo.lock`, `rust/parse_that/src/lib.rs`,
`rust/parse_that/src/parsers/scan/decode.rs` modified. **None** is under `typescript/src/parse/`;
`packrat.ts` and every file cited below are byte-identical to `HEAD`. Every line cite is against the
working tree at that commit. `packrat.ts` last touched by `934b2fa` (S.H1 latch); the ε block cited in
**L-B1** dates to `193854d` (A.W2), unchanged except line 322 (`7901314`, tranche B).

**Law compliance.** Single write = this file. **Nothing was executed against parse-that** — no test
run, no bench, no import: the `PACKRAT_ARMED` latch is one-way (**PT-03**, confirmed at source below)
and arming it in any process would contaminate a measurement seat. The only command run was pure
float64 arithmetic in a bare `node -e` with **zero imports** (S-1). Every dynamic claim below is either
(a) a hand-executed trace with every step line-cited, or (b) stated as a falsifiable prediction with the
exact script the wave must run. `/Users/mkbabb/Programming/parse-that-css-totality-p2` **does not
exist** (checked; no STOP finding). No `.worktrees/`, no frozen root, no `~/Documents/Codex` entered.

**Posture.** Assumed DEFECTIVE until the tree proved otherwise. It proved otherwise on five points
(§4) and failed on fourteen (§2–§3), one of them a soundness BLOCKER that admits strings outside the
grammar.

---

## 0. VERDICT

| | count |
|---|---|
| BLOCKER | **1** |
| MAJOR | 5 |
| MINOR | 7 |
| INFO (defect) | 1 |
| **defects total** | **14** |
| superlatives | 5 |

**The headline.** The module's own comments (`packrat.ts:6–50`) present the WDM
(Warth–Douglass–Millstein) algorithm as implemented faithfully, with one stated extension: a
`GROWING` table serving an ε to "a head that names itself MORE THAN ONCE in its own body"
(`:41–47`). **The extension as coded is not that.** Its guard tests *positional containment only*
(`packrat.ts:322–323`) — it fires for **any** occurrence of the memoized parser at a position inside
the growing seed's span, reached from **any** rule, whether or not the grammar admits ε there. §2.1
gives a four-line grammar and a two-character input where this converts a correct **reject** into a
**spurious accept** with a phantom `undefined` in the AST. The module ships with no test for that
shape and no design record: `git log -S GROWING` and a full grep of `parse-that/docs/**` return no
specification of the heuristic anywhere.

The second-order finding is structural and is what makes L-B1 survivable-in-practice-so-far: the
packrat tier's three soundness cures (**PT-B1** cross-input, **PT-Q1** re-entrancy, the (id,offset)
key) are all bolted to **one** entry point, `Parser.parseState`, while `Parser` publishes **three**
(`parseState`, the `public parser` field, `call()`). parse-that's own packrat suite drives its
soundness assertions through the **unprotected** one (§2.2), and one named proof gate is provably
vacuous (§2.5).

---

## 1. METHOD

1. Read `packrat.ts` end to end, twice — once for control flow, once for allocation sites and
   hidden-class shapes.
2. Read every import transitively; read `Parser` in full because `packrat.ts`'s soundness contract is
   a joint invariant with `Parser.parseState` (`parser.ts:34–49`), not a property of `packrat.ts` alone.
3. Read the two test files that exercise packrat, to establish what is *gated* vs merely *believed*.
4. Hand-executed the WDM machinery on four grammars (`H = H R | 'x'` with a non-memoized
   intermediary; `H = H 'ab' | H 'a' H | 'x'`; `H = H 'b' | 'a' H | 'x'`; the `mZ/mY/mSL` shapes from
   `memoize.test.ts:22–37`) to find the reachability boundary of the ε guard.
5. Folded the hitherto corpus (INBOX **O-15**; `X/parse-that/waves/W1..W4`; `registry/adjudicated/
   parser-band.md`) — cited where overlapping, contradicted explicitly in §5 where the tree disagrees.

---

## 2. BLOCKER & MAJOR

### L-B1 — BLOCKER — the `GROWING` ε-substitution admits strings outside the grammar

**Provenance** `packrat.ts:315–331` (guard), `:322–323` (the two positional predicates), `:329`
(the ε answer). Doc claim at `:41–47`. Blame: `193854d` (A.W2), line 322 amended by `7901314`.

**The code.**

```ts
// packrat.ts:315-331  (recall())
if (cell === undefined) {
    const growKey = GROWING.get(p.id);
    if (growKey !== undefined) {
        const growSeed = MEMO.get(growKey)?.ans;
        if (
            growSeed !== undefined &&
            !isLR(growSeed) &&
            pos > (growKey % MEMO_OFFSET_SPAN) &&
            pos <= growSeed.offset
        ) {
            return { ans: { offset: pos, value: undefined, isError: false } };
        }
    }
}
```

**The defect.** `GROWING` is keyed on `p.id` **alone** (`packrat.ts:193`, `:382`) — there is no
component identifying *which body* the occurrence was reached from. The guard therefore cannot
distinguish the case the comment describes ("a head that names itself MORE THAN ONCE in its own
body", `:41`) from the case where a **different rule** invokes the head at a position that merely
happens to lie inside the growing span. In the latter case the head is *required* to match, the
grammar admits no ε there, and the guard hands back a non-advancing success anyway. `all()` then
**silently drops** the `undefined` from the result array (`leaf.ts:199/207/230/246/267`:
`if (state.value !== undefined) out[w++] = state.value`), so the phantom leaves no trace in an
`all()`-shaped body; a `then()`-shaped body carries it into the AST as a literal `undefined`
(`parser.ts:90`).

**Counterexample — hand-executed, every step line-cited.**

```ts
import { string, memoize, Parser } from "@mkbabb/parse-that";
const x = string("x"), z = string("z");
const H: Parser<any> = memoize(Parser.lazy(() => H.then(R).or(x)));   // H → H R | 'x'
const R: Parser<any> =         Parser.lazy(() => H.then(z));          // R → H 'z'   (NOT memoized)
H.parse("xz");
```

`L(H) = 'x' | H H 'z'` — the shortest strings are `x`, `xxz`, `xxxzz`/`xxxz z`… **`"xz"` is not in
`L(H)`**: `H R` needs an `H` between the seeded `H` and the `'z'`, and there is nothing there.

Trace (`p` = the inner lazy; `K0 = getCijKey(p,0)`, `K1 = getCijKey(p,1)`):

| step | site | effect |
|---|---|---|
| 1 | `parser.ts:43` | `packratEnter()` — armed (a `memoize()` was constructed, `packrat.ts:290`) → fresh `MEMO`/`HEADS`/`GROWING` |
| 2 | `packrat.ts:439` | `recall(0)` → `cell` undefined, `GROWING` empty → `undefined` |
| 3 | `packrat.ts:443–450` | `lr0 = {seed:{0,undefined,true}}`; `LR_STACK=lr0`; `MEMO.set(K0,{ans:lr0})` |
| 4 | `packrat.ts:452` | body @0: `H.then(R)` → `H@0` hits `lr0` → `setupLR` (`:365`) mints `head0`, `involvedSet=∅` (loop at `:371` stops immediately: `s.head===head`) → seed FAIL → `then` fails (`parser.ts:93–96`) |
| 5 | `parser.ts:113–115` | `or` → `x@0` matches → offset **1**, value `"x"` |
| 6 | `packrat.ts:457–460` | `lr0.head` set → `lr0.seed = {1,"x",false}` → `lrAnswer` → `MEMO.set(K0,{ans:seed})` → `growLR` |
| 7 | `packrat.ts:381–383` | `HEADS.set(0,head0)`; `prevGrowing=undefined`; **`GROWING.set(p.id, K0)`** |
| 8 | `packrat.ts:393–394` | pass 1: `evalSet = ∅`; `evalParser(state,0)` |
| 9 | — | `H@0` → `recall(0)`: `cell` defined → ε block skipped; `head0.evalSet` ∅ → `return cell` (`:361`) → offset **1** |
| 10 | — | `R@1` → `H@1` → `recall(1)`: **`cell === undefined`**; `growKey=K0`; `K0 % 2^32 = 0` (verified, §4 S-1); `1 > 0` ✓ and `1 <= growSeed.offset (1)` ✓ → **`packrat.ts:329` returns ε** |
| 11 | — | `z@1` matches → offset **2**; `R` = `[undefined,"z"]`; body succeeds at offset 2 |
| 12 | `packrat.ts:398–399` | `2 > 1` → seed grows to `{2, ["x",[undefined,"z"]]}` |
| 13 | `packrat.ts:392–400` | pass 2: `H@0`→2, `R@2`→`H@2` ε again, `z@2` at EOF fails → body falls to `x@0` → offset `1 <= 2` → **break** |
| 14 | `packrat.ts:401` | `applyAnswer(seed)` → **offset 2, `["x",[undefined,"z"]]`, `isError:false`** |

**Result: `H.parse("xz")` returns `["x",[undefined,"z"]]` having consumed the whole input.**
`H.eof().parse("xz")` therefore **succeeds** where it must fail. Without the ε (step 10 evaluating
fresh instead), `H@1` would try `H R` (LR marker → fail) then `x@1` against `'z'` → fail → `R` fails →
body fails → grow halts at the seed, offset 1 — the **correct** answer. The heuristic does not
*preserve* a result the plain algorithm would miss; it **manufactures** one.

**Why the existing suite does not catch it.** Every memoized rule in `memoize.test.ts` is *itself*
memoized (`mSL`/`mZ`/`mY`, `:22–37`; `sS`, `:39–51`; `expression`, `:53–73`) — the intermediary in the
counterexample (`R`) is **not** memoized, so the head is re-entered at seed-end from a rule the
`GROWING` table cannot see as foreign. No test in the tree has that shape.

**Severity rationale — BLOCKER.** Silent over-acceptance in a parser library is the worst failure
class: no throw, no `isError`, a well-formed-looking AST. It is exactly the class the module's own
header prose claims to have closed ("a non-recursive reuse of P at a later/disjoint offset can NEVER
mis-restore the earlier result", `:19–21`) — the (id,offset) key does close *that*, and then `:315`
re-opens a strictly worse one, because a mis-restore returns a *wrong-but-real* answer while the ε
returns a *fabricated* one.

**FALSIFIER.** Run the four-line script above in a fresh process. If `H.parse("xz")` returns `"x"`
(offset 1) or errors, my trace is wrong and this finding is **REFUTED** in full. Secondary falsifier:
if `H.eof().parse("xz")` fails, the consumer-visible harm is bounded to the phantom `undefined` and
the finding downgrades to MAJOR. Tertiary: if the wave can show the ε guard is *load-bearing* for
`mSL` — i.e. `mSL` (which is `.opt()`-wrapped at `memoize.test.ts:25`, so it already has a legitimate
ε route) reds when `:315–331` is deleted — then the finding is a *design* BLOCKER (the heuristic must
be re-scoped to same-body occurrences) rather than a *dead-code* BLOCKER, but it does not clear.

**Repair sketch (not an ask; for the wave's cost model).** Key `GROWING` on the **head's `(id,pos)`
cell plus the current LR-stack membership**, not on `p.id`: serve the ε only when the requesting
occurrence's `LR_STACK` chain reaches the growing head's own frame. The bookkeeping already exists —
`LR_STACK` (`:135`) and `head.involvedSet` (`:373`) are precisely the "reached from within this
head's body" witness the guard is missing.

---

### L-M1 — MAJOR — the epoch is bolted to one of three public entry points

**Provenance** `packrat.ts:216` (`packratEnter`), `:243` (`packratExit`) — call sites: **only**
`parser.ts:43` / `:47`, inside `parseState`. `Parser` publishes `parseState` (`parser.ts:34`),
**`public parser: ParserFunction<T>`** (`parser.ts:30` — a public *field*, freely callable), and
`call(state)` (`parser.ts:437`, a public method used by `state.unsafeCall`, `state.ts:92–94`).
Neither `parser` nor `call` opens an epoch.

**The defect.** All three packrat soundness properties the module documents at length —
cross-input (**PT-B1**, `:161–164`), re-entrancy (**PT-Q1**, `:165–171`), and unwind-on-throw
(`:234–240`) — are consequences of the `try/finally` at `parser.ts:44–48`, not of `packrat.ts`. A
consumer that drives a memoized grammar with `p.parser(new ParserState(src))` gets: the module-init
`MEMO`/`HEADS`/`GROWING` (never swapped), unbounded cross-input accumulation, and **no unwind** — a
throw mid-grow leaves `LR_STACK` (`:449`) and a poisoned `{ans: lr}` cell (`:450`) permanently in the
module globals for the rest of the process (see L-m5).

**This is not hypothetical: parse-that's own packrat suite uses that path for its soundness gates.**

| test | line | call |
|---|---|---|
| "(id, offset)-keyed memo does NOT mis-restore across offsets" | `memoize.test.ts:97` | `p.parser(st)` |
| "default parse() does not clear the packrat cache" | `memoize.test.ts:131` | `seeded.parser(st)` |
| PT-Q2 ">1MB source yields no cross-offset mis-restore" | `reentrancy.test.ts:206`, `:211` | `letter.parser(st0/stB)` |
| PT-WAVE-1 reentrancy pair | `reentrancy.test.ts:47`, `:69`, `:71` | `outer.parser(state)`, `a.parser(sa)`, `b.parser(sb)` |

So the (id,offset) soundness assertion, the >1MB assertion, and the reset-tax assertion are **all**
measured on the un-epoched path, and the epoch path is exercised only by the smoke/LR happy-path
tests. The tree's own usage is the proof that the bypass is a first-class path, not an abuse.

**FALSIFIER.** If `Parser.parser` and `Parser.call` were `private`/`@internal`-documented, or if
`packratEnter` were invoked from `Parser.call` as well, this drops to INFO. Both are public and
neither is (`parser.ts:29–32`, `:437`). Direct disproof: run
`const w = memoize(regex(/[a-z]+/)); const a = new ParserState("hello"); w.parser(a); const b = new
ParserState("world"); w.parser(b);` — if `b.value === "world"` the bypass is cross-input sound after
all and the finding is refuted. (Prediction: sound *here* only because the (id,offset) key makes
offset-0 cells collide across inputs — `MEMO` is not cleared, so the offset-0 cell for `p` from
`"hello"` is restored for `"world"`. **PT-B1 revived on the bypass path.** The wave must measure this
directly; I could not, per the no-arming law.)

---

### L-M2 — MAJOR — `resetPackrat()` is a public export with no correct call site

**Provenance** `packrat.ts:262–272`; exported at `index.ts:8` and `packrat-entry.ts:5`; **instructed
by the module's own header at `packrat.ts:15`** ("resetting the caches per parse via
`resetPackrat()`"). Consumers repo-wide: **zero outside tests** (grep: `memoize.test.ts:14/67/91/
108/120`, `reentrancy.test.ts:104/197` — all `beforeEach`/inline).

**Arm A — between parses it is provably a no-op.** `packratEnter` (`:218–230`) saves the current
module-level Maps and installs **fresh** ones; `packratExit` (`:244–249`) restores the saved ones. At
depth 0 the saved object *is* the module-init trio (`:133`, `:134`, `:193`), and every cell written
during the parse goes into the *installed* Maps, which are dropped on exit. Therefore between two
epoch-opened parses `MEMO`/`HEADS`/`GROWING` are always the pristine module-init empties.
`resetPackrat()` clears three already-empty Maps.

**Arm B — during a parse it crashes the library.** `resetPackrat()` calls `MEMO.clear()` (`:267`).
Three sites then dereference a non-null-asserted cell that the clear just removed:
`packrat.ts:396` (`MEMO.get(key)!.ans as Answer`), `:401` (same), `:455` (`MEMO.get(key)!`). A user
`.map` callback — ordinary, user-controlled code that runs mid-parse (`parser.ts:151`) — calling
`resetPackrat()` reproduces **exactly** the PT-Q1 crash signature the CHANGELOG records as a shipped
correctness BLOCKER (`typescript/CHANGELOG.md:124–134`: "`growLR`'s `MEMO.get(key)!.ans` non-null
assertion read `undefined` → `TypeError`"). PT-Q1's cure moved the *reset trigger*; it did not remove
the unchecked `!` on a Map that a public export can still clear.

**Arm C — the only place it is meaningful is the unsound path.** On L-M1's bypass (`p.parser(state)`)
no epoch is opened, `MEMO` accumulates, and `resetPackrat()` genuinely clears it. So the export's sole
non-vacuous use is to paper over a path that is itself unsound.

**Severity rationale.** A public API whose correct-use set is empty, whose documentation actively
recommends it, and one of whose two reachable behaviours is a `TypeError` out of the library.

**FALSIFIER.** Instrument: `const seen=[]; const inner = regex(/[a-z]/).map(c=>{seen.push(c); return c}); const M = memoize(inner); M.parse("a"); const before = MEMO_size_probe(); M.parse("a");` — if the
second parse skips `inner` (no second push) the seed survived the epoch and Arm A is refuted. For Arm
B: a `.map` that calls `resetPackrat()` inside a left-recursive grow; if it does **not** throw, Arm B
is refuted.

---

### L-M3 — MAJOR — the evalSet scratch re-evaluation silently discards diagnostics

**Provenance** `packrat.ts:349–360` (the evalSet branch), specifically `:351` `const scratch =
live.clone()` and `:356` `snapshot(scratch)`; `state.ts:101–109` (`clone`); `utils.ts:28–49`
(`mergeErrorState`).

**The defect.** `ParserState.clone()` copies exactly five fields — `src`, `value`, `offset`,
`isError`, `furthest` (`state.ts:102–108`). It does **not** copy `expected`, `suggestions`, or
`secondarySpans`; the clone gets fresh `[]`/`undefined` from the field initialisers
(`state.ts:43–45`). `recall` then runs a **full sub-parse** on that detached state
(`packrat.ts:355`) and takes back only `{offset, value, isError}` (`snapshot`, `:252–254`;
`applyAnswer`, `:256–260`). Consequences, all three directions:

1. **Furthest-offset advance is lost.** Everything `mergeErrorState` wrote to `scratch.furthest`
   during the re-evaluation dies with the clone. The reported error position (`parser.ts:60`,
   `const furthest = state.furthest >= 0 ? state.furthest : state.offset`) can therefore point
   *earlier* than the deepest offset the parse actually reached.
2. **Labels are lost.** `expected` accumulated inside the scratch is discarded.
3. **Accumulation is mis-based.** `mergeErrorState`'s "same furthest → append the label"
   branch (`utils.ts:36–47`) starts from a **blank** `expected` inside the scratch, so even the
   labels it builds are built against the wrong base set.

Two adjacent sites compound it: the ε answer (`:329`) and the "not-head, not-involved → must FAIL"
answer (`:344`) are both constructed **without** calling `mergeErrorState` at all — so a forced
failure inside an active head contributes nothing to the furthest/expected tracking either.

**Interaction with O-15 PT-01.** PT-01 established that `label` is a no-op unless diagnostics are
armed, and that arming drags an unconditional `console.error` (`parser.ts:67–69`, source-confirmed).
L-M3 is the packrat-tier *second* degradation: even with diagnostics armed and paying the
`console.error` tax, the memoized LR path loses a slice of what was collected. W2's **EQ-4** and
**R-LAW-3** ("diagnostics are values, never effects", `W2.md:254`, `:266`) are the right law; this is
one more measured reason.

**FALSIFIER.** Armed diagnostics + a mutually-recursive memoized grammar (`mZ`/`mY` shape,
`memoize.test.ts:28–30`) where the deepest offset is reached only inside an involved rule's
re-evaluation. If `state.furthest` after the parse equals the true deepest reach, the loss is masked
by a redundant non-scratch path and the finding downgrades to MINOR. If `state.expected` is
identical with and without the `:349` branch taken, arm 2 is refuted.

---

### L-M4 — MAJOR — PT-03 confirmed at source, and worse than the dist reading: arm-at-construction, unobservable, unresettable

**Provenance** `packrat.ts:156` (`let PACKRAT_ARMED = false`), `:290` (`PACKRAT_ARMED = true`),
reads at `:217` and `:266`. **Repo-wide grep for `PACKRAT_ARMED` returns exactly five lines** — one
comment header (`:137`), the initialiser, the two reads, the single `true` write. **No assignment
back to `false` anywhere in the TypeScript source.** This corroborates O-15 **PT-03**'s dist reading
(`packrat-entry-*.js:678` false, `:722` true, reads `:682`/`:714`) at the source bytes, and W1's
`LATCH` row (`W1.md:439`, `:575`).

Three amplifications the dist reading could not see:

1. **It arms at CONSTRUCTION, not first invocation** (`packrat.ts:290`, first statement of
   `makeMemoized`). Merely *importing* a module that builds a memoized parser at load time — never
   invoking it — taxes **every unrelated top-level parse in the process** with a five-field snapshot
   object plus three `new Map()` (`:218–227`). O-15's measured 93.9 → 138.2 ns/parse (**1.47×**) is
   therefore payable by a grammar that has no relationship to the memoizer. The CHANGELOG concedes
   the shape of this ("'free' holds **only for memoize-free processes**",
   `typescript/CHANGELOG.md:106–111`); it does not concede that a *constructed-and-never-called*
   memoizer is sufficient to arm.
2. **The latch is unobservable through the public surface.** `index.ts:8` and `packrat-entry.ts:5`
   export exactly `memoize, mergeMemos, resetPackrat`. There is no `isPackratArmed()`, no
   `packratState()`, nothing. **This makes W1's G-4 unsatisfiable as written.** `W1.md:434` requires
   "Every bench cell proves `PACKRAT_ARMED === false` at entry and [exit]" and `W1.md:459` forbids
   inferring it — "read from the dist, never inferred from 'we did not call `memoize`'". But reading
   the *dist text* (`let X = !1`) is a static observation; it cannot witness the **runtime** value at
   cell exit, which is precisely what G-4 is for. With no accessor, the only runtime witnesses are
   (a) a heap-retention probe for the three Maps (the `proof:packrat-armed` clause the CHANGELOG
   sketches at `:41–43`) or (b) timing — and timing is the thing being measured. **Contradiction
   recorded against W1**: G-4 as specified cannot be discharged against the published surface; it
   must be re-specified as a retained-heap clause in a memoize-free process, or parse-that must be
   asked for an accessor.
3. **`resetPackrat()` deliberately does not disarm** (`:266`, `if (!PACKRAT_ARMED) return;` — it
   early-returns when unarmed and, when armed, clears three Maps and leaves the latch set). O-15's
   "`resetPackrat()` leaves 139.3 ns" is explained exactly by this line.

**FALSIFIER.** Any assignment `PACKRAT_ARMED = false` in the shipped source or dist refutes arm 3;
grep says there is none. Arm 1 is refuted if `makeMemoized` is shown to be lazy (it is not — `:290`
precedes every other statement). Arm 2 is refuted by any exported accessor; `index.ts:8` and
`packrat-entry.ts:5` are the complete export lists.

---

### L-M5 — MAJOR — the `proof:reset-tax-gone` gate is vacuous

**Provenance** `memoize.test.ts:115–134`, the block comment naming the gate at `:115–118`.

The test asserts: seed the cache with `memoize(string("ab")).parse("ab")`, run an unrelated default
`parse()`, then "The seed must still be present: re-running the memoized parse hits the cache (the
cached offset-2 result restores even at a fresh state)" — checked by
`expect(st.isError).toBe(false); expect(st.offset).toBe(2)` (`:132–133`).

**The claim is false and the assertions cannot detect it.** `seeded.parse("ab")` goes through
`parseState` → `packratEnter` (armed) installs fresh Maps → the cell is written into the *installed*
`MEMO` → `packratExit` restores the module-init empties (`packrat.ts:218–230`, `:244–249`). The seed
is **discarded at `packratExit`**, not preserved. The final probe at `:131` uses `seeded.parser(st)`
(the L-M1 bypass), which re-parses `string("ab")` from cold against the empty module-init `MEMO` and
lands on `isError:false, offset:2` — **identical** to a cache hit. The two assertions have no power to
distinguish hit from cold re-parse; the gate would stay green if the memo table were deleted entirely.

**Severity rationale.** A *named* proof gate that certifies a property the code does not have. On the
LIBRARY axis this is worse than a missing test: it is a green light on a false claim, and it is the
only gate standing behind the "reset tax removed" performance story.

**FALSIFIER.** Add a side-effect counter to the wrapped parser (`memoize(string("ab").map(v=>{n++;
return v}))`) and assert `n` does not increment on the "cache hit". If `n` stays flat, the seed did
survive and the finding is refuted. Prediction: `n` increments.

---

## 3. MINOR & INFO

### L-m1 — MINOR — `CURRENT_SRC` is write-only dead state

**Provenance** `packrat.ts:186` (declaration), `:223` (snapshot field), `:229` (cleared on enter),
`:249` (restored on exit), `:271` (cleared on reset), `:433–435` (the only assignment). Complete
occurrence list confirmed by grep — nine lines, three of them comments.

It is **never read for any decision**. The only read is `if (CURRENT_SRC === undefined)` at `:433`,
which guards its own write. Nothing compares it to `state.src`; there is no assertion, no throw, no
branch. The comment at `:183–185` calls it "a within-epoch assertion anchor" — **there is no
assertion**. Cost: one field in every `PackratEpoch` object allocated per armed top-level parse
(`:218–224`), one restore per exit, and a branch + a global write in `memoizeFn`, which is the hot
path (`:433`). This is a live residue of the deleted PT-Q1 per-node reset (`:165–171`); the mechanism
was removed and the variable was not.

**FALSIFIER.** Any read of `CURRENT_SRC` that affects control flow or output. Grep says none exists.

### L-m2 — MINOR — allocation discipline is internally inconsistent on the hot LR path

Four sites, all in the grow loop or `recall`:

| site | issue |
|---|---|
| `packrat.ts:399` | `MEMO.set(key, { ans })` allocates a **fresh `MemoCell`** every grow iteration, where `:463` (`cell.ans = snapshot(state)`) mutates in place. `MEMO.get(key)!.ans = ans` is the same semantics, zero allocation. |
| `packrat.ts:393` | `head.evalSet = new Set(head.involvedSet)` — a fresh `Set` per grow pass. Reusable by `clear()` + re-add, or by a generation counter. |
| `packrat.ts:358–359` | `MEMO.set(key, { ans }); return MEMO.get(key);` — a redundant hash lookup. Both branches can return the cell directly (`cell` in the `!== undefined` arm is *already* the object `MEMO.get(key)` would return). Two avoidable `Map` probes per evalSet hit. |
| `packrat.ts:307` | `const head = HEADS.get(pos)` is computed **before** the ε block at `:315–331`, which returns at `:329` without using it — a wasted `Map` probe on the ε path. |
| `packrat.ts:351` | `live.clone()` allocates a `ParserState` **plus two fresh arrays** (`state.ts:44–45`) per involved-rule re-evaluation per grow pass — O(passes × |involvedSet|). See also L-M3 for the correctness half. |

For a module whose entire justification is "opt-in, off the fast path", the *armed* path deserves the
same discipline `leaf.ts` shows (`fuseAll`'s one-array-per-call, `leaf.ts:166–177`).

**FALSIFIER.** A heap-delta measurement on a grow-heavy grammar showing these allocations are already
scalar-replaced by TurboFan. Escape analysis will not save `:399` (the cell escapes into `MEMO`) or
`:351` (the state escapes into `parser.parser`).

### L-m3 — MINOR — `MemoCell.ans` is a two-hidden-class union with a structural probe

`MemoCell.ans: Answer | LR` (`packrat.ts:125–127`) mixes a 3-field shape (`:103–107`) and a 4-field
shape (`:110–115`) in one slot. `isLR` (`:129–131`) discriminates by reading `.parser` off both — a
property **absent** from `Answer`, i.e. a deliberate megamorphic-ish miss on the common path. Every
`.ans` load site (`:318`, `:396`, `:401`, `:455`, `:463`, `:470`, `:475`) is therefore polymorphic.
On a "hot parser library" a `kind: 0|1` discriminant present on **both** shapes (or two separate maps,
`MEMO` and `IN_PROGRESS`) makes each load monomorphic and each check an integer compare.

**FALSIFIER.** `--trace-ic` on a grow-heavy grammar showing the `.ans` sites stay monomorphic. If V8
already unifies the two shapes (it will not — different field counts and names), refuted.

### L-m4 — MINOR — `getCijKey` throws a raw `RangeError` out of the parse path

`packrat.ts:90–98`. The guard is arithmetically correct and exactly tight (see S-1), but its failure
mode is a **throw**, not `ok:false`. This is the same boundary posture O-15 **PT-07** records for
non-string inputs (5/5 raw `TypeError`) and O-15 **PT-04** records for depth (thrown `RangeError` at
7,762) — and it is the posture `parser-band.md:118` (cand-O debt 3) and `W2.md:157` rule against:
"recursion bounded **by construction**, any shield proven non-load-bearing". The offset arm
(`offset >= 2^32`) is unreachable in JS (V8 caps strings ≈ 2^29). The id arm
(`parser.id > 2_097_151`) is reachable in principle: `PARSER_ID` is a process-global `PARSER_ID++`
in the `Parser` constructor (`parser.ts:18`, `:25`) and **every** combinator call mints one
(`.then` `:99`, `.or` `:118`, `.map` `:156`, `.trim` `:492`+`:514` — two per call, …). A long-lived
process that builds grammars dynamically crosses 2.1M eventually, and then a memoized parse throws
mid-parse. The module's own comment calls it "unreachable for any realistic grammar" (`:92`) — true
for a build-once grammar, unproven for a build-per-request one.

**FALSIFIER.** Show every consumer builds its grammar exactly once at module scope. value.js's CSS
grammar does; a BBNF-DSL consumer (the `bbnf-lang` LR consumer the CHANGELOG names at `:109–111` as
the *whole reason the tier is kept*) compiles grammars at runtime, which is precisely the
per-request-construction shape. If bbnf-lang caches compiled grammars, refuted.

### L-m5 — MINOR — unwind hardening is asymmetric

`growLR` carries an explicit `try/finally` restoring `GROWING`/`HEADS` (`packrat.ts:390–406`), with a
comment claiming the epoch is "never corrupted" (`:388–389`). `memoizeFn`'s LR-stack push/pop has
**no** such guard: `LR_STACK = lr` (`:449`), `MEMO.set(key, {ans: lr})` (`:450`), `evalParser`
(`:452`), `LR_STACK = lr.next` (`:454`). A throw at `:452` — a user `.map` throw, an out-of-budget
`RangeError` (L-m4), a V8 stack overflow (L-i1) — leaves `LR_STACK` pointing at a dead frame and a
poisoned `{ans: lr}` cell in `MEMO`. Inside a `parseState` this is contained by `parser.ts:44–48`.
**Under L-M1's bypass it is permanent for the process.**

**FALSIFIER.** Wrap `:449–454` in `try/finally` and show no behavioural delta — that *is* the repair,
so the finding is confirmed by construction unless the bypass path is closed.

### L-m6 — MINOR — `getCijKey` is an `export` that no entry point re-exports

`packrat.ts:79` is `export function getCijKey`. Neither `index.ts:8` nor `packrat-entry.ts:5`
re-exports it; the *only* importers are tests reaching past the barrel
(`memoize.test.ts:3` `from "../src/parse/packrat.js"`, `reentrancy.test.ts:186` a dynamic
`await import("../src/parse/packrat.js")`). A test-only widening of the module's surface. Compare the
tree's own stated discipline — S.H2 excised fifteen `*Span` builders precisely for being "a
zero-consumer surface" (`index.ts:9–11`). Related: `interface PackratEpoch` (`:196`) is **not**
exported while the exported `packratEnter` (`:216`) returns `PackratEpoch | null`, so the emitted
`.d.ts` names a type the module does not publish.

**FALSIFIER.** A non-test importer of `getCijKey`, or a `dist-surface`/`subpath-gate` row asserting
it. Grep of `test/dist-surface.test.ts` for `packrat|memoize|getCijKey` returns **nothing**.

### L-m7 — MINOR — Goldilocks: right-sized code, over-sized narration

Measured: **232 code lines, 217 comment lines, 39 blank** (0.94 comment:code). At 488 total the
module is well within Goldilocks for one coherent concern — WDM packrat is not divisible without
inventing a seam, and the CHANGELOG's r6 #6 ruling ("parse-that is **not** zone-partitioned",
`CHANGELOG.md:100–102`) is the right call. But a large share of the prose **narrates retired
designs**: `:56–70` re-derives the deleted 20-bit mask; `:80–89` re-derives the deleted
`id << MEMO_OFFSET_BITS` int32 shift; `:137–156` and `:158–193` re-tell PT-B1/PT-Q1/S.H1 history.
All of it already exists, verbatim and better-structured, in `typescript/CHANGELOG.md:18–43`,
`:122–143`. Source comments should state the invariant; the ledger should hold the archaeology.
This matters on the L axis for a specific reason: **the narration is where L-B1 hides.** `:41–47`
describes an invariant ("a head that names itself MORE THAN ONCE in its own body") that `:315–331`
does not implement, and 217 lines of confident prose is exactly the environment in which a reader
takes the comment for the code.

**FALSIFIER.** If any retired-design paragraph is load-bearing for a current reader — i.e. explains a
constraint not derivable from the live code — it stays. `:56–70` and `:80–89` are not: the live
invariant is one sentence ("key = id·2³² + offset, exact while ≤ 2⁵³−1, fail loud otherwise").

### L-i1 — INFO — the recursion ceiling under packrat is strictly below PT-04's 7,761

O-15 **PT-04** measured `Parser.lazy` arity 1 at deepest-OK **7,761**, thrown `RangeError` at 7,762
(reproduced independently at `W1.md:549`, `:553`, `:573`). `memoizeFn` inserts **at least two** frames
per memoized node on the ordinary path (`memoizeFn` `:426` → `evalParser` `:295` → `parser.parser`
`:299`), a third on the evalSet path (`recall` `:305` → `parser.parser` `:355`), and `growLR`
(`:380`) → `evalParser` → body on every grow pass. A memoized grammar's effective depth ceiling is
therefore materially lower than 7,761, and `packrat.ts` supplies **no depth bound of its own** —
exhaustion surfaces as a thrown `RangeError`, not `ok:false`. This is the same posture as L-m4 and
feeds `parser-band.md:118` (cand-O debt 3) and W3's G-9 depth leg (`W3.md:86`, `:288–290`).

**FALSIFIER.** Measure deepest-OK for `memoize(Parser.lazy(...))` in a fresh process. If it equals
7,761 the frames are being tail-folded and this is refuted; if it is lower, the ratio is the constant.
Not measured here (arming the latch is forbidden by the seat's law).

---

## 4. SUPERLATIVES (L-18 runs both ways)

### S-1 — the float64 key budget is **exactly** tight, not merely safe

`MEMO_MAX_ID = Math.floor(Number.MAX_SAFE_INTEGER / MEMO_OFFSET_SPAN)` (`packrat.ts:77`) with
`SPAN = 2**32` (`:72`). Verified arithmetically (bare `node -e`, zero imports):

```
MEMO_MAX_ID = 2097151
MEMO_MAX_ID * 2^32 + (2^32 - 1) = 9007199254740991 = Number.MAX_SAFE_INTEGER   → equal: true
(MEMO_MAX_ID + 1) * 2^32 = 2^53                                                → first aliasing id
```

Because `2^53 − 1 = (2^21 − 1)·2^32 + (2^32 − 1)`, the maximum legal `id` and the maximum legal
`offset` sum to **precisely** `MAX_SAFE_INTEGER`. Not one bit of headroom wasted, and not one legal
`(id, offset)` pair falsely rejected. The guard at `:90` is the tightest correct guard that exists for
this key function. Most implementations pick a round power and either alias early or reject early;
this one is exact, and the two tests that pin it (`memoize.test.ts:161–175`,
`reentrancy.test.ts:185–194`) pin the *right* boundary (the old int32 `<< 20` overflow at id 4096, and
the old 20-bit offset mask at 2²⁰).

### S-2 — the ε answer is deliberately **not** written to `MEMO`

`packrat.ts:329` returns a freshly constructed `{ ans: {...} }` and never calls `MEMO.set`. So even
though the heuristic itself is defective (L-B1), it is **non-poisoning by construction**: the
fabricated ε is scoped to the single occurrence that asked for it and cannot survive the grow, cannot
be restored at a later offset, and cannot leak into the next epoch. The blast radius of L-B1 is
bounded to one parse *by this line*. That is a real and non-obvious piece of discipline — the
naive implementation memoises the ε and corrupts the whole table.

### S-3 — `growLR` handles **nested grows of the same parser id** correctly

`packrat.ts:382–383` + `:403–405`: `const prevGrowing = GROWING.get(p.id)` … `if (prevGrowing !==
undefined) GROWING.set(p.id, prevGrowing); else GROWING.delete(p.id)`. A parser that begins a second,
inner grow at a different position while an outer grow of *the same parser* is live (reachable — I
traced it on `H = H 'b' | 'a' H | 'x'` over `"axb"`, where `H@1` grows inside `H@0`'s setup) restores
its parent's growing key rather than deleting it. Most WDM implementations plain-`delete`, silently
disarming the outer grow. Paired with the `try/finally` (`:390`, `:402`) this is correct under throw
as well as under normal return.

### S-4 — arming at **construction** makes the ordering property a theorem, not a race

`packrat.ts:290` is the first statement of `makeMemoized`, before `p` is even bound. The property
"the latch is armed before any memoized parse can open an epoch" is therefore a consequence of
construction order — you cannot obtain a memoized parser without having armed. Arming on first
*invocation* would have created a genuine window (the first invocation's own `packratEnter` already
ran unarmed, at `parser.ts:43`, before `memoizeFn` is reached). The comment at `:284–289` states
exactly this reasoning and it is correct. The **one-wayness** is the defect (L-M4); the **timing** is
right, and the three no-op arms (`:217`, `:243`, `:266`) are symmetric and complete, so the unarmed
path touches zero globals and allocates zero Maps.

### S-5 — `setupLR` correctly excludes the head from its own `involvedSet`

`packrat.ts:365–376`. The loop condition `while (s !== undefined && s.head !== head)` stops **before**
adding the head's own frame, because `:366–368` sets `lr.head = head` on that frame first. Traced on
both the direct case (`H = H R | 'x'`: `involvedSet = ∅`) and the mutual case (`mZ → mY → mZ`,
`memoize.test.ts:28–30`: `involvedSet = {mY}`) — both correct per WDM. `growLR` then relies on this
at `:393` (`evalSet = new Set(involvedSet)`) so that `recall` serves the head its own seed (`:361`)
rather than re-evaluating it (`:349`). Getting the head in or out of its own involved-set by one frame
is the classic WDM implementation bug and this tree does not have it.

---

## 5. CORPUS FOLD — where I agree, extend, and contradict

| corpus row | disposition |
|---|---|
| **INBOX O-15 / PT-01** (label no-op unless armed; arming couples an unconditional `console.error`) | **CONFIRMED at source**, not just dist: `utils.ts:33`/`:38` gate `expected` on `diagnosticsEnabled`; `parser.ts:67–69` fires `console.error(this.state.toString())` on every failed top-level parse when armed. **EXTENDED by L-M3**: on the packrat tier, armed diagnostics are additionally *lossy*. |
| **INBOX O-15 / PT-03** (one-way latch; 93.9→138.2 ns = 1.47×; `resetPackrat()` leaves 139.3) | **CONFIRMED at source** — five `PACKRAT_ARMED` lines total, one `true` write (`:290`), no disarm. **EXTENDED by L-M4**: arms at *construction* (an uninvoked memoizer taxes the process), and is **unobservable through any exported surface**. |
| **INBOX O-15 / PT-04** (lazy 7,761; `RangeError` at 7,762) | **FOLDED, not re-measured** (arming forbidden). **EXTENDED by L-i1**: packrat's added frames put the memoized ceiling strictly below 7,761, with no module-side bound. |
| **INBOX O-15 / PT-07** (5/5 non-string → raw `TypeError`; `.parse()` `undefined`-on-failure) | **CONFIRMED structurally**: `parseState` (`parser.ts:34`) does no type check — `new ParserState(val)` (`:52`) accepts anything and the first leaf (`leaf.ts:285` `state.src.charCodeAt`, `:297` `state.src.startsWith`) throws. `parse()` is `this.parseState(val).value` (`parser.ts:77–79`) — `undefined` on failure is indistinguishable from a successful `undefined`, and `many()`/`all()` *do* produce successful `undefined` (`leaf.ts:355`, `parser.ts:241`). O-15's posture (our cure sits **above** parse-that) stands. **EXTENDED by L-m4**: `getCijKey` adds a *third* raw-throw boundary. |
| **W1 §3a / G-4** ("`PACKRAT_ARMED === false` at entry and exit of every cell, read from the dist, never inferred") | **CONTRADICTED — the gate is unsatisfiable as written.** No accessor is exported (`index.ts:8`, `packrat-entry.ts:5`), so runtime arm-state cannot be witnessed; reading dist *text* is static, not a runtime observation at cell exit. Re-specify as the retained-heap clause the CHANGELOG sketches (`CHANGELOG.md:41–43`: "N non-memoized parses allocate flat (zero packrat Maps)"), run in a memoize-free process — that *is* observable and it is the only observable form. See L-M4 arm 2. |
| **W1 one-fresh-process-per-cell (`W1.md:279–281`, `:94–95`)** | **ENDORSED and strengthened**: correct not only because the latch never disarms but because L-M2 arm A shows `resetPackrat()` cannot undo it, and L-M1 shows a stray `p.parser(state)` in a harness would additionally accumulate `MEMO` across cells. |
| **W2 R-LAW-3 / EQ-4** (diagnostics are values, never effects; structural equality on `code/start/end/expected[]`) | **ENDORSED, with L-M3 as new supporting evidence**: the incumbent loses `expected`/`furthest` across the scratch clone, so even an armed incumbent cannot satisfy EQ-4 on the LR path. |
| **W2 K-6** ("kills any candidate whose parse #100,001 is [different]", `W2.md:367`) | **NEW EVIDENCE**: on L-M1's bypass path `MEMO` is never cleared, so parse #100,001 differs from parse #1 both in cost (unbounded table) and, per the PT-B1 mechanism, possibly in *answer*. K-6 should name the bypass explicitly. |
| **W2 O-8 anti-latch construction rule** (`W2.md:161`, `:254–255`, `:962`) | **ENDORSED**; L-M4 supplies the source-level receipt (arm-at-construction) that makes the rule sharper than "no one-way global latch": *no global whose value is a function of construction history*. |
| **parser-band.md:118** (cand-O debt 3: recursion bounded by construction, shield non-load-bearing) | **ENDORSED**; L-m4 + L-i1 show the incumbent violates it in three places (depth, memo-key budget, and the absence of any packrat-side bound). |
| **parser-band.md:108/134** (idiom reading: "zero memoize"; G8 gate `memoize = 0`) | **STRONGLY ENDORSED — and L-B1 is the reason it should be non-negotiable.** Both prototype grammars use zero `memoize`, so neither can trip L-B1. The G8 structural graph-walk (`memoize = 0`) is the single cheapest guarantee that the new CSS grammar never touches the defective tier. |
| **CHANGELOG.md:106–111** ("the WDM/LR tier keep is PROVISIONAL … pending the bbnf-lang LR-consumer question") | **AGREED, and L-B1 sharpens it**: the tier is not merely unused-and-taxing, it is *unsound* on a reachable grammar shape. If bbnf-lang is the only prospective consumer, the retire-vs-repair decision now has a correctness term, not just a perf term. |

---

## 6. WHAT WOULD CHANGE THIS CHALLENGE

1. **L-B1 falsified** (the four-line script returns `"x"`/error) → the module's verdict flips from
   *unsound* to *taxing-but-sound*, blockers 1 → 0, and the whole finding set becomes MAJOR-and-below.
2. **A design record for the ε heuristic** surfacing anywhere in parse-that (none found:
   `git log -S GROWING` returns four commits, all cure-commits; `grep -rn "mSL|multi-occurrence|
   Warth|GROWING" parse-that/docs/**.md` returns nothing) → L-B1 becomes a *declared* divergence to
   adjudicate rather than an undocumented defect. It does not become correct.
3. **`Parser.parser`/`Parser.call` made non-public** → L-M1, L-m5 arm 2, and L-M2 arm C all collapse.
4. **An exported arm-state accessor** → L-M4 arm 2 collapses and W1's G-4 becomes satisfiable as
   written.

---

*Read-only. No parse-that file was modified; nothing was executed against parse-that; the single
`node -e` run imported nothing. Sole write: this file.*
