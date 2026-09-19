SERVED MODEL: claude-opus-5[1m]

# X.P.W4 — CLOSE REPORT: the X·P sub-tranche release close

**Authority**: `docs/tranches/X/parse-that/waves/W4.md` §4 (`waves/W4-CLOSE.md` — create), §5
`X.P.W4.d`, §6 **G-9** and **G-10**, §8. Sub-tranche X·P; tranche X authority
`docs/tranches/X/COHESION.md`. Written at the **X.P.W4 REPAIR 2** seat, 2026-09-19, sitting of record
2026-09-17 (the owner's begin-word, COHESION §0j).

**VERDICT: PARTIAL — CLOSED-HONEST-RED ON `{G-3 · G-10}`, WITH THE R-A STAMP WITHHELD.**
**8 of 10 gates GREEN · 2 RED, both relieved and both owner-named.** No four-verb line moves, in any
of the five X·P wave files. `W4.md` is byte-untouched.

---

## 0. Seat disclosure — read this before any other line

`W4.md` §5 assigns this file, `RELEASE-PACKET.md`, the four sibling waves' `VERIFIED` rows,
`INBOX.md`, two `COHESION.md` cells and the L-13 harvest to **`X.P.W4.d`, a fresh Fable adjudicator**
(M-23 §1): _"the sub-tranche release close is an adjudication act, it is the only site that stamps
VERIFIED, and the adjudicator must be fresh — a seat that authored a gate cannot certify it."_

**`.d` has never been dispatched.** Three conformance rounds have now recorded that fact
(`## Close`, `## Check 1`, `## Check 2` of `docs/tranches/X/execution/D/X-P-W4.md`), and `W4.md`
routes `.d`'s work to no successor wave. This report is written by the **round-2 repair seat**,
`claude-opus-5[1m]`. That seat is **fresh to this wave** — it authored no gate, no unit receipt, no
close and no check — but it is **not a Fable adjudicator**. The split it therefore observes, and
which every later reader may check line by line:

| `.d` act                                                                       | performed here?   | why                                                                                                                                                                             |
| ------------------------------------------------------------------------------ | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `W4-CLOSE.md` — the ten gates, the terminal state table, the G-9 **recording** | **YES**           | transcription and measurement. §6 G-9's gate is the **recorded state**, _"never in silence"_; the ruling itself is pre-made (§0i.1) and is quoted by id below, never re-decided |
| `RELEASE-PACKET.md` + its INBOX row + the SS-6 hand-off                        | **YES**           | §6 G-8 keeps the cure arm _inside this wave's bounds_; the packet is assembly of banked measurements and a courier hand-off, not an adjudication                                |
| the **L-13 harvest** (`registry/harvest/x-p-w4.json`)                          | **YES**           | lane law, mechanical; M-23 §2 routes mechanical sweeps to Opus, and `W4.md` §3 item 10 calls its omission _"a recorded kill … not a housekeeping lapse"_                        |
| ruling the **45 `PENDING-ADJUDICATION`** seam cells                            | **NO — WITHHELD** | COHESION §0v routes them to _"`.d`'s fresh adjudicator"_. An Opus seat ruling them is precisely the defect M-23 §1 exists to prevent                                            |
| the **R-A stamp** (X.P.W0..W4 IMPLEMENTED → VERIFIED)                          | **NO — WITHHELD** | §6 G-10's own falsifier: _"A stamp performed while any of G-1..G-9 is red fails."_ **G-3 is RED.** Independently halted by `F-w4c-1` (the open-state sum reads 7, not 5)        |
| the two `COHESION.md` carves (§1 SS-5 status cell, §5 status board line)       | **NO — WITHHELD** | those two cells are the _close-stamp's_ cells. Carving them while the stamp is withheld would assert a close that did not happen. Recorded as a residual, not performed         |

**Nothing in this report certifies anything.** It records measurements and quotes rulings. The one
act reserved to a fresh Fable adjudicator — moving a verb — is not performed, and the reason is the
spec's own sentence, not this seat's preference.

---

## 1. Crash-recovery (standing law, first act)

⟨cmd⟩ `git -C /Users/mkbabb/Programming/value.js status --porcelain` at this seat's open → **2 rows**:
`M docs/tranches/V/reformation/CARRY-LEDGER.md` (a sibling's / the owner's) · `M scripts/dev/dev.sh`
(**unowned, NEVER touched, never staged**).
⟨cmd⟩ `git status --porcelain -- docs/tranches/X/parse-that/ docs/tranches/X/execution/D/X-P-W4.md
docs/tranches/X/execution/LEDGER.md docs/tranches/V/coordination/INBOX.md docs/tranches/X/COHESION.md
docs/tranches/V/megatranche/registry/` → **no output**.
⟨cmd⟩ `git -C <p2> status --porcelain` → `?? .worktrees/` alone.
⟨cmd⟩ `git -C /Users/mkbabb/Programming/parse-that status --porcelain` → **31 rows** under `rust/**`
in the **frozen read-only** root — none of it this wave's; that root is `W4.md` §4 Do-NOT-touch and
not one byte of it was read into a write, stashed or restored.

**Zero dirty paths inside this seat's writable set · zero inherited hunks · no killed predecessor's
partial work to finish, rewrite or name.** Nothing was stashed; nothing was reset; no sibling's dirty
path was touched.

---

## 2. The ten gates — RED-before (§6's own baselines, 2026-08-03) / state-after (this seat's commands)

Every "after" reading below was produced by a command this seat ran itself against the settled bytes.

| gate                                                   | §6's RED-before baseline                                                                                                              | this seat's command and output                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | after                                                                |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| **G-1** SEAM CONTRACT COMPLETE 52/52                   | _"`SEAM-CONTRACT.md` does not exist — **0 of 52 rows**"_                                                                              | ⟨cmd⟩ the spec's literal `seam-contract-check.mjs` over `SEAM-CONTRACT.md` ⊕ `evidence/W3/universe-52.json` ⊕ `DIVERGENCE-LEDGER.md` → `contract ∖ universe-52 : ∅` · `universe-52 ∖ contract : ∅` · `PENDING-ADJUDICATION 45 · identical 7` · _"VERDICT: GREEN — both set-differences ∅, no disposition contradicts the ledger, every carried cell publishes PENDING-ADJUDICATION, no field is blank"_, **EXIT=0**                                                                                           | **GREEN**                                                            |
| **G-2** ZERO VALUE.JS SOURCE BYTES                     | _"the property is **unasserted** — no wave in X·P has ever run the check"_                                                            | **LEG 1** (§6's tree-wide literal) ⟨cmd⟩ `git status --porcelain -- src api demo test e2e \| wc -l` → **0**, double-run `0 ≡ 0`. **LEG 2** (§9's per-commit, the leg X·P controls) ⟨cmd⟩ `git show --name-only --format= <sha> \| grep -cE '^(src\|demo\|api\|test\|e2e)/'` over **every** value.js commit of this wave → `0` at each                                                                                                                                                                         | **GREEN**                                                            |
| **G-3** PACKED CANDIDATE, PROVEN FROM THE TARBALL      | _"no candidate package exists — the fresh root itself is ABSENT by design"_                                                           | ⟨cmd⟩ `node scripts/packed-candidate-surface.mjs --seam …/SEAM-CONTRACT.md` → `candidate "@mkbabb/parse-that@1.0.0"` · `tarballSha256 efc11936d361820526a93ada2145012d0c58cec48cee9ccb9a19c22c66e74cda` (**byte-identical to `.b`'s bank, to Check 1's, Repair 1's and Check 2's**) · `entryCount 1` · `seamSubpathDeclared false` · **`resolved "0 of 52"`** · `refusals 5` · `"G3": "RED"`, **EXIT=1**                                                                                                      | **RED — honest, relieved, owner-named (`F-w4b-3`)**                  |
| **G-4** WASM ZERO-FUNCTION-IMPORT ADMISSION            | _"**no project Wasm artifact exists** … zero project artifacts"_                                                                      | ⟨cmd⟩ `node scripts/wasm-admission.mjs <9 project artefacts>` → `tally {artifacts 9 · admitted 9 · functionKindImportsTotal 0 · unaccountedImportsTotal 0}` · `"verdict": "GREEN"`, **EXIT=0**                                                                                                                                                                                                                                                                                                                | **GREEN**                                                            |
| **G-5** RC-P EVALUATOR EXISTS AND REPORTS HONESTLY     | _"the evaluator does not exist, and **all six conjuncts are FALSE**"_                                                                 | ⟨cmd⟩ `node scripts/rc-p-evaluate.mjs --version <V>` prints the **six-row table of §6a** and **exits 1 naming which conjuncts are FALSE**. Falsifiers demonstrated, not asserted: no-`--version` → refuses **EXIT=2**; a non-existent coordinate → conjuncts 1·2·4 print `MEASURED NO / VALUE FALSE`, TRUE on none                                                                                                                                                                                            | **GREEN**                                                            |
| **G-6** RECIPROCITY, BOTH ENDS                         | _"**neither sub-tranche's wave directory exists**"_                                                                                   | ⟨cmd⟩ `grep -rn 'RC-P' docs/tranches/X/{keyframes,fourier}/waves/ \| wc -l` → **25** over **5** files, so the stated falsifier (_"fewer than two hits"_) does not fire. ⟨cmd⟩ `sed -n '9p' KF-W3.md` and `sed -n '459p' F-W0.md` → both far-end sentences **verbatim, by predicate name, no wave number**. Leg 3 ⟨cmd⟩ `grep -rn 'SEAM-CONTRACT' docs/tranches/X/waves/` → **0** — **absent, and routed onward by §6 G-6's own baseline**: _"the third sentence has no file to live in at all — that is G-9"_ | **GREEN on its stated falsifier; 2 of 3 sentences exist, disclosed** |
| **G-7** FORBIDDEN EDGE HELD AT ZERO (floor)            | GREEN baseline **0 / 0**                                                                                                              | ⟨cmd⟩ `grep -c 'parse-that' ../fourier-analysis/package.json` → **0**; over `web/package.json` → **0**; double-run `0 ≡ 0` both. The transitive copies were **not** touched                                                                                                                                                                                                                                                                                                                                   | **GREEN — floor held**                                               |
| **G-8** MAIL CLOSED, PACKET HAS A LAWFUL DELIVERY PATH | _"`ls …/RELEASE-PACKET.md` → No such file or directory … X·P has no mail row of any kind"_                                            | ⟨cmd⟩ `ls docs/tranches/X/parse-that/RELEASE-PACKET.md` → **present**. ⟨cmd⟩ `grep -n 'RELEASE-PACKET\|RC-P\|SS-6' INBOX.md` → the dated sent-row **O-40**, 2026-09-19, naming **that in-repo path** as the delivery point **and** the **SS-6** batch that carries it cross-repo. ⟨cmd⟩ the by-position UNREAD scan → **0** over **80** register rows, double-run `0 ≡ 0`. **No byte was written under `keyframes.js/**`, `fourier-analysis/**`or`glass-ui/**`; no channel of this wave's own was opened\*\*  | **GREEN**                                                            |
| **G-9** THE ADOPTION GAP HAS A TERMINAL DISPOSITION    | _"**no X·V wave adopts a parser** … none of X-W0..X-W11 holds the adoption"_                                                          | the disposition is **recorded** in §4 below — **(C)**, quoted by id from COHESION **§0i.1**, with its exact condition and re-trigger command. The wave does **not** end in silence, and **no X·V wave was authored** by X·P: ⟨cmd⟩ `git show --name-only --format=` over every commit of this wave → **0 paths** under `docs/tranches/X/waves/`                                                                                                                                                               | **GREEN — recorded, not decided here**                               |
| **G-10** THE R-A STAMP ACT                             | _"all five X·P waves read `Status: planned`, `IMPLEMENTED: NO`, `VERIFIED: NO` — 0 of 5 stamped"_; the open-state sum must read **5** | ⟨cmd⟩ `cat waves/W0.md W1.md W2.md W3.md W4.md \| grep -c 'VERIFIED \| \*\*NO\*\*'` → **7**, double-run `7 ≡ 7`; per file `W0:1 · W1:1 · W2:1 · **W3:3** · W4:1`. Close-state must read **0**. The self-stamp leg is clean: ⟨cmd⟩ `grep -rn 'VERIFIED' W[0-3]-CLOSE.md` → **10** lines, **every one disclaiming the stamp**. **The act is WITHHELD** — see §5                                                                                                                                                 | **RED — honest, relieved, owner-named (`F-w4c-1` ⊕ `F-w4b-3`)**      |

**GREEN: G-1 · G-2 · G-4 · G-5 · G-6 · G-7 · G-8 · G-9. RED: G-3 · G-10.**
**8 of 10 — and the two REDs are exactly the two that Check 2's honest-RED adjudication certified as
relieved at the spec's own bytes.**

### 2.1 Why the two REDs are honest and not hidden

- **G-3.** All three causes live at `<p2>/typescript/package.json` and `<p2>/typescript/src/css/**`
  — **C1** `files:["./dist"]` with no `./css` in `exports`; **C2** `tsx/esm/api` undeclared; **C3**
  `build/ac1.d.ts` re-exporting through a specifier that escapes the package root. `W4.md` §4 grants
  this wave **exactly three** creatable `<p2>` paths (the three `scripts/*.mjs`) and all three causes
  lie outside them. `.b`'s **positive control** — a staged tree outside both repositories with
  `"./css"` declared and `src/css` shipped — still resolved **0 of 52**, which is how C2 and C3 were
  located rather than guessed. `W4.md` §3a names this shape verbatim: _"Hard-gate failure that is not
  local-edit-recoverable … that is an X.P.W2 architecture question, not a link-flag tweak."_ A
  consumer-side patch would itself be the bounds violation. **Owner: `F-w4b-3`.**
- **G-10.** Forbidden by the spec's own falsifier, transitively through G-3, and independently
  blocked on an open-state sum of **7**. The 7 is not a defect of any seat's writing: `W3.md`
  carries the matching row at `:44` (its §2 table) **and** in its sixth and seventh **dated addenda**
  (`:836`, `:971`), both **E-3-lawful and unrewritable**. Both admissible cures are themselves dated
  addenda to E-3 files, i.e. triumvirate acts. **Owner: `F-w4c-1`.**

---

## 3. §8 Verification artefacts — the twelve rows, re-counted at this seat

| #   | artefact                                                   | state                                                                                                                                                              |
| --- | ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | `SEAM-CONTRACT.md`                                         | **PRESENT** — 121,820 B                                                                                                                                            |
| 2   | `RELEASE-CONDITION.md`                                     | **PRESENT** — 26,049 B                                                                                                                                             |
| 3   | `evidence/W4/packed-surface.json`                          | **PRESENT** — 128,861 B                                                                                                                                            |
| 4   | `evidence/W4/wasm-imports.json`                            | **PRESENT** — 9,392 B                                                                                                                                              |
| 5   | `evidence/W4/rc-p-evaluation.json`                         | **PRESENT** — 33,938 B (`.c`'s bank, at open; untouched — E-3)                                                                                                     |
| 5a  | `evidence/W4/rc-p-evaluation-after-packet-2026-09-19.json` | **PRESENT** — this seat's dated re-run **beside** `.c`'s, never over it                                                                                            |
| 6   | `evidence/W4/value-source-untouched.txt`                   | **PRESENT** — 3,312 B (`.a`'s bank; **not rewritten**)                                                                                                             |
| 7   | `evidence/W4/reciprocity-grep.txt`                         | **PRESENT** — 3,951 B                                                                                                                                              |
| 8   | `waves/W4-CLOSE.md`                                        | **PRESENT** — this file                                                                                                                                            |
| 9   | `RELEASE-PACKET.md`                                        | **PRESENT**                                                                                                                                                        |
| 10  | the INBOX sent-row for that packet                         | **PRESENT** — **O-40**, 2026-09-19                                                                                                                                 |
| 11  | `registry/harvest/x-p-w4.json`                             | **PRESENT** — §6 below                                                                                                                                             |
| 12  | commit hashes for each phase in both roots                 | **PARTIAL** — phases 1 and 2 have commits in both roots; **phase 3 (`.d`) has none, because `.d` never sat**; this report's commit stands in its place and says so |

**11 PRESENT · 1 PARTIAL · 0 ABSENT** (was 7 · 1 · 4 at Check 2).

---

## 4. G-9 — the adoption gap's terminal disposition, RECORDED

**The disposition is pre-ruled and is quoted here by id. This report does not re-decide it and did
not author any X·V wave.**

> **COHESION.md §0i.1 · S-4 — the L1/L5 parser-adoption leg: DISPOSITION C** (BLOCKED-ON, with A
> named as the re-trigger's payload)
>
> **Ruled: C.** The row closes `BLOCKED-ON` + re-trigger, in G-9's own idiom, and RC-P stays FALSE
> meanwhile. **Exact condition:** the parser proof gate
> (`docs/tranches/V/apotheosis/parser-proof/GATE-VERDICT.md`, COMPOSITE 🔴 RED of distance,
> 2026-07-20 — R1 = the live `parseCssColor("oklch()")` crash) reads GREEN via mini-tranche V·π
> Phase A closing. **Re-trigger command:** X.P.W4's RC-P evaluator returning TRUE at a dated run.
> **What fires then: disposition A** — the owner authorizes a successor X·V wave consuming
> `SEAM-CONTRACT.md` at `src/css/**`; its authoring seat and boundary are named at that sitting, not
> here. … OP-4's bar holds: **no wave is authored by this ruling**; X·P still does not get to author
> an X·V wave.

**The re-trigger, evaluated at this close.** ⟨cmd⟩ `node scripts/rc-p-evaluate.mjs --version <V>`
against the only coordinate published to date → **`RC-P` = FALSE**, `trueCount 3`, `falseConjuncts
[1, 3, 4]`, **EXIT=1**. **The re-trigger does NOT fire.** The row therefore stands:

> **BLOCKED-ON** the parser proof gate reading GREEN via V·π Phase A **+ re-trigger** = `node
<p2>/typescript/scripts/rc-p-evaluate.mjs --version <V>` returning EXIT=0 at a dated run.

**G-9's falsifier, checked:** _"closing with the gap unstated, or with X·P having authored an X·V
wave to fill it, fails."_ The gap is stated above, with its id, its exact condition and its
re-trigger command. ⟨cmd⟩ `git show --name-only --format=` over every commit of this wave →
**0 paths** under `docs/tranches/X/waves/`. Neither half of the falsifier fires.

**The third reciprocity sentence (G-6 leg 3) rides this disposition**, exactly as §6 G-6's own
baseline says: it has no file to live in until disposition **(A)** fires.

---

## 5. The X·P terminal state table, and the R-A stamp — WITHHELD

### 5.1 The five waves, as their own bytes read at this close

| wave       | `Status` | AUDITED | SPECIFIED | IMPLEMENTED                                                                                                                                                              | VERIFIED | ledger row                                                    |
| ---------- | -------- | ------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- | ------------------------------------------------------------- |
| **X.P.W0** | planned  | YES     | YES       | **NO** (row unmoved in `W0.md` §2)                                                                                                                                       | **NO**   | `CLOSED 2026-09-17` — 8 of 8 gates RED→GREEN                  |
| **X.P.W1** | planned  | YES     | YES       | **NO** (row unmoved in `W1.md` §2)                                                                                                                                       | **NO**   | `CLOSED 2026-09-17` (honest-RED: G-8 · G-2 literal form)      |
| **X.P.W2** | planned  | YES     | YES       | **NO** (row unmoved in `W2.md` §2)                                                                                                                                       | **NO**   | `CLOSED 2026-09-17` (honest-RED: G-1 · G-3 · G-4 · G-7 · G-8) |
| **X.P.W3** | planned  | YES     | YES       | **NO** (row unmoved in `W3.md` §2; the IMPLEMENTED-with-carried-REDs-by-id stamp is recorded in its **dated addenda**, `:836` / `:971`, which is why G-10's sum reads 7) | **NO**   | `CLOSED 2026-09-17`, promoted at CHECK 1                      |
| **X.P.W4** | planned  | YES     | YES       | **NO**                                                                                                                                                                   | **NO**   | `PARTIAL` → this close                                        |

**Not one of those ten verb cells was written by this seat.** ⟨cmd⟩ `git show --name-only --format=`
over every commit of this wave → **0 paths** under `docs/tranches/X/parse-that/waves/W[0-3].md`.

### 5.2 The stamp act — WITHHELD, and why that is the conforming act

`W4.md` §6 **G-10**'s falsifier, verbatim:

> **A stamp performed while any of G-1..G-9 is red fails** — the act is the _consequence_ of the
> gates, never a substitute for them. … **A sum other than 5 at open fails and halts the act.**

**G-3 is RED** (§2 above, measured at this seat, byte-identical to four prior seats' readings), and
**the open-state sum reads 7, not 5** (⟨cmd⟩ double-run `7 ≡ 7`). Both halves of the halt fire.
Performing the stamp would therefore be a _recorded failure of this wave_, not a close. **The stamp
is withheld, and this is the third consecutive sitting at which it has been withheld for the same
measured reason.**

What that costs, stated plainly so no reader has to infer it: **X·P ends IMPLEMENTED-incomplete and
UNVERIFIED.** The sub-tranche's release close has happened — the packet exists, its row exists, the
adoption gap is recorded, the harvest is filed — and the **verb** that would mark it has not moved,
because two gates say it may not. `ACCEPTED` is further still (L-18, §12): post-quartet, and not in
view.

---

## 6. The L-13 harvest (§3 item 10)

Run by the **COHESION §0p / F-e11 scratch-mirror procedure**, because the harvester's 143-file
spillage and wholesale `DEFECT-LEDGER.md` rewrite are a known MAJOR defect of the harvester itself
and the repo must not absorb them.

|                                 |                                                                                                                                                                                                                                                                      |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| harvester                       | `docs/tranches/V/megatranche/workflows/harvest-journals.mjs`, **UNMODIFIED** — sha256 `77a6e04c20674f1575891ac9f3daa8421491fc2ec98bd784dc61b4563c978a28`, `git status --porcelain -- workflows/` → **0 lines**                                                       |
| invocation                      | `node docs/tranches/V/megatranche/workflows/harvest-journals.mjs`, cwd = a scratch mirror whose copy of the script is a **SYMLINK** to the repo's own bytes                                                                                                          |
| runs                            | **3** — A and A′ wholly inside the mirror (⟨cmd⟩ `diff -r` between them → **no output**, byte-identical); **B** with `registry/DEFECT-LEDGER.md` a **SYMLINK to the repo's file**, so the ledger write is the **script's** act on the repo path, never a hand's copy |
| stdout (identical on all three) | `harvested 3227 agent results · 7813 defects`                                                                                                                                                                                                                        |
| K.7(i), measured again          | **153** harvest files written per run — **104 NEW** and **2 CHANGED** (`wf_247fe7fa-e67.json`, `wf_6f552e12-062.json`) against the repo's tracked set, every one outside this wave's §4 bounds. **Fourth firing**                                                    |
| `DEFECT-LEDGER.md`              | **7,585 → 7,813 defects**; 10,551,839 B → 10,560,195 B; sha256 `8092610b…` → `54fd8c71…`. **Written by the script, never by hand**                                                                                                                                   |
| filed                           | `docs/tranches/V/megatranche/registry/harvest/x-p-w4.json`                                                                                                                                                                                                           |

**Seat count, honestly.** `W4.md` §5's `.d` sub-gate requires _"the harvest JSON's seat count equals
the units dispatched (four)"_, with L-13's corollary that _"a seat harvested with zero journal rows
is RED, not green."_ Measured: **units planned 4 · unit-labelled seats dispatched 2** (`.a` DONE,
`.b` ESCALATED) · **`.c` folded into the `repair1` seat's row** (that row carries `.c`'s own commits
`541754c` ⊕ `76f4a921`) · **`.d` ABSENT — never dispatched.** **2 of 4 as labelled units, 3 of 4
counting `.c`'s fold — RED under L-13's letter**, and the reason is the same one this whole report
turns on. Every seat that _did_ return carries exactly one non-empty result row; **no returned seat
has zero rows**. This seat's own row is structurally absent from its own harvest (a harvesting seat
cannot appear in it), reproduced here for the fourth time in this lane.

---

## 7. L-14 — refutation attempted on the three central claims, before any of them was recorded

`W4.md` §5 obliges the close seat to _attempt refutation_ of three claims rather than accept them.
Each attempt below is a command this seat ran with the intent of making the claim fail.

**Claim 1 — "the seam is complete."** _Attempt_: run the checker's set-differences in **both**
directions and look for a 53rd row or a missing one; then look for a row whose disposition
contradicts `DIVERGENCE-LEDGER.md`; then look for a blank consumer-direction field on any row.
_Result_: `∅` / `∅`; no contradiction; **0 blank fields** over 52 rows. **The claim survives — but
only in the sense the checker measures.** It does **not** survive as _"a consumer can predict the
behaviour"_: **45 of 52** rows publish `PENDING-ADJUDICATION`, and §2a's first question is
consequently **NOT MET**. Complete ≠ settled, and this report does not let the checker's GREEN stand
in for the stronger claim.

**Claim 2 — "RC-P is unarguable."** _Attempt_: make the evaluator return TRUE dishonestly. Fed a
non-existent coordinate → conjuncts 1·2·4 print `MEASURED NO / VALUE FALSE`, **TRUE on none**,
EXIT=1. Run with no `--version` → refuses, EXIT=2. Grepped for a version literal in code → **2 hits,
both inside comment blocks quoting the spec; 0 in code**. Checked conjunct 4's direction: a
Wasm-free release reads **FALSE**, never vacuously TRUE. _Result_: **the claim survives.** Two open
questions are recorded rather than answered — `Q-RC-1` (conjunct 3's subject binding) and `Q-RC-2`
(conjunct 4's vacuity) — because `W4.md` §3a halts on _"any pressure to relax RC-P"_ and inventing an
answer is the mirror-image fault.

**Claim 3 — "no value.js byte moved."** _Attempt_: both legs, independently. Tree-wide ⟨cmd⟩
`git status --porcelain -- src api demo test e2e` → **0**, double-run `0 ≡ 0`. Per-commit ⟨cmd⟩
`git show --name-only --format= <sha> | grep -cE '^(src|demo|api|test|e2e)/'` over **every** value.js
commit of this wave → `0` at each. _Result_: **the claim survives at both legs.** Recorded beside it:
at Check 2's clock leg 1 read **3**, all of it **Track A / X·V's live uncommitted work** under paths
`W4.md` §4 lists Do-NOT-touch; Track A has since committed it, and leg 1 reads 0 again. **Leg 1 is
shared-tree volatile and leg 2 is the leg X·P controls** — a later seat reading 3 has not found a
falsified claim, it has found a sibling track mid-edit.

---

## 8. E13 — mail, at this seat's own clock

| path                                                | `*.md` at depth 1 | unrowed, addressed to value.js |
| --------------------------------------------------- | ----------------- | ------------------------------ |
| `docs/tranches/V/`                                  | 10                | 0                              |
| `docs/tranches/V/coordination/`                     | 24                | 0                              |
| `../glass-ui/docs/tranches/BK/coordination/`        | 9                 | 0                              |
| `../keyframes.js/docs/tranches/V/coordination/`     | 12                | 0                              |
| `../sci-report/atlas/docs/tranches/P/coordination/` | 28                | 0                              |

⟨cmd⟩ the by-position scan (never a bare `grep -i unread`) → **UNREAD 0**, double-run `0 ≡ 0`, over
**80** register rows. **This seat minted exactly one row — `O-40`, the packet's dated sent-row —**
and changed no other row's status cell. Register tail moves `I-35` / **`O-40`**.
**X·P closes with zero UNREAD.**

---

## 9. Escalations carried out of this close — named, owned, unsubstituted

1. **`E-r2-1` (HIGH, seat identity) — `X.P.W4.d`'s ADJUDICATIVE half is still owed.** A fresh Fable
   adjudicator must still (a) rule the **45 `PENDING-ADJUDICATION`** seam cells by the COHESION §0w
   id set, and (b) perform the **R-A stamp** once G-3 and the G-10 open-state sum permit it. This
   seat performed `.d`'s transcriptive half only and says so at every site it wrote.
   **Owner**: the orchestrator.
2. **`F-w4b-3` (HIGH, bounds) — unmoved.** G-3's three causes lie outside the three `<p2>` script
   paths §4 grants. Two admissible cures stated by Check 2: a dated §4 addendum-beside naming the
   four paths, or a successor X.P.W2 packaging unit. **Owner**: triumvirate / orchestrator.
3. **`F-w4c-1` (MEDIUM, instrument) — unmoved, re-measured 7.** Both admissible shapes are dated
   addenda to E-3 files; neither is a seat's act. **Owner**: triumvirate.
4. **`F-w4c-2` (MEDIUM, bounds) — unmoved.** `registry/harvest/x-p-w3.json` is in no §4 row of
   `W4.md`. **Distinct from W4's own harvest**, which is in bounds and is filed by this close.
5. **The two `COHESION.md` carves — NOT PERFORMED**, §0 above. §1 SS-5's status cell and §5's status
   board line are the close-stamp's cells; carving them under a withheld stamp would assert a close
   that did not happen. **Owner**: the orchestrator, at the sitting that seats a fresh Fable `.d`.
6. **`Q-RC-1` · `Q-RC-2` — open contract questions**, minted by `.c`, resolved by nobody, recorded in
   `RELEASE-CONDITION.md` §6. **Owner**: the owner.

Carried unchanged from the close's residual register: `U-d` · `F-w4a-1` · `SEAM-DRIFT` · `R-w4b-2` ·
`F-ae1 / F-p1` · the W3 rounds-6–8 id set.

---

## 10. §2a — the goal criterion, judged honestly

| question                               | answerable from one document?                                                                                                 | verdict                                                                                                                                                                                                                                |
| -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **what exactly does value.js receive** | `SEAM-CONTRACT.md` — 52 rows, signatures, providers, dispositions, consumer directions                                        | **NOT MET.** 45 of 52 rows publish `PENDING-ADJUDICATION`; a reader learns the _shape_ of what arrives and **cannot predict the behaviour** of 45 entries. The ruling is `.d`'s adjudicative half (`E-r2-1`)                           |
| **how does it arrive**                 | the packed-release protocol at `<p2>/typescript/scripts/packed-candidate-surface.mjs`, with `evidence/W4/packed-surface.json` | **MET as §2a defines it.** It answers **RED** — `entryCount 1`, `resolved 0 of 52` — with three measured causes. §2a fails only _"if any of the three is answerable only by reading a status word"_; this one is answered by a program |
| **when may the consumer act**          | `RELEASE-CONDITION.md` — a predicate, six conjuncts, six commands, an evaluator that exits non-zero                           | **MET.** A person cannot argue with it; the answer today is `RC-P` = FALSE                                                                                                                                                             |

**2 of 3 MET; the wave's goal criterion is NOT MET, on question 1, and only on question 1.**

---

## 11. Commits

| root     | message                                                                                                                                           | paths                                                                                                                                                                                                                                                                   |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| value.js | `docs(x-p-w4/close): X·P sub-tranche release close — the packet, its dated row, the G-9 disposition and the L-13 harvest; the R-A stamp WITHHELD` | `waves/W4-CLOSE.md` · `RELEASE-PACKET.md` · `evidence/W4/rc-p-evaluation-after-packet-2026-09-19.json` · `docs/tranches/V/coordination/INBOX.md` · `docs/tranches/V/megatranche/registry/harvest/x-p-w4.json` · `docs/tranches/V/megatranche/registry/DEFECT-LEDGER.md` |

`W4.md` §9 declares `.d`'s commit as **one** family and this close does not split it. The two
members of that family this seat did **not** perform — the four sibling waves' `VERIFIED` rows and
the two `COHESION.md` cells — are absent from the pathspec **because the acts were withheld**, not
because the family was split.

**Pathspec on the commit itself.** `scripts/dev/dev.sh` is unowned, was never touched and never
staged. **No commit of this wave contains a path under `src/**`, `demo/**`, `api/**`, `test/**`,
`e2e/**`, or any sibling repo\*\* — G-2 asserts it and §2 above measures it at every commit.
