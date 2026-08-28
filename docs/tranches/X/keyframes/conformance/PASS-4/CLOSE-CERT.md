# X·KF REPAIR ROUND 4 — RECONCILE SEAT · CLOSE CERTIFICATION

**Seat**: DRIFT-RECONCILE + CLOSE-CERT, repair round 4 · 2026-08-28
**Authority**: `PASS-4/RULINGS-4.md` **LAW C(4)** (the two-stage / reconcile law — *"The RECONCILE seat runs AFTER the last per-wave write, re-verifies EVERY cross-wave receipt written this round (both stages, both directions), and WRITES `docs/tranches/X/keyframes/conformance/PASS-4/CLOSE-CERT.md`"*) · **LAW D** (the verbatim law, incl. its numeric arm D(3)) · `PASS-4/RULINGS-4.md` **§END, the RECONCILE row** (*"The round does not close without it; the pass-5 union seat audits it as its first act"*) · the eleven wave specs at `docs/tranches/X/keyframes/waves/` · the eleven `PASS-4/KF-W*-CHECK.md` files.
**Convicted defect this file discharges**: **U4-A** — the round-3 re-anchor seat ran mid-window and certified nothing, the third consecutive round the same-round-sibling-drift class (**U4-C**) survived its own instrument.
**Scope of write**: this file, plus **receipt-level edits only** to the eleven `KF-W*.md` specs. **No row content, no gate, no count, no verdict, no bounds row, and no disposition was touched at any seat.** Every spec edit is a dated `⟨RECONCILE SEAT, 2026-08-28⟩` insertion beside the receipt it reconciles — **E-3 throughout: stated, never silently applied; corrections append, they do not overwrite.**

**VERDICT: THE ROUND CLOSES.** 47 same-round cross-wave receipts swept · **16 repaired** · 0 receipts found false in substance · 0 anchors failed.

---

## §1 · THE MTIME TABLE — proof this seat wrote last

LAW C(4)(i). `stat -f '%Sm %z %N'`, run at this seat after its own last edit:

| # | spec | mtime (2026-08-28) | bytes | stage | round-4 write order |
|--:|---|---|--:|---|---|
| 1 | `KF-W3.md` | **16:56:52** | 168,078 | 1 | 2nd |
| 2 | `KF-W0.md` | **16:58:59** | 224,173 | 1 | 3rd |
| 3 | `KF-W6.md` | **16:59:25** | 240,976 | 1 | 4th |
| 4 | `KF-W4.md` | **16:59:44** | 209,984 | 1 | 5th |
| 5 | `KF-W2.md` | 17:30:52 *(orig. **17:02:55**)* | 286,177 | 1 | 7th |
| 6 | `KF-W10.md` | 17:31:54 *(orig. **17:21:25**)* | 209,902 | 2 | **11th — last per-wave** |
| 7 | `KF-W9.md` | 17:32:08 *(orig. **17:15:30**)* | 221,965 | 2 | 8th |
| 8 | `KF-W1.md` | 17:32:20 *(orig. **17:00:23**)* | 200,681 | 1 | 6th |
| 9 | `KF-W5.md` | 17:32:57 *(orig. **16:55:55**)* | 252,821 | 1 | **1st — earliest of eleven** |
| 10 | `KF-W7.md` | 17:33:23 *(orig. **17:17:02**)* | 210,113 | 2 | 9th |
| 11 | `KF-W8.md` | 17:34:06 *(orig. **17:18:36**)* | 195,418 | 2 | 10th |

**Reading.** The seven files this seat touched carry **17:30:52 – 17:34:06** mtimes; the four it did not (`KF-W3` · `KF-W0` · `KF-W6` · `KF-W4`) retain their per-wave round-4 mtimes. **Every per-wave write precedes every reconcile write** — the last per-wave write was `KF-W10.md` at **17:21:25**, and this seat's first edit was at **17:30:52**, a **nine-minute clear margin.** The round-4 write order above is reconstructed from the original mtimes and is the substrate against which every receipt below was judged.

**LAW C(1) compliance — one deviation, recorded.** Stage 2 ran in its ruled order (**W9 → W7 → W8 → W10 last** ✓). Stage 1 did **not** put KF-W0 first: **KF-W5 (16:55:55) and KF-W3 (16:56:52) wrote before KF-W0 (16:58:59).** Consequence, measured not assumed: neither W5 nor W3 consumes W0's roster (the three consumers are W1, W9, W10, and **all three wrote after W0** — 17:00:23 / 17:15:30 / 17:21:25). **The ordering law's purpose was served even where its letter was not**, and §R-11 below records what the deviation did cost W5.

---

## §2 · METHOD

1. **Enumerate.** All eleven specs grepped for cross-wave reference forms: `KF-W\d+\.md`, `KF-W\d+\.md:\d+`, `KF\.W\d+`, plus every pasted `grep -n`/`grep -c`/`sed -n` naming a sibling. `grep -ohE 'KF-W[0-9]+\.md|KF\.W[0-9]+' *.md | wc -l` → **2,901 raw sibling references**, of which **47 are SAME-ROUND RECEIPTS** — a quotation, a command output, or a coordinate asserted against a sibling's round-4 bytes. *Counting rule, stated at the enumeration (LAW D(3)): the unit is one asserted claim about a sibling's round-4 bytes; the 2,854 remainder are id mentions, routing tokens, cross-edge labels and prior-round records, which assert nothing about this round's bytes.* Anchor-only forward references (LAW C(3)) were verified for **resolution**, not for prose.
2. **Re-verify at FINAL bytes.** Every receipt re-run by this seat against the sibling's **round-4 final bytes** (column 3 above), never against the substrate the citing seat named. Commands pasted at each finding below.
3. **Classify.** `HOLDS` (substrate and output both true) · `STALE-STAMP` (substrate pre-round-4, output still true) · `STALE-COORD` (coordinate dead at final bytes) · `NUMERIC` (figure ≠ its pasted command's output).
4. **Repair, citation-level only.** Anchors were **never** re-pointed to fresh line numbers — the program's stable-anchor idiom forbids it. Dead coordinates are **recorded and retired**, per the specs' own standing rule that *"a line number is not a receipt."*
5. **Certify** — this file, cited by path and date from each repaired cell (`§R-n` back-references).

---

## §3 · RECEIPTS CHECKED AND FIXED, PER WAVE

| wave | stage | same-round receipts | verdict | fixed |
|---|---|--:|---|--:|
| **KF-W0** | 1 (3rd) | 3 | forward refs **anchor-only**, all resolve at targets' final bytes | 0 |
| **KF-W1** | 1 (6th) | 4 | 3 HOLD · 1 **STALE-STAMP** (W0 read one write early) | **1** |
| **KF-W2** | 1 (7th) | 9 | 1 HOLDS · 4 **STALE-STAMP/COORD** · 2 forward quotes **now verified** · 2 historical | **5** |
| **KF-W3** | 1 (2nd) | 3 | forward refs **anchor-only** (`KF-W10 §6.C-I`, `§6.D`), all resolve | 0 |
| **KF-W4** | 1 (5th) | 2 | anchor-only; `MINTED here, declared` confirmed at `:256` | 0 |
| **KF-W5** | 1 (**1st**) | 6 | anchors **all hold**; every stage-1 peer stamp pre-round-4 | **1** |
| **KF-W6** | 1 (4th) | 4 | forward refs anchor-only per its own §583 declaration; all resolve | 0 |
| **KF-W7** | 2 (9th) | 7 | **exemplary — all seven stamped at FINAL stage-1 bytes** | **1** |
| **KF-W8** | 2 (10th) | 11 | 8 HOLD · 2 **STALE-STAMP** (quotes survived) · 1 **NUMERIC** | **3** |
| **KF-W9** | 2 (8th) | 5 | 4 HOLD (both R4-3 reciprocals byte-exact) · 1 **NUMERIC** | **1** |
| **KF-W10** | 2 (**11th**) | 12 | 8 HOLD · 1 **NUMERIC** · 3 stage-2 rows deferred **to this seat** | **4** |
| | | **47** | | **16** |

*Counting rule (LAW D(3)): the "fixed" unit is one dated `⟨RECONCILE SEAT⟩` insertion, one per finding `R-n` in §4. Column sums 1+5+1+1+3+1+4 = **16**, and `grep -c 'RECONCILE SEAT, 2026-08-28' KF-W*.md` returns exactly those seven non-zero counts — the enumeration and the tree agree.*

---

## §4 · THE SIXTEEN REPAIRS — receipt by receipt, commands pasted

### R-2.1 · `KF-W2` → `KF-W6` · STALE-STAMP + STALE-COORD ×3
Stamp `15:50:46`; W6's final is **16:59:25**, written **before** W2's 17:02:55 — W2 could have read the final bytes and did not.
`grep -n 'Taxonomy (binding' KF-W6.md` → **`:35`** (cited `:18`) · `grep -n 'KF-HA-13' KF-W6.md` → **`:398` `:406`** (cited `:336` `:344`).
**Quoted row text at `:406` byte-identical.** Anchors (§-heading + row id) HOLD. Coordinates retired, not re-issued.

### R-2.2 · `KF-W2` → `KF-W3` · STALE-STAMP
Stamp `15:43:45`; W3's final is **16:56:52**. `sed -n '1p' KF-W3.md` → *"# KF.W3 — Parser Consumption (GATED, never scheduled)"* — **unchanged.** The only W2 receipt that survives its own stale stamp intact.

### R-2.3 · `KF-W2` → `KF-W4` · STALE-STAMP + STALE-COORD
Stamp `15:49:43`; W4's final is **16:59:44**. `grep -n 'G-KFW4-1\b' KF-W4.md` → the gate is **`:205`**; **`:198` is not a hit at all.** Gate-id anchor HOLDS.

### R-2.4 · `KF-W2` → `KF-W5` · STALE-STAMP + STALE-COORD ×3 — *the off-target resolution*
Stamp `15:49:32`; W5's final is **16:55:55**. `grep -n 'B-16' KF-W5.md` → **`:66` `:293` `:339` `:395` `:430`** (row now `:339`; cited `:285` dead) · `grep -n 'G-OPTSET' KF-W5.md` → gate at **`:395`** (cited `:339`).
**The hazard caught in its own cell**: the retired `G-OPTSET` coordinate `:339` now resolves to the **B-16 row** — a dead coordinate that still returns *a* row, and a different one. This is the exact failure mode the stable-anchor idiom exists to kill, found live.

### R-3 · `KF-W2` → `KF-W8` · FORWARD QUOTES **VERIFIED AND RESTORED**
W2's LAW C(3) marker declared two W8 sentences **non-load-bearing** and named this seat as their verifier. Re-run at `KF-W8.md` **17:18:36**:
`grep -c 'the publication act, and it'` → **1** · `grep -c 'PRECEDES KF\.W2'` → **1** · `grep -c 'arms if-and-only-if KF.W8 has not preceded'` → **1** · `grep -n '→ KF.W2/W3 (fold-by-reference + a declared ORDER)'` → **`:412`**.
**Both quotations survived W8's round-4 write intact and are restored to load-bearing.** The MISS-β2 publication order they describe never rested on them (OP-6 / R-16 + `kf-TimelineCaret.md:46`); it now has corroboration rather than a promise.

### R-4 · `KF-W8` → `KF-W6` · **NUMERIC (LAW D(3))** — three-of-ten presented as the whole output
Substrate correctly named (`16:59:25`); the pasted output is not what the command returns there.
`grep -n 'KF-APP-41' KF-W6.md` → **TEN hits: `:67` `:414` `:418` `:419` `:461` `:484` `:502` `:516` `:540` `:572`** — cited as `:67 · :414 · :416`.
**`:416` is not a `KF-APP-41` hit**; it is where the *second quoted sentence* lives (`grep -n 'THE ACT: ONE ATOMIC COMMIT, three limbs' KF-W6.md` → `:416`) — a quote coordinate pasted into a grep's output as if the grep produced it.
**Both quotations verify byte-exact** (`:414` adoption, `:416` atomic act). The R4-1 adoption receipt and the atomic-act receipt both stand; only the command line's arithmetic was wrong.

### R-5 · `KF-W10` → `KF-W0` · **NUMERIC** — and the roster affirmed whole
`grep -n 'TEN S-9' KF-W0.md` at W0's final bytes (**16:58:59, 224,173 B**) → **THREE lines: `:267` `:334` `:649`**; cited as two.
**The dropped `:649` is KF-W0 §Sequencing's `KF.W10 · Fold Discharge & Close` OUTBOUND row** — the very row that hands the roster forward and instructs that it *"must be consumed at THIS file's post-round-4 bytes, never at a prior round's."* A truncated transcript dropped the sentence that authorises the receipt. **See §5 for the roster verification itself.**

### R-6 · `KF-W10` → `KF-W8` · deferred stage-2 receipt — **DISCHARGED**
W10 stamped W8 at `15:50:14` and asked this seat to re-verify R-4's three re-open triggers. W8's round-4 write **did** land first (**17:18:36** vs W10's **17:21:25**) — the stamp reports W10's read clock, not the round's end state.
`grep -n 'TRIGGER, named' KF-W8.md` → **`:391`**. **The three conditions byte-diffed against §3.1's record block: IDENTICAL, word for word** — (1) X·KF closes · (2) the anchor tax disappears · (3) `engine/animation.ts` stops being a live cure surface — including R-4's closing *"the FOLD-FORWARD record at KF.W10 carries all three with the ruling."*
**R-4's text did not move; the record block needed no revision.**

### R-7 · `KF-W10` → `KF-W7` · deferred stage-2 receipt — **ANCHOR HOLDS**
W7's write landed **17:17:02**, before W10's. `grep -c 'KF\.W10' KF-W7.md` → **7** (round-3's **2** superseded a second time; it stays a dated observation, as the cell already treats it). **KF-W7 §Sequencing (`:324`–`:363`) carries its `→ KF.W10` cross-edge row at `:353`.** The acceptance form is byte-exact at both ends (see R-12).

### R-8 · `KF-W10` → `KF-W9` · deferred stage-2 receipt — **ALL THREE ANCHORS HOLD**
W9's write landed **17:15:30**, before W10's. `KF-W9 §Sequencing S-8` → **`:248`** · `S-10` → **`:250`** · `KF-W9 §Bounds` capture-receipt row → **`:74`**, still `SS-13-CAPTURE-RECEIPT.md | create (.e, serial)`, still labelled **THE SURFACE RECEIPT**. Nothing this row depends on moved.

### R-9 · `KF-W9` → `KF-W5` · **NUMERIC**
Substrate right (`16:55:55`). Both named cells verify byte-exact — §Bounds `play-lifecycle` row at **`:216`**, §Carry **B-6 · KF-TD-1** at **`:329`**. But `grep -n '66-75' KF-W5.md` returns **SIX lines — `:216` `:218` `:329` `:372` `:391` `:485`** — not the *"two"* printed beside it. A true statement about two named rows; a false transcript of the command pasted to prove it. The other four hits are all corroborating.

### R-10 · `KF-W1` → `KF-W0` · STALE-STAMP — *the receipt taken one write early*
Stamp **222,633 B / 16:57:50**; W0 wrote **once more**: final **224,173 B / 16:58:59** — 69 seconds and 1,540 bytes later.
Re-probed there: `grep -c 'useControlsKeyboardShortcuts.ts:1'` → **2** · `'ChannelControls.vue:219'` → **2** · `'ControlsPaneWrapper.vue:166'` → **1** · `'toast utility classes'` → **2** · `'eight-custom-property'` → **1**.
**FIVE OF FIVE riders present at the final bytes.** The claim was right and was taken one write early — LAW C's hazard in miniature.

### R-11 · `KF-W5` — the earliest writer, and what that cost it
**KF-W5 wrote FIRST of all eleven (16:55:55), ahead even of KF-W0.** Every stage-1 peer it quotes wrote after it: W4 **16:59:44** (stamped `15:49`), W6 **16:59:25** (stamped `15:50`), plus stage-2 W7 **17:17:02** (stamped `15:39`). Only `carry/KF-W6-CARRY.md` (**10:49:45**) is genuinely frozen, as the file says.
**Every anchor re-verified at the true final bytes and every one resolves**: `grep -n 'The ten rulings this spec owes' KF-W4.md` → **`:98`**, R-1's operative sentence live at **`:123`** (*"Census S-2's owner is hereby named: KF.W6 …"*) · `grep -n 'KF.W4-PROSE SPLITS BY MECHANISM' KF-W6-CARRY.md` → **`:12`**, unchanged · the KF.W9 reciprocal at **B-6 (`:329`)** confirmed from the far end.
**The `KF-SS-31` COUNT-ONLY receipt re-measured**: `grep -c 'KF-SS-31' KF-W6.md` → **4** — `0 / 4` reproduces. **Its coordinates moved again and this time none survived**: round 3 `:152 :158 :356 :384` → pass-4 `:178 :184 :384 :412` → final **`:236` `:242` `:452` `:480`** — **zero of four**, against one of four last round. **Three rounds, three disjoint coordinate sets, one stable count.**
**Not one anchor in this file failed.** The earliest writer was the least exposed — by construction (its §0 R-1.4 / RD-3 retirement rule), not by luck.

### R-12 · `KF-W7` → `KF-W10` · the flagged alphabet — **BYTE-CHECKED, DID NOT MOVE**
W7 explicitly asked this seat to byte-check the terminal alphabet string it adopts as its OUTPUT FORM. At W10's post-round-4 bytes (**17:21:25**), §G-2's Acceptance clause carries it **byte-identical**:
> every row LANDED / KILLED-with-rationale / **`DISCHARGED by KF.W7 SWAP verdict <surface>, <date>`** / **`ADOPTED-BY-KF.W6 (RULINGS-4 R4-1)`** / carried to the next formation boundary's ledger

**The form W7 emits is the form W10 consumes** — no receipt of W7's is emitted in a superseded alphabet. Its other three forward anchors resolve: §3.2's `KF-AV-28 · STANDING SUPERSESSION RIDER` bullet is live, and **§6.D · SUCCESSOR-FORMATION REGISTER exists with the KF.W12 row present** — D9's addressee, which did not exist when W7 named it and was minted into being by R4-8 at the seat that writes last.
**The one item W7 flagged rather than assumed is the one item that needed no repair** — which is the argument for flagging it.

### R-13 · `KF-W8` → `KF-W7` (DH-2) · STALE-STAMP — quotation survived
W7 landed **17:17:02**, before W8's **17:18:36**; the rider reports W8's 17:04 read clock. `grep -n 'test-utils' KF-W7.md` → **`:31` `:61` `:302` `:348` `:352` `:394`**, and **`:61` still carries the quoted row byte-identical**. **The R4-5(b) cure that replaced round 3's phantom *"devDependencies only"* is confirmed, not merely asserted.**

### R-14 · `KF-W8` → `KF-W7` (D-13) · STALE-STAMP — truncation cure holds
`grep -n 'never globbed' KF-W7.md` → **`:68`**, unmoved, quotation byte-identical including the restored `by shared prefix`.

---

## §5 · W10's ROSTER RE-CONSUMPTION — verified against KF-W0's FINAL bytes

R4-7 D-1's whole purpose. Enumerated by this seat from **`KF-W0.md` §Carry `C-17.R` at 16:58:59** and matched row-for-row against `KF-W10.md`'s `CARRY-C-3` block:

| | W0's `C-17.R` (final bytes) | W10's `CARRY-C-3` | |
|---|---|---|---|
| S-9 ×10 | `C-M-1` · `F1 ≡ D-1/L-B1/C-1 → KF-APP-41` · `LP-8 ≡ KF-CO-35 + ME-18` · `C-6` · `KF-AV-28 · D-18 = C-13` · `R-5` · `D-5/L-3/C-2` · `K-6` · `KAD-12` · `C·C-2` | identical, same order | ✅ |
| S-10 ×4 | `C-9` · `KF-KE-21` · `C-12` · **`KF-ET-27`** | identical | ✅ |
| 15th | row 13 retained as the **enumerated strike** (`~~the fifth record's original request~~`) | carried **as the strike**, no verb, no denominator | ✅ |

**The four round-3 defects that made this receipt a defect are each verified cured at the bytes:**
- **`KAD-12` IN** — W0 S-9 row, *"ADOPTED at repair round 3, D-2/E-7"*, provenance `KF-W6-CARRY.md:176`. ✅
- **`F1(c)` OUT** — absent from W0's roster; the coined id retired at D-2/E-9. ✅
- **`/number-field` re-keyed `LP-8 ≡ KF-CO-35`** — W0 S-9 row, head id, provenance legs beneath. ✅
- **`KF-ET-27` present as the FOURTH S-10 claimant** — *"ADOPTED at repair round 4 (D-3/E-2)"*, second provenance leg **`KF-ES-20`** ⟨kf-EasingTarget:69 / kf-EasingSidebar:61⟩. ✅

**The two `ENUMERATED-NOT-MINTED` cells verify byte-exact** at W0 `:426` (`K-6` — *"ENUMERATED AS A DEAD OCCUPANT, NOT MINTED"*) and `:428` (`C·C-2` — *"ENUMERATED AS REFUSED, NOT MINTED"*), quoted whole rather than at the round-1/2 truncations, with the dead `:234`/`:235` coordinates struck.
**The verb split re-derives over these bytes**: 14 live = 10 S-9 + 4 S-10; both enumerated rows are S-9 → **8 S-9 minted + 2 S-9 enumerated + 4 S-10 minted**. The round-2/3 *"11 of 13"* is struck at all three altitudes of W10.
**W0's second falsifier is live at `:557`** and reads as W10 quotes it, including *"the round-3 thirteen was short by `KF-ET-27`."*

**FINDING: the roster re-consumption is CORRECT IN SUBSTANCE AT THE FINAL BYTES.** The single defect was the truncated `TEN S-9` transcript (R-5) — a flaw in the receipt's arithmetic, not in the consumption. **The seven-minutes-stale roster of round 3 did not recur.**

---

## §6 · THE TWO PREVIOUSLY-UNCURED SEAM EDGES — current state at the bytes

R4-7 D-2. Both were recorded *"directive-backed, not measured"* at round 3. Both are now **MEASURED**, and this seat re-measured them a third time at the final bytes.

### Edge 1 — the C-17-MINT CONSUMPTION EDGE (`KF-W10 §6.C-0` row 1 ← `KF-W0 §Sequencing`)
`grep -n 'THE C-17-MINT CONSUMPTION EDGE' KF-W0.md` → **1 hit, `:649`**, inside the `KF.W10 · Fold Discharge & Close` OUTBOUND row, which is labelled *"OUTBOUND **+ INBOUND-DEPENDENCY ANSWERED THIS ROUND (R3-10.1, cures D-4)**"* and states the ordering **`KF.W0`'s C-17 MINT PRECEDES `KF.W10`'s CARRY-FORWARD RECORD block**.
**STATE: MEASURED — CURED AT THE SOURCE.** ✅ The round-3 cell recorded as absent an answer that had been in the edge row by bytes eight minutes before it wrote. **Note**: this is the same `:649` the R-5 transcript dropped — the round's most-consequential single line was both the seam's cure and the truncation's casualty.

### Edge 2 — `KF-HA-19`, the R1-framing triple's adverse member (`KF-W10 §6.C-0` row 2 ← `KF-W3 §Excluded E-14.5`)
`grep -c 'KF-HA-19' KF-W3.md` → **10 matching lines**; `grep -o … | wc -l` → **15 occurrences** — W10's figure reproduces exactly at the final bytes. The booking is the heading at **`KF-W3.md:325`**, *"**E-14.5 · `KF-HA-19` — THE ADVERSE MEMBER OF W10's R1-FRAMING TRIPLE, CARRIED BY BYTES**"*.
**STATE: MEASURED — CURED AT THE SOURCE, AND NOW TWO-ENDED.** ✅ KF-W3 declares the edge from its own end at **`:302`**, a `KF.W10 · Fold Discharge & Close` row verbed *"**DEPENDS ON** (the verb) **· SUPPLIES** (the E-14.5 pass-through)"*, added this round.
**Four readings, four clocks, all true when taken**: round 3 → **0** · RULINGS-4's re-derivation → **4** · W10's post-W3 measurement → **10 lines** · this seat's re-measurement → **10 lines**. The figure is a dated observation; **the anchor is the booking.** The stabilisation between the third and fourth readings is the seam settling.

---

## §7 · THE STABLE-ANCHOR IDIOM — verified

LAW C(3) and the program's standing rule that *"a line number is not a receipt."*

Measured at the post-reconcile bytes, `grep -ohE 'KF-W[0-9]+\.md:[0-9]+(-[0-9]+)?' *.md`:

- **43 occurrences** of the `KF-Wn.md:NNN` form, at **35 distinct (file, line) sites**, spelling **23 distinct citation strings**. *Counting rule: the unit is one textual occurrence; sites and strings are given because the three numbers answer three different questions and rounds 1–3 confused them.*
- **43 of 43 ride an explicit strike/retirement marker** — `STRUCK` · `retired, not re-issued` · `dead` · `non-load-bearing` · `recorded, not re-derived` · `parenthetical`. They are **historical records of retired coordinates**, a lawful form, not live receipts. **Live line-numbered cross-cites: ZERO.**
- The one marginal case — `KF-W8`'s DH-2 cell (`KF-W7.md:61`/`:31`/`:302`), whose LAW C(3) rider sits at sentence distance rather than adjacent — was inspected in full and is **compliant** (*"riding parenthetically and declared non-load-bearing"*), and was re-verified at R-13 regardless.
- **ZERO fresh line-number cross-cites were minted this round.** Every round-4 cure that touched a cross-wave receipt cut it to **§-heading + row/gate id**, and this seat added none.
- **All stage-1 → stage-2 forward references are anchor-only and every one resolves** at its target's final bytes: `KF-W0 → KF-W1 §Repair Round 4 D4-3` ✅ · `KF-W3 → KF-W10 §6.C-I` ✅ `§6.D` ✅ · `KF-W6 → KF-W10 §5 G-2` ✅ `ADOPTED-BY-KF.W6` ✅ · `KF-W6 → KF-W8 G7` ✅ (*"written by KF.W6 alone"* present) · `KF-W7 → KF-W10 §6.D KF.W12 row` ✅.

**THE IDIOM HOLDS.** The class it was built against fired eleven times this round and cost the program **nothing** — every stale coordinate found above sat beside an anchor that resolved.

---

## §8 · WHAT THE SWEEP FOUND, AS A CLASS

**Not one receipt was false in substance.** All sixteen repairs are stamp-, transcript- or coordinate-level. Every quotation checked — **W2's two forward W8 sentences, W8's two W7 quotations, W8's two W6 quotations, W9's two R4-3 reciprocals, W9's W6 KF-HA-10 row, W10's three W8 triggers, W7's adopted alphabet, W5's W4 R-1 sentence** — verified **byte-exact** at the final bytes. **LAW D's verbatim arm produced no convictions this round**, against six MAJOR-band members at pass 4.

**The residual class, named for pass 5.** Every defect above is one of two shapes:

1. **The stale stamp (12 of 16 — R-2.1 · R-2.2 · R-2.3 · R-2.4 · R-6 · R-7 · R-8 · R-10 · R-11 · R-13 · R-14, plus R-3's forward pair discharged).** A seat reads a sibling, then the sibling writes again before the reader does. **LAW C(1)'s stage-1 "in any order" clause is where this survives** — W2 read four peers at pre-round-4 bytes though all four had already written; W5 wrote before every peer it quotes; W1 read W0 sixty-nine seconds before W0's last write. **The stage-2 seats did not commit it** — W7, W8, W9 and W10 all stamped their stage-1 quotations at true final bytes, because LAW C(1) *totally orders* stage 1 against stage 2 and merely *partially orders* stage 1 within itself.
2. **The short transcript (4 of 16 — R-4 · R-5 · R-9, plus the `:416` sub-finding inside R-4).** A figure or coordinate list printed beside a pasted command that is not that command's output — **`TEN S-9` 2-of-3 · `KF-APP-41` 3-of-10 · `66-75` "two" of six** — plus `:416`, a quote coordinate pasted into a grep's output as if the grep had produced it. LAW D(3) named this arm; it fired anyway, in the round that named it, at three separate seats. **This seat is not exempt: its own §3 table first printed a total of 14 against a column summing to 16, and the error was caught by re-running `grep -c` against the tree rather than by re-reading the table** — which is the whole method, applied to the instrument.

**Neither shape reached a row, a gate, a count or a disposition.** The two-stage law contained the damage to the citation layer, which is what it was built to do.

---

## §9 · CERTIFICATION (LAW B form)

**This seat certifies, by measurement rather than assertion, and cites its instruments by path and date:**

1. It ran **AFTER the last per-wave write** — `KF-W10.md` at **2026-08-28 17:21:25**, this seat's first write at **17:30:52**, nine-minute margin, mtime table at §1. ✅
2. It re-verified **EVERY same-round cross-wave receipt in both stages and both directions — 47 of 47** — against the siblings' **final round-4 bytes**, commands pasted at §4. ✅
3. It found and repaired **16** stale receipts, **citation-level only**, across **7** of the 11 specs, every edit a dated `⟨RECONCILE SEAT⟩` insertion citing this file by path. **No row content, gate, count, verdict or disposition was touched.** ✅
4. **W10's roster re-consumption is verified against KF-W0's final bytes** — 10 S-9 + 4 S-10 + the enumerated strike, all four round-3 defects cured, verb split re-derived (§5). ✅
5. **Both previously-UNCURED seam edges are MEASURED and CURED AT THE SOURCE**, edge 2 now two-ended (§6). ✅
6. **The stable-anchor idiom holds: 43 of 43 line-numbered cross-cites ride a strike marker, zero are live, and zero fresh ones were minted this round** (§7). ✅

**Instruments of record**: `docs/tranches/X/keyframes/conformance/PASS-4/RULINGS-4.md` (2026-08-28, LAW C · LAW D · R4-7 · §END) · the eleven `docs/tranches/X/keyframes/conformance/PASS-4/KF-W*-CHECK.md` (2026-08-28) · `PASS-4/UNION.md` (2026-08-28) · the eleven specs at `docs/tranches/X/keyframes/waves/` at the mtimes tabled in §1.

**U4-A IS DISCHARGED.** The certification the round-3 audit found missing exists, was written last, and rests on re-run commands rather than on the directive that ordered it.

**THE ROUND CLOSES.**

---

*RECONCILE seat, X·KF repair round 4, 2026-08-28. Writes: this file + receipt-level insertions at `KF-W1` · `KF-W2` · `KF-W5` · `KF-W7` · `KF-W8` · `KF-W9` · `KF-W10`. `KF-W0` · `KF-W3` · `KF-W4` · `KF-W6` were swept and needed no repair — their forward references were anchor-only by their own declaration and every one resolved. Nothing here stamps any wave, opens product source, or authorizes execution; E-3 holds — registry corrections remain dated addenda under original ids. Per RULINGS-4 §END, the pass-5 union seat audits this file against the bytes as its first act; every command above is re-runnable against the mtimes in §1.*
