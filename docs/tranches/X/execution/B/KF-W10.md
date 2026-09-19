SERVED MODEL: claude-opus-5[1m]

# X.KF.W10 — Fold Discharge and Close · EXECUTION RECORD (Track B · X·KF)

**Spec of record**: `docs/tranches/X/keyframes/waves/KF-W10.md` (673 lines / 263,074 B, read whole at this seat).
**Authority**: `docs/tranches/X/COHESION.md` §0i–§0s (read to file end) · `docs/tranches/X/EXECUTION-RUNBOOK.md` §1.2 · §3.4 · §5 · `execution/LEDGER.md`.
**Seat**: SEAT 0 (OPEN attempt), `claude-opus-5[1m]`, 2026-09-18 22:5x EDT. **Sitting date of record stays 2026-09-17** (the begin-word's).

> ## VERDICT OF THIS SITTING — **BLOCKED-ON OP-6**. NO §4 PATH WAS WRITTEN.
> §2a's hard precondition **OP-6 — *"COHESION names this wave's owner"*** is **RED at the bytes**, and its
> cure is **the root session's act, not this seat's** (§2a OP-6; §6.C-E; RULINGS **R-18**). Five of the six
> open preconditions measure GREEN or RULED; the sixth does not, and the spec declares it **hard**. This
> record banks the mail sweep, every precondition receipt, the seven born-RED gate baselines and the full
> unit plan, so the re-dispatch after the ruling is a single motion.

---

## Open

**Date**: 2026-09-18 (sitting 2026-09-17, the owner's begin-word, COHESION §0j).

### Crash-recovery sweep (STANDING LAW, first act)

⟨cmd⟩ `git status --porcelain` in both repos this seat may write:

- **value.js** — 13 rows. **Every one is outside this seat's writable set**: `demo/palettes/**` ×6 ·
  `demo/picker/controls/ComponentSliders/ConsoleRail.vue` · `demo/shell/dock/layers/SlugEditLayer.vue` ·
  `demo/palettes/browser/{dialog,search}/**` ×2 · `docs/tranches/V/reformation/CARRY-LEDGER.md` ·
  `scripts/dev/dev.sh` (**unowned, NEVER touched, never staged**) · untracked `docs/tranches/X/waves/evidence/W4/`
  and two `e2e/smoke/**a11y-control-targets.spec.ts`. **Nothing touched, nothing stashed.**
- **keyframes.js** — 2 rows, both untracked value-authored letters
  (`docs/tranches/V/coordination/VALUEJS-INBOUND-2026-07-{24,27}-*.md`), i.e. O-8/O-11's delivered bytes.
  Outside this seat's writable set; left in place.
- **Inherited work on KF.W10**: **NONE.** `docs/tranches/X/execution/B/KF-W10.md` did not exist before this
  write; `docs/tranches/X/keyframes/close/` does not exist; no partial unit commit exists in either repo
  (`git log --oneline | grep -i 'W10'` → no X·KF W10 rows in either tree).

### E13 Step-0 — the four-path mail sweep

Swept read-only at this seat's clock (⟨cmd⟩ `date` → `Fri Sep 18 22:54:20 EDT 2026`), classification taken
from **each row's own Status cell**, never from a bare `grep -i unread`; `INBOX.md` **self-excluded**
(SELF-COUNT law).

| # | path | newest member | rowed as |
|---|---|---|---|
| 1 | `docs/tranches/V/` + `docs/tranches/V/coordination/` | `parse-that-inbox-2026-09-18-value-4.1-evidence-addendum-2.md` and the four sibling `*-inbox-2026-09-18-value-4.1-*` letters | **O-34 · O-35 · O-36 · O-37 · O-38**, all rowed; `valuejs-outbound-2026-09-18-kfw7-bh-relay{,-ADDENDUM-A9}.md` = **O-28 / O-31** |
| 2 | `../glass-ui/docs/tranches/BK/coordination/` — **BK re-confirmed newest** ⟨cmd⟩ `ls -1dt ../glass-ui/docs/tranches/*/ \| head -5` → `BK/` · `BJ/` · `BI/` · `IOS27-MICRO/` · `BH/` | `glass-outbound-2026-09-18-valuejs-o26-reply.md` (Sep 18 17:18) | **I-35**, rowed 2026-09-18 |
| 3 | `../keyframes.js/docs/tranches/V/coordination/` | `VALUEJS-INBOUND-2026-09-17-o8-o11-amendment-addendum.md` | **O-21** (row `INBOX.md:104`) — ours, delivered |
| 4 | `../sci-report/atlas/docs/tranches/P/coordination/` | `valuejs-inbound-2026-07-27-library-band-export-delta.md` | **O-12** — ours; path UNMOVED |

**Delta command** ⟨cmd⟩ `find docs/tranches/V -maxdepth 2 -type f -name '*.md' -newermt "2026-09-18 21:24"` → 7
members, six of them the rowed O-34..O-38/O-31 letters plus `INBOX.md` (self) and `ARCHITECTURE.md` (not mail);
⟨cmd⟩ the same `-newermt "2026-09-18 00:00"` over paths 2–4 → the two already-rowed BK members and nothing else.

**Result: ZERO unrowed letters addressed to value.js. ZERO UNREAD status rows** — ⟨cmd⟩
`awk -F'|' '/^\| [IO]-[0-9]+ \|/ {print $NF}' INBOX.md | grep -ci 'UNREAD'` → **0** over ⟨cmd⟩
`grep -cE '^\| [IO]-[0-9]+ \|' INBOX.md` → **74** rows. No I-n minted; a dated sweep line is appended at
`INBOX.md`'s file end.

### Preconditions — §1 `Opens after` and §2a OP-1..OP-6, each measured at the bytes AND in the ledger

**§1 `Opens after` — MET.** Ledger rows, read immediately before this write: `KF.W0` **CLOSED 2026-09-17** ·
`KF.W1` **CLOSED 2026-09-17** (O-21 MINTED) · `KF.W2` **CLOSED** · `KF.W4` **CLOSED** · `KF.W5` **CLOSED** ·
`KF.W6` **CLOSED** · `KF.W7` **CLOSED** · `KF.W8` **CLOSED** · `KF.W9` **CLOSED 2026-09-17**. CLOSED ⊇
IMPLEMENTED, so the seven schedulable siblings' verb condition holds. **KF.W3 is carved out by name**
(§1's round-2 carve-out): its precondition here is bounds-FINAL + gate-state, never its verb — `KF-W3.md`
present, 190,569 B, bounds block present, status GATE-KEYED in the ledger. ✔

| OP | verdict | receipt (this seat's clock, double-run where a figure is published) |
|---|---|---|
| **OP-1** — kf write authority named (**hard**) | **GREEN — RULED** | COHESION **§0j** *"What it also grants … (i) publish, push, pull authority … which discharges **OP-1**"*, and **§0j.C KF-WRITE**: *"after §B-12, the sacred checkout on `master` (= `origin/master`) is the **execution substrate for KF.W2 · W4 · W5 · W6 · W7 · W8 · W9 · W10**, every wave pushing `origin HEAD` at close … Under whose hand: the value.js orchestrator under the owner's 2026-09-17 grant."* |
| **OP-2** — KF.W0 §B-12 has acted (**hard**) | **GREEN — MEASURED** | ⟨cmd⟩ in `/Users/mkbabb/Programming/keyframes.js`: branch **`master`** · `HEAD` **`69095552`** · `origin/master` **`69095552`** · `git rev-list --left-right --count HEAD...origin/master` → **0 0** · `git status --porcelain \| wc -l` → **2** (both untracked value letters). Snapshot ref present: ⟨cmd⟩ `git branch --list 'kf-sacred-snapshot*'` → **`kf-sacred-snapshot-2026-09-17`**. The authoring-time reading (1 ahead / 41 behind / 252 dirty) is **superseded**; the schism is closed. §0m.0's dated finding against the reset's untracked class is **recorded, not re-opened**. |
| **OP-3** — O-21 exec-visible | **GREEN — MEASURED** | Ledger row `INBOX.md:104` — **`O-21 · 2026-09-17 · keyframes (V, exec clone)`**, path `keyframes-v-exec/docs/tranches/V/coordination/VALUEJS-INBOUND-2026-09-17-o8-o11-amendment-addendum.md`, *"THE O-8/O-11 AMENDMENT-ADDENDUM (X.KF.W1, the mail cure I-26 owed)"*. Exec-visibility re-proven at the **frontier**, not only at the clone: ⟨cmd⟩ `git cat-file -e origin/master:docs/tranches/V/coordination/VALUEJS-INBOUND-2026-09-17-o8-o11-amendment-addendum.md` → **present**. The spec's *"UNLANDED · ledger maximum still O-20"* reading is superseded by KF.W1's close. |
| **OP-4** — KF.W9/SS-13 capture packet | **RED AT THE BYTES · RULED IN ADVANCE (not hard)** | The **§Bounds capture-receipt artefact exists** — `docs/tranches/V/megatranche/audit/visual/safari-real/SS-13-CAPTURE-RECEIPT.md`, **15,669 B**, 2026-09-17 19:34 — and it states its own row honestly: **"(a) THE OD-V3 CAPTURE PACKET — INCOMPLETE · 0 of 16 required cells"** (4 scenes × 2 transport homes × 2 viewports; 7 held shots, none counted, the S-8 (iii-a) discriminator honoured). **COHESION §0j.C KF-ODV3 rules this exact state in advance**: *"the transport-home ruling is taken by the orchestrator **from the OD-V3 packet** at KF.W10 `.g`'s sitting … and **if the packet does not exist by then KF.W10 closes `complete_with_misses` on that row citing its exact precondition**."* **OD-V5 stays DEFERRED** (same ruling; `complete_with_misses` authorized in advance). PACKET-FIRST is **not** breached: nothing is proxied, and `.c` will carry the exact precondition text from the receipt's §1(a). |
| **OP-5** — KF.W2..W9 bounds FINAL (re-measure-at-open, R2-5(d)) | **GREEN — RE-MEASURED** | ⟨cmd⟩ `ls docs/tranches/X/keyframes/waves/` → **16 `KF-W*.md` files**: the **eleven W0..W10** the spec requires, **plus the three successors now AUTHORED** (`KF-W11.md` 95,691 · `KF-W12.md` 76,270 · `KF-W13.md` 72,034) **plus** two KF.W8 artefacts (`KF-W8-CLOSE.md`, `KF-W8-census.md`). Every one of the eleven carries a bounds block (⟨cmd⟩ `grep -c 'Bounds'` per file → W0 17 · W1 12 · W2 53 · W3 4 · W4 40 · W5 43 · W6 59 · W7 36 · W8 46 · W9 49 · W10 12; W11 8 · W12 4 · W13 6). Worktree sizes, re-read at this clock (never from `git show`): W0 259,685 · W1 254,747 · W2 362,133 · W3 190,569 · W4 250,775 · W5 305,775 · W6 306,972 · W7 261,120 · W8 269,803 · W9 280,059 · W10 263,074. ⟨cmd⟩ `git status --porcelain -- docs/tranches/X/keyframes/` → **zero lines** — **zero modified sibling specs at open**. The packet-home leg (R4-8 item 3) is satisfied **both ways**: every packet home now has an authored spec **and** is named at §6.D. |
| **OP-6** — COHESION names this wave's owner (**hard**) | **RED — MEASURED, AND IT IS THE BLOCK** | see the finding below |

### THE BLOCK — OP-6, measured whole

The spec's round-5 re-cut (RULINGS-5 **R5-12(2)**; PASS-5/KF-W10-CHECK **D-1**) states the predicate over the
**ASSIGNMENT, never a letter**: *"OP-6 is GREEN only when a dated COHESION addendum **names a seat for
KF.W10**, whatever letter it takes."* Run whole, **double-run**, at COHESION's current bytes:

```
⟨cmd⟩ grep -n '^## §0' docs/tranches/X/COHESION.md
  :8 §0 The whole · :235 §0a · :253 §0b (KF.W3 OWNERSHIP CURED) · :267 §0c · :282 §0d · :292 §0e ·
  :301 §0f · :315 §0g · :446 §0h · :465 §0i · :560 §0j · :774 §0k · :851 §0k(second) · :940 §0l ·
  :972 §0m · :1026 §0n · :1088 §0o · :1116 §0p · :1171 §0q · :1204 §0r · :1259 §0s
⟨cmd⟩ grep -n 'KF\.W10\|KF-W10' docs/tranches/X/COHESION.md | awk -F: '{printf ":%s ", $1}'
  :288 :383 :688 :689
⟨cmd⟩ grep -cE 'KF\.W10.*SS-[12]|SS-[12].*KF\.W10' docs/tranches/X/COHESION.md   → 0   (run 1)
⟨cmd⟩ grep -cE 'KF\.W10.*SS-[12]|SS-[12].*KF\.W10' docs/tranches/X/COHESION.md   → 0   (run 2)
```

**Counting rule, stated at the enumeration**: the unit is a **LINE**; the two spellings are counted
separately and then together — ⟨cmd⟩ `grep -c 'KF\.W10'` → **2** · `grep -c 'KF-W10'` → **2** ·
`grep -cE 'KF[.-]W10'` → **4**. **None of the four is an assignment**: `:288` is §0d's *"the successor
register of record is `keyframes/waves/KF-W10.md` §6.D"* · `:383` a §-heading-spelling note · `:688`/`:689`
are §0j.C's **KF-ODV3** row (*"at KF.W10 `.g`'s sitting … closes `complete_with_misses`"*).
**COHESION §1's seat table is unchanged**: `SS-1 → KF.W0/W2/W4/W5/W8`, `SS-2 → KF.W1/W6/W7/W9`.
**KF.W3's half is CURED at §0b; KF.W10 alone remains assigned to no seat.**

**Why this is not cured by a neighbour.** (i) **§0j.C KF-WRITE** names KF.W10 in the execution-substrate list
and names the **hand** — that is **OP-1**, which §0j discharges **by name**, and the spec draws the two apart
at ten sites. (ii) **§0d** landed the minted-wave **boundary** line and the spec itself records that half as
**DISCHARGED** while stating *"§0d declares the boundary; it **assigns no owner** to KF.W10 — the ownership
half stays open on its own vehicle."* (iii) The vehicle named at rounds 1–5 (`§0e`) is now **occupied**
(*X·KF CONFORMANT AT PASS 8*), as are §0f–§0s; the cure therefore needs a **successor letter**, which is
precisely why the round-5 re-cut moved the test onto the assignment.

**What OP-6 being RED forbids, in the spec's own words** (§2a OP-6; §6.C-E): the wave *"may not assert **G-2's
set-difference** over waves it does not know are final and does not own"* — and G-2 is `.b`'s entire product,
which `.f`'s FINAL-KF.md and `.g`'s adjudication both consume. Opening over it would either (a) write `.b`
against a precondition the spec declares hard, or (b) produce a green no seat of this wave can reach — the
**L-2 vacuity trap** this file legislates against three times. **Sub-tranche-scope SPECIFIED for X·KF stays
withheld** for the same reason (header scope block). The seat therefore **stops and returns the escalation**
rather than papering it, which is §2's own *"a close wave that repairs a mechanism is not a close wave."*

**THE CURE, NAMED AND SIZED (not merely demanded).** One dated COHESION addendum — the next free letter,
**§0t** or a successor — of exactly the shape §6.C-E prescribes, landed by **the root session**:

> **KF.W10 ownership gap: CURED by assignment — KF.W10 is a coordination/close wave; it belongs to SS-2.**
> Boundary record: this assignment is the SPECIFIED precondition W10's OP-6/§6.C-E names.

RULINGS **R-18** already rules the recommended owner **SS-2**, on stated grounds (hardest dependency = KF.W1's
Mail Cure at OP-3/G-6/§6.C-B; content = ledger/mail terminalization under E13; **no library artifact gates it**).
On that addendum's landing, OP-6 is GREEN by re-running the sweep above, and this wave opens with the unit plan
banked below **unchanged** — no other precondition is outstanding.

### SECOND FINDING, banked for the same sitting (not a blocker) — the AUTHORED ELEVEN premise has moved

`KF.W11 · KF.W12 · KF.W13` were **AUTHORED 2026-09-18** (`f208ff31`; ledger row + event line), so the spec's
standing premise *"MINTED-**UNAUTHORED**"* at §1's R-A block quote, §2a OP-5, **§6.D** and **G-2's right hand**
is **stale at the bytes** — the three now carry real bounds blocks (8 · 4 · 6 `Bounds` hits). **Two consequences
the executing units must be handed, and neither is this seat's to rule (E-3: the spec is immutable; corrections
are dated addenda-beside):**

1. **R-A's scope is UNCHANGED in substance and the orchestrator's dispatch confirms it** — *"stamps the AUTHORED
   ELEVEN only"*. R-A's own reasoning survives the authoring event: the three *"never gated this close and were
   never required to be IMPLEMENTED"*, so they take **no verb** here whether or not a spec now exists for them.
   §3.6's re-cut sentence (R5-12(1)) is the imperative `.f` reads, and it already says exactly this.
2. **G-2's right hand is now computable two ways that must agree** — `authored bounds ∪ §6.D cargo` (the spec's
   form) and `authored bounds` alone (now that W11/W12/W13 have bounds blocks). The spec's falsifier —
   *"a right hand computed from authored bounds alone, dropping §6.D's cargo, fails"* — still binds: `.b`
   computes the spec's form, and states the 17-packet partition **9 · 6 · 2** against each successor spec's own
   bounds block as a **reconciliation**, never as a substitute. A §6.D row whose cargo does not sum to its wave's
   partition figure fails **naming the wave**.

---

## Baseline — the seven born-RED gates, run READ-ONLY at this seat's clock (R.2 BEFORE baseline)

Substrate of record: **keyframes.js `origin/master` `69095552`** (the spec's `81a56990` is superseded by KF.W0's
§B-12 settle; the ref of record is re-anchored here, as §6.B's re-baseline law requires) and **value.js
`tranche-u`** at the current tree bytes.

| gate | probe, re-executed read-only this seat | reading | verdict |
|---|---|---|---|
| **G-1** — FOLD-FORWARD §B discharge 15/15 | `git show origin/master:docs/tranches/V/FOLD-FORWARD.md` | **§A at `:12` · §B at `:30` · §C at `:48`; §B carries exactly 15 numbered rows** (1 aurora V-A95 · 2 Chip/Badge orphaned dist CSS · 3 Glass §4 dock contract · 4 G-1..G-4 batch marks · 5 OD-V3/OD-V5 · 6 IN-ATLAS-5 · 7 nested TooltipProvider · 8 W6×transaction lesson · 9 MR2 runner-parity · 10 CH-02 · 11 VM-4 · 12 owner-checkout reconciliation · 13 standing invariants · 14 OD-V2 · 15 external watches). **0 of 15 carry a terminal verb in any X·KF artifact**; no discharge addendum exists | **RED — AS DECLARED** |
| **G-2** — NO-WAVE-OWNER ∅ both directions | `ls kf-*.md \| wc -l` · `grep -l 'NO-WAVE-OWNER' \| wc -l` · `grep -o 'NO-WAVE-OWNER' \| wc -l` over `megatranche/registry/adjudicated/`, **double-run** | **58 records · 57 carrying · 1,218 occurrences** (run 1 = run 2). The spec's **1,216** is a dated observation of 2026-08-28 and is superseded by **+2**; membership (58/57) reproduces exactly. **No set-difference table exists** | **RED — AS DECLARED** |
| **G-3** — owner block, three rulings | `git show origin/master:docs/tranches/V/OWNER-DECISIONS.md` rows OD-V3 (`:7`) / OD-V5 (`:9`) | **OD-V3 = *"THE TRANSPORT-HOME RULING IS HELD FOR CAPTURE REVIEW"*** · **OD-V5 = *"THE AT-REST REOPEN QUESTION IS DEFERRED PENDING GLASS'S DOCK MARK"*** — both still HELD/DEFERRED at the frontier; **no owner block exists**. **OG-KF1 is RULED** at COHESION **§0j.C KF-OGKF1** (*"STALE-BY-SUBSTRATE … citable only as `345 exact / 12 partial / 57 unresolved @ 8281638c`, never as HEAD coverage"*) — so the gate's three-part acceptance is **1 ruled-quotable + 2 `complete_with_misses`-authorized**, never 0 | **RED — AS DECLARED** |
| **G-4** — never-cite register, 7 entries | `grep -rlE '357/414\|86\.23\|0/5 slots' docs/tranches/X/ docs/tranches/V/megatranche/`, **double-run**, with both units printed | **33 files · 106 occurrences · 76 lines** (run 1 = run 2). The round-5 spec figure (27/98/69) is superseded — **the field grows monotonically, exactly as the spec's property (i) states**; the partition, not the count, is the criterion. **The register does not exist** | **RED — AS DECLARED** |
| **G-5** — four doc-truth addenda | `git cat-file -e origin/master:<each>` over the five bound documents | **all five present** at the frontier: `docs/tranches/G/audit/r-animation-sota.md` · `docs/tranches/U/audit/lane-22-perf-demo-runtime.md` · `docs/tranches/U/waves/U.D.md` · `docs/tranches/T/stage-manifests/home.json` · `docs/frontend-design/demo/home.md`. **Zero addenda exist** | **RED — AS DECLARED** |
| **G-6** — both coordination ledgers terminal | `wc -c` + Status-cell classification on value `INBOX.md`; `git cat-file -e` on both kf ledgers | value `INBOX.md` **235,837 B · 74 rows · 0 UNREAD status rows** (bare `grep -n UNREAD` returns 60 coordinates, of which **every one** is law-preamble or sweep-line prose — the classification law is honoured). kf `coordination/INBOUND-LEDGER.md` **8,865 B** and `DISPOSITIONS.md` **19,605 B** both present at `origin/master`. **Neither ledger carries the closing verb set; D-GAP-6 and O-8's vehicle question have no closing line; `close/FINAL-KF.md` does not exist** (⟨cmd⟩ `ls docs/tranches/X/keyframes/close/` → **no such directory**) | **RED — AS DECLARED** |
| **G-7** — `v/w9-staging` land-or-kill | `git ls-remote --heads origin \| grep w9` + `git merge-base --is-ancestor` | **`b920b1902b4854c1bc7c5778d1674436dd51dce6  refs/heads/v/w9-staging`** — live; ⟨cmd⟩ `git merge-base --is-ancestor b920b190 origin/master` → **UNMERGED**. The authoring-time *"HEAD 41 behind / 252 dirty"* clause is **superseded** by OP-2's settle (0/0, 2 untracked), so the §B-12 gating condition on this gate is **now satisfied** — the branch is rebaseable at last | **RED — AS DECLARED** |

**R.2 — GREEN-BEFORE-CURE: NONE.** All seven are RED at their own probes, as §5 declares. The two
supersessions found (G-2's `1,216 → 1,218`; G-4's field) are **dated observations moving**, not greens.

---

## Unit plan — 6 Opus serial + `.g` fresh-Fable (BANKED, NOT DISPATCHED)

Held in escrow against OP-6's ruling. Order is `.a → .b → .c → .d → .e → .f → .g` (§6.A, binding);
**peak concurrency 1** — no two units share a write path (§4 Disjointness) and none may open before
**G-KFW4-1** (KF.W4, the declared sequencing head — satisfied transitively, KF.W4 CLOSED).

| unit | model | spec sections | writable set (§4) | gates | locks / same-commit family |
|---|---|---|---|---|---|
| `KF.W10.a` | opus | §3.1 `:192-266` (+ §5 G-1 `:384-394`) | kf `docs/tranches/V/FOLD-FORWARD.md` (**append-only**, ONE dated addendum) | **G-1** | §6.A ordering 3 — the CARRY-FORWARD block closes **after** KF.W0's C-17 mint (else `STANDING-CARRIED — pending the KF.W0 C-17 mint`); **denominator locks 15 / 4**; E-3 (§A/§B byte-unchanged); the three W8 R-4 re-open triggers carried **verbatim**; commit 1 of §10 |
| `KF.W10.b` | opus | §3.2 `:268-282` (+ §5 G-2 `:396-419`) | `docs/tranches/X/COHESION.md` **§4 register drain** (modify-carve; §1 register amendment only if the ownership addendum has landed) | **G-2** | OP-5 re-measured at its own open; right hand = **authored bounds ∪ §6.D cargo (9·6·2)**, reconciled against the now-authored W11/W12/W13 bounds; all **seven** §3.2 sequencing locks survive verbatim incl. **KF-AV-28**'s rider; zero re-bookings; commit 2 |
| `KF.W10.c` | opus | §3.3 `:284-289` (+ G-3 `:421-431`, G-4 `:433-457`) | kf `docs/tranches/V/OWNER-DECISIONS.md` (**append-only, conditional**) | **G-3 · G-4** | `.c` **before** `.d` (§6.A ordering 2); **OG-KF1 = RULED, quoted from COHESION §0j.C**; **OD-V3 / OD-V5 = `complete_with_misses`** citing the exact preconditions (SS-13-CAPTURE-RECEIPT §1(a)'s *0 of 16 cells*; glass's dock mark) per §0j.C KF-ODV3 — **never proxied**; register **ordinals 1..7 binding**, entry (7) carries the REPO-SCOPED restatement; commit 3 |
| `KF.W10.d` | opus | §3.4 `:291-300` (+ G-5 `:459-469`) | kf `docs/tranches/G/audit/r-animation-sota.md` · `docs/tranches/U/audit/lane-22-perf-demo-runtime.md` · `docs/tranches/U/waves/U.D.md` · `docs/tranches/T/stage-manifests/home.json` (**sidecar**) · `docs/frontend-design/demo/home.md` — all **append-only addenda** | **G-5** | **E-3 addenda-not-patch**: `git diff` empty on all four originals; anchors **re-resolved at the landing substrate** (`:109` not `:107`; `:110-112`; `:194`; `:2`/`:9`/`:13`/`:16`; `:67`/`:187-191`/`:367`); KF-EST-23's **correction-boundary lock** (exactly two claims, reinstate neither); KF-HA-4 states KF.W4's oracle fate **by reference**; addenda 1+2+4 are **ONE motion**; commit 4 |
| `KF.W10.e` | opus | §3.5 `:302-330` (+ G-7 `:489-499`) | kf branch `v/w9-staging` @ `b920b190` — **the only branch this wave touches** | **G-7** | **LAW A import-graph census RE-DERIVED at the landing tree** (six-module prune set; specifier + symbol/runner legs; never inherited from the spec's `81a56990` paste); LAND ⇒ rebase over `deploy-pages.yml` + four CI-run witnesses + TC-5 + MR4 red-once + §B-9's MR2 observation; KILL ⇒ tombstone naming **8** units. *"Leaving the branch as-is is not a third option."* Commit 5 |
| `KF.W10.f` | opus | §3.6 `:332-334` (+ G-6 `:471-487`, §10) | value `docs/tranches/V/coordination/INBOX.md` (mail rows) · kf `docs/tranches/V/coordination/INBOUND-LEDGER.md` · kf `docs/tranches/V/DISPOSITIONS.md` · `docs/tranches/X/keyframes/close/FINAL-KF.md` (create) · one four-verb row in **each authored sibling spec** | **G-6** | **AUTHORED ELEVEN ONLY** (R-A as re-cut at §3.6, R5-12(1)) — the three successors take **no verb**; D-GAP-6 = *"not adopted — 4.1 declines it permanently"*, O-8 = *"pre-empted by CC-084"*, **neither dressed as an adoption**; L-6 (every letter `FINAL-KF.md` cites must `git cat-file -e`); commit 6 |
| `KF.W10.g` | **fable** (fresh, M-23 §1 — mirrors X.P.W4`.d`) | §3.7 `:336-338` + all of §5 `:368-499` | none (VERIFY-ONLY; writes only its adjudication into the execution record) | adjudicates all seven | Assumes the close is wrong; named probable finds: a §B row verbed with a status word · a set-difference built on a stale sibling bounds block · an owner row closed `complete_with_misses` without its exact precondition · an addendum that patched. **The OD-V3 transport-home sitting happens here** (§0j.C) |

**Dispatch groups when unblocked**: `[[KF.W10.a], [KF.W10.b], [KF.W10.c], [KF.W10.d], [KF.W10.e], [KF.W10.f], [KF.W10.g]]`.

---

## Unit receipts

*(empty — no unit was dispatched; the wave is BLOCKED-ON OP-6)*

---

# SITTING 2 — THE OPEN ACT (2026-09-18, later) · OP-6 CURED AT COHESION §0t · **THE WAVE OPENS**

**Seat**: SEAT 0 (OPEN), `claude-opus-5[1m]`, 2026-09-18 23:1x EDT (⟨cmd⟩ `date` → `Fri Sep 18 23:16:06 EDT 2026`).
**Sitting date of record stays 2026-09-17** (the owner's begin-word, COHESION §0j).
**E-3 posture**: sitting 1's bytes above are **SEALED and not rewritten**. Its `BLOCKED-ON OP-6` verdict was
true at its own clock and is **superseded at its own predicate**, never erased. **The `## Unit receipts`
section of record for the dispatched wave is the LAST one in this file** (below); sitting 1's identically
headed section records only that nothing was dispatched at that sitting.

> ## VERDICT OF THIS SITTING — **OPEN**. Seven gates re-run READ-ONLY and **all seven born-RED**; **0 GREEN-BEFORE-CURE**; the seven-unit plan stands **unchanged**; **no §4 path was written by this seat**.
> §2a's sixth precondition is **GREEN at the bytes**: COHESION **§0t** — *"**KF.W10 belongs to SS-2**"* —
> landed at `f7dae874` (⟨cmd⟩ `git log -1 --format=%ad --date=iso f7dae874` → `2026-09-18 23:00:55 -0400`),
> the root session's act, exactly the shape §6.C-E prescribed and RULINGS **R-18** recommended. All six open
> preconditions now measure GREEN or RULED.

**Dated observation, recorded not re-dated (E-3).** §0t's heading carries **2026-09-19** while its commit's
own clock reads **2026-09-18 23:00:55 -0400** — the same heading-vs-commit drift §0r and §0s carry. The
addendum's *authority* is its landed bytes; this seat records the drift and re-dates nothing.

---

## Open — sitting 2

### Crash-recovery sweep (STANDING LAW, first act, re-run at this seat's clock)

⟨cmd⟩ `git status --porcelain` in both repos this seat may write:

- **value.js — 15 rows, every one OUTSIDE this seat's writable set**: `demo/palettes/**` ×6 ·
  `demo/palettes/browser/{dialog,search}/**` ×2 · `demo/picker/controls/ComponentSliders/ConsoleRail.vue` ·
  `demo/shell/dock/layers/SlugEditLayer.vue` · `docs/tranches/V/reformation/CARRY-LEDGER.md` ·
  `scripts/dev/dev.sh` (**unowned, NEVER touched, never staged**) · untracked
  `docs/tranches/X/waves/evidence/W4/` and two `e2e/smoke/**a11y-control-targets.spec.ts`.
  **Nothing touched, nothing stashed.**
- **keyframes.js — 2 rows**, both untracked value-authored letters
  (`docs/tranches/V/coordination/VALUEJS-INBOUND-2026-07-{24,27}-*.md`) — O-8/O-11's delivered bytes.
  Outside this seat's writable set; left in place.
- **Inherited work on KF.W10**: **NONE that is uncommitted.** `execution/B/KF-W10.md` is **tracked and clean**
  at `9101f343` (⟨cmd⟩ `shasum` → `828e524f…d841`); `docs/tranches/X/keyframes/close/` does not exist; no unit
  commit exists in either tree (⟨cmd⟩ `git log --oneline --all | grep -iE 'KF W10'` in value → only the two
  ledger/addendum commits `9101f343`, `f7dae874`; ⟨cmd⟩ same in kf → **no rows**).

### E13 Step-0 — the four-path mail sweep, re-run at this seat's clock

Classification taken from **each row's own Status cell**, never from a bare `grep -i unread`; `INBOX.md`
**self-excluded** (SELF-COUNT law).

| # | path | newest member | rowed as |
|---|---|---|---|
| 1 | `docs/tranches/V/` + `docs/tranches/V/coordination/` | the five `*-inbox-2026-09-18-value-4.1-*` letters (parse-that · fourier · glassui · atlas · keyframes) | **O-34 · O-35 · O-36 · O-37 · O-38** — each ⟨cmd⟩ `grep -cE '^\| O-3n \|'` → **1**; `valuejs-outbound-2026-09-18-kfw7-bh-relay{,-ADDENDUM-A9}.md` = **O-28 / O-31**, both rowed |
| 2 | `../glass-ui/docs/tranches/BK/coordination/` — **BK re-confirmed newest** ⟨cmd⟩ `ls -1dt ../glass-ui/docs/tranches/*/ \| head -5` → `BK/` · `BJ/` · `BI/` · `IOS27-MICRO/` · `BH/` | `glass-outbound-2026-09-18-valuejs-o26-reply.md` | **I-35**, rowed 2026-09-18 |
| 3 | `../keyframes.js/docs/tranches/V/coordination/` | `VALUEJS-INBOUND-2026-09-17-o8-o11-amendment-addendum.md` | **O-21** (`INBOX.md:104`) — ours, delivered; present at kf `origin/master` (OP-3) |
| 4 | `../sci-report/atlas/docs/tranches/P/coordination/` | `valuejs-inbound-2026-07-27-library-band-export-delta.md` | **O-12** — ours; path UNMOVED |

**Delta command** ⟨cmd⟩ `find docs/tranches/V -maxdepth 2 -type f -name '*.md' -newermt "2026-09-18 12:00"`
→ **9** members: the five rowed O-34..O-38 letters, the two rowed relay letters (O-28/O-31), `INBOX.md`
(self) and `ARCHITECTURE.md` (not mail). Paths 2–4 produced no member newer than their already-rowed newest.

**Result: ZERO unrowed letters addressed to value.js · ZERO UNREAD status rows** — ⟨cmd⟩
`awk -F'|' '/^\| [IO]-[0-9]+ \|/ {print $NF}' INBOX.md | grep -ci 'UNREAD'` → **0** over ⟨cmd⟩
`grep -cE '^\| [IO]-[0-9]+ \|' INBOX.md` → **74** rows (`wc -c` → **237,857 B**). **No I-n minted.** A dated
sweep line for this OPEN sitting is appended at `INBOX.md`'s file end.

### Preconditions — §1 `Opens after` and §2a OP-1..OP-6, measured at the bytes AND in the ledger

**§1 `Opens after` — MET.** Ledger status cells, read immediately before this write (⟨cmd⟩
`awk -F'|' '/^\| KF\.W[0-9]+ \|/ {print $2" => "$4}' execution/LEDGER.md`): **KF.W0 · W1 · W2 · W4 · W5 ·
W6 · W7 · W8 · W9 all CLOSED 2026-09-17** (five of them CLOSED-honest-RED, which is CLOSED); **CLOSED ⊇
IMPLEMENTED**, so the seven schedulable siblings' verb condition holds. **KF.W3 is carved out by name**
(§1's round-2 carve-out): `KF-W3.md` present, **190,569 B**, bounds block present, ledger status
**GATE-KEYED** — bounds-FINAL + gate-state, never its verb. ✔

| OP | verdict | receipt (this seat's clock; double-run where a figure is published) |
|---|---|---|
| **OP-1** — kf write authority named (**hard**) | **GREEN — RULED** | COHESION **§0j.C KF-WRITE** at `:657`, re-read whole this seat: *"after §B-12, the sacred checkout on `master` (= `origin/master`) is the **execution substrate for KF.W2 · W4 · W5 · W6 · W7 · W8 · W9 · W10**, every wave pushing `origin HEAD` at close … **Under whose hand:** the value.js orchestrator under the owner's 2026-09-17 grant."* |
| **OP-2** — KF.W0 §B-12 has acted (**hard**) | **GREEN — MEASURED** | ⟨cmd⟩ in `/Users/mkbabb/Programming/keyframes.js`: branch **`master`** · `HEAD` **`69095552`** · `origin/master` **`69095552`** · `git rev-list --left-right --count HEAD...origin/master` → **0 0** · porcelain → **2** untracked value letters. Snapshot ref present: ⟨cmd⟩ `git branch --list 'kf-sacred-snapshot*'` → **`kf-sacred-snapshot-2026-09-17`**. The authoring-time reading (1 ahead / 41 behind / 252 dirty) is **superseded**. |
| **OP-3** — O-21 exec-visible | **GREEN — MEASURED AT THE FRONTIER** | ⟨cmd⟩ `git cat-file -e origin/master:docs/tranches/V/coordination/VALUEJS-INBOUND-2026-09-17-o8-o11-amendment-addendum.md` → **present**; ledger row `INBOX.md:104` = `O-21 · 2026-09-17 · keyframes (V, exec clone)`. The spec's *"UNLANDED · ledger maximum still O-20"* reading is superseded by KF.W1's close. |
| **OP-4** — KF.W9/SS-13 capture packet | **RED AT THE BYTES · RULED IN ADVANCE (not hard)** | `docs/tranches/V/megatranche/audit/visual/safari-real/SS-13-CAPTURE-RECEIPT.md`, **15,669 B**, states its own row honestly at `:35`: *"### (a) THE OD-V3 CAPTURE PACKET — **INCOMPLETE · 0 of 16 required cells**"*. **COHESION §0j.C KF-ODV3** rules this state in advance: *"the transport-home ruling is taken by the orchestrator **from the OD-V3 packet** at KF.W10 `.g`'s sitting under this delegation, and **if the packet does not exist by then KF.W10 closes `complete_with_misses` on that row citing its exact precondition**."* **OD-V5 stays DEFERRED** (same ruling, `complete_with_misses` authorized in advance). PACKET-FIRST is **not** breached: nothing is proxied; `.c` carries the receipt's §1(a) text verbatim as the exact precondition. |
| **OP-5** — KF.W2..W9 bounds FINAL (re-measure-at-open, **R2-5(d)**) | **GREEN — RE-MEASURED AT THE WORKTREE** | ⟨cmd⟩ `ls docs/tranches/X/keyframes/waves/` → **16 `KF-W*.md`**: the **eleven W0..W10**, the **three AUTHORED successors** (`KF-W11` 95,691 · `KF-W12` 76,270 · `KF-W13` 72,034) and two KF.W8 artefacts (`KF-W8-CLOSE.md` 28,881 · `KF-W8-census.md` 92,667). Worktree `wc -c`, never `git show`: **W0 259,685 · W1 254,747 · W2 362,133 · W3 190,569 · W4 250,775 · W5 305,775 · W6 306,972 · W7 261,120 · W8 269,803 · W9 280,059 · W10 263,074**. Bounds blocks, ⟨cmd⟩ `grep -c 'Bounds'`: **W0 17 · W1 12 · W2 53 · W3 4 · W4 40 · W5 43 · W6 59 · W7 36 · W8 46 · W9 49 · W10 12**; successors **W11 8 · W12 4 · W13 6**. ⟨cmd⟩ `git status --porcelain -- docs/tranches/X/keyframes/` → **zero lines** — **zero modified sibling specs at open**. The packet-home leg (R4-8 item 3) is satisfied **both ways**. |
| **OP-6** — COHESION names this wave's owner (**hard**) | **GREEN — CURED AT §0t, MEASURED** | The round-5 predicate is over the **ASSIGNMENT, whatever letter it takes** (R5-12(2); PASS-5/KF-W10-CHECK D-1). ⟨cmd⟩ `grep -n '^## §0' COHESION.md` → the register now ends **`:1269` §0t ADDENDUM 2026-09-19 — KF.W10 OWNERSHIP CURED; THE X·KF SUB-TRANCHE STAMP UNBLOCKS**. ⟨cmd⟩ `grep -cE 'KF\.W10.*SS-[12]\|SS-[12].*KF\.W10' COHESION.md` → **1** (run 1) · **1** (run 2), the hit at `:1273`. §0t reads: *"**KF.W10 belongs to SS-2** — it is the coordination-terminal wave whose hardest dependency is KF.W1's Mail Cure (O-21, edge 6) and whose content is ledger/mail terminalization … the X·KF sub-tranche-scope SPECIFIED stamp, withheld at KF-W10.md §State pending this line, is no longer withheld by COHESION; the 7-unit plan banked at `execution/B/KF-W10.md` dispatches unchanged."* **Spelling counts, stated at the enumeration (unit = LINE)**: `grep -c 'KF\.W10'` → **5** · `grep -c 'KF-W10'` → **6** · `grep -cE 'KF[.-]W10'` → **10** (sitting 1 measured 2 · 2 · 4; the delta is §0t's own six lines). **The withhold is lifted; G-2's set-difference is now an OWNED assertion.** |

**Consequences of the cure, read as the spec reads them (§0t's own three)**: (i) `.b`'s set-difference is an
owned assertion — `.f`/`.g` consume it; (ii) **X·KF sub-tranche-scope SPECIFIED is no longer withheld by
COHESION**; (iii) the banked plan dispatches **unchanged**. §0d's minted-wave boundary and §0b's KF.W3 GATED
posture are **untouched**.

### The second finding of sitting 1, re-affirmed at this clock (not a blocker)

`KF.W11 · KF.W12 · KF.W13` are **AUTHORED** (`f208ff31`) with real bounds blocks (**8 · 4 · 6**), so the
spec's *MINTED-UNAUTHORED* premise at §1's R-A quote, §2a OP-5, §6.D and G-2's right hand is **stale at the
bytes**. Two consequences handed to the units, neither re-ruled here (E-3): **(1)** R-A's scope is unchanged
in substance — *"stamps the AUTHORED ELEVEN only"* (the orchestrator's dispatch says the same); the three
*"never gated this close and were never required to be IMPLEMENTED"*, so they take **no verb**, and §3.6's
re-cut sentence (R5-12(1)) is the imperative `.f` reads. **(2)** G-2's right hand is computable two ways that
must agree — `authored bounds ∪ §6.D cargo` (the spec's form, which `.b` computes) reconciled against the
successors' own bounds blocks as the **9 · 6 · 2** partition; a §6.D row whose cargo does not sum to its
wave's partition figure fails **naming the wave**. The spec's falsifier still binds: a right hand computed
from authored bounds alone, dropping §6.D's cargo, **fails**.

---

## Baseline — sitting 2: the seven born-RED gates, re-run READ-ONLY at this seat's clock (R.2 BEFORE baseline)

Substrate of record: **keyframes.js `origin/master` `69095552`** (the spec's `81a56990` is superseded by
KF.W0's §B-12 settle; §6.B's re-baseline law re-anchors it here) and **value.js `tranche-u`** at the current
tree bytes.

| gate | probe, re-executed read-only at this seat | reading | verdict |
|---|---|---|---|
| **G-1** — FOLD-FORWARD §B discharge 15/15 | `git show origin/master:docs/tranches/V/FOLD-FORWARD.md` (**9,289 B · 54 lines**) → `grep -n '^## §'` · `awk 'NR>=30 && NR<48 && /^[0-9]+\./' \| wc -l` · `grep -ci 'addendum'` | **§A `:12` · §B `:30` · §C `:48`; §B carries exactly **15** numbered rows**; ⟨cmd⟩ `grep -ci 'addendum'` → **0** — **no dated discharge addendum exists**. The only closed-vocabulary tokens in the file are **two §A prose cells** (`:22` *"NOT IMPLEMENTED — folds whole"*, `:25` *"Pre-rail subset LANDED"*), neither of them a §B row verb: **0 of 15 §B rows carry a terminal verb** | **RED — AS DECLARED** |
| **G-2** — NO-WAVE-OWNER ∅ both directions | `ls kf-*.md \| wc -l` · `grep -l 'NO-WAVE-OWNER' \| wc -l` · `grep -o 'NO-WAVE-OWNER' \| wc -l` over `megatranche/registry/adjudicated/`, **double-run** | **58 records · 57 carrying · 1,218 occurrences** (run 1 ≡ run 2; sitting 1 read the same). The spec's **1,216** is a dated 2026-08-28 observation, superseded by **+2**; membership (58/57) reproduces exactly. **No set-difference table exists** — ⟨cmd⟩ `ls docs/tranches/X/keyframes/close/` → **no such directory** | **RED — AS DECLARED** |
| **G-3** — owner block, three rulings | `git show origin/master:docs/tranches/V/OWNER-DECISIONS.md` rows `:7` / `:9` | **OD-V3 `:7` = *"THE TRANSPORT-HOME RULING IS HELD FOR CAPTURE REVIEW"*** · **OD-V5 `:9` = *"THE AT-REST REOPEN QUESTION IS DEFERRED PENDING GLASS'S DOCK MARK"*** — both still HELD/DEFERRED at the frontier; **no owner block exists**. **OG-KF1 is RULED** at COHESION **§0j.C KF-OGKF1** (*"STALE-BY-SUBSTRATE … citable only as `345 exact / 12 partial / 57 unresolved @ 8281638c`"*): the gate's three-part acceptance is **1 ruled-quotable + 2 `complete_with_misses`-authorized**, never 0 | **RED — AS DECLARED** |
| **G-4** — never-cite register, 7 entries | `grep -rlE '357/414\|86\.23\|0/5 slots' docs/tranches/X/ docs/tranches/V/megatranche/` with all three units printed, **double-run** | **34 files · 77 lines · 108 occurrences** (run 1 ≡ run 2). Sitting 1 measured **33 · 76 · 106**; the delta is **this file's own sitting-1 probe cell** — ⟨cmd⟩ `grep -coE '357/414\|86\.23\|0/5 slots' execution/B/KF-W10.md` → **2 occurrences on 1 line in 1 file** = exactly `+1 · +1 · +2`. **SELF-COUNT law honoured: the field is moving because the measurement is in it**, which is the spec's own property (i) — *the partition, not the count, is the criterion*; this sitting-2 block moves it again. **The register does not exist** (⟨cmd⟩ `grep -rl 'never-cite register' docs/tranches/X/keyframes/` → the spec + three PASS-n checks only) | **RED — AS DECLARED** |
| **G-5** — four doc-truth addenda | `git cat-file -e origin/master:<each>` over the five bound documents · `git ls-tree -r --name-only origin/master \| grep -icE 'addend'` | **all five present** at the frontier: `docs/tranches/G/audit/r-animation-sota.md` · `docs/tranches/U/audit/lane-22-perf-demo-runtime.md` · `docs/tranches/U/waves/U.D.md` · `docs/tranches/T/stage-manifests/home.json` · `docs/frontend-design/demo/home.md`. **Zero addenda exist**: the frontier's **7** `addend`-named files are the O/V-lane letters and the five `vnext/OWNER-ADDENDUM-*` pages — **none beside any of the five** — and `docs/tranches/T/stage-manifests/` holds **no sidecar** (⟨cmd⟩ `git ls-tree` → 9 manifests, `home.json` among them, no `home.*.md`) | **RED — AS DECLARED** |
| **G-6** — both coordination ledgers terminal | `wc -c` + Status-cell classification on value `INBOX.md`; `git cat-file -s` on both kf ledgers; `grep -ci` for the two converged rows | value `INBOX.md` **237,857 B · 74 rows · 0 UNREAD status cells**. kf `coordination/INBOUND-LEDGER.md` **8,865 B** · `DISPOSITIONS.md` **19,605 B**, both present at `origin/master`. **Neither carries the closing verb set**: `D-GAP-6` appears at INBOUND-LEDGER `:35`/`:36` as prose inside the IN-VALUE-1/-2 rows and at `DISPOSITIONS.md:106` as **`FOLD W12`** — an open routing, not a terminal word; ⟨cmd⟩ `grep -ci 'O-8'` on `DISPOSITIONS.md` → **0**, so O-8's vehicle question has **no closing line**. `close/FINAL-KF.md` does not exist | **RED — AS DECLARED** |
| **G-7** — `v/w9-staging` land-or-kill | `git ls-remote --heads origin \| grep w9` + `git merge-base --is-ancestor` | **`b920b1902b4854c1bc7c5778d1674436dd51dce6  refs/heads/v/w9-staging`** — live; ⟨cmd⟩ `git merge-base --is-ancestor b920b190 origin/master` → **UNMERGED**. The authoring-time *"41 behind / 252 dirty"* clause is superseded by OP-2's settle (0/0), so **the §B-12 gating condition on this gate is satisfied** — the branch is rebaseable at last | **RED — AS DECLARED** |

**R.2 — GREEN-BEFORE-CURE: NONE.** All seven are RED at their own probes, exactly as §5 declares. The three
moving figures found (G-2's `1,216 → 1,218`; G-4's field `33/76/106 → 34/77/108`; the successors' authoring)
are **dated observations moving**, never greens.

---

## Unit plan — sitting 2: 6 Opus serial + `.g` fresh-Fable · **DISPATCHABLE**

The plan banked at sitting 1 is **re-verified at this clock and stands unchanged** — §0t's own words: *"the
7-unit plan banked at `execution/B/KF-W10.md` dispatches unchanged."* Order `.a → .b → .c → .d → .e → .f →
.g` (§6.A, binding); **peak concurrency 1** — no two units share a write path (§4 Disjointness); **G-KFW4-1**
precedes every unit and is satisfied transitively (KF.W4 CLOSED). Spec anchors re-resolved at this seat:
§3.1 `:192-266` · §3.2 `:268-282` · §3.3 `:284-289` · §3.4 `:291-300` · §3.5 `:302-330` · §3.6 `:332-334` ·
§3.7 `:336-338` · §4 `:342-366` · §5 `:368-499` · §6.A `:505-511` · §6.B `:513-524` · §10 `:660-673`
(⟨cmd⟩ `grep -n '^#\{1,4\} '` over the spec; spec `shasum` at this seat **`ffc9feff…f190`**, last written at
`ba6dcdb3` — **E-3: unchanged by this seat**).

| unit | model | spec sections | writable set (§4) | gates | locks / same-commit family |
|---|---|---|---|---|---|
| `KF.W10.a` | opus | §3.1 `:192-266` (+ §5 G-1 `:384-394`) | kf `docs/tranches/V/FOLD-FORWARD.md` (**append-only**, ONE dated addendum) | **G-1** | §6.A ordering 3 — the CARRY-FORWARD block closes **after** KF.W0's C-17 mint (else `STANDING-CARRIED — pending the KF.W0 C-17 mint`); **denominator locks 15 / 4**; E-3 (§A/§B byte-unchanged); the three W8 R-4 re-open triggers carried **verbatim**; §10 commit 1 |
| `KF.W10.b` | opus | §3.2 `:268-282` (+ §5 G-2 `:396-419`) | value `docs/tranches/X/COHESION.md` **§4 register drain** (modify-carve; §1/§3/§5 legs per §4) | **G-2** | OP-5 re-measured at its own open; right hand = **authored bounds ∪ §6.D cargo**, reconciled **9 · 6 · 2** against W11/W12/W13's now-real bounds; **§0t is RECORDED, never re-minted** (ownership is already assigned); all **seven** §3.2 sequencing locks survive verbatim incl. **KF-AV-28**'s rider as a SWEEP INPUT; zero re-bookings; §10 commit 2 |
| `KF.W10.c` | opus | §3.3 `:284-289` (+ G-3 `:421-431`, G-4 `:433-457`) | kf `docs/tranches/V/OWNER-DECISIONS.md` (**append-only, conditional**) | **G-3 · G-4** | `.c` **before** `.d` (§6.A ordering 2); **OG-KF1 = RULED, quoted from COHESION §0j.C**; **OD-V3 / OD-V5 = `complete_with_misses`** citing the exact preconditions (SS-13-CAPTURE-RECEIPT `:35`'s *0 of 16 cells*; glass's dock mark) per §0j.C KF-ODV3 — **never proxied**; register **ordinals 1..7 binding**, entry (7) carries the REPO-SCOPED restatement; §10 commit 3 |
| `KF.W10.d` | opus | §3.4 `:291-300` (+ G-5 `:459-469`) | kf `docs/tranches/G/audit/r-animation-sota.md` · `docs/tranches/U/audit/lane-22-perf-demo-runtime.md` · `docs/tranches/U/waves/U.D.md` · `docs/tranches/T/stage-manifests/home.json` (**sidecar**) · `docs/frontend-design/demo/home.md` — all **append-only addenda** | **G-5** | **E-3 addenda-not-patch**: `git diff` empty on all four originals; anchors **re-resolved at the landing substrate** (`:109` not `:107`; `:253`; `:110-112`; `:194`; `:9` + `:2`/`:13`/`:16`; `:67`/`:187-191`/`:367`); KF-EST-23's **correction-boundary lock** (exactly two claims, reinstate neither); KF-HA-4 states KF.W4's oracle fate **by reference**; addenda 1+2+4 are **ONE motion**; §10 commit 4 |
| `KF.W10.e` | opus | §3.5 `:302-330` (+ G-7 `:489-499`) | kf branch `v/w9-staging` @ `b920b190` — **the only branch this wave touches** | **G-7** | **LAW A import-graph census RE-DERIVED at the landing tree** (six-module prune set; specifier + symbol/runner legs; never inherited from the spec's `81a56990` paste); LAND ⇒ rebase over `deploy-pages.yml` + four CI-run witnesses + TC-5 + MR4 red-once + §B-9's MR2 observation; KILL ⇒ tombstone naming **8** units. *"Leaving the branch as-is is not a third option."* §10 commit 5 |
| `KF.W10.f` | opus | §3.6 `:332-334` (+ G-6 `:471-487`, §10 `:660-673`) | value `docs/tranches/V/coordination/INBOX.md` (mail rows) · kf `docs/tranches/V/coordination/INBOUND-LEDGER.md` · kf `docs/tranches/V/DISPOSITIONS.md` · value `docs/tranches/X/keyframes/close/FINAL-KF.md` (create) · one four-verb row in **each AUTHORED sibling spec** | **G-6** | **AUTHORED ELEVEN ONLY** (R-A as re-cut at §3.6, R5-12(1)) — the three successors take **no verb**; D-GAP-6 = *"not adopted — 4.1 declines it permanently"*, O-8 = *"pre-empted by CC-084"*, **neither dressed as an adoption**; already-terminal rows recorded, not re-opened; **L-6** (every letter `FINAL-KF.md` cites must `git cat-file -e`); §10 commit 6 |
| `KF.W10.g` | **fable** (fresh, M-23 §1 — mirrors X.P.W4 `.d`) | §3.7 `:336-338` + all of §5 `:368-499` | **none** (VERIFY-ONLY; writes only its adjudication into this record) | adjudicates all seven | Assumes the close is wrong; named probable finds: a §B row verbed with a status word · a set-difference built on a stale sibling bounds block · an owner row closed `complete_with_misses` without its exact precondition · an addendum that patched. **The OD-V3 transport-home sitting happens here** (§0j.C KF-ODV3) |

**Dispatch groups**: `[[KF.W10.a], [KF.W10.b], [KF.W10.c], [KF.W10.d], [KF.W10.e], [KF.W10.f], [KF.W10.g]]`
— seven ordered groups of one, per §1's `Agents` line (*"6 Opus units, **serial**, plus `.g`, a fresh Fable
adjudicator"*) and §6.A. The owner's max-4 concurrent-workflow cap is respected by construction.

---

## Unit receipts

*(empty at OPEN — the live receipts section; each dispatched unit appends its own block here)*

### KF.W10.a

**SERVED MODEL**: `claude-opus-5[1m]` · **Unit** `KF.W10.a` · group 1 of 7 (alone) · **sections executed**
§3.1 `:192-266` + §5 **G-1** `:384-394` + §6.B carried locks `:513-524` (+ §6.A ordering 3 · §9.1 dissent 1 ·
§10 commit 1). **Seat clock** 2026-09-18 23:2x → 23:5x EDT (⟨cmd⟩ `date` → `Fri Sep 18 23:23:17 EDT 2026` at
open). **Sitting of record stays 2026-09-17.** **Status: DONE — G-1 turns RED → GREEN at the landing bytes.**
**Writable set honoured exactly**: `keyframes.js docs/tranches/V/FOLD-FORWARD.md`, and nothing else in either
tree. **No push** (§0j.C KF-WRITE: a wave pushes `origin HEAD` at close, a unit does not). **No ledger edit**
(the wave's close moves the row).

**CRASH-RECOVERY SWEEP (standing law, first act).** ⟨cmd⟩ `git status --porcelain` in both repos:
**keyframes.js — 2 rows**, both untracked value-authored letters
(`docs/tranches/V/coordination/VALUEJS-INBOUND-2026-07-{24,27}-*.md` = O-8/O-11's delivered bytes), **outside
this seat's writable set, left in place**. **value.js — 15 rows, every one outside this seat's writable set**
(`demo/**` ×10 · `docs/tranches/V/reformation/CARRY-LEDGER.md` · `src/css/timeline.ts` · `scripts/dev/dev.sh`
**never touched, never staged** · untracked `docs/tranches/X/waves/evidence/W4/` + two `e2e/smoke/**`).
**INHERITED WORK ON THIS UNIT: NONE** — ⟨cmd⟩ `git status --porcelain -- docs/tranches/V/FOLD-FORWARD.md` in
kf → **zero lines**, and ⟨cmd⟩ `git diff --stat origin/master -- <that path>` → **empty**, i.e. the file was
byte-identical to the frontier before this seat wrote. Nothing stashed, nothing restored, nothing reset.

**BEFORE — G-1 baseline re-measured READ-ONLY at this seat, double-run** (the spec's witness form,
`git show origin/master:docs/tranches/V/FOLD-FORWARD.md`): **9,289 B · 54 L**, `shasum`
**`797029037559bbc64d935285065f83ae2fb958b9`**, worktree ≡ frontier. §A `:12` · §B `:30` · §C `:48`;
⟨cmd⟩ `awk 'NR>30 && NR<48 && /^[0-9]+\./' | wc -l` → **15** (run 1) · **15** (run 2). ⟨cmd⟩
`grep -ci 'addendum'` → **0** — no discharge addendum existed. ⟨cmd⟩ `grep -noE '<the seven-word alphabet>'`
→ **2 hits, both §A prose** (`:22` *"the LANDED slice tree"*, `:25` *"Pre-rail subset LANDED"*); **0 of 15 §B
rows carried a terminal verb**. **G-1 = RED, exactly as §5 declares it born.**

**ANCHOR VERIFICATION AT TRUE BYTES (method: measure before you edit).** All spec anchors this unit consumes
**resolved without drift**: §3.1 at `:192-266` (the table + the three dated corrections + the record block +
the roster + the trigger block), §5 G-1 at `:384-394`, §6.A at `:505-511`, §6.B at `:513-524`, §10 at
`:660-673`. **No INTENT re-resolution was needed.** Spec read whole in slices (263,074 B); the wave record's
sitting-1 + sitting-2 Open/Baseline/Unit-plan read; **COHESION `§0j` read whole and every later addendum to
the file end** (`§0k` ×2 · `§0l` · `§0m` · `§0n` · `§0o` · `§0p` · `§0q` · `§0r` · `§0s` · **`§0t`** — the
register's true end at `:1269`). **Rulings consumed**: **§0j.C KF-ODV3/KF-ODV5** (the `complete_with_misses`
shape authorized **in advance** — this is what lets §B-5 take its verb without proxying an owner), **§0j.C
KF-WRITE** (substrate = the sacred checkout on `master`; a wave pushes at close, a unit does not), **§0t**
(KF.W10 belongs to SS-2 — recorded, not re-minted), **§0a** (227/227 @ `35fc8ebf`; kf 58/58, SS-10b CLOSED —
row 14's receipt).

**ACT 1 — the ONE dated addendum, appended (E-3: append-only, never a patch).**
`ADDENDUM 2026-09-18 — X.KF.W10 `.a`: THE §B DISCHARGE TABLE (G-1) AND THE CARRY-FORWARD RECORD BLOCK`, one
heading (⟨cmd⟩ `grep -c '^# ADDENDUM'` → **1**), holding, in one motion and in one commit: the **15-row §B
discharge table**, the **per-verb count table**, the **three dated corrections carried**, the **4-record
CARRY-FORWARD block beside it**, **`CARRY-C-3`'s claimant roster** with one verb per claimant, and the **three
KF.W8 R-4 re-open triggers verbatim**. **Dispositions CARRIED, never re-derived** (§2 — *W10 consumes; it
never cures*): not one row's disposition was re-decided at this seat; what this seat did was **resolve every
evidence coordinate at the bytes** and stamp the verb the adjudication already carried.

**ACT 2 — a defect this seat found IN ITS OWN FIRST WRITE, cured before the commit (recorded, not hidden).**
The first draft of the table reprinted alphabet tokens **inside four evidence cells** — row 2 (`FOLDED-TO`
twice), row 5 (`RULED` inside a quoted §6.B clause), row 8 (the struck `FOLDED-TO KF.W4` token reprinted in
the very cell whose spec text says *"its verb token is deliberately not reprinted"*), row 14 (`LANDED` **and**
`FOLDED-TO` in the "would misdescribe it" clause). **G-1's falsifier convicts a row carrying two verbs**, and
row 8's case was the spec's own instruction violated one clause after quoting it. All four cells were reworded
**without touching a single disposition, verb or evidence coordinate** — the tokens were removed, the meaning
kept (*"the struck claim's verb token is deliberately NOT reprinted"*, *"re-verbing it as a landing or as a
fold"*, *"the third evidence form declared for this verb"*, §6.B's lock paraphrased instead of quoted).

**ACT 3 — measurement arithmetic corrected at this seat (RECEIPT-ARITHMETIC-FIRST).** The first per-row verb
probe published `grep -coE … ` as an **occurrence** count; on BSD that is a **line-match** count and would have
read `1` for a row carrying the same token twice — i.e. **the probe could not have caught the ACT-2 defect it
was written to catch**. Re-run as `grep -oE … | wc -l`, the true occurrence arithmetic, and published as such.

**AFTER — G-1 gate reading at the landing bytes, double-run** (⟨cmd⟩ `git show HEAD:docs/tranches/V/FOLD-FORWARD.md`):

| probe | reading (run 1 ≡ run 2) |
|---|---|
| §B source rows | **15** — unchanged, the denominator lock holds |
| discharge rows | **15** (⟨cmd⟩ `grep -cE '^\| \*\*([0-9]\|1[0-5])\*\* \|'`) |
| **true verb occurrences over those 15 rows** | **15** — **exactly one per row**, per-row vector `1:1 2:1 3:1 4:1 5:1 6:1 7:1 8:1 9:1 10:1 11:1 12:1 13:1 14:1 15:1` |
| per-verb split | `RULED` **2** (5, 8) · `FOLDED-TO` **4** (2, 3, 7, 12) · `STANDING-CARRIED` **8** (1, 4, 6, 9, 10, 11, 13, 15) · `DISCHARGED-BY-CONSTRUCTION` **1** (14) · `LANDED`/`KILLED`/`ENUMERATED-NOT-MINTED` **0** on §B. **2+4+8+1 = 15** |
| CARRY-FORWARD records | **4** (`KF-W8-R-4-STRUCT-PAIR` · `CARRY-C-3` · `CARRY-C-4` · `CARRY-C-5`) — beside the table, in **no** denominator |
| `CARRY-C-3` roster | **12** `LANDED` rows + **2** `ENUMERATED-NOT-MINTED` rows = **14 live**, + **1** enumerated strike (no verb) = **15 = C-17.R's row count** |
| **§A/§B/§C byte-unchanged** | ⟨cmd⟩ `git show HEAD:<file> \| head -54 \| shasum` → **`797029037559bbc64d935285065f83ae2fb958b9`** ≡ ⟨cmd⟩ `git show origin/master:<file> \| shasum` → **identical**. **E-3 honoured at the byte** |
| file | **41,438 B · 246 L** (was 9,289 B · 54 L) |

**G-1: RED → GREEN.** 15/15 §B rows carry exactly one terminal verb from §3.1's declared alphabet, each with
the evidence form that verb requires, every coordinate resolved **at this seat**; §A/§B source text
byte-unchanged; the denominator is 15 and only 15; the record block sits beside it and enters no arithmetic.

**EVIDENCE COORDINATES, each resolved at this seat (the gate's falsifier is *on the target*, not the prose):**

| §B | verb | target, resolved |
|---|---|---|
| 1 · 4 | STANDING-CARRIED | `COHESION.md` **§4a** — heading `:116`, dispatch row `:129` (*"the table resumes accreting for the next boundary"*, O-20 **DISPATCHED 2026-08-28** without the aurora cargo). Row 1's surface-verify leg = **KF.W9 §Bounds' capture-receipt row**, anchor-only (LAW C(3)) |
| 2 | FOLDED-TO `COHESION-SC-1` | §4a's **first** register row `:120`. **Collision receipt, counting rule stated (unit = LINE; the `ESC-1` substring class excluded)**: ⟨cmd⟩ `grep -n 'SC-1' COHESION.md \| grep -v 'ESC-1'` → `:120` `:129` (**2**); same over `registry/adjudicated/kf-SequenceScene.md` → `:13 :28 :57 :58 :106 :149 :154 :158` (**8**), `:58` the live NO-WAVE-OWNER getter row, `:149` *"SC-1..SC-8 minted here for life"*. Both double-run. ⟨The spec's round-4 **five**-coordinate reading is a **dated observation superseded at these bytes** — recorded, not re-derived; the collision is unchanged and `:58`/`:149` both reproduce⟩ |
| 3 | FOLDED-TO (two §Bounds anchors) | ⟨cmd⟩ `grep -c 'TransportDock' KF-W6.md` → **12**; ⟨cmd⟩ `grep -c 'SS-13-CAPTURE-RECEIPT' KF-W9.md` → **5** (both double-run). **Both ends carry the subject — the seam is two-ended and agreeing.** The four subsumed names are **not** registry ids: ⟨cmd⟩ `grep -l 'CH2-02\|BG-5\|GU-1\|subject-legible' registry/adjudicated/kf-*.md \| wc -l` → **0 files of 58**, double-run |
| 5 | RULED | **Owner quotes** at kf `origin/master:docs/tranches/V/OWNER-DECISIONS.md` **`:7`** (*"THE TRANSPORT-HOME RULING IS HELD FOR CAPTURE REVIEW"*) and **`:9`** (*"THE AT-REST REOPEN QUESTION IS DEFERRED PENDING GLASS'S DOCK MARK"*), + **COHESION §0j.C KF-ODV3** for the `complete_with_misses` shape **authorized in advance**. *"Never proxied."* carried verbatim; the two closures remain **`.c`'s act** at the owner block |
| 6 | STANDING-CARRIED | `formation/keyframes/lane-docs.md` **row 14** ⟨`:378`⟩, quoted whole: *"**IN-ATLAS-3 fence** … the fence held through every V restructure … **STANDING; verified held**"*. ⟨**Dated observation, recorded not re-derived**: the row keys the fence **IN-ATLAS-3**, §B-6 keys it **IN-ATLAS-5**; the row's own source column names `FOLD-FORWARD.md §B-6`, so the two spellings are **one** obligation. **Re-keyed nothing** — §2 forbids this wave from curing it⟩ |
| 7 | FOLDED-TO `KF-APP-21` | ⟨cmd⟩ `grep -n 'KF-APP-21' registry/adjudicated/kf-App.md` → `:26` `:71` `:159`; `:71` routes **KF.W6** (*config unification, NOT deletion*). §B-7's open question is **answered by the bank** |
| 8 | RULED | `conformance/PASS-3/RULINGS-3.md` **LAW A** at **`:12`** — the import-graph law, quoted with its path. The round-1 phantom fold is **struck**, its token not reprinted |
| 9 | STANDING-CARRIED | **G-7, the named gate receipt + its arm.** State at this clock: ⟨cmd⟩ `git ls-remote --heads origin \| grep w9` → `b920b1902b4854c1bc7c5778d1674436dd51dce6 refs/heads/v/w9-staging`; ⟨cmd⟩ `git merge-base --is-ancestor b920b190 origin/master` → **UNMERGED**; **G-7 RED/unstamped**. LAND ⇒ the landing CI witness; KILL ⇒ the tombstone's MR2 unit |
| 10 | STANDING-CARRIED | the CH-02 sentence carried **verbatim**; nothing re-worded (its own text makes a re-wording the defect) |
| 11 | STANDING-CARRIED | byte authority **184,430 B** + the two reads re-run in kf this seat: ⟨cmd⟩ `grep -n '"version"' package.json` → `:3 "6.0.0"`; ⟨cmd⟩ `grep -n '^## ' CHANGELOG.md \| head -1` → `:6 ## 6.0.0`, **no Unreleased section** → **no cut since; the watch carries un-fired** |
| 12 | FOLDED-TO `KF.W0` | `KF-W0.md` **§Carry** `:355`, row **C-1** `:361` (the `F-1 ≡ SCH-1` chain) + **§B-12**. **Asserted, never performed**: kf branch `master`, `HEAD` **`69095552`** = `origin/master`, ⟨cmd⟩ `git rev-list --left-right --count HEAD...origin/master` → **`0 0`** (pre-commit), snapshot ref `kf-sacred-snapshot-2026-09-17` present |
| 13 | STANDING-CARRIED | the 9-item charter carried verbatim **+ the §9.1 COLLISION FLAG STATED**: *batches-of-3 agent law* vs the value.js owner cap **max 4 concurrent workflows (2026-07-24)** — two owner-issued laws, **both carried, neither adopted**; this wave's 6-serial shape sidesteps it by construction and is **no precedent** |
| 14 | DISCHARGED-BY-CONSTRUCTION | `COHESION.md` **§0a** — *"227/227 units banked at `35fc8ebf` … keyframes **58/58 (SS-10b CLOSED)**"*; re-measured ⟨cmd⟩ `ls registry/adjudicated/kf-*.md \| wc -l` → **58**, double-run |
| 15 | STANDING-CARRIED | §B-15's *"no kf action"* verbatim + **CC-084** (*"no emergency 4.0.1 — ruled"*, `CARRY-CUT-LEDGER.md:186`, cited at `INBOX.md:104` O-21 §C) through **gate-keyed PLAW-BIND**; KF.W3's repin spelled **`4.0.0 → V`, `V` = what `RC-P(V)` resolves to** (KF-W2 D-8), never a version literal. **The verb is stamped; the cut is not scheduled; parse-that→fourier stays FORBIDDEN** |

**§6.A ORDERING 3 — SATISFIED BY MEASUREMENT, NOT BY FALLBACK.** The brief's contingency (*"if KF.W0's C-17
mint has not landed, C-3/C-5 read `STANDING-CARRIED — pending the KF.W0 C-17 mint`, never a guessed slot"*)
**does not apply: the mint HAS landed.** Receipts: KF.W0's execution record, **G-0.6 GREEN** — *"the mint ran
in ONE motion … `^#### S-` **12** (`S-9`…`S-20`, each citing its record) … 2 enumerated and 1 struck against
C-17.R's 15 rows"*; the landing commit is value.js **`a331fae6`** (2026-09-17, *"…and the C-17 mint"*); the
slots resolve in the **only namespace where a slot id resolves** — ⟨cmd⟩ `grep -c '^#### S-'
formation/keyframes/lane-frontend.md` → **12**, `grep -c '^### S-'` → **8** (§5 heading `:260`). Every id in
`CARRY-C-3`/`CARRY-C-5` is therefore **quoted from the mint's own assignment**; **nothing is guessed and
nothing is minted here** (R-5: C-17 is the only slot authority). `CARRY-C-5`'s slot = **`lane-frontend.md §5
S-17`** ⟨`:918`, *the `/command` family shadowed*⟩, C-17's assignment for kf-KeyboardShortcutsModal's **`C-9`**,
with the seat's own S-9→S-10 renumber recorded **superseded**, not benefited from.

**`CARRY-C-4` — the verb, not the deletion.** **`RULED DELETE, 2026-09-18, KF.W6`**, citing **KF-W6 §Gates
`G-W6-4`** as the measurement of record (`.tap-floor` → **2 hits / 1 file**, `design-idioms.css:81` comment +
`:82` selector → **0 adopters**). The ruling is **KF.W6 `.b`'s** (*"decided ONCE for the whole demo: DELETE"*)
and the act's bytes are **KF.W6 `.e`'s** at `c6608042` — this record files the **ruling**, never the deletion.
Both locks carried whole: the **premise-correction lock** (the *"44px house practice"* premise is DEAD; SC
2.5.8's boundary math and the shipping 32px answer survive) and the **KF-SST-30 companion** (glass
`touch-hit-area` cannot expand a target, which is why DELETE was not the free option it looks like).

**THE THREE RE-OPEN TRIGGERS — carried VERBATIM and verified byte-exact**: ⟨cmd⟩ `grep -c 'This decline
re-opens on any ONE of three conditions' KF-W8.md` → **1**; the passage is carried whole from **`KF-W8.md`
§Sequencing · the `Rulings this file is required to make` block `:395` · `R-4`'s *"TRIGGER, named"* clause
`:411`** — the corrected §-spelling (*"KF-W8 §Rulings"* is a phantom this file's own §6.C-E already struck).
**Trigger (1) is stated rather than left to be noticed: X·KF's close IS this wave, so it fires the moment the
record is written** — which is exactly why the conditions travel **with** the ruling. **Carrying is not
scheduling**: no flatten performed, no ruling re-opened, no successor act scheduled.

**COMMIT (§10 commit 1 — the discharge table and its carry block in ONE commit, never split).**

| # | repo | hash | scope |
|---|---|---|---|
| 1 | keyframes.js | **`025e894c`** | `docs(X·KF W10): FOLD-FORWARD §B 15-row discharge + 4-record carry-forward block` — pathspec `docs/tranches/V/FOLD-FORWARD.md` **on the commit itself**; body carries the per-verb counts, every evidence coordinate, **both denominator locks asserted explicitly**, and the C-17 consumption receipt. ⟨cmd⟩ post-commit `git status --porcelain` → **the same 2 untracked value letters and nothing else**; ⟨cmd⟩ `git rev-list --left-right --count HEAD...origin/master` → **`1 0`** (this unit's commit; **a wave pushes at close, a unit does not** — §0j.C KF-WRITE) |

**RESIDUALS (named, none hidden).**
1. **G-1's frontier witness is not yet reproducible**: the gate's stated probe is `git show origin/master:…`,
   and the commit is at local `HEAD` (+1). **This is the wave's push at close (`.f`), not a unit's** — the
   reading above is taken at the landing bytes and is stated as such.
2. **Row 5 stamps `RULED` while the two `complete_with_misses` closures are `.c`'s act.** The verb rests on the
   owner's own two rulings (HELD / DEFERRED) plus §0j.C's advance authorization — **not** on a closure that
   does not yet exist. `.c` must file both citing their **exact** preconditions (SS-13-CAPTURE-RECEIPT `:35`'s
   *0 of 16 cells*; glass's dock mark), or row 5's evidence half goes unproduced.
3. **Row 9's watch is armed to `.e`.** It dies with G-7's verb and must not outlive it in either direction.
4. **Row 6's fence carries two id spellings** (IN-ATLAS-3 / IN-ATLAS-5) for one obligation — recorded as a
   dated observation; **re-keying is not this wave's act** and is handed to the successor as-is.
5. **`CARRY-C-5`'s two-ended routing** (bank says *"→ KF.W6"*, R2-2 rules it *"definitionally W10's"*) is
   **recorded, not dissolved** (§9 dissent 5): the record cites the bank's coordinate and the ruling by id, so
   the trail is one hop either direction. **It may not be filed twice** — if KF.W6 also files it, that is the
   double-filing the dissent names.

**ESCALATIONS: none.** Every act landed inside the declared writable set; the specified cure was possible at
the bytes and was executed as specified — no substitution, no workaround, no masking fallback, no `test.skip`,
no allowlist, no local patch.

---

### KF.W10.b

**SERVED MODEL**: `claude-opus-5[1m]` · **Unit** `KF.W10.b` · group 2 of 7 (alone) · **sections executed**
§3.2 `:268-282` + §5 **G-2** `:396-419` (+ §2a **OP-5** `:69` · §4 Bounds/Disjointness · §6.D `:579-602` ·
§10 commit 2). **Seat clock** 2026-09-18 23:3x → 23:5x EDT (⟨cmd⟩ `date` → `Fri Sep 18 23:41:39 EDT 2026`
mid-run). **Sitting of record stays 2026-09-17.** **Status: DONE — G-2 turns RED → GREEN at the landing
bytes.** **Writable set honoured exactly**: `value.js docs/tranches/X/COHESION.md` (the §4 register-drain leg),
and nothing else in either tree. **No push** (§0j.C KF-WRITE: a wave pushes at close, a unit does not). **No
ledger edit** (the wave's close moves the row). **No keyframes.js write** — `.b`'s bounds leg is value-side
only.

**CRASH-RECOVERY SWEEP (standing law, first act).** ⟨cmd⟩ `git status --porcelain` in both repos:
**keyframes.js — 2 rows**, both untracked value-authored letters
(`docs/tranches/V/coordination/VALUEJS-INBOUND-2026-07-{24,27}-*.md`), **outside this seat's writable set,
left in place**. **value.js — 18 rows at open, every one outside this seat's writable set** (`demo/**` ×10 ·
`docs/tranches/V/reformation/CARRY-LEDGER.md` · `scripts/dev/dev.sh` **never touched, never staged** ·
untracked `docs/tranches/X/parse-that/evidence/W3/` ×3 + `docs/tranches/X/waves/evidence/W4/` + two
`e2e/smoke/**` + one `.tgz`). **INHERITED WORK ON THIS UNIT: NONE** — ⟨cmd⟩ `git status --porcelain --
docs/tranches/X/COHESION.md` → **zero lines** before this seat wrote, i.e. the file was at `HEAD` bytes
(⟨cmd⟩ `shasum` → **`8b2baaa81ffef0f41c34484131086b90927f00f5`**, **120,786 B**). Nothing stashed, nothing
restored, nothing reset; no dirty path outside the writable set was touched.

**BEFORE — G-2 baseline re-measured READ-ONLY at this seat, double-run** (the gate's own probe form):
⟨cmd⟩ `ls registry/adjudicated/kf-*.md | wc -l` → **58** · `grep -l 'NO-WAVE-OWNER' | wc -l` → **57** ·
`grep -o 'NO-WAVE-OWNER' | wc -l` → **1,218** (run 1 ≡ run 2); ⟨cmd⟩ `grep -L 'NO-WAVE-OWNER'` → the single
non-carrying record **`kf-AnimatedText.md`**. COHESION **§4 = 14 source rows + the `(accretes per batch)`
tail**, **no terminal word on any of them**; **no set-difference table existed anywhere** (⟨cmd⟩
`ls docs/tranches/X/keyframes/close/` → no such directory, at `.a`'s baseline). **G-2 = RED, exactly as §5
declares it born.**

**ANCHOR VERIFICATION AT TRUE BYTES (method: measure before you edit).** Every spec anchor this unit
consumes **resolved without drift**: §3.2 at `:268-282` (the head + the seven sequencing locks + R-10's
governed-row enumeration), §5 G-2 at `:396-419` (Statement · Witness · RED · Acceptance · the two inbound
declarations · Falsifier), §2a OP-5 at `:69`, §4 at `:342-366`, §6.D at `:579-602`, §10 at `:660-673`.
**No INTENT re-resolution was needed.** Spec read in slices (263,074 B); the wave record's sitting-1 and
sitting-2 Open/Baseline/Unit-plan and **`.a`'s receipt** read whole; **COHESION `§0j` read and every later
addendum to the file end** (`§0k` ×2 · `§0l` · `§0m` · `§0n` · `§0o` · `§0p` · `§0q` · `§0r` · `§0s` ·
**`§0t`**). **Rulings consumed**: **§0t** (KF.W10 belongs to SS-2 — **RECORDED, never re-minted**; it makes
this set-difference an OWNED assertion), **§0j.B** (GF-R1's `X-W3` claimant for the transport cluster and the
*"`ErrorBoundary.vue` contention at W0.22 stays X-W0's"* tail; GF-R3's **RATIFY §1** making the fold +
canonical layers the register of record — the authority arm 2's drain rests on), **§0j.C KF-WRITE**.

**ACT 1 — the sweep, computed rather than asserted (the partition is the product).** The left hand's arm 1
was partitioned by **measurement**: each of the 57 carrying records was tested against the three successors'
`### P*` / `### U*` §Carry **heading** lines (the packet home-record roster) → **37 hit · 20 miss**,
double-run; each of the 20 was then tested against the eleven authored specs' `§Bounds` blocks → **20 of 20
resolve, 0 unresolved**. **37 + 20 = 57**, + `kf-AnimatedText` = **58**.

**ACT 2 — a defect this seat found IN ITS OWN FIRST PROBE, cured before a word was written (recorded, not
hidden).** The first partition probe tested each record name against the successors' **whole §Carry
sections**, and returned **40 homed / 17 residual**. Three of the forty were **cross-references, not homings**
— re-read at the bytes: `kf-AnimationControlsGroup` appears only as *"the C-15 limb settled WITH
kf-AnimationControlsGroup **D-1**'s portal-architecture cure"* (a consumption), and `kf-ChannelControls` only
as *"kin recorded, **not folded**: kf-ChannelControls L-16, KF-CO-15"* — a clause that says in its own words
that it is not a home — with `kf-EasingScene` likewise a bullet mention. **A substring in a packet's prose is
not a packet's home**, and publishing 40 would have manufactured three homings the successors expressly
declined. The probe was re-cut onto the **heading** lines (the construct KF-W11's §Carry preamble names: *"the
home record's terminal `NO-WAVE-OWNER — the … packet` line, cited by record + anchor"*), returning the
published **37 / 20**, and the three records were homed where they actually resolve — **KF.W6's bounds block**.

**ACT 3 — the block, landed as ONE dated carve inside §4.** `### §4.1 — X.KF.W10 `.b` · THE NO-WAVE-OWNER
SET-DIFFERENCE (G-2), ∅ IN BOTH DIRECTIONS — 2026-09-18`, holding, in one motion and one commit: the
**OP-5 re-measure**, the **two denominators**, the **SELF-COUNT statement**, **§4.1.A** (arm 1, the 57
records, one terminal word each), **§4.1.B** (arm 2, §4's 14 intake rows drained), **§4.1.C** (the right hand
+ the 9·6·2 reconciliation + the right→left ∅ argument), **§4.1.D** (the seven sequencing locks verbatim),
**§4.1.E** (KF-AV-28 as sweep input), **§4.1.F** (the two inbound declarations), **§4.1.G** (the gate
reading). **§4's 14 intake rows were NOT rewritten**: the drain is recorded beside them and the table's
`(accretes per batch)` tail gains one **`DRAINED 2026-09-18`** pointer row. Reason stated rather than assumed
— the register's intake bytes are the record of *what was found*, and a close wave that edits the finding to
fit its own disposition has closed nothing.

**AFTER — G-2 gate reading at the landing bytes, double-run** (⟨cmd⟩ over `docs/tranches/X/COHESION.md`):

| probe | reading (run 1 ≡ run 2) |
|---|---|
| left hand, arm 1 | **58 records · 57 carrying · 1,218 occurrences** ⟨the spec's **1,216** is a dated 2026-08-28 observation, superseded **+2**; membership 58/57 reproduces exactly⟩ |
| arm-1 rows written | **57** (⟨cmd⟩ `grep -cE '^\| [0-9]+ \| `kf-'`) + **1** enumerated non-carrying record (`kf-AnimatedText`, no verb, not in the left hand) |
| arm-1 rows with **no** terminal word | **0** (⟨cmd⟩ the same rows `grep -cvE 'LANDED in a wave\|KILLED-with-rationale\|ADOPTED-BY-KF\.W6\|carried'` → **0**) |
| left hand, arm 2 | **14** §4 intake rows · **14** drained · **0** silent |
| **total sweep rows / terminal words** | **71 / 71 · 0 silent** |
| right hand, half 1 | **11** authored specs, **11** bounds blocks (`W0 17 · W1 12 · W2 53 · W3 4 · W4 40 · W5 43 · W6 59 · W7 36 · W8 46 · W9 49 · W10 12` `Bounds` hits) |
| right hand, half 2 | **§6.D's 17-packet cargo**, reconciled ⟨cmd⟩ `grep -c '^### P[0-9]' KF-W11.md` → **9** · `grep -c '^### U[0-9]' KF-W12.md` → **6** · `grep -c '^### P[0-9]' KF-W13.md` → **2**; **9+6+2 = 17** |
| §6.D reconciliation rows | **3**, each summing to its wave's partition figure |
| seven §3.2 sequencing locks | **7** reproduced, verbatim, none spent or narrowed |
| KF.W7 surface rows | **6** — six KEEP-BESPOKE, **zero SWAP**, discharge set **EMPTY** |
| `DISCHARGED by KF.W7 SWAP verdict` **stamped on a row** | **0** (the string occurs **twice** in the block, both in prose: `:125` the alphabet, `:332` the *"emits ZERO"* sentence) |
| **E-3 at the byte** | ⟨cmd⟩ `git diff --stat` → **260 insertions, 0 deletions**; ⟨cmd⟩ `git diff -U0 \| grep -c '^-[^-]'` → **0**; §4's 14 intake rows `shasum` → **`1d3017bea88b3de1970a01d750982eac15f4d5a5`** at HEAD **≡** at the worktree. **No dated section touched** |
| file | **149,324 B**, `shasum` **`603189d2ef2e92038bd4715cbe4d848ea3ec4b2e`** (was 120,786 B / `8b2baaa8…`) |

**G-2: RED → GREEN.** ∅ in both directions, both denominators stated in the block's own header and
re-measured at the write.

**OP-5, RE-MEASURED AT THIS UNIT'S OPEN *AND* AT THE SETTLED BYTES** — the gate's own falsifier is *"a table
computed against a sibling bounds block that changed after the sweep fails on OP-5, not on arithmetic"*, so
the condition is checked at **both** ends: ⟨cmd⟩ `ls .../waves/KF-W[0-9].md KF-W10.md | wc -l` → **11** ·
per-spec `grep -c 'Bounds'` → the eleven figures above, **identical before and after** · ⟨cmd⟩
`git status --porcelain -- docs/tranches/X/keyframes/` → **zero lines at both clocks**. **No sibling bounds
block moved under this sweep. OP-5 GREEN.**

**THE SEVEN SEQUENCING LOCKS — reproduced, and the two that bind rows W10 never touches named as such.**
(1) KF-CO-1/KF-CO-8 sequenced by **LP-1** (riding KF.W12 U2, whose §Carry fixes *"+ LP-1 in the SAME
commit"*) · (2) **kf-ChromeDock M-4** ships an unopenable menu without the **MbabbMenu MUST-CARRY rider**
(KF.W13 P1 carries it by name) · (3) **TD-1/TD-2 bundle** WHOLE at KF.W13 P2, its sole home · (4)
**KF-APP-1/-17 same motion**, the `headerLeft` **'fill' arm a TRAP**, DELETE the only self-contained cure
until the **KF-APP-5** producer relay lands — homed inside an authored wave, which is why §6.D's six
travelling locks exclude it · (5) **comment-stated invariants are test obligations** — kf-SquareScene
**MISS-3**, measured RELOCATED by KF.W11 P7 to `useSquareKeyboard.ts:20`/`:66` with its content unchanged ·
(6) **glass-producer rows → SS-6, never demo-side hacks** (glass-ui READ-ONLY always) · (7) **KF-AV-28's
standing supersession rider**. **Six of the seven are §6.D's six travelling locks; the seventh (4) is not,
for the reason §6.D itself gives.**

**KF-AV-28 AS A SWEEP INPUT — the verdict EXISTS, and reading it is the whole point.** KF.W7 is **CLOSED
2026-09-17**; its verdict is **six surfaces · six KEEP-BESPOKE · ZERO SWAP** ⟨`.a`'s G1, `4c03ceda`⟩ and the
**discharge set is EMPTY**. KF.W7's own words to this gate — *"the discharge set is EMPTY; every row governed
by the KF-AV-28 standing supersession rider is STILL-GOVERNED, and KF.W10 carries all of them naming the
surface each sits under"* — are honoured literally: **zero** rows stamped `DISCHARGED`, and every governed row
**carried** under its named surface (`KeyframeTimeline / TimelineTrack rail` · `TimelineCaret` ·
`TimelineHoverPreview` · `SequenceScrubber` · `AnimationVisualizer` · `SpringTarget / SpringTrace idiom
arms`), with the individually-landed rows named as **LANDED, not discharged** (`C-10` `e42e0aa3` · `L-15` ·
`KF-AV-10` `72cdc27a` · `C·C-4` `43556828`). **The rider's prohibition is satisfied in the direction that
mattered**: no governed row took LANDED or KILLED on the strength of a swap, **and none took DISCHARGED on the
strength of a verdict that kept**.

**ZERO RE-BOOKINGS, asserted and shown.** Every fold is **by reference at the banked id**; **no id was
renumbered, re-keyed or minted**. Four records appear under two packets — `kf-SequenceScrubber` (P2 + P9),
`kf-SpringPhysicsFacet` (P5 + U2/U3), `kf-RibbonBar` (U4 + U5), `kf-TransportDock` (W13 P1 + P2) — and in
every case the limbs are cited at **different banked anchors of the same record**, which is a fold by
reference and not a second booking. The two **`ADOPTED-BY-KF.W6 (RULINGS-4 R4-1)`** rows (`KF-APP-41`; the
kf-EditorShell `C-22` orphan-token limb) are received **by adoption, never by omission**, with **`C-22`'s
remaining limbs `D-27` and `RR-2 M7` left NO-WAVE-OWNER and carried** — R4-1's own falsifier honoured. KF.W6's
round-5 **SHADOW** notification (`EH-4` · `EH-5` · `EH-8` restored LIVE) is **recorded and not converted into
an obligation**: the three read `LANDED in a wave`, no denominator moved, nothing was booked here.

**THE MINTED-UNAUTHORED PREMISE, MOVED AT THE BYTES AND HANDLED AS THE RECORD DIRECTS.** `KF.W11 · KF.W12 ·
KF.W13` are **AUTHORED** ⟨`f208ff31`, 2026-09-18⟩ with real `§Bounds` and `§Carry` blocks, so the spec's
*"MINTED-UNAUTHORED"* wording at §6.D and G-2's right hand is **stale**. Per this record's own sitting-2
finding (2), the right hand is computed in **the spec's form** — `authored bounds ∪ §6.D cargo` — and the
successors' own blocks are used **only as a reconciliation**: `9 · 6 · 2`, member-for-member, each wave named.
**The round-4 falsifier is not tripped**: authored bounds alone was never substituted. **The three
formations' terminal verb was not advanced** — that is not `.b`'s act (R-A; §3.6 is `.f`'s), and the authoring
event is recorded as a dated observation, not as a re-ruling (E-3).

**COMMIT (§10 commit 2 — one commit, one meaning).**

| # | repo | hash | scope |
|---|---|---|---|
| 2 | value.js | **`15da439f`** | `docs(X·KF W10): NO-WAVE-OWNER set-difference, ∅ both directions` — pathspec `docs/tranches/X/COHESION.md` **on the commit itself**; body carries **both denominators**, the **37+20=57** partition, the **9+6+2=17** reconciliation, the **zero-re-bookings** assertion, the KF-AV-28 reading and the E-3 receipt. ⟨cmd⟩ `git show --stat` → **1 file changed, 260 insertions(+)**; ⟨cmd⟩ `git show --name-only \| grep -c 'dev.sh'` → **0**; post-commit `git status --porcelain` → **the same sibling-owned rows and nothing of this seat's** |

**RESIDUALS (named, none hidden).**
1. **`LANDED in a wave` is an OWNERSHIP word, not a shipping word**, and the block says so at its head. Forty
   of the 57 arm-1 rows land at `KF.W11`/`KF.W12`/`KF.W13`, which are **authored but unexecuted**. The
   NO-WAVE-OWNER condition is cured; the cures are not. Any reader who takes this green as "the rows are
   fixed" has read a word this block explicitly refuses to say.
2. **Arm 2's homes rest on the fold layer's own HOMED law**, ratified by §0j.B GF-R3 (*"the fold + canonical
   layers ARE the register of record"*), measured as `grep -c` presence per fold file with the top booking
   fold named. That is the authority the ruling installed; it is **not** a per-row byte audit of each X·V
   fold, which is X-W11's walk, not this close's.
3. **Three arm-2 rows carry a live limb beside their landing** — AboutPane's **W-HYGIENE** limb (`BOOK
   TERMINAL, explicitly NOT ADOPTED`), PaletteCard's **R-4** registry-hygiene row (no wave surface), and
   PreviewStrip's **re-trigger** (*"X-W9.d/.f named gaps DEGRADE to NO-WAVE-OWNER if unadopted at
   execution"*). All three are written as **carried**; none is closed.
4. **The `AnimationVisualizer` residual roster is carried, not homed.** KF-AV-13/-14/-24's cures and KF-AV-32
   (relayed as **O-28 R-6**) **stay NO-WAVE-OWNER** by KF.W7's own words. A future seat reading only "row 27
   = LANDED" would miss it; the row names both arms for that reason.
5. **G-2's frontier witness is value-side and already at `HEAD`**; there is no push here (**a wave pushes at
   close, a unit does not**, §0j.C KF-WRITE). `.f`'s close carries it.

**ESCALATIONS: none.** Every act landed inside the declared writable set (`COHESION.md` alone); the specified
cure was possible at the bytes and was executed as specified — no substitution, no workaround, no masking
fallback, no allowlist, no local patch, no sibling tree written, no dated section rewritten.

**CORRECTION BY THIS SEAT, dated 2026-09-18, to its own crash-recovery cell above (receipt-arithmetic-first;
the cell is left standing and corrected beside itself, never patched).** The cell reads *"value.js — 18 rows
at open"* and then enumerates **nineteen** (`demo/**` ×10 · `CARRY-LEDGER.md` · `dev.sh` · three
`parse-that/evidence/W3/` files · `waves/evidence/W4/` · two `e2e/smoke/**` · **one `.tgz`**) — **a receipt
whose own arithmetic does not reproduce.** **The number 18 is correct and the enumeration is wrong**: this
seat's `git status --porcelain` at open returned **12 modified + 6 untracked = 18**, and
**`mkbabb-value.js-4.0.0.tgz` was NOT among them** — it appears in the session-start snapshot this seat was
handed, not in the porcelain this seat ran, and a snapshot is not a measurement. **Strike `+ one .tgz`;** the
twelve modified were `demo/**` ×10 · `docs/tranches/V/reformation/CARRY-LEDGER.md` · `scripts/dev/dev.sh`, and
the six untracked were the three `docs/tranches/X/parse-that/evidence/W3/animation-grammar-landing-2026-09-18.*`
files · `docs/tranches/X/waves/evidence/W4/` · `e2e/smoke/a11y-control-targets.spec.ts` ·
`e2e/smoke/mobile/a11y-control-targets.spec.ts`. **Nothing about the finding changes** — every one of the
eighteen was outside this seat's writable set, none was touched, `dev.sh` was never staged, and **INHERITED
WORK ON THIS UNIT: NONE** stands on its own probe (`git status --porcelain -- docs/tranches/X/COHESION.md` →
zero lines). The defect was the enumeration, not the sweep.

---

### KF.W10.c

**SERVED MODEL**: `claude-opus-5[1m]` · **Unit** `KF.W10.c` · group 3 of 7 (alone) · **sections executed**
§3.3 `:284-289` + §5 **G-3** `:421-431` + **G-4** `:433-457` (+ §4 §Bounds/§Disjointness `:342-366` · §6.A
ordering 2 `:505-511` · §7 `:606-628` · §10 commit 3 `:660-673`). **Seat clock** 2026-09-18 23:49 → 2026-09-19
00:2x EDT (⟨cmd⟩ `date` → `Fri Sep 18 23:49:41 EDT 2026` at baseline). **Sitting of record stays 2026-09-17.**
**Status: DONE — G-3 and G-4 both turn RED → GREEN at the landing bytes.** **Writable set honoured exactly**:
`keyframes.js docs/tranches/V/OWNER-DECISIONS.md`, and nothing else in either tree (this record excepted, which
every unit appends to by dispatch). **No push** (§0j.C KF-WRITE: a wave pushes `origin HEAD` at close, a unit
does not). **No ledger edit** (the wave's close moves the row). **No glass-ui byte written** — glass-ui was
**read only**, at two tracked letters named in the block, per the standing READ-ONLY-always law.

**CRASH-RECOVERY SWEEP (standing law, first act).** ⟨cmd⟩ `git status --porcelain` in both repos at open:
**keyframes.js — 2 rows**, both untracked value-authored letters
(`docs/tranches/V/coordination/VALUEJS-INBOUND-2026-07-{24,27}-*.md`), **outside this seat's writable set,
left in place** (they are `.f`'s mail substrate, not `.c`'s). **value.js — 15 rows, every one outside this
seat's writable set** (`demo/**` ×10 · `docs/tranches/V/reformation/CARRY-LEDGER.md` · `scripts/dev/dev.sh`
**never touched, never staged** · untracked `docs/tranches/X/waves/evidence/W4/` + two `e2e/smoke/**`).
**INHERITED WORK ON THIS UNIT: NONE**, proven at the file this unit owns and not inferred from the summary —
⟨cmd⟩ `git status --porcelain -- docs/tranches/V/OWNER-DECISIONS.md` in kf → **zero lines**; ⟨cmd⟩
`git diff --stat origin/master -- <that path>` → **empty**; ⟨cmd⟩ `shasum` →
**`804e29c075b8ac684cd461cc254049253cfaf8a0`**, **9 lines · 2,967 B**, i.e. byte-identical to the frontier
before this seat wrote. Nothing stashed, nothing restored, nothing reset; no dirty path outside the writable
set was touched.

**BEFORE — the two gates re-measured READ-ONLY at this seat, at their own probe forms.**

- **G-3 = RED.** ⟨cmd⟩ `git show origin/master:docs/tranches/V/OWNER-DECISIONS.md | sed -n '7p'` → *"**THE
  TRANSPORT-HOME RULING IS HELD FOR CAPTURE REVIEW.**"* · `sed -n '9p'` → *"**THE AT-REST REOPEN QUESTION IS
  DEFERRED PENDING GLASS'S DOCK MARK.**"* — both HELD/DEFERRED at the frontier; **no owner block existed**
  (the file is 9 lines, a header and one table). OG-KF1 already **RULED** at COHESION §0j.C `:926-929` but
  **nowhere transcribed into an owner block**, which is what the gate asks for.
- **G-4 = RED.** ⟨cmds, run in `docs/tranches/`, **double-run, run 1 ≡ run 2**⟩
  `grep -rlE '357/414|86\.23|0/5 slots' X/ V/megatranche/ | wc -l` → **34 files** ·
  `grep -rhoE … | wc -l` → **112 occurrences** · `grep -rcE … | awk -F: '{s+=$2} END {print s}'` → **78 lines**.
  **The register did not exist** — ⟨cmd⟩ `grep -rl 'never-cite register' docs/tranches/X/keyframes/` → the
  spec and the PASS-n checks only, no register anywhere. Sitting-2's baseline read **34 / 108 / 77**; the
  `+4 occ / +1 line` delta is **`.b`'s receipt**, which landed inside the witness field.

**ANCHOR VERIFICATION AT TRUE BYTES (method: measure before you edit).** Every spec anchor this unit consumes
**resolved without drift**: §3.3 at `:284-289` (the two numbered items + the RE-ANCHOR CORRECTION paragraph),
G-3 at `:421-431`, G-4 at `:433-457`, §4 at `:342-366`, §6.A at `:505-511`, §10 at `:660-673`. **No INTENT
re-resolution was needed.** Spec read in slices (263,074 B — it defeats a whole-file read twice over); the
wave record's sitting-1 and sitting-2 Open/Baseline/Unit-plan read whole, plus **`.a`'s and `.b`'s receipts**;
**COHESION `§0j` read and every later addendum to the file end** (`§0k` ×2 · `§0l` · `§0m` · `§0n` · `§0o` ·
`§0p` · `§0q` · `§0r` · `§0s` · `§0t`). **Rulings consumed**: **§0j.C KF-OGKF1** (quoted, not paraphrased),
**§0j.C KF-ODV3** (the `complete_with_misses` authorization for both owner rows), **§0j.C KF-WRITE** (unit
does not push), **§0m.2** (iOS UNREACHABLE-IN-CELL, which is *why* the OD-V3 packet reads zero), **§0t**
(KF.W10 belongs to SS-2 — recorded, never re-minted).

**EVERY CITED COORDINATE RE-RESOLVED BEFORE IT WAS WRITTEN (KF-AT-28).** Not one was transcribed from the
spec: `INTAKE-ADJUDICATION-2026-08-03.md:82` (the *"3 are genuinely unlocatable external coordinates"*
sentence) · `:116` (conflict **C-8**, the slot disagreement, verbatim) · `:163-166` (the KF.W10 carry block,
which names the boundary block as the triple **B18-23 + B19-14 + B20-14** — a true source the spec's §3.3 list
does not spell) · `:232` (OG-KF1's question) · `CENSUS-2026-08-03.md:326` · `kf-ChromeDock.md:142`/`:147` with
⟨cmd⟩ `grep -oE 'DISSENT[ -]*[0-9]+'` → **0 hits**, confirming the positional key is positional ·
`challenge-C-consumption.md:11` (the tally itself) and `:15` (its own Round-3 concession) ·
`kf-EditorHeader.md:86` (killed-claim #8), `:40` (EH-1), `:139` (D-1's two repo-qualified letters) ·
`SS-13-CAPTURE-RECEIPT.md:35`, `:44-48`, `:62-73`, `:80`, `:97`.

**ACT 1 — the owner block (G-3), three rows, and the discipline is that none of them is a ruling this seat
took.** **OG-KF1 RULED**, transcribed from COHESION §0j.C `:926-929` and then **proven verbatim by command**
rather than by eye: ⟨cmd⟩ `sed -n '926,929p' COHESION.md > a; sed -n '/^> \*\*KF-OGKF1\*\*/,/^> lineage.s
pin/p' OWNER-DECISIONS.md | sed 's/^> //' > b; diff a b` → **no output — character-identical**. **OD-V3 and
OD-V5 closed `complete_with_misses`**, each citing a **named artefact at a measured coordinate**, because
G-3's falsifier kills a precondition written as prose: OD-V3 → `SS-13-CAPTURE-RECEIPT.md:35` *"INCOMPLETE ·
**0 of 16 required cells**"* with the 4 × 2 × 2 axis table at `:44-48` and the two blocking limbs at `:62-73`
(limb (iii), real Glass 7, explicitly **not** the blocker); OD-V5 → the producer's own coordinates: the **G-2
ask** at glass-ui `BI/coordination/keyframes-inbox-2026-07-17-v-formation-batch.md:27` (quoted), the **390
at-rest observation NOT OBSERVED** at `SS-13:80`, and the **dock-contract re-verify 0 of 4 marks** at
`SS-13:97`. **The rows at `:7` and `:9` were not touched** — they keep their 2026-07-17 words, and the
`complete_with_misses` is recorded beside them, never over them.

**ACT 2 — a live producer letter this seat found and REFUSED to adjudicate, recorded rather than buried.**
While resolving OD-V5's precondition to a named artefact, this seat read (read-only, tracked) glass-ui
`docs/tranches/BI/coordination/glass-outbound-2026-07-17-keyframes-marks-placed.md:9-15`: *"**The G-1/G-2
activation oracle is LANDED in-tree, ahead of the tag** — `f1e88fe2` adds the single-click
activation-at-rest acceptance arms: DOCK-SPINE desktop … and DOCK-CROSSFADE mobile (390×844)."* **This bears
directly on OD-V5's precondition and a block that omitted it would be hiding its own evidence.** It is
recorded as a **dated observation beside the closure**, with the distinction stated in the block: **what
landed is the acceptance ORACLE — the arms that would detect the defect — not the dock repair mark and not
the 390 at-rest observation**, at a 2026-07-17 letter on the 7.0.0 boundary. **This seat ruled nothing about
it**: glass-ui is READ-ONLY always, the standing edict routes OD-V5 and every glass row to **SS-6**, and
`SS-13:78` names the chain — *"glass-ui (the dock mark) → the SS-6 relay → KF.W10 `.g`. Three hands, none of
them here."* **Routed to SS-6 and `.g`, not ruled.**

**ACT 3 — the never-cite register (G-4), seven entries, ordinals binding.** One table, entries **(1)…(7)** in
§3.3.2's order and no other, each naming the coordinate, **where it is actually filed**, its supersession or
true source, and a terminal disposition. ⟨cmd⟩ `grep -oE '^\| \*\*\([1-7]\)\*\*' OWNER-DECISIONS.md | sort |
uniq -c` → **1 each for (1)…(7)**, `grep -c` → **7 rows**: the ordinal lock holds by measurement, not by
intent. Entry **(7)** — not (6) — carries the **REPO-SCOPED, NOT ABSENT** restatement, as G-4's acceptance
requires, and the restatement was **re-measured at the landing substrate** rather than copied: ⟨cmd⟩
`git ls-tree -r --name-only origin/master | grep -i headerribbon` → the kf letter **EXISTS**; ⟨cmd⟩
`git show origin/master:<it> | wc -l` → **26** lines, head *"HeaderRibbon consumer updates for the
post-Glass-7 refresh"*, 2026-07-16; the value.js archive letter is present (2,878 B) and is a **different
document** (*"HeaderRibbon goes persistent-only (V-A92 supersession mark)"*, archived 2026-07-17). EH-1's
substance is untouched. Entry **(5)** settles nothing — settle-or-drop is one act, a third figure fails on
sight, and the count sits inside **OG-V1**'s enumeration (§6.C-F), so a settling here would manufacture the
conflict the register exists to prevent. Entry **(6)** names the tally unquotable and **stops** — §7 makes
restating that arithmetic the downstream consumer's act, not the register's.

**ACT 4 — the witness re-run and RE-PARTITIONED at this seat (R2-5), and the partition checks itself.**
Four classes, because the spec's round-5 table has three and the field has since grown a fourth kind of
member: **live X·KF wave specs 3 files / 27 occ / 18 L** (`KF-W0` 2 · `KF-W3` 2 · `KF-W10` 23 — reproducing
the spec's round-5 cell **exactly**) · **conformance artifacts 7 / 30 / 19** (**two new members**, both
**PASS-6** checks, named as the class's own note predicts) · **megatranche substrate 19 / 44 / 34**
(membership unchanged, and **every per-file LINE figure in the spec's round-5 enumeration reproduces
term-for-term**, summing to 34) · **X·KF execution + artefact records 5 / 11 / 7** (declared as its own class
rather than folded into a neighbour). **3+7+19+5 = 34 · 27+30+44+11 = 112 · 18+19+34+7 = 78** — the partition
**checking itself against all three totals the commands returned**; no figure in the block was produced by
subtraction (LAW D(3)). **ZERO BARE CITATIONS IN THE LIVE-SPEC CLASS, verified per line rather than asserted**:
each of the 4 live-spec hits was tested for `345` **and** `8281638c` on its own line → **4 of 4 carry both**
(`KF-W0:378`, `KF-W0:695`, `KF-W3:209`, `KF-W3:329`); neither of the other two tokens occurs in `KF-W0.md` or
`KF-W3.md` at all.

**ACT 5 — A FINDING AGAINST THE GATE'S OWN WITNESS, recorded loud and NOT absorbed into a green.** The
witness regex is unanchored, and its percentage token matches **any numeric substring**:
`X/parse-that/evidence/W3/equivalence-full-surface.json:9765` and `:11567` are hits solely because an **X·P
CSS-parser equivalence corpus** contains the input `oklch(88.720 86.234 -0deg)` — a chroma value in a
different sub-tranche's evidence file, **not a citation of anything**. So **2 of the 112 occurrences are
instrument artefacts and the true citation field is 111.** This changes **no verdict** (a non-citation falls
outside the adjudicable class by construction, and the gate's subject is the partition), but a register that
prints a figure it knows to be inflated commits the defect it exists to forbid. **The gate's command was NOT
edited** — the spec is E-3 immutable and this unit's only writable path is `OWNER-DECISIONS.md` — so the
correction is **booked in the register, dated, and routed to `.g`** for a bounded regex at whatever artefact
next re-prints the field. **No spec byte was touched to make a number look better.**

**LANDING — write-then-measure, at the settled bytes.** ⟨cmd⟩ `wc -l -c OWNER-DECISIONS.md` → **235 lines ·
25,780 B** (from 9 · 2,967). **E-3 proven by the diff itself, not by assurance**: ⟨cmd⟩ `git diff --numstat`
→ **`226  0`** — **226 insertions, ZERO deletions**, so no pre-existing line was modified and the 2026-07-17
table is byte-unchanged. Append-only honoured; the conditional grant honoured (the block is appended because
the rulings and their authorized closures exist, not to fill a slot).

**COMMIT — §10 commit 3, pathspec on the commit itself.** ⟨cmd⟩ `git add docs/tranches/V/OWNER-DECISIONS.md
&& git commit --no-verify --quiet -m … -- docs/tranches/V/OWNER-DECISIONS.md` → **`27ec9c37`**
*"docs(X·KF W10): owner block + never-cite register (7 entries)"*, body carrying the three rows with their
exact preconditions and the seven entries with their supersessions, per §10's *"body required: yes — the
three rulings or their exact preconditions."* ⟨cmd⟩ `git show --name-only --format= HEAD | grep -c .` → **1**
— **one path, no sibling seat's work swept in**; ⟨cmd⟩ `git show --stat` → `1 file changed, 226 insertions(+)`.

**AFTER — the gate readings at the landing bytes.**

| gate | BEFORE | AFTER | the reading that moved it |
|---|---|---|---|
| **G-3** | **RED** — 0 of 3 closed; `:7` HELD, `:9` DEFERRED, no owner block anywhere | **GREEN** | **3 of 3 closed**: OG-KF1 **RULED** and quoted **character-identically** (proven by `diff`, no output) with its date and hand; OD-V3 and OD-V5 **`complete_with_misses`**, each citing a **named artefact at a measured coordinate** — `SS-13:35`'s *0 of 16 required cells*, and glass's dock mark at three producer/receipt coordinates. **None proxied, none defaulted, no transport home implemented.** |
| **G-4** | **RED** — the register did not exist; seven coordinates unregistered | **GREEN** | **One register, seven entries**, ordinals **(1)…(7)** measured at 1 occurrence each, entry **(7)** carrying the **REPO-SCOPED, NOT ABSENT** restatement re-measured at `origin/master` `69095552`; witness **re-run double-run and re-partitioned into four classes summing exactly to all three totals**; **zero bare citations in the live-spec class**, verified line-by-line. |

**RESIDUALS — carried, named, and owned elsewhere; none of them a green in disguise.**
1. **The unanchored-percentage instrument artefact** (2 of 112 occurrences are an oklch chroma in an X·P
   evidence corpus). Booked in the register, **routed to `.g`**. Not curable here: the gate's command lives in
   an E-3-immutable spec outside this unit's writable set.
2. **OD-V3's and OD-V5's substance stays open by construction.** The closures are procedural, not
   dispositive: `.g`'s sitting re-reads `SS-13:35` at its own clock, and **SS-6** owns the glass dock-mark
   question including whether `f1e88fe2`'s activation oracle is the mark OD-V5 awaits. **This unit ruled
   neither, and says so in the block itself.**
3. **The register lives in keyframes.js while the specs it governs live in value.js** — the consequence of
   §4 §Bounds granting `.c` this file alone. `.f`'s `FINAL-KF.md` carries it **by reference**, and the
   reference resolves under **L-6** (⟨cmd⟩ `git cat-file -e origin/master:docs/tranches/V/OWNER-DECISIONS.md`
   → exit 0 at the frontier; the addendum itself is at `27ec9c37`, local until the wave's close pushes).
4. **Not pushed** — §0j.C KF-WRITE reserves `origin HEAD` for the wave's close. `27ec9c37` sits on kf
   `master`, one commit after `.a`'s `025e894c`, both ahead of `origin/master` `69095552`.

**ESCALATIONS: none.** The specified cure was possible at the bytes and was implemented as specified. **No
improvisation, no workaround, no masking fallback**: no try/catch around a defect, no skip, no allowlist, no
producer selector copied, no `node_modules` patch — and, at the one place where a shortcut was available
(editing the gate's own regex so the field would read clean), the defect was **recorded and routed instead**.

**SELF-COUNT LAW.** The witness field was **34 files / 112 occurrences / 78 lines** at this unit's baseline
and **unchanged at 34 / 112 / 78** after the register landed, **double-run both times** — the first G-4 write
in this gate's history that does not move its own witness, because this unit's writable path is in
**keyframes.js**, outside the field (`value.js docs/tranches/X/` + `docs/tranches/V/megatranche/`). **This
receipt, however, lands inside the field**, and its own contribution, measured at these settled bytes, is in
the line below.

**⟨cmd⟩ at the settled bytes, double-run: this record now carries 9 occurrences on 4 lines (it carried 6 on
2 at this unit's baseline), so THIS RECEIPT CONTRIBUTES 3 occurrences on 2 lines, carrying the field to 34
files / 115 occurrences / 80 lines.** ⟨**A drafting error caught by this seat's own write-then-measure and
recorded rather than quietly corrected**: the first draft of this line printed *"8 occurrences on 6 lines →
34 / 120 / 84"* — **a figure produced by estimation where a command was available**, which is precisely the
numeric arm's subject (LAW D(3)) and the defect G-4's round-4 cell was struck for. It was overwritten by the
measurement **before this receipt was committed**, so the settled bytes never carried it; it is booked here
because a self-count law that hides its own near-miss is decoration. The corrected line carries **no witness
token**, so re-reading it does not move the number again — the count is a fixpoint at these bytes.⟩

### KF.W10.d

**SERVED MODEL**: `claude-opus-5[1m]` · **Unit** `KF.W10.d` · group 4 of 7 (alone) · **sections executed**
§3.4 `:291-300` + §5 **G-5** `:459-469` (+ §4 bounds rows `:354-358` · §10 commit 4). **Seat clock**
2026-09-19 00:03 → 00:3x EDT (⟨cmd⟩ `date` → `Sat Sep 19 00:03:18 EDT 2026` at open). **Sitting of record
stays 2026-09-17.** **Status: DONE — G-5 turns RED → GREEN at the landing bytes.** **Writable set honoured
exactly**: four CREATED files, each beside one of the five bound originals in `keyframes.js`, and nothing
else in either tree. **No push** (§0j.C KF-WRITE: a wave pushes `origin HEAD` at close, a unit does not).
**No ledger edit**, **no COHESION edit**, **no sibling-spec edit**.

#### Act 0 — crash-recovery sweep (STANDING LAW, first act)

⟨cmd⟩ `git status --porcelain` in both repos this seat may write:

- **keyframes.js — 2 rows**, both untracked value-authored letters
  (`docs/tranches/V/coordination/VALUEJS-INBOUND-2026-07-{24,27}-*.md`). Outside this unit's writable set;
  left in place, nothing stashed.
- **value.js — 15 rows**, every one outside this unit's writable set, `scripts/dev/dev.sh` among them
  (**unowned, NEVER touched, never staged**).
- **Inherited work on KF.W10.d: NONE.** None of the five bound paths appears in either porcelain, and no
  addendum existed beside any of them (Act 1's BEFORE is the measurement). kf HEAD at open **`27ec9c37`** —
  `.a`'s `025e894c` and `.c`'s `27ec9c37` on top of `origin/master 69095552`; nothing of `.d`'s was begun.

#### Act 1 — BEFORE baseline, re-measured at this seat (G-5's own probes, double-run)

| probe | reading at open |
|---|---|
| the five bound originals present | **5 of 5** at the worktree bytes (`docs/tranches/G/audit/r-animation-sota.md` · `docs/tranches/U/audit/lane-22-perf-demo-runtime.md` · `docs/tranches/U/waves/U.D.md` · `docs/tranches/T/stage-manifests/home.json` · `docs/frontend-design/demo/home.md`) |
| ⟨cmd⟩ `git ls-tree -r --name-only 27ec9c37 \| grep -icE 'addend'` | **7** — the O/V-lane letters and the five `vnext/OWNER-ADDENDUM-*` pages, **none beside any of the five** (identical to the sitting-2 baseline's `origin/master` reading, so `.a`/`.c` moved this probe by zero: both appended INSIDE their own bound files, which G-5 forbids for its five) |
| ⟨cmd⟩ `git ls-tree -r --name-only 27ec9c37 -- docs/tranches/T/stage-manifests/ \| grep -c 'home\..*\.md'` | **0** — no sidecar |
| addenda existing | **ZERO of four** — **RED, exactly as §5 declares** |

#### Act 2 — the anchors, re-resolved at the landing substrate BEFORE writing (§3.4's re-anchor law)

Substrate: keyframes.js `master` **`27ec9c37`**, **worktree bytes**, never `git show`.

| # | anchor | what occupies it at these bytes | verdict |
|---|---|---|---|
| 1 | `r-animation-sota.md:109` | the `- **Where (verified):**` bullet of `### G26-3`, carrying both falsified halves | **RESOLVES — the anchor** |
| — | `r-animation-sota.md:107` | the `### G26-3` section heading | **label only, never an anchor** (§3.4.1's declared re-anchor, honoured) |
| 2 | `r-animation-sota.md:253` | the `F26-4 SplitText / demo grapheme` ledger row | **RESOLVES** |
| 3 | `lane-22-perf-demo-runtime.md:110-112` | *"imports only `@lucide/vue` `List`, `AnimatedText`, `TypingDots` … zero engine dependency"* | **RESOLVES** (single spelling; the struck variants used nowhere) |
| 4 | `U.D.md:194` | *"has ZERO engine dependency"* | **RESOLVES** |
| 5 | `home.json:9` | the `sanctioned` aurora entry naming `proof:cursor-light-subtle` | **RESOLVES** |
| 6–8 | `home.json:2` · `:13` · `:16` | the rider's three `proof:hero-two-focal` clause-(c) sites (`_doc` · `forbidden[1]` · `status`) | **ALL THREE RESOLVE** (the declared correction from `:11`, carried) |
| 9–11 | `home.md:67` · `:187-191` · `:367` | the three `liftDown` claims | **ALL RESOLVE** |

⟨cmd⟩ each re-run at close, double-run: `sed -n '109p'` → `Where (verified)` **1** · `sed -n '253p'` →
`F26-4 SplitText` **1** · `sed -n '110,112p' | grep -c zero` → **1** · `U.D.md:194` → **1** ·
`home.json` `:9`/`:2`/`:13`/`:16` → **1·1·1·1** · `home.md` `:67;187,191;367` → **5** `liftDown` lines.
**No anchor drifted; no INTENT substitution was needed.**

#### Act 3 — the four addenda, written BESIDE, never inside (E-3)

| # | row | CREATED file | states |
|---|---|---|---|
| 1 | **KF-AT-21** | `docs/tranches/G/audit/r-animation-sota.KF-AT-21-ADDENDUM-2026-09-19.md` (6,091 B) | both halves of `:109` falsified at the tree, and **ledger row `:253` RE-OPENED**; the G-lane verdict text at `:112` **never patched** |
| 2 | **KF-EST-23** | `docs/tranches/U/audit/lane-22-perf-demo-runtime.KF-EST-23-ADDENDUM-2026-09-19.md` (5,297 B) | **exactly two claims** corrected (one per document), the correction boundary stated in full |
| 3 | **KF-HA-4** (doc arm) | `docs/tranches/T/stage-manifests/home.KF-HA-4-ADDENDUM-2026-09-19.md` (5,685 B) — **a SIDECAR**, never an inline comment | both named oracles dissolved at `70b32501`; **KF.W4's oracle fate BY REFERENCE, no bound re-derived** |
| 4 | **KF-AT-26(e)** | `docs/frontend-design/demo/home.KF-AT-26e-ADDENDUM-2026-09-19.md` (4,763 B) | `liftDown` is a name the tree does not carry; the shipped mechanism is `charLift` |

Line 1 of each = `SERVED MODEL: claude-opus-5[1m]` (⟨cmd⟩ `head -1` over all four → four identical lines).
**Addenda 1, 2 and 4 are ONE motion** and ride commit 4 with addendum 3 — one commit, four files (§10 row 4).

**The substantive measurements each addendum publishes, all double-run at the settled bytes:**

- **KF-AT-21.** ⟨cmd⟩ `grep -rniE "splitText|Intl\.Segmenter|grapheme" src/ | wc -l` → **73** ≡ **73**;
  `grep -rliE … | wc -l` → **6** ≡ **6**; `ls -1 src/animation/orchestration/split-text/ | wc -l` → **4** ≡
  **4** — the *zero-hit grep* of `:109` does not reproduce, because the **engine primitive SHIPPED** at
  KF.W5 `.c` (`2549c133`, `c0727002`). And the per-char split is **not gone**:
  `AnimatedText.vue:106` `.split(/\s+/)` **and** `:111` `chars: w.split("")` both ship. Cure fates stated
  **by reference**: **KF-AT-4 LANDED** at `77d0e0b1` (the KF.W4 ∥ KF.W6 atomic bundle — `usability.mjs`
  `DECLARED_HERO_TITLE:89` / `DECLARED_HERO_GLYPHS:100`, clause (2c) at `:337`), **KF-AT-3 NOT SPENT**
  (`execution/B/KF-W6.md` §9 and its commit-A cell `59ce4ca5`).
- **KF-EST-23.** ⟨cmd⟩ `grep -n '^import' …/EditorStartScreen.vue` → **`:136-138`**, the three named imports
  and no fourth; `sed -n '65,68p'` → `<TypingDots />` **inside the LCP `<h1>`** at `:67`;
  `grep -n 'onMounted\|loadAnimationEngine' …/TypingDots.vue` → `:133` / **`:137` `await
  loadAnimationEngine()`**. The import list is true, the conclusion is false **transitively**.
  **Correction-boundary lock carried**: F3's transposition verdict **survives on corrected premises**; the
  `main.ts` elision charge **stays retired**; `lane-22:121` recorded as the **same claim's evidence line**,
  not a third claim; the `@utils/kfEngine.ts` specifier **not re-opened** (outside the boundary; no
  measurement of it asserted).
- **KF-HA-4.** ⟨cmd⟩ over `demo/ src/ test/ scripts/`: `proof:hero-two-focal` → **0** ≡ **0**;
  `proof:cursor-light-subtle` → **1** ≡ **1** — and that one hit is **prose** at
  `test/demo/instrument/aurora-opacity-ceiling.test.ts:8`, **found and disqualified by name**, never counted
  as an oracle; ⟨cmd⟩ `ls -1 scripts/ | grep -c proof` → **0**. KF.W4's fate cited, never re-derived:
  `test/demo/instrument/aurora-opacity-ceiling.test.ts` (created `c5c0b889`, **3,992 B**) reading the
  `export const` in HeroAurora's **module-scope** `<script lang="ts">` (`:35` opens it, const at `:58`),
  with `execution/B/KF-W4.md` Act 4 as the receipt. **The blessed number and the strict inequality are NOT
  restated** — the SPLIT-LOCK's whole point. The carried cure-correction (a `<script setup>` compile-local
  has nothing to import; the assertable surfaces are the rendered `--aurora-opacity-ceiling` on
  `.aurora-root` or an `export const`) is written at the sidecar.
- **KF-AT-26(e).** Counting rule stated at the enumeration — lines are `grep -c`, occurrences `grep -o`.
  ⟨cmd⟩ `grep -c 'liftDown' home.md` → **8 lines** ≡ **8**; `grep -o … | wc -l` → **9 occurrences** ≡ **9**
  (`:367` names it twice); ⟨cmd⟩ `grep -rn 'liftDown' demo/ src/ test/ scripts/ | wc -l` → **0** ≡ **0**.
  The shipped mechanism is **`charLift`** (`AnimatedText.vue:169`, applied `:165`, delayed `:166` over the
  KF-AT-16 registers; PRM at `:193`/`:195-196`), and ⟨cmd⟩ `sed -n '78,91p' | grep -cE '@keyframes|<style|liftDown'`
  → **0**: the coordinate all three sites cite carries **no keyframes block** at these bytes.

#### Act 4 — one declared decision, stated rather than drifted into (R2-2's ADDENDUM-SET LOCK)

KF-EST-23 is **ONE addendum over TWO originals** that live in different directories
(`docs/tranches/U/audit/` and `docs/tranches/U/waves/`). The set lock fixes the addenda at **four** and
names a fifth as *the defect, not the cure*, so the file sits beside the **first-named** original
(`lane-22-perf-demo-runtime.md`, the bank's own coordinate) and addresses `U.D.md:194` inside it **by full
path and anchor**, with the placement declared in the addendum's own opening. **Four addenda, four files,
no fifth.** ⟨cmd⟩ beside-check (`dirname` of each addendum ≡ `dirname` of its original) → **BESIDE ×4**.

#### Act 5 — commit (§10 commit 4), pathspec only

**`b50a23de`** — `docs(X·KF W10): four doc-truth addenda (E-3, originals byte-unchanged)`; ⟨cmd⟩
`git show --stat` → **4 files changed, 363 insertions(+), 0 deletions(-)**; body carries the per-addendum
findings and the E-3 assertion; `Claude-Session` trailer present. Pathspec named on `git add` **and** on
`git commit … -- <the same four paths>`; **no `-A`, no `-u`, no `-a`**; the two untracked kf letters and
every value.js dirty row were untouched by it (⟨cmd⟩ post-commit `git status --porcelain` → the same 2 kf
rows, unchanged).

#### Act 6 — gate reading, BEFORE → AFTER

| gate | BEFORE (this seat's own baseline, Act 1) | AFTER (settled bytes, double-run) |
|---|---|---|
| **G-5** — doc-truth addenda, four documents | **RED — AS DECLARED**: zero addenda; `addend`-named files **7**, none beside any of the five; `stage-manifests/` sidecars **0** | **GREEN.** Four addenda exist **beside — never inside** — the originals: `addend`-named files **7 → 11** (exactly +4, ⟨cmd⟩ `git ls-tree -r --name-only HEAD \| grep -icE 'addend'` → **11** ≡ **11**); `stage-manifests/` now carries its `home.*.md` **sidecar** (**0 → 1**; the directory reads **10** members, 9 manifests + the sidecar). **E-3 — the gate's own falsifier, measured both ways and double-run**: ⟨cmd⟩ `git diff -- <the five originals>` → **0 lines** ≡ **0**; ⟨cmd⟩ `git diff --cached -- <the five>` → **0** ≡ **0**; ⟨cmd⟩ `git diff origin/master -- <the five>` → **0** ≡ **0** — **not one changed byte in any original**, and ⟨cmd⟩ `node -e JSON.parse(home.json)` → **PARSES** (the manifest took a sidecar, never an inline comment). Anchors re-resolved at the landing substrate before writing (Act 2) and again at close. **Correction-boundary lock** held (exactly two claims, neither reinstated); **SPLIT-LOCK** held (KF.W4's oracle fate by reference, no bound re-derived) |

**The acceptance clause, item by item**: 4 addenda ✔ · `git diff` empty on the originals ✔ (measured over
**five**, a superset of the four the clause names) · anchors re-resolved at the landing substrate ✔ ·
KF-EST-23 corrects exactly two claims and reinstates neither ✔ · KF-HA-4 states KF.W4's oracle fate by
reference ✔ · the set is four and did not grow ✔.

#### Act 7 — findings and residuals, routed not smoothed

- **R-1 (routed to `.g` / the successor ledger, NOT re-graded here).** `:253`'s row is stale in **both**
  directions, and only one was named at the bank: the demo-fix's discharge does not hold (the per-char split
  is present) **and** *"engine primitive STILL BOOK"* is no longer true either (it shipped at KF.W5 `.c`).
  The addendum re-opens the row on both legs. A close wave re-grades no G-lane disposition, so G26-3's
  `:112` **BOOK** verdict is left exactly as the G lane wrote it.
- **R-2 (recorded, not corrected).** `lane-22:121` repeats the `EditorStartScreen.vue:61-63` coordinate as
  claim 1's Evidence bullet, and that coordinate has drifted to `:136-138`. It is the **same claim's
  evidence**, so correcting it would have been the third correction the boundary lock forbids; it is booked
  in the addendum as a recorded drift instead.
- **R-3 (carried).** KF-HA-4's `proof:hero-two-focal` **clause (c)** limb has **no rebuilt instrument** —
  KF.W4 re-armed the ceiling bound only. None is minted here (a close wave spends no cure); the sidecar
  carries the gap to the next formation's ledger by name.
- **R-4 (found and disqualified, never counted).** The one surviving `proof:cursor-light-subtle` hit is
  prose inside KF.W4's own replacement test. Recorded as non-oracle context rather than silently dropped —
  *"found and disqualified"* is the only reading a census may claim.
- **R-5 (SELF-COUNT law).** This unit's writes are all in **keyframes.js**, outside G-4's witness field
  (`value.js docs/tranches/X/` + `docs/tranches/V/megatranche/`), so the four addenda move that field by
  **zero**. This receipt lands **inside** the field, and it carries **none** of G-4's three witness tokens:
  ⟨cmd⟩ at the settled bytes, double-run, the record's token count is **unchanged at 9 occurrences on 4
  lines** — this receipt contributes **0 and 0**, and re-reading it cannot move the number.

**Escalations: NONE.** The specified cure was possible at the bytes in every one of its four limbs; nothing
was substituted, and no write landed outside the unit's §4 bounds.

---

### KF.W10.e

**Seat**: `claude-opus-5[1m]`, 2026-09-19 (⟨cmd⟩ `date` → `Sat Sep 19 00:2x EDT 2026`). **Spec sections
executed**: §3.5 `:302-330` (incl. LAW A's census block) + §5 G-7 `:489-499`. **Gate owned**: **G-7**.
**Writable set**: kf branch `v/w9-staging` @ `b920b190` — the only branch this wave touches; landing
substrate kf `origin/master` `69095552`. **Verb: LAND.**

#### Act 0 — crash-recovery sweep (STANDING LAW, first act)

⟨cmd⟩ `git status --porcelain` in both repos this seat may write.
**keyframes.js — 2 rows**, both untracked value-authored letters
(`docs/tranches/V/coordination/VALUEJS-INBOUND-2026-07-{24,27}-*.md`), outside this seat's writable set,
**left in place and never staged** (the final merge index was verified to be exactly 19 paths, all the
merge's own — see Act 6). **value.js — 5 rows**, every one outside this seat's writable set, including
`scripts/dev/dev.sh` (**unowned, NEVER touched**). **Inherited uncommitted work on KF.W10 `.e`: NONE** —
no source path in the branch's touch-set was dirty in either tree.

#### Act 1 — BEFORE baseline at the landing tree, read-only, double-run where published

Substrate: kf local `master` == source-identical to `origin/master 69095552` (the 3 commits ahead are
`.a`/`.c`/`.d`'s docs-only landings; ⟨cmd⟩ `git diff --stat origin/master HEAD -- ':!docs/'` → empty).

| probe | reading |
|---|---|
| `git ls-remote --heads origin \| grep w9` | **`b920b1902b4854c1bc7c5778d1674436dd51dce6  refs/heads/v/w9-staging`** — live |
| `git merge-base --is-ancestor b920b190 origin/master` | **UNMERGED** |
| `git rev-list --left-right --count origin/v/w9-staging...origin/master` | **2 229** — 2 ahead, **229 behind** (the spec's *"41 behind"* is superseded) |
| `npm run test:lib` | **112 passed \| 5 skipped (117)**; **1256 passed \| 3 expected-fail \| 14 skipped (1273)** |
| `npm run test:demo` | **39 files \| 286 tests passed** |
| `npx vitest run --project measure` | **2 files \| 3 tests passed** |
| `npx tsc -p tsconfig.test.json --noEmit` | **23 errors** |
| `npm run check:lib` | **3 errors** (TS6133; KF.W5-owned) |
| `npm run lint` | **4 dependency violations** (429 modules, 1553 deps) |
| `npm run proof:structure` | **PASS — 0 violations** |
| `npm run proof:publish` | **FAIL** — `proof:published-surface` 1 finding |
| kf CI at `69095552` (run **35413127952**) | **failure**, both jobs, at step **`npm ci`** |

**R.2 — GREEN-BEFORE-CURE: none.** G-7 RED at its own probe, as declared.

#### Act 2 — LAW A: the import-graph census, RE-DERIVED at the landing tree (never inherited)

The spec's census is dated to `origin/master 81a56990` and G-7's falsifier is explicit — *"A LAND that
prunes on this file's pasted census rather than re-deriving it at the landing tree fails on LAW A, naming
the module."* Re-derived here against **`69095552`**, both legs, with outputs.

**Leg 1 — specifier.** ⟨cmd⟩ `git grep -nF '<path-tail>' origin/master -- . ':!docs/'` for each of the six,
then the **basename-tail** spelling for each. **Zero import specifiers, all six.** Every non-`docs/` hit
found is **resolved and disqualified by name**: the module's own header/usage comments
(`bench/taxonomy.json:3` · `bench/typed-om-validate.mjs:1,26,124,163,164,180` ·
`scripts/probe-webkit-linear-accel.mjs:36`); a `$note` string **inside another member of the same prune
set** (`bench/taxonomy.json:90` → `typed-om-validate.mjs`); and three docblocks naming a **different,
`test/`-rooted** path (`bench/sync-step.bench.ts:129` · `test/physics/sync-step.test.ts:24` ·
**`CHANGELOG.md:359`** — the third was **not in the spec's enumeration** and is booked here).

**Alias roots enumerated, not assumed.** `tsconfig.json#paths` → **`@src/*`**, **`@mkbabb/keyframes.js`**.
`vitest.config.ts#resolve.alias` → **`@src` · `@mkbabb/keyframes.js` · `@styles` · `@state` ·
`@components` · `@composables` · `@utils` · `@kf-engine` · `@assets` · `@app`**. All twelve resolve into
`src/`, `demo/` or `assets/`; **none can reach `bench/` or `scripts/`**.

**Leg 2 — symbol / runner, read AT the frontier. THIS LEG VETOED TWO OF THE SIX.** The spec's census states
of both `.measure.test.ts` members: *"`vitest.config.ts:35` `benchmark.include = ["bench/*.bench.ts"]` —
**neither `.measure.test.ts` file is matched** (the 'no runner glob' reading reproduces)."* **It does not
reproduce.** `vitest.config.ts` has moved — `benchmark.include` now sits at **`:47`**, and at **`:84-91` a
THIRD declared project exists**: `{ name: "measure", include: ["bench/**/*.measure.test.ts"], environment:
"jsdom" }`, landed by **X.KF.W8 `.g`, commit `422c16c1`** — *"the two bench measure-test orphans are adopted
in place by a third declared project"*, whose own message reads *"Before this,
`bench/d3-changed-keys.measure.test.ts` and `bench/sync-step.measure.test.ts` were collected by nothing."*
**Four commits before this landing, inside this same tranche.** Measured, not inferred: ⟨cmd⟩
`npx vitest run --project measure` → **`Test Files 2 passed (2)` · `Tests 3 passed (3)`** (double-run,
identical). The glob `bench/**/*.measure.test.ts` matches **exactly** the two prune-set members and nothing
else on the tracked tree.

| module | consumer set at `69095552` | disposition |
|---|---|---|
| `bench/d3-changed-keys.measure.test.ts` | **`vitest.config.ts:84-91`, project `measure`** | **DELETE VETOED** |
| `bench/sync-step.measure.test.ts` | **`vitest.config.ts:84-91`, project `measure`** | **DELETE VETOED** |
| `bench/group-soa-integration.mjs` | ∅ | pruned |
| `bench/taxonomy.json` | ∅ | pruned |
| `bench/typed-om-validate.mjs` | ∅ | pruned |
| `scripts/probe-webkit-linear-accel.mjs` | ∅ | pruned |

The staging seat's own rule is what fires: its tombstone reads *"a live consumer would have vetoed the
delete (none did)"*. **One does now.** The only repoint that would make the delete safe is removing X.KF.W8's
`measure` project — undoing a sibling wave's landed cure, and out of this unit's bounds. **Four of six
deletions land; two are dropped and named.** `tsconfig.test.json:17` `include: ["test/", "bench/",
"demo/env.d.ts"]` still holds, so `bench/` remains inside the typecheck project — measured at Act 5, not
elided. **Post-landing re-check**: ⟨cmd⟩ `grep -rIF` over the merged tree excluding `docs/` → **0 live
references** to any of the four pruned modules.

#### Act 3 — the eight units' novelty, measured at the landing tree (the LAND/KILL decision)

*"Leaving the branch as-is is not a third option."* Both arms were priced at the bytes before choosing.

| unit | at `69095552` | verdict |
|---|---|---|
| **MR1** pageerror render assert | `grep -c pageerror` over the 3 observe scripts → **0 · 0 · 0** | **LIVE — lands** |
| **MR2** browser oracles | `grep -c 'browser oracles'` in `ci.yml` → **0**; all 5 oracle paths **PRESENT**, each still **`skipIf`**-gated | **LIVE — lands** |
| **MR3** `require_demo_green` | `deploy-pages.yml:12` `workflow_dispatch: {}`; both asserts still `if: … != 'workflow_dispatch'` — **the AV-4 bypass is still open** | **LIVE — lands** |
| **MR4** demo lane in CI | `package.json:47` already carries `"test:demo"` **verbatim**; `ci.yml` already runs it as **`demo correctness suite`** (X.KF.W4) | **CONVERGED — recorded, not wired twice** |
| **relabel** GS-03 | `package.json:53` still `proof:owner-golden`; 6 self-labels in `gates/visual/index.mjs` | **LIVE — lands** |
| **TC-5** trio | `test/support/withSetup.ts` **ABSENT** | **LIVE — lands** |
| **BV-2** golden | `test/group/static-weight-composite-golden.test.ts` **ABSENT** | **LIVE — lands** |
| **prune set** | all **6** paths **PRESENT** | **4 land · 2 vetoed (Act 2)** |

**Seven of eight units are still live at the landing tree.** A KILL would tombstone seven live cures —
including the only instrument that keys the blank-demo P0 on `pageerror` and the only closure of the AV-4
dispatch bypass. **VERB: LAND.**

#### Act 4 — the landing, with every staged premise re-derived at the moved bytes

⟨cmd⟩ `git merge --no-ff --no-commit origin/v/w9-staging` → **one conflict only**
(`.github/workflows/ci.yml`); everything else auto-merged. A **merge**, not a rebase-and-replay: it is the
form G-7's Statement measures (*"branch `v/w9-staging` is **merged**"*), it preserves `b920b190`'s ancestry
so the gate's own probe can flip, and it needs no force-push anywhere.

1. **`ci.yml` conflict — re-derived mechanically.** The conflict is exactly MR4's `demo suite` step against
   X.KF.W4's `demo correctness suite`, **the identical command**. X.KF.W4's step is kept; MR4's duplicate is
   **dropped** and the convergence is **recorded at the bytes** beside the surviving step. A second identical
   run is waste and a false second signal.
2. **The census veto executed** — ⟨cmd⟩ `git checkout HEAD -- bench/d3-changed-keys.measure.test.ts
   bench/sync-step.measure.test.ts`. Both present on the landed tree (**2,927 B · 7,068 B**).
3. **MR3 auto-merged onto the drifted file and was read whole**: `workflow_dispatch.inputs.require_demo_green`
   (default **true**) at `:19-24`, both asserts guarded `!= 'workflow_dispatch' || inputs.require_demo_green`
   at `:56`/`:59`, master's own job-level `if:` blocks at `:37-41`/`:73-77` intact.
4. **MR1 auto-merged** into the live `withPage`/`ok`/`fail` harness; ⟨cmd⟩ `node --check` on all four merged
   `.mjs` → **OK ×4**; ⟨cmd⟩ `python3 yaml.safe_load` on both workflows → **OK ×2**.
5. **Relabel complete**: ⟨cmd⟩ `grep -rn 'proof:owner-golden' package.json scripts/ .github/` → **0 hits**;
   `review:owner-golden` at `package.json:53` + 6 self-labels.
6. **TC-6's staged premise RE-DERIVED TRUE** — ⟨cmd⟩ `git grep -nE '\b(serialize|hydrate)\b' HEAD --
   src/animation/group/` → **0 hits**. The seam is still absent, so the `it.fails` fold is still correct and
   the positive control still carries the HANDOFF signal.
7. **TC-3's staged premise RE-DERIVED TRUE** — ⟨cmd⟩ `git grep -n 'expose-gc' HEAD -- . ':!docs/'` →
   **3 hits, all comments**; no runner, script or workflow wires the flag. The gc arm is still a tautology.
8. **BV-2 — the one cure the landing owed.** Its three layer factories were typed `AnimationLayerConfig`,
   whose `weight` and `enabled` became **required** in the intervening 229 commits: **+3 `tsc -p
   tsconfig.test.json` errors (23 → 26)**, all three in that file, measured before the cure. Cured at root —
   typed **`Partial<AnimationLayerConfig>`**, the constructor's own declared parameter type (`group.ts:182`,
   `AnimationGroupInput.layer`), over which the engine merges `defaultLayerConfig`
   (`{ zIndex: 0, weight: 1, op: "replace", enabled: true }`). **No value changed**: `addPlain` still omits
   `weight` so the default 1 fills it — the exact arm the golden's *"`weight` is inert on op:add"* row
   measures. **No cast, no skip, no allowlist.** Typecheck returns to **23**, the pre-landing baseline.
9. **The landing addendum** was appended to `docs/tranches/V/audit/W9-tombstones.md` under a dated
   2026-09-19 rule (**71 → 216 lines · 4,201 → 12,915 B**); **E-3: the staging seat's text above the rule is
   byte-unchanged**.

#### Act 5 — gates at the landed tree, BEFORE → AFTER, double-run

| probe | BEFORE | AFTER | reading |
|---|---|---|---|
| `npm run test:lib` | 112/5 files · 1256 + 3 xfail + 14 skip | **113/5 files · 1259 + 2 xfail + 14 skip** | **+1 file** = BV-2; **+3 tests**; **−1 expected-fail** = TC-6's fold. Exactly the landed cargo |
| `npm run test:demo` | 39 files · 286 tests | **39 · 286 — IDENTICAL** (≡ run 2) | **TC-5 VERIFICATION GREEN**: the `withSetup` mount harness + the three scene-composable migrations are **behaviour-preserving** |
| `npx vitest run --project measure` | 2 files · 3 tests | **2 · 3** (≡ run 2) | the veto held; the prune would have emptied this project's glob |
| `npx tsc -p tsconfig.test.json` | 23 errors | **23** (≡ run 2) | **zero landing-introduced typecheck errors**; `bench/` still in-program |
| `npm run check:lib` | 3 | **3** (≡ run 2) | unmoved |
| `npm run lint` | 4 violations | **4** | unmoved |
| `npm run proof:structure` | PASS, 0 | **PASS, 0** | unmoved |
| `npm run build:lib` | built | **built 1.55s** | — |

#### Act 6 — commit and push (§10 commit 5)

Merge index verified **exactly 19 paths, all the merge's own** before committing (⟨cmd⟩ `git diff --cached
--name-only`); the two untracked value letters stayed untracked. A merge commit cannot take a partial
pathspec, so the index itself is the pathspec and it was measured first.

- **`0a329c57`** — `chore(X·KF W10): v/w9-staging LANDED @ b920b190 — 7 of 8 units land, 2 deletes vetoed by
  the re-derived census` (the merge commit; body carries the census, the veto, MR4's convergence, the BV-2
  cure and the full battery).
- ⟨cmd⟩ `git push origin master` → **`69095552..0a329c57`**.
- **G-7's own probe, re-run at the remote**: ⟨cmd⟩ `git merge-base --is-ancestor b920b190 origin/master` →
  **origin/master CONTAINS `b920b190` — LANDED**. The branch ref is **left standing at `b920b190`** as the
  immutable staging record (E-3); it is now an ancestor of `master`, so the downstream ambiguity §6.B's
  W9-STAGING lock names is **dissolved by the merge**, not by deleting provenance.

#### Act 7 — the four CI-run witnesses, with IDs (L-2: never an `exit 0`)

| # | witness | id | conclusion |
|---|---|---|---|
| 1 | **ci** @ `0a329c57` · job *library gates (library tests + proof:publish)* | run **35421021299** · job **105838624630** | **failure at step `npm ci`** |
| 2 | **ci** @ `0a329c57` · job *demo correctness (browser roster)* | run **35421021299** · job **105838624704** | **failure at step `npm ci (demo consumer graph)`** |
| 3 | **deploy-pages** (workflow_run) · job *preflight (library CI + last-demo-green ancestry)* | run **35421048324** · job **105838704425** | **skipped** — ci did not conclude success |
| 4 | **deploy-pages** (workflow_run) · job *build demo + ship → Cloudflare Pages* | run **35421048324** · job **105838704801** | **skipped** |
| — | **control, PRE-landing** @ `69095552` | run **35413127952** | **failure at step `npm ci`**, both jobs — **identical colour and identical failure step** |

**The landing did not change CI's colour or its failure point**, and the control proves it at the
pre-landing SHA.

#### Act 8 — RED-PREEXISTING, named and routed, NOT cured here

⟨cmd⟩ `gh run view 35421021299 --log-failed`: *"`npm ci` can only install packages when your package.json
and package-lock.json … are in sync … **Missing: `@vue/test-utils@2.5.1` from lock file**"* — plus 14
transitives (`js-beautify`, `vue-component-type-helpers`, `config-chain`, `editorconfig`, `glob`,
`js-cookie`, `nopt`, `ini`, `proto-list`, `@one-ini/wasm`, `commander`, `minimatch`, `minipass`,
`path-scurry`, `abbrev`). **Origin measured**: ⟨cmd⟩ `git log --oneline -1 origin/master -- package.json` →
**`3a01e362`** *"build(kf · X.KF.W7.a): +@vue/test-utils ^2.5.1 devDependency — OP-4's residue (b), the
wave's ONE manifest add"*; ⟨cmd⟩ `git log --oneline -1 origin/master -- package-lock.json` → **`fb509edd`**,
an **earlier** commit. The manifest add never touched the lock.

`package-lock.json` is **not in this unit's writable set** (§4: *"EXPLICITLY NOT IN BOUNDS: any product
source in either repo"*), and regenerating it is a material dependency act belonging to the manifest's owner.
**It is named and routed, never quietly patched** — no `|| true`, no `continue-on-error`, no allowlist.

#### G-7 — gate reading, BEFORE → AFTER, clause by clause

| G-7 acceptance clause | reading |
|---|---|
| merge commit | **✔ `0a329c57`**, `b920b190` an ancestor of `origin/master` |
| LAW A census re-derived at the landing tree, pasted with outputs, both legs, alias roots enumerated | **✔ Act 2** — and it **changed the act**, vetoing two deletes by name |
| TC-5 verification | **✔** — `test:demo` **39/286 → 39/286 identical**, double-run |
| four CI-run witnesses | **✔ present with run + job IDs** (Act 7) — **all four RED/skipped**, at a failure point measured pre-existing and identical at the pre-landing SHA |
| MR4's CI red-once witness **at landing** | **✘ NOT OBTAINABLE** — the job terminates at `npm ci` before any test step; and MR4 itself **converged** into X.KF.W4's step, which landed declared-RED with its own history |
| §B-9's MR2 runner-parity observation (system Chrome vs pinned revision on the Linux runner) | **✘ UNDISCHARGED** — the `browser oracles` step never executed. **Recorded as a carried watch, never claimed** |

**G-7 = RED-HONEST (`complete_with_misses` shape).** The **landing act is complete** — verb stamped **LAND**,
seven live units landed, two deletes lawfully vetoed, zero regressions in any local probe. **Two of the six
acceptance clauses are CI-dependent and are blocked by a RED-PREEXISTING, out-of-bounds lockfile defect**
that the landing neither caused nor worsened. Claiming them would be exactly the falsifier G-7 names.

#### Residuals and escalations

- **ESC-e1 — `package-lock.json` out of sync at kf `origin/master`** (origin `3a01e362`, X.KF.W7.a). Blocks
  `npm ci` in **every** CI job, hence MR4's red-once witness and §B-9's MR2 runner-parity observation.
  **Out of this unit's §4 bounds; routed to the orchestrator / `.f` / `.g`.** Cure is the manifest owner's:
  sync the lock, re-run `ci`, then read the MR2 step's first real execution for the parity observation.
- **R-1 (carried, for `.f`/`.g`).** The **§B-9 watch row is NOT discharged** at this landing and must not be
  stamped as such. Its precondition is ESC-e1.
- **R-2 (banked, the census's own second proof).** The spec's LAW A census — the file's own **exemplar** for
  the law — was **stale at execution on two of its six modules**, and the staleness was created by a sibling
  wave of this same tranche four commits before the landing. The law's clause *"the next seat re-runs the
  census rather than inheriting this one"* is what caught it. Recorded, not re-ruled here.
- **R-3 (found and disqualified, never counted).** `CHANGELOG.md:359` names `test/d3-changed-keys.measure.test.ts`
  — a **different, `test/`-rooted** path, in a changelog. Not in the spec's enumeration; booked as non-import
  context. *"Found and disqualified"* is the only reading a census may claim.
- **R-4 (SELF-COUNT law).** This unit's product writes are all in **keyframes.js**, outside G-4's witness
  field (value.js `docs/tranches/X/` + `docs/tranches/V/megatranche/`). This receipt lands **inside** that
  field and carries **none** of G-4's three never-cite tokens (`357/414`, `86.23`, `0/5 slots`) — it
  contributes **0 files · 0 lines · 0 occurrences**, and re-reading it cannot move the number.
- **No write landed outside this unit's writable set.** `scripts/dev/dev.sh` untouched; glass-ui untouched;
  no sibling seat's path staged, reset or unstaged; no stash, no force-push, no branch rewrite.

---

### KF.W10.f

**SERVED MODEL**: `claude-opus-5[1m]` · **Unit** `KF.W10.f` · group 6 of 7 (alone) · **sections executed**
§3.6 `:332-334` + §5 **G-6** `:471-487` + §10 `:660-673`. **Seat clock** 2026-09-19 00:3x → 01:0x EDT
(⟨cmd⟩ `date` → `Sat Sep 19 00:32:05 EDT 2026` at open). **Sitting of record stays 2026-09-17.**
**Status: DONE — G-6 turns RED → GREEN at the landing bytes**, with two declared misses inside the unit's
own scope (KF.W6's absent four-verb table · KF.W3's refused advance), both measured and both recorded here
rather than papered. **Writable set honoured exactly**: value `INBOX.md` · kf `INBOUND-LEDGER.md` · kf
`DISPOSITIONS.md` · value `close/FINAL-KF.md` (created) · one row in each of ten sibling specs. **No ledger
edit** (the wave's close moves the row, not a unit).

#### Act 0 — crash-recovery sweep (STANDING LAW, first act)

⟨cmd⟩ `git status --porcelain` in both repos this seat may write, read before any other act:

- **value.js — 14 rows, and the ONLY one inside this unit's writable set is `docs/tranches/V/coordination/INBOX.md`,
  which was CLEAN at open** (it appears in the list only after this seat's own writes). The others are
  sibling-owned or unowned: `docs/tranches/V/reformation/CARRY-LEDGER.md` · `scripts/dev/dev.sh`
  (**unowned, NEVER touched, never staged**) · a staged `e2e/smoke/a11y-select-title.spec.ts` that a sibling
  seat committed during this unit's run · the `demo/**` rows. **Nothing touched, nothing stashed, nothing
  unstaged.**
- **keyframes.js — 2 rows**, both untracked value-authored letters
  (`VALUEJS-INBOUND-2026-07-{24,27}-*.md`, O-8/O-11's delivered bytes, the §B-12 reset's survivors).
  **Outside this unit's writable set; left in place**, and named again in the kf addendum as evidence rather
  than repaired.
- **Inherited work on THIS unit: NONE.** `docs/tranches/X/keyframes/close/` did not exist
  (⟨cmd⟩ `ls docs/tranches/X/keyframes/close/` → `No such file or directory`); the two kf ledgers were
  byte-identical to `origin/master`; `INBOX.md` carried no partial terminalization. **No predecessor hunk
  was inherited, so none is claimed.**

#### Act 1 — BEFORE baseline, measured at THIS seat's bytes and double-run (never inherited)

| probe | run 1 | run 2 |
|---|---|---|
| ⟨V⟩ `wc -c INBOX.md` | **244,122 B** | 244,122 |
| ⟨V⟩ `grep -cE '^\| [IO]-[0-9]+ \|' INBOX.md` | **74** rows | 74 |
| ⟨V⟩ per-row **Status-cell** classification (cell taken by position, escaped pipes restored) | **3 UNREAD — `I-32` · `I-33` · `I-34`** | 3 |
| ⟨V⟩ `ls docs/tranches/X/keyframes/close/` | **no such directory** | — |
| ⟨K⟩ `wc -c INBOUND-LEDGER.md` · `DISPOSITIONS.md` | **8,865 B** · **19,605 B** | identical |
| ⟨K⟩ `grep -cE '^\| IN-' INBOUND-LEDGER.md` | **9** rows | 9 |
| ⟨K⟩ `grep -cE '^\| [^-\|]' DISPOSITIONS.md` − `grep -cE '^\| Row \|'` | **58 − 6 = 52** rows | 52 |
| ⟨K⟩ `grep -c 'CC-084' INBOUND-LEDGER.md` · `grep -ci 'O-8' DISPOSITIONS.md` | **0** · **0** | 0 · 0 |

**THE BASELINE THIS SEAT INHERITED WAS WRONG, AND THE CORRECTION IS PUBLISHED RATHER THAN ABSORBED.**
Sitting 2's G-6 row above reads *"value `INBOX.md` **237,857 B · 74 rows · 0 UNREAD status cells**"*. The
probe printed beside it is ⟨cmd⟩ `awk -F'|' '/^\| [IO]-[0-9]+ \|/ {print $NF}' INBOX.md | grep -ci 'UNREAD'`
— and for a row ending in `|`, **`$NF` is the EMPTY FIELD AFTER the trailing pipe**, so that command
returns **0 for any input whatsoever**. It is not a reading of the ledger; it is a reading of nothing.
The true figure at this seat's clock is **3**, and the three rows are named above. **WRITE-THEN-MEASURE
means this unit measures its own gate**, and a baseline that cannot fail is the same class of defect as
the `exit 0` landing **L-2** forbids one gate over. ⟨The byte figure also moved, 237,857 → 244,122, as
Track A appended two sweep lines between the open and this unit — a dated observation moving, not a green.⟩

**A SECOND MIS-COUNT, IN A SIBLING TRACK'S SWEEP LINE, CORRECTED WITHOUT REWRITING ITS BYTES (E-3).**
`INBOX.md`'s last sweep line (X-W4 RESUME PROBE, Track A) reads *"the **five** Status cells still reading
UNREAD (I-30 · I-31 · I-32 · I-33 · I-34)"*. Measured at this seat: **`I-30`'s `UNREAD` is a quotation of
the E13 law** inside its disposition cell (*"a wave may not CLOSE with UNREAD mail"*) and **`I-31`'s is
*"Prior status, kept: **UNREAD 2026-09-17**"*** beneath a Status cell reading **FOLDED 2026-09-17 at the
X-W0 close**. The true figure was **3**. That is precisely the bare-`grep -i unread` class this ledger's
own **D-1** law forbids, firing in the sweep line that cites the law. **The sibling's bytes are not
touched**; the correction is dated and written beside, in this unit's terminalization block.

#### Act 2 — value `INBOX.md`: the three UNREAD rows terminalized, and the two converged rows given their closing lines

**(a) `I-32` · `I-33` · `I-34` → terminal.** Each Status cell advances to a terminal MAIL verb
(**READ IN FULL + ROUTED** / **READ IN FULL + RELAYED** / **READ + NO OBLIGATION MINTED**), dated
**2026-09-19**, and each states two things in its own cell: (i) **the reading is already on the record** —
F.W1 unit `b` read I-32 (§A `A-1`..`A-14` · §B `B-1`..`B-7` · §C `C-1` · §D) and I-33 (§1) **row by row on
2026-09-17**, in this same file's `Consumption 2026-09-17` block; (ii) **the verb is the MAIL status and
nothing more — the routed work at `X-W0.j` / `X-EXT-1` is NOT discharged by it**, and **every Routing cell
is byte-untouched**. **Why this seat flips what three earlier seats declined**: their own words are
*"this ledger is **append-only** in unit `b`'s writable bound … the durable mark is theirs to move"* —
a bounds statement, never a prohibition. This unit's bound **is the ledger**, under the wave COHESION
**§0t** assigns *"whose content is ledger/mail terminalization"*. A close that left three stale `UNREAD`
marks standing would fail **G-6**'s own *"zero UNREAD at close"* on the bytes.

**(b) The two converged rows, one honest closing line each** (§3.6's HONESTLY, and G-6's falsifier read
as a constraint on the WORD):

| row | closing line, as written | evidence, by letter |
|---|---|---|
| **D-GAP-6 / `sampleBezier`** (at `I-10`, where the conditional lives) | *"**NOT ADOPTED — 4.1 DECLINES IT PERMANENTLY**"*; *"a decline recorded as a decline"*; nothing owed by keyframes; the asymmetry **recorded, not re-litigated** | `O-21 §D` — *"`sampleBezier` is DECLINED permanently on measured zero demand … **no 4.1 of ours will ship it**"* · `O-34` (the 4.1 cut notice, `:224`) — *"**Declined permanently**: `sampleBezier` (measured zero demand, matching your own I-10 answer)"* |
| **`O-8`'s delivery-vehicle question** (at `O-8`) | *"**TERMINAL BY PRE-EMPTION, never by an answer**"* — the decision *"no longer exists to be made"*; **no cut date promised**; *"their silence is neither its cause nor consent to it"* | carry-cut row **`CC-084`** — *"no emergency `4.0.1` — ruled"* · `O-21 §C`, which **WITHDRAWS** the question in those words |

**Neither is dressed as an adoption**: one is a decline, the other a withdrawal. ⟨**The word-level check,
run rather than asserted — and it corrects this receipt's own first draft, which claimed the words
*adopted*/*accepted*/*agreed* appear in neither cell.** ⟨cmd⟩ `grep -oiE "adopt[a-z]*|accept[a-z]*|agree[a-z]*"`
over each row: **`O-8`** → **1 hit**, the word *adoption* inside *"a pre-emption, **not an adoption**"*.
**`I-10`** → **6 hits**, every one either a negation this unit wrote (`NOT ADOPTED` · *"resolves to **not
adopted**"* · *"nothing here is **an adoption**"* · *"adopt `sampleBezier` only if…"*, the quoted
**conditional** being reported) **or the row's own pre-existing `D-GAP-6 decline ACCEPTED`** — an
acceptance **of the decline**, which is the opposite of adopting the primitive, and which this unit did
not write and did not touch. **`agreed`: 0 in both.** The falsifier is about the WORD, so the word is
counted, and the draft that asserted a clean zero is corrected at its own line.⟩

**(c) Already-terminal rows: RECORDED, NOT RE-OPENED.** `I-6` / `IN-VALUE-1` / `IN-VALUE-2` / `W12` are
**TERMINAL both sides** (`lane-docs.md:376`, quoted). The **`IN-ATLAS-3` TimingFunction fence is STANDING
and was re-verified AT THE BYTES by this seat**, not inherited: ⟨cmd⟩
`grep -n 'TimingFunction' keyframes.js/src/animation/constants/types.ts` → **`:57 export type TimingFunction = (t: number) => number;`**;
⟨cmd⟩ `grep -n 'type TimingFunction\b' dist/keyframes.d.ts` → **`:4200 export declare type TimingFunction = (t: number) => number;`**
— **published home, name and signature all intact**. ⟨The two id spellings (`IN-ATLAS-3` at lane-docs,
`IN-ATLAS-5` at §B-6) are carried as a dated observation; **re-keying is not this wave's act** — `.a`'s
residual 4, honoured.⟩

**(d) One dated terminalization block appended at the file end**, carrying the four-path sweep, both
mis-count corrections, the row census, the two closing lines, the already-terminal rows and G-6's reading.

#### Act 3 — the E13 four-path sweep at this seat's own clock (no wave closes with UNREAD mail in scope)

⟨cmd⟩ `date` → `Sat Sep 19 00:33:35 EDT 2026`. Classification from each row's **Status cell**;
`INBOX.md` **self-excluded** (SELF-COUNT law).

| # | path | newest member | rowed as |
|---|---|---|---|
| 1 | `docs/tranches/V/` + `V/coordination/` | ⟨cmd⟩ `find … -newermt "2026-09-18 23:10"` → **1 member, `INBOX.md` (self)** | — |
| 2 | `../glass-ui/docs/tranches/BK/coordination/` — BK re-confirmed newest ⟨cmd⟩ `/bin/ls -dt ../glass-ui/docs/tranches/*/ \| head -3` → `BK/` · `BJ/` · `BI/`; **9** `.md` | `glass-outbound-2026-09-18-valuejs-o26-reply.md` | **I-35**, rowed |
| 3 | `../keyframes.js/…/V/coordination/` **and** `../keyframes-v-exec/…/V/coordination/` | `VALUEJS-INBOUND-2026-09-17-o8-o11-amendment-addendum.md` at **both** | **O-21** — ours, delivered |
| 4 | `../sci-report/atlas/docs/tranches/P/coordination/` | `valuejs-inbound-2026-07-27-library-band-export-delta.md` | **O-12** — ours; path UNMOVED |

**ZERO unrowed letters addressed to value.js · ZERO new `I-n`/`O-n` minted** (register tail stays
**I-35 / O-38**).

#### Act 4 — the keyframes half: two dated addenda-beside, never a patch (E-3)

⟨cmd⟩ `git diff --numstat` before the commit:
**`53  0  docs/tranches/V/coordination/INBOUND-LEDGER.md`** · **`126  0  docs/tranches/V/DISPOSITIONS.md`**
— **zero deletions in both, which IS the E-3 proof**; the 2026-07-17 rows are byte-unchanged and both
denominators are unmoved (**9** rows · **52** rows, each double-run before and after).

- **`INBOUND-LEDGER.md`** — all **9** rows verbed, with a **verb law declared before the table**
  (*"each verb names where the row now lives, and never a cure this seat did not measure"*). Measured, not
  asserted: **IN-ATLAS-2**'s owed durable line **LANDED** — ⟨cmd⟩ `grep -n 'exact' docs/published-surface.md`
  → **`:16-21`** (*"The value.js consume-edge is exact-pinned by design…"*), pin re-read at
  **`package.json:71 "@mkbabb/value.js": "4.0.0"`**; **IN-ATLAS-3** STANDING — **VERIFIED HELD** (the two
  commands above); **IN-ATLAS-4** STANDING-CARRIED — **UNFIRED** (⟨cmd⟩ `"version": "6.0.0"`, CHANGELOG head
  `## 6.0.0`, **no `Unreleased`** — no V-era cut shipped, so the evidence-tuple trigger never fired and a
  trigger that never fired is **not** a discharge). **IN-ATLAS-5** and **IN-VALUE-1** close on their own
  stated condition — *"W12 terminalizes"* / *"terminalizes at W12 when the WL verdict letters land"* —
  **and this act IS that terminalization**; the letters landed (`O-4`, `O-21`), so **nothing is recorded
  MISSING**. **No `IN-VALUE-3`/`IN-VALUE-4` is minted**: O-21 §F asks for those rows in **keyframes' own
  grammar and numbering**, which is their call, not the sender's.
- **`DISPOSITIONS.md`** — the defect is named exactly (*"a routing into a wave that never ran is an open
  routing, not a terminal word"*; the gate's exemplar `:106` `FOLD W12`) and the **52** rows' routings are
  closed under a **four-word alphabet declared before use**: `DISCHARGED-AT-V.<wave>` · `DISCHARGED-AT-LANDING`
  · `FOLDED-FORWARD` · `RECORDED-TERMINAL`. **Six discharges are measurements taken at the frontier by this
  seat, not readings of a wave's name**: `CH-03` (⟨cmd⟩ `grep -c 'BlendMode' README.md docs/published-surface.md`
  → **0 · 0**) · `CH-06` (`docs/dogfood-inversion.md:48` now **past tense**) · **`BV-2`** — the ledger's one
  `UNVERIFIED` row — (⟨cmd⟩ `test/group/static-weight-composite-golden.test.ts` **present** on the landed
  tree; `.e` measured `test:lib` **112→113 files / 1256→1259 tests**, the `+1` being exactly this golden) ·
  `XB-05` (⟨cmd⟩ `grep -c 'taxonomy'` over the four bench files → **0 · 0 · 0 · 0** after the prune —
  **no stale reference to a deleted file survives**) · `XB-06` (MR4 **converged** into X.KF.W4's identical
  step) · `FAM-11` (the `published-surface.md:16-21` line). **One row is stated RED-honest rather than
  closed on its wave's name**: **`CH-05` FOLDED-FORWARD — ⟨cmd⟩ `grep -c 'nightly' .github/workflows/ci.yml`
  → **4**, still mislabelling a `dow=1` cron.** `RG-1`/`RG-2`/`CC-04` are **split and stated** (kf-side limb
  discharged at V.W2, **producer limb STANDING on the successor SS-6 batch** — glass-ui is READ-ONLY, always).
  **`CC-01` — the row the gate names — is TERMINAL: D-GAP-6 NOT ADOPTED**, with the same two letters as
  evidence, and **`O-8`'s vehicle question gets its closing line on this side too** (⟨cmd⟩ `grep -ci 'O-8'`
  read **0** before this write).

#### Act 5 — `close/FINAL-KF.md`: commits and pasted commands only (L-6)

Created at `docs/tranches/X/keyframes/close/FINAL-KF.md` (**205 lines**). **It cites no document this close
authored** — not a spec, not an addendum, not this record — *"because a close that proves itself by pointing
at its own prose has proved nothing"*. Its content is **seven commits**, **seven gates each read by its own
command**, the frontier state, **the misses with their exact preconditions**, the verb stamps as a
`git diff --numstat`, and a closing section on **what a reader must not take from it**. **L-6 battery, run
whole**: **12** `git cat-file -e` checks over every letter it relies on (7 at kf `origin/master`, 5 at value
`HEAD`) → **all PRESENT**, pasted in the file.

#### Act 6 — the R-A stamps: ten row edits, nine advances, and two refusals that are measurements

⟨cmd⟩ `git diff --numstat -- docs/tranches/X/keyframes/waves/` → **10 files, `1 1` each** =
**10 insertions / 10 deletions — one row edit per file, no prose reflowed, no sibling's table rebuilt.**

- **NINE advance to VERIFIED** — `KF.W0` · `KF.W1` · `KF.W2` · `KF.W4` · `KF.W5` · `KF.W7` · `KF.W8` ·
  `KF.W9` · `KF.W10` — each cell carrying (i) the close's basis **by commit** (G-1 `025e894c` · G-2
  `15da439f` · G-3/G-4 `27ec9c37` · G-5 `b50a23de` · G-6 `dd28da55` · **G-7 LAND `0a329c57` but RED-HONEST
  on two CI-dependent clauses, ESC-e1**), (ii) its own **IMPLEMENTED basis cited from `execution/LEDGER.md`,
  never re-asserted** — R-A permits **one** row edit, so the IMPLEMENTED row is left exactly as its own wave
  left it — and (iii) **the honest-RED gate ids printed inside the stamp** for the five waves that closed
  with them, plus KF.W9's **PARTIAL — 6 of 13** and its **`0 of 16` capture cells**. **A sub-tranche stamp
  is a statement about the CLOSE's three gates, never a re-verdict on a wave's own**, and every cell says so.
- **`KF.W3` takes NO advance, and its row says why**: ⟨ledger⟩ **GATE-KEYED · *"never scheduled; opens or it
  does not"***. R-A advances **FROM IMPLEMENTED**; this wave is not, and §1 carves it out by name
  (*"bounds-FINAL + gate-state, **never its verb**"*). **Stamping it would be closure by omission** — the
  failure this sub-tranche convicts at three altitudes. The row is **edited rather than left silent**, so a
  later reader cannot mistake a refusal for an oversight.
- **`KF.W6` HAS NO FOUR-VERB TABLE AT ITS BYTES — MEASURED, DOUBLE-RUN**: ⟨cmd⟩
  `grep -cE '^\| (SPECIFIED\|IMPLEMENTED\|VERIFIED\|ACCEPTED) *\|' KF-W6.md` → **0** (every sibling returns
  **3**); the file states its verb as a header field, **`status: planned`**, under its own execution gate
  *"every status field stays `planned`"*. **The specified cure is impossible at these bytes and this seat did
  NOT substitute one**: creating a table is not *"a row edit … nothing more"*, and editing that header field
  would breach that file's own lock. **KF.W6's stamp is recorded at `FINAL-KF.md` §5 instead**, on the same
  basis as its nine siblings, with the absence printed. **Declared as a miss, not smoothed.**
- **The three MINTED successors take NO verb** — `KF.W11` · `KF.W12` · `KF.W13`. Their 2026-09-18 authoring
  (`f208ff31`) does not change it: they never gated this close and were never required to be IMPLEMENTED;
  **§6.D's register row is their terminal disposition.**

#### Act 7 — commits (§10 commit 6), pathspec on the commit itself

**Commit 6 is ONE meaning carried by TWO commits, and the split is declared rather than hidden**: the unit's
writable set spans two repositories and a commit cannot cross a repository boundary.

| # | repo | hash | scope |
|---|---|---|---|
| 6a | keyframes.js | **`dd28da55`** | `docs(X·KF W10 close): both keyframes coordination ledgers terminal (G-6, the kf half of commit 6)` — pathspec `docs/tranches/V/coordination/INBOUND-LEDGER.md docs/tranches/V/DISPOSITIONS.md` **on `git add` AND on `git commit … --`**; ⟨cmd⟩ `git show --stat` → **2 files changed, 179 insertions(+)**, **0 deletions**; the two untracked value letters untouched |
| 6b | value.js | **`d84727fc`** | `docs(X·KF W10 close): FINAL-KF + ledgers terminal + IMPLEMENTED→VERIFIED stamps (the AUTHORED eleven)` — pathspec of **12 exact paths** on add and on commit; ⟨cmd⟩ `git show --stat` → **12 files changed, 222 insertions(+), 15 deletions(-)**; ⟨cmd⟩ `git show --name-only \| grep -c 'dev.sh'` → **0**; `CARRY-LEDGER.md` and the sibling `demo/**` rows **not staged** |

**PUSH — and why it is lawful here.** ⟨cmd⟩ `git push origin master` (keyframes.js) → **`0a329c57..dd28da55`**;
⟨cmd⟩ `git rev-list --left-right --count HEAD...origin/master` → **`0 0`**. §0j.C **KF-WRITE** has each wave
*"pushing `origin HEAD` at close"*, and `.f` is this wave's **final writing unit** (`.g` is VERIFY-ONLY and
writes only into this record). **A terminalized ledger that exists only in a local checkout is not
delivered** — that is the exact I-26 / OP-3 defect this gate was built against, so the kf half is pushed
rather than left invisible to the sibling it belongs to.

#### Act 8 — G-6, BEFORE → AFTER, double-run at the settled bytes

| clause | BEFORE (this seat's own Act 1) | AFTER (settled bytes, ×2) |
|---|---|---|
| value `INBOX.md` rows | 74 | **74 — unmoved** (74 ≡ 74) |
| value `INBOX.md` **UNREAD status cells** | **3** (`I-32` · `I-33` · `I-34`) | **0** (0 ≡ 0) |
| value rows carrying a terminal verb | 71 of 74 | **74 of 74** ⟨counting rule at the enumeration: the Status cell is read **by position**; **2** rows (`O-26`, `O-32`) carry an unescaped `\|` inside a code span, so their Status is read at their true last cell — **SENT + MIRRORED** and **AUTHORED + ROWED** respectively⟩ |
| D-GAP-6 closing line | absent | **present** at `I-10` — *"NOT ADOPTED — 4.1 DECLINES IT PERMANENTLY"* |
| O-8 vehicle closing line | absent (⟨K⟩ `grep -ci 'O-8' DISPOSITIONS.md` → 0) | **present on BOTH sides** — `INBOX.md` `O-8` and the kf `DISPOSITIONS.md` addendum |
| kf `INBOUND-LEDGER.md` | 8,865 B · 9 rows · no terminal verb set | **17,376 B · 9 rows · all 9 verbed** (53 insertions / **0 deletions**) |
| kf `DISPOSITIONS.md` | 19,605 B · 52 rows · `:106` `FOLD W12` open | **30,691 B · 52 rows · routings closed** (126 insertions / **0 deletions**) |
| `close/FINAL-KF.md` | **does not exist** | **exists**, ⟨cmd⟩ `git cat-file -e HEAD:docs/tranches/X/keyframes/close/FINAL-KF.md` → **PRESENT** |
| terminal addenda visible at kf `origin/master` | — | ⟨cmd⟩ `git show origin/master:<each> \| grep -c 'ADDENDUM 2026-09-19'` → **1 · 1** |

**G-6 = GREEN.** Acceptance met clause by clause: *terminal verb + dated row on every entry* (74/74 value,
9/9 + 52/52 kf, every verb carrying **2026-09-19**); *D-GAP-6 = "not adopted (4.1 declines permanently)"*;
*O-8 = pre-empted by CC-084*; **neither dressed as an adoption**. The gate's OP-3 precondition —
*"terminalization performed before OP-3's packet lands records a false close"* — is satisfied and was
re-proven at this seat: `O-21` is tracked at kf `origin/master`. **L-6** holds: 12 of 12 cited letters
`git cat-file -e`.

#### Act 9 — residuals and escalations (named, none hidden)

- **R-f1 — `KF.W6` has no four-verb table**, so the AUTHORED ELEVEN took **ten** row edits, not eleven.
  Measured (⟨cmd⟩ → 0 verb rows) and recorded at `FINAL-KF.md` §5; **no table was fabricated into a sibling
  spec and no header field was flipped**. `.g` should test this as a declared miss rather than discover it.
- **R-f2 — `KF.W3` refused the advance** (GATE-KEYED, never opened). A literal reading of R-A's *"the eleven
  specs on disk"* would stamp it; the spec's own §1 carve-out and R-A's *"from IMPLEMENTED"* both forbid it.
  **The refusal is the finding**, and it is in the row rather than only in this record.
- **R-f3 — the VERIFIED stamps sit over a `complete_with_misses` close.** **G-7 is LAND-stamped and
  RED-HONEST**; the L-18 rider makes VERIFIED rest on *"G-1/G-2/G-7's receipts"*, and G-7's receipt exists
  and stamps **LAND**, so the stamp is set — **with the two undischarged clauses and ESC-e1 printed inside
  every cell**. **If `.g` rules that a RED-HONEST G-7 cannot carry a VERIFIED stamp, ten row edits revert as
  cleanly as they landed** (`1 1` each). This seat states the reasoning rather than burying the choice.
- **R-f4 — ESC-e1 is INHERITED, UNCURED and OUT OF BOUNDS** (kf `package-lock.json` desync;
  `3a01e362` newer than `fb509edd`). It blocks MR4's red-once witness and §B-9's MR2 parity observation.
  **Routed to the manifest owner; not patched, not skipped, not allowlisted.** §B-9's watch row is **NOT**
  discharged and must not be stamped as such (`.e`'s R-1, carried).
- **R-f5 — three mail rows are terminal AS MAIL while their routed work is live** (`X-W0.j` / `X-EXT-1`).
  Every cell says so explicitly. **A reader who takes the mail verb for a discharge has read a word these
  cells refuse to say.**
- **R-f6 — `CH-05` is uncured at the kf frontier** (4 `nightly` hits against a `dow=1` cron) and is verbed
  **FOLDED-FORWARD with its count printed**, not closed on its wave's name.
- **R-f7 (SELF-COUNT law).** This receipt lands **inside** G-4's witness field (value.js `docs/tranches/X/`)
  and carries **none** of its three never-cite tokens (`357/414`, `86.23`, `0/5 slots`) — **0 files · 0
  lines · 0 occurrences**; re-reading it cannot move that number. The terminalization block this unit
  appended to `INBOX.md` contains the word `UNREAD` **8** times — ⟨cmd⟩ `awk 'NR>=251' INBOX.md | grep -o 'UNREAD' | wc -l`
  → **8** (run 1 ≡ run 2) — none of them in an `| I-n |` row's Status cell, so the gate's own per-row probe
  is unaffected — **stated because the measurement lives in the file it measures**. ⟨**SELF-CAUGHT, and the
  correction is published rather than amended away**: the first write of this line said *"**12** times"*
  from an estimate, not a command — exactly the defect this unit convicted twice in Act 1. The figure is
  corrected in place at its own line, with its command pasted, in the same sitting.⟩
- **ESCALATIONS: none.** Every act landed inside the declared writable set; where the specified cure was
  impossible at the bytes (KF.W6's absent table) **nothing was substituted** — the miss is declared. No
  workaround, no masking fallback, no `test.skip`, no allowlist, no `node_modules` patch, no stash, no
  reset, no force-push, no sibling path staged or unstaged. `scripts/dev/dev.sh` untouched; glass-ui
  untouched.

---

### KF.W10.g

**SERVED MODEL**: `claude-fable-5-1` · **Unit** `KF.W10.g` · group 7 of 7 (alone) · **fresh Fable adjudicator (M-23 §1, mirroring X.P.W4 `.d`)** · **sections executed** §3.7 `:336-338` + all of §5 `:368-499` + §1 R-A `:41-47` (+ §10's L-18 rider `:673`, §6.A/§6.D). **Seat clock** 2026-09-19 00:50 → 00:5x EDT (⟨cmd⟩ `date` → `Sat Sep 19 00:50:27 EDT 2026` at open · `Sat Sep 19 00:56:25 EDT 2026` at the last probe). **Sitting of record stays 2026-09-17.** **VERIFY-ONLY honoured exactly**: this block is the seat's only write; **no §4 path, no cure byte, no spec byte, no sibling tree, no ledger row** was touched. **Posture**: the close was assumed WRONG and every §5 gate probe was re-run at this seat's own clock, double-run where a figure is published; the four named probable finds were tested first so that they would not be the ones this seat makes.

**CRASH-RECOVERY SWEEP (standing law, first act).** ⟨cmd⟩ `git status --porcelain` in both repos: **value.js — 2 rows** (`docs/tranches/V/reformation/CARRY-LEDGER.md` · `scripts/dev/dev.sh`, **unowned, never touched, never staged**), both outside this seat's writable set; **keyframes.js — 2 rows**, the two untracked value-authored letters (the §B-12 reset's survivors), outside the set. **Inherited work on this unit: NONE** — `execution/B/KF-W10.md` clean at `a224bf22` (1,548 L), no partial `.g` block anywhere. Nothing stashed, restored or reset.

**THE SUBSTRATE, measured.** kf `master` = `origin/master` = **`dd28da55`** (⟨cmd⟩ `git rev-list --left-right --count HEAD...origin/master` → `0 0`, after `git fetch`); value.js `tranche-u` at **`a224bf22`**. Every keyframes-side reading below is `git show origin/master:…` — the frontier, never the checkout.

#### THE FOUR NAMED PROBABLE FINDS — tested first, and NONE is made

| §3.7's named find | probe, this seat | verdict |
|---|---|---|
| a §B row verbed with a **status word** | ⟨cmd⟩ over `origin/master:docs/tranches/V/FOLD-FORWARD.md`, the 15 bold-numbered discharge rows: per-row count of §3.1-alphabet tokens → **`1` on every row** (vector `1:1 … 15:1`); status-word scan (`handled/noted/in flight/done/pending/ok` in the verb cell) → **0** | **NOT FOUND** |
| a set-difference built on a **stale sibling bounds block** | ⟨cmd⟩ per-spec `grep -c 'Bounds'` at close → `W0 17 · W1 12 · W2 53 · W3 4 · W4 40 · W5 43 · W6 59 · W7 36 · W8 46 · W9 49 · W10 12` — **identical to `.b`'s vector**; ⟨cmd⟩ `git diff --numstat 15da439f HEAD -- waves/` → **10 files, `1 1` each**, and every changed line is a `\| VERIFIED \|` row (printed, all ten); ⟨cmd⟩ `git merge-base --is-ancestor f208ff31 15da439f` → **YES** (the successors were authored *before* `.b` swept); sibling specs dirty → **0** | **NOT FOUND** |
| an owner row closed `complete_with_misses` **without its exact precondition** | ⟨cmd⟩ `origin/master:docs/tranches/V/OWNER-DECISIONS.md`: OD-V3's block cites `SS-13-CAPTURE-RECEIPT.md:35` and the string `0 of 16` occurs **3** times; OD-V5's block cites the producer G-2 ask, `SS-13:80` (NOT OBSERVED) and `SS-13:97` (0 of 4 marks) — named artefacts at measured coordinates, never prose; `:7`/`:9` **byte-unchanged** (first 9 lines `diff` vs `69095552` → identical); OG-KF1 `diff` against `COHESION.md:926-929` → **no output, character-identical** | **NOT FOUND** |
| an addendum that **patched** | ⟨cmd⟩ `git diff --stat 69095552 origin/master -- <the five G-5 originals>` → **empty**; FOLD-FORWARD `head -54 \| shasum` at `origin/master` ≡ whole-file shasum at `69095552` (`79702903…58b9`); both kf ledgers `numstat` vs `69095552` → **`53 0` · `126 0`**; OWNER-DECISIONS first 9 lines identical; all four G-5 addenda are separate files **beside** their originals (`dirname` ≡ ×4), `home.json` **PARSES** at the frontier | **NOT FOUND** |

#### THE SEVEN GATES — every probe re-run at this seat, BEFORE (the sitting-2 baseline / the owning unit's BEFORE) → AFTER (this seat, at `dd28da55` / `a224bf22`)

| gate | BEFORE | AFTER, this seat (run 1 ≡ run 2) | verdict |
|---|---|---|---|
| **G-1** | RED — §B 15 rows, 0 verbed, no addendum | `# ADDENDUM 2026-09-18 …` heading **1** · §B numbered source rows **15 ≡ 15** · discharge rows **15** · alphabet tokens **exactly 1 per row** (`RULED` 2 · `FOLDED-TO` 4 · `STANDING-CARRIED` 8 · `DISCHARGED-BY-CONSTRUCTION` 1 = 15) · §A/§B/§C **byte-identical** · **FOLDED-TO targets resolve**: `KF-APP-21` at `kf-App.md:26/:71/:159`; `COHESION-SC-1` = the first row under `## §4a` (now `:380`, see F-3); `KF-W0 §Carry` `:355` + `C-1` `:361` (both still at those lines); `TransportDock` in KF-W6 **12**, `SS-13-CAPTURE-RECEIPT` in KF-W9 **6**; the four subsumed names in the registry → **0 files** · the R-4 trigger passage **802 B, byte-identical** to `KF-W8.md` | **GREEN** |
| **G-2** | RED — no table; 58/57/1,218 | `### §4.1` present at `COHESION.md:117` · arm-1 rows **57 ≡ 57**, rows lacking a terminal word **0** · `DRAINED 2026-09-18` pointer **1** · `DISCHARGED by KF.W7 SWAP verdict` stamped on a row **0** · right hand: 11 bounds blocks (vector above) ∪ §6.D cargo reconciled ⟨cmd⟩ `^### P[0-9]`/`^### U[0-9]` → **W11 9 · W12 6 · W13 2 = 17** · OP-5 at close GREEN (no bounds block moved; see the find table) | **GREEN** |
| **G-3** | RED — 0 of 3; `:7` HELD, `:9` DEFERRED | owner block present (`:13` heading; rows `:38` OG-KF1 **RULED**, `:58` OD-V3, `:82` OD-V5 both `complete_with_misses`) · OG-KF1 **character-identical** to `COHESION §0j.C` · `:7`/`:9` untouched · **the OD-V3 sitting is taken below** | **GREEN** |
| **G-4** | RED — no register; field 34/108/77 (sitting 2) → 34/115/80 after `.c` | register **7 rows, ordinals (1)…(7) at 1 each**; entry **(7)** carries `REPO-SCOPED, NOT ABSENT` → **1** · **field re-run, three units, ⟨cmd⟩ the gate's own commands: 34 files · 121 occurrences · 82 lines (run 1 ≡ run 2)** · partition: live-spec **3 / 27** (W0 2 · W3 2 · W10 23, reproducing `.c` exactly) · conformance **7 / 30** · substrate **19 / 44** · execution+artefact **5 / 20** — `3+7+19+5 = 34`, `27+30+44+20 = 121` · **live-spec lines lacking the `345 … 8281638c` supersession: 0 of 4** (W0 `:378/:695`, W3 `:209/:329`) · **the class moved 115 → 121 / 80 → 82 and the delta is attributed exactly** (F-1) · the instrument artefact class re-measured (F-1b) | **GREEN** (partition exact; zero bare citations in the live-spec class) |
| **G-5** | RED — 0 addenda | four `*-ADDENDUM-2026-09-19.md` at `origin/master`, each beside its original, `addend`-named files **11**, line 1 = `SERVED MODEL` ×4 · originals `diff --stat 69095552 origin/master` → **empty** · KF-EST-23 states `exactly two` (**1**) · KF-HA-4 names KF.W4 **9** times and restates the ceiling bound **0** times (SPLIT-LOCK held) | **GREEN** |
| **G-6** | RED — no verb set; `.f` measured **3 UNREAD** (`I-32/33/34`) | value `INBOX.md` **253,614 B · 74 rows** · Status cell read **at column 5 by position** (⟨cmd⟩ `awk -F'\|' '{s=$6…}'` and a `\|`-unescaping parser, both) → **0 of 74 begin `UNREAD`** (run 1 ≡ run 2) · `I-10` carries `NOT ADOPTED` **1** · `O-8` carries `PRE-EMPTION` **1** · `agreed` in either row **0** · kf `INBOUND-LEDGER.md` **17,376 B · 9 rows · `ADDENDUM 2026-09-19` 1 · CC-084 1**; `DISPOSITIONS.md` **30,691 B · `O-8` lines 2 · `NOT ADOPTED` 2**, both at `origin/master`, both `0` deletions · `close/FINAL-KF.md` **205 L / 12,758 B** at `d84727fc`; **its 12-check L-6 battery re-run whole: 12 of 12 PRESENT (run 1 ≡ run 2)**; its `dd28da55^..dd28da55` numstat and `d84727fc`'s `12 files / 222 / 15` reproduce · `.f`'s terminalization block present at `INBOX.md:251` · no line appended after `d84727fc` | **GREEN** |
| **G-7** | RED — `b920b190` unmerged | ⟨cmd⟩ `git merge-base --is-ancestor b920b190 origin/master` → **ancestor (LANDED)**; ref `v/w9-staging` still at `b920b190` (provenance kept) · prune set at the frontier: **4 ABSENT · 2 PRESENT** (the two `.measure.test.ts` vetoed by the `measure` project) · CI witnesses re-read by id (⟨cmd⟩ `gh run view`): **35421021299 failure @ `0a329c57` · 35413127952 failure @ `69095552` (control) · 35421048324 skipped**; **and the post-close run 35421911950 at `dd28da55` also fails at `npm ci` in both jobs — the `browser oracles` step has never executed** · **ESC-e1 confirmed uncured at `origin/master`**: `package.json:84` carries `"@vue/test-utils": "^2.5.1"`, `package-lock.json` carries **0** `node_modules/@vue/test-utils` entries | **LAND stamped · RED-HONEST on 2 of 6 acceptance clauses** (`complete_with_misses`) |

**R.2 at this altitude: the seven verdicts reproduce; no GREEN was found that the owning unit did not measure, and no RED was found that it hid.**

#### THE OD-V3 TRANSPORT-HOME SITTING (COHESION §0j.C KF-ODV3 — this seat's act, under the begin-word's delegation)

**The packet is read at its bytes, not inherited**: `docs/tranches/V/megatranche/audit/visual/safari-real/SS-13-CAPTURE-RECEIPT.md` — **15,669 B**, last commit `88a3c5b0` (KF.W9 `.e`), no later commit; `:35` → *"**THE OD-V3 CAPTURE PACKET — INCOMPLETE · 0 of 16 required cells**"*; the axis table at `:44-49` reads **4 scenes → 0 · 2 homes → 0 · 2 viewports → 0 · 16 cells → 0**; the discriminator at `:51-58` is honoured (the seven focus-state shots are **not** counted, and this seat counts none of them either).

**RULING TAKEN: NONE — there is nothing to take it from, and §0j.C's else-branch is executed exactly.** *"…if the packet does not exist by then KF.W10 closes `complete_with_misses` on that row citing its exact precondition."* **OD-V3 is CLOSED `complete_with_misses` at this sitting, on the receipt's own two-limb precondition, quoted from `SS-13:60-78`:** **(1)** a cell that can render at 390 — the iOS cells are **UNREACHABLE-IN-CELL** (`xcrun devicectl list devices` → `No devices found.`; `safaridriver … simulator` → 0; RULED at COHESION §0m.2), and a 390-wide *desktop* window is a **different cell, lawful only if labelled `safari-app/desktop`** — a wave-level call no seat has taken; **(2)** a cell that stays open — `safari-app/desktop` closed mid-seat at KF.W9 `.d` (*"Allow remote automation"* refused; `safaridriver --enable` needs an interactive admin password; the running Safari is the owner's and was not quit) — **precondition: "Allow Remote Automation" re-enabled by a hand that can answer an admin prompt, or the owner's Safari restarted**; limb (3), real Glass 7, is **satisfied and is not the blocker**. The row at `OWNER-DECISIONS.md:7` **stays HELD**; the transport home is **neither chosen nor defaulted**; `.c`'s closure is **AFFIRMED as the same closure at this sitting's clock** (the receipt names this sitting as the owner at `:77`, and this sitting names the precondition back). **OD-V5** stays **DEFERRED** under the same ruling (its precondition is glass's dock mark via the SS-6 relay; `.c`'s dated observation of glass `f1e88fe2` — an acceptance **oracle**, not the repair mark — is read and **ruled nothing about**, glass-ui being READ-ONLY always).

#### THE R-A ADJUDICATION — VERIFIED over a `complete_with_misses` close (`.f`'s R-f3, answered)

**The ten row edits STAND.** Reasoning at the spec's bytes, not by preference: §1 R-A stamps VERIFIED *"against G-1, G-2 and G-7"* and §10's L-18 rider rests it *"on G-1/G-2/G-7's **receipts**"* — G-7's receipt exists, stamps **LAND**, and prints its two undischarged clauses and ESC-e1 **inside every VERIFIED cell** (all ten diffs read, all ten carry it). The program's own standing reading at this wave's open — *"CLOSED-honest-RED … is CLOSED; CLOSED ⊇ IMPLEMENTED"* — is the same law one rung down, and a close that reverted ten honest stamps to `NO` over a merge that is an ancestor of `origin/master` would trade a printed miss for silence. **The stamp is therefore VERIFIED, `complete_with_misses`, with the miss's exact precondition stated here once more**: kf `package-lock.json` regenerated to take `3a01e362`'s `@vue/test-utils@^2.5.1` (+14 transitives), committed under §0j.C KF-WRITE by the manifest's owning hand (X.KF.W7.a's, i.e. the orchestrator) — **out of every KF.W10 unit's bounds, this one included** — then one `ci` run at that SHA in which the `browser oracles` step executes (→ §B-9's MR2 parity observation). MR4's *"red-once witness at landing"* converts to **CONVERGED-RECORDED** and can never be obtained as "red-once at landing" — the step it converged into landed earlier with its own history — so that clause's honest terminal form is the convergence record `.e` wrote, not a future run. **KF.W3 NOT ADVANCED** (verified at `KF-W3.md:27`) and **KF.W6's absent table** (⟨cmd⟩ verb rows → **0**) are **declared misses, tested as such and confirmed**; **KF.W11/12/13 carry no `YES` VERIFIED row** (0 · 0 · 0), last touched at `f208ff31`.

#### FINDINGS — what the close got wrong, graded, each with its command and its owner

- **F-1 · MINOR (evidence integrity, SELF-COUNT law) — two receipts of this record assert a zero self-count while printing the very tokens they count.** ⟨cmd⟩ per-line token count over `execution/B/KF-W10.md` → **15 occurrences on 6 lines** (`:162` 2 · `:309` 4 · `:729` 2 · `:814` 1 · **`:1270` 3 · `:1536` 3**). `.c`/`.d` left the record at **9 / 4**; **`.e`'s R-4 (`:1270`) and `.f`'s R-f7 (`:1536`) each add 3 occurrences on 1 line** by spelling the three tokens inside the sentence that says the receipt *"carries none"* — which is exactly the `+6 / +2` by which the field moved **115 → 121 / 80 → 82** with no receipt owning it. The partition, the live-spec class and every verdict are **unchanged** (the record is not a live spec); the defect is the arithmetic, the class this file convicts at three prior seats. **E-3: the two receipts stand and are corrected here, beside.** **This receipt names the tokens only as "the three witness tokens" and contributes 0 files · 0 lines · 0 occurrences — ⟨cmd⟩ re-run after this write must reproduce 34 / 121 / 82; the figure is a fixpoint at these bytes.**
- **F-1b · INFO (`.c`'s routed residual, discharged by measurement)** — the unbounded witness token that is a percentage matches digit-neighbours. Classified at the tree: the substrate's **7** spellings with six decimals (`…1884%`) are **legitimate** citations of the dead figure and must stay in the field; the **chroma value in an X·P parser corpus** (`equivalence-full-surface.json:9765/:11567`) plus **`.c`'s own quotation of it at `:814`** are the **3** instrument artefacts. **True citation field = 121 − 3 = 118.** A bound that merely forbids a following digit would drop the seven legitimate rows, so the honest re-cut is on the *chroma spelling*, and it belongs to the successor spec's author (the gate's regex is E-3-immutable here). No verdict moves.
- **F-2 · MAJOR-INHERITED (doc-truth, program-wide; not an act of this close) — every stamped spec now reads `IMPLEMENTED | NO` beneath `VERIFIED | YES`.** ⟨cmd⟩ `grep -E '^\| IMPLEMENTED \|'` over the ten stamped specs → **`NO` in all ten** (W0 *"stamped at this wave's own close"* · W1 · W2 · W4 · W5 · W7 · W8 · W9 · **W10 `:38`**), while `execution/LEDGER.md` — the *"named execution site"* each cell's evidence column delegates the stamp to — reads **CLOSED** for the nine and **OPEN** for W10. The nine sibling closes never wrote their own cell; R-A's *"a row edit … nothing more"* forbade `.f` from writing a second; **the ladder is contradicted on the value column only, and every VERIFIED cell cites its IMPLEMENTED basis from the ledger by name.** **Cure, owned outside this seat**: for **KF-W10 itself**, the wave's close act (the orchestrator moving the LEDGER row to CLOSED) flips `:38` to `YES — complete_with_misses (G-7 RED-HONEST, ESC-e1)` in the same act — its own wave, one row; for the **nine siblings**, a dated program-wide E-3 addendum at the successor formation (or each spec's own one-row edit citing its CLOSED ledger row). **Not this wave's under R-A; recorded so it is not discovered again.**
- **F-3 · INFO (dated coordinate drift inside one wave)** — `.a`'s FOLD-FORWARD addendum (kf, dated 2026-09-18, E-3) cites COHESION `:120` (the SC-1 register row) and `:129` (§4a's dispatch row); **`.b` then inserted `§4.1` (259 lines) above `§4a` in the same wave**, so at final bytes those rows sit at **`:380` / `:389`** (`## §4a` at `:376`). **The fold's key is positional (`COHESION-SC-1` = §4a's first row) and resolves**; the line numbers are dated observations of `.a`'s clock, per the spec's own *"a line number is not a receipt."* Recorded, not re-issued. (`.a`'s KF-W0 anchors `:355`/`:361` still resolve — the W0 row edit was one-for-one.)
- **F-4 · INFO** — `FINAL-KF.md`'s two self-referencing hits are a `git log … -- <its own path>` **command** (it cannot print the hash of the commit that creates it, and says so) and a `grep` **measurement** over `KF-W6.md` (a sibling this close did not author). **L-6 compliant**; the claim *"cites no document this close authored"* holds at the bytes.
- **F-5 · INFO** — `execution/LEDGER.md:54` still reads **OPEN 2026-09-17** for KF.W10. The wave's close moves it; it is outside `.g`'s writable set and is **not** moved here.

#### E13 — the four-path sweep at this seat's clock (no wave closes with UNREAD mail in scope)

⟨cmd⟩ `date` → `Sat Sep 19 00:52:23 EDT 2026`. **(1)** value `docs/tranches/V` + `/coordination` newer than 00:30 → **`INBOX.md` only (self)**; **(2)** glass `BK/` re-confirmed newest (`ls -1dt` → `BK/ BJ/ …`), newest letter `glass-outbound-2026-09-18-valuejs-o26-reply.md` = **I-35, rowed** (Status `READ + CONSUMED WHOLE 2026-09-18`); **(3)** kf `V/coordination` newest = `INBOUND-LEDGER.md` (ours, `.f`'s addendum); **(4)** atlas newest = `valuejs-inbound-2026-07-27-…` = **O-12, ours**. **ZERO unrowed letters · ZERO `UNREAD`-leading Status cells over 74 rows · register tail I-35 / O-38 · no `I-n`/`O-n` minted.** The wave may close on mail.

#### VERDICT OF THE ADJUDICATION

**The X·KF close is CONFORMANT — `complete_with_misses`, honestly.** Six gates GREEN at this seat's own probes; G-7 LAND-stamped and RED-HONEST on two CI-dependent clauses whose single precondition (ESC-e1, the kf lockfile desync) is named identically at `.e`, `.f`, `FINAL-KF.md §4` and here, and is out of every unit's bounds. The four named probable finds are **absent at the bytes**. Two defects found: one MINOR of this close's own (F-1, a self-count that does not reproduce at two receipts), one MAJOR inherited from nine sibling closes and forbidden to `.f` by R-A (F-2). Neither moves a gate; both are routed with their cure and owner. **OD-V3 closed `complete_with_misses` at this sitting on its exact two-limb precondition; OD-V5 stays DEFERRED.** The ten VERIFIED stamps stand as `complete_with_misses`. **ACCEPTED is not conferred** (L-18 rider; the two gestalt passes and the apotheosis are later).

**COMMIT** — this record only, pathspec on the commit itself: see the hash in the unit's return (a file cannot print the hash of the commit that lands it). **ESCALATIONS: none new** — ESC-e1 is already routed by `.e`/`.f`; F-2's cure is named with its owner and is not an escalation of this seat's, since no act this seat may lawfully take is blocked. **SELF-COUNT**: this block carries none of G-4's three witness tokens and adds `0 / 0 / 0` to the field.

---

## Close

**SERVED MODEL**: `claude-opus-5[1m]` · **CLOSE SEAT of X.KF.W10** (Track B) · **VERIFY-ONLY — this seat cured
nothing.** **Seat clock** 2026-09-19 01:00 → 01:1x EDT (⟨cmd⟩ `date` → `Sat Sep 19 01:00:04 EDT 2026` at the
crash-recovery sweep · `Sat Sep 19 01:04:12 EDT 2026` at the E13 sweep). **Sitting of record stays
2026-09-17** (the owner's begin-word, COHESION §0j). **Writable set**: this record ·
`docs/tranches/X/execution/LEDGER.md` (this wave's row cells only, by minimal in-place replacement) ·
`docs/tranches/X/keyframes/waves/KF-W10.md`'s **ONE** four-verb row (§4: *"every X·KF sibling wave file —
modify-carve, one row in the four-verb table (R-A), nothing more"*, applied to this wave's own file, which
is the single row `.g`'s **F-2** names as this wave's to move).

> ### VERDICT — **IMPLEMENTED 2026-09-17 · `complete_with_misses`.**
> **Six gates GREEN at this seat's own probes, double-run. G-7 LAND-stamped and RED-HONEST on 2 of its 6
> acceptance clauses**, on a precondition (**ESC-e1**) that is out of every unit's §4 bounds and measures
> identical at the pre-landing SHA. **Seven of seven units DONE · 11 commits · 0 landed-wrong · 0 new
> escalations · 0 unrowed mail · 0 UNREAD status cells over 74 rows.** Nothing is rounded up, and the one
> gate that is not green says so in its own cell.

### Crash-recovery sweep (STANDING LAW, first act at this seat)

⟨cmd⟩ `git status --porcelain` in both repos this seat may write:

- **value.js — 4 rows, every one OUTSIDE this seat's writable set**:
  `demo/workbenches/gradient/GradientVisualizer/GradientStopEditor.vue` (Track A/X·V) ·
  `docs/tranches/V/reformation/CARRY-LEDGER.md` · `docs/tranches/X/execution/C/F-W3.md` (**Track C's**) ·
  `scripts/dev/dev.sh` (**unowned, NEVER touched, never staged**). **Nothing touched, nothing stashed,
  nothing unstaged, nothing reset.**
- **keyframes.js — 2 rows**, both untracked value-authored letters
  (`docs/tranches/V/coordination/VALUEJS-INBOUND-2026-07-{24,27}-*.md`, O-8/O-11's delivered bytes, the
  §B-12 reset's survivors). Outside this seat's writable set; **left in place**.
- **Inherited work on the CLOSE unit: NONE.** ⟨cmd⟩ `git status --porcelain -- docs/tranches/X/execution/`
  → **one row, `C/F-W3.md`, a sibling track's**; ⟨cmd⟩ the same over `docs/tranches/X/execution/B/` and
  `docs/tranches/X/keyframes/` → **zero lines**. This record was clean at `7c1f56f3` before this write.
  **No inherited paths to name.**

### ACT 1 — every unit's commits exist, and each touches only that unit's writable set

⟨cmd⟩ `git log --oneline | grep 'X·KF W10'` in value → **11 rows**; ⟨cmd⟩ `git log --oneline` in kf → the
**five** X·KF W10 rows below. Each verified with ⟨cmd⟩ `git show --stat`.

| unit | repo · commit | paths touched | §4 authority | verdict |
|---|---|---|---|---|
| `.a` | kf **`025e894c`** | `docs/tranches/V/FOLD-FORWARD.md` — **1 file, 192 insertions, 0 deletions** | *append-only, ONE dated addendum* | **IN BOUNDS** |
| `.b` | value **`15da439f`** | `docs/tranches/X/COHESION.md` — **1 file, 260 insertions, 0 deletions** | *modify-carve, §4 register drain* | **IN BOUNDS** |
| `.c` | kf **`27ec9c37`** | `docs/tranches/V/OWNER-DECISIONS.md` — **1 file, 226 insertions, 0 deletions** | *append-only, conditional* | **IN BOUNDS** |
| `.d` | kf **`b50a23de`** | the four `*-ADDENDUM-2026-09-19.md` sidecars — **4 files, 363 insertions, 0 deletions** | *append-only addenda beside the dated originals* | **IN BOUNDS** |
| `.e` | kf **`0a329c57`** | the **merge** of `v/w9-staging` — parents `b50a23de` + `b920b190`; **19 paths, 615 insertions / 1,234 deletions** | *kf branch `v/w9-staging` @ `b920b190` — land-or-kill* | **IN BOUNDS — proven by set inclusion**: ⟨cmd⟩ `git diff --name-only $(git merge-base 69095552 b920b190) b920b190 \| sort` → **21 paths**; ⟨cmd⟩ `git diff --name-only b50a23de 0a329c57 \| sort` → **19 paths**; ⟨cmd⟩ `comm -13` of the two → **EMPTY**. **The merge brought in nothing the branch did not carry.** |
| `.f` | kf **`dd28da55`** | `INBOUND-LEDGER.md` + `DISPOSITIONS.md` — **2 files, 179 insertions, 0 deletions** | *modify — ledger terminalization* | **IN BOUNDS** |
| `.f` | value **`d84727fc`** | `INBOX.md` · `close/FINAL-KF.md` (create) · **10** sibling wave specs — **12 files, 222 insertions, 15 deletions** | *modify (mail rows) · create · one four-verb row per sibling* | **IN BOUNDS** |
| receipts | value `a7c742ab` · `cc488e6e` · `517b88f5` · `59934936` · `228deda8` · `f67eadfc` · `7ba649de` · `a224bf22` · `7c1f56f3` | `docs/tranches/X/execution/B/KF-W10.md` **only**, every one | the execution record each dispatched seat appends to | **IN BOUNDS** |

**`scripts/dev/dev.sh` in 0 of the 5 kf commits and 0 of the 11 value commits** — ⟨cmd⟩
`git show --stat --format='' <each> \| grep -c 'dev.sh'` → **0** across the board. **No commit crossed into a
sibling seat's staged paths**: every value commit's `--stat` is a strict subset of its unit's declared set,
and `CARRY-LEDGER.md`, `C/F-W3.md` and the `demo/**` rows appear in **none** of them.

**LANDED-WRONG: NONE.** Two things were tested for it and cleared, and both are recorded rather than left
implicit: **(i)** `.e`'s merge lands product source in keyframes.js (`bench/` · `scripts/` · `test/` ·
`.github/` · `package.json`), which §4's *"EXPLICITLY NOT IN BOUNDS: any product source in either repo"*
would convict **if the wave had authored it** — it did not; G-7's LAND arm is *"branch `v/w9-staging` is
**merged**"*, and the set-inclusion proof above shows every landed path is the branch's own cargo.
**(ii)** `.e`'s BV-2 type cure (`Partial<AnimationLayerConfig>` in
`test/group/static-weight-composite-golden.test.ts`) is a byte this wave authored into a source file — and
that file is the **branch's own new file**, absent at `69095552`, whose landing G-7's TC-5/typecheck clause
requires to be regression-free. **Recorded as a dated observation of what the LAND arm costs, not as an
out-of-bounds write.**

### ACT 2 — the seven gates, re-run at THIS seat against §5's GREEN definitions

**BEFORE** = the sitting-2 born-RED baseline (or the owning unit's own BEFORE). **AFTER** = this seat's own
commands at kf `origin/master` **`dd28da55`** (⟨cmd⟩ `git rev-list --left-right --count HEAD...origin/master`
→ **`0 0`**) and value `tranche-u` at **`7c1f56f3`**. Every published figure is double-run.

| gate | §5 GREEN definition | BEFORE | AFTER — this seat's readings (run 1 ≡ run 2) | verdict |
|---|---|---|---|---|
| **G-1** | 15/15 §B rows carry **exactly one** §3.1 verb with its evidence form; §A/§B source **byte-unchanged**; denominator **15 and only 15** | RED — 15 rows, **0** verbed, `grep -ci addendum` → 0 | `origin/master:FOLD-FORWARD.md` **246 L / 41,438 B**; `^# ADDENDUM` → **1**; §B source rows `awk 'NR>30 && NR<48 && /^[0-9]+\./'` → **15**; discharge rows → **15**; **per-row verb-occurrence vector `1:1 2:1 … 15:1`** (true occurrence arithmetic, `grep -oE … \| wc -l`, never `-c`); per-verb split **RULED 2 · FOLDED-TO 4 · STANDING-CARRIED 8 · DISCHARGED-BY-CONSTRUCTION 1 = 15**; **verb cell read by position** (`awk -F'\|' '{print $4}'`) → all 15 are alphabet members, **0** status words in a verb cell ⟨the one `grep -i pending` hit is row 5's **quotation of the owner's own `DEFERRED PENDING GLASS'S DOCK MARK`** inside the evidence cell — found, named, disqualified⟩; **E-3 at the byte**: `head -54 \| shasum` → `797029037559bbc64d935285065f83ae2fb958b9` ≡ the whole-file shasum at `69095552` | **GREEN** |
| **G-2** | ∅ both directions; one table; every row terminal-worded; **zero re-bookings**; right hand = **authored bounds ∪ §6.D cargo** | RED — no table; 58 / 57 / 1,218 | left hand arm 1 **58 records · 57 carrying · 1,218 occurrences** (≡ run 2); `### §4.1` at `COHESION.md:117` with **seven** subsections `A`–`G`; arm-1 rows written **57**, rows **lacking** a terminal word **0**; arm 2 **14** intake rows + **1** `DRAINED 2026-09-18` pointer row, intake bytes unchanged; right hand **11** bounds blocks `W0 17 · W1 12 · W2 53 · W3 4 · W4 40 · W5 43 · W6 59 · W7 36 · W8 46 · W9 49 · W10 12` ∪ §6.D cargo `^### P[0-9]` W11 **9** · `^### U[0-9]` W12 **6** · `^### P[0-9]` W13 **2** = **17**; `DISCHARGED by KF.W7 SWAP verdict` stamped on a row → **0** (the KEEP verdict honoured); **OP-5 at close**: `git status --porcelain -- docs/tranches/X/keyframes/` → **0 lines**, bounds vector identical to `.b`'s | **GREEN** |
| **G-3** | three verbatim rulings **or** three `complete_with_misses` each citing its **exact** pending precondition, as a **named artefact** | RED — 0 of 3; `:7` HELD, `:9` DEFERRED | `origin/master:OWNER-DECISIONS.md` **235 L / 25,780 B**; ⟨cmd⟩ `diff <(git show 69095552:… \| head -9) <(git show origin/master:… \| head -9)` → **IDENTICAL** (the 2026-07-17 rows untouched); **(1) OG-KF1 RULED** — ⟨cmd⟩ `diff` of COHESION `§0j.C:926-929` against the block's own de-quoted text → **no output, character-identical**; **(2) OD-V3 `complete_with_misses`** citing `SS-13-CAPTURE-RECEIPT.md:35` (`0 of 16` occurs **3×**, `SS-13-CAPTURE-RECEIPT` **3×**); **(3) OD-V5 `complete_with_misses`** citing the producer G-2 ask + `SS-13:80` + `SS-13:97`. **No proxy, no default, no inference** | **GREEN** |
| **G-4** | one register, **seven** entries, ordinals binding, entry **(7)** carrying the REPO-SCOPED restatement; the witness **partitioned**; zero bare citations in the live-spec class | RED — no register; field 34 / 108 / 77 | register ⟨cmd⟩ `grep -oE '^\| \*\*\([1-7]\)\*\*' \| sort \| uniq -c` → **1 each for (1)…(7)**, total **7**; entry **(7)** `REPO-SCOPED` → **1**; **field re-run whole, three units, double-run: 34 files · 121 occurrences · 82 lines** — **exactly `.g`'s fixpoint, reproduced at a second seat**; **partition re-derived at this seat and checking itself against all three totals**: live-spec **3 / 27** · conformance **7 / 30** · megatranche substrate **19 / 44** · execution+artefact **5 / 20** → `3+7+19+5 = 34`, `27+30+44+20 = 121`; **live-spec bare citations: 0** — `KF-W0.md:378`/`:695` and `KF-W3.md:209`/`:329`, **4 of 4 carrying the supersession on their own line** ⟨see residual **R-C1**: the same per-line test applied to `KF-W10.md` itself returns **10** non-carrying lines, every one the gate's own witness regex or the register entry's **name**; the reading of record is the spec's own — the subject is the PARTITION, and the adjudicating text is not a citation⟩ | **GREEN** |
| **G-5** | four addenda **beside — never inside**; `git diff` **empty** on the originals; anchors re-resolved; the two named locks held | RED — 0 addenda | ⟨cmd⟩ `git diff --stat 69095552 origin/master -- <the five originals>` → **EMPTY — not one changed byte**; four `*-ADDENDUM-2026-09-19.md` at `origin/master`, `dirname` of each ≡ `dirname` of its original (**BESIDE ×4**); line 1 of each = `SERVED MODEL: claude-opus-5[1m]` ×4; `home.json` at the frontier **PARSES** (`python3 json.load`) — the manifest took a **sidecar**, never an inline comment; the **ADDENDUM-SET LOCK** held at **four** (KF-EST-23 is one addendum over two originals, the decision declared at `.d` Act 4, not drifted into) | **GREEN** |
| **G-6** | both ledgers terminal — zero UNREAD, terminal verb + dated row on every entry, the two converged rows each with **one honest closing line**, neither dressed as an adoption; **L-6** | RED — no verb set; `.f` measured **3 UNREAD** (`I-32`/`I-33`/`I-34`) | value `INBOX.md` **253,614 B · 74 rows**; **Status cell read BY POSITION** (`awk -F'\|' '{c=$(NF-1)}'`, never a bare `grep -i unread`) → **0 of 74 begin `UNREAD`** (≡ run 2); `I-10` carries `NOT ADOPTED` **1** · `O-8` carries `PRE-EMPTION` **1**; kf `INBOUND-LEDGER.md` **89 L / 17,376 B · 9 rows · `ADDENDUM 2026-09-19` 1 · `CC-084` 1** and `DISPOSITIONS.md` **238 L / 30,691 B · `O-8` 2 · `NOT ADOPTED` 2**, both at `origin/master`; **E-3**: `git diff --numstat 69095552 origin/master` → **`53 0` · `126 0`** — **zero deletions in both**; `close/FINAL-KF.md` **205 L / 12,758 B** at value `HEAD`; **L-6 battery re-run WHOLE at this seat: 12 of 12 letters `git cat-file -e` PRESENT** (7 at kf `origin/master`, 5 at value `HEAD`) | **GREEN** |
| **G-7** | merge + four CI-run witnesses + TC-5 + **MR4's red-once witness at landing** + **§B-9's MR2 runner-parity observation** + the LAW A census re-derived at the landing tree — **or** a tombstone naming 8 units | RED — `b920b190` unmerged | ⟨cmd⟩ `git merge-base --is-ancestor b920b190 origin/master` → **ANCESTOR — LANDED**; ref `v/w9-staging` still at `b920b190` (provenance kept, nothing force-pushed); prune set at the frontier **4 ABSENT · 2 PRESENT** — the two `.measure.test.ts` the re-derived census **vetoed**, exactly as LAW A requires; tombstone artefact `docs/tranches/V/audit/W9-tombstones.md` **216 L** at `origin/master`; **CI witnesses re-read by id at this seat** ⟨cmd⟩ `gh run view`: **35421021299 ci @ `0a329c57` failure · 35413127952 ci @ `69095552` failure (the pre-landing control, identical colour and identical failure step) · 35421048324 deploy-pages @ `0a329c57` skipped · 35421911950 ci @ `dd28da55` failure**; **ESC-e1 confirmed uncured at the frontier**: `package.json:84` `"@vue/test-utils": "^2.5.1"` against ⟨cmd⟩ **0** `node_modules/@vue/test-utils` entries in `package-lock.json` | **LAND stamped · RED-HONEST on 2 of 6 clauses** — MR4's red-once witness (**CONVERGED**, unobtainable by construction) and §B-9's MR2 parity observation (**UNDISCHARGED**, the `browser oracles` step has never executed) |

**R.2 at the close altitude — no GREEN the owning unit did not measure, and no RED it hid.** Every one of the
seven reproduces at a second, independent seat. The two figures that moved since sitting 2 moved **for a named
reason and nothing else**: G-4's field `34/108/77 → 34/121/82` (the `.c`/`.e`/`.f`/`.g` receipts landing inside
their own witness, attributed to the line at **F-1**) and value `INBOX.md` `237,857 → 253,614 B` (`.f`'s
terminalization block plus Track A's sweep lines). **Dated observations moving, never greens.**

### ACT 3 — §Verification Artefacts (§10), run as written

> *"Artefacts: `close/FINAL-KF.md` (commits and pasted commands only; cites no document this close authored —
> L-6), the §B addendum, the set-difference table, the register, the four addenda, the landing run IDs or the
> tombstone, both terminal ledgers."*

| # | artefact | probe at this seat | reading |
|---|---|---|---|
| 1 | `close/FINAL-KF.md` | `git cat-file -e HEAD:…` · `wc -lc` · the L-6 battery re-run whole | **PRESENT · 205 L / 12,758 B · 12 of 12 letters resolve** |
| 2 | the §B addendum | `git show origin/master:FOLD-FORWARD.md \| grep -c '^# ADDENDUM'` | **1**, holding 15 discharge rows + the 4-record carry block |
| 3 | the set-difference table | `grep -n '^### §4.1' COHESION.md` | **`:117`**, seven subsections `§4.1.A`–`§4.1.G` |
| 4 | the never-cite register | ordinal probe over `origin/master:OWNER-DECISIONS.md` | **7 rows, (1)…(7) at 1 each**, entry (7) REPO-SCOPED |
| 5 | the four addenda | `git ls-tree -r --name-only origin/master \| grep ADDENDUM-2026-09-19` | **4 files**, each beside its original |
| 6 | the landing run IDs **and** the tombstone | `gh run view` ×4 · `git cat-file -e origin/master:docs/tranches/V/audit/W9-tombstones.md` | **4 run IDs resolve with their conclusions · tombstone 216 L present** ⟨the LAND arm owed only one of the two; both exist⟩ |
| 7 | both terminal ledgers | `git show origin/master:` ×2 · `numstat` vs `69095552` | **17,376 B / 9 rows** and **30,691 B / 52 rows**, `53 0` and `126 0` — **zero deletions** |
| 8 | the owner block | `grep -n 'OG-KF1\|OD-V3\|OD-V5'` at `origin/master` | **3 rows: 1 RULED + 2 `complete_with_misses`** |

**8 of 8 banked.** **L-6 holds at a second seat**: every letter `FINAL-KF.md` relies on resolves, and its two
self-referencing hits are a `git log … -- <its own path>` **command** and a `grep` **measurement over a
sibling this close did not author** — the *"cites no document this close authored"* claim stands at the bytes.

### ACT 4 — E13: the four-path mail sweep at this seat's own clock

⟨cmd⟩ `date` → `Sat Sep 19 01:04:12 EDT 2026`. Classification taken from **each row's own Status cell**,
never from a bare `grep -i unread`; `INBOX.md` **self-excluded** (SELF-COUNT law).

| # | path | newest member at this clock | rowed as |
|---|---|---|---|
| 1 | value `docs/tranches/V/` + `V/coordination/` | ⟨cmd⟩ `find … -newermt "2026-09-19 00:30"` → **1 member, `INBOX.md` (self)** | — |
| 2 | `../glass-ui/docs/tranches/BK/coordination/` — **BK re-confirmed newest** ⟨cmd⟩ `/bin/ls -1dt ../glass-ui/docs/tranches/*/ \| head -3` → `BK/ · BJ/ · BI/` | `glass-outbound-2026-09-18-valuejs-o26-reply.md` | **I-35**, rowed 2026-09-18 |
| 3 | `../keyframes.js/docs/tranches/V/coordination/` | `INBOUND-LEDGER.md` (ours — `.f`'s addendum); newest **letter** = `VALUEJS-INBOUND-2026-09-17-o8-o11-amendment-addendum.md` | **O-21** — ours, delivered |
| 4 | `../sci-report/atlas/docs/tranches/P/coordination/` | `valuejs-inbound-2026-07-27-library-band-export-delta.md` | **O-12** — ours; path UNMOVED |

**ZERO unrowed letters addressed to value.js · ZERO UNREAD status cells over 74 rows · register tail
`I-35` / `O-38` · no `I-n`/`O-n` minted at this seat.** **No wave closes with UNREAD mail in scope, and this
one does not.**

### ACT 5 — the four-verb line, moved ONLY as §State says this wave moves it

| verb | before this seat | after | authority |
|---|---|---|---|
| AUDITED | YES | **YES — untouched** | — |
| SPECIFIED | YES (file-scope) | **YES — untouched**; the **sub-tranche-scope** withhold was lifted at COHESION **§0t**, not here | §0t, the root session's act |
| **IMPLEMENTED** | **NO** | **YES — `complete_with_misses`, 2026-09-19** | §State: *"gates green + bytes landed in the named execution site stamps this"*, the site being `execution/LEDGER.md`, whose row this seat moves in the same act. This is the **one** row `.g`'s **F-2** names as this wave's own |
| VERIFIED | **YES — stamped by `.f`** | **YES — untouched by this seat** | R-A designates **this wave's own close unit** (`.f`) as the stamping seat, and `.g` adjudicated the stamp **STANDS** as `complete_with_misses`. A close seat does not re-stamp what the designated seat already set |
| ACCEPTED | not conferred | **not conferred** | §10's **L-18 rider** — two challenging gestalt passes + a fresh-Fable apotheosis come first |

⟨cmd⟩ `git diff --numstat -- docs/tranches/X/keyframes/waves/KF-W10.md` at this seat → **`1 1`** — **one row
edit, no prose reflowed, no sibling spec touched.** The nine siblings' `IMPLEMENTED | NO` rows are **left
exactly as F-2 found them** and carried below as **R-C2**.

### Residuals, each with a named owner

| id | residual | owner |
|---|---|---|
| **R-C1** | **G-4's per-line supersession test, applied to `KF-W10.md` itself, returns 10 non-carrying lines.** Measured here rather than left implicit: ⟨cmd⟩ the witness grep over `X/keyframes/waves/KF-W10.md` filtered for lines lacking `345`/`8281638c` → **10** — `:113` `:287` `:377` `:437` `:439` `:441` `:453` `:455` `:567` `:653`, **every one either the gate's own witness regex, the register entry's NAME, or a quotation of the OG-V1 question**. The reading of record is the spec's own (§G-4 property (ii): *"the gate's subject is the PARTITION, not the count"*, with `PASS-3/KF-W10-CHECK.md` §0 as the bare-citation finding of record), and `.c` verified the four **adjudicable** live-spec lines carry both tokens. **No verdict moves.** The honest re-cut — a witness that distinguishes an adjudicating spec's naming use from a coverage citation — is the successor spec author's, the gate's regex being E-3-immutable here | **successor X·KF formation author** (rides beside `.g`'s **F-1b**, the same instrument) |
| **R-C2** | **F-2 uncured for the nine siblings** — `KF-W0/W1/W2/W4/W5/W7/W8/W9` still read `IMPLEMENTED \| NO` beneath `VERIFIED \| YES`, while `execution/LEDGER.md` reads **CLOSED** for each. R-A permitted `.f` one row edit and it spent it on VERIFIED. **KF-W10's own half is cured at this close** (Act 5); the nine are not | **the successor formation** — a dated program-wide E-3 addendum, or each spec's own one-row edit citing its CLOSED ledger row |
| **R-C3** | **ESC-e1 — kf `package-lock.json` desync at `origin/master`** (`3a01e362` added `@vue/test-utils ^2.5.1`; the lock last moved at `fb509edd`, earlier). It is the **single** precondition of both of G-7's undischarged clauses, and it is **out of every KF.W10 unit's §4 bounds**. Re-measured uncured at this seat | **the manifest's owning hand** (X.KF.W7.a's, i.e. the orchestrator under §0j.C KF-WRITE) — regenerate the lock, one `ci` run at that SHA in which `browser oracles` actually executes, then read §B-9's MR2 parity observation |
| **R-C4** | **MR4's *"CI red-once witness at landing"* can never be obtained in that form** — it converged into X.KF.W4's identical step, which landed with its own history. Its honest terminal form is `.e`'s **convergence record**, not a future run. Recorded so a later seat does not hunt a witness that cannot exist | **closed by construction**; carried for the record |
| **R-C5** | **OD-V3 stays HELD and OD-V5 stays DEFERRED** at kf `OWNER-DECISIONS.md:7`/`:9`. `.g` took the §0j.C sitting and **ruled nothing**, on the packet's own two-limb precondition (a 390-wide cell that can render, and one that stays open — *"Allow Remote Automation"* re-enabled by a hand that can answer an admin prompt). **The transport home is neither chosen nor defaulted** | **OWNER** (OD-V3) · **glass-ui's dock mark via the SS-6 relay** (OD-V5) |
| **R-C6** | **`LANDED in a wave` is an OWNERSHIP word, not a shipping word.** Forty of G-2's 57 arm-1 rows land at `KF.W11`/`KF.W12`/`KF.W13`, **authored but unexecuted**. The NO-WAVE-OWNER condition is cured; **the cures are not** | **the three successor waves**, per §6.D's register row |
| **R-C7** | **`CH-05` uncured at the kf frontier** (4 `nightly` hits against a `dow=1` cron), verbed `FOLDED-FORWARD` with its count printed rather than closed on its wave's name; and **three mail rows are terminal AS MAIL while their routed work is live** (`X-W0.j` / `X-EXT-1`) | **the successor formation** (`CH-05`) · **Track A / X-EXT-1's owners** (the routed work) |
| **R-C8** | **`.a`'s residuals 4 and 5 survive as recorded**: the `IN-ATLAS-3` / `IN-ATLAS-5` double spelling for one fence obligation (re-keying is not this wave's act, §2), and `CARRY-C-5`'s two-ended routing, **recorded not dissolved — it may not be filed twice** | **the successor formation** |
| **R-C9** | **F-3's dated coordinate drift** — `.a`'s kf addendum cites COHESION `:120`/`:129`; `.b` then inserted §4.1 above §4a in the same wave, so those rows now sit at `:380`/`:389`. **The fold's key is positional and resolves**; the line numbers are dated observations. Recorded, not re-issued (E-3) | **closed by record** |

### Escalations

**NONE NEW AT THIS SEAT.** Every act of the wave landed inside the declared writable set; where the specified
cure was impossible at the bytes (**KF.W6's absent four-verb table**), nothing was substituted and the miss
was declared at `FINAL-KF.md` §5 rather than smoothed. **ESC-e1 is already routed** by `.e`, `.f`, `.g` and
`FINAL-KF.md` §4 and is re-routed above as **R-C3**; it is not a new escalation. **No workaround, no masking
fallback, no `test.skip`, no allowlist, no `node_modules` patch, no `git stash`, no `reset --hard`, no
force-push, no glass-ui byte, and `scripts/dev/dev.sh` in zero commits of either repo.**

### SELF-COUNT law

This Close block lands **inside** G-4's witness field (value.js `docs/tranches/X/`) and carries **none** of
G-4's three witness tokens — it names them only as *"the three witness tokens"* and as the `345`/`8281638c`
supersession pair, which is not one of them. **It contributes 0 files · 0 lines · 0 occurrences**, so ⟨cmd⟩
the gate's own three commands re-run after this write must still read **34 / 121 / 82** — `.g`'s fixpoint,
now reproduced at a second seat and preserved by a third.

---

## Check 1

**SERVED MODEL**: `claude-opus-5[1m]` · **FRESH ADVERSARIAL L-20 PASS 1 — VERIFY-ONLY.** An independent seat
that authored **no byte** of the wave's cures, of any unit receipt, of `## Close`, or of `FINAL-KF.md`.
**Seat clock** 2026-09-19 01:1x → 01:3x EDT (⟨cmd⟩ `date` → `Sat Sep 19 01:16:37 EDT 2026` at the E13 sweep).
**Sitting of record stays 2026-09-17.** **This block is the seat's only write besides `execution/LEDGER.md`'s
own row cell** — no §4 path, no cure byte, no spec byte, no sibling tree, no keyframes.js byte.

**CRASH-RECOVERY SWEEP (standing law, first act).** ⟨cmd⟩ `git status --porcelain` in both repos this seat
may write: **value.js — 4 rows** (`docs/tranches/V/reformation/CARRY-LEDGER.md` ·
`e2e/smoke/a11y-gradient-stop-grammar.spec.ts` · `docs/tranches/X/waves/evidence/W4/gradient-grammar.json`
untracked · `scripts/dev/dev.sh` **unowned, NEVER touched, never staged**), every one a sibling track's and
**outside this seat's writable set**; **keyframes.js — 2 rows**, the two untracked value-authored letters
(the §B-12 reset's survivors), outside the set. ⟨cmd⟩ the same over `docs/tranches/X/execution/` → **zero
lines**. **Inherited work on this unit: NONE — no inherited paths to name.** Nothing stashed, restored,
reset or unstaged.

**SUBSTRATE.** kf `origin/master` = **`dd28da55`** (⟨cmd⟩ after `git fetch`, `git rev-parse origin/master` →
`dd28da555c33611ef23f9c290c176e66b4216b5c`); value `tranche-u` at **`5c240a1d`** (Track A/C have committed
above the close; no KF.W10 path moved). Every keyframes reading below is `git show origin/master:…`.

### C1.1 — THE SEVEN GATES, re-run at THIS seat against §5's GREEN definitions (every published figure double-run)

| gate | this seat's own commands and outputs | verdict |
|---|---|---|
| **G-1** | `origin/master:FOLD-FORWARD.md` **246 L / 41,438 B**; `grep -c '^# ADDENDUM'` → **1**; `awk 'NR>30 && NR<48 && /^[0-9]+\./'` → **15**; **per-row alphabet-token occurrence vector over the 15 discharge rows `:101`–`:115` → `1` on every row** (printed row-by-row at this seat, `grep -oE 'LANDED\|KILLED\|RULED\|FOLDED-TO\|STANDING-CARRIED\|DISCHARGED-BY-CONSTRUCTION' \| wc -l`); per-verb split **RULED 2 · FOLDED-TO 4 · STANDING-CARRIED 8 · DISCHARGED-BY-CONSTRUCTION 1 = 15**; **E-3 at the byte**: `head -54 \| shasum` at `origin/master` = `797029037559bbc64d935285065f83ae2fb958b9` ≡ the **whole-file** shasum at `69095552` (54 L / 9,289 B) | **GREEN — reproduces** |
| **G-2** | left hand `ls kf-*.md \| wc -l` → **58** · `grep -l` → **57** · `grep -o` → **1,218** (≡ run 2); `### §4.1` at `COHESION.md:117`, seven subsections `A`–`G`; arm-1 rows → **57**, rows **lacking** a terminal word → **0**, tally `LANDED in a wave` **57** + `ADOPTED-BY-KF.W6` **3**; `DISCHARGED by KF.W7 SWAP verdict` **stamped on a row** → **0** (its 2 file hits are the alphabet line `:125` and the zero-emission statement `:332`); right hand **11** bounds blocks `W0 17 · W1 12 · W2 53 · W3 4 · W4 40 · W5 43 · W6 59 · W7 36 · W8 46 · W9 49 · W10 12` ∪ §6.D cargo `grep -c '^### P[0-9]' KF-W11.md` → **9** · `'^### U[0-9]' KF-W12.md` → **6** · `'^### P[0-9]' KF-W13.md` → **2** = **17**. **THE STRONGEST CHECK THIS SEAT RAN, and it holds**: the arm-1 row NAMES and the 57 carrying record BASENAMES are **set-equal** — ⟨cmd⟩ `comm -23` → **empty** · `comm -13` → **empty**. ∅ in both directions is real, not asserted | **GREEN — reproduces** |
| **G-3** | `origin/master:OWNER-DECISIONS.md` **235 L / 25,780 B**; `diff <(git show 69095552:…) <(git show origin/master:… \| head -9)` → **no output** — the entire pre-wave file (9 L) is the new file's first 9 lines, so `:7` HELD and `:9` DEFERRED are **byte-untouched**; addendum at `:13`, owner block `:27`, **(1) OG-KF1 RULED** transcribed from COHESION §0j.C (`KF-OGKF1`, read at `:926-929` this seat — *"STALE-BY-SUBSTRATE and does not continue … never as HEAD coverage"*, character-identical), **(2) OD-V3** and **(3) OD-V5** `complete_with_misses` each citing a **named artefact at a measured coordinate** (`SS-13-CAPTURE-RECEIPT.md:35` *"0 of 16 required cells"*; the producer G-2 ask + `SS-13:80`/`:97`) | **GREEN — reproduces** |
| **G-4** | register ordinals `grep -oE '^\\\| \*\*\([1-7]\)\*\*' \| sort \| uniq -c` → **1 each for (1)…(7)**; `REPO-SCOPED` → present at entry (7); **the field re-run whole with the gate's own three commands, double-run: 34 files · 121 occurrences · 82 lines (run 1 ≡ run 2)** — `.g`'s fixpoint and the close's reading, now reproduced at a **third** seat; **partition re-derived independently and checking itself against all three totals**: live-spec **3 / 27** (W0 **2** · W3 **2** · W10 **23**) · conformance **7 / 30** · megatranche substrate **19 / 44** · execution+artefact **5 / 20** → `3+7+19+5 = 34`, `27+30+44+20 = 121`; **live-spec bare citations: 0** — the four adjudicable lines `KF-W0.md:378`/`:695` and `KF-W3.md:209`/`:329` each carry the `345 … 8281638c` supersession on their own line (⟨cmd⟩ the inverse filter returns **nothing**) | **GREEN — reproduces** |
| **G-5** | `git diff --stat 69095552 origin/master -- <the five originals>` → **EMPTY, not one changed byte**; four `*-ADDENDUM-2026-09-19.md` at `origin/master`, `dirname` of each ≡ `dirname` of its original (**BESIDE ×4**); line 1 of each = `SERVED MODEL: claude-opus-5[1m]` ×4; `home.json` at the frontier **PARSES** (`python3 json.load`) — the manifest took a sidecar, never an inline comment; the set is **four** and did not grow | **GREEN — reproduces** |
| **G-6** | value `INBOX.md` **251 L / 253,614 B · 74 rows**; **Status cell read BY POSITION** (`awk -F'\|'` on field 6 of each `I-`/`O-` row, never a bare `grep -i unread`) → **0 of 74 begin `UNREAD`**; `I-10` carries `NOT ADOPTED` **1** · `O-8` carries `PRE-EMPTION` **1**; kf `INBOUND-LEDGER.md` **89 L / 17,376 B**, `ADDENDUM 2026-09-19` **1**, `CC-084` **1**; `DISPOSITIONS.md` **238 L / 30,691 B**, `O-8` **2**, `NOT ADOPTED` **2**, rows `58 − 6 = 52`; **E-3**: `git diff --numstat 69095552 origin/master` → **`53 0`** and **`126 0`** — zero deletions in both; `close/FINAL-KF.md` **205 L / 12,758 B**; **the L-6 battery re-run WHOLE at this seat: 12 of 12 letters `git cat-file -e` PRESENT** (7 at kf `origin/master`, 5 at value `HEAD`) | **GREEN — reproduces** |
| **G-7** | `git merge-base --is-ancestor b920b190 origin/master` → **ANCESTOR (LANDED)**; `git ls-remote --heads origin \| grep w9` → still `b920b190` (provenance kept, nothing force-pushed); tombstone `docs/tranches/V/audit/W9-tombstones.md` **216 L**; prune set at the frontier **4 ABSENT** (`bench/group-soa-integration.mjs` · `bench/taxonomy.json` · `bench/typed-om-validate.mjs` · `scripts/probe-webkit-linear-accel.mjs`) **· 2 PRESENT** (the two `.measure.test.ts` the re-derived LAW-A census vetoed); **`.e`'s set-inclusion proof re-run independently**: `git diff --name-only $(git merge-base 69095552 b920b190) b920b190` → **21 paths**, `git diff --name-only b50a23de 0a329c57` → **19**, `comm -13` → **EMPTY** — the merge brought in **nothing the branch did not carry**; **four CI witnesses re-read by id** (⟨cmd⟩ `gh run view --json headSha,conclusion`): `35421021299` ci @ `0a329c57` **failure** · `35413127952` ci @ `69095552` **failure** (control) · `35421048324` deploy-pages @ `0a329c57` **skipped** · `35421911950` ci @ `dd28da55` **failure**; **the failure STEP is identical at the pre-landing SHA — ⟨cmd⟩ `gh run view --json jobs` on both: `npm ci` (library gates) and `npm ci (demo consumer graph)` at BOTH SHAs**, so the landing neither caused nor worsened it; **ESC-e1 confirmed uncured**: `package.json:84` `"@vue/test-utils": "^2.5.1"` against **0** `node_modules/@vue/test-utils` entries in `package-lock.json` | **LAND stamped · RED-HONEST on 2 of 6 clauses — reproduces** |

**R.2 at the check altitude: 7 of 7 gate verdicts reproduce. No claimed GREEN failed at this seat's own
double-run commands, and no RED the close hid was found.**

### C1.2 — THE HONEST-RED SET, adjudicated at the SPEC's bytes (axis 10)

**G-7 is the only gate the close leaves RED, and it is RED on 2 of its 6 acceptance clauses. Both are
relieved by the spec's own terms and both are owner-named in the record's residual register.**

| RED clause | relief, cited at the spec | owner named in the record |
|---|---|---|
| **MR4's *"CI red-once witness at landing"*** | **Closed by construction, not deferred.** MR4 **CONVERGED** into X.KF.W4's identical `demo correctness suite` step, which landed earlier with its own history, so a witness of the form *"red once, at this landing"* can never be produced. This seat verified the convergence at the bytes: the merged `ci.yml` carries **exactly one** `- name: demo correctness suite` step (`:83`) and the staged duplicate is **dropped**, with the convergence recorded beside it — the spec's §5 G-7 falsifier convicts a claimed landing, never an honest non-claim | **R-C4 — *closed by construction; carried for the record*** |
| **§B-9's MR2 runner-parity observation** | **Blocked by ESC-e1, and the cure is OUT OF EVERY UNIT'S §4 BOUNDS.** kf `package-lock.json` never took `3a01e362`'s `@vue/test-utils@^2.5.1` (+14 transitives), so `npm ci` terminates both CI jobs before the `browser oracles` step executes. §4's *"EXPLICITLY NOT IN BOUNDS: any product source in either repo"* covers the lockfile, and regenerating it from this wave would be the consumer-patch this program's standing law calls a HIGH defect. **The pre-existence is proved, not asserted**: the control run at the pre-landing SHA fails at the **same step in both jobs** | **R-C3 — *the manifest's owning hand (X.KF.W7.a's, i.e. the orchestrator under §0j.C KF-WRITE)*** — regenerate the lock, one `ci` run at that SHA in which `browser oracles` actually executes, then read the parity observation |

**Neither is an unrelieved RED**, and neither is laundered: G-7's own cell, `FINAL-KF.md` §4, `.e`'s Act 8,
`.f`, `.g` and `## Close` all print the same two clauses with the same single precondition. **OD-V3 (HELD)
and OD-V5 (DEFERRED) are not gate REDs** — G-3's acceptance names `complete_with_misses` as a first-class
arm, and COHESION **§0j.C KF-ODV3** authorizes exactly that shape **in advance** (*"if the packet does not
exist by then KF.W10 closes `complete_with_misses` on that row citing its exact precondition"*), which this
seat read whole at `:946`.

### C1.3 — AXES 2–9, each measured

- **Axis 2 — writes inside §4.** `git show --stat` on all **12** value commits and all **5** kf commits:
  every path is a §4 grant (`COHESION.md` · `INBOX.md` · `close/FINAL-KF.md` · ten sibling wave specs at
  **1 insertion / 1 deletion each** · `KF-W10.md`'s own rows · `execution/B/KF-W10.md` · kf `FOLD-FORWARD.md`
  · `OWNER-DECISIONS.md` · the four addendum sidecars · `INBOUND-LEDGER.md` · `DISPOSITIONS.md` · the
  `v/w9-staging` merge). ⟨cmd⟩ `git show --stat --format='' <each> \| grep -c 'dev.sh'` → **0** across all
  seventeen. **`scripts/dev/dev.sh` untouched; no glass-ui byte; no sibling seat's staged path swept in.**
- **Axis 3 — masking fallbacks: NONE.** ⟨cmd⟩ over the merge's **634** added lines, filtered for
  `test.skip\|it.skip\|xit(\|continue-on-error\|\|\| true\|allowlist\|@ts-ignore\|@ts-expect-error\|eslint-disable`
  → **0 hits**. The three `try {` hits are `try/finally` **mount-teardown** harnesses (TC-5's `withSetup`,
  which is the cure, not a swallow) and one docblock. `deploy-pages.yml` moves the **other** way — MR3
  **closes** the AV-4 dispatch bypass and makes the escape an explicit logged input. `scripts/gates/visual/index.mjs`
  is a pure `proof:` → `review:` relabel with every `process.exit(1)` intact. **BV-2 is a root-cause retype**
  (`Partial<AnimationLayerConfig>`, the constructor's own declared parameter type) — **no cast, no skip, no
  allowlist**, and typecheck returned to the pre-landing baseline **23**.
- **Axis 4 — commit families.** §10's six commits map one-for-one to `025e894c` · `15da439f` · `27ec9c37` ·
  `b50a23de` · `0a329c57` · (`dd28da55` + `d84727fc`), each message byte-matching its §10 scope line.
  **Commit 6's two halves are a cross-REPOSITORY split, not a family split** — a commit cannot cross a repo
  boundary, and the kf half's own subject declares it (*"the kf half of commit 6"*). One commit per meaning;
  the four G-5 addenda rode **one** commit as §10 row 4 requires.
- **Axis 5 — E-3 held.** ⟨cmd⟩ `git show --stat` over all twelve value commits filtered for
  `registry/adjudicated\|conformance/` → **no output**: the adjudicated registry and every conformance
  artifact are **byte-untouched**. The dated spec moved by **one row** (`git diff --numstat` → `1 1`), and
  the ten siblings by one `VERIFIED` row apiece — R-A's exact grant, verified line-by-line at `d84727fc`
  (nine advance, **KF-W3 correctly reads `NO — NOT ADVANCED`**).
- **Axis 6 — mail.** Four-path sweep at this seat's own clock (⟨cmd⟩ `date` → `Sat Sep 19 01:16:37 EDT 2026`):
  value `V/coordination` newest = ours; glass **BK** re-confirmed newest tranche, newest letter
  `glass-outbound-2026-09-18-valuejs-o26-reply.md` = **I-35, rowed**; kf newest letter = ours; atlas newest =
  ours. **Register tail `I-35` / `O-38`; 0 unrowed letters; 0 UNREAD status cells over 74 rows.** The three
  rows `.f` advanced (`I-32`/`I-33`/`I-34`) were **read in full at their bytes** — each Status cell states the
  reading and each names the routed work as **still owed** (`X-W0.j` / `X-EXT-1`), which is terminalization,
  not laundering.
- **Axis 7 — the four-verb line.** AUDITED untouched · SPECIFIED untouched (the sub-tranche withhold was
  lifted at **COHESION §0t**, the root session's act at `f7dae874`, read whole at `:1529`) · **IMPLEMENTED
  NO → YES `complete_with_misses`** at the close seat · VERIFIED stamped by `.f` under **R-A**, whose text
  expressly makes this wave's close the stamping seat. **ACCEPTED not conferred** (L-18 rider). No sibling
  took more than its one row.
- **Axis 8 — the goal criterion.** Every inherited obligation carries **exactly one** terminal word with its
  evidence coordinate, verified class by class: **15 of 15** §B rows (vector above) · **57 of 57**
  NO-WAVE-OWNER records (set equality above) · **3 of 3** owner-gated rulings · **7 of 7** register entries ·
  **2 of 2** coordination ledgers · **4 of 4** carry-forward records (`KF-W8-R-4-STRUCT-PAIR` =
  `DECLINED-FOR-X·KF, carried forward` · `CARRY-C-3` = one verb per claimant against the **landed** C-17 mint
  `a331fae6`, never a guessed slot · `CARRY-C-4` = `RULED DELETE, 2026-09-18, KF.W6` · `CARRY-C-5` =
  `RECORDED — evaluate-not-replace`). **Nothing closes by omission** — the failure §2 declares fatal does not
  occur. See **C1-3** for the one literal reading the criterion does not take.
- **Axis 9 — published figures.** Every load-bearing figure in `## Close`, `.g` and `FINAL-KF.md` that this
  seat re-ran reproduced at its own double-run commands: `246 L / 41,438 B` · `34 / 121 / 82` · `58 / 57 /
  1,218` · `253,614 B / 74 rows / 0 UNREAD` · `17,376 B` · `30,691 B` · `205 L / 12,758 B` · `216 L` ·
  `53 0` / `126 0` · the four run IDs with their conclusions. **Not one AFTER reading needed correction.**

### C1.4 — SUCCESSOR "OPENS AFTER" CONJUNCTS, checked against this wave

**No successor is blocked by KF.W10 — none of the three names it.** Read at their bytes (`:30` of each):

- **KF.W11** — `G-KFW4-1 GREEN` · `KF.W7 CLOSED` · `KF.W8 CLOSED` · `KF.W6 CLOSED` · `KF.W0 §B-12`.
- **KF.W12** — `G-KFW4-1 GREEN` · `KF.W6 CLOSED` · `KF.W7 CLOSED` · `KF.W8 CLOSED` · `KF.W0 CLOSED` ·
  `KF.W11 .a` and `.b` commits (intra-successor).
- **KF.W13** — `G-KFW4-1 GREEN` · KF.W7's per-surface SWAP verdicts (`4c03ceda`) · `KF.W12 .b CLOSED` ·
  `KF.W6 CLOSED` · `KF.W8 CLOSED` · KF.W9's G-KFW9-9 pair.

**GREEN conjuncts**: every sibling-CLOSED conjunct holds — `execution/LEDGER.md` reads **CLOSED 2026-09-17**
for W0·W6·W7·W8·W9 and KF.W7's verdict table is LANDED. **The one RED conjunct is common to all three and is
NOT this wave's**: `G-KFW4-1 lands GREEN` is carried honest-RED by KF.W4's own close (LEDGER: *"CLOSED
2026-09-17 (honest-RED: G-KFW4-1 …)"*) and each successor measures it RED at its own clock (**54** `vue-tsc`
errors, double-run at their seats). **All three successors are therefore LAWFULLY BLOCKED, on a sibling
wave's carried RED and not on anything KF.W10 did or failed to do.** Their `MINTED-UNAUTHORED` premise moved
at `f208ff31` and `.b` reconciled the register against their real bounds **9 · 6 · 2 = 17** rather than
re-ruling it — the correct posture, since §6.D's terminal verb is not this close's to advance.

### C1.5 — REGISTER — severity · claim · receipt · cure

| # | sev | claim | receipt | cure |
|---|---|---|---|---|
| **C1-1** | **MINOR** (evidence integrity; found by `.g`, reproduced here) | **Two SELF-COUNT receipts of this record assert they carry none of G-4's three witness tokens while printing all three on the sentence that says so** — `.e`'s R-4 (`:1270`) and `.f`'s R-f7 (`:1536`). The claim is false at its own bytes | ⟨cmd⟩ over `execution/B/KF-W10.md`: **15 occurrences on 6 lines** — `:162 :309 :729 :814 :1270 :1536` (`grep -n` for the line set, `grep -o \| wc -l` for the occurrences, double-run). `.e`'s and `.f`'s cells each add 3 on 1 line | **ALREADY CURED-BESIDE**: `.g`'s **F-1** names both, attributes the `+6 / +2` field movement exactly, and E-3 leaves the receipts standing with the correction beside. **No verdict moves** — the record is not a live spec and the partition is unchanged. Carried as `.g` F-1 |
| **C1-2** | **MINOR** (doc-truth ladder inversion; this wave's own `.f` write created the upper half) | **Nine sibling specs now read `VERIFIED \| YES` above `IMPLEMENTED \| NO`.** R-A permitted `.f` exactly one row edit and it spent it on VERIFIED, so the contradiction could not be cured in the same act | ⟨cmd⟩ `grep -E '^\\\| IMPLEMENTED \\\|'` over the ten stamped specs → **`NO` in all ten** at `.g`'s clock; `execution/LEDGER.md` reads **CLOSED** for the nine. KF-W10's own half is cured at `## Close` Act 5 (`1 1`) | **OWNER NAMED, NOT ORPHANED** — `.g` **F-2** + `## Close` **R-C2** route it to the successor formation as a dated program-wide E-3 addendum, or each spec's own one-row edit citing its CLOSED ledger row. **Mitigated**: every VERIFIED cell cites its IMPLEMENTED basis from the ledger **by name**, so no reader is misled about the basis |
| **C1-3** | **MINOR-with-mitigation** (bounds; disclosed at the close, not hidden) | **`.e`'s merge authored bytes into keyframes.js source that §4 lists as `EXPLICITLY NOT IN BOUNDS: any product source in either repo`** — the BV-2 retype in `test/group/static-weight-composite-golden.test.ts` and one comment block in `.github/workflows/ci.yml` recording MR4's convergence | ⟨cmd⟩ `git cat-file -e 69095552:test/group/static-weight-composite-golden.test.ts` → **ABSENT** (the file is the **branch's own new file**); `git diff b920b190 0a329c57` on it → the three factory signatures retyped, **no value changed**; `ci.yml` wave-authored comment lines → **1 block**, behaviour unchanged (one `demo correctness suite` step, the staged duplicate dropped) | **NO CURE OWED.** G-7's LAND arm *is* a merge, §4 grants the branch, and the set-inclusion proof (`comm -13` **EMPTY**) shows every landed path is the branch's cargo. The retype is what makes the landing typecheck (23 → 26 → 23) and is idiomatic root-cause. `## Close` **LANDED-WRONG (ii)** declares it by name as *"a dated observation of what the LAND arm costs"* rather than smoothing it. **Does not block** |
| **C1-4** | **INFO** | **The four G-5 addenda are sidecar files whose paths §4 does not literally name** (§4 grants the five **originals** as *"append-only addendum beside `:109`"*) | `b50a23de` → 4 created paths, each `dirname`-equal to its original; `git diff --stat 69095552 origin/master -- <the five originals>` → **EMPTY** | **Compelled by the gate**: G-5's Statement (*"beside — never inside"*) and Falsifier (*"one changed byte in an original fails the gate"*) make a sidecar the **only** lawful execution, and §4 spells it out for `home.json`. `.d` Act 4 declared the placement rather than drifting into it |
| **C1-5** | **INFO** | **§2's goal criterion is met in substance but not in its literal *"one document"* spelling** — the terminal words live across four artefacts (the §B addendum, COHESION §4.1, the OWNER-DECISIONS addendum, the two ledgers) **indexed** by `FINAL-KF.md`'s commit list | `FINAL-KF.md` **205 L**, §1's seven commits + §2's per-gate commands | **Spec-internal tension, not an execution defect**: §10's own Artefacts clause constrains `FINAL-KF.md` to *"commits and pasted commands only; cites no document this close authored — L-6"*, which forbids it from being the one document. **No obligation closes by omission** (C1.3 axis 8), which is the criterion's own falsifier |
| **C1-6** | **INFO** | **COHESION §5 *"Status board (kept current at every boundary)"* carries no X·KF close entry** — its newest rows are the 2026-09-17 X·P ones, and the board's last X·KF reading is a pass-5 progress line | ⟨cmd⟩ `grep -n '^## §5'` → `:391`; board extends to `:885`; no 2026-09-19 X·KF row | The wave held `§5 status board` as a **modify-carve grant, never an obligation**, and no gate turns on it. `execution/LEDGER.md` + `FINAL-KF.md` are the close's records. Recorded for the successor's boundary sweep |
| **C1-7** | **INFO** | **The sitting-2 OPEN baseline published *"0 UNREAD status cells"* from a probe that could only ever return 0** (`awk` on `$NF`, the empty field after the trailing pipe); the true pre-state was **3** (`I-32`/`I-33`/`I-34`) | `.f`'s own commit body at `d84727fc` publishes both corrections by name and re-measures the gate at column 5 by position | **SELF-CAUGHT AND PUBLISHED INSIDE THE WAVE** before G-6 was read — the unit measured its own gate rather than inheriting the baseline's. Recorded as the honest shape, not as a live defect |

**ZERO BLOCKER · ZERO CRITICAL · ZERO HIGH · 3 MINOR (one already cured-beside, one owner-named, one
disclosed-and-mitigated) · 4 INFO.**

### C1.6 — VERDICT

> ### **CONFORMANT-HONEST-RED.**
> **7 of 7 gate verdicts reproduce** at this seat's own double-run commands — six GREEN and **G-7
> LAND-stamped, RED-HONEST on 2 of its 6 acceptance clauses**. Both remaining REDs are relieved under the
> spec's own terms and **owner-named in the record's residual register**: MR4's red-once witness is
> **closed by construction** (R-C4) and §B-9's MR2 parity observation is blocked by **ESC-e1**, whose cure
> is out of every unit's §4 bounds and is routed to the manifest's owning hand (R-C3). **No unrelieved RED,
> no masking fallback in 634 added lines, no write outside §4 that the LAND arm does not carry, E-3 held at
> the registry and every conformance artifact, mail clean at 0 unrowed / 0 UNREAD over 74 rows, and the
> four-verb line moved exactly as §State and R-A permit.** The one thing this close never does is round up:
> `complete_with_misses` is stated at the gate, at the stamp, at the ledger and at `FINAL-KF.md` §4.

**E13 at this seat**: swept above (C1.3 axis 6) — **0 unrowed letters, 0 UNREAD status cells**. No wave
closes with UNREAD mail in scope, and this one does not.

**SELF-COUNT law.** This Check block lands **inside** G-4's witness field (`docs/tranches/X/`) and carries
**none** of G-4's three witness tokens — it names them only as *"the three witness tokens"* and prints the
`345`/`8281638c` supersession pair, which is not one of them. **It contributes 0 files · 0 lines · 0
occurrences**, so the gate's own three commands re-run after this write must still read **34 / 121 / 82** —
the fixpoint `.g` established, the close reproduced, and this seat preserves.
