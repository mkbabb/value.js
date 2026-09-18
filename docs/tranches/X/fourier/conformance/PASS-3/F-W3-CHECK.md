# F-W3 — FRESH ADVERSARIAL SPEC CHECK (L-18 / L-20, PASS 3)

**Subject**: `/Users/mkbabb/Programming/value.js/docs/tranches/X/fourier/waves/F-W3.md` (**654 lines**, 20 gates, 6 units, §X.1 = 59 rows + §X.1-v2 9 rows + §X.1-v3 5 rows)
**Corpus authority**: the 66 `fr-*.md` adjudicated records at `/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/registry/adjudicated/`. Real carries = `carry/F-W1-CARRY.md` + `carry/F-W4-CARRY.md` ONLY (⟨cmd⟩ `ls docs/tranches/X/fourier/carry/`, this seat 2026-08-28).
**Seat**: FRESH, pass 3. **No roster inherited.** The detector below was written from R2-3a item 1 + R2-9 alone; PASS-1/PASS-2 counts and the RULINGS' figures were re-derived, never copied. Read-only against `/Users/mkbabb/Programming/fourier-analysis` (`grep`/`sed`/`wc`/`ls`/`git status`). Sole write = this file.
**Verdict**: **DEFECTIVE** — six MAJOR. The repair's substantive work is real and, where audited, byte-faithful: **every corpus quotation this seat spot-checked reproduces at its coordinate, every runnable gate witness reproduces at the tree, and every F-W0/F-W1 cross-spec receipt reproduces by stable anchor.** What fails is (i) one of the spec's own pasted alias-axis receipts, falsified at the bytes, taking §X.1-v3's *"every"* down with it; (ii) g19's booking test, which is **record-blind** and therefore satisfiable by homonym collision — the fourth blindness axis, unnamed after three were cured; (iii) §5a's disjointness, re-affirmed as TRUE by the very round-2 block that was supposed to cure it, while its own splits and one §C.I repair unit falsify it; (iv) R2-1-LAW 2/3, breached 47× and once in the exact R2-1d shape the round closed.

---

## §0 Method (fresh; id-keyed, shape-agnostic, dash-agnostic, alias-aware)

1. **Token detector.** `F\.W3(?![0-9])` **and** any span `F\.W(\d+)[–-]W(\d+)` covering 3, in **both** U+002D and U+2013.
   ⟨cmd⟩ this seat: `grep -rhoE 'F\.W[0-9]+[–-]W[0-9]+' fr-*.md | sort | uniq -c` → `120 F.W5-W8` · `72 F.W5–W8` **and nothing else**. The en-dash arm is ∅ for W3 — reproduced independently, a measured negative, kept in the probe.
2. **Row shape (R2-3a item 1).** A markdown table row whose **terminal cell** routes, ⊕ an **id-headed bullet** routed in context (`→` · `ADJUDICATED` · `⇒` · `rides` · `routed` · `FOLD` · `held`).
3. **Atomisation.** Ids scanned from cell 1 / bullet head, **LEFT of `=`** (the ruling's alias rule); `·` preserved (`L·D-1` ≠ `L-D-1`); hyphen-runs preserved (`MISS-DU1` ≠ `MISS-DU-1`); grade tails and `fr-Foo` prefixes stripped.
4. **Booked** = boundary-exact `(?<![A-Za-z0-9\-·])ID(?![A-Za-z0-9\-·])` against `F-W3.md`. **Escaped** ids re-tested against `F-W0/F-W1/F-W2/F-W4..F-W10` + both carries.
5. Two atomisers were run (strict split-and-fullmatch; permissive scan-for-id-tokens). Scripts: `/private/tmp/.../scratchpad/w3p3/{census3.py,census3b.py}`.

---

## §1 THE CENSUS (fourth independent derivation)

| measure | this seat (permissive) | this seat (strict) | the spec's own §0 receipts | the ruled figure |
|---|---|---|---|---|
| routed rows — **table terminal cell** | **317** / 37 records | **317** / 37 | 317/37 (×3 runs) | 317/37 |
| routed rows — **route-marked bullets** | **731** / 43 records | **730** / 42 | 681/37 · 742/42 · 764/43 | 691/36 |
| **routedTotal (both shapes)** | **1048** / **65 records** | 1047 / 65 | 1059 / 65 | **1008 / 62** |
| dual `F.W3/W4` rows | **880** | 880 | 903 · 885 | 844 |
| sole `F.W3` rows | **168** | 167 | 151 · 174 | 164 |
| **booked** in `F-W3.md` (boundary-exact) | **763** | 598 | — | — |
| **escaped** (id-keyed) | **256** | 264 | — | — |
| escaped **and homed in NO X·F document** | **144** / 22 records | 155 / 28 records | 172 / 30 records | 103 |
| rows whose head yields no atomic id | 29 | 185 | — | — |

**The table arm is 317/37 in every run ever taken — a fourth exact reproduction.** The total clears the ruled floor (1048 ≥ 1008), so g19's floor clause is satisfied by this seat's run and the spread is atomisation, as the spec says. **The record count is not**: see D-6.

---

## §2 DEFECTS (ranked)

### D-1 — MAJOR · §0 ▲▲▲'s ALIAS-AXIS RECEIPT IS FALSIFIED AT THE BYTES: "`fr-CoefficientsSpectrum` 9 → **0**" is not 0

§0 ▲▲▲ pastes, as the receipt that makes g19 closable at all:

> ⟨cmd⟩ this seat, `escapes.py` (both sides) vs `escapes_left.py` (left-token rule), same roster, same boundary-exact test → zero-homed id-instances **254 → 172**, with whole phantom families gone (`fr-GalleryDraftsSection`'s eighteen `C-C-*` → **0**; `fr-ContourSettings` 11 → 1; `fr-CoefficientsPanel` 41 → 17; **`fr-CoefficientsSpectrum` 9 → 0**).

Under the spec's **own left-token rule**, `fr-CoefficientsSpectrum` retains **at least two** zero-homed banked ids. Both are `=`-joined heads whose LEFT token is the banked id, both route-marked, both routed to W3:

| banked id | coordinate | routing tail (verbatim) | in `F-W3.md` | anywhere in `waves/` + `carry/` |
|---|---|---|---|---|
| `m-19` | `fr-CoefficientsSpectrum.md:90` — `- **m-19 = C-22 — MINOR (latent; demoted from the corpus's MAJOR).**` | `**→ F.W3/W4** (rider on the convergence decision).` | **0** | **∅** |
| `m-22` | `fr-CoefficientsSpectrum.md:93` — `- **m-22 = D-m7 / D-i7 — MINOR.**` | `**→ F.W3/W4**.` | **0** | **∅** |

⟨cmd⟩ this seat, 2026-08-28: `grep -c -- 'm-19' waves/F-W3.md` → **0**; `grep -rl -- 'm-19' waves/ carry/` → **∅**; identically for `m-22`. (The record's other 8 `m-*`/`i-*` ids ARE carried qualified — `CoefficientsSpectrum M-1 · M-6 · i-1 · i-2 · i-5 ×2 · m-11 · m-14 · m-21` — which is exactly what makes the two survivors legible as omissions rather than as an atomiser artefact.)

This is not a counting quibble: **the "9 → 0" line is the load-bearing demonstration that the left-token rule dissolves the escape residue**, and it is the sentence §Z re-states as *"the alias rule that makes the gate closable at all."* One of the four families it names does not go to zero. My run's per-record deltas agree with the other three (`C-C-*` → 0 ✓ · ContourSettings → 1 ✓ · CoefficientsPanel → 16 vs 17), which isolates the failure to this cell rather than to a detector disagreement.

### D-2 — MAJOR · §X.1-v3's "It homes **every** zero-homed escape to a NAMED holder" is FALSE — and the miss is a record the file criterion sends to F.W3

§X.1-v3 partitions **"172 zero-homed id-instances across 30 records"** and closes: *"It homes **every** zero-homed escape to a NAMED holder."* §Z re-states it: *"the whole escape residue is HOMED rather than deferred."*

`fr-CoefficientsSpectrum` **is not one of the 30 records** (⟨cmd⟩ `sed -n '567,573p' F-W3.md | grep -c 'fr-CoefficientsSpectrum'` → **0**), yet it carries the D-1 residue. The criterion the section calls *"mechanical, decidable today, and file-based"* answers unambiguously against the spec here: the record's target file is **`shared/CoefficientsSpectrum.vue`**, which appears in **§5d's Files list** (⟨cmd⟩ `grep -c 'shared/CoefficientsSpectrum.vue' F-W3.md` → 2, §1 bounds + §5d) — so the dual spelling homes at **F.W3**, not F.W4, and `m-19`/`m-22` have no holder in any wave, any carry, §2, §X.1, §X.1-v2 or §X.1-v3.

§8's hedge (*"a residue id whose record is not in that table is a NEW record, not a new escape — say which"*) is an instruction to a close transcript that does not yet exist; it does not make §X.1-v3's *"every"* true today. My independent run puts 22 records in the residue against the section's 30 — the overlap is 21, and the one record outside the section's partition is the one it explicitly certified to zero (D-1). Two claims, one root.

### D-3 — MAJOR · g19's BOOKING TEST IS RECORD-BLIND — the FOURTH blindness axis, after three were cured

g19's (→) direction reads: *"every routed id in the roster either **greps in this file by boundary-exact bytes**, or appears in §X / §X.1 with a named holder and a reason."* The detector states three axes inline — **shapes**, **spellings**, **atomisation/alias** — and **not record qualification**. Boundary-exact bytes of a *bare* token is not an identity test.

Measured, this seat: the roster carries **860 distinct head-ids**, of which **140 occur in ≥2 different records**, and **421 routed rows satisfy g19's (→) test ONLY through a cross-record homonym**.

Worked receipt, verified by hand:

- `fr-App M-2` — ⟨cmd⟩ `sed -n '49p' fr-App.md` → `- **M-2 — MAJOR.** No skip link; `<main>` (App.vue:26, verbatim re-read) has no `id`/`tabindex`/name — WCAG 2.4.1 fails on every route; glass-ui ships `.sr-only`, so the cure is three lines in this file. **→ F.W3/W4.**`
- ⟨cmd⟩ `grep -o '\bM-2\b' F-W3.md | wc -l` → **8** — every one a different record's row (`fr-GalleryDraftsSection M-2` §C.H · `fr-ContourSettings M-2` §C.G · …). g19 reports the id present.
- ⟨cmd⟩ `grep -c 'skip link' F-W3.md` → **0**. The row is nowhere in the spec.

The wave names this precise hazard **four times in its own §2** and still omits it from the gate: §C.D's *"`MISS-DU1/3/4` … are NOT `fr-GalleryView`'s `MISS-DU-1..4` … the two spellings differ by one character and the collision is exactly the kind that hid these rows"*; §C.H's *"this `L-18` is `fr-MorphShapePreview`'s and is NOT `fr-CanvasControlsDock L-18`"*; §C.I's *"this `MAJ-7` is `fr-VisualizationView`'s"*; §C.C's *"the bare tokens `R-4`/`R-9` are fleet homonyms, so they are carried qualified, never bare, **per the R-5 qualification law**."* R2-7.2 ruled F.W8 on the same law (*"a bare token is not an identity"* — *"the file diagnosed the trap … and fell into it"*). g19 diagnoses three traps and falls into the fourth: **its green is reachable while 421 routed rows are absent from the file.**

(The consequence compounds D-2: §X.1-v3's residue roster was derived by the same record-blind test, so records whose ids collide with a booked homonym — `fr-App` 19 rows, `fr-MobileFloatingToc` 28, `fr-SvgFilters` 26, `fr-CollapsibleSection` 19 — never enter the residue to be homed.)

### D-4 — MAJOR · §5a's DISJOINTNESS IS STILL FALSE, and §5a-v2 re-affirms it as TRUE

§5a-v2 — authored **this round as the cure for PASS-2 D-4** — opens: *"The opening sentence is TRUE and stays: **no two units share a `modify` path**, and the file lists above are the authority."* §5a falsifies it three times in its own body:

| shared `modify` path | units | §5a's own words |
|---|---|---|
| `stores/animation.ts` | `.a` + `.b` | *"**(2)** `stores/animation.ts` is touched by `.a` (session) and `.b` (barrel seam)"* |
| `morph/MorphPhaseConfig.vue` | `.a` + `.b` | *"`MorphPhaseConfig.vue` is `.a`'s for the slider-token cut and `.b`'s for the easing twin"* |
| `<repo>/web/e2e/**` | `.a` + `.d` | *"**(3)** `e2e/**` is `.a`'s for g4/g5 and `.d`'s for the LC-1/LC-2 keystone"* |

Sequencing a shared path is not disjointness; it is a declared conflict. §5 repeats the false form in its preamble (*"`.a`–`.e` are **file-disjoint** per §5a"*).

**And one shared path is not declared at all.** §C.I's `fr-AdminUserList FR-AUL-27 / FR-AUL-18 / FR-AUL-51 / FR-AUL-52 (⊕ FR-AFP-38, FR-AFP-39)` books *"the batch toolbar authored twice divergent"* → *"one shared local toolbar"*, and adopts `FR-AFP-33`'s client limb *"inside the same `useCursorPagination` extraction that this bullet already books — **one repair unit, not a second pass over the file**."* The two authorings live in `visualization/gallery/AdminUserList.vue` (**`.e`**, §5e Files) and `visualization/gallery/AdminFlaggedPanel.vue` (**`.d`**, §5d Files). §5a declares splits (1)(1a)(1b)(1c)(2)(3)(4); **none covers it**, and §5a-v2's cure (*"No unit opens a file another unit owns"*) is stated as already satisfied. This is the same class §5a's own rationale names — *"a shared glob is the hidden conflict the X·V W5-D1 defect taught"* — surviving at a row instead of a glob.

### D-5 — MAJOR · R2-1-LAW BREACHED: 47 "verbatim" labels with no ⟨cmd⟩ note, and one quote of a RULINGS file as authority

R2-1-LAW is *"binding on EVERY seat this round, and standing."* Item 2: **"A 'verbatim' label without a ⟨cmd⟩ note is a defect per se, whatever the words say."** Item 3: **"Rulings files are not quotable authority."**

- ⟨cmd⟩ this seat: `grep -o 'verbatim' F-W3.md | wc -l` → **53** over **50 lines**; `awk '/verbatim/ && !/⟨cmd⟩/' F-W3.md | wc -l` → **47 lines** carry a verbatim label with no provenance note. Only three verbatim labels in the file (`:250` FR-COB-15, `:302`/`:303` the `.e` escape set) travel with a ⟨cmd⟩.
- **The R2-1d shape, recurring.** §7 (`:504`): *"**▲ THE CADENCE'S STANDING RED, DISCLOSED (ruling R-8, verbatim)**: "the per-batch `npx vite build` cadence is RED BY CONSTRUCTION at the installed ^4.0.0 pin until FR-NP-32 clears (F.W0 G-4); a batch's build gate reads against that standing RED, not against the batch.""* ⟨cmd⟩ this seat: `grep -c 'RED BY CONSTRUCTION at the installed' conformance/PASS-1/RULINGS.md` → **1** (`:178`); the same sentence over the 66 records → **∅**. The quoted authority **is a rulings file**, labelled verbatim, with no ⟨cmd⟩ — precisely the failure R2-1d closed (*"a RULING's text is a cure-shape, never a quotable authority"*).

**Mitigation of record, so this is not read as fabrication**: every corpus quotation this seat spot-checked reproduces byte-exactly at its cited coordinate — see §3. The defect is the label discipline the round made per-se, plus one wrongly-sourced authority.

### D-6 — MAJOR · §X and §Z carry a CHECK-FILE-DERIVED denominator as "the roster of record", and its record count is falsified by the spec's own adjacent receipt

§Z: *"**The roster of record is the CORPUS** … ruled at **1,008 rows / 62 records (317 table ⊕ 691 bullet)**, of which **844 are dual-`F.W3/W4`**"* — re-stated at §0 ▲▲, §X and g19.

- **`691` has never been reproduced by any detector, ever.** The bullet arm has returned `681 · 730 · 731 · 742 · 764` across four seats and two rounds; `691` originates in `conformance/PASS-2/F-W3-CHECK.md` §1. g19's own FAIL clause forbids exactly this: *"**FAIL by construction if the transcript's LHS is a count copied from any check file** (R2-2: check files and rulings are measurements and cure-shapes, never quotable operands)."* The spec obeys the clause for the close transcript and breaches it in the three sections that state the operand.
- **`62 records` is contradicted in the same file.** §0 ▲▲▲'s own third detector prints `total 1059 records 65`; this seat prints `1048 records 65`. The spec protects the ROW count with a floor (*"1,008 is the floor the gate may not report below"*) and gives the RECORD count no such treatment — it is carried flat into §X and §Z while the block eight lines above it says 65.
- **Same class, smaller: the first pasted `census.py` block cannot balance.** §0 ▲▲ prints `dual F.W3/W4 rows : 903    sole F.W3 rows : 151` beside rosters of `317+681 = 998` and `317+764 = 1081`. A spelling partition must exhaust its roster; **903 + 151 = 1054** matches neither. (The third block does balance: 317+742 = 1059 = 885+174.)

### D-7 — MINOR · an undisclosed elision inside an R2-1-LAW receipt, in the block that rules on receipts

§0 ▲▲▲: *"⟨cmd⟩ `grep -n 'C-C-2' fr-GalleryDraftsSection.md` → `62:- **M-10 = C-C-2 (regraded from BLOCKER, K-12) — MAJOR.** …`"*. ⟨cmd⟩ this seat: that command returns **5** lines (`10`, `62`, `90`, … — `C-C-20` matches the substring), presented as one. The spec applies the correct discipline eleven lines earlier at PD-1 (*"**3 matches, and the elision is disclosed rather than presented as the whole return**"*), so the rule is known and applied inconsistently inside one section. The quoted line 62 is itself byte-exact.

### D-8 — MINOR · a bracketed ADDITION inside a "verbatim" corpus quote

§C.I (`:303`) quotes `fr-ContourSettings M-16` as *"a contract that advertises writeback the panel structurally cannot **h[onour]**"*. ⟨cmd⟩ `sed -n '73p' fr-ContourSettings.md` → the bytes read `honour`, unbracketed. R2-1-LAW 4 permits an ellipsis for elision and nothing else; a bracket is an editorial addition inside a quotation the same row calls banked-verbatim.

### D-9 — INFO · MG-λ's exclusion applies the file criterion to only half of its own routing cell

§C.H rules `fr-App MG-λ` to **F.W4** because *"its target is `composables/useToast.ts`, which is in **no** §5 unit file list and **no** §1 bounds row."* The banked routing cell is `**→ F.W3/W4** (rides the M-4/M-7 toast item)` (`fr-App.md:95`), and the record's own §-summary lists it as `M-4 (+ MG-λ)` (`:140`); `M-4`/`M-7` target `App.vue` (`:31` `<Toaster/>`) — **`.e`'s file**. The criterion's input is therefore contestable at the bytes, and the discriminating negative the LAW is showcased on is the weaker of the two available readings. Recorded as disclosure, not a drop: the row IS named with a holder, which is the point of §X.1.

---

## §3 WHAT VERIFIES (recorded so it is not re-litigated)

**Cross-spec receipts — every one reproduces by STABLE anchor (R2-2 landed):**

| receipt in `F-W3.md` | ⟨cmd⟩ re-run this seat | verdict |
|---|---|---|
| F.W1's TWELVE-limb roster, cited as *"F-W1 §4 (Sequencing), step 4 — 'The atomic transaction (ONE change, G6)'"* | `grep -ho 'The roster is TWELVE limbs[^*]*' F-W1.md` | ✅ byte-exact; `grep -n '^## ' F-W1.md` → `270:## §4 Sequencing`, the quote at `:276` under step 4 — **anchor and limb count both correct (R2-5 discharged)** |
| F-W0 G-11 / G-12 / G-13 by gate id | `grep -h '^### G-1[123] ' F-W0.md` | ✅ all three headings byte-exact |
| *"F-W0 §4 (Gates — all born-RED)"* | `grep -h '^## ' F-W0.md` | ✅ `## 4. Gates — all born-RED` |
| SUBSTRATE-LEDGER **create** row at *"F-W0 §2a (File bounds)"*, with RULINGS-2's "§1a" corrected to §2a | `grep -h '^### 2a' F-W0.md` → `### 2a. File bounds`; the g17 in-cell probe re-run verbatim | ✅ both; the awkward-looking cell-delimiter-free probe **does run and does return** the quoted bytes |
| **Zero** `F-W0.md:<digits>` cites remain | inspection of §4 S-1, g6, g17 | ✅ the four PASS-2 D-3 coordinates are abolished, not re-pointed |

**Corpus quotations — every audited quote byte-exact at its coordinate:**

`LF-1` `fr-GlassTimeline.md:65` (incl. routing `**GLASS-RELAY** + **F.W3** *(r1)*`) ✅ · `PD-1`'s `v7.0.0:Slider.vue` anchor, 3 matches at `:11`/`:46`/`:106` **with the elision disclosed** ✅ · `L-1b` `fr-AnimationControls.md:75` ✅ · `L30` `fr-EasingPicker.md:30` ✅ · `MISS-2` `fr-MorphPhaseConfig.md:30` ✅ · `MPC-31` ONE-CUT LAW `fr-MorphPhaseConfig.md:82` ✅ · `R-4` `:25` / `R-9` `:30` `fr-EasingCurvePreview` ✅ · `PSM-1`/R-5's 48 = 40+8, 5 live (:43,:47,:58,:199,:204), 43 dead + *"F.W3/W4's mechanical rule-move takes THIS enumerated set"* `fr-PaperSearchModal.md:22` ✅ · `FR-MSP-6` two-channel lock `fr-MorphShapePreview.md:98` ✅ · `FR-MSP-11` `:103` + `L-15 ⊕ L-18` `:74` ✅ · `GCM-34` `fr-GalleryCardModal.md:85` ✅ · `FR-AFP-33` `:87` + `FR-AFP-1` `:160` ✅ · `M-δ` `fr-ExportModal.md:41` ✅ · `FR-NP-32` `fr-NotationPills.md:35` ✅.

**The round-2 escape set — all 13, byte-exact, routings included:** `FR-PS-Z` `:40` (*"(rung assignment is spec input)"*) · `FR-PS-HL` `:41` · `MISS-DU1` `:75` (incl. *"All three axes priced the Buttons' arrival as horizontal; the live consequence is vertical."*) · `MISS-DU3` `:77` (*"**F.W3/W4** gate design."*) · `MISS-DU4` `:78` · `PSM-40` `fr-PaperSearchModal.md:82` · `MG-α` `fr-App.md:58` · `MG-ε` `:78` · `MG-η` `:80` · `MAJ-5` `fr-VisualizationView.md:59` · `MAJ-7` `:61` · `FR-IC-16` `fr-InfoCard.md:48` · `FR-GSB-30` `fr-GallerySearchBar.md:70`; fold target `fr-ContourSettings M-16` `:73` ✅ **and now booked** (`grep -c 'ContourSettings M-16' F-W3.md` → 2, against the row's own "0 before this repair"). The `L-26` control reproduces exactly as printed, self-reference disclosed ✅.

**PASS-2's own six defects, re-tested:** D-1 (shape-blindness) **CURED** — g19's operand is the corpus through an inline shape/spelling/atomisation detector · D-3 (four drifted F-W0 coordinates) **CURED** by abolition · D-5 (`v7.0.0` in the row that feeds g6) **CURED** — the label is carried as the BANK's with its 3-match ⟨cmd⟩ · D-6 (`fr-NotationPills.md:23`) **CURED** — `grep -n 'live at' fr-NotationPills.md` → `:9`, and **line 9 does carry BOTH fragments**; `:23` correctly struck with `sed -n '23p'` and `sed -n '124p'` pasted ✅ · D-8 (W3-button-ledger "policy sentence") **CURED** — `sed -n '93p'` byte-exact, `grep -ic 'policy'` → **0**, the LAW re-authored in F.W3's voice with the row cited as evidence (`A.W3.b.1`) · D-9 (forbidden-token detector) **CURED and sharpened** — `sed -n '446p' lane-frontend.md` byte-exact; `grep -c '1990'` → 0, `grep -c '2079'` → 0, `grep -cE '1 990|2 079'` → **1**, thin-space count → **0** (PASS-2's "thin-spaced" characterisation correctly overturned; `1 315` added to the forbidden set). D-2/D-7 partially cured — see D-1/D-2/D-6 above. D-4 partially cured — see D-4 above.

**Gate witnesses — every command re-run against the live trees, all REAL, all born-RED:**

| gate | claim | measured this seat |
|---|---|---|
| g1 | 8 e2e specs / 0 `paper-search*` hits; `PaperSearch.vue:41` = `<style scoped>` | **8** · **0** · `<style scoped>` ✅ |
| g2 | 23 declarations / 7 files; glass-ui → EMPTY | **23 / 7 / 0** ✅ |
| g3 | 127 / 146; `glass-ui/timeline` → 0 | **127 / 146 / 0** ✅ |
| g7 | `.easing-preview` = 4 across 2 files | **4** (EasingCurvePreview :23/:37 · MorphPhaseConfig :47/:198) ✅ |
| g12 | forms / search / fading-scroll → 0 / 0 / 0 | **0 / 0 / 0** ✅ (and the OR is closed on a path-named artefact) |
| g15 | `function timeAgo` = 5; `startsWith("fourier")` = 7 | **5 / 7** ✅ |
| g17 | `lane-frontend.md:446` headline + the separator forensics | ✅ all five sub-probes |
| g18 | `git status --porcelain | wc -l` → 28 | **28** ✅ |
| g20 | register absent; `grep -c "F.W3" INBOX.md` → 0 | **No such file** · **0** ✅ |
| §5a-v2 | `grep -rl 'is-active' web/src` → 11 files; `grep -rl '<Tooltip' web/src` → 11 files; `PaperView.vue:344` = `:is-active="isActive"` | **11 / 11**, file-for-file identical to the printed lists; `:344` byte-exact ✅ |
| §5b | `grep -n worktree .gitignore` → no match | **no match** ✅ |
| §1 | `lib/types.ts:96` = `export type GalleryTier = …`; repo-root `index.html` absent, `web/index.html` present | ✅ all three |

**Posture:** `Status: planned` at `:55` and `:645`; **zero** VERIFIED stamps (`VERIFIED | **NO**` `:64`, `VERIFIED NO` `:645`); `EXECUTION IS NOT AUTHORIZED` `:7`; fourier tree READ-ONLY `:7`; **20 gates all born-RED**; owner flags inline (OP-1/OP-4, S-6 a/b/c); SS-4's own obligations correctly disowned to SS-4 (S-4) with the `basisFilter` WAVE-LOCK the only imposition; `registry/adjudicated/**` out of bounds; **no `F-W3-CARRY.md`** (R-3 item 2 honoured); *"the CARRY"* with no path declared forbidden vocabulary and absent. **F.W7**: the wave neither re-derives F.W7's `routedTotal` nor contests R2-8 — the only two mentions are the declared-not-carried KISS-guardrail edge (S-6, §X), which is correct. **F.W9/W10**: one mention (`:592`, an FR-AFP-42 test-seat trigger); the wave takes no position on the R-2b splice and owes none.

**RULINGS-2's five F-W3 directives:** R2-3a ✅ (§X.1-v2 minted; §X/§Z re-denominated — subject to D-6) · R2-3b ✅ (all 13 spot-verified escapes booked by id, record-qualified, with MG-λ and L-26 as the LAW's negatives; §X.1-v3 adds a record-level partition — subject to D-2) · R2-9 ✅ (g19's detector stated inline — subject to D-3) · R2-2 ✅ (fully discharged) · R2-5 ✅ (TWELVE cited once, by charter, correct anchor). Riders: PD-1's `v7.0.0` ✅; §5a re-cut ⚠️ (D-4).

---

## §4 VERDICT

**DEFECTIVE.** Six MAJOR (D-1 falsified alias receipt · D-2 §X.1-v3's *"every"* · D-3 record-blind closure gate · D-4 disjointness re-affirmed false · D-5 R2-1-LAW 2/3 · D-6 check-file denominator + unbalanced census block), two MINOR, one INFO.

The distance travelled since pass 2 is real: the format-blind roster is gone, the four dead F-W0 anchors are gone rather than re-pointed, every audited corpus quotation and every runnable witness reproduces, and thirteen escapes are booked by banked id with their fold targets beside them. What has not travelled is the **class**: a closure gate is still measured over an operand narrower than its subject — shape-blindness was cured, dash-blindness was measured, alias-blindness was cured, and **record-blindness was never named**, so 421 rows can satisfy g19's (→) test by collision. And the section that homes the residue certifies to zero a record that is not zero, which is the one way a per-record partition can silently lose rows: by never admitting the record.

*Seat's own writes: this file only. Everything else read-only.*
