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
