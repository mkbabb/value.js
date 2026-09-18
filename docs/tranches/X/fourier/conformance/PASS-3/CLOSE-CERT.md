# X·F REPAIR ROUND 3 — FABRICATION-PURGE + CLOSE CERTIFICATE

**Seat**: the PURGE SEAT (R3-3.8 – R3-3.10), running **LAST**, after every content write of the round, over the settled bytes of all eleven specs. **Date**: 2026-08-28. **Writable set honoured**: the eleven `waves/F-W*.md` (receipt / label / citation edits ONLY — no row content, no gates, no counts) ⊕ this file. **Status of every spec is untouched**: no gate was made green, no banked id renamed, no corpus (`fr-*.md`), carry, check-file or rulings byte written.

**Verdict**: the ⟨cmd⟩ surface is CERTIFIED. Every receipt reproduces against the settled bytes, is paired with its live re-reading, or is struck with its dependent claim — **no third disposition survives anywhere in the eleven specs**.

---

## 1 · METHOD — how the sweep was run, and what it is allowed to prove

**1.1 Enumeration.** Every `⟨cmd⟩` marker in `waves/F-W*.md` was extracted mechanically with its line, its command span (both `` ` `` and `` `` `` `` fencing) and the 300 characters following the span — the window in which a receipt states its output. **1,078 markers** were found. **901** carry an executable command; the remaining **177** are prose uses of the marker's *name* (law text, quotations of other seats' receipts, the R3-3.10 statement itself) and carry no operand to run.

**1.2 Execution.** The 901 sites reduce to **696 distinct commands**. Each was run under `bash`, resolving `grep` to `/usr/bin/grep` (BSD grep 2.6.0-FreeBSD), against a **byte-copy** of the settled trees, with `$F`/`$P`/`$V`/`$R`/`$M`/`$X` bound to the paths the specs declare. Each command was attempted across every declared base until one resolved — the specs use ten different cwds and a receipt is not false merely because a reader guessed the wrong one.

**1.3 Three harness traps, disclosed because each one manufactured false convictions before it was caught.** They are recorded so the next sweep does not re-earn them:

- **(i) The escaped pipe.** These files are markdown tables, so a literal `|` inside a command is written `\|`. A sweep that "un-escapes" it silently converts BRE alternation (`grep -o 'A\|B'`, which BSD grep supports) into a literal-pipe pattern that matches nothing. **65 receipts** were wrongly convicted on the first pass by exactly this. Every command is now run under **both readings** and reproduces if either does.
- **(ii) Symlinked operands.** `grep -r` on BSD does not traverse symlinks. A sandbox built from symlinks returned ∅ for every recursive corpus probe — **9 receipts** wrongly convicted. The sandbox is now real copies.
- **(iii) The shadowed `grep`.** In an interactive shell where `grep` resolves to something other than `/usr/bin/grep`, the record-qualification idiom `(^|[NEGATED-CLASS])id(…)` can return **0 matches on text that plainly contains the id**. This seat hit it (a shell function routing to ugrep 7.8.4), believed the ∅ for one reading, and came within one edit of banking a *second* false receipt on top of the one it was convicting. **It is an operator hazard, not a program law and not a claim about how these specs were authored** — the receipts run under `bash`/`/usr/bin/grep` and are certified there. The two receipts in the eleven specs using that idiom were re-run under both binaries; the divergence is noted in place at F-W3 §X.1-v4 item 3.

**1.4 Adjudication.** A receipt is **REPRODUCING** when the command's live output contains what the spec pastes beside it (elisions marked `…` compared on their contiguous runs; word-form claims — *"SEVEN records"*, *"no output"*, *"the G24 row"* — checked against the actual output rather than string-matched). Everything else was read at its site by hand. **No receipt was convicted on an automated verdict alone.**

**1.5 What this certificate does NOT prove.** That the specs' *claims* are true. It proves that every command printed in them runs as printed and returns what is printed beside it. A receipt can reproduce perfectly and warrant a wrong conclusion; that is the check files' work, not this seat's.

---

## 2 · THE SWEEP, PER SPEC

`run` = receipt sites executed · `repro` = reproduced without edit · `fixed` = receipt corrected from live output, completed to a runnable form, or re-quoted from the bytes · `struck` = receipt removed together with the claim resting on it · `paired` = a born-RED zero-run kept and given its live after-reading.

| spec | markers | run | repro | fixed | struck | paired |
|---|---|---|---|---|---|---|
| **F-W0** | 71 | 55 | 51 | 3 | 2 | 1 |
| **F-W1** | 100 | 75 | 72 | 3 | 1 | — |
| **F-W2** | 111 | 97 | 96 | 1 | — | — |
| **F-W3** | 69 | 58 | 54 | 4 | 1 | — |
| **F-W4** | 72 | 64 | 58 | 2 | — | 4 |
| **F-W5** | 103 | 98 | 96 | 2 | — | — |
| **F-W6** | 127 | 111 | 111 | — | — | — |
| **F-W7** | 155 | 140 | 140 | — | — | — |
| **F-W8** | 75 | 56 | 56 | — | — | — |
| **F-W9** | 119 | 83 | 83 | — | — | — |
| **F-W10** | 76 | 64 | 61 | 3 | — | — |
| **TOTAL** | **1,078** | **901** | **878** | **18** | **4** | **5** |

*`struck` counts dependent claims and count-words removed; each rides inside a `fixed` site, so `fixed + paired = 23` is the count of receipt sites that did not reproduce. Markup cures (§6.2) are counted separately and are not command failures. F-W6, F-W8 and F-W9 have **no** command-level defect — their edits are label cures only.*

**878 of 901 reproduced untouched (97.4%).** The 23 that did not are enumerated below; every one is disposed.

---

## 3 · COMMANDS FIXED — 18, by class

### 3a · Cross-wave quotations that a sibling's later write killed (3) — the round's own predicted failure, realised

**F-W0 §3a Q20 and §6b's F.W7 row** banked two word-output receipts into `F-W7.md`: `grep -o 'the phrase has never existed here' F-W7.md` and `grep -o 'F\.W0 caught and minuted its own fabrication before this seat read it' F-W7.md`. **Both return ∅.** F-W7's round-3 write (`mtime 18:44:35`) landed *after* F-W0's (`18:29:10`) and re-worded the passage; neither sentence survived into it.

Re-quoted from F-W7's live bytes — ⟨cmd⟩ `grep -o "an absence receipt that its own quotation falsified" F-W7.md` and `grep -o "stopped being true the instant this file quoted F-W0's strike" F-W7.md` — which say the same thing in the sibling's current words. **The strike's conclusion survives intact and is now proved a third time.**

**This is the round's sharpest lesson and it belongs on the record.** Round 1 asserted. Round 2 counted, and the counts went stale. Round 3 replaced the counts with word-output **on the express ground that word-output survives the sibling's next edit** — and the word-output went stale too, for the identical reason, inside the same round. **Word-output is not stale-proof; it is stale-slower.** The only receipt in that cell to survive all three rounds unedited is the set-membership one (`grep -rl 'Genuinely owed' waves/` → `F-W0.md` · `F-W7.md`), because a set named by filename does not move when the file's prose does. **R3-3.10 ranked its permitted forms correctly but did not say they were unequal: set-membership ≫ classification ≫ word-output ≫ counts.**

### 3b · Banked self-counts and sibling-counts, false at read (5)

Each was banned in terms by R3-3.10 and banked anyway — in four of the five cases *inside the sentence that disclosed the ban*. All are re-stated as set-membership or classification, the forms that survive the next edit.

| site | banked | live | cure |
|---|---|---|---|
| **F-W1** §2·R2a.2 | `grep -o 'CP-ROW-[0-9]*' F-W4.md \| sort \| uniq -c` → `6 CP-ROW-40` | `8 CP-ROW-40` | count **struck**; word-output set kept, cardinality deliberately unstated |
| **F-W1** §2·R2b | `grep -c 'D-corpus' F-W1.md carry/…` → `F-W1.md:0` | `F-W1.md:2` | → `grep -l` **SET** = `F-W1.md` alone; the carry is not a member, which is the whole claim |
| **F-W3** §C | `grep -c 'ContourSettings M-16' F-W3.md` → `0` | `5` | → `grep -l` over the file and both carries; SET = `F-W3.md` |
| **F-W1** §E-3 | the `×4` → `×6` correction itself | `×8` | the count word **struck** rather than corrected a third time |
| **F-W6** §… | `git show HEAD:…/F-W6.md \| … \| wc -l` → `80` | unrunnable | **already self-struck by the F-W6 seat** (*"`HEAD` is a moving reference"*) — verified, left standing as its own erratum |

### 3c · Self-invalidating receipts — the ∅ that the publishing act destroyed (2)

**F-W3 §X.1-v4 items 2 and 3** both banked `m-19 → ∅ across waves/ and carry/`. **The live answer is four files** — `waves/F-W2.md` · `waves/F-W3.md` · `waves/F-W5.md` · `waves/F-W10.md` — **and one of them is F-W3 itself**, because §X.1-v4's own publication wrote the id's name into `waves/`. The ∅ was false from the instant it was written; it is the exact shape R3-3.7 forbade, shipped by the section that cites R3-3.7.

Fixed from live output, and **the surviving claim re-stated as the disposition rather than the absence**: all four hits name `m-19` as v4-assigned residue and **none is a booking**, verified per file. That form cannot be staled by the next spec that cites the id.

### 3d · Unrunnable machinery — commands that could not run as printed (7)

| site | defect | cure |
|---|---|---|
| **F-W4** §0 | `grep -ohP` — BSD grep: *"invalid option -- P"* | → `-ohE`; identical three-member address set returned |
| **F-W4** §2.I | `grep -o 'overflow-x: clip.\{0,300\}'` — *"maximum repetition exceeds 255"*; **and the pasted span over-ran what any runnable bound returns** | split into two receipts that both run and concatenate to the same span |
| **F-W2** §2 | `node -e "import('./dist/subpaths/easing.js')…"` | written out literally; re-ran **EXACT** (`exports: 16` · `bezierPresets keys: 30`) |
| **F-W5** §1 | `sed -n '81,87p'` and `sed -n '87,91p'` — **no file operand**, in the block whose point is that its coordinates were re-read at the bytes | rooted to `$R`; both ranges return exactly the ids listed |
| **F-W10** E-4 | bare `W9.md` — resolves from no declared base, and **three `W9.md` exist across the two trees; only one carries either phrase** | rooted to `$V/docs/tranches/X/waves/W9.md`; both receipts EXACT |
| **F-W10** §2.6 | two `…`-elided INBOX operands ⊕ `-nic` where the output is a bare count | written out; all four readings re-ran **0 · 4 · 1 · 5 · 6 · 6, every one EXACT** |
| **F-W1** §E-3 | `grep -rln 'btn-pill' … \| wc -l` | operand written out from §2·R2b.3; re-ran → **8**, unchanged |

### 3e · A receipt certified NON-reproducing on purpose (1)

**F-W0 §4, the glass-ui HEAD drift receipt.** The banked hashes (`87464122`, `5cd70d08`) do not reproduce; live is `ac204dca`. **The receipt is correct as written and is kept.** It never claimed either hash was current — it pastes *two dated readings by one seat*, taken minutes apart, precisely to demonstrate that the interval between measuring and writing is never zero. The purge seat's own re-run is an **eleventh** drift and is minuted, not banked. **Reproducing this receipt would be the defect.** It is the one deliberate exception in the eleven specs and is flagged here so no later seat "cures" it.

---

## 4 · CLAIMS STRUCK — 4 (each inside the fixed site that replaced its receipt)

1. **F-W0 §3a Q20** · **2. F-W0 §6b** — the two dead F-W7 word-output receipts (§3a above). Struck and replaced; the conclusion they warranted stands on live bytes.
3. **F-W1 §E-3** — the `CP-ROW-` **count word**. Struck outright rather than corrected to `×8`: a count of a live sibling is banned, and this erratum row had already corrected it once.
4. **F-W3 §X.1-v4, the 18-vs-19 slack** — *"none is booked at F.W4 today (`grep` returns no F-W4 hit for any)"*. **FALSE at the settled bytes**: ⟨cmd⟩ `for t in BC-20 M-β1 M-β3; do grep -c -- "$t" F-W4.md; done` → **`4 · 6 · 4`**. Struck **as satisfied, not as wrong** — the twin's receive under R3-1b landed all three *after* this section published them, which is the serial sequence working as designed. The receipt beside it was fixed from live output in the same edit, because a reader running it today is otherwise told the opposite of what the page says.

---

## 5 · BORN-RED ZERO-RUNS — 5 paired rather than struck

R3-1b.1 **required** a receipt engineered to stop reproducing (*"re-run and non-zero after landing"*). R3-3.7 **forbids** self-invalidating receipts. The two rulings collide, and the collision is resolved by **pasting both readings** — the dated BEFORE, and the AFTER that the command actually returns today. The evidentiary function is preserved and a reader who runs the command is no longer handed a contradiction.

| site | before (dated) | after (live, purge seat) |
|---|---|---|
| F-W4 §2.I PAW four | `0 ×4` | `4 · 3 · 3 · 7` |
| F-W4 §2.J GCM ten | `0 ×10` | `5 · 3 · 5 · 12 · 3 · 3 · 3 · 3 · 4 · 5` |
| F-W4 §2.E `BC-10` | `0` | `11` — the R2-3c fifteenth orphan's fold landing on a row this wave now holds (**R3-1b.4 discharged**) |
| F-W4 §2 `showImageOverlay` · `shape only` | `0` · `0` | `1` · `1`, both inside the booking row |
| F-W0 §4 producer HEAD | *(§3e — kept non-reproducing by design)* | `ac204dca`, minuted not banked |

---

## 6 · LABELS BYTE-CHECKED

**6.1 Words: CLEAN, program-wide.** Every span carrying a `verbatim` / `byte-for-byte` / `word-for-word` / `EXACT` label — **724 label sites, 11 specs** — was byte-checked against its cited home across the frozen corpus, both carries, the formation lane files and the sibling specs. Elided quotations were checked on their contiguous runs. **Zero word-level drifts survive.** Rounds 1–3 cured that class; this pass confirms it independently.

**6.2 Markup: 11 spans cured.** The residue was never words. It was **emphasis and code-fencing inside spans presented as command output** — which is exactly why five prior readings passed them: *a reader checking the words finds them all present.*

| spec | span | drift | cure |
|---|---|---|---|
| F-W0 | fr-EasingPicker · *"EasingCurvePreview.vue becomes a DELETION not a re-style"* | bold **added** | re-quoted from bytes — and the same file quotes the same sentence unbolded elsewhere, which is how it was caught |
| F-W0 | fr-CanvasOverlayButton · *"FR-COB-3's mechanism"* | bold added | re-quoted |
| F-W2 | fr-MorphPhaseConfig · *"never a specifier rewrite"* | bold added | re-quoted |
| F-W2 | fr-InfoCard · *"the W.L5 library-band row (…)"* | bold added | re-quoted |
| F-W2 | fr-InfoCard · *"AMENDED by ruling R2-2"* | emphasis boundary | re-quoted; the span opens outside the quotation, so the emphasis is elided rather than invented |
| F-W2 | fr-AdminAuditLog · *"F.W2 must widen or exclude with reasons…"* | emphasis moved **and a full stop moved inside the bold** | re-balanced to the record's own spelling |
| F-W6 | fr-FourierShapeExtractor · *"What moon.json WAS generated from"* | backticks added | re-quoted |
| F-W8 | row 39, fr-GalleryCard:64 · *"serializer → F.W5–W8"* | bold added | re-quoted; emphasis moved outside the quotation marks |
| F-W8 | row 40, fr-CanvasControlsDock:102 · *"C-28 into D-4's F.W5–W8 rider"* | bold added | re-quoted |
| F-W9 | fr-Tooltip · *"… Canvas ×6 · FunctionInput Wand2 ×1 = 17"* | bold added (2 occurrences, 1 span) | re-quoted |
| F-W10 | fr-CollapsibleSection · *"→ F.W3/W4 … + NO-WAVE-OWNER"* | emphasis boundaries shifted | re-quoted to the record's spelling |

**Every cured span was re-quoted from the bytes; none was downgraded to `paraphrase`.** The words were always right, so the stronger disposition was available in every case. **Emphasis balance was verified after every edit: all 31 edited lines are `**`-balanced, and no line's parity changed except where a correction removed invented emphasis.**

---

## 7 · CROSS-WAVE RECEIPTS — the twin hand-off verified at BOTH ends

R3-1's serial twin (F-W3 publishes §X.1-v4 → F-W4 consumes it) was the round's blocking defect and its highest-stakes surface. It was verified **mechanically, per id, in both directions**, not by reading either seat's declaration.

**7.1 RECEIVED — every id §X.1-v4 assigns to F.W4 is held in `F-W4.md`. Misses: ZERO.**

- **The 28 receive-set ids** (v4's record-blind left-token column): `fr-BasisCanvas` ×18 (`BC-3` · `BC-7` · `BC-12` · `BC-14` · `BC-15` · `BC-16` · `BC-18` · `BC-22` · `BC-23` · `BC-24` · `D-10-remnant` · `M-α1` · `M-α4` · `M-α7` · `M-α8` · `M-β2` · `M-β7` · `M-β8`) ⊕ `fr-ContourEditorCanvas` ×9 (`MM-1` · `MM-2` · `MM-3` · `MM-4` · `MM-5` · `MM-7` · `MM-8` · `MM-9` · `MM-12`) ⊕ `fr-EquationResult` ×1 (`FR-EQR-21`) — **all 28 present**, boundary-exact.
- **The axis-(iv) widening** and the three ids v4 settles in F.W4's favour — `BC-20` (4) · `M-β1` (6) · `M-β3` (4) · `GAB-25` (7) — **all present**.
- **The 7 §B.2 residue ids** (R3-1b.1): `SS-C-1` (10) · `FR-EMT-19` (1) · `FR-EMT-23` (2) · `FR-EQC-14` (1) · `D-M12` (2) · `m-15` (1) · `i-6` (6) — **all present**.

**7.2 PUBLISHED — the reciprocal declarations are consistent at both ends.**

- **`"booked (2)"` survives at `F-W4.md` in two places and BOTH are errata**, not live claims: each sits inside the R3-1b.3 minute that strikes the count word and states why (*"the default arm delivers whatever the criterion sends… its output is a SET and never a numeral this section chooses"*). Verified by reading both sites, not by counting the token.
- **The criterion is reproduced independently at the receiving end** over the structural rows alone, so no prose at either end can satisfy it (R3-3.7): ⟨cmd⟩ `grep -h '^- \*\*Files\*\*' F-W3.md | grep -oE 'BasisCanvas|ContourEditorCanvas|EquationResult|GalleryAdminBanner'` → **no output**, re-run by this seat. The four negatives are in no `.a`–`.e` **Files** line, so their residues take the default arm.
- **`L-26` is coherent across the seam**: ruled to F.W3 by R3-1a.3, present in `F-W3.md` ×7, and present at `F-W4.md` as a **citation** inside the conversion minute — the direction R3-1b.4 requires.
- **F.W4's evaluate-scope bounds** hold `BasisCanvas.vue` · `ContourEditorCanvas.vue` · `EquationResult.vue` (R3-1b.2): present, so the wave is permitted to read and judge the files its 28 rows target.
- **The one twin receipt that had gone stale is fixed** (§4 item 4): F-W3's `probe.py` output and its *"none is booked at F.W4 today"* clause — falsified by the receive itself, and now stating the discharge.

**The hand-off is RECEIVED AT BOTH ENDS.** Round 2's failure — *"F-W4 declared the side booked while holding zero of the ids"* — is not merely repaired; it is **falsified by enumeration**, per id, in both directions.

---

## 8 · WHAT THE SWEEP FOUND ABOUT THE PROGRAM

Three findings that outlive this round:

1. **The permitted receipt forms are not equal.** R3-3.10 authorised set-membership, classification and word-output as the forms that "survive the next edit". **Word-output does not.** It died twice in this round alone (F-W0's two F-W7 quotes), for the same reason counts die: the sibling was rewritten. Only **set-membership survived all three rounds unedited** in the one cell where all three forms were tried side by side. The ranking is now measured, not assumed: **set-membership ≫ classification ≫ word-output ≫ counts.**

2. **A receipt can be false and reproduce anyway.** The `m-19` ∅ "reproduced" under one grep implementation and was false under another; the `\|`-alternation receipts reproduce under BSD grep and match nothing under a naive re-reading. **A receipt is only as portable as its engine and its cwd**, and neither is stated in most of these specs. Every receipt in the eleven now resolves from a declared base, and the two engine-sensitive ones say so in place.

3. **Every fabrication this round convicted was minted by a cure.** Round 2's false counts were minted by the repair curing fabricated authority; round 3's dead quotations were minted by the repair curing false counts; and this seat's first draft of the `m-19` correction nearly banked a false engine claim while convicting a false ∅. **The pattern is not that seats are careless — it is that a seat has just authored a rule reads its own compliance as given.** The only thing that has ever caught it is a later reading that trusts nothing it wrote. That is the whole argument for a purge seat running last, and it is the argument for one running after this one too.

---

## 9 · CERTIFICATION

- **1,078** ⟨cmd⟩ markers enumerated across the eleven specs · **901** executable receipt sites · **696** distinct commands · **all re-run** against the settled bytes.
- **878** reproduced untouched (**97.4%**) · **18** fixed from live output, completed to a runnable form, or re-pointed to a base that resolves · **4** dependent claims struck inside those fixes · **5** born-RED zero-runs paired with live after-readings, **one of which** (F-W0's producer HEAD) is certified non-reproducing by design and flagged so no later seat "cures" it.
- **724** label sites byte-checked: **0** word-level drifts · **11** markup-level spans re-quoted from the bytes.
- **Twin hand-off**: verified per id at both ends — **28 + 3 + GAB-25 + 7 = 39 identities, 0 missing**; reciprocal declarations consistent; the one stale twin receipt fixed.
- **31 lines edited** across **10 of 11 specs** (F-W7 required none). **No row content, no gate, no count, no status, no banked id was altered.** No file outside the writable set was written.

**Nothing writes after this seat.** Any later edit to a spec re-opens the ⟨cmd⟩ surface this certificate closes, and the sweep must be re-run — because the single most reliable finding of three rounds is that **the receipt is falsified by the next write, not by the last reader.**

*Purge seat, X·F repair round 3, 2026-08-28. Read-only everywhere except the eleven specs' receipt/label/citation spans and this file.*
