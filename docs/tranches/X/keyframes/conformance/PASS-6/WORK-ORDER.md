# X·KF PASS-6 — SURGICAL WORK ORDER (round-6 repair contract, byte-level)

**Seat**: surgical work-order seat, X·KF round 6 · 2026-08-29. **Sole write = this file.**
**Inputs consumed whole**: `PASS-6/UNION.md` (the 103-row register incl. the §6 truncated tail) · all eleven `PASS-6/KF-W*-CHECK.md` defect registers · the eleven specs at `docs/tranches/X/keyframes/waves/` · the 58-record corpus at `docs/tranches/V/megatranche/registry/adjudicated/` · `PASS-5/CLOSE-CERT-2.md` · `PASS-5/RULINGS-5.md` · the round-5 authoring journal at `/Users/mkbabb/.claude/projects/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/subagents/workflows/wf_3c41968c-46d/`.

**What this file is.** One concrete edit for **every one of the 103 register entries**. Each edit carries: the **file**, the **anchor** (line at pass-6 bytes + a unique grep fragment), the **exact current bytes**, and the **exact replacement bytes** or the **row to insert**. Every derivation a repair seat would otherwise be asked to re-run has been run **here**: the ten missing trail names with their record routings, the six LAW F(1) acts with each SHADOW line's text written out, the eleven true per-wave round-5 clocks recovered from the authoring journal, the two escapes' banked text, and the ~16 numeral cells as old→new pairs.

**What this file is not.** There is **no universal instruction anywhere in it**. No edit reads "every", "all N", "sweep the class", or "re-derive". Where a defect *is* a class, the class is **enumerated** and each member gets its own numbered edit. A repair seat that executes this file performs mechanical substitution; it derives nothing.

**Anchor convention.** Line numbers are at the **hash-locked pass-6 bytes** (CLOSE-CERT-2 §9 closing column, re-verified 11/11 by four seats). Because the specs carry 1–8 KB lines, the *operative* anchor of every edit is the ⟨GREP⟩ fragment — a byte-unique substring of the current line. A seat matches the fragment, not the line number; the line number is the navigation aid and is expected to move as edits land above it.

**Standing edicts carried in (unchanged, not restated per-edit)**: E-3 (prior-pass artifacts immutable; corrections live forward) · anti-rename (every id keeps its banked name) · LAW E(4) anchor-only for per-wave cross-wave receipts · frontier of record `origin/master 81a56990736ced5b5edde0b84c527680ac7689b1` in `/Users/mkbabb/Programming/keyframes.js`, never the checkout (41 behind / 252 dirty) · no gate runs · no product source is opened for writing · status of every spec stays `planned`.

---

## §0 · THE FALSE-UNIVERSAL BAN — the one standing edit, and its enumerated instances

**The rule, to be landed verbatim as `PASS-6/RULINGS-6.md` LAW G (edit `TR-04`):**

> **LAW G (the false-universal ban).** A spec may not declare, **in current voice about its own bytes**, a universal quantifier over its own acts — *"every act below…"*, *"all fifteen gates"*, *"the only clocks this file prints"*, *"swept whole"*, *"rebuilt by command over the 58 records"*, *"applied whole, three ways"*, *"this file alone"*. Wherever such a sentence exists it is replaced by **one of exactly two lawful forms, never a third**: **(a)** the **enumerated list** of the covered members, written at the sentence; or **(b)** a **citation of a census artifact** that carries the enumeration, by path + § + date, with the figure quoted and not re-asserted in the spec's voice. A universal that is neither enumerated nor cited is struck by dated note in the same edit that replaces it. **Verification is by FORM, never by token**: a pattern that cannot distinguish an act from a mention (`grep -c 'SHADOW'`) does not verify the law it audits — this is the exact failure that let `D-P6-2` through `CLOSE-CERT-2 §7.6`.

**Its instances in this round's register, each executed at its own numbered edit — twelve members, enumerated, no thirteenth implied:**

| # | file | the false universal, verbatim | edit |
|---|---|---|---|
| 1 | KF-W6.md `:10` | *"**every** act below that strikes, restores, re-scopes or re-points carries its **SHADOW line in the same edit**"* | `W6-08` |
| 2 | KF-W6.md `:202` | *"TRAIL REBUILT BY COMMAND OVER THE 58 RECORDS"* | `W6-02` |
| 3 | KF-W9.md `:603` | *"Per LAW F(1) **each act** carries its own SHADOW line AT the act"* | `C-21` |
| 4 | KF-W9.md `:95` | *"**banked aliases are written in full, never discharged by identity**"* | `C-25` |
| 5 | KF-W7.md `:344` | *"**every one of them** now passing the four-part test above"* | `T7-06` |
| 6 | KF-W5.md §END | *"the **only** clocks this file now prints are the frozen CARRY's and its own"* | `T5-03` |
| 7 | KF-W5.md G-CSSIDENT | *"no other spec cites this cell … returns **this file alone**"* | `T5-02` |
| 8 | KF-W4.md §Bounds | *"**every** pasted command in this file was RE-RUN at this seat's write time"* | `T4-03` |
| 9 | KF-W8.md act-coverage | *"**Swept whole**"* over ten of fourteen acts | `T8-08` |
| 10 | KF-W8.md §Gates G7 | *"The template is now applied whole, **three ways**"* | `T8-02` |
| 11 | KF-W2.md §Excluded `:886` | the engaged-record counting rule enumerating 48 under a 7-row table | `T2-01` |
| 12 | KF-W10.md `:122` | *"**No unbooked terminus survives this run**"* | `C-30` |

---

## BATCH-W6 — `docs/tranches/X/keyframes/waves/KF-W6.md` (17 edits)

Both BLOCKERs live here. Fifteen of the seventeen edits are one line each; two are insert blocks.

### W6-01 · [D-P6-1 · BLOCKER] — insert the TEN missing banked names on the ID-ALIASES trail

**Anchor**: after line **`:210`**, the last of the round-5 eight (⟨GREP⟩ ``- **`C:C-8`** ⟨`kf-TypingDots.md:44``), immediately **before** the blank line preceding `:212` (⟨GREP⟩ `**THE TWO AMBIGUOUS MEMBERS, RECORD-QUALIFIED**`).
**Current bytes at the insertion point**: none — this is a pure insert of ten bullets in the round-5 members' own idiom.
**Pre-repair measurement, re-run at this seat and to be pasted with the block** (`for id in D-33 D-M-3 D-M-9 MISS-1 MISS-2 MISS-4 MISS-7; do grep -c -- "$id" KF-W6.md; grep -c -- "$id" ../carry/KF-W6-CARRY.md; done`): **spec 0 for all seven distinct names**; CARRY — `D-33` **1** · `D-M-3` **1** · `D-M-9` **1** · `MISS-1` **1** · `MISS-2` **2** · `MISS-4` **1** · **`MISS-7` 0 (the only name absent at BOTH surfaces)**.

**Insert, verbatim:**

```
**TRAIL EXTENDED — TEN FURTHER MEMBERS, ADDED AT REPAIR ROUND 6 (PASS-6 KF-W6 check D-P6-1, BLOCKER).** The round-5 heading asserted the rebuild; this block pastes the loop's output instead. **Pre-repair, re-run at this seat over the 58 records** (`for id in D-33 D-M-3 D-M-9 MISS-1 MISS-2 MISS-4 MISS-7; do grep -c -- "$id" KF-W6.md; grep -c -- "$id" ../carry/KF-W6-CARRY.md; done`): **all seven ZERO in this spec**; at the CARRY `D-33` 1 · `D-M-3` 1 · `D-M-9` 1 · `MISS-1` 1 · `MISS-2` 2 · `MISS-4` 1 · **`MISS-7` 0**. Re-running the loop after this repair returns ≥1 for all seven in this spec — that is the check, and it is the whole of what this block claims.

- **`D-33`** ⟨`kf-KeyframesEditor.md:90` — *"**KF-KE-45 · D-33 as-rescoped** — the `.tap-floor` dead-utility half **FOLDS to banked KF-CB-25** (zero adopters — that count is already rostered); surviving here: 24 px targets at the demo's own 44 px written floor and the gapless X↔CopyButton pair — a pair that is occluded outright today (KF-KE-5) … → **KF.W6**."*⟩ — **carried under `KF-KE-45`** (W6-D's `.tap-floor` / touch-target family; the `KF-CB-25` fold is already rostered and is not re-booked). Its record-side contribution is a **rescope of an already-folded half, not a second defect**. Its host row sits **three lines below `KF-KE-42 · D-30` at `:87`**, which round 5 DID enter — the name was the gap, not the row.
- **`D-M-3`** ⟨`kf-EasingTarget.md:49` — *"**KF-ET-10 · C-4 = D-M-3(b), RESTORED BY THIS SEAT** … 28 independent `Chip mode="selectable"` toggles + a hand-rolled single-select invariant (`:201-206`) where `ToggleGroup type="single"` is used 30 lines up in the same file … **MAJOR.** → **KF.W6** (the chip-group pairing rides the Glass Suffusion decision + the BH letter for a first-class selectable chip group)"*⟩ — **carried under `KF-ET-10`** (§Bounds easing carve · W6-I · `G-W6-9`'s ledger · `G-W6-14`'s relay ask). **BINDING CITATION, the D-P4-2 hazard closed for this record: `D-M-3 ⟨kf-EasingTarget⟩` → `KF-ET-10`. It is NOT `D-M3 ⟨kf-SpringHeatmap⟩`** (5 lines / 8 occurrences in this spec, all the canvas-discipline commit family) **and NOT `D·M-3 ⟨kf-TimelineCaret⟩`** (2 occurrences) — one hyphen and one separator apart, three records, three rows. None may be cited bare.
- **`D-M-9`** ⟨`kf-EasingTarget.md:59` — *"**KF-ET-17 · D-M-9** — the copy affordance is a 16×16 CSS-px target (css:68-75 + CopyButton's `p-0 m-0`), compounded by the orphaned coarse-pointer floor. **ONE identity with the banked KF-CB-5/KF-CB-14 family** … → **FOLD by reference → KF.W6**; the SC 2.5.8 spacing-exception question rides SS-13."*⟩ — **carried under `KF-ET-17`** (the fold-by-reference into the `KF-CB-5`/`KF-CB-14` touch-target family; no re-booking). **BINDING CITATION: `D-M-9 ⟨kf-EasingTarget⟩` → `KF-ET-17`; NOT `D·M-9 ⟨kf-TimelineCaret⟩`** (2 occurrences in this spec).
- **`MISS-1`** ⟨`kf-SharePopover.md:37` — *"**SP-4 · MAJOR · the share-URL field renders at ~12px** — below the repo's OWN ruled and unit-tested 16px iOS no-zoom floor … **NET-NEW (reader 1 MISS-1)** … **→ KF.W6** (cure: `text-mono-small` — one edit with SP-7) **+ KF.W9 witness**"*⟩ — **carried under `SP-4`** (W6-J's SharePopover motion/typography batch; the KF.W9 witness leg is the hardware-only zoom behaviour and is not this wave's). `MISS-1` occurs on exactly ONE KF.W6-routed row corpus-wide and needs no record qualification.
- **`MISS-4` ⟨kf-SharePopover⟩** ⟨`kf-SharePopover.md:45` — *"**SP-9 · MINOR · the Input's `h-8` defeats the coarse floor OUTRIGHT — the row's largest touch deficit (60px → 32px)** … **NET-NEW (reader 1 MISS-4)**: D printed the number in its own table and drew no consequence … **→ KF.W6.**"*⟩ — **carried under `SP-9`** (same cure family as SP-8: drop the height override, let `size` drive; distinct mechanism, distinct consequence).
- **`MISS-4` ⟨kf-StartingStyleTarget⟩** ⟨`kf-StartingStyleTarget.md:69` — *"**KF-SST-28 · C-8 + reader-A MISS-4 (one identity: the declined Card family)** — consumes the `Card` shell but hand-rolls the header glass-ui ships … **Family ≡ banked KF-ES-28** (second site, cited not re-booked fresh) … **MINOR.** → **KF.W6** (family adoption decision) + **NO-WAVE-OWNER**"*⟩ — **carried under `KF-SST-28`** (W6-I's Card-family adoption decision; the heading/landmark one-liner stays NO-WAVE-OWNER if the family is declined). **BINDING CITATION: `MISS-4` is TWO rows in TWO records — `MISS-4 ⟨kf-SharePopover⟩` → `SP-9` (reader 1) and `MISS-4 ⟨kf-StartingStyleTarget⟩` → `KF-SST-28` (reader A). Neither may be cited bare.**
- **`MISS-2` ⟨kf-SharePopover⟩** ⟨`kf-SharePopover.md:57` — *"**SP-21 · MINOR · `align="start"` is wrong at BOTH live mounts** … structurally unreachable alignment; the collision middleware, not the author, decides placement … Correct value `align="end"` … **NET-NEW (reader 1 MISS-2)** — the only axis contact was a superlative clause praising the value (killed, K-15). **→ KF.W6 + SS-13** (residue row 3)."*⟩ — **carried under `SP-21`**.
- **`MISS-2` ⟨kf-RibbonBar⟩** ⟨`kf-RibbonBar.md:73` — *"**RB-2 (net-new; reader-DU MISS-2) — MINOR · `.text-gold` is an unlayered demo shadow of a LIVE glass utility of the same name, pinning a hand-copied colour** … the demo shadows the CLASS **and** the alias TOKEN … Third instance of the §6.3 flat-namespace hazard, first at the class level. Disposition: **KF.W6** (token-namespace lane; corrects D-8's cell)."*⟩ — **carried under `RB-2`** (W6-D's token-namespace lane, with `RB-5`).
- **`MISS-2` ⟨kf-StartingStyleTarget⟩** ⟨`kf-StartingStyleTarget.md:71` — *"**KF-SST-30 · reader-A MISS-2 (ruling 2)** — **glass-ui 7.0.0's `@utility touch-hit-area` cannot expand a tap target: its expander is `pointer-events: none`** … Kills D-23's prescribed cure; **corrects banked KF-CO-24 and kf-CubeScene MISS-3** (annotation riders per E-3) … → **glass-ui BH relay** (owner edict — the fond) + **KF.W6** (the touch-target family decision inherits the correction)."*⟩ — **carried under `KF-SST-30`**; the producer half rides `G-W6-14`'s relay. **BINDING CITATION: `MISS-2` is THREE rows in THREE records — `⟨kf-SharePopover⟩` → `SP-21` (reader 1) · `⟨kf-RibbonBar⟩` → `RB-2` (reader-DU) · `⟨kf-StartingStyleTarget⟩` → `KF-SST-30` (reader A, ruling 2). None may be cited bare.**
- **`MISS-7`** ⟨`kf-RibbonBar.md:82` — *"**RB-5 (net-new; reader-DU MISS-7) — INFO · `--scale-hover: 1.08` re-declared in the demo's unlayered `:root`** (design-idioms.css:41, "mirrors glass-ui's --scale-hover") — identical value to glass's scale-paper.css today … invisible until a producer retune doesn't arrive. Not reachable from RibbonBar's own markup; recorded for the namespace lane. → **KF.W6** (token lane, with RB-2)."*⟩ — **carried under `RB-5`** (W6-D's `--scale-hover` zero-delta shadow row; the token itself is held at the §Bounds `design-idioms.css` row). **`MISS-7` is the ONE member of this generation absent at BOTH surfaces (0 spec / 0 CARRY) — the `SPF-10` class — and its host `RB-5` is LOAD-BEARING: W6-L's `EH-10` DISCHARGED-BY-TWIN verification rests on `RB-5` being present, so a seat auditing that discharge from the record side held a name that landed nowhere. E-3 addendum owed for `MISS-7` ALONE, declared at the §W6-N tail as (xiv); the other nine are present at the CARRY and owe nothing — the same discrimination the round-4 `ND-7`/`D-C2` correction established.**
```

**Post-repair check to paste with the block** (the only form of this claim that has survived a pass): re-run the loop; expect `≥1` in this spec for all seven names; `MISS-7` still `0` at the CARRY until addendum (xiv) lands.

---

### W6-02 · [D-P6-1 · BLOCKER] — strike the round-5 heading's method-claim and replace it with the loop's output

**Anchor**: `:202` ⟨GREP⟩ `**TRAIL REBUILT BY COMMAND OVER THE 58 RECORDS — EIGHT FURTHER MEMBERS, ADDED AT REPAIR ROUND 5 (RULINGS-5 D-P5-5).**`
**Exact current bytes** (the heading run only; the rest of `:202` is untouched):

```
**TRAIL REBUILT BY COMMAND OVER THE 58 RECORDS — EIGHT FURTHER MEMBERS, ADDED AT REPAIR ROUND 5 (RULINGS-5 D-P5-5).**
```

**Exact replacement bytes:**

```
**EIGHT FURTHER MEMBERS, ADDED AT REPAIR ROUND 5 (RULINGS-5 D-P5-5)** ⟨***DATED CORRECTION, 2026-08-29, PASS-6 D-P6-1 (BLOCKER): the words ~~"TRAIL REBUILT BY COMMAND OVER THE 58 RECORDS"~~ are STRUCK. They were a METHOD CLAIM, not a measurement — the identical fault this same paragraph convicts round 4 of two clauses below — and the pass-6 seat's re-run of the stated loop over all 58 records returned TEN further names resolving nowhere in this spec, four of them from records this cure was already inside. The eight below stand as the round-5 generation; the ten are entered at repair round 6 with their pre-repair zeros pasted. Per LAW G this heading asserts no completeness of its own: the enumeration is the artifact, and the loop's post-repair output beside it is the only proof this block has ever offered that survived a pass.***⟩
```

---

### W6-03 · [D-P6-2 · BLOCKER · act 2 of 6] — the SHADOW line for the "across all fifteen gates" strike

**Anchor**: `:617`, at the END of the line ⟨GREP⟩ `~~across all fifteen gates~~, with their re-execution certified by`
**Current bytes**: the act carries **no SHADOW line**.
**Insert as a new line immediately after `:617`:**

```
  - ***SHADOW (LAW F(1), added at repair round 6 — PASS-6 D-P6-2): struck set = ∅ rows — the round-4 certificate's completeness phrase "across all fifteen gates" is struck; no row, id, routing or grant moves. Minted set = ∅. Re-pointed set = ∅. The four gates the round-4 receipt omitted (`G-W6-6` · `G-W6-7` · `G-W6-11` · `G-W6-12`) are enumerated and measured at the SUBJECT-IDENTITY receipt (`:174`–`:186`). Citing / terminus waves notified = none — the struck phrase was never cited outside this file (`grep -n 'across all fifteen gates' KF-W*.md` is the check, and it returns this file only).***
```

---

### W6-04 · [D-P6-2 · BLOCKER · act 3 of 6] — the SHADOW line for the LAW-C "every" strike at both its sites

**Anchor**: `:627`, at the END of the line ⟨GREP⟩ `this is a stage-1 write; ~~**every**~~ receipt naming KF.W8, KF.W9 or KF.W10`
**Current bytes**: the act carries **no SHADOW line** at either of its two sites (`:12` header, `:627` round-4 discipline block).
**Insert as a new line immediately after `:627`:**

```
***SHADOW (LAW F(1), added at repair round 6 — PASS-6 D-P6-2): struck set = ∅ rows — the word "every" is struck at BOTH its sites, `:12` (the header's live-voice LAW C(3) statement, re-written to the true form with its two exceptions enumerated and sourced) and `:627` (the round-4 discipline block, corrected by dated note and never patched). No row moves, no id is re-keyed, no routing changes. Minted set = ∅. The two declared exceptions are (1) the `KAD-11` PRM row's constraint sentence, sourced to the FROZEN `PASS-4/RULINGS-4.md` §R4-3, and (2) the TransportDock DOCK-CONTRACT row's five-token name-set, this wave's own measurement subject (`:96`). Citing / terminus waves notified = none — no sibling cites this file's LAW C(3) discipline sentence (`grep -ln 'anchor-only by their own declaration' KF-W*.md` returns nothing in the eleven).***
```

---

### W6-05 · [D-P6-2 · BLOCKER · act 4 of 6] — the SHADOW line for the TransportDock "four subsumed names" count strike

**Anchor**: `:96`, at the END of the `TransportDock.vue` §Bounds cell ⟨GREP⟩ `**FIVE tokens under a stated counting rule: four subsumed row-NAMES plus one predicate word`
**Current bytes**: the act carries **no SHADOW line**.
**Append to the end of `:96`'s cell, inside the same table cell, before the closing `|`:**

```
 **SHADOW (LAW F(1), added at repair round 6 — PASS-6 D-P6-2): struck set = ∅ rows — the numeral "four" is struck as the token count of this cell's name-set and replaced by FIVE under a stated counting rule; no row, id, grant, carve extent or routing moves, and the `--dock-margin` sites `:389`/`:395` are untouched. Re-classified set = {the five-token name-set `CH2-02` · `BG-5` · `GU-1` · `GU-2` · `subject-legible`}, moved from "a quotation of a sibling's prose" to THIS WAVE'S OWN MEASUREMENT SUBJECT (0 files of 58, re-run at the registry's current bytes). Citing / terminus waves notified = KF.W10 (§3.1 `.a`, the FOLD-FORWARD §B discharge table row `§B-3`) — anchor-only, and re-cut at `:560` in the same round-6 edit so both live cells of this file classify the set identically (PASS-6 D-P6-3).**
```

---

### W6-06 · [D-P6-2 · BLOCKER · act 5 of 6] — the SHADOW line for the census-citation re-point at both citing paragraphs

**Anchor**: `:35`, at the END of the routed-census paragraph ⟨GREP⟩ `RE-POINTED AT REPAIR ROUND 4 (the D-P4-8 diff, discharged by citation rather than by a fresh assertion here)`
**Current bytes**: the act carries **no SHADOW line**.
**Insert as a new line immediately after `:35`:**

```
***SHADOW (LAW F(1), added at repair round 6 — PASS-6 D-P6-2): re-pointed set = {the freshest-conformance-census citation, at BOTH of its citing paragraphs — `:7` (the Row-bank-of-record block) and `:35` (the routed-census paragraph)}; struck set = ∅ rows; minted set = ∅. A citation re-point carries no row and moves no routing. The artifact of record moves PASS-5 → PASS-6 at repair round 6 (`PASS-6/KF-W6-CHECK.md`, 427 routed / 417 booked / 10 escaped / 54 contributing records, DEFECTIVE at 2 BLOCKER · 3 MAJOR · 2 MINOR); the superseded PASS-3/PASS-4/PASS-5 readings survive only where explicitly dated as history and are never re-pointed. Citing / terminus waves notified = none — no sibling cites this file's census figure (`grep -ln '433 routed\|427 routed' KF-W*.md` returns this file only).***
```

---

### W6-07 · [D-P6-2 · BLOCKER · act 6 of 6] — the SHADOW line for the `SequenceTarget.vue` grant widening

**Anchor**: `:110`, at the END of the sequence modify-carve cell ⟨GREP⟩ `**CARVE EXTENT, stated so it cannot widen: the class-attribute line `:31` alone`
**Current bytes**: the act carries **no SHADOW line** — and `KF-W8.md` wrote two `widened set =` lines for exactly this act class in the same round.
**Append to the end of `:110`'s cell, inside the same table cell, before the closing `|`:**

```
 **SHADOW (LAW F(1), added at repair round 6 — PASS-6 D-P6-2, on KF-W8's `widened set =` idiom): widened set = {`demo/scenes/sequence/SequenceTarget.vue` (252 L at `81a56990`), for line `:31` ALONE — the `.btn-interactive` class-attribute occurrence, site 5 of the 8-site sweep W6-D books whole}; struck set = ∅ rows; minted set = ∅ — no id, no gate, no row, no routing. The grant was the only missing half: the routing was already present at both ends (`kf-SequenceTarget.md:45`'s fold to `kf-ControlsPaneWrapper D-M11` + `kf-CubeScene D-11`, and W6-D's fold row's identity chain). Every other `SequenceTarget.vue` row — register, structure, behaviour — is untouched and unowned here. Citing / terminus waves notified = KF.W7 (the `KF-AV-28` governed-surface rider already binds `SequenceScrubber.vue` on this same row; the widening touches no governed row) — anchor-only.**
```

---

### W6-08 · [D-P6-2 · BLOCKER · LAW G instance 1] — re-word `:10`'s false universal to the enumerated form

**Anchor**: `:10` ⟨GREP⟩ `**LAW F honoured**: every act below that strikes, restores, re-scopes or re-points carries its **SHADOW line in the same edit**.`
**Exact current bytes:**

```
**LAW F honoured**: every act below that strikes, restores, re-scopes or re-points carries its **SHADOW line in the same edit**.
```

**Exact replacement bytes:**

```
**LAW F(1), stated by ENUMERATION and not by universal (LAW G, round 6 — the round-5 spelling ~~"every act below … carries its SHADOW line in the same edit"~~ is STRUCK: it was false by count in this file's own bytes, one SHADOW form at `:456` against six acts in the round's own ledger at `:643`, and the certifying instrument counted the token `SHADOW` rather than the form)**: **SIX acts carry a LAW F(1) verb in this file, and all six now carry an at-the-act SHADOW line** — (1) the MOOT-ON-DELETE premise strike + the `EH-4`/`EH-5`/`EH-8` restoration ⟨`:456`, the law's first entry, round 5⟩ · (2) the round-4 certificate's *"across all fifteen gates"* strike ⟨`:617`⟩ · (3) the LAW-C *"every"* strike at both its sites ⟨`:12` + `:627`⟩ · (4) the TransportDock cell's *"four subsumed names"* count strike ⟨`:96`⟩ · (5) the census-citation re-point at both citing paragraphs ⟨`:7` + `:35`⟩ · (6) the `SequenceTarget.vue` grant widening for `:31` ⟨`:110`⟩. **The verification pattern is the FORM, never the token**: `grep -noE 'SHADOW \(LAW F\(1\)' KF-W6.md` must return six lines; `grep -c 'SHADOW'` counts mentions and cannot verify this law.
```

---

### W6-09 · [D-P6-3 · MAJOR] — re-cut `:560`'s → KF.W10 cross-edge to `:96`'s classification

**Anchor**: `:560` ⟨GREP⟩ `whose **four subsumed names** this end carries **as a quotation and not as banked ids**`
**Exact current bytes:**

```
whose **four subsumed names** this end carries **as a quotation and not as banked ids**
```

**Exact replacement bytes:**

```
whose **five-token name-set** this end carries **as THIS WAVE'S OWN MEASUREMENT SUBJECT, not as a quotation of a sibling's prose** (the classification and its counting rule — four subsumed row-NAMES plus one predicate word — are stated at the §Bounds `TransportDock.vue` row; ⟨***DATED CORRECTION, 2026-08-29, PASS-6 D-P6-3: the round-5 reclassification landed at `:96` and not here, so at round-5 final bytes this file said of one set, in two live cells, that it was and was not a quotation. The round-5 SHADOW ledger at `:643` listed "the TransportDock cell's 'four subsumed names' count" among the round's STRUCK items while the phrase was still live at this cell — a ledger entry that did not match the bytes. Both cells now carry one classification and one counting rule.***⟩)
```

---

### W6-10 · [D-P6-4 · MAJOR] — LAW-A census A-5's arithmetic, stated as measured

**Anchor**: `:132` ⟨GREP⟩ `The other six (`src/animation/engine/play-lifecycle/{frame,index,strategies}.ts`, `src/animation/orchestration/sequence/{lifecycle,sequence}.ts`) plus `
**Exact current bytes:**

```
The other six (`src/animation/engine/play-lifecycle/{frame,index,strategies}.ts`, `src/animation/orchestration/sequence/{lifecycle,sequence}.ts`) plus `test/orchestration/sequence-transport.test.ts:6`.
```

**Exact replacement bytes** (old→new: `1 + 6 + 1 = 8 ≠ 9` → `1 + 7 + 1 = 9`):

```
**COUNTING RULE, stated AT the receipt (R5-11(1)): one unit = one matching LINE, never one file — the same rule this receipt uses for `focus-ring` 11 / 7.** The composition, re-run at `origin/master 81a56990`: **1 demo line** (`demo/components/instrument/index.ts:24`) **+ 7 src LINES across 5 files** (`src/animation/engine/play-lifecycle/{frame,index,strategies}.ts` one line each; `src/animation/orchestration/sequence/lifecycle.ts` one line; `src/animation/orchestration/sequence/sequence.ts` **THREE lines**, `:69`/`:74`/`:77`) **+ 1 test line** (`test/orchestration/sequence-transport.test.ts:6`) **= 9**. ⟨***DATED CORRECTION, 2026-08-29, PASS-6 D-P6-4: the round-4/5 spelling ~~"The other six"~~ is STRUCK — it closed to 8 under the line rule and to 5 under a file rule, and the receipt's own printed total is 9. The SET was never wrong (the R3-4 same-basename trap is correctly identified and excluded); the composition was.***⟩
```

---

### W6-11 · [D-P6-4 companion · MINOR] — LAW-A census A-1's unstated counting rule

**Anchor**: `:128` ⟨GREP⟩ `three further hits are docs prose (`docs/tranches/U/audit/lane-20`
**Exact current bytes:**

```
three further hits are docs prose
```

**Exact replacement bytes** (old→new: `three` under no stated rule → `4 lines / 3 files`, rule stated):

```
four further hits are docs prose across three files (**counting rule, at the receipt: one unit = one matching LINE, the same rule this census uses for its consumer set; the round-5 spelling ~~"three"~~ was true under a FILE rule and false under the LINE rule the same paragraph applies one clause away, and no rule was stated — PASS-6 D-P6-4, dated 2026-08-29**)
```

---

### W6-12 · [D-P6-5 · MAJOR] — `G-W6-10`'s witness symbol re-quoted so it produces its own figure

**Anchor**: `:524` ⟨GREP⟩ `**"THE ONE WRITER" = 5 sites / 3 files**`
**Exact current bytes:**

```
**"THE ONE WRITER" = 5 sites / 3 files**
```

**Exact replacement bytes** (old→new: unmatchable symbol at 5/3 → matchable symbol at 5/3; the fifth coordinate `useSceneMachineRouterBinding.ts:10` reads `//   • ONE WRITER  — watch(machine.activeScene) → router.push`, **without the article**):

```
**`ONE WRITER` = 5 sites / 3 files** ⟨***CORRECTED BY MEASUREMENT, 2026-08-29, PASS-6 D-P6-5 (LAW D): the round-5 quoted symbol ~~"THE ONE WRITER"~~ greps to **4 sites / 3 files** at `origin/master 81a56990` over `demo/` — `useSceneMachineRouterBinding.ts:10` reads `ONE WRITER` without the article and does not contain the string the cell quoted. The article-less spelling returns 5 / 3 and covers all five coordinates. This is the `G-W6-12` `light:true` → `light: true` class one gate row over, inside the SUBJECT-IDENTITY receipt; the gate's SUBSTANCE is unaffected — there ARE N writers, as CC-L-18 says.***⟩
```

---

### W6-13 · [D-P6-5 · MAJOR, second site] — the same symbol at the SUBJECT-IDENTITY enumeration

**Anchor**: `:184` ⟨GREP⟩ `G-W6-10 `SpringSidebar` / `contractAnim` / "THE ONE WRITER"`
**Exact current bytes:**

```
G-W6-10 `SpringSidebar` / `contractAnim` / "THE ONE WRITER"
```

**Exact replacement bytes:**

```
G-W6-10 `SpringSidebar` / `contractAnim` / `ONE WRITER` (article-less — corrected by measurement at repair round 6, PASS-6 D-P6-5; the quoted form with the article greps 4 / 3)
```

---

### W6-14 · [D-P6-6 · MINOR] — `G-W6-9`'s `ToggleGroupItem` coordinate `:64`

**Anchor**: `:523` ⟨GREP⟩ `with `ToggleGroupItem` at `:56`/`:63`/`:64`, import `@mkbabb/glass-ui/toggle-group` at `:139``
**Exact current bytes:**

```
with `ToggleGroupItem` at `:56`/`:63`/`:64`, import `@mkbabb/glass-ui/toggle-group` at `:139`
```

**Exact replacement bytes** (old→new: three `ToggleGroupItem` coordinates → two, with `:64` re-attributed to its true owner; re-read at `81a56990`: `:56` `<ToggleGroupItem`, `:63` `</ToggleGroupItem>`, `:64` `</ToggleGroup>`):

```
with `ToggleGroupItem` at `:56`/`:63` and the PARENT's closing tag `</ToggleGroup>` at `:64` (⟨***coordinate corrected by measurement, 2026-08-29, PASS-6 D-P6-6: the round-5 cell attributed `:64` to `ToggleGroupItem`; it is `</ToggleGroup>`. The mount at `:50` and the import at `:139` are exact and unchanged.***⟩), import `@mkbabb/glass-ui/toggle-group` at `:139`
```

---

### W6-15 · [D-P6-7 · MINOR, citing paragraph 1 of 2] — re-point the census citation at `:7`

**Anchor**: `:7` ⟨GREP⟩ `the freshest conformance census is now **`docs/tranches/X/keyframes/conformance/PASS-5/KF-W6-CHECK.md` (2026-08-28)`
**Exact current bytes** (the artifact + figures run only):

```
the freshest conformance census is now **`docs/tranches/X/keyframes/conformance/PASS-5/KF-W6-CHECK.md` (2026-08-28) — RE-POINTED AT REPAIR ROUND 5, as this paragraph's own closing rule requires** — which re-enumerated by record at its own clock and measured **433 routed units / 422 booked / 11 escaped / 54 contributing records**, recording this spec DEFECTIVE at **1 BLOCKER · 4 MAJOR · 3 MINOR**
```

**Exact replacement bytes** (old→new: `PASS-5` → `PASS-6`; `433 / 422 / 11 / 54` → `427 / 417 / 10 / 54`; `1 BLOCKER · 4 MAJOR · 3 MINOR` → `2 BLOCKER · 3 MAJOR · 2 MINOR`):

```
the freshest conformance census is now **`docs/tranches/X/keyframes/conformance/PASS-6/KF-W6-CHECK.md` (2026-08-29) — RE-POINTED AT REPAIR ROUND 6, as this paragraph's own closing rule requires** — which re-enumerated by record at its own clock and measured **427 routed units / 417 booked / 10 escaped / 54 contributing records**, recording this spec DEFECTIVE at **2 BLOCKER · 3 MAJOR · 2 MINOR** (the −6 on the denominator is METHOD and fully attributed at that artifact's §1.1 — the disposition-marker rule for bullet rows, `kf-RibbonBar.md:64` the worked example; all eleven PASS-5 escapes were re-verified CURED there and the ten at that clock are a DISJOINT set)
```

---

### W6-16 · [D-P6-7 · MINOR, citing paragraph 2 of 2] — re-point the census citation at `:35`

**Anchor**: `:35` ⟨GREP⟩ `RE-POINTED AT REPAIR ROUND 4 (the D-P4-8 diff, discharged by citation rather than by a fresh assertion here)`
**Insert immediately after that parenthetical, inside the same sentence:**

```
 ⟨***RE-POINTED AGAIN AT REPAIR ROUND 6, 2026-08-29, PASS-6 D-P6-7 — the artifact of record for this paragraph's figures is now `PASS-6/KF-W6-CHECK.md` §1.2/§1.3: **427 routed / 417 booked / 10 escaped / 54 contributing records**, against PASS-5's 433 / 422 / 11 / 54 and PASS-4's 431 / 426 / 5 / 54. The diff is stated as that artifact states it — **−6 METHOD, fully attributed to the disposition-marker rule** — and no figure is re-asserted in this spec's voice. This is the second of the TWO citing paragraphs the round-6 re-point covers; the first is `:7`.***⟩
```

---

### W6-17 · [KF-W8 D-2 · HIGH — the R5-6(3) reciprocal, never commissioned, landed at its ruled owner]

**Anchor**: `:558` ⟨GREP⟩ `Anchor-only per LAW C(3) — that seat writes later this round.`
**Exact current bytes** (the → KF.W8 cross-edge's ordering clause, still speaking round-4's repair-round order — the exact sentence PASS-5 D-4 convicted):

```
Anchor-only per LAW C(3) — that seat writes later this round.
```

**Exact replacement bytes** (this is the third of R5-6's three ways; RULINGS-5 §END's KF-W6 row listed seven directives — R5-1 · D-P5-2 · D-P5-3 · D-P5-4 · D-P5-5 · D-P5-6 · D-P5-7/8 — and **R5-6(3) was not among them**, which is why the sibling's *"applied whole, three ways"* was false at these bytes):

```
Anchor-only per LAW C(3) — that seat writes later this round. **G7-FACTS RECIPROCAL, LANDED AT REPAIR ROUND 6 (RULINGS-5 R5-6(3), never commissioned at §END and therefore never landed — PASS-6 KF-W8 D-2, HIGH; the phantom-reciprocal class R-1 names by id, manufactured by the rulings artifact's own drafting rather than by either seat). THE EXECUTION ORDER OF THE WAVES, stated in this file's own voice as the ruling assigns it: KF.W6's `shell/index.ts` barrel-line strike lands FIRST, inside the R4-1 ONE ATOMIC COMMIT (delete `EditorHeader.vue` + strike barrel line `shell/index.ts:2` + strike the `layout.css:15` orphan token); KF.W8 §Gates G7 MEASURES THE RESULT AFTERWARD and performs no barrel edit of its own (inbound-dependency, R4-5(c): this wave is the barrel's ONE write owner). This is an ordering of the WAVES' execution, not of the repair round's writes — the discrimination PASS-5 D-4 convicted this cell for collapsing.**
```

---

## BATCH-CERT — the round-6 certificate's errata + the KF-W1 / KF-W9 / KF-W10 numeral cells (34 edits)

**The instrument of record for this batch is a NEW file**: `docs/tranches/X/keyframes/conformance/PASS-6/CLOSE-CERT-6.md`. `PASS-5/CLOSE-CERT-2.md` is a prior-pass artifact and is **immutable under E-3** — every correction it is owed lives forward, here, as a dated erratum row naming the cert's §, the printed value and the true value. **The file's bare name is `CLOSE-CERT-6`, round-numbered**, which also ends the `CLOSE-CERT-2` / `CLOSE-CERT-5` dual-spelling that PASS-6 W1 D6-3 and D6-8 both convict.

### §ERRATA — eleven rows to insert into `PASS-6/CLOSE-CERT-6.md`

Each row is a complete insert; none edits PASS-5.

---

#### C-01 · [U6-A(a) · HIGH — folds W1 D6-4] — §6.1's write-order table re-derived from ELEVEN true per-wave clocks

**Target**: `PASS-6/CLOSE-CERT-6.md` §ERRATA row 1.
**The cert's printed bytes** (`PASS-5/CLOSE-CERT-2.md:204`, quoted, never edited):

```
The per-wave round-5 write order, from the pass's own clocks, was **W0 18:49:33 → W4 18:50:12 → W3 18:50:14 → W6 18:52:46 → W2 18:54:59 → W5 18:55:46 → W8 19:11:06 → W9 19:17:10 → W1/W7 19:28 (predecessor reconcile) → W10 19:30:41**. **LAW C's stage order held**: every stage-1 spec wrote before every stage-2 spec, W0 first, W10 last of the per-wave seats.
```

**Why it fails an independent read** (third consecutive round): **nine** entries for **eleven** specs; `W1/W7 19:28` and `W10 19:30:41` are the **predecessor reconcile pass's** insertion clocks, which the cert's own §3 attributes to that pass by name — so the table carries **no per-wave write clock for W1, W7 or W10**, the three specs whose round-5 seats each wrote a full repair section. As printed, stage-1 **W1 at 19:28** sits after stage-2 **W8 19:11:06** and **W9 19:17:10**, so the sentence offered as proof of the stage order is not derivable from the table offered as its proof.

**THE TRUE CLOCKS, derived at this seat from the round-5 authoring journal** (`.../subagents/workflows/wf_3c41968c-46d/*.jsonl`, each spec's per-wave repair agent, last `Edit`/`Write` on that spec; journal timestamps are UTC and are converted at **UTC−4 = local EDT** — the conversion is verified against the cert's own two known values, the predecessor pass's `2026-08-28T23:28:44Z → 19:28:45` at W7 and `T23:30:41Z → 19:30:41` at W10, both exact):

| spec | per-wave round-5 repair agent | first write | **last write (the clock)** | cert §6.1 printed |
|---|---|---|---|---|
| KF-W0 | `agent-a344937d090479e02` | 18:41:38 | **18:49:33** | 18:49:33 ✓ |
| KF-W4 | `agent-af6ecab24299082e` | 18:43:48 | **18:50:12** | 18:50:12 ✓ |
| KF-W3 | `agent-a1b7071ef76bc5662` | 18:43:17 | **18:50:14** | 18:50:14 ✓ |
| KF-W6 | `agent-af7d9314fc0222f5` | 18:43:16 | **18:52:46** | 18:52:46 ✓ |
| KF-W2 | `agent-a51eff1c2fe01499` | 18:42:21 | **18:54:59** | 18:54:59 ✓ |
| KF-W5 | `agent-ac42f60bd4da51ad` | 18:43:20 | **18:55:45** | 18:55:46 ✗ (+1 s) |
| **KF-W1** | `agent-ac933533a9cf0b44` | 18:44:53 | **18:56:54** | *"W1/W7 19:28 (predecessor reconcile)"* ✗ |
| **KF-W9** | `agent-a0345a462ad3b4195` | 19:01:10 | **19:05:06** | 19:17:10 ✗ |
| KF-W8 | `agent-aa80c27a28235321` | 19:01:41 | **19:11:06** | 19:11:06 ✓ |
| **KF-W7** | `agent-aa9e3db91efd7dffe` | 19:01:26 | **19:11:33** | *"W1/W7 19:28 (predecessor reconcile)"* ✗ |
| **KF-W10** | `agent-a06bdc5f869bc68a3` | 19:02:24 | **19:13:55** | 19:30:41 ✗ |

**KF-W1's true clock is independently corroborated in the tree**: `KF-W1.md:60` dates its own round-5 write at **18:56:54**, which the journal reproduces to the second.

**Exact erratum row to insert:**

```
| **E-1 · §6.1 (`:204`) — THE WRITE-ORDER TABLE, RE-DERIVED AT ELEVEN** | `CLOSE-CERT-2.md:204` printed NINE entries for ELEVEN specs and substituted the predecessor-reconcile pass's insertion clocks at three (W1, W7, W10), leaving those three specs with no per-wave write clock and placing stage-1 W1 after stage-2 W8/W9 under a sentence certifying the stage order. **The eleven true per-wave clocks, derived from the round-5 authoring journal (per-spec repair agent, last write; UTC→EDT at −4, the conversion verified against the cert's own 19:28:45 / 19:30:41 predecessor values): W0 18:49:33 → W4 18:50:12 → W3 18:50:14 → W6 18:52:46 → W2 18:54:59 → W5 18:55:45 → W1 18:56:54 → W9 19:05:06 → W8 19:11:06 → W7 19:11:33 → W10 19:13:55.** Under the true clocks the certified sentence is TRUE AND DERIVABLE for the first time: every stage-1 spec (W0·W1·W2·W3·W4·W5·W6, all ≤ 18:56:54) wrote before every stage-2 spec (W7·W8·W9·W10, all ≥ 19:05:06); W0 is first; **W10 at 19:13:55 is last of the per-wave seats**. Two of the cert's printed figures are corrected in the same motion: **W5 18:55:46 → 18:55:45** (one second, transcription) and **W9 19:17:10 → 19:05:06** (the journal shows the W9 per-wave agent's last write at 19:05:06; if a later touch is claimed for W9 it must be produced as a command's output, per LAW G). The predecessor-reconcile insertions — W1 19:28:19, W7 19:28:45, W10 19:30:41 — are a SEPARATE pass and are recorded as such, never as per-wave clocks. **E-3: `PASS-5/CLOSE-CERT-2.md` is not edited; this row is the correction of record.** |
```

---

#### C-02 · [U6-A(b) · HIGH — folds W9 D6-2] — §7.2's col B struck; the LAW E(4) demonstration re-grounded

**The cert's printed claim** (`PASS-5/CLOSE-CERT-2.md` §7.2): it re-tables W9's three-column anchor table and concludes *"**5 of 6 OFFSETS MOVED AGAIN between col B and col C** … **That is the drift class demonstrated a third time in one round, and it is the entire argument for LAW E(4)**"*.

**Why it fails**: col B was **copied from `KF-W9.md` and never re-derived**. `KF-W10.md` has exactly **two** reconstructible round-5 states — the LAW E(3)-pinned opening baseline (209,923 B) and its round-5 written state (identical at the staged commit `fffb9685`, 248,443 B, and at final bytes). **col B is neither**, at four of six cells:

| anchor | col A ⟨LAW E(3) baseline⟩ | **col B ⟨as printed⟩** | col C ⟨true written state = staged = final⟩ | delta B→C |
|---|--:|--:|--:|--:|
| A1 §State | :20 | **:22** | :22 | 0 ✅ |
| A2 OP-4 | :66 | **:68** | :68 | 0 ✅ |
| A3 PACKET-FIRST | :485 | **:503** | **:513** | **−10 ❌** |
| A4 §D cross-edge | :519 | **:537** | **:547** | **−10 ❌** |
| A5 §B-1 | :182 | **:198** | **:206** | **−8 ❌** |
| A6 §B-3 | :184 | **:200** | **:197** | **+3 ❌** |

**And the two instruments cannot both be true**: under §6.1's certified order (as printed OR as corrected at `C-01`), `KF-W10.md` stood at its 209,923-byte baseline when W9 wrote, so col B could only have reproduced **col A** — which it does at none of six, while matching the *later* state at two.

**Exact erratum row to insert:**

```
| **E-2 · §7.2 — COL B STRUCK; THE LAW E(4) DEMONSTRATION RE-GROUNDED ON COL A ↔ COL C** | §7.2 re-tabled `KF-W9.md`'s col B without re-deriving it and named it *"the entire argument for LAW E(4)"*. Col B describes **no state of `KF-W10.md` at any clock in round 5**: A3 −10 · A4 −10 · A5 −8 · A6 +3 against the file's only two reconstructible states. Col C is correct and reproduces exactly at final bytes (`:22 :68 :513 :547 :206 :197`). **The drift class survives the strike and is demonstrated on the two MEASURED columns alone: A ⟨209,923 B baseline⟩ = `:20 :66 :485 :519 :182 :184` → C ⟨final⟩ = `:22 :68 :513 :547 :206 :197` — SIX of six offsets moved, +2/+2/+28/+28/+24/+13.** That is a stronger demonstration than the one struck, and it is measured. **Compounding, recorded here because it is the same block**: three of the six commands the block pastes are multi-line and were printed as single numerals — at col B's claimed state `grep -n 'OP-4' KF-W10.md` returns 5 lines, `grep -n 'PACKET-FIRST'` 4, `grep -n 'CH2-02'` 4, printed as `→ :68`, `→ :503`, `→ :200`. **A numeral that rides must be its command's WHOLE output (LAW D(3)).** The seam itself is sound: all six anchors resolve and all six quoted passages are byte-exact at their true lines. |
```

---

#### C-03 · [U6-B · MAJOR — folds W0 D-3 + W10 D-6] — §9's OPENING hash column, false at 2 of 11 rows

**The cert's printed claim** (§9): the opening column is *"quoted from `RULINGS-5` LAW E(3)'s hash-bracketed table (an immutable frozen source, not a per-seat stamp)."*

| row | LAW E(3)'s true opening digest | true last four | §9 prints | verdict |
|---|---|---|---|:--:|
| `KF-W6.md` | `83509bf9…c2636d7af0a11e` | **`a11e`** | `83509bf9…**0a11**` | ✗ off-by-one slice — `0a11` is a substring but not the tail |
| `KF-W8.md` | `126426de…be090429273e2` | **`73e2`** | `126426de…**3b62**` | ✗ **`3b62` appears nowhere in the digest** |

The other nine openings verify head-and-tail exactly, and **all eleven CLOSING hashes are exact** — the gate LAW E(2) hands the pass-6 seat turns on the closing column, four independent seats re-ran it, and the round's close and banking are untouched.

**Exact erratum row to insert:**

```
| **E-3 · §9 — OPENING-COLUMN CORRECTION (two rows)** | §9's opening column, declared quoted from the FROZEN `RULINGS-5` LAW E(3) table, misquotes it at two of eleven rows: **`KF-W6.md` printed `…0a11`, true tail `a11e`** (an off-by-one slice of the true digest) and **`KF-W8.md` printed `…3b62`, four characters that appear NOWHERE in `126426de…be090429273e2`, true tail `73e2`**. Attribution: **abbreviation transcribed by hand, not measurement** — the underlying digests are right, and the §9 verdict *"All eleven moved — every spec took repair this round"* is TRUE and survives independently of how the openings are abbreviated. **The closing column is exact at all eleven rows and is the arm LAW E(2) arms; the gate, the round's close and the banking of the round-5 repairs are unaffected.** **LAW E(3) gains one clause, effective this round: an abbreviated digest is produced by `cut -c1-8` and `rev \| cut -c1-4 \| rev` over the pasted full value, and is never transcribed by hand.** A hash digest is the one figure in the program that cannot be approximately right. |
```

---

#### C-04 · [W1 D6-3 · MAJOR] — the cert's 73-vs-70 self-contradiction on its own headline census

**Printed at two places in one instrument**: the head (`:7`) states the path spelling `PASS-5/CLOSE-CERT-2.md` resolves at **73 sites**; §4 R5-R6's pasted transcript prints `grep -oh 'PASS-5/CLOSE-CERT-2\.md' waves/KF-W*.md | wc -l` → **70**.

**Measured at this seat over the hash-locked bytes**: **73** — per file W0 3 · W1 27 · W2 5 · W3 1 · W4 4 · W5 1 · W6 5 · W7 2 · W8 8 · W9 8 · W10 9 = **73**. The other three lines of that transcript reproduce exactly (`PASS-5/CLOSE-CERT.md` → 0 before-and-after; `PASS-4/CLOSE-CERT.md` → 53 untouched). **This cannot be drift**: §9's hash table, re-verified 11/11, proves no spec moved after the certificate.

**Exact erratum row to insert:**

```
| **E-4 · §4 R5-R6 — THE 70 IS SUPERSEDED BY THE CERT'S OWN HEAD AND BY THE BYTES: 73** | The certificate's head (`:7`) and its §4 R5-R6 transcript print two figures for one quantity over bytes the certificate itself hash-sealed. Re-run at this seat, the identical command over the identical bytes: **`grep -oh 'PASS-5/CLOSE-CERT-2\.md' waves/KF-W*.md \| wc -l` → 73**, decomposing per file as **W0 3 · W1 27 · W2 5 · W3 1 · W4 4 · W5 1 · W6 5 · W7 2 · W8 8 · W9 8 · W10 9**. The head's 73 is correct; the transcript's 70 is a pre-final-pass reading re-issued under an "after" label. **The cure banks: the dead path `PASS-5/CLOSE-CERT.md` measures 0 in all eleven, verified independently.** The count was UNDER-stated, never over-stated. |
```

---

#### C-05 · [W1 D6-8 · INFO] — the bare-name census stated as "63 sites"; it is 64 occurrences / 37 lines

```
| **E-5 · §head + §4 R5-R6 — THE BARE-NAME CENSUS, WITH ITS COUNTING RULE** | Both sites read *"The bare-name spelling `CLOSE-CERT-5` (**63 sites**)"*. Measured over the hash-locked bytes: `grep -oh 'CLOSE-CERT-5' waves/KF-W*.md \| wc -l` → **64 occurrences**; `grep -c` summed per file → **37 lines**. **Neither reading yields 63, and the word "sites" names neither.** Nothing rides it — the bare name is declared a round-name and not a path, and resolves for every reader regardless of cardinality — but it is D6-3's shape in the same document: a census figure stated without its counting rule at an instrument whose whole authority is that its figures reproduce. **Corrected form: `CLOSE-CERT-5` — 64 occurrences on 37 lines across the eleven specs; counting rule: one unit = one OCCURRENCE.** The dual spelling itself ends this round: the round-6 instrument's bare name and file name are both `CLOSE-CERT-6`. |
```

---

#### C-06 · [W10 D-2 · MAJOR] — §7.6's LAW F(2) terminus re-sweep, actually performed, row by row

**The cert's printed claim** (§7.6, *"The R5-1 BLOCKER chain, verified end-to-end (LAW F(2): every terminus re-swept)"*) closes: *"**Every named terminus and every citing sibling re-swept; nothing of the restoration is stranded.**"*

**Why it fails**: **one** leg was verified — KF.W6 → KF.W10 (`G-2`, `:411`). The section's own preceding sentence records that it read `KF-W0.md` §Excluded *"with the family's routing enumerable and its arithmetic stated (`3 + 2 + 6 + 4 = 16 ✔`)"* — **it read the arithmetic and did not follow the `6` to its named terminus.** `grep -on 'EH-[0-9]*' CLOSE-CERT-2.md` returns EH-4/EH-5/EH-8 only, at one line: thirteen of the sixteen members of the family the cert certifies as unstranded were never handled. **The law was written from the `C-14` miss and reproduced the `C-14` miss on its first execution, one sibling over.**

**Exact erratum row to insert — the sweep performed, all sixteen members, row by row:**

```
| **E-6 · §7.6 — THE LAW F(2) TERMINUS RE-SWEEP, PERFORMED AND PRINTED (16 of 16)** | §7.6's *"every terminus and every citing sibling re-swept"* was a SINGULAR sweep wearing a universal (LAW G). The sweep, executed here over `KF-W0.md`'s own `3 + 2 + 6 + 4 = 16` partition: **(a) RESTORED LIVE — 3: `EH-4` ⟨EditorShell.vue:45 + MbabbMenu.vue:20⟩ · `EH-5` ⟨:46⟩ · `EH-8` ⟨the shell ribbon cluster :20/:32-40/:36/:44-47⟩ — terminus KF.W6, BOOKED (occurrence counts 18/20/17; three rows, three anchors, all in surviving §Bounds files; frontier anchors byte-exact at `81a56990` at four seats). (b) DISCHARGED-BY-TWIN — 2: `EH-9 ≡ SP-10` ⟨W6-J⟩ · `EH-10 ≡ RB-5` ⟨W6-D⟩ — carriers verified by command at KF-W6's bytes, BOOKED. (c) NO-WAVE-OWNER UNDER G-2's TERMINAL SWEEP — 6: `EH-2` ⟨kf-EditorHeader.md:41⟩ · `EH-3` ⟨:42⟩ · `EH-12` ⟨:51⟩ · `EH-13` ⟨:52⟩ · `EH-14` ⟨:53⟩ · `EH-15` ⟨:54⟩ — terminus KF.W10 §E `NWO-TERMINAL-SWEEP` G-2, named by `KF-W0.md:743`'s own SHADOW line — **NOT BOOKED AT THE TERMINUS: `grep -oE 'EH-[0-9]+' KF-W10.md` returns EH-1/EH-4/EH-5/EH-8 only. THIS IS THE ROUND'S HARD ESCAPE 2, and this cell is where the round-5 cert should have caught it.** Landed at edit `C-28`. (d) MOOT-ON-DELETE, FORK-HOSTED — 5: the record's own residue register at `kf-EditorHeader.md:106` item 5 (L-M1 · D-11 · D-6/D-14 · D-22 · D-9), correctly moot and adopted from the record rather than composed. **16 of 16 accounted, 15 booked, 1 escaped-and-now-landed.** LAW F(2) gains its enforcement clause: **the sweep's output is diffed row-by-row against the roster it claims to satisfy, and the diff is printed** — summarising an output is the conviction (U6-D). |
```

---

#### C-07 · [W3 D-4 · MAJOR + U6-C members] — §5's class-retirement certification, replaced by an ENUMERATED sweep

**The cert's printed claim** (§5): *"**16 of 16 disposed. The class is retired**: per-seat substrate stamping ends with this round (LAW E(4)), and **these are its terminal members**."*

**Measured at final bytes**: `grep -lE '\b1[5-9]:[0-5][0-9]:[0-5][0-9]\b' waves/KF-W*.md` → **7 of 11 specs still carry the class** — `KF-W1.md` · `KF-W2.md` · `KF-W5.md` · `KF-W7.md` · `KF-W8.md` · `KF-W9.md` · `KF-W10.md`.

**Exact erratum row to insert — the per-file enumeration, and the one proven cure form:**

```
| **E-7 · §5 — THE LAW E(4) RETIREMENT IS A SWEEP WITH AN ENUMERATION, NOT A CERTIFICATION OF A SAMPLE** | §5 certified the class retired with *"these are its terminal members"*; at final bytes the class is alive in **7 of 11 specs**, enumerated per file with its owning edit: **`KF-W7.md`** — the BACKWARD receipt block `:343` carrying four stale sibling mtimes (`17:02:55` · `16:59:44` · `16:55:55` · `16:59:25`/`10:49:45`) and four false coordinates, under the words *"Verified this round"* → edit `T7-03`. **`KF-W8.md`** — twenty per-seat stamps in the body (`16:55:55` ×10 · `16:59:25` ×5 · `15:39:04` ×4 · `15:51:10` ×1 · `17:02:55` ×2 · `16:58:59`/`16:56:52`/`16:59:44`), **eight of them asserting *"final stage-1 bytes"*** of substrates that have moved twice → edit `T8-04`. **`KF-W10.md`** — the ten-row per-seat substrate table at `:140-146`, every row at a round-4 clock, the `KF-W1.md` row labelled ***"1 (final)"*** of bytes superseded twice, plus a second stamp at the §6.D minting-citation block `:581` → edit `C-33`; and the INBOUND row-2 cell `:529` carrying a sibling mtime **and** two sibling figures → edit `C-34`. **`KF-W5.md`** — seven live sibling clocks (`16:59:44` · `16:59:25` · `16:58:59` · `17:17:02` in the ⟨RECONCILE SEAT⟩ block; `14:06` · `14:22` · `15:32` at §Excluded), under a probe-free negative universal → edit `T5-03`. **`KF-W2.md`** — the retained stamp at `:23` (*"substrate `KF-W3.md`, mtime 2026-08-28 15:43:45"*) plus three round-4 *"FINAL BYTES"* cells → edit `T2-12`. **`KF-W9.md`** — the S-10 block's twelve sibling line numbers and six quoted sibling passages → edits `C-19`/`C-20`. **`KF-W1.md`** — §13's table already struck AS AUTHORITY and preserved as record; **this is the ONE spec that executed LAW E(4) and its form is the proven cure** — struck label + dated-record preservation + stamp authority re-pointed to the certificate, exactly as `KF-W8.md:24` does at its ledger header. **ZERO members of this class are load-bearing**: every anchor those stamps accompany resolves, which is LAW E(4)'s point and why the cure is DELETION, never refreshment. |
```

---

#### C-08 · [W3 D-5 · MINOR] — drift row 6's artifact-of-record denominator

```
| **E-8 · §5 drift row 6 — THE ARTIFACT-OF-RECORD FIGURE IS THE CLASS SIZE, NOT THE CITE COUNT** | §5 row 6 books W3's D-3 as *"CURED — one artifact (`PASS-5/KF-W3-CHECK`, **16 sites**)."* Re-run: `grep -on 'PASS-[0-9]/KF-W3-CHECK\.md' KF-W3.md` → **16 hits on 8 lines, of which 9 are PASS-5, 5 are PASS-3 and 2 are PASS-4**. The **16** is the size of the whole greppable class, not the count of artifact-of-record cites; the seven non-PASS-5 hits are the class-(ii)/(iii) HISTORY cites that W3's own §B.6 discriminator says must **never** be re-pointed. **Corrected form: one artifact of record — `PASS-5/KF-W3-CHECK.md`, 9 cites; 7 further hits are frozen dated-record references and are correctly not re-pointed; greppable class 16 on 8 lines.** The cure itself is sound and W3's §B.6 states the split correctly; the cert's summary is the only place the two numbers are conflated. |
```

---

#### C-09 · [W0 D-1 half · MAJOR] — §1's class-(iii) sweep, re-cut from token count to actor-books-the-act

```
| **E-9 · §1 — THE CROSS-CLASS SWEEP TESTS WHETHER THE NAMED ACTOR BOOKS THE ACT, NOT WHETHER THE TOKEN APPEARS** | §1 books class **(iii)** — *stage-1 ↔ stage-1 and stage-2 → stage-1 (backward)* — at **418 tokens**, verdict *"swept whole; 1 defect found."* The sweep counted TOKENS. It did not test the one property that matters: **whether a wave named as an ACTOR by a sibling books the act at its own end.** `KF-W5.md:66` commissions `W0 runs \`git grep -n 'parseAnimationCSS' -- src demo\` at 81a56990 and prints declaration sites`; `KF-W8.md:256` books `B-16` as *"BOOKED CONDITIONAL — arms if and only if KF.W0's OP-4 locus probe resolves demo-side"*; at `KF-W0.md`'s final bytes `OP-4` → **0**, `B-16` → **0**, `locus` → **0**, `parseAnimationCSS` → **1** (an OUTBOUND row at `:697` that ASSERTS the probe's answer without running it). **That is hard escape 1, and it travelled straight through a 418-token sweep.** **The re-cut, effective round 6: for every sentence in the eleven that names a sibling wave as the ACTOR of an act (`W<n> runs` · `W<n> prints` · `resolves if and only if KF.W<n>` · `→ KF.W<n>` on a commissioning clause), the sweep opens the named sibling and requires a cell, a §Bounds row or a seat that holds the act; a token match is not a landing.** Generalised, R5-10(3)'s close-clock arm catches this shape too — it was scoped to mechanism-D terminus verbs at KF.W10 only. |
```

---

#### C-10 · [W5 D-1 half · MAJOR] — §2's W5 receipt count vs the two coordinates it left standing

```
| **E-10 · §2 — THE PER-FILE "CHECKED / FIXED" TALLY DOES NOT REACH TWO LIVE W5 COORDINATES** | §2 books `KF-W5.md` at **145 checked · 1 fixed**. Two coordinates in that file were off by one at the time of the sweep and remain off at final bytes: the ⟨RECONCILE SEAT⟩ block's *"the four receipts … re-verified at final bytes, **all resolving**"* prints `:98` and `:123`, and the same pair is re-printed at §0 R-1.4 under a live *"Command, run this seat"* label. Measured: **`grep -n 'The ten rulings this spec owes' waves/KF-W4.md` → 99** (printed 98) and **`grep -n 'Census S-2' waves/KF-W4.md` → 124** (printed 123, one hit, quotation byte-exact). `grep -n ':123\|:98\|Census S-2'` over the certificate → **0 hits** — the sweep never reached them, while cert §5 rows 7 and 8 retire the identical class at two siblings. **Corrected values: `:98` → `:99`, `:123` → `:124`; landed at edit `T5-01`.** |
```

---

#### C-11 · [standing — LAW E(3) + the naming rule] — the certificate's own construction clauses

```
| **E-11 · LAW E(3) AND THE CERTIFICATE'S NAME — TWO CONSTRUCTION CLAUSES, EFFECTIVE ROUND 6** | **(a) Digest abbreviation** (from E-3 above): abbreviated digests are produced by `cut -c1-8` and `rev \| cut -c1-4 \| rev` over the pasted full value, never transcribed by hand. **(b) One name per certificate**: the round-6 instrument is `PASS-6/CLOSE-CERT-6.md`, bare name `CLOSE-CERT-6`, round-numbered — ending the `CLOSE-CERT-2` / `CLOSE-CERT-5` dual spelling that produced two of this round's census defects (E-4, E-5) by making a single quantity greppable two ways. **(c) The write-order table carries ELEVEN rows or it states, in the same sentence, exactly which specs' per-wave clocks were captured** — a nine-row table under an eleven-spec universal is LAW G's exact shape at the instrument LAW E exists to make unfalsifiable. |
```

---

### `docs/tranches/X/keyframes/waves/KF-W1.md` — seven edits

#### C-12 · [W1 D6-1 · MAJOR] — the stale `2 occurrences / 2 lines` operand

**Anchor**: `:60` ⟨GREP⟩ `**KF-W2's at 2 occurrences / 2 lines** (not the *"1 … 1"* an earlier reading carried`
**Exact current bytes:**

```
, **KF-W2's at 2 occurrences / 2 lines** (not the *"1 … 1"* an earlier reading carried — W2 was written **ten minutes after** this file at round 3, and its second hit arrived with that write)
```

**Exact replacement bytes** (old→new: `2 / 2` → struck; the cure is SUBTRACTION — the property, not the count, is what the COHESION §3.1 mark turns on, and the property HOLDS: `grep -o 'O-8' KF-W2.md | wc -l` → **3**, `grep -c` → **3** at `:452`/`:553`/`:916`, **every one a `KF-CO-1`/`KF-CO-8` substring**; `PASS-5/CLOSE-CERT-2.md` §4 R5-R1's own sum `3+1+4+2+0+5 = 15` names W2 at 3):

```
 ⟨***the per-sibling operand ~~"KF-W2's at 2 occurrences / 2 lines"~~ is STRUCK at repair round 6, PASS-6 D6-1: it was 3 / 3 at round-5 final bytes and the certificate that swept this sentence names W2 at 3 in its own pasted sum three clauses away. Per this file's own D5-4/D5-5 arm the cure is subtraction — the PROPERTY carries and no per-sibling count is restated: every `O-8` hit in the six is a `KF-CO-8`/`KF-CO-1` substring, so zero real O-8/O-11 letter citations exist across the non-consumer set, and that is what the COHESION §3.1 mark turns on.***⟩
```

---

#### C-13 · [W1 D6-2 · MAJOR, site 1 of 3] — `0 in FOUR` at `:60`

**Anchor**: `:60` ⟨GREP⟩ `is **0 in FOUR** (KF-W2 · KF-W5 · KF-W6 · KF-W8; W2's literal `KF.W1` greps resolve to KF.W11/W13 prefixes)`
**Exact current bytes:**

```
is **0 in FOUR** (KF-W2 · KF-W5 · KF-W6 · KF-W8; W2's literal `KF.W1` greps resolve to KF.W11/W13 prefixes)
```

**Exact replacement bytes** (old→new: the count → the property; measured at final bytes `KF-W2` **7** · KF-W5 **0** · KF-W6 **0** · KF-W8 **0** · KF-W7 **1** · KF-W9 **1**, and the KF.W11/W13 parenthetical is false too — `grep -oE 'KF\.W1[0-9]'` returns the prefixes separately):

```
carries **NO KF.W1 EDGE in any of the six** — the property, which no sibling write can falsify, stated in place of the per-sibling zeros ⟨***the lead clause ~~"0 in FOUR (KF-W2 · KF-W5 · KF-W6 · KF-W8; W2's literal `KF.W1` greps resolve to KF.W11/W13 prefixes)"~~ is STRUCK at repair round 6, PASS-6 D6-2, at all THREE of its live sites (`:60` · `:368` · `:415`). It was falsified in four consecutive rounds and does not get a fifth restatement: at round-5 final bytes the token reads KF-W2 **7** · KF-W5 0 · KF-W6 0 · KF-W8 0 · KF-W7 1 · KF-W9 1, all seven KF-W2 hits are the genuine bare token, and the KF.W11/W13 parenthetical is false on its own terms. The four legs of the property are re-verified: each of the six either declares KF.W1 a NON-EDGE or names it nowhere.***⟩
```

---

#### C-14 · [W1 D6-2 · MAJOR, site 2 of 3] — `0 in FOUR` at `:368`

**Anchor**: `:368` ⟨GREP⟩ `(bare-`KF.W1` token **0 in FOUR**; **1 each in KF-W7 and KF-W9**`
**Exact current bytes:**

```
(bare-`KF.W1` token **0 in FOUR**; **1 each in KF-W7 and KF-W9**,
```

**Exact replacement bytes:**

```
(no KF.W1 edge in any of the six — the property; the per-sibling token counts are struck at repair round 6 per PASS-6 D6-2, the strike stated whole at `:60`; **KF-W7 and KF-W9 each name KF.W1 exactly to DECLARE it a non-edge**,
```

---

#### C-15 · [W1 D6-2 · MAJOR, site 3 of 3] — `0 in FOUR` at `:415`

**Anchor**: `:415` ⟨GREP⟩ `**The bare-`KF.W1` token is 0 in FOUR, and 1 each in KF-W7 and KF-W9 — both non-edges**`
**Exact current bytes:**

```
**The bare-`KF.W1` token is 0 in FOUR, and 1 each in KF-W7 and KF-W9 — both non-edges**
```

**Exact replacement bytes:**

```
**None of the six carries a KF.W1 edge; KF-W7 and KF-W9 name KF.W1 only to declare it a non-edge** (the *"0 in FOUR"* numeral is struck at repair round 6 per PASS-6 D6-2 — struck at all three of its live sites, the strike stated whole at `:60`; the property is what §9 item 5 carries and it is re-verified at all four legs)
```

---

#### C-16 · [W1 D6-6 · MINOR] — §14's CARRIAGE-CITATION class (b) locus

**Anchor**: `:610` ⟨GREP⟩ `(b) **dated-record references** inside §10–§13, which name a pass artifact as **that round's input or that round's finding**`
**Exact current bytes:**

```
(b) **dated-record references** inside §10–§13, which name a pass artifact as **that round's input or that round's finding**
```

**Exact replacement bytes** (old→new: the stated locus `§10–§13` yields 8 of 15 members; the true locus is the whole file — the seven outside are `:369` in §7 and `:580 :588 :589 :597 :604 :622` in §14, every one genuinely a frozen dated-record reference):

```
(b) **dated-record references ANYWHERE IN THIS FILE** — 15 members at `:369 :430 :451 :484 :493 :495 :521 :534 :568 :580 :588 :589 :597 :604 :622`, of which 8 lie in §10–§13, **one in §7** (`:369`, cross-edge 2's round-3 correction block) and **six in §14** (the round-5 record itself); the round-5 spelling ~~"inside §10–§13"~~ is struck at repair round 6 per PASS-6 D6-6, under which a seat re-running the receipt from its stated rule got 8 and the partition `8 + 15 + 2 + 1 = 26` stopped summing — which name a pass artifact as **that round's input or that round's finding**
```

---

#### C-17 · [W1 D6-7 · MINOR] — §14's access-column receipt: "6 rows" over a five-row table, no counting rule

**Anchor**: `:611` ⟨GREP⟩ `§Bounds access column enumerated whole: **6 rows — `modify` ×2 · `create` ×4**`
**Exact current bytes:**

```
§Bounds access column enumerated whole: **6 rows — `modify` ×2 · `create` ×4**
```

**Exact replacement bytes** (old→new: `6 rows` → `6 FILES on 5 rows`, with the counting rule the receipt lacked; the §Bounds table at `:98-105` carries **five** data rows, row 5 names two files, and row 1's `create` is an explicitly SPENT — struck — grant):

```
§Bounds access column enumerated whole: **6 FILES on 5 table rows — `modify` ×2 · `create` ×4** ⟨***counting rule, stated AT the receipt per R5-11(1) and added at repair round 6 (PASS-6 D6-7): one bounds FILE = one unit; the §Bounds table `:98-105` carries FIVE data rows, and row 5 names TWO files (`…parser-totality-exposure.md` · `…library-band-r1-widened-k1-k4.md`); row 1's superseded `create` grant is explicitly SPENT and is a struck grant, not a live access word, so a bare `grep -oE '\*\*(modify|create)\*\*'` over the table over-counts it. The round-5 spelling ~~"6 rows"~~ is struck: it was a FILE count wearing the word ROWS.***⟩
```

**Companion, same edit** — `:130`'s repeat of the figure ⟨GREP⟩ `This wave's six bounds rows are`: replace `six bounds rows` → `six bounds FILES on five rows (counting rule at §14's receipt)`.

---

#### C-18 · [W1 D6-9 · INFO] — the dated intervals, marked re-measure-at-open

**Anchor**: `:414` ⟨GREP⟩ `**Dated intervals re-measured** — silence since the newest keyframes-authored letter`
**Insert immediately after the sentence's closing figures (`O-8 unanswered **35 days**; O-11 **32 days**.`):**

```
 ⟨***RE-MEASURE AT OPEN, not at read (PASS-6 D6-9, 2026-08-29): at the pass-6 seat's clock these read **42 · 36 · 33**. They are LAWFUL IN FORM and are not booked as drift — each is explicitly declared dated and non-inheritable, and C-1's ANTI-STALENESS lock is why they are written that way. They are the one figure class in this file that goes stale WITHOUT ANY SEAT WRITING ANYTHING, which is the pure case the lock exists for: the executing seat re-runs them at open and never reads them as current.***⟩
```

---

### `docs/tranches/X/keyframes/waves/KF-W9.md` — nine edits

#### C-19 · [W9 D6-1 · HIGH] — strike col B from the S-10 anchor table

**Anchor**: the S-10 block `:257-282`, header line `:261` ⟨GREP⟩ `# col B = the SAME anchors re-run by THIS SEAT at write time, after KF.W10's round-5 seat had`
**Exact current bytes of the column header:**

```
# col B = the SAME anchors re-run by THIS SEAT at write time, after KF.W10's round-5 seat had
```

**The four false cells, old→new** (`KF-W10.md` has exactly two reconstructible round-5 states; col B is neither at four of six):

| anchor | col B printed | true written state (staged `fffb9685` = final) | delta |
|---|--:|--:|--:|
| A3 PACKET-FIRST | **:503** | **:513** | −10 |
| A4 §D cross-edge | **:537** | **:547** | −10 |
| A5 §B-1 | **:198** | **:206** | −8 |
| A6 §B-1's sibling §B-3 | **:200** | **:197** | +3 |

**The edit — DELETE col B entirely** (LAW E(4) forbids a per-wave seat printing sibling line numbers at all; this is also the cure for `C-20`). Replace the column header and the six col-B cells with:

```
# col B DELETED at repair round 6 (PASS-6 D6-1, HIGH · D6-2 folded to union U6-A · D6-3): a per-wave seat may not
# print a sibling's line numbers at all (LAW E(4)), and four of the six numerals this column carried described NO
# state of KF-W10.md at any clock in round 5 (A3 −10 · A4 −10 · A5 −8 · A6 +3 against the file's only two
# reconstructible states). Three of the six pasted commands were multi-line and were printed as single numerals
# (`grep -n 'OP-4'` → 5 lines, `'PACKET-FIRST'` → 4, `'CH2-02'` → 4). col A is KEPT as the check's dated baseline,
# cited to `PASS-5/KF-W9-CHECK.md §2` as an artifact reading and not re-measured here. THE SIX ANCHORS STAND ALONE
# — all six resolve and all six quoted passages are byte-exact at their true lines — and the verifier of record for
# their final-bytes offsets is `PASS-6/CLOSE-CERT-6.md` §ERRATA E-2, which re-derives them. If a numeral must ever
# ride, it is printed as its command's WHOLE output.
```

---

#### C-20 · [W9 D6-3 · MEDIUM] — the provenance sentence about a sibling's write history

**Anchor**: `:261` ⟨GREP⟩ `after KF.W10's round-5 seat had already written once`
**Exact current bytes:**

```
after KF.W10's round-5 seat had already written once
```

**Exact replacement bytes** — **DELETE the clause**, leaving nothing in its place. Rationale to record in the round-6 ledger, not at the cell: *a per-wave seat's claim about a sibling's write history is exactly the class LAW E(4) retires; the file already hedged this block twice (§Bounds `:77` "No W10 prose is quoted **here**" and S-10's SHADOW "not quoted **as a receipt of record**"), and LAW E(4) contains no as-a-receipt-of-record qualifier — a hedge that narrows a flat prohibition is not compliance.* The block's six quoted `KF-W10.md` passages go with col B at `C-19`; what remains is six anchors + col A cited to its artifact.

---

#### C-21 · [W9 D6-4 · MEDIUM · LAW G instance 3] — the §SHADOW preamble's universal, restated at its true scope

**Anchor**: `:603` ⟨GREP⟩ `Per LAW F(1) each act carries its own SHADOW line AT the act; this table is the round's enumeration`
**Exact current bytes:**

```
Per LAW F(1) each act carries its own SHADOW line AT the act; this table is the round's enumeration
```

**Measured** (`grep -on 'SHADOW' KF-W9.md` → `:13 :13 :164 :164 :195 :284 :284 :599 :601 :603 :616`; discounting the round-5 preamble `:13`, the §G reference to **W6's** shadow `:195`, and the ledger's own section `:599-616`): **two** at-the-act SHADOW lines — §F `:164` and §Sequencing S-10 `:284` — over **eight** enumerated acts.

**Exact replacement bytes:**

```
**TWO of this round's eight acts carry an at-the-act SHADOW line — §F `:164` (the citation re-point) and §Sequencing S-10 `:284` (the delegation→verification cure); the remaining SIX are citation-level and are shadowed by ENUMERATION in this table alone, which is stated here rather than assumed** ⟨***the round-5 preamble ~~"Per LAW F(1) each act carries its own SHADOW line AT the act"~~ is STRUCK at repair round 6 under LAW G (PASS-6 D6-4): it was a universal its own file falsifies by grep, in the round that minted the law. The six citation-level acts are: (4) the closure re-point at three cells · (5) the two alias spellings · (6) the §RECEIPT warrant narrowing · (7) the census-1 characterisation strike · (8) the three struck figures + the S-10.1 parenthetical · and four of act (3)'s five re-pointed cells (header `:3`, §Carry head `:98`/`:100`/`:102`, §Bounds PRM row `:75`). Every one uses a verb on LAW F(1)'s own trigger list (STRUCK · re-pointed · NARROWED), and the LAW F(1) exemption for citation-level acts is argued here rather than assumed. The enumeration below is complete and correct, and LAW F(2)'s terminus sweep for this round is discharged at `PASS-6/CLOSE-CERT-6.md` §ERRATA E-6.***⟩; this table is the round's enumeration
```

---

#### C-22 · [W9 D6-5 · MEDIUM, half 1 of 2] — `:69`'s parenthetical, re-grounded on the true ground

**Anchor**: `:69` ⟨GREP⟩ `there §Bounds says `read-only` of `lane-frontend.md §6.5` **specifically** and routes the amendment elsewhere, so no split is owed`
**Exact current bytes:**

```
there §Bounds says `read-only` of `lane-frontend.md §6.5` **specifically** and routes the amendment elsewhere, so no split is owed
```

**Exact replacement bytes** (old→new: a ground its own transcript refutes → the ground that actually carries; the `read-only` attaches to **both** paths on `:70`, and the word that singles out the lane file is *"never rewritten"*):

```
there the amendment lands as a **DRAFT under the `evidence/W9/**` create row** (*"the census-amendment draft"*), so the census file's `read-only` is never breached and no split is owed ⟨***ground corrected at repair round 6, PASS-6 D6-5: the round-4 ground ~~"§Bounds says `read-only` of `lane-frontend.md §6.5` specifically"~~ is FALSE at the cell it describes — `:70`'s `read-only` attaches to BOTH paths, the census file included, and the word that singles out the lane file is "never rewritten". The conclusion was right and was resting on the wrong one of its two grounds — the D5-5 shape, and the D4-5 contradiction's last unswept sibling.***⟩
```

---

#### C-23 · [W9 D6-5 · MEDIUM, half 2 of 2] — `:70`'s access cell, one word per path

**Anchor**: `:70` ⟨GREP⟩ `**read-only** | the census row amends (G-KFW9-5); the lane file is dated evidence, never rewritten`
**Exact current bytes:**

```
**read-only** | the census row amends (G-KFW9-5); the lane file is dated evidence, never rewritten
```

**Exact replacement bytes** (one access word over two paths, with the note pointing the other way, is the whole defect):

```
**read-only (both paths) — the amendment lands as a DRAFT elsewhere** | **`CENSUS-2026-08-03.md`: read-only HERE; the census row it amends (G-KFW9-5) is drafted under the `evidence/W9/**` create row and lands from seat `.e`, so this wave writes no byte of the census file. `lane-frontend.md §6.5`: read-only AND never rewritten — dated evidence, no amendment of any kind.** ⟨***the two clauses are attached to their own paths at repair round 6 (PASS-6 D6-5); the round-4 cell put one access word over two paths and then distinguished them the other way round.***⟩
```

---

#### C-24 · [W9 D6-6 · MEDIUM] — kf-SpringTarget `D-4` / `D-8` written into §E

**Anchor**: `:251`-band, §E's contrast roster ⟨GREP⟩ `KF-AV-19/D-8`
**Current bytes**: `grep -n 'SpringTarget' KF-W9.md` returns **no line carrying `D-4` or `D-8` for that record**; §E's roster is `KF-AV-19/D-8 ⟨kf-AnimationVisualizer⟩ · KF-ET-8 · KF-ET-14/D-M-6 · KF-ET-4 · SPF-5 · #58 · D-B2/L-M-4/C-M-4 + D-M4`.
**The record's own routing** ⟨`kf-SpringTarget.md:147`⟩: *"**KF.W9**: **the contrast reads (D-4/D-8 SS-13 rows)** · the PRM datum (D-3) · the a11y data (D-5's aria-hidden half, D-6, D-14, N-4) · touch-action witnesses · the SS-13 list."* — **the two limbs the record names FIRST**; the other four are carried as §Carry bullets (D-3 at §A; D-5, D-6, D-14+N-4 at §F).
**Insert into §E's contrast roster, immediately after `KF-AV-19/D-8 ⟨kf-AnimationVisualizer⟩`:**

```
 · **`D-4` / `D-8` ⟨kf-SpringTarget⟩** — the contrast reads the record routes to this wave FIRST (`kf-SpringTarget.md:147`), discharged by **route (d)** at that record's residue item **#4** (*"Contrast reads over the live glass plate — the four derby tags (composited chain says 1.92-3.9 light); `.spring-target-marker` (50%) and `.sampler-ball` (65%), the two rows near the 3:1 floor"*). **No re-booking and no re-grade — the bank's disposition is NO-WAVE-OWNER + KF.W9 for both.** The ids are written here at repair round 6 (PASS-6 D6-6) because PASS-5's operationalization of route (d) was **id-token presence in the residue**, under which these were hard escapes, while pass 6 discharged them **by item**: the two passes' *"0 escapes"* were not the same claim, and the corpus's self-described worst contrast figure (**1.92:1 light**, this record's own superlative) reached this wave only as an unnumbered line inside ≈590 bytes. **Standing clause, stated once at §Carry head: route (d) discharges BY ITEM; a residue item need not name its ids — and where it does not, the consuming spec writes them, so the next census reproduces.**
```

---

#### C-25 · [W9 D6-7 · MEDIUM · LAW G instance 4] — the STANDING ID RULE restated as scope-with-enumeration

**Anchor**: `:95` ⟨GREP⟩ `**banked aliases are written in full, never discharged by identity** (`KF-ET-14 / D-M-6` · `D-6 / m-6`)`
**Exact current bytes:**

```
**banked aliases are written in full, never discharged by identity** (`KF-ET-14 / D-M-6` · `D-6 / m-6`)
```

**Exact replacement bytes** (old→new: a universal six banked co-ids in this same file falsify, four of them colliding live → scope-with-enumeration + a greppable sweep):

```
**the TWO banked aliases PASS-5 named are written in full — `KF-ET-14 / D-M-6` ⟨kf-EasingTarget⟩ at §E and `D-6 / m-6` ⟨kf-ChromeDock⟩ at §G, 4 occurrences each; the remaining banked co-ids are carried BY PRIMARY ID OR BY FOLD and are enumerated here so the rule is a scope and not a memory** ⟨***the round-5 universal ~~"banked aliases are written in full, never discharged by identity"~~ is STRUCK at repair round 6 under LAW G (PASS-6 D6-7): six banked co-ids in this same file falsify it, four of them colliding live on a bare token — `KF-CE-47 · D-17` ⟨kf-CSSCodeEditor:85⟩, spec spells `KF-CE-47` only, bare `D-17` ×2 both resolving to a PASS-1 check-defect id · `KF-ET-12 · C-15` ⟨kf-EasingTarget:51⟩, spec spells the suffix form `KF-ET-26/12`, bare `C-15` ×3 all kf-AmigaScene's · `KF-KE-8 · D-5` ⟨kf-KeyframesEditor:50⟩, bare `D-5` ×15 headed by kf-SpringTarget's aria-hidden row at §F · `KF-SST-13 · D-4` ⟨kf-StartingStyleTarget:54⟩, bare `D-4` ×9 · `KF-SST-14 · D-7(b)` ⟨:55⟩, bare `D-7` ×12 all kf-AmigaScene's at §A · `KF-SST-17 · D-10` ⟨:58⟩, spec spells the suffix form `KF-SST-14/-17` and `KF-SST-17` is not a resolvable token in this file. NOTHING ESCAPES — each pair discharges by its primary id or by fold, the substance travels, and no row moves; what was false was a rule stated in this file's own voice about this file's own bytes. THE SWEEP IS NOW A COMMAND, entered at §SCOPE: `grep -on 'KF-SST-1[47]\|KF-ET-12\|KF-CE-47\|KF-KE-8\|KF-SST-13' KF-W9.md`.***⟩
```

---

#### C-26 · [W9 D6-8 · LOW] — the O-20/O-21 register's scope rule

**Anchor**: §SCOPE, `:618`-band ⟨GREP⟩ `### §SCOPE · R5-11 — RECEIPT-ARITHMETIC-FIRST`
**Current bytes**: §SCOPE (1)'s counting rule excludes ledger and provenance prose **by name**, and was applied to the `KF.W3` token and **not** to this one. PASS-5 §5 recorded `grep -c 'O-20\|O-21' KF-W9.md` → **0** as the posture receipt; at round-5 bytes it returns **1 line / 2 occurrences**, both at `:692`, where the round-5 ledger carries PASS-5 §7 item 13 forward.
**Insert as a new bullet under §SCOPE, beside the `KF.W3` rule:**

```
- **`O-20` / `O-21`** — **2 occurrences on 1 line, both at `:692` inside the round-5 ledger's carried decline (*"O-20/O-21 is correctly not this wave's surface"*); 0 in the spec body.** The same scope rule as `KF.W3`: ledger and provenance prose are outside the body census. **The posture is untouched and correct** — no mint is imported, no KF.W1 coordinate rides here. Entered at repair round 6 (PASS-6 D6-8) because this is the D4-6 recursion at its FOURTH register (after the `KF.W3` token, the dissent roster and the §F citation class): a pass-7 seat re-running the command PASS-5 ran gets a different answer, and until this line existed there was no in-file rule to reconcile it.
```

---

#### C-27 · [W9 D6-9 · LOW] — kf-ChromeDock's `D-2` alias pair, spelled at §G

**Anchor**: `:184`-band, §G's ChromeDock cluster ⟨GREP⟩ `**M-5 / C-6** ⟨kf-ChromeDock⟩ MAJOR (RESCOPED)`
**Current bytes**: the §G ChromeDock cluster carries `M-5/C-6` · `M-2/C-4` · `D-4` · `D-22+RR-1` · `D-23/C-5` · `D-6/m-6` — **and no `D-2`**. The record spells it two ways and this spec neither: roster row `**D-2-RESCOPED — MINOR (ruled)**` ⟨`kf-ChromeDock.md:70`, *"NO-WAVE-OWNER (icon ink policy with D-3); **over-aurora visibility → KF.W9**"*⟩, residue item `**D-2-residue**` ⟨`:135`⟩.
**Insert as one clause at the head of the §G ChromeDock cluster** (no bullet, no booking, no severity — the D5-8 pattern exactly):

```
⟨kf-ChromeDock⟩ **`D-2-RESCOPED` / `D-2-residue`** — route (d), residue item #8; the record spells the id two ways and this spec spelled neither, which made it the single candidate a machine reader could not resolve without opening the bank (PASS-6 D6-9, entered at repair round 6 on the D5-8 pattern). Discharge unchanged: NO-WAVE-OWNER (icon ink policy with D-3); over-aurora visibility → KF.W9.
```

---

### `docs/tranches/X/keyframes/waves/KF-W10.md` — seven edits

#### C-28 · [W10 D-1 · MAJOR — **HARD ESCAPE 2, LANDED**] — the six NO-WAVE-OWNER `EH-*` ids booked at G-2

**Anchor**: `:116`-`:120`, the mechanism-D roster ⟨GREP⟩ `**row 9 of mechanism D**, with the same standing as its eight siblings`
**The routing, verbatim from the declaring end** — `KF-W0.md:738` (added at round 5 under its D-5 / RULINGS-5 R5-1(7)):

> **`EH-2` · `EH-3` · `EH-12` · `EH-13` · `EH-14` · `EH-15` → NO-WAVE-OWNER** under G-2's terminal sweep — the **second** of the three rows above. **6 ids.**

and `KF-W0.md:743`, its LAW-F SHADOW line:

> **citing / terminus waves notified = {KF.W6 …, KF.W9 …, KF.W10 (§E · `NWO-TERMINAL-SWEEP` · G-2, the terminus for the six NO-WAVE-OWNER ids)}**

**The bank, re-read at the corpus bytes** (`sed -n '41p;42p;51p;52p;53p;54p' kf-EditorHeader.md | grep -c 'NO-WAVE-OWNER'` → **6 of 6**):

- **`EH-2`** ⟨`kf-EditorHeader.md:41`⟩ — *"**RR-2 missed #1 — MAJOR · a restore that applies NOTHING still toasts "State restored!": `useShareState.ts:75` never reads `result.restored`.** … hashSharing.ts:51-58 returns `{restored:false}` (zero state applied) whenever `isValidState` fails; the local guard at useShareState.ts:69-73 tests only `decodeStateFromHash`, so a decodes-but-invalid payload passes it, applies nothing, and `:83-86` fires the success toast unconditionally. **Live at BOTH mount sites (EditorShell.vue:20, MbabbMenu.vue:81) at every substrate.** Novel (zero corpus coverage). Cure at the seam: gate the toast"*
- **`EH-3`** ⟨`:42`⟩ — *"**L-M6 / C-4 (live half) — MAJOR · the ribbon-site `<SharePopover />` is bare — no `onSceneRestore` — so a shared-URL scene switch silently no-ops from the header while the dock site is wired.** Verified: EditorShell.vue:20 bare; MbabbMenu.vue:9 `:on-scene-restore` (frontier-intact) … Compounds EH-2 (the no-op restore then toasts success). Disposition: **NO-WAVE-OWNER** (wire the prop or centralize; anti-rename: the forthcoming kf-EditorShell corpus folds HERE, never re-books"*
- **`EH-12`** ⟨`:51`⟩ — *"**C-5 — MINOR · SharePopover reads its function prop once at setup (:60-61 → useShareState.ts:12) — a rebound `onSceneRestore` is ignored.** Verified; live impact nil (stable `runSceneSwitch`). RR-1's demotion from C's MAJOR adopted. **NO-WAVE-OWNER** (one repair with EH-2/EH-13)."*
- **`EH-13`** ⟨`:52`⟩ — *"**RR-2 missed #3 — MINOR · the same payload is decoded twice and the two validity gates differ** (useShareState.ts:69 decode-only guard; hashSharing.ts:56 decode+`isValidState`) — the mechanism behind EH-2. Verified. **NO-WAVE-OWNER** (decode once, branch on `result.restored`)."*
- **`EH-14`** ⟨`:53`⟩ — *"**RR-2 missed #4 — MINOR · `route.name as string` ×2 (useShareState.ts:19/:25) launders `string | symbol | undefined`;** on an unnamed route both `getAllState` and `router.resolve` receive values their signatures forbid. Verified. **NO-WAVE-OWNER** (type hygiene; KF-APP-4's gate family would not catch assertions — the cure is removal, not tooling)."*
- **`EH-15`** ⟨`:54`⟩ — *"**RR-2 missed #5 — MINOR · the barrel-published component chain carries an undeclared vue-router mount-context requirement whose failure defers from mount to first interaction** (`useRouter()/useRoute()` bare injects at :13-14; first Share click throws on `.name`). Verified; **survives the deletion via SharePopover's own barrel export**. **NO-WAVE-OWNER**."*

**Insert as mechanism-D ROW 10, in row 9's own form** (row 9 is `C-14`; this row takes the same standing):

```
**ROW 10 OF MECHANISM D — THE `EH-*` NO-WAVE-OWNER SIX, RECEIVED FROM KF.W0 AND BOOKED AT REPAIR ROUND 6 (PASS-6 KF-W10 check D-1 · union hard escape 2 · RULINGS-5 R5-1(7)'s reciprocal).** Members, each with its own banked anchor re-read at the corpus bytes this seat — per-row, never per-carrier (LAW F(3)): **`EH-2`** ⟨`kf-EditorHeader.md:41`⟩ MAJOR, the restore that applies nothing and toasts success, live at BOTH mount sites · **`EH-3`** ⟨`:42`⟩ MAJOR, the bare ribbon-site `<SharePopover />` with no `onSceneRestore` · **`EH-12`** ⟨`:51`⟩ MINOR, the once-at-setup function prop · **`EH-13`** ⟨`:52`⟩ MINOR, the double decode with divergent validity gates — the mechanism behind EH-2 · **`EH-14`** ⟨`:53`⟩ MINOR, the `route.name as string` laundering ×2 · **`EH-15`** ⟨`:54`⟩ MINOR, the undeclared vue-router mount-context requirement, **which SURVIVES the `EditorHeader.vue` delete via SharePopover's own barrel export**. `sed -n '41p;42p;51p;52p;53p;54p' registry/adjudicated/kf-EditorHeader.md | grep -c 'NO-WAVE-OWNER'` → **6 of 6**, re-run this seat. **Disposition: NO-WAVE-OWNER, terminalized at this close if still unhomed, terminal verb per G-2's alphabet (*carried to the next formation boundary's ledger*).** **Struck set = ∅ — no row leaves any roster; these six were never in the adopted set and are not the two `G-2` loses by `ADOPTED-BY-KF.W6`, nor the three RESTORED LIVE at KF.W6.** **THE FAMILY'S ARITHMETIC, closed at both ends: `KF-W0.md`'s `3 + 2 + 6 + 4 = 16` — 3 restored live at KF.W6, 2 discharged-by-twin, 6 NO-WAVE-OWNER (this row), 4 fork-hosted moot (the record's own residue register at `kf-EditorHeader.md:106` item 5, five items of which four are EH-family).** **Why this row exists**: `KF-W0.md:738`/`:743` named this file's `§E · NWO-TERMINAL-SWEEP · G-2` as the terminus for the six, 47 seconds before this file's last round-5 write; the close-clock arm's own command returned `KF-W0.md:743` among its hits while its verdict denied it; and this file's own discipline — *"the item and its answer inside the census, not five in a table and one in a paragraph"* — is the reason `KF.W6`'s sixth cross-edge item was promoted to row 7 at round 3 and `C-14` to row 9 at round 5.
```

**Consequential update in the same edit**: the census figure at `:132` moves from *"routed 33 · booked 32 · escaped 1"*, and the arm's roster denominator moves from **nine** rows to **ten** at `:168`.

---

#### C-29 · [W10 D-3 · MAJOR] — the D-6 transcript, printed whole at thirteen

**Anchor**: `:533` ⟨GREP⟩ `:37 :58 :88 :102 :199 :331 :334 :383 :424 :455 :592 :626`
**Exact current bytes:**

```
**`:37 :58 :88 :102 :199 :331 :334 :383 :424 :455 :592 :626`** — **12 lines / 17 occurrences**
```

**Exact replacement bytes** (old→new: 12→13 coordinates, 17→18 occurrences; re-run verbatim at `KF-W1.md`'s final bytes, `grep -n 'O-21' KF-W1.md | awk -F: '{printf ":%s ", $1}'`):

```
**`:37 :58 :60 :88 :102 :199 :331 :334 :383 :424 :455 :592 :626`** — **13 lines / 18 occurrences** ⟨***CORRECTED AT REPAIR ROUND 6, PASS-6 D-3: the round-5 spelling printed TWELVE of thirteen and understated both figures by one. The dropped coordinate is `KF-W1.md:60`, and its `O-21` token was minted by the RECONCILE SEAT'S OWN W1 EDIT at 2026-08-28 19:28:19 — the same seat then edited THIS CELL at 19:30:41, re-pointing a path inside it and not re-running the command printed two clauses away. This cell exists to convict round 4 for printing five coordinates beside a command whose output was nine, and was ordered by RULINGS-5 §END KF-W10 D-6 to print the transcript WHOLE. All thirteen coordinates resolve; the cell's anchor-first posture means no line number is load-bearing; what failed is the receipt, in the one cell of this file whose subject is receipts that fail.***⟩
```

---

#### C-30 · [W10 D-4 · MINOR · LAW G instance 12] — the close-clock arm's roster, diffed row-by-row against its own output

**Anchor**: `:122` ⟨GREP⟩ `W9's capture` (the arm's stated output enumeration) and `:168` ⟨GREP⟩ `filtered to terminus language and diffed against mechanism D's **nine** rows`
**Current bytes**: the arm's enumeration names *"W9's capture packet (row 19 / edge 4)"* and *"W2's/W4's/W5's packet-routing restatements (row 23 / §6.D)"* as members of the command's output, and its verdict reads *"No unbooked terminus survives this run."*
**Measured, re-run verbatim at final bytes, per file:**

```
$ grep -nE 'KF\.W10' KF-W*.md | grep -iE 'terminaliz|terminal|MOOT|unhomed|carried to|at close' | cut -d: -f1 | sort | uniq -c
   3 KF-W0.md   4 KF-W1.md   18 KF-W10.md   1 KF-W2.md   3 KF-W3.md
   1 KF-W5.md   10 KF-W6.md   5 KF-W7.md    3 KF-W8.md
$ (KF-W9.md and KF-W4.md return ZERO under this filter — W9's SHADOW reads "terminus", which the filter's `terminal` alternative does not match)
```

**Exact replacement of the verdict clause and the enumeration's two phantom members:**

```
**THE ARM'S OUTPUT, DIFFED ROW-BY-ROW AGAINST THE ROSTER AND PRINTED (repair round 6, PASS-6 D-4 · union U6-D — summarising an output is the conviction).** Per-file hits under the filter, re-run at final bytes: **W0 3 · W1 4 · W10 18 · W2 1 · W3 3 · W5 1 · W6 10 · W7 5 · W8 3 — and W4 0, W9 0.** ⟨***TWO CORRECTIONS. (1) `KF-W9.md` and `KF-W4.md` return ZERO hits under this filter and are struck from the arm's stated output: W9's `SHADOW … terminus waves notified = KF.W10` reads "terminus", which the filter's `terminal` alternative does not match. Both obligations are GENUINELY BOOKED — at rows 18/30 and 26 — by OTHER, verified mechanisms; the defect was attributing them to an output that never contained them. (2) The round-5 verdict ~~"No unbooked terminus survives this run"~~ is STRUCK under LAW G: the command's own output contained `KF-W0.md:743`, the SHADOW line routing SIX NO-WAVE-OWNER `EH-*` ids to this file's G-2, and the roster said FOUR inbound notifications where the bytes carried FIVE. That row is now mechanism-D row 10. THE INSTRUMENT IS FIXED AT ITS READING, NOT AT ITS COMMAND: the output is diffed line-by-line against the roster and the diff is printed; a summarised output is not a sweep.***⟩ Roster denominator: **TEN** rows (nine at round 5 + `EH-*` row 10).
```

---

#### C-31 · [W10 D-5 · MINOR] — the ownership-vehicle sweep's moving revision

**Anchor**: `:166` ⟨GREP⟩ `git show HEAD:docs/tranches/X/keyframes/waves/KF-W10.md | grep -c '§0c'` → **10 lines** (`| grep -o` → **13 occurrences**)`
**Exact current bytes:**

```
⟨command⟩ `git show HEAD:docs/tranches/X/keyframes/waves/KF-W10.md | grep -c '§0c'` → **10 lines** (`| grep -o` → **13 occurrences**)
```

**Exact replacement bytes** (old→new: a moving `HEAD` → the pinned pre-cut revision, and the two figures re-derived; re-run at this seat `HEAD` is now `fffb9685` — *the commit that banks this very round's repair* — and returns **9 lines / 23 occurrences**, so the pasted command no longer reads the state it was written to enumerate):

```
⟨command, pinned⟩ `git show fffb9685~1:docs/tranches/X/keyframes/waves/KF-W10.md | grep -c '§0c'` → the PRE-CUT state this receipt enumerates (**10 lines / 13 occurrences**); ⟨command, post-cut⟩ `grep -c '§0c' KF-W10.md` → **9 lines**, `grep -o '§0c' KF-W10.md | wc -l` → **23 occurrences** ⟨***the revision is PINNED at repair round 6 (PASS-6 D-5): the round-5 paste named a moving `HEAD`, which advanced to `fffb9685` (2026-08-29 15:07:05, "r5/r3 repair halves banked through the wall") — the commit banking this round's own repair — so it stopped reading the pre-cut file and read a post-cut one whose §0c token count had RISEN, because the re-cut that strikes §0c as the vehicle necessarily NAMES §0c more often than the text it replaced. This is LAW E(4)'s disease in git form: `HEAD` is a clock a seat cannot keep. THE SCOPE CLAIM ITSELF IS SOUND and was verified independently: no site in this file still names §0c as the ownership vehicle; all nine surviving mentions are the strike, its rationale, or the COHESION anchor enumeration; the re-cut form ("§0e or a successor letter, because §0c and §0d are occupied") is present at the header, the scope block, OP-6, §6.C-E and dissent 2; and COHESION's anchors reproduce byte-exact at `:138`/`:156`/`:170`/`:185` with `grep -c 'KF\.W10' COHESION.md` → 0. The cure landed; its receipt did not.***⟩
```

---

#### C-32 · [W10 D-7 · INFO] — the keyframes-side revision discipline, written down rather than inherited

**Anchor**: `:145`-band, the §2b.1 substrate declaration ⟨GREP⟩ `mtime at this seat's read` (the same block `C-33` strikes)
**Current bytes**: the substrate declaration covers the eleven specs and four value-side substrates and names **no keyframes-side revision discipline of its own** — it inherits one from the rulings.
**Insert as a new line at the end of the substrate declaration block:**

```
**FRONTIER OF RECORD, DECLARED HERE RATHER THAN INHERITED (repair round 6, PASS-6 D-7).** Every keyframes-side measurement in this file is executed at **`origin/master 81a56990736ced5b5edde0b84c527680ac7689b1` (2026-07-18)** in `/Users/mkbabb/Programming/keyframes.js`, by `git show` / `git grep` only. **The checkout is NOT the frontier and is disqualified**: `git rev-parse HEAD` → `8281638c0ac4ac8c54a67a018ca5bf6a9117174f` (2026-07-28, local master); `git merge-base --is-ancestor 81a56990 HEAD` → **FALSE** — the two are **divergent**, not merely offset; `git rev-list --left-right --count master...origin/master` → **1 41**; `git status --porcelain | wc -l` → **252**. A seat that reads the checkout reads a different tree with a different `package.json` proof roster (**2**, not 3) and a different `MbabbMenu.vue` path. R3-2's disqualification of the worktree and R5-2/§END's frontier clause are therefore load-bearing, not ceremonial — and an inherited discipline is one repair round away from being an unwritten one.
```

---

#### C-33 · [W1 D6-5 · MAJOR + U6-C's largest instance] — the ten-row per-seat substrate table struck as authority

**Anchor**: `:140`-`:146` ⟨GREP⟩ `| sibling | mtime at this seat's read | stage | how this file may cite it |`
**Current bytes** (the live table, every row at a round-4 clock, the policy column reading *"quoted by command, prose + figures"*, no struck label and no dated qualifier):

```
`KF-W0.md` | 2026-08-28 16:58:59   `KF-W1.md` | 2026-08-28 17:00:23 | 1 (final)
`KF-W2.md` | 17:02:55   `KF-W3.md` | 16:56:52   `KF-W4.md` | 16:59:44   `KF-W5.md` | 16:55:55
`KF-W6.md` | 16:59:25   `KF-W7.md` | 15:39:04   `KF-W8.md` | 15:50:14   `KF-W9.md` | 15:39:31
```

**Exact replacement** — **strike the table AS AUTHORITY, preserve it as a dated record, re-point the stamp authority** (the cure `KF-W1.md` already performed at its §13, and `KF-W8.md:24` at its ledger header — the proven form, applied at one seat of seven). Prepend to the table header:

```
⟨***DATED ROUND-4 READING, STRUCK AS A LIVE CLAIM AT REPAIR ROUND 6 — LAW E(4) retires per-seat substrate stamping, and this is the class's largest single instance in the tree (PASS-6 KF-W1 check D6-5, MAJOR; union U6-C). EVERY ROW BELOW IS FALSE AT FINAL BYTES: all eleven specs are 2026-08-29 15:17:38+, and the `KF-W1.md` row is labelled "1 (final)" of bytes superseded TWICE (true final: 2026-08-29 15:17:38 / 250,457 B). The table is preserved as the round-4 record it was, is cited by no cell, and grants no figure. THE STAMP AUTHORITY OF RECORD IS `PASS-6/CLOSE-CERT-6.md` §9's hash bracket — the one instrument in the program whose figures are a challenge to the future rather than a claim about the past. Nothing load-bearing moves: every anchor these stamps accompany resolves, and this seat byte-diffed this file's quotation of `KF-W1.md`'s cross-edge 9 at `:584` against `KF-W1.md:376` — EXACT.***⟩
```

**Same edit, second stamp**: `:581`'s §6.D minting-citation block ⟨GREP⟩ `⟨`stat` → `KF-W4.md` **16:59:44** · `KF-W1.md` **17:00:23**⟩` — **delete the parenthetical stamp entirely**, leaving *"quoted by command at both sources' post-round-4 STAGE-1 bytes"* re-cut to *"quoted by command at both sources' bytes, with the quotation's verification of record at `PASS-6/CLOSE-CERT-6.md` §9"*.

---

#### C-34 · [W3 D-2 · MAJOR] — the INBOUND row-2 cell's pre-repair sibling figures and mtime

**Anchor**: `:529` ⟨GREP⟩ `mtime **16:56:52**; `grep -c 'KF-HA-19' KF-W3.md` → **10 matching lines / 15 occurrences**`
**Exact current bytes:**

```
mtime **16:56:52**; `grep -c 'KF-HA-19' KF-W3.md` → **10 matching lines / 15 occurrences**
```

**Exact replacement bytes** (old→new: **all three figures are the round-4 state** — measured at `KF-W3.md`'s final bytes this seat: mtime `2026-08-29 15:17:38` / 187,109 B, not `16:56:52` / 168,078 B; `grep -c` → **12**, not 10; `grep -o | wc -l` → **18**, not 15. Per §6.1's corrected order W3 wrote at 18:50:14 and this file at 19:13:55, **twenty-three minutes later**, and this file writes LAST of the per-wave seats precisely so it can measure final bytes. LAW E(4) forbids the mtime, the two figures and the quoted sibling heading outright):

```
⟨**anchor-only per LAW E(4), re-cut at repair round 6 — PASS-6 KF-W3 check D-2, MAJOR**⟩ **`KF-W3.md` §Cross-edges, the KF.W10 row** — the reciprocal of the seam W3 declares, cited by §-heading + row id alone. ⟨***the round-4/5 cell's sibling mtime ~~16:56:52~~ and its two sibling figures ~~10 matching lines / 15 occurrences~~ are STRUCK: all three were the ROUND-4 state (true at final bytes: 2026-08-29 15:17:38 / 187,109 B; 12 lines / 18 occurrences), and the falsification is causally downstream of W3's own anti-drift note, which existed to hand this cell the post-repair figure and handed it the pre-repair one. LAW E(4) retires per-seat cross-wave receipts to anchor-only — no quoted sibling prose, no line numbers, NO PER-SEAT MTIME STAMPS — and this cell carried all three. A pasted sibling numeral in an INBOUND table row is the most legible member of the cert's class (iii), and it survived a 418-token sweep in the most-worked file of the round (238 receipts checked / 20 fixed).***⟩
```

---

## BATCH-TAIL — everything else, grouped by file (79 edits)

Files in this batch: `KF-W0.md` (6) · `KF-W2.md` (13) · `KF-W3.md` (4) · `KF-W4.md` (12) · `KF-W5.md` (11) · `KF-W7.md` (15) · `KF-W8.md` (10) · the new `PASS-6/RULINGS-6.md` (8). Every edit is one anchored substitution or one anchored insert.

---

### `docs/tranches/X/keyframes/waves/KF-W0.md` — six edits

#### T0-01 · [W0 D-1 · MAJOR — **HARD ESCAPE 1, LANDED**] — the `OP-4` locus-probe row

**Anchor**: §Carry, immediately after the `C-1.R` block ⟨GREP⟩ `Membership receipt, re-run this seat`
**Byte receipt at this file's final bytes**: `grep -c 'OP-4'` → **0** · `grep -c 'B-16'` → **0** · `grep -ci 'locus'` → **0** · `grep -c 'parseAnimationCSS'` → **1** (`:697`, an OUTBOUND row that asserts the probe's ANSWER without running it).
**The obligation, quoted from both declaring ends**:
⟨`KF-W5.md:66`, its own open-questions table, fourth column⟩ — *"| **OP-4** | **The `parseAnimationCSS` LOCUS.** … | **UNRESOLVED.** | **W0 runs `git grep -n 'parseAnimationCSS' -- src demo` at `81a56990` and prints declaration sites.** Both dispositions pre-declared (§Carry B-16) so the row cannot be lost either way. |"*
⟨`KF-W8.md:256`, §Carry⟩ — *"| **B-16 shadow-name** — inbound from KF.W5, R-19c(iv) | **BOOKED CONDITIONAL** — arms **if and only if KF.W0's `OP-4` locus probe resolves demo-side** | …"*
**Insert as a new §Carry row:**

```
- **`OP-4` — THE `parseAnimationCSS` LOCUS PROBE, RECEIVED AND BOOKED AT REPAIR ROUND 6** ⟨inbound anchor, anchor-only per LAW E(4): **`KF-W5` §Open Questions, the `parseAnimationCSS` LOCUS row**; and **`KF-W8` §Carry, row `B-16` (shadow-name, BOOKED CONDITIONAL)**⟩ — **this wave RUNS the probe and PRINTS the declaration sites; it does not decide the home.** Both dispositions are pre-declared at the commissioning end, so the row cannot be lost either way: demo-side resolution ARMS `KF-W8`'s `B-16`; src-side resolution leaves it unarmed. **The act, verbatim as commissioned**: `git grep -n 'parseAnimationCSS' 81a56990 -- src demo`, output pasted literally and dated, per §Scope 5 (command + literal output). **Why this row exists (PASS-6 D-1, MAJOR — the round's hard escape 1)**: the act was assigned to this wave BY NAME from two sibling ends and reached no cell, no §Bounds row and no seat here, while `§Sequencing`'s outbound row asserted the probe's ANSWER — *"Engine work, not substrate work"* — without running it. An obligation named from two sibling ends and held by neither is a hard escape under the pass-3 precedent, and it survived five rounds because `CLOSE-CERT-2` §1 swept its class by TOKEN COUNT (418 tokens, class (iii)) rather than by whether the named actor books the act.
```

---

#### T0-02 · [W0 D-1 · MAJOR, half 2] — the probe's landing surface: bounds row + seat

**Anchor**: `:334` ⟨GREP⟩ `| create (SCH-1..7 + X-2, command + literal output per row) |`
**Exact current bytes:**

```
| create (SCH-1..7 + X-2, command + literal output per row) |
```

**Exact replacement bytes** (an act with no bounds row and no seat is an act the wave cannot perform — axis (4)'s own test):

```
| create (SCH-1..7 + X-2 **+ OP-4's locus probe, added at repair round 6 (PASS-6 D-1)**, command + literal output per row) |
```

**Same edit, the seat**: §Agent Units currently has five seats (`OP-1` · `.b` · `.c` · `.d` · `.e`) and none owns the act. Append to unit **`.d`**'s charter: *"**and OP-4's `parseAnimationCSS` locus probe — `git grep -n 'parseAnimationCSS' 81a56990 -- src demo`, output pasted literally into `COUNTS-*.md`; this seat MEASURES and does not decide the home (KF.W8's `B-16` arms on the measurement, not on this seat's reading)."*

---

#### T0-03 · [W0 D-1 · MAJOR, half 3] — `:697`'s engine-lane assertion, re-cut to route without pre-empting

**Anchor**: `:697` ⟨GREP⟩ `**Engine work, not substrate work — named so the reconciliation does not absorb them.**`
**Exact current bytes:**

```
**Engine work, not substrate work — named so the reconciliation does not absorb them.**
```

**Exact replacement bytes** (the row routes the CURE and, in doing so, asserted the LOCUS — one step worse than the `L-M-9` miss round 5 cured, because the assertion contradicts the commissioned measurement in direction):

```
**Routed as engine work rather than substrate work — named so the reconciliation does not absorb them. ⟨*This row routes the CURE and does NOT resolve the LOCUS: `OP-4`'s probe is booked at §Carry and run by unit `.d`, and its pasted output — not this row's routing — is what arms or leaves unarmed `KF-W8` §Carry's `B-16`. Re-cut at repair round 6, PASS-6 D-1: the round-5 spelling asserted the probe's answer in a wave whose entire method is command-plus-literal-output, without the id, without the command, and without a landing surface.*⟩**
```

---

#### T0-04 · [W0 D-2 · MAJOR] — C-1.R row 7's membership receipt, both figures one short

**Anchor**: `:453` ⟨GREP⟩ `thirty-four records fold F-1 to KF.W0 under a banked id; thirty-three carry a **C-1.F** row (13) or a **C-1.G** row (22 — `kf-SequencePlayhead` twice); `kf-KeyframesStringControls` was **the single`
**Exact current bytes:**

```
thirty-four records fold F-1 to KF.W0 under a banked id; thirty-three carry a **C-1.F** row (13) or a **C-1.G** row (22 — `kf-SequencePlayhead` twice); `kf-KeyframesStringControls` was **the single omission**
```

**Exact replacement bytes** (old→new: `33` → **34** carriers, `34` → **35** fold denominator; counted at the bytes by row-subject — the ⟨record : line⟩ in each row's *Banked id* cell, never by rider text):

```
**COUNTING RULE, at the receipt (R5-11(1)): one record = one row-SUBJECT, the ⟨record : line⟩ of the row's Banked id cell; rider text inside a cell names further records and is NOT counted.** **34 records** carry a **C-1.F** row (**13 rows → 13 distinct subjects**: kf-DemoGlobalChrome · kf-EasingTarget · kf-EasingSidebar · kf-EasingScene · kf-KeyframesEditor · kf-TimingFunctionPanel · kf-AnimatedText · kf-ChannelOptions · kf-ChromeDock · kf-CSSPasteDialog · kf-KeyframesAddDialog · kf-KeyframeCardList · kf-App.skeleton) **or** a **C-1.G** row (**22 rows → 21 distinct subjects**, `kf-SequencePlayhead` at rows 14 and 15); the two tables are DISJOINT (`comm -12` over the two subject sets → **∅**, run this seat), so **13 + 21 = 34 carriers**; with `kf-KeyframesStringControls`, **the single omission** — verified absent as a row-subject in BOTH tables — **the fold set is 35** ⟨***CORRECTED AT REPAIR ROUND 6, PASS-6 D-2: the round-5 spelling ~~"thirty-four records fold … thirty-three carry"~~ was one short in BOTH figures, and it was short in a way the row itself makes checkable — it prints its own operands (13 and 22) and its own duplicate one clause away from the total that does not close over them. It is also a PROVENANCE failure: the sentence was inherited verbatim from `PASS-5/KF-W0-CHECK.md` §1 E-1 while carrying the label "re-run this seat". THE CONCLUSION HOLDS — the booking is correct — and only the arithmetic was false.***⟩
```

---

#### T0-05 · [W0 D-4 · MINOR] — the `78` dependent cell, replaced by a pointer

**Anchor**: `:357` ⟨GREP⟩ `and the two new rows are counted in the 78 above`
**Exact current bytes:**

```
and the two new rows are counted in the 78 above
```

**Exact replacement bytes** (old→new: a re-issued numeral → a pointer, per LAW D(3), *"dependent cells point at the enumeration rather than re-issuing the numeral"* — this file's own round-1 law; the denominator above now reads **79**, re-counted this round with its rule and its `+1` delta declared, and `78` is round 4's, correct for round 4's tables and left standing under a round-5 re-count):

```
and the two new rows are counted **in the denominator stated at this preamble's enumeration above** (round 4's figure was 78; this round re-counts it to **79**, the single addition being C-1.R row 7 — a pointer, never a re-issued numeral, per LAW D(3) and this file's own round-5 altitude rule that *"a cure landed in one place and left standing in another is RELOCATED, not repaired"*; corrected at repair round 6, PASS-6 D-4)
```

---

#### T0-06 · [W0 D-5 · MINOR] — the LAW-B citation re-pointed to the artifact of record

**Anchor**: `:357` ⟨GREP⟩ `and still found routed 121 · booked 114 · escaped 7`
**Current split, measured** (`grep -oE 'PASS-[0-9]/KF-W0-CHECK\.md' KF-W0.md | sort | uniq -c`): **PASS-1 1 · PASS-2 1 · PASS-3 8 · PASS-4 9 · PASS-5 3** — five passes cited, PASS-4 dominant, and the load-bearing LAW-B discharge on the oldest-but-one. **This is the widest split in the program**, and R5-9 row 1's cure was executed at KF-W1 (20 sites), KF-W3 (16) and KF-W9 (18) and never assigned here.
**Exact replacement of the §Carry preamble's LAW-B measurement clause:**

```
the id-keyed carriage of these tables is measured at `docs/tranches/X/keyframes/conformance/**PASS-6**/KF-W0-CHECK.md` §1/§2 (2026-08-29) — **the artifact of record, re-pointed at repair round 6 (PASS-6 D-5); one artifact of record, and the class made greppable by `grep -n 'PASS-[0-9]/KF-W0-CHECK' KF-W0.md`** — which measured **routed 116 · booked 115 · escaped 1**, the escape being `OP-4`'s locus probe (booked at §Carry this round, `T0-01`). ⟨***the round-5 spelling cited `PASS-4/KF-W0-CHECK.md` §0/§1/§3 and its "routed 121 · booked 114 · escaped 7" — a census PASS-5 superseded by 21 pairs (100 · 97 · 3) and PASS-6 superseded again. The PASS-1/PASS-2/PASS-3/PASS-4 readings survive ONLY where explicitly dated as history and are never re-pointed; the load-bearing LAW-B discharge cites the freshest pass and nothing else.***⟩
```

---

### `docs/tranches/X/keyframes/waves/KF-W2.md` — thirteen edits

#### T2-01 · [W2 D-1 · MAJOR · LAW G instance 11] — the ENGAGED-RECORD table's counting rule re-cut to the set actually swept

**Anchor**: `:886`-band ⟨GREP⟩ `Seven records; seven rows`
**Exact current bytes** (the rule, then the figure):

```
a record enters this table iff (i) this file books ≥1 cell from it or cites ≥1 of its ids, AND (ii) it carries no row in the ten-record read-reason table above.* **Seven records; seven rows.**
```

**Measured this seat**: `grep -oE '⟨kf-[A-Za-z.]+' KF-W2.md | sed 's/⟨//' | sort -u | wc -l` → **49** records cited by banked-id anchor, of which **kf-EasingSidebar** is the one that also carries a ten-record read reason → **48** satisfy (i) ∧ (ii); the rule's weaker clause (`grep -c '<record-stem>' KF-W2.md > 0`) returns **58**, i.e. **48** after clause (ii). **Either reading returns 48; neither returns 7. Shortfall 41.**
**Exact replacement bytes:**

```
a record enters this table iff (i) this file books ≥1 cell from it or cites ≥1 of its ids, AND (ii) it carries no row in the ten-record read-reason table above.* **THE RULE'S SET IS 48 RECORDS; THIS TABLE SWEEPS SEVEN OF THEM AND SAYS SO** ⟨***RE-CUT AT REPAIR ROUND 6 UNDER LAW G, PASS-6 D-1 (the pass's headline): the round-5 figure ~~"Seven records; seven rows"~~ was stated under a rule describing a set SEVEN TIMES LARGER. Measured: `grep -oE '⟨kf-[A-Za-z.]+' KF-W2.md | sed 's/⟨//' | sort -u | wc -l` → 49 records cited by banked-id anchor, minus kf-EasingSidebar (the one that also carries a ten-record read reason) = 48 satisfying (i) ∧ (ii); the weaker clause returns 58, i.e. 48 after (ii). **The seven rows are PASS-5's escape-host list — its D-15 named five and round 5 added kf-TypingDots and kf-KeyframeCard — and they are declared as exactly that.** THE OUTSTANDING COUNT IS NAMED: **41 records remain undispositioned at any level**, which fires this file's own `G-W2-1` falsifier (*"the gate reds if any record is dispositioned at the RECORD level rather than cell by cell"*) forty-one times over, and three of the four hosts of this pass's escapes are among the 41. A receipt may under-deliver; it may not under-deliver behind a rule that says otherwise. **The 41 are swept at wave-open, one line each — most reading "no remaining cell in this register's subject matter", exactly as kf-EditorStartScreen's and kf-LayerConfigPanel's already do.**⟩
```

---

#### T2-02 · [W2 D-2 · MAJOR · ESCAPE E1] — `KF-ET-1` named at the kf-EasingTarget engaged row

**Anchor**: the kf-EasingTarget engaged row (currently lists `KF-ET-2` · `KF-ET-28` · `Z5` as taken and dispositions exactly one remaining cell, `KF-ET-32`); and §Carry F0 ⟨GREP⟩ `one spec with KF-ET-1`
**Current bytes**: `KF-ET-1` occurs **3×** in this file — `:279` (KF-TFP-18's disposition), `:433` (inside KF-ET-2's paragraph), `:895` (the kf-TimingFunctionPanel engaged row) — **every one naming it as another cell's landing surface; none stating its relation to this register.**
**Insert into the kf-EasingTarget engaged row:**

```
**`KF-ET-1`** ⟨kf-EasingTarget:37⟩ — **READ, NOT BOOKED, and its relation stated (added at repair round 6, PASS-6 D-2 · escape E1).** Two limbs make it this register's subject twice over: **(i) an EXECUTED value.js serializer measurement** — *"17 of 28 tiles copy a curve with Δ > 0 against the one painted (max 0.158 end-to-end, `ease-in-out-circ`; 7 via registry order + rounding, **10 via `cubicBezierToString`'s `toFixed(2)` alone** — 15 of 23 quads round, each by exactly 0.005, 10× the sidebar's own `quadEq` tolerance)"* — an INPUT to `G-W2-7`'s fidelity net, the same argument that adopted Z2 and entered KF-TFP-18; **(ii) a value.js entry-point-contract ask at the seam `G-W2-6` publishes** — *"value.js needs a lossless timing-function serializer twin for `parseTimingFunction`, and `easing()`'s analytic-first resolution order documented in the `.d.ts`"*, cross-referenced to the V·π parser-proof round-trip concern. **The actionable rider is LANDED, anchor-only: `KF-W5` §Carry Arm B row `B-22 · KF-ET-1` (rider letters only).** The row itself is **NO-WAVE-OWNER, cure-locked by `KF-ET-2`, which this file books** — and F0's lock is a lock ON THIS ROW. ⟨***why: pass-5 D-6 convicted the absence of a read reason for `KF-ET-32`; round 5 wrote one and named its two landed legs by id, and did not perform the identical act for the id sitting four lines above it in the same record. This file's own Y7 lesson: "A lock carried without its instance is M-25's letter over its fact."***⟩
```

**Same edit, at F0** ⟨GREP⟩ `one spec with KF-ET-1`: append *"— **and `KF-ET-2`'s cure-lock is a lock ON `KF-ET-1`, which is named at the kf-EasingTarget engaged row with its relation to this register stated (repair round 6, PASS-6 D-2)**"*.

---

#### T2-03 · [W2 D-3 · MAJOR · ESCAPE E2] — kf-KeyframesEditor ruling 9 carried as F3's sixth positive reference row

**Anchor**: §Carry F3's positive block (five reference rows, none in `src/`); row 19 is `KF-KE-2 · L-B1 + D-2(read) + C-M3` ⟨kf-KeyframesEditor:41⟩.
**Current bytes**: `grep -c 'frame-compiler' KF-W2.md` → **0**; `grep -c 'consumer defect' KF-W2.md` → **0**.
**Insert as F3's sixth positive reference row (outside the count, per the block's own discipline):**

```
- **⟨kf-KeyframesEditor ruling 9, `:153`⟩ — the qualifier that makes row 19 a CONSUMER defect, carried verbatim (added at repair round 6, PASS-6 D-3 · escape E2)**: *"**The engine's selector guard (`frame-compiler.ts:135-168`)** (reader-2's addition, adopted) — **fail-explicit, total, correctly frozen; what makes KF-KE-2 a consumer defect, not a library one.**"* **Load-bearing in three directions**: **(i) M-25 depth** — the fold, the lock and the qualifier travel with the row (the discipline round 5 restored at Y2's `L-13` clause); without it row 19 reads as a LIBRARY posture in a registry whose entire subject is where library and consumer meet. **(ii) A positive posture over a parse path at a module this wave OWNS** — `src/animation/compile/frame/compiler.ts` is a §Bounds `modify-carve` row (*"`:146` calls kf's own `parseKeyframeSelector` — the façade's first natural consumer"*), and its guard is *fail-explicit, total, correctly frozen*: the shape the façade is being built to generalise, measured at the exact module the façade's first consumer lives in. **(iii) It corroborates `G-W2-6`'s frozen-parse clause from the LIBRARY side** — *correctly frozen* is the same invariant `value4-immutable-resolve.test.ts` pins at `:43`/`:67`/`:84`.
```

---

#### T2-04 · [W2 D-4 · MAJOR · ESCAPE E3] — `KF-KE-58` booked as F3 row 20

**Anchor**: §Carry F3, after row 19; the block's floor moves **19 → 20**.
**Current bytes**: `grep -c 'KF-KE-58' KF-W2.md` → **0**, and **0 across all eleven specs** — a banked cell with no home in the authored eleven.
**Insert as F3 row 20, at the bank's disposition, no cure moved:**

```
| **20** | **`KF-KE-58 · C-m7`** ⟨kf-KeyframesEditor:103⟩ | *"three async engine calls **opt out of the closure's own `withErrorToastAsync` contract** (`:45`, `:210`, `:280`); no `app.config.errorHandler`. Reachability honestly UNPROVEN; **the asymmetry is the row.** KF-KE-4 raises the stakes note adopted: with Apply inert, an unhandled rejection here can be a user's only signal."* | **absence-of-posture over an engine-bearing path** — `withErrorToastAsync` is the house idiom this file books as positive row **★ S-7**, and the three calls are ENGINE calls that reach the grammar through `loadAnimationEngine` | **→ KFED-UNIT** (the bank's disposition, carried; reachability UNPROVEN carried verbatim; **no cure moved, no re-grade**) |
```

**Rationale to record at the row** (this register's own precedent): F3 **row 10** books kf-KeyframesStringControls `C-2` on exactly this shape — *"the pane's only content-production path is unguarded over a throwing, value.js-bearing serializer … only the mount path is bare"* — with the bank's disposition *"absence-of-posture → NO-WAVE-OWNER; reachability → KF.W3"*. **An unproven reachability does not disqualify an absence-of-posture row; it SPLITS it.** Added at repair round 6, PASS-6 D-4.

---

#### T2-05 · [W2 D-5 · MAJOR] — the D-8 cure's three pastes, re-run with the file's own working idiom

**Anchor**: `:147-158`, the binding-convention derivations.
**Three corrections, old→new:**

1. **`awk 'NR>=12 && NR<=16'` emits no line numbers**, yet both pasted blocks print `12| `, ` 2| ` prefixes. **Replace both commands with this file's own working idiom, nineteen lines below at census A-2**: `awk 'NR>=12 && NR<=16 {printf "%d| %s\n", NR, $0}'` — which does produce them.
2. **The second paste is TRIMMED.** Stated: `git show 81a56990:test/demo/instrument/value4-editor-boundary.test.ts | awk 'NR>=2 && NR<=6'` → three lines shown (`2`, `5`, `6`). **The command returns FIVE**; `:3` (`    requireKeyframeSelector,`) and `:4` (`    selectorPercent,`) are dropped **without an elision mark**. **Transcribe all five.**
3. **The third names an unrunnable path**: `git show 81a56990:demo/…/composables/useKeyframeOps.ts` — **the `…` is not a path.** **Spell it whole**: `git show 81a56990:demo/components/instrument/timeline/composables/useKeyframeOps.ts`.

**What survives and is not re-derived**: the specifier/symbol convention is correct, `timelineEngine.ts:16` (symbol `:15`) and `value4-editor-boundary.test.ts:6` (symbol `:5`) are exact, and the third consumer's assertion at `:26` is verbatim. **The cure whose whole subject is that an instruction must be re-derivable is the cure that was not re-derivable** — and it arms `G-W2-6`'s own falsifier one clause over (*"fails if any pasted census in this clause is not reproduced by re-running its own command"*).

---

#### T2-06 · [W2 D-6 · MINOR] — the A-2 site receipt's post-condition, stated in the units its rule declares

**Anchor**: the round-5 A-2 site receipt ⟨GREP⟩ `All nine are re-cut to `:137-146` at repair round 5 except the round-4 ledger's own occurrence`
**Measured at the closing bytes with the receipt's own command**: `perl -ne '$c=()=/136-144/g; $t+=$c; END{print $t+0}' KF-W2.md` → **9 occurrences**; `grep -c '136-144' KF-W2.md` → **6 lines**. The receipt's post-condition implies **1**. The nine survive at `:164` (×3, the A-2 strike block), `:189` (the receipt's own quoted command), `:191` (the SHADOW row), `:962` (×2, the round-4 ledger — the one the exception names), `:968`, `:992`.
**Exact replacement of the post-condition clause:**

```
**POST-CONDITION, in the units the rule declares (re-cut at repair round 6, PASS-6 D-6): LIVE spellings of the destructive span — 0 of 9 remain, every live spelling is `:137-146` (14 occurrences over 13 lines) and no seat can execute `136-144`. NARRATIVE / STRIKE occurrences — 8 minted by round 5's own sentences ABOUT the old spelling (`:164` ×3 · `:189` · `:191` · `:968` · `:992`), plus 1 retained under E-3 at the round-4 ledger (`:962` ×2 is that ledger's line). Closing measurement: `grep -c '136-144' KF-W2.md` → 6 lines / 9 occurrences.** ⟨***the round-5 spelling counted only the sites it RE-CUT and stated a post-condition its own command refutes; the SUBSTANCE was cured and only the receipt was not.***⟩
```

---

#### T2-07 · [W2 D-7 · MINOR] — the shadow ledger's falsifier, scoped to the bytes it measures

**Anchor**: LAW F(2) act **2** ⟨GREP⟩ `never cited outside this gate`
**Exact current bytes:**

```
the struck superlative was **never cited outside this gate** (`grep -n 'only banked instance' KF-W2.md` **is the check**)
```

**Exact replacement bytes** (run at the closing bytes the command returns **3 lines** — `:728` inside `G-W2-5`'s strike note, `:970` the repair-round-5 ledger, `:991` the shadow-ledger row itself; **two of the three are outside the gate, both minted by the round that published the check**):

```
the struck superlative was **never cited outside this gate AT THE PRE-STRIKE BYTES the claim is about** (`grep -n 'only banked instance' KF-W2.md` run against the pre-strike file **is the check**; run against the POST-strike file it returns **3 lines** — `:728` the gate's own strike note, `:970` the repair-round-5 ledger, `:991` this ledger row — of which two are round-5's own sentences about the strike. **A check must name the bytes it is run against; corrected at repair round 6, PASS-6 D-7, the same class and the same cure as D-6.**)
```

---

#### T2-08 · [W2 D-8 · MINOR · ESCAPE E4] — the bank's concurring reading of `parseAnimationCSS`'s invariant

**Anchor**: §Bounds' census cell ⟨GREP⟩ `the single-grammar-authority invariant already stated in the tree`
**Current bytes**: the cell quotes the **tree** docblock only; `grep -c` for the bank's reading → **0**.
**Insert immediately after the tree-docblock quotation:**

```
 **AND THE BANK CONCURS, WITH A LIMB THE COMMENT DOES NOT CARRY** ⟨kf-KeyframesEditor `:152`, added at repair round 6, PASS-6 D-8 · escape E4⟩: *"**`parseAnimationCSS`'s kept invariant + `withErrorToastAsync`** (reader-2's addition, adopted) — one grammar authority, no regex pre-detection, **structured diagnostics converted to typed errors, Retry actions**; why KF-KE-58 is an asymmetry rather than a missing posture."* **The relation is one this file already named and used one round ago**: `S-B` was entered into the corpus-side arm precisely because *"A-2 is stronger with it than without it — without it the Tier-C re-cut rests on one seat's graph read, and with it two independent readings concur."* The affirmative cite at §Bounds rested on ONE seat's read of a comment; the bank read the same module and agrees, adding the **diagnostic-surface fact `G-W2-6`'s contract owes** (structured diagnostics → typed errors + Retry). It also names **`KF-KE-58`** as its own consequence — booked at F3 row 20 this round (`T2-04`).
```

---

#### T2-09 · [W2 D-9 · MINOR · ESCAPE E5] — `KF-AV-8`'s folding id named at the §Excluded `KF-CE-12` clause

**Anchor**: §Excluded ⟨GREP⟩ `KF-CE-12's body` (the clause excluding *"the `@src/animation/resolve/browser` deep import … **KF.W8's**; the depcruise gate arm is **KF.W4's**"*)
**Current bytes**: `grep -c 'KF-AV-8' KF-W2.md` → **0** (it landed at `KF-W8.md` ×11 and `KF-W4.md` ×2, verified). **The FOLD TARGET is dispositioned by id; the FOLDING id is not** — the `L-13` shape `D-16` cured at Y2, under which a later seat reading a zero-occurrence id cannot tell a fold from a drop.
**Insert immediately after the `KF-CE-12` clause:**

```
 ⟨***the FOLDING id is named at repair round 6, PASS-6 D-9 · escape E5: **`KF-AV-8 · L·M-5 = C-3 (+ C-16)`** ⟨kf-AnimationVisualizer:49⟩ folds by reference to `KF-CE-12` and carries the qualifier that makes it this register's business — *"the lone deep `@src` import breaches the demo's own written law … and **the target module is value.js-bearing, parser-touching, and side-effectful at module eval**"*, with the proof re-run at the bank (`browser.ts` imports `@mkbabb/value.js/{value,css}` and installs the module-eval `window.resize` listener). **A demo-side module whose deep-import target is parser-touching and side-effectful at module eval is a GRAPH-ENTRY FACT about a value.js parse-surface module** — the same class as `KF-ET-32`'s link-not-call, which round 5 entered into the corpus-side arm as a qualifier on `G-W2-2`'s census. Landed: `KF-W8.md` (×11) and `KF-W4.md` (the depcruise-over-demo gate arm, ×2); this file names the fold and books nothing.***⟩
```

---

#### T2-10 · [W2 D-10 · MINOR · ESCAPE E6] — a kf-EasingScene engaged row, so the rule that disqualifies `SUP-2` is stated for the record it applies to

**Anchor**: the seven-row engaged-record table (`T2-01`'s table).
**Current bytes**: **kf-EasingScene has no engaged row**, and `grep -c 'SUP-2' KF-W2.md` → **0**.
**Insert as an engaged row:**

```
| **kf-EasingScene** | **`SUP-2` — READ AND CORRECTLY OUT OF SUBJECT, stated here because the rule was written for one record and not for the record it applies to (added at repair round 6, PASS-6 D-10 · escape E6)** | ⟨kf-EasingScene `:131`⟩ *"the value.js consumption is the model the glass-ui consumption is not: **subpath-only, real named exports, exact-pinned 4.0.0, reproducible under `npm ci`** — the precise inverse of F-1 in the same tree."* | **OUT, by this file's OWN rule** — written at round 5 in kf-EditorStartScreen's engaged row: *"a correct-consumption positive over a subpath edge is not a posture, not an ingress and not a boundary negative … this file does not book exemplars into a floor."* **No remaining cell in this register's subject matter.** ⟨***this row is D-1 measured in a single cell, and the cheapest possible demonstration that the 41-record gap is a live liability rather than a formality: the file already knew the answer and had nowhere to write it.***⟩ |
```

---

#### T2-11 · [W2 D-11 · MINOR] — `COHESION §0d` cited beside the `KF-W10 §6.D` anchor

**Anchor**: §Sequencing ⟨GREP⟩ `Anchor-only under LAW C(3)`
**Current bytes**: `grep -c '§6.D' KF-W2.md` → **4**; `grep -c '§0d' KF-W2.md` → **0**. A seat reading this cell today cannot verify the three mints without opening a file the law forbids it to quote.
**Insert immediately before the `Anchor-only under LAW C(3)` clause:**

```
**The same fact is carried in THIS REPO's own bytes and is measurable by this seat** — `docs/tranches/X/COHESION.md` **§0d** ⟨`:185`⟩, *"**ADDENDUM 2026-08-28 (later still) — THE MINTED-UNAUTHORED SUCCESSOR WAVES, DECLARED AT THE BOUNDARY**"*: *"**KF.W11 · KF.W12 · KF.W13 — MINTED … UNAUTHORED; cargo = the 17-packet partition 9+6+2 with the six travelling locks; authoring seat = the SS-1/SS-2 authoring block** … The successor register of record is `keyframes/waves/KF-W10.md §6.D`; **mechanism F (minted-wave roster census diffed against authored specs ∪ the register) is adopted program-wide — a mint with neither is a hard escape on sight.**"* ⟨***added at repair round 6, PASS-6 D-11: this is the pass-4 D-1 cure applied at one site and not the other — that cure's whole content was "where a stage-2 fact is load-bearing here, its evidence is re-sourced to an artifact this seat can measure", and it was performed exactly for the relay vehicle against COHESION §4a at `:116`/`:129`. Mechanism F's sentence is a falsifier this wave's routing to three unauthored waves should be carrying anyway.***⟩
```

---

#### T2-12 · [W2 D-12 · MINOR + U6-C member] — the three retained round-4 "FINAL BYTES" stamps, converted

**Anchor**: the three retained stamps ⟨GREP⟩ `RE-VERIFIED AT KF-W6` (and the sibling cells for KF-W3 and KF-W4); plus the live stamp at `:23` ⟨GREP⟩ `mtime **2026-08-28 15:43:45**`
**Measured at the siblings' current bytes, old→new:**

| retained stamp asserts | measured now |
|---|---|
| `grep -n 'Taxonomy (binding' KF-W6.md` → **`:35`** | **`:37`** |
| `grep -n 'KF-HA-13' KF-W6.md` → **`:398`, `:406`** | **`:440`** (one hit; `:432` is KF-HA-3) |
| `sed -n '1p' KF-W3.md` → the gated heading | **identical ✓** |
| `grep -n 'G-KFW4-1\b' KF-W4.md` → gate at **`:205`** | **`:206`** |

**Exact replacement of all three stamp cells, and of `:23`** — the honest form D-7 already drafted for the two it struck:

```
**re-verified after the last per-wave write; the anchors hold (the §-heading, the row id, the gate id, all re-resolved) and NO COORDINATE IS RE-ISSUED** ⟨***converted at repair round 6, PASS-6 D-12 + PASS-6 KF-W3 check D-4: round 5 struck the two stamps that were unperformable BY CONSTRUCTION (W5, W8) and retained three (W6, W3, W4) on the test that "each sibling's round-4 write preceded this file's" — and the retained cells still read "RE-VERIFIED AT KF-W6's FINAL BYTES" about a file written twice since. The one live stamp at `:23` ("substrate `KF-W3.md`, mtime 2026-08-28 15:43:45") is struck in the same motion: W2 WAS directed at D-7 to convert "the two RE-VERIFIED stamps → anchors", converted two and left this one — instance-not-scope, again. THE STAMP OF RECORD FOR THE PROGRAM IS `PASS-6/CLOSE-CERT-6.md` §9's hash table, which reproduces.***⟩
```

---

#### T2-13 · [W2 D-13 · MINOR] — kf-EditorHeader's read reason, the one sentence this file owes

**Anchor**: §Excluded's ten-record read-reason table.
**Current bytes**: this file books **X2 · `C S-A`** ⟨kf-EditorHeader:95⟩ as the corpus's method exemplar for a declined R1 claim, and **kf-EditorHeader appears in neither the ten-record read-reason table nor the seven-row engaged table.**
**Insert as a read-reason row:**

```
| **kf-EditorHeader** | **READ for `X2 · C S-A`** ⟨:95⟩ — *"proving a negative: **the full import-closure walk that DECLINED an R1 parser-crash claim**"* — this register's R1 METHOD EXEMPLAR. **Its remainder is not empty and is not quiet, and is correctly NOT this register's**: `EH-4` · `EH-5` · `EH-8` were dropped at round 4 on a hosting premise and **RESTORED LIVE at KF.W6 repair round 5 under RULINGS-5 R5-1 (BLOCKER)** — verified at `KF-W6.md:455-462`, *"three rows, three anchors, all in SURVIVING §Bounds files"* — and all three are **a11y/sizing rows, KF.W6's business, not a parse-façade register's**; the six NO-WAVE-OWNER `EH-*` ids are KF.W10's `G-2` terminal sweep (mechanism-D row 10, round 6). **No cell of this record is booked here and none is owed.** ⟨***added at repair round 6, PASS-6 D-13: a record that hosted the round's program-wide BLOCKER, and from which this register books its R1 method exemplar, should not be the record whose remainder is inferable only by a reader who opens KF-W6. D-1 with a named consequence.***⟩ |
```

---

### `docs/tranches/X/keyframes/waves/KF-W3.md` — four edits

#### T3-01 · [W3 D-1 · MAJOR] — the anti-drift note's own figure, re-run at final bytes

**Anchor**: `:310` ⟨GREP⟩ `raises `grep -c 'KF-HA-19' KF-W3.md` from the **4**`
**Exact current bytes** (the figure clause):

```
to **10** at this file's stage-1 bytes (**re-run at write time, 2026-08-28**)
```

**Exact replacement bytes** (old→new: **10 → 12 matching lines / 18 occurrences**, with the two round-5 lines that moved it named; the `10` is the round-4 stage-1 reading, exactly what PASS-5 §3.2 measured on the 168,078-byte round-4 file, and the round-5 stage-1 write at 18:50:14 added `:193` — the LAW F round-5 shadow ledger's *"E-15's `26 + KF-HA-19 = 27` denominator"* — and `:338`, the R5-13 emphasis disclosure):

```
to **12 matching lines / 18 occurrences** at this file's FINAL bytes (`grep -c 'KF-HA-19' KF-W3.md` → 12; `grep -o … | wc -l` → 18; lines `:193 :256 :310 :333 :335 :337 :338 :339 :349 :409 :413 :415`) ⟨***CORRECTED AT REPAIR ROUND 6, PASS-6 D-1 — the round's sharpest miss, and the receipt written to prevent this exact drift is the one that drifted. The struck ~~10~~ was the ROUND-4 stage-1 reading, left standing under an explicit "re-run at write time" label; the round-5 stage-1 write at 18:50:14 added two KF-HA-19-bearing lines — `:193` (the LAW F round-5 shadow ledger) and `:338` (the R5-13 emphasis disclosure) — and the figure beside the command was not re-run. It violates this file's OWN standing rule minted this round three sections earlier, §B.6's R5-11 bullet at `:189`: "a figure over this file's own bytes is re-run at the seat's last edit or it is not printed." E-14.5 is still the booking, the seam is still two-ended, and `routedTotal` is untouched.***⟩
```

---

#### T3-02 · [W3 D-3 · MAJOR, site 1 of 2] — `:311`'s §0c ownership vehicle re-cut

**Anchor**: `:311` ⟨GREP⟩ `names the cure a **COHESION §0c addendum — the root session's act, flagged upward**`
**Exact current bytes:**

```
names the cure a **COHESION §0c addendum — the root session's act, flagged upward**
```

**Exact replacement bytes** (old→new: `§0c` → the ruled replacement form; at final bytes `COHESION.md:170` **is** `§0c`, carrying *"X·V REFINEMENT FOLD CONFORMANT; THE VALUE.JS SPEC LAYER IS DEVELOP-COMPLETE"* — **a landed section with an unrelated subject**, so a seat resolving KF.W10's ownership gap from this routing opens §0c, finds it landed, and reads the precondition satisfied — verbatim the outcome R5-12(2) exists to prevent):

```
names the cure a **COHESION addendum at §0e or a successor letter, because §0c and §0d are OCCUPIED — the root session's act, flagged upward** ⟨***re-cut at repair round 6, PASS-6 D-3: R5-12(2)'s ownership-vehicle re-cut enumerated FIVE sites, every one inside `KF-W10.md`, and W10 executed it thoroughly (`grep -c 'mirroring §0b\|§0e or a successor letter'` → 7, the strike declared at `:5`, `:7`, `:70`, `:553`, `:639`, `:646`). This file's three `§0c` sites received nothing and carried ZERO instances of the ruled replacement form. THE OWNING FAILURE IS LAW F(2), NOT THIS SEAT — W3 had no §END directive; LAW F(2) puts the duty on RECONCILE to "re-sweep every named terminus and every citing sibling", W10's own round-5 SHADOW ledger at `:639` books the item as "RE-POINTED: the ownership vehicle at TEN sites" (ten being its own) and names no citing sibling, and CLOSE-CERT-2 §2 records this file's entire round-5 fix set as "cert-path ×1". The class was never swept across the file boundary.***⟩
```

---

#### T3-03 · [W3 D-3 · MAJOR, site 2 of 2] — `:41`'s OP-3 §0c site

**Anchor**: `:41` ⟨GREP⟩ `…§0c addendum — the root session's act**. This row cites §0c and books nothing.`
**Exact current bytes:**

```
§0c addendum — the root session's act**. This row cites §0c and books nothing.
```

**Exact replacement bytes:**

```
addendum at **§0e or a successor letter (§0c and §0d are OCCUPIED — `COHESION.md:170` is §0c and carries the X·V refinement-fold subject; `:185` is §0d and carries the minted-successor declaration)** — the root session's act**. This row cites the OWNERSHIP VEHICLE by its ruled form and books nothing. (Re-cut at repair round 6, PASS-6 D-3, the strike stated whole at `:311`.)
```

**Note for the same edit, no third substitution owed**: `:310`'s *"The COHESION §0b/§0c row below is NOT this edge"* is a **negative** reference distinguishing two rows and is correctly left as-is — R5-12(2)'s failure mode is a seat reading a precondition SATISFIED, which a disclaimer cannot cause.

---

#### T3-04 · [W3 D-6 · INFO] — E-15's clause-(2) discriminator, stated at the receipt

**Anchor**: E-15's clause (2) block and its five markup-positive discards.
**Current bytes**: clause (2) is explicitly a **record**-level test (*"run per record against the 58 records, returns ≥ 1"*) and the spec says it *"cannot enumerate"*; the five discards are then argued at the **LINE** level, with the discriminator unstated.
**Insert as one sentence at the receipt:**

```
**DISCRIMINATOR, stated at the receipt (added at repair round 6, PASS-6 D-6): a Superlatives-section line whose PAYLOAD is a WAAPI/CSS-twin finding — where the R1 clause is the read-only-budget justification and not the subject — is discarded; a line that names R1 AS THE SUBJECT is a sub-line-II booking.** The pair that most needs it: `kf-EditorStartScreen.md:113` and `kf-TypingDots.md:89` each OPEN with a component-exposure clause (*"the one string that crosses into value.js was **EXECUTED** against the installed 4.0.0"* / *"the one string crossing the package boundary checked against the installed `@mkbabb/value.js@4.0.0` dist"*) and each sits in a `## Superlatives` section — where **five of sub-line II's six** bookings live (`kf-SequenceScene:119` · `kf-SpringHeatmap:101` · `kf-MatrixEditor:139` · `kf-EditorHeader:95` · `kf-AnimationVisualizer:124`). All six sub-line-II members name R1 as the subject (*"R1-clean"* · *"R1 is structurally unreachable"* · *"DECLINED an R1 parser-crash claim"*); the five discards do not. **The discard is SUSTAINED on the merits and `routedTotal` stays 24** — the reading is recorded because it is load-bearing, is performed at a register the law does not name, and was one sentence away from being checkable rather than told apart by ear.
```

---

### `docs/tranches/X/keyframes/waves/KF-W4.md` — twelve edits

#### T4-01 · [W4 D-1 · MAJOR] — `G-KFW4-11`'s part (2), given a left side that reads the depcruise report

**Anchor**: §Gates `G-KFW4-11`, command column part (2) ⟨GREP⟩ `then `diff actual-specifiers.txt evidence/KF-W4/pinned-seven.txt` — **exit 0 is the gate, and nothing else is**`
**Exact current bytes:**

```
`git grep -n '@src/' origin/master -- demo/ | … | sort > actual-specifiers.txt` then `diff actual-specifiers.txt evidence/KF-W4/pinned-seven.txt` — **exit 0 is the gate, and nothing else is**
```

**Why both readings convict**: with the RHS frozen (as §Artefacts and the falsifier's *"written before the first cure"* say), part (2) never reads the depcruise report at all — its left side is `git grep` over the repo — so `diff` exits 0 **over a config still scoped to `src/`**, and *"an empty reported set is a RED by part (2)"* is false, leaving the **reach arm — the entire subject of the gate — with no falsifier at all**. With the RHS regenerated from the run, the gate derives its own oracle at run time, which `G-KFW4-9` rule (e) forbids two units away.
**Exact replacement bytes:**

```
`jq -r '.modules[] | select(.source | startswith("demo/")) | .dependencies[] | select(.module | startswith("src/")) | "\(.source):\(.module)"' evidence/KF-W4/depcruise-inventory.json | sort > actual-specifiers.txt` then `diff actual-specifiers.txt evidence/KF-W4/pinned-seven.txt` — **exit 0 is the gate, and nothing else is** ⟨***part (2)'s LEFT SIDE is re-cut at repair round 6 (PASS-6 D-1) to read THE DEPCRUISE REPORT'S OWN demo-module set, so that a config still scoped to `src/` reports zero demo modules, the diff is non-empty, and the gate REDS — which is what "an empty reported set is a RED by part (2)" always claimed and, with a `git grep` left side, never delivered: the pipeline returned the seven pairs whether or not depcruise reached `demo/`, so blindness PASSED the gate silently. The RHS stays the FROZEN pinned list written before the first cure (§Artefacts), so the gate never re-derives its own oracle — `G-KFW4-9` rule (e), which this file authors two units away. Artefact identity is fixed in the same motion: `depcruise-inventory.json` is depcruise's RAW output and nothing else; the curated pairs — the hash, the five dead LIGHT-allowlist entries with their live twins, and the config's literal path — move to a separate `pinned-seven.txt` header block, since `depcruise --output-type json` cannot emit any of the three. ONE PATH, ONE WRITER, ONE CONTENT.***⟩
```

---

#### T4-02 · [W4 D-2 · MAJOR] — the twelve live `PASS-4` citations re-pointed

**Anchor**: four cells publishing the superseded reading ⟨GREP⟩ `110 booked` (4 hits: the **AUDITED** cell, the **SPECIFIED** cell, the **carry-table preamble**, the **§Excluded head**), plus §Gates' head ⟨GREP⟩ `That defect is cured this round (R4-2` and §Sequencing's three `PASS-4 §5` cells.
**Measured**: `grep -oh 'PASS-[0-9]/KF-W4-CHECK\.md' KF-W4.md | sort | uniq -c` → **PASS-4 ×12, PASS-5 ×2**.
**Exact substitution, applied at each of the four `110 booked` cells:**

```
`docs/tranches/X/keyframes/conformance/PASS-4/KF-W4-CHECK.md` §1 … **111 routed · 110 booked · 1 escaped**
```
→
```
`docs/tranches/X/keyframes/conformance/PASS-6/KF-W4-CHECK.md` §2 (2026-08-29) … **111 routed · 111 booked · 0 escaped** ⟨***re-pointed at repair round 6, PASS-6 D-2, under this file's OWN standing instruction — stated in the AUDITED cell's own voice — that "a superseded citation is re-pointed, never re-asserted". The 110/1 reading is PASS-4's; PASS-5 superseded it (111/111/0) and PASS-6 reproduces it. R5-9 row 1 made this class a named, owned cure and CLOSE-CERT-2 §5 records it CURED at W1 (20 sites), W3 (16) and W9 (18) — it was never assigned here, so the wave that publishes the program's first zero-escape census published, four cells later, the census that had one escape.***⟩
```

**Same edit, two companions**: §Excluded's head *"whose §6 registers **eight** defects (1 CRITICAL · 3 MAJOR · 4 MINOR)"* → *"**twelve** defects (0 CRITICAL · 4 MAJOR · 5 MINOR · 3 INFO), `PASS-6/KF-W4-CHECK.md` §6"*; §Gates' head, still citing `PASS-4 §4` and certifying *"That defect is cured this round (R4-2 …)"* of a cure PASS-5 convicted as incomplete and round 5 re-cut one section below → re-point to `PASS-6 §5` and strike the certification (`G-KFW4-11`'s cure is at `T4-01`/`T4-04`).

---

#### T4-03 · [W4 D-3 · MAJOR · LAW G instance 8] — the NUMERIC ARM receipt's exception list restated at seven

**Anchor**: §Bounds, the third scope receipt ⟨GREP⟩ `**Three figures did NOT reproduce and are corrected at their rows with both readings printed**`
**Exact current bytes:**

```
**Three figures did NOT reproduce and are corrected at their rows with both readings printed**: carry row 29's symbol census (**9 → 12**), `.dependency-cruiser.cjs`'s dead LIGHT paths (**4 → 5**), and ChannelOptions' Teleport.
```

**Exact replacement bytes** (old→new: **three → SEVEN**, the round-5 four named; that receipt is round 4's, unedited, and still asserts in the present tense that the sweep reached every pasted command, while round 5's own cure cells inside this same file record four further figures that did not reproduce at round 4):

```
**SEVEN figures did NOT reproduce and are corrected at their rows with both readings printed** — the four found at round 4: carry row 29's symbol census (**9 → 12**), `.dependency-cruiser.cjs`'s dead LIGHT paths (**4 → 5**), and ChannelOptions' Teleport; **and the three-plus-one found at round 5 and named here for the first time (repair round 6, PASS-6 D-3)**: the `easing-serialize` census's **16 over a seventeen-member list** (*"the arithmetic, not the enumeration, was wrong, and it was wrong in the largest-radius act in this wave"*) · row 29's **twelve summed by two incompatible rules to thirteen** · the `.dependency-cruiser.cjs` transcription's **silently dropped `.map()`** (*"a transcription that drops the matching rule cannot prove the matching rule"*) · the `seedFor|syncGap` transcript's **seventh line printed from a six-line command**. ⟨***the round-4 spelling ~~"Three figures"~~ is struck under LAW G: it asserted, in the present tense, that the sweep reached EVERY pasted command in this file, while round 5 cured four of its products and left the receipt that certified their absence exactly as it was. The scope law's sixth issue firing at the seventh receipt: a repair that cures every named instance and never touches the receipt that missed them leaves the law green over its own counterexamples.***⟩
```

---

#### T4-04 · [W4 D-4 · MAJOR] — `G-KFW4-11`'s oracle widened to the set its falsifier asserts

**Anchor**: `G-KFW4-11`'s key extraction ⟨GREP⟩ `grep -E ':[0-9]+:[[:space:]]*import '`
**Exact current bytes:**

```
grep -E ':[0-9]+:[[:space:]]*import '
```

**Exact replacement bytes** (the filter keys on a line *beginning* with `import`, so three shapes of ADDITION are invisible to it — a re-export `export { x } from "@src/…"`, a multi-line import whose `from "@src/…"` clause sits on its own line, and a dynamic `await import("@src/…")` — each a live `demo/ → @src/` deep edge, none of which reds the gate; the frontier carries none of the three today, which is exactly why the hole will not announce itself):

```
grep -E ':[0-9]+:.*(^|[[:space:]])(import|export)[[:space:]([{]|:[0-9]+:[[:space:]]*from[[:space:]]|:[0-9]+:.*import\(' ⟨***widened at repair round 6, PASS-6 D-4: the round-5 filter matched only a line BEGINNING with `import`, so a re-export, a multi-line import whose `from "@src/…"` clause sits on its own line, and a dynamic `await import("@src/…")` were each a live `demo/ → @src/` deep edge invisible to the oracle, under a falsifier asserting the gate "fails on an addition AND on a silent removal" and is "satisfiable by DETECTION alone (mandatory)". THIS WAVE DETECTS AND KF.W8 DECIDES (§Excluded 4), so detection completeness IS this gate's entire contribution to the program. The pipeline's current behaviour is unchanged and re-verified at `81a56990`: 9 raw `@src/` lines in `demo/`, 7 kept, and the 2 dropped are precisely the prose witnesses the gate declares (`demo/kf-engine.ts:5` · `useOrbitalInertia.ts:12`).***⟩
```

---

#### T4-05 · [W4 D-5 · MINOR] — the `serializeEasing` consumer set, counted at what asserts

**Anchor**: §Bounds, the `easing-serialize.ts` row ⟨GREP⟩ `Consumer set = 17 call sites + 2 published re-exports + 5 asserting specs; none may change behaviour.`
**Exact current bytes:**

```
and asserted by FIVE test files … Consumer set = 17 call sites + 2 published re-exports + 5 asserting specs; none may change behaviour.
```

**Exact replacement bytes** (old→new: **5 asserting specs → 3**, with the two non-asserters named and the double-count disclosed; of the five named, only three import and call the symbol — `roundtrip-easing.test.ts`, `value4-easing-contract.test.ts:42`, `w0-crashes.test.ts:39`/`:73`):

```
and asserted by **THREE** test files … **Consumer set = 17 call sites + 2 published re-exports + 3 asserting specs; none may change behaviour.** ⟨***re-counted at repair round 6, PASS-6 D-5. The two struck: `test/engine/replay-equality.test.ts:9` is PROSE — the row says so in the same breath — and `test/compile/compile-roundtrip.test.ts:570` is `describe("S.B3 EN-a — serializeEasing CSS-twin …")`, a TITLE STRING and that file's SOLE hit; the file neither imports nor calls the symbol. `:570` is additionally DOUBLE-COUNTED, once inside the row's "12 in-test code lines" bucket and once as an asserting spec. The partition over `git grep -n '\bserializeEasing\b' origin/master -- src/ demo/ test/ scripts/` → 49 lines is otherwise exhaustive and exact (pass-5 D-1 fully cured). The DIRECTION was safe — the figure overstated consumers, and "none may change behaviour" binds either way — but this sentence is the AUTHORIZATION for R-2, the wave's largest blast radius, and it is the same two-rules-in-one-sentence shape D-7 convicted at row 29, cured there and surviving eleven rows above it.***⟩
```

---

#### T4-06 · [W4 D-6 · MINOR] — §Excluded 21's three limbs, each at its own coordinate

**Anchor**: §Excluded 21, the round-5 clause ⟨GREP⟩ `banks **THREE** citation limbs, not one`
**Exact current bytes:**

```
`KF-CO-33` banks **THREE** citation limbs, not one: **`kf-ChannelOptions.md:207`** books, beside the `proof:bezier-*` trio,
```

**Exact replacement bytes** (old→new: three limbs framed at one coordinate → each limb at its own; `sed -n '207p' kf-ChannelOptions.md` reads *"this record adds **only the two** citations load-bearing HERE to KF-CO-33"*, and the `proof:bezier-*` trio is banked at the id's OWN row, `kf-ChannelOptions.md:88`):

```
`KF-CO-33` banks **THREE** citation limbs across **TWO** coordinates, not one: **`kf-ChannelOptions.md:88`** — the id's own row — banks the `proof:bezier-*` trio (*"citing three `proof:bezier-*` gates that do not exist"*, verified this seat; sole site `ChannelOptions.vue:168`, `git grep -n 'proof:bezier' origin/master -- demo/ src/ scripts/` → **1**); and **`kf-ChannelOptions.md:207`** adds, in its own words, *"**only the two** citations load-bearing HERE"* —
```

⟨***corrected at repair round 6, PASS-6 D-6: the round-5 frame put all three limbs at `:207`, and `:207` says the opposite of it. THE SUBSTANCE IS RIGHT AT EVERY END and this seat verifies it independently — three limbs exist, both surviving limbs (`design-idioms.css:3`'s `proof:idioms`, ×3, and `DESIGN.md:236`'s `proof:style-file-ceiling`) are inside the eight targets, inside §Bounds, and inside `G-KFW4-8`'s denominator. What failed is R5-11(1): the enumeration was stated at a receipt that did not carry it, with no command pasted for the three. One coordinate — `:88` beside `:207` — is the whole remedy.***⟩

---

#### T4-07 · [W4 D-7 · MINOR] — one definition of *routed*, stated where the denominator is

**Anchor**: line `:9`'s census figure ⟨GREP⟩ `111 routed · 111 booked · 0 escaped`
**Insert immediately after the figure:**

```
 ⟨***COUNTING RULE, stated at the denominator (added at repair round 6, PASS-6 D-7): "routed" here = **one row this spec books**, which is the census's definition and yields **111**. It is NOT the AUDITED cell's supplier criterion — *"supply ≥1 W4-routed id"* — under which kf-KeyboardShortcutsModal, kf-SequenceScene and kf-SequenceScrubber supply NONE (that cell says so at length and quotes kf-SequenceScrubber's own routing law, *"KF.W0/W6/W7/W9 … never W4"*, to prove it: *"being carried is not supplying"*), and which yields **108**. Both figures rode this file thirty lines apart with no rule reconciling them. **Nothing is lost either way — the three rows are booked and the escape count is 0 under both readings** — but the file published its headline denominator without saying which of its two definitions of routed produced it, in the round that minted the rule.***⟩
```

---

#### T4-08 · [W4 D-8 · MINOR] — `G-KFW4-1`'s falsifier scope, fixed by a stated rule

**Anchor**: `G-KFW4-1`'s falsifier ⟨GREP⟩ `fails if ANY of **the four scripts** this wave's `package.json` row opens`
**Exact current bytes:**

```
fails if ANY of **the four scripts** this wave's `package.json` row opens — `check` (`:37`), `check:lib` (`:38`), `lint` (`:44`), `test`/`test:lib` (`:45`/`:46`) — lacks, at execution, ANY invocation present in its `origin/master` form.
```

**Exact replacement bytes** (old→new: `four` → **FIVE**, with the rule stated where the count is; five names at five coordinates, all five reproducing byte-exact at `81a56990`, and the file used both conventions — §Bounds said *"the same §Bounds row opens three more"*, implying four, while enumerating five line numbers):

```
fails if ANY of **the FIVE scripts** this wave's `package.json` row opens — `check` (`:37`), `check:lib` (`:38`), `lint` (`:44`), `test` (`:45`), `test:lib` (`:46`) — lacks, at execution, ANY invocation present in its `origin/master` form. **COUNTING RULE, at the falsifier: one script = one JSON key at one coordinate; `test` and `test:lib` are TWO scripts, not one pair.** ⟨***corrected at repair round 6, PASS-6 D-8: the falsifier's own closing sentence is "a falsifier's scope is the only thing that makes it executable: a law scoped to one script while its row opens four is a law that cannot fail on three of them" — and the law was scoped to a number its own enumeration did not fix. All five reproduce byte-exact this seat.***⟩
```

---

#### T4-09 · [W4 D-9 · MINOR] — the one command this round authored, given a bounds row and a resolvable destination

**Anchor**: `G-KFW4-11` part (1) ⟨GREP⟩ `> **evidence/KF-W4/depcruise-inventory.json**`
**Exact current bytes:**

```
> evidence/KF-W4/depcruise-inventory.json
```

**Exact replacement bytes** (§Artefacts locates this wave's evidence at `docs/tranches/X/keyframes/waves/evidence/KF-W4/` — a **value.js** path — while the command runs in the keyframes.js clone at `origin/master`, where `evidence/` exists at no coordinate and §Bounds' *Do NOT touch* line forbids `docs/tranches/**` outright; **no §Bounds row grants a write anywhere named `evidence/`**):

```
> "$KF_W4_EVIDENCE/depcruise-inventory.json"   # KF_W4_EVIDENCE = docs/tranches/X/keyframes/waves/evidence/KF-W4 IN THE VALUE.JS TREE — the §Artefacts location; the depcruise RUN happens in the keyframes.js clone at origin/master 81a56990 and writes NOTHING there
```

**Same edit, the bounds row** — insert into §Bounds:

```
| `docs/tranches/X/keyframes/waves/evidence/KF-W4/` (value.js tree) | create | **the gate's artefact destination — `depcruise-inventory.json` (depcruise's RAW output) and `pinned-seven.txt` (the frozen oracle, written BEFORE the first cure)**; added at repair round 6, PASS-6 D-9, because R-8.4's discipline — *"the config is never referenced by placeholder in a command"* — binds a redirect target as much as a config path, and the round's one new command had neither a bounds row nor a resolvable destination |
```

---

#### T4-10 · [W4 D-10 · INFO] — §Excluded 21's SHADOW line, one vocabulary for one act

**Anchor**: §Excluded 21 ⟨GREP⟩ `**SHADOW (LAW F(1)): struck/minted set = { }**`
**Exact current bytes:**

```
**SHADOW (LAW F(1)): struck/minted set = { }** — nothing is struck, minted, dropped or re-keyed by this correction; the ROUTING SCOPE of one row is narrowed.
```

**Exact replacement bytes** (LAW F(1) lists *"access NARROWED"* and *"re-pointed"* among the verbs that COMPEL a SHADOW line; the clause performs a narrowing and then declares an empty set beside the verb, while line 9's round ledger handles the same act under a third heading, *"routing-scope CORRECTED"* — **three vocabularies for one act**):

```
**SHADOW (LAW F(1)): NARROWED set = { §Excluded 21's routing scope — one row }; struck set = ∅ rows; minted set = ∅; re-keyed set = ∅; dropped set = ∅** — the act is a NARROWING, which is on LAW F(1)'s own trigger list, and the set declaration now names it rather than contradicting it (corrected at repair round 6, PASS-6 D-10). The disposition-per-limb and notified-rows halves are unchanged, present, correct and verified at both ends. **Line 9's round ledger uses the same word: ROUTING SCOPE NARROWED, not "corrected" — one act, one vocabulary.**
```

---

#### T4-11 · [W4 D-11 · INFO] — the provenance block in chronological order

**Anchor**: `:7`–`:11`, the provenance block.
**Current order**: round **1** (`:7`) → **2** (`:8`) → **5** (`:9`) → **4** (`:10`) → **3** (`:11`) — a reader taking the block in order meets round 5's cures before the round-4 text they supersede, and meets *"Repaired a fourth time"* after *"Repaired a fifth time."*
**The edit**: **re-order the five lines to 1 → 2 → 3 → 4 → 5** (`:7` round 1 · `:8` round 2 · `:9` round 3 · `:10` round 4 · `:11` round 5), moving whole lines only. **No byte of any line's content changes and no claim is touched** — the ordering was the only defect (PASS-6 D-11). Note at the block head: *"provenance runs oldest → newest; re-ordered at repair round 6, PASS-6 D-11, content untouched."*

---

#### T4-12 · [W4 D-12 · INFO] — the SUBJECT-IDENTITY receipt, re-dated and re-pointed

**Anchor**: the SUBJECT-IDENTITY scope receipt ⟨GREP⟩ `All three are path-qualified **this round** at every site that names them, gate-witness columns included (D-7)`
**Exact current bytes:**

```
All three are path-qualified **this round** at every site that names them, gate-witness columns included (D-7)
```

**Exact replacement bytes** (old→new: round-4 voice inside a round-5 file, citing `PASS-4/KF-W4-CHECK.md §2` as its completeness authority — D-2's class):

```
All three are path-qualified **at round 4 (the act and its D-7 are round 4's), re-verified at the frontier at repair round 6 and not re-run in between** at every site that names them, gate-witness columns included ⟨***re-dated at repair round 6, PASS-6 D-12: the round-5 file carried this sentence in round-4 voice with "this round" pointing at round 4's act, and cited `PASS-4/KF-W4-CHECK.md §2` as its completeness authority — re-pointed to `PASS-6/KF-W4-CHECK.md` §5. THE SWEEP'S SUBSTANCE RE-VERIFIES AT `81a56990`: `easing.ts:44`, `TimelineCaret.vue:35` and `KeyframeTimeline.vue:179` all resolve with their subjects, and the `…/timeline/` vs `…/timeline/components/` near-miss is stated where it bites.***⟩
```

---

### `docs/tranches/X/keyframes/waves/KF-W5.md` — eleven edits

#### T5-01 · [W5 D-1 · MAJOR] — the two off-by-one sibling coordinates, at both of their sites

**Anchor A**: the ⟨RECONCILE SEAT⟩ block ⟨GREP⟩ `the four receipts … re-verified at final bytes, **all resolving**` — the printed pair `:98` / `:123`.
**Anchor B**: §0 R-1.4's live *"Command, run this seat"* cell, the same pair.
**Measured, old→new** (quotations byte-exact at both true lines):

| printed | command | true |
|--:|---|--:|
| `:98` | `grep -n 'The ten rulings this spec owes' waves/KF-W4.md` | **`:99`** |
| `:123` | `grep -n 'Census S-2' waves/KF-W4.md` | **`:124`** (one hit) |

**Exact substitution at both anchors**: `:98` → `:99`, `:123` → `:124`, each followed by:

```
 ⟨***corrected at repair round 6, PASS-6 D-1: round 5 recorded the drift IN PROSE — "had already moved off the round-4 reading by one line when this seat looked" — struck the mtime and LEFT THE NUMERALS, then re-printed the same pair at §0 R-1.4 under a live "Command, run this seat" label. `CLOSE-CERT-2 §2` books this file at 145 checked · 1 fixed, and `grep -n ':123\|:98\|Census S-2'` over that certificate returns 0 hits — the sweep never reached them, while cert §5 rows 7 and 8 retire the identical class at two siblings. Both quotations are byte-exact at their true lines; only the coordinates moved.***⟩
```

---

#### T5-02 · [W5 D-2 · MAJOR · LAW G instance 7] — the LAW F(2) notification probe's true answer, and the unnotified citer

**Anchor**: the `G-CSSIDENT` act SHADOW ⟨GREP⟩ `no other spec cites this cell — `grep -l 'G-CSSIDENT' waves/KF-W*.md` returns **this file alone**, run this seat.`
**Exact current bytes:**

```
no other spec cites this cell — `grep -l 'G-CSSIDENT' waves/KF-W*.md` returns **this file alone**, run this seat.
```

**Exact replacement bytes** (measured → **`waves/KF-W2.md` + `waves/KF-W5.md`**; W2 `:276`/`:894` read *"the KF.W5 leg is booked at **`KF-W5 §Carry Arm B` row `B-12`**, which is **`G-CSSIDENT`'s third leg**"*, entered *"at repair round 5"*, and cert §6.1's order is **W2 18:54:59 → W5 18:55:45** — so the citing sibling existed at this file's write time; **KF.W2 is absent from both the act SHADOW and the consolidated LEDGER**):

```
**TWO specs cite this cell** — `grep -l 'G-CSSIDENT' waves/KF-W*.md` → **`waves/KF-W2.md`** and **`waves/KF-W5.md`**, run at repair round 6. **`KF-W2.md` `:276`/`:894` name this gate by id** (*"the KF.W5 leg is booked at `KF-W5 §Carry Arm B` row `B-12`, which is `G-CSSIDENT`'s third leg"*, entered at repair round 5). **Citing / terminus waves notified = KF.W2 (§Carry, the `B-12` third-leg citation) — anchor-only, added here and at the consolidated LEDGER.** ⟨***the round-5 spelling ~~"returns this file alone, run this seat"~~ is STRUCK under LAW G, PASS-6 D-2: it was a probe MINTED THIS ROUND that returned two files and was written as one, and the citing sibling wrote at 18:54:59 against this file's 18:55:45 — the citation was on disk when the probe ran. KF.W2 was absent from BOTH the act SHADOW and the consolidated LEDGER, which is exactly the reception discipline LAW F(2) exists to enforce.***⟩
```

---

#### T5-03 · [W5 D-3 · MAJOR · LAW G instance 6 + U6-C member] — §END's LAW E(4) compliance claim, replaced by the measurement

**Anchor**: §END ⟨GREP⟩ `the only clocks this file now prints are the frozen CARRY's and its own`
**Exact current bytes:**

```
the only clocks this file now prints are the frozen CARRY's and its own
```

**Measured** (`grep -o '[0-9][0-9]:[0-9][0-9]\(:[0-9][0-9]\)\?' waves/KF-W5.md`): **seven live sibling clocks** — four unstruck in the ⟨RECONCILE SEAT⟩ block (`KF-W4` **16:59:44** · `KF-W6` **16:59:25** · `KF-W0` **16:58:59** · `KF-W7` **17:17:02**) and three more for `KF-W6` at §Excluded (**14:06** · **14:22** · **15:32**). **All seven are false at final bytes** (all eleven specs 15:17:38+).
**Exact replacement bytes:**

```
**SEVEN live sibling clocks survive in this file and are STRUCK here by enumeration, not by universal (LAW G, repair round 6, PASS-6 D-3)**: the ⟨RECONCILE SEAT⟩ block's four — `KF-W4` ~~16:59:44~~ · `KF-W6` ~~16:59:25~~ · `KF-W0` ~~16:58:59~~ · `KF-W7` ~~17:17:02~~ — and §Excluded's three for `KF-W6` — ~~14:06~~ · ~~14:22~~ · ~~15:32~~. **All seven are round-4-or-earlier readings and all seven are false at final bytes (every spec 2026-08-29 15:17:38+). They are struck as live claims and preserved as dated records; the stamp authority of record is `PASS-6/CLOSE-CERT-6.md` §9's hash bracket.** ⟨***the round-5 spelling ~~"the only clocks this file now prints are the frozen CARRY's and its own"~~ was a PROBE-FREE NEGATIVE UNIVERSAL, falsified by one grep over the file, and its supporting clause "the three that existed" counted the round-4 stamps ONLY — instance cured, class left, one paragraph after D-7 struck the same shape.***⟩
```

---

#### T5-04 · [W5 D-4 · MAJOR, half 1 of 2] — the `G-CSSIDENT` §Bounds row's subject set

**Anchor**: §Bounds ⟨GREP⟩ `the **publication decision** surface (`cssIdent` + **C-8's four** + KF-ET-32's registry)`
**Exact current bytes:**

```
the **publication decision** surface (`cssIdent` + **C-8's four** + KF-ET-32's registry)
```

**Exact replacement bytes** (old→new: the STRUCK subject set survives at the row that GRANTS the act; `C-8's four` includes `debounce` and `convertPixelsToCh`, and `git grep -c … 81a56990 -- src` → **0 for both**, which Act 4 / B-11 forbid publishing):

```
the **publication decision** surface (`cssIdent` + **B-11's THREE library names** + KF-ET-32's registry) ⟨***re-cut at repair round 6, PASS-6 D-4: the round-4 spelling ~~"C-8's four"~~ named a subject set the G-CSSIDENT re-cut STRUCK, and it survived at the very row that GRANTS the act. Two of the four — `debounce` and `convertPixelsToCh` — measure `git grep -c … 81a56990 -- src` → **0** each, and Act 4 / B-11 forbid publishing an unconsumed name. The re-cut was DECLARED to reach the oracle "and nothing else"; the row that grants and the sequencing item that orders were both left naming the struck set.***⟩
```

---

#### T5-05 · [W5 D-4 · MAJOR, half 2 of 2] — §Sequencing `S-3`'s five names, and the → KF.W8 edge

**Anchor**: §Sequencing `S-3` ⟨GREP⟩ `a **single ruling over five names**`
**Exact current bytes:**

```
a **single ruling over five names**
```

**Exact replacement bytes** (B-11 reads *"ONE publish-or-relocate ruling over **THREE library names**"*; the → KF.W8 edge repeats *"B-11's five names"* and takes the same substitution):

```
a **single ruling over THREE library names** (B-11's own wording; corrected at repair round 6, PASS-6 D-4 — the "five" spelling counted `debounce` and `convertPixelsToCh`, both at 0 consumers in `src` and both outside a publish ruling by Act 4's own bar. **The → KF.W8 cross-edge's "B-11's five names" takes the identical substitution in this edit, so the two ends agree.**)
```

---

#### T5-06 · [W5 D-5 · MAJOR] — the observability partition, re-counted against `G-TAX`'s own cell

**Anchor**: §Gates / OP-6 ⟨GREP⟩ `**nineteen** of the twenty run under the instruments that exist today`
**Exact current bytes:**

```
**nineteen** of the twenty run under the instruments that exist today … **the twentieth is G-XSS**
```

**Exact replacement bytes** (old→new: **19+1 → 18+2**, and *"the nineteen `src/`-side gates"* is wrong for at least three; `G-TAX`'s own re-cut cell says *"this gate's second leg is therefore **authored RED and stays unobservable until the SS-1/SS-2 authoring block acts**, exactly as `G-XSS`'s round-trip half waits on KF.W4's wiring"* — **two dependency-blocked gates, counted as one**; and `G-TAX` greps `registry/adjudicated/`, `G-ID` greps this spec, `G-SCOPE` enumerates this file — none is `src/`-side):

```
**EIGHTEEN** of the twenty run under the instruments that exist today; **TWO are dependency-blocked and are named: `G-XSS`** (its round-trip half waits on KF.W4's wiring) **and `G-TAX`** (its second leg is authored RED and stays unobservable until the SS-1/SS-2 authoring block acts — that gate's own cell says so, in those words). **And the phrase *"the nineteen `src/`-side gates"* is struck**: at least three of the twenty are not `src/`-side at all — **`G-TAX` greps `registry/adjudicated/`, `G-ID` greps this spec, `G-SCOPE` enumerates this file.** (Re-counted at repair round 6, PASS-6 D-5, against the gates' own cells.)
```

---

#### T5-07 · [W5 D-6 · MAJOR] — the census-carriage and gate-status claims re-homed at the artifact of record

**Anchor**: the load-bearing citing sites — the SPECIFIED verb's census carriage (currently `PASS-4 §1`), `G-SCOPE`, `G-ID`, §Gates' witness re-verification, §Excluded's closure, and *"Close of the ledger"* (all `PASS-3`).
**Measured**: `PASS-3/KF-W5-CHECK` **13** · `PASS-4` **4** · `PASS-2` **1** · `PASS-5` **5**.
**Exact substitution at each of the six load-bearing sites**: re-point to `docs/tranches/X/keyframes/conformance/PASS-6/KF-W5-CHECK.md` (2026-08-29; **43 routed · 43 booked · 0 escaped · DEFECTIVE at 6 MAJOR · 4 MINOR**), each followed by:

```
 ⟨***re-pointed at repair round 6, PASS-6 D-6 — the class R5-9 row 1 retired program-wide, cured by CLOSE-CERT-2 §5 rows 1/6/16 at KF-W1 (20 sites), KF-W3 and KF-W9, and never assigned here. The PASS-4 site carried its own standing instruction — "when a newer pass supersedes this one the citation is re-pointed again" — while `PASS-5/KF-W5-CHECK.md` already existed and had graded this file DEFECTIVE. The PASS-2/PASS-3/PASS-4 readings survive ONLY where explicitly dated as history and are never re-pointed; one artifact of record, and the class made greppable by `grep -n 'PASS-[0-9]/KF-W5-CHECK' KF-W5.md`.***⟩
```

---

#### T5-08 · [W5 D-7 · MINOR] — the count-oracle sweep's partition, re-stated at its own categories

**Anchor**: the count-oracle sweep tally ⟨GREP⟩ `1 INVERTED · **8 count-or-set oracles** · **11 non-count**`
**Exact current bytes:**

```
1 INVERTED · **8 count-or-set oracles** · **11 non-count**
```

**Exact replacement bytes** (the block itself calls **five** of the eight non-count: `G-CSSIDENT` *"a RED witness, not an oracle"* · `G-ID` *"a property … not a count"* · `G-STRUCT`/`G-BASIS`/`G-RING` *"none is a drive-to-zero"*; the arithmetic summed to 20 and the categories did not hold):

```
1 INVERTED · **3 count-or-set oracles** · **16 non-count** ⟨***re-partitioned at repair round 6, PASS-6 D-7: the round-5 tally summed to 20 arithmetically while the same block called FIVE of its eight "count-or-set oracles" non-count in its own words — `G-CSSIDENT` (*"a RED witness, not an oracle"*), `G-ID` (*"a property … not a count"*), and `G-STRUCT`/`G-BASIS`/`G-RING` (*"none is a drive-to-zero"*). THE SWEEP ITSELF IS COMPLETE AND SOUND and every verdict stands; only the summary's categories were wrong.***⟩
```

---

#### T5-09 · [W5 D-8 · MINOR] — §Spec-home's probe, printed at what it returns

**Anchor**: §Spec-home ⟨GREP⟩ `grep -rl 'X/kf/waves/KF.W5'` → **this file only**`
**Exact current bytes:**

```
`grep -rl 'X/kf/waves/KF.W5'` → **this file only**
```

**Exact replacement bytes** (measured over `docs/` → **4 files**: `PASS-1/KF-W5-CHECK.md` · `PASS-2/KF-W5-CHECK.md` · `PASS-1/RULINGS.md` · this file):

```
`grep -rl 'X/kf/waves/KF.W5' docs/` → **4 files** — `PASS-1/KF-W5-CHECK.md` · `PASS-2/KF-W5-CHECK.md` · `PASS-1/RULINGS.md` · **this file**; **the three siblings are conformance artifacts STRIKING the spelling, so the conclusion — no live spec carries the dead path — survives unchanged** (corrected at repair round 6, PASS-6 D-8: the numeral beside the paste did not reproduce, the conclusion always did)
```

---

#### T5-10 · [W5 D-9 · MINOR] — the LAW-A receipt's contrast figure, given its command

**Anchor**: the LAW-A receipt ⟨GREP⟩ `**31**` in the contrast clause (*"one more than the row census"*).
**Exact replacement** (the figure reproduces under `grep -cE 'modify'` → **31** — and coincidentally under `grep -cE 'read'` → 31 — but **not** under `grep -cE 'modify\|modify-carve\|create\|read'` → **55**, nor the delete-verb form → **17**, nor four `awk` variants (36 · 37 · 68 · 3); *"one more than the row census"* reads as 30+1, not as a reading):

```
**31** ⟨***command and counting rule stated at repair round 6, PASS-6 D-9: `grep -cE 'modify' KF-W5.md` → **31**; counting rule = one unit = one LINE containing the token `modify`, which is the only reading that reproduces the figure. It is NOT the access-word union (`grep -cE 'modify|modify-carve|create|read'` → 55), NOT the delete-verb form (17), and NOT any of four `awk` partitions (36 · 37 · 68 · 3). The round-5 gloss "one more than the row census" reads as 30+1 rather than as a measurement. BOOKED UNDER-SPECIFIED, NEVER FALSE — the figure was always right for the command that produces it, and the command was missing.***⟩
```

---

#### T5-11 · [W5 D-10 · MINOR] — the successor-formation descriptor, one round current

**Anchor**: §Sequencing ⟨GREP⟩ `cube + square at **the proposed** KF.W11; dock-menu at **the proposed** KF.W13`
**Exact current bytes:**

```
cube + square at **the proposed** KF.W11; dock-menu at **the proposed** KF.W13
```

**Exact replacement bytes** (old→new: *"the proposed"* → **MINTED-UNAUTHORED**, against `KF-W10.md:573` §6.D's verb and `COHESION.md` §0d, both verified; **the routing is unchanged and correct — only the word was stale**):

```
cube + square at **KF.W11 (MINTED-UNAUTHORED)**; dock-menu at **KF.W13 (MINTED-UNAUTHORED)** ⟨***word corrected at repair round 6, PASS-6 D-10: ~~"the proposed"~~ is one round stale — `KF-W10.md:573` §6.D carries the `MINTED-UNAUTHORED` verb and `COHESION.md §0d` (`:185`) declares the three mints at the boundary with their 17-packet cargo and six travelling locks. ROUTING UNCHANGED AND CORRECT; the descriptor was not.***⟩
```

---

### `docs/tranches/X/keyframes/waves/KF-W7.md` — fifteen edits

#### T7-01 · [W7 D1 · MAJOR, cell 1 of 2] — the census derivation, with the phantom `+1` struck

**Anchor**: `:13` ⟨GREP⟩ `**Nine non-roster entries − 2 + 1**`
**Exact current bytes:**

```
**Nine non-roster entries − 2 + 1** (the routing-summary-tail seam that rule (1) now states outright, below) **= 8**; **127 + 8 = 135**
```

**Exact replacement bytes** (old→new: `9 − 2 + 1 = 8` / `135` → **`9 − 2 = 7`** / **`134`**; the `+1` has **no referent** — rule (1)'s new discriminator names exactly two COUNTED tails, `kf-RibbonBar.md:131` and `kf-SequenceScrubber.md:134`, and **both are already inside the nine**; the three NOT-COUNTED tails stay uncounted and the two zero declarations stay recorded, so **no entry is newly admissible**):

```
**Nine non-roster entries − 2 = 7** (the routing-summary-tail seam that rule (1) states outright, below; **the two COUNTED tails rule (1) names — `kf-RibbonBar.md:131` and `kf-SequenceScrubber.md:134` — are ALREADY INSIDE THE NINE, so no entry is newly admissible and the round-5 `+1` had no referent**); **127 + 7 = 134** ⟨***CORRECTED AT REPAIR ROUND 6, PASS-6 D1 — the SEVENTH consecutive generation of this figure, and the first in which the arithmetic contained a phantom operand. The cited artifact was itself contradictory and was re-issued untested: `PASS-5/KF-W7-CHECK.md` §1b lists nine rows, marks exactly TWO ✘, then prints "subtotal counted 8", and its §1d footnote concedes "under a strict reading of rule (3) that also drops `kf-PlaybackRibbon.md:36`, the figure is 134" — i.e. its 135 required counting a row its own table struck. CARRIAGE IS UNAFFECTED: 0 escaped under every reading, and both contested identities are carried regardless.***⟩
```

---

#### T7-02 · [W7 D1 · MAJOR, cell 2 of 2] — §Excluded's `−1`, reconciled with `:13`

**Anchor**: `:366` ⟨GREP⟩ `The **−1** against PASS-4 is the roster/non-roster BOUNDARY question`
**Exact current bytes:**

```
The **−1** against PASS-4 is the roster/non-roster BOUNDARY question — **one double-counted line** (`kf-SpringTarget.md:69`) and **one routing-law preamble** (`kf-PlaybackRibbon.md:36`)
```

**Exact replacement bytes** (old→new: **two removals labelled −1** → `−2`, matching `:13`'s corrected `9 − 2`; the file's two census cells computed `−1` and named two removals with no `+1` anywhere):

```
The **−2** against PASS-4 is the roster/non-roster BOUNDARY question — **one double-counted line** (`kf-SpringTarget.md:69`) and **one routing-law preamble** (`kf-PlaybackRibbon.md:36`) — **and it agrees with `:13`'s `9 − 2 = 7` exactly** ⟨***reconciled at repair round 6, PASS-6 D1: the round-5 file's two census cells disagreed — `:13` computed −2 +1 = −1 while this cell enumerated TWO removals under the label −1. Two cells, one quantity, two answers.***⟩
```

---

#### T7-03 · [W7 D3 · MAJOR + U6-C member] — the BACKWARD receipt block's four stale stamps and four false coordinates

**Anchor**: `:343` ⟨GREP⟩ `**Verified this round**: **KF-W2** (`:710`/`:753`, **mtime 17:02:55**)`
**Exact current bytes:**

```
**Verified this round**: **KF-W2** (`:710`/`:753`, **mtime 17:02:55**) · **KF-W4** (`:54`/`:58` + §Commits commit 2, **mtime 16:59:44**) · **KF-W5** (**mtime 16:55:55**) · **KF-W6** + **KF-W6-CARRY** (**mtimes 16:59:25 / 10:49:45**)
```

**Exact replacement bytes** (old→new: **all four stage-1 siblings wrote again in round 5** — `stat` → `KF-W2/W4/W5/W6.md` all **2026-08-29 15:17:38** — and **all four coordinates are false**: W2's two sentences are at `:782`/`:825`, W4's two rows at `:55`/`:59`, **a correction this same file makes at `:31`**, so the contradiction is internal):

```
**Verified by ANCHOR, after the last per-wave write (LAW E(4): no quoted sibling prose, no line numbers, no per-seat mtime stamps)**: **KF-W2** ⟨§Sequencing — the two ordering sentences, *"KF.W7 may not decide a failure posture before KF.W2 publishes the registry"* and *"Both directions are now declared at both ends"*, both byte-exact at that file's final bytes⟩ · **KF-W4** ⟨§Bounds — the two rows this file's own `:31` already prints correctly — and §Commits commit 2⟩ · **KF-W5** ⟨§Disjointness⟩ · **KF-W6** + **KF-W6-CARRY** ⟨§Carry⟩ ⟨***re-cut at repair round 6, PASS-6 D3: the round-4 BACKWARD block was untouched round-5 text under the words "Verified this round", carrying FOUR per-seat sibling mtimes (~~17:02:55~~ · ~~16:59:44~~ · ~~16:55:55~~ · ~~16:59:25 / 10:49:45~~) and FOUR false coordinates (~~KF-W2 :710/:753~~ → `:782`/`:825`; ~~KF-W4 :54/:58~~ → `:55`/`:59`). The header at `:423` opens the round-5 ledger with "LAW E(4) governs every cross-wave receipt below" — LAW E(4) is unrestricted, the FORWARD half was re-cut with a four-part test and a scope receipt, and the BACKWARD half received nothing. Every ordering this block records is SOUND and re-verified by anchor.***⟩
```

---

#### T7-04 · [W7 D4 · MAJOR] — item 9's quoted-by-command receipt, at its true coordinates

**Anchor**: `:335` ⟨GREP⟩ `grep -n 'KF.W7 may not decide' KF-W2.md` → **`:710`**`
**Exact current bytes:**

```
`grep -n 'KF.W7 may not decide' KF-W2.md` → **`:710`** … `grep -n 'Both directions are now declared at both ends' KF-W2.md` → **`:753`**
```

**Exact replacement bytes** (old→new: `:710` → **`:782`**, `:753` → **`:825`**; **both sentences survive verbatim, so the ordering is sound and nothing downstream weakens** — and the cell's own parenthetical says *"the drift is why LAW C(2) requires the substrate, the mtime and the command, and why the anchor of record is the SENTENCE, not the number"*, then re-issues the numbers anyway):

```
`grep -n 'KF.W7 may not decide' KF-W2.md` → **`:782`** … `grep -n 'Both directions are now declared at both ends' KF-W2.md` → **`:825`** ⟨***re-run at repair round 6, PASS-6 D4. BOTH SENTENCES ARE BYTE-EXACT AT THEIR TRUE LINES and the hard ordering they carry is unaffected — this is the one hard ordering this file added BECAUSE a sibling believed it was reciprocal. Per this cell's own rule THE ANCHOR OF RECORD IS THE SENTENCE, NOT THE NUMBER: the coordinates are printed once, dated, and are not load-bearing.***⟩
```

---

#### T7-05 · [W7 D5 · MAJOR] — the round-5 ledger's self-contradiction about its own transcripts

**Anchor**: `:438` ⟨GREP⟩ `The two `sed -n 'Np'` excerpts that CANNOT be printed whole without quoting a 400-word registry row are marked as fragments with their elisions named`
**Exact current bytes:**

```
**The two `sed -n 'Np'` excerpts that CANNOT be printed whole without quoting a 400-word registry row are marked as fragments with their elisions named** — the honest third option, and the one D11 asks for.
```

**Exact replacement bytes** (old→new: the file's bytes agree with `:427`, not with this cell — `:119` prints `sed -n '69p' kf-SpringTarget.md` **whole** and `:164` prints `sed -n '150p' kf-TimelineTrack.md` **whole**, both byte-diffed EXACT (590 B / 75 words and 77 words), and **there is no fragment-marked `sed` excerpt anywhere in the live file**; the *"400-word"* figure was corrected to 75 by this same round at `:427`):

```
**Both `sed -n 'Np'` excerpts are printed WHOLE — `sed -n '69p' kf-SpringTarget.md` at `:119` (75 words / 590 bytes, measured by this seat) and `sed -n '150p' kf-TimelineTrack.md` at `:164` (77 words) — which is the cheaper discharge the ruling's fragment-marking option left open, and it is the discharge this file took.** ⟨***corrected at repair round 6, PASS-6 D5: the round-5 spelling described a discharge the file did NOT take (there is no fragment-marked `sed` excerpt in the live file) and re-issued the ~~"400-word"~~ figure that `:427`, eleven lines above, had corrected to 75 BY MEASUREMENT in the same round. The two cells were mutually exclusive and the bytes agree with `:427`. The R5-11 TRANSCRIPT ARM — the round's own arithmetic-first instrument — was the cell that failed.***⟩
```

---

#### T7-06 · [W7 D6 · MAJOR · LAW G instance 5] — the FORWARD test's own certifying cell, and the false create-row count

**Anchor**: `:77` ⟨GREP⟩ `⟨`KF-W8.md` §Bounds, **the four create rows**` (and the same substitution at `:352` ⟨GREP⟩ `the … **create rows**` and at `:344`'s membership clause)
**Exact current bytes at `:77`:**

```
**ANCHOR-ONLY — no verb, no glob, no count is restated at this end** … ⟨`KF-W8.md` §Bounds, **the four create rows**; a filename IS an anchor …⟩
```

**Exact replacement bytes** (old→new: **"the four create rows" → the create rows, no count**; measured at `KF-W8.md`'s final bytes its `test/demo/instrument/` creates are **THREE rows** — `:133` `sfc-load.probe.test.ts` · `:134` `groupShortcuts.test.ts` · `:135`, a **single row carrying BOTH** `CSSPasteDialog.test.ts` and `KeyframesAddDialog.test.ts` — so *"the four create rows"* and *"the two characterization-pair create rows"* are both false, **and both are the class the four-part test forbids**; the four FILENAMES are correct and the disjointness assertion is unaffected, which is precisely what makes the count gratuitous):

```
**ANCHOR-ONLY — no verb, no glob, no count is restated at this end** … ⟨`KF-W8.md` §Bounds, **the `test/demo/instrument/` create rows** — named by FILENAME (`sfc-load.probe.test.ts` · `groupShortcuts.test.ts` · `CSSPasteDialog.test.ts` · `KeyframesAddDialog.test.ts`), which IS an anchor; **no count is restated, at repair round 6, PASS-6 D6** …⟩
```

**Same edit, `:344`**: strike the universal ⟨GREP⟩ `every one of them now passing the four-part test above` → *"**the members are enumerated below and each is stated against the four-part test; the round-5 spelling ~~"every one of them now passing"~~ is struck under LAW G, since the cell that certified the test was itself violating it**"*. **Same edit, `:352`**: *"the … create rows"* (plural, for the pair) → *"the two characterization-pair create FILES, which `KF-W8.md` books on ONE row"*.

---

#### T7-07 · [W7 D7 · MAJOR] — `G6`'s fourth witness leaf, path-qualified

**Anchor**: `:279` ⟨GREP⟩ `state.value.keyframes = imported` (**`CSSPasteDialog` consumer path, R-3's `:152`**)`
**Exact current bytes:**

```
`state.value.keyframes = imported` (**`CSSPasteDialog` consumer path, R-3's `:152`**)
```

**Exact replacement bytes** (old→new: an unqualified leaf naming a file that cannot hold its coordinate; `git grep -n 'keyframes = imported' 81a56990 -- demo/` → **`demo/components/instrument/timeline/composables/useTimelineBuild.ts:152`**, and **`CSSPasteDialog.vue` is 80 lines**, so the named file cannot hold `:152` at all — **L-19 forbids a gate resting on an unnamed witness, and this is the gate that locks the whole round-trip family**):

```
`state.value.keyframes = imported` ⟨**`demo/components/instrument/timeline/composables/useTimelineBuild.ts:152`**, on the `CSSPasteDialog` consumer path (R-3)⟩ ⟨***path-qualified at repair round 6, PASS-6 D7: the round-4/5 leaf named ~~`CSSPasteDialog`~~ as the holder of `:152`, and that file is 80 lines at `81a56990` — it cannot hold the coordinate. P8's R-3 row at `:226` carries the same bare `:152` with no file and takes the identical qualification in this edit. The R4-10(1) receipt at `:414` certified "all four are now file+line qualified at 81a56990" over three qualified leaves and this one — LAW G's shape at a gate witness.***⟩
```

---

#### T7-08 · [W7 D8 · MAJOR] — the three P0 spend sites, given §Bounds rows

**Anchor**: §Bounds' access column (**24 rows**, and **none** of the following is among them).
**Current bytes**: `demo/scenes/spring/SpringTarget.vue` · `demo/scenes/spring/SpringPhysicsFacet.vue` · `demo/scenes/sequence/SequenceTarget.vue` · `demo/styles/design-idioms.css` — all four unbounded, while **KF-AV-10** (`:119`) books *"adopt the idiom"* against `design-idioms.css:161-187` and names the live retint seam *"SequenceTarget `:80`, SpringTarget `:113`"* (both verified live at `81a56990`); **m-8**, bundled onto that row, is *"the T.G4 anchor triplet re-authored four times (`.spring-ball`/`.sampler-ball`/`.derby-lane-ball`/`.preset-ball`)"*, resolving at the frontier to `SpringTarget.vue` and `SpringPhysicsFacet.vue`; and **C-4 (SpringTarget)** (`:120`) books *"repo-wide prose sweep + the S-9 evaluate — adopt `/metric` or DELETE THE SENTENCE"*.
**Insert as §Bounds rows (making the access column 27):**

```
| `demo/styles/design-idioms.css` (`:161-187` only) | modify-carve | **KF-AV-10's idiom adoption — the retint seam and nothing else**; carve extent stated so it cannot widen. Added at repair round 6, PASS-6 D8. |
| `demo/scenes/spring/SpringTarget.vue` (`:113` + the `.spring-ball`/`.preset-ball` anchor sites) · `demo/scenes/spring/SpringPhysicsFacet.vue` (the `.sampler-ball`/`.derby-lane-ball` anchor sites) | modify-carve | **KF-AV-10's live retint seam + m-8's T.G4 anchor triplet re-authored four times**; **VERDICT-GATED — no byte is spent before G1's KEEP-BESPOKE-or-ADOPT ruling**, and if G1 rules KEEP-BESPOKE these carves are SPENT-UNUSED and close with the wave. Added at repair round 6, PASS-6 D8. |
| `demo/scenes/sequence/SequenceTarget.vue` (`:80` only) | modify-carve | **KF-AV-10's retint seam, the sequence-side site.** Note: KF.W6 holds a disjoint one-line carve on this file (`:31`'s `.btn-interactive` class attribute) — **the two carves do not overlap and neither widens.** Added at repair round 6, PASS-6 D8. |
```

**Same edit, `C-4 (SpringTarget)` at `:120`** — its *"repo-wide prose sweep"* has no bounds row of any kind and cannot get one; **declare its out-of-bounds landing** in the form this file already uses correctly four times (R-7 → G15 as a ruling gate · KF-KC-11 → CARD-UNIT · C-3 (SpringTrace) → KF.W5/KF.W8 · KF-AV-13 → NO-WAVE-OWNER): *"**C-4's repo-wide prose arm lands NO-WAVE-OWNER; only its `SpringTarget.vue` sentence is in bounds under the carve above, and the S-9 `/metric` evaluate is KF.W7's verdict, not its spend.**"*

---

#### T7-09 · [W7 D9 · MINOR] — the `plugin-vue` transcript, printed whole

**Anchor**: `:31` ⟨GREP⟩ `command pasted: `grep -n 'plugin-vue REGISTRATION' KF-W4.md` → **the §Commits line**`
**Exact current bytes:**

```
command pasted: `grep -n 'plugin-vue REGISTRATION' KF-W4.md` → **the §Commits line**
```

**Exact replacement bytes** (re-run at `KF-W4.md`'s final bytes: **TWO** hits — `:269`, W4's `→ KF.W8` cross-edge row, which books the same registration act from the other side, **and** `:322`, the §Commits line quoted; the extra hit **corroborates** and the conclusion is untouched):

```
command pasted: `grep -n 'plugin-vue REGISTRATION' KF-W4.md` → **`:269`** (W4's `→ KF.W8` cross-edge row, booking the same registration act from the other side — **corroborating**) **and `:322`** (the §Commits line quoted below) — **2 lines, printed whole** ⟨***transcribed whole at repair round 6, PASS-6 D9: the round-5 paste summarised a two-line output as "the §Commits line". It is the fifth pasted command in a live cell, and `:438`'s TRANSCRIPT ARM enumerated only four (`vitejs/plugin-vue` · `KF-AV-17` · `sed 150p` · `§1c` heading) — the class re-cut BY SCOPE at the W8 receipts and BY INSTANCE here.***⟩
```

---

#### T7-10 · [W7 D10 · MINOR] — rule (5)'s cited enumeration, with its counting rule

**Anchor**: `:13` rule (5) ⟨GREP⟩ `:75 ### §1c · Fold-carried lines resolved by identity — **17**, not 16`
**Exact replacement** (the command reproduces at `:75`; the **number** does not — the enumeration beneath lists **18** coordinates: `KT:106 :114` · `TT:86` · `TC:74 :75 :77 :78` · `THP:77 :80 :81 :82 :84 :86 :88` · `SP:92 :143` · `SS:128` · `ST:135`, every one re-read at the bytes; PASS-4's *"16 lines"* enumerated **17**, so the off-by-one was inherited, not cured):

```
`grep -n '^### §1c' PASS-5/KF-W7-CHECK.md` → `:75 ### §1c · Fold-carried lines resolved by identity — 17, not 16` — **and the enumeration beneath that heading lists EIGHTEEN coordinates** (`KT:106 :114` · `TT:86` · `TC:74 :75 :77 :78` · `THP:77 :80 :81 :82 :84 :86 :88` · `SP:92 :143` · `SS:128` · `ST:135`). **COUNTING RULE, stated here because R5-11(1) requires it AT the receipt and the cited artifact states none: `KT:114` is annotated "counted once at §1b" and is therefore NOT counted a second time here, which is the reading that yields 17; under a bare coordinate count the figure is 18.** ⟨***stated at repair round 6, PASS-6 D10: D7's cure corrected the enumeration's MEMBERSHIP and re-inherited its ARITHMETIC — PASS-4's "16 lines" enumerated 17, in the same direction. E-3: the cited artifact is not edited; the rule lives here.***⟩
```

---

#### T7-11 · [W7 D11 · MINOR] — the decorative ellipsis in a LAW D(1) re-quote

**Anchor**: `:31` ⟨GREP⟩ `only `vitest.config.ts` changes **… and this commit is the witness**`
**Exact current bytes:**

```
only `vitest.config.ts` changes **… and this commit is the witness**
```

**Exact replacement bytes** (`sed -n '322p' KF-W4.md` returns *"only `vitest.config.ts` changes **—** and this commit is the witness…"* — **an em-dash, and nothing elided**; the `…` reported an elision that did not occur and **replaced a character of the source**, inside a re-quote labelled *"RE-QUOTED AT REPAIR ROUND 4 UNDER LAW C(2) + LAW D(1) … The elision is marked and the addition disclosed"*):

```
only `vitest.config.ts` changes **— and this commit is the witness** ⟨***the round-4 ellipsis is corrected at repair round 6, PASS-6 D11: the source carries an EM-DASH at that position and NOTHING is elided, so the "…" both reported an elision that did not occur and substituted a character of the source. Harmless in conclusion; recorded because a quotation whose ellipsis is decorative teaches a reader that this file's ellipses are decorative.***⟩
```

---

#### T7-12 · [W7 D12 · MINOR] — the SHADOW line's denominator

**Anchor**: `:433` ⟨GREP⟩ `all 127 roster identities and all 8 non-roster identities remain carried at the rows that carried them before`
**Exact current bytes:**

```
all 127 roster identities and all 8 non-roster identities remain carried at the rows that carried them before
```

**Exact replacement bytes** (old→new: `8` → **7**, matching `:13`'s corrected `9 − 2 = 7`; **the substance is verified TRUE** — no row moved home, and both contested identities are carried, `m-8` at P0's KF-AV-10 row and `PR-CAUTION` at the header lock and §Carry's disclosure — but LAW F(1) makes the shadow line an **act-completeness record**, and a completeness record whose set size does not reproduce from the file's own rule cannot discharge the law it satisfies in substance):

```
all 127 roster identities and all **7** non-roster identities remain carried at the rows that carried them before (**the denominator follows `:13`'s corrected derivation, `9 − 2 = 7`; the round-5 `8` carried D1's phantom operand — corrected at repair round 6, PASS-6 D12. The SUBSTANCE is unchanged and verified: no row moved home, and both contested identities are carried — `m-8` at P0's KF-AV-10 row, `PR-CAUTION` at the header lock and §Carry's disclosure.**)
```

---

#### T7-13 · [W7 D13 · MINOR] — "ELEVEN of the twelve cured here"

**Anchor**: `:440` ⟨GREP⟩ `**ELEVEN of the twelve cured here**`
**Exact current bytes:**

```
**ELEVEN of the twelve cured here**
```

**Exact replacement bytes** (old→new: **eleven → TEN**; D2 is correctly booked-and-declined to RECONCILE (the cert landed it, §4 · R5-R2, verified), but **D7's cure re-points to an enumeration whose own arithmetic does not reproduce** (D10 — and D7's own named class was *"an enumeration that misses a member cannot discharge the rule that cites it"*, which 18-under-17 is) and **D11's discharge is described two ways in the same ledger** (D5)):

```
**TEN of the twelve cured here** (**corrected at repair round 6, PASS-6 D13: D2 is booked-and-declined to RECONCILE, correctly — the certificate landed it at §4 · R5-R2. The two over-claimed are D7, whose cure re-points to an enumeration whose own arithmetic does not reproduce — 18 coordinates under a "17" heading, which is verbatim D7's OWN named class, "an enumeration that misses a member cannot discharge the rule that cites it" — and D11, whose discharge is described two ways in this same ledger at `:427` and `:438`.**)
```

---

#### T7-14 · [W7 D14 · MINOR + U6-C member] — the same-round backward receipts, converted to anchors

**Anchor**: `:76` ⟨GREP⟩ `**2 creates** — `typing-dots-engine-seam.test.ts` · `aurora-opacity-ceiling.test.ts` — **plus one cure site, `resize-tracks.test.ts`**` and `:75` ⟨GREP⟩ `**1 create**`
**Exact replacement** (both re-verified TRUE at those siblings' final bytes — `KF-W4.md:75`/`:83`/`:84` and `KF-W5.md`'s four fixtures ×2 — and they are nonetheless **same-round sibling CONTENT claims of exactly the shape LAW E(4) retires**, left standing because the round-5 conversion enumerated `KF.W8` rather than the class; **D2 is what this looks like when the sibling moves**):

```
`:76` → ⟨`KF-W4.md` §Bounds — the `test/demo/instrument/` create rows (`typing-dots-engine-seam.test.ts` · `aurora-opacity-ceiling.test.ts`) and the `resize-tracks.test.ts` cure row⟩ — **named by filename, which IS an anchor; no verb, no glob, no count restated at this end (LAW E(4)).**
`:75` → ⟨`KF-W5.md` §Disjointness — its create row⟩ — **anchor-only, same rule.**
```
⟨***converted at repair round 6, PASS-6 D14: both claims were TRUE at their siblings' final bytes and are converted anyway, because the class LAW E(4) retires is same-round sibling content claims by a per-wave seat, not false ones. The round-5 conversion enumerated the named sibling (`grep -n 'KF-W8\.md\|KF\.W8' KF-W7.md`) instead of the class — the same keyed-on-the-sibling-not-the-scope mechanism that let D2 survive three rounds.***⟩

---

#### T7-15 · [W7 D2 · MAJOR] — the present-tense claim about `KF-W4.md`, false at that sibling's bytes since round 3

**Anchor**: `:79` ⟨GREP⟩ `⟨`KF-W4.md` §Disjointness says **"ten"** while enumerating nine names and listing `resize-tracks.test.ts` twice`
**Exact current bytes:**

```
⟨`KF-W4.md` §Disjointness says **"ten"** while enumerating nine names and listing `resize-tracks.test.ts` twice; RULINGS-3 §END DH-3 routes that correction to the KF.W4 seat, and it is named here rather than silently reconciled⟩
```

**Exact replacement bytes** (W4 **discharged the routed correction at round 3**; `sed -n '93p' KF-W4.md` reads *"At `81a56990` it holds **NINE tracked files — cardinality corrected at round 3 (D-3/DH-3)**, `git ls-tree -r --name-only origin/master -- test/demo/instrument | wc -l` → **9** … **The round-2 spelling said "ten" by listing `resize-tracks.test.ts` twice** … **The double-count is struck**."* — this file carried it as an open, present-tense finding for **three rounds**):

```
⟨`KF-W4.md` §Disjointness — **the cardinality question is DISCHARGED at that end**: RULINGS-3 §END DH-3 routed the correction to the KF.W4 seat and that seat executed it **at round 3**, striking the round-2 double-count and stating NINE tracked files with its command. **Nothing is owed here and nothing is reconciled silently.**⟩ ⟨***struck at repair round 6, PASS-6 D2: the round-2 finding was carried as LIVE and PRESENT-TENSE for three rounds after the sibling cured it, and it survived round 5 for a mechanical reason the round itself names — the D1/D12 conversion enumerated its class with `grep -n 'KF-W8\.md\|KF\.W8' KF-W7.md`, KEYED ON THE NAMED SIBLING, NOT ON THE STATED SCOPE. This is this file's own quoted lesson — "a repair that cures the named instance and not the stated scope leaves the law green over its own counterexample" — firing one sibling over, in the round that quoted it twice.***⟩
```

---

### `docs/tranches/X/keyframes/waves/KF-W8.md` — ten edits

#### T8-01 · [W8 D-1 · HIGH] — the `G14` SOURCE row's coordinate column, at the projector's true extent

**Anchor**: §Bounds ⟨GREP⟩ `demo/components/playback/AnimationVisualizer.vue` (`:101-106` + `:199` + `:210`/`:215`)`
**Exact current bytes:**

```
| **`demo/components/playback/AnimationVisualizer.vue` (`:101-106` + `:199` + `:210`/`:215`)** | **modify-carve** |
```

**Exact replacement bytes** (old→new: **`:101-106` → `:101-110`**; re-measured at `81a56990`, `git show origin/master:demo/.../AnimationVisualizer.vue | sed -n '101,112p'` → `:101` `const progressFromPointerX = (clientX: number): number => {` … `:109` `return x / maxX;` · **`:110` `};`** · `:112` `const applyProgress` — **the body is ten lines and the column granted six**, while the same row's prose already states *"The grant is therefore `:101-110`, the projector WHOLE"*):

```
| **`demo/components/playback/AnimationVisualizer.vue` (`:101-110` + `:199` + `:210`/`:215`)** | **modify-carve** |
```

**Same edit, the SUBJECT-IDENTITY receipt** ⟨GREP⟩ `progressFromPointerX` ⟨`AnimationVisualizer.vue:101`, its call sites `:210`/`:215`, the ball rect read `:199`⟩` → `progressFromPointerX` ⟨`AnimationVisualizer.vue:101-110` (the whole projector body; `:110` is `};`), its call sites `:210`/`:215`, the ball rect read `:199`⟩`, so `:110` appears in the receipt that certifies the wave's subjects.
⟨***corrected at repair round 6, PASS-6 D-1 (HIGH): G14's cure requires DELETING the projector and repointing `:210`/`:215`; a seat executing from the coordinate column left `:107-110` behind — four orphan lines of a deleted function, exactly what the row's own prose says must not happen. This is D-11's class, and D-11 was cured IN THIS SAME ROUND by re-cutting its coordinate column (`:57` → `:57-67`, with `:57` struck by name): two identical defects, two different cures, inside one edit, and the one that kept the short numeral is the one whose gate is the wave's hardest. THE SHORT NUMERAL CAME FROM R5-4'S OWN RE-DERIVATION — the ruling pinned `:101-106` and the executing seat wrote the true extent in prose and kept the ruling's numeral in the cell. **E-3 DOES NOT REQUIRE THIS**: E-3 preserves the RULING's spelling as a dated record — which the prose already does — it does not require the OPERATIVE GRANT to be issued at the wrong extent.***⟩

---

#### T8-02 · [W8 D-2 · HIGH · LAW G instance 10] — the "applied whole, three ways" claim, true at three ways

**Anchor**: §Gates `G7` ⟨GREP⟩ `The template is now applied whole, three ways:` (and the two sibling assertions at §State ⟨GREP⟩ `The template is now applied whole: here, at the `→ KF.W6` cross-edge, and at KF.W6's own G7-facts row` and at the `→ KF.W6` cross-edge ⟨GREP⟩ `It is now declared at three places`)
**Current bytes**: measured at KF-W6's final bytes, `grep -n 'R5-6' KF-W6.md` → **(empty)** and `grep -nE 'lands first|G7 measures after|atomic commit lands|execution order' KF-W6.md` → **(empty)**; `sed -n '558p' KF-W6.md` still reads *"Anchor-only per LAW C(3) — that seat writes later this round"* — **the sibling ordered only the repair round's writes**, the exact sentence PASS-5 D-4 convicted.
**The edit — two halves, and the first is already ordered**: the reciprocal is LANDED at `KF-W6.md:558` by edit **`W6-17`** (BATCH-W6). At **this** end, replace the certifying clause:

```
The template is now applied whole, three ways: … **(3)** the reciprocal at KF.W6's own G7-facts row is that seat's to state (R5-6(3))
```
→
```
The template is applied at THREE PLACES, each named and each verifiable at its own bytes: **(1)** §State, here · **(2)** the `→ KF.W6` cross-edge, here · **(3)** **`KF-W6.md`'s `→ KF.W8` cross-edge G7-facts row, which states the WAVES' execution order in its own voice — KF.W6's barrel-line strike lands FIRST inside the R4-1 atomic commit, and this wave's G7 MEASURES the result afterward without editing the barrel (R4-5(c))** ⟨***(3) was ASSERTED and did not exist until repair round 6, PASS-6 D-2 (HIGH). RULINGS-5 §END's KF-W6 row listed SEVEN directives — R5-1 · D-P5-2 · D-P5-3 · D-P5-4 · D-P5-5 · D-P5-6 · D-P5-7/8 — and R5-6(3) was NOT AMONG THEM, so the ruling body assigned an owner the directive map never told: the defect is the RULINGS ARTIFACT'S DRAFTING, not this seat's execution, and this file's (1) and (2) were real and verified all along. The comparison this gate itself draws makes the gap sharp: G10's W4 dependency genuinely IS three-way — `KF-W4.md:269` reads "DECLARED FROM THIS END, the reciprocal of KF.W8's re-cut G10" — and G7's was two-way. THIS IS THE R-1 PHANTOM-RECIPROCAL CLASS ONE GENERATION ON, in the wave that names R-1's phantom by id.***⟩
```

---

#### T8-03 · [W8 D-3 · MEDIUM] — the fold-transitivity figure, cited at its true record count

**Anchor**: three sites — §State, §Rows and §Excluded ⟨GREP⟩ `13 records / ≥34 lines, per `PASS-5/KF-W8-CHECK.md §1.3``
**Exact current bytes (each of the three):**

```
13 records / ≥34 lines, per `PASS-5/KF-W8-CHECK.md §1.3`
```

**Exact replacement bytes** (old→new: **13 records → 12 distinct records**; re-run whole, the **34 lines reproduce exactly** (13+8+6+3+3+1) and the record count is **12 distinct**, `kf-PlaybackRibbon` appearing in **two** rows of the cited table — once as a `KF-CE-12` off-record host, once as a `KF-AV-8` one — so the *"13"* is the ROW-sum):

```
**12 distinct records across 13 rows / 34 lines**, per `PASS-6/KF-W8-CHECK.md §1.3` (**counting rule: one unit = one DISTINCT record; `kf-PlaybackRibbon` appears in two rows of the cited table — once as a `KF-CE-12` off-record host, once as a `KF-AV-8` one — and the round-5 "13" was the row-sum**) ⟨***corrected at repair round 6, PASS-6 D-3: R5-7/D-6 ordered "cite, don't count", and the file both cited AND counted, at three sites, inheriting the cited artifact's own double-count verbatim. THE VERDICT IS UNMOVED — all thirty-four resolve as non-escapes and `0 escaped` is reconfirmed independently — but the class is exactly the one D-6 convicted: a figure reprinted from an artifact that does not support it, now one generation on and inside the citation that was supposed to end the practice.***⟩
```

---

#### T8-04 · [W8 D-4 · MEDIUM + U6-C's densest instance] — twenty per-seat stamps, eight asserting "FINAL"

**Anchor**: the twenty stamps in the body — `16:55:55` ×**10** · `16:59:25` ×**5** · `15:39:04` ×**4** · `15:51:10` ×**1** · `17:02:55` ×2 · `16:58:59` · `16:56:52` · `16:59:44` — and the eight *"final stage-1 bytes"* sites: §Bounds' `engine/animation.ts` row, its `ingest/cssom.ts` row, the `package.json` DH-2 cell, the shared-directory DH-3 cell, the struck `shell/index.ts` row, `G7`'s reachability clause, `R-1`'s third re-measurement, and `R-4`'s verbatim cell.
**The edit — apply the file's OWN proven cure form**, already used at its ledger header `:24` (*"⟨**dated round-3/4 reading; struck as a live claim at round 5 — stamps live at `PASS-5/CLOSE-CERT-2.md`**⟩"*), at each of the twenty:

```
⟨***dated round-4 reading; STRUCK AS A LIVE CLAIM at repair round 6 (PASS-6 D-4; LAW E(4) is program-wide) — the stamp of record is `PASS-6/CLOSE-CERT-6.md` §9's hash bracket***⟩
```

**And at each of the eight**, the phrase *"final stage-1 bytes"* → *"the bytes read at that dated round-4 seat; NOT final — KF-W5/KF-W6 are `2026-08-29 15:17:38` and KF-W7 is `15:18:37`, all hash-pinned at the certificate"*. ⟨***the round-5 header stated the stamps were "struck to a pointer at the LEDGER below", and the LEDGER duly carried its strike and its SHADOW line; OUTSIDE IT THE MECHANISM WAS UNTOUCHED. Nothing substantive moves — every anchor those stamps ride re-resolves — but the file that supplied D-7's own diagnosis, "seats stamp clocks they cannot keep", kept twenty of them, eight declaring FINAL of bytes that are not.***⟩

---

#### T8-05 · [W8 D-5 · MEDIUM] — the ACCESS-COLUMN receipt's scope, extended by the wave's own headline act

**Anchor**: the access-column scope receipt ⟨GREP⟩ `round-4 8 rows / 14 paths + round-5 8 rows / 9 paths = **16 / 23**`
**Current bytes**: the arithmetic **reproduces** (8/14 + 8/9 = 16/23 ✓) and the scope does not: `src/animation/compile/emit/format/format.ts` (*"Serializer copy 1 (`selectorText:20`)"*), `src/animation/compile/emit/css-text.ts` (*"copy 2 (`serializeSelector:58`)"*) and `src/animation/compile/emit/index.ts` (*"the export list G3 amends"*) are **`modify-carve` rows carrying G3's delete-and-repoint act — the wave's unit-d core** — and appear in **neither** the 16/23 enumeration **nor** the *"rows that changed access and owe no census"* list.
**Exact replacement bytes:**

```
round-4 8 rows / 14 paths + round-5 8 rows / 9 paths + **round-6 3 rows / 3 paths (added at PASS-6 D-5: `src/animation/compile/emit/format/format.ts` — serializer copy 1, `selectorText:20`; `src/animation/compile/emit/css-text.ts` — copy 2, `serializeSelector:58`; `src/animation/compile/emit/index.ts` — the export list G3 amends; all three `modify-carve` rows carrying G3's delete-and-repoint act, the wave's unit-d core)** = **19 / 26** ⟨***the `0 owed` verdict SURVIVES and is re-measured at the frontier: both bodies are file-local — `git grep -n 'serializeSelector' origin/master -- src test demo` → `css-text.ts:58` (decl) + `:75` (sole use); `git grep -n 'selectorText' origin/master -- src` → `format.ts:20` (decl) + `:132`/`:201`/`:280`/`:313` — so no consumer outside either file is repointed and no LAW-A census is owed. The defect was the receipt's, not the rows': a sweep re-cut to be exhaustive over the access column omitted the three rows the wave's own headline act operates on, while inviting the test — "A pass-6 seat tests this by SCOPE."***⟩
```

---

#### T8-06 · [W8 D-6 · MEDIUM] — the R5-5 SHADOW's terminus list, with KF.W10 named

**Anchor**: the R5-5 SHADOW ⟨GREP⟩ `citing/terminus waves notified = {KF.W6 · KF.W7 · KF.W4}`
**Exact current bytes:**

```
citing/terminus waves notified = {KF.W6 · KF.W7 · KF.W4}
```

**Exact replacement bytes** (two of the five rows it mints are `demo/scenes/spring/StartingStyleTarget.vue:87` and `demo/scenes/easing/EasingTarget.vue:143`, and the first record says at the bank — `kf-StartingStyleTarget.md:35` — *"**NO-WAVE-OWNER** = SS-1/SS-2 spec-authoring intake (**the spring artifact-truth packet**)"*, a packet enumerated as **KF.W11 cargo at `KF-W10.md:588 §6.D` row 1** (*"spring-artifact-truth"*) and again in the canonical 17-packet roster at `:612`; **the sibling mint on the same round — the G14 SOURCE row — DOES notify KF.W10 for a weaker reason**):

```
citing/terminus waves notified = {KF.W6 · KF.W7 · KF.W4 · **KF.W10 ⟨§6.D — the successor-formation register; two of this SHADOW's five mints (`demo/scenes/spring/StartingStyleTarget.vue:87` · `demo/scenes/easing/EasingTarget.vue:143`) touch the surface of a REGISTERED successor packet — kf-StartingStyleTarget's bank routes its NO-WAVE-OWNER cells to the "spring artifact-truth" packet, KF.W11 cargo at §6.D row 1 and in the 17-packet roster. ANCHOR-ONLY, and nothing is annexed: the row itself declares "`demo/scenes/**` is otherwise untouched by this wave … this row is one import line and reaches nothing else", which this seat verifies⟩**} (KF.W10 added at repair round 6, PASS-6 D-6 — what was short was the notification list LAW F(2) hands the reconcile seat to re-sweep, not the substance)
```

---

#### T8-07 · [W8 D-7 · LOW] — the SUBJECT-IDENTITY receipt's block 3, given the arithmetic its rule requires

**Anchor**: the SUBJECT-IDENTITY receipt, block 3 ⟨GREP⟩ `the nine rows minted this round add their own subjects, each re-read at the same ref by the same rule`
**Current bytes**: blocks 1 and 2 close with arithmetic (**14 present, 0 absent** · **5 present, 0 absent**, all nineteen re-verified at `81a56990`); **block 3 closes with no figure at all**, while collapsing four `CopyButton` sites into one bullet and four `AnimationVisualizer` sites into another — **exactly the N-sites-to-one-bullet shape the receipt's own rule forbids** (*"one subject = one ⟨symbol, path:line⟩ pair; a §Bounds row naming N symbol sites contributes N subjects"*).
**Insert as block 3's closing line:**

```
**Block 3 arithmetic, stated under the receipt's own rule (added at repair round 6, PASS-6 D-7): the nine minted rows contribute their subjects ONE PER ⟨symbol, path:line⟩ PAIR, never one per bullet — the four `CopyButton` sites are FOUR subjects and the four `AnimationVisualizer` sites are FOUR subjects, not two bullets. TOTAL: N present, 0 absent, each re-read at `origin/master 81a56990`.** ⟨***this was the ONE block in the file with no arithmetic to test, in a receipt that states its counting rule at itself and under R5-11's order that the checks test receipt arithmetic BEFORE its scope. The executing seat prints the enumerated total in place of N.***⟩
```

---

#### T8-08 · [W8 D-8 · LOW · LAW G instance 9] — the act-coverage sweep, enumerated to fourteen

**Anchor**: the act-coverage sweep ⟨GREP⟩ `Swept whole`
**Current bytes**: its stated source is *"every ruling at §Sequencing and every `lands as` cell at §Rows"*, and it enumerates **ten**. **Not swept: four booked acts** — R-5's `measure`-project adoption (§Rows, *"unit g · G9 — adopt in place"*), G10's `+@vue/test-utils` residual manifest act, the **four `create` test files**, and the **two `create` doc paths**.
**Exact replacement bytes:**

```
**FOURTEEN acts, enumerated — the ten swept at round 5 plus FOUR added at repair round 6 (PASS-6 D-8): R-5's `measure`-project adoption ⟨§Rows, unit g · G9 — adopt in place⟩ · G10's `+@vue/test-utils` residual manifest act · the four `create` test files ⟨§Bounds `test/demo/instrument/` rows `:133`/`:134`/`:135`⟩ · the two `create` doc paths.** **EVERY ONE OF THE FOURTEEN IS COVERED BY A §Bounds GRANT, so the sweep's VERDICT is true and no act is unbounded** ⟨***the round-5 spelling ~~"Swept whole"~~ is struck under LAW G: a receipt claiming exhaustiveness over an ENUMERABLE source while enumerating a subset is the receipt-arithmetic class R5-11 named, in the very class R5-11 commissioned. The verdict was right; the enumeration was short by four.***⟩
```

---

#### T8-09 · [W8 D-9 · LOW] — the `useToolbarKeyboard.ts` docblock carve, one line shorter

**Anchor**: §Bounds ⟨GREP⟩ `:25-28` for *"the docblock prose only"*
**Exact current bytes:**

```
`:25-28` … the docblock prose only
```

**Exact replacement bytes** (re-read at the frontier, `git show origin/master:…/useToolbarKeyboard.ts | sed -n '23,30p'`: `:25` carries the CopyButton name, `:26`/`:27` are its continuation, and **`:28` is ` */`, the comment TERMINATOR** — a prose carve that includes the block's closing token is the mirror of the extent class cured elsewhere this round: **not short, one line long**):

```
`:25-27` … the docblock prose only ⟨***re-cut at repair round 6, PASS-6 D-9: `:28` is ` */`, the comment terminator, and is NOT prose. The correction target is unambiguous and no gate turns on the extent.***⟩
```

---

#### T8-10 · [W8 D-10 · LOW] — `KF-CB-37`'s fifth death, recorded

**Anchor**: `R-1`'s coordinate-mortality paragraph ⟨GREP⟩ `recorded as a fourth measurement, not as an anchor`
**Exact replacement** (the paragraph records `:410` → `:417` → `:445` → `:514`; re-run at W6's final bytes, `grep -n 'KF-CB-37' KF-W6.md` → **`:558`**):

```
recorded as a fourth measurement, not as an anchor — **and a FIFTH at repair round 6: `grep -n 'KF-CB-37' KF-W6.md` → `:558` (PASS-6 D-10), so the enumeration now reads `:410` → `:417` → `:445` → `:514` → `:558`, five deaths across five rounds.** ⟨***THE RECEIPT SURVIVES, WHICH IS THE PARAGRAPH'S WHOLE POINT: the §-heading + cross-edge label are the anchor, and the guard is byte-exact at `:558`. Recorded so the next round's re-anchor seat has the current reading and does not re-derive it — and the same pattern recurs at every other W6/W5/W7 coordinate this file records, which is the argument for anchors over numerals stated as a measurement rather than as a preference.***⟩
```

---

### `docs/tranches/X/keyframes/conformance/PASS-6/RULINGS-6.md` (new file) — eight standing edits

These are the round's laws and its §END directive map. **Two of them exist because round 5's rulings artifact assigned owners its directive map never told** (`R5-6(3)`, `R5-12(2)`) — the single largest manufacturer of this round's top-tier defects — so the §END rows are written here as commissioned directives, not as ruling-body prose.

#### TR-01 · [U6-C · MAJOR] — the LAW E(4) retirement instrument: an enumerated sweep, not a certification of a sample

```
**LAW E(4), RE-ISSUED WITH ITS SWEEP (round 6).** The retirement of per-seat substrate stamping is discharged by a SWEEP WITH AN ENUMERATION, never by a certification. The sweep is: `grep -lE '\b1[5-9]:[0-5][0-9]:[0-5][0-9]\b' waves/KF-W*.md`, and **the per-file result — including the ZEROS — is printed in the close certificate**. At round-5 close the command returned SEVEN of eleven (`KF-W1` · `KF-W2` · `KF-W5` · `KF-W7` · `KF-W8` · `KF-W9` · `KF-W10`) while `CLOSE-CERT-2` §5 certified *"16 of 16 disposed. The class is retired … these are its terminal members."* **THE PROVEN CURE FORM, applied at one seat of seven and now mandated at all: the struck-label form at `KF-W8.md:24` — ⟨dated round-N reading; struck as a live claim at round M — stamps live at ⟨the certificate⟩⟩ — which strikes the stamp AS AUTHORITY, preserves it AS RECORD, and re-points the stamp authority to the certificate's hash bracket. The cure is DELETION, never REFRESHMENT**, because every member of this class is non-load-bearing by construction: the anchors the stamps accompany all resolve, which is the whole reason the numerals may go. **Member roster for round 6, with owning edits: `T7-03` · `T8-04` · `C-33` · `C-34` · `T5-03` · `T2-12` · `C-19`/`C-20`.**
```

#### TR-02 · [U6-D · MAJOR] — the output-vs-roster diff instrument (S-1's seventh firing, closed)

```
**LAW H (the reading discipline).** A pasted command's OUTPUT is compared ROW BY ROW against the roster it is claimed to satisfy, and **the comparison is printed**. Summarising an output is the conviction — at every seat, every time. **The evidence this law is written from**: pass 6's second hard escape travelled through THREE instruments, each individually defensible, and the chain was never read. (i) `KF-W0.md:743`'s LAW F(1) SHADOW line was written, and written CORRECTLY, routing six NO-WAVE-OWNER `EH-*` ids to `KF.W10 §E · G-2`. (ii) `CLOSE-CERT-2` §7.6's LAW F(2) sweep CERTIFIED every terminus re-swept and performed ONE leg — it read `KF-W0.md`'s reciprocal, quoted its arithmetic `3 + 2 + 6 + 4 = 16 ✔`, and did not follow the `6`. (iii) `KF-W10.md:122`'s close-clock arm RAN, **its own output contained `KF-W0.md:743`**, its verdict said *"No unbooked terminus survives this run"*, and its notification roster said FOUR where the bytes carried FIVE. **What R5-10(3) built was a command; what it did not build is the discipline that the command's output is diffed against the roster rather than summarised into a sentence.** Fourth consecutive round of the same shape (PASS-3's R-4 triggers · PASS-4's minted waves · PASS-5's `C-14` · PASS-6's `EH-*` six) — and **the first in which the instrument caught it and the seat read past it.**
```

#### TR-03 · [U6-E · MAJOR] — no receipt ships unrun (the completion law's seventh firing)

```
**LAW I (receipt provenance).** No receipt ships without its own command RE-RUN at the seat's LAST edit — the standing `KF-W3.md:189` rule, promoted program-wide. **A receipt bearing the words "re-run this seat" that was not re-run is a LAW D(1) FALSITY, not an arithmetic slip**, and is graded as one. **The lineage this closes** — R2-5 → R3-11(e) → R4-10(1) → R5-11 → this — and the round-6 evidence that R5-11 detects perfectly and does not yet govern authoring: `KF-W0.md`'s C-1.R row 7 (both figures one short under a "re-run this seat" label, and INHERITED VERBATIM from the prior pass's check) · `KF-W6.md`'s A-5 census (9 composed as 8, no counting rule) · `KF-W7.md`'s phantom `+1` operand and its SHADOW denominator · `KF-W4.md`'s numeric-arm receipt (three exceptions listed after the round corrected four more) · `KF-W1.md`'s class-(b) locus (7 of 15 members outside the stated range) and its six-rows-over-five · `KF-W5.md`'s tally mis-partition · `KF-W9.md`'s alias universal (six co-ids falsify) · `KF-W10.md`'s 12-of-13 transcript (the dropped coordinate MINTED BY THE CERTIFYING SEAT ITSELF, 47 seconds earlier). **The law's own instrument — arithmetic before scope — is precisely how the pass-6 checks convicted this crop.**
```

#### TR-04 · [the FALSE-UNIVERSAL BAN] — LAW G, landed

```
Land LAW G verbatim as written at §0 of this work order, with its twelve enumerated instances and their owning edits carried as the law's own worked examples. **The law's teeth are in its last sentence: verification is by FORM, never by token.** `CLOSE-CERT-2 §7.6` certified *"five SHADOW lines present"* at KF-W6 by running `grep -c 'SHADOW'` → 5 — **the word, not the form** — while the file carried ONE line in LAW F(1)'s form against SIX acts in its own ledger. The form-pattern for LAW F(1) is `grep -noE 'SHADOW \(LAW F\(1\)'`; a pattern that cannot distinguish an act from a mention does not verify the law it audits.
```

#### TR-05 · [§END, KF-W6 row] — R5-6(3), commissioned

```
**§END · KF-W6 — DIRECTIVE R6-A (the re-issue of R5-6(3), never commissioned at RULINGS-5 §END and therefore never landed; PASS-6 KF-W8 D-2, HIGH).** KF.W6's `→ KF.W8` cross-edge G7-facts row states, IN KF.W6's OWN VOICE, the WAVES' execution order: the barrel-line strike lands FIRST inside the R4-1 atomic commit; KF.W8 §Gates G7 MEASURES the result afterward and performs no barrel edit (R4-5(c), KF.W6 is the barrel's ONE write owner). **This is an ordering of the waves' EXECUTION, not of the repair round's WRITES — the discrimination PASS-5 D-4 convicted the round-4 sentence for collapsing.** Executed at edit `W6-17`; the sibling's certifying clause is corrected at `T8-02`. **Attribution recorded because it is the round's transferable finding: RULINGS-5's body assigned owner KF-W6 and its §END row listed seven directives without this one — a ruling that names an owner but does not reach the directive map is a ruling that does not exist, and it manufactured a HIGH at a seat that executed everything it was told.**
```

#### TR-06 · [§END, KF-W3 row] — R5-12(2)'s citing-sibling sweep, commissioned

```
**§END · KF-W3 — DIRECTIVE R6-B (the citing-sibling half of R5-12(2), never swept; PASS-6 KF-W3 D-3, MAJOR).** The COHESION ownership vehicle is re-cut at KF-W3's `:311` and `:41` to the ruled form — *"§0e or a successor letter, because §0c and §0d are OCCUPIED"* — because `COHESION.md:170` IS `§0c` and carries the unrelated X·V refinement-fold subject, so a seat resolving KF.W10's ownership gap from W3's routing opens §0c, finds it landed, and reads the precondition satisfied: **verbatim the outcome R5-12(2) exists to prevent.** Executed at edits `T3-02` and `T3-03`. **Attribution: R5-12(2) enumerated FIVE sites, every one inside `KF-W10.md`; W10 executed thoroughly (7 instances of the replacement form) and the ruling never reached the citing sibling. LAW F(2) put that duty on RECONCILE — "re-sweeps every named terminus and every CITING SIBLING" — and W10's own SHADOW ledger booked the re-point at "TEN sites", ten being its own, naming no citing sibling at all.**
```

#### TR-07 · [LAW E(5)] — the cross-class sweep, re-cut to the actor test

```
**LAW E(5), RE-CUT (round 6).** The cross-wave sweep's classes are unchanged; its TEST is not. For every sentence in the eleven that names a sibling wave as the ACTOR of an act — `W<n> runs` · `W<n> prints` · `arms if and only if KF.W<n>` · a commissioning `→ KF.W<n>` — **the sweep OPENS the named sibling and requires a cell, a §Bounds row, or a seat that holds the act. A token match is not a landing.** `CLOSE-CERT-2` §1 swept class (iii) at **418 tokens**, verdict *"swept whole; 1 defect found"*, and pass 6's hard escape 1 — `OP-4`, commissioned at `KF-W5.md:66` and conditioned at `KF-W8.md:256`, reaching `grep -c 'OP-4' KF-W0.md` → **0** — travelled straight through it. **R5-10(3)'s close-clock arm was written for exactly this shape and was scoped to mechanism-D terminus verbs at KF.W10 only; generalised as above, it catches this.** Landed at edits `T0-01`/`T0-02`/`T0-03` and erratum `C-09`.
```

#### TR-08 · [LAW F(1)/(2)] — verification by form, and the terminus sweep's printed diff

```
**LAW F, RE-ISSUED (round 6).** **F(1)** is unchanged in substance and gains its verification pattern: the at-the-act SHADOW line is tested by `grep -noE 'SHADOW \(LAW F\(1\)'` — THE FORM — and the count is diffed against the file's own act ledger, per file, with the diff printed. At round-5 close KF-W6 carried **1 of 6** and KF-W9 **2 of 8**, both under declared universals, while KF-W5 carried **fourteen** (writing one even where nothing moves — *"struck set = ∅ rows — a clock is struck"*) and KF-W8 carried three including two `widened set =` lines for exactly the grant-widening act KF-W6 performed bare: **the standard was available in-round at two siblings, so the failure was reception, not capability.** **F(2)** gains LAW H's printed diff (`TR-02`) and one addition: **the SHADOW ledger's STRUCK list is grepped against the file's own bytes before close — an act declared struck that still occurs is an UNLANDED act, whatever the ledger says** (the mechanism behind PASS-6 KF-W6 D-P6-3, where `:643`'s ledger listed the TransportDock *"four subsumed names"* count as struck while the phrase was live at `:560`).
```

---

## §COVERAGE — every one of the 103 register entries, mapped to its edit

**Arithmetic, reproduced from `UNION.md` §6**: 102 raw filings (W0 5 · W1 9 · W2 13 · W3 6 · W4 12 · W5 10 · W6 7 · W7 14 · W8 10 · W9 9 · W10 7) → **4 cross-filed filings folded into 2 union rows** (W0 D-3 ≡ W10 D-6 → **U6-B**; W1 D6-4 + W9 D6-2 → **U6-A**) → 98 retained + 2 fold rows + 3 union class rows = **103**. Every row below carries at least one edit id; **no row is discharged by a universal.**

| register entry | sev | edit(s) | batch |
|---|---|---|---|
| **W6 D-P6-1** trail short by TEN | BLOCKER | `W6-01` `W6-02` | W6 |
| **W6 D-P6-2** LAW F(1) 1-of-6 | BLOCKER | `W6-03` `W6-04` `W6-05` `W6-06` `W6-07` `W6-08` | W6 |
| **U6-A** cert write-order + col B | HIGH | `C-01` `C-02` | CERT |
| **W9 D6-1** col B not measured | HIGH | `C-19` | CERT |
| **W8 D-2** R5-6(3) never commissioned | HIGH | `W6-17` `T8-02` `TR-05` | W6 / TAIL |
| **W8 D-1** G14 grant six of ten | HIGH | `T8-01` | TAIL |
| **W10 D-1** the `EH-*` six escape | MAJOR | `C-28` | CERT |
| **W0 D-1** the `OP-4` escape | MAJOR | `T0-01` `T0-02` `T0-03` | TAIL |
| **W10 D-2** §7.6 sweep asserted | MAJOR | `C-06` | CERT |
| **U6-C** LAW E(4) asymmetry class | MAJOR | `TR-01` `C-07` | TAIL / CERT |
| **U6-B** §9 opening column | MAJOR | `C-03` | CERT |
| **U6-D** S-1's seventh firing | MAJOR | `TR-02` | TAIL |
| **U6-E** R5-11's seventh firing | MAJOR | `TR-03` | TAIL |
| W0 D-2 C-1.R membership receipt | MAJOR | `T0-04` | TAIL |
| W0 D-4 the `78` cell | MINOR | `T0-05` | TAIL |
| W0 D-5 LAW-B citation at PASS-4 | MINOR | `T0-06` | TAIL |
| W1 D6-1 `2 / 2` stale operand | MAJOR | `C-12` | CERT |
| W1 D6-2 `0 in FOUR` ×3 | MAJOR | `C-13` `C-14` `C-15` | CERT |
| W1 D6-3 cert 73-vs-70 | MAJOR | `C-04` | CERT |
| W1 D6-5 W10's stamp table | MAJOR | `C-33` | CERT |
| W1 D6-6 class-(b) locus | MINOR | `C-16` | CERT |
| W1 D6-7 "SIX rows" | MINOR | `C-17` | CERT |
| W1 D6-8 63-vs-64/37 | INFO | `C-05` | CERT |
| W1 D6-9 dated intervals | INFO | `C-18` | CERT |
| W2 D-1 engaged-record rule | MAJOR | `T2-01` | TAIL |
| W2 D-2 escape E1 `KF-ET-1` | MAJOR | `T2-02` | TAIL |
| W2 D-3 escape E2 ruling 9 | MAJOR | `T2-03` | TAIL |
| W2 D-4 escape E3 `KF-KE-58` | MAJOR | `T2-04` | TAIL |
| W2 D-5 the D-8 cure's pastes | MAJOR | `T2-05` | TAIL |
| W2 D-6 A-2 post-condition | MINOR | `T2-06` | TAIL |
| W2 D-7 shadow-ledger falsifier | MINOR | `T2-07` | TAIL |
| W2 D-8 escape E4 bank's reading | MINOR | `T2-08` | TAIL |
| W2 D-9 escape E5 `KF-AV-8` | MINOR | `T2-09` | TAIL |
| W2 D-10 escape E6 `SUP-2` | MINOR | `T2-10` | TAIL |
| W2 D-11 COHESION §0d | MINOR | `T2-11` | TAIL |
| W2 D-12 three FINAL-BYTES stamps | MINOR | `T2-12` | TAIL |
| W2 D-13 kf-EditorHeader read reason | MINOR | `T2-13` | TAIL |
| W3 D-1 anti-drift figure 10→12 | MAJOR | `T3-01` | TAIL |
| W3 D-2 W10 edge-2 pre-repair cell | MAJOR | `C-34` | CERT |
| W3 D-3 §0c vehicle ×2 sites | MAJOR | `T3-02` `T3-03` `TR-06` | TAIL |
| W3 D-4 LAW E(4) alive in 7 of 11 | MAJOR | `C-07` `TR-01` | CERT / TAIL |
| W3 D-5 drift row 6 denominator | MINOR | `C-08` | CERT |
| W3 D-6 E-15 discriminator | INFO | `T3-04` | TAIL |
| W4 D-1 `G-KFW4-11` artefact identity | MAJOR | `T4-01` | TAIL |
| W4 D-2 twelve PASS-4 citations | MAJOR | `T4-02` | TAIL |
| W4 D-3 numeric-arm receipt | MAJOR | `T4-03` | TAIL |
| W4 D-4 oracle narrower than falsifier | MAJOR | `T4-04` | TAIL |
| W4 D-5 five asserting specs → three | MINOR | `T4-05` | TAIL |
| W4 D-6 §Excluded 21's coordinate | MINOR | `T4-06` | TAIL |
| W4 D-7 two definitions of *routed* | MINOR | `T4-07` | TAIL |
| W4 D-8 four-vs-five scripts | MINOR | `T4-08` | TAIL |
| W4 D-9 ungranted `evidence/` redirect | MINOR | `T4-09` | TAIL |
| W4 D-10 SHADOW empty set vs verb | INFO | `T4-10` | TAIL |
| W4 D-11 provenance out of order | INFO | `T4-11` | TAIL |
| W4 D-12 round-4 voice in round-5 file | INFO | `T4-12` | TAIL |
| W5 D-1 `:98`/`:123` off by one | MAJOR | `T5-01` `C-10` | TAIL / CERT |
| W5 D-2 LAW F(2) probe two files | MAJOR | `T5-02` | TAIL |
| W5 D-3 probe-free clocks universal | MAJOR | `T5-03` | TAIL |
| W5 D-4 `G-CSSIDENT` subject set ×2 | MAJOR | `T5-04` `T5-05` | TAIL |
| W5 D-5 19-of-20 observability | MAJOR | `T5-06` | TAIL |
| W5 D-6 superseded artifacts | MAJOR | `T5-07` | TAIL |
| W5 D-7 count-oracle mis-partition | MINOR | `T5-08` | TAIL |
| W5 D-8 §Spec-home probe | MINOR | `T5-09` | TAIL |
| W5 D-9 contrast figure 31 | MINOR | `T5-10` | TAIL |
| W5 D-10 successor descriptor stale | MINOR | `T5-11` | TAIL |
| W6 D-P6-3 `:560` reclassification | MAJOR | `W6-09` | W6 |
| W6 D-P6-4 A-5 arithmetic (+A-1) | MAJOR | `W6-10` `W6-11` | W6 |
| W6 D-P6-5 `G-W6-10` symbol | MAJOR | `W6-12` `W6-13` | W6 |
| W6 D-P6-6 ToggleGroup `:64` | MINOR | `W6-14` | W6 |
| W6 D-P6-7 routed-census diff | MINOR | `W6-15` `W6-16` | W6 |
| W7 D1 phantom `+1` operand | MAJOR | `T7-01` `T7-02` | TAIL |
| W7 D2 false-since-round-3 W4 claim | MAJOR | `T7-15` | TAIL |
| W7 D3 BACKWARD block stamps | MAJOR | `T7-03` | TAIL |
| W7 D4 item-9 dead coordinates | MAJOR | `T7-04` | TAIL |
| W7 D5 self-contradicting ledger | MAJOR | `T7-05` | TAIL |
| W7 D6 four-part test violated | MAJOR | `T7-06` | TAIL |
| W7 D7 G6's fourth witness | MAJOR | `T7-07` | TAIL |
| W7 D8 three P0 no-home sites | MAJOR | `T7-08` | TAIL |
| W7 D9 trimmed transcript | MINOR | `T7-09` | TAIL |
| W7 D10 18-under-17 | MINOR | `T7-10` | TAIL |
| W7 D11 decorative ellipsis | MINOR | `T7-11` | TAIL |
| W7 D12 SHADOW denominator | MINOR | `T7-12` | TAIL |
| W7 D13 "eleven of twelve" | MINOR | `T7-13` | TAIL |
| W7 D14 backward content claims | MINOR | `T7-14` | TAIL |
| W8 D-3 12-vs-13 fold citation | MEDIUM | `T8-03` | TAIL |
| W8 D-4 twenty stamps | MEDIUM | `T8-04` | TAIL |
| W8 D-5 access-column scope | MEDIUM | `T8-05` | TAIL |
| W8 D-6 SHADOW terminus list | MEDIUM | `T8-06` | TAIL |
| W8 D-7 block-3 arithmetic | LOW | `T8-07` | TAIL |
| W8 D-8 act-coverage sweep | LOW | `T8-08` | TAIL |
| W8 D-9 docblock carve `:28` | LOW | `T8-09` | TAIL |
| W8 D-10 `KF-CB-37` fifth death | LOW | `T8-10` | TAIL |
| W9 D6-3 LAW E(4) triple prohibition | MEDIUM | `C-20` | CERT |
| W9 D6-4 LAW F(1) 2-of-8 | MEDIUM | `C-21` | CERT |
| W9 D6-5 `G-KFW9-5` ground ×2 | MEDIUM | `C-22` `C-23` | CERT |
| W9 D6-6 SpringTarget `D-4`/`D-8` | MEDIUM | `C-24` | CERT |
| W9 D6-7 alias universal | MEDIUM | `C-25` | CERT |
| W9 D6-8 O-20/O-21 register | LOW | `C-26` | CERT |
| W9 D6-9 ChromeDock `D-2` | LOW | `C-27` | CERT |
| W10 D-3 12-of-13 transcript | MAJOR | `C-29` | CERT |
| W10 D-4 close-clock phantom files | MINOR | `C-30` | CERT |
| W10 D-5 HEAD-pinned scope receipt | MINOR | `C-31` | CERT |
| W10 D-7 frontier divergence | INFO | `C-32` | CERT |
| *(standing)* LAW E(3) + cert naming | — | `C-11` | CERT |
| *(standing)* LAW G, landed | — | `TR-04` | TAIL |
| *(standing)* LAW E(5) actor test | — | `TR-07` | TAIL |
| *(standing)* LAW F re-issue | — | `TR-08` | TAIL |

**Row count: 103 register entries + 4 standing rows = 107 rows over 130 edits.**

---

## §CLOSE — what this work order does and does not claim

**It claims**: every one of the 103 register entries has exactly one named owning edit; every edit names its file, its anchor, its current bytes and its replacement; every derivation the register left open is performed here — the ten trail names with their record routings and their pre-repair zeros, the six LAW F(1) acts with each SHADOW line's text, the eleven true per-wave round-5 clocks with their journal provenance and their UTC→EDT conversion verified against the certificate's own two known values, the two escapes with their banked text and their landings, and every numeral cell as an explicit old→new pair.

**It does not claim**: that the substance beneath needs anything. **It does not.** Pass 6 measured the wave layer sound at all eleven seats — no row, gate, lock, rider, dissent, posture or routing moved wrongly anywhere — the hashes are clean and four-seat-verified, the round closed lawfully for the first time in program history, all eight pass-5 top-tier defects are dead at the bytes, and the drift tail contains **zero load-bearing members**. **Of the 130 edits below, 118 are one-line substitutions, one-line inserts or strikes.** The two BLOCKERs cost **ten trail bullets and five SHADOW lines**; the two hard escapes cost **one §Carry row plus one bounds row at KF-W0 and one mechanism-D row at KF-W10**; the four HIGHs cost **one coordinate (`:106` → `:110`), one commissioned reciprocal sentence, one struck column and one re-derived table**.

**The single transferable instruction, and it is not a law**: *execute the enumerations, not the sentences that summarise them.* Every defect in this register was manufactured by a summary standing where an enumeration belonged.

*Surgical work-order seat, PASS 6. This file is the seat's only write. It stamps no wave, runs no gate, opens no product source, and changes no spec's status. E-3 held: `PASS-5/CLOSE-CERT-2.md`, `PASS-5/RULINGS-5.md` and every prior-pass artifact are cited and never edited; all corrections owed to them live forward at `PASS-6/CLOSE-CERT-6.md` §ERRATA.*
