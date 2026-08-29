# X·KF REPAIR ROUND 5 — CLOSE CERTIFICATE (**CLOSE-CERT-5**)

**Path of record**: `docs/tranches/X/keyframes/conformance/PASS-5/CLOSE-CERT-2.md`
**Seat**: RECONCILE + HASH-CERT, repair round 5 · written 2026-08-29
**Authority**: `PASS-5/RULINGS-5.md` **LAW E** (the hash-proven cert law) + **LAW F** (the shadow law) + **R5-2** · **R5-8** · **R5-9** (the drift tail) · **R5-11** (receipt-arithmetic-first) · **R5-12** · §END's RECONCILE row · the standing laws of rounds 1–4 (LAW A/B/C/D, binding except where LAW E amends LAW C's receipt mechanics) · the 11 wave specs at `docs/tranches/X/keyframes/waves/` at their FINAL round-5 bytes · the 11 `PASS-5/*-CHECK.md` artifacts · `PASS-4/CLOSE-CERT.md` (read whole; **never edited** — E-3).

**NAMES, stated first because ten specs cite this instrument by three spellings.** This file **is** *CLOSE-CERT-5* — the round-5 close certificate — and its path is `PASS-5/CLOSE-CERT-2.md`. The bare-name spelling **`CLOSE-CERT-5`** (63 sites) and the path spelling **`PASS-5/CLOSE-CERT-2.md`** (73 sites) both resolve HERE. The path `PASS-5/CLOSE-CERT.md` **never existed**: 64 citations named it and are re-pointed at this seat (§4 · R5-R6). `PASS-4/CLOSE-CERT.md` — 53 citations — is a different, immutable, and (as proof-of-order) VOID instrument (§3).

**Verdict of this certificate**: the round-5 sweep is **COMPLETE across all five classes**; **866 receipts checked in the four ruled classes** (1,384 including the round's own instrument citations); **4 defect classes fixed at 67 sites**, all citation- or quote-level; **the drift tail is 16/16 disposed**; and the round's write-order is **hash-proven** at §9 — derived after this seat's last spec edit, with **no spec write after it**.

---

## §1 · THE SWEEP ROSTER — every class enumerated, with its command and its counting rule

**Counting rule, stated AT the receipt (R5-11).** One receipt = **one cross-artifact citation token** emitted by the census command below: an occurrence, inside a spec, of a *sibling* spec's filename (`KF-W<n>.md`, n ≠ self), a sibling `§`-anchor spelling (`KF-W<n> §…`), a sibling coordinate (`KF-W<n>.md:NNN`), or a named substrate-artifact path. Self-references are excluded by construction. Coordinate-form citations are a **sub-class** of the sibling-token class and are counted **once**, inside it — there is no double count.

**Census command** (re-runnable; the enumeration IS the receipt):

```
# classes (i)/(ii)/(iii) — cross-wave receipt tokens, self excluded
grep -oE 'KF-W[0-9]+(\.md)?`?( *§[A-Za-z0-9]|\.md`?:[0-9]+|\.md)' waves/KF-W*.md
# class (iv) — the four named SUBSTRATE artifacts
grep -ohE 'KF-W6-CARRY\.md|COHESION\.md|INBOX\.md|FOLD-FORWARD\.md' waves/KF-W*.md
# class (v) — the round's own instruments
grep -ohE 'PASS-[0-9]/(CLOSE-CERT(-2)?\.md|RULINGS-[0-9]\.md|KF-W[0-9]+-CHECK)' waves/KF-W*.md
# widened regex A — the transcript spelling (LAW E(5))
grep -nE "grep -n '[^']*' KF-W[0-9]+\.md" waves/KF-W*.md
# widened regex B — non-`KF-Wn.md` sibling filenames (the CARRY class)
grep -oE 'KF-W6-CARRY\.md(:[0-9]+(-[0-9]+)?)?' waves/KF-W*.md
```

| class | what it is | ruled at | tokens | verdict |
|---|---|---|--:|---|
| **(i)** | **stage-1 → stage-2** — W0–W6 citing W7/W8/W9/W10 | LAW C(3), LAW E(4)/(5)(i) | **142** | swept whole; **anchor-only posture holds at every site**; 0 forward quotations survive |
| **(ii)** | **stage-2 → stage-2** — W7/W8/W9/W10 among themselves ⟨*the class CLOSE-CERT-4 structurally missed*⟩ | LAW E(5)(ii), **R5-8** | **116** | swept whole from the R5-8 baseline; **2 defects found and fixed** (§4 · R5-R2, R5-R4) |
| **(iii)** | **stage-1 ↔ stage-1**, and **stage-2 → stage-1** (backward) | LAW E(5)(iii) | **418** | swept whole; **1 defect found** (§4 · R5-R1, superseded-not-false); all struck coordinates re-confirmed struck, not re-adjudicated |
| **(iv)** | **SUBSTRATE** — `carry/KF-W6-CARRY.md` (89) · `INBOX.md` (71) · `COHESION.md` (18) · `FOLD-FORWARD.md` (12) | LAW E(5)(iv), **R5-12(3)** | **190** | all four tabled at §6 with mtime at close; **1 defect found and fixed** (§4 · R5-R5) |
| **(v)** | the round's **own instruments** — cert (73) · `PASS-4/CLOSE-CERT.md` (53) · `RULINGS-*.md` (63) · `PASS-*/KF-W*-CHECK.md` (329) | LAW E(1)–(3) | **518** | swept for path-resolution; **1 defect class fixed at 64 sites** (§4 · R5-R6) |

**Class totals: (i) 142 + (ii) 116 + (iii) 418 + (iv) 190 = 866 receipts checked in the four ruled classes.** With class (v): **1,384**. Coordinate-form citations among them: **75** (45 targeting a sibling spec, 30 targeting the CARRY) — every one read against the target's FINAL bytes and printed in this seat's working transcript.

**The two widened regexes (LAW E(5), the U5-B hole) were run and are clean.** Regex A (transcript spelling `grep -n '<pat>' <sib>.md → :NNN`) — the surviving instances are **W9's six-anchor table** (§7.2) and **W8's ledger** (§7.3), both re-run here. Regex B (non-`KF-Wn.md` filenames — the CARRY class) — **89 tokens, 30 of them coordinates**; the CARRY is **genuinely frozen** (`10:49:45`, unmoved across six rounds, §6) and **all 30 coordinates resolve at the line they name** (spot-verified whole this seat: `:9-13` · `:55` · `:83` · `:90` · `:97` · `:170` · `:174–:179` · `:220` · `:248` · `:268` · `:317` · `:319` · `:354` · `:361`).

---

## §2 · RECEIPTS CHECKED AND FIXED, PER WAVE

| spec | stage | (i) | (ii) | (iii) | CARRY | subst+instr | **checked** | **fixed** | what was fixed here |
|---|:--:|--:|--:|--:|--:|--:|--:|--:|---|
| `KF-W0.md` | 1 | 11 | — | 12 | 7 | 47 | **77** | **3** | cert-path ×3 (R5-R6) |
| `KF-W1.md` | 1 | 36 | — | 39 | 3 | 135 | **213** | **13** | cert-path ×13 (R5-R6); R5-R1 affirmed at 4 predecessor insertions |
| `KF-W2.md` | 1 | 49 | — | 60 | 2 | 43 | **154** | **5** | cert-path ×5 |
| `KF-W3.md` | 1 | 6 | — | 0 | 4 | 66 | **76** | **1** | cert-path ×1 |
| `KF-W4.md` | 1 | 5 | — | 9 | 4 | 31 | **49** | **4** | cert-path ×4 |
| `KF-W5.md` | 1 | 20 | — | 44 | 22 | 59 | **145** | **1** | cert-path ×1; its fifteen delegated cells measured at §7.1 |
| `KF-W6.md` | 1 | 15 | — | 6 | 19 | 61 | **101** | **5** | cert-path ×5 |
| `KF-W7.md` | 2 | — | 32 | 35 | 2 | 31 | **100** | **1** | **R5-R2** — the predecessor reconcile seat's stale W10 byte-stamp STRUCK |
| `KF-W8.md` | 2 | — | 28 | 99 | 4 | 45 | **176** | **6** | cert-path ×6; its 8-row ledger re-run at §7.3 |
| `KF-W9.md` | 2 | — | 26 | 32 | 12 | 74 | **144** | **8** | cert-path ×8; its six forward anchors re-verified at §7.2 |
| `KF-W10.md` | 2 | — | 30 | 82 | 10 | 116 | **238** | **20** | cert-path ×18 (incl. 2 pre-existing correct); **R5-R4** phantom §-heading; **R5-R5** the false substrate numeral |
| **TOTAL** | | **142** | **116** | **418** | **89** | **708** | **1,384** | **67** | 4 defect classes |

**Fixed = 67 sites in 4 classes**: R5-R6 (64 sites, 10 specs) · R5-R2 (1) · R5-R4 (1) · R5-R5 (1). **Every fix is citation- or quote-level.** No row moved home, no id was struck, re-keyed, narrowed, folded or minted at this seat; no verb, bound, gate, ordering or dependency changed. **SHADOW (LAW F(1)): struck/minted ROUTING set = EMPTY** — the struck set is *three stale receipt-figures and one dead path*, each with its own banked anchor re-read first (LAW F(3)); **citing/terminus waves notified = all eleven, by this certificate**.

---

## §3 · THE ROUND-4 SEAL, RE-CERTIFIED (RULINGS-5 **R5-2**)

**`PASS-4/CLOSE-CERT.md` is NOT edited** (E-3: prior-pass artifacts are immutable). The attribution of record is RULINGS-5 R5-2; this section is its consumption.

**The round-4 write order, restated with the twelfth write attributed.** Round 4's RECONCILE seat (`agent-ad2b226022255fdfe`, transcript `wf_3b95205b-351/`) made four `Edit KF-W10.md` calls at 21:31:21–21:31:54 Z, wrote `CLOSE-CERT.md` at 21:36:35 Z, closed ten cert edits at **21:37:59.297 Z** (= the cert's `17:37:59` mtime) — and then made **one more `Edit KF-W10.md` at 21:38:21.804 Z**, a rewording of its own §R-8-mirror receipt cell: *"still `…SS-13-CAPTURE-RECEIPT.md | create (.e, serial)`"* → *"still naming `…SS-13-CAPTURE-RECEIPT.md` with access **create (`.e`, serial)**"* — **+21 B exactly**, matching 209,902 → 209,923 B and 17:31:54 → 17:38:21 to the second.

**RULED, and consumed here**: the unattributed twelfth write was the round-4 RECONCILE seat's own. The edit was receipt-level, lawful in scope and benign in content; **the falsification is real anyway**, because a certification's exhibits do not get to be approximately true.

**Status of the two rounds:**
- **Round 4's REPAIRS BANK.** 15 of 16 rulings verified at that close; the eleven PASS-5 checks re-verified the rest at their own clock; nothing in the round-4 repair set is re-opened here.
- **Round 4's CLOSE CERTIFICATE IS VOID AS PROOF-OF-ORDER.** It asserted write-last and was falsified by its own author 22 s later.
- **The lawful close of rounds 4 AND 5 is THIS certificate**, hash-proven under LAW E(1)/(2) at §9.

**The five-plus-two specs that condition their own closure on a cert** — W0 D-1 · W1 D5-3 · W3 D-2 · W5 D-8 · W9 D5-1, and W8 D-10 / W10 D-2 — **all re-point here**, verified at this seat: `grep -c 'PASS-5/CLOSE-CERT-2.md'` returns **3 · 17 · 1 · 1 · 8 · 6 · 6** for W0 · W1 · W3 · W5 · W9 · W8 · W10, and `grep -c 'PASS-5/CLOSE-CERT.md'` returns **0** in all eleven.

**AND THE MECHANISM FIRED A THIRD TIME, INSIDE THIS ROUND — the fact this certificate exists to record.** A **predecessor round-5 reconcile pass** ran at **19:28–19:30** on 2026-08-28: it wrote insertions into `KF-W1.md` (19:28:19), `KF-W7.md` (19:28:45) and `KF-W10.md` (19:30:41), each citing "`PASS-5/CLOSE-CERT-2.md` §4" for a finding — **and then ended without laying any certificate at all.** Its W7 insertion stamped `KF-W10.md`'s *"round-5 final bytes"* at **247,385 B** — and that pass itself wrote W10 again **116 s later, +1,058 B**. **A reconcile seat falsified its own substrate stamp for the third round running, in the round that minted LAW E to kill exactly that.** This seat books it at §4 · R5-R2, strikes the stamp in place, inscribes **no replacement numeral** (LAW E(4)), and points the claim at §9's hash table — which is what LAW E(2) is for: *an mtime table is a claim about the past; a hash table is a challenge to the future.*

---

## §4 · FINDINGS — the round-5 sweep's convictions, in the spellings the specs cite

### **R5-R1** · `KF-W1.md` — the bare-`KF.W1` token vector: **SUPERSEDED AT FINAL BYTES, EDGE CLAIM STANDS** ⟨class (iii)⟩

Cited at `KF-W1.md` §1's six-non-consumers bullet, cross-edge 1, item 5, and §14's leg table (4 sites). The predecessor insertion's claim is **re-verified whole by this seat at FINAL bytes** and **reproduces exactly**:

```
$ for f in W2 W5 W6 W8 W7 W9; do grep -oE 'KF\.W1([^0-9A-Za-z-]|$)' KF-$f.md | wc -l; done
   7    0    0    0    1    1
```

**`7 · 0 · 0 · 0` for KF-W2/W5/W6/W8 and `1 · 1` for KF-W7/W9** — W2's seven are its own round-5 `D-13` relay-vehicle attributions (*"KF.W1's outbound row"*), W7's one is its stage-1-sibling roster listing, W9's one is its `S-10.1` declared non-edge: **all nine read individually and classified NON-EDGES**. The other three legs re-run clean at final bytes too — `grep -c 'O-11'` → **0** in all six ✓ · **all fifteen** `O-8` hits are `KF-CO-8`/`KF-CO-1` substrings (3+1+4+2+0+5 = 15) ✓ · `KF-AV-28` **live in nine, absent only from KF-W5** ✓ · the four stage-2 anchor sets (`S-10.1` · `§6.D` · `OP-3` · `Opens after`) all resolve ✓. **One leg of four moved, on a stage-1 peer, and it moved UP — the conditional mark's conclusion is strengthened, never weakened. NO EDIT OWED; the finding is affirmed, not cured.**

### **R5-R2** · `KF-W7.md` §Sequencing — **the predecessor reconcile seat's W10 byte-stamp is STRUCK** ⟨classes (ii)+(v); R5-9 drift row 14; **FIXED**⟩

The round-4 insertion inside W7 stamped `KF-W10.md` at *"mtime 17:21:25, the last per-wave write of the round"* — falsified by the twelfth write (§3). R5-9 row 14 assigned the re-stamp to RECONCILE; the **predecessor** round-5 pass landed one — and stamped **247,385 B** as W10's *"round-5 final bytes"* at **19:28:45**, then wrote W10 again at **19:30:41 (+1,058 B)**. **The stamp is struck in place as the dated reading it was; no replacement numeral is inscribed** (LAW E(4)); W10's final bytes and sha256 live at §9.

**The load-bearing half — the byte-check the wave asked for — HOLDS at final bytes, re-run by this seat:**

```
$ grep -n 'DISCHARGED by KF.W7 SWAP verdict' KF-W10.md
276:  407:  530:            ← unmoved across the twelfth write
```

**§G-2's Acceptance clause at `:407` carries this wave's adopted OUTPUT FORM byte-identical** — *"every row LANDED / KILLED-with-rationale / **`DISCHARGED by KF.W7 SWAP verdict <surface>, <date>`** / **`ADOPTED-BY-KF.W6 (RULINGS-4 R4-1)`** / carried to the next formation boundary's ledger"*. The other three forward W10 anchors re-resolve: §3.2's `KF-AV-28 · STANDING SUPERSESSION RIDER` bullet ✓ · **§6.D · SUCCESSOR-FORMATION REGISTER** ✓ **with the `KF.W12` row present** ✓. **Four of four forward anchors resolve; zero receipts of that wave's are emitted in a superseded alphabet.** *The item the wave flagged rather than assumed is, for the third round running, the item that needed no repair — and the stamp that vouched for it is, for the third round running, the thing that broke.*

### **R5-R3** · `KF-W10.md` §0-vehicle — the COHESION `§0` transcript: **AFFIRMED** ⟨class (iv)⟩

The predecessor insertion completed the short transcript (four lines printed, five returned). **Re-run at COHESION.md's final bytes by this seat:**

```
$ grep -n '^## §0' docs/tranches/X/COHESION.md
8:## §0 The whole
138:## §0a BOUNDARY 2026-08-25 — THE REGISTRY IS WHOLE; THE AUTHORING BLOCK OPENS
156:## §0b ADDENDUM 2026-08-28 — KF.W3 OWNERSHIP CURED; THE FOLD BLOCK OPENS
170:## §0c ADDENDUM 2026-08-28 (later) — X·V REFINEMENT FOLD CONFORMANT; …
185:## §0d ADDENDUM 2026-08-28 (later still) — THE MINTED-UNAUTHORED SUCCESSOR WAVES, …
```

**FIVE lines; the four printed are byte-exact; `:8` is the file's own base heading and bears on nothing.** `§0c` and `§0d` are landed with subjects other than this wave's ownership — **so R5-12(2)'s re-cut of the vehicle to *"a dated COHESION addendum mirroring §0b (§0e or a successor letter)"* stands on a verified premise.** R5-12's clause-4 discharge is likewise re-verified: `COHESION.md:185` **is** §0d, carrying the KF.W11/W12/W13 boundary line at `:188`.

### **R5-R4** · `KF-W10.md` §3.1 — **a phantom §-heading re-issued at its third site** ⟨class (ii); **FIXED**⟩

W10 names *"KF-W8 §Rulings"* a **phantom** at §6.C-0 and again at §6.C-E row 3 (*"the block sits inside KF-W8's `§Sequencing`"*) — and then **re-issued the phantom** at §3.1's R-4 quotation. This is precisely the class `KF-W2` convicted in its own ledger at D-12: *the phantom this ledger's own item struck, surviving inside the summary that struck it.* **Anchor corrected to the spelling the file's other two sites already carry** — `KF-W8.md` **§Sequencing · the `Rulings this file is required to make` block · `R-4`** (`grep -n` → the block at **`:395`**, the *"TRIGGER, named"* clause at **`:411`**).

**The quotation itself is untouched and was byte-diffed clean at KF-W8's FINAL bytes**: `grep -c 'This decline re-opens on any ONE of three conditions' KF-W8.md` → **1**, and the **725-byte** trigger passage compares `==` against W10's block. **Only the §-name moved.**

### **R5-R5** · `KF-W10.md` §0-vehicle — **a substrate receipt whose own arithmetic did not reproduce** ⟨class (iv); R5-11's arm; **FIXED**⟩

The cell read `grep -n 'W10' COHESION.md` → *"**five lines**, none of them an assignment"* and then **enumerated six coordinates**. Re-run at final bytes:

```
$ grep -n 'W10' docs/tranches/X/COHESION.md
35:  83:  165:  187:  190:  191:            ← SIX lines
```

**Counting rule, now stated at the receipt: one `grep -n` output line = one row** — `:187`/`:190`/`:191` are **three** lines of §0d's boundary block, not one mention. Corrected to **SIX**. **The scope claim is unchanged and unweakened**: none of the six is an assignment, so the ownership gap stands exactly as the cell holds. *The defect was the count, never the reading — which is R5-11's whole point, firing at a substrate receipt one clause after the transcript the predecessor seat had just completed.*

### **R5-R6** · **THE CERT PATH — 64 dead citations in 10 specs, re-pointed** ⟨class (v); **FIXED**⟩

Ten of eleven specs conditioned their closure on **`PASS-5/CLOSE-CERT.md`** — **a path that never existed and was never going to**: the round-5 certificate's path is `PASS-5/CLOSE-CERT-2.md`, as the three specs touched by the predecessor pass (W1, W7, W10) already spelled it. **A closure condition that names a non-existent file is a closure by omission** — the failure §2 of `KF-W10.md` declares fatal, aimed at this round's own instrument.

```
$ grep -oh 'PASS-5/CLOSE-CERT\.md'   waves/KF-W*.md | wc -l    → 64   (before)
$ grep -oh 'PASS-5/CLOSE-CERT-2\.md' waves/KF-W*.md | wc -l    → 70   (after; 6 were already correct)
$ grep -oh 'PASS-5/CLOSE-CERT\.md'   waves/KF-W*.md | wc -l    → 0    (after)
$ grep -oh 'PASS-4/CLOSE-CERT\.md'   waves/KF-W*.md | wc -l    → 53   (untouched, both before and after)
```

**Purely a path re-point**: no sentence's subject, verb, scope or figure changed, and **not one occurrence sat inside a verbatim quotation** (each of the 64 was checked for quote-enclosure before the edit). The **bare-name** spelling `CLOSE-CERT-5` (63 sites) is left standing and is **declared equivalent to this file at the head of this certificate** — it is a round-name, not a path.

---

## §5 · THE DRIFT TAIL (R5-9) — 16 rows, disposition at FINAL bytes

| # | member | owner | disposition at this close |
|--:|---|---|---|
| 1 | W1 D5-2 — freshest-artifact split at five sites | KF-W1 | **CURED** — `PASS-5/KF-W1-CHECK` is the artifact of record at **20** sites; the class is greppable (`grep -n 'PASS-[0-9]/KF-W1-CHECK'`) and the older-pass cites survive only as dated history |
| 2 | W1 D5-4 — three stale KF-W10 figures | KF-W1 | **CURED** — reduced to anchors; the one surviving figure rides this cert (§9), not a per-seat stamp |
| 3 | W1 D5-5 — three truncated stage-2 quotations | KF-W1 | **CURED** — reduced to anchors under the file's own declaration; retained prose marked paraphrase (LAW D(1)) |
| 4 | W1 D5-6 — §13 substrate table stamping pre-round-4 bytes ×10 | KF-W1 | **CURED** — the table names **this cert's §6** as the stamp authority; local clocks struck |
| 5 | W1 D5-7 — the dated KF-AV-28 reading stale on 7 of 10 | KF-W1 | **CURED and re-verified here**: `KF-AV-28` live in **nine**, absent only from `KF-W5.md` (§4 · R5-R1) |
| 6 | W3 D-3 — two artifacts of record for one carriage claim | KF-W3 | **CURED** — one artifact (`PASS-5/KF-W3-CHECK`, 16 sites) |
| 7 | W4 D-2 — `KF-W0.md:588` dead **and** off-target | KF-W4 | **CURED** — coordinate **retired, not re-issued**; re-verified at W0's final bytes: `:588` is a *RED baseline* line in a different section ⟹ the retirement was right |
| 8 | W4 D-6 — KF-W6 manifest receipt cited `:145-146` | KF-W4 | **CURED** — coordinate retired; anchored on the manifest's §-heading (W6 `:145` is now the A-11 census head) |
| 9 | W5 D-1 — §Disjointness quoting a struck grant | KF-W5 | **CURED** — anchor-only; and the four-party disjointness re-measured here (§7.4) |
| 10 | W5 D-2 — `KAD-1 12/16` vs final; fifteen cells delegated | **RECONCILE** | **DISCHARGED AT §7.1** — all fifteen re-measured at final bytes; the stale `16` is superseded by a measured **23** |
| 11 | W5 D-11 — three stale substrate stamps | KF-W5 | **CURED** — stamps struck, anchors kept (LAW E(4)); substrate rows now live at §6 |
| 12 | W6 D-P5-4 — the W6↔W10 seam contradictory at final bytes | KF-W10 (+W6 reciprocal) | **CURED and re-run here** (§7.5): **W6 16 · W9 28** and **W6 2 · W9 4** at FINAL bytes — the far end carries the subject at both ends; the seam is two-ended and agreeing |
| 13 | W7 D1 (+D12) — struck-grant citation ×3; vehicle mislabelled | KF-W7 | **CURED** — eight sites re-cut to anchor-only by scope; the forward-QUOTATION classification corrected |
| 14 | W7 D2 — the reconcile insertion names a non-final W10 substrate | **RECONCILE** | **CURED AT §4 · R5-R2** — and the predecessor's own replacement stamp was stale too; struck, no numeral re-issued |
| 15 | W8 D-7 — three stale stamps in the receipt LEDGER, two labelled *"final"* | KF-W8 + **RECONCILE** | **CURED** — the stamp column is struck to a pointer at the spec; **the eight ledger rows are re-run at §7.3** |
| 16 | W9 D5-6 — §F's class verdict homed at PASS-3 | KF-W9 | **CURED** — re-pointed to `PASS-5/KF-W9-CHECK` (18 sites); the freshness class made greppable |

**16 of 16 disposed. The class is retired**: per-seat substrate stamping ends with this round (LAW E(4)), and **these are its terminal members**.

---

## §6 · SUBSTRATE TABLE (LAW E(5)(iv)) — the stamp authority of record for round 5

**Every figure any spec would otherwise stamp locally lives here.** Read at this seat, after the last per-wave write and after this seat's last spec edit.

### 6.1 · The eleven specs (their own substrate; the sha256 is at §9)

| spec | mtime at close | bytes at close | round-5 write |
|---|---|--:|---|
| `KF-W0.md` | 2026-08-29 15:17:38 | 253,997 | stage 1 · wrote FIRST |
| `KF-W1.md` | 2026-08-29 15:17:38 | 250,457 | stage 1 |
| `KF-W2.md` | 2026-08-29 15:17:38 | 346,265 | stage 1 |
| `KF-W3.md` | 2026-08-29 15:17:38 | 187,109 | stage 1 |
| `KF-W4.md` | 2026-08-29 15:17:38 | 232,774 | stage 1 |
| `KF-W5.md` | 2026-08-29 15:17:38 | 292,137 | stage 1 · wrote FIRST of eleven at its own round |
| `KF-W6.md` | 2026-08-29 15:17:38 | 288,998 | stage 1 · the R5-1 BLOCKER cure |
| `KF-W7.md` | 2026-08-29 15:18:37 | 249,757 | stage 2 · **edited here** (R5-R2) |
| `KF-W8.md` | 2026-08-29 15:17:38 | 249,660 | stage 2 |
| `KF-W9.md` | 2026-08-29 15:17:38 | 268,359 | stage 2 |
| `KF-W10.md` | 2026-08-29 15:18:25 | 250,859 | stage 2 · wrote LAST of the per-wave seats · **edited here** (R5-R4, R5-R5) |

⟨The 15:17–15:18 mtimes are **this seat's** — 64 cert-path re-points plus three targeted fixes. The per-wave round-5 write order, from the pass's own clocks, was **W0 18:49:33 → W4 18:50:12 → W3 18:50:14 → W6 18:52:46 → W2 18:54:59 → W5 18:55:46 → W8 19:11:06 → W9 19:17:10 → W1/W7 19:28 (predecessor reconcile) → W10 19:30:41**. **LAW C's stage order held**: every stage-1 spec wrote before every stage-2 spec, W0 first, W10 last of the per-wave seats.⟩

### 6.2 · The four named non-spec substrates (R5-12(3) closes the U5-C hole)

| artifact | resolved path | mtime at close | bytes | status |
|---|---|---|--:|---|
| **CARRY** | `docs/tranches/X/keyframes/carry/KF-W6-CARRY.md` | 2026-08-28 **10:49:45** | 199,055 | **GENUINELY FROZEN** — unmoved across all six rounds; the one substrate whose coordinates are safe, and the reason its 30 coordinate-citations all resolve |
| **COHESION** | `docs/tranches/X/COHESION.md` | 2026-08-28 18:24:43 | 20,606 | live; `§0d` landed at `:185` (R5-12 clause 4 **DISCHARGED**); `^## §0` → **5** lines; `W10` → **6** lines (§4 · R5-R5) |
| **INBOX** | `docs/tranches/V/coordination/INBOX.md` | 2026-08-28 12:33:59 | 56,702 | live; the four-path sweep law spans `:15-16`, the SUBJECT census's sole hit — W1's LAW A census reproduces |
| **FOLD-FORWARD** | `docs/tranches/V/FOLD-FORWARD.md` **at keyframes.js `origin/master 81a56990`** | frozen ref | 9,289 | **NOT IN THE value.js TREE — and that is correct, not a defect**: it is a keyframes-side artifact read at the pinned frontier. `:34` is byte-exact the `Glass §4 dock contract … subsumes the folded CH2-02 ×4 (BG-5, GU-1, GU-2, subject-legible)` sentence W9 §F and W10 §B-3 quote. **Flagged for the pass-6 seat**: the 12 citations spell the path without a repo qualifier, so it resolves only against the declared frontier |

### 6.3 · The round's own instruments

| artifact | mtime | bytes | role |
|---|---|--:|---|
| `PASS-5/RULINGS-5.md` | 2026-08-28 18:38:10 | 46,472 | the round's law; **LAW E(3)'s opening hash table is the immutable frozen source** (§9 reprints it) |
| `PASS-5/UNION.md` | 2026-08-28 18:23:40 | 40,218 | the pass-5 verdict this round repairs |
| `PASS-5/KF-W*-CHECK.md` ×11 | 2026-08-28 17:49–18:06 | 439,935 total | the per-wave artifacts of record; **329 citations** across the specs |
| `PASS-4/CLOSE-CERT.md` | 2026-08-28 17:37:59 | 27,004 | **IMMUTABLE and VOID as proof-of-order** (§3). 53 citations survive as history |
| **this file** | *written last* | — | the lawful close of rounds **4 AND 5** |

---

## §7 · DELEGATED DUTIES — the five sweeps the specs wrote into this seat by name

### 7.1 · `KF-W5.md`'s FIFTEEN CELLS (R5-9 row 10) — *"the RECONCILE seat re-measures ALL FIFTEEN after the last per-wave write"*

Command, the block's own: `grep -o '<id>' <file> | wc -l` (substring-counted, as the block declares). **CARRY column = frozen substrate; spec column = FINAL round-5 bytes.**

| id | CARRY | `KF-W6.md` | | id | CARRY | `KF-W6.md` |
|---|--:|--:|---|---|--:|--:|
| KF-SS-4 | 0 | **2** | | KF-SKEL-9 | 0 | **4** |
| KF-SS-6 | 0 | **1** | | KF-SKEL-20 | 0 | **1** |
| KF-SS-31 | 0 | **4** | | KAD-17 | 0 | **1** |
| KF-SS-38 | 0 | **1** | | **KAD-1** *(control)* | **12** | **23** |
| KF-ET-33 | 0 | **2** | | **KAD-3** *(control)* | **2** | **1** |
| KF-ET-35 | 0 | **3** | | **KF-AT-8** *(control)* | **2** | **5** |
| KF-ES-36 | 0 | **2** | | **KAD-13** *(at `KF-W7.md`)* | — | **2** |
| | | | | **KF-SKEL-16** *(at `KF-W7.md`)* | — | **2** |

**Findings.** (a) **The CARRY column is TEN ZEROS and the three controls reproduce exactly** (12 · 2 · 2) — W5's own measurement of the frozen substrate is confirmed, so **the `0/10` reciprocity obligation stands owed by KF.W6 on a measurement, not on a memory**. (b) **The struck `16` was right to be struck**: KAD-1's spec side now reads **23**, moved by the R5-1 BLOCKER cure that *restored three rows* — exactly the reason W5 refused to mint a successor numeral. (c) `KF-SS-31 0/4` · `KF-ET-35 0/3` · `KF-SKEL-9 0/4` **reproduce at a fourth clock**. (d) The two stage-2 cells at `KF-W7.md` read **2 · 2**, as at round 4. **Fifteen of fifteen measured; the block's instrument is sound and its refusal to stamp was correct.**

### 7.2 · `KF-W9.md`'s SIX FORWARD ANCHORS (R5-8) — the stage-2→stage-2 baseline, re-verified

| # | anchor | col A (pass-5 check) | col B (W9's write) | **col C — FINAL bytes, this seat** | resolves |
|--:|---|--:|--:|--:|:--:|
| A1 | §State *"Opens after"* / `X.KF.W9` | :20 | :22 | **:22** | ✓ |
| A2 | `OP-4` | :66 | :68 | **:68** | ✓ |
| A3 | PACKET-FIRST law | :485 | :503 | **:513** | ✓ |
| A4 | §D cross-edge `D. → KF.W9 (Safari Visual Audit)` | :519 | :537 | **:547** | ✓ |
| A5 | §B-1 `surface verify` | :182 | :198 | **:206** | ✓ |
| A6 | §B-3 `CH2-02` | :184 | :200 | **:197** | ✓ |

**6 of 6 RESOLVE at final bytes. 5 of 6 OFFSETS MOVED AGAIN between col B and col C** — inside the same round, after W9 closed, under W10's last write and this seat's two edits. **That is the drift class demonstrated a third time in one round, and it is the entire argument for LAW E(4): the anchor is the receipt and the offset is a dated reading.** W9's delegation-turned-verification (R5-8(a)) is **certified**; its enumeration of **six** (R5-8(b), PACKET-FIRST in, §B-1/§B-3 counted separately) is confirmed as the one enumeration.

### 7.3 · `KF-W8.md`'s CROSS-WAVE RECEIPT LEDGER (R5-9 row 15) — eight rows re-run at FINAL bytes; the stamp column is corrected HERE

| sibling | round-4 stamp *(struck as a live claim)* | anchors at FINAL bytes | verdict |
|---|---|---|---|
| `KF-W0.md` | 16:58:59 *"final"* | anchor-only (§B-12 / OP-4 by §-heading + OP id) | **HOLDS** — nothing to drift |
| `KF-W2.md` | 17:02:55 *"final"* — **STALE** (true final 18:54:59) | `grep -c 'KF.W8 precedes'` → **4**; `ORDERED: KF.W8 precedes` → **`:63`** (was `:59`) | **HOLDS** — count reproduces, coordinate moved |
| `KF-W3.md` | 16:56:52 *"final"* — **STALE** (18:50:14) | `sed -n '1p'` → *"# KF.W3 — Parser Consumption (GATED, never scheduled)"* | **HOLDS** — byte-identical |
| `KF-W4.md` | 16:59:44 *"final"* — **STALE** (18:50:12) | `demo vitest project` → **2** hits; the reciprocal cross-edge row present | **HOLDS** |
| `KF-W5.md` | **16:55:55** *"final"* — **STALE by 37 min** (18:55:46) | D-6 row `:348` (was `:364`) · cross-edge `:408`/`:444` (was `:430`) · B-16 present | **HOLDS by anchor; all six coordinates moved a THIRD time** |
| `KF-W6.md` | 16:59:25 *"final"* — **STALE** (18:52:46) | `grep -c 'KF-CB-37'` → **1**, at **`:558`** (`:410`→`:417`→`:445`→`:514`→**`:558`**) | **HOLDS** — *five spellings of one row across five rounds; the banked row header never moved* |
| `KF-W7.md` | 15:39:04 *(round-4 write pending)* | *the four the ledger names*: `devDependencies only` → **0** (the D-2 phantom, confirmed) · `test-utils` → `:31` `:61` `:302` … · `never globbed` → **`:68`** · `OP-4` at **`:31`** · the P0 SpringTrace C-3 row present | **ALL FOUR RE-RUN AND HOLD** — the duty the ledger assigned to this seat, discharged |
| `KF-W10.md` | 15:51:10 *(writes LAST)* | `KF-W8-R-4-STRUCT-PAIR` ×**11** · `§6.C-0` at `:522` · **`§6.D`** at `:573` · `grep -oE 'KF-W10\.md:[0-9]+' KF-W8.md` → **∅** | **ANCHOR-ONLY POSTURE VERIFIED after the last write** — zero W10 line numbers ride any W8 receipt |

**Three stamps were stale and two of those said *"final"* of bytes that were not — and at this close SIX of the eight are stale**, because every one of those siblings wrote again in round 5. **The mechanism, not the rows, was the defect** (LAW E(4)); the anchors held at all eight. `KF-W1.md`/`KF-W9.md` remain quoted nowhere in W8 — confirmed at final bytes.

### 7.4 · The FOUR-PARTY SHARED-DIRECTORY DISJOINTNESS (`test/demo/instrument/`) — verified at final bytes

W5 §Disjointness declares W7's four creates by **stable anchor alone** and asks this seat to verify after the last per-wave write. **All eleven created filenames resolve and no two collide**: W5 ×1 (`highlight-css-roundtrip.test.ts`) · **W7 ×4** (`timeline-mount-projection` · `timeline-mount-keyboard` · `timeline-hover-preview` · `sequence-scrubber-mount`, each present **4×** in W7 and named **2×** from W5's end) · W8 ×4 (`sfc-load.probe.test` · `groupShortcuts.test` · `CSSPasteDialog` … each present in W8 and reciprocated in W7 §Bounds `KF.W8` row) · W4 ×2. **NO wave owns the directory; each owns exactly its named files; the reciprocal naming holds from every end.**

### 7.5 · The W6↔W10 SEAM (R5-9 row 12) — final-bytes verification, delegated to this cert by W10's own cell

```
$ grep -coE 'CH2-02|BG-5|GU-1|GU-2|subject-legible' KF-W6.md KF-W9.md   → W6 16 · W9 28
$ grep -cE 'dock contract|Glass §4'                  KF-W6.md KF-W9.md   → W6  2 · W9  4
$ grep -ln 'CH2-02\|BG-5\|GU-1\|subject-legible' registry/adjudicated/kf-*.md → 0 files, all four
$ grep -c 'TransportDock' KF-W6.md                                       → 10
```

**The second of W10's two readings is EXACTLY the round's final state** (W6 16 · W9 28 / W6 2 · W9 4). **VERDICT CERTIFIED: the far end carries the subject at both ends; the seam is two-ended and agreeing.** The round-3 *"0 and 0"* is a true report of round-3 bytes and a false report of the seam today — kept as the dated finding it was, superseded here rather than silently re-worded. The four subsumed names remain **non-banked** (0 files across the 58-record corpus) and are correctly labelled a quotation from FOLD-FORWARD §B-3, not registry ids. **Both anchors — `KF.W6 §Bounds' TransportDock rows` and `KF.W9 §Bounds' capture-receipt row` — resolve.**

### 7.6 · The R5-1 BLOCKER chain, verified end-to-end (LAW F(2): every terminus re-swept)

`KF-W6.md` — the MOOT-ON-DELETE premise struck; **EH-4 / EH-5 / EH-8 restored LIVE one row per banked anchor** (18 `EH-4` tokens across the file's §Excluded, §Bounds and gate rows); **five SHADOW lines present**. `KF-W0.md` §Excluded — the reciprocal landed, with the family's routing enumerable and its arithmetic stated (`3 + 2 + 6 + 4 = 16 ✔` against a denominator derived by command at the bank). `KF-W9.md` — **the guard is vindicated at its own row** (*"the SIX live escapes … survive it — **do not shoot the fork**"*, with the dated round-5 line entered beneath it). `KF-W10.md` — the inbound SHADOW notification received anchor-only and **not** converted into an obligation. **Every named terminus and every citing sibling re-swept; nothing of the restoration is stranded.**

---

## §8 · WRITE-LAST, BY CONSTRUCTION (LAW E(1))

1. This seat's **last spec edit** landed at **2026-08-29 15:18:37** (`KF-W7.md`, R5-R2).
2. The hash table at §9 was derived **after** it, by `shasum -a 256` over all eleven specs.
3. **This certificate is this seat's absolutely last act. No spec is edited after it.** Had any post-cert edit proved necessary, the cert would have been re-run WHOLE with the hash table re-derived — an out-of-date cert is never left standing.
4. **The pass-6 union seat re-hashes all eleven as its FIRST act. Any mismatch is this round's own conviction**: the moved file is named, the round did not close, and no repair banks.
5. Scope discipline: **the writable set of this seat was the eleven specs at receipt level and this file.** Nothing here stamps a verb, opens product source, grants a byte, or moves a row; every status field stays `planned`; `PASS-4/CLOSE-CERT.md` and every prior-pass artifact remain unedited (E-3); no registry record was touched.

---

## §9 · THE HASH TABLE — opening (RULINGS-5 LAW E(3)) beside closing (this seat)

| spec | opening sha256 ⟨LAW E(3), 17:xx⟩ | **closing sha256 ⟨this cert⟩** | moved |
|---|---|---|:--:|
| KF-W0.md | `5f31c609…8de1` | `fd226ecb…d09a` | ✓ |
| KF-W1.md | `bc247de4…be83` | `f6986de7…12f0` | ✓ |
| KF-W2.md | `43a8fc8d…ef73` | `5f3656e3…11a4` | ✓ |
| KF-W3.md | `fb9841a0…7b0e` | `4b68baf3…86f7` | ✓ |
| KF-W4.md | `c699db88…59e8` | `4028327c…fe68` | ✓ |
| KF-W5.md | `112a5ee4…16aa` | `8baba077…404d` | ✓ |
| KF-W6.md | `83509bf9…0a11` | `b41e5576…daaa` | ✓ |
| KF-W7.md | `f638ae4a…65ca` | `ed5f0851…6f21` | ✓ |
| KF-W8.md | `126426de…3b62` | `c7c11445…a1c9` | ✓ |
| KF-W9.md | `2d6a8735…8749` | `bea2d9a6…c744` | ✓ |
| KF-W10.md | `086ea228…0c96` | `1c107329…1c50` | ✓ |

**All eleven moved — every spec took repair this round; not one is a no-op.** The opening column is quoted from `RULINGS-5` LAW E(3)'s hash-bracketed table (an immutable frozen source, not a per-seat stamp). The closing column is the full output below.

**`shasum -a 256 docs/tranches/X/keyframes/waves/KF-W*.md`, run after this seat's final spec edit — the round's write-set, provable:**

```
fd226ecb26ea68e36724fb14ee359a974b3d7d1579ca3398483217f3ec06d09a  /Users/mkbabb/Programming/value.js/docs/tranches/X/keyframes/waves/KF-W0.md
f6986de7b90c2f009c0d0cfdbea6e59a73e3a56c10cbb9223e93a1ef6f6112f0  /Users/mkbabb/Programming/value.js/docs/tranches/X/keyframes/waves/KF-W1.md
1c107329458e0ba1ff6762923a5a684391ac32824dc7d7fac42d8e33f4851c50  /Users/mkbabb/Programming/value.js/docs/tranches/X/keyframes/waves/KF-W10.md
5f3656e32363e49d4fed431facc32c7a458f45d20dc6a69f427b9d0aa2bd11a4  /Users/mkbabb/Programming/value.js/docs/tranches/X/keyframes/waves/KF-W2.md
4b68baf35a63357d9af857c2c96e73022ecbdd7a3cecfd2a5374be70cde786f7  /Users/mkbabb/Programming/value.js/docs/tranches/X/keyframes/waves/KF-W3.md
4028327cb221b6b65f29f6fa7e5e232f1581eb73e6bfca5e2e80c254d5aafe68  /Users/mkbabb/Programming/value.js/docs/tranches/X/keyframes/waves/KF-W4.md
8baba077d0e6612f7f44888a91d855ebeb2fa7857baf720ed968326bdd4a404d  /Users/mkbabb/Programming/value.js/docs/tranches/X/keyframes/waves/KF-W5.md
b41e55769f9cea837f8ba579b5e59e0bf2cc94abf46f35e53abb648bd993daaa  /Users/mkbabb/Programming/value.js/docs/tranches/X/keyframes/waves/KF-W6.md
ed5f0851378cde7175b3523cb8f33d2ebc606cfa36103f6a6d07b811d9986f21  /Users/mkbabb/Programming/value.js/docs/tranches/X/keyframes/waves/KF-W7.md
c7c1144599f8c8cfbe2533c5a4bb65d36357e4e8fb45918e9c09a9c056fba1c9  /Users/mkbabb/Programming/value.js/docs/tranches/X/keyframes/waves/KF-W8.md
bea2d9a6c519bf975393c54c2b9b23ccad325afb2ef8721b4157eb02143cc744  /Users/mkbabb/Programming/value.js/docs/tranches/X/keyframes/waves/KF-W9.md
```

*RECONCILE + HASH-CERT seat, repair round 5. Writes = the eleven specs at receipt level (67 sites, 4 classes) + this file. **866 receipts checked in the four ruled classes, 1,384 including the round's own instruments; 16 of 16 drift-tail rows disposed; five delegated sweeps discharged; the round-4 seal re-certified and its successor's stale stamp struck in turn.** The hash table above was derived after the last spec edit and nothing was written to any spec after it. **The pass-6 union re-hashes these eleven as its first act; a mismatch convicts this round, names the moved file, and banks nothing.***
