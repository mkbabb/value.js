SERVED MODEL: claude-fable-5-1

# X.P.W2 — THE KILL LEDGER (Stage 5, `W2.md` §3e; unit `.h`, §5)

**Seat.** `X.P.W2.h`, the third and last Fable sitting of `W2.md` §5 — a fresh adjudicator (M-23
§1), **L-14-obligated to attempt refutation of the leader and forbidden to average the field**.
Date 2026-09-17. Spec of record `docs/tranches/X/parse-that/waves/W2.md` (sha256
`248eb0889f7ef101591435bd6bd2b6b5efc7e571cf9955a6360338507b29a4cd`, immutable — E-3). Contract of
record `docs/tranches/X/parse-that/algebra/ALGEBRA.md` = `<p2>/experiments/w2/contract/ALGEBRA.md`,
sha256 `14450aa4e5fcc976dbdc2aa54b1608df5712e0f57975b00229e2666b151f66f7` **both homes, re-hashed
at this seat**. `<p2>` = `/Users/mkbabb/Programming/parse-that-css-totality-p2` (base `f5757082`,
§0l R-13). Rulings consumed by id: COHESION §0j (OP-1, the begin-word), §0j.E **OC-1** (**no bar is
set anywhere in this file**; every bench sentence is a printed-table citation or absent), §0l
E-1/R-13, E-3 throughout.

**What this file is.** `W2.md` §2a: _"The kill ledger is the deliverable; the survivor is a
by-product."_ Every named candidate ends below with **exactly one terminal verb** — `SURVIVES-TO-W3`
or `KILLED(K-n)` with the rule, the measurement and the falsifier hit. **PEER-REVIEW-PENDING is not a
terminal state; taste kills nothing** (§3e: _"a kill cites its rule + the measurement"_).

**What this seat read and re-measured.** The wave record `execution/D/X-P-W2.md` whole (seat 0 ·
`.0` · `.a` · `.b` · `.c` · `.g` · `.d` · `.e` · `.f`); the three `VERDICT.md`s and
`stage0/ADMISSION.md` in `<p2>`; the harness (`harness/w2/**`, W1's `harness/bench/**` read-only);
the candidates' lowering sources at the bytes. **Every gate that decides a kill was RE-RUN by this
seat from each candidate's worktree** — not read from the receipts — and captured under
`docs/tranches/X/parse-that/evidence/W2/h/` (each file's line 1 is this seat's served-model
receipt; sha256 manifest in `SHA256SUMS`). Nothing under `/Users/mkbabb/Programming/parse-that`
was read or written; no `<p2>` byte was written; the harness, the corpora, W1's instruments and the
contract are untouched (the `§Selected` append is the one lawful text change after `.c`, FF-5).

---

## 0. The verdict, in one table

| id       | name                     | terminal verb                 | rule · measurement · falsifier                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| -------- | ------------------------ | ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **AC-1** | TAGLESS-TWIN             | **SURVIVES-TO-W3** (tied, §7) | K-1..K-4, K-6..K-10 NOT HIT, each with its number (§3); K-5 UNEVALUABLE (§7.2). Stage-0 falsifier NOT HIT (`.g`: 6/6 σ coordinates restored in both instantiations, mutant emitter caught).                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| **AC-2** | CLOSED-IR                | **SURVIVES-TO-W3** (tied, §7) | K-1..K-4, K-6..K-10 NOT HIT, each with its number (§3); K-5 UNEVALUABLE (§7.2). Stage-0 falsifier NOT HIT (`.g`: 16 kinds used, 0 outside the 22; 22/22 compile cases, no default arm; `recover` demonstrated).                                                                                                                                                                                                                                                                                                                                                                                                                   |
| **AC-3** | SPAN-ALGEBRA             | **KILLED(K-3)**               | **12 of 22 operators have exactly one lowering of their control flow** — the JS one — for BOTH targets; the "Wasm lowering" of `SEQ ALT CUT PURE REP DROP FAIL EXPECT CTOR TRY RECOVER REF` is a JavaScript closure whose module calls are σ stores (`setErr`/`setCut`/`setDepth`/journal pushes). Measured at the bytes of `lowering-wasm/compile.mjs`, double-run (`evidence/W2/h/ac3-k3-operator-realization.txt`). The falsifier hit is the hypothesis's own second lowering — _"zero-function-import Wasm"_ — which §3c pre-named for this posture as _"answering a weaker question than the hypothesis asked"_. §2.3 below. |
| **AC-4** | SIBLINGS-ORACLE          | **KILLED(K-2)**               | K-2's carrier-analog (§3e: _"applies to AC-4's channel table as the carrier-analog"_): **7 of 65** slice semantic decisions (S-1..S-7) are carried by TERM SHAPE, not by a table row, against a pre-declared Stage-0 falsifier whose threshold is **one** (`.g`, `stage0/ac4-table-expressibility.mjs`, exit 1, double-run). §2.1 below.                                                                                                                                                                                                                                                                                          |
| **NC-0** | GENERATOR                | **PRE-KILLED, by citation**   | §6 below.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| **NC-1** | WASM-PRIMARY, DERIVED JS | **PRE-KILLED, by definition** | §6 below.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |

**Candidates carried to a terminal verdict: 4 of 4** (G-12 asks ≥ 3). **Survivors: 2 — a MEASURED
TIE on every kill rule that can be evaluated in this wave, escalated to the owner, Mike Babb, by
name (§9 E-1).** This is the outcome `W2.md` §3 item 9 / §3e Stage 5 / §5 `.h` / §6 G-12 each name
as lawful in the same breath as the one-survivor outcome; the G-12 falsifier is _"two survivors
**without** an owner escalation"_. The seat did not manufacture a single survivor by a criterion no
kill rule states, and it did not average the two into a merged candidate (FF-1).

---

## 1. L-14 — the refutation attempts, and what each measured

The leader on the receipts is **AC-2**: six of nine gates GREEN, the contract shipped verbatim, and
the `.c`-carried prior naming it _"preferred if its init-time compile is total"_ (it is: 5,973 IR
`op` reads at lowering, **0** at parse over 527 rows, `.e` §e.3). A wave that ends confirming its
author's prior with no surprises is suspect (§3c), so the leader was attacked first, at the bytes.

| #   | attempt                                                                                                 | measurement (this seat, from `<p2>/.worktrees/ac2`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | outcome                                                                                                                                                                                                                                                                                                                                                                                                       |
| --- | ------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| R-1 | Does the six-product zero reproduce from a fresh process, or was it one run's luck?                     | ⟨`node harness/w2/eq-six.mjs --candidate ac2 …`⟩ → EQ-1 **0** · EQ-2 **0** · EQ-3 **0** · EQ-4 **0** · EQ-5 **0** · EQ-6 **2035** (first `s0180 "var(--brand)"`), rows **30,527**, labels aligned **true**, third cell **236** (12 declared) — identical to `.e`'s print to the digit. Same for ac1 (third cell **233**) and ac3 (**236**).                                                                                                                                                                                               | **REFUTATION FAILS.** K-1 not hit for any of the three; EQ-6 is the contract's (§9 E-2).                                                                                                                                                                                                                                                                                                                      |
| R-2 | Is AC-2's `cut∉alt 0` a property of the candidate or of its encoding?                                   | `.e` F-e2: the two §10.3 `CUT`s _"are not encoded"_; `.f` F-f2 encoded them and measured them **inert over 30,527 rows** (a variant with both removed is identical on `ok`·`V`·`C`·`P`·`D`·recoveries). ⟨`op-bijection --structural`⟩ here: ac1 **7**, ac2 **0**, ac3 **2** — the number measures the encoding.                                                                                                                                                                                                                           | **PARTIAL.** AC-2's clean G-1 is not a capability the others lack; it is the same contract defect (F-2) encoded around. Not a kill of anyone; not a merit of AC-2. Recorded so the tie is read honestly (§7.1).                                                                                                                                                                                               |
| R-3 | K-6 on the leader: four G-8 draws instead of the seat's one.                                            | wasm warmed drift **0.782× · 0.911× · 0.833× · 0.917×** (envelope 0.80–1.25; `.e` read 0.880×) — one of four outside, **faster-later**. AC-1 under the same four draws: **0.931× · 0.744× · 0.844× · 0.923×** — one of four outside, faster-later. Draw D captured (`evidence/W2/h/ac{1,2}-g8-alloc-latch-drawD.txt`); draws A–C printed in-seat and transcribed.                                                                                                                                                                         | **REFUTATION FAILS.** The direction is V8 tier-up (the probe's own note), it is symmetric across the two full-Wasm candidates, and the printed envelope is **narrower than the instrument's draw-to-draw spread on this box** (§10 F-h3). A K-6 kill on one draw in four, in the faster direction, on both candidates alike, would be taste wearing a rule. Dissent preserved (§8 D-3).                       |
| R-4 | AC-2's JS "reset residue" reads **0.574× · 0.620× · 0.653× · 0.655×** — consistent, not noise. A latch? | ⟨`sed -n '105p' lowering-js/index.mjs`⟩ → `reset: () => undefined, // nothing to reset: there is no state to leave`. The leg compares two consecutive 1,000-parse windows with a **no-op** between them; the first window sits right after the reject window + `gc()`. The probe's own red line for this leg is one-sided (`> 1.25`).                                                                                                                                                                                                     | **REFUTATION FAILS.** Not residue — there is no reset. An instrument-window artifact of the F-4 class (§10 F-h4). AC-1's JS lowering exposes no `reset` and prints no such line.                                                                                                                                                                                                                              |
| R-5 | Does the leader ship a production the slice cannot reach?                                               | ⟨`node -e '<ac2 adapter, P:timing-function>'`⟩ → `linear(0, 1)` → **`ok:false trailing_input@6 expected ["end of input"]`** in BOTH lowerings; `linear` → keyword; `linear(0 0%, 1 100%)` → the same rejection. AC-1 on the same inputs → `ok:true {kind:"linear-function",…}` in both (`evidence/W2/h/linear-reachability.txt`).                                                                                                                                                                                                         | **CONFIRMED, and it is the contract's** (F-7 / F-e13 / F-f10 — §10.2's `ALT` order; §9 E-4). AC-2 shipped §10.2 verbatim (FF-3); AC-1 applied the minimal reorder and declared it. Neither posture is a K-rule breach; they answer different questions (`.e` F-e13), and the 233-vs-236 third-cell delta is consistent with exactly those rows. Recorded in the tie (§7.1) and preserved as dissent (§8 D-2). |
| R-6 | What library does the leader's _"source-direct JS on the combinator library's own surface"_ stand on?   | ⟨`lowering-js/parse-that.mjs:20-22`⟩ → the **published `@mkbabb/parse-that@1.0.0` dist** at the absolute path `/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/prototypes/css-parser/node_modules/@mkbabb/parse-that/dist`, by digest, with OP-7 cited as the reason (_"may MEASURE on the clone-point substrate; may not ADOPT"_). AC-1 imports the same path through W1's `harness/bench/lib/engines.mjs` `PARSE_THAT_DIST` export (`js-alg.mjs:25,36`). AC-3 alone builds on `<p2>/typescript/src/**` (its own branch). | **NOT A KILL** — OP-7 is an open owner mark and the seat's reading of it is lawful. **It is a graduation fact**: the graduated `typescript/src/css/**` of either survivor inherits an absolute-path dependency into another repository's `node_modules`. Escalated with OP-7 by name (§9 E-7); bound into the `.i` ruling (§11).                                                                              |
| R-7 | Is K-5 — the only lawful bench kill — evaluable against the leader at all?                              | ⟨`harness/bench/bench.ts:8-12,36`⟩ argv = `--rounds --warmup --out --no-finalize` only; ⟨`harness/bench/lib/engines.mjs:84-150`⟩ `loadEngine` is a closed `if (name === …)` chain over four W1 engines ending `throw new Error(\`unknown engine ${name}\`)`. **No registration surface exists** (`evidence/W2/h/g7-registration-surface.txt`).                                                                                                                                                                                            | **K-5 UNEVALUABLE IN BOUNDS.** G-7's clause _"with the W2 cells registered"_ presumes a surface W1 did not build; registering a cell is a write under `harness/bench/**` — R-E execute-no-write and a §3a halt. No phase-4 seat ran Stage 4 and none could have. Escalated (§9 E-6). This is the single fact that turns AC-1 vs AC-2 from a decidable comparison into a measured tie (§7.2).                  |

The leader survived every attempt; so did AC-1 under the same attempts (R-1, R-3, R-6 run on it
identically). The one place the two differ on a rule (R-7) is a place the wave cannot measure.

---

## 2. Per-candidate dockets

### 2.1 AC-4 SIBLINGS-ORACLE — KILLED(K-2), at Stage 0

- **Rule.** K-2 — _"any target-conditional in grammar/algebra source — one algebra or none (applies
  to AC-4's channel table as the carrier-analog)"_; §3c AC-4 (c): _"the candidate must show the
  table is the load-bearing algebra carrier (every semantic decision a table row, neither sibling
  free-handing) or die on K-2's analog"_.
- **Falsifier (pre-declared, `ALGEBRA.md` §12 verbatim).** _"any semantic decision in the slice
  demonstrably NOT expressible as a table row consumed by both siblings → killed."_ Threshold: one.
- **Measurement (`.g`, `stage0/ac4-table-expressibility.mjs`, 135 L, exit 1, run twice).** **58 of
  65** slice semantic decisions are rows of the §4.4 registries at their declared row shapes; **7**
  are carried by term shape alone — **S-1** hue unwrapping · **S-2** juxtaposition width · **S-3**
  the legacy arm's existence · **S-4** R6's bare number · **S-5** `CUT` placement · **S-6**
  `recover-final-only` · **S-7** the case-folding policy — each quoted to its contract line in the
  spike's output. A table rich enough to hold them (`wrap`/`sep`/`forms`/`commit` columns) _is an
  IR_, i.e. AC-2 under another name, which FF-1 forbids as a merged candidate.
- **What it does not touch.** The band's differential-oracle evidence (30,000 seeded inputs, zero
  acceptance disagreements) stands: an oracle bounds drift by _coverage_; the falsifier asked the
  table to bound it by _construction_. cand-O's adjudicated grammar substance is hosted by all three
  admitted candidates (§3c); nothing ruled at the band is re-litigated by this kill.
- **RESERVE consequence (R-g2).** §3e names the RESERVE as _"the fourth, if it survives its
  falsifier"_; AC-4 did not, so **RESERVE = NONE** and FF-6's entry rule had no subject. No admitted
  candidate died structurally at Stage 2, so the rule was never invoked.

### 2.2 AC-1 TAGLESS-TWIN — SURVIVES-TO-W3 (tied)

- **What it is (`.d`).** One grammar file authored against the 22-operation signature;
  `buildGrammar(A)` for any algebra `A`; lowering-JS instantiates it over parse-that's
  `Parser`/`createParserContext` (_the interpretation IS the parser_, no IR); lowering-Wasm is an
  emitter — each operation assembles a Wasm function, a term's value is a function index.
  `build/ac1.wasm` **187,341 B · 1,273 functions · 0 imports · no start section**, sha256
  `049b9904…e22`. Both lowerings built from one source by `node build.mjs` (K-9 audit: _non-JS
  toolchain in that path: none_).
- **Gates, re-run by this seat** (`evidence/W2/h/ac1-*`): G-2 **GREEN** (22/22, fingerprints
  pairwise equal, 0 DECLARED-ABSENT) · G-3 EQ-1..EQ-5 **0** over 30,527, EQ-6 **2035** (contract,
  §9 E-2), third cell **233** · G-4 TRY sites **2,951**, R-LAW-1 **0**, R-LAW-3 silent, R-LAW-4
  **0/0**, R-LAW-2 **13** (the same F-1 rows) · G-5 **0/172 × 3 × 2, 7/7** boundary · G-9 imports
  **0** all kinds, start absent, exports `run setTheta highWater reset memory`, no grow, K-9 none,
  K-10 intact · G-1 structural `cut∉alt` **7** (F-2, the contract's `CUT` idiom under the `R_disp`
  indirection and §10.3's `REP`/`RECOVER`; `.d` measured **14** with dispatch terms as roots and
  published the larger number) · G-8 four draws: wasm warmed drift 0.931/0.744/0.844/0.923×, reset
  residue 1.000/0.936/0.969/1.000×, wasm reject leg **2.1/0.5/2.1/2.1 B/parse**, js reject leg
  −0.1/−0.2/−0.8/−0.8 (F-4 instrument, §10 F-h3) · G-10 **GREEN** (`.d`: 139 graph nodes, `opt`
  under `all` 0, `lazy` 0, memoize 0, five textual zeros, excess-property fixture passes) · G-11
  **GREEN** (`.d`: the 50,008-byte row → `ok:false, 1 issue` in both).
- **Declared deviations from §10's letter (`.d` VERDICT §9, five).** `sync-rule` terminals wrapped
  in `DROP` (INV-OWN) · `important` as `ALT[SEQ[…, PURE true], PURE false]` · `color-body` inlined
  into `value-slice` (F-8, §8 D-3's two-`REF` count honoured) · **§10.2's `DISPATCH` arm moved
  first (F-7)** — the one deviation that changes acceptance: `linear(…)` reachable, 3 slice rows
  REJECT → ok, no other verdict changed · the dispatch-head blind spot measured rather than left.
  Every one was declared before measurement at its site; none needed anything outside the 22.
  **This is not a K-rule breach and not a rescue** (no gate depends on those rows); it is a posture
  difference from AC-2 that the owner reads in §7.1 and §8 D-2.
- **Numerics.** `Number(s)` reproduced by a correctly-rounded 192-bit path in Wasm, validated before
  emission: **0** mismatches over 20,433 distinct corpus tokens and **0 unflagged** over 500,000
  generated (the routine flags what it cannot decide; flagged **0** over the 30,527-row
  differential).
- **Kill rules.** K-1 NOT HIT (EQ-1..5 = 0; EQ-6 identical in both, 30,527/30,527 failure lists
  equal) · K-2 NOT HIT (0 over 12 declared sources after three innocent renames, F-6) · K-3 NOT HIT
  (22/22, both lowerings — and the Wasm lowering _is_ Wasm: 1,273 module functions) · K-4 NOT HIT
  (`RECOVER` OP-21 in both registries, exercised by `P:stylesheet` in both) · **K-5 UNEVALUABLE**
  (§7.2) · K-6 NOT HIT (§1 R-3) · K-7 NOT HIT (bound constructed; `try`/`catch` grep → 1 hit, a
  comment) · K-8 NOT HIT (0 throws over 172 + 7 and 30,527) · K-9 NOT HIT · K-10 NOT HIT (0
  declared wasm sources byte-identical to the evidence root's 3 uncommitted `wasm32` files).

### 2.3 AC-2 CLOSED-IR — SURVIVES-TO-W3 (tied)

- **What it is (`.e`).** The algebra as a finite closed union of 22 IR kinds; the grammar one
  frozen, `assertClosed()`-checked data object; **both** compilers switch over the union with no
  `default:` arm (the closed-union law load-bearing: a welded `HOSTFN` kind halts both). Declared
  moments before measurement: JS = **init-time compile** (IR → parse-that `Parser` graph at load;
  0 `op` reads per parse), Wasm = **build-time emit** (`artifacts/ac2.wasm` **117,544 B · 580 node
  functions + 38 helpers · 0 imports · no start section**, sha256 `d70449e8…3c7`), parse-time
  interpretation = **the named degeneration**, built on purpose and priced (1.54× the shipped JS
  lowering, `BAR: OWNER-GATED-PENDING-RATIFICATION`). K-9 proven by running the declared build in a
  child with `cargo`/`rustc`/`wasm-*`/`clang`/`cc`/`gcc` stripped from `PATH` and a scratch `HOME`
  — byte-identical artifact, under a _different_ node (v22.15.0).
- **Gates, re-run by this seat** (`evidence/W2/h/ac2-*`): G-1 **GREEN** both halves (`cut∉alt` 0 —
  by encoding, §1 R-2) · G-2 **GREEN** · G-3 EQ-1..EQ-5 **0**, EQ-6 **2035**, third cell **236** ·
  G-4 TRY sites **2,942**, R-LAW-1 **0**, R-LAW-3 silent, R-LAW-4 **0/0**, R-LAW-2 **13** · G-5
  **0/172 × 3 × 2, 7/7** · G-9 imports **0**, start absent, exports `memory · parse_P_color ·
parse_P_timing_function · parse_P_stylesheet`, memory 33,554,432 B constant, K-9 none, K-10
  intact · G-8 four draws: wasm warmed drift 0.782/0.911/0.833/0.917×, wasm reset residue
  0.852/1.062/1.000/1.000×, wasm reject leg 0.0/0.0/0.0/−0.0 B/parse, **js reject leg
  13.1/12.5/13.2/13.3 B/parse** (F-e8: the JS lowering materializes `marks` and `D` as objects
  because the `<Lowering>` contract requires them; the Wasm side journals into linear memory; the
  instrument's cold first window — §10 F-h3) · G-10 **GREEN** (`.e`: 837 graph nodes, zeros, fixture
  passes) · G-11 **GREEN** (`.e`: `s0526` → `ok:false, 1 issue` both, Θ.depthBound = 64 threaded as
  an entry parameter).
- **Declared encodings (`.e` VERDICT §F, F-e1..F-e5, F-e11, F-e12).** `sync-rule` through `DROP` ·
  §10.3's two inert `CUT`s **not encoded** · `DISPATCH` arms on the node's argument list ·
  `important` as `PURE 1/0` · OP-03 lowered twice from one source · **EQ-5's sixth coordinate a
  logical cell counter in both lowerings** (the byte watermark beside it on `arenaHighWater()`) ·
  BND-1 steps 4–5 in the glue. §10.1's `balanced-tail` and **§10.2's `ALT` order shipped verbatim**
  (FF-3) — so `linear(…)` is unreachable in this candidate as shipped (§1 R-5).
- **Numerics.** OP-03 as the algebra's routine lowered twice: exact paths **0 ULP** from `Number()`
  over the 30 corpus numerals reaching them; the **declared** fallback's worst distance **3 ULP**
  (at `45679011934567900000e-164`, over 801 numerals) — §4.1 declares the fallback
  non-correctly-rounded; 32/32 edge numerals `Object.is`-equal across the lowerings.
- **Kill rules.** K-1 NOT HIT · K-2 NOT HIT (0 over 11 declared sources) · K-3 NOT HIT (22/22; a
  welded 23rd kind halts both compilers; the Wasm lowering _is_ Wasm: 580 node functions) · K-4 NOT
  HIT (RECOVER lowered 1× at init / 1× at emit; 24 events → 24 diagnostics, 1:1) · **K-5
  UNEVALUABLE** · K-6 NOT HIT (§1 R-3, R-4) · K-7 NOT HIT · K-8 NOT HIT · K-9 NOT HIT (the strongest
  K-9 proof in the wave) · K-10 NOT HIT.

### 2.4 AC-3 SPAN-ALGEBRA — KILLED(K-3)

- **What it is (`.f`).** A branchless 257-slot class-table scanner landed as a parse-that citizen
  (`typescript/src/parse/scan.ts`, 239 L, plus three append-only exports, on branch
  `w2/ac3-scan-union` at `76033aac`; the library's `tsc` and `vitest` readings unchanged from the
  measured base). Terminals (`SCAN LIT NUM DIGITS TEXT KW DISPATCH END`), numerals and σ live in the
  module (`build/ac3.wasm` **25,267 B**, 0 imports, no start section). **Declared posture (FF-4,
  before measurement): "parse structure — JS COMBINATORS IN BOTH LOWERINGS"** (VERDICT §A), with
  the consequence stated by the seat itself: _"EQ-1..EQ-6 against AC-3 discriminate the terminal
  layer, the numerals, the journals and the rollback arithmetic — not two independent readings of
  the combinator structure. A green G-3 here is a narrower fact."_
- **Rule.** K-3 — _"any operation/node with exactly one lowering (the escape hatch)"_.
- **Measurement (this seat, `evidence/W2/h/ac3-k3-operator-realization.{mjs,txt}`, double-run,
  identical).** Over `lowering-wasm/compile.mjs`'s 22 `case` blocks: **12 of 22 operators —
  `SEQ ALT CUT PURE REP DROP FAIL EXPECT CTOR TRY RECOVER REF` — execute their control flow (arm
  sequencing, loops, commit and rollback decisions) in JavaScript for the Wasm target**; the module
  functions those cases call are σ stores and journal pushes only (`setErr setCut setDepth setFar
pushC pushD pushP truncate labCopy raise guard`, `mark`/`rollback` via `runtime.mjs`). Read
  literally: `CUT`'s Wasm-target realization is `X.setCut(1)`; `TRY`'s calls no module function
  directly. The seat's own header says so in words (`compile.mjs:5-14`): _"The control flow below is
  the JS lowering's, operator for operator … What this construction does NOT do is re-implement the
  combinator structure in Wasm."_ Those twelve operators therefore have **one** lowering of their
  semantics — the JS one — instantiated over two σ stores; the algebra's control half was never
  lowered to Wasm.
- **The falsifier hit.** The surviving hypothesis's own second lowering is _"zero-function-import
  Wasm"_ (§2a); §3c AC-3 pre-named exactly this posture: _"leaf-wasm satisfies 'zero-function-import'
  trivially while leaving the parse in JS — answering a weaker question than the hypothesis asked,
  a posture the kill ledger records either way."_ It is recorded, and it is fatal: a candidate that
  answers a weaker question has not _"earned the right to carry the surviving hypothesis"_ (§2a),
  and K-3 is the rule under which one-lowering operators die.
- **The seat's justification, refuted by existence.** VERDICT §A: _"NC-1 pre-kills the
  derived-interpreter posture by citation; a Wasm re-implementation of the parse graph is that
  posture at one remove."_ NC-1 pre-kills **Wasm-primary with a mechanically derived JS** (§3c). A
  Wasm lowering of the parse graph _beside_ a source-direct JS lowering is the hypothesis itself —
  and it exists twice in this wave: AC-1 (1,273 module functions) and AC-2 (580 node functions),
  both passing G-9 and G-10 with their JS lowerings source-direct. The citation does not carry.
- **What the kill does not touch — carried forward, not lost.** (i) `W2.md` §3 item 12 is a _wave_
  scope item (_"scan primitives land as parse-that-owned combinator-surface citizens"_) and AC-3's
  branch delivered it: `w2/ac3-scan-union` at `76033aac` is a library commit independent of the
  candidate commit `f9349560` (the seat split them for exactly this reason). **W3 may consume it as
  the scan union inside the library** — a finding for W3's open, not a survivor's property. (ii) The
  four predicted failures were all NOT OBSERVED (§4) — the prior's cause of death for AC-3 was wrong
  (§5). (iii) The class-table scan leaf measured faster in the module than in JS (leg B: wasm
  4.4–9.6 ns vs js 16.0–42.5 ns per call, `.f` §f.3) — a printed-table fact, no bar, carried as a
  row for the owner's OC-1 reading.
- **Other kill rules (for the record).** K-1 NOT HIT (EQ-1..5 = 0 over 30,527 — over the narrower
  fact the seat declared) · K-2 NOT HIT · K-4 NOT HIT · K-6 NOT HIT (100,000 parses byte-identical at
  every checkpoint; high-water flat at 352 B; `reset()` → 0 B) · K-7 NOT HIT · K-8 NOT HIT · K-9
  NOT HIT · K-10 NOT HIT.

---

## 3. The kill-rule matrix (every cell a measurement; none a taste)

| rule                         | AC-1                                                                       | AC-2                                                          | AC-3                                                                              | AC-4                                                        |
| ---------------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------- | --------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| K-1 equality divergence      | NOT HIT — EQ-1..5 `0/0/0/0/0` over 30,527; EQ-6 2,035 identical both (F-1) | NOT HIT — same numbers                                        | NOT HIT — same numbers (narrower fact, §2.4)                                      | n/a — never built past Stage 0                              |
| K-2 target-conditional       | NOT HIT — 0 over 12 sources                                                | NOT HIT — 0 over 11 sources                                   | NOT HIT — 0 over 17 sources                                                       | **HIT (carrier-analog) — 7 of 65 decisions not table rows** |
| K-3 one-lowering operation   | NOT HIT — 22/22; Wasm parse graph 1,273 fns                                | NOT HIT — 22/22; Wasm parse graph 580 fns                     | **HIT — 12 of 22 operators' control flow has one lowering (JS) for both targets** | n/a                                                         |
| K-4 recovery backend-only    | NOT HIT — OP-21 both, exercised                                            | NOT HIT — 24 → 24, both                                       | NOT HIT (RECOVER's control in JS for both, subsumed by K-3)                       | n/a                                                         |
| K-5 Pareto on all bench legs | **UNEVALUABLE** — no Stage-4 table exists and none can (§7.2)              | **UNEVALUABLE**                                               | moot                                                                              | n/a                                                         |
| K-6 cross-parse state        | NOT HIT — 4 draws, §1 R-3; wasm reset 1.000/0.936/0.969/1.000×             | NOT HIT — 4 draws, §1 R-3/R-4                                 | NOT HIT — 100k parses byte-identical, high-water flat                             | n/a                                                         |
| K-7 recursion unbounded      | NOT HIT — Θ.depthBound, no shield (1 comment hit)                          | NOT HIT — Θ.depthBound threaded to Wasm, no shield            | NOT HIT — REF carries the bound, `lazy` 0                                         | n/a                                                         |
| K-8 any throw                | NOT HIT — 0/172 + 7/7, 0 over 30,527                                       | NOT HIT — same                                                | NOT HIT — same                                                                    | n/a                                                         |
| K-9 toolchain capture        | NOT HIT — `node build.mjs`, audit: none                                    | NOT HIT — stripped-PATH child, different node, byte-identical | NOT HIT — JS assembler with no import section                                     | n/a                                                         |
| K-10 substrate breach        | NOT HIT — 0 of 3 uncommitted `wasm32` files matched                        | NOT HIT — 0 references into the evidence root                 | NOT HIT — 0 matched                                                               | n/a                                                         |
| **terminal verb**            | **SURVIVES-TO-W3 (tied)**                                                  | **SURVIVES-TO-W3 (tied)**                                     | **KILLED(K-3)**                                                                   | **KILLED(K-2)**                                             |

---

## 4. Every §3c predicted failure mode, dispositioned

_"A prediction nobody checked is a decoration"_ (§5 `.h`). Each row names who checked it and the
number; the vocabulary is the spec's — CONFIRMED / NOT-OBSERVED — with the one refinement the
evidence forces stated in the cell.

| candidate | prediction                                                          | disposition                                                                                                                                                                                                                                                                                                              |
| --------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| AC-1 (a)  | signature leak (K-2)                                                | **NOT-OBSERVED** — algebra→lowering imports 0; target-conditionals 0 over 12 sources (first reading 3, all dispatch-target names, renamed, F-6); the grammar destructures exactly 22; `js.grammar() === wasm.grammar()` byte-identical (`.d`)                                                                            |
| AC-1 (b)  | megamorphic IC collapse on the short-string leg                     | **NOT-OBSERVED as predicted** — `--trace-ic` absent on node v26, `--log-ic` used and declared; ~1,270 parser objects leave the loop at 336 monomorphic · 13 polymorphic · **1 megamorphic**, and that one is DM-1's freeze walk, not combinator dispatch; the Wasm boundary's 17 were 15 seat-defects, cured to 2 (`.d`) |
| AC-1 (c)  | continuation inexpressibility for `TRY`/`RECOVER` (K-3/K-4)         | **NOT-OBSERVED** — 0 host closures; CL-1 leaks 0; recovery lowered and exercised in Wasm. The inexpressibility found is the **contract's** (one-arm `ALT` is not in the signature — F-2), not the candidate's (`.d`)                                                                                                     |
| AC-2 (a)  | double-interpretation tax                                           | **NOT-OBSERVED** — 5,973 `op` reads at lowering, **0** over 527 parses, both moments; the degeneration built on purpose reads 1.54× (printed table, no bar) (`.e`)                                                                                                                                                       |
| AC-2 (b)  | the `hostFn` escape-hatch node (K-3)                                | **NOT-OBSERVED** — welded in on purpose: `closureLeaks` 1, `assertClosed` halts, both compilers halt on the 23rd kind; kinds with one lowering 0 of 22; the hard 20 % lowered in both, 6/6 `js ≡ wasm` (`.e`)                                                                                                            |
| AC-2 (c)  | label/PC drift (the 18-vs-20 defect structurally)                   | **NOT-OBSERVED** — one frozen `L` object shared; 114 TRY sites by two agreeing walks; 0 unassigned sites, 0 out-of-range offsets, 0 cross-lowering offset disagreements; the injection moves EQ-4's digest, so the instrument could see it (`.e`)                                                                        |
| AC-2 (d)  | toolchain capture in build-time mode (K-9)                          | **NOT-OBSERVED** — stripped-`PATH` child, scratch `HOME`, node v22.15.0: byte-identical artifact (`.e`)                                                                                                                                                                                                                  |
| AC-3 (a)  | token-boundary divergence at the juxtaposition rows / numeric edges | **NOT-OBSERVED** — 17 rows, 0 divergences on six products; against a maximal-munch pre-pass over the same table, 0 spans split / 0 straddle (`.f`)                                                                                                                                                                       |
| AC-3 (b)  | short-string inversion                                              | **NOT-OBSERVED** — 8 legs × 3 forked runs, no flip with length (4 B vs 78 B: 1.387/1.174 · 1.230/1.170 · 1.014/1.099); the instrument's run-to-run spread named as its limit (`.f`)                                                                                                                                      |
| AC-3 (c)  | the boundary eats the win (≥ 20 % screen)                           | **NOT-OBSERVED** — 1.3–2.2 % of the 55.6 ns budget, 3 runs × 3 invocations × 5 forked processes; `.g`'s 14.5/17.9/18.1 % measured a different quantity (F-f8) and is not averaged with it (`.f`, `.g`)                                                                                                                   |
| AC-3 (d)  | arena latch (K-6)                                                   | **NOT-OBSERVED** — 100,000 parses byte-identical at every checkpoint; high-water flat 352 B; `reset()` → 0 B (`.f`)                                                                                                                                                                                                      |
| AC-4 (a)  | drift with nothing to stop it (input 30,001)                        | **NOT-OBSERVED — UNTESTED BY CONSTRUCTION**: the Stage-0 kill preceded any stage at which two siblings existed to drift; the band's 30,000-row oracle evidence stands unrefuted (`.g`)                                                                                                                                   |
| AC-4 (b)  | maintenance doubles                                                 | **NOT-OBSERVED — UNTESTED BY CONSTRUCTION** (no maintenance event occurs at Stage 0)                                                                                                                                                                                                                                     |
| AC-4 (c)  | the one-algebra claim thins (K-2/K-3 bind the table)                | **CONFIRMED** — 7 of 65 decisions carried by term shape; the kill (§2.1) (`.g`)                                                                                                                                                                                                                                          |

**Tally: 1 CONFIRMED · 11 NOT-OBSERVED · 2 NOT-OBSERVED-untested-by-construction.** Of the three
deaths and near-deaths in this wave, only AC-4's was where §3c looked; the wave's other findings
(§9, §10) were all found somewhere the predictions did not point.

---

## 5. The stated prior, scored clause by clause

`W2.md` §3c / `ALGEBRA.md` §12, verbatim: _"AC-3 dies on its predicted boundary/inversion failures,
AC-4 survives Stage 0 but loses the one-algebra argument at Stage 2/3, and AC-1 or AC-2 survives —
AC-2 preferred if its init-time compile is total."_

| clause                                             | score                                                                                                                                                                                                                                                         |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| "AC-3 dies"                                        | **CONFIRMED** — KILLED(K-3)                                                                                                                                                                                                                                   |
| "… on its predicted boundary/inversion failures"   | **REFUTED** — all four predicted failures NOT-OBSERVED (§4); AC-3 died on its declared _posture_ (the parse structure never lowered to Wasm), a cause the prior did not name                                                                                  |
| "AC-4 survives Stage 0"                            | **REFUTED** — KILLED at Stage 0 (7 of 65)                                                                                                                                                                                                                     |
| "… but loses the one-algebra argument"             | **CONFIRMED** in substance — it lost exactly that argument (predicted failure (c)), one stage earlier than foretold                                                                                                                                           |
| "AC-1 or AC-2 survives"                            | **CONFIRMED** — both do                                                                                                                                                                                                                                       |
| "AC-2 preferred if its init-time compile is total" | antecedent **CONFIRMED** (0 `op` reads per parse); consequent **NOT APPLIED** — a preference is not a kill rule, and on every rule this wave can evaluate the two are tied (§7). The prior's tie-breaker was never a lawful instrument and is not used as one |

**Surprises the prior did not contain**, so the wave is not suspected of having measured the prior:
three contract defects reproduced independently by three seats (F-1 at 2,035/2,047; F-2; F-7), a
fourth specification conflict (EQ-5's sixth coordinate, F-3/F-f4), the G-8 instrument's resolution
(F-4/F-e8/F-f3), G-7's missing registration surface (K-5 unevaluable), and the substrate the two
survivors actually stand on (§1 R-6).

---

## 6. NC-0 / NC-1, restated with citations (considered and killed, not forgotten)

- **NC-0 GENERATOR — PRE-KILLED BY CITATION.** The BUILD-V12 shape (one builder emitting both
  targets). Terminal on the record: v1–v11, then the v12 predicate-closure inconsistency — **18
  declared predicate ids over a 20-formula domain, misbound not absent**
  (`PARSER-CSS-PAUSE-HANDOFF-2026-08-02.md` §5; hash `ced23440…f20f7` re-verified at seat 0). The
  builder `0732ebc2…`, its residue `de1d62ff…`, the v12 target ABSENT — the quartet re-hashed at
  this wave's open (X-P-W2.md O.2), zero mismatch. Revival requires resume-protocol steps 3–7 plus a
  separate owner release (handoff §8) that no W2 seat may grant itself; none did. G-2's
  registries-not-counts screen is this kill made permanent (§11 archaeology 1): every admitted
  candidate printed a 22/22 pairing before any timing.
- **NC-1 WASM-PRIMARY, DERIVED JS — PRE-KILLED DEFINITIONALLY.** Writing the algebra once in Rust and
  deriving the JS target mechanically fails the surviving hypothesis's own words — the JS lowering
  must be _source-direct on the combinator library's own surface_ (handoff §4; `W2.md` §2a). The
  generated-source posture is the one the pause killed (handoff §3.2: generated source **1,965,705
  bytes**, target ABSENT) and would fail G-10's graph walk on arrival (a hand-rolled cursor loop
  passes every grep and fails the walk, §6 G-10 falsifier). No spike was spent on the tautology.
  **Note for the record (§2.4):** NC-1 was cited by AC-3 as the reason not to lower the parse graph
  to Wasm; the citation misreads NC-1's direction. NC-1 kills _derived JS_; it says nothing against
  a Wasm lowering beside a source-direct JS one — which is what the hypothesis asks for and what
  AC-1 and AC-2 built.

---

## 7. The measured tie — what it is, and what breaks it lawfully

### 7.1 What is equal, and what differs without a rule attached

On every kill rule this wave can evaluate, AC-1 and AC-2 read the same verb with numbers of the same
order (§3). What differs is real and measured, and **no K-rule attaches to any of it**:

| axis                        | AC-1 TAGLESS-TWIN                                                                     | AC-2 CLOSED-IR                                                                                             | rule?                                                                                       |
| --------------------------- | ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| contract fidelity (FF-3)    | 5 declared deviations, one acceptance-changing (§10.2 reorder; `linear(…)` reachable) | §10 verbatim but for encodings; the two inert §10.3 `CUT`s not encoded; `linear(…)` unreachable as shipped | none — FF-3/FF-5 route both to declared rows; neither rescued a gate                        |
| G-1 structural `cut∉alt`    | 7 (14 with dispatch roots)                                                            | 0                                                                                                          | none — the number measures the encoding of one contract defect (F-2; `.f` proved inertness) |
| EQ-5's sixth coordinate     | 0 in both (the contract's letter), real watermark on `arenaHighWater()` (304 B)       | a logical cell counter in both (declared redefinition), byte watermark beside                              | none — both EQ-5 = 0; the contract's own letter is unsatisfiable (F-3/F-f4)                 |
| numerics vs `Number()`      | correctly-rounded path, 0 mismatches / 520k tokens, flags undecidables                | exact path 0 ULP on corpus numerals; declared fallback worst 3 ULP on a pathological numeral               | none — EQ-1 is between the lowerings and is 0 for both; §4.1 admits the fallback            |
| Wasm artifact               | 187,341 B · 1,273 functions · exports `run setTheta highWater reset memory`           | 117,544 B · 618 functions · exports `memory` + 3 entries                                                   | none — G-9 GREEN both                                                                       |
| G-8 reject leg (instrument) | wasm 2.1 B/parse · js ≈ 0                                                             | wasm ≈ 0 · js 13.1 B/parse                                                                                 | none — F-4 class; mirror-image                                                              |
| K-9 proof strength          | audit reads _none_                                                                    | stripped-`PATH` child, different node, byte-identical                                                      | none — both NOT HIT                                                                         |
| library substrate           | published 1.0.0 dist via W1's `PARSE_THAT_DIST`                                       | published 1.0.0 dist by absolute path + digest, OP-7 cited                                                 | none — the same substrate; a graduation fact (§9 E-7)                                       |
| predicted-failure probes    | 3/3 NOT-OBSERVED (IC measured with `--log-ic`)                                        | 4/4 NOT-OBSERVED (+ a fifth, numerics)                                                                     | none                                                                                        |

The seat states, without ranking, that the only asymmetries above that are **not** encoding- or
instrument-dependent are the first, fourth and fifth rows. It does not turn any of them into a
survivor: _"a kill cites its rule + the measurement; taste kills nothing."_

### 7.2 The rule that would break the tie, and why it cannot run

**K-5** — _"strict Pareto domination by a rival on ALL printed bench legs — the only lawful bench
kill while the bar is owner-gated"_ — is the tie-breaker the spec built for exactly this shape. It
needs G-7's printed table: three legs + sheet, both lowerings, through **W1's honest bench** _"with
the W2 cells registered"_. Measured at this seat (§1 R-7): W1's bench has **no registration
surface** — its argv contract is `--rounds/--warmup/--out/--no-finalize` and `loadEngine` is a closed
chain that throws `unknown engine` for anything but its four named cells. Registering a W2 cell is a
write under `harness/bench/**` (R-E execute-no-write; §3a: _"an edit here is a §3a halt"_). No
phase-4 seat ran Stage 4 (`.d`: _"G-7 is W1's bench, not this unit's"_; `.e`: _"Stage 4 is W1's
bench"_; `.f`: silent), and the unit plan's parenthetical _"(G-7 recorded through W1's bench)"_
named no owner. **G-7 is RED at close for a structural reason, K-5 is unevaluable, and the tie is
therefore measured, not manufactured.**

---

## 8. Dissent preserved (the band's four preserved dissents are the standard)

- **D-1 — AC-3's kill.** The seat's view (VERDICT §A, `compile.mjs:5-14`): a Wasm re-implementation
  of the parse graph is NC-1 at one remove; the terminal/numeral/journal/rollback layer is _"the
  algebra's carrier"_ and two readers of one table are two lowerings. The harness agreed with it:
  G-2 printed **GREEN 22/22** for AC-3, accepting `wasm:mark+rollback/wCompileAlt` as a Wasm-row
  symbol. And §3c says the leaf-wasm posture is _"recorded either way"_, which a reader may take as
  "not pre-killed". This ledger holds the opposite (§2.4) on K-3's letter and the hypothesis's
  words; the dissent stands beside it, with the note that the instrument gap it exposes is filed
  (§10 F-h1).
- **D-2 — the two survivors' opposite postures on §10.2.** One reader: AC-1 breached FF-3 (_"the
  slice is §10 verbatim"_) by applying a cure, however minimal and declared, and the graduated seed
  should carry the contract as ratified until the owner amends it. Another: AC-2 knowingly shipped a
  production one of its own four kinds cannot reach, and a seed that rejects `linear(…)` is a seed
  with a hole. Neither reading is a K-rule; both are recorded; the owner's addendum on §10.2 (§9
  E-4) dissolves the disagreement before either graduates.
- **D-3 — the K-6 one-in-four readings.** A strict-letter reader holds that 0.782× (AC-2) and
  0.744× (AC-1) are _"timing of parse N distinguishable from parse 1 beyond the printed envelope"_
  and each is one K-6 reading. This ledger reads both as tier-up on a shared box under an envelope
  narrower than the instrument's spread (§1 R-3); the readings are printed either way.
- **D-4 — G-8's reject leg.** The gate's letter — _"the reject path allocates zero in both
  lowerings"_ — is met by no candidate on any draw (AC-1 wasm 2.1, AC-2 js 13.1, AC-3 js 18.8 / wasm 17.2
  B/parse). A strict reader holds G-8 RED for all three; this ledger holds it RED for all three **and**
  names the instrument (F-4/F-e8/F-f3: ±10 B/parse draw-to-draw on the same subject). No K-rule
  attaches (K-6 is the latch class; allocation is G-8's own leg).
- **D-5 — the band's four dissents ride unchanged** as `ALGEBRA.md` §11's DM rows: juxtaposition
  width (DM-2, the token-stream reading held as a declared divergence row; the incumbent rejects all
  three rows), the non-finite posture (DM-3, interim binding at the constructor guard, the ninth
  code owner-owed), the try/catch shield (no shield exists in any lowering — the question is moot in
  fact and still the owner's in law), `Object.freeze` normativity (DM-1, measured as its own G-8 leg
  in every candidate). None was flipped by any seat (FF-7).

---

## 9. Escalations to the owner, Mike Babb, by name

Each is a ruling this seat may not make (E-3: the contract and the spec are immutable; corrections
are dated addenda-beside) or a decision the spec reserves to the owner. None blocks the ledger's
terminal verbs; E-1 blocks graduation.

| id      | what is owed                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | the seat's measured basis                                                            |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| **E-1** | **THE TIE.** AC-1 and AC-2 survive every evaluable kill rule identically; K-5 is unevaluable in bounds. The owner either **(a) names the survivor by word** — the ledger then closes on the owner's ruling, recorded as such, and `.i` opens on it (§11); or **(b) orders Stage 4** — a dated E-3 addendum admitting an external-cell registration to W1's `harness/bench/lib/engines.mjs` (or an `--engine=<adapter>` argv on `bench.ts`), the three legs + sheet run for both survivors' both lowerings, two runs pasted, then **K-5** applied by a later sitting; if K-5 reads mixed, back to (a). §7.1's table is the owner's input for (a); no ranking is offered.                                                                                                                                                                                                                    | §1 R-7 · §3 · §7                                                                     |
| **E-2** | **§3a FIRED: G-3 red on the SAME product for all three admitted candidates** — the contract is suspect, not the candidates. §10.1's `balanced-tail := … DROP keyword (SCAN any-but-paren 1 ∞)` writes `C` entries that §4.5's `π_keyword = /^[A-Za-z][A-Za-z0-9_-]*$/` cannot admit: **2,035 rows / 2,047 COMP-1c occurrences, identical in all six lowerings** (`.d` F-1, `.e` F-e6, `.f` F-f1; re-run here). Three cures measured by `.e` on an in-memory copy, **each driving the population to 0**: (1) a seventh kind `opaque` (K*C 6→7, `.g`'s serializer index shifts); (2) widen `π_keyword`; (3) re-kind that one `DROP` to `skipped` (relax §OP-13's exclusion). The owner (or a `.c`-successor under the owner's word) picks one by dated addendum-beside; until then G-3/G-4 stay honest-RED for every candidate and G-12's graduation half cannot read *"G-3 re-run green"\_. | `evidence/W2/h/ac{1,2,3}-g3-eq-six.txt` · `.e` §e.9 cure table                       |
| **E-3** | **F-2 — the `CUT` idiom.** §5.2 scopes `CUT` through `SEQ/CTOR/EXPECT/DROP` and not through `TRY/REP/RECOVER/REF`; `DISPATCH` is in neither list, and §10.1/§10.2's seven function heads put `CUT` directly under a `DISPATCH` arm; §10.3's two `CUT`s sit under `REP`/`RECOVER` and are **inert in fact** (`.f` p6: identical products over 30,527 rows with both removed). Addendum owed: either `DISPATCH` joins the pass-through list and the two inert `CUT`s are struck, or OP-09 admits a one-arm scope. The structural walk's number (7/0/2) measures encodings until then.                                                                                                                                                                                                                                                                                                        | `.d` F-2 · `.f` F-f2 · `evidence/W2/h/*-g1-structural.txt`                           |
| **E-4** | **F-7 — §10.2's `ALT` order** makes `linear(…)` unreachable under ordered committed choice (`KW ident timing-keyword` matches the ident run `linear`, succeeds, `END` fails on `(`). Reproduced by three seats and by this one on AC-2's shipped bytes. Addendum owed: the `DISPATCH` arm first (the minimal reorder; `.d` and `.e` both measured it changing exactly 3 slice rows REJECT → ok and nothing else).                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | `evidence/W2/h/linear-reachability.txt`                                              |
| **E-5** | **F-3 / F-f4 — EQ-5's sixth coordinate** is specified as _"the value-arena watermark; the JS lowering reports 0"_ (§2.2 L238, §6 EQ-5) while EQ-5 demands value equality per site across the lowerings — unsatisfiable by construction for any Wasm lowering with a real arena. Two lawful postures were taken (AC-1: 0 in both + `arenaHighWater()`; AC-2: a logical cell counter in both). Addendum owed: redefine the coordinate as the logical cell counter, or drop it from the cross-lowering tuple and print the watermark as a G-8 row.                                                                                                                                                                                                                                                                                                                                            | `.d` F-3 · `.e` F-e11 · `.f` F-f4                                                    |
| **E-6** | **G-7 has no registration surface** (§7.2). The gate as written cannot be turned in any wave without a write to W1's instruments. Addendum owed on W1's bounds (an owner act — §3a names W1's `harness/{totality,equivalence,bench}/**` as a halt). Until then G-7 reads RED-STRUCTURAL and K-5 is unevaluable; OC-1's _"bench table RECORDED-NOT-GATING"_ is unaffected — there is simply no table.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | `evidence/W2/h/g7-registration-surface.txt`                                          |
| **E-7** | **OP-7 × graduation.** Both survivors' JS lowerings import the published `@mkbabb/parse-that@1.0.0` dist at an absolute path inside value.js's prototype workspace `node_modules` (§1 R-6), citing OP-7 (_"may not ADOPT"_ the clone point's three unadjudicated `typescript/src/parse/**` commits). Mechanical promotion (§11) carries that path into `<p2>/typescript/src/css/**`. The owner rules whether W3 builds the 52 on `<p2>/typescript/src/parse/**` (adopting the clone-point edits, or reverting them to master `ef10d5b` first) or on the published 1.0.0 surface; the seed's one import specifier is re-pointed by W3's first act under that ruling, never by `.i`.                                                                                                                                                                                                         | `lowering-js/parse-that.mjs:12-22` (ac2) · `js-alg.mjs:25,36` (ac1) · W2.md §2b OP-7 |
| **E-8** | **F-8 (INFO).** §10.3's `value-slice := CTOR value-color [REF color-body]` against §8 D-3's "exactly two `REF` sites" — both cannot hold. Addendum owed: inline `color-body` in the letter (what AC-1 did) or count three sites.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | `.d` F-8                                                                             |

---

## 10. Findings for the orchestrator, the instruments and the L-18 quartets

| id       | severity | finding                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | owner                          |
| -------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| **F-h1** | MAJOR    | **G-2 accepts a JavaScript symbol as a Wasm-row lowering.** `op-bijection.mjs --candidate ac3` printed GREEN 22/22 with symbols like `wasm:mark+rollback/wCompileAlt` — an honest label for a row realized in JS. The pairing check compares registries, as G-2 must; it does not ask _where the symbol executes_. K-3's letter needed the measurement in §2.4, which the harness does not take. L-18 exposure (ii)/(v) territory: a bijection that cannot distinguish "lowered to Wasm" from "named for Wasm". | `.g` / L-18 quartets           |
| **F-h2** | MINOR    | `eq-six.mjs`'s verdict line reads _"RED — 2035 divergences between the two lowerings (K-1)"_ for EQ-6, which is COMP-1 on each lowering separately and fails **identically** in both (30,527/30,527 failure lists equal, `.d`). The summary mislabels a contract defect as a K-1 divergence; the product rows above it are correct.                                                                                                                                                                             | `.g`                           |
| **F-h3** | MAJOR    | **G-8's printed envelope (0.80–1.25) is narrower than the instrument's draw-to-draw spread on this box**: AC-2 wasm 0.782–0.917×, AC-1 wasm 0.744–0.931× over four draws each, all faster-later; and the reject leg's exact-zero threshold sits inside a ±10 B/parse band (F-4/F-e8/F-f3, reproduced). Both legs print one draw and red it. The instrument's resolution is the finding; no candidate was re-run for a greener number by any seat, this one included.                                            | `.g` / L-18 quartets           |
| **F-h4** | MINOR    | G-8's "reset residue" leg runs on a **no-op** `reset` (AC-2 js) and prints 0.57–0.68× — two consecutive small windows, the first cold. The leg should skip a lowering whose adapter declares no state, or print the no-op.                                                                                                                                                                                                                                                                                      | `.g`                           |
| **F-h5** | INFO     | The unit plan's G-7 parenthetical _"(G-7 recorded through W1's bench)"_ named no owner; three seats read it as "not mine". Beneath it, W1's bench had no surface for the cells anyway (E-6). Stage 4 is unrun for a structural reason, not a seat's omission.                                                                                                                                                                                                                                                   | orchestrator                   |
| **F-h6** | INFO     | The phase-1 commit (`docs(x-p/w2): blind algebra drafts — Fable and Opus arms`) had still not landed at this seat's open: ⟨`git status --porcelain -- docs/tranches/X/parse-that/algebra/`⟩ → both drafts `??`. R-c1 stands; the lineage is pinned by the digests `ALGEBRA.md` quotes (`c185e15e…98509`, `29b24b40…b9830`). This seat did not commit them (outside its set).                                                                                                                                    | orchestrator                   |
| **F-h7** | INFO     | The `§Selected` append lands in the docs home only (this seat's bound); `<p2>/experiments/w2/contract/ALGEBRA.md` is **not** in this unit's writable set, so **G-1's sha256-equality is broken by this unit's own lawful act** until the orchestrator re-lands the `<p2>` copy byte-equal (R-c6). The digest of the appended docs file is in this seat's receipts; the `cp` is one command.                                                                                                                     | orchestrator (a `<p2>` commit) |
| **F-h8** | INFO     | The scan union on `w2/ac3-scan-union` (`76033aac`, `typescript/src/parse/scan.ts` + three append-only exports; library `tsc`/`vitest` unchanged from the measured base) is a §3 item-12 deliverable independent of AC-3's death. W3's open should decide whether to consume it.                                                                                                                                                                                                                                 | W3's open seat                 |

---

## 11. The graduation ruling for `.i` (`W2.md` §5 `.i`; G-12's graduation half)

**Ruling.** `.i` opens **only on the owner's E-1 word**, and then executes mechanically — _"copy the
surviving candidate's slice realization (no redesign, no 'improvements in passing')"_ — for whichever
of AC-1 / AC-2 the owner names:

1. **Source of the promotion** — the named candidate's directory at its worktree HEAD: AC-1 →
   `<p2>/.worktrees/ac1/experiments/w2/ac1-tagless/**` at `af40fb2d`; AC-2 →
   `<p2>/.worktrees/ac2/experiments/w2/ac2-closed-ir/**` at `a7ac4ea4`. The promoted set is
   `algebra/**` + `lowering-js/**` + `lowering-wasm/**` + `build.mjs` + `harness-adapter.mjs` + the
   built artifact and its `.d.ts` (`build/` or `artifacts/` + `types/`); the seat's `probes/**`,
   `dev/**` and `VERDICT.md` stay in the candidate directory (they are not `meta.sources`).
2. **Destination** — `<p2>/typescript/src/css/**`, on the candidate's own branch merged to the
   root's working branch after this ledger commits (§9's _"merged … only after phase 5"_). The diff
   between the candidate directory and the graduated tree is the check (G-12 falsifier); the only
   permitted byte changes are relative-import path adjustments the move itself forces, listed in
   `.i`'s receipt one by one.
3. **Substrate is carried, not re-pointed** — the import of the published 1.0.0 dist stays exactly
   as the candidate declared it (E-7 is the owner's; `.i` may not resolve an OP-7 mark).
4. **Re-run at the graduated location** — `node harness/w2/op-bijection.mjs --candidate survivor
--at typescript/src/css`, then G-3, G-5, G-9, G-10 with `--at`; `npx tsc --noEmit` in the fresh
   root; ⟨`git -C <p2> status --porcelain`⟩ shows only the graduated paths before the closing commit.
5. **What GREEN can and cannot mean there** — G-2, G-5, G-9, G-10 are expected GREEN by mechanical
   promotion. **G-3 will read EQ-6 = 2,035 (E-2) at the graduated location until the contract
   addendum lands**; `.i` records it honest-RED with E-2's id and does not touch the grammar. G-12's
   graduation half therefore stamps **GREEN-WITH-RESIDUALS (E-2)** at best, and the wave closes
   IMPLEMENTED-with-carried-REDs (G-3, G-4, G-7, G-8) — never GREEN-by-assertion (§0l E-2's shape).
6. **If the owner elects E-1(b) instead**, `.i` waits for K-5; the RESERVE rule (FF-6) is not in play
   (RESERVE = NONE).

---

## 12. G-12, ledger half — self-check at the settled bytes

| clause (G-12 / §5 `.h` sub-gate)                                                     | reading                                                                                                                           |
| ------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| `W2-KILL-LEDGER.md` exists                                                           | this file                                                                                                                         |
| every named candidate AC-1..AC-4 ends with exactly one terminal verb                 | AC-1 SURVIVES-TO-W3 · AC-2 SURVIVES-TO-W3 · AC-3 KILLED(K-3) · AC-4 KILLED(K-2) — §0, §2                                          |
| each kill cites the rule + the measurement + the falsifier hit                       | §2.1, §2.4                                                                                                                        |
| ≥ 3 candidates carried to a terminal verdict                                         | 4 of 4                                                                                                                            |
| exactly one survivor, OR a measured tie / empty field escalated to the owner by name | measured tie, escalated to the owner, Mike Babb — §9 E-1, with the rule that would break it named and its blocker measured (§7.2) |
| NC-0 / NC-1 restated with citations                                                  | §6                                                                                                                                |
| every §3c predicted failure mode dispositioned CONFIRMED / NOT-OBSERVED              | 14 of 14 — §4                                                                                                                     |
| the stated prior scored                                                              | 6 clauses — §5                                                                                                                    |
| dissent preserved explicitly                                                         | D-1..D-5 — §8                                                                                                                     |
| PEER-REVIEW-PENDING is not terminal; taste kills nothing                             | no such verb appears; every kill is K-n + number                                                                                  |
| the graduation ruling issued for `.i`                                                | §11 (conditional on E-1 by the spec's own tie clause)                                                                             |

**Ledger half: GREEN.** Graduation half: **RED, correctly** — `<p2>/typescript/src/css/` ABSENT,
`.i` gated on E-1.

---

## 13. Substrate receipt for every number in this file

⟨`node harness/w2/substrate-receipt.mjs --candidate ac2`⟩ (and ac1, ac3; `evidence/W2/h/*-substrate-receipt.txt`):
`<p2>` worktrees `ac1` `af40fb2db64726745c0ee9c593845448bb65a18a` (`w2/ac1`) · `ac2`
`a7ac4ea43d08ac609e6e0ec3e2c0551beb1a9959` (`w2/ac2`) · `ac3` `f93495602ee17e50b2ff97ab86bed32b28dc9966`
(`w2/ac3-scan-union`), root `81370815` (`w2/harness`), base `f5757082`, every worktree porcelain
**0** · node **v26.0.0** / v8 14.6.202.33-node.19 · darwin arm64 · third cell
`@mkbabb/value.js@4.0.0` `/css` sha256 `8b5381305ea26236326f06a38559247b2089a5be7fa78abe43640d0556320c42`
== pinned, dist never the working tree · committed `wasm32` in the evidence root **0** (OP-6 holds)
· ratio denominator **1,636,680 µs** (OP-5) · **bar: OWNER-GATED-PENDING-RATIFICATION** — no bench
table exists in this wave (§7.2) and no speed sentence in this file stands outside a candidate's
printed table cited by section. Numbers taken from sibling receipts are cited to the receipt
(`X-P-W2.md` §d/§e/§f/§g, the three `VERDICT.md`s, `ADMISSION.md`); numbers this seat measured are
cited to `evidence/W2/h/**`, each double-run.

_Adjudicated 2026-09-17 by `X.P.W2.h` (served model `claude-fable-5-1`), the third Fable sitting of
`W2.md` §5. Read-only against every tree; `<p2>` unwritten; `/Users/mkbabb/Programming/parse-that`,
`~/.codex`, `~/Documents/Codex`, every frozen root, glass-ui, value.js `src/**`, W1's instruments,
`.g`'s harness and corpora, the contract's ratified text and the two sealed author arms untouched._
