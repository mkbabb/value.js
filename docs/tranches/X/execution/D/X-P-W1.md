SERVED MODEL: claude-opus-5[1m]

# X.P.W1 — Harness, Corpus, and the Honest Bench — EXECUTION RECORD (Track D, X·P)

Authority of order: `docs/tranches/X/EXECUTION-RUNBOOK.md` §1.4 (Track D, strictly serial) · §3.4
(locks) · §5 (seat law). Owner-gated items ruled at `docs/tranches/X/COHESION.md` §0i + §0j — cited
by id below, never presumed. The governing spec is `docs/tranches/X/parse-that/waves/W1.md`
(718 L, read whole at this seat's clock; `shasum -a 256` banked in §Open). **E-3: `W1.md` is
immutable — every correction in this record is a dated addendum-beside, never an edit of the spec.**

---

## Open

**Date**: 2026-09-17. **Seat**: X.P.W1 seat 0 (OPEN), `claude-opus-5[1m]`.
**Begin-word**: the owner's 2026-09-17 word, quoted verbatim at COHESION §0j; X·P's two words
(begin + release) are ruled given at **§0j.E OP-1**.

### The spec of record

⟨cmd⟩ `shasum -a 256 docs/tranches/X/parse-that/waves/W1.md && wc -lc < …/W1.md`

```
519df03ff21b48f3b2c4f352d6a4d8ae98c86d3dde117ba786b6c924204c6d09  docs/tranches/X/parse-that/waves/W1.md
     718   55891
```

**718 L / 55,891 B.** This digest is the coordinate every unit's receipt cites; if it moves, the
spec moved and the plan below is re-derived rather than resumed.

### Preconditions — `Opens after` (§2 State) and §2b OP-1..OP-4

The spec's `Opens after` line reads: ***"X.P.W0 closed (the fresh root exists at the ruled commit
and the frozen roots are proven byte-unchanged) AND the owner's begin-word standing."*** Verified at
the bytes AND in the ledger, both:

| # | condition | verdict | receipt (⟨cmd⟩ → output) |
|---|---|---|---|
| **P/1** | **X.P.W0 CLOSED in the ledger**, with the spec's named artefacts present | **MET** | `execution/LEDGER.md` Track D row 1 status cell = **`CLOSED 2026-09-17`**, commits `80d96f18` · `b69611a8` · `8a83c8bb` · `6da438f6` (+ record appends). Named artefacts present at the bytes: ⟨`ls -la docs/tranches/X/execution/D/`⟩ → `X-P-W0.md` 114,760 B; ⟨`ls -la docs/tranches/X/parse-that/waves/`⟩ → `W0-CLOSE.md` 69,185 B. Event-log line of 2026-09-17: *"X.P.W0 CLOSED — fresh adversarial L-20 CHECK 1 returns CONFORMANT … 8 of 8 REPRODUCE"* |
| **P/2** | **the fresh root exists at the ruled commit** (= OP-1) | **MET** | ⟨`git -C /Users/mkbabb/Programming/parse-that-css-totality-p2 rev-parse HEAD`⟩ → **`f5757082ca160dd5f25fcf437e692c9df8f7e78d`**, string-equal to the ruled 40-hex · ⟨`git … status --porcelain \| wc -l`⟩ → **0** · ⟨`git … rev-parse --abbrev-ref HEAD`⟩ → `HEAD` (detached, as W0 left it) · ⟨`git … remote -v \| wc -l`⟩ → **0** (W0 `.c`'s `remote remove`, R-2 UPHELD) · ⟨`find . -type f -not -path '*/.git/*' \| wc -l`⟩ → **691** |
| **P/3** | **the frozen roots proven byte-unchanged** | **MET, by W0's own close + check** | W0's G-3 census diff was empty at three independent captures and a **fourth** at CHECK 1, all at digest `7f0c5b13…19d7`; G-5's source quadruple `7 / ef10d5b7… / 33 / 31` unmoved, inode intersection ∅. This seat does not re-derive W0's census (E-3: a closed gate's evidence is not re-litigated at a successor's open); it records the closure and the one **dated** delta below (F-4) |
| **P/4** | **the owner's begin-word standing** | **MET** | COHESION §0j, quoted verbatim; §0j.E OP-1: *"both owner words are given, dated 2026-09-17"* |
| **OP-1** | fresh root exists at `f5757082…` | **MET** | see P/2 (the spec's own OP-1 row; ABSENT at authoring by design, opened by W0) |
| **OP-2** | the parser-proof harness tree is still readable | **MET — PRESENT AND WHOLE** | ⟨`ls -la /Users/mkbabb/.claude/jobs/9e7dadd0/tmp/parser-proof/`⟩ → 17 entries. **Every byte size the spec's OP-2 row names reproduces exactly**: `equivalence/harness.ts` **20514** · `equivalence/corpus.json` **80065** · `bench/bench.ts` **16591** · `bench/aggregate.mjs` **1396** · `bench/finalize.mjs` **4429** · `gate-recovered.mjs` **11820** · `bench-recovered.mjs` **4741** · `c14-bundle.mjs` **46661** · `live-bundle.mjs` **62483**. ⟨`find … -type f -not -path '*node_modules*' \| wc -l`⟩ → **189**, double-run **189**. **The fallback branch of OP-2 does NOT fire**; `.c` runs its primary mechanism |
| **OP-3** | the prototype workspace resolves | **MET** | ⟨`test -d docs/tranches/V/megatranche/prototypes/css-parser/node_modules`⟩ → PRESENT; `@mkbabb` among its scopes; and the operative proof: `parsethat-surface-gaps.mjs` **ran to completion from it at this seat's clock** (see G-10 baseline), which is the spec's own OP-3 evidence form |
| **OP-4** | the bench bar ruling | **RULED, and the ruling does NOT set a bar** — **COHESION §0j.E OC-1** | *"**OC-1 (OP-3) — ADMISSION IS DECIDED ON CORRECTNESS; the bench table is RECORDED-NOT-GATING**, with the LIVE regex numbers held as the recorded ceiling … never a floor, never a veto, never an invented standard. RC-P conjunct 5 evaluates TRUE on this word once the three-leg table is recorded at X.P.W3."* **Consequence for this wave, stated so no unit misreads it**: OC-1 decouples *admission* from the bench; it ratifies **no** Plane-B bar. Plane B's strict-3× / strict-2× / break-even stay `0/5` OPEN and **UNRATIFIED**, so **G-7's `OWNER-GATED-PENDING-RATIFICATION` marks stand unchanged** and §3a's *"any pressure to set the bar"* trigger stays armed. Unit `.e` cites §0j.E OC-1 by id in the ledger and sets nothing |

**Verdict: all four `Opens after` conjuncts and all four OP rows MET. The wave opens.**

### E13 Step-0 — the four-path mail sweep

Swept read-only at this seat's clock, each path's newest named, then compared **against every row of**
`docs/tranches/V/coordination/INBOX.md`. **Per X.P.W0 CHECK 1's D-1, classification is by STATUS
CELL, not by `grep -i unread` line.**

| # | path | newest entry | disposition |
|---|---|---|---|
| 1 | `docs/tranches/V/` + `docs/tranches/V/coordination/` | `INBOX.md`@2026-09-17 13:20 — **self-excluded** (SELF-COUNT law); next `value-inbox-2026-09-17-o8-o11-amendment-addendum.md`@13:09 = **ours** (the O-21 retained copy, rowed ×2); `V/*.md` tops out at `DECISIONS.md`@2026-07-17 22:15 | **rowed / ours — nothing inbound unrowed** |
| 2 | `../glass-ui/docs/tranches/BK/coordination/` | **BK re-confirmed the newest glass tranche dir** ⟨`ls -ldt ../glass-ui/docs/tranches/*/`⟩ → `BK/`@2026-09-17 12:49 ahead of `BJ/`@2026-08-03 13:54 and `BI/`@2026-07-28 10:52. 4 files; newest `glass-outbound-2026-08-29-valuejs-o20-ack.md`@2026-08-29 16:41 | **= I-30, rowed** (8 INBOX references) |
| 3 | `../keyframes.js/docs/tranches/V/coordination/` | 11 files + `vnext/`, all mtime 2026-09-17 12:58 — the **§B-12 `reset --hard` rewriting the working tree**, not new mail (every body's content date is 2026-07-16/17/24/27; the same reading KF.W0.b banked). Newest by content: `VALUEJS-INBOUND-2026-07-27-library-band-r1-widened-k1-k4.md` | **ours (O-11), rowed** |
| 4 | `../sci-report/atlas/docs/tranches/P/coordination/` | 28 files; newest `valuejs-inbound-2026-07-27-library-band-export-delta.md`@2026-08-03 15:01 | **ours (O-12), rowed** |
| 4b | *(bounded extension, following X-W0's own precedent)* `../sci-report/atlas/docs/tranches/Q/coordination/` — the later atlas lane | 12 files; the two value-addressed letters are `ATLAS-TO-VALUE-2026-07-28-PASS2.md` (**= I-31**) and `ATLAS-TO-VALUE-2026-08-03-RULINGS.md` (**= I-27**) | **both already rowed** — ⟨`grep -c`⟩ INBOX → 2 and 1 |

**Delta test** ⟨`find <the four paths> -maxdepth 1 -type f -newermt "2026-09-17 00:00"`⟩ → value's own
four files (this ledger + three retained/back-filled outbounds of ours) and the eleven reset-touched
keyframes files of path 3. **No new inbound anywhere.**

**Result: 0 unrowed letters · 0 new `I-n` minted · I-31 remains the inbound tail · O-21 the
outbound tail · no `INBOX.md` row is written by this seat and no sweep line is appended, because
nothing moved since the four sweeps already on the file** (P-1 begin-word · X.P.W0 open · KF.W0/KF.W1
· X-W0 · F.W0). **UNREAD in X.P.W1's scope: ZERO.** The one row whose status cell literally reads
`**UNREAD 2026-09-17**` is **I-31**, and its own Routing cell assigns it to **X-W0 (Track A)** —
*"X-W0 close reads this row and marks it FOLDED"* — not to X·P. D-1's law is therefore satisfied by
naming the row, its status word and its routing, rather than by a blanket count.

### Carried in from X.P.W0's close and CHECK 1 — the rows that name this wave

| id | what it asks of X.P.W1 | disposition at this open |
|---|---|---|
| **R-18** (`W0-CLOSE.md:559`) | record the pre-carve and post-carve digests of `coordination/PARSER-CSS-PAUSE-HANDOFF-2026-08-02.md` as **dated coordinates**, and do **not** read the difference as a G-1 MISMATCH | **DISCHARGED HERE, at this seat**: pre-carve `ced23440…f20f7` / 10,205 B at commit `61217711` (W0's G-1 row 1, which still reproduces at that blob); post-carve **`10a12719…e7171`** / **11,163 B** at `2012dbfa`, the mover being **Track A's CC-011 / X-W0.i carve**, an *authored amendment by the wave that owns the rewrite*, §3.1–§3.3 pause coordinates untouched. **Not a mismatch; two dated coordinates of one live document.** |
| **D-3** (CHECK 1, MINOR) | cure `roots-census.sh`'s missing **EPERM** disposition *"as a dated successor script beside"*, owned by X.P.W1 | **RETURNED, NOT SCHEDULED — a bounds finding, not a seat's licence.** `docs/tranches/X/parse-that/evidence/W0/**` appears in **no** row of `W1.md` §4, so authoring the successor script would be the §3a *"write outside §4's table"* trigger that **invalidates the wave**. Nothing is conflated today (the `~/Documents` grant is live; all eighteen rows resolve). **Routed to the orchestrator** as an E-3 bounds-widening question for X.P.W2's open or a dated addendum to `W1.md` §4; no unit of this wave touches it. |
| **R-3** (W0 close) | `x-p-w0.json` carried 4 seats, not 5 | **NOTED for `.e`**: this wave's §5.e sub-gate is *"the harvest JSON's seat count equals the units dispatched"* = **5**. `.e` measures, does not assume. |
| **R-10** (W0 close) | the `~/Documents` grant is **dated, not durable** | **CARRIED**: no gate of this wave reads `~/Documents`; §2c M-22 ¶4 exists precisely so the budgets are citable without the TCC grant (spec §COMPLETABLE). |

---

## Baseline — the ten born-RED gates, run READ-ONLY at open

**Machine record** (for every timing figure below): ⟨`node -v`⟩ **v26.0.0** · ⟨`uname -sm`⟩
**Darwin arm64** · ⟨`sysctl -n machdep.cpu.brand_string`⟩ **Apple M5 Max** · ⟨`sw_vers
-productVersion`⟩ **26.4.1** · ⟨`node -p process.versions.v8`⟩ **14.6.202.33-node.19**.
Every published count below is read from the settled bytes and **double-run** (both readings shown
where they could differ). **L-16**: every row is labelled SOURCE, API-TEST or BENCH-PROCESS; none is
a proof of a product.

| gate | subject | reading at open | verdict |
|---|---|---|---|
| **G-1** | the 52 are the 52 | 51 + 1 = 52 in source; `<p2>/harness/totality` **ABSENT** | **RED** |
| **G-2** | the oracle reproduces GREEN | corpus reads `size 403`; `<p2>/harness/equivalence` **ABSENT** | **RED** |
| **G-3** | harnesses off the scratchpad | `evidence/W1/rescued` **ABSENT** (`evidence/` holds only `W0/`) | **RED** |
| **G-4** | the bench is never armed | latch confirmed live; **no harness exists in the lane** | **RED** |
| **G-5** | diagnostics quarantined | 3 DEBT-1 rows RED; **no harness separates them** | **RED** |
| **G-6** | every budget restated | no lane artifact publishes the restatement | **RED** (with F-2 below) |
| **G-7** | the bar is owner-gated and says so | **no bar ledger exists in this lane** | **RED** |
| **G-8** | R1 totality | **324 throws / 1,548 calls**, exit **1** | **RED** (re-measured at open, as mandated) |
| **G-9** | depth declared, not discovered | ceiling measured; **no corpus in this lane declares a depth** | **RED** (with F-1 below) |
| **G-10** | the five debts measured | **`RED — 7 gap(s)`**, unpiped `$?` = **1** | **RED** |

**Ten of ten RED. `greenBeforeCure` is EMPTY** — no gate of this wave was green before its cure.
(The standing X·P invariant **gate 27** — ⟨`git -C /Users/mkbabb/Programming/value.js status
--porcelain -- src api demo test e2e`⟩ → **0 lines** — is GREEN, as §0j's P-2 already declared it
GREEN-BEFORE-CURE; it is a standing invariant across W0..W4, not one of this wave's ten, so it is
recorded here and not counted as a finding.)

### G-1 — SOURCE. Pasted, at open

⟨cmd⟩ `grep -cE '^    [A-Za-z]+,$' src/css/index.ts`

```
51
```

⟨cmd⟩ `grep -nE '^export \{ [A-Za-z]+ \}' src/css/index.ts`

```
45:export { coerceToSyntax } from "./syntax";
```

Double-run: `51` and `1` (count form). **51 + 1 = 52 = 33 types + 19 runtime** (7 grammar + 1 syntax
+ 3 timeline + 8 stylesheet) — the spec's 2026-08-03 baseline **reproduces exactly at today's HEAD**.
⟨cmd⟩ `test -e /Users/mkbabb/Programming/parse-that-css-totality-p2/harness/totality` → **ABSENT**.
**0 of 52 ported.**

### G-2 — SOURCE. Pasted, at open, read from the corpus itself

⟨cmd⟩ `node -e '…' /Users/mkbabb/.claude/jobs/9e7dadd0/tmp/parser-proof/equivalence/corpus.json`

```
size 403
hints {"stylesheet":121,"color":84,"value":120,"sheet":13,"keyframe-selector":22,"easing":43}
```

`size 403` double-run **403**. The hint map is **byte-for-byte the spec's RED baseline**. The
provenance map as stored is **finer-grained than the spec's five-key summary** — the raw keys are
composite tags (`b:test/*` 216, `c:demo-css` 84, `a:test/parsing` 14, `d:c14-tests` 18, plus 25
`seed:*` and multi-tag combinations). **Finding F-3** (below) records this; it is a *reading* of the
same bytes at a different aggregation, not a moved corpus, and `.b`'s port must preserve the **raw**
tags so the aggregation is reproducible in both forms.
⟨cmd⟩ `test -e …/harness/equivalence` → **ABSENT**. **0 items ported.**

### G-3 — SOURCE. Pasted, at open

⟨cmd⟩ `ls -la docs/tranches/X/parse-that/evidence/`

```
drwxr-xr-x  3 mkbabb  staff   96 Sep 17 12:56 .
drwxr-xr-x  6 mkbabb  staff  192 Sep 17 13:29 ..
drwxr-xr-x  7 mkbabb  staff  224 Sep 17 13:23 W0
```

`evidence/W1/` does not exist; `evidence/W1/rescued/` **ABSENT**. The sole copy of the instruments
is the job temp directory, **present and whole** (OP-2 above): **189** non-`node_modules` files,
double-run 189.

### G-4 / G-5 / G-9 / G-10 — API-TEST. One probe, four invoking gates. Pasted, at open

⟨cmd⟩ (run from `docs/tranches/V/megatranche/prototypes/css-parser`, **unpiped**, stdout and stderr
to separate files so `$?` is the probe's own)
`node docs/tranches/V/megatranche/prototypes/css-parser/parsethat-surface-gaps.mjs`

```
RED  DEBT-1  cand-F reject() label, diagnostics OFF (shipping default) undefined
RED  DEBT-1  Parser.prototype.label / .expected combinator      absent
RED  DEBT-1  enableDiagnostics() is process-global (arity)      0 args
RED  DEBT-3  Parser.lazy ceiling (deepest OK = 7759), failure mode RangeError thrown at depth 7760
RED  DEBT-3  Parser.lazy depth-bound parameter                  arity 1 — (fn) only

     UNARMED median 56.4 ns/parse  (compare the two runs)
ok   LATCH   PACKRAT_ARMED is a module-global one-way flag      packrat-entry chunk :678,:722 — set by makeMemoized(), never cleared
RED  GUARD   parseState(non-string) totality                    5/5 throw raw TypeError
RED  GUARD   .parse() failure signal                            returns undefined — indistinguishable from .opt()

RED — 7 gap(s)
```

**`EXIT=1`** (unpiped, as **L-2** and G-10's own falsifier require). **stderr = 0 bytes.**
**Double-run**, same command, second process:

```
RED  DEBT-3  Parser.lazy ceiling (deepest OK = 7759), failure mode RangeError thrown at depth 7760
     UNARMED median 58.0 ns/parse
RED — 7 gap(s)            EXIT=1
```

**Seven gaps, both runs. The five DEBT rows, the LATCH row and the two GUARD rows all reproduce.**
Two dated divergences from the spec's 2026-08-03 baseline are banked as findings **F-1** and **F-5**.

### G-6 — SOURCE. Pasted, at open

⟨cmd⟩ `grep -rn "1,636,680" docs/tranches/X/ | wc -l`

```
35
```

Double-run **35**. **This is a DIVERGENCE from the spec's RED baseline** (*"returns nothing"*,
2026-08-03) and is banked as **F-2**. The gate is nonetheless **RED**, because its GREEN condition is
the *ledger's* four-row table with both consistency notes, and ⟨`ls docs/tranches/X/parse-that/
evidence/W1/`⟩ → `No such file or directory`. The 35 hits live in **eight** files, every one a
**dated spec**, never a lane artifact: `CONFORMANCE-2026-08-03.md` 2 · `parse-that/waves/W1.md` 10 ·
`W2-fable-author.md` 5 · `W2-opus-author.md` 6 · `W2.md` 5 · `W3.md` 4 · `W4.md` 1 · `waves/W9.md` 2.

### G-7 — SOURCE. Pasted, at open

⟨cmd⟩ `ls docs/tranches/X/parse-that/evidence/W1/` → `ls: …: No such file or directory`.
**No bar ledger exists in this lane. Zero ratified bars bind it** (handoff §3.1: ≥10× RETIRED AS
LAW; strict-3× / strict-2× / break-even each `0/5` OPEN). **§0j.E OC-1 ratifies no bar** — it rules
the bench table *recorded-not-gating*; see the OP-4 row above.

### G-8 — API-TEST. **MEASURE-AT-OPEN**, as the gate mandates. Pasted, at open

⟨cmd⟩ `node docs/tranches/V/megatranche/audit/probes/r1-published-totality.mjs` (unmodified; it
`npm pack`s **this repository** into an OS `mkdtemp` and `rmSync`s it — **zero repository bytes
written**, re-confirmed by gate 27 reading **0** after the run)

```
RED  parseCssColor             102/172 throw
RED  parseCssScalar            102/172 throw
RED  parseCssValue              60/172 throw
RED  parseCssValues             60/172 throw
ok   parseKeyframeSelector       0/172 throw
ok   parseStylesheet             0/172 throw
ok   parseTimingFunction         0/172 throw
ok   parseAnimationTimeline      0/172 throw
ok   parseAnimationRange         0/172 throw

TOTAL 324 throws / 1548 calls
DISTINCT FAILURE MODES: 1
  324x  TypeError: Cannot read properties of undefined (reading 'replace')

RED — 324 totality violations. A ParseResult-returning parser must not throw.
```

**`EXIT=1`.** **The gate's header figures reproduce to the digit at today's HEAD**: 324 / 1,548,
one failure mode, `parseCssColor` **102/172** — exactly the parser-band adjudication's re-confirmed
reading. **Nine parsers targeted; four RED, five ok** — the gate's own *"it targets all nine"*
sentence measured rather than quoted. L-3 is satisfied: this is a fresh reading at this HEAD, not a
pasted count from another.

---

## Findings at open — five, none blocking, each with an owner

| id | severity | finding | measurement | disposition |
|---|---|---|---|---|
| **F-1** | **MINOR — material to G-9** | The `Parser.lazy` ceiling has **MOVED**: the spec (and O-15 PT-04, and a second session) read **deepest OK 7,761 / `RangeError` at 7,762**; this box reads **deepest OK 7,759 / `RangeError` at 7,760** — **stable across a double-run** | both runs printed `deepest OK = 7759 … depth 7760` | **G-9's margin must be computed against the MEASURED ceiling at the unit's own clock, never against 7,761.** The spec calls the ceiling *"a stable property"*; it is stable **per box-state**, not absolutely — which strengthens rather than weakens G-9's own thesis (*"a declared depth with no margin fails: the margin is the assertion"*). Owner: **`.d`**, which re-measures before declaring. |
| **F-2** | **MINOR — a baseline drift, not a gate flip** | G-6's RED baseline (*"`grep -rn "1,636,680" docs/tranches/X/` returns nothing"*) no longer holds: **35 hits / 8 files** | see G-6 above | The baseline was measured **before** the X·P wave specs were themselves written into `docs/tranches/X/`; the restatement now lives in **dated specs**, still never in a **lane artifact**. G-6 stays RED on its GREEN condition. Owner: **`.e`**, which states the drift in the ledger and re-measures the *artifact* clause. |
| **F-3** | **INFO** | G-2's provenance map is stored at a **finer grain** than the spec's five-key summary (`b:232 · c:84 · seed:70 · d:27 · a:19`): the raw keys are composite (`b:test/*` 216, `c:demo-css` 84, `a:test/parsing` 14, `d:c14-tests` 18, + 25 `seed:*`/multi-tag keys) | ⟨`node -e`⟩ over `corpus.json`, pasted above | **Not a moved corpus** — `size 403` and the hint map are byte-identical. `.b` must port the **raw** tags and publish **both** aggregations, so the spec's summary is reproducible *from* the port rather than asserted beside it. Owner: **`.b`**. |
| **F-4** | **INFO** | The lane authority's working-tree bytes moved after W0's close (CC-011 carve, `2012dbfa`) | pre `ced23440…f20f7`/10,205 B @ `61217711`; post `10a12719…e7171`/11,163 B @ `2012dbfa` | **R-18 discharged above.** Two dated coordinates, not a MISMATCH. |
| **F-5** | **INFO** | The UNARMED median drifts run-to-run on one box: **56.4** then **58.0** ns/parse (spec baseline 55.6; O-15 93.9) | both runs pasted above | **This is the spec's own argument, measured**: *"an absolute ns figure is not portable, which is why the bench reports ratios between interleaved cells in one process-set."* Owner: **`.d`** (no bare-ns claims) and **`.e`** (no bare-ns figure enters the ledger as a result). |

## Open questions at open — two, returned to the orchestrator, NOT resolved by this seat

**Q-1 — the fresh root has no `node_modules` and no root `package.json`; §7's *"the fresh root's own
toolchain"* resolves to `<p2>/typescript/`, which is outside §4's create rows.** Measured:
⟨`ls /Users/mkbabb/Programming/parse-that-css-totality-p2`⟩ → `CLAUDE.md LICENSE README.md assets
docs grammar justfile rust rust-toolchain.toml typescript` — **no root `package.json`**;
⟨`find . -maxdepth 3 -name package.json -not -path '*/node_modules/*'`⟩ → **`./typescript/package.json`
alone** (`@mkbabb/parse-that` 1.0.0; devDeps include `vitest`, `typescript`, `vite`, `vite-plugin-dts`);
⟨`test -d <p2>/node_modules`⟩ → **ABSENT**; ⟨`test -d <p2>/typescript/node_modules`⟩ → **ABSENT**.
Globally installed: **`tsc` and `vitest` are present** in `/opt/homebrew/lib/node_modules`; **`tsx`
is not**. **The in-bounds path this seat measures as available, and which the units must take unless
they can prove it insufficient:** `npx tsx` resolves the binary through npm's own `_npx` cache
(5 entries present) — a fetch that writes **zero bytes inside `<p2>`**, exactly the posture §4
already blesses for `r1-published-totality.mjs`'s `mkdtemp`, and the network is authorized by the
begin-word; the harness's *engine* bytes come from **the prototype workspace's already-installed
`node_modules`** and the **vendored sha-pinned tarball** `cand-o/vendor/value-js-4.0.0/`, both
addressed by absolute path from inside `harness/**` — which is precisely what §COMPLETABLE says the
wave needs (*"no network beyond `npm pack` … and the prototype workspace's already-installed
`node_modules`"*). **What is NOT authorized**: `npm ci` in `<p2>/typescript/`, a `<p2>/package.json`,
or a `<p2>/vitest.config.ts` — each is a write outside §4's table and therefore the **§3a
file-bound-expansion trigger that invalidates the wave**. A unit that cannot turn its gate without
one of those **halts and returns**, it does not write.

**Q-2 — G-6's falsifier, read literally, is already tripped by the immutable specs themselves.** The
falsifier reads *"cite `623,544` or `935,317` as this lane's budget anywhere and the gate goes red."*
Measured: `623,544` and `935,317` appear in **`W1.md` alone**; `187,063` in `W1.md` · `W2-fable-author.md`
· `W2-opus-author.md` · `W3.md`; `1,870,633` in `W1.md` · `W3.md` · `waves/W9.md`. In **every** case
the figure is cited **in order to forbid it** (CC-097's *"UNCITABLE until restated"*). These are
**dated specs, immutable under E-3** — deleting the strings would be editing a pinned authority, the
epoch rule's own prohibition, and is refused in advance. **The operative reading `.e` must adopt and
state**: the gate binds *"as **this lane's budget**"* — i.e. a **lane artifact** publishing a
`1,870,633`-derived headroom as its own figure. `.e` publishes the restatement and, in the ledger,
names this reading with its measurement, rather than silently narrowing the falsifier.

---

## Unit plan

**Seat law**: `W1.md` §5 — *"All five units are Opus 5 implementation seats (M-23 §2)"*; no design is
authored and no adjudication is made, so **no Fable seat is spent** (the twice-authored lane opens at
X.P.W2). **§State Agents**: 5 — phase 1: 3 parallel · phase 2: 1 serial · phase 3: 1 serial.
**Peak concurrency 3**, inside the §5.1 four-workflow cap. **§4a Disjointness holds by construction**:
no two units share a `modify` or `modify-carve` path, and the three phase-1 units write three
disjoint subtrees. **Ordering inside phase 1** (§4a): `.c` has no dependency on `.a`/`.b`, and `.a`/`.b`
read the **original** job tree, not `.c`'s copy — so the three run genuinely in parallel and `.c` is
not a bottleneck. OP-2's fallback branch does **not** fire (the tree is present and whole).

**Groups (ordered; ≤3 concurrent; no two concurrent units share a modify path)**

1. `X.P.W1.a` ∥ `X.P.W1.b` ∥ `X.P.W1.c`
2. `X.P.W1.d`
3. `X.P.W1.e`

**Locks and commit families (§3.4 + §9).** `EXECUTION-RUNBOOK.md` §3.4's lock table carries **no row
for X.P.W1** — as CHECK 1's D-2 recorded for X.P.W0, *"no §3.4 lock exists"* for this lane's waves.
What binds instead: **§9's one-commit-per-unit naming**, verbatim; **pathspec commits only**, with
the pathspec **on the `git commit` itself** and staging as late as possible (X-W0.e `:402`'s
shared-index hazard, sharpened at X.P.W0's close: `--only` protects the committing seat but not the
staged file); **commits into the fresh root are made in that root**, their hashes recorded in this
repository's close report — *"the two histories are never merged"*; and `harness/README.md` is
authored **by `.e`, at close, after `.a`/`.b`/`.d` exist** (§4a — it describes all three instruments
and cannot precede them). `scripts/dev/dev.sh` is never touched and never staged. Gate 27 (⟨`git -C
/Users/mkbabb/Programming/value.js status --porcelain -- src api demo test e2e`⟩ → empty) is asserted
at **every** X·P commit.

**Gate ownership.** §5's sub-gate lines own eight of the ten: `.a`→G-1 · `.b`→G-2 · `.c`→G-3 ·
`.d`→G-4/G-5/G-9 · `.e`→G-6/G-7. **G-8 and G-10 are named by no §5 unit**; this seat routes them to
the units that already invoke their probes — **G-10 → `.d`** (§4's row: *"G-4, G-5, G-9, **and G-10**
each invoke it verbatim"*, one script, four invoking gates, one row) and **G-8 → `.e`** (the R1
throw-class is the third leg of the table the ledger publishes). Both baselines are **already
measured at this open** and pasted above; the units re-run at their own clocks and never inherit.

| unit | model | spec sections | writable set | gates | brief |
|---|---|---|---|---|---|
| **X.P.W1.a** | opus | §5 `X.P.W1.a` (L208–231) · §3 items 1 (L84–86) · §6 G-1 (L355–383) · §2c rows L73, L220–222 | `/Users/mkbabb/Programming/parse-that-css-totality-p2/harness/totality/**` (incl. `derive.mjs`) | G-1 | Create the totality corpus in the fresh root. **Derive the manifest BY SCRIPT from value.js `src/css/index.ts` at run time — never hand-typed**: 51 block members + 1 single-line `export { coerceToSyntax }` = **52 = 33 types + 19 runtime** (7 grammar · 1 syntax · 3 timeline · 8 stylesheet). Write the runner that classifies each of the 52 **TOTAL / PARTIAL / ABSENT** reproducing `coverage.md`'s legend exactly, naming what is missing on PARTIAL, reporting **per-slice and in aggregate** (the probe targets all nine public parsers), with `coverage.md` F-3's **37 kf-consumed symbols as a SEPARATE column, never merged into the 52**. `node harness/totality/derive.mjs --check` from `<p2>` exits 0 with derived count == manifest count; plain invocation writes the manifest. Prove the falsifier: delete a manifest type → non-zero exit. Engine/source addressed by absolute path (Q-1); any write outside `harness/totality/**` → HALT (§3a). Commit in `<p2>`: `feat(x-p-w1/totality): derive the 52-export corpus and its TOTAL/PARTIAL/ABSENT runner`. |
| **X.P.W1.b** | opus | §5 `X.P.W1.b` (L233–255) · §3 item 2 (L87–89) · §6 G-2 (L385–413) · §2c rows L74–75 | `/Users/mkbabb/Programming/parse-that-css-totality-p2/harness/equivalence/**` (incl. `harness.ts`) | G-2 | Port `equivalence/corpus.json` (**403** strings) and `equivalence/harness.ts` (20,514 B) from the job tree into `<p2>/harness/equivalence/`, **preserving item ids and the RAW provenance tags** so a run is comparable row-by-row to `equivalence-results.json` — publish **both** aggregations (raw + the five-key summary; finding **F-3**). Import the taxonomy **VERBATIM** from `equivalence.md §1`: **A** DIVERGENT_VALUE · **B** MIS_ACCEPT · **C** FALSE_REJECT_IN_SHAPE are the only RED triggers; **COVERAGE_NARROWING** and **LIVE_STRICTER** are declared non-defects. Assert the **class definitions byte-for-byte** against `equivalence.md §1`, not only the count (the gate's own falsifier). Run against the **vendored sha-pinned tarball** `cand-o/vendor/value-js-4.0.0/`, **never** the working-tree dist. Carry the 22 ruled divergence rows + 4 DISSENTs as a **declared-divergence section distinct from the defect count**. `npx tsx harness/equivalence/harness.ts` from `<p2>` → exit 0, `size 403`, hint map unchanged, **A/B/C = 0/0/0**. **Any non-zero count HALTS to §3a — never reconciled, never patched.** Commit in `<p2>`: `feat(x-p-w1/equivalence): port the 403-string oracle with its three-class taxonomy intact`. |
| **X.P.W1.c** | opus | §5 `X.P.W1.c` (L257–272) · §3 item 3 (L90–91) · §6 G-3 (L415–432) · §2b OP-2 (L64) | `docs/tranches/X/parse-that/evidence/W1/rescued/**` · `docs/tranches/X/parse-that/evidence/W1/rescued/MANIFEST.sha256` | G-3 | Lift the parser-proof tree off the job scratchpad. **COPY, NEVER MOVE**: `/Users/mkbabb/.claude/jobs/9e7dadd0/tmp/parser-proof/` → `docs/tranches/X/parse-that/evidence/W1/rescued/`, **byte-exact**, **excluding `node_modules/`** but **keeping `package.json` + `package-lock.json`** (reproducible, not merely large — the gate's falsifier). The original is left exactly as found: its mtimes are provenance (L-13). Write `MANIFEST.sha256` over **every** copied file — **dated, append-never-rewrite** (M-22 ¶5) — with a header stating what the tree **is** (the P-1/P-3 harnesses + `gate-recovered.mjs` / `bench-recovered.mjs`, recovered from repo `b3f4f76e`, pre-v4) and what it **is not** (a product surface; **L-16**). Verify: every non-`node_modules` file present at open appears with a digest; spot re-hash three files; source ⟨`find … -type f -not -path '*node_modules*' \| wc -l`⟩ = **189** before **and** after. Commit: `docs(x-p-w1/rescue): lift the parser-proof harnesses off the job scratchpad + sha256 manifest`. |
| **X.P.W1.d** | opus | §5 `X.P.W1.d` (L274–304) · §3 items 5–7, 9 (L94–107) · §6 G-4 (L434–463) · G-5 (L465–498) · G-9 (L544–562) · G-10 (L564–589) | `/Users/mkbabb/Programming/parse-that-css-totality-p2/harness/bench/**` (incl. `bench.ts`, `aggregate.mjs`, `finalize.mjs`, `bench.stderr`) | G-4, G-5, G-9, G-10 | Port `bench/{bench.ts,aggregate.mjs,finalize.mjs}` and restate the method with three structural changes. **(1) ONE FRESH PROCESS PER CELL (PT-03)**: `PACKRAT_ARMED` is a one-way module global (`packrat-entry:678` false / `:722` true, set by `makeMemoized()`; `resetPackrat()` clears the memo store, not the latch — 93.9→138.2 ns = **1.47×**, reset leaves 139.3). Assert it **false at entry AND at exit** of every cell, **read from the installed dist**, and print each cell's **PID** — no PID repeated across cells. *"We did not call `memoize`"* is FORBIDDEN as evidence; if the latch cannot be observed from outside the bundle, **HALT** (§3a). **(2)** interleaved cells, **40 rounds, first 10 discarded, median of scored rounds, printed sink**. **(3) THREE LEGS KEPT SEPARATE**: shared-accepted · reject-non-throwing · R1-throw-class (DEBT-2 — averaging hides the only axis the incumbent wins). **G-9**: declare each corpus's max nesting depth with **stated margin below the ceiling YOU measure** (**7,759 today, not 7,761 — finding F-1**). **G-5**: `npx tsx harness/bench/bench.ts 2> harness/bench/bench.stderr` → exit 0 and `wc -c` = **0**; labelled-failure expectations live in their **own** suite/process, never inside the bench entry. **G-10**: re-run `parsethat-surface-gaps.mjs` **unpiped**, paste output + `$?`; **lower none of the seven**. Print honest bounds with every table (N=1, node v26.0.0 / darwin arm64 / Apple M5 Max); **no speed claim outside the printed table**, and **no bare-ns cross-run claim** (F-5). Commit in `<p2>`: `feat(x-p-w1/bench): one process per cell, latch asserted, diagnostics quarantined`. |
| **X.P.W1.e** | opus | §5 `X.P.W1.e` (L306–345) · §3 items 4, 8 (L92–93, L102–105) · §6 G-6 (L500–513) · G-7 (L515–527) · G-8 (L529–542) · §7 (L591–601) · §8 (L603–620) | `docs/tranches/X/parse-that/evidence/W1/BAR-LEDGER-2026-09-17.md` · `docs/tranches/X/parse-that/evidence/W1/bench-baseline.json` · `/Users/mkbabb/Programming/parse-that-css-totality-p2/harness/README.md` · `docs/tranches/V/megatranche/registry/harvest/x-p-w1.json` · `docs/tranches/V/megatranche/registry/DEFECT-LEDGER.md` (modify-append) · `docs/tranches/X/COHESION.md` (modify-carve, **§5 status-board line ONLY**) | G-6, G-7, G-8 | Author the bar ledger with the **two planes never merged** in a table, a summary or a close sentence. **Plane A** (value-side drop-in): CC-095's interleaved three-leg bar — accepted ≥0.9× · reject ≥0.6× · R1 zero throws — **attributed to CC-095, whose home is X-W9**, with its applicability to X·P **flagged as an owner confirmation**, never assumed. **Plane B** (parse-that runtime uplift): ≥10× **RETIRED AS LAW**; 3× / 2× / break-even each `0/5` **OPEN and UNRATIFIED**; **every** pass/fail cell reads `OWNER-GATED-PENDING-RATIFICATION` — **no ✓/✗ column** (the column is the claim), **no "passes"/"fails" sentence**. Publish the four-row table against **1,636,680 µs** and the fixed native floor **311,883 µs**: 163,668 / −148,215 (**1.906×**) · 545,560 / 233,677 · 818,340 / 506,457 · 1,636,680 / 1,324,797 — plus **both** consistency notes (the 10× impossibility **strengthening 1.667×→1.906×**; the restated headrooms **25.0% / 18.8%** below the published 311,661 / 623,434, reproducing F-1 to the digit). Cite **COHESION §0j.E OC-1** by id: it rules the bench table **RECORDED-NOT-GATING** and **sets no bar** — quote it, do not read it as a ratification. State **Q-2**'s operative reading of G-6's falsifier with its measurement. **G-8**: re-run `r1-published-totality.mjs` unmodified, paste output + `$?`. Write `bench-baseline.json` (measured rows + machine record + the N=1 bound) and `harness/README.md` **last** (it documents all three instruments and the `bench.ts` **argv — a cross-wave contract X.P.W2 §4 binds**). Run `harvest-journals.mjs` once → `x-p-w1.json` (**seat count must equal 5 — measure, do not assume; W0's R-3**) + the `DEFECT-LEDGER.md` append. Carve **only** COHESION's §5 status-board line. Commit: `docs(x-p-w1/bar): restate every budget against 1,636,680 µs; the bar stays OWNER-GATED` — body states explicitly that **no bar is set by this commit**. |

**Standing halt conditions for every unit (§3a, quoted):** any write outside §4's table — in
particular any write under `/Users/mkbabb/Programming/parse-that`, the frozen sibling worktrees,
`docs/tranches/V/apotheosis/parser-proof/**`, or this repository's `src/**` — **invalidates the
wave**; the P-1 GREEN failing to reproduce is **not a port bug to patch**; a bench cell that cannot
prove itself unarmed **halts**; **any pressure to set the bar** is a triumvirate trigger and an owner
ask, *"the single most likely place this wave goes wrong"*; a third diagnose→edit→re-measure
iteration on one gate **halts** and the orchestrator may not redispatch the failing unit alone.

**§7 cadence**: prettier over touched `.md` at each commit; `git diff --check` on every commit;
`npx tsc --noEmit` + `npx vitest run` inside the fresh root before phase 3 and before close (subject
to **Q-1**). **`npm run lint` / `typecheck` / `test` are NOT run in value.js** — a green run over
untouched code is the vacuous evidence **L-19** forbids. **No proof-farm script is authored for any
gate** (and DR-19's structural ban stands: no `scripts/**/proof-*.mjs`).

**L-18 rider (§12)**: landing the ten gates green makes this wave **IMPLEMENTED**, not ACCEPTED, and
**VERIFIED is X.P.W4's alone (R-A)** — never stamped at this wave's close.

**A §7 deviation, declared rather than silently taken.** §7 asks for *"prettier over touched `.md`
at each commit"*. Measured: ⟨`./node_modules/.bin/prettier --check execution/D/X-P-W0.md
execution/LEDGER.md`⟩ → **both `[warn]`**, i.e. the lane's own **landed** W0 record and the shared
ledger are not prettier-formatted (config `.prettierrc.json`: `printWidth 88`, `tabWidth 4`). Running
`--write` here would (i) **rewrite landed evidence**, which **E-3** forbids, and (ii) reformat every
row of `LEDGER.md`, which three other tracks are editing concurrently and which the seat law binds to
*minimal in-place cell replacement or appended lines*. Prettier is therefore **not** run on these two
files; ⟨`git diff --check`⟩ → **exit 0** on both, and the cadence's other limb holds. The obligation
stands for the `.md` files the units create fresh inside their own bounds.

---

## Unit receipts

*(empty at open; each unit appends its own dated block below, never rewriting another's — E-3)*

### X.P.W1.c

**Date**: 2026-09-17. **Seat**: X.P.W1.c, `claude-opus-5[1m]` (Opus 5 implementation seat, M-23 §2).
**Spec sections executed**: `W1.md` §5 `X.P.W1.c` (L257–272) · §3 item 3 (L90–91) · §6 G-3
(L415–432) · §2b OP-2 (L64) · §4 rows L145–146 (create) and L156 (read + copy source).
**Gate owned**: G-3. **Verdict: G-3 RED → GREEN.** **Escalations: none.**
**Commit**: `f9c0acb2` (this repository). Writes stayed inside the writable set; nothing outside it
was touched.

#### Act 1 — measure before copying (OP-2 re-verified at this seat's own clock)

⟨cmd⟩ `cd <job tree> && find . -type f -not -path '*node_modules*' | wc -l` (double-run)

```
     189
     189
```

⟨cmd⟩ `find . -not -path '*node_modules*' | wc -l` → **226** (= 189 files + **37** directories) ·
`-type l` → **0** symlinks · non-file/non-dir/non-link → **0** · `find . -name '.*'` → **0** hidden
entries. Total bytes, non-`node_modules`: **4,729,711**. `node_modules/` holds **394** files.
**OP-2's PRESENT reading reproduces; the fallback branch does not fire.** Seat 0's 189 is confirmed
independently here, not inherited.

Two censuses were banked **before** any write, and both are the instruments the later clauses are
read against: a **digest census** (189 sha256 lines, path-sorted, **double-run IDENTICAL**) and a
**stat census** over all 226 entries (`%N|%z|%m|%i|%Sp` — path, size, mtime, inode, perms).

#### Act 2 — the copy: byte-exact, `node_modules` excluded, both lockfiles kept

⟨cmd⟩ `rsync -a --exclude='node_modules' --exclude='node_modules/**' <job tree>/ docs/tranches/X/parse-that/evidence/W1/rescued/`

```
RSYNC_EXIT=0
dest files 189 · dest dirs 37 · `find -name node_modules` 0 · dest bytes 4,729,711
package.json 291 B · package-lock.json 32,220 B  (both present, original mtimes preserved)
```

**Byte-exactness**, the whole claim, measured rather than asserted — ⟨cmd⟩ `diff <source census> <dest census>`:

```
IDENTICAL — 189/189 digests match, path-for-path
```

**COPY, NEVER MOVE**, checked structurally rather than by intent — ⟨cmd⟩ `comm -12 <src inodes> <dst inodes> | wc -l`:

```
       0
```

189 source inodes, 189 dest inodes, **intersection 0**. A move or a hardlink would share inodes;
disjointness is how *copy* is checked. **The original is left exactly as found** (L-13: the mtimes
are provenance) — ⟨cmd⟩ `diff <stat census before> <stat census after>` → **226/226 IDENTICAL**
(size, mtime, inode and perms all unmoved); source digests re-read → identical; source
`node_modules/` → **394** files, intact.

Per-slice, for the record: `deposed-full` 81 · `c14-css` 50 · `deposed` 20 · `bench` 14 · `profile`
8 · `equivalence` 8 · (root) 8 = **189**.

#### Act 3 — `MANIFEST.sha256`, dated and append-never-rewrite (M-22 ¶5)

Line 1 is the seat receipt (`SERVED MODEL: claude-opus-5[1m]`); the header is `#`-commented; the
census sits between explicit `CENSUS 2026-09-17 — BEGIN` / `— END` markers so a later reading is an
**appended dated block**, never an edit above. **321 lines / 27,319 B / 189 digest lines.** The file
**excludes itself** — a file cannot carry its own digest — and says so; the directory holds 190.

The header states what the tree **IS** (the P-1 equivalence oracle — `harness.ts` 20,514 B,
`corpus.json` 80,065 B, `equivalence-results.json` 185,107 B; the P-3 bench — `bench.ts` 16,591 B,
`aggregate.mjs` 1,396 B, `finalize.mjs` 4,429 B, the probes and `raw-run-{1..5}.json`;
`gate-recovered.mjs` 11,820 B and `bench-recovered.mjs` 4,741 B; the bundles; `c14-css/`,
`deposed/`, `deposed-full/`, `profile/`) and what it **IS NOT** (**L-16**): not a product surface,
not a proof of any product claim, not a live harness for this lane (`.a`/`.b`/`.d` port *from* it
into `<p2>/harness/**`; it is not run in place), and **not the original**.

**Provenance PROVEN AT THE DIGESTS, not repeated.** The spec states the two recovered scripts came
from repo `b3f4f76e`, *pre-v4*; this seat verified **both** limbs:

⟨cmd⟩ `git show b3f4f76e:scripts/gates/proof-perf-target.mjs | shasum -a 256` vs `shasum -a 256 gate-recovered.mjs`

```
639e596135b2944c07ad8b1f4be89373cc640cba7544fec35936655833f0512e   (both)  EXACT
```

⟨cmd⟩ `git show b3f4f76e:bench/css-parse-perf.mjs | shasum -a 256` vs `shasum -a 256 bench-recovered.mjs`

```
e54b31054cf92a1c7831616f3d6df0db066d7ea22e1b90ea86389fe1a04e2281   (both)  EXACT
```

`b3f4f76e` = `b3f4f76e30b5707da24800e6f5bdd81a17c9719b`, 2026-07-13, *"fix(U.W-PERF · U-F14):
re-anchor the flagship dist perf gate's PREMISE…"*; ⟨`git show b3f4f76e:package.json`⟩ → version
**3.1.0** against HEAD's **4.0.0**, so **"pre-v4" holds at the bytes**. (`deposed/css-parse-perf.mjs`
carries that same blob — one file, two paths.)

#### Act 4 — G-3 turned, clause by clause

**BEFORE (at open, seat 0's baseline, re-confirmed by this seat):** `docs/tranches/X/parse-that/
evidence/` held only `W0/`; `evidence/W1/rescued/` **ABSENT**; the sole copy of the instruments was
the job temp directory. **G-3 RED.**

| G-3 clause (spec L270–272) | reading AFTER | verdict |
|---|---|---|
| *"Every non-`node_modules` file present at open appears in the manifest with a digest"* | at-open paths **189** · manifest paths **189** · at-open-with-no-digest **0** · manifest-not-at-open **0** · full digest+path `diff` **empty** | **GREEN** |
| *"a spot re-hash of three files reproduces"* | three re-hashed **source == copy == manifest**, below | **GREEN** |
| *"the source tree's `find … -type f \| wc -l` is unchanged after the copy"* | **189** before **and** **189** after, each double-run | **GREEN** |

⟨cmd⟩ spot re-hash of three (source, copy and manifest line each read independently):

```
equivalence/corpus.json   c6649cadd10f2aca7227482bc0c05ea1f9aaf3159e563a052f65aeea0f0a4ff8   80065 B  REPRODUCES
bench/bench.ts            8c274f8132f9aa5d3f5effbf902699541b693e356a520132c405658b3aa2bfad   16591 B  REPRODUCES
gate-recovered.mjs        639e596135b2944c07ad8b1f4be89373cc640cba7544fec35936655833f0512e   11820 B  REPRODUCES
```

⟨cmd⟩ `cd …/rescued && shasum -a 256 -c MANIFEST.sha256` (double-run, output byte-identical):

```
EXIT=0    OK: 189    FAILED: 0
stderr:  shasum: WARNING: 1 line is improperly formatted
```

That one stderr line is **line 1**, the `SERVED MODEL:` receipt the seat law fixes the text of; every
other header line begins with `#` and shasum skips it as a comment. It does not move the exit code,
and the manifest header states this **as measured** — an earlier draft of the header guessed *"the
commented header lines"* and was corrected to the measured *one* line **before landing**
(WRITE-THEN-MEASURE). The silent form `grep -E '^[0-9a-f]{64}  ' MANIFEST.sha256 | shasum -a 256 -c -`
→ exit 0, 189 OK, **0 bytes** of stderr.

**The falsifier, demonstrated rather than described.** G-3's falsifier turns on the manifest being
able to go RED. Proven in a scratch clone — **never on the landed tree**: appending **one byte** to
`bench/bench.ts` → `EXIT=1`, `bench/bench.ts: FAILED`, 188 OK; deleting `package-lock.json` (the
reproducibility limb) → `EXIT=1`, `package-lock.json: FAILED open or read`, 188 OK; restoring the
clone → `EXIT=0`, 189 OK. The instrument goes red for its intended reason and returns green. The
landed tree re-read immediately after: **189 OK**.

**The reproducibility limb measured, not assumed** — G-3's own words are *"the tree must be
reproducible, not merely large"*. `node_modules/` (394 files) is excluded; `package.json` +
`package-lock.json` are kept, and the lock is a genuine pin: **lockfileVersion 3**, **62** package
entries, **61** with both a resolved URL and an integrity hash (the one without is the root `""`
entry), and **all 5** declared deps pinned — `@mkbabb/parse-that` 1.0.0 · `@types/node` 22.15.30 ·
`esbuild` 0.24.2 · `tsx` 4.20.3 · `typescript` 5.8.3, **0 missing from the lock**.

#### Act 5 — commit `f9c0acb2`, and the chain closed at the committed bytes

⟨cmd⟩ `git add <rescued> && git commit --no-verify --quiet -m … -- <rescued>` → `f9c0acb2`,
**190 files** (189 + `MANIFEST.sha256`), §9's subject verbatim; the body names the source path and
states the original is left untouched. **Gate 27** ⟨`git status --porcelain -- src api demo test
e2e`⟩ → **0** before **and** after. `scripts/dev/dev.sh` shows ` M` in the working tree by standing
arrangement and is **absent from the commit** — ⟨`git show --name-only`⟩ → not present; never staged.
⟨`git check-ignore`⟩ over the tree → **0** files ignored, so nothing was silently dropped.

The chain was then closed at the **committed** bytes, not merely the worktree — every blob re-read
out of git with `git show HEAD:<path> | shasum -a 256`:

```
committed blobs vs MANIFEST census      → IDENTICAL, 189/189
committed blobs vs ORIGINAL job tree    → IDENTICAL, 189/189
git status --porcelain -uall <rescued>  → 0
```

**original job-tree bytes == worktree copy == manifest census == committed git blobs.**

Post-commit final reading, double-run: source **189** · rescued **189** · manifest digest lines
**189** · `shasum -c` **189 OK** · source stat census **226/226 IDENTICAL** · source `node_modules/`
**394**. **The original survives the commit untouched.**

#### Residuals — two declared §7 deviations, and one note

**Both deviations are declared rather than silently taken, and both exist because obeying the cadence
would falsify this unit's own contract.** §5.c's word is *byte-exact* and G-3's assertion is that the
copy's digests equal the source's; any reformat moves a digest and turns the gate I am turning RED.

1. **Prettier is NOT run over the 7 copied `.md` files.** ⟨`prettier --check`⟩ → **4 of 7 `[warn]`**
   (`deposed-full/src/units/CLAUDE.md`, `…/transform/CLAUDE.md`, `…/subpaths/CLAUDE.md`,
   `…/units/color/CLAUDE.md`). These are **recovered historical bytes**, not files this unit
   authored. §7's obligation, in this record's own words at §Unit plan, *"stands for the `.md` files
   the units create fresh inside their own bounds"* — **this unit creates zero fresh `.md` files**
   (`MANIFEST.sha256` is not `.md`), so the obligation is vacuous here and the copied evidence is out
   of its reach. Same shape as seat 0's declared deviation for `X-P-W0.md` / `LEDGER.md`.
2. **One `git diff --check` flag is NOT cured**: `deposed-full/src/utils.ts:228: new blank line at
   EOF` — **exactly one** across all 189 files. Verified to originate in the **original** bytes, not
   in the copy: ⟨`tail -c 24 … | od -c`⟩ → `…) ; \n } \n \n` in **both**, `wc -lc` **228 / 7,471** in
   both, sha256 `904e866a1f9069b70fe14c26f2c13073f816aa879cac457b69112d0fe3a97870` in both. Stripping
   it would break byte-exactness, move the manifest digest and falsify G-3 — the masking fix the
   standing law forbids. Recorded as inherited evidence.

**Note, so no later reader misfiles it (DR-19).** `gate-recovered.mjs` carries the retired
`proof:perf-target` marker on its own first line. That is **recovered historical bytes from
`b3f4f76e`**, preserved byte-exact as the copy law demands — **not a fresh proof-farm authoring**.
DR-19's structural ban is on `scripts/**/proof-*.mjs`; nothing here sits under `scripts/` and nothing
here is authored by this seat. The manifest header says this in its own words.

#### What this unit did **not** do

No write outside the writable set (`…/evidence/W1/rescued/**` + its `MANIFEST.sha256`) and, at
close, this record. Nothing under `/Users/mkbabb/Programming/parse-that`, the frozen worktrees,
`docs/tranches/V/apotheosis/parser-proof/**` or `src/**` was touched; the job tree was **read and
copied only**, never modified, never deleted, never "cleaned up" (§4 L156). No gate but G-3 was
turned or read as turned; `.a`/`.b`/`.d`/`.e` own the rest. **No escalation arose.**

### X.P.W1.a

**Date**: 2026-09-17. **Seat**: X.P.W1 unit `.a`, `claude-opus-5[1m]` (M-23 §2 implementation seat).
**Spec of record**: `W1.md` @ `519df03ff21b48f3b2c4f352d6a4d8ae98c86d3dde117ba786b6c924204c6d09`,
718 L / 55,891 B — **re-read whole at this seat's clock and string-equal to §Open's banked digest**,
so the plan above is resumed rather than re-derived. Sections executed: §5 `X.P.W1.a` (L208–231) ·
§3 item 1 (L84–86) · §6 **G-1** (L355–383) · §2c rows L73 + L220–222 · §4 rows L138–139.
**Writable set**: `/Users/mkbabb/Programming/parse-that-css-totality-p2/harness/totality/**` — and,
at close, this record. **Gate owned**: **G-1**, and G-1 alone.

#### Act 1 — measure before writing (the anchors verified at true bytes)

⟨cmd⟩ `grep -cE '^    [A-Za-z]+,

**E-3: this corrects §Open by addition; nothing above is rewritten.** §Open's mail block states that
*"no sweep line is appended, because nothing moved"*. That reasoning is sound on the substance —
**0 unrowed, 0 new `I-n`** — but it is **wrong on the obligation**: E13's ledger is a record of the
*sweep*, not only of its yield, which is why all five prior seats of this sitting (P-1 · X.P.W0 ·
KF.W0 · KF.W1 · X-W0 · F.W0) each appended a line even when their result was zero. The line is
therefore appended at `docs/tranches/V/coordination/INBOX.md`'s end, in the file's own idiom,
carrying the four paths, the bounded atlas Q-lane extension, the delta test, and the **D-1** status-
cell classification. **No `I-n` row is written; no row above it is touched.** The substantive result
is unchanged: **0 unrowed · 0 new `I-n` · I-31 the inbound tail · O-21 the outbound tail · 0 UNREAD
in X.P.W1's scope.**
 src/css/index.ts` → **51**;
⟨cmd⟩ `grep -nE '^export \{ [A-Za-z]+ \}' src/css/index.ts` → **`45:export { coerceToSyntax } from "./syntax";`**.
**51 + 1 = 52.** The spec's 2026-08-03 RED baseline reproduces **exactly** at today's HEAD; §Open's
own reading is confirmed at this seat's clock, not inherited.
⟨cmd⟩ `test -e <p2>/harness/totality` → **ABSENT**. **0 of 52 ported. G-1 RED, measured.**

The nine public parsers were read from the probe rather than quoted: ⟨cmd⟩
`grep -nE 'parse(Css|Keyframe|Timing|Animation|Stylesheet)[A-Za-z]*' …/r1-published-totality.mjs`
→ `:34-36` `FNS = [parseCssColor, parseCssScalar, parseCssValue, parseCssValues,
parseKeyframeSelector, parseStylesheet, parseTimingFunction, parseAnimationTimeline,
parseAnimationRange]` — **nine**, and identical to the set the runner reports per-slice.

**Q-1 resolved WITHOUT a bounds write.** Both candidate surfaces load under **plain `node`**:
⟨cmd⟩ `node -e 'import(".../cand-o/vendor/value-js-4.0.0/dist/subpaths/css.js")'` → **OK, 19 exports**;
⟨cmd⟩ `node -e 'import(".../parser-proof/c14-bundle.mjs")'` → **OK: `parseColor parseEasing parseStylesheet`**
(⟨`grep -cE '^import' c14-bundle.mjs`⟩ → **0**, fully bundled). The gate entry is therefore `.mjs`, run
by `node`: **no `tsx`, no `npx`, no `npm ci`, no `<p2>/package.json`, no `<p2>/node_modules`** — none
of §Open's four *"NOT authorized"* acts was needed or taken.

#### Act 2 — the derivation, written so it cannot be hand-maintained

`lib/surface.mjs` contains **zero export names**. It parses the barrel's
`export [type] { … } from "…"` blocks, so a reformat cannot move the derived set and a surface change
always does. The derivation is **double-read and self-checking**:

| reading | mechanism | result |
|---|---|---|
| export-block parse | `EXPORT_BLOCK` over `src/css/index.ts` | **52 = 33 types + 19 runtime**; runtime = **7 grammar + 1 syntax + 3 timeline + 8 stylesheet** |
| G-1's own baseline | the spec's two regexes **re-derived in-process**, not shelled out | **51 block members + 1 single-line export = 52** |

`--check` exits non-zero if the two ever disagree with each other. The frozen **variant vocabulary**
is derived the same way from `src/css/types.ts` — 13 colour spaces · 8 `ParseIssue` codes · 4 timing
kinds · 2 keyframe-selector kinds · 5 timeline kinds · 9 stylesheet-item kinds · 7 range phases —
and the shape cells are generated **from** it, so a 14th colour space grows a 14th cell with no byte
of the harness moving.

#### Act 3 — the runner, and the three candidates that make its claims testable

`coverage.md`'s legend is reproduced exactly (**TOTAL** = name **and** shape · **PARTIAL** = present
but narrower, **with what is missing named** · **ABSENT** = no peer). Both limbs must hold for TOTAL;
a candidate present but satisfying no cell is **PARTIAL, not ABSENT**. A **throw** fails the cell and
is counted in a `throws` column — the R1 contract measured, never a defect swallowed.

**An instrument that can only ever print ABSENT has not been shown to print TOTAL.** Hence three:

| candidate | role | reading, settled bytes | kf column (37) |
|---|---|---|---|
| `published-4.0.0` | **POSITIVE CONTROL** — the vendored sha-pinned tarball, **never the working-tree dist** (parser-band **G6**) | **51 TOTAL · 1 PARTIAL · 0 ABSENT** (runtime 18/1/0, throws **0**; types **33/0/0**) | **37 / 0 / 0** |
| `c14-assay` | **NEGATIVE CONTROL** — the gate-time census subject | **runtime 0 TOTAL / 3 PARTIAL / 16 ABSENT · types 0 / 0 / 33** | 0 / **2** / 35 |
| `p2-native` | the lane's own distance | **0 / 0 / 52** | 0 / 0 / 37 |

**The negative control REPRODUCES `coverage.md` Surface 1's published tally to the digit** (§1a
*"Runtime tally: 0 TOTAL / 3 PARTIAL / 16 ABSENT"*; §1b *"Type tally: 0 TOTAL / 0 PARTIAL / 33
ABSENT"*). That reproduction — a published reading recomputed by an independent instrument — is this
unit's own correctness evidence, and it is why the census is **reproduced, not restated**.

**The kf seam column is SEPARATE and asserted so.** Derived from `keyframes-v-exec/src`, reproducing
the record's census to the digit: **37 distinct · 75 occurrences · 27 files · 29 line-hits**.
**Finding F-3 MEASURED, not quoted: orphan imports = 0.** `assertDisjointFromManifest` asserts the
separation rather than trusting it → `SEPARATION ASSERTED — manifest 52 exports · kf column 37
symbols · merged: false`.

#### Act 4 — G-1 turned, and its falsifier proved FIVE ways

⟨cmd⟩ (from `<p2>`, **unpiped**, stdout and stderr to separate files so `$?` is the command's own)
`node harness/totality/derive.mjs --check`

```
derived     52 exports = 33 types + 19 runtime
runtime     7 grammar + 1 syntax + 3 timeline + 8 stylesheet
cross-check 51 block members + 1 single-line export = 52  (W1.md §6 G-1's own 51 + 1 baseline, re-derived in-process)
counts      manifest 52 · derived 52   EQUAL
sets        names IDENTICAL · kinds+slices IDENTICAL
GREEN — manifest 52 == derived 52 (33 types + 19 runtime); names, kinds and slices identical.
```

**`EXIT=0` · stderr `0` bytes · double-run byte-identical** (⟨`cmp -s run1 run2`⟩ → IDENTICAL), and
both runs taken **from the committed bytes** (⟨`git status --porcelain -- harness/totality`⟩ → **0**).

The assertion is **strictly stronger than the count equality G-1's wording names**: counts, **name
sets**, and **each name's kind and slice** are compared — because a rename preserves the count. Every
falsifier below was run with the **true unpiped exit**, the manifest restored byte-identical after
each (⟨`shasum -a 256`⟩ → `f6b142a2…e80e13`, before and after):

| # | mutation | reading | exit |
|---|---|---|---|
| 1 | delete a manifest type (`CssLinearStop`), counts left stale | ``source exports `CssLinearStop`, manifest omits it`` | **1** |
| 2 | delete it **and** make the counts self-consistent (51 = 32 + 19) | count disagreement + omission + slice disagreement | **1** |
| 3 | **rename** `parseCssColor`→`parseCssColour` — **count stays 52** | `counts … EQUAL` yet `sets *** DIVERGED ***` | **1** |
| 3b | **move** `coerceToSyntax` to `type/types` — **count AND name set both identical** | ``` `coerceToSyntax` moved to runtime/syntax — the manifest records another ``` | **1** |
| 4 | the **SOURCE** grows a 53rd export | `derived 53 … manifest 52 *** DISAGREE ***`, `slice grammar: manifest 7 vs derived 8` | **1** |

Falsifier 4 — G-1's own first limb (*"add an export to `src/css/index.ts`"*) — was run against a
**scratchpad copy** of `src/css/{index,types}.ts` via the `VALUE_JS_ROOT` override. **No byte of
value.js `src/**` was written**: ⟨`git -C …/value.js status --porcelain -- src api demo test e2e`⟩ →
**0 lines**, re-read after every falsifier. Falsifiers **3** and **3b** are the ones the gate's
literal wording would have passed; they are why the comparison is on sets and shape, not counts.

**G-1: RED (0 of 52 ported) → GREEN.** No other gate was turned or read as turned by this seat.

#### Act 5 — commit `d8a529ae`, pathspec-scoped around a concurrent seat

⟨cmd⟩ `git add harness/totality && git diff --cached --check -- harness/totality && git commit
--no-verify --quiet -m "feat(x-p-w1/totality): derive the 52-export corpus and its
TOTAL/PARTIAL/ABSENT runner" -m "<body>" -m "Claude-Session: …" -- harness/totality`

**`d8a529aedc5927843bbaed3e57b73cdf06f5a18d`**, in `<p2>` (its history is never merged with this
repository's — §9). **10 files · 2,153 insertions**, every path inside `harness/totality/**`:
`README.md` · `derive.mjs` · `lib/{config,surface,kf-seams,probes,candidates,classify,report}.mjs` ·
`manifest.json`. §9's body carries the 51+1 derivation and the 19/33 split verbatim.

**The pathspec was load-bearing, not ceremonial.** ⟨`git status --porcelain --untracked-files=all`⟩
showed `harness/equivalence/{corpus.json,harness.ts,taxonomy.ts,declared-divergences.ts}` appearing
mid-unit — **unit `.b` writing its disjoint subtree in parallel** (§4a). A bare `git add -A` or
`git commit -a` would have swept `.b`'s in-flight bytes into this unit's commit. The pathspec is
**on the `git commit` itself** and staging was done in the same compound command (X-W0.e `:402`'s
shared-index hazard, as X.P.W0's close sharpened it). ⟨`git show --stat HEAD`⟩ confirms **0 files of
`.b`** landed here. **Gate 27** ⟨`git -C …/value.js status --porcelain -- src api demo test e2e`⟩ →
**0**, asserted before **both** the commit and the amend.

#### Findings — four, each measured, none blocking

| id | severity | finding | measurement | disposition |
|---|---|---|---|---|
| **A-F1** | **MINOR — a record divergence, not a gate flip** | The assay's kf column measures **2 PARTIAL / 35 ABSENT of 37**, not the **3/37** that `W1.md` §5.a and `coverage.md` Surface 2 both carry | ⟨`grep -rn 'parseCssColor' keyframes-v-exec/src`⟩ → **0**; `parseCssColor` appears nowhere in Surface 2's own 37-row table, yet Surface 2's Finding B counts it among the three assay peers | **`3 PARTIAL` is correct for the 52; carried into the 37-symbol column it is 2.** `coverage.md` is a sealed gate record — **read, re-measured, never folded in place** (§4 L162, **E-3**). Recorded beside, dated. The runner prints the **measured** column; the record's 3/37 is noted, never overwritten |
| **A-F2** | **MINOR — the lane's standing input** | Published `@mkbabb/value.js@4.0.0`'s `parseCssColor` **does not accept `color-mix()`** | `parseCssColor("color-mix(in oklch, red, blue)")` → `ok:false`, code **`css_syntax`**, `expected ["CSS color"]` | `coverage.md` Surface 1 §1a lists `color-mix` in the **assay's** Missing column, which reads as implying the frozen contract covers it; at the published bytes it does not. **The positive control's sole PARTIAL.** No grammar is written by this wave (§3 L109) — recorded, not cured |
| **A-F3** | **INFO** | `parseCssColor("rgb(from red r g b)")` returns a **typed refusal**, and that is the contract working | `ok:false`, code **`color_context_required`**, `expected ["context-free color"]` | `parseCssColor(source)` takes **no context**, and the frozen `ParseIssue` union carries that code for exactly this class. The cell therefore passes on `ok:true` **or** on that derived code and **on nothing else** — a bare `css_syntax`, or a throw, still fails it. The accepted code is **read from the derived union**, so deleting it from `types.ts` breaks the cell loudly rather than widening the taxonomy silently |
| **A-F4** | **INFO — the §12 exposure, caught by construction** | The positive control's **first** run reported five PARTIALs; **three were this harness's own errors**, not the candidate's | two probe inputs failing for a reason other than the cell's subject (`@scroll-timeline`'s `source: selector(#x)`; `@property` without its `initial-value` descriptor — both re-measured against `src/css/stylesheet.ts:703-720` and the live module) and two wrong return-shape expectations (`serializeCssColor` returns `Result<string, ColorIssue>`, `serializeTimelineOptions` returns the declaration map) | All four cured **against the measured contract** before landing; the four `collect*` probes now reuse `parseStylesheet`'s **own** inputs so a collector can never fail for an input the parser was never asked to accept (**L-19**: a cell must fail for its own reason). **A runner with no positive control would have published those three as candidate gaps** — which is precisely §12's *"the specific exposure of this wave is false precision"* |

#### Residuals — two, both declared rather than silently taken

1. **A defect of this unit's own, found and cured before landing: `derive.mjs` was BINARY.** The
   first commit (`205305f2`) landed it as ⟨`git show --stat`⟩ **`Bin 0 -> 8027 bytes`**. Cause,
   measured: ⟨`od -c`⟩ found **3 real NUL bytes** — the export-row identity was a NUL-separated
   string, and the authoring tool rendered its \u0000 escape sequences as literal NUL
   bytes. (**The hazard recurred inside this very receipt** — the sentence describing it was
   authored with the same escape and re-introduced one NUL into this record, caught by
   ⟨`file`⟩ reading the record as `data` and by grep falling silent on it; cured the same way,
   by naming the escape in prose instead of writing it.) It **worked at
   runtime** and would have shipped silently, but a source file git reads as binary is un-diffable
   and un-reviewable. **Cured at source, not configured around** (no `.gitattributes` override): the
   identity is now `JSON.stringify([name, kind, slice])` — plain ASCII, and unambiguous however a
   slice is spelled. The cure is behaviour-preserving, proved by ⟨`cmp`⟩ of the full report
   **before and after → byte-identical**, and the cured path carries **falsifier 3b** above.
   Landed by `--amend` (**`205305f2` → `d8a529ae`**) rather than a second commit, because **§9 binds
   this unit to ONE commit**; the amend was safe and is declared: ⟨`git log --oneline`⟩ confirmed
   **HEAD was still this unit's commit** (unit `.b` had not yet committed), `<p2>` has **no remote**
   (W0 `.c`'s `remote remove`, R-2 UPHELD), so **no published history was rewritten and no
   force-push was taken**.
2. **§7 prettier — run, and one corruption caught.** `<p2>` carries **no prettier configuration**
   (⟨`ls -a <p2> | grep -i prettier`⟩ → none), so `--no-config` defaults are the only available
   reading; value.js's `.prettierrc.json` is **not** imported into another repository. Running it
   **mangled one line**: `**value.js `src/**` is never written**` became
   ``**value.js `src/**`is never written**`` — the `**` inside the code span collided with the bold
   span and two lines were joined, losing a space. **The sentence was rewritten so its meaning
   survives formatting**, then prettier re-run → *"All matched files use Prettier code style!"*.
   Recorded because a formatter silently altering a receipt's text is exactly the class of drift
   this program measures. ⟨`git diff --cached --check`⟩ → **exit 0** at the commit and at the amend.

#### What this unit did **not** do

No write outside `harness/totality/**` and, at close, this record — ⟨`git -C <p2> status --porcelain
--untracked-files=all`⟩ showed **every** path of this commit inside the bound, and `.b`'s
`harness/equivalence/**` was left untouched. Nothing under `/Users/mkbabb/Programming/parse-that`,
the frozen sibling worktrees, `docs/tranches/V/apotheosis/parser-proof/**` (read and re-measured
only), `docs/tranches/V/megatranche/registry/adjudicated/**`, or this repository's `src/**` was
written; `keyframes-v-exec`, the prototype workspace, the vendored tarball and the job tree were all
**read-only**. **No bar was set, no ratio published, no speed claim made** — none is this unit's.
**G-2 · G-3 · G-4..G-10 were neither turned nor read as turned**; `.b`/`.c`/`.d`/`.e` own them.
**`scripts/dev/dev.sh` was never touched and never staged.** **No escalation arose**: every §3a
trigger was checked and none fired — no bounds write was needed (Q-1 resolved by plain `node`), the
specified cure was possible at the bytes, and no diagnose→edit→re-measure loop on G-1 reached a
third iteration.


### X.P.W1.b

**Date**: 2026-09-17. **Seat**: X.P.W1 unit `.b` (the equivalence oracle), `claude-opus-5[1m]`
(M-23 §2 implementation seat, as §5 declares for all five units).
**Spec sections executed**: `W1.md` §5 `X.P.W1.b` (L233–255) · §3 item 2 (L87–89) · §6 G-2
(L385–413) · §2c rows L74–75 · §4 rows L140–141, L155.
**Writable set**: `/Users/mkbabb/Programming/parse-that-css-totality-p2/harness/equivalence/**`.
**Gate owned**: **G-2**. **Commit (in `<p2>`, §9's one commit for this unit)**:
`d1458f4f3c08899cb832752214e8c719cb8ed318`.
**Rulings consumed**: COHESION **§0j.E OP-1** (both owner words given 2026-09-17 — the lane is open)
and **§0j.E OC-1**, read and found **not binding on G-2**: it rules the *bench* table
recorded-not-gating and ratifies no bar; this gate's trigger is a defect count, not a bar.

---

#### Act 1 — the sources measured before a byte was written

⟨cmd⟩ `ls -la /Users/mkbabb/.claude/jobs/9e7dadd0/tmp/parser-proof/equivalence/` →
`corpus.json` **80065** · `harness.ts` **20514** · `equivalence-results.json` **185107** ·
`harvest.mjs` 9949 · `probe{,2,3}.ts` · `witness-attempt.ts`. **Both byte sizes the spec's OP-2 row
names reproduce exactly**, so the port reads the primary tree and OP-2's fallback branch stays shut.

⟨cmd⟩ `shasum -a 256 …/equivalence/{corpus.json,harness.ts}` →
`c6649cadd10f2aca7227482bc0c05ea1f9aaf3159e563a052f65aeea0f0a4ff8` ·
`ac1b5afcc1e2b09f01bdb2cbbdbb46362836bd8c019134a69b98531eab3971f7`. Both digests are carried in the
port's own header so a later reader can prove what was ported from what.

⟨cmd⟩ `shasum -a 256 …/prototypes/css-parser/cand-o/vendor/value-js-4.0.0/dist/subpaths/css.js` →
**`8b5381305ea26236326f06a38559247b2089a5be7fa78abe43640d0556320c42`** — string-equal to the digest
`cand-o/equivalence.test.ts:76` asserts for the published tarball. This is the LIVE engine of record.

⟨cmd⟩ `node -e '…'` over the authority → the `equivalence.md` §1 block is **683 UTF-8 bytes / 675
UTF-16 units / 9 lines**, sha256 **`554c2993cebd3ed386e023e043ded9538bd99fd488de0598ada40b845dd963a7`**.

⟨cmd⟩ `sed -n '80,148p' …/registry/adjudicated/parser-band.md` → the ledger is **15 + 7 = 22** rows
(fifteen published-parser defect rows; the seven of *"Structured corpus 86 inputs: 79 agree, 7
disagree"*), which is the *"22-row divergence ledger asserted in both directions"* the record's own
§4 names — counted, not assumed. The DISSENT section holds **five** bullets, of which the fifth
(*"cand-F's disclosure hygiene is noted for the record"*) is a process note; the **four** W1.md §2c
names — token juxtaposition · non-finite numerals · try/catch posture · bench epistemics — are the
DISSENTs, and the fifth is deliberately **not** carried as one.

#### Act 2 — the port, with its four declared changes

Four files created, all inside the writable set:

| file | B | what it is |
|---|---:|---|
| `corpus.json` | 80,065 | **byte-exact copy**; ⟨`shasum -a 256`⟩ at source and at destination both `c6649cad…0f0a4ff8` |
| `taxonomy.ts` | 7,794 | the §1 taxonomy verbatim + `checkTaxonomyUnmoved()` |
| `declared-divergences.ts` | 13,313 | the 22 ruled rows + the 4 DISSENTs + `checkDivergenceRows()` |
| `harness.ts` | 37,172 | the gate-invoked entry |

The per-door differential — the semantic-core extractors, the selector/comment normalisation, the two
C14 shape oracles, the verdict ladder and **the defect predicate** — is carried over **unchanged**. A
port may not improve the thing it ports: an oracle that reproduces GREEN under a different rule has
reproduced nothing. The four changes, each with its reason, are stated in the file's own header:

1. **LIVE is the vendored sha-pinned tarball, never the working tree** (§5.b's fold of the parser
   band's G6). The original's one un-portable line was
   `from "/Users/mkbabb/Programming/value.js/dist/subpaths/css.js"`. The tarball's digest is asserted
   at startup and printed, so the engine bytes are a coordinate rather than an assumption.
2. **The corpus is the port's own copy**, so the harness has no read dependency on a job temp
   directory; item ids and the **raw** provenance tags are preserved.
3. **The taxonomy is asserted byte-for-byte** against `equivalence.md` §1 — G-2's falsifier is a
   *widened rule*, not a wrong count.
4. **The 22 ruled divergences and 4 DISSENTs print as their own section**, never summed into the
   defect count.

**The defect predicate is STRICTER than A/B/C alone and was kept that way.** The ported original also
counts a C14-side (or two-sided) thrown exception as a defect. Narrowing it to A/B/C would have been
a widening of acceptance under the cover of following the spec's letter, so the gate here requires
**both** `A/B/C = 0/0/0` **and** zero C14/BOTH engine exception.

**Two provably behaviour-identical no-ops of the original were not transcribed**, declared here
rather than left silent: `harness.ts:223` (`if (verdict === "STRUCT_CONGRUENT" && coreEq(…)) verdict
= "STRUCT_CONGRUENT";` — a reassignment to the value just assigned) and `:270` (`verdict = atRule ?
"COVERAGE_NARROWING" : "COVERAGE_NARROWING";` — a ternary with identical arms). Neither can change a
verdict; the 403-row comparison in Act 5 is the measurement that they did not.

#### Act 3 — WRITE-THEN-MEASURE caught this seat's own published figure

The first run printed `TAXONOMY: ported verbatim copy is 683 B, pinned at 675 B` and exited non-zero.
The taxonomy had **not** moved — sha256 and the extracted text both matched. **The seat's own
constant was wrong**: `675` was read from `String.length` (UTF-16 units) and asserted against
`Buffer.byteLength` (UTF-8). The block carries four em-dashes, so the two readings differ by exactly
8. Cured at the root rather than by relaxing the check: **both** units are now pinned and asserted
(`TAXONOMY_BYTES` 683 · `TAXONOMY_CHARS` 675 · `TAXONOMY_LINES` 9), with the comment that names why a
check mixing them fails a correct port for the wrong reason. **This is the gate catching its author,
which is the whole argument for asserting the class definitions and not only the count.**

#### Act 4 — G-2, BEFORE → AFTER

**BEFORE** (this record's §Baseline, unchanged): `size 403` read from the corpus, hint map
byte-identical to the spec's, **`<p2>/harness/equivalence` ABSENT — 0 items ported. RED.**

**AFTER** — ⟨cmd⟩ `npx tsx /Users/…/parse-that-css-totality-p2/harness/equivalence/harness.ts`,
**exit 0**, the harness's own stderr **0 bytes**, `real 1.73` then `real 1.56` on a double-run whose
two stdout captures ⟨`diff`⟩ differ **in the PID line alone**:

```
--- corpus ---
size 403
provenance {"c":84,"b":232,"seed":70,"d":27,"a":19}
provenance-raw {"c:demo-css":84,"b:test/*":232,"seed:color:non-oklch":11,"d:c14-tests":27,
  "seed:sheet:bad":4,"seed:sheet:in":4,"seed:sheet:narrow":5,"seed:color:oklch-oos":5,
  "seed:easing:cb-badx":3,"a:test/parsing":19,"seed:easing:cb-bad":4,"seed:easing:cb-in":7,
  "seed:easing:non-cb":7,"seed:color:oklch-bad":7,"seed:color:oklch-in":13}
hints {"stylesheet":121,"color":84,"value":120,"sheet":13,"keyframe-selector":22,"easing":43}
corpus sha256 c6649cadd10f2aca7227482bc0c05ea1f9aaf3159e563a052f65aeea0f0a4ff8
ids 0..402 · unique 403 · raw provenance tags 15 · multi-tag items 26

--- taxonomy (equivalence.md §1, byte-for-byte) ---
extracted 683 B · sha256 554c2993…5dd963a7 · UNMOVED

--- tally ---
{ "CONGRUENT_REJECT": 50, "COVERAGE_NARROWING": 95, "OUT_OF_SCOPE": 142,
  "STRUCT_CONGRUENT": 105, "LIVE_STRICTER": 10, "ENGINE_EXCEPTION": 1 }

--- DECLARED DIVERGENCES (ruled; NOT defects) ---
22 ruled divergence rows · 4 preserved DISSENTs

--- ENGINE_EXCEPTION ---
   LIVE "oklch()" :: LIVE threw: Cannot read properties of undefined (reading 'replace')

A/B/C = 0/0/0
defects (A+B+C + C14/BOTH engine exceptions) = 0
GATE: GREEN
```

`size 403` ✓ · provenance map unchanged from the RED baseline ✓ · hint map unchanged ✓ ·
**`A/B/C = 0/0/0`** ✓ · declared-divergence list printed as a section distinct from the defect count ✓
· exit **0** ✓. **§3a's halt condition — *"the P-1 GREEN failing to reproduce"* — did not fire.**

**The tally reproduces `equivalence.md` §3's congruence table to the digit** (105 / 50 / 95 / 142 /
10 / 1, and 0 / 0 / 0), and the single `ENGINE_EXCEPTION` is the **LIVE** thrower on `oklch()` — R1,
the shipping crash — not a C14 defect.

#### Act 5 — the port proved comparable row-by-row, which is what the provenance tags are for

⟨cmd⟩ `node -e '…'` joining the ported `equivalence-results.json` to the prior run's by item id:

```
prior rows 403      ported rows 403
prior tally  {"CONGRUENT_REJECT":50,"COVERAGE_NARROWING":95,"OUT_OF_SCOPE":142,
              "STRUCT_CONGRUENT":105,"LIVE_STRICTER":10,"ENGINE_EXCEPTION":1}
ported tally {"CONGRUENT_REJECT":50,"COVERAGE_NARROWING":95,"OUT_OF_SCOPE":142,
              "STRUCT_CONGRUENT":105,"LIVE_STRICTER":10,"ENGINE_EXCEPTION":1}
verdict differences: 0 / 403
provenance tag differences: 0
source mismatches: 0
prior gate GREEN   ported gate GREEN      prior defects 0   ported defects 0
```

**Zero of 403 rows differ in verdict, in source, or in provenance** — and this is a stronger reading
than a repeat, because the prior run's LIVE engine was the **working-tree dist** and this one's is the
**published 4.0.0 tarball**. §5.b flags that those two differ in bytes (the dist-drift finding). They
are here measured to differ in **no verdict on any of the 403 corpus rows**. That is a positive
finding this wave did not have, and it is *bounded*: it says the drift is invisible to this corpus at
this taxonomy, not that the two artifacts are equal.

#### Act 6 — the falsifiers fired, on copies, with the landed files proven untouched

G-2's falsifier names three failure modes. Each was *executed* on a scratchpad copy of the four files
— never on the landed bytes, never on the read-only authorities:

| # | mutation | reading |
|---|---|---|
| F-0 | control, unmutated copy | `A/B/C = 0/0/0` · **GATE: GREEN** · exit **0** |
| F-1 | **widen the taxonomy** — reclassify `(B) MIS_ACCEPT` as `COVERAGE_NARROWING` in the ported verbatim copy | `UNMOVED` → **`MOVED`**; four distinct failures printed (block differs 683 vs 691 B · digest `aa592db0…` ≠ pinned · UTF-8 683→691 · UTF-16 675→683); **GATE: RED** although `A/B/C` was still `0/0/0` — *the count stayed zero and the gate still went red, which is the falsifier's exact claim* |
| F-2 | **lose the provenance tags** — strip one item's tags | `provenance summary moved: {…"c":83…} != {…"c":84…}` + `corpus header provenanceCounts disagrees with the tags on its own items`; **GATE: RED** |
| F-3 | **drop one declared-divergence row** (22 → 21) | `21 ruled divergence rows` + `DIVERGENCES: ported divergence ledger is 21 rows, the adjudication declares 22`; **GATE: RED**, unpiped ⟨`echo $?`⟩ → **1** |

After restoring, the same copy ran **GATE: GREEN, exit 0**. ⟨`shasum -a 256`⟩ over the four landed
files vs the restored copies → **SAME ×4**. ⟨`git -C value.js status --porcelain -- …/parser-proof/
…/parser-band.md …/cand-o`⟩ → **0 lines** (the sealed record, the adjudication and the vendored
tarball were read and never written). ⟨`find …/parser-proof -type f -not -path '*node_modules*' | wc
-l`⟩ → **189**, the open reading unchanged — the job tree was a copy source and nothing else.

#### Act 7 — §7's typecheck limb, taken the only way Q-1 allows

⟨cmd⟩ `tsc --noEmit --strict --target es2022 --lib es2023 --typeRoots <prototype-ws>/node_modules/@types
--types node --module esnext --moduleResolution bundler --skipLibCheck harness/equivalence/harness.ts`
→ **exit 0, zero diagnostics.** `tsc` is resolved from `/opt/homebrew/bin/tsc` and `@types/node` by
**absolute path into the prototype workspace's already-installed `node_modules`** — precisely Q-1's
in-bounds posture. **No `<p2>` root `package.json`, no `<p2>/tsconfig.json` and no `npm ci` was
written or run**; each is Q-1's named §3a trigger.

#### Act 8 — the commit

⟨cmd⟩ `git -C <p2> add <5 paths> && git commit --no-verify --quiet -m … -- <5 paths>` →
**`d1458f4f3c08899cb832752214e8c719cb8ed318`**, `5 files changed, 12365 insertions(+)`, message
verbatim from §9: *"feat(x-p-w1/equivalence): port the 403-string oracle with its three-class
taxonomy intact"*, body carrying the provenance and hint counts and the reproduced defect count as
§9 requires. **One commit, as §9 binds for this unit.** The **pathspec is on the `git commit`
itself** (X-W0.e `:402`'s shared-index hazard — unit `.a` was committing into the same `<p2>` index
this sitting and landed `d8a529a` between this seat's first measurement and its commit).
⟨`git -C <p2> diff --check`⟩ → **0**. ⟨`git -C <p2> status --porcelain`⟩ → **empty** after.
**Gate 27** ⟨`git -C value.js status --porcelain -- src api demo test e2e`⟩ → **0 lines**, asserted
before and after. `scripts/dev/dev.sh` never touched, never staged.

---

#### ESCALATION — G-2's literal invocation cannot run from `<p2>` on this box, and the cure is outside every bound

**This is the one obligation of the unit that was not discharged, and it is returned rather than
worked around.**

G-2's GREEN condition names a literal command *"run from `<p2>`"*: `npx tsx
harness/equivalence/harness.ts`. **That command does not complete on this machine.** Measured twice,
in two processes:

```
$ cd <p2> && npx tsx harness/equivalence/harness.ts
FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory
  … 4079.6 (4081.6) MB …            EXIT=134
real 150.93   user 61.25   sys 101.78
```

**The cause is not the harness.** ⟨cmd⟩ `cd <p2> && npx tsx --version` — a command that runs none of
this unit's code — was still running at a 115 s cap with `user 35.55 / sys 84.38`. The same entry,
invoked by the same `npx tsx` from any other working directory, runs in **1.35–1.73 s**:

```
$ cd <scratchpad> && npx tsx /Users/…/parse-that-css-totality-p2/harness/equivalence/harness.ts
A/B/C = 0/0/0      GATE: GREEN      EXIT=0      real 1.35
```

**Diagnosed at npm's own installed bytes, not inferred.**

1. ⟨cmd⟩ `cd <p2> && npm prefix` → **`/Users/mkbabb`**. `<p2>` has no `package.json` and no
   `node_modules`, so npm's up-walk from it terminates at a **stray `/Users/mkbabb/package.json`**
   (⟨`cat`⟩ → `{"dependencies":{"@mkbabb/value.js":"^0.4.4"}}`) — the home directory becomes npm's
   local prefix.
2. `libnpmexec/lib/index.js` takes a fast path *only* if the command is found in a local
   `node_modules/.bin` walking up from that prefix, or at `globalBin`; otherwise it falls through to
   `const localArb = new Arborist({…, path}); const localTree = await localArb.loadActual()` with
   `path` = the prefix. ⟨`ls /opt/homebrew/bin/tsx`⟩ → **No such file or directory**, and
   `libnpmexec/lib/file-exists.js`'s `localFileExists` **walks up** (`walkUp(dir)` from
   `/Users/mkbabb` to `/`), so every candidate is `/Users/mkbabb`, `/Users` or `/`.
3. `loadActual()` therefore walks the entire home directory. ⟨`sample`⟩ of the live process shows
   **every libuv worker thread in `uv__fs_work`**, which is the `sys 101.78` figure and the 4 GB heap.

**No in-bounds cure exists, and the three out-of-bounds ones are each refused here rather than
taken.** (i) A `<p2>/package.json` or `<p2>/node_modules` would stop the walk — **Q-1 names exactly
these as the §3a file-bound expansion that invalidates the wave**. (ii) `npm i -g tsx` would put
`tsx` on `globalBin` and fire npm's fast path — it writes no byte inside any bounded tree, but it
mutates shared machine state that three concurrent seats and every later X·P wave resolve through,
and it is not this unit's to decide. (iii) `NODE_OPTIONS=--max-old-space-size=…` is not the literal
command and would be a masking fallback around an unbounded directory walk. **Q-1's own instruction
is followed: *"A unit that cannot turn its gate without one of those HALTS and returns, it does not
write."***

**What is therefore claimed, precisely.** G-2's **product** is turned: the ported oracle re-runs over
the same 403 strings against the sha-pinned engine bytes, reproduces **A/B/C = 0/0/0** with the
taxonomy asserted byte-for-byte and the maps unchanged, exits **0**, double-run, and its three
falsifiers fire. G-2's **literal cwd form** is **BLOCKED** by an environment defect that the gate's
author could not have measured in August. **This seat does not mark G-2 green on its own word**; the
reading above is offered to the orchestrator with the obstruction named, the diagnosis complete, and
the ruling — install `tsx` globally, widen `<p2>`'s bounds by dated E-3 addendum, or amend the
command — left where it belongs.

**A note on what the cwd does and does not affect**, so the offered reading is not over-read: the
entry, the corpus, both engines, the authority and the results file are all addressed by **absolute
path**, and the runner is the same `_npx`-cached `tsx`. The working directory changes npm's
project-root detection and nothing the oracle measures. That is an argument for the reading's
validity, not a claim that the gate was run as written.

#### Residuals — six, none blocking, each with an owner

| id | severity | residual |
|---|---|---|
| **R-b1** | **ESCALATION** | the `npx`-from-`<p2>` obstruction above. Owner: **orchestrator**. Until it is ruled, W1-CLOSE must paste G-2 as *product-GREEN / literal-form-BLOCKED*, never as a plain GREEN. **Unit `.d`'s G-4/G-5 invoke `npx tsx harness/bench/bench.ts` from `<p2>` and will hit the identical wall** — this is a wave-level finding, not a unit-level one, and `.d` should read it before it spends 150 s discovering it. |
| **R-b2** | INFO — **F-3 reconciled** | seat-0's F-3 raw figures (`b:test/*` **216** · `a:test/parsing` **14** · `d:c14-tests` **18**) do not reproduce as raw counts; measured raw is **232 / 19 / 27**. They are the **EXCLUSIVE** reading — items carrying that tag *and no other*. ⟨cmd⟩ `node -e '…provenance.length===1…'` → `a 14 · b 216 · c 84 · d 18` + the eleven seed exclusives, with **26** multi-tag items. So there are three honest aggregations of one corpus: **RAW** (per tag, overlapping), **EXCLUSIVE** (single-tag items), and the spec's **FIVE-KEY SUMMARY** (once per leading key). The harness publishes the two F-3 asked for — raw and the summary, the latter **derived from the tags and cross-checked against the corpus header**, never copied from it. **Not a moved corpus; three readings, now each named.** |
| **R-b3** | INFO | `corpus.json` carries **no `SERVED MODEL:` line-1 receipt**: it is a byte-exact copy whose identity *is* its bytes, and a header line would break the digest the port is asserted by. Its receipt is `c6649cad…0f0a4ff8`, equal at source and destination. The three authored `.ts` files each carry the line. |
| **R-b4** | INFO | `equivalence-results.json` is **regenerated by every gate run**, so `<p2>` goes dirty on any re-run. It is committed as the landed machine form of the reproduced GREEN (§8's *"defect count by class and its declared-divergence row list"*); a re-runner should expect the diff and not read it as drift. |
| **R-b5** | INFO — **for `.d` (G-9)** | the corpus's **maximum bracket-nesting depth is 8** (item **335**), printed by the harness and stored in the results JSON. Published as an **INPUT** to G-9; the margin below the `Parser.lazy` ceiling **measured at `.d`'s own clock** (finding F-1: **7,759** on this box, not 7,761) is `.d`'s to declare, and this seat declares none. |
| **R-b6** | INFO | the two behaviour-identical no-ops of Act 2 are the only lines of the ported differential not transcribed verbatim; the 0-of-403 verdict comparison is the evidence that they changed nothing. |

**No §3a trigger fired**: no write outside §4's table (⟨`git -C <p2> show --stat`⟩ → five paths, all
under `harness/equivalence/`); the P-1 GREEN **did** reproduce; no bar was set, discussed or implied;
and no diagnose→edit→re-measure loop on G-2 reached a third iteration — the byte/char unit error was
one measure→cure→re-measure cycle and the `npx` obstruction was diagnosed, not iterated on.

---

## Addendum 2026-09-17 (same sitting) — the E13 sweep line IS appended to `INBOX.md`

**E-3: this corrects §Open by addition; nothing above is rewritten.** §Open's mail block states that
*"no sweep line is appended, because nothing moved"*. That reasoning is sound on the substance —
**0 unrowed, 0 new `I-n`** — but it is **wrong on the obligation**: E13's ledger is a record of the
*sweep*, not only of its yield, which is why all five prior seats of this sitting (P-1 · X.P.W0 ·
KF.W0 · KF.W1 · X-W0 · F.W0) each appended a line even when their result was zero. The line is
therefore appended at `docs/tranches/V/coordination/INBOX.md`'s end, in the file's own idiom,
carrying the four paths, the bounded atlas Q-lane extension, the delta test, and the **D-1** status-
cell classification. **No `I-n` row is written; no row above it is touched.** The substantive result
is unchanged: **0 unrowed · 0 new `I-n` · I-31 the inbound tail · O-21 the outbound tail · 0 UNREAD
in X.P.W1's scope.**
