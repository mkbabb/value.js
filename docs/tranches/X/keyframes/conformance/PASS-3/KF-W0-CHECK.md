# KF-W0 — FRESH ADVERSARIAL SPEC CHECK (L-18 / L-20, PASS 3)

**Subject**: `docs/tranches/X/keyframes/waves/KF-W0.md` — 490 lines, repaired twice (round 1 vs `PASS-1/RULINGS.md`, round 2 vs `PASS-2/RULINGS-2.md`), then swept for cross-spec re-anchoring.

**Seat**: FRESH. Nothing below is inherited from `PASS-1/KF-W0-CHECK.md`, `PASS-2/KF-W0-CHECK.md`, either RULINGS file, any prior PASS-3 register, or the spec's own prose. Every roster is re-derived at the bytes; every receipt is re-executed at its anchor.

**Substrate of record**: keyframes.js `origin/master` = `81a56990736ced5b5edde0b84c527680ac7689b1` (`git rev-parse origin/master`, run this seat, read-only). Local HEAD `8281638c0ac4ac8c54a67a018ca5bf6a9117174f` is **DISQUALIFIED**; it was read only where a gate's own subject *is* the schism (G-0.1 / G-0.2 / G-0.3 / G-0.4 RED baselines), which is lawful and is declared at each use.

**Corpus**: the 58 `kf-*.md` records at `docs/tranches/V/megatranche/registry/adjudicated/` (`ls kf-*.md | wc -l` → 58) + the sole carry `docs/tranches/X/keyframes/carry/KF-W6-CARRY.md`.

**Date**: 2026-08-28.

---

## §0 — Census unit and method

**Unit** = one ⟨record : banked obligation⟩ **pair** routed to KF.W0. A pair is **BOOKED** only when `KF-W0.md` resolves it **by bytes** to a named disposition **and the id resolves to that record**. A bare `K-1` belonging to kf-SpringTarget does not book kf-MbabbMenu's `K-1` — the spec's own C-1.G rule, applied to the spec. A pair whose content is carried but whose **id is absent by bytes** is an **ESCAPE**; so is a pair booked under an id that does not exist in the bank.

**Method, executed this seat at the current bytes:**

```
$ cd docs/tranches/V/megatranche/registry/adjudicated
$ ls kf-*.md | wc -l                                        → 58
$ grep -h -E 'KF\.W0|KF-W0' kf-*.md | wc -l                  → 237
$ grep -l -E 'KF\.W0|KF-W0' kf-*.md | wc -l                  →  50
  after discarding taxonomy / routing-law boilerplate        → 167 lines across 44 records
```

Each survivor was resolved to its banked ⟨record : id⟩ pair; each pair grepped against `KF-W0.md` **by bytes**. Pairs reachable only through the carry (`KF-W6-CARRY.md` §CrossEdges and its S-9/S-10 claimant rows `:174`–`:179`) were added, as were the three inbound obligations declared **from a sibling spec's end** (`KF-W6-CARRY.md:354`, `KF-W10.md` §Sequencing A + `:363`/`:374`).

**Result: routed 128 · booked 118 · escaped 10.**

The spec's own stated denominator — **73 addressable rows** (22 C-rows + 13 C-1.F + 21 C-1.G + 4 C-1.R + 13 C-17.R) — **reproduces exactly** at the bytes this seat counted (22 / 13 / 21 / 4 / 13). The arithmetic is sound. The escapes below are pairs that never entered any of the five tables.

---

## §1 — THE TEN ESCAPES (named by bytes)

| # | Escaped pair | Banked routing words / anchor | Byte receipt against `KF-W0.md` |
|---|---|---|---|
| **E-1** | **kf-SequenceScene · the F-1 family row `L-1 · C-11 · D §6`** | `:91`/`:99` — *"The F-1 family (**L-1 · C-11 · D §6**) ≡ census SCH-1 / kf-App ruling 1"*; routed at `:145` *"The F-1 limb ≡ census SCH-1 ≡ kf-App ruling 1 → **KF.W0 §B-12**"* and `:153` *"**KF.W0**: the F-1 fold (§B-12)"* | `grep -c 'SequenceScene' KF-W0.md` → **1**, and that one hit is C-19's ledger — a *different* limb (the three re-inheritance events). The fold id is in neither C-1.F nor C-1.G. Under C-1.G's own record-qualification rule the pair does not resolve. |
| **E-2** | **kf-SequenceScene · the "countable-cell" inheritance datum** ⟨killed-claims #14, the "24-member" signature⟩ | `:145` *"plus the **'24-member' countable-cell** signature (killed-claims #14) — the class kf-App.md predicted by name"*; routed at `:153` *"**KF.W0**: the F-1 fold (§B-12) **+ the countable-cell inheritance datum**"* | `grep -c 'countable-cell'` → **0** · `grep -c '24-member'` → **0**. The record routes *two* things to this wave; the wave carries one. |
| **E-3** | **kf-PlaybackRibbon `:36` · the standing KF-AV-28 supersession rider + the C-axis §7 caution + the NON-bespoke limb** | *"Standing rider: **KF.W7's timeline-evaluate verdict may supersede any NO-WAVE-OWNER cure below** (the KF-AV-28 rider); the C axis's own §7 caution rides with it — this ribbon is the **NON-bespoke** case (it consumes the real `Slider`) and carries BLOCKERs anyway, so 'swap onto the primitive' is never sufficient as a cure."* | `KF-W0.md:447` cites `⟨kf-PlaybackRibbon:36⟩` — **for the canonical packet name `transport/ribbon` only**. `grep -c 'NON-bespoke'` → **0**; `grep -c 'KF-AV-28'` → **1**, and that hit is C-17.R row 5 (the mint input), not the rider. `:447` is the wave's own enumeration of *"locks that must travel WITH each packet"*: it carries seven other packets' locks verbatim and **neither limb of this one**. M-25 — *"a sequencing rider dropped in transit is a silent drop"* — is this file's own C-1.F preamble. The same rider governs `kf-SequenceScrubber:36` (the drag-seam packet) and is absent there too; **KF-W4.md:244 carries it** for drag-seam, so the omission is this file's alone. |
| **E-4** | **kf-AmigaScene · the per-file re-anchor datum** | `:155` *"**KF.W0**: the C-1 discharge + the corpus-wide re-anchor clause (this component: **comment-only drift, useAmigaDemo −2 below `:73`**)."* | `grep -c 'useAmigaDemo'` → **0** · `grep -c 'comment-only'` → **0**. G-0.9's GREEN demands the pass *"demonstrably ran **per-file**"* and C-21's whole content is that the direction is per-file; the one measured per-file offset a record hands this wave is not carried. |
| **E-5** | **kf-AmigaScene C-6 · the `owned by KF.W6` limb** | `:146` *"C-6's S-9 ≡ a new census shadow-census row — booked ONCE here, extends S-1..S-8, **owned by KF.W6**"*; `:61` *"**KF.W6** (evaluate-not-swap; the `:6–12` no-DOM-layer ruling may reduce the cure to a shared `.stage-plate` recipe)"* | C-17.R row 4's disposition cell reads **"MINT"** and nothing else. Every sibling cell carries its owner (*"the suffusion cure is KF.W6's"*, *"the `Progress` evaluation is KF.W6's"*, *"the `/number-field` evaluation is KF.W6's"*). This one drops it — the identical omission the same table repairs four rows above. |
| **E-6** | **kf-SpringTrace `D-15`** — dual-owner token consumption | `:72` *"…corroborates lane-frontend §6.3; the banked measurement (kf-AnimationVisualizer KF-AV-42: collision set EMPTY today) keeps it a dated hazard note. **KF.W0 fold-adjacent; no re-book.**"* | `grep -n 'D-15' KF-W0.md` → **1 hit**, in §Excluded's header-ribbon-migration row (*"the cheapest close of the banked blocker AND of **D-15/D-17**"*) — **kf-EditorHeader's family, not kf-SpringTrace's**. The pair is absent. A routing word of *"fold-adjacent; no re-book"* is still a routing word; the wave's own §Excluded law is that **silent drops are the defect class this program exists to kill**. |
| **E-7** | **kf-KeyframesAddDialog `KAD-12` — the S-9 REGISTRY-ADOPTION claimant** ⟨the sole carry, `KF-W6-CARRY.md:176`⟩ | *"**S-9 · KAD-12 — REGISTRY ADOPTION** ⟨kf-KeyframesAddDialog C-3/D-23b⟩ · MAJ · the reformat hotkey hand-rolls a second global keyboard mechanism beside the house `/keyboard` registry…"* | `grep -c 'KAD-12' KF-W0.md` → **0**. C-17.R declares itself *"the mint's complete input set"* and C-17 declares *"no wave other than KF.W0 mints or renumbers a census slot."* A claimant in the wave's **sole carry** that never reaches the roster is the exact mechanism of G-0.6's own second falsifier — *"a mint run over a short roster re-collides on its first motion."* |
| **E-8** | **the carry's banked id for the `/number-field` S-9 claim — `LP-8 ≡ KF-CO-35 + ME-18`** ⟨`KF-W6-CARRY.md:175`⟩ | *"**S-9 · LP-8 ≡ KF-CO-35 + ME-18 — THE `/number-field` EVALUATION** ⟨kf-LayerConfigPanel D-5/C-7; kf-ChannelOptions RR-B net-new; kf-MatrixEditor C-8; kf-CubeScene L-5/C-6⟩"* | `grep -c 'LP-8'` → **0** · `grep -c 'KF-CO-35'` → **0**. C-17.R row 3 books the claim under **kf-CubeScene's `L-5/C-6` + kf-LayerConfigPanel's `ruling 8`** — two of the carry's four provenance legs, under neither of the carry's two head ids. A later seat grepping the carry's id finds nothing; a later seat grepping the spec's id finds a different record. Anti-rename is a two-way law. |
| **E-9** | **kf-EditorHeader · the S-9 DELETE claim — booked under a COINED id** | The claim is real: `:117` *"the census gains **S-9**"*. The **id is not**. | `grep -rn 'F1(c)' registry/adjudicated/` → **0 hits, repo-wide**; `grep -c 'F1(c)' KF-W0.md` → **3** (C-17 mechanism cell, C-17.R row 2, C-1.G row 17's limb cell). kf-EditorHeader's fold ids are **`F1`** `:33` (→ kf-App KF-APP-41, NO-WAVE-OWNER delete), `F2` `:34`, `F3` `:35`, `F4` `:36`; `:117` is the record's `## Verdict` DELETE line and **carries no id at all**. The pair does not resolve at either end. |
| **E-10** | **KF.W10's C-17-mint consumption edge — declared from W10's end, unanswered from this one** | `KF-W10.md:363` *"**`.a`'s CARRY-FORWARD RECORD block runs AFTER KF.W0's C-17 mint** (repair round 2) — `CARRY-C-3` and `CARRY-C-5` cite ids C-17 assigns, and a record written before the mint either guesses a slot or invents one"*; `:374` *"**KF.W0's C-17 MINT PRECEDES the CARRY-FORWARD RECORD BLOCK** (RULINGS R2-2)"*; ground at `KF-W6-CARRY.md:361` item 3 (*"the census S-9/S-10 extensions terminalized"*) + item 5 | `grep -c 'CARRY-C-3\|CARRY-C-5\|CARRY-FORWARD' KF-W0.md` → **0**. §Sequencing's KF.W10 row names the v8 seal, B18-12/13/14, B18-27 and OG-KF1 — **not the mint**. This is the **exact class** the wave cured for KF.W6 one round ago at C-22 (*"an edge declared at one end only; an answer that exists in §Carry but not in the edge table still leaves the seam half-open"*). The precedent is this file's own, and it was not applied to the sibling that declares the harder dependency. |

---

## §2 — DEFECTS

### D-1 · MAJOR — C-14 asserts a live path is NONEXISTENT; the sibling that measured it declared the correction BACK to this wave, and the wave dropped the repo-qualification

`KF-W0.md:144` (C-14) states:

> *"The corpus also cited a **NONEXISTENT path** (`coordination/…-consumer-updates.md`) — a separate citation kill; the real letter is `value.js/docs/tranches/V/archive/GLASS-INBOUND-2026-07-16-headerribbon-persistent-only.md:15-19`."*

G-0.10's GREEN repeats it: *"XR-4 / IN-GLASS-1 / `DISPOSITIONS.md:21` re-read against the **archive file** … + `dist/header-ribbon.js`."* One letter, singular.

**Re-measured this seat at the substrate of record:**

```
$ git -C /Users/mkbabb/Programming/keyframes.js ls-tree -r --name-only origin/master | grep -i headerribbon
docs/tranches/V/coordination/GLASS-INBOUND-2026-07-16-headerribbon-consumer-updates.md
$ ls -l /Users/mkbabb/Programming/value.js/docs/tranches/V/archive/GLASS-INBOUND-2026-07-16-headerribbon-persistent-only.md
-rw-r--r--  2878 B  (present)
```

**The path is not nonexistent.** It exists at keyframes.js `origin/master` — it is simply in the *other repo*. They are **two different letters in two different trees**, and `KF-W10.md` §Sequencing A says so, addressed to this wave by name:

> *"**RIDER W10 declares BACK to KF.W0**: kf-EditorHeader **EH-1** routes there … **XR-4 / IN-GLASS-1 / `DISPOSITIONS.md:21` must be re-read** against **two repo-qualified letters — the qualification is load-bearing and is NOT dropped at the point of delivery** (KF.W0's substrate is keyframes.js, where only one of the two exists) … **They are different documents in different repos** (§3.3's correction), so a consumer handed the bare filename would search the wrong tree and conclude the coordinate is dead."*

The wave does exactly what the rider forbids: it hands the bare filename, drops the qualification, and **converts the sibling's "different repo" finding into a "citation kill."** A gate whose entire content is *"a version string is not an artifact"* (G-0.10) closes on a receipt that proves the document next door — the wave's own D-8 mechanism from round 2, now at the gate rather than the bounds row. Worse: an executing `.e` seat reading G-0.10's GREEN re-reads **one** of the two letters and stamps the gate.

**Cure**: C-14 and G-0.10 both carry **two repo-qualified coordinates** — (a) value.js `docs/tranches/V/archive/…persistent-only.md:15-19`, (b) keyframes.js `origin/master:docs/tranches/V/coordination/…consumer-updates.md` — and the "NONEXISTENT path" sentence is **struck**, replaced by the repo-qualification finding, with the strike declared loudly per E-3.

---

### D-2 · MAJOR — C-17.R's roster is short and one of its thirteen rows is ANONYMOUS; the "complete input set" cannot be minted from

Two independent failures in the one table the wave declares *"the mint's complete input set"* and *"the row's roster of record."*

**(a) Row 13 names no record, no id and no line.** At `:239`, verbatim:

```
| S-10 | the fifth record's original request | as banked | MINT |
```

G-0.6's GREEN reads: *"every claimant on the C-17.R roster is dispositioned in ONE motion — **minted under a fresh non-colliding id citing its originating record**, or enumerated as a dead/refused occupant with its reason."* Row 13 **cannot cite its originating record**, because the row does not know it. C-17's own falsifier is explicit — *"a minted slot that does not cite its originating record fails too: the citation is what makes the next collision detectable."* The row is unmintable and ungreenable as written, and it is counted in the thirteen that produce the §Carry denominator of 73.

**(b) The roster is missing a carry claimant and mis-keys another** — E-7 (`KAD-12`, absent) and E-8 (`LP-8 ≡ KF-CO-35`, booked under a different record's id). The carry is the wave's **sole** carry; its `:174`–`:179` block is the only place in the tree where the S-9/S-10 claimants are enumerated as a set, and `KF-W10.md:89` cites exactly that block (*"claimant rows at `:174`–`:177` (the S-9 quartet) and `:179` (S-10 · KSM C-9)"*) as the ground its own CARRY-C-3 terminalizes.

**(c) And the id at row 2 does not exist** — E-9. `F1(c)` has **zero hits repo-wide** in the registry, in a table whose §Carry preamble reads *"**no id in this file is coined, renamed, or renumbered**"* and whose C-1.G preamble reads *"Every id below keeps its banked spelling (anti-rename)."* Three of the wave's own laws convict this cell.

**Net effect**: the single motion C-17 exists to perform runs over a roster that is (i) missing a claimant, (ii) mis-keyed on a second, (iii) anonymous on a third, and (iv) coined on a fourth. R-5's diagnosis — *"a roster short by six claimants, one of them already renumbered into a second collision, is the precise mechanism of the collision this row exists to kill"* — reproduces one round later at a smaller amplitude.

---

### D-3 · MAJOR — C-19's "32 records" denominator counts two ANTI-firings the cell itself declares are not firings

`KF-W0.md:149` heads the ledger:

> *"— **32 records (count corrected this round, D-8: the cell's own enumeration named 24 distinct records, not 25, and eight further records bank their own firing)**"*

**Re-derived at the bytes this seat**, over the cell:

```
$ sed -n '149p' KF-W0.md | grep -o -E 'kf-[A-Za-z.]+' | sort -u | wc -l   → 32
```

Thirty-two distinct record names — but **two of them are in the cell's closing clause**, which reads:

> *"**Anti-inheritance events preserved beside the failures as fleet evidence, not tree evidence** (ColorSpaceSelector DISSENT-1 precedent): **kf-CubeAxisLines**' reader-β re-deriving F-1's substrate from git; **kf-AnimatedText**'s two readers converging independently on the `role=\"img\"` implicit-role override, *\"the anti-signature of citation-inheritance.\"*"*

The ledger's subject is the **dirty-manifest law firing**. `kf-CubeAxisLines` and `kf-AnimatedText` are the cell's own named counter-examples — records where the law **did not** fire. The firing count enumerated is **30**, not 32; the arithmetic `24 + 8 = 32` reaches 32 only because the first list of "24 distinct records" silently includes the two anti-signatures.

This is the **third consecutive round** on the same cell — round 1 stated 25, round 2's D-8 convicted it and restated 32, and 32 is wrong for a new reason. G-0.9's closure sweep resolves each of the 32 to a named disposition; two of them resolve to *the opposite* disposition. The wave's own D-8 wording binds: *"a ledger claiming 'enumerated per firing' must actually enumerate; an under-counted denominator is un-closable"* — an **over**-counted one is equally un-closable, and it is the harder error to see because the roster looks full.

**Cure**: the headline reads **30 firings + 2 anti-firings, enumerated separately**, and G-0.9's sweep is keyed to 30.

---

### D-4 · MAJOR — the KF.W10 seam is half-open at exactly the place C-22's precedent says it must close

E-10, stated as a defect. One round ago this wave adopted **C-22** on the finding that KF.W6's `§CrossEdges` edge was *"declared from KF.W6's end and unanswered from this one"*, and wrote the rule into §Sequencing: *"an answer that exists in §Carry but not in the edge table still leaves the seam half-open."* The rule was applied to one sibling and not swept.

`KF-W10.md` declares **three** dependencies on this wave at §Sequencing A, plus a fourth at `:363`/`:374`:

1. §B-12 is KF.W0's act — **carried** (KF-W0 §Sequencing, INBOUND OP-1 row). ✔
2. X-1's v8 disposition **binds W10's `@ 8281638c` scope clause** — carried at C-18/G-0.8, though the *binding on W10's scope stamp* is not stated from this end. ~
3. The manifest-schism re-baseline law governs W10's four addenda — carried as C-2's law. ✔
4. **`CARRY-C-3` / `CARRY-C-5` are written AFTER the C-17 mint and cite the ids it assigns** — **absent by bytes** (`grep -c` → 0). ✘
5. **The EH-1 rider W10 declares BACK** (two repo-qualified letters) — **contradicted**, see D-1. ✘

Two of five. The C-22 precedent exists inside this file; applying it to the sibling that declares the *hardest* downstream dependency on the C-17 mint is not new work — it is the sweep the round-1 "altitude sweep" law already mandates (*"a cure landed in one place and left standing in another is relocated, not repaired"*).

---

### D-5 · MAJOR — C-1.G's round-2 re-derivation receipt does not reproduce at any reading, and the roster it produced is short by exactly the rows that receipt would have caught

`KF-W0.md:180` states the method and its output verbatim, in the paragraph whose whole subject is that the roster must be **measured, never inherited**:

> *"The re-derivation method, run this seat over the **58** records at their current bytes: `grep -n -E 'KF\.W0|KF-W0' kf-*.md` → **200 routing lines across 48 records** (taxonomy/routing-law boilerplate discarded)"*

**Re-executed at this seat, on a corpus that has not moved since** — every `kf-*.md` mtime falls between **2026-08-07 and 2026-08-25**, all of them before the spec's 2026-08-28 authoring:

```
grep -h -E 'KF\.W0|KF-W0' kf-*.md | wc -l                     → 237      (not 200)
grep -l -E 'KF\.W0|KF-W0' kf-*.md | wc -l                     →  50      (not 48)
… boilerplate discarded                                       → 167 / 44 (not 200 / 48)
```

**Neither figure reproduces at either reading** — pre-discard (237/50) or post-discard (167/44). 200/48 is a third basis, and a receipt with a third basis is the SCH-3 defect (145 / 153 / "159" / 80) this wave was built to kill, committed inside the table that exists to prove the wave did not inherit a roster.

This is not cosmetic. The re-derivation is what produced C-1.G rows 14–21, and the ruling's own instruction — *"the next seat re-derives it again rather than copying this table, because a roster adopted twice is a roster nobody has measured"* — is the standard. Run properly, the sweep reaches **kf-SequenceScene**, whose four KF.W0 lines carry **two** routed obligations (`:145`, `:153`) and whose fold id `L-1 · C-11 · D §6` and countable-cell datum are **E-1 and E-2** of this register. A 44-record post-discard sweep lands on that record; a sweep that reports 48 records and 200 lines landed on something else.

**Cure**: re-run the block, paste both readings with their commands, and re-derive C-1.G's membership from the 44-record post-discard set rather than from row count 21.

---

### D-6 · MINOR — G-0.4's negative probes are stated without their scope word

G-0.4's static tier pastes *"`git grep -n 'bounceInEase' -- demo/` → 0 · `git grep -n '\.start\.toString()' -- demo/` → 0"* as the GREEN form. Neither carries a **ref**. Every other probe in the file names its coordinate (`origin/master:` or `HEAD:`); these two are worktree-relative and will be run by `.c` *on the reconciled tree* — which is correct in intent and unstated in bytes. The gate's own falsifier is *"a gate leg closed on an oracle that names no coordinate is the same failure one level up."* Adding `origin/master` (or, more precisely, "the settled worktree, dated") closes it. Same class as D-7's round-2 cure, one probe short of complete.

---

## §3 — AXIS VERDICTS

| Axis | Verdict | Ground |
|---|---|---|
| **(1) ID-KEYED CENSUS** | **DEFECTIVE** | routed 128 · booked 118 · **escaped 10** (E-1…E-10). The five sub-tables' stated denominator (73) reproduces exactly; the escapes are pairs that entered no table. Two escapes come from the **sole carry** (E-7, E-8) — the one authority the wave names as its own — and one is a coined id (E-9) in a table whose preamble forbids coining. |
| **(2) AUTHORITY REALITY** | **DEFECTIVE (one MAJOR), otherwise strong** | **D-1** is the only receipt that does not resolve at its anchor — and it resolves to the *opposite* of what the spec asserts. Everything else re-executed clean: `lane-docs.md:380` row 16 verbatim ✔ · `lane-frontend.md` `^### S-` = 8, S-1 `:264` / S-8 `:387`, §6.5 at `:462`, tally `:598`, `:15` F-1 RED, `:194`, `:398` ✔ · `CENSUS-2026-08-03.md` `grep -n '6\.5'` → **one hit at `:141`, pointing away** ✔ (D-4 of round 2 stands cured) · `KF-W6-CARRY.md:354` §CrossEdges + `:90` KF-SKEL-7 ✔ · `KF-W2.md:270` **is a blank line and the spec says so**, anchoring on the §-heading + row label instead (the real row is `:499`) — R2-7-compliant, **not** a defect ✔ · `KF-W4.md` §Excluded rows 16/17 carry the reciprocal residue edge, and its homing lists read **W11 ×9 / W12 ×6 / W13 ×2** exactly as `:447` restates ✔ · the archive letter `:15-19` says what C-14 says it says ✔ · `origin/master:docs/tranches/V/V.md:73` carries the `[object Object]` born-RED gate, so the cross-edge declaration is real ✔. |
| **(3) M-25 DEPTH (locks / riders / dissents)** | **DEFECTIVE** | **E-3** is the sharp one: the KF-AV-28 standing supersession rider governs at three sites and is carried at one — and the omission lands in `:447`, the file's own enumeration of *"locks that must travel WITH each packet."* KF-W4.md:244 carries the same rider for drag-seam, so this is a drop, not an absence. **E-5** drops an owner from a mint cell whose siblings all carry one. **E-6** drops a routed-but-not-rebooked row. Against that: the dissent surface is genuinely deep and correct — β-miss-1's `--omit=optional` failure-shape ✔, B18-26 split adoption ✔, B18-27 unresolved-by-design ✔, DISSENT 1/3/4 ✔, C-20's inter-bank contradiction named as the test case ✔, reader-B's six vacated caveats preserved as dated record ✔. |
| **(4) GATES BORN-RED, WITNESSES AT THE FRONTIER** | **HOLDS — every baseline reproduces byte-exactly** | Re-executed read-only at `81a56990` this seat: **G-0.1** 41 / 1 / 252 / 325 / 124 / `a59d3a22` ✔ (all six) · **G-0.2** HEAD `:71` 6.0.0 optionalDep (name `@mkbabb/keyframes.js` 5.3.5) · frontier `:77` 7.0.0 devDep (version 6.0.0, `:70` value.js 4.0.0) · worktree 0/0 · locks 3/3 · installed 7.0.0 · `.npmrc` single line · no pencil-boil ✔ · **G-0.3** the four-path diff ✔ · **G-0.4** `bounceInEase`→`easeInBounce` at `:42`, `.toString()`→`startScalar` at `:11`, the `templateFrames.length` cure at `:97` ✔; `live-session.mjs:77` is the sole `console-budget` importer outside its mobile sibling and `smoke.mjs` has **0** `pageerror` bytes ✔ (D-7's round-2 cure verified true) · **G-0.5** glass-ui HEAD header-ribbon empty / `4bf53962^` five files / consumer `:116` intact / `dist/header-ribbon.js` present ✔ · **G-0.6** src `.ts` **153**, demo `.vue` **58**, demo `.ts|.vue` **185** ✔ · **G-0.7** the three entry points at `:50`–`:52`, `check` at `:37` with **no vue-tsc**, `lint` at `:44`, `gh-pages` at `:43`, **9** files under `scripts/gates/`, `git grep -n 'build:gh-pages' origin/master` → **rc=1, no hits**, the dead-name sweep → **55 lines = 54 names + 1 bare token, 1 runnable (`proof:publish`) → 53 dead**, **116 hits / 51 files**, `proof:demo-no-oversize` **16/13** demo-scoped vs **121/70** repo-wide, D-13's **8 distinct names over 16 citations − 1 roster carve-out = the banked seven**, `live-session-mobile` at `scripts/demo-roster.mjs:11` ✔ — every figure reproduces · **G-0.10** the archive letter present, `--ink-perimeter` provenance story intact ✔. **No gate is green-by-authoring; no witness is inherited; nothing is anchored at `8281638c` except where the schism *is* the subject and is declared.** This axis is the file's strongest and passes clean but for D-6's missing scope word. |
| **(5) POSTURE** | **MIXED — three legs hold, two fail** | **W4 head honored** ✔ — §Sequencing declares KF.W4 *"may not open before this re-anchor"* and *"G-0.7's roster is KF.W4's precondition"*, and the packets *"sequence after KF.W4's vue-tsc gate"*; KF-W4's own head is G-KFW4-1, the vue-tsc gate, so the order is right way round. **The `npm run check` re-cut COMPOSES** ✔ — W4 redefines `check` to `vue-tsc --noEmit -p tsconfig.json && tsc --noEmit -p tsconfig.test.json && npm run proof:structure`, which replaces only the bare `tsc --noEmit` arm of the live `:37` script and preserves both the test-project arm and `proof:structure`; W0 pastes the pre-W4 truth, dates it at `81a56990`, and hands R-9's carve-out forward as W4's input — no collision. **W3 gated-unscheduled** ✔ — `KF-W3.md:1` is titled *"Parser Consumption (GATED, never scheduled)"* and W0's cross-edge states *"KF.W3 is GATED on PLAW-BIND → V.L1/V.L5 → packed Value release"*, with the three value.js-side carries named so no KF wave books them. **KF-AV-28 present where governed** ✘ — one of three sites (E-3). **O-21 (not O-20) at W1's mint sites** ✔ *vacuously and correctly* — `grep -o -E 'O-[0-9]+' KF-W0.md` returns only `O-1`/`O-7`/`O-8`/`O-11`/`O-17` substrings, of which the real ids are **O-8 and O-11** (the obligation packets) and the rest are `KF-CO-1`/`KF-CO-7`/`KF-CO-17` fragments; the wave names **no mint site**, so it cannot carry a spent id. The R2-1 hazard does not reach this file. **W10's carry-routed obligations closed by carriage** ✘ — E-10 / D-4: two of five carried, and the sibling's declared-back EH-1 rider is not merely uncarried but contradicted (D-1). |

---

## §4 — WHAT THE TWO REPAIR ROUNDS ACTUALLY FIXED (stated so the delta is legible)

Verified true at this seat, not taken on the spec's word:

- **R2-17 / the 53-name roster** — the sweep denominator is a measured universal, and the measurement reproduces (54 names, 1 runnable). The round-1 four-name hand-list is genuinely retired at every altitude (§Scope 8, C-12, G-0.7 roster/GREEN/falsifier, unit `.e`, the L-18 rider). This was the largest defect of pass 2 and it is closed.
- **R2-17.1 / roster-not-strike** — G-0.7's GREEN is now reachable by writing `docs/**` only, and falsifier (c) makes a demo strike wave-fatal. The gate is satisfiable inside its own §Bounds. Closed.
- **D-4 (round 2) / the §6.5 home** — re-homed at all five altitudes, and `grep -n '6\.5' CENSUS-2026-08-03.md` → one hit pointing away, exactly as claimed. Closed.
- **D-7 (round 2) / the runtime tier** — `smoke.mjs` really does load no budget and install no `pageerror` handler; the correction is stated rather than absorbed. Closed.
- **D-8 (round 2) / the `dist/gh-pages` receipt** — both receipts now stated against their own claims (`.gitignore:10` for the git fact, the `files` array for the npm fact). Closed.
- **R-11 / `npm run gh-pages`** — all seven execution voices corrected, banked words preserved under E-3, and `build:gh-pages` confirmed absent at every coordinate. Closed.
- **R-19b / C-22** — the KF.W6 seam is closed at both ends, by bytes. Closed *for that sibling* (see D-4 for the one it was not swept to).
- **R2-5(g) / the 73 denominator** — re-counted at the bytes and reproduces exactly. The round-1 "65" arithmetic error is gone.

The file is markedly stronger than its pass-2 state. Its remaining defects are **not** the ones it was repaired for; they are new surfaces exposed by the repairs — which is the expected shape of a third pass, and is why the pass exists.

---

## §5 — VERDICT

**DEFECTIVE.**

Five MAJOR defects and one MINOR, over ten census escapes.

The wave's measurement layer is now excellent: **every one of the ten gates' RED baselines re-executes byte-exactly at `81a56990`**, no witness is inherited, no figure is carried by arithmetic, and the disqualified ref is read only where it is the subject. Axis 4 passes clean.

What has not closed is the **carriage** layer, and it has not closed in the same shape three rounds running: a roster is declared complete, a denominator is declared enumerated, a rider is declared carried — and the bytes say otherwise by a small, checkable margin. D-1 is the one that must not survive another round: the wave asserts a **live coordinate is dead**, in the gate whose entire content is provenance truth, against a sibling spec that measured the coordinate and declared the correction back to this wave by name. That is C-13's own conviction, committed by the file that books it.

**Ordered for repair**: D-1 (the two repo-qualified letters, and strike the "citation kill") · D-2 (C-17.R: name row 13, adopt `KAD-12`, key the number-field claim to `LP-8 ≡ KF-CO-35`, retire the coined `F1(c)`) · D-5 (re-run the 200/48 sweep; re-derive C-1.G's membership from the 44-record post-discard set, which is what lands E-1/E-2) · D-3 (30 firings + 2 anti-firings) · D-4 (answer W10's mint edge in the cross-edge table, per this file's own C-22 precedent) · then E-3…E-6 into C-1.F / C-17.R / `:447` · then D-6.

*Register written 2026-08-28. Substrate `81a56990`. Nothing inherited.*
