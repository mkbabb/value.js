claude-opus-5[1m]

# CHALLENGE — parse-that module `packrat` — LIBRARY axis (L)

**Slug** `packrat` · **Axis** L · **Date** 2026-08-04 · **Seat** Opus solo (mechanical/challenge tier, M-12)
· **Revision 2** — supersedes revision 1 at this same path. R2 is a second, independent full read of the
module and its imports. It **carries forward** every r1 finding that survived re-verification (each marked
`[r1]`, each re-checked against the bytes, not copied on trust), **adds eleven** findings r1 did not have
(marked `[r2]`), **upgrades one** severity with the reason stated, and **corrects two** r1 claims that the
tree contradicts (§8.1, §8.2). Nothing from r1 was dropped silently.

**Subject** `/Users/mkbabb/Programming/parse-that/typescript/src/parse/packrat.ts` (488 lines).

**Read whole, plus every file it imports** (read-only, main checkout only): `./parser.ts` (712),
`./state.ts` (190), and transitively `./utils.ts` (187), `./leaf.ts` (400), `./lazy.ts` (44),
`./diagnostics.ts` (15), `./packrat-entry.ts` (6), `./index.ts` (14), `./debug.ts`, `./core.ts`,
`./split.ts`, `./ansi.ts`. Also read: `test/memoize.test.ts` (177), `test/reentrancy.test.ts` (215),
`test/utils.ts`, `scripts/proof-packrat-armed.mjs`, `scripts/proof-packrat-reentrant.mjs`,
`typescript/CHANGELOG.md`, `typescript/package.json`, and the shipped bundles
`dist/packrat-entry-CS1td-8B.js`, `dist/packrat-entry-46NYx4_U.cjs`, `dist/diagnostics-DDazRHgl.js`,
`dist/packrat.{js,cjs,d.ts}`, `dist/packrat-entry.d.ts`.

**Evidence-tree provenance.** `/Users/mkbabb/Programming/parse-that` @ **`ef10d5b`**. The checkout is
*dirty* — `.cargo/config.toml`, `README.md`, `rust/Cargo.lock`, and seven files under `rust/` are modified.
**None** is under `typescript/`; every file cited below is byte-identical to `HEAD`. `packrat.ts` last
touched by `934b2fa` (S.H1 latch); the ε block cited in **L-B1** dates to `193854d` (A.W2), line 322 amended
by `7901314` (tranche B) — `git log -S GROWING -- typescript/src/parse/packrat.ts` returns exactly those
four commits (`934b2fa`, `2c806fb`, `7901314`, `193854d`), all cure-commits.

**Law compliance.** Single write = this file. **Nothing was executed against parse-that** — no test run, no
bench, no import of the package: the `PACKRAT_ARMED` latch is one-way (**PT-03**, confirmed at source *and*
in both shipped bundles below) and arming it in any process contaminates every later measurement seat.
Diagnostics were likewise never armed. The only commands run were `git`/`grep`/`sed`/`ls`, and two bare
`node -e` invocations containing **pure float64 arithmetic with zero imports** (reproducing the `getCijKey`
formula by hand — §6 S-1 and §3 L-M2). Every dynamic claim is either (a) a hand-executed trace with each
step line-cited, or (b) stated as a falsifiable prediction with the exact script the wave must run.
`/Users/mkbabb/Programming/parse-that-css-totality-p2` **does not exist** (`ls` → `No such file or
directory`) — **no STOP finding**; nothing was created there. No `.worktrees/`, no frozen root, no
`~/Documents/Codex` was entered.

**Posture.** Assumed DEFECTIVE until the tree proved otherwise. It proved otherwise on eight points (§6) and
failed on twenty-four (§2–§5), two of them soundness BLOCKERs — one admitting strings outside the grammar,
one leaving a fixed cross-input defect live on a public path.

---

## 0. VERDICT

| | count |
|---|---|
| BLOCKER | **2** |
| MAJOR | 7 |
| MINOR | 11 |
| INFO | 4 |
| **defects total** | **24** |
| superlatives | **8** |

**The headline.** The module's own comments (`packrat.ts:6–50`) present WDM
(Warth–Douglass–Millstein) as implemented faithfully, with one stated extension: a `GROWING` table serving
an ε to "a head that names itself MORE THAN ONCE in its own body" (`:41–47`). **The extension as coded is
not that.** Its guard tests *positional containment only* (`:322–323`) — it fires for **any** occurrence of
the memoized parser at a position inside the growing seed's span, reached from **any** rule, whether or not
the grammar admits ε there. §2.1 gives a four-line grammar and a two-character input where this converts a
correct **reject** into a **spurious accept** carrying a phantom `undefined`. I re-derived that trace
independently in r2 and it holds step for step.

**The second-order finding** is structural, and it is what has kept L-B1 survivable so far: the packrat
tier's three soundness cures (**PT-B1** cross-input, **PT-Q1** re-entrancy, the (id,offset) key) are all
bolted to **one** entry point, `Parser.parseState`, while `Parser` publishes **three** (`parseState`, the
`public parser` field, `call()`). parse-that's own packrat suite drives its soundness assertions through the
**unprotected** one (§2.2), one named proof gate is provably vacuous (§3 L-M7), and a second gate's
headline safety guard admits two inputs it was written to reject (§3 L-M2).

**The third-order finding, new in r2**, is that two of the module's most confident written claims are not
maintained by the code that follows them: the termination argument at `:48–50` reads a cell the body may
rewrite (§3 L-M3), and the bookkeeping discipline praised in §6 S-3 for `GROWING` is absent three lines
away for `HEADS` (§3 L-M4).

---

## 1. METHOD

1. Read `packrat.ts` end to end, twice per revision — once for control flow, once for allocation sites and
   hidden-class shapes.
2. Read every import transitively, and `Parser` in full, because `packrat.ts`'s soundness contract is a
   *joint* invariant with `Parser.parseState` (`parser.ts:34–49`), not a property of `packrat.ts` alone.
3. Read the two test files that exercise packrat and the two packrat proof scripts, to separate what is
   **gated** from what is merely **believed**.
4. Hand-executed the WDM machinery on five grammars: `H = H R | 'x'` with a **non-memoized** intermediary
   `R = H 'z'`; `H = H 'ab' | H 'a' H | 'x'`; `H = H 'b' | 'a' H | 'x'`; the `mZ/mY/mSL` shapes from
   `memoize.test.ts:22–37`; and (r2) `expr = expr '+' term | '(' expr ')' | num` — the last of which
   **failed** to trigger the ε and is recorded as a killed hypothesis (§8.4).
5. Reproduced `getCijKey`'s arithmetic in a zero-import `node -e` to test the guard's **totality**, not
   just its tightness (r2 — this is what produced L-M2).
6. Read both shipped bundles to confirm the O-15 dist cites at the bytes rather than trusting the letter.
7. Folded the hitherto corpus (INBOX **O-15**; `X/parse-that/waves/W0..W4` + `CONFORMANCE-2026-08-03`;
   `registry/adjudicated/parser-band.md`) — cited where overlapping, contradicted explicitly in §7 where
   the tree disagrees.

---

## 2. BLOCKERS

### 2.1 · L-B1 — BLOCKER — the `GROWING` ε-substitution admits strings outside the grammar `[r1, re-verified r2]`

**Provenance** `packrat.ts:315–331` (guard), `:322–323` (the two positional predicates), `:329` (the ε
answer), `:193`/`:382` (`GROWING` keyed on `p.id` alone). Doc claim at `:41–47`.

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

**The defect.** `GROWING` carries **no component identifying which body the occurrence was reached from**.
The guard therefore cannot distinguish the case the comment describes ("a head that names itself MORE THAN
ONCE in its own body", `:41`) from the case where a **different rule** invokes the head at a position that
merely happens to lie inside the growing span. In the latter case the head is *required* to match, the
grammar admits no ε there, and the guard hands back a non-advancing success anyway. `all()` then **silently
drops** the `undefined` from the result array (`leaf.ts:199,207,230,238,246,267`:
`if (state.value !== undefined) out[w++] = state.value`), so the phantom leaves no trace in an `all()`-shaped
body; a `then()`-shaped body carries it into the AST as a literal `undefined` (`parser.ts:90`).

**Counterexample — hand-executed twice, independently, every step line-cited.**

```ts
import { string, memoize, Parser } from "@mkbabb/parse-that";
const x = string("x"), z = string("z");
const H: Parser<any> = memoize(Parser.lazy(() => H.then(R).or(x)));   // H → H R | 'x'
const R: Parser<any> =         Parser.lazy(() => H.then(z));          // R → H 'z'   (NOT memoized)
H.parse("xz");
```

`H ⇒ H R ⇒ x R ⇒ x H z ⇒ x x z`. The language is `'x' | H H 'z'`; the shortest non-`x` string is `"xxz"`.
**`"xz"` is not in `L(H)`** — it would require `H ⇒ ε`, which the grammar does not admit.

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
| 10 | — | `R@1` → `H@1` → `recall(1)`: **`cell === undefined`** (first entry at offset 1); `growKey=K0`; `K0 % 2³² = 0` (§6 S-1); `1 > 0` ✓ and `1 <= growSeed.offset (1)` ✓ → **`packrat.ts:329` returns ε** |
| 11 | — | `z@1` matches → offset **2**; `R` = `[undefined,"z"]`; body succeeds at offset 2 |
| 12 | `packrat.ts:398–399` | `2 > 1` → seed grows to `{2, ["x",[undefined,"z"]]}` |
| 13 | `packrat.ts:392–400` | pass 2: `H@0`→2; `R@2`→`H@2` ε again (`2 > 0`, `2 <= 2`); `z@2` at EOF fails → body falls to `x@0` → offset `1 <= 2` → **break** |
| 14 | `packrat.ts:401` | `applyAnswer(seed)` → **offset 2, `["x",[undefined,"z"]]`, `isError:false`** |

**Result: `H.parse("xz")` returns `["x",[undefined,"z"]]` having consumed the whole input**, so
`H.eof().parse("xz")` **succeeds** where it must fail. Without the ε (step 10 evaluating fresh instead),
`H@1` would try `H R` (LR marker → fail) then `x@1` against `'z'` → fail → `R` fails → body fails → grow
halts at the seed, offset 1 — the **correct** answer. The heuristic does not *preserve* a result the plain
algorithm would miss; it **manufactures** one.

**Why the existing suite does not catch it.** Every memoized rule in `memoize.test.ts` is *itself* memoized
(`mSL`/`mZ`/`mY`, `:22–37`; `sS`, `:39–51`; `expression`, `:53–73`). The intermediary in the counterexample
(`R`) is **not** memoized, so the head is re-entered at seed-end from a rule the `GROWING` table cannot see
as foreign. No test in the tree has that shape. Compounding it, the only in-tree grammar that could plausibly
nest a self-reference inside a span is the math test, and `generateMathExpression` (`test/utils.ts:73–85`)
emits `num op num op num …` with **no parentheses and no nesting whatsoever** — confirmed by reading the
generator and by `grep '"("' test/memoize.test.ts test/math.test.ts` returning **nothing**.

**r2 correction to r1 — a design record *does* exist, and it indicts rather than exonerates.** r1 asserted
that a full grep of `parse-that/docs/**` "returns no specification of the heuristic anywhere". That is
**literally wrong**: `docs/tranches/A/PROGRESS.md:14` records the A.W2 landing as "the full
Warth-Douglass-Millstein packrat-with-LR (position-keyed seed-grow + in-progress marker + **a general
multi-occurrence ε rule**)", closing "Stress-tested + adversarially re-verified". The record exists — as one
clause, with no semantics. And the word that matters is **"general"**: the author knew the rule was broader
than the same-body case the source comment (`:41`) describes. The gap between `:41`'s "in its own body" and
PROGRESS.md's "general" is exactly the defect, written down at the moment it landed. This strengthens L-B1;
it does not soften it.

**Severity rationale — BLOCKER.** Silent over-acceptance in a parser library is the worst failure class: no
throw, no `isError`, a well-formed-looking AST. It is precisely the class the module's own header claims to
have closed ("a non-recursive reuse of P at a later/disjoint offset can NEVER mis-restore the earlier
result", `:19–21`) — the (id,offset) key does close *that*, and then `:315` re-opens a strictly worse one,
because a mis-restore returns a *wrong-but-real* answer while the ε returns a *fabricated* one.

**FALSIFIER.** Run the four-line script in a fresh process. If `H.parse("xz")` returns `"x"` (offset 1) or
errors, the trace is wrong and this finding is **REFUTED in full**. Secondary: if `H.eof().parse("xz")`
fails, consumer-visible harm is bounded to the phantom `undefined` and this drops to MAJOR. Tertiary: if the
wave shows the ε guard is *load-bearing* for `mSL` — i.e. `mSL` (`.opt()`-wrapped at `memoize.test.ts:25`,
so it already has a legitimate ε route) reds when `:315–331` is deleted — then this is a **design** BLOCKER
(the heuristic must be re-scoped) rather than a **dead-code** BLOCKER. It does not clear either way.

**Repair sketch** (not an ask; for the wave's cost model). Serve the ε only when the requesting occurrence's
`LR_STACK` chain reaches the growing head's own frame — i.e. key on the head's `(id,pos)` cell **plus**
LR-stack membership, not on `p.id`. The witness already exists: `LR_STACK` (`:135`) and `head.involvedSet`
(`:373`) are exactly the "reached from within this head's body" evidence the guard is missing.

---

### 2.2 · L-B2 — BLOCKER — the epoch is bolted to one of three public entry points, so PT-B1 stays live on the others `[r1 as L-M1; UPGRADED MAJOR→BLOCKER in r2]`

**Provenance** `packratEnter` (`packrat.ts:216`) / `packratExit` (`:243`) have **exactly two call sites**:
`parser.ts:43` and `:47`, both inside `parseState`. `grep -rn "packratEnter" src/` → the import at
`parser.ts:7` and that one call. `Parser` publishes three ways to run a parser:
`parseState` (`parser.ts:34`), **`public parser: ParserFunction<T>`** (`parser.ts:30` — a public *field*,
freely callable, and the library's own universal internal calling convention), and `call(state)`
(`parser.ts:437`, a public method, used by `state.unsafeCall`, `state.ts:92–94`). **Neither `parser` nor
`call` opens an epoch.**

**The defect.** All three documented packrat soundness properties — cross-input (**PT-B1**, `:161–164`),
re-entrancy (**PT-Q1**, `:165–171`), and unwind-on-throw (`:234–240`) — are consequences of the
`try/finally` at `parser.ts:44–48`, **not** of `packrat.ts`. The memo key is `(id, offset)` with **no src
component** (`:79–100`), and `CURRENT_SRC` — the only thing that ever knew the source — is never read for a
decision (§4 L-m1). A consumer driving `p.parser(new ParserState(src))` therefore gets: the module-init
`MEMO`/`HEADS`/`GROWING` (never swapped), unbounded cross-input accumulation, and **no unwind** — a throw
mid-grow leaves `LR_STACK` (`:449`) and a poisoned `{ans: lr}` cell (`:450`) in the module globals for the
rest of the process (§4 L-m5).

**This is not hypothetical: parse-that's own packrat suite runs its soundness gates on that path.**

| test | line | call |
|---|---|---|
| "(id, offset)-keyed memo does NOT mis-restore across offsets" | `memoize.test.ts:97` | `p.parser(st)` |
| "default parse() does not clear the packrat cache" | `memoize.test.ts:131` | `seeded.parser(st)` |
| PT-Q2 ">1MB source yields no cross-offset mis-restore" | `reentrancy.test.ts:206`, `:211` | `letter.parser(st0/stB)` |
| PT-WAVE-1 reentrancy pair | `reentrancy.test.ts:47`, `:69`, `:71` | `outer.parser(state)`, `a.parser(sa)`, `b.parser(sb)` |

So the (id,offset) soundness assertion, the >1MB assertion, and the reset-tax assertion are **all** measured
on the un-epoched path; the epoch path is exercised only by LR happy-path smoke. The tree's own usage is the
proof that the bypass is a first-class path, not an abuse — and `memoize.test.ts:119–134` goes further and
**asserts the cache survival that the bypass makes possible** as desired behaviour.

**Why r2 upgrades this to BLOCKER.** r1 graded MAJOR. The predicted consequence is a **silent wrong answer**
of exactly the class that was already adjudicated a shipped BLOCKER once: `memoize(p).parse('hello')` then
`.parse('world')` returning `'hello'` is PT-B1 (`CHANGELOG.md` 0.12.0), and on the bypass path the offset-0
cell for `p` is never cleared, so the same mechanism is intact. A soundness property that holds at one of
three public entry points, is documented without that qualification (`:158–181` states the guarantee
flatly), and whose absence resurrects a previously-shipped BLOCKER, is a BLOCKER — grading it MAJOR
understates it. I record the disagreement with r1 rather than silently re-grading.

**FALSIFIER.** If `Parser.parser` and `Parser.call` were `private`/`@internal`, or if `packratEnter` were
invoked from `Parser.call` too, this drops to INFO — both are public and neither is (`parser.ts:29–32`,
`:437`). Direct disproof: `const w = memoize(regex(/[a-z]+/)); const a = new ParserState("hello");
w.parser(a); const b = new ParserState("world"); w.parser(b);` — if `b.value === "world"`, the bypass is
cross-input sound and the finding is refuted. **Prediction: `b.value === "hello"`** — PT-B1 revived. Not
measured here (arming is forbidden by this seat's law); the wave must run it.

---

## 3. MAJOR

### L-M1 — `resetPackrat()` is a public export with no correct call site `[r1]`

**Provenance** `packrat.ts:262–272`; exported at `index.ts:8` and `packrat-entry.ts:5`; present in the
published `dist/packrat.d.ts` + `dist/packrat.js`; **recommended by the module's own header at `:15`**
("resetting the caches per parse via `resetPackrat()`"). Consumers repo-wide: **zero outside tests**
(`memoize.test.ts:14,67,91,108,120`; `reentrancy.test.ts:104,197`).

**Arm A — between parses it is provably a no-op.** `packratEnter` (`:218–230`) saves the current module-level
Maps and installs **fresh** ones; `packratExit` (`:244–249`) restores the saved ones. At depth 0 the saved
object *is* the module-init trio (`:133`, `:134`, `:193`), and every cell written during the parse goes into
the *installed* Maps, dropped on exit. Between two epoch-opened parses the globals are always the pristine
module-init empties, so `resetPackrat()` clears three already-empty Maps.

**Arm B — during a parse it crashes the library.** `MEMO.clear()` (`:267`) removes cells that three sites
then dereference under a non-null assertion: `:396`, `:401` (`MEMO.get(key)!.ans as Answer`) and `:455`
(`MEMO.get(key)!`). A user `.map` callback — ordinary user code running mid-parse (`parser.ts:151`) —
calling `resetPackrat()` reproduces **exactly** the PT-Q1 crash signature the CHANGELOG records as a shipped
correctness BLOCKER, and `scripts/proof-packrat-reentrant.mjs:1–9` states the mechanism verbatim:
"`resetPackrat()` clears MEMO/HEADS/GROWING/LR_STACK → `growLR`'s `MEMO.get(key)!.ans` non-null assertion
read `undefined` → a `TypeError` thrown out of the PUBLIC `.parse()` API." PT-Q1 moved the *reset trigger*;
it did not remove the unchecked `!` on a Map a public export can still clear.

**Arm C — its only non-vacuous use is on the unsound path.** On L-B2's bypass no epoch opens, `MEMO`
accumulates, and `resetPackrat()` genuinely clears it. The export's sole meaningful use papers over a path
that is itself unsound.

**Severity rationale.** A public API whose correct-use set is empty, whose own documentation recommends it,
and one of whose two reachable behaviours is a `TypeError` out of the library. Cure: guard at `:266` with
`if (LR_STACK !== undefined || GROWING.size > 0) return;`, and replace the three `!` with a typed throw.

**FALSIFIER.** Arm A: `memoize(string("ab").map(v=>{n++; return v}))`, parse twice through `.parse()`; if
`n` does not increment on the second parse, the seed survived the epoch and Arm A is refuted. Arm B: a
`.map` calling `resetPackrat()` inside a left-recursive grow; if it does not throw, Arm B is refuted.

---

### L-M2 — the "fail-loud" memo-key guard is **not total**: `NaN` and negative offsets bypass it, and `NaN` collapses every parser into one memo cell `[r2 — NEW; corrects r1]`

**Provenance** `packrat.ts:90–99`, with the claim at `:91–93`: "Fail loud at the boundary rather than
silently alias a memo cell. This is unreachable for any realistic grammar/source; **it guards the float64
mantissa ceiling so a degenerate input can never produce a wrong answer.**"

```ts
if (parser.id > MEMO_MAX_ID || offset >= MEMO_OFFSET_SPAN) { throw new RangeError(…); }
return parser.id * MEMO_OFFSET_SPAN + offset;
```

**Falsified by pure arithmetic** (zero-import `node -e`, reproducing the formula):

```
NaN offset,  id=1 -> NaN      | id=7 -> NaN        (both guards pass: every NaN comparison is false)
Map NaN collision: cell stored under id=1 is READ BACK by id=7   ->  "A"
neg offset  id=5,off=-1 -> 21474836479  ==  id=4,off=SPAN-1 -> 21474836479     (equal? true)
frac offset id=1,off=1.5 -> 4294967297.5
Infinity -> THROW
```

* **`NaN` passes both comparisons**, yields key `NaN`, and `Map` uses SameValueZero — so **every parser at a
  `NaN` offset shares one memo cell**. The demonstration shows parser id 7 reading parser id 1's stored
  answer. This is the *maximal* aliasing the guard exists to prevent, and it is the one case the guard admits.
* **Negative offsets alias exactly**: `key(5,−1) === key(4,SPAN−1)`. The partner offset (~4 GB) is
  unreachable on V8, so I grade this arm theoretical and say so.
* Fractional offsets pass and pollute the table with keys no lookup will hit.
* `Infinity` correctly throws — credited in §6 S-2.

**Reachability.** `ParserState.offset` is a **public mutable field** (`state.ts:50`) and the tree itself
writes it from outside (`reentrancy.test.ts:205,210`). `mapState` hands the user a live state
(`parser.ts:162–187`); `state.ok(v, offset)` does `this.offset += offset` with an unconstrained `number`
(`state.ts:56–57`). A user combinator computing an offset from a length subtraction that underflows, or from
a failed `indexOf` (`−1`), produces exactly these values.

**Corrects r1.** r1's L-m4 called the guard "arithmetically correct and exactly tight" and its S-1 called it
"the tightest correct guard that exists for this key function". The **tightness** claim survives verbatim
(§6 S-1) — it is about the integer range and it is exact. The **correctness/totality** claim does not: the
guard is tight on the axis it was designed for and open on two axes it was not. Both statements are now
scoped accordingly.

**Aggravating — zero coverage.** `grep -rn "RangeError|MEMO_MAX_ID|out of float64" test/ scripts/` returns
**nothing**. The fail-loud arm — argued over 27 comment lines (`:52–99`) and named in `CHANGELOG.md`'s
PT-Q2 entry as the cure's safety half — has **no executable falsifier anywhere in the repository**.
`reentrancy.test.ts:184–194` tests only that `getCijKey` does not *alias* across the old 20-bit boundary; it
never provokes the throw.

**Cure.** One predicate: `if (!Number.isSafeInteger(offset) || offset < 0 || offset >= MEMO_OFFSET_SPAN ||
parser.id > MEMO_MAX_ID) throw new RangeError(…)`. `Number.isSafeInteger` rejects `NaN`, `Infinity`, and
fractions in a single call.

**FALSIFIER.** Show `NaN >= 2**32` or `NaN > 2097151` evaluating true, or `Map` distinguishing two `NaN`
keys, or `state.offset` being unreachable from consumer code. All four fail; the arithmetic is reproducible
in any engine with no imports.

---

### L-M3 — `growLR`'s termination test re-reads a memo cell the body is permitted to rewrite `[r2 — NEW]`

**Provenance** `packrat.ts:392–400`:

```ts
while (true) {
    head.evalSet = new Set(head.involvedSet);
    evalParser(state, pos);
    const ans = snapshot(state);
    const seed = (MEMO.get(key)!.ans as Answer);   // ← re-read from the table every pass
    if (ans.isError || ans.offset <= seed.offset) break;
    MEMO.set(key, { ans });
}
```

`seed` is re-fetched from `MEMO` each pass rather than held in a local, and the body executed by
`evalParser` **can write that same cell**: `recall`'s eval-set branch does `if (cell !== undefined)
cell.ans = ans;` at `:357`, mutating the cell in place with a scratch re-evaluation's answer.

**Reachability of a write to the head's own cell.** `setupLR` (`:365–376`) adds `s.parser.id` to
`head.involvedSet` for every LR frame newer than the head's own frame, stopping at the frame whose `head`
already matches. The head's own frame at its own position is where the walk stops — but the head appearing
at a **different** offset pushes a *distinct* LR frame (`:443–449`, keyed `(id, offset)`), and that frame
*is* newer, so **`head.involvedSet` can contain the head's own id**. That is exactly the multi-occurrence
shape documented at `:41–47` (`mSL.then(mSL).then(ms)`). Once `p.id ∈ involvedSet`, `head.evalSet` contains
it at `:393`, and a re-entry at the head's own `pos` takes the `:349` branch, which writes `cell.ans` — the
head's own seed cell — mid-pass.

**Two failure modes, both bad.** If the mid-pass write leaves a *larger* offset than the installed seed, the
pass compares against the wrong baseline and can break early → a **silently under-grown parse**. If it
leaves a *smaller* offset than the pass result, `ans.offset <= seed.offset` can be false forever while the
pass keeps producing the same `ans.offset` → a **non-terminating `while (true)`** with three allocations per
iteration. The comment at `:48–50` — "Strictly-monotonic seed advance bounds the grow … **No count cap is
needed**" — is a termination proof over an invariant that `:396` does not maintain.

**Cure (one line, and it is also faster).** Hoist `let seed = MEMO.get(key)!.ans as Answer;` above the loop
and update the local where the store happens at `:399`. This removes one `Map.get` per pass, removes the
re-read hazard, and makes the monotonicity argument true by construction. Note this is the same edit as §4
L-m2's `:399` row.

**Verdict PLAUSIBLE, stated as such.** The three left-recursive tests are green today, so the hazard is not
universal. **FALSIFIER**: instrument `:396` to assert the fetched object is identical to the one installed
at `:418` or last stored at `:399`, and run `mSL`. If identity holds on every pass of every in-tree grammar,
downgrade to MINOR (defensive coding). If it fails on `mSL`, this is CONFIRMED and the termination comment
must come down with it.

---

### L-M4 — `HEADS` has no save/restore across nested grows while `GROWING`, three lines away, does `[r2 — NEW; extends §6 S-3]`

**Provenance** `packrat.ts:380–406`:

```ts
HEADS.set(pos, head);                       // :381  — no prevHead captured
const prevGrowing = GROWING.get(p.id);      // :382  — prev captured
GROWING.set(p.id, key);                     // :383
try { … } finally {
    if (prevGrowing !== undefined) GROWING.set(p.id, prevGrowing);   // :403
    else GROWING.delete(p.id);                                       // :404
    HEADS.delete(pos);                                               // :405  — unconditional
}
```

`GROWING` (keyed `p.id`) is treated as a properly nested depth-1 stack — and §6 S-3 credits that as better
than most WDM implementations. `HEADS` (keyed `pos` alone, read at `:308`, written at `:381`) is treated as
if only one head can ever be active at a position: no `prevHead`, and the `finally` **deletes** rather than
restores.

**Consequence if two distinct heads grow at the same offset** — the shape mutual/indirect recursion
produces, and the module documents `mZ→mY→mZ` at `:37–38`, all at offset 0: the inner `growLR` overwrites
`HEADS[pos]` and then erases it. The outer grow resumes with `HEADS.get(pos) === undefined`, so `recall`
(`:335`) falls through to "ordinary memoization" for the rest of the outer grow: the "not the head and not
involved → must FAIL" guard (`:339–345`) stops firing and involved rules stop being re-evaluated
(`:349–360`). The outer grow's remaining passes behave like plain packrat → a **silently truncated
left-recursive result**, no throw.

**The asymmetry is itself the finding.** Both tables are per-head, per-grow bookkeeping with identical
lifetimes. One is nesting-safe; the other is not. **Either** the nesting is impossible — in which case
`prevGrowing` (`:382`, `:403–404`) is dead code and §6 S-3 is praising a no-op — **or** it is possible, in
which case `:381`/`:405` is a defect. The module cannot be right both ways, and that contradiction is
visible without running anything.

**Verdict PLAUSIBLE.** I traced `mY.parse("zss")` (`memoize.test.ts:22–37`) by hand: only `head_Y` reaches
`growLR` at offset 0 — `mZ`'s frame is re-parented to `head_Y` by `setupLR`'s walk (`:371–375`) and takes
the non-head branch (`:412–415`). So the in-tree grammars do not exhibit it. **FALSIFIER**: instrument
`:381` with `if (HEADS.has(pos)) throw new Error("nested head at pos");` and run the full suite. Silence ⇒
downgrade to MINOR **and** delete `prevGrowing` as dead. A throw ⇒ CONFIRMED, BLOCKER-class.

---

### L-M5 — the evalSet scratch re-evaluation silently discards diagnostics `[r1]`

**Provenance** `packrat.ts:349–360`, specifically `:351` `const scratch = live.clone()` and `:356`
`snapshot(scratch)`; `state.ts:101–109` (`clone`); `utils.ts:28–49` (`mergeErrorState`).

`ParserState.clone()` copies exactly five fields — `src`, `value`, `offset`, `isError`, `furthest`. It does
**not** copy `expected`, `suggestions`, or `secondarySpans`; the clone gets fresh `[]`/`undefined` from the
field initialisers (`state.ts:43–45`). `recall` then runs a **full sub-parse** on that detached state
(`:355`) and takes back only `{offset, value, isError}` (`snapshot`, `:252–254`; `applyAnswer`, `:256–260`).
Three losses:

1. **Furthest-offset advance is lost.** Everything `mergeErrorState` wrote to `scratch.furthest` dies with
   the clone, so the reported error position (`parser.ts:60`) can point *earlier* than the deepest offset
   the parse actually reached.
2. **Labels are lost.** `expected` accumulated inside the scratch is discarded.
3. **Accumulation is mis-based.** `mergeErrorState`'s "same furthest → append" branch (`utils.ts:36–47`)
   starts from a **blank** `expected` inside the scratch, so even the labels it builds are built against the
   wrong base set.

Two adjacent sites compound it: the ε answer (`:329`) and the forced-FAIL answer (`:344`) are constructed
**without** calling `mergeErrorState` at all, so a forced failure inside an active head contributes nothing
to furthest/expected tracking either.

**r2 addition — the loss is structural, not just local to the clone.** `Answer` is *only*
`{offset, value, isError}` (`:103–107`), and `applyAnswer` restores only those three. So **every** memo hit
skips diagnostic accumulation too. The consequence is that a memoized grammar's error message depends on
cache state: parse the same input twice within one epoch and `furthest`/`expected` differ. A consumer
building error UI on the diagnostic tier (`diagnostics.ts:6–14`) gets a non-deterministic message for a
deterministic grammar and input. `grep -n "furthest\|expected\|suggestions\|secondarySpans"
src/parse/packrat.ts` → **zero hits**.

**Interaction with O-15 PT-01.** PT-01 established that `label` is a no-op unless diagnostics are armed and
that arming drags an unconditional `console.error`. L-M5 is the packrat-tier *second* degradation: even with
diagnostics armed and paying the `console.error` tax, the memoized LR path loses a slice of what was
collected — and it becomes visible exactly when a consumer turns diagnostics on to debug something. W2's
**EQ-4** and **R-LAW-3** ("diagnostics are values, never effects", `W2.md:254`, `:266`) are the right law;
this is one more measured reason.

**FALSIFIER.** Armed diagnostics + a mutually-recursive memoized grammar (`mZ`/`mY`, `memoize.test.ts:28–30`)
where the deepest offset is reached only inside an involved rule's re-evaluation. If `state.furthest` after
the parse equals the true deepest reach, the loss is masked by a redundant non-scratch path → MINOR. If
`state.expected` is identical with and without the `:349` branch taken, arm 2 is refuted. Alternatively,
argue that skipping diagnostics on a memo hit is *intended* memoization semantics — defensible, but then it
belongs at `:103`, and the eval-set clone's silent discard remains a distinct undocumented loss.

---

### L-M6 — PT-03 confirmed at source **and** in both bundles, and worse than the dist reading: arm-at-construction, unobservable, unresettable `[r1, extended r2]`

**Provenance (source)** `packrat.ts:156` (`let PACKRAT_ARMED = false`), `:290` (`PACKRAT_ARMED = true` — the
**first statement of `makeMemoized`**, before `p` is even bound at `:292`), reads at `:217` and `:266`.
Repo-wide grep returns exactly five lines: one comment header (`:137`), the initialiser, the two reads, the
single `true` write. **No assignment back to `false` anywhere in the TypeScript source.**

**Provenance (shipped bytes — r2 addition).** Exhaustive `grep PACKRAT_ARMED dist/*.js dist/*.cjs`:

```
packrat-entry-CS1td-8B.js:678:let PACKRAT_ARMED = false;      packrat-entry-46NYx4_U.cjs:679: (same)
packrat-entry-CS1td-8B.js:682:  if (!PACKRAT_ARMED) return null;                        :683
packrat-entry-CS1td-8B.js:714:  if (!PACKRAT_ARMED) return;                             :715
packrat-entry-CS1td-8B.js:722:  PACKRAT_ARMED = true;                                   :723
```

Four occurrences per bundle, one init-to-false, two reads, one set-to-true, **no disarm** — reproducing
O-15/PT-03's `:678`/`:682`/`:714`/`:722` **exactly** in the ESM bundle, and confirming it independently in
the CJS bundle (offset by one line), which the letter did not cite. The dist has not moved on this since
O-15 was sent.

Three amplifications the dist reading alone could not see:

1. **It arms at CONSTRUCTION, not first invocation** (`:290`). Merely *importing* a module that builds a
   memoized parser at load time — never invoking it, behind a flag never enabled, in a transitive dependency
   never called — taxes **every unrelated top-level parse in the process** with a five-field snapshot plus
   three `new Map()` (`:218–227`). O-15's 93.9 → 138.2 ns/parse (**1.47×**) is therefore payable by a grammar
   with no relationship to the memoizer. `CHANGELOG.md:106–111` concedes the shape ("'free' holds **only for
   memoize-free processes**"); it does not concede that a *constructed-and-never-called* memoizer suffices.
2. **The latch is unobservable through the public surface.** `index.ts:8` and `packrat-entry.ts:5` export
   exactly `memoize, mergeMemos, resetPackrat`; `dist/packrat.js`'s tail re-exports the same three. There is
   no `isPackratArmed()`, no `packratState()`. **This makes W1's G-4 unsatisfiable as written** — see the
   contradiction recorded in §7.
3. **`resetPackrat()` deliberately does not disarm** (`:266`). O-15's "`resetPackrat()` leaves 139.3 ns" is
   explained exactly by this line, and `W3.md:292` already rules that it must.

**r2 addition — a cure that keeps the soundness and drops most of the tax.** The epoch does not need three
eager Maps. Keep a module-level `const EMPTY = new Map()` sentinel installed by `packratEnter`; `memoizeFn`
— the **only** writer — does `if (MEMO === EMPTY) { MEMO = new Map(); HEADS = new Map(); GROWING = new
Map(); }` on its first write. An armed process then pays **one reference compare** per memoized node and
**zero Map allocations** for any parse containing no memoized node. The epoch record itself can be a 5-slot
stack of module-level `let`s, since nesting is strictly LIFO and synchronous (`parser.ts:43–48`), removing
the last per-parse allocation. This is strictly smaller than "make it disarmable", and it makes the
one-wayness nearly free — which is the honest reason the latch exists.

**FALSIFIER.** Any `PACKRAT_ARMED = false` in shipped source or dist refutes arm 3 — grep says none exists in
either bundle. Arm 1 is refuted if `makeMemoized` is shown lazy; `:290` precedes every other statement. Arm 2
is refuted by any exported accessor; the two export lists above are complete.

---

### L-M7 — the `proof:reset-tax-gone` gate is vacuous `[r1, re-verified r2]`

**Provenance** `memoize.test.ts:115–134`, the block comment naming the gate at `:115–118`.

The test seeds the cache with `memoize(string("ab")).parse("ab")`, runs an unrelated default `parse()`, then
asserts "The seed must still be present: re-running the memoized parse hits the cache" via
`expect(st.isError).toBe(false); expect(st.offset).toBe(2)` (`:132–133`).

**The claim is false and the assertions cannot detect it.** `seeded.parse("ab")` goes through `parseState` →
`packratEnter` (armed) installs fresh Maps → the cell is written into the *installed* `MEMO` → `packratExit`
restores the module-init empties (`:218–230`, `:244–249`). The seed is **discarded at `packratExit`**, not
preserved. The final probe at `:131` uses `seeded.parser(st)` (the L-B2 bypass), which re-parses
`string("ab")` from cold against the empty module-init `MEMO` and lands on `isError:false, offset:2` —
**identical** to a cache hit. The two assertions have no power to distinguish a hit from a cold re-parse;
the gate would stay green if the memo table were deleted entirely. I re-derived this in r2 against
`:218–230`/`:244–249` and it holds.

**Corollary worth stating.** Because the epoch drops all cells at exit, the packrat memo provides **zero
cross-parse reuse** under `.parse()`. That is correct for packrat — the memo's job is within one parse — but
it means the header's boast at `:12–13` ("The default parse() pays no per-parse `MEMO.clear()` tax") has
been answered by trading a clear for an allocate-and-drop, which is what makes L-M6's 1.47× the real number.

**Severity rationale.** A *named* proof gate certifying a property the code does not have. On the LIBRARY
axis this is worse than a missing test: it is a green light on a false claim, and it is the only gate behind
the "reset tax removed" performance story.

**FALSIFIER.** Add a side-effect counter to the wrapped parser (`memoize(string("ab").map(v=>{n++; return
v}))`) and assert `n` does not increment on the "cache hit". If `n` stays flat, the seed did survive and the
finding is refuted. **Prediction: `n` increments.**

---

## 4. MINOR

**L-m1 — `CURRENT_SRC` is write-only dead state. `[r1]`** `packrat.ts:186` (declaration), `:223` (snapshot
field), `:229`, `:249`, `:271`, `:433–435` (the only assignment) — nine grep lines, three of them comments.
It is **never read for any decision**: the only read is `if (CURRENT_SRC === undefined)` at `:433`, guarding
its own write. Nothing compares it to `state.src`; no assertion, no throw, no branch. The comment at
`:183–185` calls it "a within-epoch assertion anchor" — **there is no assertion**. Cost: a field in every
`PackratEpoch` allocated per armed top-level parse (`:218–224`), a restore per exit, and a branch plus a
global write in `memoizeFn`, the hot path. It is a live residue of the deleted PT-Q1 per-node reset
(`:165–171`) — the mechanism went, the variable stayed. *Falsifier*: any read affecting control flow or
output. Grep says none.

**L-m2 — allocation discipline is internally inconsistent on the hot LR path. `[r1 + r2 rows]`**

| site | issue |
|---|---|
| `packrat.ts:399` `[r1]` | `MEMO.set(key, { ans })` allocates a **fresh `MemoCell`** every grow iteration, where `:463` mutates in place. `MEMO.get(key)!.ans = ans` is identical semantics, zero allocation. |
| `packrat.ts:393` `[r1]` | `head.evalSet = new Set(head.involvedSet)` — a fresh `Set` per grow pass. Reusable via `clear()` + refill, or a generation counter. |
| `packrat.ts:358–359` `[r1]` | `MEMO.set(key, { ans }); return MEMO.get(key);` — a redundant hash lookup; both branches can return the cell object directly. |
| `packrat.ts:307` `[r1]` | `const head = HEADS.get(pos)` is computed **before** the ε block at `:315–331`, which returns at `:329` without using it — a wasted probe on the ε path. |
| `packrat.ts:351` `[r1]` | `live.clone()` allocates a `ParserState` **plus two fresh arrays** (`state.ts:44–45`) per involved-rule re-evaluation per grow pass — O(passes × \|involvedSet\|). Correctness half at L-M5. |
| `packrat.ts:437` + `:306` `[r2]` | **`getCijKey` is computed twice per memoized node** from identical arguments — `memoizeFn` computes `key` at `:437`, then `recall(pos, state)` recomputes it at `:306`, range checks and float64 multiply included. `recall` has exactly one call site and always receives `pos === state.offset`. Cure: `recall(pos, key, live)`. |
| `packrat.ts:455` `[r2]` | `const cell = MEMO.get(key)!` is computed before the `:457` split but used **only** in the `else` arm at `:463`. Every left-recursive resolution pays a `Map.get` it discards. |
| `packrat.ts:329`, `:344` `[r2]` | Each allocates a `MemoCell` **and** an `Answer` that are **never stored in `MEMO`** — read once at `:470–475` and discarded. Both are hit repeatedly during a grow. A single module-level scratch cell suffices (single-threaded, consumed synchronously before any re-entry). |

For a module whose entire justification is "opt-in, off the fast path", the *armed* path deserves the
discipline `leaf.ts` already shows (`fuseAll`'s one-array-per-call, `leaf.ts:166–177`). *Falsifier*: a
heap-delta measurement showing TurboFan scalar-replaces these. Escape analysis cannot save `:399` (escapes
into `MEMO`) or `:351` (escapes into `parser.parser`).

**L-m3 — `MemoCell.ans` is a two-hidden-class union with a structural probe. `[r1]`** `MemoCell.ans: Answer
| LR` (`:125–127`) mixes a 3-field shape (`:103–107`) with a 4-field shape (`:110–115`) in one slot. `isLR`
(`:129–131`) discriminates by reading `.parser` off both — a property **absent** from `Answer`, i.e. a
deliberate missing-property load on the common path, which walks to `Object.prototype` and pollutes the
inline cache. Every `.ans` load site (`:318`, `:396`, `:401`, `:455`, `:463`, `:470`, `:475`) is polymorphic.
A `kind: 0|1` discriminant on **both** shapes (or two maps, `MEMO` / `IN_PROGRESS`) makes each load
monomorphic and each check an integer compare. *Falsifier*: `--trace-ic` on a grow-heavy grammar showing the
sites stay monomorphic. Not run here (no benches permitted) — graded MINOR and explicitly marked unmeasured,
per L-18 discipline.

**L-m4 — `getCijKey` throws a raw `RangeError` out of the parse path, and the id arm is reachable in a
long-lived process. `[r1]`** `:90–98`. The guard's failure mode is a **throw**, not `ok:false` — the same
boundary posture O-15 **PT-07** records for non-string inputs and **PT-04** for depth, and the posture
`parser-band.md:118` (cand-O debt 3) and `W2.md:157` rule against ("recursion bounded **by construction**").
The offset arm (`offset >= 2³²`) is unreachable in JS (V8 caps strings ≈ 2²⁹). The id arm
(`parser.id > 2_097_151`) is reachable in principle: `PARSER_ID` is a process-global `PARSER_ID++` in the
`Parser` constructor (`parser.ts:18`, `:25`) and **every** combinator call mints one (`.then` `:99`, `.or`
`:118`, `.map` `:156`, `.trim` `:492`+`:514` — two per call…), never recycled. A long-lived process building
grammars dynamically crosses 2.1M eventually, after which every memoized parse throws mid-parse. The comment
calls it "unreachable for any realistic grammar" (`:92`) — true for a build-once grammar, unproven for a
build-per-request one. *Falsifier*: show every consumer builds its grammar once at module scope. value.js's
CSS grammar does; the bbnf-lang LR consumer the CHANGELOG names at `:106–111` as *the whole reason the tier
is kept* compiles grammars at runtime — precisely the per-request shape. If bbnf-lang caches compiled
grammars, refuted.

**L-m5 — unwind hardening is asymmetric. `[r1]`** `growLR` carries an explicit `try/finally` restoring
`GROWING`/`HEADS` (`:390–406`) with a comment claiming the epoch is "never corrupted" (`:388–389`).
`memoizeFn`'s LR-stack push/pop has **no** such guard: `LR_STACK = lr` (`:449`), `MEMO.set(key, {ans: lr})`
(`:450`), `evalParser` (`:452`), `LR_STACK = lr.next` (`:454`). A throw at `:452` — a user `.map` throw, an
out-of-budget `RangeError` (L-m4), a stack overflow (L-i1) — leaves `LR_STACK` pointing at a dead frame and a
poisoned `{ans: lr}` cell in `MEMO`. Inside a `parseState` this is contained by `parser.ts:44–48`; **under
L-B2's bypass it is permanent for the process.** *Falsifier*: wrap `:449–454` in `try/finally` and show no
behavioural delta — that *is* the repair, so the finding is confirmed by construction unless the bypass is
closed.

**L-m6 — `getCijKey` is an `export` that no entry point re-exports. `[r1]`** `:79`. Neither `index.ts:8` nor
`packrat-entry.ts:5` re-exports it; the only importers are tests reaching past the barrel
(`memoize.test.ts:3`; `reentrancy.test.ts:186`, a dynamic `await import`). A test-only widening of the
module's surface, against the tree's own stated discipline (S.H2 excised fifteen `*Span` builders precisely
for being "a zero-consumer surface", `index.ts:9–11`). Related: `interface PackratEpoch` (`:196`) is **not**
exported while the exported `packratEnter` (`:216`) returns `PackratEpoch | null`, so the emitted `.d.ts`
names a type the module does not publish. *r2 verification*: this does **not** reach consumers —
`package.json`'s exports map routes `"./packrat"` types → `packrat-entry.d.ts` (3 names) and runtime →
`dist/packrat.js`, whose tail re-exports exactly `memoize, mergeMemos, resetPackrat` (CJS identically), and
there is no `./dist/*` export. Types and runtime **agree**; the finding is internal-hygiene only, and I
record the check so the wave does not re-open it (§8.3).

**L-m7 — Goldilocks: right-sized code, over-sized narration. `[r1]`** Measured: **232 code · 217 comment · 39
blank = 488** (0.94 comment:code). The module is well within Goldilocks for one coherent concern — WDM
packrat is not divisible without inventing a seam, and `CHANGELOG.md:100–102`'s r6 #6 ruling ("parse-that is
**not** zone-partitioned") is the right call; the longest function is `memoizeFn` at 52 lines (`:426–477`).
But a large share of the prose **narrates retired designs**: `:56–70` re-derives the deleted 20-bit mask;
`:80–89` re-derives the deleted `id << MEMO_OFFSET_BITS` int32 shift; `:137–156` and `:158–193` re-tell
PT-B1/PT-Q1/S.H1 history — all of which already exists, verbatim and better structured, in
`typescript/CHANGELOG.md:18–43`, `:122–143`. Source comments should state the invariant; the ledger should
hold the archaeology. This matters on the L axis for one specific reason: **the narration is where L-B1
hides.** `:41–47` describes an invariant that `:315–331` does not implement, and 217 lines of confident
prose is exactly the environment in which a reader takes the comment for the code. *Falsifier*: if any
retired-design paragraph explains a constraint not derivable from live code, it stays. `:56–70` and `:80–89`
do not — the live invariant is one sentence.

**L-m8 — the module's own perf comment contradicts the measured evidence. `[r2 — NEW]`** `:144` claims the
eager-epoch cost is "~30 ns / 3-Map alloc per parse; **mid-teens %** throughput on short CSS values". O-15
measured **93.9 → 138.2 ns = 1.47×**, i.e. **+47%**, and `W1.md:446` measured **55.6 ns** unarmed on a
different box (so the ratio, not the ns, is the transportable quantity). Whether the honest figure is 47% or
something else, "mid-teens %" is supported by no receipt in either repo — and it is the number a reader uses
to decide the latch is cheap. *Cure*: replace with the O-15 ratio and its honest `N=1, one machine` bound, or
delete the figure and cite the letter. *Falsifier*: produce the measurement behind "mid-teens %". None is
cited in-tree.

**L-m9 — `mergeMemos` is a behavioural duplicate of `memoize`. `[r2 — NEW]`** `:482–488`: both call
`makeMemoized`; the **only** difference is the `name` string in `createParserContext` (`:479`,
`state.ts:179–189`), consumed by nothing except the debug printer. `grep -rn "mergeMemo" src/ test/` → the
two definitions, the doc comments, the `parserNames` tuple entry (`state.ts:151`), the barrel exports, and
**one** consumer (`memoize.test.ts:58`) whose behaviour would be identical under `memoize`. The doc at
`:274–278` implies a cooperative relationship that is true of *any two* `memoize` calls at the same
`(id, offset)`. Two exported names for one function is public surface to maintain, version, and document
forever. *Falsifier*: exhibit any branch on `context.name === "mergeMemo"`. None exists outside the printer.

**L-m10 — three unchecked `as Answer` downcasts on the union, defended only by a non-local invariant.
`[r2 — NEW]`** `:396`, `:401`, `:463`. If the cell ever held an `LR` at those points, the cast writes
`state.offset = undefined` and `state.isError = undefined` **silently** (`applyAnswer`, `:256–260`) instead
of throwing. I traced the control flow and believe the invariant holds today (`:418` installs an `Answer`
before `growLR`; nothing deletes from `MEMO` — `grep "MEMO\.delete"` → no hits), so this is latent, not
live. But the safety spans `lrAnswer`, `growLR`, and `recall`, is unasserted, and would be free to assert:
`const a = MEMO.get(key)!.ans; if (isLR(a)) throw …`. Note `:463`'s cast is provably redundant — `cell.ans`
was assigned an `Answer` on the line before. *Falsifier*: prove the invariant **locally**. You cannot.

**L-m11 — type quality. `[r2 — NEW]`** (a) `ParserFunction<T>`'s type parameter is **phantom** —
`parser.ts:14–16` declares `(val: ParserState<any>) => ParserState<any>`, ignoring `T` — so
`memoizeFn as ParserFunction<T>` (`:479`) asserts nothing and the `as` is likely removable. (b) `undefined as
T` appears twice (`:298`, `:354`) — an unsound cast producing exactly the value PT-07 flags as unobservable.
(c) `snapshot(scratch as ParserState<unknown>)` (`:356`) is needed only because `snapshot` is non-generic
(`:252`) despite reading three fields present on every instantiation; generifying removes the cast.
(d) `recall`'s return type `MemoCell | undefined` conflates "the cell that lives in `MEMO`" with "a synthetic
answer that does not" (`:329`, `:344`) — a caller that mutated the result would silently lose the write; the
two cases deserve distinct types.

---

## 5. INFO

**L-i1 — the recursion ceiling under packrat is strictly below PT-04's 7,761. `[r1]`** O-15 **PT-04**
measured `Parser.lazy` arity 1 at deepest-OK **7,761**, thrown `RangeError` at 7,762 (reproduced at
`W1.md:549`, `:553`, `:573`). `memoizeFn` inserts **at least two** frames per memoized node on the ordinary
path (`memoizeFn` `:426` → `evalParser` `:295` → `parser.parser` `:299`), a third on the evalSet path
(`recall` `:305` → `parser.parser` `:355`), and `growLR` (`:380`) → `evalParser` → body on every grow pass.
A memoized grammar's effective ceiling is therefore materially lower, and `packrat.ts` supplies **no depth
bound of its own** — exhaustion surfaces as a thrown `RangeError`, not `ok:false`. Same posture as L-m4;
feeds `parser-band.md:118` and W3's G-9 depth leg (`W3.md:86`, `:288–290`), which already names the right
shape ("bound so exhaustion is an ordinary `ok:false`"). *Falsifier*: measure deepest-OK for
`memoize(Parser.lazy(...))` in a fresh process; if it equals 7,761 the frames are being folded and this is
refuted. Not measured here (arming forbidden).

**L-i2 — PT-07's `undefined` ambiguity is realized in-tree, not hypothetical. `[r2 — sharpens r1]`** `parse()`
is `return this.parseState(val).value` (`parser.ts:77–79`), so failure returns `undefined`. Success can
**also** return `undefined`, from at least three in-tree sites: `leaf.ts:341–343` (a custom `matchFunction`
returning `""` → `state.ok(undefined)`); `leaf.ts:355–357` (an **empty regex match** → success with
`undefined` — note `whitespace = regex(/\s*/)`, `leaf.ts:397`, is exactly this parser); and **`packrat.ts:329`
— packrat's own ε contribution**. So the library manufactures the colliding value on three normal paths, one
inside the module under challenge. This *strengthens* O-15's posture that the cure is a named JS-boundary
invariant **above** parse-that (entry via `parseState` + `isError`, never `parse()` truthiness —
`parser-band.md:108`): that invariant is not defensive style, it is the only sound way to read this API.
Non-string inputs likewise reach `state.src.charCodeAt` / `.startsWith` (`leaf.ts:285`, `:297`) through an
unchecked `new ParserState(val)` (`parser.ts:52`) and throw a raw `TypeError`.

**L-i3 — `"sideEffects": false` versus a top-level side effect. `[r2 — NEW]`** `package.json` declares
`sideEffects: false`, but `parser.ts:711` executes `_initWhitespace()` at module scope, mutating the exported
`whitespace` binding in `leaf.ts:395–399`; `packrat.ts:133–134,193` allocate three module-scope `Map`s at
import. `packrat.ts:1` imports `parser.js`, so any bundler graph containing packrat contains the side effect.
Nothing is observed to break (the binding is reachable from the barrel), but the declaration is not literally
true, and `sideEffects: false` is exactly the license a bundler needs to drop the initializer.

**L-i4 — O-15's PT-01 cite has drifted by one line; the substance has not. `[r2 — NEW]`** PT-01's first cite,
`dist/diagnostics-DDazRHgl.js:14`, is **exact**: `state.expected = diagnosticsEnabled && label ? [label] :
void 0;`. Its second, `dist/packrat-entry-*.js:881`, is now at **`:882`** in
`dist/packrat-entry-CS1td-8B.js` (and `:883` in the CJS bundle) — the statement, its guard
(`if (isDiagnosticsEnabled())`), and its coupling are byte-identical to O-15's description; only the ordinal
moved, consistent with a rebuild. Downstream artifacts should re-cite `:882`. Source-side the coupling is
unambiguous: `utils.ts:33` and `:38` gate `expected` on `diagnosticsEnabled`, and `parser.ts:67–69` fires
`console.error(this.state.toString())` with no injection point and no level. (A second `console.error` at
`parser.ts:693` / `dist:262` is `parserDebug`'s default logger — opt-in, injectable, and **not** part of
PT-01.)

---

## 6. SUPERLATIVES (L-18 runs both ways)

**S-1 — the float64 key budget is *exactly* tight, not merely safe. `[r1]`** `MEMO_MAX_ID =
Math.floor(Number.MAX_SAFE_INTEGER / MEMO_OFFSET_SPAN)` (`:77`) with `SPAN = 2**32` (`:72`). Verified in a
bare zero-import `node -e`:

```
MEMO_MAX_ID = 2097151
MEMO_MAX_ID·2³² + (2³² − 1) = 9007199254740991 = Number.MAX_SAFE_INTEGER    → equal: true (slack 0)
(MEMO_MAX_ID + 1)·2³² = 2⁵³ = 9007199254740992                              → not a safe integer
(MEMO_MAX_ID·2³² + 12345) % 2³² = 12345                                     → the offset decodes exactly
```

The maximum legal `id` and the maximum legal `offset` sum to **precisely** `MAX_SAFE_INTEGER` — not one bit
of headroom wasted, not one legal `(id, offset)` pair falsely rejected — and the constant is *derived*, not
hard-coded, so the tightness is structural rather than lucky. The two tests that pin it
(`memoize.test.ts:161–175`, `reentrancy.test.ts:185–194`) pin the *right* boundaries (the old int32 `<< 20`
overflow at id 4096; the old 20-bit offset mask at 2²⁰). **Scoped in r2**: this is a statement about the
integer range and it stands unqualified there. It is **not** a claim of guard totality — L-M2 shows `NaN`
and negative offsets slip past — so r1's phrase "the tightest correct guard that exists" is narrowed to "the
tightest correct *range* guard".

**S-2 — the ε answer is deliberately **not** written to `MEMO`. `[r1]`** `:329` returns a freshly constructed
`{ ans: {...} }` and never calls `MEMO.set`. So even though the heuristic is defective (L-B1), it is
**non-poisoning by construction**: the fabricated ε is scoped to the single occurrence that asked for it,
cannot survive the grow, cannot be restored at a later offset, and cannot leak into the next epoch. The blast
radius of L-B1 is bounded to one parse *by this line*. The naive implementation memoises the ε and corrupts
the whole table. (`Infinity` also correctly throwing at `:90` belongs to the same instinct: fail loud rather
than alias — the right posture even where L-M2 shows the predicate incomplete.)

**S-3 — `growLR` handles nested grows of the same parser id correctly. `[r1]`** `:382–383` + `:403–405`:
`const prevGrowing = GROWING.get(p.id)` … restore-or-delete. A parser beginning a second, inner grow at a
different position while an outer grow of *the same parser* is live (reachable — traced on
`H = H 'b' | 'a' H | 'x'` over `"axb"`, where `H@1` grows inside `H@0`'s setup) restores its parent's growing
key rather than deleting it. Most WDM implementations plain-`delete`, silently disarming the outer grow.
Paired with the `try/finally` this is correct under throw as well as return. **r2 caveat**: the same care is
absent for `HEADS` three lines away (L-M4), so this superlative and that defect are two readings of one
inconsistency — the discipline shown here is exactly the discipline missing there.

**S-4 — arming at construction makes the ordering property a theorem, not a race. `[r1]`** `:290` is the
first statement of `makeMemoized`, before `p` is bound. "The latch is armed before any memoized parse can
open an epoch" is therefore a consequence of construction order — you cannot obtain a memoized parser without
having armed. Arming on first *invocation* would create a genuine window (that invocation's own
`packratEnter` already ran unarmed, at `parser.ts:43`, before `memoizeFn` is reached). The comment at
`:284–289` states exactly this and it is correct. The **one-wayness** is the defect (L-M6); the **timing** is
right, and the three no-op arms (`:217`, `:243`, `:266`) are symmetric and complete, so the unarmed path
touches zero globals and allocates zero Maps.

**S-5 — `setupLR` correctly excludes the head from its own `involvedSet`. `[r1]`** `:365–376`. The loop
condition `while (s !== undefined && s.head !== head)` stops **before** adding the head's own frame, because
`:366–368` sets `lr.head = head` on that frame first. Traced on both the direct case (`H = H R | 'x'`:
`involvedSet = ∅`) and the mutual case (`mZ → mY → mZ`, `memoize.test.ts:28–30`: `involvedSet = {mY}`) —
both correct per WDM. `growLR` then relies on it at `:393` so `recall` serves the head its own seed (`:361`)
rather than re-evaluating it (`:349`). Getting the head in or out of its own involved-set by one frame is the
classic WDM implementation bug, and this tree does not have it.

**S-6 — hidden-class discipline is uniform across every allocation site. `[r2 — NEW]`** All four `Answer`
literals use the identical key order `{offset, value, isError}` (`:253`, `:329`, `:344`, `:444`) → one V8
map, not four. All six `MemoCell` literals are the single-key `{ ans }` (`:329`, `:344`, `:358`, `:399`,
`:418`, `:450`) → one map. The `LR` literal (`:443–449`) initialises `head` and `next` to `undefined` **at
construction** rather than adding them later — the difference between one shape and three shape transitions
per LR frame. For a hot parser library this is the discipline that actually matters, it is easy to get wrong,
and it is uniform here. (L-m3's polymorphism is a *union-slot* problem, not a literal-shape problem; the
literals themselves are clean.)

**S-7 — the grow is iterative, not recursive. `[r2 — NEW]`** `while (true)` at `:392`, with the memo carrying
the prefix, so the number of grow passes contributes **zero** stack depth. A recursive GROW-LR would make
PT-04's ceiling a function of input length; this one does not. It directly bounds the blast radius of L-i1.
It also means the grow is **not** quadratic — each pass's left-recursive prefix is served from the memo in
O(1) (`:335`/`:361`), so a left-linear grow is O(n) passes at O(1) amortised each; only the *allocations*
scale with n (L-m2). I record this because the opposite claim is the obvious one to make and it would have
been false (§8.4).

**S-8 — the epoch is at the right altitude. `[r2 — NEW]`** PT-Q1 replaced an O(nodes) per-node
`state.src !== CURRENT_SRC` comparison with an O(parses) snapshot/restore at the entry boundary (`:158–181`,
`parser.ts:35–48`). That is a strictly better *shape* for the check — fewer executions, one owner, and it
composes with nesting via save/restore rather than via wiping. The instinct is correct even though L-M6
shows the implementation over-pays on allocation and L-B2 shows the boundary chosen is not the only entry
point.

---

## 7. CORPUS FOLD — where I agree, extend, and contradict

| corpus row | disposition |
|---|---|
| **INBOX O-15 / PT-01** (label no-op unless armed; arming couples an unconditional `console.error`; `dist/diagnostics-DDazRHgl.js:14` + `dist/packrat-entry-*.js:881`) | **CONFIRMED at source and at the bytes.** First dist cite exact. **CONTRADICTED by one line on the second**: it is now `:882` (ESM) / `:883` (CJS) — substance identical, ordinal drifted; re-cite downstream (**L-i4**). **EXTENDED by L-M5**: on the packrat tier, armed diagnostics are additionally *lossy*. |
| **INBOX O-15 / PT-03** (one-way latch; 93.9→138.2 ns = 1.47×; `resetPackrat()` leaves 139.3) | **CONFIRMED at source (5 lines, one `true` write, no disarm) and byte-for-byte in BOTH bundles** — ESM `:678/:682/:714/:722`, CJS `:679/:683/:715/:723` (the CJS confirmation is new). **EXTENDED by L-M6**: arms at *construction*; unobservable through any exported surface; plus a lazy-allocation cure. **CONTRADICTED in-tree by L-m8**: `packrat.ts:144` calls the cost "mid-teens %" against O-15's measured 1.47×. |
| **INBOX O-15 / PT-04** (lazy 7,761; `RangeError` at 7,762) | **FOLDED, not re-measured** (arming forbidden). **EXTENDED by L-i1**: packrat's added frames put the memoized ceiling strictly below 7,761, with no module-side bound. |
| **INBOX O-15 / PT-07** (5/5 non-string → raw `TypeError`; `.parse()` `undefined`-on-failure) | **CONFIRMED structurally** (`parser.ts:52`, `leaf.ts:285/297`, `parser.ts:77–79`). **SHARPENED by L-i2**: success-with-`undefined` is *manufactured* at `leaf.ts:341–343`, `leaf.ts:355`, and **`packrat.ts:329`** — the ambiguity is realized, not hypothetical, which makes O-15's above-the-library cure the only sound reading. **EXTENDED by L-m4**: `getCijKey` adds a *third* raw-throw boundary. |
| **W1 §3a / G-4** ("`PACKRAT_ARMED === false` at entry and exit of every cell, read from the dist, never inferred", `W1.md:434`, `:459`) | **CONTRADICTED — unsatisfiable as written.** No accessor is exported (`index.ts:8`, `packrat-entry.ts:5`, `dist/packrat.js` tail — all exactly three names), so runtime arm-state cannot be witnessed; reading dist *text* is a static observation, not a runtime one at cell exit. Re-specify as the retained-heap clause `scripts/proof-packrat-armed.mjs` already implements (subclass `Map` before importing the built dist; count constructions across N non-memoized parses; expect 0 armed-unarmed, 3N pre-arming) in a memoize-free process — that **is** observable, and it is the only observable form. See L-M6 arm 2. |
| **W1 one-fresh-process-per-cell** (`W1.md:94–96`, `:279–281`) | **ENDORSED and strengthened.** Correct not only because the latch never disarms but because (a) L-M1 arm A shows `resetPackrat()` cannot undo it, and (b) L-B2 shows a stray `p.parser(state)` anywhere in a harness additionally accumulates `MEMO` across cells with no epoch to drop it. `proof-packrat-armed.mjs:12–21` states the same isolation requirement in its own words — the harness law and the module's own proof script agree. |
| **W2 R-LAW-3 / EQ-4** (diagnostics are values, never effects; structural equality on `code/start/end/expected[]`) | **ENDORSED, with L-M5 as new supporting evidence**: the incumbent loses `expected`/`furthest` across the scratch clone and across every memo hit, so even an armed incumbent cannot satisfy EQ-4 on the LR path. |
| **W2 K-6** ("kills any candidate whose parse #100,001 is different", `W2.md:367`) | **NEW EVIDENCE**: on L-B2's bypass path `MEMO` is never cleared, so parse #100,001 differs from parse #1 in cost (unbounded table) and, by the PT-B1 mechanism, possibly in *answer*. K-6 should name the bypass explicitly. |
| **W2 O-8 anti-latch construction rule** (`W2.md:161`, `:254–255`, `:962`) | **ENDORSED**; L-M6 supplies the source-level receipt (arm-at-construction) that makes the rule sharper than "no one-way global latch": *no global whose value is a function of construction history*. |
| **W3 §289–292** ("`resetPackrat()` must actually disarm rather than only clearing the memo store") | **AGREED and UNDERSTATED.** L-M6 arm 3 confirms it does not disarm; L-M1 adds that it must also refuse to fire mid-grow, because as shipped it reproduces the PT-Q1 `TypeError` from a public export. |
| **parser-band.md:118** (cand-O debt 3: recursion bounded by construction, shield non-load-bearing) | **ENDORSED**; L-m4 + L-i1 show the incumbent violates it in three places (depth, memo-key budget, absence of any packrat-side bound). |
| **parser-band.md:108/134** (idiom reading "zero memoize"; G8 gate `memoize = 0`) | **STRONGLY ENDORSED — and L-B1 + L-M6 are why it must be non-negotiable.** Both prototype grammars use zero `memoize`, so neither can trip L-B1; and because a single *construction* arms the process irreversibly (L-M6 arm 1), `memoize = 0` is also the only structural guarantee that the new CSS grammar never taxes the constellation. G8's graph-walk earns its keep twice over. |
| **CHANGELOG.md:106–111** ("the WDM/LR tier keep is PROVISIONAL … pending the bbnf-lang LR-consumer question") | **AGREED, and L-B1 sharpens it**: the tier is not merely unused-and-taxing, it is *unsound* on a reachable grammar shape. If bbnf-lang is the only prospective consumer, the retire-vs-repair decision now carries a correctness term, not just a perf term — and per L-m4 bbnf-lang's runtime grammar compilation is also the shape that makes the `PARSER_ID` ceiling reachable. |
| **`docs/tranches/A/PROGRESS.md:14`** (A.W2 landing: "a general multi-occurrence ε rule … Stress-tested + adversarially re-verified") | **CONTRADICTS r1's "no design record anywhere" and INDICTS the code.** The record exists as one clause with no semantics, and its own word — **"general"** — concedes the over-scope that `packrat.ts:41`'s "in its own body" denies. Folded into L-B1. |

---

## 8. HYPOTHESES THE FALSIFIER KILLED (recorded, so the tally is honest)

**8.1 — "No design record for the ε heuristic exists anywhere in parse-that's docs."** *(r1 claim, killed in
r2.)* `docs/tranches/A/PROGRESS.md:14` records it. The finding survives — strengthened — but the claim was
false as stated and is corrected in L-B1.

**8.2 — "The `getCijKey` guard is arithmetically correct, full stop."** *(r1 claim, narrowed in r2.)* It is
exactly tight on the integer range (S-1) and open on `NaN`, negatives, and fractions (L-M2). Both halves are
now stated separately so neither over-claims.

**8.3 — "`getCijKey`/`packratEnter`/`packratExit` leak into the published API."** *Killed.* They are
`export`ed from the source module and appear in `dist/packrat.d.ts`, but `package.json`'s exports map routes
`"./packrat"` types → `packrat-entry.d.ts` (3 names) and runtime → `dist/packrat.js`, whose tail re-exports
exactly those three (CJS identically); there is no `./dist/*` export, so deep imports are blocked. Types and
runtime **agree**. Downgraded to the internal-hygiene note at L-m6.

**8.4 — "The grow is quadratic — each pass re-parses the accumulated span."** *Killed.* Each pass's
left-recursive prefix is a memo hit at O(1) (`:335`/`:361`), so a left-linear grow is O(n) passes at O(1)
amortised. Only the allocations scale (L-m2). Reporting quadratic blow-up would have been a false finding;
the true observation is recorded positively at S-7.

**8.5 — "The ε heuristic misfires on parenthesised left-recursive arithmetic
(`expr = expr '+' term | '(' expr ')' | num`)."** *Not confirmed on that grammar.* I traced `"(1+2)+3"`: the
inner `expr@1` already holds a memo cell when the outer grow revisits, so `cell === undefined` at `:315` is
false and the ε does not fire. The counterexample that **does** fire needs a **non-memoized** intermediary
(L-B1's `R`), which is why r1's grammar is the right witness and this one is not. Recorded so the wave does
not waste a cell on the wrong grammar.

**8.6 — "Two heads growing at the same offset is demonstrable on the in-tree `mZ`/`mY`/`mSL` grammars."**
*Killed by hand-trace* — `setupLR`'s walk (`:371–375`) re-parents `mZ`'s frame to `head_Y`, so only `head_Y`
reaches `growLR` at offset 0. L-M4 therefore ships as PLAUSIBLE with an instrumentation falsifier, not as
CONFIRMED.

**What would change this challenge.** (1) L-B1 falsified (the four-line script returns `"x"`/errors) → the
verdict flips from *unsound* to *taxing-but-sound* and every remaining finding is MAJOR-and-below.
(2) `Parser.parser`/`Parser.call` made non-public → L-B2, L-m5 arm 2, and L-M1 arm C all collapse.
(3) An exported arm-state accessor → L-M6 arm 2 collapses and W1's G-4 becomes satisfiable as written.
(4) `Number.isSafeInteger` added at `:90` → L-M2 collapses.
(5) The seed hoisted out of `growLR`'s loop → L-M3 collapses (and L-m2's `:399` row with it).

---

## 9. DISPOSITION

The module is **not** the sloppy artifact the "assume defective" prior expects. Its key algebra is exactly
tight (S-1), its ε is deliberately non-poisoning (S-2), its same-id nested-grow bookkeeping is better than
most published WDM implementations (S-3), its `involvedSet` boundary avoids the classic off-by-one-frame bug
(S-5), its object shapes are uniform (S-6), and its grow costs no stack (S-7). Where it fails, it fails in
one place with one shape: **module-global mutable state whose lifecycle is irreversible, entry-point-shaped,
or asserted rather than enforced.**

* an ε rule whose guard is positional where the invariant is structural — **admitting strings outside the
  grammar** (**L-B1**, hand-traced twice, with the landing note's own word "general" as the concession);
* soundness cures bolted to one of three public entry points, with the leak test-pinned (**L-B2**);
* a reset that crashes what it resets, recommended by the module's own header (**L-M1**);
* a headline safety guard that admits the two inputs most likely to arise from arithmetic (**L-M2**);
* a termination proof that reads a cell its own body may rewrite (**L-M3**);
* two tables with the same lifetime and opposite nesting discipline (**L-M4**);
* a latch that arms on *construction* and never disarms (**L-M6**, = O-15/PT-03, confirmed in both bundles);
* and a named proof gate that certifies a property the code does not have (**L-M7**).

For the megatranche the operative consequences are: **(i)** W1's G-4 must be re-specified as a retained-heap
clause — as written it is unsatisfiable against the published surface — while W1's one-process-per-cell rule
is *under*-justified rather than over-cautious (L-B2 adds a second reason); **(ii)** `parser-band.md`'s
`memoize = 0` idiom gate is load-bearing twice over — it is the only structural guarantee that the new CSS
grammar neither trips L-B1 nor arms the process; **(iii)** W3's "`resetPackrat()` must disarm" is right and
understated — it must also refuse to fire mid-grow; **(iv)** the CHANGELOG's PROVISIONAL keep of the WDM/LR
tier now carries a *correctness* term, not only a perf term; and **(v)** O-15's PT-01 second cite should be
re-issued as `dist/packrat-entry-CS1td-8B.js:882`, one line off the letter, substance unchanged.

---

*Read-only. No parse-that file was modified; nothing was executed against parse-that; the two `node -e` runs
imported nothing. Sole write: this file (revision 2, superseding revision 1 at the same path).*
