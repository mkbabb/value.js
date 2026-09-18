# X·F PASS-4 — F-W6 FRESH ADVERSARIAL SPEC CHECK (L-18/L-20, round 4)

**Seat**: fresh, 2026-08-29. **Roster inherited: NONE.** Every figure below was re-derived at the live bytes by this seat this session. `PASS-3/F-W6-CHECK.md`, `PASS-3/RULINGS-3.md` and `PASS-3/CLOSE-CERT.md` were read to learn what was *ruled* and *certified*, never to inherit what was *measured*. Where a PASS-3 figure is repeated below it is because this seat re-ran the instrument and got the same number, not because it was carried.

**Subject**: `docs/tranches/X/fourier/waves/F-W6.md` — **525 lines**, clean at HEAD (`git status --porcelain waves/F-W6.md` → no output; last write `fffb9685`).
**Corpus**: the 66 `fr-*.md` at `docs/tranches/V/megatranche/registry/adjudicated/` (`ls | grep -c '^fr-'` → **66**).
**Real carries**: `F-W1-CARRY.md`, `F-W4-CARRY.md` — the only two. F-W6 states this correctly.

**OPERATOR HAZARD, disclosed because it manufactures false convictions.** In this shell `grep` resolves to **ugrep**, which errors (`exceeds complexity limits`) on the `.{0,80}` idiom these specs use and silently changes results elsewhere. **Every receipt below was run under `/usr/bin/grep` (BSD).** `PASS-3/CLOSE-CERT.md §1.3(iii)` records the same hazard; it is real and it is still live.

**Local verdict: DEFECTIVE** — 10 defects, 3 at MAJOR weight. The wave's substance, its M-25 depth, its born-RED witnesses and its posture are sound and largely re-verified. What fails is, for the fourth consecutive round, **the census boundary** — the detector cured at round 3 is still a restricted detector one generation further out — **plus the arithmetic of the very transcript that round 3 built to retire the integer**, and a small residue of receipt defects inside the sweep that certified them absent.

---

## §1 — AXIS 1 · ID-KEYED CENSUS UNDER THE §X.1-v4 TWIN PARTITION

### 1.1 What reproduces exactly

| probe (this seat, `/usr/bin/grep`) | result | F-W6's figure | verdict |
|---|---|---|---|
| `grep -rhoE 'F\.W6' fr-*.md \| wc -l` | **0** | 0 | ✔ |
| `grep -rhoE 'F\.W5-W8' fr-*.md \| wc -l` / records | **120 / 26** | 120 / 26 | ✔ |
| `grep -rhoE 'F\.W5–W8' fr-*.md \| wc -l` / records | **72 / 24** | 72 / 24 | ✔ |
| union occurrences / records | **192 / 49** | 192 / 49 | ✔ |
| `grep -rnE 'F\.W5[-–]W8' fr-*.md \| grep -c 'tri-package uplift'` | **23** | 23 | ✔ |
| `grep -rhoE 'F\.W5[^ ]{0,6}W8' fr-*.md \| sort \| uniq -c` | `1 F.W5(-W8` · `120 F.W5-W8` · `72 F.W5–W8` | same | ✔ |
| `comm -13 <(grep -rlE 'F\.W5[-–(]W8' …) <(grep -rlE 'F\.W5' …)` | ConvergenceLegend · ConvergencePlot · EquationModeToggle · EquationResult · NotationPills | same five | ✔ |
| non-boilerplate band lines | **167 across 44 records** | — | ✔ |
| distinct (record, id) pairs walked back from those 167 lines (S-8) | **122** | 122 | ✔ |

**The band arm is CLEAN in both directions.** This seat walked **all** 167 non-boilerplate band lines back to their enclosing row ids mechanically (not a sample) and probed each id's leading token in `F-W6.md`. **Exactly two rows returned zero, and neither is an identity**: `Reader-1's BLOCKER positions on L-B1 and L-B2/C-2` (a dissent sentence, and F-W6 carries that dissent at §2.6) and `fr-PaperSearchDropdown C:C-23 / C:C-24`, whose band form sits inside that record's own **`F.W5-W8 = no rows.`** negative declaration — i.e. inside F-W6's §2.11a lower operand, where B5 forbids manufacturing a row. **Nothing in §2.0's 192/49/23 arithmetic, the 122, or the five boilerplate-only records' band-line count is re-litigated by this seat.**

**The twin consumption is ACCURATE.** F-W6's two §X.1-v4 citations were checked against `F-W3.md`'s published partition at the bytes: item **2** (*THE F.W4 HAND-OFF, NAMED PER ID*) names `fr-ContourEditorCanvas`'s ids on the criterion's default arm, and item **5**'s partition table places `fr-VisualizationView` in unit **`.e`** under **F.W3 `.e`**. F.W6 books nothing on the twin surface and asserts no home the partition has not assigned. **R3-1a is consumed correctly.**

### 1.2 THE ESCAPES — the fourth arm is record-restricted, and it excludes exactly the records it needed to reach

Round 3 added a fourth detector arm — *bare `F.W5` used as the NAME of the union* — but scoped it by the `comm -13` construction quoted above. **That construction can only ever return records that carry NO band form at all.** A record whose only band-form line is the routing-law boilerplate is therefore excluded from the fourth arm by construction, while contributing nothing to the band arm. **The five records F-W6 names as "boilerplate-only" are precisely the population this blind spot covers.**

**⟨cmd⟩** this seat, over the frozen corpus:
`perl -CSD -ne 'while(/F\.W5(?![-\x{2013}]W8)/g){print "$ARGV\n"}' fr-*.md | sort | uniq -c`
→ bare `F.W5` occurs in **18 records**, not five. Thirteen of them sit inside the 49-record band denominator and are invisible to the fourth arm.

**⟨cmd⟩** `grep -nE 'F\.W5[-–]W8' fr-AdminUserList.md` → **one line, `:28`, the routing-law boilerplate** (`tri-package uplift`). **⟨cmd⟩** `perl -CSD -ne 'if(/F\.W5(?![-\x{2013}]W8)/){print "$ARGV:$.\n"}' fr-AdminUserList.md` → **14 occurrences on 13 lines**, eleven of them terminal routing cells of banked rows.

**THE ESCAPED IDENTITIES — each `grep -c` in `F-W6.md` run by this seat:**

| # | banked id (record-qualified) | corpus coordinate | routing at the bytes | F-W6 hits |
|---|---|---|---|---|
| P4-1 | `fr-AdminUserList` **FR-AUL-3** | `:41` | *"**F.W5** — the R6-8 identity class … cure = stable per-operation abort keys"* | **0** |
| P4-2 | `fr-AdminUserList` **FR-AUL-11** | `:49` | *"**F.W5** — wrapper types re-derived from the router (R6-8 class)"* | **0** |
| P4-3 | `fr-AdminUserList` **FR-AUL-12** | `:50` | *"**F.W5** — same repair family as FR-AUL-11"* | **0** |
| P4-4 | `fr-AdminUserList` **FR-AUL-14** | `:52` | *"**F.W5** — `$ifNull` the projection or default the model fields"* | **0** |
| P4-5 | `fr-AdminUserList` **FR-AUL-20** | `:58` | *"**F.W5** — the join filters `deleted_at: None` (or the contract states tombstone-inclusive counting explicitly)"* | **0** |
| P4-6 | `fr-AdminUserList` **FR-AUL-21** | `:59` | *"**F.W5** — the status domain becomes one closed set across writers, model, and wire"* | **0** |
| P4-7 | `fr-AdminUserList` **FR-AUL-25** | `:63` | *"**F.W5** — a count/dry-run endpoint or two-step confirm"* | **0** |
| P4-8 | `fr-AdminUserList` **FR-AUL-31** | `:74` | *"**F.W5** — one `Literal`/union across wire and client"* | **0** |
| P4-9 | `fr-AdminUserList` **FR-AUL-46** | `:89` | *"**F.W5** — surface the cap in the shared contract"* | **0** |
| P4-10 | `fr-AdminUserList` **FR-AUL-59** | `:107` | *"**F.W5**"* (the `$lookup`-before-`$limit` pipeline) | 1 — **no landing cell**; the token occurs only inside §2.11 row 49's quotation of F-W5's B1 compose-lock |
| P4-11 | `fr-AdminAuditLog` **AA-23** | `:60` | *"**→ F.W5** (the 45/30/13 join must carry this constraint)"* — **MAJOR, repair-shaping** | host row unhomed; only its **killed** regex cure is carried (§2.5, §5) |
| P4-12 | `fr-AdminAuditLog` **AA-31** | `:71` | *"→ **F.W5** (45/30/13 join)"* | **0** |
| P4-13 | `fr-AdminAuditLog` **AA-32** | `:72` | *"→ F.W5 (same join row as AA-23)"* | **0** |
| P4-14 | `fr-GalleryAdminBanner` **GAB-15** | `:57` | *"→ **F.W5** (with the R3-7c client-gap rows) + label honesty **F.W4**"* | **0** |
| P4-15 | `fr-GalleryAdminBanner` **GAB-16** | `:58` | *"→ **F.W5**."* | **0** |

*(Adjacent and left uncounted, because their primary routing is elsewhere: `fr-GalleryAdminBanner GAB-17` → **F.W4** with an F.W5 contract-pass note; `fr-GalleryDraftsSection F-6` → **NO-WAVE-OWNER** with *"F.W5 provenance-contract input"* — 0 hits in F-W6, disposed at neither end.)*

**Every one of the fifteen is a server/persistence act** — an aggregation-pipeline join order, an `$ifNull` projection, a `deleted_at` filter on a `$lookup`, a closed status domain on the wire, a router populating `errors`/`matched_count`, an audit index and the filter that must use it, a `$match`-less stats pipeline. This is F.W6's declared mechanism subset under §2.11b branch 1, not client arms branch 1 would route away.

**Re-denominated: routedTotal = 147 · booked = 25 · escaped = 15 (10.2 %).**

### 1.3 The affirmative claim that is false at the bytes

F-W6 states, twice — at **§2.0** and again at **§5** — that

> **FIVE of the 49 records reach the span through that header ALONE and mint no identity** — fr-AdminUserList · fr-CanvasOverlayButton · fr-DarkModeToggle · fr-GlassTimeline · fr-HarmonicLevelGrid (1 line each, all boilerplate).

The parenthetical is true of **band-form lines**. The claim is about **identities**, and for `fr-AdminUserList` it is refuted by the record's own verdict cell — **⟨cmd⟩** `sed -n '165p' fr-AdminUserList.md` → *"…every routing above is agglomeration input for the forming X·F specs (F.W0 ×2 · F.W1 ×4 · F.W3 ×8 · F.W4 ×30 · **F.W5 ×12** · NO-WAVE-OWNER ×1 · GLASS-OWNED ×1 …)"*. The record tallies **twelve** F.W5 routings; this seat counts eleven terminal cells plus the R6-8 carry line. **F-W6 holds two of them** (`FR-AUL-13` and `FR-AUL-17`, both reached by other records' folds, neither by this record's routing).

This is not a variant of the round-3 defect. It is the round-3 **cure** reproducing the round-3 **defect** one scope-level out: round 1 was blind to a dash, round 2 to a bracket and to the union's own name, **round 3 to the records whose band line is boilerplate.** The file's own lesson at §2.0 — *"a detector enumerated by tokens the author happens to know reproduces the K-6 method failure at every round"* — now needs its second half: *a detector whose new arm is scoped by a set-difference against the old arm inherits the old arm's blind spot.*

**R2-9 convicts on its own terms.** FW6-G17 declares its operand *"spelling-agnostic across FOUR band forms"* and names the fourth arm's population as *"the five records whose routing taxonomy spells it that way"* — a **record-restricted operand**, stated inline, exactly what R2-9 makes DEFECTIVE at authoring whatever it returns.

---

## §2 — AXIS 2 · RECEIPT REALITY (33 receipts re-run by this seat)

`grep -o '⟨cmd⟩' waves/F-W6.md | wc -l` → **127** markers; `grep -on '⟨cmd⟩ \`[^\`]*\`'` → **106** fenced, executable commands. This seat re-ran **33** of them plus every gate witness, under `/usr/bin/grep`, from the bases the file declares.

### 2.1 REPRODUCING — 27 of 33, byte-exact

`grep -n "FR-GIG-5" waves/F-W5.md` (§0b bar) ✔ · `grep -o 'v2 states **deepen-or-retire** for the depth/parent/root quadruple'` ✔ · `grep -n "owns the CLAUSE"` → E2 at `:176` **and** G3 at `:286`, both strings exact ✔ · `grep -l '§6c'` → no output ✔ · `grep -l '§12'` → no output ✔ · `grep -rn "burn-down needs" waves/` → F-W6 only, 3 hits, all errata ✔ · `grep -rn -F 'strengthens the census routing' INTAKE-ADJUDICATION-2026-08-03.md` → `197:booking); strengthens the census routing, no new work.` — **plain**, the Q-1 cure holds ✔ · `sed -n '71,72p' CENSUS` → the two-line dissent with the `/` wrap ✔ · `grep -l '**on their side**' CENSUS` → no output ✔ · `sed -n '161p' lane-crud.md` → the V-α sentence ✔ · `grep -n 'Reusable as-is (value.js is ahead)' lane-crud.md` → `:394`, single hit ✔ · `grep -nE '^#{1,4} ' CENSUS` → §0–§6 + ADDENDUM (no §7) ✔ · `sed -n '200,202p' CENSUS` → §4 item 7 ✔ · `grep -n "neither side's edits gate the other's" COHESION.md` → `:69`, the SS-4 row ✔ · `grep -o "An audit row's actor is a FIELD, not a repurposed \`ip_hash\`"` → exact, **An** / **FIELD** / no interior period — **the Q-2 cure holds** ✔ · `grep -o "typed range-checked descriptor table[^\"]*"` → the bold on `**F.W5–W8 rider**` present and no prepended article — **the Q-5 cure holds at row 9** ✔ · `grep -o '**FR-EMT-20** (cited F1)'` ✔ · `grep -o 'dead projection on the same operation pair…'` ✔ · the seven **BLOCK A** clause receipts (`fr-EquationView B-1 ⊕ FR-EMT-1` · `FR-EQR-32 (C-§0.4)` · `FR-NP-30b (cited A5)` · `D-L4+C-7 (ConvergenceLegend)` · `L-M7 + C-8 (ConvergencePlot)` · `fr-ConvergencePlot C-7` · `fr-FunctionInput L-M3 ⊕ fr-ConvergencePlot L-m13`) — **all seven exact** ✔ · `grep -n "^### G-11 —|^### G-12 —" waves/F-W0.md` → `276` / `281`, both headings resolve ✔ · `grep -o "The roster is TWELVE limbs and stays twelve[^*]*" waves/F-W1.md` → exact ✔ · `grep -h '^## §Rows$'` / `grep -h '^### D · '` on the carry ✔ · `sed -n '234p' carry/F-W4-CARRY.md | grep -o "Its type reaches the F.W5–W8 wire rows."` → exact ✔ · the whole **§2.11a negative-roster loop, all seven, in order** ✔, and the **Q-7 cure** verified: `sed -n '131p' fr-CollapsibleSection.md | grep -oE '.{0,10}F\.W5[-–]W8.{0,110}'` → *"…that negative is recorded; the census-methodology rows go to S"* — the label is now true ✔ · `grep -o 'located at …intakes/…'` ✔ · `grep -o "carried as a **WAVE-LOCK**…"` ✔ · `grep -n "Server half" fr-EasingPicker.md` → **one** hit, the pasted string exact and the bold on `F.W5-W8` alone — **the round-2b cure holds** ✔ · `grep -o "F.W4** (one predicate, one home)…"` ✔ · `grep -o "the admin-auth seam owns WHICH predicate is canonical (F.W5)"` ✔.

**This remains a genuinely well-receipted document, and every round-3 quotation cure this seat could test (Q-1, Q-2, Q-3, Q-5 at row 9, Q-6, Q-7) HOLDS at the bytes.** The failures below are narrow — but three of them are cures that broke what they touched, inside a round whose certificate reports F-W6 at **111/111, zero command-level defects**.

### 2.2 NOT REPRODUCING — 6

**P4-R1 · §2.6, the innerPoly geometry sentence — the Q-4 cure broke its own receipt.**
The cell banks **⟨cmd⟩** `grep -o "its geometry pipeline routes to.\{0,90\}" fr-FourierShapeExtractor.md` and pastes *"…with the DO-NOT-REGENERATE rider and the M-10 innerPoly **trap attached**)"*. This seat ran it: the output ends at **`trap a`**. At `.{0,120}` — the bound PASS-3 used when it convicted the added bold — the output ends `attached), its page-surface deb`. **At no bound does the command produce exactly the span pasted beside it.** Round 3 cured the *emphasis* on this sentence (correctly — the plain form is restored and verified ✔) and narrowed the bound in the same edit, converting an emphasis defect into a command defect at the same cell.

**P4-R2 · §2.11 row 21 — the Q-5 class recommitted at a second string.**
Banked: **⟨cmd⟩** `grep -o "F\.W5's own binding.\{0,60\}" waves/F-W5.md` → *"**F.W5's own binding**: the server arm SEQUENCES AFTER the join split."* This seat's live output: `F.W5's own binding**: the server arm SEQUENCES AFTER the join split. The **C-2`. **Two faults, both of the class row 9 was cured for**: an opening `**` is **prepended** to a `grep -o` output that begins at `F`, and the tail is truncated with **no elision mark**. Row 9's own parenthetical says it — *"The cell that convicts a drift is the cell most likely to commit one"* — and the cell one section over committed it.

**P4-R3 · Multi-hit commands pasted as single lines, with no statement of the selection.** F-W6 convicts this exact shape at §2.2 (*"the command as written did not produce the single line pasted beside it … R2-1-LAW requires the quote to BE the output, not a selection from it"*). Three survivors, all re-run by this seat: §2.11 row 8 — `grep -n "m-7" fr-BasisSelector.md` → **3 hits** (`:73`, `:102`, `:118`), one pasted; §2.6 — `grep -n "innerPoly" fr-FourierShapeExtractor.md` → **3 hits** (`:10`, `:96`, `:157`), one pasted; §2.11 row 56a — `grep -n "FR-GIG-5" waves/F-W5.md` → **4 hits** (`:39`, `:162`, `:316`, `:341`), one pasted, and the same command is used at §0's standing-bar cell for a **different** quotation.

**P4-R4 · Truncation without elision inside receipted quotations — four further cells.** `grep -o "editor-saved contour is a first-class.\{0,90\}"` returns `… a \`source="editor"\` asset | fourier API row |`; the cell stops at `asset`. `grep -o "ship the 46th operation.\{0,70\}"` returns `… NO THIRD OPTION SHIPS** | fourier AP`; the cell stops at `SHIPS**`. `grep -o "FR-GFC-1's share at F.W5 is the RIDER ONLY.\{0,60\}"` returns `… become real params; **the bod`; the cell stops at `params`. `grep -o "The abort-key fix and FR-AUL-59's pipeline fix.\{0,60\}"` returns `… closes the window**. Map-growth ri`; the cell stops at the period. Each stop is at a clause boundary and no word is misquoted — but §2.11a's own round-3 lesson is that **"an unmarked truncation inside a cell labelled byte-for-byte is the same defect as an added emphasis: the label asserts a property the bytes do not have."** The lesson was applied at one cell and not at the rest.

**P4-R5 · A banked count of a live sibling, and a stale characterisation resting on it (§2.5 and §4's F.W5 edge).**
F-W6 asserts: *"**`F-W5.md` has NO clause D9** — `grep '\*\*D9\*\*'` → 0, the register runs D1–D8, D10–D17 … **"D9" in F.W5 is an owner-ruling label inside R8, never a clause.**"*
- The count reproduces (`grep -c '\*\*D9\*\*' waves/F-W5.md` → **0**), and F-W5:150 does say *"(No clause is numbered D9 …)"*. **But it is a COUNT of a live sibling**, banked without a ⟨cmd⟩ marker and without a rooted operand — the form line 516 of this same file declares **retired** under R3-3.10.
- The characterisation is **false at F-W5's live round-3 bytes**. **⟨cmd⟩** `grep -n 'D9' waves/F-W5.md` → nine hits, headed by `:109` **▲ RULING D9 — ROOTED HERE, ONCE, AT FIRST USE**, whose `:111` gives its **Home**: *"`docs/tranches/V/DECISIONS.md` §2 "Product and architecture rulings", row `D9`"*. D9 is a **value.js product ruling with its own rooted block**, which R8 must not contradict (`:236`) — not "a label inside R8". F-W6 even quotes the `F.W5 → value.js API row` edge row whose tail reads *"D9 reconciliation"*, so the receipt it pastes contradicts the gloss it writes. **Fourth-generation Q-6 class: an erratum that cures an address by asserting a fact about a live sibling.**

**P4-R6 · One certificate claim that does not hold.** `PASS-3/CLOSE-CERT.md §2` reports F-W6 at **markers 127 · run 111 · repro 111 · fixed 0 · struck 0**, and §2's footnote states *"F-W6, F-W8 and F-W9 have **no** command-level defect — their edits are label cures only."* P4-R1 is a command-level defect; P4-R2, R3 and R4 are receipt-vs-paste mismatches. The certificate's own closing sentence anticipates this — *"any later edit to a spec re-opens the ⟨cmd⟩ surface this certificate closes"* — but no later edit landed: `git status --porcelain waves/F-W6.md` → **no output**. The sweep did not catch them.

---

## §3 — AXIS 3 · M-25 DEPTH (locks · riders · dissents · the twin law)

### 3.1 Present and correct — re-verified at the bytes

- **FR-NP-32 canonical form (R3-8.2) — DISCHARGED.** `grep -c 'FR-NP-32' waves/F-W6.md` → **3**, and all three carry both witnesses: FW6-G19's born-RED cell **`FR-NP-32 (≡ fr-PaperSidebar M1)`**, §4's F.W0 edge **`FR-NP-32 ≡ fr-PaperSidebar M1`** with *"cite both, never substitute"*, and the round-3 repair record. The PASS-3 D-6 conviction is fully cured; no site carries `M1` alone.
- **`FR-EMT-20` BOOKED (R3-7.1) — DISCHARGED.** §2.7 carries it as a full row with witness, cure, locks and sequencing, cross-referenced as census escape E-3 at §2.11c BLOCK A and as branch **3-YES** at BLOCK B. F-W5 clause **E10**'s carried-rows cell names it — receipt re-run ✔.
- **The paper-register riders travel, and their ids exist**: `PAW-44` / `LAW-3` (`fr-PaperArticleWindow.md`) · `MPC-31` (`fr-MorphPhaseConfig.md`) · `FR-MSP-6` (`fr-MorphShapePreview.md`) · `fr-PaperSearchModal D-1+D-3+outline:none` — all named at §5's paper row with the correct disposition (*travel with their rows, which do not land here*). ✔
- **Anti-cures / killed cures, all carried and all still killed**: AA-23's regex action · β's 428-escalation · K9's five `?? item.slug` fallbacks · SE-05's *"just delete it"* · m-7's 422-straddle **scenario only**, with the R-6.4 scope correction intact · D-1's skeleton · K12 static closure · FR-GV-24's no-re-open-increment · K-1's 45/30/13 · K-6/S-8. ✔
- **The M-10 innerPoly ANTI-CURE RIDER** and the **DO-NOT-REGENERATE TRIPWIRE** with its BLOCKER-revival clause: both carried where their rows land, both stated correctly. Only the innerPoly *receipt* is defective (P4-R1); the **prohibition itself is intact and correctly binding**. ✔
- **The `fr-GallerySearchBar` C-2 WAVE-LOCK** — the corpus's only lock binding *"any F.W5-W8 wiring"* by name — receipt re-run exact, restored at §2.11 row 50 and repeated at §4 lock 9. ✔
- **The twin law (R3-1a) is obeyed, not merely cited.** Both §X.1-v4 references check out against `F-W3.md`'s published partition (§1.1 above). F.W6 asserts no twin home of its own; escape E-1's exclusion rests on the partition rather than on this seat's judgement. ✔
- **Dissents preserved**: retire-vs-deepen (with census C-6 quoted whole and fourier's M.W10 DELETE booking) · FR-AFP-7 β/L-axis-only · FR-AFP-10/-70 β-only · reader-1's BLOCKER positions on L-B1 and L-B2/C-2 against the seat's MAJOR demotion · GIG C-3's refused re-grade (R-7 identity guard) · FR-GFC-1's two BLOCKER filings · the L-1/L-2 dual-BLOCKER resolution. ✔
- **Owner-ruling roster R1–R9** complete and correctly labelled (R8 not "G5"; R6 not "E7"), with R5 and R9 restored and FR-USB-23's ⊙ travelling across the F.W8 routing row. ✔

### 3.2 Defective

- **P4-R5's stale D9 characterisation** (above) is an M-25 defect as well as a receipt defect: it states, in this wave's voice, a false fact about the clause register the whole file is keyed to.
- **`fr-AdminAuditLog AA-23`'s host row is dropped while its killed cure is carried.** This is the m-7 correction — *"a killed sub-claim never kills its host row"*, R-6.4, which this file makes explicitly and correctly at §5 for `fr-BasisSelector m-7` — **unapplied one record over**, at a row banked **MAJOR, repair-shaping**, routed **→ F.W5**, and carrying a live constraint (*"the 45/30/13 join must carry this constraint"*) that binds the very K-1 counting lock F-W6 repeats at §2.9 and §4 lock 6.

---

## §4 — AXIS 4 · GATES

### 4.1 Born-RED, witnesses real — re-run against the live fourier tree

| gate | witness re-run (this seat) | result |
|---|---|---|
| FW6-G1 | `grep -rn "_write_root_version" $F/api` | def `visualizations.py:110` · call `:220` · call `:592` — **the only writer** ✔ |
| FW6-G6 | `grep -rn "viewed_ips" $F/api` / `liked_ips` | **0** / non-empty ✔ (the file banks no count for either — correct under R3-3.10) |
| FW6-G10/G12 | `grep -n "if not flagged" $F/api/routers/admin.py` | `550:    if not flagged:` ✔ |
| FW6-G12 | `grep -nE 'response_model' $F/api/routers/admin.py` | **exactly one** — `:110 "/stats", response_model=AdminStatsResponse…` ✔ |
| FW6-G12 | `grep -cE '^@[a-z_]*router\.(get\|post\|put\|patch\|delete)' admin.py` | **13** ✔ — the 1-of-13 re-measure holds |
| FW6-G15 | `grep -rn "def order_contours" $F \| wc -l` | **0** ✔ |
| FW6-G16 | `git diff --stat -- api/src src` | **empty** ✔ |
| FW6-G19 | `wc -l J-diff-shape.md` | **271** ✔ |

**No gate is argued RED over a witness that does not reproduce.** The round-2 FW6-G12 cure and the round-3 FW6-G19 canonical-form cure both hold.

**Check-file operands: CLEAN.** FW6-G17 names the PASS-1/PASS-2 censuses only to **strike** them (*"that offer is STRUCK — those files are prior runs, nameable as such, never operands"*), and R3-4's FAIL-by-construction law is quoted in the cell. Every other `PASS-n` string in the file is a provenance or errata mention. **R3-4 is discharged.**

### 4.2 FW6-G17's operand is still restricted — and its own denominator does not reproduce

**(a) Spelling/scope.** §1.2 above. The gate declares four band forms and then scopes its fourth to five records by a set-difference against the first three. Fifteen union-routed identities in four records sit outside both operands. A GREEN here would be a **false green over ten percent of the roster**, which is the condition FW6-G17 exists to make impossible.

**(b) THE TRANSCRIPT'S ARITHMETIC CONTRADICTS ITS OWN COUNTING RULE.** This is the sharper half, because §2.11c was built specifically to retire the integer.

§2.11c states the rule before the roster, in bold:

> a **named fold** (branch 2) is transcribed at its carrier and is **NOT a separate member of the roster** … **The roster stays 132.**

§2.0 states the partition of that 132:

> **25 booked · 64 cited (§2.11 rows 1–56 ⊕ §2.11c BLOCK A's 8) · 43 disposed at §5 (the 42 tail dispositions ⊕ escape E-1).**

**⟨cmd⟩** this seat, over BLOCK C's own branch column —
`sed -n '342,406p' waves/F-W6.md | awk -F'|' 'NF>2{print $3}' | sed 's/ //g' | sort | uniq -c`
→ **`21` branch 1 · `42` branch 2** (63 identity rows).

**BLOCK C marks exactly 42 rows as branch 2 — the branch its own counting rule declares NOT roster members — while the roster arithmetic requires exactly 42 tail MEMBERS.** The two 42s are the same number playing opposite roles. Under the stated rule the tail contributes **21**, and the enumerated roster closes at **25 + 64 + 21 + 1 = 111**, not 132; counting the folds instead gives **25 + 64 + 63 + 1 = 153**. Tightening further — §2.11's rows 4, 10, 39, 47, 48 and 54 are themselves declared **named folds**, so the 64 cited is also over-counted under the rule — pushes the figure lower still, never to 132.

**Neither reading closes**, so falsifier (a)'s two-direction set-difference cannot be run to a determinate answer from this file, which is the same disability §2.11c was authored to remove — *"an integer cannot carry that distinction, and every round so far has broken on one."* It has broken on one again, this time inside the section that says so.

**(c) What is genuinely cured.** The upper operand IS now enumerated by id — BLOCKS A/B/C print every identity with a branch and a landing section, and the round-2 device *"rows 57–122 … are not restated here"* is struck. **PASS-3 D-7 is discharged in form.** The reverse direction (`grep` each printed id, confirm the landing section holds it) is executable as written, and this seat ran it against the band arm with two non-identity exceptions (§1.1). The defect is that the **denominator** the enumeration is supposed to reproduce still does not.

### 4.3 §2.11b — the discriminator is now correct, and it was RUN

The round-3 amendment is **right**: the clause's green owner was never the discriminator; the row's own terminal disposition is. This seat re-ran the eight PASS-3 mismatches under the amended branch and the table's verdicts are correct on every one — `FR-AFP-33`'s terminal cure (`$slice` the `$push`, scope the aggregate on `admin.py`) is a server act this seat performs → BOOK; `M-9`'s is an ⊙ contract admission, `M-10`'s two client enum maps, rows 21/22's the dock's client arm, `FR-GFC-1`/`FR-GV-13`'s the list contract's own decision → CITE. **GCM-10's re-landing to branch 2 is correct and is corroborated by GCM-55's registry cure** (*"with GCM-10's model fix"*), which this seat read at `fr-GalleryCardModal`. **PASS-3 D-3 is discharged.** Branch 4's **conditional promotion** amendment is a real improvement and is applied at both ⊙ escapes (E-4's F8 seam choice, E-6's R5 branches).

---

## §5 — AXIS 5 · POSTURE

| item | measured | verdict |
|---|---|---|
| F.W1 transaction whole at its pinned coordinate | §4 lock 5 cites **F-W1 §4 step 4** and quotes the TWELVE sentence by ⟨cmd⟩; the sentence is at `F-W1.md:276`, and `:276` **is** step 4 (*"4. **The atomic transaction (ONE change, G6):**…"*) inside `## §4 Sequencing` (`:270`). Count word TWELVE, no limb named, no re-derivation | ✔ |
| W7 zero-row posture | F-W6 books nothing to F.W7; its F.W7 edge and §5 row confine to the ⊙ trie/compression design (E16/G7) with the documented no-trie default; nothing minted into F.W7's empty column | ✔ |
| SS-4 flags inline | §4's SS-4 edge flags **all nine** rulings by ruling id with honest defaults, plus OG-F1/OG-F2; FW6-G18 carries the same roster; §5 repeats it; R5 and R9 explicitly restored | ✔ |
| tree READ-ONLY | §1's NOT-in-bounds row, standing law 1, the §4 fourier edge, the r7 read-not-write reconciliation; `git diff --stat -- api/src src` → **empty**; zero fourier bytes | ✔ |
| status `planned`, zero VERIFIED | masthead `status: planned`; Four-verb IMPLEMENTED **NO** / VERIFIED **NO**; *"EXECUTION IS NOT AUTHORIZED BY THIS FILE"* | ✔ |
| F.W0 pre-gates honored | §4 lock 1 HALT clause; FW6-G19; D-19 MEASURE-AT-OPEN on every anchor; G-11/G-12 cited **by gate id**, and both headings resolve (`:276` / `:281`). The Q-6 cure — the stale FACT replaced by a classification — **holds** | ✔ |
| RULINGS-3 applied | **R3-5.2 PARTIAL** (four spellings stated; the fourth arm record-restricted — §1.2) · **R3-7.1 ✔** · **R3-8.2 ✔** · **R3-9.3 ✔** (discriminator amended, run, printed) · **PASS-3 D-7 ✔ in form, ✘ in arithmetic** (§4.2b) · **R3-3.9 Q-1…Q-7**: Q-1 ✔ · Q-2 ✔ · Q-3 ✔ · **Q-4 ✘** (bold cured, command broken — P4-R1) · Q-5 ✔ at row 9, **✘ recommitted at row 21** (P4-R2) · Q-6 ✔ · Q-7 ✔ at its own cell, not generalised (P4-R4) · **R3-3.10 PARTIAL** (the D9 count survives — P4-R5) | mixed |

---

## §6 — DEFECT REGISTER

| # | sev | defect | receipt |
|---|---|---|---|
| **P4-D1** | **MAJOR** | **15 union-routed identities in 4 records escape both FW6-G17 operands.** The round-3 fourth arm (bare `F.W5`) is scoped by `comm -13` against the band arm, so it structurally cannot see a record whose only band line is boilerplate — exactly the five records §2.0 names | `perl -CSD -ne 'while(/F\.W5(?![-\x{2013}]W8)/g){print "$ARGV\n"}' fr-*.md` → **18 records**, not 5; each escaped id `grep -c` in F-W6.md → **0** (§1.2 table); FR-AUL-59's single hit is inside a quotation, with no landing cell |
| **P4-D2** | **MAJOR** | **An affirmative census claim that is false at the bytes.** §2.0 and §5 both state the five boilerplate-only records *"mint no identity"*; `fr-AdminUserList` routes **11 rows** to `**F.W5**` | `grep -nE 'F\.W5[-–]W8' fr-AdminUserList.md` → one boilerplate line; `sed -n '165p' fr-AdminUserList.md` → *"… **F.W5 ×12** …"* — the record's own verdict tally |
| **P4-D3** | **MAJOR** | **§2.11c's counting rule and §2.0's 132 are irreconcilable.** BLOCK C marks **42** rows branch-2 (declared NOT roster members) and **21** branch-1, while the roster needs **42 tail MEMBERS**; the enumerated roster closes at **111** (rule applied) or **153** (rule ignored), never 132 — so the gate's set-difference has no determinate denominator | `sed -n '342,406p' waves/F-W6.md \| awk -F'\|' 'NF>2{print $3}' \| sed 's/ //g' \| sort \| uniq -c` → `21 · 1` / `42 · 2` |
| **P4-D4** | MEDIUM | **A receipt that cannot produce its own paste — inside the Q-4 cure.** §2.6's `.{0,90}` bound stops at `trap a`; the cell pastes `trap attached)`. The emphasis was cured and the command broken in one edit | `grep -o "its geometry pipeline routes to.\{0,90\}" fr-FourierShapeExtractor.md` → `…M-10 innerPoly trap a`; at `.{0,120}` → `…attached), its page-surface deb`. No bound yields the pasted span |
| **P4-D5** | MEDIUM | **The Q-5 class recommitted at §2.11 row 21** — an opening `**` prepended to a `grep -o` output that begins at `F`, plus an unmarked truncation | `grep -o "F\.W5's own binding.\{0,60\}" waves/F-W5.md` → `F.W5's own binding**: … join split. The **C-2`; cell pastes `**F.W5's own binding**: … join split.` |
| **P4-D6** | MEDIUM | **A banked COUNT of a live sibling, and a stale characterisation resting on it.** §2.5/§4 assert *"D9 in F.W5 is an owner-ruling label inside R8, never a clause"* on `grep '**D9**'` → 0 — the form line 516 declares retired, and the gloss is false at F-W5's round-3 bytes | `grep -n 'D9' waves/F-W5.md` → 9 hits headed by `:109` **▲ RULING D9 — ROOTED HERE**, `:111` Home = `docs/tranches/V/DECISIONS.md §2 row D9`; `:236` R8 *"must not contradict ruling D9"* |
| **P4-D7** | MEDIUM | **Three multi-hit receipts pasted as single lines with no statement of the selection** — the shape §2.2 convicts in its own words | `grep -n "m-7" fr-BasisSelector.md` → **3**; `grep -n "innerPoly" fr-FourierShapeExtractor.md` → **3**; `grep -n "FR-GIG-5" waves/F-W5.md` → **4** |
| **P4-D8** | LOW | **Unmarked truncation inside receipted quotations at four further cells** — the Q-7 precision applied at §2.11a and nowhere else | `grep -o "editor-saved contour…\{0,90\}"` → `…asset \| fourier API row \|`; `"ship the 46th operation.\{0,70\}"` → `…SHIPS** \| fourier AP`; `"FR-GFC-1's share…\{0,60\}"` → `…params; **the bod`; `"The abort-key fix…\{0,60\}"` → `…window**. Map-growth ri` |
| **P4-D9** | LOW | **`fr-AdminAuditLog AA-23`'s host row dropped while its killed cure is carried** — the R-6.4 correction this file makes correctly for m-7, unapplied one record over | `sed -n '60p' fr-AdminAuditLog.md` → *"**AA-23 … MAJOR, repair-shaping** … **→ F.W5** (the 45/30/13 join must carry this constraint)"*; F-W6 carries only *"AA-23: the regex-action cure … is REJECTED"* |
| **P4-D10** | LOW | **`PASS-3/CLOSE-CERT.md` certifies a clean surface this seat can falsify** — §2 reports F-W6 `111/111`, `fixed 0`, and *"no command-level defect"*, against P4-D4/D5/D7/D8; and the file has not been written since | `git status --porcelain waves/F-W6.md` → no output; the four receipts above re-run under `/usr/bin/grep` |

---

## §7 — WHAT THIS PASS DOES **NOT** RE-LITIGATE

Stated so a fifth pass does not re-open them. The **192 / 49 / 23** span arithmetic and the **122** band-form roster — both re-derived mechanically here, not sampled, and both exact · the **five boilerplate-only records' band-line count** (the parenthetical is true; only the identity claim is not) · the **§2.11a negative roster**, all seven re-run in order, with the **Q-7 cure verified true** · the **R-1e clause re-keys** (E7 · E13 · E14+E17 · D5 · D17 · D6/R6) and the retirement of the invented `D9` **as a clause** · the **R1–R9 owner roster** and the ⊙ discipline · the **born-RED witness set**, every witness re-run against the live fourier tree · **FW6-G12's 1-of-13** · the **DO-NOT-REGENERATE TRIPWIRE**, the **M-10 innerPoly prohibition**, the **WAVE-LOCK**, the **one-cut laws** and the **killed-cure register** · the **TWELVE-limb citation at a stable anchor that resolves** · **F.W7's ∅ posture** · the **read-only / E-3 / `planned` discipline** · the **§2.11b amended discriminator**, which this seat re-ran over all eight PASS-3 mismatches and found correct · and the **twin hand-off**, verified against `F-W3.md` §X.1-v4 items 2 and 5 at the bytes.

**The wave's substance, its depth and its posture are sound. Its census boundary is defective for the fourth consecutive round — this time because the cure inherited the blind spot of the thing it cured — and the transcript built to retire the census integer does not reproduce that integer.**

*Read-only everywhere except this file.*
