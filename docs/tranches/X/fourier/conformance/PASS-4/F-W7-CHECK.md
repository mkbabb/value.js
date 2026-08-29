# F-W7 — FRESH ADVERSARIAL SPEC CHECK, PASS 4 (X·F L-18/L-20)

**Seat**: fresh, 2026-08-29. **No roster inherited.** Every figure below was re-derived at the bytes by this seat under `bash` with `grep` resolved to `/usr/bin/grep` (BSD grep). The three prior registers (`PASS-1` · `PASS-2` · `PASS-3/F-W7-CHECK.md`), `PASS-3/RULINGS-3.md` and `PASS-3/CLOSE-CERT.md` were read for **binding law and cure-shape only**, never for findings — and, per R3-4, never as an operand. **This file is this seat's only write.** Target: `docs/tranches/X/fourier/waves/F-W7.md` (**312** lines, mtime `2026-08-28 18:44:35`). Corpus: the **66** `fr-*.md` at `docs/tranches/V/megatranche/registry/adjudicated/`. Real carries: `carry/F-W1-CARRY.md` + `carry/F-W4-CARRY.md` only.

**Verdict: DEFECTIVE** — 5 MAJOR · 3 MEDIUM · 3 MINOR · 1 INFO. **Axis 1 (census) is CLEAN and is confirmed for the fourth consecutive pass.** Axis 3 (M-25 depth) is **HELD** — R3-8.1's canonical form landed, every anti-cure survives, the twin partition is consumed correctly. The failures are on **Axis 2 (receipt reality)** and **Axis 4 (operands)**: three receipts do not reproduce — one of them **cannot run at all on the declared engine, at two sites** — and two live operand declarations name check files. The purge certificate's `F-W7: 155 markers / 140 run / 140 repro / 0 fixed / 0 struck` and the spec's own §0 item 7 (*"every one reproduced"*) are both falsified by this seat's re-run.

---

## §1 · AXIS 1 — ID-KEYED CENSUS (fresh enumeration under the §X.1-v4 twin partition)

**Detector, stated inline (R2-9 / R3-5's four axes).** Tokens for this wave in **any row shape** (markdown table row ⊕ id-headed route-marked bullet ⊕ prose walked to its enclosing row id), in **both dash spellings** (U+002D · U+2013), **record-qualified** (the booking test is the `(record, id)` pair), with **every slash/span/band form expanded to its member set at every position** (a member matches whether written first or second in a compound).

| probe | ⟨cmd⟩ (this seat, read-only, cwd = `registry/adjudicated/`) | result |
|---|---|---|
| token-bounded `F.W7`, any shape | `grep -ohE '(^\|[^A-Za-z])F\.W7([^0-9A-Za-z-]\|$)' fr-*.md \| wc -l` | **0** across all 66 |
| bare substring `F.W7` | `grep -n 'F\.W7' fr-*.md` | **2** — `fr-Tooltip.md:10` and `:32` |
| both inside `KF.W7`? | `grep -c 'KF\.W7' fr-Tooltip.md` | **2** — yes; the keyframes cross-repo relay note (`kf-TimelineHoverPreview MISSED-1 ariaLabel cure @ KF.W7`). **Disposed, not routed.** |
| alternate spellings | `grep -nE 'F[·_ -]?W7\|FW7' fr-*.md` | **∅** — no `F·W7`, `F-W7`, `F W7` or `FW7` anywhere in the corpus |
| bare `W7` token | `grep -ohE '(^\|[^A-Za-z0-9.])W7([^0-9A-Za-z]\|$)' fr-*.md \| wc -l` | **0** |
| every `W7` substring, loosest possible | `grep -on 'W7' fr-*.md` | **4** — `fr-Tooltip:10`, `:32` (both `KF.W7`) · `fr-ConvergenceLegend:83` (**`sampleColorRamp M.W7`**, a glass-ui wave) · `fr-GalleryMarquee:73` (**`TW7`**, a base.css clause token). **Zero are `F.W7`.** |
| every span/slash/band form in the corpus | `grep -ohE 'F[.·]W[0-9]+[-–/]W?[0-9]+' fr-*.md \| sort \| uniq -c` | `F.W3/W4` **1010** · `F.W5-W8` **120** · `F.W5–W8` **72** · `F.W9/W10` **54** · `F.W1/W2` **5** · `F.W0/W1` **2** · `F.W1/W3` **1**. **No `F.W6-W8`, no `F.W6/W7`, no `F.W7`-bearing span in either dash spelling.** |
| the terminal-disposition alphabet | `grep -ohE 'F\.W[0-9]+' fr-*.md \| sort \| uniq -c` | `F.W3` 1256 · `F.W4` 1128 · `F.W1` 845 · `F.W5` 245 · `F.W0` 155 · `F.W2` 68 · `F.W9` 54 · `F.W7` **2** (both the `KF.W7` substring above) |

**routedTotal = 0 · bookedCount = 0 · escapedCount = 0.**

**The one class that expands into this wave, disposed at the law.** `F.W5-W8` ⊕ `F.W5–W8` (**192** occurrences, **49** records) expands to `{F.W5, F.W6, F.W7, F.W8}` and therefore reaches W7 at the third position. It is **excluded-with-reason at a named home**, not silently dropped: the band is **F.W5's row** by B-2's adjudicated split (F-W7 §5d, and F-W5 §4's register carries `**F.W5 → F.W6**` · `**F.W5 → F.W7**` · `**F.W5 → F.W8**` — re-run this seat: `grep -ohE '\*\*F\.W5 → F\.W[0-9]+\*\*' waves/F-W5.md | sort -u`), and the per-member residue is F-W6's `FW6-G17` obligation under R3-5.2, not F.W7's. F-W7 §5a's `F-MAIL-∅` states the disposition and measures it spelling-agnostically. **Correct, and not an escape.**

**M-25's four named lock-ids do not route here.** `PAW-44` · `LAW-3` (`fr-PaperArticleWindow`) · `MPC-31` (`fr-MorphPhaseConfig`) · `FR-MSP-6` (`fr-MorphShapePreview`) — none carries an `F.W7` token (the census is ∅ by construction), and `grep -cE 'PAW-44|LAW-3|MPC-31|FR-MSP-6' waves/F-W7.md` → **0**. Their absence is **correct**, not an escape.

**Denominators and arithmetic, all re-derived.** `awk '/^## 5\. Carry/,/^## 6\. Gates/' F-W7.md | grep -ohE 'fr-[A-Za-z]+' | sort -u` → the **15** names the spec publishes, exactly: `fr-AdminAuditLog · fr-BasisCanvas · fr-ContourEditorCanvas · fr-ContourSettings · fr-EquationView · fr-FourierShapeExtractor · fr-GalleryAdminBanner · fr-GalleryDraftsSection · fr-GallerySearchBar · fr-GalleryView · fr-ImageUpload · fr-PaperSidebar · fr-SpeedSelect · fr-Tooltip · fr-VisualizationView`, and the 10/2/3 decomposition holds. §5 rows counted per sub-table: **5 · 1 · 4 · 3 · 2 = 15** ✓. §6 gates = **11** ✓. §7c rows = **17** ✓. N-2's figures reproduce exactly (six-term unbounded → **147** lines; word-bounded → **1** survivor, `fr-ContourEditorCanvas.md:56` L-5, banked `ADJUDICATED → F.W3/W4`, excluded-with-reason at §8).

**Axis 1: CLEAN.** R2-8's closed posture is confirmed a fourth time; the corpus has not changed and this seat re-derives nothing as an open question.

---

## §2 · AXIS 2 — RECEIPT REALITY (≥15 required; **58 ⟨cmd⟩ receipts re-run by this seat**)

Sample far exceeding the floor. **Reproduced byte-exact**: the two struck-string absences (`cite E16 and G7` → ∅; `atomdiff.py:12-14 is the INCUMBENT` → ∅) · F-W5's live idiom sentence · F-W0's `**F.W7** (the owner-gated trie design)` membership, its `THE RECIPROCAL…` head and its `F.W0 books **no** F.W7 registry row…` close · both `grep -rl` file-lists (`Declared-not-carried edge` → `F-W3.md` + this file; `carried on BOTH sides` → `F-W8.md`; `quoted both trees` → `F-W6.md`) · the F-W10 dissent bytes · the paraphrase-STRUCK span · `guardrail is the INCUMBENT, but it is NOT carried on both sides today` · `BILATERALITY CORRECTED AT THIS END…` and its close · **both** P-10 commands (the D-2 cure is real: `Declared-not-carried edge: **F.W7's…**` and `**Explicitly declared as an edge, not carried** — it stays inline in F.W7 (S-6)`) · the `SS-4 FLAGS THIS RULING INLINE…` tail run to the sentence's end (D-7(ii) cured) · all three KF-W1 C-14 quotes, un-fused · the D1 lock **with its restored leading `a `** (D-6 cured) · clause heads `E1 · E3 · E5 · E7 · E8 · E9 · E10 · E11 · E12 · E13 · E17` and their banked-id cells · `v2 states ONE disposition…` · `m-15 is CROSS-REFERENCED, NOT MERGED with F-4` · the record-qualified `fr-ContourEditorCanvas C-2 *(NOT … U-12 qualification)*` · `C-8 upsert arm ("a different point_count can come back") — KILLED` **unformatted** (D-8 cured) · `MOVE A POINT FIRST` at `:139` · `superset of the request fields` at `fr-ContourSettings:43` **at the record's own case** · N-3's **two** spans with **two** commands at the record's sentence-initial case (D-5 cured) · the §X.1-v4 heading, its criterion, and `grep -h '^- **Files**' | grep -o 'ContourSettings'` · the partition's four negatives and `**F.W3 CITES, F.W4 BOOKS.**` · `sed -n '56p' fr-ContourEditorCanvas.md` · the four P-10 limb sources (`F-W3:347` · `fr-EasingPicker:70` · `fr-ContourSettings:100` · `S-6 · Owner-gated flags`) · `fr-CanvasOverlayButton:64`'s table header · S-8 at `fr-AdminAuditLog:126` and K-13 at `fr-GalleryAdminBanner:90` · all three substrate probes (`28` · `cd26c653` on `m/w1-bump-migration` · `cat-file -t 14d83356` → **fatal**) · all three product probes (1 comment hit · `api/src/lib` absent · the single `Merkle property` hit at `hash.ts:6`) · G-F7-8's full operand set (8/8) and `§E` = **E1…E20** · both COHESION quotes run to the end of their sentences (D-7(i) cured) · `ls waves/` = 11 files · F-W6 §5's exclusion twin (two spans, two commands) · F-W8's `.\{0,110\}` and `.\{0,30\}` cuts, both honestly disclosed · F-W10 §2.3's heading and §2.8's minute · F-W1's **two** TWELVE-limb spans at F-W1's own emphasis · F-W0's `single durable artefact…OPTIONs` row **quoted whole** (D-3 cured) · the G-11/G-12 headings · F-W0 §4's masthead and its `A line cite into this file is FORBIDDEN…` clause · §11's two set-membership probes.

**R2-2 anchor idiom: FULLY CONFORMANT.** `grep -oE '(F-W[0-9]+\.md|KF-W[0-9]+\.md|COHESION\.md)[^ ]{0,3}:[0-9]+' F-W7.md` → **∅**. Every surviving `:NNN` addresses the frozen corpus or product source. **`grep -on 'ELEVEN-limb' F-W7.md` → `14` · `228`, both inside self-disclosing strike notes** (R3-10.5's lawful-mention class). **Posture probes**: `**Status**: planned`; exactly **one** `VERIFIED` occurrence (the four-verb row); four `GREEN` occurrences, all gate-discipline statements or the column header — **zero GREEN claimed**.

**Three receipts do not reproduce. Each is stated below with the command and its live output.**

### D-1 · MAJOR — a ⟨cmd⟩ that **cannot execute** on the declared engine, published as "the command's own output", at **two** sites

**G-F7-11**'s F-W6 witness and **§7c's F.W6 row** both bank the same receipt:

⟨cmd⟩ `grep -o 'F.W6 carries the documented default.\{0,262\}' waves/F-W6.md`

Live, this seat, `/usr/bin/grep` (BSD grep, the binary `PASS-3/CLOSE-CERT.md` §1.2 declares the sweep ran under):

```
grep: maximum repetition exceeds 255
```

**The command errors. It prints nothing.** `grep -on '\.\\{0,[0-9]\+\\}' F-W7.md` → `190:.\{0,110\}` · **`200:.\{0,262\}`** · `200:.\{0,110\}` · **`225:.\{0,262\}`** · `226:.\{0,110\}` · `226:.\{0,30\}` — two sites over the cap. And the defect is not curable by re-running at the legal maximum: ⟨cmd⟩ `grep -o 'F.W6 carries the documented default.\{0,255\}' waves/F-W6.md` stops at *"…binds until the **owne**"*, **seven characters short** of the published *"…binds until the **owner moves**"*. **No legal repetition bound on this platform produces the span the spec attributes to this command.**

Both sites frame it explicitly as run output — G-F7-11: *"the command's own output, unbolded and unemphasised beyond the source"*; §7c: *"pasted from the command that prints the span … the character budget cuts mid-word and the cut is disclosed, never rounded"*. The span's **words** are in `F-W6.md` (verified by a runnable split), so the substance holds and the provenance does not. This is precisely the class **RULINGS-3 §3d** named and cured at **F-W4 §2.I** (*"`grep -o 'overflow-x: clip.\{0,300\}'` — 'maximum repetition exceeds 255' … split into two receipts that both run"*) — the identical defect, uncured, in the wave the purge seat certified as needing **no** edits. **Cure**: split into two runnable receipts that concatenate to the span, at both sites.

### D-2 · MAJOR — the receipt inside the OWNER-GATED gate is **shorter than the span it certifies**, under an explicit "as the command prints it, its cut disclosed" label

**G-F7-1** — the wave's keystone gate — banks:

⟨cmd⟩ `grep -o 'owner rules trie-vs-KISS.\{0,110\}' waves/F-W5.md`, *"the green-owner cell **as the command prints it**, its cut disclosed"*, publishing:

> *"owner rules trie-vs-KISS. Absent a ruling v2 carries the honest default: **no trie; whole-snapshot duplication is the recorded shipped behaviour**"*

Live output, this seat (**134** characters):

```
owner rules trie-vs-KISS. Absent a ruling v2 carries the honest default: **no trie; whole-snapshot duplication is the recorded shipped
```

The command stops at **`recorded shipped`**. The published span adds **`behaviour**`** — eleven characters the receipt does not produce, silently completing the truncated word *and* closing the bold. **No cut is disclosed; the cut is repaired.** The file demonstrably knows the honest idiom — at G-F7-11 and §7c it discloses F-W8's `.\{0,110\}` cut mid-word at *"KISS gu"* and leaves it there — which makes the divergence here a choice, not an oversight. This is **PASS-3 D-6's class** (*"a receipt narrower than the quote it certifies certifies nothing"*), which this same round cured at §5b and re-committed at the gate that may not be authored unruled. **Cure**: widen to `.\{0,121\}`, or paste the 134-character output and disclose the cut.

### D-3 · MAJOR — the §2a "load-bearing negative" is a receipt that was **already false when it was written**

§2a's prospective-paths bullet banks:

⟨cmd⟩ `find docs/tranches/X/fourier -type d` → *"the root plus **`carry` · `waves` · `conformance` · `conformance/PASS-1` · `conformance/PASS-2`** — **five directories**, and neither `contract/` nor `design/` is among them (**the load-bearing negative**)"*

Live, this seat, from the repo root:

```
docs/tranches/X/fourier
docs/tranches/X/fourier/carry
docs/tranches/X/fourier/waves
docs/tranches/X/fourier/conformance
docs/tranches/X/fourier/conformance/PASS-3
docs/tranches/X/fourier/conformance/PASS-4
docs/tranches/X/fourier/conformance/PASS-2
docs/tranches/X/fourier/conformance/PASS-1
```

**Eight, not five.** And it is not a later drift: ⟨cmd⟩ `stat -f "%N birth=%SB" -t "%Y-%m-%d %H:%M:%S" …/PASS-3 …/waves/F-W7.md` → `PASS-3 birth=2026-08-28 17:10:17` · `F-W7.md birth=2026-08-28 18:44:35`. **`PASS-3/` existed 94 minutes before the round-3 write** that re-published this enumeration, and the same round's prose cites `PASS-3's F-W7-CHECK` at six separate sites. The receipt's *conclusion* survives — `contract/` and `design/` are still absent — but the enumeration it rests on is wrong, and the wave's own §0 item 3 struck the round-1 form of this same cell for *"understating the enumeration"*. **Cure under R3-3.8**: re-paste from live output, or restate as the classification the negative actually needs (`find … -type d | grep -c 'contract\|design'` → 0), which no later pass can stale.

### D-4 · MAJOR — the self-sweep attestation and the purge certificate are both falsified by D-1 · D-2 · D-3

§0's round-3 item 7 claims, in the file's own voice:

> *"**every ⟨cmd⟩ in this file was re-run by this seat, read-only, against the settled bytes — and every one reproduced.** … A receipt that does not reproduce is fixed from the live output or struck with everything resting on it — there is no third disposition, **and this seat found no third case**."*

`PASS-3/CLOSE-CERT.md` §2 records **F-W7: 155 markers · 140 run · 140 repro · 0 fixed · 0 struck**, and §9 states *"**31 lines edited** across **10 of 11 specs** (F-W7 required none)"*. Three receipts above do not reproduce; **one of them cannot run at all**, and the certificate's own §1.2 declares the sweep ran under `bash` with `/usr/bin/grep` — the exact configuration on which `.\{0,262\}` errors. This is not a stale-by-a-later-write failure (CLOSE-CERT §8.1's discovery): **F-W7.md was never written after the certificate**, so all three were false *at the moment of certification*. The attestation is a live claim of the spec and is convicted independently of the receipts it covers. **Cure**: the sweep is re-run and the transcript re-published with its true `fixed` count; the certificate's F-W7 row is corrected at the purge seat's own hand.

---

## §3 · AXIS 3 — M-25 DEPTH (locks by banked id · anti-cures · twin law)

**HELD. No canonical-form failure survives, and the round-3 cures are real at the bytes.**

**`FR-NP-32` canonical form — R3-8.1 DISCHARGED.** `grep -c 'FR-NP-32' F-W7.md` → **4 lines / 5 occurrences** (PASS-3 measured **0**). The canonical `**FR-NP-32** (≡ **fr-PaperSidebar M1**)` now stands at all three statement sites named by the ruling: **§5e's OG-F1 row** · **§6 G-F7-7's witness** · **§7c's F.W0 row**. `grep -on '(M1)' F-W7.md` → `24` · `178` · `218`, and **all three are self-disclosing erratum mentions** (*"through pass 2 this row carried the bare token `(M1)`, which is not an identity"*), never live statements — the R-5 bare-token bar is met. The **exported drift** is declared and routed rather than chased: §7c minutes that adding the id makes F-W0's quotation of this cell stale by exactly that clause, and F-W5's own X-1 row already carries the same canonical form (`grep -o 'canonical form: .FR-NP-32. (≡ .fr-PaperSidebar M1.)' F-W5.md` reproduces), so the lane spelling is now uniform at both ends of the edge.

**PAW-44 / LAW-3 · MPC-31 · FR-MSP-6**: none routes to F.W7 (§1); none is a lock this wave inherits; absence is correct.

**Anti-cures, each re-verified against the live clause heads**: K-3's upsert arm **KILLED** and forbidden as design rationale, quoted at the record's own unformatted spelling ✓ · E17's `C-2` **record-qualified** *(NOT fr-GallerySearchBar C-2 at D10, nor fr-FourierShapeExtractor C-2 at G2c; U-12)* ✓ · the three retired mis-keyings each re-verified against a **different** live clause head — `**E12** Debounced mirror vs synchronous save` ≢ C-25/E13 · `**E11** Easing domain hoisted to the operation` ≢ C-2⊕K-3/E17 · `**E9** One shape, one name` ≢ SS-C-1/SS-C-2 ✓ · **BC-20**'s `duration = ref(20000)` zero-writers fold banked and never re-booked (`fr-BasisCanvas.md:54` reads as cited) ✓ · **m-15 CROSS-REFERENCED, NOT MERGED with F-4** ✓ · **FR-GIG-5 / F-W5 §0b**'s no-credit bar ✓ (the sentence sits at F-W5 line 39, inside `### 0b. What this wave is NOT` — the anchor resolves) · **D-19** honoured throughout ✓ · **E10 ≠ B4** separation cited, never conflated ✓.

**Dissents preserved, one home each**: F-W10 §2.3's SS-4-PREREQ row quoted **once**, with F-W5 §2 clause **E16 ▲** cited by clause id and never quoted through ✓ · the dedup-family dissent (`fr-ImageUpload.md:124`) with the `fr-VisualizationView` **L-8** severity-follows-consequence precedent — both re-verified at `:78` and `:151` — and its SS-13 re-grade trigger intact ✓.

**Twin law (§X.1-v4) — CONSUMED CORRECTLY, and this is the pass's cleanest new work.** The criterion is quoted from the landed file; `ContourSettings` is confirmed present in a `.d` **Files** list — and this seat resolved the unit letter the spec asserts: the Files line carrying `visualization/{ImageUpload,ContourPreview,FullscreenViewer,ContourSettings,ExportModal,CoefficientsPanel,GalleryView}.vue` sits under **`### X.F.W3.d Shadow retirement at the installed pin`**, so *"M-12 and B-4's fixture leg home at F.W3 `.d`"* is **true at the bytes**, brace expansion and all. The four partition negatives reproduce, and `ContourEditorCanvas.vue` is among them, so §8's default-arm derivation for L-5 is criterion-correct. **F.W7 books none of them and proposes no twin byte** ✓.

---

## §4 · AXIS 4 — GATES

**Born-RED**: all **11** gates carry born-RED witness cells; the masthead, §1's *"All 11 born-RED"* and the counted table agree (`grep -c '^| \*\*G-F7-' F-W7.md` → **11**). **G-F7-1** is ⊙ OWNER-GATED and declared unauthorable unruled ✓. The split-verdict discipline is stated and every gate names a distinct GREEN owner ✓. **Reachable GREEN**: each gate's close condition is an act some named owner can perform (G-F7-2/8/9/10 by this wave; G-F7-7 by F.W0; G-F7-11 by F.W10 + two surfaces that do not yet exist and are RED **by construction**, declared as such) ✓. **G-F7-11's re-basing off counts and onto named rows is correct and correctly minuted**, and every far-end row it names reproduces.

### D-5 · MAJOR — check files are declared as **OPERANDS**, at two live sites

R2-9's closing clause and **R3-4**'s standing law: *"a closure/census transcript whose LHS is a count copied from any check file **FAILS BY CONSTRUCTION** — check files and rulings are measurements and cure-shapes, **never quotable operands**. Check files may be named as *prior runs*, never as the operand."*

Two sentences in this spec do exactly what the law forbids:

- **§0, fold provenance** (line 5): *"Its **census operands** are **in-tree authorities only**: the 66 adjudicated `fr-*.md` … **and this wave's conformance registers `conformance/PASS-1/F-W7-CHECK.md` and `conformance/PASS-2/F-W7-CHECK.md`**."*
- **§2a, bounds reconciliation** (line 74): *"**The reconciliation operand is** the in-tree pair `F-W5.md` §2's `§E` clause register **+ this wave's conformance registers (`PASS-1` and `PASS-2`)**, never a per-wave carry ledger."*

The §2a sentence is load-bearing: it is the warrant admitting the **fifth bounds path** (`waves/F-W7/carry-closure.md`), so a check-file operand sits under a `create` row. The **executed** census at §5a is corpus-derived and clean — which is precisely the R2-9 condition that *does not cure the operand*. Every other check-file reference in the file (`grep -on 'PASS-[0-9]\|F-W7-CHECK' F-W7.md` → 24 sites) is a lawful **prior-run** naming — *"PASS-1's `F-W7-CHECK` D-4"*, *"PASS-3's F-W7-CHECK D-9"*, the R-11.1 root-cause minute — which makes these two the isolated breaches, not a house style. **Cure**: strike the conformance registers from both operand sentences; name them as prior runs beside, and let the operand be the 66 ⊕ the `§E` register alone.

### D-6 · MEDIUM — G-F7-8's re-cut traded table-shape anchoring for **bold-delimiter** anchoring, and calls the result "shape-free"

R3-5.4 required the operand *"re-stated shape-agnostically with the detector INLINE"*. The detector **is** inline, in four axes, and axis (ii) declares the spellings that must count: *"`**E13**` · `clause E13` · `§2 clause E13` · `E13 ▲` · `E16 ⊙`, and the ⊙/▲/‡ marks never separate an id from itself."* The command banked immediately below, headed **"Run today, shape-free"**, is:

⟨cmd⟩ `grep -ohE '\*\*(E1\|E3\|E5\|E7\|E8\|E10\|E13\|E17)\*\*' waves/F-W5.md | sort -u`

It matches **only** ids wrapped in `**…**`. It cannot match `clause E13`, `§2 clause E13`, `E13 ▲` or `E16 ⊙` — the four spellings its own axis (ii) names. That this is not academic — token-bounded vs bold-bounded line counts in `F-W5.md`, this seat (`grep -cE '(^|[^A-Za-z0-9])ID([^0-9A-Za-z]|$)'` vs `grep -c '\*\*ID\*\*'`): `E13` **10 vs 2** · `E3` **4 vs 1** · `E5` **4 vs 1** · `E10` **4 vs 1**. The gate's second operand is doubly anchored — `awk '/^### §E/,/^### §F/'` to `###`-heading shape **and** `grep -oE '\*\*E[0-9]+\*\*'` to bold. Both results are correct today (8/8; `§E` = E1…E20 — this seat re-ran a genuinely token-bounded probe and got the same sets), **which is the condition R2-9 says does not cure an operand**. The gate was defective at authoring for table-shape and remains defective at authoring for bold-shape. **Cure**: run the ids token-bounded (`(^|[^A-Za-z0-9])(E1|E3|…)([^0-9A-Za-z]|$)`) and derive `§E` membership from the register's own boundaries rather than from `**`.

### D-7 · MEDIUM — the file's own "no pipe as a PATTERN character" law is false at **five** sites, including the census's load-bearing detector

§0's round-3 item 2 declares two binding reading rules and then states: *"**After this round no receipt in this file uses a pipe as a PATTERN character** — the row-shape anchors (`^\| \*\*E13\*\*`) and trailing literal pipes that made rule (i) ambiguous **are gone**, replaced by pipe-free exact-string probes … Every surviving `\|` is a shell pipeline or a negated class, both of which un-escape unambiguously. … **a receipt whose meaning depends on how its reader un-escapes it is not reproducible, whatever it returns.**"*

At the bytes:

| site | receipt | pipe's role |
|---|---|---|
| **§5a `F-MAIL-∅`** (line 148) | `grep -oE '(^\|[^A-Za-z])F\.W7([^0-9A-Za-z-]\|$)'` | **ERE alternation ×2** — and this is the wave's **census detector**, the single most load-bearing probe in the file |
| **§6 G-F7-8** (line 197) | `grep -ohE '\*\*(E1\|E3\|E5\|E7\|E8\|E10\|E13\|E17)\*\*'` | **ERE alternation ×7**, inside a gate operand |
| **§3 Prohibitions** (line 100) | `grep -n '^\| \*\*E16\*\*'` and `grep -n '^\| \*\*G7\*\* '` | **literal row-shape anchors**, the exact form declared gone |
| **§4 honest default** (line 116) | `grep -n '^\| \*\*E16\*\*'` | same |

Both alternation sites and all three row anchors run and reproduce under `/usr/bin/grep` — the substance is sound. What fails is the **declaration**: a paragraph that closes a class by construction while the class survives in the paragraph's own census probe is the file's recurring failure mode restated one level up, and PASS-3's D-10 convicted the identical structure at this gate. **Cure**: either honour the rule (rewrite the two alternations as repeated pipe-free probes and the three anchors as exact-string probes) or narrow the declaration to what is true.

### D-8 · MEDIUM — §5e's `X-1` receipt: one command, two quotes, **three** hits, both spans truncated unmarked

§5e's OG-F1 row banks ⟨cmd⟩ `grep -n 'X-1' waves/F-W5.md` and offers it as the producer of **two** quotations — F-W5 §0's *"**Opens after**: **F.W0** (substrate pre-gates — HARD, §4 X-1)"* and *"the §4 row itself, **X-1 · F.W0 → F.W5** \| HARD opens-after \| Substrate pre-gates FIRST"*.

Live, this seat: the command returns **three** lines — `:22` (§0), `:315` (the §4 row) and `:342` (the `AA-44` row, *"This wave's own X-1 cell rules that divergence from F-W0's tables is a defect…"*), an unnamed third hit. And the second published span is a **silent truncation**: `sed -n '315p' F-W5.md` continues *"Substrate pre-gates FIRST**. The corrupt-dist fact carries BOTH its banked witnesses — canonical form: `FR-NP-32` (≡ `fr-PaperSidebar M1`)**…"* — the spec stops mid-sentence with no ellipsis, in a file that elsewhere annotates every elision and that struck two of these at round 3 (D-7(i)/(ii)). This is **PASS-3 D-2's class** (*"one command is claimed to produce two quotes"*) recommitted at a different row in the round that cured it at P-10. **Cure**: two commands for two quotes, each narrowed to the span it certifies; the third hit named or the receipt re-scoped.

---

## §5 · AXIS 5 — POSTURE

| requirement | finding |
|---|---|
| **F.W1 transaction whole, at its pinned coordinate, correct limb count** | **HELD.** §7c cites *"the **TWELVE**-limb roster chartered at **F-W1 §4 step 4**"* and quotes it as **two spans with two commands at F-W1's own emphasis** — both reproduce, and the coordinate resolves: `grep -n '^## §4' F-W1.md` → `270:## §4 Sequencing`; the TWELVE sentence sits at `:276`, step 4. `grep -c 'ELEVEN-limb' F-W7.md` → 2, **both self-disclosing strike notes**. The elision of F-W1's own `:294` pin carries its reason (R2-2 forbids republishing a live sibling's address) — **correct, and correctly minuted**. The three-limb restatement stays struck with the right reason. R2-5 and R3-10.5 both discharged. |
| **W7 zero-row posture** | **HELD.** §0: *"**The ∅ posture is CLOSED** (round-2 cross-wave ruling R2-8) … not re-litigated by a later seat unless the corpus itself changes"*, with the falsifier stated. §5a's `F-MAIL-∅` states the token-vs-substring distinction so the grep it invites cannot falsify it, disposes both `KF.W7` hits inline, and mints nothing to fill the empty column. This seat re-measured only to confirm; the corpus is unchanged. **`routedTotal = bookedCount = escapedCount = 0`.** |
| **F.W1 transaction / F.W0 pre-gates honoured** | **HELD.** Hard opens-after at §1; G-F7-7 born-RED with all three substrate probes reproduced this seat; §7c and §11 cite **G-11 / G-12** by gate id and the SUBSTRATE-LEDGER by §2a's create row, **quoted whole** (D-3's elision-count retired rather than corrected — the stronger cure). The HALT branch is stated three times and is byte-identical to the branch F-W0 quotes back. D-19 respected: no HEAD figure or line anchor claimed live. |
| **SS-4 flags inline** | **HELD.** §7c's SS-4 row and §5a's E16 ▲ quotation both carry *"SS-4 FLAGS THIS RULING INLINE"*, matched to F-W10 §2.3's *"FLAGGED INLINE, never presumed"*. P-10's inline routing is honoured; **no second ruling file is minted**; `contract/OWNER-RULINGS-F.W5.md` is correctly held **prospective** — though the receipt proving `contract/` absent is **D-3**. |
| **Tree READ-ONLY** | **HELD.** `/Users/mkbabb/Programming/fourier-analysis` declared read-only at §0, §2a and §8; zero fourier bytes proposed; product source in both repos, the 66 records, both carries, the ten siblings, `COHESION.md`, the producer trees, `scripts/dev/dev.sh` (never staged) and `package.json` are all listed immutable. `F-W6.md` and `F-W8.md` are named read-only where their stale premises are routed. **The only defect in this row is a stale enumeration, not a breach**: the conformance pin reads *"(both passes)"* where three existed at authoring (**D-9**). |
| **status planned · zero VERIFIED** | **HELD.** `**Status**: planned`; AUDITED YES / SPECIFIED YES / IMPLEMENTED NO / VERIFIED NO; `grep -on 'VERIFIED[^*]\{0,40\}' F-W7.md` → **one** occurrence, the table row. No GREEN, no execution claim. |
| **RULINGS-3 applied** | **PARTIAL — three of four discharged.** **R3-3.6** (the minted `cite E16 and G7` attribution struck and re-sourced; the string returns ∅ at F-W5 and the live sentence is quoted in its place) ✓ · **R3-8.1** (canonical form at all three sites) ✓ · **R3-3.9's purge share** — all eight named drifts cured and re-verified this seat: D-2's one-command-two-quotes **split into two real commands**, D-3's count word **replaced by the whole row**, D-4's added emphasis removed **and its true site (N-1, not §7c) minuted as an erratum**, D-5's corpus quotation given its ⟨cmd⟩ at the record's case, D-6's leading `a ` restored, D-7's two truncations closed to the sentence end, D-8's backticks removed, **D-11's §8 now naming BOTH stale-premise consumers** ✓ · **R3-5.4** — the detector is inline and the table-shape anchor is gone, but the operand is now bold-shape anchored (**D-6**) ✗. **Not reached by any ruling and surviving into pass 4**: the unrunnable `.\{0,262\}` (**D-1**), the over-long G-F7-1 span (**D-2**), the stale `find` (**D-3**), the check-file operands (**D-5**). |

### D-9 · MINOR — the conformance pin is stale in the do-not-touch list

§2a's immutable-paths bullet pins `docs/tranches/X/fourier/conformance/**` with the parenthetical *"(both passes)"*. Three passes existed at the round-3 write and four exist now. The **path glob is correct and protective**, so nothing is unprotected; the count word is the defect — a numeral about a growing directory, the same form R3-3.10 retires everywhere else in this file.

### D-10 · MINOR — a receipt wider than the three quotes it certifies (the mirror of the D-6 class cured at §5b)

⟨cmd⟩ `grep -o 'Distinct from B4[^*]*' waves/F-W5.md` is banked at **three** sites (§5e's SS-C-1 lock · §6 G-F7-6's witness · §7c's E10 row) and each publishes *"Distinct from B4's liveness predicate"*. Live output, this seat: `Distinct from B4's liveness predicate |` — the negated class runs past the sentence into the markdown table terminator. The published span is a true prefix of the output but is not the output, and §0's round-3 item 2 declares *"trailing literal pipes … are gone"*. **Cure**: `[^*|]*`, one character, at all three sites.

### D-11 · MINOR — the L-5 exclusion cites a home that holds no such id

§8 disposes the corpus's **one** true structural-sharing hit — `fr-ContourEditorCanvas` L-5 — as *"the **default arm: F.W4 BOOKS, F.W3 CITES**"*, and §12 hardens it to *"since repair round 3 **homed by F.W3's §X.1-v4 file criterion at F.W4**"*. The **criterion** derivation is sound and receipted (the record is one of the four negatives; §X.1-v4's partition table row reads `**F.W4 — the criterion's negatives, NAMED PER ID at item 2** | `fr-ContourEditorCanvas` (26) …`). The **landing** is not: ⟨cmd⟩ `grep -n 'ContourEditorCanvas' waves/F-W4.md | grep -c 'L-5'` → **0**; the same probe against `F-W3.md` → **0**; and F-W4's own v4-reconciliation cell enumerates what v4 assigns for that record as *"nine `MM-*` ids plus seventeen tokens it marks '(all homonym-only)' — `C-8` · `C-9` · `C-12` · `C-13` · `C-16` · `C-20` · `C-22` · `C-23` · `L-4` · `L-6` · `L-11` · `L-12` · `L-13` · `L-19` · `L-20` · `i-2` · `m-12`"* — **`L-5` is in neither list.** F.W7 books zero of it either way, so this is not an escape and not a lost obligation; but §8 is the table whose whole function is that absence cannot be mistaken for oversight, and it currently points a reader at an empty home. **Cure**: state it as the criterion's answer (which is receipted) and route the per-id confirmation to the twin, rather than asserting `F.W4 BOOKS` as a landed fact.

### D-12 · INFO — a locator command offered for one quotation returns two lines

§7c's F.W5-spine row banks ⟨cmd⟩ `grep -n 'F\.W5 → F\.W7' waves/F-W5.md` before quoting the §4 edge row. Live: **two** hits — `:190` (the `E16` clause row, which names the edge) and `:320` (the row actually quoted). Harmless as a locator, and the published quotation is byte-exact; noted only because the same shape is charged at D-8 where it carried two quotes.

---

## §6 · SUMMARY

| | |
|---|---|
| **wave** | F-W7 |
| **file** | `docs/tranches/X/fourier/conformance/PASS-4/F-W7-CHECK.md` |
| **routedTotal** | **0** |
| **bookedCount** | **0** |
| **escapedCount** | **0** |
| **receipts re-run this seat** | **58** — 55 reproduced byte-exact · 2 non-reproducing · 1 non-executing (at 2 sites) |
| **defects** | **12** — 5 MAJOR (D-1 · D-2 · D-3 · D-4 · D-5) · 3 MEDIUM (D-6 · D-7 · D-8) · 3 MINOR (D-9 · D-10 · D-11) · 1 INFO (D-12) |
| **verdictLocal** | **DEFECTIVE** |

**What holds, and it is more than any prior pass could say.** The census is exact and its detector is genuinely shape- and spelling-agnostic — confirmed a fourth time, now including alternate spellings, the full band expansion at every position, and the four M-25 lock-ids the brief named. **Every round-3 content cure landed and survives independent re-derivation**: the minted attribution struck and re-sourced, `FR-NP-32` canonical at all three sites, the one-command-two-quotes receipt genuinely split, the emphasis/casing/backtick drift set cured at the bytes, §8 naming both stale-premise consumers, the twin partition consumed and — this seat verified what no prior pass did — the `.d` unit letter is **correct**. The anchor idiom remains the cleanest in the lane (zero line cites into live siblings), the read-only law is complete, the four-verb status is honest, and **the substance of every carry row survived re-derivation for the fourth consecutive time**.

**What fails, and it is one thing.** The spec's §12 thesis has now been turned on its author a fifth time, at the next level down each round: round 1 asserted, round 2 counted, round 3 replaced counts with word-output and receipts — **and pass 4 finds the receipts themselves unexecuted**. D-1 is a command that *errors on the declared engine* at two sites and can produce the published span at no legal bound. D-2 completes a truncated word inside a label reading *"as the command prints it, its cut disclosed."* D-3 is a "load-bearing negative" that was already false when written. And D-4 is the sharpest: **the seat attested that it re-ran every one and found no third case, and the purge certificate banked that attestation as 140-of-140** — so the round's terminal instrument certified a surface it did not execute. The generalisation the file wrote for itself needs one more clause: *a citation is a measurement, an unreproduced measurement is an invention* — **and a receipt nobody ran is not a measurement at all.**
