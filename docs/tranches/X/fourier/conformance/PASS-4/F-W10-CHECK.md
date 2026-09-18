# F-W10 — FRESH ADVERSARIAL SPEC CHECK (L-18 / L-20, PASS 4)

**Subject**: `docs/tranches/X/fourier/waves/F-W10.md` (459 lines, `status: planned`, settled bytes after repair round 3 + the fabrication purge)
**Corpus authority**: the 66 `fr-*.md` in `docs/tranches/V/megatranche/registry/adjudicated/` — **and nothing else** (R2-6b). Not a per-wave carry, not a check file, not a rulings file.
**Real carries**: `carry/F-W1-CARRY.md` + `carry/F-W4-CARRY.md` ONLY (`ls carry/` → exactly 2; no `F-W10-CARRY.md` exists and none is minted).
**Seat**: FRESH adversarial reader, 2026-08-29. **Every figure below was re-derived at the bytes by this seat.** PASS-1/2/3's registers, `RULINGS-3.md` and `CLOSE-CERT.md` were read as **claims to test**, never as obligation sets to copy. Sixty-plus ⟨cmd⟩ receipts were re-run.
**Detector law applied**: rows in ANY format (table ⊕ id-headed bullet ⊕ numbered bullet ⊕ prose walked to its enclosing row id); **both** dash spellings; record-qualified ids; **slash/range expansion at every position** (the R3-5.1 second-position axis, applied to W9 and W10 for the first time in this programme).

**Verdict**: **DEFECTIVE — but the census axis, the axis that failed in PASS 3, now HOLDS at the bytes.** Four of five axes hold outright; axis 2 holds with one non-reproducing receipt. **No MAJOR survives.** `routedTotal = 98 · bookedCount = 98 · escapedCount = 0.` The defects below are one false ⟨cmd⟩, one binding denominator wrong by one, one false intra-file cross-reference, one superseded probe left standing in a gate cell, one strict disposition exempted from the per-id rule the round imposed on itself, and six INFO-grade residues.

---

## §0 Method — three obligation sets, unioned and deduped

| set | basis | count (this seat) |
|---|---|---|
| **A · digraph** | every `F.W9/W10` routing identity in the 66 | **26** |
| **B · by-mechanism** | entrants §2.2 admits with no digraph leg | **5** |
| **C · strict NO-WAVE-OWNER** | dispositions owed a terminal home at the §3.3 deadline this spec declares is itself | **69** |
| | **A ∪ B ∪ C, deduped** (`FR-AUL-16`, `FR-AH-45` ∈ B∩C; A∩B = A∩C = ∅) | **98** |

**routedTotal = 98 · bookedCount = 98 · escapedCount = 0.**

---

## §1 AXIS 1 — ID-KEYED CENSUS UNDER THE §X.1-v4 TWIN PARTITION (**HOLD**)

### §1.1 The digraph obligation set is CLOSED under full slash/range expansion — tested here for the first time

R3-5.1 convicted F-W2's G19 because its probe could not match a slash form whose **second** member was the wave. The same test, applied to W9/W10, is the one probe no prior seat ran:

- ⟨cmd⟩ `grep -ohE '[A-Za-z0-9./–—-]*W10' fr-*.md | sort | uniq -c` → **`54 F.W9/W10`** and nothing else.
- ⟨cmd⟩ `grep -ohE '[A-Za-z0-9./–—-]*W9[^0-9]' fr-*.md | …` → **`54 F.W9`** and nothing else.
- ⟨cmd⟩ `grep -ohE 'F[.·–-]?W[0-9]+[/–—-]W(9|10)' fr-*.md | sort | uniq -c` → **`54 F.W9/W10`** — **zero second-position variants, zero range forms, zero en-dash arm.**

`grep -o 'F\.W9/W10' … | wc -l` → **54** · `grep -l …` → **25** records · bare `F.W10` → **0** · `F–W10` → **0** · `F\.W9–W10` → **0** · `ls fr-*.md | wc -l` → **66**. **Set A is 26 and cannot be larger.**

### §1.2 The fresh derivation reproduces TO THE LINE — the round-3 cure is real, not narrated

§2.5a-iii(a) declares three probe variables and five one-line classes. Re-run by this seat under `bash`/`/usr/bin/grep` **and** independently re-implemented in Python (identical regex semantics), both agreeing:

| class | spec | this seat (shell) | this seat (python) |
|---|---|---|---|
| routing-law / taxonomy boilerplate | 31 | **31** | **31** |
| row-level STRICT | 68 / 35 records | **68** | **68 / 35 records** |
| row-level WEAK | 32 / 19 records | **32** | **32 / 19 records** |
| prose STRICT | 1 | **1** | **1 / 1 record** |
| prose WEAK | 33 | **33** | **33** |
| **TOTAL** | **165** | **165** | **165** |

`31 + 68 + 32 + 1 + 33 = 165`. **The partition exhausts its operand.** Strict roster = **69 dispositions across 36 records** — measured, not asserted. `grep -o 'NO-WAVE-OWNER' … | wc -l` → **167** · `grep …| wc -l` → **165** · `grep -l …| wc -l` → **56** · `grep -o 'NO–WAVE' …` → **0**. All reproduce.

### §1.3 The escape test: all 69 strict head ids resolve — **PASS-3's three escapes are CURED**

Each of the 69 was walked to its enclosing row id and tested boundary-exact `(?<![A-Za-z0-9-])ID(?![0-9A-Za-z-])` against the spec. **Missing: none.** The `fr-PathPreview` triple that escaped the drain entirely at PASS 3 now lands at §2.5a-iii(c) with per-id terminal verbs, and the escape receipt is honestly scoped: ⟨cmd⟩ `grep -lo 'PP-CENSUS' waves/F-W[0-9].md carry/*.md` → **∅**; `PP-AGGLOM` / `PP-SEVLAW` → `waves/F-W4.md` · `carry/F-W4-CARRY.md`, whose own words are ⟨cmd⟩ `grep -ho 'consumed, not settled here' waves/F-W4.md` → *"consumed, not settled here"*. The glob `F-W[0-9].md` correctly cannot match `F-W10.md` — the R3-3.7 self-invalidation trap is avoided by construction, not by luck.

### §1.4 The predicate and the roster regenerate each other in BOTH directions — R3-5.5 discharged

The weak class is enumerated at §2.5a-iii(d) as `(record : line → head id)`. This seat re-ran the predicate and compared **element by element**. The 32 lines / 19 records match **exactly**, in both directions, with no member the spec names that the predicate misses and no member the predicate returns that the spec omits — including the four the spec is careful to name as un-bookable (`fr-DarkModeToggle:164` numbered lesson 4, no banked row id · `fr-EquationView:191` fold list · `fr-HarmonicLevelGrid:26` struck "unbanked" claim · `fr-GalleryInfiniteGrid:112` MISS-5 restatement). PASS-3's second MAJOR — *"a predicate false of ten of its sixteen members"* — is **cured at the root**: the ten strict members carry per-id verbs at §2.5a-iii(c), and the 26/6 split checks out (⟨cmd⟩ none of `FR-COB-14` · `FR-EQR-7` · `FR-FG-20` · `FR-IC-11` heads a drain row: `grep -c '^| \*\*<id>' F-W10.md` → 0 ×4).

### §1.5 The 88-row roster is disjoint by measurement, not by assertion

⟨cmd⟩ section-extraction re-run: §2.5 → **23** · §2.5a → **36** · §2.5a-ii → **16** · §2.5a-iii(c) → **13** = **88**. Head ids extracted per row and keyed by **(head id, record)**: **88 distinct pairs, zero collisions.** The homonym guards hold under test — the two `M-16`, the two `i-5`, the two `i-1`, `D-i2` (⟨cmd⟩ 7 records), `m-4` (⟨cmd⟩ 17 records), `MISSED-2` (⟨cmd⟩ 3 records, only fr-HarmonicLevelGrid's carrying a NO-WAVE-OWNER disposition, and that identity already booked strictly at §2.5a).

### §1.6 The twin partition is CONSUMED CORRECTLY — every §X.1-v4 citation verified at F-W3's bytes

Five rows of this file cite the partition. All five are right:

| F-W10 claim | §X.1-v4 §5 at the bytes | ✓ |
|---|---|---|
| `fr-CoefficientsSpectrum` enters at **`.d`**, F.W3, `m-19`/`m-22` its residue | `.d` row: *"`fr-CoefficientsSpectrum` (12 — `m-19` · `m-22` ⊕ 10 admitted by axis (iv))"* | ✅ |
| `fr-CollapsibleSection` residue held at F.W3 **`.d`** | `.d` row: `fr-CollapsibleSection (7)` | ✅ |
| `fr-PathPreview` carries **one** residue id-instance at F.W3 **`.d`** | `.d` row: `fr-PathPreview (1)` | ✅ |
| `fr-Tooltip` enters at F.W3 with **one** id-instance (`.e`) | `.e` row: `fr-Tooltip (1)` | ✅ |
| `fr-EditorControlsDock` residue on the **`.a`** arm, §C.A/§C.B cluster | `.a` row + landing shape *"rows of the unit's own §C.A/§C.B cluster"* | ✅ |
| `fr-MobileFloatingToc` the largest **`.c`** holding, **23** id-instances | `.c` row: `fr-MobileFloatingToc (23)` | ✅ |
| `fr-BasisCanvas` F.W4 hand-off named PER ID, **18** record-blind / **20** with axis (iv), `L §R5-7` **not among them** | item 2's table: 18 named ids ⊕ `+2 — D-16 · D-25`; `L §R5-7` absent | ✅ |
| `fr-VisualizationView L-26` **RULED to F.W3**, disjoint from `:103`'s sole `F.W1/F.W4` bypass half | item 4's departure record; `:103` is a different row on a different axis | ✅ |

**F.W10 books nothing on the twin surface and re-cuts nothing there** — verified by the disjointness above, per id, exactly as §2.8 E-20(2) says a later seat should test it.

### §1.7 **DEFECT (MINOR) — the 69th strict disposition carries no per-id terminal verb**

The one prose-strict line is `fr-PaperSearch:57`, the *"Infos (7 carried)"* rollup, whose NO-WAVE-OWNER token attaches to `L-19+C-N1` — ⟨cmd⟩ `sed -n '57p' fr-PaperSearch.md` → *"… · L-19+C-N1 (**NO-WAVE-OWNER** bank) · …"*. §2.5a-iii(a) disposes of it in a parenthesis: *"**already homed** at §2.5a-ii's `L:L-16` fold row, whose target that row is."*

But the fold runs **L:L-16 → L-19**, so `L-19+C-N1` is the **surviving** identity, and the drain's only statement about it is that the fold target is real (⟨cmd⟩ `grep -n 'L-19' fr-PaperSearch.md` → `:57`). It is **not among the 88 booked rows** (§1.5's extraction confirms), and it receives no verb of its own — while §2.5a-iii(c)'s own preamble makes the standard explicit: *"a strict disposition is owed a **per-id terminal verb**, today, not on some later re-grading."* The file applied that standard to the ten and exempted the 69th on a reading it uses nowhere else.

**Not an escape** — the row is named, receipted and reasoned, so nothing is silently dropped; `escapedCount` stays **0**. But the exemption is the last un-verbed strict disposition in the corpus, at the wave that declares COHESION §3.3's deadline.

---

## §2 AXIS 2 — RECEIPT REALITY (**HOLD, with ONE non-reproducing receipt**)

Sixty-plus receipts re-run by this seat under `bash`/`/usr/bin/grep`, in the value tree, the fourier tree, the glass-ui tree and the latex-paper tree.

**Reproducing exactly** (a representative enumeration): the whole corpus anatomy (§1.1–§1.2) · the five partition probes · arrow-form **31** / **16** records · bold-terminal **61** · the splice `diff` → **empty** · the shared-table `diff` → **empty** · the §2.2 whole-region `diff` → **exactly 3 hunks** · the four section counts **23 · 36 · 16 · 13** · the three PP probes · `grep -n 'producer dist emitter' fr-NotationPills.md` → `:35`, byte-exact · `grep -n 'NO leaf in this component' fr-App.md` → `:90`, **byte-exact including the bold span** · `grep -n 'unlayered-scoped-vs-system' fr-ConvergenceLegend.md` → `:97` · `grep -n 'B-1/B-2 cure wave' fr-PaperView.md` → `:120`, *"coverage rides the B-1/B-2 cure wave."* · `grep -rc 'never scheduled independently' fr-*.md` → **0 in all 66** · `grep -n 'Redundancy records' fr-AdminAuditLog.md` → `:89` · `grep -ho 'FOLD → R5-7/R6-6 + fr-BasisCanvas L§R5-7' fr-CoefficientsPanel.md` · the F-W1 charter (⟨cmd⟩ `grep -F` of the full TWELVE-limb sentence → **1 hit in F-W1.md, 2 in F-W10.md** — byte-identical at both sites, and `F-W1 §4 Sequencing` opens at `:270` with step 4 at `:276`, so the stable anchor resolves) · both G-12 denominators · the three gate headings, prefix-free · **E-4's two `$V`-rooted `W9.md` receipts, both EXACT**, with all three `W9.md` present across the two trees exactly as the erratum enumerates · E-14's six INBOX readings **0 · 4 · 1 · 5 · 6 · 6, every one EXACT** (and HEAD has moved a *fourth* time, to `fffb9685`, with every reading unchanged — the drift disclosure is doing its job) · **eleven** `valuejs-outbound-*.md` packets, BJ ten ⊕ BK's O-20 · O-20 = **59** lines, `@source` **1**, `FR-NP-32` **1**, `fourier` **10**, and ⟨cmd⟩ `grep -cF 'FR-NP-32 ≡ fr-PaperSidebar M1'` → **1**, the canonical cite-both form present in the producer's own packet · O-17 = **76** lines with `B-1..B-10` and all eleven `U-1..U-11` arms named, `B-1 = U-1 + U-5 — CONVERGENT` verbatim · `MetricPill` / `IntersectionObserver` / `latex-paper` → **0 across all eleven** · COHESION §4a's `DISPATCHED 2026-08-28` O-20 row present · fourier HEAD **`cd26c65`** · porcelain **28** · `--shadow-cartoon` **1 file / 3 hits** at `:193` · `:212` (the `-hover` twin) · `:224`, exactly as printed · `cartoon-surface` **1 file**, applied once at `style.css:108` inside the shim (the two other hits are comment prose — the cell's precision is correct) · `cartoon-card` **15 files** · `text-admin-label` **4 files** · `admin` in `web/e2e/` → **0** · `disclosure-content` → **0** · **8** e2e specs · `toHaveScreenshot` **0** · no `*-snapshots` tree-wide · pin `^0.13.0` at `web/package.json:18` · fourier `find docs -name INBOX.md` → **0** · `sed -n '46,62p' visual-baseline.spec.ts` — the call opens `:55`, options `:56-58`, `:59` closes, and `:48` is the **π capture** test: **the E-5 off-by-one correction is exact** · **9** `FOURIER-R*` by the glob, named R3×2 · R4×3 · R5×2 · R6×2, **0** in fourier's tree · `/tmp/fourier-r4-files.sha256` **GONE** · the Codex worktree **still registered** · latex-paper **0.2.1** with `src/vue/` holding `theme.css` only, and `/Users/mkbabb/Programming/latex-paper/docs/` holding `tranches/` + `virtual-paper.md`, **no coordination path**.

**All thirteen §2.5a-iii(c) dispositions and the §2.5a-ii spot-sample re-`sed`'d at their frozen-corpus anchors.** Every quoted **word** is present and in order. Four carry punctuation drift (§2.6 below); the rest are byte-exact, including the two that matter most — `fr-App C-12`'s negative record (bold span intact) and `fr-PathPreview:31`'s full PP-CENSUS disposition.

### §2.1 **DEFECT (MINOR) — the band-correction receipt does not reproduce as printed**

§2.5a's corrected band disclosure — the cell written expressly to replace a disclosure convicted of being *"wrong twice"* — publishes:

> ⟨cmd⟩ this seat, `grep -hnE '(→\|⇒) *\*{0,2}NO-WAVE-OWNER' fr-*.md` ⊕ the bold-terminal arm, records counted by `cut -d: -f1 \| sort -u \| wc -l` → the raw two-shape probe spans **44** records

**The command cannot produce the output.** `-h` suppresses the filename, so `cut -d: -f1` extracts the **line number**, not the record; and the printed pipeline omits both `grep -v 'Routing law'` filters that the 44 depends on. Measured by this seat:

- as printed, arrow arm → **27** · as printed, both arms → **70** · `-n` without `-h`, both arms, unfiltered → **45** · **never 44**.
- The correct pipeline — filenames retained, `Routing law` filtered on both arms, arrow-form excluded from the bold arm — returns **92 lines / 44 records**. ⟨cmd⟩ `cut -d: -f1 /tmp/strict92.txt | sort -u | wc -l` → **44**.

**The FIGURE is right; the RECEIPT is false.** This is the third generation of the same base the file has convicted three times (E-3 · E-11's second minute · E-4), landing this time inside the cell built to end it — and it survived the PURGE SEAT, whose certificate states *"Every receipt reproduces against the settled bytes, is paired with its live re-reading, or is struck — **no third disposition survives anywhere in the eleven specs**"* and books F-W10 at 64 run / 61 repro / 3 fixed. This is a fourth. The prior seat never caught it because PASS-3 measured 44 from its own `/tmp/strict92.txt` and never ran the spec's printed form.

### §2.2 **DEFECT (MINOR) — E-1's corrected, self-binding denominator is under by one**

E-1 corrects the ADOPTION-ASKS denominator and §4a.13 declares the result *"binding on this file against itself"*: **17 id-rows / 11 OPEN / 6 value.js-targeted (4 OPEN)**. G-F10-1's born-RED witness restates it. Re-enumerated row-by-row this seat:

- header `:107` ✓ · G.W8 re-trigger stamp `:105` ✓ · rows `:109`–`:125` → **17** ✓.
- ⟨cmd⟩ `sed -n '109,125p' ADOPTION-ASKS.md | grep -c 'OPEN'` → **12**, not 11.
- The twelfth is **Ask 4**, whose own stale-watch cell reads: *"**fourier portion LANDED G.W7** (backend full floor live; others no-new-priv + booked); **3 external repos OPEN** — re-affirmed G.W8"*.

E-1 files Ask 4 among the *"six [that] are not [OPEN]"* and quotes only the half that supports it — *"Ask 4 (fourier portion LANDED G.W7)"* — dropping *"3 external repos OPEN"* from the same cell. **The value-targeted leg is unaffected** (Ask 4 targets words · speedtest · csp-solver, never value.js), so nothing downstream moves. But a denominator the file declares binding on itself is wrong by one **in the direction that shrinks the open set** — precisely the shape E-13 convicted (*"wrong by one, in the direction that flatters it"*), re-created in the erratum that corrected the previous denominator.

### §2.3 **DEFECT (MINOR) — a false cross-reference to the file's own bytes**

§2.5a-iii's `FR-TT-21` row books a *"CORRECTED DENOMINATOR, binding on this file"* and warrants it: the 35/9 shim budget is *"the figure **§2.2's FR-TT-1 cut** and §4b's F.W3 edge already quote, now carrying its correcting row."*

⟨cmd⟩ `grep -n '35 callsites / 9 consumers' F-W10.md` → **`:287`** (the FR-TT-21 row itself) and **`:425`** (§4b's F.W3 edge). ⟨cmd⟩ `grep -n '35/9' F-W10.md` → **`:287`** only. §2.2's FR-TT-1 cut (`:94`) carries the **17**-trigger census (*"Editor ×10 · Canvas ×6 · Wand2 ×1"*, *"L-4's 17-count census citable"*) and **never 35/9**. Half the warrant is false.

Aggravating: §2.2 is **SHARED SPLICE BYTES**, so the claim cannot be cured where it points — a unilateral edit there breaks G-F10-6 ≡ G-F9-21's Δ=∅. The cure has to be the cross-reference, at §2.5a-iii.

---

## §3 AXIS 3 — M-25 DEPTH (**HOLD**)

Mechanisms carried, not transcribed; locks and dissents intact and against interest.

- **FR-NP-32 canonical** — the `(≡ fr-PaperSidebar M1)` cite-both-never-substitute form at every statement of the gate, and **the producer's own packet carries the identical string** (⟨cmd⟩ `grep -cF 'FR-NP-32 ≡ fr-PaperSidebar M1'` in O-20 → 1). PASS-1 D6 stays cured at both ends.
- **PAW-44 / LAW-3** — restore-only-WITH-or-AFTER PAW-1 + PAW-30, with K-18's see-through-header catastrophe named as the price of violating it; **LAW-4** (one clearance authority; PAW-47 a dependent of the PAW-44 decision) carried beside it.
- **MPC-31** and **FR-MSP-6** — cited at §4a.6 as same-commit riders and re-declared at §5 as rows landing at F.W3/W4: **cited, not re-booked**.
- **Anti-cures preserved**: PAW-1's K-9 `:root` alias limb KILLED with *"the repair MUST NOT implement the literal snippet"* · ContourPreview 38's two REFUTED flagship cures · FR-AH-30's **REVERSING** `@layer components` remedy (only `@layer glass-overrides` appended after `utilities` works) · GAB-29 as falsifier-not-destination · the *"un-harnessable"* defence killed at ruling 3e · D-1's 16-count + `:42/:49` anchors killed at register #8 · K-6's two headroom cells.
- **Dissents verbatim and against interest**: FR-AFP-49's blocker-weight family dissent · FR-EMT-11's reader-2 MAJOR with the L-9.1 scope ruling **and** the warning that MINOR ≠ *"the debt is small"* · FR-USB-16's r2 MINOR recorded **as overruled** · GAB-13's worker-DU dissent that would make DU right all along · OG-V2 on Codex-authored verbs · the SS-4 trie-vs-KISS guardrail-incumbent dissent · PAW-2's demotion sustained by fresh derivation.
- **The twin law honoured structurally and now with teeth in both directions.** The `D/i-1` minted quotation is cured as a **PAIRED edit landing in both specs in one commit** — and the receipt is measured: both the checkpoint block and the shared table `diff` **empty** this seat. The AA-44 `9`→`8` correction, ruled for **no** round, is deliberately left unapplied as a disclosed pending pair. That asymmetry is stated in terms at E-20 so no seat reads it as inconsistency.
- **R3-6.1 discharged at BOTH ends, verified.** F-W10 §2.5's ▲ block states the direction; and at the far end ⟨cmd⟩ `F-W5.md` §2 clause **A1** now reads *"**BOOKS NOTHING — cites only**: `AA-45` → **F-W10 §2.5**"*, with §7's edge row *"`AA-45`'s one home is F-W10 §2.5's drain (R3-6.1) and this edge books nothing on it"*. The double-home is dissolved, not narrated.

---

## §4 AXIS 4 — GATES (**HOLD, with one MINOR**)

Twelve gates, every one born RED with a measured witness; G-F10-12 born honestly **SPLIT** — one half GREEN by a *verified* receipt (O-20 row A-1 under the **live** `BK/coordination/` path, re-measured by this seat), the other RED on `MetricPill` / `IntersectionObserver` / `latex-paper`, all three re-measured **0** across all eleven packets. **No gate is a proof-farm script**; each names a live witness (L-19).

**Operands are corpus-derived and detectors are inline.** G-F10-7 states its operand as the 66 records, states the detector inline (three row shapes ⊕ both dash spellings ⊕ prose walked to its row id), and makes its falsifier the **per-id enumeration**, not a headline — with `23 owed` · `"SIXTY"` · `59` · `75` each named as superseded rather than quietly replaced. **No check-file operand survives anywhere in the file** (R2-9 / R3-4's standing FAIL clause): PASS-1/PASS-2 are cited at §1b and E-12 as *hostile registers, provenance only*. **Reachable GREEN**: every gate's falsifier is a condition a seat can execute, and G-F10-7's is now a partition whose arithmetic must close.

### §4.1 **DEFECT (MINOR) — G-F10-7 presents as operative a probe its own falsifier convicts**

The gate cell prints its "strict shapes" as the two `grep -v 'Routing law'` arms → **31** arrow-form ⊕ **61** bold-terminal (both reproduce exactly). Its falsifier, eleven lines later in the same cell, reads: *"…a detector stated … **in one spelling of the routing-taxonomy boilerplate** (round 2's `grep -v 'Routing law'` missed *"Routes:"* and *"Dispositions:"* and counted taxonomy lines as findings)."*

§2.5a marks the supersession where it occurs — *"▲ THAT EXCLUSION IS UNDER-CUT AND IS SUPERSEDED BY §2.5a-iii (repair round 3)"* — **and the gate cell does not.** A reader reading G-F10-7 alone takes 31/61 as the operative detector, and 31 taxonomy lines are inside it as findings. The gate does say *"THE BAND IS REPLACED BY A BALANCED PARTITION"*, so the defect is presentational rather than arithmetic; but a gate cell whose stated detector is the one its own falsifier forbids is the wrong place to leave a reader to reconcile.

---

## §5 AXIS 5 — POSTURE (**HOLD**)

| requirement | finding |
|---|---|
| **F.W1 transaction whole at its pinned coordinate** | ✅ **TWELVE**, quoted by ⟨cmd⟩ at **both** sites (§2.7 FR-EQR-3 · §4a.3), `grep -F` byte-identical to F-W1's own bytes, cited at the **stable** anchor *"F-W1 §4 step 4"* — never by line. §4 opens at `:270`, step 4 at `:276`; the anchor resolves. *"ELEVEN-limb"* struck at E-15. PASS-1 D4 stays cured. |
| **W7 zero-row posture** | ✅ ⟨cmd⟩ `grep -o 'F\.W7' F-W10.md \| wc -l` → **1**, and that one occurrence is inside **E-16**'s minute of PASS-1's R-1b directive — an historical citation, not a routing claim. R2-8.1's prohibition respected in both directions: this check does not re-derive F.W7's `routedTotal` either. |
| **SS-4 flags inline, never presumed** | ✅ Seven owner rulings enumerated at §2.3 and re-declared at §4a.13 / §4b / §5; OG-F1 / OG-F2 and the L-4 escalation flagged with the explicit *"F.W10 CANNOT STAMP TERMINAL DISPOSITION WHILE THE ESCALATION IS UNANSWERED."* The trie-vs-KISS dissent records the **guardrail as the incumbent**. |
| **Tree READ-ONLY** | ✅ §1b binds all 66 `fr-*.md` read-only; §5 excludes *"Any edit to `registry/adjudicated/fr-*.md`"*; ⟨cmd⟩ `git status --porcelain docs/tranches/V/megatranche/registry/` → **empty**. Anti-rename holds by construction — the re-cut is a table in two specs plus an addendum. |
| **status `planned`, zero VERIFIED** | ✅ `status: planned` in the masthead; four-verb line reads **IMPLEMENTED NO · VERIFIED **NO****; §5 excludes *"any status advance beyond `planned`"*; the execution gate stands on the owner's begin-word. `scripts/dev/dev.sh` excluded as *"unowned dirty row, NEVER touched"*. |
| **RULINGS-3 applied** | ✅ on all four F-W10 directives, **each verified at the bytes rather than read**: **R3-10.6** (the derivation RUN — §1.2/§1.3/§1.4 above) · **R3-2.4** (the PP triple homed with per-id verbs before the deadline clause) · **R3-5.5** (ten per-id verbs; predicate/roster mutually reproducing; band → partition) · **R3-6.1** (drain ruled the ONE home, direction stated here, discharged at F-W5) · **R3-10.2** (E-4 discharged; the E-4/E-17 contradiction resolved; the two addresses abolished and replaced by word-output that reproduces) · **R3-3.9** (MISSED-2 record-qualified — and the qualification turns out to be a *finding*: round 2's bare `MISSED-2` was a duplicate of a row already homed). |

---

## §6 INFO-grade residues

1. **Punctuation drift inside quotations presented as banked words** — all in the new §2.5a-iii rows, all words exact: **PP-SEVLAW** quotes *"Every row above marked **'wire branch'** prices in only there."* where the bytes read `marked "wire branch"` · **FR-TT-22** quotes *"**a** zero-cost row on the F.W2 ledger**.**"* where the bytes read `A zero-cost row on the F.W2 ledger — a negative budget statement.` (leading capital lowercased; an em-dash continuation replaced by a terminal full stop) · **PAW-56** quotes *"**NO-WAVE-OWNER locally**."* where the bytes continue ` (latent, margin-1)` · **D-i2** quotes *"…under its right criterion**,**"* where the bytes end with a full stop. Same class CLOSE-CERT §6.2 cured for eleven markup spans and then certified *"0 word-level drifts survive"*.
2. **A verbatim label over an elided emphasis** — FR-USB-38's cell reads *"**F.W2 EXCLUSION LOCK, verbatim**: "do NOT book this component into the F.W2 migration surface""*, where the corpus carries the span **bolded**. Within CLOSE-CERT §6.2's stated *"elided rather than invented"* tolerance — but here the quoted span coincides exactly with the emphasis, so nothing forces the elision.
3. **An unverified sibling count carried into §4b** — the SS-6 row states O-20 has *"26 entries"*, quoted from COHESION §4a. ⟨cmd⟩ `grep -oE '^\| [A-Z]+-[0-9]+ \|' … | wc -l` → **22** (`A-1..A-14` · `B-1..B-7` · `C-1`; `grep -cE '^\|'` → 28 = 22 rows + 3 headers + 3 separators). The seat measured this same packet four other ways and all four reproduce; only the borrowed count does not.
4. **A self-count survives in a gate witness** — G-F10-11 prints *"(`grep -c 'FR-NP-32' F-W10.md` was **0** at PASS-1 …)"*. E-19 declares the self-count habit *"retired at its root"* (R3-3.10) and states the escape test is given *"as a classification … never as `grep -c … F-W10.md`"*. Past-tense, no gate rests on it — but the sweep did not reach this cell.
5. **An undisclosed short-id collision** — bare `L-19` is used three times for the LESSON *"every gate names a live witness"* (masthead · Binding law · §3 head) while the corpus holds `fr-PaperSearch L-19` and `fr-AdminAuditLog AA-45 · L-19 / D-i2`. The one-home/qualify-short-ids law is applied scrupulously to `M-16`, `i-5`, `i-1`, `MISSED-2`, `D-i2` and `m-4`; the `L-19` collision is never disclosed, and it sits directly beside §1.7's un-verbed row.
6. **A ruled obligation not declared as a cross-edge** — R3-6.1 creates a live act at F.W5 (convert three bookings to citations). §4b's header requires each edge be *"declared FROM THIS END; each owed a reciprocal sentence in the named file"*, and §4b's F.W5 row does not name `AA-45/46/47`; the direction is stated only in §2.5's ▲ block. Discharged at the far end regardless, verified above.

---

## §7 What this pass CONFIRMS round 3 cured — recorded so the defects read at their true weight

- **PASS-3 MAJOR 1** (three strict `fr-PathPreview` rows escaping the drain entirely at the last F wave, settled by no F wave) — **CURED, and cured the way the ruling asked**: not by three patch rows but by running the derivation and publishing the transcript. The transcript reproduces to the line under two independent implementations, and the escape probe is scoped so it cannot match the file that cites it.
- **PASS-3 MAJOR 2** (a loose-class predicate false of ten of its sixteen members) — **CURED at the root**: the ten carry per-id verbs; the weak class is enumerated whole; and this seat's independent re-run of the predicate returns the spec's 32 lines / 19 records **element for element, in both directions**.
- **PASS-3 MINOR** (the band disclosure wrong twice — sets asserted to nest that cross; 44 records fused with 56) — **the CLAIM is cured** and the band is replaced by a partition whose arithmetic closes. Only the receipt beneath it fails (§2.1).
- **PASS-3 MINOR** (E-4 publishing live-sibling addresses under a *"corrected anchors used throughout"* disposition that E-17 claimed to have cured) — **CURED**: the two addresses are **abolished, not re-resolved**, replaced by word-output that reproduces EXACT from a declared `$V` base, with the three-`W9.md` ambiguity disclosed and the E-4/E-17 contradiction closed in terms.
- **PASS-3 INFO** (a bare `MISSED-2`) — **CURED, and the cure produced a finding**: record-qualification revealed round 2's bare token was a duplicate of a row already homed strictly at §2.5a.
- **The double-home** (`AA-45/46/47` held by both the drain and F-W5's clause bank) — **dissolved at both ends and verified at both ends.**

---

## §8 VERDICT

**DEFECTIVE.** Axes 1 (census), 3 (M-25 depth), 4 (gates, one MINOR) and 5 (posture) **HOLD**; axis 2 (receipt reality) holds on ~60 receipts and **fails on one**.

**No MAJOR survives.** The census axis that failed at PASS 3 is now the strongest axis in the file: the obligation set is closed under full slash/range expansion in a probe no prior seat ran; the partition exhausts its operand under two independent implementations; the predicate and the roster regenerate each other in both directions; all 69 strict head ids resolve; 88 rows carry 88 distinct `(id, record)` pairs with zero collisions; and every §X.1-v4 citation is right at F-W3's bytes.

What convicts:

1. **MINOR** — §2.5a's band-correction ⟨cmd⟩ **cannot produce its printed output** (`-h` suppresses the filename so `cut -d: -f1` reads the line number; the two boilerplate filters are omitted). As printed it returns 27 / 70 / 45 — never 44. The figure is right, the receipt is false, and it sits inside the cell built to end exactly this class, past a purge certificate asserting no such disposition survives in the eleven specs.
2. **MINOR** — E-1's corrected, self-binding denominator is **11 OPEN where the bytes give 12**: Ask 4's own status cell reads *"3 external repos OPEN — re-affirmed G.W8"* and E-1 quotes only its LANDED half.
3. **MINOR** — FR-TT-21 warrants its 35/9 denominator on a cross-reference to *"§2.2's FR-TT-1 cut"* that does not carry it, and cannot be made to carry it without breaking the shared-splice Δ=∅.
4. **MINOR** — G-F10-7 prints as its detector the `grep -v 'Routing law'` probe its own falsifier convicts, without the supersession mark §2.5a carries.
5. **MINOR** — the 69th strict disposition (`fr-PaperSearch L-19+C-N1`) is exempted from the per-id-verb rule the round imposed on itself for the ten, on a *"already homed as a fold target"* reading used nowhere else — and the fold runs **into** it.

Plus six **INFO** residues (§6): four punctuation drifts inside quotations, one verbatim label over an elided emphasis, one borrowed sibling count that measures 22 not 26, one self-count surviving in a gate witness, one undisclosed `L-19` homonym, one ruled obligation not declared as a cross-edge.

**routedTotal = 98 · bookedCount = 98 · escapedCount = 0.**

*Read-only everywhere except this file. No `fr-*.md`, spec, carry, ruling or certificate opened for write; no product source opened at all.*
